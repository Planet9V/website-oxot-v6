import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";

/**
 * S05's DETAIL PANEL, DRAWN — one scenario's beats as a traced route, not as
 * three stacked text blocks with coloured left borders.
 *
 * THE MAPPING TABLE MANDATES THE SHAPE, and names the failure to avoid:
 * `OXOT_content-to-visual-mapping-table.md` routes an operational consequence to
 * a process-chain diagram and a network path to a pathway overlay, and lists
 * "generic warning card" as the wrong answer for the first and "random node
 * graph" for the second. So the beats are drawn — a spine with connectors and
 * terminal markers — with the source's own sentences set as SVG text on it.
 *
 * THE GEOMETRY TECHNIQUE IS ADOPTED, NOT INVENTED, and saying so is the point of
 * this paragraph. Laying out SVG prose by estimating a character width
 * (`CHARS_PER_LINE`) and deriving the viewBox height from the resulting line
 * counts is this codebase's existing solution for a drawn text block that must
 * not clip a long scenario or leave a dead band under a short one; the same
 * approach is in `water-wastewater-2/ScenarioTrace.tsx`. It is re-implemented
 * here rather than imported because this page imports nothing from another
 * iteration, by its own stated convention — not because a second, subtly
 * different version of the same idea was wanted.
 *
 * WHAT IS GENUINELY DIFFERENT HERE IS THE CONNECTOR SEMANTICS, and it is a
 * correction rather than a variation. Chaining all three beats with one
 * identical connector draws the decision as though it were CAUSED by the impact,
 * in the same way the impact is caused by the pathway. It is not: the first hop
 * is causation, the second is response. So:
 *   · pathway → impact is a SOLID connector with a filled arrowhead — the
 *     causal link the Twin traces;
 *   · impact → decision is a DASHED connector with an open arrowhead — the
 *     response, drawn as a different kind of edge because it is one.
 * A reader who cannot tell those two apart has been told the model asserts
 * something it does not.
 *
 * THE CONSEQUENCE CLASS RIDES ON THE IMPACT BEAT, NOT ON THE END OF THE CHAIN.
 * It classifies the consequence, so it is drawn as a terminal chip at the foot
 * of the impact block. Hanging it off the decision beat instead would put a
 * label reading "what kind of harm this is" underneath the remedy, where it
 * reads as a classification of the remedy.
 *
 * THREE SIGNAL TOKENS IN ONE PANEL IS NOT THREE COMPETING ACCENTS. Each carries
 * its defined meaning and only that:
 *   · `--signal-blue`  the cyber / OT pathway — blue means pathway and network;
 *   · `--signal-red`   the water or wastewater impact — the consequence;
 *   · `--signal-amber` the decision the Twin supports — amber means proposed.
 * Green never appears: nothing here has been validated closed.
 *
 * NO TEXT IS PAINTED IN A SIGNAL COLOUR. `--signal-blue` at 11px sits near
 * 3.3:1 against `--card` in light theme, under the 4.5:1 small-text floor.
 * Colour belongs on the SPINE and the CHIP OUTLINE, which are graphics and carry
 * state there against the 3:1 non-text floor; the words stay in already-audited
 * text pairings. A token used as decoration on text it cannot support is how a
 * contrast failure ships looking intentional.
 *
 * THE CONNECTORS ARE `--muted-foreground`, NOT `--border`, AND THAT IS A FIX
 * FOR A MEASURED FAILURE, not a preference. They were `--border` first. Marking
 * the consuming `<figure>` with `data-gfx-meaning` — which opts it into the
 * harness's WCAG 1.4.11 check — immediately returned two failing `path`s per
 * theme at 1.25:1 light and 1.2:1 dark, against a 3:1 floor: both arrowheads.
 * `--border` is a deliberately near-invisible hairline token and cannot carry an
 * argument. The heads here DO carry one — filled means causation, open means
 * response, and the docblock above stakes the whole design on a reader telling
 * those apart — so "it is decoration, 1.4.11 exempts it" was not available as an
 * answer. `--muted-foreground` is already audited as body-text-grade against
 * both `--card` and the page ground, so it clears 3:1 with margin in both
 * themes. Worth recording that this defect was invisible until the figure was
 * marked: an unmarked figure is not covered, and reads as passing.
 */

const W = 620;
const PAD = 20;
const SPINE_X = 44;
const TEXT_X = 72;
const TEXT_W = W - TEXT_X - PAD;
/* ~6.9px per character at 12.5px in the mono stack — an estimate, and
   deliberately a generous one: over-estimating the character width wraps early
   and costs a line, under-estimating clips. */
const CHARS_PER_LINE = Math.floor(TEXT_W / 6.9);
const LINE_H = 17;
const LABEL_H = 20;
const CHIP_H = 26;
/* The connector is drawn from `beat.top + bodyHeight + 4` to `next.top - 10`, so
   its visible length is BLOCK_GAP - 14. At 26 that is twelve pixels, and twelve
   pixels is not enough line for a reader to tell a solid stroke with a filled
   head from a dashed one with an open head — which is the distinction this trace
   stakes its meaning on. Measured on the rendered page at 1440, not guessed at
   in the source. 38 gives the connector 24px and makes both edge types legible;
   it also lengthens the detail pane, which is the SHORTER balance sibling, so it
   moves the ratio the right way rather than costing anything. */
const BLOCK_GAP = 38;

function wrap(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current) current = word;
    else if ((current + " " + word).length <= maxChars) current = `${current} ${word}`;
    else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export interface ScenarioTraceBeat {
  label: Bilingual;
  text: Bilingual;
  token: "blue" | "red" | "amber";
  /* Present on the impact beat only — the derived consequence class, already
     localised by the caller. */
  chip?: string;
}

export interface ScenarioTraceProps {
  beats: ScenarioTraceBeat[];
  title: string;
  locale: Locale;
}

const STROKE = {
  blue: "hsl(var(--signal-blue))",
  red: "hsl(var(--signal-red))",
  amber: "hsl(var(--signal-amber))"
} as const;

export function ScenarioTrace({ beats, title, locale }: ScenarioTraceProps) {
  const laid = beats.map((beat) => ({
    ...beat,
    lines: wrap(pick(beat.text, locale), CHARS_PER_LINE)
  }));

  /* Cumulative layout WITHOUT a running variable. Walking a `let cursor` through
     `.map()` is how a component ends up rendering different geometry on a second
     pass with identical props, and this repo's lint config rejects it outright.
     Each block's top is derived from the blocks before it, so the same input
     always produces the same drawing. */
  const bodyHeights = laid.map((beat) => LABEL_H + beat.lines.length * LINE_H + (beat.chip ? CHIP_H : 0));
  const tops = bodyHeights.map((_, i) => bodyHeights.slice(0, i).reduce((acc, h) => acc + h + BLOCK_GAP, PAD + 10));
  const blocks = laid.map((beat, i) => ({ ...beat, top: tops[i], bodyHeight: bodyHeights[i] }));
  const height = tops[tops.length - 1] + bodyHeights[bodyHeights.length - 1] + PAD;

  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label={title}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {blocks.map((beat, i) => {
        const colour = STROKE[beat.token];
        const next = blocks[i + 1];
        /* The first hop is causation, every later hop is response. With three
           beats that is exactly one solid edge and one dashed one. */
        const causal = i === 0;
        const chipY = beat.top + LABEL_H + beat.lines.length * LINE_H + 2;

        return (
          <g key={beat.token} data-balance-item>
            {/* The beat's own spine: a bar carrying the token, with a terminal
                marker at its head, so the beats read as a route rather than as
                three unrelated coloured rules. */}
            <line
              x1={SPINE_X}
              y1={beat.top}
              x2={SPINE_X}
              y2={beat.top + beat.bodyHeight}
              stroke={colour}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <circle cx={SPINE_X} cy={beat.top + 2} r={4.5} fill="hsl(var(--card))" stroke={colour} strokeWidth={2} />

            {next && (
              <>
                <line
                  x1={SPINE_X}
                  y1={beat.top + beat.bodyHeight + 4}
                  x2={SPINE_X}
                  y2={next.top - 10}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={causal ? 1.75 : 1.25}
                  strokeDasharray={causal ? undefined : "3 3"}
                />
                {causal ? (
                  /* Filled head — this edge asserts that the pathway produces
                     the impact. */
                  <path
                    d={`M ${SPINE_X - 4.5},${next.top - 12} L ${SPINE_X},${next.top - 5} L ${SPINE_X + 4.5},${next.top - 12} Z`}
                    fill="hsl(var(--muted-foreground))"
                  />
                ) : (
                  /* Open head — this edge is a response to the impact, not a
                     consequence of it. */
                  <path
                    d={`M ${SPINE_X - 4},${next.top - 12} L ${SPINE_X},${next.top - 6} L ${SPINE_X + 4},${next.top - 12}`}
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </>
            )}

            <text
              x={TEXT_X}
              y={beat.top + 6}
              fontSize={11}
              letterSpacing="0.08em"
              fill="hsl(var(--muted-foreground))"
              fontWeight={700}
            >
              {pick(beat.label, locale).toUpperCase()}
            </text>
            {beat.lines.map((line, li) => (
              <text
                key={li}
                x={TEXT_X}
                y={beat.top + LABEL_H + 8 + li * LINE_H}
                fontSize={12.5}
                fill="hsl(var(--foreground))"
              >
                {line}
              </text>
            ))}

            {/* The consequence-class chip. Outline in the token, label in
                `--foreground`: the outline is a graphic held to the 3:1 floor,
                the label is small text and stays in an audited pairing. Its
                width is estimated from the same character metric the prose
                wrapping uses, so the box tracks the label rather than being a
                fixed guess that clips the longest class name. */}
            {beat.chip && (
              <>
                <rect
                  x={TEXT_X}
                  y={chipY}
                  rx={4}
                  width={Math.round(beat.chip.length * 6.4) + 20}
                  height={19}
                  fill="none"
                  stroke={colour}
                  strokeWidth={1.25}
                />
                <text
                  x={TEXT_X + 10}
                  y={chipY + 13}
                  fontSize={10.5}
                  letterSpacing="0.06em"
                  fill="hsl(var(--foreground))"
                >
                  {beat.chip.toUpperCase()}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
