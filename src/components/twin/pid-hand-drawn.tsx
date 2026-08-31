/**
 * P&ID SYMBOLS THE STENCIL SOURCE CANNOT SUPPLY — DRAWN BY HAND.
 *
 * WHY THIS FILE EXISTS AT ALL. `./drawio-glyphs.tsx` is generated from draw.io
 * 31.3.2's own mxGraph stencil XML, and the geometry is only as correct as what
 * draw.io ships. For the globe valve it is wrong: `pid/valves/globe_valve` and
 * `pid/valves/ball_valve` are BYTE-IDENTICAL in `valves.xml` — same bowtie, same
 * four arcs, same paint ops, verified by hashing all 43 curated glyphs (they
 * collided on `dcc771b0a2cd3552`). That is upstream data, not conversion loss,
 * so no compiler work recovers it and both pass the golden-render oracle.
 *
 * ISA-5.1 DISCRIMINATES THESE VALVES BY THE MARK AT THE CENTRE OF THE BOWTIE.
 * The bodies are the same two opposing triangles; what differs is what sits at
 * the waist:
 *
 *   gate   plain bowtie, nothing at the centre     `GateValve` (generated)
 *   globe  bowtie + SMALL SOLID DOT (plug/seat)    this file
 *   ball   bowtie + CIRCLE OUTLINE (the ball)      `BallValve` (generated)
 *
 * Drawing globe and ball alike loses the most-consulted distinction on a P&ID:
 * a globe valve throttles, a ball valve isolates. An OT engineer reads that off
 * the centre mark, so one mark for both is a correctness defect, not a cosmetic
 * one.
 *
 * NOTE ON THE PLUG VALVE, the near neighbour. Some ISA-derived references
 * reserve the EMPTY circle for a plug valve and give the ball a diamond. This
 * set follows the more common reading — empty circle = ball — because that is
 * what draw.io's own `ball_valve` draws. A plug valve added later needs a mark
 * that is neither, and this comment is the record of why.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE WATER UNIT OPERATIONS — WHY EIGHT MORE MARKS LIVE HERE (waves R3, R4).
 *
 * R3: a visual audit scored the water P&ID's symbol correctness 17/30. Four of
 * its marks were a DIFFERENT unit operation borrowed because the stencil set
 * has no entry — the UV reactor drew an electric heater (shell PLUS power
 * cabinet, so it read as an I/O panel beside the real PLC), the bar screen drew
 * an inline basket strainer, the day tank drew a dry-solids silo, the metering
 * pump drew a gear pump (right family, wrong machine: no stroke adjuster). Three
 * more were defensible but unreadable: the clearwell was pixel-identical to the
 * OPEN intake wet well, the check valve's filled arrowhead was the same mark as
 * the flow markers on every edge, and the clarifier had no rake or draw-off.
 *
 * R4: a second audit found three R3 replacements still wrong AT RENDER SIZE —
 * 29 css px. `CheckValveInline`, `MeteringPump` and `Clarifier` are redrawn, each
 * with its own note. The lesson all three share: a symbol whose distinguishing
 * feature is its smallest feature has no distinguishing feature.
 *
 * WHERE A STANDARD EXISTS IT IS FOLLOWED, AND SAID SO PER COMPONENT. ISO 10628 /
 * ISA-5.1 genuinely define none of: a UV reactor, a bar screen, a circular
 * clarifier. Those doc comments name the industry representation drawn instead —
 * no symbol here is silently invented. The rest are conventional: a closed
 * vented tank, a diaphragm PD pump, a covered basin, a swing check.
 *
 * THESE ARE NOT `pid/…` SLUGS. They are not draw.io stencils and must never be
 * registered as though they were; they are wired under `oxot/water/…` so the
 * Phase 3 stencil manifest merges in without a name collision.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * THE CONTRACT IS `./drawio-glyphs.tsx`'s, EXACTLY. Every export is a `<g>`
 * FRAGMENT — never a standalone `<svg>` — in the same 32-unit cell with the same
 * 22-unit live area (5..27), stroking `currentColor`, nothing filled except
 * where ISA requires it, at the same 1.3 weight. A caller cannot tell a
 * hand-drawn glyph from a generated one: the generator re-exports this file, so
 * `GlobeValve` resolves here without any importer changing.
 *
 * WHY THE COORDINATES ARE WRITTEN IN CELL SPACE AND NOT UNDER A `<g transform>`.
 * The generated glyphs carry `scale(0.22449)` because their source geometry is
 * 98x60 stencil units, with stroke widths pre-divided to land back on 1.3.
 * Nothing here has a foreign coordinate system to escape, so drawing in cell
 * units keeps `strokeWidth={1.3}` readable as the number it renders — and avoids
 * the bug in `docs/diagram-system/task_plan.md` where a coordinate-space
 * mismatch thinned a datum bubble 4.4x.
 */

/** The 22-unit live area, matching `LIVE`/`CELL` in `scripts/build-drawio-glyphs.mjs`. */
const X0 = 5;
const X1 = 27;
/** The generated valves' body is 98x60 stencil units fitted to 22 wide, so it is
 *  22 * 60/98 = 13.47 tall, centred on the midline. Reusing the identical extents
 *  is what seats a hand-drawn valve in a row of generated ones without a seam. */
const Y0 = 9.265;
const Y1 = 22.735;
const CX = 16;
const CY = 16;
/** `TARGET_STROKE` from the generator. Written literally because this file is
 *  not generated, and a constant imported from a build script would drag Node
 *  code into a client bundle to save one number. */
const STROKE = 1.3;
/** The plug mark. ISA draws it small and solid — about a third of the body
 *  height, so it reads as a seated plug and not as the ball valve's ball: 4.8
 *  units across against the ball outline's 9.0, and solid against hollow. */
const PLUG_R = 2.4;

/**
 * Every stroked element spreads one of these three, so the 1.3 weight and the
 * two paint tokens cannot drift mark by mark — across nine symbols and ~40
 * elements, repeating the attributes would invite drift and blow the line budget.
 *
 * NOTE FOR `scripts/build-drawio-glyphs.mjs`. Its paint guard
 * (`assertPaintTokens`) matches paint written as a JSX ATTRIBUTE, so it sees the
 * globe valve's filled plug and nothing else here; these three objects are the
 * rest of the paint surface and are token-only by construction. Never quote an
 * attribute-form paint value in this file's PROSE either — the guard reads the
 * whole source, comments included, and will reject the example.
 */
const S = { fill: "none", stroke: "currentColor", strokeWidth: STROKE } as const;
/** For elements whose corners must stay sharp at 24px — racks, slabs, bowties. */
const SM = { ...S, strokeLinejoin: "miter" } as const;
/** Dashed: a liquid surface, or a path something travels along rather than a
 *  wall. Matches the generated filters' use of dashes for a non-solid boundary. */
const SD = { ...S, strokeDasharray: "2.2 1.6" } as const;

/**
 * ISA-5.1 globe valve — bowtie body with the plug drawn solid at the seat.
 *
 * HAND-DRAWN, NOT GENERATED: draw.io's `pid/valves/globe_valve` is a duplicate
 * of its `ball_valve` (see this file's header). The body is the same path
 * `GateValve` emits, at the same extents, so gate then globe then ball reads as
 * one family differing only in the centre mark.
 *
 * THE DOT IS THE ONE FILLED ELEMENT IN THIS COMPONENT SET, and it is filled
 * because ISA-5.1 requires it — an unfilled circle at the waist is a different
 * valve. It fills `currentColor` rather than a token so it stays welded to the
 * stroke colour in both themes; a dot resolving to a surface token would vanish
 * on one of them.
 */
export function GlobeValve() {
  return (
    <g>
      <path d={`M ${X0} ${Y1} L ${X0} ${Y0} L ${X1} ${Y1} L ${X1} ${Y0} Z`} {...SM} />
      <circle cx={CX} cy={CY} r={PLUG_R} fill="currentColor" stroke="none" />
    </g>
  );
}

/**
 * UV disinfection reactor — `oxot/water/uv_reactor`. Replaces the electric
 * heater that `UV-501` was drawing.
 *
 * CONVENTION CHOSEN, NOT CITED. Neither ISA-5.1 nor ISO 10628 defines a UV
 * reactor, so this draws the representation every UV vendor and municipal
 * treatment schematic uses: a HORIZONTAL CLOSED VESSEL with dished heads and
 * flanged end nozzles, with quartz lamp sleeves entering through the shell wall
 * and crossing the bore. The three capped rods are the whole point — they say
 * "energised elements inserted into a flow-through chamber", which is what a UV
 * reactor is and what no rectangle can say.
 *
 * WHY IT CANNOT READ AS A PANEL, which was the audit's ranked defect #1: there
 * is no enclosure rectangle anywhere in the mark. A capsule with rods through
 * it shares no silhouette with `ElectricHeater`'s cabinet-plus-shell or with
 * the CSET PLC box it was sitting ten centimetres away from.
 */
export function UvReactor() {
  return (
    <g>
      <path
        d="M 9 11.5 L 23 11.5 A 2.2 4.5 0 0 1 23 20.5 L 9 20.5 A 2.2 4.5 0 0 1 9 11.5 Z"
        {...S}
      />
      <path d="M 5 16 L 6.8 16 M 25.2 16 L 27 16" {...S} />
      <path d="M 6 14.2 L 6 17.8 M 26 14.2 L 26 17.8" {...S} />
      <path d="M 12.5 9.6 L 12.5 19.6 M 16 9.6 L 16 19.6 M 19.5 9.6 L 19.5 19.6" {...S} />
      <path
        d="M 11.5 9.6 L 13.5 9.6 M 15 9.6 L 17 9.6 M 18.5 9.6 L 20.5 9.6"
        {...S}
      />
    </g>
  );
}

/**
 * Coarse bar screen — `oxot/water/bar_screen`. Replaces the basket strainer
 * that `S-101` was drawing.
 *
 * CONVENTION CHOSEN, NOT CITED. Headworks screening has no ISO 10628 symbol;
 * the universal drawing-office representation, used in every wastewater
 * treatment schematic, is a SECTION THROUGH THE CHANNEL with the rack shown as
 * parallel bars inclined against the flow at 60–80°. Drawn here at 69° with the
 * bars carried on a top rail — the rail is what makes four diagonals read as
 * one rack rather than as hatching.
 *
 * THE RAKE PATH IS IMPLIED, NOT DRAWN AS A MACHINE. A raked screen's rake
 * travels up the face and discharges over the top; the open chevron standing off
 * the head of the rack, aligned to the bars, is that travel direction. Open
 * rather than filled so it cannot be read as one of the edges' flow markers —
 * at a 42° half-angle with 3.2-unit arms, because the first cut at 32°/2.4
 * closed into a blob at 64px and became that very filled arrowhead.
 *
 * THREE BARS, NOT FIVE. Drawn dense the bars become hatching and the mark turns
 * into a filled panel — the first cut had four bars at 4 units of pitch and read
 * as a shaded slab at 64px. At 5 units of pitch the 3.7-unit gap survives 24px.
 */
export function BarScreen() {
  return (
    <g>
      <path d="M 5 11 L 5 24 L 27 24 L 27 11" {...SM} />
      <path
        d="M 10 24 L 15 12.5 M 15 24 L 20 12.5 M 20 24 L 25 12.5 M 15 12.5 L 25 12.5"
        {...SM}
      />
      <path d="M 10.59 9.33 L 13.5 8 L 14.51 11.03" {...SM} />
    </g>
  );
}

/**
 * Hypochlorite day tank — `oxot/water/chemical_day_tank`. Replaces the
 * conical-bottom solids bunker that `T-301` was drawing.
 *
 * ISO 10628 CLOSED VESSEL, which is the standard mark and needs no invention:
 * a vertical shell CLOSED AT THE TOP with a dished bottom, a gooseneck vent
 * standing off the roof, a dashed liquid surface and a bottom draw-off to the
 * dosing pump.
 *
 * IT IS THE CLOSED TOP THAT CARRIES THE MEANING. `Vessel` (cistern) and
 * `ConicalBunker` are both drawn open — three sides, no roof — because a
 * cistern and a silo are open to atmosphere. Sodium hypochlorite is not stored
 * that way: it off-gasses, so the tank is sealed and vented, and the gooseneck
 * is the mark that says so. The dished bottom rather than the bunker's 60°
 * cone is the other half: a cone is for bridging solids, a dish is for draining
 * liquid.
 */
export function ChemicalDayTank() {
  return (
    <g>
      <path d="M 9 10 L 23 10 L 23 22 A 7 3 0 0 1 9 22 Z" {...SM} />
      <path d="M 16 10 L 16 6.9 A 1.7 1.7 0 0 1 19.4 6.9 L 19.4 9.4" {...S} />
      <path d="M 9 16 L 23 16" {...SD} />
      <path d="M 16 25 L 16 26.6" {...S} />
    </g>
  );
}

/**
 * Chemical metering pump — `oxot/water/metering_pump`. Drawn at `P-201`
 * (coagulant) and `P-501` (hypochlorite). Replaces the gear pump these were
 * originally given, and REDRAWN AGAIN in R4.
 *
 * WHAT R4 CHANGED AND WHY. The first hand-drawn cut was a small rectangular
 * drive body with the liquid end as a SEPARATE CIRCLE standing outside it and a
 * 3-unit T-stem on top. At the 29 rendered pixels the audit measured it was
 * unidentifiable: the body was 11 units wide against the cell's 22, the stem was
 * three pixels of line, and a circle hung off the casing reads as a different
 * machine from the two centrifugal pumps on the same sheet, which ENCLOSE their
 * impeller. All three are size-and-silhouette faults, so the mark is redrawn
 * across the full live area with four elements instead of six.
 *
 * ISO 10628 POSITIVE-DISPLACEMENT PUMP, DIAPHRAGM FORM. One rectangle for the
 * body; the arc inside it is the DIAPHRAGM, dividing drive end from liquid end
 * and bowing toward the liquid side as a pumping diaphragm does. Suction and
 * discharge stand on the liquid end's own vertical axis, low and high — a
 * metering pump stacks its check valves, which is why they are not opposed.
 *
 * THE DIAGONAL IS THE ADJUSTABILITY MARK, AND IT IS THE DEFINING FEATURE. ISO
 * 10628 and IEC 60617 alike annotate an adjustable machine with an arrow drawn
 * diagonally across the symbol; on a dosing pump that arrow is the stroke
 * adjuster, and stroke is what a metering pump is specified by. `GearPump` has
 * no such mark because it is fixed displacement — so a gear pump on a chlorine
 * dosing line reads "cannot be set to a dose". The head is an OPEN CHEVRON,
 * never a filled triangle: a filled arrowhead is the flow marker every edge
 * already draws.
 */
export function MeteringPump() {
  return (
    <g>
      <rect x={7} y={12} width={18} height={10} {...SM} />
      {/* r = 5.2 on a 10-unit chord is nearly a semicircle: the diaphragm bulges
          3.8 units into the liquid end and stands 3.7 clear of the wall. At the
          6.5 first tried it peaked 2.0 away and read as a rounded corner. */}
      <path d="M 17.5 12 A 5.2 5.2 0 0 1 17.5 22" {...S} />
      <path d="M 21.5 22 L 21.5 26.4 M 21.5 12 L 21.5 7.6" {...S} />
      {/* THE BODY IS 10 UNITS TALL, NOT 12, SO THE ARROW IS NOT THE RECTANGLE'S
          OWN DIAGONAL — drawn corner to corner the mark reads as a crossed-out
          box. At this height it enters the bottom edge 2.0 units inside the
          right corner and leaves the top 2.0 inside the left, which reads as an
          arrow passing THROUGH the machine; both ends protrude as ISO draws it,
          and the head sits over the drive end, clear of the nozzles. */}
      <path d="M 26.4 24.4 L 5.6 9.6" {...S} />
      <path d="M 8.99 9.92 L 5.6 9.6 L 7.01 12.69" {...SM} />
    </g>
  );
}

/**
 * Clearwell — `oxot/water/clearwell`. Replaces the second copy of the open
 * cistern that `T-601` was drawing.
 *
 * ISO 10628 COVERED BASIN: the same three-sided basin as `Vessel`, with a roof
 * slab bearing on the walls and overhanging them, plus a dashed water surface.
 *
 * THE ROOF IS THE ENGINEERING CLAIM, not decoration. A clearwell is covered
 * precisely so it can hold a free chlorine residual — an open basin loses it to
 * volatilisation and sunlight and takes on airborne contamination, which is why
 * drawing the clearwell identically to the raw-water intake wet well says the
 * plant has no contact tank. Deliberately narrower than `Vessel` (20 units of
 * wall against 22) so the slab overhangs and the two marks differ in silhouette
 * as well as in stroke count.
 */
export function Clearwell() {
  return (
    <g>
      <path d="M 6 11 L 6 24 L 26 24 L 26 11" {...SM} />
      <rect x={5} y={8.8} width={22} height={2.2} {...SM} />
      <path d="M 7 15 L 25 15" {...SD} />
    </g>
  );
}

/**
 * Inline swing check valve — `oxot/water/check_valve_inline`. Replaces
 * `pid/valves/check_valve_1` at `CV-701`.
 *
 * ISA-5.1 VALVE BODY, which is what the generated glyph lacked: the same bowtie
 * every other valve uses, at the FULL 5..27 live area so it matches `GlobeValve`
 * and the upstream face IS the port — an arriving arrowhead lands on the flange
 * rather than on a 1.6-unit stub in front of it.
 *
 * R4 MOVED THE DISC OFF THE CENTRELINE, AND THAT WAS THE R3 DEFECT. R3 put the
 * bar across the WAIST at x = 16 with a 2.8-unit chevron beside it; at 29 px the
 * chevron was under three pixels wide and vanished, leaving a bowtie with a stem
 * through its apex — a generic valve carrying NO DIRECTION, the one thing a
 * check-valve symbol exists to say.
 *
 * SO THE ASYMMETRY IS STRUCTURAL. The seat stands at the UPSTREAM QUARTER,
 * x = 10.4, and the flapper hinges on its top and leans downstream at 44° from
 * vertical. Seat-then-flapper in the left half and nothing in the right says the
 * direction by WHERE THE INK IS, at any render size.
 *
 * R5 CLIPPED THE SEAT TO THE BODY, WHICH IT NEVER SHOULD HAVE LEFT. The R4 bar
 * spanned y 8.4..23.6 while the body at x = 10.4 is only y 12.571..19.429, so it
 * stood proud by 4.16 units — 27% of glyph height — each side. An independent
 * audit read that as "a bowtie with a stray slash", and it was right: ink outside
 * the body is not a valve part. The seat now runs wall to wall and the flapper's
 * far end, (14, 16.3), is inside the upstream triangle.
 *
 * 10.4 RATHER THAN THE 9.5 FIRST DRAWN, MEASURED OFF THE RENDER. The `markerEnd`
 * arrowhead is 5 marker units at a 2.25 stroke = 11.25 cell units long, and its
 * `refX` of 7/8 carries the tip 1.4 units PAST the port at x = 5. At 9.5 the
 * clear space between that tip and the disc was 3.1 units — 3.6 css px on the
 * shipped plate, which put a grey arrowhead against a white bar and read as one
 * blob. At 10.4 the gap is 4.0 units and the two separate.
 *
 * NO CENTRE STEM, deliberately: the waist is where `GlobeValve` puts its solid
 * plug and `BallValve` its circle. Leaving it empty keeps the three distinct.
 */
export function CheckValveInline() {
  return (
    <g>
      <path d={`M ${X0} ${Y1} L ${X0} ${Y0} L ${X1} ${Y1} L ${X1} ${Y0} Z`} {...SM} />
      <path d="M 10.4 12.571 L 10.4 19.429" {...S} />
      <path d="M 10.4 12.571 L 14 16.3" {...S} />
    </g>
  );
}

/**
 * Circular clarifier — `oxot/water/clarifier`, at `CL-301`. Replaces the
 * cyclone-derived gravity separator it was originally given, REDRAWN IN PLAN in
 * R4 and re-interiored in R5.
 *
 * WHY THE PROJECTION CHANGED IN R4. In section a circular clarifier and a
 * rectangular one are the same rectangle — roundness is the defining property and
 * that projection cannot show it. Plan is how every water general-arrangement
 * drawing draws one, for exactly this reason.
 *
 * R5 REDREW THE INTERIOR, BECAUSE CIRCLE + DIAMETER + CENTRE RING IS A VALVE.
 * The R4 mark carried a full 45° diameter, a centre well at r = 3.8 and four
 * 4.4-unit rake ticks. At the 28 css px this cell actually renders, the ticks are
 * 3.5 px at 3.5 px of pitch against a 1.0 px stroke, so they merge into hatching
 * and what is left is a circle, a slash through its centre and a ring at the
 * middle — a globe valve, or a prohibition sign, inline in a pipe run with a flow
 * arrow into it. An independent audit read it exactly that way. The R4 comment
 * claimed four blades fixed this; they do not at shipped scale, which is why this
 * note quotes measured pixels instead.
 *
 * A VALVE MARK IS SYMMETRIC ABOUT ITS CENTRE, SO THIS ONE IS NOT. The bridge runs
 * from the centre to the wall on ONE diagonal — a half-bridge, which is what a
 * centre-pier clarifier has — and is drawn as a BRIDGE: two parallel edges 4.4
 * units apart, closed across the centre end. 4.4 units is 3.9 css px of gap at
 * render size, which is what stops the two edges collapsing into the single
 * stroke that made the prohibition sign. Finer was tried and measured: 3.2 units
 * merges, and so do rake ticks at every pitch that fits inside the wall.
 *
 * WHAT IS DELIBERATELY NOT DRAWN. The centre well ring — at 28 px it was the ring
 * supplying the globe valve's plug, and the bridge's closed inner end marks the
 * centre pier anyway. The blades, for the pitch reason above. A sludge stub at 6
 * o'clock: the wall reaches the live area's edge and `CL-301 → TK-301` IS the
 * line. The diagonal keeps the bridge off the pipe axis at 9 and 3 o'clock.
 */
export function Clarifier() {
  return (
    <g>
      <circle cx={CX} cy={CY} r={11} {...S} />
      {/* Edges offset ±2.2 from the 45° centreline, each run 10.778 =
          sqrt(11² − 2.2²) from its own foot, so both outer ends land ON the
          wall — not short of it, and not through it. */}
      <path
        d="M 17.56 14.44 L 25.18 22.07 M 14.44 17.56 L 22.07 25.18
           M 17.56 14.44 L 14.44 17.56"
        {...SM}
      />
    </g>
  );
}

/**
 * Rapid-mix / coagulant chamber — `oxot/water/coagulant_mixer`. Replaces the
 * bare `pid/agitators/agitator_propeller` at `MX-201`.
 *
 * ISO 10628 AGITATED VESSEL: the agitator symbol is correct but incomplete on
 * its own — the stencil draws a shaft and blades with NOTHING AROUND THEM, so
 * on the water train it read as an impeller hanging off the pipe in mid-air.
 * A rapid-mix stage is a chamber with a defined contact volume; the basin, the
 * liquid surface and the top-entry drive are what make it one.
 *
 * FLAT-BLADE TURBINE, not the propeller, and that is a real distinction: rapid
 * mix for coagulation is a high-shear radial-flow duty, which is a turbine.
 * `PropellerAgitator` keeps its arc blades and stays the axial-flow mark.
 */
export function CoagulantMixer() {
  return (
    <g>
      <path d="M 8 11 L 8 24 L 24 24 L 24 11" {...SM} />
      <path d="M 8 13 L 24 13" {...SD} />
      <rect x={13.4} y={5} width={5.2} height={3} {...SM} />
      <path d="M 16 8 L 16 20" {...S} />
      <path d="M 12.4 20 L 19.6 20 M 12.4 18.8 L 12.4 21.2 M 19.6 18.8 L 19.6 21.2" {...S} />
    </g>
  );
}

/**
 * Connection ports for the hand-drawn set, in the same 32-unit cell space and
 * the same shape as the generated `GLYPH_PORTS`, so a router does not have to
 * know which side of the generated/hand-drawn line a symbol came from. The
 * valve entries are the four draw.io publishes for every `pid/valves` stencil
 * (N/S at y = 0.165/0.835 of the body, W/E at the body's ends), evaluated
 * against the valve's extents rather than copied as numbers. The water units'
 * ports are the real nozzles: a day tank draws off its bottom, a clarifier
 * wastes sludge from its hopper, a metering pump suctions low and discharges
 * high.
 */
export const HAND_DRAWN_PORTS: Record<string, ReadonlyArray<{ name: string; x: number; y: number }>> = {
  GlobeValve: [
    { name: "N", x: CX, y: Y0 + (Y1 - Y0) * 0.165 },
    { name: "S", x: CX, y: Y0 + (Y1 - Y0) * 0.835 },
    { name: "W", x: X0, y: CY },
    { name: "E", x: X1, y: CY }
  ],
  CheckValveInline: [
    { name: "W", x: X0, y: CY },
    { name: "E", x: X1, y: CY }
  ],
  UvReactor: [
    { name: "W", x: X0, y: CY },
    { name: "E", x: X1, y: CY }
  ],
  BarScreen: [
    { name: "W", x: X0, y: 17.5 },
    { name: "E", x: X1, y: 17.5 }
  ],
  ChemicalDayTank: [
    { name: "N", x: CX, y: 10 },
    { name: "S", x: CX, y: 26.6 }
  ],
  // W AND E DELIBERATELY ALIAS THE SUCTION AND THE DISCHARGE. A metering pump
  // has no side nozzles at all — its check valves are stacked on the liquid
  // end's vertical axis — but `diagrams/ports.ts` falls back to "the outermost
  // port on that side" when a side is unnamed, and it breaks a tie on ARRAY
  // ORDER. Two nozzles sharing an x are always a tie, so an unnamed side would
  // send both the inlet and the outlet to whichever one happened to be first,
  // and the pump would be drawn discharging out of its own suction. Naming all
  // four sides is what makes the answer a decision instead of an accident.
  MeteringPump: [
    { name: "S", x: 21.5, y: 26.4 },
    { name: "N", x: 21.5, y: 7.6 },
    { name: "W", x: 21.5, y: 26.4 },
    { name: "E", x: 21.5, y: 7.6 }
  ],
  Clearwell: [
    { name: "W", x: 6, y: 18 },
    { name: "E", x: 26, y: 18 },
    { name: "S", x: CX, y: 24 }
  ],
  // On the plan view the influent and effluent are at 9 and 3 o'clock ON THE
  // WALL, and the sludge line leaves at 6 o'clock — the three points the pipes
  // in `water-treatment-train.ts` actually connect to.
  Clarifier: [
    { name: "W", x: X0, y: CY },
    { name: "E", x: X1, y: CY },
    { name: "S", x: CX, y: 27 }
  ],
  CoagulantMixer: [
    { name: "W", x: 8, y: 15 },
    { name: "E", x: 24, y: 15 },
    { name: "N", x: 11, y: 11 }
  ]
};
