# Known limitations

MCCB does not cover "all of Minecraft". This file lists what is known to be missing,
weak or debatable — in the benchmark, in the editions, and in the converters — so that
no result is read as more than it is.

## 1. Limitations of the benchmark itself

### 1.1 Source worlds

- **B01@1.0 contains a fraction of its declared cases.** Its generator pack (R8) declares
  702 cases, but only 6 of its 18 generator functions have their blocks in the published
  world (palette, recent blocks, shelves, stair corners, trial spawner / vault states and
  others are absent — their chunks do not exist). MCCB v1.1 evaluates what B01 contains
  (238 blocks, 60 block entities, 46 stacks, 11 entities…), not what it declares. A
  complete B01 needs a new build in Bedrock 1.26.45 and a new revision (B01@1.1).
- **B03@1.0**: the Nether content laboratory (29 blocks) holds lava or air at every
  position, and 2 chunk-boundary markers are in chunks that do not exist.
- **J01@1.1** contains barrels populated by an external NBT edit (R10 patch, declared in
  its own QA report) that was never verified in game (no R10 verification score in the
  world). Its datapack keeps the R9 file name with R10 content. Its level data is 26.3
  while chunks not loaded in 26.3 stay 26.2 (normal Minecraft behaviour).
- **Declared coverage figures** of the generator packs (702 / 96 cases, 1 537 items…) are
  declarations. MCCB counts subjects from the worlds; `reports/source-validation/` lists
  every declared case that is absent.
- **B01 and B03 `SOURCE_MASTER_RECORD.md` are empty templates**: no in-game observation
  was recorded when they were frozen.
- **Personal identifiers already public since v1.0**: the author's Minecraft account UUID
  (`c7361fde-4983-4733-b2dc-3be58cc7762b`) in every Java world, the name `TWIZZEW` in J03's
  scoreboard, and a second player record in B02. They belong to the publisher's own test
  accounts.
- **No REAL_WORLD_SURVIVAL world is published.** The candidate (GURREN) is a private
  multiplayer Realm world (92 player identity records, Realms data, third-party resource
  packs). It is measured privately; a result nobody else can check is not evidence, so
  none of its numbers are published. A sanitised derivative (identity records, Realms
  data and packs removed; player-written texts reviewed by a human) would be a new world
  with its own hash, measured from scratch.

### 1.2 Oracles

- **Direct block states, variants, colours, enchantment and potion ids, sign colours,
  banner patterns and command translations are NOT_EVALUATED**: v1.1 bundles no neutral
  cross-edition reference for them. They are fully evaluated in round trip. A neutral
  reference (for instance the GeyserMC mappings, MIT) is the main candidate for v1.2 —
  a decision for the maintainers, not taken in v1.1.
- **Behaviour is almost not measured.** v1.1 checks only that the reference Java game
  accepts to open Java worlds. No command is run, no mob is observed, no Bedrock client
  or server loads the outputs.
- **Bedrock default block states come from Mojang's data-value table (v1.2, rule 43).**
  A state key omitted by a converter takes the state of data value 0; keys that table
  does not document (e.g. `hanging` of suspicious sand/gravel) stay NOT_EVALUATED.
- **Java reading depends on Mojang's code of Java 26.3.** Java data is normalised by
  Mojang's upgrader; an upgrader limitation (for example entity types unknown to an
  older schema) is reproduced, on purpose — it is what the player gets — but it means
  results are tied to the reference version.
- **Block entities are loaded by the game's code; entities are not.** Every Java block
  entity is loaded and saved back by Mojang's block-entity code (fixture-rules §1), so
  "absent" and "explicit default" compare equal and what the game would drop is dropped.
  Entities cannot be loaded without a running level: they are compared as upgraded, and
  `entity.data` (round trip) compared keys written as an explicit default (`Age:0`) on one
  side and absent on the other as a difference until v1.1; since v1.2 (rule 46) a key whose
  value is 0, `""`, `false` or empty reads like an absent key, as the game's loaders read
  it. A NON-zero default written by one side only (an attribute base equal to the entity's
  default, `max_health:10`) is still reported: MCCB has no per-entity default table.
  Unknown keys a Bedrock or Java game would drop at its next save are also still counted.
- **Some J01 states are ones the game does not keep in normal play.** The J01 state
  matrix places every state of a block in isolation: 672 of WorldSwitch's 1 602 J01
  round-trip `block.state` FAIL are door halves whose other half is absent from the
  source (measured: 672 of 672), and 470 are sculk sensors stored in an activation state
  (`power`, `sculk_sensor_phase`) that normal play produces only briefly after a
  vibration. They are what the world stores, so they are subjects, and their results are
  reported as measured.
- **Identity reference and gamerule table are hand-written** (from the official
  registries). Every entry can be checked in game; errors are possible and are
  challengeable through issues. Unknown identifiers are never judged.
- **Tolerances** (entity position, health) are conventions stated in fixture-rules §3.4.
- **Entity matching** is by UUID (round trip), then custom name, then nearest entity of
  an equivalent type; crowds of identical unnamed mobs could be matched pairwise
  differently than intended (positions are still compared).
- **Counts are per assertion; assertions are not independent.**
- **Structures (v1.3) are judged from stored data, not from spawns.** The family
  `structure` applies each edition's documented rule to what the world stores (Java
  `References`/`starts`, Bedrock keys 0x39/0x77); no mob is spawned. For Java structures of
  which no native Bedrock world of the corpus stores data (villages, fossils, strongholds…)
  the direct conversion is NOT_EVALUATED. Bedrock 0x77 records holding more than two
  structures have never been observed and would be reported unreadable. The Bedrock
  "enclosing box" of a 0x77 record is recognised geometrically: two instances of the same
  structure in touching chunks would be merged, which can only make the check more lenient.
- **Chunks whose generation was not finished (v1.3, rule 52)**: only the ones that hold no
  block are judged (written as finished = a permanent hole). Those that already hold
  terrain stay NOT_EVALUATED, as in rule 38.
- **Rules were refined while looking at WorldSwitch outputs** (docs/rules-changelog.md).

## 2. Intrinsic Java / Bedrock differences (never counted as failures)

- Bedrock has no data-driven dimensions, no world border, no `/data`, `/bossbar`, `/team`,
  `/attribute`, `/advancement`, no scheduled functions, no custom clocks, no stopwatches,
  no command storage, no team-coloured sidebars, no non-`dummy` scoreboard criteria.
- Java has no ticking areas (forced chunks are the closest equivalent → ADAPTED), no
  Education Edition blocks, no water-logging of arbitrary blocks.
- Java-only entities (displays, interaction, marker, giant, illusioner, mannequin,
  furnace / spawner minecarts, spectral arrow) and blocks (test blocks, Java 26.x
  concrete slabs and stairs) have no Bedrock counterpart.
- Some gamerules have different scales (random tick speed): not compared by value
  (NOT_EVALUATED).
- Some mobs have a different maximum health (wither: 300 in Java, 600 in Bedrock per the
  Bedrock server's entity definition). `entity.health` still compares the stored value
  (fixture-rules §3.4). For the J02 wither (300/300 in Java, written as 450/450 in
  Bedrock by WorldSwitch) the result is FAIL under the absolute reading and under the
  ratio reading with each edition's own maximum; only a ratio against the maximum the
  converter itself wrote would pass it, and MCCB does not let a converter's output set
  its own reference.

Intrinsic differences that the rules still count, because the stored state is lost
(they are FAIL or PARTIAL for every converter, and listed so that they are not read as
converter defects):
- the Bedrock Nether ends at y = 127: Java Nether content above it cannot be carried;
- Java cauldrons have 3 levels and Bedrock 6: a Bedrock odd level comes back rounded;
  Java cannot store a potion or dyed water in a cauldron (the Bedrock block entity is lost);
- Java doors cannot be water-logged; Bedrock's floor buttons have no facing to keep;
  Bedrock decorated pots have no `cracked` state;
- Bedrock-only block states (`infiniburn_bit=1`, `hanging` of suspicious sand/gravel) and
  Java-only states in the J01 matrix;
- round-trip naming of a Bedrock liquid that has a pending update (`lava` vs
  `flowing_lava`): Java keeps one fluid type per level, so the Bedrock name comes back from
  the tick, not from the original save.

## 3. Converter-specific limitations observed

Listed per converter in `docs/converters/<converter>.md` and in the findings report
(`reports/findings/`), with evidence. WorldSwitch outputs of the evaluated build
(`0308840`) are known, among others, to label their Java output as DataVersion 3700
(1.20.4): Mojang's upgrader then cannot type entity chunks that contain entities newer
than 1.20.4, and leaves every entity of such a chunk un-upgraded; block entities newer
than 1.20.4 (for example `shelf`) keep the 1.20.4 item layout, which the 26.3 item codec
reads as a count of 1. The same 1.20.4 `level.dat` has one world border: a border set
per dimension in a 26.x world (Nether, End) cannot survive a WorldSwitch round trip, and
signs come back with `allow_op_features` forced by the upgrader (no effect in play).

## 4. Not tested (v1.3)

- Real long-played survival worlds (no publishable one yet).
- Legacy worlds (pre-1.18 Java, pre-1.18 Bedrock sub-chunk formats), very large worlds,
  performance and memory.
- Maps (item maps and their pixel data), biomes (structures: see §1.2, v1.3),
  light, heightmaps, village and raid state beyond the entities themselves.
- Resource packs, behaviour packs and add-ons, experimental features.
- Player-facing behaviour: running commands, redstone, mob AI, trading in game.
- Multiplayer identity mapping (which Bedrock player is which Java account).
