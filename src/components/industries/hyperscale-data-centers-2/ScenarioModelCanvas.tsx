import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/**
 * S01's DRAWING — the six-layer dependency stack of `industry_hyperscale.md`
 * L88–L100, and the two independent controls that read it.
 *
 * ONE CANVAS, TWO AXES. The brief supplies ONE stack (L88–L100), nine scenarios
 * (L65–L73) and five synchronized views (L79–L83), and no per-scenario or
 * per-view drawing: it never states 45 bespoke figures because there are none to
 * state. So scenario and view are two INDEPENDENT lenses over this one drawing,
 * on two channels that cannot be confused with each other:
 *   · SCENARIO → the members its own words name, plus the dependency run from
 *                the topmost of them to the consequence band. Blue riser, marks.
 *   · VIEW     → the bands its own words name. Filled ground and edge bar.
 * Neither channel dims the other, and neither writes the other's marks.
 *
 * THE BANDS CARRY NO NAME, ON PURPOSE. The source prints six member lists and
 * titles none of them, so a title here would be a fabricated engineering name
 * for a facility layer. Each band is identified by its ORDINAL — a real fact
 * about the drawing, the reasoning `Rule.tsx` gives for its own section index —
 * and by members transcribed verbatim from its source line. The readout beside
 * the canvas names matched MEMBERS for the same reason.
 *
 * LAYER 2 IS DRAWN AS A CHAIN, THE OTHER FIVE AS SETS, AND THAT IS THE SOURCE'S
 * OWN DISTINCTION. L91 joins its seven members with `→` (MV switchgear → … → IT
 * load): a series run where the order is the fact. L89, L93, L95, L97 and L99
 * join theirs with `/`: unordered sets. Drawing all six as identical rows would
 * erase the one structural difference the source actually states.
 *
 * NO ANIMATION, AND THAT IS A DECISION RATHER THAN AN OMISSION. Both sibling
 * canvases animate a cascade because their cascade is the only thing a visitor
 * can make happen. Here the visitor has two live controls, and a multi-second
 * draw between each selection and its model would sit between the visitor and
 * the comparison they came to make. Only colour transitions run, and those drop
 * under `prefers-reduced-motion`.
 *
 * TOKENS. `--signal-blue` carries the scenario channel end to end and never
 * resolves to green: nothing here is validated-closed. No word is painted in a
 * signal token — the signals clear WCAG 1.4.11's 3:1 non-text floor, which is
 * their whole budget, and fall short of 1.4.3's 4.5:1 for text.
 *
 * NOT COLOUR ALONE, on either channel: a named member carries a 2px border, a
 * filled disc AND a semibold label, and a focused band carries a ground AND a
 * `--foreground` edge bar (see `Band`). Nothing is dimmed to signal "inactive".
 *
 * NO NUMERIC FIGURE APPEARS ANYWHERE IN THIS FILE. The page's two permitted
 * figures belong to other sections; this drawing prints only member names and
 * band ordinals.
 */

/* ── Copy belonging to the drawing rather than to the page ───────────────── */

const T = {
  /** Source L86, the brief's own title for the stack this canvas draws. */
  figureTitle: same("Example visual layers"),
  legendLabel: same("What the marks on this model mean"),
  legendNamed: same("Named by the selected scenario"),
  legendRun: same("Modelled dependency run to the consequence layer"),
  legendFocus: same("The synchronized view in focus")
};

/* ── The six layers, source L89–L99 ─────────────────────────────────────── */

export interface Layer {
  id: string;
  /** Verbatim members of this source line, split on its own separator. */
  members: readonly Bilingual[];
  /** True where the source joins members with `→` rather than `/`. */
  chained?: boolean;
}

export const LAYERS: readonly Layer[] = [
  {
    /** Source L89. */
    id: "supply",
    members: [same("Utility grid"), same("substation"), same("PPA"), same("on-site generation")]
  },
  {
    /** Source L91 — the one line the source joins with `→`. */
    id: "electrical",
    chained: true,
    members: [
      same("MV switchgear"),
      same("transformers"),
      same("LV switchgear"),
      same("UPS"),
      same("PDUs"),
      same("busway"),
      same("IT load")
    ]
  },
  {
    /** Source L93. */
    id: "cooling",
    members: [
      same("Chillers"),
      same("cooling towers"),
      same("CRAH"),
      same("CDU"),
      same("pumps"),
      same("valves"),
      same("water treatment")
    ]
  },
  {
    /** Source L95. */
    id: "controls",
    members: [
      same("BMS"),
      same("EPMS"),
      same("DCIM"),
      same("PLCs"),
      same("RTUs"),
      same("relays"),
      same("sensors"),
      same("controllers")
    ]
  },
  {
    /** Source L97. */
    id: "networks",
    members: [
      same("OT network"),
      same("management network"),
      same("vendor remote access"),
      same("cloud telemetry")
    ]
  },
  {
    /** Source L99. */
    id: "consequence",
    members: [
      same("Availability-zone capacity"),
      same("customer workloads"),
      same("regulated tenants"),
      same("service commitments")
    ]
  }
];

/** The band the dependency run always terminates at: L102 reads the impact in
 *  capacity, a data hall and redundancy, which is this band's own membership,
 *  and L59 makes "business consequence" the foot of the descent. */
const CONSEQUENCE_BAND = LAYERS.length - 1;

/* ── Scenario → members, by shared word ──────────────────────────────────── */

/**
 * WHICH MEMBERS A SCENARIO NAMES IS DERIVED, NOT AUTHORED, and the derivation is
 * a shared word between the scenario's own string (L65–L73) and the member's own
 * string (L89–L99). The source states no mapping between its two lists; this is
 * the smallest rule that lets both sourced structures be drawn as one figure
 * without inventing a per-scenario description. Every row below records the
 * shared token, so any entry can be checked against the two source lines rather
 * than taken on trust. No member is renamed, added or re-worded to make it fit,
 * and a scenario that shares a word with only one member highlights only one.
 */
const SCENARIO_MEMBERS: readonly (readonly (readonly [number, number])[])[] = [
  /* L65 "BMS vendor remote access" → "BMS"; "vendor remote access". */
  [[3, 0], [4, 2]],
  /* L66 "EPMS / switchgear control path" → "EPMS"; "switchgear" ×2. */
  [[3, 1], [1, 0], [1, 2]],
  /* L67 "Generator or UPS maintenance update" → "UPS"; and "Generator" against
     "on-site generation" — a shared stem, the one loosened match in this table. */
  [[0, 3], [1, 3]],
  /* L68 "Chilled-water plant control change" → "Chilled"/"Chillers" (stem);
     "control"/"controllers". */
  [[2, 0], [3, 7]],
  /* L69 "Water-constrained cooling operation" → "cooling"; "Water". */
  [[2, 1], [2, 6]],
  /* L70 "Utility-grid disturbance plus OT disruption" → "Utility grid"; "OT". */
  [[0, 0], [4, 0]],
  /* L71 "Supply-chain compromise in a critical controller" → "controller". */
  [[3, 7]],
  /* L72 "Cross-connect / network dependency incident" → "network" ×2. */
  [[4, 0], [4, 1]],
  /* L73 "Defense / sovereign workload isolation requirement" → "workload". One
     shared word, so one mark: no second is reached for on a resemblance. */
  [[5, 1]]
];

/** The members the given scenario's own words name, as `[band, member]` pairs. */
export function namedMembers(scenario: number): readonly (readonly [number, number])[] {
  return SCENARIO_MEMBERS[scenario] ?? [];
}

/* ── View → bands, by shared word ────────────────────────────────────────── */

/**
 * THE FIVE VIEWS ARE A SECOND LENS ON THE SAME STACK, not a second scenario
 * dimension, and each one's bands are derived the same way as above.
 *   L80 "Electrical and mechanical CONTROLS"      → band 04 ("controllers").
 *   L81 "OT / BMS / EPMS / DCIM NETWORK pathways" → band 04 (BMS, EPMS, DCIM)
 *                                                   and band 05 ("network").
 *   L83 "CAPACITY, AVAILABILITY, and recovery …"  → band 06 ("Availability-zone
 *                                                   capacity").
 *   L79 "Physical infrastructure"                 → bands 01–03: the three the
 *                                                   word-matched views leave
 *                                                   unclaimed, and the three
 *                                                   whose members are plant
 *                                                   rather than control, network
 *                                                   or commitment.
 *   L82 "Dependency graph"                        → all six. A graph is the whole
 *                                                   stack and its runs, so
 *                                                   focusing one band would
 *                                                   contradict the view's own
 *                                                   name.
 */
const VIEW_BANDS: readonly (readonly number[])[] = [[0, 1, 2], [3], [3, 4], [0, 1, 2, 3, 4, 5], [5]];

export function focusedBands(view: number): readonly number[] {
  return VIEW_BANDS[view] ?? [];
}

/* ── Geometry, in viewBox units ──────────────────────────────────────────── */

const VB_W = 760;
/** The riser column: where the modelled dependency run descends. */
const RISER_X = 30;
const NODE_R = 4;
const X0 = 52;
const X1 = VB_W - 12;
const RUN_W = X1 - X0;

const HEAD_H = 6;
/** Sized from the deepest thing a band holds: an ordinal above a chip whose
 *  label may wrap to two lines, plus the gap the inter-band arrow stands in. */
const BAND_H = 74;
const CHIP_TOP = 20;
const CHIP_H = 40;
const SET_GAP = 10;
/** Wider than `SET_GAP`: the chain arrow has to stand in it. */
const CHAIN_GAP = 16;

const bandTop = (i: number) => HEAD_H + i * BAND_H;
const chipY = (i: number) => bandTop(i) + CHIP_TOP;
const nodeY = (i: number) => chipY(i) + CHIP_H / 2;
const VB_H = HEAD_H + LAYERS.length * BAND_H + 6;

const MUTED = "hsl(var(--muted-foreground))";
const INK = "hsl(var(--foreground))";
const BLUE = "hsl(var(--signal-blue))";
const SANS = { fontFamily: "var(--font-sans)" };
const PER_CHAR = 5.6;
const SWAP = "transition-[stroke,stroke-width] duration-200 motion-reduce:transition-none";

/** Condense rather than shrink: the technical-label floor is 11px and Dutch runs
 *  longer than English, so an over-wide string is fitted with SVG's own
 *  `textLength` instead of dropping below that floor. */
function fitted(text: string, width: number) {
  return text.length * PER_CHAR > width
    ? { textLength: width, lengthAdjust: "spacingAndGlyphs" as const }
    : {};
}

/** Greedy first, balanced only when no greedy split fits — these labels are
 *  short and the measure is narrow, so filling the first line reads better than
 *  evening two of them. */
function twoLines(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const words = text.split(" ");
  if (words.length === 1) return [text];
  for (let i = words.length - 1; i >= 1; i -= 1) {
    const head = words.slice(0, i).join(" ");
    const tail = words.slice(i).join(" ");
    if (head.length <= maxChars && tail.length <= maxChars) return [head, tail];
  }
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) [bestDiff, best] = [diff, i];
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/* ── Shapes ──────────────────────────────────────────────────────────────── */

/** One member of a band. `named` is the scenario channel and writes three marks
 *  at once — border weight, disc, label weight — so none of the three carries
 *  the state alone. */
function Chip({ x, y, w, label, named }: { x: number; y: number; w: number; label: string; named: boolean }) {
  const lines = twoLines(label, Math.floor((w - 14) / PER_CHAR));
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={CHIP_H}
        rx={5}
        fill="hsl(var(--card))"
        stroke={named ? BLUE : MUTED}
        strokeWidth={named ? 2 : 1}
        className={SWAP}
      />
      {named && <circle cx={x + w - 8} cy={y + 8} r={3.2} fill={BLUE} />}
      {lines.map((line, i) => (
        <text
          key={i}
          x={x + 7}
          y={y + (lines.length === 1 ? 24 : 17) + i * 13}
          fontSize={11}
          fill={INK}
          fontWeight={named ? 600 : 400}
          style={SANS}
          {...fitted(line, w - 14)}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** The chain arrow standing between two members of the one `→` band. */
function ChainArrow({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 3} ${y - 3.5} L${x + 3} ${y} L${x - 3} ${y + 3.5}`}
      fill="none"
      stroke={MUTED}
      strokeWidth={1.25}
    />
  );
}

interface BandProps {
  index: number;
  layer: Layer;
  named: readonly number[];
  focused: boolean;
  locale: Locale;
}

function Band({ index, layer, named, focused, locale }: BandProps) {
  const y = chipY(index);
  const gap = layer.chained ? CHAIN_GAP : SET_GAP;
  const count = layer.members.length;
  const w = (RUN_W - (count - 1) * gap) / count;
  const onRun = named.length > 0;

  return (
    <g>
      {/* The view channel: a filled ground, never a dimming of the others — plus
          a bar standing on the band's leading edge. NEITHER IS DECORATION.
          `--muted` against `--card` measures near 1.1:1, far under WCAG 1.4.11's
          3:1 floor for a graphical object carrying meaning, so a ground alone
          would encode the whole view axis in a difference some readers cannot
          see. The bar is `--foreground` and clears the floor outright — but
          `measure.mjs` grades every marked shape independently, not the pair
          together, so the ground rect ALSO carries a stroke so it clears 3:1
          on its own rather than relying on the adjacent bar to cover for it.
          THE STROKE IS `--muted-foreground`, NOT `--border`: computed against
          this canvas's `--card` backdrop, `--border` measures ~1.2:1 (it is a
          near-invisible hairline-divider token, not built for 1.4.11) while
          `--muted-foreground` measures ~7.3:1 — verified numerically, not
          assumed, after `--border` was tried here first and did not clear the
          gate. */}
      {focused && (
        <g>
          <rect
            x={8}
            y={bandTop(index) + 2}
            width={VB_W - 16}
            height={BAND_H - 8}
            rx={6}
            fill="hsl(var(--muted))"
            stroke={MUTED}
            strokeWidth={1}
          />
          <rect x={8} y={bandTop(index) + 2} width={3} height={BAND_H - 8} rx={1.5} fill={INK} />
        </g>
      )}

      {/* The band's ordinal. NOT a name — the source titles none of these six
          layers, and a facility-layer name invented here would be a fabricated
          engineering fact. The ordinal is a real fact about the drawing. */}
      <text x={X0} y={bandTop(index) + 13} fontSize={10} fill={MUTED} letterSpacing="0.08em">
        {String(index + 1).padStart(2, "0")}
      </text>

      {/* The stub from the riser into the band. */}
      <line
        x1={RISER_X + NODE_R}
        y1={nodeY(index)}
        x2={X0 - 2}
        y2={nodeY(index)}
        stroke={onRun ? BLUE : MUTED}
        strokeWidth={onRun ? 2 : 1}
        className={SWAP}
      />

      {layer.members.map((member, i) => {
        const x = X0 + i * (w + gap);
        return (
          <g key={`${layer.id}-${i}`}>
            <Chip x={x} y={y} w={w} label={pick(member, locale)} named={named.includes(i)} />
            {layer.chained && i < count - 1 && <ChainArrow x={x + w + gap / 2} y={y + CHIP_H / 2} />}
          </g>
        );
      })}
    </g>
  );
}

/* ── The figure ──────────────────────────────────────────────────────────── */

export interface ScenarioModelCanvasProps {
  scenario: number;
  view: number;
  locale: Locale;
}

export function ScenarioModelCanvas({ scenario, view, locale }: ScenarioModelCanvasProps) {
  const pairs = namedMembers(scenario);
  const focus = focusedBands(view);
  const namedByBand = LAYERS.map((_, band) => pairs.filter(([b]) => b === band).map(([, m]) => m));
  /* The run descends from the topmost band the scenario names to the consequence
     band. A scenario naming only the consequence band has no run to draw, and the
     drawing says so rather than inventing a descent through bands its own words
     never reach. */
  const runFrom = Math.min(...pairs.map(([b]) => b), CONSEQUENCE_BAND);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-auto w-full"
      role="img"
      aria-label={pick(T.figureTitle, locale)}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* The riser, drawn first so band stubs and nodes paint over its ends. */}
      {LAYERS.slice(1).map((layer, i) => {
        const live = i >= runFrom;
        const head = nodeY(i + 1) - NODE_R;
        return (
          <g key={`run-${layer.id}`}>
            <line
              x1={RISER_X}
              y1={nodeY(i)}
              x2={RISER_X}
              y2={nodeY(i + 1)}
              stroke={live ? BLUE : MUTED}
              strokeWidth={live ? 2 : 1}
              className={SWAP}
            />
            {/* The source's own `↓` between layers, drawn as the run's arrowhead
                rather than as a second mark standing beside it. */}
            <path
              d={`M${RISER_X - 3.5} ${head - 7} L${RISER_X} ${head - 2} L${RISER_X + 3.5} ${head - 7}`}
              fill="none"
              stroke={live ? BLUE : MUTED}
              strokeWidth={live ? 2 : 1.25}
              className={SWAP}
            />
          </g>
        );
      })}

      {LAYERS.map((layer, i) => (
        <circle
          key={`node-${layer.id}`}
          cx={RISER_X}
          cy={nodeY(i)}
          r={NODE_R}
          /* Hollow on the run, filled where the scenario's own words land. The
             unfilled ground is `--card`, never a low-opacity blue: opacity
             multiplies stroke as well as fill and fails 1.4.11. */
          fill={namedByBand[i].length > 0 ? BLUE : "hsl(var(--card))"}
          stroke={i >= runFrom ? BLUE : MUTED}
          strokeWidth={1.5}
          className="transition-[fill,stroke] duration-200 motion-reduce:transition-none"
        />
      ))}

      {LAYERS.map((layer, i) => (
        <Band
          key={layer.id}
          index={i}
          layer={layer}
          named={namedByBand[i]}
          focused={focus.includes(i)}
          locale={locale}
        />
      ))}
    </svg>
  );
}

/** Colour is never the only carrier of meaning (Foundation Spec §3.1). This
 *  figure runs two channels; naming both in words discharges that. */
export function ScenarioModelLegend({ locale }: { locale: Locale }) {
  return (
    <ul aria-label={pick(T.legendLabel, locale)} className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
      <li className="flex items-center gap-2">
        <span aria-hidden className="size-3 shrink-0 rounded-full bg-signal-blue" />
        <span className="mono-label">{pick(T.legendNamed, locale)}</span>
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden className="h-0.5 w-6 shrink-0 rounded-full bg-signal-blue" />
        <span className="mono-label">{pick(T.legendRun, locale)}</span>
      </li>
      <li className="flex items-center gap-2">
        {/* The swatch carries both of the band's marks, ground and bar, so the
            legend names what a reader actually has to look for. */}
        <span aria-hidden className="flex h-3 w-6 shrink-0 overflow-hidden rounded-sm bg-muted">
          <span className="w-[3px] shrink-0 bg-foreground" />
        </span>
        <span className="mono-label">{pick(T.legendFocus, locale)}</span>
      </li>
    </ul>
  );
}
