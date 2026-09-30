# MCCB methodology — version 1.3

This document governs MCCB v1.3 (v1.1 plus the rules 36–46 of v1.2 and 47–52 of v1.3 in
`docs/rules-changelog.md`; same source worlds). The v1.0 methodology (source worlds only) is kept
verbatim in [`docs/history/METHODOLOGY-v1.0.md`](docs/history/METHODOLOGY-v1.0.md).
The exact rule of every assertion is in [`docs/fixture-rules.md`](docs/fixture-rules.md).

## 1. What MCCB measures — and what it does not

MCCB measures how much of a world's **stored state** survives a conversion between
Minecraft Java Edition and Bedrock Edition, on a fixed, public, hash-pinned set of source
worlds, with checks that anyone can rerun.

It does **not** produce a single score, does not claim to cover all of Minecraft, and does
not decide whether a converter is "good": it reports, per world, per family of content and
per level, how many assertions passed, adapted, partially survived, failed, were not
applicable, or could not be evaluated — with the evidence of each.

## 2. Three levels, never merged

| Level | Question | How it is read |
|---|---|---|
| **direct** | What exists in the *target edition* right after conversion? | The target world, read the way the target game reads it (Java: after Mojang's own world upgrade; Bedrock: as stored). Data kept only in a converter's private archive (e.g. a "sidecar" file) does **not** count: the game does not read it. |
| **behavior** | Does it *work* in the target game? | In v1.1 one check is automated: whether the reference Java game (26.3) accepts to open a Java world (Mojang's world-upgrade file migration). Everything else at this level is NOT_EVALUATED — MCCB v1.1 runs no game server. |
| **roundtrip** | After A → B → A with the same converter, is the source state back? | The returned world, read exactly like the source world. A converter may legitimately restore data it archived during the first leg: this is why a sidecar can give `direct = PARTIAL` and `roundtrip = PASS`. |

**Read as the player gets it, the same way for every converter.** A converter may write
an older format and let the game migrate it at opening: MCCB judges what the reference game
actually obtains after its own normal processing — Mojang's file migration and DataFixer,
and the game's own loading of block entities — never the style of the file. The same
processing is applied to every Java output, whatever produced it, and to the Java source
worlds. What the game reads identically is judged identically: an absent game rule is its
registry default (rule 45), an omitted Bedrock block state is its default (rule 43), a
zero-valued key reads like an absent one (rule 46). No rule names a converter.

Round-trip results measure a *pair* of conversions by the same tool. They are never
presented as direct fidelity.

## 3. World classes, never merged

| Class | Worlds (v1.1) | Purpose |
|---|---|---|
| `LAB` | J01, J02, J03, J04, B01, B03 | Synthetic, systematic coverage of families (built by generator packs). |
| `MANUAL_NATIVE` | B02 | Built by hand in the retail game: engine-authentic state. |
| `REAL_WORLD_SURVIVAL` | none published | Long-played worlds. One (GURREN, a multiplayer Realm) is measured **privately** with the same tools and rules; its file, fixtures and results stay unpublished until a sanitised derivative exists, and no public statistic uses them — see KNOWN_LIMITATIONS.md. |

Results are published per world and per class. No statistic ever combines classes.

## 4. Results vocabulary

| Status | Meaning |
|---|---|
| `PASS` | The asserted meaning is preserved, per the fixture's rule. |
| `ADAPTED` | Represented differently, with an equivalent useful behaviour, or an adaptation imposed by an edition difference. In v1.1 exactly three rules can produce it: Java forced chunks ↔ Bedrock ticking areas; Java block properties (or body/head plant identities) recomputed from neighbours after a round trip (fixed lists in fixture-rules §3.1); sign text with the same words broken into lines differently (Bedrock wraps sign text itself, Java has 4 fixed lines — direct only). |
| `PARTIAL` | A significant part survives but a real loss remains. |
| `FAIL` | Lost or wrong, while preservation was reasonably possible. |
| `UNSUPPORTED` | Explicitly declared unsupported by the converter. **Reserved: not produced by v1.1 oracles**, which never read a converter's self-declarations. |
| `NOT_APPLICABLE` | The target edition has no relevant counterpart. Declared in advance, in the fixture file, from public references (identity reference, gamerule table, J04 station declarations, edition-only data). |

**NOT_EVALUATED is not a status.** An assertion MCCB cannot judge neutrally (no neutral
reference, needs a game runtime, undeclared equivalence…) is counted apart, with its
reason. It is never folded into PASS or FAIL.

The v1.0 methodology announced another vocabulary; no result was ever published with it.
Correspondence: `PRESERVED` → PASS, `SEMANTIC_EQUIVALENT` → ADAPTED, `DEGRADED` → PARTIAL,
`LOST` → FAIL, `NOT_APPLICABLE` → NOT_APPLICABLE; `UNSUPPORTED` and NOT_EVALUATED are new.

## 5. Principles of the rules

1. **The source world is the truth.** Fixtures are generated from the source world's
   content. Declarations shipped inside the world (case lists, generator functions, J04
   station books, J01 specification) choose positions and classifications; they never
   create an expectation for content the world does not contain. Declared-but-absent
   content is reported in `reports/source-validation/`, never evaluated.
2. **Edition differences are not failures.** What has no counterpart in the target
   edition is NOT_APPLICABLE, declared in advance. A Java datapack dimension, for
   instance, is NOT_APPLICABLE in Bedrock with everything it contains.
3. **A loss is not an adaptation.** ADAPTED is limited to the three rules above.
4. **Serialization style is not state.** Strict typed equality first; if it fails, a
   documented semantic equality (fixture-rules §4) is tried, and the result says which
   one matched.
5. **Read like the game.** Java data goes through Mojang's upgrade code of the reference
   version, and Java block entities through its block-entity load and save code; text is
   literal as in game; Bedrock layouts are normalised only where the native game's own
   layout was observed (fixture-rules §1). Where MCCB cannot run the game's code (Java
   entities, everything Bedrock), stored data is compared as stored.
6. **No neutral reference, no verdict.** Block states, variants, colours, enchantment
   ids, potion ids and command translations have no neutral cross-edition reference
   bundled with v1.1: those assertions are NOT_EVALUATED in direct, and evaluated in
   round trip (same edition, no reference needed).

## 6. Aggregation

MCCB v1.1 publishes **counts**, not scores. For every world × family × aspect × level:
`PASS`, `ADAPTED`, `PARTIAL`, `FAIL`, `UNSUPPORTED`, `NOT_APPLICABLE`, and `NOT_EVALUATED`
(with reasons). No percentage is computed by MCCB. Anyone deriving a rate must state its
denominator; the one MCCB recommends is *evaluated and applicable* assertions
(PASS + ADAPTED + PARTIAL + FAIL + UNSUPPORTED), with ADAPTED and PARTIAL shown
separately, never counted as PASS. Assertions of one subject are not independent (a
missing block fails both its identity and its state); counts are per assertion.

## 7. Runs and provenance

A run is identified by **source SHA-256 + converter build + options + direction**
(`manifests/runs.json`). Every tool receives the canonical source asset unmodified. The
evaluator refuses to run when the direct run did not consume the canonical source, or
when the return run did not consume the direct run's output. Outputs are hashed and
published as release assets; no output is modified before analysis.

## 8. Freezing, versions, and conflict of interest

- Source worlds are immutable. A changed world is a new revision with a new file name,
  a new hash and a new benchmark version. A published artefact is never replaced.
- The fixture registries (by content hash), the identity and gamerule references, the
  rules and the tools are frozen together by `reports/freeze/FREEZE-v1.1.json` **before
  any other converter is run**. After that, a rule change or a new fixture creates a new
  MCCB version; results of the frozen version are never re-graded.
- **Disclosure.** MCCB is built by WorldSwitch, which sells a converter. The v1.1 rules
  were written, and refined, while WorldSwitch's developers were looking at WorldSwitch
  outputs; no competitor had been run. Every rule change of that period is listed with
  its effect on WorldSwitch in [`docs/rules-changelog.md`](docs/rules-changelog.md),
  including the changes that improved WorldSwitch's counts. The mitigation is not a
  promise: it is that sources, fixtures, rules, tools and outputs are public and hashed,
  so a wrong result can be proven wrong.
- A test is never added because a competitor fails it, nor removed because WorldSwitch
  fails it.
- **v1.2.** Rules 36–46 were written during the accounting audit of v1.1, after Chunker
  1.20.0 had been measured under v1.1; each is listed with its effect on both converters.
  `reports/freeze/FREEZE-v1.2.json` fixes them before any converter is measured under
  v1.2. A defect of the oracle found after that freeze is reported separately and never
  changes v1.2 results.
- **v1.3.** Rules 47–52 correct the four oracle defects found after the v1.2 freeze
  (F10 player items, F11 `repair_cost`/`damage` 0, F12 double chests, F13 no structure
  family). They were written after WorldSwitch (several builds) and Chunker 1.20.0 had
  been measured under v1.2, and while a WorldSwitch build that fixed the structure defects
  it describes was being prepared; each is listed with its effect on both converters.
  `reports/freeze/FREEZE-v1.3.json` fixes them before the final comparison is graded.
  v1.2 results are kept as they were graded.

## 9. Reproducibility

[`REPRODUCING.md`](REPRODUCING.md) gives every step: sources and hashes, converter
versions and options, how to rerun the oracles, how to compare with the published
results. The oracles never import a converter's code.
