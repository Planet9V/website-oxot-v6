# OXOT Composition Rules

## Home
- One dominant Twin Explorer visual.
- One decision switchboard.
- One worked scenario.
- Three featured case studies maximum.
- Six industry routes maximum.
- No full consulting-service grid.

## Platform
- Long-form product narrative.
- Four decision sections.
- One worked scenario.
- Technical architecture as progressive disclosure.
- Deployment and assurance routing.
- One strong final CTA.

## Consulting
- Engagement model and service detail.
- Service cards may expand.
- Use timeline or engagement journey.
- No deep seven-layer architecture.

## Industry pages
- Start with industry-specific operational problem.
- Show an industry-specific system diagram.
- Include one sector-specific worked scenario.
- Use a sector-specific CTA.
- **Floor rule — sibling content balance:** in any multi-part layout on an Industries page (hero copy/diagram panes, bento cells, ledger columns), measure the siblings **in their default, pre-interaction state at the page's primary desktop breakpoint** — the state a first-time visitor actually lands on, before any selection, expansion, or hover. No sibling pane/column/cell may fall short of its tallest/densest neighbour by more than roughly 2x on **either** measure — rendered height, or count of distinct content elements — and where the two measures disagree, the worse one governs. The widest/hero slot must carry more real *information* than its smaller siblings, not merely larger type, larger icons, or more padding at the same content depth.
  - **Satisfy it with information, not filler.** Restated headings, generic boilerplate, and stretched empty chrome do not count: an `items-stretch` container that makes an empty pane tall passes the CSS and fails this rule. If a pane genuinely has nothing more to say, the fix is to shrink the oversized sibling — not to pad the short one.
  - **A short figure beside a long list: make it sticky rather than cut the list (technique, added 2026-08-26).** Where the short sibling is a fixed-aspect image or diagram and the tall one is a genuine list of real content, full height parity is not reachable by spacing alone, and cutting real content to reach it is the wrong trade. Pin the figure column with `lg:sticky lg:top-24` plus `self-start` instead, so it stays beside the rows it explains for the whole read rather than scrolling away and leaving the list running down a column of whitespace. Three details are load-bearing: `self-start`, because a grid item stretched to its row's full height has no free space to travel within and never sticks at all; `lg:` and up **only** on both classes, because below that the columns stack and a sticky figure would pin itself to the viewport and ride past content it has nothing to do with; and `top-24` (96px) measured off `site-header.tsx`'s real `sticky top-0` / `h-16` (64px) bar rather than guessed. This changes what the reader sees, not the rendered heights, so it does not by itself clear the ratio above — tighten row density first, then record the residual difference and this remedy as the stated, content-based reason the rule already requires. Reference implementation: `Capabilities.tsx` on `/industries/water-wastewater-3` (a square 1400×1400 figure at `lg:col-span-5` beside a seven-row capability rail at `lg:col-span-7`).
  - **A tighter pattern bound wins.** Where a named pattern in `OXOT_Layout_Styles.md` states a stricter ratio for its own layout (Pattern 1's hero panes cap at ~1.5x), the pattern's number governs. The 2x figure here is the site-wide floor for layouts no named pattern covers; it is never a licence to loosen a pattern.
  - **Deliberate asymmetry is allowed, but must be stated.** A sibling may sit outside the ratio when the imbalance is genuinely content-driven, provided the reason is recorded in the section's code comment or build note — the same "justified vs. invented" test the Visual QA Checklist's Consistency category already applies to heading and card variation. Unstated imbalance is a fail. A comment merely *asserting* the asymmetry is intentional, with no content reason given, is not a stated reason.
- **Floor rule — component variety:** a numbered text-row section (an *editorial schedule*: a vertical list whose every item is index/number + heading + paragraph, carrying no diagram, chart, image, or interactive state) is a legitimate treatment, but must never become a page's default. Two caps, both binding: **no more than 2 such sections consecutively**, and **no more than roughly one third of the page's body sections in total**. The consecutive cap alone is trivially defeated by alternating A,A,B,A,A,B — which is the same monotony that produced this rule, so it does not stand on its own. Positive floor: every Industries page carries **at least two structurally distinct non-text-row treatments**, drawn from the real set — a named `OXOT_Layout_Styles.md` pattern, a real diagram component, `chart.tsx`, or the generated-imagery pipeline (`scripts/gimp-export.sh`, `scripts/blender-render-glb.py`, `scripts/openrouter-generate-image.sh`; real precedent already live on the rail-transportation page).
  - **Variety is not a licence for decoration.** `chart.tsx` earns its place only where the content is genuinely numeric or comparative, per its Industries carve-out in `OXOT_Component_Inventory.md` — a chart standing in for a diagram, or dressing up what is really a single number, *fails* this rule rather than satisfying it. Same for imagery: photographic/textural content only, never a picture inserted to break up text.
- *(Both rules added 2026-08-24, after a test Industries page (`/industries/water-wastewater-1`) scored 5/10 on exactly these failure modes; both re-reviewed and tightened the same day by an independent Opus second pass that read the live implementation code rather than trusting the diagnostic — see `OXOT_Layout_Styles.md` Patterns 1-3 for the per-pattern mechanisms this cites, and `OXOT_Component_Inventory.md` for the corresponding chart.tsx scope change. Scoped to Industries pages only — do not apply to Home/Platform/Assurance/Decisions without separate review, since those pages' existing use of these patterns is out of scope for this pass.)*
- **Floor rule — heading width tracks body width, never a smaller fixed cap:** a section's `h2`/`h3` must be free to span at least as wide as the body content directly beneath it (the section's real canvas or column width) — never capped at a fixed `max-w-*` narrower than that body, "for readability." Readability caps belong on *body copy* (`.prose-measure`, a real reading-width token), never on a heading sitting above a diagram, table, or interactive that itself uses the section's full width. A heading capped tighter than its own body reads as narrower/misaligned next to that body on any viewport wider than the cap — exactly the failure this rule exists to catch, found live on `/industries/water-wastewater-2` (2026-08-25): a shared header-recipe component (`SectionA`/`SectionC` in `Rule.tsx`) hardcoded `max-w-3xl` (768px) on the heading of 7 of the page's 9 body sections, while each section's own docblock and comments already described the same recipe as "full-width h2" — the code directly contradicted its own stated contract. Caught by the site owner's own visual review, not by `scripts/measure.mjs`: at the time, the harness checked only *overflow* (content wider than its container) and had no check for the opposite failure — content narrower than its container. **That gap is now closed (2026-08-25):** `collectNarrowText` in `measure.mjs` flags this mechanically, and it is a mandatory gate — see `OXOT_Page_Development_Process.md` step 6. This rule is still the authority on *why*; the harness is what stops it recurring, after a written rule alone twice failed to. `text-balance` on the heading is sufficient on its own to keep a long heading from stretching into one ungainly line; a fixed `max-w-*` on top of it is redundant at best and a silent regression at worst.
- **Floor rule — long enumerated lists get a tabbed layout, not one continuous scroll:** where a section's real content is many categories each holding several rows (a glossary-shaped list, a term/definition table, an equipment index — roughly 6+ categories and 40+ total rows is the working threshold, judged on the actual content, not a fixed count alone), stacking every category permanently visible produces a section that is mostly scroll and reads as one undifferentiated block. Reach for a tabbed layout instead — one category's rows visible at a time (`src/components/ui/tabs.tsx`, already-wrapped Radix, real `tablist`/`tab`/`tabpanel` semantics for free) — the same real, positive reason a long table becomes tabbed rather than a generic aesthetic preference for tabs. **Reference implementation:** `TechnologyIndex.tsx` on `/industries/water-wastewater-2` (fixed 2026-08-25) — 8 categories, 77 terms, previously one continuously-scrolling stack of `<dl>`s; no single category was short enough that flattening the whole section back out would have helped, so tabbing by category was the real fix, not a stylistic swap.

## Assurance pages
- Editorial/technical reading experience.
- Diagrams, tables, requirements traces.
- No sales-style dashboard blocks.

## Resources
- Editorial cards and strong filters.
- Do not use the Platform visual language everywhere.