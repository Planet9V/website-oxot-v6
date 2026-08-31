/**
 * The railway challenge. Two moves the source brief makes and this section
 * keeps: a plain list of what "safe" actually costs a railway, and the
 * split of that cost into passenger and freight terms — the two readings
 * that never sound the same to the two audiences.
 *
 * The outcomes run as a dense two-column list rather than nine cards; a
 * card grid would turn a list of operating states into a sales panel,
 * which is exactly what the composition rules forbid on an assurance page.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CHALLENGE } from "./content";
import { Callout, SectionHead } from "./kit";

export function Ts50701Challenge({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="challenge" className="mt-16 border-t border-border pt-10">
      <SectionHead id="challenge" heading={CHALLENGE.h2} lead={CHALLENGE.lead} locale={locale} />

      <ul className="mt-7 grid list-none grid-cols-1 gap-x-10 p-0 sm:grid-cols-2">
        {CHALLENGE.outcomes.map((o, i) => (
          <li
            key={i}
            className="flex gap-3 border-b border-dashed border-border py-3 body-copy leading-relaxed text-foreground last:border-b-0"
          >
            <span aria-hidden="true" className="mono-label shrink-0 tabular-nums text-primary-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{pick(o, locale)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mono-label text-primary-ink">Passenger transit</p>
          <p className="mt-2.5 body-copy leading-relaxed text-muted-foreground">{pick(CHALLENGE.passenger, locale)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mono-label text-primary-ink">Freight rail</p>
          <p className="mt-2.5 body-copy leading-relaxed text-muted-foreground">{pick(CHALLENGE.freight, locale)}</p>
        </div>
      </div>

      <Callout>{pick(CHALLENGE.pullQuote, locale)}</Callout>
    </section>
  );
}
