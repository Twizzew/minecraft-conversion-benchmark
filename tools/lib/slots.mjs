// Rule 53 (MCCB v1.3 closure): the POSITION of a stored item is part of the state wherever the
// position means something to the player (a container slot, an inventory slot, an armour or
// hand slot). A stack found in another position is not the same state: there is no "same item
// found elsewhere" PASS. Positions are compared in the target's own numbering:
//  • round trip (same edition): the same raw slot;
//  • direct: the slot that holds the same ROLE in the other edition (table below); every
//    container without an entry keeps its slot number.
//
// Brewing stand (the only container whose persisted numbering differs between editions):
//   Java    0,1,2 = bottles · 3 = ingredient · 4 = fuel
//   Bedrock 0 = ingredient · 1,2,3 = bottles · 4 = fuel
// Evidence (docs/rules-changelog.md, rule 53): native Bedrock data (GURREN, a survival world
// saved by the Bedrock client: slot 0 only ever holds an ingredient, slots 1–3 only potions,
// slot 4 only blaze powder), native Java data (J03, J01: potions in 0–2, nether wart in 3,
// blaze powder in 4), and je2be-core 8dfc4de (Java→Bedrock {1,2,3,0,4}, Bedrock→Java
// {3,0,1,2,4}; bottle i ↔ block state has_bottle_i ↔ brewing_stand_slot_{a,b,c}_bit). Each
// bottle keeps its own position: the three are drawn separately on the block.
const BREWING_J2B = [1, 2, 3, 0, 4];
const BREWING_B2J = [3, 0, 1, 2, 4];

/** Slot of a source stack in a target of the OTHER edition; null = no known counterpart. */
export function directSlot(container, sourceEdition, slot) {
  if (slot === null || slot === undefined) return slot;
  if (sourceEdition === 'java' && container === 'minecraft:brewing_stand') return BREWING_J2B[slot] ?? null;
  if (sourceEdition === 'bedrock' && container === 'BrewingStand') return BREWING_B2J[slot] ?? null;
  return slot;
}

/** Top-level `Slot` of a stored item, read from its semantic JSON (fixtures before rule 53). */
export function slotFromSemantic(semx) {
  if (!semx) return undefined;
  try { const v = JSON.parse(semx); return typeof v?.Slot === 'number' ? v.Slot : undefined; } catch { return undefined; }
}
/** Recorded position of an expected item: `slot` (rule 53 fixtures) or its stored `Slot` tag. */
export const expectedSlot = (x) => (x.slot !== undefined && x.slot !== null ? x.slot : slotFromSemantic(x.semx));

// Entity inventories that are containers a player opens (positions are shown and kept by the
// game). Other inventories (villager, piglin, allay, pillager…) are not shown to the player
// and Java stores them without positions: they stay unordered (multiset) comparisons.
const POSITIONAL = /^minecraft:(chest_minecart|hopper_minecart|chest_boat|[a-z_]+_chest_boat|bamboo_chest_raft|[a-z_]+_chest_raft|donkey|mule|llama|trader_llama)$/;
export const positionalInventory = (entityId) => POSITIONAL.test(entityId || '');
// …and of those, the ones whose slots carry the same number in both editions (je2be-core
// 8dfc4de copies `Slot` unchanged for minecarts and chest boats). Chested equines / llamas
// keep the saddle / carpet in Bedrock `ChestItems` slot 0: their chest numbering across
// editions is not established, so their direct position is not judged (never PASS on content
// alone; a lost stack is still a loss).
const SAME_NUMBERING = /^minecraft:(chest_minecart|hopper_minecart|chest_boat|[a-z_]+_chest_boat|bamboo_chest_raft|[a-z_]+_chest_raft)$/;
export const sameNumberingAcrossEditions = (entityId) => SAME_NUMBERING.test(entityId || '');

export const SLOT_NOT_RECORDED = 'source-slot-not-recorded-in-v1.3-fixture';
export const NO_SLOT_MAPPING = 'no-cross-edition-slot-reference';

/**
 * Positional comparison of expected items with observed ones.
 *   exp: [{ slot?, id, count, sem, semx }]   got: [{ slot, item }]
 *   key(e) → the target position, undefined when the source position is unknown, null when the
 *            position has no known counterpart in the target.
 *   same(e, g) → the observed item is the expected one (identity / count / content).
 * Positions known: one-to-one by position. Positions unknown: matched as a multiset among the
 * observed stacks left over — a full match is then NOT a PASS (the position is unverified).
 * @returns {{ status: 'PASS'|'PARTIAL'|'FAIL'|null, reason?, matched, unverified, of, wrong }}
 */
export function compareByPosition(exp, got, key, same) {
  const used = new Set();
  let matched = 0, unverified = 0;
  const wrong = [];
  const later = [];
  for (const e of exp) {
    const k = key(e);
    if (k === undefined || k === null) { later.push([e, k]); continue; }
    const i = got.findIndex((g, j) => !used.has(j) && g.slot === k);
    if (i >= 0 && same(e, got[i].item)) { matched++; used.add(i); continue; }
    const elsewhere = got.findIndex((g, j) => !used.has(j) && g.slot !== k && same(e, g.item));
    wrong.push({ id: e.id, expected_slot: k, observed: i >= 0 ? got[i].item.id : null, ...(elsewhere >= 0 ? { found_in_slot: got[elsewhere].slot } : {}) });
  }
  let reason = null;
  for (const [e, k] of later) {
    const i = got.findIndex((g, j) => !used.has(j) && same(e, g.item));
    if (i >= 0) { unverified++; used.add(i); reason = k === null ? NO_SLOT_MAPPING : SLOT_NOT_RECORDED; } else wrong.push({ id: e.id, expected_slot: k ?? 'unknown', observed: null });
  }
  const of = exp.length;
  let status;
  if (!wrong.length) status = unverified ? null : 'PASS';
  else status = matched + unverified ? 'PARTIAL' : 'FAIL';
  return { status, reason, matched, unverified, of, wrong };
}
