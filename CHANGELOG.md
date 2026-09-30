# Changelog

## v1.3 — prepared, not published

Same seven source worlds as v1.1/v1.2, byte-identical.

Method
- Rules 47–52 (`docs/rules-changelog.md`, section MCCB v1.3) correct the four oracle
  defects found after the v1.2 freeze: F10 player items compared strictly, F11
  `repair_cost`/`damage` 0 vs absent, F12 double chests read chest by chest, F13 no
  measure of structures or of the Java generation frontier.
- New family `structure` (`docs/fixture-rules.md` §3.9): structure spawn zones judged by
  each edition's own rule (Java `References`/`starts`, Bedrock keys 0x39/0x77), and Java
  chunks whose generation was not finished.
- Each rule is listed with its effect on WorldSwitch and Chunker, measured before the
  freeze (`reports/freeze/FREEZE-v1.3.json`). v1.2 results are kept as graded.

Data and tools
- Fixture registries rebuilt with tools 1.3.0: only the double-chest stacks
  (`pair_half`, 16 public subjects) and the new `structure` subjects differ from v1.2;
  every other subject is byte-identical, with the same id.
- Bedrock reader indexes chunk key 0x77; `tools/lib/structures.mjs` (0x39/0x77 decoders,
  Java structure index); `tools/lib/chest-pairs.mjs`; `tools/results/table-v13.mjs`
  (final table and integrity checks).

Results
- Final comparison: WorldSwitch `0308840` (old), WorldSwitch 2.8.0 (`fd9b735`, final),
  Chunker 1.20.0; je2be core `8dfc4de` (engine of je2be-desktop 5.6.1), run and graded after
  the freeze with nothing changed (`docs/converters/je2be.md`, `results/v1.3/README.md`).
- GURREN (real survival world, class REAL_WORLD_SURVIVAL): sanitised file `a6403742…` pinned
  by `reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json` before any conversion, measured with
  the same four builds and frozen rules, shown apart (`results/v1.3-gurren/`). The source
  file is published as a release asset with its contributors' permission (`NOTICE.md`), with
  the account identifiers still present in the graded file replaced by pseudonyms
  (`reports/freeze/FREEZE-v1.3-GURREN-PSEUDONYMISATION.json`; no verdict changed); the
  converter outputs are not distributed (`REPRODUCING.md` §9).
- Post-grading reviews, no verdict changed: `results/v1.3/ROOT-CAUSES-*.md`,
  `reports/root-causes/`.

## v1.2 — prepared, not published

- Rules 36–46 (accounting audit of v1.1), written after Chunker 1.20.0 was measured under
  v1.1; each with its effect on both converters. Freeze: `reports/freeze/FREEZE-v1.2.json`.
- References `docs/reference/bedrock-default-states.v1.json` (rule 43) and
  `docs/reference/java-gamerule-defaults.v1.json` (rule 45).

## v1.1 — prepared, not published

Source worlds
- **J01@1.1** replaces J01@1.0 (variant barrels populated slot by slot; saved in Java
  26.3). J01@1.0 becomes SUPERSEDED: its file stays in the v1.0 release, unchanged.
- **J04@1.0 COMMANDS** added (Java 26.3, 400 command-block stations with declared
  classifications).
- J02, J03, B01, B02, B03: the v1.0 files, byte-identical.
- World classes introduced: LAB, MANUAL_NATIVE (B02), REAL_WORLD_SURVIVAL (none
  published).

Method
- `METHODOLOGY.md` v1.1 (v1.0 kept in `docs/history/`): three levels never merged
  (direct / behavior / roundtrip), classes never merged, counts instead of scores,
  NOT_EVALUATED counted apart, results vocabulary PASS / ADAPTED / PARTIAL / FAIL /
  UNSUPPORTED / NOT_APPLICABLE (the v1.0 vocabulary is mapped in §4; no v1.0 result was
  ever published).
- `docs/fixture-rules.md`: the rule of every assertion.
- `docs/rules-changelog.md`: every rule change made while looking at WorldSwitch outputs,
  with its measured effect.
- `KNOWN_LIMITATIONS.md`, `REPRODUCING.md`.

Data and tools
- Fixture registries `fixtures/*.jsonl.gz`, generated from the source worlds only;
  identified by the SHA-256 of their decompressed content.
- References: identity equivalence (`docs/reference/identity-equivalence.v1.json`),
  gamerule table; Mojang's Java 26.3 data generator reports and `@minecraft/vanilla-data`
  1.26.40 as registries.
- Oracles (`tools/`): independent Java and Bedrock readers, Java normalisation through
  Mojang's own upgrade and block-entity code (`tools/java/src/MccbNormalize.java`),
  family comparators, evaluator, self-tests, manifests, freeze.
- Runners: WorldSwitch (engine library), generic command-line runner for any other
  converter.

Results
- WorldSwitch engine `0308840`: 7 direct runs, 7 return runs, 2 determinism re-runs.
- Chunker, je2be: not run (planned after the freeze).

## v1.0 — 2026-09-15

- Six SOURCE MASTER worlds (J01–J03, B01–B03), SHA-256 in `SHA256SUMS.txt`, release
  `v1.0-source-worlds`. No results.
