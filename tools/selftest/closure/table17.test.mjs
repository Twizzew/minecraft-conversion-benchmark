// Table 1.7 (MCCB 2026-11, c19) : règles de classement ajoutées après le tri de R01 c19 et J02 c19.
import test from 'node:test';
import assert from 'node:assert/strict';
import { keyDetails } from '../../lib/key-detail.mjs';

const j = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, JSON.stringify(v)]));

test('valeur par défaut écrite d’un seul côté → TECHNICAL', () => {
  const r = keyDetails(['Tame', 'ConversionTime', 'anger_end_time'], j({ id: 'minecraft:zombie_villager', ConversionTime: -1, anger_end_time: -1 }), j({ id: 'minecraft:zombie_villager', Tame: 0 }), 'java');
  assert.deepEqual(r.key_detail, { Tame: 'TECHNICAL', ConversionTime: 'TECHNICAL', anger_end_time: 'TECHNICAL' });
  assert.deepEqual(keyDetails(['Tame'], j({}), j({ Tame: 1 }), 'java'), {});
});

test('lien Bedrock −1 ≡ absent', () => {
  assert.deepEqual(keyDetails(['OwnerNew'], j({ OwnerNew: '-1' }), j({}), 'bedrock').key_detail, { OwnerNew: 'TECHNICAL' });
});

test('Variant du villageois zombie imposé par le groupe de métier', () => {
  const e = j({ identifier: 'minecraft:zombie_villager_v2', Variant: 0, definitions: ['+minecraft:zombie_villager_v2', '+adult', '+fisherman'] });
  assert.deepEqual(keyDetails(['Variant'], e, j({ identifier: 'minecraft:zombie_villager_v2', Variant: 2, definitions: ['+minecraft:zombie_villager_v2', '+adult', '+fisherman'] }), 'bedrock').key_detail, { Variant: 'TECHNICAL' });
  assert.deepEqual(keyDetails(['Variant'], e, j({ identifier: 'minecraft:zombie_villager_v2', Variant: 1, definitions: ['+minecraft:zombie_villager_v2', '+adult', '+fisherman'] }), 'bedrock'), {});
});

test('Variant inerte du cochon / bogged', () => {
  assert.deepEqual(keyDetails(['Variant'], j({ identifier: 'minecraft:pig', Variant: 0 }), j({ identifier: 'minecraft:pig', Variant: 1 }), 'bedrock').key_detail, { Variant: 'TECHNICAL' });
});

test('squelette : groupe d’attaque réglé par capteur → MINOR ; pillard non', () => {
  const s = (id, d) => j({ identifier: id, definitions: d });
  assert.deepEqual(keyDetails(['definitions'], s('minecraft:skeleton', ['+minecraft:skeleton', '+minecraft:melee_attack']), s('minecraft:skeleton', ['+minecraft:skeleton', '+minecraft:ranged_attack']), 'bedrock').key_detail, { definitions: 'MINOR' });
  assert.deepEqual(keyDetails(['definitions'], s('minecraft:pillager', ['+minecraft:pillager', '+minecraft:ranged_attack']), s('minecraft:pillager', ['+minecraft:pillager']), 'bedrock'), {});
});

test('bateau 1.20.4 (chest_boat + Type) ≡ id par essence', () => {
  assert.deepEqual(keyDetails(['id', 'Type'], j({ id: 'minecraft:dark_oak_chest_boat' }), j({ id: 'minecraft:chest_boat', Type: 'dark_oak' }), 'java').key_detail, { id: 'TECHNICAL', Type: 'TECHNICAL' });
});
