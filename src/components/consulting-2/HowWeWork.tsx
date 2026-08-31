import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { HOW_WE_WORK } from "./content.howWeWork";

/**
 * "How we work" — the five questions OXOT starts from.
 *
 * A NUMBERED LIST, NOT A DIAGRAM. The spec's five nodes (L75–L85) are
 * interrogatives in a narrowing order: purpose, criticality, protection,
 * reachability, safe change. An ordered list of ruled rows carries exactly
 * that — position and nothing else. Boxing each sentence into a flow chart
 * would spend a diagram to restate the ordering the numerals already state,
 * and would invite a reader to infer stages, gates or durations the source
 * never states.
 *
 * THE QUESTION MARKS ARE LOAD-BEARING and are printed verbatim from
 * `content.howWeWork.ts`; `index` is the source's own ordinal, not a rating.
 */
export function HowWeWork({ locale }: { locale: Locale }) {
  const t = HOW_WE_WORK;

  return (
    <section id={t.sectionId} className="scroll-mt-24 pt-16 lg:pt-24">
      <p className="oxot-kicker">{pick(t.datumLabel, locale)}</p>

      <h2 className="h-section mt-4">{pick(t.heading, locale)}</h2>

      <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground">
        {pick(t.lede, locale)}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
        <div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {pick(t.chainIntro, locale)}
          </p>

          <ol className="mt-6 list-none border-t border-border p-0">
            {t.questions.map((item) => (
              <li
                key={item.id}
                className="flex items-baseline gap-5 border-b border-border py-5"
              >
                <span className="mono-label shrink-0 text-primary-ink">
                  {item.index}
                </span>
                <span className="text-lg leading-snug text-foreground">
                  {pick(item.question, locale)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          {t.body.map((paragraph) => (
            <p
              key={paragraph.en}
              className="mt-4 text-base leading-relaxed text-muted-foreground first:mt-0"
            >
              {pick(paragraph, locale)}
            </p>
          ))}

          <blockquote className="mt-8 border-l-2 border-primary py-1 pl-5 font-display text-lg font-bold leading-relaxed text-foreground">
            {pick(t.pullQuote, locale)}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
