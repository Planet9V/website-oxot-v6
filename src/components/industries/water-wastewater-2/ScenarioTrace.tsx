import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";

/**
 * S04's DETAIL PANEL, DRAWN — the three beats of one scenario as a traced
 * pathway, not as three stacked text blocks with coloured left borders.
 *
 * THE MAPPING TABLE MANDATES THIS SHAPE: a network path routes to a pathway
 * overlay, an operational consequence routes to a process chain, and neither
 * routes to a generic warning card. So the beats are drawn — a spine with
 * connectors and terminal markers — with the source's own sentences set as SVG
 * text on it.
 *
 * THREE SIGNAL TOKENS IN ONE PANEL, AND THAT IS NOT THREE COMPETING ACCENTS.
 * Each is carrying its defined meaning and only its defined meaning:
 *   · `--signal-blue`  the cyber / OT pathway — blue means pathway and network;
 *   · `--signal-red`   the water or wastewater impact — the consequence;
 *   · `--signal-amber` the decision the Twin supports — amber means proposed.
 * Green never appears: nothing here has been validated closed.
 *
 * The height is computed from the wrapped line counts rather than fixed, so a
 * long scenario does not clip and a short one leaves no dead band.
 */

const W = 620;
const PAD = 20;
const SPINE_X = 44;
const TEXT_X = 72;
const TEXT_W = W - TEXT_X - PAD;
const CHARS_PER_LINE = Math.floor(TEXT_W / 6.9);
const LINE_H = 17;
const LABEL_H = 20;
const BLOCK_GAP = 26;

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

export interface ScenarioTraceProps {
  beats: Array<{ label: Bilingual; text: Bilingual; token: "blue" | "red" | "amber" }>;
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

  /* Cumulative layout WITHOUT a running variable. An earlier version walked a
     `let cursor` through `.map()`, which this repo's lint config rejects
     outright: reassigning a captured variable during render is how a component
     ends up rendering differently on a second pass with the same props. Each
     block's top is derived from the blocks before it instead, so the same input
     always produces the same geometry. */
  const bodyHeights = laid.map((beat) => LABEL_H + beat.lines.length * LINE_H);
  const tops = bodyHeights.map((_, i) =>
    bodyHeights.slice(0, i).reduce((acc, h) => acc + h + BLOCK_GAP, PAD + 10)
  );
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
        return (
          <g key={i} data-balance-item>
            {/* The beat's own spine: a bar carrying the token, with a terminal
                marker at its head so the three beats read as a route rather
                than as three unrelated coloured rules. */}
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

            {/* The connector down to the next beat, with an arrowhead — this is
                what makes it a trace and not a list. */}
            {next && (
              <>
                <line
                  x1={SPINE_X}
                  y1={beat.top + beat.bodyHeight + 4}
                  x2={SPINE_X}
                  y2={next.top - 10}
                  stroke="hsl(var(--border))"
                  strokeWidth={1.25}
                  strokeDasharray="3 3"
                />
                <path
                  d={`M ${SPINE_X - 4},${next.top - 12} L ${SPINE_X},${next.top - 6} L ${SPINE_X + 4},${next.top - 12}`}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth={1.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}

            {/* THE LABEL IS NOT PAINTED IN THE SIGNAL COLOUR, deliberately.
                `--signal-blue` at 11px would sit near 3.3:1 against `--card` in
                light theme, under the 4.5:1 small-text floor. Colour belongs on
                the SPINE, which is a graphic and carries the state there; the
                words stay in an already-audited text pairing so they are
                legible. A token used as decoration on text it cannot support is
                how a contrast failure ships looking intentional. */}
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
          </g>
        );
      })}
    </svg>
  );
}
