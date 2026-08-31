import type { ComponentType } from "react";
import * as DrawioGlyphs from "@/components/twin/drawio-glyphs";
import { GLYPH_PORTS } from "@/components/twin/drawio-glyphs";
import * as Electrical from "@/components/twin/electrical-hand-drawn";
import { ELECTRICAL_HAND_DRAWN_PORTS } from "@/components/twin/electrical-hand-drawn";
import * as ElectricalInstruments from "@/components/twin/electrical-instruments-hand-drawn";
import { ELECTRICAL_INSTRUMENT_PORTS } from "@/components/twin/electrical-instruments-hand-drawn";
import * as PidHandDrawn from "@/components/twin/pid-hand-drawn";
import { HAND_DRAWN_PORTS } from "@/components/twin/pid-hand-drawn";
import * as PidActuatedValves from "@/components/twin/pid-actuated-valves-hand-drawn";
import { PID_ACTUATED_VALVE_PORTS } from "@/components/twin/pid-actuated-valves-hand-drawn";
import * as ElectricalMachines from "@/components/twin/electrical-machines-hand-drawn";
import { ELECTRICAL_MACHINE_PORTS } from "@/components/twin/electrical-machines-hand-drawn";
import * as Thermal from "@/components/twin/thermal-hand-drawn";
import { THERMAL_HAND_DRAWN_PORTS } from "@/components/twin/thermal-hand-drawn";
import { manifestPorts } from "@/components/twin/drawio-glyph";
import { GLYPH, GLYPH_TOP } from "./layout-shared";
import type { DiagramLayout, RoutedEdge } from "./layout-shared";
import { boxSideOf, snapTerminal } from "./geometry";
import type { Point } from "./geometry";
import { resolveSymbol } from "./types";
import type { DiagramSpec, EdgeKind, RenderMode } from "./types";

/**
 * WHERE A LINE IS ALLOWED TO TOUCH A SYMBOL.
 *
 * `drawio-glyphs.tsx` ships 197 connection points harvested from the mxGraph
 * stencil XML — the constraints the original stencils declared and the SVG
 * conversion threw away. They are the difference between a pipe that meets a
 * pump's suction nozzle and a pipe that meets the middle of a pump's bounding
 * box, and the independent audit measured the second: fifteen of forty water
 * endpoints landing 7–11 units off the symbol, arrowheads terminating in blank
 * canvas beside the equipment they were supposed to connect to.
 *
 * PORTS ARE KEYED BY COMPONENT NAME, WHICH IS WHY THIS FILE DOES NOT IMPORT THE
 * SLUG TABLE. `types.ts` owns slug → component; a port lookup that also owned
 * slug → component would be a second copy of that table, and the two would
 * drift. So the caller resolves the slug it already has and hands over the
 * component, and this file answers the only question it is competent to answer.
 */

/** A glyph's live cell is 0..32; the fallback edges are the cell's own sides. */
const MID = GLYPH / 2;

export type PortSide = "w" | "e" | "n" | "s";

/** A connection point a glyph declares, in its own 32-unit cell. */
export interface GlyphPort extends Point {
  name: string;
}

type PortTable = Record<string, ReadonlyArray<GlyphPort>>;

/**
 * COMPONENT → ITS DECLARED PORTS, KEYED BY IDENTITY RATHER THAN BY NAME.
 *
 * A module's exports join its port table on the export NAME — a React function
 * declared as `export function GateValve()` carries `.name`, which is the key
 * both tables use — but the JOIN IS DONE PER MODULE and the result is keyed by
 * the component itself. That is not a style choice: `drawio-glyphs.tsx` and
 * `electrical-hand-drawn.tsx` both export a `Fuse`, and `drawio-glyphs.tsx` and
 * `electrical-instruments-hand-drawn.tsx` both export an `Ammeter` and a
 * `Voltmeter`, with DIFFERENT geometry and different terminals. One name-keyed
 * table would hand the generated fuse's ports to the hand-drawn one, silently.
 *
 * WHY THE HAND-DRAWN MODULES ARE HERE AT ALL — this is the fix for the defect
 * the independent audit put at the top of the energy list. `ELECTRICAL_HAND_DRAWN_PORTS`
 * declared `HV`/`LV`, `+`/`−`, `DC`/`AC`, `P1`/`P2`/`S1`/`S2` and NOTHING READ
 * THEM: this file indexed the generated module only, so every electrical symbol
 * fell through to `fallback()` and every conductor terminated on the node card's
 * border instead of on the terminal the symbol draws.
 */
function joinPorts(module: object, table: PortTable): [unknown, ReadonlyArray<GlyphPort>][] {
  return Object.entries(module).flatMap(([name, value]) =>
    // A port table is itself an export of its module, so the entries are not
    // uniformly components and the filter is a real one rather than a cast.
    typeof value === "function" && table[name]
      ? [[value, table[name]] as [unknown, ReadonlyArray<GlyphPort>]]
      : []
  );
}

/**
 * EVERY MODULE THAT DECLARES PORTS HAS TO BE JOINED HERE, AND FORGETTING ONE IS
 * SILENT.
 *
 * The hand-drawn P&ID module was missing from this list until 2026-08-28, so
 * nine glyphs — the clarifier, clearwell, mixer, UV reactor, bar screen,
 * metering pump, day tank, globe valve and check valve — resolved through
 * `declaredPorts()` to an empty array and fell back to the cell edge, while
 * their nozzles sat correctly authored in `HAND_DRAWN_PORTS` the whole time.
 * The independent audit caught it by its converse: `LiquidFilter`, `GearPump`
 * and `GateValve` live in `drawio-glyphs` and behaved, which is precisely why
 * F-401 split its inlet and outlet N/S while CL-301 discharged sludge and
 * clarified effluent from ONE nozzle at 3 o'clock — with an `S` port at 6
 * o'clock, declared and unreachable.
 *
 * A missing join cannot fail loudly: an empty port list is the same value as
 * "this glyph genuinely has no constraints". So the cost of the omission is
 * paid in geometry that looks deliberate.
 */
const PORTS_OF: ReadonlyMap<unknown, ReadonlyArray<GlyphPort>> = new Map([
  ...joinPorts(DrawioGlyphs, GLYPH_PORTS),
  ...joinPorts(Electrical, ELECTRICAL_HAND_DRAWN_PORTS),
  ...joinPorts(ElectricalInstruments, ELECTRICAL_INSTRUMENT_PORTS),
  ...joinPorts(PidHandDrawn, HAND_DRAWN_PORTS),
  ...joinPorts(PidActuatedValves, PID_ACTUATED_VALVE_PORTS),
  ...joinPorts(ElectricalMachines, ELECTRICAL_MACHINE_PORTS),
  ...joinPorts(Thermal, THERMAL_HAND_DRAWN_PORTS)
]);

/**
 * The ports `Glyph` declares, or an empty list. Exported because "how many
 * terminals does this symbol have?" is a question the renderer asks: a mark with
 * ONE terminal cannot sit in a conductor run — it ends one — which is what
 * separates an earth reference from a device on a single-line diagram.
 */
export function declaredPorts(Glyph: ComponentType | undefined): ReadonlyArray<GlyphPort> {
  /* The manifest is consulted SECOND and cannot shadow a hand-authored table:
     `PORTS_OF` is keyed by component identity, and a manifest-backed glyph is a
     component no module above exports, so the two key spaces cannot collide.
     Without this line the 2,698 ports the compiler harvests would stop at the
     manifest and every Phase 3.2 symbol would terminate its pipes on the cell
     edge — the defect class that had the water train's lines missing nozzles. */
  return (Glyph && (PORTS_OF.get(Glyph) ?? manifestPorts(Glyph))) || [];
}

/** Cell-edge midpoint — the answer for a glyph that declared no constraints. */
function fallback(side: PortSide): Point {
  if (side === "w") return { x: 0, y: MID };
  if (side === "e") return { x: GLYPH, y: MID };
  if (side === "n") return { x: MID, y: 0 };
  return { x: MID, y: GLYPH };
}

/** Distance from the cell edge the side names, so "most westerly" wins for "w". */
function depth(side: PortSide, p: Point): number {
  if (side === "w") return p.x;
  if (side === "e") return GLYPH - p.x;
  if (side === "n") return p.y;
  return GLYPH - p.y;
}

/**
 * The point on `Glyph`'s 32-unit cell where a line arriving from `side` should
 * terminate.
 *
 * A stencil's own compass-named constraint is taken verbatim when it has one.
 * Otherwise the outermost port on that side is used — a heat exchanger declares
 * only its four corner nozzles, and landing a line on the NW nozzle is right
 * where landing it on the cell's mid-height is a nozzle that does not exist.
 * A glyph with no ports at all falls back to the cell edge, which is what the
 * whole drawing did before this file existed.
 */
export function portFor(Glyph: ComponentType | undefined, side: PortSide): Point {
  const ports = declaredPorts(Glyph);
  if (ports.length === 0) return fallback(side);

  const named = ports.find((p) => p.name.toLowerCase() === side);
  if (named) return { x: named.x, y: named.y };

  let best: Point | undefined;
  for (const p of ports) {
    if (!best || depth(side, p) < depth(side, best)) best = { x: p.x, y: p.y };
  }
  return best ?? fallback(side);
}

/* ── THE SINGLE-LINE PASS ─────────────────────────────────────────────────
 *
 * Moved out of `./BlockDiagram.tsx` on 2026-08-28 when that file crossed the
 * 500-line ceiling. The seam is this module's own subject: both passes below
 * decide WHERE A LINE IS ALLOWED TO TOUCH — one against a symbol's declared
 * terminals, one against a busbar rail — which is the question this file exists
 * to answer. `resolveSymbol` is imported rather than re-implemented; the header
 * note above forbids a SECOND COPY of the slug table, not use of the one there is.
 */

/**
 * WHAT SERVICE A LINE CARRIES — the thing two lines may not disagree about on
 * one terminal.
 *
 * The share guard below tested a BINARY `power` until 2026-08-28, and a binary
 * cannot say that a Modbus link and a 4-20 mA loop are the same service while a
 * pipe and the instrument tap hanging off it are two. Both halves of that were
 * measured defects: `pv-inv`'s Modbus TCP run left INV-01's 800 V DC terminal
 * because "not power vs power" was the only question asked, and `cv-701` put
 * its product line and FT-701's tap on ONE nozzle because "process vs process"
 * was the only answer available.
 *
 * FOUR CLASSES, NOT THREE, AND `capillary` IS ITS OWN. An instrument connection
 * carries no product, so it is not a pipe; it is the physical tapping rather
 * than the measurement it enables, so it is not a signal. Folded into either
 * neighbour it re-creates a collapse the water train already had — `ait-601`
 * taking its process tap in and its 4-20 mA out at one point if it is a signal,
 * `cv-701` discharging pipe and tap together if it is a process line.
 *
 * EXPORTED FOR ./layout.ts, WHICH HAS THE SAME DEFECT AND NOT THIS FIX. That
 * file's own `snapToGlyphPorts` — the one gated to `pid`, which is why the
 * water train never reaches the pass below — keeps a per-side COUNTER and no
 * claim ledger at all, so F-401 takes its inlet and its outlet on one port and
 * the filter hangs under an unbroken through-pipe. The repair there is the
 * ledger below plus an inbound/outbound term, and it needs this table. The
 * header note forbids a SECOND COPY of a table, not use of the one there is.
 */
export type EdgeClass = "process" | "instrument" | "signal" | "power";

export const CLASS_OF: Readonly<Record<EdgeKind, EdgeClass>> = {
  process: "process",
  capillary: "instrument",
  pneumatic: "signal",
  electrical: "signal",
  "data-link": "signal",
  "power-ac": "power",
  "power-dc": "power"
};

/** Each further line landing on one port jogs further out — `layout.ts`'s values. */
const JOG_BASE = 13;
const JOG_STEP = 8;
/** Closest two taps may sit on a busbar before they read as one connection. */
const TAP_PITCH = 26;
/** Clear space kept at each end of a rail, so a tap never lands on the end cap. */
const RAIL_INSET = 14;

export function renderModes(spec: DiagramSpec): Map<string, RenderMode> {
  const onPower = new Set<string>();
  if (spec.type === "network") {
    for (const e of spec.edges) {
      if (CLASS_OF[e.kind] !== "power") continue;
      onPower.add(e.from);
      onPower.add(e.to);
    }
  }
  return new Map(
    spec.nodes.map((n): [string, RenderMode] => {
      if (n.render) return [n.id, n.render];
      if (!onPower.has(n.id)) return [n.id, "card"];
      // ONE DECLARED TERMINAL MEANS A REFERENCE, NOT A DEVICE. A mark with a
      // single port cannot sit IN a conductor run; it ends one. Earth is the
      // only such glyph in the set today, and it is exactly the node the audit
      // said should carry no card, no tag plate and no arrowhead.
      return [n.id, declaredPorts(resolveSymbol(n.symbol)).length === 1 ? "reference" : "inline"];
    })
  );
}

/**
 * Terminals moved from the node box's side onto the port the SYMBOL declares.
 *
 * This is `layout.ts`'s `snapToGlyphPorts` applied to the bare nodes of a
 * layered `network` drawing; that function is gated to `pid`. Doing it here is
 * sound because the whole edge set is corrected BEFORE `DiagramEdgeLayer` sees
 * it, so the hop planner, the label placement and the knock-out mask read the
 * same corrected points — the property `layout.ts`'s own note says a
 * renderer-local fudge would break. Hoist it there when convenient; the
 * constants are copied from it deliberately.
 */
export function snapToGlyphPorts(
  spec: DiagramSpec,
  layout: DiagramLayout,
  mode: ReadonlyMap<string, RenderMode>
): RoutedEdge[] {
  const box = new Map(layout.nodes.map((n) => [n.id, n]));
  const glyph = new Map(spec.nodes.map((n) => [n.id, resolveSymbol(n.symbol)]));
  /** Terminals already taken at each node: the port, the box side it was claimed
   *  from, and which SERVICE the claimant carried. */
  const claims = new Map<string, { port: Point; side: string; cls: EdgeClass }[]>();
  const at = (a: Point, b: Point) => Math.abs(a.x - b.x) < 0.05 && Math.abs(a.y - b.y) < 0.05;

  return layout.edges.map((edge) => {
    let points = edge.points;
    if (points.length < 2) return edge;
    const cls = CLASS_OF[edge.kind];
    for (const atStart of [true, false]) {
      const id = atStart ? edge.from : edge.to;
      const how = mode.get(id);
      if (how !== "inline" && how !== "reference") continue;
      const b = box.get(id);
      if (!b) continue;
      const p = atStart ? points[0] : points[points.length - 1];
      const side = boxSideOf(b, p);
      if (!side) continue;
      const cellX = b.x + (b.width - GLYPH) / 2;
      const taken = claims.get(id) ?? [];
      const hint = atStart ? edge.fromPort : edge.toPort;
      const named = hint ? declaredPorts(glyph.get(id)).find((q) => q.name === hint) : undefined;
      let port: Point = named ? { x: named.x, y: named.y } : portFor(glyph.get(id), side);

      /**
       * WHEN TWO EDGES MAY SHARE A TERMINAL, AND WHEN THEY MAY NOT. Sharing is
       * often required — `tx → lv-cb` and the `earth → tx` N–PE bond both leave
       * the transformer's LV winding on the same side, which is what a star
       * point IS. It is an ERROR in two cases, and both were on the drawing.
       * DIFFERENT SERVICES: `ct → bus` (400 V) and `ct → am` (0–5 A) both
       * resolved to the CT's `P2` primary, drawing the panel ammeter connected
       * across the main conductor — the exact claim CT-01 exists to prevent.
       * DIFFERENT SIDES: a conductor arriving north and one leaving south are
       * the two ENDS of an in-line device; FU-01 had both DC strings on one
       * fuse terminal, which is a link across the fuse.
       *
       * WHAT IS DELIBERATELY *NOT* TESTED HERE IS INBOUND-VERSUS-OUTBOUND, and
       * that is a measured decision rather than an omission. `T-01` carries
       * `e2` out and `e3` in on ONE LV terminal, and the only other port the
       * transformer declares is `HV`: a rule that spread every in-and-out pair
       * would move the 400 V N–PE bond onto the 11 kV winding. The star point,
       * the header and the tee are all one terminal with flow both ways. Two
       * SERVICES on one terminal is always false; two directions on one
       * terminal usually is not.
       *
       * The newcomer then takes the best UNCLAIMED terminal, scored by bearing
       * to the far end — the terminal ELK chose sits on the box side tens of
       * units outside the cell, so scoring by distance from it returns the port
       * already taken.
       *
       * AND IF NOTHING IS FREE, THE LINE LEAVES THE CELL'S FLANK RATHER THAN
       * THE CONTESTED TERMINAL. The old code let the share stand, and on a
       * two-terminal glyph with both ends spoken for that is how INV-01 and
       * PCS-01 came to have their Modbus TCP runs drawn out of an 800 V DC
       * terminal, and CB-01 its CT/VT trip wiring out of the 11 kV pole. A
       * signal leaving the side of a device is imprecise; a signal leaving its
       * power terminal is a false electrical claim. The flank toward the far
       * end is preferred, the other taken if that one is already claimed, and
       * only DIFFERENT-SERVICE contention triggers it — a same-service share
       * that ran out of ports still stands.
       */
      /** Someone is already on `q` who disagrees about service OR about side. */
      const contested = (q: Point) =>
        taken.some((c) => at(c.port, q) && (c.cls !== cls || c.side !== side));
      /** Someone is already on `q` carrying a DIFFERENT SERVICE — the hard error. */
      const crossService = (q: Point) => taken.some((c) => at(c.port, q) && c.cls !== cls);

      if (!named && contested(port)) {
        const free = declaredPorts(glyph.get(id)).filter((q) => !taken.some((c) => at(c.port, q)));
        const cx = cellX + GLYPH / 2;
        const cy = b.y + GLYPH_TOP + GLYPH / 2;
        const far = atStart ? points[points.length - 1] : points[0];
        const score = (q: Point) => (q.x - GLYPH / 2) * (far.x - cx) + (q.y - GLYPH / 2) * (far.y - cy);
        for (const q of free) if (q === free[0] || score(q) > score(port)) port = q;

        if (free.length === 0 && crossService(port)) {
          const toward: PortSide = far.x >= cx ? "e" : "w";
          const flank = [fallback(toward), fallback(toward === "e" ? "w" : "e")].find(
            (q) => !taken.some((c) => at(c.port, q))
          );
          if (flank) port = flank;
        }
      }

      const rank = taken.filter((c) => at(c.port, port)).length;
      claims.set(id, [...taken, { port, side, cls }]);
      const target: Point = { x: cellX + port.x, y: b.y + GLYPH_TOP + port.y };
      points = snapTerminal(points, target, atStart, JOG_BASE + rank * JOG_STEP);
    }
    return points === edge.points ? edge : { ...edge, points };
  });
}

/**
 * TWO FEEDERS MAY NOT TAP A BUSBAR AT THE SAME POINT.
 *
 * `layout.ts`'s `snapToBusRail` puts every incident endpoint on the rail and
 * keeps the x ELK chose, which is right — the taps stay spread where the layout
 * put them — until two of them are the same x. On the energy drawing they were:
 * `ct → bus` and `cb-inv → bus` both landed at x = 435.00, 0.00 units apart, so
 * the incomer and the PV feeder drew ONE tap and the drawing lost a connection
 * it claims to make. Spreading is done here rather than in `snapToBusRail` for
 * the ownership reason above, and it is a no-op once that function distributes
 * them itself.
 */
export function spreadBusTaps(
  layout: DiagramLayout,
  mode: ReadonlyMap<string, RenderMode>,
  edges: readonly RoutedEdge[]
): RoutedEdge[] {
  const rails = new Map<string, { y: number; x0: number; x1: number }>();
  for (const n of layout.nodes) {
    if (mode.get(n.id) !== "bus") continue;
    rails.set(n.id, { y: n.y + GLYPH_TOP + GLYPH / 2, x0: n.x + RAIL_INSET, x1: n.x + n.width - RAIL_INSET });
  }
  if (rails.size === 0) return [...edges];

  const out = [...edges];
  for (const [id, rail] of rails) {
    const taps: { i: number; atStart: boolean; x: number }[] = [];
    out.forEach((e, i) => {
      if (e.points.length < 2) return;
      if (e.from === id) taps.push({ i, atStart: true, x: e.points[0].x });
      if (e.to === id) taps.push({ i, atStart: false, x: e.points[e.points.length - 1].x });
    });
    // Sorted by x, then a single forward pass. Ties break on edge order, so the
    // plan is the same on every build rather than moving with the map's order.
    taps.sort((a, b) => a.x - b.x || a.i - b.i);
    let last = -Infinity;
    for (const tap of taps) {
      const want = Math.min(Math.max(tap.x, last + TAP_PITCH, rail.x0), rail.x1);
      last = want;
      if (Math.abs(want - tap.x) < 0.05) continue;
      const e = out[tap.i];
      out[tap.i] = {
        ...e,
        points: snapTerminal(e.points, { x: want, y: rail.y }, tap.atStart, JOG_BASE)
      };
    }
  }
  return out;
}
