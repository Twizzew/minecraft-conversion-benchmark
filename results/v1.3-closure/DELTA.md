# Corrected rescoring vs historical grading — computed from results.jsonl.gz

Worlds: J01@1.1, J02@1.0, J03@1.0, J04@1.0, B01@1.0, B02@1.0, B03@1.0. Scorer | ruleset | mode | Java oracle authenticated: `df6247a67714c7ae936fe78686139ccaa00234be19761d45ea5aab067e4587d8|e2030dcdb8f47c41a3263305301004551e9429ddca87e42a6798a2975c1dd105|official|true`.

Counts per assertion. The sums over several worlds below only account for the changes made by the rescoring; they are not a result (METHODOLOGY: worlds are never added together, no score). "Δ" = corrected − historical.

## Accounting sums over 7 worlds, direct conversion

| Converter | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED | total |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| WS 0308840 | 78 801 | 9 | 2 | 87 | 0 | 16 006 | 59 094 | 153 999 |
| WS 2.8.0 (fd9b735) | 78 858 | 9 | 1 | 31 | 0 | 16 006 | 59 094 | 153 999 |
| Chunker 1.20.0 | 74 637 | 2 | 0 | 4 895 | 0 | 16 006 | 58 459 | 153 999 |
| je2be core-8dfc4de | 1 718 | 0 | 0 | 81 739 | 0 | 16 006 | 54 536 | 153 999 |

| Δ | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|--:|--:|--:|--:|--:|--:|--:|
| WS 0308840 | −42 | 0 | 0 | +39 | 0 | 0 | +3 |
| WS 2.8.0 (fd9b735) | −4 | 0 | 0 | +1 | 0 | 0 | +3 |
| Chunker 1.20.0 | −36 | 0 | 0 | +34 | 0 | 0 | +2 |
| je2be core-8dfc4de | −1 | 0 | 0 | 0 | 0 | 0 | +1 |

## Accounting sums over 7 worlds, round trip

| Converter | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED | total |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| WS 0308840 | 139 370 | 10 247 | 1 038 | 1 870 | 0 | 0 | 1 474 | 153 999 |
| WS 2.8.0 (fd9b735) | 139 493 | 10 247 | 1 036 | 1 749 | 0 | 0 | 1 474 | 153 999 |
| Chunker 1.20.0 | 126 343 | 10 351 | 1 290 | 14 543 | 0 | 0 | 1 472 | 153 999 |
| je2be core-8dfc4de | 2 488 | 0 | 184 | 149 856 | 0 | 0 | 1 471 | 153 999 |

| Δ | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|--:|--:|--:|--:|--:|--:|--:|
| WS 0308840 | −44 | 0 | +35 | +7 | 0 | 0 | +2 |
| WS 2.8.0 (fd9b735) | −40 | 0 | +37 | +1 | 0 | 0 | +2 |
| Chunker 1.20.0 | −117 | 0 | +74 | +42 | 0 | 0 | +1 |
| je2be core-8dfc4de | −15 | 0 | +15 | 0 | 0 | 0 | 0 |

## Per world, direct conversion — PASS / ADAPTED / PARTIAL / **FAIL** — NA · NE (FAIL: historical → corrected)

| World | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|---|---|---|---|
| J01 | 56 364 / 0 / 0 / **2** — NA 15 618 · NE 39 151 (2 → 2) | 56 366 / 0 / 0 / **0** — NA 15 618 · NE 39 151 (0 → 0) | 55 732 / 0 / 0 / **634** — NA 15 618 · NE 39 151 (634 → 634) | 34 / 0 / 0 / **56 332** — NA 15 618 · NE 39 151 (56 332 → 56 332) |
| J02 | 1 640 / 3 / 0 / **5** — NA 68 · NE 826 (4 → 5) | 1 643 / 3 / 0 / **2** — NA 68 · NE 826 (1 → 2) | 258 / 0 / 0 / **1 391** — NA 68 · NE 825 (1 391 → 1 391) | 32 / 0 / 0 / **1 618** — NA 68 · NE 824 (1 618 → 1 618) |
| J03 | 706 / 1 / 0 / **7** — NA 90 · NE 516 (3 → 7) | 713 / 1 / 0 / **0** — NA 90 · NE 516 (0 → 0) | 397 / 0 / 0 / **318** — NA 90 · NE 515 (318 → 318) | 26 / 0 / 0 / **712** — NA 90 · NE 492 (712 → 712) |
| J04 | 18 477 / 3 / 0 / **35** — NA 124 · NE 16 533 (35 → 35) | 18 483 / 3 / 0 / **29** — NA 124 · NE 16 533 (29 → 29) | 17 109 / 0 / 0 / **2 038** — NA 124 · NE 15 901 (2 038 → 2 038) | 33 / 0 / 0 / **23 013** — NA 124 · NE 12 002 (23 013 → 23 013) |
| B01 | 480 / 0 / 0 / **4** — NA 13 · NE 246 (4 → 4) | 484 / 0 / 0 / **0** — NA 13 · NE 246 (0 → 0) | 444 / 1 / 0 / **39** — NA 13 · NE 246 (39 → 39) | 476 / 0 / 0 / **8** — NA 13 · NE 246 (8 → 8) |
| B02 | 587 / 0 / 1 / **34** — NA 51 · NE 247 (0 → 34) | 622 / 0 / 0 / **0** — NA 51 · NE 247 (0 → 0) | 350 / 0 / 0 / **273** — NA 51 · NE 246 (239 → 273) | 601 / 0 / 0 / **22** — NA 51 · NE 246 (22 → 22) |
| B03 | 547 / 2 / 1 / **0** — NA 42 · NE 1 575 (0 → 0) | 547 / 2 / 1 / **0** — NA 42 · NE 1 575 (0 → 0) | 347 / 1 / 0 / **202** — NA 42 · NE 1 575 (202 → 202) | 516 / 0 / 0 / **34** — NA 42 · NE 1 575 (34 → 34) |

## Per world, round trip — PASS / ADAPTED / PARTIAL / **FAIL** — NA · NE (FAIL: historical → corrected)

| World | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|---|---|---|---|
| J01 | 99 078 / 10 246 / 160 / **1 650** — NA 0 · NE 1 (1 650 → 1 650) | 99 083 / 10 246 / 160 / **1 645** — NA 0 · NE 1 (1 645 → 1 645) | 92 325 / 10 349 / 709 / **7 751** — NA 0 · NE 1 (7 751 → 7 751) | 64 / 0 / 0 / **111 070** — NA 0 · NE 1 (111 070 → 111 070) |
| J02 | 2 263 / 0 / 181 / **89** — NA 0 · NE 9 (89 → 89) | 2 315 / 0 / 181 / **37** — NA 0 · NE 9 (37 → 37) | 373 / 0 / 16 / **2 145** — NA 0 · NE 8 (2 145 → 2 145) | 61 / 0 / 0 / **2 474** — NA 0 · NE 7 (2 474 → 2 474) |
| J03 | 1 224 / 1 / 17 / **58** — NA 0 · NE 20 (58 → 58) | 1 227 / 1 / 17 / **55** — NA 0 · NE 20 (55 → 55) | 720 / 2 / 19 / **559** — NA 0 · NE 20 (559 → 559) | 54 / 0 / 0 / **1 246** — NA 0 · NE 20 (1 246 → 1 246) |
| J04 | 34 585 / 0 / 451 / **4** — NA 0 · NE 132 (4 → 4) | 34 589 / 0 / 451 / **0** — NA 0 · NE 132 (0 → 0) | 31 278 / 0 / 405 / **3 357** — NA 0 · NE 132 (3 357 → 3 357) | 63 / 0 / 0 / **34 977** — NA 0 · NE 132 (34 977 → 34 977) |
| B01 | 703 / 0 / 26 / **13** — NA 0 · NE 1 (13 → 13) | 713 / 0 / 26 / **3** — NA 0 · NE 1 (3 → 3) | 621 / 0 / 46 / **75** — NA 0 · NE 1 (74 → 75) | 696 / 0 / 25 / **21** — NA 0 · NE 1 (21 → 21) |
| B02 | 796 / 0 / 103 / **13** — NA 0 · NE 8 (10 → 13) | 803 / 0 / 104 / **5** — NA 0 · NE 8 (4 → 5) | 528 / 0 / 9 / **376** — NA 0 · NE 7 (335 → 376) | 811 / 0 / 71 / **31** — NA 0 · NE 7 (31 → 31) |
| B03 | 721 / 0 / 100 / **43** — NA 0 · NE 1 303 (39 → 43) | 763 / 0 / 97 / **4** — NA 0 · NE 1 303 (4 → 4) | 498 / 0 / 86 / **280** — NA 0 · NE 1 303 (280 → 280) | 739 / 0 / 88 / **37** — NA 0 · NE 1 303 (37 → 37) |

## Verdict transitions (historical → corrected)

### WS 0308840

- block_entity.data | roundtrip | PASS -> PARTIAL: 4
- entity.data | roundtrip | PASS -> PARTIAL: 30
- entity.equipment | direct | PASS -> FAIL: 1
- entity.equipment | roundtrip | PASS -> PARTIAL: 1
- entity.inventory | direct | PASS -> NOT_EVALUATED: 1
- item_stack.component:minecraft:custom_name | direct | PASS -> FAIL: 1
- item_stack.component:minecraft:damage | direct | PASS -> FAIL: 3
- item_stack.component:minecraft:repair_cost | direct | PASS -> FAIL: 6
- item_stack.count | direct | PASS -> FAIL: 14
- item_stack.count | roundtrip | PASS -> FAIL: 2
- item_stack.identity | direct | PASS -> FAIL: 14
- item_stack.identity | roundtrip | PASS -> FAIL: 5
- player.armor | direct | PASS -> NOT_EVALUATED: 2
- player.armor | roundtrip | PASS -> NOT_EVALUATED: 2

### WS 2.8.0 (fd9b735)

- block_entity.data | roundtrip | PASS -> PARTIAL: 4
- entity.data | roundtrip | PASS -> PARTIAL: 32
- entity.equipment | direct | PASS -> FAIL: 1
- entity.equipment | roundtrip | PASS -> FAIL: 1
- entity.equipment | roundtrip | PASS -> PARTIAL: 1
- entity.inventory | direct | PASS -> NOT_EVALUATED: 1
- player.armor | direct | PASS -> NOT_EVALUATED: 2
- player.armor | roundtrip | PASS -> NOT_EVALUATED: 2

### Chunker 1.20.0

- block_entity.data | roundtrip | PASS -> PARTIAL: 77
- item_stack.aux | roundtrip | PASS -> FAIL: 1
- item_stack.component:minecraft:custom_name | direct | PASS -> FAIL: 1
- item_stack.component:minecraft:custom_name | roundtrip | PASS -> FAIL: 1
- item_stack.component:minecraft:damage | direct | PASS -> FAIL: 3
- item_stack.component:minecraft:damage | roundtrip | PASS -> FAIL: 3
- item_stack.component:minecraft:repair_cost | direct | PASS -> FAIL: 6
- item_stack.component:minecraft:repair_cost | roundtrip | PASS -> FAIL: 6
- item_stack.count | direct | PASS -> FAIL: 12
- item_stack.count | roundtrip | PASS -> FAIL: 12
- item_stack.identity | direct | PASS -> FAIL: 12
- item_stack.identity | roundtrip | PASS -> FAIL: 12
- item_stack.tag | roundtrip | PASS -> FAIL: 4
- player.armor | direct | PASS -> NOT_EVALUATED: 2
- player.armor | roundtrip | PARTIAL -> FAIL: 1
- player.armor | roundtrip | PASS -> NOT_EVALUATED: 1
- player.inventory | roundtrip | PARTIAL -> FAIL: 2

### je2be core-8dfc4de

- block_entity.data | roundtrip | PASS -> PARTIAL: 5
- entity.data | roundtrip | PASS -> PARTIAL: 10
- entity.inventory | direct | PASS -> NOT_EVALUATED: 1

## Checks

- assertion set vs historical: identical in every cell
- same assertion set for the four converters of each world: yes
- transitions add up to the deltas: yes
- notes: none
- problems: none
