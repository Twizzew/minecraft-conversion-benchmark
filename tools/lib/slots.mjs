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
// Evidence (docs/rules-changelog.md, rule 53): native Bedrock data (R01, a survival world
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

// MCCB 2026-11 (R01, table de gravité 1.4) — DÉTAIL D'UNE PILE. Quand la position attendue
// tient le MÊME objet mais que ses données diffèrent, les champs en cause sont notés (chemins)
// au lieu de compter la pile comme perdue PLUS une pile en trop. Différences TECHNIQUES (comptées,
// sans effet en jeu) :
//  • `WasPickedUp` — drapeau Bedrock « objet ramassé », sans champ Java (pour l'équipement d'une
//    créature, le moteur le porte par la chance de lâcher, jugée par entity.equipment) ;
//  • `wasJustBrewed` — potion sortie de l'alambic, sans champ Java (vérifié en jeu le 02/11/2026 :
//    potions identiques dans les 3 mondes) ;
//  • `Name:legacy` — ancien nom Bedrock que le jeu renomme lui-même au chargement (grass →
//    grass_block ; planks + aux → <bois>_planks, ordre wood_type de Bedrock) ;
//  • `Slot:unordered` — position dans un inventaire que le joueur n'ouvre pas et que Java
//    stocke sans position (villageois, piglin…).
//  • `semx:equal` — aucun champ en écart dans la vue lue par le jeu (seuls `Block` dérivé du nom ou
//    une liste `tag.Items` vide présente d'un seul côté diffèrent : boîte de Shulker vide).
export const TECHNICAL_ITEM_PATH = /(^|\.)(WasPickedUp|wasJustBrewed)$|^Name:legacy$|^Slot:unordered$|^semx:equal$/;
const PLANKS = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak'];
const LEGACY_RENAME = {
  'minecraft:grass': (d) => (d ? null : 'minecraft:grass_block'),
  // Bois lu dans l'aux OU dans `Block.states.wood_type` (planches écrites avec Damage 0).
  'minecraft:planks': (d, a) => { const w = a?.Block?.states?.wood_type ?? PLANKS[d]; return w ? `minecraft:${w}_planks` : null; },
};
const parseSem = (s) => { if (s && typeof s === 'object') return s; try { return JSON.parse(s); } catch { return undefined; } };
const isObj = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
/**
 * Champs qui diffèrent entre deux piles lues en JSON sémantique (`semx`), ou null si ce ne
 * sont pas le même objet (autre identifiant, hors ancien nom Bedrock renommé par le jeu).
 *   dropBlock : ignorer `Block` (compound dérivé du nom, source Bedrock — cf. nbt.withoutDerivedItemBlock).
 *   unordered : ignorer la position `Slot` de premier niveau (notée `Slot:unordered` si elle change).
 */
export function itemDiff(eSem, gSem, { dropBlock = false, unordered = false } = {}) {
  const a = parseSem(eSem), b = parseSem(gSem);
  if (!isObj(a) || !isObj(b)) return null;
  const A = { ...a }, B = { ...b }, out = [];
  const nameA = A.Name ?? A.id, nameB = B.Name ?? B.id;
  if (nameA !== nameB) {
    const ren = LEGACY_RENAME[nameA]?.(Number(A.Damage ?? 0), A);
    if (!ren || ren !== nameB) return null;
    out.push('Name:legacy');
    delete A.Name; delete B.Name; delete A.Damage; delete B.Damage; delete A.Block; delete B.Block;
  }
  if (unordered) { if (A.Slot !== B.Slot) out.push('Slot:unordered'); delete A.Slot; delete B.Slot; }
  const walk = (x, y, p) => {
    if (isObj(x) || isObj(y)) {
      if ((x !== undefined && !isObj(x)) || (y !== undefined && !isObj(y))) { out.push(p || '.'); return; }
      const X = x || {}, Y = y || {};
      for (const k of new Set([...Object.keys(X), ...Object.keys(Y)])) {
        if (dropBlock && k === 'Block') continue;
        walk(X[k], Y[k], p ? `${p}.${k}` : k);
      }
    } else if (Array.isArray(x) && Array.isArray(y)) {
      if (x.length !== y.length) { out.push(`${p}[]`); return; }
      x.forEach((v, i) => walk(v, y[i], `${p}[${i}]`));
    } else if (JSON.stringify(x) !== JSON.stringify(y)) {
      // Règles 48 / 54 : `tag.Damage:0` et `tag.RepairCost:0` se lisent comme absents.
      if (/(^|\.)tag\.(Damage|RepairCost)$/.test(p) && Number(x ?? 0) === 0 && Number(y ?? 0) === 0) return;
      // MCCB 2026-11 : bannière ou bouclier, `tag.Type` 0 = normal ; seul `Type` 1 (pillard) dit
      // quelque chose. Natif R01 : `{"Type":0}` et rien à côté.
      if (/(^|\.)tag\.Type$/.test(p) && Number(x ?? 0) === 0 && Number(y ?? 0) === 0) return;
      // Table 1.8 : `tooltip_display.hide_tooltip` faux = absent (TooltipDisplay, `optionalFieldOf(
      // "hide_tooltip", false)`, jar 26.3) ; le DataFixer l'écrit en migrant `HideFlags`.
      if (/(^|\.)minecraft:tooltip_display\.hide_tooltip$/.test(p) && !Number(x ?? 0) && !Number(y ?? 0)) return;
      out.push(p || '.');
    }
  };
  walk(A, B, '');
  return out;
}
export const technicalOnly = (paths) => paths.length > 0 && paths.every((p) => TECHNICAL_ITEM_PATH.test(p.replace(/\[\d+\]/g, '')));

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
 * `exact` (rule 57, round trip — EQUAL means the same inventory): every observed stack must be
 * one of the expected ones; a stack left over (an item the source did not hold) keeps the
 * comparison from PASS. Without it (direct level) extra stacks are not judged here.
 * @returns {{ status: 'PASS'|'PARTIAL'|'FAIL'|null, reason?, matched, unverified, of, wrong, extra }}
 */
export function compareByPosition(exp, got, key, same, { exact = false, diff = null } = {}) {
  const used = new Set();
  let matched = 0, unverified = 0;
  const wrong = [];
  const later = [];
  for (const e of exp) {
    const k = key(e);
    if (k === undefined || k === null) { later.push([e, k]); continue; }
    const i = got.findIndex((g, j) => !used.has(j) && g.slot === k);
    if (i >= 0 && same(e, got[i].item)) { matched++; used.add(i); continue; }
    // Même objet à la même position, données différentes : on dit lesquelles (cf. itemDiff).
    const d0 = i >= 0 && diff ? diff(e, got[i].item) : null;
    const d = d0 && !d0.length && got[i].item.id === e.id ? ['semx:equal'] : d0;
    if (d && d.length) { used.add(i); wrong.push({ id: e.id, expected_slot: k, observed: got[i].item.id, differs: d.slice(0, 8), ...(technicalOnly(d) ? { technical: true } : {}) }); continue; }
    const elsewhere = got.findIndex((g, j) => !used.has(j) && g.slot !== k && same(e, g.item));
    // Même identifiant mais aucun champ en écart lisible : la preuve garde les deux piles (tronquées).
    const vues = i >= 0 && got[i].item.id === e.id && diff ? { sem_expected: String(e.semx ?? e.sem).slice(0, 400), sem_observed: String(got[i].item.semantic ?? got[i].item.semx ?? got[i].item.snbt).slice(0, 400) } : {};
    wrong.push({ id: e.id, expected_slot: k, observed: i >= 0 ? got[i].item.id : null, ...(elsewhere >= 0 ? { found_in_slot: got[elsewhere].slot } : {}), ...vues });
  }
  let reason = null;
  for (const [e, k] of later) {
    const i = got.findIndex((g, j) => !used.has(j) && same(e, g.item));
    if (i >= 0) { unverified++; used.add(i); reason = k === null ? NO_SLOT_MAPPING : SLOT_NOT_RECORDED; } else wrong.push({ id: e.id, expected_slot: k ?? 'unknown', observed: null });
  }
  const of = exp.length;
  const extra = exact ? got.filter((_, j) => !used.has(j)).map((g) => ({ slot: g.slot ?? null, observed: g.item.id })) : [];
  let status;
  if (!wrong.length && !extra.length) status = unverified ? null : 'PASS';
  else status = matched + unverified ? 'PARTIAL' : 'FAIL';
  const technical_only = wrong.length > 0 && !extra.length && wrong.every((w) => w.technical);
  return { status, reason, matched, unverified, of, wrong, extra, ...(technical_only ? { technical_only } : {}) };
}
