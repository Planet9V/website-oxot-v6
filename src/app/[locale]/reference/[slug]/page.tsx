import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { LOCALES, hasLocale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { ArticleLayout } from "@/components/longform/article-layout";
import { getDoc, getSlugs } from "@/components/longform/content";

export async function generateStaticParams() {
  const slugs = await getSlugs("reference");
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata(props: PageProps<"/[locale]/reference/[slug]">): Promise<Metadata> {
  const { locale, slug } = await props.params;
  if (!hasLocale(locale)) return {};
  const doc = await getDoc("reference", slug, locale);
  if (!doc) return {};
  return {
    title: doc.metaTitle || doc.title,
    description: doc.metaDescription || doc.excerpt,
    alternates: localeAlternates(locale, `${PATHS.reference}/${slug}`)
  };
}

export default async function ReferenceDoc(props: PageProps<"/[locale]/reference/[slug]">) {
  const { locale, slug } = await props.params;
  if (!hasLocale(locale)) notFound();
  const doc = await getDoc("reference", slug, locale);
  if (!doc) notFound();
  const d = await getDictionary(locale);

  return (
    <ArticleLayout
      doc={doc}
      locale={locale}
      section="reference"
      sectionLabel={d.reference.breadcrumb}
      sectionHref={localePath(locale, PATHS.reference)}
    />
  );
}
