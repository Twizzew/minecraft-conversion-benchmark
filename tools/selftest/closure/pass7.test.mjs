// v1.3 closure, seventh pass (post-FINAL2 tribunal): round-trip inventories are exact (rule 57),
// trades are read with all their costs (rule 58), a Bedrock stack's aux is always judged in the
// round trip (rule 59), and the Java oracle is authenticated before grading (rule 60).
// Every test runs the real path facts → family → evaluator; nothing depends on the converter.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { T, jItem, bItem, bEmpty, javaWorld, bedrockWorld, view, run, status, writeJavaPlayer, useSyntheticJavaReports } from './helpers.mjs';

useSyntheticJavaReports(['minecraft:diamond', 'minecraft:emerald', 'minecraft:iron_helmet', 'minecraft:shield', 'minecraft:iron_sword', 'minecraft:carrot', 'minecraft:book', 'minecraft:enchanted_book', 'minecraft:paper', 'minecraft:compass', 'minecraft:filled_map', 'minecraft:stick', 'minecraft:chest']);
const TOOLS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO = path.resolve(TOOLS, '..');

const jEnt = (id, extra) => T.c({ id: T.str(id), Pos: T.ld([5.5, 64, 5.5]), UUID: T.ia([1, 2, 3, 4]), ...extra });
const bEnt = (id, extra) => T.c({ identifier: T.str(id), Pos: T.lf([5.5, 64, 5.5]), UniqueID: { type: 'long', value: [0, 7] }, ...extra });
const jw = (e) => javaWorld({ entities: [e] });
const bw = (e) => bedrockWorld({ actors: [e] });
const asp = (rows, aspect, level) => status(rows[0].res[aspect][level]);

// ── rule 57: round-trip inventories are exact ───────────────────────────────
const bPlayer = ({ inv = [], ender = [], armor = [bEmpty(), bEmpty(), bEmpty(), bEmpty()], offhand = [bEmpty()] } = {}) => T.c({
  Pos: T.lf([0, 65.62, 0]), DimensionId: T.i(0), PlayerGameMode: T.i(0), Inventory: T.lc(inv), EnderChestInventory: T.lc(ender), Armor: T.lc(armor), Offhand: T.lc(offhand),
});
const bpw = (tag) => bedrockWorld({ named: { '~local_player': tag }, level: T.c({ GameType: T.i(0) }) });

test('rule 57: player inventory round trip [A] → [A, B] is not PASS; [A] → [A] PASS', async () => {
  const src = bPlayer({ inv: [bItem('minecraft:diamond', 1, 0)] });
  const more = bPlayer({ inv: [bItem('minecraft:diamond', 1, 0), bItem('minecraft:emerald', 1, 5)] });
  const rows = await run('player', { source: bpw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(more)) });
  assert.equal(asp(rows, 'inventory', 'roundtrip'), 'PARTIAL');
  assert.deepEqual(rows[0].res.inventory.roundtrip.evidence.extra, [{ slot: 5, observed: 'minecraft:emerald' }]);
  const same = await run('player', { source: bpw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(src)) });
  assert.equal(asp(same, 'inventory', 'roundtrip'), 'PASS');
});

test('rule 57: player ender chest and armour round trip with an added stack are not PASS', async () => {
  const src = bPlayer({ inv: [bItem('minecraft:carrot', 1, 0)], ender: [bItem('minecraft:diamond', 1, 0)], armor: [bItem('minecraft:iron_helmet'), bEmpty(), bEmpty(), bEmpty()] });
  const out = bPlayer({ inv: [bItem('minecraft:carrot', 1, 0)], ender: [bItem('minecraft:diamond', 1, 0), bItem('minecraft:emerald', 1, 9)], armor: [bItem('minecraft:iron_helmet'), bEmpty(), bEmpty(), bEmpty()], offhand: [bItem('minecraft:shield')] });
  const rows = await run('player', { source: bpw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(out)) });
  assert.equal(asp(rows, 'ender_chest', 'roundtrip'), 'PARTIAL');
  assert.equal(asp(rows, 'armor', 'roundtrip'), 'PARTIAL');
  assert.equal(asp(rows, 'inventory', 'roundtrip'), 'PASS');
});

test('rule 57: the DIRECT level does not judge extra stacks (unchanged)', async () => {
  const src = bPlayer({ inv: [bItem('minecraft:diamond', 2, 0)] });
  const f = writeJavaPlayer(T.c({ Pos: T.ld([0, 64, 0]), Dimension: T.str('minecraft:overworld'), playerGameType: T.i(0), Inventory: T.lc([jItem('minecraft:diamond', 2, 0), jItem('minecraft:emerald', 1, 4)]) }));
  const rows = await run('player', { source: bpw(src), sourceEdition: 'bedrock', direct: view('java', javaWorld({ playerFiles: [f], level: T.c({}) })) });
  assert.equal(asp(rows, 'inventory', 'direct'), 'PASS');
});

test('rule 57: entity equipment round trip with an added offhand item is not PASS (Java and Bedrock)', async () => {
  const sword = T.c({ id: T.str('minecraft:iron_sword'), count: T.i(1) }), shield = T.c({ id: T.str('minecraft:shield'), count: T.i(1) });
  const j = await run('entity', { source: jw(jEnt('minecraft:zombie', { equipment: T.c({ mainhand: sword }) })), sourceEdition: 'java', roundtrip: view('java', jw(jEnt('minecraft:zombie', { equipment: T.c({ mainhand: sword, offhand: shield }) }))) });
  assert.equal(asp(j, 'equipment', 'roundtrip'), 'PARTIAL');
  const bSword = bItem('minecraft:iron_sword'), bShield = bItem('minecraft:shield');
  const b = await run('entity', { source: bw(bEnt('minecraft:zombie', { Mainhand: T.lc([bSword]) })), sourceEdition: 'bedrock', roundtrip: view('bedrock', bw(bEnt('minecraft:zombie', { Mainhand: T.lc([bSword]), Offhand: T.lc([bShield]) }))) });
  assert.equal(asp(b, 'equipment', 'roundtrip'), 'PARTIAL');
  const same = await run('entity', { source: bw(bEnt('minecraft:zombie', { Mainhand: T.lc([bSword]) })), sourceEdition: 'bedrock', roundtrip: view('bedrock', bw(bEnt('minecraft:zombie', { Mainhand: T.lc([bSword]) }))) });
  assert.equal(asp(same, 'equipment', 'roundtrip'), 'PASS');
});

test('rule 57: entity inventories, positional (chest minecart) and unordered (villager), round trip with an added stack are not PASS', async () => {
  const cm = (items) => jEnt('minecraft:chest_minecart', { Items: T.lc(items) });
  const p = await run('entity', { source: jw(cm([jItem('minecraft:diamond', 1, 0)])), sourceEdition: 'java', roundtrip: view('java', jw(cm([jItem('minecraft:diamond', 1, 0), jItem('minecraft:stick', 1, 3)]))) });
  assert.equal(asp(p, 'inventory', 'roundtrip'), 'PARTIAL');
  const vi = (items) => jEnt('minecraft:villager', { Inventory: T.lc(items) });
  const u = await run('entity', { source: jw(vi([jItem('minecraft:carrot', 2)])), sourceEdition: 'java', roundtrip: view('java', jw(vi([jItem('minecraft:carrot', 2), jItem('minecraft:paper', 1)]))) });
  assert.equal(asp(u, 'inventory', 'roundtrip'), 'PARTIAL');
  const same = await run('entity', { source: jw(vi([jItem('minecraft:carrot', 2)])), sourceEdition: 'java', roundtrip: view('java', jw(vi([jItem('minecraft:carrot', 2)]))) });
  assert.equal(asp(same, 'inventory', 'roundtrip'), 'PASS');
});

test('LIMITATION (frozen corpus): an EMPTY source inventory has no assertion; a stack added to a container slot the source left empty has none either', async () => {
  // player: the aspect exists only when the source holds items — the frozen fixtures have none to judge
  const rows = await run('player', { source: bpw(bPlayer({})), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(bPlayer({ inv: [bItem('minecraft:diamond', 1, 0)] }))) });
  assert.equal(rows[0].res.inventory, undefined);
  // containers: one assertion per SOURCE stack; block_entity.data leaves Items to item_stack
  const POS = [10, 64, 10];
  const jBE = (items) => T.c({ id: T.str('minecraft:chest'), x: T.i(POS[0]), y: T.i(POS[1]), z: T.i(POS[2]), Items: T.lc(items) });
  const cw = (be) => javaWorld({ blockEntities: [be], blocks: { [POS.join()]: { name: 'minecraft:chest', props: {} } } });
  const c = await run('item_stack', { source: cw(jBE([jItem('minecraft:diamond', 1, 0)])), sourceEdition: 'java', roundtrip: view('java', cw(jBE([jItem('minecraft:diamond', 1, 0), jItem('minecraft:emerald', 1, 5)]))) });
  assert.equal(c.length, 1);
  assert.equal(status(c[0].res.identity.roundtrip), 'PASS');
});

// ── rule 58: trades, all costs ──────────────────────────────────────────────
const jOffer = (bCount, bbCount) => T.c({ buy: T.c({ id: T.str('minecraft:emerald'), count: T.i(bCount) }), ...(bbCount ? { buyB: T.c({ id: T.str('minecraft:book'), count: T.i(bbCount) }) } : {}), sell: T.c({ id: T.str('minecraft:enchanted_book'), count: T.i(1) }), maxUses: T.i(12) });
const jVillager = (offers) => jEnt('minecraft:villager', { Offers: T.c({ Recipes: T.lc(offers) }) });
const bStack = (id, n) => T.c({ Count: T.b(n), Damage: T.s(0), Name: T.str(id), WasPickedUp: T.b(0) });
const bOffer = ({ a = 10, ca = 10, b = 1, cb = 1 } = {}) => T.c({ buyA: bStack('minecraft:emerald', a), buyCountA: T.i(ca), buyB: bStack('minecraft:compass', b), buyCountB: T.i(cb), sell: bStack('minecraft:filled_map', 1), tier: T.i(0), maxUses: T.i(12) });
const bVillager = (offers) => bEnt('minecraft:villager_v2', { Offers: T.c({ Recipes: T.lc(offers) }), TradeTier: T.i(4) });

test('rule 58: Java round trip — only the SECOND cost count changes → not PASS; unchanged → PASS', async () => {
  const src = jw(jVillager([jOffer(5, 1)]));
  const r = await run('entity', { source: src, sourceEdition: 'java', roundtrip: view('java', jw(jVillager([jOffer(5, 7)]))) });
  assert.notEqual(asp(r, 'trades', 'roundtrip'), 'PASS');
  const ok = await run('entity', { source: src, sourceEdition: 'java', roundtrip: view('java', jw(jVillager([jOffer(5, 1)]))) });
  assert.equal(asp(ok, 'trades', 'roundtrip'), 'PASS');
});

test('rule 58: Bedrock round trip — buyB.Count, buyCountA or buyCountB alone changes → not PASS', async () => {
  const src = bw(bVillager([bOffer()]));
  for (const changed of [{ b: 3 }, { ca: 14 }, { cb: 2 }]) {
    const r = await run('entity', { source: src, sourceEdition: 'bedrock', roundtrip: view('bedrock', bw(bVillager([bOffer(changed)]))) });
    assert.notEqual(asp(r, 'trades', 'roundtrip'), 'PASS', JSON.stringify(changed));
  }
  const ok = await run('entity', { source: src, sourceEdition: 'bedrock', roundtrip: view('bedrock', bw(bVillager([bOffer()]))) });
  assert.equal(asp(ok, 'trades', 'roundtrip'), 'PASS');
});

test('rule 58: direct Java → Bedrock — the second cost count is compared; equal costs PASS', async () => {
  const src = jw(jVillager([jOffer(5, 1)]));
  const bOut = (bb) => bw(bVillager([T.c({ buyA: bStack('minecraft:emerald', 5), buyCountA: T.i(5), buyB: bStack('minecraft:book', bb), buyCountB: T.i(bb), sell: bStack('minecraft:enchanted_book', 1), tier: T.i(0) })]));
  const bad = await run('entity', { source: src, sourceEdition: 'java', direct: view('bedrock', bOut(4)) });
  assert.notEqual(asp(bad, 'trades', 'direct'), 'PASS');
  const ok = await run('entity', { source: src, sourceEdition: 'java', direct: view('bedrock', bOut(1)) });
  assert.equal(asp(ok, 'trades', 'direct'), 'PASS');
});

test('rule 58: the frozen v1.3 fixtures summarise offers without the second cost count, but store the full Offers', async () => {
  const { readFixtures } = await import('../../lib/fixtures-io.mjs');
  const { tradeOffers } = await import('../../lib/facts.mjs');
  const subjects = readFixtures('B02@1.0').subjects.filter((x) => x.family === 'entity' && x.aspects.trades);
  assert.ok(subjects.length > 0);
  let withB = 0;
  for (const x of subjects) {
    const full = tradeOffers('bedrock', JSON.parse(x.expected.sem.Offers));
    // the reader gives back the fixture's own summary for every field the summary has…
    assert.deepEqual(full.map(({ buy, buyCount, buyB, sell, sellCount, tier }) => JSON.parse(JSON.stringify({ buy, buyCount, buyB, sell, sellCount, tier }))), JSON.parse(JSON.stringify(x.expected.offers.map(({ buy, buyCount, buyB, sell, sellCount, tier }) => ({ buy, buyCount, buyB, sell, sellCount, tier })))));
    // …and the costs the summary dropped
    // (MCCB 2026-11 : les fixtures reconstruites le 01/11 portent aussi buyCountA/B dans le résumé.)
    withB += full.filter((o) => o.buyB && Number.isInteger(o.buyBCount) && Number.isInteger(o.buyCountB)).length;
  }
  assert.ok(withB > 0, 'B02 holds offers with a second cost');
});

// ── rule 59: aux ────────────────────────────────────────────────────────────
const POS = [10, 64, 10];
const bChest = (items) => T.c({ id: T.str('Chest'), x: T.i(POS[0]), y: T.i(POS[1]), z: T.i(POS[2]), Items: T.lc(items), isMovable: T.b(1) });
const bAux = (id, aux, slot, tag) => T.c({ Count: T.b(1), Damage: T.s(aux), Name: T.str(id), Slot: T.b(slot), WasPickedUp: T.b(0), ...(tag ? { tag } : {}) });
const cbw = (be) => bedrockWorld({ blockEntities: [be] });

test('rule 59: Bedrock aux 0 → aux 3 in the round trip is not PASS (carried by the identity assertion)', async () => {
  const src = bChest([bAux('minecraft:diamond', 0, 0)]);
  const rows = await run('item_stack', { source: cbw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', cbw(bChest([bAux('minecraft:diamond', 3, 0)]))) });
  assert.equal(rows[0].subject.aspects.aux, undefined); // the frozen enumeration has no aux assertion for 0
  assert.equal(status(rows[0].res.identity.roundtrip), 'FAIL');
  const same = await run('item_stack', { source: cbw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', cbw(src)) });
  assert.equal(status(same[0].res.identity.roundtrip), 'PASS');
});

test('rule 59: a non-zero aux keeps its own assertion; the identity does not count the change twice', async () => {
  const src = bChest([bAux('minecraft:diamond', 5, 0)]);
  const rows = await run('item_stack', { source: cbw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', cbw(bChest([bAux('minecraft:diamond', 6, 0)]))) });
  assert.equal(status(rows[0].res.aux.roundtrip), 'FAIL');
  assert.equal(status(rows[0].res.identity.roundtrip), 'PASS');
});

test('Damage 0: an explicit tag.Damage:0 that comes back as 5 is caught by the EXISTING tag assertion', async () => {
  const src = bChest([bAux('minecraft:diamond', 0, 0, T.c({ Damage: T.i(0) }))]);
  const rows = await run('item_stack', { source: cbw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', cbw(bChest([bAux('minecraft:diamond', 0, 0, T.c({ Damage: T.i(5) }))]))) });
  assert.equal(rows[0].subject.aspects['component:minecraft:damage'], undefined);
  assert.equal(status(rows[0].res.tag.roundtrip), 'FAIL');
});

test('LIMITATION (frozen corpus): damage GAINED by a stack whose source stored none has no assertion', async () => {
  const src = bChest([bAux('minecraft:diamond', 0, 0)]);
  const rows = await run('item_stack', { source: cbw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', cbw(bChest([bAux('minecraft:diamond', 0, 0, T.c({ Damage: T.i(5) }))]))) });
  assert.deepEqual(Object.keys(rows[0].subject.aspects).sort(), ['count', 'identity']);
});

// ── rule 60: the Java oracle is authenticated ───────────────────────────────
const REAL_REPORTS = process.env.MCCB_JAVA_REPORTS_REAL || path.join(REPO, '_staging', 'java-reports', '26.3', 'reports');
const EXPECT = { jar_sha256: '4508d006323f24fa02876310c192d739af56516eb259000ac50f0909a68c9a2d', blocks_json_sha256: '7a0de8aaf7b04d00c40b8ffdc4cfe75184cff2e821d336a020573201867105a4', registries_json_sha256: '51f62d56f8bd0e9134ee88dd9226b64e9e56cf6a32377540d44291bf47ecdac6' };
const MC = path.join(process.env.APPDATA || path.join(process.env.HOME || '', '.local', 'share'), '.minecraft');
const haveJava = fs.existsSync(path.join(REAL_REPORTS, 'blocks.json')) && fs.existsSync(path.join(MC, 'versions', '26.3', '26.3.jar'));
const skipJava = haveJava ? false : 'Mojang 26.3 jar / data reports not present (set MCCB_JAVA_REPORTS_REAL)';
function oracle(env) {
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', `import { checkJavaOracle } from ${JSON.stringify(path.join(TOOLS, 'lib', 'java-oracle.mjs'))}; console.log(JSON.stringify(checkJavaOracle(${JSON.stringify(EXPECT)}).problems));`], { encoding: 'utf8', env: { ...process.env, ...env } });
  assert.equal(r.status, 0, r.stderr);
  return JSON.parse(r.stdout);
}
function reportsCopy(alter) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-r58-'));
  for (const f of ['blocks.json', 'registries.json']) fs.copyFileSync(path.join(REAL_REPORTS, f), path.join(d, f));
  if (alter) { const f = path.join(d, alter); const j = JSON.parse(fs.readFileSync(f, 'utf8')); if (alter === 'blocks.json') delete j['minecraft:stone']; else delete j['minecraft:item'].entries['minecraft:stick']; fs.writeFileSync(f, JSON.stringify(j)); }
  return d;
}

test('rule 60: exact reports and jar → accepted', { skip: skipJava }, () => {
  assert.deepEqual(oracle({ MCCB_JAVA_REPORTS: reportsCopy(null) }), []);
});
test('rule 60: altered blocks.json → refused', { skip: skipJava }, () => {
  const p = oracle({ MCCB_JAVA_REPORTS: reportsCopy('blocks.json') });
  assert.equal(p.length, 1); assert.match(p[0], /blocks\.json/);
});
test('rule 60: altered registries.json → refused', { skip: skipJava }, () => {
  const p = oracle({ MCCB_JAVA_REPORTS: reportsCopy('registries.json') });
  assert.equal(p.length, 1); assert.match(p[0], /registries\.json/);
});
test('rule 60: another jar (one byte appended) → refused; the libraries are still checked', { skip: skipJava }, () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-jar-'));
  const v = path.join(tmp, '.minecraft', 'versions', '26.3');
  fs.mkdirSync(v, { recursive: true });
  fs.copyFileSync(path.join(MC, 'versions', '26.3', '26.3.json'), path.join(v, '26.3.json'));
  fs.writeFileSync(path.join(v, '26.3.jar'), Buffer.concat([fs.readFileSync(path.join(MC, 'versions', '26.3', '26.3.jar')), Buffer.from([0])]));
  fs.symlinkSync(path.join(MC, 'libraries'), path.join(tmp, '.minecraft', 'libraries'));
  const p = oracle({ APPDATA: tmp, MCCB_JAVA_REPORTS: reportsCopy(null) });
  assert.equal(p.length, 1); assert.match(p[0], /jar 26\.3\.jar is [0-9a-f]{64}, the freeze records 4508d006/);
  fs.rmSync(tmp, { recursive: true, force: true });
});

// An OFFICIAL grading with altered reports stops before any output is opened or row written.
const RUNS = process.env.MCCB_RUNS_DIR;
const J = (r) => RUNS && fs.existsSync(path.join(RUNS, r, 'run.json'));
const haveRuns = haveJava && J('je2be-core-8dfc4de_B01@1.0_b2j') && J('je2be-core-8dfc4de_B01@1.0_b2j2b');
test('rule 60: official evaluate.mjs with an altered blocks.json exits 2 and writes nothing', { skip: haveRuns ? false : 'historical je2be B01 run records not present (MCCB_RUNS_DIR)' }, () => {
  const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-r58e-')), 'res');
  const r = spawnSync(process.execPath, [path.join(TOOLS, 'oracles', 'evaluate.mjs'), '--world', 'B01@1.0', '--direct', 'je2be-core-8dfc4de_B01@1.0_b2j', '--roundtrip', 'je2be-core-8dfc4de_B01@1.0_b2j2b', '--converter', 'je2be',
    '--freeze', 'reports/freeze/FREEZE-v1.3.json', '--outputs', 'results/v1.3/OUTPUTS.sha256', '--out', out], { encoding: 'utf8', cwd: REPO, env: { ...process.env, MCCB_JAVA_REPORTS: reportsCopy('blocks.json') } });
  assert.equal(r.status, 2, r.stderr);
  assert.match(r.stderr, /JAVA ORACLE CHECK FAILED/);
  assert.deepEqual(fs.readdirSync(path.dirname(out)), []);
});

// Run records stay REQUIRED in an official grading (no code change in this pass: shown here).
test('official suite: a missing run record (one leg) refuses the whole suite before grading', { skip: haveRuns ? false : 'historical je2be B01 run records not present (MCCB_RUNS_DIR)' }, () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-runrec-'));
  const runs = path.join(tmp, 'runs'); fs.mkdirSync(runs);
  fs.symlinkSync(path.join(RUNS, 'je2be-core-8dfc4de_B01@1.0_b2j'), path.join(runs, 'je2be-core-8dfc4de_B01@1.0_b2j')); // the return leg's record is absent
  const suite = path.join(tmp, 'suite.json');
  fs.writeFileSync(suite, JSON.stringify({ worlds: [{ id: 'B01@1.0', direction: 'bedrock_to_java' }] }));
  const res = path.join(tmp, 'res');
  const r = spawnSync(process.execPath, [path.join(TOOLS, 'oracles', 'evaluate-suite.mjs'), '--converter', 'je2be', '--prefix', 'je2be-core-8dfc4de', '--suite', suite, '--results-dir', res,
    '--freeze', 'reports/freeze/FREEZE-v1.3.json', '--outputs', 'results/v1.3/OUTPUTS.sha256'], { encoding: 'utf8', cwd: REPO, env: { ...process.env, MCCB_RUNS_DIR: runs } });
  assert.equal(r.status, 1, r.stderr);
  assert.match(r.stderr, /je2be-core-8dfc4de_B01@1\.0_b2j2b: run record output no run record/);
  assert.equal(fs.existsSync(res) && fs.readdirSync(res).some((x) => !x.startsWith('.')), false);
});
