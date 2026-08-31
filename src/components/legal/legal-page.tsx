import Link from "next/link";
import { pick } from "@/i18n/bilingual";
import type { Locale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { LEGAL_DISCLAIMER, type LegalDoc } from "@/content/legal";
import { AS_OF } from "@/content/claims";

/**
 * One renderer for all three legal pages.
 *
 * They share a shape, so they share a component: three near-identical page
 * files would drift, and the one that drifted would be the one nobody reads
 * until it matters.
 *
 * Deliberately plain. A legal page's job is to be read and quoted, so it gets
 * a single reading column and no cards, no bands and no asks. It is the one
 * page class on this site with NO call to action — putting a CTA next to a
 * privacy policy is how a firm tells you what the policy is for.
 */
export function LegalPage({
  locale,
  doc,
  breadcrumb,
  updatedLabel,
  otherLinks
}: {
  locale: Locale;
  doc: LegalDoc;
  breadcrumb: string;
  updatedLabel: string;
  /** The other two legal pages, so each one reaches the others in one click. */
  otherLinks: { href: string; label: string }[];
}) {
  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={doc.title[locale]}
        homeHref={localePath(locale, PATHS.home)}
        label={breadcrumb}
      />

      <header className="mt-8 max-w-[46rem]">
        <h1>{pick(doc.title, locale)}</h1>
        <p className="prose-measure mt-5 text-lg leading-relaxed text-muted-foreground">
          {pick(doc.lede, locale)}
        </p>
        <p className="mt-5 border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground">
          {pick(LEGAL_DISCLAIMER, locale)}
        </p>
        <p className="mono-label mt-5 text-muted-foreground">
          {updatedLabel} {AS_OF}
        </p>
      </header>

      <div className="mt-12 max-w-[46rem]">
        {doc.sections.map((section) => (
          <section key={section.heading.en} className="mt-10 first:mt-0">
            <h2 className="h-sub">{pick(section.heading, locale)}</h2>
            {section.body?.map((p) => (
              <p key={p.en} className="prose-measure mt-4 leading-relaxed text-muted-foreground">
                {pick(p, locale)}
              </p>
            ))}
            {section.list && (
              <ul className="mt-4 list-none space-y-3 p-0">
                {section.list.map((item) => (
                  <li
                    key={item.en}
                    className="prose-measure border-l-2 border-border pl-4 body-copy leading-relaxed text-muted-foreground"
                  >
                    {pick(item, locale)}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <nav
        aria-label={breadcrumb}
        className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 text-sm"
      >
        {otherLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-primary-ink underline decoration-primary/40 underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
