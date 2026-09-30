#!/usr/bin/env node
// Side-by-side counts of several converters on the same worlds, per world × family × level.
// Counts only: no score, no ranking, classes never added together (METHODOLOGY §6).
//   node tools/results/compare.mjs [--md results/COMPARISON-v1.1.md]
import fs from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from '../lib/archive.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const idx = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'manifests', 'results.json'), 'utf8')).results.filter((r) => r.roundtrip_run);
const convs = [...new Set(idx.map((r) => r.converter))].sort();
const worlds = [...new Set(idx.map((r) => r.world))].sort();
const S = ['PASS', 'ADAPTED', 'PARTIAL', 'FAIL', 'NOT_APPLICABLE', 'NOT_EVALUATED'];
const cell = (t) => (t ? `${t.PASS} / ${t.ADAPTED} / ${t.PARTIAL} / **${t.FAIL}** / ${t.NOT_EVALUATED}` : '—');
const L = ['# MCCB v1.1 — converters side by side (counts per assertion)', '',
  'Each cell: PASS / ADAPTED / PARTIAL / **FAIL** / NOT_EVALUATED (NOT_APPLICABLE omitted). No score, no ranking;',
  'world classes are never added together. Read METHODOLOGY.md and docs/fixture-rules.md first.', '',
  `Converters: ${convs.map((c) => { const r = idx.find((x) => x.converter === c); return `${c} (build ${String(r.build).slice(0, 12)})`; }).join(', ')}.`, ''];
for (const w of worlds) {
  const rows = convs.map((c) => idx.find((r) => r.converter === c && r.world === w));
  const any = rows.find(Boolean);
  L.push(`## ${w} — ${any.world_class} — ${any.direction.replace(/_/g, ' ')}`, '');
  L.push(`| Family | Level | ${convs.join(' | ')} |`, `|---|---|${convs.map(() => '---').join('|')}|`);
  const fams = [...new Set(rows.flatMap((r) => (r ? Object.keys(r.by_family) : [])))];
  for (const fam of fams) for (const level of ['direct', 'roundtrip']) {
    if (!rows.some((r) => r?.by_family[fam]?.[level] && S.some((k) => r.by_family[fam][level][k]))) continue;
    L.push(`| ${fam} | ${level} | ${rows.map((r) => cell(r?.by_family[fam]?.[level])).join(' | ')} |`);
  }
  for (const level of ['direct', 'roundtrip']) L.push(`| **all** | ${level} | ${rows.map((r) => cell(r?.totals_by_level[level])).join(' | ')} |`);
  L.push('');
}
const out = arg('md');
if (out) { fs.writeFileSync(path.resolve(out), L.join('\n') + '\n'); console.log('wrote', out); } else console.log(L.join('\n'));
