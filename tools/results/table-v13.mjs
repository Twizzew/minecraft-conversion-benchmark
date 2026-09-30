#!/usr/bin/env node
// MCCB v1.3 final table and integrity checks, from the graded rows (results.jsonl.gz).
//   node tools/results/table-v13.mjs --dir results/v1.3 [--private-dir _staging/private/results-v1.3]
//        [--builds "WS 0308840=worldswitch/ws-0308840_,WS 2.8.0=worldswitch/ws-fd9b735_,Chunker 1.20.0=chunker/chunker-1.20.0_"]
//        [--md out.md] [--json out.json]
// Checks, per world: every converter has exactly the same assertions (subject#aspect at each
// level), each counted once; the status counts add up to the number of assertions; nothing
// NOT_EVALUATED is counted as PASS. Counts only: no score, no ranking, worlds never added.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { REPO_ROOT } from '../lib/archive.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const dir = path.resolve(REPO_ROOT, arg('dir', 'results/v1.3'));
const pdir = arg('private-dir') ? path.resolve(REPO_ROOT, arg('private-dir')) : null;
const BUILDS = arg('builds', 'WS 0308840=worldswitch/ws-0308840_,WS 2.8.0 (fd9b735)=worldswitch/ws-fd9b735_,Chunker 1.20.0=chunker/chunker-1.20.0_')
  .split(',').map((x) => { const [label, p] = x.split('='); const [conv, prefix] = p.split('/'); return { label, conv, prefix }; });
const WORLDS = ['J01@1.1', 'J02@1.0', 'J03@1.0', 'J04@1.0', 'B01@1.0', 'B02@1.0', 'B03@1.0', ...(pdir ? ['GURREN@1.0'] : [])];
const ST = ['PASS', 'ADAPTED', 'PARTIAL', 'FAIL', 'UNSUPPORTED', 'NOT_APPLICABLE'];
const LEVELS = ['direct', 'roundtrip'];

function load(b, world) {
  const base = path.join(world.startsWith('GURREN') ? pdir : dir, b.conv);
  if (!fs.existsSync(base)) return null;
  const d = fs.readdirSync(base).find((x) => x.startsWith(b.prefix + world));
  if (!d) return null;
  const summary = JSON.parse(fs.readFileSync(path.join(base, d, 'summary.json'), 'utf8'));
  const buf = zlib.gunzipSync(fs.readFileSync(path.join(base, d, 'results.jsonl.gz')));
  const c = Object.fromEntries(LEVELS.map((L) => [L, { ...Object.fromEntries(ST.map((s) => [s, 0])), NOT_EVALUATED: 0, total: 0, byFamily: {} }]));
  const ids = new Set(); let dup = 0; let nePass = 0;
  let start = 0;
  for (let i = buf.indexOf(10); i !== -1; start = i + 1, i = buf.indexOf(10, start)) {
    const row = JSON.parse(buf.toString('utf8', start, i));
    for (const [asp, lv] of Object.entries(row.aspects)) for (const L of LEVELS) {
      const key = `${row.id}#${asp}#${L}`;
      if (ids.has(key)) dup++; ids.add(key);
      const x = lv[L];
      const s = x.evaluated ? x.status : 'NOT_EVALUATED';
      if (!x.evaluated && x.status) nePass++;
      c[L][s]++; c[L].total++;
      const f = (c[L].byFamily[row.family] ||= Object.fromEntries([...ST, 'NOT_EVALUATED'].map((k) => [k, 0])));
      f[s]++;
    }
  }
  return { run: d, summary, counts: c, ids, dup, nePass };
}

const out = { worlds: {}, checks: [] };
const md = ['# MCCB v1.3 — final comparison (counts per assertion)', '',
  'Cell: PASS / ADAPTED / PARTIAL / **FAIL** — then NOT_EVALUATED (never counted as PASS). NOT_APPLICABLE and UNSUPPORTED are in the raw results.',
  'No score, no ranking; worlds are never added together.', '',
  `Builds: ${BUILDS.map((b) => b.label).join(' · ')}.`, ''];
for (const L of LEVELS) {
  md.push(`## ${L === 'direct' ? 'Direct conversion' : 'Round trip'}`, '');
  md.push(`| World | assertions | ${BUILDS.map((b) => b.label).join(' | ')} |`, `|---|--:|${BUILDS.map(() => '---').join('|')}|`);
  for (const w of WORLDS) {
    const got = BUILDS.map((b) => load(b, w));
    const ref = got.find(Boolean);
    if (!ref) continue;
    const tot = ref.counts[L].total;
    const cells = got.map((g) => (g ? `${g.counts[L].PASS} / ${g.counts[L].ADAPTED} / ${g.counts[L].PARTIAL} / **${g.counts[L].FAIL}** — NE ${g.counts[L].NOT_EVALUATED}` : 'not run'));
    md.push(`| ${w.split('@')[0]} | ${tot} | ${cells.join(' | ')} |`);
    if (L === 'direct') {
      out.worlds[w] = Object.fromEntries(BUILDS.map((b, i) => [b.label, got[i] ? { run: got[i].run, fixtures_content_sha256: got[i].summary.fixtures.content_sha256, direct_output_sha256: got[i].summary.direct_output_sha256, roundtrip_output_sha256: got[i].summary.roundtrip_output_sha256, counts: got[i].counts } : null]));
      // integrity
      const present = got.filter(Boolean);
      const sameIds = present.every((g) => g.ids.size === ref.ids.size && [...g.ids].every((k) => ref.ids.has(k)));
      const sameFixtures = present.every((g) => g.summary.fixtures.content_sha256 === ref.summary.fixtures.content_sha256);
      const sums = present.every((g) => LEVELS.every((l) => [...ST, 'NOT_EVALUATED'].reduce((n, s) => n + g.counts[l][s], 0) === g.counts[l].total));
      const once = present.every((g) => g.dup === 0);
      const neNotPass = present.every((g) => g.nePass === 0);
      out.checks.push({ world: w, converters: present.length, same_assertions: sameIds, same_fixture_registry: sameFixtures, sums_exact: sums, each_counted_once: once, not_evaluated_never_pass: neNotPass, assertions_per_level: ref.counts.direct.total });
    }
  }
  md.push('');
}
md.push('## Integrity checks', '', '| World | converters | same assertions | same fixture registry | sums exact | each once | NE never PASS | assertions / level |', '|---|--:|---|---|---|---|---|--:|');
for (const c of out.checks) md.push(`| ${c.world} | ${c.converters} | ${c.same_assertions} | ${c.same_fixture_registry} | ${c.sums_exact} | ${c.each_counted_once} | ${c.not_evaluated_never_pass} | ${c.assertions_per_level} |`);
const text = md.join('\n') + '\n';
if (arg('md')) fs.writeFileSync(path.resolve(REPO_ROOT, arg('md')), text);
if (arg('json')) fs.writeFileSync(path.resolve(REPO_ROOT, arg('json')), JSON.stringify(out, null, 1) + '\n');
process.stdout.write(text);
