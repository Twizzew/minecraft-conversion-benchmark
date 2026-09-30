// NBT helpers shared by every MCCB oracle.
//
// Parsing is delegated to prismarine-nbt (MIT). Everything else here is MCCB's own:
// a canonical, TYPE-PRESERVING text form used for equality and for evidence, and a
// plain-JS view used for rules. A byte 1 and an int 1 are different values in
// Minecraft; the canonical form keeps them different.
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const nbt = require('prismarine-nbt');

/** Parse one NBT document (auto-detects gzip / zlib / raw). */
export async function parseNbt(buf, endian = 'big') {
  let raw = buf;
  if (buf[0] === 0x1f && buf[1] === 0x8b) raw = zlib.gunzipSync(buf);
  else if (buf[0] === 0x78 && (buf[1] === 0x9c || buf[1] === 0x01 || buf[1] === 0xda || buf[1] === 0x5e)) raw = zlib.inflateSync(buf);
  return nbt.parseUncompressed(raw, endian);
}

/** Parse every little-endian NBT compound concatenated in a Bedrock value. */
export function parseAllLittle(buf) {
  const out = [];
  let off = 0;
  while (off < buf.length) {
    const r = nbt.protos.little.parsePacketBuffer('nbt', buf, off);
    out.push(r.data);
    if (!r.metadata.size) break;
    off += r.metadata.size;
  }
  return out;
}

export function parseOneLittle(buf) {
  return nbt.protos.little.parsePacketBuffer('nbt', buf, 0).data;
}

const longToString = (v) => {
  if (typeof v === 'bigint') return v.toString();
  if (Array.isArray(v)) return ((BigInt(v[0]) << 32n) | BigInt(v[1] >>> 0)).toString();
  return String(v);
};

/** Canonical typed text of a tag ({type,value} as produced by prismarine-nbt). */
export function snbt(tag) {
  if (tag == null) return 'null';
  const { type, value } = tag;
  switch (type) {
    case 'byte': return `${value}b`;
    case 'short': return `${value}s`;
    case 'int': return `${value}`;
    case 'long': return `${longToString(value)}L`;
    case 'float': return `${value}f`;
    case 'double': return `${value}d`;
    case 'string': return JSON.stringify(value);
    case 'byteArray': return `[B;${value.map((x) => `${x}b`).join(',')}]`;
    case 'intArray': return `[I;${value.join(',')}]`;
    case 'longArray': return `[L;${value.map((x) => `${longToString(x)}L`).join(',')}]`;
    case 'list': return `[${(value.value || []).map((v) => snbt({ type: value.type, value: v })).join(',')}]`;
    case 'compound': {
      const keys = Object.keys(value).sort();
      return `{${keys.map((k) => `${JSON.stringify(k)}:${snbt(value[k])}`).join(',')}}`;
    }
    default: return `?${type}:${JSON.stringify(value)}`;
  }
}

/** Plain JS view (numbers, strings, arrays, objects; longs as decimal strings). */
export function plain(tag) {
  if (tag == null) return tag;
  const { type, value } = tag;
  switch (type) {
    case 'long': return longToString(value);
    case 'longArray': return value.map(longToString);
    case 'list': return (value.value || []).map((v) => plain({ type: value.type, value: v }));
    case 'compound': {
      const o = {};
      for (const k of Object.keys(value)) o[k] = plain(value[k]);
      return o;
    }
    default: return value;
  }
}

/**
 * Semantic canonical form (METHODOLOGY §5.4): the plain value with
 *  - a text component that is only {text:"x"} written as the string "x" (Minecraft
 *    reads both identically),
 *  - empty compounds / empty lists removed from compounds (absent ≡ empty),
 *  - numeric width ignored (1b ≡ 1s ≡ 1), compound keys sorted.
 * Used only as a SECOND chance after strict equality; results say which one matched.
 */
export function semantic(tag) { return JSON.stringify(semVal(plain(tag))); }
function semVal(v) {
  if (Array.isArray(v)) return v.map(semVal);
  if (v && typeof v === 'object') {
    const keys = Object.keys(v);
    if (keys.length === 1 && keys[0] === 'text' && typeof v.text === 'string') return v.text;
    const o = {};
    for (const k of keys.sort()) {
      const x = semVal(v[k]);
      if (x && typeof x === 'object' && !Array.isArray(x) && !Object.keys(x).length) continue;
      if (Array.isArray(x) && !x.length) continue;
      o[k] = x;
    }
    return o;
  }
  return v;
}

/**
 * Rule 46: a semantic value as the GAME reads it. A key whose value is zero, an empty
 * string, an empty list or an empty compound reads exactly like an absent key (the loaders
 * default absent scalars to 0/false/empty), at any depth of a compound; list elements are
 * kept (their position matters), but a list of zero elements only is itself zero. The block-state format stamp `version` of an item's
 * `Block` is a serialisation detail (the game upgrades the state from it). Returns the
 * canonical string, or null when nothing is left.
 */
export function zeroFree(s) {
  if (s == null) return null;
  let v;
  try { v = JSON.parse(s); } catch { return s; }
  // A list whose elements are all zero (four empty armour slots) reads like no list.
  const isZero = (x) => x === 0 || x === '' || x === false || (Array.isArray(x) && x.every(isZero))
    || (x && typeof x === 'object' && !Array.isArray(x) && !Object.keys(x).length);
  const walk = (x, parent) => {
    if (Array.isArray(x)) return x.map((e) => walk(e, null));
    if (x && typeof x === 'object') {
      const o = {};
      for (const k of Object.keys(x).sort()) {
        if (parent === 'Block' && k === 'version') continue;
        const y = walk(x[k], k);
        if (!isZero(y)) o[k] = y;
      }
      return o;
    }
    return x;
  };
  const out = walk(v, null);
  return isZero(out) ? null : JSON.stringify(out);
}
/** Rule 46 applied to a {key: semantic} map: zero-valued keys are dropped. */
export function zeroFreeMap(m) {
  const o = {};
  for (const [k, v] of Object.entries(m || {})) { const z = zeroFree(v); if (z !== null) o[k] = z; }
  return o;
}

/** Typed child lookup: get(tag, 'a', 'b', 0, 'c'). */
export function get(tag, ...path) {
  let t = tag;
  for (const p of path) {
    if (t == null) return undefined;
    if (t.type === 'compound') t = t.value[p];
    else if (t.type === 'list') { const v = t.value.value?.[p]; t = v === undefined ? undefined : { type: t.value.type, value: v }; }
    else return undefined;
  }
  return t;
}

/** Remove keys (at the top level of a compound) — returns a shallow copy. */
export function without(tag, keys) {
  if (!tag || tag.type !== 'compound') return tag;
  const value = { ...tag.value };
  for (const k of keys) delete value[k];
  return { type: 'compound', value };
}

/**
 * Plain text of a text component AS THE REFERENCE GAME READS IT: in Java 26.x (all Java
 * data is normalised to 26.3 first) and in Bedrock, a string IS the literal text — it is
 * never parsed as JSON. A 1.20.4-style JSON string that Mojang's upgrader did not
 * convert is therefore shown in game as raw JSON, and is compared as such.
 */
export function textOf(v) {
  return rawText(v).replace(/§./g, ''); // § formatting codes are formatting, not text
}
function rawText(v) {
  if (v == null) return '';
  if (typeof v === 'object' && v.type) return rawText(plain(v));
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map(textOf).join('');
  if (typeof v === 'object') {
    let s = '';
    if (typeof v.text === 'string') s += v.text;
    else if (typeof v[''] === 'string') s += v[''];
    if (typeof v.translate === 'string' && !v.text) s += v.translate;
    if (Array.isArray(v.extra)) s += v.extra.map(textOf).join('');
    return s;
  }
  return String(v);
}

export { nbt as prismarine };
