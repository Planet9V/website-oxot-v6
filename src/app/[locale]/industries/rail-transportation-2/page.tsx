import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/industries/rail-transportation-2/content";
import { Hero } from "@/components/industries/rail-transportation-2/Hero";
import { SectorReality } from "@/components/industries/rail-transportation-2/SectorReality";
import { SegmentComparison } from "@/components/industries/rail-transportation-2/SegmentComparison";
import { Architecture } from "@/components/industries/rail-transportation-2/Architecture";
import { SystemAssets } from "@/components/industries/rail-transportation-2/SystemAssets";
import { PassengerScenarios } from "@/components/industries/rail-transportation-2/PassengerScenarios";
import { FreightScenarios } from "@/components/industries/rail-transportation-2/FreightScenarios";
import { DecisionLedger } from "@/components/industries/rail-transportation-2/DecisionLedger";
import { WorkedExamplePassenger } from "@/components/industries/rail-transportation-2/WorkedExamplePassenger";
import { WorkedExampleFreight } from "@/components/industries/rail-transportation-2/WorkedExampleFreight";
import { Capabilities } from "@/components/industries/rail-transportation-2/Capabilities";
import { Regulatory } from "@/components/industries/rail-transportation-2/Regulatory";
import { Engagement } from "@/components/industries/rail-transportation-2/Engagement";
import { IntakeCta } from "@/components/industries/rail-transportation-2/IntakeCta";

export async function generateMetadata(
  props: PageProps<"/[locale]/industries/rail-transportation-2">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/rail-transportation-2`)
  };
}

/**
 * /industries/rail-transportation-2 — a review-only iteration of the live
 * `/industries/rail-transportation` page, built via `OXOT_Agent_Build_Pipeline.md`
 * (new_material_source/1_website_layout_v4/) from `3_industries/
 * industry_rail-transportation.md`, not by copying the live page's existing
 * components or content. The live page stays untouched; this route is not
 * wired into primaryNav, matching `water-wastewater-2`/`-3`, `energy-utilities-2`
 * and `manufacturing-process-2`.
 *
 * EVERY SECTION COMPONENT SELF-WRAPS ITS OWN HEADER RECIPE from `Rule.tsx`
 * (`SectionA`/`SectionB`/`SectionC`), except `SystemAssets` (renders
 * `AssetClassBento`'s own `<section>`+`<h2>` directly) and `IntakeCta` (the
 * H-D closing recipe, consuming `Rule.tsx`'s bare `Datum` directly). So this
 * file renders every section BARE, in the spec's own page-structure order
 * (source L442–458) — no extra wrapper here. Section ordinals run S00–S13
 * continuously across the eleven components below (S02 SegmentComparison and
 * S04 SystemAssets both carry real ordinals despite not being in the source's
 * own bullet list — SegmentComparison is the "Passenger transit vs US freight
 * rail" subsection of Sector reality, and SystemAssets is this build's own
 * derived nine-asset-class inventory; see each file's own docblock).
 *
 * SUPPRESS_CONTACT_BAND carries this route (see nav.ts) because `IntakeCta`
 * is a real, full page-local closing CTA (S13, the seven-field rail intake
 * form) — the same condition already applied to water-wastewater-2/-3,
 * energy-utilities-2 and manufacturing-process-2.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual` with
 * `nl` a same-as-English placeholder pending translation, except `IntakeCta`'s
 * secondary CTA, which gates itself to `/cdt-2` on `nl` since
 * `/technical-specification` is English-only (`content.ts`'s
 * `TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY` flag).
 */
export default async function RailTransportation2Page(
  props: PageProps<"/[locale]/industries/rail-transportation-2">
) {
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

      <Hero locale={locale} />
      <SectorReality locale={locale} />
      <SegmentComparison locale={locale} />
      <Architecture locale={locale} />
      <SystemAssets locale={locale} />
      <PassengerScenarios locale={locale} />
      <FreightScenarios locale={locale} />
      <DecisionLedger locale={locale} />
      <WorkedExamplePassenger locale={locale} />
      <WorkedExampleFreight locale={locale} />
      <Capabilities locale={locale} />
      <Regulatory locale={locale} />
      <Engagement locale={locale} />
      <IntakeCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
