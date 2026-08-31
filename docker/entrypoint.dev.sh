#!/bin/sh
# Checksum-gated dependency install for the dev container. node_modules lives
# in a named volume (see docker-compose.yml), so on a fresh volume this runs
# `npm ci` once; on later restarts it only reinstalls if package-lock.json
# actually changed, so hot-reload restarts stay fast. execs as PID 1 so
# `docker compose stop` sends SIGTERM straight to `next dev`, not this shim.
set -e

CHECKSUM_FILE="node_modules/.package-lock-checksum"
CURRENT="$(md5sum package-lock.json 2>/dev/null | cut -d' ' -f1)"
STORED="$(cat "$CHECKSUM_FILE" 2>/dev/null || echo '')"

if [ "$CURRENT" != "$STORED" ] || [ ! -x "node_modules/.bin/next" ]; then
  echo "[entrypoint.dev] package-lock.json changed (or node_modules empty/stale) — running npm ci"
  npm ci --no-audit --no-fund
  echo "$CURRENT" > "$CHECKSUM_FILE"
else
  echo "[entrypoint.dev] node_modules up to date, skipping install"
fi

exec "$@"
