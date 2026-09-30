#!/usr/bin/env node
// Copies the recorded outputs of one converter build (direct + return leg of every world)
// into a delivery folder under simple names, with SHA256SUMS.txt and BUILD.txt.
//   node tools/results/export-outputs.mjs --prefix ws-0308840+436ede8 --out <folder> [--tag NEW]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { REPO_ROOT } from '../lib/archive.mjs';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const prefix = arg('prefix');
const out = path.resolve(arg('out'));
const tag = arg('tag', 'NEW');
const runsDir = path.join(REPO_ROOT, '_staging', 'runs');
const WORLDS = [['J01@1.1', 'j2b'], ['J02@1.0', 'j2b'], ['J03@1.0', 'j2b'], ['J04@1.0', 'j2b'],
  ['B01@1.0', 'b2j'], ['B02@1.0', 'b2j'], ['B03@1.0', 'b2j'], ['GURREN@1.0', 'b2j']];
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
fs.mkdirSync(out, { recursive: true });
const sums = [];
let build = null;
for (const [w, d] of WORLDS) {
  const short = w.split('@')[0];
  for (const [leg, id] of [['direct', `${prefix}_${w}_${d}`], ['roundtrip', `${prefix}_${w}_${d}2${d[0]}`]]) {
    const runFile = path.join(runsDir, id, 'run.json');
    if (!fs.existsSync(runFile)) { console.log('missing', id); continue; }
    const run = JSON.parse(fs.readFileSync(runFile, 'utf8'));
    build ??= run.converter;
    const src = path.join(runsDir, id, run.output.file);
    const ext = path.extname(run.output.file);
    const name = `${short}_${tag}_${leg}${ext}`;
    fs.copyFileSync(src, path.join(out, name));
    const h = sha(path.join(out, name));
    if (h !== run.output.sha256) throw new Error(`hash mismatch for ${name}`);
    sums.push(`${h}  ${name}`);
    console.log(name, h.slice(0, 12), `(${id})`);
  }
}
fs.writeFileSync(path.join(out, 'SHA256SUMS.txt'), sums.join('\n') + '\n');
fs.writeFileSync(path.join(out, 'BUILD.txt'), [
  `WorldSwitch build: commit ${build.commit}`,
  build.working_tree_fingerprint
    ? `working tree NOT committed — fingerprint ${build.working_tree_fingerprint.sha256}\n  (${build.working_tree_fingerprint.algorithm}, ${build.working_tree_fingerprint.files} files)`
    : 'working tree clean',
  `engine package ${build.engine_package} ${build.engine_package_version}`,
  `run ids: ${prefix}_<world>_<j2b|b2j>[2j|2b] in the MCCB runs folder`,
  'direct = conversion to the other edition; roundtrip = that output converted back.',
  'GURREN files are PRIVATE (other players\' identifiers, Realms data): never publish them.',
].join('\n') + '\n');
console.log('wrote', out);
