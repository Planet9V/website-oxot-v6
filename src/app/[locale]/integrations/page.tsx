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
import { Button } from "@/components/ui/button";
import { BREADCRUMB, CLOSING, HERO, INTEGRATIONS_PATH, META } from "@/components/platform/integrations/content";
import { IntakeMap } from "@/components/platform/integrations/IntakeMap";
import { EngineeringInputs } from "@/components/platform/integrations/EngineeringInputs";
import { SystemsOfRecord } from "@/components/platform/integrations/SystemsOfRecord";
import { BillsOfMaterials } from "@/components/platform/integrations/BillsOfMaterials";
import { Boundary } from "@/components/platform/integrations/Boundary";
import { Records } from "@/components/platform/integrations/Records";

export async function generateMetadata(props: PageProps<"/[locale]/integrations">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, INTEGRATIONS_PATH)
  };
}

/**
 * /integrations — "Integrations & Data Inputs".
 *
 * WHAT THIS PAGE IS FOR. It is the concrete catalogue: what the Cyber
 * Digital Twin ingests, which systems it reads from, which direction each
 * connection runs, and what each input becomes. /how-it-works explains the
 * mechanism and the /assurance pages carry the regulatory treatment; neither
 * is repeated here beyond the single sentence needed to say what a record
 * turns into. /cdt-2 remains the product story and is linked, not restated.
 *
 * COMPOSITION: A CATALOGUE, NOT A LANDING PAGE AND NOT AN ESSAY.
 * OXOT_content-to-visual-mapping-table.md maps "Product dependencies" to a
 * "BOM/dependency graph" and names "generic feature list" as the failure to
 * avoid, so the page is built out of catalogue parts rather than a card
 * grid: a drawn many-to-one intake convergence, three comparison tables of
 * engineering records, four spec rows for the systems of record each
 * carrying its own direction and cadence, and a real nested dependency tree
 * with computed depth badges. The only card-shaped things on the page are
 * the four intake lanes, where the shape is the diagram.
 *
 * IT IS DELIBERATELY NOT THE ASSURANCE LAYOUT EITHER. No contents rail, no
 * twelve numbered sections, no reading-measure single column — those belong
 * to a document being read start to finish, and this one is scanned for the
 * row that names the reader's own system. Six sections, full canvas width,
 * every table scrollable inside its own box.
 *
 * NOTHING HERE IS INTERACTIVE, AND NOTHING CLAIMS TO BE. Both figures are
 * static server-rendered markup, both carry a caption saying so, and there
 * is no JavaScript on the page at all — no client component is imported.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual`
 * with `nl` a same-as-English placeholder pending translation, the
 * convention documented in components/industries/registry.ts. The one
 * EN-only destination on the page (/technical-specification, per nav.ts) is
 * guarded inside BillsOfMaterials.tsx.
 *
 * NOT IN primaryNav, and PATHS has no `integrations` key — nav.ts is the
 * integration owner's file and route registration is handled separately.
 * The locale-free path lives in this page's own content module until then.
 */
export default async function IntegrationsPage(props: PageProps<"/[locale]/integrations">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      {/* No section crumb: there is no /platform index page to point at. */}
      <Breadcrumb
        here={pick(BREADCRUMB.here, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
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
      </header>

      <IntakeMap locale={locale} />
      <EngineeringInputs locale={locale} />
      <SystemsOfRecord locale={locale} />
      <BillsOfMaterials locale={locale} />
      <Boundary locale={locale} />
      <Records locale={locale} />

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
            <Link href={localePath(locale, PATHS.cdt2)}>{pick(CLOSING.ctaSecondary, locale)}</Link>
          </Button>
        </div>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
