# PROGRESS — the OXOT website

**State of record. Update after every page, so the work survives any context loss.**

---

## 0. Where this repository came from (2026-08-09)

This repo is **only the website**, and its root is the app.

It was carried out of `Planet9V/OXOT-Website-JULY2026` on 2026-08-09, where it
lived in a `web/` subdirectory beside a CMS application. **Paths in the older
entries below still say `web/…`; read them as repo-root relative.** Everything
those entries record actually happened — only the location changed.

| | Then | **Now** |
|---|---|---|
| Repo | `OXOT-Website-JULY2026` | **`oxot-website`** (private) |
| Site path | `web/` | **root** |
| Trunk | `straight-a` | **`main`** |
| Local | `:3100` (Docker, worktree bind-mount) | **`npm run dev`** |
| Railway | `oxot-web`, branch `straight-a`, root `web` | **`oxot-web`, branch `main`, root `/`** |
| CI | none | **runs on every push, currently green** |

The old repo is untouched and still holds the CMS app, `knowledge-source/`,
`content-source/` and `docs/plans/**`. Nothing was deleted.

**The old app is gone from this repository.** Older entries below that contrast
"the OLD app (`src/`, CMS, `:3000`)" with "this app" are historical: there is no
longer another application here to confuse it with.

---

## 1b. Picking this up cold? Read `HANDOVER.md` first

`HANDOVER.md` is the onboarding primer: what this repo is, where everything
lives, the gates and how to point them at a real deployment, the two files you
must not "tidy up", and the pitfalls that have already cost time. **Rewritten
2026-08-09 for this repository** — the previous version described the old repo's
branch-and-worktree layout and every one of its warnings is now false there.

---

## 2. Source of truth — read in this order

0. **`website_strategy/09-product-architecture-and-harvest-map.md`** — the
   product architecture, **corrected by the owner 2026-08-08**. The Cyber
   Digital Twin is the PARENT; CRA Readiness is an offshoot of it that is also
   sold standalone. Everything below was written when the site had them as
   siblings, so **where anything conflicts with 09, 09 wins.**
1. `docs/plans/2026-08-07-straight-a/LOKI-MASTER-PLAN.md` — master plan
   (⚠ its Wave 1–4 order sequenced the **old** app's twelve pages and was
   superseded by the pivot to `web/`; the waves are dead, see §5c)
2. `docs/plans/2026-08-06-option-b/START-HERE.md` — §1 mission · §2 positioning + lead ladder · §3 **the four owner corrections (DECISIONS — do not re-derive)** · §4 the claim sheet
3. `docs/plans/2026-08-06-option-b/BREAKOUT-STRATEGY.md` — strategy of record, kill list
4. `docs/plans/2026-08-07-straight-a/vision.md` — the reader, the three fears, the voice, the banned list
5. **`docs/OXOT-DESIGN-SYSTEM.md`** — the design system. Binding. `CLAUDE.md` §7e
6. **`docs/OXOT-DESIGN-SYSTEM.css`** — its token companion
7. `docs/reference/CRA-DATES.md` — **today is 7 August 2026. Cite, never recall.**
8. `web/BUILD-LAW.md` — the standing rules for building a page here

**Where documents disagree, `START-HERE.md` governs** (it says so itself: *"Where
earlier documents in this folder say 'A-', read **A**"*).

Two known conflicts, already resolved, do not re-litigate:

- **Grant wording.** `BREAKOUT-STRATEGY.md` §4 bans "17 points"; `START-HERE.md`
  §3.2/§4 clears it. **START-HERE governs.** Cleared: *"the maximum grant
  available under the scheme"*, *"one of 13 projects selected from a field of
  95"*, *"17 of a possible 20 points"*, *"announced 14 July 2026"*.
- **Page count.** 11 vs ~18 vs ~16 across documents. Moot here: this app has 7
  routes by design.

### ⚠ The cleared claim sheet contains a trap

`START-HERE.md` §4, `REVISION-01` and `REVISION-02` all present this as approved:

> *"What Article 14 **already requires** of this product, **as of** 11 September 2026"*

On 7 August 2026 that obligation is **35 days in the future**. The line was
written for a reader arriving after September. Shipping it verbatim is how eight
surfaces of the old site went wrong, and the live conformity app at `:8088`
still carries it (*"reporting obligations are already enforceable"*).

**This app deliberately diverges**: `From 11 September 2026, …` / `Vanaf 11
september 2026, …`. Never *already*, never *since*, never *al*, never *sinds*.
`CRA.article14`'s note in `src/content/claims.ts` records why.

---

## 3. The argument this site makes

**The wedge** (`START-HERE.md` §2 — *"the category-defining claim"*):

> **OXOT is not queuing for conformity assessment capacity. OXOT is building it.**
> *"Our clients are not in a queue. They are in a plan."*

**The house rule that makes it unattackable** (`vision.md` §4): the Regulation
asks Member States to ensure enough notified bodies by 11 December 2026, *"to
avoid bottlenecks and hindrances to market entry."* **Quote the EU's urgency;
never assert OXOT's.**

**The three offerings, in this order** (`START-HERE.md` §2): CRA leads on
urgency · **the Cyber Digital Twin is the destination — every CRA page ends
pointing at it** · Consulting (IEC 62443) is the revenue that bills today.

**The reader** (`vision.md` §1) arrives with three fears: *"I don't know which
road I'm on."* · *"The road I assumed exists may not."* · *"I cannot test the
change that would fix this."* They have read four vendor pages promising a
four-phase gap assessment and a call. **They are tired of it.**

**The feeling to produce** (`vision.md` §3): not fear, not urgency theatre —
**"Someone has already done the arithmetic, and there is a plan I can be in."**

**The signature move** (`BUILDER-LAW.md`): every page carries **one checkable
number, its source one click away, including the part that is unflattering.**
Not an adjective.

---

## 4. Standing decisions (owner, 2026-08-07)

| # | Decision | Consequence |
|---|---|---|
| D1 | **Both languages stay populated.** NL is not deferred. | `en.ts` defines the shape; `nl.ts` must satisfy it; `Claim.nl` is required. A missing Dutch string is a build failure. Verified red-green. |
| D2 | **Two independent adversarial reviewers per route**, ≥90 on all seven. | The builder never grades its own page. Verdicts persist to `web/reviews/`. |
| D3 | **Homepage is Wave 1** and becomes the rubric calibration exemplar. | The first page to pass defines what "90" means for the rest. |
| D4 | ~~Query `gbrain` before writing any factual claim~~ — **RESCINDED 2026-08-07.** | Facts come from `claims.ts` and `cra-reference.ts` only. A vector store is not provenance. |

---

## 5. Status board, and the plan

### 5a. Where everything runs — check this before anything else

**Two applications live in this repository.** Confusing them has cost hours.

| | URL | App | Editable? |
|---|---|---|---|
| **New site — local** | `http://localhost:3100` | **new** (`web/`) | ✅ **this is the one we build.** Hot reload. |
| **New site — live** | `oxot-web-production.up.railway.app` | **new** | auto-deploys from branch `straight-a`, root `web/` |
| Old site — local | `http://127.0.0.1:3000` | **old** (repo root) | hot reload, but content is DB-driven — see below |
| Old site — live | `oxot-website-july2026-production.up.railway.app` | **old** | from `main`. Last 5 deploys FAILED (7 Aug) — serves an older build |

> ⚠ **`localhost:3100`, never `127.0.0.1:3100`.** Next's dev server 403s its
> own static chunks on the numeric origin, so the page renders, never hydrates,
> and every interactive control on the site looks broken. Cost half an hour on
> 2026-08-08 diagnosing a tab bar that was fine.

Both local containers mount **this worktree**
(`.claude/worktrees/chore-tree-hygiene`), not the main checkout. Edits here
appear on both ports within seconds. If this worktree is removed, both
containers break.

**Owner decision, 2026-08-08: BOTH SITES STAY UP.** The old site is kept as a
content and graphics source to harvest from, one page at a time, on the owner's
instruction. It is not a deploy target and is not being improved.

> **Editing the old site is not like editing the new one.** Its pages are
> DB-authoritative: the markdown under `content/pages/**` is a dead mirror for
> `content_type='blocks'` pages, and a real content change is an idempotent SQL
> migration (CLAUDE.md §7c). The new site is plain files.

### 5b. Where each page stands

Twelve routes. "Graded" means the two-reviewer editorial pass in §6, not the
mechanical gates — 8/8 on the harnesses is not a grade and must never be
reported as one.

| Route | Gates | Graded? | Known open |
|---|---|---|---|
| `/` | ✅ | r1 only: 62 / 80, both BELOW_A | persona cards vs the ask |
| `/cra` | ✅ | never | **rebuilt as the CRA Readiness door, 2026-08-08** |
| `/conformity` | ✅ | never | was unchecked by either harness until 8 Aug |
| `/twin` | ✅ | never | 1-of-7 figure unattributed (owner: leave it) |
| `/consulting` | ✅ | never | phases moved to `/cra`; keeps IEC 62443 |
| `/company` | ✅ | never | h1 duplicates /twin's argument — owner's call |
| `/check` | ✅ | never | PDF runs 2–3 pages |
| `/retainer` | ✅ | never | **new 2026-08-08** — the annuity and the Article 39 firewall |
| `/contact` | ✅ | never | — |
| `/privacy` | ✅ | n/a | **no registered address or KvK — owner must supply** |
| `/cookies` | ✅ | n/a | banner is built but dormant: nothing non-essential is set |
| `/terms` | ✅ | n/a | — |

**Gates** = tsc · 33 vitest · `measure.mjs` 12/12 both themes · `content-guards.mjs`
5×24 · `chrome-guards.mjs` 40. All green as of 2026-08-08.

**OXOT-FIRST AUDIT** (standing rule, `website_strategy/02` §3b). `/` ✅ · `/cra` ✅
· `/retainer` ✅. Every other page is checked against it at its step.

### 5c. The plan

Owner-directed, one page at a time. The owner picks the page and the change;
this file records what happened.

**P0 — before anything is called production**
| # | Task | Done when |
|---|---|---|
| P0.1 | Decide the domain. No custom domain is attached to either Railway service; `oxot.nl` points at neither. | a domain resolves to the new site |
| P0.2 | Resolve PR #120 — 69 commits, **CONFLICTING**, no CI checks running. Or decide `main` is not the path and say so here. | mergeable, or the decision is recorded |
| P0.3 | Get CI running the gates on push. Today every gate is run by hand. | a red gate blocks a merge |

**P1 — the product architecture, corrected 2026-08-08** *(the real content work)*

The owner's correction: **the Cyber Digital Twin is the PARENT product and CRA
Readiness is an offshoot of it that is also sold standalone.** The site had them
as siblings. Full architecture and the old→new harvest map:
[`website_strategy/09-product-architecture-and-harvest-map.md`](../website_strategy/09-product-architecture-and-harvest-map.md).

| # | Task | Done when |
|---|---|---|
| P1.1 | **`/twin` rebuilt around the value proposition** — "what is the probability and financial impact of a cyber attack on my OT infrastructure, today and 90 days from now". Eight modules, the five differentiators, insurance-grade quantification. The grant becomes proof, not the lede. **Largest content gap on the site.** | the page sells the twin, not the grant |
| P1.2 | **A CRA Readiness pillar page** — presents the Conformance Application, the consulting, the Retainer and the wizard as ONE offer, and states the lineage from the twin. | one page a buyer can be sent to |
| P1.3 | **The Retainer page** — the highest-value offer, currently has no page anywhere. CB partnership, workbench preparation, timeslot/priority. | it exists |
| P1.4 | **`/conformity` shows the product** — real screenshots from the running app at `:8088`, not a description of a description. | a reader sees the workbench |
| P1.5 | **`/company` → founders, mission, background**, and stops restating `/twin`'s argument (see P2.2). | credibility page, not a second twin pitch |
| P1.6 | An insights surface, if the three essays are to survive the migration. | decided either way |

Standing loop alongside: the owner names a page and a change; harvest from the
old site (`127.0.0.1:3000`) and the CRA app (`:8088`); edit; verify both themes
and both languages; run the gates.

**P2 — quality debt, in priority order**
| # | Task | Done when |
|---|---|---|
| P2.1 | Run the contrast/overflow sweep over **Dutch**. It is EN-only by default and Dutch is the longer language — 11 of 11 Dutch pages once overflowed while 0 English did. | 8 `/nl` routes clear |
| P2.2 | `/company` h1 stops restating `/twin`'s argument. **Needs an owner decision** — it is cleared copy. | new h1 cleared |
| P2.3 | `/check` PDF pagination is stable. | fixed page count |
| P2.4 | Grade the seven ungraded routes through §6. | seven grades recorded |

**P3 — structural, optional**
| # | Task | Done when |
|---|---|---|
| P3.1 | Extract `web/` to its own repository. It is self-contained; being a subfolder of the old app is the single biggest source of confusion. | new repo builds and deploys |

## 6. The gate — seven criteria, ≥90, two reviewers

From `docs/plans/2026-08-07-straight-a/task_plan.md` §1. **`overall = min(seven)`** —
a page is only as good as its worst axis. **A− is a failing grade.**

1. **Message** — four seconds to say what OXOT does and what to click
2. **Copy fidelity** — every line traced to a cleared source or justified; zero banned words
3. **Layout** — page kit, one `h1`, 0 contrast fails both themes, 0 overflow, 0 ghosted
4. **Proof** — dated, sourced, or one click from proof
5. **Conversion** — ONE ask, naming what the reader gets
6. **Coherence** — hands off correctly, duplicates no other page, no dead links
7. **Technical** — no console errors, EN/NL parity, suite and `tsc` green

Mechanism: build → self-check → **two independent reviewers who did not write the
page, seeing the rendered page, adversarial by instruction** → both ≥90 or the
union of defects returns to build → **stop after 2 rounds and escalate**
(Karpathy rule 7, do not thrash).

**Visual validation in Claude-in-Chrome is mandatory and blocking**
(`design-route-to-a.md` §2): both locales × both themes × 390/834/1440/2560.
*"The eye is the gate the numbers cannot be."*

---

## 7. Standing gates (run before claiming anything)

```
npx tsc --noEmit                              # clean
npx vitest run                                # 21/21
npm run build                                 # green, /en + /nl prerendered
node scripts/measure.mjs                      # 8/8 routes
node scripts/content-guards.mjs               # 5 guards × 16 routes + as-of
node scripts/content-guards.mjs --self-test   # every guard proves it fires
```

`measure.mjs` checks: one `h1`, composited contrast in **both** themes, ghosted
content, overflow at 390/834/1440/2560, console errors, dead internal links,
and — since 2026-08-07 — **`::before` / `::after` / `::placeholder`**, which it
could not see before. Two real AA failures hid there once. `pseudo=N` in the
output is how many generated boxes actually paint text.

`content-guards.mjs` is the other half: `measure` asks whether a page is *built*
right, guards ask whether it is *true*. Five defects that have shipped more than
once are pinned there, checked against the **rendered DOM** (CLAUDE.md §7c).

**A route not on the list is not checked.** `/conformity` shipped on neither
list and stayed unchecked until 2026-08-08, when it turned out to carry the
worst factual error on the site. Adding a route means adding it to both.

### ⚠ Both harnesses were lying, and the lesson is not "they are fixed now"

On 2026-08-07 `measure.mjs` was found to be reporting `0 contrast failures`
while measuring **4 of 58 text nodes on every route**. Its collector ran as a
template-literal *string*, and inside a template literal `\d` collapses to a
bare `d` — so the colour parser's number regex was really `/-?[d.]+/g`, matched
nothing in `rgb(244, 244, 246)`, returned `null`, and skipped the element. Only
the four `oklab()` colours survived, because those strings contain `.`. A second
bug compounded it: the code assumed canvas `fillStyle` normalises every colour
format, and Chrome hands `oklab()`/`oklch()` straight back verbatim.

Then a missing dictionary key 500'd the homepage and **both harnesses reported
it clean** — Next's error page has one `h1`, few text nodes and none of the
strings the guards look for.

Three standing rules came out of it:

1. **A green check that has never been red is not evidence.** Prove a gate fires
   before trusting it. `--self-test` exists for exactly this.
2. **A harness must refuse to grade a page that did not render.** Both now
   assert HTTP 200 and a plausible amount of rendered text first.
3. **Never build a page-side collector as a string.** Pass a real function to
   `page.evaluate`. The escaping hazard has bitten twice — once with backticks,
   once with `\d`.

---

## 8. Log

- **2026-08-08 (11)** — **The check's ladder reaches the paid rung, and the
  gate asks for an organisation.**
  `company` is **required** now (owner instruction): a report addressed to a
  person at no organisation is a lead nobody can qualify, and the reader has
  already had the verdict for free. Role stays optional.
  **The verdict now says what buying looks like.** The ladder ran free verdict
  → gated PDF → free written review → *nothing*. The code carried a reasoned
  note against going further — *"a paid annuity thirty seconds after telling
  someone they are exposed converts a diagnosis into a sales trigger"* — and
  that concern is answered rather than ignored: the new block sits **after
  both free rungs**, makes no ask, has no urgency and no call, and every
  number in it is a cleared claim. If it ever starts reading as a pitch, it
  has failed and it moves.
  Verified end to end by driving the wizard: six questions → verdict → an
  empty organisation is rejected with a translated error → the PDF still
  downloads (`OXOT-CRA-readiness-2026-08-09.pdf`). Both locales carry the new
  block.

- **2026-08-08 (10)** — **The review copy is noindexed, straight-a is pushed,
  and CRA has children.**
  **Indexing is opt-in now** (`OXOT_PUBLIC_SITE=true`). The Railway host was
  measured serving `/en/cra` with no robots directive and no robots.txt — a
  crawlable staging copy of oxot.nl, showing the version that sells nothing.
  Four tests hold the closed default.
  **Pushed** `7be1de4..3e8a70a` — the review copy had been nine commits behind.
  **The CRA submenu**: "The CRA" is still a link to `/cra`; a separate chevron
  discloses **The Retainer** and **Conformity Application**. Top bar went from
  five entries to four. At 390 the children are indented items in the existing
  menu — no dropdown on touch. The old site's mistake was a label that opened
  a panel instead of navigating; this is a link AND a disclosure.
  **The footer flattens the tree**, or adding children would have silently
  dropped the Conformity Application from the site's index.
  **One guard was lying, not one page:** `header button[aria-label]` was how
  the chrome guards found the theme toggle, and the new chevron is an earlier
  labelled header button — so two theme guards failed on a theme that was
  never broken. The toggle now carries `data-theme-toggle`.

- **2026-08-08 (9)** — **The reference console, the hero's five dates, and the
  three roads made interactive.** `/cra`'s evidence — roads, calendar, Annex I,
  Article 69 — was four sections in a row and is now four views of one panel,
  with every panel force-mounted so nothing left the DOM. The tab bar carries
  each view's own count, so it reads as an instrument rather than navigation.
  **The hero panel carries all five dates**, with "there is no single CRA
  deadline" beside them instead of buried in a section further down.
  **The old site's interactive roads split is ported** (`cra-home/roads-split`
  → `cra/roads-split`), with its copy harvested from the old site's rendered
  DOM in both locales rather than retranslated. Three things changed on the
  way, each because this site's law says so: no raw colour (the original
  hard-codes four hex values and paints status in red/emerald), no scroll
  choreography (geometry correct before JS runs), and the intake event
  replaced by a link to the free check.
  **Two defects found by measuring, not by looking:** the ported sign cards
  overlapped by a third at 1440 because this system's minimum readable type is
  larger than the original's 10px — the map became a junction beside the cards
  instead of under them; and the closed road's chip measured 3.31:1 light /
  2.93:1 dark, so the status text is `--foreground` and the destructive tint
  is reinforcement behind a word that already says CLOSED.
  **The static map moved to §03, the gate** — the one thing it draws that the
  interactive split cannot is both open roads forced through one column, which
  is exactly what the legislator's sentence beside it is about.

- **2026-08-08 (8)** — **The platform is OXOT's, and the copy now says so.**
  The site introduced the product as *"a conformity operations platform"* and
  called it *"the Conformance Application"* — a generic category noun and an
  old internal name, on the one asset that differentiates the CRA offer. Owner
  correction: it is the **OXOT CRA Conformity Application**, OXOT's own
  platform, run internally on every engagement and licensed to customers.
  Naming rule recorded in `website_strategy/01` §1b — full product name at
  first mention, *"OXOT's conformity operations platform"* as the descriptor,
  never a bare "the platform" as a cold subject, Dutch descriptor *"ons eigen
  conformiteitsplatform"* because *eigen* carries the proprietary claim.
  The positioning it exists to carry: **the platform our engineers run your
  programme in is the platform you can license.**
  Caught on the way: the `/company` CRA door still said *"a platform and a
  retainer"* **and "Phase 1 from €10,000"** — the superseded price, missed in
  (7) because that pass verified only `/cra` and `/retainer`.
  Verified in the rendered DOM across six pages, both locales; 9 banned strings
  absent everywhere.

- **2026-08-08 (7)** — **The Phase 1 price, and the bench made plural.** Two
  owner corrections to the copy shipped in (6).
  **Phase 1 is "under €10,000", and it is a customer example** — what one
  engagement actually cost, not a rate card. "From €10,000" is dead, and so is
  every earlier figure for Phase 1; the copy now opens the example with *"For
  example:"* so the reader cannot mistake it for a price list.
  **The bench is a network, and that is the selling point.** The reason we name
  no single organisation was recorded as a consent problem. That is not the
  reason. OXOT works with an **ecosystem of testing benches and conformity
  assessment bodies**, several about to be named, and naming one would shrink
  the offer to a single lab. Phase 2's label is now *"The bench network — ours
  under Module A"*, and the three-phase copy says the network is plural on
  purpose so a route never depends on one lab. Same in NL.
  Verified in the rendered DOM on both locales: 16 phrase assertions, no
  superseded string surviving; 12/12 routes, 5 guards × 24 routes, 40 chrome
  guards, tsc clean, 33 tests.

- **2026-08-08 (6)** — **`/cra` rebuilt as the CRA Readiness door, and
  `/retainer` created.** The page carried 1,161 words of regulation and two
  links to a quiz; it never said OXOT sold CRA readiness. The three phases and
  the retainer were written and cleared — on `/consulting`, where a CRA buyer
  never looks. They moved.
  **The model was wrong twice and is now taken from the primary source**
  (`docs/reference/SOURCE-cra-partnership-three-phases.md`, owner-supplied):
  *OXOT owns the bookends* — Phase 1 and Phase 3 are always OXOT, Phase 2 is the
  bench, and **the fork is BY ROUTE, not by whether a bench exists**. The old
  `/consulting` line "phases 2 and 3 need a bench that does not exist yet" was
  simply untrue and is gone.
  **The retainer became sayable.** Article 39 bars a notified body from
  consulting on what it certifies, so the split is the only lawful structure —
  and "the retainer reserves capacity, never outcomes" is a claim that survives
  where "reserved slot" was banned three times.
  New: Phase 1 **from €10,000** with an anonymised example; the intake mechanism
  that finally explains "clears first review" (every deficiency cycle costs 4–8
  weeks); *"every certificate needs a keeper"* and the five recurring
  obligations; the three-door block on `/company`, CRA leading.
  **Standing rule recorded: OXOT first on every page** (`website_strategy/02`
  §3b), asserted in the DOM rather than eyeballed.
  Corrected on the way: `page-specs.md:99`'s "from €20K" superseded, and a
  knowledge-source file citing Article 43 for impartiality (it is 39).

- **2026-08-08 (5)** — **Legal pages and cookie consent** — owner: *"these are
  all required… it is critical"*. `/privacy`, `/cookies`, `/terms` in both
  languages, plus the consent machinery and a Cookie settings control in the
  footer of every page. Adapted from the old site, which did this well, and
  then **corrected against what this app actually does**: the old policy
  described a newsletter and an on-site AI assistant, and neither exists here.
  A privacy policy that misdescribes its own processing is the failure it
  exists to prevent, on the site of a firm that sells conformity.
  Verified in code, not assumed: the forms store name, email, company, role,
  answers and locale; the IP is used transiently for rate limiting and stored
  only as a salted SHA-256 hash; exactly one cookie is set (`oxot-theme`); no
  analytics, no third-party tracking. Two departures from the old
  implementation, both deliberate: **the banner does not appear**, because
  nothing non-essential is set and demanding consent for cookies that do not
  exist is theatre — the machinery is built and dormant behind
  `NON_ESSENTIAL_IN_USE`, with `hasAnalyticsConsent()` ready to gate the day
  analytics arrives; and **accept and decline are equally prominent**, where
  the old banner made accept primary and decline an outline, which is a
  recognised dark pattern under EDPB guidance. 40 rendered-DOM assertions.
  All three routes added to all three harnesses.

- **2026-08-08 (4)** — Two chrome defects the owner reported, both real.
  **The language switch was in the FOOTER ONLY**, so on a site whose first rule
  is that nothing ships in one language, a Dutch reader had to scroll a whole
  page to discover Dutch existed. It is now in the header on all 16
  route/locale pairs, from the same component (`compact` variant), hidden below
  `sm` with the same switch inside the mobile disclosure so the 390px bar does
  not overflow. **Pressing EN or NL dropped the reader into light mode** and
  logged "Encountered a script tag while rendering React component". Cause:
  `[locale]` is the ROOT segment, so /en/x → /nl/x changes the root layout's
  identity and React **remounts `<html>`**, wiping every attribute it did not
  render itself — measured: a class, `data-theme` and an unrelated `data-foo`
  all wiped by a cross-locale nav, all three kept by a same-locale one. The
  theme was set imperatively by a pre-paint script, so it could not survive,
  and the remount re-encountered the script element. **The theme is now a
  cookie the server reads and React renders**, so it survives the remount, has
  no flash, and needs no script. The trade, taken deliberately: reading a
  cookie opts the layout out of static rendering. `measure.mjs` was seeding
  `localStorage`, which now sets nothing — switched to `ctx.addCookies` and to
  asserting `data-theme`. New `scripts/chrome-guards.mjs` (35 checks) pins both
  defects; proven red by removing the header switch. Added to `npm run verify`.

- **2026-08-08 (3)** — Documentation set. `web/README.md` was still
  create-next-app boilerplate and the root `README.md` described only the CMS
  app, so nothing in the repo told a new reader that **two applications** live
  here or which one they were looking at. Both now say so at the top, and
  `docs/README.md` scopes itself to the root app. New under `web/docs/`:
  `SITE-MAP.md` (routes, nav, API, the funnel, what each gate covers),
  `FILE-MAP.md` (which file to open, the traps, the known dead code),
  `CONTENT-SOURCES.md` (the four places copy lives, the 98 claims and their
  provenance, what may and may not be said), `DIRECTIVES.md` (the binding rules
  as a one-line index over CLAUDE.md / website_strategy / the design system,
  plus what is deliberately NOT a rule), and `PAGE-COPY.md` — **generated** by
  the new `scripts/copy-inventory.mjs`, which reads the rendered DOM in both
  languages so the deck cannot drift from the site. Also removed "one living
  model" / "één levend model" from `BANNED`, which the owner rescinded, and
  recorded that the list is advisory and read by nothing. Commit `docs`.

- **2026-08-08 (2)** — Four more batches off the grading list.
  **/consulting**: the Δ legend claimed four range rows against three, and
  Zone-2's `sltUpper: 3` drew a meter range the register does not record —
  both now pinned by `claims.consulting.test.ts`, proven red first. The bench
  panel's call for testing organisations and prospective CABs ended "we are
  looking for you" and offered them only `/check`, a manufacturer's wizard;
  it now links `/contact`. **/twin**: two CTAs promised a walkthrough and
  landed on a `/contact` that never mentioned the twin — `/contact` names it
  at `#walkthrough` now — and NL had dropped the "-only" from "network-only
  tooling", broadening the claim past what English makes. **/check**:
  `FOSS_EXCEPTION` was written to fix a Class II overreach and imported
  nowhere, so the overreach was still live; it is wired to Class I and II
  only, threaded to the PDF, and verified by driving the wizard end to end in
  both languages across all four tiers. **Site-wide**: every italic removed
  (owner instruction) and the italic face unloaded with them; `/company`'s
  uncleared fourth sector ("water", against D5's three) dropped in both
  languages; homepage persona cards 194px → 156px so they stop out-sizing the
  page's one ask; `/conformity`'s five article citations now deep-link
  EUR-Lex. Commits `6bca204`, `a82c45d`, `19d28f4`.

- **2026-08-08** — Eleven copy defects fixed by reading the shipped pages, and
  `/conformity` finally added to both gate lists. The worst: `/conformity`
  cited **Article 10(7)/10(12)** for retention and support period — Article 10
  governs neither, both are **Article 13** — and flattened the Article 14
  clocks to `14(1)/14(2)/14` instead of **14(2)(a)/(b)/(c)**. All five numbers
  came from the spec sheet's 2022 proposal-era numbering, unchecked against the
  Regulation the rest of the site cites correctly. `Clock.article` was `string`,
  so the Dutch page printed ARTICLE while `/cra` printed ARTIKEL. Homepage: the
  legislator's quote restored above OXOT's position (I had removed it, inverting
  the one order the house rule forbids and orphaning "that bottleneck").
  `ANNEX_HINT.classI` was hand-typed at 8 of 19 categories while the other two
  tiers were derived, routing industrial switch makers one tier down to DEFAULT;
  now derived and tested. Out-of-scope verdict no longer renders an English
  literal inside the Dutch page. **No new guard** — the proposed provenance
  guard and word budgets were withdrawn as pedantry. Commit `d5124c1`.

- **2026-08-07** — Design system landed as binding law: `docs/OXOT-DESIGN-SYSTEM.md`
  (+ `.css`), wired into `CLAUDE.md` §7e and `BUILD-LAW.md` §5. Fetched from the
  owner's artifact, which corrected six values reconstructed from a clipped
  paste — most seriously `--primary-foreground` (dark navy `210 50% 12%`, not
  white). Implemented: canonical palette, two-layer warm/inset shadows, the
  uniform heading scale by role, dark default, shadcn `new-york`/`neutral`,
  Card hover-lift, global reduced-motion guard. Commit `bfdb15c`.
- **2026-08-07** — Bilingual foundation: locale routing under `[locale]`,
  `proxy.ts` (**not** `middleware.ts` — the old name silently never runs in
  Next 16), en/nl dictionaries with a build-failing parity check, `Claim.nl`
  required, all 71 page-scoped claims translated. Commits `7e029ba`, `8a41a0f`,
  `efd0c8a`.
- **2026-08-07** — Defects found and fixed on the way: Newsreader loaded without
  weight 700 (every bold heading would have been a synthesised fake bold);
  `alternates` declared at the layout so **every page claimed to be the
  homepage**; `/nl/cra` scrolled sideways at 390px on an unbreakable Dutch
  compound (`hyphens: auto` + `<html lang>`); `/cra` and `/twin` each rendered a
  second `<main>`; two breadcrumbs hard-coded `href="/"`.
- **2026-08-07** — Verified: `tsc` clean · build green · **measure 14/14 both
  locales** · missing-translation guard proven red-green · `/nl/cra` confirmed
  in Chrome.
- **2026-08-07** — Owner review after compaction. Four decisions recorded (§4).
  **This file created.** Open gaps acknowledged: `web/` is not in Docker; no
  route has been editorially graded; `CLAUDE.md` §1 misattributes rules 5–10 to
  Karpathy (upstream has four).

---

- **2026-08-07** — **Wave 1, homepage, rounds 1 and 2.** Two independent
  reviewers graded `/` in both locales: 62 and 80, both `BELOW_A`, converging
  independently on five of the same defects. Blocker: Article 14 shipped as
  three notification clocks when there are **four** — the 30-day final report on
  a severe incident was dropped, and the correct four were already data in
  `cra-reference.ts`. Structural: the five-date calendar was ~180 of 490 words
  and duplicated `/cra`'s spine, so it moved to `/cra` as section 02; the page
  had zero in-main links anywhere while its `h1` states the constraint the twin
  exists to answer. After: **332 words EN / 337 NL, 2.38 screens, asks=2 in both
  locales.** Commits `3e70ee0`, `c7496b5`.
- **2026-08-07** — **The contrast gate was measuring 4 of 58 nodes** and had
  been for its whole life. See §7. Commit `83c2bfb`. New `content-guards.mjs`
  pins the four repeat-offender defects, every guard proven to fire.
- **2026-08-07** — **Article 35(2) located and verified.** The wedge's
  load-bearing quote carried no article number. Verifying the authentic Dutch on
  EUR-Lex caught two errors no reviewer had: `"vóór"` (before) where the
  Regulation says `"uiterlijk op"` (by), and "asks Member States to ensure"
  where Article 35(2) only has them **strive** to ensure. The Dutch now quotes
  the Dutch text — `"knelpunten en belemmeringen voor toegang tot de markt"`,
  which is Article 35(2)'s wording and **not** recital 95's `"markttoegang"`.

---

## 9. Known open items

- **`/company`'s h1 is `/twin`'s argument** — "where your next euro reduces it
  most", almost verbatim. Two pages make the same pitch and neither says what
  the company is. It is a cleared claim sourced to company.md's own h1, so
  rewriting it is the owner's call.
- **`SECTORS` in `claims.company.ts` is dead** — exported, imported nowhere.
  Not deleted (rule 3): it is not an orphan any recent change created.
- **The `/check` PDF runs 2–3 pages** depending on gap count.

- **Seven of eight routes still ungraded** (see §5b). `/` has had one round;
  `/conformity` did not exist when the queue was written.
- **Vitest covers two modules.** 33 tests, on `check/classify` and
  `consulting/claims.consulting`.
  Everything else in `web/` is still checked only by the two `.mjs` harnesses,
  run by hand rather than in CI. Neither a harness nor `tsc` can see a wrong
  article number — only a test or a reader can, which is how five of them
  survived to 2026-08-08.
- **CI does not exist.** Every gate is run by hand. A push cannot fail.
- **PR #120 is CONFLICTING** — 69 commits, no checks. The new site reaches
  Railway from the branch, so this is hygiene rather than a launch blocker,
  but `main` currently contains **no** `web/` directory at all.

---

## 2026-08-09 — the site is live from its own repository

**`oxot-web-production.up.railway.app`**, indexable, CI green.

Shipped this round:

- **`PageRail`** (`components/shell/page-rail.tsx`) on `/cra`, `/twin` and
  `/consulting`. The defect was that the two-column grid stopped at the hero, so
  the shorter column left a hole — measured at ~600px on `/cra`. The rail now
  spans the section beneath the hero. No library: masonry reorders the DOM and
  the `h1` has to come first.
- **`/consulting`** — "How we work" moved to the top into the space the removed
  hero left; the "Where we work" sectors card and its column removed.
- **`/insights`** — the pinned article is `cdt-fooled-by-randomness`, not the
  series index. A table of contents is a poor first thing to hand someone.
- **The home page rebuilt** to five sections in the owner's order: Company · the
  CRA · the Cyber Digital Twin · Facility Due Diligence · the three doors. Every
  word is pulled from the claim constants the destination pages use, so the two
  cannot drift. Every section carries a rail and links onward.
- **Dutch audit.** Five strings were English in the Dutch dictionary — the gap
  types cannot catch, since a present-but-untranslated value compiles. Fixed;
  zero identical pairs remain outside the proper-noun list.

Three defects the move exposed, all found by building the clean tree before
creating the repo:

1. **`playwright` was never a dependency.** The gate harness only ran because
   the old repo root had it installed for the other application.
2. **`robots.txt` said `Disallow: /` on the live site** — a static route baked
   at build time, and the build began ~25s before `OXOT_PUBLIC_SITE` was set.
   Now `force-dynamic`. See `HANDOVER.md` §6.2.
3. **The three gates read three different env vars**, none of them the one being
   set — so runs reported as "verified against production" had measured
   localhost. All three take `SITE_BASE` now. See `HANDOVER.md` §4.1.

And CI, which had never been run: red on every push since the repo was created.
Lint errors on the verbatim 3D scene ports (exempted for that directory, with
the reason recorded) and on a legitimate `set-state-in-effect` in
`cookie-consent.tsx`; plus a Release workflow publishing a GHCR image nothing
consumes, which is removed.

**Open:** no custom domain on any service; the repo is private; and no page has
had the two-reviewer editorial pass (D2, ≥90) — the mechanical gates are green,
the editorial grade has never been run.
