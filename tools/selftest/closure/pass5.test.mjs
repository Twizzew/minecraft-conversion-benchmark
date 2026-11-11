// v1.3 closure, fifth pass: an NBT compound key is data. "__proto__", "constructor",
// "prototype" are ordinary keys — never lost, never a prototype, never equal to another value.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { T, bItem, javaWorld, bedrockWorld, view, run, status, writeJavaPlayer, useSyntheticJavaReports } from './helpers.mjs';
import { gameRead, gameReadMap, snbt, parseNbt, parseOneLittle, parseAllLittle } from '../../lib/nbt.mjs';
const require = createRequire(import.meta.url);
const nbt = require('prismarine-nbt');

useSyntheticJavaReports(['minecraft:diamond']);

// a compound whose keys are OWN properties, whatever they are
const C = (pairs) => { const v = {}; for (const [k, x] of pairs) Object.defineProperty(v, k, { value: x, enumerable: true, writable: true, configurable: true }); return { type: 'compound', value: v }; };
const G = (t) => gameRead(snbt(t));
const KEYS = ['__proto__', 'constructor', 'prototype'];

test('canonical form: special keys are ordinary keys (not lost, not equal to {}, value kept)', () => {
  for (const k of KEYS) {
    assert.notEqual(G(C([[k, T.i(1)]])), G(C([])), `${k} vs empty`);
    assert.notEqual(G(C([[k, T.i(1)]])), G(C([[k, T.i(2)]])), `${k}: 1 vs 2`);
    assert.equal(G(C([[k, T.i(1)]])), G(C([[k, T.i(1)]])), `${k}: same`);
    assert.notEqual(G(C([['x', C([[k, C([['y', T.i(1)]])]])]])), G(C([['x', C([])]])), `nested ${k}`);
    assert.notEqual(G(C([['x', C([[k, T.i(1)]])]])), G(C([['x', C([[k, T.i(2)]])]])), `nested ${k} values`);
    const m = gameReadMap({ [k]: '1', a: '2' });
    assert.deepEqual(Object.keys(m).sort(), [k, 'a'].sort(), `map keeps ${k}`);
  }
  assert.equal(Object.getPrototypeOf(JSON.parse(G(C([['__proto__', T.i(1)]])))[1]), Object.prototype);
});

test('NBT readers: a "__proto__" key read by prismarine-nbt is put back as an own key (big and little endian)', async () => {
  const doc = { type: 'compound', name: '', value: C([['__proto__', C([['z', T.str('q')]])], ['a', T.i(1)], ['L', T.lc([C([['__proto__', T.i(7)]])])]]).value };
  const big = await parseNbt(nbt.writeUncompressed(doc, 'big'));
  assert.deepEqual(Object.keys(big.value).sort(), ['L', '__proto__', 'a']);
  assert.equal(Object.getPrototypeOf(big.value), Object.prototype);
  assert.equal(big.value.__proto__.value.z.value, 'q');
  assert.deepEqual(Object.keys(big.value.L.value.value[0]), ['__proto__']);
  const lb = nbt.writeUncompressed(doc, 'little');
  for (const t of [parseOneLittle(lb), parseAllLittle(lb)[0]]) {
    assert.deepEqual(Object.keys(t.value).sort(), ['L', '__proto__', 'a']);
    assert.equal(Object.getPrototypeOf(t.value), Object.prototype);
  }
});

test('end to end: entity data round trip with "__proto__" / "constructor" keys', async () => {
  const jEnt = (data) => T.c({ id: T.str('minecraft:marker'), Pos: T.ld([1, 2, 3]), UUID: T.ia([1, 2, 3, 4]), data });
  const rt = async (a, b) => status((await run('entity', { source: javaWorld({ entities: [jEnt(a)] }), sourceEdition: 'java', roundtrip: view('java', javaWorld({ entities: [jEnt(b)] })) }))[0].res.data.roundtrip);
  for (const k of KEYS) {
    assert.equal(await rt(C([[k, T.i(1)]]), C([])), 'PARTIAL', `${k} vs empty`);
    assert.equal(await rt(C([[k, T.i(1)]]), C([[k, T.i(2)]])), 'PARTIAL', `${k} 1 vs 2`);
    assert.equal(await rt(C([[k, T.i(1)]]), C([[k, T.i(1)]])), 'PASS', `${k} same`);
  }
});

test('end to end through a REAL NBT file: player item custom_data with a "__proto__" key', async () => {
  const item = (v) => T.c({ Slot: T.b(0), id: T.str('minecraft:diamond'), count: T.i(1), components: T.c({ 'minecraft:custom_data': C([['__proto__', T.i(v)]]) }) });
  const world = (v) => javaWorld({ playerFiles: [writeJavaPlayer(T.c({ Pos: T.ld([0, 64, 0]), Dimension: T.str('minecraft:overworld'), playerGameType: T.i(0), Inventory: T.lc([item(v)]) }))], level: T.c({}) });
  const rows = await run('player', { source: world(1), sourceEdition: 'java', roundtrip: view('java', world(2)) });
  assert.match(rows[0].subject.expected.inventory[0].sem, /"__proto__":1/, 'the key survives the file read');
  assert.equal(status(rows[0].res.inventory.roundtrip), 'FAIL');
  const same = await run('player', { source: world(1), sourceEdition: 'java', roundtrip: view('java', world(1)) });
  assert.equal(status(same[0].res.inventory.roundtrip), 'PASS');
  void bItem; void bedrockWorld;
});
