import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { EDGE_LABEL_SIZE, PAD } from "./layout-shared";
import type { RoutedEdge } from "./layout-shared";
import { insideAny, marksAlong, midpointOf, toPathDataHopped } from "./geometry";
import type { Box, Point } from "./geometry";
import type { EdgeKind } from "./types";

/**
 * ONE ROUTED CONNECTION, DRAWN IN ITS ISA TREATMENT.
 *
 * Split out of ./BlockDiagram.tsx on 2026-08-28, when the mask, the hop plan
 * and the two power kinds took that file past the 500-line ceiling. The seam is
 * the obvious one: everything here walks a route, everything left there draws a
 * node.
 *
 * EVERY COLOUR RESOLVES THROUGH A LIVE CSS CUSTOM PROPERTY. Not one hex is
 * baked — the two exceptions are the black and white inside `KnockoutMask`,
 * which are not paint at all but mask luminance, and mean "hide" and "show"
 * whatever the theme. That constraint is what ruled out a draw.io SVG export as
 * the render path: the same markup has to be correct in dark and in light, and
 * it is the browser that decides which, at paint time, long after this
 * component has run.
 */

/** The two inks. Neither one encodes a signal kind; see `STROKE` below. */
export const INK = "hsl(var(--muted-foreground))";
export const INK_STRONG = "hsl(var(--foreground))";
export const PLATE = "hsl(var(--card))";
/** Distinguishes the `INK_STRONG` arrowhead from the `INK` one; see `DiagramDefs`. */
const STRONG_SUFFIX = "-strong";

/**
 * THE KIND IS IN THE STROKE, NEVER IN THE HUE.
 *
 * The signal kinds are mutually indistinguishable by colour and separable only
 * by geometry, which is the property that has to hold for a colour-blind reader
 * and for a greyscale print of the same page.
 *
 *   process     solid, heavy — the product itself
 *   power-ac    solid — a conductor carrying power
 *   power-dc    solid, double-ticked at intervals — a DC conductor
 *   pneumatic   cross-hatched: double slashes across the run
 *   electrical  dashed — an instrument signal, not a supply
 *   data-link   SOLID with interposed circles — a software link, not a wire
 *   capillary   a single fine plain line — the tap into the process
 *
 * LINE-WEIGHT HIERARCHY, A RULE RATHER THAN A PREFERENCE. ISA-5.1 requires that
 * a signal line is never drawn heavier than the process and equipment lines on
 * the same sheet — the plant stays the loudest thing on the page. The table
 * holds it with room to spare: `process` 2.25 is the heaviest kind, the power
 * conductors sit just under at 2.1 because a conductor is the energy equivalent
 * of a pipe, EVERY signal kind is 1.5, and `capillary` is 1.0 because a tap
 * into the process is neither plant nor signal. Nothing here may be raised
 * above 2.25 without raising `process` first.
 *
 * THE TWO POWER KINDS ARE NEW ON 2026-08-28 AND THEY REPAIR A REAL MISREADING.
 * Before them the energy drawing ran the 11 kV incomer, the 800 V DC battery
 * string and the Modbus telemetry as one dashed `electrical`. In drafting
 * convention dashed means signal and solid means power, so as the audit put it,
 * "power and telemetry read alike" — a megawatt drawn the same as a
 * measurement. Solid now says power; the tick cadence separates DC from AC;
 * dashing is left to say the thing dashing says.
 */
const STROKE: Record<EdgeKind, { width: number; dash?: string; ink: string }> = {
  process: { width: 2.25, ink: INK_STRONG },
  "power-ac": { width: 2.1, ink: INK_STRONG },
  "power-dc": { width: 2.1, ink: INK_STRONG },
  pneumatic: { width: 1.5, ink: INK },
  electrical: { width: 1.5, dash: "7 4", ink: INK },
  // SOLID, NOT DASHED, AND THE DASH WAS THE WHOLE DEFECT. In ISA-5.1's line
  // table a dashed run carrying interposed circles is the LINK TO A SMART
  // DEVICE — the HART-style handheld/calibration connection — while a data
  // link between control functions is a SOLID line carrying circles. The
  // drawing was labelling every Modbus, PROFINET, IEC 61850 and OPC UA run as
  // an instrument calibration lead. The circle's FILL now carries the real
  // distinction; see `dataLinkFill`.
  "data-link": { width: 1.5, ink: INK },
  capillary: { width: 1, ink: INK }
};

/**
 * WHICH RUN YIELDS AT A CROSSING. The lighter service hops the heavier one — a
 * signal wire bridges a process pipe, never the reverse — so the weight is a
 * property of the KIND rather than of which way the segment happens to run.
 */
export const HOP_WEIGHT: Record<EdgeKind, number> = {
  process: 3,
  "power-ac": 3,
  "power-dc": 3,
  pneumatic: 2,
  capillary: 2,
  electrical: 1,
  "data-link": 1
};

/** Rough advance width of the label face, for sizing the knock-out. */
const GLYPH_ADVANCE = 0.56;

/**
 * HOW WIDE A LABEL PAINTS. Exported because the LAYOUT has to know it too.
 *
 * `layoutPurdue` sizes the right-hand riser corridor from the widest label it
 * must carry out there, and a corridor sized by a second, privately-invented
 * estimator would be a corridor that disagrees with the box actually drawn —
 * the same class of defect as the plates that used to drift from the mask
 * holes. One function, two callers: the renderer cuts its knock-out from this
 * number and the layout reserves canvas from the same one, so the two cannot
 * diverge.
 */
export function edgeLabelWidth(text: string): number {
  return text.length * EDGE_LABEL_SIZE * GLYPH_ADVANCE + 10;
}

/**
 * The rectangle an edge's label occupies, or null when it carries none.
 *
 * ONE FUNCTION, TWO CALLERS, AND THAT IS THE POINT. The renderer draws the
 * label from this box and the mask cuts the line from this box, and if the two
 * computed it separately they would drift — which is the shape of the defect
 * the audit found on the Purdue chart, where plates painted over interposed
 * marks left `(`, `)` and `·` fragments scattered along four labelled conduits.
 */
export function edgeLabelBox(
  edge: RoutedEdge,
  locale: Locale,
  canvasWidth: number
): { text: string; box: Box } | null {
  if (!edge.label || edge.points.length < 2) return null;
  const text = pick(edge.label, locale);
  const width = edgeLabelWidth(text);
  const height = EDGE_LABEL_SIZE + 5;
  // Half the arc length, then clamped inside the margins. Both halves matter:
  // the arc midpoint is where a reader looks for a line's name, and the clamp
  // is what stops a label on a route ending at the right margin being drawn off
  // the canvas.
  const raw = midpointOf(edge.points);
  const lo = PAD + width / 2;
  const hi = Math.max(lo, canvasWidth - PAD - width / 2);
  const cx = Math.min(Math.max(raw.x, lo), hi);
  return { text, box: { x: cx - width / 2, y: raw.y - height / 2, width, height } };
}

/* ── LABEL PLACEMENT AGAINST THE WHOLE DRAWING ────────────────────────────
 *
 * `edgeLabelBox` above knows one route. That is the whole of the defect the
 * 2026-08-28 audit found on the Purdue chart: `fw → siem` is a short run whose
 * arc midpoint lands on the neighbouring `fw → erp` lane, and since the mask is
 * global the hole cut for the word "syslog" opened BOTH lines. `FW-01 → ERP-01`
 * lost its corner and ended in a dangling dot — one conduit reduced to two
 * orphan fragments floating under a caption belonging to a different conduit.
 *
 * A hole in a line is the right treatment for THAT line's own name and is
 * vandalism on any other, so the box has to be placed knowing where every other
 * route runs. It is moved perpendicular to its own run in half-lane steps —
 * along the line first, so the label stays attached to what it names — and the
 * first position clear of every foreign route and every label already placed is
 * the one it takes.
 */

/** Half a gutter lane. Small enough to stay attached, big enough to clear a run. */
const NUDGE = 9;
/** Fractions of the route's own length to try before leaving the line. */
const SLIDE = [0, 0.16, -0.16, 0.3, -0.3];
/** Clear space demanded between a label box and a foreign conduit. */
const LABEL_CLEARANCE = 2.5;

/** True when the axis-aligned segment a→b enters `box` grown by `pad`. */
function segmentHitsBox(a: Point, b: Point, box: Box, pad: number): boolean {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const limits: [number, number][] = [
    [-dx, a.x - (box.x - pad)],
    [dx, box.x + box.width + pad - a.x],
    [-dy, a.y - (box.y - pad)],
    [dy, box.y + box.height + pad - a.y]
  ];
  let t0 = 0;
  let t1 = 1;
  for (const [p, q] of limits) {
    if (p === 0) {
      if (q < 0) return false;
      continue;
    }
    const r = q / p;
    if (p < 0) {
      if (r > t1) return false;
      if (r > t0) t0 = r;
    } else {
      if (r < t0) return false;
      if (r < t1) t1 = r;
    }
  }
  return true;
}

function boxesOverlap(a: Box, b: Box, pad: number): boolean {
  return (
    a.x - pad < b.x + b.width &&
    b.x - pad < a.x + a.width &&
    a.y - pad < b.y + b.height &&
    b.y - pad < a.y + a.height
  );
}

/** The point at `t` of the path's arc length, with the run it lands on. */
function alongPath(points: Point[], t: number): { p: Point; horizontal: boolean } {
  const total = points.reduce(
    (sum, p, i) => (i === 0 ? 0 : sum + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y)),
    0
  );
  let want = Math.max(0, Math.min(1, t)) * total;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const len = Math.hypot(dx, dy);
    if (len === 0) continue;
    if (want <= len) {
      const k = want / len;
      return {
        p: { x: points[i - 1].x + dx * k, y: points[i - 1].y + dy * k },
        horizontal: Math.abs(dy) <= Math.abs(dx)
      };
    }
    want -= len;
  }
  const last = points[points.length - 1];
  const prev = points[points.length - 2] ?? last;
  return { p: last, horizontal: Math.abs(last.y - prev.y) <= Math.abs(last.x - prev.x) };
}

/**
 * Every edge label on the drawing, each placed clear of every OTHER route.
 *
 * RESOLUTION ORDER IS THE SHEET'S OWN READING ORDER — top down, then left to
 * right — AND IT USED TO BE DECLARATION ORDER.
 *
 * First come, first served: the label resolved first takes its arc midpoint and
 * every later one has to work around it. Resolving in `spec.edges` order made
 * that a property of the TYPING, which is the same defect `layout-purdue` was
 * repaired for. Measured on the two water sheets: reversing the edge list moved
 * `eenrichtingsreplicatie` from y 488 to y 461 and `onderhoudsnetwerk` from
 * 516.9 to 502.5 — the very pair whose clash the water spec still carries a
 * comment about, telling a future author which of the two to declare first.
 * Nobody should have to know that.
 *
 * Reading order is the draughtsman's own tie-break and it is derived from the
 * routes, so a spec may be written in any order and get one drawing. The
 * tie-break under it is the endpoint names — spec CONTENT, which a reordering
 * cannot change — never the index, which is the thing being removed.
 *
 * The RESULT is still returned in the caller's order, one slot per edge: the
 * caller indexes it against its own array, and only the order of resolution is
 * being changed here.
 *
 * A label with nowhere clear to go keeps its arc-midpoint position rather than
 * being dropped: a conduit whose name is missing is a worse drawing than a
 * conduit whose name is crowded, and the position is at least the one a reader
 * looks in.
 */
export function placeEdgeLabels(
  edges: readonly RoutedEdge[],
  locale: Locale,
  canvasWidth: number,
  /**
   * Structures a label may not be nudged onto — node cards, and the Purdue band
   * rows whose borders are not edges and therefore cannot be knocked out. Left
   * out, the resolver clears a conduit by pushing the box onto a band rule, and
   * the rule then runs through the lettering with nothing able to cut it.
   */
  obstacles: readonly Box[] = []
): ({ text: string; box: Box } | null)[] {
  const out: ({ text: string; box: Box } | null)[] = edges.map(() => null);
  const taken: Box[] = [];

  const anchor = (edge: RoutedEdge) =>
    edge.points.length >= 2 ? midpointOf(edge.points) : { x: 0, y: 0 };
  const order = edges
    .map((edge, i) => ({ edge, i }))
    .sort((a, b) => {
      const pa = anchor(a.edge);
      const pb = anchor(b.edge);
      return (
        pa.y - pb.y ||
        pa.x - pb.x ||
        `${a.edge.from}->${a.edge.to}`.localeCompare(`${b.edge.from}->${b.edge.to}`)
      );
    });

  for (const { edge, i } of order) {
    const placed = edgeLabelBox(edge, locale, canvasWidth);
    if (!placed) continue;
    const { width, height } = placed.box;
    const lo = PAD + width / 2;
    const hi = Math.max(lo, canvasWidth - PAD - width / 2);
    const foreign = edges.filter((_, j) => j !== i);

    // An obstacle is tested as its four RULES, not as its area: a band border is
    // what a label may not cross, while the space inside a band is ordinary
    // canvas that a same-band conduit's own label is entitled to sit in.
    const crossesRule = (box: Box) =>
      obstacles.some((o) => {
        const c: Point[] = [
          { x: o.x, y: o.y },
          { x: o.x + o.width, y: o.y },
          { x: o.x + o.width, y: o.y + o.height },
          { x: o.x, y: o.y + o.height }
        ];
        return c.some((p, k) => segmentHitsBox(p, c[(k + 1) % 4], box, 1));
      });

    const clear = (box: Box) =>
      !taken.some((t) => boxesOverlap(box, t, 1)) &&
      !crossesRule(box) &&
      !foreign.some((other) =>
        other.points.some(
          (p, k) => k > 0 && segmentHitsBox(other.points[k - 1], p, box, LABEL_CLEARANCE)
        )
      );

    let chosen = placed.box;
    let resolved = false;
    for (const t of SLIDE) {
      const { p, horizontal } = alongPath(edge.points, 0.5 + t);
      for (let step = 0; step <= 3 && !resolved; step++) {
        for (const sign of step === 0 ? [1] : [-1, 1]) {
          const dx = horizontal ? 0 : sign * step * NUDGE;
          const dy = horizontal ? sign * step * NUDGE : 0;
          const cx = Math.min(Math.max(p.x + dx, lo), hi);
          const box = { x: cx - width / 2, y: p.y + dy - height / 2, width, height };
          if (!clear(box)) continue;
          chosen = box;
          resolved = true;
          break;
        }
      }
      if (resolved) break;
    }

    taken.push(chosen);
    out[i] = { text: placed.text, box: chosen };
  }

  return out;
}

/**
 * A canvas-sized mask with a hole at every label.
 *
 * WHY A MASK AND NOT A PLATE. The previous version painted a `--card` rectangle
 * behind each label. It worked visually and cost two things. It reported as a
 * WCAG 1.4.11 failure — correctly, since a card-coloured shape on a card has
 * 1:1 contrast — so every plate needed `data-contrast-exempt`, and the count of
 * excused nodes went 26 → 63; the harness's own help says a growing exempt
 * count means something is being excused rather than fixed. And a plate is
 * opaque to whatever is UNDER it, including a neighbouring edge's marks, which
 * is how the Purdue chart came to carry half-drawn circles beside four labels.
 *
 * A mask paints nothing. Its contents are never rendered, so the contrast pass
 * measures no shapes here and needs no exemption, and the hole is a genuine
 * break in the line — which is what a drawing office puts at a label anyway.
 */
export function KnockoutMask({
  id,
  width,
  height,
  boxes
}: {
  id: string;
  width: number;
  height: number;
  boxes: readonly Box[];
}) {
  return (
    <defs>
      <mask id={id} maskUnits="userSpaceOnUse" x={0} y={0} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#fff" />
        {boxes.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.width} height={b.height} rx={2} fill="#000" />
        ))}
      </mask>
    </defs>
  );
}

/**
 * The arrowheads. Markers do not inherit `currentColor` reliably across
 * browsers, so they are painted explicitly — the precedent `twin/PathEdge.tsx`
 * already set for the same reason. `auto-start-reverse` is what lets ONE marker
 * serve both ends of a bidirectional run.
 *
 * TWO MARKERS, BECAUSE THE STROKE TABLE HAS TWO INKS. `process`, `power-ac` and
 * `power-dc` stroke `INK_STRONG`; everything else strokes `INK`. A single
 * `INK`-filled head served both until 2026-08-28, which put a
 * `--muted-foreground` arrowhead on the end of every `--foreground` process
 * pipe and power feeder — the heaviest runs on all three proof diagrams ending
 * in a head visibly lighter than the line carrying it. The head is part of the
 * line, so it takes the line's ink; `DiagramEdgeLine` picks the matching id
 * from the same `STROKE` row it draws with, which is what stops the two from
 * drifting apart the way a caller-chosen id would.
 */
export function DiagramDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      {(
        [
          ["", INK],
          [STRONG_SUFFIX, INK_STRONG]
        ] as const
      ).map(([suffix, fill]) => (
        <marker
          key={suffix}
          id={`${idPrefix}-arrow${suffix}`}
          viewBox="0 0 8 8"
          refX={7}
          refY={4}
          // userSpaceOnUse, NOT the `strokeWidth` default. Scaled by stroke, the
          // head's length was a property of the LINE rather than of the drawing:
          // a 2.25-wide process pipe grew an 11.3-unit arrow while the equipment
          // it pointed at is 12.6-25.5 units, so eleven of eighteen process
          // arrows measured at least half their target symbol's minor axis and
          // two reached 0.88x. The arrow was eating the plant. Seven user units
          // is one size for every kind, independent of the weight carrying it.
          markerUnits="userSpaceOnUse"
          markerWidth={7}
          markerHeight={7}
          orient="auto-start-reverse"
        >
          <path d="M0,0 L8,4 L0,8 z" fill={fill} />
        </marker>
      ))}
    </defs>
  );
}

/**
 * THE HOP ARCS, LIFTED OUT AND PAINTED AGAIN SOLID.
 *
 * `strokeDasharray` applies to a whole path, its `A` commands included, so on a
 * dashed kind the bridge was being chopped by the very pattern that says
 * "signal". The audit measured the result on the Purdue chart: all nine hops
 * dashed, and the `e0 x e1` bridge at (555.5, 1003.5) reduced to a detached
 * comma. A hop chopped by its own dash is not a hop — it stops saying "this
 * line bridges that one" and starts reading as debris.
 *
 * So the run is split in two: the dashed path keeps every straight, breaking to
 * a new subpath on the far side of each bridge, and the bridges themselves go
 * on a second, undashed path. Covering the dashed arc with a solid one would
 * look the same, but it leaves a dashed arc in the DOM for the next audit to
 * find and re-report; removing it says the thing once.
 *
 * SUBPATHS DO NOT REPEAT THE ARROWHEADS — measured, not assumed. A three-
 * subpath path with `marker-start`/`marker-end` renders exactly two heads, at
 * the element's ends, so the run keeps the arrow rules `carriesFlowArrow` sets.
 * The dash phase does restart at each bridge, which is where a reader is being
 * told to look anyway.
 *
 * The arcs are read back out of the `d` string the geometry layer just
 * produced, NOT re-derived. Re-deriving means duplicating `toPathDataHopped`'s
 * radius-narrowing rule, and a hop drawn at one radius and re-drawn at another
 * is a worse artefact than the dash it was meant to repair.
 */
function splitHops(d: string): { line: string; arcs: string } {
  const line: string[] = [];
  const arcs: string[] = [];
  let from = "";
  let resume = "";
  for (const m of d.matchAll(/([MLA])\s*([^MLA]+)/g)) {
    const args = m[2].trim();
    // Every command's endpoint is its last coordinate pair; on `M`/`L` that is
    // the whole argument, on `A` it is the tail after the flags.
    const end = args.slice(args.lastIndexOf(" ") + 1);
    if (m[1] === "A") {
      if (from) arcs.push(`M${from} A${args}`);
      resume = end; // the dashed run picks up again on the far side
    } else {
      if (resume) {
        line.push(`M${resume}`);
        resume = "";
      }
      line.push(`${m[1]}${args}`);
    }
    from = end;
  }
  return { line: line.join(" "), arcs: arcs.join(" ") };
}

/**
 * Clear space demanded between a mark and a hop bridge.
 *
 * A hop asserts "these two runs cross and are NOT connected". A filled circle
 * sitting in the mouth of that arc asserts the exact opposite — it is the
 * junction dot the hop exists to deny. The audit found ten marks inside hop
 * arcs on the Purdue chart, the worst 0.4 units from the bridge it sat in, and
 * read the 6x composites as letterforms: `g`, a rho, a schwa.
 *
 * 9, not the arc radius alone: the bridge is drawn at up to r=4.5 and a
 * data-link mark is a 2.6 circle with a 1.4 stroke, so its outer edge is 3.3
 * from the centre this test uses. 4.5 + 3.3 is where the two shapes merely stop
 * touching; the mark has to be visibly separate, not tangent.
 */
const HOP_CLEARANCE = 9;

/**
 * Clear space demanded between a mark and an IEC 62443 CONDUIT TICK, and it is
 * the same argument one step along.
 *
 * A tick is two bars 3.5 either side of the crossing point; a data-link mark is
 * a 2.6 circle with a 1.4 stroke, so 3.5 + 3.3 = 6.8 is where the bar merely
 * stops touching the bubble. Below that the bar BISECTS the circle and the pair
 * paints one blob — the audit read the composite as a bell, and it was not a
 * near miss but a certainty: a mark sits every 26 units along every conduit and
 * a tick sits at every zone-boundary piercing, two placement rules that never
 * consulted each other, so seven of eight ticks on this drawing carried one at
 * 2.0 units.
 *
 * THE TICK WINS. Where a conduit pierces a 62443 zone boundary the crossing is
 * the thing being asserted, while "this run is a software link" is already said
 * by the marks along the rest of the same run. 9, matching `HOP_CLEARANCE`,
 * because the requirement is identical: visibly separate, not tangent.
 */
const TICK_CLEARANCE = 9;

export interface DiagramEdgeLineProps {
  edge: RoutedEdge;
  markerId: string;
  /** Points along this route to bridge with a hop arc; see `hopPlan`. */
  hops: readonly Point[];
  /** Every label box on the drawing — a mark inside ANY of them is suppressed. */
  labelBoxes: readonly Box[];
  /**
   * EVERY hop on the drawing, for mark suppression — not just this route's.
   *
   * The same reason `labelBoxes` is global: the worst composite the audit
   * measured was `e18`'s mark 0.4 units inside `e19`'s bridge, so an edge that
   * can only see its OWN hops cannot see the collision it is half of. Defaults
   * to this route's hops, which is strictly better than nothing and keeps the
   * caller compiling; pass `hopPlan(...).flat()` to close the foreign case.
   */
  allHops?: readonly Point[];
  /**
   * Every conduit tick on the drawing, as a SEPARATE exclusion from
   * `labelBoxes` — deliberately not appended to the caller's `extraBoxes`,
   * which `BlockDiagram` also feeds to `KnockoutMask`, where each entry would
   * cut a hole in the line at exactly the crossing the tick exists to mark.
   */
  conduitTicks?: readonly Point[];
  /**
   * TRUE when a `data-link` joins two functions of ONE shared control system,
   * false when it joins INDEPENDENT systems. See `dataLinkFill` for what the
   * two symbols assert and why filled is the default.
   *
   * A PROP RATHER THAN A LOOKUP INSIDE THIS FILE, deliberately. Which side of
   * that boundary a given run falls on is a fact about the PLANT, authored
   * beside the run in the spec; a table of endpoint pairs kept in the renderer
   * would be plant knowledge stored where nobody editing the plant will look,
   * and it would go stale the first time a node is renamed. Ignored on every
   * other kind.
   */
  sharedSystem?: boolean;
}

/**
 * WHICH RUNS CARRY A FLOW ARROW. TWO DRAFTING TRADITIONS MEET HERE AND THEY
 * DISAGREE, so the answer cannot be one policy applied to the whole drawing.
 *
 * ON A P&ID AN ARROW ON A SIGNAL LINE IS MANDATORY, not decorative: ISA-5.1
 * requires arrows wherever they are needed to clarify direction of signal flow,
 * and a measurement travelling to a controller and a command travelling back to
 * a valve are drawn with identical geometry — the head is the only thing that
 * separates them. So `pneumatic`, `electrical` and `data-link` always carry one.
 *
 * ON A SINGLE-LINE DIAGRAM THE OPPOSITE HOLDS. Power flows both ways on a live
 * network and the direction is a load-flow result, not a property of the copper.
 * All fifteen power runs on the energy drawing carried a head, the single
 * loudest reason an engineer read that sheet as "not yet an SLD". The exception
 * is a genuinely bidirectional pair — the BESS charge/discharge run — where
 * reversibility IS the claim, so it keeps a head at both ends.
 *
 * THE KIND IS A SUFFICIENT PROXY FOR THE DIAGRAM, measured rather than assumed
 * before this function was left without a diagram-type argument:
 * `power-ac`/`power-dc` occur ONLY on the energy single-line (11 + 3 runs) and
 * `capillary` ONLY on the water P&ID (5 runs). A `type` prop threaded down from
 * `DiagramEdgeLayer` would decide nothing this table does not already decide,
 * and an argument that never changes an answer is where a future contradiction
 * hides.
 *
 * AN INSTRUMENT CONNECTION IS NOT A SIGNAL LINE, so the ISA rule above does not
 * reach it. It is the tap coupling the sensing element to the process; the
 * water spec says in terms that "nothing flows along it", no signal flows along
 * it either, and there is therefore no direction to clarify. The drawing was
 * contradicting its own spec by putting a head on `clearwell -> lt-601`.
 */
function carriesFlowArrow(edge: RoutedEdge): boolean {
  if (edge.kind === "capillary") return false;
  if (edge.kind === "power-ac" || edge.kind === "power-dc") return edge.bidirectional === true;
  return true;
}

/**
 * THE OPEN CIRCLE AND THE FILLED CIRCLE ARE TWO DIFFERENT STATEMENTS, and ISA
 * makes the difference normative rather than stylistic.
 *
 * A solid line carrying OPEN circles links functions WITHIN ONE shared control
 * system — a PLC and the shared-display controller it drives are two faces of
 * the same box, and no system boundary is crossed.
 *
 * A solid line carrying FILLED circles links INDEPENDENT systems: DCS to PLC,
 * PLC to historian, vendor to jump host. That is the line an OT engineer counts
 * when asked how many trust boundaries a packet crosses, so drawing it open
 * understates the drawing's own attack surface.
 *
 * FILLED IS THE DEFAULT: most runs on these drawings do cross a boundary, and
 * the failure modes are not symmetric — an independent link drawn open hides a
 * boundary, a shared link drawn filled invents one, which costs a reader a
 * question rather than a misreading.
 */
function dataLinkFill(sharedSystem: boolean): string {
  return sharedSystem ? PLATE : INK;
}

export function DiagramEdgeLine({
  edge,
  markerId,
  hops,
  labelBoxes,
  allHops = hops,
  conduitTicks = [],
  sharedSystem = false
}: DiagramEdgeLineProps) {
  if (edge.points.length < 2) return null;
  const s = STROKE[edge.kind];
  const arrowed = carriesFlowArrow(edge);
  const arrow = arrowed ? `url(#${markerId}${s.ink === INK_STRONG ? STRONG_SUFFIX : ""})` : undefined;
  const head = arrowed && edge.bidirectional ? arrow : undefined;
  // One `d`, split in two: the straights and the bridges. Both halves have to
  // come from THIS string and not a second call, or they could disagree about a
  // narrowed radius. Only a dashed kind needs the split — see `splitHops`.
  const hopped = toPathDataHopped(edge.points, hops);
  const split = s.dash ? splitHops(hopped) : null;

  /**
   * MARKS ARE SUPPRESSED WHERE A LABEL SITS, RATHER THAN COVERED THERE.
   * Suppression is decided against EVERY label on the drawing and not just this
   * edge's own, because the fragments the audit found came from a neighbouring
   * conduit's marks passing under this one's plate.
   */
  // The 8-unit pad is clear space, not a bounding-box correction: a mark
  // touching the last letter of a label reads as punctuation, which is exactly
  // the artefact the audit catalogued — stray `(`, `)` and `·` beside four
  // Purdue conduits. The mark has to be visibly separate or visibly absent.
  // 11, up from 8 on 2026-08-28. A data-link mark is a 2.6-unit circle with a
  // 1.4 stroke, so its OUTER edge is 3.3 from the centre this test uses, and at
  // a pad of 8 a mark whose centre cleared the box by 8.5 still put ink 5 units
  // from the last letter. The audit read the result exactly as it looks on the
  // page: "PROFINET·", a conduit's mark reporting as punctuation on a word.
  // A HOP AND A CONDUIT TICK ARE TREATED EXACTLY AS A LABEL IS. All three are
  // places where this run's ink has been given another meaning — the lettering
  // owns the gap, the bridge owns the arc, the tick owns the crossing — and a
  // repeated mark landing in any of them is read as part of that meaning rather
  // than as the kind it encodes. See `HOP_CLEARANCE` and `TICK_CLEARANCE`.
  const clearOfMarks = (p: Point) =>
    !allHops.some((h) => Math.hypot(p.x - h.x, p.y - h.y) < HOP_CLEARANCE) &&
    !conduitTicks.some((t) => Math.hypot(p.x - t.x, p.y - t.y) < TICK_CLEARANCE);

  const marks = (spacing: number, inset = 14) =>
    marksAlong(edge.points, spacing, inset).filter(
      (m) => !insideAny(m, labelBoxes, 11) && clearOfMarks(m)
    );

  /**
   * FOR `power-dc` AND `data-link` THE MARK IS THE KIND, so "suppressed by a
   * label" is not an acceptable outcome — it silently converts the run into a
   * different service. `marksAlong` already guarantees one mark on a short run
   * for exactly this reason, but the label filter above then removed it: a
   * 72-unit conductor puts its guaranteed mark at the midpoint, which is where
   * its label sits. The independent audit measured the result on the energy
   * drawing — `bess -> pcs` (an 800 V battery string) and `pv-array -> pv-fuse`
   * carried no tick at all and rendered byte-identically to the 400 V AC feeder
   * stacked directly above them.
   *
   * So when the filter empties the list, re-sample densely and take a position
   * that clears the labels, rather than yielding the distinction.
   */
  const marksRequired = (spacing: number, inset = 14) => {
    const kept = marks(spacing, inset);
    if (kept.length > 0) return kept;
    const clear = marksAlong(edge.points, 6, 6).filter((m) => !insideAny(m, labelBoxes, 11));
    // The hop and conduit-tick tests are a PREFERENCE here, not a veto, and
    // they rank the way the damage does. A mark in a bridge or on a tick is a
    // misread crossing; NO mark is a DC conductor drawn as an AC one, which is
    // the kind itself going missing. So a clear position is taken when one
    // exists and the run keeps its mark when none does.
    const best = clear.filter(clearOfMarks);
    const pool = best.length ? best : clear;
    return pool.length ? [pool[Math.floor(pool.length / 2)]] : [];
  };

  return (
    <g data-edge-kind={edge.kind} data-edge-id={edge.id} data-edge-ends={`${edge.from}->${edge.to}`}>
      {/* THE INSTRUMENT CONNECTION IS ONE PLAIN LINE, and until 2026-08-28 it
          was two — `capillary` drew a pair of parallel offset paths 3.2 units
          apart, which is not a line symbol ISA-5.1 defines. Its table has no
          two-parallel-line connection at all: the instrument-to-process
          connection is a single plain line, and a capillary — a sensing line
          filled with a transmitting fluid — is a solid line crossed with X
          hatching, a different mark entirely.

          WORSE, THE DOUBLE LINE IS ALREADY SPOKEN FOR ON THE SAME SHEET: a
          double horizontal bar drawn INSIDE an instrument bubble is ISA's mark
          for a secondary or local panel location. Two parallel lines as a
          connection style overloaded a symbol carrying another meaning three
          glyphs away.

          NONE OF THE FIVE RUNS IS A FILLED CAPILLARY, so none gets the X
          hatching: they hang a mag flow tube, a chlorine analyser, a level
          element and a UV intensity element off pipes and a clearwell, and not
          one is a diaphragm seal. `EDGE_KIND_LABEL` already reads "instrument
          connection" rather than "capillary tube" for this reason; the drawn
          line now agrees with the announced words. Folding it into the common
          branch also gives it the hop treatment its `HOP_WEIGHT` of 2 always
          claimed — as a bespoke pair of offset paths it silently ignored the
          hop plan handed to it. */}
      <path
        d={split ? split.line : hopped}
        fill="none"
        stroke={s.ink}
        strokeWidth={s.width}
        strokeDasharray={s.dash}
        strokeLinecap="butt"
        strokeLinejoin="round"
        markerEnd={arrow}
        markerStart={head}
      />
      {/* Only a DASHED kind has a bridge to repair; a solid run's arc is
          already continuous and a second path would be dead DOM. */}
      {split && split.arcs ? (
        <path
          data-hop-arcs={edge.id}
          d={split.arcs}
          fill="none"
          stroke={s.ink}
          strokeWidth={s.width}
          strokeLinecap="butt"
        />
      ) : null}

      {/* Pneumatic: the double cross-hatch ISA uses for an air signal. */}
      {edge.kind === "pneumatic" &&
        marks(20).map((m, i) => (
          <g
            key={i}
            transform={`translate(${m.x.toFixed(2)} ${m.y.toFixed(2)}) rotate(${m.angle.toFixed(1)})`}
          >
            <line x1={-2} y1={-4.5} x2={2} y2={4.5} stroke={s.ink} strokeWidth={1.5} />
            <line x1={2} y1={-4.5} x2={6} y2={4.5} stroke={s.ink} strokeWidth={1.5} />
          </g>
        ))}

      {/* DC: the double tick that separates a DC conductor from an AC one. A
          tighter pitch than the other marked kinds, because a conductor between
          two adjacent nodes is short — the `bess → pcs` run is 72 units — and
          an unticked DC line is not a quieter DC line, it is an AC line. The
          wider inset keeps the tick off the arrowhead, which on a
          double-headed run sits at both ends. */}
      {edge.kind === "power-dc" &&
        marksRequired(30, 18).map((m, i) => (
          <g
            key={i}
            transform={`translate(${m.x.toFixed(2)} ${m.y.toFixed(2)}) rotate(${m.angle.toFixed(1)})`}
          >
            <line x1={-2} y1={-4.6} x2={-2} y2={4.6} stroke={s.ink} strokeWidth={1.6} />
            {/* SOLID OVER DASHED, WHICH IS THE WHOLE OF IEC 60617'S DC MARK.
                Two EQUAL SOLID bars across a conductor is not the DC symbol at
                all — it is the capacitor, and on the BESS run this pair sat
                directly above BAT-01, whose own glyph is the alternating
                long/short bars of a cell. The drawing was therefore labelling a
                battery conductor as a capacitor. The trailing bar is broken so
                the pair reads as one solid line and one dashed one.

                THE PHASE IS CHOSEN SO A GAP STRADDLES THE CONDUCTOR, not a
                dash. `1.9 1.6` put a dash across the middle of the 9.2-unit
                bar, and the 2.1-wide conductor then hid exactly that dash — the
                mark rendered as two detached squares, which reads as a pair of
                dots rather than as a broken line. `1.45 1.2` lands gaps at
                1.45-2.65, 4.10-5.30 and 6.75-7.95, so the centre gap is the one
                the conductor crosses and four segments stay visible. */}
            <line
              x1={2}
              y1={-4.6}
              x2={2}
              y2={4.6}
              stroke={s.ink}
              strokeWidth={1.6}
              strokeDasharray="1.45 1.2"
            />
          </g>
        ))}

      {/* Data link: the interposed circles that separate a software link from a
          wire, on a SOLID run. Open says the two ends are functions of one
          shared system, filled says they are independent systems — see
          `dataLinkFill`. The circle keeps its `s.ink` stroke in both cases, so
          the open variety still reads as a ring rather than as a gap. */}
      {edge.kind === "data-link" &&
        marksRequired(26).map((m, i) => (
          <circle
            key={i}
            cx={m.x}
            cy={m.y}
            r={2.6}
            fill={dataLinkFill(sharedSystem)}
            stroke={s.ink}
            strokeWidth={1.4}
          />
        ))}
    </g>
  );
}

/**
 * The label, drawn ON TOP of the masked line layer and carrying no plate of its
 * own — the hole in the mask is its clear space. Separating it from the line is
 * what lets one mask serve every edge: the lines go inside it, the lettering
 * goes over it.
 */
export function DiagramEdgeLabel({
  placed,
  edgeId
}: {
  placed: { text: string; box: Box };
  /** Which conduit this names. Carried into the DOM so a render probe can check
   *  that the hole cut for it opens that conduit and no other. */
  edgeId?: string;
}) {
  const { text, box } = placed;
  return (
    <text
      data-label-for={edgeId}
      data-label-box={`${box.x.toFixed(2)},${box.y.toFixed(2)},${box.width.toFixed(2)},${box.height.toFixed(2)}`}
      x={box.x + box.width / 2}
      y={box.y + box.height - 4}
      textAnchor="middle"
      fontSize={EDGE_LABEL_SIZE}
      letterSpacing="0.02em"
      fill={INK}
    >
      {text}
    </text>
  );
}
