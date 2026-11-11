// Family "entity": mobs, vehicles, armor stands, projectiles, items on the ground…
// docs/fixture-rules.md §3.4
import { equivalents } from '../lib/identity.mjs';
import { r, notEvaluated, PASS, PARTIAL, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';
import { readBlock } from './block.mjs';
import { keyClasses } from './block_entity.mjs';
import { isLegacyBedrockItem, LEGACY_ITEM } from './item_stack.mjs';
import { javaRegistry } from '../lib/registry.mjs';
import { gameRead, gameReadMap, withoutDerivedItemBlock } from '../lib/nbt.mjs';
import { compareByPosition, expectedSlot, positionalInventory, sameNumberingAcrossEditions, itemDiff, technicalOnly } from '../lib/slots.mjs';
import { tradeOffers, vieMaxJava } from '../lib/facts.mjs';
import { crossData } from '../lib/cross-data.mjs';
import { detailsDe, verdictDetailsTenus, ecartsDetails } from '../lib/details-objet.mjs';
import { keyDetails } from '../lib/key-detail.mjs';
import { openSource } from '../lib/open.mjs';
import { plain } from '../lib/nbt.mjs';

export const MATCH_RADIUS = { direct: 2.0, roundtrip: 0.75 };
export const POSITION_TOLERANCE = { direct: { horizontal: 0.5, vertical: 1.0 }, roundtrip: { horizontal: 0.01, vertical: 0.01 } };
export const HEALTH_TOLERANCE = { direct: 0.5, roundtrip: 0.001 };
// Java species that store a tamed state (Owner/Tame): the subclasses of TamableAnimal and
// AbstractHorse in the 26.3 jar (superclass chains read from the class files). A Bedrock
// "tamed" actor of any other species (e.g. happy_ghast) has nothing to map to in Java.
export const JAVA_TAMEABLE = new Set(['minecraft:wolf', 'minecraft:cat', 'minecraft:parrot', 'minecraft:nautilus', 'minecraft:zombie_nautilus',
  'minecraft:horse', 'minecraft:donkey', 'minecraft:mule', 'minecraft:llama', 'minecraft:trader_llama', 'minecraft:skeleton_horse', 'minecraft:zombie_horse',
  'minecraft:camel', 'minecraft:camel_husk']);

const ORPHAN = 'actorprefix_unlisted';
const ORPHAN_REASON = 'bedrock-actor-not-referenced-by-any-chunk';
const itemBrief = (it) => ({ id: it.id, count: it.count });
function brief(e) {
  const f = e.facts;
  return {
    id: f.id, uuid: f.uuid, pos: f.pos, custom_name: f.custom_name, tags: f.tags?.length ? f.tags : undefined, baby: f.baby, health: f.health,
    tamed: f.tamed, equipment: f.equipment.map((x) => ({ slot: x.slot, ...itemBrief(x.item), sem: x.item.snbt, semx: x.item.semantic })), inventory: f.inventory.map((x) => ({ slot: x.slot ?? null, ...itemBrief(x), sem: x.snbt, semx: x.semantic })),
    offers: f.offers, trade_tier: f.trade_tier, data: f.data, sem: f.sem, motion: f.motion,
  };
}

export async function enumerate(ctx) {
  const ents = await ctx.sourceView.entitiesIndex();
  const ed = ctx.source.edition;
  const subjects = [];
  const sorted = ents.slice().sort((a, b) => a.dim.localeCompare(b.dim) || String(a.facts.id).localeCompare(String(b.facts.id)) || a.facts.pos[0] - b.facts.pos[0] || a.facts.pos[2] - b.facts.pos[2] || a.facts.pos[1] - b.facts.pos[1]);
  for (const e of sorted) {
    const f = e.facts;
    if (!f.id) continue;
    const eq = equivalents('entity', ed, f.id);
    const na = eq.status === 'edition_only';
    const cross = eq.status === 'cross_family';
    const dx = (spec) => (na ? 'NA:edition-only' : cross ? `NE:cross-family-not-automated` : eq.status === 'unknown' ? `NE:${REASON.NO_IDENTITY_REFERENCE}` : spec);
    const aspects = {
      identity: { direct: na ? 'NA:edition-only' : cross ? `CROSS:${eq.targets[0]}` : eq.status === 'unknown' ? `NE:${REASON.NO_IDENTITY_REFERENCE}` : 'EQUIV', roundtrip: 'EQUAL' },
      position: { direct: dx('NEAR'), roundtrip: 'EXACT' },
    };
    if (f.custom_name !== undefined) aspects.custom_name = { direct: dx('TEXT_EQUAL'), roundtrip: 'EQUAL' };
    if (f.baby === true) aspects.baby = { direct: dx('EQUAL'), roundtrip: 'EQUAL' };
    if (f.health !== undefined && !Number.isNaN(f.health)) aspects.health = { direct: dx('NEAR'), roundtrip: 'NEAR' };
    if (f.tamed === true) {
      const javaCanTame = ed === 'java' || (eq.targets || []).some((t) => JAVA_TAMEABLE.has(t));
      aspects.tamed = { direct: javaCanTame ? dx('EQUAL') : 'NA:java-species-stores-no-tamed-state', roundtrip: 'EQUAL' };
    }
    if (f.equipment.length) aspects.equipment = { direct: dx('EQUIV_SET'), roundtrip: 'EQUAL' };
    if (f.inventory.length) aspects.inventory = { direct: dx('EQUIV_MULTISET'), roundtrip: 'EQUAL' };
    if (f.offers?.length) aspects.trades = { direct: dx('EQUIV_OFFERS'), roundtrip: 'EQUAL' };
    // Révision 1.12 (audit 09/11/2026) : état et détails des échanges, à l'aller (voir aspectsEchanges).
    Object.assign(aspects, aspectsEchanges(ed, f.sem, aspects.trades?.direct));
    // Lot 1 (08/11/2026) : détails des objets portés ou tenus (enchantements, décorations d'armure…), à l'aller.
    if (aDesDetails(ctx.source.edition, [...f.equipment.map((x) => x.item), ...f.inventory])) aspects.details = { direct: dx('DETAIL'), roundtrip: `NE:${RETOUR_DETAILS}` };
    aspects.data = { direct: `NE:${REASON.NO_RULE}`, roundtrip: 'EQUAL_DATA' };
    // A Bedrock actor record that no chunk's actor list (digp) references is not loaded by
    // the game: it is not in the world as played. Kept as a subject, never judged.
    if (e.origin === ORPHAN) for (const a of Object.values(aspects)) { a.direct = `NE:${ORPHAN_REASON}`; a.roundtrip = `NE:${ORPHAN_REASON}`; }
    subjects.push({ family: 'entity', locator: { dim: e.dim, pos: f.pos, origin: e.origin }, expected: { ...brief(e), targets: eq.targets }, aspects });
  }
  return subjects;
}

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

// Table 1.7 (MCCB 2026-11, J02 c19) : bateau écrit sous la forme 1.20.4 (`boat` / `chest_boat` +
// `Type`) dans une sortie DataVersion 3700. `BoatSplitFix` (jar 26.3, DataVersion 4059) le change
// lui-même en `<bois>_boat` / `<bois>_chest_boat` / `bamboo_(chest_)raft` au chargement, pour les
// 9 essences de sa table. Id canonique que le jeu lira, sinon null.
const BOIS_BOATSPLIT = new Set(['oak', 'spruce', 'birch', 'jungle', 'acacia', 'cherry', 'dark_oak', 'mangrove', 'bamboo']);
function bateauLegacy(f) {
  if (f?.id !== 'minecraft:boat' && f?.id !== 'minecraft:chest_boat') return null;
  let bois = f.sem?.Type;
  try { bois = JSON.parse(bois); } catch { /* déjà brut */ }
  if (typeof bois !== 'string' || !BOIS_BOATSPLIT.has(bois)) return null;
  const coffre = f.id === 'minecraft:chest_boat' ? 'chest_' : '';
  return bois === 'bamboo' ? `minecraft:bamboo_${coffre}raft` : `minecraft:${bois}_${coffre}boat`;
}

/** Deterministic one-to-one matching of subjects to target entities. */
export function match(subjects, targets, level, sourceEdition) {
  const same = level === 'roundtrip';
  const okType = (s, t) => (same ? t.facts.id === s.expected.id || bateauLegacy(t.facts) === s.expected.id : (s.expected.targets || []).includes(t.facts.id));
  const okDim = (s, t) => t.dim === s.locator.dim;
  const assigned = new Map();
  const used = new Set();
  // Candidate lookups go through indexes (same candidate sets as scanning every target:
  // equal keys, or the grid cells that can hold a target within the radius).
  const indexBy = (keyOf) => { const m = new Map(); targets.forEach((t, i) => { const k = keyOf(t); if (!k) return; if (!m.has(k)) m.set(k, []); m.get(k).push(i); }); return m; };
  // 1. identity keys that survive: same UUID (round trip only), same custom name
  const passes = [];
  if (same) passes.push({ index: indexBy((t) => t.facts.uuid), key: (s) => s.expected.uuid });
  passes.push({ index: indexBy((t) => t.facts.custom_name), key: (s) => s.expected.custom_name });
  for (const { index, key } of passes) {
    const pairs = [];
    for (const s of subjects) {
      if (assigned.has(s.id) || !s.expected.targets && !same) continue;
      const k = key(s);
      if (!k) continue;
      for (const i of index.get(k) || []) { const t = targets[i]; if (!used.has(i) && okDim(s, t) && okType(s, t)) pairs.push([dist(s.locator.pos, t.facts.pos), s.id, i]); }
    }
    pairs.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]) || a[2] - b[2]);
    for (const [, sid, i] of pairs) if (!assigned.has(sid) && !used.has(i)) { assigned.set(sid, i); used.add(i); }
  }
  // 2. nearest free entity of an equivalent type within the radius
  const R = MATCH_RADIUS[level];
  const cell = (dim, x, z) => `${dim}|${Math.floor(x / R)}|${Math.floor(z / R)}`;
  const grid = indexBy((t) => cell(t.dim, t.facts.pos[0], t.facts.pos[2]));
  // 2a (06/11/2026). Objet au sol : à rayon égal, d'abord celui qui porte le MÊME objet. Sans cette
  // passe, un convertisseur qui renumérote les entités (je2be) voyait chaque tas d'objets mélangés
  // apparié en croix (laine ↔ mouton cuit) — des « objets changés » qui n'existent pas. Un convertisseur
  // qui garde l'UUID est apparié à l'étape 1 et n'est pas concerné.
  const contenu = (data) => { const m = /(?:^|[{,])\s*"?(?:Name|id)"?\s*:\s*"([^"]+)"/.exec(String(data?.Item ?? '')); return m ? m[1] : null; };
  const pairsItem = [];
  for (const s of subjects) {
    if (assigned.has(s.id) || !/^minecraft:item$/.test(String(s.expected.id))) continue;
    const ks = contenu(s.expected.data);
    if (!ks) continue;
    const [sx, , sz] = s.locator.pos;
    const gx = Math.floor(sx / R), gz = Math.floor(sz / R);
    for (let ax = gx - 1; ax <= gx + 1; ax++) for (let az = gz - 1; az <= gz + 1; az++) {
      for (const i of grid.get(`${s.locator.dim}|${ax}|${az}`) || []) {
        const t = targets[i];
        if (used.has(i) || !okDim(s, t) || !okType(s, t) || contenu(t.facts.data) !== ks) continue;
        const d = dist(s.locator.pos, t.facts.pos);
        if (d <= R) pairsItem.push([d, s.id, i]);
      }
    }
  }
  pairsItem.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]) || a[2] - b[2]);
  for (const [, sid, i] of pairsItem) if (!assigned.has(sid) && !used.has(i)) { assigned.set(sid, i); used.add(i); }
  // 2b (09/11/2026, correction A3). À distance ÉGALE (créatures superposées sur un même bloc), la paire
  // retenue est celle dont l'ÉTAT se ressemble le plus, pas celle que l'ordre des identifiants place en
  // tête : un convertisseur qui écrit deux chevaux superposés dans un autre ordre (UMT J01) voyait leurs
  // robes, couleurs et âges échangés — des pertes qui n'existent pas. Écart = règles inter-éditions en
  // désaccord (aller), champs bruts différents (retour). Hors égalité, l'ordre par distance est inchangé.
  const parId = new Map(subjects.map((s) => [s.id, s]));
  const ecarts = new Map();
  const ecart = (sid, i) => {
    const k = `${sid}|${i}`;
    if (!ecarts.has(k)) {
      const e = parId.get(sid).expected, g = targets[i].facts;
      let n = 0;
      if (same) { const a = e.data || {}, b = g.data || {}; for (const x of new Set([...Object.keys(a), ...Object.keys(b)])) if (a[x] !== b[x]) n++; }
      else n = crossData('entity', sourceEdition, e, g, [e.id, ...(e.targets || [])], { source: e.motion, target: g.motion })?.evidence?.differing_count ?? 0;
      ecarts.set(k, n);
    }
    return ecarts.get(k);
  };
  const egal = (d) => Math.round(d * 1e4);
  const pairs = [];
  for (const s of subjects) {
    if (assigned.has(s.id)) continue;
    const [sx, , sz] = s.locator.pos;
    const gx = Math.floor(sx / R), gz = Math.floor(sz / R);
    for (let ax = gx - 1; ax <= gx + 1; ax++) for (let az = gz - 1; az <= gz + 1; az++) {
      for (const i of grid.get(`${s.locator.dim}|${ax}|${az}`) || []) {
        const t = targets[i];
        if (used.has(i) || !okDim(s, t) || !okType(s, t)) continue;
        const d = dist(s.locator.pos, t.facts.pos);
        if (d <= R) pairs.push([d, s.id, i]);
      }
    }
  }
  pairs.sort((a, b) => egal(a[0]) - egal(b[0]) || ecart(a[1], a[2]) - ecart(b[1], b[2]) || a[0] - b[0] || a[1].localeCompare(b[1]) || a[2] - b[2]);
  for (const [, sid, i] of pairs) if (!assigned.has(sid) && !used.has(i)) { assigned.set(sid, i); used.add(i); }
  return new Map([...assigned].map(([sid, i]) => [sid, targets[i]]));
}

export async function prepare(ctx, subjects) {
  ctx._entityMatch = {};
  ctx._entitySubjects = subjects;
  for (const level of ['direct', 'roundtrip']) {
    const view = ctx[level];
    if (!view?.world) continue;
    // Orphan actor records of a Bedrock target are not loaded by the game either.
    const targets = (await view.entitiesIndex()).filter((t) => t.origin !== ORPHAN);
    ctx._entityMatch[level] = match(subjects.filter((s) => s.expected.targets || level === 'roundtrip'), targets, level, ctx.sourceEdition);
  }
  // Contrôles 6 et 9 (09/11/2026) : relations — passagers de chaque monture et propriétaire (joueur HÔTE,
  // le seul joueur que MCCB sait apparier d'une édition à l'autre, comme la famille player).
  const src = ctx.worldId && (ctx.direct?.world || ctx.roundtrip?.world) ? await openSource(ctx.worldId).catch(() => null) : null;
  ctx._relations = { hote: {}, montures: {}, uid: {} };
  if (src?.world) {
    ctx._relations.hote.source = await hote(ctx.sourceEdition, src.world);
    if (ctx.sourceEdition === 'bedrock') ctx._relations.montures.source = monturesBedrock(src.world.allActors().map((a) => a.tag).filter(Boolean));
  }
  for (const level of ['direct', 'roundtrip']) {
    const view = ctx[level];
    if (!view?.world) continue;
    ctx._relations.hote[level] = await hote(view.edition, view.world);
    if (view.edition === 'bedrock') {
      const idx = (await view.entitiesIndex()).filter((t) => t.origin !== ORPHAN);
      ctx._relations.montures[level] = monturesBedrock(idx.map((t) => t.tag));
    }
  }
  // Liens vers un joueur (lib/key-detail.mjs) : clé du joueur par `UniqueID`, source et retour.
  if (ctx.sourceEdition === 'bedrock' && ctx.worldId && ctx.roundtrip?.world?.named && src?.world) {
    ctx._joueurs = { source: joueursBedrock(src.world), roundtrip: joueursBedrock(ctx.roundtrip.world) };
    // Table 1.8 : liens vers un ACTEUR (balle → shulker, flèche → squelette) — chaque acteur
    // reçoit un nouvel `UniqueID` au J→B ; le lien est intact s'il désigne le même acteur
    // (même type, même place), ou s'il ne désigne RIEN dans les deux mondes (le jeu résout le
    // lien par `UniqueID` : cible absente = aucun tireur, des deux côtés).
    ctx._joueurs.acteurs = { source: acteursBedrock(src.world), roundtrip: acteursBedrock(ctx.roundtrip.world) };
  }
}
// Joueur hôte : Java = `singleplayer_uuid` du level.dat, sinon l'unique fichier joueur (UUID en hexadécimal) ;
// Bedrock = `UniqueID` de `~local_player`, sinon de l'unique `player_server_*`. Inconnu : null.
async function hote(ed, w) {
  if (ed === 'java') {
    const L = plain(w.level) || {};
    if (Array.isArray(L.singleplayer_uuid)) return L.singleplayer_uuid.map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('');
    const f = w.playerFiles?.() || [];
    return f.length === 1 ? f[0].uuid.replace(/-/g, '').toLowerCase() : null;
  }
  const cles = [...(w.named?.keys?.() || [])].filter((k) => k === '~local_player' || k.startsWith('player_server_'));
  const k = cles.includes('~local_player') ? '~local_player' : cles.length === 1 ? cles[0] : null;
  const t = k ? plain(w.namedNbt(k)?.[0]) : null;
  return t?.UniqueID !== undefined ? String(t.UniqueID) : null;
}
// Bedrock : passagers d'un acteur = `LinksTag[].entityID` (UniqueID du passager) → identifiants.
function monturesBedrock(tags) {
  const parUid = new Map(), liens = new Map();
  for (const tag of tags) {
    const t = plain(tag);
    if (t?.UniqueID === undefined) continue;
    parUid.set(String(t.UniqueID), String(t.identifier || ''));
    if (Array.isArray(t.LinksTag) && t.LinksTag.length) liens.set(String(t.UniqueID), t.LinksTag.map((l) => String(l.entityID)));
  }
  const out = new Map();
  for (const [uid, ids] of liens) out.set(uid, ids.map((x) => parUid.get(x) ?? '?'));
  return out;
}
// Passagers d'un sujet ou d'une cible : identifiants (Java : `Passengers` du véhicule ; Bedrock : liens).
function passagers(ed, facts, montures) {
  if (ed === 'java') { const p = semJson(facts, 'Passengers'); return Array.isArray(p) ? p.map((x) => String(x?.id ?? '?')) : []; }
  if (!montures) return null;
  return montures.get(String(facts?.uuid)) || [];
}
const ownerHex = (v) => (Array.isArray(v) && v.length === 4 ? v.map((x) => (Number(x) >>> 0).toString(16).padStart(8, '0')).join('') : null);
function proprietaire(ed, facts) {
  if (ed === 'java') { const o = semJson(facts, 'Owner') ?? semJson(facts, 'owner'); return ownerHex(o); }
  const o = semJson(facts, 'OwnerNew');
  return o === null || o === undefined || String(o) === '-1' ? null : String(o);
}
/** Contrôles de relation à l'aller, au format de crossData ({ k, sv, tv, ok } ou { k, inconnu }). */
export function relationsAller(srcEd, dstEd, e, g, rel) {
  const out = [];
  // Passagers : chaque passager de la source retrouvé (type équivalent), et aucun en plus.
  const ps = passagers(srcEd, e, rel?.montures?.source), pg = passagers(dstEd, g, rel?.montures?.direct);
  if (ps === null || (pg === null && ps.length)) { if (ps?.length) out.push({ k: 'Passengers', inconnu: true }); }
  else if (ps.length || pg?.length) {
    const reste = [...(pg || [])];
    let ok = true;
    for (const x of ps) {
      const cibles = equivalents('entity', srcEd, x).targets || [];
      const i = reste.findIndex((y) => cibles.includes(y));
      if (i < 0) { ok = false; continue; }
      reste.splice(i, 1);
    }
    out.push({ k: 'Passengers', sv: ps.slice().sort(), tv: (pg || []).slice().sort(), ok: ok && !reste.length });
  }
  // Propriétaire : animal APPRIVOISÉ du joueur hôte → animal du joueur hôte de la sortie. Autre joueur : non
  // apparié. Seulement les espèces apprivoisables (essai r113 du 09/11/2026 : `OwnerNew` d'un objet au sol =
  // son lanceur, d'un allay = le joueur suivi — Java les range ailleurs ; 584 faux écarts sur R01).
  const apprivoise = e?.tamed === true && [e?.id, ...(e?.targets || [])].some((id) => JAVA_TAMEABLE.has(id));
  const os = apprivoise ? proprietaire(srcEd, e) : null;
  if (os && rel?.hote?.source && os === rel.hote.source) {
    if (!rel.hote.direct) out.push({ k: 'Owner', inconnu: true });
    else { const og = proprietaire(dstEd, g); out.push({ k: 'Owner', sv: 'joueur-hote', tv: og === rel.hote.direct ? 'joueur-hote' : og ?? undefined, ok: og === rel.hote.direct }); }
  }
  return out;
}
function acteursBedrock(w) {
  const m = new Map();
  for (const a of w?.allActors?.() || []) {
    const t = a.tag ? plain(a.tag) : null;
    if (t?.UniqueID === undefined) continue;
    m.set(String(Array.isArray(t.UniqueID) ? t.UniqueID.join(':') : t.UniqueID).replace(/L$/, ''),
      { id: String(t.identifier || ''), pos: (t.Pos || []).map(Number) });
  }
  return m;
}
function joueursBedrock(w) {
  const m = new Map();
  for (const [k] of w?.named || []) {
    if (k !== '~local_player' && !k.startsWith('player_server_')) continue;
    const t = plain(w.namedNbt(k)?.[0]);
    if (t?.UniqueID !== undefined) m.set(String(Array.isArray(t.UniqueID) ? t.UniqueID.join(':') : t.UniqueID).replace(/L$/, ''), k);
  }
  return m;
}

// Rule 53 (v1.3 closure): held items are compared POSITION BY POSITION — equipment by slot
// name (both editions' readers name the slots: head … feet, body, mainhand, offhand, saddle),
// inventories of containers a player opens by `Slot` (lib/slots.mjs). Inventories the player
// never sees, stored without positions by Java (villager, piglin…), stay unordered.
// Rule 57: in the round trip (EQUAL) a stack the source did not hold keeps the aspect from PASS,
// positional or not; the direct level does not judge extra stacks.
// Espèces dont la vie MAXIMALE dépend de l'édition (et, en Bedrock, de la difficulté) : la PROPORTION de
// vie est comparée. Contrôle 1 (09/11/2026) : les maxima sont lus dans les données (Bedrock `Attributes`
// minecraft:health Max ; Java attribut `max_health`, sinon défaut du type du jar 26.3) au lieu de 300/450
// figés ; et dans les DEUX sens (B→J n'était jamais mis à l'échelle : la sortie Java n'a pas de Max stocké).
const VIE_MAX_PAR_EDITION = new Set(['minecraft:wither']);
const semJson = (facts, k) => { try { return JSON.parse(facts?.sem?.[k] ?? 'null'); } catch { return null; } };
export function vieMaxDe(ed, facts) {
  if (facts?.max_health !== undefined) return facts.max_health;
  if (ed === 'bedrock') {
    const a = semJson(facts, 'Attributes');
    const h = Array.isArray(a) ? a.find((x) => x?.Name === 'minecraft:health') : null;
    return h?.Max !== undefined ? Number(h.Max) : undefined;
  }
  const at = semJson(facts, 'attributes');
  return vieMaxJava(Array.isArray(at) ? { attributes: at } : {}, facts?.id);
}

function heldCompare(aspect, entityId, sourceEdition, exp, got, same) {
  if (!exp.length) return null;
  const root = `${sourceEdition}-item`; // the caller knows these are items (rule 54: context from the path)
  const match = (e, g) => (same ? (g.sem === e.sem || gameRead(g.sem, { root }) === gameRead(e.sem, { root })
    || (sourceEdition === 'bedrock' && withoutDerivedItemBlock(g.sem) === withoutDerivedItemBlock(e.sem))) : (e.targets || [e.id]).includes(g.id) && g.count === e.count);
  // Règle 59 : la bannière d'un capitaine est sur la TÊTE en Java, au PLASTRON en Bedrock
  // (capitaines natifs relevés, table BDS `slot.armor.chest`) : à l'aller, c'est là qu'on l'attend.
  const raider = /(pillager|vindicator)$/.test(String(entityId));
  const slotOf = (e) => {
    // Cube de soufre : le bloc qu'il contient = `body` Java, `Mainhand` Bedrock (relevé natif, moteur B→J).
    if (!same && /sulfur_cube$/.test(String(entityId))) {
      if (sourceEdition === 'java' && e.slot === 'body') return 'mainhand';
      if (sourceEdition === 'bedrock' && e.slot === 'mainhand') return 'body';
    }
    if (same || !raider || !/banner/.test(String(e.id))) return e.slot;
    if (sourceEdition === 'java' && e.slot === 'head') return 'chest';
    if (sourceEdition === 'bedrock' && e.slot === 'chest') return 'head';
    return e.slot;
  };
  // Aller-retour : même objet, données différentes → champs en cause notés (lib/slots.mjs itemDiff).
  const diff = same ? (e, g, unordered = false) => itemDiff(e.semx, g.semx, { dropBlock: sourceEdition === 'bedrock', unordered }) : null;
  if (aspect === 'equipment') return compareByPosition(exp, got, slotOf, match, { exact: same, diff });
  if (!positionalInventory(entityId)) {
    const pool = got.slice();
    let hit = 0;
    const wrong = [];
    for (const e of exp) {
      const k = pool.findIndex((g) => match(e, g.item));
      if (k >= 0) { hit++; pool.splice(k, 1); continue; }
      // Inventaire sans position (villageois, piglin…) : la pile la plus proche du même objet.
      if (!diff) continue;
      let best = -1, bd = null;
      pool.forEach((g, j) => { const d = diff(e, g.item, true); if (d && (!bd || d.length < bd.length)) { best = j; bd = d; } });
      if (best >= 0) { wrong.push({ id: e.id, observed: pool[best].item.id, differs: bd.slice(0, 8), ...(technicalOnly(bd) ? { technical: true } : {}) }); pool.splice(best, 1); }
      else wrong.push({ id: e.id, observed: null });
    }
    const extra = same ? pool.map((g) => ({ slot: g.slot ?? null, observed: g.item.id })) : [];
    const technical_only = wrong.length > 0 && !extra.length && wrong.every((w) => w.technical);
    return { status: hit === exp.length && !extra.length ? PASS : hit ? PARTIAL : FAIL, matched: hit, of: exp.length, wrong, extra, ...(technical_only ? { technical_only } : {}) };
  }
  const known = same || sameNumberingAcrossEditions(entityId);
  return compareByPosition(exp, got, (e) => (known ? expectedSlot(e) : null), match, { exact: same, diff });
}

// Lot 1 : le retour de ces détails est déjà jugé par equipment / inventory (objets comparés entiers).
export const RETOUR_DETAILS = 'roundtrip-judged-by-equipment-inventory';

// ── Échanges des villageois et du marchand ambulant : ÉTAT et DÉTAILS, à l'aller ─────────────────
// Révision 1.12 (audit 09/11/2026). L'aspect `trades` juge objets, quantités et prix ; restaient non jugés :
//   • trade_uses  : échanges déjà faits (`uses`) — épuisé ou non ; le villageois réassortit (TRANSIENT) ;
//   • trade_terms : stock maximal (`maxUses`), expérience gagnée par le villageois (Java `xp` ↔ Bedrock
//     `traderExp`), expérience donnée au joueur (`rewardExp`) ;
//   • trade_details : détails des objets échangés (enchantement du livre d'un bibliothécaire, outil
//     enchanté, potion, cuir teint…), lus par lib/details-objet.mjs comme les objets tenus.
// Valeurs : Java = codec `MerchantOffer` du jar 26.3 (désassemblé : uses 0, maxUses 4, rewardExp vrai,
// xp 1 quand le champ manque). Bedrock = champs de l'offre ; absent = valeur non prouvée, non jugée.
// Sens des champs Bedrock relevé sur les mondes natifs (B02 : charbon 15 → 1 émeraude, maxUses 16,
// traderExp 2, rewardExp 1 — les valeurs de la table Java du même échange). `demand` (prix futur) n'est
// pas jugé : la formule Bedrock n'est pas établie. Une offre absente n'est jugée qu'une fois, par
// `trades` ; ces aspects ne comparent que les offres retrouvées (pas de double compte).
export const RETOUR_ECHANGES = 'roundtrip-judged-by-data-Offers';
const nb = (v) => (v === undefined || v === null || v === '' ? undefined : Number(v));
const offresBrutes = (sem) => { try { return JSON.parse(sem?.Offers ?? 'null')?.Recipes || []; } catch { return []; } };
const videO = (n) => !n || n === 'minecraft:air' || n === 'air';
const cotes = (ed) => (ed === 'java' ? ['buy', 'buyB', 'sell'] : ['buyA', 'buyB', 'sell']);
const idO = (ed, it) => (it ? (ed === 'java' ? it.id : it.Name) : undefined);
const nbO = (ed, it) => (videO(idO(ed, it)) ? undefined : ed === 'java' ? Number(it.count ?? 1) : Number(it.Count));
const aDetails = (ed, it) => !!it && !videO(idO(ed, it)) && Object.keys(detailsDe(ed, it)).length > 0;
export function offresAvecDetails(ed, sem) { return offresBrutes(sem).some((o) => cotes(ed).some((k) => aDetails(ed, o[k]))); }
/** Aspects d'échange ajoutés à un sujet qui a des offres ; `code` = code de l'aller de `trades`. */
export function aspectsEchanges(ed, sem, code) {
  if (!code || !offresBrutes(sem).length) return {};
  const d = /^(NE|NA):/.test(String(code)) ? code : null;
  const rt = `NE:${RETOUR_ECHANGES}`;
  return {
    trade_uses: { direct: d || 'OFFER_USES', roundtrip: rt },
    ...aspectsConditions(d, rt),
    ...(offresAvecDetails(ed, sem) ? { trade_details: { direct: d || 'OFFER_DETAILS', roundtrip: rt } } : {}),
  };
}
// Révision 1.13 (contrôle 10, 09/11/2026) : `trade_terms` passait dès que `maxUses` était égal, même quand
// l'expérience n'était pas stockée par la sortie (non prouvée). Une condition = un aspect, chacun jugé ou
// non jugé pour son compte : stock maximal, expérience du villageois, expérience donnée au joueur.
export const CONDITIONS_ECHANGE = { trade_max_uses: ['maxUses'], trade_xp: ['xp'], trade_reward_xp: ['rewardExp'] };
function aspectsConditions(d, rt) {
  return Object.fromEntries(Object.keys(CONDITIONS_ECHANGE).map((k) => [k, { direct: d || 'OFFER_TERMS', roundtrip: rt }]));
}
function termesOffre(ed, o) {
  if (ed === 'java') return { uses: nb(o.uses ?? 0), maxUses: nb(o.maxUses ?? 4), xp: nb(o.xp ?? 1), rewardExp: o.rewardExp === undefined ? 1 : (o.rewardExp === true || Number(o.rewardExp) ? 1 : 0) };
  return { uses: nb(o.uses), maxUses: nb(o.maxUses), xp: nb(o.traderExp), rewardExp: o.rewardExp === undefined ? undefined : (o.rewardExp === true || Number(o.rewardExp) ? 1 : 0) };
}
/** Offres source (débloquées) appariées aux offres de la sortie : mêmes objets, de préférence mêmes quantités. */
export function paireOffres(srcEd, eo, go, tradeTier) {
  const dstEd = srcEd === 'java' ? 'bedrock' : 'java';
  const want = srcEd === 'bedrock' && tradeTier !== undefined ? eo.filter((o) => o.tier === undefined || Number(o.tier) <= Number(tradeTier)) : eo;
  const eqId = (a, b) => (videO(a) && videO(b)) || (!videO(a) && !videO(b) && ((srcEd === 'bedrock' && isLegacyBedrockItem(a)) || (equivalents('item', srcEd, a).targets || []).includes(b)));
  const [sa, sb, ss] = cotes(srcEd), [da, db, ds] = cotes(dstEd);
  const memes = (o, x) => eqId(idO(srcEd, o[sa]), idO(dstEd, x[da])) && eqId(idO(srcEd, o[sb]), idO(dstEd, x[db])) && eqId(idO(srcEd, o[ss]), idO(dstEd, x[ds]));
  const qte = (o, x) => nbO(srcEd, o[sa]) === nbO(dstEd, x[da]) && nbO(srcEd, o[ss]) === nbO(dstEd, x[ds]);
  const qteB = (o, x) => nbO(srcEd, o[sb]) === nbO(dstEd, x[db]);
  // Contrôle 2 (09/11/2026) : passes successives sur TOUTES les offres — mêmes objets et mêmes quantités
  // (second ingrédient compris), puis mêmes quantités hors second ingrédient, puis mêmes objets. Avant, la
  // première offre prenait la première cible aux mêmes objets : deux offres réordonnées qui ne diffèrent que
  // par la quantité du second ingrédient étaient appariées en croix (faux écarts).
  const libres = new Set(go.map((_, i) => i));
  const pairs = [];
  const prise = new Set();
  for (const test of [(o, x) => memes(o, x) && qte(o, x) && qteB(o, x), (o, x) => memes(o, x) && qte(o, x), memes]) {
    want.forEach((o, n) => {
      if (prise.has(n)) return;
      const i = [...libres].find((j) => test(o, go[j]));
      if (i === undefined) return;
      pairs.push({ n, o, x: go[i] }); libres.delete(i); prise.add(n);
    });
  }
  pairs.sort((a, b) => a.n - b.n);
  return { want, pairs };
}
function verdictEchanges(aspect, srcEd, e, g, level) {
  const dstEd = srcEd === 'java' ? 'bedrock' : 'java';
  const { pairs } = paireOffres(srcEd, offresBrutes(e.sem), offresBrutes(g.sem), e.trade_tier);
  if (!pairs.length) return notEvaluated('no-matched-offer', { note: 'offres absentes : jugées par trades' });
  const rule = `entity.${aspect}.${level}`;
  let compares = 0;
  const ecarts = [];
  const inconnusTermes = new Set();
  if (aspect === 'trade_details') {
    const [sa, sb, ss] = cotes(srcEd), [da, db, ds] = cotes(dstEd);
    for (const { n, o, x } of pairs) for (const [k1, k2] of [[sa, da], [sb, db], [ss, ds]]) {
      if (!aDetails(srcEd, o[k1])) continue;
      const res = ecartsDetails(srcEd, o[k1], x[k2] ?? {});
      compares += res.compares;
      for (const ec of res.ecarts) ecarts.push({ offre: n, objet: idO(srcEd, o[k1]), ...ec });
    }
    if (!compares) return notEvaluated('no-matched-offer-with-details');
  } else {
    const cles = aspect === 'trade_uses' ? ['uses'] : CONDITIONS_ECHANGE[aspect] || ['maxUses', 'xp', 'rewardExp'];
    const inconnus = new Set();
    for (const { n, o, x } of pairs) {
      const a = termesOffre(srcEd, o), b = termesOffre(dstEd, x);
      for (const k of cles) {
        if (a[k] === undefined) continue;
        if (b[k] === undefined) { inconnus.add(k); inconnusTermes.add(k); continue; }
        compares++;
        if (a[k] !== b[k]) ecarts.push({ offre: n, cle: k, attendu: a[k], observe: b[k] });
      }
    }
    if (!compares) return notEvaluated('target-offer-field-not-stored', { unproven_in_target: [...inconnus] });
  }
  // `trade_terms` (registres r112) : une condition non stockée par la sortie reste visible même si le reste passe.
  const np = aspect === 'trade_terms' && inconnusTermes.size ? { unproven_in_target: [...inconnusTermes].sort(), complete: false } : {};
  return !ecarts.length ? r(PASS, rule, { compares, offres: pairs.length, ...np })
    : r(ecarts.length >= compares ? FAIL : PARTIAL, rule, { compares, offres: pairs.length, ecarts: ecarts.slice(0, 12), ecarts_count: ecarts.length, ...np });
}
export function aDesDetails(ed, objets) {
  return objets.some((it) => { let x; try { x = JSON.parse(it.semantic ?? it.semx); } catch { return false; } return Object.keys(detailsDe(ed, x)).length > 0; });
}
const tenus = (l) => (l || []).map((x) => ({ slot: x.slot, id: (x.item || x).id, semantic: (x.item || x).semantic }));

export async function evaluate(subject, ctx) {
  const res = {};
  const e = subject.expected;
  for (const level of ['direct', 'roundtrip']) {
    const view = ctx[level];
    for (const [aspect, spec] of Object.entries(subject.aspects)) {
      res[aspect] ||= {};
      const code = spec[level];
      let out;
      if (level === 'roundtrip' && !view) out = notEvaluated(REASON.NO_ROUNDTRIP);
      else if (!view.world) out = r(FAIL, `entity.${aspect}.world-opens`, { observed: REASON.WORLD_DOES_NOT_OPEN });
      // Règle 59 (MCCB 2026-11) : `data` À L'ALLER est jugé par la table inter-éditions (lib/cross-data.mjs).
      else if (code.startsWith('NE:') && !(aspect === 'data' && level === 'direct' && !/^(NA|NE|CROSS):/.test(String(subject.aspects.identity?.direct || '')))) out = notEvaluated(code.slice(3));
      else if (code.startsWith('NA:')) out = r(NOT_APPLICABLE, `entity.${aspect}.${code.slice(3)}`);
      else if (code.startsWith('CROSS:')) {
        const want = code.slice(6).replace(/^block:/, '');
        const b = await readBlock(view.edition, view.world, { dim: subject.locator.dim, pos: e.pos.map(Math.floor) });
        out = b && b.name === want ? r(PASS, 'entity.identity.cross-family-block') : r(FAIL, 'entity.identity.cross-family-block', { observed: b?.name ?? 'chunk-missing' });
      } else {
        const t = ctx._entityMatch?.[level]?.get(subject.id);
        // Révision 1.12 : créature absente — ses échanges sont déjà comptés perdus par `identity` et `trades` ;
        // leur état et leurs détails ne sont pas comptés une troisième fois.
        if (!t && /^trade_(uses|terms|details|max_uses|xp|reward_xp)$/.test(aspect)) out = notEvaluated('entity-not-found-judged-by-identity-and-trades');
        else if (!t) out = r(FAIL, `entity.${aspect}.${level}`, { observed: 'no matching entity' });
        else {
          const g = t.facts;
          const same = level === 'roundtrip';
          switch (aspect) {
            case 'identity': out = r(PASS, `entity.identity.${level}`, same ? {} : { observed: g.id }); break;
            case 'position': {
              const tol = POSITION_TOLERANCE[level];
              const d = [0, 1, 2].map((i) => +(g.pos[i] - e.pos[i]).toFixed(4));
              const ok = Math.abs(d[0]) <= tol.horizontal && Math.abs(d[2]) <= tol.horizontal && Math.abs(d[1]) <= tol.vertical;
              out = r(ok ? PASS : FAIL, `entity.position.${level}`, ok && !same ? {} : { delta: d });
              break;
            }
            case 'custom_name': out = g.custom_name === e.custom_name ? r(PASS, `entity.custom_name.${level}`) : r(FAIL, `entity.custom_name.${level}`, { observed: g.custom_name ?? null }); break;
            case 'baby': out = g.baby === true ? r(PASS, `entity.baby.${level}`) : r(FAIL, `entity.baby.${level}`, { observed: g.baby ?? null }); break;
            case 'health':
              if (g.health === undefined) { out = notEvaluated('target-stores-no-health-value', { observed: null }); break; }
              // Règle 59 : vie maximale différente selon l'édition (flétrisseur : 300 Java, 450 relevé sur
              // monde Bedrock natif) → la PROPORTION de vie est comparée, pas le nombre.
              if (!same && (VIE_MAX_PAR_EDITION.has(e.id) || VIE_MAX_PAR_EDITION.has(g.id))) {
                const srcMax = vieMaxDe(ctx.sourceEdition, e), dstMax = vieMaxDe(view.edition, g);
                if (!(srcMax > 0) || !(dstMax > 0)) { out = notEvaluated('max-health-not-stored', { observed: g.health }); break; }
                const ok = Math.abs(g.health / dstMax - e.health / srcMax) <= 0.01;
                out = ok ? r(PASS, `entity.health.${level}.scaled`) : r(FAIL, `entity.health.${level}.scaled`, { observed: g.health, observed_max: dstMax, expected_max: srcMax });
                break;
              }
              out = Math.abs(g.health - e.health) <= HEALTH_TOLERANCE[level] ? r(PASS, `entity.health.${level}`) : r(FAIL, `entity.health.${level}`, { observed: g.health, ...(g.max_health !== undefined ? { observed_max: g.max_health } : {}) });
              break;
            case 'tamed': out = g.tamed === true ? r(PASS, `entity.tamed.${level}`) : r(FAIL, `entity.tamed.${level}`, { observed: g.tamed ?? null }); break;
            case 'equipment':
            case 'inventory': {
              // Rule 40: items under a legacy Bedrock name have no identity reference — left
              // out of the comparison; nothing left to compare = NOT_EVALUATED.
              const src = (aspect === 'equipment' ? e.equipment : e.inventory)
                .filter((x) => !(ctx.sourceEdition === 'bedrock' && isLegacyBedrockItem(x.id)));
              if (!src.length) { out = notEvaluated(LEGACY_ITEM); break; }
              const exp = src.map((x) => ({ ...x, targets: same ? null : equivalents('item', ctx.sourceEdition, x.id).targets }));
              let got = (aspect === 'equipment' ? g.equipment : g.inventory.map((x) => ({ slot: x.slot, item: x })))
                .map((x) => ({ slot: x.slot, item: { id: x.item.id, count: x.item.count, sem: x.item.snbt, semx: x.item.semantic } }));
              // Rule 41 (audit 2026-09-25): entities are not loaded by the game in MCCB (only
              // upgraded), so an item id the Java 26.3 registry does not know was counted as
              // present — the game DELETES it. It is removed before comparing, as the game does.
              if (view.edition === 'java') got = got.filter((x) => javaRegistry().items.has(x.item.id));
              const m = heldCompare(aspect, e.id, ctx.sourceEdition, exp, got, same);
              if (m.status === null) { out = notEvaluated(m.reason, { matched_without_position: m.unverified, expected: m.of }); break; }
              out = r(m.status, `entity.${aspect}.${level}`, m.status === PASS ? {} : { observed: got.slice(0, 12).map((x) => `${x.slot ?? '-'}:${x.item.id}x${x.item.count}`), ...(m.wrong?.length ? { wrong: m.wrong.slice(0, 12) } : {}), ...(m.extra?.length ? { extra: m.extra.slice(0, 12), extra_count: m.extra.length } : {}), ...(m.technical_only ? { technical_only: true } : {}) });
              break;
            }
            case 'trades': {
              const go = g.offers || [];
              // Rule 40 here too (MCCB 2026-11, R01 wandering traders): a source offer item under a
              // legacy Bedrock name (`sapling`, `red_flower`, variant in the aux value) has no neutral
              // rename table — its identity is not judged, its counts still are.
              const eqId = (a, b) => (ctx.sourceEdition === 'bedrock' && isLegacyBedrockItem(a) && b !== undefined)
                || (same ? a === b : (a === undefined && b === undefined) || (equivalents('item', ctx.sourceEdition, a).targets || []).includes(b));
              // Rule 58: the source offers are read from the fixture's stored `Offers` (all costs:
              // the fixture's `offers` summary dropped the second cost's count and Bedrock's
              // buyCountA / buyCountB), with the same reader as the target (lib/facts.mjs).
              const eo = e.sem?.Offers ? tradeOffers(ctx.sourceEdition, JSON.parse(e.sem.Offers)) : e.offers;
              // Direct: every source offer must exist (Bedrock also stores the offers of
              // locked higher tiers, so extra target offers are noted, not penalised); first and
              // second cost (item and count) and the result (item and count).
              // Round trip: the offer list must come back identical, in order — every cost field
              // the edition stores (Bedrock: also buyCountA / buyCountB).
              // MCCB 2026-11 (B02, vérifié en jeu par l'utilisateur) : un villageois Bedrock
              // REMISÉ affiche `buyCountA` / `buyCountB` (prix après remise), pas le prix de base
              // `buyA.Count`. En direct, le prix Java (stocké ou avec `specialPrice`) peut donc
              // valoir l'un ou l'autre ; au retour, la règle stricte reste.
              // Le prix de base stocké par Bedrock n'inclut pas la remise de SOIN : le jeu la calcule
              // à l'affichage. Réputation plafonnée comme dans Java 26.3 (`GossipType` :
              // minor_positive plafond 25, major_positive ×5 plafond 20) ; remise d'un échange =
              // ⌊réputation × priceMultiplierA⌋, prix affiché ≥ 1.
              const nb = (k) => Math.abs(Number(e.sem?.[k] ?? 0)) || 0;
              const rep = Math.min(nb('LowTierCuredDiscount'), 25) + nb('NearbyCuredDiscount') + 5 * Math.min(nb('HighTierCuredDiscount'), 20);
              const affiche = (o) => (rep && o.pmA ? Math.max(1, o.buyCount - Math.floor(rep * o.pmA)) : undefined);
              const prixOk = (o, x, base, remise, jc) => o[base] === x[base]
                || (!same && ctx.sourceEdition === 'bedrock' && o[remise] !== undefined && (o[remise] === x[base] || o[remise] === jc))
                || (!same && ctx.sourceEdition === 'bedrock' && base === 'buyCount' && affiche(o) !== undefined && (affiche(o) === x[base] || affiche(o) === jc))
                // Monde ancien (R01) : `buyA.Count` garde une remise périmée, plus basse que le prix de
                // base `buyCountA` ; le jeu recalcule le prix affiché (vérifié en jeu le 02/11/2026 : mêmes
                // prix dans les 3 mondes). Tout prix entre les deux est le même échange.
                || (!same && ctx.sourceEdition === 'bedrock' && base === 'buyCount' && o.buyCountA !== undefined && o.buyCount < o.buyCountA
                  && x[base] >= o.buyCount && x[base] <= o.buyCountA);
              const same4 = (o, x) => x && eqId(o.buy, x.buy) && eqId(o.sell, x.sell) && eqId(o.buyB, x.buyB)
                && prixOk(o, x, 'buyCount', 'buyCountA', x.buyCountEff) && prixOk(o, x, 'buyBCount', 'buyCountB', undefined) && o.sellCount === x.sellCount
                && (!same || (o.buyCountA === x.buyCountA && o.buyCountB === x.buyCountB));
              let ok = 0;
              // A Bedrock source also stores locked higher-tier offers: in direct only the
              // unlocked ones (tier <= TradeTier) are expected in Java.
              const want = !same && ctx.sourceEdition === 'bedrock' && e.trade_tier !== undefined
                ? eo.filter((o) => o.tier === undefined || o.tier <= e.trade_tier) : eo;
              // Aller-retour, monde ancien (R01) : `buyA.Count` source = remise périmée, rendue au
              // retour comme le prix de base `buyCountA` (inchangé). Le jeu recalcule le prix affiché
              // (vérifié en jeu le 02/11/2026) : différence TECHNIQUE, comptée à part.
              const perime = (o, x) => same && ctx.sourceEdition === 'bedrock' && x && o.buyCountA !== undefined && o.buyCount < o.buyCountA
                && x.buyCount !== o.buyCount && x.buyCount >= o.buyCount && x.buyCount <= o.buyCountA && same4(o, { ...x, buyCount: o.buyCount });
              let tech = 0;
              if (same) want.forEach((o, i) => { if (same4(o, go[i])) ok++; else if (perime(o, go[i])) tech++; });
              else { const pool = go.slice(); for (const o of want) { const k = pool.findIndex((x) => same4(o, x)); if (k >= 0) { ok++; pool.splice(k, 1); } } }
              const st = ok === want.length && (!same || go.length === want.length) ? PASS : ok + tech ? PARTIAL : FAIL;
              const techOnly = st !== PASS && tech > 0 && ok + tech === want.length && go.length === want.length;
              out = r(st, `entity.trades.${level}`, st === PASS ? {} : { matching_offers: ok, expected_offers: want.length, observed_offers: go.length, ...(tech ? { stale_discount_offers: tech } : {}), ...(techOnly ? { technical_only: true } : {}) });
              break;
            }
            case 'trade_uses': case 'trade_terms': case 'trade_details': case 'trade_max_uses': case 'trade_xp': case 'trade_reward_xp':
              out = verdictEchanges(aspect, ctx.sourceEdition, e, g, level);
              break;
            case 'details': {
              const opt = { parCase: true };
              const a = verdictDetailsTenus(ctx.sourceEdition, e.equipment || [], tenus(g.equipment), opt);
              const b = verdictDetailsTenus(ctx.sourceEdition, e.inventory || [], tenus(g.inventory), { parCase: positionalInventory(e.id) });
              const compares = a.compares + b.compares, ecarts = [...a.ecarts, ...b.ecarts];
              if (!compares) { out = notEvaluated('held-items-with-details-not-found', { introuvables: a.introuvables + b.introuvables }); break; }
              out = !ecarts.length ? r(PASS, `entity.details.${level}`, { compares })
                : r(ecarts.length >= compares ? FAIL : PARTIAL, `entity.details.${level}`, { compares, ecarts: ecarts.slice(0, 12), ecarts_count: ecarts.length });
              break;
            }
            case 'data': {
              if (!same) {
                const v = crossData('entity', ctx.sourceEdition, e, g, [e.id, ...(e.targets || [])], { source: e.motion, target: g.motion },
                  relationsAller(ctx.sourceEdition, view.edition, e, g, ctx._relations));
                out = v || notEvaluated(code.startsWith('NE:') ? code.slice(3) : 'no-cross-edition-data-rule');
                break;
              }
              const strict = [...new Set([...Object.keys(e.data), ...Object.keys(g.data)])].filter((k) => e.data[k] !== g.data[k]);
              // Contrôle 6 (09/11/2026) : Bedrock range les passagers dans `LinksTag` (UniqueID renouvelés,
              // hors des données comparées) — comparés par TYPE de passager.
              const ms = ctx.sourceEdition === 'bedrock' ? ctx._relations?.montures?.source : null, mr = ctx._relations?.montures?.roundtrip;
              const liens = ms && mr ? [(ms.get(String(e.uuid)) || []).slice().sort().join(','), (mr.get(String(g.uuid)) || []).slice().sort().join(',')] : null;
              const liensDiff = liens && liens[0] !== liens[1];
              if (!strict.length && !liensDiff) { out = r(PASS, 'entity.data.roundtrip'); break; }
              // Rule 54: stored values as the game reads them, from the typed data (lib/nbt.mjs
              // gameRead): only field-specific demonstrated defaults read like absent keys.
              const root = `${ctx.sourceEdition}-entity`;
              const es = gameReadMap(e.data, { root }), gs = gameReadMap(g.data, { root });
              const keys = [...new Set([...Object.keys(es), ...Object.keys(gs)])].filter((k) => es[k] !== gs[k]).concat(liensDiff ? ['LinksTag'] : []).sort();
              out = keys.length ? r(PARTIAL, 'entity.data.roundtrip', { differing_keys: keys.slice(0, 25), differing_count: keys.length, ...keyClasses(keys, es, gs), ...keyDetails(keys, e.sem, g.sem, ctx.sourceEdition, { joueurs: ctx._joueurs }) }) : r(PASS, 'entity.data.roundtrip.semantic-equal');
              break;
            }
            default: out = notEvaluated('unknown-aspect');
          }
        }
      }
      res[aspect][level] = out;
    }
  }
  return res;
}
