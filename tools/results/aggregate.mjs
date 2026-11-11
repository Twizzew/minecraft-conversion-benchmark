#!/usr/bin/env node
// Human-readable summaries from manifests/results.json (run tools/manifests/build-manifests.mjs
// first). Writes results/<converter>/SUMMARY.md. Counts only — no score, no percentage,
// world classes never added together.
import fs from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from '../lib/archive.mjs';

const idx = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'manifests', 'results.json'), 'utf8'));
const S = ['PASS', 'ADAPTED', 'PARTIAL', 'FAIL', 'UNSUPPORTED', 'NOT_APPLICABLE', 'NOT_EVALUATED'];
const byConv = {};
for (const r of idx.results) (byConv[r.converter] ||= []).push(r);
for (const [conv, rows] of Object.entries(byConv)) {
  const md = [`# ${conv} — MCCB v1.1 results (counts per assertion)`, '',
    'Read METHODOLOGY.md first. **direct** = in the other edition right after conversion; **behavior** = in game',
    '(v1.1: only "the reference Java game opens the world"); **roundtrip** = back in the source edition after',
    'A → B → A with the same converter. NOT_EVALUATED is not a status: MCCB has no neutral rule for those assertions.',
    'Classes are never added together. There is no global score.', ''];
  for (const cls of ['LAB', 'MANUAL_NATIVE', 'REAL_WORLD_SURVIVAL']) {
    const rs = rows.filter((r) => r.world_class === cls && !/_rerun\d+$/.test(r.direct_run));
    if (!rs.length) continue;
    md.push(`## ${cls}`, '');
    for (const r of rs) {
      md.push(`### ${r.world} — ${r.direction.replace(/_/g, ' ')} (build ${String(r.build).slice(0, 7)})`, '',
        `Direct run \`${r.direct_run}\`, return run \`${r.roundtrip_run}\`. Detail: \`${r.results_file}\` (sha256 \`${r.results_sha256.slice(0, 16)}…\`).`, '',
        `| Family | Level | ${S.join(' | ')} |`, `|---|---|${S.map(() => '---:').join('|')}|`);
      for (const [fam, lv] of Object.entries(r.by_family)) {
        for (const level of ['direct', 'behavior', 'roundtrip']) {
          const c = lv[level];
          if (!c || !Object.values(c).some((v) => v)) continue;
          md.push(`| ${fam} | ${level} | ${S.map((k) => c[k] || '').join(' | ')} |`);
        }
      }
      const t = r.totals_by_level;
      md.push(`| **all families** | direct | ${S.map((k) => t.direct?.[k] || '').join(' | ')} |`, `| **all families** | roundtrip | ${S.map((k) => t.roundtrip?.[k] || '').join(' | ')} |`, '');
    }
  }
  md.push('## Determinism re-runs', '', 'Runs suffixed `_rerun1` repeat a conversion with the same build and options; see reports/oracle-selftests/.', '');
  const f = path.join(REPO_ROOT, 'results', conv, 'SUMMARY.md');
  fs.writeFileSync(f, md.join('\n') + '\n');
  console.log('wrote', path.relative(REPO_ROOT, f));
}
