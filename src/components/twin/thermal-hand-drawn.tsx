/**
 * HEAT REJECTION AND AIR MOVEMENT — ISO 10628-2 MARKS DRAWN BY HAND.
 *
 * WHY THIS FILE EXISTS. `./drawio-glyphs.tsx` is generated from draw.io's own
 * `pid` stencil XML and publishes no cooling tower and no fan; neither does
 * `./cset-glyphs.tsx`, which is an IT/OT asset taxonomy, nor `./ot-notation.tsx`.
 * `./pid-hand-drawn.tsx` is the WATER unit-operations file — screening, dosing,
 * clarification, disinfection — and is at its 499-line working size. Heat
 * rejection is a different plant family, so it gets its own module on the family
 * seam, exactly as `./electrical-instruments-hand-drawn.tsx` and
 * `./electrical-machines-hand-drawn.tsx` were split off the electrical set.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THESE REPLACE. Two published records name the missing marks in their own
 * source, having refused to borrow a neighbouring device class to cover them:
 *
 *   hyperscale-data-centers-2/content.workedExample.canvas.ts L224
 *     `cooling-plant` "KEEPS THE WRONG MARK ON PURPOSE, because there is no
 *     right one: no chiller, cooling tower, CRAH, condenser-water pump or
 *     rotating-machine glyph exists in ./cset-glyphs, ./pid-hand-drawn or
 *     ./ot-notation… Substituting a vessel-shaped near-miss there would repeat
 *     the error this whole effort began with." The wrong mark it keeps is
 *     draw.io's `container_tank_cistern` — an OPEN-TOPPED WATER VESSEL.
 *   rail-transportation-2/content.scenarios.passenger.ts L271
 *     `sc-ventilation`, "Station and tunnel ventilation", carries no `symbol`
 *     and so falls through to the same open cistern. Tunnel ventilation is a
 *     fan; an open water tank is a false statement about it, in the same way the
 *     metering pump drawn as a tank was.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * WHERE THE STANDARD ENDS, THE FILE SAYS SO. Both marks below are cited to
 * ISO 10628-2:2012 by registration number, read off the published symbol sheet
 * rather than recalled. Every place the drawn geometry DEPARTS from that sheet
 * is named in the component's own note with the arithmetic that forced it — the
 * departures are all one kind, opening a pitch that closes at this library's
 * render size, and none of them changes what the mark claims.
 *
 * A CHILLER IS DELIBERATELY ABSENT AND IS NOT AN OVERSIGHT. ISO 10628-2 defines
 * none: its Group 3 runs from the general heat exchanger through fixed-tube,
 * floating-head, U-tube, plate, coil, double-pipe, finned and spiral types to
 * the evaporator, and there is no chiller anywhere in it; Group 16 holds the
 * compressors separately. Conventionally a chiller is drawn as a COMPOSITE —
 * evaporator plus compressor plus condenser — and a composite of three marks
 * cannot resolve in a 22-unit live area when each of the three is already near
 * its own floor alone. A cooling tower is what a hyperscale campus rejects heat
 * through in any case, and it is one published mark. Reported as a standards gap
 * rather than invented.
 *
 * THE CONTRACT IS `./drawio-glyphs.tsx`'s, EXACTLY: every export is a `<g>`
 * FRAGMENT — never a standalone `<svg>` — in the same 32-unit cell with the same
 * 22-unit live area (5..27), stroking `currentColor` with nothing filled, at the
 * same 1.3 weight. Callers set colour and never weight. Coordinates are written
 * in cell space rather than under a `<g transform>` for the reason
 * `./pid-hand-drawn.tsx` records: there is no foreign coordinate system to
 * escape here, and a scale factor is exactly what thinned a datum bubble 4.4x
 * once already.
 *
 * THESE ARE NOT `pid/…` SLUGS. They are not draw.io stencils and must never be
 * registered as though they were; they belong under `oxot/thermal/…` so the
 * Phase 3 stencil manifest merges in without a name collision.
 */

/** The 22-unit live area, matching `LIVE`/`CELL` in `scripts/build-drawio-glyphs.mjs`. */
const X0 = 5;
const X1 = 27;
const Y0 = 5;
const Y1 = 27;
const CX = 16;
const CY = 16;
/** `TARGET_STROKE` from the generator — the weight every glyph in this set draws
 *  at. Written literally because this file is not generated, and importing a
 *  constant from a build script would drag Node code into a client bundle to
 *  save one number. */
const STROKE = 1.3;

/**
 * The paint set, spread onto every element below. NOT A TIDY-UP: repeating the
 * two paint tokens element by element invites one of them to drift — a filled
 * glyph, or one that stops inheriting the caller's ink and goes black in dark
 * theme. Stated once, it cannot.
 */
const S = { fill: "none", stroke: "currentColor", strokeWidth: STROKE } as const;
/** For the tower body, whose corners must stay sharp: a mitred trapezoid reads
 *  as a shell, a rounded one as a bag. The same reason `./pid-hand-drawn.tsx`
 *  keeps an `SM` variant for its racks, slabs and bowties. */
const SM = { ...S, strokeLinejoin: "miter" } as const;

/* ── THE LEGIBILITY FLOOR, DERIVED ONCE AND QUOTED BY BOTH MARKS BELOW ──────
 *
 * A gap between two strokes survives only while it leaves at least one whole CSS
 * pixel of white at `deviceScaleFactor: 1`. White is `pitch − stroke`, so for a
 * cell rendered at `p` css px the smallest honest pitch is `1.3 + 32/p` cell
 * units. This library's consumers render cells between about 21.5 and 39 css px,
 * so the demanding end is 22 px: `32/22 = 1.4545` units of white, and therefore
 * A MINIMUM PITCH OF 2.755 UNITS between any two strokes that must be seen as
 * two. That number is the whole reason the geometry below departs from the ISO
 * sheet where it does, and every departure quotes it.
 *
 * IT IS PROSE RATHER THAN A `const` BECAUSE NOTHING COMPUTES WITH IT. Every
 * coordinate here is a literal solved against it by hand and then written down;
 * a binding no expression reads is dead code that lint is right to flag, and a
 * number that only ever appears in a comment belongs in the comment.
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * ISO 10628-2:2012 REG#X8114 — COOLING TOWER, WET WITH INDUCED DRAUGHT.
 *
 * WHY THIS VARIANT OUT OF THE EIGHT ON THE SHEET. Group 5 publishes the general
 * tower (REG#2521) and then seven variants across two axes: wet / dry / wet-dry,
 * and natural / forced / induced draught. Dry towers (X8109–X8111) carry a
 * finned-coil tick row at the base instead of water; forced draught puts the fan
 * low at the air inlet, induced draught puts it at the top discharge. The wet,
 * induced-draught form is what a hyperscale campus actually has: open-circuit
 * towers with axial fans on the deck are the standard choice for an HVAC or
 * industrial chiller plant where process-fluid contamination is not a concern,
 * and counterflow induced draught is the most thermally efficient arrangement in
 * the family. Picking the general tower instead would have been safe and would
 * have said less; picking a dry cooler would have been wrong.
 *
 * THE PUBLISHED GEOMETRY, and it is four elements rather than a rectangle in a
 * hat: an isosceles TRAPEZOID narrowing upward, standing on a full-width BASIN
 * rectangle; a small CIRCLE high in the trapezoid, which is the fan; and a
 * horizontal DECK line with an UP-ARROW touching it from below — the water
 * distribution deck, and the air rising through the fill against the falling
 * water. Proportions were measured off the sheet and normalised on total height:
 * basin 0.206 of height, bottom width 0.790, top width 0.406, deck at 0.399 from
 * the top, fan centre at 0.150 with a diameter of 0.206.
 *
 * FOUR OF THOSE SURVIVE UNCHANGED AND FOUR DO NOT, AND EVERY ONE THAT MOVED
 * MOVED FOR THE 2.755-UNIT FLOOR. Stated individually, because a symbol that quietly
 * redraws its own standard is worse than one that says where it stopped:
 *
 *   KEPT   basin height 4.5 units (y 22.5..27; 3.2 units of white, 2.2 px at
 *          22 px), bottom width 17.4 (x 7.3..24.7), top width 8.9
 *          (x 11.55..20.45), and the trapezoid-on-a-rectangle silhouette.
 *   MOVED  the deck line, from ISO's 0.399 of height (y 13.8) to mid-height
 *          (y 16). At 13.8 the band between roof and deck is 8.8 units and has
 *          to hold a fan plus two gaps; split three ways that is 2.93 units
 *          each, so the fan's own hole comes out at 1.6 units — a 2.0 px circle
 *          with a 1.1 px hole, which is a dot, not a fan. At y 16 the band is
 *          11.0 units and divides as 2.755 + 5.49 + 2.755 exactly.
 *   MOVED  the fan, from centre 0.150 / diameter 0.206 (cy 8.3, r 2.27) to
 *          cy 10.5, r 2.75 — the radius that arithmetic hands back. Its hole is
 *          then 4.19 units, 2.9 px at 22 px. It sits at 25% of tower height,
 *          which still reads unambiguously as "on the roof", and roof-versus-
 *          base is the whole distinction between induced and forced draught.
 *   MOVED  the deck line runs WALL TO WALL, where ISO draws it from the left
 *          wall to about two-thirds across. A partial line stopping in mid-air
 *          beside the arrow is the defect `CheckValveInline` records being
 *          caught on twice: an independent audit read its proud seat bar as "a
 *          bowtie with a stray slash", and ink that does not meet the body is
 *          not part of the machine. Wall to wall it can only be a deck.
 *   DROPPED the fan's hub — ISO inscribes a narrow vertical ellipse in the fan
 *          circle, the blade seen edge-on. Inside a 5.5-unit circle that ellipse
 *          is under 2 units wide; at 22 px it is 1.3 px against a 0.9 px stroke
 *          and fills the circle solid. A blade mark that turns the fan into a
 *          blob removes the fan.
 *
 * THE ARROW IS AN OPEN CHEVRON, NEVER A FILLED TRIANGLE, for the reason
 * `MeteringPump` and `BarScreen` both record: a filled arrowhead is the flow
 * marker every routed edge already draws, and a symbol that borrows it stops
 * being a symbol. Its arms leave the apex at a 42° half-angle over a 3.2-unit
 * run, putting each tip 2.9 units off the centreline, and they stop at y 19.2 —
 * holding a 3.3-unit pitch off the basin below.
 *
 * IT HAS NO STEM, AND THAT IS A CORRECTION MADE AT TRUE SIZE RATHER THAN A
 * SIMPLIFICATION. ISO draws the arrow with one. Drawn that way here it had three
 * strokes converging on the apex, and the arithmetic is fatal: one unit below
 * the apex each arm stands 0.84 units off the stem, so the gap between them is
 * 0.84 − 1.3 = NEGATIVE, and the whole head fills in solid. A 22 px render
 * confirmed it — a black speck under the deck line, which is ink that says
 * nothing and is the failure `Clarifier` records for its rake ticks. Without the
 * stem the head is two strokes, and at the same height they stand 3.36 units
 * apart: 2.06 units of white, 1.4 px at 22 px, which resolves. The deck line the
 * apex lands on carries the direction the stem was there to carry.
 */
export function CoolingTowerInducedDraught() {
  return (
    <g role="graphics-symbol img" aria-label="Cooling tower, wet with induced draught">
      <title>Cooling tower, wet with induced draught</title>
      {/* Trapezoid on basin, one closed outline so the two can never part. */}
      <path
        d={`M 11.55 ${Y0} L 20.45 ${Y0} L 24.7 22.5 L 24.7 ${Y1} L 7.3 ${Y1} L 7.3 22.5 Z`}
        {...SM}
      />
      {/* The basin's own top edge — the shell/sump boundary ISO draws. */}
      <path d="M 7.3 22.5 L 24.7 22.5" {...S} />
      {/* The induced-draught fan, on the roof. */}
      <circle cx={CX} cy={10.5} r={2.75} {...S} />
      {/* Water distribution deck, wall to wall at the trapezoid's own width. */}
      <path d={`M 8.88 ${CY} L 23.12 ${CY}`} {...S} />
      {/* Air rising through the fill, apex on the deck. */}
      <path d={`M 13.1 19.2 L ${CX} ${CY} L 18.9 19.2`} {...SM} strokeLinecap="round" />
    </g>
  );
}

/**
 * ISO 10628-2:2012 REG#X8164 — BLOWER, FAN (GENERAL). A circle carrying a
 * three-blade propeller.
 *
 * WHAT IT REPLACES: rail's "Station and tunnel ventilation", currently drawing
 * draw.io's open-topped water cistern because its record carries no `symbol` and
 * falls through to the bare `process-equipment` silhouette. Tunnel ventilation is
 * one of the few station systems whose failure is a life-safety matter rather
 * than a service one, and it is drawn here as the machine it is.
 *
 * THE CIRCLE TAKES THE WHOLE LIVE AREA — r is half the live width, 11 — because
 * this is plant standing in a drawing rather than an instrument inserted into a
 * conductor run, the same call `Clarifier` makes for the same reason. There are
 * no leads and no stubs: a duct connection is a routed edge, not part of the
 * symbol.
 *
 * THE BLADES ARE SWEPT SINGLE STROKES, NOT ISO'S OUTLINED LEAVES, AND THAT IS
 * THE ONE DEPARTURE. Drawn as outlines the propeller needs six lines converging
 * on the hub; six strokes inside the 1.6-unit radius where 120°-separated marks
 * are still closer together than the 2.755-unit floor is a solid disc, and a hub that
 * fills in takes the blades with it. One stroke per blade puts three lines
 * there instead, which is a hub — and a hub is a thing a fan has.
 *
 * SWEPT RATHER THAN RADIAL, AND THE SWEEP IS THE POINT. Three straight lines at
 * 120° out of a centre is a star, and a star is not a machine. Each blade is a
 * quadratic bowed 2.2 units off its own radius, all three the same way round, so
 * the mark reads as rotation. The consistent handedness is what carries that:
 * bowing them alternately would preserve every clearance and lose the meaning.
 *
 * THE TIPS STOP AT r = 7.5 INSIDE THE r = 11 CIRCLE, leaving 2.2 units of white
 * to the wall — 1.5 px at 22 px. Run out to the wall the blades would tie into
 * it and the mark would read as a segmented disc, which is a different symbol
 * (ISO draws several in Group 16). Adjacent blades separate past 1.6 units from
 * the hub, so the whole visible length of every blade stands clear of its
 * neighbours.
 */
export function VentilationFan() {
  return (
    <g role="graphics-symbol img" aria-label="Ventilation fan">
      <title>Ventilation fan</title>
      <circle cx={CX} cy={CY} r={(X1 - X0) / 2} {...S} />
      {/* Three blades at 120°, each bowed 2.2 units the same way off its radius. */}
      <path
        d={`M ${CX} ${CY} Q 18.2 12.25 ${CX} 8.5
            M ${CX} ${CY} Q 11.65 15.97 9.5 19.75
            M ${CX} ${CY} Q 18.15 19.78 22.5 19.75`}
        {...S}
        strokeLinecap="round"
      />
    </g>
  );
}

/**
 * Connection ports for this set, in the same 32-unit cell space and the same
 * shape as `GLYPH_PORTS` in `./drawio-glyphs.tsx`, so a router does not have to
 * know which side of the generated/hand-drawn line a symbol came from.
 *
 * THE TOWER'S TERMINALS ARE NAMED BY WHAT THEY CARRY, `HOT` AND `COLD`, because
 * they are not interchangeable and a compass pair cannot say so. Warm condenser
 * water returns onto the DECK and cooled water leaves the BASIN; a route that
 * swaps them has drawn a tower running backwards, which is precisely the class
 * of error `Transformer`'s `HV`/`LV` and `InverterBridge`'s `DC`/`AC` exist to
 * make expressible. `W` and `E` ALIAS THEM rather than adding locations, for the
 * reason `MeteringPump`'s note sets out: `portFor` falls back to "the outermost
 * port on that side" and breaks a tie on ARRAY ORDER, so leaving a side unnamed
 * makes the answer an accident instead of a decision.
 *
 * HOT IS WEST AT DECK LEVEL AND COLD IS EAST AT BASIN LEVEL, WHICH IS ONE STEP
 * OFF THE SHEET AND DELIBERATE. ISO's preferred-connection ticks put the warm
 * return west at the deck and show the cold draw-off on BOTH walls of the basin,
 * i.e. either side will serve. Taking the east one makes the glyph read as a
 * flow-through — in one side, out the other — and, more usefully, removes the
 * tie that two west-facing ports at different heights would hand the router.
 *
 * THERE IS NO `N` AND NO `S`, AND THE OMISSION IS THE HONEST ANSWER. The top of
 * this mark is the fan's air discharge and the bottom is the basin floor;
 * neither is a pipe connection. Declaring a compass port there to keep the table
 * square would draw a water line out of the air outlet, which is worse than a
 * conductor falling back to the cell edge, because it would look correct.
 *
 * THE FAN DECLARES NOTHING, and that is the same judgement. Its only boundary is
 * the circle, every point of which is equivalent; it has no nozzle to name, and
 * a duct is an edge rather than a terminal. A table entry asserting otherwise
 * would put a port where there is no ink.
 *
 * BOTH TOWER PORTS SIT ON INK. `HOT` is the west end of the deck line, where it
 * meets the wall; `COLD` is on the basin's east wall. A port with no ink is a
 * terminal that does not exist.
 */
export const THERMAL_HAND_DRAWN_PORTS: Record<string, ReadonlyArray<{ name: string; x: number; y: number }>> = {
  CoolingTowerInducedDraught: [
    { name: "HOT", x: 8.88, y: CY },
    { name: "COLD", x: 24.7, y: 24.75 },
    { name: "W", x: 8.88, y: CY },
    { name: "E", x: 24.7, y: 24.75 }
  ]
};
