---
tags: [iec62443, workpaper, cyber-threats, comparables, case-studies]
type: reference
status: converted
---

# Reference: [Project Name] Threat Comparables — Global Threat Alignment Assessment

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-REF-10_Cyber_Threat_Comparables]] |
| Version | 1.0 FINAL |
| Date | 2026-03-02 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | COMPILED |
| Dossier Section | References |
| Dossier Position | Document 93 of 101 |
| Scope | [Project Name]-to-global threat alignment analysis for TVA (Step 3 of 6) |
| Standards | IEC 62443-3-2:2020; EN CLC/TS 50701:2021 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

The alignment between global cybersecurity threat research and the [Project Name] project reveals direct comparables across sector regulations, geographic threat landscapes, technological vulnerabilities, and vendor architectures. The [Project Name] infrastructure has been explicitly designed to counter the precise operational technology (OT) threats identified by international and regional cyber authorities.

### 1. Sector Standards and Architectural Frameworks

**Threat Research:** The global railway sector is undergoing rapid digital transformation, necessitating a shift from IT-centric security models (Confidentiality, Integrity, Availability) to models that prioritize functional safety (Reliability, Availability, Maintainability, Safety, or RAMS) (Shieldworkz, 2026). To achieve this, the industry relies on the **IEC 62443** series and the railway-specific **CENELEC CLC/TS 50701** standard, which mandate the partitioning of a "System under Consideration" (SuC) into logical Security Zones and Conduits (Shieldworkz, 2025; Technical Report, 2025). These zones are assigned target Security Levels (SL), with safety-critical systems typically requiring SL-4, and operational systems requiring SL-2 or SL-3 (Shieldworkz, 2026).

**[Project Name] Project Comparable:** The [Project Name] project perfectly mirrors this regulatory architecture. The [Project Name] infrastructure implements a formal 6-zone security architecture compliant with IEC 62443-3-2 and TS 50701 (User Notes, 2026). The project classifies its critical environments precisely according to these standards: Zone 1 (Life-Safety Systems like the Tunnel Ventilation System and PAVA) is assigned **SL-3**, while Zone 2 (Security & Surveillance) and Zone 3 (Building Automation) are assigned **SL-2** (User Notes, 2026).

### 2. Geographic Threat Landscape ([Country] & APAC)

**Threat Research:** Regional threat intelligence from the [Country] National Cyber Security Centre (NCSC [COUNTRY]) and the Australian Signals Directorate (ASD) highlights that critical infrastructure in the APAC region is actively targeted by both state-sponsored actors (such as "Volt Typhoon") and financially motivated ransomware groups (National Cyber Security Centre, 2025b; Technical Report, 2025). A specific vulnerability identified by the NCSC is the unintentional exposure of OT devices to the public internet, driven by the desire for remote diagnostics and IT/OT convergence (National Cyber Security Centre, 2025a). Furthermore, actors are pre-positioning within critical infrastructure to cause disruption during geopolitical conflicts, often utilizing "Living off the Land" techniques to evade detection (Technical Report, 2025).

**[Project Name] Project Comparable:** Because the [Project Name] is a highly visible, critical national infrastructure asset in [Country]'s largest city, it falls directly into the crosshairs of the threat actors identified by the NCSC. To counter the risk of unintended OT exposure, [Project Name] explicitly prohibits direct traffic routing from [Transit Authority]'s ([TA]) corporate IT network ([VLAN-CORP-IT]) into operational networks (User Notes, 2026). Remote access to the Building Management System (BMS) is disabled by default and requires explicit authorization, mitigating the specific "unintentional exposure" threat flagged by the NCSC ([Stakeholders], 2023b).

### 3. Technologies and Protocol Fragility

**Threat Research:** Industrial control protocols such as **Modbus**, **DNP3**, and **PROFINET** were designed for reliability, not security, meaning they lack native encryption or authentication (Technical Report, 2025). Cyber threat research indicates that if an attacker breaches the network perimeter, they can inject commands directly into Programmable Logic Controllers (PLCs) to manipulate physical actuators, potentially causing a "Loss of Safety" impact (Technical Report, 2025; Nozomi Networks, 2023). Furthermore, legacy OT equipment can crash if subjected to standard IT active vulnerability scanning, requiring passive monitoring and robust perimeter boundaries (Shieldworkz, 2026).

**[Project Name] Project Comparable:** The [Project Name] relies heavily on these exact cleartext protocols to operate its stations and tunnels. The project utilizes **Modbus TCP** and **BACnet IP** to control the Environmental Control System (ECS), Electrical Management System (EMS), and Lighting Control System (LCS) via Honeywell CPO-PC200 and ControlEdge PLCs ([Stakeholders], 2023a). Because these protocols cannot defend themselves, [Project Name] implements a Defense-in-Depth architectural compensation strategy:

- **Virtual Routing and Forwarding (VRF):** [Project Name] places its OT systems in isolated VRF instances (e.g., [VRF-OT]) to keep routing tables entirely invisible to the general IT network (Honeywell Limited, 2024; User Notes, 2026).
- **Deep Packet Inspection (DPI):** Inter-VLAN traffic is strictly governed by active-passive FortiGate 601E firewalls that utilize an explicit "deny all" bottom rule to block unvetted network pivoting (Honeywell Limited, 2024; User Notes, 2026).
### 4. Vendors, Supply Chain, and Edge Security

**Threat Research:** Supply chain attacks and "Shadow OT" (such as unauthorized modems installed by maintenance crews) represent major blind spots for railways (Shieldworkz, 2026; National Cyber Security Centre, 2025b). Threat actors exploit these third-party dependencies—as seen in the 2022 Danish railway stoppage caused by a ransomware attack on an IT supplier, or the 2024 UK station Wi-Fi hack executed via a third-party vendor account (Muse, 2025; HALOCK Security Labs, 2025). Industry guidance strongly advocates for Network Access Control (NAC) and Zero Trust models to verify the identity of every device and user attempting to connect to the network (Nozomi Networks, 2023).

**[Project Name] Project Comparable:** The [Project Name] ecosystem relies on a complex supply chain of integrated vendors, including Honeywell (SCADA/BMS), Milestone (CCTV), Gallagher (ACID), and Avaya (Telephony) ([Stakeholders], 2023a; User Notes, 2026). To prevent compromised third-party hardware or rogue devices from breaching the OT network, [Project Name] employs dynamic port-level enforcement at the physical edge:

- **Aruba ClearPass RADIUS Enforcement:** Access switches (Aruba 6300M) demand IEEE 802.1X certificate-based authentication for capable IT endpoints, or MAC-address bypass for legacy field devices, quarantining any unauthorized hardware attempting to connect (Honeywell Limited, 2024; User Notes, 2026).
- **Localized Authentication:** To protect against external enterprise outages or wide-area network ransomware events, [Project Name] utilizes localized, redundant Read-Write Domain Controllers (RWDC) at each station (e.g., [Station C] and [Station B]). This ensures that Role-Based Access Control (RBAC) and Single Sign-On (SSO) remain functional, allowing operators to retain command of life-safety systems even if the wider network is severed (Honeywell Limited, 2024; User Notes, 2026).

### APA Reference Bibliography

- **HALOCK Security Labs.** (2025). *Top Cyber Threats in the Freight Rail Sector*.
- **Honeywell Limited.** (2024). *Hardware Configuration Report [Project Name] - Rail Systems - Comms Integrated Control System* ([DOC-PREFIX]-COM-HWL-RPT-800007 Rev. 012B).
- **[Stakeholders].** (2023a). *Integrated Control System (ICS) & Building Management System (BMS) Technical Interface Specification (TIS)* ([DOC-PREFIX]-SYE-LKA-SPE-800005 Rev. A01).
- **[Stakeholders].** (2023b). *System Requirement Specification for Building Management Systems* ([DOC-PREFIX]-SYE-LKA-REQ-800003 Rev. 001).
- **Muse, D.** (2025). *The future of rail cybersecurity – The evolving cyber threat landscape in rail*. Rail Business Daily.
- **National Cyber Security Centre.** (2025a). *Cyber Security Guidance: Preventing unintentional operational technology device exposure*. [Country] Government Communications Security Bureau.
- **National Cyber Security Centre.** (2025b). *Cyber Threat Report 2025 Pūrongo Tuma ā-Ipurangi 2025*. [Country] Government Communications Security Bureau.
- **Nozomi Networks.** (2023). *Securing Rail Networks: Cyber Risk Scenarios & Defense Strategies*.
- **Shieldworkz.** (2025). *A deep dive into CENELEC TS 50701 for railway cybersecurity*.
- **Shieldworkz.** (2026). *A deep dive into TS 50701-based risk and security assessment*.
- **Technical Report.** (2025). *Technical Report: Cyber Threat and Vulnerability Analysis for Railway Systems in Alignment with CLC/TS 50701 and IEC 62443*.
- **User Notes.** (2026). *All notes 2/25/2026* (Aggregated project notes / [Project Name] Infrastructure Six-Zone Security Architecture Model). [Project Name].
