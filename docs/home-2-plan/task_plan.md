# Plan — /home-2 (import OXOT Home.dc.html from Claude Design)

Build a new comparison page at `/home-2` implementing the `OXOT Home.dc.html` design from Claude Design project `65e687bd-763e-4bf9-a99f-ca682458c385`, exactly, using the site's real header/footer/fonts/motion system instead of the design file's own inline nav/footer/Archivo font. Stands beside the real `/` homepage for comparison, same relationship `/cdt-2` has to `/twin`. See `findings.md` for full source research.

## Scope

**In:**
- 8 content sections from the design, ported to real React components with real content (verbatim copy, no paraphrase): Hero, Company, Two Ways In, Cyber Digital Twin summary, Facility Due Diligence, Consulting, Sectors, Talk to OX.
- Port `oxot-graph-loop.js`'s canvas animation to a React client component for the hero background.
- New route `src/app/[locale]/home-2/page.tsx`, using the real `SiteHeader`/`SiteFooter`, `font-sans`/`font-serif` tokens, and the fixed dark palette (`#060708`/`#0a0c0e`/`#ff7a1a`) matching `/cdt-2`'s established pattern.
- Add `/home-2` to `nav.ts` (`PATHS`) as a nav entry, same as `PATHS.cdt2`.
- Add `/home-2` to the three verification scripts' `ROUTES` arrays (`measure.mjs`, `content-guards.mjs`, `chrome-guards.mjs`) — required for any new page per this repo's own convention.
- Resize/recompress `CDT_7_Box_Frame_Dark.png` (currently 5.3MB) via `sharp`, same treatment given to CDT-2's images earlier this session.
- Full verification triad (tsc/lint/build/test/verify) + live Chrome check before any commit.

**Out:**
- Not touching the real `/` homepage — this is purely additive, comparison-only, same as `/cdt-2` vs `/twin`.
- Not porting `support.js` — confirmed to be Claude Design's own preview-tooling, not site content.
- Not implementing the design's own inline `<nav>`/`<footer>` markup — owner's explicit instruction is to use the real site header/footer.
- NL translation — EN only for now, same explicit exception CDT-2 took (page-local content, not in the i18n dictionary), pending separate sign-off.

## Action Items

- [ ] 1. Resolve the `CDT_Simulation_2_Layers_Dark.png` open question below before building the "Test the control" sub-section (item 5 depends on this).
- [ ] 2. Create `src/components/home2/` module: `content.ts` (all 8 sections' copy, transcribed verbatim from the fetched HTML), `primitives.tsx` (reuse/import from `cdt2/primitives.tsx` where identical — same fixed palette, same `Card`/`Band`/`Eyebrow`/`H2` shapes — don't duplicate if a straight import works).
- [ ] 3. Port `oxot-graph-loop.js` to `src/components/home2/GraphLoop.tsx` (client component, canvas-based, preserving exact draw math, `IntersectionObserver` pause/resume, and `prefers-reduced-motion` single-frame fallback).
- [ ] 4. Build `Home2Hero.tsx` (GraphLoop background + h1 + 3-col SEE/UNDERSTAND/DECIDE strip), `Home2Company.tsx`, `Home2TwoWaysIn.tsx`, `Home2Twin.tsx` (includes the CIF-NL grant receipt panel and the "Test the control" sub-section), `Home2Fdd.tsx`, `Home2Consulting.tsx`, `Home2Sectors.tsx` (reuse `WHERE_WE_WORK` content from `cdt2/content-2.ts` — text is verbatim identical), `Home2Talk.tsx`.
- [ ] 5. Resize/recompress `CDT_7_Box_Frame_Dark.png` via sharp; verify new dimensions with `sips` and update `<Image>` width/height to match exactly (lesson from this session: mismatched dims caused a real bug earlier on CDT-2).
- [ ] 6. Wire `Reveal` onto each section's primary content block and the `Card` hover-lift, matching the pattern just piloted on `/cdt-2` — same restraint, same tokens, no new animation language.
- [ ] 7. Assemble `src/app/[locale]/home-2/page.tsx`: `SiteHeader` → 8 sections → `SiteFooter`. Add metadata.
- [ ] 8. Add `PATHS.home2` to `nav.ts` with a dated rationale comment (same pattern as `PATHS.cdt2`).
- [ ] 9. Add `/home-2` to `measure.mjs`, `content-guards.mjs`, `chrome-guards.mjs` `ROUTES` arrays.
- [ ] 10. Verify: `npx tsc --noEmit && npm run lint`, `npm run build`, `npm test`, `SITE_BASE=... npm run verify`, live Chrome check (scroll through all 8 sections, confirm GraphLoop renders/animates, confirm no console errors, confirm hover/Reveal states).
- [ ] 11. Commit locally only (standing rule) — not pushed without explicit per-instance ask.

## Open Questions

1. **`CDT_Simulation_2_Layers_Dark.png`** — this is the exact image already excluded from `/cdt-2`'s worked-example section this session for carrying an unverified "Verified: 85% reduction" figure baked into the pixels (illustrative, not customer data, per the source spec's own Phase 1 Discovery notes). The design file uses it in the Cyber Digital Twin section's "Test the control before you buy it" teaser. Three options:
   - **(a)** Include it as-is (owner's earlier call on the same image for `/cdt-2` was "use it anyway" when this exact tension came up before).
   - **(b)** Omit the image, keep the text-only teaser (mirrors how `/cdt-2`'s own worked-example section ended up text-only for the same reason).
   - **(c)** Swap in `whatif-control-stack.png` (the image CDT-2's Decision-03 section actually uses, no baked-in stat) instead of the literal design asset.
   I need this decision before building item 4 (`Home2Twin.tsx`), since the image can't be fully fetched via `DesignSync` regardless (256KB read cap, `truncated: true`) — getting it at all requires either a browser-based download (needs explicit permission per file-download rules) or an alternate path.
2. None of the other 7 sections have open questions — content, layout, and assets are all resolved per `findings.md`.
