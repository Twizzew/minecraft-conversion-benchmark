# v1.3 closure rescoring — procedure and provenance

How `results/v1.3-closure/` (56 public outputs) and `results/v1.3-r01-closure/` (8 R01
outputs) were produced, with the checks made before and after. Nothing here decides a verdict:
the grading is `tools/oracles/evaluate-suite.mjs` / `evaluate.mjs` and the table
`tools/results/table-v13.mjs`, unchanged. The scripts of this folder are reading aids and
records.

## Rules of the rescoring

- Only the historical outputs: each run's output hash must be the one of an authenticated
  output registry (`results/v1.3/OUTPUTS.sha256`, `results/v1.3-r01/OUTPUTS.sha256`), and
  each archive's bytes are checked against it when opened. No conversion was run again.
- Official grading only: locked on `FREEZE-v1.3.json` (and the R01 addendum), Java oracle
  authenticated (rule 60). Same scorer, rules, fixtures and assertions for every converter.
- Scorer, freeze, fixtures, manifests, run records and historical results untouched (checked by
  hash before and after, below). Results written to new folders only.
- No count edited: every number in the result folders comes from the machine results.

## Steps

| Step | Public (56) | R01 (8) |
|---|---|---|
| Preflight (read-only) | `preflight-public.mjs`: 56/56 outputs present, 56/56 bytes = registry, 56/56 run records usable, 28/28 direct → return links, 7/7 fixture registries = freeze, Java oracle OK, fingerprints → `records/public/preflight-public.json` | `make-r01-working-copy.sh`, `overlay-proof.mjs` (working copy = public commit + the 2 files of the addendum, 45 other scorer files identical), `preflight-r01.mjs` (8/8 outputs, 8/8 bytes, 4/4 links, source `a6403742…`, graded registry `9af167af…`, Java oracle OK) → `records/r01/` |
| Grading | `rescore-public.sh` — 2026-10-03 21:48–22:19 UTC, 4 × `evaluate-suite`, exit 0 | `rescore-r01.sh` — 2026-10-03 22:52 → 2026-10-04 08:16 UTC, 4 × `evaluate`, exit 0 |
| Post-run check | historical repository files (545) and the 56 runs (140 files): SHA-256 identical before / after | historical files (545), the 8 runs + source (41 files), the working copy (695 files): identical before / after |
| Publication | `publish-results.mjs` (copy; machine paths → `<LOCAL>`/`<HOME>`/`<BUILD>`/`<JAVA>` in `summary.json` only) → `PUBLICATION.json` | same |
| Table | `table-v13.mjs --freeze … --outputs …` on the published rows: byte-identical to the table built on the graded rows | same, with `--expect-scorer b5e94f7f…` |
| Deltas | `compare-results.mjs results/v1.3 results/v1.3-closure …`, `diagnose-transitions.mjs` | the same with `--worlds R01@1.0 --pseudonymised-baseline` |

Both result sets were then checked by an independent audit before publication.

### Interruption of the R01 pass

On 2026-10-04 at about 00:52 UTC the session running the grading stopped the job after its 2-hour
limit. `ws-0308840_R01@1.0_b2j` was complete (exit 0, 00:19 UTC) and kept.
`ws-fd9b735_R01@1.0_b2j` was being graded: `evaluate.mjs` writes into `<out>.tmp-<pid>` and
renames it only when complete, so no result existed; the incomplete folder was set aside. The
pass was resumed with `rescore-r01.sh` (same command per build; a build with a complete result
is skipped). No build was graded twice to completion. Logs: `records/r01/run-logs/`.

## Commands (repository root; environment as in REPRODUCING.md §3)

```bash
# public
MCCB_RUNS_DIR=<56 runs> OUT=<new folder> sh reports/closure-rescore/rescore-public.sh
node reports/closure-rescore/publish-results.mjs --from <new folder> --to results/v1.3-closure \
  --redact <machine path>=<TOKEN> … --record results/v1.3-closure/PUBLICATION.json
cd tools && node results/table-v13.mjs --dir results/v1.3-closure --freeze reports/freeze/FREEZE-v1.3.json \
  --outputs results/v1.3/OUTPUTS.sha256 --builds "$B" --md results/v1.3-closure/COMPARISON-v1.3-closure.md \
  --json results/v1.3-closure/COMPARISON-v1.3-closure.json && cd ..
node reports/closure-rescore/compare-results.mjs results/v1.3 results/v1.3-closure results/v1.3-closure
node reports/closure-rescore/diagnose-transitions.mjs results/v1.3 results/v1.3-closure results/v1.3-closure/TRANSITIONS.json

# R01 (needs the graded registry and source, which are not public)
sh reports/closure-rescore/make-r01-working-copy.sh <graded R01_1.0.jsonl.gz> <working copy>
cd <working copy> && MCCB_RUNS_DIR=<8 runs> MCCB_SOURCES_DIR=<a6403742… source> OUT=<new folder> \
  sh reports/closure-rescore/rescore-r01.sh
# then, in the repository: publish-results.mjs → results/v1.3-r01-closure, table-v13.mjs with
# --dir/--private-dir results/v1.3-r01-closure --worlds R01@1.0
# --freeze reports/freeze/FREEZE-v1.3.json,reports/freeze/FREEZE-v1.3-R01-ADDENDUM.json
# --outputs results/v1.3-r01/OUTPUTS.sha256 --expect-scorer b5e94f7f…,
# compare-results.mjs / diagnose-transitions.mjs results/v1.3-r01 results/v1.3-r01-closure … --worlds R01@1.0
```

`$B` is the builds list of REPRODUCING.md §8. Machine record of every hash and fingerprint:
[records/PROVENANCE.json](records/PROVENANCE.json).
