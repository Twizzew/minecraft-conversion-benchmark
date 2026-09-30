# GURREN in MCCB v1.3

Measured on 2026-09-30 on `MCCB_R01_SURVIVAL_BEDROCK.mcworld`, SHA-256
`a640374228039cc6dd502c0192b472b30a0f9baa8588f886d2057990dcd1e1db`. Published as a release
asset with its contributors' permission (`NOTICE.md`, section 2), after removal of the
account identifiers it still held: SHA-256
`4cc666cf1325caa53e26189558d09b2f8bc534b733f134c58dd485b3c9d461fa` (last section). Results:
`results/v1.3-gurren/`. The results measured earlier on the private original (source
`ca618ebe…`) are not published nor reused; they served only as a coherence check (same
counts).

## Which file, exactly

| | |
|---|---|
| Source | `MCCB_R01_SURVIVAL_BEDROCK.mcworld`, written from the private original by `tools/worlds/sanitize-bedrock-survival.mjs --level-name "MCCB R01 SURVIVAL" --write` (65 `player_<id>` identity records and 21 `RealmsStoriesData*` keys removed; packs and icon removed) |
| SHA-256 (graded) | `a640374228039cc6dd502c0192b472b30a0f9baa8588f886d2057990dcd1e1db`, 654 372 052 bytes; not published |
| SHA-256 (published) | `4cc666cf1325caa53e26189558d09b2f8bc534b733f134c58dd485b3c9d461fa`, 681 858 287 bytes; release asset, not stored in Git |
| Not to confuse with | the private original `MCCB_GURREN_PRIVATE.mcworld` (`ca618ebe86c29a5101748d44d7e0dcd4c2c93958c80781bce6483a1d095dee03`); the earlier copy `a4579208…`; any converter output |

## Procedure (`run-gurren.sh`)

1. `review` — lists every text written by players (signs, books, names) into a private
   file (never committed). A human decides what may be published. Any change → new file,
   new SHA-256; start again from 1 with that file.
2. `freeze` — builds the fixtures from that exact file with the frozen tools and writes
   `reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json` (source SHA-256, fixture content hash,
   the manifest entry used, and a check that all 39 frozen tool files are unchanged)
   before any conversion. `FREEZE-v1.3.json` is not touched.
3. `convert` — the same four builds as the public table, same options: WorldSwitch
   `0308840`, WorldSwitch 2.8.0 `fd9b735`, Chunker 1.20.0, je2be core `8dfc4de`; Bedrock →
   Java (direct) and back (round trip).
4. `grade` — same evaluator, rules and Mojang normaliser; the table and integrity checks
   are produced by `table-v13.mjs` itself (only its world list changed).

Checked end to end on a stand-in world first; then run on the final file. Grading needs a
large Node heap (`MCCB_HEAP`, default 18432 MB): Chunker's grading exceeded 12 GB.

### How the frozen rules apply to it

The real-world rule for blocks (a deterministic sample of whole sub-chunks, two strata) is
written in a frozen tool under the id `GURREN@1.0` (`tools/fixtures/zones.mjs`), fixed
before any output of this world was examined. To apply exactly that rule without
editing a frozen file, the sanitised file is measured under the id `GURREN@1.0`, in a
working copy whose `manifests/worlds.json` differs from the frozen one in that single entry
(status ACTIVE, the sanitised file's name, size and SHA-256). The published table names the
source by its SHA-256, so it cannot be confused with the private file.

The overlay entry copies the frozen one, including its `publication_blockers` (personal data
of other players, the players' consent, third-party packs, no sanitised derivative). They
record the state at freeze time and stay in both files because both are pinned by hash.
All four have since been resolved: identity records and packs were removed, the sanitised
derivative was created and reviewed (below), and the players' consent was obtained.

### Review done on the final file (2026-09-30)

- identity: 0 live `player_<id>` record, 0 live `RealmsStoriesData*` key, 0 identity field
  (MsaId, SelfSignedId, platform ids, Xuid) and 0 XUID-like or e-mail-like value in
  `~local_player` / `player_server_*` / `level.dat`; level named `MCCB R01 SURVIVAL`; no
  resource pack, no icon (this check did not cover block entities nor deleted entries: last
  section);
- texts: identical to the reviewed list (153 sign texts, 23 item names, 3 book titles, 3 book
  authors, 17 book pages, 41 block names, 5 entity names). Remaining personal content: the
  in-game names of two other players in 3 item names and 1 sign, and a first name as a book
  author, covered by the players' consent rather than by an edit. No modification of the file
  was needed.

### Reading the result

As for the public worlds: raw counts first, then causes kept apart — converter bug,
edition limit, version behaviour (for example je2be's Java 1.21.10 player layout),
serialisation without effect, NOT_APPLICABLE, NOT_EVALUATED, possible oracle issue. Only
the differences needed to read the table are analysed.

## Account identifiers removed after grading

The identity check above covered the player records, `level.dat` and the identity fields.
A last scan before publication, of every value and of the raw database files, found Xbox
account identifiers that it had not covered: the `TextOwner` field of 85 signs and the
`xuid` tag of 3 written books (6 distinct accounts), and database entries deleted by the
sanitiser but still physically present (`RealmsStoriesData*` keys and their old values, and
one account id among the MANIFEST's table boundary keys).

`pseudonymise-owners.mjs` replaces each of these identifiers by a fixed pseudonym
(`0000000000000001` upwards; the same account always gets the same pseudonym) and rebuilds
the database from its live entries. The published file holds none of them (raw scan of
every table block, log and MANIFEST). Player names and texts are unchanged.

The results were not recomputed. The fixture file is rebuilt from the published file with
the frozen tools; the graded fixture content with the same substitution is byte-identical to
it. The per-assertion result files carry the same substitution; no status or count changed,
and the tables regenerated from them are identical. `FREEZE-v1.3-GURREN-ADDENDUM.json` is
unchanged; the hashes before and after are in `FREEZE-v1.3-GURREN-PSEUDONYMISATION.json`.
