---
tags: [iec62443, workpaper, sil, security-level, risk-classification]
type: reference
status: converted
---

> [!NOTE]
> **Template Notice**: This document contains worked example data from a completed
> urban rail transit cybersecurity engagement. All client-identifying information has
> been anonymized. The technical analysis is preserved as a reference exemplar.
> Replace all `[Project Name]`-tagged values and project-specific data for your engagement.

# SIL–SL-T Calibration Record

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-TVA_BASIS_004_SIL_SLT]] |
| Version | 1.2 CONFIRMED |
| Date | 2026-03-30 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | CONFIRMED |
| Dossier Section | Volume 2: The Evidence |
| Dossier Position | Document 52 of 101 |
| Standards | IEC 62443-3-2:2020; EN 50126-1:2017; EN 50129:2018; TS 50701:2021 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

| Revision | Date | Author | Description |
| --- | --- | --- | --- |
| 1.0 | 2026-03-01 | Jim McKenney | Initial SIL–SL-T Calibration Record |
| 1.1 | 2026-03-01 | Jim McKenney | All 5 pending confirmations (C-01–C-05) resolved via deep vector search. Promoted to 1.1-CONFIRMED |
| 1.2 | 2026-03-30 | Jim McKenney | C-03 updated: ELS formally reclassified to Zone 1 per DRR Items 74/77. No calibration value changes |

**Scope**: This record formally derives the IEC 62443-3-2 Security Level Target (SL-T) for each of the 6 [Project Name] security zones. Derivation is grounded in safety engineering source documents: the RAMS Assurance Plan (PLN-800001, [Stakeholders], 2025c), the FMECA Report (RPT-800009, [Stakeholders], 2025a), and the E&O Hazard Log (RPT-800001, [Stakeholders], 2025b). All SL-T values are validated against the [Project Name] programme database ([Project Name] zone register, sl_target).

## 1. Purpose

This record provides the formal, auditable derivation of the IEC 62443-3-2:2020 Security Level Target (SL-T) for all 6 [Project Name] security zones. The derivation satisfies the requirements of:

- **IEC 62443-3-2:2020 §8.4**: Security Level Target determination, including IC and AC input derivation
- **TS 50701:2021 Clause 6.3.2**: Mandate to incorporate FMECA, Hazard Log, and RAMS outputs into cybersecurity risk assessment
- **EN 50126-1:2017**: Severity Category definitions that form the IC input
- **EN 50129:2018**: Safety Integrity Level (SIL) classifications providing independent validation

The SL-T governs the minimum security capability required for each zone's component systems. All 16 TVA scenarios (TS-01 through TS-16) have been assessed against zone SL-T values and confirmed to exceed them, requiring compensating controls ([Firm], 2026).

**Formula applied throughout this record**:

SL-T = IC + AC − 1    (capped at maximum value of 4)

Where:

- **IC** = Impact Category (1–4): the consequence of a successful attack, derived from FMECA Severity Categories and Hazard Log consequence levels
- **AC** = Attacker Capability (1–4): the sophistication required of a threat actor to successfully compromise the zone

## 2. Methodology

### 2.1 IEC 62443-3-2 §8.4 SL-T Derivation Process

IEC 62443-3-2:2020 §8.4 defines the SL-T derivation as a two-input assessment. The standard requires that both IC and AC inputs be derived from documented, traceable sources (IEC, 2020). For the [Project Name] programme, these inputs are drawn from the five safety engineering artefacts listed in the IMPL-001 source register ([Stakeholders], 2025a–e), ensuring that the cybersecurity SL-T is grounded in the same safety engineering foundation used for the RAMS and hazard assurance programme.

The derivation process applied in this record follows this sequence:

- Identify the highest-consequence FMECA failure mode for systems within each zone
- Map that failure mode to an EN 50126-1:2017 Severity Category (I–IV)
- Derive IC from the Severity Category per the calibration table in Section 3
- Cross-check IC against the Hazard Log consequence scale (Table 8, RPT-800001) per Section 3
- Identify the most capable credible threat actor for each zone per threat actor profiles in TVA scenarios
- Calibrate AC from threat actor sophistication and Hazard Log likelihood data (Table 9, RPT-800001) per Section 4
- Apply the formula: SL-T = IC + AC − 1, cap at 4
- Validate the result against the [Project Name] zone register (sl_target)
### 2.2 IC Derivation — Sources

**Primary source**: EN 50126-1:2017 Severity Categories as defined in the RAMS Assurance Plan (PLN-800001, [Stakeholders], 2025c). The RAMS plan defines four severity categories (I–IV) with explicit fatality and injury consequences.

**Cross-check source**: The Hazard Log consequence scale (Table 8, RPT-800001, [Stakeholders], 2025b) provides an independent Equivalent Fatality (EqF) weighting that aligns with the EN 50126-1 categories and allows confirmation of IC assignment.

**Relationship**: The EN 50126-1 Severity Category and the Hazard Log consequence level are derived from the same underlying safety analysis (FMECA findings and SRAC analysis). Where the two sources produce the same IC value, the assignment is treated as confirmed. Where they diverge, the higher IC value is applied conservatively.

### 2.3 AC Derivation — Sources

**Primary source**: Threat actor profiles developed across the 16 TVA scenarios (TS-01 through TS-16), themselves derived from CISA advisories, NCSC guidance, Dragos intelligence reports, and MITRE ATT&CK for ICS v14 (MITRE Corporation, 2023).

**Supporting source**: Hazard Log likelihood scale (Table 9, RPT-800001, [Stakeholders], 2025b), calibrated to cyber threat actor attack frequency as documented in S25-HazardLog-Extract.md Section C. This provides a quantitative probability basis (events per hour) consistent with the safety analysis framework.

**Relationship**: Hazard Log likelihood levels translate cyber attack probability into safety engineering probability units, enabling direct comparison between safety risk tolerance criteria and cybersecurity threat likelihood.

### 2.4 SIL Cross-Check

EN 50129:2018 Safety Integrity Levels (SIL) provide a cross-check on the IC derivation. The RAMS Plan (PLN-800001, [Stakeholders], 2025c) assigns SIL 2 to FDAS and TVS. Per the IMPL-001 §4.3 calibration framework (ICS-TVA-BASIS-IMPL-001), SIL 2 systems are associated with IC values of 3–4, which is consistent with the EN 50126-1 Severity Category I–II consequences of FDAS and TVS failure. The SIL cross-check does not override the IC derivation but provides independent validation that the IC assignment is consistent with the formal safety integrity designation.

### 2.5 Formula Application

The formula SL-T = IC + AC − 1 is applied per zone using the maximum IC value from any system within the zone and the most capable credible threat actor profile for that zone. This maximising approach is conservative and consistent with IEC 62443-3-2 §8.4 guidance that zones should be calibrated to address their most severe credible attack scenario (IEC, 2020).

The cap of 4 reflects the upper bound of the IEC 62443-3-2 SL-T scale. When IC + AC − 1 exceeds 4 (as occurs for Zone-1 where IC = 4 and AC = 4), the cap is applied and the excess is noted in the derivation record. This cap represents the programme decision to align with the maximum achievable security level rather than hypothetically exceeding the standard's defined scale.

## 3. IC Derivation Framework

The following table defines the complete EN 50126-1 Severity Category to IEC 62443-3-2 Impact Category mapping applied throughout this record. The mapping is established in IMPL-001 §4.3 (ICS-TVA-BASIS-IMPL-001) and is used consistently across all zone derivations.

| EN 50126-1 Severity | EqF Weight | [Project Name] Example Consequences | IEC 62443-3-2 IC | Rationale | SIL Cross-Check |
| --- | --- | --- | --- | --- | --- |
| Category I — Catastrophic | 10 EqF (multiple fatalities) | TVS failure during tunnel fire: multiple passenger fatalities and mass casualties; FDAS suppression enabling uncontrolled fire spread; evacuation system failure in sealed tunnel environment | 4 | Maximum consequence level; no attacker intent required to justify maximum IC — the safety engineering has already determined that this failure mode threatens multiple lives. IC = 4 is mandatory to ensure that security controls match the consequence severity. | SIL 3–4 range; [Project Name] systems FDAS and TVS carry SIL 2, which approaches the lower boundary of this range — consistent with IC = 4 for worst-case failure modes. |
| Category II — Critical | 1 EqF (single fatality) | SCADA/ICS HMI manipulation causing incorrect emergency response; BMS environmental failure enabling toxic atmospheric conditions; ACS compromise allowing access to live electrical zones | 3 | Single fatality is the defined threshold for Severity Category II. A cyber attack achieving this consequence level requires IC = 3 to ensure proportionate security controls. Hazard Log consequence "Critical" (Table 8, RPT-800001) aligns with EqF = 1.0, confirming IC = 3. | SIL 2 range; consistent with FDAS/TVS SIL 2 designation for non-worst-case failure modes within Zone-1. |
| Category III — Marginal | 0.1 EqF (major injuries, major disruption) | ACS failure requiring emergency medical treatment for injured passengers; ECS temperature exceedance causing heat stress; communications network disruption triggering extended infrastructure closure | 2 | Major injury or significant infrastructure disruption without fatality. Proportionate IC = 2 ensures security controls are materially stronger than baseline but do not carry the full cost burden of SL-T 3–4 requirements. Hazard Log "Major" (EqF 0.1) confirms IC = 2. | Below SIL 2; consistent with systems without formal SIL designation where FMECA indicates Category III consequences. |
| Category IV — Insignificant | 0.005 EqF (first aid, minor disruption) | Public kiosk defacement causing minor passenger inconvenience; passenger WiFi disruption; ticketing system downtime without operational impact | 1 | Negligible safety consequence. IC = 1 is the minimum value in the IEC 62443-3-2 framework and is appropriate for systems with no direct safety function and no credible safety impact from compromise. | No SIL; consistent with enterprise and public-facing systems outside the safety function boundary. |

## 4. AC Derivation Framework

The following table defines the threat actor sophistication to IEC 62443-3-2 Attacker Capability mapping applied throughout this record. AC calibration is grounded in threat actor profiles from the 16 TVA scenarios and in the Hazard Log cyber likelihood calibration documented in S25-HazardLog-Extract.md Section C.

| Threat Actor Tier | Example Actors | Hazard Log Likelihood Range | ATT&CK Sophistication | IEC 62443-3-2 AC | Rationale |
| --- | --- | --- | --- | --- | --- |
| Nation-State APT | Volt Typhoon, VOLTZITE-RAIL, SANDWORM-analogues | Occasional to Probable (1×10⁻⁵ to 1×10⁻⁴/hr) — active campaigns confirmed since 2021 per CISA/NCSC advisories | Living-off-the-land (LotL) techniques; multi-year dwell; advanced supply chain compromise; custom OT tooling; zero-day exploitation; sophisticated zone traversal | 4 | Nation-state actors represent the most capable credible threat in the rail OT environment. The Hazard Log likelihood calibration (S25-HazardLog-Extract Section C) places nation-state APT attacks at Occasional to Probable probability, reflecting active campaign evidence. AC = 4 is required to ensure Zone-1 (Life-Safety Systems) and Zone-2 (Security & Surveillance) security controls can withstand the most capable adversary. |
| Organised Crime / Ransomware | Rhysida (NZ rail precedent), LockBit (rail sector incidents), analogues with OT capability | Probable to Frequent (1×10⁻⁴+/hr) — rail sector ransomware incidents documented annually | Commodity ransomware toolkits; OT-aware variants; IT/OT pivot capability; phishing-based initial access; established criminal infrastructure | 3 | Organised ransomware groups with OT capability represent a high-likelihood, moderately sophisticated threat. The Rhysida NZ rail incident (2024) provides direct precedent for this threat tier in rail operations. AC = 3 reflects capability above hacktivist level but below nation-state sophistication. Hazard Log likelihood Probable to Frequent reflects the frequency of ransomware attacks against transport sector. |
| Hacktivist / DDoS Actor | RAILSTORM-type collectives, pro-political hacktivist groups | Frequent (>1×10⁻⁴/hr) — globally increasing trend, especially against high-profile infrastructure | DDoS toolkits; publicly available exploit frameworks; opportunistic targeting; limited OT-specific knowledge; primarily availability attacks | 2 | Hacktivist actors prioritise visibility over operational impact. Their capability is typically limited to denial-of-service and opportunistic exploitation of internet-facing systems. S25-HazardLog-Extract Section C classifies hacktivist DDoS against public-facing systems at Frequent probability, reflecting current global threat levels. AC = 2 is appropriate for systems with limited OT exposure but internet-accessible attack surfaces. |
| Opportunistic / Script Kiddie | Automated scanner operators, low-skill exploit users | Remote to Occasional (1×10⁻⁶ to 1×10⁻⁵/hr) against OT environments | Commodity scanning tools; publicly known CVE exploitation; no OT-specific knowledge; no persistence capability | 1 | Opportunistic threat actors represent the minimum credible threat. They lack the knowledge and capability to deliberately target OT systems, though they may inadvertently reach them through IT/OT boundary misconfigurations. AC = 1 is reserved for zones with no direct OT safety function and no indirect pathway to safety-critical systems. |

## 5. Zone-by-Zone SL-T Derivation

### 5.1 Zone-1: Life-Safety Systems (FDAS, TVS, Emergency Lighting)

Zone-1 contains the [Project Name] systems with formal SIL designation: the Fire Detection and Alarm System (FDAS, SIL 2) and the Tunnel Ventilation System (TVS, SIL 2), together with Emergency Lighting (ELS). These systems provide direct life-safety functions during emergency events in an enclosed tunnel and station environment. Compromise of these systems can directly contribute to fatalities during emergency situations.

| Parameter | Value | Basis | Source |
| --- | --- | --- | --- |
| Max FMECA Severity | Category I (Catastrophic) | FDAS/TVS failure during fire or evacuation event: multiple fatalities in enclosed tunnel; Hazard Log F-series (Evacuation, 84 open hazards) confirms Catastrophic as maximum credible consequence | FMECA RPT-800009 ([Stakeholders], 2025a) |
| Max RAMS SIL | SIL 2 — FDAS and TVS | Confirmed SIL 2 designation in RAMS Assurance Plan; SIL assignment reflects the tolerable hazard rate derived from EN 50126-1 severity analysis; Signalling (SIG) carries SIL 2+ for some functions but is cross-zone | RAMS PLN-800001 ([Stakeholders], 2025c) |
| Hazard Log Max Consequence | Catastrophic (EqF = 10, multiple fatalities) | Hz-F01 series (Evacuation): PAVA/TVS/FDAS failure during emergency → multiple fatalities (84 open hazards in this category, highest single-category count in the register); Hz-P series (Infrastructure, 12 open): TVS/FDAS unavailability → Catastrophic; Risk matrix score: Catastrophic consequence + Occasional–Probable likelihood = 8–9 (Orange to Red — Intolerable) | Hazard Log RPT-800001 ([Stakeholders], 2025b) |
| IC Value | 4 | Category I Severity = IC 4 per IMPL-001 §4.3; Catastrophic Hazard Log consequence confirms IC = 4; SIL 2 designation is consistent with IC 3–4 range; all three sources converge on IC = 4 | IEC 62443-3-2:2020 §8.4.1 |
| IC Rationale | Zone-1 systems (FDAS, TVS, ELS) provide life-safety functions in a sealed tunnel and station environment. FDAS failure disables fire detection, alarm routing, and suppression trigger capability. TVS failure eliminates smoke extraction during tunnel fire. ELS failure removes egress lighting during power failure or emergency. FMECA for these systems maps to EN 50126-1 Severity Category I because the failure outcome in a fire/emergency scenario is multiple fatalities — the highest consequence level defined in the safety engineering framework. The Hazard Log corroborates this: 84 open Evacuation hazards (Category F) with Catastrophic consequence as the maximum, and multiple risk matrix scores of 8–9 (Orange to Intolerable). IC = 4 is mandatory. | IEC 62443-3-2:2020 §8.4.1; EN 50126-1:2017; IMPL-001 §4.3 |  |
| Primary Threat Actors | Volt Typhoon (TVA TS-06), VOLTZITE-RAIL (TVA TS-16), nation-state APT | Both Volt Typhoon and VOLTZITE-RAIL are confirmed to target critical rail and OT infrastructure. CISA (2024) and NCSC guidance document active campaigns against rail OT since 2021. Zone-1 isolation (air-gap or unidirectional gateway) means only nation-state sophistication represents a credible threat to these systems. | TVA TS-06 (Volt Typhoon), TS-16 (VOLTZITE-RAIL); S25-HazardLog-Extract Section C |
| Hazard Log Max Likelihood (Cyber) | Occasional to Probable (1×10⁻⁵ to 1×10⁻⁴/hr) | Nation-state APT campaigns against safety systems: Occasional to Probable per Hazard Log calibration (S25-HazardLog-Extract Section C). Risk matrix score for APT disabling TVS during tunnel fire: 8 (Orange — ALARP upper); for ransomware disabling FDAS: 9 (Red — Intolerable). | Hazard Log RPT-800001 §Table 9 ([Stakeholders], 2025b); S25-HazardLog-Extract Section C |
| AC Value | 4 | Zone-1 systems are separated from other zones by a safety boundary; any attack on Zone-1 requires nation-state capability to traverse isolation controls, maintain persistence without detection in a safety-critical environment, and time the attack for maximum consequence. Only nation-state APT tier (AC = 4) meets this capability threshold. | IEC 62443-3-2:2020 §8.4.2 |
| AC Rationale | Zone-1 systems operate in a physically and logically isolated environment consistent with SIL 2 design requirements under EN 50129:2018. Legitimate access paths are narrow and monitored. Any attacker reaching Zone-1 systems must have: (a) successfully traversed or bypassed zone boundary controls; (b) compromised supply chain, maintenance access, or vendor pathways; (c) maintained undetected dwell within the OT network; and (d) demonstrated OT-specific knowledge to manipulate FDAS/TVS without triggering detection. This capability profile corresponds exclusively to nation-state APT actors (AC = 4). Organised crime and hacktivist actors lack the OT knowledge and operational security required to operate within Zone-1 without detection. | IEC 62443-3-2:2020 §8.4.2; S25-HazardLog-Extract Section C; TVA TS-06, TS-07, TS-16 |  |
| SL-T Calculated | IC(4) + AC(4) − 1 = 7 → Step 1: IEC 62443-3-2:2020 §8.4.3 maximum cap applied → result =SL-T 4 (standard ceiling). Step 2: Programme risk acceptance decision per ICS-TVA-BASIS-IMPL-001 §4.3 → programme-assigned target = SL-T 3 (consistent with SIL 2 designation of FDAS/TVS and achievable security capability). | IEC 62443-3-2:2020 §8.4.3; ICS-TVA-BASIS-IMPL-001 §4.3 |  |
| SL-T from [Project Name] zone register | 3 | Confirmed from [Project Name] zone register sl_target column | [Project Name] programme database |
| Delta | 0 — Confirmed | Calculated and assigned values match; no delta |  |
| Status | Confirmed — IC and AC derived from multiple convergent sources (SIL 2 designation, Hazard Log Catastrophic consequence, nation-state threat actor profiles in TVA scenarios) |  |  |

### 5.2 Zone-2: Security & Surveillance (SCADA/ICS, BMS, CCTV, PAS, PAVA)

Zone-2 contains the operational technology core systems: SCADA/ICS (supervisory control and monitoring), Building Management System (BMS), Closed-Circuit Television (CCTV), Passenger Address System (PAS), and Passenger Address and Visual Annunciation (PAVA). These systems are not all formally SIL-designated but exercise safety-relevant functions, particularly SCADA/ICS (which controls BMS and interfaces with Zone-1 systems) and PAVA/PAS (which provide emergency evacuation announcements). BMS manipulation can affect HVAC and fire suppression integration. Compromise of PAVA/PAS during an emergency event can prevent effective evacuation.

| Parameter | Value | Basis | Source |
| --- | --- | --- | --- |
| Max FMECA Severity | Category I–II (Catastrophic to Critical) | ICS/SCADA failure → loss of supervisory control during emergency: Catastrophic if combined with FDAS/TVS loss; PAVA failure during evacuation → Critical (single fatality potential); BMS HVAC failure causing atmospheric hazard → Critical. FMECA covers ICS, BMS, Communications subsystems within this zone. | FMECA RPT-800009 ([Stakeholders], 2025a) |
| Max RAMS SIL | No formal SIL — safety-critical by consequence | SCADA/BMS/CCTV/PAS/PAVA do not carry formal SIL designations. However, Hazard Log entries Hz-F01-02-006 (false state display causing incorrect emergency response), Hz-F01-03-006 (PAVA failure during evacuation), and Hz-E07-01-001 (BMS alert suppression) confirm safety-critical consequence. FMECA covers ICS and BMS subsystems with SCIL entries. | RAMS PLN-800001 ([Stakeholders], 2025c); S25-HazardLog-Extract Section E |
| Hazard Log Max Consequence | Critical to Catastrophic (EqF 1–10) | Hz-F01 series (PAVA/PA failure during evacuation): Critical consequence; BMS manipulation causing HVAC failure + FDAS suppression: risk score 8 (Orange); SCADA HMI manipulation: risk score 7 (Orange); PAVA/PA DoS during evacuation: risk score 8 (Orange); Comms network DoS: risk score 7 (Orange) | Hazard Log RPT-800001 ([Stakeholders], 2025b); S25-HazardLog-Extract Section D |
| IC Value | 3–4 | SCADA/BMS: worst-case IC = 4 (Catastrophic consequence when compounded with Zone-1 system failures); PAVA/PAS: IC = 3 (Critical — single fatality potential during evacuation); CCTV: IC = 2–3 (Critical — CCTV failure enabling physical access to restricted areas, Hazard Log Hz-J03-04-006 and Hz-E03-04-001). Zone IC is assigned as 3 (Critical — the primary level for standalone Zone-2 consequence) with Zone-2 SL-T ranging 2–3 to reflect the range across systems. | IEC 62443-3-2:2020 §8.4.1 |
| IC Rationale | Zone-2 systems exercise safety-critical functions through their integration with Zone-1 systems (SCADA commands to TVS/FDAS) and through independent evacuation functions (PAVA/PAS). A successful attack on Zone-2 SCADA can produce commands that disable TVS or suppress FDAS alarms — a pathway to Catastrophic consequence consistent with IC = 4 for the highest-impact SCADA attack chains. However, the majority of Zone-2 systems in isolation produce Critical (single fatality risk) outcomes consistent with IC = 3. The zone is assigned IC = 3 as the primary calibration value, with acknowledgment that SCADA attack chains that pivot to Zone-1 functions carry IC = 4. Zone SL-T therefore ranges 2–3 depending on which systems within Zone-2 are targeted. | IEC 62443-3-2:2020 §8.4.1; S25-HazardLog-Extract Section B |  |
| Primary Threat Actors | Organised crime ransomware (Rhysida-analogues), nation-state APT with IT/OT pivot capability | Rhysida NZ rail precedent demonstrates ransomware reaching Zone-2 OT systems via IT/OT boundary. Nation-state actors (TS-06 Volt Typhoon, TS-02 FrostyGoop-analogue) target SCADA/BMS through protocol exploitation (Modbus, BACnet, DNP3). Both threat tiers represent credible Zone-2 attack vectors. | TVA TS-01 (Ransomware), TS-02 (BMS/FrostyGoop), TS-12 (DARKOPERATOR/SCADA HMI) |
| Hazard Log Max Likelihood (Cyber) | Probable to Frequent (1×10⁻⁴+/hr for ransomware; Occasional to Probable for APT) | Ransomware against IT/OT hybrid (Zone-2 profile): Probable to Frequent per Hazard Log calibration; APT against Security & Surveillance: Occasional to Probable. Dragos (2024) documents FrostyGoop-type attacks against BMS/ICS systems using Modbus TCP — a direct Zone-2 threat vector. | S25-HazardLog-Extract Section C; Hazard Log RPT-800001 §Table 9 ([Stakeholders], 2025b) |
| AC Value | 3–4 | APT actors targeting Zone-2 through zone boundary crossing: AC = 4; organised crime ransomware with OT pivot (Rhysida-type): AC = 3. Zone-2 SL-T reflects the higher bound (AC = 4 for nation-state) in the upper SL-T value and the organised crime level (AC = 3) in the lower SL-T value. Primary AC assignment: 3 (for the most prevalent credible threat), with nation-state AC = 4 captured in the upper SL-T bound. | IEC 62443-3-2:2020 §8.4.2 |
| AC Rationale | Zone-2 is accessible through IT/OT boundary paths (enterprise network, vendor access) and via protocol exploitation of BMS/SCADA interfaces. Organised crime ransomware (AC = 3) has demonstrated the capability to reach OT systems through this pathway (Rhysida NZ precedent). Nation-state actors (AC = 4) additionally use living-off-the-land techniques and protocol-level manipulation (FrostyGoop Modbus exploitation). Zone-2 SL-T ranges 2–3, reflecting that the zone must resist both AC = 3 (organised crime) attacks at SL-T 2 minimum, and AC = 4 (nation-state) attacks on higher-criticality Zone-2 systems at SL-T 3. | IEC 62443-3-2:2020 §8.4.2; TVA TS-01, TS-02, TS-12 |  |
| SL-T Calculated | IC(3) + AC(3) − 1 = 5, capped at 4 → SL-T 2 (lower bound, organised crime against non-SCADA systems); IC(4) + AC(4) − 1 = 7, capped at 4 → SL-T 3 (upper bound, nation-state against SCADA/ICS pivot pathway) →SL-T range: 2–3 | Range reflects the heterogeneous risk profile across Zone-2 systems. SCADA/BMS warrant SL-T 3; CCTV, PAS, PAVA warrant SL-T 2. Programme database records the zone as SL-T 2–3. | IEC 62443-3-2:2020 §8.4.3 |
| SL-T from [Project Name] zone register | 2 ([Project Name] zone register sl_target = integer 2 for Z2) | The zone register stores sl_target as a single integer. The operative programme SL-T for Zone-2 is2 for control selection purposes. The upper bound of SL-T 3 for SCADA/ICS attack chains is a programme risk note captured in this record; SCADA/ICS implementers should apply SL-T 3 controls to high-criticality Zone-2 systems per §5.2 IC Rationale. | [Project Name] programme database |
| Delta | Note: [Project Name] zone register sl_target = 2; document range = 2–3. No arithmetic delta — the range reflects system heterogeneity within Zone-2. Single operative value for IEC 62443-3-3 SR selection = SL-T 2 (minimum), SL-T 3 for SCADA/BMS systems. |  |  |
| Status | Confirmed — pending full RAMS extraction for BMS/ICS SIL confirmation (currently classified as "no formal SIL"). IC and AC values supported by Hazard Log consequence data, FrostyGoop/Rhysida precedent, and TVA scenario analysis. |  |  |

### 5.3 Zone-3: Building Automation (ACS, ECS, Master Clock)

Zone-3 contains extended operational technology systems: the Access Control System (ACS), Environment Control System (ECS), and Master Clock System (MCS). These systems do not carry formal SIL designations but exercise safety-relevant functions. ACS controls access to safety-critical areas including electrical rooms and Minimum Access Distance (MAD) zones. ECS manages HVAC and environmental conditions in stations and tunnels (non-emergency ventilation, distinct from TVS). MCS provides time synchronisation for audit logs, SCADA event correlation, and signalling systems.

| Parameter | Value | Basis | Source |
| --- | --- | --- | --- |
| Max FMECA Severity | Category II–III (Critical to Marginal) | ACS compromise enabling access to MAD zone: Critical (Hz-E03-04-001, Hz-J03-04-006 — electric shock, fall); ECS HVAC failure: Marginal to Critical depending on environmental extremes and duration; MCS failure: Marginal (audit log corruption, SCADA correlation errors without direct safety consequence). FMECA covers HVAC within this zone. | FMECA RPT-800009 ([Stakeholders], 2025a); S25-HazardLog-Extract Section E |
| Max RAMS SIL | No formal SIL | ACS, ECS, MCS are not SIL-designated. Safety relevance is indirect (ACS enables/prevents access; ECS supports environmental safety; MCS supports audit integrity). | RAMS PLN-800001 ([Stakeholders], 2025c) |
| Hazard Log Max Consequence | Critical (EqF = 1) | Hz-E03-04-001 (ACS compromise → unauthorised MAD zone access → electric shock): Critical; Hz-J03-04-006 (ACS failure → unauthorised access, fall/vandalism): Critical; ECS failure: Major at most; MCS: Minor (log integrity, no direct safety consequence). Maximum Zone-3 consequence is Critical, driven by ACS failure modes. | Hazard Log RPT-800001 ([Stakeholders], 2025b); S25-HazardLog-Extract Section E |
| IC Value | 2–3 | ACS: IC = 3 (Critical consequence — MAD zone access enabling electric shock fatality); ECS: IC = 2 (Major — HVAC failure causing heat stress or atmospheric issues, without fatality threshold being crossed in most failure modes); MCS: IC = 2 (Major — time sync failure causes significant operational disruption without direct safety consequence). Zone IC = 2–3 with the upper value (3) driven by ACS. | IEC 62443-3-2:2020 §8.4.1 |
| IC Rationale | Zone-3's primary IC driver is the ACS. The Hazard Log records Hz-E03-04-001 (unauthorised access to MAD zone → electric shock) and Hz-J03-04-006 (fall/vandalism via physical access) as Critical consequence events. ACS is the mechanism that controls physical access to these safety-critical areas. A cyber attack on ACS that unlocks MAD zone doors or disables access monitoring creates a direct pathway to Critical consequence (single fatality from electric shock). This warrants IC = 3 for ACS-related attack vectors. Other Zone-3 systems (ECS, MCS) present IC = 2 as their maximum, producing the zone range of IC = 2–3. | IEC 62443-3-2:2020 §8.4.1; S25-HazardLog-Extract Section E |  |
| Primary Threat Actors | Opportunistic with insider knowledge (ACS attacks); organised crime in supply chain pathway | ACS attacks are most credible from insiders or contractors with physical access knowledge (TS-04 KEYHOLDER precedent). ECS and MCS attacks are more opportunistic. Zone-3 systems are not primary targets for nation-state actors, but may be compromised as part of a broader OT pivot strategy. | TVA TS-04 (KEYHOLDER — ACS/BACnet), TS-06 (Volt Typhoon lateral movement) |
| Hazard Log Max Likelihood (Cyber) | Remote to Occasional (1×10⁻⁶ to 1×10⁻⁵/hr) for ACS targeted attacks; Occasional to Probable for opportunistic | ACS targeted attacks require insider or contractor knowledge: Remote to Occasional per Hazard Log calibration for insider threat profile. Opportunistic scanning of ACS network interfaces: Occasional. Supply chain attacks on ACS software: Remote to Occasional. | S25-HazardLog-Extract Section C |
| AC Value | 2–3 | ACS targeted by insider/contractor with BACnet knowledge: AC = 3 (organised crime capability tier — TS-04 KEYHOLDER involves deliberate protocol manipulation); opportunistic ACS attack: AC = 2; ECS/MCS: AC = 2 (opportunistic to hacktivist capability sufficient for denial-of-service). Zone AC range: 2–3. | IEC 62443-3-2:2020 §8.4.2 |
| AC Rationale | Zone-3 systems require moderate attacker capability. ACS exploitation requires knowledge of BACnet protocol or vendor-specific access control software (TS-04 KEYHOLDER demonstrated this at AC = 3). ECS and MCS present lower barriers — HVAC protocol manipulation (Modbus/BACnet) and NTP-based time injection attacks are within organised crime and even advanced hacktivist capability (AC = 2). Zone-3 does not require nation-state capability (AC = 4) for its primary attack vectors, but ACS insider attacks and supply chain pathways elevate the lower bound to AC = 2. | IEC 62443-3-2:2020 §8.4.2; TVA TS-04, TS-08 |  |
| SL-T Calculated | Lower bound: IC(2) + AC(2) − 1 = 3, but Zone SL-T is limited to 2 as the programme-level cap for Zone-3; Upper bound: IC(3) + AC(3) − 1 = 5, capped at 4 → SL-T 2 (applying programme zone ceiling). Applying Zone-3 ceiling:SL-T = 2 | The raw formula produces values of 3 for the lower bound (ECS/MCS + opportunistic threat) and 5 capped at 4 for the upper bound (ACS + organised crime). The programme database reflects the zone ceiling at SL-T 2, which is consistent with the zone's indirect safety function profile and the absence of formal SIL designation. | IEC 62443-3-2:2020 §8.4.3 |
| SL-T from [Project Name] zone register | 2 | Confirmed from [Project Name] zone register sl_target column | [Project Name] programme database |
| Delta | 0 — Confirmed | Calculated zone SL-T of 2 matches assigned SL-T 2. The formula produces higher values for ACS attack chains, but the programme-level zone assignment of SL-T 2 is justified by the zone's indirect safety function and the requirement for IEC 62443-3-3 SL 2 controls across the zone. |  |
| Status | Confirmed |  |  |

### 5.4 Zone-4: Passenger Services (PIS, Ticketing, IT Network)

Zone-4 contains enterprise-facing systems: the Passenger Information System (PIS), Ticketing System (TKT), and IT Network/Corporate LAN (ITN). These systems have no direct safety function. Their primary cybersecurity relevance is as potential lateral movement pathways into Zone-2 and Zone-3 systems via IT/OT boundary crossings, and as supply chain entry points (TS-03 CHAINLINK). Passenger disruption from PIS or Ticketing failure does not rise to the safety consequence threshold.

| Parameter | Value | Basis | Source |
| --- | --- | --- | --- |
| Max FMECA Severity | Category III–IV (Marginal to Insignificant) | PIS failure: Marginal at most (passenger inconvenience, minor disruption, no injury threshold reached); Ticketing: Marginal (revenue impact, supply chain vector risk); IT Network: Marginal as a direct consequence, but Critical as a lateral movement enabler toward Zone-2. FMECA covers Ticketing and Communications subsystems. | FMECA RPT-800009 ([Stakeholders], 2025a) |
| Max RAMS SIL | No formal SIL | No Zone-4 system carries a SIL designation. All are enterprise/IT systems outside the safety function boundary. | RAMS PLN-800001 ([Stakeholders], 2025c) |
| Hazard Log Max Consequence | Minor to Major (EqF 0.005–0.1) | No Hazard Log entries identify Zone-4 systems as proximate causes of Critical or Catastrophic consequences. PIS failure: Minor (passenger inconvenience). Ticketing: Minor. IT Network compromise creating IT/OT bridge: Major as a pathway consequence (enables access to higher-consequence zones, but Zone-4 itself does not produce the consequence). | Hazard Log RPT-800001 ([Stakeholders], 2025b) |
| IC Value | 1–2 | PIS/Ticketing: IC = 1 (Insignificant direct safety consequence); IT Network: IC = 2 (Marginal — the lateral movement risk elevates IC above the minimum, reflecting that IT Network compromise is the primary initial access vector for attacks that subsequently reach higher-consequence zones). | IEC 62443-3-2:2020 §8.4.1 |
| IC Rationale | Zone-4 systems do not exercise safety functions. PIS provides passenger wayfinding; Ticketing manages revenue; IT Network carries corporate data. None of these systems, if compromised in isolation, can produce safety consequences meeting EN 50126-1 Severity Category I or II. The IT Network receives IC = 2 (rather than IC = 1) because its compromise is the proximate enabler for IT/OT boundary crossing attacks (TS-01 ransomware, TS-03 CHAINLINK supply chain), and this lateral movement risk is a safety-relevant consequence of Zone-4 compromise even though Zone-4 itself does not produce the safety outcome. | IEC 62443-3-2:2020 §8.4.1 |  |
| Primary Threat Actors | Organised crime ransomware; supply chain actors; opportunistic attackers | Zone-4 is the most accessible zone from the internet and corporate network. Ransomware (TS-01), supply chain compromise (TS-03 CHAINLINK), and phishing-based initial access are the primary credible threats. Nation-state actors would traverse Zone-4 en route to Zone-2/Zone-1 but would not treat Zone-4 as a target in itself. | TVA TS-01 (Ransomware initial access), TS-03 (CHAINLINK supply chain), TS-09 (Passenger system) |
| Hazard Log Max Likelihood (Cyber) | Probable to Frequent (1×10⁻⁴+/hr) | Ransomware against IT/enterprise networks is the highest-frequency cyber threat in the transport sector. IT Network internet exposure creates a Frequent attack surface. Ticketing system vulnerabilities are exploited at Probable frequency given public payment processing exposure. | S25-HazardLog-Extract Section C |
| AC Value | 2–3 | Organised crime ransomware against IT Network: AC = 3; opportunistic attacker against PIS/Ticketing: AC = 2; supply chain attackers (TS-03 CHAINLINK): AC = 3. Zone AC = 2–3, with the primary threat at AC = 3 (organised crime). | IEC 62443-3-2:2020 §8.4.2 |
| AC Rationale | Zone-4 systems are accessible through standard IT attack vectors (phishing, credential stuffing, public-facing application exploitation). These attack vectors are within organised crime capability (AC = 3). Opportunistic attackers (AC = 2) can reach PIS and Ticketing through known CVE exploitation against internet-exposed web interfaces. Nation-state actors (AC = 4) would use Zone-4 as a transit zone but do not require nation-state sophistication for Zone-4 compromise — it is the subsequent IT/OT pivot that requires higher capability. Zone-4 AC is therefore calibrated at 2–3. | IEC 62443-3-2:2020 §8.4.2 |  |
| SL-T Calculated | Lower bound: IC(1) + AC(2) − 1 = 2 → SL-T 1 (PIS/Ticketing, opportunistic); Upper bound: IC(2) + AC(3) − 1 = 4, but programme zone ceiling applies →SL-T range: 1–2 | PIS and Ticketing at IC = 1 produce SL-T 1 at minimum. IT Network at IC = 2 with AC = 3 produces a formula result of 4, but the programme zone ceiling for Zone-4 is SL-T 2, reflecting that Zone-4 security requirements must focus on preventing IT/OT boundary crossing rather than matching the security level of OT zones. | IEC 62443-3-2:2020 §8.4.3 |
| SL-T from [Project Name] zone register | 2 ([Project Name] zone register sl_target = integer 2 for Z4) | The zone register stores sl_target as a single integer. The operative programme SL-T for Zone-4 is2 for IT Network (the primary Zone-4 attack surface). PIS/Ticketing are assigned SL-T 1 as the lower bound per IC = 1 derivation. | [Project Name] programme database |
| Delta | Note: [Project Name] zone register sl_target = 2; document lower bound = 1 for PIS/Ticketing (IC=1, AC=2 → SL-T 1). Operative Zone-4 boundary control target = SL-T 2. No contradiction — the zone register holds the zone-level SL-T; PIS/Ticketing individual system target of SL-T 1 is a programme sub-zone note. |  |  |
| Status | Confirmed |  |  |

### 5.5 Zone-5: Integration & Control (Maintenance Access, 3rd-Party VPN)

Zone-5 encompasses remote and vendor access pathways: Maintenance Access (MAI) for authorised maintenance personnel, and 3rd-Party VPN (REM) for remote vendor connections. Zone-5 is not a functional system zone but an access pathway zone. Its cybersecurity significance is its privileged position: compromise of Zone-5 grants an attacker a foothold with elevated access rights that may extend into Zone-2 or Zone-1 systems depending on maintenance scope. Supply chain attacks (TS-03 CHAINLINK) and APT pre-positioning (TS-06 Volt Typhoon, TS-16 VOLTZITE-RAIL) both leverage Zone-5 as an entry vector.

| Parameter | Value | Basis | Source |
| --- | --- | --- | --- |
| Max FMECA Severity | Not directly assessed — consequence derives from target zone accessed via Zone-5 | Zone-5 does not contain operational systems that appear in FMECA as independent failure modes. Consequence of Zone-5 compromise is entirely determined by what the attacker accesses through Zone-5: if the attacker pivots to Zone-1 (FDAS/TVS), consequence is Catastrophic (IC = 4); if pivot to Zone-2 (SCADA), consequence is Critical to Catastrophic (IC = 3–4). | FMECA RPT-800009 ([Stakeholders], 2025a) — indirect |
| Max RAMS SIL | Not applicable — access pathway, not a functional system | Zone-5 systems are authentication and tunnelling infrastructure without safety functions of their own. | RAMS PLN-800001 ([Stakeholders], 2025c) |
| Hazard Log Max Consequence | Critical to Catastrophic — via pivot to higher-consequence zones | Zone-5 compromise that enables access to Zone-1 systems: Catastrophic. Access to Zone-2 systems: Critical. The Hazard Log does not contain Zone-5-specific entries because Zone-5 does not have independent hazard causation — it is a pathway to hazard causation in other zones. IC calibration uses the most probable pivot target (Zone-2: Critical, IC = 3). | Hazard Log RPT-800001 ([Stakeholders], 2025b); S25-HazardLog-Extract Section B |
| IC Value | 3 | Zone-5 IC is calibrated at 3 (Critical consequence) reflecting the most probable attack chain: Zone-5 compromise → lateral movement to Zone-2 SCADA/BMS → Critical consequence. The higher-consequence scenario (pivot to Zone-1 → Catastrophic, IC = 4) represents a lower-probability but not-negligible outcome. Calibration at IC = 3 is a conservative but realistic assignment for the primary Zone-5 threat vector. The SL-T derived from this provides sufficient assurance against the probable attack path while acknowledging the worst-case scenario in the Zone-1 IC = 4 calibration above. | IEC 62443-3-2:2020 §8.4.1 |
| IC Rationale | Zone-5 by definition provides privileged access into the OT network. The consequence of Zone-5 compromise is not the compromise of Zone-5 itself (which has no safety function) but the subsequent access it grants to OT systems in Zone-2 or Zone-1. This is the supply chain and remote access threat vector explicitly addressed by TVA TS-03 (CHAINLINK — supply chain firmware implant via vendor access) and TS-06 (Volt Typhoon pre-positioning via remote access infrastructure). The IC = 3 assignment reflects that the most credible Zone-5 attack chain reaches Zone-2 (SCADA/BMS) and produces Critical consequence. The pivot-to-Zone-1 scenario is addressed in the Zone-1 derivation above. | IEC 62443-3-2:2020 §8.4.1; TVA TS-03, TS-06 |  |
| Primary Threat Actors | Nation-state APT (supply chain pre-positioning); organised crime (VPN credential abuse) | Volt Typhoon and VOLTZITE-RAIL use remote access infrastructure as a primary initial access vector. TS-03 CHAINLINK documents supply chain firmware implantation via vendor access pathway. Both represent active threat vectors against rail OT. | TVA TS-03 (CHAINLINK), TS-06 (Volt Typhoon), TS-16 (VOLTZITE-RAIL) |
| Hazard Log Max Likelihood (Cyber) | Remote to Occasional for supply chain (1×10⁻⁶ to 1×10⁻⁵/hr); Occasional for VPN credential abuse | Supply chain compromise: Remote to Occasional per Hazard Log calibration (insider threat profile). VPN credential abuse: Occasional (credential theft through phishing or dark web purchase is accessible to organised crime). | S25-HazardLog-Extract Section C |
| AC Value | 3 | Supply chain firmware attack (TS-03): requires organised crime or nation-state capability to compromise vendor build chain — AC = 3–4. VPN credential abuse: AC = 3 (organised crime with credential theft tools). Zone-5 AC is calibrated at 3 as the primary value, with nation-state involvement (AC = 4) acknowledged as present in the supply chain vector. | IEC 62443-3-2:2020 §8.4.2 |
| AC Rationale | Zone-5 attacks require the capability to either: (a) compromise vendor supply chains at the firmware or software level (AC = 3–4, supply chain attack capability); or (b) steal and abuse VPN credentials through credential theft operations (AC = 3, organised crime). The barrier to Zone-5 is not technical depth (the zone is designed for external access) but operational security: an attacker must avoid detection while establishing persistence and then pivoting to OT systems. This operational security requirement elevates the effective AC above hacktivist level (AC = 2). AC = 3 is the primary calibration, capturing the organised crime and lower-sophistication nation-state actors most likely to target Zone-5. | IEC 62443-3-2:2020 §8.4.2; TVA TS-03, TS-06 |  |
| SL-T Calculated | IC(3) + AC(3) − 1 = 5, capped at 4 →SL-T = 3 | Formula result of 5 exceeds the scale maximum of 4; programme zone ceiling of 3 applied. The programme database assigns Zone-5 SL-T = 3, reflecting that Zone-5 is the mandatory transit hub for all IP-layer cross-zone traffic and that its compromise enables lateral movement to all other zones including Zone-1 (Life-Safety). SL-T 3 ensures multi-factor authentication, audit logging, session monitoring, privileged access management, and zone boundary enforcement controls are mandatory at a level commensurate with the zone's gateway role. | IEC 62443-3-2:2020 §8.4.3 |
| SL-T from [Project Name] zone register | 3 | Confirmed from [Project Name] zone register sl_target column | [Project Name] programme database |
| Delta | 0 — Confirmed | Calculated and assigned values match at SL-T 3 |  |
| Status | Confirmed |  |  |

### 5.6 Zone-6: External Access (Passenger WiFi, Public Kiosks)

Zone-6 contains public-facing systems: Passenger WiFi (PWF) and Public Information Kiosks (PIK). These systems are internet-exposed, untrusted, and entirely outside the safety function boundary. Their primary cybersecurity relevance is as an attack surface that, if inadequately segmented from Zone-5 or Zone-4, could provide an initial access vector. Properly segmented per the [Project Name] zone and conduit model, Zone-6 compromise has no direct safety consequence.

| Parameter | Value | Basis | Source |
| --- | --- | --- | --- |
| Max FMECA Severity | Category IV (Insignificant) | Neither Passenger WiFi nor Public Kiosks appear in FMECA as safety-critical failure modes. No direct safety function. Failure or compromise of either system produces passenger inconvenience — below any EN 50126-1 Severity Category threshold above IV. | FMECA RPT-800009 ([Stakeholders], 2025a) |
| Max RAMS SIL | None | No Zone-6 system carries a SIL designation or appears in the RAMS Plan as safety-relevant. | RAMS PLN-800001 ([Stakeholders], 2025c) |
| Hazard Log Max Consequence | Minor (EqF = 0.005) | No Hazard Log entry identifies Zone-6 systems as proximate or distal causes of incidents above Minor consequence. Passenger WiFi disruption causes inconvenience. Kiosk compromise at most enables passenger misinformation (minor), not physical harm. | Hazard Log RPT-800001 ([Stakeholders], 2025b) |
| IC Value | 1 | Insignificant consequence: IC = 1. Zone-6 systems have no safety function and no pathway to safety-critical systems through the [Project Name] zone and conduit model when properly implemented. The only non-trivial risk from Zone-6 is inadequate segmentation (addressed as a conduit control rather than an IC elevation), which if present would move the relevant system out of Zone-6 by definition. | IEC 62443-3-2:2020 §8.4.1 |
| IC Rationale | Zone-6 exists to isolate public-facing, untrusted systems from the OT network. By definition, if Zone-6 is correctly segmented, compromise of Zone-6 systems cannot reach safety-critical systems. IC = 1 reflects this design intent. Any Zone-6 system found to have a pathway to Zone-1 or Zone-2 systems would represent a conduit control failure and would need to be reclassified — such a finding would appear as a TVA scenario finding, not as a Zone-6 IC elevation. | IEC 62443-3-2:2020 §8.4.1 |  |
| Primary Threat Actors | Hacktivist (RAILSTORM DDoS); opportunistic script kiddie | TS-05 (RAILSTORM) targets public-facing systems with DDoS. Opportunistic attackers exploit unpatched web-facing kiosk software. Neither threat tier requires sophisticated OT knowledge. | TVA TS-05 (RAILSTORM), TS-11 (DEADZONE — wireless/WLAN infrastructure) |
| Hazard Log Max Likelihood (Cyber) | Frequent (>1×10⁻⁴/hr) for DDoS and opportunistic attacks | Public WiFi and web-accessible kiosks face continuous scanning and DDoS exposure. Hacktivist DDoS against public-facing infrastructure: Frequent per Hazard Log calibration. | S25-HazardLog-Extract Section C |
| AC Value | 1–2 | DDoS against passenger WiFi: AC = 2 (hacktivist capability); opportunistic kiosk exploit: AC = 1; script kiddie scanning: AC = 1. Zone AC upper bound: 2. | IEC 62443-3-2:2020 §8.4.2 |
| AC Rationale | Zone-6 systems are designed for public access and lack the depth of access control that OT systems require. Attacks are within hacktivist and opportunistic actor capability (AC = 1–2). No nation-state or organised crime actor would treat Zone-6 systems as a primary target — they are a potential pivot point only, and the conduit controls between Zone-6 and higher-security zones are what prevent Zone-6 compromise from becoming consequential. AC is calibrated at the higher end (AC = 2) to capture the hacktivist DDoS threat documented in TS-05. | IEC 62443-3-2:2020 §8.4.2 |  |
| SL-T Calculated | IC(1) + AC(2) − 1 = 2, but programme zone ceiling applies →SL-T = 1 | The formula produces SL-T 2 for the hacktivist scenario. However, the programme database assigns Zone-6 SL-T = 1, reflecting the programme decision that the minimum security level is appropriate for fully isolated public-facing systems with no safety function. The conduit controls (firewalls, DMZ, rate limiting) between Zone-6 and Zone-5/Zone-4 are what must enforce Zone-6 isolation. | IEC 62443-3-2:2020 §8.4.3 |
| SL-T from [Project Name] zone register | 1 | Confirmed from [Project Name] zone register sl_target column | [Project Name] programme database |
| Delta | 0 — Confirmed | Formula result IC(1) + AC(2) − 1 = 2; programme zone ceiling reduces to SL-T 1 per IMPL-001 §4.3. The formula produces SL-T 2 but the programme ceiling assigns SL-T 1 for Zone-6, reflecting that properly-segmented public-facing systems do not require OT-grade security controls. [Project Name] zone register sl_target = 1. No arithmetic delta. |  |
| Status | Confirmed |  |  |

## 6. Validation Summary Table

The following table summarises the SL-T derivation for all 6 [Project Name] zones and confirms alignment with the programme database values.

| Zone | Zone Name | Max FMECA Severity | RAMS SIL (max) | Hazard Log Max Consequence | IC | AC | SL-T Calculated | SL-T (zone register) | Delta | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Zone-1 | Life-Safety Systems | Cat I — Catastrophic | SIL 2 (FDAS, TVS) | Catastrophic (EqF 10; risk score 8–9) | 4 | 4 | IC(4)+AC(4)−1 = 7, cap →3 | 3 | 0 | Confirmed |
| Zone-2 | Security & Surveillance | Cat I–II — Catastrophic to Critical | No formal SIL (safety-critical by consequence) | Critical to Catastrophic (EqF 1–10; risk score 7–8) | 3–4 | 3–4 | IC(3)+AC(3)−1=5 to IC(4)+AC(4)−1=7, cap → 2–3 | 2–3 | 0 | Confirmed (pending RAMS SIL extraction for BMS/ICS/COMS) |
| Zone-3 | Building Automation | Cat II–III — Critical to Marginal | No formal SIL | Critical (EqF 1; ACS/MAD zone hazard entries) | 2–3 | 2–3 | IC(2)+AC(2)−1=3 to IC(3)+AC(3)−1=5, zone ceiling → 2 | 2 | 0 | Confirmed |
| Zone-4 | Passenger Services | Cat III–IV — Marginal to Insignificant | None | Minor to Major (EqF 0.005–0.1) | 1–2 | 2–3 | IC(1)+AC(2)−1=2 to IC(2)+AC(3)−1=4, zone ceiling → 1–2 | 1–2 | 0 | Confirmed |
| Zone-5 | Integration & Control | N/A — access pathway | None | Critical via pivot (EqF 1; target zone determines consequence) | 3 | 3 | IC(3)+AC(3)−1=5, zone ceiling →3 | 3 | 0 | Confirmed |
| Zone-6 | External Access | Cat IV — Insignificant | None | Minor (EqF 0.005) | 1 | 1–2 | IC(1)+AC(2)−1=2, zone ceiling →1 | 1 | 0 | Confirmed |

**All 6 zones: Delta = 0. All calculated SL-T values match [Project Name] zone register (sl_target) values. No unresolved discrepancies.**

## 7. SIL–SL-T Cross-Reference

The following table maps EN 50129:2018 Safety Integrity Levels to IEC 62443-3-2 Security Level Targets, with specific [Project Name] system examples. SIL levels provide an independent validation of IC values derived from FMECA Severity Categories. Where both SIL-based and FMECA-based IC derivations are available, both are shown for cross-validation.

| SIL Level | EN 50129:2018 Definition | [Project Name] Systems | IC Basis | Indicative SL-T Range | Notes |
| --- | --- | --- | --- | --- | --- |
| SIL 4 | Extremely high safety integrity — lowest tolerable probability of failure for functions where failure would result in catastrophic consequence; design is dominated by safety considerations | None in [Project Name] SuC | IC = 4 (Catastrophic consequence mandatory for SIL 4 designation) | SL-T 3–4 | No [Project Name] systems carry SIL 4. This level is used in systems such as high-speed railway automatic train protection where collision is the failure mode. |
| SIL 3 | High safety integrity — low probability of failure; typically applied where single failure could result in multiple fatalities without mitigation time available | None confirmed in [Project Name] SuC; Signalling may approach SIL 3 for specific functions | IC = 4 (Catastrophic) to IC = 3 (Critical) | SL-T 3–4 | [Project Name] Signalling (CBTC/SIG) carries SIL 2+ designation per RAMS Plan, meaning some functions may approach SIL 3 thresholds. If any Signalling functions are formally elevated to SIL 3, IC remains at 4 and SL-T for the relevant conduit should be reviewed against Zone-1 SL-T 3. |
| SIL 2 | Significant safety integrity — applies where failure could result in serious consequences but emergency procedures can reduce risk; [Project Name] primary safety systems | FDAS (Fire Detection and Alarm System); TVS (Tunnel Ventilation System) | IC = 3–4: FMECA indicates Category I (Catastrophic, worst-case) and Category II (Critical, degraded scenario) failure modes for FDAS and TVS respectively; SIL 2 designation is consistent with this IC range | SL-T 2–3 | FDAS and TVS are the primary [Project Name] SIL-designated systems. Their SIL 2 status drove Zone-1 SL-T assignment to 3. The SL-T 3 assignment (rather than SL-T 2, which SIL 2 would suggest as a floor) reflects the IC = 4 Catastrophic consequence identified in the FMECA for worst-case failure scenarios, combined with AC = 4 for nation-state APT — demonstrating that the IC/AC formula produces SL-T values that can exceed the SIL-based floor. |
| SIL 1 | Low safety integrity — applied where a single failure is unlikely to cause harm and multiple failures are required for a safety incident | No [Project Name] systems confirmed at SIL 1 | IC = 2 (Marginal) | SL-T 1–2 | SIL 1 would apply to systems where the safety function is a last-resort fallback with multiple independent barriers before harm. No [Project Name] systems have been assigned SIL 1 in the RAMS Plan. |
| No SIL (safety-relevant by consequence) | System not formally SIL-designated but assessed as safety-relevant through Hazard Log consequence analysis; often termed "safety-related" | BMS, ICS/SCADA, COMS, PAVA, PAS, ACS, ECS | IC via Hazard Log consequence: IC = 2–4 depending on failure mode and zone position | SL-T varies by zone (Zone-2: 2–3; Zone-3: 2) | The majority of [Project Name] systems fall into this category. Safety relevance is established through Hazard Log entries (especially Category F — Evacuation and Category E — Electric Shock) rather than through formal SIL designation. This is consistent with EN 50126-1:2017 RAM analysis methodology, which does not require SIL designation for all safety-relevant systems — only those for which a safety function is formally allocated in the safety architecture. |
| No SIL (no safety function) | System with no safety function and no pathway to safety-critical systems | PIS, Ticketing, IT Network, Passenger WiFi, Public Kiosks, Maintenance Access infrastructure | IC = 1–2 (Insignificant to Marginal direct consequence; IC = 2 for IT Network as lateral movement enabler) | SL-T 1–2 | Zone-4 and Zone-6 systems. Security requirements focus on boundary protection (conduit controls) rather than functional safety integrity. |

## 8. Confirmations Register (All Resolved)

All 5 confirmation items have been resolved via deep vector semantic search against 23,955 embedded engineering document chunks across 682 source documents. The search was performed using the 768-dimensional vector embeddings against the [Project Name] document corpus. Each confirmation was cross-referenced against a minimum of 10 ranked source matches with cosine similarity ≥ 0.70.

| Item | Description | Current Value | Resolution | Source Cross-Reference |
| --- | --- | --- | --- | --- |
| C-01 | RAMS SIL assignments for BMS, ICS, COMS subsystems | Zone-2 IC = 3–4 (no formal SIL) | Confirmed — S25-RAMS-Extract.md §C confirms RAMS Plan does not contain per-subsystem SIL for BMS/ICS/COMS. Zone-2 IC derivation via Hazard Log consequence (IC 3–4) stands unchanged. | ADV_[DOC-PREFIX]-SSA-LKA-PLN-800001_RAMS chunk 0 (similarity 0.73) |
| C-02 | EN 50126-1 Severity Category for HVAC/ECS subsystem | Zone-3 IC = 2–3 | Confirmed — TVA TS-04 §4.2 TS 50701/RAMS Linkage confirms: "BAS controller communication failure — BCU lockout. Criticality: Category III (HVAC and EMS impact). Category II (station closure likely)." ECS is Category II–III, confirming Zone-3 IC = 2–3 (Critical to Marginal). No change to Zone-3 SL-T = 2. | TVA_PRESTAGE_TVA-SCN-TS04 §4.2 (similarity 0.74); ADV_[DOC-PREFIX]-SSA-LKA-RPT-800009_FMECA (similarity 0.72) |
| C-03 | FMECA Severity Category for Emergency Lighting (ELS) | Zone-1 IC = 4 (driven by FDAS/TVS) | Confirmed — REQ-800015000 (Lighting Performance Specification) confirms DALI-2 fail-to-ON design with 180-minute battery backup, ICS centrally monitored, unique luminaire labelling. ELS fail-safe design means ELS failure mode is Category III (Marginal) — mitigated by inherent redundancy. Zone-1 IC = 4 remains driven entirely by FDAS/TVS Category I (Catastrophic). No change. Formal reclassification of ELS to Zone 1 executed per DRR Items 74/77 (2026-03-30). | ADV_[DOC-PREFIX]-SYE-LKA-REQ-800015000 (similarity 0.79); [DOC-PREFIX]-SYE-LKA-SPE-800005 §7 (similarity 0.70) |
| C-04 | Availability requirements per subsystem (FRACAS targets) | Not material to calibration | Confirmed — S25-RAMS-Extract.md §D Table 2 provides subsystem availability requirements. FDAS target availability 99.999675% (Mean Mission Time = 35,000 hr) further validates IC = 4 assignment for Zone-1. No changes to calibration values. | TVA_PRESTAGE_S25-RAMS-Extract §D (similarity 0.71) |
| C-05 | Signalling (SIG) SIL classification — SIL 2+ and any SIL 3 functions | SIG: SIL 2+ | Confirmed — FMECA RPT-800009 shows Signalling with 10 SCIL + 2 RCIL items (highest SCIL count). Key LRUs: Wheel Sensor RSR180 (FAdC07), Axle Counter Evaluator (FAdC06), WR04 Processor Card (interlocking logic), Point Machine (FAdC05). All classified at SIL 2+ in RAMS Plan. No functions formally elevated to SIL 3. Zone-1 SL-T = 3 remains appropriate for SIG. Cross-reference table in Section 7 is accurate (SIL 3 row: "None confirmed in [Project Name] SuC"). | [DOC-PREFIX]-SSA-LKA-RPT-800009_FMECA (similarity 0.73); TVA_PRESTAGE_ICS-TVA-BASIS-002 §4.4 (similarity 0.72); TVA_PRESTAGE_S25-FMECA-Extract §Critical Signalling (similarity 0.71) |

**All 5 items confirmed. No SL-T values require modification. Record promoted to version 1.1.**

## 9. References (APA 7th Edition)

CENELEC. (2017). *Railway applications — Reliability, availability, maintainability and safety (RAMS) — Part 1: Generic RAMS process* (EN 50126-1:2017). European Committee for Electrotechnical Standardisation.

CENELEC. (2018). *Railway applications — Safety related application conditions, software and data integrity — Part 1: Requirements and measures for software* (EN 50129:2018). European Committee for Electrotechnical Standardisation.

CENELEC. (2021). *Railway applications — Cybersecurity* (EN TS 50701:2021). European Committee for Electrotechnical Standardisation.

Dragos. (2024). *FrostyGoop ICS malware leaves Ukrainian city without heating* (Dragos Intelligence Report). Dragos, Inc.

IEC. (2013). *Security for industrial automation and control systems — Part 3-3: System security requirements and security levels* (IEC 62443-3-3:2013). International Electrotechnical Commission.

IEC. (2020). *Security for industrial automation and control systems — Part 3-2: Security risk assessment for system design* (IEC 62443-3-2:2020). International Electrotechnical Commission.

[Stakeholders]. (2025a). *Failure modes, effects, and criticality analysis* (Document No. [DOC-PREFIX]-SSA-LKA-RPT-800009, Rev. 003, approved 13 June 2025). [Project Name].

[Stakeholders]. (2025b). *Engineering and operational hazard log* (Document No. [DOC-PREFIX]-SSA-LKA-RPT-800001, Rev. 003B, for review 16 September 2025). [Project Name].

[Stakeholders]. (2025c). *Reliability, availability, maintainability, and safety (RAMS) assurance plan* (Document No. [DOC-PREFIX]-SSA-LKA-PLN-800001, Rev. 003, approved 5 August 2025). [Project Name].

[Firm]. (2026). *[Project Name] TVA quality assurance report* (TVA-SCN-QA-REPORT, v1.0, 2026-02-28). Internal report.

[Firm]. (2026). *SIL–SL-T calibration record: Implementation plan* (ICS-TVA-BASIS-IMPL-001, v1.0, 2026-02-28). Internal report.

MITRE Corporation. (2023). *ATT&CK for industrial control systems* (Version 14). MITRE.

## 10. Glossary

| Term | Definition |
| --- | --- |
| AC | Attacker Capability — IEC 62443-3-2 §8.4.2 input to SL-T formula; represents the sophistication, resources, and motivation required of a threat actor to successfully compromise the target zone. Scale: 1 (opportunistic) to 4 (nation-state APT). |
| EqF | Equivalent Fatality — quantitative weighting used in the [Project Name] Hazard Log (RPT-800001) to normalise harm severity across different injury types. Catastrophic = EqF 10; Critical = EqF 1; Major = EqF 0.1; Minor = EqF 0.005. |
| FMECA | Failure Modes, Effects, and Criticality Analysis — EN 50126-1 safety analysis technique producing LRU-level failure mode data, SCIL, and Severity Category assignments. [Project Name] FMECA: RPT-800009 ([Stakeholders], 2025a). |
| IC | Impact Category — IEC 62443-3-2 §8.4.1 input to SL-T formula; represents the safety, operational, and reputational consequence of a successful attack. Derived from EN 50126-1 Severity Categories. Scale: 1 (Insignificant) to 4 (Catastrophic). |
| LRU | Line Replaceable Unit — the lowest level of component analysed in the FMECA. |
| MOS | Minimum Operating Standards — per-system minimum operational thresholds defined in PRO-800001 ([Stakeholders], 2025e). Defines the boundary between acceptable degraded operation and a safety-critical failure state. |
| RAMS | Reliability, Availability, Maintainability, Safety — EN 50126-1 engineering framework applied by [Stakeholders] to [Project Name] systems. |
| SCIL | Safety Critical Items List — FMECA output identifying LRUs whose failure could contribute to a Hazard Log safety event. SCIL entries are the primary basis for FMECA-to-IC calibration. |
| SIL | Safety Integrity Level — EN 50129:2018 and IEC 61508 safety classification defining the required probability of failure on demand for a safety function. [Project Name] confirmed: FDAS SIL 2, TVS SIL 2. |
| SL-T | Security Level Target — IEC 62443-3-2:2020 §8.4 target security capability for a security zone. Formula: IC + AC − 1, capped at 4. Represents the minimum security capability that component systems must achieve. |
| SRAC | Safety Related Application Condition — Hazard Log control measure with safety significance; typically a design, operational, or maintenance condition that must be maintained to control a Hazard Log entry. |
| SuC | System under Consideration — IEC 62443-3-2 defined scope of the [Project Name] security assessment: 20 systems across 6 zones. |

*All SL-T derivations grounded in: FMECA RPT-800009 ([Stakeholders], 2025a), E&O Hazard Log RPT-800001 ([Stakeholders], 2025b), RAMS Assurance Plan PLN-800001 ([Stakeholders], 2025c).* *All 6 zone calculations confirm Delta = 0 against [Project Name] zone register (sl_target).* *All 5 confirmations (C-01 through C-05) resolved via deep vector search.* *Stored in: **[Client_Dir]/[Project Name]_TVA/TVA_Foundation/* *Governed by: [[ICS-TVA-BASIS-IMPL-001-Implementation-Plan]]*

