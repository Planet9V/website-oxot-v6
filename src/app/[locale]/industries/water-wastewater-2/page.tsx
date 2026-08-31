import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { same } from "@/components/industries/registry";
import { CAPABILITIES, DECISIONS, ENGAGEMENT, META } from "@/components/industries/water-wastewater-2/content";
import { ARCHITECTURE } from "@/components/industries/water-wastewater-2/content.architecture";
import { REGULATORY } from "@/components/industries/water-wastewater-2/content.regulatory";
import { SCENARIOS } from "@/components/industries/water-wastewater-2/content.scenarios";
import { WORKED_EXAMPLE } from "@/components/industries/water-wastewater-2/content.workedExample";
import { Datum, SectionA, SectionC } from "@/components/industries/water-wastewater-2/Rule";
import { WaterHero } from "@/components/industries/water-wastewater-2/WaterHero";
import { SectorReality } from "@/components/industries/water-wastewater-2/SectorReality";
import { ProcessLongSection } from "@/components/industries/water-wastewater-2/ProcessLongSection";
import { TechnologyIndex } from "@/components/industries/water-wastewater-2/TechnologyIndex";
import { SystemAssets } from "@/components/industries/water-wastewater-2/SystemAssets";
import { ScenarioRegister } from "@/components/industries/water-wastewater-2/ScenarioRegister";
import { DecisionSwitchboard } from "@/components/industries/water-wastewater-2/DecisionSwitchboard";
import { ThreeGateLedger } from "@/components/industries/water-wastewater-2/ThreeGateLedger";
import { Capabilities } from "@/components/industries/water-wastewater-2/Capabilities";
import { Regulatory } from "@/components/industries/water-wastewater-2/Regulatory";
import { Engagement } from "@/components/industries/water-wastewater-2/Engagement";
import { IntakeCta } from "@/components/industries/water-wastewater-2/IntakeCta";

/**
 * /industries/water-wastewater-2 — ITERATION 2.
 *
 * A parallel build standing beside `/industries/water-wastewater` (live, in
 * nav) and `/industries/water-wastewater-1` (the graded iteration-1 artifact,
 * kept only for A/B until this is accepted — then deleted, because leaving both
 * indefinitely is itself a duplicate-components QA failure). Nothing here
 * imports from either of those folders and neither was touched. The `-2` suffix
 * follows the convention `-1` set for itself. Deliberately NOT in `primaryNav`
 * — this is a review URL.
 *
 * SECTION ORDER IS THE BRIEF'S OWN "Page structure" (industry_water.md
 * L371–382), with the one addition `-1` correctly made: the asset-class bento
 * at S03, which `OXOT_Layout_Styles.md` names as Pattern 3's home for
 * Industries "applications" sections.
 *
 * COMPONENT-VARIETY ARITHMETIC, against the Composition Rules floor:
 *   · 9 body sections (S01–S09).
 *   · Editorial-schedule-shaped: exactly 1 (S07 Capabilities) = 11%, against a
 *     cap of about one third, and no two consecutive.
 *   · Structurally distinct non-text-row treatments: 8 — hero profile canvas,
 *     cited-evidence panel + matrix, drawn long-section + tag clusters, bento,
 *     pathway-trace register, decision switchboard, three-gate ledger with a
 *     shared canvas, zone sequencer. Floor is 2.
 *   · Named patterns used: 1, 2, 3 and 6 — exactly four, inside the "compose
 *     2–4, never all 8" guidance.
 *
 * HEADER RECIPES ARE BOUND TO CONTENT SHAPE, not to section number, which is
 * what makes them falsifiable (see `Rule.tsx`):
 *   · H-A `SectionA` → S02, S04, S05, S06, S07, S09 (and S03's datum, which
 *     takes the rule alone because `AssetClassBento` brings its own heading —
 *     wrapping it in `SectionA` would render two h2s for one section)
 *   · H-B `SectionB` → S01 only (its load-bearing claim IS a cited finding)
 *   · H-C `SectionC` → S08 only (reference-matrix shape)
 *   · H-D            → S10, inside `IntakeCta`
 *
 * BALANCE GROUPS ON THIS ROUTE, and their governing thresholds — each taken
 * from the rule that governs that group, never one flat number:
 *   · `hero-panes`           Pattern 1        shorter ≥ 67%
 *   · `sector-reality-head`  site-wide 2x     ≥ 50%
 *   · `risk-register`        site-wide 2x     ≥ 50%, stated exception recorded
 *   · `worked-example-gates` site-wide 2x     ≥ 50%
 * S02, S03, S05, S07, S08 and S09 carry no group, and each states why in its
 * own component: a single drawing; a bento whose spans are unequal by
 * construction; a nav-shaped key row; a definition list; a table; a linear
 * sequence. None of them is a pair of siblings whose heights mean anything.
 *
 * IMAGERY: `imageryWarranted: false`. No shipped asset under `public/images`
 * depicts water treatment, and every slot on this page is already spoken for by
 * a drawing the brief either mandates (the hero interactive, L41) or the
 * mapping table routes to a custom diagram. Generating one would be a
 * fabricated depiction standing beside real sector claims. Flip condition: an
 * owner-approved real water-facility photograph, or an explicit owner decision
 * on imagery rollout — then the S10 compositional slot is the first candidate.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual` with
 * `nl` a same-as-English placeholder pending translation, per registry.ts.
 */

export async function generateMetadata(
  props: PageProps<"/[locale]/industries/water-wastewater-2">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/water-wastewater-2`)
  };
}

export default async function WaterWastewaterIterationTwoPage(
  props: PageProps<"/[locale]/industries/water-wastewater-2">
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

      {/* S00 — Pattern 1, Consequence Cascade Hero */}
      <WaterHero locale={locale} />

      {/* S01 — H-B, the only cited-evidence-shaped section on the page */}
      <SectorReality locale={locale} />

      {/* S02 — custom drawn long-section + technology tag clusters */}
      <SectionA
        id="architecture"
        index="02"
        datumLabel={same("Architecture")}
        heading={ARCHITECTURE.h2}
        lead={ARCHITECTURE.lead}
        locale={locale}
      >
        <ProcessLongSection locale={locale} />
        <TechnologyIndex locale={locale} />
      </SectionA>

      {/* S03 — Pattern 3, via the real shared `AssetClassBento`. That component
          brings its own <section> and h2, so this takes the datum rule alone;
          wrapping it in `SectionA` would render two headings for one section.
          Its internal `mt-20` is pulled back to the page's standard
          datum-to-heading gap rather than left to open a second rhythm. */}
      <div className="pt-16 sm:pt-24">
        <Datum index="03" label={same("Asset classes")} locale={locale} />
        <div className="-mt-10">
          <SystemAssets locale={locale} />
        </div>
      </div>

      {/* S04 — custom pathway-trace register */}
      <SectionA
        id="scenarios"
        index="04"
        datumLabel={same("Risk scenarios")}
        heading={SCENARIOS.h2}
        lead={SCENARIOS.lead}
        locale={locale}
      >
        <ScenarioRegister locale={locale} />
      </SectionA>

      {/* S05 — Foundation Deliverable 2 switchboard */}
      <SectionA
        id="decisions"
        index="05"
        datumLabel={same("Four decisions")}
        heading={DECISIONS.h2}
        lead={DECISIONS.lead}
        locale={locale}
      >
        <DecisionSwitchboard locale={locale} />
      </SectionA>

      {/* S06 — Pattern 2, Three-Gate Ledger */}
      <SectionA
        id="worked-example"
        index="06"
        datumLabel={same("Worked example")}
        heading={WORKED_EXAMPLE.h2}
        locale={locale}
      >
        <ThreeGateLedger locale={locale} />
      </SectionA>

      {/* S07 — the page's one editorial-schedule-shaped section, 1/9 = 11% */}
      <SectionA
        id="capabilities"
        index="07"
        datumLabel={same("Capabilities")}
        heading={CAPABILITIES.h2}
        lead={CAPABILITIES.lead}
        locale={locale}
      >
        <Capabilities locale={locale} />
      </SectionA>

      {/* S08 — H-C, static reference matrix */}
      <SectionC
        id="regulatory"
        index="08"
        datumLabel={same("Regulatory context")}
        heading={REGULATORY.h2}
        lead={REGULATORY.lead}
        caption={REGULATORY.tableCaption}
        locale={locale}
      >
        <Regulatory locale={locale} />
      </SectionC>

      {/* S09 — Pattern 6, Zone Sequencer */}
      <SectionA
        id="engagement"
        index="09"
        datumLabel={same("Engagement")}
        heading={ENGAGEMENT.h2}
        lead={ENGAGEMENT.lead}
        locale={locale}
      >
        <Engagement locale={locale} />
      </SectionA>

      {/* S10 — closing datum, final CTA, and the real intake block */}
      <IntakeCta locale={locale} />

      <div className="mt-20">
        <ThreeDoors locale={locale} t={d.doors} />
      </div>
    </div>
  );
}
