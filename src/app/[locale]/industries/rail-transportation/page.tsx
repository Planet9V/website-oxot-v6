import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/industries/rail-transportation/content";
import { RailHero } from "@/components/industries/rail-transportation/RailHero";
import { RailSectorReality } from "@/components/industries/rail-transportation/RailSectorReality";
import { RailArchitecture } from "@/components/industries/rail-transportation/RailArchitecture";
import { RailScenarios } from "@/components/industries/rail-transportation/RailScenarios";
import { RailDecisions } from "@/components/industries/rail-transportation/RailDecisions";
import { RailWorkedExamples } from "@/components/industries/rail-transportation/RailWorkedExamples";
import { RailCapabilities } from "@/components/industries/rail-transportation/RailCapabilities";
import { RailRegulatory } from "@/components/industries/rail-transportation/RailRegulatory";
import { RailEngagement } from "@/components/industries/rail-transportation/RailEngagement";
import { RailFinalCta } from "@/components/industries/rail-transportation/RailFinalCta";

export async function generateMetadata(props: PageProps<"/[locale]/industries/rail-transportation">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/rail-transportation`)
  };
}

/**
 * /industries/rail-transportation — sibling to /industries/energy-utilities
 * (same architecture: oxot-canvas, real theme tokens, real shadcn/ui,
 * both-locales-render Bilingual content), but a deliberately distinct
 * composition per the owner's standing instruction against a cookie-cutter
 * layout across the six industry pages.
 *
 * Content transcribed from new_material_source/1_website_layout_v4/
 * 3_industries/industry_rail-transportation.md — finished, ready-to-use
 * copy; see content.ts's own doc comment for what was restructured.
 *
 * DESIGN DIRECTION: "DUAL TRACK" — the source content genuinely splits
 * into two parallel narratives, Passenger Transit and US Freight Rail,
 * each with its own OT architecture, scenario library, and worked example.
 * Rather than a card grid or single-line-diagram motif (energy-utilities'
 * signature — deliberately not reused here), the sections that fork in
 * the source run as a literal two-column "fork and rejoin": Architecture,
 * Scenarios, Decisions and the Worked examples each render two full,
 * independent columns (`grid-cols-1 lg:grid-cols-2`, stacking on narrow
 * viewports), each headed by a repeated RailTrackHeader badge. Hero and
 * the closing CTA stay single, full-width — the shared track before the
 * fork and the point where both tracks converge again. The signature
 * visual motif is a literal rail track (RailTrack.tsx: two parallel rails
 * with sleepers, not EnergyLine's single hairline), plus a static SVG
 * fork diagram in the hero standing in for the source brief's
 * not-yet-built interactive segment toggle.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual`
 * (src/i18n/bilingual.ts) with `nl` a same-as-English placeholder pending
 * translation, same convention as every other industry page this batch.
 *
 * Not in primaryNav yet — same Phase 6 status as /industries/
 * energy-utilities.
 */
export default async function RailTransportationPage(props: PageProps<"/[locale]/industries/rail-transportation">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Rail & Transportation"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.industries), label: "Industries" }]}
      />

      <RailHero locale={locale} />
      <RailSectorReality locale={locale} />
      <RailArchitecture locale={locale} />
      <RailScenarios locale={locale} />
      <RailDecisions locale={locale} />
      <RailWorkedExamples locale={locale} />
      <RailCapabilities locale={locale} />
      <RailRegulatory locale={locale} />
      <RailEngagement locale={locale} />
      <RailFinalCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
