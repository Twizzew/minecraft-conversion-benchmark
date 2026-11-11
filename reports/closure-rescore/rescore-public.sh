#!/bin/sh
# The official corrected rescoring of the 56 public outputs, as run on 2026-10-03 (one pass, exit 0 ×4).
# Environment as in REPRODUCING.md §3; MCCB_RUNS_DIR holds the 56 historical runs (run.json + output.*,
# bytes = results/v1.3/OUTPUTS.sha256); OUT must be a NEW folder outside results/v1.3.
set -eu
: "${MCCB_RUNS_DIR:?}" "${MCCB_WORK_DIR:?}" "${MCCB_JAVA_REPORTS:?}" "${OUT:?a new results folder}"
F=reports/freeze/FREEZE-v1.3.json; O=results/v1.3/OUTPUTS.sha256
cd "$(dirname "$0")/../../tools"
for spec in worldswitch:ws-0308840 worldswitch:ws-fd9b735 chunker:chunker-1.20.0 je2be:je2be-core-8dfc4de; do
  c=${spec%%:*}; p=${spec#*:}
  node oracles/evaluate-suite.mjs --converter "$c" --prefix "$p" --results-dir "$OUT" --freeze "$F" --outputs "$O"
done
