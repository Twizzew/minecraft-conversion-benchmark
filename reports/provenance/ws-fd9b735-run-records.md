# WorldSwitch 2.8.0 (fd9b735) run records: reconstructed provenance

The 14 run records of WorldSwitch 2.8.0 (`fd9b73568456efc0b772d958ebffbc5599aa8fac`) on the
seven public v1.3 worlds — `ws-fd9b735_<world>_<j2b|b2j>` and their return legs
`…_j2b2j` / `…_b2j2b` — are **reconstructed**, not original. The original `run.json` files
were written on the machine that ran the conversions and were never committed; a search on
2026-10-03 (whole filesystem, 275 archives, every Git history and bundle of the working
environment) found none of them. They are in `results/worldswitch/runs/ws-fd9b735_*/run.json`,
next to the original records of the other builds, and every one says so in its
`reconstructed` block (`"original": false`).

## What a run record is used for

The MCCB scorer reads only these fields (`tools/lib/open.mjs`, `tools/oracles/evaluate.mjs`,
`tools/oracles/evaluate-suite.mjs` at `2027179`):

| Field | Use |
|---|---|
| `source.sha256` | direct run: must be the canonical source; return run: must be the direct run's output |
| `output.sha256` | must be the hash listed in `results/v1.3/OUTPUTS.sha256`; the archive's bytes are checked against it when opened |
| `output.file` | name of the archive next to the record |
| `converter`, `direction`, `options` (direct run) | copied into the result's summary; the table requires one build per label |

## Where each value comes from

Every value is copied from files written before the reconstruction; they agree on all 14
runs (the generator stops if any two disagree):

| Field | Sources (all equal) |
|---|---|
| direct `source.sha256` | `FREEZE-v1.3.json` `runs_to_grade`, the run's `summary.json`, `manifests/worlds.json`, `checksums/MCCB-v1.1-source-worlds.sha256` |
| return `source.sha256` | `FREEZE-v1.3.json` `runs_to_grade`, `summary.json` `direct_output_sha256` |
| `output.sha256` | `FREEZE-v1.3.json` `runs_to_grade`, `results/v1.3/OUTPUTS.sha256`, `checksums/MCCB-v1.3-runs-worldswitch-fd9b735.sha256`, `summary.json` |
| `output.file` | `results/v1.3/OUTPUTS.sha256` (third column) |
| direct `converter`, `direction`, `options` | `summary.json` (`converter_build` is the direct record's `converter`, copied verbatim when the run was graded) |
| return `direction` | the run id (`_b2j2b` / `_j2b2j`); no historical file records it, and no gate reads it |

Not reconstructed, because no historical source holds them and the scorer reads none of them:
timestamps, duration, exit status, environment, logs, memory peak, the engine's file name,
the output size, and the return legs' `converter` / `options` (the freeze records their build,
`fd9b735`). They are absent from the records, not invented. Each record lists them under
`not_recovered` and gives the SHA-256 of every source file it was built from.

## Reproduce and check

```bash
node reports/provenance/reconstruct-ws-fd9b735-runs.mjs --check   # the 14 files are exactly what the sources give
```

`ws-fd9b735-run-records.json` lists the 14 records with their SHA-256. To grade these runs,
place each record next to its historical output (`<runs dir>/<run id>/run.json` +
`output.zip` / `output.mcworld`); the official gates then check the output bytes against
`results/v1.3/OUTPUTS.sha256` as for any other run.

Nothing else changed: the scorer, the freeze, the fixtures, the sources, the outputs and the
v1.3 results are untouched.
