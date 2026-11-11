// Table 1.8 (MCCB 2026-11, c20) : règles de classement ajoutées après le tri de R01 c20, J05 c20 et B02 c20.
import test from 'node:test';
import assert from 'node:assert/strict';
import { keyDetails } from '../../lib/key-detail.mjs';
import { itemDiff } from '../../lib/slots.mjs';

const j = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, JSON.stringify(v)]));
const acteurs = (src, ret) => ({ joueurs: { source: new Map(), roundtrip: new Map(), acteurs: { source: new Map(src), roundtrip: new Map(ret) } } });

test('lien vers le même acteur (type, place) → TECHNICAL ; autre acteur → non classé', () => {
  const o = acteurs([['-100', { id: 'minecraft:shulker', pos: [1, 64, 1] }]], [['777', { id: 'minecraft:shulker', pos: [1.2, 64, 1] }], ['888', { id: 'minecraft:zombie', pos: [1, 64, 1] }]]);
  assert.deepEqual(keyDetails(['OwnerNew'], j({ OwnerNew: '-100' }), j({ OwnerNew: '777' }), 'bedrock', o).key_detail, { OwnerNew: 'TECHNICAL' });
  assert.deepEqual(keyDetails(['OwnerNew'], j({ OwnerNew: '-100' }), j({ OwnerNew: '888' }), 'bedrock', o), {});
});

test('lien vers rien dans les deux mondes → TECHNICAL ; vers rien puis vers un acteur → non classé', () => {
  const o = acteurs([], [['888', { id: 'minecraft:zombie', pos: [0, 0, 0] }]]);
  assert.deepEqual(keyDetails(['OwnerNew'], j({ OwnerNew: '-5' }), j({ OwnerNew: '-6' }), 'bedrock', o).key_detail, { OwnerNew: 'TECHNICAL' });
  assert.deepEqual(keyDetails(['OwnerNew'], j({ OwnerNew: '-5' }), j({ OwnerNew: '888' }), 'bedrock', o), {});
});

test('lien joueur → acteur : jamais classé par la règle des acteurs', () => {
  const o = acteurs([], []); o.joueurs.source.set('-4294967295', '~local_player');
  assert.deepEqual(keyDetails(['OwnerNew'], j({ OwnerNew: '-4294967295' }), j({ OwnerNew: '-6' }), 'bedrock', o), {});
});

test('effets 1.20.4 (`ActiveEffects`, Id numérique) ≡ `active_effects` moderne', () => {
  const e = j({ id: 'minecraft:zombie_villager', active_effects: [{ id: 'minecraft:strength', duration: 400, show_icon: 1 }] });
  const g = j({ id: 'minecraft:zombie_villager', ActiveEffects: [{ Id: 5, Amplifier: 0, Duration: 400, Ambient: 0, ShowParticles: 1, ShowIcon: 1 }] });
  assert.deepEqual(keyDetails(['ActiveEffects', 'active_effects'], e, g, 'java').key_detail, { ActiveEffects: 'TECHNICAL', active_effects: 'TECHNICAL' });
  const g2 = j({ id: 'minecraft:zombie_villager', ActiveEffects: [{ Id: 18, Duration: 400 }] });
  assert.deepEqual(keyDetails(['ActiveEffects', 'active_effects'], e, g2, 'java'), {});
});

test('`tooltip_display.hide_tooltip` faux ≡ absent ; vrai ≠ absent', () => {
  const a = JSON.stringify({ id: 'minecraft:white_banner', components: { 'minecraft:tooltip_display': { hidden_components: ['minecraft:banner_patterns'] } } });
  const b = JSON.stringify({ id: 'minecraft:white_banner', components: { 'minecraft:tooltip_display': { hide_tooltip: 0, hidden_components: ['minecraft:banner_patterns'] } } });
  const c = JSON.stringify({ id: 'minecraft:white_banner', components: { 'minecraft:tooltip_display': { hide_tooltip: 1, hidden_components: ['minecraft:banner_patterns'] } } });
  assert.deepEqual(itemDiff(a, b), []);
  assert.deepEqual(itemDiff(a, c), ['components.minecraft:tooltip_display.hide_tooltip']);
});

test('équipement moderne ≡ HandItems/ArmorItems 1.20.4 (mêmes emplacements et objets) → MINOR ; autre objet → non classé', () => {
  const e = j({ id: 'minecraft:vindicator', equipment: { mainhand: { id: 'minecraft:iron_axe', count: 1 }, head: { id: 'minecraft:white_banner', count: 1 } } });
  const g = j({ id: 'minecraft:vindicator', equipment: { head: { id: 'minecraft:white_banner', count: 1 } }, HandItems: [{ id: 'minecraft:iron_axe', Count: 1 }, {}], ArmorItems: [{}, {}, {}, { id: 'minecraft:white_banner', Count: 1 }] });
  assert.deepEqual(keyDetails(['equipment', 'HandItems', 'ArmorItems'], e, g, 'java').key_detail, { equipment: 'MINOR', HandItems: 'MINOR', ArmorItems: 'MINOR' });
  const g2 = j({ id: 'minecraft:vindicator', HandItems: [{ id: 'minecraft:iron_sword', Count: 1 }, {}], ArmorItems: [{}, {}, {}, { id: 'minecraft:white_banner', Count: 1 }] });
  assert.deepEqual(keyDetails(['equipment', 'HandItems', 'ArmorItems'], e, g2, 'java'), {});
});

test('objet au sol : `tag.Potion` qui redit l’aux → TECHNICAL ; autre potion → non classé', () => {
  const e = j({ identifier: 'minecraft:item', Item: { Name: 'minecraft:potion', Count: 1, Damage: 22, WasPickedUp: 0, tag: { Potion: 'minecraft:strong_healing' } } });
  const g = j({ identifier: 'minecraft:item', Item: { Name: 'minecraft:potion', Count: 1, Damage: 22, WasPickedUp: 0 } });
  assert.deepEqual(keyDetails(['Item'], e, g, 'bedrock').key_detail, { Item: 'TECHNICAL' });
  const g2 = j({ identifier: 'minecraft:item', Item: { Name: 'minecraft:potion', Count: 1, Damage: 21, WasPickedUp: 0 } });
  assert.deepEqual(keyDetails(['Item'], e, g2, 'bedrock'), {});
});
