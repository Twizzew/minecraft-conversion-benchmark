# Minecraft Conversion Compatibility Benchmark (MCCB)

MCCB measures how faithfully a tool converts a Minecraft world between Java Edition and
Bedrock Edition. It consists of fixed source worlds, fixture registries derived from them,
readers ("oracles") that inspect converted worlds without using any converter's code, and
per-assertion results that anyone can recompute.

MCCB is written and maintained by [WorldSwitch](https://worldswitchapp.com), which sells a
converter. Every input, rule, tool and result is therefore public and pinned by hash, and
rule changes made while looking at WorldSwitch outputs are listed with their effect in
[docs/rules-changelog.md](docs/rules-changelog.md).

**Current edition: MCCB 2026-11** — results and tables in [results/2026-11/README.md](results/2026-11/README.md),
source worlds in the release `v2026.11-source-worlds`, converted worlds in `v2026.11-results`.

Older reports name some R01 files (`fixtures/R01_1.0.jsonl.gz`, `results/v1.3-r01*/`, `reports/r01/`,
`reports/freeze/FREEZE-v1.3-R01-*`); they are kept offline with the world.

## Versions

| Version | Content | State |
|---|---|---|
| v1.0 | Six source worlds and their hashes (`SHA256SUMS.txt`) | Released 2026-09-15 as `v1.0-source-worlds`; unchanged |
| v1.1 | Seven source worlds (J01 revised, J04 added), methodology, fixtures, oracles, first WorldSwitch runs | Freeze `reports/freeze/FREEZE-v1.1.json` |
| v1.2 | Same worlds; rules 36–46 | Freeze `reports/freeze/FREEZE-v1.2.json` |
| v1.3 | Same worlds; rules 47–52; final comparison of four converter builds; the real survival world R01, reported separately | Freeze `reports/freeze/FREEZE-v1.3.json`, R01 addendum `reports/freeze/FREEZE-v1.3-R01-ADDENDUM.json` |
| v1.3 closure | Same worlds, fixtures and outputs; scorer corrected (rules 53–60), the same 64 historical outputs graded again, nothing converted again | Same freeze; results `results/v1.3-closure/` (R01: kept offline) |
| 2026-11 | Java worlds rebuilt for Java 26.3 (J01-J04 @2.0, new J05), B01-B03 unchanged; scorer revision 1.13; five columns: WorldSwitch before/now, Chunker 1.21.0, je2be, UMT 1.5.10 | Results [`results/2026-11/`](results/2026-11/README.md); worlds: release `v2026.11-source-worlds` |

Changes per version: [CHANGELOG.md](CHANGELOG.md). The v1.0 documents are kept in
[docs/history/](docs/history/).

## Source worlds

Current edition, MCCB 2026-11:

| ID | Edition | Theme | Class | File |
|---|---|---|---|---|
| J01@2.0 | Java 26.3 | Blocks, states, block entities, items | LAB | `MCCB_J01_JAVA_26.3.zip` (122.2 MB) |
| J02@2.0 | Java 26.3 | Entities, inventories, trades | LAB | `MCCB_J02_JAVA_26.3.zip` (4.8 MB) |
| J03@2.0 | Java 26.3 | World data, dimensions, redstone, scoreboards | LAB | `MCCB_J03_JAVA_26.3.zip` (78.2 MB) |
| J04@2.0 | Java 26.3 | 400 command-block stations | LAB | `MCCB_J04_JAVA_26.3.zip` (11.5 MB) |
| J05@1.0 | Java 26.3 | Things in progress: lit TNT, moving pistons, lit furnaces, a zombie villager being cured | MANUAL_NATIVE | `MCCB_J05_JAVA_26.3.zip` (1.2 MB) |
| B01@1.0 | Bedrock 1.26.45.1 | Blocks, states, block entities, items | LAB | `MCCB_B01_STATIC_BEDROCK.mcworld` (0.1 MB) |
| B02@1.0 | Bedrock 1.26.45.1 | Entities, inventories, trades | MANUAL_NATIVE | `MCCB_B02_LIVING_BEDROCK.mcworld` (0.2 MB) |
| B03@1.0 | Bedrock 1.26.45.1 | World data, dimensions, redstone, scoreboards | LAB | `MCCB_B03_SYSTEMS_BEDROCK.mcworld` (0.8 MB) |

The files are assets of the release
[`v2026.11-source-worlds`](https://github.com/Twizzew/minecraft-conversion-benchmark/releases/tag/v2026.11-source-worlds),
not stored in Git. Their hashes are in
[checksums/MCCB-2026-11-source-worlds.sha256](checksums/MCCB-2026-11-source-worlds.sha256); check them on any system with
`node tools/verify-checksums.mjs checksums/MCCB-2026-11-source-worlds.sha256 <folder>`.
Earlier editions: `SHA256SUMS.txt` (v1.0, release `v1.0-source-worlds`) and
`checksums/MCCB-v1.1-source-worlds.sha256` (v1.1 to v1.3, never released as files).

R01 is a multiplayer survival world played for more than four years (moved to a PC, still in Bedrock, in November
2025, which is why the save itself only keeps dates from then on). It is graded locally but not
distributed: it holds the data of other players. Only its counts are published.
What each world contains: [WORLDS.md](WORLDS.md) and [worlds/](worlds/).

## Method

A converter receives the unmodified source file and its default settings. Its build,
options, logs and output hash are recorded. The output is read by MCCB's own readers: Java
worlds after Mojang's own world upgrade code for Java 26.3, Bedrock worlds as stored. Each
assertion of the fixture registry is judged at the direct level (the converted world) and
at the round-trip level (converted back with the same converter); a behaviour level exists
but is barely automated. Results are counts of PASS, ADAPTED, PARTIAL, FAIL, NOT_APPLICABLE
and NOT_EVALUATED per world and level. There is no score and no ranking, and world classes
are never added together.

Rules: [METHODOLOGY.md](METHODOLOGY.md) and [docs/fixture-rules.md](docs/fixture-rules.md).
Known limits: [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md).

## Results

The v1.3 comparison covers WorldSwitch `0308840`, WorldSwitch 2.8.0 (`fd9b735`), Chunker
1.20.0 and je2be (je2be-core `8dfc4de`, run after the freeze with the unchanged method). The
current results are the **corrected grading** of the v1.3 closure: the same outputs, graded again
with the scorer corrected after an audit (rules 53–60), into separate folders:

- seven synthetic worlds: [results/v1.3-closure/](results/v1.3-closure/README.md);
- R01, the real-world validation, reported on its own (kept offline with the world).

What the correction changed, assertion by assertion, is in each folder's `DELTA.md`; how it was
done and checked is in [reports/closure-rescore/](reports/closure-rescore/README.md). The first
v1.3 grading is kept unchanged as the historical record: [results/v1.3/](results/v1.3/README.md).
The converted worlds it graded are in the release `v1.3-outputs` (42 of the 56; see that release for je2be).

The builds actually measured are listed in
[results/v1.3/CONVERTERS-MEASURED.json](results/v1.3/CONVERTERS-MEASURED.json).
`manifests/converters.json` is the register as it was frozen before those measurements
(it still lists je2be as not run) and is kept unchanged because its hash is in the freeze.

Results graded under v1.1 and v1.2 are kept as they were graded, in `results/`,
`results/v1.2/` and [results/COMPARISON-v1.1.md](results/COMPARISON-v1.1.md).

## Reproducing

[REPRODUCING.md](REPRODUCING.md) describes how to verify the sources, rebuild the fixtures,
run each converter and grade its outputs. Quick check of downloaded worlds:

```bash
sha256sum -c --ignore-missing checksums/MCCB-v1.1-source-worlds.sha256
```

## Licence

The synthetic source worlds (J01–J04, B01–B03) are dedicated to the public domain under
[CC0 1.0](LICENSES/CC0-1.0.txt). The documentation is under [CC BY 4.0](LICENSE). R01 is
published with its contributors' permission under the terms in [NOTICE.md](NOTICE.md), which
also covers code, converter outputs and third-party material.

Minecraft is a trademark of Mojang Studios / Microsoft. MCCB is not affiliated with or
endorsed by Mojang Studios or Microsoft, and it redistributes no Mojang file.

Issues and corrections: open an issue on this repository.
