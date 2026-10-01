// v1.3 closure, second pass: double chests (rule 49 kept as the canonical 54-slot view), BlockEntityVersion,
// donkey / mule ChestItems layout, campfire positions, player armour slots, brewing bottles one by one.
import test from 'node:test';
import assert from 'node:assert/strict';
import { T, jItem, bItem, bEmpty, javaWorld, bedrockWorld, view, run, status, useSyntheticJavaReports } from './helpers.mjs';
import { bedrockEntity } from '../../lib/facts.mjs';

useSyntheticJavaReports(['minecraft:diamond', 'minecraft:emerald', 'minecraft:saddle', 'minecraft:beef', 'minecraft:porkchop', 'minecraft:iron_helmet', 'minecraft:iron_chestplate', 'minecraft:iron_leggings', 'minecraft:iron_boots']);

const at = (rows, pos, slot, aspect, level) => status(rows.find((x) => x.subject.locator.slot === slot && x.subject.locator.pos.join() === pos.join()).res[aspect][level]);

// ── 1. double chest ─────────────────────────────────────────────────────────
const P = [10, 64, 10], Q = [11, 64, 10];
const chest = (pos, items, pair = {}) => T.c({ id: T.str('Chest'), x: T.i(pos[0]), y: T.i(pos[1]), z: T.i(pos[2]), Items: T.lc(items), ...pair });
const pairTo = (pos, lead) => ({ pairx: T.i(pos[0]), pairz: T.i(pos[2]), ...(lead === undefined ? {} : { pairlead: T.b(lead) }) });
// source: P is the lead (shown first): diamond at combined 0, emerald (in Q) at combined 27
const SRC = () => bedrockWorld({ blockEntities: [chest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), chest(Q, [bItem('minecraft:emerald', 1, 0)])] });
const rt = async (target) => run('item_stack', { source: SRC(), sourceEdition: 'bedrock', roundtrip: view('bedrock', target) });

test('double chest A: halves exchanged between the two blocks AND the lead moved with them (extraction order reversed) → same 54 slots → PASS', async () => {
  const w = bedrockWorld({ blockEntities: [chest(Q, [bItem('minecraft:diamond', 1, 0)], pairTo(P, 1)), chest(P, [bItem('minecraft:emerald', 1, 0)])] });
  const rows = await rt(w);
  assert.equal(at(rows, P, 0, 'identity', 'roundtrip'), 'PASS');
  assert.equal(at(rows, Q, 0, 'identity', 'roundtrip'), 'PASS');
});

test('double chest B: another representation of the same pair (pair keys on both blocks; a Java right/left pair) → PASS', async () => {
  const both = bedrockWorld({ blockEntities: [chest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), chest(Q, [bItem('minecraft:emerald', 1, 0)], pairTo(P, 0))] });
  const rows = await rt(both);
  assert.equal(at(rows, P, 0, 'identity', 'roundtrip'), 'PASS');
  assert.equal(at(rows, Q, 0, 'identity', 'roundtrip'), 'PASS');
  // Java, facing north: the `right` chest (shown first) is at x+1 = Q, its `left` partner at P.
  // Bedrock shows P's diamond first, so Java must hold the diamond in Q: the blocks differ,
  // the combined container is the same.
  const jb = (pos, items) => T.c({ id: T.str('minecraft:chest'), x: T.i(pos[0]), y: T.i(pos[1]), z: T.i(pos[2]), Items: T.lc(items) });
  const jw = javaWorld({ blockEntities: [jb(P, [jItem('minecraft:emerald', 1, 0)]), jb(Q, [jItem('minecraft:diamond', 1, 0)])],
    blocks: { [P.join()]: { name: 'minecraft:chest', props: { type: 'left', facing: 'north' } }, [Q.join()]: { name: 'minecraft:chest', props: { type: 'right', facing: 'north' } } } });
  const d = await run('item_stack', { source: SRC(), sourceEdition: 'bedrock', direct: view('java', jw) });
  assert.equal(at(d, P, 0, 'identity', 'direct'), 'PASS');
  assert.equal(at(d, Q, 0, 'identity', 'direct'), 'PASS');
});

test('double chest C: a real move combined 0 → 5, and the halves shown in the other order (0 → 27) → FAIL', async () => {
  const moved = bedrockWorld({ blockEntities: [chest(P, [bItem('minecraft:diamond', 1, 5)], pairTo(Q, 1)), chest(Q, [bItem('minecraft:emerald', 1, 0)])] });
  assert.equal(at(await rt(moved), P, 0, 'identity', 'roundtrip'), 'FAIL');
  const swapped = bedrockWorld({ blockEntities: [chest(P, [bItem('minecraft:diamond', 1, 0)]), chest(Q, [bItem('minecraft:emerald', 1, 0)], pairTo(P, 1))] });
  const rows = await rt(swapped);
  assert.equal(at(rows, P, 0, 'identity', 'roundtrip'), 'FAIL');
  const ev = rows.find((x) => x.subject.locator.pos.join() === P.join()).res.identity.roundtrip.evidence;
  assert.equal(ev.cause, 'double-chest-halves-shown-in-other-order');
});

test('double chest D: no unique lead (both / none / two claimants) → never PASS; a real move stays FAIL', async () => {
  const bothLead = bedrockWorld({ blockEntities: [chest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 1)), chest(Q, [bItem('minecraft:emerald', 1, 0)], pairTo(P, 1))] });
  let rows = await rt(bothLead);
  assert.match(at(rows, P, 0, 'identity', 'roundtrip'), /^NE:double-chest-half-order-undetermined/);
  assert.match(at(rows, Q, 0, 'identity', 'roundtrip'), /^NE:double-chest-half-order-undetermined/);
  const noLead = bedrockWorld({ blockEntities: [chest(P, [bItem('minecraft:diamond', 1, 0)], pairTo(Q, 0)), chest(Q, [bItem('minecraft:emerald', 1, 0)])] });
  rows = await rt(noLead);
  assert.match(at(rows, P, 0, 'identity', 'roundtrip'), /^NE:/);
  const noLeadMoved = bedrockWorld({ blockEntities: [chest(P, [bItem('minecraft:diamond', 1, 4)], pairTo(Q, 0)), chest(Q, [bItem('minecraft:emerald', 1, 0)])] });
  assert.equal(at(await rt(noLeadMoved), P, 0, 'identity', 'roundtrip'), 'FAIL');
  // Java: halves with different `facing` do not form a pair; each chest is read on its own
  const jb = (pos, items) => T.c({ id: T.str('minecraft:chest'), x: T.i(pos[0]), y: T.i(pos[1]), z: T.i(pos[2]), Items: T.lc(items) });
  const jw = javaWorld({ blockEntities: [jb(P, [jItem('minecraft:emerald', 1, 0)]), jb(Q, [jItem('minecraft:diamond', 1, 0)])],
    blocks: { [P.join()]: { name: 'minecraft:chest', props: { type: 'left', facing: 'south' } }, [Q.join()]: { name: 'minecraft:chest', props: { type: 'right', facing: 'north' } } } });
  const d = await run('item_stack', { source: SRC(), sourceEdition: 'bedrock', direct: view('java', jw) });
  assert.notEqual(at(d, P, 0, 'identity', 'direct'), 'PASS');
});

// ── 3. BlockEntityVersion ───────────────────────────────────────────────────
const beRT = async (edition, a, b) => {
  const be = (extra) => T.c({ id: T.str(edition === 'bedrock' ? 'Barrel' : 'minecraft:barrel'), x: T.i(1), y: T.i(2), z: T.i(3), ...extra });
  const w = (t) => (edition === 'bedrock' ? bedrockWorld({ blockEntities: [t] }) : javaWorld({ blockEntities: [t], blocks: { '1,2,3': { name: 'minecraft:barrel', props: {} } } }));
  const rows = await run('block_entity', { source: w(be(a)), sourceEdition: edition, roundtrip: view(edition, w(be(b))) });
  return status(rows[0].res.data.roundtrip);
};
test('Bedrock BlockEntityVersion: absent ≡ 0 only; 0 vs 1 and 1 vs 2 differ; not extended to Java or other fields', async () => {
  assert.equal(await beRT('bedrock', { BlockEntityVersion: T.i(0) }, {}), 'PASS');
  assert.equal(await beRT('bedrock', {}, { BlockEntityVersion: T.i(0) }), 'PASS');
  assert.equal(await beRT('bedrock', { BlockEntityVersion: T.i(0) }, { BlockEntityVersion: T.i(1) }), 'PARTIAL');
  assert.equal(await beRT('bedrock', { BlockEntityVersion: T.i(1) }, { BlockEntityVersion: T.i(2) }), 'PARTIAL');
  assert.equal(await beRT('bedrock', { BlockEntityVersion: T.i(1) }, {}), 'PARTIAL');
  assert.equal(await beRT('java', { BlockEntityVersion: T.i(0) }, {}), 'PARTIAL');
  assert.equal(await beRT('bedrock', { StoredXPInt: T.i(0) }, {}), 'PARTIAL');
});

// ── 4. donkey / mule / horse ────────────────────────────────────────────────
const bEnt = (id, extra) => T.c({ identifier: T.str(id), Pos: T.lf([5.5, 64, 5.5]), UniqueID: { type: 'long', value: [0, 7] }, ...extra });
const slots = (f) => ({ eq: f.equipment.map((x) => `${x.slot}:${x.item.id}`).sort(), inv: f.inventory.map((x) => `${x.slot}:${x.id}`).sort() });
for (const sp of ['donkey', 'mule']) {
  test(`${sp}: ChestItems 0 = saddle; 1..15 = chest slots (slot 1 is not armour)`, async () => {
    const f = bedrockEntity(bEnt(`minecraft:${sp}`, { Chested: T.b(1), ChestItems: T.lc([bItem('minecraft:saddle', 1, 0), bItem('minecraft:emerald', 1, 1), bEmpty(2), bItem('minecraft:diamond', 3, 3), bItem('minecraft:emerald', 2, 15)]) }));
    assert.deepEqual(slots(f), { eq: ['saddle:minecraft:saddle'], inv: ['15:minecraft:emerald', '1:minecraft:emerald', '3:minecraft:diamond'] });
    // first chest slot alone (no saddle)
    const g = bedrockEntity(bEnt(`minecraft:${sp}`, { ChestItems: T.lc([bEmpty(0), bItem('minecraft:emerald', 1, 1)]) }));
    assert.deepEqual(slots(g), { eq: [], inv: ['1:minecraft:emerald'] });
    // through the evaluator: same layout PASS, first chest slot moved → not PASS
    const src = bEnt(`minecraft:${sp}`, { ChestItems: T.lc([bItem('minecraft:saddle', 1, 0), bItem('minecraft:emerald', 1, 1), bItem('minecraft:diamond', 3, 3)]) });
    const w = (t) => bedrockWorld({ actors: [t] });
    const same = await run('entity', { source: w(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', w(src)) });
    assert.equal(status(same[0].res.equipment.roundtrip), 'PASS');
    assert.equal(status(same[0].res.inventory.roundtrip), 'PASS');
    const moved = bEnt(`minecraft:${sp}`, { ChestItems: T.lc([bItem('minecraft:saddle', 1, 0), bItem('minecraft:emerald', 1, 2), bItem('minecraft:diamond', 3, 3)]) });
    const rows = await run('entity', { source: w(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', w(moved)) });
    assert.notEqual(status(rows[0].res.inventory.roundtrip), 'PASS');
    assert.equal(status(rows[0].res.equipment.roundtrip), 'PASS');
  });
}
test('horse not regressed: ChestItems 0 saddle, 1 armour; Armor[4] body; llama carpet slot 0', () => {
  assert.deepEqual(slots(bedrockEntity(bEnt('minecraft:horse', { ChestItems: T.lc([bItem('minecraft:saddle', 1, 0), bItem('minecraft:iron_horse_armor', 1, 1)]) }))),
    { eq: ['body:minecraft:iron_horse_armor', 'saddle:minecraft:saddle'], inv: [] });
  assert.deepEqual(slots(bedrockEntity(bEnt('minecraft:horse', { Armor: T.lc([bEmpty(), bEmpty(), bEmpty(), bEmpty(), bItem('minecraft:diamond_horse_armor')]) }))),
    { eq: ['body:minecraft:diamond_horse_armor'], inv: [] });
  assert.deepEqual(slots(bedrockEntity(bEnt('minecraft:llama', { ChestItems: T.lc([bItem('minecraft:white_carpet', 1, 0), bItem('minecraft:emerald', 1, 1)]) }))),
    { eq: ['body:minecraft:white_carpet'], inv: ['1:minecraft:emerald'] });
});

// ── 5. campfire ─────────────────────────────────────────────────────────────
test('campfire: Java slot i ↔ Bedrock Item(i+1); each position kept', async () => {
  const jc = T.c({ id: T.str('minecraft:campfire'), x: T.i(1), y: T.i(2), z: T.i(3), Items: T.lc([jItem('minecraft:beef', 1, 0), jItem('minecraft:porkchop', 1, 2)]) });
  const src = javaWorld({ blockEntities: [jc], blocks: { '1,2,3': { name: 'minecraft:campfire', props: {} } } });
  const bc = (items) => bedrockWorld({ blockEntities: [T.c({ id: T.str('Campfire'), x: T.i(1), y: T.i(2), z: T.i(3), ...items })] });
  const ok = await run('item_stack', { source: src, sourceEdition: 'java', direct: view('bedrock', bc({ Item1: bItem('minecraft:beef'), Item3: bItem('minecraft:porkchop') })) });
  assert.equal(at(ok, [1, 2, 3], 0, 'identity', 'direct'), 'PASS');
  assert.equal(at(ok, [1, 2, 3], 2, 'identity', 'direct'), 'PASS');
  const bad = await run('item_stack', { source: src, sourceEdition: 'java', direct: view('bedrock', bc({ Item2: bItem('minecraft:beef'), Item3: bItem('minecraft:porkchop') })) });
  assert.equal(at(bad, [1, 2, 3], 0, 'identity', 'direct'), 'FAIL');
  // Bedrock source: Item4 is slot 3, judged on a Java campfire
  const bsrc = bc({ Item4: bItem('minecraft:beef') });
  const jt = (slot) => javaWorld({ blockEntities: [T.c({ id: T.str('minecraft:campfire'), x: T.i(1), y: T.i(2), z: T.i(3), Items: T.lc([jItem('minecraft:beef', 1, slot)]) })], blocks: { '1,2,3': { name: 'minecraft:campfire', props: {} } } });
  assert.equal(at(await run('item_stack', { source: bsrc, sourceEdition: 'bedrock', direct: view('java', jt(3)) }), [1, 2, 3], 3, 'identity', 'direct'), 'PASS');
  assert.equal(at(await run('item_stack', { source: bsrc, sourceEdition: 'bedrock', direct: view('java', jt(0)) }), [1, 2, 3], 3, 'identity', 'direct'), 'FAIL');
});

// ── 6. player armour: recorded slot names (fixtures built from now on) ──────
const ARMOR = ['minecraft:iron_helmet', 'minecraft:iron_chestplate', 'minecraft:iron_leggings', 'minecraft:iron_boots'];
const NAMES = ['head', 'chest', 'legs', 'feet'];
const bPlayer = (armor) => T.c({ Pos: T.lf([0, 65.62, 0]), DimensionId: T.i(0), PlayerGameMode: T.i(0), Armor: T.lc(armor), Offhand: T.lc([bEmpty()]) });
const bpw = (tag) => bedrockWorld({ named: { '~local_player': tag }, level: T.c({ GameType: T.i(0) }) });
test('player armour: Bedrock Armor index 0..3 = head, chest, legs, feet — recorded and compared per slot', async () => {
  for (let i = 0; i < 4; i++) {
    const a = [bEmpty(), bEmpty(), bEmpty(), bEmpty()]; a[i] = bItem(ARMOR[i]);
    const rows = await run('player', { source: bpw(bPlayer(a)), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(bPlayer(a))) });
    assert.deepEqual(rows[0].subject.expected.armor.map((x) => x.slot), [NAMES[i]]);
    assert.equal(status(rows[0].res.armor.roundtrip), 'PASS');
    const b = [bEmpty(), bEmpty(), bEmpty(), bEmpty()]; b[(i + 1) % 4] = bItem(ARMOR[i]);
    const moved = await run('player', { source: bpw(bPlayer(a)), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(bPlayer(b))) });
    assert.equal(status(moved[0].res.armor.roundtrip), 'FAIL', NAMES[i]);
  }
});
test('player armour: Java equipment keys head / chest / legs / feet ↔ Bedrock Armor indices (direct)', async () => {
  const { writeJavaPlayer } = await import('./helpers.mjs');
  const eq = Object.fromEntries(NAMES.map((n, i) => [n, jItem(ARMOR[i])]));
  const f = writeJavaPlayer(T.c({ Pos: T.ld([0, 64, 0]), Dimension: T.str('minecraft:overworld'), playerGameType: T.i(0), equipment: T.c(eq) }));
  const src = javaWorld({ playerFiles: [f], level: T.c({}) });
  const rows = await run('player', { source: src, sourceEdition: 'java', direct: view('bedrock', bpw(bPlayer(ARMOR.map((x) => bItem(x))))) });
  assert.deepEqual(rows[0].subject.expected.armor.map((x) => x.slot).sort(), [...NAMES].sort());
  assert.equal(status(rows[0].res.armor.direct), 'PASS');
  const rev = await run('player', { source: src, sourceEdition: 'java', direct: view('bedrock', bpw(bPlayer([...ARMOR].reverse().map((x) => bItem(x))))) });
  assert.equal(status(rev[0].res.armor.direct), 'FAIL');
});

// ── 7. brewing: each of the three bottles on its own ────────────────────────
const brewJ = (slot) => javaWorld({ blockEntities: [T.c({ id: T.str('minecraft:brewing_stand'), x: T.i(1), y: T.i(2), z: T.i(3), Items: T.lc([jItem('minecraft:potion', 1, slot)]) })], blocks: { '1,2,3': { name: 'minecraft:brewing_stand', props: {} } } });
const brewB = (slot) => bedrockWorld({ blockEntities: [T.c({ id: T.str('BrewingStand'), x: T.i(1), y: T.i(2), z: T.i(3), Items: T.lc([bItem('minecraft:potion', 1, slot)]) })] });
test('brewing, one bottle at a time: J0→B1, J1→B2, J2→B3 and back; any other bottle slot FAIL', async () => {
  for (const [j, b] of [[0, 1], [1, 2], [2, 3]]) {
    for (const tb of [1, 2, 3]) {
      const rows = await run('item_stack', { source: brewJ(j), sourceEdition: 'java', direct: view('bedrock', brewB(tb)) });
      assert.equal(at(rows, [1, 2, 3], j, 'identity', 'direct'), tb === b ? 'PASS' : 'FAIL', `J${j} → B${tb}`);
    }
    for (const tj of [0, 1, 2]) {
      const rows = await run('item_stack', { source: brewB(b), sourceEdition: 'bedrock', direct: view('java', brewJ(tj)) });
      assert.equal(at(rows, [1, 2, 3], b, 'identity', 'direct'), tj === j ? 'PASS' : 'FAIL', `B${b} → J${tj}`);
    }
  }
});
