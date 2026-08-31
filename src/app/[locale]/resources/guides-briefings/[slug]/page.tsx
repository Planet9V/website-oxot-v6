import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, hasLocale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { ArticleLayout } from "@/components/longform/article-layout";
import { getDoc, getSlugs } from "@/components/longform/content";
import { BREADCRUMB } from "@/components/resources/guides-briefings/content";

const SECTION = "guides-briefings";
const PATH = PATHS.resourcesGuidesBriefings;

export async function generateStaticParams() {
  const slugs = await getSlugs(SECTION);
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata(
  props: PageProps<"/[locale]/resources/guides-briefings/[slug]">
): Promise<Metadata> {
  const { locale, slug } = await props.params;
  if (!hasLocale(locale)) return {};
  const doc = await getDoc(SECTION, slug, locale);
  if (!doc) return {};
  return {
    title: doc.metaTitle || doc.title,
    description: doc.metaDescription || doc.excerpt,
    alternates: localeAlternates(locale, `${PATH}/${slug}`)
  };
}

/**
 * /resources/guides-briefings/[slug] — one Guide or one Briefing, rendered
 * through the shared reading layout.
 *
 * SAME LAYOUT FOR BOTH FORMATS, ON PURPOSE. The index page is where a Guide
 * and a Briefing have to look different, because that is where a reader
 * chooses between them. Once they have chosen, both are a single document
 * read top to bottom, and ArticleLayout is already the site's answer to
 * that — contents rail on the left from `lg` and only above three headings,
 * reading measure in `ch`, nothing on the right. A second reading layout for
 * documents in the 1,700–4,600-word range would be a template that drifts,
 * not a design decision.
 *
 * The format difference survives anyway, in the writing: a Briefing opens on
 * "The decision in one sentence" and runs to a recommended decision path; a
 * Guide opens on an executive summary and runs to a checklist. That is where
 * resources-format-guides-briefings.md puts the difference, and it does not
 * need a second stylesheet to be legible.
 */
export default async function GuideOrBriefing(
  props: PageProps<"/[locale]/resources/guides-briefings/[slug]">
) {
  const { locale, slug } = await props.params;
  if (!hasLocale(locale)) notFound();
  const doc = await getDoc(SECTION, slug, locale);
  if (!doc) notFound();

  return (
    <ArticleLayout
      doc={doc}
      locale={locale}
      section={SECTION}
      sectionLabel={pick(BREADCRUMB.here, locale)}
      sectionHref={localePath(locale, PATH)}
    />
  );
}
