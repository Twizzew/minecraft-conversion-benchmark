// node reports/root-causes/classify-je2be-core-8dfc4de.mjs  — every FAIL of je2be (core 8dfc4de) under MCCB v1.3, by cause.
// A reading aid written after grading: it changes no verdict and is not part of the freeze.
import fs from 'node:fs'; import zlib from 'node:zlib'; import path from 'node:path';
const DIR = 'results/v1.3/je2be';
const NEW_26 = /cinnabar|sulfur/;            // blocks added in the 26.x editions, after je2be's targets (Java 1.21.10 / Bedrock 1.21.120)
const cause = (w, r, a, L, x) => {
  if (w.startsWith('J')) return 'A. Java 26 world layout (`dimensions/`) not read: empty Bedrock world (direct) and everything built on it (round trip)';
  const e = r.expected || {}; const id = String(e.name || e.id || '');
  if (r.family === 'player' && L === 'roundtrip' && a === 'spawn_point') return 'I. spec/fixture issue: SpawnX/Y/Z back on the bed block, same respawn block (the same 2 FAILs as WorldSwitch on B02; reports/root-causes/README.md)';
  if (r.family === 'player' && L === 'roundtrip') return 'G. entities / other players not converted or not returned (not reviewed one by one)';
  if (r.family === 'player') return 'B. host player written only in level.dat (Java 1.21.10 layout, no playerdata file): Java 26 drops it on upgrade (Mojang LevelDatToSavedDataFileFix)';
  if (r.family === 'scoreboard') return 'C. scoreboards not converted (no scoreboard code in je2be-core)';
  if (NEW_26.test(id) || NEW_26.test(JSON.stringify(e))) return 'D. 26.x blocks (cinnabar, sulfur) unknown to je2be\'s Bedrock target: lost on the way back';
  if (r.family === 'world' && /ticking_area/.test(x.rule || '')) return 'E. Bedrock ticking areas not written as Java forced chunks';
  if (r.family === 'world' && /gamerule/.test(x.rule || '')) return 'F. intrinsic: Bedrock-only gamerule, no Java counterpart to carry it back';
  if (r.family === 'block' && (/cauldron/.test(id) || /purpur_block/.test(id) || a === 'waterlog')) return 'F. intrinsic: cauldron level, purpur axis, waterlogged door (same FAILs as the other converters)';
  if (r.family === 'entity') return 'G. entities / other players not converted or not returned (not reviewed one by one)';
  return 'H. other, not reviewed one by one';
};
const fixtures = (w) => { const f = fs.readdirSync('fixtures').find((x) => x.startsWith(w + '_')); const m = new Map();
  for (const l of zlib.gunzipSync(fs.readFileSync(path.join('fixtures', f))).toString('utf8').trim().split('\n')) { const r = JSON.parse(l); if (r.id) m.set(r.id, r); } return m; };
const out = {};
for (const d of fs.readdirSync(DIR).sort()) {
  const w = d.split('_')[1].split('@')[0]; const fx = w.startsWith('B') ? fixtures(w) : new Map();
  const buf = zlib.gunzipSync(fs.readFileSync(path.join(DIR, d, 'results.jsonl.gz'))).toString('utf8').trim().split('\n');
  for (const l of buf) { const r0 = JSON.parse(l); const r = { ...(fx.get(r0.id) || {}), ...r0 }; for (const [a, lv] of Object.entries(r.aspects)) for (const L of ['direct', 'roundtrip']) {
    const x = lv[L]; if (!x.evaluated || x.status !== 'FAIL') continue;
    const c = cause(w, r, a, L, x); (out[c] ||= {}); const k = `${w} ${L}`; out[c][k] = (out[c][k] || 0) + 1; } }
}
const lines = ['| Cause | FAIL | Where (world level: count) |', '|---|--:|---|']; let tot = 0;
for (const c of Object.keys(out).sort()) { const n = Object.values(out[c]).reduce((a, b) => a + b, 0); tot += n;
  lines.push(`| ${c} | ${n} | ${Object.entries(out[c]).map(([k, v]) => `${k}: ${v}`).join(' · ')} |`); }
lines.push(`| **Total** | **${tot}** | |`); console.log(lines.join('\n'));
