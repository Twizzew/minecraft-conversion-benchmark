#!/usr/bin/env node
// NOT_EVALUATED counts by reason and level, side by side for several graded runs of the same
// world: shows which NOT_EVALUATED depend on the output (declared in advance → identical for
// every converter; decided on what the output contains → may differ).
//   node tools/results/ne-by-reason.mjs <results dir> [<results dir> ...]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const dirs = process.argv.slice(2);
const tally = dirs.map((d) => {
  const t = {}; const buf = zlib.gunzipSync(fs.readFileSync(path.join(d, 'results.jsonl.gz')));
  let s = 0;
  for (let i = buf.indexOf(10); i !== -1; s = i + 1, i = buf.indexOf(10, s)) {
    const o = JSON.parse(buf.toString('utf8', s, i));
    for (const [asp, lv] of Object.entries(o.aspects)) for (const L of ['direct', 'roundtrip']) if (!lv[L].evaluated) { const k = `${L} ${o.family}.${asp} ${lv[L].reason}`; t[k] = (t[k] || 0) + 1; }
  }
  return t;
});
const keys = [...new Set(tally.flatMap((t) => Object.keys(t)))].sort();
for (const k of keys) { const v = tally.map((t) => t[k] || 0); if (new Set(v).size > 1) console.log(`${k}: ${v.join(' | ')}`); }
