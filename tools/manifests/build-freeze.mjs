#!/usr/bin/env node
// Write reports/freeze/FREEZE-v<version>.json: the SHA-256 of everything that defines MCCB
// — source worlds, fixture registries (canonical content hash), rules, references, every
// tool file, the reference game build — and of the results already measured when it was
// written. Publishing this file (in a commit and a release) is what freezes v1.1: after
// that, any change to a listed item is a new MCCB version (METHODOLOGY §8).
//   node tools/manifests/build-freeze.mjs [--version 1.1|1.2] [--check]   (--check: compare, write nothing)
// v1.2 also pins the converter outputs it will grade (`runs_to_grade`) and the private
// world's fixture registry by content hash only (its file stays unpublished).
import fs from 'node:fs';
import path from 'node:path';
import { REPO_ROOT, sha256File } from '../lib/archive.mjs';
import { worldsManifest, minecraftClasspath, NORMALIZER_SHA256 } from '../lib/open.mjs';
import { readFixtures } from '../lib/fixtures-io.mjs';
import { JAVA_REFERENCE_VERSION } from '../lib/registry.mjs';

const rel = (f) => path.relative(REPO_ROOT, f).replace(/\\/g, '/');
const walk = (d, out = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p, out); } else out.push(p);
  }
  return out;
};
const hashTree = (d) => Object.fromEntries(walk(d).map((f) => [rel(f), sha256File(f)]));
const EVALUATION = /^tools\/(lib|families|oracles|fixtures|reference|java)\/|^tools\/package(-lock)?\.json$/;

const argv = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const VERSION = argv('version', '1.1');
const worlds = worldsManifest();
const v = worlds.benchmark_versions.find((x) => x.version === VERSION);
if (!v) throw new Error(`no benchmark version ${VERSION} in manifests/worlds.json`);
const jar = minecraftClasspath(JAVA_REFERENCE_VERSION).split(path.delimiter).find((p) => /versions[\\/][^\\/]+[\\/][^\\/]+\.jar$/.test(p));
const vdPkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'tools', 'node_modules', '@minecraft', 'vanilla-data', 'package.json'), 'utf8'));

// Only WorldSwitch had been measured when the rules were frozen; every other converter is
// measured afterwards (reports/freeze/ATTESTATION-before-competitors.md).
const BEFORE = new Set(VERSION === '1.1' ? ['worldswitch'] : []);
// manifests/results.json holds v1.1 results: a later version starts with none.
const measured = VERSION === '1.1' && fs.existsSync(path.join(REPO_ROOT, 'manifests', 'results.json'))
  ? JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'manifests', 'results.json'), 'utf8')).results.map((r) => ({ converter: r.converter, world: r.world, direct_run: r.direct_run, roundtrip_run: r.roundtrip_run, build: r.build, results_file: r.results_file, results_sha256: r.results_sha256, fixtures_content_sha256: r.fixtures_content_sha256 }))
  : [];
const freeze = {
  schema: 'mccb.freeze/1',
  benchmark_version: VERSION,
  status: 'PREPARED — becomes the freeze when published (commit + release)',
  statement: `Every item below is fixed for MCCB v${VERSION}. A change to any of them is a new MCCB version. Results of v${VERSION} are never re-graded.`,
  sources: v.worlds.map((id) => { const w = worlds.worlds.find((x) => x.id === id); return { world: id, class: w.class, edition: w.edition, file: w.asset.name, sha256: w.asset.sha256, bytes: w.asset.bytes }; }),
  fixtures: v.worlds.map((id) => { const f = readFixtures(id); return { world: id, file: f.file, content_sha256: f.content_sha256, file_sha256: f.file_sha256, subjects: f.subjects.length, built_from_source_sha256: f.header.source_sha256 }; }),
  rules: Object.fromEntries(['METHODOLOGY.md', 'docs/fixture-rules.md', 'docs/rules-changelog.md', 'KNOWN_LIMITATIONS.md'].map((f) => [f, sha256File(path.join(REPO_ROOT, f))])),
  manifests: Object.fromEntries(['manifests/worlds.json'].map((f) => [f, sha256File(path.join(REPO_ROOT, f))])),
  // the register of converters grows as converters are measured: informative
  manifests_informative: Object.fromEntries(['manifests/converters.json'].map((f) => [f, sha256File(path.join(REPO_ROOT, f))])),
  references: {
    identity_equivalence: { file: 'docs/reference/identity-equivalence.v1.json', sha256: sha256File(path.join(REPO_ROOT, 'docs', 'reference', 'identity-equivalence.v1.json')) },
    java_game: { version: JAVA_REFERENCE_VERSION, jar_file: jar ? path.basename(jar) : null, jar_sha256: jar && fs.existsSync(jar) ? sha256File(jar) : null, note: 'Official Minecraft Java client jar, used unmodified from the local launcher installation; never redistributed.' },
    java_normaliser_sha256: NORMALIZER_SHA256,
    bedrock_vanilla_data: { package: '@minecraft/vanilla-data', version: vdPkg.version },
    ...(VERSION === '1.1' ? {} : Object.fromEntries(['bedrock-default-states.v1.json', 'java-gamerule-defaults.v1.json']
      .map((f) => [f.replace(/\.v1\.json$/, '').replace(/-/g, '_'), { file: `docs/reference/${f}`, sha256: sha256File(path.join(REPO_ROOT, 'docs', 'reference', f)) }]))),
  },
  // Files that decide a verdict (readers, normaliser, families, oracles, references,
  // fixture builder): strictly frozen. Packaging files (manifests, runners, result
  // summaries, self-tests, world tools) never change a status: recorded for information.
  tools: Object.fromEntries(Object.entries(hashTree(path.join(REPO_ROOT, 'tools'))).filter(([f]) => EVALUATION.test(f))),
  packaging_tools_informative: Object.fromEntries(Object.entries(hashTree(path.join(REPO_ROOT, 'tools'))).filter(([f]) => !EVALUATION.test(f))),
  measured_before_freeze: measured.filter((r) => BEFORE.has(r.converter)),
  measured_after_freeze: measured.filter((r) => !BEFORE.has(r.converter)),
  not_run_before_freeze: ['Chunker', 'je2be'],
};
if (VERSION !== '1.1') {
  // The private world: its registry is pinned by content hash; file and fixtures stay unpublished.
  freeze.private_fixtures = ['GURREN@1.0'].filter((id) => { try { readFixtures(id); return true; } catch { return false; } })
    .map((id) => { const f = readFixtures(id); return { world: id, content_sha256: f.content_sha256, subjects: f.subjects.length, built_from_source_sha256: f.header.source_sha256 }; });
  // Every converter output graded under this version, pinned before any grading.
  const runsDir = path.join(REPO_ROOT, '_staging', 'runs');
  const RUNS = /^(ws-0308840|ws-0308840\+[0-9a-f]{7}|ws-fd9b735|chunker-1\.20\.0|je2be-[^_]+)_(J0[1-4]|B0[1-3]|GURREN)@1\.[01]_(j2b|b2j)(2j|2b)?$/;
  freeze.runs_to_grade = fs.readdirSync(runsDir).filter((d) => RUNS.test(d) && fs.existsSync(path.join(runsDir, d, 'run.json'))).sort()
    .map((d) => { const r = JSON.parse(fs.readFileSync(path.join(runsDir, d, 'run.json'), 'utf8'));
      return { run: d, converter: r.converter?.name ?? null, build: r.converter?.commit ? `${r.converter.commit.slice(0, 7)}${r.converter.working_tree_fingerprint ? '+' + r.converter.working_tree_fingerprint.sha256.slice(0, 7) : ''}` : (r.converter?.version ?? null),
        source_sha256: r.source?.sha256 ?? null, output_sha256: r.output?.sha256 ?? null }; });
  freeze.not_run_before_freeze = ['je2be (conversions not yet available)'];
  if (VERSION === '1.3') {
    freeze.graded_before_freeze = 'Rules 47-52 were written after WorldSwitch (0308840 and later working-tree builds) and Chunker 1.20.0 had been graded under v1.2. Their effects were measured under v1.3 on the recorded outputs of ws-0308840, ws-0308840+6da882c (same engine files as the release commit fd9b735) and chunker-1.20.0 before this file was written (docs/rules-changelog.md, section MCCB v1.3). No rule changes after this file.';
    freeze.final_comparison = { worldswitch_old: 'ws-0308840', worldswitch_final: 'ws-fd9b735 (engine 2.8.0, commit fd9b73568456efc0b772d958ebffbc5599aa8fac)', chunker: 'chunker-1.20.0', je2be: 'not run: its official binary has not been obtained (download needs the operator approval)' };
  } else freeze.graded_before_freeze = 'None under v1.2. Rule effects of 45-46 were measured beforehand on the recorded WorldSwitch 0308840 and Chunker 1.20.0 outputs (docs/rules-changelog.md); no rule changed after that measurement other than as listed.';
}
freeze.fixtures_match_results = measured.every((r) => freeze.fixtures.some((f) => f.content_sha256 === r.fixtures_content_sha256));

const out = path.join(REPO_ROOT, 'reports', 'freeze', `FREEZE-v${VERSION}.json`);
const text = JSON.stringify(freeze, null, 1) + '\n';
if (process.argv.includes('--check')) {
  const old = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  const strip = (s) => s.replace(/"status": "[^"]*",?/, '');
  console.log(strip(old) === strip(text) ? 'FREEZE UNCHANGED' : `FREEZE DIFFERS from ${rel(out)}`);
  process.exit(strip(old) === strip(text) ? 0 : 1);
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, text);
console.log('wrote', rel(out), `(${Object.keys(freeze.tools).length} tool files, fixtures match results: ${freeze.fixtures_match_results})`);
