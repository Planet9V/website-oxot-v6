import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/assurance/ts-50701/content";
import { Ts50701Hero } from "@/components/assurance/ts-50701/Ts50701Hero";
import { Ts50701Challenge } from "@/components/assurance/ts-50701/Ts50701Challenge";
import { Ts50701Lifecycle } from "@/components/assurance/ts-50701/Ts50701Lifecycle";
import { Ts50701Approach } from "@/components/assurance/ts-50701/Ts50701Approach";
import { Ts50701Scenarios } from "@/components/assurance/ts-50701/Ts50701Scenarios";
import { Ts50701Scope } from "@/components/assurance/ts-50701/Ts50701Scope";
import { Ts50701Safety } from "@/components/assurance/ts-50701/Ts50701Safety";
import { Ts50701Treatment } from "@/components/assurance/ts-50701/Ts50701Treatment";
import { Ts50701Worked } from "@/components/assurance/ts-50701/Ts50701Worked";
import { Ts50701Evidence } from "@/components/assurance/ts-50701/Ts50701Evidence";
import { Ts50701Boundary } from "@/components/assurance/ts-50701/Ts50701Boundary";
import { Ts50701Onward } from "@/components/assurance/ts-50701/Ts50701Onward";

const PATH = `${PATHS.assurance}/ts-50701`;

export async function generateMetadata(props: PageProps<"/[locale]/assurance/ts-50701">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, PATH)
  };
}

/**
 * /assurance/ts-50701 — the product/assurance framing of CLC/TS 50701:
 * what the Cyber Digital Twin does with the specification, not what the
 * specification says. The regulatory deep-dive already exists as
 * content/reference/ts-50701.{en,nl}.md at /reference/ts-50701, and this
 * page links there rather than reprinting it; see Ts50701Onward.tsx.
 *
 * Content transcribed from new_material_source/1_website_layout_v4/
 * 4_assurance/assurance_TS50701.md and assurance_TS50701_support_cdt.d
 * (the RAMS / IEC 62278 support note, which is where the RAMS boundary
 * wording comes from).
 *
 * COMPOSITION: OXOT_Composition_Rules.md — "Assurance pages: editorial /
 * technical reading experience. Diagrams, tables, requirements traces. No
 * sales-style dashboard blocks." So: no stat tiles, no metric cards, no
 * feature grid. The structural device is the TRACE (trace.tsx) — the
 * five-stage walk from cyber entry point to railway consequence that
 * TS 50701 exists to force, rendered horizontally in the hero, the
 * scenario legend and the treatment loop, and vertically with its own
 * vocabulary for the safety consequence chain. Detail is stated in two-
 * and three-column reference tables. The one drawn figure is
 * SystemBoundaryFigure.tsx: real inline SVG of a system under
 * consideration and the four interface classes that cross its boundary.
 *
 * Deliberately NOT the "dual track" fork of /industries/rail-transportation
 * and NOT the stacked box-chain of /assurance/evidence-data-provenance —
 * per the owner's standing instruction against one template repeated
 * across sibling pages.
 *
 * WHAT IS INTERACTIVE, EXACTLY: one thing. Ts50701Scenarios.tsx switches
 * between the passenger and freight scenario sets with the project's own
 * Radix tabs. Nothing else on the page holds state, and no copy anywhere
 * claims live data, a live model, or a drill-down this page does not do.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard, unlike the /assurance
 * index and /technical-specification. All content is `Bilingual` with `nl`
 * a same-as-English placeholder pending translation, matching the six
 * industry pages. The two onward destinations that ARE EN-only get an
 * explicit Dutch fallback rather than a 404 (Ts50701Onward.tsx), and the
 * breadcrumb only offers the /assurance parent in English for the same
 * reason.
 *
 * Not in primaryNav — route registration is handled separately; nav.ts is
 * untouched by this page.
 */
export default async function Ts50701Page(props: PageProps<"/[locale]/assurance/ts-50701">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="TS 50701"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={locale === "en" ? [{ href: localePath("en", PATHS.assurance), label: "Assurance" }] : []}
      />

      <Ts50701Hero locale={locale} />
      <Ts50701Challenge locale={locale} />
      <Ts50701Lifecycle locale={locale} />
      <Ts50701Approach locale={locale} />
      <Ts50701Scenarios locale={locale} />
      <Ts50701Scope locale={locale} />
      <Ts50701Safety locale={locale} />
      <Ts50701Treatment locale={locale} />
      <Ts50701Worked locale={locale} />
      <Ts50701Evidence locale={locale} />
      <Ts50701Boundary locale={locale} />
      <Ts50701Onward locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
