# Post-grading reviews (MCCB v1.3)

Written after the v1.3 results were graded. **Nothing here changes a frozen rule, fixture or
verdict** (`reports/freeze/FREEZE-v1.3.json` is unchanged). These files explain the causes of
FAILs, and record the method defects found while doing so, as candidates for a later version.

| File | What |
|---|---|
| `../../results/v1.3/ROOT-CAUSES-ws-fd9b735.md` | every FAIL of WorldSwitch 2.8.0 on the public worlds (1 778) put in one cause category |
| `J04-commands-ws-fd9b735.md` | the 29 J04 command-block FAILs of WorldSwitch 2.8.0, one by one |
| `classify-ws-fd9b735.mjs`, `groups-ws-fd9b735.txt` | the classification and its input |
| `j04-replay-ws.mjs`, `j04-verdict.mjs`, `j04-fails-ws-fd9b735.json` | the J04 review: WorldSwitch's own code path replayed, and the per-station table |

## Method defects found after the freeze (kept in v1.3, documented)

1. **J04 declarations are trusted without being checked** (`docs/fixture-rules.md`, direct
   `command` table). Declared DIRECT / ADAPTABLE + emptied → FAIL, even when the target
   edition has no such command. 26 of WorldSwitch's 29 J04 FAILs come from wrong declarations.
   This also makes the rule **asymmetric**: a converter that writes an invalid command gets
   NOT_EVALUATED, while one that removes it and reports why gets FAIL (Chunker: NOT_EVALUATED
   on the same 29 stations). Candidate fix: check each declaration against the target
   edition's registries and command set before it can create a FAIL.
2. **Spawn point: direct and round-trip rules disagree.** Rule 20 accepts the same respawn
   block in the direct level; the round-trip rule compares the stored standing position
   `SpawnX/Y/Z`. 2 FAIL for WorldSwitch on B02, with the respawn block identical.
3. **An empty output still passes a few assertions.** A converter that writes no chunk
   (je2be on the Java 26 worlds) still gets PASS on `level.dat` values it did convert and on
   `structure.generation_frontier` (rule 52: "no unfinished chunk written as finished" is
   true of an empty world). The counts are correct under the rules; the documentation of
   such a run must say that the world is empty (`docs/converters/je2be.md` does).
