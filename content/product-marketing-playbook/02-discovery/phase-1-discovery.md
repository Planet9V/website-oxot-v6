# Phase 1 — Discovery — OXOT Product-Service-Launch Playbook

**Generated:** 2026-08-21 · **Status: 🚦 AWAITING APPROVAL — nothing in Track 1 (Copy), Track 2 (Design/Build), or Phase 3 (Polish & Sync) begins until you explicitly sign off on this document.**

This is the converged Phase 1 deliverable, per the workflow you specified: source extraction → cheat sheet → product-marketing (positioning + personas) → competitor-profiling, converged into one document, gated before anything downstream starts.

---

## Table of Contents

1. [One finding, corrected after initial report](#1-one-finding-corrected-after-initial-report)
2. [What was done in Phase 1](#2-what-was-done-in-phase-1)
3. [The condensed picture](#3-the-condensed-picture)
4. [Where the source material and the live site disagree](#4-where-the-source-material-and-the-live-site-disagree)
5. [Numbers: safe to use vs. not yet proven](#5-numbers-safe-to-use-vs-not-yet-proven)
6. [Full document index for this playbook](#6-full-document-index-for-this-playbook)
7. [🚦 The approval gate — what I need from you](#7--the-approval-gate--what-i-need-from-you)

---

## 1. One finding, corrected after initial report

### 1a. CORRECTION (2026-08-21): the CRO strategy document was never actually live on the real website

**This section originally reported an internal strategy document as "currently live and publicly downloadable on the real website." That claim was wrong, and the error is documented here rather than quietly fixed, since the earlier report was already delivered to the user as an urgent finding.**

What happened: the source-extraction agent read `public/documents/OXOT_CDT_Homepage_CRO_Strategy.md` from this sandbox/tooling directory (`/Users/jimmcknney/oxot_website_public_sept/`) and described it as reachable on "the real, deployed site" — but never verified that against the actual production repository or the live domain. On investigation (2026-08-21, prompted by the user's follow-up instruction to pull the file): the real production website repo (`jim_private/oxot_website_production/oxot-website`) has **no `public/documents/` directory at all**, no file of this name anywhere in its history at the checked commit, and no source code reference to a `/documents/` route. The sandbox directory this file actually lived in is a separate, undeployed local project (bare `package.json`, no git remote) — source material for this playbook run, not a route on the live site.

**There was no real public exposure.** The file has been deleted from the sandbox at the user's instruction (2026-08-21) regardless, since it's internal-only material and had no reason to sit in a folder named `public/` even locally. No action was needed, or taken, against the real production site — there was nothing there to fix.

**What the content itself still says, for reference (kept for context, not as a live risk):** it was an internal team-facing CRO strategy document profiling three named buyer personas by their "Dominant Psychological Trigger," with manipulation-adjacent microcopy instructions and a directive to filter leads by blocking generic email domains. If similar material is ever drafted for `/public/documents/` on the *real* site in the future, keep this content class (internal team instructions, persona psychology framing) out of that public folder — the underlying concern (this content shouldn't be public-facing) was sound even though the specific claim of current exposure wasn't.

### 1b. A set of specific numbers must not be presented as proven facts

Multiple figures across the internal source corpus are explicitly self-disclaimed by their own source documents as illustrative, unverified, or pending evaluation — not because I'm second-guessing them, but because the documents say so themselves:

- **"95% Pre-Spend Risk Reduction"** — the Product Sheet's own diagram callout says this is *"illustrative, not customer data."*
- Any specific computed **ALE dollar figure, forecast probability, attack-path probability, or NER/accuracy percentage** from the internal academic papers (P1–P8) — every one of these is marked `[PENDING EVALUATION]` or `[PENDING VERIFICATION]` in its own source document. E.g., the entire 90-day Forecast paper states outright that no back-test has been completed.
- Corpus-scale counts (77,279 TACAM data points, 624 tracked actors, 100,000 Monte Carlo trials, etc.) are **real, verified counts** and safe to cite as scale — but they describe *how much data feeds the system*, not *how accurate its outputs have been proven to be*. Don't let the two blur together in new copy.

This isn't a reason to avoid this material — it's genuinely OXOT's richest, most technically credible content. It's a reason to write about it as **mechanism** ("how it works," "what it's built from") rather than **performance** ("how well it's been proven to work") until validation lands. Full detail with every flagged figure is in `oxot-cheat-sheet.md` §3 and §9, and in the source-extraction files.

---

## 2. What was done in Phase 1

1. **Source extraction** — read and structured ~50 source documents across 4 files: two product PDFs plus two internal spec/sell sheets, all 7 files in `/public/documents`, 14 internal CDT methodology/academic papers plus the style guide, and the full IEC 62443/TS 50701 reference library (17 files, grounded in a real anonymized rail-transit engagement).
2. **Cheat sheet** — condensed everything above into one fast-reference document (`oxot-cheat-sheet.md`) tagging every fact **[LIVE]** or **[INTERNAL — not yet published]**, so nobody writing new copy accidentally promises something that isn't shipped.
3. **Product-marketing skill** — full positioning statement, target audience, both requested personas (C-Suite/CISO/CFO and the closest available analog for OT engineers — see the note in that document about a real gap here), problems/pain, differentiation, objections, switching dynamics, customer language, and proof points (`product-marketing-context.md`).
4. **Competitor-profiling skill** — quick-scan profiles of 4 adjacent OT-monitoring vendors (Claroty, Dragos, Nozomi Networks, Armis), 2 secondary risk-quantification competitors (Axio, RiskLens), plus qualitative treatment of traditional digital-twin vendors, big-four consultancies, and "doing nothing" as the likely largest real competitor (`competitor-landscape.md`). **Tooling note:** this skill's standard Firecrawl/DataForSEO workflow wasn't available in this environment — profiles are positioning-level from live web search, not full SEO/traffic-backed deep profiles. Flagged explicitly in that document.

---

## 3. The condensed picture

**What OXOT is:** a Dutch OT cybersecurity company that builds a physics-based digital twin of a customer's industrial facility and prices the cyber risk in euros — a board-legible number, not a heatmap — without touching live control systems to get it.

**Who buys it:** primarily an OT CISO/VP of Security (technical champion) and a Plant Operations Director (has effective veto, cares most about zero disruption), with CFO/board as budget authority and Chief Architect/Compliance as technical influencers. Full persona detail, including verbatim pain quotes, in `product-marketing-context.md`.

**What makes it different:** nobody else identified combines a P&ID-level physics facility model *with* actuarial-grade financial risk quantification in one platform. Everything adjacent (Claroty/Dragos/Nozomi/Armis) is network-visibility-only; everything else that quantifies risk in dollars (Axio/RiskLens) isn't OT-native or physics-grounded. Full detail in `competitor-landscape.md`.

**What's currently live vs. internal-only:** the Twin, the six-service Consulting catalog, Facility Due Diligence, and IEC 62443 reference content are live. CRA is fully de-published (as of 2026-08-21, this session). A large amount of genuinely strong material — the rail case study, named engagement offers, the "null over default" AI-trust story, several proprietary sub-systems — exists only in internal documents and has never reached the live site. Full breakdown in `oxot-cheat-sheet.md` §2–3.

---

## 4. Where the source material and the live site disagree

The internal corpus describes an earlier or parallel go-to-market that has since evolved. Specifics:

- **Lead credential**: none of the internal docs mention the CIF-NL grant (they predate it); the live site now leads with it.
- **Primary CTA**: internal CRO strategy doc specs a lead-capture form; live site uses a conversational "Talk to OX" CTA with no form.
- **Structure**: internal docs treat Consulting only as an engagement wrapper around the Twin product; live site foregrounds a parallel six-service Consulting catalog.
- **Terminology**: TACAM is defined two different ways across the internal corpus itself (resolved to one canonical definition in `product-marketing-context.md`'s glossary); BOM count is 4 vs. 5 in different docs; CISA sector count is stated as both 16 and 17.

**Recommendation, not yet acted on:** treat the internal corpus as ground truth for *mechanism and differentiation*, and the live site as ground truth for *current GTM structure, CTA, and lead credential*. Full detail in `product-marketing-context.md`'s Divergence Notes section.

---

## 5. Numbers: safe to use vs. not yet proven

Quick pointer — the full table with sourcing lives in `oxot-cheat-sheet.md` §9 and is repeated with more nuance in each of the four source-extraction files' own "Publishing Risk Flags" / "Caution" sections. Short version:

**Safe** — corpus/scale counts (504 SEC filings, 443 governance rows, 624 tracked actors, 62,965 TACAM product clusters, 100,000 Monte Carlo trials/ALE run, the rail case study's 101 documents/5 months/zero-rework outcome), the CIF-NL grant figures.

**Not yet safe to present as proven** — any specific computed ALE dollar figure, forecast probability, attack-path probability, or accuracy/precision percentage from the internal P1–P8 papers; the "95% Pre-Spend Risk Reduction" figure; any illustrative worked example presented in the source material as if it were a real customer output.

---

## 6. Full document index for this playbook

See `../00-index/INDEX.md` for the complete, navigable index of every file in this playbook run, including the raw source-extraction files this document draws from.

---

## 7. 🚦 The approval gate — what I need from you

Per your own workflow diagram, this is where Phase 1 stops. Before I touch Track 1 (Copy: copywriting, competitors, sales-enablement, seo-audit, schema), Track 2 (Design/Build: site-builder, motion-system, existing-page updates), or Phase 3 (Polish & Sync), I need:

1. ~~A decision on finding 1a~~ — **resolved.** The CRO strategy document was never actually live on the real site (see the correction in §1); it's been deleted from the sandbox regardless, and no action was needed against the real production repo.
2. **Confirmation you've seen finding 1b** (numbers that can't be presented as proven) — this will shape how Track 1 copywriting handles the technical/methodology material.
3. **Sign-off to proceed** into Track 1 + Track 2 in parallel, as specified — or redirection if you want to adjust scope, sequencing, or add/remove anything before that starts.
4. Optionally, reactions to the four open questions in `oxot-cheat-sheet.md` §11 (case study publication, reviving a named engagement offer, surfacing "null over default" as customer-facing trust copy, and sourcing a banned-words/voice document beyond `claims.ts`) — not blocking, but worth a quick read before Track 1 begins.
