import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";

/**
 * THE SIGNATURE MOTIF for this page: a literal rail track — two parallel
 * rails with sleepers, not energy-utilities' single hairline (EnergyLine).
 * Used once, shared, in the Hero for the operating-model chain every rail
 * segment shares before the page forks into two columns. Built on real
 * theme tokens (currentColor via text-primary/…), not fixed hex, so it
 * follows the light/dark toggle like every other real page.
 *
 * Decorative only: the SVG rails/sleepers are aria-hidden, the node
 * markers and their text labels are not (per CLAUDE.md's own rule: hide
 * the line, never the text next to it).
 */
export function RailTrack({ nodes, locale }: { nodes: readonly Bilingual[]; locale: Locale }) {
  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 400 16"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 top-2 h-4 w-full text-primary"
      >
        <line x1="0" y1="3" x2="400" y2="3" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
        <line x1="0" y1="13" x2="400" y2="13" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
        {Array.from({ length: 34 }).map((_, i) => (
          <line key={i} x1={i * 12 + 4} y1="2" x2={i * 12 + 4} y2="14" stroke="currentColor" strokeWidth="1.1" opacity="0.22" />
        ))}
      </svg>
      <ol className="relative flex list-none flex-wrap gap-x-8 gap-y-6 p-0 pt-9">
        {nodes.map((n, i) => (
          <li key={i} className="flex flex-col items-start gap-2">
            <span className="size-[7px] rounded-full bg-primary" aria-hidden="true" />
            <span className="mono-label max-w-[10rem] text-muted-foreground">{pick(n, locale)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
