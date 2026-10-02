# Reproducing MCCB v1.3 (and v1.1, v1.2)

Everything below runs on a normal PC (tested on Windows 11, Node.js 24, Java 25 — the
Java runtime installed by the Minecraft launcher is enough and is found automatically).
Nothing here needs WorldSwitch's source code: the oracles never import a converter.

## 1. Get the source worlds and check them

Download the assets of the release **MCCB v1.1 — Source Worlds** (tag
`v1.1-source-worlds`, once published) into a folder, then:

```bash
cd <folder with the assets>
sha256sum -c --ignore-missing /path/to/minecraft-conversion-benchmark/checksums/MCCB-v1.1-source-worlds.sha256
```

Every line must say `OK`. The canonical list, with provenance and status of each world,
is `manifests/worlds.json`. (MCCB v1.0 assets verify against the root `SHA256SUMS.txt`,
unchanged since v1.0.)

| World | Asset | SHA-256 |
|---|---|---|
| J01@1.1 | `MCCB_J01_STATIC_JAVA_v1.1.zip` | `b28294c78bb7e3c755827153b8d52bbdb5f80a9a45b598d6608a141493d26cf3` |
| J02@1.0 | `MCCB_J02_LIVING_JAVA.zip` | `db97f7497094ed5681600b37a76ab81e975341280883dcf433b3d6c40e8f17a4` |
| J03@1.0 | `MCCB_J03_SYSTEMS_JAVA.zip` | `45c7ae7293ff1dfd3310757a8b56f1d094e6928aa20a82b68ff45428f55bbc50` |
| J04@1.0 | `MCCB_J04_COMMANDS_JAVA.zip` | `44a58908bbf86554eb85c6c0fb6b8b060ed016965e943eab05e72145606a7b4c` |
| B01@1.0 | `MCCB_B01_STATIC_BEDROCK.mcworld` | `83e8e9909a3d8915980df317073b80c11421152d8f7ed88714fd196e45c0a667` |
| B02@1.0 | `MCCB_B02_LIVING_BEDROCK.mcworld` | `34d9b5dfaff557ef5e3907cae8fba31fc5de8dc03cb49c145ab14b0e6f6ccd10` |
| B03@1.0 | `MCCB_B03_SYSTEMS_BEDROCK.mcworld` | `fd16e5d795f6b707fb48bce821e09dcad5a8e15c87e101d6e080bb24c911a838` |

## 2. Convert them with the converter under test

Each converter gets the unmodified asset. Record, for every conversion: converter name,
version or commit, options, date, OS, source SHA-256, output SHA-256 (`manifests/runs.json`
shows the format). For round trips, convert the output back with the same converter.

- **WorldSwitch** (closed source): runs of MCCB v1.1 were made with engine commit
  `030884039c78fd1c076fa42ba0975dd92c420b7e` and the public web service's default
  options (`docs/converters/worldswitch.md`), by `tools/runners/worldswitch/run-suite.mjs`.
  A third party cannot run that exact commit; the outputs are published as release
  assets so that their evaluation can be reproduced exactly (§4), and the web service
  can be used to produce comparable outputs (its deployed build is not externally
  identifiable — KNOWN_LIMITATIONS.md).
- **Chunker** 1.20.0 and **je2be** (core `8dfc4de`): run with the generic runner
  `tools/runners/generic/run-command.mjs` (any command line, same run record); builds,
  command lines and options in `docs/converters/chunker.md` and `docs/converters/je2be.md`.
  Any other converter: `docs/converters/adding-a-converter.md`.

## 3. Prepare the oracles

```bash
cd tools
npm ci                      # prismarine-nbt, leveldb-zlib (prebuilt), adm-zip, @minecraft/vanilla-data
```

Java reference (needed for every Java world, source or output):

1. Java 25: the Minecraft launcher's runtime is used if present, else `java` on the PATH,
   or set `MCCB_JAVA=/path/to/java`.
2. Get Minecraft Java 26.3 with the official launcher (or point `--minecraft-dir` of
   `tools/java/classpath.mjs` to a launcher folder containing `versions/26.3`).
3. Generate Mojang's registry reports:
   ```bash
   java -cp "$(node java/classpath.mjs 26.3)" net.minecraft.data.Main --reports --output <dir>
   export MCCB_JAVA_REPORTS=<dir>/reports
   ```
   Their SHA-256 are recorded in every fixture file header (`java_reference`); yours must
   match (`blocks.json` `7a0de8aa…`, `registries.json` `51f62d56…`).

Point the tools at your folders: `MCCB_SOURCES_DIR` (source assets), `MCCB_RUNS_DIR`
(one folder per run: `run.json` + `output.*`), `MCCB_WORK_DIR` (scratch, several GB).

## 4. Rebuild the fixtures and check they are the published ones

```bash
node fixtures/build-fixtures.mjs           # writes fixtures/<world>.jsonl.gz
node manifests/check-fixtures.mjs          # content SHA-256 must equal reports/freeze/FREEZE-v1.1.json
```

The fixture registries are derived from the source worlds only. Rebuilding them must
give the same content hashes as `manifests/fixtures.json` and `reports/freeze/FREEZE-v1.1.json`.

## 5. Evaluate runs

```bash
node oracles/evaluate.mjs --world J04@1.0 --direct <direct run id> --roundtrip <return run id> --converter <name>
node oracles/evaluate-suite.mjs --converter worldswitch --commit 0308840 --dev   # all seven pairs (not locked on a freeze)
node manifests/build-manifests.mjs                                       # manifests/*.json, checksums/
node results/aggregate.mjs                                               # results/<converter>/SUMMARY.md
node results/show.mjs results/worldswitch/<run id> --status FAIL          # inspect evidence
node results/failure-census.mjs results/worldswitch/<run id> --md <run dir>/FAILURE-CENSUS.md
```

The evaluator refuses to run if a run did not consume the canonical source (or the
direct output, for a return leg). Published WorldSwitch results were produced by exactly
these commands; rerunning them on the published outputs must give identical
`results.jsonl.gz` content and identical summaries.

## 6. Self-tests of the oracles

```bash
node selftest/run-selftests.mjs
```

A. reader vs game (checks the worlds' own in-game verification passed must be found by
the MCCB reader), B. identity (a source compared with itself must pass every evaluable
round-trip assertion), C. mutations (a deliberately damaged copy must fail exactly the
damaged assertions), D. determinism (two runs of the same conversion must give the same
evaluation). Report: `reports/oracle-selftests/`.

## 7. Check the whole freeze

```bash
node manifests/build-freeze.mjs --check
```

Run it on the commit of the freeze being checked. On a commit carrying the v1.3 closure
scorer it reports `FREEZE DIFFERS` by design (see §8): the scorer and two rule texts changed
after every freeze; no freeze is rewritten.

Recomputes every hash listed in `reports/freeze/FREEZE-v1.1.json` (sources, fixtures,
rules, references, every tool file, measured results) and reports any difference.

Note: Java worlds are normalised once and cached under `MCCB_WORK_DIR`; the cache key
includes the SHA-256 of `tools/java/src/MccbNormalize.java`, so a changed normaliser
never reuses an old cache.

## 8. MCCB v1.3 — the final comparison

Same source worlds and steps as above; tools version 1.3.0 (`tools/package.json`).

**Check the published v1.3 table** (the results in `results/v1.3` are never rewritten): rebuild
it from the published rows, locked on the freeze; `--legacy-unfingerprinted` is needed because
those rows were written before the v1.3 closure and carry no scorer fingerprint. The output
must be byte-identical to `results/v1.3/COMPARISON-v1.3.{md,json}`.

```bash
B="WS 0308840=worldswitch/ws-0308840_,WS 2.8.0 (fd9b735)=worldswitch/ws-fd9b735_,Chunker 1.20.0=chunker/chunker-1.20.0_,je2be core-8dfc4de=je2be/je2be-core-8dfc4de_"
node results/table-v13.mjs --dir results/v1.3 --freeze reports/freeze/FREEZE-v1.3.json --legacy-unfingerprinted \
  --builds "$B" --md /tmp/COMPARISON-v1.3.md --json /tmp/COMPARISON-v1.3.json
cmp /tmp/COMPARISON-v1.3.md ../results/v1.3/COMPARISON-v1.3.md && cmp /tmp/COMPARISON-v1.3.json ../results/v1.3/COMPARISON-v1.3.json
```

**Grade again with the closure tools** (rules 53–56, `docs/rules-changelog.md`) — into a NEW
directory, never `results/v1.3`. An official grading is locked on the freeze: `evaluate-suite`
and `table-v13` refuse to run without `--freeze` (or the explicit, non-official `--dev`) and
refuse any world whose fixture registry is not the one the freeze records; the freeze file
itself is authenticated (`tools/lib/freeze-ref.mjs`).

**Historical freeze integrity is a separate check.** `reports/freeze/FREEZE-v1.3.json` is never
rewritten: its SHA-256 stays `8e317c7be305c990b6833657f9acbdba6076340fba9657960556610fbe4251a2`
(the closure tools authenticate it by that hash). `build-freeze --check` rebuilds the WHOLE
freeze from the current tree and compares text: on the closure commit it reports `FREEZE
DIFFERS` (exit 1) BY DESIGN — the scorer files (`tools/lib`, `tools/families`, `tools/oracles`,
`tools/java/classpath.mjs`) and two rule texts (`docs/fixture-rules.md`,
`docs/rules-changelog.md`) were changed on purpose, three tool files were added. That is not a
failure of the freeze and must never be "fixed" by rewriting it. It also needs the Minecraft
26.3 installation (it stops with `classpath: … not installed` without it) and the recorded
runs (`_staging/runs`), and it differs on any machine but the freeze machine for the sections
the freeze marks as machine-dependent. To check the historical integrity:

```bash
sha256sum ../reports/freeze/FREEZE-v1.3.json                       # 8e317c7b…51a2, unchanged
git diff --stat 2e7bc0925ea554f5c34d9b4516d2201455d53555 -- ../fixtures ../worlds ../manifests ../docs/reference ../reports/freeze ../results   # empty: no frozen input changed
# the frozen tools and rules themselves: on the v1.3 commit, not on the closure commit
git checkout 2e7bc0925ea554f5c34d9b4516d2201455d53555 && node manifests/build-freeze.mjs --version 1.3 --check
```

Then, back on the closure commit:

```bash
F=reports/freeze/FREEZE-v1.3.json; OUT=results/v1.3-closure
node oracles/evaluate-suite.mjs --prefix ws-0308840      --results-dir $OUT --freeze $F
node oracles/evaluate-suite.mjs --prefix ws-fd9b735      --results-dir $OUT --freeze $F
node oracles/evaluate-suite.mjs --converter chunker --prefix chunker-1.20.0 --results-dir $OUT --freeze $F
node oracles/evaluate-suite.mjs --converter je2be --prefix je2be-core-8dfc4de --results-dir $OUT --freeze $F
node results/table-v13.mjs --dir $OUT --freeze $F --builds "$B" --md $OUT/COMPARISON.md --json $OUT/COMPARISON.json
```

**Self-tests**, all sections — `U` (the closure tests, `selftest/closure/*.test.mjs`), `A`, `B`,
`C`, `D` — written outside the published report:

```bash
MCCB_SELFTEST_REPORT_DIR=../results/v1.3-closure/selftests node selftest/run-selftests.mjs U A B C D
```

Each line is `PASS`, `FAIL` or `SKIP`; the last line counts them. `SKIP` means an input was
missing BEFORE the test ran (a source asset, the Minecraft 26.3 installation, the Java
executable) — it is not a validation. A test that ran and failed (including a normaliser or
`classpath.mjs` that started and failed) is `FAIL`. The exit code is 1 when any test FAILS, 0
otherwise — check the SKIP count as well.

Converters of the final comparison:

| Label | Build | How it was run |
|---|---|---|
| WorldSwitch old | engine commit `030884039c78fd1c076fa42ba0975dd92c420b7e` | `tools/runners/worldswitch/run-suite.mjs`, default options |
| WorldSwitch final | engine 2.8.0, commit `fd9b73568456efc0b772d958ebffbc5599aa8fac` | same runner, clean working tree |
| Chunker | `chunker-cli-1.20.0.jar` (official release), default options | `docs/converters/chunker.md` |
| je2be | je2be-core commit `8dfc4de1ba5c7f72e804abea8663380c0dbd5680` (engine of je2be-desktop 5.6.1), official front ends `j2b` / `b2j` built from the unmodified sources, default options | `tools/runners/generic/run-command.mjs`; build and run commands in `docs/converters/je2be.md` |

`table-v13.mjs` also checks, per world, that every converter was graded on exactly the same
assertions with the same fixture registry, that each assertion is counted once, that the
status counts add up, and that no NOT_EVALUATED assertion is counted as PASS.

`build-freeze --check` recomputes every section of the freeze. Three sections depend on
files that are not public: `runs_to_grade` (the recorded converter outputs of the freeze
machine, published as release assets with their hashes in `results/v1.3/OUTPUTS.sha256`),
`private_fixtures` (GURREN) and `packaging_tools_informative` (grows with reading aids that
never decide a verdict). On another machine these three differ; every section that decides
a verdict (sources, fixtures, rules, references, `tools`, normaliser) must be identical — on
the v1.3 commit `2e7bc09`. The command only prints `FREEZE UNCHANGED` / `FREEZE DIFFERS` (exit
0 / 1), not which section differs: compare the JSON sections to see which ones.

Mojang components used for the Java reference (from Mojang's servers, never redistributed):
`versions/26.3/26.3.jar` SHA-256 `4508d006323f24fa02876310c192d739af56516eb259000ac50f0909a68c9a2d`
(the freeze's `java_game.jar_sha256`), its 114 libraries (SHA-1 checked against the version manifest),
and the launcher runtime `java-runtime-epsilon` 25.0.1.

## 9. GURREN (real survival world)

GURREN is graded with the v1.3 rules and tools, pinned by
`reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json`. Its eight converter outputs are not
distributed; the verdicts are checked by converting the source again.

1. Download the release asset `MCCB_R01_SURVIVAL_BEDROCK.mcworld` and check it:

   ```bash
   echo "4cc666cf1325caa53e26189558d09b2f8bc534b733f134c58dd485b3c9d461fa  MCCB_R01_SURVIVAL_BEDROCK.mcworld" | sha256sum -c
   ```

2. Prepare the four builds of section 8: clean WorldSwitch checkouts at `0308840` and
   `fd9b735` with their dependencies (`WS_0308840`, `WS_FD9B735`), `chunker-cli-1.20.0.jar`
   (`CHUNKER_JAR`), `j2b` / `b2j` built as in `docs/converters/je2be.md` (`JE2BE_BIN`), and
   the Mojang Java reference of section 3 (`MCCB_JAVA`, `MCCB_JAVA_REPORTS`). Set
   `MCCB_GURREN_WORK` to a scratch folder with several tens of GB free. Grading needs a large
   Node heap: `MCCB_HEAP` (MB, default 18432).

3. Rebuild the fixtures and compare them with the addendum:

   ```bash
   sh reports/gurren/run-gurren.sh freeze MCCB_R01_SURVIVAL_BEDROCK.mcworld
   ```

   The fixture content hash printed must be
   `2c107cc4a9524fd157012149604ad950e0ce110ac28a03cbcd13b14df1b43672`, the content of
   `fixtures/GURREN_1.0.jsonl.gz`. The graded file differed from the published one only by
   account identifiers, replaced after grading; the addendum records the graded hashes and
   `reports/freeze/FREEZE-v1.3-GURREN-PSEUDONYMISATION.json` links the two. The script works in a copy of the repository
   (`$MCCB_GURREN_WORK/repo`) and does not change the frozen files.

4. Convert and grade:

   ```bash
   sh reports/gurren/run-gurren.sh convert MCCB_R01_SURVIVAL_BEDROCK.mcworld
   rm -rf "$MCCB_GURREN_WORK/repo/results/v1.3-gurren"
   sh reports/gurren/run-gurren.sh grade MCCB_R01_SURVIVAL_BEDROCK.mcworld
   ```

   The `rm` removes the copied published results, so that `grade` writes new ones instead
   of keeping them.

5. Compare `$MCCB_GURREN_WORK/repo/results/v1.3-gurren/COMPARISON-v1.3-GURREN.json` with
   `results/v1.3-gurren/COMPARISON-v1.3-GURREN.json`. The counts must be equal. The
   converted archives usually differ byte for byte from the hashes in
   `results/v1.3-gurren/OUTPUTS.sha256` (timestamps and other metadata written by the
   converters); they are checked by their verdicts.
