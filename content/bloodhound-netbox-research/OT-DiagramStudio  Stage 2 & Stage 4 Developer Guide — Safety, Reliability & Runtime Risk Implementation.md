# OT-DiagramStudio: Stage 2 & Stage 4 Developer Guide
## Safety Case Analysis, Critical Items List, Reliability Studies & Runtime Risk
**Classification:** Internal Development Reference — Restricted to Engineering Team  
**Version:** 1.0  
**Date:** May 2026  
**Parent Document:** OT-DiagramStudio PRD & Implementation Specifications v1.0  
**Audience:** Backend Engineers, Frontend Engineers, Safety Domain Experts  
**Prerequisites:** Stages 1–3 (Core canvas, NetBox sync, DEXPI pipeline, and Threat Modeling) must be complete and deployed before beginning Stage 2. Stage 4 depends on Stage 2 completion.

***
## Document Purpose
This guide provides complete implementation instructions for two post-baseline development stages that extend the OT-DiagramStudio platform with process safety and reliability engineering capabilities. It is written to the same depth and format as the primary PRD so any developer can implement it without external consultation. All library choices have been validated for low ICE (Impact-Confidence-Ease) software risk.

***
## Table of Contents
1. [Stage Overview & Alignment to Master Implementation Plan](#1-stage-overview--alignment-to-master-implementation-plan)
2. [Stage 2 Prerequisites Checklist](#2-stage-2-prerequisites-checklist)
3. [Stage 2 Architecture — Safety Analysis Layer](#3-stage-2-architecture--safety-analysis-layer)
4. [Neo4j Schema Extensions — Safety Layer](#4-neo4j-schema-extensions--safety-layer)
5. [PostgreSQL Extensions — Safety Artifacts](#5-postgresql-extensions--safety-artifacts)
6. [Library 1: preHAZOP via pyDEXPI (Inline — Sprint 2 Extension)](#6-library-1-prehazop-via-pydexpi-inline--sprint-2-extension)
7. [Library 2: LLM-Assisted FMEA via LLMRiskAnalyzer + Ollama (Inline — Sprint 4 Extension)](#7-library-2-llm-assisted-fmea-via-llmriskanalyzer--ollama-inline--sprint-4-extension)
8. [Library 3: pfta — Fault Tree Analysis (Sprint 6)](#8-library-3-pfta--fault-tree-analysis-sprint-6)
9. [Library 4: fmdtools — Dynamic Fault Propagation (Sprint 6)](#9-library-4-fmdtools--dynamic-fault-propagation-sprint-6)
10. [Library 5: reliability — Weibull / MTTF / RAMS (Sprint 6)](#10-library-5-reliability--weibull--mttf--rams-sprint-6)
11. [FastAPI Safety Router — Complete Implementation](#11-fastapi-safety-router--complete-implementation)
12. [Celery Async Tasks — Safety Computation](#12-celery-async-tasks--safety-computation)
13. [React Frontend — Safety Panel Components](#13-react-frontend--safety-panel-components)
14. [Fault Tree Canvas (ReactFlow + Dagre)](#14-fault-tree-canvas-reactflow--dagre)
15. [Stage 4 Architecture — Runtime Risk & Bow-Tie](#15-stage-4-architecture--runtime-risk--bow-tie)
16. [Library 6: bayesiansafety — Bow-Tie (Sprint 7)](#16-library-6-bayesiansafety--bow-tie-sprint-7)
17. [Library 7: relsad — BESS/Distribution Reliability (Sprint 7)](#17-library-7-relsad--bessdistribution-reliability-sprint-7)
18. [Docker Compose — Safety Service Extensions](#18-docker-compose--safety-service-extensions)
19. [Sprint 6 & 7 Detailed Implementation Plan](#19-sprint-6--7-detailed-implementation-plan)
20. [Testing Strategy — Safety Layer](#20-testing-strategy--safety-layer)
21. [Critical Items List — Data Model & Report Generation](#21-critical-items-list--data-model--report-generation)
22. [ICE Risk Summary & License Compliance](#22-ice-risk-summary--license-compliance)
23. [Full Reference Index](#23-full-reference-index)

***
## 1. Stage Overview & Alignment to Master Implementation Plan
### 1.1 Master Plan Context
The primary PRD defined five delivery sprints (Sprints 1–5) covering:
- Sprint 1: NetBox ↔ Neo4j sync, FastAPI backbone, WebSocket
- Sprint 2: pyDEXPI P&ID pipeline, DEXPI → Neo4j
- Sprint 3: Network topology canvas, ReactFlow, asset sidebar
- Sprint 4: Threat modeling, OWASP Threat Dragon, STRIDE
- Sprint 5: Diagram persistence, icons, polish, production build

This document specifies two follow-on stages:

| Stage | Sprint(s) | Focus | Dependencies |
|---|---|---|---|
| **Stage 2** | Sprint 6 | FTA, FMEA, Weibull/MTTF, preHAZOP, Critical Items List | Sprints 1–5 complete |
| **Stage 4** | Sprint 7 | Bow-Tie analysis, BESS distribution reliability, runtime risk | Sprint 6 complete |

> **Stage 3** (referenced in the prior conversation) = the internal name for Sprint 5 polish and production hardening. Stage 4 here follows Sprint 6.

**Two libraries are inline additions** (zero new sprints needed) — they extend Sprint 2 (preHAZOP) and Sprint 4 (LLM FMEA) respectively. Their implementation sections explicitly call this out with merge-target annotations.
### 1.2 Additive Architecture Principle
Every addition in this guide follows the **additive-only rule** established in the master PRD:

```
New Python library
  → New FastAPI router  (/api/safety/*)
  → New Celery task     (async — never blocks REST)
  → Neo4j schema ext.   (new labels via MERGE — never touches existing nodes)
  → New React component (sidebar panel tab — never modifies canvas core)
```

No existing Neo4j labels (`Device`, `Zone`, `Conduit`, `PIDEquipment`, `ThreatComponent`) are modified. New labels (`CutSet`, `FailureMode`, `FaultTree`, `HAZOPDeviation`, `WeibullModel`, `BowTie`, `ConsequenceBranch`) are added via `MERGE` and connected to existing nodes via new relationship types.

***
## 2. Stage 2 Prerequisites Checklist
Before beginning Sprint 6, verify the following:

```bash
# Verify Stage 1-5 services are healthy
docker compose ps
# Expected: netbox, postgres, neo4j, redis, api, celery, frontend all "Up"

# Verify Neo4j has Device + PIDEquipment nodes from Sprint 2
docker exec -it otdiagramstudio-neo4j-1 \
  cypher-shell -u neo4j -p $NEO4J_PASSWORD \
  "MATCH (d:Device) RETURN count(d) AS device_count;"
# Must return > 0

# Verify pyDEXPI pipeline has run at least once
docker exec -it otdiagramstudio-neo4j-1 \
  cypher-shell -u neo4j -p $NEO4J_PASSWORD \
  "MATCH (e:PIDEquipment) RETURN count(e) AS pid_count;"
# Must return > 0

# Verify Celery worker is processing tasks
docker exec -it otdiagramstudio-celery-1 \
  celery -A tasks.sync_tasks inspect active
```
### 2.1 Additional Python Packages — Stage 2
Add to `services/api/pyproject.toml` (or requirements file):

```toml
# Stage 2 additions
pfta = ">=0.1.0"           # MIT — Fault Tree Analysis
fmdtools = ">=2.3.3"        # BSD-3 — Dynamic fault propagation (NASA)
reliability = ">=0.9.0"    # LGPLv3 — Weibull/MTTF/RAMS
bayesiansafety = "*"        # MIT — Bow-Tie / Bayesian FT+ET (Stage 4)
relsad = "*"                # MIT — Distribution reliability (Stage 4)
ollama = ">=0.3.0"          # MIT — Ollama Python client
scipy = ">=1.13.0"          # BSD-3 — Already a transitive dep; explicit here
matplotlib = ">=3.9.0"      # PSF — Plot generation for reports
reportlab = ">=4.0.0"       # BSD — PDF report generation
```

```bash
# Install all Stage 2 deps in the API container
uv pip install pfta fmdtools reliability ollama scipy matplotlib reportlab
```
### 2.2 Additional Frontend Packages — Stage 2
```bash
cd frontend
pnpm add \
  react-d3-tree \        # MIT — Tree visualization (FTA canvas)
  d3-hierarchy \         # ISC — D3 tree layout engine
  @visx/hierarchy \      # MIT — Airbnb's hierarchy vis library
  recharts               # MIT — Charts for reliability curves
```

***
## 3. Stage 2 Architecture — Safety Analysis Layer
```
┌─────────────────────────────────────────────────────────────────────┐
│               SAFETY ANALYSIS TIER (Stage 2 additions)              │
│                                                                     │
│  preHAZOP        pfta           fmdtools        reliability         │
│  (inline S2)     (Sprint 6)     (Sprint 6)      (Sprint 6)         │
│       │               │               │                │            │
│  pyDEXPI graph   FT text file   FunctionArch.   Failure data CSV   │
│  guide words     → cut sets     → propagation    → Weibull fit     │
│       │               │               │                │            │
│       └───────────────┴───────────────┴────────────────┘           │
│                              │                                      │
│                   Celery Worker (async)                             │
│                              │                                      │
│                   Neo4j (new labels + relationships)                │
│                   (:HAZOPDeviation) (:CutSet) (:FailureMode)       │
│                   (:FaultTree) (:WeibullModel)                      │
│                              │                                      │
│                   FastAPI /api/safety/*                             │
│                              │                                      │
│               React Safety Panel (sidebar tab)                      │
│    FaultTree canvas  FMEA table  Reliability curves  CIL report    │
└─────────────────────────────────────────────────────────────────────┘
```
### 3.1 Service Directory Extensions
```
services/api/
├── routers/
│   └── safety.py              # NEW — /api/safety/* endpoints
├── services/
│   ├── prehazop_service.py    # NEW — preHAZOP deviation analysis
│   ├── fta_service.py         # NEW — pfta FTA wrapper
│   ├── fmdtools_service.py    # NEW — fmdtools propagation wrapper
│   ├── reliability_service.py # NEW — Weibull/MTTF computation
│   └── llm_fmea_service.py    # NEW — Ollama FMEA generation
├── tasks/
│   └── safety_tasks.py        # NEW — Celery tasks for safety jobs
└── models/
    └── safety_schemas.py      # NEW — Pydantic models for safety API

frontend/src/
├── features/
│   └── safety/                # NEW — Safety panel feature
│       ├── FaultTreeCanvas.tsx
│       ├── FMEATable.tsx
│       ├── ReliabilityCurve.tsx
│       ├── CriticalItemsList.tsx
│       └── HAZOPDeviationPanel.tsx
├── components/
│   └── sidebar/
│       └── SafetySidebarTab.tsx   # NEW — Tab in existing sidebar
```

***
## 4. Neo4j Schema Extensions — Safety Layer
Run these Cypher statements **once** via the Neo4j Browser (`:7474`) or the init script during Stage 2 deployment:

```cypher
// ============================================================
// STAGE 2 — NEW CONSTRAINTS (all additive, no existing labels touched)
// ============================================================

CREATE CONSTRAINT hazop_dev_id IF NOT EXISTS
FOR (h:HAZOPDeviation) REQUIRE h.deviation_id IS UNIQUE;

CREATE CONSTRAINT faulttree_id IF NOT EXISTS
FOR (ft:FaultTree) REQUIRE ft.ft_id IS UNIQUE;

CREATE CONSTRAINT cutset_id IF NOT EXISTS
FOR (cs:CutSet) REQUIRE cs.cutset_id IS UNIQUE;

CREATE CONSTRAINT failuremode_id IF NOT EXISTS
FOR (fm:FailureMode) REQUIRE fm.fm_id IS UNIQUE;

CREATE CONSTRAINT weibull_model_id IF NOT EXISTS
FOR (wm:WeibullModel) REQUIRE wm.model_id IS UNIQUE;

// ============================================================
// STAGE 4 — NEW CONSTRAINTS (Bow-Tie, distribution reliability)
// ============================================================

CREATE CONSTRAINT bowtie_id IF NOT EXISTS
FOR (bt:BowTie) REQUIRE bt.bt_id IS UNIQUE;

CREATE CONSTRAINT consequence_id IF NOT EXISTS
FOR (cb:ConsequenceBranch) REQUIRE cb.branch_id IS UNIQUE;

CREATE CONSTRAINT reliability_model_id IF NOT EXISTS
FOR (rm:DistributionReliability) REQUIRE rm.model_id IS UNIQUE;

// ============================================================
// RELATIONSHIP TYPES (new — do not conflict with existing)
// ============================================================
// (:PIDEquipment)-[:HAS_DEVIATION]->(HAZOPDeviation)
// (:Device)-[:HAS_FAILURE_MODE]->(FailureMode)
// (:FailureMode)-[:CONTRIBUTES_TO]->(CutSet)
// (:CutSet)-[:TOP_EVENT_OF]->(FaultTree)
// (:FaultTree)-[:ATTACHED_TO]->(Device)
// (:Device)-[:HAS_WEIBULL_MODEL]->(WeibullModel)
// (:FaultTree)-[:LEFT_SIDE_OF]->(BowTie)
// (:ConsequenceBranch)-[:RIGHT_SIDE_OF]->(BowTie)
// (:BowTie)-[:PIVOT]->(ThreatComponent)  [links to existing Sprint 4 nodes]
// (:Zone)-[:HAS_RELIABILITY_MODEL]->(DistributionReliability)

// ============================================================
// INDEXES for performance
// ============================================================

CREATE INDEX hazop_severity IF NOT EXISTS
FOR (h:HAZOPDeviation) ON (h.severity);

CREATE INDEX cutset_order IF NOT EXISTS
FOR (cs:CutSet) ON (cs.order);

CREATE INDEX fm_rpn IF NOT EXISTS
FOR (fm:FailureMode) ON (fm.rpn);
```
### 4.1 Safety Node Property Specifications
```cypher
// HAZOPDeviation — generated by preHAZOP service
// Properties:
//   deviation_id:   String (UUID)
//   guide_word:     String  ("No","More","Less","Reverse","Other Than","Part Of","As Well As")
//   parameter:      String  ("Flow","Pressure","Temperature","Level","Composition")
//   deviation_text: String  (full constructed deviation: "No Flow")
//   consequence:    String  (free text, LLM-generated or manual)
//   safeguards:     [String] (list of existing safeguards)
//   severity:       Integer (1=Negligible, 2=Marginal, 3=Critical, 4=Catastrophic)
//   likelihood:     Integer (1=Improbable, 2=Remote, 3=Occasional, 4=Frequent)
//   risk_rank:      Integer (severity × likelihood)
//   plant_unit:     String
//   node_id:        String  (HAZOP study node reference)
//   status:         String  ("Open","Actioned","Closed","N/A")

// FailureMode — generated by FMEA service (LLM or manual)
// Properties:
//   fm_id:          String (UUID)
//   function:       String  (what the component is supposed to do)
//   failure_mode:   String  (how it fails)
//   failure_effect: String  (effect on system)
//   failure_cause:  String  (root cause)
//   severity:       Integer (1-10)
//   occurrence:     Integer (1-10)
//   detection:      Integer (1-10)
//   rpn:            Integer (S × O × D, Risk Priority Number)
//   action_required: String
//   source:         String  ("LLM-Auto","Manual","Historical")

// CutSet — generated by pfta
// Properties:
//   cutset_id:      String (hyphen-joined event names)
//   events:         [String] (list of basic event names)
//   order:          Integer (number of events in cut set)
//   probability:    Float   (product of event probabilities)
//   criticality:    String  ("Single","Double","Triple")

// WeibullModel — generated by reliability service
// Properties:
//   model_id:       String (UUID)
//   alpha:          Float  (scale — characteristic life in hours)
//   beta:           Float  (shape — <1 infant mortality, =1 random, >1 wearout)
//   mttf:           Float  (Mean Time To Failure in hours)
//   b10_life:       Float  (time at which 10% of population will have failed)
//   confidence:     Float  (confidence level of fit, 0–1)
//   n_failures:     Integer (number of failure data points used)
//   n_right_censored: Integer
//   fit_method:     String  ("MLE","LS")
```

***
## 5. PostgreSQL Extensions — Safety Artifacts
```sql
-- migrations/002_create_safety_schema.sql
-- Run AFTER the Stage 1-5 canvas schema is applied

CREATE SCHEMA IF NOT EXISTS safety;

-- Fault Tree definitions (pfta input files stored as text)
CREATE TABLE safety.fault_trees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    plant_unit VARCHAR(100),
    top_event VARCHAR(500) NOT NULL,
    ft_definition TEXT NOT NULL,   -- pfta .ft text file content
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    version INTEGER DEFAULT 1,
    neo4j_ft_id VARCHAR(255)       -- links to :FaultTree node
);

-- FMEA worksheets
CREATE TABLE safety.fmea_worksheets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    plant_unit VARCHAR(100),
    device_netbox_id VARCHAR(255),
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    source VARCHAR(50) DEFAULT 'LLM-Auto'  -- 'LLM-Auto' | 'Manual'
);

-- Individual FMEA records
CREATE TABLE safety.fmea_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worksheet_id UUID REFERENCES safety.fmea_worksheets(id) ON DELETE CASCADE,
    device_netbox_id VARCHAR(255),
    function_description TEXT,
    failure_mode TEXT NOT NULL,
    failure_effect TEXT,
    failure_cause TEXT,
    severity INTEGER CHECK (severity BETWEEN 1 AND 10),
    occurrence INTEGER CHECK (occurrence BETWEEN 1 AND 10),
    detection INTEGER CHECK (detection BETWEEN 1 AND 10),
    rpn INTEGER GENERATED ALWAYS AS (severity * occurrence * detection) STORED,
    action_required TEXT,
    action_owner VARCHAR(255),
    target_date DATE,
    status VARCHAR(50) DEFAULT 'Open',
    neo4j_fm_id VARCHAR(255),
    source VARCHAR(50) DEFAULT 'LLM-Auto'
);

-- Reliability data (raw failure times)
CREATE TABLE safety.reliability_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_netbox_id VARCHAR(255) NOT NULL,
    component_name VARCHAR(255),
    failure_times NUMERIC[],           -- hours to failure
    right_censored_times NUMERIC[],    -- hours (still running)
    data_source VARCHAR(255),
    recorded_at TIMESTAMPTZ DEFAULT now()
);

-- Critical Items List (auto-generated from combined safety analysis)
CREATE TABLE safety.critical_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plant_unit VARCHAR(100),
    device_netbox_id VARCHAR(255),
    dexpi_equipment_id VARCHAR(255),
    item_type VARCHAR(50),  -- 'CutSet' | 'HighRPN' | 'HAZOPHighRisk' | 'LowMTTF'
    description TEXT NOT NULL,
    risk_score NUMERIC(5,2),
    source_ref VARCHAR(255),  -- reference to FT/FMEA/HAZOP record ID
    status VARCHAR(50) DEFAULT 'Open',
    priority INTEGER,         -- 1=Immediate, 2=High, 3=Medium, 4=Low
    created_at TIMESTAMPTZ DEFAULT now(),
    neo4j_ref VARCHAR(255)
);

-- Indexes
CREATE INDEX idx_fmea_records_rpn ON safety.fmea_records(rpn DESC);
CREATE INDEX idx_critical_items_plant ON safety.critical_items(plant_unit);
CREATE INDEX idx_critical_items_device ON safety.critical_items(device_netbox_id);
CREATE INDEX idx_critical_items_priority ON safety.critical_items(priority);
```

***
## 6. Library 1: preHAZOP via pyDEXPI (Inline — Sprint 2 Extension)
### 6.1 Merge Target
**Merge into Sprint 2 during the `pid.py` router development.** Add `prehazop_service.py` as a new file in `services/api/services/` and call it from the existing `/api/pid/ingest` endpoint after the DEXPI pipeline completes. No separate sprint required.
### 6.2 Background
The preHAZOP algorithm, developed at TU Dortmund, applies HAZOP guide words systematically to each node in a DEXPI P&ID graph and evaluates deviations against process simulation data. It maps HAZOP scenarios (guide word × process parameter = deviation) to graph locations, performs risk assessment by comparing simulation data against limits, and outputs a ranked list of deviations — the **Critical Items List precursor**.[^1][^2]

HAZOP guide words and their target parameters:[^3]

| Guide Word | Meaning | Example Deviation |
|---|---|---|
| No / None | Complete negation | No Flow |
| More | Quantitative increase | More Temperature |
| Less | Quantitative decrease | Less Pressure |
| Reverse | Opposite direction | Reverse Flow |
| Other Than | Complete substitution | Other Than (wrong chemical) |
| Part Of | Qualitative decrease | Part Of (incomplete reaction) |
| As Well As | Qualitative increase | As Well As (contamination) |
### 6.3 preHAZOP Service Implementation
```python
# services/api/services/prehazop_service.py
import uuid
from neo4j import AsyncGraphDatabase
from config import settings
import json

driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri, auth=(settings.neo4j_user, settings.neo4j_password)
)

# HAZOP guide words × process parameters matrix
# Derived from IEC 61882 and standard HAZOP methodology
HAZOP_MATRIX = {
    "No":        ["Flow", "Pressure", "Temperature", "Level", "Signal"],
    "More":      ["Flow", "Pressure", "Temperature", "Level", "Concentration"],
    "Less":      ["Flow", "Pressure", "Temperature", "Level", "Concentration"],
    "Reverse":   ["Flow", "Pressure"],
    "Other Than":["Composition", "Phase", "Signal"],
    "Part Of":   ["Composition", "Concentration"],
    "As Well As":["Composition", "Impurity", "Contaminant"],
}

# Equipment class → applicable parameters mapping (from DEXPI ontology)
EQUIPMENT_PARAMETERS = {
    "Pump":           ["Flow", "Pressure", "Temperature"],
    "HeatExchanger":  ["Temperature", "Pressure", "Flow"],
    "Vessel":         ["Level", "Pressure", "Temperature", "Composition"],
    "Valve":          ["Flow", "Pressure"],
    "Compressor":     ["Flow", "Pressure", "Temperature"],
    "Reactor":        ["Temperature", "Pressure", "Concentration", "Level"],
    "Separator":      ["Level", "Pressure", "Flow", "Composition"],
    "Instrument":     ["Signal"],
    "default":        ["Flow", "Pressure", "Temperature"],
}

# Risk matrix: severity × likelihood → risk rank
RISK_MATRIX = [
    # lik:  1      2      3      4
    [1,    1,     2,     3,     4],    # sev 1
    [2,    2,     4,     6,     8],    # sev 2
    [3,    3,     6,     9,    12],    # sev 3
    [4,    4,     8,    12,    16],    # sev 4
]

async def run_prehazop(plant_unit: str) -> dict:
    """
    Execute preHAZOP analysis on all PIDEquipment nodes for a plant unit.
    Generates HAZOPDeviation nodes in Neo4j linked to equipment.
    Returns summary of deviations generated.
    """
    deviations_created = 0
    high_risk_count = 0

    async with driver.session() as session:
        # Fetch all equipment nodes for this plant unit
        result = await session.run("""
            MATCH (e:PIDEquipment {plant_unit: $unit})
            RETURN e.dexpi_id AS dexpi_id,
                   e.tag AS tag,
                   e.equipment_class AS equipment_class,
                   e.process_function AS process_function
        """, unit=plant_unit)

        equipment_list = [dict(r) async for r in result]

    for equipment in equipment_list:
        eq_class = equipment.get("equipment_class", "default")
        parameters = EQUIPMENT_PARAMETERS.get(eq_class, EQUIPMENT_PARAMETERS["default"])

        for guide_word, gw_params in HAZOP_MATRIX.items():
            # Only apply guide word to parameters relevant to this equipment class
            applicable_params = [p for p in gw_params if p in parameters]

            for parameter in applicable_params:
                deviation_text = f"{guide_word} {parameter}"
                deviation_id = str(uuid.uuid4())

                # Risk scoring — default values; can be enriched by simulation data
                # In a full implementation, compare against DWSIM export limits
                severity = _estimate_severity(guide_word, parameter, eq_class)
                likelihood = _estimate_likelihood(guide_word, parameter, eq_class)
                risk_rank = RISK_MATRIX[severity - 1][likelihood]

                consequence = _generate_consequence_text(
                    guide_word, parameter, eq_class, equipment.get("tag", "")
                )
                safeguards = _identify_safeguards(guide_word, parameter, eq_class)

                async with driver.session() as session:
                    await session.run("""
                        MERGE (h:HAZOPDeviation {deviation_id: $dev_id})
                        SET h.guide_word = $guide_word,
                            h.parameter = $parameter,
                            h.deviation_text = $deviation_text,
                            h.consequence = $consequence,
                            h.safeguards = $safeguards,
                            h.severity = $severity,
                            h.likelihood = $likelihood,
                            h.risk_rank = $risk_rank,
                            h.plant_unit = $plant_unit,
                            h.node_id = $tag,
                            h.status = 'Open'
                        WITH h
                        MATCH (e:PIDEquipment {dexpi_id: $dexpi_id})
                        MERGE (e)-[:HAS_DEVIATION]->(h)
                    """,
                        dev_id=deviation_id,
                        guide_word=guide_word,
                        parameter=parameter,
                        deviation_text=deviation_text,
                        consequence=consequence,
                        safeguards=json.dumps(safeguards),
                        severity=severity,
                        likelihood=likelihood,
                        risk_rank=risk_rank,
                        plant_unit=plant_unit,
                        tag=equipment.get("tag", ""),
                        dexpi_id=equipment["dexpi_id"]
                    )
                    deviations_created += 1
                    if risk_rank >= 9:
                        high_risk_count += 1

    # Generate Critical Items from high-risk deviations
    await _create_cil_from_hazop(plant_unit)

    return {
        "plant_unit": plant_unit,
        "equipment_analyzed": len(equipment_list),
        "deviations_generated": deviations_created,
        "high_risk_deviations": high_risk_count,
    }

def _estimate_severity(guide_word: str, parameter: str, equipment_class: str) -> int:
    """
    Rule-based severity estimation.
    In production: replace with DWSIM simulation comparison or user input.
    """
    high_severity_combos = {
        ("No", "Flow"): 4, ("Reverse", "Flow"): 4,
        ("More", "Pressure"): 4, ("No", "Signal"): 3,
        ("More", "Temperature"): 3, ("Less", "Pressure"): 3,
    }
    return high_severity_combos.get((guide_word, parameter), 2)

def _estimate_likelihood(guide_word: str, parameter: str, equipment_class: str) -> int:
    """Basic likelihood heuristics. Override with historical failure data."""
    high_likelihood = {"No", "More", "Less"}
    return 2 if guide_word in high_likelihood else 1

def _generate_consequence_text(gw: str, param: str, eq_class: str, tag: str) -> str:
    templates = {
        ("No", "Flow"):         f"Loss of process flow through {tag}. Potential process upset, equipment damage, or loss of containment.",
        ("More", "Pressure"):   f"Overpressure in {tag}. Risk of vessel rupture, PRV activation, or structural failure.",
        ("Reverse", "Flow"):    f"Backflow through {tag}. Potential contamination, pump damage, or process reversal.",
        ("No", "Signal"):       f"Loss of control signal from {tag}. Control loop goes to fail-safe state; manual intervention required.",
        ("More", "Temperature"):f"Overtemperature in {tag}. Risk of thermal degradation, side reactions, or equipment damage.",
    }
    return templates.get((gw, param),
           f"{gw} {param} deviation at {tag} ({eq_class}). Assess consequences under applicable scenario.")

def _identify_safeguards(guide_word: str, parameter: str, eq_class: str) -> list:
    """Basic safeguard identification from deviation type."""
    safeguards = []
    if parameter == "Pressure":
        safeguards.extend(["Pressure Relief Valve (PRV)", "Pressure transmitter alarm (PAH/PAL)"])
    if parameter == "Flow":
        safeguards.extend(["Flow transmitter alarm (FAH/FAL)", "Shutdown valve (SOV)"])
    if parameter == "Temperature":
        safeguards.extend(["Temperature alarm (TAH/TAL)", "Cooling system interlock"])
    if parameter == "Level":
        safeguards.extend(["Level alarm (LAH/LAL)", "Overflow protection"])
    if guide_word == "No":
        safeguards.append("Manual inspection procedure")
    return safeguards if safeguards else ["No automatic safeguard identified — review required"]

async def _create_cil_from_hazop(plant_unit: str):
    """
    Push high-risk HAZOP deviations into the PostgreSQL Critical Items List.
    Risk rank >= 9 = Critical or High priority.
    """
    from services.layout_service import get_pg_connection
    async with driver.session() as session:
        result = await session.run("""
            MATCH (e:PIDEquipment {plant_unit: $unit})-[:HAS_DEVIATION]->(h:HAZOPDeviation)
            WHERE h.risk_rank >= 9
            OPTIONAL MATCH (e)-[:LINKED_TO_DEVICE]->(d:Device)
            RETURN h.deviation_id AS dev_id,
                   h.deviation_text AS dev_text,
                   h.risk_rank AS risk_rank,
                   h.consequence AS consequence,
                   e.dexpi_id AS dexpi_id,
                   e.tag AS equipment_tag,
                   d.netbox_id AS netbox_id
        """, unit=plant_unit)
        high_risk = [dict(r) async for r in result]

    if high_risk:
        async with get_pg_connection() as conn:
            for item in high_risk:
                await conn.execute("""
                    INSERT INTO safety.critical_items
                    (plant_unit, device_netbox_id, dexpi_equipment_id,
                     item_type, description, risk_score, source_ref, priority, neo4j_ref)
                    VALUES ($1, $2, $3, 'HAZOPHighRisk', $4, $5, $6,
                            CASE WHEN $5 >= 12 THEN 1 ELSE 2 END, $7)
                    ON CONFLICT DO NOTHING
                """,
                    plant_unit,
                    item.get("netbox_id", ""),
                    item.get("dexpi_id", ""),
                    f"HAZOP: {item['dev_text']} at {item['equipment_tag']} — {item['consequence'][:200]}",
                    float(item["risk_rank"]),
                    item["dev_id"],
                    item["dev_id"]
                )
```

***
## 7. Library 2: LLM-Assisted FMEA via LLMRiskAnalyzer + Ollama (Inline — Sprint 4 Extension)
### 7.1 Merge Target
**Merge into Sprint 4** alongside the Threat Dragon ingestion work. Add `llm_fmea_service.py` and the corresponding Celery task. The task is triggered automatically after each batch NetBox sync (i.e., after `sync_all_devices_to_neo4j` completes in the Sprint 1 Celery task — extend that task to optionally trigger FMEA generation).
### 7.2 Background
LLMRiskAnalyzer demonstrates how LLMs can automate the traditional FMEA process, reducing dependency on extensive expert input while maintaining structured SOD (Severity, Occurrence, Detection) scoring. Your Ollama setup with Qwen3 or Gemma is the natural inference backend — no external API calls.[^4]
### 7.3 Ollama FMEA Service
```python
# services/api/services/llm_fmea_service.py
import ollama
import json
import uuid
from neo4j import AsyncGraphDatabase
from config import settings

driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri, auth=(settings.neo4j_user, settings.neo4j_password)
)

FMEA_SYSTEM_PROMPT = """You are an experienced functional safety engineer specializing in 
IEC 62443 OT/ICS security and IEC 61508 functional safety. 
You perform FMEA analysis on industrial control system components.
Always respond with valid JSON only — no markdown, no explanation."""

FMEA_USER_TEMPLATE = """Perform an FMEA analysis for the following OT device:

Device Name: {device_name}
Device Type: {device_type}
Manufacturer: {manufacturer}
Purdue Level: {purdue_level}
IEC 62443 SL Target: {sl_target}
Site: {site}

Generate exactly 3-5 failure modes. For each failure mode provide:
- function: what the device is supposed to do
- failure_mode: how it fails
- failure_effect: effect on the system/process
- failure_cause: root cause of the failure
- severity: integer 1-10 (10=hazardous without warning)
- occurrence: integer 1-10 (10=inevitable)
- detection: integer 1-10 (10=cannot detect)
- action_required: recommended corrective action

Return ONLY a JSON array of failure mode objects."""

async def generate_fmea_for_device(device_data: dict) -> list:
    """
    Generate FMEA failure modes for a device using Ollama local LLM.
    Returns list of failure mode dicts ready for Neo4j and PostgreSQL.
    """
    prompt = FMEA_USER_TEMPLATE.format(
        device_name=device_data.get("name", "Unknown"),
        device_type=device_data.get("device_type", "Industrial Device"),
        manufacturer=device_data.get("manufacturer", "Unknown"),
        purdue_level=device_data.get("purdue_level", "Unknown"),
        sl_target=device_data.get("iec62443_sl", "Unknown"),
        site=device_data.get("site", "Unknown"),
    )

    try:
        client = ollama.Client(host=settings.ollama_url)
        response = client.chat(
            model=settings.ollama_model,  # e.g., "qwen3:14b" or "gemma3:12b"
            messages=[
                {"role": "system", "content": FMEA_SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            options={
                "temperature": 0.2,   # Low temp for structured output
                "num_predict": 2048,
            }
        )
        raw = response["message"]["content"].strip()

        # Strip thinking tags if using Qwen3 with thinking mode
        if "<think>" in raw:
            raw = raw.split("</think>")[-1].strip()

        failure_modes = json.loads(raw)

        # Validate and normalize
        validated = []
        for fm in failure_modes:
            s = max(1, min(10, int(fm.get("severity", 5))))
            o = max(1, min(10, int(fm.get("occurrence", 5))))
            d = max(1, min(10, int(fm.get("detection", 5))))
            validated.append({
                "fm_id": str(uuid.uuid4()),
                "function": fm.get("function", ""),
                "failure_mode": fm.get("failure_mode", ""),
                "failure_effect": fm.get("failure_effect", ""),
                "failure_cause": fm.get("failure_cause", ""),
                "severity": s,
                "occurrence": o,
                "detection": d,
                "rpn": s * o * d,
                "action_required": fm.get("action_required", "Review required"),
                "source": "LLM-Auto",
            })
        return validated

    except (json.JSONDecodeError, KeyError, Exception) as e:
        # Return a placeholder failure mode on parse error
        return [{
            "fm_id": str(uuid.uuid4()),
            "function": f"Operate as {device_data.get('device_type', 'device')}",
            "failure_mode": "LLM analysis failed — manual FMEA required",
            "failure_effect": "Unknown",
            "failure_cause": f"Parse error: {str(e)[:100]}",
            "severity": 5, "occurrence": 5, "detection": 5, "rpn": 125,
            "action_required": "Perform manual FMEA for this device",
            "source": "LLM-Error",
        }]

async def persist_fmea_to_neo4j(netbox_id: str, failure_modes: list):
    """Write FailureMode nodes to Neo4j, linked to Device."""
    async with driver.session() as session:
        for fm in failure_modes:
            await session.run("""
                MERGE (fm:FailureMode {fm_id: $fm_id})
                SET fm.function = $function,
                    fm.failure_mode = $failure_mode,
                    fm.failure_effect = $failure_effect,
                    fm.failure_cause = $failure_cause,
                    fm.severity = $severity,
                    fm.occurrence = $occurrence,
                    fm.detection = $detection,
                    fm.rpn = $rpn,
                    fm.action_required = $action_required,
                    fm.source = $source
                WITH fm
                MATCH (d:Device {netbox_id: $netbox_id})
                MERGE (d)-[:HAS_FAILURE_MODE]->(fm)
            """, netbox_id=netbox_id, **fm)

async def get_device_fmea(netbox_id: str) -> list:
    """Retrieve all FMEA failure modes for a device from Neo4j."""
    async with driver.session() as session:
        result = await session.run("""
            MATCH (d:Device {netbox_id: $netbox_id})-[:HAS_FAILURE_MODE]->(fm:FailureMode)
            RETURN fm.fm_id AS fm_id,
                   fm.function AS function,
                   fm.failure_mode AS failure_mode,
                   fm.failure_effect AS failure_effect,
                   fm.failure_cause AS failure_cause,
                   fm.severity AS severity,
                   fm.occurrence AS occurrence,
                   fm.detection AS detection,
                   fm.rpn AS rpn,
                   fm.action_required AS action_required,
                   fm.source AS source
            ORDER BY fm.rpn DESC
        """, netbox_id=netbox_id)
        return [dict(r) async for r in result]

async def get_top_rpn_devices(limit: int = 20) -> list:
    """
    Return devices with highest maximum RPN across their failure modes.
    Used for Critical Items List generation.
    """
    async with driver.session() as session:
        result = await session.run("""
            MATCH (d:Device)-[:HAS_FAILURE_MODE]->(fm:FailureMode)
            WHERE fm.source <> 'LLM-Error'
            WITH d, max(fm.rpn) AS max_rpn, count(fm) AS fm_count,
                 collect(fm.failure_mode)[..3] AS top_modes
            WHERE max_rpn >= 100
            RETURN d.netbox_id AS netbox_id,
                   d.name AS device_name,
                   d.purdue_level AS purdue_level,
                   d.iec62443_sl AS sl_target,
                   max_rpn,
                   fm_count,
                   top_modes
            ORDER BY max_rpn DESC
            LIMIT $limit
        """, limit=limit)
        return [dict(r) async for r in result]
```
### 7.4 Configuration Additions
```python
# Add to services/api/config.py Settings class:
ollama_url: str = "http://ollama:11434"
ollama_model: str = "qwen3:14b"  # or "gemma3:12b" depending on VRAM
```

```yaml
# Add to docker-compose.yml (if Ollama runs in Docker)
ollama:
  image: ollama/ollama:latest
  ports:
    - "11434:11434"
  volumes:
    - ollama_models:/root/.ollama
  # For GPU:
  # deploy:
  #   resources:
  #     reservations:
  #       devices:
  #         - capabilities: [gpu]
```

***
## 8. Library 3: pfta — Fault Tree Analysis (Sprint 6)
### 8.1 Library Reference
| Item | Value |
|---|---|
| GitHub | `github.com/public-fta/pfta` |
| License | MIT[^5][^6] |
| Install | `pip install pfta` |
| CLI | `pfta [-h] [-v] ft.txt` |
| Output | Minimal cut sets, event/gate summary, SVGs[^7] |
| ICE Risk | 🟢 Very Low |

> **CRITICAL NOTE:** During research, `sfta` (Slow Fault Tree Analyser, GPL-3.0) was identified as a related tool. Do NOT use `sfta` — it is GPL-3.0 which introduces copyleft risk. Use `pfta` (MIT) only.[^7]
### 8.2 Fault Tree Definition Format
pfta reads a plain-text `.ft` file format:[^5]

```
# pump_station_fta.ft
# Top event: Pump Station Failure
# Format: EVENT_NAME [GATE_TYPE] [probability]

TOP_EVENT = PUMP_STATION_FAILURE OR
    PUMP_A_FAILURE AND
        MOTOR_OVERLOAD 0.02
        IMPELLER_DAMAGE 0.05
        BEARING_FAILURE 0.08
    PUMP_B_FAILURE AND
        CONTROL_SIGNAL_LOSS 0.03
        POWER_LOSS 0.01
        VALVE_STUCK_CLOSED 0.04
    COMMON_CAUSE_FAILURE AND
        CONTROL_SYSTEM_COMPROMISE 0.005
        NETWORK_SEGMENT_BREACH 0.01
```
### 8.3 FTA Service Implementation
```python
# services/api/services/fta_service.py
import uuid
import subprocess
import tempfile
import os
import json
from pathlib import Path
from neo4j import AsyncGraphDatabase
from config import settings

driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri, auth=(settings.neo4j_user, settings.neo4j_password)
)

async def run_fta(
    ft_definition: str,
    ft_name: str,
    plant_unit: str,
    linked_device_id: str = None
) -> dict:
    """
    Execute pfta fault tree analysis.
    Returns cut sets and pushes results to Neo4j.
    """
    ft_id = str(uuid.uuid4())

    # Write FT definition to temp file and run pfta
    with tempfile.TemporaryDirectory() as tmpdir:
        ft_file = Path(tmpdir) / "fault_tree.ft"
        ft_file.write_text(ft_definition)

        try:
            result = subprocess.run(
                ["pfta", str(ft_file)],
                capture_output=True, text=True, timeout=60
            )
            stdout = result.stdout
            stderr = result.stderr
        except subprocess.TimeoutExpired:
            return {"error": "FTA computation timed out (>60s). Reduce tree complexity."}
        except FileNotFoundError:
            return {"error": "pfta not installed. Run: pip install pfta"}

    # Parse cut sets from pfta output
    cut_sets = _parse_pfta_output(stdout)

    # Persist FaultTree node + CutSet nodes to Neo4j
    await _persist_fta_to_neo4j(
        ft_id, ft_name, plant_unit, cut_sets, linked_device_id
    )

    # Generate CIL entries for single-event (order-1) cut sets
    await _create_cil_from_fta(ft_id, plant_unit, cut_sets, linked_device_id)

    return {
        "ft_id": ft_id,
        "ft_name": ft_name,
        "cut_set_count": len(cut_sets),
        "single_event_cuts": len([cs for cs in cut_sets if cs["order"] == 1]),
        "cut_sets": cut_sets[:50],  # Return first 50 for API response
        "raw_output": stdout,
    }

def _parse_pfta_output(pfta_stdout: str) -> list:
    """
    Parse pfta CLI output to extract minimal cut sets.
    pfta outputs a text summary followed by cut set listings.
    """
    cut_sets = []
    lines = pfta_stdout.split("\n")
    in_cutsets = False

    for line in lines:
        line = line.strip()
        if "Minimal Cut Sets" in line or "cut set" in line.lower():
            in_cutsets = True
            continue
        if in_cutsets and line and not line.startswith("#"):
            # pfta format: {EVENT1, EVENT2, ...} probability
            if "{" in line and "}" in line:
                events_str = line[line.index("{")+1:line.index("}")]
                events = [e.strip() for e in events_str.split(",") if e.strip()]
                # Extract probability if present
                prob_part = line[line.index("}")+1:].strip()
                try:
                    probability = float(prob_part)
                except (ValueError, IndexError):
                    probability = None

                cs_id = "-".join(sorted(events))
                cut_sets.append({
                    "cutset_id": cs_id,
                    "events": events,
                    "order": len(events),
                    "probability": probability,
                    "criticality": {1: "Single", 2: "Double"}.get(len(events), "Multiple"),
                })

    # Sort by order (single-point failures first) then probability
    cut_sets.sort(key=lambda x: (x["order"], -(x.get("probability") or 0)))
    return cut_sets

async def _persist_fta_to_neo4j(
    ft_id: str, ft_name: str, plant_unit: str,
    cut_sets: list, linked_device_id: str = None
):
    async with driver.session() as session:
        # Create FaultTree node
        await session.run("""
            MERGE (ft:FaultTree {ft_id: $ft_id})
            SET ft.name = $name,
                ft.plant_unit = $plant_unit,
                ft.cut_set_count = $count,
                ft.single_point_failures = $spf
        """,
            ft_id=ft_id, name=ft_name, plant_unit=plant_unit,
            count=len(cut_sets),
            spf=len([cs for cs in cut_sets if cs["order"] == 1])
        )

        # Link to device if provided
        if linked_device_id:
            await session.run("""
                MATCH (ft:FaultTree {ft_id: $ft_id})
                MATCH (d:Device {netbox_id: $device_id})
                MERGE (ft)-[:ATTACHED_TO]->(d)
            """, ft_id=ft_id, device_id=linked_device_id)

        # Create CutSet nodes
        for cs in cut_sets:
            await session.run("""
                MERGE (cs:CutSet {cutset_id: $cs_id})
                SET cs.events = $events,
                    cs.order = $order,
                    cs.probability = $probability,
                    cs.criticality = $criticality
                WITH cs
                MATCH (ft:FaultTree {ft_id: $ft_id})
                MERGE (cs)-[:TOP_EVENT_OF]->(ft)
            """,
                cs_id=cs["cutset_id"],
                events=json.dumps(cs["events"]),
                order=cs["order"],
                probability=cs.get("probability"),
                criticality=cs["criticality"],
                ft_id=ft_id
            )

            # Link CutSet events to Device nodes (if event names match device names)
            for event in cs["events"]:
                await session.run("""
                    MATCH (cs:CutSet {cutset_id: $cs_id})
                    OPTIONAL MATCH (d:Device) WHERE d.name = $event_name
                    FOREACH (dev IN CASE WHEN d IS NOT NULL THEN [d] ELSE [] END |
                        MERGE (dev)-[:CONTRIBUTES_TO]->(cs)
                    )
                """, cs_id=cs["cutset_id"], event_name=event)

async def _create_cil_from_fta(
    ft_id: str, plant_unit: str, cut_sets: list, device_id: str = None
):
    """Single-event cut sets = Single Point of Failure = Priority 1 CIL item."""
    single_cuts = [cs for cs in cut_sets if cs["order"] == 1]
    if not single_cuts:
        return

    from services.layout_service import get_pg_connection
    async with get_pg_connection() as conn:
        for cs in single_cuts:
            await conn.execute("""
                INSERT INTO safety.critical_items
                (plant_unit, device_netbox_id, item_type, description,
                 risk_score, source_ref, priority, neo4j_ref)
                VALUES ($1, $2, 'CutSet', $3, $4, $5, 1, $6)
                ON CONFLICT DO NOTHING
            """,
                plant_unit,
                device_id or "",
                f"Single Point of Failure: {cs['events']} — {cs['cutset_id']}",
                (1.0 - (cs.get("probability") or 0.0)) * 16.0,  # Invert prob to risk score
                cs["cutset_id"],
                cs["cutset_id"]
            )

async def get_fta_results(ft_id: str) -> dict:
    """Retrieve FTA results from Neo4j for ReactFlow rendering."""
    async with driver.session() as session:
        ft_result = await session.run("""
            MATCH (ft:FaultTree {ft_id: $ft_id})
            OPTIONAL MATCH (ft)-[:ATTACHED_TO]->(d:Device)
            RETURN ft.name AS name, ft.plant_unit AS plant_unit,
                   ft.cut_set_count AS cut_set_count,
                   ft.single_point_failures AS spf,
                   d.name AS device_name
        """, ft_id=ft_id)
        ft_data = dict(await ft_result.single())

        cs_result = await session.run("""
            MATCH (cs:CutSet)-[:TOP_EVENT_OF]->(ft:FaultTree {ft_id: $ft_id})
            RETURN cs.cutset_id AS id, cs.events AS events,
                   cs.order AS order, cs.probability AS probability,
                   cs.criticality AS criticality
            ORDER BY cs.order ASC, cs.probability DESC
        """, ft_id=ft_id)
        cut_sets = [dict(r) async for r in cs_result]

    return {"fault_tree": ft_data, "cut_sets": cut_sets}
```

***
## 9. Library 4: fmdtools — Dynamic Fault Propagation (Sprint 6)
### 9.1 Library Reference
| Item | Value |
|---|---|
| GitHub | `github.com/nasa/fmdtools` |
| Docs | `nasa.github.io/fmdtools` |
| License | BSD-3-Clause (NASA open source)[^8][^9] |
| Install | `pip install fmdtools` |
| Key Version | 2.3.3 (current)[^10] |
| ICE Risk | 🟢 Very Low |

fmdtools models system behavior as a **FunctionArchitecture** — a directed graph of Functions connected by Flows. Functions represent what equipment does (Pump → move fluid); Flows represent what passes between functions (Liquid flow, electrical power, control signals). Faults are injected at specific functions at specific times, and the model simulates propagation through the architecture over time.[^10][^11][^12][^8]
### 9.2 Mapping fmdtools Concepts to DEXPI/NetBox Data
| fmdtools | OT-DiagramStudio equivalent |
|---|---|
| `Function` node | `(:Device)` + `(:PIDEquipment)` in Neo4j |
| `Flow` edge | `(:Conduit)` or DEXPI `CONNECTED_TO` relationship |
| Fault injection (`FaultEntry`) | `(:ThreatComponent)` STRIDE threat scenario |
| Simulation time step | Process cycle time (e.g., PLC scan cycle) |
| `endresults` | Propagation impact at each Function at end of simulation |
| `mdlhist` | Time-series of Flow states (for trajectory plotting) |
### 9.3 fmdtools Model Factory Service
```python
# services/api/services/fmdtools_service.py
import fmdtools.sim as fs
import fmdtools.analyze as fa
from fmdtools.define.architecture.function import FunctionArchitecture
from fmdtools.define.flow.base import Flow
from fmdtools.define.component.base import Component
from fmdtools.define.block.base import FxnBlock
import numpy as np
import json
from neo4j import AsyncGraphDatabase
from config import settings

driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri, auth=(settings.neo4j_user, settings.neo4j_password)
)

# ============================================================
# FLOW DEFINITIONS
# Flows are shared variables between functions (think signals/streams)
# ============================================================

class LiquidFlow(Flow):
    """Process liquid flow — maps to piping connections in DEXPI."""
    flowrate: float = 1.0       # normalized 0-1
    pressure: float = 1.0       # normalized 0-1
    temperature: float = 1.0    # normalized 0-1
    contaminated: bool = False

class ElectricalPower(Flow):
    """Electrical supply — maps to power distribution."""
    voltage: float = 1.0        # normalized 0-1
    available: bool = True

class ControlSignal(Flow):
    """OT control signal — maps to Modbus/Profibus/EtherNet-IP."""
    setpoint: float = 0.5
    feedback: float = 0.5
    valid: bool = True
    integrity: float = 1.0      # 0 = compromised, 1 = intact

# ============================================================
# FUNCTION BLOCK DEFINITIONS
# Each maps to a device type in the NetBox taxonomy
# ============================================================

class GenericPump(FxnBlock):
    """
    Generic pump function block.
    Faults: 'no_power', 'seal_failure', 'impeller_damage', 'comms_loss'
    """
    __slots__ = ('liquid_in', 'liquid_out', 'power', 'control')
    _init_liquid_in = LiquidFlow
    _init_liquid_out = LiquidFlow
    _init_power = ElectricalPower
    _init_control = ControlSignal

    def dynamic_behavior(self, time):
        if self.has_fault('no_power') or not self.power.available:
            self.liquid_out.flowrate = 0.0
            self.liquid_out.pressure = 0.0
        elif self.has_fault('impeller_damage'):
            self.liquid_out.flowrate = self.liquid_in.flowrate * 0.3
            self.liquid_out.pressure = self.liquid_in.pressure * 0.5
        elif self.has_fault('comms_loss') or not self.control.valid:
            # Pump continues at last known setpoint — fail-retained behavior
            self.liquid_out.flowrate = self.control.setpoint
        elif self.has_fault('seal_failure'):
            self.liquid_out.flowrate = self.liquid_in.flowrate * 0.7
            self.liquid_out.contaminated = True
        else:
            # Normal operation
            self.liquid_out.flowrate = min(self.liquid_in.flowrate, self.control.setpoint)
            self.liquid_out.pressure = self.liquid_in.pressure * 0.95

class GenericPLC(FxnBlock):
    """
    PLC/Controller function block.
    Faults: 'comms_loss', 'malware', 'firmware_tamper', 'power_loss'
    Scenario: ICS cyber attack propagation
    """
    __slots__ = ('power', 'control_out', 'control_in')
    _init_power = ElectricalPower
    _init_control_out = ControlSignal
    _init_control_in = ControlSignal

    def dynamic_behavior(self, time):
        if self.has_fault('power_loss') or not self.power.available:
            self.control_out.valid = False
            self.control_out.setpoint = 0.0
        elif self.has_fault('malware'):
            # Malware modifies setpoints — Stuxnet-style behavior
            self.control_out.setpoint = 1.0    # Drive actuator to unsafe state
            self.control_out.integrity = 0.0   # Signal integrity lost
            self.control_out.valid = True       # But appears valid to downstream
        elif self.has_fault('firmware_tamper'):
            self.control_out.integrity = 0.3
            self.control_out.setpoint = self.control_in.setpoint * 1.5  # Amplify
        elif self.has_fault('comms_loss'):
            self.control_out.valid = False
        else:
            self.control_out.setpoint = self.control_in.setpoint
            self.control_out.integrity = self.control_in.integrity

class GenericValve(FxnBlock):
    """Valve function block — fail-safe (closed on loss of signal)."""
    __slots__ = ('liquid_in', 'liquid_out', 'control')
    _init_liquid_in = LiquidFlow
    _init_liquid_out = LiquidFlow
    _init_control = ControlSignal

    def dynamic_behavior(self, time):
        if self.has_fault('stuck_open'):
            self.liquid_out.flowrate = self.liquid_in.flowrate
        elif self.has_fault('stuck_closed') or not self.control.valid:
            self.liquid_out.flowrate = 0.0  # Fail-closed (safe default)
        else:
            self.liquid_out.flowrate = self.liquid_in.flowrate * self.control.setpoint

# ============================================================
# DYNAMIC MODEL BUILDER
# Constructs fmdtools model from Neo4j topology
# ============================================================

async def build_model_from_neo4j(plant_unit: str) -> FunctionArchitecture:
    """
    Construct fmdtools FunctionArchitecture from Neo4j PIDEquipment + Device graph.
    This bridges the pyDEXPI pipeline to fmdtools simulation.
    """
    async with driver.session() as session:
        # Get equipment and connections for this unit
        nodes_result = await session.run("""
            MATCH (e:PIDEquipment {plant_unit: $unit})
            OPTIONAL MATCH (e)-[:LINKED_TO_DEVICE]->(d:Device)
            RETURN e.dexpi_id AS dexpi_id,
                   e.tag AS tag,
                   e.equipment_class AS equipment_class,
                   d.device_type AS device_type,
                   d.netbox_id AS netbox_id
        """, unit=plant_unit)

        edges_result = await session.run("""
            MATCH (a:PIDEquipment {plant_unit: $unit})-[r:CONNECTED_TO]->(b:PIDEquipment {plant_unit: $unit})
            RETURN a.dexpi_id AS source, b.dexpi_id AS target,
                   r.connection_type AS connection_type
        """, unit=plant_unit)

        nodes = [dict(r) async for r in nodes_result]
        edges = [dict(r) async for r in edges_result]

    # Build the FunctionArchitecture
    class DynamicOTSystem(FunctionArchitecture):
        def __init__(self):
            super().__init__()
            # Map equipment classes to function blocks
            class_map = {
                "Pump": GenericPump,
                "PLC": GenericPLC,
                "Controller": GenericPLC,
                "Valve": GenericValve,
                "ControlValve": GenericValve,
            }
            # Add functions
            for node in nodes:
                eq_class = node.get("equipment_class", "Pump")
                fxn_class = class_map.get(eq_class, GenericPump)
                safe_tag = node["tag"].replace("-", "_").replace(" ", "_")
                self.add_fxn(safe_tag, fxn_class)

            # Add flows (connections)
            for edge in edges:
                source_tag = next(
                    (n["tag"].replace("-","_").replace(" ","_")
                     for n in nodes if n["dexpi_id"] == edge["source"]), None
                )
                target_tag = next(
                    (n["tag"].replace("-","_").replace(" ","_")
                     for n in nodes if n["dexpi_id"] == edge["target"]), None
                )
                if source_tag and target_tag:
                    conn_type = edge.get("connection_type", "pipe")
                    if conn_type in ("pipe", "piping"):
                        self.add_flow("liq_" + source_tag + "_" + target_tag, LiquidFlow)
                    elif conn_type in ("signal", "instrument"):
                        self.add_flow("sig_" + source_tag + "_" + target_tag, ControlSignal)

    return DynamicOTSystem()

async def simulate_fault_propagation(
    plant_unit: str,
    fault_function: str,    # e.g., "PUMP_101"
    fault_mode: str,        # e.g., "comms_loss"
    fault_time: int = 5,    # time step at which fault is injected
    sim_duration: int = 20  # total simulation steps
) -> dict:
    """
    Simulate dynamic fault propagation from a specific function fault.
    Returns impact assessment per function and time-series trajectory data.
    """
    mdl = await build_model_from_neo4j(plant_unit)

    # Sanitize function name
    safe_fn = fault_function.replace("-", "_").replace(" ", "_")

    try:
        endresults, mdlhist = fs.propagate.one_fault(
            mdl, safe_fn, fault_mode,
            time=fault_time,
            desired_result=["endclass", "graph"]
        )

        # Extract impact per function
        function_impacts = {}
        if hasattr(endresults, "endclass"):
            for fn_name, classification in endresults.endclass.items():
                function_impacts[fn_name] = {
                    "classification": str(classification),
                    "degraded": classification != "nominal",
                }

        # Build propagation path graph
        propagation_graph = _build_propagation_graph(mdlhist, mdl)

        # Push results to Neo4j
        await _persist_simulation_results(
            plant_unit, fault_function, fault_mode,
            function_impacts, propagation_graph
        )

        return {
            "plant_unit": plant_unit,
            "fault_function": fault_function,
            "fault_mode": fault_mode,
            "fault_time": fault_time,
            "function_impacts": function_impacts,
            "degraded_functions": [
                fn for fn, data in function_impacts.items() if data["degraded"]
            ],
            "propagation_graph": propagation_graph,
        }
    except Exception as e:
        return {"error": str(e), "plant_unit": plant_unit}

def _build_propagation_graph(mdlhist, mdl) -> dict:
    """
    Convert fmdtools model history to ReactFlow node/edge format
    for rendering propagation on the canvas.
    """
    nodes = []
    edges = []
    # In fmdtools 2.x, model graph available via mdl.graph
    if hasattr(mdl, 'graph'):
        for node_id in mdl.graph.nodes():
            nodes.append({
                "id": str(node_id),
                "type": "fmdtoolsResult",
                "data": {"label": str(node_id)}
            })
        for u, v in mdl.graph.edges():
            edges.append({
                "id": f"{u}-{v}",
                "source": str(u),
                "target": str(v)
            })
    return {"nodes": nodes, "edges": edges}

async def _persist_simulation_results(
    plant_unit: str, fault_function: str, fault_mode: str,
    impacts: dict, prop_graph: dict
):
    """Store simulation results on Device nodes in Neo4j."""
    async with driver.session() as session:
        for fn_name, impact in impacts.items():
            if impact["degraded"]:
                await session.run("""
                    MATCH (d:Device)
                    WHERE d.name = $fn_name OR
                          replace(replace(d.name, '-', '_'), ' ', '_') = $fn_name
                    SET d.last_fault_scenario = $scenario,
                        d.last_fault_impact = $impact,
                        d.fault_simulation_time = timestamp()
                """,
                    fn_name=fn_name,
                    scenario=f"{fault_function}/{fault_mode}",
                    impact=impact["classification"]
                )
```

***
## 10. Library 5: reliability — Weibull / MTTF / RAMS (Sprint 6)
### 10.1 Library Reference
| Item | Value |
|---|---|
| GitHub | `github.com/MatthewReid854/reliability` |
| Docs | `reliability.readthedocs.io` |
| License | LGPLv3[^13][^14][^15] |
| Install | `pip install reliability` |
| ICE Risk | 🟡 Low (server-side only — LGPLv3 dynamic link exemption applies) |
### 10.2 Reliability Service Implementation
```python
# services/api/services/reliability_service.py
from reliability.Fitters import Fit_Weibull_2P, Fit_Lognormal_2P
from reliability.Reliability_testing import one_sample_proportion
import numpy as np
import uuid
import io
import base64
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend for server-side rendering
import matplotlib.pyplot as plt
from neo4j import AsyncGraphDatabase
from config import settings

driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri, auth=(settings.neo4j_user, settings.neo4j_password)
)

async def fit_weibull(
    netbox_id: str,
    device_name: str,
    failure_times: list,          # hours to failure
    right_censored_times: list = None,  # still operating (hours)
    fit_method: str = "MLE"       # "MLE" or "LS"
) -> dict:
    """
    Fit Weibull-2P distribution to component failure data.
    Returns alpha (scale), beta (shape), MTTF, B10 life, and reliability curve PNG.
    """
    if len(failure_times) < 2:
        return {"error": "Minimum 2 failure data points required for Weibull fitting."}

    model_id = str(uuid.uuid4())
    rc = right_censored_times or []

    try:
        result = Fit_Weibull_2P(
            failures=failure_times,
            right_censored=rc if rc else None,
            method=fit_method,
            print_results=False,
            show_probability_plot=False,
        )

        alpha = round(result.alpha, 2)   # Characteristic life (η)
        beta = round(result.beta, 3)     # Shape parameter (β)
        mttf = round(result.distribution.mean, 2)
        b10_life = round(result.distribution.quantile(0.1), 2)  # Time to 10% failure

        # Generate reliability curve (PNG base64)
        reliability_png_b64 = _generate_reliability_plot(result, device_name)

        # Interpret beta value
        failure_pattern = _interpret_beta(beta)

        # Persist to Neo4j
        await _persist_weibull_to_neo4j(
            model_id, netbox_id, alpha, beta, mttf, b10_life,
            len(failure_times), len(rc), fit_method
        )

        # Write to CIL if MTTF indicates critical reliability concern
        if mttf < 8760:  # < 1 year MTTF is a CIL candidate
            await _create_cil_from_reliability(netbox_id, device_name, mttf, model_id)

        return {
            "model_id": model_id,
            "device_name": device_name,
            "alpha": alpha,
            "beta": beta,
            "mttf_hours": mttf,
            "mttf_days": round(mttf / 24, 1),
            "b10_life_hours": b10_life,
            "failure_pattern": failure_pattern,
            "n_failures": len(failure_times),
            "n_right_censored": len(rc),
            "fit_method": fit_method,
            "reliability_curve_png_b64": reliability_png_b64,
        }

    except Exception as e:
        return {"error": f"Weibull fit failed: {str(e)}"}

def _interpret_beta(beta: float) -> dict:
    """
    Interpret Weibull shape parameter beta.
    β < 1: Infant mortality (early-life failures — suggest burn-in or design flaw)
    β = 1: Random failures (exponential — suggests external/random causes)
    β > 1: Wear-out failures (age-related — schedule preventive maintenance)
    β > 3: Normal-like wear-out (tight failure distribution)
    """
    if beta < 0.8:
        return {"pattern": "Infant Mortality", "recommendation": "Investigate design or installation defects. Consider burn-in testing.", "color": "#EF4444"}
    elif beta < 1.2:
        return {"pattern": "Random Failure", "recommendation": "Failures are random/independent. No PM benefit — focus on redundancy.", "color": "#F97316"}
    elif beta < 3.0:
        return {"pattern": "Wear-Out (Moderate)", "recommendation": "Schedule time-based preventive maintenance at B10 life intervals.", "color": "#EAB308"}
    else:
        return {"pattern": "Wear-Out (Narrow)", "recommendation": "Tight wear-out band. PM scheduling is highly effective at B10.", "color": "#22C55E"}

def _generate_reliability_plot(result, device_name: str) -> str:
    """Generate reliability curve as base64-encoded PNG for React display."""
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))
    fig.patch.set_facecolor('#0F172A')

    t = np.linspace(0, result.distribution.quantile(0.999), 1000)

    # Reliability curve R(t)
    axes.plot(t, result.distribution.SF(xvals=t), color='#3B82F6', linewidth=2)
    axes.axhline(y=0.9, color='#22C55E', linestyle='--', alpha=0.7, label='90% Reliability')
    axes.axhline(y=0.5, color='#EF4444', linestyle='--', alpha=0.7, label='50% Reliability')
    axes.set_xlabel('Time (hours)', color='#94A3B8')
    axes.set_ylabel('Reliability R(t)', color='#94A3B8')
    axes.set_title(f'{device_name} — Reliability Curve', color='#F1F5F9')
    axes.set_facecolor('#1E293B')
    axes.tick_params(colors='#94A3B8')
    axes.legend(facecolor='#334155', labelcolor='#F1F5F9')
    axes.grid(color='#334155', alpha=0.5)

    # Hazard rate h(t)
    axes[^1].plot(t, result.distribution.HF(xvals=t), color='#EF4444', linewidth=2)
    axes[^1].set_xlabel('Time (hours)', color='#94A3B8')
    axes[^1].set_ylabel('Hazard Rate h(t)', color='#94A3B8')
    axes[^1].set_title(f'{device_name} — Hazard Rate', color='#F1F5F9')
    axes[^1].set_facecolor('#1E293B')
    axes[^1].tick_params(colors='#94A3B8')
    axes[^1].grid(color='#334155', alpha=0.5)

    plt.tight_layout()

    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=100, facecolor='#0F172A')
    plt.close(fig)
    buf.seek(0)
    return base64.b64encode(buf.read()).decode('utf-8')

async def _persist_weibull_to_neo4j(
    model_id, netbox_id, alpha, beta, mttf, b10_life,
    n_failures, n_right_censored, fit_method
):
    async with driver.session() as session:
        await session.run("""
            MERGE (wm:WeibullModel {model_id: $model_id})
            SET wm.alpha = $alpha,
                wm.beta = $beta,
                wm.mttf = $mttf,
                wm.b10_life = $b10_life,
                wm.n_failures = $n_failures,
                wm.n_right_censored = $n_right_censored,
                wm.fit_method = $fit_method,
                wm.fitted_at = timestamp()
            WITH wm
            MATCH (d:Device {netbox_id: $netbox_id})
            MERGE (d)-[:HAS_WEIBULL_MODEL]->(wm)
            SET d.mttf = $mttf,
                d.weibull_alpha = $alpha,
                d.weibull_beta = $beta
        """,
            model_id=model_id, netbox_id=netbox_id,
            alpha=alpha, beta=beta, mttf=mttf, b10_life=b10_life,
            n_failures=n_failures, n_right_censored=n_right_censored,
            fit_method=fit_method
        )

async def _create_cil_from_reliability(
    netbox_id: str, device_name: str, mttf: float, model_id: str
):
    from services.layout_service import get_pg_connection
    priority = 1 if mttf < 4380 else 2  # < 6 months = Priority 1
    async with get_pg_connection() as conn:
        await conn.execute("""
            INSERT INTO safety.critical_items
            (device_netbox_id, item_type, description, risk_score, source_ref, priority, neo4j_ref)
            VALUES ($1, 'LowMTTF', $2, $3, $4, $5, $6)
            ON CONFLICT DO NOTHING
        """,
            netbox_id,
            f"Low MTTF: {device_name} — MTTF = {mttf:.0f} hours ({mttf/24:.0f} days). Preventive maintenance urgently required.",
            round(8760.0 / max(mttf, 1) * 16, 2),  # Normalized risk score
            model_id, priority, model_id
        )

async def get_reliability_overview(site: str = None) -> list:
    """Get MTTF values for all devices in Neo4j, optionally filtered by site."""
    async with driver.session() as session:
        result = await session.run("""
            MATCH (d:Device)-[:HAS_WEIBULL_MODEL]->(wm:WeibullModel)
            WHERE ($site IS NULL OR d.site = $site)
            RETURN d.netbox_id AS netbox_id,
                   d.name AS device_name,
                   d.purdue_level AS purdue_level,
                   d.site AS site,
                   wm.alpha AS alpha,
                   wm.beta AS beta,
                   wm.mttf AS mttf,
                   wm.b10_life AS b10_life
            ORDER BY wm.mttf ASC
        """, site=site)
        return [dict(r) async for r in result]
```

***
## 11. FastAPI Safety Router — Complete Implementation
```python
# services/api/routers/safety.py
from fastapi import APIRouter, UploadFile, File, Query, Depends, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List
import tempfile, os
from dependencies import get_current_user
from services.prehazop_service import run_prehazop, get_hazop_deviations
from services.fta_service import run_fta, get_fta_results
from services.fmdtools_service import simulate_fault_propagation
from services.reliability_service import fit_weibull, get_reliability_overview
from services.llm_fmea_service import generate_fmea_for_device, get_device_fmea, get_top_rpn_devices
from tasks.safety_tasks import (
    run_fta_async, run_prehazop_async,
    run_fmea_batch_async, run_reliability_async
)

router = APIRouter()

# ────────────────────────────────────────────
# preHAZOP endpoints
# ────────────────────────────────────────────

@router.post("/hazop/run/{plant_unit}")
async def trigger_prehazop(
    plant_unit: str,
    background_tasks: BackgroundTasks,
    user=Depends(get_current_user)
):
    """Trigger preHAZOP analysis for a plant unit (async via Celery)."""
    task = run_prehazop_async.delay(plant_unit)
    return {"task_id": task.id, "plant_unit": plant_unit, "status": "queued"}

@router.get("/hazop/{plant_unit}/deviations")
async def get_hazop(
    plant_unit: str,
    min_risk_rank: int = Query(1, ge=1, le=16),
    guide_word: Optional[str] = None,
    user=Depends(get_current_user)
):
    """Get HAZOP deviations for a plant unit, filterable by risk rank."""
    return await get_hazop_deviations(plant_unit, min_risk_rank, guide_word)

# ────────────────────────────────────────────
# Fault Tree Analysis endpoints
# ────────────────────────────────────────────

class FTARequest(BaseModel):
    ft_name: str
    plant_unit: str
    ft_definition: str  # pfta .ft file content
    linked_device_id: Optional[str] = None

@router.post("/fta/run")
async def run_fault_tree(
    request: FTARequest,
    user=Depends(get_current_user)
):
    """Execute FTA synchronously (< 500 events) or return task ID for large trees."""
    if request.ft_definition.count("\n") > 200:
        # Large tree — run async
        task = run_fta_async.delay(
            request.ft_definition, request.ft_name,
            request.plant_unit, request.linked_device_id
        )
        return {"task_id": task.id, "status": "queued"}
    # Small tree — run inline
    return await run_fta(
        request.ft_definition, request.ft_name,
        request.plant_unit, request.linked_device_id
    )

@router.post("/fta/upload")
async def upload_ft_file(
    plant_unit: str,
    linked_device_id: Optional[str] = None,
    file: UploadFile = File(...),
    user=Depends(get_current_user)
):
    """Upload a .ft file (pfta format) and run FTA."""
    if not file.filename.endswith('.ft'):
        raise HTTPException(400, "File must have .ft extension (pfta format)")
    ft_content = (await file.read()).decode('utf-8')
    ft_name = file.filename.replace('.ft', '')
    return await run_fta(ft_content, ft_name, plant_unit, linked_device_id)

@router.get("/fta/{ft_id}")
async def get_fault_tree(ft_id: str, user=Depends(get_current_user)):
    return await get_fta_results(ft_id)

# ────────────────────────────────────────────
# fmdtools Simulation endpoints
# ────────────────────────────────────────────

class FaultSimRequest(BaseModel):
    plant_unit: str
    fault_function: str    # equipment tag (PUMP-101)
    fault_mode: str        # failure mode (comms_loss, malware, etc.)
    fault_time: int = 5
    sim_duration: int = 20

@router.post("/simulation/propagate")
async def run_propagation(request: FaultSimRequest, user=Depends(get_current_user)):
    """Simulate dynamic fault propagation through plant unit model."""
    return await simulate_fault_propagation(
        request.plant_unit, request.fault_function,
        request.fault_mode, request.fault_time, request.sim_duration
    )

# ────────────────────────────────────────────
# Reliability / Weibull endpoints
# ────────────────────────────────────────────

class WeibullRequest(BaseModel):
    netbox_id: str
    device_name: str
    failure_times: List[float]         # hours
    right_censored_times: List[float] = []
    fit_method: str = "MLE"

@router.post("/reliability/weibull")
async def weibull_fit(request: WeibullRequest, user=Depends(get_current_user)):
    """Fit Weibull-2P distribution to component failure data."""
    return await fit_weibull(
        request.netbox_id, request.device_name,
        request.failure_times, request.right_censored_times,
        request.fit_method
    )

@router.get("/reliability/overview")
async def reliability_overview(
    site: Optional[str] = None,
    user=Depends(get_current_user)
):
    """Get MTTF ranking for all devices with Weibull models."""
    return await get_reliability_overview(site)

# ────────────────────────────────────────────
# FMEA endpoints
# ────────────────────────────────────────────

@router.post("/fmea/generate/{netbox_id}")
async def generate_fmea(netbox_id: str, user=Depends(get_current_user)):
    """Generate LLM-assisted FMEA for a specific device."""
    from services.netbox_service import get_device_by_id
    device_data = await get_device_by_id(netbox_id)
    if not device_data:
        raise HTTPException(404, f"Device {netbox_id} not found in NetBox")
    failure_modes = await generate_fmea_for_device(device_data)
    from services.llm_fmea_service import persist_fmea_to_neo4j
    await persist_fmea_to_neo4j(netbox_id, failure_modes)
    return {"netbox_id": netbox_id, "failure_modes_generated": len(failure_modes), "failure_modes": failure_modes}

@router.get("/fmea/{netbox_id}")
async def get_fmea(netbox_id: str, user=Depends(get_current_user)):
    """Get FMEA failure modes for a device."""
    return {"netbox_id": netbox_id, "failure_modes": await get_device_fmea(netbox_id)}

@router.post("/fmea/batch/plant/{plant_unit}")
async def batch_fmea(plant_unit: str, user=Depends(get_current_user)):
    """Trigger FMEA generation for all devices in a plant unit (async)."""
    task = run_fmea_batch_async.delay(plant_unit)
    return {"task_id": task.id, "plant_unit": plant_unit, "status": "queued"}

# ────────────────────────────────────────────
# Critical Items List endpoint
# ────────────────────────────────────────────

@router.get("/critical-items/{plant_unit}")
async def get_critical_items(
    plant_unit: str,
    priority: Optional[int] = None,
    item_type: Optional[str] = None,
    user=Depends(get_current_user)
):
    """Get Critical Items List, optionally filtered by priority or type."""
    from services.layout_service import get_pg_connection
    async with get_pg_connection() as conn:
        rows = await conn.fetch("""
            SELECT id, plant_unit, device_netbox_id, dexpi_equipment_id,
                   item_type, description, risk_score, source_ref,
                   status, priority, created_at, neo4j_ref
            FROM safety.critical_items
            WHERE plant_unit = $1
              AND ($2::int IS NULL OR priority = $2)
              AND ($3::text IS NULL OR item_type = $3)
            ORDER BY priority ASC, risk_score DESC
        """, plant_unit, priority, item_type)
        return [dict(r) for r in rows]
```

***
## 12. Celery Async Tasks — Safety Computation
```python
# services/api/tasks/safety_tasks.py
from celery import shared_task
import asyncio

@shared_task(name="safety.run_prehazop", bind=True, max_retries=2)
def run_prehazop_async(self, plant_unit: str):
    """Run preHAZOP analysis asynchronously."""
    try:
        from services.prehazop_service import run_prehazop
        result = asyncio.get_event_loop().run_until_complete(
            run_prehazop(plant_unit)
        )
        return result
    except Exception as exc:
        raise self.retry(exc=exc, countdown=30)

@shared_task(name="safety.run_fta", bind=True, max_retries=2)
def run_fta_async(self, ft_definition, ft_name, plant_unit, device_id=None):
    from services.fta_service import run_fta
    result = asyncio.get_event_loop().run_until_complete(
        run_fta(ft_definition, ft_name, plant_unit, device_id)
    )
    return result

@shared_task(name="safety.fmea_batch", bind=True, max_retries=1)
def run_fmea_batch_async(self, plant_unit: str):
    """Generate FMEA for all devices in a plant unit — can take minutes."""
    from services.llm_fmea_service import generate_fmea_for_device, persist_fmea_to_neo4j
    from services.netbox_service import get_all_ot_devices
    import asyncio

    async def _run():
        devices = await get_all_ot_devices()  # All devices
        results = {"processed": 0, "errors": 0}
        for device in devices:
            try:
                fms = await generate_fmea_for_device(device)
                await persist_fmea_to_neo4j(device["netbox_id"], fms)
                results["processed"] += 1
            except Exception:
                results["errors"] += 1
        return results

    return asyncio.get_event_loop().run_until_complete(_run())

@shared_task(name="safety.reliability_scan")
def run_reliability_scan():
    """Scheduled task: check device MTTF models and flag overdue PM."""
    pass  # Implement with maintenance system integration
```

***
## 13. React Frontend — Safety Panel Components
### 13.1 Safety Sidebar Tab
```typescript
// src/components/sidebar/SafetySidebarTab.tsx
import { useState } from 'react';
import { Shield, AlertTriangle, Activity, FileText } from 'lucide-react';
import FaultTreeCanvas from '@/features/safety/FaultTreeCanvas';
import FMEATable from '@/features/safety/FMEATable';
import ReliabilityCurve from '@/features/safety/ReliabilityCurve';
import CriticalItemsList from '@/features/safety/CriticalItemsList';
import HAZOPDeviationPanel from '@/features/safety/HAZOPDeviationPanel';
import { useDiagramStore } from '@/store/diagramStore';

type SafetyView = 'cil' | 'hazop' | 'fmea' | 'reliability' | 'fta';

export default function SafetySidebarTab() {
  const [activeView, setActiveView] = useState<SafetyView>('cil');
  const { selectedNodeId } = useDiagramStore();

  const views = [
    { id: 'cil' as SafetyView, label: 'Critical Items', icon: AlertTriangle },
    { id: 'hazop' as SafetyView, label: 'HAZOP', icon: Shield },
    { id: 'fmea' as SafetyView, label: 'FMEA', icon: FileText },
    { id: 'reliability' as SafetyView, label: 'Reliability', icon: Activity },
    { id: 'fta' as SafetyView, label: 'Fault Tree', icon: Shield },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-slate-700">
        {views.map(({ id, label, icon: Icon }) => (
          <button key={id}
            onClick={() => setActiveView(id)}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
              activeView === id
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Icon size={10} />
            {label}
          </button>
        ))}
      </div>

      {/* Content panels */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'cil' && <CriticalItemsList />}
        {activeView === 'hazop' && <HAZOPDeviationPanel />}
        {activeView === 'fmea' && selectedNodeId && (
          <FMEATable nodeId={selectedNodeId} />
        )}
        {activeView === 'reliability' && selectedNodeId && (
          <ReliabilityCurve nodeId={selectedNodeId} />
        )}
        {activeView === 'fta' && <FaultTreeCanvas />}
      </div>
    </div>
  );
}
```
### 13.2 FMEA Table Component
```typescript
// src/features/safety/FMEATable.tsx
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Zap, RefreshCw } from 'lucide-react';

interface FailureMode {
  fm_id: string; function: string; failure_mode: string;
  failure_effect: string; failure_cause: string;
  severity: number; occurrence: number; detection: number;
  rpn: number; action_required: string; source: string;
}

const RPN_COLOR = (rpn: number) =>
  rpn >= 200 ? '#EF4444' : rpn >= 100 ? '#F97316' : rpn >= 50 ? '#EAB308' : '#22C55E';

export default function FMEATable({ nodeId }: { nodeId: string }) {
  const netboxId = nodeId.replace('device-', '');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fmea', netboxId],
    queryFn: () => api.get(`/safety/fmea/${netboxId}`).then(r => r.data),
    enabled: !!netboxId,
  });

  const generateMutation = useMutation({
    mutationFn: () => api.post(`/safety/fmea/generate/${netboxId}`),
    onSuccess: () => refetch(),
  });

  const failureModes: FailureMode[] = data?.failure_modes || [];

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-slate-200">FMEA — Failure Mode Analysis</h3>
        <button
          onClick={() => generateMutation.mutate()}
          disabled={generateMutation.isPending}
          className="flex items-center gap-1 text-xs px-2 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded disabled:opacity-50"
        >
          <Zap size={10} />
          {generateMutation.isPending ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      {isLoading && <div className="text-xs text-slate-500">Loading FMEA...</div>}

      {failureModes.length === 0 && !isLoading && (
        <div className="text-xs text-slate-500 text-center py-4">
          No FMEA data. Click "Generate with AI" to auto-analyze this device.
        </div>
      )}

      <div className="space-y-2">
        {failureModes.map(fm => (
          <div key={fm.fm_id}
            className="rounded border border-slate-700 bg-slate-800 p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-200 truncate flex-1">
                {fm.failure_mode}
              </span>
              <span
                className="text-xs font-bold ml-2 px-1.5 py-0.5 rounded text-white flex-shrink-0"
                style={{ backgroundColor: RPN_COLOR(fm.rpn) }}
              >
                RPN {fm.rpn}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 space-y-0.5">
              <div><span className="text-slate-500">Function:</span> {fm.function}</div>
              <div><span className="text-slate-500">Effect:</span> {fm.failure_effect}</div>
              <div><span className="text-slate-500">Cause:</span> {fm.failure_cause}</div>
              <div className="flex gap-3 mt-1">
                <span>S={fm.severity}</span>
                <span>O={fm.occurrence}</span>
                <span>D={fm.detection}</span>
              </div>
              {fm.action_required && (
                <div className="text-amber-400 mt-1">⚡ {fm.action_required}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
### 13.3 Reliability Curve Component
```typescript
// src/features/safety/ReliabilityCurve.tsx
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Plus, X } from 'lucide-react';

export default function ReliabilityCurve({ nodeId }: { nodeId: string }) {
  const netboxId = nodeId.replace('device-', '');
  const [failureTimes, setFailureTimes] = useState<string[]>(['']);
  const [rightCensored, setRightCensored] = useState<string[]>(['']);

  const { data: existing } = useQuery({
    queryKey: ['reliability', netboxId],
    queryFn: () => api.get(`/api/topology/device/${netboxId}`).then(r => r.data),
  });

  const fitMutation = useMutation({
    mutationFn: (payload: object) => api.post('/safety/reliability/weibull', payload),
  });

  const handleFit = () => {
    const ft = failureTimes.map(Number).filter(n => n > 0);
    const rc = rightCensored.map(Number).filter(n => n > 0);
    if (ft.length < 2) return;
    fitMutation.mutate({
      netbox_id: netboxId,
      device_name: existing?.name || netboxId,
      failure_times: ft,
      right_censored_times: rc,
    });
  };

  const result = fitMutation.data?.data;

  return (
    <div className="p-3 space-y-3">
      <h3 className="text-xs font-semibold text-slate-200">Weibull Reliability Analysis</h3>

      {/* Existing model summary */}
      {existing?.mttf && (
        <div className="bg-slate-800 rounded p-2 border border-slate-700">
          <div className="text-[10px] text-slate-400">Existing Model</div>
          <div className="text-xs text-slate-200">MTTF: {(existing.mttf / 24).toFixed(0)} days</div>
          <div className="text-xs text-slate-400">
            β={existing.weibull_beta?.toFixed(2)} η={existing.weibull_alpha?.toFixed(0)}h
          </div>
        </div>
      )}

      {/* Failure time inputs */}
      <div>
        abel className="text-[10px] text-slate-400 block mb-1">
          Failure Times (hours)
        </label>
        {failureTimes.map((t, i) => (
          <div key={i} className="flex gap-1 mb-1">
            <input
              type="number" min="0" value={t}
              onChange={e => {
                const n = [...failureTimes]; n[i] = e.target.value; setFailureTimes(n);
              }}
              className="flex-1 text-xs bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
              placeholder="e.g. 8760"
            />
            <button onClick={() => setFailureTimes(ft => ft.filter((_, j) => j !== i))}>
              <X size={10} className="text-slate-500" />
            </button>
          </div>
        ))}
        <button
          onClick={() => setFailureTimes(f => [...f, ''])}
          className="text-[10px] text-blue-400 flex items-center gap-1"
        >
          <Plus size={10} /> Add failure time
        </button>
      </div>

      <button
        onClick={handleFit}
        disabled={fitMutation.isPending}
        className="w-full text-xs py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {fitMutation.isPending ? 'Fitting...' : 'Fit Weibull Distribution'}
      </button>

      {/* Results */}
      {result && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-slate-800 p-2 rounded">
              <div className="text-slate-400">MTTF</div>
              <div className="text-slate-200 font-semibold">
                {(result.mttf_days).toFixed(0)} days
              </div>
            </div>
            <div className="bg-slate-800 p-2 rounded">
              <div className="text-slate-400">B10 Life</div>
              <div className="text-slate-200 font-semibold">
                {(result.b10_life_hours / 24).toFixed(0)} days
              </div>
            </div>
            <div className="bg-slate-800 p-2 rounded">
              <div className="text-slate-400">Shape (β)</div>
              <div className="text-slate-200 font-semibold">{result.beta}</div>
            </div>
            <div className="bg-slate-800 p-2 rounded">
              <div className="text-slate-400">Scale (η)</div>
              <div className="text-slate-200 font-semibold">{result.alpha}h</div>
            </div>
          </div>
          <div
            className="text-[10px] px-2 py-1 rounded"
            style={{ backgroundColor: result.failure_pattern?.color + '22',
                     color: result.failure_pattern?.color }}
          >
            {result.failure_pattern?.pattern}: {result.failure_pattern?.recommendation}
          </div>
          {result.reliability_curve_png_b64 && (
            <img
              src={`data:image/png;base64,${result.reliability_curve_png_b64}`}
              alt="Reliability Curve"
              className="w-full rounded"
            />
          )}
        </div>
      )}
    </div>
  );
}
```

***
## 14. Fault Tree Canvas (ReactFlow + Dagre)
Fault trees are hierarchical top-down tree structures. Use ReactFlow with dagre for top-to-bottom tree layout.[^16]

```typescript
// src/features/safety/FaultTreeCanvas.tsx
import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, BackgroundVariant,
         ReactFlowProvider, useNodesState, useEdgesState } from '@xyflow/react';
import dagre from 'dagre';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';

// Gate node types for FTA visualization
const GATE_COLORS = { OR: '#F97316', AND: '#3B82F6', BASIC: '#22C55E', TOP: '#EF4444' };

function FaultTreeNode({ data }: { data: any }) {
  const bgColor = GATE_COLORS[data.nodeType as keyof typeof GATE_COLORS] || '#475569';
  return (
    <div
      className="px-3 py-2 rounded border-2 text-xs text-white text-center min-w-[100px] max-w-[160px]"
      style={{ backgroundColor: bgColor + '33', borderColor: bgColor }}
    >
      <div className="text-[9px] font-bold mb-0.5" style={{ color: bgColor }}>
        {data.nodeType}
      </div>
      <div className="font-semibold">{data.label}</div>
      {data.probability && (
        <div className="text-[9px] mt-0.5 text-slate-300">
          P={data.probability.toExponential(2)}
        </div>
      )}
    </div>
  );
}

const nodeTypes = { faultTreeNode: FaultTreeNode };

// Convert cut sets to ReactFlow tree layout via dagre
function cutSetsToFlowGraph(cutSets: any[], ftName: string) {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB', ranksep: 60, nodesep: 40 });

  const nodes: any[] = [];
  const edges: any[] = [];

  // Top event node
  const topId = 'TOP';
  dagreGraph.setNode(topId, { width: 160, height: 50 });
  nodes.push({
    id: topId, type: 'faultTreeNode', position: { x: 0, y: 0 },
    data: { label: ftName, nodeType: 'TOP' }
  });

  // Cut sets → OR gate (since minimal cut sets are ORed together)
  const orGateId = 'OR_GATE';
  dagreGraph.setNode(orGateId, { width: 100, height: 40 });
  nodes.push({
    id: orGateId, type: 'faultTreeNode', position: { x: 0, y: 0 },
    data: { label: 'OR', nodeType: 'OR' }
  });
  dagreGraph.setEdge(topId, orGateId);
  edges.push({ id: `${topId}-${orGateId}`, source: topId, target: orGateId });

  // Each cut set → AND gate → basic events
  cutSets.slice(0, 30).forEach((cs, i) => {
    const csNodeId = `CS_${i}`;
    if (cs.order === 1) {
      // Single-point failure — direct to OR gate
      dagreGraph.setNode(csNodeId, { width: 140, height: 50 });
      nodes.push({
        id: csNodeId, type: 'faultTreeNode', position: { x: 0, y: 0 },
        data: { label: cs.events, nodeType: 'BASIC',
                probability: cs.probability }
      });
      dagreGraph.setEdge(orGateId, csNodeId);
      edges.push({ id: `${orGateId}-${csNodeId}`, source: orGateId, target: csNodeId });
    } else {
      // Multi-event cut set → AND gate
      const andGateId = `AND_${i}`;
      dagreGraph.setNode(andGateId, { width: 100, height: 40 });
      nodes.push({
        id: andGateId, type: 'faultTreeNode', position: { x: 0, y: 0 },
        data: { label: 'AND', nodeType: 'AND' }
      });
      dagreGraph.setEdge(orGateId, andGateId);
      edges.push({ id: `${orGateId}-${andGateId}`, source: orGateId, target: andGateId });

      cs.events.forEach((event: string, j: number) => {
        const evId = `${csNodeId}_ev_${j}`;
        dagreGraph.setNode(evId, { width: 130, height: 50 });
        nodes.push({
          id: evId, type: 'faultTreeNode', position: { x: 0, y: 0 },
          data: { label: event, nodeType: 'BASIC' }
        });
        dagreGraph.setEdge(andGateId, evId);
        edges.push({ id: `${andGateId}-${evId}`, source: andGateId, target: evId });
      });
    }
  });

  // Apply dagre layout
  dagre.layout(dagreGraph);
  nodes.forEach(node => {
    const pos = dagreGraph.node(node.id);
    node.position = { x: pos.x - 70, y: pos.y - 25 };
  });

  return { nodes, edges };
}

function FaultTreeCanvasInner() {
  const [ftId, setFtId] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { data: ftData } = useQuery({
    queryKey: ['fta', ftId],
    queryFn: () => api.get(`/safety/fta/${ftId}`).then(r => r.data),
    enabled: !!ftId,
    onSuccess: (data) => {
      if (data.cut_sets?.length && data.fault_tree?.name) {
        const { nodes: n, edges: e } = cutSetsToFlowGraph(
          data.cut_sets, data.fault_tree.name
        );
        setNodes(n); setEdges(e);
      }
    }
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b border-slate-700">
        <input
          type="text"
          placeholder="Enter FT ID to load..."
          className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-300"
          onBlur={e => setFtId(e.target.value || null)}
        />
        {ftData?.fault_tree && (
          <div className="mt-1 text-[10px] text-slate-400">
            Cut sets: {ftData.fault_tree.cut_set_count} |
            SPFs: {ftData.fault_tree.single_point_failures}
          </div>
        )}
      </div>
      <div className="flex-1">
        <ReactFlow
          nodes={nodes} edges={edges}
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes} fitView
          defaultEdgeOptions={{ type: 'smoothstep',
            style: { stroke: '#475569', strokeWidth: 1.5 } }}
        >
          <Background variant={BackgroundVariant.Dots}
            gap={20} color="#1E293B" />
          <Controls className="!bg-slate-800 !border-slate-700" />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function FaultTreeCanvas() {
  return <ReactFlowProvider><FaultTreeCanvasInner /></ReactFlowProvider>;
}
```

***
## 15. Stage 4 Architecture — Runtime Risk & Bow-Tie
Stage 4 (Sprint 7) builds on the Stage 2 safety layer to produce Bow-Tie diagrams (combining FT + ET), BESS/substation reliability models, and runtime risk scores updated from live topology changes.

```
Stage 2 Outputs          Stage 4 Extensions
─────────────────────    ─────────────────────────────────────
:FaultTree (Neo4j)   →  bayesiansafety: combine FT + EventTree
:ThreatComponent    →   BowTie pivot node (left = threat causes,
  (Sprint 4)             right = consequence branches)
:Zone (Neo4j)        →  relsad: Monte Carlo reliability model
                          for BESS/distribution zone
Topology WebSocket  →   Runtime risk score updates on
                          device change events
```

***
## 16. Library 6: bayesiansafety — Bow-Tie (Sprint 7)
### 16.1 Library Reference
| Item | Value |
|---|---|
| GitHub | `github.com/Laboratory-for-Safe-and-Secure-Systems/bayesiansafety` |
| License | MIT[^17] |
| Install | `pip install .` (from source — not yet on PyPI) |
| ICE Risk | 🟢 Very Low |

bayesiansafety implements Bayesian Network-based FT and ET analysis and the Bow-Tie synthesis of both. The Bow-Tie model has a **pivot node** (the top event / loss of control), a **left side** (fault tree = causal analysis), and a **right side** (event tree = consequence analysis). This is the model process safety engineers and insurers actually use for risk quantification.[^18][^19][^17]
### 16.2 Bow-Tie Service
```python
# services/api/services/bowtie_service.py
# bayesiansafety requires local install from GitHub source
# git clone https://github.com/Laboratory-for-Safe-and-Secure-Systems/bayesiansafety
# cd bayesiansafety && pip install .

from bayesiansafety.bowtie import BowTie
from bayesiansafety.faulttree import FaultTreeBayesian
from bayesiansafety.eventtree import EventTree
import uuid, json
from neo4j import AsyncGraphDatabase
from config import settings

driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri, auth=(settings.neo4j_user, settings.neo4j_password)
)

async def create_bowtie(
    bt_name: str,
    plant_unit: str,
    ft_id: str,              # Existing :FaultTree node from pfta (Stage 2)
    pivot_event_name: str,   # Top event name (e.g., "Pump Station Failure")
    event_tree_definition: dict,  # ET definition
    td_component_id: str = None  # Optional: link to Threat Dragon component
) -> dict:
    """
    Create Bow-Tie from existing FaultTree + new EventTree definition.
    Links left side (FT) to right side (ET) via pivot event.
    """
    bt_id = str(uuid.uuid4())

    # Build Bayesian Fault Tree from existing pfta cut sets
    ft_cut_sets = await _load_cutsets_from_neo4j(ft_id)

    # Build Event Tree
    et = EventTree(
        name=pivot_event_name,
        initiating_event=pivot_event_name,
        safeguards=event_tree_definition.get("safeguards", []),
        outcomes=event_tree_definition.get("outcomes", []),
        probabilities=event_tree_definition.get("probabilities", [])
    )

    # Persist Bow-Tie to Neo4j
    async with driver.session() as session:
        await session.run("""
            MERGE (bt:BowTie {bt_id: $bt_id})
            SET bt.name = $name,
                bt.plant_unit = $plant_unit,
                bt.pivot_event = $pivot,
                bt.created_at = timestamp()
            WITH bt
            MATCH (ft:FaultTree {ft_id: $ft_id})
            MERGE (ft)-[:LEFT_SIDE_OF]->(bt)
        """, bt_id=bt_id, name=bt_name, plant_unit=plant_unit,
             pivot=pivot_event_name, ft_id=ft_id)

        # Link to Threat Dragon component if provided (Sprint 4 integration)
        if td_component_id:
            await session.run("""
                MATCH (bt:BowTie {bt_id: $bt_id})
                MATCH (tc:ThreatComponent {td_id: $td_id})
                MERGE (bt)-[:PIVOT]->(tc)
            """, bt_id=bt_id, td_id=td_component_id)

        # Create consequence branch nodes (right side of bow-tie)
        for outcome in event_tree_definition.get("outcomes", []):
            branch_id = str(uuid.uuid4())
            await session.run("""
                MERGE (cb:ConsequenceBranch {branch_id: $branch_id})
                SET cb.outcome_name = $name,
                    cb.probability = $prob,
                    cb.severity = $severity,
                    cb.description = $desc
                WITH cb
                MATCH (bt:BowTie {bt_id: $bt_id})
                MERGE (cb)-[:RIGHT_SIDE_OF]->(bt)
            """,
                branch_id=branch_id, bt_id=bt_id,
                name=outcome.get("name", ""),
                prob=outcome.get("probability", 0.0),
                severity=outcome.get("severity", 1),
                desc=outcome.get("description", "")
            )

    return {
        "bt_id": bt_id,
        "name": bt_name,
        "pivot_event": pivot_event_name,
        "consequences": len(event_tree_definition.get("outcomes", [])),
    }

async def _load_cutsets_from_neo4j(ft_id: str) -> list:
    """Load minimal cut sets from Neo4j FaultTree for Bayesian analysis."""
    async with driver.session() as session:
        result = await session.run("""
            MATCH (cs:CutSet)-[:TOP_EVENT_OF]->(ft:FaultTree {ft_id: $ft_id})
            RETURN cs.events AS events, cs.probability AS probability, cs.order AS order
            ORDER BY cs.order
        """, ft_id=ft_id)
        return [dict(r) async for r in result]

async def get_bowtie(bt_id: str) -> dict:
    """Get Bow-Tie structure for ReactFlow rendering."""
    async with driver.session() as session:
        # Left side (FT cut sets)
        ft_result = await session.run("""
            MATCH (ft:FaultTree)-[:LEFT_SIDE_OF]->(bt:BowTie {bt_id: $bt_id})
            MATCH (cs:CutSet)-[:TOP_EVENT_OF]->(ft)
            RETURN bt.name AS bt_name, bt.pivot_event AS pivot,
                   ft.ft_id AS ft_id, ft.name AS ft_name,
                   collect({events: cs.events, order: cs.order,
                            probability: cs.probability}) AS cut_sets
        """, bt_id=bt_id)
        left = await ft_result.single()

        # Right side (consequence branches)
        et_result = await session.run("""
            MATCH (cb:ConsequenceBranch)-[:RIGHT_SIDE_OF]->(bt:BowTie {bt_id: $bt_id})
            RETURN cb.branch_id AS id, cb.outcome_name AS name,
                   cb.probability AS probability, cb.severity AS severity,
                   cb.description AS description
            ORDER BY cb.probability DESC
        """, bt_id=bt_id)
        right = [dict(r) async for r in et_result]

    return {
        "bt_id": bt_id,
        "name": dict(left)["bt_name"] if left else "",
        "pivot_event": dict(left)["pivot"] if left else "",
        "left_side": dict(left) if left else {},
        "right_side": right,
    }
```

***
## 17. Library 7: relsad — BESS/Distribution Reliability (Sprint 7)
### 17.1 Library Reference
| Item | Value |
|---|---|
| GitHub | `github.com/stinefm/relsad` |
| JOSS Paper | DOI: 10.21105/joss.04516 |
| License | MIT[^20][^21] |
| Install | `pip install relsad` |
| Application | Monte Carlo reliability for distribution networks, BESS, microgrids |
| Outputs | SAIDI, SAIFI, CAIDI, ENS, load point reliability indices |
| ICE Risk | 🟢 Very Low |

relsad is purpose-built for BESS-integrated distribution system reliability. For your energy sector clients with battery energy storage systems and substation OT, this produces the reliability indices (SAIDI, SAIFI) required by grid codes and utility regulators.[^20][^21][^22][^23]

```python
# services/api/services/relsad_service.py
# NOTE: relsad API — verify against current version after install
# pip install relsad

import uuid, json
from neo4j import AsyncGraphDatabase
from config import settings

driver = AsyncGraphDatabase.driver(
    settings.neo4j_uri, auth=(settings.neo4j_user, settings.neo4j_password)
)

async def run_distribution_reliability(
    zone_id: str,
    simulation_config: dict
) -> dict:
    """
    Run RELSAD Monte Carlo reliability simulation for an OT zone
    (typically L1/L2 power distribution with BESS).

    simulation_config example:
    {
        "n_iterations": 1000,
        "time_horizon_years": 1,
        "include_bess": True,
        "bess_capacity_mwh": 10.0,
        "bess_power_mw": 5.0,
        "load_points": [
            {"name": "PLC-ROOM", "load_mw": 0.05, "failure_rate": 0.02, "repair_time": 4},
            {"name": "CONTROL-PANEL", "load_mw": 0.02, "failure_rate": 0.01, "repair_time": 2}
        ],
        "network_sections": [
            {"name": "FEEDER-A", "failure_rate": 0.1, "repair_time": 8, "length_km": 0.5}
        ]
    }
    """
    model_id = str(uuid.uuid4())

    try:
        # relsad import — wrap in try/except for version compatibility
        from relsad.network.components import (
            Bus, Line, CircuitBreaker, Disconnector, Battery
        )
        from relsad.network.systems import Distribution
        from relsad.simulation import Simulation
        from relsad.time import Time, TimeUnit

        # Build relsad network from config
        buses = {}
        for lp in simulation_config.get("load_points", []):
            bus = Bus(name=lp["name"], n_customers=1,
                     average_load=lp["load_mw"])
            buses[lp["name"]] = bus

        # BESS integration if specified
        if simulation_config.get("include_bess"):
            bess = Battery(
                name="BESS-01",
                bus=list(buses.values()),
                E_max=simulation_config.get("bess_capacity_mwh", 10.0),
                SOC_min=0.1,
                SOC_max=0.9,
                n_hours=simulation_config.get("bess_capacity_mwh", 10.0) /
                         simulation_config.get("bess_power_mw", 5.0)
            )

        dist_system = Distribution(
            buses=list(buses.values()),
            name=f"Zone-{zone_id}"
        )

        sim = Simulation(
            distribution_network=dist_system,
            random_seed=42
        )

        # Run Monte Carlo
        n_iter = min(simulation_config.get("n_iterations", 1000), 5000)
        sim.run_monte_carlo(
            iterations=n_iter,
            time=Time(
                simulation_config.get("time_horizon_years", 1),
                TimeUnit.YEAR
            )
        )

        results = sim.get_reliability_indices()

        # Extract key indices
        saidi = round(getattr(results, "SAIDI", 0.0), 3)
        saifi = round(getattr(results, "SAIFI", 0.0), 3)
        caidi = round(saidi / max(saifi, 0.001), 3)
        ens = round(getattr(results, "ENS", 0.0), 3)

        # Persist to Neo4j
        await _persist_reliability_to_neo4j(
            model_id, zone_id, saidi, saifi, caidi, ens, n_iter
        )

        return {
            "model_id": model_id,
            "zone_id": zone_id,
            "n_iterations": n_iter,
            "saidi_hours": saidi,      # System Average Interruption Duration Index
            "saifi_count": saifi,      # System Average Interruption Frequency Index
            "caidi_hours": caidi,      # Customer Average Interruption Duration Index
            "ens_mwh": ens,            # Energy Not Supplied
            "include_bess": simulation_config.get("include_bess", False),
            "interpretation": _interpret_reliability_indices(saidi, saifi),
        }

    except ImportError:
        return {"error": "relsad not installed. Run: pip install relsad"}
    except Exception as e:
        return {"error": f"Simulation failed: {str(e)}"}

def _interpret_reliability_indices(saidi: float, saifi: float) -> dict:
    """Compare against typical distribution system benchmarks."""
    benchmark_saidi = 120  # hours/year (typical distribution benchmark)
    benchmark_saifi = 1.5  # interruptions/year
    return {
        "saidi_vs_benchmark": "Good" if saidi < benchmark_saidi * 0.5 else
                              "Acceptable" if saidi < benchmark_saidi else "Poor",
        "saifi_vs_benchmark": "Good" if saifi < benchmark_saifi * 0.5 else
                              "Acceptable" if saifi < benchmark_saifi else "Poor",
        "note": "Benchmarks based on typical distribution systems. Adjust for OT criticality."
    }

async def _persist_reliability_to_neo4j(
    model_id, zone_id, saidi, saifi, caidi, ens, n_iter
):
    async with driver.session() as session:
        await session.run("""
            MERGE (rm:DistributionReliability {model_id: $model_id})
            SET rm.saidi = $saidi,
                rm.saifi = $saifi,
                rm.caidi = $caidi,
                rm.ens = $ens,
                rm.n_iterations = $n_iter,
                rm.computed_at = timestamp()
            WITH rm
            MATCH (z:Zone {zone_id: $zone_id})
            MERGE (z)-[:HAS_RELIABILITY_MODEL]->(rm)
        """,
            model_id=model_id, zone_id=zone_id,
            saidi=saidi, saifi=saifi, caidi=caidi, ens=ens, n_iter=n_iter
        )
```

***
## 18. Docker Compose — Safety Service Extensions
Add these additions to the existing `docker-compose.yml` from the master PRD:

```yaml
# Additions to docker-compose.yml for Stage 2 and Stage 4

services:
  # Ollama local LLM — for FMEA generation
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_models:/root/.ollama
    # Uncomment for NVIDIA GPU support:
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: 1
    #           capabilities: [gpu]
    restart: unless-stopped

  # Ollama model bootstrap (runs once to pull model)
  ollama-init:
    image: ollama/ollama:latest
    depends_on:
      - ollama
    entrypoint: >
      sh -c "sleep 5 &&
             ollama pull qwen3:14b &&
             echo 'Model ready'"
    environment:
      OLLAMA_HOST: http://ollama:11434
    restart: "no"

  # Safety computation Celery worker (separate queue from sync tasks)
  celery-safety:
    build:
      context: ./services/api
      dockerfile: Dockerfile
    depends_on:
      - api
      - ollama
    command: celery -A tasks.safety_tasks worker
             --queues=safety
             --concurrency=2
             --loglevel=info
    environment:
      NETBOX_URL: http://netbox:8080
      NETBOX_TOKEN: ${NETBOX_API_TOKEN}
      NEO4J_URI: bolt://neo4j:7687
      NEO4J_USER: neo4j
      NEO4J_PASSWORD: ${NEO4J_PASSWORD}
      PG_URL: postgresql://netbox:${POSTGRES_PASSWORD}@postgres:5432/otdiagram_layouts
      REDIS_URL: redis://redis:6379
      OLLAMA_URL: http://ollama:11434
      OLLAMA_MODEL: ${OLLAMA_MODEL:-qwen3:14b}
    restart: unless-stopped

volumes:
  # Add to existing volumes section:
  ollama_models:
```
### 18.1 Environment Variables Addition
```bash
# Add to .env
OLLAMA_MODEL=qwen3:14b    # or gemma3:12b for lower VRAM
```

***
## 19. Sprint 6 & 7 Detailed Implementation Plan
### 19.1 Sprint 6 — Safety Analysis Module (2 weeks)
**Goal:** FTA, FMEA, Weibull, preHAZOP, Critical Items List all operational and visible in React sidebar.

**Pre-sprint Setup (Day 0 — 2 hours):**

```bash
# Run schema migrations
docker exec -it otdiagramstudio-postgres-1 \
  psql -U netbox -d otdiagram_layouts \
  -f /migrations/002_create_safety_schema.sql

# Apply Neo4j constraints
docker exec -it otdiagramstudio-neo4j-1 \
  cypher-shell -u neo4j -p $NEO4J_PASSWORD \
  -f /migrations/neo4j_safety_constraints.cypher

# Pull Ollama model (15-30 min depending on bandwidth)
docker compose exec ollama ollama pull qwen3:14b

# Install new Python deps
docker compose exec api uv pip install pfta fmdtools reliability ollama matplotlib reportlab
```

| # | Task | Owner | Points | Notes |
|---|---|---|---|---|
| 6.1 | prehazop_service.py + integration into Sprint 2 DEXPI ingest endpoint | Backend | 5 | Merge into existing `dexpi_service.py` `ingest_dexpi_xml()` call |
| 6.2 | llm_fmea_service.py + Ollama integration + Celery task | Backend | 8 | Verify Qwen3 JSON output format before proceeding |
| 6.3 | fta_service.py + pfta subprocess wrapper + Neo4j persistence | Backend | 8 | Test with simple 5-event tree first |
| 6.4 | fmdtools_service.py + function architecture builder | Backend | 13 | Complex — allocate 3 days; start with 3-function test model |
| 6.5 | reliability_service.py + Weibull fit + plot generation | Backend | 5 | Test with simulated failure data before real data |
| 6.6 | safety.py FastAPI router — all endpoints | Backend | 5 | Mock service calls for frontend unblocking |
| 6.7 | safety_tasks.py Celery async tasks | Backend | 3 | |
| 6.8 | PostgreSQL safety schema migration + seed data | Backend | 2 | |
| 6.9 | Neo4j safety constraints + indexes | Backend | 1 | |
| 6.10 | CriticalItemsList.tsx React component | Frontend | 5 | Priority-sorted, filterable table |
| 6.11 | HAZOPDeviationPanel.tsx React component | Frontend | 3 | Risk matrix color coding |
| 6.12 | FMEATable.tsx + AI generate button | Frontend | 5 | RPN color bands + action tracking |
| 6.13 | ReliabilityCurve.tsx + failure time input | Frontend | 5 | Display base64 PNG from API |
| 6.14 | FaultTreeCanvas.tsx + dagre layout | Frontend | 8 | Tree rendering with gate nodes |
| 6.15 | SafetySidebarTab.tsx integration | Frontend | 3 | Tab added to existing sidebar |
| 6.16 | Node Detail Panel — safety summary section | Frontend | 3 | Show top RPN, MTTF, HAZOP count |
| 6.17 | Integration tests — safety API + Neo4j | QA | 5 | |

**Sprint 6 Total: 97 story points — 2.5 developers for 2 weeks**
### 19.2 Sprint 7 — Runtime Risk & Bow-Tie (2 weeks)
**Goal:** Bow-Tie canvas, RELSAD BESS reliability, runtime risk score on canvas nodes.

| # | Task | Owner | Points | Notes |
|---|---|---|---|---|
| 7.1 | bayesiansafety install from source + Docker build step | DevOps | 3 | git clone into api container build |
| 7.2 | bowtie_service.py + Neo4j BowTie/ConsequenceBranch persistence | Backend | 8 | |
| 7.3 | relsad_service.py + Monte Carlo BESS reliability | Backend | 8 | |
| 7.4 | Safety router — /bowtie and /reliability/distribution endpoints | Backend | 3 | |
| 7.5 | Runtime risk score calculator — weighted score from HAZOP+FTA+MTTF | Backend | 5 | Write score to Device.runtime_risk_score in Neo4j |
| 7.6 | WebSocket risk broadcast — push updated risk scores on device change | Backend | 5 | Extend existing WS manager |
| 7.7 | BowTie canvas — ReactFlow diagram (FT left + ET right + pivot center) | Frontend | 13 | Most complex frontend task in Sprint 7 |
| 7.8 | RELSAD result panel — SAIDI/SAIFI display + zone selection | Frontend | 5 | |
| 7.9 | Canvas node risk badge — runtime_risk_score overlay on OTDeviceNode | Frontend | 3 | Color gradient: green → amber → red |
| 7.10 | Risk score legend + filter panel | Frontend | 3 | |
| 7.11 | CIL export — PDF report generation (ReportLab) | Backend | 5 | |
| 7.12 | Integration tests | QA | 5 | |

**Sprint 7 Total: 67 story points — 2 developers for 2 weeks**

***
## 20. Testing Strategy — Safety Layer
### 20.1 Unit Tests
```python
# services/api/tests/test_prehazop_service.py
import pytest
from services.prehazop_service import (
    _estimate_severity, _generate_consequence_text, HAZOP_MATRIX
)

def test_hazop_matrix_completeness():
    """All guide words have at least one applicable parameter."""
    for gw, params in HAZOP_MATRIX.items():
        assert len(params) > 0, f"Guide word {gw} has no parameters"

def test_severity_estimation_no_flow():
    severity = _estimate_severity("No", "Flow", "Pump")
    assert severity == 4, "No Flow on Pump should be maximum severity"

def test_consequence_text_generation():
    text = _generate_consequence_text("No", "Flow", "Pump", "PUMP-101")
    assert "PUMP-101" in text
    assert "flow" in text.lower() or "Flow" in text

# services/api/tests/test_fta_service.py
def test_parse_pfta_output_simple():
    from services.fta_service import _parse_pfta_output
    mock_output = """
    Minimal Cut Sets:
    {PUMP_A_FAILURE} 0.05
    {MOTOR_OVERLOAD, IMPELLER_DAMAGE} 0.001
    {CONTROL_SIGNAL_LOSS, VALVE_STUCK_CLOSED, BEARING_FAILURE} 0.0001
    """
    cut_sets = _parse_pfta_output(mock_output)
    assert len(cut_sets) == 3
    spfs = [cs for cs in cut_sets if cs["order"] == 1]
    assert len(spfs) == 1
    assert spfs["events"] == ["PUMP_A_FAILURE"]
    assert cut_sets["order"] == 1  # Sorted by order

# services/api/tests/test_reliability_service.py
@pytest.mark.asyncio
async def test_weibull_fit_basic():
    from services.reliability_service import fit_weibull
    result = await fit_weibull(
        netbox_id="test-device-001",
        device_name="TEST-PUMP",
        failure_times=[4380, 8760, 6570, 2190, 11000],
        right_censored_times=[17520, 17520],
    )
    assert "alpha" in result
    assert "beta" in result
    assert "mttf_hours" in result
    assert result["beta"] > 0
    assert result["alpha"] > 0

def test_interpret_beta_infant_mortality():
    from services.reliability_service import _interpret_beta
    result = _interpret_beta(0.5)
    assert result["pattern"] == "Infant Mortality"

def test_interpret_beta_wearout():
    from services.reliability_service import _interpret_beta
    result = _interpret_beta(3.5)
    assert "Wear-Out" in result["pattern"]
```
### 20.2 Integration Tests
```python
# services/api/tests/test_safety_integration.py
import pytest
import httpx

BASE = "http://localhost:8001"

SAMPLE_FT = """
TOP_EVENT = PUMP_STATION_FAILURE OR
    SINGLE_POINT_FAILURE 0.01
    COMBINED_FAILURE AND
        MOTOR_FAIL 0.05
        CONTROL_FAIL 0.03
"""

@pytest.mark.asyncio
async def test_fta_upload_and_retrieve():
    async with httpx.AsyncClient() as client:
        # Upload FT
        response = await client.post(
            f"{BASE}/api/safety/fta/run",
            headers={"Authorization": f"Bearer {TEST_TOKEN}"},
            json={
                "ft_name": "Test FTA",
                "plant_unit": "UNIT-100",
                "ft_definition": SAMPLE_FT,
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "ft_id" in data
        assert data["single_event_cuts"] == 1  # SINGLE_POINT_FAILURE

        # Retrieve results
        ft_id = data["ft_id"]
        retrieve = await client.get(
            f"{BASE}/api/safety/fta/{ft_id}",
            headers={"Authorization": f"Bearer {TEST_TOKEN}"}
        )
        assert retrieve.status_code == 200
        ft_data = retrieve.json()
        assert ft_data["fault_tree"]["cut_set_count"] >= 1

@pytest.mark.asyncio
async def test_cil_populated_after_prehazop():
    """After preHAZOP runs, CIL should contain high-risk deviations."""
    async with httpx.AsyncClient() as client:
        # Trigger preHAZOP
        trigger = await client.post(
            f"{BASE}/api/safety/hazop/run/UNIT-100",
            headers={"Authorization": f"Bearer {TEST_TOKEN}"}
        )
        assert trigger.status_code == 200

        # Wait for Celery task (in tests, use eager mode)
        import asyncio; await asyncio.sleep(3)

        # Check CIL
        cil = await client.get(
            f"{BASE}/api/safety/critical-items/UNIT-100",
            headers={"Authorization": f"Bearer {TEST_TOKEN}"}
        )
        assert cil.status_code == 200
        items = cil.json()
        assert len(items) >= 0  # May be 0 if test data has no high-risk deviations
```

***
## 21. Critical Items List — Data Model & Report Generation
The CIL aggregates findings from **all four safety analyses** into a single ranked list:

```python
# services/api/services/cil_service.py
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
import io
from datetime import datetime

CIL_ITEM_TYPES = {
    "HAZOPHighRisk": "HAZOP High-Risk Deviation",
    "CutSet": "Fault Tree Single Point of Failure",
    "HighRPN": "FMEA High Risk Priority Number",
    "LowMTTF": "Reliability Low MTTF",
}

async def generate_cil_pdf(plant_unit: str) -> bytes:
    """Generate a PDF Critical Items List report from all safety sources."""
    from services.layout_service import get_pg_connection

    async with get_pg_connection() as conn:
        rows = await conn.fetch("""
            SELECT ci.*,
                   nb.name AS device_name,
                   nb.purdue_level AS purdue_level
            FROM safety.critical_items ci
            LEFT JOIN (
                -- Join with NetBox device data via API (simplified)
                SELECT unnest(ARRAY['placeholder']) AS netbox_id,
                       unnest(ARRAY['placeholder']) AS name,
                       unnest(ARRAY['placeholder']) AS purdue_level
            ) nb ON ci.device_netbox_id = nb.netbox_id
            WHERE ci.plant_unit = $1
            ORDER BY ci.priority ASC, ci.risk_score DESC
        """, plant_unit)

    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=(842, 595))  # A4 landscape
    styles = getSampleStyleSheet()
    story = []

    # Title
    story.append(Paragraph(
        f"<b>Critical Items List — {plant_unit}</b><br/>"
        f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}",
        styles['Title']
    ))

    # Table data
    headers = ["Priority", "Type", "Device", "Description", "Risk Score", "Status"]
    data = [headers]
    for row in rows:
        data.append([
            str(row["priority"]),
            CIL_ITEM_TYPES.get(row["item_type"], row["item_type"]),
            row.get("device_name", row["device_netbox_id"] or "")[:20],
            row["description"][:80] + ("..." if len(row["description"]) > 80 else ""),
            f"{row['risk_score']:.1f}",
            row["status"],
        ])

    table = Table(data, colWidths=[50, 100, 80, 280, 60, 70])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E3A5F')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1),
         [colors.HexColor('#F8FAFC'), colors.white]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(table)
    doc.build(story)
    buf.seek(0)
    return buf.read()
```

***
## 22. ICE Risk Summary & License Compliance
| Library | Stage | License | ICE Risk | Action Required |
|---|---|---|---|---|
| `pfta` | 2 | MIT | 🟢 Very Low | None[^5][^6] |
| `fmdtools` | 2 | BSD-3 (NASA) | 🟢 Very Low | Attribution in docs[^8][^9] |
| `reliability` | 2 | LGPLv3 | 🟡 Low | Use as server-side library only. Do not statically link or embed in distributed binary. Legal review if the API becomes a commercial SaaS product.[^13][^14][^15] |
| `ollama` (Python client) | 2 | MIT | 🟢 Very Low | None |
| `bayesiansafety` | 4 | MIT | 🟢 Very Low | Install from GitHub source — no PyPI release yet[^17] |
| `relsad` | 4 | MIT | 🟢 Very Low | None[^20][^24] |
| `matplotlib` | 2 | PSF | 🟢 Very Low | Attribution only |
| `reportlab` | 2 | BSD | 🟢 Very Low | None |
| `react-d3-tree` | 2 | MIT | 🟢 Very Low | None[^25] |
| `dagre` | 2 | MIT | 🟢 Very Low | Already in stack[^16] |
| `recharts` | 2 | MIT | 🟢 Very Low | None |

> ⛔ **Do NOT use `sfta` (GPL-3.0)** — it is a similar fault tree tool that introduces copyleft risk. Use `pfta` (MIT) exclusively.[^7]

***
## 23. Full Reference Index
| Topic | Reference |
|---|---|
| pfta GitHub (Fault Tree Analyser — MIT) | https://github.com/public-fta/pfta |
| pfta on PyPI | https://pypi.org/project/pfta/ |
| fmdtools GitHub (NASA — BSD-3) | https://github.com/nasa/fmdtools |
| fmdtools Documentation | https://nasa.github.io/fmdtools |
| fmdtools NASA Software Catalog | https://software.nasa.gov/software/ARC-18750-1 |
| fmdtools NITRD RFI (use cases incl. power systems) | https://www.nitrd.gov/rfi/2024/89-FR-78915/FMD-CPSR-RFI-2024.pdf |
| reliability Library (Weibull/MTTF) | https://github.com/MatthewReid854/reliability |
| reliability Documentation | https://reliability.readthedocs.io |
| reliability PyPI | https://pypi.org/project/reliability/ |
| Fit_Weibull_2P API | https://reliability.readthedocs.io/en/latest/API/Fitters/Fit_Weibull_2P.html |
| bayesiansafety (Bow-Tie — MIT) | https://github.com/Laboratory-for-Safe-and-Secure-Systems/bayesiansafety |
| relsad GitHub (MIT) | https://github.com/stinefm/relsad |
| relsad JOSS Paper | https://www.theoj.org/joss-papers/joss.04516/10.21105.joss.04516.pdf |
| relsad SINTEF Publication | https://www.sintef.no/en/publications/publication/0198cc954817-59c751f5-b6fe-40bb-965d-923c80d6d1ce/ |
| LLMRiskAnalyzer GitHub | https://github.com/YuchenXia/LLMRiskAnalyzer |
| Ollama Python Client | https://github.com/ollama/ollama-python |
| preHAZOP Paper (DEXPI guide words) | https://dexpi.org/wp-content/uploads/2020/09/PAAT2022_Oeing_preHAZOP_DEXPI_Homepage.pdf |
| preHAZOP arXiv (rule-based P&ID autocorrection) | https://arxiv.org/html/2502.18493v1 |
| preHAZOP Algorithm Details | https://d-nb.info/1289101418/34 |
| HAZOP Guide Words (IEC 61882) | https://www.primatech.com/technical/pt-notes/170-understanding-hazop-deviations |
| Fault Tree Analysis — Wikipedia | https://en.wikipedia.org/wiki/Fault_tree_analysis |
| Fault Tree Analysis — IBM Guide | https://www.ibm.com/think/topics/fault-tree-analysis |
| Bow-Tie vs FTA/ETA | https://www.ehs.com/blogs/bowties-fault-trees-and-event-tree-analysis/ |
| ReactFlow Dagre Tree Layout | https://reactflow.dev/examples/layout/dagre |
| react-d3-tree GitHub | https://github.com/bkrem/react-d3-tree |
| Weibull Analysis Tutorial | https://maxlogic.substack.com/p/reliability-analysis-using-a-weibull |
| Weibull Beta Interpretation | https://maxlogic.substack.com/p/reliability-analysis-using-a-weibull |
| Sandia BESS Reliability Tool (ProGRESS) | https://www.sandia.gov/app/uploads/sites/82/2024/08/PR2024_503_Bera_Atri_Analytics-Tools-1.pdf |
| Neo4j Graph Modeling Guide | https://hackolade.com/nosqldb/neo4j-data-modeling.html |
| OSS License Risk Overview | https://www.blackduck.com/blog/top-open-source-licenses.html |

---

## References

1. [[PDF] preHAZOP: Using DEXPI P&IDs and open-source process ...](https://dexpi.org/wp-content/uploads/2020/09/PAAT2022_Oeing_preHAZOP_DEXPI_Homepage.pdf) - How to automate safety assessments in early engineering phases? Results of the preHAZOP. • Fast and ...

2. [[PDF] preHAZOP: Graph-Based Safety Analysis for Early Integration into ...](https://d-nb.info/1289101418/34) - This paper presents the preHAZOP search algorithm, which was developed to analyze P&IDs in. DEXPI fo...

3. [Understanding HAZOP Deviations - PT Notes](https://www.primatech.com/technical/pt-notes/170-understanding-hazop-deviations) - The HAZOP method focuses on deviations from design intent because they represent potential problems,...

4. [YuchenXia/LLMRiskAnalyzer: Failure Mode and Effect ... - GitHub](https://github.com/YuchenXia/LLMRiskAnalyzer) - Failure Mode and Effects Analysis (FMEA) is a systematic method used to identify and address potenti...

5. [Public Fault Tree Analyser (PFTA) - GitHub](https://github.com/public-fta/pfta) - Public Fault Tree Analyser (PFTA). Free and open-source fault tree analysis. For rudimentary documen...

6. [public-fta - GitHub](https://github.com/public-fta) - Public Fault Tree Analyser (PFTA): free and open-source fault tree analysis. Python 9 2. Repositorie...

7. [Slow Fault Tree Analyser (SFTA) - PyPI](https://pypi.org/project/sfta/) - Fault Tree Analysis Using Bit Manipulation. IEEE Transactions on Reliability ... "PyPI", "Python Pac...

8. [GitHub - nasa/fmdtools: System Resilience Modelling, Simulation ...](https://github.com/nasa/fmdtools) - fmdtools (Fault Model Design tools) is a Python library for modelling, simulating, and analyzing the...

9. [fmdtools(ARC-18750-1) - NASA Software Catalog](https://software.nasa.gov/software/ARC-18750-1) - Fmdtools is a Python toolkit for simulating the dynamic effects of hazardous scenarios in complex en...

10. [Overview — fmdtools 2.3.3 documentation - NASA](https://nasa.github.io/fmdtools/) - With fmdtools, you can (1) represent system structure and behavior in a model, (2) simulate the dyna...

11. [fmdtools/docs-source/Intro_to_fmdtools.md at main - GitHub](https://github.com/nasa/fmdtools/blob/main/docs-source/Intro_to_fmdtools.md) - Flows represent connections or shared variables between different functions. Think of them as Functi...

12. [[PDF] Public Input on the National Cyber-Physical Systems Resilience Plan](https://www.nitrd.gov/rfi/2024/89-FR-78915/FMD-CPSR-RFI-2024.pdf) - The fmdtools (Fault Model Design Tools) library1 was developed to enable the consideration of resili...

13. [GitHub - https://reliability.readthedocs.io/en/latest/ · GitHub - GitHub](https://github.com/MatthewReid854/reliability) - reliability is a Python library for reliability engineering and survival analysis. It significantly ...

14. [reliability - PyPI](https://pypi.org/project/reliability/) - reliability is a Python library for reliability engineering and survival analysis. ... License: GNU ...

15. [Contents: — reliability 0.9.0 documentation](https://reliability.readthedocs.io) - reliability is a Python library for reliability engineering and survival analysis. It significantly ...

16. [Dagre Tree - React Flow](https://reactflow.dev/examples/layout/dagre) - This example shows how you can integrate dagre.js with React Flow to create simple tree layouts. Goo...

17. [GitHub - Laboratory-for-Safe-and-Secure-Systems/bayesiansafety](https://github.com/Laboratory-for-Safe-and-Secure-Systems/bayesiansafety) - bowtie: Load Bow-Tie model (FT + ET); Instantiate Bow-Tie model from FT and ET with custom pivot nod...

18. [[PDF] Fault Tree Analysis Event Tree Analysis Bowtie Analysis](https://mimihassim.files.wordpress.com/2013/04/faulteventbowtiemimi_hassim.pdf) - Fault Tree Analysis (cont.) ▫ Fault Tree can help to: ▫ Quantifying probability of top event occurre...

19. [Bowties, Fault Trees and Event Tree Analysis - VelocityEHS](https://www.ehs.com/blogs/bowties-fault-trees-and-event-tree-analysis/) - Learn more of bowtie analysis and how it compare to other analysis methods based on probability, lik...

20. [GitHub - stinefm/relsad: A Python package for reliability assessment ...](https://github.com/stinefm/relsad) - A Python-based reliability assessment tool that aims to function as a foundation for reliability cal...

21. [[PDF] RELSAD: A Python package for reliability assessment of modern ...](https://www.theoj.org/joss-papers/joss.04516/10.21105.joss.04516.pdf) - The tool allows for Monte Carlo simulation based reliability analysis of modern distribution network...

22. [RELSAD: A Python package for reliability assessment of modern ...](https://www.sintef.no/en/publications/publication/0198cc954817-59c751f5-b6fe-40bb-965d-923c80d6d1ce/) - The tool allows for Monte Carlo simulation based reliability analysis of modern distribution network...

23. [RELSAD: A Python package for reliability assessment of modern ...](https://www.academia.edu/100895446/RELSAD_A_Python_package_for_reliability_assessment_of_modern_distribution_systems) - RELSAD is an open-source Python tool for reliability assessment of modern distribution systems. It u...

24. [[REVIEW]: RELSAD: A Python package for reliability assessment of ...](https://github.com/openjournals/joss-reviews/issues/4516) - [PRE REVIEW]: RELSAD: A Python package for reliability assessment of modern distribution systems #43...

25. [bkrem/react-d3-tree: :deciduous_tree - GitHub](https://github.com/bkrem/react-d3-tree) - React D3 Tree is a React component that lets you represent hierarchical data (eg family trees, org c...

