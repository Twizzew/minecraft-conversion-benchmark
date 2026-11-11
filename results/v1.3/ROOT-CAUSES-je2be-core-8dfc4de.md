# je2be (core `8dfc4de`) — raw MCCB v1.3 result and root causes

A reading aid, written **after** grading. It changes no verdict and no count: every FAIL
below stays a FAIL in `COMPARISON-v1.3.md`. It separates **A. what MCCB measured** from
**B. why**.

## A. Raw result under MCCB v1.3

Same sources, fixture registries, rules, normaliser (Mojang Java 26.3) and evaluator as for
WorldSwitch and Chunker; the counts are in [COMPARISON-v1.3.md](COMPARISON-v1.3.md).

- **Java → Bedrock (J01–J04)**: je2be writes a Bedrock world with a `level.dat` and **no
  chunk** (`0 chunks converted`, exit status 0). Almost every assertion is FAIL in direct;
  the round trip converts that empty world back and fails the same way. The few PASS are
  what an empty world satisfies under the frozen rules (`level.dat` values; rule 52 on the
  generation frontier).
- **Bedrock → Java (B01–B03)**: real conversions; the FAILs are listed by cause below.

## B. Root causes (231 595 FAIL, all classified)

`node reports/root-causes/classify-je2be-core-8dfc4de.mjs` (joins each graded row with its
frozen fixture):

| Cause | FAIL | Where (world level: count) |
|---|--:|---|
| A. Java 26 world layout (`dimensions/`) not read: empty Bedrock world (direct) and everything built on it (round trip) | 231442 | J01 direct: 56332 · J01 roundtrip: 111070 · J02 direct: 1618 · J02 roundtrip: 2474 · J03 direct: 712 · J03 roundtrip: 1246 · J04 direct: 23013 · J04 roundtrip: 34977 |
| B. host player written only in level.dat (Java 1.21.10 layout, no playerdata file): Java 26 drops it on upgrade (Mojang LevelDatToSavedDataFileFix) | 23 | B01 direct: 7 · B02 direct: 10 · B03 direct: 6 |
| C. scoreboards not converted (no scoreboard code in je2be-core) | 37 | B03 direct: 18 · B03 roundtrip: 19 |
| D. 26.x blocks (cinnabar, sulfur) unknown to je2be's Bedrock target: lost on the way back | 14 | B01 roundtrip: 14 |
| E. Bedrock ticking areas not written as Java forced chunks | 6 | B03 direct: 3 · B03 roundtrip: 3 |
| F. intrinsic: Bedrock-only gamerule, no Java counterpart to carry it back | 6 | B01 roundtrip: 2 · B02 roundtrip: 2 · B03 roundtrip: 2 |
| F. intrinsic: cauldron level, purpur axis, waterlogged door (same FAILs as the other converters) | 5 | B01 roundtrip: 3 · B03 roundtrip: 2 |
| G. entities / other players not converted or not returned (not reviewed one by one) | 44 | B02 direct: 12 · B02 roundtrip: 18 · B03 direct: 6 · B03 roundtrip: 8 |
| H. other, not reviewed one by one | 16 | B01 direct: 1 · B01 roundtrip: 2 · B02 roundtrip: 9 · B03 roundtrip: 3 · B03 direct: 1 |
| I. spec/fixture issue: SpawnX/Y/Z back on the bed block, same respawn block (the same 2 FAILs as WorldSwitch on B02; reports/root-causes/README.md) | 2 | B02 roundtrip: 2 |
| **Total** | **231595** | |

### A — Java 26 world layout not supported (231 442 FAIL, J01–J04)

**Not a bug of je2be's conversion engine**: an input format that this version does not
read. je2be-core `8dfc4de` targets Java 1.21.10 and looks for regions only in
`<world>/region`, `DIM-1/region` and `DIM1/region`; Java 26.x worlds keep them under
`dimensions/minecraft/<dimension>/region`. Checked with the same binary, runner and command:
je2be-core's own Java 1.21.10 test world converts (12 288 chunks); the same world with only
its folders moved to the Java 26 layout gives 0 (`docs/converters/je2be.md`,
`results/je2be/controls/`). Neither je2be nor the MCCB worlds were changed to get round it.

### B — host player (23 FAIL, direct, B01–B03)

je2be writes the host player in `level.dat` → `Player` (the Java 1.21.10 layout) and no
`playerdata/<uuid>.dat`. When Java 26.3 opens such a world, Mojang's own upgrade
(`LevelDatToSavedDataFileFix.extractPlayerDataToFile`) keeps only the UUID
(`singleplayer_uuid`) and drops `Player`, because the game always also saves the host in
`playerdata/`. MCCB's normaliser runs that Mojang code unchanged; the same happens to a
1.21.10 world saved by the game itself if its `playerdata/` file is missing (checked on
je2be-core's test world). **A consequence of je2be's target version (1.21.10), measured in
the MCCB reference version (26.3)**; the app's default (no launcher account imported) and
the command-line front end behave the same.

### C, D, E — features or content je2be does not handle (57 FAIL)

- scoreboards (B03): je2be-core has no scoreboard conversion;
- 26.x blocks (cinnabar, sulfur and their block entities, B01): converted to Java, then
  lost on the way back to Bedrock, whose target version (1.21.120) predates them;
- Bedrock ticking areas (B03): not written as Java forced chunks.

### F, I — same causes as for the other converters (13 FAIL)

Bedrock-only gamerules, cauldron level, purpur axis, waterlogged doors (intrinsic), and the
round-trip spawn-point rule (spec issue, `reports/root-causes/README.md`).

### G, H — not reviewed one by one (60 FAIL)

Entities not converted or not returned (B02, B03: arrows, trident, leash knots, two zombies,
a parrot…), a second stored player not returned (B02), item tags and a few other values.
Counted as FAIL; their cause is not asserted here.

## NOT_EVALUATED and NOT_APPLICABLE worth reading

- NOT_EVALUATED differs from the other converters on some worlds (J03 direct 492 vs 516,
  J04 direct 12 002 vs 16 533). Some rules decide NOT_EVALUATED from what the output
  contains: a command block whose command was translated, copied, or emptied without a
  declared equivalent. je2be's J04 output has no command block, so those assertions are
  FAIL instead. J04: 16 533 − 12 002 = 4 531 = 544 (`command-removed-equivalence-undeclared`)
  + 3 249 (`translated-command-correctness-needs-runtime`) + 77
  (`verbatim-command-validity-needs-runtime`) + 661 (`flags-moot-command-removed`), all 0 for
  je2be (`tools/results/ne-by-reason.mjs`).
- NOT_APPLICABLE (for example J01 direct 15 618, content with no Bedrock counterpart) is
  decided by the fixture: identical for the four builds on all seven worlds.
