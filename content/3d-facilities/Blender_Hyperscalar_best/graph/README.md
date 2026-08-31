# Reference graph — OXOT hyperscale AI datacenter

Asset register and connection graph accompanying the Babylon scene. This is the **data**: what equipment exists, how it is connected, what flows over each connection, and how each asset binds to a node in the exported GLB.

## Files

| File | Scale | Contents |
| --- | --- | --- |
| `index.json` | — | Manifest, totals, and the shared legends (zones, services, protocols) |
| `routes.json` | Routed geometry | 815 solved runs, 12,026 m total — orthogonal paths following containment corridors, with per-corridor occupancy |
| `routing.js` | Route solver | Re-runnable router: corridor lattice, Dijkstra, bundling, lane assignment, fillets |
| `positions.json` | Anchors | Bounding-box centre of all 404 asset meshes, in GLB world space |
| `facility-graph.json` | Facility | **187 assets / 249 connections** — substation, MV/LV, UPS, batteries, generators, BESS, chiller plant, towers, HVAC, MMR, core IT/DCS room, NOC, OT boundary, fire, security, internet boundary |
| `hall-graph.json` | Hall | **216 assets / 709 connections** — 6 rows × (16 GPU racks + row CDU + end-of-row rack) and every per-rack connection |
| `icd-graph.json` | **Specified interfaces** | 18 systems, 134 P&ID-tagged equipment items, **184 interfaces**, 7 instrument loops, 15 appendix tables — parsed from the DLD/ICD |
| `facility-graph.json` | Facility | 117 assets / 143 connections — substation, MV/LV, UPS, batteries, generators, BESS, chiller plant, towers, HVAC, MMR, NOC, OT boundary, fire, security |
| `hall-graph.json` | Hall | 216 assets / 672 connections — 6 rows × (16 GPU racks + row CDU + end-of-row network rack) and every per-rack connection |
| `rack-graph.json` | Rack | 10 component classes (41 units per rack) / 22 internal connections — the 48U liquid-cooled GPU rack, applied as a template to all 96 instances |

**Totals:** 403 modelled assets, 958 modelled connections, 81 critical conduits, **164 hardwired or serial connections with no network path**. Expanded through the rack template: 3,936 rack-internal components and 2,112 rack-internal connections. On top of that, 134 P&ID-tagged equipment items and 184 specified interfaces from the ICD.

**Integrity: 0 danglers, 0 phantom endpoints, 0 unrouted connections.** Every asset carries at least one connection, every connection endpoint resolves to a defined asset, and every connection has a solved route.

### Core IT / DCS room

The room at x −13…−7, z −6…8 holds the application and control estate the field systems depend on — twelve racks in two rows:

| Rack | Contents |
| --- | --- |
| `it_app_rack_a` | BMS, HVAC, cooling plant and power monitoring applications |
| `it_app_rack_b` | CCTV VMS, access control, fire graphics, suppression mimic |
| `it_db_rack` | SQL cluster A/B, historian datastore, CMDB |
| `it_dcs_rack` | DCS controller A/B, OPC UA server, engineering workstation |
| `it_ad_rack` | Domain controllers A/B, DNS/DHCP, PKI/CA, PTP grandmaster |
| `it_sec_rack` | SIEM collector, indexer, log archive, SOAR |
| `it_dmz_rack` | DMZ firewall pair, reverse proxy, remote access gateway, jump host |
| `it_hist_rack` | OT historian primary/standby, SCADA archive |
| `it_scada_rack` | SCADA server A/B, HMI station |
| `it_backup_rack` | Backup server, dedupe appliance, tape library (air-gapped) |
| `it_virt_rack` | Three virtualisation hosts |
| `it_stor_rack` | SAN controller A/B, storage shelf |

Plus room CRAC and controller, room PDU, card reader and supervised door contact.

### Network boundary

`internet` (drawn outside the perimeter) → `demarc_n` / `demarc_s` (physically separated north and south carrier terminations) → ISP routers → DDoS → perimeter firewalls → DMZ firewalls → IDMZ → OT firewall → data diode. Vendor access enters at `dmz_ra`, is brokered through `dmz_jump`, and only then reaches the OT firewall or the DCS engineering workstation.

### Hardwired interfaces

164 connections carry no network path at all and cannot be reached or defeated remotely — that distinction is what a zone/conduit assessment turns on. They are identifiable by protocol:

| Protocol | Count | Examples |
| --- | --- | --- |
| Physical flow | 512 | pipe, duct, busway, cable — no protocol at all |
| RS-232 console | 97 | out-of-band serial to every rack |
| Dry contact | 31 | FACP to BMS, leak alarm, door contacts, H₂ ventilation interlock, EPO, HVM bollard interlock |
| Modbus RTU | 13 | CDU pumps, chiller compressors, genset status |
| BACnet MS/TP | 16 | aisle temp/RH, CRAH fan and valve control |
| 4–20 mA analog | 3 | H₂ concentration, fuel tank level |
| CAN bus | 2 | generator engine control (J1939) |
| OSDP RS-485 | 2 | card readers |

## Routing

`routes.json` holds a solved path for every one of the 815 connections — not straight lines between equipment. `routing.js` regenerates it from `positions.json` plus the connection lists.

The solver models how containment actually works:

1. **A corridor lattice per service**, at service-specific altitudes so systems stay vertically separated: electricity 3.99 m, fibre 3.89, OT signal 3.80, air 3.60, chilled water 3.45, condenser 3.30, fire 4.24, security 4.14, fuel at grade. Corridor lines follow the real equipment rows and the existing ceiling spines.
2. **Dijkstra with a turn penalty**, so straight runs beat dog-legs, plus a **bundling discount** — a corridor already carrying the same service is cheaper, so runs gather into shared trays instead of each taking its own path.
3. **Lane assignment**: parallel runs in one corridor are offset sideways by the service lane pitch, so a tray with twelve circuits reads as twelve circuits.
4. **Corner fillets** at the service bend radius (0.45 m for chilled water, 0.15 m for signal cable), standing in for minimum bend radius.
5. **Wall penetrations** are cheap crossings between the ceiling band and outdoor grade; anywhere else costs 9×, so routes use real openings.
6. **Local drops** bypass the lattice: 444 of the 815 runs are short near-aligned pairs — a rack coolant drop, a busway tap-off, a sensor lead — and route straight off the nearest header rather than out to a corridor and back.

| Service | Runs | Length |
| --- | --- | --- |
| Air / HVAC | 104 | 4,486 m |
| Data (IT) | 296 | 3,445 m |
| OT control | 108 | 1,821 m |
| Water / coolant | 226 | 1,387 m |
| Electricity | 150 | 1,252 m |
| Security | 38 | 965 m |
| Fire | 27 | 782 m |
| Condenser | 5 | 236 m |
| Fuel | 4 | 24 m |

958 runs, 14,397 m total — 468 corridor runs and 490 local drops.

`corridor_occupancy` reports runs per corridor — the busiest is the CDU line at 3.6 m carrying 472 runs. That is your containment sizing input, and it also shows where a single tray failure takes out a disproportionate share of the facility.

### Drawing a route

```js
const { routes } = await (await fetch('graph/routes.json')).json();
for (const r of routes) {
  const pts = r.points.map(p => new BABYLON.Vector3(p[0], p[1], p[2]));
  const tube = BABYLON.MeshBuilder.CreateTube(`run_${r.id}`, {
    path: pts,
    radius: r.service === 'water' || r.service === 'air' ? 0.055 : 0.038,
    tessellation: 8,
  }, scene);
  tube.material = materialFor(r.service);
  tube.metadata = r;                 // service, protocol, containment, length_m, corridors
}
```

To re-solve after moving equipment, edit `positions.json` and re-run `routing.js` — `makeRouter({ localMax, xLines, zLines })` takes the corridor lines as options if your real containment differs.

## Which file is authoritative

`icd-graph.json` is the **specified** interface truth, parsed from the Detailed System Design & Interface Control Document. It carries what the other files cannot infer: P&ID tags, firmware/OS per device, interface classification `[E]`/`[D]`/`[S]`/`[F]`/`[M]`, the signal or parameter carried, direction, and SIL / SL-T safety class per interface.

`facility-graph.json` and `hall-graph.json` carry the **modelled** geometry — every asset bound to a GLB node — plus the IEC 62443 zone/conduit assessment layer. Where the two disagree about a connection, the ICD wins.

39 of the 134 P&ID tags bind to geometry today (`geometry_bound: true`, with `mesh` set). The remaining 95 are specified but not modelled — instrument-level items (CTs, VTs, valves, dosing pumps, individual detectors) and redundant units the geometry represents as a single instance. `unresolved_tags` lists the 7 narrative endpoint labels the ICD names without giving a tag.

### ICD interface schema

```jsonc
{
  "icd_id": "ICD-1.04",
  "system": "SYS-1",
  "from_tag": "PRO-RLY-01",
  "to_tag": "SCADA-RTU-01",
  "from_external": false,            // true = P&ID boundary, see external_endpoints
  "interface_kinds": ["data"],       // electrical | data | safety | fluid | mechanical
  "type_raw": "[D] Data",
  "medium_protocol": "IEC 61850 MMS over fiber Ethernet",
  "signal": "GOOSE trip messages, event reports",
  "direction": "bidirectional",
  "safety_class": "SL-T 4",
  "sil": null,                       // parsed from safety_class
  "sl_target": "SL-T 4",
  "safety_instrumented": false,      // true where a SIL is assigned
  "hardwired": false                 // copper / dry contact / 4-20 mA — no network path
}
```

**Interface counts:** 110 data · 35 electrical · 31 safety · 23 fluid · 3 mechanical. 50 interfaces are safety-instrumented (SIL assigned); 27 are hardwired with no network path at all. 166 of 184 close on two tagged assets; 18 terminate at a declared boundary (`utility_grid`, `atmosphere`, `internet`, `enterprise_siem`, `enterprise_identity`, `enterprise_it`, `peer_racks`, `hall_air`).

The 7 instrument loops (`instrument_loops`) are the P&ID trip chains written out end to end — overcurrent, arc flash, EPO, and the thermal loops — each one a sequence you can walk as a single safety function rather than a set of independent edges.

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
