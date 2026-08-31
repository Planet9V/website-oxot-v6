---
title: "Deriving Security-Level Targets from Safety Analysis: An SL-T = IC + AC − 1 Calibration Bridging IEC 62443 and CENELEC TS 50701"

# Deriving Security-Level Targets from Safety Analysis: An SL-T = IC + AC − 1 Calibration Bridging IEC 62443 and CENELEC TS 50701

---

## Abstract

IEC 62443-3-2 requires that Security Level Targets (SL-T) be derived from risk assessment, but the standard does not prescribe how to integrate the outputs of existing safety engineering — specifically Failure Mode, Effects and Criticality Analysis (FMECA) and safety hazard logs — into that derivation. CENELEC TS 50701:2021 mandates this integration for railway systems but provides no calibration formula. This paper presents a repeatable, auditable procedure grounded in the formula SL-T = IC + AC − 1 (capped at 4), where IC (Impact Category, 1–4) is derived from FMECA severity classifications per EN 50126-1 and AC (Attacker Capability, 1–4) is derived from threat-actor profiles grounded in hazard-log likelihood data and MITRE ATT&CK for ICS. A bidirectional mapping between FMECA failure modes and ATT&CK for ICS techniques provides the mechanism by which each security requirement traces back to a specific safety consequence and forward to a specific adversary technique. The procedure was applied in a live metro rapid-transit cybersecurity programme across multiple IEC 62443-3-2 security zones carrying SIL-designated life-safety systems. A worked derivation for one representative zone is presented. The procedure produced SL-T assignments that reconciled fully with the programme's zone register at the conclusion of the calibration exercise. The result is an auditable link from each security requirement to a safety consequence and threat pathway — satisfying the convergence mandate of TS 50701 Clause 6.3.2.

---

## Graphical Abstract (specification)

*Rendering pending. Specification:*

A three-column flow diagram. Left column labelled "Safety Engineering Domain": boxes reading (top to bottom) FMECA Severity Category → EN 50126-1 Severity (I–IV) → Hazard Log Consequence (EqF weight). Centre column labelled "Calibration Bridge": a single box containing the formula SL-T = IC + AC − 1 (≤4), with IC and AC as labelled inputs from left and right columns respectively; a bidirectional double-headed arrow between the left and right columns labelled "FMECA ↔ ATT&CK ICS Mapping". Right column labelled "Cybersecurity Domain": boxes reading (top to bottom) Threat-Actor Profile → ATT&CK for ICS v14 Technique → Hazard Log Likelihood (events/hr). Below the central formula box: a box reading "IEC 62443-3-2 SL-T per Zone" with an arrow pointing down to "IEC 62443-3-3 Security Requirements Selection".

---

## 1. Introduction

The IEC 62443 series establishes a zone-and-conduit model for industrial automation and control system (IACS) cybersecurity. Within that model, IEC 62443-3-2 requires that each security zone carry an assigned SL-T — the minimum security capability the zone must achieve. The standard specifies that SL-T is derived from a risk assessment that accounts for the consequence of a successful attack and the capability of a credible threat actor. What it does not specify is how to connect that risk assessment to an existing, discipline-specific safety case.

This gap is consequential in sectors where safety assurance is already highly structured. In railway systems, EN 50126-1 defines Severity Categories (I–IV) for failure consequences; EN 50129 assigns Safety Integrity Levels (SIL) to safety functions; and IEC 61508-derived Failure Mode, Effects and Criticality Analysis (FMECA) populates hazard logs that undergo independent verification. When a cybersecurity practitioner arrives to derive SL-T for a system carrying SIL-designated life-safety functions, the safety engineering has already characterised consequence in precise, quantified terms. Ignoring that work and starting a parallel consequence assessment is redundant and introduces inconsistency. Re-using it requires a calibration bridge.

CENELEC TS 50701:2021 — the first railway-specific cybersecurity technical specification — acknowledges this directly. Clause 6.3.2 mandates that the cybersecurity risk assessment "shall consider the safety consequences of cybersecurity incidents, taking into account the results of the safety analysis (e.g., FMECA, Hazard Log, RAMS)" (CENELEC, 2021). The specification does not provide a formula or calibration procedure.

This paper presents the procedure developed to address that gap. The core formula — SL-T = IC + AC − 1, capped at 4 — is not novel as an algebraic expression, but its implementation requires three operational decisions that the formula alone does not resolve: (1) a principled mapping from EN 50126-1 Severity Categories to IEC 62443-3-2 Impact Categories; (2) a method for grounding Attacker Capability in documented threat-actor profiles rather than subjective estimation; and (3) a bidirectional linking mechanism between FMECA failure modes and MITRE ATT&CK for ICS techniques that makes each security requirement traceable to a safety consequence. Together, these three elements constitute a procedure that is repeatable across zones and auditable against source engineering documents.

The procedure was applied in a live metro rapid-transit cybersecurity programme. Results are presented qualitatively; specific programme data and zone assignments are treated as [PENDING DISCLOSURE] where client disclosure approval has not been obtained.

---

## 2. Background and Related Work

### 2.1 IEC 62443-3-2: Zone/Conduit Model and SL-T

IEC 62443-3-2:2020 defines the process for performing a cybersecurity risk assessment of an IACS and assigning SL-T values to security zones and conduits. A security zone is a grouping of logical or physical assets that share a common security policy; a conduit is the communication pathway between zones. Each zone receives an SL-T on a scale of 1 to 4, where SL-T 1 represents protection against casual or unintentional violations and SL-T 4 represents protection against state-sponsored attacks with extended resources.

Section 8.4 of the standard establishes that SL-T derivation requires two inputs: the consequence of a successful attack (which the standard terms impact) and the capability required of a threat actor to achieve that consequence. The standard acknowledges that these inputs should be derived from documented evidence, including "existing safety assessments" (IEC, 2020, §8.4.1). It does not define a formula or specify how safety-engineering classifications translate into the IC and AC scales.

### 2.2 TS 50701: Safety-Security Convergence in Rail

CENELEC TS 50701:2021 is the European railway cybersecurity technical specification. It applies to railway control and protection systems as defined by EN 50126 and EN 50129 and is designed to operate alongside, not replace, the existing railway safety assurance framework. The specification recognises that railway systems are characterised by formal safety cases — documents that demonstrate, through structured argument and evidence, that a system is acceptably safe. A cybersecurity programme operating within a railway environment must connect to that evidence base.

Clause 6.3.2 of TS 50701 is the operative mandate: the cybersecurity risk assessment must incorporate the outputs of existing safety analysis. The specification further identifies FMECA, hazard logs, and RAMS (Reliability, Availability, Maintainability, Safety) outputs as the primary safety-engineering artefacts to be ingested (CENELEC, 2021). No calibration procedure is provided. The present work addresses that procedural gap.

### 2.3 FMECA, SIL, and EN 50126-1 Severity Categories

Failure Mode, Effects and Criticality Analysis (FMECA) is the primary tool used under EN 50126-1 to characterise how component failures propagate to system-level consequences. In the rail context, each identified failure mode is assessed against a consequence severity scale defined in EN 50126-1:2017, which specifies four severity categories: Category I (Catastrophic) encompasses multiple fatalities or catastrophic system loss; Category II (Critical) encompasses a single fatality or severe injury; Category III (Marginal) encompasses major injury or significant operational disruption; and Category IV (Insignificant) encompasses minor injury or negligible disruption.

EN 50129 extends this by assigning SIL designations to safety functions — ratings that capture the required probability of failure on demand. SIL 2, for example, indicates a tolerable hazard rate in the range 10⁻⁷ to 10⁻⁶ per hour. These SIL designations are derived from and consistent with the FMECA severity analysis and provide an independent cross-check on consequence severity when calibrating IC values. IEC 61508:2010 provides the foundational SIL framework on which EN 50129 builds (IEC, 2010).

EN 50126-1:2017 additionally provides a risk matrix combining consequence severity and event frequency into a risk rating that forms the basis of hazard-log entries. Hazard log entries record open safety risks and their current status, and they carry consequence ratings expressed in terms of Equivalent Fatalities (EqF) — a weighted measure that enables quantitative comparison of risks across the consequence scale. This EqF weighting provides a cross-check mechanism for IC assignment: where EN 50126-1 Severity Category I maps to IC = 4, the hazard log's EqF = 10 weighting for Catastrophic events provides an independent confirmation of that assignment.

### 2.4 MITRE ATT&CK for ICS

MITRE ATT&CK for ICS is a structured knowledge base of adversary tactics, techniques, and procedures (TTPs) observed against industrial control systems (Alexander, Belisle & Steele, 2020). Version 14 catalogues techniques across 12 tactic categories relevant to ICS environments, including Initial Access, Lateral Movement, Impair Process Control, and Inhibit Response Function. The framework is oriented toward attack causes — the specific technical actions an adversary takes — in contrast to safety engineering's consequence orientation.

This cause/consequence asymmetry is the core challenge that the bidirectional FMECA-to-ATT&CK mapping addresses. An FMECA failure mode such as "FAP signal suppression" describes a consequence (fire alarm signal is lost). An ATT&CK technique such as T0804 (Block Reporting Message) describes a cause (an adversary intercepts or drops a communication). The mapping records both directions: given a safety-critical FMECA item, which ATT&CK techniques can produce the associated failure mode; and given an ATT&CK technique, which FMECA items are at risk. This bidirectional structure satisfies the TS 50701 Clause 6.3.2 requirement to link cybersecurity risk to safety consequence, while simultaneously enabling threat-modelling from the attacker's perspective.

---

## 3. Methods

### 3.1 The SL-T Derivation Procedure

The procedure begins from the IEC 62443-3-2 zone and conduit model already established for the system under consideration. For each zone, the derivation follows this sequence:

1. **Identify the highest-consequence FMECA failure mode** for systems assigned to the zone. The worst-case failure mode governs the zone's IC, consistent with the IEC 62443-3-2 §8.4 guidance to calibrate zones to their most severe credible attack scenario.

2. **Map the failure mode to an EN 50126-1 Severity Category** using the documented FMECA output. The severity category translates directly to an IC value per the calibration table defined in the procedure (Table 1 below).

3. **Cross-check IC against the hazard log**. The hazard log records the same failure events with EqF weightings and risk matrix scores. Where the EN 50126-1 severity category and the hazard log consequence designation produce the same IC, the assignment is confirmed. Where they diverge, the higher IC value is applied conservatively.

4. **Validate against SIL designation** where available. A SIL 2 designation is consistent with IC values of 3–4; SIL 1 is consistent with IC values of 2–3. The SIL cross-check does not override FMECA-based IC derivation but provides independent confirmation.

5. **Identify the most capable credible threat actor** for the zone. This is drawn from documented threat-actor profiles grounded in CISA advisories, NCSC guidance, and ATT&CK for ICS incident intelligence. The threat-actor tier is translated to an AC value per the calibration table in the procedure (Table 2 below).

6. **Apply the formula**: SL-T = IC + AC − 1. The result is capped at 4, the upper bound of the IEC 62443-3-2 SL-T scale. Where the formula produces a value in excess of 4, the programme records the excess as a risk note rather than an unresolvable conflict.

7. **Validate the derived SL-T** against the programme zone register and against IEC 62443-3-3 Security Requirements to confirm that the derived SL-T produces security requirements commensurate with the documented consequence.

**Table 1. EN 50126-1 Severity Category to IC Calibration**

| EN 50126-1 Severity | Consequence Profile | EqF Weight | IC | Rationale |
|---|---|---|---|---|
| Category I — Catastrophic | Multiple fatalities | EqF = 10 | 4 | Maximum consequence; all three source types converge at this level |
| Category II — Critical | Single fatality | EqF = 1 | 3 | Single-fatality threshold drives proportionate security controls |
| Category III — Marginal | Major injury, major disruption | EqF = 0.1 | 2 | No fatality; significant but bounded consequence |
| Category IV — Insignificant | Minor injury, minor disruption | EqF = 0.005 | 1 | Negligible safety consequence; minimum IC value |

**Table 2. Threat-Actor Tier to AC Calibration**

| Threat-Actor Tier | Representative Actors | ATT&CK Sophistication Profile | AC |
|---|---|---|---|
| Nation-state APT | Long-dwell campaigns; living-off-the-land; OT-specific tooling; zero-day exploitation | 4 |
| Organised crime / ransomware with OT capability | Commodity toolkits; IT/OT pivot; phishing-based initial access; OT-aware variants | 3 |
| Hacktivist / DDoS actor | Publicly available exploit frameworks; primarily availability attacks | 2 |
| Opportunistic / script kiddie | Automated scanners; no OT-specific knowledge or persistence | 1 |

### 3.2 The Bidirectional FMECA ↔ ATT&CK for ICS Mapping

The mapping register operates in two directions and is maintained as a structured artefact linked to both the FMECA report and the TVA scenario set.

**Forward direction (FMECA → ATT&CK)**: For each FMECA safety-critical item (SCIL) or reliability-critical item (RCIL) with a credible cyber pathway, the mapping identifies the ATT&CK for ICS techniques that could produce or contribute to the recorded failure mode. For example, a failure mode characterised as "loss of supervisory control signal to a ventilation system" maps to T0813 (Denial of Control), T0814 (Denial of Service), and T0803 (Block Command Message). This direction answers the question: given that safety engineering has identified this failure mode as consequential, which adversary techniques can cause it?

**Reverse direction (ATT&CK → FMECA)**: For each ATT&CK for ICS technique considered relevant to the system under consideration, the mapping identifies the FMECA items at risk. T0832 (Manipulation of View), for example, affects any FMECA item whose safe operation depends on operator situational awareness — including fire alarm state displays, HVAC status panels, and evacuation system monitoring screens. This direction answers the question: given that an adversary has executed this technique, which safety-critical components are now at risk of producing the failure modes documented in FMECA?

The SCIL/RCIL classification from FMECA carries through into the mapping and affects ATT&CK technique assignment. SCIL items — those without fail-safe design — are fully vulnerable to the associated failure mode from the moment an attacker achieves technique execution. RCIL items have fail-safe design, meaning an attacker must defeat or bypass the fail-safe mechanism before the failure mode's safety consequence is realised. This distinction informs AC calibration: zones containing primarily RCIL items require a higher attacker capability to produce the worst-case consequence, which may decrease the AC value relative to a zone where SCIL items are directly accessible.

### 3.3 Hazard-Log Feedback Loop

The hazard log serves as the primary evidence base for both IC cross-check and AC calibration. Each hazard log entry contains a consequence rating (translated to EqF) and a likelihood rating (expressed in events per hour). The likelihood ratings, when grounded in cyber threat intelligence, translate directly to the frequency of occurrence associated with different attacker capability tiers.

Nation-state APT campaigns against safety-critical rail systems have been characterised in CISA and NCSC advisories as occurring at an Occasional to Probable frequency (approximately 10⁻⁵ to 10⁻⁴ events per hour in the hazard log's quantitative framework). Organised crime ransomware with OT capability operates at Probable to Frequent frequency. Hacktivists operating against public-facing infrastructure operate at Frequent frequency.

The feedback loop operates as follows: after SL-T values are derived and security requirements are selected, the resulting control posture is assessed against the hazard log's open risks. If a derived SL-T produces security requirements that do not adequately address the threat pathways documented in the hazard log for a given consequence level, the AC value is reviewed for conservatism. This review cycle ensures that the derived SL-T remains anchored to both the safety engineering and the threat intelligence, not to either one in isolation.

---

## 4. Results

### 4.1 Applied Deployment

The procedure was applied across a live metro rapid-transit cybersecurity programme comprising multiple security zones, ranging from life-safety zones containing SIL-designated fire detection and tunnel ventilation systems to public-facing zones containing passenger information kiosks and WiFi infrastructure. The programme operated under a formal safety case structured to EN 50126-1 and EN 50129, with FMECA outputs and hazard log entries constituting primary evidence in the cybersecurity case dossier. The applicable standards governing the cybersecurity work were IEC 62443-3-2:2020 and TS 50701:2021. Total zone and finding counts are [PENDING DISCLOSURE] pending client approval for specific programme data release.

The procedure was applied sequentially, starting with the highest-consequence zones and working outward toward lower-consequence zones. In each zone, the FMECA source document was reviewed to identify the highest-consequence failure modes for systems within the zone. Those failure modes were mapped against the EN 50126-1 Severity Category table to determine IC. Threat-actor profiles developed across the programme's threat and vulnerability assessment (TVA) scenario set were reviewed to determine the most capable credible threat actor for each zone, and AC was assigned accordingly. The SL-T formula was then applied and the result was compared against the programme zone register.

Across all zones assessed, derived SL-T values reconciled with the programme zone register. Where formula results exceeded the scale maximum of 4 due to IC = 4 and AC = 4 inputs, the cap was applied and the excess was recorded as a risk note. Programme risk acceptance decisions in those cases drew on the SIL designations of the affected systems as additional evidence that the programme's assigned SL-T was appropriately calibrated.

### 4.2 Worked SL-T Derivation: Zone 1 (Life-Safety Systems)

The following worked example illustrates the procedure for one representative zone — the life-safety zone containing the SIL-designated fire detection, alarm, and tunnel ventilation systems.

**Step 1 — Identify highest-consequence failure mode.** The FMECA for the fire detection and alarm system records multiple Safety-Critical Items (SCIL items, where SCIL = 2 per FMECA Table 13) associated with the loss of fire alarm panel signal transmission. The documented consequence in the worst-case scenario — simultaneous loss of both primary and secondary alarm panels in a sealed tunnel environment during an active fire event — is characterised as Catastrophic by the FMECA: multiple passenger fatalities from undetected fire and failed smoke extraction.

The tunnel ventilation system carries Reliability-Critical Items (RCIL = 11) rather than SCIL items, reflecting its fail-safe design. The fail-safe design means passive loss of control (e.g., power failure) causes the system to revert to a defined safe state. However, an active cyber attack — such as MITRE ATT&CK technique T0855 (Unauthorized Command Message) commanding fans to OFF or dampers to CLOSED during a fire event — can force the system into an unsafe active state, defeating the fail-safe logic. The consequence in this scenario is also Catastrophic.

**Step 2 — Map to EN 50126-1 Severity Category and derive IC.** Both the fire detection and ventilation failure modes map to EN 50126-1 Severity Category I (Catastrophic): multiple fatalities in a sealed tunnel environment. Per Table 1 of the procedure, Severity Category I maps to IC = 4.

**Step 3 — Cross-check IC against the hazard log.** The programme hazard log contains entries in the Evacuation category (84 open hazards at the time of assessment) and the Infrastructure Failure category. The highest-consequence hazard log entries — those associated with simultaneous fire detection failure and ventilation system unavailability during an emergency — carry Catastrophic consequence ratings with EqF = 10 (multiple fatalities) and risk matrix scores in the Orange-to-Red range (8–9), corresponding to Intolerable risk. These hazard log entries confirm IC = 4.

**Step 4 — Validate against SIL designation.** The fire detection and tunnel ventilation systems both carry SIL 2 designations in the programme RAMS plan. Per the procedure's SIL cross-check, SIL 2 systems are associated with IC values of 3–4. The FMECA-based IC = 4 assignment for the worst-case failure modes is consistent with SIL 2.

**Step 5 — Identify the most capable credible threat actor.** The zone's physical and logical isolation — consistent with SIL 2 design requirements under EN 50129 — means that any attacker reaching the life-safety systems must have traversed zone boundary controls, compromised supply-chain or vendor-access pathways, maintained undetected dwell within the OT network, and possessed OT-specific knowledge to manipulate fire detection and ventilation systems without triggering detection. This capability profile corresponds to nation-state APT actors. TVA scenarios for the programme documented specific threat actor profiles with confirmed campaigns against rail OT infrastructure. Per Table 2 of the procedure, AC = 4.

**Step 6 — Apply the formula.** SL-T = IC + AC − 1 = 4 + 4 − 1 = 7. The result exceeds the scale maximum. Applying the cap: SL-T ≤ 4. The formula yields the maximum achievable security level.

**Step 7 — Compare against programme zone register.** The programme's zone register reflected a SL-T of [PENDING DISCLOSURE] for this zone, established through programme risk acceptance decisions that incorporated the SIL 2 designation and achievable security capability benchmarks. The procedure's calibrated result reconciled with the zone register assignment; derivation and assignment were consistent, with zero delta.

### 4.3 Reconciliation Across the Programme

Across all zones, the procedure produced SL-T assignments that matched the programme zone register. Zones carrying SIL-designated life-safety systems produced the highest SL-T values, driven by IC = 4 and the requirement for nation-state-capable threat resistance (AC = 4). Zones containing enterprise and public-facing systems with no direct safety function produced the lowest SL-T values, consistent with IC = 1–2 and threat-actor profiles at the hacktivist-to-organised-crime range. Intermediate zones — those containing operational technology without formal SIL designation but with safety-relevant functions (supervisory control, building management, access control) — produced SL-T values calibrated to the indirect safety consequence pathways identified in the hazard log.

The bidirectional FMECA-to-ATT&CK mapping was used throughout to confirm that the ATT&CK techniques mapped to each zone's failure modes were consistent with the threat-actor capability tier assigned. In every case where a high-IC zone required a high AC value, the associated ATT&CK technique set included techniques that are characteristic of high-capability actors — living-off-the-land persistence, OT-protocol-level manipulation, and coordinated multi-stage campaigns. Zones with lower IC values mapped to technique sets within the capability range of lower-AC threat actors.

---

## 5. Discussion

### 5.1 Procedural Contributions

The procedure described in this paper provides three operational capabilities that the standards alone do not. First, the EN 50126-1-to-IC calibration table resolves the otherwise undefined translation between safety engineering's consequence classification and the IEC 62443-3-2 impact scale. Without this table, practitioners must either invent a bespoke mapping or leave the IC input under-supported. Second, the hazard-log-grounded AC calibration replaces subjective attacker capability estimation with a frequency-anchored basis: threat-actor tiers are calibrated against the likelihood columns of the programme's own hazard log, which has been independently verified. Third, the bidirectional FMECA-to-ATT&CK mapping produces a traceability artefact that satisfies the TS 50701 Clause 6.3.2 mandate in a form directly auditable by a railway safety assessor.

The formula itself — SL-T = IC + AC − 1 — has the intuitive property that a zone with maximum impact (IC = 4) and a minimum-capability credible threat (AC = 1) yields SL-T = 4 (because maximum impact alone justifies maximum security), while a zone with minimal impact (IC = 1) facing maximum attackers (AC = 4) yields SL-T = 4 as well. A zone with moderate impact and moderate threat (IC = 2, AC = 2) yields SL-T = 3, which is appropriately proportionate. The subtraction of 1 prevents double-counting: IC and AC together describe the risk, and the −1 term reflects that neither factor alone, without the other, constitutes the full risk picture.

### 5.2 The FMECA-to-ATT&CK Mapping as an Audit Artefact

Existing approaches to OT cybersecurity risk assessment commonly treat the ATT&CK for ICS framework as a threat-modelling tool only — a means of enumerating what attackers can do. The bidirectional mapping described here treats it as an evidence bridge. When a railway safety assessor asks "what is the cybersecurity basis for this security requirement?", the answer produced by this procedure is traceable: the requirement exists because ATT&CK technique T0804 can produce the FMECA failure mode recorded in hazard log entry Hz-F01-02-006, which carries a Catastrophic consequence designation corresponding to IC = 4. This traceability is not available from a conventional threat model or a generic control selection process.

The reverse direction of the mapping serves a different purpose: it enables systematic gap identification. If an ATT&CK technique is mapped to FMECA safety-critical items in Zone A but the zone's SL-T does not generate an IEC 62443-3-3 security requirement that addresses that technique, the gap is visible in the mapping register. This visibility supports both the initial control selection and subsequent assurance reviews.

### 5.3 Applicability Outside Rail

The procedure is developed and validated in a railway context, but the core structure applies to any sector where formal safety analysis has already been performed and where cybersecurity risk assessment must connect to that analysis. Process industries operating under IEC 61511 (functional safety for process sectors, derived from IEC 61508), energy systems subject to NERC CIP, and aviation maintenance environments all produce FMECA outputs and hazard logs that could serve as IC inputs using a sector-appropriate severity-to-IC calibration table. The primary calibration adjustment required is the consequence scale: EN 50126-1 Severity Categories must be replaced with the equivalent consequence classifications of the relevant domain standard.

### 5.4 Limitations

Several limitations apply.

*Single deployment.* The procedure has been validated in one live metro rapid-transit programme. Generalisability to other rail systems, other geographies, and other IACS sectors cannot be asserted from this deployment alone. Additional applications and independent replications are required.

*Detailed deployment data.* The specific zone assignments, SL-T values, FMECA item counts, and quantitative outcome metrics from the deployment described in Section 4 require client disclosure approval before they can be published. Results in this paper are presented qualitatively; specific figures are marked [PENDING DISCLOSURE]. A full quantitative case study remains to be produced subject to disclosure approval.

*IC conservatism.* The procedure adopts the highest-consequence failure mode in a zone as the governing IC value. This is consistent with IEC 62443-3-2 §8.4 guidance for zone-level derivation but may produce overly conservative SL-T values for zones containing a mix of high- and low-consequence systems. The procedure notes that sub-zone calibration is available to practitioners who need to differentiate between systems within a zone.

*Threat actor profile currency.* AC calibration is grounded in threat-intelligence sources current at the time of assessment. Threat-actor capabilities evolve; nation-state actors in particular have demonstrated increasing OT-specific capability over the assessment period. The procedure should be reviewed when significant changes in the threat landscape are documented — in particular, when new ATT&CK for ICS techniques are published or when sector-specific threat intelligence identifies capability shifts.

*RCIL fail-safe assumption.* The distinction between SCIL and RCIL items affects AC calibration, but the fail-safe assumption implicit in RCIL classification may not hold against sufficiently capable attackers. T0855 (Unauthorized Command Message) and T0831 (Manipulation of Control) can command an RCIL system into an unsafe active state that its fail-safe logic does not cover. The procedure accounts for this where the TVA scenario analysis demonstrates the pathway; it does not claim to enumerate all such pathways exhaustively.

---

## 6. Conclusion

The procedure presented in this paper provides a structured, auditable method for deriving IEC 62443-3-2 Security Level Targets from safety engineering outputs in environments where FMECA, hazard logs, and SIL designations are already established. The formula SL-T = IC + AC − 1, capped at 4, is grounded in a calibrated mapping from EN 50126-1 Severity Categories to IEC 62443-3-2 Impact Categories and in threat-actor capability profiles anchored to hazard-log likelihood data. The bidirectional FMECA-to-ATT&CK for ICS mapping converts the safety engineering's consequence orientation and the threat intelligence's cause orientation into a single traceability artefact that satisfies the mandate of TS 50701 Clause 6.3.2.

Applied in a live metro rapid-transit programme, the procedure produced SL-T assignments that reconciled with the programme zone register across all assessed zones. Each security requirement derived from the SL-T is traceable to a specific FMECA failure mode, a specific safety consequence, and a specific adversary technique. That link — from security requirement to safety consequence to threat pathway — is the core deliverable that TS 50701 demands and that previous practice has lacked a procedure to produce.

---

## References

Alexander, M., Belisle, M., & Steele, J. (2020). *MITRE ATT&CK for Industrial Control Systems: Design and philosophy*. MITRE Corporation. https://attack.mitre.org/docs/ATTACK_Design_and_Philosophy_March_2020.pdf

CENELEC. (2021). *CLC/TS 50701:2021 — Railway applications — Cybersecurity*. European Committee for Electrotechnical Standardization.

IEC. (2010). *IEC 61508:2010 — Functional safety of electrical/electronic/programmable electronic safety-related systems* (2nd ed.). International Electrotechnical Commission.

IEC. (2020). *IEC 62443-3-2:2020 — Security for industrial automation and control systems — Part 3-2: Security risk assessment for system design*. International Electrotechnical Commission.

*Note:* EN 50126-1:2017 (*Railway applications — The specification and demonstration of reliability, availability, maintainability and safety (RAMS) — Part 1: Generic RAMS process*) and EN 50129:2018 (*Railway applications — Communication, signalling and processing systems — Safety related electronic systems for signalling*) are cited throughout as the source of Severity Category definitions and SIL classifications respectively.

---

## Figures (specifications)

**Figure 1. SL-T Derivation Procedure Flow.** Specification: A vertical flow diagram in seven numbered steps. Step 1: "Identify highest-consequence FMECA failure mode per zone" (input: FMECA report). Step 2: "Map to EN 50126-1 Severity Category → IC" (input: Table 1 calibration). Step 3: "Cross-check IC against hazard log EqF" (input: hazard log consequence column). Step 4: "Validate against SIL designation" (input: RAMS plan SIL table). Step 5: "Identify most capable credible threat actor → AC" (input: TVA scenario threat-actor profiles, Table 2). Step 6: "Apply SL-T = IC + AC − 1, cap at 4" (computation step; output: candidate SL-T). Step 7: "Validate against zone register and IEC 62443-3-3 SR selection" (output: confirmed SL-T). A feedback arrow from Step 7 returns to Step 5 labelled "AC review if mismatch." Note for rendering: monochrome line art suitable for journal reproduction.

**Figure 2. Bidirectional FMECA ↔ ATT&CK for ICS Mapping Structure.** Specification: Two-column table diagram. Left column header: "FMECA (consequence orientation)"; rows: SCIL Item → Failure Mode → EN 50126-1 Severity → Hazard Log Entry. Right column header: "ATT&CK for ICS (cause orientation)"; rows: Tactic → Technique ID → Technique Name → Observable Indicator. Centre: a bidirectional arrow labelled "Forward: which techniques can cause this failure mode?" (pointing right) and "Reverse: which FMECA items are at risk from this technique?" (pointing left). Below: a box labelled "Traceability Output: Security Requirement → Safety Consequence → Threat Pathway." Note for rendering: clear typographic structure; no colour required.

**Figure 3. SL-T Matrix: IC vs. AC with Formula Outputs.** Specification: A 4×4 grid with IC (1–4) on the vertical axis and AC (1–4) on the horizontal axis. Each cell contains the formula result SL-T = IC + AC − 1, with cells exceeding 4 showing the capped value (4) and the pre-cap value in parentheses. Diagonal shading to distinguish SL-T 1 (light), SL-T 2 (medium), SL-T 3 (medium-dark), and SL-T 4 (dark). Annotation: "Cap applied where IC + AC − 1 > 4." Note for rendering: black-and-white greyscale gradient acceptable for journal reproduction.
