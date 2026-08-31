/**
 * OT NOTATION — HAND-DRAWN, BECAUSE NO STENCIL LIBRARY SHIPS THESE.
 *
 * The 9,532 converted stencils were searched before a line of this was drawn:
 * zero Purdue level bands, zero IEC 62443 zone/conduit notation, zero C4
 * notation. `PURDUE|DMZ|LEVEL_0-5` returns 0 hits; all 17 registry "zone" hits
 * are cloud availability-zones. Data diode and SIS exist only as base64 raster
 * inside the CISA CSET set, which is unusable as vector. So these are drawn by
 * hand, in the same idiom as ./drawio-glyphs.tsx and ./AssetNode.tsx.
 *
 * NOT A DUPLICATE OF ../assurance/iec-62443/zone-stack.tsx, which is one page's
 * figure, built from divs and bound to that page's content module.
 *
 * HOUSE STYLE, BINDING. Every export is a `<g>` fragment, never a standalone
 * `<svg>` — the caller owns the viewBox, as ./drawio-glyphs.tsx documents.
 * `stroke="currentColor"`, `fill="none"`, one weight (`STROKE = 1.3`), geometry
 * inside the 22-unit live area (5..27) of the 32-unit cell. No `--signal-*`
 * token is touched: those carry model state, not chrome.
 *
 * TWO CATEGORIES, AND THE DIFFERENCE MATTERS. The MARKS — the C4 shapes,
 * `SecurityLevel`, `DataDiode`, `AirGap`, `SafetyInstrumentedSystem`,
 * `SilBand`, `VotingMark` — have fixed geometry in the 32-unit cell. The
 * REGIONS AND CHANNELS — `PurdueBand`, `PurdueStack`, `ZonePerimeter`,
 * `SystemBoundary`, `Conduit` — are sized by what they enclose, the way
 * ./ZoneBand.tsx already takes x/y/width/height, but each still DEFAULTS to the
 * 22-unit live area, so a bare `<ZonePerimeter />` fits the cell and can be
 * measured against it. The only `fill` anywhere is `MONO_LABEL` on `<text>`;
 * all drawn geometry fills none, and a label is suppressed below the size at
 * which it would be illegible rather than drawn as a smudge.
 *
 * NOTHING HERE INVENTS A CLASSIFICATION MARKING, A CAVEAT STRING, A TAG NUMBER
 * OR A CLAUSE NUMBER. `SecurityLevel` draws a tally, not the text "SL-T 3"; the
 * caller supplies any wording. Where a standard genuinely has no symbol for a
 * thing (SIS, below) that is said out loud rather than papered over.
 */

/** One weight for everything, per the Visual Foundation Spec's line-drawn rule;
 *  DETAIL is hatching, tallies and rails, a step lighter so it reads as texture. */
const STROKE = 1.3;
const DETAIL = 0.9;

/**
 * ISO 128 line types, used for their published meanings rather than invented:
 * long-dash/short-dash ("chain thin") indicates a LIMITED AREA — the correct
 * line for a security zone boundary — while an even dash is a plain grouping.
 * Keeping them different is what stops an IEC 62443 zone and a C4 boundary from
 * looking identical once colour is off the table.
 */
const DASH_ZONE = "5 2 1 2";
const DASH_GROUP = "4 3";

/** The ONLY paint in this file, and it is on `<text>`: a label has to be filled,
 *  not stroked. Named once so "all drawn geometry fills none" stays auditable at
 *  a glance — every `fill` outside this constant is `fill="none"`. */
const MONO_LABEL = { fontFamily: "var(--font-mono)", letterSpacing: "0.06em", fill: "currentColor" } as const;

const warned = new Set<string>();
function warnOnce(key: string, message: string) {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(message);
}

/* ------------------------------------------------------------------ 1.1 Purdue */

/** 3.5 is the DMZ — a real half-level in the Purdue reference model, not a fudge. */
export type PurdueLevel = 0 | 1 | 2 | 3 | 3.5 | 4 | 5;

export interface PurdueBandProps {
  level: PurdueLevel;
  /** The level's name only — "Field devices". The `L0` prefix is drawn from `level`. */
  label: string;
  x?: number; y?: number; width?: number; height?: number;
  /** Distance from `x` to the label's left edge. Defaults to this band's own
   *  rail width; `PurdueStack` passes the widest rail in the stack instead, so
   *  seven labels start on one line rather than stepping raggedly rightwards. */
  labelOffset?: number;
}

/** Monotonic in level, and PROPORTIONAL TO BAND HEIGHT rather than absolute. An
 *  earlier revision used a fixed 1.5 + 0.9·level: legible in the 32-unit cell,
 *  then collapsed at working size, where a 1.5-unit L0 rail against a 324-unit
 *  band made the level step invisible — real only at the size it was checked at. */
function railWidth(level: PurdueLevel, height: number) {
  return height * (0.25 + level * 0.1);
}

/**
 * ONE PURDUE LEVEL AS A BAND, NOT AN ICON. A level is a horizontal region that
 * assets sit inside; drawing it as a 32-unit pictogram would be a category
 * error. The left rail is the level's identity — wider and more densely hatched
 * the higher the level, so position, label and rail step give three non-colour
 * channels. The DMZ rail takes the zone dash and no hatch instead: it is a
 * boundary band between L3 and L4, not a level, and should not read as one.
 */
export function PurdueBand({ level, label, x = 5, y = 5, width = 22, height = 6, labelOffset }: PurdueBandProps) {
  const rail = railWidth(level, height);
  const isDmz = level === 3.5;
  const font = Math.min(height * 0.44, 11);
  // Hatch COUNT is the level itself. Deriving it from a fixed pitch made L1 and
  // L2 both draw two strokes and L3 and L4 three — a step that skips is no step.
  const hatchCount = isDmz ? 0 : Math.round(level) + 1;
  const hatch = Array.from({ length: hatchCount }, (_, i) => x + (rail * (i + 1)) / (hatchCount + 1));
  const text = `L${level} ${label}`.toUpperCase();
  return (
    <g role="group" aria-label={text} data-purdue-level={level} data-gfx-meaning={text}>
      <title>{text}</title>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeDasharray={isDmz ? DASH_ZONE : undefined}
      />
      <rect
        x={x}
        y={y}
        width={rail}
        height={height}
        fill="none"
        stroke="currentColor"
        strokeWidth={DETAIL}
        strokeDasharray={isDmz ? DASH_ZONE : undefined}
      />
      {hatch.map((hx) => (
        <line key={hx} x1={hx} y1={y} x2={hx} y2={y + height} stroke="currentColor" strokeWidth={DETAIL} />
      ))}
      {/* Suppressed, not shrunk to a smudge: the 6-unit default band has no room
          for type, and the rail step, position and <title> still identify it. */}
      {font >= 4.5 && (
        <text x={x + (labelOffset ?? rail) + font * 0.5} y={y + height / 2 + font * 0.36} fontSize={font} {...MONO_LABEL}>
          {text}
        </text>
      )}
    </g>
  );
}

/** The reference model's own order: enterprise at the top, field at the bottom. */
export const PURDUE_LEVELS: readonly { level: PurdueLevel; label: string }[] = [
  { level: 5, label: "Cloud" },
  { level: 4, label: "Enterprise" },
  { level: 3.5, label: "DMZ" },
  { level: 3, label: "Site operations" },
  { level: 2, label: "Supervisory control" },
  { level: 1, label: "Basic control" },
  { level: 0, label: "Field devices" }
];

export interface PurdueStackProps {
  levels?: readonly { level: PurdueLevel; label: string }[];
  x?: number; y?: number; width?: number; bandHeight?: number; gap?: number;
}

/** Stacks bands top-down. Ordering is the primary non-colour channel, so this
 *  never sorts or reverses its input; the default is the reference model's. */
export function PurdueStack({
  levels = PURDUE_LEVELS,
  x = 5,
  y = 5,
  width = 22,
  bandHeight = 2.4,
  gap = 0.7
}: PurdueStackProps) {
  const labelOffset = Math.max(...levels.map((l) => railWidth(l.level, bandHeight)));
  return (
    <g role="group" aria-label="Purdue reference model levels">
      {levels.map((l, i) => (
        <PurdueBand
          key={l.level}
          level={l.level}
          label={l.label}
          x={x}
          y={y + i * (bandHeight + gap)}
          width={width}
          height={bandHeight}
          labelOffset={labelOffset}
        />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------- 1.2 IEC 62443 */

export interface ZonePerimeterProps {
  x?: number; y?: number; width?: number; height?: number;
  /** Optional zone name. Drawn only when there is room for legible type. */
  label?: string;
  /** The assets the zone encloses. A zone with nothing inside it is a rectangle. */
  children?: React.ReactNode;
}

/**
 * A SECURITY ZONE: a perimeter that ENCLOSES assets. ISO 128's limited-area
 * line (long-dash/short-dash) keeps it distinguishable from the plain-dash C4
 * `SystemBoundary` without colour. Square corners — the softer rounded grouping
 * rect is already spoken for by ./ZoneBand.tsx.
 */
export function ZonePerimeter({ x = 5, y = 5, width = 22, height = 22, label, children }: ZonePerimeterProps) {
  const font = Math.min(height * 0.13, 10);
  const name = label ? `Security zone: ${label}` : "Security zone";
  return (
    <g role="group" aria-label={name} data-gfx-meaning={name}>
      <title>{name}</title>
      <rect x={x} y={y} width={width} height={height} fill="none" stroke="currentColor" strokeWidth={STROKE} strokeDasharray={DASH_ZONE} />
      {label && font >= 5 && (
        <text x={x + font * 0.9} y={y + font * 1.9} fontSize={font} {...MONO_LABEL}>
          {label.toUpperCase()}
        </text>
      )}
      {children}
    </g>
  );
}

export interface ConduitProps {
  x1?: number; y1?: number; x2?: number; y2?: number;
  /** Half-width of the channel. */
  gauge?: number;
}

/**
 * A CONDUIT: the controlled channel crossing between two zones. Two parallel
 * rails, not one line, because a conduit groups communications rather than
 * being a single link; the perpendicular bars at the midpoint are the control
 * point on the crossing. Deliberately undirected — a conduit is not an arrow,
 * and drawing one would assert a direction the notation does not carry. Use
 * `DataDiode` when the flow really is one-way.
 */
export function Conduit({ x1 = 5, y1 = 16, x2 = 27, y2 = 16, gauge = 1.6 }: ConduitProps) {
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const mid = len / 2;
  return (
    <g role="graphics-symbol img" aria-label="Conduit" data-gfx-meaning="Conduit" transform={`translate(${x1} ${y1}) rotate(${angle})`} >
      <title>Conduit</title>
      <line x1={0} y1={-gauge} x2={len} y2={-gauge} stroke="currentColor" strokeWidth={STROKE} />
      <line x1={0} y1={gauge} x2={len} y2={gauge} stroke="currentColor" strokeWidth={STROKE} />
      <line x1={mid - 1.5} y1={-gauge} x2={mid - 1.5} y2={gauge} stroke="currentColor" strokeWidth={STROKE} />
      <line x1={mid + 1.5} y1={-gauge} x2={mid + 1.5} y2={gauge} stroke="currentColor" strokeWidth={STROKE} />
    </g>
  );
}

export type SecurityLevelTarget = 1 | 2 | 3 | 4;

/**
 * SECURITY LEVEL, 1..4, AS A TALLY — NOT AS TEXT. IEC 62443 numbers security
 * levels 1 to 4 and defines no graphic for them. A tally of upright strokes is
 * ordinal, reads without colour, and invents no marking: it does not write
 * "SL-T 3", add a caveat, or imply a certification. Wording is the caller's.
 *
 * THE POINTED TAG IS NOT DECORATION. The first revision was a rounded rectangle
 * around the tally, and on the contact sheet it was indistinguishable at 32px
 * from `SilBand` — two markers from two different standards reading as the same
 * barcode box. Now a security level points; a safety integrity level is a bar.
 */
export function SecurityLevel({ target }: { target: SecurityLevelTarget }) {
  const n = Math.min(4, Math.max(1, Math.round(target)));
  if (n !== target) {
    warnOnce(`sl-${target}`, `[ot-notation] SecurityLevel target ${target} is outside 1..4; drawn as ${n}.`);
  }
  const pitch = 3;
  const start = 14 - ((n - 1) * pitch) / 2;
  return (
    <g role="graphics-symbol img" aria-label={`Security level ${n}`} data-gfx-meaning={`Security level ${n}`}>
      <title>{`Security level ${n}`}</title>
      <path d="M5 9 H22 L27 16 L22 23 H5 Z" fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round" />
      {Array.from({ length: n }, (_, i) => (
        <line key={i} x1={start + i * pitch} y1={12.5} x2={start + i * pitch} y2={19.5} stroke="currentColor" strokeWidth={STROKE} />
      ))}
    </g>
  );
}

/* -------------------------------------------------------------------- 1.3 C4 */

/**
 * C4 distinguishes Person / System / Container / Component by COLOUR AND LABEL
 * and almost nothing else — the latter three are plain rectangles in the
 * reference notation. Colour is unavailable here, so each borrows an
 * established primitive rather than a tint: ISO 5807's predefined-process bars
 * for a Container, UML's tabs for a Component. Unbranded — no C4 house colours,
 * no logotype, no "[Software System]" caption baked into the geometry.
 */
export function Person() {
  return (
    <g role="graphics-symbol img" aria-label="Person" data-gfx-meaning="Person">
      <title>Person</title>
      <circle cx={16} cy={9.5} r={4} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      <path d="M7 27 V23 A9 9 0 0 1 25 23 V27" fill="none" stroke="currentColor" strokeWidth={STROKE} />
    </g>
  );
}

export function SoftwareSystem() {
  return (
    <g role="graphics-symbol img" aria-label="Software system" data-gfx-meaning="Software system">
      <title>Software system</title>
      <rect x={5} y={8} width={22} height={16} rx={1} fill="none" stroke="currentColor" strokeWidth={STROKE} />
    </g>
  );
}

export function Container() {
  return (
    <g role="graphics-symbol img" aria-label="Container" data-gfx-meaning="Container">
      <title>Container</title>
      <rect x={5} y={8} width={22} height={16} rx={1} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      <line x1={8.5} y1={8} x2={8.5} y2={24} stroke="currentColor" strokeWidth={STROKE} />
      <line x1={23.5} y1={8} x2={23.5} y2={24} stroke="currentColor" strokeWidth={STROKE} />
    </g>
  );
}

export function Component() {
  return (
    <g role="graphics-symbol img" aria-label="Component" data-gfx-meaning="Component">
      <title>Component</title>
      <rect x={8} y={8} width={19} height={16} rx={1} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      <rect x={5} y={11} width={6} height={3.5} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      <rect x={5} y={17.5} width={6} height={3.5} fill="none" stroke="currentColor" strokeWidth={STROKE} />
    </g>
  );
}

export interface SystemBoundaryProps {
  x?: number; y?: number; width?: number; height?: number;
  children?: React.ReactNode;
}

/** A C4 system boundary. Plain even dash and rounded corners — deliberately NOT
 *  the `ZonePerimeter` line, so an architecture grouping is never mistaken for a
 *  62443 security zone in the same drawing. */
export function SystemBoundary({ x = 5, y = 5, width = 22, height = 22, children }: SystemBoundaryProps) {
  return (
    <g role="group" aria-label="System boundary" data-gfx-meaning="System boundary">
      <title>System boundary</title>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={2}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeDasharray={DASH_GROUP}
      />
      {children}
    </g>
  );
}

/* --------------------------------------------- 1.4 Diode, air gap, SIS, SIL, voting */

/**
 * A UNIDIRECTIONAL GATEWAY, drawn as what it is named after: the electronic
 * diode — triangle into a bar. Nothing needed inventing; it already exists in
 * electrical notation and reads to anyone who has seen a circuit diagram.
 * Direction is in the geometry, so it needs no arrowhead and no legend.
 */
export function DataDiode() {
  return (
    <g role="graphics-symbol img" aria-label="Data diode, unidirectional gateway" data-gfx-meaning="Data diode">
      <title>Data diode — unidirectional gateway</title>
      <line x1={5} y1={16} x2={8} y2={16} stroke="currentColor" strokeWidth={STROKE} />
      <path d="M8 8 L8 24 L22 16 Z" fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round" />
      <line x1={22} y1={8} x2={22} y2={24} stroke="currentColor" strokeWidth={STROKE} />
      <line x1={22} y1={16} x2={27} y2={16} stroke="currentColor" strokeWidth={STROKE} />
    </g>
  );
}

/**
 * AN AIR GAP: two terminated runs that do not meet, with ISO 128's break line
 * through the discontinuity. The terminal bars matter — plain stubs with a space
 * between read as an unfinished drawing, terminated ends as a deliberate stop.
 */
export function AirGap() {
  return (
    <g role="graphics-symbol img" aria-label="Air gap" data-gfx-meaning="Air gap">
      <title>Air gap</title>
      <line x1={5} y1={16} x2={12} y2={16} stroke="currentColor" strokeWidth={STROKE} />
      <line x1={12} y1={11.5} x2={12} y2={20.5} stroke="currentColor" strokeWidth={STROKE} />
      <line x1={20} y1={16} x2={27} y2={16} stroke="currentColor" strokeWidth={STROKE} />
      <line x1={20} y1={11.5} x2={20} y2={20.5} stroke="currentColor" strokeWidth={STROKE} />
      <path d="M16 6 L14.2 10 L17.8 14 L14.2 18 L17.8 22 L16 26" fill="none" stroke="currentColor" strokeWidth={DETAIL} />
    </g>
  );
}

/**
 * A SAFETY INSTRUMENTED SYSTEM, AND THE HONEST CAVEAT WITH IT. ISA-5.1 shapes
 * the LOGIC SOLVER — a diamond inscribed in a square — but defines no dedicated
 * SIS symbol; safety systems are identified by tag letters and by being drawn
 * segregated, not by a special outline. So this composes two real conventions,
 * the logic-solver form inside an outer segregation boundary, rather than
 * inventing a shape or stamping an "S" that would read as a tag prefix.
 */
export function SafetyInstrumentedSystem() {
  return (
    <g role="graphics-symbol img" aria-label="Safety instrumented system" data-gfx-meaning="Safety instrumented system">
      <title>Safety instrumented system</title>
      <rect x={5} y={5} width={22} height={22} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      <rect x={8} y={8} width={16} height={16} fill="none" stroke="currentColor" strokeWidth={DETAIL} />
      <path d="M16 8 L24 16 L16 24 L8 16 Z" fill="none" stroke="currentColor" strokeWidth={STROKE} />
    </g>
  );
}

export type Sil = 1 | 2 | 3 | 4;

/**
 * A SIL BAND, 1..4. Four equal cells; the first `sil` are hatched. Ordinal
 * without colour or opacity — `CriticalityMark`'s solid/hollow discipline in
 * ./AssetNode.tsx, hatched so it stays stroke-only. Draws the cells reached and
 * nothing else: no certificate marking, no clause number, no "SIL-rated" claim.
 */
export function SilBand({ sil }: { sil: Sil }) {
  const n = Math.min(4, Math.max(1, Math.round(sil)));
  if (n !== sil) warnOnce(`sil-${sil}`, `[ot-notation] SilBand sil ${sil} is outside 1..4; drawn as ${n}.`);
  const cell = 5.5;
  return (
    <g role="graphics-symbol img" aria-label={`Safety integrity level ${n}`} data-gfx-meaning={`SIL ${n}`}>
      <title>{`Safety integrity level ${n}`}</title>
      <rect x={5} y={12} width={22} height={8} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      {[1, 2, 3].map((i) => (
        <line key={i} x1={5 + i * cell} y1={12} x2={5 + i * cell} y2={20} stroke="currentColor" strokeWidth={DETAIL} />
      ))}
      {Array.from({ length: n }, (_, i) => 5 + i * cell).flatMap((x0) =>
        [0.9, 2.4, 3.9].map((o) => (
          <line key={`${x0}-${o}`} x1={x0 + o} y1={20} x2={x0 + o + 1.6} y2={12} stroke="currentColor" strokeWidth={DETAIL} />
        ))
      )}
    </g>
  );
}

/** "2oo3" and friends. A string builder, so a caller can render the conventional
 *  text label beside the mark while the mark itself stays text-free. */
export function votingLabel(m: number, n: number) {
  return `${m}oo${n}`;
}

/**
 * MooN VOTING. The block carries the fraction as a tally over a rule — m
 * strokes above, n below — which is literally what "m out of n" means and needs
 * no glossary. Input and output stubs let it wire into a loop drawing.
 */
export function VotingMark({ m, n }: { m: number; n: number }) {
  const nn = Math.min(4, Math.max(1, Math.round(n)));
  const mm = Math.min(nn, Math.max(1, Math.round(m)));
  if (nn !== n || mm !== m) {
    warnOnce(`vote-${m}-${n}`, `[ot-notation] VotingMark ${m}oo${n} is not a supported MooN (1 <= m <= n <= 4); drawn as ${mm}oo${nn}.`);
  }
  const tally = (count: number, y1: number, y2: number) =>
    Array.from({ length: count }, (_, i) => {
      const x = 18 - ((count - 1) * 2.2) / 2 + i * 2.2;
      return <line key={`${y1}-${i}`} x1={x} y1={y1} x2={x} y2={y2} stroke="currentColor" strokeWidth={DETAIL} />;
    });
  return (
    <g role="graphics-symbol img" aria-label={`${votingLabel(mm, nn)} voting`} data-gfx-meaning={`${votingLabel(mm, nn)} voting`} >
      <title>{`${mm} out of ${nn} voting`}</title>
      <line x1={5} y1={16} x2={13} y2={16} stroke="currentColor" strokeWidth={STROKE} />
      <rect x={13} y={8} width={10} height={16} rx={1} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      <line x1={14.4} y1={16} x2={21.6} y2={16} stroke="currentColor" strokeWidth={STROKE} />
      {tally(mm, 10, 14)}
      {tally(nn, 18, 22)}
      <line x1={23} y1={16} x2={27} y2={16} stroke="currentColor" strokeWidth={STROKE} />
    </g>
  );
}

/** The fixed-geometry, zero-prop marks, so a legend or contact sheet can iterate
 *  them without knowing each one's props. Regions, channels and the
 *  parameterised marks are excluded on purpose. */
export const OT_CELL_SYMBOLS: Record<string, () => React.JSX.Element> = {
  person: Person,
  "software-system": SoftwareSystem,
  container: Container,
  component: Component,
  "data-diode": DataDiode,
  "air-gap": AirGap,
  "safety-instrumented-system": SafetyInstrumentedSystem
};
