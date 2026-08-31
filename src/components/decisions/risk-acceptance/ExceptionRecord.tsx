import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { RECORD } from "./content";

/**
 * THE SIGNATURE VISUAL — and deliberately not an icon, a checkmark or a
 * "trusted" badge. The content-to-visual mapping table pairs evidence
 * provenance with a drill-down evidence chain and names the badge as the
 * anti-pattern; a risk-acceptance record is the document form of the same
 * idea, so it is drawn as a document: a header block of identifying
 * fields, then numbered field rows with a label gutter, a value, the
 * reason the field exists, and the evidence that field rests on.
 *
 * The field labels ARE the argument. "Compensating controls",
 * "Accountable owner" and "Review trigger" are the three fields an
 * undocumented non-decision never has, so they are set at the same weight
 * as the finding itself rather than tucked into a footnote.
 *
 * ILLUSTRATIVE, and said so on the page rather than only in a comment —
 * the banner sits inside the document frame, above the first field, where
 * a reader cannot take the record for a real customer's accepted risk.
 *
 * Nothing here is interactive. Server component, no state, no client
 * boundary, no copy implying an expandable or live view.
 */
export function ExceptionRecord({ locale }: { locale: Locale }) {
  const t = RECORD;
  return (
    <section className="mt-20 lg:mt-28">
      <p className="oxot-kicker">{pick(t.kicker, locale)}</p>
      <h2 className="mt-4">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.intro, locale)}
      </p>

      <article className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
        {/* Document header: what this record is, and its identifying fields. */}
        <div className="border-b border-border bg-muted/50 px-5 py-4 sm:px-7">
          <p className="mono-label text-primary-ink">Risk-acceptance record</p>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {t.header.map((h) => (
              <div key={h.label.en}>
                <dt className="mono-label">{pick(h.label, locale)}</dt>
                <dd className="mt-1 ml-0 font-mono text-sm text-foreground">{pick(h.value, locale)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mono-label m-5 rounded-lg border border-dashed border-border px-4 py-3 normal-case tracking-normal sm:mx-7">
          {pick(t.illustrative, locale)}
        </p>

        {/* The fields. A label gutter on the left, the entry on the right. */}
        <dl className="m-0 divide-y divide-border border-t border-border">
          {t.fields.map((field, i) => (
            <div
              key={field.label.en}
              className="grid grid-cols-1 gap-x-8 gap-y-2 px-5 py-6 sm:px-7 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]"
            >
              <dt className="flex items-baseline gap-3">
                <span className="mono-label shrink-0 tabular-nums text-primary-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono-label normal-case tracking-normal text-foreground">
                  {pick(field.label, locale)}
                </span>
              </dt>
              <dd className="ml-0">
                <p className="body-copy leading-relaxed text-foreground">{pick(field.value, locale)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(field.note, locale)}</p>
                {field.evidence.length > 0 ? (
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
                    {/* --reg-iec has no verified AA-safe text ("-ink")
                        variant, unlike --primary/--primary-ink — using
                        --primary-ink here instead, the token this codebase's
                        own eyebrow/label pattern already relies on. */}
                    <span className="mono-label text-primary-ink">{pick(t.evidenceLabel, locale)}</span>
                    <ul className="flex list-none flex-wrap gap-x-2 gap-y-1.5 p-0">
                      {field.evidence.map((e) => (
                        <li
                          key={e.en}
                          className="mono-label rounded border border-border bg-muted px-2 py-1 normal-case tracking-normal"
                        >
                          {pick(e, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-border bg-muted/50 px-5 py-6 sm:px-7">
          <h3 className="font-display text-lg font-bold leading-snug text-foreground">
            {pick(t.footer.heading, locale)}
          </h3>
          <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-3">
            {t.footer.items.map((item) => (
              <li
                key={item.en}
                className="border-t-2 border-primary pt-3 text-sm leading-relaxed text-muted-foreground"
              >
                {pick(item, locale)}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
