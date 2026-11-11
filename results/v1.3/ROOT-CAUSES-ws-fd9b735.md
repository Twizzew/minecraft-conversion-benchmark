# WorldSwitch 2.8.0 (`fd9b735`) — root causes of the remaining FAILs, MCCB v1.3 public worlds

A reading aid, written **after** grading. It changes no verdict, no count and no rule: a
FAIL stays a FAIL in `COMPARISON-v1.3.md`. Its only purpose is to say, for each repeated
behaviour, what kind of cause it has — so that a FAIL is never read as a converter bug by
default.

Input: the 188 groups of `node tools/results/root-summary.mjs results/v1.3/worldswitch ws-fd9b735 --top 1000`
(`reports/root-causes/groups-ws-fd9b735.txt`), mapped to one category each by
`reports/root-causes/classify-ws-fd9b735.mjs`. Every FAIL is classified (1 778 of 1 778).
Evidence for each group: `node tools/results/show.mjs results/v1.3/worldswitch/<run> --status FAIL …`.

Categories:

- **converter defect**: WorldSwitch could write it and does not;
- **Java-only data lost on the way back**: Bedrock cannot hold it, so the direct loss is
  intrinsic; a round trip could still carry it (as the source world's own data) and
  WorldSwitch does not — a converter limitation, not a game limit;
- **intrinsic Java ↔ Bedrock limit**: the target edition has no way to store it;
- **normal game recomputation / transient state**: a state the game recomputes on the next
  tick or update (a sensor mid-pulse, a piston mid-move);
- **LAB artefact**: a combination the LAB generator placed and normal play cannot produce
  (a door half without its other half);
- **serialisation difference without effect**: a default value written or omitted;
- **spec/fixture issue**: the frozen rule or a declaration of the source world produces a
  FAIL that does not measure the converter; reported here, **the frozen result is kept**
  (a change would be a new MCCB version, METHODOLOGY §8);
- **undecided**: needs a check in the game, not done.

| Category | FAIL | Behaviours (FAIL) |
|---|--:|---|
| Java-only data lost on the way back (intrinsic in direct; a round trip could keep it, WorldSwitch does not) | 116 | J03: Nether portals built at y = 200, above Bedrock's Nether (direct: NOT_APPLICABLE `above-bedrock-nether-height`), not kept for the way back (52) ; J02: Java-only entities (displays, interaction, giant, illusioner, mannequin, spawner minecart) not returned (37) ; J01: test_block / test_instance_block (Java-only blocks) (19) ; J01: Java-only item components (text style, custom_model_data, potion_duration_scale, max_damage) (5) ; J03: custom clocks + Nether/End world borders (3) |
| intrinsic Java ↔ Bedrock limit | 361 | J01: horizontal facing of floor/ceiling buttons and levers (not stored by Bedrock) (176) ; J01: mushroom-block face combinations (64 in Java, 16 in Bedrock) (170) ; J01: spectral_arrow, furnace_minecart (no Bedrock item) (4) ; J04: command blocks emptied; only a non-faithful approximation exists (falling_block ×2, swing) (3) ; B01: waterlogged door (Java doors cannot be waterlogged) (2) ; B03: pillar_axis of a purpur_block (no such state in Java) (2) ; J01: firework RGB colours snapped to Bedrock's 16 dye colours (2) ; B01: cauldron fill level (7 Bedrock levels, 3 Java levels) (1) ; J01: player standing in a custom dimension (1) |
| normal game recomputation / transient state | 577 | J01: sculk sensors stored mid-activation (470) ; J01: dripleaf tilt, target power, propagule stage (59) ; J01: moving pistons / piston heads (48) |
| serialisation difference without effect | 3 | B03: empty SporeBlossom block entity (Bedrock recreates it) (2) ; B02: WasPickedUp:0b (the default) missing inside a bundle's contents (1) |
| LAB artefact | 691 | J01: door halves stored without their other half (672) ; J01: lectern has_book / jukebox has_record / pot cracked contradicting the block entity (17) ; J01: tipped_arrow without a potion (the same item as arrow in Bedrock) (2) |
| spec/fixture issue (reported, frozen result kept) | 28 | J04: command blocks emptied; the station declares DIRECT/ADAPTABLE but Bedrock has no equivalent (reports/root-causes/J04-commands-ws-fd9b735.md) (26) ; B02: SpawnX/Y/Z come back on the bed block (same respawn block: rule 20 accepts it in direct, the round-trip rule does not) (2) |
| undecided (needs an in-game check) | 2 | B02: a parrot moved by 0.34 block (1) ; J02: wither health 300 → 450 (Bedrock scale?) (1) |
| **Total** | **1778** | |

No row is a converter bug: see the J04 and J03 notes below.

## Notes

- **Doors (672)**: the J01 state matrix stores lower and upper halves independently, each
  with states its missing partner would dictate (`hinge`, `open`, `powered`). Bedrock and
  Java both rebuild a door from its two halves; the combination does not occur in play
  (KNOWN_LIMITATIONS §1.2).
- **Buttons and levers (176)**: every one of them is on a floor or ceiling (88 + 88);
  Bedrock stores `facing_direction` up/down only, so the horizontal rotation of a
  floor/ceiling button cannot survive a pass through Bedrock.
- **Spawn point, B02 (2)**: the respawn **block** comes back identical (23, −63, 0); only
  the stored standing position `SpawnX/Y/Z` differs. Rule 20 accepts exactly this in the
  direct level; the round-trip rule compares `SpawnX/Y/Z` strictly. This is recorded as a
  possible inconsistency of the spec, for a future version; v1.3 counts it as FAIL.
- **Wither, J02 direct (1)** and **parrot, B02 round trip (1)**: not decided without the
  game (maximum health of a Bedrock wither; a parrot that may have been perched).
- **J04 command blocks (29)**: reviewed one by one in
  `reports/root-causes/J04-commands-ws-fd9b735.md`. 26 have no Bedrock equivalent (the
  station's DIRECT/ADAPTABLE declaration is wrong); 3 have only a non-faithful approximation;
  0 is a WorldSwitch bug. The frozen rule trusts the declaration, so they stay FAIL; the
  same stations are NOT_EVALUATED for Chunker, which keeps the invalid commands.
- **J03 Nether portals (52)**: the 40 blocks stand at y = 200 in the Nether. Bedrock's Nether
  ends at y = 127, and the frozen fixture already marks them NOT_APPLICABLE in direct
  (`above-bedrock-nether-height`). They are lost because nothing carries them through
  Bedrock for the way back: the same kind of loss as the other Java-only data, not a
  conversion error. (Earlier drafts, `results/v1.3/README.md` included, called this a
  converter defect.)

**None of WorldSwitch 2.8.0's FAILs on the public worlds is established as a converter bug**
(an equivalent exists in the target and is not written); 2 remain undecided without the game. 116 are Java-only data that a
round trip could carry and WorldSwitch does not; that is a converter limitation, and the
largest item that WorldSwitch could still improve.
