# Notice

Minecraft Conversion Compatibility Benchmark (MCCB)
Copyright © 2026 WorldSwitch

Each kind of file in MCCB has its own licence. They are never mixed.

## 1. MCCB synthetic source worlds — CC0 1.0 (public domain dedication)

To the extent possible under law, WorldSwitch has waived all copyright and related or
neighbouring rights to the **MCCB synthetic source worlds**, under
[CC0 1.0 Universal](LICENSES/CC0-1.0.txt):

| World | File(s) |
|---|---|
| J01 STATIC (revisions 1.0 and 1.1) | `MCCB_J01_STATIC_JAVA.zip`, `MCCB_J01_STATIC_JAVA_v1.1.zip` |
| J02 LIVING | `MCCB_J02_LIVING_JAVA.zip` |
| J03 SYSTEMS | `MCCB_J03_SYSTEMS_JAVA.zip` |
| J04 COMMANDS | `MCCB_J04_COMMANDS_JAVA.zip` |
| B01 STATIC | `MCCB_B01_STATIC_BEDROCK.mcworld` |
| B02 LIVING | `MCCB_B02_LIVING_BEDROCK.mcworld` |
| B03 SYSTEMS | `MCCB_B03_SYSTEMS_BEDROCK.mcworld` |

This covers the files exactly as published (hashes: `SHA256SUMS.txt`,
`checksums/MCCB-v1.1-source-worlds.sha256`), including the MCCB-made datapacks and behaviour
packs they contain (`MCCB_J02_…`, `MCCB_J03_…`, `MCCBB01STA`, `MCCBB03SYS`). Anyone may
download, copy, modify, redistribute them, test any converter with them, build other
benchmarks from them and publish their own results, for any purpose, without asking and
without attribution. Credit is appreciated, not required. The v1.0 files were first
released under CC BY 4.0; this dedication applies to those same files as well.

The dedication covers only rights held by WorldSwitch. It does not cover, and grants
nothing about:

- Minecraft itself: the game, its code, assets, and the world data it generates remain
  under Mojang's terms (Minecraft EULA and usage guidelines); MCCB redistributes no Mojang
  file;
- trademarks (below);
- any world not listed above, in particular GURREN (section 2).

## 2. GURREN real-world source

`MCCB_R01_SURVIVAL_BEDROCK.mcworld` (SHA-256
`4cc666cf1325caa53e26189558d09b2f8bc534b733f134c58dd485b3c9d461fa`) is a derivative of a
multiplayer survival world, with player account identifiers removed. It is not an MCCB synthetic
world and is not covered by section 1.

The players who contributed to this world have given permission, within the rights they
hold in their own contributions, for the file to be used, analysed, converted, and used for
research, benchmarking and the reproduction of results, and for derivative works to be
created and redistributed within that same limit.

This permission applies only to the rights of those contributors. It does not relicense
Minecraft, any Mojang Studios or Microsoft material, any third-party software, or any other
third-party element that may be present in the world, and use of the file remains subject to
the Minecraft terms of Mojang Studios and Microsoft.

## 3. Documentation — CC BY 4.0

The documentation in this repository (Markdown files, rules, reports) is licensed under
[CC BY 4.0](LICENSE). Attribution example:

> Minecraft Conversion Compatibility Benchmark (MCCB) by WorldSwitch,
> https://github.com/Twizzew/minecraft-conversion-benchmark — CC BY 4.0.

## 4. Other material (not relicensed here)

- **MCCB code** (`tools/`): not licensed by this notice; its licence will be stated
  separately.
- **Data derived by MCCB** (fixtures, manifests, results, checksums): CC BY 4.0, like the
  documentation.
- **Converter outputs** attached to releases: worlds written by WorldSwitch, Chunker (MIT)
  and je2be (GPL-3.0) from the CC0 sources; each converter keeps its own licence. The
  converter outputs of GURREN are not distributed. MCCB does
  not redistribute converter programs (the je2be binaries MCCB compiled are not published;
  see `docs/converters/je2be.md`).
- **Mojang components** used to grade (Minecraft Java 26.3 jar, its libraries, the Java
  runtime, `@minecraft/vanilla-data`): obtained from their official sources and never
  redistributed.

## Trademarks

Minecraft is a trademark of Mojang Studios / Microsoft Corporation. This project is not
affiliated with, endorsed by, or sponsored by Mojang Studios or Microsoft Corporation.
WorldSwitch, Chunker and je2be are the names of their respective projects.

## Disclaimer

Everything is provided "as is", without warranty of any kind, express or implied.
