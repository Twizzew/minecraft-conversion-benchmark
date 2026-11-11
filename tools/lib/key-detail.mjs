// MCCB 2026-11 (R01, table de gravité 1.4) — DÉTAIL D'UNE CLÉ `data` QUI DIFFÈRE AU RETOUR.
// La table classe une clé par son NOM (`Item` → MAJEUR) ; ce détail regarde ce qui change DEDANS
// et ne descend la gravité que lorsque la preuve le montre :
//  • clés d'objets (`Item`, `Mainhand`, `Armor`, `ChestItems`…) : même objet pile par pile, seuls des
//    champs techniques diffèrent (lib/slots.mjs itemDiff : WasPickedUp, wasJustBrewed, compound
//    `Block` dérivé du nom, ancien nom renommé par le jeu) ou une case vide écrite autrement
//    (`Count:0` / `Name:""`) → TECHNICAL ;
//  • `definitions` : seule l'entrée vide `"+"` (groupe sans nom) manque → TECHNICAL ;
//  • `Attributes` : entrées absentes d'un côté qui valent leur base sans modificateur (le jeu les
//    repose depuis les composants de l'espèce) ou bornes Max/DefaultMax seules → TECHNICAL ; un
//    modificateur perdu sur une base inchangée (bonus aléatoire d'apparition) → MINOR.
// Rien d'autre n'est descendu : toute autre différence garde la classe de la table.
import { itemDiff, technicalOnly } from './slots.mjs';
import { isLegacyBedrockItem, normePile } from '../families/item_stack.mjs';
import { VOLATILE_JAVA_ENTITY_KEYS } from './facts.mjs';

const ITEM_KEYS = /^(Item|item|Trident|book|ItemInHand|Mainhand|Offhand|Armor|ChestItems|Items|RecordItem|key_item)$/;
// Groupes posés et retirés par le jeu lui-même (scheduler horaire, attack_cooldown_complete_event,
// become_calm_event, fin de fête) — noms vérifiés dans villager_v2/piglin/hoglin.json de BDS 1.26.36.1.
// + groupes que la définition ACTUELLE pose à l'apparition et que des mobs natifs plus anciens
// n'ont pas (zombie.json `minecraft:as_adult` : zombie_default, not_on_zombie_horse, on_foot ;
// piglin.json `spawn_adult_*` : interactable_piglin, retiré aussi pendant l'admiration).
const PASSAGERS = /^((wander|bed|gather|home|play|work)_schedule_villager|work_schedule_(farmer|fisher|librarian)|job_specific_goals|trade_resupply_component_group|make_and_receive_love|attack_cooldown|angry|minecraft:celebrate|minecraft:zombie_default|minecraft:not_on_zombie_horse|minecraft:on_foot|interactable_piglin|minecraft:wander_mode|minecraft:look_to_start_drowned_transformation|minecraft:look_to_start_zombie_transformation|adult|return_to_home|look_for_food|find_hive|shelter_detection|abort_shelter_detection|escape_fire|default_sound|collect_nectar|hive_full|minecraft:(detect|start)_suffocating|minecraft:wolf_leashable|minecraft:on_tame_collar_color|minecraft:not_on_camel_husk|minecraft:sheep_(white|orange|magenta|light_blue|yellow|lime|pink|gray|light_gray|silver|cyan|purple|blue|brown|green|red|black)|minecraft:guardian_(aggressive|passive)|minecraft:spider_(neutral|hostile|poison_easy|poison_normal|poison_hard)|go_back_to_spawn|minecraft:squid_adult|minecraft:(base_[a-z]+|markings_[a-z_]+)|minecraft:tropicalfish_[a-z0-9_]+|minecraft:(anenonme|red_snapper|e_red_snapper|red_cichlid|cichlid|moorish_idol|queen_angel_fish|threadfin|tomato_clown|yellow_tang|butterfly_fish|triggerfish|ornate_butterfly|parrotfish|clownfish|black_tang|blue_tang|dottyback|goatfish)|behavior_(non_)?peasant|minecraft:wolf_armorable|(easy|normal|hard)_attack|minecraft:fox_(day|night|thunderstorm|ambient_[a-z_]+)|minecraft:silverfish_(angry|calm)|minecraft:(not_)?riding|minecraft:can_ride_default|minecraft:strider_pathing_behaviors)$/;
// c19, chacun vérifié dans BDS 1.26.36.1 (événement entre parenthèses) :
// guardian.json (`target_far_enough` / `target_too_close`) ; spider, cave_spider.json
// (`become_neutral`, `become_hostile` ; le poison suit la difficulté à chaque `become_hostile`) ;
// piglin_brute.json (`go_back_to_spawn_failed` ; 139 natifs sur 170) ; squid, glow_squid.json
// (`entity_spawned` : 0 calmar natif sur 50 ne le porte) ; horse.json (`make_*`, la robe est jugée
// par `Variant`/`MarkVariant`) ; tropicalfish.json (`become_*`, l'allure est jugée par `Variant`,
// `MarkVariant`, `Color`, `Color2`) ; villager_v2.json (`become_unskilled`, métiers : l'horaire de
// paysan suit le métier, jugé par son groupe) ; wolf.json (`become_armorable`) ; bee.json (`attacked`,
// selon la difficulté) ; fox.json (`fox_configure_*`) ; silverfish.json (`become_angry`, `on_calm`) ;
// enderman.json (`started_riding`, `stopped_riding`) ; boat.json (`add_can_ride`) ; husk.json
// (`stop_transforming`) ; strider.json (`on_not_riding_parent`).
// Table 1.7 (c19, R01, J02, B02) — groupes de plus, chacun vérifié dans BDS 1.26.36.1 :
// zombie.json `as_adult`/`as_baby` (can_have_equipment) ; piglin.json `spawn_adult_*` et
// `become_calm_event` (alert_for_attack_targets) ; ocelot.json `entity_spawned`
// (wild_child_ocelot_spawn) ; spider.json `entity_spawned_with_*_jockey` (groupe de jockey :
// n'ajoute un cavalier qu'à l'apparition, le cavalier réel est une entité jugée à part) ;
// strider.json (strider_parent_jockey, idem) ; warden.json `spawn_emerging`/`emerged`/
// `entity_spawned` (emerging, pushable) ; bee.json `attacked`/`calmed_down` (angry_bee,
// take_nearest_target : colère, durée jugée par le jeu) ; magma_cube.json, slime.json
// `become_aggressive`/`become_calm` ; iron_golem.json `from_village` (village_created : la
// forme actuelle d'un golem sans `PlayerCreated`, les natifs d'avant 1.x n'en portent aucun —
// un golem du JOUEUR devenu « du village » montrerait `player_created` dans l'écart) ;
// villager_v2.json, horaires (`*schedule*` : rejoués par le scheduler) ; wolf.json `spawn_*` (groupe de robe : la
// robe est jugée par `Variant`, que le client affiche ; les loups natifs d'avant 1.20.80 n'ont pas ce groupe).
const PASSAGERS_C19 = /^(minecraft:can_have_equipment|alert_for_attack_targets|minecraft:wild_child_ocelot_spawn|minecraft:spider_([a-z]+_)?jockey|minecraft:strider_parent_jockey|emerging|pushable|angry_bee|take_nearest_target|minecraft:slime_(calm|aggressive)|minecraft:village_created|minecraft:wolf_(pale|ashen|black|chestnut|rusty|snowy|spotted|striped|woods)|[a-z_]*schedule[a-z_]*)$/;
// Groupes réglés par un CAPTEUR d'après l'objet tenu (l'équipement est jugé à part) :
// skeleton.json, stray.json, bogged.json `environment_sensor` (`has_ranged_weapon` false →
// `melee_mode`, sinon `ranged_mode` selon la difficulté) ; drowned.json : mode et table
// d'équipement d'apparition (`as_adult` / `as_ranged_adult`, `mode_switcher`).
const ARC = /^minecraft:(melee_attack|ranged_attack|ranged_attack_hard)$/;
const PASSAGERS_ESPECE = {
  'minecraft:skeleton': ARC, 'minecraft:stray': ARC, 'minecraft:bogged': ARC,
  'minecraft:drowned': /^minecraft:(melee_mode|ranged_mode|mode_switcher|melee_equipment|ranged_equipment)$/,
};
// Valeur que le jeu prend quand la clé MANQUE (Java : `Tame` faux ; délais de conversion et fin de
// colère à −1 = aucun ; Bedrock : lien d'acteur −1 = aucun).
const DEFAUT_SI_ABSENT = {
  Tame: ['0'], ConversionTime: ['-1'], DrownedConversionTime: ['-1'], anger_end_time: ['-1'],
  OwnerNew: ['-1'], OwnerID: ['-1'], TargetID: ['-1'], LeasherID: ['-1'],
};
// Bedrock : `Variant` posé par le composant `minecraft:variant` du groupe de métier (villager_v2.json,
// zombie_villager_v2.json 1.26.20 : mêmes valeurs) ; le nombre sur disque d'un natif est souvent
// périmé (30 villageois zombies natifs R01 sur 87 à 0) et le jeu le remplace au chargement.
const VARIANT_DU_METIER = { unskilled: 0, farmer: 1, fisherman: 2, shepherd: 3, fletcher: 4, librarian: 5, cartographer: 6, cleric: 7, armorer: 8, weaponsmith: 9, toolsmith: 10, butcher: 11, leatherworker: 12, mason: 13, nitwit: 14 };
// Cochon (pig.json 1.26.30) et bogged (bogged.json 1.26.30) : AUCUN composant `minecraft:variant`
// (la variante climatique du cochon est la propriété `minecraft:climate_variant`) → `Variant` inerte.
const SANS_VARIANT = new Set(['minecraft:pig', 'minecraft:bogged']);
const METIERS = /^(farmer|fisherman|shepherd|fletcher|librarian|cartographer|cleric|armorer|weaponsmith|toolsmith|butcher|leatherworker|mason|nitwit)$/;
// (strider.json : capteur de lave ; wolf.json `spawn_*` : wolf_leashable, `on_tame` : collier ;
// husk.json : not_on_camel_husk ; sheep.json : groupe de teinte, que les natifs eux-mêmes
// désaccordent de `Color` (sheep_gray avec Color 8) — la teinte est jugée par `Color`.)
// (bee.json : find_flower_timeout, find_hive_event/timeout, seek_shelter, abort_sheltering,
// exited_hive… basculent ces groupes de trajet ; `has_nectar`, l'état réel, n'en fait pas partie.)
// (drowned.json `as_adult` : wander_mode ; zombie.json `stop_transforming` : capteur de noyade ;
// villager_v2.json `spawn_from_village` / `ageable_grow_up` : adult — un bébé ↔ adulte reste
// visible par `baby`, qui n'est pas dans cette liste.)
const parse = (s) => { if (s === undefined) return undefined; try { return JSON.parse(s); } catch { return undefined; } };
const isEmpty = (x) => x && typeof x === 'object' && !Array.isArray(x) && (x.Count === 0 || x.Name === '');

const RANG = { TECHNICAL: 0, MINOR: 1 };
// Classe d'un écart de piles : TECHNICAL (champs sans effet), MINOR (ancien nom Bedrock absent
// du registre actuel, renommé par le jeu — règle 40 : pas de table neutre de ces renommages,
// donc non prouvé), sinon null.
function itemsClass(a, b, dropBlock) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return null;
    let pire = 'TECHNICAL';
    for (let i = 0; i < a.length; i++) { const c = itemsClass(a[i], b[i], dropBlock); if (!c) return null; if (RANG[c] > RANG[pire]) pire = c; }
    return pire;
  }
  if (isEmpty(a) && isEmpty(b)) return 'TECHNICAL';
  const d = itemDiff(a, b, { dropBlock });
  if (d !== null && (d.length === 0 || technicalOnly(d))) return 'TECHNICAL';
  // Table 1.8 : même normalisation que la famille item_stack (`Potion` qui redit l'aux, cases vides…).
  if (dropBlock) { const canon = (x) => JSON.stringify(x, (_, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, v[k]])) : v)); if (canon(normePile(a)) === canon(normePile(b))) return 'TECHNICAL'; }
  if (d !== null) return null;
  const na = a?.Name ?? a?.id, nb = b?.Name ?? b?.id;
  if (!na || !nb || na === nb || !isLegacyBedrockItem(na)) return null;
  const sans = (x) => { const o = { ...x }; delete o.Name; delete o.id; delete o.Damage; delete o.Block; return o; };
  const d2 = itemDiff(sans(a), sans(b), { dropBlock });
  return d2 !== null && (d2.length === 0 || technicalOnly(d2)) ? 'MINOR' : null;
}

// Forme Java (`id`, `base`, `modifiers`) : nombres comparés à la précision du flottant 32 bits que
// Bedrock stocke (Math.fround) ; une entrée sans modificateur présente d'un seul côté → MINOR
// (sa valeur par défaut d'espèce n'est pas prouvée ici).
function attributesJava(a, b) {
  const f = (x) => Math.fround(Number(x ?? NaN));
  const by = (l) => Object.fromEntries(l.filter((x) => x && x.id).map((x) => [x.id, x]));
  const mods = (x) => JSON.stringify((x.modifiers || []).map((m) => [m.id, m.operation, f(m.amount)]).sort());
  const A = by(a), B = by(b);
  let cls = 'TECHNICAL';
  for (const n of new Set([...Object.keys(A), ...Object.keys(B)])) {
    const x = A[n], y = B[n];
    if (x && y) {
      if (f(x.base) !== f(y.base) && !(x.base === undefined || y.base === undefined)) return null;
      if (mods(x) !== mods(y)) return null;
      if (x.base === undefined || y.base === undefined) cls = 'MINOR';
      continue;
    }
    if ((x || y).modifiers?.length) return null;
    cls = 'MINOR';
  }
  return cls;
}

function attributes(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return null;
  if ([...a, ...b].some((x) => x && x.id !== undefined)) return attributesJava(a, b);
  const by = (l) => Object.fromEntries(l.filter((x) => x && x.Name).map((x) => [x.Name, x]));
  const A = by(a), B = by(b);
  const plain = (x) => !x.Modifiers?.length && Number(x.Base) === Number(x.Current);
  const mods = (x) => JSON.stringify(x.Modifiers || []);
  let cls = 'TECHNICAL';
  for (const n of new Set([...Object.keys(A), ...Object.keys(B)])) {
    const x = A[n], y = B[n];
    if (x && y) {
      if (Number(x.Base) !== Number(y.Base)) {
        // Hoglin : deux formes natives de `knockback_resistance` (51 à 0, 23 à 0.6 = hoglin.json).
        if (n === 'minecraft:knockback_resistance' && Number(x.Base) === 0 && Math.fround(Number(y.Base)) === Math.fround(0.6)) { cls = 'MINOR'; continue; }
        return null;
      }
      if (mods(x) === mods(y) && Number(x.Current) === Number(y.Current)) continue;
      if (x.Modifiers?.length && !y.Modifiers?.length) { cls = 'MINOR'; continue; }
      return null;
    }
    const seul = x || y;
    if (plain(seul)) continue;
    if (x && x.Modifiers?.length) { cls = 'MINOR'; continue; }
    return null;
  }
  return cls;
}

// Table 1.7 (J02/J04 c19) — CAVALIERS (`Passengers`, Java) : même nombre, même espèce, et chaque
// cavalier ne diffère que par ce que la table range déjà hors MAJEUR pour une entité de premier
// niveau : clés volatiles (VOLATILE_JAVA_ENTITY_KEYS), 0/−1/faux perdus (zero_lost_is_technical,
// délais de conversion −1), `ArmorItems`/`HandItems` d'ancien format (table 1.1), attributs
// (attributesJava, `attributes`/`Attributes` table 1.6), cavaliers imbriqués (récursion).
function passagersJava(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return null;
  let pire = 'TECHNICAL';
  const monte = (c) => { if (RANG[c] > RANG[pire]) pire = c; };
  const lireAttr = (x) => (Array.isArray(x?.attributes) ? x.attributes
    : Array.isArray(x?.Attributes) ? x.Attributes.filter((y) => y?.Name).map((y) => ({ id: String(y.Name).replace('generic.', ''), base: y.Base, modifiers: y.Modifiers || [] })) : []);
  for (let i = 0; i < a.length; i++) {
    const x = a[i], y = b[i];
    if (!x || !y || x.id !== y.id) return null;
    let attrVu = false;
    for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) {
      if (VOLATILE_JAVA_ENTITY_KEYS.has(k)) continue;
      const u = x[k], v = y[k];
      if (JSON.stringify(u) === JSON.stringify(v)) continue;
      if (v === undefined && (u === 0 || u === -1 || u === false)) continue;
      if (u === undefined && /^(ArmorItems|HandItems|ArmorDropChances|HandDropChances)$/.test(k)) continue;
      // Balise privée du convertisseur (`WSBedrock…`) : clé inconnue de Java, ignorée au chargement.
      if (u === undefined && /^WS[A-Z]/.test(k)) continue;
      // Nom : composant texte réduit à `{"text": s}` ≡ la chaîne s (même affichage).
      if (k === 'CustomName' && typeof u === 'string' && v && typeof v === 'object' && Object.keys(v).length === 1 && v.text === u) continue;
      if (k === 'attributes' || k === 'Attributes') {
        if (attrVu) continue;
        attrVu = true;
        const c = attributesJava(lireAttr(x), lireAttr(y));
        if (!c) return null;
        monte(c);
        continue;
      }
      if (k === 'Passengers') { const c = passagersJava(u, v); if (!c) return null; monte(c); continue; }
      return null;
    }
  }
  return pire;
}

// Liens vers un acteur (Bedrock) : un JOUEUR reçoit un nouvel `UniqueID` à chaque conversion
// J→B ; le lien est intact s'il désigne le MÊME joueur (même clé `~local_player` /
// `player_server_<id>`) à la source et au retour.
const LIEN = /^(OwnerNew|OwnerID|TargetID|LeasherID)$/;
const longTexte = (x) => String(Array.isArray(x) ? x.join(':') : x).replace(/L$/, '');

/** Classe descendue d'une clé qui diffère au retour, ou null (la table décide). */
export function keyDetail(k, eSem, gSem, sourceEdition, { joueurs, entityId } = {}) {
  const a = parse(eSem), b = parse(gSem);
  // Liste de contenu VIDE ajoutée (ruche sans abeille `Occupants: []`) = même état qu'absente.
  const videL = (x) => (Array.isArray(x) && !x.length) || (x && typeof x === 'object' && !Array.isArray(x) && !Object.keys(x).length);
  if (/^(Occupants|Items|ChestItems|Bees|bees|mobEffects|ActiveEffects)$/.test(k) && ((a === undefined && videL(b)) || (b === undefined && videL(a)))) return 'TECHNICAL';
  // Table 1.7 : clé écrite d'un seul côté avec la valeur que le jeu prend quand elle MANQUE.
  if ((a === undefined) !== (b === undefined) && DEFAUT_SI_ABSENT[k] && DEFAUT_SI_ABSENT[k].includes(String(a ?? b).replace(/[Lbs]$/, ''))) return 'TECHNICAL';
  if (a === undefined || b === undefined) return null;
  if (LIEN.test(k) && joueurs) {
    const ja = joueurs.source.get(longTexte(a)), jb = joueurs.roundtrip.get(longTexte(b));
    if (ja || jb) return ja && ja === jb ? 'TECHNICAL' : null;
    // Table 1.8 : même acteur (type, place à 1 bloc près), ou cible absente des deux mondes.
    const ac = joueurs.acteurs;
    if (!ac) return null;
    const sa = ac.source.get(longTexte(a)), sb = ac.roundtrip.get(longTexte(b));
    if (!sa && !sb) return 'TECHNICAL';
    const n = (x) => x.replace('minecraft:', '').replace('_v2', '');
    return sa && sb && n(sa.id) === n(sb.id) && sa.pos.length === 3 && sb.pos.length === 3
      && Math.hypot(sa.pos[0] - sb.pos[0], sa.pos[1] - sb.pos[1], sa.pos[2] - sb.pos[2]) <= 1 ? 'TECHNICAL' : null;
  }
  if (ITEM_KEYS.test(k)) return itemsClass(a, b, sourceEdition === 'bedrock');
  if (k === 'definitions' && Array.isArray(a) && Array.isArray(b)) {
    const n = (l) => l.filter((x) => x !== '+' && x !== '-');
    if (JSON.stringify(n(a)) === JSON.stringify(n(b))) return 'TECHNICAL';
    // Groupes ACTIFS une fois la liste rejouée (`+g` ajoute, `-g` retire) : mêmes groupes dans
    // un autre ordre → TECHNICAL ; écart limité aux groupes que le jeu repose lui-même par
    // minuterie ou horloge (BDS 1.26.36.1 : horaires du villageois, recharge d'attaque…) → MINOR.
    const actifs = (l) => { const s = new Set(); for (const x of l) { if (x.length < 2) continue; if (x[0] === '+') s.add(x.slice(1)); else if (x[0] === '-') s.delete(x.slice(1)); } return s; };
    const A = actifs(a), B = actifs(b);
    const ecart = [...A].filter((x) => !B.has(x)).concat([...B].filter((x) => !A.has(x)));
    if (!ecart.length) return 'TECHNICAL';
    // `unskilled` resté actif à côté d'un métier des deux côtés (natif : `+unskilled … +farmer`) :
    // c'est le groupe de métier qui pose `minecraft:variant` en dernier.
    const memeMetier = [...A].some((x) => METIERS.test(x) && B.has(x));
    const parEspece = PASSAGERS_ESPECE[entityId];
    return ecart.every((x) => PASSAGERS.test(x) || PASSAGERS_C19.test(x) || (parEspece && parEspece.test(x)) || (x === 'unskilled' && memeMetier)) ? 'MINOR' : null;
  }
  if (k === 'Attributes' || k === 'attributes') return attributes(a, b);
  if (k === 'Passengers' && sourceEdition === 'java') return passagersJava(a, b);
  // Effets : mêmes effets, durées et niveaux ; seul le suivi d'affichage `FactorCalculationData`
  // (fondu de l'obscurité) n'existe pas côté Java.
  if (k === 'ActiveEffects' && Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    const sans = (l) => JSON.stringify(l.map((e) => { const o = { ...e }; delete o.FactorCalculationData; return Object.keys(o).sort().map((q) => [q, o[q]]); }));
    return sans(a) === sans(b) ? 'MINOR' : null;
  }
  // Ruche : mêmes abeilles (type, durée, nectar) ; le reste de `SaveData` est refait par le jeu à la
  // sortie de la ruche, et les groupes ne diffèrent que par des passagers.
  if (k === 'Occupants' && Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    const actifs = (l) => { const s = new Set(); for (const x of l || []) { if (x.length < 2) continue; if (x[0] === '+') s.add(x.slice(1)); else if (x[0] === '-') s.delete(x.slice(1)); } return s; };
    for (let i = 0; i < a.length; i++) {
      const x = a[i], y = b[i];
      if (x.ActorIdentifier !== y.ActorIdentifier || Number(x.TicksLeftToStay) !== Number(y.TicksLeftToStay)) return null;
      const A = actifs(x.SaveData?.definitions), B = actifs(y.SaveData?.definitions);
      const ecart = [...A].filter((g) => !B.has(g)).concat([...B].filter((g) => !A.has(g)));
      if (!ecart.every((g) => PASSAGERS.test(g) || PASSAGERS_C19.test(g))) return null;
    }
    return 'MINOR';
  }
  // Échanges Bedrock : `Damage` 32767 = « toute valeur » sur un objet DEMANDÉ ; les natifs R01
  // écrivent indifféremment 0 ou 32767 pour le même objet (1 004 émeraudes à 0, 492 à 32767).
  // Mêmes offres une fois 32767 ramené à 0 sur buyA/buyB (piles comparées par itemsClass) → classe des piles.
  if (k === 'Offers' && Array.isArray(a?.Recipes) && Array.isArray(b?.Recipes) && a.Recipes.length === b.Recipes.length) {
    // Prix affiché = `buyCountA`/`buyCountB` (décidé et vérifié en jeu le 02/11/2026 : mêmes prix dans
    // les 3 mondes alors que `buyA.Count` vaut 17 pour un `buyCountA` de 24 dans ce vieux monde).
    const prix = (r) => {
      const o = { ...r };
      if (o.buyA && o.buyCountA !== undefined) o.buyA = { ...o.buyA, Count: o.buyCountA };
      if (o.buyB && o.buyCountB !== undefined && o.buyB.Count) o.buyB = { ...o.buyB, Count: o.buyCountB };
      return o;
    };
    a.Recipes = a.Recipes.map(prix); b.Recipes = b.Recipes.map(prix);
    const joker = (x) => (x && Number(x.Damage) === 32767 ? { ...x, Damage: 0 } : x);
    const sansPiles = (r) => { const o = { ...r }; delete o.buyA; delete o.buyB; delete o.sell; return o; };
    let pire = 'TECHNICAL';
    for (let i = 0; i < a.Recipes.length; i++) {
      let x = a.Recipes[i], y = b.Recipes[i];
      // Table 1.7 : multiplicateur de prix du 2e objet. Java n'en a qu'un (`priceMultiplier`) ; 191 offres
      // natives R01 à deux objets sur 197 portent pmB = pmA, 6 (anciennes) portent 0 → MINOR.
      if (x.buyB && Number(x.priceMultiplierB) === 0 && Number(y.priceMultiplierB) === Number(y.priceMultiplierA) && Number(x.priceMultiplierA) === Number(y.priceMultiplierA)) {
        x = { ...x, priceMultiplierB: y.priceMultiplierB };
        if (RANG.MINOR > RANG[pire]) pire = 'MINOR';
      }
      const d = itemDiff(sansPiles(x), sansPiles(y));
      if (d === null || d.length) return null;
      for (const p of ['buyA', 'buyB', 'sell']) {
        if (x[p] === undefined && y[p] === undefined) continue;
        const c = itemsClass(p === 'sell' ? x[p] : joker(x[p]), p === 'sell' ? y[p] : joker(y[p]), sourceEdition === 'bedrock');
        if (!c) return null;
        if (RANG[c] > RANG[pire]) pire = c;
      }
    }
    return pire;
  }
  return null;
}

/** `key_detail` d'une preuve : { clé: classe } pour les clés dont la gravité descend. */
export function keyDetails(keys, eSem, gSem, sourceEdition, opts) {
  const out = {};
  const entityId = parse(eSem?.identifier ?? eSem?.id);
  for (const k of keys) { const c = keyDetail(k, eSem?.[k], gSem?.[k], sourceEdition, { ...opts, entityId }); if (c) out[k] = c; }
  // Table 1.7 — `Variant` Bedrock : inerte (espèce sans composant `minecraft:variant`) ou imposé par le
  // MÊME groupe de métier actif des deux côtés (voir VARIANT_DU_METIER).
  if (sourceEdition === 'bedrock' && keys.includes('Variant') && !out.Variant) {
    if (SANS_VARIANT.has(entityId)) out.Variant = 'TECHNICAL';
    else if (entityId === 'minecraft:villager_v2' || entityId === 'minecraft:zombie_villager_v2') {
      const actifs = (l) => { const s = []; for (const x of Array.isArray(l) ? l : []) { if (typeof x !== 'string' || x.length < 2) continue; const n = x.slice(1); if (VARIANT_DU_METIER[n] === undefined) continue; if (x[0] === '+') { const i = s.indexOf(n); if (i >= 0) s.splice(i, 1); s.push(n); } else if (x[0] === '-') { const i = s.indexOf(n); if (i >= 0) s.splice(i, 1); } } return s.at(-1); };
      const mA = actifs(parse(eSem?.definitions)), mB = actifs(parse(gSem?.definitions));
      if (mA && mA === mB && Number(parse(gSem?.Variant)) === VARIANT_DU_METIER[mB]) out.Variant = 'TECHNICAL';
    }
  }
  // Table 1.6 — source Java : `attributes` moderne d'un côté, `Attributes` 1.20.4 de l'autre (sortie en
  // DataVersion 3700, le DataFixer du jeu les migre : `generic.max_health` → `max_health`).
  if (sourceEdition === 'java' && keys.includes('Attributes') && (keys.includes('attributes') || eSem?.Attributes === undefined)) {
    const lire = (s) => {
      const m = parse(s?.attributes);
      if (Array.isArray(m)) return m;
      const l = parse(s?.Attributes);
      return Array.isArray(l) ? l.filter((x) => x?.Name).map((x) => ({ id: String(x.Name).replace('generic.', ''), base: x.Base, modifiers: x.Modifiers || [] })) : [];
    };
    const c = attributesJava(lire(eSem), lire(gSem));
    if (c) { out.attributes = c; out.Attributes = c; }
  }
  // Table 1.8 — source Java : `active_effects` moderne à la source, `ActiveEffects` 1.20.4 au retour
  // (sortie DataVersion 3700 ; le DataFixer du jeu renomme la liste, l'`Id` numérique devient le nom).
  if (sourceEdition === 'java' && keys.includes('active_effects') && keys.includes('ActiveEffects')
      && eSem?.ActiveEffects === undefined && gSem?.active_effects === undefined) {
    const NOMS = [null, 'speed', 'slowness', 'haste', 'mining_fatigue', 'strength', 'instant_health', 'instant_damage', 'jump_boost', 'nausea', 'regeneration', 'resistance', 'fire_resistance', 'water_breathing', 'invisibility', 'blindness', 'night_vision', 'hunger', 'weakness', 'poison', 'wither', 'health_boost', 'absorption', 'saturation', 'glowing', 'levitation', 'luck', 'unluck', 'slow_falling', 'conduit_power', 'dolphins_grace', 'bad_omen', 'hero_of_the_village', 'darkness'];
    const b = (x, d) => Number(x ?? d);
    const mod = (l) => JSON.stringify((Array.isArray(l) ? l : []).map((e) => [String(e.id).replace('minecraft:', ''), b(e.amplifier, 0), b(e.duration, 0), b(e.ambient, 0), b(e.show_particles, 1), b(e.show_icon, 1)]).sort());
    const vieux = (l) => JSON.stringify((Array.isArray(l) ? l : []).map((e) => [NOMS[Number(e.Id)] ?? `#${e.Id}`, b(e.Amplifier, 0), b(e.Duration, 0), b(e.Ambient, 0), b(e.ShowParticles, 1), b(e.ShowIcon, 1)]).sort());
    if (mod(parse(eSem.active_effects)) === vieux(parse(gSem.ActiveEffects))) { out.active_effects = 'TECHNICAL'; out.ActiveEffects = 'TECHNICAL'; }
  }
  // Table 1.8 — source Java : `equipment` moderne à la source ; au retour (DataVersion 3700) les mains
  // et l'armure en `HandItems`/`ArmorItems`, parfois doublées dans `equipment`. Mêmes emplacements,
  // mêmes objets et nombres → MINOR (le contenu des objets est jugé par l'aspect entity.equipment).
  if (sourceEdition === 'java' && keys.includes('equipment') && (gSem?.HandItems !== undefined || gSem?.ArmorItems !== undefined) && eSem?.HandItems === undefined && eSem?.ArmorItems === undefined) {
    const vide = (x) => !x || !x.id || x.id === 'minecraft:air';
    const resume = (x) => `${x.id}x${Number(x.count ?? x.Count ?? 1)}`;
    const lire = (s) => {
      const m = {};
      const eq = parse(s?.equipment);
      if (eq && typeof eq === 'object') for (const [k, x] of Object.entries(eq)) if (!vide(x)) m[k] = resume(x);
      const h = parse(s?.HandItems), ar = parse(s?.ArmorItems);
      ['mainhand', 'offhand'].forEach((k, i) => { if (Array.isArray(h) && !vide(h[i])) m[k] ??= resume(h[i]); });
      ['feet', 'legs', 'chest', 'head'].forEach((k, i) => { if (Array.isArray(ar) && !vide(ar[i])) m[k] ??= resume(ar[i]); });
      return JSON.stringify(Object.keys(m).sort().map((k) => [k, m[k]]));
    };
    if (lire(eSem) === lire(gSem)) for (const k of ['equipment', 'HandItems', 'ArmorItems']) if (keys.includes(k) && !out[k]) out[k] = 'MINOR';
  }
  // Bateau moderne (`minecraft:acacia_boat`) : un `Type` à côté de l'identifiant qui dit déjà le bois.
  // Java 1.21.2+ n'a plus ce champ ; le jeu l'ignore.
  if (keys.includes('Type') && eSem?.Type === undefined && /_(chest_)?(boat|raft)"$/.test(String(gSem?.id ?? eSem?.id ?? ''))) out.Type = 'TECHNICAL';
  // Table 1.7 : forme 1.20.4 `boat`/`chest_boat` + `Type` (sortie DataVersion 3700) que `BoatSplitFix`
  // (jar 26.3) change en l'id par essence de la source → id et Type TECHNIQUES.
  if (sourceEdition === 'java' && keys.includes('id') && eSem?.Type === undefined) {
    const p = (x) => { try { return JSON.parse(x); } catch { return x; } };
    const gid = p(gSem?.id), eid = p(eSem?.id), bois = p(gSem?.Type);
    const BOIS = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'cherry', 'dark_oak', 'mangrove', 'bamboo'];
    if ((gid === 'minecraft:boat' || gid === 'minecraft:chest_boat') && BOIS.includes(bois)) {
      const c = gid === 'minecraft:chest_boat' ? 'chest_' : '';
      if (eid === (bois === 'bamboo' ? `minecraft:bamboo_${c}raft` : `minecraft:${bois}_${c}boat`)) { out.id = 'TECHNICAL'; if (keys.includes('Type')) out.Type = 'TECHNICAL'; }
    }
  }
  return Object.keys(out).length ? { key_detail: out } : {};
}
