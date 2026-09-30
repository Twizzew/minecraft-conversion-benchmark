# je2be in MCCB v1.3

je2be (kbinani, GPL-3.0 licence) is measured **after** the v1.3 freeze
(`reports/freeze/FREEZE-v1.3.json`, where it is listed under `not_run_before_freeze`),
with the same source assets, fixture registries, rules and evaluator as WorldSwitch and
Chunker. Nothing in MCCB was changed after its outputs were seen.

## Build under test

je2be publishes no command-line binary. Its official builds are the je2be-desktop app
(Microsoft Store / GitHub) and the je2be.app web app, both built on the library
**je2be-core**. je2be-core ships two command-line front ends, `example/j2b.cpp` and
`example/b2j.cpp`, that MCCB compiles from the official sources, unmodified.

| | |
|---|---|
| Library | je2be-core, https://github.com/kbinani/je2be-core |
| Commit | `8dfc4de1ba5c7f72e804abea8663380c0dbd5680` (2025-11-19, `main` HEAD on 2026-09-29) |
| Same engine as | je2be-desktop **5.6.1** (2025-11-22, latest release), whose submodule `ext/je2be-core` pins the same commit |
| Targets (from the sources) | Java 1.21.10 (DataVersion 4556), Bedrock 1.21.120 (`src/_data-version.hpp`, `src/java/_versions.hpp`) |
| `j2b` SHA-256 | `172652363a8db105f2cc3f740517fba1ec3d79db5fe6fe100538098bfb8dc293` |
| `b2j` SHA-256 | `0854d0c066ca910924763d0d814355ea7599919e36497193be3462f53c73b0eb` |
| Toolchain | Ubuntu 24.04, g++ 13.3.0, CMake 3.28.3, Ninja, `CMAKE_BUILD_TYPE=Release` |

Binaries are not bit-reproducible across toolchains; the commit and the commands below are
what identifies the build.

### The front ends call the same engine as the app

| | `example/j2b.cpp` / `example/b2j.cpp` | je2be-desktop 5.6.1 (`src/component/{j2b,b2j}/*ConvertProgress.cpp`) |
|---|---|---|
| Entry point | `je2be::java::Converter::Run` / `je2be::bedrock::Converter::Run` | the same |
| Options | default `Options` + a temporary directory | default `Options` + a temporary directory |
| Java layout | `Vanilla` (default of `-s`) | `Vanilla` unless the user picks "Paper" |
| Bedrock → Java local player | not set | optional; set only if the user picks a player |
| Threads | `std::thread::hardware_concurrency()` | the same |

No option is set on the MCCB command line.

### Build commands

```bash
git clone https://github.com/kbinani/je2be-core && cd je2be-core
git checkout 8dfc4de1ba5c7f72e804abea8663380c0dbd5680
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --target j2b b2j
```

Every dependency is pinned by je2be-core's own CMake files (CPM). One deviation in how a
dependency was **fetched**, not in what was built: the MCCB build machine could not
download GitHub source archives, so ICU 78.1 (pinned by icu-cmake as the archive of tag
`release-78.1`) was given as a git checkout of that same official tag
(`unicode-org/icu`, commit `049e0d6a420629ac7db77256987d083a563287b5`) through CPM's standard
override `-DCPM_icu_SOURCE=<checkout>`.

## How it was run

`tools/runners/generic/run-command.mjs`, one run per conversion; the command line is stored
in each `run.json` (build folder shown as `<BUILD>`):

```
j2b -i {input_dir} -o {output_dir}      # Java → Bedrock
b2j -i {input_dir} -o {output_dir}      # Bedrock → Java
```

Round trip: the direct output, converted back with the other front end of the same build.
Run ids: `je2be-core-8dfc4de_<world>_<j2b|b2j>[2j|2b]`.

## What happened (facts from the runs)

### Java → Bedrock on the MCCB Java worlds: 0 chunks

**Raw MCCB result.** On J02 and J03, `j2b` prints `0 chunks converted` and exits with status
0. Its output is a Bedrock world with a `level.dat` and no chunk. That output is graded as it
is (rule 6 of `adding-a-converter.md`: the failure is the result): the direct level shows
only the few assertions an empty world satisfies under the frozen rules (mostly `level.dat`
values, `world.value`, and `structure.generation_frontier`, rule 52), and the round trip
starts from that empty world.

**Root cause: an unsupported input format, not a conversion bug.** je2be-core `8dfc4de`
targets Java 1.21.10 (DataVersion 4556). It finds a Java world's chunks only in
`<world>/region/`, `<world>/DIM-1/region/` and `<world>/DIM1/region/`
(`src/java-converter.cpp` → `Options::getWorldDirectory` → libminecraft-file
`mcfile::je::World::eachRegions`, which reads `<dimension root>/region`). Java 26.x worlds
store every dimension under `dimensions/minecraft/<overworld|the_nether|the_end>/region/`,
so je2be finds no region file and converts nothing. No other option of the front end or
of the app (`-s paper` expects `world/`, `world_nether/DIM-1/`, `world_the_end/DIM1/`)
reads that layout.

**How this was checked** (records in `results/je2be/controls/`, not graded):

| Check | Input | Result |
|---|---|---|
| Invocation (`diag_J02`, `diag_J03`) | the canonical J02 / J03 assets, same runner, the command prefixed with a listing of `{input_dir}` | `{input_dir}` is the world root: `level.dat` directly inside, no extra parent folder; no `region/`; `dimensions/minecraft/overworld/region/r.*.mca` present; `0 chunks converted` |
| Positive control (`control_je2be-test_j2b`) | je2be-core's own test world `test/data/je2be-test` at `8dfc4de` (Java 1.21.10, DataVersion 4556; its 27 Git LFS objects fetched and checked against their SHA-256 pointers) | same binary, runner, command and options: **12 288 chunks converted**, 12 288 chunks and 229 376 sub-chunks in the output LevelDB |
| Counter-control (`control_layout26_j2b`) | the same test world with only its directories moved to the Java 26 layout (`dimensions/minecraft/…`), files unchanged | **0 chunks converted** |

The runner and the invocation convert a supported world, and moving the region folders to
the Java 26 layout is enough to get 0 chunks. The 0 on the MCCB Java worlds is therefore
this je2be version's lack of support for the Java 26 world layout, measured as it is. Neither je2be nor
the MCCB worlds were changed to make it pass. The desktop app calls the same code with the
same options and gives the same result.

### Bedrock → Java: converts

B01, B02 and B03 are read and written as Java 1.21.10 worlds (`region/` at the root). The
MCCB normaliser upgrades them with Mojang's own file-fix and DataFixerUpper, exactly as the
game does when it opens an older world, before they are graded (0 normaliser error on the 7
Java outputs).

One consequence of that target version: je2be writes the host player only in
`level.dat` → `Player` (1.21.10 layout), with no `playerdata/<uuid>.dat`. Java 26.3's own
upgrade (`LevelDatToSavedDataFileFix.extractPlayerDataToFile`) keeps only its UUID and drops
`Player`, because the game always also saves the host in `playerdata/`. So the host player
is absent when the world is opened in 26.3 (23 direct FAIL on B01–B03). The same happens to
a 1.21.10 world saved by the game if its `playerdata/` file is missing (checked on
je2be-core's test world). The app's default (no launcher account imported) is the same as
the command line here.

### On the real world GURREN (Bedrock → Java)

je2be reads and converts it (128 130 chunks). Reading its results showed that Bedrock
"single-value" sub-chunks (a whole 16×16×16 sub-chunk of one block, stored with 0 bits per
block and a single palette entry) can come out as air. The behaviour was verified directly on
several representative cases, including the sub-chunk responsible for the 4 096 observed
FAILs. These observations are consistent with a more general problem affecting Bedrock
sub-chunks encoded with a single-value palette; the world holds 10 256 such sub-chunks, which
were not all inspected (`results/v1.3-gurren/README.md`).

## Results (MCCB v1.3)

Raw counts: `results/v1.3/COMPARISON-v1.3.md`. Raw result and root causes, kept apart:
`results/v1.3/ROOT-CAUSES-je2be-core-8dfc4de.md` — 231 595 FAIL on the public worlds, of
which 231 442 come from the unsupported Java 26 layout (J01–J04).

Reproducibility: B01, B03 (Bedrock → Java) and J02 (Java → Bedrock) converted twice from
scratch, 0 verdict difference; grading B03 twice gives a byte-identical `results.jsonl`.

Licence note: je2be-core is GPL-3.0, which allows redistributing binaries under its
conditions (notably offering the corresponding source). To keep MCCB simple, **MCCB chooses
not to redistribute** the `j2b` / `b2j` binaries it compiled: it publishes the worlds they
wrote, the official repository and commit, the build commands and toolchain, the command
lines, and the SHA-256 of the binaries actually used, so that anyone can rebuild and run
them. (Binaries are not bit-reproducible across toolchains; a rebuild is checked by its
outputs' verdicts, not by the binary hash.)

## Where the results are

- Run records and logs: `results/je2be/runs/<run id>/`.
- Output hashes: `checksums/MCCB-v1.3-runs-je2be-core-8dfc4de.sha256`.
- Per-world results: `results/v1.3/je2be/<direct run id>/`.
- Side by side: `results/v1.3/COMPARISON-v1.3.md`.
