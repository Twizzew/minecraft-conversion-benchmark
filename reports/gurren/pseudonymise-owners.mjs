// MCCB v1.3 — GURREN: removes the account identifiers (Xbox XUIDs) left in the sanitised file.
//
//   node reports/gurren/pseudonymise-owners.mjs <sanitised .mcworld> <output .mcworld>
//
// Needs `unzip` and `zip` (Info-ZIP) and tools/node_modules. What it does:
// 1. Every account id stored as a string in a block entity (sign FrontText/BackText
//    `TextOwner`, written-book `xuid` tag) is replaced by a fixed pseudonym of the same length,
//    "0000000000000001", "…02", … in order of first appearance in key order. The same id always
//    gets the same pseudonym, so equal values stay equal and different values stay different.
//    The mapping is not written anywhere.
// 2. The LevelDB database is rebuilt from its live entries only. The sanitised file still held,
//    physically, entries deleted by the sanitiser (`RealmsStoriesData*`, whose keys contain
//    account ids, with their old values) and account ids among the MANIFEST's table boundary
//    keys; a rebuilt database contains only the live keys.
// Every live key, and every value other than the replaced strings, is copied byte for byte;
// the script checks this by reading both databases back.
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os';
import { execFileSync } from 'node:child_process'; import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(HERE, '../../tools/package.json'));
const { LevelDB } = require('leveldb-zlib');

const [src, out] = process.argv.slice(2).map((p) => p && path.resolve(p));
if (!src || !out) { console.error('usage: pseudonymise-owners.mjs <in.mcworld> <out.mcworld>'); process.exit(2); }
const XUID = /(?<![0-9])253[35][0-9]{12}(?![0-9])/g;
const FIELDS = new Set(['TextOwner', 'xuid']);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-pseudo-'));
const inDir = path.join(tmp, 'in'), outDir = path.join(tmp, 'out');
fs.mkdirSync(inDir); fs.mkdirSync(path.join(outDir, 'db'), { recursive: true });
execFileSync('unzip', ['-q', src, '-d', inDir]);

const isBlockEntities = (k) => (k.length === 9 || k.length === 13) && k[k.length - 1] === 0x31;
// The name of the NBT string tag whose value starts at `at` (little-endian NBT: type 8, u16 name
// length, name, u16 value length, value).
const tagName = (v, at) => { for (const f of FIELDS) { const s = at - 2 - f.length;
  if (s >= 3 && v[s - 3] === 8 && v.readUInt16LE(s - 2) === f.length && v.toString('latin1', s, s + f.length) === f && v.readUInt16LE(at - 2) === 16) return f; } return null; };

const map = new Map(); const replaced = { TextOwner: 0, xuid: 0 };
const pseudo = (id) => { if (!map.has(id)) map.set(id, String(map.size + 1).padStart(16, '0')); return map.get(id); };
const rewrite = (k, v) => {
  const s = v.toString('latin1'); const hits = [...s.matchAll(XUID)];
  if (!hits.length) return v;
  if (!isBlockEntities(k)) throw new Error('account-id-like value outside block entities');
  const w = Buffer.from(v);
  for (const m of hits) { const f = tagName(v, m.index); if (!f) throw new Error('account-id-like value in an unexpected field');
    w.write(pseudo(m[0]), m.index, 'latin1'); replaced[f]++; }
  return w;
};

const oldDb = new LevelDB(path.join(inDir, 'db')); await oldDb.open();
const newDb = new LevelDB(path.join(outDir, 'db'), { createIfMissing: true, writeBufferSize: 0xfffffff0 });
await newDb.open();
let n = 0, changed = 0, ops = [], first = null, last = null;
for await (const [k, v] of oldDb.getIterator({ keys: true, values: true })) {
  if (XUID.test(k.toString('latin1'))) throw new Error('account-id-like live key'); XUID.lastIndex = 0;
  const w = rewrite(k, v); if (w !== v) changed++;
  ops.push({ type: 'put', key: Buffer.from(k), value: Buffer.from(w) }); n++;
  first ??= Buffer.from(k); last = Buffer.from(k);
  if (ops.length >= 5000) { await newDb.batch(ops); ops = []; }
}
if (ops.length) await newDb.batch(ops);
await newDb.compactRange(first, last);
await newDb.close();

// Read both back: same keys in the same order; values identical except the replaced strings.
const a = new LevelDB(path.join(outDir, 'db')); await a.open();
const itA = a.getIterator({ keys: true, values: true })[Symbol.asyncIterator]();
let m = 0;
for await (const [k, v] of oldDb.getIterator({ keys: true, values: true })) {
  const { value: [k2, v2] } = await itA.next(); m++;
  if (!k.equals(k2)) throw new Error('key differs at entry ' + m);
  const exp = v.toString('latin1').replace(XUID, (x) => map.get(x));
  if (exp !== v2.toString('latin1')) throw new Error('value differs at entry ' + m);
}
if (!(await itA.next()).done) throw new Error('extra entries');
await a.close(); await oldDb.close();

for (const f of ['LOCK', 'LOG', 'LOG.old']) fs.rmSync(path.join(outDir, 'db', f), { force: true });
for (const f of fs.readdirSync(inDir)) if (f !== 'db') fs.cpSync(path.join(inDir, f), path.join(outDir, f), { recursive: true });
// Deterministic archive: fixed order, fixed timestamps, no extra attributes.
const files = []; const walk = (d) => { for (const e of fs.readdirSync(path.join(outDir, d), { withFileTypes: true }).sort((x, y) => (x.name < y.name ? -1 : 1))) {
  const r = d ? `${d}/${e.name}` : e.name; if (e.isDirectory()) walk(r); else files.push(r); } };
walk('');
const t = new Date('2026-09-30T00:00:00Z'); for (const f of files) fs.utimesSync(path.join(outDir, f), t, t);
fs.rmSync(out, { force: true });
execFileSync('zip', ['-q', '-X', '-D', '-9', out, ...files], { cwd: outDir, env: { ...process.env, TZ: 'UTC' } });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(JSON.stringify({ entries: n, values_changed: changed, strings_replaced: replaced, distinct_ids: map.size, files: files.length }, null, 1));
