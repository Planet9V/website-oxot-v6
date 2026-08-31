import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/decisions/risk-acceptance/content";
import { AcceptanceHero } from "@/components/decisions/risk-acceptance/AcceptanceHero";
import { TriageOrigin } from "@/components/decisions/risk-acceptance/TriageOrigin";
import { SeverityVsRisk } from "@/components/decisions/risk-acceptance/SeverityVsRisk";
import { ExceptionRecord } from "@/components/decisions/risk-acceptance/ExceptionRecord";
import { EvidenceTrace } from "@/components/decisions/risk-acceptance/EvidenceTrace";
import { SurvivesScrutiny } from "@/components/decisions/risk-acceptance/SurvivesScrutiny";
import { Boundaries } from "@/components/decisions/risk-acceptance/Boundaries";
import { AcceptanceCta } from "@/components/decisions/risk-acceptance/AcceptanceCta";

const PATH = "/decisions/risk-acceptance";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, PATH)
  };
}

/**
 * /decisions/risk-acceptance — the fourth of the Four Decisions.
 *
 * PUBLIC FRAMING IS "ACCEPT OR DEFER". The sitemap's working title for
 * this page is "What Can We Leave Alone?" and the internal triage
 * shorthand on /cdt-2 is blunter still; neither is used here. The Visual
 * Foundation Spec's rules for this deliverable are explicit — do not call
 * the fourth category by that shorthand publicly, use "Accept or defer",
 * and state review conditions — because a regulated rail, water, energy
 * or government buyer reads an absolute as a claim rather than a
 * judgement. Every reference on this page is "accepted or deferred under
 * controlled conditions", with the conditions written out.
 *
 * COMPOSITION: THE DOCUMENT. The other Four Decisions pages argue about a
 * model; this one argues about an artefact, so the page is shaped like
 * the artefact. The hero opens on a record header rather than on a claim.
 * The middle of the page is a full risk-acceptance record — a header
 * block, then numbered field rows in a label gutter, each with its value,
 * the reason the field exists, and the evidence it rests on — and the
 * sections either side are ruled field lists too (a severity-versus-
 * record ledger, a claim-boundary list) rather than card grids. The one
 * card grid on the page, the three challenges the record has to survive,
 * exists to break that rhythm at the point where the argument stops being
 * about the document and starts being about people.
 *
 * The signature visual is deliberately NOT a badge, seal or checkmark:
 * the content-to-visual mapping table pairs evidence provenance with a
 * drill-down evidence chain and names the "Trusted" badge as the
 * anti-pattern. The record IS the visual, and EvidenceTrace drills one of
 * its fields back to a named owner.
 *
 * NOTHING HERE IS INTERACTIVE, and the page says so. Every component is a
 * server component with no state and no client boundary; the record is
 * labelled an illustration on the page, not only in a comment.
 *
 * THE RECORD IS SYNTHETIC — invented asset tag, invented finding,
 * invented dates. The banner inside the document frame states that, so it
 * cannot be read as a real customer's accepted risk.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is
 * `Bilingual` (src/i18n/bilingual.ts) with `nl` a same-as-English
 * placeholder pending translation, the same convention as the industry
 * pages and the five /assurance framework children. The three onward
 * links all point at pages that render in both locales, so none needs a
 * locale guard.
 *
 * Not in primaryNav — nav.ts is not touched by this page.
 */
export default async function RiskAcceptancePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb here="Accept or defer" homeHref={localePath(locale, PATHS.home)} label={d.nav.breadcrumb} />

      <AcceptanceHero locale={locale} />
      <TriageOrigin locale={locale} />
      <SeverityVsRisk locale={locale} />
      <ExceptionRecord locale={locale} />
      <EvidenceTrace locale={locale} />
      <SurvivesScrutiny locale={locale} />
      <Boundaries locale={locale} />
      <AcceptanceCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
