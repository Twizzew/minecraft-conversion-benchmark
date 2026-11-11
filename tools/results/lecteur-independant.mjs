// MCCB 2026-11 — lecteur INDÉPENDANT (vérification) : n'utilise AUCUN module de tools/lib.
// Lit directement les fichiers du jeu avec prismarine-nbt et leveldb-zlib :
//   Java  : region/*.mca (en-tête, zlib/gzip, sections block_states, block_entities, Items)
//   Bedrock : db/ LevelDB (sous-chunks 0x2f v8/v9 et palettes NBT LE, blocs-entités 0x31)
// Monde ouvert = dossier déjà extrait (copie de travail, jamais une source).
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const nbt = require('prismarine-nbt');
const { LevelDB } = require('leveldb-zlib');

const DIMS_J = { 'minecraft:overworld': '', 'minecraft:the_nether': 'DIM-1', 'minecraft:the_end': 'DIM1' };
const DIMS_B = { 'minecraft:overworld': 0, 'minecraft:the_nether': 1, 'minecraft:the_end': 2 };
const fl = (x) => Math.floor(x);

export class JavaMonde {
  // root : dossier, ou { zip: AdmZip, prefixe } pour lire dans l'archive sans l'extraire
  constructor(root) {
    this.cache = new Map(); this.regions = new Map(); this.zip = root.zip || null;
    this.root = this.zip ? root.prefixe : root;
    this.j = this.zip ? path.posix.join : path.join;
    if (this.zip) this.noms = new Set(this.zip.getEntries().map((e) => e.entryName));
  }
  existe(f) { return this.zip ? [...this.noms].some((n) => n.startsWith(f + '/')) : fs.existsSync(f); }
  lire(f) {
    if (!this.zip) return fs.existsSync(f) ? fs.readFileSync(f) : null;
    if (!this.noms.has(f)) return null;
    if (!this.regions.has(f)) { if (this.regions.size > 48) this.regions.delete(this.regions.keys().next().value); this.regions.set(f, this.zip.getEntry(f).getData()); }
    return this.regions.get(f);
  }
  dirDe(dim) {
    if ((this.dirs ||= new Map()).has(dim)) return this.dirs.get(dim);
    const d = this.dirDe0(dim); this.dirs.set(dim, d); return d;
  }
  dirDe0(dim) {
    // Java 26 : toutes les dimensions sous dimensions/<ns>/<nom>/ ; avant : region/, DIM-1/, DIM1/
    const [ns, n] = dim.split(':');
    const neuf = this.j(this.root, 'dimensions', ns, n, 'region');
    if (this.existe(neuf) || !(dim in DIMS_J)) return neuf;
    return this.j(this.root, DIMS_J[dim], 'region');
  }
  chunk(dim, cx, cz) {
    const k = `${dim}|${cx}|${cz}`;
    if (this.cache.has(k)) return this.cache.get(k);
    let res = null;
    const f = this.j(this.dirDe(dim), `r.${cx >> 5}.${cz >> 5}.mca`);
    const b = this.lire(f);
    if (b && b.length >= 8192) {
      const i = 4 * ((cx & 31) + (cz & 31) * 32);
      const off = (b[i] << 16 | b[i + 1] << 8 | b[i + 2]) * 4096;
      if (off) {
        const len = b.readUInt32BE(off), comp = b[off + 4];
        const data = b.subarray(off + 5, off + 4 + len);
        const raw = comp === 2 ? zlib.inflateSync(data) : comp === 1 ? zlib.gunzipSync(data) : comp === 3 ? data : null;
        if (raw) res = nbt.simplify(nbt.parseUncompressed(raw, 'big'));
      }
    }
    this.cache.set(k, res); return res;
  }
  bloc(dim, [x, y, z]) {
    const c = this.chunk(dim, fl(x) >> 4, fl(z) >> 4);
    if (!c) return { absent: 'chunk' };
    const sec = (c.sections || []).find((s) => s.Y === (fl(y) >> 4));
    const bs = sec?.block_states;
    if (!bs) return { name: 'minecraft:air', states: {}, note: 'section absente' };
    // entrée de palette : {Name, Properties} (ancien), {id, properties} ou chaîne seule (liste hétérogène → {"": nom})
    const pal = bs.palette.map((p) => (typeof p === 'string' ? { Name: p } : { Name: p.Name ?? p.id ?? p[''], Properties: p.Properties ?? p.properties }));
    if (pal.length === 1 || !bs.data) return { name: pal[0].Name, states: pal[0].Properties || {} };
    const bits = Math.max(4, Math.ceil(Math.log2(pal.length)));
    const idx = ((fl(y) & 15) << 8) | ((fl(z) & 15) << 4) | (fl(x) & 15);
    const per = Math.floor(64 / bits);
    const w = bs.data[Math.floor(idx / per)];
    const big = (BigInt.asUintN(32, BigInt(w[0])) << 32n) | BigInt.asUintN(32, BigInt(w[1]));
    const v = Number((big >> BigInt((idx % per) * bits)) & ((1n << BigInt(bits)) - 1n));
    const p = pal[v];
    return { name: p.Name, states: p.Properties || {} };
  }
  blocEntite(dim, [x, y, z]) {
    const c = this.chunk(dim, fl(x) >> 4, fl(z) >> 4);
    if (!c) return null;
    return (c.block_entities || []).find((e) => e.x === x && e.y === y && e.z === z) || null;
  }
  async fermer() {}
}

function lireNbtLE(buf) {
  const out = []; let off = 0;
  while (off < buf.length) {
    const { data, metadata } = nbt.protos.little.parsePacketBuffer('nbt', buf, off);
    out.push(nbt.simplify(data)); off += metadata.size;
  }
  return out;
}
const cle = (cx, cz, dim, tag, extra) => {
  const parts = [Buffer.alloc(8)]; parts[0].writeInt32LE(cx, 0); parts[0].writeInt32LE(cz, 4);
  if (dim) { const d = Buffer.alloc(4); d.writeInt32LE(dim); parts.push(d); }
  parts.push(Buffer.from([tag])); if (extra !== undefined) parts.push(Buffer.from([extra & 255]));
  return Buffer.concat(parts);
};

export class BedrockMonde {
  constructor(root) { this.root = root; this.sc = new Map(); this.be = new Map(); }
  async ouvrir() { this.db = new LevelDB(path.join(this.root, 'db'), { createIfMissing: false }); await this.db.open(); return this; }
  async sousChunk(dim, cx, sy, cz) {
    const k = `${dim}|${cx}|${sy}|${cz}`;
    if (this.sc.has(k)) return this.sc.get(k);
    let res = null;
    const b = await this.db.get(cle(cx, cz, DIMS_B[dim], 0x2f, sy));
    if (b) {
      const v = b[0]; let off = 1, n = 1;
      if (v === 8 || v === 9) { n = b[off++]; if (v === 9) off++; }
      else { res = { version: v }; this.sc.set(k, res); return res; }
      const couches = [];
      for (let l = 0; l < n; l++) {
        const h = b[off++]; const bits = h >> 1;
        let idx = null;
        if (bits) {
          const per = Math.floor(32 / bits), words = Math.ceil(4096 / per);
          idx = new Uint16Array(4096);
          for (let i = 0; i < 4096; i++) { const w = b.readUInt32LE(off + 4 * Math.floor(i / per)); idx[i] = (w >>> ((i % per) * bits)) & ((1 << bits) - 1); }
          off += 4 * words;
        }
        // couche uniforme (bits 0) : certains écrivains omettent la taille de palette (1 entrée, NBT direct)
        let np; if (!bits && b[off] === 0x0a) np = 1; else { np = b.readInt32LE(off); off += 4; }
        const pal = [];
        try { for (let p = 0; p < np; p++) { const { data, metadata } = nbt.protos.little.parsePacketBuffer('nbt', b, off); pal.push(nbt.simplify(data)); off += metadata.size; } }
        catch (e) { res = { version: v, illisible: `palette couche ${l} : ${String(e.message).slice(0, 80)}`, octets: b.subarray(0, 24).toString('hex') }; this.sc.set(k, res); return res; }
        couches.push({ idx, pal });
      }
      res = { version: v, couches };
    }
    this.sc.set(k, res); return res;
  }
  async bloc(dim, [x, y, z], couche = 0) {
    const s = await this.sousChunk(dim, fl(x) >> 4, fl(y) >> 4, fl(z) >> 4);
    if (!s) return { name: 'minecraft:air', states: {}, note: 'sous-chunk absent' };
    if (!s.couches) return { absent: s.illisible ? `sous-chunk illisible (${s.illisible}) ${s.octets}` : `sous-chunk v${s.version}` };
    const L = s.couches[couche];
    if (!L) return { name: 'minecraft:air', states: {} };
    const i = ((fl(x) & 15) << 8) | ((fl(z) & 15) << 4) | (fl(y) & 15);
    const p = L.pal[L.idx ? L.idx[i] : 0];
    return { name: p.name, states: p.states || {}, version: p.version };
  }
  async blocsEntites(dim, cx, cz) {
    const k = `${dim}|${cx}|${cz}`;
    if (!this.be.has(k)) { const b = await this.db.get(cle(cx, cz, DIMS_B[dim], 0x31)); this.be.set(k, b ? lireNbtLE(b) : []); }
    return this.be.get(k);
  }
  async blocEntite(dim, [x, y, z]) {
    return (await this.blocsEntites(dim, fl(x) >> 4, fl(z) >> 4)).find((e) => e.x === x && e.y === y && e.z === z) || null;
  }
  async fermer() { await this.db.close(); }
}

// Comptes globaux (vérification d'exhaustivité) : blocs-entités et entités de TOUT le monde, par type.
export function compterJava(w) {
  const be = {}, ent = {};
  const fichiers = w.zip ? [...w.noms].filter((n) => /\.mca$/.test(n)) : [];
  for (const f of fichiers) {
    const b = w.zip.getEntry(f).getData(); if (b.length < 8192) continue;
    const ents = /(^|\/)entities\//.test(f);
    if (!/(^|\/)(region|entities)\//.test(f)) continue;
    for (let i = 0; i < 1024; i++) {
      const off = (b[4 * i] << 16 | b[4 * i + 1] << 8 | b[4 * i + 2]) * 4096; if (!off) continue;
      const len = b.readUInt32BE(off), comp = b[off + 4], data = b.subarray(off + 5, off + 4 + len);
      let raw; try { raw = comp === 2 ? zlib.inflateSync(data) : comp === 1 ? zlib.gunzipSync(data) : comp === 3 ? data : null; } catch { continue; }
      if (!raw) continue;
      const c = nbt.simplify(nbt.parseUncompressed(raw, 'big'));
      if (ents) for (const e of c.Entities || []) ent[e.id] = (ent[e.id] || 0) + 1;
      else {
        for (const e of c.block_entities || []) be[e.id] = (be[e.id] || 0) + 1;
        // chunk pas fini de générer (proto-chunk) : ses entités en attente sont dans la région (`entities`)
        for (const e of c.entities || []) ent[e.id] = (ent[e.id] || 0) + 1;
      }
    }
  }
  return { be, ent };
}
export async function compterBedrock(w) {
  const be = {}, ent = {};
  for await (const [k, v] of w.db.getIterator({ keys: true, values: true })) {
    const t = k.length === 9 ? k[8] : k.length === 13 ? k[12] : null;
    if (t === 0x31) for (const e of lireNbtLE(v)) be[e.id] = (be[e.id] || 0) + 1;
    else if (k.length > 11 && k.subarray(0, 11).toString() === 'actorprefix') { const e = lireNbtLE(v)[0]; ent[e.identifier] = (ent[e.identifier] || 0) + 1; }
    else if (t === 0x32) for (const e of lireNbtLE(v)) ent[e.identifier] = (ent[e.identifier] || 0) + 1; // ancien format d'entités par chunk
  }
  return { be, ent };
}
