import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pick } from "@/i18n/bilingual";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { Button } from "@/components/ui/button";
import { BREADCRUMB, DOORS, DOORS_SECTION, HERO, META } from "@/components/decisions/overview/content";

export async function generateMetadata(props: PageProps<"/[locale]/decisions">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, PATHS.decisions)
  };
}

/**
 * /decisions — the section index for the Four Decisions.
 *
 * WHAT WAS MISSING. The four decision pages have been live and linked from
 * the Platform dropdown, from each other and from /cdt-2#decide; `/decisions`
 * itself 404'd. `investment/content.ts`'s own SIBLINGS block is the record of
 * the gap — it carries all four decisions inline because there was no index
 * to send a reader to. This is that index, and nothing more: a short intro
 * and four doors.
 *
 * COMPOSITION follows /assurance, the site's established section-index
 * pattern — copy in an adjacent `content.ts`, page.tsx as composition only,
 * kicker → h1 → lede → body → asks in the header, then one titled section.
 * It does NOT import /assurance's `page-kit.tsx`: that file's own header
 * states the precedent it was built on ("duplicate rather than cross-import
 * so an edit to one assurance page cannot silently restyle another"), and an
 * index in a different section reaching into it would break exactly that
 * rule. The four things this page needs — an ask, a quiet onward link, a
 * numbered heading and a card — are the shared `Button`, `Link` and the
 * design system's own heading roles instead.
 *
 * THE DOORS ARE A LIST, NOT A GRID OF FEATURE CARDS. A reader arrives
 * solution-aware but does not yet know OXOT frames the work as four
 * decisions, so the job here is recognition: ordinal, name, the question that
 * decision answers in its own page's words, and what they leave with. Read
 * top to bottom, the four questions are four different jobs — which is what
 * lets a CISO and an OT engineer land on different doors from the same
 * screen. Two columns on a wide viewport, one on a phone, joined by a border
 * grid rather than floating cards: the same treatment change-safely's own
 * SCOPE section uses, so the two pages read as one system.
 *
 * NO PAGE-LOCAL CLOSING CTA. The global ContactBand renders for this route
 * from [locale]/layout.tsx — it is deliberately NOT in
 * SUPPRESS_CONTACT_BAND — followed by ThreeDoors, the same close /assurance
 * and all four decision pages carry.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard, matching all four
 * sub-pages. Copy is `Bilingual` with `nl` a same-as-English placeholder
 * pending translation. Every destination linked from here (/contact, /cdt-2
 * and the four decision pages) renders in both locales; the EN-only
 * /assurance and /technical-specification are deliberately not linked.
 *
 * SERVER-RENDERED. Nothing on this page is interactive and nothing pretends
 * to be — the Four Decisions switchboard is a single interactive control that
 * does not exist yet, as `fix-first/content.ts` PANEL.note says on its own
 * page. An index implying a working switch would be that same lie in a more
 * prominent place.
 */
export default async function DecisionsIndexPage(props: PageProps<"/[locale]/decisions">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here={pick(BREADCRUMB.here, locale)}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
      />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">{pick(HERO.kicker, locale)}</p>
        <h1 className="h-page mt-5 text-foreground">
          {pick(HERO.h1, locale)}
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-border pt-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="prose-measure font-display text-lg font-bold leading-snug text-foreground">
              {pick(HERO.lede, locale)}
            </p>
            <p className="prose-measure mt-5 text-base leading-relaxed text-muted-foreground">
              {pick(HERO.body, locale)}
            </p>
          </div>
          <div className="lg:pt-1">
            <p className="prose-measure text-sm leading-relaxed text-muted-foreground">
              {pick(HERO.body2, locale)}
            </p>
            <div className="mt-7 flex flex-wrap items-start gap-3">
              <Button asChild size="lg">
                <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`${localePath(locale, PATHS.cdt2)}#decide`}>{pick(HERO.ctaSecondary, locale)}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* `id="four-decisions"`, NOT `id="doors"` — ThreeDoors renders its own
          `id="doors"` heading at the foot of every page, so a section labelled
          "doors" here put two `aria-labelledby="doors"` regions on one page
          both resolving to the same heading. Caught in the rendered HTML. */}
      <section aria-labelledby="four-decisions" className="mt-20 border-t border-border pt-10">
        <p className="oxot-kicker">{pick(DOORS_SECTION.label, locale)}</p>
        <h2 id="four-decisions" className="h-section mt-4">
          {pick(DOORS_SECTION.heading, locale)}
        </h2>

        <ol className="mt-10 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border p-0 sm:grid-cols-2">
          {DOORS.map((door) => (
            <li key={door.n} className="bg-card">
              {/* The whole card is the target. `group` drives the arrow and the
                  rule under the onward label, so a card-sized hit area behaves
                  like the single link it is rather than three competing ones. */}
              <Link
                href={localePath(locale, door.path)}
                className="group flex h-full flex-col p-6 no-underline transition-colors duration-150 ease-brand hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:p-8"
              >
                <span className="mono-label text-primary-ink">
                  {door.n}
                </span>
                <h3 className="h-card mt-2 text-foreground">{pick(door.name, locale)}</h3>

                <p className="mono-label mt-6">{pick(DOORS_SECTION.questionLabel, locale)}</p>
                <p className="h-micro mt-2 border-l-2 border-primary pl-4 text-foreground">
                  {pick(door.question, locale)}
                </p>

                <p className="mono-label mt-6">{pick(DOORS_SECTION.outcomeLabel, locale)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pick(door.outcome, locale)}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-primary-ink">
                  <span className="border-b border-primary/45 transition-colors duration-150 ease-brand group-hover:border-primary">
                    {pick(door.cta, locale)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-150 ease-brand group-hover:translate-x-0.5"
                  >
                    &#8594;
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
