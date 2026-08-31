# Product Marketing Context — OXOT

**Document version:** v1
**Last updated:** 2026-08-21
**Status:** Draft, auto-generated from source material for Phase 1 Discovery (playbook run). Not yet reviewed against the live site by a human. Deposit copy: canonical location, if adopted for ongoing use by other marketing skills, would be `.agents/product-marketing.md` in the website repo — kept here in the playbook folder for this run.

**Sources this draft is built from:** the 4 structured extraction files in `../01-source-extraction/` (PDF product sheets, `/public/documents` corpus, CDT methodology/brand papers, IEC 62443/TS 50701 reference library), plus this session's direct knowledge of the live site's current copy (post-CRA-depublish state, homepage headline, footer, CIF-NL grant panel, six-service Consulting catalog, "Talk to OX" CTA).

---

## Product Overview

**One-liner:** OXOT builds a physics-based digital twin of your industrial facility and prices your cyber risk in euros — so you know what to fix first, what to spend, and what you can safely leave alone.

**What it does (2-3 sentences):** OXOT's Seldon Engine ingests a facility's P&ID drawings, asset inventory, and network topology to build a living, engineering-grade "Cyber Digital Twin" — then cross-references it against real-world threat intelligence (named actors, CVEs, exploit trends) and actuarial loss data (SEC disclosures, insurance claims) to compute Annualized Loss Expectancy (ALE): a dollar-denominated, board-ready risk number. Consulting engagements (assessments, architecture/segmentation, secure remote access, capability transfer) deliver the same methodology hands-on, historically proven on real safety-critical infrastructure (rail/metro IEC 62443 + TS 50701 case work).

**Product category:** OT/industrial cybersecurity risk quantification — a physics-based cyber digital twin, positioned as a layer *above* OT network-monitoring tools (Claroty/Dragos/Nozomi/Armis), not a replacement for them.

**Product type:** Consulting-led platform (SaaS or self-hosted "Island" deployment) + professional services (assessments, programmes, capability transfer). Not sold as shrink-wrapped software.

**Business model:** Platform license (€/$50K–500K/yr by facility count, per internal spec sheets — **unverified against current live pricing, not published on the site**) + one-time onboarding + time-boxed consulting engagements (e.g., 14-day facility baseline, 60-day compliance-transit engagement, per internal docs — **these specific offers are not currently live on the site**; live site instead leads with a conversational "Talk to OX" CTA and a six-service Consulting catalog). **Flag: internal product-sheet pricing/offer structure and live-site GTM have diverged — see Divergence Notes below.**

---

## Target Audience

**Target companies:** Multi-site industrial/critical-infrastructure operators in sectors where downtime is measured in six figures/day or worse — rail/transit, energy/utilities, water, oil & gas, chemical, manufacturing. ICP skews European (Dutch/EU sovereignty positioning is load-bearing), but the methodology and compliance mapping (IEC 62443, NIS2, CRA, TS 50701) is EU-frameworks-first with some US-framework depth also present internally (NERC CIP, TSA, CFATS — not surfaced on the live site).

**Decision-makers:** CISO / VP of OT Security (primary technical champion); Plant Manager / Operations Director (has effective veto — will kill anything perceived as risking safety systems or causing downtime); CFO / board (budget authority, wants a defensible number, not a heatmap); Chief Architect; Compliance/regulatory lead; M&A / corporate development (for due-diligence-flavored engagements, though the CRA-linked "14-day M&A audit" offer is not currently live).

**Primary use case:** Answer, in a board-legible dollar figure, "what is my OT cyber risk, what should I fix first, and what can I safely ignore" — without deploying anything that could disrupt PLC logic, trip safety valves, or require plant downtime.

**Jobs to be done:**
- "Give me a number I can defend to my board and my insurer, not a red/yellow/green heatmap."
- "Tell me what to fix first, and give my engineers explicit permission to ignore the rest of the alert noise."
- "Build a compliance trail (CRA/NIS2/IEC 62443/TS 50701) as a byproduct of the same work, not a separate project."

**Use cases / scenarios:**
- Facility Due Diligence — establishing an as-built baseline (architecture, asset inventory to device level, incident-response readiness, physical security) before anything else starts.
- OT Security Assessments and Programmes (live site's six-service Consulting catalog).
- Architecture & Segmentation, Secure Remote Access, OT Security Baseline, Capability Transfer.
- IEC 62443 / TS 50701 compliance case-dossier delivery (proven internally on a real anonymized rail-transit engagement — not yet published as a case study on the live site).
- M&A due diligence on a target's OT facilities (internal product-sheet framing; not currently a named live-site offer).

---

## Personas

| Persona | Cares about | Challenge (verbatim JTBD quote from internal strategy doc) | Value we promise |
|---|---|---|---|
| **OT CISO / VP of Security** (primary) | Proving to the board/insurers that plants won't go down from a cyber attack, without flooding engineers with noise | *"I need to prove to the board and insurers that our plants won't go down from a cyber attack, without flooding my engineers with alert noise."* | A dollar-denominated, sourced risk number (ALE) plus a NOW/NEXT/NEVER triage that gives explicit authorization to ignore non-critical noise |
| **Plant Operations Director** (has veto) | Zero disruption to PLC logic, safety valves, or uptime; distrust of "IT security" tools touching OT | *"I cannot allow IT security tools to disrupt PLC logic, trip safety valves, or cause unexpected downtime."* | Passive-first, zero-agent assessment; deployment options (Island mode / data-diode) that never touch live control loops |
| **CFO / Board Member** (budget authority, secondary) | A number they can act on and defend, not a vendor's risk score | (implied, from Executive Briefing framing: "risk is not an arbitrary 1-to-10 score, it is the permanent loss of capital") | ALE modeled the way an insurer prices risk — Gordon-Loeb-bounded investment recommendation, not a marketing number |
| **Chief Architect / Compliance Lead** (technical influencer, secondary) | Auditable traceability from safety engineering to security requirement to regulatory clause | (implied from TS 50701/IEC 62443 methodology material) | SL-T = IC + AC − 1 formula-derived security levels, bidirectionally traceable to FMECA/hazard logs and named ATT&CK techniques |
| **M&A Due Diligence Lead** (named in internal docs, not currently a live-site persona) | Finding hidden cyber liabilities across target facilities on a deal clock | *"I have 14 days to audit a target company's 5 manufacturing plants and find hidden cyber liabilities before we sign the acquisition."* | Rapid, non-disruptive baseline assessment with clear dollar exposure — **not currently a named offer on the live site; flag for the approval-gate conversation** |

**Note on OT Engineer persona (per the user's original playbook framing — "two audiences: C-Suite and OT Engineers"):** the source corpus is written almost entirely to buyers (CISO/CFO/Plant Manager/M&A), not to hands-on OT engineers as a distinct persuasion target. The closest analog is the Plant Operations Director row above. If the site's OT-Engineer-facing pages (Purdue model, P&ID depth) need their own persona treatment distinct from "the person who can veto the project," that's a gap this corpus doesn't fully answer and is worth flagging explicitly at the approval gate rather than inventing one unsupported by source material.

---

## Problems & Pain Points

**Core problem:** Industrial operators carry OT cyber risk that has never actually been measured — a network drawing that predates the last three retrofits, an asset list built from memory instead of a floor walk, and no dollar figure a board or insurer would accept as a real number.

**Why current alternatives fall short:**
- Traditional digital twins optimize yield/throughput, not security.
- IT vulnerability scanners output thousands of unprioritized CVE alerts that ignore plant physics, heat limits, and SCADA connections.
- Generic threat feeds are a firehose — not filtered to the specific equipment, sector, and geography that's actually installed.
- Existing "risk scores" are red/yellow/green heatmaps, not a number a CFO can defend.
- Compliance work (CRA, NIS2, IEC 62443, TS 50701) is usually a separate, paperwork-heavy workstream disconnected from actual security engineering.

**What it costs them:** Downtime cuts directly into earnings; 70% of the financial impact of an industrial breach is indirect (shutdowns, contractual penalties, supply-chain disruption) — not the headline incident cost (Waterfall Security 2025 report, cited in internal reference material — verify before publishing as a site-wide stat).

**Emotional tension:** Fear of being the CISO who couldn't answer "what's actually running on that PLC" when an assessor, insurer, or incident forces the question; fear of an IT-style tool causing the exact physical disruption it was bought to prevent.

---

## Competitive Landscape

**Direct:** No vendor identified in the source corpus combines a physics-based, P&ID-level facility twin *with* actuarial-grade financial risk quantification (ALE) in one platform. This combination is the corpus's most repeated differentiation claim.

**Adjacent / complementary (explicitly NOT positioned as competitors — a "layer above" framing):** Claroty, Dragos, Nozomi Networks, Armis — network-level OT visibility and passive monitoring. OXOT's stated edge: adds an equipment-level asset twin plus financial quantification on top of what these tools already see. Internal sell-sheet guidance is explicit that this positioning must stay complementary, not competitive, in any external messaging.

**Secondary (same problem, different solution):** Axio, RiskLens — standalone cyber-risk-quantification tools, generally calibrated on IT/consumer-breach data rather than OT-specific disclosure channels; not built on a physics twin.

**Indirect:** Traditional digital twin vendors (yield/throughput optimization, not security); big-four/traditional consultancies (manual, non-tool-enabled, slower — OXOT's rail case study explicitly contrasts 1 senior engineer + platform vs. an estimated 8–12 analysts over 12–18 months conventionally); "doing nothing" / spreadsheet-based risk registers.

**Insurers/underwriters (data-source competitor framing):** static actuarial tables vs. OXOT's facility-specific, continuously-updated ALE computed from the customer's own assets plus live geopolitical/threat signal.

---

## Differentiation

**Key differentiators:**
- Physics-based facility twin built from real P&ID/DEXPI engineering drawings (not a network-scan-only inventory) — sees legacy/unconnected equipment competitors miss.
- ALE (Annualized Loss Expectancy) as the flagship metric — grounded in SEC 8-K disclosures, NetDiligence/CAS claims data, and Verizon DBIR frequency data, not analyst guesswork.
- TACAM/ATQ threat-actor attribution down to the level of a specific named vendor product (CPE) in the customer's own supply chain — the single most defensible, hardest-to-replicate capability identified across all four source files.
- Passive-first, zero-agent, deployable fully air-gapped ("Island mode") on customer hardware — no live control-loop access required.
- "Null over default" AI discipline: every synthesized number traces to a real cited source or is stored as an explicit null, never a fabricated value — a genuine, explainable answer to "can I trust your AI's numbers."
- Formulaic, auditable security-level derivation (SL-T = IC + AC − 1) bridging safety engineering and cybersecurity — demonstrated with zero unexplained discrepancies across a full 6-zone rail engagement.
- Dutch government / ECCC co-investment (CIF-NL 2025 grant) — the live site's current lead external-validation credential; not present anywhere in the older internal product-sheet corpus, meaning it postdates most of the source material and should anchor current positioning over older, unsourced internal stats.

**How OXOT does it differently:** Combines engineering-grade plant data (safety FMECA/hazard logs, RAMS, Purdue network topology) with external actuarial and threat-intelligence data in one deterministic model, rather than treating "security" and "financial risk" as separate workstreams.

**Why that's better:** Turns "there are 40 vulnerabilities" into "fix this one specific chokepoint first," and turns "we think we're at risk" into a number the board can allocate capital against.

**Why customers choose OXOT over alternatives:** No plant disruption (passive-first); a number, not a color; compliance as a byproduct of the same model rather than a bolt-on; sovereignty (self-hosted/EU-cloud options) for GDPR/data-sovereignty-sensitive buyers.

---

## Objections & Anti-Personas

| Objection | Response |
|---|---|
| "How is this different from the Claroty/Dragos/Nozomi tool we already have?" | Complementary, not competitive — OXOT adds the equipment-level asset twin and financial (ALE) quantification layer on top of existing network monitoring; ingests their passive-tool output rather than replacing it. |
| "Can I trust an AI's risk numbers?" | "Null over default" discipline — every number traces to a real cited source (SEC filing, DBIR, insurance claims data, or the customer's own engineering documents) or is stored as an explicit null; never a guessed default. |
| "Will this touch my control systems or cause downtime?" | Passive-first, zero controller agents; Island Mode / one-way data-diode deployment options exist specifically so nothing is ever installed on a live PLC or safety system. |
| "You're early-stage — do you have real case studies / named customers?" | **Honest gap, not to be papered over:** no public named customer or case study currently exists on the live site. The strongest available proof is the CIF-NL government co-investment and an anonymized rail/metro engagement (must stay anonymized — no client/vendor/station names). This is a real objection the site currently cannot fully answer, and should be flagged explicitly rather than resolved with invented proof. |

**Anti-persona:** A single-site facility with no engineering drawings/P&ID documentation available (the twin depends on real engineering-of-record input); a buyer wanting live attack detection/response (explicitly out of scope — the Sell Sheet's own internal guardrails prohibit ever implying this); a buyer purely shopping for a network-monitoring replacement rather than a financial-quantification/asset-twin layer.

---

## Switching Dynamics (JTBD Four Forces)

**Push:** Unpriced, unmeasured OT cyber risk; alert fatigue from generic IT vulnerability scanners; approaching compliance deadlines (NIS2, CRA, TS 50701, IEC 62443); board/insurer pressure for a defensible risk number.

**Pull:** A dollar-denominated ALE number a board can act on; passive, non-disruptive deployment; Dutch/EU sovereignty (self-hosted Island option); the CIF-NL government co-investment credential as third-party validation.

**Habit:** Existing reliance on an already-installed OT monitoring vendor (Claroty/Dragos/etc.); comfort with existing manual/consultant-led risk assessments and familiar red/yellow/green heatmaps despite their limits.

**Anxiety:** Fear of any tool touching PLC logic or safety systems; skepticism of AI-generated risk numbers; concern about vendor longevity given OXOT's early stage; concern about proprietary engineering drawings leaving the facility (addressed by on-prem/sovereign deployment, but this needs to be said explicitly, not assumed understood).

---

## Customer Language

**How they describe the problem (verbatim, from internal persona research):**
- "I need to prove to the board and insurers that our plants won't go down from a cyber attack, without flooding my engineers with alert noise."
- "I cannot allow IT security tools to disrupt PLC logic, trip safety valves, or cause unexpected downtime."
- "I have 14 days to audit a target company's 5 manufacturing plants and find hidden cyber liabilities before we sign the acquisition." (M&A framing — not currently a live-site offer)

**How they might describe OXOT (copy-ready lines drawn from source material, several already close to live-site voice):**
- "From P&ID diagrams to financial exposure in one platform — no integration tax."
- "Cyber risk as $/year — not a red/yellow/green heatmap."
- "The question is never 'are we being targeted?' The question is 'by whom, with what, and why now?'"
- "Forecast, don't snapshot."

**Words/phrases to use:** dollar/euro-denominated, board-ready, passive-first, zero-agent, sourced/traceable, engineering-grade, physics-based, auditable.

**Words/phrases to avoid (explicit, sourced constraints):**
- Per the internal CDT Sell Sheet's own "Say This / Not This" guardrails: never "actuarial," "rating-agency," or "certified"; no invented accuracy figures, hit rates, or customer names; never imply live attack detection/response; never promise a timeline before drawings have been seen.
- Per the live site's existing `BANNED`/`BANNED_NL` word lists in `src/content/claims.ts` (already enforced in code — cross-reference directly before any copy work, not reproduced here from memory).
- Any specific computed ALE dollar figure, forecast probability, attack-path probability, or accuracy/precision percentage drawn from the internal academic papers (P1–P8) — these are explicitly marked `[PENDING EVALUATION]`/`[PENDING VERIFICATION]` in their own source documents and must not be presented as proven results.

**Glossary (canonical definitions — several terms have conflicting definitions across internal source docs; these are the recommended canonical picks):**

| Term | Meaning (canonical pick) |
|---|---|
| ALE | Annualized Loss Expectancy = SLE × ARO; the platform's flagship dollar-denominated risk metric |
| TACAM | Threat Actor Capability & Motivation Matrix — 7-dimensional actor-to-equipment attribution engine (NOT "Threat Attack Consequence Analysis Model," an earlier/inconsistent definition found in one source doc only) |
| ATQ | Actor Threat Quotient — 12-factor weighted 0–100 threat-actor danger score |
| SL-T | Target Security Level (IEC 62443/TS 50701), derived via OXOT's formula: SL-T = IC (Impact Category) + AC (Attacker Capability) − 1 |
| Seldon Engine | The physics-based simulation/prediction stack underlying the Cyber Digital Twin |
| Island Mode | Fully air-gapped, self-hosted deployment on customer hardware, zero outbound data |

---

## Brand Voice

**Tone:** Terse, evidence-first, understated — the opposite of hype. Per the live site's own stated ethos: "what's true, not what's good for us."

**Style:** Every checkable factual claim carries a source; aphoristic pull-quotes; serif headline over sans-serif body as the primary visual/voice signal.

**Personality (adjectives):** Rigorous, sourced, sovereign, unshowy, engineer-built (not marketing-built).

**Visual identity constraints relevant to copy (from style guide):** one accent color only (orange); wordmark always typeset text, never bold beyond 600 or below 0.24em tracking; top-level nav is sentence case, never uppercase; bilingual by construction (English + Dutch, every string).

---

## Proof Points

**Metrics safe to cite as verified corpus/scale facts (not performance claims):**
- CIF-NL 2025 co-investment: 13 of 95 applications selected, 17 of 20 points, announced 14 July 2026 — **the only currently live, publicly verifiable proof point on the site.**
- Rail/metro case study (anonymized, not yet published on the live site): 101 formally controlled documents across 3 volumes, 5-month delivery, zero rework/remediation requests, delivered by 1 senior engineer + platform vs. an estimated 8–12 analysts over 12–18 months conventionally. **Strongest unpublished proof asset identified in this entire research pass** — recommend surfacing in a future case-study page, kept fully anonymized (no client, vendor, or station names).
- SL-T formula cross-validated with zero (0) delta across all 6 zones in the same rail engagement — proof the method reproduces independent expert judgment.

**Metrics NOT safe to present as proven results (explicitly disclaimed in their own source documents):** any specific ALE dollar output, forecast probability, attack-path probability, or NER/attribution accuracy percentage from the internal P1–P8 academic papers; the "95% Pre-Spend Risk Reduction" figure (explicitly labeled illustrative, not customer data, in its own source); TACAM's "77,279 data points" and "62,965 CPE rows" (real corpus-scale counts, safe to cite as scale, not as a performance/accuracy claim).

**Customers/logos:** None. No public named customer exists anywhere in the source corpus or on the live site.

**Value themes:**

| Theme | Proof |
|---|---|
| Non-disruptive by design | Passive-first, zero-agent, Island Mode / data-diode deployment options |
| Numbers, not adjectives | ATQ's 12-factor auditable score vs. competitors' "sophisticated/well-resourced" labels; documented 3.7× rigor improvement when the scoring model was rebuilt |
| Sourced, not invented | "Null over default" AI grounding discipline; CIF-NL government co-investment as external validation |
| Proven on real safety-critical infrastructure | Rail/metro TS 50701 case-dossier delivery (anonymized) |

---

## Goals

**Primary business goal:** Generate qualified consulting engagements and Cyber Digital Twin platform interest from OT/critical-infrastructure operators, anchored on credibility (CIF-NL grant) rather than a high-friction lead-capture funnel.

**Key conversion action:** "Talk to OX" — a live conversational CTA, explicitly positioned as *not* a sales call and *not* a discovery questionnaire. (Internal strategy docs describe a more traditional form-based "14-Day Assessment" lead-capture funnel — that blueprint is superseded by the current live-site approach; see Divergence Notes.)

**Current metrics:** Not available in source material — no analytics/conversion data was part of this extraction.

---

## Divergence Notes (Internal Source Material vs. Live Site — Important for Copy Work)

The internal product-sheet/strategy corpus (PDFs + `/public/documents`) describes an earlier or parallel version of OXOT's go-to-market that differs from what's actually live today:

1. **Lead credential shifted.** None of the internal docs mention the CIF-NL grant (it postdates them); the live site now leads with it over the internal docs' "14-day M&A audit" hook.
2. **CTA shifted.** Internal CRO strategy doc specifies a minimal-field lead-capture form with resistance-point microcopy and instant PDF delivery; live site uses a conversational "Talk to OX" CTA with no form.
3. **Structure shifted.** Internal docs treat "Consulting" only as an engagement-model wrapper (Transient vs. Long-Term) around the CDT product; live site foregrounds a parallel six-service Consulting catalog as a primary navigation path.
4. **Terminology is inconsistent within the internal corpus itself** (TACAM has two competing definitions; BOM count is 4 vs. 5; CISA sector count is 16 vs. 17) — resolved to single canonical picks above; verify against current code (`src/content/claims.ts`) before reusing in new copy.

**Recommendation:** treat this internal corpus as ground truth for *mechanism, methodology, and differentiation* — it is far richer than anything currently published — but treat the *live site's actual structure, CTA, and lead credential* as the current source of truth for GTM/funnel decisions, not the older internal docs.

---

## Changelog

*Newest first.*
- v1 (2026-08-21) — Initial context, auto-drafted from full source-extraction corpus (4 files, ~50 source documents) as part of Phase 1 Discovery for the product-service-launch playbook. Not yet reviewed by a human against the live site.
