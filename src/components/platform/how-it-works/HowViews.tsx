import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { VIEWS } from "./content";
import { SectionOpener } from "./page-kit";
import { VIEW_GLYPHS } from "./view-glyphs";

/**
 * ONE MODEL, FOUR PROJECTIONS.
 *
 * This is the section most likely to have become four interchangeable icons
 * and four sentences, which would make exactly the wrong argument — that the
 * four views are alternative framings of one picture. They are not; they are
 * four different notations, and a reader who works in one of them recognises
 * it on sight. So each panel leads with its own notation actually drawn
 * (./view-glyphs.tsx), and the four drawings deliberately do not resemble
 * each other.
 *
 * The honesty note sits AFTER the grid rather than before it. Before, it
 * reads as a disclaimer nobody has earned yet; after, it answers the question
 * the reader has just formed — "is that my plant?" — at the moment they form
 * it. No, and it never claimed to be.
 */
export function HowViews({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="views" className="mt-24 border-t border-border pt-14">
      <SectionOpener
        id="views"
        kicker={pick(VIEWS.kicker, locale)}
        title={pick(VIEWS.h2, locale)}
        intro={pick(VIEWS.intro, locale)}
      />

      <ul className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
        {VIEWS.items.map((view) => {
          const Glyph = VIEW_GLYPHS[view.key];
          return (
            <li key={view.key} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
                <Glyph locale={locale} />
              </div>
              <h3 className="h-card mt-5 text-foreground">{pick(view.name, locale)}</h3>
              <p className="mt-2.5 body-copy leading-relaxed text-muted-foreground">{pick(view.body, locale)}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 max-w-[62ch] border-t border-dashed border-border pt-4 text-sm leading-relaxed text-muted-foreground">
        {pick(VIEWS.note, locale)}
      </p>
    </section>
  );
}
