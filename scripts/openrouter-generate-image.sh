#!/usr/bin/env bash
# openrouter-generate-image.sh — generate an image via an OpenRouter
# image-capable chat model and save it to disk.
#
# Verified working 2026-08-23 with google/gemini-3.1-flash-image. See
# docs/OPENROUTER-IMAGE-GENERATION.md for the full model-availability check
# (which model IDs are real vs guessed) and the response-format details.
#
# Requires OPENROUTER_API_KEY to be set in the environment.
#
# Usage:
#   scripts/openrouter-generate-image.sh "<prompt>" <output.png> [model]
#
# Example:
#   scripts/openrouter-generate-image.sh \
#     "A minimal isometric PLC controller, dark navy background, orange accent LED" \
#     public/generated/plc-illustration.png \
#     google/gemini-3.1-flash-image

set -euo pipefail

PROMPT="${1:?usage: openrouter-generate-image.sh \"<prompt>\" <output.png> [model]}"
OUTPUT="${2:?usage: openrouter-generate-image.sh \"<prompt>\" <output.png> [model]}"
MODEL="${3:-google/gemini-3.1-flash-image}"

if [ -z "${OPENROUTER_API_KEY:-}" ]; then
  echo "openrouter-generate-image.sh: OPENROUTER_API_KEY is not set" >&2
  exit 1
fi

TMP_JSON="$(mktemp)"
trap 'rm -f "$TMP_JSON"' EXIT

# jq builds the request body so the prompt is JSON-escaped correctly
# regardless of quotes/newlines in it.
REQUEST_BODY="$(jq -n --arg model "$MODEL" --arg prompt "$PROMPT" \
  '{model: $model, messages: [{role: "user", content: $prompt}], modalities: ["image", "text"]}')"

curl -s https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$REQUEST_BODY" \
  -o "$TMP_JSON"

python3 - "$TMP_JSON" "$OUTPUT" <<'PYEOF'
import json, base64, sys

resp_path, out_path = sys.argv[1], sys.argv[2]
with open(resp_path) as f:
    data = json.load(f)

if "error" in data:
    print(f"openrouter-generate-image.sh: API error: {data['error']}", file=sys.stderr)
    sys.exit(1)

message = data["choices"][0]["message"]
images = message.get("images", [])
if not images:
    print("openrouter-generate-image.sh: no images in response — model may not support image output, or returned text only:", file=sys.stderr)
    print(message.get("content", "")[:500], file=sys.stderr)
    sys.exit(1)

url = images[0]["image_url"]["url"]
header, b64_data = url.split(",", 1)
with open(out_path, "wb") as out:
    out.write(base64.b64decode(b64_data))
print(f"openrouter-generate-image.sh: wrote {out_path} ({header})")
PYEOF
