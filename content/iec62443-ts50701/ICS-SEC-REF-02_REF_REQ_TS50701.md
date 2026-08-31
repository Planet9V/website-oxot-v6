---
tags: [iec62443, workpaper, ts50701, requirements, railway]
type: reference
status: converted
---

# Reference: TS 50701 SIL-to-SL-T Relationship and Railway Cybersecurity Framework

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-REF-02_REF_REQ_TS50701]] |
| Version | 1.0 FINAL |
| Date | 2026-03-02 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | COMPILED |
| Dossier Section | References |
| Dossier Position | Document 85 of 101 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

## 1. Purpose

This reference section documents the relationship between Safety Integrity Levels (SIL) as defined in the EN 50126/50128/50129 railway RAMS standards and Target Security Levels (SL-T) as defined in EN CLC/TS 50701:2021 and IEC 62443-3-2:2020. This section is a standalone reference; it does not assign SIL or SL-T values to specific [Project Name] subsystems. Zone-level SL-T assignments are documented in Section A (Zone Definitions); validation of SL-T against Achieved Security Level (SL-A) will be performed in Step 4 (CRTM and Exception Log).

## 2. TS 50701:2021 — Key Principles

### 2.1 No Prescriptive SIL-to-SL-T Mapping

EN CLC/TS 50701:2021 explicitly does **not** provide a fixed, numeric mapping table from SIL to SL-T. Instead, TS 50701 prescribes a **risk-based derivation process** for determining SL-T at the zone and conduit level (CENELEC, 2021, EN CLC/TS 50701:2021, §6.4). This is a deliberate design decision: the standard recognises that the relationship between functional safety (SIL) and cybersecurity (SL-T) is context-dependent, varying with the operational environment, threat landscape, and specific consequence analysis for each System under Consideration (SuC) (CENELEC, 2021, EN CLC/TS 50701:2021).

The SL-T derivation process prescribed by TS 50701 consists of the following steps (CENELEC, 2021, EN CLC/TS 50701:2021, §6.4):

- **Identify the SuC** and its essential safety and operational functions using RAMS outputs from EN 50126 (CENELEC, 2021, EN CLC/TS 50701:2021).
- **Create a zone and conduit model** following IEC 62443-3-2 guidance, grouping assets with similar security requirements (CENELEC, 2021, EN CLC/TS 50701:2021, §6.3–6.4).
- **Determine an initial SL** for each zone/conduit based on the unmitigated consequence of compromise (CENELEC, 2021, EN CLC/TS 50701:2021).
- **Perform explicit risk evaluation** (derivation of SL-T) considering threat likelihood, vulnerability exposure, and organisational risk tolerance (CENELEC, 2021, EN CLC/TS 50701:2021).
- **Allocate countermeasures** from IEC 62443-3-3 to meet the derived SL-T (CENELEC, 2021, EN CLC/TS 50701:2021).
### 2.2 Separation of Safety and Cybersecurity Assurance

TS 50701 recognises the fundamentally different lifecycle characteristics of functional safety and cybersecurity (CENELEC, 2021, EN CLC/TS 50701:2021):

| Characteristic | Functional Safety (EN 50126/50128/50129) | Cybersecurity (TS 50701 / IEC 62443) |
| --- | --- | --- |
| Threat model | Random and systematic faults | Intentional human adversaries with evolving capabilities |
| Lifecycle | Stable after certification; changes require re-approval | Continuous; patching, updates, evolving threats |
| Integrity metric | Safety Integrity Level (SIL 0–4) | Security Level (SL-T, SL-C, SL-A; 0–4) |
| Assurance output | Safety Case (per EN 50129) | Cybersecurity Case (per TS 50701) |
| Change management | Changes costly; require re-certification | Changes frequent; justified by threat evolution |

(CENELEC, 2021, EN CLC/TS 50701:2021; CENELEC, 2017, EN 50126-1:2017; CENELEC, 2011, EN 50129:2003+A2:2011)

TS 50701 therefore seeks to **separate** safety approval and cybersecurity acceptance as much as possible while coordinating outputs through the EN 50126 lifecycle. Safety outputs (SIL determination, Safety Case) remain RAMS deliverables; TS 50701 adds cybersecurity deliverables (Cybersecurity Case, SL-T definitions, Security-Related Application Conditions) that are linked but independently evidenced (CENELEC, 2021, EN CLC/TS 50701:2021).

### 2.3 Security-Related Application Conditions (SecRAC)

TS 50701 introduces the concept of **Security-Related Application Conditions (SecRAC)** — conditions that must be maintained in the operational environment for the cybersecurity assumptions of the Safety Case to remain valid (CENELEC, 2021, EN CLC/TS 50701:2021). SecRACs bridge the safety and cybersecurity domains; they define the cybersecurity measures that the Safety Case depends upon. A change in cybersecurity posture (e.g., a firewall policy change) that violates a SecRAC may require re-evaluation of the Safety Case.

## 3. Practical SIL-to-SL-T Relationship: Industry Practice

While TS 50701 does not prescribe a fixed mapping, industry practice and regulatory expectations in the railway sector reveal consistent patterns. The following table documents observed industry practice — it is **not** a normative mapping from TS 50701, but represents the outcomes commonly seen when risk-based derivation is applied to railway systems (Shieldworkz, 2026; ERA, 2023, SUBSET-118 v1.5.0; CENELEC, 2021, EN CLC/TS 50701:2021).

| Safety Context (SIL) | TS 50701 Stance | Typical SL-T Outcome (Industry Practice) | Rationale |
| --- | --- | --- | --- |
| SIL 0 — No safety requirements | Risk-based derivation; SL-T may be low but must be justified | SL-1 (casual/coincidental protection) | Compromise does not affect safety; basic hygiene measures sufficient |
| SIL 1 — Low safety integrity | Risk-based derivation; operational consequences assessed | SL-1 to SL-2 (simple means protection) | Minor safety contribution; operational disruption is the primary consequence |
| SIL 2 — Medium safety integrity | Risk-based derivation; safety consequences elevate SL-T | SL-2 to SL-3 (moderate resources protection) | Significant safety contribution; compromise could lead to degraded safety function |
| SIL 3 — High safety integrity | Industry practice targets SL-3 or higher for safety-critical zones | SL-3 (sophisticated attack protection) | Safety of life consequences; signalling, fire systems, ventilation. TS 50701 expects higher SL-T justified by risk evaluation |
| SIL 4 — Very high safety integrity | Industry practice targets SL-3 to SL-4 | SL-3 to SL-4 (state-sponsored attack protection) | Highest safety consequence; nuclear-grade safety systems. Railway systems rarely require SIL 4 except for specific signalling interlocks |

(Shieldworkz, 2026; ERA, 2023, SUBSET-118 v1.5.0; IEC, 2020, IEC 62443-3-2:2020)

**Important:** Each SL-T assignment in the [Project Name] Cybersecurity Case must be individually justified through explicit risk evaluation, not by referencing this industry practice table alone. The table above is provided for context and calibration only. The Cybersecurity Case must document the risk-based derivation process, inputs from the Safety Case, and the specific consequence analysis for each zone (CENELEC, 2021, EN CLC/TS 50701:2021).

## 4. Three Security Level Constructs

IEC 62443 defines three distinct Security Level constructs that interact with the SIL relationship (IEC, 2020, IEC 62443-3-2:2020; IEC, 2013, IEC 62443-3-3:2013):

| Construct | Symbol | Definition | When Determined | Where Documented |
| --- | --- | --- | --- | --- |
| Target Security Level | SL-T | Security objective for a zone/conduit; derived from risk assessment | Step 2 (this artifact) and Step 3 (TVA) | Zone Definitions (Section A), Step 3 TVA |
| Capability Security Level | SL-C | Security capability achieved by a product/component as certified by vendor | Supplier FAT/SAT, product certification | Vendor documentation, component datasheets |
| Achieved Security Level | SL-A | Security level actually achieved in the as-built installation | Step 4 (CRTM) — comparison of SL-T vs. SL-A | CRTM and Exception Log (Step 4) |

For the [Project Name] Cybersecurity Case:

- **Step 2** (current) establishes SL-T per zone
- **Step 4** (future) will validate SL-T against SL-A by comparing as-built installations against IEC 62443-3-3 FR/SR requirements, using FAT/SAT reports and supplier documentation

## 5. EN 50126/50128/50129 Cross-Reference Framework

The following table identifies the key EN 50126-series standards and their relationship to the TS 50701 / IEC 62443 cybersecurity framework for the [Project Name] project.

| Standard | Title | Relationship to TS 50701 | [Project Name] Relevance |
| --- | --- | --- | --- |
| EN 50126-1:2017 | Railway RAMS — Part 1: Generic lifecycle | TS 50701 synchronises cybersecurity deliverables to the EN 50126 lifecycle phases. Cybersecurity activities are integrated into the V-cycle | Lifecycle framework for all [Project Name] subsystem assurance |
| EN 50126-2:2017 | Railway RAMS — Part 2: Guide to application of EN 50126-1 for safety | Provides guidance on hazard analysis and SIL determination; SIL values feed into cyber risk context for SL-T derivation | Hazard logs inform Step 3 TVA consequence analysis |
| EN 50128:2011 | Software for railway control and protection systems | Defines software development SIL requirements; TS 50701 references EN 50128 for software integrity of safety-related systems | Software integrity of Pertronic FIP firmware, TVS SCADA, ICS EBI |
| EN 50129:2003+A2:2011 | Safety-related electronic systems for signalling | Defines Safety Case structure and Safety Authority responsibilities; TS 50701 creates a parallel Cybersecurity Case | Safety Case for [Project Name] signalling; SecRACs bridge to Cybersecurity Case |
| EN 50159:2010 | Communication for safety-related systems | Defines categories of communication (open/closed/trusted) and safety communication layers; TS 50701 considers these categories when establishing conduit security requirements | FDAS Modbus TCP/IP (Z1→Z5), TVS OPC UA (Z1→Z5), EMS DSA (Z2→Z5) |

(CENELEC, 2017, EN 50126-1:2017; CENELEC, 2011, EN 50128:2011; CENELEC, 2011, EN 50129:2003+A2:2011; CENELEC, 2010, EN 50159:2010; CENELEC, 2021, EN CLC/TS 50701:2021)

## 6. [Project Name] Project Application

For the [Project Name] project, the risk-based SL-T derivation has been applied as follows (to be validated in Step 3 TVA and Step 4 CRTM):

| Zone | Name | Safety Context | SIL Context | SL-T Assignment | Derivation Basis |
| --- | --- | --- | --- | --- | --- |
| Z1 | Life Safety Systems | Direct safety of life; fire detection, smoke extraction, evacuation | SIL 3 equivalent (life safety systems) | SL-3 | Consequence: loss of fire detection or ventilation during tunnel fire. Industry practice: SIL 3 → SL-3 minimum |
| Z2 | Building Management | Supporting infrastructure; power monitoring, HVAC | SIL 1–2 equivalent (building services) | SL-2 | Consequence: degraded station operations. Safety-critical power delivery (UPS/STS) operates autonomously |
| Z5 | Core Infrastructure | Integration broker; IT services supporting Z1/Z2 | SIL 2 equivalent (centralised control) | SL-3 | Consequence: compromise enables lateral movement to Z1. Acts as trust broker for all zones |
| Z6 | External/Enterprise | Untrusted external networks | N/A (external) | SL-1 | Consequence: limited to external alarm transmission. Untrusted boundary |

**Note:** SL-T assignments above are preliminary and will be formally validated through Step 3 (Cyber-Physical TVA) consequence analysis and Step 4 (CRTM) as-built verification.

## 7. APA Reference Bibliography

- CENELEC. (2010). *EN 50159:2010 — Railway applications — Communication, signalling and processing systems — Safety-related communication in railway systems*. European Committee for Electrotechnical Standardization.
- CENELEC. (2011). *EN 50128:2011 — Railway applications — Communication, signalling and processing systems — Software for railway control and protection systems*. European Committee for Electrotechnical Standardization.
- CENELEC. (2011). *EN 50129:2003+A2:2011 — Railway applications — Communication, signalling and processing systems — Safety related electronic systems for signalling*. European Committee for Electrotechnical Standardization.
- CENELEC. (2017). *EN 50126-1:2017 — Railway applications — The specification and demonstration of Reliability, Availability, Maintainability and Safety (RAMS) — Part 1: Generic RAMS process*. European Committee for Electrotechnical Standardization.
- CENELEC. (2021). *EN CLC/TS 50701:2021 — Railway applications — Cybersecurity*. European Committee for Electrotechnical Standardization.
- ERA. (2023). *SUBSET-118 v1.5.0 — Railway cybersecurity guidance*. European Union Agency for Railways.
- IEC. (2013). *IEC 62443-3-3:2013 — Industrial communication networks — Network and system security — Part 3-3: System security requirements and security levels*. International Electrotechnical Commission.
- IEC. (2020). *IEC 62443-3-2:2020 — Security for industrial automation and control systems — Part 3-2: Security risk assessment for system design*. International Electrotechnical Commission.
- Shieldworkz. (2026). *Rail cyber resilience in 2026: Navigating the TS 50701 assessment frontier*. Shieldworkz.
