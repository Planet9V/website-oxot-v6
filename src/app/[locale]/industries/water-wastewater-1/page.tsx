import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { same } from "@/components/industries/registry";
import {
  ARCHITECTURE,
  CAPABILITIES,
  DECISIONS,
  ENGAGEMENT,
  META,
  REGULATORY,
  SCENARIOS,
  WORKED_EXAMPLE
} from "@/components/industries/water-wastewater-1/content";
import { Datum, ProfileSection } from "@/components/industries/water-wastewater-1/Datum";
import { WaterHero } from "@/components/industries/water-wastewater-1/WaterHero";
import { SectorReality } from "@/components/industries/water-wastewater-1/SectorReality";
import { ProcessArchitecture } from "@/components/industries/water-wastewater-1/ProcessArchitecture";
import { SystemAssets } from "@/components/industries/water-wastewater-1/SystemAssets";
import { RiskRegister } from "@/components/industries/water-wastewater-1/RiskRegister";
import { DecisionSwitchboard } from "@/components/industries/water-wastewater-1/DecisionSwitchboard";
import { WorkedExample } from "@/components/industries/water-wastewater-1/WorkedExample";
import { Capabilities } from "@/components/industries/water-wastewater-1/Capabilities";
import { Regulatory } from "@/components/industries/water-wastewater-1/Regulatory";
import { Engagement } from "@/components/industries/water-wastewater-1/Engagement";
import { FinalCta } from "@/components/industries/water-wastewater-1/FinalCta";

/**
 * /industries/water-wastewater-1 — ITERATION 1.
 *
 * A fresh, parallel build of the Water & Wastewater industry page, standing
 * beside `/industries/water-wastewater` rather than replacing it. Nothing here
 * imports from that page's folder and nothing in that folder was touched;
 * future iterations get `-2`, `-3` and so on, each judged on its own.
 * Deliberately NOT in `primaryNav` — this is a review URL.
 *
 * CONTENT: every section is transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_water.md, in that file's own "Page
 * structure" order, with one addition (section 03) explained below.
 *
 * DESIGN DIRECTION — "the hydraulic profile." A water treatment works is
 * designed against a long section in which grade falls through every treatment
 * barrier and is put back by pumping. That drawing is this page's shape
 * language: a ticked survey datum divides every section, the hero canvas is the
 * profile itself with the control and communications layers beneath it, the
 * architecture section is the same long-section read downwards, and the closing
 * CTA terminates the run. It is deliberately unlike the existing water page's
 * vertical spine and wave dividers, and unlike rail's dual track, energy's
 * single-line diagram, hyperscale's status dot and defense's classification
 * stamp.
 *
 * PATTERNS USED, AND WHERE — each implemented against its real spec text, with
 * the reasoning kept in each component's own doc comment rather than here:
 *   00 Hero              Pattern 1, Consequence Cascade Hero
 *   01 Sector reality    custom — an engineering schedule (no named pattern fits)
 *   02 Architecture      custom — a process-chain long-section (mandated custom
 *                        by the content-to-visual mapping and the component
 *                        inventory; Pattern 4 is the near miss and is not used)
 *   03 Asset classes     Pattern 3, Asset-Class Bento, via the real shared
 *                        `AssetClassBento` component
 *   04 Risk scenarios    custom — a selectable register (Patterns 7 and 8 are
 *                        both scope-restricted away from this content)
 *   05 Four decisions    Foundation Deliverable 2, the Decisions Switchboard
 *   06 Worked example    Pattern 2, Three-Gate Ledger
 *   07 Capabilities      custom — seven strata (not the bento; its cells are the
 *                        nine asset types, and these are not assets)
 *   08 Regulatory        custom — a real table for real tabular content
 *   09 Engagement        Pattern 6, Zone Sequencer
 *   10 Final CTA         the closing datum
 *
 * SECTION 03 IS AN ADDITION to the brief's page structure, not a substitution:
 * `OXOT_Layout_Styles.md` names Industries "applications" sections as Pattern
 * 3's home, and the pattern has a real, verified implementation to render it.
 * Every other section maps one-to-one onto the brief.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual` with
 * `nl` a same-as-English placeholder pending translation, per registry.ts.
 */

export async function generateMetadata(
  props: PageProps<"/[locale]/industries/water-wastewater-1">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/water-wastewater-1`)
  };
}

export default async function WaterWastewaterIterationOnePage(
  props: PageProps<"/[locale]/industries/water-wastewater-1">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-20">
      <Breadcrumb
        here="Water & Wastewater"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.industries), label: "Industries" }]}
      />

      <WaterHero locale={locale} />

      <SectorReality locale={locale} />

      <ProfileSection
        id="architecture"
        index="02"
        datumLabel={same("Architecture")}
        heading={ARCHITECTURE.h2}
        lead={ARCHITECTURE.lead}
        locale={locale}
      >
        <ProcessArchitecture locale={locale} />
      </ProfileSection>

      {/* `AssetClassBento` brings its own <section> and heading, so this one
          takes the datum only. Its internal `mt-20` is pulled back to the
          page's standard datum-to-heading gap rather than left to open a
          second, inconsistent rhythm. */}
      <div className="pt-16 sm:pt-24">
        <Datum index="03" label={same("Asset classes")} locale={locale} />
        <div className="-mt-10">
          <SystemAssets locale={locale} />
        </div>
      </div>

      <ProfileSection
        id="scenarios"
        index="04"
        datumLabel={same("Risk scenarios")}
        heading={SCENARIOS.h2}
        lead={SCENARIOS.lead}
        locale={locale}
      >
        <RiskRegister locale={locale} />
      </ProfileSection>

      <ProfileSection
        id="decisions"
        index="05"
        datumLabel={same("Four decisions")}
        heading={DECISIONS.h2}
        lead={DECISIONS.lead}
        locale={locale}
      >
        <DecisionSwitchboard locale={locale} />
      </ProfileSection>

      <ProfileSection
        id="worked-example"
        index="06"
        datumLabel={same("Worked example")}
        heading={WORKED_EXAMPLE.h2}
        locale={locale}
      >
        <WorkedExample locale={locale} />
      </ProfileSection>

      <ProfileSection
        id="capabilities"
        index="07"
        datumLabel={same("Capabilities")}
        heading={CAPABILITIES.h2}
        lead={CAPABILITIES.lead}
        locale={locale}
      >
        <Capabilities locale={locale} />
      </ProfileSection>

      <ProfileSection
        id="regulatory"
        index="08"
        datumLabel={same("Regulatory context")}
        heading={REGULATORY.h2}
        lead={REGULATORY.lead}
        locale={locale}
      >
        <Regulatory locale={locale} />
      </ProfileSection>

      <ProfileSection
        id="engagement"
        index="09"
        datumLabel={same("Engagement")}
        heading={ENGAGEMENT.h2}
        lead={ENGAGEMENT.lead}
        locale={locale}
      >
        <Engagement locale={locale} />
      </ProfileSection>

      <FinalCta locale={locale} />

      <div className="mt-20">
        <ThreeDoors locale={locale} t={d.doors} />
      </div>
    </div>
  );
}
