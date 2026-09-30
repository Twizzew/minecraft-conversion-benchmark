# MCCB source worlds — version 1.1

The v1.0 version of this page (six worlds) is kept verbatim in
[`docs/history/WORLDS-v1.0.md`](docs/history/WORLDS-v1.0.md). Every world revision has
its own generated card in [`worlds/`](worlds/); the machine-readable record is
[`manifests/worlds.json`](manifests/worlds.json).

## Themes and classes

| Theme | What it stresses |
|-------|------------------|
| **STATIC** | Blocks, block states, block entities and items — data that never moves. |
| **LIVING** | Entities: mobs, variants, inventories, trades, taming, persistence. |
| **SYSTEMS** | The world itself: chunks, dimensions, redstone, commands, scoreboards, timers. |
| **COMMANDS** | Command blocks: 400 stations, each carrying its own declared expectation. |

| Class | Meaning | v1.1 worlds |
|---|---|---|
| `LAB` | Built by a generator (datapack / behaviour pack) to cover families systematically. | J01, J02, J03, J04, B01, B03 |
| `MANUAL_NATIVE` | Built by hand in the retail game: engine-authentic state. | B02 |
| `REAL_WORLD_SURVIVAL` | Played for a long time. | none published (see KNOWN_LIMITATIONS.md) |

Results of different classes are never added together.

## The seven v1.1 worlds

| World | Edition | Theme | Class | File | SHA-256 | Card |
|---|---|---|---|---|---|---|
| **J01@1.1** | Java 26.3 | STATIC | LAB | `MCCB_J01_STATIC_JAVA_v1.1.zip` | `b28294c7…6cf3` | [card](worlds/J01_r1.1/README.md) |
| **J02@1.0** | Java 26.2 | LIVING | LAB | `MCCB_J02_LIVING_JAVA.zip` | `db97f749…17a4` | [card](worlds/J02_r1.0/README.md) |
| **J03@1.0** | Java 26.2 | SYSTEMS | LAB | `MCCB_J03_SYSTEMS_JAVA.zip` | `45c7ae72…bc50` | [card](worlds/J03_r1.0/README.md) |
| **J04@1.0** | Java 26.3 | COMMANDS | LAB | `MCCB_J04_COMMANDS_JAVA.zip` | `44a58908…b4c` | [card](worlds/J04_r1.0/README.md) |
| **B01@1.0** | Bedrock 1.26.45 | STATIC | LAB | `MCCB_B01_STATIC_BEDROCK.mcworld` | `83e8e990…0a667` | [card](worlds/B01_r1.0/README.md) |
| **B02@1.0** | Bedrock 1.26.45 | LIVING | MANUAL_NATIVE | `MCCB_B02_LIVING_BEDROCK.mcworld` | `34d9b5df…ccd10` | [card](worlds/B02_r1.0/README.md) |
| **B03@1.0** | Bedrock 1.26.45 | SYSTEMS | LAB | `MCCB_B03_SYSTEMS_BEDROCK.mcworld` | `fd16e5d7…1a838` | [card](worlds/B03_r1.0/README.md) |

Full hashes: [`checksums/MCCB-v1.1-source-worlds.sha256`](checksums/MCCB-v1.1-source-worlds.sha256).

**Changes from v1.0.** J01 revision 1.1 replaces revision 1.0 (J01@1.0 is SUPERSEDED: its
file stays in the v1.0 release, byte-identical, and is never an input of v1.1). J04 is
new. J02, J03, B01, B02 and B03 are the v1.0 files, byte-identical.

## Declared versus contained

Each generator pack declares cases; MCCB evaluates only what the frozen world
**contains** (METHODOLOGY §5.1). The comparison is measured in
[`reports/source-validation/`](reports/source-validation/SOURCE-VALIDATION-v1.1.md). The
two large gaps:

- **B01@1.0** — only 6 of the 18 generator functions of its pack have their blocks in the
  world; the others' chunks do not exist. The 702 declared cases overstate it.
- **B03@1.0** — its Nether content laboratory (29 blocks) holds lava or air at every
  position; 2 of 3 chunk-boundary markers are in chunks that do not exist.

## Short descriptions

**J01@1.1 — STATIC (Java).** Every block state enumerated in a dedicated datapack
dimension (`mccb26:states`, 144 tiles), block and block-entity fixtures in the overworld,
1 536 materialisable item ids and 460 item-component variants in containers. Revision 1.1
populated the variant barrels slot by slot (an external NBT edit declared in the world's
own QA report, never re-verified in game) and was saved once in Java 26.3.

**J02@1.0 — LIVING (Java).** Mob variants, ages, inventories, villager professions and
trades, taming and ownership, leashes, vehicles, persistence flags; entities in all three
dimensions.

**J03@1.0 — SYSTEMS (Java).** Spawn, seed, time, weather, difficulty, gamerules,
scoreboards, command blocks, redstone assemblies, chunk boundaries, portals, pending
scheduled ticks, world border, clocks and random sequences. In-world verification: 85/85.

**J04@1.0 — COMMANDS (Java 26.3).** 400 command-block stations. Each station carries its
own declared classification in a book and a sign — `DIRECT` 126, `ADAPTABLE` 185,
`NO_EQUIVALENT` 71, `ROUND_TRIP_ONLY` 18 — which MCCB uses for the direct command rule
(fixture-rules §3.2). Those classifications were written by the benchmark's author
(WorldSwitch); they are public and can be challenged.

**B01@1.0 — STATIC (Bedrock).** Block states, block entities, connections, multiblocks and
manual stations, as far as present (see above).

**B02@1.0 — LIVING (Bedrock, built by hand).** Villagers with trades, wolves, cats,
parrots, horses, donkeys, pigs with harnesses, pillagers, a wandering trader, happy
ghasts, raid state — placed manually in the retail client. Its internal level name is
`Benchmarck manuel v1`.

**B03@1.0 — SYSTEMS (Bedrock).** Seed 26062026. Chunk boundaries (±16, negative quadrants,
far markers), commands, redstone, timers, scoreboards, Nether and End laboratories, a
deliberately pending schedule, ticking areas.

## Published name ↔ original filename

| Published asset | Original frozen filename | SHA-256 |
|---|---|---|
| `MCCB_J01_STATIC_JAVA_v1.1.zip` | `MCCB J01 STATIC v1.1.zip` | `b28294c78bb7e3c755827153b8d52bbdb5f80a9a45b598d6608a141493d26cf3` |
| `MCCB_J04_COMMANDS_JAVA.zip` | `J04 COMMANDS.zip` | `44a58908bbf86554eb85c6c0fb6b8b060ed016965e943eab05e72145606a7b4c` |
| `MCCB_J02_LIVING_JAVA.zip` | `MCCB_J02_LIVING_JAVA26_2 (2).zip` | `db97f7497094ed5681600b37a76ab81e975341280883dcf433b3d6c40e8f17a4` |
| `MCCB_J03_SYSTEMS_JAVA.zip` | `MCCB_J03_SYSTEMS_JAVA26.zip` | `45c7ae7293ff1dfd3310757a8b56f1d094e6928aa20a82b68ff45428f55bbc50` |
| `MCCB_B01_STATIC_BEDROCK.mcworld` | `B01 STATIC Core.mcworld` | `83e8e9909a3d8915980df317073b80c11421152d8f7ed88714fd196e45c0a667` |
| `MCCB_B02_LIVING_BEDROCK.mcworld` | `Benchmarck manuel v1.mcworld` | `34d9b5dfaff557ef5e3907cae8fba31fc5de8dc03cb49c145ab14b0e6f6ccd10` |
| `MCCB_B03_SYSTEMS_BEDROCK.mcworld` | `BO3 SYSTEMS.mcworld` | `fd16e5d795f6b707fb48bce821e09dcad5a8e15c87e101d6e080bb24c911a838` |

Files with similar names that exist elsewhere (re-zips, drafts, earlier revisions) are
**not** MCCB worlds; they are listed with their hashes in `manifests/worlds.json`
(`non_canonical_files`).
