# Blender headless GLB rendering — verified reference (Blender 5.2.0 LTS)

**Confirmed working 2026-08-23, on this machine, against real project assets.** Tested twice against two different real GLB models already in the repo (`public/models/plc_s71500f_hq.glb`, `public/models/hyperscale_rack_hq.glb`), both producing correctly lit, on-brand renders — not synthetic test geometry.

## Environment

- **Blender version:** 5.2.0 LTS (build hash `fbe6228777e7`, built 2026-07-14)
- **Binary:** `/Applications/Blender.app/Contents/MacOS/Blender`
- **Render engine used:** `BLENDER_EEVEE` (real-time rasterizer — fast, good enough quality for hero/illustration use; `CYCLES` is available for path-traced quality if a render is worth the extra time)

## Working invocation

```bash
/Applications/Blender.app/Contents/MacOS/Blender -b --python scripts/blender-render-glb.py \
  -- public/models/plc_s71500f_hq.glb public/generated/plc-hero.png 1600 1200
```

- `-b` — background/headless mode (no GUI).
- `--python <script>` — run a Python script inside Blender's embedded interpreter.
- Everything after `--` is passed to the script as `sys.argv` (Blender consumes its own args before the `--`; the script must find the split itself — see the script).
- Render time for both test models: 2–4 seconds each.

## The reusable pattern: `scripts/blender-render-glb.py`

The script auto-frames any GLB by computing the world-space bounding box of every imported mesh, placing a three-quarter camera at a distance scaled to the model's actual size, and adding a single angled sun light plus a dark-navy world background matching the OXOT dark theme (`0.02, 0.03, 0.04` RGB) rather than Blender's default mid-grey. This means it works on an arbitrary project model without per-asset camera/light tuning — confirmed by running it unmodified against two models of very different scale and shape.

```
Usage: Blender -b --python scripts/blender-render-glb.py -- <input.glb> <output.png> [width] [height]
```

Width/height default to 1600×1200 if omitted.

## Two real bugs hit while building this, and the fixes

Both were genuine API mistakes on the first attempt, found and fixed by reading Blender's own error output — not guessed twice.

**1. `AttributeError: module 'bpy' has no attribute 'mathutils'`**
`mathutils` (the vector/matrix/quaternion math module) is a **separate top-level Python module** in Blender's embedded interpreter, not an attribute of `bpy`. Fix: `import mathutils` at the top of the script, then call `mathutils.Vector(...)` directly, never `bpy.mathutils.Vector(...)`.

**2. `TypeError: ... enum "BLENDER_EEVEE_NEXT" not found in ('BLENDER_EEVEE', 'BLENDER_WORKBENCH', 'CYCLES')`**
`BLENDER_EEVEE_NEXT` was a guess based on Blender's newer EEVEE renderer being informally called "EEVEE Next" in release notes and community discussion. The actual `scene.render.engine` enum value on this installed version (5.2.0 LTS) is still `'BLENDER_EEVEE'`. **Blender's own TypeError lists the exact valid enum values when you get one wrong** — the same self-correcting pattern GIMP's Script-Fu warnings show (see `docs/GIMP-HEADLESS-BATCH-EXPORT.md`). Read the error before searching the web for the answer; it's usually already in the message.

## Noise to ignore (not errors)

```
DeprecationWarning: 'World.use_nodes' is expected to be removed in Blender 6.0
```
Still works correctly on 5.2.0 LTS. Cosmetic warning about a future version, not a current failure.

## Quality notes from the two test renders

- EEVEE at 1600×1200 in ~2–4 seconds produced genuinely usable detail: individual cable colors and PLC terminal labels were legible on the first model; server-rack port LEDs (orange/blue/green) and panel banding rendered correctly on the second. Good enough for a hero image or illustration at web resolution without needing CYCLES' longer path-traced render time.
- If a render ever needs to match a very specific brand mood beyond "correctly lit on a dark background," the light rig (currently one sun lamp) and world background color are the two things to art-direct per use — the auto-framing camera logic should not need to change.

## Related

- Full research/decision trail: Ruflo memory, `decision-log` namespace, key `oxot-blender-reference-2026-08-23`.
- Reusable script: `scripts/blender-render-glb.py`
- GIMP counterpart (post-processing/compression of generated or rendered images): `docs/GIMP-HEADLESS-BATCH-EXPORT.md`
- Generating images from a text prompt instead of rendering an existing model: `docs/OPENROUTER-IMAGE-GENERATION.md`
