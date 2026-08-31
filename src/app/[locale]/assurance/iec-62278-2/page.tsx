import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/assurance/iec-62278-2/content";
import { Masthead } from "@/components/assurance/iec-62278-2/Masthead";
import { Foundations } from "@/components/assurance/iec-62278-2/Foundations";
import { Analysis } from "@/components/assurance/iec-62278-2/Analysis";
import { Demonstration } from "@/components/assurance/iec-62278-2/Demonstration";
import { Closing } from "@/components/assurance/iec-62278-2/Closing";

export async function generateMetadata(props: PageProps<"/[locale]/assurance/iec-62278-2">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.assurance}/iec-62278-2`)
  };
}

/**
 * /assurance/iec-62278-2 — the railway systems approach to safety, and how
 * a cyber pathway becomes part of a safety argument rather than a parallel
 * conversation beside one.
 *
 * NAMING, CORRECTED 2026-08-23. This page previously shipped as
 * "iec-62278-1", on an earlier builder's claim that the source material's
 * own "IEC 62278-2:2025" designation was a typo. It was not: `site-tree.md`
 * (the owner's own corrected sitemap) explicitly lists "IEC 62278-2:2025",
 * and the source file's own body text is unambiguously Part 2 subject
 * matter (hazard analysis, safety requirements, requirement allocation —
 * not the Part 1 lifecycle/management process). The earlier "correction"
 * had it backwards; this page, its content, and every cross-reference to it
 * site-wide (nav.ts, the assurance index, evidence-data-provenance, the
 * product sheet, the glossary) were relabeled to match. IEC 62278-1:2025 is
 * a real, distinct standard (the generic RAMS process) — it just isn't what
 * this page is about, and there is no dedicated page for it.
 *
 * COMPOSITION — AN EDITORIAL DOCUMENT, NOT A LANDING PAGE.
 * OXOT_Composition_Rules.md gives assurance pages one instruction:
 * "editorial/technical reading experience. Diagrams, tables, requirements
 * traces. No sales-style dashboard blocks." So this page is built as a
 * numbered document: a masthead carrying the standard record and a clause
 * register, then eleven numbered clauses, then one ask at the end. There is
 * no metric tile, no feature grid and no card of benefits anywhere on it,
 * and the sections deliberately do not share one repeated shape — a table, a
 * spine diagram, a causal cascade and a requirements trace each appear where
 * the argument needs that particular thing.
 *
 * The signature element is clause 06, the requirements trace: hazard →
 * objective → requirement → allocation → cyber assumption → evidence →
 * acceptance, run once end to end with a real configuration-integrity
 * requirement filling every rung. That is the artefact the composition rules
 * name, and it is the thing this page has that a framework summary does not.
 *
 * DIAGRAMS ARE REAL AND STATIC. Three treatments (StageChain, Cascade,
 * TraceLadder in page-kit.tsx), all plain DOM and inline SVG that render the
 * structure they describe. Nothing on this page is labelled interactive,
 * live or simulated, because nothing on it is.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard, unlike the /assurance
 * index this page sits under. Content is `Bilingual` (src/i18n/bilingual.ts)
 * with `nl` a same-as-English placeholder pending translation, the same
 * convention as the six industry pages. The one link that would land an NL
 * reader on an EN-only page (/assurance itself) falls back to /consulting;
 * see Closing.tsx.
 *
 * Not in primaryNav — nav.ts is not this page's file to edit; route
 * registration is handled separately.
 */
export default async function Iec62278Page(props: PageProps<"/[locale]/assurance/iec-62278-2">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="IEC 62278-2:2025"
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

      <Masthead locale={locale} />
      <Foundations locale={locale} />
      <Analysis locale={locale} />
      <Demonstration locale={locale} />
      <Closing locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
