import { BUBBLE_CELL } from "@/components/twin/instrument-bubble";
import {
  captionBoxes,
  DiagramEdgeLayer,
  DiagramNodeMark,
  type TypeRendererProps
} from "./BlockDiagram";
import type { Point } from "./geometry";
import { GLYPH, GLYPH_TOP } from "./layout-shared";

/**
 * P&ID — a left-to-right process chain, ELK `layered` with `direction=RIGHT`.
 *
 * TWO THINGS DIFFER FROM THE BLOCK RENDERER, and both are ISA conventions
 * rather than styling preferences.
 *
 * NO BOX AROUND A SYMBOL. On a piping and instrumentation diagram the symbol IS
 * the equipment — a pump is a circle with two vanes, not a rectangle labelled
 * "pump". Drawing a container around it asserts an enclosure that is not there,
 * and it is the fastest way to make an engineer stop reading.
 *
 * THE LINE RUNS TO THE NOZZLE, AND IT IS THE LAYOUT THAT PUTS IT THERE. Until
 * 2026-08-28 this component drew a STUB from the node box in to the glyph,
 * because ELK terminates an edge on the box side and the box is 46 units wider
 * than the symbol. The stub covered the average case and not the real one: ELK
 * also FANS same-side edges apart, so a second or third line landing on one
 * face arrived 7–11 units off the stub and terminated in blank canvas. The
 * independent audit counted fifteen such endpoints out of forty and found P-301
 * with "two floating arrows and touched by nothing".
 *
 * A stub cannot fix that, because a stub is one line and a fan is many. So the
 * correction moved into `layout.ts`, where the route itself is snapped onto the
 * real stencil port from `GLYPH_PORTS` and the fan is re-created OUTSIDE the
 * box as a staggered jog. Two things follow. Every arrowhead now lands on a
 * connection point the stencil actually declares — a pump's suction nozzle, a
 * heat exchanger's corner nozzle — rather than on a bounding box near it. And
 * the line into the symbol keeps its OWN kind, where the stub was always heavy
 * solid: a 4-20 mA signal into an instrument bubble is no longer drawn as pipe
 * for its last 46 units.
 *
 * THE CAPTION KNOCK-OUTS ARE HANDED TO THE EDGE LAYER rather than painted here,
 * because a P&ID node has no card behind its text and the router will happily
 * put a return line through the middle of a word — which is what it did to
 * "residual" on both the English and the Dutch water train.
 */

/* ── A SIGNAL LEAVES A BUBBLE AT ITS PERIMETER ────────────────────────────
 *
 * THE MEASURED DEFECT. Four of the water train's five field instruments had
 * their LOOP NUMBER struck through by their own outgoing signal line. AIT-601's
 * route was `M942,508 L929,508 L929,515.33 L820.5,515.33 …` against a bubble
 * centred (926.00, 508.00) with r = 16.23 and a "601" band at x 916.8..935.2:
 * the run left the east perimeter, doubled 13 units BACK INSIDE the circle,
 * dropped 7.3 units — into the digits — and then crossed all of them on its way
 * west. RIT-501, LT-601 and FT-701 were the same route with different numbers;
 * only FT-101, whose line leaves and keeps going, was clean. At vector zoom the
 * stroke and the numeral merge, which is why four audit rounds read "601" and
 * the fifth, on a scale-1 raster upscaled nearest-neighbour, read "6θ1".
 *
 * WHERE IT COMES FROM, AND WHY THE REPAIR IS HERE. `layout.ts` lands the
 * terminal correctly on the symbol — but its approach jog is placed `JOG_BASE`
 * units back from the terminal ALONG THE DIRECTION OF TRAVEL, and when the port
 * is on the far side of the symbol from the destination, "back along travel" is
 * INTO the glyph. The bubble is the only symbol here with lettering in that
 * space, so it is the only one where the jog is legible as damage.
 *
 * TRIMMED RATHER THAN MASKED. A knock-out under the numerals would hide the
 * strikethrough and leave the rest of the doubled-back run — the stray tick the
 * audit also counted — sitting inside the outline, which is still a signal line
 * drawn through the middle of an instrument. Trimming removes the claim instead
 * of covering it, and it is what ISA draws: the line meets the bubble at the
 * circle. The pass runs BEFORE `DiagramEdgeLayer`, exactly as `BlockDiagram`
 * runs `snapToGlyphPorts` before it, so the hop plan, the label placement and
 * the mask all read the same corrected points.
 */

/**
 * The bubble outline's radius in node-box units. `instrument-bubble` draws it at
 * `(BUBBLE_CELL - 2 * inset) / 2` in its own 44-unit cell, and `types.ts` scales
 * that cell to 42 to seat it in the 32-unit glyph cell. Only `BUBBLE_CELL` is
 * exported; the 5-unit inset and the 42 are private to files this one may not
 * edit, so they are mirrored — and the derivation is written out rather than the
 * 16.227 it evaluates to, so a drift in either shows up as an expression that no
 * longer matches its source instead of as a magic number nobody can check.
 */
const BUBBLE_INSET = 5;
const BUBBLE_IN_GLYPH_CELL = 42;
const BUBBLE_R = ((BUBBLE_CELL - BUBBLE_INSET * 2) / 2) * (BUBBLE_IN_GLYPH_CELL / BUBBLE_CELL);

/** Where a segment `a`→`b` leaves the circle. `a` is inside it, `b` is not, so
 *  the larger root is the crossing and it always lies in `[0, 1]`. */
function exitPoint(a: Point, b: Point, c: Point, r: number): Point {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const fx = a.x - c.x;
  const fy = a.y - c.y;
  const qa = dx * dx + dy * dy;
  const qb = 2 * (fx * dx + fy * dy);
  const disc = qb * qb - 4 * qa * (fx * fx + fy * fy - r * r);
  if (qa === 0 || disc < 0) return a;
  const t = Math.min(Math.max((-qb + Math.sqrt(disc)) / (2 * qa), 0), 1);
  return { x: a.x + dx * t, y: a.y + dy * t };
}

/**
 * The route with any doubled-back run inside the bubble at one end removed, or
 * `null` when there is none.
 *
 * The test is "a vertex BEYOND the terminal is inside the outline", not "the
 * terminal is inside it". The terminal itself sits on the glyph cell edge, which
 * for a bubble is the circle to within a quarter of a unit, so every endpoint on
 * the drawing reads as marginally inside and a looser test would rewrite routes
 * that are already correct — measured: FT-101 and every capillary tap renders
 * byte-identically under this test and would not under a looser one. Requiring
 * an interior vertex names the defect exactly: the line went in, and came out.
 */
function trimIntoBubble(points: Point[], centre: Point, atStart: boolean): Point[] | null {
  const pts = atStart ? points : [...points].reverse();
  const inside = (p: Point) => Math.hypot(p.x - centre.x, p.y - centre.y) <= BUBBLE_R;
  if (pts.length < 2 || !inside(pts[0])) return null;
  let last = 0;
  while (last + 1 < pts.length && inside(pts[last + 1])) last++;
  if (last < 1 || last + 1 >= pts.length) return null;
  const out = [exitPoint(pts[last], pts[last + 1], centre, BUBBLE_R), ...pts.slice(last + 1)];
  return atStart ? out : out.reverse();
}

export function PidDiagram({ spec, layout, locale, idPrefix }: TypeRendererProps) {
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  const captions = layout.nodes.flatMap((box) => {
    const node = byId.get(box.id);
    return node ? captionBoxes(node, box, locale) : [];
  });

  // `isa/` is the grammar `types.ts` publishes for the parametric bubble, and it
  // is the only symbol family on a P&ID that carries text inside its outline.
  const bubbles = new Map<string, Point>();
  for (const box of layout.nodes) {
    if (!byId.get(box.id)?.symbol.startsWith("isa/")) continue;
    bubbles.set(box.id, { x: box.x + box.width / 2, y: box.y + GLYPH_TOP + GLYPH / 2 });
  }
  const edges = layout.edges.map((edge) => {
    let points = edge.points;
    for (const atStart of [true, false]) {
      const centre = bubbles.get(atStart ? edge.from : edge.to);
      const trimmed = centre ? trimIntoBubble(points, centre, atStart) : null;
      if (trimmed) points = trimmed;
    }
    return points === edge.points ? edge : { ...edge, points };
  });

  return (
    <>
      <DiagramEdgeLayer
        extraBoxes={captions}
        idPrefix={idPrefix}
        layout={{ ...layout, edges }}
        locale={locale}
        spec={spec}
      />
      {layout.nodes.map((box) => {
        const node = byId.get(box.id);
        return node ? (
          <DiagramNodeMark key={box.id} box={box} boxed={false} locale={locale} node={node} />
        ) : null;
      })}
    </>
  );
}
