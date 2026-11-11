#!/usr/bin/env node
// Preuve d'équivalence lib/nbt-fast.mjs ↔ prismarine-nbt 2.8.0 (09/11/2026) : chaque chunk de chaque
// fichier .mca et chaque .dat sous les dossiers donnés est lu par les deux ; arbres comparés
// strictement (ordre des clés, prototypes, classe SignedBigInt, valeurs, -0/NaN).
//   node selftest/nbt-fast-equivalence.mjs <dossier…>
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
import { restoreProtoKeys } from '../lib/nbt.mjs';
import { parseBigFast } from '../lib/nbt-fast.mjs';
const require = createRequire(import.meta.url);
const nbt = require('prismarine-nbt');

function same(a, b, p) {
  if (Object.is(a, b)) return;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== 'object') throw new Error(`${p}: ${String(a)} ≠ ${String(b)}`);
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) throw new Error(`${p}: prototype`);
  if (Array.isArray(a)) {
    if (a.length !== b.length) throw new Error(`${p}: length`);
    for (let i = 0; i < a.length; i++) { if ((i in a) !== (i in b)) throw new Error(`${p}[${i}]: hole`); same(a[i], b[i], `${p}[${i}]`); }
    return;
  }
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.join('\0') !== kb.join('\0')) throw new Error(`${p}: keys ${ka} ≠ ${kb}`);
  for (const k of ka) same(a[k], b[k], `${p}.${k}`);
}
const stats = { files: 0, docs: 0, fast: 0, fallbackBoth: 0, bad: 0 };
function check(raw, where) {
  stats.docs++;
  let ref = null, refErr = null, fast = null, fastErr = null;
  try { ref = restoreProtoKeys(nbt.parseUncompressed(raw, 'big')); } catch (e) { refErr = e; }
  try { fast = parseBigFast(raw); } catch (e) { fastErr = e; }
  if (fastErr) { stats.fallbackBoth++; return; } // l'appelant reprend prismarine : identique par construction
  if (refErr) { stats.bad++; console.log(`DIFF ${where}: fast OK, prismarine erreur ${refErr.message}`); return; }
  try { same(fast, ref, 'root'); stats.fast++; } catch (e) { stats.bad++; console.log(`DIFF ${where}: ${e.message}`); }
}
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (/\.mca$/.test(e.name)) {
      stats.files++;
      const b = fs.readFileSync(f);
      if (b.length < 8192) continue;
      for (let i = 0; i < 1024; i++) {
        const loc = b.readUInt32BE(i * 4); const off = (loc >>> 8) * 4096;
        if (!(loc >>> 8) || !(loc & 0xff) || off + 5 > b.length) continue;
        const len = b.readUInt32BE(off), ct = b[off + 4]; if (ct & 0x80) continue;
        const pay = b.subarray(off + 5, off + 4 + len);
        let raw; try { raw = ct === 1 ? zlib.gunzipSync(pay) : ct === 2 ? zlib.inflateSync(pay) : ct === 3 ? pay : null; } catch { continue; }
        if (raw) check(raw, `${f}#${i}`);
      }
    } else if (/\.dat(_old)?$/.test(e.name)) {
      stats.files++;
      let raw = fs.readFileSync(f);
      try { if (raw[0] === 0x1f && raw[1] === 0x8b) raw = zlib.gunzipSync(raw); } catch { continue; }
      check(raw, f);
    }
  }
}
for (const d of process.argv.slice(2)) walk(d);
// cas construits : clé __proto__, liste vide de fin, liste de longArray, -0, NaN, chaîne UTF-8
const W = (parts) => Buffer.concat(parts.map((x) => (Buffer.isBuffer(x) ? x : Buffer.from(x))));
const s16 = (s) => { const b = Buffer.from(s, 'utf8'); const h = Buffer.alloc(2); h.writeUInt16BE(b.length); return W([h, b]); };
const i32 = (n) => { const b = Buffer.alloc(4); b.writeInt32BE(n); return b; };
const f64 = (n) => { const b = Buffer.alloc(8); b.writeDoubleBE(n); return b; };
check(W([[10], s16(''), [9], s16('vide'), [0], i32(3), [12], s16('la'), i32(2), i32(-1), i32(-2), i32(5), i32(6), [9], s16('ll'), [12], i32(1), i32(1), i32(7), i32(8),
  [6], s16('mz'), f64(-0), [6], s16('nan'), f64(NaN), [8], s16('é'), s16('Crème ☃'), [10], s16('__proto__'), [1], s16('x'), [1], [0], [0]]), 'construit');
console.log(JSON.stringify(stats));
process.exit(stats.bad ? 1 : 0);
