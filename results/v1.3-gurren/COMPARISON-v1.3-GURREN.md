# MCCB v1.3 — final comparison (counts per assertion)

Cell: PASS / ADAPTED / PARTIAL / **FAIL** — then NOT_EVALUATED (never counted as PASS). NOT_APPLICABLE and UNSUPPORTED are in the raw results.
No score, no ranking; worlds are never added together.

Builds: WS 0308840 · WS 2.8.0 (fd9b735) · Chunker 1.20.0 · je2be core-8dfc4de.

## Direct conversion

| World | assertions | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|--:|---|---|---|---|
| GURREN | 3529881 | 1896358 / 54 / 19 / **17142** — NE 1608532 | 1913493 / 54 / 18 / **8** — NE 1608532 | 1677563 / 68 / 0 / **235946** — NE 1608528 | 1892785 / 0 / 18 / **20770** — NE 1608532 |

## Round trip

| World | assertions | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|--:|---|---|---|---|
| GURREN | 3529881 | 2883497 / 6 / 115384 / **47311** — NE 483683 | 2930542 / 6 / 114774 / **876** — NE 483683 | 2684050 / 6 / 17188 / **344987** — NE 483650 | 3004461 / 6 / 17943 / **23817** — NE 483654 |

## Integrity checks

| World | converters | same assertions | same fixture registry | sums exact | each once | NE never PASS | assertions / level |
|---|--:|---|---|---|---|---|--:|
| GURREN@1.0 | 4 | true | true | true | true | true | 3529881 |
