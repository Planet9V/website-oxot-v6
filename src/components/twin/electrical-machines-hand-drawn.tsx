import { CX, CY, LINE, METER_R, Y0, Y1 } from "./electrical-hand-drawn";

/**
 * THE ROTATING MACHINE — the mark two published pages were independently
 * blocked on.
 *
 * WHY A THIRD ELECTRICAL MODULE. `./electrical-hand-drawn.tsx` reached its
 * 499-line working size holding the POWER PATH (source, switching, protection,
 * conversion, storage, earth) and `./electrical-instruments-hand-drawn.tsx`
 * holds the MEASUREMENT CHAIN. A rotating machine is neither: it is the plant
 * the power path begins at. Splitting on the family seam rather than on a line
 * count is exactly what that second module's header argues for, and this is the
 * next seam the drawing already draws.
 *
 * THE CELL CONSTANTS ARE IMPORTED FROM THE PARENT AND NOTHING TRAVELS BACK.
 * That is not stylistic. The instruments module records the failure verbatim:
 * the first attempt re-exported its components from the parent to keep the
 * consuming namespace's shape, and the import cycle took the whole gallery route
 * to HTTP 500 with `Cannot access 'X0' before initialization`, because a child's
 * module-scope port table evaluates while the parent's `const`s are still in
 * their temporal dead zone. So `diagrams/types.ts`, `diagrams/ports.ts` and
 * `twin/AssetNode.tsx` import this module BY NAME, one line each, and the
 * dependency graph stays acyclic by construction.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT IT REPLACES, AND WHY THE TWO GAPS ARE ONE GAP.
 *
 * Two records on the published energy page name this missing mark in their own
 * source, having refused to borrow a neighbouring device class to cover it:
 *
 *   energy-utilities-2/content.workedExample.ts L96   `generating-unit` draws
 *     draw.io's `container_tank_cistern` — an OPEN-TOPPED WATER CISTERN — on the
 *     one node where the modelled chain becomes lost generation. Its note names
 *     the fix exactly: "IEC 60617 draws a rotating machine as a circle lettered
 *     `G`; twin/electrical-hand-drawn.tsx publishes `AcSource`, `Battery`,
 *     `PhotovoltaicArray` and `InverterBridge` but NO generator, so there is
 *     nothing to point at yet and nothing here may be borrowed instead."
 *   energy-utilities-2/content.assets.ts L55        `generation-and-network-plant`
 *     draws the same cistern for "Generation, switchgear and storage plant".
 *
 * Both are the metering-pump-drawn-as-a-tank error this whole effort started
 * from. One export closes both, because both make one claim: this plant spins.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * THE CONTRACT IS `./drawio-glyphs.tsx`'s, EXACTLY, as the rest of the set's is:
 * a `<g>` FRAGMENT — never a standalone `<svg>` — in the 32-unit cell with the
 * 22-unit live area (5..27), stroking `currentColor` with nothing filled, at the
 * 1.3 weight every glyph here draws at. Callers set colour and never weight.
 */

/**
 * THE SYMBOL IS A CIRCLE CARRYING A LETTER, AND THE LETTER IS THE WHOLE
 * IDENTIFICATION. Both standards this library draws to agree, and both were read
 * rather than recalled:
 *
 *   IEC 60617-06     the general rotating machine is a circle containing a
 *                    letter code — `G` generator, `M` motor — the letter, not
 *                    the outline, saying which machine it is.
 *   ISO 10628-2:2012 Group 20 "Engines", read off the published symbol sheet:
 *                    REG#C0079 `Generator (general)` is a circle lettered `G`;
 *                    REG#C0082 `Electric motor (general)` is the SAME circle
 *                    lettered `M`. The two entries are one drawing, twice.
 *
 * SO THE LETTER IS A PARAMETER HERE AND AN EXPORT OUTSIDE — the structure
 * `./electrical-instruments-hand-drawn.tsx` already uses for `MeterFace`, and it
 * is forced rather than chosen. `GLYPH_REGISTRY` and `CURATED_SYMBOLS` both map
 * a slug to a ZERO-ARGUMENT component, so a public parametric export cannot be
 * registered at all; the library's one parametric family, `isa/`, needed a whole
 * matched slug grammar and a memoisation cache to get around that. A second such
 * grammar to carry one letter would be a great deal of machinery for a set whose
 * entire membership is `G` and `M`.
 *
 * ONLY `Generator` IS EXPORTED, and that is the YAGNI line rather than an
 * oversight. `G` has two named consumers waiting on it, above. `M` has none: the
 * only motor-shaped text in any blocked record is hyperscale's "pumps", which is
 * a pump. When a motor is wanted it is one line here and no new geometry, which
 * is the whole point of the parameter.
 */
function RotatingMachine({ letter, label }: { letter: string; label: string }) {
  return (
    <g role="graphics-symbol img" aria-label={label}>
      <title>{label}</title>
      <circle cx={CX} cy={CY} r={METER_R} {...LINE} />
      <path d={`M ${CX} ${Y0} L ${CX} ${CY - METER_R} M ${CX} ${CY + METER_R} L ${CX} ${Y1}`} {...LINE} />
      <text x={CX} y={20.6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="currentColor">
        {letter}
      </text>
    </g>
  );
}

/**
 * IEC 60617-06 / ISO 10628-2 REG#C0079 GENERATOR — the instrument circle
 * lettered `G`.
 *
 * `METER_R`, THE SET'S OWN CIRCLE, AND NOT A NEW ONE. `AcSource` makes the
 * argument already: IEC draws sources and indicating instruments alike as a
 * circle and separates them by CONTENT, so sharing the diameter is the
 * standard's consistency rather than a copied constant. A generator drawn at a
 * different radius from the AC source it stands beside on the same single line
 * would read as a different class of thing for a reason the standard does not
 * have. r = 9.5 leaves 1.5 units at each end of the live area for the leads.
 *
 * THE TYPE IS `MeterFace`'S TYPE, TO THE UNIT — size 13 at baseline 20.6 in
 * `var(--font-mono)`. It is the identical problem: ONE capital centred in a
 * 19-unit circle. That module measured it — a ~9.1-unit cap inside a 19-unit
 * circle, 5.7 units of clear diameter left over, cap box centred on 16.05 — and
 * the mark ships. Choosing a second size for one job is how two halves of one
 * set drift apart, which is the same reason the cell constants are imported
 * rather than copied.
 *
 * THE CLEARANCES ARE NOT WHAT BINDS THIS MARK, and saying so is the honest
 * report. The cap box stands 5.0 units clear of the circle above it and 5.6
 * units clear at either side; nothing in the geometry drawn here closes up
 * first. What binds is INSIDE THE LETTERFORM — the counter of the `G` and the
 * aperture between its bowl and its crossbar — which is the type's number rather
 * than this file's, and is measured off a true-size render rather than asserted
 * here.
 *
 * DRAWN VERTICALLY, matching `Transformer`, `Fuse`, `Disconnector`,
 * `CircuitBreaker` and `AcSource`, because a single line runs down the page from
 * source to load and a generating unit sits at the head of that run. Both leads
 * are inked and both terminals declared: a generator drawn with only an outgoing
 * lead cannot be placed in a chain, and `AcSource` — the same role at the head
 * of the same drawing — already declares `N` and `S`.
 *
 * WHAT IS DELIBERATELY NOT DRAWN: THE AC CURRENT-TYPE MARK. ISO 10628-2 publishes
 * REG#X8154 `Generator, AC` as this circle with a small sine UNDER the letter,
 * and a synchronous generating unit is of course AC. It is left off because it
 * cannot survive the render. The cap box occupies y 11.5..20.6 and the circle's
 * inner wall is at y 25.5, so the sine gets a band 2.4 units tall once the two
 * stroke half-widths come off; at the 22 css px small end of this library's cell
 * range that band is 1.6 px, and a 1.1-weight sine inside it is one thickened
 * smudge beneath the letter. That is the annotation-as-blob failure
 * `TransformerDyn`, `Clarifier` and `CheckValveInline` each record having shipped
 * once. The general form is a complete, published symbol; the sine would be a
 * decoration that only appears at sizes this library never renders at.
 */
export function Generator() {
  return <RotatingMachine letter="G" label="Generator" />;
}

/**
 * Connection ports for this module, in the same 32-unit cell space and the same
 * shape as `GLYPH_PORTS` in `./drawio-glyphs.tsx`. Folded in alongside
 * `ELECTRICAL_HAND_DRAWN_PORTS` and `ELECTRICAL_INSTRUMENT_PORTS` by
 * `@/components/diagrams/ports.ts`, which indexes BY COMPONENT IDENTITY rather
 * than by name — several modules here export marks the generated set also names,
 * and a name-keyed merge would hand one set's ports to the other set's glyph.
 *
 * `N` AND `S`, NOT AN ELECTRICAL PAIR, AND THAT IS A DECISION. This set names a
 * terminal by what it IS wherever the terminal has an electrical identity —
 * `HV`/`LV`, `+`/`−`, `DC`/`AC`, `P1`/`S1` — because a router that lands an
 * 11 kV incomer on a transformer's `LV` port has drawn a real error. A
 * generator's two terminals carry no such asymmetry: both are stator terminals
 * at one voltage, and the machine's real second connection is a MECHANICAL shaft
 * this symbol does not draw. Inventing `OUT`/`IN` would assert a direction the
 * mark does not carry. `AcSource`, the same role at the head of the same
 * drawing, resolved this the same way.
 *
 * BOTH PORTS ARE INKED. Each sits where a lead this component actually draws
 * meets the live area — a port with no ink is a terminal that does not exist,
 * which is the defect class that had conductors landing on card borders instead
 * of on nozzles.
 */
export const ELECTRICAL_MACHINE_PORTS: Record<string, ReadonlyArray<{ name: string; x: number; y: number }>> = {
  Generator: [
    { name: "N", x: CX, y: Y0 },
    { name: "S", x: CX, y: Y1 }
  ]
};
