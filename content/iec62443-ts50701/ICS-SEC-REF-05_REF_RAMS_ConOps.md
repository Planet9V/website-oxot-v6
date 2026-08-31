---
tags: [iec62443, workpaper, rams, conops, systems-engineering]
type: reference
status: converted
---

# Reference: Reference — RAMS and ConOps Integration for Cybersecurity Alignment

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-REF-05_REF_RAMS_ConOps]] |
| Version | 1.0 FINAL |
| Date | 2026-03-02 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | COMPILED |
| Dossier Section | References |
| Dossier Position | Document 88 of 101 |
| Scope | RAMS and ConOps integration for Cyber-Physical TVA (Step 3 of 6) |
| Standards | IEC 62443-3-2:2020; EN CLC/TS 50701:2021 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

# [Project Name] Cybersecurity Alignment: RAMS and ConOps

# 1 Introduction and Strategic Framework

The [Project Name] represents a fundamental shift in the [Metro Network]’s operational profile, transitioning it from a legacy rail configuration into a highly integrated, network-centric cyber-physical system. This [X.X km] twin-tunnel link facilitates the critical evolution of [Terminal Station] from a constrained terminus into a high-capacity through-station, enabling a future-state capacity of [N] trains per hour (TPH) with a passenger load of [capacity] per [N]-car EMU ([Stakeholders], 2025). As the system’s complexity increases, traditional Railway RAMS (Reliability, Availability, Maintainability, and Safety) engineering must be inextricably linked with modern cybersecurity frameworks, specifically IEC 62443 and CLC/TS 50701. This alignment is required to ensure that the increased attack surface—inherent in the underground environment and digital control logic—does not compromise the operational resilience of the network.

The scope of this document is to define the foundational alignment between Safety Engineering, RAMS performance mandates, and the upcoming Threat and Vulnerability Risk Assessment (TVA). By anchoring the TVA in the physical realities of the [Project Name]’s Fit-for-Purpose (FfP) requirements, we ensure that cybersecurity controls are prioritized based on their impact on life-safety and the "Licence to Operate." This strategic foundation begins with a rigorous mapping of the operational architecture and the organizational roles mandated by the Project Alliance Agreement.

# 2 Operational Architecture and Organisational Governance

Identifying the [Project Name]’s safety and cybersecurity attack surfaces requires a granular understanding of the "Concepts of Operations" (ConOps). In a cyber-physical environment, organizational boundaries often define the limits of Security Zones and the Handover-of-Control protocols.

| Organisation | Responsibility regarding System Safety and Asset Ownership |
| --- | --- |
| [Delivery Agency] | Delivery agency (Crown/Council co-owned); ultimate accountability for project realization ([Stakeholders], 2025). |
| [Stakeholders] | Consortium responsible for the delivery of tunnels, stations, and rail systems; primary integrator of OT/ICS environments. |
| [Transit Authority] ([TA]) | Premises owner and owner of the EMU fleet; responsible for public transport service delivery and station customer interface. |
| [Rail Network Operator] | Rail Network Access Provider and Infrastructure Owner/Maintainer; responsible for network/traction control and safety case integrity. |
| [Metro Service Operator] ([MSO]) | Metro Service Operator (MSO); responsible for day-to-day train operations, crew management, and rolling stock maintenance. |

The National Train Control Centre ([NCC]) in [Control Centre City] represents a critical nexus for both reliability engineering and cyber-vulnerability. The [NCC] manages the entire [City/Region] network via a centralized control model that is expanding from four to five train control desks to accommodate [Project Name] ([Stakeholders], 2025). This concentration of control, coupled with the management of the Realflex SCADA system for traction power, creates a significant "span of control" risk. A cybersecurity breach at the [NCC] would not only impact availability but could invalidate the safety-critical separation of trains across the AEA. These operational roles are governed by Fit-for-Purpose (FfP) mandates that dictate the required safety and performance outcomes.

# 3 Safety Engineering and RAMS Performance Mandates

The Fit-for-Purpose statements (Table 1) serve as the "ground truth" for system requirements. For the Systems Assurance lead, these mandates define the thresholds where a cyber-event becomes a regulatory failure.

## **3.1 Key RAMS-Specific FfP Mandates:**

- **On-Time Reliability (Item 2):** The system must achieve an on-time reliability of not less than 95%, defined as services arriving within five minutes of scheduled time ([Stakeholders], 2025).
- **Maintenance Windows (Item 7):** Routine maintenance must be completed within the narrow window of 0050 to 0510 hours to achieve RAMS targets without service disruption.
- **Safety Assurance (Item 8):** Systems must be "acceptably safe," requiring a formal Safety Assurance Report (SAR) with SFAIRP (So Far As Is Reasonably Practicable) arguments.
- **RAMS Compliance (Item 9):** Demonstrated compliance with all specified RAMS targets during Shakedown Tests.

**The "So What?" Analysis: Assurance and Regulatory Risk** The 95% reliability target is hypersensitive to cyber-induced latency. Because the maintenance window (Item 7) is restricted to approximately four hours, a cyber-event that delays the "handover" from maintenance to normal operations by as little as 20 minutes can trigger a cascading failure, making the 95% morning peak target mathematically impossible to meet. Furthermore, any compromise of the OT environment directly challenges the SFAIRP arguments within the SAR. Failure to provide cybersecurity evidence that meets CLC/TS 50701 standards may lead the regulator, [National Transport Regulator], to withhold the "Licence to Operate," effectively stranding the asset.

# 4 Critical Systems Analysis: Signalling, Traction, and Control

The [Project Name] does not represent a transition from analog to digital, but rather a shift from isolated digital systems to a highly integrated, network-centric architecture. This integration increases the technical dependencies between historically siloed systems.

- **Signalling and ETCS Level 1:** The Siemens WestRace MkII is a solid-state, digital interlocking system. Combined with the European Train Control System (ETCS) Level 1, it provides Automatic Train Protection (ATP) to ensure safe train separation ([Stakeholders], 2025). The WestRace MkII’s modular architecture is the primary boundary for Security Zoning under TS 50701.
- **Traction Power SCADA:** The Realflex SCADA system manages the 25kV traction supply. Unauthorized manipulation of this system could lead to a total loss of network availability or create "unpowered" scenarios where trains are stranded in the [X.X km] tunnel.
- **Integrated Control Systems (ICS) and Station SCADA:** The [Primary Control Centre] and the [Secondary Control Centre] manage life-safety assets, including the Tunnel Ventilation System (TVS) and fire suppression.

| System | Criticality to RAMS | Potential Cyber-Impact (TVA Impact) |
| --- | --- | --- |
| WestRace MkII Interlocking | High: Safety Integrity | Denial of Service (DoS) silences ETCS balise data; forced manual driving reduces TPH from 24 to <6. |
| Realflex Traction SCADA | High: Availability | Breach leads to loss of 25kV; total network paralysis and loss of 95% reliability target. |
| ICS / Station SCADA | Critical: Life-Safety | Disabling TVS during a fire event; results in "Catastrophic" impact rating in the TVA. |

The modularity of these systems provides the baseline for the "Security Levels" (SL) required to maintain the various Modes of Operation.

# 5 Operational Modes and Impact Analysis for TVA

Defining the boundaries between operational modes is essential for the TVA to quantify the "Impact" variable of any given threat.

- **Normal Operations:** Full service at peak frequency ([N] TPH) following the agreed timetable ([Stakeholders], 2025).
- **Abnormal Operations:** Planned service deviations or minor fluctuations.
- **Degraded Operations:** Reduced functionality due to failure; may involve bi-directional working.
- **Emergency Operations:** Life-safety events (fire, derailment) requiring external emergency services.

**Strategic Synthesis: Forced Mode Transition** A primary objective of a cyber-adversary is to intentionally force the system from "Normal" into "Degraded" or "Emergency" states. For example, by compromising the digital interlocking logic, an attacker could attempt to initiate **bi-directional working** in a tunnel section without proper authority—a high-consequence safety event ([Stakeholders], 2025). In "Emergency" scenarios, the reliance on the **Tunnel Ventilation System (TVS)** is absolute. A cyber-attack that inhibits the TVS during a fire emergency would nullify the [Rail Network Operator] Emergency Management Plan, transforming a manageable incident into a mass-casualty event. These operational boundaries must dictate the Security Level (SL) assignments in the TVA.

# 6 Alignment with IEC 62443 and TS 50701

To ensure the [Project Name]’s resilience, the Safety Engineering (RAMS) findings must directly inform the Cybersecurity Security Levels (SL) and Security Zones. A unified assurance approach prevents the common pitfall of treating IT risks and OT safety risks as separate domains.

## **6.1 Informing Data Points for the TVA Team:**

- **Security Zoning:** The modular WestRace MkII and Realflex architectures must be used to define Security Zones under TS 50701.
- **Availability Benchmarks:** The 95% on-time target means any cyber-risk causing a loss of more than 5% availability is a "Critical" risk.
- **Life-Safety Criticality:** Assets such as the TVS, fire suppression, and Emergency Help Points (EHPs) require the highest SL-Target ratings due to their role in "Emergency Mode."

This RAMS-based foundation ensures the TVA is grounded in the physical operational realities of the [Metro Network]. By protecting the digital logic of the railway, we secure the physical safety of its passengers and the strategic utility of the infrastructure.

# References

International Electrotechnical Commission. (2018). *IEC 62443: Industrial communication networks - Network and system security*.

[Stakeholders]. (2025). *[Project Name] Concept of Operations (Document No. [DOC-PREFIX]-ROP-LKA-RPT-800000, Rev. 000)*. [Delivery Agency].

Technical Specification. (2021). *CLC/TS 50701: Railway applications - Cybersecurity*. European Committee for Electrotechnical Standardization.

