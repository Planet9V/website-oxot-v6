import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, fmt } from "@/i18n/bilingual";
import { getDictionary } from "@/i18n/dictionaries";
import { getSection } from "@/components/longform/content";
import { PATHS } from "@/components/shell/nav";
import { GUIDES_SECTION, GUIDE_FORMATS, resourceHref } from "./content";

/**
 * GUIDES & BRIEFINGS — the real assets from `content/guides-briefings/`,
 * beside a static explainer of the two formats.
 *
 * THE FORMAT LABELS ARE NOT ON THE ROWS, ON PURPOSE. Each markdown file
 * does carry `format: "guide"` in its frontmatter, but the shared `Doc`
 * type in longform/content.ts does not expose that field, and widening a
 * shared loader that a sibling agent is concurrently editing to decorate
 * one hub section is not a trade worth making. Guessing the format from
 * the title would be worse — a mislabelled Briefing is a promise to an
 * executive that the document does not keep. So the distinction is
 * explained once, accurately, in the panel beside the list, and no row
 * asserts a value this page cannot actually read.
 *
 * A two-column split, unlike either library above: the rule on the left is
 * what makes the list on the right legible, and a reader who does not know
 * which of the two formats they want is the reader this section is for.
 */
export async function ResourcesGuides({ locale }: { locale: Locale }) {
  const guides = (await getSection("guides-briefings", locale)).slice(0, 4);
  if (guides.length === 0) return null;

  const d = await getDictionary(locale);

  return (
    <section aria-labelledby="guides" className="mt-14 border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <h2 id="guides" className="h-sub">
          {pick(GUIDES_SECTION.h2, locale)}
        </h2>
        <Link
          href={resourceHref(locale, PATHS.resourcesGuidesBriefings)}
          className="mono-label inline-flex items-center gap-2 border-b border-border text-primary-ink transition-colors duration-150 ease-brand hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {pick(GUIDES_SECTION.all, locale)}
          <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
      <p className="prose-measure mt-3 body-lead leading-relaxed text-muted-foreground">
        {pick(GUIDES_SECTION.lead, locale)}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-12">
        <dl className="flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {GUIDE_FORMATS.map((f) => (
            <div key={f.format.en} className="bg-card p-5">
              <dt className="font-display body-lead font-bold text-foreground">{pick(f.format, locale)}</dt>
              <dd>
                <span className="mt-1.5 block body-copy font-semibold leading-snug text-primary-ink">
                  {pick(f.rule, locale)}
                </span>
                <span className="mt-2.5 block text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {pick(f.audience, locale)}
                </span>
                <span className="mono-label mt-2.5 block">{pick(f.length, locale)}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="flex list-none flex-col border-t border-border p-0">
          {guides.map((doc) => (
            <li key={doc.slug} className="border-b border-border">
              <Link
                href={resourceHref(locale, `${PATHS.resourcesGuidesBriefings}/${doc.slug}`)}
                className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <div className="flex-1">
                  <h3 className="font-display body-lead font-bold leading-snug text-foreground transition-colors duration-150 ease-brand group-hover:text-primary-ink">
                    {doc.title}
                  </h3>
                  {doc.excerpt ? (
                    <p className="prose-measure mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">
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
        </ul>
      </div>
    </section>
  );
}
