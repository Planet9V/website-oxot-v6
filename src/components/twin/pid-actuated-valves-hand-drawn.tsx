/**
 * ISA-5.1 ACTUATED VALVES — A VALVE BODY WITH THE THING THAT MOVES IT.
 *
 * WHY THIS FILE EXISTS. Every valve in `./drawio-glyphs.tsx` and in
 * `./pid-hand-drawn.tsx` is a BARE BODY — a bowtie, with or without a mark at
 * the waist. In ISA-5.1 a bare body is the symbol for a HAND valve: the reader
 * is entitled to conclude that somebody walks up and turns it. An independent
 * audit found the manufacturing drawing's `XV-306` drawn with
 * `pid/valves/gate_valve` while the conductor arriving at it was labelled
 * "24 V DO", and its verdict is the reason this module was opened: that is not a
 * true statement missing a detail, it is an actively false one. An `XV` is
 * DEFINED by being actuated — the `X` is ISA's unclassified variable and the `V`
 * is the valve, so the tag says "a valve driven by something the loop
 * commands". A hand valve cannot receive a digital output.
 *
 * ISA-5.1 DRAWS A FINAL ELEMENT AS BODY + ACTUATOR, AS ONE SYMBOL. That is the
 * whole point of the composition: the actuator sits on a stem above the body and
 * says what kind of energy moves it — a dome for a diaphragm, a cylinder for a
 * piston, a circled `M` for a motor, and a RECTANGLE MARKED `S` for a solenoid.
 * Drawing the body alone leaves the most consequential property of a final
 * element off the drawing.
 *
 * IT IS A NEW MODULE RATHER THAN A NINTH MARK IN `./pid-hand-drawn.tsx` because
 * that file stands at 499 lines against this project's 500-line ceiling. The
 * seam is a real one and not a line count: everything there is a UNIT OPERATION
 * or a bare body, and everything here is a body COMPOSED WITH ITS ACTUATOR. When
 * a diaphragm or a motor-operated valve is needed, this is where it goes.
 *
 * THE CONTRACT IS `./drawio-glyphs.tsx`'s, EXACTLY. Every export is a `<g>`
 * FRAGMENT — never a standalone `<svg>` — in the 32-unit cell with the 22-unit
 * live area (x/y 5..27), stroking `currentColor` with nothing filled, at the
 * same 1.3 weight. Coordinates are written in cell space rather than under a
 * `<g transform>`, for the reason `./pid-hand-drawn.tsx` records: there is no
 * foreign coordinate system to escape, and a scale factor is exactly what
 * thinned a datum bubble 4.4x once already.
 *
 * THESE ARE NOT `pid/…` SLUGS. They are wired under `oxot/pid/…` — "a P&ID mark
 * this project drew" — so the Phase 3 draw.io stencil manifest merges in without
 * a name collision, exactly as `oxot/water/…` and `oxot/electrical/…` do.
 */

/** The 22-unit live area, matching `LIVE`/`CELL` in `scripts/build-drawio-glyphs.mjs`. */
const X0 = 5;
const X1 = 27;
const CX = 16;
/** `TARGET_STROKE` from the generator, written literally for the reason
 *  `./pid-hand-drawn.tsx` gives: importing a constant from a build script would
 *  drag Node code into a client bundle to save one number. */
const STROKE = 1.3;

/**
 * THE BODY SITS LOW AND THE ACTUATOR STANDS ON TOP OF IT, WHICH IS THE WHOLE
 * BUDGET PROBLEM THIS FILE HAD TO SOLVE. `./pid-hand-drawn.tsx`'s bowtie fills
 * y 9.265..22.735 and leaves 4.3 units above it — enough for a stub, not for an
 * actuator. Splitting the 22-unit live area 10 / 1.5 / 10.5 gives the actuator a
 * box big enough to hold a legible letter and still leaves a body wide enough to
 * read as a valve.
 *
 * WIDTH IS WHAT MAKES A BOWTIE A BOWTIE, so the body keeps the full 22 units and
 * pays in height: 22 x 10.5 is a 2.1:1 body against the family's 1.63:1.
 * Squatter is not ambiguous — nothing else in the set is two opposed triangles —
 * whereas a narrowed body sitting under a box reads as a diamond on a plinth.
 */
const BODY_TOP = 16.5;
const BODY_BOTTOM = 27;
/** The body's flow axis: the waist, where the two triangles meet. */
const BODY_MID = (BODY_TOP + BODY_BOTTOM) / 2;
/** The actuator box: x 11..21, y 5..15. */
const BOX_X = 11;
const BOX_Y = 5;
const BOX_W = 10;
const BOX_H = 10;

const S = { fill: "none", stroke: "currentColor", strokeWidth: STROKE } as const;
/** For the bowtie and the box, whose corners must stay sharp at 24px — the same
 *  reason `./pid-hand-drawn.tsx` keeps a miter set for its racks and slabs. */
const SM = { ...S, strokeLinejoin: "miter" } as const;

/**
 * ISA-5.1 SOLENOID VALVE — the two-triangle body, a stem rising from its waist,
 * and the solenoid actuator drawn as a rectangle marked `S`.
 *
 * THE RECTANGLE-WITH-AN-S IS ISA'S OWN ACTUATOR MARK and is not invented here:
 * ISA-5.1 gives each actuator type its own outline, and the solenoid's is the
 * plain rectangle carrying the letter. The letter is real `<text>` painted in
 * `currentColor` at the site's mono token, for the reason
 * `./electrical-instruments-hand-drawn.tsx` records for its instrument faces —
 * a baked letter cannot be themed, and the stencil compiler emits no text at all.
 *
 * THE STEM RISES OUT OF THE V, WHICH IS WHY IT COSTS NOTHING. A bowtie's top
 * boundary is two edges falling from the live corners to the waist, so the space
 * directly above the waist is already open. The stem runs (16, 21.75) to
 * (16, 15) through that gap — it leaves the body at the only point on the body
 * that is on the vertical centreline, which is what makes it read as growing out
 * of the valve rather than as a line laid across it.
 *
 * WHAT IT CANNOT SAY, STATED PLAINLY. This is a solenoid-ACTUATED valve; it is
 * NOT a fail-position claim. ISA annotates fail-open or fail-closed with a
 * separate arrow or with `FC`/`FO` lettering beside the actuator, and at the
 * 25-39 css px these cells render at, a second marking inside or beside a
 * 10-unit box is below the floor at which lettering carries information. A spec
 * that needs to state a fail position must state it in the node's label, where
 * prose can.
 *
 * THE `S` HAS A FLOOR, LIKE EVERY LETTERED MARK IN THIS COMPONENT SET. At font
 * size 9 the cap is ~6.3 units tall and ~5.4 wide inside a 10 x 10 box, leaving
 * ~1.2 units of clear ground on every side — the proportion `MeterFace` holds
 * for its single capital. Below ~30 rendered px that letter closes up, and what
 * remains is a valve body carrying an actuator on a stem: still an ACTUATED
 * valve, which is the false-to-true correction this mark exists to make, and
 * still not a hand valve. The `S` narrows it from "actuated" to "solenoid".
 */
export function SolenoidValve() {
  return (
    <g role="graphics-symbol img" aria-label="Solenoid-actuated valve">
      <title>Solenoid valve</title>
      <path
        d={`M ${X0} ${BODY_BOTTOM} L ${X0} ${BODY_TOP} L ${X1} ${BODY_BOTTOM} L ${X1} ${BODY_TOP} Z`}
        {...SM}
      />
      <path d={`M ${CX} ${BODY_MID} L ${CX} ${BOX_Y + BOX_H}`} {...S} />
      <rect x={BOX_X} y={BOX_Y} width={BOX_W} height={BOX_H} {...SM} />
      {/* Baseline is the box centre plus half a cap height — 10 + 3.15 — which
          centres the CAP box on the rectangle. Centring the font's own em box
          instead would sit the letter high by its descender space. */}
      <text
        x={CX}
        y={13.15}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={9}
        fill="currentColor"
      >
        S
      </text>
    </g>
  );
}

/**
 * Connection ports for this set, in the same 32-unit cell space and the same
 * shape as `GLYPH_PORTS` in `./drawio-glyphs.tsx`.
 *
 * `N` IS THE SOLENOID, NOT THE TOP OF A PIPE, AND THAT IS THE POINT OF DECLARING
 * IT. The line arriving at `XV-306` from above is a 24 V digital output; it
 * energises the COIL, not the process connection. Landing it on (16, 5) puts the
 * conductor on the top of the actuator box, where a solenoid's leads actually
 * terminate. `W` and `E` are the process line, on the body's own flow axis.
 *
 * The manufacturing drawing is `type: "purdue"`, and neither port pass in
 * `@/components/diagrams` covers that type today — `layout.ts` snaps for `pid`
 * and `ports.ts` for `network` — so on that sheet the conductor still meets the
 * node card's border. These are declared anyway: the table is the symbol's own
 * statement about its terminals, and a mark whose ports get written down only
 * once some renderer happens to read them is how `ELECTRICAL_HAND_DRAWN_PORTS`
 * sat dead for a whole phase.
 */
export const PID_ACTUATED_VALVE_PORTS: Record<
  string,
  ReadonlyArray<{ name: string; x: number; y: number }>
> = {
  SolenoidValve: [
    { name: "W", x: X0, y: BODY_MID },
    { name: "E", x: X1, y: BODY_MID },
    { name: "N", x: CX, y: BOX_Y }
  ]
};
