// Family "custom_dimension": chunks of a Java datapack dimension (J01 mccb26:states).
// Bedrock has no data-driven dimension: direct = NOT_APPLICABLE by definition; the round
// trip must bring every chunk back. docs/fixture-rules.md §3.7
import crypto from 'node:crypto';
import { r, notEvaluated, PASS, PARTIAL, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';
import { javaStateKey } from '../lib/registry.mjs';

const VANILLA = new Set(['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end']);

/** Per-section content fingerprint of a chunk: Map<sectionY, {hash, states:Array(4096)}> */
function chunkContent(world, tag) {
  const out = new Map();
  for (const [y, s] of world.sections(tag)) {
    const keys = s.palette.map((p) => javaStateKey(p.name, p.props));
    const arr = new Array(4096);
    for (let i = 0; i < 4096; i++) arr[i] = keys[s.idx ? s.idx[i] : 0];
    if (arr.every((k) => k === 'minecraft:air')) continue;
    out.set(y, { hash: crypto.createHash('sha1').update(arr.join('|')).digest('hex'), states: arr });
  }
  return out;
}

export async function enumerate(ctx) {
  if (ctx.source.edition !== 'java') return [];
  const w = ctx.source.world;
  const out = [];
  for (const d of w.dimensions().filter((x) => !VANILLA.has(x.id))) {
    for await (const { cx, cz, tag } of w.chunks(d.id)) {
      const c = chunkContent(w, tag);
      if (!c.size) continue;
      out.push({ family: 'custom_dimension', locator: { dim: d.id, chunk: [cx, cz] },
        expected: { sections: Object.fromEntries([...c].map(([y, v]) => [y, v.hash])), non_air_sections: c.size },
        aspects: { blocks: { direct: 'NA:bedrock-has-no-custom-dimension', roundtrip: 'EQUAL' } } });
    }
  }
  return out;
}

export async function evaluate(subject, ctx) {
  const rt = ctx.roundtrip;
  let rr;
  if (!rt) rr = notEvaluated(REASON.NO_ROUNDTRIP);
  else if (!rt.world) rr = r(FAIL, 'custom_dimension.world-opens', { observed: REASON.WORLD_DOES_NOT_OPEN });
  else {
    const tag = await rt.world.chunk(subject.locator.dim, ...subject.locator.chunk);
    if (!tag) rr = r(FAIL, 'custom_dimension.blocks.roundtrip', { observed: 'chunk-missing' });
    else {
      const got = chunkContent(rt.world, tag);
      const exp = subject.expected.sections;
      const bad = Object.keys(exp).filter((y) => got.get(Number(y))?.hash !== exp[y]);
      const extra = [...got.keys()].filter((y) => !(String(y) in exp));
      rr = !bad.length && !extra.length ? r(PASS, 'custom_dimension.blocks.roundtrip')
        : r(bad.length + extra.length < Object.keys(exp).length ? PARTIAL : FAIL, 'custom_dimension.blocks.roundtrip', { differing_sections: bad.length + extra.length, sections: Object.keys(exp).length });
    }
  }
  const dr = !ctx.direct.world ? r(FAIL, 'custom_dimension.world-opens', { observed: REASON.WORLD_DOES_NOT_OPEN }) : r(NOT_APPLICABLE, 'custom_dimension.bedrock-has-no-custom-dimension');
  return { blocks: { direct: dr, roundtrip: rr } };
}
