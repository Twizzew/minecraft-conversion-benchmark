// Family "item_stack": one item stack stored in a container block entity.
// docs/fixture-rules.md §3.3 — one assertion per stored component.
import { equivalents } from '../lib/identity.mjs';
import { allBlockEntities } from './block_entity.mjs';
import { r, notEvaluated, PASS, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';
import { bedrockRegistry } from '../lib/registry.mjs';
import { chestPair, containerAsShown } from '../lib/chest-pairs.mjs';
import { directSlot } from '../lib/slots.mjs';
import { gameRead, numberOf } from '../lib/nbt.mjs';

// Rule 40 (audit 2026-09-25): a Bedrock item stored under a LEGACY name that the current
// Bedrock registry no longer has (`planks`, `sapling`, `red_flower`…, the variant sitting in
// the item's `Block`). The game renames it when it reads it; MCCB has no neutral table of
// those renames — the same situation as legacy palette entries (rule 26). Its identity (and
// aux, tag) is NOT_EVALUATED at both levels; its COUNT is still judged on the stack found in
// the same slot, whatever name that stack carries.
export const LEGACY_ITEM = 'legacy-bedrock-item-no-upgrade-reference';
export const isLegacyBedrockItem = (id) => !!id && !bedrockRegistry().items.has(id) && !bedrockRegistry().blocks.has(id);

// Components (Java name) with an MCCB v1.1 cross-edition rule, and how each edition
// stores them (see lib/facts.mjs). Every other component: direct NOT_EVALUATED.
const JAVA_DEFAULT_ZERO = new Set(['minecraft:repair_cost', 'minecraft:damage']);
export const COMPONENT_RULES = {
  'minecraft:custom_name': (f) => f.text?.custom_name,
  'minecraft:lore': (f) => f.text?.lore,
  'minecraft:damage': (f) => f.damage,
  'minecraft:unbreakable': (f) => f.unbreakable,
  'minecraft:repair_cost': (f) => f.repair_cost,
  'minecraft:trim': (f) => f.trim,
  'minecraft:dyed_color': (f) => (f.dyed_color === undefined ? undefined : Number(f.dyed_color) & 0xffffff),
  'minecraft:written_book_content': (f) => f.written_book && { title: f.written_book.title, author: f.written_book.author, pages: f.written_book.pages },
  'minecraft:writable_book_content': (f) => f.writable_book && { pages: f.writable_book.pages },
};
// Bedrock item-tag keys and the Java component they correspond to (same rules).
const BEDROCK_KEY_TO_COMPONENT = [
  ['custom_name', 'minecraft:custom_name', (f) => !!f.text?.custom_name],
  ['lore', 'minecraft:lore', (f) => f.text?.lore !== undefined],
  ['damage', 'minecraft:damage', (f) => f.damage !== undefined && f.damage !== 0],
  ['unbreakable', 'minecraft:unbreakable', (f) => f.unbreakable],
  ['repair_cost', 'minecraft:repair_cost', (f) => f.repair_cost !== undefined],
  ['trim', 'minecraft:trim', (f) => f.trim !== undefined],
  ['dyed_color', 'minecraft:dyed_color', (f) => f.dyed_color !== undefined],
  ['written_book', 'minecraft:written_book_content', (f) => f.written_book !== undefined],
  ['writable_book', 'minecraft:writable_book_content', (f) => f.writable_book !== undefined],
];

export async function enumerate(ctx) {
  const ed = ctx.source.edition;
  const bes = await allBlockEntities(ed, ctx.source.world);
  const out = [];
  for (const be of bes) {
    // Rule 49 (v1.3, F12): the half of a double chest the player sees first (source edition).
    const pair = (be.facts.items || []).length ? await chestPair(ed, ctx.source.world, be.dim, be.pos) : null;
    for (const { slot, item } of be.facts.items || []) {
      const eq = equivalents('item', ed, item.id);
      const aspects = {
        identity: { direct: eq.status === 'equivalent' ? 'EQUIV' : eq.status === 'edition_only' ? 'NA:edition-only' : `NE:${REASON.NO_IDENTITY_REFERENCE}`, roundtrip: 'EQUAL' },
        count: { direct: eq.status === 'edition_only' ? 'NA:edition-only' : 'EQUAL', roundtrip: 'EQUAL' },
      };
      const expected = { id: item.id, count: item.count, targets: eq.targets, container: be.facts.id };
      if (pair && slot !== null && slot !== undefined) expected.pair_half = pair.half;
      if (ed === 'java') {
        expected.components = item.components; expected.components_sem = item.components_sem;
        expected.ruled = {};
        for (const name of Object.keys(item.components)) {
          const rule = COMPONENT_RULES[name];
          aspects[`component:${name}`] = { direct: eq.status === 'edition_only' ? 'NA:edition-only' : rule ? 'RULE' : `NE:${REASON.NO_RULE}`, roundtrip: 'EQUAL' };
          if (rule) expected.ruled[name] = rule(item);
        }
      } else {
        expected.aux = item.aux; expected.tag = item.tag; expected.tag_sem = item.tag_sem; expected.block = item.block; expected.ruled = {};
        for (const [key, comp, present] of BEDROCK_KEY_TO_COMPONENT) {
          if (!present(item)) continue;
          aspects[`component:${comp}`] = { direct: eq.status === 'edition_only' ? 'NA:edition-only' : 'RULE', roundtrip: 'EQUAL' };
          expected.ruled[comp] = COMPONENT_RULES[comp](item);
        }
        if (item.tag) aspects.tag = { direct: `NE:${REASON.NO_RULE}`, roundtrip: 'EQUAL' };
        if (item.aux) aspects.aux = { direct: `NE:${REASON.NO_RULE}`, roundtrip: 'EQUAL' };
        if (isLegacyBedrockItem(item.id)) {
          expected.legacy = true;
          for (const k of ['identity', 'aux', 'tag']) if (aspects[k]) { aspects[k].direct = `NE:${LEGACY_ITEM}`; aspects[k].roundtrip = `NE:${LEGACY_ITEM}`; }
        }
      }
      out.push({ family: 'item_stack', locator: { dim: be.dim, pos: be.pos, slot }, expected, aspects });
    }
  }
  return out;
}

// Rule 53 (v1.3 closure): the stack is looked for in ITS position only — the source slot (round
// trip) or the slot holding the same role in the target edition (direct, lib/slots.mjs). The
// v1.3 freeze also accepted the same item found in any other slot ("found in slot N"); a
// stack in another slot is not the same container state. Where it was found is kept as
// evidence. A source slot with no counterpart (null) or unknown is never a PASS.
function findStack(obs, slot, targets, sameEdition, expId, legacy = false) {
  const items = obs?.facts?.items || [];
  if (slot === null || slot === undefined) return { unknownSlot: true };
  const at = items.find((x) => x.slot === slot);
  // Legacy source name (rule 40): any stack in the same slot is the one to count.
  if (legacy && at) return { item: at.item, slot };
  const ok = (it) => (sameEdition ? it.id === expId : (targets || []).includes(it.id));
  if (at && ok(at.item)) return { item: at.item, slot };
  const elsewhere = items.find((x) => x.slot !== slot && ok(x.item));
  // evidence only: the same local slot in the other half of a double chest = the two halves are
  // SHOWN in the other order (rule 49), not a stack moved inside its half
  const where = elsewhere ? { found_in_slot: elsewhere.slot, expected_slot: slot, ...(slot >= 0 && Math.abs(elsewhere.slot - slot) === 27 ? { cause: 'double-chest-halves-shown-in-other-order' } : {}) } : {};
  return at ? { item: at.item, slot, wrong: true, where } : { missing: true, where };
}

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export async function evaluate(subject, ctx) {
  const res = {};
  const { locator, expected: e } = subject;
  const d = ctx.direct, rt = ctx.roundtrip;
  // Rule 49 (v1.3, F12): a stack of a source double chest is looked for in the target's
  // container AS SHOWN (both halves, combined slots) when the target also holds a double chest
  // there; otherwise in the block alone, as before.
  // A pair whose display order is undetermined (source half null, or target pair without a
  // unique lead) is never a PASS: the stack is only looked for in its local slot of either half
  // (`alt`), and finding it there is NOT_EVALUATED (rule 49, D).
  // v1.3 closure, pass 4: an UNDETERMINED pair on either side (source `pair_half` null, or a
  // target chest whose pair markers make no consistent pair) is never read as a single chest.
  const chestLike = /(^|:)(trapped_)?chest$|copper_chest$|^Chest$/.test(e.container || '');
  const vue = async (v, slot) => {
    if (!v?.world) return { obs: null, slot };
    if (e.pair_half === undefined && !chestLike) return { obs: await v.blockEntityAt(locator.dim, locator.pos), slot };
    const c = await containerAsShown(v, locator.dim, locator.pos);
    if (slot === null || slot === undefined) return { obs: c.obs, slot };
    if (c.ambiguous || e.pair_half === null) return { obs: c.obs, slot, alt: slot + 27, undetermined: true };
    // source single chest: read the target block on its own (rule 49 as before), unless undetermined (above)
    if (e.pair_half === undefined) return { obs: await v.blockEntityAt(locator.dim, locator.pos), slot };
    return c.half === null ? { obs: c.obs, slot } : { obs: c.obs, slot: slot + 27 * e.pair_half };
  };
  // direct: the target slot with the same role (brewing stand); round trip: the same slot
  const dV = await vue(d, directSlot(e.container, ctx.sourceEdition, locator.slot)), rV = await vue(rt, locator.slot);
  const dObs = dV.obs, rObs = rV.obs;
  const look = (V, targets, same) => {
    const h = findStack(V.obs, V.slot, targets, same, e.id, !!e.legacy);
    if (!V.undetermined) return h;
    const h2 = h?.item && !h.wrong ? h : findStack(V.obs, V.alt, targets, same, e.id, !!e.legacy);
    return h2?.item && !h2.wrong ? { halfUndetermined: true, item: h2.item } : h;
  };
  const dHit = look(dV, e.targets, false);
  const rHit = look(rV, null, true);
  for (const [aspect, spec] of Object.entries(subject.aspects)) {
    // direct
    let dr;
    if (!d.world) dr = r(FAIL, `item_stack.${aspect}.world-opens`, { observed: REASON.WORLD_DOES_NOT_OPEN });
    else if (spec.direct.startsWith('NE:')) dr = notEvaluated(spec.direct.slice(3), dHit?.item ? { observed: dHit.item.id } : {});
    else if (spec.direct.startsWith('NA:')) dr = r(NOT_APPLICABLE, `item_stack.${aspect}.${spec.direct.slice(3)}`, { observed: dHit?.item?.id ?? null });
    // A different item in the slot is only judgeable when the identity reference knows the
    // source item; otherwise MCCB cannot tell a wrong item from a correctly renamed one.
    else if (dHit?.unknownSlot) dr = notEvaluated('no-cross-edition-slot-reference', { source_slot: locator.slot ?? null });
    else if (dHit?.halfUndetermined) dr = notEvaluated('double-chest-half-order-undetermined', { observed: dHit.item.id });
    else if (dHit?.wrong && !(e.targets || []).length) dr = notEvaluated(REASON.NO_IDENTITY_REFERENCE, { observed: dHit.item.id });
    else if (dHit?.wrong || dHit?.missing) dr = r(FAIL, `item_stack.${aspect}`, { observed: dHit.wrong ? dHit.item.id : (dObs ? 'stack missing' : 'container missing'), ...dHit.where });
    else if (aspect === 'identity') dr = r(PASS, 'item_stack.identity.equivalent');
    else if (aspect === 'count') dr = dHit.item.count === e.count ? r(PASS, 'item_stack.count') : r(FAIL, 'item_stack.count', { observed: dHit.item.count });
    else if (aspect.startsWith('component:')) {
      const comp = aspect.slice(10);
      const got = COMPONENT_RULES[comp](dHit.item);
      // Java: repair_cost and damage default to 0 and the game does not save them at 0 (seen
      // in its own block-entity save, rules-changelog #24). A source value 0 against an
      // absent Java component is the same state.
      const javaDefault0 = JAVA_DEFAULT_ZERO.has(comp) && Number(e.ruled[comp] ?? 0) === 0 && Number(got ?? 0) === 0; // Rule 48 (v1.3, F11): 0 ≡ absent in both editions
      dr = eq(got, e.ruled[comp]) ? r(PASS, `item_stack.component.${comp}`) : javaDefault0 ? r(PASS, `item_stack.component.${comp}.java-default-0`) : r(FAIL, `item_stack.component.${comp}`, { observed: got ?? null });
    } else dr = notEvaluated('unknown-aspect');
    // round trip
    let rr;
    if (!rt) rr = notEvaluated(REASON.NO_ROUNDTRIP);
    else if (!rt.world) rr = r(FAIL, `item_stack.${aspect}.world-opens`, { observed: REASON.WORLD_DOES_NOT_OPEN });
    // Round-trip codes of the fixture (rules 38, 40) — this family ignored them.
    else if (String(spec.roundtrip || '').startsWith('NE:')) rr = notEvaluated(spec.roundtrip.slice(3), rHit?.item ? { observed: rHit.item.id } : {});
    else if (rHit?.unknownSlot) rr = notEvaluated('source-slot-unknown', { source_slot: locator.slot ?? null });
    else if (rHit?.halfUndetermined) rr = notEvaluated('double-chest-half-order-undetermined', { observed: rHit.item.id });
    else if (rHit?.wrong || rHit?.missing) rr = r(FAIL, `item_stack.${aspect}.roundtrip`, { observed: rHit.wrong ? rHit.item.id : (rObs ? 'stack missing' : 'container missing'), ...rHit.where });
    else if (aspect === 'identity') rr = r(PASS, 'item_stack.identity.roundtrip');
    else if (aspect === 'count') rr = rHit.item.count === e.count ? r(PASS, 'item_stack.count.roundtrip') : r(FAIL, 'item_stack.count.roundtrip', { observed: rHit.item.count });
    else if (aspect.startsWith('component:') && ctx.sourceEdition === 'java') {
      const comp = aspect.slice(10);
      // Rule 54: second chance = the component as the game reads it (gameRead: numeric width,
      // {text:"x"} ≡ "x"; an empty list / compound is NOT an absent one).
      const gotC = rHit.item.components?.[comp], expC = e.components[comp];
      const num0 = (x) => (x == null ? 0 : numberOf(x));
      rr = gotC === expC ? r(PASS, 'item_stack.component.roundtrip')
        : gotC !== undefined && gameRead(gotC) === gameRead(expC) ? r(PASS, 'item_stack.component.roundtrip.semantic-equal')
        : JAVA_DEFAULT_ZERO.has(comp) && num0(gotC) === 0 && num0(expC) === 0 ? r(PASS, 'item_stack.component.roundtrip.default-0') // Rule 48 (v1.3, F11)
        : r(FAIL, 'item_stack.component.roundtrip', { observed: (gameRead(gotC) ?? 'absent').slice(0, 300), expected: (gameRead(expC) || '').slice(0, 300) });
    } else if (aspect.startsWith('component:')) {
      const comp = aspect.slice(10);
      const got = COMPONENT_RULES[comp](rHit.item);
      // Rule 48 (MCCB v1.3, defect F11): repair_cost / damage 0 and absent are the same state.
      const zero0 = JAVA_DEFAULT_ZERO.has(comp) && Number(got ?? 0) === 0 && Number(e.ruled[comp] ?? 0) === 0;
      rr = eq(got, e.ruled[comp]) ? r(PASS, 'item_stack.component.roundtrip') : zero0 ? r(PASS, 'item_stack.component.roundtrip.default-0') : r(FAIL, 'item_stack.component.roundtrip', { observed: got ?? null });
    } else if (aspect === 'tag') {
      // Rule 39 as narrowed by rule 54: exact bytes first, then the tag as the game reads it
      // (only tag.Damage:0 / tag.RepairCost:0 and an empty tag read like absent).
      rr = rHit.item.tag === e.tag ? r(PASS, 'item_stack.tag.roundtrip')
        : gameRead(rHit.item.tag, { root: 'bedrock-item-tag' }) === gameRead(e.tag, { root: 'bedrock-item-tag' }) ? r(PASS, 'item_stack.tag.roundtrip.default-values-equal')
        : r(FAIL, 'item_stack.tag.roundtrip', { observed: (rHit.item.tag || '').slice(0, 300) });
    }
    else if (aspect === 'aux') rr = rHit.item.aux === e.aux ? r(PASS, 'item_stack.aux.roundtrip') : r(FAIL, 'item_stack.aux.roundtrip', { observed: rHit.item.aux });
    else rr = notEvaluated('unknown-aspect');
    res[aspect] = { direct: dr, roundtrip: rr };
  }
  return res;
}
