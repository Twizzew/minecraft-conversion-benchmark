// Test helpers for the v1.3 closure tests: synthetic NBT, in-memory worlds that the real
// readers (facts.mjs, TargetView, chest-pairs) consume, and a driver that runs the real
// path  facts → family.enumerate → (JSON, as in a fixture file) → family.prepare/evaluate.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { TargetView } from '../../oracles/target.mjs';

// ── typed NBT (prismarine-nbt shape) ───────────────────────────────────────
export const T = {
  b: (v) => ({ type: 'byte', value: v }),
  s: (v) => ({ type: 'short', value: v }),
  i: (v) => ({ type: 'int', value: v }),
  f: (v) => ({ type: 'float', value: v }),
  d: (v) => ({ type: 'double', value: v }),
  str: (v) => ({ type: 'string', value: v }),
  c: (o) => ({ type: 'compound', value: o }),
  // list of compounds: elements are given as compound tags, stored as their inner maps
  lc: (arr) => ({ type: 'list', value: { type: 'compound', value: arr.map((x) => x.value) } }),
  ld: (arr) => ({ type: 'list', value: { type: 'double', value: arr } }),
  lf: (arr) => ({ type: 'list', value: { type: 'float', value: arr } }),
  ls: (arr) => ({ type: 'list', value: { type: 'string', value: arr } }),
  ia: (arr) => ({ type: 'intArray', value: arr }),
};

export const jItem = (id, count = 1, slot) => T.c({ ...(slot === undefined ? {} : { Slot: T.b(slot) }), id: T.str(id), count: T.i(count) });
export const bItem = (id, count = 1, slot) => T.c({ Count: T.b(count), Damage: T.s(0), Name: T.str(id), ...(slot === undefined ? {} : { Slot: T.b(slot) }), WasPickedUp: T.b(0) });
export const bEmpty = (slot) => T.c({ Count: T.b(0), Damage: T.s(0), Name: T.str(''), ...(slot === undefined ? {} : { Slot: T.b(slot) }), WasPickedUp: T.b(0) });

// ── in-memory worlds ───────────────────────────────────────────────────────
const OW = 'minecraft:overworld';
/** Java world: block entities (by position), blocks, entities, players (written to temp NBT files). */
export function javaWorld({ blockEntities = [], blocks = {}, entities = [], level = null, playerFiles = [] } = {}) {
  const be = new Map(blockEntities.map((t) => [[t.value.x.value, t.value.y.value, t.value.z.value].join(), t]));
  return {
    dimensions: () => [{ id: OW }],
    async *chunks() { yield { tag: { mccbTest: true } }; },
    blockEntities: () => [...be.entries()],
    blockEntityAt: async (dim, x, y, z) => be.get([x, y, z].join()) || null,
    blockAt: async (dim, x, y, z) => blocks[[x, y, z].join()] || null,
    entities: async () => entities.map((tag) => ({ tag, origin: 'entity_storage' })),
    playerFiles: () => playerFiles,
    level,
  };
}
/** Bedrock world: block entities, actors, named player records. */
export function bedrockWorld({ blockEntities = [], actors = [], named = {}, level = null } = {}) {
  const be = new Map(blockEntities.map((t) => [[t.value.x.value, t.value.y.value, t.value.z.value].join(), t]));
  const nm = new Map(Object.entries(named));
  return {
    chunkIds: () => [{ dim: 0, cx: 0, cz: 0 }],
    blockEntities: () => [...be.entries()],
    blockEntityAt: (dim, x, y, z) => be.get([x, y, z].join()) || null,
    allActors: () => actors.map((tag, i) => ({ tag, uid: `a${i}`, storage: 'actorprefix', dim: 0 })),
    named: nm,
    namedNbt: (k) => (nm.has(k) ? [nm.get(k)] : null),
    level,
  };
}
export const view = (edition, world, label = 'test') => new TargetView({ edition, world, label });

// ── Java player files (the Java player reader reads files from disk) ─────────
const { prismarine } = await import('../../lib/nbt.mjs');
export function writeJavaPlayer(tag, uuid = '00000000-0000-0000-0000-000000000001') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-closure-'));
  const file = path.join(dir, `${uuid}.dat`);
  fs.writeFileSync(file, prismarine.writeUncompressed({ type: 'compound', name: '', value: tag.value }, 'big'));
  return { file, uuid };
}

// ── Java registry: a minimal synthetic report set (Mojang's is not in this environment) ──
export function useSyntheticJavaReports(items) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-reports-'));
  fs.writeFileSync(path.join(dir, 'blocks.json'), JSON.stringify({ 'minecraft:barrel': { states: [{ default: true, properties: {} }] } }));
  const entries = Object.fromEntries(items.map((x, i) => [x, { protocol_id: i }]));
  fs.writeFileSync(path.join(dir, 'registries.json'), JSON.stringify({ 'minecraft:item': { entries }, 'minecraft:entity_type': { entries: {} }, 'minecraft:block_entity_type': { entries: {} } }));
  process.env.MCCB_JAVA_REPORTS = dir;
}

// ── driver ─────────────────────────────────────────────────────────────────
/**
 * Enumerate subjects of one family from a source world, pass them through JSON (as a
 * fixture file does), then evaluate them against a direct and/or a round-trip view.
 * Returns [{ subject, res }].
 */
export async function run(family, { source, sourceEdition, direct = null, roundtrip = null, worldId = 'TEST@1.0' }) {
  const fam = await import(`../../families/${family}.mjs`);
  const sourceView = view(sourceEdition, source, 'source');
  const subjects = JSON.parse(JSON.stringify(await fam.enumerate({ source: { edition: sourceEdition, world: source }, sourceView, worldId })))
    .map((s, i) => ({ id: `${family}-${i}`, ...s }));
  return evalSubjects(family, subjects, { sourceEdition, direct, roundtrip });
}
export async function evalSubjects(family, subjects, { sourceEdition, direct = null, roundtrip = null }) {
  const fam = await import(`../../families/${family}.mjs`);
  const ctx = { sourceEdition, direct: direct || view('none', null, 'direct-absent'), roundtrip, header: {} };
  if (!direct) ctx.direct = new TargetView({ edition: 'none', world: null, opens: false });
  if (fam.prepare) await fam.prepare(ctx, subjects);
  const out = [];
  for (const s of subjects) out.push({ subject: s, res: await fam.evaluate(s, ctx) });
  return out;
}
export const status = (x) => (x.evaluated ? x.status : `NE:${x.reason}`);
