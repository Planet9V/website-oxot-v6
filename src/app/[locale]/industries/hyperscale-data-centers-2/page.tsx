import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/industries/hyperscale-data-centers-2/content";
import { Hero } from "@/components/industries/hyperscale-data-centers-2/Hero";
import { ScenarioModel } from "@/components/industries/hyperscale-data-centers-2/ScenarioModel";
import { SectorReality } from "@/components/industries/hyperscale-data-centers-2/SectorReality";
import { Architecture } from "@/components/industries/hyperscale-data-centers-2/Architecture";
import { TechnologyIndex } from "@/components/industries/hyperscale-data-centers-2/TechnologyIndex";
import { SystemAssets } from "@/components/industries/hyperscale-data-centers-2/SystemAssets";
import { DependencyMap } from "@/components/industries/hyperscale-data-centers-2/DependencyMap";
import { ScenarioRegister } from "@/components/industries/hyperscale-data-centers-2/ScenarioRegister";
import { DecisionRecords } from "@/components/industries/hyperscale-data-centers-2/DecisionRecords";
import { ThreeGateLedger } from "@/components/industries/hyperscale-data-centers-2/ThreeGateLedger";
import { CaseProgramme } from "@/components/industries/hyperscale-data-centers-2/CaseProgramme";
import { Capabilities } from "@/components/industries/hyperscale-data-centers-2/Capabilities";
import { Regulatory } from "@/components/industries/hyperscale-data-centers-2/Regulatory";
import { Engagement } from "@/components/industries/hyperscale-data-centers-2/Engagement";
import { IntakeCta } from "@/components/industries/hyperscale-data-centers-2/IntakeCta";

export async function generateMetadata(
  props: PageProps<"/[locale]/industries/hyperscale-data-centers-2">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/hyperscale-data-centers-2`)
  };
}

/**
 * /industries/hyperscale-data-centers-2 — a review-only iteration of the live
 * `/industries/hyperscale-data-centers` page, built via `OXOT_Agent_Build_Pipeline.md`
 * (new_material_source/1_website_layout_v4/) from `3_industries/
 * industry_hyperscale.md`, not by copying the live page's existing components
 * or content. The live page stays untouched; this route is not wired into
 * primaryNav, matching `water-wastewater-2`/`-3`, `energy-utilities-2`,
 * `manufacturing-process-2` and `rail-transportation-2`.
 *
 * EVERY SECTION COMPONENT SELF-WRAPS ITS OWN HEADER RECIPE from `Rule.tsx`
 * (`SectionA`/`SectionB`/`SectionC`), except `SystemAssets` (bare
 * `AssetClassBento`, no shell — matches every sibling page's identical
 * treatment; an earlier draft wrapped it in a `Datum`, which was reversed
 * once checked against the true precedent) and `IntakeCta` (the H-D closing
 * recipe, consuming `Rule.tsx`'s bare `Datum` directly). So this file renders
 * every section BARE, in the spec's own page-structure order (source
 * L536–L550) — no extra wrapper here.
 *
 * S05 (`SystemAssets`) and S08 (`DecisionRecords`) carry real ordinals despite
 * neither being in the source's own page-structure bullet list — S05 is this
 * build's derived nine-asset-class inventory (mapped from S03's architecture
 * tiers) and S08 is the source's own "Four hyperscale decisions" section,
 * rendered as static always-visible records rather than a switchboard; see
 * `DecisionRecords.tsx`'s own docblock for why the switchboard was declined
 * (page-level saturation and adjacency to S07's own master/detail register).
 *
 * SUPPRESS_CONTACT_BAND carries this route (see nav.ts) because `IntakeCta`
 * is a real, full page-local closing CTA (S14) — the same condition already
 * applied to every other `-2` sibling.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual` with
 * `nl` a same-as-English placeholder pending translation, except `IntakeCta`'s
 * secondary CTA and `Regulatory`'s NIS2 row, which each gate themselves to an
 * English-only destination on `nl` (`TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY`
 * and `ASSURANCE_IS_ENGLISH_ONLY` in content.ts).
 */
export default async function HyperscaleDataCenters2Page(
  props: PageProps<"/[locale]/industries/hyperscale-data-centers-2">
) {
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

      <Hero locale={locale} />
      <ScenarioModel locale={locale} />
      <SectorReality locale={locale} />
      <Architecture locale={locale} />
      <TechnologyIndex locale={locale} />
      <SystemAssets locale={locale} />
      <DependencyMap locale={locale} />
      <ScenarioRegister locale={locale} />
      <DecisionRecords locale={locale} />
      <ThreeGateLedger locale={locale} />
      <CaseProgramme locale={locale} />
      <Capabilities locale={locale} />
      <Regulatory locale={locale} />
      <Engagement locale={locale} />
      <IntakeCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
