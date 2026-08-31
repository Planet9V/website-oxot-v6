"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";
import {
  MISSIONS,
  MISSION_LABEL,
  MODEL_LABEL,
  OUTCOME_FALLBACK,
  OUTCOME_FIELDS,
  PRESSURES,
  PRESSURE_LABEL,
  SOVEREIGN_CHAIN
} from "./content.sovereignModel";

/**
 * S00's RIGHT PANE — `OXOT_Layout_Styles.md` PATTERN 1, CONSEQUENCE CASCADE
 * HERO, drawing the BRIEF's own **Sovereign System Model** (BRIEF L57–L94).
 *
 * NOT `TwinExplorer`, which lays out through ELK inside a `useEffect` and paints
 * "Loading diagram…" first — the opposite of Pattern 1's "renders immediately at
 * paint". Hand-authored geometry is the sanctioned route, as in
 * `manufacturing-process-2/ProcessLineCanvas.tsx`.
 *
 * THE GEOMETRY IS `Rule.tsx`'s FIGURE, ROTATED 90°. That rule draws this page's
 * signature horizontally: SOLID interior run, DASHED zone perimeter standing
 * across it, ONE marked crossing point, and the run continuing DASHED beyond —
 * because what the organisation controls ends at the boundary and the dependency
 * does not. The Sovereign System Model is a vertical chain, so the same figure
 * is turned a quarter turn: the run descends, the perimeter lies across it, the
 * crossing is the same filled SQUARE (round marks are energy's junction and
 * manufacturing's tap), and everything below is dashed. The perimeter sits
 * between `controls` and `dependency` because that is where the source puts the
 * edge of control: BRIEF L67 is the operator's own estate, BRIEF L68 is
 * "Supplier / civil infrastructure / external dependency", which is not.
 *
 * Deliberately NEITHER sibling idiom: no ISA-5.1 instrument bubble on a stem
 * (manufacturing's P&ID), no busbar with tap-offs (energy's one-line). No shared
 * symbol from `components/twin/pid-symbols.tsx` is wrapped anywhere here, so no
 * presentation attribute from another component is in play — see `Rule.tsx` for
 * why (a `stroke-*` class on a wrapping `<g>` is SILENTLY INERT against a
 * presentation attribute on the same element; `[&_ellipse]:[stroke-width:2]` is
 * the fix). `SOVEREIGN_CHAIN`'s sixth entry — "Cyber or hybrid-event
 * consequence" — is TEXT in the amber-outlined chip, never a sixth node: a
 * consequence is not an asset. Every sibling hero is a fixed four-stratum
 * cascade; this one is six layers because its source says six.
 *
 * WHAT ANIMATES: the blue run, one segment at a time, and the mark it arrives
 * at. Nothing else — every label, separator, the perimeter, the chip and its
 * text are server-rendered at full opacity and readable before a line of JS
 * runs, which is Pattern 1's own correction. SIX discrete draws, 360ms each,
 * 420ms apart, so every individual motion sits inside the Foundation Spec's
 * 300–500ms diagram tier rather than summing to one continuous sweep.
 *
 * THREE NON-OBVIOUS MECHANICS, each a defect this pattern has shipped before:
 *  · `prefers-reduced-motion` is CSS, never JS — a media query resolves only
 *    after hydration, by which time the server HTML has painted, so a JS check
 *    would show those readers the unlit state and then rebuild it.
 *  · Each animated value goes through ONE CSS variable written by exactly one
 *    class at a time; two arbitrary-property utilities have equal specificity,
 *    so base-plus-state would be settled by Tailwind's emission order.
 *  · Segment LENGTH travels by inline `style`: Tailwind emits only utilities
 *    whose class string it finds LITERALLY in source, so an interpolated
 *    `[--seg-len:${n}px]` generates nothing at all.
 * And a fourth, particular to this drawing: the draw itself consumes
 * `stroke-dasharray`/`stroke-dashoffset`, so the EXTERIOR run cannot carry a
 * dash of its own. Below the perimeter it is one ordinary solid segment with
 * static `--card` ticks over it — the blue arrives dashed as it passes through.
 *
 * TOKENS. The run is `--signal-blue` end to end and never resolves to green —
 * nothing is validated-closed at first paint. Amber appears once, on the chip's
 * outline: amber means *proposed/pending*, so an amber terminus would read as a
 * remediation proposal rather than an impact, and the terminus stays a blue
 * arrow. Separators, perimeter and connectors are `--muted-foreground`, NOT
 * `--border`: everything here carries model meaning and must clear WCAG
 * 1.4.11's 3:1 non-text floor, which a hairline tuned to separate text blocks
 * does not. No word is painted in a signal token — those clear 3:1, their whole
 * budget, and measure ~3.5:1 on `--card` against 1.4.3's 4.5:1. Shapes carry the
 * signal, words name it. No `--brand-orange`/`--primary-ink` on any diagram
 * element: the Foundation Spec bars the brand mark from them.
 *
 * THE 42-COMBINATION GAP IS SURFACED, NOT FILLED. BRIEF L73–L92 specifies 6
 * missions × 7 pressures and BRIEF L94 supplies zero per-combination results.
 * The selector is real, complete and keyboard-operable; the four result fields
 * are the source's own field names; their values read "Not modelled" for every
 * combination and `OUTCOME_FALLBACK` states why, immediately beneath. Writing 42
 * outcomes would be 42 fabricated operational claims on a defense page, against
 * the page's own `AIR_GAP.caveat` promise to show unsourced fields empty.
 */

/* ── Copy belonging to the drawing rather than to the page ───────────────── */

const T = {
  play: same("Play the dependency path"),
  replay: same("Replay the dependency path"),
  diagramTitle: same(
    "Sovereign system model: mission, operational facility, resources, control systems, external dependency, and the cyber or hybrid-event consequence"
  ),
  summaryLabel: same("Modelled dependency path, in words"),
  legendLabel: same("What the marks mean"),
  legendInside: same("Solid — dependency inside what the organisation controls"),
  legendBoundary: same("Dashed — the sovereignty boundary, and the dependency beyond it"),
  legendConsequence: same("Amber outline — cyber or hybrid-event consequence"),
  selectPrompt: same("Select a mission and a pressure."),
  /** What every one of the 42 combinations reports, because none is published. */
  outcomeEmpty: same("Not modelled"),
  outcomeLabel: same("What the model would report")
};

/** The dashed swatch is a repeating gradient, not N DOM nodes, as an inline
 *  `style`: a Tailwind arbitrary class carrying nested parens is one JIT quirk
 *  away from generating nothing at all. */
const DASH_GRADIENT =
  "repeating-linear-gradient(to right, hsl(var(--signal-blue)) 0 4px, transparent 4px 8px)";
const LEGEND: { key: string; label: Bilingual; swatch: string; style?: CSSProperties }[] = [
  { key: "inside", label: T.legendInside, swatch: "h-0.5 w-6 shrink-0 rounded-full bg-signal-blue" },
  { key: "boundary", label: T.legendBoundary, swatch: "h-0.5 w-6 shrink-0", style: { backgroundImage: DASH_GRADIENT } },
  { key: "consequence", label: T.legendConsequence, swatch: "h-3 w-6 shrink-0 rounded-sm border border-signal-amber" }
];

/* ── Geometry, in viewBox units ──────────────────────────────────────────── */

const VB_W = 520;
/** The run: a single vertical descent, solid on the interior side. */
const RUN_X = 20;
/** One text column for all six layers — the chip's text aligns to the same x,
 *  so it reads as the chain's last line rather than as a caption. */
const LABEL_X = 44;
const RULE_X0 = 4;
const RULE_X1 = VB_W - 8;

const TOP = 20;
const ROW_H = 42;
const NODE_R = 4.5;
/** Five graph nodes; `SOVEREIGN_CHAIN`'s sixth entry is the chip, not a node. */
const NODE_COUNT = SOVEREIGN_CHAIN.length - 1;
const rowY = (i: number) => TOP + i * ROW_H;

/** Where control ends — the midpoint between `controls` (BRIEF L67) and
 *  `dependency` (BRIEF L68), so the run crosses BETWEEN two layers. */
const PERIM_Y = rowY(NODE_COUNT - 2) + ROW_H / 2;
/** The three plain layer crossings above the boundary. SOLID hairlines: dashed
 *  is reserved for the one thing that IS a boundary, and two dashed elements
 *  meaning different things read as one broken drawing. */
const SEPARATORS = [0, 1, 2].map((i) => rowY(i) + ROW_H / 2);

const CONS_X0 = 8;
const CONS_TOP = rowY(NODE_COUNT - 1) + 26;
const CONS_H = 38;
const ARROW_H = 8;
const VB_H = CONS_TOP + CONS_H + 8;
/** One draw into each node, plus the draw into the consequence: six. */
const SEGMENT_COUNT = NODE_COUNT + 1;

/* Checked at module load, not asserted in a comment: the perimeter must fall
   strictly between the last two nodes, or the boundary is not where the
   source puts it. */
if (SOVEREIGN_CHAIN.length !== 6) {
  throw new Error("SovereignSystemCanvas: SOVEREIGN_CHAIN is no longer the brief's six layers");
}
if (PERIM_Y <= rowY(NODE_COUNT - 2) || PERIM_Y >= rowY(NODE_COUNT - 1)) {
  throw new Error("SovereignSystemCanvas: perimeter is not between the controls and dependency layers");
}

/* ── Shapes ──────────────────────────────────────────────────────────────── */

const MUTED = "hsl(var(--muted-foreground))";
const INK = "hsl(var(--foreground))";
const CARD = "hsl(var(--card))";
const BLUE = "hsl(var(--signal-blue))";
const AMBER = "hsl(var(--signal-amber))";
const TEXT = { fontSize: 12.5, fill: INK, style: { fontFamily: "var(--font-sans)" } } as const;
const RUN = { fill: "none", stroke: BLUE, strokeWidth: 2, strokeLinecap: "round" } as const;
const MARK_TRANSITION = "transition-[fill] duration-[200ms] motion-reduce:transition-none";

/** Condense rather than shrink: the technical-label floor is 11px and Dutch runs
 *  longer, so an over-wide label is fitted with SVG's own `textLength`. */
function fitted(text: string, width: number, perChar: number) {
  return text.length * perChar > width ? { textLength: width, lengthAdjust: "spacingAndGlyphs" as const } : {};
}

/** One run segment. Lengths differ (the entry stub is shorter than a row pitch),
 *  so `--seg-len` is computed and carried by inline style. */
function Segment({ from, to, drawn }: { from: number; to: number; drawn: boolean }) {
  const length = to - from;
  return (
    <path
      d={`M${RUN_X} ${from} V${to}`}
      {...RUN}
      strokeDasharray={length}
      style={{ "--seg-len": `${length}px`, strokeDashoffset: "var(--seg-off)" } as CSSProperties}
      className={[
        drawn ? "[--seg-off:0px]" : "[--seg-off:var(--seg-len)]",
        "transition-[stroke-dashoffset] duration-[360ms] ease-linear",
        "motion-reduce:transition-none motion-reduce:[--seg-off:0px]"
      ].join(" ")}
    />
  );
}

/** UNLIT is `--card` behind a blue ring, not blue: the ring is a shape, clears
 *  1.4.11's 3:1, and holds no text. */
function litClass(lit: boolean) {
  const fill = lit ? "[--mark-fill:hsl(var(--signal-blue))]" : "[--mark-fill:hsl(var(--card))]";
  return `${fill} motion-reduce:[--mark-fill:hsl(var(--signal-blue))]`;
}

/** One layer: a mark on the run, a light connector out to the text column, and
 *  the source's own label. The mark is the ONLY thing that changes as the run
 *  arrives. The last node sits OUTSIDE the perimeter and takes a dashed ring. */
function LayerRow({ index, label, lit }: { index: number; label: string; lit: boolean }) {
  const y = rowY(index);
  return (
    <g className={litClass(lit)}>
      <line x1={RUN_X + NODE_R + 3} y1={y} x2={LABEL_X - 8} y2={y} stroke={MUTED} strokeWidth={1} />
      <text x={LABEL_X} y={y + 4.4} {...TEXT} {...fitted(label, RULE_X1 - LABEL_X, 6.4)}>
        {label}
      </text>
      <circle
        cx={RUN_X} cy={y} r={NODE_R} stroke={BLUE} strokeWidth={1.5}
        strokeDasharray={y > PERIM_Y ? "3 2.5" : undefined}
        style={{ fill: "var(--mark-fill)" }} className={MARK_TRANSITION}
      />
    </g>
  );
}

/** The sovereignty boundary and its single crossing point. WEIGHTS ARE THE
 *  DISTINCTION, not decoration — `Rule.tsx`'s own reasoning: the run is heavier
 *  than the perimeter standing across it, because the run is a real dependency
 *  and the perimeter is a policy line drawn around it. The perimeter's dash
 *  rhythm (2.5/2.5) is finer than the exterior run's (4/4), so the two never
 *  read as one drawing. The crossing is the filled SQUARE `Rule.tsx` reserves. */
function Boundary({ lit }: { lit: boolean }) {
  return (
    <g className={litClass(lit)}>
      <line
        x1={RULE_X0} y1={PERIM_Y} x2={RULE_X1} y2={PERIM_Y}
        stroke={MUTED} strokeWidth={1.25} strokeDasharray="2.5 2.5"
      />
      <rect
        x={RUN_X - 4} y={PERIM_Y - 4} width={8} height={8} stroke={BLUE} strokeWidth={1.5}
        style={{ fill: "var(--mark-fill)" }} className={MARK_TRANSITION}
      />
    </g>
  );
}

/** The exterior run's dashes, punched into the solid segment by static `--card`
 *  ticks — the docblock says why the dash cannot live on the path itself. */
function ExteriorTicks() {
  const ticks: number[] = [];
  for (let y = PERIM_Y + 6; y < CONS_TOP - ARROW_H - 2; y += 8) ticks.push(y);
  return (
    <g aria-hidden>
      {ticks.map((y) => (
        <line key={y} x1={RUN_X} y1={y} x2={RUN_X} y2={y + 4} stroke={CARD} strokeWidth={4} />
      ))}
    </g>
  );
}

/** `SOVEREIGN_CHAIN`'s sixth entry as TEXT in an amber-outlined chip, never a
 *  sixth node. Its terminus is a blue flow arrow: the run lands here, it does
 *  not meet another asset. */
function ConsequenceChip({ label, lit }: { label: string; lit: boolean }) {
  return (
    <g className={litClass(lit)}>
      <rect
        x={CONS_X0} y={CONS_TOP} width={RULE_X1 - CONS_X0} height={CONS_H}
        rx={6} fill="none" stroke={AMBER} strokeWidth={1.5}
      />
      <text x={LABEL_X} y={CONS_TOP + CONS_H / 2 + 4.4} {...TEXT} {...fitted(label, RULE_X1 - LABEL_X - 12, 6.4)}>
        {label}
      </text>
      <path
        d={`M${RUN_X - 5} ${CONS_TOP - ARROW_H} L${RUN_X + 5} ${CONS_TOP - ARROW_H} L${RUN_X} ${CONS_TOP} Z`}
        stroke={BLUE} strokeWidth={1.25}
        style={{ fill: "var(--mark-fill)" }} className={MARK_TRANSITION}
      />
    </g>
  );
}

/* ── The two-axis selector ───────────────────────────────────────────────── */

interface AxisProps {
  name: string;
  legend: Bilingual;
  options: readonly { id: string; label: Bilingual }[];
  value: string | null;
  onChange: (id: string) => void;
  locale: Locale;
}

/**
 * One axis, as a real radio group. NATIVE `<input type="radio">` in a
 * `<fieldset>`, visually hidden but focusable, rather than `role="radiogroup"`
 * plus a hand-rolled roving `tabindex` over buttons: the native control already
 * gives arrow-key traversal, correct checked semantics and a group name to
 * assistive tech, and the styled `<span>` takes the focus ring through
 * `peer-focus-visible`. Each option is a 44px target — Mobile Rules' minimum —
 * and nothing needs a drag. SELECTION IS NOT PAINTED IN A SIGNAL TOKEN: the six
 * signals mean model and decision state, which chip a visitor clicked is
 * neither, and `--brand-orange`/`--primary-ink` is barred from controls. The
 * selected chip inverts to `--foreground` on `--background` — a fill and
 * contrast change, not a hue — and `checked` carries the same fact to anyone
 * seeing neither.
 */
function Axis({ name, legend, options, value, onChange, locale }: AxisProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="mono-label text-primary-ink">{pick(legend, locale)}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.id} className="cursor-pointer">
            <input
              type="radio" name={name} value={option.id} checked={value === option.id}
              onChange={() => onChange(option.id)} className="peer sr-only"
            />
            <span
              className={[
                "inline-flex min-h-[44px] items-center rounded-full border px-4 text-[0.8125rem] leading-none",
                "transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
                "peer-focus-visible:outline-primary",
                value === option.id
                  ? "border-foreground bg-foreground font-medium text-background"
                  : "border-border text-muted-foreground hover:bg-muted"
              ].join(" ")}
            >
              {pick(option.label, locale)}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ── The pane ────────────────────────────────────────────────────────────── */

export function SovereignSystemCanvas({ locale }: { locale: Locale }) {
  const [drawn, setDrawn] = useState(0);
  const [played, setPlayed] = useState(false);
  const [mission, setMission] = useState<string | null>(null);
  const [pressure, setPressure] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    setPlayed(true);
    setDrawn(0);
    timer.current = setInterval(() => {
      setDrawn((n) => {
        if (n >= SEGMENT_COUNT) {
          if (timer.current) clearInterval(timer.current);
          return n;
        }
        return n + 1;
      });
    }, 420);
  }, []);

  useEffect(() => {
    /* Desktop autoplay only — Pattern 1's mobile rule is tap-to-play, since an
       auto-running sequence competes with page load on a slow connection.
       Reduced motion is deliberately NOT consulted: the CSS already holds those
       readers at the lit end-state and running the sequence would fight it.
       DEFERRED BY A TIMEOUT, not merely to quiet the set-state-in-effect lint:
       calling `play()` inline sets state during the hydration commit, so React
       re-renders before the browser has painted the undrawn canvas once. */
    let start: ReturnType<typeof setTimeout> | undefined;
    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(min-width: 1024px)").matches
    ) {
      start = setTimeout(play, 0);
    }
    return () => {
      if (start) clearTimeout(start);
      if (timer.current) clearInterval(timer.current);
    };
  }, [play]);

  const nodes = SOVEREIGN_CHAIN.slice(0, NODE_COUNT);
  const consequence = SOVEREIGN_CHAIN[NODE_COUNT];
  const missionLabel = MISSIONS.find((m) => m.id === mission)?.label ?? null;
  const pressureLabel = PRESSURES.find((p) => p.id === pressure)?.label ?? null;
  const chosen =
    missionLabel && pressureLabel ? `${pick(missionLabel, locale)} · ${pick(pressureLabel, locale)}` : null;

  /* Pattern 1's required text summary: the whole path in one sentence, which is
     what makes the animation decorative rather than load-bearing. */
  const summary = `${nodes.map((l) => pick(l.label, locale)).join(" → ")} → ${pick(consequence.label, locale)}`;

  return (
    /* THE GROUP MARK IS ON THIS `figure`, NOT the grid cell `DefenseHero` puts
       it in: that cell is `items-stretch` and equal by construction, so
       measuring it would let a stretched empty box pass the ratio. */
    <figure data-balance-group="hero-panes" data-gfx-meaning className="m-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="mono-label text-primary-ink">{pick(MODEL_LABEL, locale)}</p>
        <button
          type="button" onClick={play}
          className="mono-label inline-flex min-h-[44px] items-center rounded-full border border-border px-4 text-primary-ink transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:hidden"
        >
          {pick(played ? T.replay : T.play, locale)}
        </button>
      </div>

      <div data-balance-item className="mt-3 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-auto w-full" role="img"
          aria-label={pick(T.diagramTitle, locale)} style={{ fontFamily: "var(--font-mono)" }}
        >
          {SEPARATORS.map((y) => (
            <line key={y} x1={RULE_X0} y1={y} x2={RULE_X1} y2={y} stroke={MUTED} strokeWidth={0.75} />
          ))}

          {/* The run first, so marks and ticks paint over its ends, not under. */}
          {Array.from({ length: SEGMENT_COUNT }, (_, i) => {
            const from = i === 0 ? 4 : rowY(i - 1) + NODE_R;
            const to = i < NODE_COUNT ? rowY(i) - NODE_R : CONS_TOP - ARROW_H;
            return <Segment key={i} from={from} to={to} drawn={drawn > i} />;
          })}

          <ExteriorTicks />
          <Boundary lit={drawn > NODE_COUNT - 1} />

          {nodes.map((layer, i) => (
            <LayerRow key={layer.id} index={i} label={pick(layer.label, locale)} lit={drawn > i} />
          ))}

          <ConsequenceChip label={pick(consequence.label, locale)} lit={drawn > NODE_COUNT} />
        </svg>
      </div>

      {/* Colour is never the only carrier of meaning (Foundation Spec §3.1), and
          this drawing also turns on a dash/solid distinction — both are named. */}
      <ul data-balance-item aria-label={pick(T.legendLabel, locale)} className="mt-3 flex flex-col gap-2">
        {LEGEND.map((item) => (
          <li key={item.key} className="flex items-center gap-2">
            <span aria-hidden className={item.swatch} style={item.style} />
            <span className="mono-label">{pick(item.label, locale)}</span>
          </li>
        ))}
      </ul>

      <div data-balance-item className="mt-6 grid gap-5 sm:grid-cols-2">
        <Axis
          name="sovereign-mission" legend={MISSION_LABEL} options={MISSIONS}
          value={mission} onChange={setMission} locale={locale}
        />
        <Axis
          name="sovereign-pressure" legend={PRESSURE_LABEL} options={PRESSURES}
          value={pressure} onChange={setPressure} locale={locale}
        />
      </div>

      <div data-balance-item className="mt-6">
        <p className="mono-label text-primary-ink" aria-live="polite">
          {pick(T.outcomeLabel, locale)} — {chosen ?? pick(T.selectPrompt, locale)}
        </p>
        {/* THE FOUR FIELD NAMES ARE SOURCED (BRIEF L94). THEIR VALUES ARE NOT,
            for any of the 42 combinations, so every one reads the same and the
            sentence below says why. "Not modelled" rather than an em dash: a
            dash reads as a control that has not finished loading, and this is a
            settled state, not a pending one. */}
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-4">
          {OUTCOME_FIELDS.map((field) => (
            <div key={field.id}>
              <dt className="mono-label">{pick(field.label, locale)}</dt>
              <dd className="mt-1 text-[0.8125rem] leading-snug text-muted-foreground">
                {pick(T.outcomeEmpty, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The dashed left rule `Rule.tsx`'s `SectionB` gives a claim boundary —
          the datum's perimeter turned vertical. Body-size, never fine print. */}
      <p
        data-balance-item
        className="mt-5 border-l-2 border-dashed border-border pl-4 body-copy leading-relaxed text-foreground"
      >
        {pick(OUTCOME_FALLBACK, locale)}
      </p>

      <figcaption className="sr-only">
        {pick(T.summaryLabel, locale)}: {summary}.
      </figcaption>
    </figure>
  );
}
