#!/usr/bin/env node
// Status totals per world and level (direct / roundtrip) of every summary.json found under
// the given result folders — one table per folder, for quick comparisons (read-only).
//   node tools/results/totals.mjs <results-dir> [<results-dir> ...] [--level direct,roundtrip]
import fs from 'node:fs';
import path from 'node:path';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const levels = arg('level', 'direct,roundtrip').split(',');
const dirs = process.argv.slice(2).filter((a, i, all) => !a.startsWith('--') && all[i - 1] !== '--level');
const ST = ['PASS', 'ADAPTED', 'PARTIAL', 'FAIL', 'UNSUPPORTED', 'NOT_APPLICABLE'];
const find = (d, out = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) find(p, out); else if (e.name === 'summary.json') out.push(p);
  }
  return out;
};
for (const d of dirs) {
  console.log(`\n# ${d}`);
  console.log(['world', 'level', ...ST, 'NOT_EVAL', 'evaluated'].join('\t'));
  for (const f of find(d).sort()) {
    const s = JSON.parse(fs.readFileSync(f, 'utf8'));
    for (const L of levels) {
      const c = Object.fromEntries(ST.map((k) => [k, 0]));
      let ne = 0;
      for (const row of s.summary) if (row.level === L) { for (const k of ST) c[k] += row.counts[k] || 0; ne += row.not_evaluated || 0; }
      const ev = ST.reduce((n, k) => n + c[k], 0);
      console.log([s.world, L, ...ST.map((k) => c[k]), ne, ev].join('\t'));
    }
  }
}
