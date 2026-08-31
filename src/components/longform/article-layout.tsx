import { getDictionary } from "@/i18n/dictionaries";
import { fmt, formatDate } from "@/i18n/bilingual";
import type { Locale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { TableOfContents } from "./table-of-contents";
import type { Doc } from "./content";

/**
 * ONE READING LAYOUT, for every long document on the site.
 *
 * Built once because there are thirty of them and they range from a
 * 4,000-character article to a 74,000-character reference document. A layout
 * per section would have drifted by the third one.
 *
 * THE SHAPE: contents on the left, the document in a single column at reading
 * measure, nothing on the right. Two columns of anything is how long-form
 * pages become brochures. The measure is capped in `ch`, not pixels, so the
 * line length stays right when the type scale moves.
 *
 * THE CONTENTS RAIL APPEARS FROM `lg` AND ONLY WHEN IT EARNS ITS PLACE — three
 * headings or more. Under that it is furniture, and on a phone it would be a
 * screen of links in front of the thing the reader came for.
 *
 * EVERY LONG PAGE CLOSES WITH THE THREE DOORS, exactly like Company, the
 * retainer and Facility Due Diligence. A reader who has just finished 12,000
 * words on the CRA should not have to go looking for what to do about it.
 */
export async function ArticleLayout({
  doc,
  locale,
  section,
  sectionLabel,
  sectionHref
}: {
  doc: Doc;
  locale: Locale;
  section: string;
  sectionLabel: string;
  sectionHref: string;
}) {
  const d = await getDictionary(locale);
  const t = d.longform;
  const showToc = doc.headings.length >= 3;

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={doc.title}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[
          { href: localePath(locale, PATHS.company), label: d.nav.company },
          { href: sectionHref, label: sectionLabel }
        ]}
      />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">{sectionLabel}</p>
        <h1 className="mt-4">{doc.title}</h1>
        {doc.excerpt ? (
          <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{doc.excerpt}</p>
        ) : null}

        {/* The cost of reading it, and when it was last true. Both are facts a
            reader uses before deciding to start. */}
        <p className="mono-label mt-6 flex flex-wrap gap-x-5 gap-y-1 text-muted-foreground">
          <span>{fmt(t.readingTime, { minutes: doc.readingMinutes })}</span>
          <span>{fmt(t.words, { words: doc.words.toLocaleString(locale === "nl" ? "nl-NL" : "en-GB") })}</span>
          {doc.updatedAt ? <span>{fmt(t.updated, { date: formatDate(doc.updatedAt.slice(0, 10), locale) })}</span> : null}
        </p>
      </header>

      <div
        className={
          showToc
            ? "mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16"
            : "mt-12 border-t border-border pt-10"
        }
      >
        {showToc ? <TableOfContents headings={doc.headings} label={t.onThisPage} /> : null}

        {/* `min-w-0` so a wide table inside the article scrolls in its own box
            instead of widening this grid track — the same failure the /cra
            console hit, measured rather than guessed. */}
        <article className="min-w-0">
          <div
            className="prose-measure body-lead"
            /* First-party HTML: it comes out of our own repository, written by
               us and reviewed in pull requests — the same trust boundary the
               site applies to natively-rendered feature pages. */
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />

          <p className="mono-label mt-12 border-t border-border pt-6">
            <a
              href={sectionHref}
              className="border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
            >
              {fmt(t.backTo, { section: sectionLabel })} <span aria-hidden="true">&#8592;</span>
            </a>
          </p>
        </article>
      </div>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
