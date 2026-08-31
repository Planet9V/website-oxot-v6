import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/industries/defense-government/content";
import { DefenseHero } from "@/components/industries/defense-government/DefenseHero";
import { DefenseSovereignty } from "@/components/industries/defense-government/DefenseSovereignty";
import { DefenseScope } from "@/components/industries/defense-government/DefenseScope";
import { DefenseArchitecture } from "@/components/industries/defense-government/DefenseArchitecture";
import { DefenseScenarios } from "@/components/industries/defense-government/DefenseScenarios";
import { DefenseDecisions } from "@/components/industries/defense-government/DefenseDecisions";
import { DefenseWorkedExample } from "@/components/industries/defense-government/DefenseWorkedExample";
import { DefenseAirGap } from "@/components/industries/defense-government/DefenseAirGap";
import { DefenseCaseStudies } from "@/components/industries/defense-government/DefenseCaseStudies";
import { DefenseCapabilities } from "@/components/industries/defense-government/DefenseCapabilities";
import { DefenseRegulatory } from "@/components/industries/defense-government/DefenseRegulatory";
import { DefenseEngagement } from "@/components/industries/defense-government/DefenseEngagement";
import { DefenseFinalCta } from "@/components/industries/defense-government/DefenseFinalCta";

export async function generateMetadata(props: PageProps<"/[locale]/industries/defense-government">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/defense-government`)
  };
}

/**
 * /industries/defense-government — sibling to /industries/energy-utilities,
 * same real/theme-reactive shadcn architecture (oxot-canvas, real
 * --border/--card tokens), content transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_defence.md (canonical, finished
 * copy) with industry_defense_airgap.md and 6_resources/
 * air-gapped_deployment.md supplying the dedicated air-gap subsection only
 * — see content.ts's own doc comment for the full sourcing and
 * retargeting notes.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard, same as every industry
 * page. Content is `Bilingual` with `nl` a same-as-English placeholder
 * pending translation (registry.ts's `same()`).
 *
 * ASSIGNED DESIGN DIRECTION: "angular / restrained" (owner brief,
 * 2026-08-22) — deliberately NOT energy-utilities' horizontal
 * single-line-diagram motif (EnergyLine.tsx). Distinguishing choices, all
 * page-local to src/components/industries/defense-government/:
 *   - DefenseEdge.tsx: a short, shallow clip-path-cut mark opening every
 *     section, replacing the site's usual straight border-t.
 *   - DefenseStamp.tsx: a bordered, corner-notched "document header" kicker
 *     replacing the plain text-only .oxot-kicker — never claims an actual
 *     classification level.
 *   - Sharp corners throughout (plain `border border-border` panels, no
 *     rounded-2xl, minimal use of the Card component and its mandatory
 *     hover-lift) — more restrained and serious than every rounded,
 *     lifting surface elsewhere on the site.
 *   - Vertical diamond-marked chains (Hero, Architecture) instead of
 *     horizontal dot-marked rules; a two-column Decisions grid instead of
 *     a four-across riser; a static docket list instead of an Accordion
 *     for Scenarios.
 * See each component's own doc comment for the specific contrast it draws
 * with its energy-utilities equivalent.
 *
 * Not in primaryNav yet — same precedent as every other industry page,
 * pending the nav overhaul once /industries and its siblings all exist.
 */
export default async function DefenseGovernmentPage(props: PageProps<"/[locale]/industries/defense-government">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Defense & Government"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.industries), label: "Industries" }]}
      />

      <DefenseHero locale={locale} />
      <DefenseSovereignty locale={locale} />
      <DefenseScope locale={locale} />
      <DefenseArchitecture locale={locale} />
      <DefenseScenarios locale={locale} />
      <DefenseDecisions locale={locale} />
      <DefenseWorkedExample locale={locale} />
      <DefenseAirGap locale={locale} />
      <DefenseCaseStudies locale={locale} />
      <DefenseCapabilities locale={locale} />
      <DefenseRegulatory locale={locale} />
      <DefenseEngagement locale={locale} />
      <DefenseFinalCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
