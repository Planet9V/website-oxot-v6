import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/industries/energy-utilities/content";
import { EnergyHero } from "@/components/industries/energy-utilities/EnergyHero";
import { EnergyConcerns } from "@/components/industries/energy-utilities/EnergyConcerns";
import { EnergyArchitecture } from "@/components/industries/energy-utilities/EnergyArchitecture";
import { EnergyScenarios } from "@/components/industries/energy-utilities/EnergyScenarios";
import { EnergyDecisions } from "@/components/industries/energy-utilities/EnergyDecisions";
import { EnergyWorkedExample } from "@/components/industries/energy-utilities/EnergyWorkedExample";
import { EnergyCapabilities } from "@/components/industries/energy-utilities/EnergyCapabilities";
import { EnergyRegulatory } from "@/components/industries/energy-utilities/EnergyRegulatory";
import { EnergyEngagement } from "@/components/industries/energy-utilities/EnergyEngagement";
import { EnergyFinalCta } from "@/components/industries/energy-utilities/EnergyFinalCta";

export async function generateMetadata(props: PageProps<"/[locale]/industries/energy-utilities">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/energy-utilities`)
  };
}

/**
 * /industries/energy-utilities — Phase 1 of the new_material_source/
 * 1_website_layout_v4 implementation (owner request, 2026-08-22). Content
 * transcribed from new_material_source/1_website_layout_v4/3_industries/
 * industry_energy.md, which is finished, ready-to-use copy — see
 * content.ts's own doc comment for what was restructured vs. kept verbatim.
 *
 * REAL, THEME-REACTIVE PAGE (oxot-canvas, real --border/--card tokens, real
 * shadcn/ui components), NOT a fixed-dark comparison build like /cdt-2 —
 * corrected mid-build, 2026-08-22 (owner): industries were originally
 * planned as fixed-dark pages, then redirected once shadcn/ui was
 * confirmed already installed and configured in this project
 * (components.json, src/components/ui/*). Same conventions as /assurance
 * and /technical-specification.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual`
 * (src/i18n/bilingual.ts) with `nl` a same-as-English placeholder pending
 * translation (owner: finish English everywhere first, translate after).
 * See registry.ts's `same()` helper.
 *
 * DESIGN DIRECTION: "single-line diagram" — energy is literally drawn as a
 * single-line diagram, so the page threads a horizontal accent line with
 * node markers through Hero, Architecture and Decisions (EnergyLine.tsx),
 * rather than repeating the site's usual stacked hairline-divided card
 * grid every section. Deliberately varies section-to-section: Card grid
 * (concerns) -> line + vertical riser (architecture) -> Accordion
 * (scenarios) -> numbered line-stations (decisions) -> mixed
 * narrative/table (worked example) -> numbered spec rows (capabilities) ->
 * real data table (regulatory) -> Card grid (engagement).
 *
 * Not in primaryNav yet — Phase 6 of the same plan, once Assurance/
 * Platform/Resources/Company sections also exist.
 */
export default async function EnergyUtilitiesPage(props: PageProps<"/[locale]/industries/energy-utilities">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Energy & Utilities"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.industries), label: "Industries" }]}
      />

      <EnergyHero locale={locale} />
      <EnergyConcerns locale={locale} />
      <EnergyArchitecture locale={locale} />
      <EnergyScenarios locale={locale} />
      <EnergyDecisions locale={locale} />
      <EnergyWorkedExample locale={locale} />
      <EnergyCapabilities locale={locale} />
      <EnergyRegulatory locale={locale} />
      <EnergyEngagement locale={locale} />
      <EnergyFinalCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
