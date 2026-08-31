import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pick } from "@/i18n/bilingual";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { BREADCRUMB, META } from "@/components/decisions/change-safely/content";
import { ChangeHero, ChangeProblem, ChangeScenario } from "@/components/decisions/change-safely/ChangeIntro";
import { RouteComparison } from "@/components/decisions/change-safely/RouteComparison";
import {
  ChangeAuthority,
  ChangeCta,
  ChangePanels,
  ChangeScope
} from "@/components/decisions/change-safely/ChangeRecord";

/** Locale-free, like every path in nav.ts. Not registered in PATHS — that
 *  file belongs to the integration owner, and route registration for the
 *  four /decisions pages is handled there separately. */
const PATH = "/decisions/change-safely";

export async function generateMetadata(
  props: PageProps<"/[locale]/decisions/change-safely">
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
 * /decisions/change-safely — Decision 03 of the Four Decisions in the
 * "detailed form" OXOT_Visual_Foundation_Spec.md §6 calls for, and at the
 * same time Deliverable 3 of that spec, "Baseline vs. Virtual Control"
 * (§7) — the most closely specified of the four, down to the scenario text
 * and the three information panels.
 *
 * DESIGN DIRECTION: "TWO STATES OF ONE THING." Every sibling decision page
 * gets its own composition rather than a shared template, and this page's
 * organising idea comes straight from what it has to prove: a change is
 * made in the model, and the model is then read against its own baseline.
 * So the page is built as a diptych. The hero states the claim once; the
 * scenario is set as a four-field record; the centrepiece is one route
 * graph drawn twice at identical coordinates (RouteDiagram.tsx owns the
 * geometry, so the two panels cannot drift apart) with a route-state table
 * naming what moved between them; the three §7 panels then repeat the same
 * three semantic colours the drawings used, so baseline / control /
 * decision output read as states rather than as feature cards.
 *
 * WHY A DIAGRAM AND NOT A TICK-LIST. OXOT_content-to-visual-mapping-table
 * .md maps "Proposed control" to a "Before/after route comparison" and
 * names "Checkmark list" as the thing to avoid. There is no checkmark
 * anywhere on this page, including in the authority section, which uses a
 * ruled list instead.
 *
 * CLAIM DISCIPLINE — the reason this page is the riskiest of the four.
 * Every scenario block carries "Illustrative scenario — no customer data".
 * Both drawings are static server-rendered SVG with no toggle, no client
 * boundary and no animation, and the page says so in plain text beside
 * them: nothing here runs a simulation. Green means a modelled closure and
 * the copy repeats that this is not a real-world guarantee. No percentage,
 * monetary value or loss figure appears anywhere. The authority section
 * states that OXOT supports but does not replace engineering approval,
 * safety assessment, operational authority or return-to-service authority.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual`
 * with `nl` a same-as-English placeholder pending translation, the same
 * convention as the sibling decision pages and the industry pages. The one
 * EN-only destination this page would otherwise link
 * (/technical-specification) is guarded in ChangeRecord.tsx's ChangeCta.
 */
export default async function ChangeSafelyPage(props: PageProps<"/[locale]/decisions/change-safely">) {
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

      <ChangeHero locale={locale} />
      <ChangeProblem locale={locale} />
      <ChangeScenario locale={locale} />
      <RouteComparison locale={locale} />
      <ChangePanels locale={locale} />
      <ChangeScope locale={locale} />
      <ChangeAuthority locale={locale} />
      <ChangeCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
