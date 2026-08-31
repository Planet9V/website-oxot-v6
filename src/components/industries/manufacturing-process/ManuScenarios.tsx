import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SCENARIOS } from "./content";
import { ManuCornerFrame } from "./ManuCornerFrame";

/**
 * A dense, always-open spec-card grid — not energy-utilities' Accordion
 * (EnergyScenarios.tsx). Every scenario reads at once, each card stamped
 * with its own corner brackets and a station-plate number, for the
 * denser, "spec-sheet" feel the brief asks for.
 */
export function ManuScenarios({ locale }: { locale: Locale }) {
  const t = SCENARIOS;
  return (
    <section aria-labelledby="scenarios" className="mt-16 border-t border-border pt-10">
      <h2 id="scenarios" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <ul className="mt-10 grid list-none gap-6 p-0 lg:grid-cols-2">
        {t.items.map((s, i) => (
          <li key={i} className="relative">
            <ManuCornerFrame />
            <div className="flex h-full flex-col gap-4 rounded-2xl border-2 border-border bg-card p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h-card">{pick(s.title, locale)}</h3>
              </div>
              <ol className="flex list-none flex-col gap-2.5 p-0 text-sm leading-relaxed">
                <li>
                  <span className="mono-label text-primary-ink">Pathway </span>
                  <span className="text-muted-foreground">{pick(s.pathway, locale)}</span>
                </li>
                <li>
                  <span className="mono-label text-primary-ink">Consequence </span>
                  <span className="text-muted-foreground">{pick(s.consequence, locale)}</span>
                </li>
                <li>
                  <span className="mono-label text-primary-ink">Decision the Twin supports </span>
                  <span className="text-foreground">{pick(s.decision, locale)}</span>
                </li>
              </ol>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
