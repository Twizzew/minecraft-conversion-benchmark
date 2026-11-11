// J04, révision 1.13 : commandes des 400 cas déclarés jugées par la table de décisions revue à la main.
import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate } from '../../families/block_entity.mjs';

const sujet = (cas) => ({ id: 's', family: 'block_entity', declared: { case: cas }, locator: { dim: 'minecraft:overworld', pos: [0, 64, 0] },
  expected: { id: 'minecraft:command_block', command: { text: 'x', auto: false, track_output: false } }, aspects: { command: { direct: 'CMD_ADAPTABLE', roundtrip: 'EQUAL' } } });
const ctx = (texte) => ({ direct: { edition: 'bedrock', world: {}, blockEntityAt: async () => (texte === null ? null : { facts: { id: 'CommandBlock', command: { text: texte } } }) }, roundtrip: null });
const st = async (cas, texte) => { const v = (await evaluate(sujet(cas), ctx(texte))).command.direct; return v.evaluated === false ? v.reason : v.status; };

test('J04 : verdict de la table revue, sortie par sortie', async () => {
  assert.equal(await st('CMD-J-002', 'execute at @e[tag=mccb_j04_002_target,c=1] run setblock ~ ~2 ~ minecraft:emerald_block'), 'PASS');
  assert.equal(await st('CMD-J-002', 'execute at @e[tag=mccb_j04_002_target,limit=1] run setblock ~ ~2 ~ minecraft:emerald_block'), 'FAIL'); // recopie refusée par Bedrock
  // État minecraft:corner de la cible 1.26.50+ : posé sur BDS 1.26.62.1 (seul 1.26.36.1 le refusait).
  assert.equal(await st('CMD-J-128', 'setblock 1204 64 34 minecraft:oak_stairs ["weirdo_direction"=0,"upside_down_bit"=false,"minecraft:corner"="none"]'), 'PASS');
  // WorldSwitch c27 : faux joueur cité dans execute if score.
  assert.equal(await st('CMD-J-015', 'execute if score "#case" j04015 matches 1..3 run setblock 68 64 54 minecraft:lime_wool'), 'PASS');
  assert.equal(await st('CMD-J-015', 'execute if score #case j04015 matches 1..3 run setblock 68 64 54 minecraft:lime_wool'), 'FAIL');
  assert.equal(await st('CMD-J-001', ''), 'PASS'); // aucune adaptation possible (glowing) : bloc vidé, ne casse rien
  assert.equal(await st('CMD-J-051', ''), 'FAIL'); // adaptation possible : bloc vidé = erreur
  assert.equal(await st('CMD-J-002', null), 'FAIL'); // bloc de commande perdu
  assert.equal(await st('CMD-J-002', 'say inconnu'), 'j04-output-not-reviewed'); // jamais deviné
});
