import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { DECISIONS } from "./content";
import { ManuCornerFrame } from "./ManuCornerFrame";

/**
 * "The heart of the page" per the source brief — the heaviest visual
 * treatment on the page. Four large, corner-bracketed station panels, each
 * carrying an oversized serif numeral (font-display, much larger than the
 * text-2xl energy-utilities uses for the same idea in EnergyDecisions.tsx),
 * sitting on a thick top rail with its own stamped station markers so the
 * assembly-line motif continues even where the panels themselves are big
 * enough to need their own internal number.
 */
export function ManuDecisions({ locale }: { locale: Locale }) {
  const t = DECISIONS;
  return (
    <section aria-labelledby="decisions" className="mt-16 border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="decisions" className="h-sub">{pick(t.h2, locale)}</h2>
        <Link
          href={`${localePath(locale, PATHS.cdt2)}#decide`}
          className="mono-label border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          How the four decisions work <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>

      <div className="relative mt-10 h-1.5 bg-primary" aria-hidden="true" />
      <ol className="mt-10 grid list-none gap-8 p-0 sm:grid-cols-2">
        {t.items.map((d, i) => (
          <li key={i} className="relative">
            <ManuCornerFrame />
            <div className="flex h-full flex-col rounded-2xl border-2 border-border bg-card p-6 sm:p-8">
              <span className="font-display text-7xl font-bold leading-none text-primary-ink/70" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 h-card">{pick(d.name, locale)}</h3>
              <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">&ldquo;{pick(d.question, locale)}&rdquo;</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground">{pick(d.provides, locale)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
