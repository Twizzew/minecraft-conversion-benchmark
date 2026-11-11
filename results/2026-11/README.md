# MCCB 2026-11 — results

Graded on 2026-11-10 with scorer revision 1.13 (severity table 1.13).
Same source worlds, same fixtures, same scorer for every column. Human-readable page:
<https://worldswitchapp.com/en/benchmark>.

Each cell: **critical · major · minor** differences. Worlds are never added together.
`(empty output)`: the converter wrote no checked block (je2be does not support Java 26.3 yet).

## One way (the conversion a user orders)

| World | WorldSwitch now (c33) | WorldSwitch before (5e2e2d5) | Chunker 1.21.0 | je2be (core 8dfc4de) | UMT 1.5.10 |
|---|---|---|---|---|---|
| J01 | 0 · 0 · 0 | 19 · 767 · 0 | 75 · 9,563 · 3,840 | 7,507 · 157,351 · 5,270 (empty output) | 186 · 6,939 · 129 |
| J02 | 0 · 0 · 0 | 3 · 18 · 8 | 41 · 1,625 · 1,096 | 161 · 1,749 · 1,129 (empty output) | 12 · 247 · 135 |
| J03 | 0 · 0 · 0 | 0 · 257 · 0 | 2 · 2,737 · 442 | 223 · 5,234 · 464 (empty output) | 33 · 2,919 · 66 |
| J04 | 0 · 0 · 0 | 33 · 0 · 0 | 195 · 1,766 · 642 | 6,366 · 14,141 · 5,481 (empty output) | 196 · 872 · 4 |
| J05 | 0 · 0 · 0 | 0 · 3 · 0 | 0 · 295 · 224 | 129 · 1,203 · 252 (empty output) | 10 · 96 · 8 |
| B01 | 0 · 0 · 0 | 0 · 0 · 0 | 1 · 23 · 23 | 2 · 6 · 0 | 4 · 13 · 2 |
| B02 | 0 · 0 · 0 | 0 · 0 · 0 | 41 · 133 · 167 | 6 · 16 · 10 | 14 · 19 · 48 |
| B03 | 0 · 0 · 0 | 0 · 1 · 0 | 1 · 139 · 121 | 1 · 31 · 4 | 1 · 31 · 6 |
| R01 | 0 · 0 · 0 | 0 · 2,557 · 0 | 509 · 131,772 · 217,995 | 94 · 20,511 · 794 | 538 · 23,532 · 6,767 |

## Round trip (converted back with the same tool, compared with the source)

| World | WorldSwitch now (c33) | WorldSwitch before (5e2e2d5) | Chunker 1.21.0 | je2be (core 8dfc4de) | UMT 1.5.10 |
|---|---|---|---|---|---|
| J01 | 1 · 3 · 3,040 | 75 · 4,035 · 2,245 | 776 · 32,167 · 7,540 | 9,932 · 307,556 · 22,643 (empty output) | 2,973 · 40,226 · 10,192 |
| J02 | 0 · 0 · 247 | 7 · 46 · 269 | 41 · 1,687 · 1,138 | 161 · 1,843 · 1,202 (empty output) | 15 · 623 · 413 |
| J03 | 0 · 0 · 169 | 0 · 300 · 511 | 2 · 14,222 · 913 | 223 · 17,219 · 2,529 (empty output) | 31 · 14,523 · 729 |
| J04 | 0 · 0 · 537 | 0 · 0 · 537 | 470 · 1,858 · 1,170 | 6,366 · 20,616 · 11,368 (empty output) | 639 · 1,403 · 110 |
| J05 | 0 · 0 · 109 | 0 · 90 · 38 | 1 · 297 · 258 | 129 · 1,292 · 348 (empty output) | 13 · 227 · 39 |
| B01 | 0 · 0 · 14 | 0 · 6 · 12 | 2 · 35 · 53 | 0 · 21 · 22 | 3 · 21 · 25 |
| B02 | 0 · 0 · 73 | 29 · 37 · 36 | 45 · 138 · 196 | 8 · 61 · 30 | 17 · 75 · 31 |
| B03 | 0 · 0 · 87 | 0 · 23 · 66 | 2 · 142 · 186 | 0 · 59 · 66 | 1 · 59 · 109 |
| R01 | 0 · 2 · 109,473 | 222 · 4,133 · 105,768 | 631 · 131,819 · 228,300 | 167 · 24,477 · 121,413 | 530 · 27,190 · 135,494 |

## Players of the real multiplayer world R01, after the round trip

Players whose data comes back intact, out of the players who had it.

| Player data | WorldSwitch now (c33) | WorldSwitch before (5e2e2d5) | Chunker 1.21.0 | je2be (core 8dfc4de) | UMT 1.5.10 |
|---|---|---|---|---|---|
| position | 27/27 | 27/27 | 1/27 | 1/27 | 0/27 |
| xp_level | 27/27 | 27/27 | 0/26 | 1/27 | 0/27 |
| health | 27/27 | 27/27 | 0/26 | 1/27 | 0/27 |
| inventory | 7/19 | 7/19 | 0/19 | 0/19 | 0/19 |
| ender_chest | 5/6 | 4/6 | 0/6 | 0/6 | 0/6 |
| armor | 7/14 | 7/14 | 0/14 | 0/14 | 0/14 |

## Files

- `results.json`: every count of this page, plus loss families with example ids, conversion times and peak memory
  (the file served at <https://worldswitchapp.com/benchmark/mccb-2026-11.json>).
- `<converter>/<WORLD>/`: `summary.json` (checks per status), `PERTES-PAR-GRAVITE.md` and `pertes-par-gravite.json.gz`
  (every critical and major difference with its location and evidence), `results.jsonl.gz` (every verdict),
  `run-aller.json` / `run-retour.json` (how the conversion was run). Folders: `worldswitch-5e2e2d5-c33`, `worldswitch-5e2e2d5`, `chunker-1.21.0`, `je2be-core-8dfc4de`, `umt-1.5.10`.
- Converted worlds: release [`v2026.11-results`](https://github.com/Twizzew/minecraft-conversion-benchmark/releases/tag/v2026.11-results), checked by `checksums/MCCB-2026-11-outputs-*.sha256`.
- R01 is a private world played by real people: its file, fixtures, outputs and per-difference reports are not published,
  only its counts.

## Checked from this repository

Every public cell above was graded again from a fresh clone of this repository, with the source worlds and the
converted worlds downloaded from the releases (`tools/runners/runs-from-release.mjs`): all 40 cells gave the same
verdicts, one by one, as the first grading. The files in the converter folders are that second grading, so their
scorer fingerprint (`03879be0…`) is the one `node tools/lib/fingerprint.mjs --print` gives for this tree.
`results.json` keeps the figures exactly as published on the website (first grading, fingerprint `6ab9ee49…`; the
two differ only by comments and by the private world's name in the scorer files).

## Conditions

- WorldSwitch, Chunker, je2be: Linux lab, one fresh container per conversion, 4 CPUs, 5.5 GiB, no network, default options.
- UMT exists only as a Windows GUI with no command-line mode: converted on a Windows PC by driving its window; its times
  are upper bounds and are not comparable to the second.
