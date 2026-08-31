import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/industries/hyperscale-data-centers/content";
import { HyperscaleHero } from "@/components/industries/hyperscale-data-centers/HyperscaleHero";
import { HyperscaleModel } from "@/components/industries/hyperscale-data-centers/HyperscaleModel";
import { HyperscaleReality } from "@/components/industries/hyperscale-data-centers/HyperscaleReality";
import { HyperscaleArchitecture } from "@/components/industries/hyperscale-data-centers/HyperscaleArchitecture";
import { HyperscaleDependencies } from "@/components/industries/hyperscale-data-centers/HyperscaleDependencies";
import { HyperscaleScenarios } from "@/components/industries/hyperscale-data-centers/HyperscaleScenarios";
import { HyperscaleDecisions } from "@/components/industries/hyperscale-data-centers/HyperscaleDecisions";
import { HyperscaleWorkedExample } from "@/components/industries/hyperscale-data-centers/HyperscaleWorkedExample";
import { HyperscaleCaseStudies } from "@/components/industries/hyperscale-data-centers/HyperscaleCaseStudies";
import { HyperscaleCapabilities } from "@/components/industries/hyperscale-data-centers/HyperscaleCapabilities";
import { HyperscaleRegulatory } from "@/components/industries/hyperscale-data-centers/HyperscaleRegulatory";
import { HyperscaleEngagement } from "@/components/industries/hyperscale-data-centers/HyperscaleEngagement";
import { HyperscaleFinalCta } from "@/components/industries/hyperscale-data-centers/HyperscaleFinalCta";

export async function generateMetadata(props: PageProps<"/[locale]/industries/hyperscale-data-centers">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/hyperscale-data-centers`)
  };
}

/**
 * /industries/hyperscale-data-centers — content transcribed from
 * new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md, the richest of the six industry source files —
 * see content.ts's own doc comment for what was condensed vs. kept
 * verbatim.
 *
 * REAL, THEME-REACTIVE PAGE (oxot-canvas, real border/bg-card tokens, real
 * shadcn/ui components), same conventions as /industries/energy-utilities,
 * /assurance and /technical-specification — not a fixed-dark comparison
 * build.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual`
 * (src/i18n/bilingual.ts) with `nl` a same-as-English placeholder pending
 * translation. See registry.ts's `same()` helper.
 *
 * DESIGN DIRECTION: "control-room dashboard" — deliberately distinct from
 * energy-utilities' single-line-diagram motif (EnergyLine.tsx, not reused
 * here). Instead: dense multi-column card walls (a 4-col scenario library
 * vs. energy's 3-col grids), monospace tabular-nums stat readouts (hero
 * KPI strip, D-codes, SC-codes, CS-codes, CAP-codes), and a shared
 * StatusDot.tsx glow-dot primitive threaded through nearly every section
 * as the page's own signature marker, standing in for EnergyLine's role.
 * Section-to-section treatment still varies within that idiom: KPI strip
 * (hero) -> drill-down list + decorative ToggleGroup + inline SVG stack
 * (interactive-model placeholder) -> badge rows + 4-col card wall (sector
 * reality) -> rack-style readout rows (architecture) -> domain panel grid
 * + table (dependency map) -> 4-col always-open card wall (scenarios,
 * intentionally NOT an Accordion like energy's) -> 4-panel console
 * (decisions) -> incident-log ordered list + table (worked example) ->
 * divided case-log list (case studies) -> 3-col stat cards (capabilities)
 * -> coded data table (regulatory) -> 4-col cards (engagement).
 *
 * The interactive hyperscale model the source brief specifies (a
 * navigable drill-down + scenario picker) is not built as a working tool
 * anywhere on the site — HyperscaleModel.tsx is a static, illustrated
 * placeholder per this batch's explicit instruction, not an omission.
 *
 * Not in primaryNav yet — same phasing as energy-utilities.
 */
export default async function HyperscaleDataCentersPage(props: PageProps<"/[locale]/industries/hyperscale-data-centers">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Hyperscale & Data Centers"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.industries), label: "Industries" }]}
      />

      <HyperscaleHero locale={locale} />
      <HyperscaleModel locale={locale} />
      <HyperscaleReality locale={locale} />
      <HyperscaleArchitecture locale={locale} />
      <HyperscaleDependencies locale={locale} />
      <HyperscaleScenarios locale={locale} />
      <HyperscaleDecisions locale={locale} />
      <HyperscaleWorkedExample locale={locale} />
      <HyperscaleCaseStudies locale={locale} />
      <HyperscaleCapabilities locale={locale} />
      <HyperscaleRegulatory locale={locale} />
      <HyperscaleEngagement locale={locale} />
      <HyperscaleFinalCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
