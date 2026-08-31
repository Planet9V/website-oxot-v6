import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/industries/water-wastewater/content";
import { WaterSpineRail } from "@/components/industries/water-wastewater/WaterSpine";
import { WaterHero } from "@/components/industries/water-wastewater/WaterHero";
import { WaterSectorReality } from "@/components/industries/water-wastewater/WaterSectorReality";
import { WaterArchitecture } from "@/components/industries/water-wastewater/WaterArchitecture";
import { WaterSystemAssets } from "@/components/industries/water-wastewater/WaterSystemAssets";
import { WaterScenarios } from "@/components/industries/water-wastewater/WaterScenarios";
import { WaterDecisions } from "@/components/industries/water-wastewater/WaterDecisions";
import { WaterWorkedExample } from "@/components/industries/water-wastewater/WaterWorkedExample";
import { WaterCapabilities } from "@/components/industries/water-wastewater/WaterCapabilities";
import { WaterRegulatory } from "@/components/industries/water-wastewater/WaterRegulatory";
import { WaterEngagement } from "@/components/industries/water-wastewater/WaterEngagement";
import { WaterFinalCta } from "@/components/industries/water-wastewater/WaterFinalCta";

export async function generateMetadata(props: PageProps<"/[locale]/industries/water-wastewater">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/water-wastewater`)
  };
}

/**
 * /industries/water-wastewater — Phase 1 of the new_material_source/
 * 1_website_layout_v4 implementation (owner request, 2026-08-22). Content
 * transcribed from new_material_source/1_website_layout_v4/3_industries/
 * industry_water.md, which is finished, ready-to-use copy — see content.ts's
 * own doc comment for what was restructured vs. kept verbatim.
 *
 * REAL, THEME-REACTIVE PAGE (oxot-canvas, real --border/--card tokens, real
 * shadcn/ui components), same conventions as /assurance,
 * /technical-specification and the sibling /industries/energy-utilities.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual`
 * (src/i18n/bilingual.ts) with `nl` a same-as-English placeholder pending
 * translation. See registry.ts's `same()` helper.
 *
 * DESIGN DIRECTION: "process-flow spine" — deliberately NOT a repeat of
 * energy-utilities' horizontal single-line-diagram motif (EnergyLine.tsx).
 * Water's story is continuous hydraulic flow and threshold, so a persistent
 * vertical accent rule (WaterSpineRail, in WaterSpine.tsx) runs down the
 * left edge of a narrower, editorial reading column for the length of the
 * page, with each section dropping a "station" marker (WaterStop) where it
 * opens. Hard `border-t` section dividers are replaced by a soft curved SVG
 * wave (WaterWave) — literal hydraulic imagery instead of the site's usual
 * hairline. Where the source treats Drinking Water and Wastewater as two
 * distinct systems, WaterArchitecture presents them as two stops along the
 * same spine (larger station markers, shared rail) rather than a
 * side-by-side split.
 *
 * Not in primaryNav yet — Phase 6 of the same plan, once Assurance/
 * Platform/Resources/Company sections also exist.
 */
export default async function WaterWastewaterPage(props: PageProps<"/[locale]/industries/water-wastewater">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Water & Wastewater"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.industries), label: "Industries" }]}
      />

      <div className="relative pl-6 sm:pl-10">
        <WaterSpineRail />
        <WaterHero locale={locale} />
        <WaterSectorReality locale={locale} />
        <WaterArchitecture locale={locale} />
        <WaterSystemAssets locale={locale} />
        <WaterScenarios locale={locale} />
        <WaterDecisions locale={locale} />
        <WaterWorkedExample locale={locale} />
        <WaterCapabilities locale={locale} />
        <WaterRegulatory locale={locale} />
        <WaterEngagement locale={locale} />
        <WaterFinalCta locale={locale} />
      </div>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
