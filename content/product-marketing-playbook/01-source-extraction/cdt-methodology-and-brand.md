# CDT Methodology & Brand — Source Extraction

Extraction date: 2026-08-21. Purpose: give a marketer/copywriter the customer-facing substance behind the OXOT Cyber Digital Twin (CDT), without the engineering detail, plus the brand rules needed to write on-voice. Source documents are internal technical/methodology notes and academic-style draft papers (P1–P8) — **not** already-published claims. See the "Caution" flags throughout: several papers are explicitly draft IMRAD academic papers with results marked `[PENDING EVALUATION]` or `[PENDING VERIFICATION]`. Corpus/scale statistics (row counts, actor counts, etc.) are asserted as real database counts; *performance/accuracy claims* (accuracy %, precision/recall, back-tested forecast skill) are **not yet validated** and should not be used as proof claims in copy — frame them as "how it works," not "how well it's been proven to work."

---

## 1. Platform-Level Positioning (from CDT Description, Data Engine Pipeline, Capability Notes, Customer Journey)

### Plain-English summary

OXOT's Cyber Digital Twin (CDT) is a SaaS platform (self-hosted "island" deployment also supported) that builds a living digital replica of a customer's OT/industrial facility — down to individual equipment, P&IDs, network zones, and software bill of materials — and continuously cross-references that replica against the real global threat landscape (threat actors, CVEs, exploit trends, geopolitics) to produce a dollar-denominated, board-ready risk number. It is built and run by the Seldon Engine, a physics-based simulation and prediction stack. Unlike traditional digital twins (built to optimize plant operations) or generic vulnerability scanners (which just list CVEs), OXOT CDT is purpose-built to identify risk to minimal safe operations and "crown jewel" assets, and to translate that risk into insurance-grade financial language.

### Copy-ready language

- "What is the probability and financial impact of a cyber attack on my specific OT infrastructure — today, and 90 days from now?"
- "From P&ID diagrams to financial exposure in one platform — no integration tax."
- "Traditional digital twins optimize operations. OXOT's Cyber Digital Twin identifies risk to minimal operations and crown jewels."
- "Compliance becomes a byproduct of using the platform, not a separate workstream."
- "Customers see only threats relevant to their equipment, their sector, and their geography — not a firehose of irrelevant CVEs."
- The customer's mental journey (useful as a page/funnel structure): **See it → Know the threat → Find the weak points → Price it → Check suppliers → Bridge safety → Forecast → Factor the world.**

### Concrete numbers worth citing (platform scale, as of the source snapshot)

- 331,000+ CVE records, refreshed daily; 331,000+ EPSS scores (daily)
- 1,200+ CISA KEV entries
- 8,900+ MITRE ATT&CK for ICS objects; 8,900+ threat actor profiles tracked (a broader "profiles" figure — TACAM/ATQ papers use a more conservative, audited 624-actor corpus; use 624 for defensible/precise claims, 8,900+ for "coverage" framing)
- 5,000+ curated ICS incidents
- 500+ SEC 8-K cybersecurity disclosures ingested (real, named companies: Colonial Pipeline, American Water, Change Healthcare, Equifax, Duke Energy)
- 200+ API endpoints; 90-table purpose-built OT/ICS schema; 168 wiki articles
- Time to First Twin target: <14 days; Asset Coverage target: >90% of OT assets catalogued within 30 days
- Pricing: platform license $50K–$500K/yr by facility count; onboarding $15K–$75K one-time; SELDON predictive add-on +30% on base license
- Market sizing: Global OT cybersecurity TAM $21.6B (2026); cyber insurance analytics TAM $14.8B (2026)

### Differentiation vs. competitors (as stated in source)

| Competitor named | What they do | OXOT's stated edge |
|---|---|---|
| Claroty / Dragos | Network-level OT visibility | OXOT adds equipment-level asset twin + financial quantification |
| SecurityScorecard / BitSight | External/third-party risk scores | OXOT does first-party, asset-correlated, internal risk with predictive intelligence |
| Palantir | Enterprise analytics | OXOT is purpose-built for OT/ICS with an industry-specific ontology |
| Axio / RiskLens | Cyber risk quantification (standalone) | OXOT's quantification is built into the operational platform, not bolted on |
| Insurers/underwriters | Static actuarial tables | OXOT computes ALE from the customer's *own* assets + live geopolitical signal — tells you how to *lower* loss, not just price it |
| Generic threat feeds | CVE/news firehose | Actor→sector→your-equipment attribution (TACAM), de-noised to "who is coming for a plant like yours" |
| GRC/compliance tools | Point-in-time checklists | A live, recomputing model with a 90-day forecast |
| Country-risk vendors | Annual sovereign ratings | Per-quarter governance signal fused into the cyber risk number |
| Pen-test reports | Snapshot of findings | Continuous, quantified, dollar-bearing risk tied to real disclosed incidents |

**The one-line data differentiator (strong, quotable):** "DBIR says how often, NetDiligence says how much, SEC says it really happened and cost this, World Bank/GPR say the world is this risky right now, and threat_intel says these actors are coming for this sector — and the ALE engine multiplies them into a defensible dollar figure."

### The "own it" / platform substrate story (differentiator often underused)

- Self-hosted, 12-container stack; **"Island mode"** — runs fully air-gapped on customer hardware with no cloud dependency at steady state.
- No fabrication discipline: the LLM is never allowed to invent a number. Every synthesized fact is grounded in a retrieved real source *first*; if nothing can be sourced, the field is stored as **NULL, never a fabricated default or zero**. This is enforced by an "Non-negotiable rules" list in the pipeline doc — genuinely strong marketing material about trustworthiness of the numbers, versus black-box AI vendors.
- Search-grounded fallback chain (deepseek → mimo → Perplexity Sonar → gpt-4o-mini) ensures no cell is ever silently left blank with a guess — it's filled with a real cited fact or left null.
- Every dollar figure and threat claim can, in principle, be traced back to a real SEC filing, a real World Bank data series, or a real published claims study.

---

## 2. ALE — Annualized Loss Expectancy (P1_ALE.md + pipeline doc)

**What ALE stands for in plain terms:** the platform's core deliverable — cyber risk expressed as an expected dollar loss per year, computed the way actuaries price insurance risk, not the way security vendors produce a "risk score" or red/yellow/green heatmap.

### Plain-English explanation

OXOT computes Annualized Loss Expectancy the way an actuary would price an insurance policy: how often does a breach happen in your sector (frequency, from Verizon DBIR data), and how much does it cost when it does (severity, from real insurance claims data and real disclosed SEC losses)? These two ingredients are combined in a compound Poisson–Pareto statistical model and run through Monte Carlo simulation (100,000 trials) to produce a full loss distribution — not just an average, but the 95th-percentile "bad year" and the tail-risk (CVaR) number insurers actually price against. The model is also adjusted by real-time geopolitical and governance conditions (a facility in a low-rule-of-law country carries a higher multiplier than the same facility in a stable one). The output plugs into the Gordon-Loeb economic formula to tell the board the maximum sensible security budget.

### Copy-ready language

- "Cyber risk as $/year — a simulated cyber-risk underwriter-grade number, not a red/yellow/green heatmap."
- "The CFO can answer 'What is our expected annual cyber loss?' with a statistically defensible number, not a traffic-light heatmap."
- ALE is built from real, disclosed losses (SEC 8-K filings), real insurance claims (NetDiligence/CAS), and real breach frequency data (Verizon DBIR) — not analyst guesswork.
- "The optimal security investment is $17.4M — $8.2M above your current spend" (illustrative Gordon-Loeb output format — good for showing *how the platform talks*, not as a claimed real customer figure).

### Concrete numbers worth citing

- Corpus at time of writing: 504 SEC 8-K cyber-incident event rows (243 richly attributed to named firms), 98 DBIR sector-year frequency cells (2008–2024), ~300 NetDiligence/CAS insurance claim-benchmark cells (of a 648-cell target grid), 443 WGI country-year governance rows across 30 countries.
- Named real companies in the corpus: Colonial Pipeline, American Water, Change Healthcare, Equifax, Duke Energy.
- Monte Carlo: 100,000 simulation trials per ALE run; outputs mean ALE, 95th-percentile loss, and CVaR₉₅.
- Gordon-Loeb bound: optimal security spend S* never exceeds ~37% of expected loss (S* ≤ v/e, where e≈2.718) — a hard, auditable ceiling the platform enforces (build gate: zero Theorem-1 violations allowed).
- **Caution:** the ALE paper (P1) is explicitly a draft IMRAD paper. All accuracy/back-test/calibration statistics are marked `[PENDING EVALUATION]`. The Colonial Pipeline example is presented as a *qualitative, illustrative* worked mechanism, not a validated output — do not present a specific computed ALE dollar figure as empirically proven.

### Differentiation

Most cyber-risk-quantification tools (Axio, RiskLens, generic FAIR-based models) are calibrated on IT/consumer-breach data (payment cards, PII) with lighter frequency but heavier tails than OT. OXOT is explicitly built for OT/ICS: it fuses OT-relevant disclosure channels (SEC 8-K, since OT incidents rarely trigger consumer breach-notification law) with claims and breach-frequency data, and adds a geopolitical governance multiplier most competitors don't have at all.

---

## 3. TACAM — Threat Actor Capability & Motivation / Cluster-Affinity Matrix (08_TACAM_Deep_Dive.md + P2_TACAM.md)

Note: the marketing deep-dive doc and the academic paper use two different (compatible) framings of the acronym — "Threat Actor Capability & Motivation Matrix" (marketing doc) vs. "Threat-Actor Capability–Affinity Mapping" / "Threat-Actor Cluster Affinity Matrix" (technical papers/glossary). Both describe the same underlying system: a multi-dimensional actor-to-equipment attribution engine.

### Plain-English explanation

Traditional threat intel is "flat": it tells you an actor exists and vaguely what sector they target. TACAM is a structured attribution engine that answers a much sharper question: given the exact vendor equipment installed in your facility, which named threat actors have the demonstrated capability and motive to exploit it, through which specific technique, and how urgently? It does this by building a knowledge graph that links actor → MITRE ATT&CK technique → CWE weakness cluster → CPE (named vendor product) → CVE, then layers on real exploitation signals (CISA KEV, EPSS). The marketing deep-dive expresses this as seven independent "dimensions" (TTP, Sector, Geography, Protocol, Temporal, CPE/Products, CWE/Weaknesses) that can be cross-queried in combination — e.g., "who targets my sector, using my vendor's specific PLC, via a technique I haven't patched for, and when in the year are they most active."

### Copy-ready language

- "The question is never 'are we being targeted?' The question is 'by whom, with what, and why now?' TACAM answers all three."
- "It turns a technical decision into a financial one, with actor attribution attached." (re: vendor procurement blast-radius queries)
- "No competitor does threat quantification at the level of individual products in your supply chain."
- "TACAM moves OT threat assessment from generic severity ranking to actor-attributed, inventory-specific prioritization — the question practitioners actually need to answer when patching is not a routine option."
- Worked example format (useful as a UI/proof-point mockup for the site): "Should I replace my Rockwell ControlLogix 5580 with a Siemens ET 200SP? Delta: +2 actors, +6 CVEs, +2 KEV. ALE increment: +$1.4M annually." (illustrative computation pattern, not a validated real output)

### Concrete numbers worth citing

- Marketing-doc TACAM matrix: 77,279 total data points across 389 threat actor groups, across seven dimensions — TTP (1,579 actor-tactic clusters, 27 MITRE tactics), Sector (2,278 actor-sector clusters, 17 CISA sectors), Geography (1,074 clusters), Protocol (627 clusters — Modbus, OPC-UA, DNP3, PROFINET, BACnet, MQTT, EtherNet/IP), Temporal (173 profiles), CPE/Products (62,965 actor-product clusters — the largest, most procurement-relevant dimension), CWE/Weaknesses (8,583 clusters).
- Supporting infrastructure: 79,376 knowledge-graph edges; 555,556 EPSS trajectory records; 95,560 kill-chain views; 35,341 geopolitical events; 182,313 embedded document chunks; 234 simulation epochs of continuous graph enrichment.
- Academic-paper (P2) corpus snapshot (a more conservative, audited subset): 624 tracked actors, 2,823 actor×sector affinity rows. Highest-affinity pairings cited as descriptive examples: Midnight Blizzard → IT sector (targeting score ≈0.955); Sandworm/ELECTRUM → energy sector (strongest energy affinity among ICS-active actors).
- **Caution:** P2 (the academic version) explicitly states precision/recall/ranking-accuracy evaluation against ground truth has **not been conducted** — all such claims are `[PENDING EVALUATION]`. Use TACAM's *descriptive* scale and *mechanism* in copy; do not claim validated predictive accuracy.

### Differentiation

The "Analytical Moat" framing in the marketing doc is strong, quotable copy: this is "not a dataset you download... a knowledge graph built over years of ingestion, enrichment, and cross-correlation... the hardest part of OXOT to replicate." No competitor is claimed to attribute threats at the level of a *specific named product* (CPE) in a customer's own supply chain — this is the single most defensible differentiator in the whole corpus.

---

## 4. ATQ — Actor Threat Quotient (09_ATQ_Deep_Dive.md)

### Plain-English explanation

ATQ answers the question every board asks and every vendor fumbles: "how dangerous is this specific threat actor, right now, on a scale a CFO can act on?" It's a single 0–100 score computed from 12 independently weighted, auditable components (not a black-box "High/Medium/Low" label) — things like kill-chain completeness, exploit probability trajectory (EPSS velocity), sector/protocol/vendor reach, incident history, campaign recency, and geopolitical tension tied to the actor's sponsor state. Because it's a live materialized database view, not a static report, ATQ moves as the world moves — and it feeds directly into three downstream engines: it re-weights the Monte Carlo attack-path simulation, it sets the "external threat pressure" component of a customer's overall Seldon Rating, and it drives the dollar-denominated Gordon-Loeb investment recommendation.

### Copy-ready language

- "Your firewall doesn't care who's attacking. Your board does. The ATQ tells them."
- "Adjectives don't survive a board meeting. Numbers do."
- "Other platforms tell you an actor is 'dangerous.' The ATQ tells you how dangerous, why, compared to whom, trending in which direction, and what it costs you."
- "Because Volt Typhoon (ATQ 78.6) has pre-positioned in your sector with rising EPSS velocity on CVEs affecting your vendor stack, the optimal security investment is $17.4M — $8.2M above your current spend." (illustrative sentence format the platform is designed to generate automatically — strong for showing the *output style*, not as a validated claim)
- "That sentence is generated from data, not intuition."
- "Not just 'who is dangerous' but 'who is getting more dangerous.'" (re: epoch/trajectory tracking)

### Concrete numbers worth citing

- 12-component weighted formula, 0–100 scale, computed from a live SQL materialized view (`seldon.seldon_score_v2`) against 77,279 TACAM rows, 555,556 EPSS trajectory records, 79,376 knowledge-graph edges, 35,341 geopolitical events.
- The V1→V2 scoring reform is a great "we obsess over rigor" proof point: old 3-component formula produced only a **2.9-point spread** across the top 30 actors (meaningless — everyone "tied" near 80); the 12-component V2 reform produced a **10.6-point spread** — a **3.7× gain in discriminatory power**. Also reordered the ranking meaningfully: Volt Typhoon overtook Lazarus Group because the new formula rewards *current operational posture* over historical incident volume.
- Component weights: EIC Score 18%, Kill Chain Completeness 14%, Temporal Threat Score 13%, EPSS Base 10%, Technique Reach 10%, Vendor Exposure 10%, Sector Reach 5%, Protocol Reach 5%, Incident Count 5%, Campaign Recency 5%, EPSS Velocity 5%, Geopolitical Tension 5%.
- Saturation-threshold tuning example (good "rigor" proof point): raising the Incident Count saturation divisor from ÷3 to ÷20 properly differentiated actors that used to all max out at 1.0 — e.g. CyberAv3ngers moved from a falsely-maxed 1.0 to a properly differentiated 0.40.
- Epoch/snapshot architecture: 234+ tracked epochs enabling delta tracking, e.g. "APT41's ATQ rose 2.3 points in the 90 days following the AUKUS submarine deal announcement."

### Differentiation

The comparison table in the source doc versus Mandiant/CrowdStrike/Recorded Future is directly usable: those vendors give subjective High/Medium/Low labels and "opaque analyst assessment"; ATQ gives a 12-component auditable score with epoch-based trend deltas that feeds a live financial model. "Other vendors give you a threat actor profile. OXOT gives you a threat actor measurement that feeds into a financial model telling your board exactly how much to spend."

---

## 5. SLT — Security Level Target derivation, SL-T = IC + AC − 1 (P3_SLT.md)

### Plain-English explanation

IEC 62443 requires every security zone in a facility to be assigned a target security level (SL-T, 1–4), but the standard never says *how* to calculate it from real engineering data — practitioners are left guessing or hiring consultants to eyeball it. OXOT's approach is a formula, SL-T = Impact Category + Attacker Capability − 1 (capped at 4), where the impact input isn't a subjective guess but is pulled directly from the safety engineering the customer already has — FMECA severity ratings, hazard logs, SIL designations — and the attacker-capability input is grounded in real threat-actor profiles rather than gut feel. Crucially, OXOT builds a **bidirectional map** between specific safety failure modes and specific MITRE ATT&CK for ICS techniques, so every single security requirement is traceable both backward to a safety consequence and forward to a named attack technique — auditable in a way manual risk assessment never is. This directly satisfies a real regulatory mandate (CENELEC TS 50701 Clause 6.3.2) that most vendors can't operationalize.

### Copy-ready language

- "The bridge nobody else builds: an attack's safety + production consequence, in one view."
- "An auditable link from each security requirement to a safety consequence and threat pathway — satisfying the convergence mandate of TS 50701 Clause 6.3.2."
- "When a railway safety assessor asks 'what is the cybersecurity basis for this security requirement?', the answer produced by this procedure is traceable" — down to the specific ATT&CK technique and specific hazard-log entry.
- The formula's intuitive elegance is itself good copy: max impact alone (IC=4, AC=1) already justifies max security (SL-T=4); max attacker capability alone against minimal impact (IC=1, AC=4) also justifies SL-T=4; only balanced moderate cases produce a proportionate mid-scale result.

### Concrete numbers/claims worth citing

- Applied in a real, live metro rapid-transit cybersecurity programme (multiple IEC 62443-3-2 zones with SIL-designated life-safety systems — fire detection, tunnel ventilation). Derived SL-T values **reconciled with the programme's existing zone register across all assessed zones** — i.e., the systematic formula matched what senior engineering judgment had already independently concluded, validating the method.
- Worked zone example: fire detection & tunnel ventilation zone — FMECA severity Category I (catastrophic, multiple fatalities) → IC=4; threat actor tier = nation-state APT → AC=4; formula yields SL-T=7, capped to the standard's max of 4 — "the formula yields the maximum achievable security level," consistent with SIL 2 designation and 84 open hazard-log entries in the Evacuation category cross-checked at IC=4.
- Note: this is the **same underlying engagement type as the Aalberts-relevant case study** (see Section 10) — a live rail/metro cybersecurity case dossier delivery. Strong signal this isn't theoretical; it shipped.
- **Caution:** specific zone counts, finding counts, and exact SL-T values are marked `[PENDING DISCLOSURE]` — client hasn't approved release of the underlying numbers. Only the *reconciliation result* ("matched the zone register, zero delta") is disclosed and safe to use.

### Differentiation

No IEC 62443 or TS 50701 consultancy is claimed to offer a repeatable, auditable *formula* connecting existing safety engineering (FMECA/hazard logs/SIL) to cybersecurity SL-T — this is typically done by expert judgment alone, non-reproducibly. OXOT's bidirectional FMECA↔ATT&CK mapping is described as not previously documented in prior published work.

---

## 6. Forecast — 90-Day Physics-Ensemble Attack Forecasting (P4_Forecast.md)

### Plain-English explanation

Rather than a single black-box prediction, OXOT forecasts the 90-day probability of an attack on a specific system by combining three well-established mathematical models borrowed from other fields, each capturing a different real dynamic: an epidemic model (SIR — how threats "spread" sector-wide, the same math used for disease outbreaks) captures sector-level contagion; a self-exciting point-process model (Hawkes — the same math used for earthquake aftershocks and financial market shocks) captures how each new confirmed exploit (KEV/EPSS) makes near-term follow-on attacks against similar systems more likely; and a social threshold-cascade model (Granovetter, borrowed from sociology, combined with a physics "barrier" concept from Kramers) captures peer-pressure contagion — how once enough facilities in your sector have been hit, pressure increases on the rest, moderated by how strong your own defenses (segmentation, patch rate, monitoring) are. The three are combined through a logistic function into a single 0–1 probability per system, updated continuously as real exploit and geopolitical data change.

### Copy-ready language

- "Forecast, don't snapshot." (from the capability notes doc — punchy, on-brand)
- "A 90-day risk trajectory + where to spend first."
- The three-model combination is itself a strong "nobody else does this" story: borrowing rigorous, decades-old mathematical frameworks from epidemiology, seismology/finance, and sociology/physics and applying them jointly to OT attack forecasting.
- Useful honest framing for copy: "decision-support tooling... not a prediction-of-certainty mechanism" — this is a paper explicitly designed to avoid overclaiming; good for a "how our AI thinks" trust page, bad for a headline stat.

### Concrete numbers worth citing

- Corpus backing the forecast: 624 tracked threat actors with campaign-momentum scores; 3,787 quarterly geopolitical/temporal signal rows; sector-level SIR parameters calibrated from empirical incident dwell/recovery data across ~15 industrial sectors.
- **Caution — important:** This entire paper is explicit that **no forecast-skill back-test has been completed.** AUC, Brier score, calibration curves, and the actual numeric example ("System-A" energy-sector probability) are all marked `[PENDING EVALUATION]`. Ensemble weights are currently equal-prior placeholders, not fitted. **Do not use this paper as a source for any accuracy or hit-rate claim.** Safe framing: describe the *mechanism* (what physics models feed the forecast, and why) and the *corpus scale* backing it — not a performance number.

### Differentiation

Most "predictive" threat intelligence in the market is really just trend extrapolation on CVE counts. OXOT's ensemble explicitly models three distinct real-world dynamics (epidemic spread, exploit-event clustering, peer-pressure cascade) rather than a single naive extrapolation — a genuinely distinctive mechanism story, even before back-test validation lands.

---

## 7. GroundedLLM — Hallucination-Resistant Data Pipeline (P5_GroundedLLM.md)

### Plain-English explanation

This is arguably the single most important trust story in the whole corpus, and probably underused on the current site: OXOT's AI is never allowed to "make up" a number. Every risk figure — a sector breach rate, a governance score, a claims benchmark — is produced by first retrieving a real source document (an SEC filing, a World Bank dataset, a DBIR report, an insurance publication), and only then having an AI extract and structure the value from that retrieved text. If no real source can be found, the field is stored as an explicit **NULL — never a fabricated default, never an interpolated guess.** Every stored number carries a "provenance block" recording exactly which document, which paragraph, and which model produced it — so any number in the platform can be audited back to its real source without re-running anything. A three-tier model fallback chain, ending in a live web-search-grounded model, ensures gaps get filled with a real cited fact rather than silently left as a plausible-sounding guess.

### Copy-ready language

- "A model that generates a hallucinated breach rate of 14% substituted silently for a missing value is worse than no value at all — it provides false confidence to downstream calculations."
- "Grounded extraction produces a traceable, auditable result or an explicit null; ungrounded extraction produces a plausible-looking value with no verifiable connection to any source."
- "Null over default" as a named design principle — this is a great, simple phrase to put in front of technical buyers who are (rightly) worried about AI hallucination in risk models.
- Every row → traceable to a real document, a real paragraph, and a timestamp. "Any row can be traced to its source without re-running the pipeline."

### Concrete numbers worth citing

- 5,132 total structured rows produced across four evidence streams at time of writing, each carrying a source citation: 504 SEC cyber-disclosure rows (243 richly attributed to named companies), 443 country-year WGI governance rows (30 countries, 2015–2024, 100% attributed), 98 DBIR sector-year cells, ~300 insurance-claim benchmark cells (growing), 3,787 geopolitical signal rows.
- **Caution:** the formal hallucination-rate evaluation vs. an ungrounded baseline (i.e., "X% fewer hallucinations than a plain LLM") is explicitly `[PENDING EVALUATION]` — not yet measured. Use the *design principle* ("grounded first, null over fabricated default, full provenance") as the claim, not a comparative accuracy percentage.

### Differentiation

Nearly every AI-powered security or GRC tool on the market is vulnerable to LLM hallucination and doesn't disclose how it prevents it. OXOT's null-over-default discipline and per-row provenance are concrete, explainable, and auditable — this is a genuine "how do we know the AI isn't lying to us" answer that most competitors can't give.

---

## 8. Ontology / DEXPI / NER — The Facility Digital Twin Engine (P6_Ontology_DEXPI_NER.md)

### Plain-English explanation

This is the machinery behind "The Living Facility Twin" — how OXOT actually turns a customer's engineering drawings and documents into a structured, queryable model. It ingests real P&ID engineering drawings (in the DEXPI 2.0 industry-standard format) and automatically extracts every piece of equipment, its zone, and how it connects to other systems — no manual re-keying. For documentation that isn't already in that structured format (PDF datasheets, scanned inspection reports, vendor manuals), it uses AI-based text recognition (NER — Named Entity Recognition) to pull out vendor names, model numbers, and firmware versions, and match them to the right piece of equipment. Everything is organized into an eight-layer model (from the physical facility down to individual assets, up through vulnerabilities, threat actors, and time-stamped events) and lives in both a graph database (for relationship/path questions) and a vector database (for semantic similarity search). Importantly: the system is honest about ambiguity — anything it can't confidently match gets flagged for human review rather than silently guessed.

### Copy-ready language

- "Eliminates the 'unknown unknowns' gap. Most industrial organizations cannot answer 'What software runs on that PLC?' — this module ensures they can, and links every answer to the threat landscape."
- The eight-layer L0–L7 structure (Facility → Zone → System → Conduit → Asset → Vulnerability → Threat Actor → Temporal Event) is a genuinely distinctive architecture story — "IEC 62443 zone modeling, vulnerability binding, and threat actor correlation become derived queries over a unified substrate rather than separately maintained artifacts."
- Honest, credibility-building phrase for a technical audience: items the system can't confidently match are "flagged for human review rather than silently auto-promoted."

### Concrete numbers worth citing

- DEXPI 2.0 schema covers ~100 core equipment classes, extended to ~220 total with CFIHOS supplementary types.
- Reference "Golden Path" facility example: 11 systems, 51 assets, 4 IEC 62443 zones, 49 DEXPI cards.
- Worked example: a single cooling-water-loop P&ID file (23 plant items + 2 instrument controllers) ingested end-to-end into 25 asset nodes, 1 system node, 1 cross-zone conduit — in one automated pass, with items needing review flagged rather than silently accepted.
- **Caution:** several headline population-scale numbers (total asset nodes, total KG edges, NER precision/recall) are explicitly `[PENDING VERIFICATION]`/`[PENDING EVALUATION]` in this source — do not present specific total counts as final; use the *mechanism* and the worked example, which are concrete and real.

### Differentiation

Competing OT asset-inventory tools generally require manual data entry or network-scan-only discovery (which can't see unconnected/legacy equipment). OXOT's DEXPI-first ingestion pulls from engineering-of-record documents customers already have, with NER filling the gaps — genuinely less integration burden than "deploy a network sensor and hope you see everything."

---

## 9. Graph / Monte Carlo — Attack-Path Simulation & Blast Radius (P7_Graph_MonteCarlo.md)

### Plain-English explanation

This is how OXOT actually shows an attacker's realistic path through a facility — not just a list of vulnerabilities, but how they chain together. Two complementary methods run over the same knowledge graph of the customer's facility: (1) a deterministic method that systematically enumerates every possible attack path from an entry point (say, a VPN gateway) to a target (say, the control-system historian), flagging any place where a security-zone boundary is crossed without adequate protection, and tagging each step with the specific real-world attack technique (MITRE ATT&CK for ICS) involved; and (2) a probabilistic method — a Monte Carlo "random walk" using statistical-mechanics weighting (Boltzmann distribution) — that runs thousands of simulated attack attempts to find out which paths are *most likely*, and which assets get touched most often across all those simulations (the "blast radius"). Both are then combined with graph-centrality math to rank exactly which single node, if hardened, would eliminate the largest number of possible attack paths — turning "there are 40 vulnerabilities" into "fix this one specific chokepoint first."

### Copy-ready language

- "Which paths does an adversary most likely traverse, and what systems does a successful campaign touch?"
- The blast-radius + centrality-ranking framing is strong, concrete "how it thinks" content — turns an abstract graph into "fix this exact system first."
- Important precision point for technical credibility: this Monte Carlo (attack-path simulation) is explicitly **architecturally distinct** from the ALE Monte Carlo (financial loss simulation) — they answer different questions ("which paths are attackers likely to take" vs. "how much should we expect to lose"), and the source paper is emphatic that competent vendors keep these separate rather than conflating them. Good nuance to preserve if writing detailed technical copy, but likely too in-the-weeds for the homepage.

### Concrete numbers worth citing

- Verified corpus backing the graph engine: 624 threat actors; 62,965 actor-to-CPE cluster associations; ~358,000 CVE records; ~1.6 million CPE dictionary entries; ~15.6 million point-in-time EPSS scores; 1,619 CISA KEV entries; 117 typed semantic relationship types in the current working knowledge-graph edge layer.
- Worked example: VPN gateway (Zone 0, untrusted) → engineering workstation/data diode (Zone 1, DMZ) → DCS historian (Zone 2) — a real IEC 62443 zone-crossing scenario, annotated with specific real ATT&CK for ICS technique IDs (T0865 spearphishing, T0817 drive-by compromise, T0882 default credentials).
- **Caution:** exact path-probability values, blast-radius percentages, and centrality rankings on a live customer graph are marked `[PENDING EVALUATION]` — this method has explicitly **not yet been validated against ground-truth incident data**. Use the mechanism and worked example; do not claim a specific validated "X% likely path" statistic.

### Differentiation

Static vulnerability scanners and even most attack-graph tools stop at IT topology. OXOT's graph explicitly encodes IEC 62443 zone/conduit semantics as first-class reasoning rules (a zone-crossing with insufficient conduit rating is flagged as a structural gap even with zero known CVEs present) — a distinctly OT-aware capability most generic attack-graph tools lack.

---

## 10. Behavioral Profiling — Threat Actor Motivation & Predictive Targeting (P8_Behavioral_Profiling.md)

### Plain-English explanation

Most threat intelligence tells you *what* an actor does (their techniques). This capability tells you *why* — and therefore, what they're likely to do next. It scores every actor on Intent, Capability, and Opportunity (the EIC score) from observable signals (technique repertoire, exploit-probability trends, target-sector history, operational tempo, geopolitical alignment), then applies a behavioral lens (adapted from the psychological "Dark Triad" — narcissism, Machiavellianism, psychopathy) as an *inferential proxy for group-level behavior patterns*, explicitly not a clinical diagnosis of individuals. Two actors can have nearly identical "danger scores" but completely different motivations and trigger conditions — the paper's central proof point contrasts Sandworm (Russian state actor: geopolitically triggered, mission-driven, willing to cause physical harm) against Cl0p (financially motivated ransomware group: triggered by unpatched vulnerability classes and payment likelihood, not geopolitics) — showing that treating both as "equally high priority" leads a security team to misallocate defenses. A quarterly-updated geopolitical signal layer then predicts *when* an actor's targeting of your sector is likely to spike.

### Copy-ready language

- "An OT operator who treats both actors as generically 'high priority' misallocates resources relative to one who understands that Sandworm is geopolitically triggered and physically consequential while Cl0p is vulnerability-opportunity-triggered and financially constrained."
- "Equipment-level detection without behavioral context produces an undifferentiated alert queue in which a state-sponsored destructive actor and a ransomware affiliate appear equally urgent."
- The model's own summary of its unique value, layer by layer — useful structure for a "how it thinks" page: asset-level attribution = "who did what"; EIC score = "how capable and how active"; behavioral archetype = "why, and what they hit next"; temporal signal layer = "when."
- Explicit, responsible-AI framing that's good for trust copy: "the Dark Triad composite is an inferential behavioral proxy... NOT a clinical personality measurement," and the paper states outright it "should not be used to attribute personal culpability to individuals."

### Concrete numbers worth citing

- Corpus: 624 attributed threat actors scored on Intent/Capability/Opportunity (EIC); mean EIC = 0.554 (SD 0.107); 51 of the 624 actors have a computed behavioral/"Dark Triad" profile (deeper profiling is resource-intensive, so coverage is intentionally selective and disclosed as such).
- Motivation-label breakdown across the 624 actors: ~45.8% espionage-motivated, ~20.5% financially motivated, ~21.2% "under assessment" (honest about coverage gaps).
- Sandworm: EIC 0.938 (highest in the corpus), psychopathy 0.880, aggression index 0.920. Cl0p: EIC 0.838, financially motivated mass-exploitation profile. This named, specific, real-actor contrast is strong, concrete proof material for a "how our AI reasons about threats" page.
- Geopolitical signal layer: 3,787 quarterly actor-sector records; real documented ICS campaigns cited as precedent for geopolitically-correlated escalation timing — FrostyGoop (Jan 2024), Industroyer/CRASHOVERRIDE (Dec 2016), PIPEDREAM/INCONTROLLER (disclosed Apr 2022).
- **Caution:** predictive accuracy of the archetype/targeting model against a holdout validation set is explicitly `[PENDING EVALUATION]`. Use the Sandworm/Cl0p contrast and the mechanism as illustrative, not as a proven forecasting track record.

### Differentiation

No mainstream threat-intel vendor is described as publishing a *motivation* layer this explicit and falsifiable (grounded in observable signals rather than analyst narrative), paired with responsible, clearly-bounded ethical framing about what the model does and doesn't claim about individuals. This is both a differentiator and a trust-building asset.

---

## 11. Case Study — Critical Rail Infrastructure IEC 62443 Delivery (Aalberts relevance doc)

**Note on anonymization:** the source document itself is already anonymized/generalized — it does not name the rail operator, only "a major critical rail infrastructure programme in New Zealand." Preserve this level of anonymity in any published copy; do not attempt to identify the client further. The doc frames this case as directly relevant/transferable evidence for a *prospective* client, Aalberts — do not conflate Aalberts with the case study subject; Aalberts is the target reader of the case study, not the subject of it.

### The challenge

A major critical rail infrastructure programme in New Zealand, five years in development, had deferred its cybersecurity workstream while civil/systems engineering progressed. By the time OXOT's principal was engaged to lead the cybersecurity programme, the project was behind schedule: years of compliance work still to be done, compressed into months.

**Deliverable required:** a complete IEC 62443 / TS 50701 Cybersecurity Case Dossier — **3 volumes, 8 sections, 101 formally controlled documents**, including Threat Vulnerability Assessments, Traceability Matrices, System-Level Architecture narratives, a Cybersecurity Management Plan, Security Responsibility Assignment Controls, Zone/Conduit decomposition models, and specialized Basis documents mapping the intersection of safety, hazard traceability, FMECA/MITRE analysis, and Security Level Target assignments. Required delivery timeline: **approximately five months** — described as unrealistic under a conventional consulting approach.

### The OXOT approach

People-led, tool-enabled division of labor:

- **The senior engineer** focused on what no platform can replace: building consensus with the client's engineering team, the safety assessor, the independent verifier, and multiple system integration contractors — trust, domain knowledge, direct engagement with the people who run the infrastructure.
- **OXOT's proprietary programme management and assessment platform** handled the heavy lifting: automated compliance mapping, cross-document consistency verification, version control across 101 interdependent documents, and systematic gap identification. It ran multiple verification processes in parallel — compliance checking against every IEC 62443-3-3 and TS 50701 clause, engineering rationalization of SL-T assignments across FMECA and MITRE mappings, and document-integrity governance across the full manifest.
- **Concrete proof point:** when legacy SL-T designations were found inconsistent with mandated requirements, corrections were propagated across **all 92 impacted artifacts simultaneously, with full audit trail** — something manual review would very plausibly have missed or handled inconsistently.

### Outcomes (verbatim-strength claims, safe to reuse)

- **Five-month delivery** of a regulator-ready Cybersecurity Case Dossier that met independent assessment requirements **without rework, remediation requests, or supplementary evidence demands.**
- **Cross-referential integrity across 101 interdependent documents** — anomalies manual review would have missed were detected and corrected systematically.
- **Full traceability** — every modification, gap identification, and remediation action logged and attributable.
- **Cost and staffing efficiency:** "a conventional firm would have staffed this with 8–12 analysts over 12–18 months; OXOT delivered with one senior engineer and a tooling platform, faster and with greater accuracy."

This is the single strongest, most concrete, most quotable proof point in the entire corpus — real numbers, real deliverable count, real staffing comparison, real regulatory outcome (no rework/remediation). This directly corroborates the SL-T methodology described in Section 5 above (P3_SLT.md) — the two documents describe the same class of engagement (rail/metro IEC 62443 + TS 50701 cybersecurity case delivery), which strengthens both: the academic paper shows the *method*, the case study shows it *shipped and worked in the real world under a compressed timeline.*

---

## 12. Style Guide — Voice, Rules, Visual Identity (condensed from OXOTSTYLEGUIDE.md)

### Brand fundamentals

- **One accent colour, always.** Orange (`#F07000` light / `#FF7F0F` dark) is the *only* accent. A second accent colour anywhere is a defect.
- **Never hard-code a colour.** All colour comes from CSS custom properties (tokens), so light/dark mode both work automatically.
- **Wordmark is typeset text, never an image:** `O` + orange `X` + `OT`, letter-spaced 0.28em (header) / 0.30em (footer), sans typeface only (never the serif), never below 0.24em tracking, never italic, never bold beyond 600, never boxed.
- **Tagline:** "Operational eXcellence in Operational Technology" (NL: "Operationele eXcellentie in operationele technologie") — note the capital X mirrors the wordmark. Set in serif, 14px, weight 500.
- **Three typefaces, no overlap, no substitutions:** Newsreader (serif) for all headlines/display/stat numbers/pull-quotes; Instrument Sans for body/UI/nav/forms; IBM Plex Mono for data/labels/eyebrow numerals only. The serif-headline-over-sans-paragraph pairing is described as "the fastest visual signal that a page is OXOT."
- **Small orange text uses `--primary-ink`, never `--primary`** — brand orange fails WCAG AA contrast under 24px; this is a hard accessibility rule, not a style preference.

### Voice / structural rules relevant to copywriting

- Top-level nav/menu items are **sentence case, never uppercase, never letter-spaced** — only the kicker, footer headings, and language pills get the wide-tracked uppercase treatment.
- The signature "kicker" pattern: 12px, weight 600, uppercase, 0.18em letter-spacing, orange — used above every section heading and hero headline.
- **Bilingual by construction** — no user-facing copy ships English-only; every page/component must be written to survive Dutch running 15–20% longer than English (verify layouts at 375px width in both locales).
- House pattern for factual/spec content: mono-uppercase key (`SCOPE / DURATION / BASIS / APPROACH / OUTPUT`) on the left, sans value on the right, separated by a dashed rule — the preferred way to present structured facts (a natural fit for presenting the P1–P8 capability facts extracted above).
- Numbered sections use a mono `01`, `02`... counter in orange plus a short orange rule under the heading — the house pattern for any "how it works" step sequence (fits the 8-step customer journey and the 7-step SL-T derivation procedure well).
- Standard page header pattern: kicker → serif H1 with one lucide icon in `--primary` → 3–5 sentence description in muted sans → actions. On statutory/compliance pages, the kicker anchors to the specific governing regulation article (e.g., "CRA ARTICLE 32 · DIGITAL PRODUCT CONFORMITY ASSESSMENT") — a pattern that could extend naturally to standards like IEC 62443 or TS 50701 clauses when writing about SL-T/case-dossier capabilities.
- Any page with 3+ H2 headings auto-generates a sticky left table of contents — relevant if the extracted capability content above becomes long-form pages.

### Things explicitly called out as brand violations ("what breaks the brand")

Hard-coding a hex colour; using `--primary` for text under 24px; adding a second accent colour; setting the wordmark in serif; letter-spacing the wordmark below 0.24em; uppercase top-level nav; light-mode-only colour definitions; animating `width`/`height`/`top`/`left` instead of `transform`/`opacity`; auto-rotating content with no pause control; shipping an unstyled control; shipping English-only copy; trusting an overflow measurement without looking at the actual screenshot at 375px; using a drop shadow for depth on the dark navy surface (use inset highlight instead).

### No banned-words list found

The style guide as provided is a **visual/technical design system document** (colour tokens, typography, motion, components, navigation) — it does not contain a banned-words/tone-of-voice/messaging list. If a banned-words or voice/tone document exists elsewhere in the codebase, it was not included in this extraction's source set and should be sourced separately before finalizing sitewide copy rules.

---

## Key Takeaways — Strongest, Most Specific, Most Underused Claims

1. **The Aalberts-relevant case study is the best proof asset in the corpus and may be underused:** a real 101-document, 3-volume IEC 62443/TS 50701 Cybersecurity Case Dossier delivered in 5 months with one senior engineer + the platform, versus an estimated 8–12 analysts over 12–18 months conventionally — with zero rework/remediation requests from the independent assessor. This is a rare, concrete, numbers-backed engagement outcome; most of the rest of the corpus is mechanism/architecture description.

2. **"Null over default" / no-fabrication AI discipline is a genuine, explainable trust differentiator** that most AI-powered GRC/security tools cannot articulate. Every synthesized number traces to a real source document or is stored as an explicit null — never a guessed default. This directly answers the "can I trust your AI's numbers" objection that's likely a top blocker for skeptical OT buyers.

3. **The ATQ V1→V2 rigor story (2.9-point spread → 10.6-point spread, a 3.7× gain in discriminatory power) is a compelling, specific "we don't ship lazy scoring" proof point** that's currently buried in a deep-dive doc — it demonstrates methodological seriousness in a way a headline number alone can't.

4. **TACAM's CPE/product-level dimension (62,965 actor-product clusters) is the single most defensible, hardest-to-replicate differentiator found:** the ability to answer "which named threat actors can exploit this exact PLC/vendor product I'm considering buying" turns procurement decisions into financial ones. No competitor is credited with matching this level of granularity.

5. **The "physics-ensemble" forecasting story (SIR epidemic model + Hawkes self-exciting process + Granovetter/Kramers threshold cascade) is a distinctive, explainable mechanism** — borrowing established math from epidemiology, seismology/finance, and sociology/physics — that's more sophisticated-sounding and more honest than generic "AI-powered prediction" claims used elsewhere in the market. Caution: back-test/accuracy numbers are not yet available, so frame as "how it reasons," not "how accurate it's been proven."

6. **The bidirectional FMECA↔MITRE ATT&CK mapping (SL-T = IC + AC − 1) is a rare, concrete answer to a real unsolved standards gap** — TS 50701 mandates safety/security convergence but provides no formula; OXOT's is described as new. This is strong differentiated IP for any customer in rail, but the underlying formula/logic generalizes to any sector with formal safety analysis (process industries under IEC 61511, energy under NERC CIP) — worth surfacing beyond just the rail-specific pages.

7. **The Sandworm-vs.-Cl0p "same danger score, opposite motivations" contrast is highly usable, vivid, named-actor proof content** for a "how our AI thinks about threats" page — concrete, specific, memorable, and responsibly caveated (explicit ethical-use boundaries around not psychologizing individuals).

8. **The "island mode" / fully air-gapped, self-hosted, 12-container, customer-hardware deployment story is a strong sovereignty/data-control differentiator** for European (especially Dutch/EU, GDPR-sensitive) OT buyers who are wary of cloud-dependent security vendors — currently appears only in an internal capability-notes bullet list, not developed into customer-facing copy.

9. **Numbers to use with confidence (verified counts) vs. numbers to avoid using as "proven" (explicitly `[PENDING EVALUATION]` in source):** Safe — corpus/scale counts (504 SEC filings, 443 governance rows, 624 actors, 62,965 TACAM clusters, 100,000 Monte Carlo trials per ALE run, 101 documents/5 months in the case study). Avoid presenting as validated — any specific computed ALE dollar figure, forecast probability, attack-path probability, or NER/attribution accuracy percentage; these are illustrative mechanism outputs in draft academic papers, not audited results.

10. **The style guide has no banned-words/tone-of-voice document** — only a visual/technical design system. A messaging/voice guide (banned words, tone rules) should be sourced separately if it exists, since it wasn't part of this file set.
