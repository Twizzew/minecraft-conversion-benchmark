// Bedrock Edition world reader (LevelDB, sub-chunk formats 8/9, modern actor storage).
// Written for MCCB from the public format; imports no converter code.
//
// LevelDB rewrites its own files when a database is opened, so the `db` folder is
// always COPIED to a private scratch directory first: the extracted source tree is
// never modified.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { parseAllLittle, parseOneLittle, parseNbt, get, plain, prismarine as _nbt } from '../nbt.mjs';
const require = createRequire(import.meta.url);
const { LevelDB } = require('leveldb-zlib');

export const DIM_NAMES = { 0: 'minecraft:overworld', 1: 'minecraft:the_nether', 2: 'minecraft:the_end' };
export const TAG = {
  Data3D: 0x2b, Version: 0x2c, Data2D: 0x2d, Data2DLegacy: 0x2e, SubChunkPrefix: 0x2f, LegacyTerrain: 0x30,
  BlockEntity: 0x31, Entity: 0x32, PendingTicks: 0x33, BlockExtraData: 0x34, BiomeState: 0x35,
  FinalizedState: 0x36, BorderBlocks: 0x38, HardcodedSpawners: 0x39, RandomTicks: 0x3a, Checksums: 0x3b,
  MetaDataHash: 0x3d, GeneratedPreCavesAndCliffsBlending: 0x3e, BlendingBiomeHeight: 0x3f, BlendingData: 0x40,
  ActorDigestVersion: 0x41, LegacyVersion: 0x76,
  StructureData: 0x77, // MCCB v1.3 (family "structure"): per-chunk structure pieces
};
const TAG_NAME = Object.fromEntries(Object.entries(TAG).map(([k, v]) => [v, k]));

export class BedrockWorld {
  constructor(root) {
    this.root = root;
    this.chunkKeys = new Map();   // "dim,cx,cz" -> Map<tagKey, Buffer>  (tagKey = tag or `47:<y>`)
    this.actors = new Map();      // uidHex -> Buffer
    this.digp = new Map();        // "dim,cx,cz" -> Buffer (list of 8-byte ids)
    this.named = new Map();       // string key -> Buffer
    this.otherKeys = [];          // unparsed binary keys (hex)
    this.subchunkCache = new Map();
  }

  static async open(root, { scratch } = {}) {
    const w = new BedrockWorld(root);
    const lvl = fs.readFileSync(path.join(root, 'level.dat'));
    w.levelHeader = { storageVersion: lvl.readInt32LE(0), length: lvl.readInt32LE(4) };
    w.levelRoot = await parseNbt(lvl.subarray(8, 8 + w.levelHeader.length), 'little');
    w.level = w.levelRoot;
    const tmpBase = scratch || fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-db-'));
    const dbCopy = path.join(tmpBase, 'db');
    fs.cpSync(path.join(root, 'db'), dbCopy, { recursive: true });
    w.scratch = tmpBase;
    const db = new LevelDB(dbCopy, { createIfMissing: false });
    await db.open();
    try {
      const it = db.getIterator({ keys: true, values: true });
      for await (const [k, v] of it) w.#index(Buffer.from(k), Buffer.from(v));
    } finally {
      await db.close();
    }
    return w;
  }

  cleanup() { try { fs.rmSync(this.scratch, { recursive: true, force: true }); } catch { /* best effort */ } }

  #index(key, value) {
    const chunk = parseChunkKey(key);
    if (chunk) {
      const id = `${chunk.dim},${chunk.cx},${chunk.cz}`;
      if (!this.chunkKeys.has(id)) this.chunkKeys.set(id, new Map());
      const tk = chunk.tag === TAG.SubChunkPrefix ? `47:${chunk.sub}` : String(chunk.tag);
      this.chunkKeys.get(id).set(tk, value);
      return;
    }
    const s = key.toString('latin1');
    if (s.startsWith('actorprefix') && key.length === 19) { this.actors.set(key.subarray(11).toString('hex'), value); return; }
    if (s.startsWith('digp') && (key.length === 12 || key.length === 16)) {
      const cx = key.readInt32LE(4), cz = key.readInt32LE(8), dim = key.length === 16 ? key.readInt32LE(12) : 0;
      this.digp.set(`${dim},${cx},${cz}`, value); return;
    }
    if (/^[\x20-\x7e]+$/.test(s)) { this.named.set(s, value); return; }
    this.otherKeys.push({ key: key.toString('hex'), bytes: value.length });
  }

  chunkIds(dim = null) {
    return [...this.chunkKeys.keys()].map((k) => k.split(',').map(Number))
      .filter(([d]) => dim === null || d === dim).map(([d, cx, cz]) => ({ dim: d, cx, cz }));
  }

  chunkTags(dim, cx, cz) { return this.chunkKeys.get(`${dim},${cx},${cz}`) || null; }

  /** Decoded sub-chunk: { version, y, layers:[{ palette:[{name,states,version}], idx:Uint16Array|null }] } */
  subchunk(dim, cx, cz, sy) {
    const key = `${dim},${cx},${cz},${sy}`;
    if (this.subchunkCache.has(key)) return this.subchunkCache.get(key);
    const tags = this.chunkTags(dim, cx, cz);
    const buf = tags && tags.get(`47:${sy}`);
    const out = buf ? decodeSubChunk(buf) : null;
    if (this.subchunkCache.size > 20000) this.subchunkCache.clear();
    this.subchunkCache.set(key, out);
    return out;
  }

  /** Block at world coordinates: { name, states, layer1?:{name,states} } or null if chunk absent. */
  blockAt(dim, x, y, z) {
    const cx = Math.floor(x / 16), cz = Math.floor(z / 16);
    if (!this.chunkTags(dim, cx, cz)) return null;
    const sc = this.subchunk(dim, cx, cz, Math.floor(y / 16));
    if (!sc) return { name: 'minecraft:air', states: {}, missingSubchunk: true };
    const i = ((x & 15) << 8) | ((z & 15) << 4) | (y & 15);
    const at = (layer) => {
      if (!layer) return null;
      const p = layer.idx ? layer.palette[layer.idx[i]] : layer.palette[0];
      return p ? { name: p.name, states: p.states, version: p.version } : { name: '?', states: {}, badIndex: true };
    };
    const b = at(sc.layers[0]) || { name: 'minecraft:air', states: {} };
    const l1 = at(sc.layers[1]);
    if (l1 && l1.name !== 'minecraft:air') b.layer1 = l1;
    return b;
  }

  /** Block entities of a chunk keyed "x,y,z" (typed NBT). */
  blockEntities(dim, cx, cz) {
    const key = `${dim},${cx},${cz}`;
    this.beCache ||= new Map();
    if (this.beCache.has(key)) return this.beCache.get(key);
    const buf = this.chunkTags(dim, cx, cz)?.get(String(TAG.BlockEntity));
    const m = new Map();
    if (buf) {
      for (const t of parseAllLittle(buf)) {
        const p = t.value;
        m.set(`${p.x?.value},${p.y?.value},${p.z?.value}`, t);
      }
    }
    if (this.beCache.size > 4096) this.beCache.clear();
    this.beCache.set(key, m);
    return m;
  }

  blockEntityAt(dim, x, y, z) {
    return this.blockEntities(dim, Math.floor(x / 16), Math.floor(z / 16)).get(`${x},${y},${z}`) || null;
  }

  /** Every actor: modern (actorprefix + digp) and legacy (tag 0x32) storage. */
  allActors() {
    const out = [];
    const listed = new Set();
    for (const [chunkId, buf] of this.digp) {
      const [dim, cx, cz] = chunkId.split(',').map(Number);
      for (let o = 0; o + 8 <= buf.length; o += 8) {
        const uid = buf.subarray(o, o + 8).toString('hex');
        listed.add(uid);
        const v = this.actors.get(uid);
        if (v) out.push({ uid, dim, chunk: [cx, cz], tag: parseOneLittle(v), storage: 'actorprefix' });
        else out.push({ uid, dim, chunk: [cx, cz], tag: null, storage: 'digp_dangling' });
      }
    }
    for (const [uid, v] of this.actors) {
      if (!listed.has(uid)) out.push({ uid, dim: null, chunk: null, tag: parseOneLittle(v), storage: 'actorprefix_unlisted' });
    }
    for (const [chunkId, tags] of this.chunkKeys) {
      const buf = tags.get(String(TAG.Entity));
      if (!buf) continue;
      const [dim, cx, cz] = chunkId.split(',').map(Number);
      for (const t of parseAllLittle(buf)) out.push({ uid: null, dim, chunk: [cx, cz], tag: t, storage: 'legacy_0x32' });
    }
    return out;
  }

  namedNbt(key) {
    const v = this.named.get(key);
    if (!v) return null;
    try { return parseAllLittle(v); } catch { return null; }
  }

  keySummary() {
    const tagCounts = {};
    for (const tags of this.chunkKeys.values()) {
      for (const k of tags.keys()) {
        const n = k.startsWith('47:') ? 'SubChunkPrefix' : (TAG_NAME[+k] || `0x${(+k).toString(16)}`);
        tagCounts[n] = (tagCounts[n] || 0) + 1;
      }
    }
    const namedPrefixes = {};
    for (const k of this.named.keys()) {
      const p = k.replace(/[0-9a-f-]{8,}.*$/i, '*').replace(/_\d+$/, '_*');
      namedPrefixes[p] = (namedPrefixes[p] || 0) + 1;
    }
    return { chunks: this.chunkKeys.size, tagCounts, actors: this.actors.size, digp: this.digp.size, named: namedPrefixes, other: this.otherKeys.length };
  }
}

export function parseChunkKey(k) {
  const len = k.length;
  if (len !== 9 && len !== 10 && len !== 13 && len !== 14) return null;
  const withDim = len >= 13;
  const tag = k[withDim ? 12 : 8];
  if (!(tag in TAG_NAME)) return null;
  if ((len === 10 || len === 14) !== (tag === TAG.SubChunkPrefix)) return null;
  const cx = k.readInt32LE(0), cz = k.readInt32LE(4);
  const dim = withDim ? k.readInt32LE(8) : 0;
  if (withDim && (dim < 0 || dim > 16)) return null;
  const sub = tag === TAG.SubChunkPrefix ? k.readInt8(len - 1) : null;
  return { cx, cz, dim, tag, sub };
}

/** Decode a SubChunkPrefix value (versions 8 and 9; version 1 = single layer). */
export function decodeSubChunk(buf) {
  let o = 0;
  const version = buf[o++];
  if (version !== 1 && version !== 8 && version !== 9) return { version, unsupported: true, layers: [] };
  const count = version === 1 ? 1 : buf[o++];
  let y = null;
  if (version === 9) y = buf.readInt8(o++);
  const layers = [];
  for (let s = 0; s < count; s++) {
    const header = buf[o++];
    const bits = header >> 1;
    const runtime = header & 1;
    let idx = null;
    if (bits > 0) {
      const perWord = Math.floor(32 / bits);
      const words = Math.ceil(4096 / perWord);
      idx = new Uint16Array(4096);
      const mask = (1 << bits) - 1;
      for (let i = 0; i < 4096; i++) {
        const w = buf.readUInt32LE(o + Math.floor(i / perWord) * 4);
        idx[i] = (w >>> ((i % perWord) * bits)) & mask;
      }
      o += words * 4;
    }
    if (runtime) return { version, y, layers, runtimeIds: true };
    // A single-value storage (0 bits per block) may omit the palette size: the one NBT
    // compound (tag 0x0a) follows the header directly (observed in the survival world
    // GURREN: `00 0a 00 00 08 04 00 "name"…`). Otherwise the size is an int32.
    let n;
    if (bits === 0 && buf[o] === 0x0a) n = 1;
    else { n = buf.readInt32LE(o); o += 4; }
    const palette = [];
    for (let p = 0; p < n; p++) {
      const r = nbtLittleAt(buf, o);
      o += r.size;
      const v = r.data.value;
      palette.push({ name: v.name?.value, states: statesOf(v.states), version: v.version?.value ?? null });
    }
    layers.push({ palette, idx });
  }
  return { version, y, layers };
}

function nbtLittleAt(buf, off) {
  const r = _nbt.protos.little.parsePacketBuffer('nbt', buf, off);
  return { data: r.data, size: r.metadata.size };
}
function statesOf(t) {
  const o = {};
  if (t && t.type === 'compound') for (const [k, v] of Object.entries(t.value)) o[k] = v.type === 'byte' ? v.value : v.value;
  return o;
}

/** Actor helpers */
export function actorIdentifier(tag) { return tag ? plain(get(tag, 'identifier')) : null; }
export function actorPos(tag) {
  const p = plain(get(tag, 'Pos'));
  return Array.isArray(p) ? p.map(Number) : null;
}
