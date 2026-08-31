import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { GLOSSARY_PATHS, META } from "@/components/resources/glossary/content";
import { GlossaryHero } from "@/components/resources/glossary/GlossaryHero";
import { GlossaryIndex } from "@/components/resources/glossary/GlossaryIndex";
import { GlossaryEntries } from "@/components/resources/glossary/GlossaryEntries";
import { GlossaryClosing } from "@/components/resources/glossary/GlossaryClosing";

export async function generateMetadata(props: PageProps<"/[locale]/resources/glossary">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, GLOSSARY_PATHS.self)
  };
}

/**
 * /resources/glossary — the section's reference layer.
 *
 * TERM LIST FROM new_material_source/1_website_layout_v4/6_resources/
 * glossary.md, which is authoritative on which terms exist and silent on
 * what they mean; ENTRY STRUCTURE from resources-purpose.md's Glossary
 * section (the dedicated resources-format-glossary.md is an empty file).
 * Nothing was added to the term list and nothing dropped — see
 * content.ts's header for what that constrains.
 *
 * NOT THE LONG-FORM ARTICLE ENGINE. /reference and the Insights and Guides
 * pages are single documents with a table of contents, and they use the
 * article-layout.tsx machinery built for exactly that. A glossary is the
 * opposite shape — many short independent entries, read by lookup rather
 * than in sequence — so it is one page with real content and its own
 * components. Running it through the article engine would have produced a
 * table of contents pretending to be an index.
 *
 * DESIGN DIRECTION: "THE REFERENCE SPREAD". Composed as a printed
 * reference work rather than a marketing page, because that is how it will
 * be used: a masthead carrying the two facts that make a reference
 * trustworthy (how many entries, when last reviewed) plus the scope note
 * that keeps a working definition from being read as the formal one; then
 * the index, which on this page is the primary instrument and not
 * navigation furniture — a letter rail above a three-column term list, all
 * same-page anchors; then the entries as a genuine <dl>, split so the <dt>
 * rail carries term, aliases, standards chips and review date while the
 * <dd> carries the five prose fields in the spec's fixed order. Letter
 * groups are separated by a serif letter mark on a rule, each with its own
 * way back up to the index.
 *
 * Deliberately no card grid: cards would make thirty-five definitions
 * look like thirty-five products, and would lose the one thing a
 * definition list gives a screen-reader user for free — the count, and
 * term-by-term movement through it.
 *
 * BOTH LOCALES RENDER — no locale !== "en" guard. Content is `Bilingual`
 * with `nl` a same-as-English placeholder pending translation, matching
 * /resources and the rest of this batch. One consequence is documented in
 * grouping.ts: entries file under the first letter of their ENGLISH term
 * in both locales, because the anchor ids are English slugs meant to be
 * linked from other pages.
 *
 * Not in primaryNav; reachable from the /resources index, whose Glossary
 * strip links here. src/components/shell/nav.ts is untouched — this
 * route comes from GLOSSARY_PATHS in this page's own content.ts, which
 * is where it lives so that a rewrite of the /resources index cannot
 * delete this page's route constant out from under it.
 */
export default async function GlossaryPage(props: PageProps<"/[locale]/resources/glossary">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Glossary"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, GLOSSARY_PATHS.root), label: "Resources" }]}
      />

      <GlossaryHero locale={locale} />
      <GlossaryIndex locale={locale} />
      <GlossaryEntries locale={locale} />
      <GlossaryClosing locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
