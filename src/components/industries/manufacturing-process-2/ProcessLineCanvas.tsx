"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ASSET_GLYPHS, TYPE_LABEL } from "@/components/twin/AssetNode";
import { InstrumentBubble } from "@/components/twin/pid-symbols";
import type { SystemAsset, SystemAssetType, SystemPath } from "@/components/twin/types";
import { same } from "../registry";
import { HERO } from "./content";

/**
 * S00's RIGHT PANE — `OXOT_Layout_Styles.md` PATTERN 1, CONSEQUENCE CASCADE HERO.
 *
 * NOT `TwinExplorer`. Pattern 1 needs N discrete per-segment draws with a node
 * lighting as each finishes, a reduced-motion end-state present before first
 * paint, and mobile tap-to-play; `TwinExplorer` exposes `{assets, paths, locale,
 * title, zoneLabels}` and lays out through ELK in a `useEffect`, so it paints
 * "Loading diagram…" into the hero — the opposite of "renders immediately at
 * paint". Hand-authored geometry is the sanctioned route:
 * `water-wastewater-3/HeroPathCanvas.tsx` is the built precedent,
 * `energy-utilities-2/CascadeCanvas.tsx` the nearest sibling. Glyphs, the nine
 * asset types and the data contract stay `@/components/twin`'s.
 *
 * THE DRAWING IS A P&ID, NOT A SINGLE-LINE DIAGRAM — this page's signature and
 * the reason it looks nothing like the energy build (see `Rule.tsx`):
 * `industry_manu-process.md` names the P&ID six times, every time as the artifact
 * the visitor is asked to bring. Each stratum is drawn the way `Rule.tsx` draws
 * its datum: HEAVY process line, LIGHT instrument connection dropping off it, ISA
 * bubble at its end. Energy's busbar-and-tap-off is an electrical one-line; this
 * source never asks for one. ISA-5.1's weight pair is load-bearing, not
 * decoration — it is how a P&ID separates what carries product from what carries
 * a signal. The strata stack downward because the source's own chain (L46–52) is
 * a vertical process flow. No tag, line or stream number is printed anywhere: the
 * source names none, and an annotation invented to look authentic would be a
 * fabricated engineering fact.
 *
 * THREE OF FOUR STRATA ARE GRAPH NODES; THE FOURTH IS TEXT. `HERO.strata[3]`
 * renders inside the amber-outlined chip and is never a fourth node — a
 * consequence is not an asset, and fabricating one would put an invented asset in
 * the hero.
 *
 * WHAT ANIMATES: the blue cascade, one segment at a time, and the tap point it
 * arrives at. Nothing else — every process line, bubble, glyph, label and the
 * chip is server-rendered at full opacity and readable before a line of
 * JavaScript runs, which is Pattern 1's own correction. Four discrete draws,
 * 360ms each, 420ms apart, so every single motion sits inside the 300–500ms
 * diagram tier rather than adding up to one continuous sweep.
 *
 * THREE NON-OBVIOUS MECHANICS, each a defect this pattern has shipped before:
 *  · `prefers-reduced-motion` is CSS, never JS — a media query resolves only after
 *    hydration, by which time the server HTML has painted, so a JS check would
 *    show those readers the lit state and then rebuild it.
 *  · Each animated value goes through ONE CSS variable written by exactly one
 *    class at a time; two arbitrary-property utilities have equal specificity, so
 *    base-plus-state would be settled by Tailwind's emission order.
 *  · Segment LENGTH travels by inline style: Tailwind emits only utilities whose
 *    class string it finds literally, and `[--seg-len:${n}px]` is invisible to it.
 *
 * TOKENS. The cascade is `--signal-blue` end to end and never resolves to green:
 * nothing is validated-closed at first paint. Amber appears once, on the chip's
 * outline — amber means *proposed/pending*, so an amber terminus would read as a
 * remediation proposal rather than an impact; the terminus is a blue P&ID flow
 * arrow. Process lines, connections and bubbles are `--muted-foreground`, NOT
 * `--border`: a datum rule is page chrome (`Rule.tsx`), while everything here
 * carries model meaning and must clear WCAG 1.4.11's 3:1 non-text floor, which a
 * hairline tuned to separate text blocks does not. No word is painted in a signal
 * token — those clear 1.4.11's 3:1, their whole budget, and measure ~3.5:1 on
 * `--card` against 1.4.3's 4.5:1. Shapes carry the signal, words name it.
 */

/* ── Copy belonging to the drawing rather than to the page ───────────────── */

const T = {
  play: same("Play the cascade"),
  replay: same("Replay the cascade"),
  /* Pattern 1's claim boundary, printed rather than implied. This is the exact
     literal `OXOT_Layout_Styles.md` binds to illustrative Twin scenarios. */
  claim: same("Illustrative scenario — no customer data"),
  diagramTitle: same(
    "Process-line cascade: process equipment, control and safety systems, Purdue zones and remote access, physical and business consequence"
  ),
  summaryLabel: same("Modelled cascade, in words"),
  legendLabel: same("What the two colours mean"),
  legendPath: same("Modelled cascade — open, nothing closed"),
  legendConsequence: same("Physical and business consequence"),
  /* THE UNBUILT INTERACTION, PLACEHOLDERED VISIBLY RATHER THAN OMITTED.
     `content.ts` flags this gap and hands the wording here: L43 asks for "an
     interactive, stylized process line" with four toggleable synchronized views
     (L55), but never says what selecting one does. No interaction is invented;
     what the source DOES specify — the views and their elements — is all drawn. */
  placeholder: same("View switching is not built yet. All four synchronized views are drawn.")
};

/* ── The chain: real typed assets, invented plumbing only ────────────────── */

/**
 * ids and `SystemAssetType` are the only plumbing invented here; every node's
 * LABEL is `HERO.strata[n].elements` verbatim. Type is read off the source's own
 * element list, not chosen for variety: a P&ID's equipment is plant equipment;
 * PLC/DCS/SIS/HMI/historian are control devices; the third list names
 * remote-access pathways explicitly.
 */
const PLUMBING: { id: string; type: SystemAssetType }[] = [
  { id: "process", type: "process-equipment" },
  { id: "control-and-safety", type: "controller" },
  { id: "attack-path", type: "remote-access" }
];

/**
 * The two modelled links. ORDER IS THE SOURCE'S OWN: `content.ts` records that
 * the brief prints the view labels (L58) and the cascade stages (L46–52) as
 * separate blocks with no stated mapping, so the pairing is an inference, flagged
 * as one there; this file inherits it and adds nothing. `role` is plumbing, never
 * printed nor spoken in the summary, so no unsourced claim reaches a reader.
 */
const CASCADE_PATHS: SystemPath[] = [
  { id: "c1", from: "process", to: "control-and-safety", role: "attack-path", status: "open" },
  { id: "c2", from: "control-and-safety", to: "attack-path", role: "attack-path", status: "open" }
];

/* Checked at module load, not asserted in a comment. Blue is what an `open` path
   means in the shared contract, so a link re-declared `closed` or `unknown`
   would leave the drawing silently disagreeing with the model. It throws. */
for (const p of CASCADE_PATHS) {
  if (p.status !== "open") throw new Error(`ProcessLineCanvas: path "${p.id}" is not open`);
  const from = PLUMBING.findIndex((n) => n.id === p.from);
  const to = PLUMBING.findIndex((n) => n.id === p.to);
  if (to !== from + 1) throw new Error(`ProcessLineCanvas: path "${p.id}" is not a contiguous chain step`);
}
if (CASCADE_PATHS.length !== PLUMBING.length - 1) {
  throw new Error("ProcessLineCanvas: chain has a gap between graph nodes");
}
if (HERO.strata.length !== PLUMBING.length + 1) {
  throw new Error("ProcessLineCanvas: HERO.strata no longer holds 3 graph nodes plus 1 consequence");
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
/** The cascade riser — the blue run down the left edge. */
const RISER_X = 16;
/** Where each stratum's process line starts, and where the consequence chip does. */
const PROC_X0 = 32;
const PROC_X1 = VB_W - 10;
/** The tap point: where this stratum's instrument meets its process line. */
const TAP_X = 54;
const TAP_R = 4.5;
const HEAD_H = 20;
/** Sized from the deepest thing a band can hold, not by eye: a wrapped label's
 *  descenders sit at `lineY + 52`, and at 80 that cleared the next stratum
 *  boundary by 2 — inside the rounding, so a longer translation would cross it. */
const BAND_H = 84;
const ENTRY_Y = 6;
/** Bubble and glyph hang BELOW the line, so the line stays the band's top edge. */
const LEAD_LEN = 16;
const GLYPH_SIZE = 22;
const TEXT_X = TAP_X + 54;
const TEXT_W = PROC_X1 - TEXT_X;

const bandTop = (i: number) => HEAD_H + i * BAND_H;
const lineY = (i: number) => bandTop(i) + 26;

const CONS_TOP = HEAD_H + PLUMBING.length * BAND_H;
/** Tall enough to CONTAIN a wrapped second line, whose baseline sits at `+42+17`
 *  from the rect's top plus descender clearance. Sized from the text, not by eye:
 *  English fits one line, the eventual Dutch translation is not promised to. */
const CONS_H = 86;
const CONS_W = PROC_X1 - PROC_X0;
const CONS_RECT_Y = CONS_TOP + 10;
const CONS_RECT_H = CONS_H - 18;
/** The flow arrow's centreline, derived from the rect it feeds rather than set
 *  independently, so the two cannot drift apart when the chip is resized. */
const CONS_CY = CONS_RECT_Y + CONS_RECT_H / 2;
/** The arrow's tail. Its tip lands on the chip's left edge. */
const ARROW_X = PROC_X0 - 10;
const VB_H = CONS_TOP + CONS_H + 8;

/** One draw per graph node, plus the draw into the consequence. */
const SEGMENT_COUNT = PLUMBING.length + 1;

/* ── Text fitting ────────────────────────────────────────────────────────── */

/** Condense rather than shrink: the technical-label floor is 11px and Dutch runs
 *  longer than English, so an over-wide string is fitted with SVG's own
 *  `textLength` rather than dropped below the floor. */
function fitted(text: string, width: number, perChar: number) {
  return text.length * perChar > width ? { textLength: width, lengthAdjust: "spacingAndGlyphs" as const } : {};
}

/** Balanced two-line break, for the strings long enough to need one. */
function twoLines(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const words = text.split(" ");
  if (words.length === 1) return [text];
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const d = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (d < bestDiff) [bestDiff, best] = [d, i];
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/* ── Shapes ──────────────────────────────────────────────────────────────── */

const MUTED = "hsl(var(--muted-foreground))";
const INK = "hsl(var(--foreground))";
const BLUE = "hsl(var(--signal-blue))";
const AMBER = "hsl(var(--signal-amber))";
const SANS = { fontFamily: "var(--font-sans)" };
/** A stratum crossing. `--border` because a boundary is page structure, not
 *  model state — the same reasoning `Rule.tsx` gives for its own datum rule. */
const BOUNDARY = { stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "4 4" };
const CASCADE = { fill: "none", stroke: BLUE, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
/** ISA-5.1's weight pair: product line heavy, signal line light. */
const PROCESS_W = 3;
const INSTRUMENT_W = 1.25;

/** Body text, wrapped to at most two lines and condensed if still over-wide.
 *  Shared so a band and the consequence chip cannot drift apart typographically. */
function Lines({ text, x, y, w, max }: { text: string; x: number; y: number; w: number; max: number }) {
  return (
    <>
      {twoLines(text, max).map((line, i) => (
        <text key={i} x={x} y={y + i * 17} fontSize={12.5} fill={INK} style={SANS} {...fitted(line, w, 6.4)}>{line}</text>
      ))}
    </>
  );
}

/** One cascade segment: a right-angled run down the riser and along into the tap
 *  point it arrives at. Lengths differ (the entry stub is shorter than a band
 *  pitch), so `--seg-len` is computed and carried by inline style. */
function Segment({ d, length, drawn }: { d: string; length: number; drawn: boolean }) {
  return (
    <path
      d={d}
      {...CASCADE}
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

/** One stratum, drawn as a P&ID line-and-instrument pair: heavy process line,
 *  light instrument connection dropping from it, bubble at its end, asset glyph
 *  beside the bubble. The tap point is the ONLY thing that changes as the cascade
 *  arrives, so a reader tracking the draw tracks nothing else. */
interface StratumBandProps {
  index: number;
  asset: SystemAsset;
  view: string;
  lit: boolean;
  locale: Locale;
}

function StratumBand({ index, asset, view, lit, locale }: StratumBandProps) {
  const top = bandTop(index);
  const y = lineY(index);
  const Glyph = ASSET_GLYPHS[asset.type];
  const tapClass = [
    lit ? "[--tap-fill:hsl(var(--signal-blue))]" : "[--tap-fill:hsl(var(--card))]",
    "motion-reduce:[--tap-fill:hsl(var(--signal-blue))]"
  ].join(" ");

  return (
    <g>
      {/* No boundary above the first stratum: a rule drawn at the top of the
          canvas would assert a stratum crossing the model does not have. */}
      {index > 0 && <line x1={6} y1={top} x2={PROC_X1} y2={top} {...BOUNDARY} />}

      {/* The stratum's name, set above the line the way a P&ID tags a run.
          Verbatim `strata[n].view`. */}
      <text x={PROC_X1} y={y - 12} fontSize={11} textAnchor="end" fill={MUTED}>{view.toUpperCase()}</text>

      {/* The process line, ISA-5.1 heavy weight — what carries product. */}
      <line x1={PROC_X0} y1={y} x2={PROC_X1} y2={y} stroke={MUTED} strokeWidth={PROCESS_W} strokeLinecap="round" />

      {/* The instrument connection, light weight — what carries a signal — and the
          bubble it terminates in. `Rule.tsx`'s idiom exactly.

          THE STROKE SELECTOR MUST REACH THE ELLIPSE ITSELF. The shared symbol ships
          1.3 in a 32-unit box, landing at 0.89 here — thinner than the 1.25 lead it
          terminates, and a bubble lighter than its own signal line reads as a
          rendering fault; 1.8 lands at 1.24, matching `INSTRUMENT_W`. A presentation
          attribute loses to a CSS rule matching the SAME element but BEATS a value
          inherited from an ancestor, so `stroke-2` on the wrapper is silently inert
          — verified in-browser, and `Rule.tsx` ships that bug today (its bubble
          computes 1.3/`--muted-foreground`, not the 2/`--border` it claims). */}
      <line x1={TAP_X} y1={y} x2={TAP_X} y2={y + LEAD_LEN} stroke={MUTED} strokeWidth={INSTRUMENT_W} />
      <svg x={TAP_X - GLYPH_SIZE / 2} y={y + LEAD_LEN} width={GLYPH_SIZE} height={GLYPH_SIZE} viewBox="0 0 32 32">
        {/* COLOUR ONLY — the glyph strokes `currentColor`, so a text class
            paints it. Weight belongs to the generator: the stencil sits inside a
            scaled `<g>`, so a width set here would be read in its local space
            rather than this canvas's. See twin/pid-symbols.tsx. */}
        <g className="text-muted-foreground">
          <InstrumentBubble />
        </g>
      </svg>

      {/* The asset's own glyph, BESIDE the bubble rather than inside it: the bubble
          is a fixed ISA symbol, and packing a nine-type silhouette into it would
          redraw a standard shape into something that is not one. */}
      <svg x={TAP_X + 22} y={y + LEAD_LEN} width={GLYPH_SIZE} height={GLYPH_SIZE} viewBox="0 0 32 32">
        <Glyph />
      </svg>

      {/* THIS THRESHOLD DOES NOT FIRE IN ENGLISH, and saying otherwise would be a
          comment asserting a rationale the content never exercises: the sourced
          labels are 24, 32 and 39 characters, so every band renders ONE line at
          any max >= 39 (verified in-browser). It is here for the pending Dutch
          translation, where a longer string should WRAP rather than condense below
          the 11px technical-label floor — 40 rather than the ~48 the column fits,
          so a wrapped band still clears the next stratum boundary by 6 units. */}
      <Lines text={asset.label} x={TEXT_X} y={y + LEAD_LEN + 15} w={TEXT_W} max={40} />

      {/* UNLIT fill is `--card` behind a blue ring, not blue itself: the ring is
          a shape and clears 1.4.11's 3:1, and nothing inside it is text. */}
      <g className={tapClass}>
        <circle
          cx={TAP_X} cy={y} r={TAP_R} stroke={BLUE} strokeWidth={1.5}
          style={{ fill: "var(--tap-fill)" }}
          className="transition-[fill] duration-[200ms] motion-reduce:transition-none"
        />
      </g>

      {/* Asset type is announced, never drawn — the glyph carries it visually. */}
      <title>{`${pick(TYPE_LABEL[asset.type], locale)} — ${asset.label}`}</title>
    </g>
  );
}

/** The fourth stratum: `HERO.strata[3]` as TEXT in an amber-outlined label chip,
 *  never a fourth node in the graph. A consequence is not an asset, and the
 *  terminus stays blue while only the chip's outline is amber. */
function ConsequenceChip({ view, elements }: { view: string; elements: string }) {
  return (
    <g>
      <line x1={6} y1={CONS_TOP} x2={PROC_X1} y2={CONS_TOP} {...BOUNDARY} />
      <rect
        x={PROC_X0} y={CONS_RECT_Y} width={CONS_W} height={CONS_RECT_H}
        rx={6} fill="none" stroke={AMBER} strokeWidth={1.5}
      />
      <text x={PROC_X0 + 14} y={CONS_RECT_Y + 21} fontSize={11} fill={MUTED}>{view.toUpperCase()}</text>
      <Lines text={elements} x={PROC_X0 + 14} y={CONS_RECT_Y + 42} w={CONS_W - 28} max={44} />
      {/* The terminus: a P&ID flow-direction arrow feeding the chip, not a fourth
          instrument — the cascade lands here, it does not meet another asset. */}
      <path d={`M${ARROW_X} ${CONS_CY - 6} L${PROC_X0} ${CONS_CY} L${ARROW_X} ${CONS_CY + 6} Z`} fill={BLUE} />
    </g>
  );
}

/* ── The pane ────────────────────────────────────────────────────────────── */

/** Right-angled run: down the riser to `toY`, then along to `toX`. */
function elbow(fromY: number, toY: number, toX: number) {
  return { d: `M${RISER_X} ${fromY} V${toY} H${toX}`, length: toY - fromY + (toX - RISER_X) };
}

const SEGMENTS = [
  elbow(ENTRY_Y, lineY(0), TAP_X - TAP_R),
  ...PLUMBING.slice(1).map((_, i) => elbow(lineY(i), lineY(i + 1), TAP_X - TAP_R)),
  elbow(lineY(PLUMBING.length - 1), CONS_CY, ARROW_X)
];

export function ProcessLineCanvas({ locale }: { locale: Locale }) {
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
       auto-running sequence competes with page load on a slow connection. Reduced
       motion is deliberately NOT consulted: the CSS already holds those readers at
       the end-state and running the sequence would fight it. DEFERRED BY A
       TIMEOUT, not merely to quiet the set-state-in-effect lint: calling `play()`
       inline sets state during the hydration commit, so React re-renders before
       the browser has painted the undrawn canvas once and the first segment
       animates out of a frame nobody saw. */
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
  const consequenceText = pick(consequence.elements, locale);

  /* Pattern 1's required text summary. It names every stratum and its elements,
     which is what makes the animation decorative rather than load-bearing. */
  const summary =
    assets.map((a, i) => `${pick(HERO.strata[i].view, locale)}: ${a.label}`).join(" → ") +
    ` → ${pick(consequence.view, locale)}: ${consequenceText}`;

  return (
    /* THE GROUP MARK IS ON THIS `figure`, NOT the grid cell `ManufacturingHero`
       puts it in: that cell is `items-stretch` and equal by construction, so
       measuring it would let a stretched empty box pass the ratio — the exact
       defect Pattern 1's floor rule exists to catch. `data-gfx-meaning` opts the
       figure into the harness's WCAG 1.4.11 pass, which only checks opted-in
       figures. */
    <figure data-balance-group="hero-panes" data-gfx-meaning className="m-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p data-balance-item className="mono-label rounded-full border border-border px-2.5 py-1">
          {pick(T.claim, locale)}
        </p>
        <button
          data-balance-item type="button" onClick={play}
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
          {/* Cascade first, so the process lines and tap points paint over its
              ends rather than the other way round. */}
          {SEGMENTS.map((s, i) => (
            <Segment key={i} d={s.d} length={s.length} drawn={drawn > i} />
          ))}

          {assets.map((asset, i) => (
            <StratumBand
              key={asset.id} index={i} asset={asset} lit={drawn > i} locale={locale}
              view={pick(HERO.strata[i].view, locale)}
            />
          ))}

          <ConsequenceChip view={pick(consequence.view, locale)} elements={consequenceText} />
        </svg>
      </div>

      {/* Colour is never the only carrier of meaning (Foundation Spec §3.1).
          This canvas uses two signal colours; naming both discharges that. */}
      <ul
        data-balance-item aria-label={pick(T.legendLabel, locale)}
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
