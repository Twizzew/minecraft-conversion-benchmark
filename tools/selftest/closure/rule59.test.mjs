// Règle 59 (MCCB 2026-11) : états temporaires et détails jugés À L'ALLER (lib/cross-data.mjs).
import test from 'node:test';
import assert from 'node:assert/strict';
import { crossData } from '../../lib/cross-data.mjs';

const facts = (o) => ({ data: Object.fromEntries(Object.keys(o).map((k) => [k, 'x'])), sem: Object.fromEntries(Object.entries(o).map(([k, v]) => [k, JSON.stringify(v)])) });

test('rule 59: furnace timers Java → Bedrock, equal PASS, one changed PARTIAL', () => {
  const src = facts({ lit_time_remaining: 620, cooking_time_spent: 100, lit_total_time: 1600, cooking_total_time: 200 });
  const ok = crossData('block_entity', 'java', src, facts({ BurnTime: 620, CookTime: 100, BurnDuration: 1600 }), ['minecraft:furnace']);
  assert.equal(ok.status, 'PASS');
  assert.deepEqual(ok.evidence.not_compared, ['cooking_total_time']);
  const bad = crossData('block_entity', 'java', src, facts({ BurnTime: 620, CookTime: 0, BurnDuration: 1600 }), ['minecraft:furnace']);
  assert.equal(bad.status, 'PARTIAL');
  assert.deepEqual(bad.evidence.differing_keys, ['cooking_time_spent']);
});

test('rule 59: the same rule reads both directions (Bedrock source)', () => {
  const v = crossData('block_entity', 'bedrock', facts({ ItemTime1: 100, ItemTime2: 260 }), facts({ CookingTimes: [100, 0, 0, 0] }), ['Campfire']);
  assert.equal(v.status, 'PARTIAL');
});

test('rule 59: zombie cure, captain banner, motion', () => {
  const zv = crossData('entity', 'java', facts({ ConversionTime: 400 }), facts({ definitions: ['+minecraft:zombie_villager_v2'] }), ['minecraft:zombie_villager']);
  assert.deepEqual(zv.evidence.differing_keys, ['ConversionTime']);
  const cap = crossData('entity', 'java', facts({ PatrolLeader: 1, equipment: { head: { id: 'minecraft:white_banner' } } }),
    facts({ IsIllagerCaptain: 1, Armor: [{ Name: 'minecraft:banner' }, {}, {}, {}, {}] }), ['minecraft:vindicator']);
  assert.deepEqual(cap.evidence.differing_keys, ['equipment']);
  const mv = crossData('entity', 'java', facts({}), facts({}), ['minecraft:minecart'], { source: [0.2, 0, 0], target: [0.20000000298, 0, 0] });
  assert.equal(mv.status, 'PASS');
});

test('rule 59: no rule → null (left NOT_EVALUATED by the family)', () => {
  assert.equal(crossData('block_entity', 'java', facts({ Text: 'x' }), facts({}), ['minecraft:sign']), null);
});
