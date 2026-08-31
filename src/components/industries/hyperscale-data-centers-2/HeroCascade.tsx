"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ASSET_GLYPHS, TYPE_LABEL } from "@/components/twin/AssetNode";
import type { SystemPath } from "@/components/twin/types";
import { same } from "../registry";
import { MODEL } from "./content";

/**
 * S00's RIGHT PANE — `OXOT_Layout_Styles.md` PATTERN 1, CONSEQUENCE CASCADE HERO.
 *
 * NOT `TwinExplorer`, which lays out through ELK inside a `useEffect` and so
 * paints "Loading diagram…" into the hero, the opposite of Pattern 1's "renders
 * immediately at paint". TECHNIQUE IS `rail-transportation-2/HeroCanvas.tsx`'s and
 * `manufacturing-process-2/ProcessLineCanvas.tsx`'s, reused exactly — five
 * discrete 360ms draws 420ms apart, reduced motion in CSS and never JS, one CSS
 * variable per animated value, segment length by inline style, blue for the
 * cascade and never green with amber only on the consequence chip, model geometry
 * in `--muted-foreground` not `--border` to clear WCAG 1.4.11's 3:1. Their
 * docblocks carry that rationale in full rather than it being restated here. THE
 * DRAWING IS NOT REUSED — everything below is this page's own.
 *
 * AN A/B PATH PAIR BRIDGED BY A CROSS-TIE, ONE PAIR PER DEPTH LEVEL — this page's
 * signature, which `Rule.tsx` derives from the eight places
 * `industry_hyperscale.md` names A/B redundancy and the common-mode dependency
 * bridging it. Energy draws a busbar with tap-offs, manufacturing a P&ID line, rail
 * a signalling block run; hyperscale is the only one of the four that is TWO runs,
 * and the tie the only element in any of them meaning "shared". It is the hero's
 * own figure, not `Rule.tsx` enlarged — that datum is a 10px header rule in
 * page-chrome tokens; the two share an idiom, not a component.
 *
 * THE CASCADE LANDS ON THE TIE, NOT ON A RUN. Source L125 states the challenge as
 * "a hidden common-mode dependency across redundant paths" and L126 that a cyber
 * issue reaching switchgear, generator controls, UPS monitoring, cooling plant or
 * BMS "can consume redundancy and turn a minor physical event into a capacity
 * event". A cascade arriving at A or B would say the opposite of what the page
 * argues — that the redundant partner still stands.
 *
 * FOUR OF THE FIVE DEPTH LEVELS ARE GRAPH NODES; THE FIFTH IS TEXT.
 * `MODEL.depthChain` is source L51–L59 verbatim, and its last entry renders in the
 * amber-outlined chip, never as a fifth node — a consequence is not an asset.
 *
 * TWO DEPARTURES FROM THE PRECEDENTS, both deliberate.
 *  1. `--primary-ink` is absent though `Rule.tsx` accents its own cross-tie with
 *     it: in a canvas whose other colours are signal tokens a brand accent would
 *     read as a fifth piece of model state. The junction node marks the tie.
 *  2. No asset glyph on the four depth bands. Both siblings hang one of the nine
 *     `SystemAssetType` silhouettes per stratum because their stage names name
 *     asset classes ("wayside assets, rolling stock"); `MODEL.depthChain`'s do
 *     not — "Campus / site view" is a scope a visitor descends through, and giving
 *     a scope an engineering silhouette would be a fabricated asset claim.
 *
 * THE ENTRY CHIP CARRIES ONE OF THE NINE SCENARIOS, AND WHICH ONE IS A DOCUMENTED
 * CHOICE. Pattern 1 describes its own entry point as "a labeled remote-access
 * chip", and `MODEL.scenarios[0]` — source L65, "BMS vendor remote access" — is
 * the source's first-listed scenario, a remote-access entry point in the literal
 * sense Pattern 1 means, and the item `MODEL.purpose` (L102) closes on, where
 * "vendor path" stands beside the cooling-controller network, the
 * electrical-monitoring platform and the generator controller. The other eight are
 * NOT drawn: the source puts scenario SELECTION in the interactive model (L62),
 * which is S01's section. The INDEX is used rather than a copy of the string, so a
 * `content.ts` change cannot leave this file drawing a stale label — the
 * module-load check below fails instead.
 *
 * `MODEL.buildNote` IS HONOURED AND NEVER PRINTED. Source L46 rules out a rotating
 * 3D building and asks for a navigable dependency model on the live Twin's own
 * logical structure. Nothing here is a building, rotating or static: it is the
 * dependency structure itself, in the same `@/components/twin` contract the live
 * Twin uses. Printing the instruction beside the thing that satisfies it would put
 * build direction on the page — `rail-transportation-2`'s own treatment of its
 * `segmentToggleNote`.
 *
 * NO FACILITY ANNOTATION IS PRINTED ANYWHERE: no "A"/"B" letter, bus ID, voltage,
 * tier rating, hall name, MW or kW figure — the source states none for any specific
 * facility, and one invented to look authentic would be a fabricated engineering
 * fact. The one numeral printed per band is the level's ordinal in the source's own
 * ordered descent, a fact about that list, not about a data center.
 */

/* ── Copy belonging to the drawing rather than to the page ───────────────── */

const T = {
  play: same("Play the cascade"),
  replay: same("Replay the cascade"),
  /* Pattern 1's claim boundary, printed rather than implied — the exact literal
     `OXOT_Layout_Styles.md` L20 binds to illustrative Twin scenarios. */
  claim: same("Illustrative scenario — no customer data"),
  /* Source L62's own word for what the entry chip holds, not a caption about it. */
  scenarioLabel: same("Scenario"),
  /* Describes the DRAWING, not the facility, so it states no engineering fact. */
  diagramLabel: same(
    "Hyperscale dependency model, drawn as an A/B path pair bridged by a shared cross-tie at each level of the model's depth"
  ),
  summaryLabel: same("Modelled cascade, in words"),
  legendLabel: same("What the two colours mean"),
  legendPath: same("Modelled cascade — open, nothing closed"),
  legendConsequence: same("Failure cascade and business consequence")
};

/* ── The four graph levels ───────────────────────────────────────────────── */

/** One id per depth level that is a graph node — `MODEL.depthChain[0..3]`; the
 *  fifth is the consequence chip and has no entry. Ids are plumbing; every LABEL
 *  drawn is `MODEL.depthChain[n]` verbatim. */
const LEVEL_IDS = ["campus-site", "data-hall", "electrical-cooling-train", "control-network-pathway"];

/** The scenario the entry chip carries — `MODEL.scenarios[0]`, source L65. */
const SCENARIO_INDEX = 0;

/** The three modelled links between the four graph nodes. `role` is plumbing,
 *  never printed on the canvas nor spoken in the summary, so no unsourced
 *  descriptive claim reaches a reader. */
const CASCADE_PATHS: SystemPath[] = [
  { id: "c1", from: "campus-site", to: "data-hall", role: "attack-path", status: "open" },
  { id: "c2", from: "data-hall", to: "electrical-cooling-train", role: "attack-path", status: "open" },
  { id: "c3", from: "electrical-cooling-train", to: "control-network-pathway", role: "attack-path", status: "open" }
];

/* Checked at module load, not asserted in a comment: blue is what `open` means
   in the shared contract, so a link re-declared otherwise would leave the drawing
   silently disagreeing with the model. It throws instead. */
for (const p of CASCADE_PATHS) {
  if (p.status !== "open") throw new Error(`HeroCascade: path "${p.id}" is not open`);
  const from = LEVEL_IDS.indexOf(p.from);
  const to = LEVEL_IDS.indexOf(p.to);
  if (to !== from + 1) throw new Error(`HeroCascade: path "${p.id}" is not a contiguous chain step`);
}
if (CASCADE_PATHS.length !== LEVEL_IDS.length - 1) {
  throw new Error("HeroCascade: chain has a gap between graph nodes");
}
if (MODEL.depthChain.length !== LEVEL_IDS.length + 1) {
  throw new Error("HeroCascade: MODEL.depthChain no longer holds 4 graph levels plus 1 consequence");
}
if (!MODEL.scenarios[SCENARIO_INDEX]) {
  throw new Error("HeroCascade: MODEL.scenarios has no entry at the illustrated index");
}

/* ── Geometry, in viewBox units ──────────────────────────────────────────── */

/** Wide, because the A/B channel carries its level name BETWEEN the two runs; a
 *  narrow viewBox would wrap those names or leave the pair running past its own
 *  content as bare chrome. Width is also the one lever Pattern 1's balance floor
 *  permits — it spreads real content instead of stretching an empty box. */
const VB_W = 660;
/** The cascade riser — the blue run down the left edge. */
const RISER_X = 20;
/** Where both runs of every pair begin and end. */
const RUNS_X0 = 34;
const RUNS_X1 = VB_W - 10;
/** The cross-tie: the shared element bridging A and B, set early in the run so
 *  both paths visibly continue past it and it reads as a bridge, not a terminus. */
const TIE_X = 56;
const NODE_R = 4.5;

const ENTRY_X0 = 6;
const ENTRY_Y0 = 4;
const ENTRY_W = 300;
const ENTRY_H = 46;
const ENTRY_GLYPH = 20;

const HEAD_H = ENTRY_Y0 + ENTRY_H + 14;
/** Sized from the deepest thing a band holds: the pair, the level name between
 *  its runs, and clearance to the next boundary rule. */
const BAND_H = 60;
/** The gap between path A and path B — the channel the level name sits in. */
const PAIR_GAP = 28;

const bandTop = (i: number) => HEAD_H + i * BAND_H;
const runA = (i: number) => bandTop(i) + 14;
const runB = (i: number) => runA(i) + PAIR_GAP;
/** The tie's midpoint, which is where the cascade arrives. */
const channelMid = (i: number) => bandTop(i) + 14 + PAIR_GAP / 2;

const TEXT_X = TIE_X + 22;
const ORDINAL_X = RUNS_X1 - 8;
const TEXT_W = ORDINAL_X - 18 - TEXT_X;

const CONS_TOP = HEAD_H + LEVEL_IDS.length * BAND_H;
const CONS_X0 = RUNS_X0;
const CONS_W = RUNS_X1 - CONS_X0;
/** The arrow's tail. Its tip lands on the chip's left edge. */
const ARROW_X = CONS_X0 - 11;
const CONS_TEXT_TOP = 26;
const CONS_LINE_H = 17;

/** SIZED FROM ITS OWN TEXT AT RENDER, not from a constant — the rail build's
 *  correction: a height hard-coded for a wrapped second line leaves the English
 *  one-line case in an amber box half full of empty space, and measuring the
 *  wrapped count also stays right when Dutch wraps where English does not. */
function consMetrics(lineCount: number) {
  const rectY = CONS_TOP + 8;
  const rectH = CONS_TEXT_TOP + (lineCount - 1) * CONS_LINE_H + 12;
  return { rectY, rectH, cy: rectY + rectH / 2, vbH: rectY + rectH + 10 };
}

/** One draw per graph node, plus the draw into the consequence. */
const SEGMENT_COUNT = LEVEL_IDS.length + 1;

/** Condense rather than shrink: the technical-label floor is 11px, so an
 *  over-wide string is fitted with SVG's own `textLength` instead. */
function fitted(text: string, width: number, perChar: number) {
  return text.length * perChar > width
    ? { textLength: width, lengthAdjust: "spacingAndGlyphs" as const }
    : {};
}

/** Greedy-first two-line break, balanced only as a fallback — the rail build's
 *  version, kept because balance alone breaks a phrase at the wrong word. */
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
/** A level crossing. `--border` because a boundary is page structure, not model
 *  state — `Rule.tsx`'s reasoning for its datum rule. */
const BOUNDARY = { stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "4 4" };
const CASCADE = { fill: "none", stroke: BLUE, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
/** Path A, path B and the tie are drawn at ONE weight: redundant paths are peers,
 *  so weighting either would assert a primary/standby relationship the source
 *  never states, and weighting the tie would make the shared element heavier
 *  plant than the paths it bridges. */
const RUN_W = 2;

/** One depth level: path A above, path B below, the cross-tie between them, the
 *  junction node the cascade arrives at, and the level's own name set inside the
 *  channel the pair encloses. */
interface LevelBandProps {
  index: number;
  label: string;
  lit: boolean;
}

function LevelBand({ index, label, lit }: LevelBandProps) {
  const top = bandTop(index);
  const mid = channelMid(index);
  const nodeClass = [
    lit ? "[--node-fill:hsl(var(--signal-blue))]" : "[--node-fill:hsl(var(--card))]",
    "motion-reduce:[--node-fill:hsl(var(--signal-blue))]"
  ].join(" ");

  return (
    <g>
      {/* No boundary above the first level: a rule drawn at the top of the
          canvas would assert a level crossing the model does not have. */}
      {index > 0 && <line x1={6} y1={top} x2={RUNS_X1} y2={top} {...BOUNDARY} />}

      {/* Path A and path B — two independent runs, drawn as peers — and between
          them the cross-tie, the one element on this page that means "shared". */}
      <line x1={RUNS_X0} y1={runA(index)} x2={RUNS_X1} y2={runA(index)} stroke={MUTED} strokeWidth={RUN_W} />
      <line x1={RUNS_X0} y1={runB(index)} x2={RUNS_X1} y2={runB(index)} stroke={MUTED} strokeWidth={RUN_W} />
      <line x1={TIE_X} y1={runA(index)} x2={TIE_X} y2={runB(index)} stroke={MUTED} strokeWidth={RUN_W} />

      {/* The level's own name, verbatim, set inside the channel the runs enclose. */}
      <text x={TEXT_X} y={mid + 4.5} fontSize={12.5} fill={INK} style={SANS} {...fitted(label, TEXT_W, 6.4)}>
        {label}
      </text>

      {/* Position in the source's ordered descent — a fact about that list, not
          an annotation about a facility. */}
      <text x={ORDINAL_X} y={mid + 4} fontSize={10.5} textAnchor="end" fill={MUTED}>
        {index + 1}
      </text>

      {/* UNLIT fill is `--card` behind a blue ring, not blue itself: the ring is
          a shape and clears 1.4.11's 3:1, and nothing inside it is text. */}
      <g className={nodeClass}>
        <circle
          cx={TIE_X} cy={mid} r={NODE_R} stroke={BLUE} strokeWidth={1.5}
          style={{ fill: "var(--node-fill)" }}
          className="transition-[fill] duration-[200ms] motion-reduce:transition-none"
        />
      </g>
    </g>
  );
}

/** The entry point: Pattern 1's own "labeled remote-access chip", carrying
 *  `MODEL.scenarios[0]` and this canvas's one asset glyph. */
function EntryChip({ eyebrow, scenario, typeLabel }: { eyebrow: string; scenario: string; typeLabel: string }) {
  const Glyph = ASSET_GLYPHS["remote-access"];
  return (
    <g>
      <rect
        x={ENTRY_X0} y={ENTRY_Y0} width={ENTRY_W} height={ENTRY_H}
        rx={6} fill="none" stroke={MUTED} strokeWidth={1.25}
      />
      <text x={ENTRY_X0 + 12} y={ENTRY_Y0 + 15} fontSize={10} fill={MUTED}>
        {eyebrow.toUpperCase()}
      </text>
      <svg x={ENTRY_X0 + 8} y={ENTRY_Y0 + 21} width={ENTRY_GLYPH} height={ENTRY_GLYPH} viewBox="0 0 32 32">
        <Glyph />
      </svg>
      <text
        x={ENTRY_X0 + 34} y={ENTRY_Y0 + 36} fontSize={12.5} fill={INK} style={SANS}
        {...fitted(scenario, ENTRY_W - 46, 6.4)}
      >
        {scenario}
      </text>
      {/* Asset type is announced, never drawn — the glyph carries it visually. */}
      <title>{`${typeLabel} — ${scenario}`}</title>
    </g>
  );
}

/** The fifth level: `MODEL.depthChain[4]` as TEXT in an amber-outlined chip,
 *  never a fifth node. A consequence is not an asset, and the terminus stays blue
 *  while only the chip's outline is amber. */
function ConsequenceChip({ lines }: { lines: string[] }) {
  const { rectY, rectH, cy } = consMetrics(lines.length);
  return (
    <g>
      <line x1={6} y1={CONS_TOP} x2={RUNS_X1} y2={CONS_TOP} {...BOUNDARY} />
      <rect x={CONS_X0} y={rectY} width={CONS_W} height={rectH} rx={6} fill="none" stroke={AMBER} strokeWidth={1.5} />
      {lines.map((line, i) => (
        <text
          key={i} x={CONS_X0 + 14} y={rectY + CONS_TEXT_TOP + i * CONS_LINE_H}
          fontSize={12.5} fill={INK} style={SANS} {...fitted(line, CONS_W - 28, 6.4)}
        >
          {line}
        </text>
      ))}
      {/* The terminus: a flow arrow feeding the chip, not a fifth pair — the
          cascade lands here, it does not meet another level — and it stays BLUE. */}
      <path d={`M${ARROW_X} ${cy - 6} L${CONS_X0} ${cy} L${ARROW_X} ${cy + 6} Z`} fill={BLUE} />
    </g>
  );
}

/* ── The pane ────────────────────────────────────────────────────────────── */

/** One cascade segment: a right-angled run down the riser and along into the
 *  junction node it arrives at. Lengths differ, so `--seg-len` is per-segment. */
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

/** Right-angled run: down the riser to `toY`, then along to `toX`. */
function elbow(fromY: number, toY: number, toX: number) {
  return { d: `M${RISER_X} ${fromY} V${toY} H${toX}`, length: toY - fromY + (toX - RISER_X) };
}

/** Fixed between graph nodes; only the last run, into the chip, depends on how
 *  tall the chip turned out, so that one is built per render. */
const NODE_SEGMENTS = [
  elbow(ENTRY_Y0 + ENTRY_H, channelMid(0), TIE_X - NODE_R),
  ...LEVEL_IDS.slice(1).map((_, i) => elbow(channelMid(i), channelMid(i + 1), TIE_X - NODE_R))
];

export function HeroCascade({ locale }: { locale: Locale }) {
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
       the end-state. DEFERRED BY A TIMEOUT, and not merely to quiet the
       set-state-in-effect lint: calling `play()` inline sets state during the
       hydration commit, so React re-renders before the browser has painted the
       undrawn canvas once and the first segment animates out of an unseen frame. */
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

  const scenario = pick(MODEL.scenarios[SCENARIO_INDEX], locale);
  const levels = LEVEL_IDS.map((id, i) => ({ id, label: pick(MODEL.depthChain[i], locale) }));
  const consequenceLines = twoLines(pick(MODEL.depthChain[LEVEL_IDS.length], locale), 74);
  const consequence = consequenceLines.join(" ");
  const cons = consMetrics(consequenceLines.length);
  const riserSegments = [...NODE_SEGMENTS, elbow(channelMid(LEVEL_IDS.length - 1), cons.cy, ARROW_X)];

  /* Pattern 1's required text summary — the entry scenario, every depth level in
     the source's order, and the consequence the cascade lands in. It is what makes
     the animation decorative rather than load-bearing. */
  const summary = `${scenario} → ${levels.map((l) => l.label).join(" → ")} → ${consequence}`;

  return (
    /* THE GROUP MARK IS ON THIS `figure`, NOT the grid cell `Hero` puts it in:
       that cell is `items-stretch` and equal by construction, so measuring it would
       let a stretched empty box pass the ratio. `data-gfx-meaning` opts the figure
       into the harness's WCAG 1.4.11 pass, which only checks figures that opt in. */
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
          viewBox={`0 0 ${VB_W} ${cons.vbH}`} className="h-auto w-full" role="img"
          aria-label={pick(T.diagramLabel, locale)} style={{ fontFamily: "var(--font-mono)" }}
        >
          {/* Cascade first, so the runs and junction nodes paint over its ends
              rather than the other way round. */}
          {riserSegments.map((s, i) => (
            <Segment key={i} d={s.d} length={s.length} drawn={drawn > i} />
          ))}

          <EntryChip
            eyebrow={pick(T.scenarioLabel, locale)} scenario={scenario}
            typeLabel={pick(TYPE_LABEL["remote-access"], locale)}
          />

          {levels.map((level, i) => (
            <LevelBand key={level.id} index={i} label={level.label} lit={drawn > i} />
          ))}

          <ConsequenceChip lines={consequenceLines} />
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

      <figcaption className="sr-only">
        {pick(T.summaryLabel, locale)}: {summary}.
      </figcaption>
    </figure>
  );
}
