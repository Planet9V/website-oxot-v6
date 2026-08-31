import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pick } from "@/i18n/bilingual";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { BREADCRUMB, BRIEFING_PATH, META, RESOURCES_PATH } from "@/components/resources/air-gapped-deployments/content";
import { DocMasthead } from "@/components/resources/air-gapped-deployments/DocMasthead";
import { BriefingClauses } from "@/components/resources/air-gapped-deployments/BriefingClauses";

export async function generateMetadata(
  props: PageProps<"/[locale]/resources/air-gapped-deployments">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, BRIEFING_PATH)
  };
}

/**
 * /resources/air-gapped-deployments — the Air-Gapped & Sovereign Deployment
 * Briefing.
 *
 * A SEPARATE DESTINATION FROM /deployment-sovereignty, NOT A COPY OF IT.
 * resources_overview.md's nav structure and sitemap file "Air-Gapped
 * Deployments" under Resources > Technical Documents, beside the Product
 * Sheet and the Technical Specification, and say those three are "for
 * higher-intent technical evaluators" with a card style that is "more
 * document-like and less editorial". The reader intent the same file gives
 * that group is "Evaluate the platform". /deployment-sovereignty serves the
 * other reader — the one being persuaded — from the Platform section.
 *
 * SO THE COMPOSITION IS A BRIEFING SHEET. A document-control block instead
 * of a hero; eight numbered clauses with a § numeral in the margin; an
 * eleven-row mode matrix read across three columns; two ID-keyed registers
 * (INV-01..05 and MTE-01..10, the latter with an owner code per line); two
 * data tables; a two-panel limitations clause; and the single ask at the
 * foot, where a technical evaluator expects it. There is no hero image, no
 * contents rail, no pull quote, no narrative section and — deliberately —
 * no diagram: the three drawn trust boundaries live on
 * /deployment-sovereignty, and §03 links to them rather than redrawing
 * them. Nothing here claims to be interactive, because nothing here is.
 *
 * THE FACTS AGREE WITH THE PLATFORM PAGE; THE SENTENCES DO NOT REPEAT IT.
 * Mode names, the passive-first commitment, the mandatory technical
 * elements and the three intelligence options are the same because they
 * describe the same product, sourced from new_material_source/
 * 1_website_layout_v4/6_resources/air-gapped_deployment.md. That page's
 * components are read-only reference and nothing here imports from them.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual`
 * with `nl` a same-as-English placeholder pending translation, the
 * convention documented in components/industries/registry.ts. The one
 * onward link to an EN-only page (/technical-specification, which calls
 * `notFound()` on nl) is filtered out of the Dutch render in
 * BriefingClauses rather than left to 404.
 *
 * NOT IN PATHS OR primaryNav — nav.ts is the integration owner's file and
 * route registration is handled separately, the same position
 * /deployment-sovereignty and /resources/product-sheet are in. The
 * breadcrumb trail points at /resources, this page's parent in the source
 * sitemap.
 */
export default async function AirGappedDeploymentsPage(
  props: PageProps<"/[locale]/resources/air-gapped-deployments">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={pick(BREADCRUMB.here, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, RESOURCES_PATH), label: pick(BREADCRUMB.resources, locale) }]}
      />

      {/* `min-w-0` is load-bearing: without it the matrix's own min-width
          propagates out through the scroll container and scrolls the page
          body sideways instead of the table. */}
      <article className="min-w-0">
        <DocMasthead locale={locale} />
        <BriefingClauses locale={locale} />
      </article>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
