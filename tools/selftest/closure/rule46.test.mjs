// v1.3 closure — B. rule 46 → rule 54: "zero / false / empty ≡ absent" only where the default of
// THAT field in THAT context is demonstrated (lib/nbt.mjs KNOWN_DEFAULTS). Everything else —
// including an empty list or compound — is DEFAULT-DENY.
import test from 'node:test';
import assert from 'node:assert/strict';
import { T, jItem, bItem, bEmpty, javaWorld, bedrockWorld, view, run, status, useSyntheticJavaReports } from './helpers.mjs';
import { gameRead, KNOWN_DEFAULTS } from '../../lib/nbt.mjs';
import { snbt } from '../../lib/nbt.mjs';

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

test('unknown / nested EMPTY list and compound vs absent: distinct (no global [] ≈ absent, {} ≈ absent)', async () => {
  assert.equal(await dataRT(jEnt('minecraft:zombie', { MccbList: T.ls([]) }), jEnt('minecraft:zombie', {})), 'PARTIAL');
  assert.equal(await dataRT(jEnt('minecraft:zombie', { MccbObj: T.c({}) }), jEnt('minecraft:zombie', {})), 'PARTIAL');
  assert.equal(await dataRT(jEnt('minecraft:zombie', { Nest: T.c({ a: T.i(1), l: T.ls([]) }) }), jEnt('minecraft:zombie', { Nest: T.c({ a: T.i(1) }) })), 'PARTIAL');
  assert.equal(await dataRT(jEnt('minecraft:zombie', { Nest: T.c({ a: T.i(1), o: T.c({}) }) }), jEnt('minecraft:zombie', { Nest: T.c({ a: T.i(1) }) })), 'PARTIAL');
  assert.equal(await dataRT(jEnt('minecraft:zombie', { Tags: T.ls([]) }), jEnt('minecraft:zombie', {})), 'PARTIAL');
  assert.equal(await dataRT(bEnt('minecraft:zombie', { MccbObj: T.c({}) }), bEnt('minecraft:zombie', {}), 'bedrock'), 'PARTIAL');
  // the same empty value on both sides is of course equal
  assert.equal(await dataRT(jEnt('minecraft:zombie', { MccbList: T.ls([]) }), jEnt('minecraft:zombie', { MccbList: T.ls([]) })), 'PASS');
});

test('a Bedrock list of EMPTY item stacks is NOT an absent list; two encodings of an empty stack are one value', async () => {
  const empty4 = T.lc([bEmpty(), bEmpty(), bEmpty(), bEmpty()]);
  assert.equal(await dataRT(bEnt('minecraft:zombie', { Armor: empty4 }), bEnt('minecraft:zombie', {}), 'bedrock'), 'PARTIAL');
  const short4 = T.lc([0, 1, 2, 3].map(() => T.c({ Count: T.b(0), Name: T.str('') })));
  assert.equal(await dataRT(bEnt('minecraft:zombie', { Armor: empty4 }), bEnt('minecraft:zombie', { Armor: short4 }), 'bedrock'), 'PASS');
  const zeros = { type: 'list', value: { type: 'int', value: [0, 0, 0, 0] } };
  assert.equal(await dataRT(bEnt('minecraft:zombie', { Numbers: zeros }), bEnt('minecraft:zombie', {}), 'bedrock'), 'PARTIAL');
});

const s = (o) => snbt(o);
const BI = { root: 'bedrock-item' }, JI = { root: 'java-item' }; // the caller states that these ARE items
test('kept, narrow item exceptions: Bedrock tag Damage:0 / RepairCost:0 (and the tag left empty), Block.version', () => {
  const a = s(T.c({ Count: T.b(1), Name: T.str('minecraft:diamond_sword'), tag: T.c({ Damage: T.i(0), RepairCost: T.i(0) }) }));
  const b = s(T.c({ Count: T.b(1), Name: T.str('minecraft:diamond_sword') }));
  assert.equal(gameRead(a, BI), gameRead(b, BI));
  const c = s(T.c({ Count: T.b(1), Name: T.str('minecraft:stone'), Block: T.c({ name: T.str('minecraft:stone'), states: T.c({}), version: T.i(18168865) }) }));
  const d = s(T.c({ Count: T.b(1), Name: T.str('minecraft:stone'), Block: T.c({ name: T.str('minecraft:stone'), states: T.c({}), version: T.i(17959425) }) }));
  assert.equal(gameRead(c, BI), gameRead(d, BI));
  // an unknown zero field, an unknown empty list in the tag: NOT dropped
  assert.notEqual(gameRead(s(T.c({ Count: T.b(1), Name: T.str('minecraft:diamond'), MccbUnknown: T.b(0) })), BI), gameRead(s(T.c({ Count: T.b(1), Name: T.str('minecraft:diamond') })), BI));
  assert.notEqual(gameRead(s(T.c({ Count: T.b(1), Name: T.str('minecraft:firework_rocket'), tag: T.c({ Fireworks: T.c({ Explosions: T.lc([]), Flight: T.b(1) }) }) })), BI),
    gameRead(s(T.c({ Count: T.b(1), Name: T.str('minecraft:firework_rocket'), tag: T.c({ Fireworks: T.c({ Flight: T.b(1) }) }) })), BI));
  // Damage 0 outside an item tag is not covered
  assert.notEqual(gameRead(s(T.c({ Damage: T.i(0), x: T.i(1) }))), gameRead(s(T.c({ x: T.i(1) }))));
});

test('kept, narrow item exceptions: Java components damage / repair_cost 0 (rule 48) and an empty patch', () => {
  const a = s(T.c({ count: T.i(1), id: T.str('minecraft:iron_sword'), components: T.c({ 'minecraft:damage': T.i(0), 'minecraft:repair_cost': T.i(0) }) }));
  const b = s(T.c({ count: T.i(1), id: T.str('minecraft:iron_sword') }));
  assert.equal(gameRead(a, JI), gameRead(b, JI));
  assert.notEqual(gameRead(s(T.c({ count: T.i(1), id: T.str('minecraft:iron_sword'), components: T.c({ 'minecraft:custom_data': T.c({}) }) })), JI), gameRead(b, JI));
});

test('the exception table is exactly the documented one', () => {
  assert.deepEqual(KNOWN_DEFAULTS.map((d) => `${d.ctx}.${d.key}=${JSON.stringify(d.value)}`).sort(), [
    'bedrock-block-entity.BlockEntityVersion=0', 'bedrock-item-tag.Damage=0', 'bedrock-item-tag.RepairCost=0', 'bedrock-item.tag={}',
    'java-item-components.minecraft:damage=0', 'java-item-components.minecraft:repair_cost=0', 'java-item.components={}']);
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
