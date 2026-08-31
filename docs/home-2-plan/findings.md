# Findings — /home-2 (OXOT Home.dc.html import)

## Source
- Claude Design project `65e687bd-763e-4bf9-a99f-ca682458c385` ("Services website interface feedback") — `type: PROJECT_TYPE_PROJECT`, not a design-system project, but read methods (`list_files`/`get_file`) work fine via `DesignSync`.
- This is the SAME project that sourced the original `/cdt-2` build (`handoff/CDT-Pillar-Page-Spec.md`, `OXOT CDT Pillar Page v2.dc.html`, etc. all live here too).
- `OXOT Home.dc.html` fetched in full (untruncated, ~14KB). It is a **distinct, self-contained homepage design** — not the CDT-2 content. The three "surgical fix" screenshots the owner sent in the same message (What Changes / Buy the Control / World Map) do **not** appear anywhere in this file — they trace back to the CDT Pillar Page design in the same project, and were fixed directly on `/cdt-2` (commit pending in this session, separate from this plan).

## Section inventory (OXOT Home.dc.html)
In order, with element IDs where present:
1. `<nav>` (custom, inline) — **skip**, owner said use the site's real header (`src/components/shell/site-header.tsx`)
2. Hero — h1 "See your OT environment. Understand the risk. Know what to do next.", canvas graph-loop background, 7-box-frame image, 3-column "SEE / UNDERSTAND / DECIDE" strip
3. `#company` — "The full picture of your OT risk..." two-col intro + 5-point "what that means in practice" grid + CIF-NL grant credit strip
4. "Two ways in" — Product (Cyber Digital Twin) vs Practice (Consulting) two-card panel
5. `#twin` — Cyber Digital Twin summary: 4-card discipline grid + "Consequence first" callout + CIF-NL grant receipt detail panel (right column) + "Test the control" sub-section with `CDT_Simulation_2_Layers_Dark.png`
6. `#fdd` — Facility Due Diligence: intro + "Questions it answers" 5-item list panel
7. `#services` — Consulting: intro + "Work we are regularly asked to run" 6-item link list panel
8. `#sectors` — Where we work: 4-col Manufacturing/Water/Energy/Transportation grid (text **verbatim identical** to CDT-2's `WHERE_WE_WORK` — can reuse `content-2.ts`'s `WHERE_WE_WORK.industries` as-is)
9. `#talk` — Talk to OX CTA band
10. `<footer>` (custom, inline) — **skip**, owner said use the site's real footer (`src/components/shell/site-footer.tsx`)

## Assets referenced
| File | Status |
|---|---|
| `uploads/OXOT_Logo_Dark.png` | Not needed as a raw asset — site nav/footer render the OXOT wordmark as real text (`oxot-wordmark`-style), not an image. Design's own nav/footer are being skipped anyway. |
| `uploads/CDT_7_Box_Frame_Dark-84930b6c.png` | **Already local** at `public/images/CDT_7_Box_Frame_Dark.png` (5.3MB — will need resize/recompress via sharp, same as prior CDT-2 image work this session). |
| `uploads/CDT_Simulation_2_Layers_Dark.png` | **Not local.** Fetched via `DesignSync get_file` but hit the tool's 256KB read cap (`truncated: true`) — can't reconstruct the full PNG from this call alone. **Also**: this is the exact image flagged and deliberately excluded from `/cdt-2`'s worked-example section earlier this session for carrying an unproven "Verified: 85% reduction" figure baked into the pixels as non-editable text. Needs an owner decision before use here (see task_plan.md open question). |

## Portable code
- `oxot-graph-loop.js` — fetched in full. Pure vanilla-JS canvas animation (custom element `<oxot-graph-loop>`), no external deps. Cleanly portable to a React client component: same math, same `IntersectionObserver` pause/resume, same `prefers-reduced-motion` single-frame fallback, same `ResizeObserver`. Plan: port as `src/components/home2/GraphLoop.tsx`.
- `support.js` — fetched in full (62KB). Confirmed to be Claude Design's own preview-runtime ("GENERATED from dc-runtime/src/*.ts — do not edit"), powering `<x-dc>`/`<x-import>` in the design tool's preview harness only. **Not site content — nothing to port.**

## Site conventions confirmed (for fidelity)
- Real fonts: `font-sans` → Instrument Sans, `font-serif`/`font-display` → Newsreader (`src/app/globals.css`). The design file's own fonts (Archivo, IBM Plex Mono) are **not** to be used — same call already made for `/cdt-2` per owner's earlier explicit instruction this session ("we need to use the website font and typography").
- Real header: `src/components/shell/site-header.tsx` + `src/components/shell/nav.ts` (`PATHS`/`primaryNav()` pattern — CDT-2 added itself here as a precedent to follow for `/home-2`).
- Real footer: `src/components/shell/site-footer.tsx`.
- Fixed dark palette precedent for non-theme-reactive pages (`/iec-62443`, `/cdt-2`): literal hex values, not theme tokens — `#060708` base, `#0a0c0e` surface, `#ff7a1a` accent. The design file already uses these exact values, so no reconciliation needed.
- `Reveal` (`src/components/shell/reveal.tsx`) and the `Card` hover-lift pattern from `src/components/cdt2/primitives.tsx` are the established motion vocabulary this session just piloted on `/cdt-2` — reusable here directly.
- Route+nav pattern: `src/app/[locale]/cdt-2/page.tsx` + its `PATHS.cdt2` entry in `nav.ts` is the direct template for adding `/home-2` beside the real `/` (comparison build, not a replacement — same relationship `/cdt-2` has to `/twin`).
