import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META, WORK_WITH_OXOT_PATH } from "@/components/platform/work-with-oxot/content";
import { WorkHero } from "@/components/platform/work-with-oxot/WorkHero";
import { WorkEngagements } from "@/components/platform/work-with-oxot/WorkEngagements";
import { WorkFinalCta } from "@/components/platform/work-with-oxot/WorkFinalCta";

export async function generateMetadata(props: PageProps<"/[locale]/work-with-oxot">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, WORK_WITH_OXOT_PATH)
  };
}

/**
 * /work-with-oxot — the Platform section's engagement-model page, built from
 * new_material_source/1_website_layout_v4/2_platform/platform.md's
 * "Consulting's correct role" and "First CTA strategy" sections.
 *
 * ITS ONE JOB, AND THE LINE BETWEEN IT AND /consulting. /consulting is the
 * service catalogue and the revenue that bills today; it stands on its own
 * and is untouched. This page answers the narrower question the Platform
 * section owes its reader: having understood the Twin, what does actually
 * getting one running look like as a relationship? Four engagement shapes,
 * and a route out to /consulting for anyone who wants the full catalogue.
 * The six-service detail that currently sits on /cdt-2 is deliberately NOT
 * restated here — an owner-reviewed critique of that page placed that level
 * of service-menu detail on /consulting, and duplicating it would recreate
 * exactly the problem the critique identified.
 *
 * DELIBERATELY SHORT. Three sections and the doors. The Platform composition
 * rules ask for one strong final CTA, so the hero carries no button and the
 * page's single ask — the source's own P&ID-and-asset-list offer — sits at
 * the bottom where the reader has the four engagements in mind.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual`
 * (src/i18n/bilingual.ts) with `nl` a same-as-English placeholder pending
 * translation, the same convention the six industry pages and the five
 * /assurance framework pages use. Every outbound link (/consulting,
 * /contact, and the doors' /cdt-2) is bilingual, so nothing here needs an
 * EN-only fallback.
 *
 * NOT IN primaryNav — src/components/shell/nav.ts is untouched, and this
 * route is Phase-6 pending like /industries and the /assurance framework
 * pages. Its locale-free path lives in this page's own content.ts
 * (`WORK_WITH_OXOT_PATH`) until the platform section lands in the bar.
 *
 * NO BREADCRUMB TRAIL. The sitemap files this under Platform, but no
 * /platform index route exists yet; a crumb pointing at a 404 is worse than
 * a shallow trail, and the Breadcrumb's own doc comment requires the trail
 * to mirror navigation that actually exists.
 */
export default async function WorkWithOxotPage(props: PageProps<"/[locale]/work-with-oxot">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb here="Work With OXOT" homeHref={localePath(locale, PATHS.home)} label={d.nav.breadcrumb} />

      <WorkHero locale={locale} />
      <WorkEngagements locale={locale} />
      <WorkFinalCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
