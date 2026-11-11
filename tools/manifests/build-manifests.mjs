#!/usr/bin/env node
// (Re)generate the machine-readable manifests from what exists on disk:
//   manifests/runs.json, manifests/fixtures.json, manifests/results.json,
//   checksums/MCCB-v1.1-source-worlds.sha256, checksums/MCCB-v1.1-runs-<converter>-<commit>.sha256
// manifests/worlds.json and manifests/converters.json are written by hand (reviewed).
import fs from 'node:fs';
import path from 'node:path';
import { REPO_ROOT, sha256File } from '../lib/archive.mjs';
import { runsDir, worldsManifest } from '../lib/open.mjs';
import { readFixtures } from '../lib/fixtures-io.mjs';

const M = (f) => path.join(REPO_ROOT, 'manifests', f);
// Logs copied into the repository keep everything but the machine's absolute paths. The
// folder that holds the benchmark and the engine checkout becomes <LOCAL> (in all its
// spellings: plain, JSON-escaped, forward slashes, URL-encoded, \\?\ or file:/// prefix);
// anything else under a user folder becomes <HOME>. Unredacted logs stay with the runs.
const LOCAL_ROOT = path.resolve(REPO_ROOT, '..', '..');
// (stops before a JSON-escaped quote `\"`, so a redacted JSON document stays valid)
const HOME_PATH = /[A-Za-z]:(?:\\\\|\\|\/)Users(?:\\\\|\\|\/)(?:(?!\\")[^\s"'`<>|])*/g;
function redactLocalPaths(text) {
  const fwd = LOCAL_ROOT.replace(/\\/g, '/');
  const variants = [LOCAL_ROOT, LOCAL_ROOT.replace(/\\/g, '\\\\'), fwd, encodeURI(fwd)].sort((a, b) => b.length - a.length);
  let t = text;
  for (const v of variants) for (const pre of ['\\\\?\\', 'file:///', '']) t = t.split(pre + v).join('<LOCAL>');
  return t.replace(HOME_PATH, '<HOME>');
}
const write = (f, o) => { fs.writeFileSync(f, JSON.stringify(o, null, 1) + '\n'); console.log('wrote', path.relative(REPO_ROOT, f)); };
const rel = (f) => path.relative(REPO_ROOT, f).replace(/\\/g, '/');
const worlds = worldsManifest();
const v11 = worlds.benchmark_versions.find((v) => v.version === '1.1');

// ── runs.json ─────────────────────────────────────────────────────────────
const runs = [];
const privateRuns = new Set();
if (fs.existsSync(runsDir())) {
  for (const id of fs.readdirSync(runsDir()).sort()) {
    const f = path.join(runsDir(), id, 'run.json');
    if (!fs.existsSync(f)) continue;
    const r = JSON.parse(redactLocalPaths(fs.readFileSync(f, 'utf8'))); // command lines may hold local paths
    const world = worlds.worlds.find((w) => w.asset.sha256 === r.source.sha256);
    const parent = world ? null : r.source.ref;
    // Runs of a PRIVATE world (and their return legs) stay out of every public manifest.
    if (world?.status === 'PRIVATE' || privateRuns.has(parent)) { privateRuns.add(r.run_id); continue; }
    runs.push({
      run_id: r.run_id, leg: world ? 'direct' : 'return', world: world?.id ?? null, parent_run: parent,
      identity: { source_sha256: r.source.sha256, converter: r.converter.name, build: r.converter.commit, options: r.options, direction: r.direction },
      converter: r.converter, direction: r.direction, source: r.source, options: r.options,
      output: r.output, output_release_asset: r.output ? `${r.run_id}${path.extname(r.output.file)}` : null,
      started_at: r.started_at, finished_at: r.finished_at, duration_ms: r.duration_ms, exit_status: r.exit_status,
      environment: r.environment, logs: r.logs.map((l) => `results/${r.converter.name.toLowerCase()}/runs/${r.run_id}/${l.replace(/\.log$/, '.txt')}`),
      purpose: /_rerun\d+$/.test(r.run_id) ? 'determinism-check' : 'benchmark',
    });
  }
}
write(M('runs.json'), { schema: 'mccb.runs/1', note: 'A run is identified by source SHA-256 + converter build + options + direction. Outputs are release assets (output_release_asset).', runs });

// Copy run records and logs into the repository (small text files; outputs stay out of Git).
for (const r of runs) {
  const src = path.join(runsDir(), r.run_id);
  const dst = path.join(REPO_ROOT, 'results', r.identity.converter.toLowerCase(), 'runs', r.run_id);
  fs.mkdirSync(dst, { recursive: true });
  fs.writeFileSync(path.join(dst, 'run.json'), redactLocalPaths(fs.readFileSync(path.join(src, 'run.json'), 'utf8')));
  for (const l of ['stdout.log', 'stderr.log', 'progress.json', 'notices.json']) {
    const f = path.join(src, l);
    if (fs.existsSync(f)) fs.writeFileSync(path.join(dst, l.replace(/\.log$/, '.txt')), redactLocalPaths(fs.readFileSync(f, 'utf8')));
  }
}

// ── fixtures.json ─────────────────────────────────────────────────────────
const fx = [];
for (const id of v11.worlds) {
  const f = readFixtures(id);
  const byLevel = {};
  for (const s of f.subjects) for (const a of Object.values(s.aspects)) for (const [lvl, code] of Object.entries(a)) {
    const k = code.startsWith('NA:') ? 'NOT_APPLICABLE' : code.startsWith('NE:') ? 'NOT_EVALUATED' : 'EVALUATED';
    (byLevel[lvl] ||= { EVALUATED: 0, NOT_APPLICABLE: 0, NOT_EVALUATED: 0 })[k]++;
  }
  fx.push({ world: id, file: f.file, content_sha256: f.content_sha256, file_sha256: f.file_sha256, source_sha256: f.header.source_sha256,
    families: f.header.families, subjects: f.subjects.length, assertions: Object.values(f.header.families).reduce((a, x) => a + x.assertions, 0),
    predeclared_expectations: byLevel, identity_reference: f.header.identity_reference, java_reference: f.header.java_reference, bedrock_reference: f.header.bedrock_reference });
}
const refs = ['docs/fixture-rules.md', 'docs/reference/identity-equivalence.v1.json', 'tools/reference/identity-rules.v1.mjs', 'tools/reference/gamerules.v1.mjs'];
write(M('fixtures.json'), { schema: 'mccb.fixtures-index/1', benchmark_version: '1.1', rules: Object.fromEntries(refs.map((r) => [r, sha256File(path.join(REPO_ROOT, r))])), worlds: fx });

// ── results.json ──────────────────────────────────────────────────────────
const results = [];
const resRoot = path.join(REPO_ROOT, 'results');
for (const conv of fs.existsSync(resRoot) ? fs.readdirSync(resRoot) : []) {
  const cdir = path.join(resRoot, conv);
  if (!fs.statSync(cdir).isDirectory()) continue;
  for (const run of fs.readdirSync(cdir)) {
    const sf = path.join(cdir, run, 'summary.json');
    if (!fs.existsSync(sf)) continue;
    // A converter's command line may name local folders: redact them in the published copy
    // (metadata only — no status and no results.jsonl.gz byte is touched).
    const raw = fs.readFileSync(sf, 'utf8');
    const clean = redactLocalPaths(raw);
    if (clean !== raw) fs.writeFileSync(sf, clean);
    const s = JSON.parse(clean);
    const totals = {};
    for (const x of s.summary) {
      const t = (totals[x.level] ||= { PASS: 0, ADAPTED: 0, PARTIAL: 0, FAIL: 0, UNSUPPORTED: 0, NOT_APPLICABLE: 0, NOT_EVALUATED: 0 });
      for (const [k, v] of Object.entries(x.counts)) t[k] += v;
      t.NOT_EVALUATED += x.not_evaluated;
    }
    const byFamily = {};
    for (const x of s.summary) {
      const t = ((byFamily[x.family] ||= {})[x.level] ||= { PASS: 0, ADAPTED: 0, PARTIAL: 0, FAIL: 0, UNSUPPORTED: 0, NOT_APPLICABLE: 0, NOT_EVALUATED: 0 });
      for (const [k, v] of Object.entries(x.counts)) t[k] += v;
      t.NOT_EVALUATED += x.not_evaluated;
    }
    results.push({ converter: conv, world: s.world, world_class: s.world_class, direction: s.direction, direct_run: s.direct_run, roundtrip_run: s.roundtrip_run,
      build: s.converter_build?.commit, fixtures_content_sha256: s.fixtures.content_sha256, results_file: `${rel(path.join(cdir, run))}/${s.results_file.file}`, results_sha256: s.results_file.sha256,
      totals_by_level: totals, by_family: byFamily, detail: `${rel(path.join(cdir, run))}/summary.json` });
  }
}
results.sort((a, b) => a.converter.localeCompare(b.converter) || a.world.localeCompare(b.world));
write(M('results.json'), { schema: 'mccb.results-index/1', benchmark_version: '1.1', note: 'Counts per level. No score. NOT_EVALUATED is not a status. Never add classes (LAB / MANUAL_NATIVE / REAL_WORLD_SURVIVAL) together.', results });

// ── checksums ─────────────────────────────────────────────────────────────
fs.mkdirSync(path.join(REPO_ROOT, 'checksums'), { recursive: true });
const srcLines = v11.worlds.map((id) => worlds.worlds.find((w) => w.id === id)).map((w) => `${w.asset.sha256} *${w.asset.name}`);
fs.writeFileSync(path.join(REPO_ROOT, 'checksums', 'MCCB-v1.1-source-worlds.sha256'),
  ['# MCCB v1.1 - Source Worlds (SHA-256). J02, J03, B01, B02, B03 are byte-identical to their v1.0 assets.', '# Verify: sha256sum -c --ignore-missing MCCB-v1.1-source-worlds.sha256', ...srcLines].join('\n') + '\n');
const byConv = {};
const shortBuild = (b) => (/^[0-9a-f]{40}$/.test(b) ? b.slice(0, 7) : String(b)); // git commit, or a release version
for (const r of runs) if (r.output) (byConv[`${r.identity.converter.toLowerCase()}-${shortBuild(r.identity.build)}`] ||= []).push(`${r.output.sha256} *${r.output_release_asset}`);
for (const [k, lines] of Object.entries(byConv)) fs.writeFileSync(path.join(REPO_ROOT, 'checksums', `MCCB-v1.1-runs-${k}.sha256`), [`# MCCB v1.1 - converter outputs ${k} (SHA-256)`, ...lines.sort()].join('\n') + '\n');
console.log('checksums written');
