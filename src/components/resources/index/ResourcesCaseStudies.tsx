import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, fmt } from "@/i18n/bilingual";
import { getDictionary } from "@/i18n/dictionaries";
import { getSection } from "@/components/longform/content";
import { PATHS } from "@/components/shell/nav";
import { CASE_STUDIES_SECTION, CASE_STUDY_PICKS, resourceHref } from "./content";

/**
 * FEATURED CASE STUDIES — three real studies, manually picked in
 * content.ts to span three different decisions rather than three
 * variations of one, then back-filled from the rest of the section if a
 * pick has been renamed or retired. Nothing here is typed by hand: the
 * titles and excerpts are the studies' own.
 *
 * ALWAYS READ IN ENGLISH, and linked cross-locale. `content/case-studies/`
 * holds only `.en.md` files and /case-studies itself calls notFound() for
 * any non-English locale. Reading `locale` here would render an empty
 * section on /nl/resources — a Dutch reader would be told OXOT has no case
 * studies, which is worse than being sent to the English ones that exist.
 *
 * CARDS, NOT ROWS — deliberately unlike Latest Insights above. A case
 * study is a proof object: the reader is scanning for one that resembles
 * their own plant, which is a comparison across a set, not a walk down a
 * chronology. The dates are also mostly irrelevant here in a way they are
 * not for an Insight, so no date is shown.
 */
export async function ResourcesCaseStudies({ locale }: { locale: Locale }) {
  const all = (await getSection("case-studies", "en")).filter((doc) => doc.slug !== "case-studies");
  if (all.length === 0) return null;

  const picked = CASE_STUDY_PICKS.map((slug) => all.find((doc) => doc.slug === slug)).filter(
    (doc) => doc !== undefined
  );
  const backfill = all.filter((doc) => !picked.includes(doc));
  const studies = [...picked, ...backfill].slice(0, 3);

  const d = await getDictionary(locale);

  return (
    <section aria-labelledby="case-studies" className="mt-14 border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <h2 id="case-studies" className="h-sub">
          {pick(CASE_STUDIES_SECTION.h2, locale)}
        </h2>
        <Link
          href={resourceHref(locale, PATHS.caseStudies, true)}
          hrefLang="en"
          className="mono-label inline-flex items-center gap-2 border-b border-border text-primary-ink transition-colors duration-150 ease-brand hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {pick(CASE_STUDIES_SECTION.all, locale)}
          <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
      <p className="prose-measure mt-3 body-lead leading-relaxed text-muted-foreground">
        {pick(CASE_STUDIES_SECTION.lead, locale)}
      </p>

      <ul className="mt-8 grid list-none gap-4 p-0 lg:grid-cols-3">
        {studies.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={resourceHref(locale, `${PATHS.caseStudies}/${doc.slug}`, true)}
              hrefLang="en"
              className="group flex h-full flex-col rounded-2xl border border-border bg-muted p-6 outline-ring transition-[transform,border-color] duration-200 ease-brand hover:-translate-y-0.5 hover:border-primary/60 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <h3 className="font-display body-lead font-bold leading-snug text-foreground">{doc.title}</h3>
              {doc.excerpt ? (
                <p className="mt-3 body-copy leading-relaxed text-muted-foreground">{doc.excerpt}</p>
              ) : null}
              <span className="mono-label mt-auto flex items-center gap-2 pt-6 text-muted-foreground transition-colors duration-200 ease-brand group-hover:text-primary-ink group-focus-visible:text-primary-ink motion-reduce:transition-none">
                {fmt(d.longform.readingTime, { minutes: doc.readingMinutes })}
                <span aria-hidden="true">&#8594;</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 border-l-2 border-primary/40 pl-4 text-[0.875rem] leading-relaxed text-muted-foreground">
        {pick(CASE_STUDIES_SECTION.provenance, locale)}
      </p>
    </section>
  );
}
