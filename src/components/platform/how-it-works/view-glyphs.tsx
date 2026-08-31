import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";

/**
 * FOUR PROJECTIONS, EACH ACTUALLY DRAWN IN ITS OWN NOTATION.
 *
 * The claim the VIEWS section makes is that one model reads four different
 * ways, so four interchangeable decorative icons would undercut the sentence
 * they sit beneath. Each glyph is therefore drawn in the notation it names:
 * the P&ID one has a vessel on a process line between a pump and a control
 * valve, with instrument bubbles on dashed leaders; the Purdue one has four
 * stacked levels with a conduit running between them; the graph one has a
 * root, two intermediates, four leaves and one transitive edge; the site one
 * is a fenced footprint with three massed buildings in projection.
 *
 * THEY ARE ILLUSTRATIVE NOTATIONS, NOT RENDERINGS. The section's own note says
 * so beside them in as many words. Nothing here is animated, interactive or
 * fed by data, and nothing is named after a rendering engine it does not use.
 *
 * All paint is `hsl(var(--token))`, so all four follow the theme toggle. No
 * hex. Each carries `role="img"` and a `<title>` in the reader's language:
 * a purely decorative icon would be `aria-hidden`, and these are not
 * decorative — they are the argument the section is making.
 */

/**
 * --primary-ink rather than --primary for every accented stroke, and
 * --muted-foreground rather than --border for every structural one.
 *
 * Both swaps were forced by measurement, not taste. These figures are marked
 * `data-gfx-meaning`, so scripts/measure.mjs holds every shape in them to WCAG
 * 1.4.11 at 3:1 against its own backdrop, and the first pass failed 44 shapes
 * in light and 25 in dark at a worst case of 1.16:1. `--border` is designed to
 * be a faint hairline and cannot carry a shape; `--primary` is a fill orange
 * that globals.css already documents as failing at small sizes. The two -ink
 * tokens are the ones defined to clear text contrast in both themes, which is
 * a stricter bar than 3:1 and therefore safe here.
 */
const MUTED = "hsl(var(--muted-foreground))";
const ACCENT_INK = "hsl(var(--primary-ink))";
const CARD = "hsl(var(--card))";

const T = {
  pid: same(
    "A process and instrumentation diagram: a vessel on a process line between a pump and a control valve, with two instrument bubbles attached"
  ),
  purdue: same(
    "A Purdue model: four stacked levels carrying devices, with a conduit running vertically between the levels"
  ),
  graph: same(
    "A dependency graph: one root branching to two intermediate nodes and four leaves, with one transitive edge crossing between branches"
  ),
  site: same("A site plan: a fenced facility footprint containing three massed buildings, one of them marked")
};

/**
 * Shared frame, so the four sit on one baseline across the grid.
 *
 * `data-gfx-meaning` opts all four into the harness's WCAG 1.4.11 non-text
 * contrast gate (scripts/measure.mjs). These are not decoration — the section
 * argues that the four notations differ, so the shapes have to be legible for
 * the argument to land, and an unmarked figure is silently not checked.
 */
function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 120" role="img" aria-label={title} data-gfx-meaning={title} className="h-auto w-full">
      <title>{title}</title>
      {children}
    </svg>
  );
}

function PidGlyph({ locale }: { locale: Locale }) {
  return (
    <Frame title={pick(T.pid, locale)}>
      {/* Process line, left to right, interrupted by the vessel. */}
      <line x1={12} y1={80} x2={70} y2={80} stroke={MUTED} strokeWidth={1.5} />
      <line x1={122} y1={80} x2={188} y2={80} stroke={MUTED} strokeWidth={1.5} />
      <rect x={70} y={30} width={52} height={50} rx={20} fill={CARD} stroke={ACCENT_INK} strokeWidth={1.75} />
      {/* Pump: circle with a flow triangle. */}
      <circle cx={36} cy={80} r={11} fill={CARD} stroke={MUTED} strokeWidth={1.5} />
      <path d="M32,74 L43,80 L32,86 z" fill={MUTED} />
      {/* Control valve: the bowtie, with its actuator stem. */}
      <path d="M145,72 L165,88 L165,72 L145,88 z" fill={CARD} stroke={ACCENT_INK} strokeWidth={1.5} />
      <line x1={155} y1={72} x2={155} y2={50} stroke={ACCENT_INK} strokeWidth={1.25} strokeDasharray="3 3" />
      {/* Instrument bubbles, on dashed leaders. */}
      <line x1={96} y1={25} x2={96} y2={30} stroke={MUTED} strokeWidth={1.25} strokeDasharray="3 3" />
      <circle cx={96} cy={14} r={11} fill={CARD} stroke={MUTED} strokeWidth={1.5} />
      <line x1={85} y1={14} x2={107} y2={14} stroke={MUTED} strokeWidth={1} />
      <circle cx={155} cy={40} r={10} fill={CARD} stroke={ACCENT_INK} strokeWidth={1.5} />
      <line x1={145} y1={40} x2={165} y2={40} stroke={ACCENT_INK} strokeWidth={1} />
    </Frame>
  );
}

function PurdueGlyph({ locale }: { locale: Locale }) {
  const tops = [12, 38, 64, 90];
  return (
    <Frame title={pick(T.purdue, locale)}>
      {/* The conduit, drawn first so the level bars sit over it. */}
      <line x1={60} y1={20} x2={60} y2={98} stroke={ACCENT_INK} strokeWidth={1.75} />
      {tops.map((y, i) => (
        <g key={y}>
          <rect x={22} y={y} width={166} height={16} rx={4} fill={CARD} stroke={MUTED} strokeWidth={1.25} />
          <line x1={8} y1={y + 8} x2={16} y2={y + 8} stroke={MUTED} strokeWidth={1.5} />
          <circle cx={60} cy={y + 8} r={3.5} fill={ACCENT_INK} />
          {/* Two device classes on each level, told apart by solid against
              outlined rather than by opacity. Alpha was the obvious way to
              do it and the wrong one: element opacity multiplies stroke as
              well as fill, so a 0.35 device had no paint left that could
              clear 1.4.11 at 3:1. Solid and hollow both survive it. */}
          <rect x={96 + i * 14} y={y + 4} width={14} height={8} rx={2} fill={MUTED} />
          <rect
            x={132 + i * 8}
            y={y + 4}
            width={14}
            height={8}
            rx={2}
            fill={CARD}
            stroke={MUTED}
            strokeWidth={1.25}
          />
        </g>
      ))}
    </Frame>
  );
}

function GraphGlyph({ locale }: { locale: Locale }) {
  const leaves = [16, 48, 74, 104];
  return (
    <Frame title={pick(T.graph, locale)}>
      <line x1={30} y1={60} x2={95} y2={32} stroke={MUTED} strokeWidth={1.5} />
      <line x1={30} y1={60} x2={95} y2={88} stroke={MUTED} strokeWidth={1.5} />
      <line x1={95} y1={32} x2={165} y2={16} stroke={MUTED} strokeWidth={1.25} />
      <line x1={95} y1={32} x2={165} y2={48} stroke={MUTED} strokeWidth={1.25} />
      <line x1={95} y1={88} x2={165} y2={74} stroke={MUTED} strokeWidth={1.25} />
      <line x1={95} y1={88} x2={165} y2={104} stroke={MUTED} strokeWidth={1.25} />
      {/* The transitive edge — the reason this projection is worth having. */}
      <line x1={95} y1={32} x2={165} y2={104} stroke={ACCENT_INK} strokeWidth={1.5} strokeDasharray="4 3" />

      <circle cx={30} cy={60} r={9} fill={CARD} stroke={ACCENT_INK} strokeWidth={2} />
      <circle cx={95} cy={32} r={7.5} fill={CARD} stroke={MUTED} strokeWidth={1.5} />
      <circle cx={95} cy={88} r={7.5} fill={CARD} stroke={MUTED} strokeWidth={1.5} />
      {leaves.map((y) => (
        <circle key={y} cx={165} cy={y} r={5.5} fill={CARD} stroke={MUTED} strokeWidth={1.5} />
      ))}
    </Frame>
  );
}

function SiteGlyph({ locale }: { locale: Locale }) {
  return (
    <Frame title={pick(T.site, locale)}>
      {/* The fence line. */}
      <rect
        x={10}
        y={12}
        width={180}
        height={96}
        rx={8}
        fill="none"
        stroke={MUTED}
        strokeWidth={1.25}
        strokeDasharray="5 4"
      />
      {/* Building one: roof, flank, front face. */}
      <polygon points="32,56 46,42 90,42 76,56" fill={MUTED} fillOpacity={0.25} stroke={MUTED} strokeWidth={1.25} />
      <polygon points="76,56 90,42 90,76 76,90" fill={MUTED} fillOpacity={0.15} stroke={MUTED} strokeWidth={1.25} />
      <rect x={32} y={56} width={44} height={34} fill={CARD} stroke={MUTED} strokeWidth={1.25} />
      {/* Building two. */}
      <polygon points="96,64 108,52 142,52 130,64" fill={MUTED} fillOpacity={0.25} stroke={MUTED} strokeWidth={1.25} />
      <polygon points="130,64 142,52 142,78 130,90" fill={MUTED} fillOpacity={0.15} stroke={MUTED} strokeWidth={1.25} />
      <rect x={96} y={64} width={34} height={26} fill={CARD} stroke={MUTED} strokeWidth={1.25} />
      {/* Building three, marked — the one somebody has to walk to. */}
      <polygon points="150,40 160,30 188,30 178,40" fill={ACCENT_INK} fillOpacity={0.3} stroke={ACCENT_INK} strokeWidth={1.25} />
      <polygon points="178,40 188,30 188,58 178,68" fill={ACCENT_INK} fillOpacity={0.18} stroke={ACCENT_INK} strokeWidth={1.25} />
      <rect x={150} y={40} width={28} height={28} fill={CARD} stroke={ACCENT_INK} strokeWidth={1.5} />
      <circle cx={164} cy={54} r={4} fill={ACCENT_INK} />
    </Frame>
  );
}

/** Keyed by `VIEWS.items[].key` in ./content, so the two cannot drift apart. */
export const VIEW_GLYPHS = {
  pid: PidGlyph,
  purdue: PurdueGlyph,
  graph: GraphGlyph,
  site: SiteGlyph
} as const;
