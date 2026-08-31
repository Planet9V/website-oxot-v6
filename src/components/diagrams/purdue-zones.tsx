import { INK_STRONG } from "./BlockDiagram";
import type { Box, Point } from "./geometry";
import type { PlacedNode, RoutedEdge } from "./layout-shared";

/**
 * IEC 62443 ZONE PERIMETERS AND THE CONDUIT MARKS THAT PIERCE THEM.
 *
 * Split out of `PurdueDiagram.tsx` on 2026-08-28, and the seam is a real one
 * rather than a line-count dodge: everything here answers "where does a zone
 * boundary run, and what crosses it", and nothing here knows what a Purdue
 * level is. `PurdueDiagram` keeps the band furniture and `DRAWN_ZONES` — the
 * list of which zones this drawing outlines and why — because that list is an
 * editorial decision about one drawing, and because `types.ts` names it as
 * living there.
 *
 * The move was forced by the 500-line cap: `PurdueDiagram.tsx` had reached 608,
 * and the stepped perimeter below adds to it rather than subtracting.
 */

/**
 * ONE PERIMETER LANGUAGE FOR EVERY ZONE ON THE SHEET.
 *
 * ISO 128's limited-area chain — long, short, long — is the same line
 * `twin/ot-notation`'s `ZonePerimeter` uses, so a 62443 zone and a C4 grouping
 * stay distinguishable without colour.
 *
 * IT ALSO CARRIES THE DMZ BAND, which is why both constants are exported. Until
 * 2026-08-28 the DMZ's own perimeter was drawn `7 5` at 1.0 while the safety and
 * external perimeters were drawn `5 2 1 2` at 1.3 — three notations for one
 * concept, on the one drawing whose whole subject is zones. Worse, `7 5` is a
 * step from the `7 4` that `STROKE.electrical` uses for an instrument signal, so
 * a ZONE BOUNDARY and a SIGNAL LINE were sharing a dash family. There is now one
 * perimeter line, and a reader who learns it at the safety zone reads it
 * correctly at the DMZ.
 */
export const ZONE_DASH = "5 2 1 2";
export const ZONE_STROKE = 1.3;

/**
 * CLEAR SPACE ROUND A ZONE, AND THE TWO AXES ARE NOT THE SAME NUMBER because
 * they are bounded by different things.
 *
 * Sideways the only neighbour is the next grid column, 30 units away, and 16 is
 * what it takes for the perimeter to read as a box rather than as a second
 * outline of the card — and, measured, to CONTAIN ITS MEMBERS' OWN CAPTIONS.
 * Seven Dutch node labels overrun their 124-unit cards, `EXT-01`'s
 * "leveranciersondersteuning" by 17.9 units each side, so a 9-unit perimeter
 * round `EXT-01` had its own member's name crossing it left and right.
 *
 * Vertically the band border is 16 above the card and 16 below it, so 16 would
 * put the perimeter exactly ON the level's own rule — two coincident lines
 * meaning two different things. 9 is the largest pad that stays clear of it.
 */
const ZONE_PAD_X = 16;
const ZONE_PAD_Y = 9;

/**
 * A ZONE IS A STAIRCASE, NOT A RECTANGLE, AND THAT IS THE FIX FOR THE WORST
 * DEFECT THIS DRAWING HAS HAD.
 *
 * A zone used to be its members' single bounding box. That is exact for a zone
 * living in one band, and it is a FALSE STATEMENT for one that spans two,
 * because a rectangle cannot exclude anything standing in the columns between
 * its members. After the rows were left-packed to a shared datum the safety
 * zone's members landed at L1 column 0 (`SIS-01`) and L0 columns 0 and 1
 * (`ZSH-201`, `KM-207`), so the enclosing rectangle ran x 162–472 across both
 * bands — and L1 column 1 is `PLC-01`, the line controller. The perimeter
 * asserted that the basic process control system sits INSIDE the safety
 * instrumented zone.
 *
 * On this drawing that is the most expensive possible error. The whole argument
 * of the sheet is that the safety path is independent of the BPCS — `SIS-01`
 * takes its interlock straight from the guard switches and drives `KM-207`
 * without passing through `PLC-01`, which is IEC 61511 §11.2.4 — and the
 * heaviest mark on the page was contradicting it. The `layoutPurdue` zone
 * regrouping exists precisely to stop this and cannot: it makes each band's
 * members contiguous, which is not the same as making them share COLUMNS across
 * bands, and no ordering of a 1-member row and a 2-member row can.
 *
 * So the perimeter follows the members instead of boxing them. Each band the
 * zone occupies contributes its own left and right edge, and the boundary steps
 * between them. `PLC-01` is now outside a mark that no longer reaches its
 * column at its level, and the containment is a property of the construction
 * rather than a lucky column order.
 *
 * THE STEP IS MADE HALFWAY DOWN THE EMPTY STRIP between the two bands' members,
 * and that placement is measured rather than chosen for tidiness. Put it at the
 * upper band's own bottom edge and the widening happens INSIDE the L1 band, so
 * the gutter below — where `SE-208` and `TT-204` run up into `PLC-01` — falls
 * inside the safety polygon and those two conduits are drawn crossing a zone
 * they have nothing to do with. Put it at the lower band's top edge and the
 * opposite happens: `SIS-01 → KM-207`, the de-energise-to-trip conductor that
 * IS the safety function, exits the zone and re-enters it. Halfway down the
 * strip separates them, because the conduits into `PLC-01` book the top lanes of
 * that gutter and the trip conductor books the bottom one.
 *
 * HALFWAY IS THE ANCHOR, NOT THE FINAL ANSWER, and the difference is a defect
 * this rule used to have and could not see. The step is a NEW HORIZONTAL RULE
 * dropped into a gutter already full of horizontal conduit lanes, and nothing
 * kept it off them — it simply happened to land 30.5 units clear on this
 * drawing, at lane positions that were themselves an accident of the order the
 * spec listed its edges in. When `layout-purdue` stopped taking lane order from
 * that typing, the halfway point landed 6.5 units from `TT-204 → PLC-01` and ran
 * parallel to it for 78 — two lines close enough to read as one, which is the
 * hazard the lane register and the hop arcs are spent avoiding, and the worse
 * case of it because one of the two marks is a ZONE BOUNDARY.
 *
 * So the join is CENTRED IN THE CONDUIT-FREE GAP THE HALFWAY POINT ALREADY LANDS
 * IN. It moves only inside that gap, so it cannot put a conduit on the other
 * side of the boundary from the side halfway put it on — every containment
 * argument above is untouched — and the perimeter stops being a near-parallel of
 * whatever lane happens to sit beside it.
 */
export function zoneSegments(
  boxes: PlacedNode[],
  dividerX: number,
  edges: readonly RoutedEdge[] = []
): Box[] {
  if (boxes.length === 0) return [];
  // A BAND IS IDENTIFIED BY ITS MEMBERS' y, not by a level lookup. Every node in
  // one band is placed at exactly one y by `layoutPurdue`, so this needs no
  // knowledge of the level model and cannot disagree with the placement.
  const rows = new Map<number, PlacedNode[]>();
  for (const b of boxes) {
    const row = rows.get(b.y);
    if (row) row.push(b);
    else rows.set(b.y, [b]);
  }
  const segs = [...rows.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, members]) => {
      // A ZONE MUST CONTAIN ITS OWN MEMBERS. That outranks keeping clear of the
      // caption gutter, and an earlier floor had the two the wrong way round: it
      // clamped to the divider plus a hair while the leftmost member sat left of
      // that, so the safety-zone perimeter was drawn THROUGH a node it exists to
      // enclose.
      //
      // BUT THE PERIMETER MUST NOT BECOME A SECOND RULE BESIDE THE DIVIDER. The
      // repair that put containment first landed the left edge nine units from
      // the caption divider and parallel to it for the whole height of the zone,
      // which reads as the zone enclosing part of the caption column. Two lines
      // that close are one ambiguous mark.
      //
      // So: take the member-derived edge when it is VISIBLY outside the caption
      // column, and otherwise sit ON the divider, where there is one rule
      // instead of two. `layoutPurdue` leaves a `BAND_NODE_GAP` margin between
      // the divider and the first column, so on this drawing the first branch
      // fires — 162, clearing the divider by 14. The second is the guard for a
      // future layout that packs tighter, and it can no longer cut a node,
      // because no node can be placed on the divider any more.
      const wanted = Math.min(...members.map((b) => b.x)) - ZONE_PAD_X;
      const x = wanted >= dividerX + ZONE_PAD_Y ? wanted : dividerX;
      const y = Math.min(...members.map((b) => b.y)) - ZONE_PAD_Y;
      const right = Math.max(...members.map((b) => b.x + b.width)) + ZONE_PAD_X;
      const bottom = Math.max(...members.map((b) => b.y + b.height)) + ZONE_PAD_Y;
      return { x, y, width: right - x, height: bottom - y };
    });
  // Join the bands into one continuous boundary. Each pair meets in the strip
  // between them; every segment keeps the bottom it was computed with, so the
  // join redistributes the gap and never grows the zone.
  for (let i = 1; i < segs.length; i++) {
    const upper = segs[i - 1];
    const lower = segs[i];
    const join = clearestJoin(
      upper.y + upper.height,
      lower.y,
      Math.min(upper.x, lower.x),
      Math.max(upper.x + upper.width, lower.x + lower.width),
      edges
    );
    upper.height = join - upper.y;
    lower.height = lower.y + lower.height - join;
    lower.y = join;
  }
  return segs;
}

/**
 * Where the step goes inside the strip: the middle of the conduit-free gap that
 * the strip's own midpoint already falls in.
 *
 * The x range asked about is the whole width the two segments cover between
 * them, not just the width the step itself traverses. A conduit running
 * alongside the perimeter's LEFT side reads as doubled exactly as one beside the
 * step does, and the two cost the same to avoid.
 */
function clearestJoin(
  top: number,
  bottom: number,
  x0: number,
  x1: number,
  edges: readonly RoutedEdge[]
): number {
  const mid = (top + bottom) / 2;
  let above = top;
  let below = bottom;
  for (const edge of edges) {
    for (let i = 1; i < edge.points.length; i++) {
      const a = edge.points[i - 1];
      const b = edge.points[i];
      // Horizontal runs only: a vertical conduit CROSSES the step, which is a
      // conduit tick and a fact, not a doubled line.
      if (Math.abs(b.y - a.y) > 0.5 || Math.abs(b.x - a.x) <= 0.5) continue;
      if (a.y <= top || a.y >= bottom) continue;
      if (Math.max(a.x, b.x) <= x0 || Math.min(a.x, b.x) >= x1) continue;
      if (a.y <= mid) above = Math.max(above, a.y);
      else below = Math.min(below, a.y);
    }
  }
  return (above + below) / 2;
}

/** The ring of the perimeter, clockwise from the top-left corner. */
function ring(segs: Box[]): Point[] {
  const first = segs[0];
  const last = segs[segs.length - 1];
  const out: Point[] = [{ x: first.x, y: first.y }];
  // Down the right-hand side. Each segment contributes its own right edge, and
  // the move between two of them IS the step, because adjacent segments already
  // share a y after `zoneSegments` joined them.
  for (const s of segs) {
    out.push({ x: s.x + s.width, y: s.y });
    out.push({ x: s.x + s.width, y: s.y + s.height });
  }
  out.push({ x: last.x, y: last.y + last.height });
  // Back up the left-hand side, stepping the same way.
  for (let i = segs.length - 1; i >= 1; i--) out.push({ x: segs[i].x, y: segs[i].y });
  out.push({ x: first.x, y: first.y });
  return out;
}

/** One straight run of a zone boundary. */
export interface ZoneRule {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  vertical: boolean;
}

/**
 * THE PERIMETER AS A LIST OF RULES, which is what a crossing test needs.
 *
 * A rectangle could be tested against four numbers. A staircase cannot: the
 * horizontal at the step spans only the width it steps across, and testing a
 * conduit against the polygon's bounding box instead would put a conduit mark
 * where no boundary is drawn. The rules are derived from the same ring the
 * stroke is drawn from, so a tick can only ever land on ink.
 */
export function perimeterRules(segs: Box[]): ZoneRule[] {
  const out: ZoneRule[] = [];
  const points = ring(segs);
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const vertical = Math.abs(a.x - b.x) <= 0.01;
    // A zero-length move happens wherever two segments share an edge — a left
    // side that does not step, for instance. It is not a rule.
    if (vertical && Math.abs(a.y - b.y) <= 0.01) continue;
    out.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, vertical });
  }
  return out;
}

/** One controlled crossing: where it is, and whether the rule it pierces is vertical. */
export interface ZoneTick {
  p: Point;
  vertical: boolean;
}

/**
 * WHERE A ROUTE PIERCES A ZONE PERIMETER.
 *
 * A zone boundary that nothing is drawn crossing is decoration. IEC 62443's
 * unit of analysis is the CONDUIT — the controlled crossing — so the mark goes
 * where a route actually cuts the boundary, computed from the routed geometry
 * rather than from the edge list. A route that stays inside never crosses and
 * correctly gets no mark.
 *
 * The strict inequalities matter: a crossing exactly at a corner would
 * otherwise be counted once per rule and painted twice.
 */
export function zoneCrossings(edges: RoutedEdge[], rules: readonly ZoneRule[]): ZoneTick[] {
  const out: ZoneTick[] = [];
  for (const edge of edges) {
    for (let i = 1; i < edge.points.length; i++) {
      const a = edge.points[i - 1];
      const b = edge.points[i];
      const horizontal = Math.abs(b.y - a.y) <= 0.5 && Math.abs(b.x - a.x) > 0.5;
      const vertical = Math.abs(b.x - a.x) <= 0.5 && Math.abs(b.y - a.y) > 0.5;
      for (const r of rules) {
        if (horizontal && r.vertical) {
          const lo = Math.min(r.y1, r.y2);
          const hi = Math.max(r.y1, r.y2);
          if ((a.x - r.x1) * (b.x - r.x1) < 0 && a.y > lo && a.y < hi) {
            out.push({ p: { x: r.x1, y: a.y }, vertical: true });
          }
        } else if (vertical && !r.vertical) {
          const lo = Math.min(r.x1, r.x2);
          const hi = Math.max(r.x1, r.x2);
          if ((a.y - r.y1) * (b.y - r.y1) < 0 && a.x > lo && a.x < hi) {
            out.push({ p: { x: a.x, y: r.y1 }, vertical: false });
          }
        }
      }
    }
  }
  return out;
}

/**
 * A CROSSING WITH A CLOSE NEIGHBOUR GETS A NARROWER MARK, NOT A SHARED ONE.
 *
 * `FW-01` sends two separate conduits up through the DMZ boundary — one to the
 * ERP and one to the enterprise SIEM — and the fan puts them 15 units apart. At
 * the full 14-unit mark that leaves 1.0 unit of clear space between them, and
 * the audit read the result exactly as it paints: four bars in a row, one
 * smear, no telling which pair belongs to which conduit.
 *
 * The mark narrows instead of merging, because merging would say the wrong
 * thing. Two conduits piercing a zone boundary is two controlled crossings — in
 * 62443 terms two things to specify, assess and document — and one tick spanning
 * both would report a count of one. The tick is a symbol whose meaning is "a
 * conduit crosses here", not a measurement whose width means anything, so the
 * width is free to yield and the count is not.
 */
const TICK_HALF = 7;
/** Below this a two-bar mark stops reading as one. Nothing here goes under it. */
const TICK_MIN_HALF = 3;
/** Clear space kept between two adjacent marks on the same rule. */
const TICK_CLEAR = 3;

/**
 * EVERY TICK ON THE SHEET IS MEASURED THE SAME WAY, whichever rule it sits on.
 *
 * Neighbours are counted ALONG the rule the tick lies on, because two crossings
 * of the same VERTICAL rule are near each other in y and not in x.
 */
export function tickHalf(tick: ZoneTick, all: readonly ZoneTick[]): number {
  let nearest = Infinity;
  for (const q of all) {
    if (q.vertical !== tick.vertical) continue;
    const along = tick.vertical ? Math.abs(q.p.y - tick.p.y) : Math.abs(q.p.x - tick.p.x);
    const across = tick.vertical ? Math.abs(q.p.x - tick.p.x) : Math.abs(q.p.y - tick.p.y);
    if (across > 0.5) continue;
    // A gap of zero is the same crossing, not a neighbour crowding this one.
    if (along < 0.5) continue;
    nearest = Math.min(nearest, along);
  }
  if (!Number.isFinite(nearest)) return TICK_HALF;
  return Math.max(TICK_MIN_HALF, Math.min(TICK_HALF, nearest / 2 - TICK_CLEAR));
}

const ZONE_LABEL_SIZE = 11;
const ZONE_LABEL_X = 8;
/**
 * Mono advance plus the 0.08em tracking, so the gap can be cut before the
 * browser has measured anything. Not an estimate: the face is monospaced, and
 * 0.68 reproduces all four rendered names — "SAFETY ZONE" 82.3, "EXTERNAL ZONE"
 * 97.2, "EXTERNE ZONE" 89.7, "VEILIGHEIDSZONE" 112.2 — to the unit.
 */
const ZONE_LABEL_ADVANCE = 0.68;

/**
 * ONE PERIMETER, DRAWN THE SAME WAY WHICHEVER ZONE IT IS. The safety zone had
 * this markup inline until the External zone joined it; two zones drawn by two
 * copies of the same JSX is how one of them quietly acquires a different stroke.
 *
 * THE NAME SITS IN A BREAK IN THE TOP RULE, not inside the corner, and that is
 * what lets the boundary be tight. Inside the corner the name needs a
 * member-free pocket to sit in, which only exists by luck of the column order:
 * it was luck until the rows were left-packed, and then "VEILIGHEIDSZONE"
 * painted across `SIS-01`'s card and "EXTERNAL ZONE" could only be given room by
 * inflating its perimeter to 450 units round a 124-unit node. Labelling a
 * boundary by breaking it is what a drawing office does — and the break costs
 * nothing, because the rule is already broken every 5 units by `ZONE_DASH`.
 *
 * The gap is cut, not knocked out. A `--card` plate behind the lettering would
 * read as a 1:1 contrast failure under `measure.mjs`, correctly, and the global
 * knock-out mask belongs to the edge layer and cannot reach a band's furniture.
 */
export function ZonePerimeter({ segs, label }: { segs: Box[]; label: string }) {
  if (segs.length === 0) return null;
  const name = label.toUpperCase();
  const head = segs[0];
  const from = head.x + ZONE_LABEL_X - 4;
  const to = Math.min(
    head.x + head.width,
    from + name.length * ZONE_LABEL_SIZE * ZONE_LABEL_ADVANCE + 8
  );
  const n = (v: number) => v.toFixed(2);
  // Starts on the far side of the name, runs the whole ring, and comes back to
  // the near side of it, so every side is ONE stroke and no two can drift.
  const points = ring(segs);
  const d = [
    `M${n(to)} ${n(head.y)}`,
    ...points.slice(1).map((p) => `L${n(p.x)} ${n(p.y)}`),
    `L${n(from)} ${n(head.y)}`
  ].join(" ");
  const left = Math.min(...segs.map((s) => s.x));
  const right = Math.max(...segs.map((s) => s.x + s.width));
  const tail = segs[segs.length - 1];
  const bottom = tail.y + tail.height;
  return (
    <g
      role="group"
      aria-label={`IEC 62443 zone: ${label}`}
      data-zone-box={`${n(left)},${n(head.y)},${n(right - left)},${n(bottom - head.y)}`}
      data-zone-segments={segs
        .map((s) => `${n(s.x)},${n(s.y)},${n(s.width)},${n(s.height)}`)
        .join(";")}
    >
      <title>{`IEC 62443 zone: ${label}`}</title>
      <path
        d={d}
        fill="none"
        stroke={INK_STRONG}
        strokeWidth={ZONE_STROKE}
        strokeDasharray={ZONE_DASH}
      />
      {/* Baseline half a cap-height below the rule, so the lettering is centred
          ON the boundary it names rather than hanging under it. */}
      <text
        x={head.x + ZONE_LABEL_X}
        y={head.y + 3.9}
        fontSize={ZONE_LABEL_SIZE}
        letterSpacing="0.08em"
        fill={INK_STRONG}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {name}
      </text>
    </g>
  );
}

/** The two parallel bars a controlled crossing carries. Same mark as the DMZ's. */
export function ConduitTick({
  p,
  vertical,
  half = TICK_HALF
}: {
  p: Point;
  vertical: boolean;
  half?: number;
}) {
  return (
    <g
      data-conduit-tick={vertical ? "vertical" : "horizontal"}
      transform={`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})${vertical ? " rotate(90)" : ""}`}
    >
      <line x1={-half} y1={-3.5} x2={half} y2={-3.5} stroke={INK_STRONG} strokeWidth={1.6} />
      <line x1={-half} y1={3.5} x2={half} y2={3.5} stroke={INK_STRONG} strokeWidth={1.6} />
    </g>
  );
}
