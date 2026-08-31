import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/industries/manufacturing-process-2/content";
import { ManufacturingHero } from "@/components/industries/manufacturing-process-2/ManufacturingHero";
import { OperationalReality } from "@/components/industries/manufacturing-process-2/OperationalReality";
import { Architecture } from "@/components/industries/manufacturing-process-2/Architecture";
import { SystemAssets } from "@/components/industries/manufacturing-process-2/SystemAssets";
import { ScenarioRegister } from "@/components/industries/manufacturing-process-2/ScenarioRegister";
import { DecisionSwitchboard } from "@/components/industries/manufacturing-process-2/DecisionSwitchboard";
import { ThreeGateLedger } from "@/components/industries/manufacturing-process-2/ThreeGateLedger";
import { Capabilities } from "@/components/industries/manufacturing-process-2/Capabilities";
import { Regulatory } from "@/components/industries/manufacturing-process-2/Regulatory";
import { Engagement } from "@/components/industries/manufacturing-process-2/Engagement";
import { IntakeCta } from "@/components/industries/manufacturing-process-2/IntakeCta";

export async function generateMetadata(
  props: PageProps<"/[locale]/industries/manufacturing-process-2">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/manufacturing-process-2`)
  };
}

/**
 * /industries/manufacturing-process-2 — a review-only iteration of the live
 * `/industries/manufacturing-process` page, built via `OXOT_Agent_Build_Pipeline.md`
 * (new_material_source/1_website_layout_v4/) from `3_industries/
 * industry_manu-process.md`, not by copying the live page's existing
 * components or content. The live page stays untouched; this route is not
 * wired into primaryNav, matching `water-wastewater-2`/`-3` and
 * `energy-utilities-2`.
 *
 * S09 ENGAGEMENT APPROACH HAS NO SOURCE COPY IN THE SPEC — see `content.ts`'s
 * `ENGAGEMENT` docblock for the owner-approved resolution (the standard
 * cross-sector 3-tier framework, with Manufacturing-specific language
 * grounded in facts already cited elsewhere in this page's own spec).
 *
 * EVERY SECTION COMPONENT SELF-WRAPS ITS OWN HEADER RECIPE from `Rule.tsx`
 * (`SectionA`/`SectionB`/`SectionC`), except `SystemAssets` (renders
 * `AssetClassBento`'s own `<section>`+`<h2>` directly) and `IntakeCta` (the
 * H-D closing recipe, consuming `Rule.tsx`'s bare `Datum` directly). So this
 * file renders every section BARE, in the spec's own page-structure order —
 * no extra wrapper here.
 *
 * SUPPRESS_CONTACT_BAND carries this route (see nav.ts) because `IntakeCta`
 * is a real, full page-local closing CTA.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual` with
 * `nl` a same-as-English placeholder pending translation, except `IntakeCta`'s
 * secondary CTA, which gates itself to `/cdt-2` on `nl` since
 * `/technical-specification` is English-only (`content.ts`'s
 * `ctaSecondaryEnglishOnly` flag).
 */
export default async function ManufacturingProcess2Page(
  props: PageProps<"/[locale]/industries/manufacturing-process-2">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Manufacturing & Process"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.industries), label: "Industries" }]}
      />

      <ManufacturingHero locale={locale} />
      <OperationalReality locale={locale} />
      <Architecture locale={locale} />
      <SystemAssets locale={locale} />
      <ScenarioRegister locale={locale} />
      <DecisionSwitchboard locale={locale} />
      <ThreeGateLedger locale={locale} />
      <Capabilities locale={locale} />
      <Regulatory locale={locale} />
      <Engagement locale={locale} />
      <IntakeCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
