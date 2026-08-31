# GIMP headless batch export — verified reference (GIMP 3.2.4)

**Confirmed working 2026-08-23, on this machine.** Every claim below was verified against the actual installed binaries or GIMP's own runtime output — not copied from a guess or an incomplete web page. See "How this was verified" at the bottom for the exact method, so the next person (or session) can re-verify if GIMP is ever upgraded.

## The one-line summary

GIMP 3.x renamed core Script-Fu PDB procedures from their GIMP 2.x names. If a 2.x-era script-fu snippet fails with `Error: eval: unbound variable: <name>`, the procedure was renamed or restructured — it is not a sign that headless/batch mode itself is broken.

## Environment

- **GIMP version:** 3.2.4 (confirmed via `gimp-version` PDB call)
- **Binary:** `/Applications/GIMP.app/Contents/MacOS/gimp-console-3.2` (macOS app bundle; console/no-GUI variant)
- **Batch interpreter:** `plug-in-script-fu-eval` (Script-Fu/Scheme, not Python-Fu)

## The two renames that caused failures tonight

| GIMP 2.x name | GIMP 3.x name | Notes |
|---|---|---|
| `file-jpeg-save` | `file-jpeg-export` | Confirmed via `strings` on the installed `file-jpeg` plugin binary — see below. |
| `gimp-image-get-active-drawable` | `gimp-image-get-selected-drawables` | Plural — returns a **list**, not a single drawable. In practice the modern export call doesn't need a drawable argument at all (see below). |

## Working invocation

```bash
gimp-console-3.2 -i --batch-interpreter=plug-in-script-fu-eval -b "<script-fu here>"
```

- `-i` — no interface (headless). Sufficient on its own.
- **Do not add `-d -f`** (skip-data / skip-fonts). An earlier attempt tonight tried this hoping it would speed up startup and avoid a hang; it did not fix anything, and once the real procedure names are used it isn't needed. Startup with the correct flags takes a few seconds, not minutes.
- `--batch-interpreter=plug-in-script-fu-eval` is required — without it, `-b` batch commands are not interpreted as Script-Fu.

## Working script: resize + export a JPEG

```scheme
(let* ((image (car (gimp-file-load RUN-NONINTERACTIVE "/path/to/input.png" "input.png"))))
  (gimp-image-scale image 1600 1600)
  (gimp-image-flatten image)
  (file-jpeg-export RUN-NONINTERACTIVE image "/path/to/output.jpg" #:quality 0.75)
  (gimp-quit 0))
```

Notes on this exact script:
- `gimp-file-load` is unchanged from GIMP 2.x — still takes `(run-mode, filename, raw-filename)` and returns an image ID.
- `gimp-image-flatten` collapses the image to a single layer, which is why no explicit drawable needs to be passed to export — the flattened image has one layer implicitly.
- `file-jpeg-export` takes **named/keyword arguments** in GIMP 3.x (`#:quality 0.75`), not the long positional argument list GIMP 2.x used (`quality, smoothing, optimize, progressive, comment, subsmp, baseline, restart, dct`). Mixing one positional call (`RUN-NONINTERACTIVE image "/path"`) with a trailing keyword arg (`#:quality 0.75`) works fine — GIMP prints a deprecation warning about positional args but still executes correctly.
- If you omit `#:quality`, GIMP uses a sane default (produced a visibly higher-quality, larger file in testing — set it explicitly if file size matters).

## A GIMP 3.x quirk worth knowing: it tells you the right syntax

When you call a PDB procedure with the wrong argument shape, GIMP's Script-Fu console prints the **correct, current, named-argument call** as part of its warning — this is the single fastest way to self-correct without external research:

```
(script-fu:XXXXX): scriptfu-WARNING **: Missing arg type: GimpExportOptions
(script-fu:XXXXX): scriptfu-WARNING **: Calling Plug-In PDB procedures with arguments
as an ordered list is deprecated.
Please use named arguments: (file-jpeg-export #:run-mode 1 #:image 1 #:file /path/to/output.jpg)
```

That `Please use named arguments: ...` line is verbatim, real, executable syntax for the exact call you just tried to make. Read it before guessing again.

## Noise to ignore (not errors)

On exit, GIMP prints:
```
GEGL-WARNING: (.../gegl-tile-handler-cache.c:1076):gegl_tile_cache_destroy: runtime check failed: ...
EEEEeEeek! 7 GeglBuffers leaked
```
This is GEGL's internal buffer-pool cleanup complaining on process teardown. It appears **after** the file has already been written successfully. Cosmetic, not a failure — do not treat it as one when checking exit status; check whether the output file exists instead.

## How this was verified (do this again if GIMP is ever upgraded)

Official documentation (`developer.gimp.org`'s Script-Fu Programmer's Reference, the ScriptFu-v3 changes page, and the GIMP 3.0 plug-in porting guide's "PDB equivalence" table) was checked first and found **incomplete** — none of those pages documented the `file-jpeg-save` or `gimp-image-get-active-drawable` renames as of this writing. Web search results were suggestive but not authoritative.

The actual ground truth came from the installed binaries themselves:

```bash
# Find the real, currently-registered procedure names in a file-format plugin:
strings /Applications/GIMP.app/Contents/Resources/lib/gimp/3.0/plug-ins/file-jpeg/file-jpeg \
  | grep -iE "^file-jpeg|^gimp-file|export" | sort -u

# Find a renamed core-image procedure in the main binary:
strings /Applications/GIMP.app/Contents/MacOS/gimp | grep -iE "^gimp-image-get-(active|selected)-drawable"
```

`strings` on a compiled plugin/binary lists every literal string it contains, including the PDB procedure names it registers at runtime — this is authoritative for "does this exact installed version of GIMP have a procedure called X", independent of documentation currency. Use the same technique for any other "unbound variable" error: identify which plugin binary would own that procedure (usually named `file-<format>` for import/export, under `Contents/Resources/lib/gimp/3.0/plug-ins/`), then `strings` it for the real name.

## Related

- Full research/decision trail: Ruflo memory, `decision-log` namespace, keys `oxot-gimp-headless-broken-2026-08-23` (superseded/fixed) and `oxot-gimp-reference-2026-08-23` (this document's content, indexed for search).
- Working reusable script: `scripts/gimp-export.sh`
- Generating the source image in the first place: `docs/OPENROUTER-IMAGE-GENERATION.md`
- Rendering real project 3D models instead: `docs/BLENDER-HEADLESS-RENDER.md`
