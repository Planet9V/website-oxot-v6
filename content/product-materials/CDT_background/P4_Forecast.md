---
title: "A Physics-Ensemble for 90-Day Cyber-Attack Forecasting in Critical Infrastructure: Coupling Epidemic, Self-Exciting, and Threshold Dynamics"

## Abstract

Operational technology (OT) and industrial control system (ICS) environments face adversarial campaigns whose timing and spread exhibit dynamics measurable using classical mathematical frameworks. This paper presents an ensemble model coupling three established formulations — SIR epidemic spread, Hawkes self-exciting point processes, and Granovetter/Ising threshold cascades with a Kramers barrier formulation — into a per-system 90-day attack-probability forecast calibrated on empirical exploitation data via a logistic link function. The ensemble is designed as decision-support tooling for OT security teams, not as a prediction-of-certainty mechanism. Forecast-skill metrics (AUC, Brier score, calibration curves) are not reported here because no completed back-test exists; those evaluations are registered as pending. The corpus driving the model includes 624 tracked threat actors with campaign-momentum scores, 3,787 quarterly geopolitical and temporal signal rows, and sector-level SIR parameters derived from empirical incident dwell and recovery data across approximately 15 industrial sectors. The worked mechanism — showing how the three model terms combine through the logistic link for an illustrative OT system — is presented qualitatively with the output probability marked [PENDING EVALUATION] pending back-test completion.

---

## Graphical Abstract (specification)

*Rendering pending. Description for illustrator:*

A horizontal flow diagram with four labeled blocks connected left-to-right by arrows:

1. **Inputs** — three stacked icons: (a) EPSS/KEV feed (exploit signal), (b) geopolitical/temporal signals (3,787 rows), (c) sector incident data (~15 sectors).
2. **Component Models** — three stacked boxes: SIR epidemic block (β, γ, R₀ labeled), Hawkes intensity block (λ(t), μ labeled), Granovetter/Kramers threshold block (θ, ΔU labeled).
3. **Logistic Ensemble Link** — a sigmoid curve icon with weights w₁, w₂, w₃.
4. **Output** — a gauge or probability bar labeled "90-day P(attack) per system."

The diagram should convey parallelism among the three model tracks feeding a single aggregation step. No color conventions are specified at this stage.

---

## 1. Introduction

Forecasting when a cyber attack will materialize against a specific OT or ICS installation is not an intelligence problem in isolation; it is a dynamics problem. Adversarial campaigns spread through vendor ecosystems, propagate along shared protocol stacks, and escalate when a sufficient fraction of peer organizations capitulate — behaviors that mirror well-studied physical and social phenomena. The literature on epidemic modeling, point-process statistics, and threshold cascades offers tractable mathematical descriptions of each of these mechanisms. What has been missing in the OT security domain is a structured ensemble that couples those mechanisms and grounds them in empirical exploitation data at the asset level.

The present work addresses that gap. Drawing on the Kermack-McKendrick SIR framework (Kermack & McKendrick, 1927), the Hawkes self-exciting point process (Hawkes, 1971), and the Granovetter threshold cascade model (Granovetter, 1978) extended with a Kramers barrier formulation (Kramers, 1940), we construct a per-system probability estimate updated on a 90-day horizon. The ensemble is calibrated using Exploit Prediction Scoring System (EPSS) scores and Known Exploited Vulnerability (KEV) additions as empirical signals of exploitation pressure (Jacobs et al., 2021), supplemented by 624 tracked threat-actor campaign-momentum scores and 3,787 quarterly geopolitical and temporal signal rows maintained in the OXOT platform.

Three claims are made at the outset. First, each component model is borrowed unchanged from its source literature; no new mathematical derivation is introduced here. Second, the ensemble is logistic — the output is a probability bounded on [0,1], not a point prediction of attack timing. Third, no forecast-skill evaluation (AUC, Brier score, calibration diagnostics, or hit-rate) is reported, because no completed back-test exists. Those metrics are registered as [PENDING EVALUATION] throughout. The ensemble is decision-support tooling. Practitioners should treat its output as one input among several, not as an authoritative forecast.

The remainder of the paper is organized as follows. Section 2 reviews the source literature for each component model and the empirical exploitation-data stream. Section 3 describes the model architecture, calibration approach, and ensemble construction. Section 4 presents the corpus descriptives and a worked mechanism example. Section 5 discusses limitations, including the irreducible uncertainty in attack forecasting. Section 6 concludes.

---

## 2. Related Work

### 2.1 SIR Epidemic Models

The SIR framework, introduced by Kermack and McKendrick (1927) to describe the 1905–1906 Bombay plague, partitions a population into susceptible (S), infectious (I), and recovered/removed (R) compartments and governs their evolution through two rate parameters: the transmission rate β and the recovery rate γ. The key derived quantity, the basic reproduction number R₀ = β/γ, determines whether an outbreak grows or decays. When R₀ > 1, the infectious compartment expands until herd immunity reduces effective transmission; when R₀ < 1, the outbreak contracts.

Transposing this framework to cybersecurity requires conceptual substitutions. A susceptible node is an asset whose vulnerability profile renders it exploitable given current adversarial capability. An infectious node is one actively being targeted or already compromised. A recovered node has been patched, isolated, or otherwise removed from the exposure pool. The transmission rate β is informed empirically by EPSS scores, KEV additions, and campaign-momentum data; the recovery rate γ by observed patch-deployment and incident-response dwell times across sectors. Sector-level calibration is necessary because a manufacturing facility and an electric utility show materially different patch cycles and exposure durations.

Applications of compartmental epidemic models to cybersecurity have appeared in the literature (though formal citations beyond the founding paper are not included here). The primary limitation is the homogeneous mixing assumption: the standard SIR model treats all susceptible nodes as equally reachable from all infectious nodes. Real OT network topologies are strongly heterogeneous — segmented by zone, protocol, and vendor — and calibration must account for this.

### 2.2 Hawkes Self-Exciting Processes

Hawkes (1971) introduced the self-exciting point process as a model for seismic aftershock sequences. The conditional intensity function

λ(t) = μ + Σ_{t_i < t} κ · g(t − t_i)

describes the instantaneous rate of events as a baseline rate μ plus a sum of excitation contributions from past events at times t_i, where g(·) is a decay kernel (typically exponential) and κ governs the magnitude of each excitation. Each observed event increases the probability of near-future events, producing the temporal clustering characteristic of aftershock series, financial tick data, and, as subsequent researchers have shown, cyber intrusion campaigns.

In the OT security context, the analogue is straightforward. Each KEV addition or confirmed exploitation event associated with a CVE present in a target system's asset profile raises the conditional intensity of a follow-on attack against that system. EPSS velocity — the rate of change in EPSS score for a given CVE — serves as a continuous signal feeding the excitation term. Systems with multiple relevant CVEs accumulate excitation contributions from each. The baseline rate μ is estimated from sector-level background threat activity, again drawing on the 624 actor campaign-momentum scores maintained in the OXOT corpus.

The principal practical strength of the Hawkes formulation is that it captures the clustering of attack campaigns without requiring a structural model of adversary decision-making. Its weakness is sensitivity to κ and the decay kernel parameterization; without a completed back-test, those parameters are currently set by analogy to empirical seismology and financial-market studies rather than by direct optimization against OT incident data.

### 2.3 Granovetter Threshold Cascades and the Ising Extension

Granovetter (1978) modeled collective behavior — riots, strikes, technology adoption — as a cascade process driven by individual threshold heterogeneity. Each agent in a population has a threshold θ representing the fraction of peers who must have already adopted a behavior before the agent adopts it. Cascades occur when the threshold distribution has sufficient mass at low values to ignite a chain reaction. The Ising model from statistical physics provides a mean-field version of this, where each node's state is influenced by the states of its neighbors, with temperature-like parameters governing the transition between ordered and disordered regimes.

In the OT attack-forecast context, the threshold construct captures sector-wide contagion: when a sufficient fraction of peer facilities in the same sector have been targeted or compromised, pressure on remaining facilities increases materially. Adversaries observe these signals through open-source reporting, dark-web forums, and intelligence sharing among criminal groups. A facility whose sector has recently experienced concentrated targeting faces a different threat posture than a facility in a quiet sector, even if its technical vulnerability profile is unchanged. The Granovetter/Ising term captures this social-structural pressure.

### 2.4 Kramers Barrier Formulation

Kramers (1940) analyzed the escape of a Brownian particle from a potential well — the thermal fluctuation problem. The escape rate over a barrier of height ΔU in a medium with damping coefficient η takes the form

r_escape ∝ exp(−ΔU / k_B T)

where k_B T represents thermal energy. In the threat-cascade context, ΔU maps to the structural friction opposing a sector-wide cascade: strong network segmentation, high patch-deployment rates, and active threat-hunting all raise the effective barrier. Campaign momentum, adversary resourcing, and publicly available exploit tooling lower it. The Kramers term modulates the Granovetter threshold cascade by suppressing cascade probability when defensive posture is high and amplifying it when defenses are thin — without requiring an explicit agent model of adversary decision-making.

### 2.5 EPSS and KEV as Empirical Calibration Signals

The Exploit Prediction Scoring System, described by Jacobs et al. (2021), provides daily machine-learning-derived probability estimates that a given CVE will be exploited in the wild within 30 days. The CISA Known Exploited Vulnerabilities catalog records confirmed in-the-wild exploitation events with date stamps. Together, EPSS scores (as a continuous exploitation-pressure signal) and KEV additions (as discrete exploitation confirmation events) provide an empirical data stream suitable for calibrating both the SIR transmission rate β and the Hawkes intensity function. The velocity of EPSS score change over a rolling window is used specifically to seed the Hawkes excitation term for CVEs present in a given system's asset profile.

---

## 3. Methods

### 3.1 Component Model Formulations

**SIR epidemic component.** For each asset system s in sector σ, we track a susceptibility fraction S_s(t), an infection-pressure fraction I_s(t), and a recovered fraction R_s(t) under the standard ODE system:

dS/dt = −β_σ · S · I  
dI/dt = β_σ · S · I − γ_σ · I  
dR/dt = γ_σ · I

Sector-level parameters β_σ and γ_σ are estimated from empirical incident dwell and recovery data across approximately 15 industrial sectors tracked in the OXOT corpus. The derived R₀_σ = β_σ/γ_σ constitutes the SIR contribution to the ensemble for system s at evaluation time t. Higher R₀_σ indicates a sector in an active epidemic phase; lower R₀_σ indicates a sector where recovery dynamics dominate.

**Hawkes self-exciting component.** For each system s, a conditional intensity λ_s(t) is computed as:

λ_s(t) = μ_s + Σ_{CVE_j ∈ profile(s)} Σ_{t_k < t} κ · exp(−δ(t − t_k)) · w(EPSS_j(t_k))

where μ_s is the background rate derived from the 624 actor campaign-momentum scores weighted by sector and geography, t_k are the timestamps of KEV additions for CVE_j, and w(EPSS_j(t_k)) weights each event by its EPSS score at time of KEV confirmation. The decay parameter δ and excitation magnitude κ are held at literature-analog values pending back-test calibration. The intensity λ_s(t) provides the self-exciting contribution: systems accumulating recent KEV events on their CVE profile receive elevated intensity regardless of their SIR sector state.

**Granovetter/Kramers threshold component.** A sector adoption fraction A_σ(t) is computed as the fraction of monitored peer facilities in sector σ that have been subject to a confirmed attack campaign in the trailing 90-day window. The Granovetter cascade probability for system s is:

P_cascade(s, t) = 1 − exp(−A_σ(t) / θ_s) · exp(−ΔU_s / k_B T_eff)

where θ_s is a per-system threshold parameter (inversely proportional to network exposure and directly proportional to segmentation depth), ΔU_s is a barrier parameter reflecting defensive posture (patch coverage, active monitoring, incident-response readiness), and T_eff is an effective temperature representing environmental campaign pressure drawn from the 3,787 geopolitical/temporal signal rows. This formulation preserves the Kramers suppression of cascade probability when ΔU_s is large relative to T_eff.

### 3.2 Logistic Ensemble Link

The three component outputs — R₀_σ (or a function of the SIR infectious fraction I_s), λ_s(t), and P_cascade(s, t) — are combined through a logistic link:

P_90(s) = σ(w₁ · f(R₀_σ) + w₂ · λ_s(t) + w₃ · P_cascade(s, t) + b)

where σ(·) is the standard logistic function, f(R₀_σ) maps the SIR reproduction number to a normalized contribution, and w₁, w₂, w₃, b are ensemble weights and bias. The logistic link enforces the output bound [0, 1] and produces a probability interpretable as the 90-day attack likelihood for system s given current corpus state.

Ensemble weights are currently held at equal priors (w₁ = w₂ = w₃ = 1/3, b = 0 on the normalized scale) pending back-test calibration. Once a validation dataset is assembled from confirmed OT attack events with known pre-attack corpus states, a penalized logistic regression will replace the equal-weight prior.

### 3.3 Calibration Approach

Sector-level SIR parameters are initialized from published ICS-CERT and sector-ISAC incident statistics and updated quarterly as the OXOT corpus ingests new incident reports. EPSS scores are ingested daily via API; KEV additions are ingested on publication. Campaign-momentum scores for the 624 tracked actors are updated based on dark-web telemetry, open-source threat intelligence, and partner feeds. Geopolitical and temporal signals — 3,787 rows in the current corpus — are updated quarterly and map to T_eff adjustments in the threshold component.

Full probabilistic calibration (Platt scaling or isotonic regression against empirical attack outcomes) is [PENDING EVALUATION] and will be reported in a subsequent paper once a back-test dataset of sufficient size and temporal coverage is available.

---

## 4. Results

### 4.1 Corpus Descriptives

The OXOT corpus driving the ensemble at the time of this snapshot contains:

- **624 tracked threat actors** with per-actor campaign-momentum scores reflecting recent operational tempo, targeting sector, and toolchain signatures.
- **3,787 quarterly geopolitical and temporal signal rows** spanning approximately 15 industrial sectors, mapping regional threat-environment conditions to the effective temperature T_eff in the threshold component.
- **Sector-level SIR calibration** derived from empirical incident dwell and recovery data across approximately 15 sectors, yielding per-sector R₀ estimates that range from sub-unity (sectors with rapid patch cycles and low adversarial pressure) to values materially above 1.0 (sectors with prolonged dwell times and active campaign activity at the time of corpus snapshot).

These are descriptive corpus statistics. No forecast-skill metric has been computed against a held-out validation set; all such metrics are [PENDING EVALUATION].

### 4.2 Worked Mechanism: Illustrative OT System

To make the ensemble logic concrete, consider an illustrative industrial control system — call it System-A — in the energy generation sector. The following describes the mechanism by which the three components interact; numerical outputs other than the probability estimate are drawn from the corpus snapshot.

**SIR contribution.** The energy sector at the time of the corpus snapshot carries an R₀ estimate above 1.0, reflecting active targeting campaigns, moderate patch-deployment rates, and dwell times characteristic of ICS environments where defenders often cannot take systems offline for rapid remediation. The SIR infectious fraction I for this sector is elevated, meaning the sector is in the expansion phase of the epidemic curve. The f(R₀) contribution to the logistic input is therefore positive and non-trivial.

**Hawkes contribution.** System-A's vulnerability profile contains several CVEs that have accumulated KEV additions in the trailing 90-day window, including at least one for which the EPSS score showed a velocity spike — a rapid increase in the 30-day exploitation probability — coinciding with a campaign surge by one of the 624 tracked actors with elevated momentum in the energy sector. The Hawkes intensity λ_s(t) for System-A is therefore elevated relative to a system with a quieter CVE profile, reflecting the self-exciting nature of recent exploitation events clustering near the evaluation date.

**Granovetter/Kramers contribution.** The sector adoption fraction A_σ for energy exceeds a meaningful fraction of monitored peers in the trailing 90-day window, placing the sector above the cascade ignition threshold for facilities with thin segmentation. System-A's barrier parameter ΔU_s is moderate — it has a patching program but lacks continuous OT-specific monitoring — yielding a non-negligible cascade probability that is not fully suppressed by the Kramers exponential.

**Ensemble output.** Combining these three contributions through the logistic link with equal-weight priors, the 90-day attack probability for System-A is: **[PENDING EVALUATION]**. This value will be populated following ensemble weight calibration against a validated back-test dataset. The mechanism description above illustrates that all three terms are expected to contribute positively for this system under current corpus conditions, meaning the ensemble estimate — once computed — is expected to lie in the elevated range relative to a baseline-rate system.

---

## 5. Discussion

### 5.1 What the Ensemble Captures

The ensemble's primary contribution is structural: it maps three distinct empirical phenomena — sectoral epidemic spread, per-CVE exploitation clustering, and peer-pressure cascade dynamics — onto a single probability output that updates as the corpus evolves. Each component is sensitive to different signals, which provides some resilience against any single signal stream going stale or noisy. A system can receive an elevated probability through any one of the three mechanisms independently, or through their combination.

The Kramers barrier term is particularly useful as a defensive-posture adjuster. Two systems in the same sector with identical CVE profiles will receive different ensemble outputs if one has stronger segmentation, faster patch deployment, and active monitoring — the barrier term suppresses the cascade contribution for the better-defended system without altering the SIR or Hawkes contributions, which are CVE- and sector-driven.

### 5.2 Limitations

**No back-test completed.** The most consequential limitation is stated plainly: no forecast-skill back-test has been completed. AUC, Brier score, calibration diagnostics, and hit-rate are all [PENDING EVALUATION]. The ensemble weights (currently equal priors), the decay parameter δ, and the excitation magnitude κ have not been optimized against empirical attack outcomes. The probability outputs at this stage are mechanistically grounded estimates, not validated predictions.

**Irreducible uncertainty in attack forecasting.** Even a fully calibrated ensemble will carry irreducible uncertainty. Adversary decision-making involves intent, opportunity, and capability in combinations that no mathematical model fully captures. Geopolitical triggers, zero-day discoveries, and changes in criminal-group economics can shift attack probability discontinuously in ways that trailing-window data does not anticipate. The ensemble is decision-support tooling. Security teams should use its output to prioritize attention and resources, not to determine with certainty whether or when an attack will occur.

**Homogeneous mixing in SIR.** The standard SIR formulation assumes all susceptible assets within a sector are equally reachable from all currently targeted assets. Real OT topologies are strongly segmented, and a per-facility network topology model would improve calibration. Network-structure refinements are deferred to future work.

**Hawkes kernel parameterization.** The exponential decay kernel and the κ parameter are held at literature-analog values. Optimal values for OT-specific attack clustering may differ materially. Sensitivity analysis against the chosen kernel shape is [PENDING EVALUATION].

**Actor-momentum score accuracy.** The 624 tracked actor campaign-momentum scores are constructed from open-source and partner intelligence, which is incomplete and subject to reporting lag. Actors operating below the detection threshold of available intelligence sources will be underweighted in the background rate μ.

**Temporal signal staleness.** The 3,787 geopolitical and temporal signal rows are updated quarterly. Rapid-onset geopolitical events — a new sanctions regime, a declared conflict, a major diplomatic rupture — may not be reflected in T_eff until the next quarterly update cycle.

### 5.3 Path to Validation

The intended validation approach is a rolling back-test using historical OXOT corpus snapshots paired with confirmed OT attack events from ICS-CERT advisories, sector-ISAC disclosures, and partner incident data. The back-test dataset is currently being assembled. Upon completion, ensemble weights will be fit by penalized logistic regression, and forecast-skill metrics will be reported in a subsequent paper.

---

## 6. Conclusion

This paper describes an ensemble model coupling SIR epidemic dynamics, Hawkes self-exciting point processes, and Granovetter/Ising threshold cascades with a Kramers barrier formulation into a 90-day per-system attack-probability forecast for OT and ICS environments. The ensemble is calibrated on a corpus of 624 tracked threat actors with campaign-momentum scores, 3,787 quarterly geopolitical and temporal signal rows, and sector-level SIR parameters derived from empirical dwell and recovery data across approximately 15 industrial sectors. The logistic link produces a probability bounded on [0, 1] that updates as the corpus evolves.

The worked mechanism for an illustrative energy-sector OT system shows how all three components contribute to an elevated forecast under current corpus conditions. The numerical probability output is marked [PENDING EVALUATION] pending ensemble weight calibration against a validated back-test dataset.

No forecast-skill metric is reported here. Attack forecasting carries irreducible uncertainty. The ensemble is intended as decision-support tooling for OT security practitioners allocating attention and resources across their asset portfolios — not as a prediction-of-certainty mechanism. Back-test results, calibrated weights, and forecast-skill diagnostics will be reported when the validation dataset is complete.

---

## References

Granovetter, M. (1978). Threshold models of collective behavior. *American Journal of Sociology, 83*(6), 1420–1443. https://doi.org/10.1086/226707

Hawkes, A. G. (1971). Spectra of some self-exciting and mutually exciting point processes. *Biometrika, 58*(1), 83–90. https://doi.org/10.1093/biomet/58.1.83

Jacobs, J., Romanosky, S., Adjerid, I., & Baker, W. (2021). Exploit prediction scoring system (EPSS). *Digital Threats: Research and Practice, 2*(3). https://doi.org/10.1145/3436242

Kermack, W. O., & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics. *Proceedings of the Royal Society of London. Series A, 115*(772), 700–721. https://doi.org/10.1098/rspa.1927.0118

Kramers, H. A. (1940). Brownian motion in a field of force and the diffusion model of chemical reactions. *Physica, 7*(4), 284–304. https://doi.org/10.1016/S0031-8914(40)90098-2

---

## Figures (specifications)

*All figures are specifications only. Rendering is pending.*

**Figure 1. Ensemble architecture diagram.**
Three vertical tracks (SIR, Hawkes, Granovetter/Kramers) feed into a logistic combination node. Each track shows its primary input signals (sector incident data, EPSS/KEV feed, sector adoption fraction + actor momentum) and its output term (R₀ contribution, λ(t), P_cascade). The logistic node outputs P_90(s) on a [0,1] axis. Recommended format: flowchart with uniform box styling per track; a final diamond or oval for the logistic output.

**Figure 2. SIR phase-space diagram for two illustrative sectors.**
Plots S(t), I(t), R(t) over a 365-day window for one sector with R₀ > 1 (epidemic expansion) and one with R₀ < 1 (rapid decay). Dual-panel layout, shared y-axis scale. Annotations mark the peak of I(t) and the herd-immunity crossing point for the R₀ > 1 case. X-axis: days; Y-axis: fraction of sector facilities.

**Figure 3. Hawkes intensity for an illustrative system CVE profile.**
Time series of λ_s(t) over the trailing 180-day window for a hypothetical system with three relevant CVEs. Vertical tick marks indicate KEV addition events. The intensity trace shows step-up excitation at each KEV event and exponential decay between events. Background rate μ_s shown as a dashed horizontal baseline. X-axis: calendar date; Y-axis: conditional intensity (events/day).

**Figure 4. Granovetter cascade probability as a function of sector adoption fraction and barrier height.**
Two-panel heat map. Panel A: P_cascade as a function of A_σ (x-axis, 0 to 1) and θ_s (y-axis, low to high threshold). Panel B: same axes with ΔU_s / k_B T_eff varying from low (thin defenses) to high (strong defenses). Color scale: white (P_cascade → 0) to dark red (P_cascade → 1). System-A illustrative point marked in both panels.
