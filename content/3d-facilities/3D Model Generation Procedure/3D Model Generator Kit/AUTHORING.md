# AUTHORING.md — building a new site model

This is the repeatable procedure. Follow the seven phases in order and you get the same
deliverable every time: a navigable 3D model, a closed asset and connection graph, solved
containment routing, the Connection Explorer with the asset list and asset viewer, and a
Blender path to a metadata-carrying GLB.

**The only file you author is `model.js`.** Everything else in this kit is generic and stays
untouched. That is what makes the outcome identical across sites.

---

## What you need before starting

| Input | Used for |
| --- | --- |
| High-level design (HLD) | Site layout, room adjacency, system inventory, redundancy scheme |
| Detailed design (DLD) | Equipment counts, makes and models, ratings, firmware/OS |
| Interface control document (ICD) | The connection list — from/to, medium, protocol, signal, direction, safety class |
| P&ID / single-line diagrams | Routing intent, valve and breaker positions, instrument loops |
| Asset register / BOM | Vendors, models, quantities, lifecycle status |
| Network diagrams | IT/OT topology, zone boundaries, remote access paths |

You can start with less. The gaps become explicit assumptions recorded in phase 1, not
silent invention.

---

## Phase 1 — Scope and inventory

Before touching geometry, write `SCOPE.md` for the site:

1. **Boundary.** What is in: buildings, yards, perimeter, upstream utilities. What is out.
2. **Systems.** One line per system with its prefix. Reuse these prefixes — they drive
   colouring, filtering and the Blender material mapping:

   | Prefix | System |
   | --- | --- |
   | `PWR` | Electrical power |
   | `CHW` | Cooling / process fluid |
   | `AIR` | HVAC and ventilation |
   | `DATA` | IT network |
   | `OT` | OT network and boundary devices |
   | `BMS` | Controls, monitoring, DCIM |
   | `FA` | Fire and life safety |
   | `SEC` | Physical security |
   | `IT` | Compute / process payload |

   Add prefixes if the site needs them (`PROC` for a process line, `RAIL`, `MED`), and add
   them to `site-config.js` in the same commit.
3. **Zones.** Assign every system a default IEC 62443 zone and SL-T target. Start from the
   `ZONES` table in `model-template.js` and adjust per site.
4. **Level of detail.** Which areas get component-level geometry and which get zone-band LOD.
   Detail the areas the assessment turns on; simplify the repetitive rest.
5. **Assumptions.** Anything the documents do not state and you had to choose. This list is
   part of the deliverable.

**Gate:** an equipment count per system that matches the DLD, and a written LOD decision.

---

## Phase 2 — Geometry

Copy `model-template.js` to `model.js` and author section A.

**Naming is the contract.** The mesh name binds geometry to the graph, to the routing, to the
Blender metadata and to Babylon. Use:

```
<SYSTEM>_<equipment>_<vendor_or_index>
PWR_mv_swg_hitachi_zx2
CHW_chiller_carrier_30xw
DATA_fw_paloalto_pa7000_a
BMS_row01_cdu_rack_plc
```

Rules that keep the pipeline working:

- Real dimensions in metres. Rest the site on `y = 0` (the template does this).
- Rectilinear runs only — waypoints through `pipe()`, never diagonal shortcuts.
- Group by room or area, each group named, so the hierarchy reads
  `site → area → skid/rack → component`.
- Repetitive structure goes through a builder function (see `rack()`), so 96 racks share one
  code path and one naming scheme.
- Rooms need partitions with door openings, and no roof — the model has to read from orbit.
- Every mesh a graph node will reference must be uniquely named.

**Gate:** open the model in `explorer.html`; console reports the mesh count and
`missing meshes 0`.

---

## Phase 3 — Graph

Author section B of `model.js`: `N()` for assets, `E()` for connections.

Work **from the ICD, not from memory.** For each ICD row you get one `E()` call with its
protocol, and the endpoints tell you which `N()` assets must exist.

For every asset record:

- `zone`, `purdue`, `slt` — from your phase 1 table, overridden where the DLD is specific
- `vendor`, `standards` — from the DLD and BOM
- `attrs` — ratings, capacities, redundancy, firmware/OS, port counts
- `surface` — assurance prompts for the assessment: exposed interfaces, vendor cloud paths,
  firmware scope, what compromise here reaches. Prompts, not findings.

For every connection:

- `service` — what flows. `protocol` — how it is carried. `Physical flow` for pipe, duct,
  busway and cable with no protocol.
- `geom` — the routed run mesh realising it, or `null` for a logical link.
- `critical: true` for anything crossing a zone boundary or holding safety authority, with
  `cross: 'Z4 → Z2'` and a `note` stating the rule that governs it.
- `oneway: true` where the direction is hardware-enforced (diode, dry-contact supervisory
  output).

**Record the hardwired interfaces.** Dry contact, 4–20 mA, OSDP RS-485, Modbus RTU, CAN,
BACnet MS/TP, RS-232 console — these have no network path and cannot be reached remotely.
That distinction is what a zone/conduit assessment turns on, so never collapse them into
"Ethernet".

**Gate:** `validate.js` returns 0 phantom endpoints and 0 danglers. Every asset has at least
one connection; every connection endpoint resolves.

---

## Phase 4 — Positions and routing

1. Open the model in `explorer.html` and capture the anchor of every graph node into
   `graph/positions.json` — bounding-box centre per asset id. The console helper in
   `explorer.html` does this; or read them from the model in a script.
2. Set the corridor lattice for the site. In `routing.js`, `X_LINES` and `Z_LINES` are the
   legal corridor centrelines — set them to the site's real equipment rows, ceiling spines
   and pipe racks. Adjust the per-service altitudes in `SERVICE` to the site's actual
   containment levels.
3. Run the router. Every connection must solve.

```js
const { makeRouter } = require('./routing.js');
const { routes, occupancy, failures } = makeRouter().routeAll(positions, connections);
```

Sanity-check the output rather than trusting it: total length per service should be
plausible, and local drops should outnumber corridor runs in a dense hall. If a short
connection is routing tens of metres, its endpoints are wrong or `localMax` needs tuning.

**Gate:** 0 failures, and `corridor_occupancy` reflects containment you would actually build.

---

## Phase 5 — Export the graph

Generate the JSON deliverable from `model.js` — do not hand-write it:

```
graph/index.json            manifest, totals, integrity counts, legends
graph/facility-graph.json   assets + connections + IEC 62443 layer
graph/hall-graph.json       repeated-area assets and connections (if the site has one)
graph/rack-graph.json       internal template for repeated units (if applicable)
graph/icd-graph.json        the ICD parsed to structure — the specified truth
graph/routes.json           solved runs and corridor occupancy
graph/positions.json        asset anchors
```

Parse the ICD into `icd-graph.json` mechanically: equipment register → equipment records,
interface control tables → interface records, instrument loops → loops, appendices verbatim.
Crosswalk P&ID tags to mesh names. Tags with no geometry keep `mesh: null` and
`geometry_bound: false` — visible, not hidden.

**`icd-graph.json` is authoritative.** Where the modelled graph and the ICD disagree about a
connection, the ICD wins. Say so in the manifest.

**Gate:** `validate.js` passes on the exported files, not just in memory.

---

## Phase 6 — Explorer

1. Copy `explorer.html`, `three-d-stage.js`, `site-config.js`, `routing.js` alongside `model.js`.
2. Edit **only** `site-config.js`: title, camera viewpoints, system colours, system labels.
3. Serve over HTTP — `routes.json` is fetched relatively and `file://` will silently fall back
   to schematic arcs.

You get, unchanged: graph and physical view modes, click-to-select with zoom, hover tooltips,
search across labels and mesh names, service / protocol / zone filters, critical-conduits-only
mode, marker colouring by system or zone, upstream/downstream tracing, the asset list by zone
or system with SL-T, the asset viewer with attributes and attack-surface notes, collapsible
panels, and keyboard shortcuts.

**Gate:** every panel opens; a click on any component resolves to its owning asset; tracing
from a supervisory controller reaches its field devices.

---

## Phase 7 — Blender and handoff

```bash
# geometry: open the viewer, Download GLB
blender --background --python enhance_model.py -- \
  --glb site.glb --graph graph --routes --icd \
  --lods 0.5 0.2 --out build/site_hq.glb --report build/report.json
```

The pipeline writes the asset register as glTF `extras`, tags conduit runs, attaches ICD
records, rebuilds materials as PBR, bevels, shares mesh data across repeated units, builds
tube geometry for every solved run, and emits LOD tiers.

Then assemble the handoff: `graph/`, `model.js`, the viewer files, the Blender script, a
`README.md` describing the schema and the Babylon build path, and a `CLAUDE.md` with the
ground rules. Copy the structure from the reference site.

---

## Invariants

These hold for every site. Breaking one breaks the outcome.

1. **Mesh names are the binding key.** Never rename without updating the graph.
2. **The graph stays closed.** No danglers, no phantom endpoints. Every asset connects.
3. **Routes are solved, never hand-authored.** Move equipment → edit positions → re-run.
4. **The ICD wins** over the modelled graph on any connection disagreement.
5. **Hardwired stays hardwired.** Never collapse dry contact, analog or serial into Ethernet.
6. **`explorer.html` is generic.** Site differences live in `site-config.js` and `model.js`.
7. **Assumptions are recorded**, not absorbed. `SCOPE.md` ships with the model.
8. **Validate after every change.** The four-defect gate is cheap and catches drift early.

---

## Files in this kit

| File | Role | Edit per site? |
| --- | --- | --- |
| `model-template.js` | Skeleton to copy as `model.js` | **Yes — this is the work** |
| `site-config.js` | Title, viewpoints, system colours and labels | **Yes — four lists** |
| `explorer.html` | Connection Explorer, asset list, asset viewer | No |
| `three-d-stage.js` | Viewer shell: orbit, framing, GLB/OBJ export | No |
| `routing.js` | Containment route solver | Corridor lines only |
| `validate.js` | Four-defect integrity gate | No |
| `enhance_model.py` | Blender pipeline | No |
| `AUTHORING.md` | This procedure | No |
| `PROMPT.md` | The brief to hand an assistant | No |
