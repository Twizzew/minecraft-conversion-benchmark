// Rapport 2 « Blocs » du 09/11/2026 : A1 (lianes tête/corps), A2 (dérivé + clé non résolue),
// A3 (défauts Bedrock des deux côtés), B1 (cadre apparié dans une autre dimension).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Registre Java synthétique (propriétés réelles de 26.3 pour ces blocs) : le rapport Mojang n'est pas dans le dépôt.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-blocs-'));
const st0 = (properties) => ({ properties, states: [{ default: true, properties: Object.fromEntries(Object.entries(properties).map(([k, v]) => [k, v[0]])) }] });
const age = (n) => Array.from({ length: n + 1 }, (_, i) => String(i));
fs.writeFileSync(path.join(dir, 'blocks.json'), JSON.stringify({
  'minecraft:cave_vines': st0({ age: age(25), berries: ['false', 'true'] }), 'minecraft:cave_vines_plant': st0({ berries: ['false', 'true'] }),
  'minecraft:kelp': st0({ age: age(25) }), 'minecraft:kelp_plant': st0({}),
  'minecraft:weeping_vines': st0({ age: age(25) }), 'minecraft:weeping_vines_plant': st0({}),
  'minecraft:twisting_vines': st0({ age: age(25) }), 'minecraft:twisting_vines_plant': st0({}),
}));
fs.writeFileSync(path.join(dir, 'registries.json'), JSON.stringify({ 'minecraft:item': { entries: {} }, 'minecraft:entity_type': { entries: {} }, 'minecraft:block_entity_type': { entries: {} } }));
process.env.MCCB_JAVA_REPORTS = dir;
const { evaluate } = await import('../../families/block.mjs');

const OW = 'minecraft:overworld';
const loc = { dim: OW, pos: [1, 64, 2] };
const javaWorld = (name, props) => ({ blockAt: async () => ({ name, props }) });
const bedWorld = (name, states) => ({ blockAt: () => ({ name, states }) });
const st = (o) => (o.evaluated === false ? 'NOT_EVALUATED' : o.status);
const rtSt = async (...a) => {
  const [src, expected, world] = a;
  const res = await evaluate({ family: 'block', locator: loc, expected, aspects: { identity: { direct: 'NE:x', roundtrip: 'EQUAL' }, state: { direct: 'NE:x', roundtrip: 'EQUAL_OR_DERIVED' } } },
    { sourceEdition: src, direct: { world: null }, roundtrip: { edition: src, world } });
  return { identity: st(res.identity.roundtrip), state: st(res.state.roundtrip) };
};

test('A1: lianes tête/corps — berries comparé, age recalculé', async () => {
  const src = { name: 'minecraft:cave_vines_plant', props: { berries: 'true' } };
  assert.deepEqual(await rtSt('java', src, javaWorld('minecraft:cave_vines', { age: '0', berries: 'false' })), { identity: 'ADAPTED', state: 'FAIL' });
  assert.deepEqual(await rtSt('java', { name: 'minecraft:cave_vines_plant', props: { berries: 'false' } }, javaWorld('minecraft:cave_vines', { age: '0', berries: 'true' })), { identity: 'ADAPTED', state: 'FAIL' });
  assert.deepEqual(await rtSt('java', src, javaWorld('minecraft:cave_vines', { age: '7', berries: 'true' })), { identity: 'ADAPTED', state: 'ADAPTED' });
  assert.deepEqual(await rtSt('java', { name: 'minecraft:cave_vines', props: { age: '12', berries: 'true' } }, javaWorld('minecraft:cave_vines_plant', { berries: 'true' })), { identity: 'ADAPTED', state: 'ADAPTED' });
  for (const [body, head] of [['kelp_plant', 'kelp'], ['weeping_vines_plant', 'weeping_vines'], ['twisting_vines_plant', 'twisting_vines']]) {
    assert.deepEqual(await rtSt('java', { name: `minecraft:${head}`, props: { age: '5' } }, javaWorld(`minecraft:${body}`, {})), { identity: 'ADAPTED', state: 'ADAPTED' }, head);
  }
});

test('A2: état dérivé + clé non résolue — pas ADAPTED', async () => {
  const leaves = (s) => ({ name: 'minecraft:oak_leaves', states: s });
  const src = leaves({ update_bit: 0, persistent_bit: 1 });
  assert.equal((await rtSt('bedrock', src, bedWorld('minecraft:oak_leaves', { update_bit: 1, persistent_bit: 1 }))).state, 'ADAPTED');
  assert.equal((await rtSt('bedrock', src, bedWorld('minecraft:oak_leaves', { update_bit: 1 }))).state, 'NOT_EVALUATED');
  assert.equal((await rtSt('bedrock', src, bedWorld('minecraft:oak_leaves', { update_bit: 1, persistent_bit: 0 }))).state, 'FAIL');
  assert.equal((await rtSt('bedrock', src, bedWorld('minecraft:oak_leaves', { update_bit: 0, persistent_bit: 1 }))).state, 'PASS');
  // Valeur connue différente + clé absente : FAIL (la différence prouvée suffit).
  assert.equal((await rtSt('bedrock', leaves({ update_bit: 0, persistent_bit: 1, x: 1 }), bedWorld('minecraft:oak_leaves', { update_bit: 0, persistent_bit: 0 }))).state, 'FAIL');
});

test('A3: défauts Bedrock appliqués des deux côtés, seulement si prouvés', async () => {
  const barrel = (s) => ({ name: 'minecraft:barrel', states: s });
  // Omission côté source.
  assert.equal((await rtSt('bedrock', barrel({ facing_direction: 1 }), bedWorld('minecraft:barrel', { facing_direction: 1, open_bit: 0 }))).state, 'PASS');
  assert.equal((await rtSt('bedrock', barrel({ facing_direction: 1 }), bedWorld('minecraft:barrel', { facing_direction: 1, open_bit: 1 }))).state, 'FAIL');
  // Omission côté retour (comportement déjà présent).
  assert.equal((await rtSt('bedrock', barrel({ facing_direction: 1, open_bit: 0 }), bedWorld('minecraft:barrel', { facing_direction: 1 }))).state, 'PASS');
  assert.equal((await rtSt('bedrock', barrel({ facing_direction: 1, open_bit: 1 }), bedWorld('minecraft:barrel', { facing_direction: 1 }))).state, 'FAIL');
  // Autre clé du même bloc toujours comparée.
  assert.equal((await rtSt('bedrock', barrel({ facing_direction: 1 }), bedWorld('minecraft:barrel', { facing_direction: 2, open_bit: 0 }))).state, 'FAIL');
  // Clé inconnue de la table/du registre : reste non jugée.
  assert.equal((await rtSt('bedrock', barrel({ facing_direction: 1 }), bedWorld('minecraft:barrel', { facing_direction: 1, mystere: 1 }))).state, 'NOT_EVALUATED');
  // Bloc absent de la table des défauts : non jugé.
  assert.equal((await rtSt('bedrock', { name: 'minecraft:mccb_sans_defaut', states: { a: 1 } }, bedWorld('minecraft:mccb_sans_defaut', { a: 1, b: 0 }))).state, 'NOT_EVALUATED');
});

test('B1: cadre Bedrock → entité Java dans la MÊME dimension', async () => {
  const subject = { family: 'block', locator: loc, expected: { name: 'minecraft:frame', states: {}, targets: ['entity:minecraft:item_frame'] }, aspects: { identity: { direct: 'CROSS:entity:minecraft:item_frame', roundtrip: 'EQUAL' } } };
  const view = (ents) => ({ edition: 'java', world: { blockAt: async () => null }, entitiesIndex: async () => ents });
  const ent = (dim, id = 'minecraft:item_frame') => ({ dim, facts: { id, pos: [1.5, 64.5, 2.5] } });
  const dir = async (ents) => st((await evaluate(subject, { sourceEdition: 'bedrock', direct: view(ents), roundtrip: null })).identity.direct);
  assert.equal(await dir([ent(OW)]), 'PASS');
  assert.equal(await dir([ent('minecraft:the_nether')]), 'FAIL');
  assert.equal(await dir([]), 'FAIL');
  assert.equal(await dir([ent('minecraft:the_nether'), ent(OW)]), 'PASS');
  assert.equal(await dir([ent(OW, 'minecraft:glow_item_frame')]), 'FAIL');
});
