// Inspect brut (sans normalisation Mojang) des entités d'un monde Java, près d'une position.
//   node tools/results/inspect-java-entity.mjs <racine du monde> <dim:overworld> <x> <y> <z> [rayon]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const nbt = require('prismarine-nbt');
const [root, dim, X, Y, Z, R = '1.5'] = process.argv.slice(2);
const cx = Math.floor(+X / 16), cz = Math.floor(+Z / 16);
const cands = [path.join(root, 'dimensions', 'minecraft', dim, 'entities'), dim === 'overworld' ? path.join(root, 'entities') : path.join(root, dim === 'the_nether' ? 'DIM-1' : 'DIM1', 'entities')];
for (const dir of cands) {
  const f = path.join(dir, `r.${Math.floor(cx / 32)}.${Math.floor(cz / 32)}.mca`);
  if (!fs.existsSync(f)) continue;
  const b = fs.readFileSync(f);
  const i = ((cz & 31) << 5) | (cx & 31);
  const loc = b.readUInt32BE(i * 4); if (!loc) { console.log(f, 'chunk absent'); continue; }
  const pos = (loc >>> 8) * 4096, len = b.readUInt32BE(pos), ct = b[pos + 4];
  const raw = ct === 2 ? zlib.inflateSync(b.subarray(pos + 5, pos + 4 + len)) : zlib.gunzipSync(b.subarray(pos + 5, pos + 4 + len));
  const s = nbt.simplify((await nbt.parse(raw)).parsed);
  console.log(`${f} chunk ${cx},${cz} DataVersion=${s.DataVersion} entities=${(s.Entities || []).length}`);
  for (const e of s.Entities || []) {
    const [ex, ey, ez] = e.Pos;
    if (Math.abs(ex - X) <= +R && Math.abs(ey - Y) <= +R + 1 && Math.abs(ez - Z) <= +R) console.log(JSON.stringify(e, (k, v) => (typeof v === 'bigint' ? String(v) : v)).slice(0, 2500));
  }
}
