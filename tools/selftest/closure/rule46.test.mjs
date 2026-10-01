// v1.3 closure — B. rule 46: "zero / false / empty ≡ absent" only where the default of THAT
// field in THAT context is demonstrated. Everything else: DEFAULT-DENY.
import test from 'node:test';
import assert from 'node:assert/strict';
import { T, jItem, bItem, bEmpty, javaWorld, bedrockWorld, view, run, status, useSyntheticJavaReports } from './helpers.mjs';
import { zeroFree } from '../../lib/nbt.mjs';

useSyntheticJavaReports(['minecraft:diamond', 'minecraft:iron_sword']);

const jEnt = (id, extra) => T.c({ id: T.str(id), Pos: T.ld([5.5, 64, 5.5]), UUID: T.ia([1, 2, 3, 4]), ...extra });
const bEnt = (id, extra) => T.c({ identifier: T.str(id), Pos: T.lf([5.5, 64, 5.5]), UniqueID: { type: 'long', value: [0, 7] }, ...extra });
const dataRT = async (src, out, edition = 'java') => {
  const w = (t) => (edition === 'java' ? javaWorld({ entities: [t] }) : bedrockWorld({ actors: [t] }));
  const rows = await run('entity', { source: w(src), sourceEdition: edition, roundtrip: view(edition, w(out)) });
  return status(rows[0].res.data.roundtrip);
};

for (const [label, id, key, zero] of [
  ['Creeper Fuse', 'minecraft:creeper', 'Fuse', T.s(0)],
  ['Creeper ExplosionRadius', 'minecraft:creeper', 'ExplosionRadius', T.b(0)],
  ['Ghast ExplosionPower', 'minecraft:ghast', 'ExplosionPower', T.b(0)],
  ['Goat HasLeftHorn (byte boolean 0)', 'minecraft:goat', 'HasLeftHorn', T.b(0)],
  ['Goat HasRightHorn (byte boolean 0)', 'minecraft:goat', 'HasRightHorn', T.b(0)],
  ['AreaEffectCloud Duration', 'minecraft:area_effect_cloud', 'Duration', T.i(0)],
]) {
  test(`${label}: 0 vs absent is a difference (round trip data)`, async () => {
    assert.equal(await dataRT(jEnt(id, { [key]: zero }), jEnt(id, {})), 'PARTIAL');
    assert.equal(await dataRT(jEnt(id, {}), jEnt(id, { [key]: zero })), 'PARTIAL');
    assert.equal(await dataRT(jEnt(id, { [key]: zero }), jEnt(id, { [key]: zero })), 'PASS');
  });
}

test('Creeper Fuse 30 vs absent: no default demonstrated here → still a difference (no fabricated PASS)', async () => {
  assert.equal(await dataRT(jEnt('minecraft:creeper', { Fuse: T.s(30) }), jEnt('minecraft:creeper', {})), 'PARTIAL');
});

test('Goat horn 1b vs absent and 1b vs 0b are differences', async () => {
  assert.equal(await dataRT(jEnt('minecraft:goat', { HasLeftHorn: T.b(1) }), jEnt('minecraft:goat', {})), 'PARTIAL');
  assert.equal(await dataRT(jEnt('minecraft:goat', { HasLeftHorn: T.b(1) }), jEnt('minecraft:goat', { HasLeftHorn: T.b(0) })), 'PARTIAL');
});

test('AreaEffectCloud Duration -1 vs absent and 0 vs -1: differences (default not demonstrated in this environment)', async () => {
  assert.equal(await dataRT(jEnt('minecraft:area_effect_cloud', { Duration: T.i(-1) }), jEnt('minecraft:area_effect_cloud', {})), 'PARTIAL');
  assert.equal(await dataRT(jEnt('minecraft:area_effect_cloud', { Duration: T.i(0) }), jEnt('minecraft:area_effect_cloud', { Duration: T.i(-1) })), 'PARTIAL');
});

test('an unknown zero-valued field stays distinct from its absence (Java and Bedrock, nested)', async () => {
  assert.equal(await dataRT(jEnt('minecraft:zombie', { MccbUnknownField: T.b(0) }), jEnt('minecraft:zombie', {})), 'PARTIAL');
  assert.equal(await dataRT(jEnt('minecraft:zombie', { Nest: T.c({ a: T.i(1), z: T.i(0) }) }), jEnt('minecraft:zombie', { Nest: T.c({ a: T.i(1) }) })), 'PARTIAL');
  assert.equal(await dataRT(bEnt('minecraft:zombie', { MccbUnknownField: T.str('') }), bEnt('minecraft:zombie', {}), 'bedrock'), 'PARTIAL');
});

test('kept: an empty list / compound reads like no list (§5.4, already in semantic())', async () => {
  assert.equal(await dataRT(jEnt('minecraft:zombie', { Tags: T.ls([]) }), jEnt('minecraft:zombie', {})), 'PASS');
});

test('kept, narrow: a Bedrock list of EMPTY item stacks (Count 0, Name "") reads like no list', async () => {
  const empty4 = T.lc([bEmpty(), bEmpty(), bEmpty(), bEmpty()]);
  assert.equal(await dataRT(bEnt('minecraft:zombie', { Armor: empty4 }), bEnt('minecraft:zombie', {}), 'bedrock'), 'PASS');
  // …but a list of zero NUMBERS is not an empty item list
  const zeros = { type: 'list', value: { type: 'int', value: [0, 0, 0, 0] } };
  assert.equal(await dataRT(bEnt('minecraft:zombie', { Numbers: zeros }), bEnt('minecraft:zombie', {}), 'bedrock'), 'PARTIAL');
});

test('kept, narrow item exceptions: Bedrock tag Damage:0 / RepairCost:0 and Block.version', () => {
  const a = JSON.stringify({ Count: 1, Name: 'minecraft:diamond_sword', tag: { Damage: 0, RepairCost: 0 } });
  const b = JSON.stringify({ Count: 1, Name: 'minecraft:diamond_sword' });
  assert.equal(zeroFree(a, { kind: 'item', edition: 'bedrock' }), zeroFree(b, { kind: 'item', edition: 'bedrock' }));
  const c = JSON.stringify({ Count: 1, Name: 'minecraft:stone', Block: { name: 'minecraft:stone', states: {}, version: 18168865 } });
  const d = JSON.stringify({ Count: 1, Name: 'minecraft:stone', Block: { name: 'minecraft:stone', states: {}, version: 17959425 } });
  assert.equal(zeroFree(c, { kind: 'item', edition: 'bedrock' }), zeroFree(d, { kind: 'item', edition: 'bedrock' }));
  // an unknown zero field of an item is NOT dropped
  const e = JSON.stringify({ Count: 1, Name: 'minecraft:diamond', MccbUnknown: 0 });
  assert.notEqual(zeroFree(e, { kind: 'item', edition: 'bedrock' }), zeroFree(JSON.stringify({ Count: 1, Name: 'minecraft:diamond' }), { kind: 'item', edition: 'bedrock' }));
});

test('kept, narrow item exceptions: Java components damage / repair_cost 0 (rule 48)', () => {
  const a = JSON.stringify({ count: 1, id: 'minecraft:iron_sword', components: { 'minecraft:damage': 0, 'minecraft:repair_cost': 0 } });
  const b = JSON.stringify({ count: 1, id: 'minecraft:iron_sword' });
  assert.equal(zeroFree(a, { kind: 'item', edition: 'java' }), zeroFree(b, { kind: 'item', edition: 'java' }));
});

test('held items (round trip): an unknown zero key on the item is a difference', async () => {
  const withZero = T.c({ id: T.str('minecraft:iron_sword'), count: T.i(1), MccbUnknown: T.b(0) });
  const src = jEnt('minecraft:zombie', { equipment: T.c({ mainhand: withZero }) });
  const out = jEnt('minecraft:zombie', { equipment: T.c({ mainhand: jItem('minecraft:iron_sword') }) });
  const rows = await run('entity', { source: javaWorld({ entities: [src] }), sourceEdition: 'java', roundtrip: view('java', javaWorld({ entities: [out] })) });
  assert.notEqual(status(rows[0].res.equipment.roundtrip), 'PASS');
});

test('player items (round trip): an unknown zero key on the item is a difference; tag Damage:0 is not', async () => {
  const p = (it) => T.c({ Pos: T.lf([0, 65.62, 0]), DimensionId: T.i(0), PlayerGameMode: T.i(0), Inventory: T.lc([it]) });
  const w = (tag) => bedrockWorld({ named: { '~local_player': tag }, level: T.c({ GameType: T.i(0) }) });
  const base = bItem('minecraft:diamond_sword', 1, 0);
  const withUnknown = T.c({ ...base.value, MccbUnknown: T.b(0) });
  const r1 = await run('player', { source: w(p(withUnknown)), sourceEdition: 'bedrock', roundtrip: view('bedrock', w(p(base))) });
  assert.notEqual(status(r1[0].res.inventory.roundtrip), 'PASS');
  const withTag0 = T.c({ ...base.value, tag: T.c({ Damage: T.i(0) }) });
  const r2 = await run('player', { source: w(p(withTag0)), sourceEdition: 'bedrock', roundtrip: view('bedrock', w(p(base))) });
  assert.equal(status(r2[0].res.inventory.roundtrip), 'PASS');
});

test('block entity data (round trip): an unknown zero key vs absent is PARTIAL', async () => {
  const be = (extra) => T.c({ id: T.str('minecraft:barrel'), x: T.i(1), y: T.i(2), z: T.i(3), ...extra });
  const w = (t) => javaWorld({ blockEntities: [t], blocks: { '1,2,3': { name: 'minecraft:barrel', props: {} } } });
  const rows = await run('block_entity', { source: w(be({ MccbUnknown: T.i(0) })), sourceEdition: 'java', roundtrip: view('java', w(be({}))) });
  assert.equal(status(rows[0].res.data.roundtrip), 'PARTIAL');
  const same = await run('block_entity', { source: w(be({ MccbUnknown: T.i(0) })), sourceEdition: 'java', roundtrip: view('java', w(be({ MccbUnknown: T.i(0) }))) });
  assert.equal(status(same[0].res.data.roundtrip), 'PASS');
});
