# WorldSwitch in MCCB v1.1

WorldSwitch is the converter sold by the maintainer of MCCB. It is measured with exactly
the same sources, fixtures, rules and evaluator as any other converter
(METHODOLOGY §8). This page records how it was run, so the runs can be repeated.

## Build under test

| | |
|---|---|
| Engine commit | `030884039c78fd1c076fa42ba0975dd92c420b7e` (short `0308840`), 2026-09-23 23:29 +02:00 |
| Engine package | `minecraft-world-converter` 2.7.80 |
| Working tree | clean (checked by the runner: `git status --porcelain --untracked-files=no` empty) |
| Lock file | `package-lock.json` SHA-256 recorded in every `run.json` |
| Source code | **not public**. The runs can be repeated by WorldSwitch or through the public web service; the build of the web service is not exposed, so a web-service run cannot be tied to this commit. |

## How it was run

`tools/runners/worldswitch/run-suite.mjs` → `run.mjs` → `child.mjs`: one fresh Node.js
process per conversion, calling the engine library the way the web service's conversion
child process does. Environment variables that the engine reads (`MC_*`, `WS_*`,
`WORLDSWITCH_*`, `CONVERSION_*`, `UV_THREADPOOL_SIZE`) are removed from the child's
environment, so the engine runs on its defaults.

Options — the defaults of the public upload form, never tuned per world:

| Direction | Options |
|---|---|
| Java → Bedrock | `targetVersion: "latest"` (Bedrock 1.26.40 profile), `recoverUnlinked: true`, `locale: "en"` |
| Bedrock → Java | `recoverUnlinked: true`, `locale: "en"` (no Java account UUID, no player map) |

`locale` only changes texts the engine writes (report strings, recovery container
names), not converted data.

Round trips use the same build and the same options on the direct run's output
(`…_j2b2j`, `…_b2j2b`). Two runs were repeated to check determinism (`…_rerun1`).

## What its outputs are

- **Java outputs** are written as DataVersion 3700 (Java 1.20.4 layout). The game
  upgrades them on first open; MCCB reads them after the same upgrade (Mojang's
  FileFixerUpper and DataFixerUpper of Java 26.3).
- **Bedrock outputs** are LevelDB worlds with `level.dat` version 1.26.40.
- **Sidecars.** Outputs embed a private archive (`java_sidecar.bin` in Bedrock worlds,
  `bedrock_sidecar.bin` in Java worlds) that the engine reads back on a return
  conversion. The games do not read these files; they never count for direct fidelity,
  and they are the reason some aspects are `direct = FAIL/NOT_APPLICABLE` but
  `roundtrip = PASS`.

## Where the results are

- Run records and logs: `results/worldswitch/runs/<run id>/` (outputs are release
  assets, hashes in `checksums/MCCB-v1.1-runs-worldswitch-0308840.sha256`). In the
  copied logs, absolute paths of the machine are replaced by `<LOCAL>` (the folder
  holding the benchmark and the engine checkout) or `<HOME>`; nothing else is changed.
- Per-world results: `results/worldswitch/<direct run id>/summary.json` and
  `results.jsonl.gz` (one line per subject, every aspect, every level, with evidence).
- Every FAIL and PARTIAL grouped by cause, with an example each:
  `results/worldswitch/<direct run id>/FAILURE-CENSUS.md`.
- Overview: `results/worldswitch/SUMMARY.md`.
- Findings with evidence levels: `reports/findings/`.
