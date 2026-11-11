# Running another converter on MCCB v1.1

Chunker and je2be were run with this procedure (`docs/converters/chunker.md`,
`docs/converters/je2be.md`). Any converter follows the same procedure; nothing below
depends on WorldSwitch.

## Rules

1. Run it **after** the v1.1 freeze (`reports/freeze/FREEZE-v1.1.json`). The fixtures,
   rules and tools are then fixed; a competitor's result never changes them.
2. Feed it the **canonical source assets** (hashes in
   `checksums/MCCB-v1.1-source-worlds.sha256`), unmodified.
3. Use its **default settings**, or its documented settings for the target version
   closest to the MCCB references (Java 26.3 / Bedrock 1.26.40). Record them. Never tune
   them per world.
4. Record the **exact build**: release version and download URL, or commit; the SHA-256
   of the executable or jar.
5. Round trip: convert the direct output back with the same build and settings.
6. Never edit an output. If the converter fails, the failure is the result.

## Commands

The generic runner executes any command line and writes the same run record as the
WorldSwitch runner (`schema: mccb.run/1`):

```bash
node tools/runners/generic/run-command.mjs \
  --converter Chunker --slug chunker --version <version> --tool-file <path to the jar> \
  --source _staging/v1.1-source-worlds/MCCB_J02_LIVING_JAVA.zip --source-ref J02@1.0 \
  --direction java_to_bedrock --run-id chunker-<version>_J02@1.0_j2b --runs-dir _staging/runs \
  --cmd "java -jar <path to the jar> <its own arguments using {input_dir} and {output_dir}>" \
  --options '{"target":"<the target format argument as passed>"}'
```

The command template's placeholders are documented at the top of
`tools/runners/generic/run-command.mjs`. The command line is stored verbatim in the run
record. The converted world is packed by MCCB (sorted entries, fixed timestamp) and also
identified by a tree hash of its files, which does not depend on packing.

Return leg: same command, `--source` = the direct run's `output.*`, `--source-ref` = the
direct run id, run id suffixed `2j` / `2b` (e.g. `chunker-<version>_J02@1.0_j2b2j`).

Evaluation — the evaluator refuses a run whose source is not the canonical asset, or a
return run whose source is not the direct run's output:

```bash
node tools/oracles/evaluate.mjs --world J02@1.0 \
  --direct chunker-<version>_J02@1.0_j2b --roundtrip chunker-<version>_J02@1.0_j2b2j \
  --converter chunker
```

Then `node tools/manifests/build-manifests.mjs` and `node tools/results/aggregate.mjs`.

## What to publish

- `results/<slug>/runs/<run id>/` (run records and logs) and
  `results/<slug>/<direct run id>/` (results), committed.
- Outputs as release assets, with a `checksums/MCCB-v1.1-runs-<slug>-<build>.sha256`
  file.
- A `docs/converters/<slug>.md` page like [worldswitch.md](worldswitch.md): build,
  command lines, settings, known caveats of the run.

Results of different converters are shown side by side, per world, per class, per
level; MCCB computes no ranking.
