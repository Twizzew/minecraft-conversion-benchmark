// Java Edition world reader (Anvil, 1.18+ chunk format, 26.x layouts).
// Written for MCCB from the public format; imports no converter code.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { parseNbt, get, plain } from '../nbt.mjs';

const REGION_RE = /^r\.(-?\d+)\.(-?\d+)\.mca$/;
const VANILLA_LEGACY = { 'minecraft:overworld': '', 'minecraft:the_nether': 'DIM-1', 'minecraft:the_end': 'DIM1' };

export class JavaWorld {
  constructor(root) {
    this.root = root;
    this.regionCache = new Map(); // file -> Map<index, typedRoot>
    this.cacheOrder = [];
    this.maxCachedRegions = 24;
    this.sectionCache = new WeakMap();
  }

  static async open(root) {
    const w = new JavaWorld(root);
    const lvl = await parseNbt(fs.readFileSync(path.join(root, 'level.dat')));
    w.levelRoot = lvl;
    w.level = get(lvl, 'Data');
    w.dataVersion = plain(get(w.level, 'DataVersion'));
    return w;
  }

  /** Every dimension that has at least one of region/entities/poi, in either layout. */
  dimensions() {
    const dims = new Map();
    const add = (id, base) => {
      const d = { id, base, region: path.join(base, 'region'), entities: path.join(base, 'entities'), poi: path.join(base, 'poi'), data: path.join(base, 'data') };
      if (['region', 'entities', 'poi'].some((k) => fs.existsSync(d[k]))) {
        const prev = dims.get(id);
        if (prev) { (prev.alternates ||= []).push(d); } else dims.set(id, d);
      }
    };
    const dimRoot = path.join(this.root, 'dimensions');
    if (fs.existsSync(dimRoot)) {
      for (const ns of fs.readdirSync(dimRoot)) {
        const nsDir = path.join(dimRoot, ns);
        if (!fs.statSync(nsDir).isDirectory()) continue;
        for (const name of fs.readdirSync(nsDir)) add(`${ns}:${name}`, path.join(nsDir, name));
      }
    }
    for (const [id, sub] of Object.entries(VANILLA_LEGACY)) add(id, sub ? path.join(this.root, sub) : this.root);
    return [...dims.values()].sort((a, b) => a.id.localeCompare(b.id));
  }

  dimension(id) { return this.dimensions().find((d) => d.id === id) || null; }

  regionFiles(dimId, kind = 'region') {
    const d = this.dimension(dimId);
    if (!d) return [];
    const out = [];
    for (const dd of [d, ...(d.alternates || [])]) {
      const dir = dd[kind];
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) {
        const m = f.match(REGION_RE);
        if (m) out.push({ rx: +m[1], rz: +m[2], file: path.join(dir, f) });
      }
    }
    return out.sort((a, b) => a.rx - b.rx || a.rz - b.rz);
  }

  /** Map<index 0..1023, typed chunk root> for one region file (cached). */
  async readRegion(file) {
    if (this.regionCache.has(file)) return this.regionCache.get(file);
    const chunks = new Map();
    const errors = [];
    const b = fs.readFileSync(file);
    if (b.length >= 8192) {
      for (let i = 0; i < 1024; i++) {
        const loc = b.readUInt32BE(i * 4);
        const off = loc >>> 8, cnt = loc & 0xff;
        if (!off || !cnt) continue;
        const pos = off * 4096;
        try {
          if (pos + 5 > b.length) throw new Error('sector beyond end of file');
          const len = b.readUInt32BE(pos);
          let ct = b[pos + 4];
          let payload;
          if (ct & 0x80) {
            const m = path.basename(file).match(REGION_RE);
            const cx = +m[1] * 32 + (i & 31), cz = +m[2] * 32 + (i >> 5);
            payload = fs.readFileSync(path.join(path.dirname(file), `c.${cx}.${cz}.mcc`));
            ct &= 0x7f;
          } else payload = b.subarray(pos + 5, pos + 4 + len);
          let raw;
          if (ct === 1) raw = zlib.gunzipSync(payload);
          else if (ct === 2) raw = zlib.inflateSync(payload);
          else if (ct === 3) raw = payload;
          else throw new Error(`unsupported compression type ${ct}`);
          chunks.set(i, await parseNbt(raw));
        } catch (e) {
          errors.push({ index: i, error: String(e.message || e) });
        }
      }
    }
    chunks.errors = errors;
    this.regionCache.set(file, chunks);
    this.cacheOrder.push(file);
    while (this.cacheOrder.length > this.maxCachedRegions) this.regionCache.delete(this.cacheOrder.shift());
    return chunks;
  }

  regionFileFor(dimId, cx, cz, kind = 'region') {
    const rx = Math.floor(cx / 32), rz = Math.floor(cz / 32);
    return this.regionFiles(dimId, kind).filter((r) => r.rx === rx && r.rz === rz).map((r) => r.file);
  }

  async chunk(dimId, cx, cz, kind = 'region') {
    for (const f of this.regionFileFor(dimId, cx, cz, kind)) {
      const chunks = await this.readRegion(f);
      const c = chunks.get(((cz & 31) << 5) | (cx & 31));
      if (c) return c;
    }
    return null;
  }

  /** Iterate every chunk of a dimension: yields { cx, cz, tag }. */
  async *chunks(dimId, kind = 'region') {
    for (const r of this.regionFiles(dimId, kind)) {
      const chunks = await this.readRegion(r.file);
      for (const [i, tag] of chunks) yield { cx: r.rx * 32 + (i & 31), cz: r.rz * 32 + (i >> 5), tag, file: r.file };
    }
  }

  /** Decoded sections of a chunk: Map<sectionY, { palette:[{name,props}], idx:Uint16Array|null }>. */
  sections(chunkTag) {
    if (this.sectionCache.has(chunkTag)) return this.sectionCache.get(chunkTag);
    const out = new Map();
    const root = get(chunkTag, 'Level') || chunkTag;
    const secs = get(root, 'sections') || get(root, 'Sections');
    for (const s of plainList(secs)) {
      const y = numberOf(s.value.Y);
      const bs = s.value.block_states;
      if (!bs) continue;
      const pal = bs.value.palette;
      const palette = pal ? readPalette(pal) : [{ name: 'minecraft:air', props: {} }];
      const data = bs.value.data;
      out.set(y, { palette, idx: data ? unpack(data.value, palette.length, 4) : null });
    }
    this.sectionCache.set(chunkTag, out);
    return out;
  }

  /** { name, props } of the block at world coordinates, or null when the chunk is absent. */
  async blockAt(dimId, x, y, z) {
    const c = await this.chunk(dimId, Math.floor(x / 16), Math.floor(z / 16));
    if (!c) return null;
    return this.blockInChunk(c, x, y, z);
  }

  blockInChunk(chunkTag, x, y, z) {
    const s = this.sections(chunkTag).get(Math.floor(y / 16));
    if (!s) return { name: 'minecraft:air', props: {}, missingSection: true };
    const i = ((y & 15) << 8) | ((z & 15) << 4) | (x & 15);
    const p = s.idx ? s.palette[s.idx[i]] : s.palette[0];
    return p || { name: '?', props: {}, badIndex: true };
  }

  /** Block entities of a chunk keyed "x,y,z". */
  blockEntities(chunkTag) {
    if (chunkTag && typeof chunkTag === 'object') {
      this.beCache ||= new WeakMap();
      const hit = this.beCache.get(chunkTag);
      if (hit) return hit;
      const m = this._blockEntities(chunkTag);
      this.beCache.set(chunkTag, m);
      return m;
    }
    return this._blockEntities(chunkTag);
  }

  _blockEntities(chunkTag) {
    const root = get(chunkTag, 'Level') || chunkTag;
    const list = get(root, 'block_entities') || get(root, 'TileEntities');
    const m = new Map();
    for (const be of plainList(list)) {
      const x = numberOf(be.value.x), y = numberOf(be.value.y), z = numberOf(be.value.z);
      m.set(`${x},${y},${z}`, be);
    }
    return m;
  }

  async blockEntityAt(dimId, x, y, z) {
    const c = await this.chunk(dimId, Math.floor(x / 16), Math.floor(z / 16));
    if (!c) return null;
    return this.blockEntities(c).get(`${x},${y},${z}`) || null;
  }

  /** All entities of a dimension: entity files + entities still pending in proto-chunks. */
  async entities(dimId) {
    const out = [];
    for await (const { cx, cz, tag } of this.chunks(dimId, 'entities')) {
      for (const e of plainList(get(tag, 'Entities'))) out.push({ tag: e, chunk: [cx, cz], origin: 'entity_storage' });
    }
    for await (const { cx, cz, tag } of this.chunks(dimId, 'region')) {
      const root = get(tag, 'Level') || tag;
      const status = plain(get(root, 'Status'));
      for (const e of plainList(get(root, 'entities') || get(root, 'Entities'))) {
        out.push({ tag: e, chunk: [cx, cz], origin: 'proto_chunk', chunkStatus: status });
      }
    }
    return out;
  }

  playerFiles() {
    const out = [];
    for (const rel of [path.join('players', 'data'), 'playerdata']) {
      const dir = path.join(this.root, rel);
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) if (/\.dat$/.test(f)) out.push({ uuid: f.replace(/\.dat$/, ''), file: path.join(dir, f) });
    }
    return out;
  }

  async readDat(rel) {
    const f = path.join(this.root, rel);
    if (!fs.existsSync(f)) return null;
    return parseNbt(fs.readFileSync(f));
  }

  /** Saved data file in either layout: data/minecraft/<n>.dat or data/<n>.dat. */
  async savedData(name, dimId = null) {
    const bases = [];
    if (dimId) {
      const d = this.dimension(dimId);
      if (d) bases.push(path.relative(this.root, d.data));
    }
    bases.push('data');
    for (const b of bases) {
      for (const rel of [path.join(b, 'minecraft', `${name}.dat`), path.join(b, `${name}.dat`)]) {
        const t = await this.readDat(rel);
        if (t) return { rel, tag: t };
      }
    }
    return null;
  }
}

// ── helpers ─────────────────────────────────────────────────────────────────
export function plainList(t) {
  if (!t || t.type !== 'list') return [];
  return (t.value.value || []).map((v) => ({ type: t.value.type, value: v }));
}
function numberOf(t) {
  if (t == null) return undefined;
  const v = t.value;
  return typeof v === 'number' ? v : Number(plain(t));
}

/** Palette entries in any of the four 26.x forms (+ legacy Name/Properties). */
export function readPalette(pal) {
  return plainList(pal).map((e) => readPaletteEntry(e));
}
export function readPaletteEntry(e) {
  if (e.type === 'string') return { name: e.value, props: {}, form: 'string' };
  const v = e.value;
  if (v.Name) return { name: v.Name.value, props: propsOf(v.Properties), form: 'Name/Properties' };
  if (v.id && v.id.type === 'string') return { name: v.id.value, props: propsOf(v.properties), form: 'id/properties' };
  if (v[''] && v[''].type === 'string') return { name: v[''].value, props: {}, form: 'empty-key' };
  return { name: '?', props: {}, form: 'unknown', raw: plain(e) };
}
function propsOf(t) {
  const o = {};
  if (t && t.type === 'compound') for (const [k, v] of Object.entries(t.value)) o[k] = String(v.value);
  return o;
}

/** Unpack a packed long array (1.16+ layout: entries never span two longs). */
export function unpack(longs, paletteSize, minBits) {
  const bits = Math.max(minBits, Math.ceil(Math.log2(Math.max(paletteSize, 1))));
  const perLong = Math.floor(64 / bits);
  const mask = bits >= 32 ? 0xffffffff : (1 << bits) - 1;
  const out = new Uint16Array(4096);
  for (let i = 0; i < 4096; i++) {
    const li = Math.floor(i / perLong);
    const off = (i % perLong) * bits;
    const pair = longs[li];
    if (!pair) break;
    const hi = pair[0] >>> 0, lo = pair[1] >>> 0;
    let v;
    if (off + bits <= 32) v = (lo >>> off) & mask;
    else if (off >= 32) v = (hi >>> (off - 32)) & mask;
    else {
      const lowBits = 32 - off;
      v = ((lo >>> off) | ((hi & ((1 << (bits - lowBits)) - 1)) << lowBits)) & mask;
    }
    out[i] = v;
  }
  return out;
}
