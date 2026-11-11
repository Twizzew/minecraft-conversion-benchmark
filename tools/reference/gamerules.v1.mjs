// MCCB gamerule equivalences, version 1 (hand-written; see identity-rules.v1.mjs for the
// policy). Java 26.3 rule name (without "minecraft:") -> Bedrock level.dat field.
// Only pairs with the SAME meaning and the SAME unit are listed. Anything else is
// either edition-only (NOT_APPLICABLE) or unmapped (NOT_EVALUATED) — never guessed.
export const GAMERULE_J2B = {
  advance_time: 'dodaylightcycle',
  advance_weather: 'doweathercycle',
  block_drops: 'dotiledrops',
  command_block_output: 'commandblockoutput',
  command_blocks_work: 'commandblocksenabled',
  drowning_damage: 'drowningdamage',
  entity_drops: 'doentitydrops',
  fall_damage: 'falldamage',
  fire_damage: 'firedamage',
  freeze_damage: 'freezedamage',
  immediate_respawn: 'doimmediaterespawn',
  keep_inventory: 'keepinventory',
  limited_crafting: 'dolimitedcrafting',
  mob_drops: 'domobloot',
  mob_griefing: 'mobgriefing',
  natural_health_regeneration: 'naturalregeneration',
  players_sleeping_percentage: 'playerssleepingpercentage',
  projectiles_can_break_blocks: 'projectilescanbreakblocks',
  pvp: 'pvp',
  respawn_radius: 'spawnradius',
  send_command_feedback: 'sendcommandfeedback',
  show_death_messages: 'showdeathmessages',
  spawn_mobs: 'domobspawning',
  spawn_phantoms: 'doinsomnia',
  tnt_explodes: 'tntexplodes',
  tnt_explosion_drop_decay: 'tntexplosiondropdecay',
};
// Same concept, different unit or scale: not comparable by value.
export const GAMERULE_DIFFERENT_UNIT = {
  random_tick_speed: 'randomtickspeed (Java default 3 per section, Bedrock default 1: different scale)',
  max_command_sequence_length: 'maxcommandchainlength (limits counted differently)',
  fire_spread_radius_around_player: 'dofiretick (a radius in Java 26.x, a boolean in Bedrock)',
};
// Java rules with no Bedrock counterpart.
export const GAMERULE_JAVA_ONLY = [
  'show_advancement_messages', 'spawn_wandering_traders', 'spawn_patrols', 'spawn_wardens', 'spawn_monsters', 'reduced_debug_info',
  'spawner_blocks_work', 'player_movement_check', 'elytra_movement_check', 'spread_vines', 'block_explosion_drop_decay',
  'mob_explosion_drop_decay', 'max_entity_cramming', 'forgive_dead_players', 'universal_anger', 'global_sound_events',
  'players_nether_portal_default_delay', 'players_nether_portal_creative_delay', 'log_admin_commands', 'spectators_generate_chunks',
  'max_block_modifications', 'max_command_forks', 'max_snow_accumulation_height', 'lava_source_conversion', 'water_source_conversion',
  'raids', 'allow_entering_nether_using_portals', 'ender_pearls_vanish_on_death',
];
// Bedrock level.dat fields that are gamerules (read from the world) with no Java counterpart.
export const GAMERULE_BEDROCK_ONLY = ['showcoordinates', 'showdaysplayed', 'recipesunlock', 'respawnblocksexplode', 'showtags', 'showbordereffect', 'functioncommandlimit', 'showrecipemessages'];
// Every Bedrock gamerule field MCCB reads from level.dat.
export const BEDROCK_GAMERULE_FIELDS = [...new Set([...Object.values(GAMERULE_J2B), 'randomtickspeed', 'maxcommandchainlength', 'dofiretick', 'playerwaypoints', ...GAMERULE_BEDROCK_ONLY])];
export const GAMERULE_B2J = Object.fromEntries(Object.entries(GAMERULE_J2B).map(([j, b]) => [b, j]));
