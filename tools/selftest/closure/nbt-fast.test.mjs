// Lecteur NBT Java dédié (09/11/2026) : même arbre que prismarine-nbt, repli strict sinon.
// Preuve sur mondes réels : selftest/nbt-fast-equivalence.mjs (1 486 726 documents, 0 écart).
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { parseBigFast, SignedBigInt } from '../../lib/nbt-fast.mjs';
import { parseNbt, restoreProtoKeys, snbt } from '../../lib/nbt.mjs';
const require = createRequire(import.meta.url);
const nbt = require('prismarine-nbt');

const W = (parts) => Buffer.concat(parts.map((x) => (Buffer.isBuffer(x) ? x : Buffer.from(x))));
const s16 = (s) => { const b = Buffer.from(s, 'utf8'); const h = Buffer.alloc(2); h.writeUInt16BE(b.length); return W([h, b]); };
const i32 = (n) => { const b = Buffer.alloc(4); b.writeInt32BE(n); return b; };
const f32 = (n) => { const b = Buffer.alloc(4); b.writeFloatBE(n); return b; };
const f64 = (n) => { const b = Buffer.alloc(8); b.writeDoubleBE(n); return b; };
const ref = (raw) => restoreProtoKeys(nbt.parseUncompressed(raw, 'big'));

const DOC = W([[10], s16(''),
  [1], s16('b'), [0xff], [2], s16('s'), [0x80, 0x00], [3], s16('i'), i32(-7), [4], s16('l'), i32(-1), i32(-2),
  [5], s16('f'), f32(1.5), [6], s16('d'), f64(-0), [6], s16('n'), f64(NaN), [7], s16('ba'), i32(2), [1, 0xfe],
  [8], s16('é'), s16('Crème ☃'), [9], s16('vide'), [0], i32(2), [9], s16('lc'), [10], i32(1), [3], s16('x'), i32(5), [0],
  [9], s16('ll'), [12], i32(1), i32(1), i32(7), i32(8), [9], s16('lli'), [9], i32(1), [3], i32(1), i32(4),
  [11], s16('ia'), i32(2), i32(1), i32(-1), [12], s16('la'), i32(2), i32(-1), i32(-2), i32(5), i32(6), [0]]);

test('NBT dédié : arbre identique à prismarine (types, ordre, SignedBigInt, -0, NaN, UTF-8)', () => {
  const a = parseBigFast(DOC), b = ref(DOC);
  assert.deepStrictEqual(a, b);
  assert.ok(a.value.la.value[0] instanceof SignedBigInt);
  assert.equal(snbt(a), snbt(b));
  assert.equal(Object.keys(a.value).join(), Object.keys(b.value).join());
});

test('NBT dédié : formes inhabituelles → lecture prismarine (mêmes résultats, mêmes erreurs)', async () => {
  const proto = W([[10], s16(''), [10], s16('__proto__'), [1], s16('x'), [1], [0], [0]]);
  assert.throws(() => parseBigFast(proto));
  assert.deepStrictEqual(await parseNbt(proto), ref(proto));
  const sansFin = W([[10], s16(''), [1], s16('x'), [1]]); // composé sans étiquette de fin : toléré par prismarine
  assert.throws(() => parseBigFast(sansFin));
  assert.deepStrictEqual(await parseNbt(sansFin), ref(sansFin));
  const tronque = W([[10], s16(''), [11], s16('ia'), i32(3), i32(1)]);
  assert.throws(() => parseBigFast(tronque));
  await assert.rejects(async () => parseNbt(tronque));
});
