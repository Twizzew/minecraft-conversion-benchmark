#!/usr/bin/env node
// Evaluate one converter run (direct leg) and, if given, its return leg against the
// fixture registry of the source world.
//   node tools/oracles/evaluate.mjs --world J04@1.0 --direct <runId> [--roundtrip <runId>]
//        [--converter worldswitch] [--out results/<converter>/<runId>]
// Provenance is checked first: the direct run must have consumed the canonical source
// (same SHA-256), and the return run must have consumed the direct run's output.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { REPO_ROOT, sha256File } from '../lib/archive.mjs';
import { worldEntry, openRunOutput, runRecord } from '../lib/open.mjs';
import { FAMILIES } from '../families/index.mjs';
import { readFixtures, isPrivateWorld, PRIVATE_DIR, joinLines } from '../lib/fixtures-io.mjs';
import { TargetView } from './target.mjs';
import { notEvaluated, REASON, STATUSES } from '../lib/status.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const worldId = arg('world');
const directId = arg('direct');
const rtId = arg('roundtrip');
const converter = arg('converter', 'worldswitch');
const onlyFam = arg('families')?.split(',');
// Results of a PRIVATE world never go to results/ (repository): _staging/private/results/.
const out = path.resolve(arg('out', path.join(isPrivateWorld(worldId) ? path.join(PRIVATE_DIR, 'results') : path.join(REPO_ROOT, 'results'), converter, directId)));

const entry = worldEntry(worldId);
const fx = readFixtures(worldId);
const { header, subjects } = fx;

// ── provenance checks (a mismatch is fatal: never evaluate the wrong input) ──
const dRun = runRecord(directId);
const problems = [];
if (dRun.source.sha256 !== entry.asset.sha256) problems.push(`direct run consumed ${dRun.source.sha256}, canonical source is ${entry.asset.sha256}`);
if (header.source_sha256 !== entry.asset.sha256) problems.push('fixture file was built from another source');
let rRun = null;
if (rtId) {
  rRun = runRecord(rtId);
  if (!dRun.output || rRun.source.sha256 !== dRun.output.sha256) problems.push(`return run consumed ${rRun.source.sha256}, direct output is ${dRun.output?.sha256}`);
}
if (problems.length) { console.error('PROVENANCE CHECK FAILED:\n  ' + problems.join('\n  ')); process.exit(2); }

const t0 = Date.now();
const dOut = await openRunOutput(directId);
const direct = new TargetView({ edition: dOut.edition, world: dOut.world, opens: dOut.worldOpens !== false && !dOut.missing, label: 'direct', run: directId, normalize: dOut.normalize });
let roundtrip = null, rOut = null;
if (rtId) {
  rOut = await openRunOutput(rtId);
  roundtrip = new TargetView({ edition: rOut.edition, world: rOut.world, opens: rOut.worldOpens !== false && !rOut.missing, label: 'roundtrip', run: rtId, normalize: rOut.normalize });
}
const ctx = { worldId, sourceEdition: entry.edition, direct, roundtrip, header };

fs.mkdirSync(out, { recursive: true });
const rows = [];
const summary = {};
const bump = (fam, aspect, level, res) => {
  const k = `${fam}|${aspect}|${level}`;
  const s = (summary[k] ||= { family: fam, aspect, level, counts: Object.fromEntries(STATUSES.map((x) => [x, 0])), not_evaluated: 0, reasons: {} });
  if (res.evaluated) s.counts[res.status]++;
  else { s.not_evaluated++; s.reasons[res.reason] = (s.reasons[res.reason] || 0) + 1; }
};
for (const f of FAMILIES) {
  if (onlyFam && !onlyFam.includes(f.name)) continue;
  const mine = subjects.filter((s) => s.family === f.name);
  if (f.prepare) await f.prepare(ctx, mine);
  // Evaluate in geographic order (region, chunk, height) so world readers hit their
  // caches; each subject is judged independently, and rows are written in fixture order.
  const key = (s) => { const p = s.locator?.pos; return p ? [s.locator.dim || '', Math.floor(p[0] / 512), Math.floor(p[2] / 512), Math.floor(p[0] / 16), Math.floor(p[2] / 16), p[1]] : null; };
  const cmp = (a, b) => { const ka = key(mine[a]), kb = key(mine[b]); if (!ka || !kb) return (ka ? 1 : 0) - (kb ? 1 : 0) || a - b; for (let i = 0; i < ka.length; i++) { if (ka[i] < kb[i]) return -1; if (ka[i] > kb[i]) return 1; } return a - b; };
  const order = mine.map((_, i) => i).sort(cmp);
  const famRows = new Array(mine.length);
  for (const i of order) {
    const s = mine[i];
    const res = await f.evaluate(s, ctx);
    const row = { id: s.id, family: s.family, aspects: {} };
    for (const [aspect, levels] of Object.entries(res)) {
      const beh = levels.behavior || notEvaluated(REASON.NO_RUNTIME);
      row.aspects[aspect] = { direct: levels.direct, behavior: beh, roundtrip: levels.roundtrip };
      bump(f.name, aspect, 'direct', levels.direct);
      bump(f.name, aspect, 'behavior', beh);
      bump(f.name, aspect, 'roundtrip', levels.roundtrip);
    }
    famRows[i] = JSON.stringify(row);
  }
  for (const r of famRows) rows.push(r);
  process.stderr.write(`[evaluate] ${f.name}: ${mine.length} subjects, ${((Date.now() - t0) / 1000).toFixed(0)} s elapsed\n`);
}
const resultsFile = path.join(out, 'results.jsonl.gz');
fs.writeFileSync(resultsFile, zlib.gzipSync(joinLines(rows), { level: 9 })); // bytes, not one giant string
const doc = {
  schema: 'mccb.results/1',
  world: worldId, world_class: entry.class, source_sha256: entry.asset.sha256,
  converter, direct_run: directId, roundtrip_run: rtId,
  direct_output_sha256: dRun.output?.sha256 ?? null, roundtrip_output_sha256: rRun?.output?.sha256 ?? null,
  converter_build: dRun.converter, direction: dRun.direction, options: dRun.options,
  // The normalisation report minus its local source path (a machine-specific folder).
  target_opens: { direct: direct.opens, direct_normalize: dOut.normalize ? { ...dOut.normalize, source: undefined } : null, roundtrip: roundtrip ? roundtrip.opens : null, roundtrip_normalize: rOut?.normalize ? { ...rOut.normalize, source: undefined } : null },
  fixtures: { file: fx.file, content_sha256: fx.content_sha256, file_sha256: fx.file_sha256 },
  results_file: { file: 'results.jsonl.gz', sha256: sha256File(resultsFile), subjects: rows.length },
  summary: Object.values(summary),
  evaluated_with: { tools_version: header.tools_version, node: process.version },
};
fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify(doc, null, 1) + '\n');
for (const t of [direct, roundtrip]) if (t?.world?.cleanup) t.world.cleanup();
console.log(`${worldId} ${directId}${rtId ? ' + ' + rtId : ''}: ${rows.length} subjects in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
for (const s of Object.values(summary)) {
  const c = Object.entries(s.counts).filter(([, v]) => v).map(([k, v]) => `${k}:${v}`).join(' ');
  console.log(`  ${s.family}.${s.aspect}.${s.level}: ${c}${s.not_evaluated ? ` NOT_EVALUATED:${s.not_evaluated}` : ''}`);
}
