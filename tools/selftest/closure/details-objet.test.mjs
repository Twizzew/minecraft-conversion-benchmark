// Lots 1 à 3 (08/11/2026) : les tables Java ↔ Bedrock des détails donnent la MÊME forme neutre depuis les
// deux éditions, sur des valeurs relevées dans les mondes sources (B02, R01, J01).
import test from 'node:test';
import assert from 'node:assert/strict';
import { detailsDe, ecartsDetails } from '../../lib/details-objet.mjs';
import { crossData } from '../../lib/cross-data.mjs';

test('enchantements, potions, flèche à effet, couleur, cor : même forme des deux côtés', () => {
  const b = detailsDe('bedrock', { Name: 'minecraft:copper_hoe', Count: 1, Damage: 0, tag: { ench: [{ id: 17, lvl: 2 }, { id: 18, lvl: 3 }, { id: 26, lvl: 1 }, { id: 28, lvl: 1 }] } });
  const j = detailsDe('java', { id: 'minecraft:copper_hoe', components: { 'minecraft:enchantments': { 'minecraft:unbreaking': 2, 'minecraft:fortune': 3, 'minecraft:mending': 1, 'minecraft:vanishing_curse': 1 } } });
  assert.deepEqual(b['minecraft:enchantments'], j['minecraft:enchantments']);
  assert.equal(detailsDe('bedrock', { Name: 'minecraft:arrow', Count: 46, Damage: 30 })['minecraft:potion_contents'], 'long_regeneration');
  assert.equal(detailsDe('java', { id: 'minecraft:tipped_arrow', components: { 'minecraft:potion_contents': { potion: 'minecraft:long_regeneration' } } })['minecraft:potion_contents'], 'long_regeneration');
  assert.equal(detailsDe('bedrock', { Name: 'minecraft:arrow', Count: 1, Damage: 0 })['minecraft:potion_contents'], undefined);
  assert.equal(detailsDe('bedrock', { Name: 'minecraft:bed', Count: 1, Damage: 14 })['mccb:couleur'], 'red');
  assert.equal(detailsDe('java', { id: 'minecraft:red_bed' })['mccb:couleur'], 'red');
  assert.equal(detailsDe('bedrock', { Name: 'minecraft:banner', Count: 1, Damage: 15 })['mccb:couleur'], 'white');
  assert.equal(detailsDe('bedrock', { Name: 'minecraft:goat_horn', Count: 1, Damage: 1 })['minecraft:instrument'], 'sing');
  assert.equal(detailsDe('java', { id: 'minecraft:goat_horn', components: { 'minecraft:instrument': 'minecraft:sing_goat_horn' } })['minecraft:instrument'], 'sing');
  assert.equal(detailsDe('bedrock', { Name: 'minecraft:enchanted_book', Count: 1, Damage: 0, tag: { ench: [{ id: 16, lvl: 1 }] } })['minecraft:stored_enchantments'][0], 'silk_touch:1');
});

test('contenu de boîte et projectiles : objet équivalent et même nombre', () => {
  const src = { Name: 'minecraft:crossbow', Count: 1, Damage: 0, tag: { chargedItem: { Name: 'minecraft:arrow', Count: 3, Damage: 30 } } };
  assert.equal(ecartsDetails('bedrock', src, { id: 'minecraft:crossbow', components: { 'minecraft:charged_projectiles': [{ id: 'minecraft:tipped_arrow', count: 3 }] } }).ecarts.length, 0);
  assert.equal(ecartsDetails('bedrock', src, { id: 'minecraft:crossbow', components: {} }).ecarts[0].detail, 'minecraft:charged_projectiles');
  const boite = { Name: 'minecraft:lime_shulker_box', Count: 1, Damage: 0, tag: { Items: [{ Name: 'minecraft:diamond', Count: 21, Slot: 12 }] } };
  assert.equal(ecartsDetails('bedrock', boite, { id: 'minecraft:lime_shulker_box', components: { 'minecraft:container': [{ slot: 12, item: { id: 'minecraft:diamond', count: 21 } }] } }).ecarts.length, 0);
  assert.equal(ecartsDetails('bedrock', boite, { id: 'minecraft:lime_shulker_box', components: { 'minecraft:container': [{ slot: 12, item: { id: 'minecraft:diamond', count: 20 } }] } }).ecarts.length, 1);
});

const fx = (data) => ({ sem: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, JSON.stringify(v)])), data });
test('créatures (lot 2) : loup, cheval, poisson tropical, mouton', () => {
  const loupB = fx({ Variant: 8, IsTamed: 1, Color: 14, Sitting: 1 });
  const loupJ = fx({ variant: 'minecraft:woods', Owner: [1, 2, 3, 4], CollarColor: 14, Sitting: 1 });
  assert.equal(crossData('entity', 'bedrock', loupB, loupJ, ['minecraft:wolf']).status, 'PASS');
  assert.equal(crossData('entity', 'bedrock', loupB, fx({ variant: 'minecraft:pale', Owner: [1], CollarColor: 14, Sitting: 1 }), ['minecraft:wolf']).status, 'PARTIAL');
  assert.equal(crossData('entity', 'bedrock', fx({ Variant: 3, MarkVariant: 2 }), fx({ Variant: 3 + 512 }), ['minecraft:horse']).status, 'PASS');
  assert.equal(crossData('entity', 'bedrock', fx({ Variant: 1, MarkVariant: 4, Color: 14, Color2: 7 }), fx({ Variant: 1 | (4 << 8) | (14 << 16) | (7 << 24) }), ['minecraft:tropicalfish', 'minecraft:tropical_fish']).status, 'PASS');
  assert.equal(crossData('entity', 'java', fx({ Color: 15, Sheared: 1 }), fx({ Color: 15, Sheared: 0 }), ['minecraft:sheep']).status, 'PARTIAL');
});

test('blocs-entités (lot 3) : butin, générateur, tessons', () => {
  const coffreJ = fx({ LootTable: 'minecraft:archaeology/ocean_ruin_warm' });
  assert.equal(crossData('block_entity', 'java', coffreJ, fx({ LootTable: 'loot_tables/entities/warm_ocean_ruins_brushable_block.json' }), ['minecraft:brushable_block']).status, 'PASS');
  assert.equal(crossData('block_entity', 'java', coffreJ, fx({}), ['minecraft:brushable_block']).status, 'FAIL');
  // nom Java laissé tel quel dans le monde Bedrock : n'existe pas en Bedrock
  assert.notEqual(crossData('block_entity', 'java', coffreJ, fx({ LootTable: 'loot_tables/archaeology/ocean_ruin_warm.json' }), ['minecraft:brushable_block']).status, 'PASS');
  assert.equal(crossData('block_entity', 'bedrock', fx({ EntityIdentifier: 'minecraft:zombie' }), fx({ SpawnData: { entity: { id: 'minecraft:zombie' } } }), ['MobSpawner']).status, 'PASS');
  const potB = fx({ sherds: ['minecraft:guster_pottery_sherd', 'minecraft:brick', 'minecraft:brick', 'minecraft:brick'] });
  assert.equal(crossData('block_entity', 'bedrock', potB, fx({ sherds: { back: { id: 'minecraft:guster_pottery_sherd' } } }), ['DecoratedPot']).status, 'PASS');
});
