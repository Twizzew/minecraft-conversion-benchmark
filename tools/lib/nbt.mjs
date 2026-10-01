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
 * Rule 46, narrowed by rule 54 (v1.3 closure, DEFAULT-DENY): a semantic value as the GAME reads it.
 * The v1.3 freeze dropped EVERY key whose value was 0, "" or false, at any depth — but an
 * absent key is read as the field's DEFAULT, and that default is not 0 for every field (a
 * Java creeper without `Fuse` does not explode instantly). A zero-valued key now reads like an
 * absent one ONLY where the default of that field in that context is demonstrated:
 *  - an empty compound or list is no compound / list (§5.4, already applied by semantic());
 *  - a Bedrock EMPTY item stack (`Name` "" or `Count` 0: the reader's own "no item", facts.mjs)
 *    is an empty position; a list holding only empty stacks is no list (four empty armour
 *    slots); list elements keep their position;
 *  - item fields with a justified default of 0 (KNOWN_ZERO_DEFAULTS: rules 39 and 48);
 *  - an item's `Block.version` is a block-state format stamp (the game upgrades from it).
 * Everything else — `Fuse:0s`, `HasLeftHorn:0b` (NBT booleans are bytes), `Duration:0`, any
 * unknown field — stays distinct from its absence. This table is NOT exhaustive: a field
 * missing from it is compared as stored, never assumed to be a default.
 * Returns the canonical string, or null when nothing is left.
 */
// [where (predicate on the compound holding the key), key] — a value 0 there equals absent.
const isBedrockItem = (o) => typeof o.Name === 'string' && 'Count' in o;
const isJavaItemComponents = (o, parent) => parent === 'components';
export const KNOWN_ZERO_DEFAULTS = [
  // Rule 39: Bedrock item tag `Damage:0` / `RepairCost:0` — written on some stacks, not on others.
  { where: (o, parent, grand) => parent === 'tag' && grand && isBedrockItem(grand), key: 'Damage' },
  { where: (o, parent, grand) => parent === 'tag' && grand && isBedrockItem(grand), key: 'RepairCost' },
  // Rule 48: Java components `damage` / `repair_cost` — not saved by the game at 0, read as 0.
  { where: isJavaItemComponents, key: 'minecraft:damage' },
  { where: isJavaItemComponents, key: 'minecraft:repair_cost' },
];
const isZeroScalar = (x) => x === 0 || x === '' || x === false;
const isEmpty = (x) => (Array.isArray(x) && !x.length) || (x && typeof x === 'object' && !Array.isArray(x) && !Object.keys(x).length);
const isEmptyBedrockStack = (x) => x && typeof x === 'object' && !Array.isArray(x) && typeof x.Name === 'string' && 'Count' in x && (x.Name === '' || !(Number(x.Count) > 0));
export function zeroFree(s) {
  if (s == null) return null;
  let v;
  try { v = JSON.parse(s); } catch { return s; }
  const walk = (x, key, parent) => {
    if (Array.isArray(x)) {
      const a = x.map((e) => (isEmptyBedrockStack(e) ? {} : walk(e, null, null)));
      return a.every(isEmpty) ? [] : a;
    }
    if (x && typeof x === 'object') {
      const o = {};
      for (const k of Object.keys(x).sort()) {
        if (key === 'Block' && k === 'version') continue;
        const y = walk(x[k], k, x);
        if (isEmpty(y)) continue;
        if (isZeroScalar(y) && KNOWN_ZERO_DEFAULTS.some((d) => d.key === k && d.where(x, key, parent))) continue;
        o[k] = y;
      }
      return o;
    }
    return x;
  };
  const out = walk(v, null, null);
  return isEmpty(out) ? null : JSON.stringify(out);
}
/** Rule 46 (narrowed) applied to a {key: semantic} map: keys that read like absent ones are dropped. */
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
