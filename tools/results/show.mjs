#!/usr/bin/env node
// Print detailed results with their fixture, filtered.
//   node tools/results/show.mjs <results dir> [--status FAIL] [--level roundtrip] [--aspect state]
//        [--family block] [--limit 20]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { REPO_ROOT } from '../lib/archive.mjs';
import { readJsonlGz } from '../lib/fixtures-io.mjs';

const dir = path.resolve(process.argv[2]);
const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const want = { status: arg('status'), level: arg('level'), aspect: arg('aspect'), family: arg('family') };
const limit = +arg('limit', 20);
const summary = JSON.parse(fs.readFileSync(path.join(dir, 'summary.json'), 'utf8'));
const fixtures = new Map(readJsonlGz(path.join(REPO_ROOT, summary.fixtures.file)).slice(1).map((o) => [o.id, o]));
const rows = readJsonlGz(path.join(dir, 'results.jsonl.gz'));
let shown = 0, matched = 0;
for (const row of rows) {
  if (want.family && row.family !== want.family) continue;
  for (const [aspect, levels] of Object.entries(row.aspects)) {
    if (want.aspect && aspect !== want.aspect) continue;
    for (const [level, res] of Object.entries(levels)) {
      if (want.level && level !== want.level) continue;
      const st = res.evaluated ? res.status : 'NOT_EVALUATED';
      if (want.status && st !== want.status) continue;
      matched++;
      if (shown++ >= limit) continue;
      const fx = fixtures.get(row.id);
      console.log(`${row.id}#${aspect} [${level}] ${st} ${res.rule || res.reason || ''}`);
      console.log(`   fixture: ${JSON.stringify({ locator: fx.locator, expected: fx.expected }).slice(0, 400)}`);
      if (res.evidence) console.log(`   evidence: ${JSON.stringify(res.evidence).slice(0, 400)}`);
    }
  }
}
console.log(`${matched} matching assertion(s)`);
