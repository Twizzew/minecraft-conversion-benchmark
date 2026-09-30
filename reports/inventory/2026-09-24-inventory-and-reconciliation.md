# MCCB — inventory and reconciliation of existing artefacts

Date: 2026-09-24. Scope: everything that existed locally and on GitHub **before** any
MCCB v1.1 work, so that nothing published is replaced or reinterpreted silently.

All hashes below were recomputed from the files on disk on 2026-09-24 (SHA-256).
Dates are UTC. "Freeze date" = the `LastPlayed` field of the world's `level.dat`
(the last time the game saved it), not a date anyone typed.

---

## A. State of the benchmark repository

| Item | Finding |
|---|---|
| Local clone | `Benchmarcks/minecraft-conversion-benchmark`, branch `main`, working tree clean before this work |
| Commits | `0864115` "MCCB v1.0 — publish the six frozen SOURCE MASTER worlds" (2026-09-15 19:16 +02:00); `21de5d3` "Use the canonical CC BY 4.0 text…" (19:28) |
| Remote | `origin` = github.com/Twizzew/minecraft-conversion-benchmark, public, licence detected CC-BY-4.0; `main` = `21de5d3` (in sync) |
| Content | README, METHODOLOGY, WORLDS, SHA256SUMS.txt, NOTICE, LICENSE, `tools/verify.sh`, `tools/verify.ps1` |
| `_release_assets/` (git-ignored) | the six v1.0 assets, byte-identical to the release |
| Issues / PRs / forks / stars | 0 / 0 / 0 / 0 |
| Conversion results in the repo | none (the v1.0 README states that none exist — still true on GitHub) |

## B. Tags and releases

| Tag | Target | Release | Published | Assets |
|---|---|---|---|---|
| `v1.0-source-worlds` | `0864115` | "MCCB v1.0 — Source Worlds" | 2026-09-15T17:27:35Z | 6 (each asset's GitHub digest equals `SHA256SUMS.txt`; 2 downloads each) |

No other tag, release or draft. The tag exists on GitHub only (not fetched in the local clone).

## C. Every source-world candidate found

### C.1 Canonical files

| World id | Class | Published / staged name | Edition · version | SHA-256 | Bytes | Freeze (LastPlayed) | Proposed status |
|---|---|---|---|---|---|---|---|
| **J01@1.0** | LAB | `MCCB_J01_STATIC_JAVA.zip` (v1.0 release) | Java 26.2 · DV 4903 | `47942eef4464f4e9435cd11292bd37113d0135421e3501d0454b55d05bee8cde` | 7 036 006 | 2026-09-08T17:08:10Z | **SUPERSEDED** by J01@1.1 |
| **J01@1.1** | LAB | `MCCB_J01_STATIC_JAVA_v1.1.zip` (proposed) | Java 26.3 · DV 5023 (level.dat) | `b28294c78bb7e3c755827153b8d52bbdb5f80a9a45b598d6608a141493d26cf3` | 7 912 549 | 2026-09-20T17:07:26Z | **ACTIVE** (new) |
| **J02@1.0** | LAB | `MCCB_J02_LIVING_JAVA.zip` (v1.0 release) | Java 26.2 · DV 4903 | `db97f7497094ed5681600b37a76ab81e975341280883dcf433b3d6c40e8f17a4` | 3 308 679 | 2026-09-10T22:24:41Z | **ACTIVE** (unchanged) |
| **J03@1.0** | LAB | `MCCB_J03_SYSTEMS_JAVA.zip` (v1.0 release) | Java 26.2 · DV 4903 | `45c7ae7293ff1dfd3310757a8b56f1d094e6928aa20a82b68ff45428f55bbc50` | 6 325 350 | 2026-09-13T21:19:18Z | **ACTIVE** (unchanged) |
| **J04@1.0** | LAB | `MCCB_J04_COMMANDS_JAVA.zip` (proposed) | Java 26.3 · DV 5023 | `44a58908bbf86554eb85c6c0fb6b8b060ed016965e943eab05e72145606a7b4c` | 5 986 114 | 2026-09-23T12:59:40Z | **ACTIVE** (new) |
| **B01@1.0** | LAB | `MCCB_B01_STATIC_BEDROCK.mcworld` (v1.0 release) | Bedrock 1.26.45.1 | `83e8e9909a3d8915980df317073b80c11421152d8f7ed88714fd196e45c0a667` | 119 207 | 2026-09-10T17:48:33Z | **ACTIVE** (unchanged) |
| **B02@1.0** | MANUAL_NATIVE | `MCCB_B02_LIVING_BEDROCK.mcworld` (v1.0 release) | Bedrock 1.26.45.1 | `34d9b5dfaff557ef5e3907cae8fba31fc5de8dc03cb49c145ab14b0e6f6ccd10` | 159 654 | 2026-09-10T16:38:44Z | **ACTIVE** (unchanged) |
| **B03@1.0** | LAB | `MCCB_B03_SYSTEMS_BEDROCK.mcworld` (v1.0 release) | Bedrock 1.26.45.1 | `fd16e5d795f6b707fb48bce821e09dcad5a8e15c87e101d6e080bb24c911a838` | 779 237 | 2026-09-15T16:21:28Z | **ACTIVE** (unchanged) |
| **GURREN** | REAL_WORLD_SURVIVAL | none (file name withheld, private) | Bedrock 1.26.21.1 | `a4579208e64b4e7493b6745fec5d4b9a1cda839d245027d57408819380374bd5` | 576 818 207 | 2026-05-16T14:01:41Z | **EXPERIMENTAL** — private, not publishable as is (see E.14) |

The "native manual Bedrock benchmark" named in the brief **is B02**: `Benchmarck manuel v1.mcworld`
in `confirmés/` is byte-identical to the published B02 asset. It is one world, listed once,
in the MANUAL_NATIVE class (it has no behaviour pack; every fixture was placed by hand).

Local copies found with the canonical bytes: `confirmés/B01 STATIC Core.mcworld`,
`confirmés/Benchmarck manuel v1.mcworld`, `confirmés/BO3 SYSTEMS.mcworld`,
`confirmés/MCCB_J03_SYSTEMS_JAVA26.zip`, `Benchmarcks/MCCB_J03_SYSTEMS_JAVA26.zip`,
`Benchmarcks/MCCB J01 STATIC - Java 26_2.zip` (= J01@1.0), `confirmés/MCCB J01 STATIC v1.1.zip`
(= J01@1.1), `confirmés/J04 COMMANDS.zip` (= J04@1.0).

### C.2 Look-alikes that are NOT benchmark inputs

| File | SHA-256 | What it is | Treatment |
|---|---|---|---|
| `confirmés/MCCB_J02_LIVING_JAVA26_2.zip` | `98d2664537c30bb28df18dea8100f2f9ecb3322c0d0bacad3c640ee94b33dee4` | Re-zip of J02@1.0 made 2026-09-21: the 75 files are byte-identical, only the timestamps of the 28 directory entries differ | Not a new source. Inputs always use `db97f749…` |
| `Benchmarcks/MCCB J01 STATIC - Java 26_2 (2).zip` | `65043e6141d42b46b1b75e71f5d0b2378c2ed192ef471febcdfd5dbe443a2c79` | Intermediate between J01@1.0 and J01@1.1 (2026-09-20 13:34): datapack replaced + overworld `r.1.2.mca` edited, level.dat still 26.2 | Recorded as provenance of J01@1.1, never an input |
| `Benchmarck manuel v1.mcworld` (project root) | `f2c9f2a46a8e96ed0902b9e694ef2f928c706f377eb2160f613cd7f35b8a12cd` | Same seed as B02, saved 2026-09-12; `NetworkVersion 800` / `InventoryVersion 1.26.40` are values written by a converter, not by the 1.26.45 client | Derivative, not a source |
| `~/Downloads/Benchmarck manuel v1.mcworld` | `83a96056aa10b40a62656070ff78ecaca0fba3d96236a01e880362d883e2cffe` | Same world on 2026-09-07, three days before the B02 freeze | Pre-freeze state |
| `mondes random après conv/Benchmarck manuel v1.mcworld`, `… après une ouverture`, `… v5` | `4eb9aab5…`, `d2dfad05…`, `059d0b9d…` | Converter outputs re-opened in Bedrock 1.26.51 (`NetworkVersion 800`) | Outputs, not sources |
| `Benchmarcks/Mon monde.mcworld` | `1bfb3aabf9cd97c44aab3d820e86651c09f97bfabdda9c6e33253e0d65534d1a` | B01 draft: same seed and pack as B01, saved 7 minutes before it | Pre-freeze state |
| `~/Downloads/B03 SYSTEMS.mcworld`, `B03_SYSTEMS_R11_CLEAN.mcworld` | `fe82b1ed…`, `a6769b98…` | Earlier B03 revisions (R11, 2026-09-14) | Pre-freeze states |
| `Benchmarcks/MCCB_J0x_…_R5/R8/CERT_GATE.zip` (92–184 KB) | — | Generator datapacks, not worlds | Not inputs |

Four different files are named `Benchmarck manuel v1.mcworld`. Only `34d9b5df…` is B02.

## D. Existing conversions

`confirmés/conversion parfaite vers l'autre coté/` (14 files) plus older copies in
`~/Downloads`, `_sorties_2026-09-19` … `_sorties_2026-09-23` and `mondes random après conv`.

| File | SHA-256 (prefix) | Direction (from content) | Target profile in output |
|---|---|---|---|
| `B01_STATIC_Core_java.zip` / `…_bedrock.mcworld` | `af11732d` / `2d4d9019` | B→J / return | 1.26.40 |
| `BO3_SYSTEMS_v3_java.zip` / `…_bedrock_retour.mcworld` | `e715c344` / `583eb00a` | B→J / return | **1.21.60** |
| `Benchmarck_manuel_v1_java (8) (1).zip` / `…_bedrock (7) (1).mcworld` | `307cf1cc` / `0927c78e` | B→J / return | 1.26.40 |
| `MCCB_J01_…_bedrock (3).mcworld` / `…_java (2).zip` | `566d977d` / `a1d6380a` | J→B / return | 1.26.40 |
| `MCCB_J02_…_bedrock (1).mcworld` / `…_java (1).zip` | `305641e2` / `dffbe66d` | J→B / return | 1.26.40 |
| `J03_SYSTEMS_bedrock.mcworld` / `…_java_retour.zip` | `11c6812e` / `3885afea` | J→B / return | 1.26.40 |
| `J04_COMMANDS_bedrock.mcworld` / `…_java_retour.zip` | `e2fb8806` / `4574fde8` | J→B / return | 1.26.40 |

Verdict: **none of them can be used as benchmark evidence.** None records the engine commit
or the options; for the J01 pair the source revision (1.0 or 1.1) cannot be proven from the
output; and the target profile differs between runs (B03 was converted with the 1.21.60
profile, the others with 1.26.40). They stay where they are, untouched, as historical
development artefacts. All MCCB v1.1 runs are regenerated from the canonical sources with
one identified engine commit and documented options (this is also the owner's explicit
preference: "fresh conversions on the new clean code").

## E. Conflicts and inconsistencies found

1. **J01 has two revisions.** v1.0 (26.2, published) ≠ current J01 (26.3). The v1.0 asset stays
   online unchanged and becomes SUPERSEDED; the new revision gets its own name, hash and release.
2. **Same filename, different bytes inside J01@1.1.** The embedded datapack keeps the name
   `MCCB_J01_STATIC_JAVA26_2_R9_ITEM_REGISTRY_FIX.zip` but its content is revision **R10**
   (`680a7ca3…` vs `5b9ddbf2…` in v1.0; 7 files differ, `verify/variants_physical.mcfunction` added).
3. **J01@1.1 contains an external NBT edit.** Its `QA_REPORT.txt` says: "World barrels were surgically
   populated from the existing variant oracle definitions". The overworld region `r.1.2.mca`
   changed on 2026-09-20 13:34 while `level.dat` was still 26.2, i.e. outside the game. This departs
   from the v1.0 construction rule "No fabricated data / native only".
4. **The R10 check never ran in game.** The world's scoreboard has no `#variants_phys` /
   `#variants_unexpected` score (R10's `verify` creates both). `#certified = 1` and
   `#verify_fail = 0` are carried over from the R9 run recorded in J01@1.0.
5. **J01@1.1 is mixed-version by construction.** `level.dat` is 26.3 (DataVersion 5023,
   `version_history [5023]`), but chunks the game did not load in 26.3 stay at 4903; its
   `LevelName` still says "Java 26.2". This is how Minecraft upgrades worlds (lazily, per chunk);
   it is documented, not "fixed".
6. **Two internal WorldSwitch notes contradict each other** about the `mccb26:states` palette
   (`{id, properties}` in lower case and `{"": …}` entries): one says Minecraft never writes it,
   an earlier one measured Java ≥ 26.x (DataVersion ≥ 5009) writing exactly these forms. The
   oracle settles it on J04 (a world only ever saved by 26.3) — see the oracle self-test report.
7. **J02 exists as two archives with different bytes** (C.2). Only the published bytes are used.
8. **B02's identity is not visible from its name** (`LevelName` "Benchmarck manuel v1"); the
   mapping is recorded in WORLDS.md since v1.0 and kept.
9. **B01 / B03 `SOURCE_MASTER_RECORD.md` are empty templates** — no in-game observation was ever
   recorded in them. Their case/coverage counts are self-declared by the generator packs.
10. **The v1.0 methodology announced a different result vocabulary** (PRESERVED / DEGRADED / LOST /
    NOT_APPLICABLE / SEMANTIC_EQUIVALENT). No result was ever published with it. v1.1 replaces it
    (PASS / ADAPTED / PARTIAL / FAIL / UNSUPPORTED / NOT_APPLICABLE) and publishes the mapping.
11. **Neutrality disclosure.** The J01 datapack README calls itself a "static benchmark generator
    for WorldSwitch", and WorldSwitch's developers ran WorldSwitch on these worlds many times during
    development, before any classification rule of v1.1 was written. No competitor has been run yet.
12. **Personal identifiers already public in v1.0.** All Java worlds carry the author's Minecraft
    account UUID `c7361fde-4983-4733-b2dc-3be58cc7762b` (`singleplayer_uuid`, `players/data/`);
    J03's scoreboard contains the name `TWIZZEW`; B02 contains a second player record
    (`3209b036-…`). They belong to the publisher's own test accounts, but are listed in
    KNOWN_LIMITATIONS rather than left implicit.
13. **WorldSwitch is closed source** (private repository). A third party cannot rerun the exact
    engine commit; the public web service exposes no build identifier, so which build it runs
    cannot be checked from outside. Reproducibility of WorldSwitch runs is therefore limited to
    re-verifying the published outputs, not regenerating them.
14. **GURREN is not publishable as is**: multiplayer world of a private group (other players'
    data), 1 186 files of 12 third-party resource packs (redistribution rights unknown), survival
    history since 2025-11. Any use requires the owner's decision, the other players' consent and a
    documented sanitised derivative with its own hash.
15. The GitHub repository description still says "six hash-pinned source worlds"; it will be
    inaccurate once v1.1 exists (changing it is a GitHub operation, listed in H).

## F. Proposed repository tree (adapted to what exists; nothing published is moved)

```text
/
├─ README.md                 updated: v1.0 history, v1.1 status, what is and is not claimed
├─ METHODOLOGY.md            v1.1 rules (fidelity levels, statuses, classes, aggregation)
├─ REPRODUCING.md
├─ KNOWN_LIMITATIONS.md
├─ CHANGELOG.md              benchmark history (v1.0 → v1.1), never rewritten
├─ WORLDS.md                 every world revision, ACTIVE / SUPERSEDED / EXPERIMENTAL
├─ LICENSE, NOTICE.md
├─ SHA256SUMS.txt            v1.0 list — UNCHANGED (the v1.0 release notes point to it)
├─ checksums/                one list per release (v1.1 sources, v1.1 WorldSwitch runs)
├─ manifests/                worlds.json, converters.json, runs.json, fixtures.json, results.json
├─ fixtures/                 one JSONL file per world (assertion definitions, no results)
├─ worlds/<ID>/README.md     per-world card (provenance, fixtures, known issues) — no binaries
├─ results/<converter>/      detailed results (JSONL) + summaries, per run
├─ reports/                  inventory, oracle self-tests, final checks, release strategy
├─ tools/                    readers, fixture generators, oracles, runners, self-tests
└─ docs/                     classification rules, equivalences, converter notes
```

Binary worlds and conversion outputs stay out of Git (GitHub Releases only). `_staging/` holds
release candidates locally and is git-ignored.

## G. Migration plan

1. Keep every v1.0 artefact byte-for-byte (`SHA256SUMS.txt`, tag, release, assets).
2. Declare MCCB **v1.1** = J01@1.1 (new), J04@1.0 (new) + J02, J03, B01, B02, B03 unchanged.
   J01@1.0 → SUPERSEDED (kept online). GURREN → EXPERIMENTAL, private, not in any statistic.
3. New asset names never reuse an old name with new bytes: `MCCB_J01_STATIC_JAVA_v1.1.zip`,
   `MCCB_J04_COMMANDS_JAVA.zip` (first revision); unchanged worlds keep their v1.0 names and bytes.
4. Write the v1.1 methodology, fixture registry and oracles **before** any competitor is run, and
   hash them (freeze manifest) so later changes are visible.
5. Regenerate all WorldSwitch runs with one clean engine commit (`0308840`) and the public-service
   default options; record hashes, logs, timings, environment.
6. Run the oracles; publish detailed and summary results, with every non-evaluated assertion
   counted as such.
7. Prepare (do not create) the v1.1 source release and the WorldSwitch runs release.

## H. Operations that would modify Git or GitHub (none performed)

The exact list of operations, commands and assets was handed to the maintainer for approval.
