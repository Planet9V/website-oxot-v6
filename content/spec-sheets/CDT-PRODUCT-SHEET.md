# O<span class="brand-x">X</span>OT Cyber Digital Twin — Product Capability & Specification Sheet

> **Document Class:** Product Capability & Specification Sheet  
> **Target Audience:** CISOs, Plant Managers, Chief Architects, M&A Due Diligence Leads, Risk Actuaries  
> **Brand Mark:** `O<span class="brand-x">X</span>OT` (0.28em letter-spacing, orange X accent)  
> **Core Differentiator:** *Traditional digital twins optimize yield and throughput. OXOT Cyber Digital Twins protect minimum operating requirements and facility crown jewels.*

---

## Executive Overview: The Physics-Based Cyber Digital Twin

Born from the necessity to execute high-stakes M&A due diligence under tight deadlines, the **O<span class="brand-x">X</span>OT Seldon Engine** provides a living, engineering-grade model of critical infrastructure assets. 

Unlike traditional digital twins that only focus on operational optimization or IT vulnerability scanners that flood security teams with uncontextualized CVE alerts, OXOT unifies **Level 1 facility physics**, **Purdue network topology**, **7-dimensional threat actor intelligence (TACAM)**, and **actuarial loss data (ALE)** into one deterministic model.

---

## System Specifications & Executive Summary (Spec-Row Architecture)

| Specification Key | Engineering Realization | Business & Financial Value Delivered |
| :--- | :--- | :--- |
| **PRIMARY MODEL** | Physics-Based 7-Layer Purdue Cyber Digital Twin | Eliminates blind spots by representing the complete facility—from fluid dynamics to CISO reporting. |
| **RISK QUANTIFICATION** | Annualized Loss Expectancy (ALE) in USD / EUR | Converts complex cyber risks into board-level monetary loss figures grounded in SEC 8-K disclosures. |
| **DEPLOYMENT SPEED** | 14-Day Rapid M&A & Facility Baseline | Ingests P&ID schematics and network traces without plant downtime or active scanning. |
| **HOSTING JURISDICTION** | 100% On-Premises "Island" or AWS Sovereign Cloud | Guarantees zero cloud data leakage; sensitive plant diagrams never leave customer hardware. |
| **SIMULATION CAPACITY** | 10,000 Monte Carlo Attack Campaigns / Pass | Evaluates alternate operational history, human errors, and equipment upgrade ROI before spending capital. |
| **SUPPLY CHAIN BOMs** | 5 Machine-Readable BOMs (SBOM, HBOM, CBOM, SaaSBOM, Ops-BOM) | Tracks transitive component risks across software, chips, post-quantum crypto, and cloud APIs. |
| **COMPLIANCE MAPPINGS** | Built-in IEC 62443, EU CRA Annex VII, NIS2, TS 50701 | Generates technical compliance evidence directly from the living operational model. |

---

## 01 :: Core Differentiators vs. Traditional Solutions

```
+-----------------------------------------------------------------------------------+
| TRADITIONAL OPERATIONAL TWINS (Siemens, GE, Bentley)                              |
| -> Optimizes yield, throughput, and maintenance under normal operating conditions.|
| -> Completely blind to cyber threat pathways, malware, and adversary tactics.    |
+-----------------------------------------------------------------------------------+
| TRADITIONAL IT VULNERABILITY SCANNERS (Tenable, Qualys, CrowdStrike)               |
| -> Floods SOC teams with 10,000 unprioritized CVE alerts per day.                 |
| -> Ignores Level 1 plant physics, SCADA safety functions, and operational drift.  |
+-----------------------------------------------------------------------------------+
| OXOT CYBER DIGITAL TWIN (Seldon Engine)                                           |
| -> Unifies Level 1 process physics + 7-layer Purdue network topology.            |
| -> Identifies risks to MINIMUM OPERATING REQUIREMENTS and facility CROWN JEWELS.  |
| -> Calculates exact ALE financial loss & ranks actions NOW / NEXT / NEVER.        |
+-----------------------------------------------------------------------------------+
```

---

## 02 :: The 7-Layer Physics & Cyber Architecture Stack

OXOT represents industrial operations across seven distinct layers, mapping physical plant equipment directly to business strategy:

| Layer | Technical Domain | Systems & Protocols | Value Provided to Operation |
| :--- | :--- | :--- | :--- |
| **LEVEL 01 · PHYSICS** | Environmental & Kinetics | Process simulations, thermodynamics, fluid dynamics, environmental pressures. | Evaluates if a cyber attack can cause physical pipe bursts, chemical spills, or thermal runaway. |
| **LEVEL 02 · ASSETS** | Physical Systems | PLC logic programs, SCADA configs, virtualized controllers, RTUs, field sensors. | Identifies single points of failure across controllers and physical safety functions. |
| **LEVEL 03 · INTEROP** | Asset Models & Protocols | OPC UA, MQTT, DEXPI 2.0 (P&ID XML), Modbus, DNP3, CycloneDX integration. | Ingests existing engineering drawings without manual data re-entry or vendor lock-in. |
| **LEVEL 04 · NETWORKS** | Topology & Communication | Virtual network state, Purdue Model isolation, flow data, OT/IT boundary checks. | Maps exact network pathways adversaries use to reach safety-critical systems. |
| **LEVEL 05 · DATA FUSION** | Threat & Geopolitical | Unified data model, WorldMonitor, SEC EDGAR 8-K feeds, World Bank WGI, ACLED. | Tracks geopolitical unrest and nation-state threat actors targeting your sector. |
| **LEVEL 06 · SERVICES** | Business Logic & AI/ML | AI/ML process optimization, P&ID visual canvas, predictive maintenance workflows. | Provides engineers with a visual canvas to run process optimization and risk checks. |
| **LEVEL 07 · GOVERNANCE** | Strategy & Compliance | ALE financial models, Consequence Index, Monte Carlo scenarios, IEC 62443, CRA. | Gives the Board and C-Suite a single risk number priced in currency with 95% confidence intervals. |

---

## 03 :: The Five Machine-Readable Bills of Materials (BOM Compass)

OXOT extends standard engineering models (DEXPI 2.0) into machine-readable CycloneDX specifications, generating five distinct Bills of Materials:

1. **SBOM (Software Bill of Materials):** Tracks open-source libraries, firmware versions, and transitive dependencies five levels deep.
2. **HBOM (Hardware Bill of Materials):** Maps microcontrollers, ASICs, PLC backplanes, and hardware chip origin risks.
3. **CBOM (Cryptography Bill of Materials):** Inventories cryptographic algorithms, key lengths, certificate expiration dates, and post-quantum readiness.
4. **SaaSBOM (Cloud & Service BOM):** Maps external cloud APIs, remote vendor maintenance tunnels, and SaaS dependencies.
5. **Ops-BOM (Operational Procedure BOM):** Captures operational workflows, human access roles, and maintenance schedules.

*Value Provided:* Changes in any component automatically recalculate risk deltas and update CRA Annex VII technical files in real time.

---

## 04 :: TACAM & ATQ: 7-Dimensional Threat Actor Intelligence

Traditional threat feeds sell flat lists of IP addresses and generic IOCs. OXOT uses the **Threat Actor Capability & Motivation Matrix (TACAM)** and **ATQ 12-Factor Profiling**:

### TACAM 7-Dimensional Spectral Matrix (77,279 Data Points / 389 Threat Groups)

- **TTP Cluster:** Preferred MITRE ATT&CK techniques.
- **Sector Affinity:** Targeting probability across CISA critical infrastructure sectors.
- **Geographic Origin & Target:** Origin regions and target geographies.
- **Protocol Capability:** Specific OT protocols exploited (Modbus, OPC UA, DNP3, PROFINET, BACnet, MQTT).
- **Temporal Rhythm:** Operational tempo, campaign recency, and seasonal dormancy patterns.
- **CPE Match (62,965 Product Rows):** Exact vendor product exploit capabilities (e.g., Siemens SIMATIC, Schneider Modicon, Allen-Bradley).
- **CWE Concentration:** Weakness families exploited (e.g., Out-of-bounds Write, Path Traversal).

```
EXAMPLE CROSS-QUERY VALUE:
"Which threat actors target the Energy sector using Modbus TCP against Schneider Electric Modicon M340 PLCs?"
--> TACAM returns Volt Typhoon (ATQ 82.9) and Dragonfly (ATQ 79.7) in under 1 second, showing exact CVE pathways.
```

---

## 05 :: Consequence Engineering & Simulation Engine

OXOT uses structural consequence engineering to eliminate low-priority alert noise:

- **FMECA (Failure Mode, Effects & Criticality Analysis):** Calculates failure effects per component.
- **RCIL (Reliability-Critical Items List) & SCIL (Safety-Critical Items List):** Binds security findings directly to process safety functions.
- **Monte Carlo Simulation Engine:** Runs **10,000 attack campaigns per pass** using the Seldon Engine's mathematical axioms to calculate the exact probability of an adversary reaching a safety-critical system (with a 95% confidence interval).
- **NOW / NEXT / NEVER Prioritization:** Ranks remediation by `Consequence × Exploitability`, giving security teams explicit written authorization to ignore non-critical noise.

---

## 06 :: Deployment Modes & Jurisdiction

OXOT enforces complete data sovereignty through single-tenant architecture:

```
[Customer Premises / Air-Gapped OT Network] 
   |---> OXOT Island Instance (Local Seldon Engine + Database)
   |---> Zero Outbound Telemetry (No Data Leakage)

[AWS European Sovereign Cloud Option]
   |---> Dedicated EU Data Residency Instance
```

### Engagement Models
1. **14-Day M&A Due Diligence:** Rapid baseline assessment of target acquisition facilities without plant downtime.
2. **60-Day CRA Transit Engagement:** Assisted engagement for a single product or plant to generate the full EU Cyber Resilience Act (CRA) Annex VII technical file.
3. **Long-Term Enterprise License:** Continuous living digital twin deployed on-premises with full capability transfer to customer teams.

---

*The Consequence Index, ALE, and simulation outputs are transparent, drillable calculations validated on industrial engagements. All data processing occurs inside the customer's jurisdiction.*
