// Pack a Java world FOLDER into a zip (top folder = world folder name), entries sorted,
// fixed timestamps, content unmodified — so the same folder always gives the same bytes.
//   node tools/worlds/pack-java-folder.mjs <world-folder> <out.zip>
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const AdmZip = require('adm-zip');
const [dir, out] = process.argv.slice(2);
const root = path.basename(path.resolve(dir));
const files = [];
const walk = (d) => { for (const f of fs.readdirSync(d).sort()) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else files.push(p); } };
walk(dir);
const zip = new AdmZip();
const T = new Date('2026-11-01T00:00:00Z');
for (const f of files) {
  const rel = `${root}/${path.relative(dir, f).split(path.sep).join('/')}`;
  zip.addFile(rel, fs.readFileSync(f));
  zip.getEntry(rel).header.time = T;
}
zip.writeZip(out);
console.log(`${out}: ${files.length} files`);
