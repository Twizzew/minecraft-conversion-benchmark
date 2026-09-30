// Identity of a WorldSwitch engine checkout whose working tree differs from its commit.
// The conversion code is `lib/` (tracked or not) plus the dependency pins: the fingerprint
// is the SHA-256 of "<relative path>\0<file SHA-256>\n" lines for those files, sorted.
// A clean checkout is identified by its commit alone.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');

export function engineFingerprint(engineDir) {
  const files = [];
  const walk = (rel) => {
    for (const e of fs.readdirSync(path.join(engineDir, rel), { withFileTypes: true })) {
      const r = path.posix.join(rel, e.name);
      if (e.isDirectory()) walk(r); else files.push(r);
    }
  };
  walk('lib');
  for (const f of ['package.json', 'package-lock.json']) if (fs.existsSync(path.join(engineDir, f))) files.push(f);
  files.sort();
  const lines = files.map((f) => `${f}\0${sha256(fs.readFileSync(path.join(engineDir, f)))}\n`).join('');
  return { algorithm: 'sha256(sorted "<path>\\0<sha256>\\n" over lib/** + package.json + package-lock.json)', files: files.length, sha256: sha256(lines) };
}
