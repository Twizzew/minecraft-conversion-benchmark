// Check downloaded files against a checksum list of this repository (Windows, macOS, Linux).
//
//   node tools/verify-checksums.mjs checksums/MCCB-2026-11-source-worlds.sha256 <folder with the worlds>
//   node tools/verify-checksums.mjs checksums/MCCB-2026-11-outputs-chunker-1.21.0.sha256 <folder>
//
// Each line is `<sha256>  <file>`. For an outputs list the file is `<converter>/<WORLD>_<leg>_output.<ext>`:
// point <folder> at the place where the release zip was extracted. Files that are absent are
// reported as MISSING. Exit code 0 only when every listed file is present and matches.
// (tools/verify.sh and tools/verify.ps1 stay as they were frozen for MCCB v1.0.)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const [list, folder = '.'] = process.argv.slice(2);
if (!list) { console.error('usage: node tools/verify-checksums.mjs <checksum file> [folder]'); process.exit(2); }

const hashFile = (file) => new Promise((resolve, reject) => {
  const h = crypto.createHash('sha256');
  fs.createReadStream(file).on('data', (d) => h.update(d)).on('end', () => resolve(h.digest('hex'))).on('error', reject);
});

let ok = 0, bad = 0;
for (const raw of fs.readFileSync(list, 'utf8').split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  const m = /^([0-9a-f]{64})\s+\*?(.+)$/i.exec(line);
  if (!m) { console.log(`unreadable line: ${line}`); bad++; continue; }
  const [, want, name] = m;
  const file = path.join(folder, name);
  if (!fs.existsSync(file)) { console.log(`${name} : MISSING`); bad++; continue; }
  const got = await hashFile(file);
  if (got === want.toLowerCase()) { console.log(`${name} : OK`); ok++; }
  else { console.log(`${name} : FAILED\n    expected ${want}\n    actual   ${got}`); bad++; }
}
console.log(`\n${ok}/${ok + bad} file(s) verified.`);
process.exit(bad || !ok ? 1 : 0);
