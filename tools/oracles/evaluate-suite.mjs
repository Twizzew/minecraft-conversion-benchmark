#!/usr/bin/env node
// Evaluate every run pair of a suite (direct leg + return leg) with the current fixtures.
//   node tools/oracles/evaluate-suite.mjs [--converter worldswitch] [--commit 0308840] [--prefix ws-0308840]
//        [--suite tools/runners/worldswitch/suite-mccb-v1.1.json] [--only J04@1.0,...]
//        [--results-dir results/v1.2] [--heap 12288]
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const converter = arg('converter', 'worldswitch');
const commit = arg('commit', '0308840');
const prefix = arg('prefix', `ws-${commit}`); // run ids are <prefix>_<world>_<j2b|b2j>[2j|2b]
const suite = JSON.parse(fs.readFileSync(path.resolve(arg('suite', path.join(ROOT, 'tools', 'runners', 'worldswitch', 'suite-mccb-v1.1.json'))), 'utf8'));
const only = arg('only')?.split(',');
// Where results go (default `results/`, the v1.1 location); a later version uses its own folder.
const resultsDir = path.resolve(ROOT, arg('results-dir', 'results'));
const heap = arg('heap', '12288');
const short = { java_to_bedrock: 'j2b', bedrock_to_java: 'b2j' };
const pairs = [];
for (const w of suite.worlds) {
  if (only && !only.includes(w.id)) continue;
  const d = `${prefix}_${w.id}_${short[w.direction]}`;
  pairs.push({ world: w.id, direct: d, roundtrip: `${d}2${short[w.direction][0]}` });
}
for (const p of pairs) {
  const t0 = Date.now();
  const r = spawnSync(process.execPath, [`--max-old-space-size=${heap}`, path.join(HERE, 'evaluate.mjs'), '--world', p.world, '--direct', p.direct, '--roundtrip', p.roundtrip,
    '--converter', converter, '--out', path.join(resultsDir, converter, p.direct)], { encoding: 'utf8', maxBuffer: 1 << 28 });
  process.stdout.write(`== ${p.world} (${((Date.now() - t0) / 1000).toFixed(0)} s, exit ${r.status})\n${r.stdout}${r.stderr ? r.stderr.slice(-3000) : ''}\n`);
}
