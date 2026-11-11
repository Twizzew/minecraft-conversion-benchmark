# MCCB v1.3 — final comparison (counts per assertion)

Cell: PASS / ADAPTED / PARTIAL / **FAIL** — then NOT_EVALUATED (never counted as PASS). NOT_APPLICABLE and UNSUPPORTED are in the raw results.
No score, no ranking; worlds are never added together.

Builds: WS 0308840 · WS 2.8.0 (fd9b735) · Chunker 1.20.0 · je2be core-8dfc4de.

## Direct conversion

| World | assertions | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|--:|---|---|---|---|
| J01 | 111135 | 56364 / 0 / 0 / **2** — NE 39151 | 56366 / 0 / 0 / **0** — NE 39151 | 55732 / 0 / 0 / **634** — NE 39151 | 34 / 0 / 0 / **56332** — NE 39151 |
| J02 | 2542 | 1640 / 3 / 0 / **5** — NE 826 | 1643 / 3 / 0 / **2** — NE 826 | 258 / 0 / 0 / **1391** — NE 825 | 32 / 0 / 0 / **1618** — NE 824 |
| J03 | 1320 | 706 / 1 / 0 / **7** — NE 516 | 713 / 1 / 0 / **0** — NE 516 | 397 / 0 / 0 / **318** — NE 515 | 26 / 0 / 0 / **712** — NE 492 |
| J04 | 35172 | 18477 / 3 / 0 / **35** — NE 16533 | 18483 / 3 / 0 / **29** — NE 16533 | 17109 / 0 / 0 / **2038** — NE 15901 | 33 / 0 / 0 / **23013** — NE 12002 |
| B01 | 743 | 480 / 0 / 0 / **4** — NE 246 | 484 / 0 / 0 / **0** — NE 246 | 444 / 1 / 0 / **39** — NE 246 | 476 / 0 / 0 / **8** — NE 246 |
| B02 | 920 | 587 / 0 / 1 / **34** — NE 247 | 622 / 0 / 0 / **0** — NE 247 | 350 / 0 / 0 / **273** — NE 246 | 601 / 0 / 0 / **22** — NE 246 |
| B03 | 2167 | 547 / 2 / 1 / **0** — NE 1575 | 547 / 2 / 1 / **0** — NE 1575 | 347 / 1 / 0 / **202** — NE 1575 | 516 / 0 / 0 / **34** — NE 1575 |

## Round trip

| World | assertions | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|--:|---|---|---|---|
| J01 | 111135 | 99078 / 10246 / 160 / **1650** — NE 1 | 99083 / 10246 / 160 / **1645** — NE 1 | 92325 / 10349 / 709 / **7751** — NE 1 | 64 / 0 / 0 / **111070** — NE 1 |
| J02 | 2542 | 2263 / 0 / 181 / **89** — NE 9 | 2315 / 0 / 181 / **37** — NE 9 | 373 / 0 / 16 / **2145** — NE 8 | 61 / 0 / 0 / **2474** — NE 7 |
| J03 | 1320 | 1224 / 1 / 17 / **58** — NE 20 | 1227 / 1 / 17 / **55** — NE 20 | 720 / 2 / 19 / **559** — NE 20 | 54 / 0 / 0 / **1246** — NE 20 |
| J04 | 35172 | 34585 / 0 / 451 / **4** — NE 132 | 34589 / 0 / 451 / **0** — NE 132 | 31278 / 0 / 405 / **3357** — NE 132 | 63 / 0 / 0 / **34977** — NE 132 |
| B01 | 743 | 703 / 0 / 26 / **13** — NE 1 | 713 / 0 / 26 / **3** — NE 1 | 621 / 0 / 46 / **75** — NE 1 | 696 / 0 / 25 / **21** — NE 1 |
| B02 | 920 | 796 / 0 / 103 / **13** — NE 8 | 803 / 0 / 104 / **5** — NE 8 | 528 / 0 / 9 / **376** — NE 7 | 811 / 0 / 71 / **31** — NE 7 |
| B03 | 2167 | 721 / 0 / 100 / **43** — NE 1303 | 763 / 0 / 97 / **4** — NE 1303 | 498 / 0 / 86 / **280** — NE 1303 | 739 / 0 / 88 / **37** — NE 1303 |

## Integrity checks

| World | converters | same assertions | same fixture registry | sums exact | each once | NE never PASS | assertions / level |
|---|--:|---|---|---|---|---|--:|
| J01@1.1 | 4 | true | true | true | true | true | 111135 |
| J02@1.0 | 4 | true | true | true | true | true | 2542 |
| J03@1.0 | 4 | true | true | true | true | true | 1320 |
| J04@1.0 | 4 | true | true | true | true | true | 35172 |
| B01@1.0 | 4 | true | true | true | true | true | 743 |
| B02@1.0 | 4 | true | true | true | true | true | 920 |
| B03@1.0 | 4 | true | true | true | true | true | 2167 |
