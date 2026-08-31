#!/usr/bin/env bash
# gimp-export.sh — resize + export an image via headless GIMP 3.x.
#
# Verified working syntax; see docs/GIMP-HEADLESS-BATCH-EXPORT.md for the
# full research trail (why file-jpeg-save/gimp-image-get-active-drawable
# don't work on GIMP 3.x, and how the real names were confirmed).
#
# Usage:
#   scripts/gimp-export.sh <input> <output.jpg> [max-dimension] [quality]
#
# Example:
#   scripts/gimp-export.sh generated/raw.png public/generated/hero.jpg 1600 0.75

set -euo pipefail

GIMP_BIN="${GIMP_BIN:-/Applications/GIMP.app/Contents/MacOS/gimp-console-3.2}"

INPUT="${1:?usage: gimp-export.sh <input> <output.jpg> [max-dimension] [quality]}"
OUTPUT="${2:?usage: gimp-export.sh <input> <output.jpg> [max-dimension] [quality]}"
MAX_DIM="${3:-1600}"
QUALITY="${4:-0.78}"

if [ ! -x "$GIMP_BIN" ]; then
  echo "gimp-export.sh: GIMP binary not found or not executable at $GIMP_BIN" >&2
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "gimp-export.sh: input file not found: $INPUT" >&2
  exit 1
fi

INPUT_BASENAME="$(basename "$INPUT")"

"$GIMP_BIN" -i --batch-interpreter=plug-in-script-fu-eval \
  -b "(let* ((image (car (gimp-file-load RUN-NONINTERACTIVE \"$INPUT\" \"$INPUT_BASENAME\"))))
       (gimp-image-scale image $MAX_DIM $MAX_DIM)
       (gimp-image-flatten image)
       (file-jpeg-export RUN-NONINTERACTIVE image \"$OUTPUT\" #:quality $QUALITY)
       (gimp-quit 0))"

if [ -f "$OUTPUT" ]; then
  echo "gimp-export.sh: wrote $OUTPUT ($(wc -c < "$OUTPUT" | tr -d ' ') bytes)"
else
  echo "gimp-export.sh: GIMP exited but $OUTPUT was not created — check output above" >&2
  exit 1
fi
