import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/decisions/investment/content";
import { InvestmentHero } from "@/components/decisions/investment/InvestmentHero";
import { InvestmentCurve } from "@/components/decisions/investment/InvestmentCurve";
import { InvestmentTail } from "@/components/decisions/investment/InvestmentTail";
import { InvestmentAnatomy } from "@/components/decisions/investment/InvestmentAnatomy";
import { InvestmentOutputs } from "@/components/decisions/investment/InvestmentOutputs";
import { InvestmentClose } from "@/components/decisions/investment/InvestmentClose";

export async function generateMetadata(props: PageProps<"/[locale]/decisions/investment">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, "/decisions/investment")
  };
}

/**
 * /decisions/investment — "What should we spend?", the second of the Four
 * Decisions specified in new_material_source/1_website_layout_v4/
 * OXOT_Visual_Foundation_Spec.md §6. The detailed form of the switchboard
 * entry /cdt-2 already carries in abbreviated form.
 *
 * COMPOSITION — "the curve, then the tail". The page is built around two
 * real inline SVG figures rather than a repeating section template, because
 * the content-to-visual mapping table maps this decision to a
 * "Risk-reduction curve" and explicitly names "Generic ROI icon" as the
 * thing to avoid. The first figure carries the diminishing-returns argument
 * (cumulative curve above, per-tranche marginal bars below, ridge marked at
 * the geometry's own inflection); the second carries the fat-tail argument
 * (a lognormal density with mode and mean as separate marks). Neither has a
 * number anywhere on it, and both say in their own captions that they are
 * illustrative shapes rather than modelled results. Nothing on the page is
 * interactive or pretends to be — no toggles, no scrubbers, no hover
 * readouts.
 *
 * The sections between and after the figures deliberately change shape each
 * time — figure-then-ledger, prose-then-figure-then-band, a step line, ruled
 * rows, a marked list — rather than reusing one card grid, per the standing
 * instruction against a cookie-cutter layout across sibling pages.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual`
 * (src/i18n/bilingual.ts) with `nl` a same-as-English placeholder pending
 * translation, matching the industry and assurance-framework pages. The
 * page links only to /contact and /cdt-2, which both render in both
 * locales; the EN-only /assurance and /technical-specification are not
 * linked from here.
 *
 * NAV IS UNTOUCHED. /decisions is not in PATHS or primaryNav yet — the
 * other three decision pages do not all exist, and a nav entry pointing at
 * a mostly-unbuilt section is worse than no entry. The path is written out
 * literally in the one place it is needed (localeAlternates above); move it
 * into PATHS when the section is whole.
 */
export default async function InvestmentDecisionPage(props: PageProps<"/[locale]/decisions/investment">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb here="What should we spend?" homeHref={localePath(locale, PATHS.home)} label={d.nav.breadcrumb} />

      <InvestmentHero locale={locale} />
      <InvestmentCurve locale={locale} />
      <InvestmentTail locale={locale} />
      <InvestmentAnatomy locale={locale} />
      <InvestmentOutputs locale={locale} />
      <InvestmentClose locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
