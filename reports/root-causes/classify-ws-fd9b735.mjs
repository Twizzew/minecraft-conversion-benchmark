// node reports/root-causes/classify-ws-fd9b735.mjs reports/root-causes/groups-ws-fd9b735.txt
// Input: `node tools/results/root-summary.mjs results/v1.3/worldswitch ws-fd9b735 --top 1000` (one line per group).
// A reading aid written after grading: it changes no verdict and is not part of the freeze.
// Map each root-summary group of WorldSwitch 2.8.0 FAILs to one root-cause category.
import fs from 'node:fs';
const C = {
  BUG: 'converter defect',
  RT: 'Java-only data lost on the way back (intrinsic in direct; a round trip could keep it, WorldSwitch does not)',
  INTR: 'intrinsic Java ↔ Bedrock limit',
  RECALC: 'normal game recomputation / transient state',
  SER: 'serialisation difference without effect',
  LAB: 'LAB artefact',
  SPEC: 'spec/fixture issue (reported, frozen result kept)',
  OPEN: 'undecided (needs an in-game check)',
};
const R = [
  [/J03\].*(obsidian|nether_portal)/, 'RT', 'J03: Nether portals built at y = 200, above Bedrock\'s Nether (direct: NOT_APPLICABLE `above-bedrock-nether-height`), not kept for the way back'],
  [/J04\].*command_block.*removed-despite/, [['SPEC', 26, 'J04: command blocks emptied; the station declares DIRECT/ADAPTABLE but Bedrock has no equivalent (reports/root-causes/J04-commands-ws-fd9b735.md)'], ['INTR', 3, 'J04: command blocks emptied; only a non-faithful approximation exists (falling_block ×2, swing)']]],
  [/J02\] entity\.[a-z_]+ · roundtrip · minecraft:(block_display|item_display|text_display|interaction|giant|illusioner|mannequin|spawner_minecart)/, 'RT', 'J02: Java-only entities (displays, interaction, giant, illusioner, mannequin, spawner minecart) not returned'],
  [/J03\] world\.value/, 'RT', 'J03: custom clocks + Nether/End world borders'],
  [/test_(instance_)?block/, 'RT', 'J01: test_block / test_instance_block (Java-only blocks)'],
  [/J01\] item_stack\.component:minecraft:(custom_name|lore|custom_model_data|potion_duration_scale|max_damage)/, 'RT', 'J01: Java-only item components (text style, custom_model_data, potion_duration_scale, max_damage)'],
  [/J01\] item_stack\.component:minecraft:(firework_explosion|fireworks)/, 'INTR', 'J01: firework RGB colours snapped to Bedrock\'s 16 dye colours'],
  [/(spectral_arrow|furnace_minecart)/, 'INTR', 'J01: spectral_arrow, furnace_minecart (no Bedrock item)'],
  [/tipped_arrow/, 'LAB', 'J01: tipped_arrow without a potion (the same item as arrow in Bedrock)'],
  [/player\.dimension/, 'INTR', 'J01: player standing in a custom dimension'],
  [/(\*_door|iron_door|\*_copper_door) · roundtrip · keys:(hinge|open)/, 'LAB', 'J01: door halves stored without their other half'],
  [/sculk_sensor.*keys:(power|sculk_sensor_phase)/, 'RECALC', 'J01: sculk sensors stored mid-activation'],
  [/(moving_piston|piston_head|sticky_piston|minecraft:piston )/, 'RECALC', 'J01: moving pistons / piston heads'],
  [/(big_dripleaf.*tilt|target.*power|propagule.*stage)/, 'RECALC', 'J01: dripleaf tilt, target power, propagule stage'],
  [/(lectern.*has_book|jukebox.*has_record|decorated_pot.*cracked)/, 'LAB', 'J01: lectern has_book / jukebox has_record / pot cracked contradicting the block entity'],
  [/(_button|lever) · roundtrip · keys:facing/, 'INTR', 'J01: horizontal facing of floor/ceiling buttons and levers (not stored by Bedrock)'],
  [/(mushroom_block|mushroom_stem)/, 'INTR', 'J01: mushroom-block face combinations (64 in Java, 16 in Bedrock)'],
  [/B01\].*cauldron.*fill_level/, 'INTR', 'B01: cauldron fill level (7 Bedrock levels, 3 Java levels)'],
  [/B01\].*waterlog.*wooden_door/, 'INTR', 'B01: waterlogged door (Java doors cannot be waterlogged)'],
  [/B03\].*purpur_block.*pillar_axis/, 'INTR', 'B03: pillar_axis of a purpur_block (no such state in Java)'],
  [/B03\].*SporeBlossom/, 'SER', 'B03: empty SporeBlossom block entity (Bedrock recreates it)'],
  [/B02\] item_stack\.tag.*bundle/, 'SER', 'B02: WasPickedUp:0b (the default) missing inside a bundle\'s contents'],
  [/B02\] player\.spawn_point/, 'SPEC', 'B02: SpawnX/Y/Z come back on the bed block (same respawn block: rule 20 accepts it in direct, the round-trip rule does not)'],
  [/B02\] entity\.position.*parrot/, 'OPEN', 'B02: a parrot moved by 0.34 block'],
  [/J02\] entity\.health · direct · minecraft:wither/, 'OPEN', 'J02: wither health 300 → 450 (Bedrock scale?)'],
];
const lines = fs.readFileSync(process.argv[2], 'utf8').trim().split('\n');
const by = {}, unmatched = [];
for (const l of lines) {
  const n = Number(l.split(' ')[0]); const r = R.find(([re]) => re.test(l));
  if (!r) { unmatched.push(l); continue; }
  if (Array.isArray(r[1])) { // one group split by a per-item review; the parts must add up
    if (r[1].reduce((a, x) => a + x[1], 0) !== n) throw new Error('split does not add up: ' + l);
    for (const [c, m, label] of r[1]) by[c + '|' + label] = (by[c + '|' + label] || 0) + m;
    continue;
  }
  const k = r[1] + '|' + r[2]; by[k] = (by[k] || 0) + n;
}
const tot = {}; for (const [k, n] of Object.entries(by)) { const c = k.split('|')[0]; tot[c] = (tot[c] || 0) + n; }
const md = ['| Category | FAIL | Behaviours (FAIL) |', '|---|--:|---|'];
for (const c of Object.keys(C)) if (tot[c]) md.push(`| ${C[c]} | ${tot[c]} | ${Object.entries(by).filter(([k]) => k.startsWith(c + '|')).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k.split('|')[1]} (${n})`).join(' ; ')} |`);
md.push(`| **Total** | **${Object.values(tot).reduce((a, b) => a + b, 0)}** | |`);
console.log(md.join('\n')); if (unmatched.length) console.error('UNMATCHED\n' + unmatched.join('\n'));
