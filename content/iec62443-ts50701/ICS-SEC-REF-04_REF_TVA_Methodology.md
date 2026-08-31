---
tags: [iec62443, workpaper, tva, methodology, risk-assessment]
type: reference
status: converted
---

# Reference: TS 50701 TVA Methodology: SL-T Derivation and Multi-Disciplinary Convergence

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-REF-04_REF_TVA_Methodology]] |
| Version | 1.0 FINAL |
| Date | 2026-03-02 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | COMPILED |
| Dossier Section | References |
| Dossier Position | Document 87 of 101 |
| Scope | TS 50701 SL-T derivation methodology for Cyber-Physical TVA (Step 3 of 6) |
| Standards | IEC 62443-3-2:2020; EN CLC/TS 50701:2021 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

# Appendix B: System Integration Methodology for Cyber Risk Analysis

**Integrating System Engineering (RAMS, FMEA, Hazard Logs) with Cyber Threat Intelligence (TS 50701 / IEC 62443)**

## 1. Introduction

This appendix details the rigorous, multi-disciplinary methodology implemented to assess cyber security risk within the critical infrastructure environment. In strict adherence to **TS 50701** (Railway Applications - Cybersecurity) and **IEC 62443** (Industrial Communication Networks), the Cyber Threat and Vulnerability Analysis (TVA) does not operate in isolation.

The determination of a cyber threat's consequence severity is entirely inherited from the quantitative constraints defined by System and Safety Engineering disciplines. This document outlines how these external disciplines converge to mathematically derive the **Target Security Level (SL-T)**.

## 2. The TS 50701 Target Security Level (SL-T) Methodology

The core philosophy of ICS and Rail cyber security is that an adversary's success results in a kinetic or operational failure. Therefore, the governing equation for determining required security controls is:

**SL-T = IC (Impact Category) + AC (Attacker Capability) - 1**

To achieve an auditable and engineering-grade SL-T, the variables IC and AC must be sourced from their respective domain authorities.

### 2.1 Domain Sourcing Matrix

| Discipline | Source Documentation | Output Variable | Description |
| --- | --- | --- | --- |
| System/Safety Engineering | Hazard Logs, RAMS Reports, FMECA, Safety Case, ConOps | IC (Impact Category) | Determines the absolute worst-case physical, environmental, or operational consequence if an asset fails or acts maliciously. |
| Cyber Threat Intelligence | MITRE ATT&CK Framework, Threat Actor Profiling | AC (Attacker Capability) | Determines the sophistication, resources, and intent of the adversary attempting the compromise. |
| Cyber Risk Engineering | TVA (Threat & Vulnerability Assessment) | SL-T (Target Security Level) | Synthesizes the inherited IC and AC to compute the required defensive posture (SL 1-4). |

## 3. Disciplinary Workflows & Integration

### 3.1 The Safety & Systems Engineering Pipeline (Deriving the IC)

Cyber security analysts do not approximate the consequences of a system failure. Instead, the methodology extracts the formally verified engineering assessments.

- **Failure Mode, Effects, and Criticality Analysis (FMECA):** Analyzes specific equipment and subsystem failures. If the FMECA indicates that a switch controller failure results in a major operational delay, this operational impact is recorded.
- **Hazard Logs & Safety Case:** Identifies failure states that lead to human injury or kinetic damage. If the loss of an interlocking system results in a Catastrophic safety hazard, this constraint is rigidly captured.
- **Concept of Operations (ConOps):** Defines the minimum operating requirements and degraded modes of operation acceptable to the client ([Project Name]).
- **Translation to TS 50701 IC Scale:** The outputs of these documents are translated into standardized numerical **Impact Categories (1 through 5)** across Safety, Operational, Financial, and Environmental dimensions. The highest value becomes the governing **max IC Score** for that specific asset or zone.
### 3.2 The Cyber Threat Intelligence Pipeline (Deriving the AC)

Simultaneously, the threat landscape is evaluated to determine the capability of potential adversaries.

- **Threat Actor Profiling:** Identifying the motives and resources of potential attackers (e.g., Nation-State, Proxies, Organized Cybercriminal, Insider Threat, Script Kiddie).
- **MITRE ATT&CK Mapping:** Modeling the specific tactics, techniques, and procedures (TTPs) these actors employ (e.g., *T1036 Masquerading*, *T1190 Exploit Public-Facing Application*).
- **Translation to AC Scale:** Advanced adversaries utilizing sophisticated, zero-day, or heavily resourced MITRE techniques are assigned a high **Attacker Capability Score (AC)**. Unsophisticated actors using automated scripts receive a low AC.
## 4. Synthesis: The Threat and Vulnerability Assessment (TVA)

The TVA serves as the convergence point for these two disciplines. When a Cyber Threat Scenario is developed:

- The scenario targets a specific system zone.
- The assessment inherits the pre-calculated **max IC Score** established by the Safety/RAMS team for that zone.
- The assessment assigns the specific **AC Score** based on the evaluated Threat Actor and MITRE profile.
- The TS 50701 formula SL-T = IC + AC - 1 is applied dynamically.
### Example Convergence

- **System Sourcing:** The Hazard Log dictates that a loss of SCADA visibility results in a Significant Operational Impact (**IC = 3**).
- **Threat Sourcing:** Threat Intelligence indicates a Nation-State actor (highly resourced) targeting similar infrastructure using advanced MITRE ICS techniques (**AC = 3**).
- **TVA Output:** The methodology computes SL-T = 3 + 3 - 1. The Target Security Level for the SCADA zone is determined to be **SL 5** (capped at the maximum standard scale of **SL-T 4**).
## 5. IEC 62443-3-2 Application to [Project Name] TVA

**DRR-800029 Item 68 — OV Response: Confirm how IEC 62443-3-2 has been applied**

The [Project Name] TVA applies IEC 62443-3-2:2020 through the following structured process:

- **SuC Identification (ZCR 1):** 20 subsystems and 562+ digital assets identified from the SYW contract engineering documentation. SuC boundary defined at the [Project Name] SYW contract perimeter.
- **Zone and Conduit Partitioning (ZCR 3):** Assets partitioned into 6 security zones per three IEC 62443-3-2 grouping criteria (operational function, SL consistency, safety separation per TS 50701 §6.4.2). 6 IP conduits and 6 hardwired bypasses documented in ZCR-29.
- **Threat and Vulnerability Assessment (ZCR 5):** 16 TVA scenarios developed per zone, each modelling a specific threat actor and kill chain using MITRE ATT&CK for ICS v14, with IEC 62443-3-3 SR countermeasure citations.
- **SL-T Calculation (ZCR 6):** SL-T = IC + AC - 1, with IC inherited from Safety Engineering (Hazard Log, FMECA) and AC derived from threat actor profiling (CISA, ASD, NCSC [COUNTRY] intelligence).
- **Residual Risk Assessment:** Per TS 50701 §5.3 ALARP methodology, with compensating controls documented for scenarios exceeding zone SL-T (IEC 62443-3-2:2020 §8.4.4).

The full IEC 62443-3-2 application methodology is cross-referenced in TVA-01 (ICS-SEC-TVA-01_TVA_Introduction) §9B.

## 6. Conclusion

By formally decoupling the consequence assessment (IC) from the threat assessment (AC) and sourcing them directly from their authoritative engineering disciplines (RAMS/FMEA and Cyber Intelligence, respectively), the resulting TVA and Safety Case present a mathematically sound, reproducible, and highly defensible security posture that withstands rigorous regulatory scrutiny.

