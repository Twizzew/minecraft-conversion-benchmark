#!/bin/bash
# MCCB 2026-11 — banc des convertisseurs concurrents, dans le MÊME environnement que le convertisseur
# WorldSwitch du labo (banc-mccb.sh) : un conteneur neuf par conversion, 4 CPU, 5 632 Mio sans swap,
# sans réseau. Temps = début/fin du conteneur (docker inspect), pic mémoire = memory.peak du cgroup.
#   bash banc-concurrent.sh <nom> <image> '<commande J→B>' '<commande B→J>' <plan.tsv> <dossier>
# Commandes : gabarits avec {in} (copie extraite du monde source, en écriture : LevelDB y pose son verrou) et {out} (dossier de sortie).
# Plan : <conversion> <jtb|btj> <fichier de /srv/mccb-2026-11/in | @conversion précédente>.
# Chaque sortie est emballée (output.mcworld / output.zip) ; un retour consomme CETTE archive.
set -u
NOM=$1; IMG=$2; CJ=$3; CB=$4; PLAN=$5; OUT=$6
IN=/srv/mccb-2026-11/in
ZIPIMG=mccb-zip:1
docker image inspect "$ZIPIMG" >/dev/null 2>&1 || printf 'FROM alpine:3.20\nRUN apk add --no-cache zip unzip\n' | docker build -q -t "$ZIPIMG" - >/dev/null
mkdir -p "$OUT"
LIMITES='--cpus 4 --memory 5632m --memory-swap 5632m --network none'

while IFS=$'\t' read -r LEG SENS SRC; do
  [ -z "${LEG:-}" ] && continue; case "$LEG" in \#*) continue;; esac
  D="$OUT/$LEG"; mkdir -p "$D/src" "$D/out"
  if [ "${SRC#@}" != "$SRC" ]; then ARCH=$(ls "$OUT/${SRC#@}"/output.* 2>/dev/null | head -1); else ARCH="$IN/$SRC"; fi
  if [ -z "$ARCH" ] || [ ! -f "$ARCH" ]; then echo "[$LEG] source absente ($SRC)"; echo '{"status":"source absente"}' > "$D/lab-concurrent.json"; continue; fi
  docker run --rm -v "$(dirname "$ARCH")":/a:ro -v "$D/src":/x "$ZIPIMG" sh -c "cd /x && unzip -qo '/a/$(basename "$ARCH")'"
  LVL=$(find "$D/src" -maxdepth 4 -name level.dat | head -1)
  if [ -z "$LVL" ]; then echo "[$LEG] pas de level.dat dans la source"; echo '{"status":"source illisible"}' > "$D/lab-concurrent.json"; continue; fi
  ROOT=$(dirname "$LVL")
  if [ "$SENS" = jtb ]; then CMD=$CJ; EXT=mcworld; else CMD=$CB; EXT=zip; fi
  CMD=${CMD//\{in\}/\/in}; CMD=${CMD//\{out\}/\/out}
  # Temps mesuré DANS le conteneur, autour de la seule commande (horodatages Docker non fiables sous WSL).
  CMD="S=\$(date +%s%N); $CMD; E=\$?; echo MCCB_MS=\$(( (\$(date +%s%N) - S) / 1000000 )) >&2; exit \$E"
  C="mccb-$NOM-$LEG"
  docker rm -f "$C" >/dev/null 2>&1
  docker run -d --name "$C" $LIMITES -v "$ROOT":/in -v "$D/out":/out --entrypoint sh "$IMG" -c "$CMD" >/dev/null
  CID=$(docker inspect -f '{{.Id}}' "$C")
  PEAKF=/sys/fs/cgroup/system.slice/docker-$CID.scope/memory.peak
  PEAK=0; T0=$(date +%s)
  while [ "$(docker inspect -f '{{.State.Running}}' "$C")" = true ]; do
    [ -r "$PEAKF" ] && P=$(cat "$PEAKF" 2>/dev/null) && [ "${P:-0}" -gt "$PEAK" ] && PEAK=$P
    [ $(( $(date +%s) - T0 )) -gt 30000 ] && { docker kill "$C" >/dev/null; echo "[$LEG] délai dépassé"; }
    sleep 0.5
  done
  ST=$(docker inspect -f '{{.State.StartedAt}}' "$C"); FI=$(docker inspect -f '{{.State.FinishedAt}}' "$C")
  EX=$(docker inspect -f '{{.State.ExitCode}}' "$C"); OOM=$(docker inspect -f '{{.State.OOMKilled}}' "$C")
  docker logs "$C" > "$D/stdout.log" 2> "$D/stderr.log"; docker rm "$C" >/dev/null
  MS=$(grep -o "MCCB_MS=[0-9]*" "$D/stderr.log" | tail -1 | cut -d= -f2); MS=${MS:-null}
  OLVL=$(find "$D/out" -maxdepth 4 -name level.dat | head -1)
  OF=""; OSHA=""; OB=0
  if [ -n "$OLVL" ]; then
    docker run --rm -v "$(dirname "$OLVL")":/w:ro -v "$D":/d "$ZIPIMG" sh -c "cd /w && zip -qrX /d/output.$EXT ."
    OF="output.$EXT"; OSHA=$(sha256sum "$D/$OF" | cut -d' ' -f1); OB=$(stat -c %s "$D/$OF")
  fi
  printf '{"leg":"%s","sens":"%s","converter":"%s","image":"%s","image_id":"%s","command":"%s","source":{"file":"%s","sha256":"%s","bytes":%s},"started_at":"%s","finished_at":"%s","duration_ms":%s,"exit_status":%s,"oom_killed":%s,"memory_peak_bytes":%s,"limits":"%s","output":{"file":"%s","sha256":"%s","bytes":%s}}\n' \
    "$LEG" "$SENS" "$NOM" "$IMG" "$(docker image inspect -f '{{.Id}}' "$IMG")" "${CMD//\"/\\\"}" "$(basename "$ARCH")" "$(sha256sum "$ARCH" | cut -d' ' -f1)" "$(stat -c %s "$ARCH")" \
    "$ST" "$FI" "$MS" "$EX" "$OOM" "$PEAK" "$LIMITES" "$OF" "$OSHA" "$OB" > "$D/lab-concurrent.json"
  echo "[$LEG] exit $EX ${MS} ms pic $(( PEAK / 1048576 )) Mio sortie ${OF:-aucune}"
done < "$PLAN"
