import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { hasLocale } from "@/i18n/config";
import { fmt } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { getDoc, getSection } from "@/components/longform/content";

export async function generateMetadata(props: PageProps<"/[locale]/case-studies">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale) || locale !== "en") return {};
  const doc = await getDoc("case-studies", "case-studies", locale);
  const t = (await getDictionary(locale)).caseStudies;
  return {
    title: doc?.metaTitle || t.metaTitle,
    description: doc?.metaDescription || t.metaDescription,
    alternates: localeAlternates(locale, PATHS.caseStudies)
  };
}

/**
 * /case-studies — the one canonical "Use Cases" area, 2026-08-22 (owner).
 * /use-cases (a separate, prose-heavy index page) is retired; old URLs
 * 308-redirect here, see next.config.ts. EN-only for now — these ten
 * composite write-ups have no .nl.md counterpart yet. Locale is guarded to
 * "en" rather than left to fall through to a 404 from a missing translation,
 * so the gap is a deliberate route decision instead of an accidental dead
 * link.
 *
 * LAYOUT, 2026-08-22 (owner correction). This page was originally hand-built
 * by copying the old /use-cases index's "the index IS a document" layout:
 * a capped-width h1, a prose-measure excerpt, and a TableOfContents sidebar
 * once the markdown body hit 3 headings. That is the right shape for a page
 * whose job is being read start to finish (an article) — it is the wrong
 * shape for THIS page, whose job is being browsed (a landing page routing to
 * ten cards). It also buried the actual point of the page: the markdown body
 * used to open with a plain-text restatement of all ten cases as bulleted
 * links, rendered ABOVE the real card grid, so a reader scrolled past the
 * same ten cases twice before reaching the one that mattered. Fixed by
 * dropping the TOC, widening the hero, trimming that duplicate list out of
 * case-studies.en.md, and moving the card grid up to render directly under
 * the hero — remaining markdown (testimonials, disclosure) now renders full
 * width, after the grid, as ordinary page content rather than narrow article
 * prose. ArticleLayout itself is untouched and still correct for the detail
 * pages this index links to — a single case study genuinely is an article;
 * the index never was.
 */
export default async function CaseStudiesIndex(props: PageProps<"/[locale]/case-studies">) {
  const { locale } = await props.params;
  if (!hasLocale(locale) || locale !== "en") notFound();
  const d = await getDictionary(locale);
  const t = d.caseStudies;

  const doc = await getDoc("case-studies", "case-studies", locale);
  if (!doc) notFound();

  const cases = (await getSection("case-studies", locale)).filter((x) => x.slug !== "case-studies");

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={t.breadcrumb}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.company), label: d.nav.company }]}
      />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">{t.kicker}</p>
        <h1 className="mt-4">{doc.title}</h1>
        {doc.excerpt ? (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{doc.excerpt}</p>
        ) : null}
      </header>

      <section aria-labelledby="cases" className="mt-12 border-t border-border pt-10">
        <h2 id="cases" className="h-sub">{fmt(t.casesHeading, { count: cases.length })}</h2>
        <ul className="mt-8 grid list-none gap-4 p-0 lg:grid-cols-3">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link
                href={localePath(locale, `${PATHS.caseStudies}/${c.slug}`)}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 outline-ring transition-[transform,border-color] duration-200 ease-brand hover:-translate-y-0.5 hover:border-primary/60 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="block font-display body-lead font-bold leading-snug text-foreground">
                  {c.title}
                </span>
                {c.excerpt ? (
                  <span className="mt-3 block body-copy leading-relaxed text-muted-foreground">
                    {c.excerpt}
                  </span>
                ) : null}
                <span className="mono-label mt-auto pt-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary-ink group-focus-visible:text-primary-ink motion-reduce:transition-none">
                  {fmt(d.longform.readingTime, { minutes: c.readingMinutes })} <span aria-hidden="true">&#8594;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <div className="prose-measure body-lead" dangerouslySetInnerHTML={{ __html: doc.html }} />
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
