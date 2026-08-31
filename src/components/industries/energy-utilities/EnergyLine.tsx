import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";

/**
 * THE SIGNATURE MOTIF for this page: a single-line diagram — the literal
 * convention energy engineers already draw a grid as. A horizontal rule
 * with node markers threading through Hero, Architecture and Decisions,
 * instead of the site's usual stacked hairline-divided card grid. Built on
 * real theme tokens (border-primary/bg-primary), not fixed hex, so it
 * follows the light/dark toggle like every other real page.
 */
export function EnergyLine({ nodes, locale }: { nodes: readonly Bilingual[]; locale: Locale }) {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-3 h-px bg-primary/40" aria-hidden="true" />
      <ol className="relative flex list-none flex-wrap gap-x-8 gap-y-6 p-0">
        {nodes.map((n, i) => (
          <li key={i} className="flex flex-col items-start gap-2">
            <span className="size-[7px] rounded-full bg-primary" aria-hidden="true" />
            <span className="mono-label max-w-[9rem] text-muted-foreground">{pick(n, locale)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
