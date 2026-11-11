#!/usr/bin/env node
// Compares two gradings of the SAME outputs, assertion by assertion, from the machine results only
// (results.jsonl.gz). Reading aid of the v1.3 closure rescoring; it decides no verdict.
//   node reports/closure-rescore/compare-results.mjs <historical dir> <corrected dir> <out dir> [--worlds J01@1.1,...]
//        [--pseudonymised-baseline]
// Writes <out>/DELTA.json and <out>/DELTA.md: totals per converter and level (PASS ADAPTED PARTIAL FAIL
// UNSUPPORTED NOT_APPLICABLE NOT_EVALUATED), corrected − historical, every verdict transition
// (family.aspect | level | from -> to), and integrity checks: rows = summary, results hash = summary,
// one status per assertion, same assertion set for every converter of a world, same graded outputs and
// fixture registry as the historical grading, one scorer/ruleset fingerprint, transitions = deltas.
// --pseudonymised-baseline: the historical results.jsonl.gz were rewritten after grading (R01: account
// ids replaced, REPRODUCING.md §9); their hash ≠ their summary is then reported as a note, not a problem.
import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib'; import crypto from 'node:crypto';
const argv = process.argv.slice(2);
const [HIST, NEW, OUT] = argv.filter((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--worlds'));
const wi = argv.indexOf('--worlds');
const W = wi >= 0 ? argv[wi + 1].split(',') : ['J01@1.1', 'J02@1.0', 'J03@1.0', 'J04@1.0', 'B01@1.0', 'B02@1.0', 'B03@1.0'];
const PSEUDO = argv.includes('--pseudonymised-baseline');
const B = [['WS 0308840', 'worldswitch', 'ws-0308840_'], ['WS 2.8.0 (fd9b735)', 'worldswitch', 'ws-fd9b735_'], ['Chunker 1.20.0', 'chunker', 'chunker-1.20.0_'], ['je2be core-8dfc4de', 'je2be', 'je2be-core-8dfc4de_']];
const ST = ['PASS', 'ADAPTED', 'PARTIAL', 'FAIL', 'UNSUPPORTED', 'NOT_APPLICABLE', 'NOT_EVALUATED'];
const L = ['direct', 'roundtrip'];
const problems = [], notes = [];
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
function load(root, conv, prefix, w, baseline) {
  const d = `${prefix}${w}_${w.startsWith('J') ? 'j2b' : 'b2j'}`;
  const dir = path.join(root, conv, d);
  const raw = fs.readFileSync(path.join(dir, 'results.jsonl.gz')); const summary = JSON.parse(fs.readFileSync(path.join(dir, 'summary.json'), 'utf8'));
  if (sha(raw) !== summary.results_file?.sha256) (baseline && PSEUDO ? notes : problems).push(`${conv}/${d}${baseline ? ' (historical)' : ''}: results.jsonl.gz hash ≠ summary`);
  const m = new Map(); let rows = 0;
  const buf = zlib.gunzipSync(raw);
  for (let st = 0, i = buf.indexOf(10); st < buf.length; st = i + 1, i = buf.indexOf(10, st)) {
    if (i === -1) i = buf.length;
    if (i === st) continue; rows++; const r = JSON.parse(buf.toString('utf8', st, i));
    for (const [asp, lv] of Object.entries(r.aspects)) for (const l of L) {
      const x = lv[l]; if (!x) { problems.push(`${d} ${r.id} ${asp} ${l}: no level`); continue; }
      const s = x.evaluated ? x.status : 'NOT_EVALUATED';
      if (!ST.includes(s) || (!x.evaluated && x.status != null)) problems.push(`${d} ${r.id} ${asp} ${l}: bad status ${s}`);
      const k = `${r.id}#${asp}#${l}`; if (m.has(k)) problems.push(`${d}: duplicate ${k}`);
      m.set(k, { s, family: r.family, asp, l });
    }
  }
  if (rows !== summary.results_file?.subjects) problems.push(`${d}: ${rows} rows ≠ summary ${summary.results_file?.subjects}`);
  return { d, m, summary };
}
const zero = () => Object.fromEntries(ST.map((s) => [s, 0]));
const res = { schema: 'mccb.closure-delta/1', worlds: W, cells: {}, totals: {}, totals_historical: {}, delta: {}, transitions: {}, assertion_set_changes: {}, assertion_set_sha256: {} };
for (const [label] of B) { res.totals[label] = Object.fromEntries(L.map((l) => [l, zero()])); res.totals_historical[label] = Object.fromEntries(L.map((l) => [l, zero()])); res.transitions[label] = {}; }
const fp = new Set();
for (const w of W) {
  const keysets = [];
  for (const [label, conv, prefix] of B) {
    const n = load(NEW, conv, prefix, w, false), h = load(HIST, conv, prefix, w, true);
    fp.add(`${n.summary.scorer?.fingerprint}|${n.summary.ruleset?.fingerprint}|${n.summary.grading?.mode}|${n.summary.java_oracle?.authenticated}`);
    if (n.summary.direct_output_sha256 !== h.summary.direct_output_sha256 || n.summary.roundtrip_output_sha256 !== h.summary.roundtrip_output_sha256) problems.push(`${n.d}: graded outputs differ from the historical grading`);
    if (n.summary.fixtures?.content_sha256 !== h.summary.fixtures?.content_sha256) problems.push(`${n.d}: fixture content differs from the historical grading`);
    const c = {}; for (const l of L) c[l] = { corrected: zero(), historical: zero() };
    for (const v of n.m.values()) { c[v.l].corrected[v.s]++; res.totals[label][v.l][v.s]++; }
    for (const v of h.m.values()) { c[v.l].historical[v.s]++; res.totals_historical[label][v.l][v.s]++; }
    for (const l of L) { c[l].total = Object.values(c[l].corrected).reduce((a, b) => a + b, 0); c[l].total_historical = Object.values(c[l].historical).reduce((a, b) => a + b, 0); }
    res.cells[`${label} | ${w}`] = c;
    keysets.push([label, sha([...n.m.keys()].sort().join('\n'))]);
    let added = 0, removed = 0;
    for (const [k, v] of n.m) {
      const o = h.m.get(k)?.s; if (o === undefined) added++;
      if ((o ?? '(absent)') === v.s) continue;
      const t = `${v.family}.${v.asp} | ${v.l} | ${o ?? '(absent)'} -> ${v.s}`; res.transitions[label][t] = (res.transitions[label][t] || 0) + 1;
    }
    for (const [k, v] of h.m) if (!n.m.has(k)) { removed++; const t = `${v.family}.${v.asp} | ${v.l} | ${v.s} -> (absent)`; res.transitions[label][t] = (res.transitions[label][t] || 0) + 1; }
    if (added || removed) res.assertion_set_changes[`${label} | ${w}`] = { added, removed };
  }
  res.assertion_set_sha256[w] = keysets;
  for (const [label, k] of keysets.slice(1)) if (k !== keysets[0][1]) problems.push(`${w}: ${label} graded on a different assertion set`);
}
if (fp.size !== 1) problems.push(`fingerprints/grading not uniform: ${[...fp].join(' ; ')}`);
res.scorer_ruleset_mode_oracle = [...fp];
for (const [label] of B) { res.delta[label] = {}; for (const l of L) res.delta[label][l] = Object.fromEntries(ST.map((s) => [s, res.totals[label][l][s] - res.totals_historical[label][l][s]])); }
for (const [label] of B) for (const l of L) {
  const d = zero();
  for (const [t, n] of Object.entries(res.transitions[label])) { const [, lv, ft] = t.split(' | '); if (lv !== l) continue; const [f, to] = ft.split(' -> '); if (ST.includes(f)) d[f] -= n; if (ST.includes(to)) d[to] += n; }
  for (const s of ST) if (d[s] !== res.delta[label][l][s]) problems.push(`${label} ${l} ${s}: transitions ${d[s]} ≠ delta ${res.delta[label][l][s]}`);
}
for (const k of Object.keys(res.transitions)) res.transitions[k] = Object.fromEntries(Object.entries(res.transitions[k]).sort());
res.notes = notes; res.problems = problems;
fs.writeFileSync(path.join(OUT, 'DELTA.json'), JSON.stringify(res, null, 1) + '\n');
const f = (n) => n.toLocaleString('en-US').replace(/,/g, ' ');
const sg = (n) => (n > 0 ? `+${f(n)}` : n < 0 ? `−${f(-n)}` : '0');
const md = ['# Corrected rescoring vs historical grading — computed from results.jsonl.gz', '',
  `Worlds: ${W.join(', ')}. Scorer | ruleset | mode | Java oracle authenticated: \`${[...fp].join(' ; ')}\`.`, '',
  'Counts per assertion. The sums over several worlds below only account for the changes made by the rescoring; they are not a result (METHODOLOGY: worlds are never added together, no score). "Δ" = corrected − historical.', ''];
for (const l of L) {
  md.push(`## Accounting sums${W.length > 1 ? ` over ${W.length} worlds` : ''}, ${l === 'direct' ? 'direct conversion' : 'round trip'}`, '', `| Converter | ${ST.join(' | ')} | total |`, `|---|${ST.map(() => '--:').join('|')}|--:|`);
  for (const [label] of B) { const t = res.totals[label][l]; md.push(`| ${label} | ${ST.map((s) => f(t[s])).join(' | ')} | ${f(ST.reduce((a, s) => a + t[s], 0))} |`); }
  md.push('', `| Δ | ${ST.join(' | ')} |`, `|---|${ST.map(() => '--:').join('|')}|`);
  for (const [label] of B) md.push(`| ${label} | ${ST.map((s) => sg(res.delta[label][l][s])).join(' | ')} |`);
  md.push('');
}
for (const l of L) {
  md.push(`## Per world, ${l === 'direct' ? 'direct conversion' : 'round trip'} — PASS / ADAPTED / PARTIAL / **FAIL** — NA · NE (FAIL: historical → corrected)`, '', `| World | ${B.map((b) => b[0]).join(' | ')} |`, `|---|${B.map(() => '---').join('|')}|`);
  for (const w of W) md.push(`| ${w.split('@')[0]} | ${B.map(([label]) => { const c = res.cells[`${label} | ${w}`][l], n = c.corrected; return `${f(n.PASS)} / ${f(n.ADAPTED)} / ${f(n.PARTIAL)} / **${f(n.FAIL)}** — NA ${f(n.NOT_APPLICABLE)} · NE ${f(n.NOT_EVALUATED)}${n.UNSUPPORTED ? ` · UNS ${f(n.UNSUPPORTED)}` : ''} (${f(c.historical.FAIL)} → ${f(n.FAIL)})`; }).join(' | ')} |`);
  md.push('');
}
md.push('## Verdict transitions (historical → corrected)', '');
for (const [label] of B) { md.push(`### ${label}`, ''); const e = Object.entries(res.transitions[label]); if (!e.length) md.push('none'); for (const [t, n] of e) md.push(`- ${t}: ${f(n)}`); md.push(''); }
md.push('## Checks', '', `- assertion set vs historical: ${Object.keys(res.assertion_set_changes).length ? JSON.stringify(res.assertion_set_changes) : 'identical in every cell'}`,
  `- same assertion set for the four converters of each world: ${problems.some((p) => p.includes('assertion set')) ? 'NO' : 'yes'}`,
  `- transitions add up to the deltas: ${problems.some((p) => p.includes('transitions')) ? 'NO' : 'yes'}`,
  `- notes: ${notes.length ? notes.join('; ') : 'none'}`, `- problems: ${problems.length ? problems.join('; ') : 'none'}`, '');
fs.writeFileSync(path.join(OUT, 'DELTA.md'), md.join('\n'));
console.log(JSON.stringify({ problems: problems.length, notes: notes.length, delta: res.delta }));
process.exit(problems.length ? 1 : 0);
