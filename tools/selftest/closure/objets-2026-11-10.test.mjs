// 10/11/2026 (c32) : deux équivalences de lecture des objets, prouvées sur les sorties.
//  · faces de pot (composant d'objet `pot_decorations`) : une face absente est une brique (codec 26.3), comme
//    pour le bloc (KNOWN_DEFAULTS `java-pot-sherds`) ;
//  · ancienne pierre collective Bedrock (`stone` + `Block.states.stone_type`) = son nom actuel.
import test from 'node:test';
import assert from 'node:assert/strict';
import nbt from 'prismarine-nbt';
import { gameRead, snbt } from '../../lib/nbt.mjs';
import { normePile } from '../../families/item_stack.mjs';

test('pot : faces en brique = faces absentes ; un autre tesson reste une différence', () => {
  const f = (id) => nbt.comp({ id: nbt.string(id) });
  const R = { root: 'java-pot-sherds' };
  const quatre = snbt(nbt.comp({ back: f('minecraft:angler_pottery_sherd'), front: f('minecraft:brick'), left: f('minecraft:brick'), right: f('minecraft:brick') }));
  const deux = snbt(nbt.comp({ back: f('minecraft:angler_pottery_sherd'), front: f('minecraft:brick') }));
  const autre = snbt(nbt.comp({ back: f('minecraft:angler_pottery_sherd'), front: f('minecraft:snort_pottery_sherd') }));
  assert.equal(gameRead(quatre, R), gameRead(deux, R));
  assert.notEqual(gameRead(quatre, R), gameRead(autre, R));
});

test('pierre : stone + stone_type:andesite = andesite ; stone simple reste stone', () => {
  const ancienne = { Name: 'minecraft:stone', Count: 3, Damage: 0, Block: { name: 'minecraft:stone', states: { stone_type: 'andesite' } } };
  assert.deepEqual(normePile(ancienne), normePile({ Name: 'minecraft:andesite', Count: 3, Damage: 0 }));
  assert.notDeepEqual(normePile({ Name: 'minecraft:stone', Count: 3, Damage: 0 }), normePile({ Name: 'minecraft:andesite', Count: 3, Damage: 0 }));
});
