import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SCENARIOS } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

/**
 * A single restrained docket list, not energy-utilities' Accordion
 * (EnergyScenarios.tsx) — every scenario is visible at once, numbered like
 * a case docket, with generous vertical space between rows. Interactivity
 * would soften the gravity this content calls for; a reader should be able
 * to read straight down the page.
 */
export function DefenseScenarios({ locale }: { locale: Locale }) {
  const t = SCENARIOS;
  return (
    <section aria-labelledby="scenarios">
      <DefenseSectionHead id="scenarios" kicker="Scenarios" heading={pick(t.h2, locale)} intro={pick(t.intro, locale)} />

      <ol className="mt-12 flex list-none flex-col divide-y divide-border border-y border-border p-0">
        {t.items.map((s, i) => (
          <li key={i} className="grid gap-3 py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
            <span className="font-display text-2xl font-bold text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="h-card">{pick(s.title, locale)}</h3>
              <dl className="mt-3 flex flex-col gap-2 text-sm leading-relaxed">
                <div>
                  <dt className="mono-label inline text-primary-ink">Initial event </dt>
                  <dd className="inline text-muted-foreground">{pick(s.event, locale)}</dd>
                </div>
                <div>
                  <dt className="mono-label inline text-primary-ink">Dependency cascade </dt>
                  <dd className="inline text-muted-foreground">{pick(s.cascade, locale)}</dd>
                </div>
                <div>
                  <dt className="mono-label inline text-primary-ink">Decision supported </dt>
                  <dd className="inline text-foreground">{pick(s.decision, locale)}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
