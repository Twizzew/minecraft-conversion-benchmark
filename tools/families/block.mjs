// Family "block": a block (name + state) at a position. docs/fixture-rules.md §3.1
import fs from 'node:fs';
import { candidatePositions, drawSubchunk } from '../fixtures/zones.mjs';
import { javaBlock, bedrockBlock } from '../lib/facts.mjs';
import { equivalents, AIR_LIKE } from '../lib/identity.mjs';
import { javaRegistry, bedrockRegistry } from '../lib/registry.mjs';
import { r, notEvaluated, PASS, ADAPTED, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';

export const DIM_NUM = { 'minecraft:overworld': 0, 'minecraft:the_nether': 1, 'minecraft:the_end': 2 };
export const DIM_NAME = { 0: 'minecraft:overworld', 1: 'minecraft:the_nether', 2: 'minecraft:the_end' };

// Java properties that Minecraft recomputes from neighbouring blocks and that Bedrock
// does not store. After a round trip through Bedrock they come back RECOMPUTED; a
// difference limited to them is ADAPTED, not FAIL (METHODOLOGY §5.3). Fixed list.
export const DERIVED_JAVA_PROPERTIES = [
  [/_stairs$/, ['shape']],
  [/(_fence|^minecraft:iron_bars|_pane|_bars)$/, ['north', 'south', 'east', 'west']],
  [/^minecraft:redstone_wire$/, ['north', 'south', 'east', 'west']],
  [/^minecraft:note_block$/, ['instrument']],
  [/^minecraft:tripwire$/, ['north', 'south', 'east', 'west']],
  [/^minecraft:chorus_plant$/, ['north', 'south', 'east', 'west', 'up', 'down']],
  [/^minecraft:fire$/, ['north', 'south', 'east', 'west', 'up']],
  [/_leaves$/, ['distance']],
  [/^minecraft:(grass_block|podzol|mycelium)$/, ['snowy']],
  [/^minecraft:repeater$/, ['locked']],
  [/campfire$/, ['signal_fire']],
  // redstone input state that Bedrock does not store for these blocks (checked in
  // @minecraft/vanilla-data 1.26.40: doors, trapdoors, fence gates, skulls, noteblock)
  [/(_door|_trapdoor|_fence_gate|^minecraft:note_block|_skull|_head)$/, ['powered']],
  [/^minecraft:vine$/, ['up']],
];
// Java "body" blocks that Java turns into the "head" block (and back) from the block
// above; Bedrock stores one block with an age only. A round trip returning the other
// member of the pair is ADAPTED.
export const DERIVED_JAVA_IDENTITY = [
  ['minecraft:kelp_plant', 'minecraft:kelp'], ['minecraft:weeping_vines_plant', 'minecraft:weeping_vines'],
  ['minecraft:twisting_vines_plant', 'minecraft:twisting_vines'], ['minecraft:cave_vines_plant', 'minecraft:cave_vines'],
];
const derivedIdentity = (a, b) => DERIVED_JAVA_IDENTITY.some(([x, y]) => (a === x && b === y) || (a === y && b === x));
// Bedrock states that are internal bookkeeping recomputed by the game.
export const DERIVED_BEDROCK_STATES = [[/leaves/, ['update_bit']]];
const derivedFor = (list, name) => list.filter(([re]) => re.test(name)).flatMap(([, p]) => p);

export async function readBlock(edition, world, locator) {
  if (edition === 'java') return javaBlock(await world.blockAt(locator.dim, ...locator.pos));
  const d = DIM_NUM[locator.dim];
  if (d === undefined) return null;
  return bedrockBlock(world.blockAt(d, ...locator.pos));
}

const isWaterlogged = (edition, f) => (edition === 'java' ? f.props?.waterlogged === 'true' : /water/.test(f.layer1 || ''));

export async function enumerate(ctx) {
  const { worldId, source } = ctx;
  const { rule, positions } = candidatePositions(worldId, source.rawRoot);
  const out = [];
  const bReg = source.edition === 'bedrock' ? bedrockRegistry() : null;
  const add = (loc, f, origin) => {
    if (!f || AIR_LIKE.has(f.name)) return;
    const eq = equivalents('block', source.edition, f.name);
    let direct = eq.status === 'equivalent' ? 'EQUIV' : eq.status === 'edition_only' ? 'NA:edition-only'
      : eq.status === 'cross_family' ? `CROSS:${eq.targets[0]}` : `NE:${REASON.NO_IDENTITY_REFERENCE}`;
    // A Bedrock palette entry the current game no longer defines (old name, or a state the
    // block no longer has, e.g. stone + stone_type=granite) is upgraded by the game when the
    // chunk loads. MCCB has no neutral upgrade table: neither level can be judged.
    const legacy = bReg && (!bReg.blocks.has(f.name) || Object.keys(f.states || {}).some((k) => !(bReg.blockStateKeys.get(f.name) || []).includes(k)));
    const NE_LEGACY = 'NE:legacy-bedrock-block-entry-no-upgrade-reference';
    if (legacy) direct = NE_LEGACY;
    const aspects = { identity: { direct, roundtrip: legacy ? NE_LEGACY : 'EQUAL' } };
    const hasState = source.edition === 'java' ? Object.keys(f.props || {}).length > 0 : Object.keys(f.states || {}).length > 0;
    if (hasState) aspects.state = { direct: legacy ? NE_LEGACY : `NE:${REASON.NO_STATE_REFERENCE}`, roundtrip: legacy ? NE_LEGACY : 'EQUAL_OR_DERIVED' };
    if (isWaterlogged(source.edition, f)) aspects.waterlog = { direct: 'WATERLOGGED', roundtrip: 'EQUAL' };
    out.push({ family: 'block', locator: loc, origin, expected: { ...f, ...(eq.targets ? { targets: eq.targets } : {}) }, aspects });
  };
  // Every non-air block of one Bedrock sub-chunk (optionally only above a height).
  const scanSubchunk = (w, dim, cx, cz, sy, origin, minY = -Infinity) => {
    const sc = w.subchunk(dim, cx, cz, sy);
    if (!sc || !sc.layers[0]) return;
    for (let i = 0; i < 4096; i++) {
      const y = sy * 16 + (i & 15);
      if (y <= minY) continue;
      const l0 = sc.layers[0];
      const p = l0.idx ? l0.palette[l0.idx[i]] : l0.palette[0];
      if (!p || AIR_LIKE.has(p.name)) continue;
      const x = cx * 16 + (i >> 8), z = cz * 16 + ((i >> 4) & 15);
      add({ dim: DIM_NAME[dim], pos: [x, y, z] }, bedrockBlock(w.blockAt(dim, x, y, z)), origin);
    }
  };
  if (rule?.kind === 'above-flat-terrain') {
    const w = source.world;
    for (const { dim, cx, cz } of w.chunkIds()) {
      for (const k of w.chunkTags(dim, cx, cz).keys()) if (k.startsWith('47:')) scanSubchunk(w, dim, cx, cz, +k.slice(3), 'scan:above-flat-terrain', rule.flatTop);
    }
  } else if (rule?.kind === 'sampled-subchunks') {
    if (source.edition !== 'bedrock') throw new Error('sampled-subchunks: implemented for Bedrock sources only');
    const w = source.world;
    for (const { dim, cx, cz } of w.chunkIds()) {
      if (!DIM_NAME[dim]) continue;
      const keys = [...w.chunkTags(dim, cx, cz).keys()].filter((k) => k.startsWith('47:'));
      if (!keys.length) continue;
      let beSy = null; // sub-chunk indices holding a block entity, read only when a "built" stratum needs it
      for (const k of keys) {
        const sy = +k.slice(3);
        const hit = [];
        for (const s of rule.strata) {
          if (!drawSubchunk(s, dim, cx, sy, cz)) continue;
          if (s.requireBlockEntity) {
            beSy ||= new Set([...w.blockEntities(dim, cx, cz).keys()].map((p) => Math.floor(+p.split(',')[1] / 16)));
            if (!beSy.has(sy)) continue;
          }
          hit.push(s.label);
        }
        if (hit.length) scanSubchunk(w, dim, cx, cz, sy, `sample:${hit.join('+')}`);
      }
    }
  } else {
    for (const p of positions || []) add({ dim: p.dim, pos: p.pos }, await readBlock(source.edition, source.world, p), p.origin);
  }
  out.sort((a, b) => a.locator.dim.localeCompare(b.locator.dim) || a.locator.pos[1] - b.locator.pos[1] || a.locator.pos[0] - b.locator.pos[0] || a.locator.pos[2] - b.locator.pos[2]);
  return out;
}

let _bedrockDefaults = null;
function bedrockDefaultStates() {
  if (!_bedrockDefaults) {
    const f = new URL('../../docs/reference/bedrock-default-states.v1.json', import.meta.url);
    _bedrockDefaults = JSON.parse(fs.readFileSync(f, 'utf8')).defaults;
  }
  return _bedrockDefaults;
}

function propsDiff(a = {}, b = {}) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].filter((k) => String(a[k]) !== String(b[k])).sort();
}

async function crossFamilyEntity(target, subject, targetEdition) {
  // a Bedrock item-frame BLOCK must become a Java item-frame ENTITY at that block
  if (!target.world || targetEdition !== 'java') return null;
  const want = subject.expected.targets?.[0]?.replace(/^entity:/, '') || '';
  const ents = await target.entitiesIndex();
  const [x, y, z] = subject.locator.pos;
  const hit = ents.find((e) => e.facts.id === want.replace(/^entity:/, '') && Math.floor(e.facts.pos[0]) === x && Math.floor(e.facts.pos[1]) === y && Math.floor(e.facts.pos[2]) === z);
  return hit ? r(PASS, 'block.identity.cross-family', { observed: hit.facts.id }) : r(FAIL, 'block.identity.cross-family', { observed: 'no matching entity at this block' });
}

export async function evaluate(subject, ctx) {
  const res = {};
  const src = ctx.sourceEdition;
  const exp = subject.expected;
  // ── direct (other edition, same position) ──
  const d = ctx.direct;
  let dObs = null;
  if (d.world) dObs = await readBlock(d.edition, d.world, subject.locator);
  for (const [aspect, spec] of Object.entries(subject.aspects)) {
    res[aspect] = {};
    const dx = spec.direct;
    let out;
    if (!d.world) out = r(FAIL, `block.${aspect}.world-opens`, { observed: REASON.WORLD_DOES_NOT_OPEN });
    else if (dx.startsWith('NE:')) out = notEvaluated(dx.slice(3), dObs ? { observed: dObs.name } : {});
    else if (dx.startsWith('NA:')) out = r(NOT_APPLICABLE, `block.${aspect}.${dx.slice(3)}`, { observed: dObs?.name ?? null });
    else if (dx.startsWith('CROSS:')) out = (await crossFamilyEntity(d, subject, d.edition)) || notEvaluated('cross-family-target-not-readable');
    else if (aspect === 'identity') {
      if (!dObs) out = r(FAIL, 'block.identity.equivalent', { observed: 'chunk-missing' });
      else out = r(exp.targets.includes(dObs.name) ? PASS : FAIL, 'block.identity.equivalent', { observed: dObs.name });
    } else if (aspect === 'waterlog') {
      if (!dObs) out = r(FAIL, 'block.waterlog', { observed: 'chunk-missing' });
      else if (d.edition === 'bedrock') out = r(/water/.test(dObs.layer1 || '') ? PASS : FAIL, 'block.waterlog.j2b', { observed: dObs.layer1 });
      else {
        const hasProp = !!javaRegistry().blocks.get(dObs.name)?.properties?.waterlogged;
        out = hasProp ? r(dObs.props.waterlogged === 'true' ? PASS : FAIL, 'block.waterlog.b2j', { observed: `${dObs.name}[waterlogged=${dObs.props.waterlogged}]` })
          : r(NOT_APPLICABLE, 'block.waterlog.b2j.java-block-not-waterloggable', { observed: dObs.name });
      }
    } else out = notEvaluated('unknown-aspect');
    res[aspect].direct = out;
  }
  // ── round trip (source edition, same position) ──
  const rt = ctx.roundtrip;
  let rObs = null;
  if (rt?.world) rObs = await readBlock(rt.edition, rt.world, subject.locator);
  for (const aspect of Object.keys(subject.aspects)) {
    let out;
    const rx = subject.aspects[aspect].roundtrip || '';
    if (!rt) out = notEvaluated(REASON.NO_ROUNDTRIP);
    else if (!rt.world) out = r(FAIL, `block.${aspect}.world-opens`, { observed: REASON.WORLD_DOES_NOT_OPEN });
    else if (rx.startsWith('NE:')) out = notEvaluated(rx.slice(3), rObs ? { observed: rObs.name } : {});
    else if (rx.startsWith('NA:')) out = r(NOT_APPLICABLE, `block.${aspect}.${rx.slice(3)}`, { observed: rObs?.name ?? null });
    else if (!rObs) out = r(FAIL, `block.${aspect}.roundtrip`, { observed: 'chunk-missing' });
    else if (aspect === 'identity') {
      if (rObs.name === exp.name) out = r(PASS, 'block.identity.roundtrip');
      else if (src === 'java' && derivedIdentity(exp.name, rObs.name)) out = r(ADAPTED, 'block.identity.roundtrip.derived-recomputed', { observed: rObs.name });
      else out = r(FAIL, 'block.identity.roundtrip', { observed: rObs.name });
    }
    else if (aspect === 'state') {
      if (rObs.name !== exp.name && src === 'java' && derivedIdentity(exp.name, rObs.name)) out = r(ADAPTED, 'block.state.roundtrip.derived-recomputed', { observed: rObs.name });
      else if (rObs.name !== exp.name) out = r(FAIL, 'block.state.roundtrip', { observed: rObs.name, note: 'identity-changed' });
      else {
        const a = src === 'java' ? exp.props : exp.states;
        let b = src === 'java' ? rObs.props : rObs.states;
        // Rule 43 (audit 2026-09-25): a Bedrock state the converter omitted is completed by
        // the game with the block's default. Where Mojang's official data-value table gives
        // that default (data value 0, docs/reference/bedrock-default-states.v1.json), the
        // omitted key is judged against it; elsewhere it stays NOT_EVALUATED.
        if (src !== 'java') {
          const dflt = bedrockDefaultStates()[exp.name];
          if (dflt) { b = { ...b }; for (const [k, v] of Object.entries(dflt)) if (b[k] === undefined && a?.[k] !== undefined) b[k] = v; }
        }
        const diff = propsDiff(a, b);
        // A key present on one side only, with no default reference: not a verdict.
        const oneSided = diff.filter((k) => a?.[k] === undefined || b?.[k] === undefined);
        const conflicting = diff.filter((k) => !oneSided.includes(k));
        if (!diff.length) out = r(PASS, 'block.state.roundtrip');
        else if (!conflicting.length) out = notEvaluated('state-key-omitted-engine-default-unknown', { observed: Object.fromEntries(oneSided.map((k) => [k, `${a?.[k]} -> ${b?.[k]}`])) });
        else {
          const derived = derivedFor(src === 'java' ? DERIVED_JAVA_PROPERTIES : DERIVED_BEDROCK_STATES, exp.name);
          const onlyDerived = conflicting.every((k) => derived.includes(k));
          const obs = Object.fromEntries(diff.map((k) => [k, `${a?.[k]} -> ${b?.[k]}`]));
          out = r(onlyDerived ? ADAPTED : FAIL, onlyDerived ? 'block.state.roundtrip.derived-recomputed' : 'block.state.roundtrip', { observed: obs });
        }
      }
    } else if (aspect === 'waterlog') {
      const ok = src === 'java' ? rObs.props?.waterlogged === 'true' : /water/.test(rObs.layer1 || '');
      out = r(ok ? PASS : FAIL, 'block.waterlog.roundtrip', ok ? {} : { observed: src === 'java' ? rObs.props?.waterlogged : rObs.layer1 });
    }
    res[aspect].roundtrip = out;
  }
  return res;
}
