# chunker — MCCB v1.1 results (counts per assertion)

Read METHODOLOGY.md first. **direct** = in the other edition right after conversion; **behavior** = in game
(v1.1: only "the reference Java game opens the world"); **roundtrip** = back in the source edition after
A → B → A with the same converter. NOT_EVALUATED is not a status: MCCB has no neutral rule for those assertions.
Classes are never added together. There is no global score.

## LAB

### B01@1.0 — bedrock to java (build 1.20.0)

Direct run `chunker-1.20.0_B01@1.0_b2j`, return run `chunker-1.20.0_B01@1.0_b2j2b`. Detail: `results/chunker/chunker-1.20.0_B01@1.0_b2j/results.jsonl.gz` (sha256 `cc08ac5c7525b920…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 239 |  |  |  |  | 2 | 152 |
| block | behavior |  |  |  |  |  |  | 393 |
| block | roundtrip | 382 |  |  | 11 |  |  |  |
| block_entity | direct | 70 | 1 |  |  |  | 3 | 65 |
| block_entity | behavior |  |  |  |  |  |  | 139 |
| block_entity | roundtrip | 78 |  | 60 | 1 |  |  |  |
| item_stack | direct | 96 |  |  |  |  |  | 13 |
| item_stack | behavior |  |  |  |  |  |  | 109 |
| item_stack | roundtrip | 109 |  |  |  |  |  |  |
| entity | direct |  |  |  | 35 |  |  | 11 |
| entity | behavior |  |  |  |  |  |  | 46 |
| entity | roundtrip |  |  |  | 46 |  |  |  |
| world | direct | 23 |  |  | 13 |  | 8 | 5 |
| world | behavior | 1 |  |  |  |  |  | 48 |
| world | roundtrip | 35 |  |  | 13 |  |  | 1 |
| player | direct | 4 |  |  | 3 |  |  |  |
| player | behavior |  |  |  |  |  |  | 7 |
| player | roundtrip | 3 |  |  | 4 |  |  |  |
| **all families** | direct | 432 | 1 |  | 51 |  | 13 | 246 |
| **all families** | roundtrip | 607 |  | 60 | 75 |  |  | 1 |

### B03@1.0 — bedrock to java (build 1.20.0)

Direct run `chunker-1.20.0_B03@1.0_b2j`, return run `chunker-1.20.0_B03@1.0_b2j2b`. Detail: `results/chunker/chunker-1.20.0_B03@1.0_b2j/results.jsonl.gz` (sha256 `85206b24880c8902…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 145 |  |  |  |  |  | 83 |
| block | behavior |  |  |  |  |  |  | 228 |
| block | roundtrip | 226 |  |  | 2 |  |  |  |
| block_entity | direct | 138 | 1 |  |  |  | 34 | 1424 |
| block_entity | behavior |  |  |  |  |  |  | 1597 |
| block_entity | roundtrip | 191 |  | 139 | 1267 |  |  |  |
| item_stack | direct | 26 |  |  |  |  |  | 2 |
| item_stack | behavior |  |  |  |  |  |  | 28 |
| item_stack | roundtrip | 26 |  |  | 2 |  |  |  |
| entity | direct |  |  |  | 176 |  |  | 60 |
| entity | behavior |  |  |  |  |  |  | 236 |
| entity | roundtrip |  |  |  | 236 |  |  |  |
| world | direct | 23 |  |  | 16 |  | 8 | 5 |
| world | behavior | 1 |  |  |  |  |  | 51 |
| world | roundtrip | 35 |  |  | 16 |  |  | 1 |
| scoreboard | direct |  |  |  | 18 |  |  | 1 |
| scoreboard | behavior |  |  |  |  |  |  | 19 |
| scoreboard | roundtrip |  |  |  | 19 |  |  |  |
| player | direct | 3 |  |  | 3 |  |  |  |
| player | behavior |  |  |  |  |  |  | 6 |
| player | roundtrip | 3 |  |  | 3 |  |  |  |
| **all families** | direct | 335 | 1 |  | 213 |  | 42 | 1575 |
| **all families** | roundtrip | 481 |  | 139 | 1545 |  |  | 1 |

### J01@1.1 — java to bedrock (build 1.20.0)

Direct run `chunker-1.20.0_J01@1.1_j2b`, return run `chunker-1.20.0_J01@1.1_j2b2j`. Detail: `results/chunker/chunker-1.20.0_J01@1.1_j2b/results.jsonl.gz` (sha256 `79a83ea2e6003036…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 44209 |  |  | 12 |  | 5 | 32102 |
| block | behavior |  |  |  |  |  |  | 76328 |
| block | roundtrip | 59692 | 10349 |  | 6287 |  |  |  |
| block_entity | direct | 7455 |  |  | 3 |  | 13288 | 6046 |
| block_entity | behavior |  |  |  |  |  |  | 26792 |
| block_entity | roundtrip | 26610 |  | 156 | 26 |  |  |  |
| item_stack | direct | 4035 |  |  | 189 |  | 12 | 257 |
| item_stack | behavior |  |  |  |  |  |  | 4493 |
| item_stack | roundtrip | 4223 |  |  | 270 |  |  |  |
| entity | direct |  |  |  | 374 |  |  | 121 |
| entity | behavior |  |  |  |  |  |  | 495 |
| entity | roundtrip |  |  |  | 495 |  |  |  |
| world | direct | 30 |  |  | 6 |  | 31 | 5 |
| world | behavior |  |  |  |  |  |  | 72 |
| world | roundtrip | 32 |  |  | 40 |  |  |  |
| scoreboard | direct |  |  |  | 47 |  |  |  |
| scoreboard | behavior |  |  |  |  |  |  | 47 |
| scoreboard | roundtrip |  |  |  | 47 |  |  |  |
| custom_dimension | direct |  |  |  |  |  | 2280 |  |
| custom_dimension | behavior |  |  |  |  |  |  | 2280 |
| custom_dimension | roundtrip | 1752 |  | 528 |  |  |  |  |
| player | direct | 2 |  |  | 3 |  | 2 |  |
| player | behavior |  |  |  |  |  |  | 7 |
| player | roundtrip | 4 |  |  | 3 |  |  |  |
| **all families** | direct | 55731 |  |  | 634 |  | 15618 | 38531 |
| **all families** | roundtrip | 92313 | 10349 | 684 | 7168 |  |  |  |

### J02@1.0 — java to bedrock (build 1.20.0)

Direct run `chunker-1.20.0_J02@1.0_j2b`, return run `chunker-1.20.0_J02@1.0_j2b2j`. Detail: `results/chunker/chunker-1.20.0_J02@1.0_j2b/results.jsonl.gz` (sha256 `72fbf604163bb12c…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 54 |  |  |  |  |  | 49 |
| block | behavior |  |  |  |  |  |  | 103 |
| block | roundtrip | 103 |  |  |  |  |  |  |
| block_entity | direct | 48 |  |  |  |  |  | 41 |
| block_entity | behavior |  |  |  |  |  |  | 89 |
| block_entity | roundtrip | 75 |  | 14 |  |  |  |  |
| item_stack | direct | 118 |  |  |  |  |  |  |
| item_stack | behavior |  |  |  |  |  |  | 118 |
| item_stack | roundtrip | 118 |  |  |  |  |  |  |
| entity | direct | 2 |  |  | 1371 |  | 35 | 375 |
| entity | behavior |  |  |  |  |  |  | 1783 |
| entity | roundtrip | 2 |  | 2 | 1779 |  |  |  |
| world | direct | 29 |  |  | 10 |  | 33 | 5 |
| world | behavior |  |  |  |  |  |  | 77 |
| world | roundtrip | 33 |  |  | 44 |  |  |  |
| player | direct | 5 |  |  | 5 |  |  |  |
| player | behavior |  |  |  |  |  |  | 10 |
| player | roundtrip | 5 |  |  | 5 |  |  |  |
| **all families** | direct | 256 |  |  | 1386 |  | 68 | 470 |
| **all families** | roundtrip | 336 |  | 16 | 1828 |  |  |  |

### J03@1.0 — java to bedrock (build 1.20.0)

Direct run `chunker-1.20.0_J03@1.0_j2b`, return run `chunker-1.20.0_J03@1.0_j2b2j`. Detail: `results/chunker/chunker-1.20.0_J03@1.0_j2b/results.jsonl.gz` (sha256 `d0ed070b60e86134…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 229 |  |  |  |  | 52 | 165 |
| block | behavior |  |  |  |  |  |  | 446 |
| block | roundtrip | 444 | 2 |  |  |  |  |  |
| block_entity | direct | 87 |  |  |  |  |  | 89 |
| block_entity | behavior |  |  |  |  |  |  | 176 |
| block_entity | roundtrip | 156 |  | 20 |  |  |  |  |
| item_stack | direct | 48 |  |  |  |  |  | 3 |
| item_stack | behavior |  |  |  |  |  |  | 51 |
| item_stack | roundtrip | 51 |  |  |  |  |  |  |
| entity | direct |  |  |  | 70 |  |  | 43 |
| entity | behavior |  |  |  |  |  |  | 113 |
| entity | roundtrip |  |  |  | 113 |  |  |  |
| world | direct | 27 |  |  | 10 |  | 35 | 5 |
| world | behavior |  |  |  |  |  |  | 77 |
| world | roundtrip | 30 |  |  | 47 |  |  |  |
| scoreboard | direct |  |  |  | 85 |  | 3 |  |
| scoreboard | behavior |  |  |  |  |  |  | 88 |
| scoreboard | roundtrip |  |  |  | 88 |  |  |  |
| player | direct | 3 |  |  | 3 |  |  |  |
| player | behavior |  |  |  |  |  |  | 6 |
| player | roundtrip | 3 |  |  | 3 |  |  |  |
| **all families** | direct | 394 |  |  | 168 |  | 90 | 305 |
| **all families** | roundtrip | 684 | 2 | 20 | 251 |  |  |  |

### J04@1.0 — java to bedrock (build 1.20.0)

Direct run `chunker-1.20.0_J04@1.0_j2b`, return run `chunker-1.20.0_J04@1.0_j2b2j`. Detail: `results/chunker/chunker-1.20.0_J04@1.0_j2b/results.jsonl.gz` (sha256 `c190450c8e9535dd…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 6170 |  |  |  |  |  | 5667 |
| block | behavior |  |  |  |  |  |  | 11837 |
| block | roundtrip | 11837 |  |  |  |  |  |  |
| block_entity | direct | 9795 |  |  |  |  | 90 | 9065 |
| block_entity | behavior |  |  |  |  |  |  | 18950 |
| block_entity | roundtrip | 18541 |  | 409 |  |  |  |  |
| item_stack | direct | 1235 |  |  |  |  |  |  |
| item_stack | behavior |  |  |  |  |  |  | 1235 |
| item_stack | roundtrip | 835 |  |  | 400 |  |  |  |
| entity | direct |  |  |  | 1332 |  |  | 470 |
| entity | behavior |  |  |  |  |  |  | 1802 |
| entity | roundtrip |  |  |  | 1802 |  |  |  |
| world | direct | 29 |  |  | 10 |  | 34 | 5 |
| world | behavior |  |  |  |  |  |  | 78 |
| world | roundtrip | 32 |  |  | 46 |  |  |  |
| scoreboard | direct |  |  |  | 692 |  |  | 19 |
| scoreboard | behavior |  |  |  |  |  |  | 711 |
| scoreboard | roundtrip |  |  |  | 711 |  |  |  |
| player | direct | 4 |  |  | 4 |  |  |  |
| player | behavior |  |  |  |  |  |  | 8 |
| player | roundtrip | 4 |  |  | 4 |  |  |  |
| **all families** | direct | 17233 |  |  | 2038 |  | 124 | 15226 |
| **all families** | roundtrip | 31249 |  | 409 | 2963 |  |  |  |

## MANUAL_NATIVE

### B02@1.0 — bedrock to java (build 1.20.0)

Direct run `chunker-1.20.0_B02@1.0_b2j`, return run `chunker-1.20.0_B02@1.0_b2j2b`. Detail: `results/chunker/chunker-1.20.0_B02@1.0_b2j/results.jsonl.gz` (sha256 `6550bb99a9e53e94…`).

| Family | Level | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | NOT_APPLICABLE | NOT_EVALUATED |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| block | direct | 297 |  |  |  |  |  | 95 |
| block | behavior |  |  |  |  |  |  | 392 |
| block | roundtrip | 391 |  |  | 1 |  |  |  |
| block_entity | direct | 10 |  |  |  |  | 42 | 52 |
| block_entity | behavior |  |  |  |  |  |  | 104 |
| block_entity | roundtrip | 52 |  | 52 |  |  |  |  |
| item_stack | direct | 38 |  |  |  |  |  | 12 |
| item_stack | behavior |  |  |  |  |  |  | 50 |
| item_stack | roundtrip | 43 |  |  | 7 |  |  |  |
| entity | direct |  |  |  | 235 |  | 1 | 76 |
| entity | behavior |  |  |  |  |  |  | 312 |
| entity | roundtrip |  |  |  | 312 |  |  |  |
| world | direct | 23 |  |  | 13 |  | 8 | 5 |
| world | behavior | 1 |  |  |  |  |  | 48 |
| world | roundtrip | 35 |  |  | 13 |  |  | 1 |
| player | direct | 5 |  |  | 5 |  |  | 9 |
| player | behavior |  |  |  |  |  |  | 19 |
| player | roundtrip | 3 |  |  | 16 |  |  |  |
| **all families** | direct | 373 |  |  | 253 |  | 51 | 249 |
| **all families** | roundtrip | 524 |  | 52 | 349 |  |  | 1 |

## Determinism re-runs

Runs suffixed `_rerun1` repeat a conversion with the same build and options; see reports/oracle-selftests/.

