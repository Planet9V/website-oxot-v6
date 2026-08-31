# OXOT Diagramming Spec — Network, Purdue, Process, P&ID, and Threat-Model Diagrams

**Status:** Draft, derived from real library research (verified against source code, GitHub PRs/issues, npm registry, and live testing — not marketing claims). Not yet built.
**Governs:** every diagram component under the Twin/Decision/Assurance component families defined in `OXOT_Visual_Foundation_Spec.md` §13 (in the `oxot_website_public_sept` repo's `new_material_source/1_website_layout_v4/`) — `TwinExplorer`, `AssetNode`, `PathEdge`, `ZoneBand`, `ConduitGate`, `LayerCanvas`, and any P&ID or attack-path visual.
**Derived from:** `stage_1_opus/independent_research_findings.md` and `stage_1_opus/comparison_vs_existing_system.md` (component contracts, ARIA requirements), plus two dedicated 2026-08-24 library research passes (layout/rendering stack; P&ID symbols + threat-model tooling) — findings and evidence summarized below, full agent reports available in the originating session.

---

## 1. The stack

**Layout: elk.js.** **Rendering: hand-authored SVG.** **Not Cytoscape.js, not React Flow, not any charting library.**

### 1.1 Why elk.js

- Actively maintained (`elkjs@0.12.0`, published 2026-07-17, zero runtime dependencies), 6.9M weekly downloads.
- Verified live: a 6-layer, 7-edge Purdue-shaped test graph run through `elk.algorithm: 'layered'` + `elk.edgeRouting: 'ORTHOGONAL'` produced clean, non-overlapping orthogonal routing — layer-skipping edges were automatically assigned their own routing channel, separate from the step-routed edges. This is exactly the "clean lines between objects" requirement.
- One engine covers all five required layout modes (§3 below) — hierarchical/layered for Purdue and process flow, `stress`/`force` for free network topology, native compound-node support for consequence-chain collapsing.

### 1.2 Why NOT Cytoscape.js — two disqualifying, independently verified problems

1. **The `cytoscape-elk` adapter discards ELK's routing output entirely.** Source inspection (`src/layout.js`) shows the adapter reads only node positions from ELK — a full-source grep for `bendPoints`, `sections`, `edgeRouting` returns zero matches. Cytoscape then draws its own default bezier/taxi edges from scratch, ignoring the orthogonal geometry ELK computed. Three separate PRs attempting to fix this (2021, 2024, 2026) have not merged; the most recent is still open. **Pairing elk.js with Cytoscape.js would not produce orthogonal routing** — the one property motivating the pairing.
2. **Cytoscape renders to `<canvas>` only.** There is no SVG renderer in `cytoscape@3.34.1`. A `<canvas>` is one opaque DOM node — no per-node elements exist to carry `role`, `aria-label`, or `tabindex`. A full-source grep for `aria-`/`role=`/`tabindex` returns zero matches anywhere in Cytoscape's codebase. The maintainer has explicitly stated (GitHub issue #3091) that accessibility "needs to be built at the app level" and is out of scope for the library — and the canvas architecture makes that structurally impossible to do from the outside. This fails the exact accessibility bar that already ruled out React Flow, and fails it harder (React Flow at least renders real DOM elements you can annotate).

### 1.3 Resulting architecture

```
ELK graph spec (nodes + edges + layoutOptions)
        │  elk.layout() — run at BUILD TIME wherever possible
        ▼
{ children: [{id,x,y,width,height}], edges: [{sections:[{startPoint,bendPoints,endPoint}]}] }
        │  hand-authored render layer
        ▼
<svg role="graphics-document document" aria-labelledby="...">
  <g role="graphics-symbol img" aria-roledescription={assetType} aria-label={assetLabel} tabindex="-1">  <!-- AssetNode, roving tabindex -->
  <path d="M startPoint L bendPoint L bendPoint L endPoint" />                                            <!-- PathEdge, from ELK's own bend points -->
  <desc> / visually-hidden <ol>                                                                            <!-- ScenarioSummary text equivalent -->
```

- **Run ELK at build time, not in the browser, wherever the diagram's content is static** (which is most OXOT diagrams — authored scenarios, not live network scans). This means zero layout JavaScript ships to the browser; the page serves static, accessible, crawlable SVG. Reserve client-side ELK execution for genuinely interactive diagrams (e.g., a live Object Trace mode where the user picks a different asset).
- If ELK does run client-side, import `elkjs/lib/elk.bundled.js` directly — elkjs's default web-worker import has caused repeated bundler-resolution issues (`Could not resolve 'web-worker'`) in other projects; the bundled build sidesteps this.
- **ELK bend points map directly to an SVG path** (`M x,y L x,y L x,y`, optionally with a small arc rounding each bend) — no adapter, no lossy translation layer. This is materially less work than trying to force ELK's geometry through Cytoscape's edge model, which multiple PRs have failed to do since 2021.
- **Author the ARIA/roving-tabindex layer once, reuse it across all five diagram types.** `role="graphics-document"` / `role="graphics-symbol"` (WAI-ARIA Graphics Module) on the SVG root and nodes; roving tabindex so one tab stop enters the diagram and arrow keys move between nodes (directly answers the "should users tab through thousands of elements?" objection that got both React Flow and Cytoscape ruled out); a visually-hidden `<ol>` mirroring the graph as structured text, which for a Purdue diagram is often *more* legible than the visual ("Level 3 Operations connects downward to Level 2 HMI and Level 1 PLC"); `prefers-reduced-motion` honored on any path-tracing animation.

### 1.4 Layout ≠ graph algorithms — scope boundary

ELK computes **where things go on screen**. It does not compute **which paths exist between two assets** — that's a graph-algorithms question (the networkx/graphology space), and it's a different tool for a different job. OXOT's data contract (`TwinScenario.attackPathIds`, `ProposedControl.closesPathIds`, etc.) is author-supplied, not computed live — content authors decide which paths a scenario illustrates, and ELK only lays out what's already been decided. **Do not add a graph-algorithms library (e.g. `graphology`) unless a genuine need for live path computation emerges** (e.g. an internal authoring tool that suggests paths from a raw topology) — it is not required for rendering authored marketing scenarios and would be scope creep against YAGNI.

---

## 2. Symbol libraries — adopt, don't hand-draw

### 2.1 P&ID symbols

**Primary source: Wikimedia Commons, `Category:P&ID symbols`, ISO 10628-2 set — public domain.** ~250-300 SVGs (26 subcategories: agitators, apparatus elements, centrifuges, columns, compressors, cooling towers, driers, engines, fans, filters, and more), verified public domain with no attribution requirement (`UsageTerms: Public domain`, `Restrictions:` empty), already in SVG format.

**Supplement: draw.io `stencils/pid`, Apache-2.0.** 600+ shapes across 24 files (valves, pumps, instruments, vessels, piping, heat exchangers, fittings, flow sensors, separators, compressors, filters). Format is mxGraph stencil XML (not SVG directly) — a small conversion script handles `<move>`/`<line>`/`<close>` → SVG `path d`. **The `<connections>` block in each stencil is worth more than the shape itself** — normalized anchor points (e.g. `x="0.38" y="1"`) for attaching flow lines, saving significant hand-placement work.

**Curate to ~15-25 symbols for marketing use** — not the full 600+. A simplified, illustrative P&ID needs: vessel/tank, pump, valve (gate/control/check), heat exchanger, compressor, instrument bubble, PLC/controller, sensor, pipe/signal line. This matches the mapping table's own "simplified P&IDs" framing — not engineering-accurate CAD output.

**Licensing rule — do not skip this:** ANSI/ISA-5.1 (the "standard" name most people reach for) is copyrighted, per-seat licensed, and ISA's terms explicitly prohibit feeding ISA IP into AI tools or generating AI-derived works from it without written permission. **Never trace, reference, or AI-generate from an ISA-5.1 PDF.** Say "ISA-5.1-*style*" in copy if needed — the visual vocabulary is the same, but the actual geometry must come from the public-domain ISO 10628-2 route above, which covers equivalent ground unencumbered.

The draw.io stencil license carries one narrow carve-out (an Atlassian-marketplace restriction) that does not bind OXOT as a standalone site — only relevant if OXOT ever ships a Jira/Confluence integration.

**Do not buy Symbol Factory Universal** ($695, per-computer license) — it's licensed for internal HMI/SCADA tooling, not public redistribution on a website; the free route above is both cheaper and cleaner.

### 2.2 Threat-model / attack-path data model

**Adopt MITRE Attack Flow's schema** (Apache-2.0, `center-for-threat-informed-defense/attack-flow`) as OXOT's internal attack-path data model, rather than inventing an ad-hoc vocabulary. Five object types:

| Object | Key properties |
|---|---|
| `attack-flow` | `name`, `description`, `scope`, `start_refs` |
| `attack-action` | `tactic_id`, `technique_id`, `description`, `asset_refs` |
| `attack-asset` | `name`, `description`, `object_ref` |
| `attack-condition` | `pattern`, `on_true_refs`, `on_false_refs` |
| `attack-operator` | `operator` (AND/OR), `effect_refs` |

This is small enough to adopt directly, maps cleanly onto ELK nodes/edges, carries real ATT&CK-technique references via `attack-action.technique_id`, and gives proper AND/OR branching for genuine attack *trees* via `attack-operator` — not just linear chains. It's also a recognized convention: an OT-security-literate visitor will recognize the grammar, which is a credibility signal in itself.

**Do not adopt any threat-modeling tool as a dependency.** OWASP Threat Dragon publishes no npm package at all (confirmed — searched 3 name variants, zero results) and is a Vue monolith. MITRE's own Attack Flow Builder declares `"private": true` in its `package.json` — an explicit statement it is never published. Neither is embeddable in a React app regardless of framework compatibility.

**Study MITRE's 41-flow corpus for structure** (real incidents: NotPetya, REvil, Conti, Equifax, etc.), then **author synthetic OT scenarios in the same grammar** — this satisfies the mapping table's "notional and synthetic" requirement while matching the recognized convention.

### 2.3 The competitive reality — this is differentiation, not table stakes

Every competitor checked (Dragos, Claroty, Nozomi, Wiz, Microsoft Security Exposure Management) ships these diagrams as **static raster images**, not interactive components — verified by fetching and inspecting their actual page HTML, not assumed. Notably, Claroty's Purdue-model diagram is a recycled asset originally published on an unrelated VPN blog post (`vpn-blog-image-1-purdue-model...`), and even MITRE's own Attack Flow reference site renders its example flows as static Graphviz PNGs. **No competitor has a real interactive, accessible, theme-aware version of any of these diagram types.** Building one with ELK + hand-authored SVG — responsive, dark/light-mode-aware using the OXOT signal palette, and actually screen-reader-navigable — would put OXOT ahead of the category, not merely at parity. This argues for treating diagram quality as a genuine product differentiator worth real build investment, not a checkbox to rush.

---

## 3. The five required layout algorithms (one per `TwinView`)

| `TwinView` | ELK configuration | Notes |
|---|---|---|
| `purdue` | `elk.algorithm: 'layered'`, fixed `layerConstraint` per `SystemAsset.zone` | Verified live — clean banding, layer-skipping edges auto-routed into a separate channel. Never force-directed (destroys the banding the view exists to show). |
| `network` (free topology) | `elk.algorithm: 'stress'` or `'force'` | For unconstrained topology views. |
| `process` (material/energy flow) | `elk.algorithm: 'layered'`, `elk.direction: 'RIGHT'`, port constraints | Ordered left-to-right flow matching operator mental models. |
| `attackPath` | `elk.algorithm: 'layered'` + `ORTHOGONAL` routing; highlight the traced path in the render layer | Geometry from ELK, path-trace styling/animation is yours (see §3.4 of the Foundation Spec for the 300-500ms motion band). |
| `consequence` (collapsed chain) | `elk.algorithm: 'layered'` using ELK's native hierarchy/compound-node support | Collapses to the `ConsequenceChain` sequence. |

Same substrate (`TwinExplorer` root SVG, `AssetNode` glyphs, `PathEdge` encoding) renders all five — only the ELK layout options and the data slice change. See `stage_1_opus/independent_research_findings.md` §2 for the full component-tier breakdown (`AssetNode`'s 9 glyphs per `SystemAsset.type`, `PathEdge`'s three-axis encoding: color←`status`, stroke geometry←`role`, glyph←`criticality`, `ZoneBand`, `ConduitGate`/`ChokePointMarker`, `CanvasLegend`, `ScenarioSummary`).

---

## 4. Open items before build

- No component code exists yet for any of this — confirmed via the `stage_1_opus` comparison (0/6 Twin-family components present in the current `OXOT_Component_Inventory.md`). This spec is the build contract; implementation has not started.
- The 15-25 curated P&ID symbols need to be selected and converted (Wikimedia SVGs are ready to use directly; draw.io stencils need the XML→path conversion script written first).
- The synthetic OT attack-flow scenarios (Water/Rail/Hyperscale/Defense, per the mapping table's four worked chains) need authoring in the MITRE schema before any attack-path diagram can render real content.
- Build-time vs. client-time ELK execution needs a per-diagram-type decision once page-level interactivity requirements are finalized (static explorer view vs. live Object Trace mode).

## Sources

Full evidence trails (source-code inspection, GitHub PR/issue links, npm registry data, live ELK test output, competitor HTML inspection) are in the two 2026-08-24 research agent reports this spec was synthesized from — see the originating session's `stage_1_opus/` continuity record for pointers if needed. Key primary sources: `github.com/kieler/elkjs`, `github.com/cytoscape/cytoscape.js-elk` (PRs #38, #51; issue #47), `github.com/cytoscape/cytoscape.js` (issue #3091), `commons.wikimedia.org/wiki/Category:P%26ID_symbols`, `github.com/jgraph/drawio` (`stencils/pid`), `github.com/center-for-threat-informed-defense/attack-flow`.
