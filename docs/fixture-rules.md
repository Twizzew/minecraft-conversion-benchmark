# MCCB v1.1 — fixture and comparison rules (as amended by v1.2 and v1.3)

This document is the normative description of what every MCCB v1.1 assertion checks.
The code in `tools/` implements it; if the two disagree, that is a bug to report, and
the published results say which version of the code produced them.

Vocabulary: a **subject** is one thing in a source world (a block at a position, an
entity, a gamerule…). An **assertion** is one aspect of a subject (`subject#aspect`)
measured at up to three **levels**: `direct`, `behavior`, `roundtrip`
(METHODOLOGY.md §2). Each aspect carries, in the fixture file, a pre-declared
expectation code per level, written when the fixture was generated from the source
world — never after looking at an output.

Expectation codes:

| Code | Meaning |
|---|---|
| `EQUIV`, `EQUAL`, `TEXT_EQUAL`, `NEAR`, `RULE`, … | evaluated with the rule of the family (below) |
| `NA:<reason>` | NOT_APPLICABLE, declared in advance (the target edition has no counterpart) |
| `NE:<reason>` | NOT_EVALUATED, declared in advance (MCCB v1.1 has no neutral rule) |
| `CROSS:<target>` | the counterpart lives in another family in the other edition (item frames) |

---

## 1. How worlds are read

- **Java worlds (sources and outputs)** are read after `tools/java/src/MccbNormalize.java`,
  which runs Mojang's own code of the reference version (Java 26.3, DataVersion 5023):
  the world-upgrade file migration (`FileFixerUpper`) and the DataFixerUpper for every
  chunk, entity chunk, POI chunk, player and saved-data file. This is what the game does
  when it opens a world. If the file migration refuses the world, the world "does not
  open": every direct assertion of that run is FAIL (`…world-opens`).
- **Java block entities** are then loaded and saved back by Mojang's own block-entity
  code (same program; registries from `VanillaRegistries.createWorldLookup()` and the
  item-component initialisers, as the server has them). A block entity the game would not
  load — unknown type, or a block at its position that is not valid for its type — is
  removed, as the game removes it at chunk load. A loaded one is replaced by what the game
  would save: codec defaults written, unknown and legacy keys gone, undecodable parts
  skipped (as the game skips them, e.g. an item whose data fails its codec, or an item id
  unknown to the game). Only a problem naming a registry that a world datapack can extend
  (a dynamic registry such as enchantments, absent from the vanilla lookup) keeps the
  block entity as stored; an unknown key in a built-in registry (items, blocks…) is a real
  failure. Every removal, problem and kept-as-stored
  case is listed in the normalisation report of the world. Entities are not loaded this
  way (it needs a running level).
- **Text** is read as the reference game reads it: a string is literal text; only a
  text *compound* is interpreted (`{text:"x"}` → `x`). Legacy `§x` formatting codes are
  removed before text is compared (both editions render them as formatting, not text).
- **Java item stacks** are read with the 26.3 codec's fields and defaults: `count`
  (default 1) and `components`. Keys of the pre-1.20.5 layout (`Count`, `tag`) that the
  DataFixer left in place are ignored, as the game ignores them.
- **Bedrock worlds** are read as stored (LevelDB copied to a scratch folder first).
  Blocks: sub-chunk format 8/9, layer 0 = block, layer 1 = water-logging layer.
  Entities: `actorprefix` + `digp` records, and legacy `0x32` records.
- **Representations normalised on reading** (same code for every converter):
  - Bedrock mount saddles: the `Saddled` flag, and the first `ChestItems` slots, read as the
    Java equipment slots `saddle` / `body` by species (rule 55): horse (and skeleton / zombie
    horse) slot 0 saddle, slot 1 armour (observed in the hand-built B02 world); donkey and
    mule slot 0 saddle, slots 1–15 the chest (B02 donkey: 16 entries); llama / trader llama
    slot 0 carpet; camel slot 0 saddle, slot 1 `body` (no native example).
  - Bedrock campfires keep their four positions as `Item1`…`Item4` (no `Items` list): read as
    slots 0–3, Java slot i ↔ `Item(i+1)` (rule 56).
  - Bedrock player position: `Pos.y − 1.62` (Bedrock stores the eye position).
  - Java parrots on a player's shoulder (`ShoulderEntityLeft/Right`, stored inside the
    player data) are read as entities at the player's position + 1.4 (Bedrock stores them
    as actors riding the player).
  - Java block states are completed with the registry default of each property
    (a palette entry without a property means "the default value").

## 2. Which subjects exist (derived from the SOURCE world only)

| World | Block subjects | Other subjects |
|---|---|---|
| J01@1.1 | every non-air block in the boxes of its own `specification/LAYOUT.json`: state matrix (1000..1359, 80, 1000..1359) and block-entity fixtures (998..1030, 79..80, 1458..1474), plus every absolute-coordinate `setblock` target of its datapack functions | all block entities, container stacks, entities, world data, scoreboard, player, and every non-empty chunk of the datapack dimension `mccb26:states` |
| J02, J03, J04 | every absolute-coordinate `setblock` target of the build functions shipped in the world's datapack (`fill` = support geometry, excluded) holding a non-air block in the source | same families |
| B01, B02 | every non-air block above the superflat terrain (y > −61) | same families |
| B03 | every absolute-coordinate `setblock` target of the behaviour-pack functions (with `execute in <dim>`) holding a non-air block in the source | same families |
| REAL_WORLD_SURVIVAL worlds (GURREN@1.0, measured privately) | every non-air block of a **sample of whole sub-chunks** (16×16×16), drawn by SHA-256 of `salt\|dim\|cx\|sy\|cz` (first 4 bytes, unsigned, modulo N = 0), in two strata fixed before any output was examined: *uniform* — 1 sub-chunk in 4 096 anywhere; *built* — 1 in 64 of the sub-chunks that hold at least one block entity | **all** block entities, container stacks, entities, players, world data and scoreboard (no sampling) |

A declared case whose position holds nothing in the source world is **not** a subject:
it is listed in `reports/source-validation/` (for B01 and B03 this is the majority of the
declared palette; see WORLDS.md). Converters are never judged on content the source
world does not contain.

Declared in advance for every family, at the direct level only (the round trip is
always judged):

- a subject located in a Java datapack dimension is `NA:bedrock-has-no-custom-dimension`
  (for the player: position, dimension and spawn point);
- a subject in the Java Nether at y ≥ 128 is `NA` (Bedrock's Nether ends at y = 127,
  measured on the native B03 world: highest Nether sub-chunk index 7);
- a block entity, stack or entity that is **natural content** (not at a position placed
  by the world's generator) in a chunk whose generation is incomplete (Java `Status` ≠
  `minecraft:full` or proto-chunk entities; Bedrock `FinalizedState` ≠ 2) is
  `NE:natural-content-in-incomplete-chunk`: MCCB does not define the correct conversion
  of a half-generated chunk.

## 3. Families

### 3.1 `block` — a block at a position

| Aspect | Direct | Round trip |
|---|---|---|
| `identity` | target block name ∈ the equivalent set of the identity reference (`docs/reference/identity-equivalence.v1.json`); air or another name = FAIL; edition-only source = NOT_APPLICABLE; chunk missing = FAIL | same name |
| `state` (blocks with properties) | NOT_EVALUATED (`no-neutral-cross-edition-state-reference-in-v1.1`) | full state equal (Java: registry defaults applied on both sides). Only derived properties differ (list below) → ADAPTED. A Bedrock state key present on one side only → NOT_EVALUATED (`state-key-omitted-engine-default-unknown`). Anything else → FAIL |
| `waterlog` (water-logged sources) | Java→Bedrock: layer 1 is water. Bedrock→Java: `waterlogged=true`; if the Java block has no `waterlogged` property → NOT_APPLICABLE | same water-logging |

Derived Java properties (recomputed by Java from neighbours, not stored by Bedrock):
stairs `shape`; fence / pane / bars connections; redstone wire connections; note block
`instrument`; tripwire connections; chorus plant connections; fire faces; leaves
`distance`; `snowy` of grass/podzol/mycelium; repeater `locked`; campfire `signal_fire`;
`powered` of doors, trapdoors, fence gates, note blocks, skulls and heads; `up` of vines.
Derived Bedrock state: leaves `update_bit`.

Legacy Bedrock palette entries: a source block whose name the current game no longer
defines, or which carries a state its block no longer has (e.g. `stone` with
`stone_type=granite`, `planks` with `wood_type`), is upgraded by the game when the chunk
loads; MCCB has no neutral upgrade table, so its identity and state are NOT_EVALUATED at
both levels (`legacy-bedrock-block-entry-no-upgrade-reference`). "Current" = the block
list and state keys of `@minecraft/vanilla-data` 1.26.40.

Derived Java identity (one Bedrock block, two Java blocks chosen from the neighbour
above): `kelp` ↔ `kelp_plant`, `weeping_vines` ↔ `weeping_vines_plant`,
`twisting_vines` ↔ `twisting_vines_plant`, `cave_vines` ↔ `cave_vines_plant`. A round
trip that returns the other member of the pair is ADAPTED (identity and state).

### 3.2 `block_entity` — data attached to a block (not the container items)

| Aspect | Direct | Round trip |
|---|---|---|
| `presence` | a block entity exists at the position; NOT_APPLICABLE when the source kind has no block entity in the other edition (Java: test blocks; Bedrock: FlowerPot, Music, Cauldron, ItemFrame, GlowItemFrame, PistonArm, Lodestone, NetherReactor, ChemistryTable, ChalkboardBlock, Bed, SporeBlossom) | same block-entity id |
| `custom_name` | same text (an empty stored name is no name: no assertion) | same text |
| `sign_text` | same lines, front and back (trailing empty lines ignored) → PASS; the same words broken into lines differently → ADAPTED (Bedrock wraps sign text itself, Java has 4 fixed lines) | same lines |
| `sign_flags` | same glowing (front/back) and waxed flags | same |
| `sign_color` | NOT_EVALUATED (no colour mapping in v1.1) | same colours |
| `command` | see table below | identical command text |
| `command_flags` | same `auto` and `TrackOutput`; NOT_EVALUATED when the target command is empty (`flags-moot-command-removed`) | same |
| `lectern_book` | same page texts | same |
| `record` | jukebox record identity equivalent | same item |
| `data` | NOT_EVALUATED | every stored key equal (volatile keys excluded: `x y z keepPacked isMovable`, and `Items`, judged per stack) — strict first, then semantic (§4); otherwise PARTIAL (the block entity exists, some data differs) |

Direct `command` rule, from the classification **declared by the source world** (J04:
each station's book and sign; other worlds: none):

| Declared | Target empty | Target identical to source | Target different |
|---|---|---|---|
| `DIRECT` | FAIL | PASS | NOT_EVALUATED (`translated-command-correctness-needs-runtime`) |
| `ADAPTABLE` | FAIL | NOT_EVALUATED | NOT_EVALUATED |
| `NO_EQUIVALENT`, `ROUND_TRIP_ONLY` | NOT_APPLICABLE | NOT_APPLICABLE | NOT_APPLICABLE |
| none (support commands, J03, B03) | NOT_EVALUATED (`command-removed-equivalence-undeclared`) | NOT_EVALUATED | NOT_EVALUATED |
| source empty | PASS if target empty, else FAIL | | |

Whether a translated command WORKS is a behaviour question; v1.1 does not run commands.

### 3.3 `item_stack` — one stack in a container block entity

| Aspect | Direct | Round trip |
|---|---|---|
| `identity` | an item of the equivalent set in the same container, in the slot holding the same role (rule 53: same slot number, except the brewing stand — Java 0–2 bottles / 3 ingredient / 4 fuel ↔ Bedrock 1–3 / 0 / 4); a stack in another slot is FAIL (where it was found is noted) | same id, same slot |
| `count` | same count | same count |
| `component:<name>` (one per stored Java component; for Bedrock sources, one per tag field with a rule) | rule below, else NOT_EVALUATED (`no-mccb-v1.1-rule-for-this-property`) | component equal (strict, then semantic) |
| `tag`, `aux` (Bedrock sources) | NOT_EVALUATED | equal |

Java targets: `repair_cost` and `damage` default to 0 and the game does not save them at
0; a source value 0 against an absent Java component is PASS (`…java-default-0`). Rule 48
(v1.3): the same holds in both directions and in the round trip — a value 0 and an absent
value are the same state (`…default-0`).

**Double chests (rule 49, v1.3).** A double chest is ONE container for the player: 54
slots, the first half shown in slots 0–26. Java shows first the chest whose block state
`type` is `right` (its partner is at `facing` turned counter-clockwise); Bedrock shows first
the chest whose block entity has `pairlead` = 1 (recent Bedrock keeps `pairx`/`pairz`/
`pairlead` on that chest only; the other half is the neighbour pointing to it). When the
source stack is in one half of a double chest, and the chest at the same position in the
observed world is also one half of a double chest, the stack is looked for in the combined
container at slot `slot + 27 × half`. Otherwise a chest is read on its own, as before. The
order in which the two block entities are stored or read is not state: the same 54 slots
shown are equal whatever block holds which half. A Bedrock pair with no unique lead (no
chest with `pairlead` = 1, or both, or two chests claiming the same partner) shows its
halves in an order MCCB cannot tell; so does a chest that CARRIES pair markers whose pair is
not valid (Java `type` left / right with the partner missing, of another block, of the same
type or facing another way; Bedrock `pairx` / `pairz` pointing to a missing, non-adjacent or
non-chest block; or Bedrock markers that do not form one consistent pair: `pairx` or `pairz`
alone, `pairlead` alone, a partner carrying markers that do not point back, two leads, no
lead, two claimants) — such a chest is never read as a single chest. Three states are kept
apart: single chest (no pair marker), valid pair, undetermined pair. A stack whose source
chest was an undetermined pair, or whose target chest is one (whatever the source), is
NOT_EVALUATED (`double-chest-half-order-undetermined`) when found in its local slot of either
half, never PASS; elsewhere it is FAIL. Only a chest with no pair marker (and not claimed by a
neighbour) is a single chest. A stack found in the same local slot of
the other half is a FAIL with the evidence `double-chest-halves-shown-in-other-order`. A
block-entity kind with no counterpart in the target edition (item frames, flower pots…)
has its `custom_name` NOT_EVALUATED in direct (the name moves to another family). When
the identity reference does not know the source item, a different item in the slot is
NOT_EVALUATED (a correctly renamed item cannot be told from a wrong one); an empty slot
is FAIL.

Component rules (Java ↔ Bedrock): `custom_name` ↔ `display.Name` (text), `lore` ↔
`display.Lore` (lines), `damage` ↔ `Damage`, `unbreakable` ↔ `Unbreakable`,
`repair_cost` ↔ `RepairCost`, `trim` ↔ `Trim` (material and pattern names),
`dyed_color` ↔ `customColor` (RGB), `written_book_content` ↔ `title`/`author`/`pages`,
`writable_book_content` ↔ `pages`.

### 3.4 `entity`

A Bedrock actor record that no chunk's actor list (`digp`) references is not loaded by
the game: in a source it stays a subject but every aspect is NOT_EVALUATED
(`bedrock-actor-not-referenced-by-any-chunk`); in a target it is not a candidate for
matching.

Matching (deterministic, one-to-one): round trip — same UUID first; both levels — same
custom name, then the nearest free entity of an equivalent type in the same dimension
within 2.0 blocks (direct) / 0.75 block (round trip).

| Aspect | Direct | Round trip |
|---|---|---|
| `identity` | a matched entity of the equivalent type exists; edition-only type → NOT_APPLICABLE; Java item frames → a `frame`/`glow_frame` block at the frame's block position | same type |
| `position` | Δx, Δz ≤ 0.5 and Δy ≤ 1.0 | all ≤ 0.01 |
| `custom_name` | same text | same text |
| `baby` (babies) | target is a baby | same |
| `health` (living entities only) | \|Δ\| ≤ 0.5; target storing no health value → NOT_EVALUATED | \|Δ\| ≤ 0.001 |
| `tamed` (tamed) | target is tamed; a Bedrock species whose Java counterpart stores no tamed state → NOT_APPLICABLE (Java species that do: subclasses of `TamableAnimal` / `AbstractHorse` in the 26.3 jar — wolf, cat, parrot, nautilus, zombie nautilus, horse, donkey, mule, llama, trader llama, skeleton / zombie horse, camel, camel husk) | same |
| `equipment` | every source item has an equivalent in the SAME slot of the target equipment (rule 53: head … feet, body, mainhand, offhand, saddle; PARTIAL if some) | identical items in the same slots (strict, then semantic §4) |
| `inventory` | containers a player opens (chest / hopper minecarts, chest boats, chested donkeys, mules, llamas): equivalent items with counts in the same `Slot` (rule 53; chested equines / llamas: numbering across editions not established, a full match is NOT_EVALUATED); other inventories (villager, piglin…, stored without positions by Java): multiset (PARTIAL if some) | identical items in the same slots; unordered for inventories without positions |
| `trades` | every source offer exists (buy/sell identities and counts), any order; extra target offers noted, not penalised. Bedrock source: only the unlocked offers (`tier ≤ TradeTier`) are expected — Bedrock stores every tier in advance | identical offer list, in order |
| `data` | NOT_EVALUATED | every stored key equal (volatile keys excluded: position, motion, rotation, UUID, air, fire, fall distance, hurt/death timers, brain memories…), strict then semantic; otherwise PARTIAL |

### 3.5 `world`

`opens_in_reference_game` (behaviour for Bedrock→Java, round trip for Java→Bedrock→Java):
Mojang's world-upgrade file migration of Java 26.3 accepts the world.

Direct mappings: level name; seed (64-bit value); game type (Java 0/1/2/3 ↔ Bedrock
0/1/2/6); difficulty; hardcore; commands allowed; spawn (x and z); time of day
(`% 24000`); raining; thundering; gamerules through `tools/reference/gamerules.v1.mjs`
(same meaning and unit only; different unit → NOT_EVALUATED; edition-only →
NOT_APPLICABLE). Java world border, scheduled functions, custom clocks, custom boss
bars, random sequences, stopwatches, data packs → NOT_APPLICABLE in direct, compared in
round trip. Java forced chunks ↔ Bedrock ticking areas → **ADAPTED** when every forced
chunk is covered (PARTIAL: some, FAIL: none), and the reverse.

### 3.6 `scoreboard`

Objectives (presence, display name), scores (value), display slots (`list`, `sidebar`,
`below_name` ↔ `belowname`). Non-`dummy` criteria and Java team-coloured sidebars →
NOT_APPLICABLE. Scores held by entities (UUID) or Bedrock players → NOT_EVALUATED in
direct (identity not mappable). A Java name found only as a Bedrock player entry →
NOT_EVALUATED (`holder-mapped-to-player-identity`).

### 3.7 `custom_dimension`

Every non-empty chunk of a Java datapack dimension: direct NOT_APPLICABLE; round trip:
every section's full block states equal (PARTIAL: some sections differ, FAIL: chunk
missing or all sections differ).

### 3.8 `player`

Host player (Java: `singleplayer_uuid` file; Bedrock: `~local_player`): position, dimension,
game mode, health, food, XP level, inventory / ender chest / armour (rule 53: position by
position — `Slot` 0–35 / 0–26, armour and offhand by slot name; round trip strict then
semantic §4; armour of a v1.3 fixture, which did not record the slot name: a full match is
NOT_EVALUATED), spawn point. Other stored players: round trip only
(their identity cannot be mapped across editions).

Game mode, direct: Bedrock `PlayerGameMode` 5 means "the world's default game mode" and is
compared as the world's `GameType`; round trip: the stored value.

Spawn point, direct: PASS when the target stores the same respawn **block** (x, y, z) —
Java `respawn.pos` ↔ Bedrock `SpawnBlockPosition{X,Y,Z}`, the only position both
editions store with the same meaning — or the same (x, z) spawn position; otherwise
FAIL. Bedrock also stores where the player reappears (`SpawnX/Y/Z`, e.g. above the bed
foot); Java does not. Round trip: both Bedrock positions (or the Java one) identical.

Items (rule 47, v1.3): inventory, ender chest and armour stacks are compared as the other
families compare items (§4, rule 54: a zero or empty value equals an absent key only where
the field's default is demonstrated — item `tag.Damage` / `tag.RepairCost` and an empty
`tag`, components `damage` / `repair_cost` and an empty `components`; an item's
`Block.version` is ignored).

### 3.9 `structure` (v1.3, rules 50–52)

What each edition uses to decide that a position is inside a structure (where its mobs
spawn — blazes, guardians, witches, pillagers…):

- **Java**: the chunk holding the position lists, in `structures.References[id]`, the
  chunks holding the start of structure `id`; the position must lie in the box of one of
  that start's pieces (`StructureManager.getStructureWithPieceAt`). Ocean monuments: at
  load the game rebuilds the monument from the first stored piece's corner
  (`OceanMonumentStructure.regeneratePiecesAfterLoad` → a 58 × 23 × 58 building at y 39,
  read in the 26.3 jar); that building is the box tested.
- **Bedrock**: chunk key 0x39 (spawn areas, type 1 fortress, 2 swamp hut, 3 monument,
  5 pillager outpost) and chunk key 0x77 (the structure pieces present in the chunk; one
  of its boxes is the structure's bounding box cut to the chunk — found geometrically as
  the chunk ∩ the union of the boxes of the connected chunks holding the same structure —
  the others are pieces). Format of both keys: `tools/lib/structures.mjs` (read from every
  record of the corpus; a record that does not fit is reported, never guessed).

Subjects, from the source only:

| Subject | Aspect | Direct | Round trip |
|---|---|---|---|
| `bedrock_zone` (Bedrock source): every 0x39 area and every 0x77 piece whose centre is in a chunk with terrain | `spawn_zone` | rule 50: centre and 8 corners inside a piece of the same structure by the Java rule; PASS 9/9, PARTIAL 1–8, FAIL 0 | the same points covered by a zone of the same key (0x39 same type, 0x77 piece same name) |
| `java_piece` (Java source): every piece of a structure start × every chunk it crosses whose generation reached `features` (monument: the rebuilt building) | `spawn_zone` | rule 51: the centre of piece ∩ chunk covered by a 0x77 piece of the same structure or a 0x39 area of its type. Structures for which no native Bedrock world of the corpus stores data (villages, fossils…): NOT_EVALUATED | the same point inside a piece of the same structure by the Java rule |
| `frontier` (Java source), per dimension: the chunks whose generation had not reached `features` and that hold no block | `generation_frontier` | rule 52: none of them written as a finished Bedrock chunk (FinalizedState 2 or any sub-chunk) — the game would never generate it; PASS none, PARTIAL some, FAIL all | none of them back as a Java chunk at or past `features` |
| `frontier` (Java source), per dimension: the same kind of chunks that already hold terrain | `generation_frontier` | NOT_EVALUATED (rule 38: keeping them half-generated and letting the target generate them are both accepted) | NOT_EVALUATED |

A frontier is one subject per dimension, however many chunks it holds, so that one
repeated behaviour is counted once. Bedrock zones on chunks without terrain are not
subjects (nothing generated there to judge). A 0x39/0x77 record of the source that does not
fit the format is one subject, NOT_EVALUATED at both levels.

## 4. Semantic equality (second chance, round trip)

Applied only after strict typed equality failed, and reported with the rule suffix
`.semantic-equal`: a text compound that is only `{text:"x"}` ≡ `"x"`; the width of a numeric
SCALAR ignored for equal values (`1b` ≡ `1s` ≡ `1` ≡ `1L`, `1.0f` ≡ `1.0d`), compared EXACTLY (integers by their exact value — a
long keeps all its digits: 2^53 + 1 is not the double 2^53 — other numbers by their exact
shortest decimal form) — but a byte, int or long ARRAY is never equal to a list (structural
types kept); key order ignored. The canonical form tags every value with its kind (compound,
list, each array type, number, string), so no stored value can be read as another kind. Rule 54 (v1.3
closure): it is computed from the TYPED stored value (`lib/nbt.mjs` `gameRead`) and is DEFAULT-DENY — an empty compound, an empty list, 0,
`""` and `false` are values, never equal to an absent key, except the field-specific defaults
of `KNOWN_DEFAULTS` (exhaustive list): Bedrock item `tag.Damage` 0 and `tag.RepairCost` 0
and a `tag` left empty (rule 39); Java item components `minecraft:damage` 0 and
`minecraft:repair_cost` 0 and an empty `components` (rules 2, 24, 48); Bedrock block entity
`BlockEntityVersion` 0. An item's `Block.version` is ignored; two encodings of an EMPTY
Bedrock stack (`Name` "" or `Count` 0) in a list of items are one value. The item rules apply
only where the extraction path says the value IS an item, never because a compound looks like
one (`minecraft:custom_data`, a marker's `data` may hold anything): the held / player / stored
items themselves, and in entity or block-entity data the keys of `ITEM_PATHS` — Java entity
`equipment.*`, `Inventory[]`, `Items[]`, `Item` (and riders in `Passengers[]`); Bedrock actor
`Armor[]`, `Mainhand[]`, `Offhand[]`, `ChestItems[]`, `Inventory[]`, `Item`; Java block entity
`Items[]`, `Book`, `RecordItem`, `item`; Bedrock block entity `Items[]`, `book`, `RecordItem`,
`item`, `Item1`…`Item4`. An item anywhere else (trade offers, an item inside another item) gets
no item rule: it is compared as stored. (Exception: `world` saved data are still
compared with the v1.1 semantic form, empties dropped — their fixtures keep only that form.)

## 5. What is never done

- No assertion is added, removed or reclassified because of a converter's result after
  the freeze (METHODOLOGY §8). Changes made before the freeze are logged in
  `docs/rules-changelog.md` with their effect on WorldSwitch.
- No converter's code, mapping table or self-report decides a status.
- No output is modified before analysis.
