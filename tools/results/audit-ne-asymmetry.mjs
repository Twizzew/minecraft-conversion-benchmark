#!/usr/bin/env node
// NOT_EVALUATED asymmetry between two converters on the SAME assertions (read-only).
// For every assertion that one converter left NOT_EVALUATED and the other did not, counts
// the reason given and the status the other converter received. An NE that depends on the
// converter's own output can hide a FAIL: this lists them all, so each can be justified.
//   node tools/results/audit-ne-asymmetry.mjs <resultsA.jsonl.gz> <resultsB.jsonl.gz> [labelA labelB]
import fs from 'node:fs';
import zlib from 'node:zlib';
import { parseJsonlBuffer } from '../lib/fixtures-io.mjs';
import { LEVELS } from '../lib/status.mjs';

const [fa, fb, la = 'A', lb = 'B'] = process.argv.slice(2);
const load = (f) => {
  const m = new Map();
  for (const r of parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(f)))) m.set(r.id, r);
  return m;
};
const A = load(fa), B = load(fb);
const tally = new Map();
const add = (k, ex) => { const t = tally.get(k) || { n: 0, ex }; t.n++; tally.set(k, t); };
for (const [id, ra] of A) {
  const rb = B.get(id);
  for (const [aspect, lv] of Object.entries(ra.aspects || {})) for (const L of LEVELS) {
    const x = lv?.[L], y = rb?.aspects?.[aspect]?.[L];
    if (!x || !y) continue;
    if (!x.evaluated && y.evaluated) add(`${L} | ${la} NE (${x.reason}) | ${lb} ${y.status} | ${ra.family}.${aspect}`, id);
    if (x.evaluated && !y.evaluated) add(`${L} | ${lb} NE (${y.reason}) | ${la} ${x.status} | ${ra.family}.${aspect}`, id);
  }
}
for (const [k, t] of [...tally].sort((a, b) => b[1].n - a[1].n)) console.log(String(t.n).padStart(8), k, ' e.g.', t.ex);
