// Structure data of both editions, read for the family "structure" (MCCB v1.3, oracle defect
// F13). Written for MCCB from the formats documented in docs/fixture-rules.md §3.9; imports no
// converter code.
//
// What each edition uses to decide that a position is "inside a structure" (structure mobs
// spawn there: blazes, guardians, witches, pillagers, …):
//   • Java: the chunk holding the position lists, in `structures.References[id]`, the chunks
//     holding the START of structure `id`; the position must lie in the bounding box of one
//     of that start's pieces (StructureManager.getStructureWithPieceAt). Ocean monuments are
//     the one exception: at load the game throws the stored pieces away and rebuilds the
//     monument from the first piece's corner (OceanMonumentStructure.regeneratePiecesAfterLoad
//     → MonumentBuilding: makeBoundingBox(minX, 39, minZ, …, 58, 23, 58), read in the 26.3 jar).
//   • Bedrock: chunk key 0x39 (HardcodedSpawners: spawn areas typed 1 fortress, 2 swamp hut,
//     3 monument, 5 pillager outpost) and chunk key 0x77 (per-chunk structure pieces; one of
//     the boxes of a chunk is the structure's bounding box cut to the chunk, the others are its
//     pieces).
import { plain, get } from './nbt.mjs';
import { plainList, readPalette } from './java/world.mjs';

export const JAVA_DIMS = [['minecraft:overworld', 0], ['minecraft:the_nether', 1], ['minecraft:the_end', 2]];
export const SPAWN_TYPE_TO_JAVA = { 1: 'minecraft:fortress', 2: 'minecraft:swamp_hut', 3: 'minecraft:monument', 5: 'minecraft:pillager_outpost' };
export const JAVA_TO_SPAWN_TYPE = Object.fromEntries(Object.entries(SPAWN_TYPE_TO_JAVA).map(([k, v]) => [v, Number(k)]));
// Bedrock structure names that differ from the Java structure id (both registries).
const BEDROCK_NAME_TO_JAVA = { 'minecraft:jungle_temple': 'minecraft:jungle_pyramid' };
const JAVA_TO_BEDROCK_NAME = Object.fromEntries(Object.entries(BEDROCK_NAME_TO_JAVA).map(([b, j]) => [j, b]));
export const javaIdOfBedrock = (name) => BEDROCK_NAME_TO_JAVA[name] || name;
export const bedrockNameOfJava = (id) => JAVA_TO_BEDROCK_NAME[id] || id;
// Java structures for which a NATIVE Bedrock world of the corpus stores structure data (0x77 names
// or 0x39 types seen in B01–B03, GURREN and the reference world fortress.mcworld). For any other
// structure MCCB has no native reference of what Bedrock should hold: its direct conversion is
// NOT_EVALUATED (never counted), its round trip is judged.
export const JAVA_WITH_NATIVE_BEDROCK_DATA = new Set(['minecraft:fortress', 'minecraft:monument', 'minecraft:pillager_outpost',
  'minecraft:swamp_hut', 'minecraft:igloo', 'minecraft:trial_chambers', 'minecraft:trail_ruins']);

// Java chunk statuses that come BEFORE decoration (features). 26.3 order: empty,
// structure_starts, structure_references, biomes, terrain, features, … full (26.3; worlds written by
// earlier versions: noise, surface, carvers, liquid_carvers instead of terrain).
export const JAVA_STATUS_BEFORE_FEATURES = new Set(['empty', 'structure_starts', 'structure_references', 'biomes', 'terrain', 'noise', 'surface', 'carvers', 'liquid_carvers']);
export const javaStatus = (tag) => String(plain(get(get(tag, 'Level') || tag, 'Status')) || 'full').replace(/^minecraft:/, '');

export const inBox = (p, bb) => p[0] >= bb[0] && p[0] <= bb[3] && p[1] >= bb[1] && p[1] <= bb[4] && p[2] >= bb[2] && p[2] <= bb[5];
const union = (a, b) => [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2]), Math.max(a[3], b[3]), Math.max(a[4], b[4]), Math.max(a[5], b[5])];
const validBox = (bb) => bb[0] <= bb[3] && bb[1] <= bb[4] && bb[2] <= bb[5];
/** Centre and 8 corners of a box. */
export function testPoints(bb) {
  const pts = [[(bb[0] + bb[3]) >> 1, (bb[1] + bb[4]) >> 1, (bb[2] + bb[5]) >> 1]];
  for (const x of [bb[0], bb[3]]) for (const y of [bb[1], bb[4]]) for (const z of [bb[2], bb[5]]) pts.push([x, y, z]);
  return pts;
}

/** Bedrock 0x39 value → [{ type, bb }] or null when the bytes do not fit the format.
 *  Format: int32 n, then n × { int32 x0,y0,z0,x1,y1,z1 ; uint8 type }. */
export function decodeHardcodedSpawners(buf) {
  if (!buf || buf.length < 4) return null;
  const n = buf.readInt32LE(0);
  if (n < 0 || n > 4096 || buf.length !== 4 + 25 * n) return null;
  const out = [];
  for (let i = 0, o = 4; i < n; i++, o += 25) {
    const bb = [0, 4, 8, 12, 16, 20].map((d) => buf.readInt32LE(o + d));
    if (validBox(bb)) out.push({ type: buf[o + 24], bb });
  }
  return out;
}

/**
 * Bedrock 0x77 value → [{ name, boxes:[bb] }] or null when the bytes do not fit the format.
 * Format (relevé on every 0x77 record of the corpus):
 *   int32 1 ; int32 n (structures) ; int32 frontier key
 *   n × { uint16 L, L bytes name, int32 count } — the boxes of a chunk holding ONE structure
 *   follow its name: count × { int32 key, int32 x0,y0,z0,x1,y1,z1 }. With TWO structures the
 *   boxes of both follow the LAST name (its count is the total), then a tail:
 *   int32 nA, nA × { key, 0, enclosing } (template structures: trial_chambers, trail_ruins),
 *   int32 nB, nB × { key, frontier, d, enclosing } (the others).
 *   Owner of each box: by tail register when the two structures belong to different registers,
 *   otherwise keys above the frontier key belong to the FIRST structure. Each structure has
 *   exactly one enclosing box. Any other shape: null (never guessed).
 */
const TEMPLATE_STRUCTURES = new Set(['minecraft:trial_chambers', 'minecraft:trail_ruins']);
export function decodeStructureRecord(buf) {
  if (!buf || buf.length < 18 || buf.readInt32LE(0) !== 1) return null;
  const n = buf.readInt32LE(4);
  if (n < 1 || n > 64) return null;
  const frontier = buf.readInt32LE(8);
  const nameAt = (o) => {
    if (o + 2 > buf.length) return null;
    const L = buf.readUInt16LE(o);
    if (L < 5 || L > 64 || o + 2 + L + 4 > buf.length) return null;
    const s = buf.toString('latin1', o + 2, o + 2 + L);
    return /^[a-z0-9_]+:[a-z0-9_]+$/.test(s) ? s : null;
  };
  let o = 12;
  const entries = [];
  for (let k = 0; k < n; k++) {
    const name = nameAt(o);
    if (!name) return null;
    o += 2 + name.length;
    const count = buf.readInt32LE(o); o += 4;
    if (count < 0 || count > 4096) return null;
    const e = { name, boxes: [], inline: false };
    entries.push(e);
    if (k === n - 1 || (count > 0 && !nameAt(o))) {
      if (o + 28 * count > buf.length) return null;
      for (let i = 0; i < count; i++, o += 28) {
        const bb = [4, 8, 12, 16, 20, 24].map((d) => buf.readInt32LE(o + d));
        if (validBox(bb)) e.boxes.push({ key: buf.readInt32LE(o), bb });
      }
      e.inline = true;
    }
  }
  const result = (groups) => groups.map(([name, boxes]) => ({ name, boxes: boxes.map((b) => b.bb) }));
  if (n === 1 || entries.every((e) => e.inline)) return result(entries.map((e) => [e.name, e.boxes]));
  if (n !== 2) return null;
  const reg = new Map();
  if (o + 4 > buf.length) return null;
  const nA = buf.readInt32LE(o); o += 4;
  if (nA < 0 || nA > 4096 || o + 12 * nA + 4 > buf.length) return null;
  for (let i = 0; i < nA; i++, o += 12) reg.set(buf.readInt32LE(o), { template: true, enclosing: buf.readInt32LE(o + 8) });
  const nB = buf.readInt32LE(o); o += 4;
  if (nB < 0 || nB > 4096 || o + 16 * nB !== buf.length) return null;
  for (let i = 0; i < nB; i++, o += 16) reg.set(buf.readInt32LE(o), { template: false, enclosing: buf.readInt32LE(o + 12) });
  const [first, last] = entries;
  const all = last.boxes;
  let ofFirst;
  if (TEMPLATE_STRUCTURES.has(first.name) !== TEMPLATE_STRUCTURES.has(last.name) && all.every((b) => reg.has(b.key))) {
    ofFirst = (b) => reg.get(b.key).template === TEMPLATE_STRUCTURES.has(first.name);
  } else if (frontier > 0) ofFirst = (b) => b.key > frontier;
  else return null;
  const g1 = all.filter(ofFirst), g2 = all.filter((b) => !ofFirst(b));
  for (const g of [g1, g2]) if (g.length && reg.size && g.filter((b) => reg.get(b.key)?.enclosing === 1).length !== 1) return null;
  return result([[first.name, g1], [last.name, g2]]);
}

/**
 * Spawn zones of a Bedrock world: every 0x39 area, and every 0x77 PIECE box (the box equal to
 * the structure's bounding box cut to the chunk is removed: it is found geometrically, as the
 * intersection of the chunk with the union of the boxes of the connected chunks holding the
 * same structure name).
 * @returns {{ zones:[{dim,id,name?,type?,bb,src,cx,cz}], unreadable:[{dim,cx,cz,key}], terrain:Set<string> }}
 *          terrain = "dim:cx,cz" of chunks holding at least one sub-chunk.
 */
export function bedrockStructureZones(world) {
  const zones = [], unreadable = [], terrain = new Set(), rec77 = [];
  for (const { dim, cx, cz } of world.chunkIds()) {
    const tags = world.chunkTags(dim, cx, cz);
    for (const k of tags.keys()) if (k.startsWith('47:')) { terrain.add(`${dim}:${cx},${cz}`); break; }
    const b39 = tags.get('57');
    if (b39) {
      const z = decodeHardcodedSpawners(b39);
      if (!z) unreadable.push({ dim, cx, cz, key: '0x39' });
      else for (const a of z) zones.push({ dim, id: SPAWN_TYPE_TO_JAVA[a.type] || `bedrock-spawn-type:${a.type}`, type: a.type, bb: a.bb, src: '0x39', cx, cz });
    }
    const b77 = tags.get('119');
    if (b77) {
      const recs = decodeStructureRecord(b77);
      if (!recs) unreadable.push({ dim, cx, cz, key: '0x77' });
      else for (const e of recs) rec77.push({ dim, cx, cz, name: e.name, boxes: e.boxes });
    }
  }
  const groups = new Map();
  for (const rc of rec77) { const k = `${rc.dim}|${rc.name}`; if (!groups.has(k)) groups.set(k, new Map()); groups.get(k).set(`${rc.cx},${rc.cz}`, rc); }
  for (const byChunk of groups.values()) {
    const seen = new Set();
    for (const k0 of byChunk.keys()) {
      if (seen.has(k0)) continue;
      const stack = [k0], members = []; seen.add(k0);
      while (stack.length) {
        const k = stack.pop(); members.push(byChunk.get(k));
        const [x, z] = k.split(',').map(Number);
        for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nk = `${x + a},${z + b}`; if (byChunk.has(nk) && !seen.has(nk)) { seen.add(nk); stack.push(nk); } }
      }
      let U = null;
      for (const m of members) for (const bb of m.boxes) U = U ? union(U, bb) : bb.slice();
      for (const m of members) {
        const enclosing = U && [Math.max(U[0], m.cx * 16), U[1], Math.max(U[2], m.cz * 16), Math.min(U[3], m.cx * 16 + 15), U[4], Math.min(U[5], m.cz * 16 + 15)].join(',');
        for (const bb of m.boxes) if (bb.join(',') !== enclosing) zones.push({ dim: m.dim, id: javaIdOfBedrock(m.name), name: m.name, bb, src: '0x77', cx: m.cx, cz: m.cz });
      }
    }
  }
  return { zones, unreadable, terrain };
}

/** Bedrock zones indexed by every chunk their box overlaps: Map "dim|cx,cz" → zones. */
export function indexZonesByChunk(zones) {
  const m = new Map();
  for (const z of zones) {
    const span = ((z.bb[3] >> 4) - (z.bb[0] >> 4) + 1) * ((z.bb[5] >> 4) - (z.bb[2] >> 4) + 1);
    if (span > 4096) continue; // a box over more than 64×64 chunks is not a spawn area
    for (let cx = z.bb[0] >> 4; cx <= z.bb[3] >> 4; cx++) for (let cz = z.bb[2] >> 4; cz <= z.bb[5] >> 4; cz++) {
      const k = `${z.dim}|${cx},${cz}`;
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(z);
    }
  }
  return m;
}

const unpackChunkPos = (l) => { const v = BigInt.asIntN(64, BigInt(l)); return [Number(BigInt.asIntN(32, v)), Number(v >> 32n)]; };

/**
 * Structure data and generation status of a Java world.
 * @returns {Map<number, { chunks: Map<"cx,cz", { status, refs:{id:[[cx,cz]]}, starts:{id:[bb]}, pieces:{id:[bb]} }> }>}
 *   `starts[id]` = boxes the GAME tests (monument: the rebuilt building), `pieces[id]` = stored boxes.
 *   Only chunks with structure data are kept in `chunks`; `status` of every chunk goes in `statuses`.
 */
export async function javaStructureIndex(world, { keepEmptyFlag = false } = {}) {
  const out = new Map();
  for (const [dimId, dim] of JAVA_DIMS) {
    const chunks = new Map(), statuses = new Map(), empty = new Set();
    out.set(dim, { chunks, statuses, empty });
    if (!world.dimension(dimId)) continue;
    for await (const { cx, cz, tag } of world.chunks(dimId)) {
      const root = get(tag, 'Level') || tag;
      const status = javaStatus(tag);
      statuses.set(`${cx},${cz}`, status);
      if (keepEmptyFlag && JAVA_STATUS_BEFORE_FEATURES.has(status) && !javaChunkHasBlocks(root)) empty.add(`${cx},${cz}`);
      const st = plain(get(root, 'structures')) || {};
      const e = { status, refs: {}, starts: {}, pieces: {} };
      for (const [id, arr] of Object.entries(st.References || {})) e.refs[id] = (arr || []).map(unpackChunkPos);
      for (const [id, s] of Object.entries(st.starts || {})) {
        if (!s || s.id === 'INVALID') continue;
        const boxes = (s.Children || []).map((c) => c.BB).filter((bb) => Array.isArray(bb) && bb.length === 6).map((bb) => bb.map(Number));
        if (!boxes.length) continue;
        e.pieces[id] = boxes;
        e.starts[id] = id === 'minecraft:monument' ? [[boxes[0][0], 39, boxes[0][2], boxes[0][0] + 57, 61, boxes[0][2] + 57]] : boxes;
      }
      if (Object.keys(e.refs).length || Object.keys(e.starts).length) chunks.set(`${cx},${cz}`, e);
    }
  }
  return out;
}

/** Does a Java chunk hold any block other than air? (read from the palettes only) */
function javaChunkHasBlocks(root) {
  for (const s of plainList(get(root, 'sections') || get(root, 'Sections'))) {
    const bs = s.value.block_states;
    if (!bs) continue;
    for (const p of readPalette(bs.value.palette)) if (!/^minecraft:(cave_|void_)?air$/.test(p.name)) return true;
  }
  return false;
}

/** Java rule: is point p inside a piece of structure `id` for the game? */
export function javaStructureAt(index, dim, id, p) {
  const d = index.get(dim);
  if (!d) return false;
  const c = d.chunks.get(`${p[0] >> 4},${p[2] >> 4}`);
  for (const [rx, rz] of c?.refs?.[id] || []) for (const bb of d.chunks.get(`${rx},${rz}`)?.starts?.[id] || []) if (inBox(p, bb)) return true;
  return false;
}
