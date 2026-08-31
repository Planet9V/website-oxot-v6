import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/assurance/cyber-resilience-act/content";
import { CraMasthead } from "@/components/assurance/cyber-resilience-act/CraMasthead";
import { CraScope } from "@/components/assurance/cyber-resilience-act/CraScope";
import { CraCalendar } from "@/components/assurance/cyber-resilience-act/CraCalendar";
import { CraReporting } from "@/components/assurance/cyber-resilience-act/CraReporting";
import { CraEvidence } from "@/components/assurance/cyber-resilience-act/CraEvidence";
import { CraProduct } from "@/components/assurance/cyber-resilience-act/CraProduct";
import { CraVulnerability } from "@/components/assurance/cyber-resilience-act/CraVulnerability";
import { CraTechnicalFile } from "@/components/assurance/cyber-resilience-act/CraTechnicalFile";
import { CraSupplyChain } from "@/components/assurance/cyber-resilience-act/CraSupplyChain";
import { CraClose } from "@/components/assurance/cyber-resilience-act/CraClose";

export async function generateMetadata(
  props: PageProps<"/[locale]/assurance/cyber-resilience-act">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.assurance}/cyber-resilience-act`)
  };
}

/**
 * /assurance/cyber-resilience-act — a NEW page, written from
 * new_material_source/1_website_layout_v4/4_assurance/assurance_cra.md and
 * assurance_cra_support_cdt_docs.md. It is deliberately not a revival of the
 * CRA product line de-published on 2026-08-21; none of that material was
 * recovered or reused, and this page makes no conformity-app claim.
 *
 * COMPOSITION — OXOT_Composition_Rules.md, "Assurance pages": *editorial /
 * technical reading experience; diagrams, tables, requirements traces; no
 * sales-style dashboard blocks.* So this is built as a document, not a
 * landing page: a masthead with a real contents list, twelve numbered
 * sections separated by rules, nine data tables, two static SVG diagrams,
 * three requirements traces, and exactly one ask, at the end. There is no
 * hero image, no stat row, no metric tile, no card grid of benefits and no
 * BorderBeam/BlurFade motion — every one of which appears elsewhere on this
 * site and every one of which the composition rule excludes here.
 *
 * DATES — every dated claim comes from docs/reference/CRA-DATES.md, the
 * repo's single source for them. Section 03 deliberately CONTRADICTS the
 * source spec, which states Article 14 as one three-step sequence; Article
 * 14 carries two tracks and four notifications with final-report clocks that
 * start from different events. `scripts/content-guards.mjs` guards both that
 * and the rule that a future obligation is never written as already in
 * force.
 *
 * DIAGRAMS — both are real inline SVG that draw the structure they describe
 * (the milestone sequence; the product boundary and the seven dependency
 * classes crossing it), both are captioned as static, and neither claims
 * interactivity. The calendar's applies-now/ahead state is derived from the
 * ISO dates at render rather than written into the copy, so it cannot go
 * quietly stale.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual`
 * (src/i18n/bilingual.ts) with `nl` a same-as-English placeholder pending
 * translation, the same convention as the industry pages.
 *
 * Not registered in primaryNav — nav.ts is owned elsewhere and untouched.
 */
export default async function CyberResilienceActPage(
  props: PageProps<"/[locale]/assurance/cyber-resilience-act">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      {/* THE ASSURANCE CRUMB IS EN-ONLY, because the page it points at is.
          /assurance still carries a `locale !== "en"` guard, so linking it
          from a Dutch page sends the reader to a 404 — which
          scripts/measure.mjs counts as a dead link, and which is a worse
          breadcrumb than a shorter one. When /assurance renders in both
          locales this condition should go and the crumb become
          unconditional. */}
      <Breadcrumb
        here="Cyber Resilience Act"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={
          locale === "en" ? [{ href: localePath(locale, PATHS.assurance), label: "Assurance" }] : []
        }
      />

      <CraMasthead locale={locale} />
      <CraScope locale={locale} />
      <CraCalendar locale={locale} />
      <CraReporting locale={locale} />
      <CraEvidence locale={locale} />
      <CraProduct locale={locale} />
      <CraVulnerability locale={locale} />
      <CraTechnicalFile locale={locale} />
      <CraSupplyChain locale={locale} />
      <CraClose locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
