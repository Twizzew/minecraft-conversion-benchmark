// v1.3 closure, third pass: item context only from the extraction path (B1), typed arrays kept
// (B2), invalid double-chest pairs never read as single chests (B3), official grading locked on
// the freeze (B4), numeric width of longs (B5), selftest SKIP only for missing inputs (B6).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { T, jItem, bItem, javaWorld, bedrockWorld, view, run, status, useSyntheticJavaReports } from './helpers.mjs';
import { gameRead, gameReadMap, snbt } from '../../lib/nbt.mjs';

useSyntheticJavaReports(['minecraft:diamond', 'minecraft:emerald', 'minecraft:iron_helmet']);
const TOOLS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO = path.resolve(TOOLS, '..');

// ── B1. item defaults only where the path guarantees an item ────────────────
const jEnt = (id, extra) => T.c({ id: T.str(id), Pos: T.ld([5.5, 64, 5.5]), UUID: T.ia([1, 2, 3, 4]), ...extra });
const bEnt = (id, extra) => T.c({ identifier: T.str(id), Pos: T.lf([5.5, 64, 5.5]), UniqueID: { type: 'long', value: [0, 7] }, ...extra });
const dataRT = async (src, out, edition = 'java') => {
  const w = (t) => (edition === 'java' ? javaWorld({ entities: [t] }) : bedrockWorld({ actors: [t] }));
  const rows = await run('entity', { source: w(src), sourceEdition: edition, roundtrip: view(edition, w(out)) });
  return status(rows[0].res.data.roundtrip);
};
const bLike = (withDamage) => T.c({ Name: T.str('not-item'), Count: T.b(1), tag: T.c(withDamage ? { Damage: T.i(0), x: T.i(1) } : { x: T.i(1) }) });
const jLike = (withDamage) => T.c({ id: T.str('not-item'), count: T.i(1), components: T.c(withDamage ? { 'minecraft:damage': T.i(0), x: T.i(1) } : { x: T.i(1) }) });

test('B1: an item-SHAPED compound in arbitrary entity data does not get item defaults (Java and Bedrock)', async () => {
  assert.equal(await dataRT(jEnt('minecraft:marker', { data: T.c({ blob: bLike(true) }) }), jEnt('minecraft:marker', { data: T.c({ blob: bLike(false) }) })), 'PARTIAL');
  assert.equal(await dataRT(jEnt('minecraft:marker', { data: T.c({ blob: jLike(true) }) }), jEnt('minecraft:marker', { data: T.c({ blob: jLike(false) }) })), 'PARTIAL');
  assert.equal(await dataRT(bEnt('minecraft:zombie', { MccbBlob: bLike(true) }), bEnt('minecraft:zombie', { MccbBlob: bLike(false) }), 'bedrock'), 'PARTIAL');
  // …in an arbitrary list
  assert.equal(await dataRT(jEnt('minecraft:marker', { data: T.c({ l: T.lc([bLike(true)]) }) }), jEnt('minecraft:marker', { data: T.c({ l: T.lc([bLike(false)]) }) })), 'PARTIAL');
  // …and an item-shaped "empty stack" in an arbitrary list is not an empty stack
  const e1 = T.lc([T.c({ Name: T.str(''), Count: T.b(0), Damage: T.s(0) })]), e2 = T.lc([T.c({ Name: T.str(''), Count: T.b(0) })]);
  assert.equal(await dataRT(bEnt('minecraft:zombie', { MccbList: e1 }), bEnt('minecraft:zombie', { MccbList: e2 }), 'bedrock'), 'PARTIAL');
});

test('B1: an item-shaped compound in block entity data does not get item defaults', async () => {
  for (const [ed, id, blob] of [['java', 'minecraft:barrel', bLike], ['java', 'minecraft:barrel', jLike], ['bedrock', 'Barrel', bLike]]) {
    const be = (b) => T.c({ id: T.str(id), x: T.i(1), y: T.i(2), z: T.i(3), MccbBlob: b });
    const w = (t) => (ed === 'bedrock' ? bedrockWorld({ blockEntities: [t] }) : javaWorld({ blockEntities: [t], blocks: { '1,2,3': { name: 'minecraft:barrel', props: {} } } }));
    const rows = await run('block_entity', { source: w(be(blob(true))), sourceEdition: ed, roundtrip: view(ed, w(be(blob(false)))) });
    assert.equal(status(rows[0].res.data.roundtrip), 'PARTIAL', `${ed} ${id}`);
  }
});

test('B1: minecraft:custom_data holding an item-shaped compound (item_stack component, round trip) → FAIL', async () => {
  const item = (cd) => T.c({ Slot: T.b(0), id: T.str('minecraft:diamond'), count: T.i(1), components: T.c({ 'minecraft:custom_data': cd }) });
  const be = (it) => T.c({ id: T.str('minecraft:barrel'), x: T.i(1), y: T.i(2), z: T.i(3), Items: T.lc([it]) });
  const w = (t) => javaWorld({ blockEntities: [t], blocks: { '1,2,3': { name: 'minecraft:barrel', props: {} } } });
  const rows = await run('item_stack', { source: w(be(item(bLike(true)))), sourceEdition: 'java', roundtrip: view('java', w(be(item(bLike(false))))) });
  assert.equal(status(rows[0].res['component:minecraft:custom_data'].roundtrip), 'FAIL');
});

test('B1: REAL items keep the demonstrated equivalences (entity equipment / armour lists, held items)', async () => {
  const helmet = (tag) => T.c({ Count: T.b(1), Damage: T.s(0), Name: T.str('minecraft:iron_helmet'), WasPickedUp: T.b(0), ...(tag ? { tag } : {}) });
  assert.equal(await dataRT(bEnt('minecraft:zombie', { Armor: T.lc([helmet(T.c({ Damage: T.i(0) }))]) }), bEnt('minecraft:zombie', { Armor: T.lc([helmet(null)]) }), 'bedrock'), 'PASS');
  const jh = (c) => T.c({ id: T.str('minecraft:iron_helmet'), count: T.i(1), ...(c ? { components: c } : {}) });
  assert.equal(await dataRT(jEnt('minecraft:zombie', { equipment: T.c({ head: jh(T.c({ 'minecraft:damage': T.i(0), 'minecraft:repair_cost': T.i(0) })) }) }), jEnt('minecraft:zombie', { equipment: T.c({ head: jh(null) }) })), 'PASS');
  const src = jEnt('minecraft:zombie', { equipment: T.c({ head: jh(T.c({ 'minecraft:damage': T.i(0) })) }) });
  const rows = await run('entity', { source: javaWorld({ entities: [src] }), sourceEdition: 'java', roundtrip: view('java', javaWorld({ entities: [jEnt('minecraft:zombie', { equipment: T.c({ head: jh(null) }) })] })) });
  assert.equal(status(rows[0].res.equipment.roundtrip), 'PASS');
});

// ── B2 / B5. typed arrays vs lists; scalar width ────────────────────────────
const S = (t) => snbt(t);
test('B2: typed arrays stay distinct from lists (byte / int / long, top level and nested)', () => {
  const pairs = [
    [{ type: 'byteArray', value: [1, 2] }, { type: 'list', value: { type: 'byte', value: [1, 2] } }],
    [{ type: 'intArray', value: [1, 2] }, { type: 'list', value: { type: 'int', value: [1, 2] } }],
    [{ type: 'longArray', value: [[0, 1], [0, 2]] }, { type: 'list', value: { type: 'long', value: [[0, 1], [0, 2]] } }],
  ];
  for (const [a, b] of pairs) {
    assert.notEqual(gameRead(S(a)), gameRead(S(b)), `${a.type} vs list`);
    assert.notEqual(gameRead(S(T.c({ x: a }))), gameRead(S(T.c({ x: b }))), `nested ${a.type}`);
  }
  assert.notEqual(gameRead(S({ type: 'byteArray', value: [1, 2] })), gameRead(S({ type: 'intArray', value: [1, 2] })));
  assert.equal(gameRead(S({ type: 'intArray', value: [1, 2] })), gameRead(S({ type: 'intArray', value: [1, 2] })));
});
test('B5: scalar numeric width ignored for equal values (1b ≈ 1s ≈ 1 ≈ 1L, 1.0f ≈ 1.0d), not for different values', () => {
  const one = [T.b(1), T.s(1), T.i(1), { type: 'long', value: [0, 1] }, T.f(1), T.d(1)].map((x) => gameRead(S(T.c({ v: x }))));
  assert.equal(new Set(one).size, 1, one.join(' | '));
  assert.notEqual(gameRead(S(T.c({ v: T.i(1) }))), gameRead(S(T.c({ v: T.d(1.5) }))));
  const big = { type: 'long', value: [0x7fffffff, 0xffffffff] };
  assert.equal(gameRead(S(T.c({ v: big }))), gameRead(S(T.c({ v: big }))));
  assert.notEqual(gameRead(S(T.c({ v: big }))), gameRead(S(T.c({ v: T.str(String(2n ** 63n - 1n)) }))), 'a long is not a string');
  void gameReadMap;
});

// ── B3. a chest that carries pair markers but no valid pair is never read as a single chest ──
const P = [10, 64, 10], Q = [11, 64, 10];
const bchest = (pos, items, pair = {}) => T.c({ id: T.str('Chest'), x: T.i(pos[0]), y: T.i(pos[1]), z: T.i(pos[2]), Items: T.lc(items), ...pair });
const pairTo = (pos, lead) => ({ pairx: T.i(pos[0]), pairz: T.i(pos[2]), ...(lead === undefined ? {} : { pairlead: T.b(lead) }) });
const SRC = () => bedrockWorld({ blockEntities: [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), bchest(Q, [bItem('minecraft:emerald', 1, 0)])] });
const atP = (rows, level) => status(rows.find((x) => x.subject.locator.pos.join() === P.join()).res.identity[level]);
const jchest = (pos, items) => T.c({ id: T.str('minecraft:chest'), x: T.i(pos[0]), y: T.i(pos[1]), z: T.i(pos[2]), Items: T.lc(items) });

test('B3 Java: left/right halves with incompatible facings, stack kept in its local slot → never PASS', async () => {
  for (const [fp, fq, tp, tq] of [['south', 'north', 'right', 'left'], ['north', 'east', 'right', 'left'], ['north', 'north', 'right', 'right']]) {
    const jw = javaWorld({ blockEntities: [jchest(P, [jItem('minecraft:diamond', 1, 0)]), jchest(Q, [jItem('minecraft:emerald', 1, 0)])],
      blocks: { [P.join()]: { name: 'minecraft:chest', props: { type: tp, facing: fp } }, [Q.join()]: { name: 'minecraft:chest', props: { type: tq, facing: fq } } } });
    const rows = await run('item_stack', { source: SRC(), sourceEdition: 'bedrock', direct: view('java', jw) });
    assert.notEqual(atP(rows, 'direct'), 'PASS', `${tp}/${fp} + ${tq}/${fq}`);
  }
  // a left/right half whose partner block is missing
  const lone = javaWorld({ blockEntities: [jchest(P, [jItem('minecraft:diamond', 1, 0)])], blocks: { [P.join()]: { name: 'minecraft:chest', props: { type: 'right', facing: 'north' } } } });
  assert.notEqual(atP(await run('item_stack', { source: SRC(), sourceEdition: 'bedrock', direct: view('java', lone) }), 'direct'), 'PASS');
});

test('B3 Bedrock: pair metadata present but invalid (partner missing / not adjacent / not a chest) → never PASS', async () => {
  const cases = {
    'partner missing': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1))],
    'partner not adjacent': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo([13, 64, 10], 1)), bchest([13, 64, 10], [bItem('minecraft:emerald', 1, 0)])],
    'partner not a chest': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), T.c({ id: T.str('Barrel'), x: T.i(Q[0]), y: T.i(Q[1]), z: T.i(Q[2]), Items: T.lc([]) })],
    'two leads': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), bchest(Q, [bItem('minecraft:emerald', 1, 0)], pairTo(P, 1))],
    'no lead': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 0)), bchest(Q, [bItem('minecraft:emerald', 1, 0)])],
    'partners claim each other inconsistently': [bchest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), bchest(Q, [bItem('minecraft:emerald', 1, 0)], pairTo([12, 64, 10], 0)), bchest([12, 64, 10], [])],
  };
  for (const [name, bes] of Object.entries(cases)) {
    const rows = await run('item_stack', { source: SRC(), sourceEdition: 'bedrock', roundtrip: view('bedrock', bedrockWorld({ blockEntities: bes })) });
    assert.notEqual(atP(rows, 'roundtrip'), 'PASS', name);
  }
  // partner expected but not unique: P has no pair keys, two neighbours claim it
  const R = [9, 64, 10];
  const two = bedrockWorld({ blockEntities: [bchest(P, [bItem('minecraft:diamond', 1, 0)]), bchest(Q, [], pairTo(P, 1)), bchest(R, [], pairTo(P, 1))] });
  assert.notEqual(atP(await run('item_stack', { source: SRC(), sourceEdition: 'bedrock', roundtrip: view('bedrock', two) }), 'roundtrip'), 'PASS');
});

test('B3: a real single chest (no pair markers) is still read on its own', async () => {
  const single = bedrockWorld({ blockEntities: [bchest(P, [bItem('minecraft:diamond', 1, 0)])] });
  assert.equal(atP(await run('item_stack', { source: SRC(), sourceEdition: 'bedrock', roundtrip: view('bedrock', single) }), 'roundtrip'), 'PASS');
});

// ── B4. official grading locked on the freeze ───────────────────────────────
const SRCDIR = process.env.MCCB_SOURCES_DIR || path.join(REPO, '_staging', 'v1.1-source-worlds');
const SOURCES = { 'B01@1.0': ['MCCB_B01_STATIC_BEDROCK.mcworld', '83e8e9909a3d8915980df317073b80c11421152d8f7ed88714fd196e45c0a667'], 'B02@1.0': ['MCCB_B02_LIVING_BEDROCK.mcworld', '34d9b5dfaff557ef5e3907cae8fba31fc5de8dc03cb49c145ab14b0e6f6ccd10'] };
const haveB = Object.values(SOURCES).every(([f]) => fs.existsSync(path.join(SRCDIR, f)));
// A disposable copy of the repository (tools, manifests, rules, freeze, two fixtures): the
// official checkout is never touched; "H2" is made in the copy only.
function sandbox() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-freeze-'));
  fs.cpSync(TOOLS, path.join(root, 'tools'), { recursive: true, filter: (s) => !s.includes(`${path.sep}node_modules`) });
  fs.symlinkSync(path.join(TOOLS, 'node_modules'), path.join(root, 'tools', 'node_modules'));
  for (const d of ['manifests', 'docs', path.join('reports', 'freeze')]) fs.cpSync(path.join(REPO, d), path.join(root, d), { recursive: true });
  fs.mkdirSync(path.join(root, 'fixtures'));
  for (const w of Object.keys(SOURCES)) fs.copyFileSync(path.join(REPO, 'fixtures', `${w.replace('@', '_')}.jsonl.gz`), path.join(root, 'fixtures', `${w.replace('@', '_')}.jsonl.gz`));
  const runs = path.join(root, 'runs');
  for (const [w, [f, sha]] of Object.entries(SOURCES)) for (const id of [`t-1_${w}_b2j`, `t-1_${w}_b2j2b`]) {
    fs.mkdirSync(path.join(runs, id), { recursive: true });
    fs.copyFileSync(path.join(SRCDIR, f), path.join(runs, id, 'output.mcworld'));
    fs.writeFileSync(path.join(runs, id, 'run.json'), JSON.stringify({ run_id: id, source: { sha256: sha }, output: { file: 'output.mcworld', sha256: sha }, converter: { name: 'T' }, direction: 'bedrock_to_java', options: {} }));
  }
  fs.writeFileSync(path.join(root, 'suite.json'), JSON.stringify({ worlds: Object.keys(SOURCES).map((id) => ({ id, direction: 'bedrock_to_java' })) }));
  const env = { ...process.env, MCCB_RUNS_DIR: runs, MCCB_WORK_DIR: path.join(root, 'work') };
  const node = (script, args) => spawnSync(process.execPath, [path.join(root, 'tools', script), ...args], { env, encoding: 'utf8', cwd: root });
  const res = path.join(root, 'res');
  return {
    root, res,
    suite: (...a) => node('oracles/evaluate-suite.mjs', ['--converter', 't', '--prefix', 't-1', '--suite', path.join(root, 'suite.json'), '--results-dir', res, '--heap', '2048', ...a]),
    table: (...a) => node('results/table-v13.mjs', ['--dir', res, '--builds', 'T=t/t-1_', '--worlds', 'B01@1.0,B02@1.0', ...a]),
    tamper: (w) => { const f = path.join(root, 'fixtures', `${w.replace('@', '_')}.jsonl.gz`); fs.writeFileSync(f, zlib.gzipSync(Buffer.concat([zlib.gunzipSync(fs.readFileSync(f)), Buffer.from('\n')]))); },
    summary: (w) => path.join(res, 't', `t-1_${w}_b2j`, 'summary.json'),
  };
}
const FREEZE = 'reports/freeze/FREEZE-v1.3.json';
const skipB = haveB ? false : `public Bedrock sources not found in ${SRCDIR}`;

test('B4: freeze H1 + fixtures H1 → official suite and table accepted; summaries record the freeze', { skip: skipB }, () => {
  const s = sandbox();
  const r = s.suite('--freeze', FREEZE);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  const sm = JSON.parse(fs.readFileSync(s.summary('B01@1.0'), 'utf8'));
  assert.equal(sm.grading?.mode, 'official');
  assert.equal(sm.grading?.freeze?.[0]?.sha256, '8e317c7be305c990b6833657f9acbdba6076340fba9657960556610fbe4251a2');
  const t = s.table('--freeze', FREEZE);
  assert.equal(t.status, 0, t.stdout + t.stderr);
});

test('B4: one world at H2 with freeze H1 → the whole official suite is refused, nothing graded or promoted', { skip: skipB }, () => {
  const s = sandbox();
  s.tamper('B02@1.0');
  const r = s.suite('--freeze', FREEZE);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /B02@1\.0.*fixture|fixture.*B02@1\.0/s);
  assert.equal(fs.existsSync(s.summary('B01@1.0')), false, 'the good world is not graded alone either');
});

test('B4: an official workflow without a freeze reference is refused (suite and table); dev mode is explicit', { skip: skipB }, () => {
  const s = sandbox();
  const r = s.suite();
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /--freeze|--dev/);
  assert.equal(s.suite('--dev').status, 0);
  const t = s.table();
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /--freeze|--dev/);
  // dev results are never accepted as official
  const t2 = s.table('--freeze', FREEZE);
  assert.notEqual(t2.status, 0);
  assert.match(t2.stderr, /dev|official/i);
});

test('B4: a summary graded on H2 is refused by the official table even if H2 is the registry now on disk', { skip: skipB }, () => {
  const s = sandbox();
  s.tamper('B02@1.0');
  assert.equal(s.suite('--dev').status, 0);
  const t = s.table('--freeze', FREEZE);
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /B02@1\.0.*fixture/s);
});

test('B4: GURREN — FREEZE-v1.3 alone gives no reference; the addendum gives the GRADED registry, never the public one', async () => {
  const { freezeFixtureRefs } = await import('../../lib/freeze-ref.mjs');
  const main = freezeFixtureRefs(['reports/freeze/FREEZE-v1.3.json']);
  assert.equal(main.fixtures.get('B01@1.0'), '780d5858bf7f1fab101cdbf64e6f1f3f0e9afa493a33526b37d76b33518cd048');
  assert.equal(main.fixtures.has('GURREN@1.0'), false, 'private_fixtures (the private original ca618ebe…) is not a grading reference');
  const both = freezeFixtureRefs(['reports/freeze/FREEZE-v1.3.json', 'reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json']);
  assert.equal(both.fixtures.get('GURREN@1.0'), '9af167af59a6bb423baa64f688610a11ed26533f1ed9fc599f1b003d0fcd9e29');
  assert.notEqual(both.fixtures.get('GURREN@1.0'), '2c107cc4a9524fd157012149604ad950e0ce110ac28a03cbcd13b14df1b43672');
  assert.throws(() => freezeFixtureRefs(['reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json']), /addendum.*FREEZE/i);
});

// ── B6. SKIP only for an input missing BEFORE running ───────────────────────
const J02 = path.join(SRCDIR, 'MCCB_J02_LIVING_JAVA.zip');
test('B6: a normaliser that STARTS and fails is FAIL, not SKIP; a missing source is still SKIP', { skip: fs.existsSync(J02) ? false : 'J02 source not present' }, () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-b6-'));
  const mc = path.join(tmp, '.minecraft', 'versions', '26.3');
  fs.mkdirSync(mc, { recursive: true });
  fs.writeFileSync(path.join(mc, '26.3.json'), JSON.stringify({ libraries: [] }));
  const java = path.join(tmp, 'java');
  fs.writeFileSync(java, '#!/bin/sh\necho "internal normaliser failure" >&2\nexit 1\n', { mode: 0o755 });
  const r = spawnSync(process.execPath, [path.join(TOOLS, 'selftest', 'run-selftests.mjs'), 'B'], {
    encoding: 'utf8', env: { ...process.env, APPDATA: tmp, MCCB_JAVA: java, MCCB_SOURCES_DIR: SRCDIR, MCCB_WORK_DIR: path.join(tmp, 'work'), MCCB_SELFTEST_REPORT_DIR: path.join(tmp, 'report') } });
  assert.match(r.stdout, /^FAIL {2}B\.identity J02@1\.0/m, r.stdout);
  assert.match(r.stdout, /^SKIP {2}B\.identity J03@1\.0/m);
  assert.equal(r.status, 1);
});
