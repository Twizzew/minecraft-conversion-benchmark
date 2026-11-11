// v1.3 closure — A. slots: an item found in another slot than its semantic position is not
// the same state. Every test runs the real path facts → family → evaluator.
import test from 'node:test';
import assert from 'node:assert/strict';
import { T, jItem, bItem, bEmpty, javaWorld, bedrockWorld, view, run, evalSubjects, status, writeJavaPlayer, useSyntheticJavaReports } from './helpers.mjs';

useSyntheticJavaReports(['minecraft:diamond', 'minecraft:emerald', 'minecraft:iron_helmet', 'minecraft:iron_boots', 'minecraft:shield', 'minecraft:iron_sword', 'minecraft:saddle', 'minecraft:carrot']);

const POS = [10, 64, 10];
const jBE = (id, items, pos = POS) => T.c({ id: T.str(id), x: T.i(pos[0]), y: T.i(pos[1]), z: T.i(pos[2]), Items: T.lc(items) });
const bBE = (id, items, pos = POS) => T.c({ id: T.str(id), x: T.i(pos[0]), y: T.i(pos[1]), z: T.i(pos[2]), Items: T.lc(items), isMovable: T.b(1) });
const barrelBlocks = { [POS.join()]: { name: 'minecraft:barrel', props: {} } };
const jw = (be) => javaWorld({ blockEntities: [be], blocks: barrelBlocks });
const bw = (be) => bedrockWorld({ blockEntities: [be] });
/** status of `aspect` at `level` for the item_stack subject in source slot `slot` */
const at = (rows, slot, aspect, level) => status(rows.find((x) => x.subject.locator.slot === slot).res[aspect][level]);

// ── containers (item_stack) ─────────────────────────────────────────────────
test('container round trip: same item, same slot → PASS', async () => {
  const src = jBE('minecraft:barrel', [jItem('minecraft:diamond', 3, 0)]);
  const rows = await run('item_stack', { source: jw(src), sourceEdition: 'java', roundtrip: view('java', jw(src)) });
  assert.equal(at(rows, 0, 'identity', 'roundtrip'), 'PASS');
  assert.equal(at(rows, 0, 'count', 'roundtrip'), 'PASS');
});

test('container round trip: hotbar-like slot 0 → slot 8 is not PASS', async () => {
  const src = jBE('minecraft:barrel', [jItem('minecraft:diamond', 3, 0)]);
  const out = jBE('minecraft:barrel', [jItem('minecraft:diamond', 3, 8)]);
  const rows = await run('item_stack', { source: jw(src), sourceEdition: 'java', roundtrip: view('java', jw(out)) });
  assert.equal(at(rows, 0, 'identity', 'roundtrip'), 'FAIL');
  assert.equal(at(rows, 0, 'count', 'roundtrip'), 'FAIL');
});

test('container round trip: two stacks exchanged → both FAIL', async () => {
  const src = jBE('minecraft:barrel', [jItem('minecraft:diamond', 1, 0), jItem('minecraft:emerald', 1, 1)]);
  const out = jBE('minecraft:barrel', [jItem('minecraft:diamond', 1, 1), jItem('minecraft:emerald', 1, 0)]);
  const rows = await run('item_stack', { source: jw(src), sourceEdition: 'java', roundtrip: view('java', jw(out)) });
  assert.equal(at(rows, 0, 'identity', 'roundtrip'), 'FAIL');
  assert.equal(at(rows, 1, 'identity', 'roundtrip'), 'FAIL');
});

test('container direct Java→Bedrock: same slot PASS, moved stack FAIL (no "found elsewhere" PASS)', async () => {
  const src = jBE('minecraft:barrel', [jItem('minecraft:diamond', 2, 4)]);
  const ok = await run('item_stack', { source: jw(src), sourceEdition: 'java', direct: view('bedrock', bw(bBE('Barrel', [bItem('minecraft:diamond', 2, 4)]))) });
  assert.equal(at(ok, 4, 'identity', 'direct'), 'PASS');
  const moved = await run('item_stack', { source: jw(src), sourceEdition: 'java', direct: view('bedrock', bw(bBE('Barrel', [bItem('minecraft:diamond', 2, 7)]))) });
  assert.equal(at(moved, 4, 'identity', 'direct'), 'FAIL');
  assert.equal(at(moved, 4, 'count', 'direct'), 'FAIL');
});

test('container direct Bedrock→Java: moved stack FAIL', async () => {
  const src = bBE('Barrel', [bItem('minecraft:emerald', 5, 0)]);
  const rows = await run('item_stack', { source: bw(src), sourceEdition: 'bedrock', direct: view('java', jw(jBE('minecraft:barrel', [jItem('minecraft:emerald', 5, 13)]))) });
  assert.equal(at(rows, 0, 'identity', 'direct'), 'FAIL');
});

test('positional Bedrock container (no Slot tags, rule 44): shifted entry is not PASS on round trip', async () => {
  const shelf = (items) => T.c({ id: T.str('ChiseledBookshelf'), x: T.i(POS[0]), y: T.i(POS[1]), z: T.i(POS[2]), Items: T.lc(items) });
  const src = shelf([bItem('minecraft:diamond', 1), bEmpty(), bEmpty(), bEmpty(), bEmpty(), bEmpty()]);
  const out = shelf([bEmpty(), bEmpty(), bItem('minecraft:diamond', 1), bEmpty(), bEmpty(), bEmpty()]);
  const rows = await run('item_stack', { source: bw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bw(out)) });
  assert.equal(at(rows, 0, 'identity', 'roundtrip'), 'FAIL');
  const same = await run('item_stack', { source: bw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bw(src)) });
  assert.equal(at(same, 0, 'identity', 'roundtrip'), 'PASS');
});

// ── brewing stand: roles, not raw indices ────────────────────────────────────
// Java persisted: 0,1,2 bottles · 3 ingredient · 4 fuel. Bedrock persisted: 0 ingredient ·
// 1,2,3 bottles · 4 fuel. Evidence in docs/rules-changelog.md (rule 53).
const BOTTLES = ['minecraft:potion', 'minecraft:splash_potion', 'minecraft:lingering_potion'];
const jBrew = (pos = POS) => jBE('minecraft:brewing_stand', [jItem(BOTTLES[0], 1, 0), jItem(BOTTLES[1], 1, 1), jItem(BOTTLES[2], 1, 2), jItem('minecraft:nether_wart', 1, 3), jItem('minecraft:blaze_powder', 4, 4)], pos);
const bBrewRoles = () => bBE('BrewingStand', [bItem('minecraft:nether_wart', 1, 0), bItem(BOTTLES[0], 1, 1), bItem(BOTTLES[1], 1, 2), bItem(BOTTLES[2], 1, 3), bItem('minecraft:blaze_powder', 4, 4)]);
const bBrewRawIndices = () => bBE('BrewingStand', [bItem(BOTTLES[0], 1, 0), bItem(BOTTLES[1], 1, 1), bItem(BOTTLES[2], 1, 2), bItem('minecraft:nether_wart', 1, 3), bItem('minecraft:blaze_powder', 4, 4)]);
const brewJw = (be) => javaWorld({ blockEntities: [be], blocks: { [POS.join()]: { name: 'minecraft:brewing_stand', props: {} } } });

test('brewing Java→Bedrock: role mapping J0..2→B1..3, J3→B0, J4→B4 is PASS for every slot', async () => {
  const rows = await run('item_stack', { source: brewJw(jBrew()), sourceEdition: 'java', direct: view('bedrock', bw(bBrewRoles())) });
  for (const s of [0, 1, 2, 3, 4]) { assert.equal(at(rows, s, 'identity', 'direct'), 'PASS', `slot ${s}`); assert.equal(at(rows, s, 'count', 'direct'), 'PASS', `slot ${s}`); }
});

test('brewing Java→Bedrock: raw indices copied (ingredient in a bottle slot) is not PASS', async () => {
  const rows = await run('item_stack', { source: brewJw(jBrew()), sourceEdition: 'java', direct: view('bedrock', bw(bBrewRawIndices())) });
  assert.equal(at(rows, 3, 'identity', 'direct'), 'FAIL', 'ingredient J3 must be in B0'); // B0 holds a potion
  assert.equal(at(rows, 2, 'identity', 'direct'), 'FAIL', 'bottle J2 must be in B3'); // B3 holds the wart
  assert.equal(at(rows, 4, 'identity', 'direct'), 'PASS', 'fuel J4 = B4');
});

test('brewing Bedrock→Java: B0 ingredient → J3, B1..3 → J0..2, fuel B4 → J4', async () => {
  const rows = await run('item_stack', { source: bw(bBrewRoles()), sourceEdition: 'bedrock', direct: view('java', brewJw(jBrew())) });
  for (const s of [0, 1, 2, 3, 4]) assert.equal(at(rows, s, 'identity', 'direct'), 'PASS', `slot ${s}`);
  const raw = await run('item_stack', { source: bw(bBrewRoles()), sourceEdition: 'bedrock', direct: view('java', brewJw(jBE('minecraft:brewing_stand', [jItem('minecraft:nether_wart', 1, 0), jItem(BOTTLES[0], 1, 1), jItem(BOTTLES[1], 1, 2), jItem(BOTTLES[2], 1, 3), jItem('minecraft:blaze_powder', 4, 4)]))) });
  assert.equal(at(raw, 0, 'identity', 'direct'), 'FAIL', 'ingredient B0 copied to J0 (a bottle slot)');
  assert.equal(at(raw, 4, 'identity', 'direct'), 'PASS', 'fuel');
});

test('brewing bottles keep their individual position (J0↔B1, J1↔B2, J2↔B3)', async () => {
  const swapped = bBE('BrewingStand', [bItem('minecraft:nether_wart', 1, 0), bItem(BOTTLES[1], 1, 1), bItem(BOTTLES[0], 1, 2), bItem(BOTTLES[2], 1, 3), bItem('minecraft:blaze_powder', 4, 4)]);
  const rows = await run('item_stack', { source: brewJw(jBrew()), sourceEdition: 'java', direct: view('bedrock', bw(swapped)) });
  assert.equal(at(rows, 0, 'identity', 'direct'), 'FAIL');
  assert.equal(at(rows, 1, 'identity', 'direct'), 'FAIL');
  assert.equal(at(rows, 2, 'identity', 'direct'), 'PASS');
});

test('brewing round trip: same edition keeps raw slots; a wrong slot is FAIL', async () => {
  const ok = await run('item_stack', { source: bw(bBrewRoles()), sourceEdition: 'bedrock', roundtrip: view('bedrock', bw(bBrewRoles())) });
  for (const s of [0, 1, 2, 3, 4]) assert.equal(at(ok, s, 'identity', 'roundtrip'), 'PASS');
  const bad = await run('item_stack', { source: bw(bBrewRoles()), sourceEdition: 'bedrock', roundtrip: view('bedrock', bw(bBrewRawIndices())) });
  assert.equal(at(bad, 0, 'identity', 'roundtrip'), 'FAIL', 'ingredient left B0');
  assert.equal(at(bad, 4, 'identity', 'roundtrip'), 'PASS');
});

// ── player: inventory, ender chest, armour, offhand ─────────────────────────
const bPlayer = ({ inv = [], ender = [], armor = [bEmpty(), bEmpty(), bEmpty(), bEmpty()], offhand = [bEmpty()] } = {}) => T.c({
  Pos: T.lf([0, 65.62, 0]), DimensionId: T.i(0), PlayerGameMode: T.i(0),
  Inventory: T.lc(inv), EnderChestInventory: T.lc(ender), Armor: T.lc(armor), Offhand: T.lc(offhand),
});
const bpw = (tag) => bedrockWorld({ named: { '~local_player': tag }, level: T.c({ GameType: T.i(0) }) });
const pAt = (rows, aspect, level) => status(rows[0].res[aspect][level]);

test('player inventory round trip: same slots PASS; hotbar 0 → 8 not PASS', async () => {
  const src = bPlayer({ inv: [bItem('minecraft:diamond_sword', 1, 0), bItem('minecraft:emerald', 5, 3)] });
  const same = await run('player', { source: bpw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(src)) });
  assert.equal(pAt(same, 'inventory', 'roundtrip'), 'PASS');
  const moved = await run('player', { source: bpw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(bPlayer({ inv: [bItem('minecraft:diamond_sword', 1, 8), bItem('minecraft:emerald', 5, 3)] }))) });
  assert.notEqual(pAt(moved, 'inventory', 'roundtrip'), 'PASS');
});

test('player inventory round trip: permutation of two slots is FAIL', async () => {
  const src = bPlayer({ inv: [bItem('minecraft:diamond', 1, 0), bItem('minecraft:emerald', 1, 1)] });
  const out = bPlayer({ inv: [bItem('minecraft:diamond', 1, 1), bItem('minecraft:emerald', 1, 0)] });
  const rows = await run('player', { source: bpw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(out)) });
  assert.equal(pAt(rows, 'inventory', 'roundtrip'), 'FAIL');
});

test('player ender chest round trip: moved stack not PASS', async () => {
  const src = bPlayer({ inv: [bItem('minecraft:carrot', 1, 0)], ender: [bItem('minecraft:diamond', 1, 0)] });
  const out = bPlayer({ inv: [bItem('minecraft:carrot', 1, 0)], ender: [bItem('minecraft:diamond', 1, 26)] });
  const rows = await run('player', { source: bpw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(out)) });
  assert.equal(pAt(rows, 'ender_chest', 'roundtrip'), 'FAIL');
});

test('player armour round trip: helmet and boots exchanged is FAIL', async () => {
  const src = bPlayer({ armor: [bItem('minecraft:iron_helmet'), bEmpty(), bEmpty(), bItem('minecraft:iron_boots')] });
  const out = bPlayer({ armor: [bItem('minecraft:iron_boots'), bEmpty(), bEmpty(), bItem('minecraft:iron_helmet')] });
  const rows = await run('player', { source: bpw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(out)) });
  assert.equal(pAt(rows, 'armor', 'roundtrip'), 'FAIL');
});

test('player offhand → hotbar is not PASS (offhand is a slot of its own)', async () => {
  const src = bPlayer({ inv: [bItem('minecraft:carrot', 1, 0)], offhand: [bItem('minecraft:shield')] });
  const out = bPlayer({ inv: [bItem('minecraft:carrot', 1, 0), bItem('minecraft:shield', 1, 1)], offhand: [bEmpty()] });
  const rows = await run('player', { source: bpw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(out)) });
  assert.equal(pAt(rows, 'armor', 'roundtrip'), 'FAIL');
});

test('player direct Bedrock→Java: inventory slot kept PASS, moved FAIL; armour by slot name', async () => {
  const src = bPlayer({ inv: [bItem('minecraft:diamond', 2, 0)], armor: [bItem('minecraft:iron_helmet'), bEmpty(), bEmpty(), bEmpty()] });
  const jp = (inv, equipment) => {
    const f = writeJavaPlayer(T.c({ Pos: T.ld([0, 64, 0]), Dimension: T.str('minecraft:overworld'), playerGameType: T.i(0), Inventory: T.lc(inv), equipment: T.c(equipment) }));
    return javaWorld({ playerFiles: [f], level: T.c({}) });
  };
  const ok = await run('player', { source: bpw(src), sourceEdition: 'bedrock', direct: view('java', jp([jItem('minecraft:diamond', 2, 0)], { head: jItem('minecraft:iron_helmet') })) });
  assert.equal(pAt(ok, 'inventory', 'direct'), 'PASS');
  assert.equal(pAt(ok, 'armor', 'direct'), 'PASS');
  const bad = await run('player', { source: bpw(src), sourceEdition: 'bedrock', direct: view('java', jp([jItem('minecraft:diamond', 2, 8)], { feet: jItem('minecraft:iron_helmet') })) });
  assert.equal(pAt(bad, 'inventory', 'direct'), 'FAIL');
  assert.equal(pAt(bad, 'armor', 'direct'), 'FAIL');
});

test('player armour of a v1.3 fixture (slot not recorded): never a PASS without the slot', async () => {
  const src = bPlayer({ armor: [bItem('minecraft:iron_helmet'), bEmpty(), bEmpty(), bEmpty()] });
  const fam = await import('../../families/player.mjs');
  const subjects = JSON.parse(JSON.stringify(await fam.enumerate({ source: { edition: 'bedrock', world: bpw(src) } }))).map((s, i) => ({ id: `p${i}`, ...s }));
  for (const a of subjects[0].expected.armor) delete a.slot; // the frozen v1.3 fixtures did not record it
  const rows = await evalSubjects('player', subjects, { sourceEdition: 'bedrock', roundtrip: view('bedrock', bpw(src)) });
  assert.match(pAt(rows, 'armor', 'roundtrip'), /^NE:/);
});

// ── entities: equipment and inventory ───────────────────────────────────────
const jEnt = (id, extra) => T.c({ id: T.str(id), Pos: T.ld([5.5, 64, 5.5]), UUID: T.ia([1, 2, 3, 4]), ...extra });
const bEnt = (id, extra) => T.c({ identifier: T.str(id), Pos: T.lf([5.5, 64, 5.5]), UniqueID: { type: 'long', value: [0, 7] }, ...extra });
const ejw = (...tags) => javaWorld({ entities: tags });
const ebw = (...tags) => bedrockWorld({ actors: tags });
const eAt = (rows, aspect, level) => status(rows[0].res[aspect][level]);

test('entity equipment round trip: mainhand and offhand exchanged is FAIL', async () => {
  const src = jEnt('minecraft:zombie', { equipment: T.c({ mainhand: jItem('minecraft:iron_sword'), offhand: jItem('minecraft:shield') }) });
  const out = jEnt('minecraft:zombie', { equipment: T.c({ mainhand: jItem('minecraft:shield'), offhand: jItem('minecraft:iron_sword') }) });
  const same = await run('entity', { source: ejw(src), sourceEdition: 'java', roundtrip: view('java', ejw(src)) });
  assert.equal(eAt(same, 'equipment', 'roundtrip'), 'PASS');
  const rows = await run('entity', { source: ejw(src), sourceEdition: 'java', roundtrip: view('java', ejw(out)) });
  assert.equal(eAt(rows, 'equipment', 'roundtrip'), 'FAIL');
});

test('entity equipment direct Java→Bedrock: helmet worn on the feet is FAIL', async () => {
  const src = jEnt('minecraft:zombie', { equipment: T.c({ head: jItem('minecraft:iron_helmet') }) });
  const ok = await run('entity', { source: ejw(src), sourceEdition: 'java', direct: view('bedrock', ebw(bEnt('minecraft:zombie', { Armor: T.lc([bItem('minecraft:iron_helmet'), bEmpty(), bEmpty(), bEmpty()]) }))) });
  assert.equal(eAt(ok, 'equipment', 'direct'), 'PASS');
  const bad = await run('entity', { source: ejw(src), sourceEdition: 'java', direct: view('bedrock', ebw(bEnt('minecraft:zombie', { Armor: T.lc([bEmpty(), bEmpty(), bEmpty(), bItem('minecraft:iron_helmet')]) }))) });
  assert.equal(eAt(bad, 'equipment', 'direct'), 'FAIL');
});

test('entity inventory (chest minecart, Java Items) round trip: same slot PASS, 0 → 8 and permutation not PASS', async () => {
  const cart = (items) => jEnt('minecraft:chest_minecart', { Items: T.lc(items) });
  const src = cart([jItem('minecraft:diamond', 1, 0), jItem('minecraft:emerald', 1, 1)]);
  const same = await run('entity', { source: ejw(src), sourceEdition: 'java', roundtrip: view('java', ejw(src)) });
  assert.equal(eAt(same, 'inventory', 'roundtrip'), 'PASS');
  const moved = await run('entity', { source: ejw(src), sourceEdition: 'java', roundtrip: view('java', ejw(cart([jItem('minecraft:diamond', 1, 8), jItem('minecraft:emerald', 1, 1)]))) });
  assert.notEqual(eAt(moved, 'inventory', 'roundtrip'), 'PASS');
  const perm = await run('entity', { source: ejw(src), sourceEdition: 'java', roundtrip: view('java', ejw(cart([jItem('minecraft:diamond', 1, 1), jItem('minecraft:emerald', 1, 0)]))) });
  assert.equal(eAt(perm, 'inventory', 'roundtrip'), 'FAIL');
});

test('entity inventory (chest minecart, Bedrock ChestItems) round trip and direct', async () => {
  const cart = (items) => bEnt('minecraft:chest_minecart', { ChestItems: T.lc(items) });
  const src = cart([bItem('minecraft:diamond', 1, 0), bItem('minecraft:emerald', 1, 1)]);
  const same = await run('entity', { source: ebw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', ebw(src)) });
  assert.equal(eAt(same, 'inventory', 'roundtrip'), 'PASS');
  const perm = await run('entity', { source: ebw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', ebw(cart([bItem('minecraft:diamond', 1, 1), bItem('minecraft:emerald', 1, 0)]))) });
  assert.equal(eAt(perm, 'inventory', 'roundtrip'), 'FAIL');
  const jcart = (items) => jEnt('minecraft:chest_minecart', { Items: T.lc(items) });
  const dOk = await run('entity', { source: ebw(src), sourceEdition: 'bedrock', direct: view('java', ejw(jcart([jItem('minecraft:diamond', 1, 0), jItem('minecraft:emerald', 1, 1)]))) });
  assert.equal(eAt(dOk, 'inventory', 'direct'), 'PASS');
  const dBad = await run('entity', { source: ebw(src), sourceEdition: 'bedrock', direct: view('java', ejw(jcart([jItem('minecraft:diamond', 1, 8), jItem('minecraft:emerald', 1, 1)]))) });
  assert.notEqual(eAt(dBad, 'inventory', 'direct'), 'PASS');
});

test('entity inventory of a villager (Java stores no slots) stays an unordered comparison', async () => {
  const v = (items) => jEnt('minecraft:villager', { Inventory: T.lc(items) });
  const src = v([jItem('minecraft:carrot', 3), jItem('minecraft:emerald', 1)]);
  const rows = await run('entity', { source: ejw(src), sourceEdition: 'java', roundtrip: view('java', ejw(v([jItem('minecraft:emerald', 1), jItem('minecraft:carrot', 3)]))) });
  assert.equal(eAt(rows, 'inventory', 'roundtrip'), 'PASS');
});

test('horse: Bedrock ChestItems 0/1 still read as saddle / body (not as inventory)', async () => {
  const src = bEnt('minecraft:horse', { ChestItems: T.lc([bItem('minecraft:saddle', 1, 0), bItem('minecraft:iron_horse_armor', 1, 1)]) });
  const rows = await run('entity', { source: ebw(src), sourceEdition: 'bedrock', roundtrip: view('bedrock', ebw(src)) });
  assert.equal(eAt(rows, 'equipment', 'roundtrip'), 'PASS');
  assert.equal(rows[0].res.inventory, undefined);
  assert.deepEqual(rows[0].subject.expected.equipment.map((x) => x.slot).sort(), ['body', 'saddle']);
});

test('entity inventory of a frozen v1.3 fixture: slot recovered from the stored item (Slot tag)', async () => {
  const cart = (items) => bEnt('minecraft:chest_minecart', { ChestItems: T.lc(items) });
  const src = cart([bItem('minecraft:diamond', 1, 0), bItem('minecraft:emerald', 1, 1)]);
  const fam = await import('../../families/entity.mjs');
  const sourceView = view('bedrock', ebw(src));
  const subjects = JSON.parse(JSON.stringify(await fam.enumerate({ source: { edition: 'bedrock' }, sourceView }))).map((s, i) => ({ id: `e${i}`, ...s }));
  for (const it of subjects[0].expected.inventory) delete it.slot; // v1.3 fixtures carry only id/count/sem/semx
  const rows = await evalSubjects('entity', subjects, { sourceEdition: 'bedrock', roundtrip: view('bedrock', ebw(cart([bItem('minecraft:diamond', 1, 1), bItem('minecraft:emerald', 1, 0)]))) });
  assert.equal(eAt(rows, 'inventory', 'roundtrip'), 'FAIL');
});
