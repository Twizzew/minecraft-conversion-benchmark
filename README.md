# Minecraft Conversion Compatibility Benchmark (MCCB)

MCCB measures how faithfully a tool converts a Minecraft world between Java Edition and
Bedrock Edition. It consists of fixed source worlds, fixture registries derived from them,
readers ("oracles") that inspect converted worlds without using any converter's code, and
per-assertion results that anyone can recompute.

MCCB is written and maintained by [WorldSwitch](https://worldswitchapp.com), which sells a
converter. Every input, rule, tool and result is therefore public and pinned by hash, and
rule changes made while looking at WorldSwitch outputs are listed with their effect in
[docs/rules-changelog.md](docs/rules-changelog.md).

## Versions

| Version | Content | State |
|---|---|---|
| v1.0 | Six source worlds and their hashes (`SHA256SUMS.txt`) | Released 2026-09-15 as `v1.0-source-worlds`; unchanged |
| v1.1 | Seven source worlds (J01 revised, J04 added), methodology, fixtures, oracles, first WorldSwitch runs | Freeze `reports/freeze/FREEZE-v1.1.json` |
| v1.2 | Same worlds; rules 36–46 | Freeze `reports/freeze/FREEZE-v1.2.json` |
| v1.3 | Same worlds; rules 47–52; final comparison of four converter builds; the real survival world GURREN, reported separately | Freeze `reports/freeze/FREEZE-v1.3.json`, GURREN addendum `reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json` |

Changes per version: [CHANGELOG.md](CHANGELOG.md). The v1.0 documents are kept in
[docs/history/](docs/history/).

## Source worlds

| ID | Edition | Theme | Class |
|---|---|---|---|
| J01@1.1 | Java 26.3 | Blocks, states, block entities, items | LAB |
| J02@1.0 | Java 26.2 | Entities, inventories, trades | LAB |
| J03@1.0 | Java 26.2 | World data, dimensions, redstone, scoreboards | LAB |
| J04@1.0 | Java 26.3 | 400 command-block stations | LAB |
| B01@1.0 | Bedrock 1.26.45 | Blocks, states, block entities, items | LAB |
| B02@1.0 | Bedrock 1.26.45 | Entities, built by hand in the game | MANUAL_NATIVE |
| B03@1.0 | Bedrock 1.26.45 | World data, dimensions, redstone | LAB |
| GURREN@1.0 | Bedrock 1.26.21.1 | A multiplayer survival world played for seven months, with player identities removed | REAL_WORLD_SURVIVAL |

World files are release assets, not stored in Git. Their hashes are in
[checksums/MCCB-v1.1-source-worlds.sha256](checksums/MCCB-v1.1-source-worlds.sha256)
(`SHA256SUMS.txt` for the v1.0 files). GURREN is published as
`MCCB_R01_SURVIVAL_BEDROCK.mcworld`, SHA-256
`4cc666cf1325caa53e26189558d09b2f8bc534b733f134c58dd485b3c9d461fa`: the graded file with the remaining account
identifiers removed after grading
([reports/freeze/FREEZE-v1.3-GURREN-PSEUDONYMISATION.json](reports/freeze/FREEZE-v1.3-GURREN-PSEUDONYMISATION.json)).
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
1.20.0 and je2be (je2be-core `8dfc4de`):

- seven synthetic worlds: [results/v1.3/](results/v1.3/README.md);
- GURREN, reported on its own: [results/v1.3-gurren/](results/v1.3-gurren/README.md).

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
[CC0 1.0](LICENSES/CC0-1.0.txt). The documentation is under [CC BY 4.0](LICENSE). GURREN is
published with its contributors' permission under the terms in [NOTICE.md](NOTICE.md), which
also covers code, converter outputs and third-party material.

Minecraft is a trademark of Mojang Studios / Microsoft. MCCB is not affiliated with or
endorsed by Mojang Studios or Microsoft, and it redistributes no Mojang file.

Issues and corrections: open an issue on this repository.
