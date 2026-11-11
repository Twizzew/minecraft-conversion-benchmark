#!/usr/bin/env node
// Reconstructs the run records of the 14 WorldSwitch 2.8.0 (fd9b735) runs of the v1.3 public
// worlds, whose ORIGINAL run.json files are lost (never committed; not found anywhere on
// 2026-10-03). These records are RECONSTRUCTED provenance, not the original files.
//
//   node reports/provenance/reconstruct-ws-fd9b735-runs.mjs [--check]
//
// Only the fields the MCCB scorer reads are written, each copied from historical files that
// were written before this reconstruction (sources listed with their SHA-256 in every record):
//   source.sha256   direct run: FREEZE-v1.3 runs_to_grade = summary source_sha256 =
//                   manifests/worlds.json = checksums/MCCB-v1.1-source-worlds.sha256;
//                   return run: FREEZE-v1.3 runs_to_grade = summary direct_output_sha256
//   output.sha256   FREEZE-v1.3 runs_to_grade = results/v1.3/OUTPUTS.sha256 =
//                   checksums/MCCB-v1.3-runs-worldswitch-fd9b735.sha256 = summary
//   output.file     results/v1.3/OUTPUTS.sha256 (3rd column)
//   converter, direction, options   direct run: the historical summary.json (converter_build is
//                   the direct run record's `converter`, copied verbatim when it was graded)
//   direction       return run: the run id (`_b2j2b` / `_j2b2j`); no historical file records it
// Nothing else is written: no timestamp, environment, exit status, logs, engine file name, nor
// the return runs' converter / options (no historical source; the scorer does not read them).
// Any disagreement between sources stops the script (exit 1) without writing anything.
// --check: compare the files on disk with what this script would write (exit 1 on a difference).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const COMMIT = 'fd9b73568456efc0b772d958ebffbc5599aa8fac';
const WORLDS = ['B01@1.0', 'B02@1.0', 'B03@1.0', 'J01@1.1', 'J02@1.0', 'J03@1.0', 'J04@1.0'];
const OUT_DIR = 'results/worldswitch/runs';
const RECONSTRUCTED_ON = '2026-10-03';

const read = (rel) => fs.readFileSync(path.join(REPO, rel));
const sha = (rel) => crypto.createHash('sha256').update(read(rel)).digest('hex');
const lines = (rel) => read(rel).toString('utf8').split(/\r?\n/).filter((l) => /^[0-9a-f]{64}\s/.test(l));
const FREEZE = 'reports/freeze/FREEZE-v1.3.json', OUTPUTS = 'results/v1.3/OUTPUTS.sha256';
const CK = 'checksums/MCCB-v1.3-runs-worldswitch-fd9b735.sha256', SRC = 'checksums/MCCB-v1.1-source-worlds.sha256', WM = 'manifests/worlds.json';

const freeze = JSON.parse(read(FREEZE));
const rtg = new Map(freeze.runs_to_grade.map((x) => [x.run, x]));
const outputs = new Map(lines(OUTPUTS).map((l) => { const [h, run, file] = l.split(/\s+/); return [run, { h, file }]; }));
const ck = new Map(lines(CK).map((l) => { const [h, f] = l.split(/\s+\*?/); return [f.replace(/^\*/, '').replace(/\.(zip|mcworld)$/, ''), h]; }));
const srcReg = new Map(lines(SRC).map((l) => { const [h, f] = l.split(/\s+\*?/); return [f.replace(/^\*/, ''), h]; }));
const worlds = JSON.parse(read(WM)).worlds;

const problems = [];
const need = (ok, msg) => { if (!ok) problems.push(msg); };
const records = [];
for (const world of WORLDS) {
  const leg = world.startsWith('J') ? 'j2b' : 'b2j';
  const direct = `ws-fd9b735_${world}_${leg}`, ret = `${direct}2${leg[0]}`;
  const summaryRel = `results/v1.3/worldswitch/${direct}/summary.json`;
  const s = JSON.parse(read(summaryRel));
  const w = worlds.find((x) => x.id === world);
  const canon = w.asset.sha256;
  // every source must agree
  need(srcReg.get(w.asset.name) === canon, `${direct}: source registry ≠ manifests/worlds.json`);
  need(s.world === world && s.direct_run === direct && s.roundtrip_run === ret, `${direct}: summary run ids`);
  need(s.source_sha256 === canon, `${direct}: summary source`);
  need(s.converter_build?.commit === COMMIT, `${direct}: summary converter commit`);
  need(s.direction === (leg === 'j2b' ? 'java_to_bedrock' : 'bedrock_to_java'), `${direct}: summary direction`);
  for (const [id, src, out] of [[direct, canon, s.direct_output_sha256], [ret, s.direct_output_sha256, s.roundtrip_output_sha256]]) {
    const f = rtg.get(id);
    need(f && f.build === 'fd9b735' && f.converter === 'WorldSwitch', `${id}: freeze runs_to_grade build`);
    need(f && f.source_sha256 === src, `${id}: freeze source`);
    need(f && f.output_sha256 === out, `${id}: freeze output`);
    need(outputs.get(id)?.h === out, `${id}: OUTPUTS.sha256`);
    need(ck.get(id) === out, `${id}: ${CK}`);
  }
  const sources = (extra) => ({ [FREEZE]: sha(FREEZE), [OUTPUTS]: sha(OUTPUTS), [CK]: sha(CK), [summaryRel]: sha(summaryRel), ...extra });
  const marker = (id, fields, notRecovered, extra) => ({
    original: false,
    status: 'RECONSTRUCTED provenance — the original run.json is lost (never committed, not found on 2026-10-03); this is not the original file',
    reconstructed_on: RECONSTRUCTED_ON,
    method: 'reports/provenance/reconstruct-ws-fd9b735-runs.mjs (see reports/provenance/ws-fd9b735-run-records.md)',
    fields_from_sources: fields,
    not_recovered: notRecovered,
    sources: sources(extra),
  });
  const common = ['started_at', 'finished_at', 'duration_ms', 'exit_status', 'signal', 'error', 'environment', 'logs', 'peak', 'output.engine_filename', 'output.bytes'];
  records.push({ id: direct, rec: {
    schema: 'mccb.run/1', run_id: direct,
    reconstructed: marker(direct, {
      'source.sha256': 'FREEZE runs_to_grade = summary.source_sha256 = manifests/worlds.json = source registry',
      'output.sha256': 'FREEZE runs_to_grade = OUTPUTS.sha256 = fd9b735 checksums = summary.direct_output_sha256',
      'output.file': 'OUTPUTS.sha256 (3rd column)', converter: 'summary.converter_build (verbatim)', direction: 'summary.direction', options: 'summary.options',
    }, common, { [WM]: sha(WM), [SRC]: sha(SRC) }),
    converter: s.converter_build, direction: s.direction,
    source: { ref: world, file: w.asset.name, sha256: canon }, options: s.options,
    output: { file: outputs.get(direct).file, sha256: s.direct_output_sha256 },
  } });
  records.push({ id: ret, rec: {
    schema: 'mccb.run/1', run_id: ret,
    reconstructed: marker(ret, {
      'source.sha256': 'FREEZE runs_to_grade = summary.direct_output_sha256 (the return run consumed the direct output)',
      'output.sha256': 'FREEZE runs_to_grade = OUTPUTS.sha256 = fd9b735 checksums = summary.roundtrip_output_sha256',
      'output.file': 'OUTPUTS.sha256 (3rd column)', direction: 'run id suffix (no historical file records it)',
    }, [...common, 'converter (only the build is recorded: FREEZE runs_to_grade "fd9b735")', 'options'], {}),
    direction: leg === 'j2b' ? 'bedrock_to_java' : 'java_to_bedrock',
    source: { ref: direct, sha256: s.direct_output_sha256 },
    output: { file: outputs.get(ret).file, sha256: s.roundtrip_output_sha256 },
  } });
}
if (problems.length) { console.error('SOURCES DISAGREE — nothing written:\n  ' + problems.join('\n  ')); process.exit(1); }

const check = process.argv.includes('--check');
let diff = 0;
for (const { id, rec } of records) {
  const file = path.join(REPO, OUT_DIR, id, 'run.json');
  const text = JSON.stringify(rec, null, 1) + '\n';
  if (check) { if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== text) { diff++; console.error(`differs: ${OUT_DIR}/${id}/run.json`); } continue; }
  if (fs.existsSync(path.join(REPO, OUT_DIR, id)) && fs.readdirSync(path.join(REPO, OUT_DIR, id)).some((f) => f !== 'run.json')) { console.error(`${OUT_DIR}/${id} holds other files: refused`); process.exit(1); }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}
console.log(check ? `${records.length - diff}/${records.length} reconstructed records match` : `${records.length} reconstructed records written to ${OUT_DIR}`);
process.exit(diff ? 1 : 0);
