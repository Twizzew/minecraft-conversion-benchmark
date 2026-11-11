# Findings — WorldSwitch engine `0308840` on MCCB v1.1

What the MCCB v1.1 oracles found in WorldSwitch's outputs, with the level of evidence of
each claim. Counts are assertions (fixture-rules). The complete data is in
`results/worldswitch/<run>/results.jsonl.gz`; every failure is grouped in
`results/worldswitch/<run>/FAILURE-CENSUS.md`.

**Written by the WorldSwitch team about its own converter.** Nothing here was softened:
unfavourable results are listed first, with their numbers.

## Evidence levels

| Level | Meaning |
|---|---|
| **E1 — stored data** | Read by MCCB's readers in the output files. Says what is stored, not what a player sees. |
| **E2 — game code** | Reproduced by running Mojang's own Java 26.3 code on the output (DataFixer, block-entity load/save, item codec) — no gameplay. |
| **E3 — in game** | Observed in a running client or server. **No v1.1 finding reaches E3**; three E2 findings (A1 names, A2 shelf, A3 signs) can be checked in a Java 26.3 client in a few minutes. |

A finding marked *effect not verified* is a real stored difference whose consequence in
game MCCB has not established.

## Overview (all families, assertions)

| World | Class | Direction | Level | PASS | ADAPTED | PARTIAL | FAIL | N/A | NOT_EVALUATED |
|---|---|---|---|---:|---:|---:|---:|---:|---:|
| J01@1.1 | LAB | J→B | direct | 56 364 | 0 | 0 | 1 | 15 618 | 38 531 |
| | | J→B→J | round trip | 98 458 | 10 246 | 160 | 1 650 | 0 | 0 |
| J02@1.0 | LAB | J→B | direct | 1 637 | 3 | 0 | 1 | 68 | 471 |
| | | J→B→J | round trip | 1 914 | 0 | 179 | 86 | 0 | 1 |
| J03@1.0 | LAB | J→B | direct | 560 | 1 | 0 | 0 | 90 | 306 |
| | | J→B→J | round trip | 878 | 1 | 23 | 55 | 0 | 0 |
| J04@1.0 | LAB | J→B | direct | 18 554 | 3 | 0 | 32 | 124 | 15 908 |
| | | J→B→J | round trip | 34 149 | 0 | 470 | 2 | 0 | 0 |
| B01@1.0 | LAB | B→J | direct | 480 | 0 | 0 | 4 | 13 | 246 |
| | | B→J→B | round trip | 706 | 0 | 22 | 13 | 0 | 2 |
| B03@1.0 | LAB | B→J | direct | 546 | 2 | 1 | 0 | 42 | 1 575 |
| | | B→J→B | round trip | 722 | 0 | 100 | 1 338 | 0 | 6 |
| B02@1.0 | MANUAL_NATIVE | B→J | direct | 623 | 0 | 1 | 2 | 51 | 249 |
| | | B→J→B | round trip | 798 | 0 | 105 | 22 | 0 | 1 |

Read with METHODOLOGY §6: assertions are not independent, classes are not added, and the
NOT_EVALUATED column is large in direct — block states, variants, colours, enchantment /
potion ids and command translations have no neutral cross-edition reference in v1.1.
**The direct PASS counts say nothing about those.** The behaviour level is not in this
table: v1.1 only checks that Java 26.3 accepts to open the Java outputs (it does, for all
3 B→J outputs and all 4 J→B→J returns).

## A. Java outputs are labelled 1.20.4 (DataVersion 3700) — E2

WorldSwitch writes Java worlds in the 1.20.4 layout and lets the game upgrade them.
Mojang's upgrader (DataFixer) of 26.3 cannot upgrade content that did not exist in
1.20.4, and the 26.3 game then reads the old layout with its current codecs:

- **A1. Entity chunks containing an entity newer than 1.20.4 are not upgraded at all**
  (DataFixer: `Unsupported key`), so every entity of such a chunk keeps the 1.20.4
  layout. Consequences measured:
  - J02 round trip: **54 custom names read as raw JSON text** (e.g. the name shows
    `{"text":"LIV-VEHICLE-001"}`), `entity.custom_name` FAIL 54.
  - J02 round trip: 3 chest boats keep `Items` with `Count` — **3 diamonds and 7 books
    read as 1 each** (`entity.inventory` FAIL 3).
  - B02 direct: the wandering trader's offers keep `Count` — **every price and quantity
    reads as 1** (`entity.trades` PARTIAL 1).
  - Legacy keys (`ArmorItems`, `HandItems`, …) remain on entities (part of the
    `entity.data` PARTIAL, see D).
- **A2. Block entities newer than 1.20.4 (`shelf`) keep the 1.20.4 item layout**; the item
  codec ignores `Count` and `tag`:
  - J01 round trip: **3 diamonds on a shelf read as 1** (`item_stack.count` FAIL).
  - B01 direct: **3 writable books placed on shelves lose their pages** (the pages are in
    `tag`, ignored) (`item_stack.component:writable_book_content` FAIL 3).
- **A3. Every sign gains `allow_op_features`.** Mojang's `SignsOpFlagFix` adds the flag to
  every sign upgraded from before the version that introduced it. J04 round trip: 400 of
  400 station signs carry it; the source signs do not (`block_entity.data` PARTIAL 400).

## B. Direct conversion (the other edition) — E1

| World | FAIL / PARTIAL in direct | What |
|---|---|---|
| J04 | 32 FAIL | Command blocks whose command is declared `DIRECT` or `ADAPTABLE` by their station book are emptied. (544 more emptied commands have no declared equivalence: NOT_EVALUATED, rules-changelog #3.) |
| J02 | 1 FAIL | A wither at 300/300 HP is written 450/450 (KNOWN_LIMITATIONS §2). |
| J01 | 1 FAIL | A villager's inventory (wheat seeds) is not carried over. |
| B01 | 4 FAIL | 3 writable books on shelves (A2); a sculk shrieker's block entity is missing. |
| B02 | 2 FAIL, 1 PARTIAL | An arrow stuck in the ground is missing (identity and position); wandering trader offers (A1). |
| B03 | 1 PARTIAL | One Bedrock ticking area is only partly covered by Java forced chunks. |
| J03 | none | |

## C. Round trip (back in the source edition) — E1 unless noted

The round trip measures a *pair* of conversions; WorldSwitch restores part of the data
from private sidecar archives. Largest losses:

- **B03: 651 block entities lost** (×2 assertions: presence and data) — all in the 172
  chunks whose generation is unfinished (`FinalizedState` ≠ 2): the converter does not
  write those chunks. 13 source `lava` blocks come back as `flowing_lava`; 3 ticking areas
  are absent; 4 piglins lose equipment; 1 score is absent.
- **J01: 1 602 `block.state` FAIL** — 672 are door halves whose other half is absent from
  the source (all 672); **168 buttons come back facing north** (56 each from south, west and
  east); 470 sculk sensors (376 calibrated) lose their activation state (`power`,
  `sculk_sensor_phase`); 168 mushroom blocks and stems change faces; 36 piston parts;
  24 big dripleaves (`tilt`); 20 mangrove propagules (`stage` 1 → 0); 15 targets
  (`power`); 8 levers (`facing`); 8 lecterns (`has_book`); 8 decorated pots (`cracked`)
  and others (census). **22 identity
  FAIL**: 12 `moving_piston` and 5 test blocks become air, 2 mushroom blocks become stems,
  3 potted plants become empty pots. 1 650 FAIL in total.
- **Block-entity data** (after the game's own load/save, rules-changelog #24): crafters
  lose `triggered=1` (24, J01); trial spawners without a configuration receive a zombie
  configuration (13, J01), and J02's custom trial-spawner configurations are replaced;
  **spawner entities lose `NoAI` / `PersistenceRequired`** (J02: 2 spawners, 3 trial
  spawners); empty spawners become pig spawners (2, J01); loot-table seeds are truncated
  to 32 bits (3 chests in each of J01, J02, J04); furnaces' `cooking_total_time` 0 → 100/200;
  jukebox song progress is lost.
- **J02**: 8 Java-only entities (block/item/text display, interaction, giant, illusioner,
  mannequin, spawner minecart) are not restored (their direct result is
  NOT_APPLICABLE); the 54 names and 3 chest boats of A1.
- **J03**: 40 blocks of Nether portals built at y = 200 (above Bedrock's Nether) are lost;
  world-border values change; custom clocks are lost.
- **J04**: one gamerule (`fire_spread_radius_around_player`) and the custom boss bars are
  lost; the 400 signs of A3. **Every command comes back identical** (0 command FAIL in
  round trip).
- **J01 player**: comes back in the overworld instead of the datapack dimension.
- **B01**: a hanging sign's facing changes; a cauldron's `fill_level` 3 → 4; 2
  water-logged doors lose their water; 3 cauldron and 1 sculk-shrieker block entities
  are missing; the world spawn height `32767` ("find the surface") becomes 64.
- **B02**: 29 villagers lose their locked higher-tier offers (PARTIAL); 2 arrows are
  lost; the tamed happy ghast comes back untamed; the shoulder parrot moves by ~0.45
  block; a pillager's crossbow loses its loaded arrow; `WasPickedUp` 1 → 0 on 2 items; a
  bundle's stored items lose `WasPickedUp` / `Block` and gain `custom_data`; 5 items lose
  `tag.Damage:0` (*effect not verified*); the player's armour comes back with
  its durability also written in the item's top-level `Damage` (aux) (*effect not
  verified*); the player's spawn position (`SpawnX/Y/Z`) moves onto the bed block.

## D. Entity data — PARTIAL counts include serialization noise

`entity.data` (round trip) compares every stored key; entities cannot be loaded by the
game code without a running level, so an explicit default (`Age:0`) against an absent
key counts as a difference (KNOWN_LIMITATIONS §1.2). J01 84, J02 159, J04 57, B01 11,
B02 68, B03 60 PARTIAL: their evidence lists lost / added / changed keys. They mix real
losses (e.g. random-spawn-bonus attribute modifiers) with noise; MCCB does not reclassify
them.

## E. What went well (same evidence rules)

- J01 direct `block.identity`: 32 493 of 32 493 evaluated blocks have an equivalent block
  in Bedrock (5 edition-only blocks are NOT_APPLICABLE).
- J04 round trip: 3 989 command blocks, every command identical.
- No block entity of any output is rejected by the game's own block-entity code; the Java
  26.3 world upgrade accepts every Java output.
- B03 direct: 0 FAIL on what is evaluable (its losses are in the round trip).
- Determinism: two identical runs (J04, B01) give byte-different files but identical
  direct evaluations (self-test D).

## F. What these results do not show

- They are not a comparison: no other converter has been run.
- They do not measure behaviour in game beyond "Java 26.3 opens the world".
- Most direct block-state, colour and variant correctness is NOT_EVALUATED.
- No REAL_WORLD_SURVIVAL result is published. One real multiplayer survival world was
  measured privately with the same tools (its data belongs to other players too). It
  called for one new rule (block sampling) and exposed nine defects of the MCCB oracles — in both directions, e.g. 42 286 false FAIL
  and 184 671 false PASS on legacy Bedrock palettes — all fixed and logged
  (rules-changelog #26–#35); none of these fixes changed a result published here. Its
  numbers stay private until a sanitised copy is published and measured from scratch.
