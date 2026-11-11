// MCCB 2026-11 (table de gravité 1.4) : détail d'une pile au retour (lib/slots.mjs itemDiff).
import test from 'node:test';
import assert from 'node:assert/strict';
import { itemDiff, technicalOnly, compareByPosition } from '../../lib/slots.mjs';

const J = (o) => JSON.stringify(o);

test('item detail: Bedrock flags without Java field are technical, a count is not', () => {
  const d = itemDiff(J({ Count: 40, Name: 'minecraft:carrot', Slot: 0, WasPickedUp: 1 }), J({ Count: 40, Name: 'minecraft:carrot', Slot: 0, WasPickedUp: 0 }));
  assert.deepEqual(d, ['WasPickedUp']);
  assert.equal(technicalOnly(d), true);
  assert.equal(technicalOnly(itemDiff(J({ Name: 'minecraft:potion', Damage: 5, tag: { wasJustBrewed: 1 } }), J({ Name: 'minecraft:potion', Damage: 5 }))), true);
  assert.equal(technicalOnly(itemDiff(J({ Name: 'x', tag: { Items: [{ Name: 'a', WasPickedUp: 1 }] } }), J({ Name: 'x', tag: { Items: [{ Name: 'a', WasPickedUp: 0 }] } }))), true);
  assert.equal(technicalOnly(itemDiff(J({ Count: 2, Name: 'x' }), J({ Count: 1, Name: 'x' }))), false);
});

test('item detail: legacy Bedrock name renamed by the game, wrong variant is another item', () => {
  assert.deepEqual(itemDiff(J({ Name: 'minecraft:planks', Damage: 3, Count: 3 }), J({ Name: 'minecraft:jungle_planks', Damage: 0, Count: 3 })), ['Name:legacy']);
  assert.equal(itemDiff(J({ Name: 'minecraft:planks', Damage: 3 }), J({ Name: 'minecraft:oak_planks', Damage: 0 })), null);
  assert.equal(itemDiff(J({ Name: 'minecraft:stone' }), J({ Name: 'minecraft:dirt' })), null);
  // R01 joueur 12 : planches Damage 0, bois porté par Block.states.wood_type.
  assert.deepEqual(itemDiff(J({ Block: { name: 'minecraft:planks', states: { wood_type: 'jungle' } }, Count: 46, Damage: 0, Name: 'minecraft:planks' }),
    J({ Count: 46, Damage: 0, Name: 'minecraft:jungle_planks' }), { dropBlock: true }), ['Name:legacy']);
});

test('item detail: same item at the same slot is one technical difference, not a loss plus an extra', () => {
  const e = { id: 'minecraft:carrot', semx: J({ Count: 40, Name: 'minecraft:carrot', Slot: 0, WasPickedUp: 1 }) };
  const g = { slot: 0, item: { id: 'minecraft:carrot', semx: J({ Count: 40, Name: 'minecraft:carrot', Slot: 0, WasPickedUp: 0 }) } };
  const m = compareByPosition([e], [g], () => 0, () => false, { exact: true, diff: (a, b) => itemDiff(a.semx, b.semx) });
  assert.equal(m.status, 'FAIL');
  assert.deepEqual(m.extra, []);
  assert.equal(m.technical_only, true);
  assert.deepEqual(m.wrong[0].differs, ['WasPickedUp']);
});

test('key detail: item keys, empty group, default attributes come down; a real change does not', async () => {
  const { keyDetail } = await import('../../lib/key-detail.mjs');
  assert.equal(keyDetail('Item', J({ Count: 2, Name: 'minecraft:string', WasPickedUp: 1 }), J({ Name: 'minecraft:string', Count: 2, WasPickedUp: 0 }), 'bedrock'), 'TECHNICAL');
  assert.equal(keyDetail('Item', J({ Block: { name: 'minecraft:cobblestone' }, Count: 1, Name: 'minecraft:cobblestone' }), J({ Count: 1, Name: 'minecraft:cobblestone' }), 'bedrock'), 'TECHNICAL');
  assert.equal(keyDetail('Item', J({ Count: 2, Name: 'minecraft:string' }), J({ Count: 1, Name: 'minecraft:string' }), 'bedrock'), null);
  assert.equal(keyDetail('definitions', J(['+minecraft:xp_orb', '+']), J(['+minecraft:xp_orb']), 'bedrock'), 'TECHNICAL');
  assert.equal(keyDetail('definitions', J(['+minecraft:piglin', '+ranged_unit']), J(['+minecraft:piglin', '+melee_unit']), 'bedrock'), null);
  // Rejouée : mêmes groupes actifs dans un autre ordre → TECHNICAL ; seuls des groupes d'horloge → MINOR.
  assert.equal(keyDetail('definitions', J(['+minecraft:piglin', '+a', '-attack_cooldown', '+b']), J(['+minecraft:piglin', '+b', '+a']), 'bedrock'), 'TECHNICAL');
  assert.equal(keyDetail('definitions', J(['+minecraft:villager_v2', '+unskilled', '+wander_schedule_villager']), J(['+minecraft:villager_v2', '+unskilled', '+bed_schedule_villager']), 'bedrock'), 'MINOR');
  assert.equal(keyDetail('definitions', J(['+minecraft:zombie', '+minecraft:can_break_doors']), J(['+minecraft:zombie', '+attack_cooldown']), 'bedrock'), null);
  // Échanges : Damage 32767 (toute valeur) ↔ 0 sur l'objet demandé → TECHNICAL ; un prix changé reste.
  const off = (d, n) => J({ Recipes: [{ buyA: { Count: n, Damage: d, Name: 'minecraft:emerald', WasPickedUp: 0 }, sell: { Count: 1, Damage: 0, Name: 'minecraft:iron_axe', WasPickedUp: 0 }, maxUses: 12, uses: 0 }] });
  assert.equal(keyDetail('Offers', off(32767, 3), off(0, 3), 'bedrock'), 'TECHNICAL');
  assert.equal(keyDetail('Offers', off(32767, 3), off(0, 4), 'bedrock'), null);
  const luck = { Name: 'minecraft:luck', Base: 0, Current: 0, Max: 1024 };
  const fr = (mods) => ({ Name: 'minecraft:follow_range', Base: 16, Current: mods ? 32 : 16, Max: 2048, ...(mods ? { Modifiers: [{ Name: 'RandomSpawnBonus', Amount: 1 }] } : {}) });
  assert.equal(keyDetail('Attributes', J([luck, fr(false)]), J([{ ...fr(false), Max: 3e38 }]), 'bedrock'), 'TECHNICAL');
  assert.equal(keyDetail('Attributes', J([luck, fr(true)]), J([fr(false)]), 'bedrock'), 'MINOR');
  assert.equal(keyDetail('Attributes', J([fr(false)]), J([{ ...fr(false), Base: 20, Current: 20 }]), 'bedrock'), null);
});
