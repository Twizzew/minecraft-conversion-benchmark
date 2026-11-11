#!/usr/bin/env node
// Reproducibility: do two graded runs give the same verdict on every assertion?
// (Output archives differ byte-wise from one conversion to the next — timestamps, zip
// order —; what must not differ is what the oracle reads.)
//   node tools/results/same-verdicts.mjs <results dir A> <results dir B>
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const load = (d) => {
  const m = new Map(); const buf = zlib.gunzipSync(fs.readFileSync(path.join(d, 'results.jsonl.gz')));
  let s = 0;
  for (let i = buf.indexOf(10); i !== -1; s = i + 1, i = buf.indexOf(10, s)) {
    const o = JSON.parse(buf.toString('utf8', s, i));
    for (const [asp, lv] of Object.entries(o.aspects)) for (const L of ['direct', 'roundtrip']) {
      const x = lv[L]; m.set(`${o.id}#${asp}#${L}`, x.evaluated ? `${x.status}|${x.rule}` : `NE|${x.reason}`);
    }
  }
  return m;
};
const [a, b] = process.argv.slice(2);
const A = load(a), B = load(b);
let same = 0; const diff = [];
for (const [k, v] of A) { if (B.get(k) === v) same++; else diff.push([k, v, B.get(k)]); }
const onlyB = [...B.keys()].filter((k) => !A.has(k)).length;
console.log(`${path.basename(a)} vs ${path.basename(b)}: ${A.size} assertions, ${same} same verdict, ${diff.length} different, ${onlyB} only in B`);
for (const d of diff.slice(0, 5)) console.log('  ', JSON.stringify(d));
process.exit(diff.length || onlyB ? 1 : 0);
