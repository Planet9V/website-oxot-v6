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
import { BREADCRUMB, CLOSING, HEADINGS, HERO, META } from "@/components/platform/deployment-sovereignty/content";
import { Spine } from "@/components/platform/deployment-sovereignty/primitives";
import { DeployFoundation } from "@/components/platform/deployment-sovereignty/DeployFoundation";
import { DeployModes } from "@/components/platform/deployment-sovereignty/DeployModes";
import { DeploySovereignty } from "@/components/platform/deployment-sovereignty/DeploySovereignty";

/* The route is deliberately not in PATHS. nav.ts is the integration
   owner's file and route registration is handled separately, so the
   canonical path is a literal here — the position /assurance/iec-62443 was
   in before its PATHS entry was added. */
const ROUTE = "/deployment-sovereignty";

export async function generateMetadata(props: PageProps<"/[locale]/deployment-sovereignty">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, ROUTE)
  };
}

/**
 * /deployment-sovereignty — Deployment & Data Sovereignty.
 *
 * The sitemap's Deployment page, and the home of the foundation
 * deliverable OXOT_Visual_Foundation_Spec.md calls the "Air-Gapped
 * Deployment Visual". Content is transcribed from new_material_source/
 * 1_website_layout_v4/6_resources/air-gapped_deployment.md, with the
 * three-mode structure taken from that spec's Deliverable 6 table.
 *
 * IT DOES NOT DUPLICATE /cdt-2. The Cyber Digital Twin page carries a
 * short Deployment section — three modes in three sentences — as one beat
 * in a longer product argument. This page is the treatment a security
 * authority reads: three drawn boundaries, the intelligence-update
 * options, the governance requirements, and the caveat. The mode names,
 * the passive-first framing and the integrations list are carried over
 * from that section deliberately, so the two pages agree rather than
 * offering a reader two accounts of the same architecture.
 *
 * COMPOSITION: A LONG-FORM PLATFORM NARRATIVE, NOT A CARD GRID.
 * OXOT_Composition_Rules.md puts "Deployment and assurance routing" inside
 * the Platform page's long-form narrative, and
 * OXOT_content-to-visual-mapping-table.md maps this exact content type
 * ("Deployment boundary") to a "Data-flow and trust-boundary diagram"
 * while naming "Cloud icon cards" as the thing to avoid. So the shape is a
 * contents rail beside a single column at reading measure: ten numbered
 * sections, three full-width drawn boundary diagrams, two real tables, one
 * closing CTA. No hero image, no metric tile, no three-up option grid.
 *
 * NOTHING HERE CLAIMS TO BE INTERACTIVE. The three diagrams are static
 * drawings and each says so beside itself; the only JavaScript on the page
 * is the contents rail's position indicator, which does what it says. This
 * codebase has been burned before by a component advertising a 3D viewer
 * that imported no 3D library, and the source spec's own acceptance
 * criteria require plain-language text equivalents for every diagram —
 * which is why each figure carries its equivalent as visible prose rather
 * than a hidden alt string.
 *
 * NOTIONAL AND SYNTHETIC THROUGHOUT, per the spec's instruction that
 * "defense/government examples must be notional and synthetic". No real
 * site, national infrastructure, classified system or customer topology is
 * depicted or described.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual`
 * with `nl` a same-as-English placeholder pending translation, the
 * convention documented in components/industries/registry.ts. Every onward
 * link points at a page that renders both locales; the EN-only /assurance
 * index and /technical-specification are deliberately not linked at all
 * (see DeploySovereignty.tsx).
 *
 * NOT IN primaryNav — nav.ts is the integration owner's file and route
 * registration is handled separately.
 */
export default async function DeploymentSovereigntyPage(props: PageProps<"/[locale]/deployment-sovereignty">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      {/* The section crumb points at /cdt-2, which is this sitemap's
          Platform destination and renders in both locales — so unlike the
          assurance pages' crumb, this one needs no locale guard. */}
      <Breadcrumb
        here={pick(BREADCRUMB.here, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.cdt2), label: pick(BREADCRUMB.section, locale) }]}
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

        {/* The boundary in one line, before the document argues about it. */}
        <Spine steps={HERO.spine.map((s) => pick(s, locale))} />
      </header>

      <div className="mt-14 grid gap-10 border-t border-border pt-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
        <TableOfContents headings={HEADINGS} label={d.longform.onThisPage} />

        {/* `min-w-0` so a wide table scrolls inside its own container
            instead of widening this grid track — the failure the /cra
            console caught. */}
        <article className="min-w-0">
          <DeployFoundation locale={locale} />
          <DeployModes locale={locale} />
          <DeploySovereignty locale={locale} />
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
            <Link href={localePath(locale, PATHS.cdt2)}>{pick(CLOSING.ctaSecondary, locale)}</Link>
          </Button>
        </div>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
