// Lecteur NBT gros-boutiste (Java) dédié, 09/11/2026 — même arbre que prismarine-nbt 2.8.0
// (`parseUncompressed(raw, 'big')`), plus rapide :
//  - aucun appel générique protodef ;
//  - un `longArray` n'est décodé qu'à la première lecture de sa valeur (accesseur énumérable qui
//    se remplace par la valeur) : les tableaux jamais lus (hauteurs, biomes, sections non
//    visitées) ne coûtent qu'un saut d'octets. Les éléments restent des `SignedBigInt` de protodef.
// STRICT : au moindre écart de forme (étiquette inconnue, taille négative, données tronquées,
// composé sans fin, clé « __proto__ »), il lève une erreur et l'appelant reprend prismarine-nbt — mêmes erreurs,
// mêmes tolérances. Équivalence prouvée sur tous les chunks des mondes du banc
// (selftest/nbt-fast-equivalence.mjs).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const nbt = require('prismarine-nbt');

// La classe exacte de protodef, prise sur une valeur réellement lue par prismarine.
const SignedBigInt = nbt.parseUncompressed(Buffer.from([10, 0, 0, 4, 0, 1, 120, 0, 0, 0, 0, 0, 0, 0, 1, 0]), 'big').value.x.value.constructor;
export { SignedBigInt };

const TYPES = ['end', 'byte', 'short', 'int', 'long', 'float', 'double', 'byteArray', 'string', 'list', 'compound', 'intArray', 'longArray'];
class Bad extends Error {}

function lazyLongArray(tag, buf, off, n) {
  Object.defineProperty(tag, 'value', {
    enumerable: true, configurable: true,
    get() {
      const a = new Array(n);
      for (let i = 0, o = off; i < n; i++, o += 8) a[i] = new SignedBigInt(buf.readInt32BE(o), buf.readInt32BE(o + 4));
      Object.defineProperty(tag, 'value', { value: a, enumerable: true, writable: true, configurable: true });
      return a;
    },
    set(v) { Object.defineProperty(tag, 'value', { value: v, enumerable: true, writable: true, configurable: true }); },
  });
}

export function parseBigFast(buf) {
  const len = buf.length;
  let o = 0;
  const need = (n) => { if (n < 0 || o + n > len) throw new Bad('truncated'); };
  const i32 = () => { need(4); const v = buf.readInt32BE(o); o += 4; return v; };
  const str = () => { need(2); const n = buf.readUInt16BE(o); o += 2; need(n); const s = buf.toString('utf8', o, o + n); o += n; return s; };
  const count = () => { const n = i32(); if (n < 0) throw new Bad('negative count'); return n; };
  // Valeur d'un type ; `tag` reçoit `value` (accesseur paresseux pour longArray).
  function value(t) {
    switch (t) {
      case 1: need(1); return buf.readInt8(o++);
      case 2: { need(2); const v = buf.readInt16BE(o); o += 2; return v; }
      case 3: return i32();
      case 4: { need(8); const v = new SignedBigInt(buf.readInt32BE(o), buf.readInt32BE(o + 4)); o += 8; return v; }
      case 5: { need(4); const v = buf.readFloatBE(o); o += 4; return v; }
      case 6: { need(8); const v = buf.readDoubleBE(o); o += 8; return v; }
      case 7: { const n = count(); need(n); const a = new Array(n); for (let i = 0; i < n; i++) a[i] = buf.readInt8(o + i); o += n; return a; }
      case 8: return str();
      case 9: {
        need(1); const et = buf[o++];
        if (et > 12) throw new Bad('list type');
        const n = count();
        const a = new Array(n);
        if (et === 0) { for (let i = 0; i < n; i++) a[i] = undefined; return { type: 'end', value: a }; }
        if (et === 12) { for (let i = 0; i < n; i++) a[i] = longArrayPlain(); return { type: 'longArray', value: a }; }
        for (let i = 0; i < n; i++) a[i] = value(et);
        return { type: TYPES[et], value: a };
      }
      case 10: {
        const v = {};
        for (;;) {
          if (o >= len) throw new Bad('compound without end');
          const ct = buf[o++];
          if (ct === 0) return v;
          if (ct > 12) throw new Bad('tag type');
          const name = str();
          // clé « __proto__ » : prismarine en fait un prototype, que restoreProtoKeys replace en
          // fin d'ordre des clés — reprise par prismarine pour un arbre strictement identique.
          if (name === '__proto__') throw new Bad('__proto__ key');
          const tag = { type: TYPES[ct] };
          if (ct === 12) lazyField(tag); else tag.value = value(ct);
          v[name] = tag;
        }
      }
      case 11: { const n = count(); need(n * 4); const a = new Array(n); for (let i = 0; i < n; i++) a[i] = buf.readInt32BE(o + i * 4); o += n * 4; return a; }
      default: throw new Bad('type');
    }
  }
  function longArrayPlain() {
    const n = count(); need(n * 8);
    const a = new Array(n);
    for (let i = 0; i < n; i++, o += 8) a[i] = new SignedBigInt(buf.readInt32BE(o), buf.readInt32BE(o + 4));
    return a;
  }
  function lazyField(tag) {
    const n = count(); need(n * 8);
    lazyLongArray(tag, buf, o, n);
    o += n * 8;
  }
  need(1);
  const t = buf[o++];
  if (t < 1 || t > 12) throw new Bad('root type');
  const name = str();
  const root = { type: TYPES[t], name };
  if (t === 12) lazyField(root); else root.value = value(t);
  return root;
}

/** Décode tout `longArray` paresseux d'un sous-arbre (gardé longtemps : ne pas retenir le chunk décompressé). */
export function materializeLongArrays(tag) {
  if (!tag || typeof tag !== 'object') return tag;
  if (tag.type === 'compound' && tag.value) for (const k of Object.keys(tag.value)) materializeLongArrays(tag.value[k]);
  else if (tag.type === 'longArray') void tag.value;
  else if (tag.type === 'list' && tag.value) {
    const { type, value } = tag.value;
    if (type === 'compound' || type === 'list') for (const e of value || []) materializeLongArrays({ type, value: e });
  }
  return tag;
}
