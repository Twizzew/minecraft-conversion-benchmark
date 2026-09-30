# worldswitch — MCCB v1.1 results (counts per assertion)

Read METHODOLOGY.md first. **direct** = in the other edition right after conversion; **behavior** = in game
(v1.1: only "the reference Java game opens the world"); **roundtrip** = back in the source edition after
A → B → A with the same converter. NOT_EVALUATED is not a status: MCCB has no neutral rule for those assertions.
Classes are never added together. There is no global score.

## LAB

### B01@1.0 — bedrock to java (build 0308840)

Direct run `ws-0308840_B01@1.0_b2j`, return run `ws-0308840_B01@1.0_b2j2b`. Detail: `results/worldswitch/ws-0308840_B01@1.0_b2j/results.jsonl.gz` (sha256 `d3f3b1661303cb32…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 239 |  |  |  |  | 2 | 152 |
| block | behavior |  |  |  |  |  |  | 393 |
| block | roundtrip | 388 |  |  | 4 |  |  | 1 |
| block_entity | direct | 70 |  |  | 1 |  | 3 | 65 |
| block_entity | behavior |  |  |  |  |  |  | 139 |
| block_entity | roundtrip | 121 |  | 10 | 8 |  |  |  |
| item_stack | direct | 93 |  |  | 3 |  |  | 13 |
| item_stack | behavior |  |  |  |  |  |  | 109 |
| item_stack | roundtrip | 109 |  |  |  |  |  |  |
| entity | direct | 35 |  |  |  |  |  | 11 |
| entity | behavior |  |  |  |  |  |  | 46 |
| entity | roundtrip | 35 |  | 11 |  |  |  |  |
| world | direct | 36 |  |  |  |  | 8 | 5 |
| world | behavior | 1 |  |  |  |  |  | 48 |
| world | roundtrip | 47 |  |  | 1 |  |  | 1 |
| player | direct | 7 |  |  |  |  |  |  |
| player | behavior |  |  |  |  |  |  | 7 |
| player | roundtrip | 6 |  | 1 |  |  |  |  |
| **all families** | direct | 480 |  |  | 4 |  | 13 | 246 |
| **all families** | roundtrip | 706 |  | 22 | 13 |  |  | 2 |

### B03@1.0 — bedrock to java (build 0308840)

Direct run `ws-0308840_B03@1.0_b2j`, return run `ws-0308840_B03@1.0_b2j2b`. Detail: `results/worldswitch/ws-0308840_B03@1.0_b2j/results.jsonl.gz` (sha256 `fcda111050dc18df…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 145 |  |  |  |  |  | 83 |
| block | behavior |  |  |  |  |  |  | 228 |
| block | roundtrip | 197 |  |  | 26 |  |  | 5 |
| block_entity | direct | 139 |  |  |  |  | 34 | 1424 |
| block_entity | behavior |  |  |  |  |  |  | 1597 |
| block_entity | roundtrip | 255 |  | 40 | 1302 |  |  |  |
| item_stack | direct | 26 |  |  |  |  |  | 2 |
| item_stack | behavior |  |  |  |  |  |  | 28 |
| item_stack | roundtrip | 26 |  |  | 2 |  |  |  |
| entity | direct | 176 |  |  |  |  |  | 60 |
| entity | behavior |  |  |  |  |  |  | 236 |
| entity | roundtrip | 172 |  | 60 | 4 |  |  |  |
| world | direct | 36 | 2 | 1 |  |  | 8 | 5 |
| world | behavior | 1 |  |  |  |  |  | 51 |
| world | roundtrip | 48 |  |  | 3 |  |  | 1 |
| scoreboard | direct | 18 |  |  |  |  |  | 1 |
| scoreboard | behavior |  |  |  |  |  |  | 19 |
| scoreboard | roundtrip | 18 |  |  | 1 |  |  |  |
| player | direct | 6 |  |  |  |  |  |  |
| player | behavior |  |  |  |  |  |  | 6 |
| player | roundtrip | 6 |  |  |  |  |  |  |
| **all families** | direct | 546 | 2 | 1 |  |  | 42 | 1575 |
| **all families** | roundtrip | 722 |  | 100 | 1338 |  |  | 6 |

### J01@1.1 — java to bedrock (build 0308840)

Direct run `ws-0308840_J01@1.1_j2b`, return run `ws-0308840_J01@1.1_j2b2j`. Detail: `results/worldswitch/ws-0308840_J01@1.1_j2b/results.jsonl.gz` (sha256 `72dc371708ca479e…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 44221 |  |  |  |  | 5 | 32102 |
| block | behavior |  |  |  |  |  |  | 76328 |
| block | roundtrip | 64458 | 10246 |  | 1624 |  |  |  |
| block_entity | direct | 7458 |  |  |  |  | 13288 | 6046 |
| block_entity | behavior |  |  |  |  |  |  | 26792 |
| block_entity | roundtrip | 26706 |  | 76 | 10 |  |  |  |
| item_stack | direct | 4224 |  |  |  |  | 12 | 257 |
| item_stack | behavior |  |  |  |  |  |  | 4493 |
| item_stack | roundtrip | 4479 |  |  | 14 |  |  |  |
| entity | direct | 373 |  |  | 1 |  |  | 121 |
| entity | behavior |  |  |  |  |  |  | 495 |
| entity | roundtrip | 411 |  | 84 |  |  |  |  |
| world | direct | 36 |  |  |  |  | 31 | 5 |
| world | behavior |  |  |  |  |  |  | 72 |
| world | roundtrip | 71 |  |  | 1 |  |  |  |
| scoreboard | direct | 47 |  |  |  |  |  |  |
| scoreboard | behavior |  |  |  |  |  |  | 47 |
| scoreboard | roundtrip | 47 |  |  |  |  |  |  |
| custom_dimension | direct |  |  |  |  |  | 2280 |  |
| custom_dimension | behavior |  |  |  |  |  |  | 2280 |
| custom_dimension | roundtrip | 2280 |  |  |  |  |  |  |
| player | direct | 5 |  |  |  |  | 2 |  |
| player | behavior |  |  |  |  |  |  | 7 |
| player | roundtrip | 6 |  |  | 1 |  |  |  |
| **all families** | direct | 56364 |  |  | 1 |  | 15618 | 38531 |
| **all families** | roundtrip | 98458 | 10246 | 160 | 1650 |  |  |  |

### J02@1.0 — java to bedrock (build 0308840)

Direct run `ws-0308840_J02@1.0_j2b`, return run `ws-0308840_J02@1.0_j2b2j`. Detail: `results/worldswitch/ws-0308840_J02@1.0_j2b/results.jsonl.gz` (sha256 `8ae0f2acbc467a2f…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 54 |  |  |  |  |  | 49 |
| block | behavior |  |  |  |  |  |  | 103 |
| block | roundtrip | 103 |  |  |  |  |  |  |
| block_entity | direct | 48 |  |  |  |  |  | 41 |
| block_entity | behavior |  |  |  |  |  |  | 89 |
| block_entity | roundtrip | 69 |  | 20 |  |  |  |  |
| item_stack | direct | 118 |  |  |  |  |  |  |
| item_stack | behavior |  |  |  |  |  |  | 118 |
| item_stack | roundtrip | 118 |  |  |  |  |  |  |
| entity | direct | 1371 |  |  | 1 |  | 35 | 376 |
| entity | behavior |  |  |  |  |  |  | 1783 |
| entity | roundtrip | 1537 |  | 159 | 86 |  |  | 1 |
| world | direct | 36 | 3 |  |  |  | 33 | 5 |
| world | behavior |  |  |  |  |  |  | 77 |
| world | roundtrip | 77 |  |  |  |  |  |  |
| player | direct | 10 |  |  |  |  |  |  |
| player | behavior |  |  |  |  |  |  | 10 |
| player | roundtrip | 10 |  |  |  |  |  |  |
| **all families** | direct | 1637 | 3 |  | 1 |  | 68 | 471 |
| **all families** | roundtrip | 1914 |  | 179 | 86 |  |  | 1 |

### J03@1.0 — java to bedrock (build 0308840)

Direct run `ws-0308840_J03@1.0_j2b`, return run `ws-0308840_J03@1.0_j2b2j`. Detail: `results/worldswitch/ws-0308840_J03@1.0_j2b/results.jsonl.gz` (sha256 `5d20770a764b5a1a…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 229 |  |  |  |  | 52 | 165 |
| block | behavior |  |  |  |  |  |  | 446 |
| block | roundtrip | 393 | 1 |  | 52 |  |  |  |
| block_entity | direct | 86 |  |  |  |  |  | 90 |
| block_entity | behavior |  |  |  |  |  |  | 176 |
| block_entity | roundtrip | 168 |  | 8 |  |  |  |  |
| item_stack | direct | 48 |  |  |  |  |  | 3 |
| item_stack | behavior |  |  |  |  |  |  | 51 |
| item_stack | roundtrip | 51 |  |  |  |  |  |  |
| entity | direct | 70 |  |  |  |  |  | 43 |
| entity | behavior |  |  |  |  |  |  | 113 |
| entity | roundtrip | 98 |  | 15 |  |  |  |  |
| world | direct | 36 | 1 |  |  |  | 35 | 5 |
| world | behavior |  |  |  |  |  |  | 77 |
| world | roundtrip | 74 |  |  | 3 |  |  |  |
| scoreboard | direct | 85 |  |  |  |  | 3 |  |
| scoreboard | behavior |  |  |  |  |  |  | 88 |
| scoreboard | roundtrip | 88 |  |  |  |  |  |  |
| player | direct | 6 |  |  |  |  |  |  |
| player | behavior |  |  |  |  |  |  | 6 |
| player | roundtrip | 6 |  |  |  |  |  |  |
| **all families** | direct | 560 | 1 |  |  |  | 90 | 306 |
| **all families** | roundtrip | 878 | 1 | 23 | 55 |  |  |  |

### J04@1.0 — java to bedrock (build 0308840)

Direct run `ws-0308840_J04@1.0_j2b`, return run `ws-0308840_J04@1.0_j2b2j`. Detail: `results/worldswitch/ws-0308840_J04@1.0_j2b/results.jsonl.gz` (sha256 `e5e7cdbc3641bf2f…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 6170 |  |  |  |  |  | 5667 |
| block | behavior |  |  |  |  |  |  | 11837 |
| block | roundtrip | 11837 |  |  |  |  |  |  |
| block_entity | direct | 9081 |  |  | 32 |  | 90 | 9747 |
| block_entity | behavior |  |  |  |  |  |  | 18950 |
| block_entity | roundtrip | 18537 |  | 413 |  |  |  |  |
| item_stack | direct | 1235 |  |  |  |  |  |  |
| item_stack | behavior |  |  |  |  |  |  | 1235 |
| item_stack | roundtrip | 1235 |  |  |  |  |  |  |
| entity | direct | 1332 |  |  |  |  |  | 470 |
| entity | behavior |  |  |  |  |  |  | 1802 |
| entity | roundtrip | 1745 |  | 57 |  |  |  |  |
| world | direct | 36 | 3 |  |  |  | 34 | 5 |
| world | behavior |  |  |  |  |  |  | 78 |
| world | roundtrip | 76 |  |  | 2 |  |  |  |
| scoreboard | direct | 692 |  |  |  |  |  | 19 |
| scoreboard | behavior |  |  |  |  |  |  | 711 |
| scoreboard | roundtrip | 711 |  |  |  |  |  |  |
| player | direct | 8 |  |  |  |  |  |  |
| player | behavior |  |  |  |  |  |  | 8 |
| player | roundtrip | 8 |  |  |  |  |  |  |
| **all families** | direct | 18554 | 3 |  | 32 |  | 124 | 15908 |
| **all families** | roundtrip | 34149 |  | 470 | 2 |  |  |  |

## MANUAL_NATIVE

### B02@1.0 — bedrock to java (build 0308840)

Direct run `ws-0308840_B02@1.0_b2j`, return run `ws-0308840_B02@1.0_b2j2b`. Detail: `results/worldswitch/ws-0308840_B02@1.0_b2j/results.jsonl.gz` (sha256 `c45ae026ed9343ad…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 297 |  |  |  |  |  | 95 |
| block | behavior |  |  |  |  |  |  | 392 |
| block | roundtrip | 392 |  |  |  |  |  |  |
| block_entity | direct | 10 |  |  |  |  | 42 | 52 |
| block_entity | behavior |  |  |  |  |  |  | 104 |
| block_entity | roundtrip | 100 |  | 4 |  |  |  |  |
| item_stack | direct | 38 |  |  |  |  |  | 12 |
| item_stack | behavior |  |  |  |  |  |  | 50 |
| item_stack | roundtrip | 44 |  |  | 6 |  |  |  |
| entity | direct | 232 |  | 1 | 2 |  | 1 | 76 |
| entity | behavior |  |  |  |  |  |  | 312 |
| entity | roundtrip | 203 |  | 98 | 11 |  |  |  |
| world | direct | 36 |  |  |  |  | 8 | 5 |
| world | behavior | 1 |  |  |  |  |  | 48 |
| world | roundtrip | 47 |  |  | 1 |  |  | 1 |
| player | direct | 10 |  |  |  |  |  | 9 |
| player | behavior |  |  |  |  |  |  | 19 |
| player | roundtrip | 12 |  | 3 | 4 |  |  |  |
| **all families** | direct | 623 |  | 1 | 2 |  | 51 | 249 |
| **all families** | roundtrip | 798 |  | 105 | 22 |  |  | 1 |

## Determinism re-runs

Runs suffixed `_rerun1` repeat a conversion with the same build and options; see reports/oracle-selftests/.

