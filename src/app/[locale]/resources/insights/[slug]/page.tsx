import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/i18n/alternates";
import { LOCALES, hasLocale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { ArticleLayout } from "@/components/longform/article-layout";
import { getDoc, getSlugs } from "@/components/longform/content";

/**
 * One Insight. The same shape as /reference/[slug]: the shared long-form
 * engine reads `content/insights/<slug>.<locale>.md` and the shared reading
 * layout renders it — contents rail, measure-capped column, the three doors at
 * the end. Nothing here is Insight-specific except the section key.
 *
 * The section label is a local literal rather than a dictionary key: `nav` has
 * no Insights entry, and adding one would mean editing en.ts and nl.ts, which
 * this task does not own. "Insights" is also the same word in both languages.
 */
const SECTION_LABEL = "Insights";

export async function generateStaticParams() {
  const slugs = await getSlugs("insights");
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata(
  props: PageProps<"/[locale]/resources/insights/[slug]">
): Promise<Metadata> {
  const { locale, slug } = await props.params;
  if (!hasLocale(locale)) return {};
  const doc = await getDoc("insights", slug, locale);
  if (!doc) return {};
  return {
    title: doc.metaTitle || doc.title,
    description: doc.metaDescription || doc.excerpt,
    alternates: localeAlternates(locale, `${PATHS.resourcesInsights}/${slug}`)
  };
}

export default async function InsightDoc(props: PageProps<"/[locale]/resources/insights/[slug]">) {
  const { locale, slug } = await props.params;
  if (!hasLocale(locale)) notFound();
  const doc = await getDoc("insights", slug, locale);
  if (!doc) notFound();

  return (
    <ArticleLayout
      doc={doc}
      locale={locale}
      section="insights"
      sectionLabel={SECTION_LABEL}
      sectionHref={localePath(locale, PATHS.resourcesInsights)}
    />
  );
}
