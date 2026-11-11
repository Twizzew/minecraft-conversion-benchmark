#!/usr/bin/env node
// FAIL / PARTIAL of one converter grouped into candidate root causes (read-only).
// Signature: world · level · family.aspect · rule · source kind · shape of the evidence
// (which keys differ, which observed value) — numbers and positions blurred.
//   node tools/results/roots.mjs <results-dir-with-runs> [--statuses FAIL,PARTIAL] [--min 1]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fixtureFile, parseJsonlBuffer } from '../lib/fixtures-io.mjs';

const dir = path.resolve(process.argv[2]);
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const STAT = new Set(arg('statuses', 'FAIL,PARTIAL').split(','));
const MIN = Number(arg('min', 1));
const blur = (v) => (v == null ? v : JSON.stringify(v).replace(/-?\d+(\.\d+)?/g, '#').replace(/"(?:[^"\\]|\\.){80,}"/g, '"…"'));
const out = [];
for (const run of fs.readdirSync(dir)) {
  const sf = path.join(dir, run, 'summary.json');
  if (!fs.existsSync(sf)) continue;
  const s = JSON.parse(fs.readFileSync(sf, 'utf8'));
  const fx = new Map(parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(fixtureFile(s.world)))).slice(1).map((x) => [x.id, x]));
  const groups = new Map();
  for (const r of parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(path.join(dir, run, 'results.jsonl.gz'))))) {
    const f = fx.get(r.id);
    const kind = String(f?.expected?.id ?? f?.expected?.name ?? f?.locator?.key ?? '');
    for (const [aspect, lv] of Object.entries(r.aspects || {})) for (const L of ['direct', 'roundtrip']) {
      const x = lv?.[L];
      if (!x?.evaluated || !STAT.has(x.status)) continue;
      const ev = x.evidence || {};
      const shape = ev.differing_keys ? `keys=${ev.differing_keys.join(',')}` : ev.observed !== undefined ? `obs=${blur(ev.observed)}` : blur(ev);
      const sig = [s.world, L, `${r.family}.${aspect}`, x.status, x.rule, kind, shape].join(' | ');
      const g = groups.get(sig) || { n: 0, subjects: new Set(), ex: r.id };
      g.n++; g.subjects.add(r.id); groups.set(sig, g);
    }
  }
  for (const [sig, g] of groups) out.push({ sig, n: g.n, s: g.subjects.size, ex: g.ex });
}
out.sort((a, b) => b.n - a.n);
for (const g of out) if (g.n >= MIN) console.log(String(g.n).padStart(6), String(g.s).padStart(6), g.sig.slice(0, 330), '  e.g.', g.ex);
console.error(`${out.length} groups, ${out.reduce((a, g) => a + g.n, 0)} assertions`);
