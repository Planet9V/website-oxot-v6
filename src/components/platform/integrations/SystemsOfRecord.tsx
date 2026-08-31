import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SYSTEMS } from "./content";
import { SectionHead } from "./primitives";

/**
 * Section 03 — the four systems of record.
 *
 * The four categories are DEPLOYMENT.integrations on the protected /cdt-2
 * page: asset management, historians, network monitoring, service
 * management. Same four, same order, same names, so the two pages cannot
 * drift apart on what OXOT says it integrates with.
 *
 * SPEC ROWS, NOT CARDS, AND NOT A TABLE EITHER. A card grid would be the
 * "generic feature list" OXOT_content-to-visual-mapping-table.md names as
 * the wrong answer, and a table would put four long paragraphs in a column
 * nobody can scan. So each category is a spec row: the system's name and its
 * two fixed attributes on the left, the prose on the right. Direction and
 * cadence are stated per row rather than once in a footnote, because
 * "inbound only" is the question every OT engineer asks about every one of
 * them individually.
 */
export function SystemsOfRecord({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby={SYSTEMS.id} className="mt-16 border-t border-border pt-12">
      <SectionHead n={SYSTEMS.n} id={SYSTEMS.id} title={SYSTEMS.title} dek={SYSTEMS.dek} locale={locale} />

      <ol className="mt-8 list-none border-t border-border p-0">
        {SYSTEMS.categories.map((cat) => (
          <li
            key={cat.n}
            className="grid grid-cols-1 gap-4 border-b border-border py-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-8"
          >
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="mono-label font-bold text-primary-ink">{cat.n}</span>
                <h3 className="h-card text-foreground">{pick(cat.name, locale)}</h3>
              </div>

              {/* The two attributes that are the same shape for every row —
                  so they can be compared down the column at a glance. */}
              <dl className="mt-4 space-y-2">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <dt className="mono-label">{pick(SYSTEMS.directionLabel, locale)}</dt>
                  <dd className="mono-label rounded border border-primary/45 bg-primary/10 px-2 py-0.5 text-primary-ink">
                    {pick(SYSTEMS.direction, locale)}
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <dt className="mono-label">{pick(SYSTEMS.cadenceLabel, locale)}</dt>
                  <dd className="text-[0.8125rem] leading-relaxed text-muted-foreground">{pick(cat.cadence, locale)}</dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="body-lead leading-relaxed text-foreground">{pick(cat.contributes, locale)}</p>
              <p className="mt-3 border-l-2 border-primary/40 pl-4 body-copy leading-relaxed text-muted-foreground">
                <span className="mono-label mr-2 font-bold text-primary-ink">{pick(SYSTEMS.answersLabel, locale)}</span>
                {pick(cat.answers, locale)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="prose-measure mt-6 text-sm leading-relaxed text-muted-foreground">{pick(SYSTEMS.note, locale)}</p>
    </section>
  );
}
