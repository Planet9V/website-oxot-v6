/**
 * What TS 50701 does. The eight lifecycle steps as a numbered two-column
 * trace, then the concern-to-question table — a requirements trace in the
 * literal sense: each lifecycle concern paired with the railway question
 * it forces someone to answer.
 *
 * The ERA caveat is not repeated here; it is stated in the hero's spec
 * panel, which is the first thing beside the headline.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { LIFECYCLE } from "./content";
import { LIFECYCLE_ROWS } from "./content-tables";
import { PairTable, SectionHead } from "./kit";

export function Ts50701Lifecycle({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="lifecycle" className="mt-16 border-t border-border pt-10">
      <SectionHead id="lifecycle" heading={LIFECYCLE.h2} lead={LIFECYCLE.lead} locale={locale} />

      <figure className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <figcaption className="mono-label mb-5 text-muted-foreground">{pick(LIFECYCLE.stepsLabel, locale)}</figcaption>
        <ol className="grid list-none grid-cols-1 gap-x-10 p-0 sm:grid-cols-2">
          {LIFECYCLE.steps.map((s, i) => (
            <li key={i} className="flex items-baseline gap-4 border-b border-border py-3 last:border-b-0">
              <span aria-hidden="true" className="font-mono text-lg font-bold tabular-nums leading-none text-primary-ink">
                {i + 1}
              </span>
              <span className="body-copy leading-snug text-foreground">{pick(s, locale)}</span>
            </li>
          ))}
        </ol>
      </figure>

      <PairTable
        caption={LIFECYCLE.tableLabel}
        headKey={LIFECYCLE.tableHeadConcern}
        headValue={LIFECYCLE.tableHeadQuestion}
        rows={LIFECYCLE_ROWS}
        locale={locale}
      />
    </section>
  );
}
