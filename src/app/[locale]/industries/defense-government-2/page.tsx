import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { HERO, META } from "@/components/industries/defense-government-2/content";
import { DefenseHero } from "@/components/industries/defense-government-2/DefenseHero";
import { Sovereignty } from "@/components/industries/defense-government-2/Sovereignty";
import { Scope } from "@/components/industries/defense-government-2/Scope";
import { Architecture } from "@/components/industries/defense-government-2/Architecture";
import { Scenarios } from "@/components/industries/defense-government-2/Scenarios";
import { DecisionLedger } from "@/components/industries/defense-government-2/DecisionLedger";
import { WorkedExample } from "@/components/industries/defense-government-2/WorkedExample";
import { AirGap } from "@/components/industries/defense-government-2/AirGap";
import { CaseFileIndex } from "@/components/industries/defense-government-2/CaseFileIndex";
import { Capabilities } from "@/components/industries/defense-government-2/Capabilities";
import { Regulatory } from "@/components/industries/defense-government-2/Regulatory";
import { Engagement } from "@/components/industries/defense-government-2/Engagement";
import { FinalCta } from "@/components/industries/defense-government-2/FinalCta";

export async function generateMetadata(
  props: PageProps<"/[locale]/industries/defense-government-2">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/defense-government-2`)
  };
}

/**
 * /industries/defense-government-2 — a review-only iteration standing beside
 * the live `/industries/defense-government` page, built from
 * `new_material_source/1_website_layout_v4/` (Visual Foundation Spec, Layout
 * Styles, Composition Rules, Mobile Rules, Component Inventory) plus
 * `3_industries/industry_defense_airgap.md`. NOTHING here imports from the live
 * page's folder and nothing in that folder is modified. Matching every other
 * `-2` route, this one is deliberately NOT wired into `primaryNav`.
 *
 * SECTION ORDER, AND WHERE THE ORDINALS COME FROM. `Rule.tsx`'s `Datum` prints
 * each section's ORDINAL ON THE PAGE — a real fact about the page rather than
 * zone data — so the numbering is a property of this file's ordering, not of
 * any one component:
 *
 *   00  hero (no datum; the run opens at S01)
 *   01  Sovereignty        05  DecisionLedger     09  Capabilities
 *   02  Scope              06  WorkedExample      10  Regulatory
 *   03  Architecture       07  AirGap             11  Engagement
 *   04  Scenarios          08  CaseFileIndex      12  FinalCta
 *
 * THREE SECTIONS TAKE THEIR ORDINAL AS A PROP, AND THAT IS WHY. `DecisionLedger`,
 * `WorkedExample` and `CaseFileIndex` were each written against a provisional
 * order and default to `06`, `07` and `09`; each documents `index` as "a prop
 * with a documented default … because the page's final section order is
 * assembled in the route file, not here." This is that route file, so it passes
 * `05`, `06` and `08` explicitly rather than letting three defaults disagree
 * with the run they sit in. The other nine sections carry their ordinal
 * internally, because nothing about their position was ever in question.
 *
 * EVERY SECTION SELF-WRAPS ITS OWN HEADER RECIPE from `Rule.tsx` — `SectionA`
 * (H-A), `SectionB` (H-B, the claim-boundary strip) or `SectionC` (H-C, the
 * reference-matrix shape) — except `FinalCta`, which is the H-D closing recipe
 * and consumes the bare `Datum` directly. So this file renders every section
 * BARE, in order, with no extra wrapper of its own.
 *
 * THE CLAIM BOUNDARIES ALL RENDER IN THE SAME PLACE, through the same H-B
 * strip: above the body each one conditions, at reading size, in full-strength
 * text, behind a dashed rule. `SCOPE.boundary` (what OXOT does NOT model —
 * weapons systems, classified battle-management systems, intelligence
 * operations), `ARCHITECTURE.viewsNote` (synthetic and notional only),
 * `WORKED_EXAMPLE.tag` (illustrative, no classified or operational data) and
 * `AIR_GAP.caveat` (air-gapped is not automatically risk-free). `FinalCta`
 * carries the same dashed marking on `FINAL_CTA.body`, whose closing sentence
 * is the one instruction on this page governing what a reader may SEND: no
 * classified, operationally sensitive, or personally identifiable information
 * in an enquiry. None of these is a footnote and none may be demoted to one.
 *
 * NO CLASSIFICATION MARKING APPEARS ANYWHERE ON THIS PAGE and none may be
 * added — no "SECRET", no "NOFORN", no "OFFICIAL-SENSITIVE", no banner strip,
 * no colour-coded classification bar. Inventing a real-looking marking on a
 * public marketing page would be a fabricated security fact, and the marking
 * system it imitates is a legal one. `Rule.tsx`'s docblock states this at
 * length for the page's own drawing; it binds every section equally.
 *
 * THE GLOBAL ContactBand STILL RENDERS ON THIS ROUTE. The sibling `-2` pages
 * suppress it via `SUPPRESS_CONTACT_BAND` in `src/components/shell/nav.ts`
 * because each carries a full page-local intake FORM. This page deliberately
 * carries none — `content.ts` records that a bespoke form here would invite
 * exactly the enquiry content `FINAL_CTA.body` tells the visitor not to send —
 * so the site's shared contact mechanism is the right closer, and `nav.ts` is
 * untouched by this build.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard, the standing convention for
 * Industries pages. Content is `Bilingual` throughout with `nl` a
 * same-as-English placeholder pending translation. The one locale-sensitive
 * destination on the page is the regulatory matrix's NIS2 row, which gates
 * itself from its own `englishOnly` flag; every other link resolves in both
 * languages.
 *
 * THE BREADCRUMB'S CURRENT-PAGE LABEL IS `HERO.eyebrow`, not a hardcoded
 * string: it is the brief's own bolded name for this vertical, it is already
 * `Bilingual`, and reading it here means the crumb and the hero can never
 * disagree about what this page is called.
 */
export default async function DefenseGovernment2Page(
  props: PageProps<"/[locale]/industries/defense-government-2">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={pick(HERO.eyebrow, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.industries), label: "Industries" }]}
      />

      <DefenseHero locale={locale} />
      <Sovereignty locale={locale} />
      <Scope locale={locale} />
      <Architecture locale={locale} />
      <Scenarios locale={locale} />
      <DecisionLedger locale={locale} index="05" />
      <WorkedExample locale={locale} index="06" />
      <AirGap locale={locale} />
      <CaseFileIndex locale={locale} index="08" />
      <Capabilities locale={locale} />
      <Regulatory locale={locale} />
      <Engagement locale={locale} />
      <FinalCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
