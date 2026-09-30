#!/bin/sh
# MCCB v1.3 — GURREN, public (sanitised) source: freeze it, then measure the four builds of
# the public comparison on it with the frozen v1.3 rules and tools. See reports/gurren/README.md.
#
#   sh reports/gurren/run-gurren.sh review  <final .mcworld>   # 1. private text review list
#   sh reports/gurren/run-gurren.sh freeze  <final .mcworld>   # 2. pin source + fixtures (before any conversion)
#   sh reports/gurren/run-gurren.sh convert <final .mcworld>   # 3. 4 builds × (direct + round trip)
#   sh reports/gurren/run-gurren.sh grade   <final .mcworld>   # 4. evaluation + table + integrity checks
#
# Environment (paths outside the repository):
#   MCCB_GURREN_WORK   scratch folder (tens of GB)          MCCB_JAVA, MCCB_JAVA_REPORTS (REPRODUCING §3)
#   WS_0308840, WS_FD9B735  clean WorldSwitch checkouts at those commits, dependencies installed
#   CHUNKER_JAR        chunker-cli-1.20.0.jar (SHA-256 41efb80b…ea502)
#   JE2BE_BIN          folder with j2b / b2j built as in docs/converters/je2be.md
#   MCCB_HEAP          Node heap (MB) for grading, default 18432: Chunker's GURREN grading does
#                      not fit in 12 GB (many FAIL evidences); plan RAM + swap accordingly
#
# Nothing here edits a frozen file. The measurement runs in a COPY of the repository
# ($MCCB_GURREN_WORK/repo) whose manifests/worlds.json differs from the frozen one in ONE
# entry: GURREN@1.0 becomes ACTIVE with the sanitised file's name, size and SHA-256. That
# keeps the id under which the frozen real-world sampling rule is written
# (tools/fixtures/zones.mjs, fixed before any output of this world was examined).
set -eu
PHASE=$1; SRC=$(realpath "$2")
REPO=$(cd "$(dirname "$0")/../.." && pwd)
W=${MCCB_GURREN_WORK:?set MCCB_GURREN_WORK}
FREEZE_SHA=8e317c7be305c990b6833657f9acbdba6076340fba9657960556610fbe4251a2
NAME=MCCB_R01_SURVIVAL_BEDROCK.mcworld
SHA=$(sha256sum "$SRC" | cut -d' ' -f1); BYTES=$(stat -c %s "$SRC")
echo "source $SRC  sha256 $SHA  bytes $BYTES"
[ "$(sha256sum "$REPO/reports/freeze/FREEZE-v1.3.json" | cut -d' ' -f1)" = "$FREEZE_SHA" ] || { echo "FREEZE-v1.3.json changed: stop"; exit 1; }
export MCCB_SOURCES_DIR=$W/sources MCCB_RUNS_DIR=$W/runs MCCB_WORK_DIR=$W/work
mkdir -p "$MCCB_SOURCES_DIR" "$MCCB_RUNS_DIR" "$MCCB_WORK_DIR"
[ -f "$MCCB_SOURCES_DIR/$NAME" ] || cp "$SRC" "$MCCB_SOURCES_DIR/$NAME"
[ "$(sha256sum "$MCCB_SOURCES_DIR/$NAME" | cut -d' ' -f1)" = "$SHA" ] || { echo "staged copy differs"; exit 1; }

# The working copy: the repository as it is, plus the one-entry manifest overlay.
if [ ! -d "$W/repo" ]; then
  mkdir -p "$W/repo"; (cd "$REPO" && tar --exclude=./_staging --exclude=./tools/node_modules -cf - .) | (cd "$W/repo" && tar -xf -)
  ln -s "$REPO/tools/node_modules" "$W/repo/tools/node_modules"
  node -e '
    const fs=require("fs"); const p=process.argv[1]; const m=JSON.parse(fs.readFileSync(p,"utf8"));
    const w=m.worlds.find(x=>x.id==="GURREN@1.0");
    w.status="ACTIVE"; w.asset={ name: process.argv[2], sha256: process.argv[3], bytes: Number(process.argv[4]), release: null, local_dir: null };
    w.level_name="MCCB R01 SURVIVAL"; w.original_filename=process.argv[2];
    w.provenance.sanitised_from="the private GURREN@1.0 file (not published); tools/worlds/sanitize-bedrock-survival.mjs + human text review";
    fs.writeFileSync(p, JSON.stringify(m,null,1)+"\n");' "$W/repo/manifests/worlds.json" "$NAME" "$SHA" "$BYTES"
fi
cd "$W/repo/tools"
case "$PHASE" in
review)
  node worlds/text-review.mjs --world GURREN@1.0 --out "$W/GURREN-TEXT-REVIEW.md"
  echo "PRIVATE review list: $W/GURREN-TEXT-REVIEW.md — never commit it. If anything must change, the file changes: re-run from 'review' with the new file." ;;
freeze)
  node fixtures/build-fixtures.mjs GURREN@1.0
  node - "$SHA" "$BYTES" "$NAME" "$FREEZE_SHA" <<'NODE'
const fs = require('fs'), crypto = require('crypto'), path = require('path'), zlib = require('zlib');
const [sha, bytes, name, freezeSha] = process.argv.slice(2);
const h = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const F = JSON.parse(fs.readFileSync('../reports/freeze/FREEZE-v1.3.json'));
const bad = Object.entries(F.tools).filter(([f, s]) => h(path.join('..', f)) !== s).map(([f]) => f);
if (bad.length) { console.error('frozen tool files differ:', bad); process.exit(1); }
const fx = '../fixtures/GURREN_1.0.jsonl.gz'; const raw = zlib.gunzipSync(fs.readFileSync(fx));
const add = { schema: 'mccb.freeze-addendum/1', benchmark_version: '1.3', freeze_file_sha256: freezeSha,
  statement: 'Pins the public GURREN source for MCCB v1.3 before any converter output of it exists. Rules and tools are those of FREEZE-v1.3.json, unchanged (checked below). Only manifests/worlds.json differs, in the GURREN@1.0 entry (overlay).',
  written_at: new Date().toISOString(),
  source: { world: 'GURREN@1.0', class: 'REAL_WORLD_SURVIVAL', file: name, sha256: sha, bytes: Number(bytes) },
  fixtures: { file: 'fixtures/GURREN_1.0.jsonl.gz', file_sha256: h(fx), content_sha256: crypto.createHash('sha256').update(raw).digest('hex') },
  worlds_manifest_overlay: JSON.parse(fs.readFileSync('../manifests/worlds.json')).worlds.find((w) => w.id === 'GURREN@1.0'),
  tools_checked_against_freeze: Object.keys(F.tools).length, private_results_not_reused: 'results of the private file (source ca618ebe…) are never published nor mixed' };
fs.writeFileSync('../reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json', JSON.stringify(add, null, 1) + '\n');
console.log('addendum written, fixtures content', add.fixtures.content_sha256);
NODE
  echo "Copy $W/repo/reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json and fixtures/GURREN_1.0.jsonl.gz into the repository, BEFORE 'convert'." ;;
convert)
  [ -f ../reports/freeze/FREEZE-v1.3-GURREN-ADDENDUM.json ] || { echo "run 'freeze' first"; exit 1; }
  printf '{"schema":"mccb.suite/1","benchmark_version":"1.3","source_dir":"%s","worlds":[{"id":"GURREN@1.0","file":"%s","direction":"bedrock_to_java"}]}\n' "$MCCB_SOURCES_DIR" "$NAME" > "$W/suite-gurren.json"
  for E in "${WS_0308840:?}" "${WS_FD9B735:?}"; do node runners/worldswitch/run-suite.mjs --engine "$E" --suite "$W/suite-gurren.json" --runs-dir "$MCCB_RUNS_DIR"; done
  JAVA=${MCCB_JAVA:-java}; CJ=${CHUNKER_JAR:?}
  [ "$(sha256sum "$CJ" | cut -d' ' -f1)" = 41efb80bba57c4eb08a810e5cc121211e2c0585aa8ff6eaf63d949782ecea502 ] || { echo "chunker jar hash"; exit 1; }
  C="--converter Chunker --slug chunker --version 1.20.0 --tool-file $CJ --runs-dir $MCCB_RUNS_DIR"
  [ -f "$MCCB_RUNS_DIR/chunker-1.20.0_GURREN@1.0_b2j/run.json" ] || node runners/generic/run-command.mjs $C --source "$MCCB_SOURCES_DIR/$NAME" --source-ref GURREN@1.0 --direction bedrock_to_java --run-id chunker-1.20.0_GURREN@1.0_b2j --cmd "$JAVA -jar $CJ -i {input_dir} -o {output_dir} -f JAVA_26_3" --options '{"outputFormat":"JAVA_26_3"}'
  [ -f "$MCCB_RUNS_DIR/chunker-1.20.0_GURREN@1.0_b2j2b/run.json" ] || node runners/generic/run-command.mjs $C --source "$MCCB_RUNS_DIR/chunker-1.20.0_GURREN@1.0_b2j/output.zip" --source-ref chunker-1.20.0_GURREN@1.0_b2j --direction java_to_bedrock --run-id chunker-1.20.0_GURREN@1.0_b2j2b --cmd "$JAVA -jar $CJ -i {input_dir} -o {output_dir} -f BEDROCK_R26_40" --options '{"outputFormat":"BEDROCK_R26_40"}'
  B=${JE2BE_BIN:?}; J="--converter je2be --slug je2be --version core-8dfc4de --commit 8dfc4de1ba5c7f72e804abea8663380c0dbd5680 --runs-dir $MCCB_RUNS_DIR --options {}"
  [ -f "$MCCB_RUNS_DIR/je2be-core-8dfc4de_GURREN@1.0_b2j/run.json" ] || node runners/generic/run-command.mjs $J --tool-file "$B/b2j" --source "$MCCB_SOURCES_DIR/$NAME" --source-ref GURREN@1.0 --direction bedrock_to_java --run-id je2be-core-8dfc4de_GURREN@1.0_b2j --cmd "$B/b2j -i {input_dir} -o {output_dir}"
  [ -f "$MCCB_RUNS_DIR/je2be-core-8dfc4de_GURREN@1.0_b2j2b/run.json" ] || node runners/generic/run-command.mjs $J --tool-file "$B/j2b" --source "$MCCB_RUNS_DIR/je2be-core-8dfc4de_GURREN@1.0_b2j/output.zip" --source-ref je2be-core-8dfc4de_GURREN@1.0_b2j --direction java_to_bedrock --run-id je2be-core-8dfc4de_GURREN@1.0_b2j2b --cmd "$B/j2b -i {input_dir} -o {output_dir}"
  ls "$MCCB_RUNS_DIR" ;;
grade)
  OUT=results/v1.3-gurren
  for p in worldswitch:ws-0308840 worldswitch:ws-fd9b735 chunker:chunker-1.20.0 je2be:je2be-core-8dfc4de; do
    c=${p%%:*}; x=${p#*:}; d="${x}_GURREN@1.0_b2j"
    [ -f "../$OUT/$c/$d/summary.json" ] || node --max-old-space-size=${MCCB_HEAP:-18432} oracles/evaluate.mjs --world GURREN@1.0 --direct "$d" --roundtrip "${d}2b" --converter "$c" --out "../$OUT/$c/$d"
  done
  # table-v13.mjs itself, with only its world list (and the private-dir switch) changed
  sed -e "s/^const WORLDS = .*/const WORLDS = ['GURREN@1.0'];/" -e "s/world.startsWith('GURREN') ? pdir : dir/dir/" results/table-v13.mjs > results/table-gurren.mjs
  node results/table-gurren.mjs --dir "$OUT" --builds "WS 0308840=worldswitch/ws-0308840_,WS 2.8.0 (fd9b735)=worldswitch/ws-fd9b735_,Chunker 1.20.0=chunker/chunker-1.20.0_,je2be core-8dfc4de=je2be/je2be-core-8dfc4de_" --md "$OUT/COMPARISON-v1.3-GURREN.md" --json "$OUT/COMPARISON-v1.3-GURREN.json"
  rm results/table-gurren.mjs
  echo "Results in $W/repo/$OUT — copy that folder, the run records and OUTPUTS hashes into the repository." ;;
*) echo "phase: review | freeze | convert | grade"; exit 2 ;;
esac
