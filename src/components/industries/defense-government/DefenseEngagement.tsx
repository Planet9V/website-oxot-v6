import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { ENGAGEMENT } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

/** A plain numbered list, not a Card grid (energy-utilities'
 *  EnergyEngagement.tsx) — five large rows instead of five small tiles. */
export function DefenseEngagement({ locale }: { locale: Locale }) {
  const t = ENGAGEMENT;
  return (
    <section aria-labelledby="engagement">
      <DefenseSectionHead id="engagement" kicker="Engagement" heading={pick(t.h2, locale)} />

      <p className="mt-6">
        <Link
          href={localePath(locale, PATHS.consulting)}
          className="mono-label border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          The full engagement model <span aria-hidden="true">&#8594;</span>
        </Link>
      </p>

      <ol className="mt-10 flex list-none flex-col divide-y divide-border border-y border-border p-0">
        {t.items.map((e, i) => (
          <li key={i} className="grid gap-3 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
            <span className="font-display text-2xl font-bold text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="h-card">{pick(e.name, locale)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pick(e.useCase, locale)}</p>
              <p className="mt-2 text-sm font-medium text-foreground">{pick(e.output, locale)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
