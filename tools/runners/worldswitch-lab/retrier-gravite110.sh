#!/usr/bin/env bash
# MCCB 2026-11 — table de gravité 1.10 (coffre double aux moitiés inversées = MINOR, décision du 07/11/2026).
# Ne réévalue rien : relit les verdicts existants et refait seulement le tri par gravité, pour les
# 5 convertisseurs × 9 mondes, dans de NOUVEAUX dossiers `04-notation-<conv>-gravite110/<MONDE>/`.
# R01 : verdicts de la révision 1.10 du registre (`<conv>-table110/R01`). Un monde à la fois.
#   bash tools/runners/worldswitch-lab/retrier-gravite110.sh      (depuis 02-mccb/)
set -u
for c in worldswitch-avant-table18 worldswitch-c25 chunker-1.21.0 je2be-8dfc4de umt-1.5.10; do
  for m in J05 B01 B02 B03 J02 J04 J03 J01 R01; do
    src="../04-notation-$c/$m"; [ "$m" = R01 ] && src="../04-notation-$c-table110/R01"
    out="../04-notation-$c-gravite110/$m"; mkdir -p "$out"
    echo "== $c $m ($(date +%T))"
    node --max-old-space-size="${MCCB_HEAP:-22528}" tools/results/impact-report.mjs "$src" --md "$out/PERTES-PAR-GRAVITE.md" --json "$out/pertes-par-gravite.json" || echo "!! $c $m exit $?"
  done
done
echo "== fini $(date +%T)"
