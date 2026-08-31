/**
 * IEC 60617 ELECTRICAL SYMBOLS THE STENCIL SOURCE CANNOT SUPPLY — DRAWN BY HAND.
 *
 * WHY THIS FILE EXISTS. `./drawio-glyphs.tsx` is generated from draw.io's own
 * stencil XML and is marked DO NOT HAND-EDIT, and successive independent audits
 * of the energy single line have named defects it cannot fix: symbols the
 * stencil source does not publish at all (transformer, battery, earth,
 * disconnector, photovoltaic cell, instrument transformers, AC source), and
 * symbols it publishes wrongly (its `fuse` is `circuit_breaker`'s blade plus a
 * parallelogram, indistinguishable at 24 px; its `voltmeter` is a bare ellipse
 * byte-identical to four other bare ellipses; its `ampermeter` is a compass; its
 * `circuit_breaker` runs horizontally through a drawing that flows down the page
 * and sets its cross short of the contact, at a size that closes into a blob).
 * IEC 60617-08 identifies an instrument BY THE LETTER INSIDE IT, and a generated
 * stencil cannot carry text. So each of those is drawn here instead, exactly as
 * `./pid-hand-drawn.tsx` draws the globe valve for the same class of reason.
 *
 * THE CONTRACT IS `./drawio-glyphs.tsx`'s, EXACTLY. Every export is a `<g>`
 * FRAGMENT — never a standalone `<svg>` — fitted to the same 32-unit cell with
 * the same 22-unit live area (x/y 5..27), stroking `currentColor` with nothing
 * filled, at the same 1.3 cell stroke weight. Coordinates are written in cell
 * space rather than under a `<g transform>` for the reason `./pid-hand-drawn.tsx`
 * records: there is no foreign coordinate system to escape here, and a scale
 * factor is exactly what thinned a datum bubble 4.4x once already.
 *
 * NAME REUSE IS SAFE. `./drawio-glyphs.tsx` also exports `Fuse`, `Ammeter` and
 * `Voltmeter`; the registry that consumes both, `@/components/diagrams/types.ts`,
 * imports each module under a NAMESPACE, so it simply repoints those slugs here
 * and the two coexist. A barrel file `export *`ing from both would not compile —
 * none exists today, and if one is added, these are the names it should keep.
 *
 * TWO STROKE WEIGHTS, ON PURPOSE. Primary geometry is 1.3, the set's weight.
 * Secondary ANNOTATION inside a primary outline — a vector-group mark, a
 * convertor's `+`/`−`/`~` — is 1.1. An annotation a third the diameter of its
 * host, drawn at the host's weight, closes into a blob at 32 px; electrical
 * drafting draws connection marks lighter than the winding for the same reason.
 */

/**
 * THE IEC 60617-08 INSTRUMENT FAMILY MOVED TO `./electrical-instruments-hand-drawn.tsx`
 * on 2026-08-28, when this file reached 585 lines against the 500-line ceiling.
 * That module imports the cell constants below and this one imports NOTHING
 * back. The first attempt re-exported the three instruments from here to keep
 * the namespace's shape, and the cycle took the whole gallery route to HTTP 500
 * with `Cannot access 'X0' before initialization` — the child's module-scope
 * port table evaluates while these `const`s are still in their dead zone. So
 * `diagrams/types.ts` and `diagrams/ports.ts` import both modules by name.
 */

/** The 22-unit live area, matching `LIVE`/`CELL` in `scripts/build-drawio-glyphs.mjs`.
 *  EXPORTED because the instrument half is drawn in the same cell, and a second
 *  copy of the cell is how two halves of one set drift apart. */
export const X0 = 5;
export const X1 = 27;
export const Y0 = 5;
export const Y1 = 27;
export const CX = 16;
export const CY = 16;
/** `TARGET_STROKE` from the generator — the weight every glyph in this set draws at. */
const STROKE = 1.3;
/** Annotation inside an outline. See the header note on why this is not 1.3. */
const MARK_STROKE = 1.1;

/**
 * The two paint sets, spread onto every shape below. NOT A TIDY-UP: repeating
 * `fill="none" stroke="currentColor"` thirty times invites one of the thirty to
 * drift — a filled glyph, or one that stops inheriting the caller's ink and goes
 * black in dark theme. Stated once, it cannot.
 */
export const LINE = { fill: "none", stroke: "currentColor", strokeWidth: STROKE } as const;
const MARK = { fill: "none", stroke: "currentColor", strokeWidth: MARK_STROKE } as const;

/**
 * IEC 60617-06-09 two-winding transformer — TWO INTERLINKED CIRCLES, one winding
 * each, overlapping so the magnetic coupling is drawn rather than annotated. A
 * merely TOUCHING pair is also published but degrades into a figure-of-eight at
 * 32 px. The distinction from `TerminalThreePhase` — three SEPARATE circles in a
 * row, which is what `T-01` used to resolve to — is the point of this component.
 *
 * DRAWN VERTICALLY, primary above secondary, because a single-line diagram runs
 * down the page from incomer to load and this glyph sits inline in that run.
 *
 * CENTRE SEPARATION IS 1.5 r, WHICH IS THE WHOLE SYMBOL. The draft before this
 * one separated the centres by 1.0 r (r = 6.25, centres 12.875/19.125) and an
 * independent audit read it at true size as ONE circle with an ellipse inside —
 * a `θ`, not a pair. The arithmetic says why: at 1.0 r the lens is 10.8 units
 * wide and 6.25 tall inside a glyph only 12.5 wide, so the lens IS the mark and
 * the two outlines are its frame. At IEC's conventional 1.5 r the lens narrows
 * to 7.1 x 2.4 and the circles are what the eye lands on. Separation 9.4 with
 * r = 5.9 keeps the pair inside the 22-unit live area (21.2 of it), leaving
 * 0.4-unit leads — which is enough, because a lead is collinear with the
 * conductor the router already draws into the port and adds no mark of its own.
 */
export function Transformer() {
  return (
    <g>
      <circle cx={CX} cy={11.3} r={5.9} {...LINE} />
      <circle cx={CX} cy={20.7} r={5.9} {...LINE} />
      <path d={`M ${CX} ${Y0} L ${CX} 5.4 M ${CX} 26.6 L ${CX} ${Y1}`} {...LINE} />
    </g>
  );
}

/**
 * The same transformer carrying its IEC 60617-06 VECTOR-GROUP MARKS and, since
 * 2026-08-28, ITS NEUTRAL BUSHING: a delta in the primary winding, a wye in the
 * secondary, and the star point of that wye brought out to a fourth terminal.
 * That is the `Dyn` of a `Dyn11` distribution transformer, which is what an
 * 11 kV / 400 V step-down is.
 *
 * THE NEUTRAL IS THE DEFECT THIS VARIANT NOW EXISTS TO FIX. On the energy single
 * line the `earth → tx` N–PE bond and the 400 V phase feeder BOTH resolved to
 * `LV`: they left one terminal at one coordinate and ran collinearly for 13.00
 * units, so the star-point bond was drawn exactly as a bolted phase-to-earth
 * fault and only the caption said otherwise. A star point that is not drawn
 * cannot be connected to, so `NEUTRAL` is declared below AND INKED HERE — a
 * port with no ink is a terminal that does not exist. The port table records
 * why it is not called `N`; the short answer is that `N` already means north.
 *
 * THE CIRCLES ARE `Transformer`'s NOW, r = 5.9 AT 1.59 r SEPARATION, BECAUSE THE
 * OLD GEOMETRY HAD THE TRADE BACKWARDS. This variant carried r = 5.75 at 6.5
 * centre separation (1.13 r), argued as buying cap for the marks by cutting the
 * overlap. Cap height is 2r − overlap and overlap is 2r − separation, so THE CAP
 * IS THE SEPARATION, exactly: 9.4 units here where the tight pair bought 6.5.
 * That pair also failed the measurement `Transformer`'s note records — a
 * 9.5 x 5.0 lens inside a glyph 11.5 wide is the `θ` an audit read at true size.
 *
 * WHAT THE MARKS GAIN IS CLEARANCE, NOT MUCH SIZE, AND THAT IS THE HONEST
 * RESULT. The cap is 11.5 px at the 39.13 px this cell renders at, and holds
 * ONE mark with daylight at both ends. Two strokes stop reading as two about
 * 1.2 units apart in theory and about 2.0 in fact, because 1.2 units is 1.47 px
 * — the strokes' own width, nothing left over. So the delta is circumradius
 * 3.45 (side 5.5 → 6.0) with 2.1 units above and below, and the wye's arms
 * 3.2 → 3.9 with 2.0 under the stem. A draft at circumradius 4.2 sat 1.5 units
 * off the lens and the render merged its base into it: a triangle on a bar.
 * IEC 60617-03-01's junction dot went the same way — at r = 1.15 it was 2.81 px
 * of solid ink in an 11 px mark and the wye read as a filled arrowhead — and a
 * dot separates a junction from a CROSSING, of which there is none here.
 *
 * THE NEUTRAL LEAVES ON THE 60° BISECTOR, WHICH IS THE MOST DAYLIGHT THERE IS.
 * A wye's arms sit 120° apart, so a fourth line out of the star point can be at
 * most 60° off its two neighbours; anything else crowds an arm. With the stem
 * pointing down into the LV phase lead that bisector runs 30° below horizontal,
 * and the run to the live area's corner is 12.6 units — an order of magnitude
 * longer than the 0.4-unit winding stubs, crossing the outline perpendicularly
 * because a ray from the centre must. It is stroked at the PRIMARY weight: a
 * conductor leaving the symbol, not a mark inside it.
 */
export function TransformerDyn() {
  return (
    <g>
      <circle cx={CX} cy={11.3} r={5.9} {...LINE} />
      <circle cx={CX} cy={20.7} r={5.9} {...LINE} />
      <path d={`M ${CX} ${Y0} L ${CX} 5.4 M ${CX} 26.6 L ${CX} ${Y1}`} {...LINE} />
      {/* Delta — the HV winding, mesh-connected. Circumradius 3.45 about y = 10.95. */}
      <path d="M 16 7.5 L 19 12.7 L 13 12.7 Z" {...MARK} strokeLinejoin="miter" />
      {/* Wye (arms 3.9, stem at the phase lead), then the neutral out of it. */}
      <path d="M 16 20.7 L 16 24.6 M 16 20.7 L 19.38 18.75 M 16 20.7 L 12.62 18.75" {...MARK} />
      <path d={`M ${CX} 20.7 L 26.91 ${Y1}`} {...LINE} />
    </g>
  );
}

/**
 * IEC 60617-06-15 battery — the symbol the audit found drawn as a floppy disk,
 * because `BAT-01` resolved to CSET's filled UPS chassis portrait.
 *
 * ALTERNATING LONG AND SHORT PARALLEL PLATES: long is the positive electrode,
 * short the negative, and that alternation IS the symbol — which is why this is
 * stroked line work rather than a filled chassis. TWO CELLS (four plates), not
 * one: a single long/short pair is IEC's single CELL, and a battery is a series
 * string, so two pairs is the shortest drawing that says so.
 *
 * THE `+` AT THE LEFT TERMINAL makes the glyph unambiguous in isolation. Plate
 * lengths are 13 and 7 — a 1.9x ratio, so the alternation survives 24 px instead
 * of collapsing into four equal ticks. The `+` is 4.0 units across: at 2.8 it
 * held at 32 px and was a speck at 24, and a polarity mark that only appears at
 * large sizes is not a polarity mark.
 *
 * THE MARK SITS ABOVE THE PLATES, NOT BESIDE THEM, and that is arithmetic, not
 * taste. Level with them, the 5.5 units between the live edge and the first
 * plate at x = 10.5 hold a 4.0-unit mark with 0.3 units of daylight once the
 * 1.2 units two stroke half-widths need come off — which an audit at true size
 * read as a hook growing out of the plate. Lifted to y = 7.6 the nearest hazard
 * is only the plate's top corner, 2.42 units off on the diagonal: 1.22 units
 * clear, four times what any in-line placement can buy.
 */
export function Battery() {
  return (
    <g>
      <path d={`M ${X0} ${CY} L 10.5 ${CY} M 22 ${CY} L ${X1} ${CY}`} {...LINE} />
      {/* Cell 1: long (+) then short (−). Cell 2 repeats it — a two-cell string. */}
      <path d="M 10.5 9.5 L 10.5 22.5 M 14 12.5 L 14 19.5 M 18.5 9.5 L 18.5 22.5 M 22 12.5 L 22 19.5" {...LINE} />
      {/* Polarity mark on the positive terminal. */}
      <path d={`M ${X0} 7.6 L 9 7.6 M 7 5.6 L 7 9.6`} {...MARK} />
    </g>
  );
}

/** The instrument circle the meters and the AC source share. 9.5 leaves 1.5 units
 *  at each end of the live area for the leads that put the mark IN a conductor
 *  run rather than floating beside one. Exported for the instrument half of the
 *  set; see the split note at the top of this file. */
export const METER_R = 9.5;

/**
 * IEC 60617-07-21 fuse — a rectangle bisected lengthwise by the conductor it
 * protects. That is the entire symbol, and its job is to be unmistakable from a
 * breaker: draw.io's own `fuse` is `circuit_breaker`'s switch blade plus a small
 * parallelogram, two marks that at 24 px differ by a few pixels of a shape most
 * readers never resolve. A fuse and a breaker do different things to a fault and
 * are operated by different people.
 *
 * THE PROPORTIONS ARE SET BY THE 24 px CASE, not by the standard's drawing sheet:
 * a 13 x 8.4 body leaves ~2.0 px of clear ground either side of the conductor.
 * A slimmer, more textbook 2:1 body closes that to ~1.2 px and the rectangle
 * starts reading as a solid bar, which marks something else entirely.
 *
 * DRAWN VERTICALLY SINCE 2026-08-28, and that is the same correction this file's
 * header makes against draw.io's `circuit_breaker`: a mark drawn across a
 * drawing that flows DOWN the page has its two terminals on the wrong axis. It
 * showed up the moment conductors started landing on declared ports instead of
 * on card borders — FU-01's incoming and outgoing DC strings BOTH resolved to
 * the `W` terminal, because neither box side the router used has a port on a
 * horizontal glyph and the tie fell to the first entry. Two conductors on one
 * terminal draws a link across the fuse, which is a fuse that protects nothing.
 */
export function Fuse() {
  return (
    <g>
      <path d={`M ${CX} ${Y0} L ${CX} ${Y1}`} {...LINE} />
      <rect x={11.8} y={9.5} width={8.4} height={13} {...LINE} />
    </g>
  );
}

/**
 * IEC 60617-07-13 disconnector (isolator) — an open switch blade with a SHORT
 * BAR ACROSS THE FIXED CONTACT.
 *
 * THE BAR IS THE SYMBOL'S ENTIRE MEANING and the reason this is not
 * `TwoPositionSwitch`. A disconnector establishes a verified isolating distance
 * and may only be operated off-load; a switch or breaker may be operated on
 * load. IEC marks that difference with the cross-bar and nothing else, so a
 * blade drawn without it states the wrong operating rule to whoever has to work
 * on the feeder.
 *
 * DRAWN OPEN, blade swung ~40° off the conductor: a disconnector is shown in the
 * safe state, and a closed blade is a straight line indistinguishable from
 * cable. Vertical, matching `Transformer`, so a bay stacks without rotation.
 */
export function Disconnector() {
  return (
    <g>
      <path d={`M ${CX} ${Y1} L ${CX} 21`} {...LINE} />
      <path d="M 16 21 L 21.4 14.57" {...LINE} strokeLinecap="round" />
      <path d={`M ${CX} ${Y0} L ${CX} 12.6`} {...LINE} />
      <path d="M 12.9 12.6 L 19.1 12.6" {...LINE} />
    </g>
  );
}

/**
 * IEC 60617-07-02 circuit breaker — the same switch blade as `Disconnector`,
 * with an `×` CENTRED ON THE FIXED CONTACT instead of a bar across it.
 *
 * WHAT IT REPLACES. `CB-01`..`CB-04` resolved to draw.io's generated
 * `circuit_breaker`, drawn HORIZONTALLY in a drawing that flows down the page,
 * with a cross so small that an audit at the real 27 px render size read it as
 * an arrowhead — and placed short of the contact, so the blade ended in mid-air
 * and the cross floated on the outgoing conductor. "A switch with an arrow" is
 * a fair reading of that, and it is the wrong device four times over.
 *
 * THE CROSS IS SIZED BY THE BLADE, NOT BY TASTE. Its arms have to clear the
 * open blade: at `Disconnector`'s 8.4-unit swing the cross can only span 4.1
 * units before its lower-right tip closes on the blade, and 4.1 units is 3.5 px
 * — the arrowhead again. Lengthening the blade to 10.5 pushes the blade line
 * away faster than it moves the contact, and buys a 5.6-unit cross with 1.51
 * units still clear of the blade. Angle stays at `Disconnector`'s 40°, so the
 * two switch marks are read as one family and differ only where IEC says they
 * differ.
 *
 * THE CONTACT IS WHERE THE CLOSED BLADE WOULD LAND — pivot at y = 22.5, blade
 * 10.5 long, contact at y = 12.0 — so the `×` marks a point the mechanism can
 * actually reach. A cross drawn anywhere else is decoration on a conductor.
 */
export function CircuitBreaker() {
  return (
    <g>
      <path d={`M ${CX} ${Y0} L ${CX} 12`} {...LINE} />
      <path d="M 13.2 9.2 L 18.8 14.8 M 13.2 14.8 L 18.8 9.2" {...LINE} strokeLinecap="round" />
      <path d={`M ${CX} ${Y1} L ${CX} 22.5`} {...LINE} />
      <path d="M 16 22.5 L 22.75 14.46" {...LINE} strokeLinecap="round" />
    </g>
  );
}

/**
 * IEC 60617-02-15 earth — three bars of decreasing length under a vertical
 * conductor. The general earth reference: a transformer star point, a surge
 * arrester's foot, an equipotential bond.
 *
 * THE TAPER IS 15 / 10 / 5 UNITS, bars 3.8 apart, leaving 2.5 units of clear
 * ground at 1.3 weight. Three EQUAL bars is protective earth in some house
 * styles and a chassis mark in others; the taper is what keeps this unambiguous.
 */
export function EarthReference() {
  return (
    <g>
      <path d={`M ${CX} ${Y0} L ${CX} 17.5`} {...LINE} />
      <path d="M 8.5 17.5 L 23.5 17.5 M 11 21.3 L 21 21.3 M 13.5 25.1 L 18.5 25.1" {...LINE} />
    </g>
  );
}

/**
 * IEC 60617-06-14 static convertor, in its DC-to-AC (inverter) sense: a SQUARE
 * split by a diagonal, the input quantity marked in one half and the output in
 * the other.
 *
 * WHY A SQUARE AND NOT THE DIAMOND IT REPLACES. The audit's finding on the
 * generated `BridgeRectifier` diamond was not that its markings were wrong but
 * that they were INVISIBLE — "it reads as an empty diamond". A diamond in the
 * 22-unit live area gives each half a triangle ~11 units on a side; the square
 * IEC actually publishes for a convertor gives each half a 20-unit hypotenuse,
 * four times the area, which buys the markings their legibility back.
 *
 * THE DIAGONAL RUNS NW-TO-SE, SO DC IS THE LOWER HALF AND AC THE UPPER — a
 * correction made 2026-08-28. The first version cut SW-to-NE and put `+ −` at
 * the top; the conductors say the opposite, since the PV string and the battery
 * both enter INV-01/PCS-01 from BELOW and 400 V AC leaves upward into the
 * busbar. A convertor whose marked halves contradict the conductors drawn into
 * them is worse than an unmarked box, because it invites the reader to trust it.
 * Mirroring in y is the whole fix; a `flip` prop would have moved the decision
 * into the spec, which does not know how the router ran the conductors either.
 * Ports follow: `DC` on the bottom edge, `AC` on the top. Swap them and the same
 * drawing is a rectifier — which is why they are not named `N` and `S`.
 *
 * THE SQUARE FILLS THE WHOLE 22-UNIT LIVE AREA and has no external leads. The
 * first draft's 20-unit square with 1-unit leads was already softening its
 * `+ −` at 32 px — the diamond's failure two sizes later rather than fixed.
 * Those two units on the body grow the markings 30%, and a one-unit lead was
 * doing nothing a port cannot do.
 *
 * MARKINGS ARE PLACED AGAINST THE DIAGONAL, NOT THE SQUARE, because each half
 * narrows towards the cut: `+ −` sit at y = 23 where the diagonal is still out
 * at x = 23, and the wave stops at x = 25.5. Every mark clears the cut by more
 * than the 1.2 units the two stroke half-widths need; at y = 22 they touch.
 */
export function InverterBridge() {
  return (
    <g>
      <rect x={X0} y={Y0} width={22} height={22} {...LINE} />
      <path d={`M ${X0} ${Y0} L ${X1} ${Y1}`} {...LINE} />
      {/* DC half — LOWER LEFT, the side the string and the battery come in on. */}
      <path d="M 7.9 23 L 13.1 23 M 10.5 20.4 L 10.5 25.6 M 15.4 23 L 20.6 23" {...MARK} />
      {/* AC half — UPPER RIGHT, the side that leaves for the busbar. */}
      <path
        d="M 13.5 8.5 C 15.6 13.4 18 13.4 19.75 10 C 21.5 6.6 23.6 6.6 25.5 11.3"
        {...MARK}
        strokeLinecap="round"
      />
    </g>
  );
}

/**
 * IEC 60617-06-01 AC SOURCE — a circle carrying one cycle of `~`.
 *
 * IT REPLACES AN IT CLOUD, and that is the defect it exists for. `PCC — Utility
 * grid, 11 kV` resolved to `cset/cloud`, the network-architecture mark for
 * "somewhere off this drawing" — right in a Purdue chart, wrong at the head of a
 * single line, where the reader's whole question is what SUPPLIES the site. A
 * cloud answers "we did not model it"; a source answers "an 11 kV infeed".
 *
 * SAME `METER_R` CIRCLE AS THE INSTRUMENT FACES, deliberately: IEC draws sources
 * and indicating instruments alike as a circle and separates them by content, so
 * sharing the diameter is the standard's consistency rather than a copied
 * constant. The sine is 12.6 units — the widest full cycle whose ends stay
 * inside the 19-unit outline with clear ground at 1.1 weight.
 */
export function AcSource() {
  return (
    <g>
      <circle cx={CX} cy={CY} r={METER_R} {...LINE} />
      <path d={`M ${CX} ${Y0} L ${CX} ${CY - METER_R} M ${CX} ${CY + METER_R} L ${CX} ${Y1}`} {...LINE} />
      <path
        d="M 9.7 18.2 C 11.8 12.4 14.5 12.4 16 16 C 17.5 19.6 20.2 19.6 22.3 13.8"
        {...MARK}
        strokeLinecap="round"
      />
    </g>
  );
}

/**
 * IEC 60617-06-19 PHOTOVOLTAIC CELL — a semiconductor diode with two arrows of
 * incident radiation striking it.
 *
 * THE DRAWING CLAIMED A PV PLANT AND NEVER DREW THE GENERATOR. Until this
 * existed the source-most node of the PV branch was `FU-01 — string combiner`,
 * so the single line asserted that twelve strings of nothing feed a 1.5 MVA
 * inverter. The two incident arrows ARE the symbol: without them this is a plain
 * diode, and a diode in a PV feeder is a BLOCKING diode — a different device.
 *
 * THE TRIANGLE POINTS UP INTO ITS CATHODE BAR, so conventional current leaves by
 * the TOP terminal: the array's positive lead, and the end the combiner hangs
 * above. Reversed, the glyph would say the array sinks current from the string.
 *
 * ONE CELL, NOT A DRAWN ARRAY, AND THAT IS AN HONEST LIMIT. IEC's array is the
 * cell mark repeated or boxed; at 32 px a second cell halves both, and the
 * incident arrows — the identifying feature — go first. Plurality is carried by
 * the tag and by `12 strings` on the conductor, where a count belongs anyway.
 *
 * ASYMMETRIC ON PURPOSE: arrows at x 5.2..9.2, diode at 11.4..20.6. Centring
 * would cost either the diode's size or an arrow, and the conductor has to stay
 * on `CX` to run straight through the cell.
 *
 * THE TIPS STOP AT x = 9.2, NOT 10.2, AND THAT IS THE MARGIN NOT THE STYLE. At
 * 10.2 the lower arrow's tip stood 1.84 units from the triangle's left vertex
 * against the 1.2 units two stroke half-widths occupy — 0.64 units of daylight,
 * which an audit at the real 27 px render size read as one smudge. Pulled back
 * to 9.2 and dropped 0.6, that tip clears the vertex by 1.64 units and the
 * upper tip clears the cathode bar's left end by 1.41. The tails stay at
 * x = 5.2 rather than following the tips out to 4.2: the 22-unit live area is
 * the contract every other glyph in this set is drawn to, and the arrows lose
 * one unit of length rather than the set losing its cell.
 */
export function PhotovoltaicArray() {
  return (
    <g>
      <path d={`M ${CX} ${Y0} L ${CX} 12.6 M ${CX} 20.4 L ${CX} ${Y1}`} {...LINE} />
      <path d="M 11.4 20.4 L 20.6 20.4 L 16 12.6 Z" {...LINE} strokeLinejoin="miter" />
      <path d="M 11.4 12.6 L 20.6 12.6" {...LINE} />
      {/* Incident radiation: two parallel arrows, barbed at the cell end. */}
      <path
        d="M 5.2 10 L 9.2 14 M 9.2 14 L 8.42 11.1 M 9.2 14 L 6.3 13.22
           M 5.2 14.6 L 9.2 18.6 M 9.2 18.6 L 8.42 15.7 M 9.2 18.6 L 6.3 17.82"
        {...MARK}
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
 * PORTS ARE NAMED BY WHAT THE TERMINAL IS, not by compass bearing, wherever the
 * terminal has an electrical identity — `HV`/`LV`, `+`/`−`, `DC`/`AC`. A router
 * that attaches an 11 kV incomer to a transformer's `LV` port has drawn a real
 * error, and a port map offering only `N` and `S` cannot express that.
 *
 * THIS TABLE WAS DEAD CODE UNTIL 2026-08-28 AND THAT WAS THE HEADLINE DEFECT.
 * `@/components/diagrams/ports.ts` indexed the GENERATED module only, so every
 * name here resolved to nothing and every conductor on the energy drawing
 * terminated on a node card's border rather than on a terminal this file draws.
 * It is now indexed BY COMPONENT IDENTITY alongside `GLYPH_PORTS`, because
 * `drawio-glyphs.tsx` exports a `Fuse` too and a name-keyed merge would hand
 * one set's ports to the other set's mark.
 */
export const ELECTRICAL_HAND_DRAWN_PORTS: Record<string, ReadonlyArray<{ name: string; x: number; y: number }>> = {
  Transformer: [{ name: "HV", x: CX, y: Y0 }, { name: "LV", x: CX, y: Y1 }],
  // THE STAR POINT, A THIRD TERMINAL RATHER THAN A SECOND NAME FOR `LV`. `LV`
  // is the 400 V PHASE terminal the feeder leaves from; this is where the
  // neutral conductor `TransformerDyn` draws out of the wye reaches the live
  // area, at the foot of its 30° run. An earth bond landing on `LV` is a
  // phase-to-earth fault, which is what the energy single line drew until this
  // port existed. It sits at `LV`'s y, so `portFor`'s outermost-on-that-side
  // rule still hands a southbound conductor `LV` — the FIRST port at that depth
  // — and only a named `toPort` reaches here.
  // IT IS *NOT* CALLED `N`, AND THAT IS A MEASURED CORRECTION. `portFor` in
  // `@/components/diagrams/ports.ts` returns any port whose lowercased name
  // equals the approach side BEFORE measuring anything, and `"N"` lowercases to
  // north. Named `N`, this terminal captured every conductor arriving at the top
  // of the cell: the energy drawing's 11 kV incomer moved off `HV` at
  // (582.33, 355.00) onto the LV neutral at (593.24, 377.00) — a step-down
  // transformer fed through its own star point. `N` and `S` are COMPASS names
  // here, as `Fuse`, `Disconnector`, `CircuitBreaker` and `AcSource` use them,
  // so an electrical `N` cannot coexist with them.
  TransformerDyn: [
    { name: "HV", x: CX, y: Y0 },
    { name: "LV", x: CX, y: Y1 },
    { name: "NEUTRAL", x: 26.91, y: Y1 }
  ],
  Battery: [{ name: "+", x: X0, y: CY }, { name: "-", x: X1, y: CY }],
  Fuse: [{ name: "N", x: CX, y: Y0 }, { name: "S", x: CX, y: Y1 }],
  Disconnector: [{ name: "N", x: CX, y: Y0 }, { name: "S", x: CX, y: Y1 }],
  CircuitBreaker: [{ name: "N", x: CX, y: Y0 }, { name: "S", x: CX, y: Y1 }],
  EarthReference: [{ name: "N", x: CX, y: Y0 }],
  // DC on the bottom edge and AC on the top, matching the mirrored halves. See
  // `InverterBridge`: the string and the battery come in from below.
  InverterBridge: [{ name: "DC", x: 12, y: Y1 }, { name: "AC", x: 20, y: Y0 }],
  AcSource: [{ name: "N", x: CX, y: Y0 }, { name: "S", x: CX, y: Y1 }],
  PhotovoltaicArray: [{ name: "+", x: CX, y: Y0 }, { name: "-", x: CX, y: Y1 }]
};
