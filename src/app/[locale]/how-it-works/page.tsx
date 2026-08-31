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
import { BREADCRUMB, CLOSING, HERO, META } from "@/components/platform/how-it-works/content";
import { ChainMap } from "@/components/platform/how-it-works/chain-map";
import { HowChain } from "@/components/platform/how-it-works/HowChain";
import { HowBuild } from "@/components/platform/how-it-works/HowBuild";
import { HowViews } from "@/components/platform/how-it-works/HowViews";
import { HowTechnical } from "@/components/platform/how-it-works/HowTechnical";
import { HowOnward } from "@/components/platform/how-it-works/HowOnward";

export async function generateMetadata(props: PageProps<"/[locale]/how-it-works">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, "/how-it-works")
  };
}

/**
 * /how-it-works — the Platform section's mechanical explanation: how the
 * Cyber Digital Twin gets from a drawing the customer already owns to a
 * decision that survives an audit.
 *
 * COMPOSITION: A CHAIN, READ ONCE, TOP TO BOTTOM.
 * OXOT_Composition_Rules.md gives the Platform pages a "long-form product
 * narrative … technical architecture as progressive disclosure … one strong
 * final CTA", and platform.md supplies the chain itself. So the page opens on
 * a hero and a chain map, runs six long-form sections in the chain's order,
 * then turns to how the model is built, how it is read, what the parts are,
 * and where the evidence lands.
 *
 * WHY NOT THE ASSURANCE LAYOUT. The five /assurance regime pages solve
 * navigation with a sticky contents rail beside a single column. That is right
 * for a specification read out of order; it is wrong here, because on this
 * page the ORDER IS THE ARGUMENT — link 05 means nothing to a reader who
 * skipped 03. So the contents is an inline horizontal chain map instead, which
 * shows a sequence where a vertical rail cannot.
 *
 * THE CHAIN DOES CARRY A SECOND COLUMN, added 2026-08-31 on owner instruction
 * — a sticky CDT architecture figure beside the six links, the same image and
 * `lg:sticky lg:top-24` technique already used on the industry pages'
 * Capabilities sections. This is not the assurance rail: it carries no
 * navigation and no per-link switching, just one constant illustration of the
 * whole model while the chain's own order still does the arguing. Below `lg`
 * it drops to a single column like every other section on this page.
 *
 * WHY NOT THE INDUSTRY LAYOUT. The six industry pages open on a sector problem
 * and close on a sector CTA, with card grids in between. This page has one
 * subject and one argument, so a card grid would chop it into eight equally
 * weighted claims. Cards appear exactly twice — the build steps and the four
 * projections — because those two genuinely are sets of peers.
 *
 * NOTHING CLAIMS TO BE LIVE. One real inline SVG (the reachability figure) and
 * four notation glyphs, all static, all captioned as illustrative. The page's
 * only JavaScript is the technical accordion, which opens and closes drawers.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual`
 * with `nl` a same-as-English placeholder pending translation, the convention
 * documented in components/industries/registry.ts. The one EN-only
 * destination, /technical-specification, is guarded on that link alone.
 *
 * NOT IN primaryNav — nav.ts belongs to the integration owner and route
 * registration is handled separately.
 */
export default async function HowItWorksPage(props: PageProps<"/[locale]/how-it-works">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  /* /technical-specification is EN-only (see nav.ts). A Dutch reader is sent
     to the Cyber Digital Twin page instead of a 404 — the same fallback the
     assurance pages use. Reversible: once the specification is bilingual,
     drop the ternary and always link it. */
  const isEnglish = locale === "en";
  const secondaryHref = isEnglish ? localePath("en", PATHS.technicalSpecification) : localePath("nl", PATHS.cdt2);
  const secondaryLabel = isEnglish ? CLOSING.ctaSecondary : CLOSING.ctaSecondaryNl;

  return (
    <div className="oxot-canvas pb-16">
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

        {/* The passive-first position, before the mechanics rather than in a
            footnote — it is the first question every OT engineer asks, and a
            page about how the model touches a plant must answer it early. */}
        <ul className="mt-8 flex list-none flex-wrap gap-x-2 gap-y-2 p-0">
          {HERO.guarantees.map((item, i) => (
            <li
              key={i}
              className="mono-label rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground"
            >
              {pick(item, locale)}
            </li>
          ))}
        </ul>

        <ChainMap locale={locale} />
      </header>

      {/* No wrapping <main> here on purpose: [locale]/layout.tsx already
          renders the route's single <main id="main">, and its own comment
          notes that a page adding another nests two landmarks and breaks
          both — including the skip link. */}
      <HowChain locale={locale} />
      <HowBuild locale={locale} />
      <HowViews locale={locale} />
      <HowTechnical locale={locale} />
      <HowOnward locale={locale} />

      <section aria-labelledby="closing" className="mt-24 border-t border-border pt-14">
        <h2 id="closing" className="h-section">
          {pick(CLOSING.h2, locale)}
        </h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(CLOSING.body, locale)}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={localePath(locale, PATHS.contact)}>{pick(CLOSING.ctaPrimary, locale)}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={secondaryHref}>{pick(secondaryLabel, locale)}</Link>
          </Button>
        </div>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
