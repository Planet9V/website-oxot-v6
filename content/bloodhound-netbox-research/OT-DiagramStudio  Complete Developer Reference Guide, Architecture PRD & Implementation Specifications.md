# OT-DiagramStudio: Complete Developer Reference Guide, Architecture PRD & Implementation Specifications
**Classification:** Internal Development Reference — Restricted to Engineering Team  
**Version:** 1.0  
**Date:** May 2026  
**Audience:** Full-Stack Engineers, OT Security Architects, DevOps  
**Project Sponsor:** Jim McKenney, OT Security Architect  

***
## Table of Contents
1. [Executive Overview & Product Vision](#1-executive-overview--product-vision)
2. [Prerequisites & Environment Requirements](#2-prerequisites--environment-requirements)
3. [System Architecture & Data Flow](#3-system-architecture--data-flow)
4. [Product Requirements Document (PRD)](#4-product-requirements-document-prd)
5. [Technology Stack — Full Reference](#5-technology-stack--full-reference)
6. [Data Model Specifications](#6-data-model-specifications)
7. [Backend Implementation — FastAPI](#7-backend-implementation--fastapi)
8. [NetBox Integration — Full Guide](#8-netbox-integration--full-guide)
9. [Neo4j Graph Layer — Schema, Queries & Sync](#9-neo4j-graph-layer--schema-queries--sync)
10. [pyDEXPI → NetworkX → Neo4j Pipeline](#10-pydexpi--networkx--neo4j-pipeline)
11. [React Frontend — Vite + TypeScript Setup](#11-react-frontend--vite--typescript-setup)
12. [ReactFlow Canvas Implementation](#12-reactflow-canvas-implementation)
13. [Threat Modeling Integration (OWASP Threat Dragon)](#13-threat-modeling-integration-owasp-threat-dragon)
14. [Auto-Routing with ELK.js](#14-auto-routing-with-elkjs)
15. [Network Topology View (reagraph)](#15-network-topology-view-reagraph)
16. [Asset Management Sidebar & Inventory Tags](#16-asset-management-sidebar--inventory-tags)
17. [Industrial Icon & Symbol Libraries](#17-industrial-icon--symbol-libraries)
18. [WebSocket Real-Time Sync](#18-websocket-real-time-sync)
19. [Docker Compose — Full Stack Deployment](#19-docker-compose--full-stack-deployment)
20. [Implementation Plan & Sprint Schedule](#20-implementation-plan--sprint-schedule)
21. [Testing Strategy](#21-testing-strategy)
22. [Security & Access Control](#22-security--access-control)
23. [License Risk Summary (ICE)](#23-license-risk-summary-ice)
24. [Reference Index](#24-reference-index)

***
## 1. Executive Overview & Product Vision
### 1.1 Purpose
OT-DiagramStudio is an internally hosted, browser-based interactive diagramming and asset intelligence platform for Operational Technology (OT) and Industrial Control System (ICS) environments. It provides engineers and security architects with a unified canvas to create, maintain, and analyze:

- **P&ID (Piping & Instrumentation Diagrams)** sourced from DEXPI-compliant Proteus XML[^1][^2]
- **IEC 62443 Zone/Conduit topology diagrams** with Purdue Model layering
- **OT Network topology maps** rendered from live NetBox asset inventory[^3]
- **STRIDE-based threat model diagrams** with automated threat generation[^4]
- **Blast radius and lateral movement visualizations** powered by Neo4j graph traversal[^5]
### 1.2 Business Drivers
- OT clients require visual documentation of IEC 62443-3-2 zone/conduit architectures aligned to their physical inventory
- Manual Visio-based diagrams drift out of sync with actual deployed assets within weeks of creation
- Threat modeling exercises require P&ID context to correctly model attack paths through process equipment
- pyDEXPI v1.2 (2025) now natively exports DEXPI P&IDs as NetworkX graphs, enabling programmatic diagram construction[^6]
- NetBox has become the de facto OT/IT network source-of-truth for asset inventory[^7]
### 1.3 Key Design Principles
- **Source of Truth Hierarchy:** NetBox (PostgreSQL) → authoritative asset inventory; Neo4j → relationship and path intelligence; pyDEXPI → process engineering context
- **Low ICE Risk:** All primary libraries are MIT or Apache-2.0 licensed; no GPL contamination in the SPA layer
- **Polyglot Persistence:** Each database does what it does best — relational constraints in PostgreSQL, graph traversal in Neo4j, ephemeral state in Redis
- **Offline-First Architecture:** All computation happens in-house; no data leaves the network perimeter
- **Immutable Audit Log:** Every diagram change is versioned and attributed to a user identity

***
## 2. Prerequisites & Environment Requirements
### 2.1 Developer Workstation Requirements
| Component | Minimum | Recommended |
|---|---|---|
| OS | Ubuntu 22.04 LTS / macOS 14+ | Ubuntu 24.04 LTS |
| RAM | 16 GB | 32 GB |
| CPU | 4 cores | 8+ cores |
| Disk | 40 GB free SSD | 100 GB NVMe |
| Docker Desktop | 4.x | 4.30+ |
| Node.js | 20 LTS | 22 LTS |
| Python | 3.11 | 3.12 |
| Git | 2.x | 2.x |
### 2.2 Required Software — Install Before Starting
```bash
# Node.js via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 22
nvm use 22

# pnpm (preferred package manager for this project)
corepack enable
corepack prepare pnpm@latest --activate

# Python 3.12 with uv (fast dependency resolver)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Docker + Compose V2
# Follow https://docs.docker.com/engine/install/ubuntu/
docker --version   # must be >= 24.x
docker compose version  # must be >= 2.x

# Verify PostgreSQL client tools (for migration scripts)
psql --version  # >= 14

# Neo4j CLI (optional but useful)
# Download from https://neo4j.com/download-center/
```
### 2.3 Required External Accounts & Credentials (Development)
- **NetBox API Token:** Generate from NetBox Admin → Users → API Tokens
- **Neo4j Credentials:** Set via `docker-compose.yml` environment variables
- **Git Repository Access:** SSH keys provisioned for team members
- **No external SaaS dependencies** — all services are self-hosted[^8]
### 2.4 Python Package Prerequisites
```bash
# Backend virtual environment (uv is ~100x faster than pip)
uv venv .venv
source .venv/bin/activate

uv pip install \
  fastapi==0.115.x \
  uvicorn[standard]==0.30.x \
  pynetbox==7.x \
  pydexpi==1.2.x \
  networkx==3.x \
  neo4j==5.x \
  neomodel==5.x \
  pydantic==2.x \
  python-jose[cryptography] \
  passlib[bcrypt] \
  redis==5.x \
  celery==5.x \
  websockets \
  httpx \
  pytest \
  pytest-asyncio
```
### 2.5 Node Package Prerequisites
```bash
pnpm add \
  @xyflow/react \
  @xyflow/system \
  zustand \
  elkjs \
  web-worker \
  reagraph \
  @antv/g6 \
  cytoscape \
  react-cytoscapejs \
  axios \
  @tanstack/react-query \
  react-router-dom \
  tailwindcss \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  lucide-react \
  immer \
  d3-hierarchy \
  dagre

pnpm add -D \
  typescript \
  @types/react \
  @types/react-dom \
  @types/cytoscape \
  vite \
  @vitejs/plugin-react \
  vitest \
  @testing-library/react \
  eslint \
  prettier \
  tailwindcss \
  autoprefixer \
  postcss
```

***
## 3. System Architecture & Data Flow
### 3.1 High-Level Architecture Diagram
```
┌────────────────────────────────────────────────────────────────────────┐
│                         BROWSER (Vite + React SPA)                      │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  P&ID Canvas │  │  Topology    │  │  Threat Model│  │  Asset     │ │
│  │  (ReactFlow) │  │  (reagraph)  │  │  (ReactFlow) │  │  Sidebar   │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘ │
│         └─────────────────┴──────────────────┴────────────────┘        │
│                              Zustand Store + TanStack Query              │
│                         HTTP REST + WebSocket (WS)                       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                        FastAPI Middleware Layer                          │
│                    (Python 3.12 · Uvicorn · Async)                      │
│                                                                          │
│  /api/topology   /api/pid   /api/assets   /api/threats                 │
│  /api/blast-radius  /api/diagram/save  /ws/updates                      │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│  │  pynetbox    │  │  pyDEXPI     │  │  Threat      │                 │
│  │  (NetBox API)│  │  (DEXPI/NX)  │  │  Dragon JSON │                 │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                 │
└─────────┼─────────────────┼─────────────────┼───────────────────────── ┘
          │                 │                 │
┌─────────▼──────┐  ┌───────▼──────────────── ▼────────────────────────┐
│  NetBox v4.3   │  │              Neo4j 5.x (Bolt)                     │
│  (Django/Gunic)│  │  APOC + Graph Data Science Library                │
│  Port :8000    │  │  Port :7474 (HTTP) / :7687 (Bolt)                 │
│      │         │  │                                                    │
│  PostgreSQL 16 │  │  (:Device) (:Zone) (:Conduit)                     │
│  Port :5432    │  │  (:PIDEquipment) (:ThreatComponent)               │
│                │  │  (:Vulnerability)                                  │
│  Redis 7       │  │                                                    │
│  Port :6379    │  └──────────────────────────────────────────────────┘
└────────────────┘
       ▲
       │ Webhooks (HTTP POST)
       │ on device/interface change
       └─────────────────────────── NetBox Event Rules → FastAPI /hooks
```
### 3.2 Data Flow — Asset Onboarding
```
1. Engineer imports Proteus XML (DEXPI P&ID) into system
2. pyDEXPI parses XML → NetworkX DiGraph (equipment nodes + piping edges)
3. FastAPI /ingest/pid endpoint receives graph → writes to Neo4j as PIDEquipment nodes
4. Matching routine links PIDEquipment.tag → NetBox Device.name (exact + fuzzy match)
5. NetBox custom fields (iec62443_sl, purdue_level, asset_tag) sync to Neo4j Device nodes
6. Diagram layout state persisted to PostgreSQL (separate canvas_layouts schema)
7. React frontend polls /api/pid/{unit_id} → ReactFlow renders P&ID canvas
8. User drags NetBox devices from sidebar → drops onto topology canvas
9. ELK.js auto-routes edges based on zone/conduit relationships from Neo4j
10. Changes POST to /api/diagram/save → PostgreSQL canvas_layouts table
```
### 3.3 Data Flow — Real-Time Sync
```
NetBox GUI/API change (device create/update/delete)
  → NetBox Event Rule fires
  → HTTP POST to FastAPI /hooks/netbox/device
  → FastAPI handler MERGE node in Neo4j
  → FastAPI publishes change event to Redis pub/sub channel "topology_updates"
  → WebSocket connection manager broadcasts to all subscribed React clients
  → React Zustand store receives update → ReactFlow nodes re-render
```

***
## 4. Product Requirements Document (PRD)
### 4.1 Product Goals
| Goal | Metric | Priority |
|---|---|---|
| Unified OT asset canvas | Single view linking NetBox, DEXPI, and threat model data | P0 |
| Real-time sync with NetBox | < 2 second lag on device changes | P0 |
| P&ID rendering from DEXPI | Parse and render Proteus XML without manual redrawing | P0 |
| Auto-routing of network edges | ELK.js hierarchical layout with one click | P1 |
| Threat model integration | STRIDE threat components on same canvas as network nodes | P1 |
| IEC 62443 zone/conduit visualization | Purdue model layers visually distinguished | P1 |
| Blast radius analysis | Highlight reachable nodes from selected compromised device | P1 |
| Asset inventory sidebar | Drag-and-drop from NetBox device list to canvas | P1 |
| Diagram persistence | Save/load diagram state with user attribution | P1 |
| Industrial icon library | 500+ SVG icons for OT device types | P2 |
### 4.2 User Stories
**As a security architect:**
- I can import a DEXPI P&ID XML file and see it rendered as an interactive diagram within 30 seconds, with all instruments and equipment tagged to their NetBox counterparts
- I can click any device node and see its IEC 62443 SL target, Purdue level, CVE exposure, and STRIDE threat classification in a side panel
- I can run a blast radius analysis from a selected device and see lateral movement paths highlighted in the canvas
- I can drag the boundary of an IEC 62443 zone visually and the system warns me of SL mismatches

**As a network engineer:**
- I can drag devices from the NetBox inventory sidebar onto the topology canvas and auto-route their connections
- I can switch between P&ID view, network topology view, and threat model view without losing diagram context
- Changes I make in NetBox appear in the canvas within 2 seconds via WebSocket

**As a developer:**
- All diagram data is accessible via REST API and GraphQL
- The system runs entirely within Docker Compose with a single `docker compose up` command
- TypeScript types cover all node and edge data structures
### 4.3 Non-Functional Requirements
| Category | Requirement |
|---|---|
| Performance | Canvas renders up to 1,000 nodes at 60fps using WebGL (reagraph) |
| Availability | 99.5% uptime target in production; health-check endpoint at /health |
| Security | All endpoints require JWT authentication; no anonymous access to diagram data |
| Data residency | All data stored on-premises; zero external API calls in production |
| Browser support | Chrome 120+, Firefox 121+, Edge 120+ |
| Audit | All diagram save operations logged with timestamp + user ID |
| Scalability | Neo4j Community supports up to ~34B nodes; adequate for all known OT topologies |
### 4.4 Out of Scope (v1.0)
- Mobile responsive design (canvas tools require desktop viewport)
- Multi-user real-time collaborative editing (reserved for v2.0)
- Integration with Claroty/Nozomi/Dragos asset discovery platforms (roadmap item)
- Automated CVE-to-Neo4j ingestion (requires separate NVD sync service)
- Digital twin simulation capabilities (reserved for v3.0)

***
## 5. Technology Stack — Full Reference
### 5.1 Backend
| Component | Package | Version | License | Role |
|---|---|---|---|---|
| API Framework | FastAPI | 0.115.x | MIT | REST + WebSocket API[^9] |
| ASGI Server | Uvicorn | 0.30.x | BSD | Production ASGI server |
| OT Inventory | pynetbox | 7.x | Apache-2.0 | NetBox API client[^10] |
| P&ID Parser | pyDEXPI | 1.2.x | MIT | DEXPI Proteus XML → NetworkX[^1][^2] |
| Graph Library | NetworkX | 3.x | BSD | Graph computation, Cytoscape export[^11] |
| Graph DB Client | neo4j-python-driver | 5.x | Apache-2.0 | Neo4j Bolt driver |
| Graph ORM | neomodel | 5.x | MIT | ORM-style Neo4j models[^12] |
| Data Validation | Pydantic v2 | 2.x | MIT | Request/response models |
| Task Queue | Celery | 5.x | BSD | Async NetBox sync jobs |
| Cache/Pub-Sub | Redis | 7 | BSD | WebSocket broadcast, session cache |
| ORM (layouts DB) | SQLAlchemy | 2.x | MIT | Diagram layout persistence in PostgreSQL |
| Auth | python-jose | 3.x | MIT | JWT token generation and validation |
### 5.2 Frontend
| Component | Package | Version | License | Role |
|---|---|---|---|---|
| Build Tool | Vite | 5.x | MIT | Ultra-fast dev server + bundler[^13] |
| UI Framework | React | 18.x | MIT | Component framework |
| Language | TypeScript | 5.x | Apache-2.0 | Type safety across the board[^14] |
| Diagram Engine | @xyflow/react (React Flow v12) | 12.x | MIT | P&ID + threat model canvas[^15][^16] |
| Graph Viz | reagraph | 4.x | Apache-2.0 | WebGL network topology[^17] |
| NetworkX Bridge | react-cytoscapejs | 2.x | MIT | Cytoscape.js React wrapper[^18] |
| Auto-Layout | elkjs | 0.9.x | EPL-2.0 | Hierarchical auto-routing[^19][^20] |
| State Mgmt | zustand | 4.x | MIT | Canvas + global app state[^21][^22] |
| Data Fetching | @tanstack/react-query | 5.x | MIT | API caching and sync |
| CSS Framework | Tailwind CSS | 3.x | MIT | Utility-first styling[^23] |
| Routing | react-router-dom | 6.x | MIT | SPA routing |
| Icons | lucide-react | 0.x | ISC | UI chrome icons |
| HTTP Client | axios | 1.x | MIT | REST API calls |
### 5.3 Databases
| Database | Version | License | Role |
|---|---|---|---|
| PostgreSQL | 16 | PostgreSQL | NetBox data store + diagram layouts[^24] |
| Neo4j | 5.x Community | GPL-3.0 (self-hosted) | Graph topology + threat paths[^5] |
| Redis | 7 | BSD | Task queue, WebSocket pub/sub, session |

> **Note on Neo4j License:** Neo4j Community Edition is GPL-3.0 but does not impose copyleft obligations on *client* applications communicating over Bolt protocol. The internal use case with no redistribution of the Neo4j binary is fully compliant. If this becomes a commercial product, evaluate Neo4j Enterprise (commercial license) or AuraDB.
### 5.4 Infrastructure
| Component | Technology | Notes |
|---|---|---|
| Container runtime | Docker + Compose V2 | Single-host development and production-lite[^8] |
| Reverse proxy | Nginx or Traefik | SSL termination, routing |
| CI/CD | GitHub Actions | Lint, test, build on PR |
| Secrets | Docker secrets or .env files | Never commit `.env` to git |

***
## 6. Data Model Specifications
### 6.1 NetBox Custom Fields (OT Extensions)
Add these custom fields via NetBox Admin → Customization → Custom Fields, or via the initialization script below:[^25]

```python
# scripts/init_netbox_custom_fields.py
import pynetbox

nb = pynetbox.api(
    "http://localhost:8000",
    token="your_netbox_api_token"
)

custom_fields = [
    {
        "name": "iec62443_sl_target",
        "label": "IEC 62443 SL Target",
        "type": "integer",
        "content_types": ["dcim.device"],
        "ui_visible": "always",
        "group_name": "OT Security",
        "description": "IEC 62443 Security Level Target (1-4)"
    },
    {
        "name": "purdue_level",
        "label": "Purdue Model Level",
        "type": "select",
        "content_types": ["dcim.device"],
        "choices": ["L0", "L1", "L2", "L3", "L3.5", "L4", "L5"],
        "group_name": "OT Security",
        "description": "Purdue Model reference architecture level"
    },
    {
        "name": "dexpi_equipment_id",
        "label": "DEXPI Equipment ID",
        "type": "text",
        "content_types": ["dcim.device"],
        "group_name": "P&ID",
        "description": "Linked DEXPI/Proteus equipment node ID"
    },
    {
        "name": "threat_model_component_id",
        "label": "Threat Dragon Component ID",
        "type": "text",
        "content_types": ["dcim.device"],
        "group_name": "Threat Modeling",
        "description": "Linked OWASP Threat Dragon component UUID"
    },
    {
        "name": "asset_criticality",
        "label": "Asset Criticality",
        "type": "select",
        "content_types": ["dcim.device"],
        "choices": ["Critical", "High", "Medium", "Low"],
        "group_name": "OT Security"
    },
    {
        "name": "ot_zone_id",
        "label": "IEC 62443 Zone ID",
        "type": "text",
        "content_types": ["dcim.device", "dcim.interface"],
        "group_name": "OT Security"
    }
]

for cf in custom_fields:
    try:
        nb.extras.custom_fields.create(cf)
        print(f"Created custom field: {cf['name']}")
    except Exception as e:
        print(f"Field {cf['name']} already exists or error: {e}")
```
### 6.2 PostgreSQL Schema — Diagram Layouts
This is a *separate schema* from NetBox's database — use a separate PostgreSQL database named `otdiagram_layouts`:

```sql
-- migrations/001_create_canvas_schema.sql

CREATE SCHEMA IF NOT EXISTS canvas;

CREATE TABLE canvas.diagrams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    diagram_type VARCHAR(50) NOT NULL CHECK (diagram_type IN ('pid', 'topology', 'threat', 'zone_conduit')),
    plant_unit VARCHAR(100),
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    version INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'
);

CREATE TABLE canvas.diagram_layouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diagram_id UUID REFERENCES canvas.diagrams(id) ON DELETE CASCADE,
    nodes JSONB NOT NULL DEFAULT '[]',
    edges JSONB NOT NULL DEFAULT '[]',
    viewport JSONB DEFAULT '{"x": 0, "y": 0, "zoom": 1}',
    saved_at TIMESTAMPTZ DEFAULT now(),
    saved_by VARCHAR(255) NOT NULL,
    change_summary TEXT
);

-- Index for fast diagram lookups
CREATE INDEX idx_diagram_layouts_diagram_id ON canvas.diagram_layouts(diagram_id);
CREATE INDEX idx_diagrams_plant_unit ON canvas.diagrams(plant_unit);
CREATE INDEX idx_diagrams_type ON canvas.diagrams(diagram_type);

-- Audit log for all diagram mutations
CREATE TABLE canvas.audit_log (
    id BIGSERIAL PRIMARY KEY,
    diagram_id UUID,
    action VARCHAR(50),
    user_id VARCHAR(255),
    timestamp TIMESTAMPTZ DEFAULT now(),
    payload JSONB,
    ip_address INET
);
```
### 6.3 Neo4j Node & Relationship Schema
```cypher
// ============================================================
// NODE DEFINITIONS
// ============================================================

// OT Device (sourced from NetBox)
CREATE CONSTRAINT device_netbox_id IF NOT EXISTS
FOR (d:Device) REQUIRE d.netbox_id IS UNIQUE;

// IEC 62443 Zone
CREATE CONSTRAINT zone_name IF NOT EXISTS
FOR (z:Zone) REQUIRE z.zone_id IS UNIQUE;

// Conduit (communication path between zones)
CREATE CONSTRAINT conduit_id IF NOT EXISTS
FOR (c:Conduit) REQUIRE c.conduit_id IS UNIQUE;

// P&ID Equipment (sourced from pyDEXPI / DEXPI Proteus XML)
CREATE CONSTRAINT pid_equipment_id IF NOT EXISTS
FOR (e:PIDEquipment) REQUIRE e.dexpi_id IS UNIQUE;

// Threat Dragon component
CREATE CONSTRAINT threat_component_id IF NOT EXISTS
FOR (t:ThreatComponent) REQUIRE t.td_id IS UNIQUE;

// CVE/Vulnerability
CREATE CONSTRAINT vuln_cve_id IF NOT EXISTS
FOR (v:Vulnerability) REQUIRE v.cve_id IS UNIQUE;

// ============================================================
// RELATIONSHIP TYPES
// ============================================================
// (Device)-[:MEMBER_OF]->(Zone)
// (Zone)-[:CONNECTED_VIA]->(Conduit)-[:CONNECTS_TO]->(Zone)
// (Device)-[:HAS_INTERFACE]->(Interface)-[:CARRIES]->(Conduit)
// (Device)-[:MODELED_AS]->(ThreatComponent)
// (Device)-[:AFFECTED_BY]->(Vulnerability)
// (PIDEquipment)-[:CONTROLS]->(Device)
// (PIDEquipment)-[:CONNECTED_TO {line_number}]->(PIDEquipment)
// (PIDEquipment)-[:INSTRUMENTED_BY]->(PIDEquipment) [instrument loops]
// (Device)-[:LINKED_TO_PID]->(PIDEquipment)
```
### 6.4 TypeScript Type Definitions
```typescript
// src/types/ot-types.ts

export type PurdueLevel = 'L0' | 'L1' | 'L2' | 'L3' | 'L3.5' | 'L4' | 'L5';
export type SLLevel = 1 | 2 | 3 | 4;
export type Criticality = 'Critical' | 'High' | 'Medium' | 'Low';
export type DiagramType = 'pid' | 'topology' | 'threat' | 'zone_conduit';
export type StrideFlag = 'Spoofing' | 'Tampering' | 'Repudiation' | 'InformationDisclosure' | 'DenialOfService' | 'ElevationOfPrivilege';

export interface OTDeviceData {
  netboxId: string;
  name: string;
  deviceType: string;
  manufacturer: string;
  site: string;
  rack?: string;
  ipAddress?: string;
  purdueLevel: PurdueLevel;
  iec62443SlTarget: SLLevel;
  zoneId?: string;
  dexpiEquipmentId?: string;
  threatModelComponentId?: string;
  criticality: Criticality;
  assetTag?: string;
  icon?: string;
  vulnerabilities?: string[]; // CVE IDs
}

export interface ZoneData {
  zoneId: string;
  name: string;
  slTarget: SLLevel;
  purdueBand: string; // 'L0-L1' | 'L2' | 'L3' | 'L4-L5'
  color: string;
  deviceCount: number;
}

export interface ConduitData {
  conduitId: string;
  name: string;
  protocol: string;
  encrypted: boolean;
  bandwidth?: string;
  sourceZoneId: string;
  targetZoneId: string;
}

export interface PIDEquipmentData {
  dexpiId: string;
  tag: string;
  equipmentClass: string;
  processFunction?: string;
  linkedNetboxId?: string;
  lineNumber?: string;
}

export interface ThreatComponentData {
  tdId: string;
  name: string;
  type: 'process' | 'dataStore' | 'actor' | 'dataFlow' | 'trustBoundary';
  strideFlags: StrideFlag[];
  outOfScope: boolean;
  linkedDeviceId?: string;
  threats: ThreatEntry[];
}

export interface ThreatEntry {
  id: string;
  title: string;
  type: StrideFlag;
  status: 'Open' | 'Mitigated' | 'Transferred' | 'Accepted';
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Unknown';
  description: string;
  mitigation?: string;
}

// ReactFlow custom node types
export type OTNodeType = 'otDevice' | 'zone' | 'conduit' | 'pidEquipment' | 'threatComponent' | 'trustBoundary';

export interface OTNode extends Node<OTDeviceData, OTNodeType> {}
export interface ZoneNode extends Node<ZoneData, 'zone'> {}
```

***
## 7. Backend Implementation — FastAPI
### 7.1 Project Structure
```
services/api/
├── main.py                    # FastAPI app entry point
├── config.py                  # Settings via pydantic-settings
├── dependencies.py            # Auth, DB session injection
├── routers/
│   ├── assets.py              # /api/assets/* (NetBox proxy)
│   ├── topology.py            # /api/topology/* (Neo4j queries)
│   ├── pid.py                 # /api/pid/* (DEXPI P&ID data)
│   ├── threats.py             # /api/threats/* (Threat Dragon integration)
│   ├── diagrams.py            # /api/diagram/* (layout save/load)
│   ├── hooks.py               # /hooks/netbox/* (webhook receiver)
│   └── websocket.py           # /ws/updates (WebSocket)
├── services/
│   ├── netbox_service.py      # pynetbox abstraction
│   ├── neo4j_service.py       # Neo4j query service
│   ├── dexpi_service.py       # pyDEXPI import service
│   ├── threat_service.py      # Threat Dragon JSON parser
│   └── layout_service.py      # PostgreSQL layout CRUD
├── models/
│   ├── neo4j_models.py        # neomodel node/relationship definitions
│   ├── pg_models.py           # SQLAlchemy ORM models
│   └── schemas.py             # Pydantic request/response models
├── tasks/
│   └── sync_tasks.py          # Celery tasks for async sync
└── tests/
    └── test_*.py
```
### 7.2 Main Application
```python
# services/api/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routers import assets, topology, pid, threats, diagrams, hooks, websocket
from services.neo4j_service import init_neo4j
import redis.asyncio as aioredis

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_neo4j()
    app.state.redis = await aioredis.from_url("redis://redis:6379")
    yield
    # Shutdown
    await app.state.redis.close()

app = FastAPI(
    title="OT-DiagramStudio API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assets.router, prefix="/api/assets", tags=["assets"])
app.include_router(topology.router, prefix="/api/topology", tags=["topology"])
app.include_router(pid.router, prefix="/api/pid", tags=["pid"])
app.include_router(threats.router, prefix="/api/threats", tags=["threats"])
app.include_router(diagrams.router, prefix="/api/diagram", tags=["diagrams"])
app.include_router(hooks.router, prefix="/hooks", tags=["webhooks"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])

@app.get("/health")
async def health():
    return {"status": "ok", "service": "ot-diagramstudio-api"}
```
### 7.3 Configuration
```python
# services/api/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # NetBox
    netbox_url: str = "http://netbox:8000"
    netbox_token: str

    # Neo4j
    neo4j_uri: str = "bolt://neo4j:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str

    # PostgreSQL (layouts DB)
    pg_url: str = "postgresql://otdiagram:password@postgres:5432/otdiagram_layouts"

    # Redis
    redis_url: str = "redis://redis:6379"

    # Auth
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expiry_minutes: int = 480

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
```
### 7.4 NetBox Webhook Receiver
```python
# services/api/routers/hooks.py
from fastapi import APIRouter, Request, HTTPException, Header
from services.neo4j_service import upsert_device_node, delete_device_node
from services.websocket import broadcast_topology_update
import hmac, hashlib

router = APIRouter()

def verify_netbox_webhook(payload: bytes, signature: str, secret: str) -> bool:
    """Verify NetBox webhook HMAC-SHA512 signature."""
    computed = hmac.new(
        secret.encode(), payload, hashlib.sha512
    ).hexdigest()
    return hmac.compare_digest(f"sha512={computed}", signature)

@router.post("/netbox/device")
async def netbox_device_webhook(
    request: Request,
    x_hook_signature: str = Header(None)
):
    body = await request.body()
    payload = await request.json()

    # Signature verification (configure webhook secret in NetBox)
    # verify_netbox_webhook(body, x_hook_signature, settings.webhook_secret)

    event = payload.get("event")  # created, updated, deleted
    device_data = payload.get("data", {})

    if event in ("created", "updated"):
        await upsert_device_node(device_data)
    elif event == "deleted":
        await delete_device_node(device_data.get("id"))

    await broadcast_topology_update({
        "type": "device_change",
        "event": event,
        "deviceId": device_data.get("id"),
        "deviceName": device_data.get("name")
    })

    return {"status": "processed"}
```

***
## 8. NetBox Integration — Full Guide
### 8.1 pynetbox Bulk Import
```python
# services/api/services/netbox_service.py
import pynetbox
from config import settings
from services.neo4j_service import upsert_device_node

nb = pynetbox.api(settings.netbox_url, token=settings.netbox_token)

async def get_all_ot_devices(site: str = None, purdue_level: str = None):
    """Fetch all devices with OT custom fields from NetBox."""
    filters = {"exclude": "config_context"}  # significant performance improvement
    if site:
        filters["site"] = site
    if purdue_level:
        filters["cf_purdue_level"] = purdue_level

    devices = list(nb.dcim.devices.filter(**filters))
    return [_serialize_device(d) for d in devices]

def _serialize_device(device) -> dict:
    """Convert pynetbox device object to canonical dict."""
    cf = device.custom_fields
    return {
        "netbox_id": str(device.id),
        "name": device.name,
        "device_type": str(device.device_type) if device.device_type else None,
        "manufacturer": str(device.device_type.manufacturer) if device.device_type else None,
        "site": str(device.site) if device.site else None,
        "rack": str(device.rack) if device.rack else None,
        "ip_address": str(device.primary_ip) if device.primary_ip else None,
        "status": device.status.value if device.status else None,
        "purdue_level": cf.get("purdue_level"),
        "iec62443_sl_target": cf.get("iec62443_sl_target"),
        "ot_zone_id": cf.get("ot_zone_id"),
        "dexpi_equipment_id": cf.get("dexpi_equipment_id"),
        "threat_model_component_id": cf.get("threat_model_component_id"),
        "asset_criticality": cf.get("asset_criticality"),
        "asset_tag": device.asset_tag,
    }

async def sync_all_devices_to_neo4j():
    """Full sync: NetBox → Neo4j. Run on initial setup or manual refresh."""
    devices = await get_all_ot_devices()
    for device in devices:
        await upsert_device_node(device)
    return len(devices)
```
### 8.2 Writing Custom Fields Back to NetBox
```python
async def update_device_threat_link(netbox_id: str, td_component_id: str):
    """Write Threat Dragon component ID back to NetBox custom field."""
    # Use PATCH for updates, not POST
    device = nb.dcim.devices.get(netbox_id)
    device.custom_fields["threat_model_component_id"] = td_component_id
    device.save()
```
### 8.3 NetBox Event Rules Configuration
In NetBox v4.3+, configure Event Rules via Admin → Events → Event Rules:[^26]

```
Name: OT-DiagramStudio Device Sync
Object types: Device (dcim.device)
Events: Creations ✓, Updates ✓, Deletions ✓
Action type: Webhook
HTTP method: POST
URL: http://fastapi:8001/hooks/netbox/device
HTTP content type: application/json
Additional headers: X-Hook-Secret: <your-webhook-secret>
Conditions: (leave blank for all devices)
```

***
## 9. Neo4j Graph Layer — Schema, Queries & Sync
### 9.1 neomodel Node Definitions
```python
# services/api/models/neo4j_models.py
from neomodel import (
    StructuredNode, StringProperty, IntegerProperty,
    BooleanProperty, RelationshipTo, RelationshipFrom,
    FloatProperty, JSONProperty
)

class Device(StructuredNode):
    netbox_id = StringProperty(unique_index=True, required=True)
    name = StringProperty(required=True)
    device_type = StringProperty()
    manufacturer = StringProperty()
    site = StringProperty()
    ip_address = StringProperty()
    purdue_level = StringProperty(choices={'L0','L1','L2','L3','L3.5','L4','L5'})
    iec62443_sl = IntegerProperty()
    criticality = StringProperty()
    asset_tag = StringProperty()

    # Relationships
    member_of = RelationshipTo('Zone', 'MEMBER_OF')
    has_interface = RelationshipTo('Interface', 'HAS_INTERFACE')
    modeled_as = RelationshipTo('ThreatComponent', 'MODELED_AS')
    affected_by = RelationshipTo('Vulnerability', 'AFFECTED_BY')
    linked_to_pid = RelationshipTo('PIDEquipment', 'LINKED_TO_PID')

class Zone(StructuredNode):
    zone_id = StringProperty(unique_index=True, required=True)
    name = StringProperty(required=True)
    sl_target = IntegerProperty()
    purdue_band = StringProperty()
    color = StringProperty(default="#3B82F6")

    devices = RelationshipFrom('Device', 'MEMBER_OF')
    connected_via = RelationshipTo('Conduit', 'CONNECTED_VIA')

class Conduit(StructuredNode):
    conduit_id = StringProperty(unique_index=True, required=True)
    name = StringProperty()
    protocol = StringProperty()
    encrypted = BooleanProperty(default=False)
    bandwidth = StringProperty()

    connects_to = RelationshipTo('Zone', 'CONNECTS_TO')

class PIDEquipment(StructuredNode):
    dexpi_id = StringProperty(unique_index=True, required=True)
    tag = StringProperty()
    equipment_class = StringProperty()
    process_function = StringProperty()
    line_number = StringProperty()

    connected_to = RelationshipTo('PIDEquipment', 'CONNECTED_TO')
    controls = RelationshipTo('Device', 'CONTROLS')

class ThreatComponent(StructuredNode):
    td_id = StringProperty(unique_index=True, required=True)
    name = StringProperty()
    component_type = StringProperty()
    stride_flags = JSONProperty(default=[])
    out_of_scope = BooleanProperty(default=False)
    threats = JSONProperty(default=[])

class Vulnerability(StructuredNode):
    cve_id = StringProperty(unique_index=True, required=True)
    cvss_score = FloatProperty()
    description = StringProperty()
    affected_component = StringProperty()
```
### 9.2 Key Cypher Queries
```python
# services/api/services/neo4j_service.py
from neo4j import AsyncGraphDatabase
from config import settings

driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri,
    auth=(settings.neo4j_user, settings.neo4j_password)
)

async def init_neo4j():
    async with driver.session() as session:
        # Create constraints
        constraints = [
            "CREATE CONSTRAINT device_netbox_id IF NOT EXISTS FOR (d:Device) REQUIRE d.netbox_id IS UNIQUE",
            "CREATE CONSTRAINT zone_id IF NOT EXISTS FOR (z:Zone) REQUIRE z.zone_id IS UNIQUE",
            "CREATE CONSTRAINT conduit_id IF NOT EXISTS FOR (c:Conduit) REQUIRE c.conduit_id IS UNIQUE",
            "CREATE CONSTRAINT pid_id IF NOT EXISTS FOR (e:PIDEquipment) REQUIRE e.dexpi_id IS UNIQUE",
        ]
        for constraint in constraints:
            await session.run(constraint)

async def upsert_device_node(device_data: dict):
    """MERGE device into Neo4j — safe for create and update."""
    async with driver.session() as session:
        await session.run("""
            MERGE (d:Device {netbox_id: $netbox_id})
            SET d.name = $name,
                d.device_type = $device_type,
                d.manufacturer = $manufacturer,
                d.site = $site,
                d.ip_address = $ip_address,
                d.purdue_level = $purdue_level,
                d.iec62443_sl = $iec62443_sl,
                d.criticality = $criticality,
                d.asset_tag = $asset_tag
        """, **device_data)

        # Link to zone if zone_id is set
        if device_data.get("ot_zone_id"):
            await session.run("""
                MATCH (d:Device {netbox_id: $netbox_id})
                MERGE (z:Zone {zone_id: $zone_id})
                MERGE (d)-[:MEMBER_OF]->(z)
            """, netbox_id=device_data["netbox_id"],
                 zone_id=device_data["ot_zone_id"])

async def get_blast_radius(device_netbox_id: str, max_hops: int = 5):
    """
    Find all devices reachable from a compromised device via lateral movement.
    Traverses through interfaces → conduits → zones → other devices.
    Uses Neo4j GDS shortest path algorithm for weighted traversal.
    """
    async with driver.session() as session:
        result = await session.run("""
            MATCH (start:Device {netbox_id: $device_id})
            MATCH path = (start)-[:HAS_INTERFACE|CARRIES|CONNECTS_TO|MEMBER_OF*1..$hops]-(target:Device)
            WHERE target.netbox_id <> $device_id
            WITH target, length(path) AS hops, path
            ORDER BY hops
            RETURN DISTINCT
                target.netbox_id AS device_id,
                target.name AS device_name,
                target.purdue_level AS purdue_level,
                target.iec62443_sl AS sl_target,
                hops,
                [r IN relationships(path) | type(r)] AS path_types
        """, device_id=device_netbox_id, hops=max_hops)
        return [dict(record) async for record in result]

async def get_sl_gaps():
    """Find devices where Purdue zone SL target exceeds device SL config — IEC 62443 gap analysis."""
    async with driver.session() as session:
        result = await session.run("""
            MATCH (d:Device)-[:MEMBER_OF]->(z:Zone)
            WHERE z.sl_target IS NOT NULL
              AND d.iec62443_sl IS NOT NULL
              AND z.sl_target > d.iec62443_sl
            RETURN d.name AS device,
                   d.netbox_id AS netbox_id,
                   z.name AS zone,
                   z.sl_target AS required_sl,
                   d.iec62443_sl AS current_sl,
                   z.sl_target - d.iec62443_sl AS gap
            ORDER BY gap DESC
        """)
        return [dict(record) async for record in result]

async def get_zone_conduit_topology():
    """Return full zone/conduit graph for topology visualization."""
    async with driver.session() as session:
        result = await session.run("""
            MATCH (z1:Zone)-[:CONNECTED_VIA]->(c:Conduit)-[:CONNECTS_TO]->(z2:Zone)
            OPTIONAL MATCH (d:Device)-[:MEMBER_OF]->(z1)
            RETURN z1.zone_id AS source_zone_id,
                   z1.name AS source_zone_name,
                   z1.sl_target AS source_sl,
                   c.conduit_id AS conduit_id,
                   c.name AS conduit_name,
                   c.protocol AS protocol,
                   c.encrypted AS encrypted,
                   z2.zone_id AS target_zone_id,
                   z2.name AS target_zone_name,
                   z2.sl_target AS target_sl,
                   count(d) AS device_count
            RETURN DISTINCT *
        """)
        return [dict(record) async for record in result]

async def delete_device_node(netbox_id: str):
    async with driver.session() as session:
        await session.run("""
            MATCH (d:Device {netbox_id: $id})
            DETACH DELETE d
        """, id=str(netbox_id))
```

***
## 10. pyDEXPI → NetworkX → Neo4j Pipeline
### 10.1 Complete P&ID Ingestion Service
pyDEXPI v1.2 includes a parser that converts DEXPI Proteus XML to a NetworkX graph at three abstraction levels: complete graph, process graph, and conceptual graph.[^1][^2][^6]

```python
# services/api/services/dexpi_service.py
import pydexpi
import networkx as nx
from networkx.readwrite.json_graph import cytoscape_data
from neo4j import AsyncGraphDatabase
import pynetbox
from config import settings

nb = pynetbox.api(settings.netbox_url, token=settings.netbox_token)
driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri, auth=(settings.neo4j_user, settings.neo4j_password)
)

async def ingest_dexpi_xml(xml_path: str, plant_unit: str) -> dict:
    """
    Full pipeline: Proteus XML → pyDEXPI → NetworkX → Neo4j
    Returns summary of imported nodes and edges.
    """
    # Step 1: Parse DEXPI Proteus XML
    model = pydexpi.load_proteus_xml(xml_path)

    # Step 2: Convert to process graph (equipment + instruments + connections)
    # Use process_graph for OT security context (filters out purely structural nodes)
    G = model.to_process_graph()

    node_count = 0
    edge_count = 0

    async with driver.session() as session:
        # Step 3: Write equipment nodes to Neo4j
        for node_id, attrs in G.nodes(data=True):
            await session.run("""
                MERGE (e:PIDEquipment {dexpi_id: $dexpi_id})
                SET e.tag = $tag,
                    e.equipment_class = $equipment_class,
                    e.process_function = $process_function,
                    e.plant_unit = $plant_unit,
                    e.description = $description
            """,
                dexpi_id=node_id,
                tag=attrs.get("tag", node_id),
                equipment_class=attrs.get("equipment_class", ""),
                process_function=attrs.get("process_function", ""),
                plant_unit=plant_unit,
                description=attrs.get("description", "")
            )
            node_count += 1

        # Step 4: Write piping/instrument connections
        for u, v, edge_attrs in G.edges(data=True):
            await session.run("""
                MATCH (a:PIDEquipment {dexpi_id: $from_id})
                MATCH (b:PIDEquipment {dexpi_id: $to_id})
                MERGE (a)-[r:CONNECTED_TO {line_number: $line}]->(b)
                SET r.connection_type = $conn_type,
                    r.nominal_diameter = $nd
            """,
                from_id=u, to_id=v,
                line=edge_attrs.get("line_number", ""),
                conn_type=edge_attrs.get("connection_type", "pipe"),
                nd=edge_attrs.get("nominal_diameter", "")
            )
            edge_count += 1

    # Step 5: Link DEXPI equipment to NetBox devices by tag matching
    linked_count = await _link_dexpi_to_netbox(G, plant_unit)

    # Step 6: Export as Cytoscape JSON for React frontend consumption
    cy_data = cytoscape_data(G)

    return {
        "plant_unit": plant_unit,
        "nodes_imported": node_count,
        "edges_imported": edge_count,
        "netbox_links_created": linked_count,
        "cytoscape_preview": cy_data  # optional frontend preview
    }

async def _link_dexpi_to_netbox(G: nx.DiGraph, plant_unit: str) -> int:
    """
    Cross-reference DEXPI equipment tags to NetBox device names.
    Creates LINKED_TO_PID relationships in Neo4j.
    """
    linked = 0
    async with driver.session() as session:
        for node_id, attrs in G.nodes(data=True):
            tag = attrs.get("tag", "")
            if not tag:
                continue
            # Try exact match first
            try:
                nb_device = nb.dcim.devices.get(name=tag)
                if nb_device:
                    await session.run("""
                        MATCH (e:PIDEquipment {dexpi_id: $dexpi_id})
                        MATCH (d:Device {netbox_id: $netbox_id})
                        MERGE (e)-[:LINKED_TO_DEVICE]->(d)
                        MERGE (d)-[:LINKED_TO_PID]->(e)
                    """, dexpi_id=node_id, netbox_id=str(nb_device.id))
                    linked += 1
                    # Write DEXPI ID back to NetBox custom field
                    nb_device.custom_fields["dexpi_equipment_id"] = node_id
                    nb_device.save()
            except Exception:
                pass  # No match found — will require manual linking in UI
    return linked

async def get_pid_graph(plant_unit: str) -> dict:
    """Retrieve P&ID graph from Neo4j formatted for ReactFlow rendering."""
    async with driver.session() as session:
        nodes_result = await session.run("""
            MATCH (e:PIDEquipment {plant_unit: $unit})
            OPTIONAL MATCH (e)-[:LINKED_TO_DEVICE]->(d:Device)
            RETURN e.dexpi_id AS id,
                   e.tag AS tag,
                   e.equipment_class AS equipment_class,
                   e.process_function AS process_function,
                   d.netbox_id AS netbox_id,
                   d.purdue_level AS purdue_level,
                   d.iec62443_sl AS sl_target
        """, unit=plant_unit)

        edges_result = await session.run("""
            MATCH (a:PIDEquipment {plant_unit: $unit})-[r:CONNECTED_TO]->(b:PIDEquipment {plant_unit: $unit})
            RETURN a.dexpi_id AS source,
                   b.dexpi_id AS target,
                   r.line_number AS line_number,
                   r.connection_type AS connection_type
        """, unit=plant_unit)

        nodes = [dict(r) async for r in nodes_result]
        edges = [dict(r) async for r in edges_result]

    # Convert to ReactFlow format
    rf_nodes = [{
        "id": n["id"],
        "type": "pidEquipment",
        "position": {"x": 0, "y": 0},  # ELK.js will compute positions
        "data": {
            "tag": n["tag"],
            "equipmentClass": n["equipment_class"],
            "processFunction": n["process_function"],
            "netboxId": n.get("netbox_id"),
            "purdueLevel": n.get("purdue_level"),
            "slTarget": n.get("sl_target"),
        }
    } for n in nodes]

    rf_edges = [{
        "id": f"{e['source']}-{e['target']}",
        "source": e["source"],
        "target": e["target"],
        "data": {
            "lineNumber": e.get("line_number"),
            "connectionType": e.get("connection_type")
        }
    } for e in edges]

    return {"nodes": rf_nodes, "edges": rf_edges}
```

***
## 11. React Frontend — Vite + TypeScript Setup
### 11.1 Project Scaffold
```bash
# From the repo root
pnpm create vite frontend --template react-ts
cd frontend
pnpm install

# Tailwind CSS setup
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
### 11.2 Directory Structure
```
frontend/
├── public/
│   └── icons/                  # Industrial SVG icons (static)
├── src/
│   ├── assets/                 # Fonts, logo, static images
│   ├── components/
│   │   ├── canvas/             # ReactFlow canvas components
│   │   │   ├── nodes/          # Custom node types
│   │   │   ├── edges/          # Custom edge types
│   │   │   └── controls/       # Canvas toolbar, minimap
│   │   ├── sidebar/            # Asset inventory sidebar
│   │   ├── panels/             # Node detail panel, property editor
│   │   └── ui/                 # Generic UI primitives (Radix-based)
│   ├── features/
│   │   ├── pid/                # P&ID canvas feature
│   │   ├── topology/           # Network topology feature
│   │   ├── threat/             # Threat model canvas feature
│   │   └── zone-conduit/       # Zone/conduit diagram feature
│   ├── hooks/
│   │   ├── useAutoLayout.ts    # ELK.js auto-layout hook
│   │   ├── useTopologyData.ts  # Neo4j topology fetch hook
│   │   ├── useWebSocket.ts     # WebSocket connection hook
│   │   └── useBlastRadius.ts   # Blast radius query hook
│   ├── store/
│   │   ├── diagramStore.ts     # Zustand: nodes, edges, viewport
│   │   ├── assetStore.ts       # Zustand: NetBox asset inventory
│   │   └── uiStore.ts          # Zustand: panel open/close, mode, selection
│   ├── services/
│   │   ├── api.ts              # Axios API client with interceptors
│   │   ├── netbox.ts           # NetBox API calls
│   │   ├── topology.ts         # Topology API calls
│   │   └── diagrams.ts         # Diagram save/load API calls
│   ├── types/
│   │   └── ot-types.ts         # TypeScript OT type definitions (Section 6.4)
│   ├── utils/
│   │   ├── iconMap.ts          # Device type → SVG icon mapping
│   │   ├── colorMap.ts         # Purdue level → color mapping
│   │   └── elkHelpers.ts       # ELK graph conversion utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```
### 11.3 Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:8001',
        ws: true,
      },
    },
  },
  // ELK.js uses Web Workers — exclude from optimization
  optimizeDeps: {
    exclude: ['elkjs/lib/elk.bundled.js'],
  },
  worker: {
    format: 'es',
  },
});
```
### 11.4 Tailwind Configuration (Dark Theme, Industrial Palette)
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Purdue model level colors (used in canvas node borders/backgrounds)
        purdue: {
          l0: '#DC2626',   // Field devices — deep red
          l1: '#EA580C',   // Basic control — orange
          l2: '#CA8A04',   // Process control — amber
          l3: '#16A34A',   // Operations & logistics — green
          l35: '#0EA5E9',  // DMZ — sky blue
          l4: '#6366F1',   // Business planning — indigo
          l5: '#9333EA',   // Enterprise — purple
        },
        // IEC 62443 SL colors
        sl: {
          1: '#22C55E',
          2: '#EAB308',
          3: '#F97316',
          4: '#EF4444',
        },
        canvas: {
          bg: '#0F172A',        // Dark slate canvas background
          grid: '#1E293B',      // Grid lines
          node: '#1E293B',      // Default node background
          nodeBorder: '#334155',
          selected: '#3B82F6',
        }
      },
    },
  },
  plugins: [],
};

export default config;
```

***
## 12. ReactFlow Canvas Implementation
### 12.1 Zustand Diagram Store[^22][^21][^27]
```typescript
// src/store/diagramStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  Node, Edge, applyNodeChanges, applyEdgeChanges,
  NodeChange, EdgeChange, Connection, addEdge
} from '@xyflow/react';
import type { OTDeviceData, DiagramType } from '@/types/ot-types';

interface DiagramState {
  nodes: Node[];
  edges: Edge[];
  viewport: { x: number; y: number; zoom: number };
  diagramType: DiagramType;
  selectedNodeId: string | null;
  isDirty: boolean;
  diagramId: string | null;

  // Actions
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  setDiagramType: (type: DiagramType) => void;
  setSelectedNode: (id: string | null) => void;
  addDeviceNode: (device: OTDeviceData, position: { x: number; y: number }) => void;
  updateNodeData: (id: string, data: Partial<OTDeviceData>) => void;
  loadDiagram: (diagramId: string) => Promise<void>;
  saveDiagram: () => Promise<void>;
  markClean: () => void;
}

export const useDiagramStore = create<DiagramState>()(
  immer((set, get) => ({
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 },
    diagramType: 'topology',
    selectedNodeId: null,
    isDirty: false,
    diagramId: null,

    setNodes: (nodes) => set((state) => { state.nodes = nodes; state.isDirty = true; }),
    setEdges: (edges) => set((state) => { state.edges = edges; state.isDirty = true; }),

    onNodesChange: (changes) => set((state) => {
      state.nodes = applyNodeChanges(changes, state.nodes);
      if (changes.some(c => c.type !== 'select')) state.isDirty = true;
    }),

    onEdgesChange: (changes) => set((state) => {
      state.edges = applyEdgeChanges(changes, state.edges);
      state.isDirty = true;
    }),

    onConnect: (connection) => set((state) => {
      state.edges = addEdge({ ...connection, type: 'smoothstep' }, state.edges);
      state.isDirty = true;
    }),

    setDiagramType: (type) => set((state) => { state.diagramType = type; }),
    setSelectedNode: (id) => set((state) => { state.selectedNodeId = id; }),

    addDeviceNode: (device, position) => set((state) => {
      const newNode: Node = {
        id: `device-${device.netboxId}`,
        type: 'otDevice',
        position,
        data: device,
      };
      state.nodes.push(newNode);
      state.isDirty = true;
    }),

    updateNodeData: (id, data) => set((state) => {
      const node = state.nodes.find(n => n.id === id);
      if (node) Object.assign(node.data, data);
    }),

    loadDiagram: async (diagramId) => {
      const response = await fetch(`/api/diagram/${diagramId}`);
      const layout = await response.json();
      set((state) => {
        state.nodes = layout.nodes;
        state.edges = layout.edges;
        state.viewport = layout.viewport;
        state.diagramId = diagramId;
        state.isDirty = false;
      });
    },

    saveDiagram: async () => {
      const { nodes, edges, viewport, diagramId } = get();
      await fetch(`/api/diagram/${diagramId}/layout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges, viewport }),
      });
      set((state) => { state.isDirty = false; });
    },

    markClean: () => set((state) => { state.isDirty = false; }),
  }))
);
```
### 12.2 Custom OT Device Node
```typescript
// src/components/canvas/nodes/OTDeviceNode.tsx
import { memo, useCallback } from 'react';
import { NodeProps, Handle, Position, useReactFlow } from '@xyflow/react';
import type { OTDeviceData, PurdueLevel } from '@/types/ot-types';
import { getDeviceIcon } from '@/utils/iconMap';

const PURDUE_COLORS: Record<PurdueLevel, string> = {
  L0: '#DC2626', L1: '#EA580C', L2: '#CA8A04',
  L3: '#16A34A', 'L3.5': '#0EA5E9', L4: '#6366F1', L5: '#9333EA',
};

const SL_COLORS: Record<number, string> = {
  1: '#22C55E', 2: '#EAB308', 3: '#F97316', 4: '#EF4444',
};

function OTDeviceNode({ id, data, selected }: NodeProps<OTDeviceData>) {
  const { updateNodeData } = useReactFlow();
  const borderColor = data.purdueLevel ? PURDUE_COLORS[data.purdueLevel] : '#334155';
  const slBadgeColor = data.iec62443SlTarget ? SL_COLORS[data.iec62443SlTarget] : '#6B7280';
  const IconComponent = getDeviceIcon(data.deviceType);

  return (
    <div
      className={`
        relative flex flex-col items-center p-2 rounded-lg min-w-[120px] max-w-[160px]
        bg-canvas-node border-2 transition-all duration-150
        ${selected ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
      `}
      style={{ borderColor }}
    >
      {/* Top handle */}
      <Handle type="target" position={Position.Top} className="!bg-slate-400 !border-slate-600" />

      {/* SL Badge */}
      {data.iec62443SlTarget && (
        <div
          className="absolute -top-2 -right-2 text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center"
          style={{ backgroundColor: slBadgeColor }}
          title={`IEC 62443 SL-${data.iec62443SlTarget}`}
        >
          {data.iec62443SlTarget}
        </div>
      )}

      {/* Criticality indicator */}
      {data.criticality === 'Critical' && (
        <div className="absolute -top-2 -left-2 text-xs bg-red-600 text-white rounded-full px-1">!</div>
      )}

      {/* Device icon */}
      <div className="w-8 h-8 mb-1 text-slate-300">
        <IconComponent />
      </div>

      {/* Device name */}
      <div className="text-xs font-semibold text-slate-200 text-center truncate w-full"
           title={data.name}>
        {data.name}
      </div>

      {/* Purdue level badge */}
      {data.purdueLevel && (
        <div className="text-[10px] mt-0.5 px-1 rounded"
             style={{ backgroundColor: borderColor + '33', color: borderColor }}>
          {data.purdueLevel}
        </div>
      )}

      {/* IP address */}
      {data.ipAddress && (
        <div className="text-[9px] text-slate-500 mt-0.5">{data.ipAddress}</div>
      )}

      {/* Bottom and side handles */}
      <Handle type="source" position={Position.Bottom} className="!bg-slate-400 !border-slate-600" />
      <Handle type="source" position={Position.Right} id="right"
              className="!bg-slate-400 !border-slate-600" />
      <Handle type="target" position={Position.Left} id="left"
              className="!bg-slate-400 !border-slate-600" />
    </div>
  );
}

export default memo(OTDeviceNode);
```
### 12.3 Main Canvas Component
```typescript
// src/features/topology/TopologyCanvas.tsx
import { useCallback, useRef } from 'react';
import {
  ReactFlow, Background, Controls, MiniMap,
  BackgroundVariant, useReactFlow, ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useDiagramStore } from '@/store/diagramStore';
import { useAutoLayout } from '@/hooks/useAutoLayout';
import OTDeviceNode from '@/components/canvas/nodes/OTDeviceNode';
import ZoneNode from '@/components/canvas/nodes/ZoneNode';
import PIDEquipmentNode from '@/components/canvas/nodes/PIDEquipmentNode';
import ThreatComponentNode from '@/components/canvas/nodes/ThreatComponentNode';
import NodeDetailPanel from '@/components/panels/NodeDetailPanel';
import CanvasToolbar from '@/components/canvas/controls/CanvasToolbar';
import type { OTDeviceData } from '@/types/ot-types';

const nodeTypes = {
  otDevice: OTDeviceNode,
  zone: ZoneNode,
  pidEquipment: PIDEquipmentNode,
  threatComponent: ThreatComponentNode,
};

function TopologyCanvasInner() {
  const {
    nodes, edges, onNodesChange, onEdgesChange, onConnect,
    setSelectedNode, addDeviceNode, selectedNodeId
  } = useDiagramStore();
  const { autoLayout } = useAutoLayout();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  // Drag-and-drop handler — receives NetBox device from sidebar
  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const deviceJson = event.dataTransfer.getData('application/ot-device');
    if (!deviceJson) return;

    const device: OTDeviceData = JSON.parse(deviceJson);
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    addDeviceNode(device, position);
  }, [screenToFlowPosition, addDeviceNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="flex h-screen bg-canvas-bg">
      {/* Canvas area */}
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <CanvasToolbar onAutoLayout={autoLayout} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={(_, node) => setSelectedNode(node.id)}
          onPaneClick={() => setSelectedNode(null)}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Shift"
          snapToGrid
          snapGrid={[10, 10]}
          connectionMode="loose"
          defaultEdgeOptions={{
            type: 'smoothstep',
            style: { stroke: '#475569', strokeWidth: 2 },
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            color="#1E293B"
          />
          <Controls className="!bg-slate-800 !border-slate-700 !text-slate-300" />
          <MiniMap
            className="!bg-slate-900 !border-slate-700"
            nodeColor={(node) => {
              const level = (node.data as OTDeviceData).purdueLevel;
              const colors: Record<string, string> = {
                L0: '#DC2626', L1: '#EA580C', L2: '#CA8A04',
                L3: '#16A34A', 'L3.5': '#0EA5E9', L4: '#6366F1', L5: '#9333EA',
              };
              return level ? colors[level] : '#475569';
            }}
          />
        </ReactFlow>
      </div>

      {/* Node detail panel */}
      {selectedNodeId && (
        <NodeDetailPanel nodeId={selectedNodeId} />
      )}
    </div>
  );
}

export default function TopologyCanvas() {
  return (
    <ReactFlowProvider>
      <TopologyCanvasInner />
    </ReactFlowProvider>
  );
}
```

***
## 13. Threat Modeling Integration (OWASP Threat Dragon)
OWASP Threat Dragon uses a JSON schema (V2) for storing threat models. The integration strategy is bidirectional: import existing Threat Dragon models into the Neo4j graph, and export canvas diagrams back to Threat Dragon-compatible JSON.[^28][^4]
### 13.1 Threat Dragon JSON → Neo4j Ingestion
```python
# services/api/services/threat_service.py
import json
from neo4j import AsyncGraphDatabase
from config import settings

driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri, auth=(settings.neo4j_user, settings.neo4j_password)
)

async def ingest_threat_dragon_model(model_json_path: str) -> dict:
    """
    Parse OWASP Threat Dragon V2 JSON → Neo4j ThreatComponent nodes.
    Schema reference: owasp.threat-dragon.schema.V2.json
    """
    with open(model_json_path) as f:
        model = json.load(f)

    components_imported = 0
    threats_imported = 0

    async with driver.session() as session:
        for diagram in model.get("detail", {}).get("diagrams", []):
            diagram_title = diagram.get("title", "")
            for cell in diagram.get("cells", []):
                cell_type = cell.get("type", "")
                cell_data = cell.get("data", {})

                # Process components (actors, processes, data stores, data flows)
                if cell_type.startswith("tm."):
                    component_type = cell_type.replace("tm.", "")
                    cell_id = cell.get("id")
                    threats = cell_data.get("threats", [])

                    # Build STRIDE flags from threat types
                    stride_flags = list(set([
                        t.get("type", "") for t in threats
                        if t.get("type") in [
                            "Spoofing", "Tampering", "Repudiation",
                            "Information disclosure", "Denial of service",
                            "Elevation of privilege"
                        ]
                    ]))

                    await session.run("""
                        MERGE (tc:ThreatComponent {td_id: $td_id})
                        SET tc.name = $name,
                            tc.component_type = $component_type,
                            tc.stride_flags = $stride_flags,
                            tc.out_of_scope = $out_of_scope,
                            tc.threats = $threats,
                            tc.diagram = $diagram_title
                    """,
                        td_id=cell_id,
                        name=cell_data.get("name", cell_id),
                        component_type=component_type,
                        stride_flags=json.dumps(stride_flags),
                        out_of_scope=cell_data.get("outOfScope", False),
                        threats=json.dumps(threats),
                        diagram_title=diagram_title
                    )
                    components_imported += 1
                    threats_imported += len(threats)

                    # Attempt to link to NetBox device by name match
                    device_name = cell_data.get("name", "")
                    if device_name and component_type == "Process":
                        await session.run("""
                            MATCH (tc:ThreatComponent {td_id: $td_id})
                            MATCH (d:Device) WHERE d.name = $device_name
                            MERGE (d)-[:MODELED_AS]->(tc)
                        """, td_id=cell_id, device_name=device_name)

    return {
        "components_imported": components_imported,
        "threats_imported": threats_imported
    }

async def get_threats_for_device(netbox_id: str) -> list:
    """Return all STRIDE threats for a given device via its ThreatComponent link."""
    async with driver.session() as session:
        result = await session.run("""
            MATCH (d:Device {netbox_id: $netbox_id})-[:MODELED_AS]->(tc:ThreatComponent)
            RETURN tc.name AS component,
                   tc.component_type AS type,
                   tc.stride_flags AS stride_flags,
                   tc.threats AS threats
        """, netbox_id=netbox_id)
        return [dict(r) async for r in result]
```
### 13.2 ThreatComponent ReactFlow Node
```typescript
// src/components/canvas/nodes/ThreatComponentNode.tsx
import { memo } from 'react';
import { NodeProps, Handle, Position } from '@xyflow/react';
import { Shield, AlertTriangle, Database, User, ArrowRight, Lock } from 'lucide-react';
import type { ThreatComponentData, StrideFlag } from '@/types/ot-types';

const TYPE_ICONS = {
  process: Shield,
  dataStore: Database,
  actor: User,
  dataFlow: ArrowRight,
  trustBoundary: Lock,
};

const STRIDE_COLORS: Record<StrideFlag, string> = {
  Spoofing: '#8B5CF6',
  Tampering: '#EF4444',
  Repudiation: '#F59E0B',
  InformationDisclosure: '#06B6D4',
  DenialOfService: '#F97316',
  ElevationOfPrivilege: '#EC4899',
};

function ThreatComponentNode({ data, selected }: NodeProps<ThreatComponentData>) {
  const Icon = TYPE_ICONS[data.type] || Shield;
  const openThreats = data.threats?.filter(t => t.status === 'Open') || [];
  const hasCritical = openThreats.some(t => t.severity === 'Critical');

  return (
    <div
      className={`
        relative p-3 rounded-lg min-w-[140px] border
        bg-slate-900 border-purple-600/50
        ${selected ? 'ring-2 ring-purple-400' : ''}
        ${hasCritical ? 'border-red-500 animate-pulse' : ''}
      `}
    >
      <Handle type="target" position={Position.Top} />

      <div className="flex items-center gap-2 mb-1">
        <Icon size={14} className="text-purple-400" />
        <span className="text-xs font-semibold text-slate-200 truncate">{data.name}</span>
      </div>

      {/* STRIDE flags row */}
      {data.strideFlags.length > 0 && (
        <div className="flex flex-wrap gap-0.5 mt-1">
          {data.strideFlags.map((flag) => (
            <span
              key={flag}
              className="text-[9px] px-1 rounded text-white font-bold"
              style={{ backgroundColor: STRIDE_COLORS[flag as StrideFlag] }}
              title={flag}
            >
              {flag.charAt(0)}
            </span>
          ))}
        </div>
      )}

      {/* Open threats count */}
      {openThreats.length > 0 && (
        <div className="flex items-center gap-1 mt-1">
          <AlertTriangle size={10} className={hasCritical ? 'text-red-400' : 'text-amber-400'} />
          <span className="text-[9px] text-slate-400">{openThreats.length} open threats</span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(ThreatComponentNode);
```

***
## 14. Auto-Routing with ELK.js
ELK.js (Eclipse Layout Kernel) provides industrial-grade hierarchical auto-layout for React Flow, handling ports, hierarchical structures, and complex routing — ideal for Purdue model layering.[^29][^20][^19]
### 14.1 useAutoLayout Hook
```typescript
// src/hooks/useAutoLayout.ts
import { useCallback } from 'react';
import { useReactFlow, Node, Edge } from '@xyflow/react';
import ELK from 'elkjs/lib/elk.bundled.js';
import { useDiagramStore } from '@/store/diagramStore';

const elk = new ELK();

// ELK algorithm options per diagram type
const ELK_OPTIONS = {
  topology: {
    'elk.algorithm': 'layered',
    'elk.direction': 'DOWN',  // Purdue model flows top-down L5 → L0
    'elk.layered.spacing.nodeNodeBetweenLayers': '80',
    'elk.spacing.nodeNode': '40',
    'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF',
    'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
  },
  pid: {
    'elk.algorithm': 'layered',
    'elk.direction': 'RIGHT',  // P&ID flows left-to-right
    'elk.layered.spacing.nodeNodeBetweenLayers': '60',
    'elk.spacing.nodeNode': '30',
    'elk.layered.mergeEdges': 'true',
  },
  threat: {
    'elk.algorithm': 'mrtree',  // Tree layout for DFD-style threat models
    'elk.direction': 'DOWN',
    'elk.spacing.nodeNode': '50',
  },
};

export function useAutoLayout() {
  const { setNodes, diagramType } = useDiagramStore();
  const { getNodes, getEdges, fitView } = useReactFlow();

  const autoLayout = useCallback(async () => {
    const nodes = getNodes();
    const edges = getEdges();

    const elkGraph = {
      id: 'root',
      layoutOptions: ELK_OPTIONS[diagramType] || ELK_OPTIONS.topology,
      children: nodes.map((node) => ({
        id: node.id,
        width: node.measured?.width ?? 160,
        height: node.measured?.height ?? 80,
        // Group by Purdue level for topology layout
        properties: {
          'org.eclipse.elk.partitioning.partition':
            (node.data as any)?.purdueLevel || '0',
        },
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
      })),
    };

    try {
      const layoutedGraph = await elk.layout(elkGraph);

      const layoutedNodes: Node[] = nodes.map((node) => {
        const elkNode = layoutedGraph.children?.find((n) => n.id === node.id);
        if (elkNode?.x != null && elkNode?.y != null) {
          return {
            ...node,
            position: { x: elkNode.x, y: elkNode.y },
          };
        }
        return node;
      });

      setNodes(layoutedNodes);
      setTimeout(() => fitView({ padding: 0.1, duration: 500 }), 50);
    } catch (error) {
      console.error('ELK layout error:', error);
    }
  }, [getNodes, getEdges, setNodes, fitView, diagramType]);

  return { autoLayout };
}
```

***
## 15. Network Topology View (reagraph)
reagraph provides WebGL-accelerated 2D/3D graph rendering, suitable for large OT network topologies with hundreds of nodes.[^17][^30]

```typescript
// src/features/topology/WebGLTopologyView.tsx
import { GraphCanvas, GraphNode, GraphEdge, useSelection } from 'reagraph';
import { useQuery } from '@tanstack/react-query';
import { fetchTopologyGraph } from '@/services/topology';

const PURDUE_COLORS: Record<string, string> = {
  L0: '#DC2626', L1: '#EA580C', L2: '#CA8A04',
  L3: '#16A34A', 'L3.5': '#0EA5E9', L4: '#6366F1', L5: '#9333EA',
};

export default function WebGLTopologyView() {
  const { data: topology, isLoading } = useQuery({
    queryKey: ['topology'],
    queryFn: fetchTopologyGraph,
    refetchInterval: 30_000,  // Refresh every 30s
  });

  const { selections, onNodeClick, onCanvasClick, actives } = useSelection({
    nodes: topology?.nodes ?? [],
    edges: topology?.edges ?? [],
    pathSelectionType: 'out',  // Highlight outgoing paths (lateral movement)
  });

  if (isLoading) return <div className="flex-1 flex items-center justify-center text-slate-400">Loading topology...</div>;

  const graphNodes: GraphNode[] = (topology?.nodes ?? []).map((n: any) => ({
    id: n.id,
    label: n.name,
    fill: PURDUE_COLORS[n.purdueLevel] || '#475569',
    size: n.criticality === 'Critical' ? 20 : 12,
    data: n,
  }));

  const graphEdges: GraphEdge[] = (topology?.edges ?? []).map((e: any) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.protocol || '',
  }));

  return (
    <div className="flex-1 relative bg-canvas-bg">
      <GraphCanvas
        nodes={graphNodes}
        edges={graphEdges}
        selections={selections}
        actives={actives}
        onNodeClick={onNodeClick}
        onCanvasClick={onCanvasClick}
        layoutType="forceDirected2d"
        theme={{
          canvas: { background: '#0F172A' },
          node: {
            fill: '#1E293B',
            activeFill: '#3B82F6',
            label: { color: '#94A3B8', fontSize: 6 },
          },
          edge: {
            fill: '#334155',
            activeFill: '#60A5FA',
          },
          ring: { fill: '#3B82F6' },
          arrow: { fill: '#475569' },
        }}
      />
    </div>
  );
}
```

***
## 16. Asset Management Sidebar & Inventory Tags
### 16.1 NetBox Asset Sidebar
```typescript
// src/components/sidebar/AssetInventorySidebar.tsx
import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { fetchAssets } from '@/services/netbox';
import { getDeviceIcon } from '@/utils/iconMap';
import type { OTDeviceData, PurdueLevel } from '@/types/ot-types';

const PURDUE_ORDER: PurdueLevel[] = ['L5', 'L4', 'L3.5', 'L3', 'L2', 'L1', 'L0'];

export default function AssetInventorySidebar() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['L2', 'L1', 'L0']));

  const { data: assets = [] } = useQuery({
    queryKey: ['assets', search],
    queryFn: () => fetchAssets({ search }),
    staleTime: 30_000,
  });

  // Group by Purdue level
  const grouped = PURDUE_ORDER.reduce((acc, level) => {
    acc[level] = assets.filter((a: OTDeviceData) => a.purdueLevel === level);
    return acc;
  }, {} as Record<PurdueLevel, OTDeviceData[]>);

  const onDragStart = useCallback((
    event: React.DragEvent, device: OTDeviceData
  ) => {
    event.dataTransfer.setData('application/ot-device', JSON.stringify(device));
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const toggleExpand = (level: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(level) ? next.delete(level) : next.add(level);
      return next;
    });
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-slate-700">
        <h2 className="text-sm font-semibold text-slate-200 mb-2">NetBox Assets</h2>
        <div className="relative">
          <Search size={12} className="absolute left-2 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search devices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Device list grouped by Purdue level */}
      <div className="flex-1 overflow-y-auto p-2">
        {PURDUE_ORDER.map(level => {
          const devices = grouped[level] || [];
          if (devices.length === 0) return null;
          const isExpanded = expanded.has(level);

          return (
            <div key={level} className="mb-1">
              <button
                onClick={() => toggleExpand(level)}
                className="w-full flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded"
              >
                {isExpanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                <span>{level}</span>
                <span className="ml-auto text-slate-600">{devices.length}</span>
              </button>

              {isExpanded && devices.map(device => (
                <AssetItem key={device.netboxId} device={device} onDragStart={onDragStart} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AssetItem({
  device, onDragStart
}: {
  device: OTDeviceData;
  onDragStart: (e: React.DragEvent, d: OTDeviceData) => void;
}) {
  const Icon = getDeviceIcon(device.deviceType);
  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, device)}
      className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded cursor-grab active:cursor-grabbing ml-4"
    >
      <Icon size={12} className="text-slate-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="truncate font-medium">{device.name}</div>
        {device.assetTag && (
          <div className="text-[9px] text-slate-600">{device.assetTag}</div>
        )}
      </div>
      {device.criticality === 'Critical' && (
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
      )}
    </div>
  );
}
```

***
## 17. Industrial Icon & Symbol Libraries
### 17.1 SVG Icon Map Implementation
```typescript
// src/utils/iconMap.ts
// Maps NetBox device_type → React SVG component
// Source icons from:
// - /public/icons/ (custom OT SVG library — see Section 17.2)
// - lucide-react (generic fallbacks)
import { Server, Cpu, Router, Wifi, Monitor, HardDrive,
         Zap, Thermometer, Settings, AlertTriangle } from 'lucide-react';
import type { ComponentType } from 'react';

// Type → icon mapping (extend as needed for your device taxonomy)
const DEVICE_TYPE_ICONS: Record<string, string> = {
  // PLCs
  'plc': '/icons/ot/plc.svg',
  'siemens-s7': '/icons/ot/siemens-s7.svg',
  'allen-bradley-logix': '/icons/ot/allen-bradley.svg',
  'codesys-controller': '/icons/ot/plc-generic.svg',
  // RTUs
  'rtu': '/icons/ot/rtu.svg',
  'dnp3-rtu': '/icons/ot/rtu-dnp3.svg',
  // HMIs
  'hmi': '/icons/ot/hmi.svg',
  'scada-workstation': '/icons/ot/scada-workstation.svg',
  // Networking
  'managed-switch': '/icons/ot/managed-switch.svg',
  'industrial-switch': '/icons/ot/industrial-switch.svg',
  'firewall': '/icons/ot/firewall.svg',
  'router': '/icons/ot/router-ot.svg',
  // Historians / Servers
  'historian': '/icons/ot/historian.svg',
  'opc-server': '/icons/ot/opc-server.svg',
  // Field devices
  'sensor': '/icons/ot/sensor.svg',
  'actuator': '/icons/ot/actuator.svg',
  'drive': '/icons/ot/vfd.svg',
  // Energy
  'bess': '/icons/ot/bess.svg',
  'substation-rtu': '/icons/ot/substation.svg',
  'protection-relay': '/icons/ot/relay.svg',
};

// Lucide fallback icons by device category
const CATEGORY_FALLBACKS: Record<string, ComponentType> = {
  'server': Server,
  'controller': Cpu,
  'switch': Router,
  'wireless': Wifi,
  'hmi': Monitor,
  'storage': HardDrive,
  'power': Zap,
  'sensor': Thermometer,
  'default': Settings,
};

export function getDeviceIconSrc(deviceType?: string): string | null {
  if (!deviceType) return null;
  const normalized = deviceType.toLowerCase().replace(/[\s_]+/g, '-');
  return DEVICE_TYPE_ICONS[normalized] || null;
}

export function getDeviceIcon(deviceType?: string): ComponentType {
  // Return lucide fallback for use in non-img contexts
  if (!deviceType) return Settings;
  const dt = deviceType.toLowerCase();
  for (const [category, Icon] of Object.entries(CATEGORY_FALLBACKS)) {
    if (dt.includes(category)) return Icon;
  }
  return Settings;
}
```
### 17.2 Icon Source Recommendations
Place downloaded/designed SVG icons in `/frontend/public/icons/ot/`. Recommended sources:[^31][^32]

- **AggreGate SCADA Symbol Library** (free SVG) — pumps, valves, tanks, sensors, motors, compressors, heat exchangers, electrical panels, conveyors[^31]
- **Open Automation Software Manufacturing Symbols** — 5,000+ industrial symbols PNG/SVG, free for commercial use[^32]
- **draw.io Industrial Shape Libraries** — extract via draw.io desktop app, export as SVG, host as static assets. Shape packs: Networking, PID, Electrical, Rack, Floorplan[^33]

***
## 18. WebSocket Real-Time Sync
### 18.1 FastAPI WebSocket Connection Manager
```python
# services/api/routers/websocket.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import json, asyncio
import redis.asyncio as aioredis

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        data = json.dumps(message)
        dead = []
        for connection in self.active_connections:
            try:
                await connection.send_text(data)
            except Exception:
                dead.append(connection)
        for conn in dead:
            self.active_connections.remove(conn)

manager = ConnectionManager()

async def broadcast_topology_update(event: dict):
    await manager.broadcast(event)

@router.websocket("/updates")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        # Subscribe to Redis for cross-process broadcasts (if using multiple Uvicorn workers)
        redis = aioredis.from_url("redis://redis:6379")
        pubsub = redis.pubsub()
        await pubsub.subscribe("topology_updates")

        async def listen_redis():
            async for msg in pubsub.listen():
                if msg["type"] == "message":
                    await websocket.send_text(msg["data"].decode())

        listen_task = asyncio.create_task(listen_redis())

        while True:
            # Keep connection alive, receive any client messages
            data = await websocket.receive_text()
            # Handle client commands (e.g., subscribe to specific plant unit)

    except WebSocketDisconnect:
        listen_task.cancel()
        manager.disconnect(websocket)
        await redis.close()
```
### 18.2 React WebSocket Hook
```typescript
// src/hooks/useWebSocket.ts
import { useEffect, useRef, useCallback } from 'react';
import { useDiagramStore } from '@/store/diagramStore';
import { useQueryClient } from '@tanstack/react-query';

export function useTopologyWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();
  const { updateNodeData } = useDiagramStore();

  const connect = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws/updates`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'device_change':
          // Invalidate assets query to trigger refetch
          queryClient.invalidateQueries({ queryKey: ['assets'] });
          // If device is on canvas, update its node data
          if (message.event === 'updated') {
            updateNodeData(
              `device-${message.deviceId}`,
              { name: message.deviceName }
            );
          }
          break;
        case 'topology_update':
          queryClient.invalidateQueries({ queryKey: ['topology'] });
          break;
      }
    };

    ws.onclose = () => {
      // Reconnect after 3 seconds
      setTimeout(connect, 3_000);
    };

    wsRef.current = ws;
  }, [queryClient, updateNodeData]);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, [connect]);
}
```

***
## 19. Docker Compose — Full Stack Deployment
### 19.1 docker-compose.yml
```yaml
# docker-compose.yml
services:
  # ────────────────────────────────────
  # PostgreSQL — NetBox + Layouts DB
  # ────────────────────────────────────
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: netbox
      POSTGRES_USER: netbox
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-layouts-db.sql:/docker-entrypoint-initdb.d/01-layouts.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U netbox"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ────────────────────────────────────
  # Redis — Task queue + WebSocket pubsub
  # ────────────────────────────────────
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --save 60 1 --maxmemory 256mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s

  # ────────────────────────────────────
  # NetBox
  # ────────────────────────────────────
  netbox:
    image: netboxcommunity/netbox:v4.3-latest
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      DB_HOST: postgres
      DB_NAME: netbox
      DB_USER: netbox
      DB_PASSWORD: ${POSTGRES_PASSWORD}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      SECRET_KEY: ${NETBOX_SECRET_KEY}
      SUPERUSER_NAME: admin
      SUPERUSER_EMAIL: admin@otlab.local
      SUPERUSER_PASSWORD: ${NETBOX_ADMIN_PASSWORD}
      ALLOWED_HOSTS: "localhost netbox 127.0.0.1"
    ports:
      - "8000:8080"
    volumes:
      - netbox_media:/opt/netbox/netbox/media
      - netbox_reports:/opt/netbox/netbox/reports
    restart: unless-stopped

  netbox-worker:
    image: netboxcommunity/netbox:v4.3-latest
    depends_on:
      - netbox
    command: /opt/netbox/venv/bin/python /opt/netbox/netbox/manage.py rqworker
    environment:
      DB_HOST: postgres
      DB_NAME: netbox
      DB_USER: netbox
      DB_PASSWORD: ${POSTGRES_PASSWORD}
      REDIS_HOST: redis
      SECRET_KEY: ${NETBOX_SECRET_KEY}
    restart: unless-stopped

  # ────────────────────────────────────
  # Neo4j
  # ────────────────────────────────────
  neo4j:
    image: neo4j:5.24-community
    restart: unless-stopped
    environment:
      NEO4J_AUTH: neo4j/${NEO4J_PASSWORD}
      NEO4J_PLUGINS: '["apoc", "graph-data-science"]'
      NEO4J_dbms_security_procedures_unrestricted: "apoc.*,gds.*"
      NEO4J_dbms_memory_heap_initial__size: "512m"
      NEO4J_dbms_memory_heap_max__size: "2G"
      NEO4J_dbms_memory_pagecache_size: "512m"
    ports:
      - "7474:7474"    # HTTP / Browser
      - "7687:7687"    # Bolt protocol
    volumes:
      - neo4j_data:/data
      - neo4j_logs:/logs
      - neo4j_plugins:/plugins
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:7474"]
      interval: 30s
      timeout: 10s
      retries: 5

  # ────────────────────────────────────
  # FastAPI Backend
  # ────────────────────────────────────
  api:
    build:
      context: ./services/api
      dockerfile: Dockerfile
    depends_on:
      postgres:
        condition: service_healthy
      neo4j:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      NETBOX_URL: http://netbox:8080
      NETBOX_TOKEN: ${NETBOX_API_TOKEN}
      NEO4J_URI: bolt://neo4j:7687
      NEO4J_USER: neo4j
      NEO4J_PASSWORD: ${NEO4J_PASSWORD}
      PG_URL: postgresql://netbox:${POSTGRES_PASSWORD}@postgres:5432/otdiagram_layouts
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "8001:8001"
    volumes:
      - ./data/dexpi:/app/data/dexpi   # Mount DEXPI XML files
      - ./data/threat-models:/app/data/threat-models
    restart: unless-stopped
    command: uvicorn main:app --host 0.0.0.0 --port 8001 --workers 2

  celery:
    build:
      context: ./services/api
      dockerfile: Dockerfile
    depends_on:
      - api
    command: celery -A tasks.sync_tasks worker --loglevel=info
    environment:
      NETBOX_URL: http://netbox:8080
      NETBOX_TOKEN: ${NETBOX_API_TOKEN}
      NEO4J_URI: bolt://neo4j:7687
      NEO4J_USER: neo4j
      NEO4J_PASSWORD: ${NEO4J_PASSWORD}
      REDIS_URL: redis://redis:6379
    restart: unless-stopped

  # ────────────────────────────────────
  # Vite React Frontend (dev mode)
  # ────────────────────────────────────
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./frontend/src:/app/src  # Hot reload
    environment:
      VITE_API_URL: http://localhost:8001
    depends_on:
      - api

volumes:
  postgres_data:
  redis_data:
  neo4j_data:
  neo4j_logs:
  neo4j_plugins:
  netbox_media:
  netbox_reports:
```
### 19.2 .env Template
```bash
# .env (never commit — add to .gitignore)
POSTGRES_PASSWORD=change_me_strong_password
NETBOX_SECRET_KEY=change_me_50_char_random_string
NETBOX_ADMIN_PASSWORD=admin_password
NETBOX_API_TOKEN=    # generated after first NetBox startup
NEO4J_PASSWORD=change_me_neo4j_password
JWT_SECRET=change_me_jwt_secret_256bit
```
### 19.3 FastAPI Dockerfile
```dockerfile
# services/api/Dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install uv for fast dependency installation
RUN pip install uv

COPY pyproject.toml .
COPY uv.lock* .

RUN uv pip install --system -r pyproject.toml

COPY . .

EXPOSE 8001
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
```

***
## 20. Implementation Plan & Sprint Schedule
### 20.1 Pre-Sprint: Environment Setup (Week 0)
| Task | Owner | Days |
|---|---|---|
| Git repository setup with branch protection rules | DevOps | 0.5 |
| Docker Compose stack running (all services healthy) | All devs | 1 |
| NetBox initial data load (devices, sites, racks) | Network Eng | 1 |
| NetBox custom fields creation (`init_netbox_custom_fields.py`) | Backend Dev | 0.5 |
| Neo4j constraints and indexes initialized | Backend Dev | 0.5 |
| First pynetbox bulk sync to Neo4j | Backend Dev | 0.5 |
| Vite frontend scaffold + Tailwind configured | Frontend Dev | 0.5 |
| Team API token distribution and auth setup | DevOps | 0.5 |
### 20.2 Sprint 1 (Weeks 1–2): Data Foundation
**Goal:** NetBox ↔ Neo4j sync working end-to-end with webhook real-time updates.

| Feature | Component | Story Points |
|---|---|---|
| FastAPI app skeleton with all routers | Backend | 3 |
| pynetbox bulk import endpoint (`/api/assets/sync`) | Backend | 3 |
| Neo4j MERGE upsert for Device/Zone/Conduit nodes | Backend | 3 |
| NetBox webhook receiver + Neo4j relay | Backend | 5 |
| WebSocket connection manager + Redis pub/sub | Backend | 5 |
| GET /api/assets with Purdue level filtering | Backend | 2 |
| GET /api/topology (zone/conduit graph) | Backend | 3 |
| JWT authentication middleware | Backend | 3 |
### 20.3 Sprint 2 (Weeks 3–4): P&ID Pipeline
**Goal:** DEXPI Proteus XML ingested and rendered as interactive P&ID in React.

| Feature | Component | Story Points |
|---|---|---|
| pyDEXPI XML → NetworkX → Neo4j pipeline | Backend | 8 |
| DEXPI ↔ NetBox tag cross-reference linker | Backend | 5 |
| POST /api/pid/ingest endpoint | Backend | 3 |
| GET /api/pid/{unit} → ReactFlow JSON | Backend | 3 |
| PIDEquipment custom React node | Frontend | 5 |
| P&ID canvas with ELK.js auto-layout | Frontend | 8 |
| P&ID connection types (pipe, instrument line, signal) | Frontend | 3 |
### 20.4 Sprint 3 (Weeks 5–6): Network Topology Canvas
**Goal:** Drag-and-drop OT topology canvas with Purdue model visualization.

| Feature | Component | Story Points |
|---|---|---|
| Zustand diagram store implementation | Frontend | 5 |
| OTDevice custom React node with Purdue colors + SL badge | Frontend | 5 |
| Zone node (container/group) implementation | Frontend | 5 |
| Asset inventory sidebar with drag-and-drop | Frontend | 8 |
| ELK.js Purdue-model hierarchical auto-layout | Frontend | 5 |
| useAutoLayout hook (topology + P&ID + threat modes) | Frontend | 3 |
| Node detail panel (NetBox data + SL + DEXPI link) | Frontend | 5 |
### 20.5 Sprint 4 (Weeks 7–8): Threat Modeling Layer
**Goal:** OWASP Threat Dragon integration with Neo4j-backed STRIDE analysis.

| Feature | Component | Story Points |
|---|---|---|
| Threat Dragon JSON V2 ingestion → Neo4j | Backend | 8 |
| GET /api/threats/device/{netbox_id} | Backend | 3 |
| GET /api/threats/blast-radius/{netbox_id} | Backend | 5 |
| ThreatComponent custom React node | Frontend | 5 |
| Blast radius visualization (reagraph highlight) | Frontend | 8 |
| IEC 62443 SL gap analysis panel | Frontend | 5 |
| STRIDE threat badge overlays on device nodes | Frontend | 3 |
### 20.6 Sprint 5 (Weeks 9–10): Persistence, Icons & Polish
**Goal:** Diagram save/load, industrial icon library, WebGL topology view, production hardening.

| Feature | Component | Story Points |
|---|---|---|
| Diagram save/load to PostgreSQL | Backend + Frontend | 8 |
| Diagram versioning + audit log | Backend | 5 |
| Industrial SVG icon library integration (300+ icons) | Frontend | 5 |
| reagraph WebGL topology view (large network support) | Frontend | 5 |
| WebSocket live update in React (useWebSocket hook) | Frontend | 5 |
| Minimap + canvas toolbar (zoom, fit, auto-layout button) | Frontend | 3 |
| Production Docker build (multi-stage, Nginx) | DevOps | 5 |
| Integration test suite | QA | 8 |

***
## 21. Testing Strategy
### 21.1 Backend Tests (pytest + pytest-asyncio)
```python
# services/api/tests/test_neo4j_service.py
import pytest
from services.neo4j_service import upsert_device_node, get_blast_radius

@pytest.mark.asyncio
async def test_device_upsert_creates_node():
    device = {
        "netbox_id": "test-001",
        "name": "TEST-PLC-01",
        "purdue_level": "L2",
        "iec62443_sl": 2,
        "criticality": "High",
    }
    await upsert_device_node(device)
    # Verify node exists
    # ...

@pytest.mark.asyncio
async def test_blast_radius_returns_reachable_devices():
    result = await get_blast_radius("test-001", max_hops=3)
    assert isinstance(result, list)
    # All results should have required fields
    for r in result:
        assert "device_id" in r
        assert "hops" in r
```
### 21.2 Frontend Tests (Vitest + Testing Library)
```typescript
// src/components/canvas/nodes/OTDeviceNode.test.tsx
import { render, screen } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';
import OTDeviceNode from './OTDeviceNode';

const mockData = {
  netboxId: 'test-001',
  name: 'PLC-UNIT-01',
  deviceType: 'plc',
  purdueLevel: 'L2' as const,
  iec62443SlTarget: 2 as const,
  criticality: 'High' as const,
  manufacturer: 'Siemens',
  site: 'Plant A',
};

test('renders device name and Purdue level badge', () => {
  render(
    <ReactFlowProvider>
      <OTDeviceNode id="test-001" data={mockData} selected={false}
                   type="otDevice" dragging={false} isConnectable={true}
                   positionAbsoluteX={0} positionAbsoluteY={0} zIndex={0} />
    </ReactFlowProvider>
  );
  expect(screen.getByText('PLC-UNIT-01')).toBeInTheDocument();
  expect(screen.getByText('L2')).toBeInTheDocument();
  // SL badge shows '2'
  expect(screen.getByTitle('IEC 62443 SL-2')).toBeInTheDocument();
});
```
### 21.3 End-to-End Tests (Playwright)
```typescript
// e2e/topology-canvas.spec.ts
import { test, expect } from '@playwright/test';

test('user can drag device from sidebar to canvas', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Login
  await page.fill('[data-testid=username]', 'testuser');
  await page.fill('[data-testid=password]', 'testpass');
  await page.click('[data-testid=login-btn]');

  // Wait for sidebar to load
  await expect(page.locator('[data-testid=asset-sidebar]')).toBeVisible();

  // Find a device in L2
  const device = page.locator('[data-testid=asset-item]').first();
  const canvas = page.locator('.react-flow');

  // Drag and drop
  await device.dragTo(canvas);

  // Verify node appears on canvas
  await expect(page.locator('.react-flow__node')).toHaveCount(1);
});
```

***
## 22. Security & Access Control
### 22.1 JWT Authentication
```python
# services/api/dependencies.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from config import settings

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"user_id": user_id, "roles": payload.get("roles", [])}
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

def require_role(role: str):
    def checker(user = Depends(get_current_user)):
        if role not in user.get("roles", []):
            raise HTTPException(status_code=403, detail=f"Role '{role}' required")
        return user
    return checker
```
### 22.2 Security Checklist for Production
- [ ] All API endpoints require JWT authentication (no anonymous access)
- [ ] NetBox API token stored in Docker secret, not environment variable
- [ ] Neo4j password rotated from default; Bolt port not exposed externally
- [ ] PostgreSQL diagrams DB uses separate credentials from NetBox DB
- [ ] Nginx or Traefik configured with TLS; all HTTP redirects to HTTPS
- [ ] NetBox webhook HMAC-SHA512 signatures verified on every webhook
- [ ] Content Security Policy (CSP) headers configured to prevent XSS
- [ ] Rate limiting on `/api/` endpoints (via Nginx `limit_req_zone`)
- [ ] Regular backup schedule for PostgreSQL and Neo4j volumes
- [ ] Docker secrets for all credentials (not `.env` files in production)
- [ ] Network segmentation: diagram tool accessible only from OT security VLAN

***
## 23. License Risk Summary (ICE)
**ICE Score** = Impact (of license violation) × Confidence (of compliance) × Ease (of replacement)

| Library | License | Use | Risk Level | Notes |
|---|---|---|---|---|
| `@xyflow/react` | MIT | Primary canvas | 🟢 Very Low | No copyleft; attribution required in UI[^15] |
| `zustand` | MIT | State management | 🟢 Very Low | Pure MIT[^21] |
| `reagraph` | Apache-2.0 | WebGL topology | 🟢 Very Low | No copyleft[^17] |
| `react-cytoscapejs` | MIT | NetworkX bridge | 🟢 Very Low | Pure MIT[^18] |
| `elkjs` | EPL-2.0 | Auto-layout | 🟡 Low-Medium | Weak copyleft; internal tooling use acceptable[^19] |
| `tailwindcss` | MIT | Styling | 🟢 Very Low | Pure MIT |
| `FastAPI` | MIT | API framework | 🟢 Very Low | Pure MIT[^9] |
| `pynetbox` | Apache-2.0 | NetBox client | 🟢 Very Low | No copyleft[^10] |
| `pyDEXPI` | MIT | P&ID parser | 🟢 Very Low | Pure MIT[^1] |
| `networkx` | BSD | Graph computation | 🟢 Very Low | BSD-3[^11] |
| `neo4j-python-driver` | Apache-2.0 | Graph DB client | 🟢 Very Low | No copyleft |
| `neomodel` | MIT | Graph ORM | 🟢 Very Low | Pure MIT[^12] |
| `OWASP Threat Dragon` | Apache-2.0 | Threat modeling | 🟢 Very Low | No copyleft; JSON schema open[^4] |
| `Neo4j Community` | GPL-3.0 | Graph database | 🟡 Medium | Binary is GPL; client apps are exempt via network boundary. Not redistributed. |
| `NetBox` | Apache-2.0 | Asset inventory | 🟢 Very Low | Apache-2.0; self-hosted[^3] |
| `antvis/x6` | MIT | Alt diagram engine | 🟢 Very Low | Pure MIT[^34] |

> **Action Required:** Confirm with legal counsel that Neo4j Community GPL-3.0 usage in a self-hosted, non-redistributed internal tool is compliant with your organization's OSS policy. If in doubt, evaluate Neo4j Enterprise or an Apache-2.0 alternative such as Memgraph or Apache AGE.

***
## 24. Reference Index
| Topic | Reference |
|---|---|
| React Flow v12 documentation | https://reactflow.dev/learn |
| React Flow TypeScript guide | https://reactflow.dev/learn/advanced-use/typescript |
| React Flow + ELK.js example | https://reactflow.dev/examples/layout/elkjs |
| React Flow auto-layout hook | https://reactflow.dev/examples/layout/auto-layout |
| React Flow Zustand state management | https://reactflow.dev/learn/advanced-use/state-management |
| ELK.js GitHub | https://github.com/kieler/elkjs |
| Eclipse ELK documentation | https://eclipse.dev/elk/ |
| reagraph GitHub | https://github.com/reaviz/reagraph |
| pyDEXPI GitHub | https://github.com/process-intelligence-research/pyDEXPI |
| pyDEXPI documentation | https://www.pi-research.org/software/pydexpi/ |
| NetworkX Cytoscape export | https://networkx.org/documentation/stable/reference/readwrite/generated/networkx.readwrite.json_graph.cytoscape_data.html |
| pynetbox documentation | https://pynetbox.readthedocs.io/ |
| NetBox REST API | https://netboxlabs.com/docs/netbox/integrations/ |
| NetBox GraphQL API | https://netboxlabs.com/docs/netbox/integrations/graphql-api/ |
| NetBox Custom Fields | https://netboxlabs.com/docs/netbox/customization/custom-fields/ |
| NetBox Webhooks | https://netboxlabs.com/docs/netbox/integrations/webhooks/ |
| NetBox Docker | https://github.com/netbox-community/netbox-docker |
| Neo4j Network Management Example | https://github.com/neo4j-graph-examples/network-management |
| Neo4j GDS Shortest Path | https://neo4j.com/docs/graph-data-science/current/alpha-algorithms/shortest-path/ |
| django-neomodel | https://github.com/neo4j-contrib/django-neomodel |
| OWASP Threat Dragon | https://github.com/OWASP/threat-dragon |
| Threat Dragon JSON Schema | https://www.threatdragon.com/docs/development/schema.html |
| FastAPI WebSockets | https://fastapi.tiangolo.com/advanced/websockets/ |
| Zustand + React Flow | https://www.synergycodes.com/webbook/webbook-react-flow-state-management |
| Vite project structure | https://www.thatsoftwaredude.com/content/14110/creating-a-good-folder-structure-for-your-vite-app |
| Tailwind CSS | https://tailwindcss.com/docs |
| AggreGate SCADA Symbol Library | https://aggregate.digital/products/scada-hmi/symbol-library.html |
| Open Automation Software Symbols | https://openautomationsoftware.com/downloads/manufacturing-symbols/ |
| react-cytoscapejs | https://github.com/plotly/react-cytoscapejs |
| IEC 62443 Zone/Conduit Design Guide | https://www.linkedin.com/pulse/engineering-guide-how-design-zones-conduits-following-herrera-lara-uy6ff |
| DEXPI preHAZOP paper | https://dexpi.org/wp-content/uploads/2020/09/PAAT2022_Oeing_preHAZOP_DEXPI_Homepage.pdf |
| P&ID AI autocorrection paper (arXiv) | https://arxiv.org/html/2502.18493v1 |

---

## References

1. [pyDEXPI is an open-source Python tool for the DEXPI ... - GitHub](https://github.com/process-intelligence-research/pyDEXPI) - pyDEXPI implements a parser to a graph representation of Piping and Instrumentation Diagrams (P&IDs)...

2. [pyDEXPI - An open-source tool in Python that implements the DEXPI ...](https://www.pi-research.org/software/pydexpi/) - pyDEXPI implements a parser to a graph representation of Piping and Instrumentation Diagrams (P&IDs)...

3. [API & Integration | NetBox Documentation](https://netboxlabs.com/docs/v4.2/netbox/features/api-integration/) - NetBox also provides a GraphQL API to complement its REST API. GraphQL enables complex queries for a...

4. [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/) - What is Threat Dragon? OWASP Threat Dragon is a modeling tool used to create threat model diagrams a...

5. [neo4j-graph-examples/network-management - GitHub](https://github.com/neo4j-graph-examples/network-management) - Network Management Graph Example. Description: Dependency and root cause analysis and more for netwo...

6. [GitHub | Artur Schweidtmann | 10 comments - LinkedIn](https://www.linkedin.com/posts/schweidtmann_github-process-intelligence-researchpydexpi-activity-7450902508907945986-83MD) - I'm thinking of using pyDEXPI to parse P&IDs into structured graph/data, then letting an LLM query t...

7. [Organize your Network with NETBOX, The Network Source of Truth](https://www.youtube.com/watch?v=p3J3f2QWFGE) - Today I'm diving into Netbox, a tool designed to help you keep track of your network infrastructure....

8. [NetBox Docker Deployment – Local & Dev-Ready Setup in 2025](https://netodata.io/netbox-docker-deployment-local-dev-ready-setup-in-2025/) - Whether you're setting up a local instance or preparing for production, a netbox docker deployment g...

9. [WebSockets - FastAPI](https://fastapi.tiangolo.com/advanced/websockets/) - The app above is a minimal and simple example to demonstrate how to handle and broadcast messages to...

10. [TL;DR — pynetbox 6.6.2 documentation](https://pynetbox.readthedocs.io/en/v6.6.2/) - Creates an API token using a valid NetBox username and password. Saves the created token automatical...

11. [networkx - PyPI](https://pypi.org/project/networkx/) - NetworkX is a Python package for the creation, manipulation, and study of the structure, dynamics, a...

12. [neo4j-contrib/django-neomodel - GitHub](https://github.com/neo4j-contrib/django-neomodel) - Django Neomodel (beta!) neomodel This module allows you to use the neo4j graph database with Django ...

13. [Next.js or Vite.js: Which Framework is Better, and When? - Rollbar](https://rollbar.com/blog/nextjs-vs-vitejs/) - Next.js excels in server-side rendering for SEO and fast load times, while Vite.js offers rapid deve...

14. [Usage with TypeScript - React Flow](https://reactflow.dev/learn/advanced-use/typescript) - Custom nodes. When working with custom nodes you have the possibility to pass a custom Node type (or...

15. [React Flow: Node-Based UIs in React](https://reactflow.dev) - Wire your ideas with React Flow. A customizable React component for building node-based editors and ...

16. [React Flow 12 release - xyflow](https://xyflow.com/blog/react-flow-12-release) - React Flow 12 is here, and the main features are. Server side rendering support; Hooks and helpers f...

17. [GitHub - reaviz/reagraph: WebGL Graph Visualizations for React ...](https://github.com/reaviz/reagraph) - Reagraph is a high-performance network graph ... Reaflow - Open-source library for workflow and diag...

18. [plotly/react-cytoscapejs: React component for Cytoscape.js ... - GitHub](https://github.com/plotly/react-cytoscapejs) - The react-cytoscapejs package is an MIT-licensed React component for network (or graph, as in graph ...

19. [kieler/elkjs: ELK's layout algorithms for JavaScript - GitHub](https://github.com/kieler/elkjs) - The Eclipse Layout Kernel (ELK) implements an infrastructure to connect diagram editors or viewers t...

20. [Elkjs Tree - React Flow](https://reactflow.dev/examples/layout/elkjs) - This example shows how you can integrate elkjs with React Flow for more advanced tree layouts. The c...

21. [Using a State Management Library - React Flow](https://reactflow.dev/learn/advanced-use/state-management) - In this guide, we explain how to use React Flow with the state management library Zustand. We will b...

22. [A better way to manage state in React Flow with Zustand - YouTube](https://www.youtube.com/watch?v=41FsulrcrQg) - ... Store-Actions pattern, a setup that makes your codebase easier to scale, navigate, and maintain....

23. [TailAdmin: Free Tailwind CSS Admin Dashboard Template](https://tailadmin.com) - TailAdmin is a Tailwind CSS-based Admin Dashboard Template that provides developers with everything ...

24. [PostgreSQL Database Installation | NetBox Documentation](https://netboxlabs.com/docs/v4.4/netbox/installation/postgresql/) - NetBox requires PostgreSQL 14 or later. Please note that MySQL and other relational databases are no...

25. [Custom Fields | NetBox Documentation](https://netboxlabs.com/docs/netbox/customization/custom-fields/) - You can create a custom field to hold this data. Within the database, custom fields are stored as JS...

26. [Webhooks | NetBox Documentation](https://netboxlabs.com/docs/netbox/integrations/webhooks/) - NetBox can be configured via Event Rules to transmit outgoing webhooks to remote systems in response...

27. [Webbook - React Flow state management - Synergy Codes](https://www.synergycodes.com/webbook/webbook-react-flow-state-management) - For React Flow, Zustand ... In short – if you want full encapsulation of state and logic, follow Zus...

28. [Schema | Threat Dragon version 2.6.2 Documentation](https://www.threatdragon.com/docs/development/schema.html) - Threat Model Schema. The original schema for Threat Dragon models conforms to JSON Schema standard. ...

29. [Auto Layout - React Flow](https://reactflow.dev/examples/layout/auto-layout) - This example demonstrates how to automatically arrange nodes. It introduces a reusable useAutoLayout...

30. [Reagraph - a high-performance network graph visualization built in ...](https://reagraph.dev) - Reagraph is a high-performance network graph visualization built in WebGL for React with 2D & 3D sup...

31. [AggreGate SCADA/HMI Symbol Library](https://aggregate.digital/products/scada-hmi/symbol-library.html) - AggreGate SCADA/HMI distribution includes a large automation and control symbol library. The symbols...

32. [Free Manufacturing Symbols - Open Automation Software](https://openautomationsoftware.com/downloads/manufacturing-symbols/) - Over 600 conveyor symbols that can be used to create graphical user interface applications for produ...

33. [draw.io Integrations](https://www.drawio.com/integrations) - Open-source icon libraries that work with the draw.io web app for life science illustrations and dia...

34. [X6: Graph Editing and Visualization Engine - GitHub](https://github.com/antvis/x6) - AntV X6 is a graph editing engine based on HTML and SVG, providing low-cost customization capabiliti...

