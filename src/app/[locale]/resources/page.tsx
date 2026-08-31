import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { META } from "@/components/resources/index/content";
import { ResourcesHero } from "@/components/resources/index/ResourcesHero";
import { ResourcesFeatured } from "@/components/resources/index/ResourcesFeatured";
import { ResourcesPaths } from "@/components/resources/index/ResourcesPaths";
import { ResourcesInsights } from "@/components/resources/index/ResourcesInsights";
import { ResourcesCaseStudies } from "@/components/resources/index/ResourcesCaseStudies";
import { ResourcesGuides } from "@/components/resources/index/ResourcesGuides";
import { ResourcesTechnicalDocs } from "@/components/resources/index/ResourcesTechnicalDocs";
import { ResourcesBrowse } from "@/components/resources/index/ResourcesBrowse";
import { ResourcesGlossary } from "@/components/resources/index/ResourcesGlossary";

export async function generateMetadata(props: PageProps<"/[locale]/resources">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, PATHS.resources)
  };
}

/**
 * /resources — the Resources hub, built from new_material_source/
 * 1_website_layout_v4/6_resources/resources_overview.md, which is
 * authoritative for this page and specifies its H1, supporting copy,
 * section order and the four "choose your path" cards. resources-purpose.md
 * and resources-map.md are secondary: they define what each resource TYPE
 * is for and supply the reader-intent framing reused in the path cards.
 *
 * IT IS A ROUTING AND DISCOVERY LAYER, NOT A LIBRARY. The source's own
 * framing — "the general page should not repeat every article" — is what
 * the section order encodes: orient (hero), make one editorial choice for
 * the reader (featured), route by intent (choose your path), then show a
 * few of each kind rather than all of any kind.
 *
 * THE LISTS ARE REAL AND READ AT REQUEST TIME. Latest Insights, Featured
 * Case Studies and Guides & Briefings each read `content/<section>/`
 * through the shared longform loader, so this hub cannot advertise an
 * article that does not exist or miss one that does. The source lists
 * example titles for each — most of which are not written yet — and
 * hard-coding those would have put three headlines on the site that lead
 * nowhere. Only the FEATURED pin and the CASE_STUDY_PICKS order are
 * editorial choices stored in content.ts, both manual by the source's own
 * instruction against auto-rotation. Any section whose directory is empty
 * renders nothing rather than an empty shell.
 *
 * EVERY SECTION HAS A DIFFERENT SHAPE, and the shape comes from the
 * content rather than from a desire for variety. Insights are dated rows
 * (a chronology); case studies are cards (a comparison); guides pair a
 * format rule with a list (the rule is what makes the list legible);
 * technical documents are a flush, monospace-coded register with no card
 * radius at all, per the source's explicit "more document-like and less
 * editorial". The one place four identical cards ARE correct is "choose
 * your path", where the four options are genuinely parallel and weighting
 * one would be the design answering a question the reader came to answer.
 *
 * NO PAGE-LOCAL FINAL CTA, deliberately, despite the source's layout
 * naming one. This route is not in nav.ts's SUPPRESS_CONTACT_BAND, so the
 * global ContactBand already renders after this page's content, and
 * ThreeDoors closes it above that. A third stacked ask would be the thing
 * the site's own CTA rules exist to prevent. If a page-local CTA is ever
 * wanted here it needs the suppression-list entry first.
 *
 * TWO DESTINATIONS ARE EN-ONLY. /case-studies and /technical-specification
 * both call notFound() for non-English locales; this page renders in both,
 * so links to those two are deliberately cross-locale rather than 404s in
 * Dutch. See resourceHref() in content.ts.
 *
 * Its own paths now live in nav.ts's PATHS (added by the owner alongside
 * this build), so nothing here hard-codes a "/resources/..." literal.
 */
export default async function ResourcesPage(props: PageProps<"/[locale]/resources">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Resources"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[]}
      />

      <ResourcesHero locale={locale} />
      <ResourcesFeatured locale={locale} />
      <ResourcesPaths locale={locale} />
      <ResourcesInsights locale={locale} />
      <ResourcesCaseStudies locale={locale} />
      <ResourcesGuides locale={locale} />
      <ResourcesTechnicalDocs locale={locale} />
      <ResourcesBrowse locale={locale} />
      <ResourcesGlossary locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
