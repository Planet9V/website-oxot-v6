# OpenRouter image generation — verified reference

**Confirmed working 2026-08-23.** Model availability checked against OpenRouter's live `/models` API before use — two of three requested models turned out not to exist; see below rather than assume any model name is real without checking.

## Model availability — checked, not assumed

The owner asked to use one of `qwen/qwen-image-3-pro`, `x-ai/grok-imagine-image-2.0`, or `google/gemini-3.1-flash-image`. Queried `GET https://openrouter.ai/api/v1/models` directly (requires `OPENROUTER_API_KEY`) and filtered for each vendor:

| Requested model | Status |
|---|---|
| `qwen/qwen-image-3-pro` | **Does not exist.** Every `qwen/*` model currently on OpenRouter is text-only (`output_modalities: ["text"]`) — zero image-capable Qwen models as of this check. |
| `x-ai/grok-imagine-image-2.0` | **Does not exist.** Every `x-ai/grok-*` model currently on OpenRouter is text-only. No `grok-imagine` model of any version was found. |
| `google/gemini-3.1-flash-image` | **Real and confirmed image-capable** — `output_modalities: ["image", "text"]`. This is the one actually used below. |

**How to re-check this yourself** (do this before trusting any model name, including ones in this document, since OpenRouter's catalog changes):

```bash
curl -s https://openrouter.ai/api/v1/models -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  | python3 -c "
import json, sys
data = json.load(sys.stdin)
for m in data['data']:
    mods = m.get('architecture', {}).get('output_modalities', [])
    if 'image' in mods:
        print(m['id'], mods)
"
```

Other real, image-capable models seen in the same check (useful alternatives): `google/gemini-3.1-flash-lite-image`, `google/gemini-3-pro-image`, `google/gemini-2.5-flash-image` (used earlier in this project's history, still real), `openai/gpt-5-image`, `openai/gpt-5-image-mini`, `openai/gpt-5.4-image-2`.

## How the API call works

Image-capable models on OpenRouter are invoked through the normal `/chat/completions` endpoint — there is no separate "images" endpoint. The differentiator is the `modalities` request field:

```bash
curl -s https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemini-3.1-flash-image",
    "messages": [{"role": "user", "content": "<prompt>"}],
    "modalities": ["image", "text"]
  }'
```

The response is a normal chat-completion object. The generated image is **not** in `message.content`; it's under `message.images[0].image_url.url` as a `data:` URI (base64-encoded):

```json
{
  "choices": [{
    "message": {
      "content": "",
      "images": [{ "image_url": { "url": "data:image/jpeg;base64,<...>" } }]
    }
  }]
}
```

Decode the base64 payload after the comma in the `data:` URI to get the raw image bytes. The MIME type in the header (`image/jpeg` in testing, even though the request didn't specify a format) tells you the real file extension to use — don't assume PNG.

## Reusable script: `scripts/openrouter-generate-image.sh`

```
Usage: scripts/openrouter-generate-image.sh "<prompt>" <output.png> [model]
```

Defaults to `google/gemini-3.1-flash-image` if no model is given. Builds the request with `jq` (so prompt text with quotes/newlines is escaped correctly), calls the API, and decodes the response with Python. Fails loudly with the model's own text response if no image comes back (e.g. a text-only model was passed by mistake) rather than writing an empty/corrupt file.

## Quality observed

Two prompts tested end-to-end, both on-brief and usable without retries: an isometric PLC/DIN-rail controller illustration (dark navy `#0a0f14` background, single Dutch-orange `#E58B3F` accent LED, clean technical-editorial line art) and a photorealistic isometric server rack with a single glowing orange status light. Both matched the brand palette precisely when the palette was specified in the prompt — worth being explicit about exact hex values rather than describing colors loosely.

## Related

- Full research/decision trail: Ruflo memory, `decision-log` namespace, key `oxot-openrouter-image-reference-2026-08-23`.
- Post-processing generated images (resize/compress): `docs/GIMP-HEADLESS-BATCH-EXPORT.md`
- Rendering real project 3D models instead of generating from a text prompt: `docs/BLENDER-HEADLESS-RENDER.md`
