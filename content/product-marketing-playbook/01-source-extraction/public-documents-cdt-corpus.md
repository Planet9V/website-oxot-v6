# OXOT Public Documents Corpus — Structured Extraction

**CORRECTION (2026-08-21, added after initial extraction):** this extraction originally described all 7 source files as living "on the live OXOT site" — that was wrong for at least doc #4 (see below) and was never actually verified against the real production repository for any of the 7. All 7 files were read from `/Users/jimmcknney/oxot_website_public_sept/public/documents/`, a local sandbox/tooling directory with no git remote and no deployment — not from the real production website repo (`jim_private/oxot_website_production/oxot-website`), which has no `public/documents/` directory at all and no code route serving one. Doc #4 (`OXOT_CDT_Homepage_CRO_Strategy.md`) was reported to the user as an urgent live-exposure risk on that basis; the user asked to pull it, the claim was verified and found incorrect (no real exposure existed), and the file has since been deleted from the sandbox. See `../02-discovery/phase-1-discovery.md` §1 for the full correction. The analysis below is left intact as a record of what was found and why it was flagged — treat every "live"/"public site" reference in the rest of this file as describing the sandbox copy, not the real deployed site, unless a future check confirms otherwise.

Source: 7 markdown files, at the time read from `/public/documents/` in this session's sandbox/tooling directory (not confirmed to be on the live OXOT site — see correction above). Extraction date: 2026-08-21. Purpose: raw material for a copy/marketing reference corpus — not an editorial judgment on what should ship.

Each source uses the brand mark `O<span class="brand-x">X</span>OT` (0.28em letter-spacing, orange X accent) and is styled as a "Spec Sheet" with a document-type header block (Document Type/Class, Target Audience, Brand Mark, Core Architecture/Differentiator).

---

# 1. OXOT_CDT_Technical_Architecture_Spec.md

**File:** `/public/documents/OXOT_CDT_Technical_Architecture_Spec.md` (83 lines)

## Purpose / Audience
Declared as: **Document Type: Technical Specification. Target: Engineers, System Architects, Plant Operations.** The most narrowly engineering-focused of the seven — no financial/board framing, pure architecture and standards mapping. Includes an embedded image reference: `/images/CDT_Arch_Stack_Dark.png` ("OXOT CDT Architecture Stack").

## Product/Capability Claims (exact language)
- "The **OXOT Seldon Engine** models industrial facilities across seven connected layers, linking physical plant operations to company risk management."
- "Industrial plants run systems from multiple vendors (Siemens, Rockwell, Honeywell, Schneider Electric). The Seldon Engine works with open data formats across all layers."
- "**P&ID Schematic Import (DEXPI 2.0):** Reads ISO 15926 DEXPI XML files to build digital twin models directly from plant piping and instrumentation drawings."
- "**Native Protocol Parsing (Level 03):** Decodes OPC UA binary streams, MQTT topics, Modbus TCP, EtherNet/IP, and DNP3 without active network polling." (Note: "without active network polling" is a strong passive-only claim.)
- "**Four-Layer BOM Tracking**" — SBOM, HBOM, CBOM, SaaSBOM (note: this doc lists 4 BOMs; other docs later expand to 5 with Ops-BOM — an inconsistency across the corpus).
- TACAM defined here as "**Threat Attack Consequence Analysis Model**" — tests exploit paths against current plant setup; "matches threat actor tools against specific PLC logic and network maps to predict if a cyber attack can move from IT networks into Level 1 physical disruption." (Note: elsewhere in the corpus TACAM is defined differently — "Threat Actor Capability & Motivation Matrix" — a direct naming/definition inconsistency, flagged below.)
- Monte Carlo "Alternate History" Simulations test: **Accidental Drift** (human error, misconfigured PLC registers, unauthorized engineering workstation changes), **Equipment Investment Modeling** (financial benefit of replacing RTUs/adding firewalls before capital spend), **Geopolitical Pressure Injection** (real-time supply chain delays and threat actor activity).
- Purdue alignment diagram maps Level 07 Governance → Corporate Risk & IEC 62443 Security Program down to Level 01 Physics → Purdue Level 0 (Process Equipment & Sensors), with an explicit "IT/OT Boundary" line drawn between Level 04/05.

## Numbers / Quantified Claims
- 7-layer model (Level 01–07)
- 4 BOM types listed (SBOM, HBOM, CBOM, SaaSBOM) — vs. 5 elsewhere
- Compliance Engine standards named: IEC 62443, EU CRA Annex VII, TS 50701, NIS2, NIST SP 800-82
- Simulation Engine described as "Physics-Based Monte Carlo Random Walk Engine" (no campaign count given here, unlike other docs' "10,000 per pass")

## Company Facts / Credentials / Differentiators
None — no company facts, founders, or credentials in this document at all. Pure product architecture.

## Persona / Audience Language
Engineers, system architects, plant operations — technical practitioners, not buyers. No pain-point or JTBD framing (contrast with doc #4).

## Publishability Read
Reads as a finished, internally consistent technical one-pager **except** for the TACAM naming conflict (see below) and the BOM count inconsistency (4 vs. 5). No placeholder text, no internal-only language. Lowest-risk document of the seven from a "should this be public" standpoint.

---

# 2. OXOT_CDT_Product_Capability_Spec_Sheet.md

**File:** `/public/documents/OXOT_CDT_Product_Capability_Spec_Sheet.md` (107 lines)

## Purpose / Audience
**Document Class: Feature & Capability Architecture Specification. Target Audience: CISOs, Plant Managers, Chief Architects, Risk Actuaries, M&A Due Diligence Leads.** Stated core differentiator (verbatim): *"Traditional digital twins optimize yield and throughput. OXOT Cyber Digital Twins protect minimum operating requirements and facility crown jewels."*

## Product/Capability Claims (exact language)
- "Born from the necessity to execute high-stakes M&A due diligence under tight deadlines, the OXOT Seldon Engine provides a living, engineering-grade model of critical infrastructure assets."
- Names a long list of proprietary-sounding sub-systems in one sentence: "Level 01 facility physics, Purdue network topology, 7-dimensional TACAM threat actor intelligence, ATQ 12-factor threat profiling, WorldMonitor external geopolitical pressures, Seldon Loss/Likelihood Transformer (SLT), Automated P&ID NER Extraction, Consequence Engineering Prioritization (NOW / NEXT / NEVER), and actuarial loss data (ALE) into one deterministic, board-ready risk model."
- TACAM here = "**Threat Actor Capability & Motivation Matrix**" — 7-Dimensional Spectral Matrix: "Pre-computed threat actor knowledge graph mapping threat groups across 7 analytical dimensions: TTP Cluster, Sector Affinity, Geography, Protocol Capability, Temporal Rhythm, CPE Match, and CWE Concentration."
- ATQ = "12-Factor Threat Actor Profiling" — "Quantified Score (0–100): Real-time scoring evaluating threat group capability, motivation, and sector convergence."
- WorldMonitor: "OXOT monitors real-time geopolitical, economic, military, and environmental pressures across 9 specialized domains ... driving a 31-Country Instability Index and infrastructure failure cascade analysis."
- 5-BOM Compass (SBOM, HBOM, CBOM, SaaSBOM, **Ops-BOM** — the 5th, "Workflows, maintenance schedules, and human access roles," not present in doc #1).
- Consequence Engineering: "FMECA & Safety Binding (IEC 60812)," "RCIL & SCIL Lists," "Seldon Loss/Likelihood Transformer (SLT): Mathematical AI model powering loss severity and likelihood forecasting," "Explicit Log-Normal Loss Severity Fitting: Statistical fitting of empirical breach loss distributions based on SEC EDGAR 8-K disclosures and NetDiligence claims studies," "Conditional Value at Risk (CVaR) Tail-Loss Formulas."
- "**Monte Carlo Simulation Engine:** Runs 10,000 attack campaigns per pass using Seldon's mathematical axioms to compute adversary breach probability with a 95% confidence interval."
- Ecosystem integrations named by vendor: OSIsoft PI, Honeywell PHD, GE Historian (historians); Claroty, Nozomi Networks, Dragos, Armis (network monitoring, "passive OT tools" + raw PCAP flows); ServiceNow, Jira Service Desk (ITSM/CMDB).
- Prioritization: "NOW / NEXT / NEVER Triage... giving security teams explicit written authorization to ignore non-critical alert noise." "**Glass-Box Transparency:** Complete auditability—every score and financial figure drills straight down to the exact empirical evidence, P&ID component tag, and source filing it came from."
- Deployment options (verbatim labels): "Option 1 — Island Mode (100% Isolated)," "Option 2 — One-Way Data-Diode Mode (Inbound Intelligence Streaming)," "Option 3 — Dedicated Instance (Sovereign Cloud)." Island Mode: "Features your own custom, locally hosted AI model running 100% on-site." Data-Diode: "Hardware-enforced one-way data diode... guaranteeing zero outbound data exits the facility."
- Engagement models: "Transient Consulting Services: ... e.g., 14-Day Rapid M&A Due Diligence Audit or 60-Day CRA Transit Engagement" and "Long-Term Enterprise Operations."

## Numbers / Quantified Claims
- 7 layers; 7 TACAM dimensions; 12 ATQ factors; 0–100 ATQ score; 9 WorldMonitor domains; 31-Country Instability Index; 5 BOM types; 10,000 Monte Carlo attack campaigns per pass; 95% confidence interval; CVaR at 95th/99th percentile; 14-day M&A audit; 60-day CRA engagement; AWS European Sovereign Cloud named specifically as a deployment example.

## Company Facts / Credentials / Differentiators
No company facts (founding, HQ, team). Differentiator is entirely product-mechanism-based (see tagline above).

## Persona / Audience Language
CISOs, Plant Managers, Chief Architects, Risk Actuaries, M&A Due Diligence Leads — named explicitly in the header, but body copy does not address them directly in second person; it's spec-sheet register throughout.

## Publishability Read
Reads as a finished, dense capability sheet. Very close in structure/content to Document #6 (Product_Sheet.md) — see cross-document note below; the two are near-duplicates with only minor wording differences (e.g., "7-dimensional analytical framework" vs. "7-dimensional analytical matrix," CISA sector count present in #6 but not #2). Numbers throughout (77,279 data points appears only in doc #4, not here) are stated with no citation or methodology footnote in this doc itself.

---

# 3. OXOT_CDT_Data_Engine_Grounding_Whitepaper.md

**File:** `/public/documents/OXOT_CDT_Data_Engine_Grounding_Whitepaper.md` (97 lines)

## Purpose / Audience
**Document Type: Actuarial & Plant Engineering Data Grounding Whitepaper. Target Audience: Risk Analysts, Actuaries, Insurers, CISOs, Plant Operations & Safety Leads.** Core architecture stated as "Inside-Out Engineering Fusion (Safety/Reliability/Operations) + Outside-In Actuarial Grounding (SEC/WorldMonitor/TACAM)." This is the document most focused on *how the numbers are grounded* — i.e., the credibility/evidence argument.

## Product/Capability Claims (exact language)
- "A cyber digital twin cannot rely solely on external threat feeds or generic IT surveys, nor can it rely solely on static internal safety logs." (implicit competitive claim against generic threat-feed products)
- ASCII data-fusion diagram: "INSIDE THE PLANT" (Safety: FMECA IEC 60812, Hazard Log ISO 31000, SCIL; Reliability: RCIL, RAMS EN 50126; Operations: MOR & downtime thresholds; Device Cascade Model) fused with "OUTSIDE THE PLANT" (SEC EDGAR 8-K/10-K, NetDiligence/CAS claims studies, TACAM & ATQ, WorldMonitor).
- Safety Team Input detail: "**FMECA Register (IEC 60812):** Captures Failure Mode, Effects & Criticality Analysis for every physical component tag." "**Hazard Log (ISO 31000):** Maintains a centralized hazard log scored against a 5×5 risk matrix." "**SCIL (Safety-Critical Items List):** Maps specific controllers, valves, and sensors directly to Safety Instrumented Functions (SIF) and Safety Integrity Levels (SIL 1–4)." "**Worst-Case Scenario Mapping (TS 50701):** Links cyber threat pathways to physical HAZOPS safety scenarios."
- Reliability Team Input: RCIL, RAMS Analysis (EN 50126), Device Cascade Modeling ("Models how a cyber compromise of a single Level 2 PLC tag cascades into mechanical equipment failures across Level 1 and Level 0 physical lines.")
- Operations Team Input: MOR definition — "Defines the minimum operational threshold required to keep a plant running safely without catastrophic shutdown." Downtime Financial Impact — "Maps precise financial loss curves per hour of production downtime across specific product lines."
- ALE formula given explicitly: $\text{ALE}_{\text{Device}} = \text{SLE} \times \text{ARO}$, with SLE = "physical downtime impact (MOR threshold + RAMS cascade) with historical breach severity benchmarks (SEC 8-K filings) using explicit log-normal severity fitting," ARO = "internal vulnerability reachability (Purdue topology) with external threat actor affinity (TACAM & ATQ scores)."
- Same three deployment options and two engagement models as doc #2, repeated verbatim in substance.

## Numbers / Quantified Claims
- 5×5 risk matrix; SIL 1–4; 95th/99th percentile CVaR; 14-day M&A audit; 60-day CRA Transit engagement.

## Company Facts / Credentials / Differentiators
None named. Differentiator argument is methodological ("we ground numbers in both plant engineering and external actuarial data, so nothing is made up").

## Persona / Audience Language
Explicitly written for a more analytical/actuarial reader than the other docs (risk analysts, actuaries, insurers) — the only doc that frames insurers as a direct audience.

## Publishability Read
Reads as finished and internally coherent. No placeholder text. The ALE formula and methodology claims are precise and would likely draw scrutiny from a sophisticated actuarial reader (e.g., an actual insurer) who might ask for the underlying loss model, calibration data, or validation — none of which is provided or footnoted. This is a "sounds authoritative, unverifiable as written" risk rather than a draft/placeholder risk.

---

# 4. OXOT_CDT_Homepage_CRO_Strategy.md

**File:** was at `/public/documents/OXOT_CDT_Homepage_CRO_Strategy.md` in the sandbox tooling directory (113 lines) — **flagged for full-detail extraction per task instructions. DELETED 2026-08-21 at user instruction, after it was confirmed this file was never actually reachable on the real production site — see the correction note at the top of this document.**

## Purpose / Audience
**Document Class: Conversion Rate Optimization (CRO) & Copywriting Strategy Guide. Target Audience: Web Developers, UX Designers, Product Marketers, Sales Engineers. Core Framework: Mechanism-First Copy Stack, Problem-Agitation-Proof Architecture, High-Intent Lead Capture Funnels.** This is unambiguously an **internal working/strategy document** — it is written to instruct OXOT's own team on how to build the site, not to inform a prospect. It was originally flagged here as the single strongest "should this be public" risk in the corpus; that risk turned out not to be real (the file was never live), but the content-class observation below (why this kind of document shouldn't sit in a public folder) remains valid if similar material is ever considered for the real site's `/public/documents/` in the future.

## Full Extraction of CRO Recommendations

### 4.1 — Customer Psychology & Awareness Stage Mapping
Three named buyer personas, each with an explicit pain quote, awareness stage, and psychological trigger:

| Persona | Pain / JTBD (verbatim quote) | Awareness Stage | Dominant Psychological Trigger |
|---|---|---|---|
| **OT CISO / VP of Security** | *"I need to prove to the board and insurers that our plants won't go down from a cyber attack, without flooding my engineers with alert noise."* | Solution-Aware | Proof & Certainty (statistical confidence, SEC 8-K grounding, zero fluff) |
| **M&A Due Diligence Lead** | *"I have 14 days to audit a target company's 5 manufacturing plants and find hidden cyber liabilities before we sign the acquisition."* | Problem-Aware | Speed & Risk Aversion (rapid 14-day setup, zero plant downtime, clear dollar exposure) |
| **Plant Operations Director** | *"I cannot allow IT security tools to disrupt PLC logic, trip safety valves, or cause unexpected downtime."* | Skeptical / Anxious | Safety & Autonomy (passive-first, zero-agent assurance, MOR guarantees) |

### 4.2 — Homepage Information Architecture (full blueprint, verbatim structure)
```
[HERO SECTION]
  Kicker: "PHYSICS-BASED CYBER DIGITAL TWIN"
  Headline: "Quantifying Plant Risk & Protecting Crown Jewels"
  Subheadline: 14-day M&A setup, ALE financial loss quantification, 100% on-premises Island Architecture.
  Dual CTAs: [Request 14-Day Baseline Assessment] (Primary) | [Explore Technical Architecture] (Secondary)

[PROBLEM & COMPARISON SECTION]
  Interactive 3-Way Comparison: Traditional Digital Twins vs IT Scanners vs OXOT CDT

[PROOF & SPECIFICATIONS SECTION]
  Spec-Row Component: Primary Metric, Simulation Capacity, 5-BOMs, Hosting Jurisdiction
  Grounding Proof: SEC 8-K disclosures, NetDiligence claims, 77,279 TACAM matrix data points

[INTERACTIVE 7-LAYER EXPLORER]
  Tabbed / Card Interface exploring Level 01 Physics down to Level 07 Governance

[LEAD CAPTURE FUNNEL SECTION]
  High-Intent Assessment Calculator & 14-Day Audit Request Form
```
(Note: "77,279 TACAM matrix data points" appears nowhere else in the corpus — it's the only occurrence of this specific figure.)

### 4.3 — Hero Section Copy Blueprint (exact copy specified)
- Kicker (`.oxot-kicker`): `PHYSICS-BASED CYBER DIGITAL TWIN`
- Headline (Newsreader Serif 48px): **"Quantifying Plant Risk & Protecting Crown Jewels"**
- Body copy (Instrument Sans 18px): *"We built the OXOT Seldon Engine to run M&A due diligence in 14 days. It is a living, physics-based Cyber Digital Twin (CDT) for critical infrastructure. OXOT unifies Level 1 process physics, 7-layer Purdue network maps, 7-dimensional threat actor intelligence (TACAM), live external pressure tracking (WorldMonitor), and insurance loss data (ALE) into one deterministic model."*
- Primary CTA: `[Request 14-Day Rapid Facility Assessment]`
- Secondary CTA: `[Read Technical Whitepaper]`
(Note: primary CTA label differs between §4.2's blueprint — "Request 14-Day Baseline Assessment" — and §4.3's spec — "Request 14-Day Rapid Facility Assessment." Internal inconsistency within the same document.)

### 4.4 — Feature Page Architectures (3 pages specified)
1. **`/features/7-layer-architecture`** — Headline: *"From Fluid Dynamics to Boardroom Compliance."* Mechanism: physical process kinetics (L01) → CISO reporting (L07). Interactive element: embedded 3D WebGL/Babylon.js facility view using `CDT_Arch_Stack_Dark.png`.
2. **`/features/threat-intelligence`** — Headline: *"7-Dimensional Threat Actor Spectral Decomposition."* Mechanism: cross-dimensional queries (Sector × CPE × TTP); claims generic IP threat feeds fail while "TACAM's 62,965 CPE product rows pinpoint exact PLC firmware vulnerabilities." Interactive element: Live CPE Vendor Blast Radius Search Widget.
3. **`/features/external-pressures`** — Headline: *"Correlating Geopolitical Tension to Facility Risk."* Mechanism: military movement, ACLED conflict events, commodity pricing, NASA EONET disaster feeds updating ALE in real time. Interactive element: 31-Country Instability Index Map.

### 4.5 — Lead Capture Funnel Offers (full detail)
**Offer 1 — 14-Day M&A Due Diligence Baseline Audit**
- Target Buyer: M&A Leads, PE Operating Partners, Corporate CISOs.
- Offer Promise (verbatim): *"Identify all unfunded cyber liabilities, crown-jewel failure modes, and IEC 62443 compliance gaps across target acquisition facilities in 14 days without plant disruption."*
- Friction Reducers: No controller agents, zero outbound cloud connections, 100% on-premises execution.

**Offer 2 — 60-Day CRA Transit Engagement**
- Target Buyer: Product Manufacturers, Industrial OEMs, EU Exporters.
- Offer Promise (verbatim): *"Build and export your complete EU Cyber Resilience Act (CRA) Annex VII Technical File from a single living digital twin model in 60 days."*

### 4.6 — Form CRO & Friction Reduction Guidelines (full detail)
1. Keep form fields minimal: Full Name; Work Email (**block generic Gmail/Yahoo domains**); Company & Facility Type (e.g., Oil & Gas, Chemical, Water Utility, Power Grid); Primary Goal (M&A Due Diligence / CRA Compliance / Living Facility Twin).
2. Microcopy at resistance points (verbatim):
   - Next to email input: *"We respect data sovereignty. Your details are never shared or sold."*
   - Next to submit button: *"Zero plant downtime. No controller agents installed."*
3. Instant value delivery: "Upon form submission, instantly provide an automated PDF download of the OXOT Technical Architecture Spec Sheet while routing the request to a senior OT engineer within 2 business hours."

## Comparison: Does the current live homepage follow this strategy?

**I checked the live dev server at `http://localhost:3000/en` (reachable, HTTP 200) and fetched its rendered text.** The current homepage **diverges substantially** from this CRO strategy doc on nearly every major point:

- **Hero headline differs entirely.** Doc says the headline should be *"Quantifying Plant Risk & Protecting Crown Jewels."* Live site headline is *"The full picture of your OT risk — and where your next euro reduces it most."* Different value proposition, different tone (less "physics/crown jewels," more "full/honest picture").
- **Primary CTA differs.** Doc specifies `[Request 14-Day Rapid Facility Assessment]` / `[Request 14-Day Baseline Assessment]` as the primary hero CTA. Live site's primary CTA is a conversational **"Talk to OX"** ("A short conversation with the people who would do the work — not a sales call and not a discovery questionnaire"), explicitly positioned as *not* a lead-gen funnel.
- **No 14-day M&A audit offer visible on the homepage as specced.** The live "Facility Due Diligence" section covers similar ground (architecture, asset inventory, IR readiness, physical security assessed on-site) but does not use the "14 days," "M&A," or "PE Operating Partners" framing from the doc.
- **No lead-capture form / assessment calculator on the homepage.** The doc's entire §4.6 (minimal-field form, generic-email blocking, resistance-point microcopy, instant PDF download) does not appear to be implemented — the live CTA path is a conversational "Talk to OX" flow, not a form.
- **No 3-way "Traditional Twins vs IT Scanners vs OXOT" comparison section** in the fetched homepage text (the closest analog is prose about "which failure would actually stop the line" vs. framework scores).
- **New, more prominent credential not present anywhere in the 7 source docs**: the live homepage leads with the **Dutch government / ECCC co-investment (CIF-NL 2025 grant)** — "one credential here that somebody else adjudicated," "maximum grant available," "13 of 95 applications selected," "17 of 20 points," announced 14 July 2026, RVO quote *"a truthful copy of reality."* None of the 7 spec docs mention this grant at all — it appears to be a newer, higher-priority proof point than anything in this corpus.
- **Consulting-services-first structure not reflected in the docs.** The live site foregrounds "Six [consulting] services" (OT Security Assessments, Programmes, Architecture & Segmentation, Secure Remote Access, OT Security Baseline, Capability Transfer) as a primary navigation path alongside the Cyber Digital Twin. The 7 source docs treat consulting only as an "Engagement Model" wrapper around the CDT product (Transient vs. Long-Term), not as a parallel six-service catalog.
- **Persona framing differs.** Live site's stated ethos ("what's true, not what's good for us," "every checkable claim... carries its source," vendor-neutral) is a trust/integrity positioning not present in the CRO doc's psychology-trigger framing (Proof & Certainty / Speed & Risk Aversion / Safety & Autonomy). The live copy explicitly claims sourced, checkable claims — which sits in tension with several unsourced stats in this same document corpus (see Risk Flags).
- **Terminology drift**: live site uses "SIL (IEC 61508)" for Safety Integrity Level; the source docs use "IEC 60812" for FMECA and separately reference SIL 1–4 without tying it to a specific IEC standard number, or tie SCIL/SIF to unspecified standards. Minor but worth reconciling if these docs feed new copy.

**Conclusion:** the live homepage does **not** currently implement this CRO strategy document's blueprint. It appears the site's actual direction evolved past this doc — most likely after the CIF-NL grant became the lead credential and the offer shifted from "14-day M&A audit lead magnet" toward a lower-friction "Talk to OX" conversational CTA and a broader consulting-services identity. This makes doc #4 a **historical/superseded strategy artifact** rather than a current build spec — relevant context for whoever uses this corpus to write new copy: treat its *psychology framework and persona pains* as still potentially useful, but treat its *literal section blueprint, CTA copy, and offer structure* as outdated versus the live site's current direction.

## Publishability Read
This is the clearest liability candidate in the corpus. It is an internal strategy/instruction document (audience: "Web Developers, UX Designers, Product Marketers, Sales Engineers") containing psychological-manipulation-style guidance ("Dominant Psychological Trigger," "Friction Reducers," "Microcopy at Resistance Points," instructions to block generic email domains to filter leads). If a sophisticated prospect (e.g., a PE due-diligence analyst — literally one of the personas being profiled) downloaded and read this file from `/public/documents/`, they would see themselves being explicitly reverse-engineered as a persona with a "dominant psychological trigger," which could damage trust — especially given the live site's own stated ethos of "not what's good for us — what's true for your situation." See Publishing Risk Flags below.

---

# 5. OXOT_CDT_Executive_Briefing.md

**File:** `/public/documents/OXOT_CDT_Executive_Briefing.md` (66 lines)

## Purpose / Audience
**Document Type: Executive Briefing. Target: CISOs, CFOs, Board Members, M&A Leads, Safety & Operations Directors.** The most financially/board-oriented document — written in a value-investing register, including a direct Warren Buffett quote.

## Product/Capability Claims (exact language)
- "Industrial companies face a gap between risk management reports and plant realities: 1. Traditional Digital Twins focus on production yield and throughput under normal conditions. 2. IT Vulnerability Scanners output thousands of unprioritized CVE alerts, ignoring plant physics, heat limits, and SCADA connections."
- "We built the Seldon Engine to run M&A due diligence under tight deadlines."
- "In value investing, risk is not stock price movement or an arbitrary 1-to-10 risk score. It is the permanent loss of capital." — framed explicitly against generic "risk score" competitors.
- Direct quote, attributed: *"It's only when the tide goes out that you discover who's been swimming naked."* (Warren Buffett) — used to frame the "Economic Moat" section.
- "OXOT offers two clear financial advantages": (1) **Protecting Owner Earnings** — "Downtime cuts directly into earnings. By measuring ALE at the asset, facility, and enterprise levels, CISOs and CFOs can spend security budgets where they cut financial exposure fastest (using NOW / NEXT / NEVER priorities)." (2) **High-Switching-Cost Economic Moat** — "OXOT uses a self-sufficient Island Architecture. The platform runs entirely on customer hardware inside the OT perimeter without connecting to external cloud servers. Once a plant imports its 7-layer Purdue setup, P&ID drawings, and SCADA data into Seldon, the resulting risk model stays on-site as a permanent asset for underwriters and boards." (This is an explicit "lock-in as a benefit" / switching-cost argument — worth noting for tone review since it frames vendor lock-in positively to the buyer.)

## Numbers / Quantified Claims
- ALE = SLE × ARO (formula restated)
- "16 critical infrastructure sectors" for SEC EDGAR/NetDiligence grounding (first appearance of this specific number in the corpus)
- 100% On-Premises deployment claim in spec table

## Company Facts / Credentials / Differentiators
None named (no company history, team, or funding). Differentiator is purely economic/strategic argument (owner earnings + economic moat framing).

## Persona / Audience Language
Written directly to financial decision-makers (CFOs, boards) in investing vocabulary ("owner earnings," "economic moat," "permanent loss of capital") — distinct register from the engineering-heavy docs #1 and #3.

## Publishability Read
Reads as finished. No placeholders. One stylistic risk: framing the product's *lack of interoperability/exportability* ("the resulting risk model stays on-site as a permanent asset") explicitly as a "high-switching-cost economic moat" for OXOT is a level of candor a savvy CFO/board reader might interpret unfavorably (i.e., "they're telling us this is designed to lock us in"). Not a factual/legal risk, but a tone risk worth flagging for copy revision.

---

# 6. OXOT_CDT_Product_Sheet.md

**File:** `/public/documents/OXOT_CDT_Product_Sheet.md` (123 lines)

## Purpose / Audience
**Document Class: Official Product Capability Sheet. Target Audience: CISOs, Plant Managers, Chief Architects, Risk Actuaries, M&A Due Diligence Leads. Tagline: "Operational eXcellence in Operational Technology."** This is the only document in the corpus that states the OXOT tagline/name-meaning explicitly.

## Product/Capability Claims (exact language)
This document is **near-identical in structure and content to Document #2** (Product_Capability_Spec_Sheet.md) — same 8 numbered sections (7-Layer Stack, TACAM/ATQ, WorldMonitor, 5-BOM Compass, Consequence Engineering, Ecosystem Integrations, Prioritization/Scoring, Deployment/Engagement). Differences worth noting:
- Opens with the kicker/headline pairing used in the CRO doc's hero spec: `<div class="oxot-kicker">PHYSICS-BASED CYBER DIGITAL TWIN</div>` followed by `# Quantifying Plant Risk & Protecting Crown Jewels` — i.e., this document appears to be the **actual implementation of the CRO doc's hero copy blueprint** (headline matches exactly), unlike the current live homepage which uses different copy.
- Adds a full "Technical & System Specifications" spec-row table up top (not present identically in doc #2) including: **"SIMULATION CAPACITY | 10,000 Monte Carlo Attack Campaigns / Pass (95% Confidence Interval)"**, **"ECOSYSTEM INTEGRATIONS | CMDBs, Data Historians (OSIsoft PI), Network Monitoring (Claroty, Dragos), ITSM (ServiceNow)"**.
- Level 06 Services row names "**Analyst Studio (3D Globe, Radar, Podcast Briefing)**" — matching the "Analyst Studio" terminology used in doc #7, whereas doc #2 lists these as separate bullet items without the "Analyst Studio" umbrella name.
- TACAM Sector Affinity is quantified here as "**17 CISA sectors**" (matches doc #7; doc #2 just says "Sector Affinity" with no number).
- "Two-way integration with enterprise ITSM/CMDB tools (ServiceNow, Jira Service Desk)" — doc #2 doesn't specify "two-way."

## Numbers / Quantified Claims
Same core figures as doc #2: 7 layers, 7 TACAM dimensions (now with 17 CISA sectors specified), 12 ATQ factors, 0–100 score, 9 WorldMonitor domains, 31-country index, 5 BOMs, 10,000 Monte Carlo campaigns/pass, 95% CI, CVaR 95/99, 14-day audit, 60-day CRA engagement.

## Company Facts / Credentials / Differentiators
Tagline given: "Operational eXcellence in Operational Technology" (the only doc to spell out what "OXOT" stands for). No other company facts.

## Persona / Audience Language
Identical target-audience list to doc #2; body copy in spec-sheet register, not second-person persuasive copy.

## Publishability Read
Reads as finished, but its near-total content overlap with Document #2 is the most notable issue — see Publishing Risk Flags (duplicate/redundant public collateral, inconsistent minor details between the "same" document under two names).

---

# 7. OXOT_CDT_v2_Master_Reference_Sheet.md

**File:** `/public/documents/OXOT_CDT_v2_Master_Reference_Sheet.md` (154 lines) — **treated as the most authoritative/complete single source per task instructions; extracted in full depth below.**

## Purpose / Audience
**Document Class: Technical & Product Reference Sheet (v2.0 Complete Edition). Target Audience: CISOs, Plant Managers, Chief Architects, Risk Actuaries, M&A Due Diligence Leads, Safety & Operations Leads.** Explicitly versioned ("v2.0") and labeled "Complete Edition" — signals this supersedes/consolidates the other product-spec docs (#2, #6, and overlaps with #1 and #3). This is the broadest single document in the corpus.

## Executive Overview (verbatim framing)
"The OXOT Seldon Engine is a physics-based Cyber Digital Twin (CDT) built to model critical infrastructure facilities, evaluate operational risks, and calculate financial loss exposure under tight deadlines." "Unlike traditional digital twins that focus solely on production yield or IT vulnerability scanners that output thousands of unprioritized CVE alerts, OXOT unifies Level 01 facility physics, Purdue network topology, plant engineering data (Safety SCIL, Reliability RCIL, Operations MOR, Device Cascades), 7-dimensional TACAM threat actor intelligence, WorldMonitor external pressures, Seldon Loss/Likelihood Transformer (SLT), and actuarial loss models (ALE) into one deterministic model." "The platform identifies risks to minimum operating requirements and protects facility crown jewels. It translates plant physics and cyber threat paths into financial loss numbers, giving boards clear data for capital allocation."

## 01 — The 7-Layer Physics & Cyber Architecture Stack (fullest version in corpus)
This document gives the most granular sub-bullet detail per layer of any doc:

- **Level 01 · Facility Physics:** Thermodynamics & Fluid Dynamics (fluid pressures, flow rates, heat transfers, chemical reaction boundaries); Process Kinetics (pipe bursts, valve failures, chemical spills, thermal runaway from cyber attack or parameter drift); Environmental Kinetics (ambient pressures, temperature extremes, physical containment limits).
- **Level 02 · Assets:** PLC Logic & Program Parsing (ladder logic, structured text, PLC config files); SCADA & Controller Configs (SCADA, RTUs, HMI configs); Virtualized Elements & Field Sensors (field instruments, actuators, smart meters, virtualized control elements).
- **Level 03 · Interoperation:** **Automated Named Entity Recognition (NER) & NLP Pipeline** — "Parses un-annotated CAD files and legacy PDF drawings to automatically extract P&ID equipment tags, pipe line numbers, valve types, and safety interlocks directly into DEXPI 2.0 XML schema extended to include CycloneDX data models." Industrial Protocol Parsing (OPC UA, MQTT, Modbus TCP, DNP3, EtherNet/IP, **PROFINET**, **BACnet** — the widest protocol list in the corpus). CycloneDX Data Integration. Ecosystem Integrations (named again: CMDBs; OSIsoft PI, Honeywell PHD; Claroty, Nozomi, Dragos, PCAP; ServiceNow, Jira Service Desk).
- **Level 04 · Networks:** Virtual Network State (routes, VLANs, subnets, virtual firewalls); Purdue Model Segmentation (maps boundaries across Purdue Levels 0–4, verifies DMZ isolation); Flow Data & Boundary Inspection (PCAP analysis for unauthorized cross-zone paths).
- **Level 05 · Data Fusion:** Inside-Out Plant Engineering Fusion (Safety FMECA/Hazard Logs/SCIL, Reliability RCIL/RAMS, Operations MOR); Device Cascade Modeling; Outside-In External Data (SEC EDGAR 8-K, NetDiligence, World Bank indicators, ACLED).
- **Level 06 · Services:** AI/ML Process Optimization; Interactive P&ID Visual Canvas (drag-and-drop); **Analyst Studio & Interactive Visualizers** — 3D WebGL Threat Globe (animated attack arcs, origin regions to customer plant sites), Radial Threat Radar (proximity-based threat ranking), Podcast Briefing Studio ("Automated audio briefing generation from platform research briefs"); **Red Squadron AI** — "Adversary emulation module that generates realistic attack campaigns against the digital twin." (Note: "Red Squadron AI" appears **only** in this document — not named in any other of the 7 docs, despite the broader "capability" docs listing Analyst Studio components. Worth flagging as either a newer/unique feature or an inconsistency to reconcile.)
- **Level 07 · Governance:** ALE Financial Exposure Engine (95% CI); Consequence Index (component-tag to enterprise rollup); Monte Carlo Alternate History (tests patching, segmentation, equipment upgrades); Compliance Reporting (EU CRA Annex VII, IEC 62443, NIS2, TS 50701 — note: sentence trails off with a trailing comma in the source, "...NIS2, TS 50701," suggesting a possible cut-off/incomplete list — see Risk Flags).

## 02 — Plant Engineering & Operations Integration
Same Safety/Reliability/Operations three-team structure as doc #3, with identical FMECA/Hazard Log/SCIL, RCIL/RAMS, and MOR detail (verbatim overlap with doc #3's §03).

## 03 — Threat Actor Intelligence: TACAM & ATQ
TACAM here = "**Threat Actor Capability & Motivation Matrix**" (matches doc #2/#6's definition, NOT doc #1's "Threat Attack Consequence Analysis Model" — confirms the naming inconsistency is between doc #1 and the rest of the corpus). Adds full protocol list for "Protocol Capability" dimension: "Modbus, OPC UA, DNP3, PROFINET, BACnet, MQTT, EtherNet/IP." Confirms 17 CISA sectors for Sector Affinity.

## 04 — External Pressures & WorldMonitor
Identical 9-domain list and 31-Country Instability Index as docs #2/#6.

## 05 — The 5-BOM Supply Chain Compass
Identical to docs #2/#6, with one addition: SBOM description extended to "software libraries **and firmware**" (docs #2/#6 say "software libraries" only).

## 06 — Seldon Simulation Engine & Actuarial ALE
Fullest single statement of the ALE formula and simulation claims in the corpus: SLT ("Mathematical AI model powering loss severity and likelihood forecasting across complex network graphs"); Log-Normal Loss Severity Fitting (SEC 8-K + NetDiligence); CVaR 95%/99%; **"Monte Carlo Attack Simulation Pipeline: Runs 10,000 attack campaigns per pass using Seldon's mathematical axioms to compute adversary breach probability with a 95% confidence interval."**; ALE = SLE × ARO restated with explicit "marrying internal plant MOR downtime financial curves with external actuarial claims."

## 07 — Ecosystem Integrations
Same four categories (Asset Management/CMDBs, Data Historians, Network Monitoring, Service Management), phrased with slightly stronger claims than other docs: "ingest asset models and flow data **without operational disruption**" (header line) and "Two-way integration... for **automated remediation tracking**" (ITSM).

## 08 — Deployment Architecture, Sovereignty & Engagement Models
Same 3 deployment options (Island Mode, One-Way Data-Diode, Dedicated AWS Sovereign Instance) and 2 engagement models (Transient: 14-Day M&A Audit or 60-Day CRA Transit; Long-Term Enterprise Operations), with language tightened slightly ("Fully air-gapped execution," "physically guaranteeing zero outbound data leaves the facility," "full capability transfer to internal customer teams").

## Numbers / Quantified Claims (full roll-up, this document)
7 layers; 3 teams (Safety/Reliability/Operations); SIL 1–4; 5×5 hazard matrix (implied via ISO 31000 ref, not restated numerically here); 7 TACAM dimensions; 17 CISA sectors; 7 named protocols (Modbus, OPC UA, DNP3, PROFINET, BACnet, MQTT, EtherNet/IP); 12 ATQ factors; 0–100 score; 9 WorldMonitor domains; 31-country index; 5 BOMs; 10,000 Monte Carlo campaigns/pass; 95% CI; CVaR 95%/99%; 3 deployment options; 2 engagement models; 14-day M&A audit; 60-day CRA engagement.

## Company Facts / Credentials / Differentiators
None named directly (no founders, HQ, history, funding) — consistent with the rest of the corpus. Differentiator argument restates the "traditional twins vs. IT scanners vs. OXOT" three-way contrast used in docs #4 and #5.

## Persona / Audience Language
Widest persona list in the corpus (adds "Safety & Operations Leads" to the CISO/Plant Manager/Architect/Actuary/M&A list used in docs #2 and #6). Body copy remains spec-sheet register throughout — no second-person persuasive copy, consistent with its "reference sheet" framing rather than "brochure" framing.

## Publishability Read
Most complete and (mostly) internally consistent document in the corpus — appropriate as the "master" reference. Two issues: (1) the Level 07 compliance-standards list ends on a trailing comma ("NIS2, TS 50701,") which reads as an accidental truncation/incomplete sentence — a proofreading defect that would look sloppy to a careful reader (e.g., a compliance officer checking exactly which standards are covered); (2) introduces "Red Squadron AI" with no analog anywhere else in the corpus, and no methodology/limitations note for an "adversary emulation module that generates realistic attack campaigns" — a capability claim that, if untested or aspirational, is worth confirming before highlighting further in new copy.

---

# Cross-Document Inconsistency Notes

These recur across multiple documents and are relevant to a copy audit because they represent real fact-conflicts, not just phrasing variation:

1. **TACAM has two different names/definitions in the corpus.** Doc #1: "Threat Attack Consequence Analysis Model" (exploit-path testing against plant setup). Docs #2, #6, #7: "Threat Actor Capability & Motivation Matrix" (7-D threat actor knowledge graph). Same acronym, materially different meaning. Any new copy needs to pick one definition.
2. **BOM count is 4 in doc #1** (SBOM, HBOM, CBOM, SaaSBOM) **vs. 5 everywhere else** (adds Ops-BOM). Doc #1 appears to predate the Ops-BOM addition or simply omitted it.
3. **"77,279 TACAM matrix data points"** (doc #4) and **"62,965 CPE product rows"** (doc #4) are each cited exactly once in the entire corpus, only in the CRO strategy doc, with no supporting detail or source in any of the other six documents. If these numbers are meant to become public-facing proof points, they currently have no grounding elsewhere in the corpus.
4. **"16 critical infrastructure sectors"** (doc #5, Executive Briefing) vs. **"17 CISA sectors"** (docs #6, #7, referring to TACAM's Sector Affinity dimension) — these may be two different sector counts for two different purposes (SEC/NetDiligence grounding vs. CISA critical infrastructure sectors), but as written they read as a possible inconsistency (16 vs. 17) a careful reader would flag.
5. **"Red Squadron AI"** appears only in doc #7 (Master Reference Sheet), absent from the two capability-focused docs (#2, #6) that otherwise enumerate Level 06 Services in similar detail.
6. **Docs #2 and #6 are near-duplicates** — same 8-section structure, same headers, overlapping sentences, minor factual deltas (see doc #6 section above: "17 CISA sectors" present in #6 but not #2; "two-way integration" present in #6 but not #2). Two public PDFs/markdown files carrying almost the same content under different filenames is redundant and could confuse a reader comparing them, or look like careless collateral management to a due-diligence-minded visitor (ironic, since M&A due diligence leads are a named persona).

---

# Key Takeaways

1. **The corpus describes one product (OXOT Seldon Engine / Cyber Digital Twin) through a consistent 7-layer Purdue-aligned architecture** (Physics → Assets → Interop → Networks → Data Fusion → Services → Governance), and this framework is the strongest, most reusable structural asset across all seven documents for new copy.
2. **The core differentiator claim is consistent and quotable**: "Traditional digital twins optimize yield and throughput. OXOT Cyber Digital Twins protect minimum operating requirements and facility crown jewels" (doc #2), paired with "Traditional Digital Twins focus on production yield... IT Vulnerability Scanners output thousands of unprioritized CVE alerts, ignoring plant physics" (doc #5).
3. **ALE (Annualized Loss Expectancy) is the flagship metric** across every doc: ALE = SLE × ARO, always paired with the "Inside-Out" (Safety SCIL / Reliability RCIL / Operations MOR / Device Cascades) + "Outside-In" (SEC EDGAR 8-K/10-K, NetDiligence, TACAM, WorldMonitor) grounding argument. This inside-out/outside-in framing is the corpus's single most repeated and most defensible mechanism claim.
4. **Deployment sovereignty (Island Mode / Data-Diode / Dedicated AWS Sovereign Instance) and the "14-Day M&A Audit" / "60-Day CRA Transit" engagement offers are the two concrete, repeatable commercial hooks** used identically across five of the seven documents.
5. **The CRO strategy document (doc #4) is the richest source of ready-to-use persona pain quotes and JTBD language** — but its literal section blueprint, hero copy, and CTA labels do **not** match the current live homepage, which has moved toward a "Talk to OX" conversational CTA and leads with the CIF-NL government grant instead of the 14-day audit offer.
6. **The live site has a major proof point — the Dutch government/ECCC CIF-NL 2025 co-investment — that appears nowhere in any of these 7 documents.** Any new copy work should treat this grant as the freshest and most credible external validation available, likely superseding some of the unsourced internal stats in this corpus.
7. **Terminology and figures are not fully reconciled across the corpus**: TACAM has two competing definitions, BOM count is 4 vs. 5, sector counts are 16 vs. 17, and two "data point" statistics (77,279 / 62,965) appear only once each with no cross-referencing. A copy refresh should pick single canonical definitions/numbers before reuse.
8. **None of the seven documents state basic company facts** (legal entity, HQ, founders, team size, incorporation date) — this is present only on the live site ("OXOT B.V. · Netherlands"). The documents are pure product/technical collateral, not "about us" material.
9. **Two documents (#2 and #6) are near-duplicate public files** — worth consolidating or clearly differentiating if both remain published.
10. **Precise-sounding but unsourced statistics recur throughout** (10,000 Monte Carlo campaigns/pass, 95%/99% CVaR, 77,279 data points, 62,965 CPE rows, 31-country index) — strong marketing numbers, but none are footnoted with methodology or a verification path, which is in tension with the live site's own stated principle that "every checkable claim on this site carries its source."

---

# Publishing Risk Flags

Ranked roughly by severity, for a document sitting in a public, downloadable `/public/documents/` folder:

1. **RESOLVED, was never actually HIGH — Doc #4 (Homepage_CRO_Strategy.md) is an internal strategy/instruction document that should never sit in a public folder, but it turned out not to actually be live on the real site.** It profiles named buyer personas by their "Dominant Psychological Trigger," instructs the team to insert specific manipulation-adjacent microcopy at "Resistance Points," and instructs blocking generic email domains to filter leads — content that would be a real credibility risk (e.g., to the very "M&A Due Diligence Lead" persona it describes) if a prospect ever found it. It was originally reported to the user as a live exposure; verification showed the file only existed in this session's local sandbox directory, never in the real production repo. Deleted from the sandbox 2026-08-21. Keep this content class out of the real site's `/public/documents/` if similar material is drafted in the future — the underlying judgment call was right even though the specific "it's live" claim wasn't.
2. **MEDIUM — Unsourced, highly precise statistics that could be tested/challenged by a sophisticated reader.** "10,000 Monte Carlo attack campaigns per pass," "77,279 TACAM matrix data points," "62,965 CPE product rows," "95%/99% CVaR," "31-Country Instability Index," "17 CISA sectors" — all stated as fact with zero methodology, calibration, or citation in the documents themselves. Target personas explicitly include actuaries, insurers, and M&A due-diligence leads — exactly the readers most likely to ask "how was this number derived, and can I verify it?" If any of these figures are aspirational/roadmap rather than shipped/measured, publishing them as flat capability claims is a liability, especially for the M&A due-diligence use case where a buyer might rely on these figures for actual deal decisions.
3. **MEDIUM — Inconsistent facts across public documents describing the same product.** TACAM's definition differs by document (doc #1 vs. the other five docs); BOM count is 4 in one doc and 5 in the rest; sector counts differ (16 vs. 17). A careful reader who downloads more than one document (again — due-diligence personas are likely to do exactly this) will notice the product being described differently depending on which PDF they open. This reads as unreviewed/inconsistent collateral rather than a single coherent product story.
4. **MEDIUM — "Red Squadron AI" and other Level 06 "Analyst Studio" features (3D WebGL Threat Globe, Radial Threat Radar, Podcast Briefing Studio) are described as shipped capabilities with no caveats.** Given this is an early-stage company (per the live site, recently awarded a modest €60–100k Dutch innovation grant, announced 14 July 2026), it is worth internally confirming whether every named feature is actually built and available today versus roadmap/concept — publishing unbuilt features as current capability is a standard source of credibility risk if a prospect asks for a live demo of a specific named feature and it doesn't exist yet.
5. **LOW–MEDIUM — Doc #7's Level 07 compliance list ends on an incomplete sentence** ("...NIS2, TS 50701," with a trailing comma and no closing content) — reads as a proofreading/truncation error. Minor on its own, but in a document a compliance-focused reader (CISO, EU exporter needing CRA Annex VII) is likely to scrutinize closely, a visible cut-off sentence undermines confidence in the rest of the content's care/accuracy.
6. **LOW — Docs #2 and #6 are near-duplicate files published under two different names** with small factual deltas between them (e.g., "17 CISA sectors" stated in one, omitted in the other). Not a liability in the legal/factual sense, but it is a collateral-management issue that looks unpolished, particularly to due-diligence-minded readers who are professionally inclined to cross-reference documents against each other.
7. **LOW — Doc #5's "high-switching-cost economic moat" framing may read poorly to a sophisticated CFO/board reader** if interpreted as OXOT openly stating a goal of vendor lock-in ("the resulting risk model stays on-site as a permanent asset... economic moat"). Not false or unverified, but a tone/positioning risk worth a copy pass — most vendors don't say the quiet part about switching costs out loud to the buyer.
8. **NOTE (not a risk, but relevant context) — None of the 7 documents reflect the live site's current lead differentiator (the Dutch CIF-NL government grant) or its "Talk to OX" conversational CTA / six-service consulting catalog.** This isn't a liability per se, but it does mean this corpus is describing an earlier/different version of OXOT's go-to-market than what's live today — anyone using this corpus to write new copy should treat it as historical/product-architecture ground truth, not as the current positioning source of truth.
