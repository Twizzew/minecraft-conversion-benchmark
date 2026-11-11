# MCCB v1.3 — final comparison (counts per assertion)

Cell: PASS / ADAPTED / PARTIAL / **FAIL** — then NOT_EVALUATED (never counted as PASS). NOT_APPLICABLE and UNSUPPORTED are in the raw results.
No score, no ranking; worlds are never added together.

Builds: WS 0308840 · WS 2.8.0 (fd9b735) · Chunker 1.20.0 · je2be core-8dfc4de.

## Direct conversion

| World | assertions | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|--:|---|---|---|---|
| J01 | 111135 | 56364 / 0 / 0 / **2** — NE 39151 | 56366 / 0 / 0 / **0** — NE 39151 | 55732 / 0 / 0 / **634** — NE 39151 | 34 / 0 / 0 / **56332** — NE 39151 |
| J02 | 2542 | 1642 / 3 / 0 / **4** — NE 825 | 1645 / 3 / 0 / **1** — NE 825 | 259 / 0 / 0 / **1391** — NE 824 | 32 / 0 / 0 / **1618** — NE 824 |
| J03 | 1320 | 710 / 1 / 0 / **3** — NE 516 | 713 / 1 / 0 / **0** — NE 516 | 397 / 0 / 0 / **318** — NE 515 | 26 / 0 / 0 / **712** — NE 492 |
| J04 | 35172 | 18477 / 3 / 0 / **35** — NE 16533 | 18483 / 3 / 0 / **29** — NE 16533 | 17109 / 0 / 0 / **2038** — NE 15901 | 33 / 0 / 0 / **23013** — NE 12002 |
| B01 | 743 | 480 / 0 / 0 / **4** — NE 246 | 484 / 0 / 0 / **0** — NE 246 | 444 / 1 / 0 / **39** — NE 246 | 476 / 0 / 0 / **8** — NE 246 |
| B02 | 920 | 623 / 0 / 1 / **0** — NE 245 | 624 / 0 / 0 / **0** — NE 245 | 385 / 0 / 0 / **239** — NE 245 | 602 / 0 / 0 / **22** — NE 245 |
| B03 | 2167 | 547 / 2 / 1 / **0** — NE 1575 | 547 / 2 / 1 / **0** — NE 1575 | 347 / 1 / 0 / **202** — NE 1575 | 516 / 0 / 0 / **34** — NE 1575 |

## Round trip

| World | assertions | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|--:|---|---|---|---|
| J01 | 111135 | 99078 / 10246 / 160 / **1650** — NE 1 | 99083 / 10246 / 160 / **1645** — NE 1 | 92352 / 10349 / 682 / **7751** — NE 1 | 64 / 0 / 0 / **111070** — NE 1 |
| J02 | 2542 | 2283 / 0 / 162 / **89** — NE 8 | 2338 / 0 / 159 / **37** — NE 8 | 374 / 0 / 16 / **2145** — NE 7 | 61 / 0 / 0 / **2474** — NE 7 |
| J03 | 1320 | 1230 / 1 / 11 / **58** — NE 20 | 1233 / 1 / 11 / **55** — NE 20 | 720 / 2 / 19 / **559** — NE 20 | 54 / 0 / 0 / **1246** — NE 20 |
| J04 | 35172 | 34591 / 0 / 445 / **4** — NE 132 | 34594 / 0 / 446 / **0** — NE 132 | 31278 / 0 / 405 / **3357** — NE 132 | 63 / 0 / 0 / **34977** — NE 132 |
| B01 | 743 | 707 / 0 / 22 / **13** — NE 1 | 717 / 0 / 22 / **3** — NE 1 | 652 / 0 / 16 / **74** — NE 1 | 700 / 0 / 21 / **21** — NE 1 |
| B02 | 920 | 800 / 0 / 103 / **10** — NE 7 | 805 / 0 / 104 / **4** — NE 7 | 572 / 0 / 6 / **335** — NE 7 | 815 / 0 / 67 / **31** — NE 7 |
| B03 | 2167 | 725 / 0 / 100 / **39** — NE 1303 | 763 / 0 / 97 / **4** — NE 1303 | 512 / 0 / 72 / **280** — NE 1303 | 746 / 0 / 81 / **37** — NE 1303 |

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
