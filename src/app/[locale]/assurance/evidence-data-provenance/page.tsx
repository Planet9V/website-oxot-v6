import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/assurance/evidence-data-provenance/content";
import { ProvenanceHero } from "@/components/assurance/evidence-data-provenance/ProvenanceHero";
import { WhyProvenance } from "@/components/assurance/evidence-data-provenance/WhyProvenance";
import { EvidenceModel } from "@/components/assurance/evidence-data-provenance/EvidenceModel";
import { EvidencePrinciples } from "@/components/assurance/evidence-data-provenance/EvidencePrinciples";
import { EvidenceSources } from "@/components/assurance/evidence-data-provenance/EvidenceSources";
import { SourceConfidence } from "@/components/assurance/evidence-data-provenance/SourceConfidence";
import { EvidenceTypes } from "@/components/assurance/evidence-data-provenance/EvidenceTypes";
import { DrillableCalculations } from "@/components/assurance/evidence-data-provenance/DrillableCalculations";
import { ChangeDeltas } from "@/components/assurance/evidence-data-provenance/ChangeDeltas";
import { FrameworkProvenance } from "@/components/assurance/evidence-data-provenance/FrameworkProvenance";
import { HumanAccountability } from "@/components/assurance/evidence-data-provenance/HumanAccountability";
import { DataSovereignty } from "@/components/assurance/evidence-data-provenance/DataSovereignty";
import { NotClaimed } from "@/components/assurance/evidence-data-provenance/NotClaimed";
import { ProvenanceCta } from "@/components/assurance/evidence-data-provenance/ProvenanceCta";

export async function generateMetadata(
  props: PageProps<"/[locale]/assurance/evidence-data-provenance">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.assurance}/evidence-data-provenance`)
  };
}

/**
 * /assurance/evidence-data-provenance — content transcribed from
 * new_material_source/1_website_layout_v4/4_assurance/
 * assurance_evidence_data_provenance.md.
 *
 * THE ODD ONE OUT AMONG THE FIVE ASSURANCE PAGES, deliberately. The other
 * four each describe an external regime with its own scope, dates and
 * obligations. This one describes a cross-cutting OXOT capability — how
 * evidence for any of those four is sourced, typed, drilled and kept
 * current. So it takes no position on conformity, carries no compliance
 * timeline, and its framework section routes OUT to the four regime pages
 * instead of restating them.
 *
 * DESIGN DIRECTION: "THE CHAIN". OXOT_content-to-visual-mapping-table.md
 * names this exact content type and its treatment — "Evidence provenance
 * → Drill-down evidence chain", avoid "'Trusted' badge" — so the page's
 * one repeated visual is a drawn chain (EvidenceChain.tsx: real inline
 * SVG connectors, token colours only) used five times in four different
 * senses: forward from source to decision, backward from board figure to
 * artifact, downward through the evidence-gap ladder to a visibly empty
 * "null" rung, and again for the change pipeline. There is no badge, no
 * seal, no checkmark and no trust score anywhere on the page: showing the
 * links IS the argument, and asserting trustworthiness would undercut it.
 *
 * Everything else is deliberately plain editorial furniture — prose,
 * numbered lists, a decision-record tree, and seven reference tables —
 * per OXOT_Composition_Rules.md's Assurance rule: "Editorial/technical
 * reading experience. Diagrams, tables, requirements traces. No
 * sales-style dashboard blocks."
 *
 * NOTHING CLAIMS INTERACTIVITY IT DOES NOT HAVE. The page is entirely
 * server-rendered; the only thing that moves is the pair of worked
 * drill-downs in DrillableCalculations.tsx, which are native <details>
 * elements that genuinely expand without JavaScript. No component here
 * advertises a live model, a real-time trace or a viewer it does not
 * implement.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual`
 * (src/i18n/bilingual.ts) with `nl` a same-as-English placeholder pending
 * translation, the convention the industry pages set.
 *
 * Nav registration (src/components/shell/nav.ts) is handled separately.
 */
export default async function EvidenceDataProvenancePage(
  props: PageProps<"/[locale]/assurance/evidence-data-provenance">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Evidence & Data Provenance"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        /* /assurance (the section index) is EN-only — an NL reader must not
           get a breadcrumb crumb that 404s. Reversible: once /assurance is
           bilingual, drop the ternary and always include the crumb. */
        trail={
          locale === "en"
            ? [{ href: localePath("en", PATHS.assurance), label: "Assurance" }]
            : []
        }
      />

      <ProvenanceHero locale={locale} />
      <WhyProvenance locale={locale} />
      <EvidenceModel locale={locale} />
      <EvidencePrinciples locale={locale} />
      <EvidenceSources locale={locale} />
      <SourceConfidence locale={locale} />
      <EvidenceTypes locale={locale} />
      <DrillableCalculations locale={locale} />
      <ChangeDeltas locale={locale} />
      <FrameworkProvenance locale={locale} />
      <HumanAccountability locale={locale} />
      <DataSovereignty locale={locale} />
      <NotClaimed locale={locale} />
      <ProvenanceCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
