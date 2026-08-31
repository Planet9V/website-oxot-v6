#!/usr/bin/env bash
# OXOT Cyber Digital Twin Portal Startup Script
set -e

PORT=${1:-8124}
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================================="
echo " OXOT Cyber Digital Twin — Consolidated Multi-Page Web Hub"
echo " Serving from: $DIR"
echo " Target port:  $PORT"
echo "=========================================================="

if command -v node &>/dev/null && [ -f "$DIR/server.js" ]; then
  echo " Launching native Node.js server (http://localhost:$PORT)..."
  PORT=$PORT node "$DIR/server.js"
elif command -v npx &>/dev/null; then
  echo " Launching with npx serve (http://localhost:$PORT)..."
  npx -y serve "$DIR" -l "$PORT"
elif command -v python3 &>/dev/null; then
  echo " Launching with Python http.server (http://localhost:$PORT)..."
  python3 -m http.server "$PORT" --directory "$DIR"
else
  echo " Error: No suitable runtime (Node.js or Python 3) found."
  exit 1
fi
