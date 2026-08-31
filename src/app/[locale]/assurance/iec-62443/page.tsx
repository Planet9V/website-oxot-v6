import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pick } from "@/i18n/bilingual";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { TableOfContents } from "@/components/longform/table-of-contents";
import { Button } from "@/components/ui/button";
import { BREADCRUMB, CLOSING, HEADINGS, HERO, META } from "@/components/assurance/iec-62443/content";
import { Spine } from "@/components/assurance/iec-62443/figures";
import { SourceNote } from "@/components/assurance/iec-62443/primitives";
import { IecFoundations } from "@/components/assurance/iec-62443/IecFoundations";
import { IecModel } from "@/components/assurance/iec-62443/IecModel";
import { IecEvidence } from "@/components/assurance/iec-62443/IecEvidence";

export async function generateMetadata(props: PageProps<"/[locale]/assurance/iec-62443">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.assurance}/iec-62443`)
  };
}

/**
 * /assurance/iec-62443 — the first of the four regime pages under
 * /assurance, sibling to /assurance/evidence-data-provenance.
 *
 * Content transcribed from new_material_source/1_website_layout_v4/
 * 4_assurance/assurance_IEC62443.md, which is finished copy. The short IEC
 * 62443 section already on /assurance is NOT reprinted here — that page
 * states how OXOT's engineering work produces assurance evidence in general
 * and links onward; this one is the regime in full.
 *
 * COMPOSITION: A TECHNICAL DOCUMENT, NOT A LANDING PAGE.
 * OXOT_Composition_Rules.md is explicit about assurance pages — "editorial/
 * technical reading experience. Diagrams, tables, requirements traces. No
 * sales-style dashboard blocks" — so this deliberately does not use the
 * shape the industry pages use. There is no hero image, no card grid, no
 * metric tile and no service band. It is a contents rail beside a single
 * column at reading measure, twelve numbered sections, seven real tables,
 * two drawn figures and four numbered traces, closing on the scope
 * statement that says what OXOT does not do.
 *
 * THE READING LAYOUT IS THE SAME ONE the CRA reference document uses
 * (components/longform/table-of-contents.tsx) — contents left, article
 * right, nothing in a third column. That component is genuinely generic and
 * already solves position tracking and reduced-motion anchoring, so it is
 * imported rather than reimplemented. The layout around it is written here
 * because ArticleLayout takes pre-rendered HTML, and this page's diagrams
 * are components.
 *
 * NOTHING HERE CLAIMS TO BE INTERACTIVE. Both figures are static, both say
 * so beside themselves, and the only JavaScript on the page is the contents
 * rail's position indicator — which does what it says.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard, unlike the /assurance
 * index. Content is `Bilingual` with `nl` a same-as-English placeholder
 * pending translation, the convention documented in
 * components/industries/registry.ts.
 *
 * NOT IN primaryNav — nav.ts is the integration owner's file and route
 * registration is handled separately.
 */
export default async function Iec62443Page(props: PageProps<"/[locale]/assurance/iec-62443">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  /* /technical-specification is EN-only, so an NL reader is sent to the
     Platform page rather than a 404 — same fallback the industry pages use
     for their EN-only destinations. */
  const specHref =
    locale === "en" ? localePath("en", PATHS.technicalSpecification) : localePath("nl", PATHS.cdt2);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={pick(BREADCRUMB.here, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        /* /assurance (the section index) is EN-only, same as /technical-
           specification above — an NL reader must not get a breadcrumb
           crumb that 404s. Reversible: once /assurance is bilingual, drop
           the ternary and always include the crumb. */
        trail={
          locale === "en"
            ? [{ href: localePath("en", PATHS.assurance), label: pick(BREADCRUMB.section, locale) }]
            : []
        }
      />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">{pick(HERO.kicker, locale)}</p>
        <h1 className="mt-4">{pick(HERO.h1, locale)}</h1>
        <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
        <p className="prose-measure mt-4 text-lg leading-relaxed text-foreground">{pick(HERO.body, locale)}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Link>
          </Button>
        </div>

        {/* The standard's own logic, before the document argues about it. */}
        <Spine locale={locale} />
        <SourceNote href={HERO.citationHref} source={pick(HERO.citationSource, locale)}>
          {pick(HERO.citation, locale)}
        </SourceNote>
      </header>

      <div className="mt-14 grid gap-10 border-t border-border pt-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
        <TableOfContents headings={HEADINGS} label={d.longform.onThisPage} />

        {/* `min-w-0` so a wide table scrolls inside its own container instead
            of widening this grid track — the failure the /cra console caught. */}
        <article className="min-w-0">
          <IecFoundations locale={locale} />
          <IecModel locale={locale} />
          <IecEvidence locale={locale} />
        </article>
      </div>

      <section aria-labelledby="closing" className="mt-16 border-t border-border pt-12">
        <h2 id="closing" className="h-sub">
          {pick(CLOSING.title, locale)}
        </h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(CLOSING.body, locale)}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={localePath(locale, PATHS.contact)}>{pick(CLOSING.ctaPrimary, locale)}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={specHref}>{pick(CLOSING.ctaSecondary, locale)}</Link>
          </Button>
        </div>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
