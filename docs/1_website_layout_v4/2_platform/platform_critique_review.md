# Review: `platform_critique.md` vs. the actual `/cdt-2` page

**Scope.** This is a verification and prioritization pass on `platform_critique.md` — not a rewrite, not an endorsement, and no changes have been made to the live page or its content. Every claim below about the *current* page's structure, copy, or behavior is checked against `/cdt-2`'s actual source (`src/app/[locale]/cdt-2/page.tsx` and its 13 section components, `content-1.ts`/`content-2.ts`), the live rendered page, and a fresh check of the site's real route list — not against the critique's own description of the page, and not from memory.

**Author's note on independence.** This review was produced by the same session that built the `/cdt-2` page's most recent state, so it is not a blind second opinion — treat the "confirmed accurate" findings as high-confidence (they're checked against source, not recalled), but weigh the *strategic* judgments (which recommendations matter most) knowing the reviewer has a stake in the current build.

---

## Executive summary

The critique is **well-researched and factually accurate against the real page on nearly every specific claim checked.** It correctly identifies the two most consequential defects on the page (broken hero CTAs, no page-tailored closing CTA) and correctly reads the page's actual section order, copy, and structure — this was clearly written from a close reading of the real page, not a guess.

Three things temper how directly actionable it is as written:

1. **One factual overstatement, corrected below:** the claim that the page "ends on industry cards without a final CTA" is not quite right. The site's shared layout (`[locale]/layout.tsx`) renders a global `ContactBand` after every route's content, unconditionally — `/cdt-2` does get a closing CTA, it's just the generic sitewide one, not a page-tailored one. This softens (doesn't eliminate) the urgency of that specific recommendation.
2. **Several recommendations assume destination pages that do not exist.** A fresh check of `src/app/[locale]/` found no `/assurance`, no `/technical-specification`, and no dedicated Hyperscale or Defense & Government pages. The critique's own "Recommended Platform-page structure" links to several of these as if they're a click away. They aren't — building them is a separate, larger body of work than the content move the critique frames it as.
3. **One recommendation runs against a deliberate decision already made in this codebase.** The critique's item 1 proposes adding a bespoke closing CTA block to the bottom of the page. This session's own build history shows the opposite call was made on purpose — `/home-2`'s page component carries an explicit comment: *"the site already renders a global ContactBand with the identical ask right before the footer on every route — the same duplicate-CTA issue already caught and fixed on /cdt-2 this session."* Adding a second, page-local CTA re-introduces the exact pattern that was deliberately removed. This doesn't make the critique wrong that the current close is weak — it means the fix needs to happen *inside* how the global band is used (e.g., page-aware copy), not by stacking a second CTA above it.

None of this undermines the critique's core diagnosis. It means roughly a third of the specific recommendations are lower-effort than presented (content already exists at its proposed destination, see §3 below) and roughly a third are higher-effort than presented (destination page doesn't exist yet).

---

## 1. Verification table — factual claims about the current page

| Claim in critique | Verdict | Evidence |
|---|---|---|
| Both hero CTAs point to `#top` | **Confirmed** | `Cdt2Hero.tsx` lines 25, 28 — both `<a href="#top">` |
| Page ends on industry cards "without a final CTA" | **Partially accurate** | `Cdt2WhereWeWork` is the last page-local section, but `[locale]/layout.tsx` renders `<ContactBand>` unconditionally after every route's content — a closing CTA exists, it's generic, not page-tailored |
| Six Consulting Services is a "substantial" interactive section | **Confirmed** | `Cdt2Services.tsx` — 6-card expand/collapse grid, the page's only interactive component besides scroll-reveal |
| Consulting appears "after the model explanation" | **Confirmed** | `Cdt2Services` is section 16 of 20, after Engine Intro/IEC Native/What It Is/What's Different/Model/Lenses (sections 10–15) |
| "IEC 62443 native" section exists with detailed framework references | **Confirmed** | `Cdt2EngineIecNative` — IEC 62443, TS 50701 named explicitly |
| Engine/model run is "Engine Intro, IEC Native, What It Is, What Makes It Different, Seven Layers, Lenses" — six blocks | **Confirmed, exact section names match** | Sections 10–15 in the actual page, same order, same effective names |
| NOW/NEXT/NEVER labels | **Confirmed** | `DECISION_01.cards` — exact labels `NOW`/`NEXT`/`NEVER` |
| "Consequence, then probability, then price" / four-step chain | **Confirmed** | `WHY_ANSWERS_HOLD.h2` matches verbatim; the 4 steps (Consequence→Pathway→Probability→Financial impact) match `WHY_ANSWERS_HOLD.steps` exactly |
| Deployment: "Island Mode, One-way data diode, Dedicated instance" | **Confirmed** | `DEPLOYMENT.options` — exact titles "Island mode" / "One-way data diode" / "Dedicated instance" |
| "No agents on controllers, no active process-network scanning" | **Confirmed** | `DEPLOYMENT.intro` verbatim |
| Origin section covers M&A origin, Dutch company framing, government/ECCC co-investment | **Confirmed** | `Cdt2Origin` — matches exactly, including the CIF-NL 2025 grant detail |
| Final industries section is a shallow 4-item list | **Confirmed** | `Cdt2WhereWeWork` — Manufacturing / Water / Energy / Transportation, no links |
| Industries section "misses the new Hyperscale and Defense pages" | **Inaccurate as stated** | No Hyperscale or Defense & Government page exists anywhere in `src/app/[locale]/`. "Hyperscale" appears once, in prose on another page, as an industry example — not a page. There is nothing current to "miss" |
| A "Technical Specification" page exists to link to | **Inaccurate** | No such route exists |
| An "Assurance" page exists to link to | **Inaccurate** | No such route exists. Closest real, live pages covering related content: `/frameworks`, `/reference`, `/iec-62443` |
| A `/consulting` page exists as a real destination for the six services | **Confirmed, and stronger than the critique assumes** | `/consulting` is not just a plausible destination — the six services (OT Security Assessments, OT Security Programmes, Architecture & Segmentation, Secure Remote Access, OT Security Baseline, Capability Transfer) already exist there as the page's own canonical content (`src/components/consulting/services.consulting.ts`). This is not a "move," it's a "stop duplicating" |

---

## 2. Per-recommendation review

### 2.1 Fix the conversion path (hero CTAs + closing CTA)

**What's proposed:** replace both `#top` hero CTAs with real destinations; add a page-tailored closing CTA block at the bottom.

**Assessment:** The CTA-destination half of this is unambiguous and should happen regardless of anything else in the critique — a page whose two primary buttons do nothing is the highest-leverage, lowest-risk fix available on the page. The closing-CTA half needs a different implementation than proposed: not a new page-local block (which would recreate the duplicate-CTA pattern this session's own `/home-2` build explicitly avoided), but either page-aware copy fed into the existing global `ContactBand`, or accepting the generic band as sufficient and focusing effort elsewhere.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 9 | Broken primary CTAs block the page's entire conversion path |
| Confidence | 9 | Unambiguous defect, unambiguous fix for the CTA-destination half; the closing-CTA half needs the reframing above to avoid reintroducing a known anti-pattern |
| Ease | 8 | Pure copy/href change for the CTAs; the closing-CTA half is a small content decision, not new engineering |
| **Total** | **8.7** | |

---

### 2.2 Move Consulting Services detail to `/consulting`

**What's proposed:** replace the six-card interactive grid with a condensed "Decision Sprint / Twin Build / Continuous Twin Operations" block and a link out.

**Assessment:** Directionally correct and lower-risk than it looks, because the destination content already exists — this is a deletion plus a link, not a content migration. The one open item: "Decision Sprint / Twin Build / Continuous Twin Operations" is new positioning language that doesn't exist anywhere else on the site today. That's a real authoring task, separate from the structural move, and should be scoped as such rather than assumed to ship with the restructure.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 6 | Meaningful page-length reduction; the six-service detail is genuinely redundant with `/consulting`'s own canonical version |
| Confidence | 7 | High confidence the *move* is correct; medium confidence the *proposed new framing* ("Decision Sprint" etc.) will land without its own validation |
| Ease | 6 | Deletion is trivial; the new 3-tier positioning copy is new writing, not a mechanical edit |
| **Total** | **6.3** | |

---

### 2.3 Move deep framework/IEC 62443 material to "Assurance"

**What's proposed:** shorten the IEC-native section to one statement, link to an Assurance page.

**Assessment:** The instinct — don't let a Platform page double as the regulatory reference library — is sound. But there is no Assurance page. The nearest real equivalents are `/frameworks` (regulation-by-role overview) and `/reference` (the document library) and `/iec-62443` (the method itself). Any of those is a legitimate link target today; "Assurance" specifically is not. This recommendation should be re-scoped to point at an existing page, or explicitly logged as depending on a new page being built first.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 5 | Real but secondary — this section is dense, not broken |
| Confidence | 4 | The underlying idea is fine; the specific destination named doesn't exist, so confidence in the recommendation *as written* is low |
| Ease | 3 | Blocked without either building a new page or re-targeting to an existing one (which changes the recommendation) |
| **Total** | **4.0** | |

---

### 2.4 Consolidate six engine sub-sections into three, progressive disclosure for the seven-layer architecture

**What's proposed:** merge Engine Intro / IEC Native / What It Is / What's Different into "Why the Twin is different," keep "How it's built" and "One model, many views" separately, put the seven-layer detail behind a expandable disclosure.

**Assessment:** This is the strongest structural recommendation in the critique, independent of the destination-page issue — the run from section 10 to section 15 is the longest unbroken stretch of platform explanation on the page, all six sections genuinely good individually but heavy in sequence. Worth noting: the exact UI pattern this needs (click-to-expand, single-open-at-a-time, smooth height animation) **already exists on this same page**, in `Cdt2Services`. Reusing that component's interaction pattern for the seven-layer section is a much smaller lift than building new disclosure UI from scratch.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 7 | Addresses a real, independently-confirmed page-fatigue problem in the densest run of sections |
| Confidence | 6 | Consolidation direction is sound; the specific 3-way regrouping proposed is one reasonable option among several, not obviously the only right one |
| Ease | 5 | Real content/component restructuring work, but a working expand/collapse pattern already exists in this codebase to reuse rather than build |
| **Total** | **6.0** | |

---

### 2.5 Reframe External Pressure / WorldMonitor as likelihood context, not a second product

**Assessment:** Correctly diagnosed risk — the section does introduce several named sub-concepts (WorldMonitor, ATQ, TACAM) in a way that could read as scope creep to a first-time visitor. The proposed reframing line ("External conditions change likelihood — not engineering consequence") is a clean, on-message fix that doesn't touch structure.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 6 | Real positioning-clarity risk, correctly identified |
| Confidence | 8 | The proposed fix is a small, low-risk copy change with a clear rationale |
| Ease | 9 | Pure copy edit, no structural change |
| **Total** | **7.7** | |

---

### 2.6 Shorten/move Origin to Company

**Assessment:** Correct and low-risk. `/company` is a real, live page and can legitimately absorb the fuller origin story; a short credibility strip is enough to keep on the platform page itself.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 4 | Origin is already low in the page and low-prominence; the upside of trimming it is real but modest |
| Confidence | 7 | Destination exists, the logic is sound |
| Ease | 8 | Content trim plus a link — no new page needed |
| **Total** | **6.3** | |

---

### 2.7 Expand Industries from four to six linked cards (add Hyperscale, Defense & Government)

**Assessment:** This is the most blocked recommendation in the critique. It assumes two pages that don't exist (Hyperscale, Defense & Government), and — separately — none of the *existing* four industries have a landing page to link to either, so "linked industry cards" isn't achievable for any of the six without new page work. It also makes an unstated positioning call (expanding OXOT's public sector list from 4 to 6) that deserves its own decision, not a bundled assumption inside a page-layout recommendation.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 5 | Real value if the destination pages existed |
| Confidence | 3 | Bundles an unvalidated positioning expansion with a structural change |
| Ease | 2 | Blocked on at least 2 new pages, and arguably 6 (no industry currently has a landing page to link to) |
| **Total** | **3.3** | |

---

### 2.8 Rename "NEVER" to "Accepted / deferred under controlled conditions" for public use

**Assessment:** A reasonable risk-mitigation instinct for regulated/safety-conscious buyers. Worth weighing against this: the rest of the page's own voice is built on being blunt and specific rather than softened ("NOW/NEXT/NEVER" reads as decisive, which is consistent with the page's own established directness elsewhere — e.g. "the difference between a business case and a hope"). This is a genuine judgment call, not a clear-cut fix, and would benefit from testing with an actual regulated buyer rather than being changed on instinct alone.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 6 | Plausible objection-handling improvement for a specific, important buyer segment |
| Confidence | 5 | Reasonable hypothesis, genuinely contestable against the page's own established voice |
| Ease | 9 | Pure copy edit |
| **Total** | **6.7** | |

---

### 2.9 Full restructure — "Recommended Platform-page structure" (15 sections) and the section-mapping table

**Assessment:** This is a rollup of everything above plus a specific new sequence, not a standalone recommendation. Its overall feasibility is bounded by its weakest dependent parts — the Assurance and Industries items specifically. As a north star for where the page should eventually land, the sequencing logic is sound and consistent with what's already working (decisions before engine, worked example early, technical depth late). As a near-term work order, it should be decomposed into the independently-scoped items above rather than attempted as one project.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 7 | If fully executed, a meaningfully tighter and better-routed page |
| Confidence | 5 | Sound sequencing logic, but bundles blocked and unblocked work together |
| Ease | 3 | Large multi-part change; several sub-parts blocked on missing pages |
| **Total** | **5.0** | |

---

## 3. Consolidated ICE ranking

| # | Recommendation | Impact | Confidence | Ease | **Score** | Blocked on missing page? |
|---|---|---|---|---|---|---|
| 1 | Fix hero CTA destinations + reframe closing CTA (not a new block) | 9 | 9 | 8 | **8.7** | No |
| 5 | Reframe WorldMonitor as likelihood context | 6 | 8 | 9 | **7.7** | No |
| 8 | Rename "NEVER" for public use | 6 | 5 | 9 | **6.7** | No |
| 2 | Move Consulting detail to `/consulting` | 6 | 7 | 6 | **6.3** | No |
| 6 | Shorten/move Origin to `/company` | 4 | 7 | 8 | **6.3** | No |
| 4 | Consolidate engine sections, progressive disclosure | 7 | 6 | 5 | **6.0** | No |
| 9 | Full 15-section restructure | 7 | 5 | 3 | **5.0** | Partially |
| 3 | Move framework detail to "Assurance" | 5 | 4 | 3 | **4.0** | **Yes** |
| 7 | Expand Industries to 6 linked cards | 5 | 3 | 2 | **3.3** | **Yes** |

**Recommended sequence, if prioritizing by score:** items 1 → 5 → 8 → 2 → 6 → 4 can all proceed now, with no dependency on unbuilt pages, and would resolve the great majority of the critique's diagnosed problems. Items 3 and 7 should be logged as future work contingent on an explicit decision to build an Assurance page and industry landing pages respectively — not scheduled alongside the others as if same-effort. Item 9 (the full restructure) is best treated as the eventual destination these smaller items converge toward, not a single project to schedule.

---

## 4. Open dependencies (not resolved by this review)

- **Should an `/assurance` page be built?** If yes, item 3 becomes straightforward; if no, the critique's framework-detail recommendation should be re-targeted at `/frameworks`, `/reference`, or `/iec-62443` instead, which changes its content plan.
- **Should OXOT's public industry list expand from 4 to 6 (adding Hyperscale, Defense & Government)?** This is a positioning decision independent of the page-layout question the critique frames it as, and should be made explicitly before any Industries-section work is scoped.
- **Is a page-tailored closing CTA worth the duplicate-CTA risk this session's own build history deliberately avoided elsewhere?** Recommend resolving this as a stated design principle (one global CTA per page vs. page-tailored CTAs allowed) rather than deciding it per-page.
