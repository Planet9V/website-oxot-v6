# OXOT Engineering-Diagram Capability — Execution Plan

**Created** 2026-08-28 · **Owner** lead agent · **Status** Phase 0 in_progress

## Goal

A page specification can request a diagram by type and sector and receive a
consistent, precise, in-style result — built from real engineering symbols
rather than hand-approximations.

## Definition of done — the only criterion that closes this plan

Three diagrams generated — **energy, water, manufacturing** — each scoring
**≥ 90%** on an independent visual audit:

| Axis | Weight | Measures |
|---|---|---|
| Style conformance | 25 | single-colour, stroke-only, `currentColor`, token palette, both themes |
| Symbol correctness | 30 | the glyph genuinely represents the equipment/process it labels |
| Composition | 20 | balance, spacing, legibility, no collisions, reads as one drawing |
| Engineering credibility | 25 | an OT engineer would not wince — ISA/IEC conventions respected |

Audited by agents that did **not** build the diagrams. Below 90 → defect list →
rebuild → re-audit. Loop until all three clear.

---

## Verified starting state — do not re-litigate, see findings.md

- 9,532 converted stencils; **6,410 (68%) tokenizable**; ~3,300 unusable.
- **The converter never implemented `<arc>`/`<curve>`.** 1 of 478 P&ID files
  retains a curve. `ball_valve` is a bowtie with no ball.
- **25 of 39 shipped glyph paths have zero curves** — the live site serves wrong
  ISA symbols today.
- All 95 CSET files are base64 PNG. The generator's "zero rasters" claim was a
  null read reported as a clean read.
- 35 files carry invalid `fill="#stroke"`; the leftover guard cannot catch it.
- draw.io 31.3.2 headless works — 0.36 s/file folder mode, ELK layout built in.
- Blender 5.2.0 Freestyle SVG works — 2,005 paths, 104 KB gzip, 3.6 s.
- 1,222 `<connection><constraint>` ports were discarded by the conversion.

---

## Phases and gates

Every gate is **mechanically checkable**. A phase is not complete until its gate
exits 0. No phase starts before its predecessor's gate passes.

### Phase 0 — Repair the geometry (BLOCKING)

Nothing downstream is trustworthy until this passes.

- [x] 0.1 Extract draw.io's stencil XML from `app.asar`
- [x] 0.2 `scripts/compile-stencils.mjs` implementing `move line arc curve close
      ellipse rect fillstroke stroke fill save restore`; `<arc>` maps 1:1 to `A`
- [x] 0.3 Harvest `<connection><constraint>` ports into compiled output
- [x] 0.4 draw.io headless as **golden-render oracle**; diff every compiled path
- [x] 0.5 Regenerate `drawio-glyphs.tsx` from compiled geometry
- [x] 0.6 Leftover guard rejects any non-hex paint value

**GATE 0 — PASSED**, measured 2026-08-28 (`--verify` exit 0):
- 1007 shapes · 2698 connection ports harvested
- curve coverage **100.0%** (236/236 curve-bearing stencils) — target ≥ 95%
- no-op (`M`-only) paths in the curated set: **0**
- `ball_valve`: **4 arc commands**, oracle IoU **0.9995**
- oracle diff **42/42 ≥ 0.9 IoU**
- `tsc --noEmit` clean · `eslint` clean

0.6 is satisfied structurally rather than by a guard: `paintToSvg()` emits a
fixed `fill="none" stroke="${stroke}"` pair, so a stencil's own paint value is
never copied through. The `fill="#stroke"` defect class cannot reappear without
changing that one function.

### Phase 1 — Draw what does not exist (~45 symbols)

None of these are in the 9,532, and they are what differentiates an OT-security
site from a generic diagramming tool.

- [ ] 1.1 Purdue level bands (L0–L5 + DMZ)
- [ ] 1.2 IEC 62443 zone boundary + conduit notation
- [ ] 1.3 C4 notation (person, system, container, boundary)
- [ ] 1.4 Data diode / air gap, SIS + SIL band, voting (1oo2, 2oo3)
- [ ] 1.5 Vectorize ~40 CISA CSET OT assets from raster (PLC, RTU, DCS, IED,
      historian, HMI, EWS, unidirectional device)
- [ ] 1.6 Parametric `<InstrumentBubble tag loop device location>` replacing 24
      ambiguous stencils

**GATE 1** — every symbol strokes `currentColor`, fills none, fits the 32-unit
cell; contrast ≥ 3:1 both themes; bubble renders ≥ 4 distinct device classes;
zero invented classification markings.

### Phase 2 — Sector packs

- [ ] 2.1 water — clarifier, digester, UV, chlorination, lift station, screening
- [ ] 2.2 energy — BESS, PV, inverter, transformer, breaker, bus, ANSI devices
- [ ] 2.3 manufacturing — robot, CNC, conveyor, AGV, press, weld cell
- [ ] 2.4 datacenter — CRAC, chiller, PDU, genset, ATS, containment

**GATE 2** — each pack resolves every symbol its sector page names in prose.

### Phase 3 — Manifest, not curation

- [x] 3.1 Build-time map of all tokenizable stencils —
      `src/components/twin/drawio-manifest.ts`, emitted by
      `scripts/build-drawio-glyphs.mjs` off the same `loadStencils()` pass that
      passes Gate 0. No second converter: each entry's markup comes from
      `paintToSvg`, the compiler's own emitter, so `pid/valves/gate_valve` in the
      manifest is byte-identical to the curated `GateValve` component
      (`translate(5.000 9.265) scale(0.22449)`, `M 0 60 L 0 0 L 98 60 L 98 0 Z`,
      stroke 5.7909).
- [x] 3.2 `<DrawioGlyph src="pid/vessels/…"/>` inlining from the map —
      `src/components/twin/drawio-glyph.tsx`. `resolveSymbol` tries
      `GLYPH_REGISTRY`, then the `isa/` grammar, then the manifest, so the
      curated corrections still win and coverage can never silently override
      one. `declaredPorts` reads manifest ports, so a manifest symbol lands its
      lines on nozzles rather than on the cell edge.
- [ ] 3.3 Tier the named set: T0 ~70 · T1 ~430 · T2 ~200 · T3 on-demand

**GATE 3 — PASSED**, measured 2026-08-29:
- resolvable slugs **118 → 1,082** (118 curated, 1,007 manifest, 43 overlapping
  where the curated table wins) plus the open `isa/` grammar
- an unresolvable slug still throws: `pid/vessels/forced_draft_kooling_towerr`
  took `/en/diagram-gallery` to HTTP 500 with `DiagramSymbolError` from
  `assertSpecResolves`, naming the slug and now suggesting `pid/vessels/tower`
  out of the manifest rather than only out of the 118
- a NEVER-hand-wired slug renders with no registry edit:
  `pid/vessels/forced_draft_cooling_tower` drew, and its process line terminated
  at 361.29,58.00 — the stencil's own `W` constraint at cell (9.29, 16) — not at
  the cell edge (352.00)
- manifest 451.5 KB raw / 52.4 KB gzipped for 1,007 shapes and 2,698 ports;
  **0 bytes of client bundle impact** — 0 production client chunks contain it,
  2 server chunks do, because the whole diagram subsystem is server-rendered
- `compile-stencils.mjs --verify` exit 0 · `tsc --noEmit` clean · `eslint` clean
  on every touched file · `/en` and `/nl` 200 · `measure.mjs` 2/2 clear,
  `exempt=0`

### Phase 4 — The diagram contract

- [ ] 4.1 `DiagramSpec { type, sector, nodes[{symbol,tag,zone}], edges[{from,to,kind}] }`
- [ ] 4.2 One React component per diagram TYPE, not per page
- [ ] 4.3 `elkjs` layout in Node inside the component, so tokens/i18n/contrast survive
- [ ] 4.4 Edge kinds: process, pneumatic, electrical, data-link, capillary

**GATE 4** — a spec renders with no page-specific code; `measure.mjs` clears.

### Phase 5 — Facility drawings (Blender, narrow)

- [ ] 5.1 `scripts/blender-facility-svg.py` — model + facility-graph → layered SVG
- [ ] 5.2 Join `facility-graph.json` (zone/purdue/sl_target) to SVG groups
- [ ] 5.3 Shared isometric constant `(54.736°, 0, 45°)`

**GATE 5** — ≤ 150 KB gzip, themes correctly, no text baked in.

### Phase 6 — Image debt (independent, parallelisable)

- [ ] 6.1 `public/` 78 MB → WebP (97% reduction measured available)
- [ ] 6.2 Replace 95 raster-wrapped fake SVGs in `asset_icons`
- [ ] 6.3 Per-section OG cards (1 route currently serves 51 pages)
- [ ] 6.4 `scrub-intake` (`magick -strip`) for customer-supplied drawings

**GATE 6** — no file in `public/` > 400 KB; 0 raster-wrapped SVGs.

### Phase 7 — The proof

- [ ] 7.1 Energy diagram
- [ ] 7.2 Water diagram
- [ ] 7.3 Manufacturing diagram
- [ ] 7.4 Independent visual audit, 4 axes, scored
- [ ] 7.5 Defect loop until all three ≥ 90%

---

## Team structure

Max 4 concurrent · Opus on every call · native Agent tool.

| Team | Role | Tools |
|---|---|---|
| A · geometry | stencil compiler, oracle diff | draw.io headless, Node |
| B · symbols | draw the missing 45, vectorize CSET | hand SVG, potrace |
| C · composition | DiagramSpec, elkjs, React | Node, React |
| D · audit | independent visual QA, scoring | Playwright, browser |

**Never** `ruflo agent_execute` — it bills OpenRouter. **Never** > 4 concurrent.
Read-only agents may run concurrently; writers get non-overlapping file scopes.

## Errors encountered

| # | Error | Attempt | Resolution |
|---|---|---|---|
| 1 | Regex codemod broke 5 `ThreeGateLedger` files, 102 tsc errors | 1 | Reverted via git. Codemod unsafe for JSX nesting — use per-file edits |
| 2 | `pid-symbols` delegation thinned datum bubble 4.4x | 1 | Coordinate-space mismatch; callers must not set `stroke-width` |
| 3 | Visual check at low magnification passed a 25%-clipped mark | 1 | Always measure geometry numerically, never eyeball at render size |
