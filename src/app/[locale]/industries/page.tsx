import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { IndustryGrid } from "@/components/industries/IndustryGrid";

export async function generateMetadata(props: PageProps<"/[locale]/industries">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: "Industries — OT cybersecurity by sector | OXOT",
    description:
      "Six industries where a cyber event is not an IT incident but a physical one: energy, water, rail, manufacturing, hyperscale data centers, and defense.",
    alternates: localeAlternates(locale, PATHS.industries)
  };
}

/**
 * /industries — index for the 6 vertical pages, Phase 1 of the
 * new_material_source/1_website_layout_v4 implementation (owner request,
 * 2026-08-22). Real, theme-reactive page, both locales render (see the
 * doc comment on any /industries/<slug>/page.tsx for the full bilingual
 * rationale — same here).
 *
 * A BENTO GRID WITH A LIST TOGGLE, 2026-08-31 (owner). This page previously
 * rendered a numbered list of full-width rows, on the reasoning that an index
 * is a directory rather than a pitch. That reasoning still holds and is what
 * keeps the cards quiet — no fill, no accent panel, no per-card button — but
 * the owner asked for cards, each carrying a mark for its sector, three across
 * on desktop. The list survives as the alternate view rather than being
 * deleted, so a reader comparing six summaries can still read them in one
 * column. See IndustryGrid.tsx for why six cards clear Visual Rule 13.
 *
 * Not in primaryNav yet — Phase 6 of the same plan.
 */
export default async function IndustriesPage(props: PageProps<"/[locale]/industries">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Industries"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[]}
      />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">Industries</p>
        <h1 className="mt-4">The industries that cannot afford to stop.</h1>
        <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">
          Six sectors where a cyber event is not an IT incident but a physical one — production, safety, public service, or sovereignty, depending on which one is yours.
        </p>
      </header>

      <IndustryGrid locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
