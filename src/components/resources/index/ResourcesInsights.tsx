import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, fmt, formatDate } from "@/i18n/bilingual";
import { getDictionary } from "@/i18n/dictionaries";
import { getSection } from "@/components/longform/content";
import { PATHS } from "@/components/shell/nav";
import { FEATURED, LATEST_INSIGHTS, resourceHref } from "./content";

/**
 * LATEST INSIGHTS — read from `content/insights/`, newest first, never
 * hand-typed. The source lists three example titles; two of those three do
 * not exist yet, and hard-coding them would put a headline on this hub
 * that leads nowhere. Reading the directory means the section is correct
 * on the day it ships and stays correct as sibling agents add articles.
 *
 * THE FEATURED DOCUMENT IS EXCLUDED. It is already the largest thing on
 * the page, directly above; listing it again three sections later is the
 * same duplication /case-studies' doc comment records fixing.
 *
 * ROWS, NOT CARDS — deliberately unlike the Case Studies section below.
 * An Insight is an article: it has a date, a reading time and a headline
 * that is a question, and those read better as a dated list than as a
 * boxed grid. The Case Studies grid is a wall of proof objects; this is a
 * table of contents. Making them look alike would flatten a real
 * distinction the source draws between the two libraries.
 */
export async function ResourcesInsights({ locale }: { locale: Locale }) {
  const all = await getSection("insights", locale);
  const insights = all.filter((doc) => doc.slug !== FEATURED.slug).slice(0, 3);
  if (insights.length === 0) return null;

  const d = await getDictionary(locale);

  return (
    <section aria-labelledby="insights" className="mt-14 border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <h2 id="insights" className="h-sub">
          {pick(LATEST_INSIGHTS.h2, locale)}
        </h2>
        <Link
          href={resourceHref(locale, PATHS.resourcesInsights)}
          className="mono-label inline-flex items-center gap-2 border-b border-border text-primary-ink transition-colors duration-150 ease-brand hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {pick(LATEST_INSIGHTS.all, locale)}
          <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
      <p className="prose-measure mt-3 body-lead leading-relaxed text-muted-foreground">
        {pick(LATEST_INSIGHTS.lead, locale)}
      </p>

      <ol className="mt-8 flex list-none flex-col border-t border-border p-0">
        {insights.map((doc) => (
          <li key={doc.slug} className="border-b border-border">
            <Link
              href={resourceHref(locale, `${PATHS.resourcesInsights}/${doc.slug}`)}
              className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="mono-label w-32 shrink-0" data-has-date>
                {doc.publishedAt ? formatDate(doc.publishedAt.slice(0, 10), locale) : null}
              </span>
              <div className="flex-1">
                <h3 className="h-card text-foreground transition-colors duration-150 ease-brand group-hover:text-primary-ink">
                  {doc.title}
                </h3>
                {doc.excerpt ? (
                  <p className="prose-measure mt-2 body-copy leading-relaxed text-muted-foreground">
                    {doc.excerpt}
                  </p>
                ) : null}
              </div>
              <span className="mono-label shrink-0 sm:w-24 sm:text-right">
                {fmt(d.longform.readingTime, { minutes: doc.readingMinutes })}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
