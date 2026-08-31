# PAGE_RECONSTRUCTION_SPEC.md — `/home-2` (OXOT homepage, comparison build)

**Source examined:** `http://localhost:3000/en/home-2` (dev container), plus full source of every component it renders: `src/app/[locale]/home-2/page.tsx`, `src/components/home2/{Home2Hero,Home2FourDecisions,Home2Company,Home2TwoWaysIn,Home2Twin,Home2CaseStudies,Home2Partners,Home2Sectors,GraphLoop,content}.tsx/.ts`, the shared `src/components/cdt2/{primitives,Cdt2Services}.tsx` (reused directly, not duplicated), `src/components/shell/{reveal,site-header}.tsx`, `src/app/globals.css`. Same labeling discipline as the companion `/cdt-2` spec:

- **OBSERVED** — confirmed by reading the producing source or inspecting the live page (screenshot, DOM/JS query, console, accessibility tree).
- **INFERRED** — a necessary consequence of OBSERVED facts, not independently checked.
- **RECOMMENDED** — this spec's own suggestion, not a property of the current page.
- **UNKNOWN** — could not be established; flagged rather than guessed.

**One correction carried over from the companion spec:** an earlier pass at `/cdt-2` incorrectly reported that the site header fails to collapse into a mobile menu below 1024px, based on a `resize_window` call whose reported dimensions didn't match the page's actual rendered width. That was wrong — re-verified with `window.innerWidth` checked immediately before every screenshot in this pass, for both pages. See §9 below for the corrected mobile finding, established directly for `/home-2` this time, not inherited from the other spec.

This is a specification, not code. No implementation is included.

---

## 0. What this page is (OBSERVED, from `page.tsx`'s own doc comment)

`/home-2` is a **comparison build** standing beside the live `/` homepage — "so the two can be compared before either is preferred," the identical relationship `/cdt-2` has to `/twin`. Fixed dark palette (shared with `/cdt-2`, not reinvented), EN-only (page-local content in `src/components/home2/content.ts`, not routed through the i18n dictionary), reuses the site's real global container/typography classes. Unlike `/cdt-2` (whose only links are same-page anchors), this page links out to real site routes, so every internal link is threaded through `localePath(locale, …)`.

Two content decisions **OBSERVED in the doc comment, both dated 2026-08-22, owner-directed:**
- **Case Studies and Partners sections link to `/case-studies/<slug>`, `/case-studies` and `/collaboration`** exactly as the source design specified, even though (at the time those sections were built) those routes didn't yet exist — a deliberate choice, not an oversight. (`/case-studies` and its detail routes are now real, live routes as of this session; `/collaboration` remains not built.)
- **A Facility Due Diligence section and a condensed "Work we are regularly asked to run" services sidebar were removed**, and the Consulting Services section was replaced with the full `/cdt-2` services grid (`Cdt2Services`), reused directly rather than duplicated.

Route metadata (OBSERVED, `page.tsx`):
- `<title>`: "OXOT — Dutch OT cybersecurity | See your OT environment, understand the risk, know what to do next"
- `<meta description>`: "OXOT builds a working model of your plant from the engineering documents you already hold, then attacks it, changes it and prices it — so the answer arrives as work your team can start on Monday and a number your board can sign. Comparison build; see / for the live homepage."

---

## 1. Page order and content hierarchy (OBSERVED, `page.tsx`)

Nine sections, in this exact order, inside one `<main>`:

| # | Component | Anchor `id` | Band tone | Heading |
|---|---|---|---|---|
| 1 | `Home2Hero` | — (own bg, not `Band`) | — | *(h1 — see §2.1)* |
| 2 | `Home2FourDecisions` | — | surface | *(no h2 — a 2×2 card grid with no section heading of its own; see §2.2)* |
| 3 | `Home2Company` | `company` | surface | "The full picture of your OT risk — and where your next euro reduces it most." |
| 4 | `Home2TwoWaysIn` | — | base | "A model, and the engineers who use it." |
| 5 | `Home2Twin` | `twin` | surface | "You cannot defend what you have never **modelled**." (accent on "modelled") |
| 6 | `Cdt2Services` (shared with `/cdt-2`, `tone="surface"` passed explicitly) | `services` | surface | "Six consulting services." |
| 7 | `Home2CaseStudies` | `cases` | base | "Work we have actually done." |
| 8 | `Home2Partners` | `partners` | surface | "Nobody secures a plant alone." |
| 9 | `Home2Sectors` | `sectors` | base | "The industries that cannot afford to stop." |

**OBSERVED, tone alternation:** surface→surface (sections 2→3, back-to-back) is the one place this page does *not* strictly alternate — sections 2 and 3 are both `tone="surface"` with no `base` band between them. Every other adjacent pair alternates correctly, including across the `Cdt2Services` insertion point (§6 surface, following §5 surface — also non-alternating; the page's own doc comment explains this was a deliberate `tone="surface"` override specifically to keep §6→§7 (surface→base) alternating correctly against `Home2CaseStudies`'s fixed `tone="base"`, at the cost of the §5→§6 boundary).

**OBSERVED, no page-local closing CTA:** the doc comment explicitly states this is intentional — the design's own closing "Talk to OX" section was dropped because the site's global `ContactBand` (rendered on every route, right before the footer) already carries the identical ask. This is the opposite of `/cdt-2`'s gap (§2.20 of the companion spec, which has neither a page-local nor an inherited closing CTA) — `/home-2` gets one for free from the shared layout.

**OBSERVED, only 5 of 9 sections have anchor IDs** (`company`, `twin`, `services`, `cases`, `partners`) — `sectors` also has one (`id="sectors"`, confirmed in `Home2Sectors.tsx`), so actually 6 of 9. The hero, Four Decisions, and Two Ways In have none. **UNKNOWN** whether any external or nav link targets these anchors — `/home-2` has no nav dropdown of its own (unlike `/cdt-2`'s 7-item "CDT-2" dropdown); it's a single flat "Home-2" nav item. So these anchor IDs currently exist without any confirmed consumer — **INFERRED** they exist either for future use or because they were carried over verbatim from the source Claude Design HTML, which is consistent with this page's own stated sourcing discipline.

---

## 2. Section-by-section detail

### 2.1 Hero (`Home2Hero.tsx`, no `Band` wrapper — bespoke markup)

- **Layout (OBSERVED):** not a `Band`-wrapped section — its own `<section>` with a relative-positioned canvas containing a full-bleed `GraphLoop` canvas animation (§7) behind a linear-gradient scrim, then an `.oxot-canvas` with a two-column asymmetric grid (`lg:grid-cols-[1.08fr_.92fr]`): left = eyebrow/h1/subhead/body/2 CTAs; right = one `next/image`. Below that, a 3-column stat strip separated by a top border.
- **Copy (OBSERVED, `content.ts`'s `HERO`):**
  - Eyebrow: "Dutch OT cybersecurity"
  - H1 (three separate `<span class="block">` lines, not one flowing sentence): "See your OT environment." / "Understand the risk." / "Know what to do next."
  - Subhead (accent, `.h-micro`): "For the industries that cannot afford to stop."
  - Body: "We build a working model of your plant from the engineering documents you already hold — then attack it, change it and price it, so the answer arrives as work your team can start on Monday and a number your board can sign."
  - Primary CTA: "Talk to OX" → `href="#contact-band"` (a plain `<a>`, same-page anchor to the global `ContactBand`'s own heading id — **not a placeholder**, unlike `/cdt-2`'s hero CTAs; this one has a real, working target).
  - Secondary CTA: "See the Cyber Digital Twin" → `Link` wrapped in `localePath(locale, "/twin")` — routes to the real, live twin page.
  - 3-item stat strip: `01 — SEE` "The plant as it actually is" / `02 — UNDERSTAND` "Consequence before severity" / `03 — DECIDE` "A queue, and permission to ignore" — each with a supporting sentence.
- **Image (OBSERVED):** `/images/home2/CDT_7_Box_Frame_Dark.png`, alt "The OXOT Cyber Digital Twin: seven stacked layers of a plant model, from facility physics at the base to governance at the top", `next/image` with `priority`, `style={{ mixBlendMode: "screen" }}` — deliberately screen-blended so the image's black background drops out against the section's own dark background (the same technique used in §2.2's curve image). Confirmed rendering correctly live: an isometric wireframe cube with 7 horizontal layer divisions, edge lines glowing orange, floating over the `GraphLoop` node field.
- **Contrast with `/cdt-2`'s hero:** both CTAs here have real destinations. `/cdt-2`'s hero (companion spec §2.1) has both CTAs pointing at `#top` — a defect this page does not share.

### 2.2 Four Decisions (`Home2FourDecisions.tsx`, no anchor)

- **Layout (OBSERVED):** asymmetric (`lg:grid-cols-[1.34fr_.66fr]`) — left: eyebrow + a `sm:grid-cols-2` `CardGrid` of 4 cards; right: one screen-blended image with a caption below it.
- **No section-level heading (OBSERVED):** unlike every other section, this one has only an `Eyebrow`, no `H2` — the 4 cards' own titles carry the section's argument instead. This is a genuine structural outlier worth flagging: every other section on this page (and every section on `/cdt-2`) pairs its eyebrow with an `H2`.
- **Copy (OBSERVED, `content.ts`'s `FOUR_DECISIONS`):** eyebrow "Four decisions this makes answerable"; 4 cards — "What do we fix first?" / "What should we spend?" / "Can we change this safely?" / "What can we ignore?" (accent-colored, matching the identical 4th-card pattern used in the hero's decision strip on `/cdt-2`, §2.1 of the companion spec — the same four decisions appear on both pages, worded identically, which is a genuine point of *alignment* between the two builds).
- **Image (OBSERVED):** `/images/home2/cdt_diminishing_returns_curve.png`, alt "Risk reduction against spend: the curve climbs steeply, then flattens as further investment buys progressively less", screen-blended, with a small caption: "Risk removed against euros spent. The answer is the point where the curve stops paying."

### 2.3 Company (`Home2Company.tsx`, `id="company"`)

- **Layout (OBSERVED):** eyebrow + `H2`, then a 2-column intro (`md:grid-cols-2` — left has a bold lead sentence + a second paragraph, right is one paragraph), then a "What that means in practice" label followed by a 2-column, 5-item bulleted list (each item bold-lead + regular continuation, bullet rendered as a small accent-colored dot rather than a native list marker), then a footer row: an accent-left-bordered grant note beside two stacked text links.
- **Copy (OBSERVED, `content.ts`'s `COMPANY`):** H2 "The full picture of your OT risk — and where your next euro reduces it most."; 5 practice points — "OT engineers, not IT security." / "A number, not an adjective." / "What is true, not what is good for us." / "Your data and your model stay yours." / "Engagements designed to end."; grant note referencing CIF-NL 2025; two links — "What the Netherlands funded →" (`/company`) and "Meet the founders →" (`/company#founders`).

### 2.4 Two Ways In (`Home2TwoWaysIn.tsx`, no anchor)

- **Layout (OBSERVED):** asymmetric header (`lg:grid-cols-[.5fr_1fr]` — eyebrow+H2 left, content right), body is a 2-panel hairline-bordered grid (`sm:grid-cols-2`), each panel a full bordered card with tag/title/body/link.
- **Copy (OBSERVED, `content.ts`'s `TWO_WAYS_IN`):** H2 "A model, and the engineers who use it."; Panel 1 — tag "Product", title "Cyber Digital Twin", links to `/twin`; Panel 2 — tag "Practice", title "Consulting", links to `/consulting`. Both link labels start with "See what…" ("See what the Dutch government funded →" / "See what OXOT consultants do →").
- **Interaction (OBSERVED):** each panel has the same `Card`-style hover-shadow glow used throughout both pages, applied here to a hand-built panel `<div>` rather than the shared `Card` primitive (a minor code-path duplication, not a visual difference — flagged for the same reason as the equivalent note in the companion spec's §3).

### 2.5 Cyber Digital Twin (`Home2Twin.tsx`, `id="twin"`)

The most content-dense section on this page. **Layout (OBSERVED):** asymmetric (`lg:grid-cols-[1.42fr_.58fr]`) top block — left: eyebrow, `H2` with an inline accent-colored word ("modelled"), intro paragraph, a 4-item hairline-grid "disciplines" strip (identical 4 disciplines to `/cdt-2`'s Engine Intro section, §2.10 of the companion spec — another genuine alignment point between the two pages), then an accent-left-bordered callout with a link to `/cdt-2#risk`; right: a bordered "grant receipt" panel.

- **Grant receipt panel (OBSERVED) — the most structurally unique block on either page:** a label-value row layout (`grid-cols-[88px_1fr]`) styled to look like a physical receipt, listing Fund / Award / Selection / Announced, then a distinctly-styled "quote" row (RVO's own words: "A truthful copy of reality."), then two links — one external (`target="_blank" rel="noopener noreferrer"` to `https://www.rvo.nl`) and one internal (`/company`).
- **Second block (OBSERVED):** below a top border, a 2-column "test the control" row — left: eyebrow, `h3` (`.h-sub`, not `H2` — this is a sub-section within the Twin section, not a new top-level section), body, a link to `/cdt-2#test`; right: one image in a black-background bordered frame.
- **Cross-page linking (OBSERVED, worth stating precisely since an earlier point in this session's conversation oversimplified this):** this section's *primary* CTAs point to the real `/twin` and real `/consulting` (via §2.1's hero and §2.4's panels). But *within* this specific section, two supplementary "how it works" deep-link callouts point into `/cdt-2`'s own anchors — `/cdt-2#risk` ("How consequence-driven analysis works →") and `/cdt-2#test` ("How a what-if experiment runs →"). So the relationship is not "home-2 ignores cdt-2" — it's a deliberate split: primary routing goes to the real, live pages; supplementary explanatory depth is borrowed from the sibling comparison build. **UNKNOWN** whether that split is intentional information architecture or an artifact of `/cdt-2` being built first and having anchors available that `/twin` doesn't.
- **Image (OBSERVED):** `/images/home2/CDT_Simulation_2_Layers_Dark.png`, alt "A what-if control experiment: the baseline network state above, and below it a simulated control layer where a virtual firewall neutralises the attack paths."

### 2.6 Consulting Services (`Cdt2Services`, reused from `/cdt-2`, `id="services"`, `tone="surface"`)

**OBSERVED — not a `/home-2`-specific component.** Exactly the interactive 6-card expand/collapse grid documented in full in the companion spec's §2.16 (component identity, not just visual similarity — `Cdt2Services` is imported directly from `@/components/cdt2/Cdt2Services`, not reimplemented). The only difference from its `/cdt-2` usage is the `tone` prop: `"surface"` here versus the component's own default of `"base"` (used unchanged on `/cdt-2`) — added specifically so this page's band alternation stays correct against `Home2CaseStudies`'s fixed `"base"` tone immediately following it (per the `tone` prop's own doc comment in `Cdt2Services.tsx` and `page.tsx`'s "FDD and CONSULTING removed" note). **Live-tested this session:** click-to-expand works correctly on this page, identical behavior to `/cdt-2`.

### 2.7 Case Studies (`Home2CaseStudies.tsx`, `id="cases"`, `tone="base"`)

**Layout (OBSERVED):** asymmetric header (`.5fr_1fr` — eyebrow+H2 left, intro paragraph right), body is a hairline-bordered `sm:grid-cols-2 lg:grid-cols-3` grid of 10 case-study link-cards plus one "All case studies" tile as an 11th cell — the 10th case-study card is explicitly `wide: true` (spans 2 columns) specifically so it sits evenly beside the "All case studies" tile in the final row rather than leaving a narrow orphan card (documented in the component's own code comment). Each card: a numbered label, `.h-micro` title, one-line hook, all wrapped in a `Link` to `/case-studies/<slug>`; the "All" tile links to `/case-studies`.

**OBSERVED — genuine cross-page alignment confirmed:** all 10 `slug`s in `content.ts`'s `CASE_STUDIES.items` (`ma-ot-due-diligence`, `digital-transformation`, `it-ot-architecture-convergence`, `plant-architecture-review`, `plant-remote-access`, `iec-62443-adoption`, `compliance-preparation`, `cyber-integration-lead`, `threat-vulnerability-workshops`, `cyber-first-responder-training`) match the 10 real content files under `content/case-studies/` built earlier this session — this section is not speculative content pointing at routes that don't exist; every link resolves.

### 2.8 Partners & Collaboration (`Home2Partners.tsx`, `id="partners"`)

**Layout (OBSERVED):** same `.5fr_1fr` header pattern as §2.7, body is a 3-column `CardGrid` (Manufacturing & energy / Transportation / Research), footer row: a closing sentence beside a single link.

**⚠ Known dead link (OBSERVED, already flagged and accepted elsewhere in this session):** the closing link — "How we collaborate →" — points to `/collaboration`, a route that does not exist yet on the live site. `page.tsx`'s own doc comment states this was a deliberate choice (owner instruction) rather than an oversight, and this session's `measure.mjs` gate has confirmed it as the one remaining dead link on this page (down from 12 before `/case-studies` was built).

### 2.9 Where We Work (`Home2Sectors.tsx`, `id="sectors"`)

**Layout (OBSERVED):** same `.5fr_1fr` header pattern as §2.7/§2.8, body is a `sm:grid-cols-2 lg:grid-cols-4` `CardGrid` of 4 industries (Manufacturing / Water / Energy / Transportation).

**⚠ Typography inconsistency (OBSERVED):** this is the *only* section on either page whose section heading does not use the shared `H2` primitive. Its `<h2>` is hand-built: `className="font-serif text-[26px] font-semibold leading-[1.22] tracking-[-0.018em] text-white"` — 26px, versus `.h-section`'s systematic 30px used by every other `H2` on both pages. Same font family, different exact size/weight-declaration style (`font-semibold` utility vs `.h-section`'s built-in `font-weight: 700` — 600 vs 700 is also a real weight difference, not just a naming one). **RECOMMENDED:** replace with the shared `H2` primitive for consistency, unless the size difference here is intentional (no comment in source explains it, and 26px matches no other named type-scale token on the page — closest is `.h-card` at 20px or `.h-section` at 30px, so this looks unintentional rather than a deliberate third size).

This is the final section on the page — followed immediately by the site's global `ContactBand` and footer (§1's note on the missing-but-inherited closing CTA).

---

## 3. Layout and grid system

Structurally identical container/spacing system to `/cdt-2` (companion spec §3) — same `.oxot-canvas`, same `Band` component, same `py-16 md:py-20` rhythm, same `HAIRLINE`/`CardGrid` pattern. Differences specific to this page:

- **The hero is not `Band`-wrapped** (§2.1) — it has its own bespoke background (a `GraphLoop` canvas + gradient scrim) that `Band`'s plain flat-color background couldn't accommodate.
- **Grid patterns used:** `lg:grid-cols-[1.08fr_.92fr]` (hero), `lg:grid-cols-[1.34fr_.66fr]` (Four Decisions), `.5fr_1fr` (the repeated header-beside-content pattern used identically in §2.7/§2.8/§2.9, and — asymmetrically as `1.42fr_.58fr` — in §2.5), `sm:grid-cols-2`/`sm:grid-cols-3`/`lg:grid-cols-4` for card grids. Same asymmetric-header idiom that the companion spec's §3 notes is reused three times on `/cdt-2` — here it's reused four times, making it the single most common layout pattern across *both* pages combined.
- **Tone-alternation break (OBSERVED, §1):** sections 2→3 (Four Decisions → Company) are both `tone="surface"` with nothing between them — the one place this page's banding doesn't alternate. **RECOMMENDED:** either give Four Decisions its own tone-break or accept this is intentional (the two sections do read as one continuous argument — Four Decisions has no heading of its own and functions almost as a lead-in to Company rather than a fully separate section, which may be exactly why no tone break was inserted).

---

## 4. Typography

Same global tokens as the companion spec's §4 (`.h-section`, `.h-sub`, `.h-card`, `.h-micro`, `.oxot-kicker`, all sourced from `globals.css`, unchanged). Page-specific findings:

- **OBSERVED, one section (§2.9, Where We Work) does not use the shared `H2`** — see §2.9 above for the exact deviation.
- **OBSERVED, `H2` is used with inline mixed styling in one place:** §2.5's Twin section wraps a plain string and an accent-colored `<span>` inside one `H2` call (`{t.h2Lead}<span style={{color:ACCENT}}>{t.h2Accent}</span>{t.h2Trail}`) — the only heading on either page with an inline accent word rather than a solid color. This is a legitimate, deliberate emphasis technique (not an inconsistency), used nowhere else on this page or on `/cdt-2`.
- **OBSERVED, body-copy sizing is ad hoc here too**, same pattern as the companion spec's §4 finding — a wide range of one-off pixel sizes (`text-[11.5px]` through `text-[15px]`) and opacity values (`/45`, `/56`, `/58`, `/62`, `/66`, `/68`, `/70`, `/72`, `/74`, `/75`, `/85`) rather than a small set of named roles. **RECOMMENDED:** same consolidation recommendation as the companion spec, and ideally as *one shared* set of body-text roles across both pages, since they already share every other primitive.

---

## 5. Color tokens

Identical to the companion spec's §5 — `BG_BASE` `#060708`, `BG_SURFACE` `#0a0c0e`, `ACCENT` `#ff7a1a`, `HAIRLINE` `rgba(255,255,255,.09)` — same fixed palette, same non-reactivity to the site's light/dark toggle, same source (`primitives.tsx`, imported directly, not a page-local copy). **OBSERVED, one page-specific use:** the hero's primary CTA sets `background: ACCENT, color: BG_BASE` explicitly inline rather than relying on a shared button-style class — functionally identical to `/cdt-2`'s hero CTA styling, implemented via a different (slightly more verbose) code path.

---

## 6. Spacing

Same scale as the companion spec's §6 — no new spacing tokens found. `py-16 md:py-20` section rhythm, `p-6`/`p-8` card padding, `gap-10` through `gap-14` for major two-column splits.

---

## 7. Components

All of the companion spec's §7 primitives (`Eyebrow`, `Band`, `H2`, `CardGrid`, `Card`, `Reveal`) are reused here unchanged, imported from the same `cdt2/primitives.tsx` and `shell/reveal.tsx` — **confirmed no page-local duplication of any of the six**, unlike the minor `CardGrid`-bypass noted in §2.4 above (which duplicates `Card`'s *visual* pattern in a hand-built `<div>`, not the primitive itself).

**One genuinely new, page-specific component: `GraphLoop` (`home2/GraphLoop.tsx`).** Not present anywhere on `/cdt-2`. Full technical detail, all **OBSERVED** from source:

- A `"use client"` component rendering a single `<canvas>` inside an absolutely-positioned container, drawn via `requestAnimationFrame` rather than CSS.
- Procedurally generates a fixed "node field" (170 cluster centers, 8–25 points each, seeded with a deterministic linear-congruential PRNG — `rng(20260812)`, a fixed seed, so the field layout is identical on every load rather than random per-visit) plus a graph of edges between points closer than 56px.
- Animates a "travelling spotlight" that visits 5 of the field's own cluster centers in sequence over a configurable loop duration (`loopSeconds={16}` as used in the hero), easing between them (`ease(t) = t²(3-2t)`, a smoothstep) and dwelling at each stop with a pulsing ring + rotating sweep-line effect.
- Nearby points brighten and their connecting edges tint orange (`ACCENT`) as the spotlight passes near them; distant points stay a dim neutral grey.
- **Three animation-hygiene guarantees, all OBSERVED in source and explicitly called out in the component's own comment:** (1) pauses via `IntersectionObserver` when scrolled offscreen and resumes preserving its phase (not restarting) when back in view; (2) draws a single static frame and never starts the animation loop at all under `prefers-reduced-motion: reduce`; (3) resizes its backing canvas via `ResizeObserver` against its container rather than a fixed pixel size, with device-pixel-ratio capped at 2.
- **OBSERVED, live-rendered:** confirmed visually present behind the hero at both desktop and mobile-equivalent widths — a subtle field of faint moving dots/lines with an occasional brighter orange node, mostly obscured by the gradient scrim over the left two-thirds of the hero (where the text sits) and more visible on the right side and lower strip.

This is the single most technically involved piece of either page — considerably more custom engineering than anything on `/cdt-2`, which has no canvas/animation work beyond the shared `Reveal` and `Cdt2Services` interaction.

---

## 8. Interactions

**OBSERVED:**
- `GraphLoop`'s continuous canvas animation (§7) — unique to this page.
- `Cdt2Services`' card expand/collapse (§2.6) — shared component, confirmed working identically here.
- `Reveal`'s scroll-triggered entrance animations — used throughout, same mechanism as the companion spec's §7.
- `SiteHeader`'s nav (inherited chrome) — see §9 for the corrected mobile-menu finding.
- Hover states: `Card`/hand-built-panel shadow glow (§2.4, §2.6, §2.7, §2.8, §2.9), `.cta-lift` on both hero CTAs.

**UNKNOWN / not tested this pass:** same caveats as the companion spec's §8 — focus-visible states beyond what's declared in source, screen-reader behavior of the shared `Cdt2Services` interaction (not re-tested here since it's the identical component already flagged as untested-with-AT in the companion spec), keyboard navigation through the card grids (no non-native interactive pattern found in source, so standard tab order is **INFERRED**, not directly confirmed).

---

## 9. Desktop / mobile behavior

**OBSERVED, desktop (1456×828 and 1568×775 viewports, both confirmed via `window.innerWidth` before screenshotting):** page renders as described throughout §2. Hero's `GraphLoop` canvas and screen-blended cube image both render correctly. No horizontal overflow observed. 0 console errors on load.

**OBSERVED, real mobile-width viewport (606×667, confirmed via `window.innerWidth` immediately before every screenshot in this check — see companion spec §9 for why that verification step matters and what it caught):** the header correctly collapses to the compact hamburger bar below the `lg:` (1024px) breakpoint, identical behavior to the companion spec's corrected §9 finding (same shared `SiteHeader` component). Hero content stacks to single column, all text readable, no wrapping defects, no overflow. `GraphLoop`'s canvas remains visible behind the hero content at this width (confirmed via screenshot — faint diagonal node-field lines visible on the right side of the hero at this width too, not just desktop). 0 console errors.

**INFERRED (not re-screenshotted section-by-section below the hero at mobile width in this pass):** same basis as the companion spec's equivalent note — standard Tailwind breakpoints throughout, `measure.mjs` has passed clean on this route (390/834/1440/2560px, 0 overflow) repeatedly earlier in this session — so section-level mobile stacking is expected to be clean, but wasn't individually re-verified section-by-section here.

**UNKNOWN:** tablet-width (768–1023px) behavior, same as the companion spec.

---

## 10. Accessibility

**OBSERVED:**
- Console: 0 errors on page load, both viewport widths tested.
- Heading structure: one `<h1>` (hero), `<h2>` for 7 of 9 sections (Four Decisions has none — §2.2; Where We Work uses a non-`H2` hand-built heading — §2.9), `<h3>` within §2.5's second block.
- Images carry descriptive alt text in every case checked (hero, Four Decisions curve, Twin's what-if diagram) — none empty or filename-derived.
- The external RVO link (§2.5) correctly uses `target="_blank" rel="noopener noreferrer"`.
- Both hero CTAs have real, working destinations (§2.1) — no equivalent of `/cdt-2`'s broken-CTA defect on this page.

**UNKNOWN (flagged, not fabricated):**
- Color-contrast ratios — not freshly measured this pass, same caveat as the companion spec.
- Whether `GraphLoop`'s canvas needs any `aria-hidden`/role treatment — not checked in source; a purely decorative animated background canvas typically should be hidden from assistive tech, and this wasn't confirmed either way.
- Screen-reader behavior of `Cdt2Services`' shared interaction (same open item as the companion spec).

---

## 11. Assets

**OBSERVED**, `public/images/home2/`:

| File | Used by |
|---|---|
| `CDT_7_Box_Frame_Dark.png` | §2.1 Hero |
| `cdt_diminishing_returns_curve.png` | §2.2 Four Decisions |
| `CDT_Simulation_2_Layers_Dark.png` | §2.5 Twin (test-control image) |

**UNKNOWN — file sizes on disk were not re-checked in this pass** (unlike the companion spec's §11, which did check `/cdt-2`'s five image files); flagged rather than assumed similar.

---

## 12. Acceptance criteria (for a from-scratch rebuild matching this page)

1. All 9 sections in §1's table render in the documented order, with anchor IDs present exactly where listed.
2. Band tone alternates per §1's table **except** the one documented surface→surface break between Four Decisions and Company — reproduce that break faithfully rather than "fixing" it, unless a deliberate decision is made to change it.
3. `Cdt2Services` is reused as the actual shared component (not reimplemented) with `tone="surface"` passed explicitly.
4. `GraphLoop` reproduces its three animation-hygiene guarantees exactly (§7) — offscreen pause with phase preservation, static frame under reduced motion, `ResizeObserver`-driven canvas sizing — these are not optional polish, they're the same category of hard constraint `Reveal`'s transform-only rule is on both pages.
5. Both hero CTAs resolve to real destinations (§contact-band anchor, `/twin`) — this page already meets this bar; a rebuild must not regress it.
6. The Where We Work section's non-standard `<h2>` (§2.9) is either replaced with the shared `H2` primitive or its deviation is explicitly justified — not silently carried forward as if unnoticed.
7. All `/case-studies/<slug>` links (§2.7) continue to resolve to real content — this page is not speculative in that section, unlike its `/collaboration` link (§2.8), which is a known, accepted gap.
8. No page-local closing CTA is added — the global `ContactBand` is the intended closer, per the page's own doc comment.

---

## Summary of flagged items requiring a decision (not resolved in this spec)

- Four Decisions has no section-level heading, unlike every other section on either page (§2.2).
- Sections 2→3 don't alternate `Band` tone (§1, §3).
- Where We Work's heading bypasses the shared `H2` primitive at a non-standard 26px/600-weight (§2.9) — the one clear, likely-unintentional typography inconsistency found on this page.
- The `/collaboration` link is a known, already-accepted dead link (§2.8) — not new, but worth keeping in view alongside the other findings here.
- Body-copy typography is ad hoc per-paragraph, same finding as the companion spec (§4) — ideally consolidated as one shared system across both pages, not two parallel ad hoc sets.
- `GraphLoop`'s accessibility treatment (decorative canvas, aria-hidden or not) was not confirmed either way (§10).
