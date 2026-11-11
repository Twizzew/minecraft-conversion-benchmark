# The six MCCB v1.0 source worlds

Three themes × two editions. Each theme stresses a different layer of a world, so a failure
can be attributed to a layer instead of to "the conversion".

| Theme | What it stresses |
|-------|------------------|
| **STATIC** | Blocks, block states, block entities and items — data that never moves. |
| **LIVING** | Entities: mobs, variants, inventories, trades, taming, persistence. |
| **SYSTEMS** | The world itself: chunks, dimensions, redstone, commands, scoreboards, timers. |

All six worlds were built with **vanilla, non-experimental** content only. No world was
produced by converting another world, and none was tuned for any particular converter.

---

## Java Edition — 26.2 (`DataVersion` 4903)

Each Java world is a ZIP containing a single world folder, ready to be dropped into
`.minecraft/saves/`. The datapack that generated the fixtures ships inside the world at
`datapacks/`, so the construction is auditable.

### J01 — STATIC

| | |
|---|---|
| Asset | `MCCB_J01_STATIC_JAVA.zip` |
| Size | 7 036 006 bytes (43.7 MiB uncompressed, 93 files) |
| `LevelName` | `MCCB J01 STATIC - Java 26.2` |
| Dimensions | `minecraft:overworld` (13 region files) + custom dimension `mccb26:states` (9 region files) |
| Datapack | `MCCB_J01_STATIC_JAVA26_2_R9_ITEM_REGISTRY_FIX.zip` (pack format 107.1) |

Declared coverage, as recorded in the datapack's own `COVERAGE.json`:

- 1 537 registered Java 26.2 item IDs tracked; 1 536 materialisable as item stacks.
- Block states enumerated with the vanilla `minecraft:debug` generator, copied into
  144 tiles across a 360×360 window in the dedicated `mccb26:states` dimension.
- 460 mandatory item-component / variant instances.
- 111 data-component registry types classified; 74 probed with explicit values.
- 26 static block / block-entity fixtures, plus multiblock and connectivity fixtures.

The datapack explicitly does **not** claim every possible value of unbounded components
(names, lore, custom data, arbitrary nested content).

### J02 — LIVING

| | |
|---|---|
| Asset | `MCCB_J02_LIVING_JAVA.zip` |
| Size | 3 308 679 bytes (24.1 MiB uncompressed, 75 files) |
| `LevelName` | `MCCB_J02_LIVING_JAVA26_2` |
| Dimensions | Overworld (9 region files), Nether (4), End (4) — with `entities/` and `poi/` in each |
| Datapack | `MCCB_J02_LIVING_26_2_HARDENED_R3.zip` (pack format 107.1) |

Entity-focused: mob variants, ages, inventories, villager professions and trades, taming
and ownership, leashes, persistence flags, and per-dimension entity placement. The `poi/`
and `entities/` folders of all three dimensions are populated, which is where most
entity-related conversion losses actually show up.

### J03 — SYSTEMS

| | |
|---|---|
| Asset | `MCCB_J03_SYSTEMS_JAVA.zip` |
| Size | 6 325 350 bytes (66.3 MiB uncompressed, 162 files) |
| `LevelName` | `MCCB_J03_SYSTEMS_JAVA26` |
| Dimensions | Overworld (36 region files), Nether (4), End (8) |
| Datapack | `MCCB_J03_SYSTEMS_JAVA26_2_READY.zip` (pack format 107.1) |

World-level state: spawn, seed, time, weather, difficulty, gamerules, scoreboards,
command blocks, redstone assemblies, chunk boundaries, pending scheduled ticks and
cross-dimension travel. The world carries `scoreboard.dat`, `scheduled_events.dat`,
`world_clocks.dat`, `random_sequences.dat` and `game_rules.dat` with non-default content.

---

## Bedrock Edition — 1.26.45 (minimum compatible client 1.26.40)

Each Bedrock world is an `.mcworld` archive, ready to be imported into the Bedrock client.
Fixtures are already materialised in the LevelDB (`db/`). The generator behavior pack
that built them ships inside the archive under `behavior_packs/` for audit and
reproduction; it is **not** enabled in the exported world.

### B01 — STATIC

| | |
|---|---|
| Asset | `MCCB_B01_STATIC_BEDROCK.mcworld` |
| Size | 119 207 bytes (39 files) |
| `LevelName` | `B01 STATIC Core` |
| Client | `lastOpenedWithVersion` 1.26.45.1 · `InventoryVersion` 1.26.45 · experiments OFF |
| Generator pack | `MCCBB01STA` (revision R8, `min_engine_version` 1.26.40) |

Declared coverage, from the pack's own `COVERAGE.json` (`source_policy: NATIVE_BEDROCK_ONLY`):

- 702 cases, 700 assertions, 262 palette block IDs, 53 manually-placed cases.
- By category: 394 BLOCK, 232 BLOCK_STATE, 44 BLOCK_ENTITY, 17 ITEM_COMPLEX, 6 CONNECTION,
  4 MULTIBLOCK, 2 CONTAINER, 2 PARITY, 1 WATERLOGGING.
- Includes recent stable families: Shelf variants and their comparator matrix, Copper Age
  blocks, Pale Garden / resin, Creaking Heart states, stair `minecraft:corner` matrix,
  Trial Spawner `trial_spawner_state` 0–5 × `ominous`, Vault direction × `ominous`.
- Deliberate non-goals stated by the pack: no exhaustive Cartesian product of visually
  redundant states, no fabricated Java NBT inside Bedrock, no experimental content.

### B02 — LIVING

| | |
|---|---|
| Asset | `MCCB_B02_LIVING_BEDROCK.mcworld` |
| Size | 159 654 bytes (9 files) |
| `LevelName` | `Benchmarck manuel v1` |
| Client | `lastOpenedWithVersion` 1.26.45.1 · `InventoryVersion` 1.26.45 · experiments OFF |
| Generator pack | none — this world was built **entirely by hand** in the retail client |

B02 is the only source world with no behavior pack at all: every fixture was placed
manually in-game, which is the only way to obtain engine-authentic entity state that a
command cannot fabricate. Its LevelDB contains, among others, villagers (`villager_v2`)
with trades and professions, wolves with collar/armor/variant state, cats, parrots,
horses, donkeys with chest and saddle state, pigs with harnesses, pillagers with
crossbows, wandering traders with llamas, happy ghasts, and raid state
(`raid_configuration`, `raid_persistence`).

The internal `LevelName` was never changed after the world was built; the published
filename `MCCB_B02_LIVING_BEDROCK.mcworld` is the benchmark identifier for the same bytes.

### B03 — SYSTEMS

| | |
|---|---|
| Asset | `MCCB_B03_SYSTEMS_BEDROCK.mcworld` |
| Size | 779 237 bytes (57 files) |
| `LevelName` | `BO3 SYSTEMS` |
| Client | `lastOpenedWithVersion` 1.26.45.1 · `InventoryVersion` 1.26.45 · experiments OFF |
| World | Infinite / Normal, **seed 26062026** |
| Generator pack | `MCCBB03SYS` (revision R17, `min_engine_version` 1.26.40) |

Declared coverage, from the pack's own `COVERAGE.json`:

- 96 cases, 95 assertions, 46 manual / manually-activated cases.
- By category: 24 COMMAND, 17 CHUNK, 14 DIMENSION, 9 STRUCTURE, 9 WORLD, 8 REDSTONE,
  7 BIOME, 4 TIMER, 3 SCOREBOARD, 1 PORTAL.
- Chunk boundaries at exact ±16, negative quadrants, and far markers at ±1 000 000.
- Nether and End laboratories built at native arrival points, plus a schedule deliberately
  left **pending** at freeze so that post-conversion first-load behaviour can be observed.

B03 also records two edition differences explicitly rather than faking them:

| ID | Status | Reason |
|----|--------|--------|
| `WORLD:JAVA_WORLD_BORDER` | `NOT_APPLICABLE` | Bedrock has no native equivalent of Java's `/worldborder`. |
| `WORLD:TICKING_AREA` | `SEMANTIC_EQUIVALENT` | Bedrock ticking areas are tested as native persistent ticking, not as Java spawn-chunk semantics. |

---

## Published name ↔ original filename

The bytes published in the release are identical to the files frozen locally. Only the
filename was normalised, so the mapping is recorded here in full.

| Published asset | Original frozen filename | SHA-256 |
|---|---|---|
| `MCCB_B01_STATIC_BEDROCK.mcworld` | `B01 STATIC Core.mcworld` | `83e8e9909a3d8915980df317073b80c11421152d8f7ed88714fd196e45c0a667` |
| `MCCB_B02_LIVING_BEDROCK.mcworld` | `Benchmarck manuel v1.mcworld` | `34d9b5dfaff557ef5e3907cae8fba31fc5de8dc03cb49c145ab14b0e6f6ccd10` |
| `MCCB_B03_SYSTEMS_BEDROCK.mcworld` | `BO3 SYSTEMS.mcworld` | `fd16e5d795f6b707fb48bce821e09dcad5a8e15c87e101d6e080bb24c911a838` |
| `MCCB_J01_STATIC_JAVA.zip` | `MCCB J01 STATIC - Java 26_2.zip` | `47942eef4464f4e9435cd11292bd37113d0135421e3501d0454b55d05bee8cde` |
| `MCCB_J02_LIVING_JAVA.zip` | `MCCB_J02_LIVING_JAVA26_2 (2).zip` | `db97f7497094ed5681600b37a76ab81e975341280883dcf433b3d6c40e8f17a4` |
| `MCCB_J03_SYSTEMS_JAVA.zip` | `MCCB_J03_SYSTEMS_JAVA26.zip` | `45c7ae7293ff1dfd3310757a8b56f1d094e6928aa20a82b68ff45428f55bbc50` |

## A note on the coverage figures

The case, assertion and category counts above are **declarations made by each world's own
generator pack**, reproduced here verbatim so that they can be checked against the world
itself. They are not independent measurements, and this repository does not assert that
every declared case is present and correct — the world files are published precisely so
that anyone can check.
