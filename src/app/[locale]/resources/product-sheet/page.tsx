import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pick } from "@/i18n/bilingual";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { Button } from "@/components/ui/button";
import {
  ASSURANCE,
  BREADCRUMB,
  CLOSING,
  DECISIONS,
  DEFINITION,
  DEPLOYMENT,
  MASTHEAD,
  MECHANISM,
  META,
  RESOURCES_PATH,
  SHEET_PATH
} from "@/components/resources/product-sheet/content";
import {
  ChipRow,
  ClaimList,
  GlanceTable,
  NumberCard,
  SheetBlock,
  SheetLink
} from "@/components/resources/product-sheet/page-kit";

export async function generateMetadata(
  props: PageProps<"/[locale]/resources/product-sheet">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, SHEET_PATH)
  };
}

/**
 * /resources/product-sheet — the sales one-pager.
 *
 * WHAT THIS PAGE IS FOR. resources-purpose.md's resource-type table gives the
 * Product Sheet a single reader intent — "What is this product and what
 * decisions does it support?" — with OXOT in the role of product evaluator and
 * "Request a technical briefing" as the CTA. That reader is scanning, often
 * two minutes before forwarding the URL to someone else. So this page
 * SUMMARISES AND ROUTES. It does not re-argue anything: /how-it-works,
 * /deployment-sovereignty, /integrations, the four /decisions pages and
 * /technical-specification each make one of these cases at length, and every
 * block here ends with the link to the page that does.
 *
 * COMPOSITION: A PRINTED DATA SHEET.
 * A masthead pairs the two-sentence definition with an eight-row "at a glance"
 * panel, so the categorising facts are readable without reading prose at all.
 * Below it, five short blocks run in a fixed left gutter carrying a mono index
 * and a kicker — the margin of a data sheet, not a scroll narrative. Blocks are
 * separated by hairlines rather than by whitespace, because the one thing a
 * one-pager cannot be is long.
 *
 * WHY NOT THE PLATFORM LAYOUT. /how-it-works walks a six-link chain where the
 * order IS the argument, so it earns an oversized serif numeral and long-form
 * sections. Nothing here is walked in order; a reader may take block 04 and
 * leave. Equal-weight blocks with a scannable margin are the honest shape for
 * that, and reusing the chain furniture would promise a sequence this page
 * does not have.
 *
 * WHY NOT THE INDUSTRY LAYOUT. The industry pages open on a sector problem the
 * reader is living inside. This reader has not been qualified yet and may be
 * evaluating three vendors in a browser tab each, so the page opens on what
 * the thing IS, not on a problem statement.
 *
 * NOTHING CLAIMS TO BE LIVE. No JavaScript beyond links, no figures, no
 * interactive controls — a one-pager with an interaction is not a one-pager.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard on the page. Content is
 * `Bilingual` with `nl` a same-as-English placeholder pending translation, the
 * convention documented in components/industries/registry.ts. Two EN-only
 * DESTINATIONS are guarded on their own links: /assurance and
 * /technical-specification (see nav.ts), both of which `notFound()` for a
 * Dutch reader. Each falls back to /cdt-2, the substitution the platform
 * pages already make.
 *
 * NOT IN primaryNav — nav.ts belongs to the integration owner and route
 * registration is handled separately.
 */
export default async function ProductSheetPage(props: PageProps<"/[locale]/resources/product-sheet">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  const isEnglish = locale === "en";

  /* /assurance and /technical-specification both guard on locale !== "en" and
     call notFound(). Sending a Dutch reader there would be a deliberate 404,
     so both links fall back to /cdt-2. Reversible: once either page is
     bilingual, drop its ternary. */
  const assuranceHref = isEnglish ? localePath("en", ASSURANCE.href) : localePath("nl", ASSURANCE.hrefNl);
  const assuranceLabel = isEnglish ? ASSURANCE.linkLabel : ASSURANCE.linkLabelNl;
  const specHref = isEnglish ? localePath("en", PATHS.technicalSpecification) : localePath("nl", PATHS.cdt2);
  const specLabel = isEnglish ? CLOSING.ctaSecondary : CLOSING.ctaSecondaryNl;

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={pick(BREADCRUMB.here, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, RESOURCES_PATH), label: pick(BREADCRUMB.resources, locale) }]}
      />

      {/* MASTHEAD. Definition on the left, categorising facts on the right —
          the reader who only reads one column should still be able to place
          the product. Stacks on narrow viewports with the prose first. */}
      <header className="grid grid-cols-1 gap-x-12 gap-y-10 pt-10 lg:grid-cols-[1fr_minmax(0,25rem)] lg:pt-14">
        <div>
          <p className="oxot-kicker">{pick(MASTHEAD.kicker, locale)}</p>
          <h1 className="mt-4">{pick(MASTHEAD.h1, locale)}</h1>
          <p className="prose-measure mt-6 font-display text-[1.25rem] font-medium leading-snug text-primary-ink">
            {pick(MASTHEAD.strap, locale)}
          </p>
          {MASTHEAD.body.map((paragraph, i) => (
            <p key={i} className="prose-measure mt-5 body-lead leading-relaxed text-foreground">
              {pick(paragraph, locale)}
            </p>
          ))}
        </div>

        <aside aria-labelledby="glance" className="oxot-glass rounded-lg p-5 lg:p-6">
          <h2 id="glance" className="mono-label font-bold text-foreground">
            {pick(MASTHEAD.glanceHeading, locale)}
          </h2>
          <GlanceTable rows={MASTHEAD.glance.map((row) => ({ k: pick(row.k, locale), v: pick(row.v, locale) }))} />
        </aside>
      </header>

      {/* No wrapping <main>: [locale]/layout.tsx already renders the route's
          single <main id="main">, and a second landmark breaks the skip link. */}

      <SheetBlock
        id="definition"
        n={DEFINITION.n}
        kicker={pick(DEFINITION.kicker, locale)}
        title={pick(DEFINITION.h2, locale)}
        intro={pick(DEFINITION.intro, locale)}
      >
        <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <ClaimList
            heading={pick(DEFINITION.isHeading, locale)}
            items={DEFINITION.is.map((item) => pick(item, locale))}
          />
          <ClaimList
            heading={pick(DEFINITION.isNotHeading, locale)}
            items={DEFINITION.isNot.map((item) => pick(item, locale))}
          />
        </div>
      </SheetBlock>

      <SheetBlock
        id="decisions"
        n={DECISIONS.n}
        kicker={pick(DECISIONS.kicker, locale)}
        title={pick(DECISIONS.h2, locale)}
        intro={pick(DECISIONS.intro, locale)}
      >
        {/* Four peers, so a 2x2 grid rather than a list — and each carries its
            own link, because a reader who cares about one of these decisions
            usually does not care about the other three. */}
        <ul className="mt-7 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {DECISIONS.rows.map((row) => (
            <li key={row.n} className="oxot-glass flex flex-col rounded-lg p-5">
              <p className="mono-label font-bold text-primary-ink">{row.n}</p>
              <h3 className="mt-2 font-display text-[1.1875rem] font-semibold leading-snug text-foreground">
                {pick(row.question, locale)}
              </h3>
              <p className="mt-3 flex-1 body-copy leading-relaxed text-muted-foreground">
                {pick(row.answer, locale)}
              </p>
              <SheetLink href={localePath(locale, row.href)} label={pick(row.linkLabel, locale)} />
            </li>
          ))}
        </ul>
      </SheetBlock>

      <SheetBlock
        id="mechanism"
        n={MECHANISM.n}
        kicker={pick(MECHANISM.kicker, locale)}
        title={pick(MECHANISM.h2, locale)}
        intro={pick(MECHANISM.intro, locale)}
      >
        <ul className="mt-7 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {MECHANISM.steps.map((step) => (
            <NumberCard key={step.n} n={step.n} title={pick(step.title, locale)} body={pick(step.body, locale)} />
          ))}
        </ul>
        <SheetLink href={localePath(locale, MECHANISM.href)} label={pick(MECHANISM.linkLabel, locale)} />
      </SheetBlock>

      <SheetBlock
        id="deployment"
        n={DEPLOYMENT.n}
        kicker={pick(DEPLOYMENT.kicker, locale)}
        title={pick(DEPLOYMENT.h2, locale)}
        intro={pick(DEPLOYMENT.intro, locale)}
      >
        <ul className="mt-7 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
          {DEPLOYMENT.modes.map((mode) => (
            <NumberCard key={mode.n} n={mode.n} title={pick(mode.title, locale)} body={pick(mode.body, locale)} />
          ))}
        </ul>
        <SheetLink href={localePath(locale, DEPLOYMENT.modesHref)} label={pick(DEPLOYMENT.modesLinkLabel, locale)} />

        <div className="mt-9 border-t border-border pt-6">
          <p className="mono-label font-bold text-foreground">{pick(DEPLOYMENT.inputsHeading, locale)}</p>
          <ChipRow items={DEPLOYMENT.inputs.map((item) => pick(item, locale))} />
          <SheetLink href={localePath(locale, DEPLOYMENT.inputsHref)} label={pick(DEPLOYMENT.inputsLinkLabel, locale)} />
        </div>
      </SheetBlock>

      <SheetBlock
        id="assurance"
        n={ASSURANCE.n}
        kicker={pick(ASSURANCE.kicker, locale)}
        title={pick(ASSURANCE.h2, locale)}
        intro={pick(ASSURANCE.intro, locale)}
      >
        <ChipRow items={ASSURANCE.frameworks.map((item) => pick(item, locale))} />
        <SheetLink href={assuranceHref} label={pick(assuranceLabel, locale)} />
      </SheetBlock>

      <section aria-labelledby="briefing" className="mt-14 border-t border-border pt-8">
        <p className="oxot-kicker">{pick(CLOSING.kicker, locale)}</p>
        <h2 id="briefing" className="h-section mt-4 text-foreground">
          {pick(CLOSING.h2, locale)}
        </h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(CLOSING.body, locale)}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={localePath(locale, PATHS.contact)}>{pick(CLOSING.ctaPrimary, locale)}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={specHref}>{pick(specLabel, locale)}</Link>
          </Button>
        </div>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
