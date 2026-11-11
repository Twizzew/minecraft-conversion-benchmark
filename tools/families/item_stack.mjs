// Family "item_stack": one item stack stored in a container block entity.
// docs/fixture-rules.md §3.3 — one assertion per stored component.
import { equivalents } from '../lib/identity.mjs';
import { allBlockEntities } from './block_entity.mjs';
import { r, notEvaluated, PASS, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';
import { bedrockRegistry } from '../lib/registry.mjs';
import { chestPair, containerAsShown } from '../lib/chest-pairs.mjs';
import { directSlot } from '../lib/slots.mjs';
import { gameRead, numberOf } from '../lib/nbt.mjs';
import { detailsDe, comparerDetail } from '../lib/details-objet.mjs';

// Rule 40 (audit 2026-09-25): a Bedrock item stored under a LEGACY name that the current
// Bedrock registry no longer has (`planks`, `sapling`, `red_flower`…, the variant sitting in
// the item's `Block`). The game renames it when it reads it; MCCB has no neutral table of
// those renames — the same situation as legacy palette entries (rule 26). Its identity (and
// aux, tag) is NOT_EVALUATED at both levels; its COUNT is still judged on the stack found in
// the same slot, whatever name that stack carries.
export const LEGACY_ITEM = 'legacy-bedrock-item-no-upgrade-reference';
export const isLegacyBedrockItem = (id) => !!id && !bedrockRegistry().items.has(id) && !bedrockRegistry().blocks.has(id);
// Table 1.10 (07/11/2026, tri des majeures d'UMT) : même cas quand le NOM est encore connu mais que
// le `Block` de la pile porte un état que le bloc actuel n'a plus (ex. R01 : `minecraft:stone`
// + `Block {stone_type: granite}`, ancienne écriture du granite, Damage 0). Le jeu met ce bloc à
// jour au chargement (règle 26, côté blocs) ; MCCB n'a pas de table neutre de ces mises à jour :
// identité, aux et tag ne sont pas jugés, le nombre l'est toujours dans la même case.
export const isLegacyBedrockBlockEntry = (b) => {
  if (!b?.name) return false;
  const reg = bedrockRegistry();
  // prudence : seul un bloc CONNU portant un état disparu compte ; un nom inconnu reste à la règle 40
  if (!reg.blocks.has(b.name)) return false;
  const keys = reg.blockStateKeys.get(b.name) || [];
  return b.stateKeys.some((k) => !keys.includes(k));
};

// Table de gravité 1.4 : un tag qui ne diffère QUE par des champs sans effet en jeu
// (lib/slots.mjs TECHNICAL_ITEM_PATH : WasPickedUp, wasJustBrewed) — compté, classé TECHNICAL.
const CHAMPS_TECHNIQUES = new Set(['WasPickedUp', 'wasJustBrewed']);
function sansTechnique(x) {
  if (Array.isArray(x)) return x.map(sansTechnique);
  if (!x || typeof x !== 'object') return x;
  const o = {};
  for (const [k, v] of Object.entries(x)) if (!CHAMPS_TECHNIQUES.has(k)) o[k] = sansTechnique(v);
  return o;
}
function tagSeulementTechnique(expSem, gotTag, { aux, id, gotSem } = {}) {
  let e; try { e = JSON.parse(expSem); } catch { return {}; }
  if (!e || typeof e !== 'object' || Array.isArray(e)) return {};
  const reste = sansTechnique(e);
  const vide = !reste || (typeof reste === 'object' && !Object.keys(reste).length);
  const gotVide = !gotTag || gameRead(gotTag, { root: 'bedrock-item-tag' }) === gameRead('{}', { root: 'bedrock-item-tag' });
  if (vide && gotVide && JSON.stringify(e) !== '{}') return { technical_only: true, differs: Object.keys(e) };
  // Table 1.6 : mêmes données une fois retirés, à toute profondeur (boîte, sac), les champs sans
  // information : voir `normePile`. La comparaison porte sur le tag lu des deux côtés.
  let g = {}; try { g = gotSem ? JSON.parse(gotSem) : {}; } catch { return {}; }
  const canon = (x) => JSON.stringify(x, (_, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, v[k]])) : v));
  const nA = normePile({ Name: id, Damage: aux, tag: e }), nB = normePile({ Name: id, Damage: aux, tag: g });
  return canon(nA) === canon(nB) ? { technical_only: true, differs: ['tag:equal-once-normalized'] } : {};
}
// Numéro de potion Bedrock → nom Java du champ `tag.Potion` que portent des potions de ce vieux monde
// (table de la potion : BDS `potion.*` et `POTION_J2B` du moteur ne sont pas lus ; liste propre au script).
// Le champ redit l'aux, qui reste identique : la même potion, avec ou sans lui.
const POTION_PAR_AUX = ['water', 'mundane', 'mundane', 'thick', 'awkward', 'night_vision', 'long_night_vision', 'invisibility', 'long_invisibility', 'leaping', 'long_leaping', 'strong_leaping', 'fire_resistance', 'long_fire_resistance', 'swiftness', 'long_swiftness', 'strong_swiftness', 'slowness', 'long_slowness', 'water_breathing', 'long_water_breathing', 'healing', 'strong_healing', 'harming', 'strong_harming', 'poison', 'long_poison', 'strong_poison', 'regeneration', 'long_regeneration', 'strong_regeneration', 'strength', 'long_strength', 'strong_strength', 'weakness', 'long_weakness', null, 'turtle_master', 'long_turtle_master', 'strong_turtle_master', 'slow_falling', 'long_slow_falling', 'strong_slowness', 'wind_charged', 'weaving', 'oozing', 'infested'];
// Pile (ou tag) : sans `Block` dérivé du nom, `WasPickedUp`, `wasJustBrewed`, `Potion` qui redit l'aux,
// `Type` 0 de bannière, `Damage`/`RepairCost` à 0, cases vides ; un tag vide vaut absent.
// 10/11/2026 (R01, boîte sans couleur) : ancienne pierre collective (`stone` + `Block.states.stone_type`) — le
// jeu la relit sous son nom actuel (`stone_type:andesite` → `andesite`) : le même objet.
const PIERRE_PAR_TYPE = { granite: 'granite', granite_smooth: 'polished_granite', diorite: 'diorite', diorite_smooth: 'polished_diorite',
  andesite: 'andesite', andesite_smooth: 'polished_andesite' };
export function normePile(x) {
  if (Array.isArray(x)) return x.map(normePile).filter((o) => !(o && typeof o === 'object' && (o.Count === 0 || o.Name === '')));
  if (!x || typeof x !== 'object') return x;
  if (x.Name === 'minecraft:stone' && PIERRE_PAR_TYPE[x.Block?.states?.stone_type]) x = { ...x, Name: `minecraft:${PIERRE_PAR_TYPE[x.Block.states.stone_type]}` };
  const o = {};
  for (const [k, v] of Object.entries(x)) if (!CHAMPS_TECHNIQUES.has(k) && k !== 'Block') o[k] = normePile(v);
  if (o.tag && typeof o.tag === 'object') {
    const t = o.tag;
    if (typeof t.Potion === 'string' && POTION_PAR_AUX[Number(o.Damage ?? 0)] === t.Potion.replace('minecraft:', '')) delete t.Potion;
    if (/banner$|^minecraft:shield$/.test(o.Name || '') && Number(t.Type ?? 0) === 0) delete t.Type;
    for (const c of ['Damage', 'RepairCost']) if (Number(t[c] ?? 1) === 0) delete t[c];
    if (Array.isArray(t.Items) && !t.Items.length) delete t.Items;
    if (!Object.keys(t).length) delete o.tag;
  }
  return o;
}

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

// Lot 1 (08/11/2026) : DÉTAILS jugés à l'aller (lib/details-objet.mjs) — enchantements, potions et
// flèches à effet, contenu d'une boîte ou d'un sac, projectiles chargés, motifs, couleur de base,
// feux d'artifice, cor, bouteille sinistre, couleur d'un lit ou d'une bannière. Code `DETAIL`.
// Java : le composant existait déjà comme aspect (aller non jugé) ; Bedrock : l'aspect est ajouté,
// son retour est déjà jugé par l'aspect `tag` / `aux` / `identity` (pas compté deux fois).
const DEJA_JUGE = new Set(Object.keys(COMPONENT_RULES));
export const RETOUR_DEJA_JUGE = 'roundtrip-judged-by-tag-aux-or-identity';
export function pileAttendue(ed, e) {
  if (ed === 'java') return { id: e.id, count: e.count, components: Object.fromEntries(Object.entries(e.components_sem || {}).map(([k, v]) => { try { return [k, JSON.parse(v)]; } catch { return [k, v]; } })) };
  let tag = {}; try { tag = e.tag_sem ? JSON.parse(e.tag_sem) : {}; } catch { /* tag illisible : aucun détail */ }
  return { Name: e.id, Count: e.count, Damage: e.aux ?? 0, tag };
}
/** Ajoute / active les aspects de détail d'un sujet item_stack (registre dérivé et énumération). */
export function aspectsDetails(ed, s) {
  const d = detailsDe(ed, pileAttendue(ed, s.expected));
  const id = s.aspects.identity?.direct || '';
  const code = /^(NE|NA):/.test(id) ? id : 'DETAIL';
  let n = 0;
  for (const k of Object.keys(d)) {
    const a = `component:${k}`;
    if (DEJA_JUGE.has(k)) continue;
    if (s.aspects[a]) { if (String(s.aspects[a].direct).startsWith(`NE:${REASON.NO_RULE}`)) { s.aspects[a].direct = code; n++; } continue; }
    s.aspects[a] = { direct: code, roundtrip: `NE:${RETOUR_DEJA_JUGE}` }; n++;
  }
  return n;
}

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
        if (isLegacyBedrockItem(item.id) || isLegacyBedrockBlockEntry(item.blockEntry)) {
          expected.legacy = true;
          for (const k of ['identity', 'aux', 'tag']) if (aspects[k]) { aspects[k].direct = `NE:${LEGACY_ITEM}`; aspects[k].roundtrip = `NE:${LEGACY_ITEM}`; }
        }
      }
      aspectsDetails(ed, { expected, aspects });
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
  // même objet à la case, mais coffre double montré dans l'autre ordre : la pile du miroir (même objet)
  // est gardée pour juger les DÉTAILS (vérification du 09/11/2026 : deux épées d'or aux mêmes cases
  // des deux moitiés — la mauvaise était jugée)
  if (at && ok(at.item)) { const mir = slot >= 0 ? items.find((x) => (x.slot === slot + 27 || x.slot === slot - 27) && ok(x.item)) : null; return { item: at.item, slot, ...(mir ? { mir: mir.item } : {}) }; }
  // Correctif 08/11/2026 (vérification) : l'emplacement MIROIR de l'autre moitié d'un coffre double
  // d'abord — sinon la première pile du même objet ailleurs masquait l'inversion des deux moitiés
  // (≈ 820 piles de R01 restaient « perdues » alors que l'objet était à sa place).
  const miroir = slot >= 0 ? items.find((x) => (x.slot === slot + 27 || x.slot === slot - 27) && ok(x.item)) : null;
  const elsewhere = miroir || items.find((x) => x.slot !== slot && ok(x.item));
  // evidence only: the same local slot in the other half of a double chest = the two halves are
  // SHOWN in the other order (rule 49), not a stack moved inside its half
  const where = elsewhere ? { found_in_slot: elsewhere.slot, expected_slot: slot, ...(slot >= 0 && Math.abs(elsewhere.slot - slot) === 27 ? { cause: 'double-chest-halves-shown-in-other-order' } : {}) } : {};
  // pile retrouvée à l'emplacement miroir : gardée (hors preuve) pour juger ses DÉTAILS (lot 1)
  const alt = where.cause ? elsewhere.item : undefined;
  return at ? { item: at.item, slot, wrong: true, where, alt } : { missing: true, where, alt };
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
  const auxInIdentity = ctx.sourceEdition === 'bedrock' && typeof e.aux === 'number' && !subject.aspects.aux;
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
    else if (spec.direct === 'DETAIL' && (!(dHit?.wrong || dHit?.missing) || dHit.alt)) {
      // coffre double montré dans l'autre ordre : les détails sont jugés sur la pile du miroir
      let cible = dHit.wrong || dHit.missing ? dHit.alt : dHit.item;
      const k = aspect.slice(10);
      const att = detailsDe(ctx.sourceEdition, pileAttendue(ctx.sourceEdition, e))[k];
      let obs; try { obs = detailsDe(ctx.sourceEdition === 'java' ? 'bedrock' : 'java', JSON.parse(cible.semantic))[k]; } catch { obs = undefined; }
      let c = comparerDetail(ctx.sourceEdition, k, att, obs);
      if (!c.ok && cible === dHit.item && dHit.mir) {
        let o2; try { o2 = detailsDe(ctx.sourceEdition === 'java' ? 'bedrock' : 'java', JSON.parse(dHit.mir.semantic))[k]; } catch { o2 = undefined; }
        const c2 = comparerDetail(ctx.sourceEdition, k, att, o2);
        if (c2.ok) { c = c2; cible = dHit.mir; }
      }
      dr = att === undefined ? notEvaluated('detail-absent-from-source') : c.ok ? r(PASS, 'item_stack.detail.direct', cible === dHit.item ? {} : { judged_on: 'mirror-slot' }) : r(FAIL, 'item_stack.detail.direct', { attendu: att, observed: c.observe ?? null, ...(cible === dHit.item ? {} : { judged_on: 'mirror-slot' }) });
    }
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
    // Rule 59 (v1.3 closure): a Bedrock stack's data value (aux, the item's `Damage` short) is part
    // of the stack. Every fixture records it (`expected.aux`) but holds an `aux` assertion only for
    // a non-zero value; otherwise the round-trip identity carries it, so a changed aux is judged
    // by exactly one assertion (no new assertion, none counted twice).
    else if (aspect === 'identity') rr = auxInIdentity && rHit.item.aux !== e.aux ? r(FAIL, 'item_stack.identity.roundtrip.aux', { observed: rHit.item.id, observed_aux: rHit.item.aux ?? null, expected_aux: e.aux }) : r(PASS, 'item_stack.identity.roundtrip');
    else if (aspect === 'count') rr = rHit.item.count === e.count ? r(PASS, 'item_stack.count.roundtrip') : r(FAIL, 'item_stack.count.roundtrip', { observed: rHit.item.count });
    else if (aspect.startsWith('component:') && ctx.sourceEdition === 'java') {
      const comp = aspect.slice(10);
      // Rule 54: second chance = the component as the game reads it (gameRead: numeric width,
      // {text:"x"} ≡ "x"; an empty list / compound is NOT an absent one).
      const gotC = rHit.item.components?.[comp], expC = e.components[comp];
      const num0 = (x) => (x == null ? 0 : numberOf(x));
      rr = gotC === expC ? r(PASS, 'item_stack.component.roundtrip')
        : gotC !== undefined && gameRead(gotC) === gameRead(expC) ? r(PASS, 'item_stack.component.roundtrip.semantic-equal')
        // 10/11/2026 : faces de pot (composant d'objet) — même défaut brique que le bloc (KNOWN_DEFAULTS `java-pot-sherds`).
        : comp === 'minecraft:pot_decorations' && gotC !== undefined && gameRead(gotC, { root: 'java-pot-sherds' }) === gameRead(expC, { root: 'java-pot-sherds' }) ? r(PASS, 'item_stack.component.roundtrip.semantic-equal')
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
        : r(FAIL, 'item_stack.tag.roundtrip', { observed: (rHit.item.tag || '').slice(0, 300), ...tagSeulementTechnique(e.tag_sem ?? e.tag, rHit.item.tag, { aux: e.aux, id: e.id, gotSem: rHit.item.tag_sem }) });
    }
    else if (aspect === 'aux') rr = rHit.item.aux === e.aux ? r(PASS, 'item_stack.aux.roundtrip') : r(FAIL, 'item_stack.aux.roundtrip', { observed: rHit.item.aux });
    else rr = notEvaluated('unknown-aspect');
    res[aspect] = { direct: dr, roundtrip: rr };
  }
  return res;
}
