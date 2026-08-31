# Reference graph — OXOT hyperscale AI datacenter

Asset register and connection graph accompanying the Babylon scene. This is the **data**: what equipment exists, how it is connected, what flows over each connection, and how each asset binds to a node in the exported GLB.

## Files

| File | Scale | Contents |
| --- | --- | --- |
| `index.json` | — | Manifest, totals, and the shared legends (zones, services, protocols) |
| `facility-graph.json` | Facility | 117 assets / 143 connections — substation, MV/LV, UPS, batteries, generators, BESS, chiller plant, towers, HVAC, MMR, NOC, OT boundary, fire, security |
| `hall-graph.json` | Hall | 216 assets / 672 connections — 6 rows × (16 GPU racks + row CDU + end-of-row network rack) and every per-rack connection |
| `rack-graph.json` | Rack | 10 component classes (41 units per rack) / 22 internal connections — the 48U liquid-cooled GPU rack, applied as a template to all 96 instances |

**Totals:** 333 distinct assets, 815 distinct connections, 33 critical conduits. Expanded through the rack template: 3,936 rack-internal components and 2,112 rack-internal connections.

## Geometry sources

| GLB | Page | Notes |
| --- | --- | --- |
| Campus | `hyperscale-campus.html` → Download GLB | Facility + hall, 5,130 meshes, full hierarchy preserved |
| Rack | `hyperscale-rack.html` → Download GLB | One high-detail 48U rack, terminal-level components |
| PLC | `plc.html` → Download GLB | DIN-rail PLC assembly |

## Binding assets to GLB nodes

Every asset carries `mesh` — the exact node name in the GLB.

```js
const result = await BABYLON.SceneLoader.ImportMeshAsync(null, "assets/", "hyperscale_campus.glb", scene);
const graph = await (await fetch("graph/facility-graph.json")).json();

const byMesh = new Map();
scene.transformNodes.concat(scene.meshes).forEach(n => byMesh.set(n.name, n));

for (const asset of graph.assets) {
  const node = byMesh.get(asset.mesh);
  if (node) node.metadata = { ...node.metadata, asset };   // zone, SL-T, vendor, attack surface…
}
```

Rack internals resolve by concatenation — `mesh_suffix` appended to the rack instance's `mesh`:

```js
// rack-graph.json component "compute_tray" has mesh_suffix "_compute_tray_{0..17}"
"row01_rack01" + "_compute_tray_7"   // → row01_rack01_compute_tray_7
```

Rows 01–02 are built with per-component meshes. Rows 03–06 use zone-band LOD meshes (`_power_zone_lo`, `_compute_zone_lo`, `_switch_zone`, `_compute_zone_hi`, `_power_zone_hi`, `_storage_zone`, `_network_zone`) that resolve to the same logical components — swap in the standalone rack GLB when a row-03+ rack is opened up close.

## Asset schema

```jsonc
{
  "id": "row01_cdu",                    // stable key used by connections
  "label": "Row 1 CDU",
  "kind": "Coolant distribution unit",
  "system": "CHW",                      // PWR CHW AIR DATA OT BMS FA SEC IT
  "location": "Data hall",
  "mesh": "row01_cdu_rack",             // GLB node name
  "zone": "Z2",                         // IEC 62443 zone — see legends
  "purdue": "L2",
  "sl_target": "SL-T 2-3",
  "vendor": "Motivair / CoolIT / Vertiv XDU class",
  "standards": "OCP Liquid Cooling Spec, ASHRAE TC 9.9",
  "template": "rack_gpu_48u",           // rack instances only
  "attributes": { "pumps": "2 (N+1)", "loops": "FWS primary <-> TCS secondary" },
  "attack_surface": ["CDU vendor cloud portal is a Z2 -> external conduit.", "…"]
}
```

## Connection schema

```jsonc
{
  "id": "e97",
  "from": "row01_cdu_plc",
  "to": "row01_cdu",
  "service": "control",                 // what flows
  "protocol": "Modbus RTU",             // how it is carried
  "description": "pump and valve control",
  "physical_run": "CHW_row01_tcs_header_supply",  // routed geometry realising it (or null for logical links)
  "critical_conduit": true,             // requires documentation per IEC 62443-3-2 §5.6
  "one_way": false,                     // hardware-enforced unidirectional
  "zone_crossing": "Z2 -> Z1",
  "note": "Loss or manipulation causes a row-wide thermal event."
}
```

`from`/`to` are directed — for fluid and power that is the direction of flow; for data and control it is the direction of the primary session or telemetry. Bidirectional loops (coolant supply/return, condenser supply/return) appear as two connections.

## Services

`water` · `condenser` · `air` · `electricity` · `fuel` · `data` · `control` · `fire` · `security`

## Protocols

**IT** — Ethernet/TCP-IP, BGP, SNMP, CAPWAP, RS-232 console
**OT** — OPC UA, Modbus TCP, Modbus RTU, PROFINET, BACnet/IP, BACnet MS/TP, IEC 61850 MMS, DNP3, CAN bus (J1939), OSDP RS-485, dry contact, 4–20 mA analog
**Process** — Physical flow (pipe, duct, busway, cable — no protocol)

## IEC 62443 zones

| Zone | Purdue | Name | SL-T |
| --- | --- | --- | --- |
| Z0 | L4–L5 | Enterprise IT / compute payload | SL-T 2 |
| Z1 | L3–L3.5 | DCIM / BMS management (IDMZ) | SL-T 2–3 |
| Z2 | L2 | Building automation / supervisory control | SL-T 2–3 |
| Z3 | L0–L1 | Field device / physical process | SL-T 1–2 |
| Z4 | isolated SIS | Safety instrumented systems | SL-T 2–3 |
| Z5 | DMZ segment | Out-of-band / jump infrastructure | SL-T 3 |

## Critical conduits

Filter `critical_conduit == true` for the set requiring explicit documentation under IEC 62443-3-2 §5.6. The architecturally load-bearing ones:

- **Z4 → Z2** — fire alarm panel to BMS: one-way hardened dry contact only, no bidirectional Ethernet
- **Z2 → Z1** — data diode to DCIM: hardware-enforced one way; the historian must never push commands downward
- **Z0 → Z1** — perimeter firewall to DMZ switch: the IDMZ boundary
- **Z5 → Z1/Z0** — PAM jump host into OT, and KVM/BMC out-of-band paths
- **Z3 → Z2** — protection relay IEDs to EPMS over IEC 61850 MMS
- **Z2 → external** — microgrid/BESS grid interface (IEEE 2030.7 / DNP3), and every vendor cloud portal (CDU, chiller, CRAH, UPS)
- **Safety interlocks** — H₂ detection to ventilation, FACP to HVAC shutdown, FACP to EPO

## Useful queries

```js
// everything in one zone
assets.filter(a => a.zone === 'Z2')

// every conduit crossing the IT/OT boundary
connections.filter(c => c.zone_crossing && c.zone_crossing.includes('->'))

// blast radius: what a compromised asset can reach downstream
function downstream(id, conns, seen = new Set()) {
  for (const c of conns.filter(c => c.from === id && !seen.has(c.id))) {
    seen.add(c.id); downstream(c.to, conns, seen);
  }
  return seen;
}

// assets with no protection above SL-T 1 carrying a critical conduit
const risky = connections.filter(c => c.critical_conduit)
  .map(c => byId[c.from]).filter(a => a && a.sl_target === 'SL-T 1');
```

## Caveats

- Rows 01–02 carry tray-level geometry; rows 03–06 are zone-band LOD. The logical graph is identical for all 96 racks.
- Vendors and models are representative selections for a facility of this class, drawn from the source reference — not a procurement list.
- `attack_surface` entries are assurance prompts for a zone/conduit assessment, not findings against a real installation.
- Quantities reflect the modelled geometry. A real hyperscale campus runs 20+ MV lineups and 20–36 generators; this model represents one hall's worth of that plant.
