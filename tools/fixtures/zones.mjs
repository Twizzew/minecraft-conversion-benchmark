// Which block positions of a source world are block fixtures (docs/fixture-rules.md §2).
//
// The rule is mechanical and fixed per world BEFORE any output is examined:
//   - worlds built by a generator: every absolute-coordinate `setblock` target of the
//     generator functions shipped INSIDE the world (datapack / behaviour pack).
//     `fill` targets are support geometry (floors, cages, clearing) and are excluded.
//   - flat hand-built worlds: every non-air block above the superflat terrain.
//   - J01: the boxes declared by its own specification (specification/LAYOUT.json).
// A position becomes a fixture only if the SOURCE world holds a non-air block there:
// the source world is the truth, a declaration is not.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const AdmZip = require('adm-zip');

export const ZONE_RULES = {
  'J01@1.1': { kind: 'boxes', alsoSetblock: 'datapack', boxes: [
    { label: 'state-matrix', dim: 'minecraft:overworld', from: [1000, 80, 1000], to: [1359, 80, 1359], source: 'specification/LAYOUT.json states_copy.box' },
    { label: 'block-entity-fixtures', dim: 'minecraft:overworld', from: [998, 79, 1458], to: [1030, 80, 1474], source: 'manifest/block_entity_fixtures.tsv (x 1000..1024, y 79, z 1460..1472) + 2-block margin' },
  ] },
  'J02@1.0': { kind: 'generator-setblock', pack: 'datapack' },
  'J03@1.0': { kind: 'generator-setblock', pack: 'datapack' },
  'J04@1.0': { kind: 'generator-setblock', pack: 'datapack' },
  'B01@1.0': { kind: 'above-flat-terrain', flatTop: -61 },
  'B02@1.0': { kind: 'above-flat-terrain', flatTop: -61 },
  'B03@1.0': { kind: 'generator-setblock', pack: 'behavior_pack' },
  // Real survival world, too large to take every block (1 068 978 sub-chunks). Two strata
  // of whole sub-chunks, chosen by SHA-256 of their coordinates (salted per stratum) —
  // fixed here before any output of this world was examined:
  //   uniform: 1 sub-chunk in 4 096, anywhere (the world as it is, terrain included);
  //   built:   1 in 64 of the sub-chunks holding at least one block entity (where players
  //            built and stored things).
  'GURREN@1.0': { kind: 'sampled-subchunks', strata: [
    { label: 'uniform', oneIn: 4096, salt: 'mccb-v1.1/uniform' },
    { label: 'built', oneIn: 64, salt: 'mccb-v1.1/built', requireBlockEntity: true },
  ] },
};

/** Deterministic stratum draw: first 4 bytes of SHA-256(salt|dim|cx|sy|cz), as uint32, mod oneIn == 0. */
export function drawSubchunk(stratum, dim, cx, sy, cz) {
  const h = crypto.createHash('sha256').update(`${stratum.salt}|${dim}|${cx}|${sy}|${cz}`).digest();
  return h.readUInt32BE(0) % stratum.oneIn === 0;
}

const DIMS = { overworld: 'minecraft:overworld', the_nether: 'minecraft:the_nether', nether: 'minecraft:the_nether', the_end: 'minecraft:the_end', end: 'minecraft:the_end' };
const dimOf = (s) => DIMS[String(s).replace(/^minecraft:/, '')] || s;

/** Parse generator functions: [{file, line, dim, pos:[x,y,z], block}] for absolute setblocks. */
export function parseSetblocks(files) {
  const out = [];
  for (const { name, text } of files) {
    const lines = text.split(/\r?\n/);
    lines.forEach((raw, i) => {
      let line = raw.trim();
      if (!line || line.startsWith('#')) return;
      if (line.startsWith('$')) return; // macro lines: coordinates unknown until run
      let dim = 'minecraft:overworld';
      const ex = line.match(/^execute in (\S+) run (.*)$/);
      if (ex) { dim = dimOf(ex[1]); line = ex[2]; }
      const m = line.match(/^setblock (-?\d+) (-?\d+) (-?\d+) ([a-z0-9_:]+)/);
      if (!m) return;
      const block = m[4].includes(':') ? m[4] : `minecraft:${m[4]}`;
      if (block === 'minecraft:air') return;
      out.push({ file: name, line: i + 1, dim, pos: [+m[1], +m[2], +m[3]], block });
    });
  }
  return out;
}

/** Generator function files shipped inside a source world. */
export function generatorFiles(rawRoot, kind) {
  const files = [];
  if (kind === 'datapack') {
    const dpDir = path.join(rawRoot, 'datapacks');
    for (const f of fs.existsSync(dpDir) ? fs.readdirSync(dpDir) : []) {
      if (!f.endsWith('.zip')) continue;
      const zip = new AdmZip(path.join(dpDir, f));
      for (const e of zip.getEntries()) {
        if (!e.isDirectory && /\/function\/.*\.mcfunction$/.test(e.entryName) && /\/function\/build\//.test(e.entryName)) {
          files.push({ name: `${f}:${e.entryName}`, text: e.getData().toString('utf8') });
        }
      }
    }
  } else {
    const bp = path.join(rawRoot, 'behavior_packs');
    const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.mcfunction')) files.push({ name: path.relative(rawRoot, p).replace(/\\/g, '/'), text: fs.readFileSync(p, 'utf8') }); } };
    if (fs.existsSync(bp)) walk(bp);
  }
  return files.sort((a, b) => a.name.localeCompare(b.name));
}

/** Candidate positions for a world: [{dim, pos, origin}] (deduplicated, deterministic order). */
export function candidatePositions(worldId, rawRoot, opts = {}) {
  const rule = ZONE_RULES[worldId];
  if (!rule) return { rule: null, positions: [] };
  const seen = new Map();
  const add = (dim, pos, origin) => { const k = `${dim}|${pos.join(',')}`; if (!seen.has(k)) seen.set(k, { dim, pos, origin }); };
  if (rule.kind === 'boxes') {
    for (const b of rule.boxes) {
      for (let x = b.from[0]; x <= b.to[0]; x++) for (let y = b.from[1]; y <= b.to[1]; y++) for (let z = b.from[2]; z <= b.to[2]; z++) add(b.dim, [x, y, z], `box:${b.label}`);
    }
    if (rule.alsoSetblock) for (const s of parseSetblocks(generatorFiles(rawRoot, rule.alsoSetblock))) add(s.dim, s.pos, `setblock:${s.file}:${s.line}`);
  } else if (rule.kind === 'generator-setblock') {
    const sb = parseSetblocks(generatorFiles(rawRoot, rule.pack));
    for (const s of sb) add(s.dim, s.pos, `setblock:${s.file}:${s.line}`);
    return { rule, positions: [...seen.values()], declared: sb };
  } else if (rule.kind === 'above-flat-terrain' || rule.kind === 'sampled-subchunks') {
    return { rule, positions: null }; // enumerated by scanning the world
  }
  return { rule, positions: [...seen.values()] };
}
