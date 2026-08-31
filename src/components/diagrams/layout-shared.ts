import type { Bilingual } from "@/i18n/bilingual";
import type { EdgeKind, PurdueLevel } from "./types";
import type { Point } from "./geometry";

/**
 * THE VOCABULARY EVERY OTHER DIAGRAM FILE AGREES ON — the shared constants and
 * the shared record types, and nothing that computes anything.
 *
 * Split out of ./layout.ts on 2026-08-28. The seam is a dependency one rather
 * than a stylistic one, and it resolves two real cycles: `ports.ts` needs the
 * glyph cell size while `layout.ts` needs `ports.ts`, and `layout-purdue.ts`
 * needs `PlacedNode` while `layout.ts` needs `layoutPurdue`. Declarations have
 * no dependencies of their own, so they are the half that moves. `layout.ts`
 * re-exports all of it, so no existing caller had to change.
 */

/** Node box. Wide enough for two lines of label under the 32-unit glyph cell. */
export const NODE_W = 124;
export const NODE_H = 82;
/** The glyph cell every symbol in `drawio-glyphs.tsx` is fitted to. */
export const GLYPH = 32;
/** Where the glyph cell starts inside the node box; its centre is `GLYPH_TOP + GLYPH / 2`. */
export const GLYPH_TOP = 6;
/** Canvas margin. */
export const PAD = 24;

/**
 * THE BOX A P&ID NODE IS DECLARED TO ELK AS — the glyph cell and its inset, NOT
 * the full label box. ELK attaches an edge at the middle of the box it is given,
 * and the middle of the 82-unit label box is 19 units BELOW the centre of the
 * 32-unit symbol. The first water-train render showed the consequence exactly:
 * the pipe between the intake and the screen drawn as a separate line UNDER two
 * floating stubs it never touched. A pipe that does not meet its equipment is a
 * different claim from a pipe that does. The symmetric 44-unit box puts the
 * attachment point ON the symbol centre; the tag and label are drawn below it,
 * outside the box ELK knows about, which is what `elk.spacing.nodeNode` and the
 * canvas's bottom band below have to carry.
 */
export const PID_NODE_H = GLYPH_TOP * 2 + GLYPH;
/** Tag line plus two label lines, drawn under the declared P&ID box. */
export const PID_LABEL_BAND = NODE_H - PID_NODE_H;

/**
 * A BUSBAR IS DECLARED THREE BOXES WIDE, AND THAT IS THE FIX FOR A REAL DEFECT.
 *
 * Drawn as an ordinary 124-unit node, the three-conductor bus stencil rendered
 * as three short strokes in a card and read, in the audit's words, as a
 * hamburger icon. A busbar is not a device with a symbol; it is a length of
 * conductor that other things tap into, and the only honest way to draw one is
 * as a rail long enough for the taps to be spread along it. Declaring the width
 * to ELK — rather than drawing a long line inside a short box — is what makes
 * ELK fan the incoming feeders across the rail instead of stacking them on one
 * 124-unit side.
 */
export const BUS_W = NODE_W * 3;

/* ── TYPE SCALE ───────────────────────────────────────────────────────────
 *
 * These are USER UNITS, and the rendered size is user units times the viewBox
 * scale — which is the drawing's column width divided by its canvas width. The
 * independent audit measured the consequence of ignoring that second term: node
 * names at 9.55 css px, edge labels at 8.64, "FIC 301" a smudge at 1x.
 *
 * The floor being held is 11 css px at the gallery's own column widths, and it
 * is held from BOTH ends — these sizes went up, and `elk.aspectRatio` came down
 * so the widest canvas stopped scaling itself under 1:1. Raising type alone
 * could not fix the instrument bubbles, whose lettering is drawn inside
 * `twin/instrument-bubble` at a size this subsystem does not own; the only
 * lever on those is the scale, which is why both moved.
 */
/**
 * THE SMALLEST SCALE A DRAWING MAY BE RENDERED AT, and it is a floor rather
 * than a preference.
 *
 * `Diagram` sizes its SVG to whatever column it is dropped into and lets the
 * viewBox scale, so rendered type size is a property of the PAGE, not of this
 * subsystem — which is how the same components produced 13 px lettering in one
 * plate and 8.6 px in another on the same page. The floor moves that guarantee
 * back where it belongs: below this scale the figure widens past its column and
 * scrolls inside its own box, which `Diagram` is already built to do.
 *
 * 1.16 is derived, not chosen. The smallest type on any drawing is the loop
 * numeral inside an ISA bubble — 10 units in the 44-unit bubble cell, scaled by
 * `ISA_CELL / 44` into the glyph cell, so 9.545 user units. 11 / 9.545 = 1.152.
 */
export const MIN_RENDER_SCALE = 1.16;

export const TAG_SIZE = 12;
export const LABEL_SIZE = 12.75;
export const EDGE_LABEL_SIZE = 12;
export const LABEL_LEADING = 13.5;
/** Caption baselines inside the 82-unit node box. Two label lines have to fit. */
export const TAG_Y = 48;
export const LABEL_TOP_TAGGED = 62;
export const LABEL_TOP_PLAIN = 56;

/* ── THE LAYOUT RECORD ────────────────────────────────────────────────────
 *
 * What a layout pass hands the render layer. Both passes — the layered one in
 * ./layout.ts and the banded one in ./layout-purdue.ts — produce exactly this,
 * which is what lets `Diagram` dispatch on type without knowing how either was
 * computed.
 */

export interface PlacedNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RoutedEdge {
  id: string;
  from: string;
  to: string;
  kind: EdgeKind;
  label?: Bilingual;
  bidirectional?: boolean;
  /** Carried through from `DiagramEdge` so the snapper can honour a named
   *  nozzle; see that field for why bearing alone is not always enough. */
  fromPort?: string;
  toPort?: string;
  /** Carried from `DiagramEdge`; selects ISA's open-circle (shared system)
   *  data link over the filled-circle (independent systems) one. */
  sharedSystem?: boolean;
  points: Point[];
}

export interface PurdueBand {
  level: PurdueLevel;
  y: number;
  height: number;
}

export interface DiagramLayout {
  nodes: PlacedNode[];
  edges: RoutedEdge[];
  width: number;
  height: number;
  /** Non-empty only for `type: "purdue"`. */
  bands: PurdueBand[];
  /**
   * How wide a Purdue band is drawn. Narrower than `width` when the graph has
   * level-skipping edges, because the riser corridor those route through sits
   * OUTSIDE the levels — a connection that bypasses the model should not be
   * drawn inside the thing it bypasses.
   */
  bandWidth: number;
}
