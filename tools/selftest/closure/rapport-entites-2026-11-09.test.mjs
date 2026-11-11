// Audit externe du 09/11/2026 : 10 contrôles des entités (vie, échanges, objets au sol, bateaux, effets,
// montures, états faux, entités en trop, propriétaire, conditions d'échange).
import test from 'node:test';
import assert from 'node:assert/strict';
import { crossData } from '../../lib/cross-data.mjs';
import { evaluate, paireOffres, relationsAller, aspectsEchanges, vieMaxDe } from '../../families/entity.mjs';
import { evaluate as evalEnTrop, sujetsEntitesEnTrop } from '../../families/entity_extra.mjs';

const facts = (o, extra = {}) => ({ data: Object.fromEntries(Object.keys(o).map((k) => [k, JSON.stringify(o[k])])), sem: Object.fromEntries(Object.entries(o).map(([k, v]) => [k, JSON.stringify(v)])), ...extra });
const cd = (ed, s, t, ids, extra) => crossData('entity', ed, facts(s), facts(t), ids, null, extra);
const cles = (v) => [...(v?.evidence?.differing_keys || [])];

test('1 — flétrisseur : proportion de vie avec les maxima STOCKÉS, dans les deux sens', async () => {
  const ent = (ed, health, max) => ({ id: 'minecraft:wither', pos: [0, 64, 0], health, ...(ed === 'bedrock' ? { max_health: max } : {}), data: {}, sem: ed === 'bedrock' ? { Attributes: JSON.stringify([{ Name: 'minecraft:health', Current: health, Max: max }]) } : {}, equipment: [], inventory: [] });
  const run = async (srcEd, e, g) => {
    const subject = { id: 's', family: 'entity', locator: { dim: 'minecraft:overworld', pos: [0, 64, 0] }, expected: { ...e, targets: ['minecraft:wither'] }, aspects: { health: { direct: 'NEAR', roundtrip: 'NEAR' } } };
    const ctx = { sourceEdition: srcEd, direct: { edition: srcEd === 'java' ? 'bedrock' : 'java', world: {} }, roundtrip: null, _entityMatch: { direct: new Map([['s', { facts: g }]]) } };
    const r = await evaluate(subject, ctx);
    return r.health.direct.status;
  };
  // Bedrock plein à 600 (difficulté) → Java plein à 300 : même proportion (avant : 450 figé → FAIL).
  assert.equal(await run('bedrock', ent('bedrock', 600, 600), ent('java', 300)), 'PASS');
  assert.equal(await run('bedrock', ent('bedrock', 450, 450), ent('java', 300)), 'PASS');
  assert.equal(await run('bedrock', ent('bedrock', 300, 600), ent('java', 300)), 'FAIL');
  assert.equal(await run('java', ent('java', 150), ent('bedrock', 300, 600)), 'PASS');
  assert.equal(await run('java', ent('java', 150), ent('bedrock', 450, 450)), 'FAIL');
  assert.equal(vieMaxDe('java', { id: 'minecraft:wither', sem: {} }), 300);
});

test('2 — échanges réordonnés, second ingrédient de quantités différentes : bon appariement', () => {
  const j = (b, bb, s) => ({ buy: { id: 'minecraft:emerald', count: b }, buyB: { id: 'minecraft:book', count: bb }, sell: { id: 'minecraft:enchanted_book', count: s }, maxUses: bb });
  const be = (b, bb, s) => ({ buyA: { Name: 'minecraft:emerald', Count: b }, buyB: { Name: 'minecraft:book', Count: bb }, sell: { Name: 'minecraft:enchanted_book', Count: s }, maxUses: bb });
  const { pairs } = paireOffres('java', [j(5, 1, 1), j(5, 2, 1)], [be(5, 2, 1), be(5, 1, 1)]);
  assert.deepEqual(pairs.map((p) => [p.o.buyB.count, p.x.buyB.Count]), [[1, 1], [2, 2]]);
});

test('3 — objet au sol : l’objet est comparé, pas seulement la quantité', () => {
  const ids = ['minecraft:item'];
  assert.deepEqual(cles(cd('java', { Item: { id: 'minecraft:diamond', count: 3 } }, { Item: { Name: 'minecraft:dirt', Count: 3 } }, ids)), ['Item']);
  assert.equal(cd('java', { Item: { id: 'minecraft:diamond', count: 3 } }, { Item: { Name: 'minecraft:diamond', Count: 3 } }, ids).status, 'PASS');
  assert.deepEqual(cles(cd('bedrock', { Item: { Name: 'minecraft:diamond', Count: 3 } }, { Item: { id: 'minecraft:dirt', count: 3 } }, ids)), ['Item']);
  // Bedrock ancien : variante portée par Damage (pierre 1 = granite) — non jugée par le nom seul.
  assert.equal(cd('bedrock', { Item: { Name: 'minecraft:stone', Damage: 1, Count: 2 } }, { Item: { id: 'minecraft:granite', count: 2 } }, ids).status, 'PASS');
  assert.equal(cd('bedrock', { Item: { Name: 'minecraft:stone', Damage: 0, Count: 1, Block: { name: 'minecraft:stone', states: { stone_type: 'granite' } } } }, { Item: { id: 'minecraft:granite', count: 1 } }, ids).status, 'PASS'); // état ancien
});

test('4 — bateau : l’essence est comparée (poplar et Variant >= 10 non jugés)', () => {
  const ids = (j) => [j, 'minecraft:boat'];
  assert.equal(cd('java', { id: 'minecraft:spruce_boat' }, { Variant: 1 }, ids('minecraft:spruce_boat')).status, 'PASS');
  assert.deepEqual(cles(cd('java', { id: 'minecraft:dark_oak_boat' }, { Variant: 0 }, ids('minecraft:dark_oak_boat'))), ['Variant']);
  assert.equal(cd('java', { id: 'minecraft:bamboo_raft' }, { Variant: 7 }, ids('minecraft:bamboo_raft')).status, 'PASS');
  assert.deepEqual(cles(cd('java', { id: 'minecraft:poplar_boat' }, { Variant: 0 }, ids('minecraft:poplar_boat'))), ['Variant']);
  assert.equal(cd('java', { id: 'minecraft:poplar_boat' }, { Variant: 10 }, ids('minecraft:poplar_boat')), null);
  assert.equal(crossData('entity', 'bedrock', facts({ Variant: 2 }), facts({ id: 'minecraft:birch_boat' }), ['minecraft:boat', 'minecraft:oak_boat']).status, 'PASS');
  assert.deepEqual(cles(crossData('entity', 'bedrock', facts({ Variant: 2 }), facts({ id: 'minecraft:oak_boat' }), ['minecraft:boat'])), ['Variant']);
});

test('5 — effets : nature, puissance et durée (numéros mesurés sur BDS)', () => {
  const ids = ['minecraft:zombie'];
  const jE = (id, amplifier, duration) => ({ active_effects: [{ id, amplifier, duration }] });
  const bE = (Id, Amplifier, Duration) => ({ ActiveEffects: [{ Id, Amplifier, Duration }] });
  assert.deepEqual(cles(cd('java', jE('minecraft:poison', 0, 200), bE(1, 0, 200), ids)), ['active_effects']); // poison → vitesse
  assert.equal(cd('java', jE('minecraft:poison', 1, 200), bE(19, 1, 200), ids).status, 'PASS');
  assert.deepEqual(cles(cd('java', jE('minecraft:poison', 1, 200), bE(19, 0, 200), ids)), ['active_effects']); // puissance
  assert.equal(cd('java', jE('minecraft:conduit_power', 0, 100), bE(26, 0, 100), ids).status, 'PASS');
  assert.equal(cd('java', jE('minecraft:slow_falling', 0, 100), bE(27, 0, 100), ids).status, 'PASS');
  assert.equal(cd('bedrock', bE(29, 0, 50), jE('minecraft:hero_of_the_village', 0, 50), ids).status, 'PASS');
  // Seulement des effets sans équivalent (luck, glowing) : rien à comparer, même si la sortie n'a aucun effet.
  assert.equal(cd('java', { active_effects: [{ id: 'minecraft:luck', amplifier: 0, duration: 9 }] }, {}, ids), null);
  assert.deepEqual(cles(cd('java', jE('minecraft:poison', 0, 200), {}, ids)), ['active_effects']); // effet perdu
  assert.equal(cd('java', jE('minecraft:speed', 0, 1), bE(99, 0, 1), ids), null); // numéro inconnu : non jugé
});

test('6 — montures et passagers (aller), et passagers Bedrock au retour', () => {
  const rel = (srcMontures, dstMontures) => ({ hote: {}, montures: { source: srcMontures, direct: dstMontures } });
  // Java : cochon avec un zombie → Bedrock : cochon lié à un zombie.
  const e = facts({ Passengers: [{ id: 'minecraft:zombie' }] }, { id: 'minecraft:pig' });
  const ok = relationsAller('java', 'bedrock', e, { uuid: '7' }, rel(null, new Map([['7', ['minecraft:zombie']]])));
  assert.deepEqual(ok.map((c) => [c.k, c.ok]), [['Passengers', true]]);
  const perdu = relationsAller('java', 'bedrock', e, { uuid: '7' }, rel(null, new Map()));
  assert.deepEqual(perdu.map((c) => [c.k, c.ok]), [['Passengers', false]]);
  // Bedrock : passager ajouté dans la sortie Java.
  const ajout = relationsAller('bedrock', 'java', { uuid: '5' }, facts({ Passengers: [{ id: 'minecraft:skeleton' }] }), rel(new Map(), null));
  assert.deepEqual(ajout.map((c) => [c.k, c.ok]), [['Passengers', false]]);
  // Aucune monture des deux côtés : rien à juger.
  assert.deepEqual(relationsAller('java', 'bedrock', facts({}), { uuid: '1' }, rel(null, new Map())), []);
});

test('7 — adulte non apprivoisé devenu bébé apprivoisé : détecté', () => {
  const v = cd('java', { Health: 8 }, { IsBaby: 1, IsTamed: 1, Attributes: [{ Name: 'minecraft:health', Current: 8, Max: 8 }] }, ['minecraft:wolf']);
  assert.deepEqual(cles(v), ['IsBaby', 'Tame']);
  assert.equal(cd('java', { Health: 8 }, { IsBaby: 0, IsTamed: 0, Attributes: [] }, ['minecraft:wolf']).status, 'PASS');
  // Source bébé / apprivoisée : jugé par les aspects baby / tamed, pas ici (pas de double compte).
  assert.deepEqual(cles(cd('java', { Health: 8, Age: -100, Owner: [1, 2, 3, 4] }, { IsBaby: 0, IsTamed: 0, Attributes: [] }, ['minecraft:wolf'])).filter((k) => k === 'IsBaby' || k === 'Tame'), []);
  // Bedrock sans IsBaby écrit : non prouvé, non jugé.
  assert.ok(cd('java', { Health: 8 }, { Attributes: [] }, ['minecraft:zombie']) === null || !cles(cd('java', { Health: 8 }, { Attributes: [] }, ['minecraft:zombie'])).includes('IsBaby'));
});

test('8 — entités présentes seulement dans la sortie', async () => {
  const dim = 'minecraft:overworld';
  const [subject] = sujetsEntitesEnTrop('T@1', []).filter((s) => s.locator.dim === dim);
  const source = [{ id: 'a', locator: { dim, pos: [0, 64, 0] } }];
  const apparie = { dim, origin: 'actorprefix', facts: { id: 'minecraft:cow', pos: [0, 64, 0] } };
  const voisin = { dim, origin: 'actorprefix', facts: { id: 'minecraft:pig', pos: [1, 64, 0] } }; // type changé : jugé ailleurs
  const loin = { dim, origin: 'actorprefix', facts: { id: 'minecraft:zombie', pos: [50, 64, 50] } };
  const cadre = { dim, origin: 'actorprefix', facts: { id: 'minecraft:item_frame', pos: [90, 64, 90] } };
  const ctx = (ents, srcEd = 'java') => ({ sourceEdition: srcEd, _entitySubjects: source, _entityMatch: { direct: new Map([['a', apparie]]) }, direct: { edition: srcEd === 'java' ? 'bedrock' : 'java', world: {}, entitiesIndex: async () => ents }, roundtrip: null });
  const st = async (ents, ed) => (await evalEnTrop(subject, ctx(ents, ed))).extra.direct;
  assert.equal((await st([apparie, voisin])).status, 'PASS');
  const v = await st([apparie, voisin, loin]);
  assert.equal(v.status, 'FAIL');
  assert.deepEqual(v.evidence.by_type, { 'minecraft:zombie': 1 });
  assert.equal((await st([apparie, cadre], 'bedrock')).status, 'PASS');
  assert.equal((await st([apparie, cadre], 'java')).status, 'FAIL');
  // Entité source sans cible (déplacée hors du rayon) : déjà perdue pour `entity`, pas comptée en trop.
  const deplace = [...source, { id: 'b', locator: { dim, pos: [5, 64, 5] }, expected: { id: 'minecraft:painting', targets: ['minecraft:painting'] } }];
  const tableau = { dim, origin: 'actorprefix', facts: { id: 'minecraft:painting', pos: [5, 90, 5] } };
  const c2 = { ...ctx([apparie, tableau]), _entitySubjects: deplace };
  assert.equal((await evalEnTrop(subject, c2)).extra.direct.status, 'PASS');
  // Cheval squelette : apprivoisé par définition en Bedrock, la règle « sauvage → apprivoisé » ne s'applique pas.
  assert.equal(cles(crossData('entity', 'java', facts({ Health: 15 }), facts({ IsTamed: 1, IsBaby: 0, Attributes: [] }), ['minecraft:skeleton_horse'])).includes('Tame'), false);
});

test('9 — propriétaire : l’animal du joueur hôte reste à l’hôte', () => {
  const own = [1, 2, 3, 4];
  const hex = own.map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('');
  const rel = (dstHote) => ({ hote: { source: hex, direct: dstHote }, montures: { direct: new Map() } });
  const loup = (o) => facts(o, { id: 'minecraft:wolf', tamed: true, targets: ['minecraft:wolf'] });
  const e = loup({ Owner: own });
  assert.deepEqual(relationsAller('java', 'bedrock', e, facts({ OwnerNew: '-42' }, { uuid: '9' }), rel('-42')).map((c) => [c.k, c.ok]), [['Owner', true]]);
  assert.deepEqual(relationsAller('java', 'bedrock', e, facts({ OwnerNew: '-7' }, { uuid: '9' }), rel('-42')).map((c) => [c.k, c.ok]), [['Owner', false]]);
  // Propriétaire qui n'est pas l'hôte : identité non appariable, non jugé.
  assert.deepEqual(relationsAller('java', 'bedrock', loup({ Owner: [9, 9, 9, 9] }), facts({ OwnerNew: '-7' }, { uuid: '9' }), rel('-42')), []);
  // Objet au sol / allay : `OwnerNew` = lanceur / joueur suivi, pas un propriétaire d'animal (essai r113 R01).
  const relB = { hote: { source: '-42', direct: hex }, montures: { source: new Map() } };
  assert.deepEqual(relationsAller('bedrock', 'java', facts({ OwnerNew: '-42' }, { id: 'minecraft:item', uuid: '5', targets: ['minecraft:item'] }), facts({}), relB), []);
  assert.deepEqual(relationsAller('bedrock', 'java', facts({ OwnerNew: '-42' }, { id: 'minecraft:allay', uuid: '6', targets: ['minecraft:allay'] }), facts({}), relB), []);
  assert.deepEqual(relationsAller('bedrock', 'java', facts({ OwnerNew: '-42' }, { id: 'minecraft:wolf', tamed: true, uuid: '7', targets: ['minecraft:wolf'] }), facts({ Owner: own }), relB).map((c) => [c.k, c.ok]), [['Owner', true]]);
});

test('10 — conditions d’échange : une par aspect, la non stockée reste non jugée', async () => {
  const offres = { Recipes: [{ buy: { id: 'minecraft:coal', count: 15 }, sell: { id: 'minecraft:emerald', count: 1 }, maxUses: 16, xp: 2 }] };
  const a = aspectsEchanges('java', { Offers: JSON.stringify(offres) }, 'EQUIV_OFFERS');
  assert.deepEqual(Object.keys(a).sort(), ['trade_max_uses', 'trade_reward_xp', 'trade_uses', 'trade_xp']);
  const e = { id: 'minecraft:villager', sem: { Offers: JSON.stringify(offres) }, data: {}, equipment: [], inventory: [] };
  const g = { id: 'minecraft:villager', sem: { Offers: JSON.stringify({ Recipes: [{ buyA: { Name: 'minecraft:coal', Count: 15 }, sell: { Name: 'minecraft:emerald', Count: 1 }, maxUses: 16, uses: 0 }] }) }, data: {} };
  const subject = { id: 's', family: 'entity', locator: { dim: 'minecraft:overworld', pos: [0, 64, 0] }, expected: { ...e, targets: ['minecraft:villager_v2'] }, aspects: a };
  const r = await evaluate(subject, { sourceEdition: 'java', direct: { edition: 'bedrock', world: {} }, roundtrip: null, _entityMatch: { direct: new Map([['s', { facts: g }]]) } });
  assert.equal(r.trade_max_uses.direct.status, 'PASS');
  assert.equal(r.trade_xp.direct.evaluated, false);
  assert.equal(r.trade_reward_xp.direct.evaluated, false);
});
