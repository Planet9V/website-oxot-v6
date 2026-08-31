import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SEVERITY_VS_RISK } from "./content";

/**
 * A two-column ledger, not a pair of cards: each row is one aspect, read
 * across from what a severity score asserts to what the record has to
 * establish. The comparison only works if the two halves stay on the same
 * line, so on narrow viewports each row restacks carrying its own column
 * labels rather than collapsing into an ambiguous list.
 */
export function SeverityVsRisk({ locale }: { locale: Locale }) {
  const t = SEVERITY_VS_RISK;
  return (
    <section className="mt-20 lg:mt-28">
      <p className="oxot-kicker">{pick(t.kicker, locale)}</p>
      <h2 className="mt-4">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.intro, locale)}
      </p>

      <div className="mt-10 border-t border-border">
        <div className="hidden grid-cols-[minmax(0,9rem)_minmax(0,1fr)_minmax(0,1fr)] gap-x-8 border-b border-border py-3 md:grid">
          <span className="mono-label" />
          <span className="mono-label">{pick(t.columns.score, locale)}</span>
          <span className="mono-label text-primary-ink">{pick(t.columns.record, locale)}</span>
        </div>

        <dl className="m-0 divide-y divide-border">
          {t.rows.map((row) => (
            <div
              key={row.aspect.en}
              className="grid grid-cols-1 gap-x-8 gap-y-3 py-5 md:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline"
            >
              <dt className="font-display text-base font-bold leading-snug text-foreground">
                {pick(row.aspect, locale)}
              </dt>
              <dd className="ml-0 text-sm leading-relaxed text-muted-foreground">
                <span className="mono-label mb-1 block md:hidden">{pick(t.columns.score, locale)}</span>
                {pick(row.score, locale)}
              </dd>
              <dd className="ml-0 border-l-2 border-primary pl-4 text-sm leading-relaxed text-foreground">
                <span className="mono-label mb-1 block text-primary-ink md:hidden">
                  {pick(t.columns.record, locale)}
                </span>
                {pick(row.record, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="prose-measure mt-8 font-display body-lead font-bold leading-relaxed text-foreground">
        {pick(t.closing, locale)}
      </p>
    </section>
  );
}
