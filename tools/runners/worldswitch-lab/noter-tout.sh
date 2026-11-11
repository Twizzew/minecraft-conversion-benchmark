#!/usr/bin/env bash
# MCCB 2026-11 — note toutes les paires aller/retour de WorldSwitch (notation « dev », hors gel)
# puis écrit, pour chaque monde, le rapport des pertes classées par gravité.
#   sh tools/runners/worldswitch-lab/noter-tout.sh [J01@2.0 …]      (depuis 02-mccb/)
set -u
cd "$(dirname "$0")/../../.."
export MCCB_JAVA_REPORTS="$(cd ../_work/java-reports/out/reports && pwd -W)"
export MCCB_WORK_DIR="$(cd ../_work && pwd -W)"
export MCCB_RUNS_DIR="$(cd "${MCCB_RUNS:-../03-conversions-worldswitch}" && pwd -W)"
OUT="${MCCB_OUT:-../04-notation-worldswitch}"; mkdir -p "$OUT"
WORLDS="${*:-J05@1.0 B01@1.0 B02@1.0 B03@1.0 J02@2.0 J04@2.0 J03@2.0 J01@2.0}"
for w in $WORLDS; do
  n="${w%@*}"
  t0=$(date +%s)
  node --max-old-space-size="${MCCB_HEAP:-14336}" tools/oracles/evaluate.mjs --world "$w" --direct "${n}_aller" --roundtrip "${n}_retour" \
    --converter "${MCCB_CONV:-worldswitch-5e2e2d5}" --out "$OUT/$n" > "$OUT/$n.evaluate.log" 2>&1
  st=$?
  echo "== $w exit $st ($(( $(date +%s) - t0 )) s)"
  [ $st -eq 0 ] || { tail -5 "$OUT/$n.evaluate.log"; continue; }
  node --max-old-space-size="${MCCB_HEAP:-14336}" tools/results/impact-report.mjs "$OUT/$n" --md "$OUT/$n/PERTES-PAR-GRAVITE.md" --json "$OUT/$n/pertes-par-gravite.json"
done
