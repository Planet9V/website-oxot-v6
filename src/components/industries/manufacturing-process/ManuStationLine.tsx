import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";

/**
 * THE SIGNATURE MOTIF for this page: a heavy, stamped assembly line — a
 * thick connecting bar with numbered, bordered station markers — instead of
 * energy-utilities' thin single-line diagram (a 1px hairline plus a small
 * unlabelled dot, EnergyLine.tsx). Numbers are stamped inside each square
 * marker rather than floating beside it, and the bar itself is thick
 * (h-1.5 / border-4) rather than a 1px rule, to read as heavier and more
 * industrial, per the "assembly line / technical drawing" direction.
 *
 * Supports a horizontal run (hero, architecture summary) and a vertical run
 * (worked-example chain) via `orientation`. Only the number glyph and the
 * connecting bar are decorative (aria-hidden) — the text label of each node
 * is always real, readable content, same rule EnergyLine.tsx follows.
 */
export function ManuStationLine({
  nodes,
  locale,
  orientation = "horizontal"
}: {
  nodes: readonly Bilingual[];
  locale: Locale;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <ol className="relative flex list-none flex-col gap-8 border-l-4 border-primary p-0 pl-9">
        {nodes.map((n, i) => (
          <li key={i} className="relative">
            <span
              className="absolute -left-[2.85rem] top-0 flex size-7 items-center justify-center rounded-sm border-2 border-primary bg-background font-display text-xs font-bold text-primary-ink"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-relaxed text-foreground">{pick(n, locale)}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-5 right-5 top-5 h-1.5 bg-primary" aria-hidden="true" />
      <ol className="relative flex list-none flex-wrap justify-between gap-x-8 gap-y-6 p-0">
        {nodes.map((n, i) => (
          <li key={i} className="flex flex-col items-center gap-3 text-center">
            <span
              className="flex size-10 items-center justify-center rounded-sm border-2 border-primary bg-background font-display text-sm font-bold text-primary-ink"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mono-label max-w-[9rem] text-muted-foreground">{pick(n, locale)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
