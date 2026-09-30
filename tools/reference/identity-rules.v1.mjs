// MCCB identity-equivalence rules, version 1.
//
// WHAT THIS IS. The list of Java <-> Bedrock identifier pairs that name the SAME
// block / item / entity, used only for DIRECT identity checks ("is it still the same
// thing in the other edition?"). States, variants and components are NOT covered.
//
// HOW IT WAS WRITTEN. By hand, from the two official registries (Java: Mojang's
// data-generator report of 26.3; Bedrock: Mojang's @minecraft/vanilla-data 1.26.40).
// An identifier present in both registries is presumed equivalent unless listed in
// FALSE_FRIENDS. Every other pair below is a rename that anyone can check in game.
// No converter's source code or mapping table was consulted.
//
// WHAT IT IS NOT. Complete. An identifier with no rule and no same-name counterpart
// is UNKNOWN, and every direct identity assertion on it is reported NOT_EVALUATED —
// never PASS, never FAIL. Challenge any entry by opening an issue; a change creates a
// new rules version, never an edit of this one after results are published.

// ── blocks: Java -> Bedrock ─────────────────────────────────────────────────
export const BLOCK_J2B_OVERRIDES = {
  // false friends (same identifier, different block)
  'minecraft:snow': ['minecraft:snow_layer'],
  'minecraft:snow_block': ['minecraft:snow'],
  'minecraft:stone_stairs': ['minecraft:normal_stone_stairs'],
  'minecraft:cobblestone_stairs': ['minecraft:stone_stairs'],
  'minecraft:stone_slab': ['minecraft:normal_stone_slab', 'minecraft:normal_stone_double_slab'],
  // plain renames
  'minecraft:cave_air': ['minecraft:air'],
  'minecraft:void_air': ['minecraft:air'],
  'minecraft:note_block': ['minecraft:noteblock'],
  'minecraft:cobweb': ['minecraft:web'],
  'minecraft:magma_block': ['minecraft:magma'],
  'minecraft:slime_block': ['minecraft:slime'],
  'minecraft:spawner': ['minecraft:mob_spawner'],
  'minecraft:stonecutter': ['minecraft:stonecutter_block'],
  'minecraft:tripwire': ['minecraft:trip_wire'],
  'minecraft:nether_portal': ['minecraft:portal'],
  'minecraft:powered_rail': ['minecraft:golden_rail'],
  'minecraft:rooted_dirt': ['minecraft:dirt_with_roots'],
  'minecraft:dirt_path': ['minecraft:grass_path'],
  'minecraft:frogspawn': ['minecraft:frog_spawn'],
  'minecraft:jack_o_lantern': ['minecraft:lit_pumpkin'],
  'minecraft:melon': ['minecraft:melon_block'],
  'minecraft:nether_quartz_ore': ['minecraft:quartz_ore'],
  'minecraft:terracotta': ['minecraft:hardened_clay'],
  'minecraft:light_gray_glazed_terracotta': ['minecraft:silver_glazed_terracotta'],
  'minecraft:end_stone_bricks': ['minecraft:end_bricks'],
  'minecraft:end_stone_brick_stairs': ['minecraft:end_brick_stairs'],
  'minecraft:nether_bricks': ['minecraft:nether_brick'],
  'minecraft:red_nether_bricks': ['minecraft:red_nether_brick'],
  'minecraft:bricks': ['minecraft:brick_block'],
  'minecraft:prismarine_brick_stairs': ['minecraft:prismarine_bricks_stairs'],
  'minecraft:flowering_azalea_leaves': ['minecraft:azalea_leaves_flowered'],
  'minecraft:shulker_box': ['minecraft:undyed_shulker_box'],
  'minecraft:waxed_copper_block': ['minecraft:waxed_copper'],
  'minecraft:oak_door': ['minecraft:wooden_door'],
  'minecraft:oak_button': ['minecraft:wooden_button'],
  'minecraft:oak_pressure_plate': ['minecraft:wooden_pressure_plate'],
  'minecraft:oak_fence_gate': ['minecraft:fence_gate'],
  'minecraft:oak_trapdoor': ['minecraft:trapdoor'],
  'minecraft:oak_sign': ['minecraft:standing_sign'],
  'minecraft:oak_wall_sign': ['minecraft:wall_sign'],
  'minecraft:dark_oak_sign': ['minecraft:darkoak_standing_sign'],
  'minecraft:dark_oak_wall_sign': ['minecraft:darkoak_wall_sign'],
  'minecraft:dead_bush': ['minecraft:deadbush'],
  'minecraft:lily_pad': ['minecraft:waterlily'],
  'minecraft:sugar_cane': ['minecraft:reeds'],
  'minecraft:tall_seagrass': ['minecraft:seagrass'],
  'minecraft:kelp_plant': ['minecraft:kelp'],
  'minecraft:twisting_vines_plant': ['minecraft:twisting_vines'],
  'minecraft:weeping_vines_plant': ['minecraft:weeping_vines'],
  'minecraft:big_dripleaf_stem': ['minecraft:big_dripleaf'],
  'minecraft:small_dripleaf': ['minecraft:small_dripleaf_block'],
  'minecraft:attached_melon_stem': ['minecraft:melon_stem'],
  'minecraft:attached_pumpkin_stem': ['minecraft:pumpkin_stem'],
  'minecraft:beetroots': ['minecraft:beetroot'],
  'minecraft:cave_vines': ['minecraft:cave_vines', 'minecraft:cave_vines_head_with_berries'],
  'minecraft:cave_vines_plant': ['minecraft:cave_vines', 'minecraft:cave_vines_body_with_berries'],
  'minecraft:water_cauldron': ['minecraft:cauldron'],
  'minecraft:lava_cauldron': ['minecraft:cauldron'],
  'minecraft:powder_snow_cauldron': ['minecraft:cauldron'],
  'minecraft:moving_piston': ['minecraft:moving_block'],
  'minecraft:piston_head': ['minecraft:piston_arm_collision', 'minecraft:sticky_piston_arm_collision'],
  'minecraft:light': Array.from({ length: 16 }, (_, i) => `minecraft:light_block_${i}`),
  'minecraft:wall_torch': ['minecraft:torch'],
  'minecraft:soul_wall_torch': ['minecraft:soul_torch'],
  'minecraft:copper_wall_torch': ['minecraft:copper_torch'],
  'minecraft:redstone_wall_torch': ['minecraft:redstone_torch', 'minecraft:unlit_redstone_torch'],
  // one Java block, several Bedrock identifiers that encode one of its states
  'minecraft:redstone_torch': ['minecraft:redstone_torch', 'minecraft:unlit_redstone_torch'],
  'minecraft:comparator': ['minecraft:unpowered_comparator', 'minecraft:powered_comparator'],
  'minecraft:repeater': ['minecraft:unpowered_repeater', 'minecraft:powered_repeater'],
  'minecraft:furnace': ['minecraft:furnace', 'minecraft:lit_furnace'],
  'minecraft:blast_furnace': ['minecraft:blast_furnace', 'minecraft:lit_blast_furnace'],
  'minecraft:smoker': ['minecraft:smoker', 'minecraft:lit_smoker'],
  'minecraft:redstone_lamp': ['minecraft:redstone_lamp', 'minecraft:lit_redstone_lamp'],
  'minecraft:redstone_ore': ['minecraft:redstone_ore', 'minecraft:lit_redstone_ore'],
  'minecraft:deepslate_redstone_ore': ['minecraft:deepslate_redstone_ore', 'minecraft:lit_deepslate_redstone_ore'],
  'minecraft:daylight_detector': ['minecraft:daylight_detector', 'minecraft:daylight_detector_inverted'],
  'minecraft:water': ['minecraft:water', 'minecraft:flowing_water'],
  'minecraft:lava': ['minecraft:lava', 'minecraft:flowing_lava'],
};

// Pattern rules, applied in order after the overrides ($1 = first capture group).
export const BLOCK_J2B_PATTERNS = [
  { re: '^minecraft:(\\w+)_wall_banner$', to: ['minecraft:wall_banner'], why: 'banner colour lives in the block entity' },
  { re: '^minecraft:(\\w+)_banner$', to: ['minecraft:standing_banner'], why: 'banner colour lives in the block entity' },
  { re: '^minecraft:(\\w+)_bed$', to: ['minecraft:bed'], why: 'bed colour lives in the block entity' },
  { re: '^minecraft:potted_(\\w+)$', to: ['minecraft:flower_pot'], why: 'the potted plant lives in the block entity' },
  { re: '^minecraft:(\\w+)_wall_hanging_sign$', to: ['minecraft:$1_hanging_sign'], why: 'wall attachment is a state' },
  { re: '^minecraft:(\\w+)_wall_sign$', to: ['minecraft:$1_wall_sign'], why: 'same name' },
  { re: '^minecraft:(\\w+)_sign$', to: ['minecraft:$1_standing_sign'], why: 'Bedrock names the floor sign "standing"' },
  { re: '^minecraft:(\\w+)_wall_(head|skull)$', to: ['minecraft:$1_$2'], why: 'wall placement is a state' },
];

// Targets ADDED to a Java block's equivalents when they exist in Bedrock: a Java slab
// with type=double is a separate 'double slab' block in Bedrock.
export const BLOCK_J2B_AUGMENT = [
  { re: '^minecraft:(waxed_|exposed_|weathered_|oxidized_|waxed_exposed_|waxed_weathered_|waxed_oxidized_)?cut_copper_slab$', add: ['minecraft:$1double_cut_copper_slab'] },
  { re: '^minecraft:(\\w+)_slab$', add: ['minecraft:$1_double_slab'] },
];

// Java blocks with no Bedrock counterpart in the benchmark's Bedrock version (1.26.40).
export const BLOCK_JAVA_ONLY = [
  '^minecraft:test_block$', '^minecraft:test_instance_block$',
  '^minecraft:(\\w+)_concrete_slab$', '^minecraft:(\\w+)_concrete_stairs$',
];

// Bedrock blocks with no Java counterpart (Education Edition content, editor/world tools).
export const BLOCK_BEDROCK_ONLY = [
  '^minecraft:element_\\d+$', '^minecraft:element_constructor$', '^minecraft:hard_\\w+$',
  '^minecraft:(allow|deny|border_block|camera|chemical_heat|compound_creator|lab_table|material_reducer)$',
  '^minecraft:colored_torch_\\w+$', '^minecraft:underwater_(tnt|torch)$', '^minecraft:unknown$',
];

// Bedrock "double slab" blocks are one Java slab with type=double.
export const BLOCK_B2J_PATTERNS = [
  { re: '^minecraft:(waxed_|exposed_|weathered_|oxidized_|waxed_exposed_|waxed_weathered_|waxed_oxidized_)?double_cut_copper_slab$', to: ['minecraft:$1cut_copper_slab'], why: 'double slab = slab[type=double]' },
  { re: '^minecraft:normal_stone_double_slab$', to: ['minecraft:stone_slab'], why: 'double slab = slab[type=double]' },
  { re: '^minecraft:(\\w+)_double_slab$', to: ['minecraft:$1_slab'], why: 'double slab = slab[type=double]' },
];

// Bedrock blocks that are ENTITIES in Java: identity is checked by the entity family.
export const BLOCK_B2J_CROSS_FAMILY = { 'minecraft:frame': 'entity:minecraft:item_frame', 'minecraft:glow_frame': 'entity:minecraft:glow_item_frame' };

// Identifiers that exist in Bedrock saves although @minecraft/vanilla-data does not
// list them (not placeable / not summonable through the scripting API).
export const BEDROCK_EXISTS_UNLISTED = {
  block: ['minecraft:end_gateway', 'minecraft:end_portal', 'minecraft:moving_block', 'minecraft:frame', 'minecraft:glow_frame'],
  entity: ['minecraft:item', 'minecraft:falling_block', 'minecraft:painting', 'minecraft:leash_knot', 'minecraft:evocation_fang',
    'minecraft:shulker_bullet', 'minecraft:dragon_fireball', 'minecraft:small_fireball', 'minecraft:fireball', 'minecraft:wither_skull',
    'minecraft:llama_spit', 'minecraft:ender_pearl', 'minecraft:splash_potion', 'minecraft:lingering_potion', 'minecraft:arrow',
    'minecraft:area_effect_cloud', 'minecraft:lightning_bolt', 'minecraft:ominous_item_spawner', 'minecraft:snowball', 'minecraft:egg'],
  item: ['minecraft:written_book', 'minecraft:filled_map'],
};

// ── entities ────────────────────────────────────────────────────────────────
export const ENTITY_J2B_OVERRIDES = {
  'minecraft:end_crystal': ['minecraft:ender_crystal'],
  'minecraft:evoker': ['minecraft:evocation_illager'],
  'minecraft:evoker_fangs': ['minecraft:evocation_fang'],
  'minecraft:experience_orb': ['minecraft:xp_orb'],
  'minecraft:experience_bottle': ['minecraft:xp_bottle'],
  'minecraft:eye_of_ender': ['minecraft:eye_of_ender_signal'],
  'minecraft:firework_rocket': ['minecraft:fireworks_rocket'],
  'minecraft:fishing_bobber': ['minecraft:fishing_hook'],
  'minecraft:trident': ['minecraft:thrown_trident'],
  'minecraft:tropical_fish': ['minecraft:tropicalfish'],
  'minecraft:villager': ['minecraft:villager_v2'],
  'minecraft:zombie_villager': ['minecraft:zombie_villager_v2'],
  'minecraft:zombified_piglin': ['minecraft:zombie_pigman'],
  'minecraft:wind_charge': ['minecraft:wind_charge_projectile'],
  'minecraft:breeze_wind_charge': ['minecraft:breeze_wind_charge_projectile'],
  'minecraft:item': ['minecraft:item'],
  'minecraft:falling_block': ['minecraft:falling_block'],
  'minecraft:painting': ['minecraft:painting'],
  'minecraft:leash_knot': ['minecraft:leash_knot'],
};
export const ENTITY_J2B_PATTERNS = [
  { re: '^minecraft:(\\w+)_chest_(boat|raft)$', to: ['minecraft:chest_boat'], why: 'Bedrock stores the wood type as a variant' },
  { re: '^minecraft:(\\w+)_(boat|raft)$', to: ['minecraft:boat'], why: 'Bedrock stores the wood type as a variant' },
];
// Java entities that are BLOCKS in Bedrock: identity is checked by the block family.
export const ENTITY_J2B_CROSS_FAMILY = { 'minecraft:item_frame': 'block:minecraft:frame', 'minecraft:glow_item_frame': 'block:minecraft:glow_frame' };
export const ENTITY_JAVA_ONLY = [
  '^minecraft:(giant|illusioner|marker|interaction|block_display|item_display|text_display|mannequin|spawner_minecart|furnace_minecart|spectral_arrow)$',
];
export const ENTITY_BEDROCK_ONLY = ['^minecraft:(agent|npc|tripod_camera)$'];
export const ENTITY_B2J_OVERRIDES = {
  'minecraft:villager': ['minecraft:villager'],
  'minecraft:zombie_villager': ['minecraft:zombie_villager'],
  'minecraft:wither_skull_dangerous': ['minecraft:wither_skull'],
};

// ── items ───────────────────────────────────────────────────────────────────
export const ITEM_J2B_OVERRIDES = {
  'minecraft:snow_block': ['minecraft:snow'],
  'minecraft:snow': ['minecraft:snow_layer'],
  'minecraft:stone_stairs': ['minecraft:normal_stone_stairs'],
  'minecraft:cobblestone_stairs': ['minecraft:stone_stairs'],
  'minecraft:stone_slab': ['minecraft:normal_stone_slab'],
  'minecraft:cobweb': ['minecraft:web'],
  'minecraft:dead_bush': ['minecraft:deadbush'],
  'minecraft:dirt_path': ['minecraft:grass_path'],
  'minecraft:end_stone_bricks': ['minecraft:end_bricks'],
  'minecraft:end_stone_brick_stairs': ['minecraft:end_brick_stairs'],
  'minecraft:flowering_azalea_leaves': ['minecraft:azalea_leaves_flowered'],
  'minecraft:frogspawn': ['minecraft:frog_spawn'],
  'minecraft:jack_o_lantern': ['minecraft:lit_pumpkin'],
  'minecraft:light_gray_glazed_terracotta': ['minecraft:silver_glazed_terracotta'],
  'minecraft:lily_pad': ['minecraft:waterlily'],
  'minecraft:magma_block': ['minecraft:magma'],
  'minecraft:melon': ['minecraft:melon_block'],
  // false friend: Java "nether_brick" is the ingredient, Bedrock "nether_brick" is the block
  'minecraft:nether_brick': ['minecraft:netherbrick'],
  'minecraft:nether_bricks': ['minecraft:nether_brick'],
  'minecraft:nether_quartz_ore': ['minecraft:quartz_ore'],
  'minecraft:note_block': ['minecraft:noteblock'],
  'minecraft:oak_button': ['minecraft:wooden_button'],
  'minecraft:oak_door': ['minecraft:wooden_door'],
  'minecraft:oak_fence_gate': ['minecraft:fence_gate'],
  'minecraft:oak_pressure_plate': ['minecraft:wooden_pressure_plate'],
  'minecraft:oak_trapdoor': ['minecraft:trapdoor'],
  'minecraft:powered_rail': ['minecraft:golden_rail'],
  'minecraft:prismarine_brick_stairs': ['minecraft:prismarine_bricks_stairs'],
  'minecraft:red_nether_bricks': ['minecraft:red_nether_brick'],
  'minecraft:rooted_dirt': ['minecraft:dirt_with_roots'],
  'minecraft:shulker_box': ['minecraft:undyed_shulker_box'],
  'minecraft:slime_block': ['minecraft:slime'],
  'minecraft:small_dripleaf': ['minecraft:small_dripleaf_block'],
  'minecraft:spawner': ['minecraft:mob_spawner'],
  'minecraft:stonecutter': ['minecraft:stonecutter_block'],
  'minecraft:terracotta': ['minecraft:hardened_clay'],
  'minecraft:waxed_copper_block': ['minecraft:waxed_copper'],
  'minecraft:bricks': ['minecraft:brick_block'],
  'minecraft:item_frame': ['minecraft:frame'],
  'minecraft:glow_item_frame': ['minecraft:glow_frame'],
  'minecraft:zombified_piglin_spawn_egg': ['minecraft:zombie_pigman_spawn_egg'],
  'minecraft:light': Array.from({ length: 16 }, (_, i) => `minecraft:light_block_${i}`),
  'minecraft:written_book': ['minecraft:written_book'],
  'minecraft:map': ['minecraft:empty_map'],
  'minecraft:tipped_arrow': ['minecraft:arrow'],
};
export const ITEM_J2B_PATTERNS = [
  { re: '^minecraft:(\\w+)_bed$', to: ['minecraft:bed'], why: 'bed colour is item data in Bedrock' },
  { re: '^minecraft:(\\w+)_banner$', to: ['minecraft:banner'], why: 'banner colour is item data in Bedrock' },
  { re: '^minecraft:(\\w+)_map$', to: ['minecraft:filled_map'], why: 'explorer maps are filled maps with data in Bedrock' },
];
export const ITEM_B2J_PATTERNS = [
  { re: '^minecraft:(\\w+)_double_slab$', to: ['minecraft:$1_slab'], why: 'a double slab is one Java slab item' },
];
export const ITEM_JAVA_ONLY = [
  '^minecraft:(air|debug_stick|knowledge_book|furnace_minecart|spectral_arrow|test_block|test_instance_block)$',
  '^minecraft:(\\w+)_concrete_slab$', '^minecraft:(\\w+)_concrete_stairs$',
];
export const ITEM_BEDROCK_ONLY = [
  '^minecraft:(allow|deny|border_block|frosted_ice)$', '^minecraft:lodestone_compass$',
];
