import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SURVIVES } from "./content";

/**
 * Three challenges and the record's answer to each. A record is only
 * defensible against something, so the thing it is defended against gets
 * the display type and the answer follows underneath it.
 */
export function SurvivesScrutiny({ locale }: { locale: Locale }) {
  const t = SURVIVES;
  return (
    <section className="mt-20 lg:mt-28">
      <p className="oxot-kicker">{pick(t.kicker, locale)}</p>
      <h2 className="mt-4">{pick(t.h2, locale)}</h2>

      <ol className="mt-10 grid list-none grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border p-0 lg:grid-cols-3">
        {t.tests.map((test, i) => (
          <li key={test.challenge.en} className="bg-card p-6">
            <span className="mono-label tabular-nums text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground">
              {pick(test.challenge, locale)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(test.answer, locale)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
