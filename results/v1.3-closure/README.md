# MCCB v1.3 closure — corrected rescoring of the 56 public outputs

> **Disclosure.** MCCB is built and maintained by the WorldSwitch team, and WorldSwitch sells a
> converter. The rules applied here (53–60, `docs/rules-changelog.md`) were written while
> closing v1.3, before this rescoring; each was first reproduced by a failing test. They apply to
> every converter alike. Nothing below was edited by hand: every count is computed from the
> machine results in this folder.

This folder is the **corrected grading** of exactly the same 56 converter outputs as
[`results/v1.3/`](../v1.3/README.md) (7 public worlds × 4 builds × direct + round trip), with
the v1.3 closure scorer. No conversion was run again. `results/v1.3/` is kept unchanged, as it
was graded, and stays the historical record; this folder is the result to use.

## What was graded

| | |
|---|---|
| Outputs | the 56 historical archives listed in `results/v1.3/OUTPUTS.sha256` (authenticated registry `ac767c66…`): bytes checked against it when opened, 56/56 |
| Run records | `results/{worldswitch,chunker,je2be}/runs/<run>/run.json` (the 14 `ws-fd9b735_*` records are **reconstructed** provenance, `reports/provenance/ws-fd9b735-run-records.md`) |
| Freeze | `reports/freeze/FREEZE-v1.3.json` (`8e317c7b…51a2`): fixture registries 7/7 = the frozen content hashes |
| Java oracle | rule 60: Minecraft 26.3 jar `4508d006…9a2d`, its 114 libraries (SHA-1 of the version manifest), data reports `blocks.json` `7a0de8aa…` / `registries.json` `51f62d56…`: authenticated before any output was opened |
| Scorer | commit `97acbe7` (scorer code of `2027179`), scorer fingerprint `df6247a67714c7ae936fe78686139ccaa00234be19761d45ea5aab067e4587d8`, ruleset fingerprint `e2030dcdb8f47c41a3263305301004551e9429ddca87e42a6798a2975c1dd105` — recorded in every `summary.json` |
| Mode | official (`evaluate-suite --freeze --outputs`), one pass, 2026-10-03 21:48–22:19 UTC, four suites exit 0 |
| Converters | the same four builds as v1.3 (`results/v1.3/README.md`); je2be stays **post-freeze**: run and graded after the v1.3 freeze with the unchanged v1.3 method (`docs/converters/je2be.md`) |

Same rules, same assertions and same fixture registry for the four converters (checked by
`tools/results/table-v13.mjs`). Procedure, commands, preflight and before/after hash checks:
[`reports/closure-rescore/`](../../reports/closure-rescore/README.md).

## Results

**[COMPARISON-v1.3-closure.md](COMPARISON-v1.3-closure.md)** (machine-readable:
`COMPARISON-v1.3-closure.json`), built by `tools/results/table-v13.mjs` from the rows of this
folder, locked on the freeze and on the historical outputs. Per-assertion evidence:
`<converter>/<run>/results.jsonl.gz`. Counts only — no score, no ranking, worlds never added
together, NOT_EVALUATED never counted as PASS.

Integrity checks (all true on the seven worlds): same assertions for every converter, same
fixture registry, sums exact, each assertion counted once, NOT_EVALUATED never PASS; one
scorer and one ruleset fingerprint across the table; every result graded officially against
the freeze, with the Java oracle authenticated.

## What changed against the historical grading

[DELTA.md](DELTA.md) / `DELTA.json` compare the two gradings assertion by assertion
(`reports/closure-rescore/compare-results.mjs`); [TRANSITIONS.json](TRANSITIONS.json) gives
every changed verdict with the rule that decided it (`diagnose-transitions.mjs`). The
assertion set is identical (0 added, 0 removed); the graded outputs and fixture registries are
the historical ones.

FAIL per world and level, historical → corrected (other changes in brackets):

| Direct | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|---|---|---|---|
| J01 | 2 → 2 | 0 → 0 | 634 → 634 | 56 332 → 56 332 |
| J02 | 4 → 5 (PASS −2, NE +1) | 1 → 2 (PASS −2, NE +1) | 1 391 → 1 391 (PASS −1, NE +1) | 1 618 → 1 618 |
| J03 | 3 → 7 (PASS −4) | 0 → 0 | 318 → 318 | 712 → 712 |
| J04 | 35 → 35 | 29 → 29 | 2 038 → 2 038 | 23 013 → 23 013 |
| B01 | 4 → 4 | 0 → 0 | 39 → 39 | 8 → 8 |
| B02 | 0 → 34 (PASS −36, NE +2) | 0 → 0 (PASS −2, NE +2) | 239 → 273 (PASS −35, NE +1) | 22 → 22 (PASS −1, NE +1) |
| B03 | 0 → 0 | 0 → 0 | 202 → 202 | 34 → 34 |

| Round trip | WS 0308840 | WS 2.8.0 (fd9b735) | Chunker 1.20.0 | je2be core-8dfc4de |
|---|---|---|---|---|
| J01 | 1 650 → 1 650 | 1 645 → 1 645 | 7 751 → 7 751 (PASS −27, PARTIAL +27) | 111 070 → 111 070 |
| J02 | 89 → 89 (PASS −20, PARTIAL +19, NE +1) | 37 → 37 (PASS −23, PARTIAL +22, NE +1) | 2 145 → 2 145 (PASS −1, NE +1) | 2 474 → 2 474 |
| J03 | 58 → 58 (PASS −6, PARTIAL +6) | 55 → 55 (PASS −6, PARTIAL +6) | 559 → 559 | 1 246 → 1 246 |
| J04 | 4 → 4 (PASS −6, PARTIAL +6) | 0 → 0 (PASS −5, PARTIAL +5) | 3 357 → 3 357 | 34 977 → 34 977 |
| B01 | 13 → 13 (PASS −4, PARTIAL +4) | 3 → 3 (PASS −4, PARTIAL +4) | 74 → 75 (PASS −31, PARTIAL +30) | 21 → 21 (PASS −4, PARTIAL +4) |
| B02 | 10 → 13 (PASS −4, NE +1) | 4 → 5 (PASS −2, NE +1) | 335 → 376 (PASS −44, PARTIAL +3) | 31 → 31 (PASS −4, PARTIAL +4) |
| B03 | 39 → 43 (PASS −4) | 4 → 4 | 280 → 280 (PASS −14, PARTIAL +14) | 37 → 37 (PASS −7, PARTIAL +7) |

Every change goes the stricter way: 302 verdicts change, none of them to PASS. By rule
(`TRANSITIONS.json`):

- **Item positions (rules 53, 57)** — a stack is judged in its own slot (brewing stands by slot
  meaning), entity equipment by slot, round-trip inventories exactly: WorldSwitch `0308840`
  B02 / J03 / B03 chests and equipment, Chunker B02 items (identity, count, components, tag)
  and player inventory / armour, one J02 entity equipment for both WorldSwitch builds.
- **Zero ≡ absent only where the game reads it so (rule 54)** — `entity.data` and
  `block_entity.data` PASS → PARTIAL in the round trip, all four converters (e.g. Chunker 31
  B01 and 27 J01 block entities, WorldSwitch 18–21 J02 entities).
- **Bedrock aux in the round trip (rule 59)** — Chunker 1 B02 `aux`, WorldSwitch `0308840` 3
  B02 identities.
- **NOT_EVALUATED by design (14)** — player armour, whose slot the v1.3 fixtures do not record
  (`source-slot-not-recorded-in-v1.3-fixture`, 11), and the B02 chested-animal inventory at the
  direct level (`no-cross-edition-slot-reference`, 3 converters) — `KNOWN_LIMITATIONS.md`.

The largest change is WorldSwitch `0308840` B02 direct, 0 → 34 FAIL (chest contents in other
slots). WorldSwitch 2.8.0 moves by 1 direct FAIL (J02 entity equipment) and 1 round-trip FAIL
(B02 entity equipment). je2be's FAIL counts do not change.

## Reproducing and checking

- Rebuild the table from these rows (must be byte-identical to `COMPARISON-v1.3-closure.*`):
  `REPRODUCING.md` §8.
- Grade the 56 outputs again: `reports/closure-rescore/rescore-public.sh` (outputs: release
  assets, hashes in `results/v1.3/OUTPUTS.sha256`); the verdicts must be identical.
- Self-tests on this commit ([selftests/](selftests/SELFTESTS-v1.3.md)): 15 PASS, 0 FAIL,
  0 SKIP; the closure tests 122/122 (116 + 6 that need the Mojang reports and the je2be run
  records, run with them).

## Publication record

The machine results are copied unchanged from the grading folder, except the publication rule
of `docs/converters/worldswitch.md`: absolute paths of the grading machine are replaced by
`<LOCAL>`, `<HOME>`, `<BUILD>`, `<JAVA>` in `summary.json` (8 files: 7 je2be command lines,
1 Java error message). [PUBLICATION.json](PUBLICATION.json) lists, per run, the SHA-256 of
`results.jsonl.gz` (= the summary's `results_file`), of the summary as graded and as published,
and every JSON path redacted. After redaction every `converter_build` is identical to the
historical one. File hashes: [RESULTS.sha256](RESULTS.sha256).
