---
title: "Engineering-Grounded Annualized Loss Expectancy for OT/ICS: A Compound Poisson–Pareto Model Fusing Disclosed Incidents, Insurance Claims, and Breach Telemetry"
tags: [paper, ale, ot-ics, cybersecurity, compound-poisson, pareto, monte-carlo, sec-8k, dbir, iec62443, tetrel, imrad, draft]
status: draft-imrad
date: 2026-06-16
author: "Jim McKenney"
---

# Engineering-Grounded Annualized Loss Expectancy for OT/ICS: A Compound Poisson–Pareto Model Fusing Disclosed Incidents, Insurance Claims, and Breach Telemetry

---

## Abstract

Annual loss expectancy (ALE) estimation in operational technology and industrial control system (OT/ICS) environments has been hampered by sparse public incident data and the absence of a coherent probabilistic framework that acknowledges the heavy-tailed nature of cyber losses. This paper presents a compound Poisson–Pareto ALE model built from three public-domain corpora: breach frequency rates drawn from Verizon Data Breach Investigations Report (DBIR) sector-year cells, loss severity fitted with a LogNormal body and Generalized Pareto tail to SEC 8-K Item 1.05 disclosures and NetDiligence/Casualty Actuarial Society (CAS) claims benchmarks, and World Bank Worldwide Governance Indicators (WGI) combined with conflict intensity indices as time-varying Poisson rate multipliers. Monte Carlo simulation yields mean ALE, tail quantiles, and Conditional Value at Risk (CVaR). The Gordon-Loeb bound S* ≤ v/e constrains optimal security investment to a share of expected loss. Corpus statistics at the time of this writing include 504 SEC 8-K event rows, 98 DBIR sector-year frequency cells, approximately 300 NetDiligence claim-benchmark cells, and 443 country-year WGI rows across 30 countries. Held-out empirical validation has not yet been performed; all accuracy and calibration metrics are marked [PENDING EVALUATION].

---

## Graphical Abstract (specification)

**Layout:** A single horizontal flow diagram across four panels, approximately 1200 × 400 px.

**Panel 1 — Input Corpora (left):** Three stacked data-source boxes labeled (a) Verizon DBIR sector-year breach rates, (b) SEC 8-K Item 1.05 + NetDiligence claims, and (c) World Bank WGI + conflict intensity. Arrows flow right to Panel 2.

**Panel 2 — Model Components (center-left):** Two sub-boxes. Top: "Poisson frequency λ(sector, country, year)" with the WGI multiplier equation annotated. Bottom: "Severity distribution F(x) = LogNormal body ⊕ GPD tail above threshold u."

**Panel 3 — Monte Carlo Engine (center-right):** A loop icon labeled "N = 100,000 simulations." Output arrows branch to mean ALE, 95th-percentile loss, and CVaR₉₅.

**Panel 4 — Decision Output (right):** Gordon-Loeb bound box: "S* ≤ v/e" with an arrow to "Optimal security budget."

**Caption:** "Figure GA. Schematic of the compound Poisson–Pareto ALE pipeline. Empirical rendering of the diagram is pending."

*Note: Image rendering is pending. No image file exists at time of writing.*

---

## 1. Introduction

Cyber risk quantification in OT/ICS environments has lagged well behind the financial sector. Enterprise IT frameworks such as FAIR and ISO/IEC 27005 offer structured vocabularies, but their loss models were calibrated on commercial data-breach populations dominated by payment-card and personally identifiable information events. Manufacturing facilities, electric utilities, water systems, and rail operations differ in three measurable ways: attack frequency is lower but consequence severity—measured as production downtime, regulatory penalty, and physical remediation—carries a heavier right tail; many losses are not reportable under US state breach-notification statutes (because OT incidents rarely expose consumer records), so voluntary or material-disclosure channels such as SEC 8-K filings become the primary observation window; and geopolitical exposure, expressed through national governance quality and conflict intensity, shifts the ambient threat rate in ways that purely technical exposure metrics do not capture.

The Gordon-Loeb (2002) framework established that the economically optimal security investment S* is bounded above by v/e, where v is the asset value at risk and e is Euler's number. The bound is elegant but its practical application requires a credible estimate of expected loss. In OT/ICS settings that estimate has typically been produced by analyst judgment rather than empirical calibration. The present work addresses that gap.

Three parallel developments made a data-driven ALE model tractable. First, the SEC's 2023 cybersecurity disclosure rules (Item 1.05 of Form 8-K) created a mandatory, timestamped loss-disclosure obligation for US public companies that experience material cybersecurity incidents. Although "material" is defined in economic rather than technical terms, the resulting disclosure corpus spans multiple critical-infrastructure sectors and includes quantified loss estimates that did not previously exist in public records. Second, the NetDiligence Cyber Claims Study and the Casualty Actuarial Society's companion analysis provide stratified claim-size benchmarks segmented by sector, year, and company revenue tier, enabling a severity model that is grounded in actual insurance payouts rather than hypothetical loss tables. Third, the Verizon DBIR has tracked confirmed breach counts by industry sector since 2008, providing a longitudinal frequency series that can be transformed into Poisson rates per sector per year.

This paper describes a compound Poisson–Pareto model that fuses these corpora, fits a composite severity distribution with a Generalized Pareto tail above a data-driven threshold, incorporates WGI governance scores as time-varying Poisson rate multipliers, and derives ALE through Monte Carlo simulation. The paper reports corpus statistics as of the current snapshot date and demonstrates the model's input-output logic through a qualitative worked example using the Colonial Pipeline incident. Held-out validation on a reserved test corpus has not been performed.

---

## 2. Related Work

Gordon and Loeb (2002) established the canonical economic model of cybersecurity investment, demonstrating that optimal spending is bounded by a fraction of expected loss and that not all assets warrant the same protection depth. Their model treats breach probability and loss magnitude as separable inputs, a structure this paper adopts and extends by making both inputs empirically fitted rather than subjectively specified.

Romanosky (2016) examined the empirical distribution of US data breach costs using the Privacy Rights Clearinghouse corpus and found that median breach costs were substantially lower than popular press estimates, though the distribution exhibited a pronounced right tail. His analysis was restricted to consumer-record breaches and did not address OT/ICS events or the insurance-claim domain. The present work extends his approach to the OT sector and incorporates the SEC 8-K corpus that postdates his analysis.

Extreme value theory provides the statistical machinery for heavy-tailed loss modelling. Pickands (1975) proved that exceedances above a high threshold converge in distribution to the Generalized Pareto Distribution (GPD) under broad regularity conditions—a result that grounds the tail-fitting strategy employed here. McNeil, Frey, and Embrechts (2015) provide a detailed treatment of the peaks-over-threshold method, tail-dependence estimation, and Monte Carlo integration for aggregate loss distributions in a financial-risk context; the methods transfer directly to cyber loss modelling.

Governance quality as a cyber-risk modifier has been treated qualitatively in threat-intelligence literature but rarely formalized in quantitative risk models. Kaufmann, Kraay, and Mastruzzi (2010) described the construction and validation of the World Bank WGI, which aggregates rule-of-law, regulatory quality, political stability, and control-of-corruption indicators across 215 economies. The present model uses these indicators as multiplicative adjustments to the baseline Poisson rate, on the hypothesis that weaker governance correlates with higher effective threat-actor activity.

Actuarial approaches to cyber risk have grown substantially since 2018. The Casualty Actuarial Society's Cyber Risk Technical Committee has published open benchmark datasets derived from insurance-claim populations that allow severity fitting at the sector-revenue stratum level. These data have not, to this author's knowledge, been combined with DBIR frequency rates and SEC disclosures in a single compound distribution model for OT/ICS specifically.

---

## 3. Methods

### 3.1 Corpus Assembly

Three corpora were assembled and normalized to a common schema before modelling.

**SEC 8-K Corpus.** Form 8-K Item 1.05 filings were retrieved from the SEC EDGAR full-text search API. Filings were parsed for incident date, sector (mapped to CISA critical-infrastructure sector taxonomy), disclosed financial impact where stated, and company identifiers. The snapshot at time of writing contains 504 event rows. Of these, 243 carry sufficient per-company attribution—named firm, incident date, sector, and at least one loss figure—to serve as model-fitting observations. Named companies in the attributed set include Colonial Pipeline, American Water, Change Healthcare, Equifax, and Duke Energy, spanning approximately 15 distinct CISA sectors.

**DBIR Frequency Corpus.** Verizon DBIR annual reports were parsed for confirmed-breach counts segmented by NAICS sector and report year. The sector taxonomy was crosswalked to the CISA critical-infrastructure sector mapping used for the 8-K corpus. The snapshot contains 98 sector-year frequency cells covering the period 2008–2024.

**NetDiligence / CAS Claims Corpus.** NetDiligence Cyber Claims Study annual reports and the CAS companion dataset were parsed for claim counts and loss quantiles by sector, year, and company revenue tier. Three revenue tiers (small: <$50M, mid: $50M–$1B, large: >$1B) and three calendar bands (pre-2020, 2020–2022, post-2022) were used as strata. The snapshot contains approximately 300 populated cells expanding toward a 648-cell theoretical grid; missing cells were flagged and excluded from fitting rather than imputed.

**WGI Governance Corpus.** WGI country-year observations were downloaded from the World Bank API for six indicator dimensions: voice and accountability, political stability and absence of violence, government effectiveness, regulatory quality, rule of law, and control of corruption. The snapshot contains 443 country-year rows across 30 countries with complete coverage on all six dimensions.

### 3.2 Frequency Model

Breach frequency for a given sector s and country c in year t was modelled as a Poisson process with rate:

λ(s, c, t) = λ₀(s, t) · γ(c, t)

where λ₀(s, t) is the baseline Poisson rate derived from the DBIR cell for sector s in year t, and γ(c, t) is a governance multiplier derived from the WGI composite score for country c in year t. The WGI composite was computed as an unweighted mean of the six indicator z-scores, then transformed to a multiplier via:

γ(c, t) = exp(−α · WGI_composite(c, t))

with α estimated from the cross-section of countries for which both DBIR-analogous national incident counts and WGI scores were available. Conflict intensity (operationalized as a binary indicator from the Uppsala Conflict Data Program for armed conflict involving state actors) was applied as an additive shift to the log-rate when active.

### 3.3 Severity Model

Loss severity S was modelled as a composite distribution. Below the threshold u, severity followed a LogNormal distribution fit by maximum likelihood to the central body of 8-K disclosed losses and NetDiligence claim benchmarks. Above u, the Pickands (1975) peaks-over-threshold result was applied: exceedances (S − u | S > u) were fitted to a Generalized Pareto Distribution with shape parameter ξ and scale parameter σ estimated via maximum likelihood. The threshold u was selected using a mean-excess plot and stability diagnostics for ξ across a range of candidate thresholds, following the procedure described in McNeil, Frey, and Embrechts (2015, §7.2).

Revenue tier and sector were used as covariates in the LogNormal body fit; the GPD parameters were estimated on the pooled tail sample given the limited number of high-severity observations.

### 3.4 Monte Carlo ALE

For N = 100,000 simulation trials, each trial drew:

1. A Poisson count K ~ Poisson(λ) for the target sector, country, and year.
2. K independent severity draws from the composite F(x).
3. Aggregate annual loss L = Σᵢ₌₁ᴷ Sᵢ.

Mean ALE was estimated as E[L] = (1/N) Σ Lⱼ. The 95th percentile loss and CVaR₉₅ (expected loss given exceedance of the 95th percentile) were estimated from the empirical distribution of {Lⱼ}.

### 3.5 Gordon-Loeb Bound

Following Gordon and Loeb (2002), the optimal security investment S* satisfies S* ≤ v/e, where v = E[L] and e = exp(1) ≈ 2.718. This bound was applied as a ceiling on recommended security-budget allocation; the model does not endorse a specific investment level but reports the bound alongside the ALE estimate to support budget-defensibility arguments.

---

## 4. Results

### 4.1 Corpus Descriptive Statistics

The SEC 8-K corpus at snapshot date contained 504 event rows. Of these, 243 rows carried the per-company attribution density required for model fitting, spanning approximately 15 CISA critical-infrastructure sectors. The most densely represented sectors were energy, healthcare and public health, and financial services. The temporal distribution was right-skewed toward the post-2022 period, consistent with the SEC's formal adoption of Item 1.05 disclosure requirements in late 2023.

The DBIR frequency corpus contained 98 sector-year cells. Sector coverage was uneven: manufacturing, accommodation and food services, and healthcare carried the longest time series (back to 2008 or 2009), while water and wastewater systems and transportation systems had shorter, sparser records. Breach counts per sector-year ranged from single-digit values in the water sector to triple-digit values in healthcare and financial services.

The NetDiligence/CAS claims corpus contained approximately 300 populated benchmark cells from a theoretical 648-cell grid (sector × year-band × revenue-tier). Cell density was highest for the mid-market revenue tier and the 2020–2022 calendar band; the large-company tier had the fewest populated cells because major-loss events are individually distinguishable and thus subject to confidentiality in the published benchmark.

The WGI governance corpus contained 443 country-year rows across 30 countries, with complete coverage on all six WGI dimensions. The cross-sectional distribution of the composite WGI score was approximately Normal with a slight left skew, driven by inclusion of several conflict-affected and governance-weak states relevant to OT-intensive energy and mining operations.

### 4.2 Illustrative Worked Example: Colonial Pipeline

The Colonial Pipeline ransomware event of May 2021 provides a qualitative demonstration of how inputs flow through the model. Colonial Pipeline operates refined-petroleum pipeline infrastructure classified under the energy sector in the CISA taxonomy. The DBIR energy sector breach frequency for years proximate to 2021 yields a baseline Poisson rate λ₀. The United States WGI composite score for 2020 (the most recent available at incident time) was high, yielding a governance multiplier γ < 1, which slightly reduced the adjusted rate relative to a lower-governance operating jurisdiction—appropriate because the US regulatory environment is comparatively mature. The Colonial Pipeline 8-K-equivalent disclosures (the incident predated the formal Item 1.05 rule but was extensively reported) documented a $4.4 million ransom payment and materially larger operational and remediation costs; those figures enter the severity distribution as body-range observations. The GPD tail would not be triggered by this event alone, but in aggregate with larger disclosed losses the tail fit reflects events of Colonial's magnitude as representative of the upper body rather than extreme tail.

Running the Monte Carlo simulator with energy-sector parameters calibrated to US governance conditions and this severity distribution would produce a mean ALE, 95th-percentile single-year loss, and CVaR₉₅ figure that the Gordon-Loeb bound would then translate into a defensible security-budget ceiling. The computed ALE for this parameterization is [PENDING EVALUATION]. The CVaR₉₅ figure is [PENDING EVALUATION]. The Gordon-Loeb-derived budget ceiling S* is [PENDING EVALUATION].

### 4.3 Model Fit Statistics

Goodness-of-fit for the LogNormal body and GPD tail, including Anderson-Darling statistics, Q-Q plot residuals, and tail-shape stability diagnostics across threshold candidates, is [PENDING EVALUATION]. Back-test performance against a held-out corpus partition is [PENDING EVALUATION]. Governance multiplier coefficient α and its confidence interval are [PENDING EVALUATION].

---

## 5. Discussion

The corpus statistics described in Section 4.1 support several qualitative observations. The concentration of richly-attributed 8-K rows in the post-2022 period reflects regulatory rather than threat-landscape change: the SEC's formal Item 1.05 rule created a disclosure obligation that did not previously exist. This creates a structural left-censoring artifact in the temporal series that the frequency model must account for; pre-2023 observations in the DBIR series likely undercount economically material OT incidents relative to the post-rule period.

The sparse water-sector and transportation-sector DBIR cells are a material limitation. OT incidents in these sectors are underrepresented in both the DBIR (because many water utilities are municipally operated and not surveyed in DBIR's commercial sample frame) and in the 8-K corpus (because most water utilities are not SEC registrants). The compound effect is that the frequency model for these sectors rests on fewer than a dozen data points in several strata, and the resulting Poisson rate estimates carry wide credible intervals.

The GPD tail fit depends critically on threshold selection. The mean-excess plot and stability diagnostics described in Section 3.3 provide a principled selection mechanism, but the small number of high-severity observations in the OT/ICS corpus means that ξ estimates will be sensitive to the inclusion or exclusion of single large events. Change Healthcare and Equifax represent two events whose severity dwarfs the median loss in the corpus; their inclusion pulls ξ upward (heavier tail) while their exclusion would suggest a lighter tail. Sensitivity analysis around threshold choice and the treatment of these outlier events is warranted and will be reported following empirical evaluation.

The WGI governance multiplier is theoretically motivated but its empirical identification rests on a cross-sectional correlation between national breach rates and governance scores that conflates many causal pathways. Richer identification would require a panel with country-sector-year observations at sufficient density to partial out sector-level fixed effects; the current corpus does not support that. The multiplier should therefore be interpreted as an exploratory covariate rather than a causally identified parameter.

The Gordon-Loeb bound provides a useful decision-support heuristic but its application to OT/ICS requires care. The original model treats loss as a function of breach probability and information asset value; in OT settings, the relevant loss includes physical remediation, regulatory penalty, and supply-chain disruption costs that do not map cleanly onto the information-asset framing. The bound is used here as a ceiling on total security investment across all consequence categories, which is a broader interpretation than the original authors intended.

### 5.1 Limitations

The held-out empirical validation of this model has not been performed. No accuracy, calibration, AUC, or back-test statistics are available at the time of writing. All quantitative outputs of the model—including mean ALE, CVaR figures, the governance multiplier estimate, and the Gordon-Loeb-derived budget ceiling—remain [PENDING EVALUATION] pending assembly and evaluation of a reserved test corpus.

The 8-K corpus is limited to US SEC registrants; privately held and foreign-domiciled OT operators are entirely absent from the disclosure layer. The DBIR sector mapping to CISA taxonomy involves judgment calls that were not independently validated. NetDiligence claim benchmarks represent insured losses, which systematically exclude uninsured entities and losses below policy deductibles. The WGI composite score aggregates six heterogeneous governance dimensions with equal weight; differential weighting tuned to cyber-threat exposure has not been explored.

Single-event severity draws in the Monte Carlo assume independence across events within a year, which may understate correlation during multi-victim supply-chain attacks (e.g., MOVEit, SolarWinds). Copula-based dependence modelling is deferred to future work.

---

## 6. Conclusion

This paper presented a compound Poisson–Pareto ALE model for OT/ICS environments that fuses three public-domain corpora: DBIR sector-year breach frequencies, SEC 8-K and NetDiligence/CAS loss severity data, and World Bank WGI governance scores as time-varying frequency multipliers. The model's statistical architecture—Poisson frequency, LogNormal-body plus GPD-tail severity, Monte Carlo aggregation, and Gordon-Loeb budget bounding—is described in sufficient detail to permit replication. Corpus descriptive statistics at snapshot date (504 8-K event rows, 243 richly attributed; 98 DBIR cells; ~300 NetDiligence cells; 443 WGI country-year rows) indicate that the data foundation is substantive, though the OT-specific sectors remain underrepresented relative to healthcare and financial services.

The qualitative worked example using Colonial Pipeline demonstrates that the model's input-output logic is coherent: governance-adjusted frequency rates, composite severity distributions anchored in disclosed and claimed losses, and Monte Carlo aggregation yield an ALE figure that can be directly translated into a Gordon-Loeb budget ceiling.

All quantitative model outputs await empirical validation. Future work will report back-test performance, tail-shape sensitivity analysis, dependence modelling for correlated events, and extension of the corpus to non-US OT operators through ENISA and national CERT disclosure data.

---

## References

Gordon, L. A., & Loeb, M. P. (2002). The economics of information security investment. *ACM Transactions on Information and System Security, 5*(4), 438–457. https://doi.org/10.1145/581271.581274

Kaufmann, D., Kraay, A., & Mastruzzi, M. (2010). *The worldwide governance indicators: Methodology and analytical issues* (World Bank Policy Research Working Paper No. 5430). World Bank. https://doi.org/10.1596/1813-9450-5430

McNeil, A. J., Frey, R., & Embrechts, P. (2015). *Quantitative risk management: Concepts, techniques and tools* (Rev. ed.). Princeton University Press.

Pickands, J., III. (1975). Statistical inference using extreme order statistics. *Annals of Statistics, 3*(1), 119–131. https://doi.org/10.1214/aos/1176343003

Romanosky, S. (2016). Examining the costs and causes of cyber incidents. *Journal of Cybersecurity, 2*(2), 121–135. https://doi.org/10.1093/cybsec/tyw001

---

## Figures (specifications)

*Note: No image files exist at the time of writing. The following are layout specifications for figure generation.*

**Figure 1. Corpus assembly and crosswalk schema.**
A three-column entity-relationship diagram showing (left) the three raw source corpora with their native schemata, (center) the crosswalk transformations (NAICS-to-CISA sector map, revenue-tier binning, ISO-3166 country code standardization), and (right) the unified analytical schema with shared sector, country, and year keys. Recommended dimensions: 900 × 500 px. Caption: "Figure 1. Data-integration schema linking DBIR, SEC 8-K/NetDiligence, and WGI corpora to a common sector–country–year key."

**Figure 2. Severity distribution fit: body and tail.**
A log-scale empirical CDF plot overlaying three curves: the empirical CDF of attributed 8-K loss observations, the fitted LogNormal CDF, and the composite LogNormal-GPD CDF. A vertical dashed line at threshold u separates the body from tail regimes. The tail region is shaded. Recommended dimensions: 700 × 450 px. Caption: "Figure 2. Composite severity distribution fit. LogNormal body below threshold u; Generalized Pareto tail above. Empirical CDF shown as step function. [PENDING EVALUATION: fitted parameter values.]"

**Figure 3. Monte Carlo ALE distribution for illustrative energy-sector parameterization.**
A histogram of simulated annual aggregate losses from N = 100,000 trials. Vertical lines mark the mean ALE, 95th percentile, and CVaR₉₅. The x-axis is log-scaled in USD millions. Caption: "Figure 3. Simulated ALE distribution, energy sector (US governance context). Values are [PENDING EVALUATION] pending calibrated parameterization."

**Figure 4. Governance multiplier γ across 30 countries.**
A choropleth map colored by γ(c, t) for the most recent available WGI year. High-governance countries (γ < 1) appear in blue; low-governance countries (γ > 1) appear in red. Countries with insufficient WGI coverage are shown in grey. Caption: "Figure 4. Governance-adjusted Poisson rate multiplier γ by country. Values are [PENDING EVALUATION] pending coefficient α estimation."

**Figure 5. Gordon-Loeb security budget ceiling as a function of ALE.**
A line plot with ALE on the x-axis (USD millions, log scale) and S* = ALE/e on the y-axis. Reference points for the Colonial Pipeline, Change Healthcare, and Equifax loss estimates are annotated. Caption: "Figure 5. Gordon-Loeb optimal security investment ceiling S* ≤ v/e. Dollar values on x-axis are illustrative reference points drawn from corpus; y-axis values are [PENDING EVALUATION]."
