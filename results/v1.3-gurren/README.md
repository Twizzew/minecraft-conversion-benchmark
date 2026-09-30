# MCCB v1.3 — GURREN

GURREN is a real multiplayer survival world, measured as a complement to the seven synthetic
worlds. Its counts are shown on their own and are never added to those of the synthetic
worlds (METHODOLOGY §3: world classes are never merged).

## Source

| | |
|---|---|
| World | GURREN — multiplayer survival Realm played 2025-11 → 2026-06, Bedrock 1.26.21.1; class REAL_WORLD_SURVIVAL |
| File graded | `MCCB_R01_SURVIVAL_BEDROCK.mcworld`, SHA-256 `a640374228039cc6dd502c0192b472b30a0f9baa8588f886d2057990dcd1e1db`, 654 372 052 bytes (not published) |
| File published | `MCCB_R01_SURVIVAL_BEDROCK.mcworld` (release asset), SHA-256 `4cc666cf1325caa53e26189558d09b2f8bc534b733f134c58dd485b3c9d461fa`, 681 858 287 bytes: the graded file with the account identifiers it still held removed (see Distribution) |
| Made from | the private original (never published) by `tools/worlds/sanitize-bedrock-survival.mjs`: 86 LevelDB keys removed (65 `player_<id>` identity records, 21 `RealmsStoriesData*`), third-party packs and icon removed, level renamed `MCCB R01 SURVIVAL`; checked on the graded file: 0 live identity record, 0 live Realms key, 0 identity field or XUID-like value in the player records and `level.dat`; player texts identical to the reviewed list. Account ids left in sign and book fields and in deleted database entries were found and removed before publication (see Distribution) |
| Pinned before any conversion | `reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json` — fixture content `9af167af…29e9`, 2 025 895 subjects, 3 529 881 assertions per level; the 39 frozen tool files checked unchanged; `FREEZE-v1.3.json` untouched |
| Rules | the frozen v1.3 rules, including the real-world block sample fixed for this world before any output of it was examined (`tools/fixtures/zones.mjs`, id `GURREN@1.0`) |

## Converters

The same four builds and options as the public table (`results/v1.3/CONVERTERS-MEASURED.json`),
Bedrock → Java (direct) and back (round trip), run by `reports/gurren/run-gurren.sh`.

| Build | Direct (Bedrock → Java) | Round trip (→ Bedrock) |
|---|---|---|
| WorldSwitch `0308840` | 398 s | 1 557 s |
| WorldSwitch 2.8.0 `fd9b735` | 373 s | 2 464 s |
| Chunker 1.20.0 | 155 s | 407 s |
| je2be core `8dfc4de` | 952 s (128 130 chunks) | 325 s |

Run records: `runs/<run id>/`; output hashes: `OUTPUTS.sha256`,
`checksums/MCCB-v1.3-runs-GURREN.sha256`; results: `<converter>/<direct run id>/`
(`RESULTS.sha256`). Duration on a 4-core machine; not a measured quantity.

## Distribution

A last check before publication found Xbox account identifiers (XUIDs) left in the graded
file: in 85 sign `TextOwner` fields and 3 written-book `xuid` tags (6 distinct accounts), and,
physically, in database entries the sanitiser had deleted but not compacted away. The
published file is the graded one with each of these identifiers replaced by a fixed
pseudonym (the same account always gets the same one) and its database rebuilt from its live
entries; every other key and value is identical
(`reports/gurren/pseudonymise-owners.mjs`). The fixture file in `fixtures/` is rebuilt from
the published file, and the per-assertion files carry the same substitution; the graded
fixture content with that substitution is byte-identical to the rebuilt one, and no status
or count changed. `summary.json` keeps the hashes of the files as graded. All hashes before
and after: `reports/freeze/FREEZE-v1.3-GURREN-PSEUDONYMISATION.json`.

The source file is published as a release asset, not in Git, under the terms of
[NOTICE.md](../../NOTICE.md) (section 2). The eight converter outputs (about 4.7 GB) are not
distributed; their SHA-256 are kept as a record of what was graded. They are not needed to
check the verdicts: running the same builds on the published file and grading the outputs
with the frozen tools should give the same verdicts (the replaced identifiers are opaque
strings, which a converter copies or drops whatever their value), but a regenerated archive is usually not identical
byte for byte to the one graded here (timestamps and other metadata written by the
converters), so it is checked by its verdicts, not by its hash. Steps:
[REPRODUCING.md](../../REPRODUCING.md), section "GURREN".

The frozen `manifests/worlds.json` and the addendum's `worlds_manifest_overlay` still list
`publication_blockers` for GURREN. They record the state at freeze time and are left
unchanged because both files are pinned by hash. They have since been resolved: identity
records, Realms data and third-party packs were removed, the remaining account identifiers
were replaced as described above, the texts were reviewed, and the players' consent was
obtained.

## Results

### Direct conversion

| World | assertions | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|--:|---|---|---|---|
| GURREN | 3529881 | 1896358 / 54 / 19 / **17142** — NE 1608532 | 1913493 / 54 / 18 / **8** — NE 1608532 | 1677563 / 68 / 0 / **235946** — NE 1608528 | 1892785 / 0 / 18 / **20770** — NE 1608532 |

### Round trip

| World | assertions | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|--:|---|---|---|---|
| GURREN | 3529881 | 2883497 / 6 / 115384 / **47311** — NE 483683 | 2930542 / 6 / 114774 / **876** — NE 483683 | 2684050 / 6 / 17188 / **344987** — NE 483650 | 3004461 / 6 / 17943 / **23817** — NE 483654 |

### Integrity checks

| World | converters | same assertions | same fixture registry | sums exact | each once | NE never PASS | assertions / level |
|---|--:|---|---|---|---|---|--:|
| GURREN@1.0 | 4 | true | true | true | true | true | 3529881 |


Cell: PASS / ADAPTED / PARTIAL / **FAIL** — NOT_EVALUATED. 3 529 881 assertions per level
for every build; NOT_APPLICABLE 7 776 (direct) for every build. Integrity checks all true:
same assertions, same fixture registry, sums exact, each counted once, NOT_EVALUATED never
PASS. 1 608 532 direct assertions are NOT_EVALUATED by rule, the same for every build (to
4 assertions): block states with no neutral cross-edition reference (968 024), legacy
Bedrock palette entries with no upgrade reference (466 640), properties v1.3 has no rule for
(156 597), actors no chunk references (14 253), natural content of unfinished chunks (2 717).

Coherence check (not a result): the three builds also measured earlier on the private
original (`ca618ebe…`) get exactly the same counts on this file, at both levels — the
sanitisation removed only identity data, which no assertion reads.

### FAIL by family

| Build | Direct | Round trip |
|---|---|---|
| WS 0308840 | block_entity 16 583 · structure 279 · item_stack 254 · entity 26 | block_entity 41 305 · block 4 167 · entity 1 045 · item_stack 618 · structure 120 · player 52 · world 4 |
| WS 2.8.0 (fd9b735) | block_entity 5 · entity 3 | block 337 · item_stack 252 · entity 177 · block_entity 61 · player 46 · world 3 |
| Chunker 1.20.0 | entity 219 679 · structure 16 000 · item_stack 246 · block_entity 9 · player 5 · block 4 · world 3 | entity 326 395 · structure 16 000 · block 1 458 · item_stack 782 · player 214 · block_entity 125 · world 13 |
| je2be core-8dfc4de | structure 15 784 · block 4 100 · entity 790 · item_stack 81 · player 10 · block_entity 5 | structure 15 784 · block 5 484 · entity 1 771 · item_stack 551 · player 211 · block_entity 14 · world 2 |

### Main groups

- Structures (Chunker 16 000, je2be 15 784 per level): neither writes the structure
  records Java uses to spawn structure mobs (trial chambers, fortresses…); same behaviour as
  on the synthetic worlds for Chunker. WorldSwitch 2.8.0: 0.
- Entities (Chunker ~220 000 / ~326 000): Chunker declares entities unsupported
  (`docs/converters/chunker.md`); the world holds 111 256 actors.
- je2be blocks, 4 096 per level. Bedrock stores a sub-chunk made of a single block as a
  "single-value" storage (0 bits per block, one palette entry). The behaviour was verified
  directly on several representative cases, including the sub-chunk responsible for the
  4 096 observed FAILs (End, chunk −43, 73, y 32–47, end stone, written as air) and three
  overworld sub-chunks (stone, deepslate, sandstone, written as air while WorldSwitch 2.8.0
  keeps them). These observations are consistent with a more general problem affecting
  Bedrock sub-chunks encoded with a single-value palette. The world holds 10 256 such
  sub-chunks; they were not all inspected, and the frozen sample contains one of them.
- je2be host player (10, direct): as on the synthetic worlds, je2be writes the host only
  in `level.dat` (Java 1.21.10 layout) and Java 26.3's own upgrade drops it
  (`docs/converters/je2be.md`) — a target-version behaviour.
- Round trip, all builds: plant ages (`kelp_age`, cave-vine and twisting-vine ages)
  that Bedrock recomputes, stored players not all returned, potion and shulker-box item
  tags, zombie / drowned equipment. WorldSwitch 2.8.0's 876 round-trip FAILs start with
  kelp age (230), splash potion / potion tags (198), zombie / drowned / allay / husk
  equipment (155), sign texts (57), vine ages (53), player game mode "world default" (27)
  and spawn point (17, the spec issue of `reports/root-causes/README.md`); not reviewed
  further in v1.3. WorldSwitch 2.8.0 direct: 8 FAIL (5 block entities, 3 entities).
- WorldSwitch 0308840 → 2.8.0: 17 142 → 8 direct and 47 311 → 876 round trip; the
  families where the earlier private findings listed losses (block entities: sculk,
  spore blossom, flower pot, cauldron; items with pre-1.13 ids; round-trip blocks) drop from
  16 583 / 254 / 4 167 FAIL to 5 / 0 / 337.

No score, no ranking, and these counts are never added to the synthetic worlds'.
