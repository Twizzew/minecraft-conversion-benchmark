#!/usr/bin/env node
// Group every FAIL / PARTIAL of an evaluation by (family.aspect.level, rule, evidence
// signature), with one example each. Used to audit oracles before publishing, and
// published as the per-run failure census.
//   node tools/results/failure-census.mjs <results dir> [--md out.md]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { REPO_ROOT } from '../lib/archive.mjs';
import { readJsonlGz } from '../lib/fixtures-io.mjs';

const dir = path.resolve(process.argv[2]);
const mdOut = process.argv.includes('--md') ? process.argv[process.argv.indexOf('--md') + 1] : null;
const summary = JSON.parse(fs.readFileSync(path.join(dir, 'summary.json'), 'utf8'));
const fx = new Map(readJsonlGz(path.join(REPO_ROOT, summary.fixtures.file)).slice(1).map((o) => [o.id, o]));
const rows = readJsonlGz(path.join(dir, 'results.jsonl.gz'));
const sig = (fam, f, ev) => {
  const what = f?.expected?.name || f?.expected?.id || f?.locator?.key || f?.locator?.kind || '';
  const obs = ev ? JSON.stringify(ev.observed ?? ev.differing_keys ?? ev.delta ?? ev.note ?? '').slice(0, 60) : '';
  return `${String(what).replace(/^minecraft:/, '')} | ${obs}`;
};
const groups = new Map();
for (const r of rows) {
  for (const [aspect, lv] of Object.entries(r.aspects)) {
    for (const [level, res] of Object.entries(lv)) {
      if (!res.evaluated || !['FAIL', 'PARTIAL'].includes(res.status)) continue;
      const f = fx.get(r.id);
      const k = `${r.family}.${aspect}.${level} ${res.status} [${res.rule}]`;
      const g = groups.get(k) || { count: 0, sigs: new Map() };
      g.count++;
      const s = sig(r.family, f, res.evidence);
      if (!g.sigs.has(s)) g.sigs.set(s, { n: 0, example: r.id });
      g.sigs.get(s).n++;
      groups.set(k, g);
    }
  }
}
const lines = [`# Failure census — ${summary.world} — ${summary.direct_run}${summary.roundtrip_run ? ' + ' + summary.roundtrip_run : ''}`, ''];
for (const [k, g] of [...groups].sort((a, b) => b[1].count - a[1].count)) {
  lines.push(`## ${k} — ${g.count}`, '');
  for (const [s, v] of [...g.sigs].sort((a, b) => b[1].n - a[1].n).slice(0, 12)) lines.push(`- ${v.n} × ${s} (e.g. \`${v.example}\`)`);
  if (g.sigs.size > 12) lines.push(`- … ${g.sigs.size - 12} more signatures`);
  lines.push('');
}
const text = lines.join('\n');
if (mdOut) fs.writeFileSync(mdOut, text + '\n'); else console.log(text);
