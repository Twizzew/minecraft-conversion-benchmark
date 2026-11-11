// v1.3 closure — R01 fixture routing: the historical (graded) registry and the public one
// are different files; neither is substituted for the other silently.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { readFixtures, PRIVATE_DIR, isPrivateWorld } from '../../lib/fixtures-io.mjs';
import { REPO_ROOT } from '../../lib/archive.mjs';

const PUBLIC = path.join(REPO_ROOT, 'fixtures', 'R01_1.0.jsonl.gz');
const PRIVATE = path.join(PRIVATE_DIR, 'fixtures', 'R01_1.0.jsonl.gz');

test('R01@1.0 is PRIVATE in the manifest: routed to the historical registry, which a public clone does not have', { skip: fs.existsSync(PRIVATE) && 'private registry present on this machine' }, () => {
  assert.equal(isPrivateWorld('R01@1.0'), true);
  assert.throws(() => readFixtures('R01@1.0'), (e) => /PRIVATE/.test(e.message) && /public/.test(e.message) && /run-r01\.sh/.test(e.message));
});

test('the public registry is used only when named, and is the one rebuilt from the published file', () => {
  const fx = readFixtures('R01@1.0', { file: PUBLIC });
  assert.equal(fx.content_sha256, '2c107cc4a9524fd157012149604ad950e0ce110ac28a03cbcd13b14df1b43672');
  assert.equal(fx.header.source_sha256, '4cc666cf1325caa53e26189558d09b2f8bc534b733f134c58dd485b3c9d461fa');
  // …and it is NOT the registry of the historical grading (addendum: 9af167af…, file a6403742…)
  const add = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'reports', 'freeze', 'FREEZE-v1.3-R01-ADDENDUM.json'), 'utf8'));
  assert.notEqual(fx.content_sha256, add.fixtures.content_sha256);
});
