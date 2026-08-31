---
tags: [iec62443, workpaper, safety-engineering, functional-safety]
type: reference
status: converted
---

# Reference: Safety Engineering: FMECA and Hazard Integration for Cybersecurity Alignment

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-REF-06_REF_Safety_Eng]] |
| Version | 1.0 FINAL |
| Date | 2026-03-02 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | COMPILED |
| Dossier Section | References |
| Dossier Position | Document 89 of 101 |
| Scope | FMECA and hazard integration for Cyber-Physical TVA (Step 3 of 6) |
| Standards | IEC 62443-3-2:2020; EN CLC/TS 50701:2021 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

# 1 Introduction and Strategic Framework

In the lifecycle of critical infrastructure like the [Project Name], the convergence of Systems Safety (RAMS) and Industrial Automation and Control Systems (IACS) security is no longer theoretical—it is an operational mandate. As we align our safety engineering with the IEC 62443 and TS 50701 frameworks, we must recognize that physical safety failure modes are the ultimate "kinetic" consequence of cyber-physical attacks. In a rail environment, a digital breach is significant only insofar as it induces a physical state change—such as an un-commanded point movement or a ventilation failure—that threatens human life or network integrity.

The purpose of this document is to establish the safety-centric foundation for the forthcoming Threat and Vulnerability Risk Assessment (TVA). By synthesizing data from the **[Project Name] FMECA Report ([DOC-PREFIX]-SSA-LKA-RPT-800009, Revision 003, June 2025)**, we provide the technical ground truth required to map digital threats to physical consequences. This analysis is timed to align with Safety Stage Gate 4A2, ensuring that our cybersecurity strategy is based on "Issued for Construction" (IFC) design data.

The "So What?" factor for this integration is high: the FMECA identifies the [Project Name]'s "crown jewels." These are the assets—primarily those on the Safety Critical Items List (SCIL)—where a failure, whether mechanical or malicious, leads to unacceptable safety outcomes. Identifying these items allows the TVA team to move beyond generic IT security and focus on the high-consequence targets that define the [Project Name]’s risk profile.

# 2 Methodological Foundation: PBS and FMECA Integration

Effective traceability between safety and cybersecurity requires a rigorous Product Breakdown Structure (PBS). The [Stakeholders] utilizes a 5-level PBS that decomposes the [Project Name] from "System" (Level 1) down to the "Line Replaceable Unit" (LRU, Level 5). This structure allows for granular risk identification, ensuring that a vulnerability in a specific hardware component, such as a plant controller or a signaling transponder, can be traced to its high-level operational impact.

The FMECA process utilizes specific fields that provide essential data for cyber-monitoring and intrusion detection strategies. In a TVA context, the "Cause" field, which typically identifies wear and tear or manufacturing defects, is re-envisioned to account for "Threat Actors" and "Vulnerabilities."

Table 1: FMECA Fields and Cybersecurity Synthesis

| Field Name | Description | Cybersecurity Application |
| --- | --- | --- |
| Failure Effect (System-Railway) | Impact on the operation or status of the railway and train services. | Defines the "Impact" score in the TVA; identifies high-consequence targets. |
| Failure Detection | How the failure mode becomes known to the Operator/Maintainer. | Serves as the blueprint for Intrusion Detection System (IDS) triggers. |
| Cause | Conditions leading to the failure. | Replaced in TVA by Threat Actors (e.g., malicious insider, nation-state) and technical vulnerabilities. |
| Frequency / Likelihood | Qualitative category of occurrence. | Adjusted in TVA based on the exploitability of the digital interface. |
| Risk Class | Qualitative classification based on the [Project Name] risk matrix. | Prioritizes assets for IEC 62443 Security Level (SL) assignment. |

This methodology is executed in accordance with **MIL-STD-1629A** and the **RAM Assurance Management Plan [R1]**. By bridging the gap between hardware failure and system-wide vulnerability, we ensure that cybersecurity controls are not merely "bolted on" but are integrated into the fundamental reliability of the rail system.

# 3 Hazard Analysis and the Engineering Hazard Log

The FMECA is inextricably linked to the **Engineering and Operational Hazard Log [R31] (Revision 002A)**. While the FMECA identifies the "how" of equipment failure, the Hazard Log tracks the "what" regarding the consequence to the system. A single equipment failure often triggers a high-level hazard; for instance, a "Rail Break" failure mode in the Track FMECA is mapped directly to **Hz-B01-01-011**.

A critical dimension of this analysis is the evaluation of **Operation Modes**:

- **Normal:** Timetable-based operations.
- **Emergency:** Harm or threat of harm to people or property.
- **Degraded:** Headway irregularities or journey delays.
- **Maintenance:** Planned windows for engineering works.

From a cybersecurity perspective, the **Emergency** mode represents the highest lethality window. A coordinated attack on the **Tunnel Ventilation System (TVS)** during an emergency evacuation would be catastrophic. If an attacker disrupts the TVS fans or dampeners while the system is in Emergency mode, the ability to manage smoke and provide a safe egress path is compromised, turning a manageable incident into a multi-fatality event.

# Criticality Assessment: RCIL vs. SCIL

Strategic prioritization is driven by the differentiation between Reliability Critical (RCIL) and Safety Critical (SCIL) items.

- **RCIL (Reliability Critical Items List):** Items where failure results in a "Significant" impact (e.g., a service delay >30 minutes or station closure). These are the targets for service disruption attacks.
- **SCIL (Safety Critical Items List):** High-priority targets. An item is SCIL if its failure results in a risk category of 6 or above and it lacks a "fail-safe" design as defined by **EN50129**. These represent single points of failure that can lead to catastrophic accidents.

The following table, synthesized from **Source Table 13**, illustrates the distribution of these items.

Table 2: Corrected Summary of Critical Items

| Subsystem | RCIL Count | SCIL Count |
| --- | --- | --- |
| Signaling | 0 | 10 |
| Track | 8 | 4 |
| Electrical Low Voltage (ELV) | 8 | 0 |
| Communications | 2 | 0 |
| Vertical Transportation | 0 | 16 |

Criticality dictates the priority of cybersecurity controls. For example, the 16 SCIL items in Vertical Transportation and 10 in Signaling represent the most sensitive physical interfaces in the project.

# Deep Dive: Cyber-Sensitive Subsystems

Three subsystems are the primary focus for IEC 62443 and TS 50701 assessments due to their high digital connectivity and safety-critical functions.

## Communications

The Communications network provides the signaling backbone. The RCIL identifies the **Point of Interface (POI)** and **Radiating Cable (Leaky Feeder)** as critical for signal transmission. Malicious interference with these components—such as signal jamming or unauthorized packet injection—directly impacts the transmission of emergency signals and operator-to-train communications.

## Building Management System (BMS)

The BMS is the primary "Detection" layer for the station and tunnel environments. While it has fewer SCIL items, it is the most digitally exposed. Specific digital targets include the **CPO-PC200 Plant Controllers** and **ControlEdge 900 CPMs**. Sensors such as the **MSX-W11-PA** (Differential Pressure Transmitter) provide the raw data for environmental control. In a TS 50701 framework, the "Failure Detection" mechanisms for these sensors should be repurposed as "Intrusion Detection" triggers; if a controller reports data inconsistent with physical laws, a cyber-breach must be suspected.

## Signaling

The Signaling subsystem is unique in that it contains **10 SCIL items and 0 RCIL items**. This is a cognizant engineering distinction: every critical failure in Signaling is categorized as a **Safety** issue rather than just a Reliability issue. Because these systems lack a "fail-safe" design (EN50129) at the component level, they rely on complex logic to prevent collisions. A cyber-physical attack that bypasses this logic represents the highest-order risk to the [Project Name].

# **6 Mitigations and Safety Related Application Conditions (SRACs)**

Residual risks that cannot be designed out are managed through **Safety Related Application Conditions (SRACs)**. These are essential administrative and operational controls. All such measures are documented in the **Operation and Maintenance Control Measure Register ([DOC-PREFIX]-SSA-LKA-REG-8000019)**.

A critical cyber-vulnerability exists in the integrity of this Register itself. For example, Track safety relies on "Maintenance inspections and preventive actions" (SRAC for Rail Breaks). If the digital register or the maintenance management software is compromised—such as through a ransomware attack—the visibility of whether these safety-critical inspections were completed is lost. This increases the **Mean Time To Repair (MTTR)** and potentially leaves the system in an unsafe state without the operator's knowledge. Maintenance disruption is not just an operational nuisance; it is a direct degradation of the safety margins established in the FMECA.

# Conclusion: Requirements for the TVA

The FMECA (Revision 003) provides the objective ground truth for the [Project Name]'s physical vulnerabilities. To ensure the TVA is robust and aligned with IEC 62443/TS 50701, the following requirements are mandated for the assessment team:

- **Prioritize SCIL Assets for Security Levels (SL):** Assets on the SCIL, particularly in Signaling and Track (Running Rails, Crossing/Frog), must be assigned the highest Security Levels to protect against sophisticated threat actors.
- **Logic-Based Monitoring Integration:** The "Failure Detection" methods identified for the **CPO-PC200 controllers** and signaling components must be integrated into the Cyber-Operations Center (CSOC) monitoring logic.
- **Maintenance Integrity Assurance:** The TVA must specifically assess the risk of cyber-interference with the **Operation and Maintenance Control Measure Register [R19-REG]**, as this register is the ultimate guardian of our SRACs.
- **Signaling Specificity:** The TVA must account for the fact that Signaling has 0 RCIL items; the focus must remain entirely on high-integrity safety protection.
# References

- [Stakeholders]. (2021). *RAM Assurance Management Plan* ([DOC-PREFIX]-SSA-LKA-PLN-800001, Rev 002) [R1].
- [Stakeholders]. (2021). *System Safety Assurance Management Plan* ([DOC-PREFIX]-SSA-LKA-PLN-800000, Rev 003) [R19].
- [Stakeholders]. (2023). *Engineering and Operational Hazard Log Report* ([DOC-PREFIX]-SSA-LKA-RPT-800001, Rev 002A) [R31].
- [Stakeholders]. (2025). *FMECA Report* ([DOC-PREFIX]-SSA-LKA-RPT-800009, Rev 003) [Approved 13/06/2025].
- [Stakeholders]. (2025). *Operation and Maintenance Control Measure Register* ([DOC-PREFIX]-SSA-LKA-REG-8000019).
