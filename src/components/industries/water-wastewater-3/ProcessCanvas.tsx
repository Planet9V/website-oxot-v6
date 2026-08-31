import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SHARED_LAYERS, type ArchSystem, type ViewId } from "./content.architecture";

/**
 * S02 · THE DRAWING. A long-section through one water system, with the shared
 * SCADA and communications layers beneath it, and one of four annotation
 * overlays on top.
 *
 * CUSTOM SVG BECAUSE THE INVENTORY SAYS SO. `OXOT_Component_Inventory.md`'s
 * process-diagram row is explicit that these stay custom-built — its research
 * pass found no viable library for this category — and the Foundation Spec's
 * own instruction is SVG/HTML first. Pattern 4 (Facility Cross-Section) is the
 * near miss and is deliberately not used: its layers are the Seldon Engine's
 * seven, which is Platform content, not a treatment train.
 *
 * MARKED `data-gfx-meaning`, WHICH IS A CONSTRAINT ON HOW IT IS DRAWN.
 * `scripts/measure.mjs` then holds every fill and stroke inside this figure to
 * WCAG 1.4.11's 3:1 against its composited backdrop, in both themes. That rules
 * out two things this drawing would otherwise have used and the neighbouring
 * `-2` iteration does use: a faint `--border` hairline, and a low-opacity tint
 * for the water body. Both would report as failures, correctly — a shape that
 * carries the argument has to be visible. So the structural lines are
 * `--muted-foreground` rather than `--border`, and the water column is drawn as
 * cyan depth ticks rather than a 12%-alpha fill. The figure is `aria-hidden`
 * and everything in it is restated as real text by `ProcessArchitecture`; the
 * mark is about the shapes a sighted reader relies on, not a substitute for
 * that text.
 *
 * NO COLOUR-ONLY MEANING. Cyan is the water, blue the shared layers, amber the
 * route or the traced consequence — and every one of those is also stated in
 * words, either as an in-canvas label, a numbered step, or the stage list below
 * the figure.
 */

const W = 900;
const PAD = 30;
const INNER = W - PAD * 2;

/** Grade 6 sits here, grade 1 on the datum. Schematic — see SCHEMATIC_NOTE. */
const TOP = 78;
const BASE = 198;
/** The clear corridor between the datum and the first band, for leaders. */
const CTRL_Y = 262;
/* Each band's first text row starts 20 below its top edge, leaving that top
   edge free for the cyber route's numbered markers to ride on. Before that
   allowance existed the markers were drawn over the band's own equipment list
   and struck through it — found by screenshotting the cyber view, not by
   reading the code. */
const CTRL_H = 50;
const COMMS_Y = 330;
const COMMS_H = 40;
const HEIGHT = 390;

const CYAN = "hsl(var(--signal-cyan))";
const BLUE = "hsl(var(--signal-blue))";
const AMBER = "hsl(var(--signal-amber))";
const INK = "hsl(var(--muted-foreground))";
const FG = "hsl(var(--foreground))";
const CARD = "hsl(var(--card))";

const gradeY = (grade: number) => BASE - ((grade - 1) / 5) * (BASE - TOP);

/** Greedy wrap to at most two lines, so a long stage name cannot push into its
 *  neighbour's column. The list below the figure carries the untruncated name. */
function wrap(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const out: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (!line) line = word;
    else if (`${line} ${word}`.length <= maxChars) line = `${line} ${word}`;
    else {
      out.push(line);
      line = word;
    }
  }
  if (line) out.push(line);
  return out.slice(0, 2);
}

function Band({
  y,
  height,
  caption,
  text,
  extra
}: {
  y: number;
  height: number;
  caption: string;
  text: string;
  extra?: string;
}) {
  return (
    <g>
      {/* Filled, not `none`, and drawn AFTER the route: the route line then
          disappears into the layer and emerges above it instead of striking
          through the layer's own equipment list. The fill is the card colour
          and so carries no contrast of its own — 1.4.11 is satisfied by the
          stroke, which is what the criterion asks of a shape that can pass on
          either paint. */}
      <rect x={PAD} y={y} width={INNER} height={height} rx={4} fill={CARD} stroke={BLUE} strokeWidth={1.5} />
      <text x={PAD + 14} y={y + 20} fontSize={11} letterSpacing="0.08em" fontWeight={600} fill={FG}>
        {caption.toUpperCase()}
      </text>
      <text x={PAD + 14} y={y + 33} fontSize={12} letterSpacing="0.02em" fill={INK}>
        {text}
      </text>
      {extra && (
        <text x={PAD + 14} y={y + 46} fontSize={11} letterSpacing="0.04em" fill={INK}>
          {extra}
        </text>
      )}
    </g>
  );
}

export function ProcessCanvas({
  locale,
  system,
  view
}: {
  locale: Locale;
  system: ArchSystem;
  /**
   * THREE VIEWS, NOT FOUR — the type says so rather than a comment.
   *
   * "OT / SCADA paths" is no longer drawn here. It is a real `type: "purdue"`
   * diagram from `diagrams/specs/water-ot-purdue.ts`, laid out by ELK on the
   * server and handed to `ProcessArchitecture` by the page; see that component's
   * docblock for why the boundary has to be crossed that way. What this canvas
   * drew for that view was two captioned rectangles, one dashed stub per stage
   * and a rotated square, naming no asset, no level, no zone and no protocol.
   *
   * THE OTHER THREE STAY HAND-DRAWN, and that is a decision rather than
   * unfinished work. `process` is a hydraulic long-section: it encodes
   * `grade: 1..6` and `lift`, and `DiagramSpec` has no elevation concept while
   * ELK takes no y-position input, so converting it would delete the one idea
   * the drawing carries. `cyber` and `impact` are amber state overlays, and the
   * library paints from three neutral tokens with no per-edge state field.
   */
  view: Exclude<ViewId, "ot">;
}) {
  const n = system.stages.length;
  const col = INNER / n;
  const centerX = (i: number) => PAD + i * col + col / 2;
  const maxChars = Math.max(14, Math.floor(col / 6.6));

  /* Where each route step's marker is drawn. Band-anchored steps spread across
     the width in step order so the route reads left to right and then upward;
     stage-anchored steps stack at their own stage's column. */
  const stageIndex = new Map(system.stages.map((s, i) => [s.id, i]));
  const stacked = new Map<string, number>();
  const markers = system.route.steps.map((step, k) => {
    if (step.anchor.kind === "stage") {
      const i = stageIndex.get(step.anchor.stageId) ?? 0;
      const depth = stacked.get(step.anchor.stageId) ?? 0;
      stacked.set(step.anchor.stageId, depth + 1);
      return { step, index: k + 1, x: centerX(i), y: 214 + depth * 22 };
    }
    const total = system.route.steps.length;
    const x = PAD + INNER * (0.1 + (total > 1 ? (0.66 * k) / (total - 1) : 0));
    /* On the band's top edge, in the allowance `CTRL_H` / `COMMS_H` leave. */
    return { step, index: k + 1, x, y: step.anchor.band === "comms" ? COMMS_Y : CTRL_Y };
  });

  return (
    <svg
      data-gfx-meaning="water process long-section"
      viewBox={`0 0 ${W} ${HEIGHT}`}
      className="h-auto w-full min-w-[56.25rem]"
      aria-hidden="true"
      focusable="false"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* The datum the section is measured against. */}
      <line x1={PAD} y1={BASE} x2={W - PAD} y2={BASE} stroke={INK} strokeWidth={1} />

      {system.stages.map((stage, i) => {
        const y = gradeY(stage.grade);
        const prevY = i > 0 ? gradeY(system.stages[i - 1].grade) : y;
        const x0 = PAD + i * col;
        const cx = centerX(i);
        const lines = wrap(pick(stage.name, locale), maxChars);
        return (
          <g key={stage.id}>
            {/* The water column, as depth ticks rather than a tint: a
                low-alpha fill cannot clear 1.4.11 and this figure is marked. */}
            {[0.2, 0.4, 0.6, 0.8].map((f) => (
              <line
                key={f}
                x1={x0 + col * f}
                y1={y + 4}
                x2={x0 + col * f}
                y2={BASE - 2}
                stroke={CYAN}
                strokeWidth={1}
              />
            ))}
            {/* The grade line at this stage. */}
            <line x1={x0} y1={y} x2={x0 + col} y2={y} stroke={CYAN} strokeWidth={2} strokeLinecap="square" />
            {i > 0 && (
              <>
                {/* The riser: a fall through a treatment barrier, or a pumped
                    lift. That asymmetry is the reason this is a section and not
                    a row of boxes. */}
                <line x1={x0} y1={prevY} x2={x0} y2={y} stroke={CYAN} strokeWidth={2} />
                {stage.lift && (
                  <path
                    d={`M ${x0 - 6},${y + 12} L ${x0},${y + 3} L ${x0 + 6},${y + 12}`}
                    fill="none"
                    stroke={CYAN}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </>
            )}

            {/* Name above the line, leaving the corridor under the datum free
                for the overlay leaders. */}
            {lines.map((line, li) => (
              <text
                key={li}
                x={cx}
                y={y - 26 + li * 13}
                textAnchor="middle"
                fontSize={12}
                letterSpacing="0.02em"
                fontWeight={600}
                fill={FG}
              >
                {line}
              </text>
            ))}

            <circle cx={cx} cy={y} r={5.5} fill={CARD} stroke={CYAN} strokeWidth={2} />

            {/* VIEW `impact` — a solid bar where the source traces a
                consequence to this stage, a dashed one where it traces none,
                and the word for it underneath. Shape and text, not hue. */}
            {view === "impact" && (
              <>
                <line
                  x1={cx}
                  y1={y + 8}
                  x2={cx}
                  y2={BASE + 30}
                  stroke={stage.impact ? AMBER : INK}
                  strokeWidth={stage.impact ? 3 : 1.5}
                  strokeDasharray={stage.impact ? undefined : "3 4"}
                />
                <text x={cx} y={BASE + 46} textAnchor="middle" fontSize={11} letterSpacing="0.06em" fill={INK}>
                  {stage.impact ? "TRACED" : "NOT TRACED"}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* VIEW `cyber`, PART ONE — the line, under the bands. */}
      {view === "cyber" && (
        <polyline
          points={markers.map((m) => `${m.x},${m.y}`).join(" ")}
          fill="none"
          stroke={AMBER}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      )}

      {/* The two shared layers. Drawn once, and identical whichever system is
          selected — that is the point L102 makes, so the drawing has to keep
          it true rather than merely say it. */}
      <Band
        caption={pick(SHARED_LAYERS.control.caption, locale)}
        extra={`+ ${pick(system.ownControl, locale)}`}
        height={CTRL_H}
        text={pick(SHARED_LAYERS.control.text, locale)}
        y={CTRL_Y}
      />
      <Band
        caption={pick(SHARED_LAYERS.comms.caption, locale)}
        height={COMMS_H}
        text={pick(SHARED_LAYERS.comms.text, locale)}
        y={COMMS_Y}
      />

      {/* VIEW `cyber`, PART TWO — the numbered markers, over the bands. They
          ride each band's top edge, in the 20-unit text-free allowance the
          `Band` heights leave for exactly this. */}
      {view === "cyber" &&
        markers.map((m) => (
          <g key={m.step.id}>
            <circle cx={m.x} cy={m.y} r={9} fill={CARD} stroke={AMBER} strokeWidth={2} />
            <text x={m.x} y={m.y + 4} textAnchor="middle" fontSize={11} fontWeight={600} fill={FG}>
              {m.index}
            </text>
          </g>
        ))}
    </svg>
  );
}
