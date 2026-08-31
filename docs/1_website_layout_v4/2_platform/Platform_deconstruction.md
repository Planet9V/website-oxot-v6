# PAGE_RECONSTRUCTION_SPEC.md — `/cdt-2` (OXOT Cyber Digital Twin, comparison build)

**Source examined:** `http://localhost:3000/en/cdt-2` (dev container), plus full source of every component it renders: `src/app/[locale]/cdt-2/page.tsx`, `src/components/cdt2/{primitives,Cdt2Hero,Cdt2Decisions,Cdt2Investment,Cdt2Test,Cdt2Risk,Cdt2External,Cdt2Engine,Cdt2Model,Cdt2Services,Cdt2Deployment,Cdt2Faq,Cdt2Origin,content-1,content-2}.tsx/.ts`, `src/components/shell/reveal.tsx`, `src/app/globals.css`. Every claim below is labeled:

- **OBSERVED** — confirmed directly, either by reading the source that produces it or by inspecting the live rendered page (screenshot, DOM query, console, accessibility tree).
- **INFERRED** — not directly confirmed, but a necessary consequence of OBSERVED facts (e.g. a CSS rule's effect at a viewport width not screenshotted).
- **RECOMMENDED** — this reconstruction spec's own suggestion, not a property of the current page.
- **UNKNOWN** — could not be established from source or live inspection; flagged rather than guessed.

This is a specification, not code. No implementation is included.

---

## 0. What this page is (OBSERVED, from page.tsx's own doc comment)

`/cdt-2` is an explicit **comparison build** standing beside the live `/twin` page, "so the two can be compared before either is preferred" — not currently a replacement, not currently linked from anywhere outside the site's own top-level nav. It renders a fixed dark palette regardless of the site's light/dark toggle, has no NL translation yet (EN-only, page-local content in `src/components/cdt2/content-{1,2}.ts`, not routed through the i18n dictionary), and reuses the site's real global container/typography classes (`.oxot-canvas`, `.h-page`…`.h-micro`) rather than inventing new ones.

Route metadata (OBSERVED, `page.tsx`):
- `<title>`: "Cyber Digital Twin (v2) — Before you change and spend, replicate your plant | OXOT"
- `<meta description>`: "A rebuild of the Cyber Digital Twin pillar page, reordered around the decisions it makes answerable — what to fix, what to spend, what to test and what to leave alone — before the engine underneath. Comparison build; see /twin for the live page."

---

## 1. Page order and content hierarchy (OBSERVED, `page.tsx`)

Twenty section components render in this exact sequence inside one `<main>`:

| # | Component | Anchor `id` | Band tone | H2 (or equivalent) |
|---|---|---|---|---|
| 1 | `Cdt2Hero` | `top` | — (own bg) | *(h1, not h2 — see §2)* |
| 2 | `Cdt2WhyItExists` | — | base | "Industrial environments were not built for today's cyber reality." |
| 3 | `Cdt2Decision01` | `decide` | surface | "Three answers, and the discipline to use the third." |
| 4 | `Cdt2WhatChanges` | — | base | "Four people stop arguing about the same document." |
| 5 | `Cdt2Investment` | `invest` | surface | "Spend does not buy risk reduction in a straight line." |
| 6 | `Cdt2Test` | `test` | base | "Buy the control after you have watched it work." |
| 7 | `Cdt2Risk` | `risk` | surface | "Consequence, then probability, then price." |
| 8 | `Cdt2WorkedExample` | — | base | "One controller, all the way through." |
| 9 | `Cdt2External` | — | surface | "Risk does not stop at the fence line." |
| 10 | `Cdt2EngineIntro` | `engine` | base | "You cannot defend what you have never modelled." |
| 11 | `Cdt2EngineIecNative` | — | surface | "Everything we build is IEC 62443 native." |
| 12 | `Cdt2EngineWhatItIs` | — | base | "A plant you can attack without consequences." |
| 13 | `Cdt2EngineDifferent` | — | surface | "Most twins are built to make a plant faster. Ours is built to keep it running." |
| 14 | `Cdt2Model` | `model` | base | "Seven layers, built from the ground up." |
| 15 | `Cdt2Lenses` | — | surface | "Every group reads the plant in its own language." |
| 16 | `Cdt2Services` | `services` | base | "Six consulting services." |
| 17 | `Cdt2Deployment` | — | surface | "Three ways to run it, all passive-first." |
| 18 | `Cdt2Faq` | `faq` | base | "The questions engineers ask first." |
| 19 | `Cdt2Origin` | — | surface | *(two h3s, no h2 — "Built under deal pressure…" / "A Dutch OT cybersecurity company.")* |
| 20 | `Cdt2WhereWeWork` | — | base | "The industries that cannot afford to stop." |

**OBSERVED**, `primitives.tsx`'s `Band`: tone alternates `base`→`surface`→`base`… strictly by call order, which is why the table above alternates perfectly except where two components share one visual band without a `Band` wrapper between them (none do here — every row above is its own `<section>`).

**OBSERVED**, nav: the real `SiteHeader`'s "CDT-2" primary-nav item is a dropdown with 7 children, each linking to one of the anchors above: Decisions (`#decide`), Investment (`#invest`), Test first (`#test`), Risk (`#risk`), The engine (`#engine`), Services (`#services`), FAQ (`#faq`). Confirmed live by opening the dropdown — exact 7 labels, exact order, matches `shell/nav.ts`'s `cdt2` entry.

**INFERRED**: sections 8, 11–13, 15, 17, 19–20 have no anchor `id` and are therefore unreachable from the nav dropdown or any direct link — they're only reached by scrolling. Whether that's intentional (only "decision-stage" sections get nav entries) or an oversight is **UNKNOWN**; the pattern is at least consistent (every anchored section corresponds to a nav-dropdown child, and no anchored section is missing from the dropdown).

---

## 2. Section-by-section detail

### 2.1 Hero (`Cdt2Hero.tsx`, section `id="top"`)

- **Layout (OBSERVED):** two-column grid (`md:grid-cols-2`, `md:items-center`) — left: eyebrow/h1/subline/lead/CTAs; right: one `next/image`. Below that, full-width, a second `.oxot-canvas` block: eyebrow + a 4-column card strip (`sm:grid-cols-2 lg:grid-cols-4`).
- **Semantic HTML (OBSERVED):** `<section id="top">` → eyebrow is a `<div class="oxot-kicker">` (not a heading) → `<h1>` (bare, no size class — see §4) → `<p>` subline → two `<p>` lead paragraphs → two `<a>` CTAs → `<Image>` → second eyebrow `<div>` → 4× `<div>` cards each with `<h3 class="h-micro">` + `<p>`.
- **Copy (OBSERVED, `content-1.ts` → `HERO`):**
  - Eyebrow: "OXOT Cyber Digital Twin"
  - H1: "Before you change and spend, replicate your plant."
  - Subline (accent-colored): "OXOT powers better OT security decisions."
  - Lead paragraph 1: "We build a working replica of your plant from the engineering documents you already hold, then test attacks and changes against the replica instead of the real thing."
  - Lead paragraph 2: "What you buy is not the model. What you buy is the ability to decide — with evidence — what to fix, what to spend and what to leave alone."
  - Primary CTA label: "Talk to OX". Secondary CTA label: "Read the product sheet".
  - Card-strip eyebrow: "Four decisions this makes answerable". Four cards — "What do we fix first?" / "What should we spend?" / "Can we change this safely?" / "What can we ignore?" (this fourth card alone is accent-colored, `accent: true` in the data).
- **⚠ CRITICAL DEFECT (OBSERVED):** both hero CTAs (`Cdt2Hero.tsx` lines 25 and 28) have `href="#top"` — i.e. both buttons link to the top of the page they're already on. Neither goes to `/contact` (a real route) nor to any product-sheet destination. This is **not** a rendering issue; it's the literal `href` in source. Given the page's own doc comment says it's "not meant to be in production… no links yet," this reads as an intentional, temporary placeholder rather than a bug — but it is the single highest-priority open item before this page could ever go live, since it's the very first interactive element a visitor reaches.
- **Image (OBSERVED):** `/images/cdt2/hero-two-pane.png`, alt text "Engineering wireframe of a plant on the left resolving into cyber-analytics dashboards on the right", `next/image` with `priority`, declared `width={2048} height={2048}`, actual served/rendered size at time of inspection was 584×584 CSS px (browser-computed via `next/image`'s responsive `sizes="(min-width: 768px) 50vw, 100vw"`). Confirmed loaded (`img.complete === true`, `naturalWidth/Height` populated) and confirmed visually correct via a zoomed screenshot — an orange-line wireframe factory model on the left resolving into dashboard panels on the right, on transparent/black. A full-page screenshot tool made this region look empty at low resolution; that is a screenshot-tool artifact, not a page defect (see §9).
- **File size (OBSERVED):** the source PNG on disk is 3.8 MB (`public/images/cdt2/hero-two-pane.png`). Next's image pipeline optimizes what's actually served, but the uncompressed source is large relative to the other four page images (which range ~0.8–3.7 MB). **RECOMMENDED:** re-export at a smaller source resolution/better compression before this page is a launch candidate — 2048×2048 source for a ~584px rendered element is more headroom than this hero needs.

### 2.2 Why it exists (`Cdt2WhyItExists`, no anchor)

Two-column (`md:grid-cols-2`): left = eyebrow + `H2` + 2 body paragraphs + an accent-left-bordered callout (`"The challenge is therefore not simply finding security issues." / "It is knowing what matters most, what can safely be changed, and what to do first."`); right = a bordered panel with an intro line, a 6-item bulleted list (identify/assess risk, test scenarios, understand dependencies, recommend/prioritise controls, compare investment options, support compliance with named regimes), and an italic closing line. **OBSERVED** — full copy captured in `content-1.ts`'s `WHY_IT_EXISTS`.

### 2.3 Decision 01 (`Cdt2Decision01`, `id="decide"`)

Eyebrow "Decision 01 · Know what matters", `H2` "Three answers, and the discipline to use the third.", 2 intro paragraphs side by side (`md:grid-cols-2`), then a 3-card `CardGrid` (NOW/NEXT/NEVER — the NOW label is white, the other two labels are default), then a 2-column footer block ("What it produces" — 3 named items; "Compliance is a by-product" — intro + 4-item 2×2 grid mapping IEC 62443/TS 50701, NIS2, Cyber Resilience Act, AI Act/Machine Act to what each produces). **OBSERVED**, full copy in `content-1.ts`'s `DECISION_01`.

### 2.4 What changes, and for whom (`Cdt2WhatChanges`, no anchor)

Asymmetric grid (`lg:grid-cols-[.55fr_1fr]`): left = eyebrow + `H2`; right = a 4-card grid, one card per stakeholder (The board / Engineering / Procurement / Audit and insurers — the last is accent-colored). **OBSERVED**, `content-1.ts`'s `WHAT_CHANGES`.

### 2.5 Investment (`Cdt2Investment`, `id="invest"`)

Eyebrow "Decision 02 · Investment", `H2` "Spend does not buy risk reduction in a straight line.", one intro paragraph capped `max-w-3xl`, then a two-column panel (image right, "the tail is priced separately" text + a black-bordered callout "Survive first. Optimise second." left) on its own dark inset background, then a 3-card grid ("A bounded number" / "Comparable options" / "A roadmap that orders itself"). **OBSERVED**, image `/images/cdt2/investment-s-curves.png`.

### 2.6 Test first (`Cdt2Test`, `id="test"`)

Two-column (`lg:grid-cols-2`): left = eyebrow + `H2` "Buy the control after you have watched it work." + 2 paragraphs + a 3-card grid (Capital purchases / Configuration changes / Drift and accidents) + an italic closing line; right = one image (`/images/cdt2/whatif-control-stack.png`, alt "Layered what-if control experiment"). **OBSERVED**, `content-1.ts`'s `DECISION_03_TEST`.

### 2.7 Risk (`Cdt2Risk`, `id="risk"`)

The densest section on the page. Eyebrow "Why the answers hold", `H2` "Consequence, then probability, then price.", intro paragraph, a 4-card `01–04` step grid (Consequence → Pathway → Probability → Financial impact), then a 2-column block: left "Loss is engineered, not estimated" with a 5-row acronym list (FMECA/RCIL/SCIL/MOR/Hazlog), right "Exploitability" with a 2×2 grid of KEV/EPSS/CVSS/MITRE ATT&CK cards, then a full-width "Five bills of materials" strip (SBOM/HBOM/CBOM/SaaS-BOM/Ops-BOM, `sm:grid-cols-5`) with a closing paragraph about CycloneDX and transitive dependencies. **OBSERVED**, `content-1.ts`'s `WHY_ANSWERS_HOLD`.

### 2.8 Worked example (`Cdt2WorkedExample`, no anchor)

Eyebrow "A worked example" with an "Illustrative" pill badge beside it, `H2` "One controller, all the way through.", intro (a dosing controller with a known-exploited firmware flaw), then a 4-card stage grid: CONSEQUENCE → PATHWAY → PROBABILITY → DECISION (the DECISION card alone is accent-styled, ending "NOW — and the what-if run shows brokering the vendor route closes it for a fraction of the cost of replacing the controller."). **OBSERVED**. No image — page.tsx's own doc comment explains this is deliberate: the two candidate images both bake an unverified "Verified: NN% reduction" figure into non-editable image text, flagged in prior discovery work as illustrative rather than customer data, so the section ships text-only rather than with a misleading number.

### 2.9 External pressure (`Cdt2External`, no anchor)

Asymmetric (`md:grid-cols-[.62fr_1fr]`): left = eyebrow + `H2` "Risk does not stop at the fence line." + 2 paragraphs about "WorldMonitor" tracking geopolitical/economic/military/environmental pressure across "nine specialised domains"; right = one image (`/images/cdt2/worldmonitor.png`). Below: a 9-item domain-name grid (News & geopolitics … Nuclear & strategic facilities), then a 2-panel block ("Country and knock-on effects" — 4 items; "Who is coming, and with what" — 2 items, ATQ and TACAM, plus a "dimensions" footnote line unique to this panel), then an italic closing line. **OBSERVED**, `content-2.ts`'s `EXTERNAL_PRESSURE`.

### 2.10–2.13 The engine, four sub-sections

- **2.10 `Cdt2EngineIntro` (`id="engine"`):** eyebrow "How this is possible · the engine", `H2` "You cannot defend what you have never modelled.", a lead line + a sub line, then a 4-card `01–04` grid: Engineering-accurate facility model / What-if scenario simulation / Safety-reliability-cyber convergence / Capital investment prioritisation.
- **2.11 `Cdt2EngineIecNative` (no anchor):** "Everything we build is IEC 62443 native." + intro paragraph + 3-card grid (Zones and conduits / Security levels / Attribution).
- **2.12 `Cdt2EngineWhatItIs` (no anchor):** "A plant you can attack without consequences." + 3 paragraphs, then a 2-column contrast block: "It is not" (5 items, neutral styling) vs "It is" (5 items, accent-bordered box, bold text).
- **2.13 `Cdt2EngineDifferent` (no anchor):** "Most twins are built to make a plant faster. Ours is built to keep it running." — a 2-column compare card (Traditional digital twin vs OXOT Cyber Digital Twin, the latter accent-labeled), then a 2-panel footer ("Built for OT, not adapted from IT." / "Safety and reliability are in the model, not the appendix.").

All **OBSERVED**, `content-2.ts`'s `ENGINE_INTRO` / `ENGINE_IEC_NATIVE` / `ENGINE_WHAT_IT_IS` / `ENGINE_DIFFERENT`.

### 2.14 The model (`Cdt2Model`, `id="model"`)

**OBSERVED** — the most structurally bespoke section on the page (flagged as such in its own code comment: "the most bespoke layout on the page"). Two-column (`lg:grid-cols-2`): left = eyebrow + `H2` "Seven layers, built from the ground up." + 2 paragraphs + one image (`/images/cdt2/model-architecture.png`) + a 2-column "in/out" footer (Engineering data in / One unified BOM out). Right = a "the seven layers" header with a "read from the bottom up" sub-label, then **four grouped "movements"** (Decide → Interpret → Connect → Ground), each a labeled spine-row containing 1–2 layer cards (L7 alone under Decide; L6+L5 under Interpret; L4+L3 under Connect; L2+L1 under Ground), each layer card showing a code (L1–L7), name, sub-label and a contents line. Closes with a note that "Layer one is not a firewall."

### 2.15 One model, many lenses (`Cdt2Lenses`, no anchor)

Header row (`.66fr_1.34fr`): eyebrow + `H2` "Every group reads the plant in its own language." beside an intro paragraph. Body: asymmetric two-panel (`1.32fr_.68fr`) — left a 5-column strip (P&ID / Purdue / Network / Graph / 3D, each a named lens with one line of description), right a "drill down, roll up" panel showing a 5-step path (component → equipment → line → facility → organization) with arrow separators plus explanatory text. **OBSERVED**, `content-2.ts`'s `ENGINE_LENSES`.

### 2.16 Consulting Services (`Cdt2Services`, `id="services"`)

**OBSERVED — the page's only genuinely interactive component**, and (per this session's own recent work) the same component reused verbatim on `/home-2`. Client component (`"use client"`). Header: eyebrow "OXOT Consulting Services", `H2` "Six consulting services.", intro paragraph. Body: a `1/2/3`-column responsive grid (`sm:grid-cols-2 lg:grid-cols-3`) of 6 cards (OT Security Assessments / OT Security Programmes / Architecture & Segmentation / Secure Remote Access / OT Security Baseline / Capability Transfer). Each closed card shows a number, a `+` toggle icon, a title, a 3-line-clamped quote, and a "What this involves" label. Clicking a card:
- Expands it to `sm:col-span-2 lg:col-span-3` (full row width), in place, via CSS grid reflow (no manual DOM reordering).
- Rotates the `+` icon 45° (becomes a visual "×").
- Reveals a two-column detail panel: an "At a glance" definition list (Scope / Runs for / Basis / How we work / What you get) on the left, 2–3 body paragraphs on the right.
- Height transition is CSS-only (`grid-template-rows: 0fr → 1fr`), 300ms.
- Only one card can be open at a time (`openId` state); opening a second closes the first.
- Full keyboard support for free: each card's disclosure is a native `<button>` with `aria-expanded`/`aria-controls`, not a `<div onClick>`.

**OBSERVED, live-tested this session** (identical component, tested on `/home-2`): click-to-expand works correctly, animates smoothly, no console errors.

### 2.17 Deployment (`Cdt2Deployment`, no anchor)

Eyebrow "Deployment", `H2` "Three ways to run it, all passive-first.", intro line ("No agents on your controllers and no active scanning… in any configuration."), then a 3-card `01–03` grid (Island mode / One-way data diode / Dedicated instance), then a 2-column footer: "Integrations" (intro + a 4-item 2×2 grid: Asset management / Historians / Network monitoring / Service management) and "Engagement" (intro + 2 named engagement models: Transient / Long-term operations). **OBSERVED**, `content-2.ts`'s `DEPLOYMENT`.

### 2.18 FAQ (`Cdt2Faq`, `id="faq"`)

Header row (`.66fr_1.34fr`) matching §2.15's pattern. Body: a `md:grid-cols-2` grid of 8 Q&A cards (each a bordered panel, question as `<h3>`, answer as `<p>`). Closing line with a `mailto:info@oxot.nl` link (styled inline, accent color). **OBSERVED, notable technical detail:** this component emits a `<script type="application/ld+json">` FAQPage structured-data block, generated from the same 8 Q&A pairs at render time — the component's own comment cites this as following the spec's flag that `#faq` is "a strong candidate for FAQPage structured data." This is the only structured-data emission found anywhere on the page.

### 2.19 Origin (`Cdt2Origin`, no anchor)

Two-column (`md:grid-cols-2`), no shared `H2` — each side has its own eyebrow + `<h3>` instead: left "Where it came from" / "Built under deal pressure, for industries that cannot afford to stop." (2 paragraphs about the CDT's origin in M&A due-diligence work, naming "the OXOT Seldon Engine"); right "Who builds it" / "A Dutch OT cybersecurity company." (1 paragraph + an accent-bordered grant callout: "Co-invested by the Dutch government" / CIF-NL 2025, European Cybersecurity Competence Centre). **OBSERVED**, `content-2.ts`'s `ORIGIN`.

### 2.20 Where we work (`Cdt2WhereWeWork`, no anchor)

Header row (`.66fr_1.34fr`) matching §2.15/§2.18's pattern — eyebrow + `H2` "The industries that cannot afford to stop." beside an intro line. Body: a 4-column industry grid (Manufacturing / Water / Energy / Transportation), each with a one-line consequence statement. **OBSERVED**, `content-2.ts`'s `WHERE_WE_WORK`. This is the page's final section — no closing CTA band, no "Talk to OX" repeat, no `ThreeDoors`-equivalent close.

**RECOMMENDED flag:** the page ends on an industry list with no final call to action. Every other real page on the site that this session touched (`/case-studies`, `/insights`, `/company`, etc.) closes with the site's shared `ThreeDoors` + `ContactBand` pattern. `/cdt-2` currently has neither — a visitor who reads to the bottom has nowhere obvious to go next except scrolling back up. **UNKNOWN** whether this is deliberate (comparison build, not meant to route anywhere yet) or an oversight; page.tsx's doc comments don't address it either way.

---

## 3. Layout and grid system

- **Page container (OBSERVED, `primitives.tsx`'s `Band` + `globals.css`):** every section's content sits inside `.oxot-canvas` — `width: 100%; max-width: 80rem (1280px); margin-inline: auto; padding-inline: 1rem` at <640px, `1.5rem` at ≥640px, `2rem` at ≥1024px. This is the site's real, shared container class (same one the header/footer use), not a page-local invention.
- **Vertical rhythm (OBSERVED):** every `Band`-wrapped section is `py-16 md:py-20` (64px mobile / 80px ≥768px) with a `border-b border-white/[0.07]` hairline separating it from the next section. The hero (§2.1) does not use `Band` and instead sets its own `py-16 md:py-24`.
- **Tone alternation (OBSERVED):** `Band tone="base"` = `#060708`; `tone="surface"` = `#0a0c0e` — a ~2% luminance step, visually a very subtle banding rather than a strong light/dark contrast. Confirmed to alternate strictly section-by-section per §1's table.
- **Grid patterns actually used (OBSERVED, catalogued across all 20 sections):** `md:grid-cols-2` (most common, roughly half of two-column sections), `lg:grid-cols-[.55fr_1fr]` / `lg:grid-cols-[.62fr_1fr]` / `.66fr_1.34fr` (asymmetric header-beside-copy pattern, used identically in §2.15, §2.18, §2.20 — this is a repeated, reusable layout idiom, not three separate inventions), `sm:grid-cols-2 lg:grid-cols-4` and `sm:grid-cols-3` (the two card-grid column counts used throughout), `sm:grid-cols-5` (used once, §2.7's bills-of-materials strip).
- **`CardGrid` primitive (OBSERVED, `primitives.tsx`):** a 1px-gap grid over a `HAIRLINE` (`rgba(255,255,255,.09)`) background, so the gaps between cards read as thin rules rather than empty space — used for every multi-card block on the page except the hero's own decision-strip (which reimplements the same visual pattern locally rather than reusing `CardGrid`, an **OBSERVED minor inconsistency** — no functional difference, but two code paths produce the same visual result).

---

## 4. Typography

All values **OBSERVED** in `globals.css` (site-global, not page-local) and confirmed applied via `primitives.tsx`.

| Token/class | Font | Size | Weight | Line-height | Letter-spacing | Used for |
|---|---|---|---|---|---|---|
| bare `<h1>` | `--font-display` (Newsreader serif) | 1.875rem → 2.25rem at ≥640px | 400 | 1.15 | default | Hero h1 only (§2.1) — no explicit class, inherits the sitewide base-layer rule |
| `.h-section` (`H2` primitive) | `--font-display` | 1.875rem, flat (no responsive step) | 700 | 1.18 | -0.025em | Every section's `<h2>` |
| `.h-sub` | `--font-display` | 1.5rem | 700 | 1.25 | -0.025em | Not used on this page (site-wide token, unused here) |
| `.h-card` | `--font-display` | 1.25rem | 700 | 1.3 | -0.025em | A handful of sub-headings (e.g. §2.5's callout lead, §2.7's "engineered"/"exploitability" h3s) |
| `.h-micro` | `--font-display` | 1rem | 700 | 1.4 | -0.025em | The most common card-title size on the page — used in nearly every `Card`/grid-item title |
| `.oxot-kicker` (`Eyebrow` primitive) | `--font-sans` (Instrument Sans) | 0.75rem | 600 | default | 0.18em, uppercase | Every section eyebrow — color overridden to the fixed `ACCENT` via inline style (see §5) |
| Body copy | `--font-sans` inline `font-sans` utility classes | Ad hoc per paragraph: `text-[13px]` through `text-[16px]`, most commonly `text-[15px]` at `leading-[1.72]` | 400 (default) unless a `font-serif font-semibold` label | varies | default | Paragraphs throughout |

**INFERRED:** because `.h-section` has no responsive step (unlike the base `h1`/`h2` rules and `.h-page`), every section heading on this page renders at a flat 1.875rem (30px) from the smallest to the largest viewport — confirmed consistent with the 390px and 1456px screenshots taken (heading proportions look the same relative to body text at both).

**OBSERVED, body-copy sizing is not systematized:** individual paragraphs across the 20 sections use a wide range of ad hoc pixel sizes (`text-[10.5px]` up to `text-[16px]`) and opacities (`text-white/62`, `/68`, `/70`, `/74`, `/75`, `/82`, `/85`) rather than a small fixed set of body-text roles. **RECOMMENDED:** this is the single largest typography-consistency gap on the page — a reconstruction should consolidate this into 3–4 named body-text roles (e.g. "lead," "body," "caption," "label") rather than preserving the ad hoc set, unless matching the current page pixel-for-pixel is the explicit goal.

---

## 5. Color tokens

All **OBSERVED**, `primitives.tsx`:

| Name | Value | Use |
|---|---|---|
| `BG_BASE` | `#060708` | Page `<main>` background; `Band tone="base"` |
| `BG_SURFACE` | `#0a0c0e` | `Band tone="surface"`; most card backgrounds |
| `ACCENT` | `#ff7a1a` | Eyebrows, the one accent-labeled item per multi-item list, primary CTA fill, selection color (`selection:bg-[#ff7a1a]`) |
| `HAIRLINE` | `rgba(255,255,255,.09)` | Grid-gap backgrounds, card borders |
| Body text | `#f2f4f7` at various opacities (`/62` through `/85`, plus bare white) | All copy |

**OBSERVED, this palette is fixed and does not respond to the site's light/dark toggle** — the toggle button is visible in the header (it's the real global `SiteHeader`) but has no visible effect on this page's content, only on the header/footer chrome around it. `page.tsx`'s doc comment confirms this is intentional, citing `/iec-62443` as the precedent for a "permanently-dark showcase" page.

**RECOMMENDED, accessibility note tied to color:** the `Eyebrow` primitive's own code comment states it deliberately overrides `.oxot-kicker`'s theme-reactive color token because "this page runs a fixed palette regardless of the light/dark toggle" — worth an explicit contrast check of `#ff7a1a` eyebrow text against both `#060708` and `#0a0c0e` before this ships (not verified as part of this pass — see §8's UNKNOWN item).

---

## 6. Spacing

**OBSERVED**, consistent scale used throughout (Tailwind's default rem scale, no custom spacing tokens found):
- Section vertical padding: `py-16` (64px) mobile, `md:py-20` (80px) ≥768px.
- Section-internal block gaps: predominantly `mt-4`, `mt-6`, `mt-8`, `mt-10` (16/24/32/40px) between a heading/intro and its following content block.
- Grid gaps: `gap-6` through `gap-14` for major two-column splits (varies per section, no single fixed value), `gap-px` (1px) specifically for the hairline `CardGrid` pattern.
- Card internal padding: `p-6` (24px) is the dominant value; a few larger panels use `p-8`/`p-10`.

No spacing values outside a small, consistent rem-based set were found — **INFERRED** this reflects disciplined use of Tailwind's default scale rather than one-off pixel values (unlike the typography sizing noted in §4, which does use one-off pixel values extensively).

---

## 7. Components (reusable primitives, `primitives.tsx`)

All **OBSERVED**:

1. **`Eyebrow`** — the section-label pattern, described in §4.
2. **`Band`** — the section wrapper: `id`, `tone` (`"base"|"surface"`), full-width colored `<section>` containing one `.oxot-canvas` div. This is the structural backbone of every section except the hero.
3. **`H2`** — a one-line wrapper for `<h2 class="h-section text-white">`.
4. **`CardGrid`** — the 1px-hairline-gap grid container described in §3.
5. **`Card`** — `p-6` padded cell, `BG_SURFACE` background, a 300ms `hover:` box-shadow glow (`inset 0 0 0 1px rgba(255,122,26,.35), 0 8px 24px -8px rgba(255,122,26,.25)`) instead of a translateY lift — the component's own comment explains this is deliberate, to avoid clipping when a top-row card inside `CardGrid`'s `overflow-hidden` boundary would otherwise be lifted out of frame. Accepts an optional `accent` prop that recolors its text to `ACCENT`.
6. **`Reveal`** (`shell/reveal.tsx`, shared site-wide, not CDT-2-specific) — scroll-triggered entrance animation. **Transform-only, never opacity** (10px `translateY` → `none`, 300ms, `--ease-brand` cubic-bezier), fires once via `IntersectionObserver` then disconnects, degrades to "show immediately" if `IntersectionObserver` is unavailable, and is fully inert under `prefers-reduced-motion` via a global CSS override rather than JS branching. Used to wrap most (not all) major content blocks per section — coverage is not 100% consistent (some sections wrap their card grid in `Reveal`, others wrap the whole section body, a few don't use it at all — e.g. §2.19 Origin wraps its entire two-column body in one `Reveal`, while §2.16 Services wraps only the card grid, not the header).

No component library beyond these six plus `next/image` and `next/link`(not used directly on this page — the hero's `href="#top"` links and the FAQ's `mailto:` link are plain `<a>` tags) was found in use.

---

## 8. Interactions

**OBSERVED:**
- `Cdt2Services`' card expand/collapse (§2.16) — the only stateful interaction on the page.
- The real `SiteHeader`'s nav dropdowns (Consulting, Company, CDT-2) — inherited chrome, not page-specific, confirmed working (CDT-2's dropdown opened correctly, showed exactly 7 items).
- `Reveal`'s scroll-triggered animations across most sections.
- Hover states: `Card`'s shadow glow (§7.5), `.cta-lift`'s 150ms `translateY(-2px)` + shadow on the hero's two CTA buttons (`globals.css` — this same hover treatment exists whether or not the CTA's destination is real, so it fires correctly on the hero buttons despite their `href="#top"` defect noted in §2.1).

**UNKNOWN / not tested this pass:** focus-visible states beyond what `.cta-lift` and the `Services` card buttons declare in source; screen-reader announcement behavior for the `Services` card expand (it has correct `aria-expanded`/`aria-controls` wiring per source, but was not tested with an actual screen reader); keyboard-only navigation through the FAQ grid and the seven-layer stack (no source evidence of any non-native interactive pattern in either, so **INFERRED** to be standard tab order, but not directly confirmed).

---

## 9. Desktop / mobile behavior

**OBSERVED, desktop (1456×828 and 1351×768 viewports):** page renders as described throughout §2, no horizontal overflow, all six images load and render correctly, 0 console errors on load.

**OBSERVED, mobile (390×844 viewport) — one significant cross-cutting defect:** the real `SiteHeader` does not collapse into a hamburger/compact mobile menu at this width. Instead the full desktop nav bar (logo, 6 primary items with 3 dropdown chevrons, theme toggle, "Talk to OX" button, EN/NL switch) renders at full size and wraps awkwardly across multiple lines — "Cyber Digital Twin" wraps to 3 lines, "Home-2" wraps mid-word to "Home / -2" — consuming roughly 140px of vertical space before any page content is visible. **This is confirmed NOT specific to `/cdt-2`** — the same defect was independently confirmed on the live, real `/twin` page at the identical viewport width, so it is a `SiteHeader` component issue inherited by every page on the site, not something introduced by this comparison build. Flagged here because a reconstruction spec for this page's mobile behavior would otherwise misattribute it.

**INFERRED (not directly screenshotted at 390px below the header):** given every section below the hero uses the same `.oxot-canvas` responsive padding and standard Tailwind grid breakpoints (`sm:`/`md:`/`lg:`), and given this session's `measure.mjs` gate (which checks 390/834/1440/2560px for horizontal overflow) has passed clean on this route repeatedly earlier in the session, section content itself is expected to stack cleanly to single-column below their respective breakpoints without overflow — but this was not re-screenshotted section-by-section in this pass, so treat as inferred, not directly observed, for anything past the hero.

**UNKNOWN:** tablet-width (768–1023px) behavior was not screenshotted in this pass — several sections have `md:` breakpoints that land inside this range and were not visually spot-checked there.

---

## 10. Accessibility

**OBSERVED:**
- Console: 0 errors on page load.
- Heading structure: one `<h1>` (hero only), `<h2>` per major section per §1's table, `<h3>` for sub-headings within sections — no skipped levels found in the sections read (e.g. no `<h4>` appearing without an `<h3>` ancestor in the same section).
- The `Services` interactive card correctly uses a native `<button>` with `aria-expanded`/`aria-controls` per card (§2.16) — confirmed in source, not re-tested with assistive tech this pass.
- Images carry descriptive `alt` text in every case checked (hero, test, external-pressure, model images) — not empty, not filename-derived.
- FAQ section emits real FAQPage JSON-LD structured data (§2.18) — a genuine SEO/accessibility-adjacent win not present elsewhere on the page.

**UNKNOWN (flagged, not fabricated):**
- Color-contrast ratios for the fixed `ACCENT` (`#ff7a1a`) eyebrow text and the various `white/62`–`white/85` body-text opacities against both `BG_BASE` and `BG_SURFACE` — not measured in this pass (this session's `measure.mjs` gate does check text contrast site-wide and has passed on this route in earlier runs this session, which is reassuring but is not the same as a fresh, targeted check against every opacity value cataloged in §4).
- Screen-reader behavior of the `Services` card's height-animated reveal.
- Whether the `#top`-only hero CTAs (§2.1) would confuse a screen-reader user announced as "link, Talk to OX" that goes nowhere useful — functionally this is the same defect flagged as a copy/product issue in §2.1, but it has an accessibility dimension too (a broken affordance is worse for a user who can't visually confirm nothing happened).

---

## 11. Assets

**OBSERVED**, all in `public/images/cdt2/`:

| File | Size on disk | Used by |
|---|---|---|
| `hero-two-pane.png` | 3.8 MB | §2.1 Hero |
| `investment-s-curves.png` | 785 KB | §2.5 Investment |
| `model-architecture.png` | 2.8 MB | §2.14 The Model |
| `whatif-control-stack.png` | 3.7 MB | §2.6 Test first |
| `worldmonitor.png` | 1.2 MB | §2.9 External pressure |
| `OXOT_Logo_Dark.png` | 6.4 KB | *(not referenced by any component read in this pass — likely used elsewhere, e.g. by the real header)* |

Six figures total per the page's own doc comment ("Six of seven figures resolve to the site's own standard image library… The seventh is deliberately NOT used"); five are confirmed here as the actual `<Image>` sources rendered by the 20 sections (§2.8's Worked Example deliberately ships with no image, as documented in §2.8).

**RECOMMENDED:** two of the five (`hero-two-pane.png` at 3.8 MB, `whatif-control-stack.png` at 3.7 MB) are large enough on disk to be worth re-export/compression review before launch, independent of whatever `next/image` optimization already happens at request time.

---

## 12. Acceptance criteria (for a from-scratch rebuild matching this page)

A reconstruction should be considered correct when:

1. All 20 sections in §1's table render in the documented order, with the documented anchor IDs present exactly where listed (and absent where listed — don't add IDs the current page doesn't have without a stated reason).
2. Band tone alternates `base`/`surface` exactly per §1's table (visually near-imperceptible on its own, but load-bearing for the "banding" effect across long scroll).
3. The nav dropdown for "CDT-2" contains exactly 7 items in the documented order, each scrolling to its matching anchor.
4. Typography matches §4's table exactly for headings; body copy may be consolidated per §4's recommendation, but if pixel-matching the current page is the goal, the ad hoc per-paragraph sizes must be preserved as cataloged.
5. `Services` (§2.16) reproduces the exact interaction contract: single-open-at-a-time, CSS grid-template-rows height animation, native button semantics, full-row expansion via grid reflow.
6. `Reveal` usage reproduces transform-only (never opacity) scroll entrance, fires once, and remains inert under `prefers-reduced-motion` — this is a hard site-wide constraint (see `reveal.tsx`'s own comment about the `measure.mjs` ghosting gate), not a stylistic preference specific to this page.
7. The hero CTA defect (§2.1) is either fixed (real destinations) or explicitly re-flagged as a known placeholder before any launch decision — not silently carried forward.
8. The missing closing CTA (§2.20's recommendation) is either addressed or explicitly decided against, not left unresolved by omission.
9. Mobile header wrapping (§9) is understood to be a `SiteHeader`-level fix, not something a `/cdt-2`-specific rebuild can or should try to patch locally.
10. Image assets are re-exported at sizes appropriate to their rendered dimensions (§11) if this becomes a production page rather than a comparison build.

---

## Summary of flagged items requiring a decision (not resolved in this spec)

- Both hero CTAs point at `#top` instead of real destinations (§2.1).
- No closing CTA / next-step band after the final section (§2.20).
- Body-copy typography is not consolidated into named roles — works, but is not a small reusable system the way headings are (§4).
- Color-contrast values for the fixed palette were not freshly measured in this pass (§10).
- Mobile nav wrapping is a real, confirmed defect — but it belongs to `SiteHeader`, not this page, and fixing it here would be the wrong scope (§9).
