import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/industries/manufacturing-process/content";
import { ManuHero } from "@/components/industries/manufacturing-process/ManuHero";
import { ManuConcerns } from "@/components/industries/manufacturing-process/ManuConcerns";
import { ManuArchitecture } from "@/components/industries/manufacturing-process/ManuArchitecture";
import { ManuScenarios } from "@/components/industries/manufacturing-process/ManuScenarios";
import { ManuDecisions } from "@/components/industries/manufacturing-process/ManuDecisions";
import { ManuWorkedExample } from "@/components/industries/manufacturing-process/ManuWorkedExample";
import { ManuCapabilities } from "@/components/industries/manufacturing-process/ManuCapabilities";
import { ManuRegulatory } from "@/components/industries/manufacturing-process/ManuRegulatory";
import { ManuEngagement } from "@/components/industries/manufacturing-process/ManuEngagement";
import { ManuFinalCta } from "@/components/industries/manufacturing-process/ManuFinalCta";

export async function generateMetadata(props: PageProps<"/[locale]/industries/manufacturing-process">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/manufacturing-process`)
  };
}

/**
 * /industries/manufacturing-process — same phase of the new_material_source/
 * 1_website_layout_v4 implementation as /industries/energy-utilities.
 * Content transcribed from new_material_source/1_website_layout_v4/
 * 3_industries/industry_manu-process.md, which is finished, ready-to-use
 * copy — see content.ts's own doc comment for what was restructured vs.
 * kept verbatim, and for the source file's duplicated "Operational
 * concerns" table (used once, not twice).
 *
 * REAL, THEME-REACTIVE PAGE (oxot-canvas, real border-border/bg-card/
 * text-muted-foreground tokens, real shadcn/ui components), same
 * conventions as /industries/energy-utilities, /assurance and
 * /technical-specification — not a fixed-dark comparison build.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual`
 * (src/i18n/bilingual.ts) with `nl` a same-as-English placeholder pending
 * translation. See registry.ts's `same()` helper.
 *
 * DESIGN DIRECTION: "assembly line / technical drawing" (owner brief,
 * 2026-08-22) — deliberately NOT energy-utilities' single-line-diagram
 * motif (EnergyLine.tsx). This page's own signature is a heavy, stamped
 * station line (ManuStationLine.tsx: thick bar, numbered bordered squares,
 * not a thin hairline with small dots) plus a repeated technical-drawing
 * corner-bracket device (ManuCornerFrame.tsx) applied to cards and figures
 * throughout, and oversized serif numerals wherever a stage/step is
 * counted (ManuDecisions.tsx in particular). Section-to-section variation:
 * illustrated vertical process-line + static four-view badges (hero) ->
 * corner-bracketed card grid (concerns) -> heavy vertical station riser
 * (architecture) -> dense always-open spec-card grid, not an accordion
 * (scenarios) -> four large corner-bracketed panels with giant watermark
 * numerals (decisions) -> mixed narrative/station-chain/table (worked
 * example) -> oversized numbered spec rows (capabilities) -> corner-
 * bracketed data table (regulatory) -> three stamped hand-off panels
 * (engagement).
 *
 * Not in primaryNav yet — same reasoning as energy-utilities' own doc
 * comment.
 */
export default async function ManufacturingProcessPage(
  props: PageProps<"/[locale]/industries/manufacturing-process">
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

      <ManuHero locale={locale} />
      <ManuConcerns locale={locale} />
      <ManuArchitecture locale={locale} />
      <ManuScenarios locale={locale} />
      <ManuDecisions locale={locale} />
      <ManuWorkedExample locale={locale} />
      <ManuCapabilities locale={locale} />
      <ManuRegulatory locale={locale} />
      <ManuEngagement locale={locale} />
      <ManuFinalCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
