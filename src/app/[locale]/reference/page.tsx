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
import { getSection } from "@/components/longform/content";

export async function generateMetadata(props: PageProps<"/[locale]/reference">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  const t = (await getDictionary(locale)).reference;
  return { title: t.metaTitle, description: t.metaDescription, alternates: localeAlternates(locale, PATHS.reference) };
}

/**
 * /reference — the regulation long-form.
 *
 * The three CRA documents (cra, cra-ce-marking-pathways, cra-technical-reference)
 * were removed from this ORDER list 2026-08-21 along with their source files,
 * when the CRA product line was de-published. CRA content may still appear as
 * plain-text mentions inside the surviving documents below — only the three
 * CRA-dedicated documents themselves are gone. The remaining order follows the
 * sequence a reader meets these frameworks in practice.
 *
 * These are the site's heaviest pages — that is why the reading layout was
 * proved on Insights first.
 */
const ORDER = ["iec-62443", "ts-50701", "nis2", "ai-act", "machine-act"];

export default async function ReferenceIndex(props: PageProps<"/[locale]/reference">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);
  const t = d.reference;

  const docs = (await getSection("reference", locale)).sort(
    (a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug)
  );
  const totalWords = docs.reduce((n, x) => n + x.words, 0);

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
        <h1 className="mt-4">{t.heading}</h1>
        <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{t.lede}</p>
        <p className="mono-label mt-6 text-muted-foreground">
          {fmt(t.weight, { count: docs.length, words: totalWords.toLocaleString(locale === "nl" ? "nl-NL" : "en-GB") })}
        </p>
      </header>

      <ul className="mt-12 grid list-none gap-4 border-t border-border p-0 pt-10 lg:grid-cols-2">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={localePath(locale, `${PATHS.reference}/${doc.slug}`)}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 outline-ring transition-[transform,border-color] duration-200 ease-brand hover:-translate-y-0.5 hover:border-primary/60 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="block font-display text-[1.125rem] font-bold leading-snug text-foreground">
                {doc.title}
              </span>
              {doc.excerpt ? (
                <span className="mt-3 block body-copy leading-relaxed text-muted-foreground">
                  {doc.excerpt}
                </span>
              ) : null}
              <span className="mono-label mt-auto flex flex-wrap gap-x-4 pt-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary-ink group-focus-visible:text-primary-ink motion-reduce:transition-none">
                <span>{fmt(d.longform.readingTime, { minutes: doc.readingMinutes })}</span>
                <span>{fmt(t.sections, { count: doc.headings.length })}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
