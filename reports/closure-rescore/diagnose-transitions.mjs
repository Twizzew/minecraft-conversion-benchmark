#!/usr/bin/env node
// Every verdict that changed between two gradings of the same outputs, grouped by family.aspect, level,
// historical -> corrected status, and the rule (or NOT_EVALUATED reason) the corrected grading recorded.
// Reading aid; prints no evidence value.
//   node reports/closure-rescore/diagnose-transitions.mjs <historical dir> <corrected dir> <out .json> [--worlds W1,W2,...]
import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib';
const argv = process.argv.slice(2);
const wi = argv.indexOf('--worlds');
const [BASE, NEW, OUT] = argv.filter((a, i) => !a.startsWith('--') && !(wi >= 0 && i === wi + 1));
const W = wi >= 0 ? argv[wi + 1].split(',') : ['J01@1.1', 'J02@1.0', 'J03@1.0', 'J04@1.0', 'B01@1.0', 'B02@1.0', 'B03@1.0'];
const cells = [['worldswitch', 'ws-0308840'], ['worldswitch', 'ws-fd9b735'], ['chunker', 'chunker-1.20.0'], ['je2be', 'je2be-core-8dfc4de']];
function rows(f, cb) { const b = zlib.gunzipSync(fs.readFileSync(f)); for (let s = 0, i = b.indexOf(10); s < b.length; s = i + 1, i = b.indexOf(10, s)) { if (i === -1) i = b.length; if (i > s) cb(JSON.parse(b.toString('utf8', s, i))); } }
const out = { schema: 'mccb.closure-transitions/1', worlds: W, by_build: {} };
for (const [c, p] of cells) {
  const agg = {};
  for (const w of W) {
    const d = `${p}_${w}_${w.startsWith('J') ? 'j2b' : 'b2j'}`; const old = new Map();
    rows(path.join(BASE, c, d, 'results.jsonl.gz'), (r) => { for (const [a, lv] of Object.entries(r.aspects)) for (const L of ['direct', 'roundtrip']) old.set(`${r.id}#${a}#${L}`, lv[L].evaluated ? lv[L].status : 'NOT_EVALUATED'); });
    rows(path.join(NEW, c, d, 'results.jsonl.gz'), (r) => {
      for (const [a, lv] of Object.entries(r.aspects)) for (const L of ['direct', 'roundtrip']) {
        const x = lv[L]; const s = x.evaluated ? x.status : 'NOT_EVALUATED'; const o = old.get(`${r.id}#${a}#${L}`) ?? '(absent)';
        if (o === s) continue;
        const k = `${w.split('@')[0]} | ${r.family}.${a} | ${L} | ${o} -> ${s} | ${x.rule ?? x.reason ?? '-'}`; agg[k] = (agg[k] || 0) + 1;
      }
    });
  }
  out.by_build[p] = Object.fromEntries(Object.entries(agg).sort());
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
console.log(Object.entries(out.by_build).map(([k, v]) => `${k}: ${Object.values(v).reduce((a, b) => a + b, 0)} changed verdicts`).join('; '));
