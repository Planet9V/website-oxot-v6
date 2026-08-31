import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { ENGAGEMENT } from "./content";
import { ManuCornerFrame } from "./ManuCornerFrame";

/**
 * Three stamped hand-off panels on a shared top rail — reads as three
 * successive assembly stations rather than energy-utilities' plain Card
 * grid (EnergyEngagement.tsx), continuing the page's station-line identity
 * into its final content section before the closing CTA.
 */
export function ManuEngagement({ locale }: { locale: Locale }) {
  const t = ENGAGEMENT;
  return (
    <section aria-labelledby="engagement" className="mt-16 border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="engagement" className="h-sub">{pick(t.h2, locale)}</h2>
        <Link
          href={localePath(locale, PATHS.consulting)}
          className="mono-label border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          The full engagement model <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>

      <div className="relative mt-10 h-1.5 bg-primary" aria-hidden="true" />
      <ol className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-3">
        {t.items.map((e, i) => (
          <li key={i} className="relative">
            <ManuCornerFrame />
            <div className="flex h-full flex-col rounded-2xl border-2 border-border bg-card p-6">
              <span
                className="flex size-10 items-center justify-center rounded-sm border-2 border-primary bg-background font-display text-sm font-bold text-primary-ink"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 h-card">{pick(e.name, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(e.useCase, locale)}</p>
              <p className="mt-3 text-sm font-medium text-foreground">{pick(e.output, locale)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
