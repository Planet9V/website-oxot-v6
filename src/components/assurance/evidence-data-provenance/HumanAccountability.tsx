import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ACCOUNTABILITY } from "./content";

/**
 * The decision record, drawn as the tree the source file draws it as —
 * a root with eleven branches, rails rendered with real borders rather
 * than reprinted box-drawing characters in a <pre>. Eleven fields as a
 * card grid would read as a feature list; as a tree it reads as one
 * record with eleven required parts, which is the point being made.
 */
export function HumanAccountability({ locale }: { locale: Locale }) {
  const t = ACCOUNTABILITY;
  return (
    <section aria-labelledby="human-accountability" className="mt-16 border-t border-border pt-10">
      <h2 id="human-accountability" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
        {pick(t.sub, locale)}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-14">
        <div>
          <p className="body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

          <div className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
            <p className="m-0 font-display body-lead font-bold leading-snug text-foreground">
              {pick(t.recordRoot, locale)}
            </p>
            <ul className="m-0 ml-1.5 mt-3 flex list-none flex-col border-l border-border p-0">
              {t.record.map((field) => (
                <li key={field.en} className="relative py-1.5 pl-6 text-sm leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="absolute left-0 top-[1.15em] h-px w-4 bg-border" />
                  {pick(field, locale)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="body-lead leading-relaxed text-foreground">{pick(t.essentialIntro, locale)}</p>
          <ul className="mt-5 grid list-none grid-cols-1 gap-0 p-0 sm:grid-cols-2 sm:gap-x-8">
            {t.essential.map((item) => (
              <li
                key={item.en}
                className="border-b border-dashed border-border py-3 text-sm leading-relaxed text-muted-foreground last:border-b-0"
              >
                {pick(item, locale)}
              </li>
            ))}
          </ul>

          <blockquote className="mt-8 border-l-2 border-primary py-1 pl-5 font-display body-lead font-bold leading-relaxed text-foreground">
            {pick(t.pullQuote, locale)}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
