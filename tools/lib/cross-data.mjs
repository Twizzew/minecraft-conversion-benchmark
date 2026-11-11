// MCCB 2026-11 — ÉTATS TEMPORAIRES ET DÉTAILS, jugés À L'ALLER (règle 59).
//
// Le lecteur v1.1 ne jugeait `block_entity.data` / `entity.data` qu'au retour (champ brut contre
// champ brut) : à l'aller, minuteries, mèches, âges, abeilles, soin, capitaine… n'étaient JAMAIS
// comptés (« no-mccb-v1.1-rule-for-this-property »). Cette table met en regard, champ par champ, la
// forme Java et la forme Bedrock d'un même état, relevées sur des mondes natifs et sur les fichiers
// du jeu (BDS 1.26.36.1, jar 26.3) :
//   • four / haut fourneau / fumoir : lit_time_remaining ↔ BurnTime, cooking_time_spent ↔ CookTime,
//     lit_total_time ↔ BurnDuration ;
//   • alambic : BrewTime ↔ CookTime, Fuel ↔ FuelAmount, total_fuel ↔ FuelTotal ;
//   • feu de camp : CookingTimes[i] ↔ ItemTime{i+1} ;
//   • entonnoir : TransferCooldown ↔ TransferCooldown ;
//   • ruche : nombre d'abeilles, (min_ticks_in_hive − ticks_in_hive) ↔ TicksLeftToStay, HasNectar ;
//   • pupitre : Page ↔ page ;
//   • TNT amorcée : fuse ↔ Fuse ; bloc qui tombe : Time ↔ Time ; objet au sol : Age, quantité ;
//     orbe d'expérience : Value ↔ `experience value`, Age ;
//   • villageois zombie : soin en cours (ConversionTime ≥ 0) ↔ groupe `+to_villager` ;
//   • pillard / vindicateur : PatrolLeader ↔ IsIllagerCaptain ;
//   • toute entité : mouvement (Motion, à 1e-4 près), durées des effets actifs.
// Chaque différence est rapportée sous le NOM JAVA du champ : la table de gravité (impact-classes)
// la classe comme au retour. Les champs source qu'aucune règle ne couvre sont listés
// (`not_compared`) : la couverture reste visible, rien n'est passé sous silence.
import { r, PASS, PARTIAL, FAIL } from './status.mjs';
import { equivalents } from './identity.mjs';
import { bedrockRegistry } from './registry.mjs';
import { MOTIFS, TEINTES } from './details-objet.mjs';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { JAVA_LIT_ISBABY } from './facts.mjs';

const num = (x) => (x === undefined || x === null || x === '' ? undefined : Number(x));
const plainOf = (facts) => {
  const o = {};
  for (const [k, v] of Object.entries(facts?.sem || {})) { try { o[k] = JSON.parse(v); } catch { o[k] = v; } }
  return o;
};

const FURNACE = [
  { k: 'lit_time_remaining', j: (d) => num(d.lit_time_remaining ?? d.BurnTime), b: (d) => num(d.BurnTime) },
  { k: 'cooking_time_spent', j: (d) => num(d.cooking_time_spent ?? d.CookTime), b: (d) => num(d.CookTime) },
  // Durée totale du feu : n'a de sens que pour un four qui BRÛLE.
  { k: 'lit_total_time', j: (d) => (num(d.lit_time_remaining ?? d.BurnTime) > 0 ? num(d.lit_total_time) : undefined), b: (d) => (num(d.BurnTime) > 0 ? num(d.BurnDuration) : undefined) },
];
const CAMPFIRE = [0, 1, 2, 3].map((i) => ({ k: 'CookingTimes', j: (d) => (Array.isArray(d.CookingTimes) ? num(d.CookingTimes[i]) : undefined), b: (d) => num(d[`ItemTime${i + 1}`]) }));
const bees = (d) => (Array.isArray(d.bees) ? d.bees : Array.isArray(d.Bees) ? d.Bees : undefined);
const occ = (d) => (Array.isArray(d.Occupants) ? d.Occupants : undefined);
// Table 1.6 : l'abeille Bedrock native n'écrit pas `HasNectar` ; son nectar est le groupe `has_nectar`
// (bee.json `collected_nectar` ; 55 abeilles de ruche R01 le portent, aucune n'a le champ).
const nectarDuGroupe = (defs) => {
  if (!Array.isArray(defs)) return false;
  let actif = false;
  for (const g of defs) { if (g === '+has_nectar') actif = true; else if (g === '-has_nectar') actif = false; }
  return actif;
};
const BEEHIVE = [
  { k: 'bees', j: (d) => bees(d)?.length, b: (d) => occ(d)?.length ?? 0 },
  ...[0, 1, 2].flatMap((i) => [
    { k: 'ticks_in_hive', j: (d) => { const x = bees(d)?.[i]; return x ? num(x.min_ticks_in_hive ?? x.MinOccupationTicks) - num(x.ticks_in_hive ?? x.TicksInHive) : undefined; }, b: (d) => num(occ(d)?.[i]?.TicksLeftToStay) },
    { k: 'bees', j: (d) => { const x = bees(d)?.[i]; return x ? num(x.entity_data?.HasNectar ?? x.EntityData?.HasNectar ?? 0) : undefined; }, b: (d) => { const x = occ(d)?.[i]; return x ? (num(x.SaveData?.HasNectar ?? 0) || (nectarDuGroupe(x.SaveData?.definitions) ? 1 : 0)) : undefined; } },
  ]),
];
const BLOCK_ENTITY_RULES = [
  [['minecraft:furnace', 'Furnace', 'minecraft:blast_furnace', 'BlastFurnace', 'minecraft:smoker', 'Smoker'], FURNACE],
  [['minecraft:brewing_stand', 'BrewingStand'], [
    { k: 'BrewTime', j: (d) => num(d.BrewTime), b: (d) => num(d.CookTime) },
    { k: 'Fuel', j: (d) => num(d.Fuel), b: (d) => num(d.FuelAmount) },
    // Charge totale : seulement s'il reste du combustible (Java la pose à 20 même vide).
    { k: 'Fuel', j: (d) => (num(d.Fuel) > 0 ? num(d.total_fuel) : undefined), b: (d) => (num(d.FuelAmount) > 0 ? num(d.FuelTotal) : undefined) },
  ]],
  [['minecraft:campfire', 'minecraft:soul_campfire', 'Campfire', 'SoulCampfire'], CAMPFIRE],
  [['minecraft:hopper', 'Hopper'], [{ k: 'TransferCooldown', j: (d) => num(d.TransferCooldown), b: (d) => num(d.TransferCooldown) }]],
  [['minecraft:beehive', 'minecraft:bee_nest', 'Beehive', 'BeeNest'], BEEHIVE],
  [['minecraft:lectern', 'Lectern'], [{ k: 'Page', j: (d) => (d.Book ? num(d.Page ?? 0) : undefined), b: (d) => (d.book ? num(d.page ?? 0) : undefined) }]],
];

// ── Lot 3 (08/11/2026) : DÉTAILS des blocs-entités, à l'aller.
// Table de butin d'un conteneur pas encore ouvert (la perdre = coffre vide) : nom Java ; chemin Bedrock
// `loot_tables/<x>.json`, avec les noms que Bedrock écrit autrement (relevés sur les mondes sources).
const BUTIN_BEDROCK = {
  'chests/buriedtreasure': 'chests/buried_treasure', 'chests/dispenser_trap': 'chests/jungle_temple_dispenser',
  'chests/shipwrecksupply': 'chests/shipwreck_supply', 'chests/shipwrecktreasure': 'chests/shipwreck_treasure', 'chests/shipwreck': 'chests/shipwreck_map',
  'entities/cold_ocean_ruins_brushable_block': 'archaeology/ocean_ruin_cold', 'entities/warm_ocean_ruins_brushable_block': 'archaeology/ocean_ruin_warm',
  'entities/trail_ruins_brushable_block_common': 'archaeology/trail_ruins_common', 'entities/trail_ruins_brushable_block_rare': 'archaeology/trail_ruins_rare',
  'entities/desert_pyramid_brushable_block': 'archaeology/desert_pyramid', 'entities/desert_well_brushable_block': 'archaeology/desert_well',
};
const butinJ = (d) => (typeof d.LootTable === 'string' && d.LootTable ? d.LootTable.replace(/^minecraft:/, '') : undefined);
// Un nom JAVA écrit tel quel dans un monde Bedrock (`archaeology/ocean_ruin_warm`) n'existe pas en Bedrock :
// lu comme invalide (vérification du 08/11/2026 : la table l'acceptait à tort).
const NOMS_JAVA_SEULS = new Set(Object.values(BUTIN_BEDROCK));
const butinB = (d) => { if (typeof d.LootTable !== 'string' || !d.LootTable) return undefined; const x = d.LootTable.replace(/^loot_tables\//, '').replace(/\.json$/, ''); return NOMS_JAVA_SEULS.has(x) ? `invalide-en-bedrock:${x}` : (BUTIN_BEDROCK[x] ?? x); };
const BUTIN = [
  { k: 'LootTable', j: (d) => (butinJ(d) ? 1 : undefined), b: (d) => (butinB(d) ? 1 : undefined) },
  { k: 'LootTable', j: butinJ, b: butinB },
];
// Créature d'un générateur : identifiant ramené au nom Java par la table d'identité du script.
const javaEntite = (id) => { if (!id) return undefined; const t = equivalents('entity', 'bedrock', id).targets; return (t?.length ? t[0] : id).replace(/^minecraft:/, ''); };
const GENERATEUR = [
  { k: 'SpawnData', j: (d) => (d.SpawnData?.entity?.id ? String(d.SpawnData.entity.id).replace(/^minecraft:/, '') : undefined), b: (d) => javaEntite(d.EntityIdentifier) },
  ...['MinSpawnDelay', 'MaxSpawnDelay', 'SpawnCount', 'MaxNearbyEntities', 'RequiredPlayerRange', 'SpawnRange'].map((k) => ({ k, j: (d) => num(d[k]), b: (d) => num(d[k]) })),
];
// Tessons d'un pot décoré : Java { back, left, right, front } ; Bedrock liste [arrière, gauche, droite, avant].
const tesson = (x) => String(x?.id ?? x ?? 'minecraft:brick').replace(/^minecraft:/, '');
const POT = [{ k: 'sherds', j: (d) => (d.sherds ? (Array.isArray(d.sherds) ? d.sherds.map(tesson) : ['back', 'left', 'right', 'front'].map((c) => tesson(d.sherds[c]))) : undefined), b: (d) => (Array.isArray(d.sherds) ? d.sherds.map(tesson) : undefined) }];
// Motifs d'une bannière posée (la couleur de fond est portée par le bloc).
const BANNIERE = [{ k: 'patterns', j: (d) => (Array.isArray(d.patterns) && d.patterns.length ? d.patterns.map((p) => `${String(p.pattern).replace(/^minecraft:/, '')}:${p.color ?? 'white'}`) : undefined),
  b: (d) => (Array.isArray(d.Patterns) && d.Patterns.length && num(d.Type) !== 1 && d.Patterns.every((p) => MOTIFS[p.Pattern]) ? d.Patterns.map((p) => `${MOTIFS[p.Pattern]}:${TEINTES[15 - (num(p.Color ?? 15) & 15)]}`) : undefined) }];
const AVEC_BUTIN = [['minecraft:chest', 'Chest', 'minecraft:trapped_chest'], ['minecraft:barrel', 'Barrel'], ['minecraft:dispenser', 'Dispenser'], ['minecraft:dropper', 'Dropper'], ['minecraft:hopper', 'Hopper'], ['minecraft:shulker_box', 'ShulkerBox'], ['minecraft:brushable_block', 'BrushableBlock', 'minecraft:suspicious_sand', 'minecraft:suspicious_gravel'], ['minecraft:decorated_pot', 'DecoratedPot']];
for (const ids of AVEC_BUTIN) {
  const row = BLOCK_ENTITY_RULES.find(([names]) => ids.some((id) => names.includes(id)));
  const plus = [...BUTIN, ...(ids.includes('DecoratedPot') ? POT : [])];
  if (row) row[1].push(...plus); else BLOCK_ENTITY_RULES.push([ids, plus]);
}
BLOCK_ENTITY_RULES.push([['minecraft:mob_spawner', 'MobSpawner'], GENERATEUR]);
BLOCK_ENTITY_RULES.push([['minecraft:banner', 'Banner'], BANNIERE]);

const defs = (d) => (Array.isArray(d.definitions) ? d.definitions : []);
// Identité d'un objet au sol : identifiant gardé s'il a une référence dans la table d'identité du script.
const blocAncien = (b) => {
  if (!b || typeof b !== 'object' || !b.name || !b.states || typeof b.states !== 'object') return false;
  const reg = bedrockRegistry(); if (!reg.blocks.has(b.name)) return true;
  const cles = reg.blockStateKeys.get(b.name) || [];
  return Object.keys(b.states).some((k) => !cles.includes(k));
};
const objetConnu = (ed, id) => { if (typeof id !== 'string' || !id) return undefined; const e = equivalents('item', ed, id); return e.status === 'equivalent' ? `${ed}|${id}` : INCONNU; };
const memeObjet = (a, b) => {
  const [ea, ia] = String(a).split('|'), [eb, ib] = String(b).split('|');
  if (ea === eb) return ia === ib;
  return (equivalents('item', ea, ia).targets || []).includes(ib);
};
// Bateaux (contrôle 4) : l'ESSENCE. Java : dans l'identifiant (`spruce_boat`, `bamboo_raft`) ; Bedrock :
// `Variant` 0 chêne … 9 chêne pâle — alias d'objet `boat/N` du Minecraft Wiki, recoupés sur J02 par un
// convertisseur indépendant (UMT : 0-4, 8, 9 identiques). `poplar` et Variant >= 10 : numéro non prouvé, non jugé.
const BOIS_BEDROCK = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'mangrove', 'bamboo', 'cherry', 'pale_oak'];
const boisJava = (d) => {
  const id = String(d.id ?? '');
  if (/^minecraft:(chest_)?boat$/.test(id)) return typeof d.Type === 'string' ? d.Type : INCONNU; // forme 1.20.4
  const m = /^minecraft:(.+?)_(chest_)?(boat|raft)$/.exec(id);
  return m ? m[1] : undefined;
};
const BATEAU = { k: 'Variant', j: boisJava, b: (d) => { const v = num(d.Variant); return v !== undefined && BOIS_BEDROCK[v] ? BOIS_BEDROCK[v] : INCONNU; } };
const BATEAUX_JAVA = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'mangrove', 'cherry', 'pale_oak', 'poplar']
  .flatMap((b) => [`minecraft:${b}_boat`, `minecraft:${b}_chest_boat`]).concat(['minecraft:bamboo_raft', 'minecraft:bamboo_chest_raft', 'minecraft:boat', 'minecraft:chest_boat']);
const ENTITY_RULES = [
  [['minecraft:tnt'], [{ k: 'fuse', j: (d) => num(d.fuse ?? d.Fuse), b: (d) => num(d.Fuse) }]],
  [['minecraft:falling_block'], [{ k: 'Time', j: (d) => num(d.Time), b: (d) => num(d.Time) }]],
  [['minecraft:item'], [
    { k: 'Age', j: (d) => num(d.Age ?? 0), b: (d) => num(d.Age ?? 0) },
    { k: 'Item', j: (d) => num(d.Item?.count ?? d.Item?.Count), b: (d) => num(d.Item?.Count) },
    // Contrôle 3 (09/11/2026, audit externe) : l'OBJET lui-même, pas seulement la quantité (3 diamants
    // devenus 3 terres passaient). Table d'identité des objets du script ; nom sans référence : non jugé.
    // Bedrock ancien : la variante est dans la valeur de donnée (`Damage`) ou dans un état ANCIEN du `Block` de la pile
    // (`stone_type: granite`, absent du registre 1.26.40) — le nom seul ne désigne pas l'objet (essai r113 du
    // 09/11/2026 : 91 faux écarts R01). Même critère que la table de gravité 1.11 (« bloc ancien ») : non jugé.
    { k: 'Item', j: (d) => objetConnu('java', d.Item?.id), b: (d) => (num(d.Item?.Damage) || blocAncien(d.Item?.Block) ? INCONNU : objetConnu('bedrock', d.Item?.Name)), eq: memeObjet },
  ]],
  [['minecraft:experience_orb', 'minecraft:xp_orb'], [
    { k: 'Value', j: (d) => num(d.Value), b: (d) => num(d['experience value'] ?? d.experience_value) },
    { k: 'Age', j: (d) => num(d.Age), b: (d) => num(d.Age) },
  ]],
  [['minecraft:zombie_villager', 'minecraft:zombie_villager_v2'], [
    { k: 'ConversionTime', j: (d) => (num(d.ConversionTime ?? -1) >= 0 ? 1 : 0), b: (d) => (defs(d).includes('+to_villager') ? 1 : 0) },
    { k: 'Xp', j: (d) => num(d.Xp), b: (d) => num(d.TradeExperience) },
  ]],
  [['minecraft:pillager', 'minecraft:vindicator'], [
    { k: 'PatrolLeader', j: (d) => (num(d.PatrolLeader) ? 1 : 0), b: (d) => (num(d.IsIllagerCaptain) || defs(d).includes('+minecraft:illager_squad_captain') ? 1 : 0) },
    // Bannière du capitaine : TÊTE Java ↔ PLASTRON Bedrock (Armor[1] ; capitaines natifs relevés,
    // table BDS `slot.armor.chest`). Ailleurs, Bedrock ne la dessine pas.
    { k: 'equipment', j: (d) => (/banner/.test(JSON.stringify(d.equipment?.head ?? (Array.isArray(d.ArmorItems) ? d.ArmorItems[3] : '') ?? '')) ? 1 : 0),
      b: (d) => (Array.isArray(d.Armor) && d.Armor[1]?.Name === 'minecraft:banner' ? 1 : 0) },
  ]],
  // Villageois (et zombie) : expérience d'échange et niveau.
  [['minecraft:villager', 'minecraft:villager_v2'], [
    { k: 'Xp', j: (d) => num(d.Xp), b: (d) => num(d.TradeExperience) },
    { k: 'VillagerData', j: (d) => num(d.VillagerData?.level), b: (d) => (num(d.TradeTier) === undefined ? undefined : num(d.TradeTier) + 1) },
  ]],
];
// ── Lot 2 (08/11/2026) : APPARENCE et ÉTAT des créatures, à l'aller. Ordres = constantes du jeu ;
// chaque ordre Bedrock est cohérent avec les mondes natifs relevés (R01, B02 : colliers rouges 14,
// moutons blancs 0, `Variant` du loup conforme à son groupe `wolf_<nom>`, slimes 1/2/4). Non jugés faute
// de forme Bedrock établie : variantes climatiques vache/cochon/poulet, gènes du panda, pose du porte-armure.
const sansNs = (x) => (x === undefined || x === null ? undefined : String(x).replace(/^minecraft:/, ''));
const plat = (x) => (x === undefined ? undefined : String(x).toLowerCase().replace(/[^a-z0-9]/g, ''));
const CHAT = ['white', 'black', 'red', 'siamese', 'british_shorthair', 'calico', 'persian', 'ragdoll', 'tabby', 'all_black', 'jellie'];
const LOUP = ['pale', 'ashen', 'black', 'chestnut', 'rusty', 'snowy', 'spotted', 'striped', 'woods'];
const GRENOUILLE = ['temperate', 'cold', 'warm'];
const METIER = ['none', 'farmer', 'fisherman', 'shepherd', 'fletcher', 'librarian', 'cartographer', 'cleric', 'armorer', 'weaponsmith', 'toolsmith', 'butcher', 'leatherworker', 'mason', 'nitwit'];
const BIOME_VILLAGEOIS = ['plains', 'desert', 'jungle', 'savanna', 'snow', 'swamp', 'taiga'];
const idx = (table) => (v) => (num(v) === undefined ? undefined : table[num(v)] ?? `bedrock#${v}`);
const bool = (v) => (v === undefined ? undefined : num(v) ? 1 : 0);
const COULEUR = { k: 'Color', j: (d) => num(d.Color), b: (d) => num(d.Color) };
const COLLIER = { k: 'CollarColor', j: (d) => (d.Owner !== undefined || d.owner !== undefined ? num(d.CollarColor ?? 14) : undefined), b: (d) => (num(d.IsTamed) ? num(d.Color) : undefined) };
const ASSIS = { k: 'Sitting', j: (d) => (d.Owner !== undefined || d.owner !== undefined ? bool(d.Sitting ?? 0) : undefined), b: (d) => (num(d.IsTamed) ? bool(d.Sitting ?? 0) : undefined) };
const SELLE = { k: 'Saddle', j: (d) => (d.equipment?.saddle ? 1 : bool(d.Saddle ?? 0)), b: (d) => bool(d.Saddled ?? 0) };
const COFFRE = { k: 'ChestedHorse', j: (d) => bool(d.ChestedHorse ?? 0), b: (d) => bool(d.Chested ?? 0) };
const VARIANTE = { k: 'Variant', j: (d) => num(d.Variant), b: (d) => num(d.Variant) };
// Côté Bedrock, la valeur que le JEU retient (correction A2, 09/11/2026) : le champ s'il est écrit, sinon le
// DERNIER groupe actif `+<nom>` de `definitions` qui la fixe (`minecraft:variant` / `mark_variant` des groupes,
// BDS 1.26.36.1 : axolotl, slime, magma_cube, frog, wolf, villager_v2). Ni champ ni groupe : INCONNU — la valeur
// que BDS relirait à la place n'est pas prouvée hors jeu ; la règle n'est pas jugée (ni perdue, ni conservée).
export const INCONNU = Symbol('valeur-bedrock-non-prouvee');
const groupesActifs = (d) => defs(d).map(String).filter((x) => x.startsWith('+') && x.length > 1).map((x) => x.slice(1).replace(/^minecraft:/, ''));
const parGroupe = (table, champ = 'Variant') => (d) => {
  const v = num(d[champ]); if (v !== undefined) return v;
  const g = groupesActifs(d).filter((x) => Object.hasOwn(table, x));
  return g.length ? table[g[g.length - 1]] : INCONNU;
};
const siConnu = (f) => (v) => (v === INCONNU ? INCONNU : f(v));
const nomme = (liste, suffixe = '', prefixe = '') => Object.fromEntries(liste.map((n, i) => [`${prefixe}${n}${suffixe}`, i]));
// Axolotl (correction A1) : Bedrock 0 lucy, 1 cyan, 2 gold, 3 wild, 4 blue (axolotl.json) ;
// Java 0 lucy, 1 wild, 2 gold, 3 cyan, 4 blue (Axolotl.Variant). Valeur Bedrock rendue en numéro Java.
const AXOLOTL_B = { axolotl_lucy: 0, axolotl_cyan: 1, axolotl_gold: 2, axolotl_wild: 3, axolotl_blue: 4 };
const AXOLOTL_B_EN_J = [0, 3, 2, 1, 4];
const AXOLOTL = { k: 'Variant', j: (d) => num(d.Variant), b: (d) => siConnu((v) => AXOLOTL_B_EN_J[v] ?? `bedrock#${v}`)(parGroupe(AXOLOTL_B)(d)) };
const TAILLE_B = { slime_large: 4, slime_medium: 2, slime_small: 1 };
const LOT2 = [
  [['minecraft:sheep'], [COULEUR, { k: 'Sheared', j: (d) => bool(d.Sheared ?? 0), b: (d) => bool(d.Sheared ?? 0) }]],
  [['minecraft:wolf'], [COLLIER, ASSIS, { k: 'variant', j: (d) => sansNs(d.variant), b: (d) => siConnu(idx(LOUP))(parGroupe(nomme(LOUP, '', 'wolf_'))(d)) }]],
  [['minecraft:cat'], [COLLIER, ASSIS, { k: 'variant', j: (d) => sansNs(d.variant), b: (d) => idx(CHAT)(d.Variant) }]],
  [['minecraft:parrot'], [ASSIS, VARIANTE]],
  [['minecraft:axolotl'], [AXOLOTL]],
  [['minecraft:llama', 'minecraft:trader_llama'], [VARIANTE, { k: 'Strength', j: (d) => num(d.Strength), b: (d) => num(d.Strength) }, COFFRE]],
  [['minecraft:horse'], [{ k: 'Variant', j: (d) => num(d.Variant), b: (d) => (num(d.Variant) === undefined ? undefined : num(d.Variant) + 256 * (num(d.MarkVariant) ?? 0)) }, SELLE]],
  [['minecraft:donkey', 'minecraft:mule'], [COFFRE, SELLE]],
  [['minecraft:camel', 'minecraft:skeleton_horse', 'minecraft:zombie_horse', 'minecraft:pig', 'minecraft:strider'], [SELLE]],
  [['minecraft:rabbit'], [{ k: 'RabbitType', j: (d) => (num(d.RabbitType) === 99 ? undefined : num(d.RabbitType)), b: (d) => num(d.Variant) }]],
  [['minecraft:mooshroom'], [{ k: 'Type', j: (d) => sansNs(d.Type), b: (d) => idx(['red', 'brown'])(d.Variant) }]],
  [['minecraft:fox'], [{ k: 'Type', j: (d) => sansNs(d.Type), b: (d) => idx(['red', 'snow'])(d.Variant) }]],
  [['minecraft:frog'], [{ k: 'variant', j: (d) => sansNs(d.variant), b: (d) => siConnu(idx(GRENOUILLE))(parGroupe(nomme(GRENOUILLE, '_frog'))(d)) }]],
  [['minecraft:slime', 'minecraft:magma_cube'], [{ k: 'Size', j: (d) => num(d.Size), b: (d) => siConnu((v) => v - 1)(parGroupe(TAILLE_B)(d)) }]],
  // Poisson tropical : Java = forme | motif<<8 | couleur<<16 | couleur du motif<<24.
  [['minecraft:tropical_fish', 'minecraft:tropicalfish'], [{ k: 'Variant', j: (d) => (num(d.Variant) === undefined ? undefined : num(d.Variant) >>> 0), b: (d) => (num(d.Variant) === undefined ? undefined : ((num(d.Variant) & 255) | ((num(d.MarkVariant) ?? 0) << 8) | ((num(d.Color) ?? 0) << 16) | ((num(d.Color2) ?? 0) << 24)) >>> 0) }]],
  [['minecraft:painting'], [{ k: 'variant', j: (d) => plat(sansNs(d.variant ?? d.Motive)), b: (d) => plat(d.Motif) }]],
];
// Villageois : métier et biome d'origine (le niveau est déjà jugé plus haut).
const METIER_REGLES = [
  // `Variant` = métier ; un groupe de métier de `definitions` qui le contredit (R01 : `+cartographer`
  // puis `+unskilled`, Variant 0) rend le métier ambigu : non jugé (vérification du 09/11/2026).
  { k: 'VillagerData', j: (d) => sansNs(d.VillagerData?.profession), b: (d) => { const v = siConnu(idx(METIER))(parGroupe({ ...nomme(METIER), unskilled: 0 })(d)); const g = defs(d).map((x) => String(x).replace(/^\+(minecraft:)?/, '')).filter((x) => METIER.includes(x) && x !== 'none'); return v !== INCONNU && g.length && !g.includes(v) ? INCONNU : v; } },
  { k: 'VillagerData', j: (d) => sansNs(d.VillagerData?.type), b: (d) => siConnu(idx(BIOME_VILLAGEOIS))(parGroupe(nomme(BIOME_VILLAGEOIS, '_villager'), 'MarkVariant')(d)) },
];
for (const [ids, regles] of LOT2) ENTITY_RULES.push([ids, regles]);
ENTITY_RULES.push([BATEAUX_JAVA, [BATEAU]]);
for (const [names, regles] of ENTITY_RULES) if (names.includes('minecraft:villager')) regles.push(...METIER_REGLES);
// Table des échanges FUTURS (révision 1.12) — Java → Bedrock seulement. Bedrock écrit `TradeTablePath`
// dès qu'un villageois a des offres (B02, R01 natifs : présent ssi `Offers`) ; c'est la table d'où
// viennent les échanges débloqués aux niveaux suivants. Chemins = `minecraft:economy_trade_table` des
// groupes de métier de villager_v2.json (BDS 1.26.36.1). Jugée par COHÉRENCE avec le métier que porte
// la sortie elle-même : un métier faux reste compté une seule fois (VillagerData). Table absente ou métier
// inconnu : non jugé.
const TABLE_METIER = { farmer: 'farmer', fisherman: 'fisherman', shepherd: 'shepherd', fletcher: 'fletcher', librarian: 'librarian', cartographer: 'cartographer', cleric: 'cleric', armorer: 'armorer', weaponsmith: 'weapon_smith', toolsmith: 'tool_smith', butcher: 'butcher', leatherworker: 'leather_worker', mason: 'stone_mason' };
for (const [names, regles] of ENTITY_RULES) if (names.includes('minecraft:villager')) regles.push({
  k: 'TradeTablePath', sens: 'java',
  j: (d) => (Array.isArray(d.Offers?.Recipes) && d.Offers.Recipes.length ? 'coherente' : undefined),
  b: (d) => {
    if (typeof d.TradeTablePath !== 'string' || !d.TradeTablePath) return INCONNU;
    const m = METIER_REGLES[0].b(d);
    if (m === INCONNU || m === undefined || !TABLE_METIER[m]) return INCONNU;
    return d.TradeTablePath === `trading/economy_trades/${TABLE_METIER[m]}_trades.json` ? 'coherente' : `incoherente:${d.TradeTablePath}`;
  },
});
// Villageois zombie (révision 1.12, audit 09/11/2026) : en Bedrock son métier est porté par ses GROUPES
// (zombie_villager_v2.json : farmer … nitwit, unskilled) ; `Variant` n'est pas fiable (R01 natif :
// `Variant` 0 avec `+cleric`, `+fisherman`, `+nitwit`, `+shepherd`). Métier lu dans les groupes seuls ;
// sans groupe, inconnu. Biome : comme le villageois (champ, sinon groupe `<biome>_villager`).
// Niveau et échanges d'un zombie Bedrock : aucun monde natif ne les porte (TradeTier 0, pas d'Offers) —
// non jugés.
const METIER_ZOMBIE = [
  { k: 'VillagerData', j: (d) => sansNs(d.VillagerData?.profession), b: (d) => { const g = groupesActifs(d).filter((x) => x === 'unskilled' || (METIER.includes(x) && x !== 'none')); return g.length ? (g[g.length - 1] === 'unskilled' ? 'none' : g[g.length - 1]) : INCONNU; } },
  METIER_REGLES[1],
];
for (const [names, regles] of ENTITY_RULES) if (names.includes('minecraft:zombie_villager')) regles.push(...METIER_ZOMBIE);

// Animaux : bébé (Age < 0 ↔ Age) et délai de reproduction (Age > 0 ↔ BreedCooldown), amoureux.
const NOT_AGEABLE = new Set(['minecraft:item', 'minecraft:experience_orb', 'minecraft:xp_orb', 'minecraft:tnt', 'minecraft:falling_block']);
const ANIMAL = [
  // Java n'écrit pas `Age` 0 (adulte prêt) : absent = 0.
  { k: 'Age', j: (d) => num(d.Age ?? 0), b: (d) => (num(d.Age) < 0 ? num(d.Age) : num(d.BreedCooldown ?? 0)) },
  { k: 'InLove', j: (d) => num(d.InLove ?? 0), b: (d) => num(d.InLove ?? 0) },
];
// Champs Java sans aucun équivalent Bedrock (moteur : ENTITY_JAVA_ONLY_KEYS) : ils ne peuvent
// être jugés qu'au retour ; listés à part, pas comme « non comparés ».
const JAVA_ONLY = new Set(['NoAI', 'Silent', 'NoGravity', 'Glowing', 'HasVisualFire', 'CanPickUpLoot', 'LeftHanded', 'FallFlying', 'AbsorptionAmount', 'ForcedAge', 'AgeLocked', 'sound_variant']);
// Effets actifs (contrôle 5, 09/11/2026) : NATURE, puissance et durée de chaque effet — avant, les seules
// durées triées (un poison devenu vitesse passait). Numéros Bedrock = ceux que le moteur écrit (preuve BDS,
// tools/reference/bedrock-effect-ids.v1.json). Effets sans équivalent dans l'autre édition (luck, glowing…,
// fatal_poison) mis à part ; un numéro Bedrock inconnu rend la règle non jugée.
const EFFETS = JSON.parse(fs.readFileSync(fileURLToPath(new URL('../reference/bedrock-effect-ids.v1.json', import.meta.url)), 'utf8'));
const EFFET_PAR_NUMERO = Object.fromEntries(Object.entries(EFFETS.ids).map(([n, i]) => [i, n]));
const SANS_EQUIVALENT = new Set([...EFFETS.bedrock_only, ...EFFETS.java_only]);
const effetsJava = (d) => {
  const l = d.active_effects ?? d.ActiveEffects;
  if (!Array.isArray(l)) return undefined;
  const out = [];
  for (const x of l) {
    if (typeof x?.id !== 'string') return INCONNU; // ancien format numérique : non normalisé
    const n = x.id.replace(/^minecraft:/, '');
    if (!SANS_EQUIVALENT.has(n)) out.push(`${n}:${num(x.amplifier ?? 0)}:${num(x.duration ?? 0)}`);
  }
  // Seulement des effets sans équivalent (ex. `glowing` d'un porte-armure J04) : rien à comparer.
  return out.length ? out.sort() : undefined;
};
const effetsBedrock = (d) => {
  if (!Array.isArray(d.ActiveEffects)) return undefined;
  const out = [];
  for (const x of d.ActiveEffects) {
    const b = EFFET_PAR_NUMERO[num(x?.Id)];
    if (!b) return INCONNU;
    const n = EFFETS.bedrock_to_java_name[b] ?? b;
    if (!SANS_EQUIVALENT.has(n) && !SANS_EQUIVALENT.has(b)) out.push(`${n}:${num(x.Amplifier ?? 0)}:${num(x.Duration ?? 0)}`);
  }
  return out.length ? out.sort() : undefined;
};
// Bébé / apprivoisé quand la source NE l'est PAS (contrôle 7) : l'état vrai est déjà jugé par les aspects
// `baby` / `tamed` ; ici, un adulte devenu bébé ou un animal sauvage devenu apprivoisé. Java : absent = faux
// (le jeu n'écrit `Age` < 0, `IsBaby`, `Owner`, `Tame` que pour l'état vrai). Bedrock : champ absent = non prouvé.
const vivant = (d) => d.Health !== undefined || Array.isArray(d.attributes) || Array.isArray(d.Attributes);
const BEBE = { k: 'IsBaby', siSource: (v) => v === 0,
  j: (d) => (!vivant(d) ? INCONNU : typeof d.id === 'string' && !JAVA_LIT_ISBABY.has(d.id) ? (num(d.Age) < 0 ? 1 : 0)
    : (num(d.Age) < 0 || num(d.IsBaby) ? 1 : 0)),
  b: (d) => (vivant(d) && d.IsBaby !== undefined ? bool(d.IsBaby) : INCONNU) };
const APPRIVOISE = { k: 'Tame', siSource: (v) => v === 0,
  j: (d) => (d.Owner !== undefined || d.owner !== undefined || num(d.Tame) === 1 ? 1 : 0),
  b: (d) => (d.IsTamed === undefined ? INCONNU : bool(d.IsTamed)) };
// Cheval squelette et cheval zombie exclus : Bedrock les déclare apprivoisés PAR DÉFINITION
// (`minecraft:is_tamed` dans les composants de base, skeleton_horse.json / zombie_horse.json, BDS 1.26.36.1) —
// un Java non apprivoisé ne peut pas s'y écrire autrement (vérifié le 09/11/2026 : WorldSwitch c26 J02).
const ESPECES_APPRIVOISABLES = new Set(['minecraft:wolf', 'minecraft:cat', 'minecraft:parrot', 'minecraft:nautilus', 'minecraft:zombie_nautilus',
  'minecraft:horse', 'minecraft:donkey', 'minecraft:mule', 'minecraft:llama', 'minecraft:trader_llama',
  'minecraft:camel', 'minecraft:camel_husk']);
const APPRIVOISES_PAR_DEFINITION = new Set(['minecraft:skeleton_horse', 'minecraft:zombie_horse']);
const COMMON_ENTITY = [
  { k: 'active_effects', j: effetsJava, b: effetsBedrock },
];

const find = (table, ids) => table.find(([names]) => ids.some((id) => names.includes(id)))?.[1];
const same = (a, b, tol) => {
  if (Array.isArray(a) || Array.isArray(b)) return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, i) => same(x, b[i], tol));
  if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) <= (tol || 0);
  return a === b;
};

/** Verdict of the cross-edition rules for one subject at the DIRECT level, or null (no rule). */
export function crossData(family, sourceEdition, expected, target, srcIds, motion, extra = []) {
  const table = family === 'entity' ? ENTITY_RULES : BLOCK_ENTITY_RULES;
  const S = plainOf(expected), T = plainOf(target);
  const ageable = family === 'entity' && !srcIds.some((id) => NOT_AGEABLE.has(id)) && (S.Age !== undefined || S.BreedCooldown !== undefined || S.InLove !== undefined);
  const rules = [...(find(table, srcIds) || []), ...(family === 'entity' ? COMMON_ENTITY : []), ...(ageable ? ANIMAL : []),
    ...(family === 'entity' && !srcIds.some((id) => NOT_AGEABLE.has(id)) ? [BEBE] : []),
    ...(family === 'entity' && srcIds.some((id) => ESPECES_APPRIVOISABLES.has(id)) && !srcIds.some((id) => APPRIVOISES_PAR_DEFINITION.has(id)) ? [APPRIVOISE] : [])];
  const javaSide = sourceEdition === 'java';
  const checks = [];
  const inconnus = [];
  for (const rule of rules) {
    if (rule.sens && rule.sens !== sourceEdition) continue;
    const sv = javaSide ? rule.j(S) : rule.b(S);
    if (sv === undefined || sv === INCONNU) continue;
    if (rule.siSource && !rule.siSource(sv)) continue;
    const tv = javaSide ? rule.b(T) : rule.j(T);
    if (tv === INCONNU) { inconnus.push(rule.k); continue; }
    checks.push({ k: rule.k, sv, tv, ok: tv !== undefined && (rule.eq ? rule.eq(sv, tv) : same(sv, tv, rule.tol)) });
  }
  // Relations calculées par l'appelant (montures et passagers, propriétaire) : mêmes champs { k, sv, tv, ok }.
  for (const c of extra) { if (c.inconnu) inconnus.push(c.k); else checks.push(c); }
  if (family === 'entity' && Array.isArray(motion?.source) && motion.source.length === 3) {
    const tv = motion.target;
    checks.push({ k: 'Motion', sv: motion.source, tv, ok: Array.isArray(tv) && same(motion.source, tv, 1e-4) });
  }
  if (!checks.length) return null;
  const bad = checks.filter((c) => !c.ok);
  const keys = [...new Set(bad.map((c) => c.k))].sort();
  const covered = new Set([...checks.map((c) => c.k), ...inconnus]);
  const srcKeys = Object.keys(expected?.data || {}).filter((k) => !covered.has(k));
  const javaOnly = javaSide ? srcKeys.filter((k) => JAVA_ONLY.has(k)).sort() : [];
  const notCompared = srcKeys.filter((k) => !javaOnly.includes(k)).sort();
  const ev = { compared: checks.length, not_compared: notCompared.slice(0, 40), not_compared_count: notCompared.length, ...(javaOnly.length ? { java_only: javaOnly } : {}),
    ...(inconnus.length ? { unproven_in_target: [...new Set(inconnus)].sort() } : {}) };
  const rule = `${family}.data.direct.cross-edition`;
  if (!bad.length) return r(PASS, rule, ev);
  return r(bad.length === checks.length ? FAIL : PARTIAL, rule, {
    ...ev, differing_keys: keys, differing_count: bad.length,
    lost: [...new Set(bad.filter((c) => c.tv === undefined).map((c) => c.k))],
    changed: [...new Set(bad.filter((c) => c.tv !== undefined).map((c) => c.k))],
    sample: Object.fromEntries(bad.slice(0, 4).map((c, i) => [`${c.k}#${i}`, [c.sv, c.tv ?? null]])),
  });
}
