import ELK from "elkjs/lib/elk.bundled.js";
import type { DiagramSpec, PurdueLevel } from "./types";
import { midpointOf } from "./geometry";
import type { Point } from "./geometry";
import { edgeLabelWidth } from "./edge-line";
import { NODE_H, NODE_W, PAD } from "./layout-shared";
import type { DiagramLayout, PlacedNode, PurdueBand, RoutedEdge } from "./layout-shared";

/**
 * STRICT HORIZONTAL BANDS BY LEVEL. This module computes the band geometry;
 * ELK is used for ONE THING ONLY — deciding the left-to-right order of the
 * nodes inside each band, which is a real graph problem (put talking neighbours
 * near each other) that a hand-rolled sort would get wrong.
 *
 * ELK's y output is DISCARDED. It has to be: a layered pass will happily place
 * a historian above a PLC if the edges pull that way, and in a Purdue drawing
 * the vertical axis is not free — it IS the model. L5 sits at the top and L0 at
 * the bottom whatever the graph says, and every band present in the spec gets
 * its own fixed height even if only one node sits in it.
 *
 * Because the y positions are ours, ELK's edge routing is invalid, so the edges
 * are routed here too — down the gutter between bands, which is where a conduit
 * physically is. An edge spanning MORE than one level is routed out into a
 * right-hand riser lane instead of driving straight through the intervening
 * band: a level-skipping connection is an architectural exception and it should
 * look like one.
 */

/** Purdue band geometry — computed here, not by ELK. */
const BAND_LABEL_W = 124;
const BAND_PAD_Y = 16;
const BAND_H = NODE_H + BAND_PAD_Y * 2;
/**
 * The gutter between two bands. Cross-level edges route through it, as conduits
 * do — and since 2026-08-28 each of them gets its OWN LANE inside it, which is
 * what the gap had to grow for.
 *
 * At the old 38 every conduit crossing one gutter ran at that gutter's exact
 * mid-height. The independent audit found the consequence in the L0/L1 gutter,
 * and it is the worst failure mode a Purdue drawing has: `se→plc` and `dcs→xv`
 * were colinear at the same y and shared an x column, so four assets — PLC-01,
 * DCS-01, SE-208 and XV-306 — appeared to sit on one unbroken bus. The drawing
 * asserted a shared network segment that does not exist. Lanes here, and the
 * hop arcs planned in `geometry.ts`, are the two halves of not asserting it.
 *
 * SINCE 2026-08-28 THIS IS A FLOOR, NOT THE GUTTER. A gutter is as tall as the
 * conduits crossing it need; this is what a quiet one collapses to.
 */
const BAND_GAP = 58;
/**
 * WHAT ONE LANE COSTS IN GUTTER HEIGHT, and why a gutter is no longer one fixed
 * number.
 *
 * A gutter divided evenly between its conduits gives each lane `BAND_GAP / (n+1)`
 * of separation, which at the five conduits crossing the L0/L1 gutter is 9.7
 * units. An edge label is `EDGE_LABEL_SIZE + 5` = 17 units tall. Four of those
 * five conduits carry a label, so four 17-unit boxes were being packed at a 9.7
 * pitch and the collision resolver in `edge-line.tsx` had nowhere to put them:
 * it pushed "de-energise to trip" down until the box crossed the L0 band border,
 * and a band border is not an edge, so the knock-out cannot cut it — the rule
 * ran through the lettering.
 *
 * So the gutter is sized from what crosses it. A lane carrying a label books
 * enough height for the label plus clear space; a bare lane books enough to be
 * visibly its own run and no more. A gutter with one quiet conduit stays at the
 * 58 floor and a gutter carrying four labelled conduits opens to fit them, which
 * is what a draughtsman does with the space between two levels.
 */
const LANE_LABELLED = 24;
const LANE_PLAIN = 11;
const BAND_NODE_GAP = 30;
/** Width of the right-hand corridor a level-skipping edge is routed out into. */
const RISER_LANE = 22;
/** How far apart two conduits leaving the same node face are pulled. */
const FAN_STEP = 15;

/**
 * WHAT ONE CONDUIT OCCUPIES IN ONE GUTTER: the horizontal run it takes, and the
 * terminals it drops to the band above and the band below. It is everything the
 * lane ordering needs and nothing else — in particular it does not carry the
 * edge's position in `spec.edges`, because that is the input the ordering must
 * stop depending on.
 */
interface GutterRun {
  id: string;
  /** Left and right extent of the horizontal run. */
  x0: number;
  x1: number;
  /** Terminal x's standing on the band ABOVE this gutter. */
  upper: number[];
  /** Terminal x's standing on the band BELOW it. */
  lower: number[];
}

/**
 * Above this many conduits in one gutter the exact search is abandoned for the
 * canonical geometric order. 7 is 5,040 orders — microseconds — and no drawing
 * in this repository comes near it; 8 would be 40,320 and 12 would be half a
 * billion. The fallback is still deterministic, which is the property that
 * actually matters, so the cap costs tidiness rather than correctness.
 */
const LANE_SEARCH_MAX = 7;
/** Slop when asking whether a terminal falls INSIDE a run rather than at its end. */
const CROSS_EPS = 0.6;

function edgeId(index: number): string {
  return `e${index}`;
}

function register(groups: Map<string, string[]>, key: string, id: string): void {
  const group = groups.get(key);
  if (group) {
    // An edge whose two ends sit in the SAME grid column books that column once,
    // not twice. Booked twice it would take two slots and drop a gap in the fan
    // that nothing occupies — and, worse, its two ends would be handed different
    // ordinals and the straight drop between two vertically aligned assets would
    // acquire a dogleg it has no reason to have.
    if (!group.includes(id)) group.push(id);
  } else groups.set(key, [id]);
}

/** Position of `id` within its own group, and that group's size. */
function ordinal(groups: Map<string, string[]>, key: string, id: string): [number, number] {
  const group = groups.get(key) ?? [];
  return [Math.max(0, group.indexOf(id)), group.length];
}

export async function layoutPurdue(
  spec: DiagramSpec,
  elkOptions: Record<string, string>
): Promise<DiagramLayout> {
  const elk = new ELK();
  const ordering = await elk.layout({
    id: "root",
    layoutOptions: elkOptions,
    children: spec.nodes.map((n) => ({ id: n.id, width: NODE_W, height: NODE_H })),
    edges: spec.edges.map((e, i) => ({ id: edgeId(i), sources: [e.from], targets: [e.to] }))
  });
  const orderX = new Map((ordering.children ?? []).map((c) => [c.id, c.x ?? 0]));

  const levels = [...new Set(spec.nodes.map((n) => n.purdue as PurdueLevel))].sort((a, b) => b - a);
  const bandOf = new Map(spec.nodes.map((n) => [n.id, n.purdue as PurdueLevel]));

  /**
   * ADJACENCY IS COUNTED IN BANDS DRAWN, NOT IN LEVEL NUMBERS. Subtracting the
   * levels looks equivalent and is not. The industrial DMZ is level 3.5, so an
   * L3→L3.5 hop differs by 0.5 and an arithmetic test calls it neither adjacent
   * nor skipping — the most important edge in a 62443 drawing would route out
   * into the exception corridor. And a spec naming L0, L1 and L3 but no L2 has
   * three bands stacked touching: an L1→L3 edge crosses one gutter and nothing
   * else, so a riser would claim it bypasses a band not on the page.
   */
  const bandIndex = new Map(levels.map((level, i) => [level, i]));
  const indexOfNode = (id: string) => bandIndex.get(bandOf.get(id) as PurdueLevel) ?? 0;
  const stepsApart = (e: { from: string; to: string }) =>
    Math.abs(indexOfNode(e.from) - indexOfNode(e.to));

  /**
   * The gutter an endpoint's STUB enters, which is the one it can collide in.
   * For an adjacent-band edge both ends give the same gutter. For a
   * level-skipping one they do not, and that is the point: the riser leaves its
   * source downward into the gutter below it and arrives at its target from the
   * gutter above it, two different corridors, each shared with whatever ordinary
   * conduit happens to occupy the same column there.
   */
  const stubGutter = (e: { from: string; to: string }, end: "from" | "to") => {
    const down = indexOfNode(e.from) < indexOfNode(e.to);
    const here = indexOfNode(e[end]);
    return (end === "from") === down ? here : here - 1;
  };

  /**
   * `lanes` is per GUTTER: every conduit crossing the same gutter takes its own
   * horizontal lane inside it, so no two of them can be colinear. Booked here,
   * before any geometry exists, because the gutter's HEIGHT is a function of
   * what crosses it — see `LANE_LABELLED`.
   *
   * A RISER BOOKS BOTH OF ITS GUTTERS, and until 2026-08-28 it booked neither.
   * The register was gated on `stepsApart(e) === 1`, so a level-skipping edge
   * was invisible to it — and the routing below then put the riser's two
   * horizontal runs at the raw gutter mid-height instead of on a lane. The
   * independent audit measured both consequences on this drawing. `vendor→jump`
   * came back across the L4/L3.5 gutter 2.13 units from `fw→siem`, which holds
   * the booked lane there, and ran that way for 69.5 units: at render scale two
   * conduits about 2.5 CSS px apart, reading as one doubled line. `geometry.ts`
   * then correctly REFUSED the hop where a third conduit crossed them, because
   * the intersection sat 2.13 from the riser's own corner — under
   * `HOP_MARGIN_ALONG` — so one crossing of eleven was left bare while both its
   * neighbours on the same horizontal hopped, and a bare crossing between two
   * lines that close reads as a tee: an assertion that the vendor session and
   * the syslog conduit are electrically joined. The same fault put `dcs→cellsw`
   * 6.07 from `ews→plc` for 131.5 units in the L2/L1 gutter.
   *
   * Booking BOTH is what the geometry already says: `stubGutter` names the two
   * corridors a riser is physically in, and a corridor it occupies is a corridor
   * it has to be counted in. `register` de-duplicates, so an adjacent-band edge —
   * whose two ends give the same gutter — still books exactly one lane.
   */
  const lanes = new Map<string, string[]>();
  for (const [i, e] of spec.edges.entries()) {
    if (bandOf.get(e.from) === bandOf.get(e.to)) continue;
    const id = edgeId(i);
    register(lanes, `g${stubGutter(e, "from")}`, id);
    register(lanes, `g${stubGutter(e, "to")}`, id);
  }
  /**
   * A RISER'S LABEL IS NOT IN THE GUTTER, so a riser books a bare lane in both.
   * Its route's arc-length midpoint falls out in the right-hand corridor, not on
   * either of its gutter runs, so charging it `LANE_LABELLED` twice would open
   * both gutters to make room for lettering that is nowhere near them — 50 units
   * of canvas height on this drawing, for clear space no glyph occupies.
   */
  const laneSpan = new Map(
    spec.edges.map((e, i) => [
      edgeId(i),
      e.label && stepsApart(e) === 1 ? LANE_LABELLED : LANE_PLAIN
    ])
  );
  /** Height of the gutter below band `i`, sized to the conduits crossing it. */
  const gutterGap = levels.slice(0, -1).map((_, i) => {
    const ids = lanes.get(`g${i}`) ?? [];
    const needed = ids.reduce((sum, id) => sum + (laneSpan.get(id) ?? LANE_PLAIN), 0);
    return Math.max(BAND_GAP, needed);
  });

  const bands: PurdueBand[] = [];
  levels.forEach((level, i) => {
    const above = bands[i - 1];
    bands.push({
      level,
      y: above ? above.y + BAND_H + gutterGap[i - 1] : PAD,
      height: BAND_H
    });
  });

  const nodes: PlacedNode[] = [];
  /**
   * GRID column of a node — its position on the shared pitch every band uses,
   * NOT its index within its own row. The two differ by the centring offset
   * below, and the difference is what makes this map usable for the departure
   * register: two nodes in different bands are in the same column when they are
   * vertically aligned on the page, which is the only sense in which a riser
   * out of one and a dropper out of the other can end up colinear.
   */
  const column = new Map<string, number>();

  /**
   * ELK ORDERS THE ROW; ZONE MEMBERSHIP THEN KEEPS ITS OWN ASSETS TOGETHER.
   *
   * ELK's contribution is a real one — it puts talking neighbours near each
   * other — but it knows nothing about IEC 62443 zones, and on a chart that
   * DRAWS a zone perimeter that ignorance is a false statement waiting to
   * happen. The safety zone holds `ZSH-201` and `KM-207` at L0 and `SIS-01` at
   * L1; with ELK's raw order the two L0 members sat at columns 0 and 3, so the
   * perimeter enclosing them also enclosed `TT-204`, `SE-208`, `PLC-01` and
   * `DCS-01` — a rectangle asserting that the line PLC and the paint DCS are
   * inside the safety zone, which is the exact claim the rest of the drawing
   * exists to deny.
   *
   * So the row is regrouped by zone, each group taking the position of its
   * earliest member in ELK's order. Within a group ELK's order survives intact.
   * A zone is a contiguous run of columns after this, which is what makes a
   * bounding perimeter an honest mark rather than a lucky one.
   */
  const rows = bands.map((band) => {
    const inBand = spec.nodes
      .filter((n) => n.purdue === band.level)
      .sort((a, b) => (orderX.get(a.id) ?? 0) - (orderX.get(b.id) ?? 0));
    const zones = new Map<string, typeof inBand>();
    for (const n of inBand) {
      // A node with no zone is its own group, so it is never pulled across the
      // row to join a cluster it was never declared part of.
      const key = n.zone ?? ` ${n.id}`;
      const group = zones.get(key);
      if (group) group.push(n);
      else zones.set(key, [n]);
    }
    return [...zones.values()].flat();
  });
  const widest = rows.reduce((w, row) => Math.max(w, row.length), 0);
  const pitch = NODE_W + BAND_NODE_GAP;

  bands.forEach((band, bi) => {
    /**
     * EVERY ROW STARTS IN COLUMN 0, and this replaces a centring rule that was
     * itself the answer to something real. Both rules answer one question —
     * where a row shorter than the widest one puts its slack — and the
     * measurements say the slack costs less at the right-hand end.
     *
     * Centred, this drawing's rows began at FOUR different x: L0's five nodes
     * at 178, the three-node bands at 332, L4's two at 409, L5's one at 486. So
     * 154 units of sheet — a whole grid column, running the full 880-unit
     * height of L5 through L1 — carried nothing at all, while a reader scanning
     * down a column found it occupied at L0 and empty at every level above.
     * Worse, an ODD difference in row counts lands on a HALF pitch: L4 at 409
     * sat 77 units off the grid every other band shares, so `column` — the map
     * both departure registers are keyed on — held 1.5 and 2.5 for that row and
     * could not group L4's conduits with the ones directly above and below
     * them, which is the one thing that map exists to do.
     *
     * The dead columns the centring rule was written against do not disappear;
     * they move to the right-hand end of a short band, and that is the cheaper
     * end. A column is now a column — every band's column 0 is at x = 178 — so
     * vertical alignment across levels means what it looks like it means, which
     * is the premise of reading a Purdue chart down a column at all. And the
     * empty stretch ends up on the same side as the riser corridor, where the
     * level-skipping exceptions already sit, rather than between the caption
     * divider and the first asset — the one place on this sheet where a gap
     * reads as a second, empty caption column instead of as a level with room
     * to spare.
     */
    rows[bi].forEach((n, i) => {
      column.set(n.id, i);
      nodes.push({
        id: n.id,
        x: PAD + BAND_LABEL_W + BAND_NODE_GAP + i * pitch,
        y: band.y + BAND_PAD_Y,
        width: NODE_W,
        height: NODE_H
      });
    });
  });

  // The trailing `+ BAND_NODE_GAP` is the band's right margin. Without it the
  // last node in the WIDEST band sits flush against the band border, which reads
  // as a node breaking out of its own level.
  //
  // THE LEADING ONE IS THE SAME MARGIN ON THE OTHER SIDE, and it was missing
  // until 2026-08-28 — so the fix for the right border had left the left one
  // broken in the identical way. The asset area began at the caption divider
  // exactly, and the widest band's first node therefore sat with its card border
  // ON that rule: `ZSH-201` at x = 148 against a divider at x = 148. It is also
  // what forced the safety-zone perimeter into the caption column, because a
  // zone drawn `ZONE_PAD` outside its leftmost member had nowhere outside to be.
  const bandWidth =
    BAND_LABEL_W +
    BAND_NODE_GAP +
    widest * NODE_W +
    Math.max(0, widest - 1) * BAND_NODE_GAP +
    BAND_NODE_GAP;
  const box = new Map(nodes.map((n) => [n.id, n]));

  const height =
    PAD * 2 + bands.length * BAND_H + gutterGap.reduce((sum, gap) => sum + gap, 0);

  /**
   * THE SECOND REGISTER, BOOKED BEFORE ANY ROUTING HAPPENS.
   *
   * `slots` is per GUTTER AND GRID COLUMN, and the second half of that key is
   * the 2026-08-28 repair. The register it replaces was keyed `node:side`, so it
   * could fan the conduits leaving ONE face of ONE node and nothing else. That
   * is not the case the gutter produces. `DCS-01` sat in column 2 of L1 and
   * `SE-208` in column 2 of L0; `dcs:s` held one edge and `se:n` held one edge,
   * each was therefore the only member of its group, and both departed from the
   * column centre — x 518 for 34.8 units of shared vertical run, with no
   * junction dot and no hop to say otherwise. The drawing asserted one bus from
   * the paint-shop DCS through the conveyor speed element, which is two
   * controllers on one field device and a field device stolen from PLC-01.
   *
   * Keyed on the COLUMN, the two are in the same group whichever nodes they
   * leave, and the fan separates them. The old per-face case is subsumed: every
   * conduit off one face is in that node's column and that node's gutter, so it
   * is still fanned — `plc` sends three and still gets three departure points.
   */
  const slots = new Map<string, string[]>();
  const slotKey = (gutter: number, node: string) => `g${gutter}:c${column.get(node) ?? 0}`;
  for (const [i, e] of spec.edges.entries()) {
    if (bandOf.get(e.from) === bandOf.get(e.to)) continue;
    const id = edgeId(i);
    register(slots, slotKey(stubGutter(e, "from"), e.from), id);
    register(slots, slotKey(stubGutter(e, "to"), e.to), id);
  }

  const edgeOf = new Map(spec.edges.map((e, i) => [edgeId(i), e]));
  /**
   * A name for an edge made of SPEC CONTENT, used only to break geometric ties.
   *
   * `edgeId` is the edge's INDEX in `spec.edges`, so tie-breaking on it would
   * quietly reintroduce the dependence on declaration order that everything
   * below exists to remove. The pair of endpoint names is the same string
   * whichever order the spec lists its edges in.
   */
  const endsOf = (id: string) => {
    const e = edgeOf.get(id);
    return e ? `${e.from}->${e.to}` : id;
  };

  /**
   * DEPARTURE ORDER ACROSS A FACE IS GEOMETRIC, NOT DECLARATION ORDER — the
   * first of the two places where the order a spec was TYPED IN decided what the
   * drawing looked like.
   *
   * `faceX` fans a column's conduits by their ordinal in this register, and the
   * register was filled by walking `spec.edges`, so the conduit that happened to
   * be written first departed leftmost. Two things follow from that, and both
   * are wrong. A spec author had to know the renderer's internals to get a
   * predictable drawing, which is the wrong place for that knowledge. And two
   * conduits leaving one face for targets on OPPOSITE sides could be handed
   * ordinals that cross each other in the first few units of their run, for no
   * reason a reader could see or a draughtsman would accept.
   *
   * Sorted by where each conduit is GOING, both close at once: the one heading
   * furthest left departs leftmost, so the fan cannot cross itself, and the
   * answer no longer depends on the order the edges were declared in. A riser
   * leaves rightward into the corridor whatever its far end is, so it sorts
   * last — which is also what it physically does.
   */
  const farColumn = (id: string, key: string): number => {
    const e = edgeOf.get(id);
    if (!e) return 0;
    if (stepsApart(e) > 1) return Number.POSITIVE_INFINITY;
    const near = slotKey(stubGutter(e, "from"), e.from) === key ? "from" : "to";
    return column.get(near === "from" ? e.to : e.from) ?? 0;
  };
  for (const [key, ids] of slots) {
    ids.sort(
      (a, b) => farColumn(a, key) - farColumn(b, key) || endsOf(a).localeCompare(endsOf(b))
    );
  }

  /**
   * The y of one conduit's lane inside its gutter. Lanes are laid out by the
   * height each BOOKED — a labelled lane gets a label's worth, a bare one gets a
   * line's worth — so a gutter's conduits are spaced by what they carry rather
   * than by how many of them there are.
   */
  /**
   * THE GUTTER STARTS AT THE BAND EDGE, NOT AT THE NODE EDGE, and the difference
   * is `BAND_PAD_Y`. Measured from the node the first lane lands 16 units too
   * high — inside the band it was supposed to have left — and the band's own
   * bottom border then runs through whatever label sits on that lane. It did:
   * the border struck straight through "PROFINET". The knock-out mask cannot
   * save that one, because a band border is not an edge and masking it would cut
   * a hole in the level itself.
   *
   * Taken from the BAND rather than from the route's own endpoints, so a riser —
   * whose two ends are in different gutters and neither of them adjacent — gets
   * the same answer an ordinary conduit does.
   */
  const gutterTop = (g: number) => (bands[g]?.y ?? PAD) + BAND_H;

  /** Departure x in a gutter column, fanned so no two conduits share a run. */
  const faceX = (node: PlacedNode, key: string, id: string) => {
    const [i, n] = ordinal(slots, key, id);
    const spread = (i - (n - 1) / 2) * FAN_STEP;
    const limit = node.width / 2 - 18;
    return node.x + node.width / 2 + Math.max(-limit, Math.min(limit, spread));
  };

  /**
   * LANE ORDER IS DECIDED FROM GEOMETRY, AND UNTIL THIS IT WAS DECIDED BY THE
   * ORDER THE SPEC HAPPENED TO LIST ITS EDGES IN.
   *
   * `register` appended ids as `spec.edges` was walked and `laneY` read the lane
   * back with `indexOf`, so lane 0 went to whichever conduit was TYPED FIRST.
   * The consequence is on the record in `specs/water-ot-purdue.ts`: `hist → fw`
   * declared after `fw → ews` took the lower lane of the L3.5/L3 gutter, its
   * label — set at the route's arc-length midpoint — landed below the L3 band's
   * top rule, and the rule struck through the lettering. The page was fixed by
   * MOVING THE EDGE UP THE SPEC. That works and it is the wrong repair: it makes
   * a correct drawing depend on a spec author knowing the renderer's internals,
   * and it silently rots the moment anyone reorders the list for readability.
   *
   * WHAT A LANE ORDER CAN ACTUALLY CHANGE is one thing only. A conduit's
   * terminal drops vertically from the band above to its own lane, so it cuts
   * the horizontal run of every conduit lying on a lane ABOVE it whose x-range
   * it passes through; symmetrically for a terminal rising from the band below.
   * Nothing else about the gutter depends on the order — the gutter's HEIGHT is
   * a sum over what crosses it and the lane pitch is a sum of booked spans, both
   * of which are order-free already. So the order is chosen to minimise exactly
   * those crossings, which is the objective the hop arcs in `geometry.ts` exist
   * to paper over when it cannot be met.
   *
   * The search is exhaustive because a gutter is small; see `LANE_SEARCH_MAX`.
   * Ties are broken by walking the permutations in the CANONICAL order's own
   * lexicographic sequence and keeping the first optimum, so an equal-cost rival
   * never displaces it and the canonical order — leftmost run first, widest
   * first on a tie, endpoint names last — is what a quiet gutter gets.
   */
  const CORRIDOR_X = PAD + bandWidth + RISER_LANE;

  const runsIn = (g: number): GutterRun[] =>
    (lanes.get(`g${g}`) ?? []).map((id) => {
      const e = edgeOf.get(id);
      const xs: number[] = [];
      const upper: number[] = [];
      const lower: number[] = [];
      for (const end of ["from", "to"] as const) {
        if (!e || stubGutter(e, end) !== g) continue;
        const node = box.get(e[end]);
        if (!node) continue;
        const x = faceX(node, slotKey(g, e[end]), id);
        xs.push(x);
        // A node standing in band `g` is ABOVE this gutter; one in band `g + 1`
        // is below it. `stubGutter` cannot return anything else, so the two
        // cases are exhaustive rather than a default.
        (indexOfNode(e[end]) === g ? upper : lower).push(x);
      }
      // A RISER'S RUN ENDS AT THE CORRIDOR, which is outboard of every grid
      // column — so any x past the band's right edge answers every containment
      // test below identically, and the innermost corridor lane is an honest
      // one to use. The riser's ACTUAL lane cannot be used here: it is assigned
      // from these lanes and therefore cannot precede them.
      if (e && stepsApart(e) > 1) xs.push(CORRIDOR_X);
      return {
        id,
        x0: xs.length ? Math.min(...xs) : 0,
        x1: xs.length ? Math.max(...xs) : 0,
        upper,
        lower
      };
    });

  /** Crossings created by putting `above` on a higher lane than `below`. */
  const crossCost = (above: GutterRun, below: GutterRun): number => {
    let n = 0;
    for (const x of below.upper) if (x > above.x0 + CROSS_EPS && x < above.x1 - CROSS_EPS) n++;
    for (const x of above.lower) if (x > below.x0 + CROSS_EPS && x < below.x1 - CROSS_EPS) n++;
    return n;
  };

  const bestLaneOrder = (runs: GutterRun[]): GutterRun[] => {
    const canon = [...runs].sort(
      (a, b) =>
        b.x1 - b.x0 - (a.x1 - a.x0) || a.x0 - b.x0 || endsOf(a.id).localeCompare(endsOf(b.id))
    );
    if (canon.length > LANE_SEARCH_MAX) return canon;
    const total = (order: GutterRun[]) => {
      let c = 0;
      for (let i = 0; i < order.length; i++)
        for (let j = i + 1; j < order.length; j++) c += crossCost(order[i], order[j]);
      return c;
    };
    let best = canon;
    let bestCost = Infinity;
    const walk = (chosen: GutterRun[], rest: GutterRun[]) => {
      if (rest.length === 0) {
        const c = total(chosen);
        if (c < bestCost) {
          bestCost = c;
          best = [...chosen];
        }
        return;
      }
      for (let i = 0; i < rest.length; i++) {
        walk([...chosen, rest[i]], [...rest.slice(0, i), ...rest.slice(i + 1)]);
      }
    };
    walk([], canon);
    return best;
  };

  const laneOrder = new Map<string, string[]>();
  for (const key of lanes.keys()) {
    laneOrder.set(key, bestLaneOrder(runsIn(Number(key.slice(1)))).map((r) => r.id));
  }

  const laneY = (gutter: number, id: string) => {
    const ids = laneOrder.get(`g${gutter}`) ?? [];
    const spans = ids.map((each) => laneSpan.get(each) ?? LANE_PLAIN);
    const total = spans.reduce((sum, s) => sum + s, 0) || 1;
    const k = Math.max(0, ids.indexOf(id));
    const before = spans.slice(0, k).reduce((sum, s) => sum + s, 0);
    const mine = spans[k] ?? LANE_PLAIN;
    return gutterTop(gutter) + ((gutterGap[gutter] ?? BAND_GAP) * (before + mine / 2)) / total;
  };

  /**
   * A CORRIDOR LANE IS REUSED WHEN THE TWO RISERS IN IT CANNOT BE READ AS ONE
   * RUN, which is the same reasoning the gutter above uses: a corridor is as
   * wide as what crosses it needs, not as wide as the count of what crosses it.
   *
   * One lane per riser regardless of geometry is what this was, and it cost
   * canvas nothing else was using. The three level-skipping edges here occupy
   * three DIFFERENT stretches of the drawing's height — `EXT-01 → RAS-01`
   * between L5 and L3.5, `HIST-01 → UDG-01` across L3, `EWS-01 → PLC-01` across
   * L2 — and the first shares no y at all with the third, so they were given
   * separate columns to stay clear of each other in a dimension they never met
   * in. The outermost was the vendor session, and since an edge label sits at
   * its own route's arc-length midpoint, that unused lane put "TLS VPN" past
   * the right-hand edge of the figure the sheet is drawn in.
   *
   * TWO RISERS SHARE A LANE ONLY WITH A WHOLE BAND'S HEIGHT OF DAYLIGHT BETWEEN
   * THEM. Two collinear runs that merely fail to overlap are one broken line to
   * a reader, and hop arcs and lane registers are spent throughout this file
   * precisely so that two conduits are never one ambiguous mark. `BAND_H` is
   * the clearance: a whole level stands between one run's end and the next
   * one's start, or the second takes the next lane out.
   */
  const riserLane = new Map<string, number>();
  const taken: { lane: number; top: number; bottom: number }[] = [];
  // CORRIDOR LANES ARE CLAIMED DOWN THE SHEET, not down the spec. The claim is
  // first-come, so whoever asks first gets the innermost lane — and asking in
  // `spec.edges` order made that a property of the typing again. Sorted by where
  // each riser actually runs, the innermost lane goes to the highest one and a
  // reader reads the corridor the way it is drawn.
  const risers = spec.edges
    .map((e, i) => ({ e, id: edgeId(i) }))
    .filter(({ e }) => stepsApart(e) > 1)
    .map(({ e, id }) => {
      const ends = [laneY(stubGutter(e, "from"), id), laneY(stubGutter(e, "to"), id)];
      return { id, top: Math.min(...ends), bottom: Math.max(...ends) };
    })
    .sort((a, b) => a.top - b.top || a.bottom - b.bottom || endsOf(a.id).localeCompare(endsOf(b.id)));
  for (const r of risers) {
    let lane = 1;
    while (
      taken.some((t) => t.lane === lane && t.bottom + BAND_H > r.top && t.top - BAND_H < r.bottom)
    ) {
      lane += 1;
    }
    taken.push({ lane, top: r.top, bottom: r.bottom });
    riserLane.set(r.id, lane);
  }

  /**
   * HOW WIDE A RISER'S NAME PAINTS, IN THE LONGER OF THE TWO LANGUAGES.
   *
   * `layoutDiagram` takes a spec and no locale — one geometry serves both
   * renders — so a corridor sized for English would be a corridor the Dutch
   * sheet does not have. Taking the wider of the two is not a compromise: it
   * puts both languages on IDENTICAL geometry, which is the only arrangement in
   * which a defect cannot hide in the locale nobody screenshotted. It is the
   * exact failure this sizing exists to close, and it was found that way.
   *
   * Measured with `edgeLabelWidth`, which is the function the renderer cuts the
   * knock-out from. A second estimator here would be a corridor that disagrees
   * with the box actually drawn.
   */
  const riserLabelHalf = (id: string): number => {
    const label = edgeOf.get(id)?.label;
    if (!label) return 0;
    return Math.max(edgeLabelWidth(label.en), edgeLabelWidth(label.nl)) / 2;
  };

  /**
   * THE CORRIDOR IS AS WIDE AS THE NAMES IT CARRIES, NOT AS WIDE AS A FIXED LANE
   * ALLOWANCE.
   *
   * It used to be `RISER_LANE * (lanes + 1)` — one bare lane of margin outboard
   * of the outermost conduit — and the trailing lane was reasoned about as the
   * place a riser's lettering goes, because an edge label sits at its own
   * route's arc-length midpoint and a riser's midpoint falls out here. 22 units
   * is a place for about four characters. Everything longer was pushed back
   * inboard by the clamp in `edgeLabelBox`, off the run it names and onto the
   * drawing, or — where the clamp could not save it — cut by the sheet's own
   * viewBox: `eenrichtingsreplicatie` rendered as `eenrichtingsreplicati` on the
   * Dutch water sheet while `one-way replication` happened to fit. That page was
   * fixed by MOVING A NODE to a different Purdue level so the edge became
   * adjacent and left the corridor entirely. It is a defensible content change
   * and it is not the fix: the next long name breaks it again, and Dutch is
   * systematically longer than English, so the next one is likely.
   *
   * THE ASK IS MADE AT THE LABEL'S OWN ANCHOR, NOT AT THE CORRIDOR LANE, and
   * that distinction is worth 79 units of canvas on the water sheets. A riser's
   * label sits at its route's arc-length midpoint, and for a SHORT riser that
   * midpoint lands on one of the two horizontal runs, well inboard — the water
   * spec says so in prose about `ext → ras`, whose "VPN / engineeringtoegang op
   * afstand" renders whole in the middle of the sheet. Charging that name to the
   * corridor reserves 122 units of margin for lettering that is nowhere near it,
   * which is the same dead-canvas defect the centring rule was removed for.
   *
   * So the route is built first and asked where its name will go. Each riser
   * asks for whatever its own midpoint plus half its widest name overruns the
   * band by, and a riser whose name lands inboard asks for nothing. The old
   * expression stays as the FLOOR — one bare lane outboard of the outermost
   * conduit — so a drawing of bare or short-named risers is unchanged and only
   * one that was clipping grows.
   */
  const riserPoints = (e: { from: string; to: string }, id: string): Point[] => {
    const a = box.get(e.from);
    const b = box.get(e.to);
    if (!a || !b) return [];
    const downward = indexOfNode(e.from) < indexOfNode(e.to);
    const start = {
      x: faceX(a, slotKey(stubGutter(e, "from"), e.from), id),
      y: downward ? a.y + a.height : a.y
    };
    const end = {
      x: faceX(b, slotKey(stubGutter(e, "to"), e.to), id),
      y: downward ? b.y : b.y + b.height
    };
    const riser = PAD + bandWidth + RISER_LANE * (riserLane.get(id) ?? 1);
    const outY = laneY(stubGutter(e, "from"), id);
    const inY = laneY(stubGutter(e, "to"), id);
    return [
      start,
      { x: start.x, y: outY },
      { x: riser, y: outY },
      { x: riser, y: inY },
      { x: end.x, y: inY },
      end
    ];
  };

  const riserCorridor =
    riserLane.size > 0
      ? Math.max(
          RISER_LANE * (Math.max(...riserLane.values()) + 1),
          ...[...riserLane.keys()].map((id) => {
            const half = riserLabelHalf(id);
            const e = edgeOf.get(id);
            if (half === 0 || !e) return 0;
            return midpointOf(riserPoints(e, id)).x + half - (PAD + bandWidth);
          })
        )
      : 0;
  const width = PAD * 2 + bandWidth + riserCorridor;

  const bandY = new Map(bands.map((b) => [b.level, b.y]));

  const edges: RoutedEdge[] = spec.edges.map((e, i) => {
    const a = box.get(e.from);
    const b = box.get(e.to);
    const id = edgeId(i);
    const base = {
      id,
      from: e.from,
      to: e.to,
      kind: e.kind,
      label: e.label,
      bidirectional: e.bidirectional,
      // A HAND-LISTED COPY IS A PLACE FOR A FIELD TO GO MISSING, and one did.
      // `sharedSystem` was declared in the spec, implemented in `dataLinkFill`
      // and plumbed through `layout.ts` and `BlockDiagram` — but this record
      // rebuilds a RoutedEdge from an explicit field list, so the Purdue path
      // silently dropped it and `plc -> hmi` rendered filled. That draws a
      // trust boundary between a PLC and its own HMI: the one link the spec
      // singles out as NOT crossing one. Nothing failed; the drawing simply
      // made a claim the data denied.
      sharedSystem: e.sharedSystem
    };
    if (!a || !b) return { ...base, points: [] as Point[] };

    const la = bandOf.get(e.from) as PurdueLevel;
    const lb = bandOf.get(e.to) as PurdueLevel;

    if (la === lb) {
      const leftFirst = a.x <= b.x;
      const start = { x: leftFirst ? a.x + a.width : a.x, y: a.y + a.height / 2 };
      const end = { x: leftFirst ? b.x : b.x + b.width, y: b.y + b.height / 2 };
      const adjacent = Math.abs((column.get(e.from) ?? 0) - (column.get(e.to) ?? 0)) === 1;
      if (adjacent) return { ...base, points: [start, end] };
      // Dip into the band's own bottom padding rather than strike through the
      // node standing between them.
      const dip = a.y + a.height + BAND_PAD_Y * 0.55;
      return { ...base, points: [start, { x: start.x, y: dip }, { x: end.x, y: dip }, end] };
    }

    const downward = (bandY.get(la) ?? 0) < (bandY.get(lb) ?? 0);
    const start = {
      x: faceX(a, slotKey(stubGutter(e, "from"), e.from), id),
      y: downward ? a.y + a.height : a.y
    };
    const end = {
      x: faceX(b, slotKey(stubGutter(e, "to"), e.to), id),
      y: downward ? b.y : b.y + b.height
    };

    if (stepsApart(e) === 1) {
      const lane = laneY(Math.min(indexOfNode(e.from), indexOfNode(e.to)), id);
      return { ...base, points: [start, { x: start.x, y: lane }, { x: end.x, y: lane }, end] };
    }

    // A RISER'S TWO HORIZONTAL RUNS SIT ON BOOKED LANES, exactly as every other
    // conduit's single run does. They used to sit at the raw mid-height of the
    // gutter they entered — a position nothing else was aware of, because the
    // riser had booked no lane — so a riser and whichever conduit's lane happened
    // to land near the middle ran within a couple of units of each other for
    // hundreds of units. See the lane register above for what that measured.
    //
    // Built by `riserPoints`, which the corridor sizing above also calls: the
    // corridor is reserved from where this route puts its own name, so the two
    // cannot disagree about where that is.
    return { ...base, points: riserPoints(e, id) };
  });

  return { nodes, edges, width, height, bands, bandWidth };
}
