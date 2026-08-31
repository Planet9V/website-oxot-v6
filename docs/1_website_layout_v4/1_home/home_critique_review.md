# Review: `home_critique.md` vs. the actual `/home-2` page

**Scope.** Same discipline as `2_platform/platform_critique_review.md`: verification and prioritization, not a rewrite, no changes made to the live page. Every claim below about `/home-2`'s current structure or copy is checked against its actual source (`src/app/[locale]/home-2/page.tsx`, `src/components/home2/content.ts`, the shared `Cdt2Services` component it now reuses) and a fresh check of the site's real route list — not against the critique's own description, and not from memory. Where this session's own prior work already independently found the same thing the critique found, that's noted — it's stronger evidence than either finding alone.

**Tool note:** the `sequentialthinking` MCP tool referenced in CLAUDE.md is not present in this session's tool list (checked via `ToolSearch` earlier this session) — not invoked; reasoning below is direct.

---

## Executive summary

`home_critique.md` is well-observed and — on every specific claim about the *current* page checked here — factually accurate. Its core diagnosis (a strong hero and four-decisions bridge, buried under too much duplicated depth: a full company section, a full six-service grid, ten case studies, a dead-linked partners section) matches what a fresh read of the actual source confirms.

The larger caveat, and it's a big one: this critique is scored against `home_layout_instructions.md`, a *much* larger future sitemap than what exists today — `/platform`, four `/decisions` sub-pages, `/deployment`, `/integrations`, `/work-with-oxot`, and six or seven `/industries/[vertical]` pages. A fresh check of `src/app/[locale]/` found **none of those routes exist.** What does exist and is real: `/consulting`, `/company`, `/contact`, `/case-studies`, `/twin`, `/cdt-2`, and — new as of this session — `/assurance` and `/technical-specification`. So roughly half of this critique's recommendations are genuinely actionable now; the other half assume a sitemap that would need to be built first, and treating them as equal-effort would be a mistake.

One structural finding is worth flagging up front because two independent reviews landed on it separately: **the Four Decisions section has no section-level heading.** This critique caught it; so, independently, did this session's own `PAGE_RECONSTRUCTION_SPEC_home-2.md` (§2.2, written before this critique was read), which called it "a genuine structural outlier." Two unrelated passes finding the same gap is a stronger signal than either alone.

---

## 1. Verification table — factual claims about the current page

| Claim in critique | Verdict | Evidence |
|---|---|---|
| Hero CTA scrolls to the global Contact Band | **Confirmed** | `HERO.ctaPrimary = { label: "Talk to OX", href: "#contact-band" }` |
| Section order: Hero, Four Decisions, Company, Two Ways In, Twin, [Consulting], Case Studies, Partners, Sectors, Global Contact Band | **Confirmed, exact match** | `home-2/page.tsx`'s render list, checked fresh this session |
| "Full six-service expandable grid" still present on the homepage | **Confirmed** | `<Cdt2Services tone="surface" />` — the same shared, unabridged 6-card interactive component; this session condensed it on `/cdt-2` itself but deliberately left `/home-2`'s copy full, per that commit's own stated reasoning |
| Four Decisions section has no H2 | **Confirmed, independently corroborated** | No `H2`/`Eyebrow`-paired heading in `Home2FourDecisions.tsx`; this session's own reconstruction spec flagged the identical gap before this critique was read |
| Partners section CTA points to a non-existent `/collaboration` page | **Confirmed** | `PARTNERS.closingLink.href = "/collaboration"` — also independently confirmed this session via `measure.mjs`, which reports it as the one remaining dead link on the page |
| Ten case-study cards on the homepage | **Confirmed** | `CASE_STUDIES.items.length === 10` |
| Industries section lists only four, generic | **Confirmed** | `SECTORS.industries` = Manufacturing / Water / Energy / Transportation, no links |
| Page links internally to `/cdt-2#risk` and `/cdt-2#test`, while larger CTAs point to `/twin` | **Confirmed** | `TWIN.callout.link.href = "/cdt-2#risk"`, `TWIN.testControl.link.href = "/cdt-2#test"`; hero secondary CTA and the Two Ways In "Cyber Digital Twin" panel both point to `/twin`. Both `#risk` and `#test` anchors still resolve correctly on `/cdt-2` after this session's restructure — neither was touched |
| Company section principles list matches as described | **Confirmed, near-verbatim** | `COMPANY.points` — all five items match the critique's quoted list |
| A `/platform` page exists to route product links to | **Inaccurate** | No such route. The closest real pages are the live `/twin` and the comparison build `/cdt-2` |
| `/industries/[vertical]` pages exist for any of the 4 (or proposed 6) industries | **Inaccurate** | No dedicated industry page exists anywhere in the codebase — not for the current 4, not for the proposed 6 |
| A `/decisions` overview page exists | **Inaccurate** | No such route |
| An `/about` page exists | **Inaccurate as named** | The real equivalent is `/company` (already what `Home2Company`'s own "What the Netherlands funded" link points to) |
| `/assurance` exists as a link target | **Now accurate** | Built this session, after `home_critique.md` was written — wasn't true when the critique was authored, is true now |

---

## 2. Per-recommendation review

### 2.1 Change hero CTA copy/destination ("Talk to an OT Engineer" → direct `/contact`, not an anchor)

**Assessment:** A real, debatable-but-reasonable UX point — a direct route is easier to share/bookmark/measure than a same-page anchor, as the critique itself argues. Weighed against that: the anchor already works, costs nothing extra, and keeps the visitor on the page (arguably a retention win, not just a technical shortcut). No data is cited either way. Low-risk regardless of which way it's decided.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 4 | Marginal — the anchor already functions; the benefit is measurability/shareability, not fixing something broken |
| Confidence | 6 | Plausible, unproven, genuinely debatable |
| Ease | 9 | Pure copy/href change, `/contact` is real |
| **Total** | **6.3** | |

---

### 2.2 Add an H2 above Four Decisions

**Assessment:** Correct, and independently corroborated by this session's own reconstruction spec before this critique was read. This is the strongest low-effort fix in the whole document — a genuine accessibility/hierarchy gap, not a style preference.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 5 | Real accessibility fix on a section that currently skips a heading level in the page's document outline |
| Confidence | 9 | Two independent passes found the identical gap; heading hierarchy is not a matter of taste |
| Ease | 9 | Pure content addition, no structural change |
| **Total** | **7.7** | |

---

### 2.3 Remove the Partners/Collaboration section entirely

**Assessment:** Correct and immediately actionable. The section's only CTA is a dead link (`/collaboration`, confirmed via `measure.mjs` this session as the page's one remaining broken link). Removing the section is a legitimate alternative to building the destination page — arguably the better one, since nothing in the current site roadmap suggests `/collaboration` is coming soon. The critique's suggestion to fold its best line into Consulting's "how we work" content is sound and costs little.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 6 | Removes the page's one confirmed dead link outright, rather than leaving it as a known gap |
| Confidence | 7 | Clear win — the alternative (building `/collaboration`) is far larger scope for a section whose absence of named partners was already "a good instinct" per the critique's own words |
| Ease | 8 | Deletion plus moving one message elsewhere |
| **Total** | **7.0** | |

---

### 2.4 Replace the full six-service grid with a condensed 3-tier block

**Assessment:** Correct, and this session has unusually high confidence here specifically: the identical pattern was already built, tested, and shipped on `/cdt-2` this session (`Cdt2ConsultingCondensed.tsx` — "Decision Sprint / Twin Build / Continuous Twin Operations," near-verbatim to what this critique independently proposes). That's not a coincidence worth ignoring — it's a working component adaptable to `/home-2` with a locale-aware `Link` swap, not new engineering.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 6 | Real page-length reduction; the six services already live canonically on `/consulting`, so this stops duplicating rather than removing unique content |
| Confidence | 8 | High — the near-identical pattern is already built and verified working elsewhere in this codebase |
| Ease | 8 | Adapt an existing, tested component rather than build one from scratch |
| **Total** | **7.3** | |

---

### 2.5 Condense the Company section into a trust-strip, move the CIF-NL grant detail off

**Assessment:** Directionally sound — `/company` is real and already the link target for the fuller story. The specific four-line trust-strip proposed ("Engineering-led / Vendor-neutral / Sovereign by design / Passive-first") is new copy assembled from claims that exist elsewhere on the site but haven't been packaged this way before — it should be reviewed as new positioning language, same caveat as the CDT-2 review gave the "Decision Sprint" framing.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 5 | Real length reduction on a section that currently runs long relative to its position early in the page |
| Confidence | 6 | Sound direction; the specific new trust-strip copy needs its own review, not assumed pre-validated |
| Ease | 7 | `/company` already exists as the real destination; the edit itself is a content trim |
| **Total** | **6.0** | |

---

### 2.6 Route all product/consulting/assurance/industry links through the final IA

**Assessment:** This is where the missing-sitemap problem bites hardest. `/consulting` and (as of this session) `/assurance` are real destinations this can point to today. `/platform` is not — the two live candidates are `/twin` (the real page) and `/cdt-2` (the comparison build this critique itself says shouldn't be exposed in production content). `/industries/[vertical]` doesn't exist for any industry, current or proposed. This recommendation is really three recommendations of very different feasibility bundled as one.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 6 | Real information-architecture cleanup if achievable |
| Confidence | 3 | Bundles a mostly-real ask (route to `/consulting`/`/assurance`) with a mostly-unreal one (`/platform`, `/industries/*`) |
| Ease | 3 | Partially blocked — `/platform`'s very existence is an undecided positioning question, not a build task |
| **Total** | **4.0** | Blocked on `/platform` decision + industry pages |

---

### 2.7 Reduce industries from 4 to 6 linked cards

**Assessment:** The most blocked recommendation in the document, same shape as the parallel finding in the `/cdt-2` review. Not one of the 4 current industries has a dedicated page to link to, let alone the 2 proposed additions (Hyperscale & Data Centers, Defense & Government). This is 6 net-new pages, not a content edit.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 5 | Real value once destinations exist |
| Confidence | 3 | Bundles an unvalidated scope expansion (4→6 sectors) with a structural change |
| Ease | 1 | Blocked on 6 net-new pages, none of which exist today — the largest single build item in the entire critique |
| **Total** | **3.0** | Blocked — largest scope item in the document |

---

### 2.8 Reduce case studies from 10 featured to 3, plus an "explore all" link

**Assessment:** A reasonable "don't overwhelm the homepage" instinct, but it's an editorial decision (which 3?), not a mechanical trim — and the current 3-column grid with a wide "All case studies" tile is itself a deliberate layout choice from earlier this session, not an accident. Worth weighing against the fact that all 10 cases are real, live, and already link correctly (confirmed this session) — unlike the industries recommendation, this isn't fixing broken content, it's an information-density judgment call.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 5 | Real scroll-length reduction on the page's most visually dense section |
| Confidence | 5 | Reasonable instinct, but "which 3" is a content decision with no stated criteria |
| Ease | 6 | Mechanical slice is easy; deciding what's "featured" is not |
| **Total** | **5.3** | |

---

### 2.9 Soften "permission to ignore" → "a defensible decision to defer"

**Assessment:** The same register-tension already flagged in the `/cdt-2` review for the NEVER→ACCEPTED rename — but weaker here, because the critique's own document calls "permission to ignore" **"concise, differentiated, and memorable"** two paragraphs before recommending its removal. That's an internal tension worth surfacing rather than resolving silently: the critique is arguing both that the phrase works and that it should be replaced.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 3 | Minor tone edit; smaller stakes than the CDT-2 label rename since this is homepage marketing copy, not a system label reused throughout a page |
| Confidence | 4 | Genuinely contestable — the critique itself praised the phrase it wants softened |
| Ease | 9 | Pure copy edit |
| **Total** | **5.3** | |

---

### 2.10 Full "Recommended final homepage" restructure (10-section rollup)

**Assessment:** Same treatment as the `/cdt-2` review gave its own full-restructure recommendation: a rollup, not an atomic item, bounded by its weakest dependent parts. The overall sequencing logic here is sound and largely consistent with what's already working. As a near-term work order it should be decomposed into the items above; as a north star, most of it is a reasonable direction once the underlying pages exist.

**ICE:**
| | Score | Why |
|---|---|---|
| Impact | 7 | A meaningfully tighter, better-routed homepage if fully executed |
| Confidence | 4 | Sound sequencing, but the majority of its own link targets (`/platform`, `/decisions`, `/industries/*`) don't exist |
| Ease | 2 | Heavily blocked; large multi-part change |
| **Total** | **4.3** | |

---

## 3. Consolidated ICE ranking

| # | Recommendation | Impact | Confidence | Ease | **Score** | Blocked on missing page? |
|---|---|---|---|---|---|---|
| 2 | Add H2 above Four Decisions | 5 | 9 | 9 | **7.7** | No |
| 4 | Condense six-service grid (pattern already built on /cdt-2) | 6 | 8 | 8 | **7.3** | No |
| 3 | Remove Partners section (dead-link cleanup) | 6 | 7 | 8 | **7.0** | No |
| 1 | Hero CTA to direct /contact | 4 | 6 | 9 | **6.3** | No |
| 5 | Condense Company into trust-strip | 5 | 6 | 7 | **6.0** | No |
| 8 | Reduce case studies 10→3 featured | 5 | 5 | 6 | **5.3** | No |
| 9 | Soften "permission to ignore" | 3 | 4 | 9 | **5.3** | No |
| 10 | Full 10-section restructure | 7 | 4 | 2 | **4.3** | Partially |
| 6 | Route links through final IA (/platform, /industries) | 6 | 3 | 3 | **4.0** | **Yes** |
| 7 | Expand industries 4→6 linked cards | 5 | 3 | 1 | **3.0** | **Yes** |

**Recommended sequence, if prioritizing by score:** items 2 → 4 → 3 → 1 → 5 → 8 → 9 can all proceed now with no dependency on unbuilt pages, and address the substantial majority of what this critique diagnosed as wrong. Items 6 and 7 should be logged as future work contingent on explicit decisions (does `/platform` exist as its own route or is `/twin`/`/cdt-2` the permanent answer; is the industry list actually expanding to 6) — not scheduled alongside the unblocked items as if same-effort. Item 10 is the eventual destination these smaller items converge toward, same framing the `/cdt-2` review gave its own equivalent rollup.

---

## 4. Open dependencies (not resolved by this review)

- **Does `/platform` become a real, separate route, or is the eventual answer "`/twin` is the platform page"?** This is the single decision this critique's routing recommendations most depend on, and it's a positioning question, not a build task — resolving it changes the scope of item 6 substantially.
- **Is the industry list actually expanding from 4 to 6** (adding Hyperscale & Data Centers, Defense & Government)? Same open question this session's `/cdt-2` review already surfaced for the Industries section there — the two critiques agree on the proposed expansion, which is worth noting, but neither resolves whether OXOT wants to make that call yet.
- **Should `/home-2`'s CTA pattern match `/cdt-2`'s** (a page-tailored closing CTA suppressing the global `ContactBand`, per this session's `SUPPRESS_CONTACT_BAND` mechanism), or is the global band's current behavior on `/home-2` — which this critique explicitly calls "a valid final CTA" and doesn't ask to change — the right call to leave alone? Flagging only because the mechanism now exists and extending it is a one-line change if wanted; not recommending it, since this critique itself doesn't ask for it.
