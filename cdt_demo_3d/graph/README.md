# Reference graph — OXOT hyperscale AI datacenter

Asset register and connection graph accompanying the Babylon scene. This is the **data**: what equipment exists, how it is connected, what flows over each connection, and how each asset binds to a node in the exported GLB.

## Files

| File | Scale | Contents |
| --- | --- | --- |
| `index.json` | — | Manifest, totals, and the shared legends (zones, services, protocols) |
| `routes.json` | Routed geometry | 1155 solved runs, 17,720 m total — orthogonal paths following containment corridors, with per-corridor occupancy |
| `routing.js` | Route solver | Re-runnable router: corridor lattice, Dijkstra, bundling, lane assignment, fillets |
| `hazard-log.json` | Risk data | 11 CyHAZOPs hazards (N2/N5/N6), 15 critical items, 16 MoR requirements, 7 operating modes, 6 ALE scenarios, 8 ROSI controls, authored redundancy and timing |
| `positions.json` | Anchors | Bounding-box centre of all 449 asset meshes, in GLB world space |
| `facility-graph.json` | Facility | **209 assets / 314 connections** — substation, MV/LV, UPS, batteries, generators, BESS, chiller facility, towers, HVAC, MMR, core IT/DCS room, NOC, OT boundary, fire, security, internet boundary |
| `hall-graph.json` | Hall | **240 assets / 841 connections** — 6 rows × (16 GPU racks + row CDU + end-of-row rack) and every per-rack connection |
| `icd-graph.json` | **Specified interfaces** | 18 systems, 134 P&ID-tagged equipment items, **184 interfaces**, 7 instrument loops, 15 appendix tables — parsed from the DLD/ICD |
| `rack-graph.json` | Rack | 10 component classes (41 units per rack) / 22 internal connections — the 48U liquid-cooled GPU rack, applied as a template to all 96 instances |

**Totals:** 449 modelled assets, 1,155 modelled connections, 216 critical conduits, **188 hardwired or serial interfaces with no network path** (plus 525 physical-flow runs carrying no protocol at all). Expanded through the rack template: 3,936 rack-internal components and 2,112 rack-internal connections. On top of that, 134 P&ID-tagged equipment items and 184 specified interfaces from the ICD.

**Integrity: 0 danglers, 0 phantom endpoints, 0 unrouted connections.** Every asset carries at least one connection, every connection endpoint resolves to a defined asset, and every connection has a solved route.

### Core IT / DCS room

The room at x −13…−7, z −6…8 holds the application and control estate the field systems depend on — twelve racks in two rows:

| Rack | Contents |
| --- | --- |
| `it_app_rack_a` | BMS, HVAC, cooling facility and power monitoring applications |
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

**188 interfaces are hardwired or serial** — no network path at all, so they cannot be reached or defeated remotely. That distinction is what a zone/conduit assessment turns on:

| Protocol | Count | Examples |
| --- | --- | --- |
| RS-232 console | 96 | out-of-band serial to every rack |
| Dry contact | 35 | FACP to BMS, leak alarm, door contacts, H₂ ventilation interlock, EPO, bollard interlock |
| Modbus RTU | 24 | CDU pumps, chiller compressors, genset status |
| BACnet MS/TP | 19 | aisle temp/RH, CRAH fan and valve control, DDC field controllers |
| 4-20 mA analog | 9 | H₂ concentration, fuel tank level, differential pressure |
| OSDP RS-485 | 3 | card readers |
| CAN bus | 2 | generator engine control (J1939) |

Separately, **525 runs carry no protocol at all** — pipe, duct, busway and cable, where the physical flow *is* the interface. Those are in `routes.json` as containment but are not attack surface.
| CAN bus | 2 | generator engine control (J1939) |

## Routing

`routes.json` holds a solved path for every one of the 1155 connections — not straight lines between equipment. `routing.js` regenerates it from `positions.json` plus the connection lists.

The solver models how containment actually works:

1. **A corridor lattice per service**, at service-specific altitudes so systems stay vertically separated: electricity 3.99 m, fibre 3.89, OT signal 3.80, air 3.60, chilled water 3.45, condenser 3.30, fire 4.24, security 4.14, fuel at grade. Corridor lines follow the real equipment rows and the existing ceiling spines.
2. **Dijkstra with a turn penalty**, so straight runs beat dog-legs, plus a **bundling discount** — a corridor already carrying the same service is cheaper, so runs gather into shared trays instead of each taking its own path.
3. **Lane assignment**: parallel runs in one corridor are offset sideways by the service lane pitch, so a tray with twelve circuits reads as twelve circuits.
4. **Corner fillets** at the service bend radius (0.45 m for chilled water, 0.15 m for signal cable), standing in for minimum bend radius.
5. **Wall penetrations** are cheap crossings between the ceiling band and outdoor grade; anywhere else costs 9×, so routes use real openings.
6. **Local drops** bypass the lattice: 501 of the 1155 runs are short near-aligned pairs — a rack coolant drop, a busway tap-off, a sensor lead — and route straight off the nearest header rather than out to a corridor and back.

| Service | Runs | Length |
| --- | --- | --- |
| Data (IT) | 419 | 5,463 m |
| Air / HVAC | 102 | 4,310 m |
| Electricity | 170 | 2,130 m |
| OT control | 142 | 1,834 m |
| Security | 62 | 1,608 m |
| Water / coolant | 221 | 1,317 m |
| Fire | 30 | 797 m |
| Condenser | 5 | 236 m |
| Fuel | 4 | 24 m |

1155 runs, 17,720 m total — 654 corridor runs and 501 local drops.

`corridor_occupancy` reports runs per corridor — the busiest is X0.92@3.6 carrying 474 runs. That is your containment sizing input, and it also shows where a single tray failure takes out a disproportionate share of the facility.

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

## Risk data — `hazard-log.json`

Authored engineering and consequence data. **It overrides anything the model infers.** Everything in it is transcribed from the source papers, not derived.

| Block | Contents | Source |
| --- | --- | --- |
| `redundancy` | Per-asset service overrides and vendor pump configurations | WP06 Table 6.5, WP09 critical items |
| `timing` | 45 s to GPU throttle, 90 s to protective shutdown, 10-15 s generator transfer | WP06 |
| `hazards` | 11 CyHAZOPs rows with severity, occurrence-cyber, detection-cyber, RPN-C, MITRE ATT&CK for ICS technique and SL-T | WP09 Tables 9.3, 9.6 and the N6 field observation |
| `critical_items` | 15 components with OT interface, SL-A and failure mode | WP09 Tables 9.2, 9.5, 9.8 |
| `operating_modes` | M1 normal through M7 emergency shutdown | WP16 Table 16.2 |
| `mor` | 16 minimum operating requirements with violation response and mode transition | WP16 Tables 16.4-16.6 |
| `ale` | 6 node scenarios with AV, EF, SLE, ARO and ALE | WP10 Table 10.2 |
| `controls` | 8 controls with cost, mitigation rate, ROSI and standard clause | WP10 Table 10.4 |
| `cve_watch` | 4 CVEs mapped to affected assets | WP06, WP09 |
| `node_crosswalk` | N2/N5/N6/N8/N10/N14 to asset ids | **proposed, needs confirmation** |

**Highest cyber RPN is 294** — N6-CY-003, the SPOOFED guide word on CDU return temperature. An attacker writing to the CDU's Modbus holding registers reports artificially low return temperatures, the BMS reduces chiller output, and the thermal excursion is amplified rather than corrected. WP09 records a 13.4x cyber multiplier over the mechanical equivalent. Telemetry integrity is the controlling security property.

### Two methodological choices, stated plainly

**Control effectiveness is not compounded.** Where several selected controls cover the same node, the risk portfolio applies the **highest single mitigation rate**, not the product. WP10 states the rates as independent effectiveness against that node's scenario, not as stackable layers, so compounding would claim a benefit the source does not support.

**Redundancy inference is a fallback, not a default.** Assets listed in `redundancy` use the authored rule. Everything else falls back to feed count — two or more inbound feeds of a service hold, one does not. The row CDUs are the important case: they carry internal N+1 pumps, but internal redundancy does not survive loss of the unit, so their water dependency is authored as `all-of`.

### Unconfirmed inputs

Two values were chosen by me, not read from your documents, and every consequence figure depends on them:

1. **The node crosswalk** — which asset ids belong to N2, N5, N6, N8, N10 and N14.
2. **The per-rack revenue basis** — $12.5M/hr divided by 96 racks. The WP10 scenarios price specific rack counts directly, so there may be a better basis for partial-hall loss.

## Cell architecture

The campus is divided into independently deployable **cells** (WP06 §3.2) — 5–10 MW power/cooling blocks that can be commissioned and operated on their own. This model contains **two cells**:

| Cell | Rows | Racks | IT load | Total load @ PUE 1.2 |
| --- | --- | --- | --- | --- |
| Cell A | row01–row03 | 48 | 5.76 MW | 6.91 MW |
| Cell B | row04–row06 | 48 | 5.76 MW | 6.91 MW |

Every asset carries a `cell` field: `Cell A`, `Cell B` or `Campus (shared)`. 273 assets are cell-scoped (141 in Cell A, 132 in Cell B); 176 are shared campus facility.

**Independent per cell:** MV/LV distribution path (2 UPS in 2N, own RPP, own busway spine), OT network segment (switch, firewall, protocol gateway on a cell VLAN with no inter-cell routing), BMS zone controller with setpoint autonomy, Z4 fire panel with its own detection and agent release, and the row CDU cluster.

**Shared campus:** substation and MV lineup, generators and bulk fuel, BESS, central chiller facility and cooling towers, carrier demarcs and the internet boundary, core IT / DCS room, NOC and campus BMS, and the data diode.

**Why it matters for the numbers.** WP10's node ALEs are campus-wide worst case — every cell failing together. Cell isolation is the control that prevents that, so a single-cell event is roughly 1/14.5 of the WP10 figure at this cell size. `hazard-log.json` reports both, and `cell_conformance` records which of the five cell requirements the topology actually implements, with the threat-path and cascade results used to verify each.

**Conformance today: 5 of 5 met**, each verified by a query rather than by inspection — a Cell A OT compromise reaches 4 assets and stops at 2 boundaries; a Cell A busway loss stops 67 assets and no Cell B rack; a single UPS loss stops 1 asset because the 2N pair inside the cell holds. `cell_conformance.verified` records the method and results. The residual exposure is the shared central chiller facility, which is correctly shared per WP06.

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

**ICD interface counts:** 110 data · 35 electrical · 31 safety · 23 fluid · 3 mechanical. 50 interfaces are safety-instrumented (SIL assigned); 27 are hardwired with no network path at all. 166 of 184 close on two tagged assets; 18 terminate at a declared boundary (`utility_grid`, `atmosphere`, `internet`, `enterprise_siem`, `enterprise_identity`, `enterprise_it`, `peer_racks`, `hall_air`).

The 7 instrument loops (`instrument_loops`) are the P&ID trip chains written out end to end — overcurrent, arc flash, EPO, and the thermal loops — each one a sequence you can walk as a single safety function rather than a set of independent edges.

## Geometry sources

| GLB | Page | Notes |
| --- | --- | --- |
| Campus | `hyperscale-campus.html` → Download GLB | Facility + hall, 5,966 meshes, full hierarchy preserved |
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
- Quantities reflect the modelled geometry. A real hyperscale campus runs 20+ MV lineups and 20–36 generators; this model represents one hall's worth of that facility.


## Architecture review — the field tier

The model was checked category by category against WP07 Chapter 7 (Tables 7.2–7.16) and the consolidated BOM. Seven gaps were closed; eight are recorded as open in `hazard-log.json` under `architecture_review`. The two that mattered were structural rather than missing equipment.

**A whole Purdue level was absent.** Row sensors reported straight to the Z2 supervisory zone controller, skipping L1. There is now a **DDC field-controller tier** — a mechanical and an electrical DDC per cell (Saia-Burgess PCD QronoX, the only BMS DDC certified to SL-3), with all 36 row sensor and leak connections terminating there instead. BACnet MS/TP now ends where it should, and the zone boundary sits where the standard puts it.

**A costed hazard node had no asset.** N14 (BMC firmware) carried an ALE and controls but nothing in the graph to attach them to. Each row now has a **BMC estate** asset — 128 BMCs, Z5, Redfish/IPMI — with management edges to all 96 racks and to the OOB console server.

Also added: **passive OT IDS sensors** per cell and at the IDMZ (one-way from their mirror ports, so detection coverage is visible rather than assumed); **switched rack PDUs** on A and B buses per row, with all 96 rack power drops re-parented through them, because switched outlets are remote power control over production servers; a redundant **Tridium JACE-8000** integration pair reaching into both cells' field tiers; **containment differential pressure** transmitters per row on 4–20 mA; and a roof **GNSS antenna** feeding the PTP grandmaster, since GNSS spoofing corrupts both IEC 61850 protection coordination and every log timestamp.

Open items, with reasons, are in the ASSUMPTIONS & PROVENANCE panel: visitor management and PSIM integration, secrets management beneath the modelled PKI, counter-UAS, ITSM, RFID tracking, thermal cameras, chemical dosing, and DPU/SmartNIC as distinct assets.

### Integrity checks

Run before publishing. All five must return empty:

```js
const conns = [...F.connections, ...H.connections];
const ids   = new Set([...F.assets, ...H.assets].map(a => a.id));
const cids  = conns.map(c => c.id);

cids.filter((x, i) => cids.indexOf(x) !== i)                    // duplicate connection ids
assetIds.filter((x, i) => assetIds.indexOf(x) !== i)            // duplicate asset ids
conns.flatMap(c => [c.from, c.to]).filter(x => !ids.has(x))     // phantom endpoints
[...ids].filter(i => !linked.has(i))                            // danglers
conns.filter(c => !routeById[c.id])                             // unrouted connections
```

**Connection ids must be unique across BOTH files.** The explorer, the Blender `--routes` tagging and the documented `byId` query patterns all key routes by connection id, so a collision silently discards one side of the pair. A duplicate-id defect in an earlier revision collided 16 reception/security edges with the cell-boundary conduits — cell OT switch→firewall, firewall→diode, cell FACP→zone controller, campus BMS→zone controller, RPP→cell services — which are exactly the edges the cell-isolation argument rests on, and it cost 16 runs and 526 m without any error being raised. Uniqueness is now asserted, not assumed.
