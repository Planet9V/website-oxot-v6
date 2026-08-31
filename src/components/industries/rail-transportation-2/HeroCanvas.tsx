"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ASSET_GLYPHS, TYPE_LABEL } from "@/components/twin/AssetNode";
import type { SystemAssetType, SystemPath } from "@/components/twin/types";
import { same } from "../registry";
import { SegmentSelector } from "./SegmentSelector";
import { DEFAULT_SEGMENT, HERO, SEGMENTS } from "./content";

/**
 * S00's RIGHT PANE — `OXOT_Layout_Styles.md` PATTERN 1, CONSEQUENCE CASCADE HERO,
 * plus the segment toggle that drives it.
 *
 * NOT `TwinExplorer`. Pattern 1 needs N discrete per-segment draws with a node
 * lighting as each finishes, a reduced-motion end-state present before first
 * paint, and mobile tap-to-play; `TwinExplorer` exposes `{assets, paths, locale,
 * title, zoneLabels}` and lays out through ELK inside a `useEffect`, so it paints
 * "Loading diagram…" into the hero — the opposite of "renders immediately at
 * paint". Hand-authored geometry is the sanctioned route, and there are two built
 * precedents: `energy-utilities-2/CascadeCanvas.tsx` and
 * `manufacturing-process-2/ProcessLineCanvas.tsx`. Their TECHNIQUE is reused
 * exactly; the drawing is not.
 *
 * THE DRAWING IS A SIGNALLING-BLOCK DIAGRAM. That is this page's signature and
 * the reason it looks like neither sibling: energy draws a busbar with tap-offs,
 * manufacturing draws a P&ID process line with instrument bubbles, and
 * `industry_rail-transportation.md` asks for neither — it names the interlocking
 * / signalling-block diagram four times as the artifact the visitor brings (see
 * `Rule.tsx`'s docblock for the four citations). So each stratum here is a
 * RUNNING RAIL BROKEN INTO FIXED BLOCKS at block joints, with an unlit signal
 * standing at the head of each block. The block is the safety unit, so the
 * drawing shows boundaries rather than a continuous feed.
 *
 * FIVE STAGES, NOT FOUR, and that is content rather than styling. Source L48–56
 * runs one level deeper than the four-stage cascade the other industry briefs
 * use: rail separates the SERVICE being moved (L48) from the AUTHORITY to move it
 * (L50) before reaching control systems. Four of the five are graph nodes here;
 * the fifth, `HERO.cascade[4]` ("Cyber pathway → operational or safety
 * consequence"), renders as TEXT inside the amber-outlined chip and is never a
 * fifth node — a consequence is not an asset, and fabricating one would put an
 * invented asset in the hero. Both precedents split their terminal stage the same
 * way.
 *
 * THE SEGMENT TOGGLE CHANGES THE MODEL, WHICH IS SOURCE L65's OWN REQUIREMENT
 * ("the model changes rather than merely swapping text"). It is honoured
 * structurally, not by cross-fading a caption: the BLOCKS THEMSELVES are the
 * selected segment's systems, so passenger draws five blocks across four strata
 * and freight draws seven across the same four, at different positions, with
 * different labels, a different glyph type on two strata, and a different number
 * of blocks per rail. Nothing about the drawing except the four stage names and
 * the consequence chip survives the toggle unchanged. The counts are the source's
 * own — L68–70 lists five passenger systems, L71–72 lists seven freight ones —
 * so the visible asymmetry is transcribed, not styled in.
 *
 * WHICH SYSTEM SITS ON WHICH STRATUM IS AN INFERENCE, AND IS FLAGGED AS ONE.
 * The source prints the five-stage cascade (L48–56) and the two per-segment
 * system lists (L68–72) as SEPARATE blocks and never states a mapping between
 * them, exactly as `content.ts` records for the toggle itself. The allocation in
 * `STRATA` below is therefore this file's, not the brief's, and every entry is
 * placed against a word the stage name itself contains wherever one exists — see
 * the per-entry notes there. It is the smallest inference that lets the two
 * sourced structures be drawn as one figure; no system is renamed, dropped,
 * added, or re-worded to make it fit.
 *
 * THE LIT MARKER IS DELIBERATELY NOT THE SIGNAL HEAD. `Rule.tsx` states the
 * binding reason: a displayed signal aspect asserts a movement authority that
 * does not exist, so the signal heads on this canvas are drawn unlit and stay
 * unlit through the whole sequence. What lights as the cascade arrives is the
 * separate junction node where the cascade riser meets the stratum's rail — a
 * modelled-cascade marker, the same circle both precedents use, carrying no rail
 * operational semantics at all. No aspect, train number, headway, subdivision or
 * territory ID is printed anywhere, for the same reason.
 *
 * WHAT ANIMATES: the blue cascade, one segment at a time, and the junction node
 * it arrives at. Nothing else — every rail, block joint, signal, glyph, label and
 * the consequence chip are server-rendered at full opacity and readable before a
 * line of JavaScript runs, which is Pattern 1's own correction. FIVE discrete
 * draws, 360ms each, 420ms apart, so every single motion sits inside the
 * 300–500ms diagram tier rather than adding up to one continuous sweep.
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
 *    invisible to that scan.
 *
 * TOGGLING DOES NOT RESTART THE SEQUENCE. If the cascade has already drawn, the
 * new segment's model renders drawn; if it has not, it renders undrawn. Replaying
 * on every toggle would put a two-second animation between the visitor and the
 * comparison they are actually making, which is the two models against each other
 * in quick succession.
 *
 * TOKENS. The cascade is `--signal-blue` end to end and never resolves to green:
 * nothing is validated-closed at first paint. Amber appears once, on the
 * consequence chip's outline — amber means *proposed/pending*, so an amber
 * terminus would read as a remediation proposal rather than an impact. Rails,
 * block joints and signals are `--muted-foreground`, NOT `--border`: `Rule.tsx`
 * uses `--border` because a datum rule is page chrome, while everything here
 * carries model meaning and has to clear WCAG 1.4.11's 3:1 non-text floor, which
 * a hairline tuned to separate text blocks does not. No word is painted in a
 * signal token: those clear 1.4.11's 3:1 non-text floor, their whole budget, and
 * measure ~3.5:1 on `--card` against 1.4.3's 4.5:1. Shapes carry the signal,
 * words name it.
 *
 * `HERO.segmentToggleNote` IS NOT PRINTED. It is the brief's instruction to
 * whoever renders this figure ("the model changes rather than merely swapping
 * text"), not copy addressed to a visitor; printing it would put build direction
 * on the page. It is honoured by `STRATA` instead, which is what it asks for.
 */

/* ── Copy belonging to the drawing rather than to the page ───────────────── */

const T = {
  play: same("Play the cascade"),
  replay: same("Replay the cascade"),
  /* Pattern 1's claim boundary, printed rather than implied. This is the exact
     literal `OXOT_Layout_Styles.md` binds to illustrative Twin scenarios. */
  claim: same("Illustrative scenario — no customer data"),
  diagramTitle: same(
    "Railway operating model: service movement, movement authority and dispatch, signalling and control systems, wayside and rolling-stock assets, and the cyber pathway to an operational or safety consequence"
  ),
  selectorLabel: same("Rail segment"),
  summaryLabel: same("Modelled cascade, in words"),
  legendLabel: same("What the two colours mean"),
  legendPath: same("Modelled cascade — open, nothing closed"),
  legendConsequence: same("Operational or safety consequence")
};

/* ── The four graph strata ───────────────────────────────────────────────── */

/**
 * One entry per cascade stage that is a graph node — `HERO.cascade[0..3]`. The
 * fifth stage is the consequence chip and has no entry here.
 *
 * `systems` indexes into `SEGMENTS[n].heroModel`, which is the source's own
 * per-segment list in the source's own order (content.ts L88–94, L103–111).
 * Indices rather than copies, so a change to that list cannot leave this file
 * quietly drawing a stale label — the module-load checks below fail instead.
 *
 * THE ALLOCATION IS THIS FILE'S INFERENCE (see the docblock). Reasoning per row:
 *  0 · "Passengers / freight movement" — the service being moved. Passenger takes
 *      `Passenger information`, the one listed system addressed to passengers
 *      rather than to trains; freight takes `Yards`, the one listed system about
 *      where freight movement is assembled rather than about controlling a train.
 *  1 · "Train movement authority / dispatch / route setting" — passenger takes
 *      `CBTC / ETCS`, the systems that issue movement authority; freight takes
 *      `PTC` and `Dispatch`, and the stage name prints "dispatch" itself.
 *  2 · "Signaling, interlocking, train control, SCADA, power, telecoms" — every
 *      member is a literal word match against that stage name: passenger's
 *      `Interlocking` and `Traction power`, freight's `Fuel and power`.
 *  3 · "Wayside assets, rolling stock, depots, crossings, field equipment" —
 *      freight's `Wayside interface units`, `Grade crossings` and `Locomotive
 *      systems` are three literal word matches ("wayside", "crossings", "rolling
 *      stock"). Passenger's `Station systems` is the ONE entry with no literal
 *      match; it is placed here as the fixed lineside installation it is, beside
 *      the stage's own "depots", and is named as the weakest link in this
 *      allocation rather than dressed up as sourced.
 *
 * `type` is a property of the STAGE, not of the segment, because the stage name
 * is what states what kind of thing sits at that level; each is read off the
 * stage's own wording rather than chosen for variety.
 */
const STRATA: { id: string; type: SystemAssetType; systems: { passenger: number[]; freight: number[] } }[] = [
  /* The stage IS the movement of passengers or freight — the delivered service. */
  { id: "service-movement", type: "service", systems: { passenger: [4], freight: [5] } },
  /* Dispatch and route setting are worked at a control-centre operator surface. */
  { id: "movement-authority", type: "hmi", systems: { passenger: [0], freight: [0, 1] } },
  /* Signalling, interlocking, train control and SCADA are control systems. */
  { id: "control-systems", type: "controller", systems: { passenger: [1, 3], freight: [6] } },
  /* The stage's own name is "wayside assets … field equipment". */
  { id: "wayside-and-rolling-stock", type: "field-device", systems: { passenger: [2], freight: [2, 3, 4] } }
];

/**
 * The three modelled links between the four graph nodes. `role` is plumbing —
 * the fifth stage is the source's own "Cyber pathway → operational or safety
 * consequence" — and is never printed on the canvas nor spoken in the text
 * summary, so no unsourced descriptive claim reaches a reader.
 */
const CASCADE_PATHS: SystemPath[] = [
  { id: "c1", from: "service-movement", to: "movement-authority", role: "attack-path", status: "open" },
  { id: "c2", from: "movement-authority", to: "control-systems", role: "attack-path", status: "open" },
  { id: "c3", from: "control-systems", to: "wayside-and-rolling-stock", role: "attack-path", status: "open" }
];

/* Checked at module load, not asserted in a comment. Blue is what an `open` path
   means in the shared contract, so a link re-declared `closed` or `unknown` would
   leave the drawing silently disagreeing with the model. It throws instead. */
for (const p of CASCADE_PATHS) {
  if (p.status !== "open") throw new Error(`HeroCanvas: path "${p.id}" is not open`);
  const from = STRATA.findIndex((s) => s.id === p.from);
  const to = STRATA.findIndex((s) => s.id === p.to);
  if (to !== from + 1) throw new Error(`HeroCanvas: path "${p.id}" is not a contiguous chain step`);
}
if (CASCADE_PATHS.length !== STRATA.length - 1) {
  throw new Error("HeroCanvas: chain has a gap between graph nodes");
}
if (HERO.cascade.length !== STRATA.length + 1) {
  throw new Error("HeroCanvas: HERO.cascade no longer holds 4 graph stages plus 1 consequence");
}
/* Every system in every segment is drawn exactly once, and no index dangles.
   This is what makes the toggle's model change CHECKABLE rather than asserted:
   if `heroModel` grows an entry and `STRATA` does not place it, the page fails to
   build instead of silently dropping a system out of the drawing. */
for (const segment of SEGMENTS) {
  const key = segment.id as "passenger" | "freight";
  const placed = STRATA.flatMap((s) => s.systems[key]);
  if (placed.length !== segment.heroModel.length) {
    throw new Error(
      `HeroCanvas: segment "${segment.id}" places ${placed.length} of ${segment.heroModel.length} systems`
    );
  }
  if (new Set(placed).size !== placed.length) {
    throw new Error(`HeroCanvas: segment "${segment.id}" places a system on more than one stratum`);
  }
  for (const i of placed) {
    if (!segment.heroModel[i]) throw new Error(`HeroCanvas: segment "${segment.id}" has no system at index ${i}`);
  }
}

/* ── Geometry, in viewBox units ──────────────────────────────────────────── */

/* WIDENED FROM 460, MEASURED FIX (`scripts/measure.mjs`, hero-panes group):
   the docblock above this file predicted a ~0.93 height:width figure ratio
   from BAND_H alone, but the real rendered pair was 348px (copy) vs 669px
   (figure), worst=0.52 against Pattern 1's 0.67 floor — the figure was still
   too tall for a copy pane this page's own real content caps at four items.
   `BAND_H` is not the lever: it is sized to the deepest thing a band holds (a
   wrapped two-line label plus glyph clearance), so shrinking it risks
   clipping real content. Widening `VB_W` instead spreads the SAME real
   systems and blocks across more horizontal room without adding, removing or
   inventing anything — every downstream constant (`BLOCKS_X1`, `RUN_W`,
   `CONS_W`) derives from `VB_W`, so the block run and consequence chip widen
   with it and nothing needs to be repositioned by hand. First pass (620)
   measured 553px, still short of the 519px ceiling (348 / 0.67); 700 clears
   it with margin. Re-verified with `measure.mjs` after each change; see this
   page's build record. */
const VB_W = 700;
/** The cascade riser — the blue run down the left edge. */
const RISER_X = 16;
/** The junction node: where the cascade riser meets this stratum's rail. */
const TAP_X = 34;
const TAP_R = 4.5;
/** Where the stratum's block run starts, clear of the junction node's ring. */
const BLOCKS_X0 = 50;
const BLOCKS_X1 = VB_W - 10;
const RUN_W = BLOCKS_X1 - BLOCKS_X0;
/** The gap a block joint stands in. The rail is discontinuous by design. */
const JOINT_GAP = 12;

const HEAD_H = 18;
/** Sized from the deepest thing a band can hold, not by eye: a block label may
 *  wrap to a second line whose baseline sits at `railY + 33` and whose descenders
 *  need clearance under that, and the stratum glyph hangs to `railY + 28`. */
const BAND_H = 82;
const ENTRY_Y = 6;
const GLYPH_SIZE = 22;

const bandTop = (i: number) => HEAD_H + i * BAND_H;
const railY = (i: number) => bandTop(i) + 34;

const CONS_TOP = HEAD_H + STRATA.length * BAND_H;
const CONS_X0 = BLOCKS_X0;
const CONS_W = BLOCKS_X1 - CONS_X0;
/** The arrow's tail. Its tip lands on the chip's left edge. */
const ARROW_X = CONS_X0 - 11;
const CONS_TEXT_TOP = 26;
const CONS_LINE_H = 17;

/**
 * THE CONSEQUENCE CHIP IS SIZED FROM ITS OWN TEXT, at render, rather than from a
 * constant. Both sibling canvases hard-code a height tall enough for a wrapped
 * second line and comment that the English string fits one — which is exactly
 * what it looks like: a single line of text sitting in a box with a hand's width
 * of empty amber-outlined space under it. That is the "bare chrome sized to fill
 * space" failure `OXOT_Layout_Styles.md` names in Pattern 2's minimum-density
 * rule, and it does not stop being one because the box is a chip. Measuring the
 * wrapped line count instead keeps the two-line case correct WITHOUT paying for
 * it in the one-line case, and it stays right when the Dutch translation lands
 * and wraps where English does not.
 *
 * Everything downstream — the riser's terminus, the arrow's centreline, the
 * viewBox height — is derived from this rather than set alongside it, so nothing
 * can drift apart from the box it points at.
 */
function consMetrics(lineCount: number) {
  const rectY = CONS_TOP + 8;
  const rectH = CONS_TEXT_TOP + (lineCount - 1) * CONS_LINE_H + 12;
  return { rectY, rectH, cy: rectY + rectH / 2, vbH: rectY + rectH + 10 };
}

/** One draw per graph node, plus the draw into the consequence. */
const SEGMENT_COUNT = STRATA.length + 1;

/* ── Text fitting ────────────────────────────────────────────────────────── */

/** Condense rather than shrink: the technical-label floor is 11px and Dutch runs
 *  longer than English, so an over-wide string is fitted with SVG's own
 *  `textLength` rather than dropped below the floor. */
function fitted(text: string, width: number, perChar: number) {
  return text.length * perChar > width
    ? { textLength: width, lengthAdjust: "spacingAndGlyphs" as const }
    : {};
}

/**
 * Two-line break for the strings long enough to need one: GREEDY FIRST, balanced
 * only as a fallback.
 *
 * The siblings break on balance alone, and on a rail block that produces a
 * visibly wrong result: at a 21-character measure, "Wayside interface units"
 * balances to "Wayside" / "interface units" (a 7/15 split) when "Wayside
 * interface" / "units" fits the measure outright and reads as one phrase broken
 * once. Balance is the right rule when NEITHER line can be full — here the
 * measure is narrow and the labels are short, so filling the first line is. The
 * balanced pass is kept for the case where no greedy split fits.
 */
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

const MUTED = "hsl(var(--muted-foreground))";
const INK = "hsl(var(--foreground))";
const BLUE = "hsl(var(--signal-blue))";
const AMBER = "hsl(var(--signal-amber))";
const SANS = { fontFamily: "var(--font-sans)" };
/** A stratum crossing. `--border` because a boundary is page structure, not
 *  model state — the same reasoning `Rule.tsx` gives for its own datum rule. */
const BOUNDARY = { stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "4 4" };
const CASCADE = { fill: "none", stroke: BLUE, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
/** The running rail, heavier than the joint standing across the break in it. */
const RAIL_W = 2.5;
const JOINT_W = 1.25;

/**
 * One block of a stratum's rail: the running rail itself, a block joint standing
 * at each end of the break, an unlit signal at the head of the block, and the
 * system that block carries named beneath it.
 *
 * THE SIGNAL HEAD IS DRAWN UNLIT AND STAYS UNLIT. `Rule.tsx` states the reason —
 * a displayed aspect asserts a movement authority that does not exist.
 */
function Block({ x, w, y, label }: { x: number; w: number; y: number; label: string }) {
  return (
    <g>
      {/* The running rail. */}
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={MUTED} strokeWidth={RAIL_W} strokeLinecap="butt" />
      {/* Block joints, standing across the break at each end of the block. */}
      <line x1={x} y1={y - 4.5} x2={x} y2={y + 4.5} stroke={MUTED} strokeWidth={JOINT_W} />
      <line x1={x + w} y1={y - 4.5} x2={x + w} y2={y + 4.5} stroke={MUTED} strokeWidth={JOINT_W} />
      {/* The signal at the head of the block: head above, mast planted on the
          rail — `Rule.tsx`'s own construction, at canvas scale. */}
      <line x1={x + 13} y1={y - 7} x2={x + 13} y2={y} stroke={MUTED} strokeWidth={JOINT_W} />
      <circle cx={x + 13} cy={y - 10} r={2.75} fill="none" stroke={MUTED} strokeWidth={JOINT_W} />
      {twoLines(label, Math.floor((w - 8) / 5.6)).map((line, i) => (
        <text
          key={i}
          x={x + 2}
          y={y + 19 + i * 14}
          fontSize={11}
          fill={INK}
          style={SANS}
          {...fitted(line, w - 8, 5.6)}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/**
 * One cascade segment: a right-angled run down the riser and along into the
 * junction node it arrives at. Lengths differ (the entry stub is shorter than a
 * band pitch), so `--seg-len` is computed and carried by inline style.
 */
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

/**
 * One stratum: the stage name, the junction node the cascade arrives at, the
 * stratum's asset glyph, and the selected segment's systems drawn as blocks
 * along the rail. THE BLOCK RUN IS THE PART THE TOGGLE CHANGES — count,
 * positions and labels all come from the selected segment.
 */
interface StratumBandProps {
  index: number;
  stage: string;
  type: SystemAssetType;
  systems: string[];
  lit: boolean;
  locale: Locale;
}

function StratumBand({ index, stage, type, systems, lit, locale }: StratumBandProps) {
  const top = bandTop(index);
  const y = railY(index);
  const Glyph = ASSET_GLYPHS[type];
  const blockW = (RUN_W - (systems.length - 1) * JOINT_GAP) / systems.length;
  const tapClass = [
    lit ? "[--tap-fill:hsl(var(--signal-blue))]" : "[--tap-fill:hsl(var(--card))]",
    "motion-reduce:[--tap-fill:hsl(var(--signal-blue))]"
  ].join(" ");

  return (
    <g>
      {/* No boundary above the first stratum: a rule drawn at the top of the
          canvas would assert a stratum crossing the model does not have. */}
      {index > 0 && <line x1={6} y1={top} x2={BLOCKS_X1} y2={top} {...BOUNDARY} />}

      {/* The stage name, verbatim `HERO.cascade[index]`, set above its rail run
          the way a block diagram tags a stretch of line. */}
      <text
        x={BLOCKS_X0}
        y={top + 15}
        fontSize={10.5}
        fill={MUTED}
        {...fitted(stage.toUpperCase(), RUN_W, 6.6)}
      >
        {stage.toUpperCase()}
      </text>

      {/* The stub from the junction node into the first block. */}
      <line x1={TAP_X} y1={y} x2={BLOCKS_X0} y2={y} stroke={MUTED} strokeWidth={JOINT_W} />

      {systems.map((label, i) => (
        <Block key={label} x={BLOCKS_X0 + i * (blockW + JOINT_GAP)} w={blockW} y={y} label={label} />
      ))}

      {/* The stratum's asset glyph, hung below the junction node — the class of
          thing this whole stratum holds. ONE per stratum, not one per block:
          every block on a stratum is the same asset class, and repeating the
          silhouette three times would read as three different things. */}
      <svg x={TAP_X - GLYPH_SIZE / 2} y={y + 6} width={GLYPH_SIZE} height={GLYPH_SIZE} viewBox="0 0 32 32">
        <Glyph />
      </svg>

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
      <title>{`${pick(TYPE_LABEL[type], locale)} — ${stage}: ${systems.join(", ")}`}</title>
    </g>
  );
}

/**
 * The fifth stage: `HERO.cascade[4]` as TEXT in an amber-outlined label chip,
 * never a fifth node in the graph. A consequence is not an asset, and the
 * terminus stays blue while only the chip's outline is amber.
 */
function ConsequenceChip({ lines }: { lines: string[] }) {
  const { rectY, rectH, cy } = consMetrics(lines.length);
  return (
    <g>
      <line x1={6} y1={CONS_TOP} x2={BLOCKS_X1} y2={CONS_TOP} {...BOUNDARY} />
      <rect
        x={CONS_X0}
        y={rectY}
        width={CONS_W}
        height={rectH}
        rx={6}
        fill="none"
        stroke={AMBER}
        strokeWidth={1.5}
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={CONS_X0 + 14}
          y={rectY + CONS_TEXT_TOP + i * CONS_LINE_H}
          fontSize={12.5}
          fill={INK}
          style={SANS}
          {...fitted(line, CONS_W - 28, 6.4)}
        >
          {line}
        </text>
      ))}
      {/* The terminus: a flow arrow feeding the chip, not a fifth block — this is
          where the cascade lands, not another asset — and it stays BLUE. */}
      <path d={`M${ARROW_X} ${cy - 6} L${CONS_X0} ${cy} L${ARROW_X} ${cy + 6} Z`} fill={BLUE} />
    </g>
  );
}

/* ── The pane ────────────────────────────────────────────────────────────── */

/** Right-angled run: down the riser to `toY`, then along to `toX`. */
function elbow(fromY: number, toY: number, toX: number) {
  return { d: `M${RISER_X} ${fromY} V${toY} H${toX}`, length: toY - fromY + (toX - RISER_X) };
}

/** The runs between graph nodes are fixed; only the last one — into the chip —
 *  depends on how tall the chip turned out, so it is built per render. */
const NODE_SEGMENTS = [
  elbow(ENTRY_Y, railY(0), TAP_X - TAP_R),
  ...STRATA.slice(1).map((_, i) => elbow(railY(i), railY(i + 1), TAP_X - TAP_R))
];

export function HeroCanvas({ locale }: { locale: Locale }) {
  /* THE HERO HOLDS ITS OWN SELECTION. `SegmentSelector` is stateless by design so
     that S00 and S03 can either share one state or hold one each; the resolved
     decision is INDEPENDENT — the source never describes carrying a selection
     between sections (content.ts L181–187 flags exactly that as unstated), so a
     page-wide selection would be invented behaviour. */
  const [segmentId, setSegmentId] = useState(DEFAULT_SEGMENT);
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

  const segment = SEGMENTS.find((s) => s.id === segmentId) ?? SEGMENTS[0];
  const key = segment.id as "passenger" | "freight";
  /* THE DRAWN MODEL, RESOLVED FROM THE SELECTED SEGMENT. This is the expression
     that makes source L65 true: `systems` changes count, order and content with
     the toggle, and `StratumBand` lays its rail out from `systems.length`. */
  const strata = STRATA.map((s, i) => ({
    ...s,
    stage: pick(HERO.cascade[i], locale),
    systems: s.systems[key].map((n) => pick(segment.heroModel[n], locale))
  }));
  const consequenceLines = twoLines(pick(HERO.cascade[STRATA.length], locale), 56);
  const consequence = consequenceLines.join(" ");
  const cons = consMetrics(consequenceLines.length);
  const riserSegments = [...NODE_SEGMENTS, elbow(railY(STRATA.length - 1), cons.cy, ARROW_X)];

  /* Pattern 1's required text summary. It names every stage and the systems drawn
     on it for the segment currently selected, which is what makes the animation
     decorative rather than load-bearing — and what keeps the toggle's effect
     legible to a reader who never sees the drawing. */
  const summary =
    `${pick(segment.label, locale)} — ` +
    strata.map((s) => `${s.stage}: ${s.systems.join(", ")}`).join(" → ") +
    ` → ${consequence}`;

  return (
    /* THE GROUP MARK IS ON THIS `figure`, NOT the grid cell `Hero` puts it in:
       that cell is `items-stretch` and equal by construction, so measuring it
       would let a stretched empty box pass the ratio — the exact defect Pattern
       1's floor rule exists to catch. `data-gfx-meaning` opts the figure into the
       harness's WCAG 1.4.11 pass, which only checks figures that opt in. */
    <figure data-balance-group="hero-panes" data-gfx-meaning className="m-0">
      {/* THE TOGGLE SITS WITH THE THING IT CHANGES. Source L59 asks for an
          "obvious" toggle and specifies no placement; putting it at the head of
          the visual pane means that on mobile — where Mobile Rules stack copy
          first, then the visual — it still lands immediately above the model it
          re-draws, rather than a screen away from it. */}
      {/* The balance mark goes on the WRAPPER, not on the control: `SegmentSelector`
          declares an exact prop list and does not spread the rest onto its root,
          so a stray `data-*` would be a type error rather than an attribute. */}
      <div data-balance-item>
        <SegmentSelector
          segments={SEGMENTS}
          value={segmentId}
          onValueChange={setSegmentId}
          ariaLabel={pick(T.selectorLabel, locale)}
          locale={locale}
          className="flex w-full"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
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
          viewBox={`0 0 ${VB_W} ${cons.vbH}`}
          className="h-auto w-full"
          role="img"
          aria-label={pick(T.diagramTitle, locale)}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {/* Cascade first, so the rails and junction nodes paint over its ends
              rather than the other way round. */}
          {riserSegments.map((s, i) => (
            <Segment key={i} d={s.d} length={s.length} drawn={drawn > i} />
          ))}

          {strata.map((s, i) => (
            <StratumBand
              key={s.id}
              index={i}
              stage={s.stage}
              type={s.type}
              systems={s.systems}
              lit={drawn > i}
              locale={locale}
            />
          ))}

          <ConsequenceChip lines={consequenceLines} />
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

      {/* Pattern 1's visually-hidden one-sentence path summary. It is keyed to the
          LIVE selection, so a screen-reader user toggling the segment hears the
          model change rather than being told that a caption did. */}
      <figcaption className="sr-only" aria-live="polite">
        {pick(T.summaryLabel, locale)}: {summary}.
      </figcaption>
    </figure>
  );
}
