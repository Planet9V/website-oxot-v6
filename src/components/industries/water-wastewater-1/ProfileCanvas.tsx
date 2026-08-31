"use client";

import { motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import type { ProfileSystem } from "./content";

/**
 * THE HYDRAULIC PROFILE — the page's one genuinely memorable moment, and the
 * interactive hero diagram the source brief explicitly asks for ("let the user
 * switch views: Water process / OT / SCADA paths / Cyber route / Public-health
 * / compliance impact").
 *
 * WHY THIS DRAWING AND NOT A NETWORK MAP. The brief's own words: "Use a
 * source-to-tap / influent-to-effluent interactive system — not an
 * industrial-generic network map." A water treatment works is designed against
 * a *hydraulic profile*: a long section in which grade falls through every
 * treatment barrier and is put back by pumping. That is the sector's real
 * drawing, legible to the plant manager and the SCADA engineer alike, and it
 * makes the brief's central point structurally rather than by caption — a cyber
 * route here does not stop a line, it reaches up out of the comms and control
 * layers into a *process stage*, and everything downstream of that stage is
 * affected.
 *
 * PATTERN: `OXOT_Layout_Styles.md` Pattern 1, Consequence Cascade Hero, built
 * to its actual text rather than its name —
 *  · the path is N discrete per-segment draws (3 here), each 320ms, inside the
 *    Foundation Spec's 300–500ms diagram band; never one long sweep;
 *  · each band lights as its own segment finishes, and the endpoint pulses once;
 *  · the headline and lead are server-rendered by the parent and are never
 *    gated behind any of this;
 *  · the endpoint stays `--signal-blue`, with an `--signal-amber` *label chip*
 *    naming the consequence — the pattern's own correction, because painting an
 *    already-reached target amber would read as "proposed remediation";
 *  · `prefers-reduced-motion` lands straight on the lit end state.
 *
 * THE SEQUENCE IS DECLARATIVE, NOT A TIMER. Every staged element carries its own
 * animation delay on the same 320ms grid as the segment draws, so there is no
 * step counter, no `setTimeout`, and no effect writing state back into React on
 * every view change. Under reduced motion every delay and duration collapses to
 * zero and the whole thing renders in its finished state.
 *
 * TOKEN USE, EACH ONE LOAD-BEARING:
 *  · cyan — the modelled process itself (water column and its surface line).
 *    Cyan means "modelled / verified", and the profile is the modelled system.
 *  · blue — pathway and network: the control/comms drop lines and the traced
 *    route. Blue means exactly that.
 *  · amber — the consequence label chip on a resolved route, per the pattern's
 *    correction above.
 *  · red — the affected stage in the consequence view. Once, on one stage.
 *  · slate — stages downstream of the affected stage: "inactive / context".
 * Green never appears: nothing here has been validated closed.
 *
 * No number is drawn anywhere — no elevation, chainage, flow or set point. The
 * source states none, so the profile is qualitative: relative grade only.
 */

const W = 760;
const H = 348;
const PAD = 24;
const COLS = 7;
const COL = (W - PAD * 2) / COLS;
const TOP = 26;
const BASE = 170;
const LABEL_Y = 190;
const BAND_H = 26;
const CTRL_Y = 228;
const COMMS_Y = 268;
const ENTRY_Y = 310;

const gradeY = (grade: number) => BASE - ((grade - 1) / 5) * (BASE - TOP);
const colX = (i: number) => PAD + i * COL;
const centerX = (i: number) => PAD + i * COL + COL / 2;

/** Split a stage name across at most two balanced lines. Shrinking the label
 *  instead would break Mobile Rules' "never shrink until labels are
 *  unreadable" — which is also why this canvas is desktop-only and narrow
 *  viewports get a stacked list rather than a scaled-down copy of it. */
function wrapLabel(text: string, maxChars = 13): string[] {
  if (text.length <= maxChars) return [text];
  const words = text.split(" ");
  if (words.length === 1) return [text];
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

const CYAN = "hsl(var(--signal-cyan))";
const BLUE = "hsl(var(--signal-blue))";
const AMBER = "hsl(var(--signal-amber))";
const RED = "hsl(var(--signal-red))";
const SLATE = "hsl(var(--signal-slate))";
const LINE = "hsl(var(--border))";
const INK = "hsl(var(--muted-foreground))";

export const SEGMENT_MS = 320;
const SEG = SEGMENT_MS / 1000;

export interface ProfileCanvasProps {
  system: ProfileSystem;
  /** 0 process · 1 OT/SCADA paths · 2 cyber route · 3 consequence */
  view: number;
  reduced: boolean;
  locale: Locale;
}

export function ProfileCanvas({ system, view, reduced, locale }: ProfileCanvasProps) {
  const targetIndex = system.stages.findIndex((s) => s.id === system.route.targetStageId);
  const tx = centerX(targetIndex);
  const ty = gradeY(system.stages[targetIndex].grade);
  const entryX = centerX(0);

  const showLayers = view >= 1;
  const showRoute = view === 2;
  const showConsequence = view === 3;

  /* Segment n starts at (n−1)·320ms and finishes at n·320ms, so whatever that
     segment reaches lights on exactly that beat. */
  const beat = (n: number) => (reduced ? 0 : n * SEG);
  const dur = reduced ? 0 : 0.24;

  /* The chip normally sits above the stage it labels. Where the target stage is
     the *highest* point of the profile — a lift station, whose whole job is to
     be the high point — there is no room above it, so the chip flips below the
     surface rather than running off the top of the canvas. */
  const chipY = ty - 30 < 40 ? ty + 44 : ty - 30;

  const segments = [
    `M ${entryX},${ENTRY_Y} L ${entryX},${COMMS_Y + BAND_H / 2}`,
    `M ${entryX},${COMMS_Y + BAND_H / 2} L ${tx},${COMMS_Y + BAND_H / 2} L ${tx},${CTRL_Y + BAND_H / 2}`,
    `M ${tx},${CTRL_Y + BAND_H / 2} L ${tx},${ty}`
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* ── The datum: the same ticked rule the page's section dividers use,
             here doing its original job as the reference a profile is measured
             against. */}
      <line x1={PAD} y1={BASE} x2={W - PAD} y2={BASE} stroke={LINE} strokeWidth={1} />
      {Array.from({ length: 23 }).map((_, i) => (
        <line key={`tick-${i}`} x1={PAD + i * 32} y1={BASE} x2={PAD + i * 32} y2={BASE + 4} stroke={LINE} strokeWidth={1} />
      ))}

      {/* ── Water columns, one per stage, so a single stage can recede or be
             flagged without redrawing the whole body. */}
      {system.stages.map((stage, i) => {
        const y = gradeY(stage.grade);
        const receded = showConsequence && i > targetIndex;
        const flagged = showConsequence && i === targetIndex;
        const fill = receded ? SLATE : CYAN;
        const surface = flagged ? RED : receded ? SLATE : CYAN;
        const prevY = i > 0 ? gradeY(system.stages[i - 1].grade) : y;
        return (
          <g key={stage.id}>
            {/* Colour is set, never tweened: `hsl(var(--token))` nests a CSS
                variable inside a colour function, which is not reliably
                interpolable, and a state colour change reads better as an
                immediate switch anyway. Geometry and opacity carry the motion. */}
            <motion.rect
              x={colX(i)}
              width={COL}
              fill={fill}
              initial={false}
              animate={{ y, height: BASE - y, fillOpacity: receded ? 0.07 : 0.12 }}
              transition={{ duration: reduced ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.line
              x1={colX(i)}
              x2={colX(i) + COL}
              stroke={surface}
              initial={false}
              animate={{ y1: y, y2: y }}
              transition={{ duration: reduced ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
              strokeWidth={flagged ? 2.75 : 1.75}
              strokeLinecap="square"
            />
            {i > 0 && (
              <>
                {/* Stage division. */}
                <line
                  x1={colX(i)}
                  y1={Math.min(y, prevY)}
                  x2={colX(i)}
                  y2={BASE}
                  stroke={LINE}
                  strokeWidth={1}
                  strokeDasharray="2 3"
                />
                {/* The riser between two stages: a fall, or — where the stage
                    is a pump or a lift station — a lift, marked with a
                    chevron. That asymmetry is the whole reason this drawing
                    exists rather than a flat left-to-right chain. */}
                <motion.line
                  x1={colX(i)}
                  x2={colX(i)}
                  stroke={receded ? SLATE : CYAN}
                  initial={false}
                  animate={{ y1: prevY, y2: y }}
                  transition={{ duration: reduced ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                  strokeWidth={1.75}
                />
              </>
            )}
            {stage.lift && i > 0 && (
              <path
                d={`M ${colX(i) - 5},${prevY - 8} L ${colX(i)},${prevY - 16} L ${colX(i) + 5},${prevY - 8}`}
                fill="none"
                stroke={CYAN}
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {wrapLabel(pick(stage.name, locale)).map((line, li) => (
              <text
                key={li}
                x={centerX(i)}
                y={LABEL_Y + li * 13}
                textAnchor="middle"
                fontSize={11}
                letterSpacing="0.04em"
                fill={flagged ? "hsl(var(--foreground))" : INK}
                fontWeight={flagged ? 600 : 400}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* ── The two shared layers. They span every stage because the source's
             own architecture blocks list them beneath the whole chain; no
             control is assigned to any single stage, because the source
             assigns none and guessing one would be fabricated. */}
      <motion.g initial={false} animate={{ opacity: showLayers ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
        {showLayers &&
          system.stages.map((stage, i) => (
            <line
              key={`drop-${stage.id}`}
              x1={centerX(i)}
              y1={BASE + 6}
              x2={centerX(i)}
              y2={CTRL_Y}
              stroke={BLUE}
              strokeOpacity={0.45}
              strokeWidth={1}
              strokeDasharray="2 4"
            />
          ))}
        <Band
          y={CTRL_Y}
          caption="Control"
          text={pick(system.controlLayer, locale)}
          litDelay={showRoute ? beat(2) : null}
          dur={dur}
        />
        {[1.5, 3.5, 5.5].map((f) => (
          <line
            key={`bridge-${f}`}
            x1={PAD + COL * f}
            y1={CTRL_Y + BAND_H}
            x2={PAD + COL * f}
            y2={COMMS_Y}
            stroke={BLUE}
            strokeOpacity={0.45}
            strokeWidth={1}
            strokeDasharray="2 4"
          />
        ))}
        <Band
          y={COMMS_Y}
          caption="Comms"
          text={pick(system.commsLayer, locale)}
          litDelay={showRoute ? beat(1) : null}
          dur={dur}
        />
      </motion.g>

      {/* ── The traced route: three discrete draws, each inside the 300–500ms
             diagram band, never one continuous sweep. */}
      {showRoute && (
        <g key={`route-${system.id}`}>
          <rect
            x={PAD}
            y={ENTRY_Y - 13}
            width={COL * 2}
            height={BAND_H}
            rx={4}
            fill="hsl(var(--card))"
            stroke={BLUE}
            strokeWidth={1.25}
          />
          <text x={PAD + 10} y={ENTRY_Y + 4} fontSize={11} letterSpacing="0.04em" fill="hsl(var(--foreground))">
            {pick(system.route.entry, locale)}
          </text>
          {segments.map((d, i) => (
            <motion.path
              key={`seg-${i}`}
              d={d}
              fill="none"
              stroke={BLUE}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduced ? 0 : SEG, delay: beat(i), ease: "easeInOut" }}
            />
          ))}

          {/* The reached stage: its surface takes the pathway colour on the
              beat the final segment lands, and pulses once. */}
          <motion.line
            x1={colX(targetIndex)}
            y1={ty}
            x2={colX(targetIndex) + COL}
            y2={ty}
            stroke={BLUE}
            strokeWidth={2.75}
            strokeLinecap="square"
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur, delay: beat(3) }}
          />
          {!reduced && (
            <motion.circle
              cx={tx}
              cy={ty}
              fill="none"
              stroke={BLUE}
              strokeWidth={1.5}
              initial={{ r: 4, opacity: 0 }}
              animate={{ r: [4, 4, 15], opacity: [0, 0.9, 0] }}
              transition={{ duration: beat(3) + 0.45, times: [0, beat(3) / (beat(3) + 0.45), 1], ease: "easeOut" }}
            />
          )}
          <motion.g
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur, delay: beat(3) }}
          >
            <ConsequenceChip x={tx} y={chipY} label={pick(system.route.consequence, locale)} stroke={AMBER} />
          </motion.g>
        </g>
      )}

      {/* ── Consequence view: one stage flagged, everything downstream receding
             to context. Red appears exactly here and nowhere else on the page. */}
      {showConsequence && (
        <g>
          <line x1={tx} y1={ty} x2={tx} y2={BASE} stroke={RED} strokeWidth={1.5} strokeDasharray="4 3" />
          <ConsequenceChip x={tx} y={chipY} label={pick(system.route.consequence, locale)} stroke={RED} />
        </g>
      )}
    </svg>
  );
}

function Band({
  y,
  caption,
  text,
  litDelay,
  dur
}: {
  y: number;
  caption: string;
  text: string;
  /** Seconds to wait before this band reads as on-route, or null if it is not. */
  litDelay: number | null;
  dur: number;
}) {
  return (
    <g>
      <rect x={PAD} y={y} width={W - PAD * 2} height={BAND_H} rx={4} fill="hsl(var(--muted))" stroke={LINE} strokeWidth={1} />
      {litDelay !== null && (
        <motion.rect
          x={PAD}
          y={y}
          width={W - PAD * 2}
          height={BAND_H}
          rx={4}
          fill="none"
          stroke={BLUE}
          strokeWidth={1.5}
          initial={{ opacity: dur === 0 ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur, delay: litDelay }}
        />
      )}
      <text x={PAD + 12} y={y + 17} fontSize={11} letterSpacing="0.06em" fill="hsl(var(--foreground))" fontWeight={600}>
        {caption.toUpperCase()}
      </text>
      <text x={PAD + 24 + caption.length * 9.5} y={y + 17} fontSize={11} letterSpacing="0.03em" fill={INK}>
        {text}
      </text>
    </g>
  );
}

/** A label chip, never a bare coloured dot: the stroke carries the state and
 *  the words carry the meaning — the hard rule against unlabelled traffic-light
 *  indicators, applied to a diagram rather than a table. */
function ConsequenceChip({ x, y, label, stroke }: { x: number; y: number; label: string; stroke: string }) {
  const width = label.length * 6.8 + 20;
  const left = Math.min(Math.max(x - width / 2, PAD), W - PAD - width);
  return (
    <g>
      <rect x={left} y={y - 13} width={width} height={24} rx={4} fill="hsl(var(--card))" stroke={stroke} strokeWidth={1.25} />
      <text x={left + width / 2} y={y + 3} textAnchor="middle" fontSize={11} letterSpacing="0.04em" fill="hsl(var(--foreground))">
        {label}
      </text>
    </g>
  );
}
