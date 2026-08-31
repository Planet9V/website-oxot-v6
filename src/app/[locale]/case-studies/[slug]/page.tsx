import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { hasLocale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { ArticleLayout } from "@/components/longform/article-layout";
import { getDoc, getSlugs } from "@/components/longform/content";

/* EN-only, on purpose — see the doc comment in case-studies/page.tsx. Static
   params are generated for "en" alone so no /nl/case-studies/<slug> route is
   ever built, rather than building one that 404s on a missing .nl.md file. */
export async function generateStaticParams() {
  const slugs = (await getSlugs("case-studies")).filter((s) => s !== "case-studies");
  return slugs.map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata(props: PageProps<"/[locale]/case-studies/[slug]">): Promise<Metadata> {
  const { locale, slug } = await props.params;
  if (!hasLocale(locale) || locale !== "en") return {};
  const doc = await getDoc("case-studies", slug, locale);
  if (!doc) return {};
  return {
    title: doc.metaTitle || doc.title,
    description: doc.metaDescription || doc.excerpt,
    alternates: localeAlternates(locale, `${PATHS.caseStudies}/${slug}`)
  };
}

export default async function CaseStudyDetail(props: PageProps<"/[locale]/case-studies/[slug]">) {
  const { locale, slug } = await props.params;
  if (!hasLocale(locale) || locale !== "en") notFound();
  /* The index lives at the section root; it must not also resolve here. */
  if (slug === "case-studies") notFound();
  const doc = await getDoc("case-studies", slug, locale);
  if (!doc) notFound();
  const d = await getDictionary(locale);

  return (
    <ArticleLayout
      doc={doc}
      locale={locale}
      section="case-studies"
      sectionLabel={d.caseStudies.breadcrumb}
      sectionHref={localePath(locale, PATHS.caseStudies)}
    />
  );
}
