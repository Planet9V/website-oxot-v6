import ELK, { type ElkNode } from "elkjs/lib/elk.bundled.js";
import type { DiagramSpec, DiagramType } from "./types";
import { resolveSymbol } from "./types";
import { boxSideOf, snapTerminal } from "./geometry";
import type { Point } from "./geometry";
import { CLASS_OF, declaredPorts, portFor } from "./ports";
import type { EdgeClass, PortSide } from "./ports";
import {
  BUS_W,
  GLYPH,
  GLYPH_TOP,
  NODE_H,
  NODE_W,
  PAD,
  PID_LABEL_BAND,
  PID_NODE_H
} from "./layout-shared";
import type { DiagramLayout, PlacedNode, RoutedEdge } from "./layout-shared";
import { layoutPurdue } from "./layout-purdue";

/** Re-exported so a caller needing both a layout and its geometry has one import. */
export type { Point } from "./geometry";
export * from "./layout-shared";

/**
 * WHERE EVERYTHING GOES. Nothing in this file knows what a pump looks like.
 *
 * ELK IN NODE, NOT IN A BROWSER, AND NOT VIA draw.io. `Diagram` is an async
 * Server Component and awaits this, so layout runs once during `next build`
 * and ships as static SVG. That is the reason draw.io's own exporter was
 * rejected as the render path even though it runs the same ELK algorithm: an
 * exported drawing arrives with baked hex fills, baked English strings and
 * baked stroke widths, and every one of those is a thing this site's
 * theme-token, bilingual and WCAG 1.4.11 machinery has to be able to change
 * after the fact. Running the layout ourselves keeps the geometry from ELK and
 * leaves every paint decision to the render layer.
 *
 * `elk.bundled.js` is imported directly rather than the default worker entry,
 * for the reason `twin/layout.ts` already records: elkjs's web-worker import
 * has a history of bundler-resolution failures, and the bundled build runs
 * in-thread.
 */

/**
 * One options block per diagram type, so adding a type is a table entry.
 *
 * `pid` is left-to-right because a process chain is read the way the product
 * flows. `network` and `c4` run downward because their hierarchy is vertical.
 * `purdue` appears here only for the ORDERING pass — its real geometry is
 * computed in ./layout-purdue.ts.
 */
const ELK_OPTIONS: Record<DiagramType, Record<string, string>> = {
  pid: {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "elk.edgeRouting": "ORTHOGONAL",
    // 58, DOWN FROM 76. Between-layer spacing is canvas WIDTH, and canvas width
    // is rendered type size — see the aspect-ratio note below. Measured on this
    // spec: 76 gives a 1,038-unit canvas and 70 gives 1,008, both of which put
    // the instrument-bubble loop numerals under 11 css px in the gallery
    // column; 58 gives 948 and clears it. The gap a route actually needs is
    // ~104 units between GLYPH edges, which 58 still leaves.
    "elk.layered.spacing.nodeNodeBetweenLayers": "58",
    // 40 units of visible gap PLUS the 38-unit label band below the declared
    // box — see `PID_NODE_H`. At 40 the next row would stack on the captions.
    "elk.spacing.nodeNode": "78",
    "elk.spacing.edgeNode": "22",
    "elk.spacing.edgeEdge": "14",
    // A ten-stage treatment train laid out as one row is ~2,000 units wide and
    // 130 tall, which scales into a text column at about ten pixels a symbol.
    // ELK's wrapping folds the chain into rows instead, as a real P&ID sheet
    // does.
    //
    // 0.6 SINCE 2026-08-28, DOWN FROM 1.4, AND THE REASON IS TYPE SIZE RATHER
    // THAN COMPOSITION. `Diagram` sizes the SVG to its column and lets the
    // viewBox scale, so canvas WIDTH sets rendered type size: at 1.4 the water
    // train's canvas came out 1,282 units wide in a 1,166-pixel column — a 0.91
    // scale, and the independent audit measured the result, 8.64 px edge labels
    // and 7.9 px instrument-bubble numerals. Wrapping one row earlier trades
    // canvas width for canvas height, which costs nothing here: the figure
    // scrolls with the page vertically either way.
    //
    // ELK DOES NOT READ THIS AS A CONTINUUM. Swept across 0.35–2.4 on this spec
    // it collapses to two wrap counts, 948 x 1,225 and 1,282 x 780, and the
    // boundary sits between 0.7 and 0.8 — so 0.6 is chosen to be clear of it
    // rather than to express a proportion. At the 0.7 boundary the same spec
    // flips wrap count on a 6-unit change in layer spacing, which is not a
    // property to build a type scale on.
    "elk.aspectRatio": "0.6",
    "elk.layered.wrapping.strategy": "MULTI_EDGE",
    // 14, down from 28. It buys vertical room between wrapped rows for the
    // return runs and buys nothing else; at 28 the water train stood 1,225
    // units tall against 948 wide, and half of that height was empty canvas
    // between rows.
    "elk.layered.wrapping.additionalEdgeSpacing": "14"
  },
  block: {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "elk.edgeRouting": "ORTHOGONAL",
    "elk.layered.spacing.nodeNodeBetweenLayers": "88",
    "elk.spacing.nodeNode": "44",
    "elk.spacing.edgeNode": "24",
    "elk.spacing.edgeEdge": "14"
  },
  process: {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "elk.edgeRouting": "ORTHOGONAL",
    "elk.layered.spacing.nodeNodeBetweenLayers": "88",
    "elk.spacing.nodeNode": "44",
    "elk.spacing.edgeNode": "24",
    "elk.spacing.edgeEdge": "14"
  },
  network: {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "elk.edgeRouting": "ORTHOGONAL",
    "elk.layered.spacing.nodeNodeBetweenLayers": "72",
    "elk.spacing.nodeNode": "44",
    "elk.spacing.edgeNode": "22",
    "elk.spacing.edgeEdge": "14"
  },
  c4: {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "elk.edgeRouting": "ORTHOGONAL",
    "elk.layered.spacing.nodeNodeBetweenLayers": "88",
    "elk.spacing.nodeNode": "48",
    "elk.spacing.edgeNode": "24",
    "elk.spacing.edgeEdge": "14"
  },
  purdue: {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "elk.edgeRouting": "POLYLINE",
    "elk.layered.spacing.nodeNodeBetweenLayers": "64",
    "elk.spacing.nodeNode": "40"
  }
};

export function edgeId(index: number): string {
  return `e${index}`;
}

/** Declared node box. A busbar is three boxes wide; a P&ID node is glyph-tall. */
function nodeBox(spec: DiagramSpec, id: string): { width: number; height: number } {
  const node = spec.nodes.find((n) => n.id === id);
  return {
    width: node?.render === "bus" ? BUS_W : NODE_W,
    height: spec.type === "pid" ? PID_NODE_H : NODE_H
  };
}

export function elkGraph(spec: DiagramSpec, options: Record<string, string>): ElkNode {
  return {
    id: "root",
    layoutOptions: options,
    children: spec.nodes.map((n) => ({ id: n.id, ...nodeBox(spec, n.id) })),
    edges: spec.edges.map((e, i) => ({
      id: edgeId(i),
      // `rankReversed` flips the edge ELK ranks on and nothing else. The routed
      // points come back the other way round and are reversed on the way out,
      // so every consumer downstream still sees from → to.
      sources: [e.rankReversed ? e.to : e.from],
      targets: [e.rankReversed ? e.from : e.to]
    }))
  };
}

/**
 * WRAPPING IS CONDITIONAL, because it is not free.
 *
 * A wrapped chain pays for its legibility with a long return line from the end
 * of one row to the start of the next. That is a good trade at nine stages,
 * where an unwrapped row renders its symbols at about ten pixels, and a bad one
 * at four, where the row fits comfortably and the return line would be the
 * biggest mark on the page. Six is where the row stops fitting a normal text
 * column at a readable symbol size — measured on the probe renders, not chosen
 * for roundness.
 */
const WRAP_ABOVE = 6;

function optionsFor(spec: DiagramSpec): Record<string, string> {
  const base = ELK_OPTIONS[spec.type];
  if (spec.type !== "pid" || spec.nodes.length > WRAP_ABOVE) return base;
  const short = { ...base };
  delete short["elk.aspectRatio"];
  delete short["elk.layered.wrapping.strategy"];
  delete short["elk.layered.wrapping.additionalEdgeSpacing"];
  return short;
}

/* ── TERMINAL SNAPPING ────────────────────────────────────────────────────
 *
 * ELK returns an endpoint somewhere on the side of the box it was handed, and
 * it fans same-side edges apart across that side. The audit measured what that
 * costs a drawing whose nodes are SYMBOLS rather than boxes: fifteen of forty
 * water endpoints 7–11 units off the connector, "P-301 has two floating arrows
 * and is touched by nothing".
 *
 * The correction is applied HERE rather than in the renderer because it is a
 * fact about the route and not about how the route is painted — the hop
 * planner, the label placement and the mask all read these same points, and a
 * renderer-local fudge would leave the other three disagreeing with the picture.
 */

/** Each further line landing on one port jogs further out, so a fan stays legible. */
const JOG_BASE = 13;
const JOG_STEP = 8;

function snapToGlyphPorts(spec: DiagramSpec, nodes: PlacedNode[], edges: RoutedEdge[]): void {
  const box = new Map(nodes.map((n) => [n.id, n]));
  const glyph = new Map(spec.nodes.map((n) => [n.id, resolveSymbol(n.symbol)]));
  const glyphLeft = (NODE_W - GLYPH) / 2;

  /**
   * A NODE'S INLET AND ITS OUTLET MUST NEVER BE THE SAME POINT.
   *
   * The previous ledger counted claims per `${id}:${side}` and spent the count
   * on the APPROACH JOG only, so two lines arriving on one side still landed on
   * one terminal. The independent audit measured what that draws: on F-401 the
   * inbound `clarifier->filter` and the outbound `filter->uv` both terminated at
   * (358, 567), so the pipe formed a bracket over the filter and the vessel hung
   * beneath an unbroken through-run. **As drawn, the water bypassed the filter.**
   * Ten of fifty water endpoints collapsed this way across seven nodes.
   *
   * So a claim now records the SERVICE and the DIRECTION as well as the side,
   * and a contested port is re-seated: first onto a free declared port, chosen
   * by bearing toward the far end of the run, and failing that onto the cell
   * flank. `CLASS_OF` is imported rather than re-declared — `ports.ts` owns that
   * table and a second copy would drift from it.
   *
   * THE DIRECTION TERM IS SAFE HERE ONLY BECAUSE THIS PASS IS GATED TO `pid`.
   * On the energy single-line, T-01 carries the 400 V feeder out and the N-PE
   * bond in on ONE LV terminal, and that shared point IS the star point; a rule
   * that spread every in/out pair would move the earth bond onto the 11 kV
   * winding. There is no star point on a P&ID. Do not lift this into `ports.ts`.
   */
  const claims = new Map<string, { port: Point; side: PortSide; cls: EdgeClass; out: boolean }[]>();
  const at = (a: Point, b: Point) => Math.abs(a.x - b.x) < 0.05 && Math.abs(a.y - b.y) < 0.05;

  for (const edge of edges) {
    if (edge.points.length < 2) continue;
    for (const atStart of [true, false]) {
      const id = atStart ? edge.from : edge.to;
      const b = box.get(id);
      if (!b) continue;
      const p = atStart ? edge.points[0] : edge.points[edge.points.length - 1];
      const side = boxSideOf(b, p);
      if (!side) continue;

      const Glyph = glyph.get(id);
      const cls = CLASS_OF[edge.kind];
      const taken = claims.get(id) ?? [];
      // ON A P&ID, TWO LINES NEVER TERMINATE AT ONE NOZZLE, so ANY co-location
      // is a clash here — not merely a cross-service or cross-direction one.
      // The looser test still let two OUTBOUND PROCESS lines share a point,
      // which is how CL-301 came to discharge sludge and clarified effluent
      // from the same 3 o'clock nozzle. There is no P&ID equivalent of the
      // single-line star point to make a shared terminal legitimate.
      const clash = (q: Point) => taken.some((c) => at(c.port, q));

      const declared = declaredPorts(Glyph);
      const hint = atStart ? edge.fromPort : edge.toPort;
      const named = hint ? declared.find((q) => q.name === hint) : undefined;

      let port: Point = named ?? portFor(Glyph, side);
      // A named nozzle is a statement about the EQUIPMENT and outranks bearing,
      // so it is taken as given and never re-seated.
      if (!named && clash(port)) {
        const cx = b.x + glyphLeft + GLYPH / 2;
        const cy = b.y + GLYPH_TOP + GLYPH / 2;
        const far = atStart ? edge.points[edge.points.length - 1] : edge.points[0];
        // Dot product of the port's offset from the cell centre with the
        // direction of travel: the nozzle that already points where the line is
        // going wins, which is what puts a filter's outlet downstream of its
        // inlet rather than merely somewhere else.
        const score = (q: Point) =>
          (q.x - GLYPH / 2) * (far.x - cx) + (q.y - GLYPH / 2) * (far.y - cy);
        const free = declaredPorts(Glyph).filter((q) => !taken.some((c) => at(c.port, q)));
        if (free.length > 0) {
          port = free.reduce((best, q) => (score(q) > score(best) ? q : best), free[0] as Point);
        } else {
          const toward: PortSide = far.x >= cx ? "e" : "w";
          const flank = [
            portFor(undefined, toward),
            portFor(undefined, toward === "e" ? "w" : "e"),
            portFor(undefined, side)
          ].find((q) => !taken.some((c) => at(c.port, q)));
          if (flank) port = flank;
        }
      }

      const rank = taken.filter((c) => at(c.port, port)).length;
      claims.set(id, [...taken, { port, side, cls, out: atStart }]);
      edge.points = snapTerminal(
        edge.points,
        { x: b.x + glyphLeft + port.x, y: b.y + GLYPH_TOP + port.y },
        atStart,
        JOG_BASE + rank * JOG_STEP
      );
    }
  }
}

/**
 * Every line touching a busbar lands ON the rail, which is the whole reason the
 * bus is drawn as a rail. Only the cross-axis coordinate moves — a feeder keeps
 * the x ELK chose for it, so the taps stay spread along the bus rather than
 * collapsing onto its centre.
 */
function snapToBusRail(spec: DiagramSpec, nodes: PlacedNode[], edges: RoutedEdge[]): void {
  const rails = new Map<string, number>();
  for (const n of nodes) {
    if (spec.nodes.find((s) => s.id === n.id)?.render === "bus") {
      rails.set(n.id, n.y + GLYPH_TOP + GLYPH / 2);
    }
  }
  if (rails.size === 0) return;

  for (const edge of edges) {
    if (edge.points.length < 2) continue;
    for (const atStart of [true, false]) {
      const rail = rails.get(atStart ? edge.from : edge.to);
      if (rail === undefined) continue;
      const p = atStart ? edge.points[0] : edge.points[edge.points.length - 1];
      edge.points = snapTerminal(edge.points, { x: p.x, y: rail }, atStart, JOG_BASE);
    }
  }
}

/** Layered layout, taking ELK's own bend points through the snapping pass. */
async function layoutLayered(spec: DiagramSpec): Promise<DiagramLayout> {
  const elk = new ELK();
  const result = await elk.layout(elkGraph(spec, optionsFor(spec)));

  const nodes: PlacedNode[] = (result.children ?? []).map((c) => ({
    id: c.id,
    x: (c.x ?? 0) + PAD,
    y: (c.y ?? 0) + PAD,
    width: c.width ?? NODE_W,
    height: c.height ?? NODE_H
  }));

  const edges: RoutedEdge[] = (result.edges ?? []).map((e, i) => {
    const declared = spec.edges[i];
    const section = e.sections?.[0];
    const points: Point[] = section
      ? [section.startPoint, ...(section.bendPoints ?? []), section.endPoint].map((p) => ({
          x: p.x + PAD,
          y: p.y + PAD
        }))
      : [];
    return {
      id: e.id,
      from: declared.from,
      to: declared.to,
      kind: declared.kind,
      label: declared.label,
      bidirectional: declared.bidirectional,
      fromPort: declared.fromPort,
      toPort: declared.toPort,
      sharedSystem: declared.sharedSystem,
      // A rank-reversed edge was laid out backwards; put it back the way the
      // spec declared it, so the arrowhead points where the plant points.
      points: declared.rankReversed ? points.reverse() : points
    };
  });

  if (spec.type === "pid") snapToGlyphPorts(spec, nodes, edges);
  snapToBusRail(spec, nodes, edges);

  return {
    nodes,
    edges,
    width: (result.width ?? 0) + PAD * 2,
    // The last P&ID row's captions hang below the box ELK measured.
    height: (result.height ?? 0) + PAD * 2 + (spec.type === "pid" ? PID_LABEL_BAND : 0),
    bands: [],
    bandWidth: 0
  };
}

export async function layoutDiagram(spec: DiagramSpec): Promise<DiagramLayout> {
  return spec.type === "purdue" ? layoutPurdue(spec, ELK_OPTIONS.purdue) : layoutLayered(spec);
}
