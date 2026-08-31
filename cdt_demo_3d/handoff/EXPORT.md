# Export procedure — publishing the model to the website

End-to-end, repeatable. Produces one optimised GLB with metadata baked in, plus the JSON the
viewer reads. Run it whenever `campus-model.js` or anything in `graph/` changes.

**Current model:** 449 assets · 1,155 connections · 1,155 solved routes (17,720 m) ·
216 critical conduits · 188 hardwired/serial · 5,966 meshes · 2 cells.

---

## Prerequisites

| | |
| --- | --- |
| Blender | 3.6 LTS or 4.x — nothing beyond `bpy` |
| Python | Only Blender's bundled interpreter is used |
| A local HTTP server | The pages fetch `graph/*.json`; `file://` silently falls back to schematic arcs |

```bash
cd handoff
python3 -m http.server 8000
```

---

## Step 1 — Export the raw GLB from the browser

The geometry is authored in `model/campus-model.js` and exported by the viewer, so the
browser is the source of truth for mesh names. Do not model anything in Blender.

1. Open `http://localhost:8000/model/hyperscale-campus.html`
2. Wait for the scene to finish building (the toolbar becomes active)
3. Click **Download GLB** → `hyperscale_campus.glb` (~5,966 meshes, hierarchy preserved)

Optionally also export the single high-detail rack from `model/hyperscale-rack.html`, which
can be placed into named rows in step 2.

**Verify before continuing:**

```bash
ls -lh ~/Downloads/hyperscale_campus.glb     # expect tens of MB, not KB
```

---

## Step 2 — Enhance in Blender

```bash
blender --background --python blender/enhance_campus.py -- \
  --glb ~/Downloads/hyperscale_campus.glb \
  --graph graph \
  --routes --icd \
  --out build/hyperscale_campus_hq.glb \
  --report build/report.json
```

With high-detail racks in the front rows and two LOD tiers for distant instancing:

```bash
blender --background --python blender/enhance_campus.py -- \
  --glb ~/Downloads/hyperscale_campus.glb \
  --rack-glb ~/Downloads/hyperscale_rack.glb \
  --rack-detail-rows row01 row02 \
  --routes --icd --lods 0.5 0.2 \
  --graph graph \
  --out build/hyperscale_campus_hq.glb \
  --report build/report.json
```

### What the flags do

| Flag | Effect |
| --- | --- |
| `--graph DIR` | Directory holding `facility-graph.json`, `hall-graph.json`, `routes.json`, `icd-graph.json`, `hazard-log.json` |
| `--routes` | Builds bevelled curve geometry for all 1,155 solved runs into a `Routed_runs` collection, each carrying service, protocol, containment type and length |
| `--icd` | Stamps P&ID tag, manufacturer, model, firmware/OS and the interface list (signal, direction, safety class, SIL) onto every asset the ICD names |
| `--rack-detail-rows` | Places the high-detail rack at named rows, parented to the original node so bindings survive |
| `--lods 0.5 0.2` | Decimated `LOD1`/`LOD2` collections |
| `--no-bevel` | Skip bevelling (faster, noticeably flatter) |
| `--keep-copies` | Skip mesh sharing (larger file; useful when diffing) |

### Stages, in order

1. **Import** — reads the GLB with node names intact
2. **Metadata** — asset register onto objects as custom properties (`oxot_id`, `oxot_zone`, `oxot_purdue`, `oxot_sl_target`, `oxot_cell`, `oxot_vendor`, `oxot_standards`, `oxot_attributes`, `oxot_attack_surface`); sub-meshes inherit `oxot_parent_asset`
3. **Conduits** — runs get `oxot_service`, `oxot_protocol`, `oxot_critical_conduit`
4. **Scene props** — rack template and the zone/service/protocol legends stamped on the scene
5. **Materials** — ~50 materials rebuilt as PBR: copper and busway metallic, concrete fully rough, screens and LEDs emissive, containment glass transmissive
6. **Detail racks** — optional placement at named rows
7. **Bevel** — 1.8 mm two-segment angle-limited, skipping slabs, walls, LEDs and dense meshes; most of the perceived resolution comes from here
8. **Smooth** — smooth-by-angle, handling the Blender 4.1 `use_auto_smooth` removal
9. **Mesh sharing** — identical components point at one datablock; 96 racks stop being 96 copies
10. **LODs** — optional decimated tiers
11. **Export** — `export_extras=True`, so custom properties land as glTF `extras`

### Check the report

```bash
cat build/report.json
```

Expect `meshes_in` ≈ 5,459, `assets_bound` = 449, `routes_built` = 1,155,
`unbound_meshes` = 0. A non-zero `unbound` count means a mesh name drifted from
`graph/positions.json` — fix the model, not the GLB.

---

## Step 3 — Validate before publishing

```bash
node kit/validate.js graph
```

All five checks must return empty:

| Check | Must be |
| --- | --- |
| Duplicate connection ids (across **both** graph files) | 0 |
| Duplicate asset ids | 0 |
| Phantom endpoints | 0 |
| Danglers (assets with no connection) | 0 |
| Unrouted connections | 0 |

Connection ids are the join key for routes, for the Blender `--routes` tagging and for the
documented `byId` query patterns. A collision silently discards one side of the pair — an
earlier revision lost 16 cell-boundary conduits that way without raising an error.

---

## Step 4 — Publish

```
public/
  models/
    hyperscale_campus_hq.glb        from build/
  graph/
    index.json  facility-graph.json  hall-graph.json  rack-graph.json
    icd-graph.json  hazard-log.json  routes.json  positions.json
```

Serve the GLB with `Content-Type: model/gltf-binary` and long cache headers; the JSON with
`application/json`. Both compress well — enable gzip or brotli.

### Loading it in Babylon

```js
const result = await BABYLON.SceneLoader.ImportMeshAsync(
  null, "/models/", "hyperscale_campus_hq.glb", scene);

// metadata rides inside the GLB — no sidecar fetch needed for asset identity
const asset = mesh.metadata?.gltf?.extras;
// asset.oxot_id, .oxot_zone, .oxot_purdue, .oxot_sl_target, .oxot_cell, .oxot_vendor …

// the graph JSON is still needed for connections, routes and the assessment layer
const [facility, hall, routes] = await Promise.all([
  fetch("/graph/facility-graph.json").then(r => r.json()),
  fetch("/graph/hall-graph.json").then(r => r.json()),
  fetch("/graph/routes.json").then(r => r.json()),
]);
```

Highlight every critical conduit:

```js
const byId = Object.fromEntries(routes.routes.map(r => [r.id, r]));
for (const c of [...facility.connections, ...hall.connections]) {
  if (!c.critical_conduit) continue;
  const run = byId[c.id];                       // one-to-one with connection id
  drawTube(run.points, COLOURS[c.service]);
}
```

---

## Step 5 — Replace the previous model on the site

1. Upload `hyperscale_campus_hq.glb` alongside the existing model, under a new filename
2. Upload the `graph/` directory to the same origin as the page (CORS otherwise blocks the fetch)
3. Point the viewer at the new GLB
4. Hard-refresh and confirm in the console: asset bind count 449, routes drawn 1,155, zero
   unresolved mesh names
5. Only then remove the old GLB

**Rollback:** keep the previous GLB and `graph/` for one release. The two are a matched pair —
never serve a new GLB against an old graph, or mesh bindings silently fail to resolve.

---

## Regenerating routes after moving equipment

Routes are solved, not hand-authored. If positions change:

```bash
node -e "
const {makeRouter} = require('./graph/routing.js');
// see graph/README.md for the full re-solve snippet
"
```

Then re-run steps 1–4. Never hand-edit `routes.json`.
