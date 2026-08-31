import { createElement } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import {
  GLYPH,
  GLYPH_TOP,
  LABEL_LEADING,
  LABEL_SIZE,
  LABEL_TOP_PLAIN,
  LABEL_TOP_TAGGED,
  NODE_W,
  PAD,
  TAG_SIZE,
  TAG_Y
} from "./layout-shared";
import type { DiagramLayout, PlacedNode } from "./layout-shared";
import { hopPlan } from "./geometry";
import type { Box, Point } from "./geometry";
import { renderModes, snapToGlyphPorts, spreadBusTaps } from "./ports";
import {
  DiagramDefs,
  DiagramEdgeLabel,
  DiagramEdgeLine,
  HOP_WEIGHT,
  INK,
  INK_STRONG,
  KnockoutMask,
  PLATE,
  placeEdgeLabels
} from "./edge-line";
import { resolveSymbol } from "./types";
import type { DiagramNode, DiagramSpec, RenderMode } from "./types";

/**
 * THE BASE RENDERER, and the home of the primitives the other two specialise.
 *
 * `PidDiagram` and `PurdueDiagram` import `DiagramEdgeLayer`, `DiagramNodeMark`
 * and the ink constants from here rather than from `Diagram.tsx`, so the module
 * graph stays acyclic: `Diagram` → the three type renderers → this file →
 * `edge-line.tsx`. The generic case owning the shared parts is the arrangement
 * that avoids a cycle without inventing another file.
 *
 * `block`, `process`, `network` and `c4` all render through this component.
 * They differ in ELK options — direction and spacing, set in `layout.ts` — not
 * in what a node or an edge looks like, and duplicating a renderer to express a
 * spacing constant is exactly the duplication this subsystem exists to end.
 */

export { DiagramDefs, DiagramEdgeLine, INK, INK_STRONG, PLATE } from "./edge-line";

/** Greedy wrap to at most two lines. The accessible restatement carries the full string. */
function wrap(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const out: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (!line) line = word;
    else if (`${line} ${word}`.length <= maxChars) line = `${line} ${word}`;
    else {
      out.push(line);
      line = word;
    }
  }
  if (line) out.push(line);
  return out.slice(0, 2);
}

/** Wrap width in characters, set against the caption's own type size. */
const WRAP_CHARS = 19;
/** Rough advance width of the caption face, for sizing the knock-out. */
const CAPTION_ADVANCE = 0.55;

interface CaptionLine {
  y: number;
  text: string;
  size: number;
}

/**
 * WHERE A NODE'S CAPTION SITS RELATIVE TO ITS GLYPH, and the choice is forced by
 * geometry rather than taste.
 *
 * `"below"` is the boxed default and is fine while the conductor arrives from
 * the side. A SINGLE-LINE DIAGRAM RUNS DOWN THE PAGE: an `inline` node's
 * conductor leaves the symbol's south terminal and continues straight down, so
 * a caption centred underneath is struck through by the node's own outgoing
 * run. Not "sometimes" — every time, on every node, because the caption is
 * centred on the same x the conductor uses. So an inline caption goes beside.
 */
export type CaptionSide = "below" | "left" | "right";

/** Where the 32-unit glyph cell sits inside the 124-unit node box. */
const GLYPH_LEFT = (NODE_W - GLYPH) / 2;
const GLYPH_MID_Y = GLYPH_TOP + GLYPH / 2;
/** Clear space between the glyph cell and a caption set beside it. */
const SIDE_GAP = 6;

function captionLines(node: DiagramNode, locale: Locale, side: CaptionSide = "below"): CaptionLine[] {
  const label = wrap(pick(node.label, locale), WRAP_CHARS);
  const rows: { text: string; size: number }[] = [
    ...(node.tag ? [{ text: node.tag, size: TAG_SIZE }] : []),
    ...label.map((text) => ({ text, size: LABEL_SIZE }))
  ];
  if (side === "below") {
    const top = node.tag ? LABEL_TOP_TAGGED : LABEL_TOP_PLAIN;
    return rows.map((r, i) => ({
      ...r,
      y: r.size === TAG_SIZE ? TAG_Y : top + (i - (node.tag ? 1 : 0)) * LABEL_LEADING
    }));
  }
  // Beside: the block is centred on the GLYPH's mid-height, not on the box's,
  // so the tag and the symbol read as one mark however many label lines wrap.
  // 0.36 of the type size lifts the baseline set onto the optical centre.
  const first = GLYPH_MID_Y - ((rows.length - 1) * LABEL_LEADING) / 2 + LABEL_SIZE * 0.36;
  return rows.map((r, i) => ({ ...r, y: first + i * LABEL_LEADING }));
}

/** Painted width of one caption line, including the clear space around it. */
function lineWidth(line: CaptionLine): number {
  return line.text.length * line.size * CAPTION_ADVANCE + 8;
}

/** The x a caption line is anchored at, in node-box coordinates. */
function captionX(side: CaptionSide, boxWidth: number): number {
  if (side === "below") return boxWidth / 2;
  return side === "right" ? GLYPH_LEFT + GLYPH + SIDE_GAP : GLYPH_LEFT - SIDE_GAP;
}

/**
 * CLEAR SPACE BEHIND A CAPTION THAT HAS NO CARD BEHIND IT.
 *
 * A boxed node already has its card behind its text. A P&ID node does not — the
 * symbol IS the equipment, so there is no card — and a caption sitting in open
 * canvas gets struck through by whatever the router put at that height. The
 * audit found it on the water train: "the uv → clearwell return line runs
 * straight through the baseline of the word 'residual' — it reads as
 * strikethrough". Both the English and the Dutch render showed it.
 *
 * These boxes go into `KnockoutMask`, not onto the canvas as painted plates. A
 * break in a run where a label sits is what every drawing office does and what
 * a reader expects; a line THROUGH lettering reads as a rendering error.
 */
export function captionBoxes(
  node: DiagramNode,
  box: PlacedNode,
  locale: Locale,
  side: CaptionSide = "below"
): Box[] {
  return captionLines(node, locale, side).map((line) => {
    const width = lineWidth(line);
    const anchor = box.x + captionX(side, box.width);
    return {
      x: side === "below" ? anchor - width / 2 : side === "right" ? anchor - 4 : anchor - width + 4,
      y: box.y + line.y - line.size * 0.82,
      width,
      height: line.size + 3.5
    };
  });
}

function NodeCaption({
  node,
  width,
  locale,
  side = "below"
}: {
  node: DiagramNode;
  width: number;
  locale: Locale;
  side?: CaptionSide;
}) {
  return (
    <>
      {captionLines(node, locale, side).map((line, i) => (
        <text
          key={i}
          x={captionX(side, width)}
          y={line.y}
          textAnchor={side === "below" ? "middle" : side === "right" ? "start" : "end"}
          fontSize={line.size}
          letterSpacing={line.size === TAG_SIZE ? "0.08em" : "0.01em"}
          fill={line.size === TAG_SIZE ? INK : INK_STRONG}
          style={line.size === TAG_SIZE ? { fontFamily: "var(--font-mono)" } : undefined}
        >
          {line.text}
        </text>
      ))}
    </>
  );
}

/**
 * A BUSBAR IS A LENGTH OF CONDUCTOR, NOT A DEVICE WITH A SYMBOL.
 *
 * Drawn as a normal 124-unit boxed node the three-line bus stencil rendered as
 * three short strokes inside a card, and the audit read it exactly as it looks:
 * "BB-01 rendered as a boxed node reads as a hamburger icon". A bus is drawn as
 * a rail long enough for its taps to spread along, and `layout.ts` snaps every
 * incident endpoint onto that rail, so each feeder lands on the conductor
 * rather than on a bounding box near it.
 */
function BusRail({ node, box, locale }: { node: DiagramNode; box: PlacedNode; locale: Locale }) {
  const y = GLYPH_TOP + GLYPH / 2;
  return (
    <g transform={`translate(${box.x} ${box.y})`} data-node-id={node.id}>
      <line x1={0} y1={y} x2={box.width} y2={y} stroke={INK_STRONG} strokeWidth={3.5} />
      {/* End caps: the rail is a conductor of finite extent, not a line running
          off the edge of the drawing. */}
      <line x1={0} y1={y - 5} x2={0} y2={y + 5} stroke={INK_STRONG} strokeWidth={2} />
      <line x1={box.width} y1={y - 5} x2={box.width} y2={y + 5} stroke={INK_STRONG} strokeWidth={2} />
      <NodeCaption locale={locale} node={node} width={box.width} />
    </g>
  );
}

export interface DiagramNodeMarkProps {
  node: DiagramNode;
  box: PlacedNode;
  locale: Locale;
  /** `false` for P&ID, where the symbol IS the equipment and a box around it is wrong. */
  boxed?: boolean;
  /** Defaults to the node's own `render`, or `"card"`. */
  mode?: RenderMode;
  /** Where the caption sits. Ignored when `mode` is `"reference"`, which has none. */
  captionSide?: CaptionSide;
}

/** One node: its glyph in the 32-unit cell, its ISA tag, its label. */
export function DiagramNodeMark({
  node,
  box,
  locale,
  boxed = true,
  mode,
  captionSide = "below"
}: DiagramNodeMarkProps) {
  const how: RenderMode = mode ?? node.render ?? "card";
  if (how === "bus") return <BusRail box={box} locale={locale} node={node} />;
  // An inline symbol IS the apparatus, exactly as on a P&ID: the conductor runs
  // through it and a card around it asserts an enclosure that is not there.
  const bare = how === "inline" || how === "reference";

  const Glyph = resolveSymbol(node.symbol);
  // Unreachable in practice — `assertSpecResolves` has already thrown by here.
  // Kept because the type is `| undefined`, and casting it away would be the
  // exact silent fallback this subsystem exists to forbid.
  if (!Glyph) return null;

  return (
    <g transform={`translate(${box.x} ${box.y})`} data-node-id={node.id}>
      {boxed && !bare && (
        <rect
          width={box.width}
          height={box.height}
          rx={3}
          fill={PLATE}
          stroke={INK}
          strokeWidth={1.25}
        />
      )}
      {/* `createElement` rather than `<Glyph />`: the glyph is a stable
          module-level export looked up in a table, but a locally-bound
          capitalised identifier reads to `react-hooks/static-components` as a
          component DEFINED during render, which it is not. Saying "instantiate
          the component I was handed" states the truth and keeps the rule on. */}
      <g transform={`translate(${GLYPH_LEFT} ${GLYPH_TOP})`} style={{ color: INK_STRONG }}>
        {createElement(Glyph)}
      </g>
      {how !== "reference" && (
        <NodeCaption locale={locale} node={node} side={captionSide} width={box.width} />
      )}
    </g>
  );
}

export interface TypeRendererProps {
  spec: DiagramSpec;
  layout: DiagramLayout;
  locale: Locale;
  idPrefix: string;
}

export interface DiagramEdgeLayerProps extends TypeRendererProps {
  /** Caption boxes from unboxed nodes, which have no card of their own. */
  extraBoxes?: readonly Box[];
  /**
   * Where this drawing marks a controlled crossing, so a repeated edge mark is
   * kept off it. A SEPARATE list from `extraBoxes` on purpose: that one is
   * forwarded to `KnockoutMask` as well, and a hole cut at a conduit tick would
   * delete the line at exactly the piercing the tick is there to point at.
   */
  conduitTicks?: readonly Point[];
}

/**
 * EVERY EDGE ON THE DRAWING, AS ONE LAYER, AND THAT IS LOAD-BEARING.
 *
 * Three things here can only be decided with the whole edge set in hand, and
 * each of them was a defect when it was decided per edge. The hop plan needs
 * every route, to know which crossings exist and which run yields. The mark
 * suppression needs every label box, because the fragments the audit found came
 * from one conduit's marks passing under a DIFFERENT conduit's label. And the
 * mask is one element serving all of them, so the lines go inside it and the
 * lettering goes over it — a plate per edge could not do that without also
 * covering its neighbours, which is precisely what it was doing.
 */
export function DiagramEdgeLayer({
  layout,
  locale,
  idPrefix,
  extraBoxes = [],
  conduitTicks = []
}: DiagramEdgeLayerProps) {
  // `placeEdgeLabels`, not a per-edge `edgeLabelBox`: a label's position has to
  // be decided against every OTHER route on the drawing, because the mask is
  // global and a hole cut for one conduit's name opens whatever else runs under
  // it. See the placement note in `edge-line.tsx`.
  const rules = layout.bands.map((band) => ({
    x: PAD,
    y: band.y,
    width: layout.bandWidth,
    height: band.height
  }));
  const placed = placeEdgeLabels(layout.edges, locale, layout.width, rules);
  const labelBoxes = placed
    .filter((p): p is { text: string; box: Box } => p !== null)
    .map((p) => p.box);
  const boxes = [...labelBoxes, ...extraBoxes];
  const hops = hopPlan(layout.edges.map((e) => ({ points: e.points, weight: HOP_WEIGHT[e.kind] })));
  const maskId = `${idPrefix}-knockout`;

  return (
    <>
      <DiagramDefs idPrefix={idPrefix} />
      <KnockoutMask boxes={boxes} height={layout.height} id={maskId} width={layout.width} />
      <g mask={`url(#${maskId})`}>
        {layout.edges.map((e, i) => (
          <DiagramEdgeLine
            key={e.id}
            edge={e}
            hops={hops[i]}
            // EVERY BRIDGE ON THE DRAWING, not just this run's own. A mark is
            // suppressed where a hop arc is, but an edge only knows its own
            // hops — so `e18`'s data-link circle was landing 0.4 units inside
            // `e19`'s bridge, painting a composite that reads as a junction
            // dot, which is the precise opposite of what a hop asserts. The
            // own-hop half was already closed by the per-edge filter; this is
            // the foreign half. Measured: manufacturing's nearest mark-to-hop
            // distance goes 0.4 -> 11.24 units, water 8.27 -> 18.22, and no
            // edge loses its last mark — a `power-dc` or `data-link` run with
            // no mark silently becomes a different kind of run.
            allHops={hops.flat()}
            conduitTicks={conduitTicks}
            sharedSystem={e.sharedSystem}
            labelBoxes={boxes}
            markerId={`${idPrefix}-arrow`}
          />
        ))}
      </g>
      {placed.map((p, i) =>
        p ? (
          <DiagramEdgeLabel key={layout.edges[i].id} edgeId={layout.edges[i].id} placed={p} />
        ) : null
      )}
    </>
  );
}

/* ── THE SINGLE-LINE PASS ─────────────────────────────────────────────────
 *
 * ONE PASS, NOT FOUR OPTIONS. A fourth independent audit scored the energy
 * drawing 45/100 with the verdict "this is not yet a single-line diagram", and
 * every reason it gave was one reason: the power path was drawn as an
 * ARCHITECTURE CHART — apparatus in rounded cards, conductors stopping on the
 * cards' borders 44 units short of the terminals the symbols draw, and the
 * glyph port maps naming those terminals sitting entirely unread.
 *
 * WHICH NODES, DERIVED RATHER THAN DECLARED. A node is on the power path if a
 * `power-ac` or `power-dc` conductor touches it. Not a heuristic standing in
 * for a spec field: run against `specs/energy-bess-infeed.ts` it returns
 * exactly the fifteen ids the audit listed by hand, and it cannot go stale when
 * an edge is added, which a hand-listed `render:` on twenty-three nodes would.
 * `DiagramNode.render` still overrides it.
 *
 * IT CANNOT REACH THE OTHER TWO DRAWINGS: `pid` and `purdue` have their own
 * renderers, neither declares a power conductor, and the derivation is gated on
 * `type === "network"` besides. Water and manufacturing render byte-identically.
 */

/** Do two boxes overlap, allowing `pad` units of contact? */
function hits(a: Box, b: Box, pad = 2): boolean {
  return (
    a.x < b.x + b.width + pad &&
    a.x + a.width + pad > b.x &&
    a.y < b.y + b.height + pad &&
    a.y + a.height + pad > b.y
  );
}

/**
 * WHICH SIDE EACH INLINE CAPTION GOES, chosen against everything already on the
 * drawing rather than fixed.
 *
 * A right-hand caption is the drawing-office default and fits most of the time:
 * it starts 84 units into the 124-unit node box and runs about 125 further, and
 * ELK's 44-unit minimum node gap plus the neighbour's own 46-unit glyph inset
 * leaves just enough room. It fails in two places — against the right edge of
 * the canvas, where `grid` and `cb` sit, and against a neighbour whose caption
 * is centred across its whole card — so the side is chosen per node, obstacles
 * are accumulated as they are placed, and nodes are visited in spec order so
 * the answer is stable. When neither side is clear the lesser overlap wins:
 * narrowing the wrap instead would silently drop text, because `wrap` caps at
 * two lines, and a caption that reads `400` where the spec said `400 V` is a
 * worse defect than one that sits close to its neighbour.
 */
function captionSides(
  spec: DiagramSpec,
  layout: DiagramLayout,
  mode: ReadonlyMap<string, RenderMode>,
  locale: Locale
): { side: Map<string, CaptionSide>; boxes: Box[] } {
  const box = new Map(layout.nodes.map((n) => [n.id, n]));
  const side = new Map<string, CaptionSide>();
  const placed: Box[] = [];

  const obstacles: Box[] = layout.nodes.map((n) => {
    const how = mode.get(n.id);
    return how === "inline" || how === "reference"
      ? { x: n.x + GLYPH_LEFT, y: n.y + GLYPH_TOP, width: GLYPH, height: GLYPH }
      : { x: n.x, y: n.y, width: n.width, height: n.height };
  });

  for (const node of spec.nodes) {
    if (mode.get(node.id) !== "inline") continue;
    const b = box.get(node.id);
    if (!b) continue;
    const options = (["right", "left"] as const).map((s) => {
      const boxes = captionBoxes(node, b, locale, s);
      const off = boxes.some((c) => c.x < 2 || c.x + c.width > layout.width - 2);
      const clashes = boxes.filter((c) => [...obstacles, ...placed].some((o) => hits(c, o))).length;
      return { s, boxes, cost: (off ? 100 : 0) + clashes };
    });
    const best = options[0].cost <= options[1].cost ? options[0] : options[1];
    side.set(node.id, best.s);
    placed.push(...best.boxes);
  }
  return { side, boxes: placed };
}

/** `block`, `process`, `network` and `c4` — boxed nodes on an ELK layered graph. */
export function BlockDiagram({ spec, layout, locale, idPrefix }: TypeRendererProps) {
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  const mode = renderModes(spec);
  const edges = spreadBusTaps(layout, mode, snapToGlyphPorts(spec, layout, mode));
  const { side, boxes: inlineCaptions } = captionSides(spec, layout, mode, locale);

  // A busbar is drawn as a bare rail, so its caption needs the knock-out that
  // every other card-less caption gets. Inline captions need it for the same
  // reason and are collected by `captionSides` as it places them.
  const railCaptions = layout.nodes.flatMap((b) => {
    const node = byId.get(b.id);
    return node && mode.get(b.id) === "bus" ? captionBoxes(node, b, locale) : [];
  });

  return (
    <>
      <DiagramEdgeLayer
        extraBoxes={[...railCaptions, ...inlineCaptions]}
        idPrefix={idPrefix}
        layout={{ ...layout, edges }}
        locale={locale}
        spec={spec}
      />
      {layout.nodes.map((b) => {
        const node = byId.get(b.id);
        return node ? (
          <DiagramNodeMark
            key={b.id}
            box={b}
            captionSide={side.get(b.id) ?? "below"}
            locale={locale}
            mode={mode.get(b.id)}
            node={node}
          />
        ) : null;
      })}
    </>
  );
}
