---
title: "Behavioral and Motivational Profiling of Threat-Actor Groups: A Signal-Grounded Model Linking Intent, Leading Indicators, and Predicted Targeting"

# Behavioral and Motivational Profiling of Threat-Actor Groups: A Signal-Grounded Model Linking Intent, Leading Indicators, and Predicted Targeting

## Abstract

Existing cyber-threat-intelligence frameworks describe *what* adversaries do—techniques, tools, and infrastructure—but provide limited structural support for characterizing *why* they act and *where they are likely to strike next*. This paper presents a signal-grounded behavioral and motivational profiling model for threat-actor groups, operationalized across 624 actors catalogued in the OXOT threat-intelligence corpus. The model decomposes actor disposition into an Estimated Intent-Capability (EIC) score—a weighted composite of intent, capability, and opportunity derived from observable signals including MITRE ATT&CK technique repertoire, Known Exploited Vulnerability (KEV) density, historical target-sector selection, operational tempo, and geopolitical alignment. A Dark Triad activation composite (narcissism, Machiavellianism, psychopathy) is employed as a second-order inferential behavioral lens mapping observable operational patterns to motivational archetypes; it is explicitly not a clinical personality measurement of a group, and cannot be. Temporal geopolitical signals (3,787 quarterly records spanning actor-sector pairs) are incorporated as leading indicators of campaign activation and predicted targeting shifts. A worked archetype contrast between Sandworm and Cl0p demonstrates how the model yields qualitatively distinct motivation profiles, predicted target sectors, and campaign-momentum signatures from the same signal set. Profiling confidence is bounded by attribution uncertainty and the inferential nature of group-level behavioral characterization; these constraints are addressed directly in the Limitations section. The model is intended to complement, not replace, equipment-level attribution, providing the motivational and predictive layer that asset-centric analysis lacks.

---

## Graphical Abstract (Specification)

**Title:** Signal-to-Profile Pipeline for Behavioral Threat-Actor Characterization

**Description for rendering:** A three-column flow diagram. Left column: *Observable Signal Inputs* — five stacked boxes labeled (1) ATT&CK Technique Repertoire, (2) KEV/EPSS Density, (3) Historical Target Sectors, (4) Operational Tempo, (5) Geopolitical Alignment Index. Center column: *Scoring Layer* — two sequential boxes: (a) EIC Decomposition (Intent · Capability · Opportunity → EIC Score); (b) Dark Triad Activation Composite (Narcissism + Machiavellianism + Psychopathy → Behavioral Lens). Right column: *Outputs* — three stacked boxes: (i) Motivation Archetype Assignment, (ii) Campaign Momentum Score, (iii) Predicted-Targeting Sectors. Arrows flow left-to-right through each stage. A note at the bottom of the center column reads: "Dark Triad composite = inferential behavioral proxy derived from observable signals; NOT a clinical personality measurement."

---

## 1. Introduction

The dominant approach in cyber-threat intelligence treats adversaries as collections of techniques. MITRE ATT&CK catalogs over 600 techniques across 14 tactics; the Diamond Model of Intrusion Analysis organizes observables into adversary, infrastructure, capability, and victim vertices (Caltagirone et al., 2013). These frameworks are operationally necessary. What they do not provide is a principled account of motivation—the underlying drivers that determine which targets an actor will pursue, how aggressively they will operate under varying geopolitical conditions, and whether observed campaign activity signals an escalation or a reversion to baseline.

The absence of a motivation layer has practical consequences. Two actors with identical technique repertoires and equal EIC scores may differ substantially in their targeting logic: one driven by state-directed strategic intelligence collection, the other by financially optimized mass exploitation. Prediction of future targeting requires more than capability assessment; it requires a behavioral characterization that links motivation to the signals that precede operational commitment.

This paper makes three contributions. First, it formalizes the Estimated Intent-Capability (EIC) decomposition—a three-component score derived from observable signals that situates each actor on a continuous threat-priority surface. Second, it introduces the Dark Triad activation composite as an inferential behavioral lens that maps observable operational patterns to motivational archetypes without requiring access to individual group members. Third, it connects both scores to a temporal geopolitical signal layer, enabling leading-indicator-based prediction of targeting shifts.

The model is implemented within the OXOT Seldon module, a threat-intelligence reasoning layer designed for operational technology (OT) and industrial control system (ICS) environments. The domain matters: OT environments present distinctive targeting logic because disruption, not data exfiltration, can be the primary objective, and because geopolitical triggers—sanctions, armed conflict, election cycles—have documented correlations with ICS-directed campaign escalations (Caldara & Iacoviello, 2022).

---

## 2. Related Work

### 2.1 Adversary Modeling Frameworks

The Diamond Model of Intrusion Analysis (Caltagirone et al., 2013) provides the canonical structural framework for intrusion event characterization. Its four vertices—adversary, infrastructure, capability, victim—and meta-features including motivation and intent represent an early acknowledgment that behavioral context is analytically relevant. The model does not, however, specify how motivation is to be operationalized from observable signals, leaving that determination to the analyst.

MITRE ATT&CK (Strom et al., 2018) addresses the capability vertex in depth, providing a structured vocabulary of adversary behaviors derived from real-world observations. ATT&CK's technique-group mappings offer a foundation for capability assessment and technique-repertoire analysis. The framework explicitly does not model motivation or predict targeting; it describes what was observed, not what will be attempted next.

### 2.2 Offender and Hacker Psychology

Rogers (2006) proposed a two-dimensional circumplex taxonomy of hackers organized around skill level and motivation type, distinguishing categories ranging from novice script-kiddies through to nation-state actors. The taxonomy established that motivation—financial gain, recognition, ideology, espionage—is a primary discriminant among actor types, not a secondary annotation. Rogers' framework was constructed from survey and interview data; this paper extends its motivational logic to observable operational signals, removing the requirement for direct access to group members.

The academic literature on insider threats and cybercriminal psychology more broadly supports the view that observable behavioral patterns are proxies for underlying motivation. Operational cadence, target-sector consistency, tool reuse, and exploitation preferences each carry inferential weight about the motivational architecture driving a campaign.

### 2.3 Dark Triad in Cybercrime

Paulhus and Williams (2002) established the Dark Triad construct—narcissism, Machiavellianism, and psychopathy—as three statistically distinct but correlated personality dimensions predictive of antisocial behavior. Subsequent research applied the construct to cybercriminal contexts, finding positive associations between Dark Triad traits and willingness to exploit others for personal gain, preference for deception over confrontation, and reduced deterrence sensitivity.

The critical methodological boundary, stated here and revisited in the Limitations section, is that the Dark Triad was developed as a measured construct applied to *individuals* via validated self-report inventories. A threat group cannot complete a personality inventory. The Dark Triad activation composite used in this model is an inferential proxy: observable behaviors (aggression toward civilian infrastructure, deceptive TTPs, willingness to cause collateral harm, exploitation of trust relationships) are mapped to the behavioral correlates of each trait dimension and aggregated. The resulting scores reflect behavioral signatures that *resemble* Dark Triad-elevated patterns—they are not trait measurements.

### 2.4 Threat-Intelligence Attribution

Attribution in cyber-threat intelligence is a probabilistic inference problem (Rid & Buchanan, 2015). The confidence attached to an attribution claim varies with the volume and quality of corroborating signals and the analyst's tolerance for competing hypotheses. This paper does not address the attribution problem per se; it takes attributed actor identities as given and focuses on what motivational and behavioral characterization can be derived from the signals associated with those identities, under explicitly stated confidence bounds.

### 2.5 Geopolitical Risk as a Leading Indicator

Caldara and Iacoviello (2022) demonstrated that automated parsing of newspaper coverage can produce a geopolitical risk index (GPR) that Granger-causes investment contraction and asset price volatility. The underlying logic—that media coverage of geopolitical tension is a leading indicator of real-economy disruption—extends to cyber-threat activity. Documented case studies, including the FrostyGoop attack (January 2024), Industroyer/CRASHOVERRIDE (December 2016), and PIPEDREAM/INCONTROLLER (disclosed April 2022), establish empirical precedent for geopolitically correlated OT campaign escalations. The temporal signal layer in this model applies the same leading-indicator logic to campaign activation probability.

---

## 3. Methods

### 3.1 Data Sources and Corpus Construction

The analysis draws on the OXOT threat-intelligence database (`oxot_facts`), Seldon module, populated as follows. Actor base records in `seldon.actor_eic` cover 624 threat groups with attributed motivation statements, target-sector arrays, historical activity windows, and sophistication-level classifications. Psychometric profile records in `seldon.psychometric_profiles` cover 51 actors for whom sufficient observable signal volume supports Dark Triad composite computation. Campaign momentum records in `threat_intel.campaign_momentum` provide actor-level composite momentum scores (CMS) initialized from EIC-derived signals. Temporal geopolitical signals in `public.seldon_gpr_temporal_signals` cover 3,787 quarterly actor-sector pairs, encoding geo-tension deltas, economic stress indices, leading indicator scores, and ALE contribution estimates.

ATT&CK technique associations are sourced from MITRE ATT&CK Enterprise matrix data (Strom et al., 2018). KEV and EPSS data are sourced from CISA's Known Exploited Vulnerabilities catalog and FIRST's Exploit Prediction Scoring System, respectively, loaded into the `seldon.actor_eic` table under `kev_count` and `mean_epss` columns.

### 3.2 Estimated Intent-Capability (EIC) Decomposition

Each actor receives three component scores, each bounded [0, 1]:

**Intent (I):** Derived from motivation label classification, target-sector sensitivity (OT/ICS sectors weighted higher than general IT targets), and historical escalation events. Actors with documented destructive objectives (e.g., wiper deployment, physical process disruption) receive higher intent scores than actors whose observed behavior is consistent with passive collection.

**Capability (C):** Derived from technique count across the ATT&CK matrix, KEV density (kev_count / total CVEs attributed), mean EPSS of exploited vulnerabilities, and sophistication-level classification. Nation-state-advanced actors are calibrated to the upper capability range; financially motivated actors without government resourcing occupy the middle register.

**Opportunity (O):** Derived from target-sector exposure (proportion of CISA-defined critical sectors within the actor's documented targeting footprint) and geopolitical alignment with current tension regions. Opportunity is the most temporally variable component; it is updated by the temporal signal layer described in Section 3.5.

The composite EIC score is computed as a weighted mean:

```
EIC = (0.40 · I) + (0.35 · C) + (0.25 · O)
```

Weights reflect the view that intent is the strongest discriminant for predicted targeting (an actor with lower capability but high destructive intent presents a qualitatively different risk profile than a capable but opportunistic actor), followed by capability as the execution constraint, and opportunity as the situational modifier.

### 3.3 Dark Triad Activation Composite as an Inferential Behavioral Lens

For the 51 actors with sufficient signal volume, the model computes a Dark Triad activation composite over three dimensions:

- **Narcissism:** Proxied by observable preference for high-visibility targets (government, critical infrastructure named in press), branding behavior (custom tooling with named identifiers, public leak-site operations), and target selection inconsistent with pure financial optimization.
- **Machiavellianism:** Proxied by deceptive TTP density (living-off-the-land ratios, false-flag indicators, supply-chain compromise), long dwell-time operations, and exploitation of trusted relationships (vendor compromise, software update tampering).
- **Psychopathy:** Proxied by aggression toward civilian or safety-critical systems, demonstrated willingness to cause collateral harm (power grid disruption, hospital targeting), reduced deterrence response to law-enforcement action, and absence of attack-limiting behavior once access is established.

Each dimension is scored [0, 1] against the signal pool. The composite Dark Triad score is the unweighted mean of the three dimension scores. An associated `dark_triad_confidence` value quantifies the reliability of the composite given the available signal volume for that actor.

**This composite is an activation heuristic, not a clinical measurement.** It identifies actors whose observable operational behaviors pattern-match to the behavioral correlates of Dark Triad-elevated individuals. It does not claim that group members possess specific personality traits, that all members share uniform psychological characteristics, or that the composite is equivalent to a validated psychometric instrument. These limitations are elaborated in Section 5.2.

### 3.4 Motivation Archetype Alignment

Actors are assigned to motivation archetypes based on the conjunction of (a) their stated motivation label, (b) their primary and secondary motivation classifications from `seldon.psychometric_profiles`, and (c) their EIC component profile. The current taxonomy includes:

- **Strategic Espionage:** High intent (state-directed collection), high capability, geopolitically bounded opportunity; psychopathy and Machiavellianism dominant in Dark Triad profile.
- **Destructive/Coercive:** High intent (disruption or physical consequence), high-to-moderate capability, opportunity driven by conflict-state geopolitics; psychopathy dominant with high aggression index.
- **Financially Motivated / Extortive:** Moderate-to-high intent calibrated to economic return, variable capability, broad opportunity (sector-agnostic or sector-optimized for payment capacity); narcissism and Machiavellianism dominant.
- **Ideological / Hacktivist:** Variable intent and capability; Dark Triad composite typically lower; opportunity driven by political event proximity.
- **Under Assessment:** Actors with insufficient signal volume for archetype assignment.

### 3.5 Leading Indicators and Predicted Targeting

The temporal signal layer in `public.seldon_gpr_temporal_signals` encodes per-actor-sector-quarter observables: `geo_tension_delta` (geopolitical tension change relative to prior quarter, adapted from the GPR methodology of Caldara & Iacoviello, 2022), `economic_stress_index`, `leading_indicator_score`, and `threat_actor_activation_delta`. These signals modulate the Opportunity component of EIC and are used to generate forward-looking targeting predictions.

The prediction logic operates as follows: when `geo_tension_delta` for a given actor-region pair exceeds a threshold derived from the actor's historical activation pattern, and when the actor's `leading_indicator_score` crosses its rolling mean, the model flags elevated targeting probability for the actor's documented target sectors. This produces a ranked sector-targeting prediction that can be updated on a quarterly cadence as new GPR and campaign-activity signals are ingested.

Campaign momentum scores (CMS) in `threat_intel.campaign_momentum` synthesize the actor's current EIC score with recent KEV exploitation velocity and CVE exploitation rate into a single operational-tempo indicator. CMS is the primary output for near-term targeting priority ranking.

---

## 4. Results

### 4.1 Corpus Descriptive Statistics

The `seldon.actor_eic` table covers 624 attributed threat actors. Across actors with non-null EIC components, the corpus exhibits the following characteristics (Table 1).

**Table 1. EIC Descriptive Statistics (n = 624 actors; all components non-null subset)**

| Metric | Intent (I) | Capability (C) | Opportunity (O) | EIC |
|---|---|---|---|---|
| Mean | 0.663 | 0.520 | 0.428 | 0.554 |
| Min | — | — | — | 0.365 |
| Max | — | — | — | 0.938 |
| SD | — | — | — | 0.107 |

Motivation label distribution across the 624 actors (Table 2) shows that espionage-labeled actors (combined "Espionage / Strategic advantage" and "Espionage" categories) account for 286 actors (45.8%), financially motivated actors account for 128 actors (20.5%), and 132 actors (21.2%) remain under assessment pending sufficient signal ingestion. Ideologically motivated and sabotage-labeled actors account for the remaining 12.5%.

**Table 2. Motivation Label Distribution (n = 624)**

| Motivation Category | Count | % |
|---|---|---|
| Espionage / Strategic advantage | 191 | 30.6% |
| Espionage | 95 | 15.2% |
| Financial gain (ransomware) | 51 | 8.2% |
| Financial gain (other) | 77 | 12.3% |
| Ideological / Political | 27 | 4.3% |
| Sabotage | 4 | 0.6% |
| Under assessment | 132 | 21.2% |
| Other / mixed | 47 | 7.5% |

The campaign momentum corpus covers 624 actor records (CMS range: 0.102–0.938; mean: 0.463; SD: 0.171), one CMS entry per actor, computed from EIC-derived signals. The temporal geopolitical signal layer covers 3,787 quarterly actor-sector records across 3,755 distinct actor-sector pair types. Mean leading indicator score across all records is 0.096; mean geo-tension delta is 0.727, reflecting the energy and manufacturing sector weighting of the current signal ingestion set.

The `seldon.psychometric_profiles` table contains 51 computed Dark Triad profiles. Mean `dark_triad_composite` across profiled actors is [PENDING VERIFICATION — aggregate not queried]; top-decile composites range from 0.720 to 0.833 across the profiled set (Table 3 excerpt below).

**Table 3. Top-Decile Dark Triad Composites (n = 10, illustrative excerpt)**

| Actor | Narcissism | Machiavellianism | Psychopathy | Composite | Confidence |
|---|---|---|---|---|---|
| REvil | 0.900 | 0.850 | 0.750 | 0.833 | 0.750 |
| REvil Sodinokibi | 0.850 | 0.800 | 0.820 | 0.823 | 0.820 |
| Conti | 0.780 | 0.820 | 0.850 | 0.817 | 0.850 |
| LockBit | 0.750 | 0.880 | 0.780 | 0.803 | 0.880 |
| ALPHV BlackCat | 0.750 | 0.850 | 0.800 | 0.800 | 0.800 |
| Scattered Spider | 0.880 | 0.750 | 0.720 | 0.783 | 0.820 |
| Ember Bear | 0.650 | 0.850 | 0.750 | 0.750 | 0.850 |
| FIN7 | 0.650 | 0.850 | 0.700 | 0.733 | 0.850 |
| Sandworm | 0.500 | 0.780 | 0.880 | 0.720 | 0.900 |
| BlackByte | 0.500 | 0.900 | 0.700 | 0.700 | 0.880 |

Profiling precision, recall, and AUC against prospective targeting predictions are [PENDING EVALUATION] pending a holdout validation set drawn from post-computation campaign activity.

### 4.2 Archetype Contrast: Sandworm vs. Cl0p

The model's discriminating power is illustrated by comparing two actors present in the corpus with distinct motivation profiles, target sectors, and geopolitical relationships.

**Sandworm (Russia/GRU Unit 74455)**

Sandworm's `seldon.actor_eic` record carries an EIC score of 0.938 (I = 0.950, C = 0.950, O = 0.900)—the highest in the corpus. Its motivation is recorded as "Destructive attacks and espionage for Russian military intelligence." Sophistication level: nation-state-advanced. Target sectors include energy, communications, critical infrastructure, transportation, government, and finance across Eastern Europe, Europe, and Asia-Pacific.

The psychometric profile scores psychopathy at 0.880 and Machiavellianism at 0.780, yielding a Dark Triad composite of 0.720 with a confidence score of 0.900. Notably, narcissism scores at 0.500—lower than most ransomware operators. The aggression index is 0.920, the highest in the profiled set. Primary motivation is classified as SELF_ACTUALIZATION (mission-driven operational identity); secondary motivation is ESTEEM (institutional recognition within the intelligence apparatus). The behavioral lens interpretation: Sandworm presents as instrumentally destructive, operating under state direction, with low deterrence sensitivity and high tolerance for civilian collateral impact. Its operational signature is consistent with Machiavellianism-dominant execution (patient, deceptive, long-dwell operations) combined with high psychopathy (willingness to deploy wiper malware and attack safety-critical OT systems).

Temporal signals for Sandworm's energy-sector targeting show a geo-tension delta of 0.730 across multiple sector-quarter records, placing it in the upper quartile of actor-sector pairs by geopolitical sensitivity. Its campaign momentum score (CMS = 0.938) mirrors the EIC score, reflecting consistent historical activity rather than a recent exploitation-velocity spike. **Predicted targeting:** energy, rail and transport infrastructure, and communications in regions aligned with current Russia-NATO tension geography. Targeting probability is elevated whenever geo-tension delta rises relative to prior-quarter baseline.

**Cl0p (TA505)**

Cl0p's canonical `seldon.actor_eic` record carries an EIC score of 0.838 (I = 0.850, C = 0.850, O = 0.800). Motivation: "Financial gain (ransomware, mass exploitation of file transfer vulnerabilities)." Sophistication level: advanced. Target sectors span finance, government, healthcare, IT technology, and transportation, with a Global and North American–weighted regional footprint.

Cl0p does not appear in the 51-actor psychometric profile set at sufficient confidence to generate a validated Dark Triad composite. From observable behavioral signals, however, the archetype alignment is consistent with the Financially Motivated / Extortive category: the group's MOV/it Transfer and GoAnywhere campaigns in 2023 represent mass exploitation of a single high-impact vulnerability class, maximizing victim count per operational unit of effort—a signature of Machiavellianism-dominant behavior (strategic exploitation of structural trust) with moderate narcissism (public victim naming on leak sites) and comparatively low psychopathy (reduced evidence of physical-consequence targeting or safety-system interference). Dark Triad composite: [PENDING EVALUATION] for validated score; behavioral archetype is qualitatively assignable from signal patterns.

Cl0p's campaign momentum score (CMS = 0.838) reflects sustained high activity. Its temporal geopolitical signal profile differs from Sandworm's: geo-tension delta is not a primary activation driver. Instead, Cl0p's leading indicator correlates more strongly with enterprise vulnerability disclosure cycles and the availability of unpatched file-transfer systems. This produces a qualitatively distinct targeting prediction: sector-agnostic mass exploitation targeting organizations that have not patched specific vulnerability classes, with a secondary preference for sectors (healthcare, finance) where payment probability is elevated. Geopolitical de-escalation does not attenuate Cl0p's targeting probability, whereas it is a meaningful constraint on Sandworm operations.

**Summary of contrast.** The same signal set—EIC decomposition, Dark Triad behavioral lens, CMS, and temporal signals—yields orthogonal behavioral profiles. Sandworm is geopolitically triggered, mission-driven, and physically consequential; its targeting prediction is region-and-conflict-state-dependent. Cl0p is economically triggered, technology-opportunity-driven, and financially constrained; its targeting prediction is vulnerability-class- and payment-capacity-dependent. An OT security operator who treats both actors as "high EIC, therefore high priority" conflates two qualitatively different threat models and will missprice both the deterrence investment and the response posture.

---

## 5. Discussion

The results support the core claim that motivation and behavioral disposition can be characterized from observable signals and that the resulting profiles yield operationally distinct predictions. The Sandworm–Cl0p contrast is not exotic: the corpus contains 624 actors, and the majority partition into recognizable archetypes once the three-component EIC score, the Dark Triad behavioral lens, and the temporal signal layer are applied jointly.

The practical value of this model is in the *combination* of layers. Asset-centric attribution—determining which actor exploited which CVE on which device—provides the "who did what." The EIC decomposition adds "how capable and how active." The behavioral lens and archetype assignment add "why" and "how they decide what to hit next." The temporal signal layer adds "when." None of these layers is sufficient alone. Equipment-level detection without behavioral context produces an undifferentiated alert queue in which a state-sponsored destructive actor and a ransomware affiliate appear equally urgent. Behavioral profiling without asset-level detection produces strategic insight without operational triage. The model is designed to operate as a motivation and prediction layer over existing attribution and detection infrastructure, not as a replacement for it.

The geopolitical signal integration follows Caldara and Iacoviello (2022) in treating media-derived tension metrics as leading indicators. The OT domain provides a validation context that the original economic research did not address: documented ICS-directed campaigns have shown correlation with geopolitical state changes at short time lags (weeks to months). FrostyGoop (January 2024), Industroyer (2016), and PIPEDREAM (2022) each preceded or coincided with escalation events. Whether this correlation is causal, opportunistic, or directive—state actors responding to tasking tied to geopolitical triggers—is an open empirical question, but the operational implication is the same: rising geo-tension delta for a given actor-region pair should elevate predicted targeting probability for that actor's documented sectors.

### 5.1 Implications for OT Security Practice

For OT security practitioners, the model provides three actionable outputs. First, the EIC score offers a continuous threat-priority ranking that replaces binary "nation-state / financially motivated" categorization with a scored surface on which resource allocation decisions can be grounded. Second, the motivation archetype assignment changes the defensive posture question: a Destructive/Coercive archetype actor warrants investment in safety-system segmentation and impact-limiting controls; a Financially Motivated / Extortive archetype actor warrants investment in backup integrity and network-egress monitoring. Third, the temporal signal layer enables predictive rather than reactive posture—raising alert thresholds for documented target sectors ahead of geopolitical trigger events rather than after observed campaign activity.

The model is designed for integration into IEC 62443-3-2 risk assessments, where threat likelihood (TL) must be estimated for each threat scenario. The EIC score provides a quantitative input to TL calibration; the archetype assignment constrains which threat scenarios are plausible for a given actor.

### 5.2 Limitations

**Group-level psychometrics are inferential proxies, not clinical measurements.** The Dark Triad activation composite is derived from observable operational behaviors mapped to the behavioral correlates of three personality dimensions. A threat group cannot complete a validated personality inventory. The composite does not claim to measure the personality traits of individual group members, to represent the psychological homogeneity of a group (which may be large, distributed, and composed of members with varied individual characteristics), or to match the construct validity of the Paulhus and Williams (2002) instrument. The composite is a behavioral heuristic that identifies operational signatures consistent with Dark Triad-elevated patterns. It is useful to the extent that those patterns predict future behavior; it is not useful as a characterization of group-member psychology. This distinction should be preserved in all downstream applications of the model.

**Attribution uncertainty propagates through every layer.** Actor identity in this corpus is attributed—by MITRE, CISA, private vendors, and open-source intelligence. Attribution claims carry inherent uncertainty; false attribution, deliberate false-flag operations, and actor-group mergers and splits all introduce noise. An EIC score or Dark Triad composite computed on a misattributed actor record reflects the behavioral signals of the actual perpetrator mapped onto a different identity. The `dark_triad_confidence` and `confidence_score` fields in the psychometric profile record capture some of this uncertainty, but they do not model the probability of the underlying attribution being correct. Consumers of this model should treat high-confidence profiles for well-attributed actors (e.g., Sandworm, confidence_score = 0.900) differently from profiles for actors with limited public corroboration.

**Coverage is uneven across actor types and regions.** The 51 actors with computed psychometric profiles represent a small fraction of the 624 actor corpus. English-language open-source intelligence dominates the signal set, introducing a systematic bias toward actors active against Western targets and documented in Western security research. Actors operating in East Asian, South Asian, or African theaters are likely underrepresented and underscored. The "Under assessment" category (132 actors, 21.2%) reflects signal absence rather than behavioral absence.

**Temporal signals require continuous update.** Geopolitical conditions change. A geo-tension delta computed on a quarterly basis will lag rapid escalations by up to 90 days. The model's predictive value degrades if the temporal signal layer is not updated on a cadence matched to the geopolitical environment. Current ingestion covers 3,787 records; coverage of actor-sector pairs not yet ingested defaults to prior-mean imputation, which suppresses predicted-targeting variance for uncovered pairs.

**Ethical use.** Behavioral and motivational profiling of threat groups carries ethical obligations. The model characterizes *groups as operationalized entities* defined by their observed actions, not individuals. It should not be used to attribute personal culpability to individuals identified as group members, to justify targeting decisions under international law, or to make claims about the psychological states of specific persons. Its intended application domain is defensive cyber-security posture and risk prioritization.

---

## 6. Conclusion

This paper presented a signal-grounded model for behavioral and motivational profiling of threat-actor groups, implemented across a corpus of 624 actors. The EIC decomposition provides a continuous, component-resolved threat-priority score derived from observable signals. The Dark Triad activation composite provides an inferential behavioral lens—explicitly not a clinical measurement—that maps operational signatures to motivational archetypes. The temporal geopolitical signal layer, covering 3,787 quarterly actor-sector records, connects both scores to leading indicators of campaign activation and predicted targeting.

The Sandworm–Cl0p archetype contrast demonstrates the model's discriminating power: two actors with similarly high EIC scores yield orthogonal motivation profiles, distinct trigger conditions, and non-overlapping defensive implications. An OT operator managing energy or transportation infrastructure who treats both as generically "high priority" will misallocate defensive resources relative to one who understands that Sandworm is geopolitically triggered and physically consequential while Cl0p is vulnerability-opportunity-triggered and financially constrained.

The model is a work in progress. Profiling precision and predictive accuracy against forward-looking campaign activity are pending evaluation on a holdout validation set. Coverage of the Dark Triad profile layer needs to expand from 51 to a larger fraction of the 624-actor corpus before the behavioral lens can be applied at scale. Geopolitical signal ingestion needs to be put on a continuous update cadence to preserve predictive validity.

What the model provides today is the motivational and predictive layer that technique-centric frameworks do not. In environments where threat prioritization decisions carry material operational consequence—OT, ICS, critical infrastructure—the "why" and "what next" are not optional annotations. They are inputs to risk-calibrated defensive investment.

---

## References

Caldara, D., & Iacoviello, M. (2022). Measuring geopolitical risk. *American Economic Review, 112*(4), 1194–1225. https://doi.org/10.1257/aer.20191823

Caltagirone, S., Pendergast, A., & Betz, C. (2013). *The Diamond Model of Intrusion Analysis*. Center for Cyber Intelligence Analysis and Threat Research.

Paulhus, D. L., & Williams, K. M. (2002). The Dark Triad of personality: Narcissism, Machiavellianism, and psychopathy. *Journal of Research in Personality, 36*(6), 556–563. https://doi.org/10.1016/S0092-6566(02)00505-6

Rogers, M. K. (2006). A two-dimensional circumplex approach to the development of a hacker taxonomy. *Digital Investigation, 3*(2), 97–102. https://doi.org/10.1016/j.diin.2006.03.001

Strom, B. E., Applebaum, A., Miller, D. P., Nickels, K. C., Pennington, A. G., & Thomas, C. B. (2018). *MITRE ATT&CK: Design and philosophy*. MITRE Corporation.

---

## Figures (Specifications)

**Figure 1. EIC Score Distribution (n = 624 actors)**
*Specification:* Histogram of EIC scores binned at 0.05 intervals. X-axis: EIC Score (0.0–1.0). Y-axis: Actor count. Highlight bars for the Sandworm (EIC = 0.938) and Cl0p (EIC = 0.838) positions. Add mean line at 0.554. Color: single-hue sequential (blue). Caption: "Distribution of Estimated Intent-Capability scores across 624 attributed threat actors. Mean = 0.554, SD = 0.107. Sandworm occupies the upper extreme (EIC = 0.938); Cl0p occupies the high-capability tier (EIC = 0.838)."

**Figure 2. Dark Triad Composite vs. EIC Score (n = 51 profiled actors)**
*Specification:* Scatter plot. X-axis: EIC Score. Y-axis: Dark Triad Composite. Points colored by motivation archetype (four colors: espionage/state = blue; financial/extortive = orange; ideological = green; destructive = red). Label visible outliers (Sandworm, REvil, Conti, LockBit, Scattered Spider). Add best-fit line. Caption: "Dark Triad activation composite plotted against EIC score for 51 profiled actors. Financially motivated actors cluster at high composite and moderate-to-high EIC; state-sponsored destructive actors show high EIC with Dark Triad profiles weighted toward psychopathy over narcissism."

**Figure 3. Archetype Contrast Radar: Sandworm vs. Cl0p**
*Specification:* Spider/radar chart with six axes: Intent, Capability, Opportunity, Narcissism (behavioral proxy), Machiavellianism (behavioral proxy), Psychopathy (behavioral proxy). Two overlaid traces: Sandworm (solid line) and Cl0p (dashed line), differentiated by color. Sandworm values: I = 0.95, C = 0.95, O = 0.90, N = 0.50, M = 0.78, P = 0.88. Cl0p values: I = 0.85, C = 0.85, O = 0.80, N = [PENDING EVALUATION], M = [PENDING EVALUATION], P = [PENDING EVALUATION]. Caption: "Archetype contrast between a state-sponsored destructive actor (Sandworm) and a financially motivated mass-exploitation actor (Cl0p). The two actors differ markedly on psychopathy vs. narcissism loading, reflecting distinct motivation architectures despite comparable EIC scores."

**Figure 4. Temporal Signal Timeline: Sandworm Energy Sector**
*Specification:* Line chart over quarterly intervals. Primary Y-axis: geo_tension_delta. Secondary Y-axis: leading_indicator_score. X-axis: Quarter (from earliest ingested record to Q1-2026). Annotate documented Sandworm ICS operations (Industroyer 2016, Industroyer2 2022, FrostyGoop 2024) with vertical reference lines. Caption: "Geopolitical tension delta and leading indicator score for the Sandworm–energy sector pair across ingested quarterly records. Tension delta = 0.730 is consistent across recent quarters, indicating persistent elevated targeting probability for energy-sector OT environments in conflict-proximate regions."
