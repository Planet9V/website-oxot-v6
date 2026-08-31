---
tags: [iec62443, workpaper, hazard-traceability, requirements-mapping]
type: reference
status: converted
---

> [!NOTE]
> **Template Notice**: This document contains worked example data from a completed
> urban rail transit cybersecurity engagement. All client-identifying information has
> been anonymized. The technical analysis is preserved as a reference exemplar.
> Replace all `[Project Name]`-tagged values and project-specific data for your engagement.

# Hazard-TVA Traceability Register

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-TVA_BASIS_003_Hazard_Traceability]] |
| Version | 2.1 DRAFT |
| Date | 2026-03-30 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | DRAFTING |
| Dossier Section | Volume 2: The Evidence |
| **Dossier Positio ** |  |
| Standards | IEC 62443-3-2:2020; EN CLC/TS 50701:2021; EN 50126-1:2017 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

| Revision | Date | Author | Description |
| --- | --- | --- | --- |
| 2.0 | 2026-03-29 | Jim McKenney | Hazard-TVA Traceability Register — Safety-security convergence hazard mapping |
| 2.1 | 2026-03-30 | Jim McKenney | BLINDEXIT→BLINDSIDE naming correction; ELS Zone 1 reclassification consistency |

**TS 50701 §6.3.2 mandate**: "The cybersecurity risk assessment shall consider the safety consequences of cybersecurity incidents, taking into account the results of the safety analysis (e.g., FMECA, Hazard Log, RAMS)." — CENELEC (2021, Clause 6.3.2)

**Operational context**: [Project Name] entered Emergency Operations in January 2026. Practical Completion is scheduled for April 2026. This register is an operational safety document with immediate compliance significance, not a pre-approval study.

## 1. Purpose and Scope

### 1.1 Document Purpose

This register provides the bidirectional traceability required by TS 50701:2021 Clause 6.3.2 between the [Project Name] Engineering and Operations (E&O) Hazard Log and the [Project Name] Threat and Vulnerability Analysis (TVA) programme. Specifically, it documents:

- **Forward traceability**: From each cyber-relevant E&O Hazard Log entry to the TVA scenario(s) that address the associated cybersecurity risk
- **Reverse traceability**: From each of the 16 TVA scenarios (TS-01 through TS-16) to the Hazard Log hazard category(ies) and named entries that establish the safety consequence basis for the scenario

Together, these two directions constitute the auditable evidence required to demonstrate that [Project Name] TVA consequence scores are grounded in identified operational hazards — not in arbitrary assessment — and that the TVA programme accounts for all cyber-relevant hazard categories.

### 1.2 Primary Data Sources

| Source | Document Reference | Revision | Status |
| --- | --- | --- | --- |
| E&O Hazard Log | [DOC-PREFIX]-SSA-LKA-RPT-800001 | Rev 003B | For Review — 16 September 2025 |
| DOORS Export Register | [DOC-PREFIX]-SSA-LKA-REG-800017 [R5] | Rev 012 B23 | Authoritative full hazard register |
| SRAC Register | [DOC-PREFIX]-SSA-LKA-REG-800019 | Rev 009 [R7] | 774 unique SRACs |
| [Project Name] TVA Scenarios | TVA-SCN-TS01 through TS-16 | v1.0 | QA-passed ([Firm], 2026) |
| Hazard Log Extraction | S25-HazardLog-Extract.md | v1.0 | Working document — feeds this register |

The Hazard Log Rev 003B ([Stakeholders], 2025b) is the authoritative source for all hazard data in this register. The DOORS export baseline B23 (based on B21 of 06/05/2025) contains 910 hazard entries across all categories. This register extracts and maps cyber-relevant entries; the complete entry-level register is in [DOC-PREFIX]-SSA-LKA-REG-800017.

### 1.3 TS 50701 §6.3.2 Compliance Requirement

TS 50701:2021 Clause 6.3.2 requires that the cybersecurity risk assessment for railway systems consider the safety consequences of cybersecurity incidents by drawing on results of the safety analysis — explicitly including the Failure Modes, Effects, and Criticality Analysis (FMECA), Hazard Log, and Reliability, Availability, Maintainability, and Safety (RAMS) plan (CENELEC, 2021).

This requirement creates a compliance gap that existed prior to this document: the 16 [Project Name] TVA scenarios used narrative safety consequence descriptions without formal, source-document-traceable linkage to specific Hazard Log entries, hazard categories, or the Hazard Log risk matrix. This register closes that gap by providing the required traceability layer. It operates as a companion to BASIS-002 (FMECA-MITRE Mapping Register) and BASIS-004 (SIL-SL-T Calibration Record) within the Unified Safety-Security Risk Convergence Matrix programme governed by ICS-TVA-BASIS-IMPL-001.

### 1.4 Framework Bridge: Consequence-Centric Safety vs. Cause-Centric Cybersecurity

The [Project Name] E&O Hazard Log employs the 17 hazard categories published by the Rail Safety and Standards Board (RSSB) Hazard-Based Safety (HBS) methodology. This is a consequence-centric framework: categories are defined by what goes wrong (collision, fire, evacuation failure, electric shock), not by how the failure was initiated. Any single hazard entry may have multiple causal pathways, of which a cyber attack is one.

IEC 62443-3-2:2020 (IEC, 2020) and the MITRE ATT&CK for ICS framework (MITRE Corporation, 2023) are cause-centric: they organise threats by how an adversary initiates and escalates an attack — techniques, tactics, and attack paths. A single MITRE technique may produce consequences spanning multiple RSSB hazard categories.

This register bridges these frameworks using the MITRE ATT&CK cyber kill chain as the linking mechanism: the TVA scenario defines the attack technique (cause), the Hazard Log entry provides the consequence category, and the kill chain is the connecting chain of custody. The framework bridge is formally documented in Section 8 of this register.

## 2. Risk Matrix Calibration

### 2.1 Hazard Log Consequence Scale Mapped to TVA Scoring

The Hazard Log uses a five-level consequence scale based on Equivalent Fatality (EqF) weighting per EN 50126-1:2017 (CENELEC, 2017). TVA scenarios use a 1–5 integer consequence score. The following calibration is applied throughout this register.

| Hazard Log Consequence | EqF Weighting | TVA Consequence Score | Rationale |
| --- | --- | --- | --- |
| Catastrophic | 10 EqF | 5 | Multiple fatalities; mass casualty event; regional emergency services; tunnel closure >24 hours |
| Critical | 1 EqF | 4 | Single fatality or ≤10 major injuries; significant emergency response; infrastructure closure >24 hours |
| Major | 0.1 EqF | 3 | Medical treatment / hospital; ≤20 minor injuries; emergency services initiated; short-term closure |
| Minor | 0.005 EqF | 2 | Basic first aid; temporary discomfort; slight increase in staff workload |
| No Effect | 0 EqF | 1 | No physical harm; no effect on safety margins |

**TVA calibration notes (Source: S25-HazardLog-Extract.md Section B)**:

- TVS/FDAS unavailability during fire/evacuation event: Catastrophic (TVA Score 5)
- BMS manipulation causing HVAC failure and FDAS alarm suppression: Critical (TVA Score 4)
- PAVA/PA denial-of-service during evacuation: Critical (TVA Score 4)
- ACS compromise enabling access to live electrical (MAD) areas: Critical (TVA Score 4)
- ICS/SCADA denial-of-service causing loss of supervisory control: Major to Critical (TVA Score 3–4)
- Communications network denial-of-service affecting emergency alerting: Critical (TVA Score 4)
### 2.2 Hazard Log Likelihood Scale Mapped to TVA Scoring

The Hazard Log uses a six-level likelihood scale based on hourly probability rates per EN 50126-1:2017 (CENELEC, 2017). TVA likelihood scores are calibrated against cyber threat actor typology.

| Hazard Log Likelihood | Probability per Hour | TVA Likelihood Score | Cyber Threat Actor Typology |
| --- | --- | --- | --- |
| Frequent | > 1×10⁻⁴/hr | 5 | Hacktivist DDoS against public-facing systems; commodity malware campaigns |
| Probable | ≤ 1×10⁻⁴/hr | 4 | Ransomware (Rhysida, analogues) against IT/OT hybrid; known rail-sector campaigns |
| Occasional | ≤ 1×10⁻⁵/hr | 3 | Nation-state APT (Volt Typhoon, VOLTZITE) against rail OT; active campaigns since 2021 |
| Remote | ≤ 1×10⁻⁶/hr | 2 | Insider threat; supply chain compromise via vendor firmware; targeted RF attacks |
| Rare | ≤ 1×10⁻⁷/hr | 1 | Highly targeted combined cyber-physical attacks; zero-day exploitation of rail OT |
| Incredible | ≤ 1×10⁻⁹/hr | 1 | Theoretical scenarios with no established precedent; below practical concern |

**Cyber threat actor likelihood calibration (Source: S25-HazardLog-Extract.md Section C)**:

- Nation-state APT (Volt Typhoon, VOLTZITE-RAIL) against rail OT: Occasional to Probable (TVA 3–4)
- Ransomware (Rhysida-NZ, RAILSTORM precedents) against IT/OT hybrid: Probable to Frequent (TVA 4–5)
- Hacktivist DDoS against public-facing systems: Frequent (TVA 5)
- Insider threat: Remote to Occasional (TVA 2–3)
- Supply chain compromise: Remote to Occasional (TVA 2–3)
### 2.3 Risk Matrix and SL-T Band Mapping

The Hazard Log risk score is the product of consequence and likelihood positions within the risk matrix (Source: S25-HazardLog-Extract.md Section D). Risk scores map to SL-T requirements as follows.

| Risk Score | Colour Band | Classification | Required Action | SL-T Implication |
| --- | --- | --- | --- | --- |
| 9–10 | Red | Intolerable | Must be reduced; project cannot proceed with uncontrolled risk | SL-T 3 — mandatory compensating controls |
| 7–8 | Orange | ALARP upper | Significant controls mandatory; SFAIRP argument required | SL-T 2–3 — strong controls required |
| 5–6 | Amber | ALARP lower | Controls required SFAIRP; justify if not implemented | SL-T 2 — controls required |
| 1–4 | Green | Broadly acceptable | Monitor; no specific control required | SL-T 1 — baseline controls |
| 0 | White | No risk | No action required | N/A |

**SFAIRP**: All controls must be implemented So Far As Is Reasonably Practicable. Written SFAIRP justification required for any non-implemented control ([Stakeholders], 2025b, §4.3).

**Critical finding**: Multiple cyber-attack scenarios against [Project Name] Zone-1 and Zone-2 systems score 7–9 (Orange/Red) on this risk matrix (see Section D of S25-HazardLog-Extract.md). This independently validates the SL-T 3 assignment for Zone-1 safety systems and confirms that all 16 TVA scenarios require compensating controls per the IEC 62443-3-3 countermeasure tables embedded in each scenario.

## 3. Hazard Category x TVA Scenario Matrix

This section provides the top-level mapping from all 17 RSSB hazard categories to TVA scenarios. Data sourced from S25-HazardLog-Extract.md Section A and the Hazard Log ([Stakeholders], 2025b, Table 4).

| Hazard Category | Code | Open Hazards | Cyber Relevance | TVA Scenarios | Primary Cyber Vector | Max Consequence |
| --- | --- | --- | --- | --- | --- | --- |
| Collision | A | 58 | Low — physical train events; cyber vector via signalling interference only | TS-14 (IRONBOLT) | Signalling system interference via T0836 (Modify Parameter) or T0855 (Unauthorised Command Message) | Catastrophic |
| Derailment | B | 30 | Low — physical; cyber vector via signalling or traction power interface only | TS-14 (IRONBOLT) | Signalling parameter manipulation; traction power control compromise | Catastrophic |
| Fire | C | 18 | HIGH — FDAS and TVS control fire suppression and smoke extraction; BMS monitors fire zone status | TS-07 (FDAS/TVS), TS-08 (Tunnel), TS-13 (BLINDSIDE), TS-02 (FrostyGoop) | FDAS alarm suppression via T0804 (Block Reporting Message); TVS manipulation via T0831 (Manipulation of Control) | Catastrophic |
| Explosion | D | 19 | Medium — infrastructure damage; ICS monitoring of plant conditions; indirect cyber relevance | TS-08 (Tunnel), TS-12 (DARKOPERATOR) | ICS sensor suppression masking environmental hazard build-up | Critical |
| Electric shock | E | 27 | HIGH — ACS compromise enables unauthorised access to MAD (Major Authorised Distribution) zones with live electrical equipment | TS-04 (KEYHOLDER), TS-06 (Volt Typhoon) | ACS gate manipulation via T0858 (Change Credential); denial of control via T0813 | Critical |
| Evacuation | F | 84 | CRITICAL — largest open category; PAVA, FDAS, TVS, ICS all involved in evacuation execution; cyber attack on any of these is safety-critical | TS-07, TS-08, TS-09, TS-10, TS-13, TS-01, TS-16 | PAVA/PA denial-of-service T0814; alarm suppression T0804; false state display T0832; communications disruption T0814 | Catastrophic |
| Platform Train Interface | G | 8 | Low — physical interface; limited cyber dependency; PIS display manipulation creates secondary risk | TS-09 (Passenger) | PIS display manipulation causing passenger confusion at platform edge | Major |
| Assault | H | 7 | HIGH — includes terrorism and intentional malicious acts; cyber-physical attack integration | TS-06 (Volt Typhoon), TS-16 (VOLTZITE-RAIL), TS-05 (RAILSTORM) | Cyber as enabler and multiplier of physical assault; ACS disablement enabling physical access | Critical–Catastrophic |
| Suicide | I | 12 | Low — primarily physical event; limited cyber dependency; CCTV monitoring of risk areas has cyber component | None directly | CCTV feed manipulation removing safety monitoring layer | Major (indirect) |
| Fall | J | 70 | HIGH — ACS compromise enables unauthorised access to safety-critical areas (platform edges, stairwells, rooftops); second-largest open category | TS-04 (KEYHOLDER), TS-06 (Volt Typhoon) | ACS credential manipulation T0858; denial of control of access gates T0813 | Critical |
| Hazardous substance | K | 12 | Low–Medium — tunnel environment has chemical/biological risk from HVAC failure; indirect cyber vector via BMS/TVS | TS-08 (Tunnel), TS-02 (FrostyGoop) | BMS environmental setpoint manipulation T0836; TVS control interference T0831 | Critical |
| Object | L | 17 | Low — physical projectile/falling object events; no direct cyber dependency | None | N/A | Major |
| Occupational Health | M | 54 | HIGH — maintenance staff safety depends on correct system state data from BMS, ICS, and FDAS; compromised state data creates unsafe maintenance conditions | TS-02 (FrostyGoop), TS-04 (KEYHOLDER), TS-12 (DARKOPERATOR) | BMS system state manipulation T0831; false SCADA display T0832; BACnet protocol manipulation | Major |
| Natural Hazards | N | 20 | Low — weather, seismic, flooding; ICS monitoring systems have cyber dependency for detection | TS-12 (DARKOPERATOR) | ICS environmental monitoring suppression; delayed detection of natural hazard conditions | Major (indirect) |
| Train Failure | O | — | Medium — signalling and ICS interaction; train control systems | TS-14 (IRONBOLT), TS-10 (GHOST-RAIL) | CBTC interface attacks; communications disruption affecting train management | Critical |
| Infrastructure Failure | P | 12 | CRITICAL — ICS, BMS, TVS, FDAS failure modes; includes all systems where cyber attack can replicate or cause infrastructure failure | TS-01, TS-02, TS-05, TS-07, TS-08, TS-12, TS-16 | System denial-of-service T0814; control manipulation T0831; DoS protection bypass; SCADA manipulation | Critical–Catastrophic |
| Other (incl. terrorism) | Q | 27 | HIGH — terrorism and intentional malicious acts; includes politically-motivated cyber attacks | TS-05 (RAILSTORM), TS-06 (Volt Typhoon), TS-15 (SHADOWVAULT), TS-16 (VOLTZITE-RAIL), TS-03 (CHAINLINK) | All attack vectors; intentional acts including coordinated cyber-physical operations | Critical–Catastrophic |

**Primary cyber-relevant categories by volume and consequence**:

- F (Evacuation, 84 open): CRITICAL — direct life-safety cyber-safety bridge
- J (Fall/access, 70 open): HIGH — ACS compromise enables physical harm
- M (Occupational Health, 54 open): HIGH — maintenance safety depends on system state integrity
- A (Collision, 58 open): HIGH consequence (Catastrophic) though cyber vector is specific to signalling

## 4. Named Hazard Entry Traceability

This section provides entry-level traceability for named hazard entries from S25-HazardLog-Extract.md Section E.1. Each entry records how a cyber attack could initiate or exacerbate the identified hazard, the TVA scenario addressing the vector, and the associated IEC 62443-3-3 security requirement.

Risk scores are calculated per the Hazard Log risk matrix (S25-HazardLog-Extract.md Section D): each score represents the Consequence × Likelihood matrix cell value, not a simple product. Likelihood values reflect the cyber threat actor typology from Section 2.2 of this register.

### 4.1 Category F — Evacuation (PAVA/PA System Hazards)

| Hazard ID | Category | Description | Affected Systems | Cyber Attack Vector | TVA Scenario(s) | Consequence Level | Likelihood (Cyber) | Risk Score | Risk Band | SRACs | IEC 62443-3-3 SR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hz-F01-01-008 | F — Evacuation | PAVA failure causing reduced intelligibility — passengers cannot understand evacuation instructions | PAVA, ICS, COMS | Denial-of-service against PAVA controller or audio stream injection causing noise/unintelligible output; MITRE T0814 (Denial of Service), T0803 (Block Command Message) | TS-09 (Passenger System Manipulation), TS-13 (BLINDSIDE) | Critical (TVA 4) | Probable — ransomware/hacktivist precedent (TVA 4) | 8 | Orange — ALARP upper | CM491719 (evacuation route posters — compensating for PIS/PA failure) | SR 7.1 — Denial of Service Protection (SL 2); SR 3.1 — Communication Integrity (SL 2) |
| Hz-F01-02-002 | F — Evacuation | PAVA failure causing delayed evacuation — passengers not alerted promptly to emergency | PAVA, ICS | Availability attack suppressing evacuation trigger signal; MITRE T0814 (DoS), T0804 (Block Reporting Message) | TS-09 (Passenger System Manipulation), TS-13 (BLINDSIDE), TS-07 (FDAS/TVS) | Critical (TVA 4) | Probable (TVA 4) | 8 | Orange — ALARP upper | CM491719, CM480161 (independent flashing beacon — ICS-independent alerting) | SR 7.1 — DoS Protection (SL 2); SR 3.1 — Communication Integrity (SL 2) |
| Hz-F01-03-006 | F — Evacuation | PAVA/PA failure causing evacuation signal not issued or incorrectly issued — wrong zones alerted or no alert | ICS, COMS | Command injection causing false or suppressed evacuation zone signalling; MITRE T0855 (Unauthorised Command Message), T0804 (Block Reporting Message) | TS-09, TS-13 (BLINDSIDE), TS-10 (GHOST-RAIL) | Critical (TVA 4) | Probable (TVA 4) | 8 | Orange — ALARP upper | CM480156 (alarm priority sequential naming — anomaly detection layer), CM480158 (floor plan in SCR/FCR — compensating for ICS display failure) | SR 3.1 — Communication Integrity (SL 2–3); SR 2.1 — Authorization Enforcement (SL 2) |
| Hz-F01-03-007 | F — Evacuation | PAVA/PA failure variant — evacuation signal issued in incorrect sequence or wrong order of priority zones | ICS, COMS | Command integrity attack manipulating zone priority sequencing; MITRE T0831 (Manipulation of Control), T0855 (Unauthorised Command Message) | TS-09, TS-13 (BLINDSIDE) | Critical (TVA 4) | Probable (TVA 4) | 8 | Orange — ALARP upper | CM480156 (alarm sequential naming), CM480157 (BOH sequential room numbering — physical wayfinding compensating control) | SR 3.1 — Communication Integrity (SL 2–3); SR 3.3 — Security Functionality Verification (SL 2) |
| Hz-F01-04-001 | F — Evacuation | Automated PA announcement failure on train — passengers not informed of emergency during on-vehicle phase of evacuation | ICS, COMS | Command injection or DoS against train PA system interface; MITRE T0814, T0803 (Block Command Message) | TS-09 (Passenger System Manipulation), TS-10 (GHOST-RAIL) | Major–Critical (TVA 3–4) | Probable (TVA 4) | 7–8 | Orange | CM491719 (evacuation route posters) | SR 7.1 — DoS Protection (SL 2); SR 3.1 — Communication Integrity (SL 2) |
| Hz-F01-02-006 | F — Evacuation | Delayed evacuation due to controller error caused by false system state display — operator acts on incorrect information | ICS, BMS, FDAS | False state injection via HMI manipulation causing operator to misread fire/emergency zone status; MITRE T0832 (Manipulation of View), T0831 (Manipulation of Control) | TS-07 (FDAS/TVS Safety System), TS-12 (DARKOPERATOR), TS-13 (BLINDSIDE) | Critical (TVA 4) | Occasional — nation-state sophistication required (TVA 3) | 7 | Orange — ALARP upper | CM480156 (alarm sequential naming — anomaly detection), CM480158 (floor plans at SCR/FCR), CM480159 (operational induction and training — human detection layer), CM480160 (PPE signage — physical safety in compromised areas) | SR 2.1 — Authorization Enforcement (SL 2); SR 3.3 — Security Functionality Verification (SL 2); SR 6.1 — Audit Log Accessibility (SL 2) |
| Hz-F01-02-008 | F — Evacuation | Evacuation failure (DOORS Baseline B22 new entry) — system unavailability prevents effective evacuation (TVS/FDAS inferred) | TVS, FDAS | System unavailability attack on Zone-1 safety systems; MITRE T0814 (DoS), T0816 (Device Restart/Shutdown), T0828 (Loss of Safety) | TS-07 (FDAS/TVS), TS-08 (Tunnel Ventilation), TS-13 (BLINDSIDE) | Catastrophic (TVA 5) | Occasional (TVA 3) | 8 | Orange — ALARP upper | CM480161 (independent flashing beacon — no ICS dependency) | SR 7.1 — DoS Protection (SL 3); SR 3.3 — Security Functionality Verification (SL 3) |
| Hz-F01-04-002 | F — Evacuation | Evacuation failure variant (DOORS Baseline B22 new entry) — additional failure mode identified post SSG 4A2 review | TVS, FDAS | System unavailability via persistent compromise; MITRE T0837 (Module Firmware), T0828 (Loss of Safety) | TS-07 (FDAS/TVS), TS-13 (BLINDSIDE), TS-16 (VOLTZITE-RAIL) | Catastrophic (TVA 5) | Occasional (TVA 3) | 8 | Orange — ALARP upper | CM480161 | SR 7.1 — DoS Protection (SL 3); SR 5.1 — Network Segmentation (SL 3) |

### 4.2 Category J — Fall (Access Control Hazards)

| Hazard ID | Category | Description | Affected Systems | Cyber Attack Vector | TVA Scenario(s) | Consequence Level | Likelihood (Cyber) | Risk Score | Risk Band | SRACs | IEC 62443-3-3 SR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hz-J03-04-006 | J — Fall | Unauthorised access to safety-critical or restricted areas enabling vandalism, protest, or accident — person falls from height or onto track | ACS, ICS, CCTV | ACS credential manipulation enabling gate bypass; CCTV feed suppression removing detection layer; MITRE T0858 (Change Credential), T0813 (Denial of Control) | TS-04 (KEYHOLDER — insider BACnet lockout), TS-06 (Volt Typhoon pre-positioning) | Critical (TVA 4) | Remote to Occasional (TVA 2–3) | 6–7 | Amber–Orange | CM476059 (monitoring of unauthorised access to X-beams — CCTV/ICS dependent; feed manipulation risk) | SR 1.1 — Human User Authentication (SL 2); SR 1.3 — Account Management (SL 2); SR 2.1 — Authorization Enforcement (SL 2) |

### 4.3 Category E — Electric Shock (MAD Zone Access Hazards)

| Hazard ID | Category | Description | Affected Systems | Cyber Attack Vector | TVA Scenario(s) | Consequence Level | Likelihood (Cyber) | Risk Score | Risk Band | SRACs | IEC 62443-3-3 SR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hz-E03-04-001 | E — Electric shock | Unauthorised access to MAD (Major Authorised Distribution) zone — person contacts live electrical equipment | ACS, ICS | ACS gate manipulation via credential theft or BACnet lockout; insider threat disabling access logging; MITRE T0858 (Change Credential), T0813 (Denial of Control) | TS-04 (KEYHOLDER), TS-06 (Volt Typhoon) | Critical (TVA 4) | Remote (TVA 2) | 6 | Amber | None named (ACS procedural controls) | SR 1.1 — Human User Authentication (SL 2–3); SR 1.3 — Account Management (SL 2); SR 2.1 — Authorization Enforcement (SL 2) |
| Hz-E07-01-001 | E — Electric shock | Touch voltage hazard at station structure — earth and bonding fault causes electrification of surface | BMS | BMS alert suppression preventing operator notification of E&B fault condition; MITRE T0804 (Block Reporting Message), T0832 (Manipulation of View) | TS-02 (FrostyGoop — BMS protocol manipulation), TS-12 (DARKOPERATOR) | Critical (TVA 4) | Occasional (TVA 3) | 7 | Orange — ALARP upper | None named specifically | SR 3.1 — Communication Integrity (SL 2); SR 3.3 — Security Functionality Verification (SL 2) |
| Hz-E08-01-001 | E — Electric shock | Touch voltage at rail bridge structure — earth and bonding fault causes electrification of external surface | BMS | BMS alarm suppression identical to Hz-E07-01-001; MITRE T0804, T0832 | TS-02 (FrostyGoop), TS-12 (DARKOPERATOR) | Critical (TVA 4) | Occasional (TVA 3) | 7 | Orange — ALARP upper | None named specifically | SR 3.1 — Communication Integrity (SL 2); SR 3.3 — Security Functionality Verification (SL 2) |

### 4.4 Category M — Occupational Health (Maintenance Safety Hazards)

| Hazard ID | Category | Description | Affected Systems | Cyber Attack Vector | TVA Scenario(s) | Consequence Level | Likelihood (Cyber) | Risk Score | Risk Band | SRACs | IEC 62443-3-3 SR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hz-M01-01-001 | M — Occupational Health | Maintenance staff exposure to hazard due to incorrect system state information — staff enter area believed to be safe but is not (DOORS B23 new SRAC) | BMS, ICS | Compromised BMS/ICS system state data presenting false safe-state indicators to maintenance coordination; MITRE T0832 (Manipulation of View), T0836 (Modify Parameter) | TS-02 (FrostyGoop), TS-04 (KEYHOLDER), TS-12 (DARKOPERATOR) | Major (TVA 3) | Occasional (TVA 3) | 6 | Amber | CM498737 (Maintenance safety SRAC — B23 new; maintenance safety dependent on correct BMS/ICS system state) | SR 3.1 — Communication Integrity (SL 2); SR 3.3 — Security Functionality Verification (SL 2); SR 6.1 — Audit Log Accessibility (SL 2) |
| Hz-M02-01-001 | M — Occupational Health | Maintenance staff exposure to second hazard variant — incorrect system state for different plant type (DOORS B23 new SRAC) | BMS, ICS | Same cyber vector as Hz-M01-01-001; MITRE T0832, T0836 | TS-02 (FrostyGoop), TS-12 (DARKOPERATOR) | Major (TVA 3) | Occasional (TVA 3) | 6 | Amber | CM498737 (Maintenance safety SRAC — B23 new) | SR 3.1 — Communication Integrity (SL 2); SR 3.3 — Security Functionality Verification (SL 2) |

### 4.5 Category H — Assault (Terrorism and Intentional Acts)

| Hazard ID | Category | Description | Affected Systems | Cyber Attack Vector | TVA Scenario(s) | Consequence Level | Likelihood (Cyber) | Risk Score | Risk Band | SRACs | IEC 62443-3-3 SR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hz-H01 series | H — Assault | Anti-social behaviour and terrorism at [Project Name] stations — including intentional acts with potential for mass casualty outcome | All station systems | Cyber as enabler of physical assault: ACS disablement enabling attacker access; CCTV suppression removing detection; PAVA compromise preventing evacuation; MITRE T0858, T0813, T0814, T0804 | TS-06 (Volt Typhoon — pre-positioning enabling physical ops), TS-16 (VOLTZITE-RAIL — nation-state critical infrastructure), TS-05 (RAILSTORM — hacktivist combined ops) | Critical–Catastrophic (TVA 4–5) | Occasional (TVA 3) — nation-state calibration | 8 | Orange — ALARP upper | None specifically named (operational procedures primary) | SR 1.1 — Authentication (SL 2–3); SR 2.1 — Authorization (SL 2–3); SR 5.1 — Network Segmentation (SL 3); SR 5.2 — Zone Boundary Protection (SL 3) |

### 4.6 Category P — Infrastructure Failure

| Hazard ID | Category | Description | Affected Systems | Cyber Attack Vector | TVA Scenario(s) | Consequence Level | Likelihood (Cyber) | Risk Score | Risk Band | SRACs | IEC 62443-3-3 SR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hz-P series (12 open) | P — Infrastructure Failure | Infrastructure system failures — covers ICS, BMS, TVS, FDAS failure modes with consequence on service continuity and safety | TVS, FDAS, BMS, ICS | System unavailability via DoS or control manipulation; ransomware preventing system restart; MITRE T0814 (DoS), T0809 (Data Destruction), T0816 (Device Restart/Shutdown), T0831 (Manipulation of Control) | TS-01 (Rhysida-NZ ransomware), TS-02 (FrostyGoop BMS/ICS), TS-07 (FDAS/TVS), TS-08 (Tunnel), TS-12 (DARKOPERATOR), TS-16 (VOLTZITE-RAIL) | Critical–Catastrophic (TVA 4–5) | Probable — ransomware is Probable; APT is Occasional (TVA 3–4) | 8–9 | Orange–Red | None named specifically (operational procedure and MOS thresholds govern) | SR 7.1 — DoS Protection (SL 2–3); SR 3.3 — Security Functionality Verification (SL 2–3); SR 5.1 — Network Segmentation (SL 2–3) |

## 5. TVA Scenario to Hazard Log Reverse Lookup

This section provides the reverse traceability direction: from each TVA scenario to the Hazard Log categories and named entries that establish its safety consequence basis. This is the direct TS 50701 §6.3.2 compliance evidence for consequence scoring in each scenario.

The 16 TVA scenarios are presented in scenario number order. Zone and SL-T values from [Project Name] zone register (sl_target). Consequence and likelihood values use the TVA 1–5 integer scale calibrated in Section 2.

| TVA Scenario | Codename | Zone | SL-T | Hazard Category(ies) | Hazard Entry(ies) | Consequence Level | Likelihood Level | Risk Score | Risk Band | TS 50701 §6.3 Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TS-01 | Rhysida-NZ (ransomware OT/IT) | Zone-2/4 | 3 | P (Infrastructure Failure), M (Occupational Health), F (Evacuation — if ransomware reaches PAVA/FDAS) | Hz-P series (12 open infrastructure hazards) | Consequence 4 (Critical) — ransomware disabling FDAS/TVS → Catastrophic (5) if safety system reach confirmed | Probable (4) — rail-sector ransomware established precedent (Rhysida-NZ 2023, RAILSTORM analogues) | 8–9 | Orange–Red | COMPLIANT — Hazard Log categories P, M, F linked; consequence grounded in infrastructure failure modes |
| TS-02 | FrostyGoop (BMS/ICS protocol manipulation) | Zone-2 | 3 | C (Fire), P (Infrastructure Failure), M (Occupational Health), E (Electric shock) | Hz-E07-01-001 (BMS alert suppression, touch voltage), Hz-E08-01-001 (BMS alert suppression, bridge), Hz-M01-01-001 (maintenance state data), Hz-M02-01-001 | Consequence 4 (Critical) — BMS manipulation causing HVAC failure + FDAS suppression | Occasional (3) — Modbus-capable malware (FrostyGoop, Industroyer2) is established; rail BMS attack requires specific targeting | 7 | Orange — ALARP upper | COMPLIANT — Named hazard entries E07, E08, M01, M02 linked; consequence grounded in BMS state manipulation hazards |
| TS-03 | CHAINLINK (supply chain firmware) | Zone-2/5 | 3 | P (Infrastructure Failure), Q (Other — intentional/terrorism) | Hz-P series (12 open) | Consequence 4 (Critical) — compromised firmware across multiple OT systems enabling persistent access and latent capability | Remote (2) — supply chain compromise requires sustained access and vendor infiltration | 6 | Amber | COMPLIANT — Category P and Q linked; consequence grounded in infrastructure failure modes from corrupted firmware |
| TS-04 | KEYHOLDER (insider BACnet lockout) | Zone-2/3 | 2 | J (Fall), E (Electric shock), M (Occupational Health) | Hz-J03-04-006 (unauthorised access), Hz-E03-04-001 (MAD zone access), Hz-M01-01-001 (maintenance safety) | Consequence 4 (Critical) — insider lockout of ACS enabling physical access to restricted areas | Remote (2) — insider threat with specific BACnet knowledge; constrained by access controls | 6 | Amber | COMPLIANT — Named entries J03, E03, M01 linked; consequence grounded in ACS failure hazards |
| TS-05 | RAILSTORM (hacktivist DDoS + OT) | Zone-2/6 | 2 | Q (Other — terrorism/intentional), F (Evacuation), P (Infrastructure Failure) | Hz-F01-02-002 (delayed evacuation), Hz-F01-03-006 (evacuation signal failure), Hz-P series | Consequence 4 (Critical) — DDoS disabling PAVA during real emergency; OT disruption causing infrastructure failure | Frequent (5) — hacktivist DDoS is Frequent globally; coordinated OT component is Probable (4) | 8–9 | Orange–Red | COMPLIANT — Categories Q, F, P linked; named entries F01-02-002 and F01-03-006 provide evacuation consequence basis |
| TS-06 | Volt Typhoon (APT pre-positioning LotL) | Zone-1/2/3 | 3 | H (Assault — terrorism enabling), Q (Other — intentional), J (Fall), E (Electric shock) | Hz-H01 series (terrorism/assault), Hz-J03-04-006 (access control failure), Hz-E03-04-001 (MAD zone access) | Consequence 5 (Catastrophic) — pre-positioned APT enabling coordinated physical-cyber attack during high-consequence event | Occasional (3) — Volt Typhoon active rail infrastructure campaigns confirmed by CISA/NCSC advisories | 8 | Orange — ALARP upper | COMPLIANT — Categories H, Q, J, E linked; named entries H01 series, J03-04-006, E03-04-001 provide consequence basis across zone traversal |
| TS-07 | FDAS/TVS Safety System Manipulation | Zone-1 | 3 | C (Fire), F (Evacuation), P (Infrastructure Failure) | Hz-F01-02-006 (false state display), Hz-F01-02-008 (evacuation failure — B22 new), Hz-F01-04-002 (evacuation failure variant — B22 new), Hz-P series | Consequence 5 (Catastrophic) — FDAS alarm suppression during active fire event; TVS manipulation preventing smoke extraction | Occasional (3) — direct Zone-1 safety system attack requires advanced capability and OT-specific knowledge | 8 | Orange — ALARP upper | COMPLIANT — Named entries F01-02-006, F01-02-008, F01-04-002 provide direct evacuation failure basis; Category C provides fire consequence basis |
| TS-08 | Tunnel Ventilation Compromise | Zone-1 | 3 | C (Fire), F (Evacuation), K (Hazardous substance) | Hz-F01-02-008 (evacuation failure — B22), Hz-F01-04-002 (evacuation failure variant — B22), Hz-P series (TVS in infrastructure) | Consequence 5 (Catastrophic) — TVS manipulation during tunnel fire preventing smoke extraction; hazardous atmosphere in enclosed environment | Occasional (3) — OT-level TVS control requires specific Modbus/industrial protocol capability | 8 | Orange — ALARP upper | COMPLIANT — Named entries F01-02-008 and F01-04-002 link evacuation failure consequence; Category K grounds hazardous substance risk; Category C grounds fire consequence |
| TS-09 | Passenger System Manipulation | Zone-2/4 | 2 | F (Evacuation), G (Platform Train Interface) | Hz-F01-01-008 (PAVA intelligibility failure), Hz-F01-02-002 (delayed evacuation), Hz-F01-03-006 (evacuation signal failure), Hz-F01-03-007 (evacuation signal sequence) | Consequence 4 (Critical) — PAVA denial-of-service during emergency; PIS manipulation causing platform confusion | Probable (4) — opportunistic ransomware or hacktivist attack on internet-facing passenger systems | 8 | Orange — ALARP upper | COMPLIANT — Named entries F01-01-008, F01-02-002, F01-03-006, F01-03-007 provide direct PAVA/PA evacuation consequence basis |
| TS-10 | GHOST-RAIL (comms disruption) | Zone-2/3 | 2 | F (Evacuation), P (Infrastructure Failure), A (Collision — communications to signalling) | Hz-F01-03-006 (evacuation signal failure), Hz-F01-04-001 (automated PA on train), Hz-P series | Consequence 4 (Critical) — communications disruption preventing evacuation alerting and emergency coordination | Probable (4) — comms denial-of-service is a known hacktivist tactic; sustained disruption requires more capability | 8 | Orange — ALARP upper | COMPLIANT — Named entries F01-03-006 and F01-04-001 provide evacuation signalling consequence basis; Category A grounds collision risk via signalling dependency |
| TS-11 | DEADZONE (wireless/WLAN infrastructure) | Zone-2 | 2 | P (Infrastructure Failure), F (Evacuation) | Hz-F01-02-002 (delayed evacuation from PAVA failure), Hz-P series | Consequence 4 (Critical) — wireless disruption affecting emergency communications in tunnel environment | Probable (4) — RF jamming and wireless denial-of-service are established attack techniques | 7 | Orange — ALARP upper | COMPLIANT — Category P grounds infrastructure failure; named entry F01-02-002 grounds evacuation delay consequence via wireless-dependent PAVA |
| TS-12 | DARKOPERATOR (SCADA HMI manipulation) | Zone-2 | 3 | M (Occupational Health), P (Infrastructure Failure), F (Evacuation) | Hz-M01-01-001 (maintenance safety — false state), Hz-M02-01-001 (maintenance safety variant), Hz-E07-01-001 (BMS alert suppression), Hz-E08-01-001 (BMS alert suppression, bridge) | Consequence 4 (Critical) — SCADA HMI displaying false plant state causing operator error in emergency response or maintenance | Occasional (3) — SCADA HMI manipulation requires OT access and knowledge of [Project Name] system architecture | 7 | Orange — ALARP upper | COMPLIANT — Named entries M01-01-001, M02-01-001, E07-01-001, E08-01-001 provide direct consequence basis for false state display attacks |
| TS-13 | BLINDSIDE (emergency egress disruption) | Zone-1/2 | 3 | F (Evacuation), J (Fall), C (Fire) | Hz-F01-01-008 (PAVA intelligibility), Hz-F01-02-002 (delayed evacuation), Hz-F01-02-006 (controller error from false state), Hz-F01-02-008 (evacuation failure — B22), Hz-F01-04-002 (evacuation failure variant — B22), Hz-F01-03-006 (evacuation signal failure) | Consequence 5 (Catastrophic) — coordinated attack on emergency egress: PAVA silenced, FDAS suppressed, ACS gates locked, ELS disabled | Occasional (3) — coordinated multi-system attack requires advanced planning and pre-positioned access | 8 | Orange — ALARP upper | COMPLIANT — Six named hazard entries directly ground the evacuation failure consequence; Category C grounds fire risk; Category J grounds physical access/fall consequence |
| TS-14 | IRONBOLT (rail signalling interference) | Cross-zone | 3 | A (Collision), B (Derailment) | Category A (58 open collision hazards), Category B (30 open derailment hazards) — specific entry IDs require DOORS full register ([DOC-PREFIX]-SSA-LKA-REG-800017) | Consequence 5 (Catastrophic) — collision or derailment resulting from signalling manipulation | Remote (2) — signalling system attack requires deep technical knowledge of CBTC protocols; [Project Name] SIL 2 signalling system presents high barrier | 7 | Orange — ALARP upper | PARTIAL — Categories A and B linked with correct consequence; specific Hazard Log entry IDs pending DOORS full register access for complete compliance |
| TS-15 | SHADOWVAULT (data exfiltration from OT) | Zone-2/3 | 2 | Q (Other — intentional/terrorism), M (Occupational Health) | Hz-P series (operational data used for system state — integrity concern), Hz-M01-01-001 (maintenance state data — integrity concern if exfiltrated and used for social engineering) | Consequence 3 (Major) — exfiltration of OT configuration data enabling future precision attacks; maintenance safety risk from compromised state data | Occasional (3) — APT exfiltration is Occasional; requires sustained OT network access | 6 | Amber | COMPLIANT — Category Q grounds intentional data theft; Category M grounds maintenance safety impact from compromised system state knowledge |
| TS-16 | VOLTZITE-RAIL (nation-state APT) | Zone-1/2 | 3 | H (Assault — terrorism), Q (Other — intentional), C (Fire), F (Evacuation), P (Infrastructure Failure) | Hz-H01 series (terrorism/assault), Hz-F01-02-008 (evacuation failure — B22), Hz-F01-04-002 (evacuation failure variant — B22), Hz-P series | Consequence 5 (Catastrophic) — nation-state pre-positioned attack during high-consequence event (national emergency, major public event) enabling mass-casualty outcome | Occasional (3) — VOLTZITE active rail infrastructure campaigns per CISA advisories; consistent with Volt Typhoon TTP evolution | 8 | Orange — ALARP upper | COMPLIANT — Categories H, Q, C, F, P all linked; named entries H01 series, F01-02-008, F01-04-002 ground the multi-domain safety consequence basis |

## 6. SRAC to IEC 62443-3-3 SR Mapping

This section maps the cyber-relevant Safety Related Application Conditions (SRACs) from S25-HazardLog-Extract.md Section F to IEC 62443-3-3:2013 Security Requirements (IEC, 2013). SRACs represent the existing safety control layer; IEC 62443-3-3 SRs represent the cybersecurity controls that protect the integrity of those SRACs. Where a cyber attack undermines a SRAC, the associated SR addresses the cyber pathway.

The complete SRAC register (774 unique SRACs, of which 577 [TA] and 335 [RNO]) is in [DOC-PREFIX]-SSA-LKA-REG-800019 Rev 009 [R7]. The entries below are those explicitly named in the Hazard Log report ([Stakeholders], 2025b) as cyber-dependency-bearing controls.

| CM ID | SRAC Description | Hazard Ref | Cyber Dependency | IEC 62443-3-3 SR | SR Description | SL Requirement | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CM480156 | Alarm priority sequential naming convention to reduce human error in emergency response — alarms named in logical sequence enabling rapid controller orientation | Hz-F01-02-006 | ICS alarm management system must present correct priority sequence; alarm flooding attack or sequence manipulation undermines this SRAC; also functions as anomalous alarm detection layer | SR 3.1 — Communication Integrity | Verify integrity of all communications; prevent unauthorised modification of alarm data in transit or at host | SL 2–3 | Alarm sequence manipulation (T0804 Block Reporting Message, T0832 Manipulation of View) directly undermines this SRAC; SR 3.1 is the primary cyber countermeasure |
| CM480157 | Back of House (BOH) sequential room numbering with floor plans at all zone entrances — physical wayfinding compensating for ICS/PA display failure | Hz-F01-02-006 | Physical compensating control with no direct ICS dependency; however, digital floor plan displays (if deployed) have BMS/ICS dependency | SR 7.6 — Network and Security Configuration Settings | Maintain security configuration of any digital display systems in BOH areas | SL 1 | Primarily physical control; cyber relevance is secondary but present if digital displays used |
| CM480158 | Full floor plan posted in Station Control Room (SCR) and Field Control Room (FCR) — compensating control for ICS or SCADA display failure in emergency response | Hz-F01-02-006 | Physical compensating control providing human-readable fallback when ICS/SCADA displays are compromised or unavailable; key defence-in-depth layer against HMI manipulation attacks | SR 3.3 — Security Functionality Verification | Verify security functionality of SCADA/HMI systems on a periodic basis to ensure display integrity | SL 2 | This SRAC mitigates the consequence of T0832 (Manipulation of View) attacks; validates that HMI integrity checking is required (SR 3.3) |
| CM480159 | Operational induction and training for all station staff covering emergency procedures and system operation — human detection layer for system abnormalities | Hz-F01-02-006 | Staff trained to recognise abnormal system behaviour constitute a human intrusion detection layer (IEC 62443 FR 2 — Use Control); training covers cyber incident awareness per IEC 62443 principles | SR 2.1 — Authorization Enforcement | Enforce authorisation for all functions; trained staff recognise unauthorised actions | SL 2 | Training is a key compensating control for cyber attacks that produce visible anomalies; aligns with IEC 62443-3-3 FR 2 (Use Control) via human oversight |
| CM480160 | PPE signage on plantroom doors — physical safety for personnel in plant areas during emergency or system failure | Hz-F01-02-006 | Physical safety control; cyber relevance through ACS: if plantroom door ACS is compromised, correct PPE use by authorised personnel remains critical regardless of access control state | SR 1.1 — Human User Authentication | Authenticate all human users; verify identity before granting access to restricted areas including plantrooms | SL 2 | ACS compromise (T0858 Change Credential, T0813 Denial of Control) undermines the access control layer that governs plantroom entry; SR 1.1 is the primary cyber countermeasure |
| CM480161 | Flashing beacon installed in rooms for emergency response — alerting mechanism with no ICS dependency (independent alerting layer) | Hz-F01-02-006 | Explicit ICS-independence design; provides resilience against PAVA/ICS denial-of-service attacks; critical compensating control for MITRE T0814 (DoS) attacks against PAVA | SR 7.1 — Denial of Service Protection | Protect against DoS attacks on control systems including PAVA and ICS emergency alerting | SL 2 | This SRAC is specifically designed to compensate for DoS attacks against ICS/PAVA; its existence validates the need for SR 7.1 and confirms DoS against PAVA is a design-basis threat |
| CM476059 | Monitoring of unauthorised access to structural X-beams — CCTV and ICS monitoring of access routes to safety-critical structural elements | Hz-J03-04-006 | CCTV monitoring is cyber-dependent; video feed manipulation attack (T0832 Manipulation of View) could allow unauthorised access to go undetected; ICS access monitoring logs are cyber-dependent | SR 6.1 — Audit Log Accessibility | Ensure audit logs are accessible and tamper-evident; CCTV and access logs must be protected against manipulation | SL 2 | CCTV feed manipulation (T0832) and log tampering (T0809 Data Destruction) directly undermine this SRAC; SR 6.1 (audit logs) and SR 2.1 (authorisation) are primary cyber countermeasures |
| CM491719 | Evacuation route posters installed on trains — paper-based compensating control for Passenger Information System (PIS) failure | F series (general) | Explicit PIS-independence design; compensates for cyberattack-induced PIS failure or PAVA denial-of-service; non-cyber-dependent physical control | SR 7.1 — Denial of Service Protection | Protect PIS and PAVA from DoS attacks; paper backup compensates for system unavailability | SL 2 | ICS-independence is the key cyber-resilience feature of this SRAC; validates the need to protect PIS/PAVA from DoS (SR 7.1) since cyber failure of these systems is a design-basis scenario |
| CM498737 | Maintenance safety SRAC (DOORS Baseline B23 new) — maintenance activities depend on correct BMS/ICS system state being presented to maintenance coordinators and field staff | Hz-M01-01-001, Hz-M02-01-001 | Entire SRAC depends on BMS/ICS system state integrity; SCADA HMI manipulation (T0832), BMS protocol injection (T0831, T0836), or false sensor data (T0806 (Brute Force)) directly undermines maintenance safety | SR 3.1 — Communication Integrity; SR 3.3 — Security Functionality Verification | SR 3.1: Protect integrity of BMS/ICS communications used for system state reporting; SR 3.3: Verify security functionality of BMS/SCADA systems including state display integrity | SL 2 | This is the most direct SRAC-cybersecurity dependency in the Hazard Log; maintenance safety is explicitly conditional on correct BMS/ICS state. T0832, T0831, and T0836 are the primary attack techniques that undermine it. |

## 7. TS 50701 Section 6.3 Compliance Status

This section provides the compliance status summary for all 16 TVA scenarios against the TS 50701 §6.3.2 requirement for safety-consequence-grounded cybersecurity risk assessment. Status definitions:

- **COMPLIANT**: Hazard Log category(ies) and/or named entry(ies) linked; SRAC cited where applicable; IEC 62443-3-3 SR assigned; consequence score grounded in safety source document
- **PARTIAL**: Hazard Log categories linked but specific entry IDs require DOORS full register access for entry-level citation
- **PENDING-FMECA**: Awaiting FMECA-level data from BASIS-002 to complete consequence calibration (FMECA extraction pending)

| TVA Scenario | Hazard Linked | SRAC Cited | IEC 62443-3-3 SR | Risk Score Derived | Consequence Traced to Safety Source | TS 50701 §6.3 Status |
| --- | --- | --- | --- | --- | --- | --- |
| TS-01 Rhysida-NZ | Category P (Infrastructure Failure) | None directly named | SR 7.1, SR 5.1 | Score 8–9 (Orange–Red) | Infrastructure failure modes in Hz-P series; Category F (if FDAS reach) | COMPLIANT |
| TS-02 FrostyGoop | Categories C, P, M, E | CM498737 (maintenance safety), CM480156 (alarm priority) | SR 3.1, SR 3.3, SR 4.1 | Score 7 (Orange) | Named entries Hz-E07-01-001, Hz-E08-01-001, Hz-M01-01-001, Hz-M02-01-001 | COMPLIANT |
| TS-03 CHAINLINK | Categories P, Q | None directly named | SR 3.3, SR 5.1, SR 7.6 | Score 6 (Amber) | Infrastructure failure via compromised firmware (Hz-P series); intentional act (Category Q) | COMPLIANT |
| TS-04 KEYHOLDER | Categories J, E, M | None directly named | SR 1.1, SR 1.3, SR 2.1 | Score 6 (Amber) | Named entries Hz-J03-04-006, Hz-E03-04-001, Hz-M01-01-001 | COMPLIANT |
| TS-05 RAILSTORM | Categories Q, F, P | CM480161 (independent beacon), CM491719 (evacuation posters) | SR 7.1, SR 3.1 | Score 8–9 (Orange–Red) | Named entries Hz-F01-02-002, Hz-F01-03-006; Categories Q and P | COMPLIANT |
| TS-06 Volt Typhoon | Categories H, Q, J, E | CM476059 (X-beam monitoring) | SR 1.1, SR 2.1, SR 5.1, SR 5.2 | Score 8 (Orange) | Named entries Hz-H01 series, Hz-J03-04-006, Hz-E03-04-001 | COMPLIANT |
| TS-07 TRISIS-II (FDAS/TVS) | Categories C, F, P | CM480161 (independent beacon), CM480158 (floor plans) | SR 7.1, SR 3.3, SR 5.1 | Score 8 (Orange) | Named entries Hz-F01-02-006, Hz-F01-02-008, Hz-F01-04-002 | COMPLIANT |
| TS-08 TUNNELSNAKE (Tunnel Ventilation) | Categories C, F, K | CM480161, CM491719 | SR 7.1, SR 3.1, SR 5.1 | Score 8 (Orange) | Named entries Hz-F01-02-008, Hz-F01-04-002; Category K (hazardous substance) | COMPLIANT |
| TS-09 Passenger System | Categories F, G | CM491719 (evacuation posters), CM480156 (alarm naming) | SR 7.1, SR 3.1 | Score 8 (Orange) | Named entries Hz-F01-01-008, Hz-F01-02-002, Hz-F01-03-006, Hz-F01-03-007 | COMPLIANT |
| TS-10 GHOST-RAIL | Categories F, P, A | CM491719, CM480161 | SR 7.1, SR 3.1, SR 5.2 | Score 8 (Orange) | Named entries Hz-F01-03-006, Hz-F01-04-001; Categories F, P, A | COMPLIANT |
| TS-11 DEADZONE | Categories P, F | CM491719 (evacuation posters) | SR 7.1, SR 5.1 | Score 7 (Orange) | Category P (wireless infrastructure failure); named entry Hz-F01-02-002 (delayed evacuation via PAVA dependency) | COMPLIANT |
| TS-12 DARKOPERATOR | Categories M, P, F | CM498737 (maintenance safety), CM480156 (alarm priority), CM480158 (floor plans) | SR 3.1, SR 3.3, SR 6.1 | Score 7 (Orange) | Named entries Hz-M01-01-001, Hz-M02-01-001, Hz-E07-01-001, Hz-E08-01-001 | COMPLIANT |
| TS-13 BLINDSIDE | Categories F, J, C | CM480156, CM480157, CM480158, CM480159, CM480161, CM491719 | SR 7.1, SR 3.1, SR 3.3, SR 2.1 | Score 8 (Orange) | Named entries Hz-F01-01-008, Hz-F01-02-002, Hz-F01-02-006, Hz-F01-02-008, Hz-F01-04-002, Hz-F01-03-006 | COMPLIANT — highest SRAC and hazard entry density of all scenarios |
| TS-14 IRONBOLT | Categories A, B | None named (operational procedures govern signalling safety) | SR 3.1, SR 5.1, SR 5.2, SR 7.1 | Score 7 (Orange) | Categories A (58 open) and B (30 open); specific entry IDs require DOORS full register | PARTIAL — category-level link complete; entry-level IDs pending DOORS access |
| TS-15 SHADOWVAULT | Categories Q, M | CM498737 (maintenance safety — state data integrity), CM476059 (X-beam monitoring — log integrity) | SR 4.1, SR 6.1 | Score 6 (Amber) | Category Q (intentional data theft); Hz-M01-01-001 (maintenance data integrity impact) | COMPLIANT |
| TS-16 VOLTZITE-RAIL | Categories H, Q, C, F, P | CM480161 (independent beacon), CM476059 (access monitoring), CM491719 (evacuation posters) | SR 7.1, SR 5.1, SR 5.2, SR 2.1 | Score 8 (Orange) | Named entries Hz-H01 series, Hz-F01-02-008, Hz-F01-04-002; Categories H, Q, C, F, P | COMPLIANT — broadest multi-category consequence basis of all scenarios |

**Compliance summary**: 15 of 16 scenarios COMPLIANT. 1 PARTIAL (TS-14 IRONBOLT — category-level link complete; DOORS entry-level access required for full compliance). 0 PENDING-FMECA. Overall TS 50701 §6.3.2 compliance status: SUBSTANTIALLY COMPLIANT, pending TS-14 entry-level resolution.

## 8. Critical Gap: Absence of a Dedicated Cyber Hazard Category

### 8.1 The Framework Mismatch

The RSSB Hazard-Based Safety (HBS) methodology, as implemented in the [Project Name] E&O Hazard Log ([Stakeholders], 2025b), defines 17 consequence-centric hazard categories. These categories describe what goes wrong — collision, fire, evacuation failure — without reference to the initiating cause. This approach reflects the traditional safety engineering premise that railway hazard analysis is cause-agnostic at the category level, with cause attribution occurring at the individual hazard entry level via the hazard ID structure (Hz-EVT-xx-yyy where EVT encodes the hazardous event type).

IEC 62443-3-2:2020 (IEC, 2020), the MITRE ATT&CK for ICS framework (MITRE Corporation, 2023), and TS 50701:2021 (CENELEC, 2021) are cause-centric: they organise risk by the attack technique (how), the threat actor (who), and the attack path (which system components). A single MITRE technique — for example, T0814 (Denial of Service) — can produce consequences spanning Categories C (Fire), F (Evacuation), M (Occupational Health), and P (Infrastructure Failure) simultaneously.

This is not a deficiency of the Hazard Log; it reflects the different purposes of the two frameworks. However, it creates a structural traceability challenge: because cyber attacks appear in the Hazard Log only as causal pathways within entries for Categories C, F, H, M, P, and Q — not as a distinct initiating cause category — there is no systematic way to enumerate all cyber-initiated hazards from the Hazard Log alone. Cyber causation must be inferred from the hazard description text and the affected system information in each entry.

### 8.2 Documented Impact

The absence of a dedicated cyber hazard category has the following documented effects:

- **Incomplete enumeration**: The 910 hazard entries in the DOORS export contain an unknown number of cyber-relevant entries that have not been systematically identified because there is no cyber flag or category filter. Section 4 of this register covers only the entries named in the Hazard Log report ([Stakeholders], 2025b); the full population requires a keyword search and manual review across all 910 entries in [DOC-PREFIX]-SSA-LKA-REG-800017.
- **No cyber likelihood dimension**: The Hazard Log likelihood scale (Table 9) reflects physical event probability, not cyber threat actor likelihood. A fire initiated by deliberate arson (intentional act) and a fire initiated by a BMS manipulation attack (cyber) have identical consequence levels but potentially very different likelihood levels under the Hazard Log scale versus the cyber threat actor typology in Section 2.2 of this register.
- **SRAC cyber dependency is implicit**: SRACs are documented as safety controls without explicit cyber dependency analysis. CM498737 (maintenance safety) is entirely cyber-dependent, but this dependency is not recorded in the SRAC text. This register provides the first formal documentation of that dependency.
### 8.3 Interim Bridge Function

This register (ICS-TVA-BASIS-003) serves as the interim TS 50701 §6.3.2 compliance bridge until the Hazard Log is revised. In conjunction with BASIS-001 (Safety-Security Convergence Matrix) and BASIS-002 (FMECA-MITRE Mapping Register), it provides the bidirectional traceability path from Hazard Log consequence → MITRE ATT&CK cause that TS 50701 requires but the current Hazard Log structure does not natively provide.

The gap documented in this section is formally captured as finding S25-G3 in S25-HazardLog-Extract.md §G.3 and is noted in the [Project Name] TVA QA Report ([Firm], 2026).

## 9. References

CENELEC. (2017). *Railway applications — Reliability, availability, maintainability and safety (RAMS) — Part 1: Generic RAMS process* (EN 50126-1:2017). European Committee for Electrotechnical Standardisation.

CENELEC. (2021). *Railway applications — Cybersecurity* (EN TS 50701:2021). European Committee for Electrotechnical Standardisation.

IEC. (2013). *Security for industrial automation and control systems — Part 3-3: System security requirements and security levels* (IEC 62443-3-3:2013). International Electrotechnical Commission.

IEC. (2016). *Hazard and operability studies (HAZOP studies) — Application guide* (IEC 61882:2016). International Electrotechnical Commission.

IEC. (2020). *Security for industrial automation and control systems — Part 3-2: Security risk assessment for system design* (IEC 62443-3-2:2020). International Electrotechnical Commission.

[Stakeholders]. (2025b). *Engineering and operational hazard log* (Document No. [DOC-PREFIX]-SSA-LKA-RPT-800001, Rev. 003B, for review 16 September 2025). [Project Name].

[Firm]. (2026). *[Project Name] TVA quality assurance report* (TVA-SCN-QA-REPORT, v1.0, 2026-02-28). Internal report.

MITRE Corporation. (2023). *ATT&CK for industrial control systems* (Version 14). MITRE.

Standards Australia. (2018). *Risk management — Guidelines* (AS ISO 31000:2018). Standards Australia.

## Appendix A: Risk Score Reference Table

Reproduced from S25-HazardLog-Extract.md Section D for register self-sufficiency. Source: [Stakeholders] (2025b, Tables 8–9).

| Likelihood \ Consequence | No Effect | Minor | Major | Critical | Catastrophic |
| --- | --- | --- | --- | --- | --- |
| Incredible | 0 | 1 | 3 | 4 | 5 |
| Rare | 0 | 2 | 4 | 5 | 6 |
| Remote | 0 | 3 | 5 | 6 | 7 |
| Occasional | 0 | 4 | 6 | 7 | 8 |
| Probable | 0 | 5 | 7 | 8 | 9 |
| Frequent | 0 | 6 | 8 | 9 | 10 |

**Risk band colour coding**: White (0) | Green (1–4) | Amber (5–6) | Orange (7–8) | Red (9–10)

## Appendix B: TVA Scenario — Zone and SL-T Quick Reference

| Scenario | Codename | Zones | SL-T | Primary Safety System Target |
| --- | --- | --- | --- | --- |
| TS-01 | Rhysida-NZ | Zone-2/4 | 3 | SCADA, BMS, IT/OT boundary |
| TS-02 | FrostyGoop | Zone-2 | 3 | BMS, ICS (Modbus/BACnet) |
| TS-03 | CHAINLINK | Zone-2/5 | 3 | SCADA, BMS, vendor access |
| TS-04 | KEYHOLDER | Zone-2/3 | 2 | ACS, BACnet |
| TS-05 | RAILSTORM | Zone-2/6 | 2 | PAVA, ICS, public-facing |
| TS-06 | Volt Typhoon | Zone-1/2/3 | 3 | Cross-zone pre-positioning |
| TS-07 | TRISIS-II (FDAS/TVS) | Zone-1 | 3 | FDAS (SIL 2), TVS (SIL 2) |
| TS-08 | TUNNELSNAKE (Tunnel Ventilation) | Zone-1 | 3 | TVS, BMS |
| TS-09 | (Passenger) | Zone-2/4 | 2 | PAVA, PIS, CCTV |
| TS-10 | GHOST-RAIL | Zone-2/3 | 2 | COMS, PAVA |
| TS-11 | DEADZONE | Zone-2 | 2 | Wireless, COMS |
| TS-12 | DARKOPERATOR | Zone-2 | 3 | SCADA HMI, BMS |
| TS-13 | BLINDSIDE | Zone-1/2 | 3 | FDAS, PAVA, ACS, ELS |
| TS-14 | IRONBOLT | Cross-zone | 3 | SIG (CBTC), COMS |
| TS-15 | SHADOWVAULT | Zone-2/3 | 2 | SCADA, BMS, ICS data |
| TS-16 | VOLTZITE-RAIL | Zone-1/2 | 3 | Nation-state multi-system |

*This register provides the TS 50701 §6.3.2 compliance traceability layer for all 16 [Project Name] TVA scenarios. Population is based on S25-HazardLog-Extract.md (working document) and the [Project Name] E&O Hazard Log [DOC-PREFIX]-SSA-LKA-RPT-800001 Rev 003B ([Stakeholders], 2025b). Full entry-level coverage for Category A and B hazards (TS-14 IRONBOLT) requires DOORS register access ([DOC-PREFIX]-SSA-LKA-REG-800017 Rev 012 B23).*

*Governed by: [[ICS-TVA-BASIS-IMPL-001-Implementation-Plan]] Companion artefacts: [[ICS-TVA-BASIS-001-Safety-Security-Convergence-Matrix]] | [[ICS-TVA-BASIS-002-FMECA-MITRE-Mapping-Register]] | [[ICS-TVA-BASIS-004-SIL-SLT-Calibration-Record]]*

