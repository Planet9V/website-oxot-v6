# Handoff: OXOT hyperscale AI datacenter — 3D model, asset graph and routing

## Overview

A representative hyperscale AI datacenter modelled end to end: geometry, an asset register, a typed connection graph, and solved containment routing. It exists to support IEC 62443-3-2 zone-and-conduit assessment, FMECA/consequence work, and cyber-risk quantification against a real facility layout rather than a generic diagram.

Three scales, one coordinate frame:

| Scale | What it covers |
| --- | --- |
| Facility | Substation, MV/LV, UPS, batteries, generators, BESS, chiller plant, cooling towers, HVAC, MMR, core IT/DCS room, NOC, OT boundary, fire, security, internet boundary |
| Hall | 6 rows × (16 GPU racks + row CDU + end-of-row network rack) with every per-rack connection |
| Rack | One 48U liquid-cooled GPU rack, applied as a template to all 96 instances |

**Totals: 415 assets · 1,005 connections · 1,005 solved routes (15,693 m) · 97 critical conduits · 167 hardwired or serial connections.** Integrity is enforced: 0 danglers, 0 phantom endpoints, 0 unrouted connections.

## About these files

**The HTML files are design references, not production code.** `hyperscale-campus.html` and `hyperscale-campus-explorer.html` are three.js prototypes that demonstrate the model and prove the data. The intended target is Babylon.js — the task is to recreate the viewer in the target codebase using its own patterns, reading the same JSON.

**The JSON in `graph/` is the deliverable and is production-ready.** It is framework-neutral, versioned data. Consume it directly; don't regenerate it by hand.

`graph/routing.js` and `blender/enhance_campus.py` are working tools, not references — run them as they are.

## Fidelity

**High-fidelity on data, reference-fidelity on presentation.** Asset names, mesh bindings, zones, SL-T targets, protocols, interface classifications and route geometry are all final and should be used verbatim. The explorer's UI (dark panels, Dutch orange accent) is a working reference for the interaction model — click to select and zoom, filter by service/protocol/zone, trace upstream/downstream, list assets by zone or system — but rebuild it in the target framework's idiom.

## Files

```
graph/
  index.json            manifest, totals, integrity counts, shared legends
  facility-graph.json   199 assets / 296 connections + IEC 62443 layer
  hall-graph.json       216 assets / 709 connections
  rack-graph.json       10 component classes (41 units/rack) / 22 internal connections
  icd-graph.json        18 systems, 134 P&ID-tagged items, 184 specified interfaces, 7 instrument loops
  routes.json           1,005 solved runs with point lists and corridor occupancy
  positions.json        416 asset anchors in GLB world space
  routing.js            re-runnable route solver
  README.md             full schema reference — read this first

model/
  campus-model.js       the model builder; buildCampus(THREE) -> { group, graph, materials }
  hyperscale-campus.html      plain viewer + GLB/OBJ exporter
  hyperscale-campus-explorer.html   the reference interactive viewer
  hyperscale-rack.html        single high-detail 48U rack
  plc.html                    DIN-rail PLC assembly
  three-d-stage.js      viewer shell used by the pages above

blender/
  enhance_campus.py     Blender pipeline: metadata, PBR, bevels, routed runs, LODs
  README.md             usage
```

## Authority

`icd-graph.json` is the **specified** interface truth, parsed from the Detailed System Design & Interface Control Document. It carries what inference cannot: P&ID tags, firmware/OS per device, interface classification `[E]`/`[D]`/`[S]`/`[F]`/`[M]`, the signal or parameter carried, direction, and a SIL/SL-T safety class per interface.

`facility-graph.json` and `hall-graph.json` carry the **modelled** geometry with the IEC 62443 assessment layer. Where the two disagree about a connection, **the ICD wins**.

## Getting the geometry

The JSON binds to a GLB by node name. Produce it once:

1. Open `model/hyperscale-campus.html` in a browser
2. Click **Download GLB** → `hyperscale_campus.glb` (5,879 meshes, full hierarchy preserved)
3. Same for `hyperscale-rack.html` and `plc.html` if you need the close-up rack or the PLC

Or run the Blender pipeline below to get a higher-quality GLB with the metadata baked in as glTF `extras`.

## Data model

### Asset

```jsonc
{
  "id": "secoff_ws",                       // stable key used by connections
  "label": "Security officer workstation",
  "kind": "Windows 11 workstation",
  "system": "SEC",                         // PWR CHW AIR DATA OT BMS FA SEC IT
  "location": "Security officer's office",
  "mesh": "SEC_officer_workstation",       // GLB node name — the binding key
  "zone": "Z1",                            // IEC 62443 zone
  "purdue": "L3",
  "sl_target": "SL-T 2-3",
  "vendor": "Windows 11 Enterprise",
  "standards": "IEC 62443-4-2, NIS2, GDPR (badge and video data)",
  "attributes": { "applications": "BMS, fire alarm graphics, CCTV VMS client, access control client" },
  "attack_surface": ["Single seat with reach into four separate facility systems — …"]
}
```

### Connection

```jsonc
{
  "id": "e211",
  "from": "secoff_ws",
  "to": "app_acs",
  "service": "security",                   // what flows
  "protocol": "Ethernet/TCP-IP",           // how it is carried
  "description": "access control client session",
  "physical_run": null,                    // routed geometry realising it, or null for logical links
  "critical_conduit": true,                // requires documentation per IEC 62443-3-2 §5.6
  "one_way": false,                        // hardware-enforced unidirectional
  "zone_crossing": null,
  "note": "Door control authority — privileged role, dual authorisation on credential changes."
}
```

### Route

```jsonc
{
  "id": "e211",
  "service": "security",
  "mode": "corridor run",                  // or "local drop"
  "containment": "LV security tray",
  "altitude": 4.14,
  "lane": 3,
  "bend_radius": 0.15,
  "length_m": 27.4,
  "corridors": ["X0.92@4.14", "Z11.6@4.14"],
  "points": [[-2.45, 1.35, 11.45], …]      // draw as a tube or polyline
}
```

Route ids match connection ids, so `routes.json` joins to either graph on `id`.

## Zones

| Zone | Purdue | Name | SL-T | Assets |
| --- | --- | --- | --- | --- |
| Z0 | L4–L5 | Enterprise IT / compute payload | SL-T 2 | 192 |
| Z1 | L3–L3.5 | DCIM / BMS management (IDMZ) | SL-T 2–3 | 33 |
| Z2 | L2 | Building automation / supervisory control | SL-T 2–3 | 62 |
| Z3 | L0–L1 | Field device / physical process | SL-T 1–2 | 112 |
| Z4 | isolated SIS | Safety instrumented systems | SL-T 2–3 | 16 |
| Z5 | DMZ segment | Out-of-band / jump infrastructure | SL-T 3 | 14 |

## Protocols

**IT** — Ethernet/TCP-IP, BGP, SNMP, CAPWAP, RS-232 console
**OT** — OPC UA, Modbus TCP, Modbus RTU, PROFINET, BACnet/IP, BACnet MS/TP, IEC 61850 MMS, DNP3, CAN bus (J1939), OSDP RS-485, dry contact, 4–20 mA analog
**Process** — Physical flow (pipe, duct, busway, cable — no protocol)

167 connections are hardwired or serial and carry no network path at all. That distinction is what a zone/conduit assessment turns on — filter on protocol to isolate them.

## Building the Babylon viewer

```js
const result = await BABYLON.SceneLoader.ImportMeshAsync(null, "assets/", "hyperscale_campus.glb", scene);

const [facility, hall, routes] = await Promise.all([
  fetch("graph/facility-graph.json").then(r => r.json()),
  fetch("graph/hall-graph.json").then(r => r.json()),
  fetch("graph/routes.json").then(r => r.json()),
]);

// index every node by name, then bind assets to nodes
const byName = new Map();
scene.transformNodes.concat(scene.meshes).forEach(n => byName.set(n.name, n));

const assets = new Map();
for (const a of [...facility.assets, ...hall.assets]) {
  assets.set(a.id, a);
  const node = byName.get(a.mesh);
  if (node) node.metadata = { ...node.metadata, assetId: a.id };
}
```

**Selection.** Walk up from the picked mesh until a node carries an `assetId` — that resolves any sub-mesh (a tray, a screen, a handle) to its parent component.

```js
function assetOf(mesh) {
  let n = mesh;
  while (n) {
    if (n.metadata?.assetId) return assets.get(n.metadata.assetId);
    n = n.parent;
  }
  return null;
}
```

**Zoom to component.** Merge world bounds of the asset's subtree, then animate an `ArcRotateCamera`'s `target` and `radius`. The reference implementation is in `model/hyperscale-campus-explorer.html` (`frameObject` / `flyTo`).

**Drawing runs.**

```js
for (const r of routes.routes) {
  const path = r.points.map(p => new BABYLON.Vector3(p[0], p[1], p[2]));
  const tube = BABYLON.MeshBuilder.CreateTube(`run_${r.id}`, {
    path, radius: RADIUS[r.service] ?? 0.03, tessellation: 8,
  }, scene);
  tube.material = runMaterial(r.service);
  tube.metadata = r;
}
```

**Tracing.** Build adjacency from the connection list once, then breadth-first from the selected asset. `graph.trace()` in `campus-model.js` is the reference.

```js
const adj = new Map();
for (const c of [...facility.connections, ...hall.connections]) {
  if (!adj.has(c.from)) adj.set(c.from, { in: [], out: [] });
  if (!adj.has(c.to)) adj.set(c.to, { in: [], out: [] });
  adj.get(c.from).out.push(c);
  adj.get(c.to).in.push(c);
}
```

**Filtering.** Every connection has `service` and `protocol`; every asset has `zone` and `system`. Those four fields drive all the filters in the reference viewer. `critical_conduit === true` isolates the 97 conduits needing §5.6 documentation.

## Interaction model to reproduce

From `model/hyperscale-campus-explorer.html`:

- **Click** a component → select, highlight, fly camera to frame it
- **Hover** → tooltip with component label and exact mesh name
- **Double-click empty space** → fit the campus
- **Search** → matches asset labels, kinds and raw mesh names
- **View modes** — Graph (schematic runs, physical geometry ghosted), Physical, Both
- **Filters** — service, protocol, IEC 62443 zone, and a critical-conduits-only mode
- **Marker colour** — by system or by zone
- **Trace** — upstream / downstream / both from the selection, highlighting the dependency chain in 3D
- **Asset list** — pick a zone or system, get every asset in it with zone badge and SL-T, click a row to select and zoom
- **Viewpoints** — fit campus, data hall, electrical, cooling, MMR/NOC
- **Keys** — `G` graph, `P` physical, `B` both, `F` fit, `Esc` clear

Panels are collapsible and closable; all three occupy separate screen regions and never overlap each other or the viewport toolbar.

## Design tokens (reference viewer)

| Token | Value |
| --- | --- |
| Panel background | `rgba(10, 10, 11, 0.95)` |
| Panel border | `#2c2c2e` |
| Hover surface | `#2c2c2e` |
| Accent (Dutch orange) | `#EE7623` |
| Accent hover | `#F49A55` |
| Primary text | `#E8E8E6` / `#F0F0EE` |
| Muted text | `#8a8a88` |
| Field background | `#111112` |
| Row divider | `#1e1e20` |
| Font | Inter, 9–12.5px UI scale |

Service colours: water `#1F6FD0` · condenser `#2E8B57` · air `#9AA4AC` · electricity `#D8B23A` · fuel `#D8C23A` · data `#35C2C9` · control `#8A4FD0` · fire `#C8332A` · security `#E07A26`

Zone colours: Z0 `#9BA1A8` · Z1 `#35C2C9` · Z2 `#8A4FD0` · Z3 `#D8B23A` · Z4 `#C8332A` · Z5 `#E07A26`

## Re-solving routes after moving equipment

Edit `graph/positions.json`, then:

```js
const { makeRouter } = require("./graph/routing.js");
const { routes, occupancy, failures } = makeRouter().routeAll(positions, connections);
```

`makeRouter({ localMax, xLines, zLines })` takes the corridor lines as options if the real containment layout differs. The solver models service-specific altitudes, Dijkstra with a turn penalty and bundling discount, lane assignment for parallel runs, corner fillets at the service bend radius, and cheap crossings only at documented wall penetrations. `corridor_occupancy` reports runs per corridor — containment sizing input, and a single-point-of-failure indicator.

## Blender pipeline

```bash
blender --background --python blender/enhance_campus.py -- \
  --glb hyperscale_campus.glb \
  --graph graph \
  --routes --icd \
  --lods 0.5 0.2 \
  --out build/hyperscale_campus_hq.glb \
  --report build/report.json
```

Stages: import → write the asset register as custom properties → tag conduit runs → attach ICD records (P&ID tag, manufacturer, model, firmware/OS, interface list with signal and safety class) → stamp the rack template and legends on the scene → rebuild ~50 materials as PBR → optional high-detail rack swap → bevels → smooth-by-angle → build tube geometry for all 1,005 solved runs into a `Routed_runs` collection → share mesh data so 96 racks stop being 96 copies → optional LOD tiers → export GLB with `export_extras=True`.

Custom properties export as glTF `extras`, so metadata rides inside the file:

```js
const x = mesh.metadata?.gltf?.extras;
x.oxot_id; x.oxot_zone; x.oxot_sl_target; x.oxot_pid_tag; x.oxot_firmware_os;
JSON.parse(x.oxot_attack_surface || "[]");
JSON.parse(x.oxot_icd_interfaces || "[]");
// on run geometry:
x.oxot_run_id; x.oxot_service; x.oxot_protocol; x.oxot_length_m; x.oxot_containment;
```

Read `blender/README.md` for the flags and for where further visual quality comes from (normal-mapped panel lines and decals, not more polygons).

## Caveats

- Rows 01–02 carry tray-level geometry; rows 03–06 use zone-band LOD. The logical graph is identical for all 96 racks — swap in the standalone rack GLB when a row-03+ rack is opened up close.
- 39 of the 134 P&ID tags bind to geometry. The other 95 are specified but not modelled — instrument-level items (CTs, VTs, valves, dosing pumps, individual detectors) and redundant units the geometry represents as a single instance.
- `icd-graph.json` has 7 narrative endpoint labels the ICD names without giving a tag; they are listed in `unresolved_tags` rather than guessed at.
- Vendors and models are representative selections for a facility of this class — not a procurement list.
- `attack_surface` entries are assurance prompts for a zone/conduit assessment, not findings against a real installation.
- Quantities reflect the modelled geometry. A real hyperscale campus runs 20+ MV lineups and 20–36 generators; this represents one hall's worth of that plant.
- The reference viewer loads `graph/routes.json` by relative fetch, so it needs to be served over HTTP, not opened from `file://`.
