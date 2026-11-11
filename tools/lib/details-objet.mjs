// MCCB 2026-11 — DÉTAILS D'UN OBJET jugés À L'ALLER (lot 1, 08/11/2026).
// Avant : à l'aller, seuls nom, description, usure, incassable, coût de réparation, décoration
// d'armure, teinture et livres écrits étaient comparés (families/item_stack.mjs COMPONENT_RULES) ;
// enchantements, potions, contenu d'une boîte ou d'un sac, motifs, feux d'artifice, cor, couleur
// d'un lit ou d'une bannière n'étaient jugés qu'au retour. Ici, chaque détail est ramené à UNE forme
// neutre depuis chacune des deux éditions, puis comparé.
//
// Tables : constantes du jeu (identifiants numériques Bedrock des enchantements, index des potions,
// ordre des teintures, codes de motifs, ordre des cors de chèvre, formes de feux d'artifice).
// Aucune table de convertisseur n'est lue. Chaque table est vérifiée sur les mondes SOURCES
// (selftest/closure/details-objet.test.mjs), jamais ajustée sur une sortie.
//
// Les objets sont lus sous leur forme `semantic` (lib/nbt.mjs) : Java { id, count, components },
// Bedrock { Name, Count, Damage, tag }.
import { equivalents } from './identity.mjs';
import { bedrockRegistry } from './registry.mjs';

const sans = (s) => String(s ?? '').replace(/^minecraft:/, '');
const num = (x) => (x === undefined || x === null || x === '' ? undefined : Number(x));

// Enchantements : identifiant numérique Bedrock (Enchant::Type du jeu) → nom Java.
export const ENCHANT_BEDROCK = ['protection', 'fire_protection', 'feather_falling', 'blast_protection', 'projectile_protection', 'thorns', 'respiration', 'depth_strider', 'aqua_affinity', 'sharpness', 'smite', 'bane_of_arthropods', 'knockback', 'fire_aspect', 'looting', 'efficiency', 'silk_touch', 'unbreaking', 'fortune', 'power', 'punch', 'flame', 'infinity', 'luck_of_the_sea', 'lure', 'frost_walker', 'mending', 'binding_curse', 'vanishing_curse', 'impaling', 'riptide', 'loyalty', 'channeling', 'multishot', 'piercing', 'quick_charge', 'soul_speed', 'swift_sneak', 'wind_burst', 'density', 'breach', 'lunge'];
// Potions : index Bedrock (Potion::Type ; donnée de la potion, donnée − 1 de la flèche) → nom Java.
// 2 = « long_mundane » Bedrock, sans équivalent Java : lu comme `mundane`. 36 = décomposition (Bedrock seul).
export const POTION_BEDROCK = ['water', 'mundane', 'mundane', 'thick', 'awkward', 'night_vision', 'long_night_vision', 'invisibility', 'long_invisibility', 'leaping', 'long_leaping', 'strong_leaping', 'fire_resistance', 'long_fire_resistance', 'swiftness', 'long_swiftness', 'strong_swiftness', 'slowness', 'long_slowness', 'water_breathing', 'long_water_breathing', 'healing', 'strong_healing', 'harming', 'strong_harming', 'poison', 'long_poison', 'strong_poison', 'regeneration', 'long_regeneration', 'strong_regeneration', 'strength', 'long_strength', 'strong_strength', 'weakness', 'long_weakness', 'bedrock:decay', 'turtle_master', 'long_turtle_master', 'strong_turtle_master', 'slow_falling', 'long_slow_falling', 'strong_slowness', 'wind_charged', 'weaving', 'oozing', 'infested'];
// Teintures, ordre Java (DyeColor) ; le lit Bedrock suit cet ordre, la bannière, ses motifs, le
// bouclier et les étoiles de feu d'artifice suivent l'ordre ANCIEN inversé (0 = noir).
export const TEINTES = ['white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black'];
const teinteInversee = (i) => (num(i) === undefined ? undefined : TEINTES[15 - (num(i) & 15)]);
// Motifs de bannière : code Bedrock (ancien code Java) → nom Java.
export const MOTIFS = { b: 'base', bl: 'square_bottom_left', br: 'square_bottom_right', tl: 'square_top_left', tr: 'square_top_right', bs: 'stripe_bottom', ts: 'stripe_top', ls: 'stripe_left', rs: 'stripe_right', cs: 'stripe_center', ms: 'stripe_middle', drs: 'stripe_downright', dls: 'stripe_downleft', ss: 'small_stripes', cr: 'cross', sc: 'straight_cross', bt: 'triangle_bottom', tt: 'triangle_top', bts: 'triangles_bottom', tts: 'triangles_top', ld: 'diagonal_left', rd: 'diagonal_up_right', lud: 'diagonal_up_left', rud: 'diagonal_right', mc: 'circle', mr: 'rhombus', vh: 'half_vertical', hh: 'half_horizontal', vhr: 'half_vertical_right', hhb: 'half_horizontal_bottom', bo: 'border', cbo: 'curly_border', gra: 'gradient', gru: 'gradient_up', bri: 'bricks', glb: 'globe', cre: 'creeper', sku: 'skull', flo: 'flower', moj: 'mojang', pig: 'piglin', flw: 'flow', gus: 'guster' };
export const CORS = ['ponder', 'sing', 'seek', 'feel', 'admire', 'call', 'yearn', 'dream'];
export const FORMES = ['small_ball', 'large_ball', 'star', 'creeper', 'burst'];

// Enchantements Java sans équivalent Bedrock : ne peuvent pas être gardés à l'aller, retirés de l'attendu.
export const ENCHANT_JAVA_SEUL = new Set(['sweeping_edge']);
const trieEnch = (m) => { const l = m ? Object.entries(m).filter(([k]) => !ENCHANT_JAVA_SEUL.has(sans(k))).map(([k, v]) => `${sans(k)}:${num(v)}`).sort() : []; return l.length ? l : undefined; };
// Bannière sinistre : Java = bannière blanche nommée « ominous_banner » + motifs ; Bedrock = `Type` 1, sans
// motif ni couleur écrits. Ni ses motifs ni sa couleur ne sont jugés.
const sinistreJava = (c) => /ominous_banner/.test(JSON.stringify([c['minecraft:item_name'], c['minecraft:custom_name']] ?? ''));
const enchJava = (c) => (c ? trieEnch(c.levels ?? c) : undefined);
const enchBedrock = (l) => (Array.isArray(l) && l.length ? l.map((x) => `${ENCHANT_BEDROCK[num(x.id)] ?? `bedrock#${x.id}`}:${num(x.lvl)}`).sort() : undefined);
const potionJava = (pc) => (pc === undefined ? undefined : sans(typeof pc === 'string' ? pc : pc.potion) || undefined);
const explosionJava = (x) => (x ? `${sans(x.shape ?? 'small_ball')}|trail:${num(x.has_trail) ? 1 : 0}|twinkle:${num(x.has_twinkle) ? 1 : 0}|couleurs:${(x.colors || []).length}` : undefined);
const explosionBedrock = (x) => (x ? `${FORMES[num(x.FireworkType ?? 0)] ?? `bedrock#${x.FireworkType}`}|trail:${num(x.FireworkTrail) ? 1 : 0}|twinkle:${num(x.FireworkFlicker) ? 1 : 0}|couleurs:${(x.FireworkColor || []).length}` : undefined);
// fusée : vol 1 sans explosion = valeur par défaut du composant, que Java n'écrit pas
const fusee = (vol, explosions) => (vol === 1 && !explosions.length ? undefined : { vol, explosions });
const pile = (id, count, slot) => ({ id, count: num(count ?? 1), ...(slot !== undefined ? { slot: num(slot) } : {}) });
// Pile Bedrock rangée dans un objet dont le `Block` porte un état disparu (ex. `stone` + stone_type=andesite,
// écriture d'avant l'aplatissement) : comme une pile de conteneur (règle 40 étendue, table 1.10), son
// identité n'est pas jugée — seul son nombre l'est. Le jeu met ce `Block` à jour en le lisant.
const blocAncien = (b) => {
  if (!b?.name || !b.states) return false;
  const reg = bedrockRegistry(); if (!reg.blocks.has(b.name)) return false;
  const cles = reg.blockStateKeys.get(b.name) || [];
  return Object.keys(b.states).some((k) => !cles.includes(k));
};
const pilesBedrock = (l) => (Array.isArray(l) ? l.filter((x) => x && x.Name && num(x.Count) > 0).map((x) => ({ ...pile(x.Name, x.Count, x.Slot), ...(blocAncien(x.Block) ? { ancien: true } : {}) })) : undefined);

/**
 * Détails d'un objet, forme neutre. Clé = nom du composant Java (la table de gravité les classe
 * déjà ainsi) ; `mccb:couleur` = couleur portée par le nom Java et par la donnée Bedrock (lit, bannière).
 */
export function detailsDe(edition, it) {
  const out = {};
  if (!it) return out;
  if (edition === 'java') {
    const id = it.id, c = it.components || {};
    const set = (k, v) => { if (v !== undefined) out[k] = v; };
    set('minecraft:enchantments', enchJava(c['minecraft:enchantments']));
    set('minecraft:stored_enchantments', enchJava(c['minecraft:stored_enchantments']));
    set('minecraft:potion_contents', potionJava(c['minecraft:potion_contents']));
    if (Array.isArray(c['minecraft:container'])) set('minecraft:container', c['minecraft:container'].filter((x) => x?.item?.id).map((x) => pile(x.item.id, x.item.count, x.slot)));
    if (Array.isArray(c['minecraft:bundle_contents'])) set('minecraft:bundle_contents', c['minecraft:bundle_contents'].filter((x) => x?.id).map((x) => pile(x.id, x.count)));
    if (Array.isArray(c['minecraft:charged_projectiles'])) set('minecraft:charged_projectiles', c['minecraft:charged_projectiles'].filter((x) => x?.id).map((x) => pile(x.id, x.count)));
    if (Array.isArray(c['minecraft:banner_patterns']) && !sinistreJava(c)) set('minecraft:banner_patterns', c['minecraft:banner_patterns'].map((p) => `${sans(p.pattern)}:${p.color ?? 'white'}`));
    set('minecraft:base_color', c['minecraft:base_color'] !== undefined ? String(c['minecraft:base_color']) : undefined);
    const fw = c['minecraft:fireworks'];
    if (fw) set('minecraft:fireworks', fusee(num(fw.flight_duration ?? 1), (fw.explosions || []).map(explosionJava)));
    set('minecraft:firework_explosion', explosionJava(c['minecraft:firework_explosion']));
    set('minecraft:instrument', c['minecraft:instrument'] !== undefined ? sans(typeof c['minecraft:instrument'] === 'string' ? c['minecraft:instrument'] : c['minecraft:instrument'].description).replace(/_goat_horn$/, '') : undefined);
    // bouteille sinistre : amplificateur 0 = valeur par défaut, que Java n'écrit pas
    set('minecraft:ominous_bottle_amplifier', id === 'minecraft:ominous_bottle' ? num(c['minecraft:ominous_bottle_amplifier'] ?? 0) : undefined);
    const tr = c['minecraft:trim'];
    if (tr) set('minecraft:trim', `${sans(tr.material)}|${sans(tr.pattern)}`);
    const dc = c['minecraft:dyed_color'];
    if (dc !== undefined) set('minecraft:dyed_color', num(typeof dc === 'object' ? dc.rgb : dc) & 0xffffff);
    const m = /^minecraft:(.+)_(bed|banner)$/.exec(id || '');
    if (m && TEINTES.includes(m[1]) && !(m[2] === 'banner' && sinistreJava(c))) out['mccb:couleur'] = m[1];
    return out;
  }
  const id = it.Name, t = it.tag || {}, aux = num(it.Damage) ?? 0;
  const set = (k, v) => { if (v !== undefined) out[k] = v; };
  const ench = enchBedrock(t.ench);
  set(id === 'minecraft:enchanted_book' ? 'minecraft:stored_enchantments' : 'minecraft:enchantments', ench);
  // potion de décomposition (Bedrock seul) : rien à garder en Java, non jugée
  const potion = (i) => { const x = POTION_BEDROCK[i] ?? `bedrock#${i}`; return x.startsWith('bedrock:') ? undefined : x; };
  if (/^minecraft:(potion|splash_potion|lingering_potion)$/.test(id)) set('minecraft:potion_contents', potion(aux));
  if (id === 'minecraft:arrow' && aux > 0) set('minecraft:potion_contents', potion(aux - 1));
  if (/shulker_box$/.test(id || '')) set('minecraft:container', pilesBedrock(t.Items));
  if (/bundle$/.test(id || '')) set('minecraft:bundle_contents', pilesBedrock(t.storage_item_component_content)?.map(({ id: i, count }) => ({ id: i, count })));
  if (t.chargedItem?.Name) set('minecraft:charged_projectiles', [pile(t.chargedItem.Name, t.chargedItem.Count)]);
  // Bannière sinistre (Type 1, motif `ill`) : forme Java propre (bannière blanche nommée) — non jugée.
  if (Array.isArray(t.Patterns) && t.Patterns.length && num(t.Type) !== 1 && t.Patterns.every((p) => MOTIFS[p.Pattern])) set('minecraft:banner_patterns', t.Patterns.map((p) => `${MOTIFS[p.Pattern]}:${teinteInversee(p.Color ?? 15)}`));
  if (t.Trim) set('minecraft:trim', `${sans(t.Trim.Material)}|${sans(t.Trim.Pattern)}`);
  if (t.customColor !== undefined) set('minecraft:dyed_color', num(t.customColor) & 0xffffff);
  if (id === 'minecraft:shield' && t.Base !== undefined) set('minecraft:base_color', teinteInversee(t.Base));
  if (t.Fireworks) set('minecraft:fireworks', fusee(num(t.Fireworks.Flight ?? 1), (t.Fireworks.Explosions || []).map(explosionBedrock)));
  if (t.FireworksItem) set('minecraft:firework_explosion', explosionBedrock(t.FireworksItem));
  if (id === 'minecraft:goat_horn') set('minecraft:instrument', CORS[aux] ?? `bedrock#${aux}`);
  if (id === 'minecraft:ominous_bottle') set('minecraft:ominous_bottle_amplifier', aux);
  if (id === 'minecraft:bed') out['mccb:couleur'] = TEINTES[aux & 15];
  if (id === 'minecraft:banner' && num(t.Type) !== 1) out['mccb:couleur'] = teinteInversee(aux);
  return out;
}

// Comparaison d'une pile rangée DANS un objet : même objet (table d'identité du script, comme
// pour les piles des conteneurs) et même nombre.
function memePile(srcEd, e, g) {
  if (!g || num(g.count) !== num(e.count)) return false;
  if (e.ancien) return true; // identité non jugée (règle 40 étendue), le nombre l'est
  const t = equivalents('item', srcEd, e.id).targets;
  return (t?.length ? t : [e.id]).includes(g.id);
}
function memesPiles(srcEd, exp, got, parCase) {
  if (!Array.isArray(got)) return false;
  if (parCase) return exp.every((e) => memePile(srcEd, e, got.find((g) => g.slot === e.slot))) && got.length === exp.length;
  const pool = got.slice();
  for (const e of exp) { const k = pool.findIndex((g) => memePile(srcEd, e, g)); if (k < 0) return false; pool.splice(k, 1); }
  return !pool.length;
}

/** Un détail à l'aller : PASS / FAIL et ce qui a été vu. */
export function comparerDetail(srcEd, nom, attendu, obtenu) {
  if (obtenu === undefined) return { ok: false, observe: null };
  if (nom === 'minecraft:container') return { ok: memesPiles(srcEd, attendu, obtenu, true), observe: obtenu };
  if (nom === 'minecraft:bundle_contents' || nom === 'minecraft:charged_projectiles') return { ok: memesPiles(srcEd, attendu, obtenu, false), observe: obtenu };
  return { ok: JSON.stringify(attendu) === JSON.stringify(obtenu), observe: obtenu };
}

/** Tous les détails d'un objet tenu (équipement, inventaire) : liste des écarts. */
export function ecartsDetails(srcEd, srcItem, dstItem) {
  const dstEd = srcEd === 'java' ? 'bedrock' : 'java';
  const a = detailsDe(srcEd, srcItem), b = detailsDe(dstEd, dstItem);
  const ecarts = [];
  for (const [k, v] of Object.entries(a)) {
    const c = comparerDetail(srcEd, k, v, b[k]);
    if (!c.ok) ecarts.push({ detail: k, attendu: v, observe: c.observe });
  }
  return { compares: Object.keys(a).length, ecarts };
}

/**
 * Objets TENUS (équipement et inventaire d'une créature, inventaire, armure et coffre de l'Ender
 * d'un joueur) : détails de chaque objet source qui en porte, comparés à l'objet retrouvé au même
 * emplacement (ou, sans emplacement commun, au premier objet équivalent non encore pris). Un objet
 * introuvable n'est pas compté ici (déjà jugé par l'aspect equipment / inventory).
 * attendus : [{ slot, id, semx }] ; obtenus : [{ slot, id, semantic }].
 */
export function verdictDetailsTenus(srcEd, attendus, obtenus, { parCase = true } = {}) {
  const pool = obtenus.slice();
  let compares = 0, objets = 0, introuvables = 0;
  const ecarts = [];
  for (const a of attendus) {
    let src; try { src = JSON.parse(a.semx); } catch { continue; }
    if (!Object.keys(detailsDe(srcEd, src)).length) continue;
    objets++;
    const t = equivalents('item', srcEd, a.id).targets;
    const vise = (g) => (t?.length ? t : [a.id]).includes(g.id);
    let k = parCase && a.slot !== undefined && a.slot !== null ? pool.findIndex((g) => g.slot === a.slot && vise(g)) : -1;
    if (k < 0) k = pool.findIndex(vise);
    if (k < 0) { introuvables++; continue; }
    let dst; try { dst = JSON.parse(pool[k].semantic); } catch { dst = null; }
    pool.splice(k, 1);
    const r = ecartsDetails(srcEd, src, dst);
    compares += r.compares;
    for (const x of r.ecarts) ecarts.push({ slot: a.slot ?? null, id: a.id, ...x });
  }
  return { objets, introuvables, compares, ecarts };
}
