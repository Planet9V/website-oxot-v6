import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";

/**
 * THE PAGE'S ONE DRAWN DIAGRAM: present against reachable, on a Purdue stack.
 *
 * Chain link 03 makes a claim that prose states rather than shows — that two
 * identical vulnerabilities rank differently because one sits on a route an
 * adversary can occupy and the other does not. So the figure draws exactly
 * that and nothing else: five Purdue bands, two origins, one path that
 * traverses every conduit down to a dosing controller, and one that is denied
 * at the DMZ boundary and therefore leaves three otherwise-comparable assets
 * unreached.
 *
 * IT IS A STATIC REFERENCE DRAWING AND SAYS SO. No state, no client boundary,
 * no hover behaviour, no animation, and no legend implying any. It is an
 * illustrative topology — not a customer's environment and not a live view of
 * a model — and the caption around it in HowChain.tsx states both. This
 * codebase has shipped a component named after a 3D engine it did not import;
 * the rule that came out of that is that a drawing may only claim to be a
 * drawing.
 *
 * `role="img"` with a title and a description, so a screen reader gets the
 * structure as prose rather than a heap of orphaned coordinates.
 *
 * Colours are `hsl(var(--token))` so the figure follows the theme toggle —
 * the same approach as assurance/ts-50701/SystemBoundaryFigure.tsx. No hex.
 *
 * Fixed 760-unit viewBox inside an `overflow-x-auto` container: SVG text does
 * not wrap, so on a narrow screen the drawing scrolls sideways rather than
 * shrinking its labels below legibility.
 */

const L = {
  title: same("A reachable pathway and a denied one, drawn across five Purdue levels"),
  desc: same(
    "Five stacked Purdue bands, from Level 4 enterprise at the top down to Level 1 and 0 control and process at the bottom. In the left column a path runs from a vendor laptop through a remote-access broker, an engineering workstation and a SCADA server, and reaches a dosing-loop controller: every conduit on that route permits the traffic. In the right column a second origin, a corporate IT subnet, reaches a historian replica in the demilitarised zone and is then denied at the conduit into Level 3, so the patch server, the operator HMI and the safety interlock below it are never reached. The two columns hold comparable assets; only the routes differ."
  ),
  bands: [
    same("L4 · Enterprise"),
    same("DMZ"),
    same("L3 · Site operations"),
    same("L2 · Supervisory"),
    same("L1 / L0 · Control")
  ],
  reached: [
    same("Vendor laptop"),
    same("Remote-access broker"),
    same("Engineering workstation"),
    same("SCADA server"),
    same("PLC — dosing loop")
  ],
  unreached: [
    same("Corporate IT subnet"),
    same("Historian replica"),
    same("Patch server"),
    same("Operator HMI"),
    same("Safety interlock")
  ],
  denied: same("conduit denies"),
  legendReached: same("Route permitted at every conduit — enters the loss calculation"),
  legendDenied: same("Denied at the DMZ boundary — what sits below it is present, not reachable")
};

/**
 * --primary-ink rather than --primary for the permitted route, and
 * --muted-foreground rather than --border for the denied one and the bands.
 *
 * Forced by measurement. This figure is marked `data-gfx-meaning`, so
 * scripts/measure.mjs holds every shape in it to WCAG 1.4.11 at 3:1 against
 * its own backdrop; the first pass failed at 1.16:1 on the band rectangles.
 * `--border` is a deliberately faint hairline token and cannot carry a shape,
 * and globals.css already documents `--primary` as too light to clear
 * contrast at small sizes. The -ink tokens are defined to clear TEXT contrast
 * in both themes, a stricter bar than 3:1.
 */
const CARD = "hsl(var(--card))";
const INK = "hsl(var(--foreground))";
const MUTED = "hsl(var(--muted-foreground))";
const ACCENT_INK = "hsl(var(--primary-ink))";

/** Top edge of each band. Bands are 56 tall with a 14 gutter between them. */
const BAND_TOP = [36, 106, 176, 246, 316] as const;
const BAND_H = 56;
/** Node boxes sit centred in their band. */
const NODE_H = 40;
const NODE_W = 170;
const COL_A = 200;
const COL_B = 430;

const nodeY = (i: number) => BAND_TOP[i] + (BAND_H - NODE_H) / 2;
const centreX = (x: number) => x + NODE_W / 2;

export function ReachabilityFigure({ locale }: { locale: Locale }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-muted/40 p-5 sm:p-7">
      {/* `data-gfx-meaning` opts this drawing into the harness's WCAG 1.4.11
          non-text-contrast gate (scripts/measure.mjs). It is not optional
          here: the whole argument of the figure is carried by the difference
          between an accent stroke and a muted one, so if those two cannot be
          told apart at 3:1 in either theme, the drawing says nothing. An
          unmarked figure is silently NOT checked. */}
      <svg
        viewBox="0 0 760 390"
        width="760"
        height="390"
        role="img"
        aria-labelledby="reach-title reach-desc"
        data-gfx-meaning="reachability: a permitted route down five Purdue levels against one denied at the DMZ conduit"
        className="h-auto w-full min-w-[46rem]"
      >
        <title id="reach-title">{pick(L.title, locale)}</title>
        <desc id="reach-desc">{pick(L.desc, locale)}</desc>

        <defs>
          <marker id="reach-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill={ACCENT_INK} />
          </marker>
          <marker id="reach-arrow-muted" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill={MUTED} />
          </marker>
        </defs>

        {/* The five Purdue bands, with their labels in the left gutter. */}
        {BAND_TOP.map((top, i) => (
          <g key={i}>
            <rect
              x={8}
              y={top}
              width={744}
              height={BAND_H}
              rx={10}
              fill="none"
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="3 4"
            />
            <text x={22} y={top + 33} fill={MUTED} fontFamily="var(--font-mono)" fontSize={11} letterSpacing="0.05em">
              {pick(L.bands[i], locale)}
            </text>
          </g>
        ))}

        {/* THE PERMITTED ROUTE. Four segments, one per conduit crossed. */}
        {BAND_TOP.slice(0, 4).map((_, i) => (
          <line
            key={i}
            x1={centreX(COL_A)}
            y1={nodeY(i) + NODE_H}
            x2={centreX(COL_A)}
            y2={nodeY(i + 1) - 7}
            stroke={ACCENT_INK}
            strokeWidth={2}
            markerEnd="url(#reach-arrow)"
          />
        ))}

        {/* Left column: every node on the route, drawn as reached. */}
        {L.reached.map((label, i) => (
          <g key={i}>
            <rect
              x={COL_A}
              y={nodeY(i)}
              width={NODE_W}
              height={NODE_H}
              rx={8}
              fill={CARD}
              stroke={ACCENT_INK}
              strokeWidth={1.5}
            />
            <text
              x={centreX(COL_A)}
              y={nodeY(i) + 24}
              fill={INK}
              fontFamily="var(--font-sans)"
              fontSize={12.5}
              fontWeight={600}
              textAnchor="middle"
            >
              {pick(label, locale)}
            </text>
          </g>
        ))}

        {/* THE DENIED ROUTE. One permitted segment into the DMZ, then a stop. */}
        <line
          x1={centreX(COL_B)}
          y1={nodeY(0) + NODE_H}
          x2={centreX(COL_B)}
          y2={nodeY(1) - 7}
          stroke={MUTED}
          strokeWidth={1.5}
          markerEnd="url(#reach-arrow-muted)"
        />
        <line
          x1={centreX(COL_B)}
          y1={nodeY(1) + NODE_H}
          x2={centreX(COL_B)}
          y2={nodeY(1) + NODE_H + 14}
          stroke={MUTED}
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />
        {/* The stop bar: the conduit that refuses the crossing. */}
        <line
          x1={centreX(COL_B) - 22}
          y1={nodeY(1) + NODE_H + 16}
          x2={centreX(COL_B) + 22}
          y2={nodeY(1) + NODE_H + 16}
          stroke={ACCENT_INK}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <text
          x={centreX(COL_B) + 32}
          y={nodeY(1) + NODE_H + 20}
          fill={ACCENT_INK}
          fontFamily="var(--font-mono)"
          fontSize={11}
          letterSpacing="0.05em"
        >
          {pick(L.denied, locale)}
        </text>

        {/* Right column: comparable assets, none of them reached below the
            DMZ. The muted, dashed stroke IS the argument. */}
        {L.unreached.map((label, i) => (
          <g key={i}>
            <rect
              x={COL_B}
              y={nodeY(i)}
              width={NODE_W}
              height={NODE_H}
              rx={8}
              fill={CARD}
              stroke={MUTED}
              strokeWidth={1.5}
              strokeDasharray={i >= 2 ? "4 4" : undefined}
            />
            <text
              x={centreX(COL_B)}
              y={nodeY(i) + 24}
              fill={i >= 2 ? MUTED : INK}
              fontFamily="var(--font-sans)"
              fontSize={12.5}
              fontWeight={600}
              textAnchor="middle"
            >
              {pick(label, locale)}
            </text>
          </g>
        ))}
      </svg>

      {/* The key, in DOM rather than SVG so it wraps and stays readable at
          390px instead of scrolling off the side with the drawing. */}
      <ul className="mt-5 flex list-none flex-col gap-2.5 p-0 sm:flex-row sm:flex-wrap sm:gap-x-7">
        <li className="flex items-start gap-2.5 text-sm leading-snug text-muted-foreground">
          <span aria-hidden="true" className="mt-2 h-0.5 w-6 shrink-0 rounded-full bg-primary-ink" />
          {pick(L.legendReached, locale)}
        </li>
        <li className="flex items-start gap-2.5 text-sm leading-snug text-muted-foreground">
          <span aria-hidden="true" className="mt-2 h-0.5 w-6 shrink-0 rounded-full bg-muted-foreground" />
          {pick(L.legendDenied, locale)}
        </li>
      </ul>
    </div>
  );
}
