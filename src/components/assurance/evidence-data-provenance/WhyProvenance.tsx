import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { WHY } from "./content";

/**
 * The section is an argument by juxtaposition, so it is laid out as one:
 * the document estate on the left, dense and quiet, and the questions it
 * still cannot answer on the right, numbered and set in foreground ink.
 * The source's point is that the two columns describe the same
 * organization — plenty of documents, no connection between them — and a
 * single stacked list would lose that.
 */
export function WhyProvenance({ locale }: { locale: Locale }) {
  const t = WHY;
  return (
    <section aria-labelledby="why-provenance" className="mt-16 border-t border-border pt-10">
      <h2 id="why-provenance" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>
          <ul className="mt-5 flex list-none flex-col gap-0 rounded-2xl border border-border p-0">
            {t.documents.map((doc) => (
              <li
                key={doc.en}
                className="border-b border-dashed border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground last:border-b-0 sm:px-5"
              >
                {pick(doc, locale)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="body-lead leading-relaxed text-foreground">{pick(t.questionIntro, locale)}</p>
          <ol className="mt-5 flex list-none flex-col gap-4 p-0">
            {t.questions.map((q, i) => (
              <li key={q.en} className="grid grid-cols-[2rem_1fr] items-baseline gap-3">
                <span className="mono-label tabular-nums text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display body-lead font-bold leading-snug text-foreground">
                  {pick(q, locale)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="prose-measure mt-10 body-lead leading-relaxed text-foreground">{pick(t.close, locale)}</p>
    </section>
  );
}
