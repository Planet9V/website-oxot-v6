# OT-DiagramStudio: A React-Based Industrial Diagramming and Risk Intelligence Platform for IEC 62443-Aligned OT Environments
**Document Type:** Technical Specification and Architecture Reference  
**Version:** 1.0  
**Date:** May 2026  
**Prepared by:** Jim McKenney, OT Security Architect  
**Classification:** Internal Engineering Reference  

***
## Abstract
This paper presents the complete technical specification, architecture, and implementation schema for **OT-DiagramStudio** — an open-source, React-based diagramming and risk intelligence platform designed for Operational Technology (OT) environments. The system integrates P&ID process engineering data, IEC 62443 security zone modelling, asset inventory management, HAZOP safety analysis, FMEA, fault tree analysis, reliability modelling, and STRIDE-based threat modelling into a single cohesive application deployed on the CYDTT-1 DGX SPARK edge node. The platform is designed to serve critical infrastructure operators — specifically energy, food processing, and manufacturing sectors — who require a single source of truth for OT asset topology, process safety, and cybersecurity risk. The architecture employs a polyglot persistence strategy: NetBox PostgreSQL for device inventory, Neo4j for graph intelligence, and a dedicated canvas PostgreSQL schema for diagram state. All primary dependencies carry MIT or Apache-2.0 licences, with explicitly documented exceptions.

***
## 1. Introduction
### 1.1 Motivation
Operational technology environments present a fundamental documentation problem: the physical process engineering world (P&IDs, equipment tags, HAZOP studies), the OT cybersecurity world (IEC 62443 zones, conduits, security levels), and the IT asset management world (IP addresses, network topology, device inventory) are maintained in separate, incompatible tools. A process engineer works in a CAE system producing DEXPI-compliant P&IDs. A cybersecurity assessor works in a threat modelling tool such as OWASP Threat Dragon. A network engineer works in NetBox or a spreadsheet. None of these artefacts are connected, and none can answer cross-domain questions such as: "Which physical pump is controlled by the PLC that sits in our lowest-SL zone, has an open STRIDE Tampering threat, a high-RPN failure mode, and a MTTF below one year?"

OT-DiagramStudio is designed to answer exactly those questions by building a unified knowledge graph from all three source domains and exposing it through an interactive, drag-and-drop React canvas.
### 1.2 Deployment Context — CYDTT-1 DGX SPARK
OT-DiagramStudio is designed as a containerised workload for the **CYDTT-1** (Cyber Digital Twin) edge node, which is based on the NVIDIA DGX SPARK platform. The DGX SPARK provides 128 GB unified LPDDR5x memory, 2 TB NVMe storage, and a 1 PFLOP (INT8) AI compute budget in a deployable chassis suitable for on-premises customer-site installation. The stack runs entirely local — no cloud dependency — which is a hard requirement for OT environments with air-gapped or restricted networks.[^1]

The full CYDTT-1 software stack includes:

- **LiteLLM → llama-swap → vLLM/llama.cpp** for hot-swappable local LLM inference[^1]
- **Qwen3-30B-A3B** (primary reasoning), **Qwen3-8B** (fast inference), **Qwen3-Embedding** (semantic search)[^1]
- **Docling** document ingestion pipeline for OT documentation (PDFs, P&IDs, assessments)[^1]
- **GLiNER** custom OT NER ontology for entity extraction from engineering documents[^1]
- **Tailscale mesh + exit node** for secure multi-site connectivity[^1]
- **PostgreSQL 16 + pgvector**, **Neo4j 5.x**, **Redis 7** for persistence[^1]
- **OT-DiagramStudio** (this system) as the primary visual intelligence interface
### 1.3 Scope of This Document
This document covers:

1. Use cases and capability requirements
2. System architecture and component selection rationale
3. Library stack with licence risk assessment
4. PostgreSQL schema (Stages 1–4)
5. Neo4j schema (Stages 1–4)
6. Cross-stage data flow and single-source-of-truth enforcement
7. Implementation plan (10 sprints)

***
## 2. Use Cases and Capabilities
### 2.1 Primary Diagram Types
The platform supports five distinct diagram modes, each addressing a different professional audience:

| Mode | Primary Audience | Data Sources | Standard |
|---|---|---|---|
| Zone/Conduit Diagram | OT Security Assessor | NetBox + Neo4j | IEC 62443-3-2 |
| Network Topology | Network Engineer | NetBox DCIM/IPAM | ISA-99 |
| P&ID (Process) | Process Engineer | DEXPI Proteus XML | ISO 10628 / DEXPI 1.3 |
| Threat Model DFD | Cybersecurity Analyst | OWASP Threat Dragon JSON | STRIDE/LINDDUN |
| Blast Radius / Risk | CISO / Risk Manager | Neo4j composite query | IEC 62443 + IEC 61882 |
### 2.2 Core Capabilities
**Asset Inventory and Tagging.** Every device in the diagram is a first-class NetBox record with a stable asset tag, Purdue level, IEC 62443 SL target/achieved, firmware version, OT protocol, DEXPI equipment ID, and P&ID tag stored as custom fields on `dcim_device.custom_field_data`. The canvas renders live inventory data — there is no local copy of device properties.[^2]

**Drag-and-Drop Diagramming.** The React canvas (built on `@xyflow/react` v12, MIT licence) supports drag-and-drop node placement, connection of equipment via typed edges, pan/zoom, minimap, and custom node types per device role. Users can draw diagrams from scratch or auto-populate from NetBox inventory filtered by site and Purdue level.[^3][^4]

**Auto-Routing and Layout.** ELK.js (Eclipse Layout Kernel, EPL-2.0) provides Sugiyama-algorithm hierarchical layout and port-based auto-routing. This is used when a user requests automatic layout of a zone/conduit or network topology diagram. Manual position overrides are stored in the canvas PostgreSQL schema and take precedence.[^5][^6]

**P&ID Integration.** The DEXPI pipeline converts Proteus XML exports from CAE tools (SmartPlant P&ID, AVEVA E3D, Bentley OpenPlant) into a Neo4j graph of `:PIDEquipment`, `:Instrument`, and `:PipingSegment` nodes. P&ID equipment nodes are linked to NetBox device records via the `dexpi_equipment_id` and `pid_tag` custom fields, bridging process engineering and OT inventory.[^7][^8][^9]

**NetworkX Integration.** Python's NetworkX library provides the analytical graph layer. The sync service exports Neo4j subgraphs as Cytoscape JSON via `nx.readwrite.json_graph.cytoscape_data()`, which the React frontend consumes directly via `react-cytoscapejs`. NetworkX is used for shortest-path analysis, clustering coefficient calculations, and centrality metrics on the OT network topology.[^10][^11]

**Threat Modelling.** OWASP Threat Dragon v2 (Apache-2.0) provides the DFD-based threat modelling canvas with STRIDE threat generation. Threat Dragon model JSON is imported into the platform, parsed, and synced to Neo4j as `:ThreatComponent`, `:DataFlow`, and `:TrustBoundary` nodes. Threat components are linked to NetBox device records, allowing STRIDE threats to surface in the blast radius analysis.[^12][^13]

**Safety Analysis Integration.** The platform integrates HAZOP (via the preHAZOP algorithm on DEXPI graphs), FMEA (LLM-assisted via the CYDTT-1 local LLM stack), fault tree analysis (via the `pfta` library), and Weibull reliability modelling. All safety findings are aggregated into a Critical Items List (CIL) as the single consolidated risk artefact.

**Runtime Risk Scoring.** A composite runtime risk score (0.0–1.0) is computed for every active device by a Celery beat task. The score integrates HAZOP risk rank (25%), FTA cut set criticality (25%), FMEA RPN (20%), Weibull MTTF (15%), and STRIDE score (15%). The score is written as a property on the Neo4j `:Device` node and used to colour-code devices on the canvas in real time.

**Industrial Icons.** The platform uses SVG icon libraries from AggreGate SCADA/HMI (pumps, valves, tanks, sensors, motors, HVAC, conveyors), Open Automation Software (5,000+ process symbols), and draw.io industrial shape libraries (Apache-2.0). Icons are mapped by `device_role` and `equipment_class` to a React component registry.[^14][^15][^16]

***
## 3. System Architecture
### 3.1 Architectural Overview
The system follows a four-layer architecture:

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 4 — React Frontend (Vite + TypeScript)           │
│  @xyflow/react · reagraph · react-cytoscapejs            │
│  Zustand state · ELK.js auto-layout                     │
└────────────────────────┬────────────────────────────────┘
                         │ REST + WebSocket
┌────────────────────────▼────────────────────────────────┐
│  LAYER 3 — FastAPI Middleware (Python 3.12)             │
│  pynetbox · neo4j-driver · Celery + Redis               │
│  pyDEXPI CLI (AGPL-isolated) · pfta · reliability       │
└──────┬───────────────────────────┬──────────────────────┘
       │                           │
┌──────▼───────┐         ┌─────────▼────────────────────┐
│  LAYER 2A    │         │  LAYER 2B                    │
│  NetBox      │         │  Neo4j 5.x                   │
│  PostgreSQL  │◄──sync──►  (Graph Intelligence)        │
│  (Inventory) │         │                              │
└──────────────┘         └──────────────────────────────┘
       │
┌──────▼───────────────────────────────────────────────────┐
│  LAYER 1 — canvas + safety PostgreSQL schemas            │
│  Diagram layout · Threat models · FMEA · FTA · Weibull   │
└──────────────────────────────────────────────────────────┘
```
### 3.2 Single Source of Truth Assignments
A core architectural constraint is that no data is stored in two places in the same form. The following table is definitive:

| Data Domain | Authoritative Store | Derived/Replica | Written By |
|---|---|---|---|
| Device / network inventory | NetBox `dcim_*`, `ipam_*` | `:Device` in Neo4j (properties only) | NetBox UI / pynetbox |
| IEC 62443 custom fields | `dcim_device.custom_field_data` JSONB | `:Device` Neo4j properties | NetBox API |
| Graph topology and relationships | Neo4j | — | Sync service |
| Diagram layout (x/y, visual state) | `canvas.diagrams`, `canvas.diagram_nodes`, `canvas.diagram_edges` | — | React canvas save |
| Threat model files (full JSON) | `canvas.threat_models.td_json` | `:ThreatComponent` graph (Neo4j) | Threat Dragon import |
| FMEA full records | `safety.fmea_records` | `:FailureMode` Neo4j (summary only) | LLM FMEA service |
| HAZOP deviations | Neo4j `:HAZOPDeviation` | `safety.critical_items` reference | preHAZOP service |
| Fault tree definitions | `safety.fault_trees.ft_definition` | `:FaultTree`, `:CutSet` Neo4j | FTA upload API |
| Weibull parameters | `safety.weibull_models` | `:WeibullModel` Neo4j (summary) | Reliability service |
| Runtime risk scores (current) | Neo4j `:Device.runtime_risk_score` | `safety.risk_score_history` (archive) | Celery risk task |
| Critical Items List | `safety.critical_items` | — | All safety services |
### 3.3 AGPL Licence Isolation
The `pyDEXPI` library (AGPL-3.0, TU Delft) is the only AGPL dependency in the stack. AGPL-3.0 requires that any software making the library available over a network must also be released under AGPL-3.0. To preserve the proprietary nature of the platform for client deployments, pyDEXPI is strictly isolated:[^17]

- It runs only in `scripts/parse_dexpi.py` — a standalone offline CLI script
- The FastAPI service **never imports** pyDEXPI
- The script outputs `dexpi_graph.json` — a plain JSON file with no pyDEXPI dependency
- The API reads that JSON file and writes to Neo4j independently

For deployments where open-sourcing is acceptable, or where a commercial licence is negotiated with TU Delft, this isolation may be relaxed.

***
## 4. Library Stack
### 4.1 Frontend Libraries
| Library | Version | Licence | Role |
|---|---|---|---|
| `@xyflow/react` | 12.x | MIT | Primary diagram canvas — drag-and-drop, nodes, edges, handles[^3][^4] |
| `elkjs` | 0.9.x | EPL-2.0 | Hierarchical auto-layout and port-based routing[^5][^6] |
| `reaviz/reagraph` | 4.x | Apache-2.0 | WebGL network topology — large graphs, 3D option[^18][^19] |
| `react-cytoscapejs` | 2.x | MIT | NetworkX Cytoscape JSON rendering in React[^11] |
| `@antv/x6` | 2.x | MIT | Alternative canvas for DAG / ER-style equipment diagrams[^20] |
| `zustand` | 4.x | MIT | Canvas state management (nodes, edges, selection, layout mode) |
| `@tanstack/react-query` | 5.x | MIT | Server state, API caching, WebSocket subscription |
| `react-drawio` | 0.x | MIT | draw.io embedded iframe for industrial shape library access[^16] |
### 4.2 Backend Libraries
| Library | Version | Licence | Role |
|---|---|---|---|
| `fastapi` | 0.115.x | MIT | REST API framework |
| `pynetbox` | 7.x | Apache-2.0 | NetBox API client for sync service |
| `neo4j` (Python driver) | 5.x | Apache-2.0 | Neo4j query and write |
| `networkx` | 3.x | BSD-3-Clause | Graph analytics, Cytoscape JSON export[^10] |
| `pyDEXPI` | 1.2.x | **AGPL-3.0** | DEXPI Proteus XML parsing — **ISOLATED to CLI script**[^17][^8] |
| `pfta` | latest | MIT | Fault tree analysis — minimal cut sets, Boolean reduction |
| `reliability` | 0.8.x | LGPL-3.0 | Weibull-2P MLE fitting, reliability metrics |
| `celery` | 5.x | BSD-3-Clause | Async task queue (sync, risk scoring, FMEA generation) |
| `redis` | 5.x | MIT | Celery broker, WebSocket pub/sub |
### 4.3 Infrastructure
| Component | Version | Licence | Role |
|---|---|---|---|
| NetBox | 4.3.x | Apache-2.0 | OT asset inventory and IPAM[^2] |
| Neo4j | 5.18.x Community | GPL-3.0 (Community) | Graph database — topology, risk, safety[^21] |
| PostgreSQL | 16.x | PostgreSQL Licence | NetBox DB + canvas + safety schemas |
| Redis | 7.x | RSALv2/SSPLv1 | Cache and message broker |
| OWASP Threat Dragon | 2.6.x | Apache-2.0 | Threat modelling DFD editor[^12] |

**Licence Risk Notes:**

- **EPL-2.0 (ELK.js):** Weak copyleft. For internal-only deployments this is low risk. Do not statically bundle ELK.js into a redistributed product without legal review.[^5]
- **LGPL-3.0 (`reliability`):** Dynamic linking (normal pip install) is permissible without copyleft obligations.[^22]
- **GPL-3.0 (Neo4j Community):** The database process itself is GPL-3.0, but applications that connect to Neo4j via the network driver are not considered derivative works. Neo4j Enterprise eliminates this concern at additional cost.
- **AGPL-3.0 (pyDEXPI):** Fully isolated as described in Section 3.3.

***
## 5. PostgreSQL Schema
All PostgreSQL schema work is organised across two database instances and four migration files. NetBox manages its own `dcim_*` and `ipam_*` tables via Django migrations — developers must not create or alter these tables directly. The team creates and owns the `canvas` and `safety` schemas only.
### 5.1 NetBox Custom Fields
NetBox stores all custom fields in `dcim_device.custom_field_data`, a JSONB column. The following custom fields must be created via the bootstrap script `scripts/init_netbox_custom_fields.py` before any sync service runs.[^2]

**Choice Sets required:**

- `purdue_levels`: Levels 0, 1, 2, 3, 3.5, 4, 5 (ISA-95/Purdue PERA)
- `sl_levels`: SL0 through SL4 (IEC 62443-3-3)
- `ot_protocols`: Modbus TCP, Modbus RTU, PROFINET, PROFIBUS, EtherNet/IP, DNP3, IEC 61850, IEC 60870-5-104, OPC UA, OPC DA, BACnet/IP, HART, Foundation Fieldbus, CODESYS V3, Siemens S7comm, CC-Link IE, DeviceNet

**Custom fields per `dcim_device`:**

| Field Name | Type | Description |
|---|---|---|
| `purdue_level` | select (purdue_levels) | ISA-95 / Purdue PERA level |
| `iec62443_sl_target` | select (sl_levels) | Target Security Level per IEC 62443-3-3 |
| `iec62443_sl_achieved` | select (sl_levels) | Achieved SL from last assessment |
| `zone_id` | text | IEC 62443 Zone identifier — maps to `:Zone.zone_id` in Neo4j |
| `protocol` | select (ot_protocols) | Primary OT communication protocol |
| `firmware_version` | text | Current firmware version string |
| `last_security_assessment` | date | Date of last cybersecurity assessment |
| `maintenance_window` | text | e.g. "Sun 02:00-04:00 UTC" |
| `risk_accepted` | boolean | Risk formally accepted by asset owner |
| `dexpi_equipment_id` | text | Links to `:PIDEquipment.dexpi_id` in Neo4j |
| `pid_tag` | text | ISA-5.1 instrument/equipment tag (e.g. FIC-101, P-101A) |

An example populated `custom_field_data` payload for a PLC:

```json
{
  "purdue_level": "1",
  "iec62443_sl_target": "SL2",
  "iec62443_sl_achieved": "SL1",
  "zone_id": "ZONE-PUMP-STATION-A",
  "protocol": "ethernetip",
  "firmware_version": "V2.9.2",
  "last_security_assessment": "2025-11-14",
  "maintenance_window": "Sun 02:00-04:00 UTC",
  "risk_accepted": false,
  "dexpi_equipment_id": "E-0042",
  "pid_tag": "P-101A"
}
```
### 5.2 Migration 001 — Canvas Schema (Stage 1)
The canvas schema stores diagram layout state only. It holds no copies of device properties or safety analysis data. Tables: `canvas.diagrams`, `canvas.diagram_nodes`, `canvas.diagram_edges`, `canvas.sync_watermarks`.

`canvas.diagrams` records diagram metadata: `id (UUID PK)`, `name`, `plant_unit`, `diagram_type` (zone-conduit / network-topology / pid / threat-model / blast-radius), `site_slug`, `created_by`, `created_at`, `updated_at`, `version`.

`canvas.diagram_nodes` records per-node visual state: `id`, `diagram_id (FK)`, `node_id` (e.g. "device-456"), `node_type` (otDevice / zone / conduit / pidEquip), `pos_x`, `pos_y`, `width`, `height`, `collapsed`, `label_override`, `icon_override`, `style_json (JSONB)`, `source_id` (NetBox ID or Neo4j ID), `source_type`.

`canvas.diagram_edges` records per-edge routing: `id`, `diagram_id (FK)`, `edge_id`, `source_node_id`, `target_node_id`, `edge_type` (smoothstep / straight / step), `label`, `animated`, `style_json (JSONB)`, `waypoints (JSONB — [{x,y},…])`, `source_handle`, `target_handle`.

`canvas.sync_watermarks` tracks incremental NetBox sync: one row per object type (`dcim.device`, `ipam.ipaddress`, etc.) with `last_synced_at` and `last_sync_count`.
### 5.3 Migration 003 — Threat Models (Stage 3)
Stage 3 is deployed before Stage 2 because `:ThreatComponent` nodes created in this stage are referenced by Stage 2 safety relationship creation.

`canvas.threat_models` stores the raw OWASP Threat Dragon v2 JSON verbatim in `td_json (JSONB)`, plus extracted aggregate counts (`total_threats`, `open_threats`, `mitigated_threats`, `out_of_scope_count`, `diagram_count`), status (`Draft` / `InReview` / `Approved` / `Archived`), and a Neo4j sync flag.[^12][^23]

`canvas.threat_records` stores one row per extracted threat: `threat_model_id (FK)`, `td_cell_id` (Threat Dragon component ID), `component_type` (tm.Process / tm.Store / tm.Actor / tm.Flow), `title`, `threat_type` (STRIDE category), `description`, `mitigation`, `score (0–10)`, `status` (Open / Mitigated / NotApplicable / TransferredToRisk), `netbox_device_id`, `neo4j_component_id`.[^13][^24]

`canvas.diagram_exports` stores export snapshots: format (png / svg / pdf / json), `file_path`, `file_size_bytes`, `exported_by`, `version_tag`.
### 5.4 Migration 004 — Safety Schema (Stage 2)
The `safety` schema is the authoritative store for all safety analysis artefacts. It is strictly append-only for completed analyses (use `action_status` or `status` fields for lifecycle management, never DELETE records).

**`safety.fault_trees`** — one row per fault tree analysis: `name`, `plant_unit`, `site_slug`, `top_event_name`, `ft_definition (TEXT)` — the verbatim `.ft` file content for the `pfta` library, `total_cut_sets`, `single_point_failures`, `top_event_probability (NUMERIC 15,10)`, `last_run_at`.

**`safety.fmea_worksheets`** — one row per device under FMEA analysis: `netbox_device_id`, `device_name` (denormalised for display), `device_type`, `source` (LLM-Auto / Manual / Imported).

**`safety.fmea_records`** — one row per failure mode: `worksheet_id (FK)`, `netbox_device_id`, `function_description`, `failure_mode`, `failure_effect`, `failure_cause`, `severity (1–10)`, `occurrence (1–10)`, `detection (1–10)`, `rpn (GENERATED ALWAYS AS severity * occurrence * detection STORED)`, `action_required`, `action_owner`, `target_completion`, `action_status`, `neo4j_fm_id`.

**`safety.reliability_datasets`** — raw failure time data: `netbox_device_id`, `failure_times (NUMERIC[])`, `right_censored_times (NUMERIC[])`, `n_failures (GENERATED)`, `data_source`.

**`safety.weibull_models`** — Weibull-2P fit results: `dataset_id (FK)`, `netbox_device_id`, `alpha` (scale / characteristic life, hours), `beta` (shape), `mttf_hours`, `b10_life_hours`, `b50_life_hours`, `fit_method` (MLE / LS), `goodness_of_fit`, `failure_pattern` (InfantMortality / Random / WearOutModerate / WearOutNarrow), `pm_recommendation`, `reliability_plot_b64`, `neo4j_model_id`.

**`safety.critical_items`** — the single aggregation table for all safety and risk findings: `plant_unit`, `netbox_device_id`, `dexpi_equipment_id`, `item_type` (HAZOPHighRisk / CutSet / HighRPN / LowMTTF / SLGap / OpenThreat), `description`, `risk_score (NUMERIC 6,2)`, `source_ref_type`, `source_ref_id`, `priority (1–4)`, `status` (Open / InProgress / Closed / Accepted / Deferred), `assigned_to`, `due_date`. This table is the single source of truth for the React Critical Items List panel and PDF export.
### 5.5 Migration 005 — Bow-Tie and Runtime Risk (Stage 4)
**`safety.bowtie_models`** — `pivot_event_name`, `fault_tree_id (FK → safety.fault_trees)`, `td_component_id` (FK → Threat Dragon component), `pg_threat_model_id (FK → canvas.threat_models)`, `n_safeguards`, `n_consequences`.

**`safety.consequence_branches`** — one row per right-side outcome branch: `bowtie_id (FK)`, `outcome_name`, `safeguards (TEXT[])`, `safeguard_reliability (NUMERIC 5,4)`, `outcome_probability (NUMERIC 15,10)`, `severity (1–5)`, `severity_label`, `tolerable (BOOLEAN)`.

**`safety.distribution_reliability`** — RELSAD Monte Carlo results per zone: `zone_id` (FK → Neo4j `:Zone.zone_id`), `n_iterations`, `time_horizon_years`, `include_bess`, `saidi_hours`, `saifi_count`, `caidi_hours`, `ens_mwh`, `asai_percent`, `saidi_rating`, `saifi_rating`, `simulation_config (JSONB)`.

**`safety.risk_score_history`** — append-only audit trail of risk scores: `netbox_device_id`, `hazop_score`, `fta_score`, `fmea_score`, `reliability_score`, `threat_score`, `runtime_risk_score`, `risk_level (GENERATED ALWAYS AS CASE … STORED)`, `scored_at`, `scoring_version`. Current live score is on the Neo4j `:Device` node; this table provides the historical record.

***
## 6. Neo4j Schema
### 6.1 Design Principles
Neo4j is used exclusively for graph intelligence — topology traversal, blast radius analysis, shortest-path computation, and cross-domain risk queries. It does not store documents, large text blobs, or file content. Where full text detail is needed, Neo4j nodes carry a `pg_*_id` foreign key back to the authoritative PostgreSQL record.

All schema enforcement is via **constraints** (uniqueness + existence) and **indexes**. All constraints use Neo4j 5.x `IF NOT EXISTS` syntax. Migration scripts must be idempotent.
### 6.2 Stage 1 Constraints and Node Labels
**Constraints:**

```
device_netbox_id       UNIQUE on :Device(netbox_id)
zone_id                UNIQUE on :Zone(zone_id)
conduit_id             UNIQUE on :Conduit(conduit_id)
site_slug              UNIQUE on :Site(slug)
vrf_name               UNIQUE on :VRF(name)
ipaddress_cidr         UNIQUE on :IPAddress(address)
prefix_cidr            UNIQUE on :Prefix(cidr)
```

**Full-text search index:** `device_search` on `:Device` properties `name`, `serial`, `asset_tag`, `device_role`, `pid_tag`, `description`.

**`:Device` node** — mirrors `dcim_device` plus all custom fields. Key properties: `netbox_id`, `name`, `status`, `device_type`, `manufacturer`, `device_role`, `platform`, `serial`, `asset_tag`, `site_slug`, `purdue_level`, `iec62443_sl_target`, `iec62443_sl_achieved`, `zone_id`, `protocol`, `firmware_version`, `last_security_assessment`, `dexpi_equipment_id`, `pid_tag`, `primary_ip`, `last_synced_at`.

**`:Zone` node** — represents an IEC 62443 zone. Key properties: `zone_id` (stable business key), `name`, `site_slug`, `sl_target`, `sl_achieved`, `purdue_level_min`, `purdue_level_max`, `device_count`, `open_threat_count`, `high_rpn_device_count`, `last_synced_at`.

**`:Conduit` node** — represents an IEC 62443 conduit (communication path between zones). Key properties: `conduit_id`, `name`, `site_slug`, `source_zone_id`, `target_zone_id`, `protocols`, `encrypted`, `authenticated`, `firewall_present`, `sl_target`.

**`:Site`, `:VRF`, `:IPAddress`, `:Interface`, `:Prefix`** — mirror corresponding NetBox DCIM/IPAM records with their natural keys as unique constraints.

**Stage 1 Relationships:**

| Relationship | From | To | Properties |
|---|---|---|---|
| `LOCATED_AT` | `:Device` | `:Site` | — |
| `MEMBER_OF` | `:Device` | `:Zone` | `purdue_level` |
| `COMMUNICATES_VIA` | `:Zone` | `:Zone` | `conduit_id`, `protocols` |
| `HAS_INTERFACE` | `:Device` | `:Interface` | — |
| `HAS_ADDRESS` | `:Interface` | `:IPAddress` | — |
| `PRIMARY_IP` | `:Device` | `:IPAddress` | — |
| `IN_VRF` | `:IPAddress` | `:VRF` | — |
| `CONNECTED_TO` | `:Device` | `:Device` | `interface_a`, `interface_b`, `cable_type` |
### 6.3 Stage 3 Node Labels
Stage 3 is applied before Stage 2 in both PostgreSQL and Neo4j.

**`:ThreatModel`** — lightweight header node. Full JSON in PostgreSQL. Properties: `pg_id`, `name`, `plant_unit`, `site_slug`, `status`, `total_threats`, `open_threats`, `created_by`, `last_synced_at`.

**`:ThreatComponent`** — one per component in the Threat Dragon DFD. Properties: `td_id` (cell.id from TD JSON), `pg_threat_model_id`, `name`, `component_type` (tm.Process / tm.Store / tm.Actor), `out_of_scope`, `is_encrypted`, `is_public_facing`, `threat_count`, `open_threat_count`, `max_stride_score`, `stride_flags (list)`, `netbox_device_id`, `site_slug`, `plant_unit`, `last_synced_at`.[^23][^13]

**`:DataFlow`** — one per flow arrow between components. Properties: `td_id`, `pg_threat_model_id`, `name`, `is_bidirectional`, `is_encrypted`, `protocol`, `crosses_trust_boundary`, `threat_count`, `open_threat_count`.

**`:TrustBoundary`** — one per trust boundary box. Properties: `td_id`, `pg_threat_model_id`, `name`, `description`, `linked_zone_id` (FK → `:Zone.zone_id`).

**Stage 3 Relationships:**

| Relationship | From | To | Notes |
|---|---|---|---|
| `PART_OF_MODEL` | `:ThreatComponent` | `:ThreatModel` | — |
| `PART_OF_MODEL` | `:TrustBoundary` | `:ThreatModel` | — |
| `SENDS_DATA` | `:ThreatComponent` | `:ThreatComponent` | via `:DataFlow` id, `protocol` |
| `REPRESENTS` | `:ThreatComponent` | `:Device` | Critical bridge: threat ↔ inventory |
| `INSIDE_BOUNDARY` | `:ThreatComponent` | `:TrustBoundary` | — |
| `ALIGNS_TO_ZONE` | `:TrustBoundary` | `:Zone` | IEC 62443 zone alignment |
### 6.4 Stage 2 Node Labels
**`:PIDEquipment`** — tagged plant item from DEXPI P&ID. Properties: `dexpi_id` (from Proteus XML), `tag` (ISA-5.1 TagName), `tag_prefix`, `tag_number`, `equipment_class` (DEXPI 1.3 class name — e.g. PumpCentrifugal, Vessel, HeatExchanger, ControlValve, ActuatingSystem), `dexpi_class_package` (Equipment / Piping / Instrumentation), `plant_unit`, `site_slug`, `process_function`, `fluid`, `operating_pressure_barg`, `operating_temp_degc`, `design_pressure_barg`, `design_temp_degc`, `netbox_device_id`, `source_file`, `dexpi_version`.[^25][^9][^26]

Valid `equipment_class` values from DEXPI 1.3/1.4 specification:[^26]
- *Equipment package:* PumpCentrifugal, PumpReciprocating, Vessel, PressureVessel, StorageTank, HeatExchanger, ShellAndTubeHeatExchanger, Compressor, Column, Reactor, Separator, Cyclone, Filter, Agitator, Mixer, Furnace
- *Instrumentation package:* ProcessInstrumentationFunction, ControllerFunction, TransmitterFunction, IndicatorFunction
- *Actuating package:* ActuatingSystem, ControlValve, OnOffValve, ManualValve, CheckValve, ReliefValve, SafetyValve, RuptureDisc
- *Piping package:* PipingNetworkSegment, PipeConnector, Reducer, Tee

**`:Instrument`** — ISA-5.1 instrument tag. Properties: `ins_id`, `tag`, `tag_prefix` (F=Flow, P=Pressure, T=Temperature, L=Level, A=Analysis, Z=Position, S=Speed), `function_type`, `measured_variable`, `instrument_action`, `plant_unit`, `site_slug`, `netbox_device_id`.

**`:PipingSegment`** — pipe run between two equipment items. Properties: `segment_id`, `tag` (pipe tag per plant standard), `nominal_diameter_mm`, `pipe_class`, `fluid`, `source_equipment_tag`, `target_equipment_tag`.

**`:HAZOPDeviation`** — one per guide_word × parameter × HAZOP node. Properties: `deviation_id`, `guide_word` (No / More / Less / Reverse / Other Than / Part Of / As Well As / Early / Late), `parameter` (Flow / Pressure / Temperature / Level / Composition / Signal / Reaction), `deviation_text`, `consequence`, `safeguards (list)`, `severity (1–4)`, `likelihood (1–4)`, `risk_rank` (severity × likelihood, max 16), `iec62443_relevance (boolean)`, `cyber_vector`, `plant_unit`, `status`, `action_required`, `action_owner`, `pg_cil_id`.

**`:FailureMode`** — lightweight proxy node for FMEA records. Properties: `fm_id`, `failure_mode`, `failure_effect`, `severity`, `occurrence`, `detection`, `rpn`, `source`, `pg_fmea_record_id`, `pg_worksheet_id`.

**`:FaultTree`** — header node for pfta fault tree analysis. Properties: `ft_id`, `name`, `top_event_name`, `plant_unit`, `cut_set_count`, `single_point_failures`, `top_event_probability`, `pg_ft_id`, `last_run_at`.

**`:CutSet`** — one per minimal cut set. Properties: `cutset_id` (hyphen-joined sorted event names — stable key), `events (list)`, `order` (number of events; 1 = single point of failure), `probability`, `criticality` (Single / Double / Triple / Multiple), `ft_id`.

**`:WeibullModel`** — lightweight proxy for reliability results. Properties: `model_id`, `alpha` (scale, hours), `beta` (shape), `mttf` (Mean Time To Failure, hours), `b10_life`, `failure_pattern`, `pg_model_id`, `fitted_at`.

**Stage 2 Relationships:**

| Relationship | From | To | Key Properties |
|---|---|---|---|
| `LOCATED_AT` | `:PIDEquipment` | `:Site` | — |
| `CONNECTED_TO` | `:PIDEquipment` | `:PIDEquipment` | `segment_id`, `fluid`, `direction` |
| `MEASURES_OR_CONTROLS` | `:Instrument` | `:PIDEquipment` | `loop` |
| `CONTROLS` | `:Device` | `:PIDEquipment` | Critical OT↔Process bridge |
| `HAS_DEVIATION` | `:PIDEquipment` | `:HAZOPDeviation` | — |
| `CAN_TRIGGER` | `:Device` | `:HAZOPDeviation` | Only where `iec62443_relevance = true` |
| `HAS_FAILURE_MODE` | `:Device` | `:FailureMode` | — |
| `IS_BASIC_EVENT_IN` | `:Device` | `:CutSet` | — |
| `CONTRIBUTES_TO_TOP_EVENT` | `:CutSet` | `:FaultTree` | — |
| `ANALYZES` | `:FaultTree` | `:Device` | — |
| `HAS_RELIABILITY_MODEL` | `:Device` | `:WeibullModel` | — |
| `CAN_CAUSE_DEVIATION` | `:ThreatComponent` | `:HAZOPDeviation` | `confidence`, `description` |
| `CAN_TRIGGER_FAILURE` | `:ThreatComponent` | `:FailureMode` | — |
### 6.5 Stage 4 Node Labels
**`:BowTie`** — pivot node connecting FaultTree (left) to EventTree (right). Properties: `bt_id`, `name`, `pivot_event_name`, `plant_unit`, `n_safeguards`, `n_consequences`, `pg_bt_id`, `pg_ft_id`, `td_component_id`.

**`:ConsequenceBranch`** — one right-side outcome path. Properties: `branch_id`, `outcome_name`, `severity (1–5)`, `severity_label`, `outcome_probability`, `safeguards (list)`, `tolerable (boolean)`, `pg_branch_id`, `bt_id`.

**`:DistributionReliability`** — RELSAD Monte Carlo result per zone. Properties: `model_id`, `saidi`, `saifi`, `caidi`, `ens`, `asai`, `include_bess`, `bess_capacity_mwh`, `n_iterations`, `pg_model_id`, `simulated_at`.

**Stage 4 Relationships:**

| Relationship | From | To | Notes |
|---|---|---|---|
| `IS_LEFT_SIDE_OF` | `:FaultTree` | `:BowTie` | FaultTree provides threat causes |
| `HAS_CONSEQUENCE` | `:BowTie` | `:ConsequenceBranch` | Event tree right side |
| `PIVOT_IS` | `:BowTie` | `:ThreatComponent` | Top event = threat scenario |
| `HAS_RELIABILITY_MODEL` | `:Zone` | `:DistributionReliability` | Zone-level RELSAD result |
### 6.6 Runtime Risk Score Query
The composite runtime risk score is computed in a single Cypher pass and written back to `:Device.runtime_risk_score`. Weights: HAZOP 25%, FTA 25%, FMEA 20%, Reliability 15%, Threat 15%.

```cypher
MATCH (d:Device) WHERE d.status = 'active'
OPTIONAL MATCH (d)-[:CONTROLS]->(e:PIDEquipment)-[:HAS_DEVIATION]->(h:HAZOPDeviation)
WITH d, max(coalesce(h.risk_rank, 0)) AS max_hazop_rank
OPTIONAL MATCH (d)-[:IS_BASIC_EVENT_IN]->(cs:CutSet)
WITH d, max_hazop_rank, min(coalesce(cs.order, 99)) AS min_cs_order, count(cs) AS cs_count
OPTIONAL MATCH (d)-[:HAS_FAILURE_MODE]->(fm:FailureMode)
WITH d, max_hazop_rank, min_cs_order, cs_count, max(coalesce(fm.rpn, 0)) AS max_rpn
OPTIONAL MATCH (d)-[:HAS_RELIABILITY_MODEL]->(wm:WeibullModel)
WITH d, max_hazop_rank, min_cs_order, cs_count, max_rpn, min(coalesce(wm.mttf, 999999)) AS min_mttf
OPTIONAL MATCH (tc:ThreatComponent)-[:REPRESENTS]->(d)
WITH d, max_hazop_rank, min_cs_order, cs_count, max_rpn, min_mttf, max(coalesce(tc.max_stride_score, 0)) AS max_stride
WITH d,
  toFloat(max_hazop_rank) / 16.0 AS hazop_norm,
  CASE WHEN min_cs_order = 1 THEN 1.0 WHEN min_cs_order = 2 THEN 0.6
       WHEN min_cs_order = 3 THEN 0.3 WHEN cs_count > 0 THEN 0.1 ELSE 0.0 END AS fta_norm,
  toFloat(max_rpn) / 1000.0 AS fmea_norm,
  CASE WHEN min_mttf < 2190 THEN 1.0 WHEN min_mttf < 4380 THEN 0.8
       WHEN min_mttf < 8760 THEN 0.5 WHEN min_mttf < 17520 THEN 0.2 ELSE 0.0 END AS rel_norm,
  toFloat(max_stride) / 10.0 AS threat_norm
WITH d, round((hazop_norm * 0.25) + (fta_norm * 0.25) + (fmea_norm * 0.20)
              + (rel_norm * 0.15) + (threat_norm * 0.15), 4) AS score
SET d.runtime_risk_score = score,
    d.risk_level = CASE WHEN score >= 0.75 THEN 'Critical' WHEN score >= 0.50 THEN 'High'
                        WHEN score >= 0.25 THEN 'Medium' ELSE 'Low' END,
    d.risk_scored_at = timestamp()
RETURN d.name, d.purdue_level, d.zone_id, d.runtime_risk_score, d.risk_level
ORDER BY d.runtime_risk_score DESC LIMIT 50;
```

***
## 7. Implementation Plan
The implementation is structured as ten two-week sprints. Sprints are grouped into four stages corresponding to the schema build order.
### Stage 1: Foundation (Sprints 1–3)
**Sprint 1 — Infrastructure and Inventory**  
Deploy Docker Compose stack (NetBox 4.3, PostgreSQL 16, Neo4j 5.18, Redis 7). Run migration 001 (canvas schema). Execute `init_netbox_custom_fields.py`. Implement pynetbox sync service for `dcim.device`, `dcim.interface`, `ipam.ipaddress`, `ipam.vrf`. Write Stage 1 Neo4j constraints. Implement incremental sync via `canvas.sync_watermarks`. Acceptance: 100 test devices synced from NetBox to Neo4j with all custom fields populated.

**Sprint 2 — Zone/Conduit Canvas**  
Scaffold Vite + React + TypeScript frontend. Integrate `@xyflow/react` v12. Implement custom OT node types (PLC, HMI, RTU, Firewall, Historian, Switch). Build zone container node with Purdue level badge and SL indicator. Implement ELK.js auto-layout hook. Acceptance: Zone/conduit diagram renders from live Neo4j data with drag-and-drop repositioning.

**Sprint 3 — Asset Tagging and Inventory Panel**  
Build right-side inventory panel: device detail, custom field display, edit form (writes back to NetBox via API). Implement `canvas.diagram_nodes` and `canvas.diagram_edges` save/restore. Build SVG icon registry mapped by `device_role` and `equipment_class`. Integrate AggreGate + draw.io industrial SVG shapes. Acceptance: Diagram saves and restores correctly; device icons render per role.[^14][^15][^16]
### Stage 2: Safety Analysis (Sprints 4–6 — after Stage 3 schema is deployed)
**Sprint 4 — Network Topology and P&ID Pipeline**  
Integrate `reagraph` for WebGL network topology view. Integrate `react-cytoscapejs` for NetworkX Cytoscape JSON rendering. Build `scripts/parse_dexpi.py` (AGPL-isolated). Deploy DEXPI ingest API endpoint. Write `:PIDEquipment`, `:Instrument`, `:PipingSegment` sync to Neo4j. Acceptance: A sample Proteus XML file produces correct Neo4j P&ID graph.[^18][^11]

**Sprint 5 — Threat Modelling (Stage 3 schema deploy)**  
Run migration 003. Deploy Stage 3 Neo4j constraints. Build Threat Dragon JSON import endpoint. Implement TD JSON parser → `canvas.threat_records` → Neo4j sync. Build threat model overlay on zone/conduit canvas (STRIDE badge per device). Acceptance: A Threat Dragon v2 model imported; threats surface on canvas.

**Sprint 6 — FMEA and HAZOP (Stage 2 schema deploy)**  
Run migration 004. Deploy Stage 2 Neo4j constraints. Build LLM FMEA generation service (Celery task → local Qwen3 via LiteLLM). Build preHAZOP service (DEXPI graph → HAZOPDeviation nodes). Build `pfta` fault tree API (upload .ft file → run → write cut sets to Neo4j). Acceptance: FMEA auto-generated for 5 test devices; HAZOP deviations created from P&ID graph; fault tree cut sets in Neo4j.[^1]
### Stage 3: Risk Intelligence (Sprints 7–8)
**Sprint 7 — Reliability and Stage 4 (Stage 4 schema deploy)**  
Run migration 005. Deploy Stage 4 Neo4j constraints. Build Weibull fitting service (failure time data → `reliability` library → `safety.weibull_models`). Build RELSAD simulation service. Build Bow-Tie synthesis service. Implement composite runtime risk score Cypher query as Celery beat task. Acceptance: Risk scores computed for all active devices; Bow-Tie renders for a test plant unit.

**Sprint 8 — Critical Items List and Blast Radius**  
Build `safety.critical_items` aggregation pipeline (consolidates HAZOP + FTA + FMEA + Weibull + STRIDE findings). Build blast radius canvas view (Neo4j shortest-path query → ReactFlow subgraph). Build CIL React panel with filter/sort/export. Acceptance: CIL renders with findings from all analysis types; blast radius highlights affected devices.
### Stage 4: Hardening and Integration (Sprints 9–10)
**Sprint 9 — Real-time Sync and Webhooks**  
Implement NetBox webhook receiver (HMAC-verified). Implement Redis pub/sub WebSocket push to React (canvas node badge updates on inventory change). Build incremental Neo4j sync (delta-only from `sync_watermarks`). Build JWT auth (FastAPI → React). Acceptance: Device status change in NetBox reflects on canvas within 5 seconds.

**Sprint 10 — Export, Reporting, and Production Hardening**  
Build PDF/PNG export service (diagram + CIL). Build YAML/JSON export for Neo4j subgraph (interoperability with CYDTT-1 LLM pipeline). Write E2E Playwright tests for all five diagram types. TLS configuration. Docker Compose production hardening (resource limits, healthchecks, restart policies). Acceptance: Full E2E test pass; PDF export of CIL and zone/conduit diagram.[^1]

***
## 8. Docker Compose Stack
The following service definitions are the complete production Docker Compose manifest for the CYDTT-1 DGX SPARK deployment:

```yaml
services:
  netbox:
    image: lscr.io/linuxserver/netbox:4.3
    depends_on: [postgres, redis]
    environment:
      DB_HOST: postgres
      DB_NAME: netbox
      DB_USER: netbox
      DB_PASSWORD: ${POSTGRES_PASSWORD}
      REDIS_HOST: redis
      SECRET_KEY: ${NETBOX_SECRET_KEY}
    ports: ["8080:8080"]

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: netbox
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: netbox
    volumes: [pg_data:/var/lib/postgresql/data]

  neo4j:
    image: neo4j:5.18-community
    environment:
      NEO4J_AUTH: neo4j/${NEO4J_PASSWORD}
      NEO4J_PLUGINS: '["apoc", "graph-data-science"]'
      NEO4J_apoc_export_file_enabled: "true"
      NEO4J_apoc_import_file_enabled: "true"
    ports: ["7474:7474", "7687:7687"]
    volumes: [neo4j_data:/data, neo4j_plugins:/plugins]

  redis:
    image: redis:7-alpine
    volumes: [redis_data:/data]

  api:
    build: ./backend
    depends_on: [postgres, neo4j, redis]
    environment:
      DATABASE_URL: postgresql://netbox:${POSTGRES_PASSWORD}@postgres/netbox
      NEO4J_URI: bolt://neo4j:7687
      NEO4J_PASSWORD: ${NEO4J_PASSWORD}
      REDIS_URL: redis://redis:6379
      NETBOX_URL: http://netbox:8080
      NETBOX_TOKEN: ${NETBOX_TOKEN}
      LITELLM_URL: http://host.docker.internal:4000
    ports: ["8000:8000"]

  celery:
    build: ./backend
    command: celery -A app.celery worker --beat --loglevel=info
    depends_on: [postgres, neo4j, redis]
    environment:
      DATABASE_URL: postgresql://netbox:${POSTGRES_PASSWORD}@postgres/netbox
      NEO4J_URI: bolt://neo4j:7687
      NEO4J_PASSWORD: ${NEO4J_PASSWORD}
      REDIS_URL: redis://redis:6379

  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [api]

volumes:
  pg_data:
  neo4j_data:
  neo4j_plugins:
  redis_data:
```

***
## 9. Migration Execution Order
The following order is mandatory. Deviating from this sequence will produce foreign key violations or missing Neo4j constraint targets.

```
Step 1:  Deploy Docker Compose stack (all services healthy)
Step 2:  python scripts/init_netbox_custom_fields.py
Step 3:  psql -f migrations/001_create_canvas_schema.sql     (canvas schema)
Step 4:  Apply Stage 1 Neo4j constraints (device, zone, conduit, site, IP)
Step 5:  Run initial NetBox → Neo4j full sync
Step 6:  psql -f migrations/003_create_stage3_schema.sql     (threat models)
Step 7:  Apply Stage 3 Neo4j constraints (ThreatComponent, DataFlow, TrustBoundary)
Step 8:  psql -f migrations/004_create_stage2_safety_schema.sql  (safety.*)
Step 9:  Apply Stage 2 Neo4j constraints (PIDEquipment, FailureMode, CutSet, etc.)
Step 10: psql -f migrations/005_create_stage4_schema.sql     (bowtie, risk history)
Step 11: Apply Stage 4 Neo4j constraints (BowTie, ConsequenceBranch)
Step 12: python scripts/parse_dexpi.py --input data/plant.xml --output data/dexpi.json
         (AGPL-isolated — confirm licence compliance before running)
Step 13: POST /api/pid/ingest (reads dexpi.json, writes Neo4j PID graph)
Step 14: Start Celery beat (risk score computation every 24h)
```

***
## 10. Conclusion
OT-DiagramStudio provides a unified, printable-and-interactive platform that eliminates the fragmentation between process engineering (P&IDs), OT cybersecurity (IEC 62443 zone/conduit diagrams, STRIDE threat models), and industrial safety analysis (HAZOP, FMEA, FTA, Weibull). By deploying on the CYDTT-1 DGX SPARK edge node and leveraging the existing local LLM stack for FMEA generation, the platform operates entirely offline — a non-negotiable requirement for the OT environments it serves.[^1]

The single-source-of-truth architecture enforced throughout this specification ensures that as the platform grows, no data domain diverges into parallel representations. NetBox owns inventory. Neo4j owns graph intelligence. PostgreSQL `canvas` and `safety` schemas own application state and safety analysis artefacts. Every Neo4j node that summarises a PostgreSQL record carries an explicit `pg_*_id` foreign key to prevent drift.

The primary open question remains the long-term licensing posture of Neo4j Community Edition (GPL-3.0). Should client deployment terms preclude GPL-3.0 software in the delivery package, the recommended migration path is to Neo4j Enterprise (commercial) or to Apache AGE (PostgreSQL extension providing graph query capability under Apache-2.0) for the graph layer.

***
1. xyflow/xyflow GitHub repository — React Flow v12, MIT licence[^3][^4]
2. KIELER/elkjs GitHub repository — Eclipse Layout Kernel for JavaScript, EPL-2.0[^5][^6]
3. reaviz/reagraph GitHub repository — WebGL graph visualisation for React, Apache-2.0[^18][^19]
4. process-intelligence-research/pyDEXPI — PyPI package page, AGPL-3.0[^17]
5. pyDEXPI v1.2 — LinkedIn announcement (A. Schweidtmann, TU Delft, April 2026)[^8]
6. DEXPI P&ID Specification v1.3 — Reference documentation[^25]
7. DEXPI P&ID Specification v1.4 — PipingNode reference[^27]
8. OPC Foundation DEXPI Information Model overview[^28]
9. pyDEXPI: A Python framework for P&ID — LAPSE 2025 conference paper[^9]
10. OWASP Threat Dragon — project page, Apache-2.0[^12]
11. OWASP Threat Dragon v2.6.2 — Schema documentation[^23]
12. OWASP Threat Dragon — threat usage documentation[^29]
13. AggreGate SCADA/HMI Symbol Library — SVG industrial symbols[^14]
14. Open Automation Software Manufacturing Symbols — 5,000+ industrial symbols[^15]
15. jgraph/drawio — Apache-2.0 diagramming library[^16]
16. plotly/react-cytoscapejs — MIT Cytoscape.js React wrapper[^11]
17. NetworkX — cytoscape_data JSON export[^10]
18. NetBox v4.x — custom_field_data JSONB documentation[^2]
19. CYDTT-1 DGX SPARK Technical Specification — internal document[^1]
20. OT Inventory PostgreSQL Schema — internal migration (April 2026)[^30]

---

## References

1. [create a detailed specicicatoin for the DGX spark - the stack and speciciatoins, and ability to run Qwen 35B, and Qwen 9B and qwen 3 embedding and other models usch as qwen 3.5-27b-calude-opus-sstilled-mlx - and have voice intergrated in a next,js an...

...d reseach on customers and prospects and world events, to manage OT related leads and services - like iec62443, O.C.P safe and Cyber Resilience Act - so an interctiv echant bot is essential, along with a local live tts stt - interacrive voice running](https://www.perplexity.ai/search/39989adb-dd40-4e35-913f-c57dfb50d47a) - The full CYDTT-1 specification is ready. Since you clarified hot-loading of models, that became a fi...

2. [Custom Fields | NetBox Documentation](https://netboxlabs.com/docs/netbox/customization/custom-fields/) - You can create a custom field to hold this data. Within the database, custom fields are stored as JS...

3. [React Flow 12 release - xyflow](https://xyflow.com/blog/react-flow-12-release) - A new React Flow major release version 12 with server side rendering, computing flows, dark mode, be...

4. [React Flow: Node-Based UIs in React](https://reactflow.dev) - Wire your ideas with React Flow. A customizable React component for building node-based editors and ...

5. [kieler/elkjs: ELK's layout algorithms for JavaScript - GitHub](https://github.com/kieler/elkjs) - The Eclipse Layout Kernel (ELK) implements an infrastructure to connect diagram editors or viewers t...

6. [Elkjs Tree - React Flow](https://reactflow.dev/examples/layout/elkjs) - This example shows how you can integrate elkjs with React Flow for more advanced tree layouts. The c...

7. [pyDEXPI - An open-source tool in Python that implements the DEXPI ...](https://www.pi-research.org/software/pydexpi/) - Load Proteus .xml files to a pyDEXPI instance. pyDEXPI toolkit to analyze and manipulate pyDEXPI mod...

8. [GitHub | Artur Schweidtmann | 10 comments - LinkedIn](https://www.linkedin.com/posts/schweidtmann_github-process-intelligence-researchpydexpi-activity-7450902508907945986-83MD) - I'm thinking of using pyDEXPI to parse P&IDs into structured graph/data, then letting an LLM query t...

9. [[PDF] pyDEXPI: A Python framework for piping and instrumentation ...](https://psecommunity.org/wp-content/plugins/wpor/includes/file/2506/LAPSE-2025.0371-1v1.pdf) - The DEXPI data model defines a set of data classes and their relation- ships. DEXPI P&IDs are exchan...

10. [cytoscape_data — NetworkX 3.6.1 documentation](https://networkx.org/documentation/stable/reference/readwrite/generated/networkx.readwrite.json_graph.cytoscape_data.html) - Returns data in Cytoscape JSON format (cyjs). Parameters: GNetworkX Graph. The graph to convert to c...

11. [plotly/react-cytoscapejs: React component for Cytoscape.js ... - GitHub](https://github.com/plotly/react-cytoscapejs) - The react-cytoscapejs package is an MIT-licensed React component for network (or graph, as in graph ...

12. [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/) - Threat Dragon follows the values and principles of the threat modeling manifesto. It can be used to ...

13. [AI-Powered Threat Modelling with OWASP Threat Dragon – Part 2](https://infosecotb.com/ai-powered-threat-modeling-with-owasp-threat-dragon-part-2-generating-threats-with-artificial-intelligence/) - First, make a Data Flow Diagram (DFD) in OWASP Threat Dragon. ... threats correctly inside the JSON ...

14. [AggreGate SCADA/HMI Symbol Library](https://aggregate.digital/products/scada-hmi/symbol-library.html) - AggreGate SCADA/HMI distribution includes a large automation and control symbol library. The symbols...

15. [Free Manufacturing Symbols - Open Automation Software](https://openautomationsoftware.com/downloads/manufacturing-symbols/) - Over 600 conveyor symbols that can be used to create graphical user interface applications for produ...

16. [draw.io project - Libre Self-hosted](https://libreselfhosted.com/project/drawio/) - draw.io is a diagramming or whiteboarding application, depending on which theme is selected. It is n...

17. [pyDEXPI - PyPI](https://pypi.org/project/pyDEXPI/) - Package containing the DEXPI data model in Python and a parser to load Proteus .xml data to the data...

18. [GitHub - reaviz/reagraph: WebGL Graph Visualizations for React ...](https://github.com/reaviz/reagraph) - Reagraph is a high-performance network graph ... Reaflow - Open-source library for workflow and diag...

19. [Reagraph - a high-performance network graph visualization built in ...](https://reagraph.dev) - Reagraph is a high-performance network graph visualization built in WebGL for React with 2D & 3D sup...

20. [X6: Graph Editing and Visualization Engine - GitHub](https://github.com/antvis/x6) - AntV X6 is a graph editing engine based on HTML and SVG, providing low-cost customization capabiliti...

21. [NetBox Docker Deployment – Local & Dev-Ready Setup in 2025](https://netodata.io/netbox-docker-deployment-local-dev-ready-setup-in-2025/) - Whether you're setting up a local instance or preparing for production, a netbox docker deployment g...

22. [Top Open Source Licenses and Legal Risk | Black Duck Blog](https://www.blackduck.com/blog/top-open-source-licenses.html) - Explore top open source licenses and understand their legal risks. A comprehensive guide for develop...

23. [Schema | Threat Dragon version 2.6.2 Documentation](https://www.threatdragon.com/docs/development/schema.html) - Version 2 Threat Dragon schema; Threat Model Bill of Materials (TM-BOM) schema; Open Threat Model sc...

24. [Threat model diagrams - Threat Dragon](https://threatdragon.github.io/threat-model-diagrams/) - In a future version of Threat Dragon, these properties will be used by the threat generation engine ...

25. [DexpiModel — DEXPI P&ID Specification Version 1.3](https://dexpi.plants-and-bytes.de/reference/DexpiModel/DexpiModel.html) - The class is implemented using the Proteus root element <PlantModel> , i.e., a DexpiModel correspond...

26. [[PDF] DEXPI P&ID Specification](https://dexpi.org/wp-content/uploads/2020/09/DEXPI-PID-Specification-1.3.pdf) - Under the following terms: • Attribution – You must give appropriate credit, provide a link to the l...

27. [PipingNode - DEXPI P&ID Specification 1.4](https://dexpi.org/static/pid_specification_1.4/reference/Piping/PipingNode.html) - Implementation in Proteus Schema. The class is implemented using the Proteus element <Node> . The va...

28. [DEXPI P&ID - 7 DEXPI Information Model overview](https://reference.opcfoundation.org/DEXPI/v100/docs/7) - Among other aspects the Proteus schema contains the graphical concept. Proteus is one implementation...

29. [Threat Dragon version 2.6.2 Documentation](https://www.threatdragon.com/docs/usage/threats.html) - The threat model can have different types of threats added to it according to the diagram type. Curr...

30. [https://www.perplexity.ai/search/fbd65084-2100-4106-afe6-97a1ad670702](https://www.perplexity.ai/search/fbd65084-2100-4106-afe6-97a1ad670702) - The full migration is attached — 1,711 lines across the ot_inventory schema namespace. Here's a stru...

