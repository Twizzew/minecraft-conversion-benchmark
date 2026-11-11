#!/usr/bin/env bash
# MCCB — CONVERSIONS WORLDSWITCH DANS UN LABO QUI REPRODUIT LE SERVEUR (jamais en production).
# Même chaîne que le site : envoi dans le seau → analyse par le service → job en file
# PostgreSQL → le VRAI worker (worker.mjs) commande la conversion au VRAI service isolé
# (converter-service.mjs) → livraison dans le seau. Limites et environnement repris de
# docker-compose.yml : convertisseur 4 CPU / 5632 Mio, sans réseau, lecture seule, sans
# capacité ; worker 0,75 CPU / 512 Mio. Un convertisseur et un worker NEUFS par conversion :
# le pic mémoire (cgroup memory.peak) et le CPU consommé (cpu.stat) sont ceux de CETTE
# conversion. Conversions l'une après l'autre (jamais deux en même temps).
#
# usage : banc-mccb.sh <image> <plan.tsv> <dossier-sorties> <dossier-entrées>
#   plan.tsv : <leg> <jtb|btj> <fichier dans dossier-entrées | @leg précédent>
set -Eeuo pipefail
IMG="$1"; PLAN="$2"; OUT="$3"; IN="$4"
LAB="$(dirname "$(readlink -f "$0")")"
S3JS=/srv/mccb-2026-11/src/scripts/labo/s3-emulateur.mjs
ID=mccb; NET=$ID-net; PG=$ID-pg; S3=$ID-s3; BUCKET=banc
VOLROOT=/var/lib/docker/volumes
PGPW="$(head -c 18 /dev/urandom | od -An -tx1 | tr -d ' \n')"
PGAUTH="mccb:${PGPW}"
mkdir -p "$OUT"
cleanup_leg() { docker rm -f "$ID-conv" "$ID-wk" >/dev/null 2>&1 || true
  docker volume rm "$ID-sock" "$ID-convtmp" "$ID-tmp" >/dev/null 2>&1 || true; }
cleanup() { cleanup_leg; docker rm -f "$PG" "$S3" >/dev/null 2>&1 || true
  docker network rm "$NET" >/dev/null 2>&1 || true; docker volume rm "$ID-s3" >/dev/null 2>&1 || true; }
trap cleanup EXIT
cleanup
docker network create --internal "$NET" >/dev/null
docker volume create "$ID-s3" >/dev/null
docker run -d --name "$PG" --network "$NET" --network-alias postgres -e POSTGRES_DB=mccb -e POSTGRES_USER=mccb \
  -e POSTGRES_PASSWORD="$PGPW" --cpus 1 --memory 512m --tmpfs /var/lib/postgresql/data postgres:17.11-alpine >/dev/null
docker run -d --name "$S3" --network "$NET" --network-alias s3 -u 0 -v "$ID-s3:/data" -v "$S3JS:/s3.mjs:ro" \
  -e S3_RACINE=/data -e S3_PORT=9000 -e S3_DEBIT_MO=0 --memory 1g --entrypoint node "$IMG" /s3.mjs >/dev/null
for i in $(seq 1 60); do docker exec "$PG" pg_isready -q -U mccb -d mccb && break; sleep 1; done
for i in $(seq 1 30); do docker logs "$S3" 2>&1 | grep -q 'prêt sur' && break; sleep 1; done
COMMUN=(-e "DATABASE_URL=postgresql://${PGAUTH}@postgres:5432/mccb" -e "DIRECT_URL=postgresql://${PGAUTH}@postgres:5432/mccb"
  -e R2_ENDPOINT=http://s3:9000 -e R2_ACCESS_KEY_ID=lab -e R2_SECRET_ACCESS_KEY=lab -e R2_BUCKET=$BUCKET
  -e R2_LIFECYCLE_MODE=external -e R2_RETENTION_DAYS=1 -e NODE_ENV=production
  -e CONVERSION_SOCKET=/run/worldswitch/conversion.sock -e WORKER_CONVERSION_TIMEOUT_MIN=480
  -e JOB_ACCESS_SECRET=labo-mccb-acces-hors-production-0123456789abcdef
  -e CONVERSION_MAX_INPUT_BYTES=32212254720 -e CONVERSION_MAX_OUTPUT_BYTES=42949672960 -e WORLD_ANALYSIS_TIMEOUT_MIN=10
  -e CONVERSION_INPUT_START_IDLE_MS=2700000 -e CONVERSION_TRANSFER_IDLE_MS=720000
  -e CONVERSION_DELIVERY_IDLE_MS=600000 -e CONVERSION_DELIVERY_FINALIZE_MS=1800000
  -e EXTRACT_RATIO_MAX=12 -e EXTRACT_FLOOR_MB=512 -e EXTRACT_CEIL_MB=49152)
docker run --rm --network "$NET" "${COMMUN[@]}" -w /app --entrypoint sh "$IMG" -c 'npx prisma migrate deploy >/dev/null' \
  || { echo "MIGRATIONS EN ÉCHEC"; exit 1; }
psql() { docker exec "$PG" psql -U mccb -d mccb -Atc "$1"; }
HOSTCPU="$(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //')"

while IFS=$'\t' read -r LEG DIR INPUT || [ -n "${LEG:-}" ]; do
  [ -z "${LEG:-}" ] && continue; [ "${LEG:0:1}" = "#" ] && continue
  R="$OUT/$LEG"
  if [ -f "$R/lab.json" ]; then echo "[$LEG] déjà fait"; continue; fi
  if [ "${INPUT:0:1}" = "@" ]; then
    PREV="$OUT/${INPUT:1}"; INF="$(ls "$PREV"/output.* 2>/dev/null | head -1)"
    [ -n "$INF" ] || { echo "[$LEG] entrée absente : ${INPUT:1} n'a rien livré"; mkdir -p "$R"; echo '{"skipped":"parent leg has no output"}' > "$R/skipped.json"; continue; }
    SRCREF="${INPUT:1}"
  else INF="$IN/$INPUT"; SRCREF="source"; fi
  rm -rf "$R"; mkdir -p "$R"; chmod 777 "$R"
  cleanup_leg
  for v in sock convtmp tmp; do docker volume create "$ID-$v" >/dev/null; done
  # 1. Convertisseur : docker-compose.yml, service `converter`.
  docker run -d --name "$ID-conv" --network none --cpus 4 --cpu-shares 256 --memory 5632m --memory-swap 5632m \
    --read-only --tmpfs /tmp:mode=1777 --cap-drop ALL --security-opt no-new-privileges:true --pids-limit 512 \
    -v "$ID-convtmp:/app/convtmp" -v "$ID-sock:/run/worldswitch" -w /app \
    -e NODE_ENV=production -e CONVERSION_SOCKET=/run/worldswitch/conversion.sock -e CONVERSION_ROOT=/app/convtmp \
    -e CONVERSION_SERVICE_MAX=3 -e WORKER_CONVERSION_TIMEOUT_MIN=480 -e WORLD_ANALYSIS_TIMEOUT_MIN=10 \
    -e CONVERSION_CPU_BUDGET=4 -e CONVERSION_MEM_BUDGET_MB=5120 -e CONVERSION_SCRATCH_FACTOR=4 \
    -e CONVERSION_DISK_MARGIN_GB=10 -e MC_SIDECAR_PSEUDO_MAX_BYTES=536870912 -e MC_BTJ_ALLOCATOR= \
    -e UV_THREADPOOL_SIZE=4 -e EXTRACT_RATIO_MAX=12 -e EXTRACT_FLOOR_MB=512 -e EXTRACT_CEIL_MB=49152 \
    -e CONVERSION_MAX_INPUT_BYTES=32212254720 -e CONVERSION_MAX_OUTPUT_BYTES=42949672960 \
    -e CONVERSION_INPUT_START_IDLE_MS=2700000 -e CONVERSION_TRANSFER_IDLE_MS=720000 \
    -e CONVERSION_DELIVERY_IDLE_MS=600000 -e CONVERSION_DELIVERY_FINALIZE_MS=1800000 \
    "$IMG" node converter-service.mjs >/dev/null
  for i in $(seq 1 60); do docker exec "$ID-conv" node -e "const n=require('net'),s=n.createConnection(process.env.CONVERSION_SOCKET);s.on('connect',()=>{s.end();process.exit(0)});s.on('error',()=>process.exit(1))" 2>/dev/null && break; sleep 1; done
  # 2. Mise en file comme le site (envoi, analyse, job).
  docker run --rm --network "$NET" "${COMMUN[@]}" -v "$ID-sock:/run/worldswitch" -v "$(dirname "$INF"):/bench/in:ro" \
    -v "$R:/bench/rec" -v "$LAB:/labo:ro" -w /app -e LEG_INPUT="/bench/in/$(basename "$INF")" -e LEG_DIR="$DIR" \
    -e LEG_OUT=/bench/rec/prep.json --entrypoint node "$IMG" /labo/leg-prep.mjs 2>&1 | tee "$R/prep.log"
  JOB="$(sed -n 's/.*"job_id": *"\([^"]*\)".*/\1/p' "$R/prep.json")"
  [ -n "$JOB" ] || { echo "[$LEG] mise en file impossible"; continue; }
  # 3. Le VRAI worker : docker-compose.yml, service `worker`.
  T0=$(date +%s.%N)
  docker run -d --name "$ID-wk" --network "$NET" --cpus 0.75 --memory 512m --memory-swap 512m --cap-drop ALL \
    --security-opt no-new-privileges:true --pids-limit 256 -v "$ID-sock:/run/worldswitch" -v "$ID-tmp:/app/tmp" -w /app \
    "${COMMUN[@]}" -e WORKER_CONCURRENCY=2 -e WORKER_MAX_BIG=2 -e WORKER_BIG_MB=1000 -e MIN_FREE_DISK_GB=30 \
    -e MIN_FREE_DISK_FLOOR_GB=2 -e SCRATCH_RATIO=3 -e WORKER_POLL_MS=2000 "$IMG" node worker.mjs >/dev/null
  # 4. Suivi : fin du job, pic du scratch du convertisseur et du worker (disque).
  PICC=0; PICW=0; ST=""
  while :; do
    ST="$(psql "SELECT status FROM \"Job\" WHERE id='$JOB'")"
    c=$(du -sb "$VOLROOT/$ID-convtmp/_data" 2>/dev/null | cut -f1); w=$(du -sb "$VOLROOT/$ID-tmp/_data" 2>/dev/null | cut -f1)
    [ "${c:-0}" -gt "$PICC" ] && PICC=$c; [ "${w:-0}" -gt "$PICW" ] && PICW=$w
    case "$ST" in done|failed|cancelled|refunded) break;; esac
    if [ "$(echo "$(date +%s.%N) - $T0 > 30000" | bc)" = 1 ]; then ST="timeout-banc"; break; fi
    sleep 2
  done
  T1=$(date +%s.%N)
  rd() { docker exec "$1" cat "/sys/fs/cgroup/$2" 2>/dev/null || echo ""; }
  CMP=$(rd "$ID-conv" memory.peak); WMP=$(rd "$ID-wk" memory.peak)
  CCPU=$(rd "$ID-conv" cpu.stat | awk '/^usage_usec/{print $2}'); WCPU=$(rd "$ID-wk" cpu.stat | awk '/^usage_usec/{print $2}')
  COOM=$(rd "$ID-conv" memory.events | awk '/^oom_kill /{print $2}')
  docker logs "$ID-conv" > "$R/converter.log" 2>&1 || true
  docker logs "$ID-wk" > "$R/worker.log" 2>&1 || true
  psql "SELECT row_to_json(j) FROM \"Job\" j WHERE id='$JOB'" > "$R/job.json"
  KEY="$(psql "SELECT coalesce(\"outputKey\",'') FROM \"Job\" WHERE id='$JOB'")"
  OFILE=""; OSHA=""; OBYTES=0
  if [ "$ST" = "done" ] && [ -n "$KEY" ] && [ -f "$VOLROOT/$ID-s3/_data/o/$BUCKET/$KEY" ]; then
    EXT="${KEY##*.}"; OFILE="output.$EXT"
    cp "$VOLROOT/$ID-s3/_data/o/$BUCKET/$KEY" "$R/$OFILE"
    OSHA=$(sha256sum "$R/$OFILE" | cut -d' ' -f1); OBYTES=$(stat -c %s "$R/$OFILE")
  fi
  ISHA=$(sha256sum "$INF" | cut -d' ' -f1)
  cat > "$R/lab.json" <<EOF
{
 "schema": "mccb.lab-run/1",
 "leg": "$LEG", "direction": "$DIR", "source_ref": "$SRCREF",
 "input": { "file": "$(basename "$INF")", "sha256": "$ISHA", "bytes": $(stat -c %s "$INF") },
 "job_id": "$JOB", "final_status": "$ST",
 "output": { "file": "$OFILE", "sha256": "$OSHA", "bytes": $OBYTES, "storage_key": "$KEY" },
 "wall_s_worker_start_to_terminal": $(printf "%.3f" "$(echo "$T1 - $T0" | bc)"),
 "converter": { "memory_peak_bytes": ${CMP:-null}, "cpu_usec": ${CCPU:-null}, "oom_kills": ${COOM:-null}, "scratch_peak_bytes_sampled_2s": $PICC },
 "worker": { "memory_peak_bytes": ${WMP:-null}, "cpu_usec": ${WCPU:-null}, "scratch_peak_bytes_sampled_2s": $PICW },
 "image": "$IMG", "image_id": "$(docker image inspect -f '{{.Id}}' "$IMG")",
 "limits": { "converter": "cpus 4, memory 5632m, swap 0, read-only, network none, cap-drop ALL, pids 512", "worker": "cpus 0.75, memory 512m, swap 0" },
 "host": { "cpu_model": "$HOSTCPU", "nproc": $(nproc), "kernel": "$(uname -r)", "mem_total_kb": $(awk '/MemTotal/{print $2}' /proc/meminfo) },
 "finished_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
  echo "[$LEG] $ST $(echo "$T1 - $T0" | bc | xargs printf '%.1f')s convPic=$(( ${CMP:-0} / 1048576 ))Mio $OFILE ${OSHA:0:12}"
  cleanup_leg
done < "$PLAN"
