import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, formatDate, fmt } from "@/i18n/bilingual";
import { getDoc, getSection } from "@/components/longform/content";
import { getDictionary } from "@/i18n/dictionaries";
import { PATHS } from "@/components/shell/nav";
import { FEATURED, resourceHref } from "./content";

/**
 * THE FEATURED RESOURCE — one manually pinned document, per the source's
 * explicit "rotate this only manually — do not use an auto-rotating
 * carousel". There is no rotation logic in this file and there should not
 * be one: change FEATURED.slug in content.ts to re-feature.
 *
 * The pin is resolved against the real document, so the title, excerpt and
 * dates on this card are the article's own and cannot drift out of step
 * with it. If the pinned slug is missing — a sibling renames a file, the
 * pick is retired — it falls back to the newest Insight rather than
 * rendering an empty hole, and if the section is empty entirely the whole
 * card is omitted rather than shipping a placeholder.
 *
 * The heaviest thing on the page by design: full width, accent border, the
 * only place a document title is set at section-heading scale. It is the
 * one editorial judgement the hub makes on the reader's behalf, so it
 * should look like one.
 */
export async function ResourcesFeatured({ locale }: { locale: Locale }) {
  const pinned = await getDoc(FEATURED.section, FEATURED.slug, locale);
  const doc = pinned ?? (await getSection(FEATURED.section, locale))[0];
  if (!doc) return null;

  const d = await getDictionary(locale);

  return (
    <section aria-labelledby="featured" className="mt-12 lg:mt-14">
      <Link
        href={resourceHref(locale, `${PATHS.resourcesInsights}/${doc.slug}`)}
        className="group block rounded-2xl border border-primary/40 bg-card p-6 outline-ring transition-[transform,border-color] duration-200 ease-brand hover:-translate-y-0.5 hover:border-primary focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 lg:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="oxot-kicker">{pick(FEATURED.kicker, locale)}</p>
            <h2 id="featured" className="h-section mt-4 text-foreground">
              {doc.title}
            </h2>
            {doc.excerpt ? (
              <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
                {doc.excerpt}
              </p>
            ) : null}
            <span className="mono-label mt-7 flex items-center gap-2 text-primary-ink">
              {pick(FEATURED.cta, locale)}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-brand group-hover:translate-x-1 motion-reduce:transition-none"
              >
                &#8594;
              </span>
            </span>
          </div>

          {/* The document's own metadata, as data rather than prose — this
              is the surface a technical reader checks for freshness. */}
          <dl className="flex flex-col gap-4 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <dt className="mono-label">Reading time</dt>
              <dd className="mt-1 font-display body-lead font-bold text-foreground">
                {fmt(d.longform.readingTime, { minutes: doc.readingMinutes })}
              </dd>
            </div>
            {doc.updatedAt ? (
              <div data-has-date>
                <dt className="mono-label">Last reviewed</dt>
                <dd className="mt-1 font-display body-lead font-bold text-foreground">
                  {formatDate(doc.updatedAt.slice(0, 10), locale)}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="mono-label">Type</dt>
              <dd className="mt-1 font-display body-lead font-bold text-foreground">Insight</dd>
            </div>
          </dl>
        </div>
      </Link>
    </section>
  );
}
