# Using the symbol library

**For:** anyone building or updating a page that contains a drawing.
**Written** 2026-08-29 against the code in this worktree. Every number below was
measured or read out of source; the file or command is named beside it.

The library holds **1,082 resolvable symbol slugs** plus an open ISA instrument
grammar. Until 2026-08-29 it was used by exactly one internal unlinked page
(`/[locale]/diagram-gallery`) while the public industries pages hand-drew
everything. That is the imbalance this document exists to correct.

It corrects it by giving you a **decision procedure**, not a mandate. "Always use
the library" is the wrong rule and would make several existing pages worse — see
§1. Read §1, act on it, and come back for the rest only when §1 says the library
is in play.

---

## 1. The decision procedure

Answer these in order. **Stop at the first YES.** This should take under a minute.

| # | Question | If YES |
|---|---|---|
| 1 | Does the drawing's meaning depend on **colour** (a red path vs a green one) or on **per-edge state** (this link is compromised, that one is proposed)? | **Not a `DiagramSpec`.** The contract has no colour channel and no edge state. Keep the bespoke layout; you may still drop individual glyphs into it (§4). |
| 2 | Does it need **elevation** — a hydraulic profile, a gravity fall, anything where y-position is the claim? | **Hand-draw.** `DiagramNode` has no `x`/`y`; ELK assigns both. There is no way to say "this vessel sits 4 m lower". |
| 3 | Does it **animate**, or change on **user interaction** (select, hover, step through)? | **Not a `DiagramSpec`.** `Diagram` is an async Server Component doing build-time ELK layout. Individual glyphs only (§4) — they are plain `<g>` fragments and compose fine inside a `"use client"` canvas, subject to the import rule in §3.1. |
| 4 | Is it a **hero illustration, brand mark, or a deliberately loose/inviting graphic**? | **Leave it alone.** An ISA-accurate drawing can be *worse* on a marketing page: correct and cold beats nothing, but it loses to a warm graphic that was doing a different job. |
| 5 | Is it a **standards-governed drawing** — P&ID, single-line, Purdue / IEC 62443 zoning, network or system architecture? | **Strong `DiagramSpec` candidate.** Go to §2. |
| 6 | None of the above — a simple block or flow chart with 5–25 nodes and no colour semantics? | **Weak `DiagramSpec` candidate.** Worth it mainly for the free accessible restatement and the layout you no longer maintain. Judge on §8's honest caveats first. |

### Why question 1 is first

It is the discriminator that actually fires. An independent analysis of
`/industries/water-wastewater-3` found **four of its five drawings carry their
meaning in colour and edge state**, which the contract structurally cannot
express. Converting them would replace meaning with monochrome.

Measured in this worktree (`src/components/industries/water-wastewater-3/`):

| File | Lines | Coordinate-bearing attrs | Meaning carried by |
|---|---|---|---|
| `HeroPathCanvas.tsx` | 415 | 48 | amber endpoint chip (`--signal-amber`) |
| `ProcessCanvas.tsx` | 315 | 59 | cyan / blue / amber layer tokens |
| `ScenarioTrace.tsx` | 269 | 25 | per-step `token: "blue" \| "red" \| "amber"` |
| `ThreeGateLedger.tsx` | 542 | 30 | `marked` edge state, `isSelected`, `"use client"` |
| **total** | **1,541** | **162** | |

`ThreeGateLedger.tsx` is `"use client"` and `HeroPath.tsx` (which mounts
`HeroPathCanvas`) is too, so questions 1 and 3 both fire on that page. The right
outcome there was the one taken on 2026-08-29: keep the bespoke canvases,
**swap the individual marks inside them** (§4).

### What the library did fix on that page

Before the swap, 12 asset nodes drew from 9 type silhouettes, so:

- `chemical-metering-pump` and `hypochlorite-dosing-skid` are both
  `process-equipment` and drew the **same open-topped cistern**. A metering pump
  drawn as an open tank is not coarse, it is false.
- `raw-water-flow-meter`, `chlorine-residual-analyser` and
  `chemical-tank-level-transmitter` are all `field-device` and drew the **same
  circle-plus-waveform** — three instrument loops, one mark, no tag letters.

Fixed by naming a `symbol` slug per asset, at a measured cost of **4.6 KB gzip
site-wide**. Doing it through `resolveSymbol` instead would have cost ~53.6 KB
gzip. That gap is §3.1.

---

## 2. The `DiagramSpec` contract

`src/components/diagrams/types.ts`. A spec says **what** to draw. It never says
where anything goes, what colour it is, or which SVG element carries it.

```ts
interface DiagramSpec {
  type: "pid" | "purdue" | "network" | "block" | "process" | "c4";
  sector?: "water" | "energy" | "manufacturing" | "datacenter";
  title: Bilingual;                    // { en, nl }
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}
```

**Node fields** — `id`, `symbol` (slug, §5), `label` (`Bilingual`), and optional
`tag` (ISA loop tag, §6), `zone` (IEC 62443 zone name), `purdue`
(`0|1|2|3|3.5|4|5`), `render` (`"bus" | "inline" | "reference"`; omitted,
`BlockDiagram` derives it).

**Edge fields** — `from`, `to`, `kind`, and optional `label`, `fromPort`/`toPort`
(name a nozzle when bearing cannot infer it), `sharedSystem` (ISA-5.1 Table 5.3.2:
open circles = one shared control system, filled = independent systems; filled is
the default), `bidirectional`, `rankReversed` (flips the edge for ELK ranking
only — the drawn arrow and the accessible text are unchanged).

**Edge kinds** map to **stroke treatments, never to colours**
(`edge-line.tsx`): `process`, `power-ac`, `power-dc`, `pneumatic`, `electrical`,
`data-link`, `capillary`. `power-ac`/`power-dc` are solid because in drafting
convention dashed means signal; an earlier energy drawing ran an 11 kV incomer
and a Modbus link as the same dashed `electrical`, so a megawatt and a
measurement read identically.

**What `type` actually changes** (`layout.ts`, `Diagram.tsx`): the ELK options
and the spoken type name. `network`, `block`, `process` and `c4` all render
through `BlockDiagram`; `pid` → `PidDiagram`, `purdue` → `PurdueDiagram`.
`pid`/`block`/`process`/`purdue` lay out `RIGHT`; `network`/`c4` lay out `DOWN`.

### Mounting one

```tsx
import { Diagram } from "@/components/diagrams/Diagram";
import { WATER_TREATMENT_TRAIN } from "@/components/diagrams/specs/water-treatment-train";

<Diagram id="dg-water" locale={locale} spec={WATER_TREATMENT_TRAIN} />
```

`Diagram` is `async` and awaits ELK in Node. It emits a `<figure role="img">`
holding the SVG (`aria-hidden`) plus a sibling `sr-only` block restating every
node with its tag, Purdue level and zone, and every edge with its ISA line kind.
The restatement sits **outside** the figure on purpose: `role="img"` makes an
element a leaf in the accessibility tree, so text inside it is not exposed.

The worked reference is `src/components/diagrams/specs/water-treatment-train.ts`
— 512 lines, 29 nodes, 36 edges, and roughly half of it is doc comment recording
why each symbol is the one it is. Read it before authoring a spec.
`src/app/[locale]/diagram-gallery/page.tsx` shows how specs are mounted.

---

## 3. Hard constraints

Each of these exists because of a specific incident or measurement.

### 3.1 Never import `resolveSymbol` or `DrawioGlyph` into a `"use client"` component

`src/components/diagrams/types.ts::resolveSymbol` falls through to
`src/components/twin/drawio-manifest.ts` — **462,361 bytes of source**, 451.5 KB
raw / 52.4 KB gzipped. The diagram subsystem can afford it because every module
there is server-only and the manifest never reaches the browser (measured: 0
production client chunks contain it, 2 server chunks do).

`src/components/twin/AssetNode.tsx` cannot, because its consumers sit under
`"use client"` boundaries. It therefore imports the curated modules **directly**
(`./cset-glyphs`, `./pid-hand-drawn`, `./instrument-bubble`) and carries its own
9-slug `CURATED_SYMBOLS` table plus the `isa/` regex. **That file must never
import `../diagrams/types` or `./drawio-glyph`.**

Verify with `next build`, then grep the built chunks for a manifest-only token:

```bash
npm run build
grep -rl "forced_draft_cooling_tower" .next/static/chunks   # must be empty
grep -rl "DRAWIO_STENCILS"            .next/static/chunks   # must be empty
```

Use two independent non-hardlinked copies if you are diffing bundle size against
`HEAD`. `rsync --link-dest` shares inodes with the repo and a
`git show HEAD:f > copy/f` will write **through** it and revert your work — that
happened once, on 2026-08-29, and cost five files.

### 3.2 An unresolvable slug is a build error, and that is the design

`assertSpecResolves` throws `DiagramSymbolError` before anything is measured or
drawn. `Diagram` is an async Server Component, so the throw happens inside
`next build` and fails it; at dev time it 500s the whole route — **not just the
offending diagram**. That is Gate 3 in `task_plan.md`, and it has fired for real:
on 2026-08-28 an agent authored five glyphs but crashed before wiring them, and
the energy spec's dangling slugs took every diagram on the gallery to HTTP 500.

**Never "fix" this with a fallback box.** A grey rectangle labelled "Programmable
logic controller" looks intentional in a screenshot; that is precisely how a
missing symbol becomes an invisible visual compromise instead of a tracked work
item. The error reports *every* unresolved slug at once, with nearest-match
suggestions drawn from the manifest as well as the registry, so a spec with six
gaps takes one fix cycle rather than six.

`assertSpecResolves` also enforces two structural invariants: no edge may
reference a node id that does not exist, and **every node in a `purdue` diagram
must carry a `purdue` level**. Guessing a level would put an asset in the wrong
zone, which is the worst single thing an OT security drawing can do.

`AssetNode.tsx::assetGlyph` deliberately does the **opposite**: an unresolvable
slug falls back to the type silhouette and `console.warn`s once, naming the slug
and the fix. The trade differs because there the symbol is an improvement on a
silhouette that is already correct at type resolution, and taking an industry
page down over it would be wrong. Silence would be worse than either.

### 3.3 Glyph discipline

Every glyph is a `<g>` **fragment**, never a standalone `<svg>`, whose
coordinates are already in a **32-unit cell** with a **22-unit live area
(x/y 5..27)**. Every path strokes `currentColor`, fills nothing except where ISA
requires it, at a uniform **1.3** weight.

**Callers set colour only, never weight.** `strokeWidth` on a glyph is a literal
cell-unit number with no scale transform to undo, and a presentation attribute on
a child beats anything inherited from an ancestor — so a caller's `strokeWidth`
is either silently inert (the bug that shipped in `Rule.tsx`) or written in the
wrong coordinate space (the bug that thinned a datum bubble 4.4×; error #2 in
`task_plan.md`). Set colour with a class on a wrapping `<g>`, the way
`AssetNode.tsx::inMutedInk` does.

### 3.4 Legibility floors

| Mark family | Floor | Where it comes from |
|---|---|---|
| ISA instrument bubble, standalone | **44 rendered px** | `instrument-bubble.tsx` — `<InstrumentBubble size>` clamps to `Math.max(BUBBLE_CELL, size)`. Below it the identification letters, the only thing telling one bubble from another, stop being readable. |
| ISA lettering inside a diagram | **11 css px** | `MIN_RENDER_SCALE = 1.16` in `layout-shared.ts:86`, derived: the loop numeral is 9.545 user units, 11 / 9.545 = 1.152. `Diagram` enforces it via `style={{ minWidth: layout.width * MIN_RENDER_SCALE }}` — below the floor the figure widens past its column and scrolls inside its own box, which is strictly better than illegible. |
| ISA bubble inside a 32-unit asset cell | fit by **outline**, not by cell | `AssetNode.tsx` scales the 34-unit circle to 28 of the 32-unit cell (`ISA_SCALE` 0.8235), so the whole 44-unit cell lands at 36.24 with a negative inset. Nothing clips, because for `discrete`/`field` the circle *is* the whole mark. Tag reaches 9.06 cell units against 8.0 for a naive whole-cell fit. |
| CSET marks | **~29 px cell**, derived below | Not a constant in code — derive it per mark. |

**Deriving the CSET floor.** The tightest feature in the set is `cset/plc`'s rack
brick joints: two ticks 2.4 cell units apart at 1.3 stroke, leaving 1.1 units of
white. For ≥ 1 css px of white on a 1× raster the cell must be ≥ 32 / 1.1 ≈
**29.1 px**. This is consistent with the ww3 measurement, where an S07 glyph box
rendering at 27.1 px was judged too small and raised to 32.1 px. Other CSET
families are looser — field pins at 3.2-unit pitch, firewall shield bars at 3.6 —
so **measure the mark you are actually using** rather than trusting one number.

**How to test.** Screenshot at `deviceScaleFactor: 1` and nearest-neighbour
upscale **that raster**. A 4× vector screenshot hides stroke merging entirely,
and that is how several defects shipped. Corollary from `task_plan.md` error #3:
a visual check at low magnification once passed a mark that was 25% clipped —
**always measure geometry numerically, never eyeball at render size.**

### 3.5 Both languages, always

Every user-facing string is `Bilingual` — `{ en, nl }` with **real Dutch, not an
English placeholder**. This is BUILD-LAW §8, and the diagram subsystem is
covered by it twice over: `spec.title`, every `node.label`, every `edge.label`,
and every zone name reachable through `ZONE_LABEL`.

An unmapped `zone` falls back to its key and warns once rather than throwing — a
spec may name a new zone, and an English word in Dutch text is a smaller failure
than a page that will not render. But it *is* a failure: until 2026-08-29 a Dutch
screen-reader user heard "zone Raw water intake" while the drawn perimeter two
elements away said "Externe zone". Add the entry.

---

## 4. Individual glyphs, bespoke layout

The middle option, and usually the right one for a real page. You keep your own
canvas, coordinates, colours, state and animation; you replace only the *marks*.

Two entry points:

**Server-side** (a spec-free drawing in a server component):

```tsx
import { DrawioGlyph } from "@/components/twin/drawio-glyph";

<svg viewBox="0 0 32 32"><DrawioGlyph src="pid/vessels/container_tank_cistern" /></svg>
```

Throws on an unknown slug, naming nearest matches. **Server components only** —
see §3.1.

**Inside a client boundary** (the ww3 pattern): give the data record a `symbol`
slug and let `assetGlyph` resolve it.

```ts
// content.assets.ts
{ id: "chemical-metering-pump", type: "process-equipment",
  symbol: "oxot/water/metering_pump", label: "…", zone: "Treatment" }
```

```tsx
// any canvas, client or server
import { assetGlyph } from "@/components/twin/AssetNode";
{assetGlyph(asset)}
```

Note the call form: `{assetGlyph(asset)}` returns an **element**, never
`const G = assetGlyph(asset); <G />`. React Compiler's
`react-hooks/static-components` rejects binding a component from a call, because
in general a call returns a fresh component and React remounts a subtree whose
element type identity changed. Returning the element keeps the memoisation, keeps
identity stable, and leaves nothing to suppress.

To use a slug not yet in `CURATED_SYMBOLS`, add one line to that table in
`AssetNode.tsx`, importing from `./cset-glyphs`, `./pid-hand-drawn`,
`./ot-notation` or `./instrument-bubble`. The table is **the used set, not the
published set**, deliberately: `cset-glyphs` publishes 45 marks and
`pid-hand-drawn` nine, and enumerating all 54 would pin every one into the client
bundle to serve the nine an inventory actually names.

Manifest-only slugs (`pid/…`, `electrical/…` not in the curated table) **cannot**
be used this way. That is not a bug to route around; it is §3.1.

---

## 5. Finding a symbol

### 5.1 What resolves, and in what order

`resolveSymbol(slug)` tries three paths, and the order is the design:

1. **`GLYPH_REGISTRY`** (118 slugs) — wins outright. Includes deliberate
   *corrections* of stencils draw.io ships wrong: `pid/valves/globe_valve` is
   byte-identical to `ball_valve` in draw.io's own `valves.xml`, and four
   `electrical/electro-mechanical/…` marks collapse into blobs at this drawing
   size.
2. **The `isa/` grammar** — parametric, matched not looked up.
3. **The compiled manifest** (1,007 slugs) — fall-through, deliberately last, so
   added coverage can never silently override a correction.

Counts, computed from source:

| Source | Slugs |
|---|---|
| `drawio-manifest.ts` | **1,007** (`electrical` 529, `pid` 478) + 2,698 harvested connection ports |
| `GLYPH_REGISTRY` | **118** (`pid` 32, `electrical` 11, `oxot` 21, `ot` 9, `cset` 45) |
| of which overlap the manifest | 43 (registry wins) |
| **Unique resolvable** | **1,082** + the open `isa/` grammar |

### 5.2 Namespaces

| Prefix | Means | Source |
|---|---|---|
| `pid/…` | draw.io's own P&ID stencil path, `<group>/<file>/<shape>` | compiled from draw.io 31.3.2 mxGraph XML, oracle-verified at 0.9995 IoU |
| `electrical/…` | same, for IEC 60617-family electrical marks | same |
| `cset/…` | OT/IT asset **portraits** — PLC, RTU, historian, firewall… | CISA/INL's CSET taxonomy, geometry redrawn. **MIT, © Battelle Energy Alliance — not US-government public domain.** Any surfaced provenance must say so. |
| `ot/…` | notation no stencil library publishes — data diode, air gap, zone perimeter, conduit, C4 person/system/container | drawn for this site |
| `oxot/…` | marks this project drew because nothing publishes them — clarifier, clearwell, UV reactor, metering pump, bar screen, chemical day tank, transformer, PV array, make contact… | drawn for this site |
| `isa/…` | the one **parametric** family: instrument bubbles with real letters | drawn for this site |

**`oxot/` is never `pid/` or `electrical/`.** Those namespaces belong to draw.io,
and a transformer addressed as a terminal strip is a lie in the address itself.

Use `cset/…` in architecture, Purdue and zone drawings. On a P&ID an engineer
expects the ISA bubble, not a rack portrait.

### 5.3 The `isa/` grammar

```
isa/<device>/<location>/<2-5 UPPERCASE ISA LETTERS>[-<loop>]

device    discrete | shared | computer | plc | sis      (ISA-5.1 Table 5.1.1)
location  field | panel | rear | local-panel | local-panel-rear
```

```
isa/discrete/field/FT-101       field-mounted flow transmitter
isa/shared/panel/AIC-601        DCS shared-display analysis controller
isa/sis/panel/ZSH-201           safety-instrumented guard-position switch
isa/plc/panel/UY-901            PLC-resident computing function
isa/computer/rear/KQI-410       software totaliser, rear of the main panel
```

The grammar is **closed**: an unknown device class, an unknown location, a
lowercase tag or a six-letter tag matches nothing and fails the build like any
other bad slug. What is open is the **tag space**, which is content.

Watch the device class against the cell you are drawing into. `plc` and `sis`
draw a circle inscribed in a **diamond** on the full 44-unit cell, which overflows
a 32-unit cell — that is why `dosing-high-low-alarm` on ww3 keeps a hand-drawn
octagon instead of `isa/plc/panel/LAHL-501`.

### 5.4 The search recipe

```bash
# 1. Does the manifest have it? (draw.io's own naming — search the tail)
grep -o '"pid/[a-z_0-9/]*"' src/components/twin/drawio-manifest.ts | grep -i tank

# 2. What is in a category?  (pid/valves has 32; pid/vessels 63; pid/misc 82)
grep -o '"pid/vessels/[a-z_0-9]*"' src/components/twin/drawio-manifest.ts

# 3. Is there a curated correction that wins over it?
grep -n 'pid/valves/globe_valve' src/components/diagrams/types.ts

# 4. What did this site already draw itself?
grep -n '"oxot/\|"ot/\|"cset/' src/components/diagrams/types.ts
```

Worked examples:

- Wanted a covered chlorine-contact basin. `grep … clearwell` → nothing in
  `pid/`. `grep '"oxot/water' types.ts` → `oxot/water/clearwell`, drawn for this
  site because the **roof is the engineering claim**: an open basin cannot hold a
  free chlorine residual.
- Wanted a dosing pump. `pid/pumps` has 18 entries, none of them metering. The
  spec uses `oxot/water/metering_pump`, whose diagonal adjustment arrow says the
  displacement is settable — which is what a dose *is*.
- Wanted a cooling tower that had never been hand-wired. `grep … tower` →
  `pid/vessels/forced_draft_cooling_tower` renders with **no registry edit**, and
  its process line terminated on the stencil's own `W` constraint at cell
  (9.29, 16) rather than on the cell edge. That is the manifest doing its job.

If nothing resolves, **draw the symbol** — do not borrow a neighbour. An audit
once scored the water P&ID's symbol correctness 17/30 because eight marks were
borrowed from neighbouring unit operations.

---

## 6. Tag discipline

**ISA tags must name the same loop across every drawing on the site.**
`src/components/diagrams/specs/water-treatment-train.ts` is the reference. Read
the tag off it before inventing one.

Areas ascend along the train: 100 intake, 200 coagulation, 300 clarification,
400 filtration, 500 disinfection, 600 contact and storage, 700 distribution.

| Tag | Is | Where |
|---|---|---|
| `T-601` | the **clearwell** | `water-treatment-train.ts:326` |
| `LT-601` | its level | `:332` |
| `AIT-601` | free chlorine residual on its outlet | `:338` |
| `T-501` | the **hypochlorite day tank** | `:311` |
| `P-501` | the chlorine metering pump | `:318` |
| `LT-501` | the day tank's level | ww3 `content.assets.ts` |

**The incident.** An audit proposed tagging ww3's chemical-tank level
transmitter `LT-601`. That is the **clearwell's** level. The day tank is `T-501`,
so the transmitter is `LT-501`. Checking against the P&ID rather than taking the
proposal on trust is what caught it — and getting it wrong would have been the
same class of error as drawing a metering pump as a tank, committed while fixing
exactly that.

**The first letter is a claim, not decoration.** ISA-5.1's first letter names the
*measured variable*. `AIC-601` is `A` (analysis) because the loop's process
variable is chlorine residual; an `F` would claim a flow measurement the plant
never takes. `RIT-501` is `R` (radiation), what a UV intensity sensor reads —
`AIT` there would assert an analysis that does not exist.

---

## 7. Known capability gaps

Do not rediscover these. Each is a property of the current contract, not a bug
awaiting a fix.

| Gap | Detail |
|---|---|
| **No colour channel** | `DiagramNode`/`DiagramEdge` carry no colour. Edge meaning is stroke treatment (`edge-line.tsx`), so a reader who cannot separate cyan from amber can still tell pneumatic from data link. |
| **No edge state** | An edge cannot be "compromised", "proposed" or "selected". `sharedSystem` and `bidirectional` are the only per-edge semantic flags. |
| **No elevation / hydraulic grade** | No `x`/`y` on a node. ELK owns both axes. |
| **No client-side render** | `Diagram` is `async`. It cannot live under `"use client"`, cannot animate, cannot respond to input. |
| **Zones drawn for `purdue` only** | `PurdueDiagram` has a `DRAWN_ZONES` list (safety, enterprise, external). `PidDiagram.tsx` contains no zone code at all — a `zone` on a P&ID node reaches the accessible restatement and nothing else. |
| **No isometric or layer-stack type** | `DiagramType` is the six listed in §2; `network`/`block`/`process`/`c4` share one renderer. Facility isometrics are Phase 5 and unbuilt. |
| **`zoneOutline` needs ≥ 2 boxes** | A single-occupant zone cannot be outlined. |
| **No off-sheet flag** | There is no way to break a long run to a tagged stub; see §8. |
| **Thin wastewater coverage** | Verified against all 1,082 slugs: **no** ozone contactor, membrane / RO, wellhead, digester, belt press, thickener, DAF, grit chamber, sedimentation basin or lagoon. Nearest available: `pid/misc/aerator_with_sparger`, eight `pid/centrifuges/…` (a decanter centrifuge is a defensible dewatering mark), `pid/filters/liquid_filter_belt_roll`. A true wastewater train needs new `oxot/water/…` marks drawn first. |

---

## 8. Honest quality caveats

Do not oversell this. The engine is good at symbol correctness and consistency
and currently **mediocre at composition**.

**Audit scores.** The three gallery diagrams have never cleared the ≥ 90 bar in
`task_plan.md`. Recorded trajectories across four independent rounds:

| Drawing | Round scores |
|---|---|
| water | 64 → 65 → 71 → 66 |
| energy | 45 → 68 → 54 |
| manufacturing | 74 → 69 → 77.5 |

**Auditor variance is 5–14 points on the same artefact.** Two rigorous auditors
scored the same energy drawing 68 and 54, differing almost entirely on the
composition axis (11/20 vs 6/20) for identical measured facts. A fourth round
scored a strictly-improved water drawing *lower* than the third. A "≥ 90 on
independent audit" gate is therefore **not a decidable stopping condition**
without pinning the composition axis to measured thresholds or taking a median of
three. Say so before promising a number.

**Composition, specifically.** Measured symbol-to-caption ratio runs **0.10–0.25**
against a reference median of **1.76** for real process drawings — the tag block
outweighs the plant. On the network/IT family the reference is 0.20–0.48, which is
why **architecture and Purdue charts are this engine's best case** and process
P&IDs its worst. Related, and unchanged across three repair rounds: the water
train routes **21,118 units of pipe on a 1,730-unit diagonal at 5.06 bends per
edge, 27.6% dead canvas**. Long runs sweep the whole sheet instead of breaking to
off-sheet flags; there is no `offSheet` flag in the contract, and the five worst
edges carry ~9,000 of those 21,118 units.

**What actually moved the scores.** Three repair waves moved water +7 and
manufacturing +3.5. The wins came from **root causes shared across diagrams** —
port-map joins, lane booking — not from per-diagram cosmetics. When a defect is
"a registry was not joined", grep *every* glyph module against the join table
before declaring it closed: fixing `pid-hand-drawn`'s missing join left the
identical hole one module over in `cset-glyphs`.

---

## 9. Checklist — new page with a drawing

1. Run §1. Write down which question fired and why. If 1–4 fired, stop reading
   this list; build the bespoke canvas and consider §4 for the marks inside it.
2. Read `specs/water-treatment-train.ts` end to end.
3. Find every symbol (§5.4). Anything that does not resolve is either a spelling
   difference from draw.io's name or a mark someone must draw. **Do not borrow a
   neighbouring unit operation.**
4. Read ISA tags off the existing specs (§6) before inventing one. If the loop
   already exists on this site, reuse its number.
5. Author the spec: `type`, `sector`, bilingual `title`, nodes, edges. Every
   `label` in real Dutch. `purdue` on every node if `type: "purdue"`.
6. Add any new `zone` to `ZONE_LABEL` in `diagrams/types.ts`, bilingual.
7. Mount with `<Diagram spec locale id />` inside a width-capped frame if the
   plate has to read at the same scale as its neighbours.
8. Verify (§11).

## 10. Checklist — updating an existing page

1. Run §1 **against each drawing separately**. On ww3 the answer differed per
   drawing; expect that to be normal.
2. For any drawing that stays bespoke: list its marks and ask whether two of them
   are the same silhouette carrying different meanings. That is the defect worth
   fixing, and §4 fixes it without touching the layout.
3. Give the data record a `symbol` slug. Add the slug to `CURATED_SYMBOLS` in
   `AssetNode.tsx` if it is not there, importing from a curated module — **never**
   from `../diagrams/types` or `./drawio-glyph` (§3.1).
4. Check the rendered cell size against §3.4 and re-cut if it is under the floor.
   Fit an ISA bubble by its outline, not by its cell.
5. Screenshot at `deviceScaleFactor: 1`, both themes, and nearest-neighbour
   upscale that raster. Not a 4× vector shot.
6. Check the whole page for the same component used elsewhere — a shared glyph
   change reaches every consumer. Prove any failure pre-existing with a
   path-scoped `git stash` to `HEAD` before attributing it to your change.
7. Verify (§11).

## 11. Verification — the commands that close either checklist

```bash
npx tsc --noEmit                              # or: npm test
npx eslint <every file you touched>
npm run build                                 # a bad slug fails HERE, by design
grep -rl "DRAWIO_STENCILS" .next/static/chunks   # must be empty (§3.1)

# both locales must return 200 — a spec throw takes the whole route down
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/en/<route>
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/nl/<route>

node scripts/measure.mjs /en/<route> /nl/<route>
node scripts/content-guards.mjs /en/<route> /nl/<route>
```

`measure.mjs` must clear every gate on both locales with **`exempt=0`**. A
non-zero `exempt` means something is carrying `data-contrast-exempt`; today the
only sanctioned use site-wide is the OXOT wordmark.

Also confirm from the `measure.mjs` output: `gfx d/l=0/0`, `ghosted=0`,
`narrow-text=0`, `dead-links=0`, one `h1`.
