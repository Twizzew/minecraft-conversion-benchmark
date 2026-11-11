# MCCB v1.1 — converters side by side (counts per assertion)

Each cell: PASS / ADAPTED / PARTIAL / **FAIL** / NOT_EVALUATED (NOT_APPLICABLE omitted). No score, no ranking;
world classes are never added together. Read METHODOLOGY.md and docs/fixture-rules.md first.

Converters: chunker (build 1.20.0), worldswitch (build 030884039c78).

## B01@1.0 — LAB — bedrock to java

| Family | Level | chunker | worldswitch |
|---|---|---|---|
| block | direct | 239 / 0 / 0 / **0** / 152 | 239 / 0 / 0 / **0** / 152 |
| block | roundtrip | 382 / 0 / 0 / **11** / 0 | 388 / 0 / 0 / **4** / 1 |
| block_entity | direct | 70 / 1 / 0 / **0** / 65 | 70 / 0 / 0 / **1** / 65 |
| block_entity | roundtrip | 78 / 0 / 60 / **1** / 0 | 121 / 0 / 10 / **8** / 0 |
| item_stack | direct | 96 / 0 / 0 / **0** / 13 | 93 / 0 / 0 / **3** / 13 |
| item_stack | roundtrip | 109 / 0 / 0 / **0** / 0 | 109 / 0 / 0 / **0** / 0 |
| entity | direct | 0 / 0 / 0 / **35** / 11 | 35 / 0 / 0 / **0** / 11 |
| entity | roundtrip | 0 / 0 / 0 / **46** / 0 | 35 / 0 / 11 / **0** / 0 |
| world | direct | 23 / 0 / 0 / **13** / 5 | 36 / 0 / 0 / **0** / 5 |
| world | roundtrip | 35 / 0 / 0 / **13** / 1 | 47 / 0 / 0 / **1** / 1 |
| player | direct | 4 / 0 / 0 / **3** / 0 | 7 / 0 / 0 / **0** / 0 |
| player | roundtrip | 3 / 0 / 0 / **4** / 0 | 6 / 0 / 1 / **0** / 0 |
| **all** | direct | 432 / 1 / 0 / **51** / 246 | 480 / 0 / 0 / **4** / 246 |
| **all** | roundtrip | 607 / 0 / 60 / **75** / 1 | 706 / 0 / 22 / **13** / 2 |

## B02@1.0 — MANUAL_NATIVE — bedrock to java

| Family | Level | chunker | worldswitch |
|---|---|---|---|
| block | direct | 297 / 0 / 0 / **0** / 95 | 297 / 0 / 0 / **0** / 95 |
| block | roundtrip | 391 / 0 / 0 / **1** / 0 | 392 / 0 / 0 / **0** / 0 |
| block_entity | direct | 10 / 0 / 0 / **0** / 52 | 10 / 0 / 0 / **0** / 52 |
| block_entity | roundtrip | 52 / 0 / 52 / **0** / 0 | 100 / 0 / 4 / **0** / 0 |
| item_stack | direct | 38 / 0 / 0 / **0** / 12 | 38 / 0 / 0 / **0** / 12 |
| item_stack | roundtrip | 43 / 0 / 0 / **7** / 0 | 44 / 0 / 0 / **6** / 0 |
| entity | direct | 0 / 0 / 0 / **235** / 76 | 232 / 0 / 1 / **2** / 76 |
| entity | roundtrip | 0 / 0 / 0 / **312** / 0 | 203 / 0 / 98 / **11** / 0 |
| world | direct | 23 / 0 / 0 / **13** / 5 | 36 / 0 / 0 / **0** / 5 |
| world | roundtrip | 35 / 0 / 0 / **13** / 1 | 47 / 0 / 0 / **1** / 1 |
| player | direct | 5 / 0 / 0 / **5** / 9 | 10 / 0 / 0 / **0** / 9 |
| player | roundtrip | 3 / 0 / 0 / **16** / 0 | 12 / 0 / 3 / **4** / 0 |
| **all** | direct | 373 / 0 / 0 / **253** / 249 | 623 / 0 / 1 / **2** / 249 |
| **all** | roundtrip | 524 / 0 / 52 / **349** / 1 | 798 / 0 / 105 / **22** / 1 |

## B03@1.0 — LAB — bedrock to java

| Family | Level | chunker | worldswitch |
|---|---|---|---|
| block | direct | 145 / 0 / 0 / **0** / 83 | 145 / 0 / 0 / **0** / 83 |
| block | roundtrip | 226 / 0 / 0 / **2** / 0 | 197 / 0 / 0 / **26** / 5 |
| block_entity | direct | 138 / 1 / 0 / **0** / 1424 | 139 / 0 / 0 / **0** / 1424 |
| block_entity | roundtrip | 191 / 0 / 139 / **1267** / 0 | 255 / 0 / 40 / **1302** / 0 |
| item_stack | direct | 26 / 0 / 0 / **0** / 2 | 26 / 0 / 0 / **0** / 2 |
| item_stack | roundtrip | 26 / 0 / 0 / **2** / 0 | 26 / 0 / 0 / **2** / 0 |
| entity | direct | 0 / 0 / 0 / **176** / 60 | 176 / 0 / 0 / **0** / 60 |
| entity | roundtrip | 0 / 0 / 0 / **236** / 0 | 172 / 0 / 60 / **4** / 0 |
| world | direct | 23 / 0 / 0 / **16** / 5 | 36 / 2 / 1 / **0** / 5 |
| world | roundtrip | 35 / 0 / 0 / **16** / 1 | 48 / 0 / 0 / **3** / 1 |
| scoreboard | direct | 0 / 0 / 0 / **18** / 1 | 18 / 0 / 0 / **0** / 1 |
| scoreboard | roundtrip | 0 / 0 / 0 / **19** / 0 | 18 / 0 / 0 / **1** / 0 |
| player | direct | 3 / 0 / 0 / **3** / 0 | 6 / 0 / 0 / **0** / 0 |
| player | roundtrip | 3 / 0 / 0 / **3** / 0 | 6 / 0 / 0 / **0** / 0 |
| **all** | direct | 335 / 1 / 0 / **213** / 1575 | 546 / 2 / 1 / **0** / 1575 |
| **all** | roundtrip | 481 / 0 / 139 / **1545** / 1 | 722 / 0 / 100 / **1338** / 6 |

## J01@1.1 — LAB — java to bedrock

| Family | Level | chunker | worldswitch |
|---|---|---|---|
| block | direct | 44209 / 0 / 0 / **12** / 32102 | 44221 / 0 / 0 / **0** / 32102 |
| block | roundtrip | 59692 / 10349 / 0 / **6287** / 0 | 64458 / 10246 / 0 / **1624** / 0 |
| block_entity | direct | 7455 / 0 / 0 / **3** / 6046 | 7458 / 0 / 0 / **0** / 6046 |
| block_entity | roundtrip | 26610 / 0 / 156 / **26** / 0 | 26706 / 0 / 76 / **10** / 0 |
| item_stack | direct | 4035 / 0 / 0 / **189** / 257 | 4224 / 0 / 0 / **0** / 257 |
| item_stack | roundtrip | 4223 / 0 / 0 / **270** / 0 | 4479 / 0 / 0 / **14** / 0 |
| entity | direct | 0 / 0 / 0 / **374** / 121 | 373 / 0 / 0 / **1** / 121 |
| entity | roundtrip | 0 / 0 / 0 / **495** / 0 | 411 / 0 / 84 / **0** / 0 |
| world | direct | 30 / 0 / 0 / **6** / 5 | 36 / 0 / 0 / **0** / 5 |
| world | roundtrip | 32 / 0 / 0 / **40** / 0 | 71 / 0 / 0 / **1** / 0 |
| scoreboard | direct | 0 / 0 / 0 / **47** / 0 | 47 / 0 / 0 / **0** / 0 |
| scoreboard | roundtrip | 0 / 0 / 0 / **47** / 0 | 47 / 0 / 0 / **0** / 0 |
| custom_dimension | direct | 0 / 0 / 0 / **0** / 0 | 0 / 0 / 0 / **0** / 0 |
| custom_dimension | roundtrip | 1752 / 0 / 528 / **0** / 0 | 2280 / 0 / 0 / **0** / 0 |
| player | direct | 2 / 0 / 0 / **3** / 0 | 5 / 0 / 0 / **0** / 0 |
| player | roundtrip | 4 / 0 / 0 / **3** / 0 | 6 / 0 / 0 / **1** / 0 |
| **all** | direct | 55731 / 0 / 0 / **634** / 38531 | 56364 / 0 / 0 / **1** / 38531 |
| **all** | roundtrip | 92313 / 10349 / 684 / **7168** / 0 | 98458 / 10246 / 160 / **1650** / 0 |

## J02@1.0 — LAB — java to bedrock

| Family | Level | chunker | worldswitch |
|---|---|---|---|
| block | direct | 54 / 0 / 0 / **0** / 49 | 54 / 0 / 0 / **0** / 49 |
| block | roundtrip | 103 / 0 / 0 / **0** / 0 | 103 / 0 / 0 / **0** / 0 |
| block_entity | direct | 48 / 0 / 0 / **0** / 41 | 48 / 0 / 0 / **0** / 41 |
| block_entity | roundtrip | 75 / 0 / 14 / **0** / 0 | 69 / 0 / 20 / **0** / 0 |
| item_stack | direct | 118 / 0 / 0 / **0** / 0 | 118 / 0 / 0 / **0** / 0 |
| item_stack | roundtrip | 118 / 0 / 0 / **0** / 0 | 118 / 0 / 0 / **0** / 0 |
| entity | direct | 2 / 0 / 0 / **1371** / 375 | 1371 / 0 / 0 / **1** / 376 |
| entity | roundtrip | 2 / 0 / 2 / **1779** / 0 | 1537 / 0 / 159 / **86** / 1 |
| world | direct | 29 / 0 / 0 / **10** / 5 | 36 / 3 / 0 / **0** / 5 |
| world | roundtrip | 33 / 0 / 0 / **44** / 0 | 77 / 0 / 0 / **0** / 0 |
| player | direct | 5 / 0 / 0 / **5** / 0 | 10 / 0 / 0 / **0** / 0 |
| player | roundtrip | 5 / 0 / 0 / **5** / 0 | 10 / 0 / 0 / **0** / 0 |
| **all** | direct | 256 / 0 / 0 / **1386** / 470 | 1637 / 3 / 0 / **1** / 471 |
| **all** | roundtrip | 336 / 0 / 16 / **1828** / 0 | 1914 / 0 / 179 / **86** / 1 |

## J03@1.0 — LAB — java to bedrock

| Family | Level | chunker | worldswitch |
|---|---|---|---|
| block | direct | 229 / 0 / 0 / **0** / 165 | 229 / 0 / 0 / **0** / 165 |
| block | roundtrip | 444 / 2 / 0 / **0** / 0 | 393 / 1 / 0 / **52** / 0 |
| block_entity | direct | 87 / 0 / 0 / **0** / 89 | 86 / 0 / 0 / **0** / 90 |
| block_entity | roundtrip | 156 / 0 / 20 / **0** / 0 | 168 / 0 / 8 / **0** / 0 |
| item_stack | direct | 48 / 0 / 0 / **0** / 3 | 48 / 0 / 0 / **0** / 3 |
| item_stack | roundtrip | 51 / 0 / 0 / **0** / 0 | 51 / 0 / 0 / **0** / 0 |
| entity | direct | 0 / 0 / 0 / **70** / 43 | 70 / 0 / 0 / **0** / 43 |
| entity | roundtrip | 0 / 0 / 0 / **113** / 0 | 98 / 0 / 15 / **0** / 0 |
| world | direct | 27 / 0 / 0 / **10** / 5 | 36 / 1 / 0 / **0** / 5 |
| world | roundtrip | 30 / 0 / 0 / **47** / 0 | 74 / 0 / 0 / **3** / 0 |
| scoreboard | direct | 0 / 0 / 0 / **85** / 0 | 85 / 0 / 0 / **0** / 0 |
| scoreboard | roundtrip | 0 / 0 / 0 / **88** / 0 | 88 / 0 / 0 / **0** / 0 |
| player | direct | 3 / 0 / 0 / **3** / 0 | 6 / 0 / 0 / **0** / 0 |
| player | roundtrip | 3 / 0 / 0 / **3** / 0 | 6 / 0 / 0 / **0** / 0 |
| **all** | direct | 394 / 0 / 0 / **168** / 305 | 560 / 1 / 0 / **0** / 306 |
| **all** | roundtrip | 684 / 2 / 20 / **251** / 0 | 878 / 1 / 23 / **55** / 0 |

## J04@1.0 — LAB — java to bedrock

| Family | Level | chunker | worldswitch |
|---|---|---|---|
| block | direct | 6170 / 0 / 0 / **0** / 5667 | 6170 / 0 / 0 / **0** / 5667 |
| block | roundtrip | 11837 / 0 / 0 / **0** / 0 | 11837 / 0 / 0 / **0** / 0 |
| block_entity | direct | 9795 / 0 / 0 / **0** / 9065 | 9081 / 0 / 0 / **32** / 9747 |
| block_entity | roundtrip | 18541 / 0 / 409 / **0** / 0 | 18537 / 0 / 413 / **0** / 0 |
| item_stack | direct | 1235 / 0 / 0 / **0** / 0 | 1235 / 0 / 0 / **0** / 0 |
| item_stack | roundtrip | 835 / 0 / 0 / **400** / 0 | 1235 / 0 / 0 / **0** / 0 |
| entity | direct | 0 / 0 / 0 / **1332** / 470 | 1332 / 0 / 0 / **0** / 470 |
| entity | roundtrip | 0 / 0 / 0 / **1802** / 0 | 1745 / 0 / 57 / **0** / 0 |
| world | direct | 29 / 0 / 0 / **10** / 5 | 36 / 3 / 0 / **0** / 5 |
| world | roundtrip | 32 / 0 / 0 / **46** / 0 | 76 / 0 / 0 / **2** / 0 |
| scoreboard | direct | 0 / 0 / 0 / **692** / 19 | 692 / 0 / 0 / **0** / 19 |
| scoreboard | roundtrip | 0 / 0 / 0 / **711** / 0 | 711 / 0 / 0 / **0** / 0 |
| player | direct | 4 / 0 / 0 / **4** / 0 | 8 / 0 / 0 / **0** / 0 |
| player | roundtrip | 4 / 0 / 0 / **4** / 0 | 8 / 0 / 0 / **0** / 0 |
| **all** | direct | 17233 / 0 / 0 / **2038** / 15226 | 18554 / 3 / 0 / **32** / 15908 |
| **all** | roundtrip | 31249 / 0 / 409 / **2963** / 0 | 34149 / 0 / 470 / **2** / 0 |

