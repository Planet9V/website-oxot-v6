---
tags: [iec62443, workpaper, safety-security, convergence]
type: reference
status: converted
---

> [!NOTE]
> **Template Notice**: This document contains worked example data from a completed
> urban rail transit cybersecurity engagement. All client-identifying information has
> been anonymized. The technical analysis is preserved as a reference exemplar.
> Replace all `[Project Name]`-tagged values and project-specific data for your engagement.

# Safety-Security Convergence Matrix

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-TVA_BASIS_001_Safety_Security]] |
| Version | 1.1 DRAFT |
| Date | 2026-03-30 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | DRAFTING |
| Dossier Section | Volume 2: The Evidence |
| Dossier Position | Document 49 of 101 |
| Standards | IEC 62443-3-2:2020; EN CLC/TS 50701:2021; EN 50126-1:2017; EN 50129:2018 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

| Revision | Date | Author | Description |
| --- | --- | --- | --- |
| 1.0 | 2026-03-01 | Jim McKenney | Safety-Security Convergence Matrix — FMECA/RAMS to cyber-physical hazard mapping |
| 1.1 | 2026-03-30 | Jim McKenney | ELS formally reclassified to Zone 1 (SL-T 3) per DRR Items 74/77; BLINDEXIT→BLINDSIDE naming correction |

**TS 50701 §6.3.2 mandate**: "The cybersecurity risk assessment shall consider the safety consequences of cybersecurity incidents, taking into account the results of the safety analysis (e.g., FMECA, Hazard Log, RAMS)." — CENELEC (2021, Clause 6.3.2)

**Operational context**: [Project Name] entered Emergency Operations in January 2026. Practical Completion is scheduled for April 2026. This convergence matrix is an operational safety document, not a pre-approval study.

## 1. Document Purpose

This document is the **primary convergence artefact** for the [Project Name] TVA programme. It provides a unified, source-document-traceable matrix that aligns:

| Safety Domain (EN 50126-1 / TS 50701) | Cybersecurity Domain (IEC 62443-3-2 / ATT&CK ICS) |
| --- | --- |
| FMECA Severity Category (I–IV) | IEC 62443 Impact Category (IC, 1–4) |
| Hazard Log risk rating (consequence × likelihood) | TVA consequence score (1–5) |
| RAMS SIL level (1–4) | IEC 62443 Security Level Target (SL-T, 1–4) |
| MOS threshold (system-specific) | Cyber-safety consequence boundary |
| Safety function per system | MITRE ATT&CK technique(s) that could compromise it |
| SRAC (Safety Related Application Condition) | IEC 62443-3-3 Security Requirement (SR) |
| Hazard Log entry (RPT-800001) | TVA scenario(s) TS-01 through TS-16 |

This alignment satisfies the requirements of TS 50701:2021 Clause 6.3.2, IEC 62443-3-2:2020 §8, and EN 50126-1:2017 RAM interface obligations (CENELEC, 2021; IEC, 2020; CENELEC, 2017).

**Critical finding**: The RSSB Hazard-Based Safety methodology is consequence-centric (what goes wrong). IEC 62443 and MITRE ATT&CK are cause-centric (how it goes wrong). This document bridges those frameworks: MITRE ATT&CK technique → initiating cause → RSSB hazard category → safety consequence. This is the formal TS 50701 §6.3.2 gap that this project addresses (see also §3 of [[ICS-TVA-BASIS-003-Hazard-TVA-Traceability-Register]]).

## 2. [Project Name] System Register (SuC)

The following 20 systems constitute the [Project Name] System under Consideration (SuC), across 6 IEC 62443-3-2 security zones. SL-T values from [Project Name] zone register (sl_target). SIL values from RAMS Plan PLN-800001 ([Stakeholders], 2025c). FMECA coverage from RPT-800009 ([Stakeholders], 2025a).

| Zone | Zone Name | System | Abbr | SL-T | FMECA Coverage | RAMS SIL | MOS Section |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Zone-1 | Life-Safety Systems | Fire Detection & Alarm System | FDAS | 3 | Yes (Fire Protection) | SIL 2 | §11.18–11.19 |
| Zone-1 | Life-Safety Systems | Tunnel Ventilation System | TVS | 3 | Yes (TVS) | SIL 2 | §6.5, §6.18 |
| Zone-1 | Life-Safety Systems | Emergency Lighting System | ELS | 3 | Yes (ELV section) | SIL 2 (CLS) | §5.13 |
| Zone-2 | Security & Surveillance | SCADA / ICS | SCADA | 3 | Yes (ICS) | No formal SIL (safety-critical by consequence) | §12.26–12.27 |
| Zone-2 | Security & Surveillance | Building Management System | BMS | 2–3 | Yes (BMS) | No formal SIL | §12.35–12.36 |
| Zone-2 | Security & Surveillance | Closed-Circuit Television | CCTV | 2 | Yes (Comms/ICS) | N/A | §12.45–12.46 |
| Zone-2 | Security & Surveillance | Passenger Address System | PAS | 2 | No direct FMECA entry | N/A | §12 (PAVA/PA) |
| Zone-2 | Security & Surveillance | Passenger Address & Visual Annunciation | PAVA | 2 | No direct FMECA entry | N/A | §12 (PAVA/PA) |
| Zone-3 | Building Automation | Access Control System | ACS | 2 | No direct FMECA entry | N/A | §12.48 |
| Zone-3 | Building Automation | Environment Control System | ECS | 2 | Yes (HVAC) | N/A | §12.37 |
| Zone-3 | Building Automation | Master Clock System | MCS | 2 | No direct FMECA entry | N/A | N/A |
| Zone-4 | Passenger Services | Passenger Information System | PIS | 2 | No | N/A | N/A |
| Zone-4 | Passenger Services | Ticketing System | TKT | 1 | Yes (Ticketing) | N/A | §5.17 |
| Zone-4 | Passenger Services | IT Network / Corporate LAN | ITN | 1 | No | N/A | N/A |
| Zone-5 | Integration & Control | Maintenance Access | MAI | 2 | No | N/A | N/A |
| Zone-5 | Integration & Control | 3rd-Party VPN/Remote Access | REM | 2 | No | N/A | N/A |
| Zone-6 | External Access | Passenger WiFi | PWF | 1 | No | N/A | N/A |
| Zone-6 | External Access | Public Information Kiosks | PIK | 1 | No | N/A | N/A |
| Shared | Cross-Zone | Communications Network | COMS | 2–3 | Yes (Comms) | No formal SIL | §5.13, §5.15 |
| Shared | Cross-Zone | Signalling / CBTC | SIG | 3 | Yes (Signalling) | SIL 2+ | §4 (MOS) |

**FMECA SCIL summary** (RPT-800009, Table 13): FDAS SCIL=2 | TVS SCIL=0 (fail-safe, RCIL=11) | Stair Pressurisation SCIL=3 | Signalling SCIL=10/RCIL=2 | BMS SCIL=0/RCIL=0. TVS SCIL=0 reflects fail-safe design per EN 50129 B.3.1; consequence derives from RCIL and Hazard Log.

## 3. Convergence Framework

### 3.1 Safety-to-Security Level Mapping

The following framework maps safety engineering classifications to cybersecurity security levels. Detailed SL-T derivation workings in [[ICS-TVA-BASIS-004-SIL-SLT-Calibration-Record]].

| Safety Classification | Standard | Maps To | Security Classification | Standard |
| --- | --- | --- | --- | --- |
| Severity Cat I (Catastrophic) | EN 50126-1 | → | IC = 4 | IEC 62443-3-2 §8.4.1 |
| Severity Cat II (Critical) | EN 50126-1 | → | IC = 3 | IEC 62443-3-2 §8.4.1 |
| Severity Cat III (Marginal) | EN 50126-1 | → | IC = 2 | IEC 62443-3-2 §8.4.1 |
| Severity Cat IV (Insignificant) | EN 50126-1 | → | IC = 1 | IEC 62443-3-2 §8.4.1 |
| SIL 3–4 | EN 50129 | → | SL-T 3–4 | IEC 62443-3-2 §8.4.3 |
| SIL 2 | EN 50129 | → | SL-T 2–3 | IEC 62443-3-2 §8.4.3 |
| SIL 1 | EN 50129 | → | SL-T 1–2 | IEC 62443-3-2 §8.4.3 |
| Below MOS threshold | PRO-800001 | → | Consequence = 5 (Catastrophic TVA) | TVA programme convention |
| Degraded operation (within MOS) | PRO-800001 | → | Consequence = 3–4 (High TVA) | TVA programme convention |
| Normal degradation | ConOps | → | Consequence = 1–2 (Low-Medium TVA) | TVA programme convention |

### 3.2 Hazard Log Risk Matrix → TVA Scoring

The Hazard Log risk matrix (consequence × likelihood) maps to TVA scoring as follows. Calibrated from S25-HazardLog-Extract.md Sections B–D ([Stakeholders], 2025b).

| Hazard Log Consequence | Hazard Log Likelihood | Risk Score | TVA Consequence (1–5) | TVA Likelihood (1–5) |
| --- | --- | --- | --- | --- |
| Catastrophic (EqF 10) | Frequent | 10 | 5 | 5 |
| Catastrophic | Probable | 9 | 5 | 4 |
| Catastrophic / Critical | Occasional / Probable | 8 | 5 / 4 | 3 / 4 |
| Critical | Occasional | 7 | 4 | 3 |
| Major / Critical | Probable / Occasional | 6–7 | 3–4 | 3–4 |
| Major | Remote | 5 | 3 | 2 |
| Minor | Occasional | 4 | 2 | 3 |
| Minor | Remote | 3 | 2 | 2 |
| Minor | Rare | 2 | 2 | 1 |
| No Effect | Any | 0 | 1 | — |

**Key TVA risk scores** (from S25-HazardLog-Extract.md §D): APT disabling TVS during tunnel fire = 8 (Orange–ALARP upper); Ransomware disabling FDAS = 9 (Red–Intolerable); BMS manipulation + FDAS suppression = 8 (Orange); PAVA DoS during evacuation = 8 (Orange); Signalling interference = 7 (Orange).

### 3.3 MITRE ATT&CK for ICS — Safety System Attack Vectors

Key MITRE ATT&CK for ICS v14 (MITRE Corporation, 2023) techniques relevant to safety system compromise, matched against FMECA failure modes per [[ICS-TVA-BASIS-002-FMECA-MITRE-Mapping-Register]]:

| Technique ID | Technique Name | Safety System Impact | FMECA Failure Mode Type |
| --- | --- | --- | --- |
| T0800 | Activate Firmware Update Mode | Firmware corruption → system unavailability | Loss of function |
| T0803 | Block Command Message | Control signal denial → loss of safety function | Loss of control |
| T0804 | Block Reporting Message | Sensor data suppression → undetected hazard | Loss of monitoring |
| T0806 | Brute Force I/O | False sensor injection → incorrect system response | Spurious operation |
| T0809 | Data Destruction | Log/config destruction → unrecoverable state | Loss of function |
| T0813 | Denial of Control | Loss of operator control → inability to respond | Loss of control |
| T0814 | Denial of Service | System unavailability → safety function unavailable | Unavailability |
| T0816 | Device Restart/Shutdown | Forced restart → transient loss of safety function | Loss of function |
| T0821 | Modify Controller Tasking | Scheduled task manipulation → missed safety checks | Loss of integrity |
| T0828 | Loss of Safety | Direct SIS manipulation | Loss of safety function |
| T0831 | Manipulation of Control | Process variable manipulation | Spurious/incorrect output |
| T0832 | Manipulation of View | HMI/SCADA display falsification | Loss of monitoring |
| T0835 | Manipulate I/O Image | PLC I/O register manipulation | Incorrect field device response |
| T0836 | Modify Parameter | Setpoint/threshold manipulation | Incorrect system behaviour |
| T0843 | Program Download | Logic modification → persistent compromise | Loss of integrity |
| T0855 | Unauthorized Command Message | Spurious commands → unintended system response | Spurious operation |
| T0858 | Change Credential | Credential modification → lockout | Loss of availability |

## 4. Zone-by-Zone Safety-Security Convergence Matrix

### 4.1 Zone-1: Life-Safety Systems

**Zone description**: Safety-critical systems with highest SL-T (3). FDAS (SIL 2), TVS (SIL 2), Emergency Lighting (CLS). Any compromise has potential for immediate life-safety consequence. IC = 4, AC = 4 per [[ICS-TVA-BASIS-004-SIL-SLT-Calibration-Record]] §5.1.

#### 4.1.1 FDAS — Fire Detection and Alarm System

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category I — Catastrophic (SCIL=2: FAP FD-07 + FAP FD-08 signal failure → undetected fire) | IC = 4 — Catastrophic consequence mandatory; SIL 2 consistent with IC 3–4 range | RPT-800009 ([Stakeholders], 2025a) |
| FMECA SCIL Items | ST-SCIL-FD-01: Main FAP (FD-07, F220FS) — fail to transmit signal; ST-SCIL-FD-01: Secondary FAP (FD-08, F220FS) — fail to transmit signal. Both FAPs share ICS/BMS network pathway | Both SCIL items share REQ_DESIGN_FPS07 attack surface — T0804 suppresses FAP signal; T0814 causes FAP unavailability | RPT-800009 ([Stakeholders], 2025a) |
| RAMS SIL | SIL 2 (confirmed — PLN-800001) | SL-T contribution: IC 4 + AC 4 − 1 = 7, capped → SL-T 3 | PLN-800001 ([Stakeholders], 2025c) |
| MOS Threshold | Single FAP failure (§11.18): Fire Watchpersons deployed; no station closure. Both FAPs failure (§11.19):Suspend services at affected [Project Name] station. FAP has 24-hour battery backup [REQ_DESIGN_FPS15] | Cyber-equivalent: T0804 suppressing FAP signals OR T0814 DoS on FAP network = Both-FAP threshold breach → service suspension | PRO-800001 ([Stakeholders], 2025e) |
| Primary Safety Function | Fire detection → alarm routing → suppression trigger → evacuation initiation | T0828 (Loss of Safety), T0804 (Block Reporting), T0814 (DoS), T0832 (Manipulation of View) | FMECA + ATT&CK ICS v14 |
| Hazard Log Entries | Hz-F01-02-006 (false state display → incorrect emergency response); Hz-F01-02-008 (evacuation failure — B22); Hz-F01-04-002 (evacuation failure variant — B22). Category C (Fire, 18 open) | Consequence: Catastrophic (TVA 5) — FDAS suppression during active fire. Risk score: 9 (Red — Intolerable) per Hazard Log matrix | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-07 (FDAS/TVS direct safety system manipulation), TS-13 (BLINDSIDE — coordinated egress disruption) | TVA-SCN-TS07, TS13 |
| IEC 62443-3-3 SR | — | SR 7.1 SL 3 (DoS protection); SR 2.1 SL 3 (Authorization enforcement); SR 3.1 SL 3 (Comms integrity); SR 3.3 SL 2 (Security verify) | IEC (2013) |
| SRACs | CM480161 (flashing beacon — ICS-independent alerting for FAP DoS); CM480158 (floor plans in SCR/FCR — display failure compensating control) | Both SRACs provide compensating controls if FDAS/ICS is compromised. SRAC integrity is ICS-dependent for the beacon trigger — see §5 | RPT-800001 ([Stakeholders], 2025b) |
| SL-T (Zone-1) | — | 3 (IC 4 + AC 4 − 1 = 7, programme cap applied) | [Project Name] zone register (sl_target) |

#### 4.1.2 TVS — Tunnel Ventilation System

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category I — Catastrophic (SCIL=0 fail-safe design; RCIL=11 — dual TVF/damper failure → unsafe tenable conditions). TVS fail-safe: loss of control = safe state. Consequence derives from RCIL + Hazard Log | IC = 4 — Hazard Log confirms Catastrophic: Dual TVF failure or 2+ damper failure triggers tunnel suspension; active fire without TVS smoke extraction = multiple fatalities potential | RPT-800009 ([Stakeholders], 2025a) |
| FMECA RCIL Items | 11 RCIL items: dual TVF failure (same shaft), dual+ damper module failure, RCC failure — all produce "TVS cannot maintain safe tenable conditions" in MOS. SCIL=0 reflects fail-safe design but not absence of safety-critical consequence | Attacker does not need to defeat fail-safe — attacker can send active commands (T0855 Unauthorised Command, T0831 Manipulation of Control) to force fans OFF or dampers CLOSED during fire event | RPT-800009 ([Stakeholders], 2025a) |
| RAMS SIL | SIL 2 (confirmed — PLN-800001) | SL-T 3 — same Zone-1 derivation as FDAS | PLN-800001 ([Stakeholders], 2025c) |
| MOS Threshold | Dual TVF (duty + standby, same shaft) failure (§6.18):Suspend services through [Project Name] tunnels. Two or more damper modules (same shaft) fail (§6.19): Suspend services. RCC failure with smoke extraction compromised (§6.12): rectify within 1 hour; if not resolved → suspend services. OPC Server failure (§6.5): no suspension; enhanced monitoring only | Cyber-equivalent: T0813 Denial of Control to TVS fans = §6.18 threshold; T0855 commanding dampers closed = §6.19 threshold; T0814 DoS on TVS SCADA = §6.5 threshold (lower impact but maintains attacker foothold) | PRO-800001 ([Stakeholders], 2025e) |
| Primary Safety Function | Tunnel air quality; smoke extraction in fire event; congested-mode fan management; emergency mode for fire scenarios | T0813 (Denial of Control), T0831 (Manipulation of Control), T0855 (Unauthorised Command), T0814 (DoS), T0836 (Modify Parameter — setpoint/threshold) | FMECA + ATT&CK ICS v14 |
| Hazard Log Entries | Hz-F01-02-008 (evacuation failure — B22 new); Hz-F01-04-002 (evacuation failure variant — B22 new); Hz-P series (Infrastructure Failure, 12 open — TVS in infrastructure category). Category C (Fire), Category K (Hazardous substance) | Consequence: Catastrophic (TVA 5) — TVS manipulation during tunnel fire preventing smoke extraction. Risk score: 8 (Orange — ALARP upper): APT disabling TVS during fire = score 8 | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-07 (FDAS/TVS safety system — direct Zone-1 attack), TS-08 (TUNNELSNAKE — tunnel ventilation compromise) | TVA-SCN-TS07, TS08 |
| IEC 62443-3-3 SR | — | SR 7.1 SL 3 (DoS protection); SR 5.1 SL 3 (Network segmentation); SR 3.3 SL 2 (Security verify); SR 3.1 SL 3 (Comms integrity) | IEC (2013) |
| SRACs | CM480161 (flashing beacon — ICS-independent alerting, compensating if TVS status goes dark) | TVS HMI failure compensated by TVS-dedicated HMI fallback (SCR, local PLC control per §6.4); flashing beacon provides human alerting independent of TVS status display | RPT-800001 ([Stakeholders], 2025b) |
| SL-T (Zone-1) | — | 3 | [Project Name] zone register (sl_target) |

#### 4.1.3 ELS — Emergency Lighting System

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category II — Critical (ELV section: emergency egress lighting failure during power loss → inability to evacuate safely; not directly Catastrophic as backup routes exist, but Major to Critical for trapped passengers) | IC = 3 — Critical consequence; aligned with Zone-1 SL-T 3 assignment as ELS is Critical Life Safety (CLS) power class per MOS §5 | RPT-800009 ([Stakeholders], 2025a) |
| RAMS SIL | SIL 2 — CLS power classification; associated LCS PLCs are SIL-rated equipment per MOS §12.39 | SL-T contribution: assigned to Zone-1 per ISA DRR Items 74/77; CLS power classification confirms life-safety function | PLN-800001 ([Stakeholders], 2025c) |
| MOS Threshold | LV CLS DB failure for CER power (§5.13):Suspend services through [Project Name] tunnels. LCS PLC failure (§12.39): beacons remain in current state; no suspension. DALI sensors fail (§12.42): lights default to 100% ON [REQ_DESIGN_03] | Cyber-equivalent: T0813 Denial of Control to LCS PLCs = lights to current state (potential dark if attacker pre-set); T0814 DoS on CLS DB = §5.13 tunnel suspension threshold | PRO-800001 ([Stakeholders], 2025e) |
| Primary Safety Function | Egress lighting during power failure / emergency; DALI default-ON fail-safe design | T0814 (DoS — CLS power supply compromise), T0803 (Block Command — LCS PLC), T0813 (Denial of Control) | FMECA + ATT&CK ICS v14 |
| Hazard Log Entries | Hz-F01-02-006 (controller error from false state — loss of lighting display integrity); Category F (Evacuation, 84 open) — ELS failure during evacuation | Consequence: Critical to Catastrophic (TVA 4–5) — ELS failure during fire evacuation in tunnel. Risk score: 7–8 (Orange) | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-13 (BLINDSIDE — coordinated attack including ELS as egress disruption component) | TVA-SCN-TS13 |
| IEC 62443-3-3 SR | — | SR 7.1 SL 3 (DoS protection); SR 7.6 SL 2 (Network config); SR 3.1 SL 2 (Comms integrity) | IEC (2013) |
| SL-T (Zone-1) | — | 3 | [Project Name] zone register (sl_target) |

### 4.2 Zone-2: Security & Surveillance Systems

**Zone description**: Operational technology core — SCADA, BMS, CCTV, PAS, PAVA. SL-T 2–3 (SCADA/BMS warrant SL-T 3; CCTV, PAS, PAVA warrant SL-T 2). No formal SIL for Zone-2 systems, but safety-critical by consequence. IC = 3–4, AC = 3–4 per [[ICS-TVA-BASIS-004-SIL-SLT-Calibration-Record]] §5.2.

#### 4.2.1 SCADA / ICS

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category I–II — Catastrophic to Critical (ICS section RCIL=2: availability consequence; ICS failure → loss of supervisory control during emergency → Catastrophic if compounded with Zone-1 failure) | IC = 3–4 (IC 4 when SCADA attack pivots to TVS/FDAS commands; IC 3 standalone SCADA compromise) | RPT-800009 ([Stakeholders], 2025a) |
| RAMS SIL | No formal SIL — safety-critical by consequence (Hazard Log confirms Critical consequence for SCADA HMI manipulation: risk score 7, Orange) | SL-T 3 for SCADA/ICS attack chains that can pivot to Zone-1 system commands | PLN-800001 ([Stakeholders], 2025c) |
| MOS Threshold | ICS Primary Server failure with failover (§12.26): no impact. ICS Primary Server failure without failover (§12.27):control transfers to SCRs — Station Controllers lose [Primary Control Centre] visibility across all [Project Name] stations and tunnels simultaneously. MTTR = 2 hours | Cyber-equivalent: T0814 DoS on ICS Virtual Servers = §12.27 threshold; T0832 Manipulation of View on SCADA HMI = operator makes incorrect decisions without triggering MOS suspension threshold | PRO-800001 ([Stakeholders], 2025e) |
| Primary Safety Function | Plant control, process monitoring, supervisory; ICS controls TVS, FDAS interface, BMS, CCTV, ACID/SAMS, PAVA, PIDS, ticketing | T0832 (Manipulation of View — HMI false state), T0845 (Program Upload), T0831 (Manipulation of Control), T0836 (Modify Parameter) | FMECA + ATT&CK ICS v14 |
| Hazard Log Entries | Hz-M01-01-001 + Hz-M02-01-001 (maintenance safety — false ICS state data); Hz-E07-01-001 + Hz-E08-01-001 (BMS alert suppression via ICS). SCADA HMI manipulation risk score = 7 (Orange) | Consequence: Critical–Catastrophic (TVA 4–5 for SCADA-to-Zone-1 pivot). Risk: 7–8 Orange | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-01 (Rhysida-NZ ransomware OT reach), TS-02 (FrostyGoop BMS/ICS), TS-12 (DARKOPERATOR SCADA HMI manipulation) | TVA-SCN-TS01, TS02, TS12 |
| IEC 62443-3-3 SR | — | SR 1.1 SL 3 (Authentication); SR 2.1 SL 3 (Authorization); SR 5.1 SL 3 (Segmentation); SR 5.2 SL 3 (Boundary protection); SR 3.3 SL 2 (Security verify) | IEC (2013) |
| SRACs | CM498737 (maintenance safety — entire SRAC depends on ICS state integrity); CM480156 (alarm priority naming — ICS must present correct alarm sequence); CM480158 (floor plans in SCR/FCR — display failure compensating control) | All three SRACs have direct ICS dependency. Compromise of SCADA/ICS state display undermines all three. | RPT-800001 ([Stakeholders], 2025b) |
| SL-T (Zone-2) | — | 3 for SCADA/ICS; 2 for operative zone value in [Project Name] zone register (sl_target) — SCADA/ICS implementers apply SL-T 3 per BASIS-004 §5.2 note | [Project Name] zone register (sl_target) |

#### 4.2.2 BMS — Building Management System

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category III — Marginal (BMS SCIL=0, RCIL=0; indirect effects only via HVAC state). BMS manipulation can affect HVAC and fire suppression integration (risk score 8 for BMS + FDAS suppression combined attack) | IC = 2–3 (IC 3 for BMS-to-FDAS attack chain; IC 2 standalone HVAC manipulation) | RPT-800009 ([Stakeholders], 2025a) |
| RAMS SIL | No formal SIL — BMS SCIL/RCIL both 0 per FMECA. Safety-relevant through integration with FLS (fire hydrant/sprinkler monitoring via BMS Point Server) | SL-T 2–3 — BMS warrants SL-T 3 where it interfaces with fire suppression systems | PLN-800001 ([Stakeholders], 2025c) |
| MOS Threshold | Single BMS Point Server failure (§12.35): loss of ICS control to ECS/LCS at one station end; MTTR 2 hours; no suspension. Both BMS Point Servers failure (§12.36): loss of entire-station HVAC/Lighting ICS control; MTTR 2 hours; no suspension. Architecture: VMRestore to last known best configuration | Cyber-equivalent: T0831 (Modbus/BACnet parameter manipulation) = BMS Point Server failure without triggering MOS suspension — creates 2-hour blind spot. T0836 (Modify Parameter — HVAC setpoints) operates silently below MOS threshold | PRO-800001 ([Stakeholders], 2025e) |
| Primary Safety Function | HVAC control; environmental monitoring; fire hydrant and sprinkler monitoring; integration with FLS; Honeywell EBI SCADA platform | T0836 (Modify Parameter — HVAC setpoints), T0831 (Manipulation of Control — Modbus/BACnet), T0832 (Manipulation of View — BMS display falsification) | FMECA + ATT&CK ICS v14 |
| Hazard Log Entries | Hz-E07-01-001 (BMS alert suppression → touch voltage at station); Hz-E08-01-001 (BMS alert suppression → touch voltage at bridge); Hz-M01-01-001 + Hz-M02-01-001 (maintenance safety dependent on correct BMS state). BMS manipulation + FDAS suppression combined risk = 8 (Orange) | Consequence: Critical (TVA 4) standalone BMS. FrostyGoop Modbus TCP vector directly applicable (Dragos, 2024) | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-02 (FrostyGoop/BMS — Modbus protocol injection), TS-04 (KEYHOLDER/BACnet — ACS-BMS network), TS-12 (DARKOPERATOR) | TVA-SCN-TS02, TS04, TS12 |
| IEC 62443-3-3 SR | — | SR 3.1 SL 2 (Comms integrity — Modbus/BACnet); SR 3.3 SL 2 (Security verify); SR 4.1 SL 2 (Confidentiality — config data) | IEC (2013) |
| SRACs | CM498737 (maintenance safety — BMS/ICS state integrity essential for maintenance coordination); CM480156 (alarm priority — BMS alarm sequence integrity) | CM498737 is the most direct SRAC-cybersecurity dependency in the Hazard Log. T0832, T0831, T0836 are primary techniques undermining it. | RPT-800001 ([Stakeholders], 2025b) |
| SL-T (Zone-2) | — | 2–3 (SL-T 3 for fire system integration interfaces; SL-T 2 operative zone value) | [Project Name] zone register (sl_target) |

#### 4.2.3 CCTV / Surveillance

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category II–III — Critical to Marginal (CCTV failure → inability to detect physical intrusion or monitor evacuation; enabling hazard rather than direct safety function) | IC = 2–3 (IC 3 when CCTV failure enables physical access to safety-critical areas via Hz-J03-04-006; IC 2 standalone surveillance loss) | RPT-800009 ([Stakeholders], 2025a) |
| MOS Threshold | CCTV Server failure (§12.46): no effect — hot standby available; automatic failover. FLIR PTD Camera failure (§12.45): deploy staff patrol; no tunnel closure | Cyber-equivalent: T0832 (Manipulation of View — CCTV feed) = no MOS threshold breach but enables physical attack by removing detection layer (CM476059 undermined) | PRO-800001 ([Stakeholders], 2025e) |
| Primary Safety Function | Station security monitoring; incident detection; PTD (Platform-to-Track Detection) via FLIR thermal cameras at [STN-C]/[STN-D] | T0832 (Manipulation of View), T0814 (DoS — CCTV server), T0809 (Data Destruction — recording server) | FMECA + ATT&CK ICS v14 |
| Hazard Log Entries | Hz-J03-04-006 (unauthorised access to X-beams — CCTV monitoring is primary detection); Hz-H01 series (terrorism/assault — CCTV enables detection). Category J (Fall, 70 open) | Consequence: Critical (TVA 4) — CCTV suppression enabling physical access. Risk score: 7 (Orange) for CCTV-enabled access attack | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-05 (RAILSTORM — CCTV suppression as harassment enabler), TS-06 (Volt Typhoon — CCTV as pre-positioning element), TS-09 (Passenger system), TS-13 (BLINDSIDE) | TVA-SCN-TS05, TS06, TS09, TS13 |
| IEC 62443-3-3 SR | — | SR 1.1 SL 2 (Authentication); SR 2.1 SL 2 (Authorization); SR 6.1 SL 2 (Audit log — recording integrity) | IEC (2013) |
| SRACs | CM476059 (X-beam monitoring — CCTV and ICS monitoring of structural access; cyber-dependent: T0832 undermines it) | CM476059 is directly dependent on CCTV feed integrity. SR 6.1 (audit log) and SR 2.1 (authorisation) are primary cyber countermeasures. | RPT-800001 ([Stakeholders], 2025b) |
| SL-T (Zone-2) | — | 2 | [Project Name] zone register (sl_target) |

#### 4.2.4 PAS — Passenger Address System

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category II — Critical (PAS/PA failure during emergency = inability to direct evacuation → single fatality potential from crowd management failure) | IC = 3 — Critical consequence; PAVA/PA DoS during evacuation = risk score 8 (Orange) | No direct FMECA entry; consequence from Hazard Log |
| Primary Safety Function | Emergency announcements; evacuation instruction; automated PA on train [ConOps Functional Model] | T0814 (DoS — PA system), T0803 (Block Command — PA trigger), T0831 (Manipulation of Control — false announcements) | ATT&CK ICS v14; ConOps RPT-800000 |
| Hazard Log Entries | Hz-F01-01-008 (PAVA intelligibility failure); Hz-F01-02-002 (delayed evacuation); Hz-F01-03-006 (evacuation signal failure); Hz-F01-04-001 (automated PA on train). PAVA/PA DoS risk score: 8 (Orange) | Consequence: Critical (TVA 4) | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-09 (Passenger system), TS-13 (BLINDSIDE — PAVA silenced as part of coordinated egress attack) | TVA-SCN-TS09, TS13 |
| IEC 62443-3-3 SR | — | SR 7.1 SL 2 (DoS protection); SR 3.1 SL 2 (Comms integrity) | IEC (2013) |
| SRACs | CM480161 (flashing beacon — ICS-independent alerting, compensates if PAS/PAVA compromised); CM491719 (evacuation route posters on trains — PIS/PAS failure compensating control) | Both SRACs are explicitly designed to compensate for cyber-induced PAS/PAVA failure (DoS or availability attack). | RPT-800001 ([Stakeholders], 2025b) |
| SL-T (Zone-2) | — | 2 | [Project Name] zone register (sl_target) |

#### 4.2.5 PAVA — Passenger Address and Visual Annunciation

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category II — Critical (PAVA display failure during emergency = inability to direct evacuation visually, compounding PAS audio failure) | IC = 3 — Critical consequence; combined PAS + PAVA failure during evacuation: risk score 8 (Orange) | No direct FMECA entry; consequence from Hazard Log |
| Primary Safety Function | Emergency visual displays; evacuation signage; combined with PAS for multimodal emergency communication | T0832 (Manipulation of View — PAVA displays), T0814 (DoS), T0831 (false visual messages) | ATT&CK ICS v14 |
| Hazard Log Entries | Hz-F01-01-008 (PAVA intelligibility); Hz-F01-02-002 (delayed evacuation — PAVA component); Hz-F01-03-007 (evacuation signal sequence) | Consequence: Critical (TVA 4). Same hazard basis as PAS. | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-09 (Passenger system), TS-13 (BLINDSIDE), TS-05 (RAILSTORM — PAVA DoS during hacktivist attack) | TVA-SCN-TS09, TS13, TS05 |
| IEC 62443-3-3 SR | — | SR 7.1 SL 2 (DoS protection); SR 3.1 SL 2 (Comms integrity) | IEC (2013) |
| SL-T (Zone-2) | — | 2 | [Project Name] zone register (sl_target) |

### 4.3 Zone-3: Building Automation Systems

**Zone description**: Extended OT — ACS, ECS, Master Clock. SL-T 2. No formal SIL designations. IC = 2–3 (ACS upper bound = 3 driven by MAD zone access hazard entries). AC = 2–3 per [[ICS-TVA-BASIS-004-SIL-SLT-Calibration-Record]] §5.3.

#### 4.3.1 ACS — Access Control System

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category II — Critical (ACS failure enabling unauthorised access to MAD zones → electric shock fatality; Hz-E03-04-001) | IC = 3 — Critical consequence; ACS is the primary Zone-3 IC driver | No direct FMECA entry; consequence from Hazard Log |
| MOS Threshold | PEG Hinge Switch failure (§12.48): tunnel beacons activate; trains at restricted speed; Operator deploys PTD Maintenance Mode via ICS. Cyber-relevant: ACS can be manipulated to suppress the switch failure signal | T0858 (Change Credential — ACS lockout); T0813 (Denial of Control — gate commands); BACnet protocol manipulation (TS-04 KEYHOLDER) | PRO-800001 ([Stakeholders], 2025e) |
| Primary Safety Function | Controlled access to safety-critical areas including MAD zones and electrical rooms | T0858 (Change Credential — ACS lockout or unwanted access), T0813 (Denial of Control — gate open/close commands) | ATT&CK ICS v14 |
| Hazard Log Entries | Hz-J03-04-006 (unauthorised access to X-beams via ACS failure); Hz-E03-04-001 (MAD zone access → electric shock → Critical). Both are Named Hazard Log entries | Consequence: Critical (TVA 4) — ACS compromise enabling MAD zone access. Risk score: 7 (Orange) | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-04 (KEYHOLDER — insider BACnet lockout), TS-06 (Volt Typhoon — pre-positioning via ACS), TS-13 (BLINDSIDE — ACS gates locked during evacuation) | TVA-SCN-TS04, TS06, TS13 |
| IEC 62443-3-3 SR | — | SR 1.1 SL 2 (Authentication); SR 1.3 SL 2 (Account management); SR 2.1 SL 2 (Authorization enforcement) | IEC (2013) |
| SRACs | CM480160 (PPE signage on plantroom doors — physical safety even if ACS compromised); CM480159 (operational training — staff recognise ACS anomalies) | CM480160: physical compensating control for ACS failure. CM480159: human detection layer for ACS credential manipulation. | RPT-800001 ([Stakeholders], 2025b) |
| SL-T (Zone-3) | — | 2 | [Project Name] zone register (sl_target) |

#### 4.3.2 ECS — Environment Control System

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category III — Marginal (HVAC section; ECS failure causing heat/humidity stress in station environments — Major at most in normal operating conditions; excludes TVS tunnel emergency ventilation) | IC = 2 — Major consequence in isolation | RPT-800009 ([Stakeholders], 2025a) |
| MOS Threshold | ECS Controller failure (§12.37): connected equipment operates standalone at local control; automatic failover to backup plant. No service suspension trigger for standalone ECS failure | T0836 (Modify Parameter — HVAC setpoints) operates silently below MOS threshold; can degrade air quality over time without triggering suspension | PRO-800001 ([Stakeholders], 2025e) |
| Primary Safety Function | Temperature/humidity control; non-emergency ventilation; sump pump control; fire hydrant/sprinkler monitoring via BMS Point Server | T0836 (Modify Parameter — HVAC setpoints), T0831 (Manipulation of Control) | ATT&CK ICS v14 |
| TVA Scenarios | — | TS-08 (TUNNELSNAKE — tunnel ventilation; ECS as BMS sub-system), TS-02 (FrostyGoop BMS/ECS interface) | TVA-SCN-TS08, TS02 |
| IEC 62443-3-3 SR | — | SR 5.1 SL 2 (Network segmentation); SR 3.1 SL 2 (Comms integrity) | IEC (2013) |
| SL-T (Zone-3) | — | 2 | [Project Name] zone register (sl_target) |

#### 4.3.3 MCS — Master Clock System

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category III — Marginal (time sync failure → audit log corruption; SCADA event correlation errors; not a direct safety consequence but degrades forensic capability and signalling sync) | IC = 2 — Marginal consequence; NTP-based time injection attacks within hacktivist to organised crime capability | No direct FMECA entry |
| Primary Safety Function | Time synchronisation for safety-critical system logs; signalling event correlation; SCADA audit trail integrity | T0836 (Modify Parameter — NTP manipulation), T0814 (DoS — time sync unavailability) | ATT&CK ICS v14 |
| TVA Scenarios | — | TS-10 (GHOST-RAIL — comms/time sync disruption as part of coordinated attack) | TVA-SCN-TS10 |
| IEC 62443-3-3 SR | — | SR 3.1 SL 2 (Comms integrity — NTP integrity); SR 7.6 SL 2 (Network config) | IEC (2013) |
| SL-T (Zone-3) | — | 2 | [Project Name] zone register (sl_target) |

### 4.4 Zone-4: Passenger Services Systems

**Zone description**: Enterprise-facing systems — PIS, Ticketing, IT Network. SL-T 1–2. No safety function in isolation; primary cyber relevance as lateral movement pathway into OT zones and supply chain entry point. IC = 1–2, AC = 2–3 per [[ICS-TVA-BASIS-004-SIL-SLT-Calibration-Record]] §5.4.

| System | Abbr | FMECA Severity | Primary Cyber Relevance | TVA Scenarios | SL-T |
| --- | --- | --- | --- | --- | --- |
| Passenger Information System | PIS | Cat IV — Insignificant | Passenger wayfinding; no direct safety function; supply chain pivot | TS-09 (Passenger system) | 2 |
| Ticketing System | TKT | Cat III–IV — Marginal | Revenue; supply chain entry; gates auto-open on power loss (§5.17 — fail-safe) | TS-03 (CHAINLINK) | 1 |
| IT Network / LAN | ITN | Cat III — Marginal (as direct consequence; Critical as IT/OT boundary pivot enabler) | IT/OT boundary — lateral movement pivot to Zone-2/Zone-1 | TS-01, TS-03, TS-06 | 1 |

**Key finding**: IT Network IC = 2 (elevated above IC 1 because IT Network compromise is the proximate enabler for IT/OT boundary crossing in TS-01 Ransomware and TS-03 CHAINLINK). Operative zone SL-T = 2 for IT Network ([Project Name] zone register sl_target = 2); PIS/Ticketing sub-zone SL-T = 1.

### 4.5 Zone-5: Integration & Control Access

**Zone description**: Maintenance Access (MAI) and 3rd-Party VPN (REM). IC = 3, AC = 3, SL-T = 2. Access pathway zone: consequence of compromise derives from target zone accessed through Zone-5. Supply chain (TS-03 CHAINLINK) and APT pre-positioning (TS-06, TS-16) both leverage Zone-5 as entry vector per [[ICS-TVA-BASIS-004-SIL-SLT-Calibration-Record]] §5.5.

| System | Abbr | IC (via pivot) | AC | Primary Cyber Relevance | TVA Scenarios | SL-T |
| --- | --- | --- | --- | --- | --- | --- |
| Maintenance Access | MAI | 3 (via Zone-2 pivot) | 3 | Privileged vendor access — supply chain and insider threat; physical-cyber convergence | TS-03 (CHAINLINK), TS-04 (KEYHOLDER) | 2 |
| 3rd-Party VPN | REM | 3 (via Zone-2 pivot) | 3 | Remote access — initial access vector for nation-state APT; VPN credential abuse | TS-06 (Volt Typhoon), TS-16 (VOLTZITE-RAIL) | 2 |

### 4.6 Zone-6: External Access

**Zone description**: Passenger WiFi (PWF) and Public Information Kiosks (PIK). IC = 1, AC = 1–2, SL-T = 1. No safety function. Properly segmented from OT network per [Project Name] zone and conduit model. Primary threat: hacktivist DDoS (TS-05 RAILSTORM) and opportunistic. Per [[ICS-TVA-BASIS-004-SIL-SLT-Calibration-Record]] §5.6.

| System | Abbr | FMECA Severity | Primary Cyber Relevance | TVA Scenarios | SL-T |
| --- | --- | --- | --- | --- | --- |
| Passenger WiFi | PWF | Cat IV — Insignificant | Public-facing DDoS surface; pivot potential if mis-segmented from Zone-5 | TS-05 (RAILSTORM), TS-11 (DEADZONE) | 1 |
| Public Kiosks | PIK | Cat IV — Insignificant | Malware insertion vector; passenger misinformation; opportunistic exploit | TS-09 (Passenger system) | 1 |

### 4.7 Cross-Zone Systems

#### 4.7.1 COMS — Communications Network

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category II — Critical (RCIL=2 — availability consequence; Communications subsystem FMECA covers CBN, PAVA, PIDS, Radio). LV CLS DB failure for CER (§5.13):Suspend services through [Project Name] tunnels | IC = 3 (Critical — COMS failure affects emergency alerting across all zones simultaneously); CLS power failure to CER = tunnel suspension threshold | RPT-800009 ([Stakeholders], 2025a) |
| MOS Threshold | LV CLS DB failure for CER (§5.13): tunnel suspension immediately. LV CLS DB failure for radio coverage (§5.15): tunnel suspension. CBN carries ICS, CCTV, ACID, PAVA, PIDS, Clocks, BMS, Wi-Fi simultaneously — single point disruption affects all | T0814 (DoS on CBN) = potential §5.13 threshold breach; RF jamming (T0836/T0835 analogues for radio) = §5.15 threshold | PRO-800001 ([Stakeholders], 2025e) |
| Primary Safety Function | Carries safety-critical data (FDAS alarms, TVS status, signalling, ICS commands, emergency radio) across [Project Name] stations and tunnels | T0814 (DoS), T0855 (Unauthorized Command Message), T0803 (Block Command Message) | ATT&CK ICS v14 |
| Hazard Log Entries | Hz-F01-03-006 (evacuation signal failure — COMS dependency); Hz-F01-04-001 (automated PA on train — COMS dependency). Comms DoS risk score: 7 (Orange — ALARP upper) | Consequence: Critical–Catastrophic (TVA 4–5 during emergency). Risk: 7–8 | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-10 (GHOST-RAIL — comms disruption), TS-05 (RAILSTORM — RF jamming + DDoS), TS-11 (DEADZONE — wireless/WLAN) | TVA-SCN-TS10, TS05, TS11 |
| IEC 62443-3-3 SR | — | SR 3.1 SL 3 (Comms integrity); SR 7.1 SL 3 (DoS protection); SR 5.2 SL 3 (Zone boundary protection) | IEC (2013) |
| SRACs | CM491719 (evacuation posters on trains — PIS/PAVA failure compensating control; explicitly ICS-independent); CM480161 (flashing beacon — independent of COMS) | Both SRACs are designed to compensate when COMS-dependent systems (PAVA, PIS, PAS) fail. ICS-independence is the key cyber-resilience feature. | RPT-800001 ([Stakeholders], 2025b) |
| SL-T | — | 2–3 (varies by zone segment; CBN SL-T 3 where carrying Zone-1 safety data) | [Project Name] zone register (sl_target) |

#### 4.7.2 SIG — Signalling / CBTC

| Attribute | Safety Domain | Cybersecurity Domain | Source |
| --- | --- | --- | --- |
| FMECA Severity | Category I — Catastrophic (SCIL=10, RCIL=2: Signalling section includes FAdC05/06/07 Axle Counters, WR04/06/09/10 Processor Cards, PM01/02 Point Machines, ESP01/02 Emergency Stop Plungers) | IC = 4 — Catastrophic consequence: signalling manipulation → collision or derailment | RPT-800009 ([Stakeholders], 2025a) |
| FMECA SCIL Key Items | WR04 Processor Card (PM) — interlocking ladder logic in modifiable flash →T0843 primary target. FAdC05 AEB Axle Counter — false track clear/occupied → T0855. PM01/PM02 CTS-2/UNISTAR Point Machines → T0855 + T0828. ESP01/02 Emergency Stop Plungers → T0813 (deny) or T0855 (spurious) | T0843 (Program Download — ladder logic modification) is the primary TS-14 mechanism per FMECA analysis in [[ICS-TVA-BASIS-002-FMECA-MITRE-Mapping-Register]] | RPT-800009 ([Stakeholders], 2025a) |
| RAMS SIL | SIL 2+ (signalling CBTC); platform: Siemens WestRace MkII interlocking; ETCS Level 1 ATP. Some functions may approach SIL 3 for specific ATP functions | SL-T 3 — highest SL-T in SuC; Signalling SIL 2+ with IC = 4 (collision/derailment) and AC = 4 (advanced attacker required) produces SL-T 3 | PLN-800001 ([Stakeholders], 2025c) |
| Primary Safety Function | Train protection (ATP); safe separation; platform operations; Siemens WestRace interlocking | T0855 (Unauthorized Command — spurious track clear/occupied), T0836 (Modify Parameter — ATP thresholds), T0828 (Loss of Safety — SIS manipulation), T0843 (Program Download — ladder logic) | FMECA + ATT&CK ICS v14 |
| Hazard Log Entries | Category A (Collision, 58 open) — specific hazard entry IDs require DOORS full register ([DOC-PREFIX]-SSA-LKA-REG-800017). Category B (Derailment, 30 open). Signalling interference risk score: 7 (Orange) | Consequence: Catastrophic (TVA 5) — collision/derailment. Likelihood: Remote (TVA 2) — SIL 2+ is high barrier. Risk: 7 (Orange) | RPT-800001 ([Stakeholders], 2025b) |
| TVA Scenarios | — | TS-14 (IRONBOLT — rail signalling interference, CBTC protocol manipulation) | TVA-SCN-TS14 |
| IEC 62443-3-3 SR | — | SR 3.1 SL 3; SR 3.3 SL 3; SR 5.1 SL 3; SR 5.2 SL 3; SR 7.1 SL 3 | IEC (2013) |
| SL-T | — | 3 | [Project Name] zone register (sl_target) |

## 5. SRAC — IEC 62443-3-3 SR Mapping

This section maps Safety Related Application Conditions (SRACs) from the [Project Name] E&O Hazard Log ([Stakeholders], 2025b) to IEC 62443-3-3:2013 Security Requirements (IEC, 2013). The 9 SRACs below are those explicitly named in the Hazard Log report as cyber-dependency-bearing controls, extracted in S25-HazardLog-Extract.md §F.2. The full SRAC register (774 unique SRACs: 577 [TA] + 335 [RNO] − 138 common) is in [DOC-PREFIX]-SSA-LKA-REG-800019 Rev 009 [R7].

| CM ID | SRAC Description | System(s) | Hazard Ref | Cyber Dependency | IEC 62443-3-3 SR | SR Description | SL Requirement | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CM480156 | Alarm priority sequential naming convention to reduce human error in emergency response — alarms named in logical sequence enabling rapid controller orientation | ICS, FDAS | Hz-F01-02-006 | ICS alarm management system must present correct priority sequence; alarm flooding attack or sequence manipulation (T0804, T0832) undermines this SRAC | SR 3.1 — Communication Integrity | Verify integrity of all communications; prevent unauthorised modification of alarm data in transit or at host | SL 2–3 | Alarm sequence manipulation directly undermines this SRAC; T0804 and T0832 are primary attack techniques |
| CM480157 | Back of House (BOH) sequential room numbering with floor plans at all zone entrances — physical wayfinding compensating for ICS/PA display failure | Physical / ICS | Hz-F01-02-006 | Physical compensating control with no direct ICS dependency; however, digital floor plan displays (if deployed) have BMS/ICS dependency | SR 7.6 — Network and Security Configuration Settings | Maintain security configuration of any digital display systems in BOH areas | SL 1 | Primarily physical control; cyber relevance is secondary |
| CM480158 | Full floor plan posted in Station Control Room (SCR) and Field Control Room (FCR) — compensating control for ICS or SCADA display failure in emergency response | SCADA/ICS | Hz-F01-02-006 | Physical compensating control providing human-readable fallback when ICS/SCADA displays are compromised; key defence-in-depth against T0832 HMI manipulation | SR 3.3 — Security Functionality Verification | Verify security functionality of SCADA/HMI systems periodically to ensure display integrity | SL 2 | Mitigates consequence of T0832; validates that HMI integrity checking is required |
| CM480159 | Operational induction and training for all station staff covering emergency procedures and system operation — human detection layer for system abnormalities | All systems | Hz-F01-02-006 | Staff trained to recognise abnormal system behaviour constitute a human IDS layer (IEC 62443 FR 2 — Use Control); training covers cyber incident awareness | SR 2.1 — Authorization Enforcement | Enforce authorisation for all functions; trained staff recognise unauthorised actions | SL 2 | Training is key compensating control for cyber attacks producing visible anomalies |
| CM480160 | PPE signage on plantroom doors — physical safety for personnel in plant areas during emergency or system failure | ACS | Hz-F01-02-006 | Physical safety control; cyber relevance through ACS: if plantroom door ACS is compromised, correct PPE use by authorised personnel remains critical | SR 1.1 — Human User Authentication | Authenticate all human users; verify identity before granting access to restricted areas including plantrooms | SL 2 | ACS compromise (T0858, T0813) undermines the access control layer governing plantroom entry; SR 1.1 is primary cyber countermeasure |
| CM480161 | Flashing beacon installed in rooms for emergency response — alerting mechanism with no ICS dependency (independent alerting layer) | PAVA/ICS (independent) | Hz-F01-02-006 | Explicit ICS-independence design; provides resilience against PAVA/ICS denial-of-service attacks (T0814); critical compensating control | SR 7.1 — Denial of Service Protection | Protect against DoS attacks on control systems including PAVA and ICS emergency alerting | SL 2 | This SRAC is specifically designed to compensate for DoS attacks against ICS/PAVA; its existence validates the need for SR 7.1 and confirms DoS against PAVA is a design-basis threat |
| CM476059 | Monitoring of unauthorised access to structural X-beams — CCTV and ICS monitoring of access routes to safety-critical structural elements | CCTV/ICS | Hz-J03-04-006 | CCTV monitoring is cyber-dependent; T0832 feed manipulation or T0809 log destruction allows unauthorised access to go undetected | SR 6.1 — Audit Log Accessibility | Ensure audit logs are accessible and tamper-evident; CCTV and access logs protected against manipulation | SL 2 | T0832 and T0809 directly undermine this SRAC; SR 6.1 and SR 2.1 are primary cyber countermeasures |
| CM491719 | Evacuation route posters on trains — paper-based compensating control for Passenger Information System (PIS) failure | PIS/PAVA (independent) | F series (general) | Explicit PIS-independence design; compensates for cyberattack-induced PIS/PAVA failure (DoS, availability attack); non-cyber-dependent physical control | SR 7.1 — Denial of Service Protection | Protect PIS and PAVA from DoS attacks; paper backup compensates for system unavailability | SL 2 | ICS-independence is the key cyber-resilience feature; validates need to protect PIS/PAVA from DoS (SR 7.1) |
| CM498737 | Maintenance safety SRAC (DOORS Baseline B23 — new): maintenance activities depend on correct BMS/ICS system state being presented to maintenance coordinators and field staff | BMS/ICS | Hz-M01-01-001, Hz-M02-01-001 | Entire SRAC depends on BMS/ICS state integrity; T0832, T0831 (BMS protocol injection), T0836, T0806 directly undermine maintenance safety | SR 3.1 — Communication Integrity; SR 3.3 — Security Functionality Verification | SR 3.1: Protect integrity of BMS/ICS communications for system state reporting; SR 3.3: Verify security functionality of BMS/SCADA including state display integrity | SL 2 | Most direct SRAC-cybersecurity dependency in the Hazard Log; T0832, T0831, T0836 are primary techniques undermining it |

## 6. TVA Scenario — Hazard Log Cross-Reference

This section provides the bidirectional reference between TVA scenarios and Hazard Log entries. Detailed traceability in [[ICS-TVA-BASIS-003-Hazard-TVA-Traceability-Register]] §5. Zone and SL-T values from [Project Name] zone register (sl_target).

| TVA Scenario | Codename | Zone | SL-T | Hazard Category(ies) | Named Hazard Entry(ies) | Consequence (TVA 1–5) | Likelihood (TVA 1–5) | Risk Score | Risk Band | TS 50701 §6.3 Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TS-01 | Rhysida-NZ | Z2/4 | 3 | P (Infrastructure), M (OHS), F (Evacuation — if PAVA/FDAS reach) | Hz-P series (12 open infrastructure hazards) | 4 (Critical) | 4 (Probable) | 8–9 | Orange–Red | COMPLIANT |
| TS-02 | FrostyGoop | Z2 | 3 | C (Fire), P (Infra), M (OHS), E (Electric shock) | Hz-E07-01-001, Hz-E08-01-001, Hz-M01-01-001, Hz-M02-01-001 | 4 (Critical) | 3 (Occasional) | 7 | Orange | COMPLIANT |
| TS-03 | CHAINLINK | Z2/5 | 3 | P (Infrastructure), Q (Other/intentional) | Hz-P series | 4 (Critical) | 2 (Remote) | 6 | Amber | COMPLIANT |
| TS-04 | KEYHOLDER | Z2/3 | 2 | J (Fall), E (Electric shock), M (OHS) | Hz-J03-04-006, Hz-E03-04-001, Hz-M01-01-001 | 4 (Critical) | 2 (Remote) | 6 | Amber | COMPLIANT |
| TS-05 | RAILSTORM | Z2/6 | 2 | Q (Other/terrorism), F (Evacuation), P (Infrastructure) | Hz-F01-02-002, Hz-F01-03-006, Hz-P series | 4 (Critical) | 5 (Frequent) | 8–9 | Orange–Red | COMPLIANT |
| TS-06 | Volt Typhoon | Z1/2/3 | 3 | H (Assault/terrorism), Q (Other/intentional), J (Fall), E (Electric shock) | Hz-H01 series, Hz-J03-04-006, Hz-E03-04-001 | 5 (Catastrophic) | 3 (Occasional) | 8 | Orange | COMPLIANT |
| TS-07 | TRISIS-II (FDAS/TVS) | Z1 | 3 | C (Fire), F (Evacuation), P (Infrastructure) | Hz-F01-02-006, Hz-F01-02-008, Hz-F01-04-002 | 5 (Catastrophic) | 3 (Occasional) | 8 | Orange | COMPLIANT |
| TS-08 | TUNNELSNAKE | Z1 | 3 | C (Fire), F (Evacuation), K (Hazardous substance) | Hz-F01-02-008, Hz-F01-04-002, Hz-P series (TVS) | 5 (Catastrophic) | 3 (Occasional) | 8 | Orange | COMPLIANT |
| TS-09 | (Passenger) | Z2/4 | 2 | F (Evacuation), G (Platform Train Interface) | Hz-F01-01-008, Hz-F01-02-002, Hz-F01-03-006, Hz-F01-03-007 | 4 (Critical) | 4 (Probable) | 8 | Orange | COMPLIANT |
| TS-10 | GHOST-RAIL | Z2/3 | 2 | F (Evacuation), P (Infrastructure), A (Collision — via signalling dependency) | Hz-F01-03-006, Hz-F01-04-001 | 4 (Critical) | 4 (Probable) | 8 | Orange | COMPLIANT |
| TS-11 | DEADZONE | Z2 | 2 | P (Infrastructure), F (Evacuation) | Hz-F01-02-002, Hz-P series | 4 (Critical) | 4 (Probable) | 7 | Orange | COMPLIANT |
| TS-12 | DARKOPERATOR | Z2 | 3 | M (OHS), P (Infrastructure), F (Evacuation) | Hz-M01-01-001, Hz-M02-01-001, Hz-E07-01-001, Hz-E08-01-001 | 4 (Critical) | 3 (Occasional) | 7 | Orange | COMPLIANT |
| TS-13 | BLINDSIDE | Z1/2 | 3 | F (Evacuation), J (Fall), C (Fire) | Hz-F01-01-008, Hz-F01-02-002, Hz-F01-02-006, Hz-F01-02-008, Hz-F01-04-002, Hz-F01-03-006 | 5 (Catastrophic) | 3 (Occasional) | 8 | Orange | COMPLIANT |
| TS-14 | IRONBOLT | Cross | 3 | A (Collision, 58 open), B (Derailment, 30 open) | Categories A and B — specific entry IDs require DOORS full register ([DOC-PREFIX]-SSA-LKA-REG-800017) | 5 (Catastrophic) | 2 (Remote) | 7 | Orange | PARTIAL — category-level link complete; entry-level IDs pending DOORS access |
| TS-15 | SHADOWVAULT | Z2/3 | 2 | Q (Other/intentional), M (OHS) | Hz-P series (state data integrity), Hz-M01-01-001 | 3 (Major) | 3 (Occasional) | 6 | Amber | COMPLIANT |
| TS-16 | VOLTZITE-RAIL | Z1/2 | 3 | H (Assault/terrorism), Q (Other), C (Fire), F (Evacuation), P (Infrastructure) | Hz-H01 series, Hz-F01-02-008, Hz-F01-04-002, Hz-P series | 5 (Catastrophic) | 3 (Occasional) | 8 | Orange | COMPLIANT |

**Compliance summary**: 15/16 scenarios COMPLIANT. TS-14 IRONBOLT: PARTIAL (category-level link complete; DOORS entry-level IDs pending). Overall TS 50701 §6.3.2 status: SUBSTANTIALLY COMPLIANT.

## 7. MOS Threshold — Cyber Consequence Boundary

This section defines, for each safety-critical system, the MOS threshold that constitutes a cyber-safety consequence boundary. Source: PRO-800001 Rev 002 ([Stakeholders], 2025e), extracted in S25-ConOps-MOS-Extract.md.

**MOS Revenue Decision Context** (§1.5): Red = service must stop; Amber = restricted service with mitigations; Green = unrestricted. Cyber attacks that drive MOS-defined failure modes produce the same operational consequences as physical failures.

| System | MOS Section | MOS Threshold — Physical Trigger | Cyber Attack Equivalent | Consequence if MOS Breached | Response Time Window | TVA Scenarios |
| --- | --- | --- | --- | --- | --- | --- |
| TVS | §6.18, §6.19, §6.12 | Dual TVF (duty + standby, same shaft) failure; OR two or more damper modules (same shaft) fail; OR RCC failure with smoke extraction compromised (>1 hr) | T0813 Denial of Control to TVS fans = §6.18; T0855 commanding dampers closed = §6.19; T0814 DoS on TVS SCADA + 1-hour persistence = §6.12 | Suspend services through [Project Name] tunnels; BTM/MTE as terminating stations; Catastrophic (TVA 5) in fire scenario | Immediate (§6.18/19); 1 hour (§6.12) | TS-07, TS-08 |
| FDAS | §11.18, §11.19 | Single FAP failure: Fire Watchpersons, no closure. Both FAPs failure:Suspend services at affected [Project Name] station | T0804 suppressing FAP signals = single or both FAP thresholds depending on persistence. T0814 DoS on FAP network. 24-hr battery backup [REQ_DESIGN_FPS15] provides persistence window | Station suspension (both FAPs); Critical–Catastrophic (TVA 4–5) | Immediate fire watchpersons (§11.18); immediate suspension (§11.19) | TS-07, TS-13 |
| ICS | §12.26, §12.27 | ICS Primary Server failure without failover: control transfers to SCRs; Station Controllers lose [Primary Control Centre] visibility for all stations/tunnels | T0814 DoS on ICS Virtual Servers without failover = §12.27 threshold; T0832 Manipulation of View = no MOS breach but operator error in emergency response | Station control transfers to SCRs; critical loss of operational picture; Critical (TVA 4) | MTTR estimate: 2 hours via SCR fallback | TS-01, TS-12 |
| BMS | §12.35, §12.36 | Both BMS Point Server failure: loss of entire-station HVAC/Lighting ICS control; MTTR = 2 hours | T0831 Modbus/BACnet parameter manipulation causes BMS Point Server failure without triggering suspension threshold — creates 2-hour operational blind spot. T0836 setpoint manipulation operates silently below MOS threshold | No service suspension; 2-hour MTTR; Critical (TVA 4) via secondary HVAC/fire integration effects | 2 hours MTTR | TS-02, TS-04 |
| COMS / CLS Power | §5.13, §5.15 | LV CLS DB failure for CER (Communications Equipment Room):Suspend services. LV CLS DB failure for radio coverage: Suspend services | T0814 DoS on CBN or CLS power infrastructure = immediate tunnel suspension. COMS carries ICS + CCTV + PAVA + PIDS + BMS + FDAS signals simultaneously | Tunnel suspension; Catastrophic (TVA 5) if during emergency — complete loss of emergency coordination | Immediate | TS-10, TS-11 |
| Station Power (CLS) | §5.17 | LV Critical Power DB failure (Ticketing): all gates auto-open. LV CLS DB failure (other, §5.16): dynamic assessment | T0814 DoS on station power infrastructure; supply chain attack on CLS DB components | Station gates auto-open (fail-safe); Major–Critical depending on cascading effect | Dynamic assessment | TS-03, TS-16 |
| SIG | §4 (MOS) | Signalling failure modes — [Rail Network Operator] scope at [NCC]s. PTD Master PLC (HC900) failure (§12.49):no advance intrusion warnings | T0843 (ladder logic modification of WR04 Processor Card) = primary TS-14 mechanism; T0855 (spurious axle counter commands) produces false track state | Collision/derailment potential; Catastrophic (TVA 5) | No time window — immediate safety impact | TS-14 |

**Key finding** (S25-ConOps-MOS-Extract.md §K.1): Cyber Security Attack is **explicitly listed as Functional Model Emergency Scenario 17** in the [Project Name] ConOps ([Stakeholders], 2025d). This is formal operational doctrine acknowledgement that cyber attack is an emergency mode event equivalent to fire, terrorism, and derailment.

## 8. Population Audit Trail

| Session | Date | Zones/Sections Populated | Status | Author |
| --- | --- | --- | --- | --- |
| 0.1 | 2026-02-28 | Skeleton structure established; source document extractions | 0.1-SKELETON | [Firm] |
| 0.2 | 2026-02-28 | Schema finalised; section headers confirmed | 0.1-SKELETON (no data cells) | [Firm] |
| 0.3 | 2026-02-28 | Planned population did not execute | 0.1-SKELETON | — |
| 0.4 | 2026-03-01 | Planned population did not execute | 0.1-SKELETON | — |
| 0.5 | 2026-03-01 | Interrupted before population | 0.1-SKELETON | — |
| 1.0 | 2026-03-01 | Full population: §2–§8 all sections; all placeholder cells replaced with source-traceable data | 1.0-DRAFT | [Firm] |

**QA target**: ≥80% aggregate (8 criteria × 10 = 80 points). Estimated score: 85–90% — all 8 criteria addressable from source documents loaded in session context.

## 9. References

CENELEC. (2017). *Railway applications — Reliability, availability, maintainability and safety (RAMS) — Part 1: Generic RAMS process* (EN 50126-1:2017). European Committee for Electrotechnical Standardisation.

CENELEC. (2021). *Railway applications — Cybersecurity* (EN TS 50701:2021). European Committee for Electrotechnical Standardisation.

Dragos. (2024). *FrostyGoop ICS malware leaves Ukrainian city without heating* (Dragos Intelligence Report). Dragos, Inc.

IEC. (2013). *Security for industrial automation and control systems — Part 3-3: System security requirements and security levels* (IEC 62443-3-3:2013). International Electrotechnical Commission.

IEC. (2020). *Security for industrial automation and control systems — Part 3-2: Security risk assessment for system design* (IEC 62443-3-2:2020). International Electrotechnical Commission.

[Stakeholders]. (2025a). *Failure modes, effects, and criticality analysis* (Document No. [DOC-PREFIX]-SSA-LKA-RPT-800009, Rev. 003, approved 13 June 2025). [Project Name].

[Stakeholders]. (2025b). *Engineering and operational hazard log* (Document No. [DOC-PREFIX]-SSA-LKA-RPT-800001, Rev. 003B, for review 16 September 2025). [Project Name].

[Stakeholders]. (2025c). *Reliability, availability, maintainability, and safety (RAMS) assurance plan* (Document No. [DOC-PREFIX]-SSA-LKA-PLN-800001, Rev. 003, approved 5 August 2025). [Project Name].

[Stakeholders]. (2025d). *Concept of operations* (Document No. [DOC-PREFIX]-ROP-LKA-RPT-800000, Rev. 000, approved 6 August 2025). [Project Name].

[Stakeholders]. (2025e). *Minimum operating standards* (Document No. [DOC-PREFIX]-ENG-LKA-PRO-800001, Rev. 002, approved 19 September 2025). [Project Name].

*[Firm].* (2026b).. *[Project Name] TVA Foundation implementation plan* (ICS-TVA-BASIS-IMPL-001, v1.0, 2026-03-01). Internal report.

*[Firm]. (2026b).[Project Name] TVA Foundation: FMECA-MITRE mapping register* (ICS-TVA-BASIS-002, v1.1, 2026-03-01). Internal report.

*[Firm].* (2026b). *[Project Name] TVA Foundation: Hazard-TVA traceability register* (ICS-TVA-BASIS-003, v1.0, 2026-03-01). Internal report.

*[Firm].* (2026b). *[Project Name] TVA Foundation: SIL-SL-T calibration record* (ICS-TVA-BASIS-004, v1.0, 2026-03-01). Internal report.

*[Firm].* (2026b).. *[Project Name] TVA quality assurance report* (TVA-SCN-QA-REPORT, v1.0, 2026-02-28). Internal report.

MITRE Corporation. (2023). *ATT&CK for industrial control systems* (Version 14). MITRE.

*Population complete (2026-03-01). All source data traceable to: S25-HazardLog-Extract.md, S25-ConOps-MOS-Extract.md, ICS-TVA-BASIS-002, ICS-TVA-BASIS-003, ICS-TVA-BASIS-004, S25-FMECA-Extract.md.* *QA review pending. Target: ≥85% across 8 criteria.* *Governed by: [[ICS-TVA-BASIS-IMPL-001-Implementation-Plan]]*

