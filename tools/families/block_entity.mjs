// Family "block_entity": data attached to a block (signs, command blocks, lecterns…).
// Container ITEMS are not here: every stack is its own subject (family item_stack).
// docs/fixture-rules.md §3.2
import { javaBlockEntity, bedrockBlockEntity } from '../lib/facts.mjs';
import { equivalents } from '../lib/identity.mjs';
import { DIM_NAME } from './block.mjs';
import { r, notEvaluated, PASS, ADAPTED, PARTIAL, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';
import { textOf, plain, zeroFreeMap } from '../lib/nbt.mjs';

// Block entities that exist in one edition only: the other edition keeps the same
// information in a block state or an entity (judged by the block / entity families).
const NO_COUNTERPART = {
  java: new Set(['minecraft:test_block', 'minecraft:test_instance_block']),
  // Bed / SporeBlossom: Java 26.3 has no such block-entity type (Mojang registry report)
  // and native Java worlds with beds store none — the bed colour is the block id.
  bedrock: new Set(['FlowerPot', 'Music', 'Cauldron', 'ItemFrame', 'GlowItemFrame', 'PistonArm', 'Lodestone', 'NetherReactor', 'ChemistryTable', 'ChalkboardBlock', 'Bed', 'SporeBlossom']),
};

const normCmd = (s) => String(s ?? '').trim().replace(/^\//, '').replace(/\s+/g, ' ');
const trimLines = (a) => { const x = [...(a || [])].map((s) => String(s ?? '')); while (x.length && x[x.length - 1] === '') x.pop(); return x; };

/** All block entities of a world as [{ dim, pos, facts }]. */
export async function allBlockEntities(edition, world) {
  const out = [];
  if (edition === 'java') {
    for (const d of world.dimensions()) {
      for await (const { tag } of world.chunks(d.id)) for (const [, be] of world.blockEntities(tag)) { const f = javaBlockEntity(be); out.push({ dim: d.id, pos: f.pos, facts: f }); }
    }
  } else {
    for (const { dim, cx, cz } of world.chunkIds()) for (const [, be] of world.blockEntities(dim, cx, cz)) { const f = bedrockBlockEntity(be); out.push({ dim: DIM_NAME[dim] || `dim${dim}`, pos: f.pos, facts: f }); }
  }
  return out.sort((a, b) => a.dim.localeCompare(b.dim) || a.pos[1] - b.pos[1] || a.pos[0] - b.pos[0] || a.pos[2] - b.pos[2]);
}

/** J04: the classification each station declares in its own book (source world content). */
function j04Declarations(bes) {
  const cases = [];
  for (const be of bes) {
    for (const it of be.facts.items || []) {
      const wb = it.item.written_book;
      if (!wb) continue;
      const pages = wb.pages;
      const cid = (pages[0] || '').match(/Case: (CMD-J-\d+)/)?.[1];
      const cmd = (pages.find((p) => /^Java command:/.test(p)) || '').replace(/^Java command:\s*/, '');
      const cls = (pages.find((p) => /^Classification:/.test(p)) || '').replace(/^Classification:\s*/, '').trim();
      if (cid && cmd && cls) cases.push({ case: cid, command: normCmd(cmd), classification: cls, barrel: be.pos });
    }
  }
  const byCmd = new Map();
  for (const c of cases) (byCmd.get(c.command) || byCmd.set(c.command, []).get(c.command)).push(c);
  return byCmd;
}

export async function enumerate(ctx) {
  const { source, worldId } = ctx;
  const ed = source.edition;
  const bes = await allBlockEntities(ed, source.world);
  const decl = worldId.startsWith('J04@') ? j04Declarations(bes) : null;
  const subjects = [];
  for (const be of bes) {
    const f = be.facts;
    const aspects = {};
    const na = NO_COUNTERPART[ed].has(f.id);
    aspects.presence = { direct: na ? 'NA:no-counterpart-block-entity' : 'PRESENT', roundtrip: 'EQUAL' };
    // an empty name ("" is Bedrock's stored default) is no name
    // A kind with no block entity in the other edition (item frames become entities, flower
    // pots a block state…): its name moves to another family — not automated in v1.1.
    if (f.custom_name) aspects.custom_name = { direct: na ? 'NE:content-moves-to-another-family-not-automated' : 'TEXT_EQUAL', roundtrip: 'EQUAL' };
    if (f.sign) {
      aspects.sign_text = { direct: 'TEXT_EQUAL', roundtrip: 'EQUAL' };
      aspects.sign_flags = { direct: 'EQUAL', roundtrip: 'EQUAL' };
      aspects.sign_color = { direct: `NE:${REASON.NO_RULE}`, roundtrip: 'EQUAL' };
    }
    let declared = null;
    if (f.command) {
      if (decl && f.command.text) {
        const c = decl.get(normCmd(f.command.text));
        if (c) {
          const near = c.slice().sort((a, b) => Math.hypot(a.barrel[0] - f.pos[0], a.barrel[2] - f.pos[2]) - Math.hypot(b.barrel[0] - f.pos[0], b.barrel[2] - f.pos[2]))[0];
          declared = { case: near.case, classification: near.classification, role: 'test', source: 'station book' };
        }
      }
      const cls = declared?.classification;
      const direct = !f.command.text ? 'CMD_EMPTY' : cls === 'NO_EQUIVALENT' ? 'NA:declared-no-equivalent'
        : cls === 'ROUND_TRIP_ONLY' ? 'NA:declared-round-trip-only' : cls === 'DIRECT' ? 'CMD_DIRECT' : cls === 'ADAPTABLE' ? 'CMD_ADAPTABLE' : 'CMD_UNCLASSIFIED';
      aspects.command = { direct, roundtrip: 'EQUAL' };
      aspects.command_flags = { direct: 'EQUAL', roundtrip: 'EQUAL' };
    }
    if (f.lectern_book) aspects.lectern_book = { direct: 'TEXT_EQUAL', roundtrip: 'EQUAL' };
    if (f.record) aspects.record = { direct: 'EQUIV', roundtrip: 'EQUAL' };
    aspects.data = { direct: `NE:${REASON.NO_RULE}`, roundtrip: 'EQUAL_DATA' };
    const expected = { id: f.id, custom_name: f.custom_name, sign: f.sign, command: f.command, lectern_book: f.lectern_book && { id: f.lectern_book.id, written_book: f.lectern_book.written_book, writable_book: f.lectern_book.writable_book },
      record: f.record && { id: f.record.id, targets: equivalents('item', ed, f.record.id).targets }, data: withoutItems(f.data), sem: nonEmpty(withoutItems(f.sem)) };
    subjects.push({ family: 'block_entity', locator: { dim: be.dim, pos: be.pos }, ...(declared ? { declared } : {}), expected, aspects });
  }
  return subjects;
}

const withoutItems = (data) => Object.fromEntries(Object.entries(data || {}).filter(([k]) => k !== 'Items'));
const nonEmpty = (sem) => Object.fromEntries(Object.entries(sem || {}).filter(([, v]) => v !== '{}' && v !== '[]'));

function signFlags(s) { return s ? { front_glowing: s.front_glowing, back_glowing: s.back_glowing, waxed: s.waxed } : null; }

function directAspect(aspect, spec, exp, obs, d) {
  if (spec.startsWith('NE:')) return notEvaluated(spec.slice(3));
  if (spec.startsWith('NA:')) return r(NOT_APPLICABLE, `block_entity.${aspect}.${spec.slice(3)}`, obs ? { observed: obs.facts.command?.text ?? obs.facts.id } : {});
  if (aspect === 'presence') return obs ? r(PASS, 'block_entity.presence') : r(FAIL, 'block_entity.presence', { observed: 'no block entity' });
  if (!obs) return r(FAIL, `block_entity.${aspect}`, { observed: 'no block entity' });
  const o = obs.facts;
  switch (aspect) {
    case 'custom_name': return o.custom_name === exp.custom_name ? r(PASS, 'block_entity.custom_name.text') : r(FAIL, 'block_entity.custom_name.text', { observed: o.custom_name ?? null });
    case 'sign_text': {
      if (!o.sign) return r(FAIL, 'block_entity.sign_text', { observed: 'not a sign' });
      const ok = JSON.stringify(trimLines(o.sign.front)) === JSON.stringify(trimLines(exp.sign.front)) && JSON.stringify(trimLines(o.sign.back)) === JSON.stringify(trimLines(exp.sign.back));
      if (ok) return r(PASS, 'block_entity.sign_text.lines');
      // Bedrock wraps sign text itself; Java shows 4 fixed lines. The same words, only
      // broken into lines differently, is the adaptation the edition difference imposes.
      const words = (lines) => (lines || []).join(' ').replace(/\s+/g, ' ').trim();
      if (words(o.sign.front) === words(exp.sign.front) && words(o.sign.back) === words(exp.sign.back)) return r(ADAPTED, 'block_entity.sign_text.rewrapped', { observed: { front: o.sign.front, back: o.sign.back } });
      return r(FAIL, 'block_entity.sign_text.lines', { observed: { front: o.sign.front, back: o.sign.back } });
    }
    case 'sign_flags': {
      if (!o.sign) return r(FAIL, 'block_entity.sign_flags', { observed: 'not a sign' });
      const ok = JSON.stringify(signFlags(o.sign)) === JSON.stringify(signFlags(exp.sign));
      return r(ok ? PASS : FAIL, 'block_entity.sign_flags.glowing-waxed', ok ? {} : { observed: signFlags(o.sign) });
    }
    case 'command': {
      const src = normCmd(exp.command.text), got = normCmd(o.command?.text);
      if (!o.command) return r(FAIL, 'block_entity.command', { observed: 'not a command block' });
      if (spec === 'CMD_EMPTY') return got === '' ? r(PASS, 'block_entity.command.empty-stays-empty') : r(FAIL, 'block_entity.command.empty-stays-empty', { observed: got });
      // Removed command: a loss only when the station DECLARED an equivalent (DIRECT /
      // ADAPTABLE). For an undeclared command MCCB does not know whether the target
      // edition can express it at all, so it gives no verdict (counted apart).
      if (got === '') return spec === 'CMD_UNCLASSIFIED' ? notEvaluated('command-removed-equivalence-undeclared', { observed: '' }) : r(FAIL, 'block_entity.command.removed-despite-declared-equivalent', { observed: '' });
      // Rule 42 (audit 2026-09-25): a verbatim copy was a PASS whenever the station declared a
      // DIRECT equivalent — but "an equivalent exists" is not "the same text is valid in the
      // other edition": `summon … {NBT}` or `@e[limit=1]` copied into Bedrock are not. MCCB
      // cannot check either the copy or a translation without the game: same verdict for both.
      if (spec === 'CMD_DIRECT') return notEvaluated(got === src ? 'verbatim-command-validity-needs-runtime' : REASON.TRANSLATION_NEEDS_RUNTIME, { observed: got });
      return notEvaluated(REASON.TRANSLATION_NEEDS_RUNTIME, { observed: got, verbatim: got === src });
    }
    case 'command_flags': {
      if (!o.command) return r(FAIL, 'block_entity.command_flags', { observed: 'not a command block' });
      if (exp.command.text && !normCmd(o.command.text)) return notEvaluated('flags-moot-command-removed', { observed: { auto: o.command.auto, track_output: o.command.track_output } });
      const ok = o.command.auto === exp.command.auto && o.command.track_output === exp.command.track_output;
      return r(ok ? PASS : FAIL, 'block_entity.command_flags.auto-track', ok ? {} : { observed: { auto: o.command.auto, track_output: o.command.track_output } });
    }
    case 'lectern_book': {
      const eb = exp.lectern_book, ob = o.lectern_book;
      if (!ob) return r(FAIL, 'block_entity.lectern_book', { observed: 'no book' });
      const ep = eb.written_book?.pages || eb.writable_book?.pages || [], op = ob.written_book?.pages || ob.writable_book?.pages || [];
      const ok = JSON.stringify(ep) === JSON.stringify(op);
      return r(ok ? PASS : FAIL, 'block_entity.lectern_book.pages', ok ? {} : { observed: op.slice(0, 3) });
    }
    case 'record': return o.record && (exp.record.targets || []).includes(o.record.id) ? r(PASS, 'block_entity.record.identity') : r(FAIL, 'block_entity.record.identity', { observed: o.record?.id ?? null });
    default: return notEvaluated('unknown-aspect');
  }
}

function roundtripAspect(aspect, exp, obs) {
  if (aspect === 'presence') return obs && obs.facts.id === exp.id ? r(PASS, 'block_entity.presence.roundtrip') : r(FAIL, 'block_entity.presence.roundtrip', { observed: obs ? obs.facts.id : 'no block entity' });
  if (!obs) return r(FAIL, `block_entity.${aspect}.roundtrip`, { observed: 'no block entity' });
  const o = obs.facts;
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  switch (aspect) {
    case 'custom_name': return eq(o.custom_name, exp.custom_name) ? r(PASS, 'block_entity.custom_name.roundtrip') : r(FAIL, 'block_entity.custom_name.roundtrip', { observed: o.custom_name ?? null });
    case 'sign_text': return o.sign && eq(trimLines(o.sign.front), trimLines(exp.sign.front)) && eq(trimLines(o.sign.back), trimLines(exp.sign.back)) ? r(PASS, 'block_entity.sign_text.roundtrip') : r(FAIL, 'block_entity.sign_text.roundtrip', { observed: o.sign ? { front: o.sign.front, back: o.sign.back } : null });
    case 'sign_flags': return o.sign && eq(signFlags(o.sign), signFlags(exp.sign)) ? r(PASS, 'block_entity.sign_flags.roundtrip') : r(FAIL, 'block_entity.sign_flags.roundtrip', { observed: signFlags(o.sign) });
    case 'sign_color': {
      const pick = (s) => (s ? [s.front_color ?? s.front_color_argb, s.back_color ?? s.back_color_argb] : null);
      return eq(pick(o.sign), pick(exp.sign)) ? r(PASS, 'block_entity.sign_color.roundtrip') : r(FAIL, 'block_entity.sign_color.roundtrip', { observed: pick(o.sign) });
    }
    case 'command': return o.command && o.command.text === exp.command.text ? r(PASS, 'block_entity.command.roundtrip') : r(FAIL, 'block_entity.command.roundtrip', { observed: o.command?.text ?? null });
    case 'command_flags': return o.command && o.command.auto === exp.command.auto && o.command.track_output === exp.command.track_output ? r(PASS, 'block_entity.command_flags.roundtrip') : r(FAIL, 'block_entity.command_flags.roundtrip', { observed: o.command ? { auto: o.command.auto, track_output: o.command.track_output } : null });
    case 'lectern_book': return o.lectern_book && eq(o.lectern_book.written_book || o.lectern_book.writable_book, exp.lectern_book.written_book || exp.lectern_book.writable_book) ? r(PASS, 'block_entity.lectern_book.roundtrip') : r(FAIL, 'block_entity.lectern_book.roundtrip');
    case 'record': return o.record && o.record.id === exp.record.id ? r(PASS, 'block_entity.record.roundtrip') : r(FAIL, 'block_entity.record.roundtrip', { observed: o.record?.id ?? null });
    case 'data': {
      const got = withoutItems(o.data), gotSem = nonEmpty(withoutItems(o.sem));
      const strict = [...new Set([...Object.keys(exp.data), ...Object.keys(got)])].filter((k) => exp.data[k] !== got[k]).sort();
      if (!strict.length) return r(PASS, 'block_entity.data.roundtrip');
      // Rule 46: zero-valued keys read like absent ones (zeroFree).
      const es = zeroFreeMap(exp.sem), gs = zeroFreeMap(gotSem);
      const keys = [...new Set([...Object.keys(es), ...Object.keys(gs)])].filter((k) => es[k] !== gs[k]).sort();
      if (!keys.length) return r(PASS, 'block_entity.data.roundtrip.semantic-equal', { strict_differing_keys: strict.slice(0, 20) });
      return r(PARTIAL, 'block_entity.data.roundtrip', { differing_keys: keys.slice(0, 20), differing_count: keys.length, ...keyClasses(keys, es, gs), sample: Object.fromEntries(keys.slice(0, 3).map((k) => [k, [es[k] ?? null, gs[k] ?? null].map((x) => x && x.slice(0, 160))])) });
    }
    default: return notEvaluated('unknown-aspect');
  }
}

export async function evaluate(subject, ctx) {
  const res = {};
  const d = ctx.direct, rt = ctx.roundtrip;
  const dObs = d.world ? await d.blockEntityAt(subject.locator.dim, subject.locator.pos) : null;
  const rObs = rt?.world ? await rt.blockEntityAt(subject.locator.dim, subject.locator.pos) : null;
  for (const [aspect, spec] of Object.entries(subject.aspects)) {
    res[aspect] = {
      direct: !d.world ? r(FAIL, `block_entity.${aspect}.world-opens`, { observed: REASON.WORLD_DOES_NOT_OPEN }) : directAspect(aspect, spec.direct, subject.expected, dObs, d),
      roundtrip: !rt ? notEvaluated(REASON.NO_ROUNDTRIP) : !rt.world ? r(FAIL, `block_entity.${aspect}.world-opens`, { observed: REASON.WORLD_DOES_NOT_OPEN })
        : String(spec.roundtrip || '').startsWith('NE:') ? notEvaluated(spec.roundtrip.slice(3))
        : String(spec.roundtrip || '').startsWith('NA:') ? r(NOT_APPLICABLE, `block_entity.${aspect}.${spec.roundtrip.slice(3)}`)
        : roundtripAspect(aspect, subject.expected, rObs),
    };
  }
  return res;
}

/** Evidence only (never changes a status): which differing keys were lost, added or changed. */
export function keyClasses(keys, src, got) {
  return { lost: keys.filter((k) => k in src && !(k in got)), added: keys.filter((k) => !(k in src) && k in got), changed: keys.filter((k) => k in src && k in got) };
}
