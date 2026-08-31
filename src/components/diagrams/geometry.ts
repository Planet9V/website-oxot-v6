/**
 * PURE POLYLINE MATH — no ELK, no diagram types, no React.
 *
 * Split out of ./layout.ts on 2026-08-28, when that file crossed the 500-line
 * ceiling. The seam is the one the file already drew: everything here walks a
 * routed path and knows nothing about what the path connects, which is exactly
 * the half the render layer needs and the layout half never calls.
 */

export interface Point {
  x: number;
  y: number;
}

/** An axis-aligned rectangle in canvas units. Node boxes and label plates alike. */
export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Ceiling on the repeated marks a single edge carries. See `marksAlong`. */
const MAX_MARKS = 9;

/** A segment counts as axis-aligned below this. Every route here is orthogonal. */
const AXIS_TOL = 0.5;

/* ── POLYLINE GEOMETRY ────────────────────────────────────────────────────
 *
 * The ISA line treatments need more than a `stroke-dasharray`. A pneumatic run
 * is cross-hatched, a data link carries interposed marks, and a capillary is a
 * fine double line — all three are drawn ALONG the routed path, so the render
 * layer has to be able to walk it. These helpers do that and nothing else.
 */

export function toPathData(points: Point[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}

export function polylineLength(points: Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return total;
}

export interface Mark extends Point {
  /** Degrees, for `transform="rotate(...)"`. */
  angle: number;
}

/**
 * The point at half the path's ARC LENGTH, not the middle element of the point
 * array. On a long orthogonal route the two are nowhere near each other — the
 * first probe render put a "IEC 61850" label off the right edge of the canvas
 * because the array midpoint of a five-bend route landed in the final segment.
 */
export function midpointOf(points: Point[]): Point {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0];
  let want = polylineLength(points) / 2;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const len = Math.hypot(dx, dy);
    if (len === 0) continue;
    if (want <= len) {
      const t = want / len;
      return { x: points[i - 1].x + dx * t, y: points[i - 1].y + dy * t };
    }
    want -= len;
  }
  return points[points.length - 1];
}

/** Heading of the longest segment, in degrees — the run's dominant direction. */
function headingAt(points: Point[]): number {
  let best = -1;
  let angle = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const len = Math.hypot(dx, dy);
    if (len > best) {
      best = len;
      angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    }
  }
  return angle;
}

/**
 * Points at `spacing` intervals along the path, each carrying the local
 * direction. `inset` keeps the first and last mark clear of the node boxes the
 * path starts and ends at.
 */
export function marksAlong(points: Point[], spacing: number, inset = 14): Mark[] {
  if (points.length < 2) return [];
  const total = polylineLength(points);
  const usable = total - inset * 2;
  // A SHORT RUN STILL GETS ONE MARK, and that is not cosmetic. For `power-dc`
  // and `data-link` the mark is the ONLY thing separating the kind from another
  // kind drawn with the same stroke — an unmarked DC conductor IS an AC
  // conductor, and an unmarked data link is a plain dashed signal. The 72-unit
  // `bess → pcs` run fell under the old inset budget and rendered as neither,
  // which is the same failure the audit named on the energy drawing: two
  // different services drawn identically.
  if (usable <= 0) return [{ ...midpointOf(points), angle: headingAt(points) }];
  // CAPPED AT THE TOP, TOO. At a fixed 20-unit spacing a 1,200-unit back-edge
  // collects sixty cross-hatches and stops reading as a pneumatic run — the
  // first probe render produced something that looked like barbed wire. The
  // convention is "marked at intervals", not "marked at exactly this pitch", so
  // a long run spaces its marks out rather than multiplying them.
  const count = Math.max(1, Math.min(MAX_MARKS, Math.floor(usable / spacing)));
  const step = usable / count;
  const marks: Mark[] = [];

  for (let k = 0; k <= count; k++) {
    let want = inset + k * step;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      const len = Math.hypot(dx, dy);
      if (len === 0) continue;
      if (want <= len || i === points.length - 1) {
        const t = Math.max(0, Math.min(1, want / len));
        marks.push({
          x: points[i - 1].x + dx * t,
          y: points[i - 1].y + dy * t,
          angle: (Math.atan2(dy, dx) * 180) / Math.PI
        });
        break;
      }
      want -= len;
    }
  }
  return marks;
}

/**
 * The polyline shifted `d` units along its left normal.
 *
 * Segments are offset individually and rejoined at the INTERSECTION of the two
 * offset lines, not at the offset corner point — offsetting a corner naively
 * opens a notch on the outside of every bend, which at the 2-unit separation a
 * capillary pair uses reads as a broken line rather than as a double one.
 */
export function offsetPolyline(points: Point[], d: number): Point[] {
  if (points.length < 2) return points;

  const segments: { a: Point; b: Point; dx: number; dy: number }[] = [];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const len = Math.hypot(dx, dy);
    if (len === 0) continue;
    const nx = (-dy / len) * d;
    const ny = (dx / len) * d;
    segments.push({
      a: { x: points[i - 1].x + nx, y: points[i - 1].y + ny },
      b: { x: points[i].x + nx, y: points[i].y + ny },
      dx: dx / len,
      dy: dy / len
    });
  }
  if (segments.length === 0) return points;

  const out: Point[] = [segments[0].a];
  for (let i = 1; i < segments.length; i++) {
    const p = segments[i - 1];
    const q = segments[i];
    const denom = p.dx * q.dy - p.dy * q.dx;
    if (Math.abs(denom) < 1e-6) {
      out.push(q.a); // collinear: no corner to resolve
      continue;
    }
    const t = ((q.a.x - p.a.x) * q.dy - (q.a.y - p.a.y) * q.dx) / denom;
    out.push({ x: p.a.x + p.dx * t, y: p.a.y + p.dy * t });
  }
  out.push(segments[segments.length - 1].b);
  return out;
}

/* ── TERMINAL SNAPPING ────────────────────────────────────────────────────
 *
 * ELK attaches an edge wherever it likes on the side of the box it was given,
 * and it FANS same-side edges apart so they do not overlap — at ±7.3 and ±11
 * units on the water train. That fan is correct for a box whose whole side is
 * a connector. It is wrong for a symbol, where the connector is a single point:
 * the pump has one suction nozzle, not a 44-unit-tall receiving edge, so an
 * arrowhead 11 units off it terminates in blank canvas beside the equipment.
 *
 * So the terminal point is MOVED to the real port and the fan is preserved by
 * re-routing it OUTSIDE the box — a per-edge jog distance, which is what a
 * draughtsman does when four lines land on one nozzle.
 */

/** Which side of `box` the point sits on, or null if it sits on none. */
export function boxSideOf(box: Box, p: Point, tol = 1.5): "w" | "e" | "n" | "s" | null {
  if (Math.abs(p.x - box.x) <= tol) return "w";
  if (Math.abs(p.x - (box.x + box.width)) <= tol) return "e";
  if (Math.abs(p.y - box.y) <= tol) return "n";
  if (Math.abs(p.y - (box.y + box.height)) <= tol) return "s";
  return null;
}

/**
 * `points` with its first (or last) vertex moved onto `target`, keeping every
 * segment axis-aligned.
 *
 * The terminal segment's own orientation decides the shape of the correction: a
 * run arriving horizontally jogs in x first and then in y, a run arriving
 * vertically does the reverse. `jog` is how far outside the port the cross-move
 * happens, and giving each edge on a port its own jog is what keeps four
 * converging lines legible instead of collapsed onto one another.
 */
export function snapTerminal(points: Point[], target: Point, atStart: boolean, jog: number): Point[] {
  if (points.length < 2) return points;
  const pts = atStart ? [...points].reverse() : [...points];
  const end = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  if (Math.abs(end.x - target.x) < 0.05 && Math.abs(end.y - target.y) < 0.05) return points;

  const horizontal = Math.abs(end.y - prev.y) <= AXIS_TOL;
  const out = pts.slice(0, -1);
  if (horizontal && Math.abs(target.y - end.y) > AXIS_TOL) {
    const dir = Math.sign(target.x - prev.x) || 1;
    const stop = target.x - dir * jog;
    // Only jog where there is room between the previous vertex and the port;
    // a cramped run bends at the port itself rather than doubling back.
    const gate = (stop - prev.x) * dir > 2 ? stop : (prev.x + target.x) / 2;
    out.push({ x: gate, y: end.y }, { x: gate, y: target.y });
  } else if (!horizontal && Math.abs(target.x - end.x) > AXIS_TOL) {
    const dir = Math.sign(target.y - prev.y) || 1;
    const stop = target.y - dir * jog;
    const gate = (stop - prev.y) * dir > 2 ? stop : (prev.y + target.y) / 2;
    out.push({ x: end.x, y: gate }, { x: target.x, y: gate });
  } else if (horizontal) {
    out.push({ x: end.x, y: target.y });
  } else {
    out.push({ x: target.x, y: end.y });
  }
  out.push(target);
  return atStart ? out.reverse() : out;
}

/** True when `p` falls inside any box, grown by `pad` on every side. */
export function insideAny(p: Point, boxes: readonly Box[], pad = 3): boolean {
  return boxes.some(
    (b) =>
      p.x >= b.x - pad &&
      p.x <= b.x + b.width + pad &&
      p.y >= b.y - pad &&
      p.y <= b.y + b.height + pad
  );
}

/* ── LINE HOPS ────────────────────────────────────────────────────────────
 *
 * Two orthogonal runs crossing at a bare intersection are ambiguous: the mark
 * on the page is identical to the mark a junction makes, so a reader cannot
 * tell "these two signals cross" from "these two signals are the same signal".
 * The Purdue L0/L1 gutter showed the failure in its strongest form — four
 * assets joined by what looked like one unbroken bus.
 *
 * The convention is a hop, and WHICH line hops is not arbitrary: the lighter
 * service hops the heavier one. A signal wire crosses over a process pipe, not
 * the other way round, so the hop is planned from a per-edge weight rather than
 * from segment orientation. Equal weights break the tie on declaration order,
 * deterministically, so a rebuild does not move the hops around.
 */

export interface HopCandidate {
  points: Point[];
  /** Higher = heavier service. The lighter of a crossing pair carries the hop. */
  weight: number;
}

/**
 * TWO MARGINS, BECAUSE THE TWO SIDES OF A CROSSING ASK DIFFERENT QUESTIONS.
 *
 * `HOP_MARGIN_ACROSS` is asked of the OTHER run: is this a crossing at all, or
 * is it the other run's own endpoint touching this one? A T is a junction and
 * must not be bridged. But a T is a margin of ZERO, and holding this at 7 was
 * refusing to bridge crossings where the other run continued 4 and 7 units past
 * the intersection — visibly a crossing, and left drawn as a junction.
 *
 * `HOP_MARGIN_ALONG` is asked of THIS run: is there room to draw the bridge? At
 * a shared 7 the answer was no for four crossings on the Purdue chart, every one
 * of them 3.9 to 6.9 units from a corner — and "no room for the arc" was being
 * answered as "no hop", which draws the ambiguous junction the arc exists to
 * prevent. The bridge is now narrowed to the room available instead, down to a
 * floor below which an arc is a wobble rather than a hop.
 */
const HOP_MARGIN_ACROSS = 2.5;
const HOP_MARGIN_ALONG = 3;
/** Smallest bridge that still reads as one. Below this, no hop is drawn. */
const HOP_MIN_R = 2.4;
/** Ceiling per edge. A run that needs more than this is a routing problem. */
const MAX_HOPS = 14;

function segments(points: Point[]): { a: Point; b: Point; horizontal: boolean }[] {
  const out: { a: Point; b: Point; horizontal: boolean }[] = [];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const horizontal = Math.abs(b.y - a.y) <= AXIS_TOL;
    const vertical = Math.abs(b.x - a.x) <= AXIS_TOL;
    if (horizontal === vertical) continue; // diagonal or degenerate: not hoppable
    out.push({ a, b, horizontal });
  }
  return out;
}

/** For each edge, the points along it that should be drawn as a hop. */
export function hopPlan(edges: readonly HopCandidate[]): Point[][] {
  return edges.map((edge, i) => {
    const found: Point[] = [];
    const seen = new Set<string>();
    for (const s of segments(edge.points)) {
      for (let j = 0; j < edges.length; j++) {
        if (j === i) continue;
        const other = edges[j];
        // The heavier run stays straight; an equal-weight tie is broken by
        // declaration order so the plan is stable across builds.
        const yields = edge.weight < other.weight || (edge.weight === other.weight && i > j);
        if (!yields) continue;
        for (const t of segments(other.points)) {
          if (t.horizontal === s.horizontal) continue;
          const x = s.horizontal ? t.a.x : s.a.x;
          const y = s.horizontal ? s.a.y : t.a.y;
          const along = s.horizontal ? [s.a.x, s.b.x] : [s.a.y, s.b.y];
          const across = s.horizontal ? [t.a.y, t.b.y] : [t.a.x, t.b.x];
          const u = s.horizontal ? x : y;
          const v = s.horizontal ? y : x;
          if (u <= Math.min(...along) + HOP_MARGIN_ALONG || u >= Math.max(...along) - HOP_MARGIN_ALONG)
            continue;
          if (v <= Math.min(...across) + HOP_MARGIN_ACROSS || v >= Math.max(...across) - HOP_MARGIN_ACROSS)
            continue;
          const key = `${x.toFixed(1)}:${y.toFixed(1)}`;
          if (seen.has(key)) continue;
          seen.add(key);
          found.push({ x, y });
        }
      }
    }
    return found.slice(0, MAX_HOPS);
  });
}

/**
 * `toPathData` with a semicircular bridge at each planned hop.
 *
 * The bridge always arcs toward smaller coordinates — up on a horizontal run,
 * left on a vertical one — so every hop on a drawing points the same way and
 * reads as one convention rather than as fifteen local decisions.
 */
export function toPathDataHopped(points: Point[], hops: readonly Point[], r = 4.5): string {
  if (points.length < 2) return toPathData(points);
  if (hops.length === 0) return toPathData(points);

  let d = `M${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const horizontal = Math.abs(b.y - a.y) <= AXIS_TOL;
    const vertical = Math.abs(b.x - a.x) <= AXIS_TOL;
    if (horizontal !== vertical) {
      const dir = horizontal ? Math.sign(b.x - a.x) : Math.sign(b.y - a.y);
      const on = hops
        .map((h) => {
          const fixed = horizontal ? Math.abs(h.y - a.y) : Math.abs(h.x - a.x);
          const move = horizontal ? h.x : h.y;
          const from = horizontal ? a.x : a.y;
          const to = horizontal ? b.x : b.y;
          // THE BRIDGE IS NARROWED TO THE ROOM, not dropped for want of it. A
          // crossing four units from a corner still needs saying; drawn at the
          // full radius the arc would swallow the corner, so it is drawn at the
          // radius that fits and abandoned only below `HOP_MIN_R`, where an arc
          // stops reading as a bridge at all.
          const room = Math.min((move - from) * dir, (to - move) * dir);
          return { h, room, radius: Math.min(r, room - 0.4), ok: fixed <= AXIS_TOL };
        })
        .filter((c) => c.ok && c.radius >= HOP_MIN_R)
        .sort((p, q) => ((horizontal ? p.h.x - q.h.x : p.h.y - q.h.y) * dir));
      for (const { h, radius } of on) {
        // Sweep 1 on a forward run and 0 on a reverse one both put the bulge on
        // the smaller-coordinate side; SVG's sweep flag is direction-relative.
        const sweep = dir > 0 ? 1 : 0;
        if (horizontal) {
          d += ` L${(h.x - dir * radius).toFixed(2)},${a.y.toFixed(2)}`;
          d += ` A${radius},${radius} 0 0 ${sweep} ${(h.x + dir * radius).toFixed(2)},${a.y.toFixed(2)}`;
        } else {
          d += ` L${a.x.toFixed(2)},${(h.y - dir * radius).toFixed(2)}`;
          d += ` A${radius},${radius} 0 0 ${1 - sweep} ${a.x.toFixed(2)},${(h.y + dir * radius).toFixed(2)}`;
        }
      }
    }
    d += ` L${b.x.toFixed(2)},${b.y.toFixed(2)}`;
  }
  return d;
}
