// v1.3 closure, fourth pass: Rule 49 states (single / valid pair / undetermined pair), a
// collision-free canonical NBT form, exact longs, an authenticated freeze, classpath failures.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { T, jItem, bItem, javaWorld, bedrockWorld, view, run, status, useSyntheticJavaReports } from './helpers.mjs';
import { gameRead, snbt } from '../../lib/nbt.mjs';

useSyntheticJavaReports(['minecraft:diamond', 'minecraft:emerald']);
const TOOLS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO = path.resolve(TOOLS, '..');

// ── 1. Rule 49: three distinct states ───────────────────────────────────────
const P = [10, 64, 10], Q = [11, 64, 10];
const bchest = (pos, items, extra = {}) => T.c({ id: T.str('Chest'), x: T.i(pos[0]), y: T.i(pos[1]), z: T.i(pos[2]), Items: T.lc(items), ...extra });
const pairTo = (pos, lead) => ({ pairx: T.i(pos[0]), pairz: T.i(pos[2]), ...(lead === undefined ? {} : { pairlead: T.b(lead) }) });
const VALID_SRC = () => bedrockWorld({ blockEntities: [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), bchest(Q, [bItem('minecraft:emerald', 1, 0)])] });
const SINGLE_SRC = () => bedrockWorld({ blockEntities: [bchest(P, [bItem('minecraft:diamond', 1, 0)])] });
const atP = (rows, level) => status(rows.find((x) => x.subject.locator.pos.join() === P.join()).res.identity[level]);
const rt = async (src, target) => atP(await run('item_stack', { source: src, sourceEdition: 'bedrock', roundtrip: view('bedrock', target) }), 'roundtrip');

const PARTIAL_MARKERS = {
  'pairx only': [bchest(P, [bItem('minecraft:diamond', 1, 0)], { pairx: T.i(Q[0]) }), bchest(Q, [bItem('minecraft:emerald', 1, 0)])],
  'pairz only': [bchest(P, [bItem('minecraft:diamond', 1, 0)], { pairz: T.i(Q[2]) }), bchest(Q, [bItem('minecraft:emerald', 1, 0)])],
  'pairlead only': [bchest(P, [bItem('minecraft:diamond', 1, 0)], { pairlead: T.b(1) }), bchest(Q, [bItem('minecraft:emerald', 1, 0)])],
  'partner pairlead-only, own not lead': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 0)), bchest(Q, [bItem('minecraft:emerald', 1, 0)], { pairlead: T.b(1) })],
  'partner pairlead-only, both lead (double lead)': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), bchest(Q, [bItem('minecraft:emerald', 1, 0)], { pairlead: T.b(1) })],
};
test('Rule 49: partial / malformed Bedrock pair markers are an undetermined pair, never a single chest', async () => {
  for (const [name, bes] of Object.entries(PARTIAL_MARKERS)) assert.notEqual(await rt(VALID_SRC(), bedrockWorld({ blockEntities: bes })), 'PASS', name);
});
test('Rule 49: source SINGLE chest → target with an invalid / undetermined pair → never PASS at the local slot', async () => {
  for (const [name, bes] of Object.entries({ ...PARTIAL_MARKERS,
    'two leads': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), bchest(Q, [], pairTo(P, 1))],
    'partner missing': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1))] })) {
    assert.notEqual(await rt(SINGLE_SRC(), bedrockWorld({ blockEntities: bes })), 'PASS', name);
  }
  // Java target with an invalid pair (facings differ)
  const jc = (pos, items) => T.c({ id: T.str('minecraft:chest'), x: T.i(pos[0]), y: T.i(pos[1]), z: T.i(pos[2]), Items: T.lc(items) });
  const jw = javaWorld({ blockEntities: [jc(P, [jItem('minecraft:diamond', 1, 0)]), jc(Q, [])],
    blocks: { [P.join()]: { name: 'minecraft:chest', props: { type: 'right', facing: 'south' } }, [Q.join()]: { name: 'minecraft:chest', props: { type: 'left', facing: 'north' } } } });
  const rows = await run('item_stack', { source: SINGLE_SRC(), sourceEdition: 'bedrock', direct: view('java', jw) });
  assert.notEqual(atP(rows, 'direct'), 'PASS');
});
test('Rule 49: source UNDETERMINED pair → target single chest → never PASS at the local slot', async () => {
  const amb = bedrockWorld({ blockEntities: [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), bchest(Q, [bItem('minecraft:emerald', 1, 0)], pairTo(P, 1))] });
  const rows = await run('item_stack', { source: amb, sourceEdition: 'bedrock', roundtrip: view('bedrock', SINGLE_SRC()) });
  assert.equal(rows.find((x) => x.subject.locator.pos.join() === P.join()).subject.expected.pair_half, null);
  assert.notEqual(atP(rows, 'roundtrip'), 'PASS');
});
test('Rule 49 not regressed: single → single PASS; valid pair → same 54 slots PASS', async () => {
  assert.equal(await rt(SINGLE_SRC(), SINGLE_SRC()), 'PASS');
  assert.equal(await rt(VALID_SRC(), VALID_SRC()), 'PASS');
});

// ── 2 / 3. canonical form ───────────────────────────────────────────────────
const G = (t) => gameRead(snbt(t));
test('canonical form: no collision between typed arrays and a compound using any key', () => {
  for (const [ty, key] of [['byteArray', '\u0000B'], ['intArray', '\u0000I'], ['longArray', '\u0000L']]) {
    const arr = { type: ty, value: ty === 'longArray' ? [[0, 1], [0, 2]] : [1, 2] };
    const fake = T.c({ [key]: { type: 'list', value: { type: ty === 'longArray' ? 'long' : ty === 'byteArray' ? 'byte' : 'int', value: ty === 'longArray' ? [[0, 1], [0, 2]] : [1, 2] } } });
    assert.notEqual(G(arr), G(fake), ty);
    assert.notEqual(G(T.c({ x: arr })), G(T.c({ x: fake })), `nested ${ty}`);
  }
});
test('canonical form: a big long never equals a string, whatever the string', () => {
  const big = { type: 'long', value: [0x7fffffff, 0xffffffff] };
  for (const s of ['9223372036854775807', '\u0000long:9223372036854775807', '<empty-bedrock-stack>']) assert.notEqual(G(T.c({ v: big })), G(T.c({ v: T.str(s) })), s);
  assert.notEqual(G(T.c({ v: T.i(1) })), G(T.c({ v: T.str('1') })));
});
const long = (n) => { const b = BigInt.asUintN(64, BigInt(n)); return { type: 'long', value: [Number(b >> 32n) | 0, Number(b & 0xffffffffn) | 0] }; };
test('numeric scalars: exact comparison of big longs and doubles', () => {
  const two53 = 2n ** 53n;
  assert.equal(G(T.c({ v: long(two53 - 1n) })), G(T.c({ v: T.d(Number(two53 - 1n)) })), '2^53-1');
  assert.equal(G(T.c({ v: long(two53) })), G(T.c({ v: T.d(Number(two53)) })), '2^53');
  assert.notEqual(G(T.c({ v: long(two53 + 1n) })), G(T.c({ v: T.d(Number(two53 + 1n)) })), '2^53+1 is not the rounded double');
  assert.notEqual(G(T.c({ v: long(two53 + 1n) })), G(T.c({ v: long(two53) })));
  assert.equal(G(T.c({ v: long(-5) })), G(T.c({ v: T.i(-5) })));
  assert.equal(G(T.c({ v: T.b(1) })), G(T.c({ v: T.d(1) })));
  assert.notEqual(G(T.c({ v: T.i(1) })), G(T.c({ v: T.d(1.5) })));
});

// ── 4. freeze authentication ────────────────────────────────────────────────
test('freeze: a look-alike main freeze is not official; an addendum never overrides an existing world', async () => {
  const { freezeFixtureRefs } = await import('../../lib/freeze-ref.mjs');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-freeze4-'));
  const real = JSON.parse(fs.readFileSync(path.join(REPO, 'reports', 'freeze', 'FREEZE-v1.3.json'), 'utf8'));
  const fake = path.join(tmp, 'FREEZE-fake.json');
  fs.writeFileSync(fake, JSON.stringify({ ...real, fixtures: real.fixtures.map((f) => ({ ...f, content_sha256: 'a'.repeat(64) })) }));
  assert.throws(() => freezeFixtureRefs([fake]), /not .*official|authent/i);
  // an "addendum" pointing to the real freeze but overlaying B01@1.0
  const mainSha = crypto.createHash('sha256').update(fs.readFileSync(path.join(REPO, 'reports', 'freeze', 'FREEZE-v1.3.json'))).digest('hex');
  const add = path.join(tmp, 'ADD.json');
  fs.writeFileSync(add, JSON.stringify({ freeze_file_sha256: mainSha, fixtures: { content_sha256: 'b'.repeat(64) }, worlds_manifest_overlay: { id: 'B01@1.0' } }));
  assert.throws(() => freezeFixtureRefs(['reports/freeze/FREEZE-v1.3.json', add]), /not .*official|authent|overrid|already/i);
  // even an authenticated addendum may not replace a world of the main freeze
  assert.throws(() => freezeFixtureRefs(['reports/freeze/FREEZE-v1.3.json', add], { extraAddenda: [crypto.createHash('sha256').update(fs.readFileSync(add)).digest('hex')] }), /already|overrid/i);
  // the real pair still works, GURREN = the graded registry
  const ok = freezeFixtureRefs(['reports/freeze/FREEZE-v1.3.json', 'reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json']);
  assert.equal(ok.fixtures.get('GURREN@1.0'), '9af167af59a6bb423baa64f688610a11ed26533f1ed9fc599f1b003d0fcd9e29');
  assert.equal(ok.fixtures.get('B01@1.0'), '780d5858bf7f1fab101cdbf64e6f1f3f0e9afa493a33526b37d76b33518cd048');
});

// ── 5. classpath: missing installation = SKIP; a broken one = FAIL ──────────
const SRCDIR = process.env.MCCB_SOURCES_DIR || path.join(REPO, '_staging', 'v1.1-source-worlds');
const J02 = path.join(SRCDIR, 'MCCB_J02_LIVING_JAVA.zip');
test('selftests: a corrupt Minecraft version manifest is FAIL; an absent installation is SKIP', { skip: fs.existsSync(J02) ? false : 'J02 source not present' }, () => {
  const runB = (appdata) => spawnSync(process.execPath, [path.join(TOOLS, 'selftest', 'run-selftests.mjs'), 'B'], {
    encoding: 'utf8', env: { ...process.env, APPDATA: appdata, MCCB_SOURCES_DIR: SRCDIR, MCCB_WORK_DIR: path.join(appdata, 'work'), MCCB_SELFTEST_REPORT_DIR: path.join(appdata, 'report') } });
  const corrupt = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-cp-'));
  fs.mkdirSync(path.join(corrupt, '.minecraft', 'versions', '26.3'), { recursive: true });
  fs.writeFileSync(path.join(corrupt, '.minecraft', 'versions', '26.3', '26.3.json'), '{ not json');
  const r1 = runB(corrupt);
  assert.match(r1.stdout, /^FAIL {2}B\.identity J02@1\.0/m, r1.stdout);
  const absent = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-cp-'));
  const r2 = runB(absent);
  assert.match(r2.stdout, /^SKIP {2}B\.identity J02@1\.0/m, r2.stdout);
});
