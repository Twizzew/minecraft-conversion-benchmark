# je2be — MCCB v1.3 runs

Build: je2be-core `8dfc4de1ba5c7f72e804abea8663380c0dbd5680` (the engine of je2be-desktop
5.6.1), official command-line front ends `j2b` / `b2j` compiled from the unmodified sources.
Build, commands and caveats: [docs/converters/je2be.md](../../docs/converters/je2be.md).

`runs/<run id>/` holds each run record (`run.json`: build, tool SHA-256, command line,
source hash, output hash and tree hash) and the converter's own output (`stdout.txt`,
`stderr.txt`). Output hashes: `checksums/MCCB-v1.3-runs-je2be-core-8dfc4de.sha256`.
Graded results: `results/v1.3/je2be/`.

| World | Direct | Round trip | Note |
|---|---|---|---|
| J01@1.1 | done | done | `0 chunks converted`: je2be does not read the Java 26 `dimensions/` layout |
| J02@1.0 | done | done | `0 chunks converted`: je2be does not read the Java 26 `dimensions/` layout |
| J03@1.0 | done | done | same |
| J04@1.0 | done | done | same |
| B01@1.0 | done | done | |
| B02@1.0 | done | done | |
| B03@1.0 | done | done | |

Determinism: B01 and B03 (Bedrock → Java) and J02 (Java → Bedrock) were converted twice.
The archives differ byte-wise (timestamps); the verdicts do not (B01 1 486, B03 4 334, J02
5 084 assertions, 0 difference).

## Results

Graded under the v1.3 freeze, direct and round trip, by `tools/oracles/evaluate-suite.mjs`
(`results/v1.3/je2be/<direct run id>/`); side by side in `results/v1.3/COMPARISON-v1.3.md`;
raw result and root causes kept apart in `results/v1.3/ROOT-CAUSES-je2be-core-8dfc4de.md`.
The few PASS on J01–J04 come from the empty world je2be writes (`level.dat` values; rule 52
on the generation frontier), see `docs/converters/je2be.md`.

`controls/`: the checks behind the "0 chunks" result (invocation, positive control,
layout-only counter-control). `runs/*_rerun1`: determinism re-runs, not graded in the table.
