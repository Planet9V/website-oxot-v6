/**
 * THE SYSTEM UNDER CONSIDERATION, drawn. The source brief's central claim
 * about scope is that a railway system under consideration is defined by a
 * boundary and by every interface that crosses it — so this is a real
 * inline SVG of exactly that: a dashed boundary, four in-scope railway
 * assets, four out-of-scope actors, and the four interface classes the
 * brief names crossing between them.
 *
 * A drawing, not a widget. No state, no client boundary, no hover
 * behaviour, and no caption implying any. It is `role="img"` with a title
 * and a description, so a screen reader gets the structure in prose rather
 * than a list of orphaned labels.
 *
 * Colours are `hsl(var(--token))` throughout — the same way
 * industries/rail-transportation/RailForkDiagram.tsx colours its beams —
 * so the figure follows the light/dark toggle. No hex anywhere.
 *
 * Fixed 760-unit viewBox inside an `overflow-x-auto` container: SVG text
 * does not wrap, so the diagram scrolls sideways on a narrow screen rather
 * than shrinking its labels below legibility.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "./content";

const L = {
  title: same("A railway system under consideration and the interfaces that cross its boundary"),
  desc: same(
    "A dashed boundary encloses four in-scope railway assets: an interlocking, a zone controller, wayside equipment, and the control-center interface. Four actors sit outside it — enterprise IT, depot and maintenance, vendor remote support, and the telecoms carrier — each connected across the boundary by a labelled interface: the OT to IT boundary, software loading and diagnostics, the remote-maintenance route, and train-ground radio and fibre."
  ),
  boundary: same("System under consideration"),
  inside: [same("Interlocking"), same("Zone controller"), same("Wayside equipment"), same("OCC interface")],
  outside: [
    { node: same("Enterprise IT"), iface: same("OT / IT boundary") },
    { node: same("Depot & maintenance"), iface: same("software loading, diagnostics") },
    { node: same("Vendor remote support"), iface: same("remote-maintenance route") },
    { node: same("Telecoms carrier"), iface: same("train-ground radio, fibre") }
  ],
  footnote: same("Every crossing is a candidate cyber pathway and an operational dependency at the same time.")
};

const CARD = "hsl(var(--card))";
const BORDER = "hsl(var(--border))";
const INK = "hsl(var(--foreground))";
const MUTED = "hsl(var(--muted-foreground))";
const ACCENT = "hsl(var(--primary))";
const ACCENT_INK = "hsl(var(--primary-ink))";

/** x, y of each in-scope asset box (156 x 52). */
const INSIDE_XY: readonly (readonly [number, number])[] = [
  [216, 112],
  [388, 112],
  [216, 192],
  [388, 192]
];

/** x, y of each out-of-scope actor box (140 x 52): left pair, then right pair. */
const OUTSIDE_XY: readonly (readonly [number, number])[] = [
  [16, 112],
  [16, 192],
  [604, 112],
  [604, 192]
];

export function SystemBoundaryFigure({ locale }: { locale: Locale }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-muted/40 p-5 sm:p-7">
      <svg
        viewBox="0 0 760 320"
        width="760"
        height="320"
        role="img"
        aria-labelledby="sysdef-title sysdef-desc"
        className="h-auto w-full min-w-[42rem]"
      >
        <title id="sysdef-title">{pick(L.title, locale)}</title>
        <desc id="sysdef-desc">{pick(L.desc, locale)}</desc>

        <defs>
          <marker
            id="ts50701-head"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={ACCENT} />
          </marker>
        </defs>

        {/* The boundary itself. Dashed, because a system under consideration is
            an agreed line on a drawing rather than a physical wall. */}
        <rect
          x="200"
          y="64"
          width="360"
          height="200"
          rx="16"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />
        <text x="216" y="92" fill={ACCENT_INK} fontSize="11" fontWeight="700" letterSpacing="1.4">
          {pick(L.boundary, locale).toUpperCase()}
        </text>

        {/* In-scope assets. */}
        {INSIDE_XY.map(([x, y], i) => (
          <g key={`in-${i}`}>
            <rect x={x} y={y} width="156" height="52" rx="10" fill={CARD} stroke={BORDER} strokeWidth="1" />
            <text x={x + 78} y={y + 31} fill={INK} fontSize="12.5" fontWeight="600" textAnchor="middle">
              {pick(L.inside[i], locale)}
            </text>
          </g>
        ))}

        {/* Out-of-scope actors, each captioned with the interface it brings. */}
        {OUTSIDE_XY.map(([x, y], i) => (
          <g key={`out-${i}`}>
            <rect
              x={x}
              y={y}
              width="140"
              height="52"
              rx="10"
              fill="none"
              stroke={BORDER}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text x={x + 70} y={y + 31} fill={MUTED} fontSize="12" fontWeight="600" textAnchor="middle">
              {pick(L.outside[i].node, locale)}
            </text>
            <text x={x + 70} y={y + 70} fill={MUTED} fontSize="10.5" textAnchor="middle" fontStyle="italic">
              {pick(L.outside[i].iface, locale)}
            </text>
          </g>
        ))}

        {/* The four crossings. Each starts outside and ends inside the boundary. */}
        <line x1="156" y1="138" x2="210" y2="138" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#ts50701-head)" />
        <line x1="156" y1="218" x2="210" y2="218" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#ts50701-head)" />
        <line x1="604" y1="138" x2="550" y2="138" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#ts50701-head)" />
        <line x1="604" y1="218" x2="550" y2="218" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#ts50701-head)" />

        <text x="380" y="304" fill={MUTED} fontSize="11" textAnchor="middle">
          {pick(L.footnote, locale)}
        </text>
      </svg>
    </div>
  );
}
