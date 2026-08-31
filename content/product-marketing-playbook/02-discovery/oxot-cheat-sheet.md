# OXOT Cheat Sheet — Business, Products, Services, Company

**Generated:** 2026-08-21 · **Purpose:** the single fast-reference document for anyone writing or reviewing OXOT copy. Everything here is sourced from either (a) the live site as it exists today, or (b) the ~50-document internal source corpus extracted into `../01-source-extraction/`, with each fact tagged **[LIVE]** or **[INTERNAL — not yet published]** so nothing gets presented as shipped when it isn't. Full detail and citations live in the linked source-extraction files and in `product-marketing-context.md` / `competitor-landscape.md` in this folder — this document is the condensed lookup, not the full record.

---

## 1. Company, in one paragraph

OXOT B.V. is a Dutch OT cybersecurity company, headquartered at Tuinderslaan 11-A, 3641 PZ Mijdrecht, Netherlands. **[LIVE]** Name stands for "Operational eXcellence in Operational Technology." **[INTERNAL]** — confirm this expansion is still the live tagline before reusing (the live footer currently renders it as running copy: "Operational e**X**cellence in Operational Technology," matching). Staffed from process and control engineering, industrial networks, and safety backgrounds — not a generic IT security shop. **[INTERNAL]** In 2026, received a Dutch government / ECCC co-investment (CIF-NL fund) — 13 of 95 applications selected, 17 of 20 points, announced 14 July 2026. **[LIVE — the site's current lead external-validation credential.]**

**What is deliberately absent from the site, and should stay absent unless it changes:** no KvK (chamber of commerce) registration number is published anywhere; no registered address beyond the footer entity line; no named public customers or case studies; no Privacy/Terms/Cookie-adjacent claims beyond what's live. **[LIVE — confirmed via `site-footer.tsx` doc comments; deliberate, not an oversight.]**

---

## 2. What OXOT sells, today, live on the site

| Offering | Status | One-line description |
|---|---|---|
| **Cyber Digital Twin** (the "Twin") | **[LIVE]** | Physics-based digital twin of a facility, cross-referenced against threat intelligence and actuarial loss data to produce a dollar-denominated risk figure (ALE). |
| **Consulting** — 6 services | **[LIVE]** | OT Security Assessments, Programmes, Architecture & Segmentation, Secure Remote Access, OT Security Baseline, Capability Transfer. Foregrounded as a parallel primary path alongside the Twin. |
| **Facility Due Diligence** | **[LIVE, page exists]** | Architecture, asset inventory to device level, incident-response readiness, physical security — assessed on site by engineers. **Nav entry removed 2026-08-21** (page still reachable, not in the Consulting dropdown). |
| **IEC 62443** (reference/framework page) | **[LIVE]** | Framework reference content; only child nav item remaining under Consulting after the 2026-08-21 nav restructure (which also moved "The CRA" here as a flat sibling entry). |
| **The CRA / EU Cyber Resilience Act services** | **[DE-PUBLISHED 2026-08-21]** | Formerly a top-level product line (own nav slot, 4 pages, a self-check tool). Fully taken down: `/cra`, `/check`, `/retainer`, `/conformity` now 404. May return later as a single line item under Consulting — not decided. |
| **The Retainer** | **[DE-PUBLISHED 2026-08-21]** | Was a CRA-linked offering; dropped from nav along with the rest of the CRA line. |

---

## 3. What OXOT's internal material describes but is NOT currently live — read before promising any of this in new copy

| Concept | Status | Why it matters |
|---|---|---|
| "14-Day M&A Due Diligence Baseline Audit" / "60-Day CRA Transit Engagement" | **[INTERNAL ONLY]** | Named, time-boxed offers in every internal product sheet. Not on the live site. CRA-linked engagement is doubly out of scope right now (CRA is de-published). The 14-day M&A offer could be revived as a Consulting line item — a real option, not yet decided. |
| Lead-capture form / assessment calculator | **[INTERNAL ONLY, explicitly superseded]** | The internal CRO strategy doc specs a minimal-field form with resistance-point microcopy. Live site instead uses a conversational "Talk to OX" CTA with no form. Treat the live approach as current truth, not the older doc. |
| "WorldMonitor" (named geopolitical-monitoring sub-product) | **[INTERNAL ONLY]** | Present in v1 product sheet and technical spec sheet; dropped from v2 customer-facing copy. If revived, needs a decision on whether it's customer-facing branding or stays internal plumbing. |
| Rail/metro IEC 62443 + TS 50701 case study (101 documents, 5-month delivery, zero rework, 1 engineer vs. 8–12 analysts) | **[INTERNAL ONLY — anonymized]** | The single strongest, most concrete proof asset found anywhere in the research. Not on the live site. Must stay fully anonymized if published (no client, vendor, or station names) — the source material is real, redacted engagement data. |
| TACAM, ATQ, SLT, Seldon SLT, Red Squadron AI, Analyst Studio (3D globe, radar, podcast briefing) | **[INTERNAL — some present in `/public/documents`, some not]** | Named sub-systems of the Seldon Engine. Several are described with real corpus-scale numbers (e.g., TACAM's 77,279 data points) but their *performance/accuracy* claims are explicitly marked `[PENDING EVALUATION]` in their own source papers — safe to describe as mechanism, not as proven results. |
| Pricing ($50K–500K/yr license, $15K–75K onboarding) | **[INTERNAL ONLY]** | Not published anywhere on the live site. Do not surface a specific number in new copy without an explicit decision to publish pricing. |

---

## 4. The core differentiator, stated three ways (all sourced, all reusable)

1. *"Traditional digital twins optimize yield and throughput. OXOT Cyber Digital Twins protect minimum operating requirements and facility crown jewels."*
2. *"Traditional Digital Twins focus on production yield... IT Vulnerability Scanners output thousands of unprioritized CVE alerts, ignoring plant physics."*
3. Plain version for this cheat sheet: **nobody else combines a physics-based, P&ID-level facility model with an actuarial-grade dollar figure for OT risk, delivered without touching a live control system.**

---

## 5. The flagship metric: ALE (Annualized Loss Expectancy)

- Formula: **ALE = SLE × ARO** (Single Loss Expectancy × Annualized Rate of Occurrence).
- Grounded in real disclosed losses (SEC 8-K filings), real insurance claims data (NetDiligence/CAS), and real breach-frequency data (Verizon DBIR) — not analyst guesswork. **[INTERNAL — mechanism description, safe to use; do not cite a specific computed ALE dollar output as a validated real result — the source papers mark those `[PENDING EVALUATION]`.]**
- Feeds a Gordon-Loeb-bounded investment recommendation (optimal security spend never exceeds ~37% of expected loss) — a genuine "we don't recommend infinite spend" discipline point.
- Output style example (illustrative *format*, not a claimed real figure): *"The optimal security investment is $17.4M — $8.2M above your current spend."*

---

## 6. How to talk about the AI / avoid the "can I trust this" objection

**"Null over default"** — the platform's own named design principle. Every synthesized number is grounded in a retrieved real source first; if nothing can be sourced, the field is stored as an explicit **NULL**, never a fabricated default or guessed value. This is the single strongest, most explainable trust story in the entire internal corpus and appears **underused on the live site today** — recommend surfacing it explicitly in Track 1 copywriting.

---

## 7. Deployment & sovereignty (a genuine differentiator for EU/Dutch buyers)

- **Island Mode** — 100% air-gapped, runs entirely on customer hardware, no cloud dependency at steady state.
- **One-Way Data-Diode Mode** — hardware-enforced inbound-only intelligence streaming.
- **Dedicated Instance** — EU Sovereign Cloud or on-premises (internal docs are inconsistent on whether this is "AWS European Sovereign Cloud" specifically or a broader "EU sovereign cloud" claim — reconcile before publishing a specific cloud provider name).
- Passive-first, zero-agent: never installs anything on a live PLC or safety system. This directly answers the Plant Operations Director persona's core anxiety (see `product-marketing-context.md` §Personas).

---

## 8. Compliance frameworks referenced

**Live on site today:** IEC 62443, NIS2, TS 50701, the EU AI Act, the Machine Act (per `content/reference/` files still published post-CRA-removal). CRA itself is de-published as a product line but still appears as *plain-text* mentions (de-linked) in surviving reference articles where it was previously hyperlinked.

**Internal-only, broader scope:** NERC CIP, TSA directives, CFATS (US frameworks) — present in the internal Technical Specification Sheet, not surfaced anywhere on the live site. Worth a deliberate decision (not an accident) if OXOT ever targets US critical-infrastructure buyers.

---

## 9. Proof points — ranked by how safe they are to use today

1. **CIF-NL 2025 government co-investment** — **[LIVE, verified, the strongest available proof point.]** Use freely; it's already the site's lead credential.
2. **The rail/metro case study** — **[INTERNAL, anonymized, unpublished.]** Strongest available *unpublished* asset. Recommend developing into a properly anonymized case-study page as part of Track 1/2 — flag this recommendation explicitly at the approval gate rather than assuming it's in scope.
3. **Corpus-scale numbers** (504 SEC filings, 624 tracked actors, 77,279 TACAM data points, 100,000 Monte Carlo trials/run) — **[INTERNAL, safe as "how it works" depth, not as accuracy/performance claims.]**
4. **Named-vendor competitive contrasts, illustrative outputs, and any dollar figure not tied to the CIF-NL grant** — **[INTERNAL, illustrative only — do not present as a real customer result.]**

---

## 10. Brand mechanics quick-reference (from the style guide — for anyone touching layout, not just copy)

- One accent color, always: orange (`#F07000` light / `#FF7F0F` dark). A second accent anywhere is a defect.
- Wordmark: typeset text only, never an image, never serif, never below 0.24em letter-spacing.
- Three typefaces, no overlap: Newsreader (serif, headlines/stat numbers/pull-quotes), Instrument Sans (body/UI), IBM Plex Mono (data/labels/eyebrow numerals only).
- Top-level nav is sentence case, never uppercase.
- Bilingual by construction — every user-facing string ships in English and Dutch; Dutch runs 15–20% longer, verify at 375px in both locales.
- No banned-words/tone-of-voice document exists in the style guide itself — the actual enforcement lives in code (`src/content/claims.ts` `BANNED`/`BANNED_NL` arrays). Cross-reference that file directly before Track 1 copywriting; don't rely on this cheat sheet's memory of its contents.

---

## 11. Open questions for the approval-gate conversation (not decisions — flagging for the user)

1. Should the rail/metro case study be developed into a published, anonymized case-study page? (Strongest unpublished proof asset found.)
2. Should any internal engagement offer (14-day baseline audit, 60-day compliance-transit engagement) be revived as a named Consulting line item, independent of CRA?
3. Should "null over default" become an explicit, customer-facing trust statement somewhere on the site (currently only an internal design principle)?
4. Is there a banned-words/voice-tone reference beyond `claims.ts` that should be consulted, given the style guide itself has none?

---

## Related documents in this folder

- `product-marketing-context.md` — full positioning statement, personas, objections, switching dynamics, customer language.
- `competitor-landscape.md` — profiled adjacent/secondary competitors and category positioning.
- `../01-source-extraction/` — the four full extraction files this cheat sheet condenses (PDFs, public documents corpus, CDT methodology/brand, IEC 62443/TS 50701 reference library).
- **See also the two urgent, time-sensitive findings surfaced in `phase-1-discovery.md`** (this folder) — a live public-facing security/trust exposure and a set of numbers that must not be presented as validated. Read those before doing any further copy work.
