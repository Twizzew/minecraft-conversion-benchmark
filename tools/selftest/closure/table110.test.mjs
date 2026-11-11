// Table 1.10 (MCCB 2026-11, étape 3 UMT) : pile Bedrock au nom actuel dont le `Block` porte un état disparu.
import test from 'node:test';
import assert from 'node:assert/strict';
import { bedrockItem } from '../../lib/facts.mjs';
import { isLegacyBedrockBlockEntry } from '../../families/item_stack.mjs';

const pile = (name, block) => ({ type: 'compound', value: {
  Name: { type: 'string', value: name }, Count: { type: 'byte', value: 6 }, Damage: { type: 'short', value: 0 },
  ...(block ? { Block: { type: 'compound', value: { name: { type: 'string', value: block.name },
    states: { type: 'compound', value: Object.fromEntries(Object.entries(block.states).map(([k, v]) => [k, { type: 'string', value: v }])) } } } } : {}),
} });

test('stone + Block{stone_type: granite} (R01) → ancienne écriture, non jugée ; stone sans état → jugée', () => {
  const ancien = bedrockItem(pile('minecraft:stone', { name: 'minecraft:stone', states: { stone_type: 'granite' } }));
  assert.equal(isLegacyBedrockBlockEntry(ancien.blockEntry), true);
  const actuel = bedrockItem(pile('minecraft:stone', { name: 'minecraft:stone', states: {} }));
  assert.equal(isLegacyBedrockBlockEntry(actuel.blockEntry), false);
  assert.equal(isLegacyBedrockBlockEntry(bedrockItem(pile('minecraft:coal')).blockEntry), false);
});

test('le Block reste invisible des comparaisons (champ non énumérable)', () => {
  const f = bedrockItem(pile('minecraft:stone', { name: 'minecraft:stone', states: { stone_type: 'granite' } }));
  assert.equal(Object.keys(f).includes('blockEntry'), false);
  assert.equal(JSON.stringify(f).includes('blockEntry'), false);
});
