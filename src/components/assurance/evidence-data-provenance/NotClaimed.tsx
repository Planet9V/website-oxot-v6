import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { NOT_CLAIMED } from "./content";

/**
 * The limits section, set in the muted panel this site uses for the
 * quiet, load-bearing statement — the same treatment /assurance gives
 * "where each regime is covered in full". Seven things OXOT does not do,
 * on a page whose entire subject is not overstating what is known: the
 * section would be dishonest to render as anything more decorative.
 */
export function NotClaimed({ locale }: { locale: Locale }) {
  const t = NOT_CLAIMED;
  return (
    <section aria-labelledby="not-claimed" className="mt-16 border-t border-border pt-10">
      <div className="rounded-2xl border border-border bg-muted p-6 sm:p-8">
        <h2 id="not-claimed" className="h-sub">{pick(t.h2, locale)}</h2>
        <p className="prose-measure mt-3 font-display text-xl font-bold leading-snug text-foreground">
          {pick(t.sub, locale)}
        </p>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(t.intro, locale)}
        </p>

        <ul className="mt-6 flex list-none flex-col gap-0 border-t border-dashed border-border p-0">
          {t.items.map((item) => (
            <li
              key={item.en}
              className="border-b border-dashed border-border py-3 text-sm leading-relaxed text-foreground last:border-b-0"
            >
              {pick(item, locale)}
            </li>
          ))}
        </ul>

        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">{pick(t.close, locale)}</p>
      </div>
    </section>
  );
}
