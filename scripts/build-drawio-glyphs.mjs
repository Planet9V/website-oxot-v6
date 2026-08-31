/**
 * BUILD TOKENIZED ENGINEERING GLYPHS FROM DRAW.IO'S STENCIL XML.
 *
 * Source: `scripts/compile-stencils.mjs`, which compiles the `pid` and
 * `electrical` stencil XML out of the installed draw.io's `app.asar`.
 *
 * WHY NOT THE CONVERTED SVG LIBRARY, WHICH THIS SCRIPT USED TO READ. The
 * converter behind `new_material_source/asset_icons_drawio/libraries/` never
 * implemented `<arc>` or `<curve>`: 1 of 478 P&ID files retains a curve
 * command, and 25 of the 39 glyph paths this file used to emit had none at all.
 * `ball_valve` arrived as a bowtie with no ball, byte-identical to
 * `globe_valve`, followed by `M 31.9 40.5 M 66.2 19.7` — a path that draws
 * nothing, because the two arcs between those moves were dropped. Reading the
 * stencil XML instead makes the arcs available losslessly; see that file.
 *
 * WHY INLINE SVG RATHER THAN <img src>. The library ships a `drawio-icon.tsx`
 * rendering `<img src="/drawio_icons/…">`. An <img> is an opaque document: it
 * cannot inherit `currentColor` and cannot take a `--foreground` or `--border`
 * token, so it cannot satisfy the Visual Foundation Spec's requirement for
 * single-colour glyphs matched to the token system. Inline SVG is the only form
 * that can, and it is what `pid-symbols.tsx` already does by hand.
 *
 * WHY EVERYTHING IS NORMALIZED INTO A 32x32 CELL. `pid-symbols.tsx` and
 * `AssetNode.tsx` both compose in a 32-unit grid — that shared cell is what lets
 * a P&ID symbol and an asset glyph sit on one canvas without a visible size
 * seam. The raw stencils carry their own sizes (98x60, 100x100, …), so emitting
 * them unmodified would make them structurally incompatible with every existing
 * caller. Each glyph is fitted into the same 22-unit live area (x/y 5..27) the
 * hand-drawn set occupies, and emitted as a FRAGMENT — no wrapping <svg> — so
 * callers keep owning the viewBox exactly as today.
 *
 * WHY STROKE WIDTH IS REWRITTEN PER GLYPH RATHER THAN SET ON A PARENT. Two
 * reasons, both learned the hard way in this repo. First, a `<g>` transform
 * scales stroke with geometry, so a 98-wide stencil squeezed to 22 units renders
 * its 1.5 stroke at ~0.34 — hairline, and inconsistent glyph to glyph. Second, a
 * `stroke-width` presentation attribute on a child BEATS a value inherited from
 * an ancestor (it loses only to a CSS rule matching the same element), so
 * setting a width on the wrapper would be silently inert — the exact bug that
 * shipped in `Rule.tsx`. Each child carries its own width instead, pre-divided
 * by the glyph's scale so every symbol lands on the same visual weight.
 *
 * WHY THE PAINT GUARD IS AN ALLOW-LIST. The old guard was
 * `/(fill|stroke)="#[0-9a-fA-F]{3,6}"/` — it could only catch hex, so the 35
 * library files carrying the unresolved mxGraph token `fill="#stroke"` passed
 * straight through into shipped React. Compiling from XML means colour never
 * survives the pipeline at all, and the guard now rejects any paint value that
 * is not one of the two tokens this component set is allowed to emit.
 *
 * `fill` is `none` rather than a token: the stencils fill shapes solid, so a
 * gate valve would render as a filled bowtie. ISA-5.1 draws these as OUTLINES,
 * so dropping the fill is both more compliant and more correct as drawing.
 *
 * WHY A FEW SYMBOLS ARE RE-EXPORTED FROM A HAND-DRAWN FILE. Compiling losslessly
 * only guarantees fidelity to what draw.io ships, and draw.io ships
 * `pid/valves/globe_valve` and `pid/valves/ball_valve` BYTE-IDENTICAL in
 * `valves.xml`. No compiler recovers a distinction the source does not contain,
 * and the oracle cannot catch it either — each renders exactly like its own
 * golden. So `HAND_DRAWN` below names symbols this generator deliberately does
 * NOT compile, and emits a re-export instead. That keeps this file's output
 * purely generated (no hand-editing of the .tsx) while keeping the module's
 * export surface stable, so `pid-symbols.tsx` and `diagrams/types.ts` resolve
 * `GlobeValve` without either of them changing.
 *
 * WHY DUPLICATE GEOMETRY IS A BUILD FAILURE. Two exports with different names
 * emitting the same mark is a symbol-correctness defect that no other check in
 * this pipeline sees: the paint guard passes, the no-op guard passes, and the
 * oracle passes both. `assertNoUnintendedDuplicates` hashes each glyph's emitted
 * geometry and throws on any collision that is not in `EXPECTED_DUPLICATES`,
 * which carries the ISA reason for every entry. The globe/ball collision was
 * found by running exactly this check by hand; making it mechanical is what
 * stops the next one shipping.
 *
 * WHY THIS ALSO EMITS A MANIFEST (task_plan Phase 3.1). Everything above is
 * CURATION: 43 hand-named exports out of 1,007 compiled shapes, each costing a
 * line here and a line in `diagrams/types.ts`. The manifest is the SAME geometry
 * for ALL of them, as data — see `manifestModule` at the foot of this file. Both
 * outputs come off one `loadStencils()` call and share `fit`, `TARGET_STROKE`
 * and `paintToSvg`, so a curated glyph and its manifest entry cannot disagree
 * about where a symbol sits or how heavily it is drawn.
 *
 * Run:  node scripts/build-drawio-glyphs.mjs
 * Out:  src/components/twin/drawio-glyphs.tsx   (generated — do not hand-edit)
 *       src/components/twin/drawio-manifest.ts  (generated — do not hand-edit)
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { loadStencils, drawioVersion, paintToSvg, GROUPS } from "./compile-stencils.mjs";

const OUT = "src/components/twin/drawio-glyphs.tsx";
const MANIFEST_OUT = "src/components/twin/drawio-manifest.ts";
/** Hand-drawn source, paint-guarded alongside the generated output. */
const HAND_DRAWN_SRC = "src/components/twin/pid-hand-drawn.tsx";

/** The 32-unit cell and 22-unit live area `pid-symbols.tsx` established. */
const CELL = 32;
const LIVE = 22;
/** Target visual stroke weight inside the cell — `pid-symbols.tsx`'s STROKE. */
const TARGET_STROKE = 1.3;
/** The only paint values a tokenized glyph may carry. Anything else is a bug. */
const PAINT_TOKENS = new Set(["none", "currentColor"]);

/* Curated, not wholesale. 1,007 pid + electrical stencils are compiled and
   available; a glyph set is only useful if a builder can hold it in their head.
   These are the symbols this site's own content names — the seven
   `pid-symbols.tsx` draws by hand, plus equipment and electrical apparatus the
   industry pages discuss in prose. Add deliberately; every entry should answer
   to a real page. */
export const CURATED = [
  // ── P&ID · valves ────────────────────────────────────────────────────────
  ["GateValve", "pid/valves/gate_valve"],
  /* GlobeValve is NOT compiled — see HAND_DRAWN below. draw.io's globe_valve is
     byte-identical to its ball_valve, so compiling it would ship one mark under
     two names and lose the throttle/isolate distinction ISA draws at the waist. */
  ["BallValve", "pid/valves/ball_valve"],
  ["CheckValve", "pid/valves/check_valve_1"],
  ["ButterflyValve", "pid/valves/butterfly_valve_1"],
  ["AngleValve", "pid/valves/angle"],
  // ── P&ID · instruments ───────────────────────────────────────────────────
  ["InstrumentBubble", "pid/instruments/level_indicator"],
  ["FlowIndicator", "pid/instruments/flow_indicator"],
  ["FlowTransmitter", "pid/instruments/flow_transmitter"],
  ["LevelController", "pid/instruments/level_controller_1"],
  ["AnalyzerTransmitter", "pid/instruments/analyzer_transmitter"],
  ["FlowElement", "pid/instruments/flow_element"],
  // ── P&ID · vessels and equipment ─────────────────────────────────────────
  ["Vessel", "pid/vessels/container_tank_cistern"],
  ["ConicalBunker", "pid/vessels/bunker_conical_bottom"],
  ["BarrelDrum", "pid/vessels/barrel_drum"],
  ["CentrifugalPump", "pid/pumps/centrifugal_pump_1"],
  ["GearPump", "pid/pumps/gear_pump"],
  ["GasCompressor", "pid/pumps/gas_compressor"],
  ["CentrifugalCompressor", "pid/compressors/centrifugal_compressor"],
  ["ReciprocatingCompressor", "pid/compressors/reciprocating_compressor"],
  ["HeatExchanger", "pid/heat_exchangers/heat_exchanger_coil_tubes"],
  ["PlateHeatExchanger", "pid/heat_exchangers/heat_exchanger_plate"],
  ["Condenser", "pid/heat_exchangers/condenser"],
  ["ElectricHeater", "pid/heat_exchangers/electric_heater"],
  ["LiquidFilter", "pid/filters/liquid_filter"],
  ["GasFilter", "pid/filters/gas_filter"],
  ["CycloneSeparator", "pid/separators/separator_cyclone"],
  ["GravitySeparator", "pid/separators/gravity_separator_settling_chamber"],
  ["PropellerAgitator", "pid/agitators/agitator_propeller"],
  ["ImpellerAgitator", "pid/agitators/agitator_impeller"],
  ["BasketStrainer", "pid/piping/basket_strainer"],
  ["FlameArrestor", "pid/fittings/flame_arrestor"],
  // ── Electrical · the energy and power pages ──────────────────────────────
  ["CircuitBreaker", "electrical/electro-mechanical/circuit_breaker"],
  ["Fuse", "electrical/electro-mechanical/fuse"],
  ["TwoPositionSwitch", "electrical/electro-mechanical/2_position_switch"],
  ["ChangeoverContact", "electrical/electro-mechanical/changeover_contact"],
  ["ThreeLineBus", "electrical/transmission/3_line_bus"],
  ["CableGroup", "electrical/transmission/cable_group"],
  ["OpticalFiber", "electrical/transmission/optical_fiber"],
  ["TerminalThreePhase", "electrical/transmission/terminal_3_phase"],
  ["BridgeRectifier", "electrical/power_semiconductors/bridge_rectifier_1"],
  ["Ammeter", "electrical/instruments/ampermeter"],
  ["Voltmeter", "electrical/instruments/voltmeter"]
];

/**
 * Symbols the stencil source cannot supply, re-exported from a hand-drawn file
 * instead of compiled. `[exportName, slug]` — the slug is the draw.io path the
 * symbol WOULD have had, kept so `diagrams/types.ts` can keep addressing it by
 * the same string and so a later stencil fix is a one-line move back into
 * `CURATED`. Ports come from that file's `HAND_DRAWN_PORTS`, spread into
 * `GLYPH_PORTS` so callers see one table.
 */
export const HAND_DRAWN = [
  ["GlobeValve", "pid/valves/globe_valve"],
  /* The water unit operations (repair wave R3). Unlike the globe valve these
     have no draw.io stencil to be a corrected version OF — ISO 10628 and
     ISA-5.1 define none of them — so each slug is an `oxot/water/…` path of
     this project's own, deliberately NOT under `pid/`, so Phase 3's stencil
     manifest merges into `diagrams/types.ts` without a name collision. */
  ["UvReactor", "oxot/water/uv_reactor"],
  ["BarScreen", "oxot/water/bar_screen"],
  ["ChemicalDayTank", "oxot/water/chemical_day_tank"],
  ["MeteringPump", "oxot/water/metering_pump"],
  ["Clearwell", "oxot/water/clearwell"],
  ["CheckValveInline", "oxot/water/check_valve_inline"],
  ["Clarifier", "oxot/water/clarifier"],
  ["CoagulantMixer", "oxot/water/coagulant_mixer"]
];

/**
 * Duplicate geometry that is CORRECT and must not fail the build.
 *
 * ISA-5.1 IDENTIFIES AN INSTRUMENT BY THE LETTER CODE INSIDE ITS BUBBLE, not by
 * the bubble, and IEC 60617 does the same for a panel meter. All 24
 * `pid/instruments` stencils are therefore one of exactly two marks — a bare
 * circle, or that circle with one horizontal line meaning "primary location,
 * accessible to the operator" — and `electrical/instruments/voltmeter` is that
 * same bare circle again once fitted to the cell, because its V is `<text>` and
 * `<text>` is deliberately not emitted. Drawing any of them differently to make
 * them distinguishable would be INVENTING NOTATION, which Gate 1 forbids
 * outright; the letters are the fix, and they belong to the caller.
 *
 * The real replacement is `src/components/twin/instrument-bubble.tsx`, which
 * draws the bubble from its parameters and renders the tag as real `<text>`.
 * These stay only because `src/components/diagrams/types.ts` currently resolves
 * their slugs — retire them there first, then delete them from `CURATED`.
 *
 * WHY THIS IS AN ALLOW-LIST AND NOT A THRESHOLD. Every entry names a symbol
 * whose identity provably lives outside its geometry. That is a claim about a
 * published standard, so it is written down per group and re-read whenever the
 * build fails, rather than absorbed by a similarity cut-off that would also
 * hide the next globe/ball.
 *
 * Each entry is `[reason, ...exportNames]`. A collision not listed here throws.
 */
const EXPECTED_DUPLICATES = [
  [
    "bare instrument circle — ISA-5.1/IEC 60617 identity is the letter code inside it, which stencil <text> cannot carry; overlay a tag, or use InstrumentBubble from ./instrument-bubble",
    "InstrumentBubble",
    "FlowIndicator",
    "FlowTransmitter",
    "LevelController",
    "Voltmeter"
  ],
  [
    "ISA-5.1 instrument bubble with the primary-location line — same letter-code caveat as the bare bubble",
    "AnalyzerTransmitter",
    "FlowElement"
  ]
];

/** Fit a stencil's own w×h into the 22-unit live area, centred in the 32 cell. */
function fit(shape) {
  const scale = LIVE / Math.max(shape.w, shape.h);
  return { scale, tx: CELL / 2 - (shape.w / 2) * scale, ty: CELL / 2 - (shape.h / 2) * scale };
}

const n = (v) => Number(v.toFixed(4));

/** One compiled paint as a JSX element, tokenized and stroke-corrected. */
function toJsx(p, scale) {
  const attrs = [`fill="none"`, `stroke="currentColor"`, `strokeWidth={${n((p.strokeWidth * TARGET_STROKE) / scale)}}`];
  /* Dash lengths live inside the scaled <g>, so they stay in source units and
     scale with the geometry — unlike stroke-width, which is pre-divided above. */
  if (p.dashArray) attrs.push(`strokeDasharray="${p.dashArray.map((v) => n(v * p.strokeWidth)).join(" ")}"`);
  if (p.linejoin) attrs.push(`strokeLinejoin="${p.linejoin}"`);
  if (p.linecap) attrs.push(`strokeLinecap="${p.linecap}"`);
  if (p.miterlimit) attrs.push(`strokeMiterlimit={${n(p.miterlimit)}}`);
  const tail = attrs.join(" ");

  if (p.kind === "path") return `<path d="${p.cmds.join(" ")}" ${tail} />`;
  if (p.kind === "ellipse")
    return `<ellipse cx={${n(p.x + p.w / 2)}} cy={${n(p.y + p.h / 2)}} rx={${n(p.w / 2)}} ry={${n(p.h / 2)}} ${tail} />`;
  const r = p.kind === "roundrect" ? Math.min(p.w, p.h) * (p.arcsize / 100) : 0;
  return `<rect x={${n(p.x)}} y={${n(p.y)}} width={${n(p.w)}} height={${n(p.h)}}${r ? ` rx={${n(r)}}` : ""} ${tail} />`;
}

/**
 * Total paint guard. Compiling from XML means no stencil colour reaches the
 * output, so anything other than the two tokens is a compiler defect — including
 * the non-hex `fill="#stroke"` the previous hex-only regex could not see.
 */
function assertPaintTokens(tsx, where) {
  const bad = [...tsx.matchAll(/(?:fill|stroke)="([^"]*)"/g)].map((m) => m[1]).filter((v) => !PAINT_TOKENS.has(v));
  if (bad.length) throw new Error(`${where}: illegal paint value(s): ${[...new Set(bad)].join(", ")}`);
}

/**
 * A glyph's geometry in CELL SPACE — the mark a reader actually sees.
 *
 * HASHING THE EMITTED JSX IS NOT ENOUGH, and this is the whole reason the
 * function exists. `voltmeter` is a 90-unit circle and `flow_indicator` is a
 * 96-unit circle; they emit different `d`/`cx`/`scale` numbers and different
 * JSX, so a textual hash calls them distinct — but both are fitted to the same
 * 22-unit live area, so both render as the SAME bare circle. Comparing after
 * the fit transform is what catches that class of collision, and it was found
 * exactly this way: at 64 px `Voltmeter` and `InstrumentBubble` are one mark.
 *
 * Coordinates are rounded to 2 dp. Sub-hundredth differences in a 32-unit cell
 * are ~0.3% of a glyph and well under one device pixel at any size this set is
 * used at, so treating them as equal is the intended behaviour rather than a
 * tolerance being papered over.
 */
function cellGeometry(shape) {
  const { scale, tx, ty } = fit(shape);
  const r = (v) => Number(v.toFixed(2));
  const px = (v) => r(tx + v * scale);
  const py = (v) => r(ty + v * scale);

  return shape.paints
    .map((p) => {
      /* The RENDERED weight, which `toJsx` pre-divides by `scale` so that the
         enclosing `<g>` scales it back: it is `strokeWidth * TARGET_STROKE` and
         does not depend on the fit at all. Using the scaled source width here
         instead made a 90-unit circle and a 96-unit circle hash differently
         (0.24 vs 0.23) while rendering as the same 22-unit ring — which is
         precisely the collision this signature exists to find. */
      const w = `w${r(p.strokeWidth * TARGET_STROKE)}${p.dashArray ? `d${p.dashArray.map((v) => r(v * p.strokeWidth * scale)).join(",")}` : ""}`;
      if (p.kind === "ellipse") return `E ${px(p.x)} ${py(p.y)} ${r(p.w * scale)} ${r(p.h * scale)} ${w}`;
      if (p.kind === "rect" || p.kind === "roundrect")
        return `R ${px(p.x)} ${py(p.y)} ${r(p.w * scale)} ${r(p.h * scale)} ${p.arcsize ?? 0} ${w}`;
      /* The compiler emits only M, L, A, C and Z. Anything else would have to be
         mapped by hand, so throw rather than hash it wrong and pass silently. */
      const cmds = p.cmds.map((c) => {
        const [op, ...ns] = c.trim().split(/[\s,]+/);
        const v = ns.map(Number);
        if (op === "Z") return "Z";
        if (op === "M" || op === "L") return `${op} ${px(v[0])} ${py(v[1])}`;
        if (op === "C") return `C ${px(v[0])} ${py(v[1])} ${px(v[2])} ${py(v[3])} ${px(v[4])} ${py(v[5])}`;
        if (op === "A")
          return `A ${r(v[0] * scale)} ${r(v[1] * scale)} ${v[2]} ${v[3]} ${v[4]} ${px(v[5])} ${py(v[6])}`;
        throw new Error(`cellGeometry: unhandled path command "${op}" in ${shape.id}`);
      });
      return `P ${cmds.join(" ")} ${w}`;
    })
    .join("\n");
}

/**
 * No two exports may draw the same mark unless the standard says they do.
 *
 * Every collision must appear in `EXPECTED_DUPLICATES` with its reason;
 * anything else throws and names both sides, because a silent duplicate is a
 * symbol-correctness defect that every other guard in this pipeline passes —
 * the paint guard, the no-op guard and the golden-render oracle all wave two
 * identical marks straight through, since each is a perfect match to its own
 * golden.
 */
function assertNoUnintendedDuplicates(glyphs) {
  const allowed = new Map();
  for (const [reason, ...names] of EXPECTED_DUPLICATES) for (const nm of names) allowed.set(nm, reason);

  const byHash = new Map();
  for (const g of glyphs) {
    const h = createHash("sha256").update(g.cell).digest("hex").slice(0, 16);
    if (!byHash.has(h)) byHash.set(h, []);
    byHash.get(h).push(g.name);
  }

  const unexpected = [];
  for (const [h, names] of byHash) {
    if (names.length < 2) continue;
    /* A group is sanctioned only if every member of it is, and all of them cite
       the SAME reason — two unrelated exceptions colliding by accident is still
       an accident. */
    const reasons = new Set(names.map((nm) => allowed.get(nm)));
    if (reasons.size === 1 && !reasons.has(undefined)) continue;
    unexpected.push(`${h}: ${names.join(" == ")}`);
  }
  if (unexpected.length)
    throw new Error(`unintended duplicate glyph geometry — two names, one mark:\n  ${unexpected.join("\n  ")}`);

  return [...byHash].filter(([, names]) => names.length > 1).length;
}

/* ── THE MANIFEST (task_plan Phase 3.1) ───────────────────────────────────
 *
 * MANIFEST, NOT CURATION. `CURATED` above names 43 shapes out of the 1,007 the
 * compiler produces, and every one of them costs a React export here plus a
 * registry line in `src/components/diagrams/types.ts`. That hand-wiring is the
 * reason a 1,007-shape library exposed 118 slugs. The manifest emits the whole
 * compiled corpus as data, so a slug resolves because the geometry EXISTS, not
 * because somebody typed its name in two files.
 *
 * WHY DATA AND ONE RENDERER RATHER THAN 1,007 COMPONENTS. Measured, not assumed:
 * the manifest is 449 KB raw / 51 KB gzipped for all 1,007 shapes with their
 * 2,698 ports. Emitting the same geometry as React components would be that
 * payload plus a function wrapper and a JSX call per subpath, and — the part
 * that actually decides it — every one of those components would have to be
 * named, imported and spread into `GLYPH_REGISTRY`, which is the hand-wiring
 * this phase exists to delete. One `<DrawioGlyph src>` reads the map instead.
 *
 * WHY EACH ENTRY CARRIES SVG MARKUP RATHER THAN PARSED ELEMENTS. `paintToSvg`
 * in `compile-stencils.mjs` is ALREADY the compiler's own emitter — it is what
 * the golden-render oracle diffs against draw.io at 0.9995 IoU. Storing parsed
 * element records instead would mean a second element→SVG mapping inside the
 * React renderer: a second converter, in a pipeline whose entire history is one
 * lossy second converter. Structured records measured 49 KB gzipped against
 * this form's 51 KB — 2 KB, for a duplicate implementation of the one function
 * Gate 0 verifies. The markup is generated from a closed vocabulary (path,
 * ellipse, rect) with no interpolated user input, and every paint value in it
 * is checked against `PAINT_TOKENS` below before it is written.
 *
 * SHAPES THAT DRAW NOTHING ARE OMITTED, NOT EMITTED EMPTY. A slug resolving to
 * an invisible glyph is exactly the silent fallback GATE 3 forbids; leaving it
 * out keeps it a build error naming the gap. Currently 0 of 1,007 are dropped.
 */

/** Every compiled shape as `[slug, entry]` in 32-unit cell space, plus the drop list. */
function manifestEntries(reg) {
  const rows = [];
  const skipped = [];
  for (const [id, shape] of reg) {
    if (!shape.paints.length) { skipped.push(id); continue; }
    const { scale, tx, ty } = fit(shape);
    /* The SAME stroke arithmetic `toJsx` does — `p.strokeWidth * TARGET_STROKE`
       pre-divided by the fit scale, so the enclosing `<g>` scales it back to a
       uniform 1.3 cell weight whatever the stencil's own box was. */
    const s = shape.paints
      .map((p) => paintToSvg(p, { stroke: "currentColor", strokeWidth: TARGET_STROKE / scale }))
      .join("");
    const t = `translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(5)})`;
    /* Ports as `[name, x, y]` tuples, in the same cell space as the geometry and
       by the same arithmetic the curated `GLYPH_PORTS` uses. Objects would cost
       ~40 KB more across 2,698 of them to say `name`/`x`/`y` 2,698 times. */
    const p = shape.ports.map((c) => [c.name, n(tx + c.x * shape.w * scale), n(ty + c.y * shape.h * scale)]);
    rows.push([id, p.length ? { t, s, p } : { t, s }]);
  }
  return { rows, skipped };
}

/** The generated manifest module, guarded exactly as the .tsx output is. */
function manifestModule(reg) {
  const { rows, skipped } = manifestEntries(reg);
  const portCount = rows.reduce((sum, [, e]) => sum + (e.p?.length ?? 0), 0);

  /* Guard the RAW markup, before `JSON.stringify` escapes its quotes — the paint
     regex reads `fill="none"`, not `fill=\"none\"`, so guarding the serialised
     form would pass everything silently. */
  const markup = rows.map(([, e]) => e.s).join("");
  assertPaintTokens(markup, MANIFEST_OUT);
  const noop = [...markup.matchAll(/ d="([^"]*)"/g)].map((m) => m[1]).filter((d) => !/[LACQZ]/.test(d));
  if (noop.length) throw new Error(`${MANIFEST_OUT}: ${noop.length} no-op (M-only) path(s) reached the manifest`);

  const body = rows.map(([id, e]) => `  ${JSON.stringify(id)}: ${JSON.stringify(e)}`).join(",\n");
  const text = `/**
 * GENERATED FILE — DO NOT HAND-EDIT.
 * Regenerate:  node scripts/build-drawio-glyphs.mjs
 *
 * THE PHASE 3.1 STENCIL MANIFEST — all ${rows.length} shapes of the ${GROUPS.length} notation
 * families \`compile-stencils.mjs\` sanctions (${GROUPS.join(", ")}),
 * compiled from draw.io ${drawioVersion()}'s own mxGraph stencil XML, with ${portCount}
 * connection ports, as data rather than as ${rows.length} hand-wired React components.
 *
 * Read it through \`<DrawioGlyph src="…" />\` in \`./drawio-glyph\`, or through
 * \`resolveSymbol\` in \`@/components/diagrams/types\`, which tries the curated
 * \`GLYPH_REGISTRY\` first and falls through to here. The curated table WINS on a
 * shared slug on purpose: four \`electrical/…\` slugs and \`pid/valves/globe_valve\`
 * resolve to hand-drawn corrections of stencils draw.io ships wrong, and the
 * manifest must not undo that.
 *
 * Keys are draw.io's own stencil paths, \`<group>/<file>/<shape-slug>\`.
 * Geometry is in each stencil's OWN coordinate space; \`t\` is the transform that
 * fits it into the 22-unit live area of the shared 32-unit cell, and the stroke
 * widths in \`s\` are pre-divided by that transform's scale so every symbol lands
 * on the same ${TARGET_STROKE} visual weight. Ports are already in cell space — they are
 * points, not lengths, so they take the transform arithmetically instead.
 */

export interface StencilGlyph {
  /** \`translate(tx ty) scale(s)\` — stencil space → the 32-unit cell. */
  readonly t: string;
  /** The glyph's subpaths as SVG markup, in the stencil's own coordinate space. */
  readonly s: string;
  /** \`[name, x, y]\` connection ports, in 32-unit cell space. Absent when the stencil declares none. */
  readonly p?: readonly (readonly [string, number, number])[];
}

export const DRAWIO_STENCILS: Readonly<Record<string, StencilGlyph>> = {
${body}
};
`;
  return { text, count: rows.length, portCount, skipped };
}

/* ── generate ────────────────────────────────────────────────────────────── */

const registry = loadStencils();
const parts = [];
const ports = [];
const missing = [];
const glyphs = [];
let withText = 0;

/** Sanctioned collisions, indexed by member, so each export can say so in situ. */
const DUPLICATE_NOTE = new Map(
  EXPECTED_DUPLICATES.flatMap(([reason, ...names]) =>
    names.map((nm) => [nm, `IDENTICAL MARK to ${names.filter((o) => o !== nm).join(", ")} — ${reason}.`])
  )
);

for (const [name, id] of CURATED) {
  const shape = registry.get(id);
  if (!shape) { missing.push(id); continue; }
  if (shape.hasText) withText += 1;

  const { scale, tx, ty } = fit(shape);
  const body = shape.paints.map((p) => toJsx(p, scale)).join("\n      ");
  const t = `translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(5)})`;
  glyphs.push({ name, cell: cellGeometry(shape) });
  const note = DUPLICATE_NOTE.get(name);
  parts.push(
    `/** draw.io \`${id}\` — ${shape.paints.length} subpath(s), fitted to the 32-unit cell.` +
      (note ? `\n *  ${note} */\n` : ` */\n`) +
      `export function ${name}() {\n  return (\n    <g transform="${t}">\n      ${body}\n    </g>\n  );\n}`
  );

  /* The stencil XML's <connections><constraint> ports, mapped out of unit space
     into the same 32-unit cell as the geometry. These are what let a later
     router attach a pipe to a pump's suction rather than to its bounding box;
     the SVG conversion discarded all 2,698 of them. */
  const cell = shape.ports
    .map((c) => `{ name: "${c.name}", x: ${n(tx + c.x * shape.w * scale)}, y: ${n(ty + c.y * shape.h * scale)} }`)
    .join(", ");
  ports.push(`  ${name}: [${cell}]`);
}

if (missing.length) {
  console.error(`MISSING — curation names a stencil not in the registry:\n  ${missing.join("\n  ")}`);
  process.exit(1);
}

const sanctionedDupes = assertNoUnintendedDuplicates(glyphs);
const portCount = CURATED.reduce((s, [, id]) => s + (registry.get(id)?.ports.length ?? 0), 0);

/* The hand-drawn symbols, re-exported rather than compiled. Written as an
   `export { … } from` so the generated module's export surface is unchanged and
   no importer has to know which side of the line a symbol came from. */
const handDrawnBlock = `/**
 * ${HAND_DRAWN.length} symbol(s) draw.io's stencil source cannot supply, drawn by hand in
 * \`./pid-hand-drawn.tsx\` and re-exported here so the module's export surface is
 * one set:
 *
${HAND_DRAWN.map(([nm, id]) => ` *   ${nm} — registered as \`${id}\``).join("\n")}
 *
 * They honour this file's contract exactly: a \`<g>\` fragment in the same 32-unit
 * cell, \`currentColor\`, ${TARGET_STROKE} cell stroke weight. See that file for why each one
 * could not be compiled.
 */
import { HAND_DRAWN_PORTS } from "./pid-hand-drawn";
export { ${HAND_DRAWN.map(([nm]) => nm).join(", ")} } from "./pid-hand-drawn";
`;

const header = `/**
 * GENERATED FILE — DO NOT HAND-EDIT.
 * Regenerate:  node scripts/build-drawio-glyphs.mjs
 *
 * ${parts.length} tokenized engineering glyphs compiled from draw.io ${drawioVersion()}'s own
 * mxGraph stencil XML (${registry.size} shapes available across the ${GROUPS.length} notation
 * families in \`compile-stencils.mjs\`'s \`GROUPS\`), plus ${HAND_DRAWN.length} re-exported
 * from \`./pid-hand-drawn.tsx\` — ${parts.length + HAND_DRAWN.length} symbols in all. Real ISO/DIN geometry
 * INCLUDING ARCS AND CURVES — not the converted SVG library, whose converter
 * dropped every \`<arc>\` and \`<curve>\` it ever saw.
 *
 * EACH EXPORT IS A FRAGMENT, NOT A STANDALONE <svg> — a \`<g>\` already fitted to
 * the 32-unit cell that \`pid-symbols.tsx\` and \`AssetNode.tsx\` compose in. Drop
 * one inside a \`<svg viewBox="0 0 32 32">\` exactly like the hand-drawn set:
 *
 *   <svg viewBox="0 0 32 32" className="h-6 w-6"><GateValve /></svg>
 *
 * Every glyph strokes \`currentColor\` and fills nothing, so it inherits whatever
 * token the caller sets — the Visual Foundation Spec's requirement, and ISA-5.1's
 * own outline convention. Do NOT set \`stroke-width\` on the wrapper: each child
 * carries its own, pre-divided by that glyph's scale, and a presentation
 * attribute on the child beats anything inherited from an ancestor.
 *
 * KNOWN LIMITATION: ISA identifies an instrument by the letter code inside its
 * bubble, and stencil \`<text>\` is deliberately not emitted — a baked letter
 * cannot be themed, translated or re-tagged. ${withText} of these ${parts.length} stencils carry text
 * in source, so plain instrument bubbles are interchangeable circles; render tag
 * letters over them if a reader must tell one from another. ${sanctionedDupes} group(s) of
 * exports below therefore draw the SAME mark on purpose, each flagged in situ
 * and enumerated in the generator's \`EXPECTED_DUPLICATES\`. Any collision NOT on
 * that list fails this build — see \`assertNoUnintendedDuplicates\`.
 */
`;

const portsBlock = `/**
 * ${portCount} connection ports harvested from the stencil XML, in 32-unit cell space,
 * plus the hand-drawn set's own. The SVG conversion discarded every stencil port;
 * they are what lets a router attach a pipe to a pump's suction rather than to
 * the middle of its bounding box.
 */
export const GLYPH_PORTS: Record<string, ReadonlyArray<{ name: string; x: number; y: number }>> = {
  ...HAND_DRAWN_PORTS,
${ports.join(",\n")}
};
`;

/* Glyphs are packed one per doc comment with no blank line between: 43 of them
   at 10 lines each would put this generated file over the repo's 500-line cap,
   and the doc comment above each export already separates them legibly. */
const tsx = `${header}\n${handDrawnBlock}\n${portsBlock}\n${parts.join("\n")}\n`;
assertPaintTokens(tsx, OUT);
/* The hand-drawn file is not generated, so nothing else would ever check its
   paint. It is part of this module's public surface, so it answers to the same
   allow-list — `fill="currentColor"` on the globe valve's plug is inside it. */
assertPaintTokens(readFileSync(HAND_DRAWN_SRC, "utf8"), HAND_DRAWN_SRC);

const noop = [...tsx.matchAll(/ d="([^"]*)"/g)].map((m) => m[1]).filter((d) => !/[LACQZ]/.test(d));
if (noop.length) throw new Error(`${noop.length} no-op (M-only) path(s) reached the output`);

/* Only the CLI writes. `compile-stencils.mjs --verify` imports CURATED from
   here to know which stencils to diff, and a verification pass must not rewrite
   the component it is verifying. Everything above is pure. */
if (import.meta.url === `file://${process.argv[1]}`) {
  writeFileSync(OUT, tsx);
  console.log(
    `wrote ${OUT} — ${parts.length} generated + ${HAND_DRAWN.length} hand-drawn glyphs, ` +
      `${portCount} ports, ${sanctionedDupes} sanctioned duplicate group(s), ${tsx.split("\n").length} lines`
  );

  const manifest = manifestModule(registry);
  writeFileSync(MANIFEST_OUT, manifest.text);
  console.log(
    `wrote ${MANIFEST_OUT} — ${manifest.count} shapes, ${manifest.portCount} ports, ` +
      `${(Buffer.byteLength(manifest.text) / 1024).toFixed(1)} KB` +
      (manifest.skipped.length ? `, ${manifest.skipped.length} ink-less shape(s) omitted` : "")
  );
}
