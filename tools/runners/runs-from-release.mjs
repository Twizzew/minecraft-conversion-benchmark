// Turn a converted-worlds zip of a release into the run folders the oracles read.
//
//   node tools/runners/runs-from-release.mjs <MCCB-2026-11-outputs-<converter>.zip> <runs folder>
//
// For every world in the zip (`<converter>/<WORLD>_<aller|retour>_output.<ext>`), the run record
// published in results/2026-11/<converter>/<WORLD>/run-<aller|retour>.json is copied next to the
// output, as <runs folder>/<WORLD>_<aller|retour>/run.json + the output under the name the record
// gives. The SHA-256 of every output is checked against its record first; nothing is written for
// an output that does not match. Then point MCCB_RUNS_DIR at <runs folder>.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import AdmZip from 'adm-zip';
import { REPO_ROOT } from '../lib/archive.mjs';

const [zipFile, outDir] = process.argv.slice(2);
if (!zipFile || !outDir) {
  console.error('usage: node tools/runners/runs-from-release.mjs <outputs zip> <runs folder>');
  process.exit(2);
}
const zip = new AdmZip(zipFile);
let written = 0, failed = 0;
for (const e of zip.getEntries()) {
  if (e.isDirectory) continue;
  const m = /^([^/]+)\/([A-Z0-9]+)_(aller|retour)_output\.[a-z]+$/.exec(e.entryName);
  if (!m) continue;
  const [, converter, world, leg] = m;
  const recordFile = path.join(REPO_ROOT, 'results', '2026-11', converter, world, `run-${leg}.json`);
  if (!fs.existsSync(recordFile)) { console.error(`${e.entryName}: no run record ${path.relative(REPO_ROOT, recordFile)}`); failed++; continue; }
  const record = JSON.parse(fs.readFileSync(recordFile, 'utf8'));
  const bytes = e.getData();
  const sha = crypto.createHash('sha256').update(bytes).digest('hex');
  if (!record.output || sha !== record.output.sha256) {
    console.error(`${e.entryName}: SHA-256 ${sha} does not match the run record (${record.output?.sha256 ?? 'no output'})`);
    failed++; continue;
  }
  const dir = path.join(outDir, `${world}_${leg}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'run.json'), JSON.stringify(record, null, 1) + '\n');
  fs.writeFileSync(path.join(dir, record.output.file), bytes);
  written++;
}
console.log(`${written} run folder(s) written in ${outDir}${failed ? `, ${failed} refused` : ''}`);
process.exit(failed ? 1 : 0);
