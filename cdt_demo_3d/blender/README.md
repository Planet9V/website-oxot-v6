# Blender pipeline

> For the full publishing procedure — browser export, validation, upload, rollback — see
> `../handoff/EXPORT.md`. This file covers the Blender stage only.
>
> Current model: 449 assets · 1,155 connections · 1,155 routes · 5,981 meshes.

`enhance_campus.py` turns the browser-exported GLB into a higher-quality, metadata-carrying asset for the Babylon scene. It does not re-model anything — it enhances the real geometry, so names stay bound to `graph/*.json`.

## Prerequisites

- Blender 3.6 LTS or 4.x (nothing beyond `bpy`)
- The campus GLB: open `hyperscale-campus.html` → **Download GLB**
- Optionally the rack GLB: open `hyperscale-rack.html` → **Download GLB**
- The `graph/` directory from this project

## Run

```bash
blender --background --python blender/enhance_campus.py -- \
  --glb ~/Downloads/hyperscale_campus.glb \
  --graph graph \
  --routes --icd \
  --out build/hyperscale_campus_hq.glb \
  --report build/report.json
```

With high-detail racks in the front two rows and two LOD tiers:

```bash
blender --background --python blender/enhance_campus.py -- \
  --glb ~/Downloads/hyperscale_campus.glb \
  --rack-glb ~/Downloads/plc.glb \
  --rack-detail-rows row01 row02 \
  --lods 0.5 0.2 \
  --graph graph --out build/hyperscale_campus_hq.glb
```

Drop `--no-bevel` or `--keep-copies` to skip those stages if you want to compare.

## What each stage does

| Stage | Effect |
| --- | --- |
| **Import** | Reads the GLB with node names intact |
| **Metadata** | Writes the asset register onto objects as custom properties — `oxot_id`, `oxot_zone`, `oxot_purdue`, `oxot_sl_target`, `oxot_vendor`, `oxot_standards`, `oxot_attributes`, `oxot_attack_surface`. Sub-meshes inherit `oxot_parent_asset` so clicking any tray still resolves to its rack |
| **Conduits** | Pipe/busway/cable runs get `oxot_service`, `oxot_protocol`, `oxot_critical_conduit` and the full connection list |
| **Scene props** | The rack template and the zone/service/protocol legends are stamped on the scene, so the taxonomy travels inside the GLB |
| **Materials** | Rebuilds ~50 materials as proper PBR — copper and busway metallic, concrete fully rough, screens and LEDs emissive, containment glass transmissive |
| **Detail racks** | Optionally places the high-detail rack model at named rows, parented to the original node so bindings survive |
| **Bevel** | 1.8 mm two-segment angle-limited bevels, skipping slabs, walls, LEDs and anything already dense — this is where most of the perceived resolution comes from |
| **Smooth** | Smooth-by-angle across Blender versions (handles the 4.1 `use_auto_smooth` removal) |
| **Mesh sharing** | Points identical components at one datablock — 96 racks stop being 96 copies, and the GLB shrinks sharply |
| **LODs** | Optional decimated `LOD1`/`LOD2` collections for distant instancing |
| **Export** | GLB with `export_extras=True`, so custom properties land as glTF `extras` |

## Reading the metadata in Babylon

```js
const r = await BABYLON.SceneLoader.ImportMeshAsync(null, "assets/", "hyperscale_campus_hq.glb", scene);

function assetOf(mesh) {
  let n = mesh;
  while (n) {
    const x = n.metadata?.gltf?.extras;
    if (x?.oxot_id) return x;
    if (x?.oxot_parent_mesh) return scene.getNodeByName(x.oxot_parent_mesh)?.metadata?.gltf?.extras;
    n = n.parent;
  }
  return null;
}

scene.onPointerDown = () => {
  const p = scene.pick(scene.pointerX, scene.pointerY);
  if (!p.hit) return;
  const a = assetOf(p.pickedMesh);
  if (!a) return;
  console.log(a.oxot_label, a.oxot_zone, a.oxot_sl_target,
              JSON.parse(a.oxot_attributes || "{}"));
};

// highlight every critical conduit
scene.meshes.filter(m => m.metadata?.gltf?.extras?.oxot_critical_conduit)
     .forEach(m => highlightLayer.addMesh(m, BABYLON.Color3.Red()));

// the whole taxonomy, from the scene-level extras
const legends = JSON.parse(r.meshes[0].metadata?.gltf?.extras?.oxot_legends || "{}");
```

Note: Blender writes scene custom properties into the glTF `scene.extras`. If your loader doesn't surface those, read the legends from `graph/index.json` instead — same content.

## Where to spend effort next

The script gets you PBR, bevels and metadata. Further quality is manual work in the UI, in rough order of payoff:

1. **Normal-mapped detail** on rack faces — panel lines, vent grilles, screw heads baked from a high-poly tile. Far cheaper than geometry.
2. **Decals** for labels, warning placards, asset tags. Real text sells scale better than more polygons.
3. **Baked AO / lightmaps** for the hall interior — contact shadows between racks and floor.
4. **Cable sag** — replace the straight conduit runs with curve objects using a catenary profile.
5. **Real fan blades and louvre slats** on the towers and dry coolers, then instance them.

If you want, I can extend the script to generate the normal-map tiles procedurally and assign them, so step 1 also runs headless.
