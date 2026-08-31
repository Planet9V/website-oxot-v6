Bundle regenerated against current state — 449 assets · 1,155 connections · 1,155 routes (17,720 m) · 216 critical conduits · 5,981 meshes.

EXPORT.md is the new piece — the five-step publishing procedure:

Browser GLB export from hyperscale-campus.html. The geometry is authored in campus-model.js, so the browser is the source of truth for mesh names — nothing gets modelled in Blender.
Blender enhance — blender --background --python blender/enhance_campus.py -- --glb … --graph graph --routes --icd --out build/…. Eleven stages: metadata as custom properties, PBR rebuild, 1.8 mm bevels, mesh sharing across the 96 racks, optional LODs, export with export_extras=True so metadata rides inside the GLB.
Validate — node kit/validate.js graph, all five integrity checks at zero.
Publish — directory layout, MIME types, and the Babylon load snippet reading mesh.metadata.gltf.extras.
Replace on site — upload under a new filename, confirm bind count 449 and 1,155 routes in the console, then remove the old GLB. Keep the previous pair for one release.
The one hard rule I've written in bold: the GLB and graph/ are a matched pair. Serving a new GLB against an old graph fails silently rather than loudly — mesh bindings just don't resolve.

Also in the bundle: docs/ with the sample report, process diagram and web copy, and kit/ so the method travels with the model.
