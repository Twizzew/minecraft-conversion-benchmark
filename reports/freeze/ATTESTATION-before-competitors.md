# Freeze attestation — before any competitor run

- Date (UTC): 2026-09-25T05:41:43Z
- `reports/freeze/FREEZE-v1.1.json` SHA-256: `1e2a3a9a520151b47419d97676a7694335fbaacb5fe577d3f91b5f643fbedbb5`
- State: rules, fixtures, references and tools of MCCB v1.1 are fixed from this point.
  The first competitor run (Chunker) starts after this record. Any later change to an
  item listed in the freeze file is a new MCCB version (v1.2), and every converter —
  WorldSwitch included — is then measured again under it.
- New runs of any converter (including new WorldSwitch builds) under these frozen rules
  are allowed; they add results, they never change the rules.

## Addendum — 2026-09-25T05:43:53Z (before any competitor result was evaluated)

- The freeze file now separates **evaluation-defining** tools (`tools/lib`, `families`,
  `oracles`, `fixtures`, `reference`, `java`, `package*.json` — strictly frozen) from
  **packaging** tools (manifests, runners, result summaries, self-tests, world tools —
  recorded for information; they never change a status).
- Checked against the attested file (kept as `FREEZE-v1.1-attested-2026-09-25T05-41Z.json`):
  sources, fixtures, rules, references and every evaluation-defining tool are identical.
  Changed since: `tools/manifests/build-freeze.mjs` (this split), `tools/manifests/build-manifests.mjs`
  (local paths removed from copied run records); added: `tools/runners/generic/run-suite-command.mjs`.
- New `FREEZE-v1.1.json` SHA-256: `2a4fce910d86f1d0426149d3adc1504d94bb94bebf05cca1f031f97ea84ae6ef`

## Addendum 2 — 2026-09-25T05:50:04Z (Chunker measured)

- Chunker 1.20.0 was run and evaluated with the frozen evaluation-defining items (checked
  identical to the attested file).
- The freeze file now lists results measured **before** the freeze (WorldSwitch) and
  **after** it (Chunker) separately, and treats `manifests/converters.json` (the register
  of measured converters) as informative; `manifests/worlds.json` stays strictly frozen.
- Packaging added: `tools/results/compare.mjs` (side-by-side counts).
- Packaging also changed: `tools/manifests/build-manifests.mjs` (local paths redacted in published `summary.json` copies; statuses and `results.jsonl.gz` untouched).
- `FREEZE-v1.1.json` SHA-256 now: `f3e441eddf2c9d24e977dcd490df701991ae504349fc08d87ae7e21f644f4a85`
