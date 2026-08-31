import { CX, CY, LINE, METER_R, X0, X1, Y0, Y1 } from "./electrical-hand-drawn";

/**
 * THE MEASUREMENT CHAIN — the instrument transformer that makes a quantity safe
 * to measure, and the lettered mark that indicates it. Split out of
 * `./electrical-hand-drawn.tsx` on 2026-08-28, when that file reached 585 lines
 * against this project's 500-line ceiling.
 *
 * THE SEAM IS THE ONE THE DRAWING ALREADY DRAWS, not an arbitrary line count.
 * `CT-01 → PA-01` and `VT-01 → PV-01` are two halves of one apparatus each: a
 * current transformer exists so an ammeter can exist, and an SLD that omits its
 * instrument transformers omits the only plant in the measurement chain. So the
 * chain lives together. What stays behind in `./electrical-hand-drawn.tsx` is
 * the POWER PATH — source, switching, protection, conversion, storage, earth.
 *
 * IT IS ALSO THE ONLY PART OF THE SET THAT CARRIES `<text>`, because IEC 60617-08
 * identifies an instrument by the letter inside it. That is what will grow here
 * when a wattmeter or a distance relay is added.
 *
 * THE CELL CONSTANTS ARE IMPORTED FROM THE PARENT MODULE AND NOTHING TRAVELS
 * BACK. The first attempt re-exported these components from there so the
 * consuming namespace would not change shape, and the cycle took the gallery
 * route to HTTP 500 with `Cannot access 'X0' before initialization`. So
 * `@/components/diagrams/types.ts` and `@/components/diagrams/ports.ts` import
 * both modules by name — one extra line each, and acyclic by construction.
 */

/**
 * The IEC 60617-08-02 measuring-instrument face: a circle with the measured
 * quantity's letter at its centre, as REAL `<text>`.
 *
 * THE LETTER IS THE SYMBOL. IEC draws every indicating instrument as the same
 * circle and separates them solely by what is written inside — A, V, W, Hz, var.
 * The stencil compiler deliberately emits no `<text>`, because a baked letter
 * cannot be themed, translated or re-tagged, so the letter is drawn here in
 * `currentColor` at the site's mono token and themes with everything around it.
 *
 * ONE LETTER FITS THE 32-UNIT CELL WHERE AN ISA TAG DOES NOT.
 * `./instrument-bubble.tsx` needs a 44-unit cell and a 44 px floor because it
 * sets a 3-to-5 character tag OVER a loop number. This sets one capital: at font
 * size 13 the cap is ~9.1 units tall and ~7.8 wide inside a 19-unit circle, so
 * 5.7 units of clear diameter remain. Baseline 20.6 centres the cap box on 16.05.
 */
function MeterFace({ letter, label }: { letter: string; label: string }) {
  return (
    <g role="graphics-symbol img" aria-label={label}>
      <title>{label}</title>
      <circle cx={CX} cy={CY} r={METER_R} {...LINE} />
      <path d={`M ${X0} ${CY} L ${CX - METER_R} ${CY} M ${CX + METER_R} ${CY} L ${X1} ${CY}`} {...LINE} />
      <text x={CX} y={20.6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="currentColor">
        {letter}
      </text>
    </g>
  );
}

/** IEC 60617-08-02 ammeter — the instrument circle lettered `A`. Replaces the
 *  generated `Ammeter`, whose needle and arrowhead read as a compass and whose
 *  circle carries no letter at all. */
export function Ammeter() {
  return <MeterFace letter="A" label="Ammeter" />;
}

/** IEC 60617-08-02 voltmeter — the instrument circle lettered `V`. Replaces the
 *  generated `Voltmeter`, a bare ellipse identical to four other bare ellipses
 *  in the same module. */
export function Voltmeter() {
  return <MeterFace letter="V" label="Voltmeter" />;
}

/**
 * IEC MEASURING RELAY — a rectangle carrying the characteristic quantity it
 * operates on, here `I>`: overcurrent, ANSI 50/51.
 *
 * WHAT IT REPLACES. `IED-01` resolved to `cset/ied`, a rounded square containing
 * a plain circle, which the audit read as "a generic transducer or a camera
 * icon". CSET's set is equipment PORTRAITS — right in a Purdue chart, wrong in a
 * protection scheme, where the reader is not asking what the relay looks like
 * but what it trips on. IEC answers that with the marking and nothing else,
 * which is why the identification is the glyph rather than a label beside it.
 * The marking is real `<text>` for the reason `MeterFace` records, and because
 * it has to change with the protection function.
 *
 * 11, NOT 13. `MeterFace` sets ONE capital in a 19-unit circle at 13; `I>` is
 * two glyphs in a 19-unit rectangle, so 13 advances ~15.6 units and leaves 1.7
 * either side — a cramped box rather than an inscribed marking. At 11 the pair
 * advances ~13.2 and keeps 2.9 units of clear ground, the proportion `MeterFace`
 * holds. Below ~28 rendered px the `>` closes up; at that size the tag carries
 * the identification and this is a plain relay box, which is still not a camera.
 */
export function MeasuringRelay() {
  return (
    <g role="graphics-symbol img" aria-label="Overcurrent measuring relay, I>">
      <title>Overcurrent measuring relay</title>
      <rect x={6.5} y={9} width={19} height={14} {...LINE} />
      <path d={`M ${X0} ${CY} L 6.5 ${CY} M 25.5 ${CY} L ${X1} ${CY}`} {...LINE} />
      <text x={CX} y={19.9} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="currentColor">
        {"I>"}
      </text>
    </g>
  );
}

/**
 * IEC CURRENT TRANSFORMER — the primary conductor running straight through,
 * unbroken, with the secondary winding drawn as a circle BESIDE it and a
 * two-wire secondary leaving the winding for the burden.
 *
 * WHY THE DRAWING NEEDED ONE. `BB-01` wired directly into `PA-01`, so the single
 * line said a panel ammeter connects across a 400 V busbar. It does not: it reads
 * 0–5 A out of a current transformer, and the CT is what makes the connection
 * safe to draw at all. An SLD that omits its instrument transformers omits the
 * only apparatus in the measurement chain.
 *
 * BESIDE, NOT CONCENTRIC — the whole distinction from a meter face. `Ammeter`
 * is a circle CENTRED on the run with the conductor stopping at its edge; this
 * is a circle beside an unbroken run. CT-01 sits one rank from PA-01 here, so
 * the two are read together and the difference has to survive at 32 px, which
 * circle-with-a-letter versus circle-without-one would not.
 *
 * THE WINDING IS CLEAR OF THE PRIMARY, NOT TANGENT TO IT, AND TWO DRAFTS GOT
 * THAT WRONG. IEC draws the winding touching the primary; at the real 27 px
 * render size two 1.3-unit strokes that touch ARE one stroke, and the glyph
 * read as a lowercase `d`. The draft before this one moved r from 4.6 to 3.9
 * and claimed the fix, but left `cx` at 12.1 — still exactly tangent, the same
 * `d`, smaller. What actually separates them is `cx`: at 10.4 the winding's
 * edge stands 2.7 units off the primary's centreline, 1.4 units clear of its
 * stroke, and the two marks resolve as a winding beside a conductor.
 *
 * THE SECONDARY IS TWO LEADS BECAUSE A CT SECONDARY IS S1 AND S2. One lead with
 * no return draws an open-circuit CT — the one condition that destroys the unit
 * and the reason CT test blocks exist. The pair leaves the winding at y = 14 and
 * 18 and the port map names them `S1`/`S2` to match.
 *
 * r IS 2.9 SO THE LEADS HAVE SOMETHING TO PROJECT FROM. Only 11 units separate
 * the live edge from the primary, and they have to hold a winding AND two leads
 * long enough to read as wire. At r = 3.5 the circle's own left bulge reached
 * x = 6.5 and the leads cleared its silhouette by 1.5 units, which at true size
 * is one pixel of wire — a 22x nearest-neighbour strip read it as a thickened
 * arc, not as a pair. Trading 1.2 units of diameter buys 2.5 units of visible
 * lead on each, 4 units apart, and a 5.8-unit circle still reads as a loop.
 */
export function CurrentTransformer() {
  return (
    <g>
      <path d={`M ${CX} ${Y0} L ${CX} ${Y1}`} {...LINE} />
      <circle cx={10.4} cy={CY} r={2.9} {...LINE} />
      <path d={`M 8.3 14 L ${X0} 14 M 8.3 18 L ${X0} 18`} {...LINE} />
    </g>
  );
}

/**
 * IEC VOLTAGE TRANSFORMER — the same two interlinked windings as `Transformer`,
 * turned through 90° and connected as a SHUNT TAP: primary lead down from the
 * bar at the top, secondary lead out to the right.
 *
 * IEC PUBLISHES NO SEPARATE VT MARK — a voltage transformer IS a two-winding
 * transformer, and what identifies it is how it is connected, so the connection
 * is what this draws. `Transformer` runs vertically and in series, incomer above
 * and load below; this hangs off a conductor and delivers sideways, which cannot
 * be read as a power transformer even with the tags covered. Reusing the
 * geometry is deliberate — two devices that ARE the same device should not be
 * drawn at two circle sizes.
 *
 * NOW 5.9 / 9.4, MATCHING `Transformer`, ON A FRESH TRUE-SIZE READ. It was held
 * at r = 6.25 / 1.0 r because the audit that rejected the vertical pair as a `θ`
 * read THIS one correctly — but its stated reason was that this glyph is
 * HORIZONTAL and hangs off a shunt lead, which is about how the mark is
 * CONNECTED, not about whether two circles resolve. The arithmetic is the same
 * failure rotated 90°: at 1.0 r the lens is 6.25 wide and 10.82 TALL inside a
 * mark only 12.5 tall — 87% of the glyph's height, 9.1 px of a 10.5 px mark at
 * the energy drawing's real 27 px cell. At 1.5 r it narrows to 2.4 x 7.13, the
 * transpose of `Transformer`'s numbers, and the circles are what the eye lands
 * on. r = 5.9 with centres 11.3 / 20.7 spans 21.2 of the 22-unit live area,
 * leaving the same 0.4-unit leads. The HV port follows the primary winding,
 * 12.875 → 11.3; LV is unchanged, the secondary still leaving east.
 */
export function VoltageTransformer() {
  return (
    <g>
      <circle cx={11.3} cy={CY} r={5.9} {...LINE} />
      <circle cx={20.7} cy={CY} r={5.9} {...LINE} />
      <path d={`M 11.3 ${Y0} L 11.3 10.1 M 26.6 ${CY} L ${X1} ${CY}`} {...LINE} />
    </g>
  );
}

/**
 * Connection ports for this family, in the same shape as `GLYPH_PORTS`. Folded
 * into `ELECTRICAL_HAND_DRAWN_PORTS` by the parent module, so a router still
 * asks ONE table and never has to know which half of the split a mark came from.
 *
 * THE THREE LETTERED MARKS ARE IN-LINE DEVICES with a `W` and an `E` terminal,
 * because an instrument face is drawn IN the conductor it measures — the leads
 * either side of the circle are part of the symbol, not decoration on it.
 */
export const ELECTRICAL_INSTRUMENT_PORTS: Record<
  string,
  ReadonlyArray<{ name: string; x: number; y: number }>
> = {
  Ammeter: [{ name: "W", x: X0, y: CY }, { name: "E", x: X1, y: CY }],
  Voltmeter: [{ name: "W", x: X0, y: CY }, { name: "E", x: X1, y: CY }],
  MeasuringRelay: [{ name: "W", x: X0, y: CY }, { name: "E", x: X1, y: CY }],
  // `P1`/`P2` are the through-conductor; `S1`/`S2` are the two-wire secondary
  // the burden hangs across. Not one `S`: a CT secondary with no return is an
  // open circuit, which is the fault condition, not the connection.
  CurrentTransformer: [
    { name: "P1", x: CX, y: Y0 },
    { name: "P2", x: CX, y: Y1 },
    { name: "S1", x: X0, y: 14 },
    { name: "S2", x: X0, y: 18 }
  ],
  VoltageTransformer: [{ name: "HV", x: 11.3, y: Y0 }, { name: "LV", x: X1, y: CY }]
};
