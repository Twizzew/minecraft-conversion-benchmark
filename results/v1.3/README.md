# MCCB v1.3 — final comparison

> **Disclosure.** MCCB is built and maintained by the WorldSwitch team, and WorldSwitch sells
> a converter. Rules 47–52 of v1.3 were written after WorldSwitch and Chunker had been graded
> under v1.2 (their effect on both is listed in `docs/rules-changelog.md`); je2be was run and
> graded only after the freeze, with nothing changed. Everything below
> can be recomputed from public files: `REPRODUCING.md` §8.

## What was compared

| Label | Build | Options |
|---|---|---|
| WorldSwitch old | engine commit `030884039c78fd1c076fa42ba0975dd92c420b7e` | defaults of the public service |
| WorldSwitch final | engine 2.8.0, commit `fd9b73568456efc0b772d958ebffbc5599aa8fac` (clean tree) | same |
| Chunker | `chunker-cli-1.20.0.jar` (official release 1.20.0, the latest on 2026-09-29; SHA-256 `41efb80b…ea502`) | `-f JAVA_26_3` for Bedrock → Java, `-f BEDROCK_R26_40` for Java → Bedrock (the target format is required), nothing else — `docs/converters/chunker.md` |
| je2be | je2be-core commit `8dfc4de1ba5c7f72e804abea8663380c0dbd5680` (the engine of je2be-desktop 5.6.1, its latest release), official command-line front ends `j2b` / `b2j` compiled unmodified (SHA-256 `17265236…c293` / `0854d0c0…73b0eb`) | none (`j2b -i <world> -o <out>`, `b2j -i <world> -o <out>`; the app's defaults are the same) — `docs/converters/je2be.md` |

Same seven source worlds (SHA-256 in `checksums/MCCB-v1.1-source-worlds.sha256`), same
fixture registries (content hashes in `reports/freeze/FREEZE-v1.3.json`), same rules, same
tools for every converter. The freeze was written **before any grading under v1.3 counted
as a result**, and it pins the output hash of every WorldSwitch and Chunker run it grades
(`runs_to_grade`) — including WorldSwitch 2.8.0's, whose conversions were made before the
freeze file was written (commit `fd9b735` 2026-09-28T23:08Z, freeze attested 23:58Z; the
42 graded outputs match those pins). je2be was converted and graded after the freeze, with
nothing changed; its outputs are therefore not in `runs_to_grade`.

## Results

**[COMPARISON-v1.3.md](COMPARISON-v1.3.md)** (machine-readable: `COMPARISON-v1.3.json`).
Per-assertion evidence: `<converter>/<run>/results.jsonl.gz`, one line per subject, with
the rule and the observed value of every verdict. Counts only — no score, no ranking,
worlds are never added together, NOT_EVALUATED is never counted as PASS.

## Integrity (checked by `tools/results/table-v13.mjs`, all true on the seven worlds)

- every converter graded on exactly the same assertions (subject#aspect × level), from the
  same fixture registry (same content hash);
- each assertion counted once; the counts of every level add up to the number of assertions;
- no NOT_EVALUATED assertion counted as PASS.

The number of assertions is identical for every converter. The number EVALUATED can differ
slightly, by design, where a rule decides NOT_EVALUATED from what the output contains
(`tools/results/ne-by-reason.mjs`): a command emptied with no declared equivalence (rule 3)
or copied verbatim / translated (rule 42, fixture-rules §3.2) needs the game to be judged; a target that
stores no health value (rule 5). Largest case, J04 direct: WorldSwitch 3 870 command
assertions NOT_EVALUATED (544 removed, 3 249 translated, 77 verbatim), Chunker 3 899
(3 772 translated, 127 verbatim), je2be 0 (its output has no command block: those
assertions are FAIL).

## Reproducibility

- WorldSwitch final: the release commit was converted again from scratch; its verdicts are
  identical, assertion by assertion, to those of the working-tree build it was cut from
  (`ws-0308840+6da882c`, same engine files): 307 998 public assertions, 0 difference
  (`tools/results/same-verdicts.mjs`). The output archives differ byte-wise (timestamps).
- Grading the same outputs twice gives the same verdicts (je2be B03: `results.jsonl` byte-identical).
- je2be: B01 and B03 (Bedrock → Java) and J02 (Java → Bedrock) converted twice from scratch:
  0 verdict difference (1 486, 4 334 and 5 084 assertions).
- Oracle self-tests v1.3 (`reports/oracle-selftests/SELFTESTS-v1.3.md`): every source
  compared with itself passes every evaluated assertion (structure family included); every
  deliberate mutation is caught, nothing else fails.

## Main remaining root causes (one line per repeated behaviour)

`tools/results/root-summary.mjs <dir> <prefix>` groups FAILs by behaviour; every FAIL is classified by cause in [ROOT-CAUSES-ws-fd9b735.md](ROOT-CAUSES-ws-fd9b735.md). WorldSwitch final,
public worlds, 1 778 FAIL (30 direct, 1 748 round trip):

| Assertions | Worlds | Behaviour | Nature |
|--:|---|---|---|
| 1 142 | J01 | door halves stored without their other half (672) and sculk sensors stored mid-activation (470) come back recomputed | J01 state matrix: states normal play does not keep (KNOWN_LIMITATIONS §1.2) |
| ≈ 460 | J01 | other J01 matrix states recomputed on the way back (button facing, mushroom `down`, dripleaf `tilt`, propagule `stage`, target `power`, piston heads…) | mostly Bedrock recomputing / not storing the state |
| 52 | J03 | a Nether portal built at y = 200 in the Nether (28 obsidian frame blocks, 12 portal blocks × 2 aspects) is lost on the round trip | above Bedrock's Nether height (direct: NOT_APPLICABLE); a round trip could carry it, WorldSwitch does not |
| 37 | J02 | Java-only entities (displays, interaction, giant, illusioner, mannequin, spawner minecart) do not come back | intrinsic in direct; the round trip could keep them, WorldSwitch does not |
| 1 | J02 | a wither stored with 300 health comes out with 450 (direct) | undecided without the game |
| 29 | J04 | command blocks emptied although the world declares a Bedrock equivalent | reviewed one by one: 26 have no Bedrock equivalent (wrong declaration in the source world), 3 only a non-faithful approximation, 0 WorldSwitch bug — `reports/root-causes/J04-commands-ws-fd9b735.md`; frozen FAIL kept |
| 12 | J01 | `moving_piston` (a block in motion) | transient state |

Chunker 1.20.0, public worlds, 19 362 FAIL; largest behaviours: structure starts not written
(1 717 round-trip pieces; no 0x77/0x39 written — 150 J03 fortress pieces in direct), armor
stands (468 per aspect, direct and round trip), scoreboard values (434 direct, 455 round
trip), `written_book_content` (401 round trip), wall `up` states (J01).

je2be (core `8dfc4de`), public worlds, 231 595 FAIL — raw result and causes kept apart in
[ROOT-CAUSES-je2be-core-8dfc4de.md](ROOT-CAUSES-je2be-core-8dfc4de.md):

| Assertions | Worlds | Behaviour | Nature |
|--:|---|---|---|
| 231 442 | J01–J04 | Java → Bedrock writes a world with no chunk (`0 chunks converted`, exit 0); the round trip starts from it | **input format not supported by this je2be version**: it reads regions only from `region/`, `DIM-1/region`, `DIM1/region`, not from the Java 26 layout `dimensions/minecraft/*/region`. Not a conversion bug; checked with a positive control and a layout-only counter-control (`docs/converters/je2be.md`) |
| 23 | B01–B03 | host player absent in direct | je2be writes the host only in `level.dat` (Java 1.21.10 layout); Java 26.3's own upgrade drops it |
| 37 | B03 | scoreboards | not converted by je2be |
| 14 | B01 | 26.x blocks (cinnabar, sulfur) lost on the way back | newer than je2be's Bedrock target |
| 79 | B01–B03 | ticking areas, entities, a second player, intrinsic and spec cases, others | see the root-cause file |

## Limits

`KNOWN_LIMITATIONS.md`. In particular: structures are judged from stored data, not from
spawned mobs; behaviour in game is not automated. The real survival world GURREN is measured
on its sanitised file (SHA-256 `a6403742…`, pinned by `reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json`)
with the same four builds and rules, **shown apart** in [`results/v1.3-gurren/`](../v1.3-gurren/README.md)
and never added to these seven worlds; its source file is published with its contributors'
permission (`NOTICE.md`).
