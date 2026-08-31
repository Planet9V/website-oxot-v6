import { CX, LINE, Y0, Y1 } from "./electrical-hand-drawn";

/**
 * IEC 60617-07 SWITCHING CONTACTS — THE MAKE CONTACT AND THE CONTACTOR POLE.
 *
 * WHY A THIRD ELECTRICAL MODULE. `./electrical-hand-drawn.tsx` is the POWER PATH
 * and `./electrical-instruments-hand-drawn.tsx` is the MEASUREMENT CHAIN; both
 * are near this project's 500-line ceiling, and the marks here are neither. They
 * are the CONTACT family — the part of a circuit that opens and closes — and
 * they exist because an independent audit found the manufacturing drawing's
 * safety final element, `KM-207`, drawn as
 * `electrical/electro-mechanical/changeover_contact`, whose topology is wrong
 * three ways over:
 *
 *   1. `KM` in IEC 81346 is a CONTACTOR, and "cell power isolation" means main
 *      power poles. A single-pole CHANGEOVER is an auxiliary control contact —
 *      the thing that reports a contactor's state, not the thing that breaks the
 *      cell's supply.
 *   2. De-energise-to-trip means a MAKE contact held closed by the coil, opening
 *      on loss of power. A changeover asserts "this circuit is switched between
 *      TWO destinations", a claim the drawing never makes and the plant does not
 *      have: there is no second destination for a de-energised welding cell.
 *   3. The changeover was drawn THROWN — one of its two positions asserted as
 *      the default — so the mark stated a switching state the spec never chose.
 *
 * Neither the semicircular contact-piece nor an operating-coil rectangle exists
 * anywhere in `./drawio-glyphs.tsx`, which is why these are drawn rather than
 * looked up.
 *
 * THE CONTRACT IS `./drawio-glyphs.tsx`'s, EXACTLY, as it is for the two sibling
 * modules: every export is a `<g>` FRAGMENT in the 32-unit cell with the 22-unit
 * live area (x/y 5..27), stroking `currentColor` with nothing filled, at 1.3.
 * The cell constants are IMPORTED from `./electrical-hand-drawn.tsx` and nothing
 * travels back — the instruments module records what a cycle here costs: the
 * gallery route went to HTTP 500 with `Cannot access 'X0' before
 * initialization`, because a child's module-scope port table evaluates while the
 * parent's `const`s are still in their dead zone.
 *
 * THE BLADE GEOMETRY IS `CircuitBreaker`'s, DELIBERATELY AND EXACTLY — pivot at
 * y = 22.5, blade 10.5 units at 40° off vertical, fixed contact at y = 12 where
 * the closed blade would land. IEC's switching marks ARE one family: the breaker
 * is this contact plus an `×` on the fixed contact, the disconnector is this
 * contact plus a bar across it, and this is the family member with no function
 * mark at all. Redrawing the blade at a different length or angle would make
 * three marks that differ everywhere instead of three that differ only where the
 * standard says they differ. `CircuitBreaker`'s own note records the measurement
 * that fixed 10.5, and reusing it is what keeps a row of switching marks legible
 * together rather than each one legible alone.
 */

/** The open blade's free end: pivot (16, 22.5) plus 10.5 units at 40° off vertical. */
const TIP_X = 22.75;
const TIP_Y = 14.457;

/**
 * IEC 60617-07-02 MAKE CONTACT — two terminals and a blade. Nothing else.
 *
 * NO MANUAL-OPERATION MARK AND NO ROTATION ARROW, and their ABSENCE is the
 * statement. IEC 60617-02 adds a separate operating mark to a contact that a
 * hand works: a push-button's plunger, a rotary selector's arc-and-arrow. A
 * contact drawn bare is operated by SOMETHING ELSE — which for `KM-207` is the
 * safety logic solver, and is exactly what the changeover selector's two
 * position arcs and two-headed rotation arrow denied by depicting a person
 * turning a knob.
 *
 * DRAWN OPEN, AND THAT IS THE STANDARD'S REFERENCE STATE, NOT A CHOSEN MOMENT.
 * IEC draws every contact in the DE-ENERGISED, unoperated condition; "make"
 * names the contact that MAKES when its coil is energised, so open is what the
 * device's own name asserts. On a de-energise-to-trip final element the
 * de-energised condition IS the tripped condition and IS the safe state, so the
 * mark states the failure mode without needing a note beside it. This is the
 * exact inverse of the changeover's defect: a changeover has two energised
 * positions and NO reference state, so drawing it thrown asserted one at random.
 *
 * A CLOSED BLADE WOULD ALSO BE A STRAIGHT LINE indistinguishable from the
 * conductor either side of it — the same reason `Disconnector` is drawn open in
 * the module next door.
 */
export function MakeContact() {
  return (
    <g role="graphics-symbol img" aria-label="Make contact, shown de-energised">
      <title>Make contact</title>
      <path d={`M ${CX} ${Y0} L ${CX} 12`} {...LINE} />
      <path d={`M ${CX} ${Y1} L ${CX} 22.5`} {...LINE} />
      <path d={`M ${CX} 22.5 L ${TIP_X} ${TIP_Y}`} {...LINE} strokeLinecap="round" />
    </g>
  );
}

/**
 * IEC 60617-07-04 CONTACTOR POLE — the make contact above, carrying the
 * SEMICIRCULAR CONTACT-PIECE on its moving contact.
 *
 * THE COIL IS NOT DRAWN HERE, AND THAT IS THE STANDARD RATHER THAN A SHORTFALL.
 * IEC 60617 draws a contactor's main pole as the make contact plus the
 * contact-piece; the operating coil is its OWN symbol (07-15, a rectangle) shown
 * in the CONTROL circuit and tied to the pole by coil reference rather than by a
 * mechanical line, precisely because a power pole and its coil sit on different
 * sheets of a real scheme. On this drawing the control circuit is the conductor
 * already arriving from `SIS-01`, so the coil's place on the page is taken.
 *
 * IT WAS ALSO MEASURED, NOT ASSUMED. A coil rectangle standing off the contact
 * on a dashed mechanical link needs three more features — a ~7 x 7-unit box, an
 * ~9-unit dashed link, and clear ground between them — inside a cell that
 * renders at 25-39 css px across the three diagrams in this repository. At 32 px
 * that box is 7 px across with 1.3 px walls, the link is three dashes, and the
 * blade has to shorten to make room, which costs the contact-piece the clearance
 * it needs. Five features at 32 px merge; that is the failure this whole
 * component set exists to stop repeating.
 *
 * THE CONTACT-PIECE IS A HALF-DISC ON THE BLADE, CONCAVE TOWARD THE FIXED
 * CONTACT — the cup the fixed contact seats into. Its diameter lies ALONG the
 * blade axis and is centred on the free end, so the arc bulges away from the
 * fixed contact and the opening faces it. r = 2.4 makes a 4.8-unit piece against
 * the 10.5-unit blade: the same 0.46 ratio `CircuitBreaker` holds between its
 * cross and its blade.
 *
 * ITS FLOOR IS ~70 css px, WHICH IS ABOVE EVERY DIAGRAM CELL IN THIS REPOSITORY,
 * AND THAT NUMBER WAS MEASURED RATHER THAN ESTIMATED. Shot at deviceScaleFactor
 * 1 across a ladder of cell sizes and read on the nearest-neighbour upscale of
 * that raster: at 37, 46 and 56 px the cup's aperture is under three pixels and
 * the arc CLOSES into a hook on the blade's end — which reads as a bent blade,
 * or as the arrowhead the old generated breaker was mistaken for, and is worse
 * than no mark at all because it invites a reading. At 70 px the opening
 * separates; at 88 px it is unmistakably a cup. Growing `r` is not the escape:
 * the piece has to stay in proportion to the blade, and the blade cannot grow
 * without leaving the 22-unit live area.
 *
 * SO THE MANUFACTURING DRAWING USES `MakeContact`, NOT THIS, and that is stated
 * here rather than left for the next reader to rediscover — its cell measures
 * 37.1 css px. This export is for a legend, a bay detail or a hover card, the
 * standing `./instrument-bubble.tsx` records for its tag text. A mark below its
 * floor is decoration pretending to be information.
 *
 * NOT `TransformerDyn`, though an earlier draft of this note cited it as the
 * neighbouring example. That glyph was re-cut on 2026-08-29 and now ships as
 * T-01 on the energy single line, carrying a real neutral terminal; its
 * vector-group marks resolve at the 39.13 css px that drawing gives them. The
 * floor is per-mark and per-drawing, not a property of detail in general.
 */
export function Contactor() {
  return (
    <g role="graphics-symbol img" aria-label="Contactor pole, shown de-energised">
      <title>Contactor pole</title>
      <path d={`M ${CX} ${Y0} L ${CX} 12`} {...LINE} />
      <path d={`M ${CX} ${Y1} L ${CX} 22.5`} {...LINE} />
      <path d={`M ${CX} 22.5 L ${TIP_X} ${TIP_Y}`} {...LINE} />
      {/* Diameter endpoints are the tip ± 2.4 along the blade's unit vector
          (0.643, −0.766); the arc bulges through tip + 2.4 x (0.766, 0.643),
          which is down-and-right, away from the fixed contact at (16, 12). */}
      <path d="M 21.21 16.30 A 2.4 2.4 0 0 0 24.29 12.62" {...LINE} />
    </g>
  );
}

/**
 * Connection ports for this family, in the same shape as `GLYPH_PORTS` and in
 * the same 32-unit cell. Joined by `@/components/diagrams/ports.ts`, which pairs
 * each module with its own table by export name and keys the result by component
 * IDENTITY — three modules now export switching marks, and a name-keyed merge
 * would hand one set's terminals to another set's geometry.
 *
 * `N` AND `S`, NOT LETTERED TERMINALS. `Transformer` names `HV`/`LV` and
 * `Battery` names `+`/`−` because those terminals carry an electrical identity a
 * router can get WRONG. A contact's two terminals are interchangeable — it makes
 * or breaks the circuit whichever way current runs through it — so a lettered
 * name here would invent a distinction the device does not have.
 */
export const ELECTRICAL_CONTACT_PORTS: Record<
  string,
  ReadonlyArray<{ name: string; x: number; y: number }>
> = {
  MakeContact: [
    { name: "N", x: CX, y: Y0 },
    { name: "S", x: CX, y: Y1 }
  ],
  Contactor: [
    { name: "N", x: CX, y: Y0 },
    { name: "S", x: CX, y: Y1 }
  ]
};
