#!/usr/bin/env bash
# MCCB 2026-11 — notation « détails » (révision 1.11 du registre + table de gravité 1.11 + lots 1 à 3).
# Écrit dans de NOUVEAUX dossiers : <racine>/04-notation-<conv>-r111/<MONDE>/ (aucun ancien dossier touché).
# R01 : registre R01_1.0-r111 (dérivé de la révision 1.10). Un monde à la fois.
#   bash tools/runners/worldswitch-lab/renoter-r111.sh <racine de sortie> <conv[,conv…]> <MONDE…>   (depuis 02-mccb/)
set -u
RACINE="$1"; CONVS="$2"; shift 2
export MCCB_JAVA_REPORTS="$(cd ../_work/java-reports/out/reports && pwd -W)"
export MCCB_WORK_DIR="$(cd ../_work && pwd -W)"
declare -A RUNS=( [worldswitch-avant-table18]=03-conversions-worldswitch [worldswitch-c25]=03-conversions-worldswitch-c25 [worldswitch-c26]=03-conversions-worldswitch-c26 [chunker-1.21.0]=03-conversions-chunker-1.21.0 [je2be-8dfc4de]=03-conversions-je2be-8dfc4de [umt-1.5.10]=03-conversions-umt-1.5.10 )
declare -A CONV_ID=( [worldswitch-avant-table18]=worldswitch-5e2e2d5 [worldswitch-c25]=worldswitch-5e2e2d5-c25 [worldswitch-c26]=worldswitch-5e2e2d5-c26 [chunker-1.21.0]=chunker-1.21.0 [je2be-8dfc4de]=je2be-core-8dfc4de [umt-1.5.10]=umt-1.5.10 )
declare -A FX=( [J01]=J01@2.0:fixtures/J01_2.0-r111.jsonl.gz [J02]=J02@2.0:fixtures/J02_2.0-r111.jsonl.gz [J03]=J03@2.0:fixtures/J03_2.0-r111.jsonl.gz [J04]=J04@2.0:fixtures/J04_2.0-r111.jsonl.gz [J05]=J05@1.0:fixtures/J05_1.0-r111.jsonl.gz [B01]=B01@1.0:fixtures/B01_1.0-r111.jsonl.gz [B02]=B02@1.0:fixtures/B02_1.0-r111.jsonl.gz [B03]=B03@1.0:fixtures/B03_1.0-r111.jsonl.gz [R01]=R01@1.0:_staging/private/fixtures/R01_1.0-r111.jsonl.gz )
for c in ${CONVS//,/ }; do
  export MCCB_RUNS_DIR="$(cd "../${RUNS[$c]}" && pwd -W)"
  OUT="$RACINE/04-notation-$c-r111"; mkdir -p "$OUT"
  for m in "$@"; do
    w="${FX[$m]%%:*}"; f="${FX[$m]#*:}"; t0=$(date +%s)
    if [ -e "$OUT/$m/summary.json" ]; then echo "== $c $m déjà noté"; continue; fi
    node --max-old-space-size="${MCCB_HEAP:-22528}" tools/oracles/evaluate.mjs --world "$w" --direct "${m}_aller" --roundtrip "${m}_retour" \
      --converter "${CONV_ID[$c]}" --fixtures "$f" --out "$OUT/$m" > "$OUT/$m.evaluate.log" 2>&1
    st=$?; echo "== $c $m exit $st ($(( $(date +%s) - t0 )) s)"
    [ $st -eq 0 ] || { tail -3 "$OUT/$m.evaluate.log"; continue; }
    node --max-old-space-size="${MCCB_HEAP:-22528}" tools/results/impact-report.mjs "$OUT/$m" --md "$OUT/$m/PERTES-PAR-GRAVITE.md" --json "$OUT/$m/pertes-par-gravite.json"
  done
done
echo "== fini $(date +%T)"
