"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ASSET_GLYPHS, TYPE_LABEL } from "@/components/twin/AssetNode";
import type { SystemAsset, SystemAssetType, SystemPath } from "@/components/twin/types";
import { same } from "../registry";
import { HERO } from "./content";

/**
 * S00's RIGHT PANE — `OXOT_Layout_Styles.md` PATTERN 1, CONSEQUENCE CASCADE HERO.
 *
 * NOT `TwinExplorer`, AND THAT IS A CONTRACT FINDING, NOT A PREFERENCE. The wave
 * brief pointed at `RailScenarioDiagram.tsx`, and its TECHNIQUE is reused exactly
 * — the first three cascade stages are real typed assets in a node graph, the
 * TERMINAL consequence renders as text rather than as a fabricated fourth asset.
 * `TwinExplorer` itself exposes `{assets, paths, locale, title, zoneLabels}` and
 * nothing else, while Pattern 1 needs N discrete per-segment draws with a node
 * lighting as each finishes, a reduced-motion end-state before first paint, and
 * mobile tap-to-play — none of it reachable through those five props. It also
 * lays out via ELK in a `useEffect`, so it paints "Loading diagram…" into the
 * hero first, the opposite of "renders immediately at first paint". Hand-authored
 * geometry is sanctioned, not improvised: `OXOT_Layout_Styles.md`'s Pattern 2 row
 * records `/decisions/change-safely` deliberately choosing static SVG over
 * `TwinExplorer`, and `water-wastewater-3/HeroPathCanvas.tsx` is the built
 * precedent for Pattern 1. Glyphs, the nine asset types and the data contract all
 * stay `@/components/twin`'s.
 *
 * THE DRAWING IS AN ENERGY ONE-LINE, not `water-wastewater-3`'s numbered station
 * rail, which is a transit idiom. This page's signature (see `Rule.tsx`) is the
 * SINGLE-LINE DIAGRAM, the artifact `industry_energy.md` asks the visitor to
 * bring four separate times: horizontal STRATUM BANDS stacked by the source's own
 * four synchronized views, each with a busbar its asset taps off at a junction
 * node, and one conductor riser down the left edge.
 *
 * WHAT ANIMATES: the blue conductor, one segment at a time, and the junction node
 * each arrives at. Nothing else — every band, label, glyph and the consequence
 * chip are server-rendered at full opacity, readable before a line of JavaScript
 * runs, which is Pattern 1's own correction. Four discrete draws, 360ms each,
 * 420ms apart, so each single motion sits inside the 300-500ms diagram tier
 * rather than adding up to one continuous multi-second sweep.
 *
 * THREE NON-OBVIOUS MECHANICS, each a defect this pattern has shipped before:
 *  · `prefers-reduced-motion` is handled in CSS, never JS. A media query resolves
 *    only after hydration, by which time the server HTML has painted, so a JS
 *    check would show those readers the lit state and then rebuild it.
 *  · Each animated value goes through ONE CSS variable written by exactly one
 *    class at a time. Two arbitrary-property utilities have equal specificity, so
 *    base-plus-state would be settled by Tailwind's emission order.
 *  · Segment LENGTH travels by inline style: Tailwind only emits a utility whose
 *    class string it finds literally in the source, and `[--seg-len:${n}px]` is
 *    invisible to that scan (see `HeroPathCanvas.tsx`).
 *
 * WHAT THIS FIGURE DOES NOT CAPTION. Source L59's second sentence — the
 * PRODUCT's seven-layer model — used to sit under the card here as the drawing's
 * attribution. It is now in `EnergyHero`'s copy pane, and that is a content
 * finding rather than a layout one: this canvas draws FOUR strata (L41–56), so a
 * seven-layer sentence printed directly beneath four counted bands invites the
 * reader to reconcile two numbers that describe different things. The drawing is
 * named by its `aria-label`, its claim chip, its legend and its `figcaption`
 * summary; the prose that frames it belongs beside it, in one piece, where the
 * source writes it as one paragraph. Do not move it back.
 *
 * TOKENS. The conductor is `--signal-blue` end to end and never resolves to
 * green: nothing is validated-closed at first paint. Amber appears once, on the
 * consequence chip's outline, never on the conductor or its terminus — amber
 * means *proposed/pending*, so an amber endpoint would read as a remediation
 * proposal rather than an impact. And no word is painted in a signal token:
 * those clear 1.4.11's 3:1 NON-TEXT floor, their whole budget, and measure
 * ~3.5:1 on `--card` against 1.4.3's 4.5:1. Shapes carry the signal, words name it.
 */

/* ── Copy belonging to the drawing rather than to the page ───────────────── */

const T = {
  play: same("Play the cascade"),
  replay: same("Replay the cascade"),
  /* Pattern 1's claim boundary, printed rather than implied. This is the exact
     literal `OXOT_Layout_Styles.md` binds to illustrative Twin scenarios. */
  claim: same("Illustrative scenario — no customer data"),
  diagramTitle: same(
    "Energy one-line cascade: physical system, OT and protection network, attack pathway, operational consequence"
  ),
  summaryLabel: same("Modelled cascade, in words"),
  legendLabel: same("What the two colours mean"),
  legendPath: same("Modelled cascade — open, nothing closed"),
  legendConsequence: same("Operational consequence"),
  /* THE UNBUILT INTERACTION, PLACEHOLDERED VISIBLY RATHER THAN OMITTED —
     `content.ts` flags this gap and hands the wording here. L41 calls the hero
     "an interactive energy-system model with four synchronized views" but never
     says what selecting one does, so no interaction is invented; what the source
     DOES specify, the four views and their elements, is all drawn. */
  placeholder: same(
    "View switching is not built yet: the brief specifies these four synchronized views but not the interaction between them. All four are drawn."
  )
};

/* ── The chain: real typed assets, invented plumbing only ────────────────── */

/**
 * ids and `SystemAssetType` are the plumbing this builder was authorized to
 * invent; every node's LABEL is `HERO.strata[n].elements` verbatim, already-cited
 * spec content. Type is read off the source's own element list for that stratum,
 * not chosen for variety: generation/substation/battery/compressor is plant
 * equipment; relays, RTUs, PLCs, DCS, SCADA and HMIs are control devices; and
 * the third list names remote access explicitly.
 */
const PLUMBING: { id: string; type: SystemAssetType }[] = [
  { id: "physical-system", type: "process-equipment" },
  { id: "ot-protection-network", type: "controller" },
  { id: "attack-pathway", type: "remote-access" }
];

/**
 * The two modelled links between the three graph nodes. ORDER IS THE SOURCE'S
 * OWN: `content.ts` records that the brief prints the four view labels and the
 * four cascade stages as separate blocks and never states a mapping, so the
 * pairing is an inference and is flagged as one there. This file inherits it and
 * adds nothing. `role` is plumbing — the third stratum is the source's own
 * "Attack pathway" and the hero's purpose is to "move from cyber route to
 * operational outcome" — and is never printed on the canvas nor spoken in the
 * text summary, so no unsourced descriptive claim reaches a reader.
 */
const CASCADE_PATHS: SystemPath[] = [
  { id: "c1", from: "physical-system", to: "ot-protection-network", role: "attack-path", status: "open" },
  { id: "c2", from: "ot-protection-network", to: "attack-pathway", role: "attack-path", status: "open" }
];

/* Checked at module load, not asserted in a comment. Blue is what `PathEdge`
   gives an `open` path, so a link re-declared `closed` or `unknown` would leave
   the drawing silently disagreeing with the model. It throws instead. */
for (const p of CASCADE_PATHS) {
  if (p.status !== "open") throw new Error(`CascadeCanvas: path "${p.id}" is not open`);
  const from = PLUMBING.findIndex((n) => n.id === p.from);
  const to = PLUMBING.findIndex((n) => n.id === p.to);
  if (to !== from + 1) throw new Error(`CascadeCanvas: path "${p.id}" is not a contiguous chain step`);
}
if (CASCADE_PATHS.length !== PLUMBING.length - 1) {
  throw new Error("CascadeCanvas: chain has a gap between graph nodes");
}
if (HERO.strata.length !== PLUMBING.length + 1) {
  throw new Error("CascadeCanvas: HERO.strata no longer holds 3 graph nodes plus 1 consequence");
}

/** Labels are `Bilingual` here, so assets resolve per render rather than at
 *  module scope — `SystemAsset.label` is contractually already-localized. */
function buildAssets(locale: Locale): SystemAsset[] {
  return PLUMBING.map((n, i) => ({
    id: n.id,
    type: n.type,
    label: pick(HERO.strata[i].elements, locale),
    description: pick(HERO.strata[i].view, locale)
  }));
}

/* ── Geometry, in viewBox units ──────────────────────────────────────────── */

const VB_W = 430;
/** The conductor riser — the one-line's vertical run down the left edge. */
const RISER_X = 18;
/** Where each stratum's busbar starts, and where the consequence chip starts. */
const BUS_X0 = 34;
const BUS_X1 = VB_W - 10;
/** The junction node: where a stratum's asset taps off its busbar. */
const TAP_X = 52;
const TAP_R = 4.5;
const HEAD_H = 22;
const BAND_H = 84;
const ENTRY_Y = 6;
const TEXT_X = TAP_X + 24;
const TEXT_W = BUS_X1 - TEXT_X;

const bandTop = (i: number) => HEAD_H + i * BAND_H;
const busY = (i: number) => bandTop(i) + 30;

const CONS_TOP = HEAD_H + PLUMBING.length * BAND_H;
/** Tall enough to CONTAIN the chip's second line, which is the whole constraint:
 *  the consequence string wraps to two, the lower baseline sits at `+65`, and at
 *  the previous 74 the rect closed at `+66` — so every descender in "outage
 *  propagation" crossed the amber border. Sized from the text, not by eye. */
const CONS_H = 82;
const CONS_W = BUS_X1 - BUS_X0;
const CONS_RECT_Y = CONS_TOP + 10;
const CONS_RECT_H = CONS_H - 18;
/** The riser's terminus, centred on the rect it terminates into rather than set
 *  independently, so the two cannot drift apart when the chip is resized. */
const CONS_CY = CONS_RECT_Y + CONS_RECT_H / 2;
const VB_H = CONS_TOP + CONS_H + 8;

/** One draw per graph node, plus the draw into the consequence. */
const SEGMENT_COUNT = PLUMBING.length + 1;

/* ── Text fitting ────────────────────────────────────────────────────────── */

/** Condense rather than shrink: the technical-label floor is 11px and Dutch runs
 *  longer than English, so an over-wide string is fitted with SVG's own
 *  `textLength` rather than dropped below the floor. */
function fitted(text: string, width: number, perChar: number) {
  return text.length * perChar > width
    ? { textLength: width, lengthAdjust: "spacingAndGlyphs" as const }
    : {};
}

/** Balanced two-line break. Every `elements` string is a comma list that would
 *  otherwise run off the canvas, and none is going to be shortened to fit. */
function twoLines(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const words = text.split(" ");
  if (words.length === 1) return [text];
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) [bestDiff, best] = [diff, i];
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/* ── Shapes ──────────────────────────────────────────────────────────────── */

const MUTED = "hsl(var(--muted-foreground))";
const INK = "hsl(var(--foreground))";
const BLUE = "hsl(var(--signal-blue))";
const AMBER = "hsl(var(--signal-amber))";
const CARD = "hsl(var(--card))";
const SANS = { fontFamily: "var(--font-sans)" };
/** A stratum crossing. `--border` because a boundary is page structure, not
 *  model state — the same reasoning `Rule.tsx` gives for its own datum rule. */
const BOUNDARY = { stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "4 4" };
const CONDUCTOR = { fill: "none", stroke: BLUE, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Body text, wrapped to at most two lines and condensed if still over-wide.
 *  Shared so a band and the consequence chip cannot drift apart typographically. */
function Lines({ text, x, y, w, max }: { text: string; x: number; y: number; w: number; max: number }) {
  return (
    <>
      {twoLines(text, max).map((line, i) => (
        <text key={i} x={x} y={y + i * 17} fontSize={12.5} fill={INK} style={SANS} {...fitted(line, w, 6.4)}>
          {line}
        </text>
      ))}
    </>
  );
}

/**
 * One conductor segment: a right-angled run down the riser and along into the
 * junction node it arrives at. Lengths differ (the entry stub is shorter than a
 * band pitch), so `--seg-len` is computed and carried by inline style.
 */
function Segment({ d, length, drawn }: { d: string; length: number; drawn: boolean }) {
  return (
    <path
      d={d}
      {...CONDUCTOR}
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

/**
 * One stratum band: boundary, name, busbar, and the asset tapping off it. The
 * junction node is the ONLY thing that changes as the conductor arrives, so a
 * reader tracking the draw is not also tracking four other properties. Busbar
 * and tap-off are `--muted-foreground`, NOT `--border` — a hairline tuned to
 * separate text blocks, ~1.25:1 on `--card`, failing 1.4.11 for a shape carrying
 * meaning. A signal token would pass and be wrong: a busbar is structure, and
 * the six signals are reserved for state.
 */
interface StratumBandProps {
  index: number;
  asset: SystemAsset;
  view: string;
  lit: boolean;
  locale: Locale;
}

function StratumBand({ index, asset, view, lit, locale }: StratumBandProps) {
  const top = bandTop(index);
  const y = busY(index);
  const Glyph = ASSET_GLYPHS[asset.type];
  const tapClass = [
    lit ? "[--tap-fill:hsl(var(--signal-blue))]" : "[--tap-fill:hsl(var(--card))]",
    "motion-reduce:[--tap-fill:hsl(var(--signal-blue))]"
  ].join(" ");

  return (
    <g>
      {/* No boundary above the first stratum: a rule drawn at the top of the
          canvas would assert a stratum crossing the model does not have. */}
      {index > 0 && <line x1={6} y1={top} x2={BUS_X1} y2={top} {...BOUNDARY} />}

      {/* The stratum's name, set like a busbar tag. Verbatim `strata[n].view`. */}
      <text x={BUS_X1} y={top + 16} fontSize={11} textAnchor="end" fill={MUTED}>
        {view.toUpperCase()}
      </text>

      {/* The busbar. Heavier than everything else on the canvas, because on a
          real one-line the bus is the thing the devices hang off. */}
      <line x1={BUS_X0} y1={y} x2={BUS_X1} y2={y} stroke={MUTED} strokeWidth={2.5} strokeLinecap="round" />

      {/* Tap-off drop, then the glyph hanging from it — `Rule.tsx`'s idiom. */}
      <line x1={TAP_X} y1={y} x2={TAP_X} y2={y + 10} stroke={MUTED} strokeWidth={1.25} />
      <svg x={TAP_X - 11} y={y + 10} width={22} height={22} viewBox="0 0 32 32">
        <Glyph />
      </svg>

      {/* max 40, not the ~54 the column actually fits: at 54 the OT stratum's
          list lands on one line while both its siblings wrap, and one short band
          beside two tall ones reads as a rendering fault rather than as content.
          Breaking all three the same way keeps the band pitch honest. */}
      <Lines text={asset.label} x={TEXT_X} y={y + 22} w={TEXT_W} max={40} />

      {/* UNLIT fill is `--card` behind a blue ring, not blue itself: the ring is
          a shape and clears 1.4.11's 3:1, and nothing inside it is text. */}
      <g className={tapClass}>
        <circle
          cx={TAP_X}
          cy={y}
          r={TAP_R}
          stroke={BLUE}
          strokeWidth={1.5}
          style={{ fill: "var(--tap-fill)" }}
          className="transition-[fill] duration-[200ms] motion-reduce:transition-none"
        />
      </g>

      {/* Asset type is announced, never drawn — the glyph carries it visually. */}
      <title>{`${pick(TYPE_LABEL[asset.type], locale)} — ${asset.label}`}</title>
    </g>
  );
}

/**
 * The fourth stratum: `HERO.strata[3]` as TEXT in an amber-outlined label chip,
 * never a fourth node in the graph. That split is `RailScenarioDiagram.tsx`'s
 * technique and Pattern 1's token rule at once — a consequence is not an asset,
 * and the endpoint marker stays blue while only its label chip is amber.
 */
function ConsequenceChip({ view, elements }: { view: string; elements: string }) {
  return (
    <g>
      <line x1={6} y1={CONS_TOP} x2={BUS_X1} y2={CONS_TOP} {...BOUNDARY} />
      <rect
        x={BUS_X0}
        y={CONS_RECT_Y}
        width={CONS_W}
        height={CONS_RECT_H}
        rx={6}
        fill="none"
        stroke={AMBER}
        strokeWidth={1.5}
      />
      <text x={BUS_X0 + 12} y={CONS_TOP + 29} fontSize={11} fill={MUTED}>
        {view.toUpperCase()}
      </text>
      <Lines text={elements} x={BUS_X0 + 12} y={CONS_TOP + 48} w={CONS_W - 24} max={44} />
      {/* The riser's terminus. A diamond, not a fourth junction node — this is a
          consequence, not an asset — and it stays BLUE. */}
      <path d={`M${RISER_X} ${CONS_CY - 8} l8 8 l-8 8 l-8 -8 z`} fill={CARD} stroke={BLUE} strokeWidth={1.5} />
    </g>
  );
}

/* ── The pane ────────────────────────────────────────────────────────────── */

/** Right-angled run: down the riser to `toY`, then along to `toX`. */
function elbow(fromY: number, toY: number, toX: number) {
  return { d: `M${RISER_X} ${fromY} V${toY} H${toX}`, length: toY - fromY + (toX - RISER_X) };
}

const SEGMENTS = [
  elbow(ENTRY_Y, busY(0), TAP_X - TAP_R),
  ...PLUMBING.slice(1).map((_, i) => elbow(busY(i), busY(i + 1), TAP_X - TAP_R)),
  elbow(busY(PLUMBING.length - 1), CONS_CY - 8, RISER_X)
];

export function CascadeCanvas({ locale }: { locale: Locale }) {
  const [drawn, setDrawn] = useState(0);
  const [played, setPlayed] = useState(false);
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
       readers at the end-state, and running the sequence would fight it.
       DEFERRED BY A TIMEOUT, and not merely to quiet the set-state-in-effect
       lint: calling `play()` inline sets state during the hydration commit, so
       React re-renders before the browser has painted the undrawn canvas once
       and the first segment animates out of a frame nobody saw. */
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

  const assets = buildAssets(locale);
  const consequence = HERO.strata[PLUMBING.length];

  /* Pattern 1's required text summary. It names every stratum and its elements,
     which is what makes the animation decorative rather than load-bearing. */
  const summary =
    assets.map((a, i) => `${pick(HERO.strata[i].view, locale)}: ${a.label}`).join(" → ") +
    ` → ${pick(consequence.view, locale)}: ${pick(consequence.elements, locale)}`;

  return (
    /* THE GROUP MARK IS ON THIS `figure`, NOT the grid cell `EnergyHero` puts it
       in: that cell is `items-stretch` and equal by construction, so measuring it
       would let a stretched empty box pass the ratio — the exact defect Pattern
       1's floor rule exists to catch. `data-gfx-meaning` opts the figure into the
       harness's WCAG 1.4.11 pass, which only checks figures that opt in. */
    <figure data-balance-group="hero-panes" data-gfx-meaning className="m-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p data-balance-item className="mono-label rounded-full border border-border px-2.5 py-1">
          {pick(T.claim, locale)}
        </p>
        <button
          data-balance-item
          type="button"
          onClick={play}
          className="mono-label inline-flex min-h-[44px] items-center rounded-full border border-border px-4 text-primary-ink transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:hidden"
        >
          {pick(played ? T.replay : T.play, locale)}
        </button>
      </div>

      <div data-balance-item className="mt-3 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-auto w-full"
          role="img"
          aria-label={pick(T.diagramTitle, locale)}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {/* Conductor first, so the busbars and junction nodes paint over its
              ends rather than the other way round. */}
          {SEGMENTS.map((s, i) => (
            <Segment key={i} d={s.d} length={s.length} drawn={drawn > i} />
          ))}

          {assets.map((asset, i) => (
            <StratumBand
              key={asset.id}
              index={i}
              asset={asset}
              view={pick(HERO.strata[i].view, locale)}
              lit={drawn > i}
              locale={locale}
            />
          ))}

          <ConsequenceChip
            view={pick(consequence.view, locale)}
            elements={pick(consequence.elements, locale)}
          />
        </svg>
      </div>

      {/* Colour is never the only carrier of meaning (Foundation Spec §3.1).
          This canvas uses two signal colours; naming both discharges that. */}
      <ul
        data-balance-item
        aria-label={pick(T.legendLabel, locale)}
        className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2"
      >
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-0.5 w-6 shrink-0 rounded-full bg-signal-blue" />
          <span className="mono-label">{pick(T.legendPath, locale)}</span>
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-6 shrink-0 rounded-sm border border-signal-amber" />
          <span className="mono-label">{pick(T.legendConsequence, locale)}</span>
        </li>
      </ul>

      <p data-balance-item className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {pick(T.placeholder, locale)}
      </p>

      <figcaption className="sr-only">
        {pick(T.summaryLabel, locale)}: {summary}.
      </figcaption>
    </figure>
  );
}
