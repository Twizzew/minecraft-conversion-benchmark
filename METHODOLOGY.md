# MCCB methodology

MCCB v1.0 is at stage 1 of 3. This document describes stage 1 fully, and states what
stages 2 and 3 will require. Nothing beyond stage 1 has been performed.

| Stage | Description | State |
|-------|-------------|-------|
| 1 | Build and freeze the source worlds; publish their hashes | **Done — this release** |
| 2 | Convert the frozen worlds with each tool under test | Not started |
| 3 | Compare outputs against the sources and publish results | Not started |

---

## Stage 1 — building the source worlds

### Rules the worlds were built under

1. **Native only.** Each world was built in its own edition, in the retail client, with
   vanilla non-experimental content. No world is the output of a converter.
2. **No converter-specific tuning.** No fixture was chosen, moved or omitted because of how
   any particular tool behaves.
3. **No fabricated data.** Java NBT was never written into a Bedrock world and vice versa.
   Where an edition genuinely has no equivalent, the case is recorded as
   `NOT_APPLICABLE` or `SEMANTIC_EQUIVALENT` rather than being faked or silently dropped.
4. **Hand-built where the engine is the only valid source.** Entity state that a command
   cannot legitimately produce was placed by hand in-game (this is why B02 has no
   behavior pack at all).
5. **Save, quit, reopen.** Each world was saved and reopened before export, so that only
   state the engine actually persists is in the file.

### Versions frozen

| Edition | Version | Identifier in the files |
|---------|---------|-------------------------|
| Java | 26.2 | `DataVersion` 4903 |
| Bedrock | 1.26.45 | `lastOpenedWithVersion` 1.26.45.1, minimum compatible client 1.26.40 |

### Freezing

After export, each file was hashed with SHA-256 and the hash recorded in
[`SHA256SUMS.txt`](SHA256SUMS.txt). **These hashes were published before any conversion
was run and before any comparative result existed.**

For MCCB v1.0 the six files are immutable. Fixing, extending or re-exporting a world
produces a new benchmark version with a new release and new hashes; it never overwrites
v1.0. The previous release stays online so that older results remain checkable.

Only the *filename* was normalised for publication (`MCCB_<ID>_<THEME>_<EDITION>`); the
bytes are unchanged, and the original filename of each world is recorded in
[WORLDS.md](WORLDS.md#published-name--original-filename).

---

## Stage 2 — conversion (not yet performed)

When results are published, each run will record:

- the exact tool name and version (or commit),
- the exact command line or UI settings used,
- the source file and its SHA-256,
- the output file and its SHA-256,
- the date, and the host OS.

Every tool will receive the same six inputs, unmodified. A tool will not be given a
pre-processed, repaired or hand-fixed world.

## Stage 3 — comparison (not yet performed)

Comparison is between the **source world** and the **converted world**, per case, in the
target edition. The intended reporting vocabulary is:

| Result | Meaning |
|--------|---------|
| `PRESERVED` | The case survives conversion with equivalent meaning in the target edition. |
| `DEGRADED` | The case survives but loses state (orientation, inventory, variant, …). |
| `LOST` | The case is absent from the output. |
| `NOT_APPLICABLE` | The target edition has no equivalent; nothing could have been preserved. |
| `SEMANTIC_EQUIVALENT` | The target edition expresses the same intent by different means. |

`NOT_APPLICABLE` and `SEMANTIC_EQUIVALENT` will be declared from the *source world's* own
case metadata, which is already published in this release — they cannot be invented after
seeing a tool's output.

Results will be published with enough detail to be reproduced or contradicted. A result
that cannot be reproduced from the published inputs is not a result.

---

## Conflict of interest

MCCB is built and maintained by WorldSwitch, which sells a Java ↔ Bedrock converter and is
therefore not a neutral party.

The mitigation is not a promise of neutrality — it is verifiability:

- the inputs are public and hash-pinned, and were published before any result;
- the construction rules of each world are public;
- each world carries its own case list and coverage declaration inside the archive;
- results, when published, will carry the commands and versions needed to rerun them.

If a published result is wrong, it should be possible to prove it with the files in this
repository. That is the point.

## Corrections

Errors in the worlds or the documentation are expected and welcome. Open an issue.
Documentation errors are fixed in place; errors in the **worlds** are not — a world defect
is fixed in the next benchmark version, never by replacing a v1.0 file.
