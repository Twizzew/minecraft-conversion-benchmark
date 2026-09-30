#!/usr/bin/env node
// Check that the fixture registries on disk are the frozen ones: the SHA-256 of each
// file's decompressed content must equal reports/freeze/FREEZE-v1.1.json (and
// manifests/fixtures.json). Run after `node fixtures/build-fixtures.mjs`.
import fs from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from '../lib/archive.mjs';
import { readFixtures } from '../lib/fixtures-io.mjs';

const freezeFile = path.join(REPO_ROOT, 'reports', 'freeze', 'FREEZE-v1.1.json');
const freeze = JSON.parse(fs.readFileSync(freezeFile, 'utf8'));
let bad = 0;
for (const f of freeze.fixtures) {
  const now = readFixtures(f.world);
  const ok = now.content_sha256 === f.content_sha256;
  if (!ok) bad++;
  console.log(`${ok ? 'OK  ' : 'DIFF'} ${f.world}  ${now.content_sha256}${ok ? '' : `  (frozen: ${f.content_sha256})`}`);
}
console.log(bad ? `${bad} fixture registr${bad > 1 ? 'ies differ' : 'y differs'} from the freeze` : 'all fixture registries match the freeze');
process.exit(bad ? 1 : 0);
