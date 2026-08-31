# Source Extraction: IEC 62443 / TS 50701 Reference Library + CDT Spec Sheets

**Purpose of this document:** Extraction only, for feeding OXOT's website copy. Not a reproduction of IEC 62443 or TS 50701 content. Goal was to identify what OXOT can credibly claim about its own **method and expertise** based on having produced this depth of reference material — not to publish the standards themselves.

**Important caveat on sourcing:** Several source files (`ICS-SEC-TVA_BASIS_001` through `004`, and the REF-04/05/06 files) are drawn from — or explicitly labeled as anonymized worked examples from — a real, completed urban rail transit cybersecurity engagement (redacted as "[Project Name]" throughout, with stakeholder/vendor names redacted or present). The BASIS files carry an explicit note: *"This document contains worked example data from a completed urban rail transit cybersecurity engagement. All client-identifying information has been anonymized. The technical analysis is preserved as a reference exemplar."* Treat all figures below as **OXOT's demonstrated methodology and case-study depth**, safe to reference in generalized form ("in a recent metro rail engagement, we..."), but do **not** publish the specific vendor names (Siemens WestRace, Honeywell, Frauscher, Aruba, FortiGate, etc.), station names, country identifiers, or document control numbers found in the raw source — those remain confidential to the underlying client engagement even though the numeric/methodological findings are presented as an anonymized exemplar.

---

## 1. TVA Methodology (Threat & Vulnerability Assessment) — a named, formulaic method

**What it is in plain English:** OXOT (via its principal) has built out a formal, repeatable methodology for deriving a rail/OT system's required cybersecurity posture — not from opinion or generic best practice, but from a defensible equation that pulls inputs from two independent engineering disciplines: safety engineering (RAMS/FMECA/Hazard Log) and cyber threat intelligence (MITRE ATT&CK-based threat actor profiling).

**The formula:** `SL-T = IC + AC − 1` (capped at 4)
- **IC (Impact Category, 1–4):** the worst-case physical/safety consequence of compromise, sourced from FMECA, Hazard Logs, and RAMS — not assumed.
- **AC (Attacker Capability, 1–4):** the sophistication of the credible threat actor, sourced from MITRE ATT&CK for ICS technique mapping and threat-actor profiling (nation-state APT down to opportunistic/script-kiddie).
- **SL-T (Target Security Level):** the resulting, mathematically-derived requirement — not a guess, not a checklist answer.

**Why a buyer should care:** This is the core differentiator versus generic security consulting — the security requirement for every zone is *traceable* to a specific safety document and a specific threat intelligence source, not asserted. This produces an "auditable and engineering-grade" security level that "withstands rigorous regulatory scrutiny" (source's own words) — directly relevant to OT buyers who need to defend spend and design decisions to regulators, boards, and insurers.

**Precise numbers worth citing (generalized, from the anonymized rail case study):**
- SuC (System under Consideration) scoping: **20 subsystems and 562+ digital assets** identified and boundary-defined from contract engineering documentation.
- **6 security zones** (Life-Safety, Security & Surveillance, Building Automation, Passenger Services, Integration & Control, External Access), each independently zone-and-conduit partitioned per IEC 62443-3-2 grouping criteria (operational function, SL consistency, safety separation per TS 50701 §6.4.2).
- **6 IP conduits and 6 hardwired bypasses** documented between zones.
- **16 distinct TVA attack scenarios** developed, each modeling a specific threat actor and full kill chain against MITRE ATT&CK for ICS v14, each cross-cited to specific IEC 62443-3-3 SR countermeasures.
- Every SL-T assignment cross-validated against RAMS SIL designations, with **0 delta** (all 6 zones' calculated SL-T matched the assigned zone-register value) — i.e., the formula-driven method reproduced the same answer as the safety engineers' independent designations, which is strong validation evidence.

**Source files:** `ICS-SEC-REF-04_REF_TVA_Methodology.md`, `ICS-SEC-TVA_BASIS_004_SIL_SLT.md`

---

## 2. FMECA–MITRE ATT&CK Bidirectional Mapping (named register/methodology)

**What it is:** A formal "Bidirectional Mapping Register" that connects safety engineering's Failure Modes, Effects & Criticality Analysis (FMECA) — specifically its Safety-Critical Items List (SCIL) and Reliability-Critical Items List (RCIL) — to MITRE ATT&CK for ICS techniques, in both directions:
- **Forward:** given a safety-critical component, which attack techniques can exploit it?
- **Reverse:** given an adversary technique, which safety-critical components are at risk?

**Why a buyer should care:** This is precisely the "consequence-centric vs. cause-centric" bridging problem that most OT security vendors never solve — safety engineers describe *what* goes wrong (a hazard), while cyber frameworks describe *how* an attacker causes it (a technique). OXOT's register formally closes that gap with traceable, auditable mapping rather than a narrative bridge.

**Precise numbers worth citing (from the anonymized case study):**
- **15 of 15 (100%) Safety-Critical Items (SCIL)** mapped to specific MITRE ATT&CK for ICS techniques.
- **13 of 15 (87%) Reliability-Critical Items (RCIL)** mapped (remainder excluded by design — purely physical items like track/escalators with no credible cyber pathway).
- A defined classification scheme distinguishing **DIRECT-SAFETY** (no fail-safe backstop — attack directly causes the hazard), **DEFEAT-FAILSAFE** (attacker must first defeat an engineered fail-safe), and **INDIRECT-SAFETY** (compromise propagates through a supervisory layer) consequence classes — a genuinely novel, precise taxonomy for scoring cyber-physical risk.
- Internal quality-gate discipline: a documented "QG-26" quality gate with pass/fail criteria (≥80% coverage threshold, cross-validation against scenarios, bidirectional completeness) and a **91% QA score** achieved — evidence of a repeatable internal audit process, not one-off analysis.
- Methodology verified via **deep semantic vector search across 23,955 embedded engineering-document chunks (from 682 source documents)**, using 768-dimensional embeddings, cross-referenced against a minimum of 10 ranked source matches with cosine similarity ≥0.70 for every confirmation item — a striking, concrete claim about AI-assisted document verification depth that is genuinely differentiating for credibility copy (most competitors cannot show this level of engineering-document-scale rigor).

**Source file:** `ICS-SEC-TVA_BASIS_002_FMECA_MITRE.md`

---

## 3. Hazard-TVA Traceability Register (safety-security convergence, framework-bridging)

**What it is:** A second, complementary bidirectional register — this one linking the Hazard Log (using the railway industry's RSSB Hazard-Based Safety methodology, 17 consequence-centric hazard categories: Collision, Derailment, Fire, Evacuation, Electric Shock, Fall, etc.) to the 16 TVA attack scenarios.

**Why a buyer should care:** This directly operationalizes TS 50701 Clause 6.3.2 ("the cybersecurity risk assessment shall consider the safety consequences... taking into account the results of the safety analysis"), which most integrators treat as a narrative requirement rather than a literal, auditable one. OXOT built the literal, bidirectional, entry-level traceability that clause actually demands.

**Precise numbers worth citing:**
- Cross-referenced against a **910-entry hazard register** (DOORS export baseline).
- **774 unique Safety Related Application Conditions (SRACs)** tracked and cross-mapped to specific IEC 62443-3-3 Security Requirements — i.e., every "the operator must do X to keep this system safe" condition has an explicit cyber-dependency and countermeasure mapped to it.
- **15 of 16 TVA scenarios (94%) formally COMPLIANT** with TS 50701 §6.3.2 traceability requirements; the 1 partial scenario had a clearly documented, narrow reason (pending access to a specific downstream register) — evidence of honest, granular self-auditing rather than blanket compliance claims.
- Named a specific, identified gap in the industry standard itself: railway Hazard Logs have **no dedicated "cyber" hazard category** — cyber causation is only inferable from free-text hazard descriptions. OXOT's register is explicitly positioned as the fix/bridge for this structural gap — a strong "we understand the standard better than the standard understands itself" positioning point.

**Source file:** `ICS-SEC-TVA_BASIS_003_Hazard_Traceability.md`

---

## 4. SIL–SL-T Calibration Record (formal derivation, cross-validated)

**What it is:** The document that walks, zone-by-zone, through the literal application of the SL-T formula (see §1), citing FMECA severity category, RAMS SIL, Hazard Log consequence/likelihood, threat-actor tier, and the resulting calculated vs. assigned SL-T — with an explicit "Delta" column proving the two match.

**Why a buyer should care:** This is the single clearest "show your work" artifact in the corpus — it proves OXOT's security-level assignments aren't arbitrary; they are derived, cited, and independently cross-checked (against SIL, against Hazard Log, against threat intel) with discrepancies (deltas) called out explicitly rather than hidden.

**Precise numbers worth citing:**
- A four-tier **Attacker Capability (AC) scale** explicitly calibrated to named threat-actor classes (Nation-State APT → Organised Crime/Ransomware → Hacktivist/DDoS → Opportunistic), each tied to a Hazard-Log-style likelihood band (events/hour) — a genuinely rare fusion of safety-engineering probability language and cyber threat modeling.
- **All 6 zones: Delta = 0** — every calculated SL-T matched the independently-assigned zone-register value, with zero unresolved discrepancies.
- **5 of 5 open confirmation items resolved** via the same deep vector search method (23,955 chunks / 682 documents / cosine similarity ≥0.70) described in §2 — reinforcing that this isn't a one-off flex but a standard verification step in the methodology.

**Source file:** `ICS-SEC-TVA_BASIS_004_SIL_SLT.md`

---

## 5. Rail / TS 50701 Sector Specialization — an underused vertical angle

**What it is:** The corpus demonstrates deep, specific expertise in **railway cybersecurity** (TS 50701:2021, the CENELEC/EN 50126 RAMS lifecycle, and the interlock between Safety Case and Cybersecurity Case) — not generic OT security with a rail label slapped on. This is a genuine specialization angle that appears underused on the live website relative to its depth in the reference library.

**Why a buyer should care / market it:**
- Rail is a distinct compliance universe: **EN 50126/50128/50129 (RAMS)**, **TS 50701** (rail-specific cybersecurity, built explicitly on IEC 62443-3-2/3-3), and the concept of a **"Cybersecurity Case"** (deliberately modeled on the rail industry's existing "Safety Case" concept, per TS 50701's own design intent) as the sign-off vehicle for Practical Completion (PC).
- OXOT's material shows fluency in rail-specific structures that generalist OT vendors typically don't touch: **Security-Related Application Conditions (SecRACs)** as the formal liability-transfer mechanism at handover; **SIL-to-SL-T derivation** (explicitly *not* a fixed lookup table in the standard — a risk-based derivation process, which OXOT has operationalized into a formula); the distinction between **SL-T / SL-C / SL-A** (Target / Capability / Achieved Security Level); and a full **7-artifact Practical-Completion evidence schedule** (Final Cybersecurity Case, Risk Assessment Report, Validation Report, Exported SecRACs, As-Built Asset Inventory/Zone Diagram, Patch Management Plan, Backup/DR Plan) with dependency ordering and due-date-before-PC timing.
- A concrete, credible case-study anchor: a **rail metro tunnel-and-station cyber-physical system** engagement (anonymized) spanning fire detection, tunnel ventilation, signalling/CBTC interlocking, traction power SCADA, and building management — i.e., proof of work on genuinely safety-critical, life-safety-adjacent OT, not a hypothetical.
- Named, credible attack scenarios grounded in real 2024–2025 ICS threat intelligence (not hypothetical): threat actor and malware precedents cited include **Volt Typhoon** (nation-state pre-positioning), **FrostyGoop** (Modbus TCP ICS malware), **Qilin** and **Cl0p** (ransomware groups actively targeting rail/manufacturing OT in 2025), and CVE-level vulnerabilities (e.g., a CVSS 10.0 pre-auth RCE in Erlang/OTP affecting PLCs) mapped directly to specific MITRE ATT&CK for ICS techniques and specific rail subsystems.
- 16 named, codenamed internal attack scenarios (e.g., IRONBOLT for signalling interlocking manipulation, BLINDSIDE for coordinated emergency-egress disruption, TUNNELSNAKE for tunnel ventilation compromise) demonstrate a mature, war-gamed internal scenario library — this kind of naming convention is a credibility signal borrowed from mature threat-intel shops (Mandiant/CrowdStrike-style) and is unusual for a boutique OT consultancy to have built out to this level of formal detail.

**Source files:** `ICS-SEC-REF-02_REF_REQ_TS50701.md`, `ICS-SEC-REF-03_REF_IEC62443_TS50701.md`, `IEC62443-TS50701 RAIL.md`, all four `ICS-SEC-TVA_BASIS_*` files

---

## 6. IEC 62443 Depth — Foundational Requirements and the Cybersecurity Case artifact schedule

**What it is:** Full command of IEC 62443-3-3's seven Foundational Requirements (FR1–FR7) and their constituent System Requirements/Requirement Enhancements across SL-1 through SL-4, plus IEC 62443-4-1/4-2 product-level requirements (Secure Product Development Lifecycle, Maturity Levels ML1–ML4, Component Security Assurance).

**Why a buyer should care:** Most vendors cite "IEC 62443 compliant" as a slogan. OXOT's material shows granular, SR-by-SR command of what SL-2 (the de facto rail/critical-infra minimum) actually requires versus SL-1 — e.g., specifically that SL-2 mandates unique user IDs (no shared "Admin"/"1234" accounts), MFA on untrusted-network access, and centralized/protected audit logging, none of which are automatic at SL-1. This level of "what does the auditor actually check" specificity is a credibility signal for CISO/compliance buyers who have been burned by vague compliance claims before.

**Precise numbers worth citing:**
- SL-1 requires **~33 total requirements**; SL-2 **~51**; SL-3 **~68**; SL-4 **~76** (cumulative SR+RE count across all 7 FRs, per IEC 62443-3-3 Annex B Table B.1) — a good "here's how much harder SL-3 actually is than SL-2" talking point for justifying budget/scope conversations.
- A **7-artifact mandatory Practical-Completion evidence schedule** (see §5) with explicit due-date-before-handover requirements — useful for positioning OXOT/the CDT as generating this evidence "from the same living model" rather than as a bolt-on paperwork exercise (this maps directly to existing CDT product messaging — see §8).
- IEC 62443-4-1's Component Security Assurance evaluation is a **4-category, 47-requirement process** (SDLPA, SDA, FSA, VIT) — useful shorthand for explaining supplier/vendor vetting rigor.

**Source files:** `ICS-SEC-REF-01_REQ_IEC62443.md`, `ICS-SEC-REF-03_REF_IEC62443_TS50701.md`, `IEC-62443 - IACS - Product Specifications.md`

---

## 7. Threat Intelligence Depth — named actors, CVE-level, MITRE-mapped

**What it is:** The reference library shows OXOT tracks threat intelligence at a specificity most boutique OT consultancies do not sustain: named ransomware/APT groups with current TTPs (Qilin, Cl0p, LockBit 3.0, BlackCat/ALPHV, Volt Typhoon), specific CVEs with CVSS scores and rail/ICS-relevant impact analysis, and formal mapping of all of it to MITRE ATT&CK for ICS v14 tactic/technique IDs.

**Why a buyer should care:** This substantiates a "we don't do generic security theater" positioning — the threat model behind every recommendation is current (2025 vintage), named, and technique-mapped, not a boilerplate "hackers might attack you" narrative.

**Precise numbers/facts worth citing:**
- **146% increase** in industrial sites suffering physical consequences from cyberattacks (412 sites in 2023 → 1,015 in 2024) — Waterfall Security 2025 OT Cyber Threat Report, cited across multiple source files, useful as an external-validation stat.
- **70% of the financial impact** of an industrial breach comes from indirect losses (shutdowns, contractual penalties, supply-chain disruption), not the direct incident cost — reinforces ALE-style consequence modeling as the right framing (ties to CDT's ALE-based Consequence Index — see §8).
- Stolen-credential attacks (T1078) **surpassed phishing (T1566)** as the #2 initial-access vector for the first time in 2025 (16% vs 14% of intrusions) — a specific, current, citable data point for "why MFA/PAM matters now" copy.
- **40% of industrial organizations** have OT assets insecurely exposed to the public internet (Claroty) — a strong "the air gap is a myth" stat.

**Source files:** `ICS-SEC-REF-07_REF_Threat_Intel.md`, `ICS-SEC-REF-08_Cyber_Threat_Taxonomy.md`, `ICS-SEC-REF-09_ICS_Cyber_Threats.md`, `ICS-SEC-REF-10_Cyber_Threat_Comparables.md`

---

## 8. TACAM & ATQ — a proprietary, named threat-actor scoring system (product feature, not just methodology)

**What it is:** Distinct from the rail/IEC 62443 corpus, the Spec_Sheets files describe two named, proprietary analytical frameworks built into the OXOT Seldon Engine:
- **TACAM (Threat Actor Capability & Motivation Matrix):** a 7-dimensional profile of every tracked threat actor (TTP, Sector Affinity, Geography, Protocol Capability, Temporal Rhythm, CPE/product match, CWE/weakness concentration).
- **ATQ (Actor Threat Quotient):** a single 0–100 composite score per threat actor, built from a transparent, decomposable **12-factor weighted formula** (not a black box) — each factor traceable to a specific data source and weight.

**Why a buyer should care:** This is arguably the single strongest, most differentiating, most quotable set of facts in the entire corpus for website copy — it converts "we track threat intelligence" (a claim every vendor makes) into a demonstrable, numbers-backed, auditable scoring system that answers board-level questions ("how much more dangerous is this actor than that one, and why") that competitors reduce to adjectives ("sophisticated," "well-resourced").

**Precise numbers/counts worth citing:**
- TACAM matrix: **77,279 data points across 389 threat actor groups**, drawing on **62,965 CPE (product) rows**, **2,278 sector-targeting rows**, **1,579 TTP rows**.
- ATQ formula: **12 weighted components** (EIC Score 18%, Kill Chain Completeness 14%, Temporal Threat Score 13%, EPSS Base 10%, Technique Reach 10%, Vendor Exposure 10%, Sector Reach 5%, Protocol Reach 5%, Incident Count 5%, Campaign Recency 5%, EPSS Velocity 5%, Geopolitical Tension 5%), computed from **555,556 EPSS trajectory records**, **79,376 knowledge-graph edges**, and **35,341 geopolitical events**.
- A documented model-improvement narrative: the prior 3-factor scoring system produced a top-30-actor spread of only **2.9 points** (essentially a statistical tie); the 12-factor reform widened that to **10.6 points** — a **3.7× gain in discriminatory power**. This "we rebuilt our own scoring model when we found it wasn't good enough" narrative is a strong, rare credibility signal (most vendors never admit a v1 model was weak).
- Concrete example outputs quotable almost verbatim for marketing: *"Because Volt Typhoon (ATQ 78.6) has pre-positioned in your sector with rising EPSS velocity on CVEs affecting your vendor stack, the optimal security investment is $17.4M — $8.2M above your current spend"* — ties threat-actor scoring directly to a Gordon-Loeb optimal-investment financial output.
- A procurement/vendor-risk use case with a concrete worked number: adding a named vendor's product line to a SCADA stack was shown to increase fleet ALE by **+$2.1M (+4.4%)** — demonstrates the scoring system feeding directly into financial risk quantification, not just a security dashboard.

**Source files:** `102_Support_docs_TACAM.md`, `103_Support_docs_ATQ.md`

---

## 9. WorldMonitor / External Pressures Engine — geopolitical risk fusion (supporting product feature)

**What it is:** A geopolitical/economic/environmental intelligence fusion layer (Level 5 of the CDT's 7-layer stack) that feeds TACAM/ATQ with real-world signal: 500+ curated news/RSS feeds, GDELT and ACLED conflict data, military/maritime/aviation tracking, disaster and outage layers (USGS, NASA EONET, UN GDACS), energy/commodity pricing, and a derived **Country Instability Index for 31 Tier-1 countries**.

**Why a buyer should care:** Supports the "why now" urgency argument in copy — threat actor capability/motivation isn't treated as static; it moves with real-world events (sanctions, conflict, supply-chain shocks), and OXOT's platform is explicitly built to detect and price that movement into risk scores rather than publish a threat report once a year.

**Source file:** `104_Support_docs_external_pressures.md`

---

## 10. CDT Product Architecture — supporting context for the methodology (not the assignment's focus, but load-bearing)

The Spec_Sheet product docs (`CDT-FEATURE-2PAGER.md`, `CDT-PRODUCT-SHEET.md`, `CDT_notes_2026_AUG_20.md`) confirm how the above methodology is packaged as product capability, which is useful context for aligning "method" claims with "product" claims in copy:

- **7-layer model** (Physics → Assets → Interop/Protocols → Networks → Data Fusion → Services → Governance) — the FMECA/SCIL/RCIL consequence engineering and the IEC 62443 zones/conduits work described in §§1–6 map directly onto Layers 1–4 and 7 of this stack, i.e., the rail-engagement methodology IS the productized CDT methodology, not a separate consulting-only capability.
- **5 machine-readable BOMs** (SBOM, HBOM, CBOM including post-quantum crypto readiness, SaaS-BOM, Ops-BOM), built on **DEXPI 2.0** engineering schema, expressed in **CycloneDX**, feeding directly into the **EU CRA Annex VII technical file**.
- **Monte Carlo simulation: 10,000 MITRE-aligned attack campaigns per pass**, producing a probability-of-reaching-a-safety-critical-system output with a **95% confidence interval** — this is the productized, automated version of the manual TVA-scenario kill-chain analysis described in §§1–2.
- **NOW / NEXT / NEVER** triage model and a euro/dollar-denominated **Consequence Index (ALE-based, with CVaR tails)** — directly continuous with the "70% of breach cost is indirect" and Gordon-Loeb investment-threshold framing from the threat-intel and ATQ material (§§7–8).
- Deployment: single-tenant, **AWS European Sovereign Cloud or fully on-premises "Island" instance**, passive-first (no agents on controllers), **14-day M&A/facility baseline** and **60-day CRA Transit engagement** as named, time-boxed service products.

**Source files:** `CDT-FEATURE-2PAGER.md`, `CDT-PRODUCT-SHEET.md`, `CDT_notes_2026_AUG_20.md`

---

## Key Takeaways — most credibility-building, specific claims found

1. **A named, formulaic security-level derivation method** (`SL-T = IC + AC − 1`) that pulls inputs from independently-sourced safety engineering (FMECA/Hazard Log/RAMS) and cyber threat intelligence (MITRE ATT&CK) — not an opinion-based risk rating. This is the single best "method, not vibes" claim in the corpus.
2. **Cross-validation with zero unexplained discrepancies**: in a full 6-zone rail engagement, every formula-calculated SL-T matched the independently-assigned security level with **Delta = 0** across all zones — proof the method reproduces expert judgment rather than diverging from it.
3. **100% SCIL (safety-critical item) coverage** in a bidirectional FMECA-to-MITRE-ATT&CK mapping register, with a documented internal quality gate (91% QA score) — evidence of a repeatable, audited process rather than a one-time deliverable.
4. **Engineering-document-scale AI-assisted verification**: confirmations cross-checked via deep vector search across **23,955 embedded document chunks from 682 source documents**, cosine similarity ≥0.70 — a concrete, unusual, and hard-to-fake claim about the scale of due diligence behind every finding.
5. **A proprietary, transparent, 12-factor threat-actor scoring system (ATQ)** that converts vague adjectives ("sophisticated," "well-resourced") into an auditable 0–100 score with a documented 3.7× improvement in discriminatory power over its own prior version — including the rare, credibility-boosting admission that the earlier version wasn't precise enough and was rebuilt.
6. **A 77,279-data-point, 389-actor, 7-dimensional threat matrix (TACAM)** capable of sub-second cross-queries like "which actors target my sector with my specific vendor's PLC model" — a genuinely differentiated procurement/vendor-risk capability most competitors cannot replicate.
7. **Deep, specific rail-sector fluency** (TS 50701, EN 50126/50128/50129 RAMS lifecycle, Cybersecurity Case / Safety Case interlock, SecRACs) grounded in a real (anonymized) metro rail tunnel-and-station engagement covering fire detection, tunnel ventilation, and signalling interlocking — an underused vertical specialization angle for case-study-driven copy.
8. **Current, named threat intelligence** (Volt Typhoon, FrostyGoop, Qilin, Cl0p, LockBit 3.0) mapped to specific MITRE ATT&CK for ICS techniques and specific rail/OT subsystems, not generic "cyber threats are increasing" language.
9. **Financial-outcome-linked risk quantification**: threat-actor scores and vulnerability findings resolve into board-legible euro/dollar figures (e.g., a stated $17.4M optimal-investment recommendation, a +$2.1M ALE delta from a single vendor swap) — ties the technical depth directly to C-suite/CFO buying language already central to OXOT's positioning.
10. **The rail-engagement methodology and the productized Cyber Digital Twin are the same methodology**, not two different capabilities — the FMECA/SCIL/RCIL consequence engineering, the zones/conduits work, and the Monte Carlo/MITRE-aligned simulation are described identically in both the confidential engagement material and the public-facing product spec sheets, which supports "proven on real safety-critical infrastructure, now productized" as a defensible claim.
