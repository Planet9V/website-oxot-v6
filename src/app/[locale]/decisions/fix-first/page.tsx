import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pick } from "@/i18n/bilingual";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { BREADCRUMB, META } from "@/components/decisions/fix-first/content";
import { FixFirstHero } from "@/components/decisions/fix-first/FixFirstHero";
import { RankingLogic } from "@/components/decisions/fix-first/RankingLogic";
import { TriageBoard } from "@/components/decisions/fix-first/TriageBoard";
import { ReachabilityTrace } from "@/components/decisions/fix-first/ReachabilityTrace";
import { EvidenceAndOutput } from "@/components/decisions/fix-first/EvidenceAndOutput";
import { RolesAndCta } from "@/components/decisions/fix-first/RolesAndCta";

/** Locale-free, like every path in nav.ts. Not registered in PATHS — that
 *  file belongs to the integration owner, and route registration for the
 *  four /decisions pages is handled there separately. */
const PATH = "/decisions/fix-first";

export async function generateMetadata(
  props: PageProps<"/[locale]/decisions/fix-first">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, PATH)
  };
}

/**
 * /decisions/fix-first — Decision 01 of the Four Decisions, in the
 * "detailed form" OXOT_Visual_Foundation_Spec.md §6 calls for: the
 * switchboard is used abbreviated on Home and on /cdt-2, and in full on
 * its own page. This is that page for "What do we fix first?".
 *
 * COMPOSITION: THE BOARD IS THE SPINE, AND THE PAGE ARGUES TOWARDS IT
 * AND THEN BEHIND IT. The hero states the decision beside a spec sheet
 * of the whole switchboard panel (question → evidence → model action →
 * output → roles), so the reader has the shape before scrolling. Then
 * one section of argument — why a severity score ranks the vulnerability
 * and not the plant, set as a five-row ledger against score-led triage.
 * Then the board itself: three real columns, NOW / NEXT / ACCEPTED, each
 * finding printing the traced route and the named consequence that place
 * it there. Only after the output does the page explain the mechanism —
 * the four-stage reachability trace — and then the inputs and outputs
 * side by side, closing on the three roles and the ask. Deliberately not
 * the industry pages' shape (no card grid, no sector model, no brand
 * illustration) and deliberately not the assurance pages' shape (no
 * contents rail, no numbered clauses): this is a decision page, and its
 * one memorable object is the board.
 *
 * NOT A TRAFFIC LIGHT. OXOT_content-to-visual-mapping-table.md maps risk
 * prioritization to a "NOW / NEXT / deferred board" and names "traffic-
 * light score alone" as the thing to avoid, so the three bands are
 * distinguished by rule weight, heading colour and a dashed frame on the
 * third — never by red/amber/green, and there is no score widget on the
 * page at all.
 *
 * THE THIRD BAND IS "ACCEPTED", NOT THE INTERNAL SHORTHAND. /cdt-2's
 * abbreviated version records the owner-reviewed reason (its own
 * content-1.ts, DECISION_01) — a public page for a regulated, safety-
 * conscious buyer states "Accepted / deferred under controlled
 * conditions" and the review condition, not an absolute.
 *
 * NOTHING CLAIMS TO BE INTERACTIVE. There is no tab strip, no filter, no
 * drag target and no animated route beam; the two places a reader might
 * expect live behaviour — the switchboard panel and the trace — each
 * carry a note saying they are static. Every scenario on the board is
 * labelled "Illustrative scenario — no customer data" per the Visual
 * Foundation Spec's claim boundaries, and no counts, scores, currency
 * values or percentages appear anywhere on the page.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is
 * `Bilingual` with `nl` a same-as-English placeholder pending
 * translation, the convention documented in
 * src/components/industries/registry.ts. The one outbound link that
 * could have been locale-unsafe, /assurance/iec-62443, is one of the
 * five bilingual framework pages, so it needs no guard either.
 *
 * NO BREADCRUMB TRAIL CRUMB. A /decisions overview page does not exist
 * yet; pointing a crumb at it would teach the reader a structure the
 * site does not have and land them on a 404.
 */
export default async function FixFirstPage(props: PageProps<"/[locale]/decisions/fix-first">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={pick(BREADCRUMB.here, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
      />

      <FixFirstHero locale={locale} />
      <RankingLogic locale={locale} />
      <TriageBoard locale={locale} />
      <ReachabilityTrace locale={locale} />
      <EvidenceAndOutput locale={locale} />
      <RolesAndCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
