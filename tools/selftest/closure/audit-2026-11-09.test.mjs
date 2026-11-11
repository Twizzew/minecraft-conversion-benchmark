// Corrections A1-A3 de l'audit du 09/11/2026 (05-rapports/AUDIT-SCRIPTS-VERIFICATION-2026-11-09.md).
import test from 'node:test';
import assert from 'node:assert/strict';
import { crossData } from '../../lib/cross-data.mjs';
import { match } from '../../families/entity.mjs';

const facts = (o) => ({ data: Object.fromEntries(Object.keys(o).map((k) => [k, JSON.stringify(o[k])])), sem: Object.fromEntries(Object.entries(o).map(([k, v]) => [k, JSON.stringify(v)])) });
const st = (...a) => crossData(...a)?.status;

test('A1: axolotl — Bedrock 1 cyan / 3 wild ↔ Java 1 wild / 3 cyan (BDS axolotl.json)', () => {
  const ax = ['minecraft:axolotl'];
  // Java wild (1) → Bedrock wild (3) : juste ; recopie brute 1 → 1 (= cyan en Bedrock) : fausse.
  assert.equal(st('entity', 'java', facts({ Variant: 1 }), facts({ Variant: 3 }), ax), 'PASS');
  assert.equal(st('entity', 'java', facts({ Variant: 1 }), facts({ Variant: 1 }), ax), 'FAIL');
  assert.equal(st('entity', 'java', facts({ Variant: 3 }), facts({ Variant: 1 }), ax), 'PASS');
  assert.equal(st('entity', 'java', facts({ Variant: 2 }), facts({ Variant: 2 }), ax), 'PASS');
  // Bedrock → Java, et variante lue dans le groupe quand `Variant` manque.
  assert.equal(st('entity', 'bedrock', facts({ Variant: 1 }), facts({ Variant: 3 }), ax), 'PASS');
  assert.equal(st('entity', 'java', facts({ Variant: 1 }), facts({ definitions: ['+minecraft:axolotl', '+axolotl_wild'] }), ax), 'PASS');
});

test('A2: Bedrock read as the game reads it — groups, then game default', () => {
  // Slime UMT : `Size` + groupe, sans `Variant`.
  assert.equal(st('entity', 'java', facts({ Size: 3 }), facts({ Size: 4, definitions: ['+minecraft:slime', '+minecraft:slime_large'] }), ['minecraft:slime']), 'PASS');
  assert.equal(st('entity', 'java', facts({ Size: 0 }), facts({ definitions: ['+minecraft:slime_small'] }), ['minecraft:magma_cube']), 'PASS');
  assert.equal(st('entity', 'java', facts({ Size: 3 }), facts({ definitions: ['+minecraft:slime_small'] }), ['minecraft:slime']), 'FAIL');
  // Ni champ ni groupe : valeur que BDS relirait non prouvée → règle non jugée (aucune autre règle → null).
  assert.equal(crossData('entity', 'java', facts({ Size: 3 }), facts({}), ['minecraft:slime']), null);
  // Le champ écrit l'emporte sur le groupe.
  assert.equal(st('entity', 'java', facts({ Size: 1 }), facts({ Variant: 2, definitions: ['+minecraft:slime_large'] }), ['minecraft:slime']), 'PASS');
  // Grenouille, loup : groupe.
  assert.equal(st('entity', 'java', facts({ variant: 'minecraft:warm' }), facts({ definitions: ['+warm_frog'] }), ['minecraft:frog']), 'PASS');
  assert.equal(st('entity', 'java', facts({ variant: 'minecraft:woods' }), facts({ definitions: ['+minecraft:wolf_woods'] }), ['minecraft:wolf']), 'PASS');
  // Villageois : métier et biome lus dans les groupes ; sans champ ni groupe, non jugés (seul le niveau l'est).
  const fermier = facts({ VillagerData: { profession: 'minecraft:farmer', type: 'minecraft:snow', level: 1 } });
  assert.equal(st('entity', 'java', fermier, facts({ TradeTier: 0, definitions: ['+farmer', '+snow_villager'] }), ['minecraft:villager']), 'PASS');
  const muet = crossData('entity', 'java', fermier, facts({ TradeTier: 0 }), ['minecraft:villager']);
  assert.equal(muet.status, 'PASS');
  assert.equal(muet.evidence.compared, 1);
  assert.deepEqual(muet.evidence.unproven_in_target, ['VillagerData']);
  assert.equal(st('entity', 'java', fermier, facts({ TradeTier: 0, Variant: 5, MarkVariant: 4 }), ['minecraft:villager']), 'PARTIAL');
  // Métier ambigu (groupe ≠ Variant) dans la SORTIE : non jugé, pas compté perdu (comportement promis par le commentaire).
  const ambigu = crossData('entity', 'java', fermier, facts({ TradeTier: 0, Variant: 0, MarkVariant: 4, definitions: ['+cartographer'] }), ['minecraft:villager']);
  assert.equal(ambigu.status, 'PASS');
  assert.deepEqual(ambigu.evidence.unproven_in_target, ['VillagerData']);
});

test('A3: co-located creatures paired by state, not by write order', () => {
  const pos = [173.5, 65, 1.4];
  const sujet = (id, Variant) => ({ id, locator: { dim: 0, pos }, expected: { id: 'minecraft:horse', targets: ['minecraft:horse'], ...facts({ Variant }) } });
  const cible = (Variant) => ({ dim: 0, facts: { id: 'minecraft:horse', pos, ...facts({ Variant }) } });
  // Sortie écrite dans l'ordre inverse : 001007 (1030) doit aller vers la cible 1030 (index 1).
  const m = match([sujet('001007', 1030), sujet('001008', 6)], [cible(6), cible(1030)], 'direct', 'java');
  assert.equal(m.get('001007').facts.sem.Variant, '1030');
  assert.equal(m.get('001008').facts.sem.Variant, '6');
  // Hors égalité de distance, la plus proche reste retenue même si son état diffère.
  const loin = { dim: 0, facts: { id: 'minecraft:horse', pos: [174.5, 65, 1.4], ...facts({ Variant: 1030 }) } };
  const m2 = match([sujet('001007', 1030)], [cible(6), loin], 'direct', 'java');
  assert.equal(m2.get('001007').facts.sem.Variant, '6');
});

test('N1: Java player fields absent = what the game reads (jar 26.3: max health, food 20, XP 0)', async () => {
  const nbt = (await import('prismarine-nbt')).default;
  const { javaPlayerFacts } = await import('../../families/player.mjs');
  const nu = javaPlayerFacts(nbt.comp({ Pos: nbt.list(nbt.double([1, 64, 2])) }), 'x');
  assert.deepEqual([nu.health, nu.food, nu.xp_level], [20, 20, 0]);
  const ecrit = javaPlayerFacts(nbt.comp({ Health: nbt.float(14.5), foodLevel: nbt.int(14), XpLevel: nbt.int(18) }), 'x');
  assert.deepEqual([ecrit.health, ecrit.food, ecrit.xp_level], [14.5, 14, 18]);
  const modifie = javaPlayerFacts(nbt.comp({ attributes: nbt.list(nbt.comp([{ id: nbt.string('minecraft:max_health'), base: nbt.double(20), modifiers: nbt.list(nbt.comp([{ id: nbt.string('x'), amount: nbt.double(4), operation: nbt.string('add_value') }])) }])) }), 'x');
  assert.equal(modifie.health, undefined);
});

test('N3: lost zone of a structure without spawn rules is counted, marked secondary', async () => {
  const { secondaire } = await import('../../families/structure.mjs');
  const echec = { evaluated: true, status: 'FAIL', rule: 'r', evidence: { observed: 'not-covered' } };
  assert.equal(secondaire('minecraft:trail_ruins', echec).evidence.minor_only, true);
  assert.equal(secondaire('minecraft:trail_ruins', echec).status, 'FAIL');
  assert.equal(secondaire('minecraft:trial_chambers', echec).evidence.minor_only, undefined);
  assert.equal(secondaire('minecraft:igloo', { evaluated: true, status: 'PASS', rule: 'r' }).evidence, undefined);
});

test('r112: trade state and details judged on matched offers only, Java defaults from the codec', async () => {
  const { paireOffres, aspectsEchanges } = await import('../../families/entity.mjs');
  const jOffre = (o) => ({ buy: { id: 'minecraft:emerald', count: 5 }, sell: { id: 'minecraft:enchanted_book', count: 1, components: { 'minecraft:stored_enchantments': { 'minecraft:mending': 1 } } }, ...o });
  const bOffre = (o) => ({ buyA: { Name: 'minecraft:emerald', Count: 5 }, buyB: { Name: '', Count: 0 }, sell: { Name: 'minecraft:enchanted_book', Count: 1, tag: { ench: [{ id: 26, lvl: 1 }] } }, ...o });
  const semJ = { Offers: JSON.stringify({ Recipes: [jOffre({ uses: 3, maxUses: 12, xp: 10 })] }) };
  // Aspects ajoutés seulement s'il y a des offres ; le détail seulement si un objet en porte.
  // r113 (09/11/2026) : `trade_terms` découpé en trois conditions jugées chacune pour son compte.
  assert.deepEqual(Object.keys(aspectsEchanges('java', semJ, 'EQUIV_OFFERS')).sort(), ['trade_details', 'trade_max_uses', 'trade_reward_xp', 'trade_uses', 'trade_xp']);
  assert.deepEqual(aspectsEchanges('java', { Offers: JSON.stringify({ Recipes: [{ buy: { id: 'minecraft:coal', count: 15 }, sell: { id: 'minecraft:emerald', count: 1 } }] }) }, 'EQUIV_OFFERS').trade_details, undefined);
  assert.deepEqual(aspectsEchanges('java', semJ, 'NE:x').trade_uses.direct, 'NE:x');
  // Appariement par objets, préférence aux mêmes quantités ; une offre absente n'est pas appariée.
  const { pairs } = paireOffres('java', JSON.parse(semJ.Offers).Recipes, [bOffre({ uses: 3 })], undefined);
  assert.equal(pairs.length, 1);
  assert.equal(paireOffres('java', JSON.parse(semJ.Offers).Recipes, [], undefined).pairs.length, 0);
  // Bedrock source : offres de palier verrouillé non attendues.
  assert.equal(paireOffres('bedrock', [bOffre({ tier: 0 }), bOffre({ tier: 3 })], [jOffre({})], 1).want.length, 1);
});

test('r112: zombie villager profession read from Bedrock groups only', () => {
  const zj = facts({ VillagerData: { profession: 'minecraft:cleric', type: 'minecraft:plains', level: 2 } });
  const zv = ['minecraft:zombie_villager'];
  assert.equal(st('entity', 'java', zj, facts({ Variant: 7, MarkVariant: 0, definitions: ['+minecraft:zombie_villager_v2', '+cleric'] }), zv), 'PASS');
  // Variant périmé (R01 natif : 0 avec +cleric) : le groupe fait foi.
  assert.equal(st('entity', 'java', zj, facts({ Variant: 0, MarkVariant: 0, definitions: ['+cleric'] }), zv), 'PASS');
  assert.equal(st('entity', 'java', zj, facts({ Variant: 7, MarkVariant: 0, definitions: ['+farmer'] }), zv), 'PARTIAL'); // métier faux, biome juste
  // Sans groupe de métier : inconnu, non jugé.
  const sans = crossData('entity', 'java', zj, facts({ Variant: 7, MarkVariant: 0 }), zv);
  assert.ok(sans === null || sans.evidence.unproven_in_target?.includes('VillagerData'));
});

test('r112: Bedrock trade table judged by coherence with the output profession (J→B only)', () => {
  const src = facts({ VillagerData: { profession: 'minecraft:librarian', type: 'minecraft:plains', level: 1 }, Offers: { Recipes: [{ buy: { id: 'minecraft:paper', count: 24 }, sell: { id: 'minecraft:emerald', count: 1 } }] } });
  const lib = (ttp) => facts({ TradeTier: 0, Variant: 5, MarkVariant: 0, ...(ttp ? { TradeTablePath: ttp } : {}) });
  const v = ['minecraft:villager'];
  assert.equal(st('entity', 'java', src, lib('trading/economy_trades/librarian_trades.json'), v), 'PASS');
  const faux = crossData('entity', 'java', src, lib('trading/economy_trades/farmer_trades.json'), v);
  assert.deepEqual(faux.evidence.differing_keys, ['TradeTablePath']);
  assert.deepEqual(crossData('entity', 'java', src, lib(null), v).evidence.unproven_in_target, ['TradeTablePath']);
  // Métier faux ET table cohérente avec ce métier faux : une seule perte (VillagerData).
  const autre = crossData('entity', 'java', src, facts({ TradeTier: 0, Variant: 1, MarkVariant: 0, TradeTablePath: 'trading/economy_trades/farmer_trades.json' }), v);
  assert.deepEqual(autre.evidence.differing_keys, ['VillagerData']);
  // Bedrock → Java : règle non appliquée.
  assert.equal(crossData('entity', 'bedrock', lib('trading/economy_trades/farmer_trades.json'), src, ['minecraft:villager_v2'])?.evidence?.differing_keys?.includes('TradeTablePath') ?? false, false);
});

test('R1: Java creature health read as the game does (attributes, then Health clamped to max)', async () => {
  const nbt = (await import('prismarine-nbt')).default;
  const { javaEntity } = await import('../../lib/facts.mjs');
  const poule = (o) => javaEntity(nbt.comp({ id: nbt.string('minecraft:chicken'), Pos: nbt.list(nbt.double([0, 64, 0])), ...o }));
  assert.equal(poule({ Health: nbt.float(20) }).health, 4); // UMT : 20 sans attribut → 4 en jeu
  assert.equal(poule({ Health: nbt.float(3) }).health, 3);
  assert.equal(poule({}).health, 4); // absent : santé max
  assert.equal(poule({ Health: nbt.float(20), attributes: nbt.list(nbt.comp([{ id: nbt.string('minecraft:max_health'), base: nbt.double(30) }])) }).health, 20);
  // Attribut modifié : borne inconnue, valeur brute.
  assert.equal(poule({ Health: nbt.float(20), attributes: nbt.list(nbt.comp([{ id: nbt.string('minecraft:max_health'), base: nbt.double(4), modifiers: nbt.list(nbt.comp([{ id: nbt.string('x'), amount: nbt.double(16), operation: nbt.string('add_value') }])) }])) }).health, 20);
  // Pas une créature vivante : pas de santé.
  assert.equal(javaEntity(nbt.comp({ id: nbt.string('minecraft:item'), Pos: nbt.list(nbt.double([0, 64, 0])) })).health, undefined);
});
