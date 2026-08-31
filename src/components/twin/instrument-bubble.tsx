/**
 * THE PARAMETRIC ISA-5.1 INSTRUMENT BUBBLE.
 *
 * THE MEASURED PROBLEM IT SOLVES. The 24 files under `pid/instruments` in the
 * converted stencil library collapse to exactly TWO distinct geometries: 11 are
 * a bare ellipse, and 13 are that same ellipse plus one horizontal line. Six
 * of them ship as components in ./drawio-glyphs.tsx and emit two shapes between
 * them — `InstrumentBubble`, `FlowIndicator`, `FlowTransmitter` and
 * `LevelController` are byte-identical bare circles, and `AnalyzerTransmitter`
 * and `FlowElement` are byte-identical circles with a line. That is not a
 * stencil set, it is one circle duplicated — because ISA-5.1 identifies an
 * instrument by the LETTER CODE INSIDE the bubble, and the conversion dropped
 * every text sub-element (only 6 of 9,368 converted SVGs contain any `<text>`).
 * That file's own header records the same limitation. (Cited by name, not by
 * line: it is generated, and the six have already moved once during this work.)
 *
 * So this is not another stencil. It is the symbol drawn from its parameters:
 * the outline comes from WHAT KIND of device it is, the line through it comes
 * from WHERE it is mounted, and the letters come from the tag — as real
 * `<text>`, which is the part every conversion lost.
 *
 * NAME COLLISION, FLAGGED NOT PAPERED OVER. ./drawio-glyphs.tsx also exports
 * the name `InstrumentBubble` (its bare circle), and ./pid-symbols.tsx
 * re-exports it. Different modules, so nothing breaks, but a file importing
 * both must alias one. `InstrumentBubble` is the API name the diagram plan
 * specifies for THIS component; retiring the stencil export is the call of
 * whoever owns the generated file, not of this one.
 *
 * ISA-5.1 TABLE 5.1.1 IS A MATRIX, AND BOTH AXES ARE DRAWN. The outline says
 * WHAT KIND OF SYSTEM performs the function; the horizontal line says WHERE the
 * function lives. A reader who knows the standard reads the shape before the
 * letters, so a wrong shape has already misinformed them.
 *
 *   device   → outline   discrete = plain circle · shared = circle in a SQUARE
 *                        (shared display / shared control, the BPCS) · computer
 *                        = HEXAGON (computer function, software) · plc = DIAMOND
 *                        in a square (programmable logic control) · sis = circle
 *                        in a diamond in a square (safety instrumented system)
 *   location → modifier  field = no line · panel = one SOLID line (front of the
 *                        main panel / central control room) · rear = one DASHED
 *                        line (REAR of the main panel, not accessible to the
 *                        operator) · local-panel = two solid lines (front of a
 *                        secondary or local panel) · local-panel-rear = two
 *                        DASHED lines (rear of a secondary panel, field cabinet)
 *   tag      → letters   first letter = measured variable, succeeding letters =
 *                        functions, above the line; loop number below it.
 *
 * TWO TOKENS ARE SPENT HERE AND MAY NOT BE SPENT AGAIN. A double horizontal line
 * inside a bubble means "secondary or local panel"; a dashed one means "not
 * accessible to the operator". Nothing else on the sheet — no edge, no annotation
 * — may use either to mean something else.
 *
 * SIS IS NOT A STYLE VARIANT OF plc. A safety function drawn as a plain circle,
 * or as a plain circle-in-square, is silently mis-typed, which on a site selling
 * functional safety is the most expensive error this drawing can make. `plc` and
 * `sis` share the fourth column's diamond-in-square envelope and are separated
 * by the inner circle.
 *
 * THE 32-UNIT CELL EXCEPTION — DELIBERATE, AND THE ONLY ONE.
 * Every other symbol in this directory fits the 32-unit cell with a 22-unit live
 * area. This one cannot: two lines of legible mono type do not fit in 22 units.
 * A 3-character tag at the smallest legible size is ~20 units wide, and it has
 * to clear a centre line with a second line of type under it. So the bubble is
 * drawn in a 44-UNIT CELL, and `size` has a 44px floor — below that the text is
 * decoration pretending to be information, which is exactly the failure this
 * component exists to fix. The live area inside that cell is 5..39, and the
 * stroke is 1.5; see the note on `INSET` for why both came down on 2026-08-28
 * while the lettering did not.
 *
 * THE TAG IS VALIDATED, NEVER INFERRED. An unparseable tag still draws — a
 * drawing with a missing bubble is worse than one with an odd bubble — but it
 * warns once per distinct tag and its accessible name falls back to the literal
 * characters rather than asserting a meaning nobody supplied.
 */

import type { Bilingual } from "@/i18n/bilingual";
import { pick } from "@/i18n/bilingual";
import type { Locale } from "@/i18n/config";

/** ISA-5.1 first-letter table: the measured or initiating variable. Letters the
 *  standard leaves to the user are named as such rather than guessed at — this
 *  file will not decide that C means conductivity on someone else's P&ID. */
const MEASURED_VARIABLE: Readonly<Record<string, string>> = {
  A: "Analysis",
  B: "Burner or combustion",
  C: "User's choice",
  D: "User's choice",
  E: "Voltage",
  F: "Flow",
  G: "User's choice",
  H: "Hand",
  I: "Current",
  J: "Power",
  K: "Time or schedule",
  L: "Level",
  M: "User's choice",
  N: "User's choice",
  O: "User's choice",
  P: "Pressure",
  Q: "Quantity",
  R: "Radiation",
  S: "Speed or frequency",
  T: "Temperature",
  U: "Multivariable",
  V: "Vibration",
  W: "Weight or force",
  X: "Unclassified",
  Y: "Event, state or presence",
  Z: "Position or dimension"
};

/** Succeeding-letter table: each function as [used before another function,
 *  used as the final noun] — "FIC" is a flow INDICATING CONTROLLER, not a
 *  "flow indicate control". */
const FUNCTION_LETTER: Readonly<Record<string, readonly [string, string]>> = {
  A: ["alarm", "alarm"],
  C: ["controlling", "controller"],
  E: ["sensing", "element"],
  G: ["viewing", "glass"],
  I: ["indicating", "indicator"],
  K: ["control", "station"],
  L: ["light", "light"],
  N: ["user-defined", "user-defined device"],
  O: ["restricting", "orifice"],
  P: ["test", "test point"],
  Q: ["totalising", "totaliser"],
  R: ["recording", "recorder"],
  S: ["switching", "switch"],
  T: ["transmitting", "transmitter"],
  U: ["multifunction", "multifunction device"],
  V: ["", "valve"],
  W: ["", "well"],
  X: ["unclassified", "unclassified device"],
  Y: ["computing", "relay"],
  Z: ["driving", "final control element"]
};

/** Second-position modifiers on the variable. */
const VARIABLE_MODIFIER: Readonly<Record<string, string>> = {
  D: "differential",
  F: "ratio",
  K: "rate of change",
  M: "momentary",
  S: "safety"
};

/** Trailing modifiers on the function. */
const FUNCTION_SUFFIX: Readonly<Record<string, string>> = {
  H: "high",
  L: "low",
  M: "middle"
};

export interface IsaTag {
  /** False when the tag is not a well-formed ISA identifier, or carries a letter
   *  no table above knows. The bubble still draws; the meaning is withheld. */
  valid: boolean;
  variable?: string;
  modifier?: string;
  functions: string[];
  suffix?: string;
  /** "Flow indicating controller", or undefined when `valid` is false. */
  description?: string;
  /** Every character this parser could not account for, in tag order. */
  unknown: string[];
}

/**
 * Parses an ISA-5.1 identification letter set. Deliberately strict about form:
 * two to five UPPERCASE letters. A lowercase or punctuated tag is reported
 * invalid rather than silently normalised, because normalising is inference and
 * the caller may have meant something this parser cannot see.
 *
 * The one piece of real ambiguity is a second letter that is both a modifier and
 * a function — S is "safety" as a modifier and "switch" as a function, so "LSH"
 * could parse either way. It is resolved by construction, not by a lookup of
 * common tags: the modifier reading is taken only if a function letter survives
 * after it. "LSH" keeps S as the switch (nothing else would be left); "PDSH"
 * reads D as differential and S as the switch; "ZSHH" strips the doubled limit
 * letter first and then keeps S as the switch.
 */
export function parseIsaTag(tag: string): IsaTag {
  const unknown: string[] = [];
  if (!/^[A-Z]{2,5}$/.test(tag)) {
    return { valid: false, functions: [], unknown: tag.split("") };
  }
  const chars = tag.split("");
  const variableLetter = chars[0];
  let rest = chars.slice(1);

  // ISA doubles a limit letter for a second threshold — "LSHH" is a level switch
  // high-high — so the trailing run is stripped whole rather than one letter of
  // it. Stripping only one leaves an H behind that then derails the modifier
  // test below and reports a perfectly ordinary tag as unparseable.
  const suffixLetters: string[] = [];
  while (rest.length > 1) {
    const last = rest[rest.length - 1];
    if (!FUNCTION_SUFFIX[last] || FUNCTION_LETTER[last]) break;
    suffixLetters.unshift(last);
    rest = rest.slice(0, -1);
  }
  const suffix = suffixLetters.length ? suffixLetters.map((c) => FUNCTION_SUFFIX[c]).join("-") : undefined;

  let modifier: string | undefined;
  if (rest.length > 1 && VARIABLE_MODIFIER[rest[0]]) {
    modifier = VARIABLE_MODIFIER[rest[0]];
    rest = rest.slice(1);
  }

  const variable = MEASURED_VARIABLE[variableLetter];
  if (!variable) unknown.push(variableLetter);
  for (const c of rest) if (!FUNCTION_LETTER[c]) unknown.push(c);
  if (unknown.length > 0 || rest.length === 0) {
    return { valid: false, variable, modifier, functions: [], suffix, unknown };
  }

  const words = rest.map((c, i) => (i === rest.length - 1 ? FUNCTION_LETTER[c][1] : FUNCTION_LETTER[c][0]));
  const description = [variable, modifier, ...words, suffix].filter(Boolean).join(" ");
  return { valid: true, variable, modifier, functions: words, suffix, description, unknown };
}

const warnedTags = new Set<string>();

/** The four system classes of ISA-5.1 Table 5.1.1, plus the safety case. */
export type InstrumentDevice = "discrete" | "shared" | "computer" | "plc" | "sis";
/** The five mounting rows of ISA-5.1 Table 5.1.1. */
export type InstrumentLocation = "field" | "panel" | "rear" | "local-panel" | "local-panel-rear";

export interface InstrumentBubbleProps {
  /** ISA identification letters, e.g. "FIC". Validated, never inferred. */
  tag: string;
  /** Loop number, e.g. "101". Drawn below the line exactly as supplied. */
  loop?: string;
  device?: InstrumentDevice;
  location?: InstrumentLocation;
  /** Language of the accessible name. Defaults to English — see the note on
   *  `INSTRUMENT_DEVICE_LABEL` for why the diagram path cannot pass it yet. */
  locale?: Locale;
  /** Rendered px. Floored at 44 — see the header note on the cell exception. */
  size?: number;
}

/** The 44-unit cell this symbol lives in; its live area is `INSET`..`FAR`. */
export const BUBBLE_CELL = 44;
/**
 * THE OUTLINE SHRANK ON 2026-08-28 AND THE LETTERING DID NOT, which is the whole
 * of the change and the reason it is written as an inset rather than as a
 * smaller cell.
 *
 * The independent audit measured this bubble at `r=20`, `stroke-width=1.8`,
 * against the CSET asset portraits it shares a Purdue drawing with at a 22-unit
 * span and 1.3 — and drew the right conclusion from it: L0 was the loudest band
 * on a page whose argument lives at L1 and L3.5. The instruments were shouting
 * over the architecture.
 *
 * WHY NOT THE `r=15` THE AUDIT ASKED FOR. The letters are the only thing telling
 * one bubble from another, and they are sized against a hard 11-css-pixel floor
 * that ../diagrams/layout-shared.ts derives and `MIN_RENDER_SCALE` enforces, so
 * they cannot come down with the outline. A three-letter tag at 11 units is ~21
 * units wide at its cap line, 12 units above the centre, and the chord an `r=15`
 * circle offers there is 18 — the tag would break the outline. At `r=17` the
 * chord is 24.1 and the letters sit inside it with a unit and a half either
 * side, so 17 is the smallest circle this lettering fits in rather than a
 * preference. The span goes 40 → 34 (1.74× the CSET marks down to 1.47×) and the
 * stroke 1.8 → 1.5 (1.72× down to 1.43×): most of the distance asked for, and
 * all of it the type floor leaves available.
 */
const INSET = 5;
const SPAN = BUBBLE_CELL - INSET * 2;
const FAR = BUBBLE_CELL - INSET;
const STROKE = 1.5;
const C = BUBBLE_CELL / 2;
const R = SPAN / 2;

/**
 * THE DIAMOND FAMILY TAKES THE WHOLE CELL, AND THE ARITHMETIC SAYS WHY.
 *
 * A diamond pinches. At a three-letter tag's cap line — 11.68 units above the
 * centre, measured in IBM Plex Mono at font-size 11, not assumed — a diamond
 * inscribed in the 34-unit envelope every other outline uses offers 5.32 units
 * of half-width against the 10.56 the letters need: the tag would hang out of
 * both sides of its own symbol. That was a real defect in `plc` as it stood, and
 * it never shipped only because no spec had reached for it.
 *
 * So `plc` and `sis` are drawn on the FULL 44-unit cell — half-span 21.25, which
 * puts the 1.5 stroke's outer edge exactly on the cell boundary. The circle
 * inscribed in that diamond, which is the SIS bubble proper, lands at 21.25/√2 =
 * 15.03 rather than the 17 a plain bubble gets.
 *
 * 15.03 IS THE HONEST NUMBER. ISA fixes the bubble at 7/16 in absolutely, so a
 * strict SIS symbol would hold the circle at 17 and grow the square to 17·√2·2 =
 * 48.08 — 4 units past the cell the diagram contract fixes, and growing the cell
 * scales the lettering down through the project's 11-css-pixel floor. Table
 * 5.1.1 itself draws all four columns at one envelope, with the diamond column's
 * circle correspondingly smaller. The lettering did not move a point.
 */
const OUTER_INSET = STROKE / 2;
const OUTER_HALF = BUBBLE_CELL / 2 - OUTER_INSET;
const OUTER_FAR = BUBBLE_CELL - OUTER_INSET;
const SIS_R = OUTER_HALF / Math.SQRT2;

function Outline({ device }: { device: InstrumentDevice }) {
  const outerSquare = (
    <rect
      x={OUTER_INSET}
      y={OUTER_INSET}
      width={OUTER_HALF * 2}
      height={OUTER_HALF * 2}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
    />
  );
  const diamond = (
    <path
      d={`M${C} ${OUTER_INSET} L${OUTER_FAR} ${C} L${C} ${OUTER_FAR} L${OUTER_INSET} ${C} Z`}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
  );
  const square = (
    <rect
      x={INSET}
      y={INSET}
      width={SPAN}
      height={SPAN}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
    />
  );
  switch (device) {
    case "shared":
      // Circle inscribed in a square — a shared display / shared control function.
      return (
        <>
          {square}
          <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeWidth={STROKE} />
        </>
      );
    case "computer":
      // Hexagon — a computer function. Its waist is `SPAN` wide like every other
      // outline here; the flats are at a quarter of the span in from each end.
      return (
        <path
          d={`M${INSET} ${C} L${INSET + SPAN * 0.25} ${INSET} L${FAR - SPAN * 0.25} ${INSET} L${FAR} ${C} L${FAR - SPAN * 0.25} ${FAR} L${INSET + SPAN * 0.25} ${FAR} Z`}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
      );
    case "plc":
      // Diamond inscribed in a square — programmable logic control.
      return (
        <>
          {outerSquare}
          {diamond}
        </>
      );
    case "sis":
      // Circle inscribed in a diamond inscribed in a square — a function of a
      // SAFETY INSTRUMENTED SYSTEM. The inner circle is the whole distinction
      // from `plc` above, and it is the reason this class exists: without it a
      // safety function is drawn as ordinary logic, or worse as a plain field
      // bubble, and the drawing states the wrong thing about the plant.
      return (
        <>
          {outerSquare}
          {diamond}
          <circle cx={C} cy={C} r={SIS_R} fill="none" stroke="currentColor" strokeWidth={STROKE} />
        </>
      );
    case "discrete":
    default:
      return <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeWidth={STROKE} />;
  }
}

/**
 * HOW FAR THE MODIFIER REACHES AT A GIVEN HEIGHT — a function of `dy`, not a
 * constant, and the 6× nearest-neighbour read of the first matrix is what forced
 * that. A single line sits on the centre line where every outline is at its
 * widest, so a constant was right for it. A DOUBLE line sits 1.6 units off
 * centre, where a hexagon has already lost 0.8 units of half-width and a diamond
 * 1.6 — and a line drawn to the centre-line width there OVERSHOOTS the sloping
 * edge. The overshoot plus the converging edge enclose a sliver that fills in
 * solid at reading size: the bubble grows what looks like an ARROWHEAD at each
 * end, on a sheet where arrowheads mean flow direction. So each line ends on the
 * outline it crosses.
 *
 * `shared` is the deliberate exception. Its boundary is the SQUARE, not the
 * inscribed circle, and ISA draws the modifier across the whole square — so it
 * stays flat at 17 while `discrete`, the same circle without the square, follows
 * the chord.
 */
function lineHalfWidth(device: InstrumentDevice, dy: number): number {
  switch (device) {
    case "shared":
      return R;
    case "computer":
      // Hexagon: the flats are a quarter of the span in, so the sloping edge
      // sheds half a unit of half-width for every unit away from the waist.
      return R - dy * 0.5;
    case "plc":
    case "sis":
      // Diamond: |x| + |y| = OUTER_HALF, so a single line on the centre line
      // runs vertex to vertex — the full width, and clean, because the two
      // outlines meet there rather than crossing.
      //
      // A DOUBLE line cannot do that, and clipping it to the diamond was not
      // enough. Ending 1.6 units off centre puts two 1.5-unit strokes inside the
      // 45° corner where the diamond's edges converge on the vertex, and the
      // slivers of white left between them close up: the symbol grows an
      // ARROWHEAD at each end, on a sheet where an arrowhead means flow
      // direction. So the pair ends on the INSCRIBED CIRCLE instead — the bubble
      // proper, drawn on `sis` and implied on `plc` — which leaves 4.7 units of
      // clear white before the diamond and no corner to fill.
      return dy === 0 ? OUTER_HALF : Math.sqrt(SIS_R * SIS_R - dy * dy);
    case "discrete":
    default:
      return Math.sqrt(R * R - dy * dy);
  }
}

/** ISA-5.1 Table 5.1.1's location rows, as [line count, dashed]. */
const LOCATION_LINES: Readonly<Record<InstrumentLocation, readonly [number, boolean]>> = {
  field: [0, false],
  panel: [1, false],
  rear: [1, true],
  "local-panel": [2, false],
  "local-panel-rear": [2, true]
};

/** The dash cadence is 3-on/2.5-off at 44 units, chosen so that even the
 *  shortest chord a double line spans still shows two full dashes — a dashed
 *  line that renders as one dash is a solid line, and would silently promote a
 *  rear-mounted function to the front of its panel. */
const DASH = "3 2.5";

/** Half the gap between the two lines of the secondary-panel rows. 1.6 against
 *  a 1.5 stroke leaves 1.7 units of white between them — 1.9 css px at the size
 *  the gallery renders, which is what keeps a double line from reading as one
 *  thick one. */
const DOUBLE_LINE_OFFSET = 1.6;

function LocationLine({ location, device }: { location: InstrumentLocation; device: InstrumentDevice }) {
  const [count, dashed] = LOCATION_LINES[location];
  if (count === 0) return null;
  const offsets = count === 1 ? [0] : [-DOUBLE_LINE_OFFSET, DOUBLE_LINE_OFFSET];
  return (
    <>
      {offsets.map((dy) => {
        const half = lineHalfWidth(device, Math.abs(dy));
        return (
          <line
            key={dy}
            x1={C - half}
            y1={C + dy}
            x2={C + half}
            y2={C + dy}
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeDasharray={dashed ? DASH : undefined}
          />
        );
      })}
    </>
  );
}

/** Type shrinks with tag length rather than overflowing the outline — the
 *  hexagon is the narrowest shape at the tag's baseline, so it sets these. */
function tagFontSize(len: number) {
  if (len <= 3) return 11;
  if (len === 4) return 9.5;
  return 8;
}

/**
 * POINTED OUTLINES PULL THEIR LETTERING 2.5 UNITS TOWARDS THE CENTRE LINE.
 *
 * A circle is widest on the centre line and stays wide either side of it; a
 * hexagon and a diamond narrow towards their apexes, so what binds is not the
 * tag's width but its width AT ITS CAP LINE. Measured, not estimated: a
 * four-letter tag is 24.32 units wide at font-size 9.5 and its cap line sits
 * 10.63 units above the centre; the hexagon offers 11.68 units of half-width
 * there against the 12.16 needed, the diamond 10.66. Both short.
 *
 * The headroom comes out of GEOMETRY, never out of the type: tag baseline 18 →
 * 20.5, loop baseline 33 → 30.5, still leaving 0.75 units of white either side
 * of the 1.5-unit location line. No font size moved — the smallest rendered
 * lettering on this site measures 11.07 css px against an 11 px floor.
 *
 * THE DOUBLE LINE CLAWS 1.25 OF THAT BACK, and the first render of this matrix
 * is what found it. Two lines at ±1.6 with a 1.5 stroke occupy 19.65..21.15 and
 * 22.85..24.35, so the full 2.5-unit pinch drove the tag's feet 0.85 units INTO
 * the upper stroke and the loop's cap line 0.83 into the lower one — a symbol
 * whose location modifier strikes through its own identification, which is the
 * defect the water P&ID already had to have repaired once. On a secondary-panel
 * bubble the pinch is therefore clamped to 1.25, restoring 0.4 units of white on
 * both sides. The residue: a FOUR-letter tag on a diamond-family bubble with a
 * double line grazes the diamond's edge by 0.29 units — 0.33 css px at the size
 * the gallery renders — because 1.25 is not quite the 2.5 that case wants. Named
 * rather than hidden; the alternative was cutting the type, and the type is the
 * thing that must not move.
 */
const PINCHED_TEXT: ReadonlySet<InstrumentDevice> = new Set(["computer", "plc", "sis"]);
const TAG_BASELINE = 18;
const LOOP_BASELINE = 33;
const PINCH = 2.5;
const PINCH_DOUBLE_LINE = 1.25;

const LOCATION_LABEL: Readonly<Record<InstrumentLocation, Bilingual>> = {
  field: { en: "field mounted", nl: "veldopstelling" },
  panel: {
    en: "front of the main panel, accessible to the operator",
    nl: "voorzijde hoofdpaneel, toegankelijk voor de operator"
  },
  rear: {
    en: "rear of the main panel, not accessible to the operator",
    nl: "achterzijde hoofdpaneel, niet toegankelijk voor de operator"
  },
  "local-panel": {
    en: "front of a secondary or local panel, accessible to the operator",
    nl: "voorzijde van een secundair of lokaal paneel, toegankelijk voor de operator"
  },
  "local-panel-rear": {
    en: "rear of a secondary or local panel, not accessible to the operator",
    nl: "achterzijde van een secundair of lokaal paneel, niet toegankelijk voor de operator"
  }
};

const DEVICE_LABEL: Readonly<Record<InstrumentDevice, Bilingual>> = {
  discrete: { en: "discrete instrument", nl: "discreet instrument" },
  shared: {
    en: "shared display or shared control function",
    nl: "gedeelde weergave- of regelfunctie"
  },
  computer: { en: "computer function", nl: "computerfunctie" },
  plc: { en: "programmable logic control", nl: "programmeerbare logische besturing" },
  sis: {
    en: "function of a safety instrumented system",
    nl: "functie van een veiligheidsinstrumenteel systeem"
  }
};

/**
 * THE MATRIX'S OWN NAMES, EXPORTED, BECAUSE THE GLYPH CANNOT REACH A LOCALE.
 *
 * `GlyphComponent` in ../diagrams/types.ts is a `ComponentType` with NO props,
 * so an `isa/` slug has no channel to receive one and this `<title>` falls back
 * to English. That costs nothing on the gallery route — `Diagram` marks the SVG
 * `aria-hidden` and restates the drawing from the spec's bilingual node labels
 * — but it costs the moment a bubble is used standalone, which is why both
 * languages are exported and `locale` is a real prop rather than a promise.
 */
export const INSTRUMENT_DEVICE_LABEL = DEVICE_LABEL;
export const INSTRUMENT_LOCATION_LABEL = LOCATION_LABEL;

/**
 * The bubble as a `<g>` FRAGMENT in the 44-unit cell, for composing inside a
 * parent canvas — the same contract `ASSET_GLYPHS` has in ./AssetNode.tsx,
 * except the cell is 44 rather than 32. Use `<InstrumentBubble>` below when you
 * want a standalone, sized symbol that owns its own viewBox.
 */
export function InstrumentBubbleGlyph({
  tag,
  loop,
  device = "discrete",
  location = "field",
  locale = "en"
}: Omit<InstrumentBubbleProps, "size">) {
  const parsed = parseIsaTag(tag);
  if (!parsed.valid && !warnedTags.has(tag)) {
    warnedTags.add(tag);
    const why = parsed.unknown.length
      ? `unrecognised letter(s): ${parsed.unknown.join(", ")}`
      : "not two to five uppercase ISA identification letters";
    console.warn(`[instrument-bubble] tag "${tag}" not parsed as ISA-5.1 — ${why}. Drawn as given, meaning withheld.`);
  }
  const meaning = parsed.description ?? tag;
  const label = loop ? `${meaning}, loop ${loop}` : meaning;
  const accessible =
    `${label} — ${pick(DEVICE_LABEL[device], locale)}, ${pick(LOCATION_LABEL[location], locale)}`;
  const tagSize = tagFontSize(tag.length);
  const loopSize = !loop || loop.length <= 4 ? 10 : 8.5;
  const pinch = !PINCHED_TEXT.has(device)
    ? 0
    : LOCATION_LINES[location][0] === 2
      ? PINCH_DOUBLE_LINE
      : PINCH;
  return (
    <g
      role="graphics-symbol img"
      aria-label={accessible}
      data-gfx-meaning={accessible}
      data-isa-tag={tag}
      data-isa-device={device}
      data-isa-location={location}
    >
      <title>{accessible}</title>
      <Outline device={device} />
      <LocationLine device={device} location={location} />
      <text
        x={C}
        y={TAG_BASELINE + pinch}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={tagSize}
        letterSpacing="0.04em"
        fill="currentColor"
      >
        {tag}
      </text>
      {loop && (
        <text
          x={C}
          y={LOOP_BASELINE - pinch}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={loopSize}
          letterSpacing="0.04em"
          fill="currentColor"
        >
          {loop}
        </text>
      )}
    </g>
  );
}

/**
 * A standalone instrument bubble at a real pixel size. The 44px floor is not a
 * style preference: below it the tag letters — the only thing distinguishing one
 * bubble from another — stop being readable, and the symbol silently degrades
 * back into the interchangeable circle this component exists to replace.
 */
export function InstrumentBubble({ size = BUBBLE_CELL, ...rest }: InstrumentBubbleProps) {
  const px = Math.max(BUBBLE_CELL, size);
  return (
    <svg width={px} height={px} viewBox={`0 0 ${BUBBLE_CELL} ${BUBBLE_CELL}`} role="img" focusable="false">
      <InstrumentBubbleGlyph {...rest} />
    </svg>
  );
}
