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

/**
 * An own key, whatever the key ("__proto__" included): an NBT compound key is data, never a
 * property of the JavaScript object model (v1.3 closure, pass 5).
 */
export const put = (o, k, v) => { Object.defineProperty(o, k, { value: v, enumerable: true, writable: true, configurable: true }); return o; };
/**
 * prismarine-nbt stores a compound key with `obj[name] = value`: a key "__proto__" does not
 * become a key — the tag becomes the object's PROTOTYPE. The tag is still there, exactly: it is
 * put back as an own key "__proto__" and the prototype restored, at every depth.
 */
export function restoreProtoKeys(tag) {
  if (!tag || typeof tag !== 'object') return tag;
  if (tag.type === 'compound' && tag.value && typeof tag.value === 'object') {
    const v = tag.value;
    const p = Object.getPrototypeOf(v);
    if (p !== Object.prototype && p !== null && typeof p === 'object' && typeof p.type === 'string') { Object.setPrototypeOf(v, Object.prototype); put(v, '__proto__', p); }
    for (const k of Object.keys(v)) restoreProtoKeys(v[k]);
  } else if (tag.type === 'list' && tag.value) {
    const { type, value } = tag.value;
    if (type === 'compound' || type === 'list') for (const e of value || []) restoreProtoKeys({ type, value: e });
  }
  return tag;
}

/** Parse one NBT document (auto-detects gzip / zlib / raw). */
export async function parseNbt(buf, endian = 'big') {
  let raw = buf;
  if (buf[0] === 0x1f && buf[1] === 0x8b) raw = zlib.gunzipSync(buf);
  else if (buf[0] === 0x78 && (buf[1] === 0x9c || buf[1] === 0x01 || buf[1] === 0xda || buf[1] === 0x5e)) raw = zlib.inflateSync(buf);
  return restoreProtoKeys(nbt.parseUncompressed(raw, endian));
}

/** Parse every little-endian NBT compound concatenated in a Bedrock value. */
export function parseAllLittle(buf) {
  const out = [];
  let off = 0;
  while (off < buf.length) {
    const r = nbt.protos.little.parsePacketBuffer('nbt', buf, off);
    out.push(restoreProtoKeys(r.data));
    if (!r.metadata.size) break;
    off += r.metadata.size;
  }
  return out;
}

export function parseOneLittle(buf) {
  return restoreProtoKeys(nbt.protos.little.parsePacketBuffer('nbt', buf, 0).data);
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
      for (const k of Object.keys(value)) put(o, k, plain(value[k]));
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
      put(o, k, x);
    }
    return o;
  }
  return v;
}

/**
 * Rule 54 (v1.3 closure; replaces rule 46 and the empty-container part of rule 2 in the
 * round-trip comparisons): a stored value AS THE GAME READS IT, built from the TYPED snbt
 * (not from semantic(), which drops every empty compound / list). DEFAULT-DENY: nothing is
 * equal to its absence unless the field, in its context, is listed in KNOWN_DEFAULTS.
 * Kept from rule 2 (representation, not absence): the width of a numeric SCALAR is ignored
 * for equal values (1b ≡ 1s ≡ 1 ≡ 1L, 1.0f ≡ 1.0d) — but the STRUCTURAL types are kept (a byte,
 * int or long array is never a list); a text component that is only {text:"x"} ≡ "x";
 * compound keys sorted. Item specifics apply only where the extraction path says "item"
 * (ITEM_PATHS below, or the caller's `root`), never because of a compound's shape: an item's
 * `Block.version` (block-state format stamp) is ignored; a Bedrock EMPTY item stack (`Name`
 * "" or `Count` 0 — the reader's own "no item", facts.mjs) in a list of items is one value
 * whatever its other keys. Items at paths not listed (e.g. inside trade offers or inside
 * another item's contents) get no item rule: they are compared as stored (deny). An empty list, an empty compound, 0, "" and false are values: `Tags:[]`, `x:{}`,
 * `Fuse:0s`, `HasLeftHorn:0b` (NBT booleans are bytes) all differ from an absent key.
 * KNOWN_DEFAULTS is the complete list of exceptions applied — NOT a list of every Minecraft
 * default: a field missing from it is compared as stored.
 * Returns the canonical JSON string, or null for an absent value.
 */
// Rule 54 (v1.3 closure, pass 3): WHERE an item is comes from the extraction path, never from
// the shape of a compound alone (a `minecraft:custom_data` or a marker's `data` may hold any
// {Name, Count, tag} or {id, count, components}). ITEM_PATHS: in a compound of context C,
// key K holds an item / a list of items / a compound of items / a list of entities.
const ITEM_PATHS = {
  'java-entity': { equipment: 'item-map', Inventory: 'item-list', Items: 'item-list', Item: 'item', Passengers: 'entity-list' },
  'bedrock-entity': { Armor: 'item-list', Mainhand: 'item-list', Offhand: 'item-list', ChestItems: 'item-list', Inventory: 'item-list', Item: 'item' },
  'java-block-entity': { Items: 'item-list', Book: 'item', RecordItem: 'item', item: 'item' },
  'bedrock-block-entity': { Items: 'item-list', book: 'item', RecordItem: 'item', item: 'item', Item1: 'item', Item2: 'item', Item3: 'item', Item4: 'item' },
};
const editionOf = (ctx) => (ctx && ctx.startsWith('bedrock') ? 'bedrock' : 'java');
// context of the value stored under `key` in a compound of context `parentCtx`
function childCtx(parentCtx, key) {
  if (parentCtx === 'bedrock-item' && key === 'tag') return 'bedrock-item-tag';
  if (parentCtx === 'java-item' && key === 'components') return 'java-item-components';
  const kind = ITEM_PATHS[parentCtx]?.[key];
  if (!kind) return null;
  const ed = editionOf(parentCtx);
  return kind === 'entity-list' ? `list:${ed}-entity` : kind === 'item-list' ? `list:${ed}-item` : kind === 'item-map' ? `map:${ed}-item` : `${ed}-item`;
}
/** Field-specific defaults: in a compound of context `ctx`, key `key` holding `value` reads like no key. */
export const KNOWN_DEFAULTS = [
  { ctx: 'bedrock-item-tag', key: 'Damage', value: 0, why: 'rule 39: the Bedrock game writes tag.Damage:0 on some stacks and not on others (native stacks)' },
  { ctx: 'bedrock-item-tag', key: 'RepairCost', value: 0, why: 'rule 39: same observation for tag.RepairCost:0' },
  { ctx: 'bedrock-item', key: 'tag', value: {}, why: 'rule 39: a tag left empty once its default values are read is no tag' },
  { ctx: 'java-item-components', key: 'minecraft:damage', value: 0, why: 'rule 48 / rule 24: the 26.3 item codec does not save damage 0 (Mojang code run by the normaliser)' },
  { ctx: 'java-item-components', key: 'minecraft:repair_cost', value: 0, why: 'rule 48 / rule 24: same for repair_cost 0' },
  { ctx: 'java-item', key: 'components', value: {}, why: 'rule 2 / rule 24: an empty component patch is not saved by the 26.3 item codec' },
  { ctx: 'bedrock-block-entity', key: 'BlockEntityVersion', value: 0, why: 'rule 54: optional with default 0 in the best public Bedrock schema; native data hold both forms (B01–B03 write 0 on every block entity, GURREN never writes it)' },
];
// Canonical form (v1.3 closure, pass 4): every value is a TAGGED pair — ['c', {k: v}] compound,
// ['l', [...]] list, ['B'|'I'|'L', [...]] byte / int / long array, ['n', exact decimal] number,
// ['s', text] string, plus ['null'], ['empty-stack'] (an empty Bedrock stack in a list of items)
// and ['raw', text] (unparsable). No user value can take another value's form: a compound
// whose key is "B", a string "9007199254740993" or "<empty>" all stay what they are.
// Numbers: the width of a SCALAR is ignored and the comparison is EXACT — integers (and
// integral floats / doubles) are compared by their exact integer value (a long keeps all its
// digits: 2^53 + 1 L is not the double 2^53), other floats / doubles by their exact shortest
// decimal form.
const enc = (x) => (x === 0 ? ['n', '0'] : x && typeof x === 'object' && !Array.isArray(x) && !Object.keys(x).length ? ['c', {}] : x);
const sameVal = (a, b) => JSON.stringify(enc(a)) === JSON.stringify(b);
const exactNumber = (text, suffix) => {
  if (/^(NaN|-?Infinity)$/.test(text)) return text;
  if (suffix === 'L' || /^-?\d+$/.test(text)) return BigInt(text).toString();
  const n = Number(text);
  return Number.isInteger(n) ? BigInt(n).toString() : String(n);
};
/** Parse MCCB's canonical typed text (snbt() above) into tagged nodes {k, v}. */
function parseNodes(text) {
  let i = 0;
  const ws = () => { while (/\s/.test(text[i])) i++; };
  const value = () => {
    ws();
    const c = text[i];
    if (c === '{') {
      i++; const o = {}; ws();
      if (text[i] === '}') { i++; return { k: 'c', v: o }; }
      for (;;) { ws(); const key = str(); ws(); if (text[i++] !== ':') throw new Error(`snbt: ':' expected at ${i}`); put(o, key, value()); ws(); const d = text[i++]; if (d === '}') return { k: 'c', v: o }; if (d !== ',') throw new Error(`snbt: ',' expected at ${i}`); }
    }
    if (c === '[') {
      i++;
      let kind = 'l';
      if (/[BIL]/.test(text[i]) && text[i + 1] === ';') { kind = text[i]; i += 2; }
      const a = []; ws();
      if (text[i] === ']') { i++; return { k: kind, v: a }; }
      for (;;) { a.push(value()); ws(); const d = text[i++]; if (d === ']') return { k: kind, v: a }; if (d !== ',') throw new Error(`snbt: ',' expected at ${i}`); }
    }
    if (c === '"') return { k: 's', v: str() };
    if (text.startsWith('null', i)) { i += 4; return { k: 'null' }; }
    const m = /^(-?(?:\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|Infinity|NaN))([bslLfd]?)/.exec(text.slice(i, i + 400));
    if (!m) throw new Error(`snbt: value expected at ${i}`);
    i += m[0].length;
    return { k: 'n', v: exactNumber(m[1], m[2]) };
  };
  const str = () => { const m = /^"(?:[^"\\]|\\.)*"/.exec(text.slice(i)); if (!m) throw new Error(`snbt: string expected at ${i}`); i += m[0].length; return JSON.parse(m[0]); };
  const v = value(); ws();
  if (i !== text.length) throw new Error(`snbt: trailing data at ${i}`);
  return v;
}
/** The numeric value of a stored scalar (NaN when it is not a number). */
export function numberOf(text) {
  try { const n = parseNodes(text); return n.k === 'n' ? Number(n.v) : NaN; } catch { return NaN; }
}
const isEmptyBedrockStack = (n) => n?.k === 'c' && n.v.Name?.k === 's' && n.v.Count?.k === 'n' && (n.v.Name.v === '' || !(Number(n.v.Count.v) > 0));
// one node read under context `ctx` (null = arbitrary data: no item rule applies)
function readValue(n, ctx) {
  if (n.k === 'l') {
    const el = ctx && ctx.startsWith('list:') ? ctx.slice(5) : null;
    // an EMPTY Bedrock stack is one value whatever its other keys — only in a list of items
    return ['l', n.v.map((e) => (el === 'bedrock-item' && isEmptyBedrockStack(e) ? ['empty-stack'] : readValue(e, el)))];
  }
  if (n.k === 'B' || n.k === 'I' || n.k === 'L') return [n.k, n.v.map((e) => readValue(e, null))];
  if (n.k === 'c') {
    const keys = Object.keys(n.v);
    if (keys.length === 1 && keys[0] === 'text' && n.v.text.k === 's') return ['s', n.v.text.v]; // rule 2
    const here = ctx && ctx.startsWith('map:') ? null : ctx;
    const o = {};
    for (const k of keys.sort()) {
      if ((here === 'bedrock-item' || here === 'java-item') && k === 'Block') { const b = readValue(n.v[k], null); if (b[0] === 'c') delete b[1].version; put(o, k, b); continue; }
      const y = readValue(n.v[k], ctx && ctx.startsWith('map:') ? ctx.slice(4) : childCtx(here, k));
      if (here && KNOWN_DEFAULTS.some((d) => d.ctx === here && d.key === k && sameVal(d.value, y))) continue;
      put(o, k, y);
    }
    return ['c', o];
  }
  if (n.k === 'null') return ['null'];
  return [n.k, n.v];
}
/**
 * The stored value `s` (snbt) as the game reads it. `root` = the context the CALLER knows the
 * value is in ('java-item', 'bedrock-item', 'bedrock-item-tag'…); null = arbitrary data.
 */
export function gameRead(s, { root = null } = {}) {
  if (s == null) return null;
  let v;
  try { v = parseNodes(s); } catch { return JSON.stringify(['raw', s]); }
  const out = readValue(v, root);
  // A root that IS a defaultable container (a Bedrock item tag) reads like none when empty.
  if (root === 'bedrock-item-tag' && out[0] === 'c' && !Object.keys(out[1]).length) return null;
  return JSON.stringify(out);
}
/** gameRead over the {key: snbt} map of a block entity / entity whose context `root` is known. */
export function gameReadMap(m, { root = null } = {}) {
  const o = {};
  for (const [k, v] of Object.entries(m || {})) {
    let y;
    try { y = readValue(parseNodes(v), childCtx(root, k)); } catch { y = ['raw', v]; }
    if (root && KNOWN_DEFAULTS.some((d) => d.ctx === root && d.key === k && sameVal(d.value, y))) continue;
    put(o, k, JSON.stringify(y));
  }
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
