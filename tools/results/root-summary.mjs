#!/usr/bin/env node
// Coarse root-cause summary of FAIL (and PARTIAL) for one converter, so that one repeated
// behaviour reads as ONE line: family.aspect · level · object family (wood/colour variants
// merged) · which state keys / which kind of evidence. Read-only; a grouping aid, not a verdict.
//   node tools/results/root-summary.mjs <results dir> <run prefix> [--statuses FAIL] [--top 15] [--private-dir d]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fixtureFile, parseJsonlBuffer } from '../lib/fixtures-io.mjs';
const [dirArg, prefix] = process.argv.slice(2);
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const STAT = new Set(arg('statuses', 'FAIL').split(','));
const TOP = Number(arg('top', 15));
const dirs = [path.resolve(dirArg), ...(arg('private-dir') ? [path.resolve(arg('private-dir'))] : [])];
const VARIANT = /^minecraft:((white|orange|magenta|light_blue|yellow|lime|pink|gray|light_gray|cyan|purple|blue|brown|green|red|black|oak|spruce|birch|jungle|acacia|dark_oak|mangrove|cherry|pale_oak|bamboo|crimson|warped|copper|exposed_copper|weathered_copper|oxidized_copper|waxed_[a-z_]+?)_)/;
const norm = (k) => String(k || '').replace(VARIANT, 'minecraft:*_');
const groups = new Map();
let total = 0;
for (const base of dirs) for (const run of fs.readdirSync(base).filter((d) => d.startsWith(prefix + '_') && fs.existsSync(path.join(base, d, 'summary.json')))) {
  const s = JSON.parse(fs.readFileSync(path.join(base, run, 'summary.json'), 'utf8'));
  const fx = new Map(parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(fixtureFile(s.world)))).slice(1).map((x) => [x.id, x]));
  for (const r of parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(path.join(base, run, 'results.jsonl.gz'))))) {
    const f = fx.get(r.id);
    const kind = norm(f?.expected?.structure ?? f?.expected?.id ?? f?.expected?.name ?? f?.locator?.kind ?? '');
    for (const [aspect, lv] of Object.entries(r.aspects)) for (const L of ['direct', 'roundtrip']) {
      const x = lv[L];
      if (!x?.evaluated || !STAT.has(x.status)) continue;
      total++;
      const ev = x.evidence || {};
      let shape = '';
      if (ev.observed && typeof ev.observed === 'object' && !Array.isArray(ev.observed)) shape = 'keys:' + Object.keys(ev.observed).sort().join(',');
      else if (ev.differing_keys) shape = 'keys:' + ev.differing_keys.slice().sort().join(',');
      else if (typeof ev.observed === 'string') shape = ev.observed === '' ? 'observed:empty' : /^minecraft:air$/.test(ev.observed) ? 'observed:air' : 'observed:other';
      else if (ev.observed === null) shape = 'observed:absent';
      const sig = `${r.family}.${aspect} · ${L} · ${kind} · ${x.rule.replace(/^[^.]+\.[^.]+\./, '')}${shape ? ' · ' + shape : ''}`;
      const g = groups.get(sig) || { n: 0, worlds: new Set(), ex: r.id };
      g.n++; g.worlds.add(s.world.split('@')[0]); groups.set(sig, g);
    }
  }
}
const list = [...groups].sort((a, b) => b[1].n - a[1].n);
console.log(`${prefix}: ${total} ${[...STAT].join('/')} in ${list.length} groups; top ${TOP}:`);
for (const [sig, g] of list.slice(0, TOP)) console.log(`${String(g.n).padStart(7)}  [${[...g.worlds].join(',')}]  ${sig}   e.g. ${g.ex}`);
