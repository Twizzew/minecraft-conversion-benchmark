#!/usr/bin/env node
// Compare two sets of evaluation summaries (before / after a rule change) and print every
// family.aspect.level whose counts changed — used to fill docs/rules-changelog.md.
//   node tools/results/diff-summaries.mjs <dir of old summary JSONs> [results/worldswitch]
import fs from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from '../lib/archive.mjs';

const oldDir = path.resolve(process.argv[2]);
const newDir = path.resolve(process.argv[3] || path.join(REPO_ROOT, 'results', 'worldswitch'));
const flat = (s) => {
  const m = new Map();
  for (const x of s.summary) {
    const c = Object.entries(x.counts).filter(([, v]) => v).map(([k, v]) => `${k}:${v}`);
    if (x.not_evaluated) c.push(`NE:${x.not_evaluated}`);
    m.set(`${x.family}.${x.aspect}.${x.level}`, c.join(' '));
  }
  return m;
};
for (const f of fs.readdirSync(oldDir).filter((x) => x.endsWith('.json')).sort()) {
  const run = f.replace(/\.json$/, '');
  const nf = path.join(newDir, run, 'summary.json');
  if (!fs.existsSync(nf)) continue;
  const a = flat(JSON.parse(fs.readFileSync(path.join(oldDir, f), 'utf8')));
  const b = flat(JSON.parse(fs.readFileSync(nf, 'utf8')));
  const keys = [...new Set([...a.keys(), ...b.keys()])].sort().filter((k) => a.get(k) !== b.get(k) && !k.endsWith('.behavior'));
  if (!keys.length) continue;
  console.log(`== ${run}`);
  for (const k of keys) console.log(`  ${k}: ${a.get(k) ?? '-'}  ->  ${b.get(k) ?? '-'}`);
}
