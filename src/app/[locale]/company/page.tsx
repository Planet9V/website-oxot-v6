import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pick } from "@/i18n/bilingual";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import {
  FINAL_CTA,
  HERO,
  HOW_IT_WORKS,
  INDUSTRIES,
  META,
  MISSION,
  PRINCIPLES,
  SOVEREIGNTY,
  WHY_EXISTS
} from "@/components/company/about/content";

const INDUSTRY_SLUGS = [
  "manufacturing-process",
  "energy-utilities",
  "water-wastewater",
  "rail-transportation",
  "hyperscale-data-centers",
  "defense-government"
] as const;

/**
 * /company — who OXOT is.
 *
 * REBUILT 2026-08-23 from new_material_source/1_website_layout_v4/7_company/
 * company.md, which is finished, ready-to-use copy specifying this exact
 * section order (Hero, Mission, Why OXOT exists, Five things that hold, How
 * OXOT works, Sovereignty and vendor neutrality, Industries we serve, Final
 * CTA) — see content.ts's own doc comment.
 *
 * The page this replaces was built from `content/pages/en/company.md` and
 * `content/pages/en/about.md`, two files that predate `new_material_source`
 * and are unrelated to it despite the similar name — a real instance of the
 * owner's standing complaint that pages were still running on old content
 * instead of the defined spec sheets. That page carried founder bio cards
 * (real names, real LinkedIn links, three-paragraph bios) and an RVO grant
 * credential panel (award, fund, field, announced date, RVO's own quoted
 * words, sourced and linked to proof) — all genuine, previously-cleared
 * facts, not filler. company.md does not call for either, so neither is
 * reproduced here; only "Founded by former Fox-IT and NCC Group OT security
 * leads" survives, as the spec's own first principle. This is a deliberate
 * side effect of building strictly from the spec, flagged rather than done
 * quietly — restoring the founders/grant content as an addition to this
 * page (or its own page) is a fair question to bring back if that tradeoff
 * wasn't intended.
 */

export async function generateMetadata(
  props: PageProps<"/[locale]/company">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, PATHS.company)
  };
}

export default async function CompanyPage(
  props: PageProps<"/[locale]/company">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);
  const p = (v: { en: string; nl: string }) => pick(v, locale);
  const contactHref = localePath(locale, PATHS.contact);
  /* /technical-specification is EN-only by design (see that page's own doc
     comment) — NL falls back to /cdt-2, matching the precedent set on
     /assurance/iec-62443 for the same EN-only destination. */
  const techSpecHref =
    locale === "en" ? localePath("en", PATHS.technicalSpecification) : localePath("nl", PATHS.cdt2);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb here={p(HERO.h1)} homeHref={localePath(locale, PATHS.home)} label={d.nav.breadcrumb} />

      {/* Dark-mode-only background: the plain white light-mode header stays
          untouched rather than risk a text-contrast regression behind a dark
          generated image (see globals.css's own THREE ORANGES precedent for
          why dark/light get separate treatment here). Generated via
          OpenRouter (google/gemini-2.5-flash-image) 2026-08-23, resized with
          Pillow to a 36KB JPEG — public/generated/company-hero-bg.jpg. */}
      <header className="relative overflow-hidden rounded-3xl pt-10 lg:pt-14 dark:bg-[url('/generated/company-hero-bg.jpg')] dark:bg-cover dark:bg-center dark:px-8 dark:pb-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden dark:block dark:bg-gradient-to-b dark:from-background/80 dark:via-background/70 dark:to-background"
        />
        <div className="relative">
        <p className="oxot-kicker">Company</p>
        <h1 className="mt-4">{p(HERO.h1)}</h1>
        <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{p(HERO.lead)}</p>
        <p className="prose-measure mt-4 text-lg leading-relaxed text-foreground">{p(HERO.lead2)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={contactHref}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-colors duration-150 ease-brand hover:bg-primary/90"
          >
            {p(HERO.ctaPrimary)}
          </a>
          <a
            href={localePath(locale, PATHS.cdt2)}
            className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors duration-150 ease-brand hover:bg-muted"
          >
            {p(HERO.ctaSecondary)}
          </a>
        </div>
        </div>
      </header>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="mission">
        <h2 id="mission" className="">{p(MISSION.h2)}</h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{p(MISSION.body1)}</p>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{p(MISSION.body2)}</p>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="why-exists">
        <h2 id="why-exists" className="">{p(WHY_EXISTS.h2)}</h2>
        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-2">
          <div>
            <p className="body-lead leading-relaxed text-muted-foreground">{p(WHY_EXISTS.body1)}</p>
            <p className="mt-4 body-lead leading-relaxed text-muted-foreground">{p(WHY_EXISTS.body2)}</p>
          </div>
          <ol className="mt-5 list-none space-y-2 p-0 lg:mt-0">
            {WHY_EXISTS.chain.map((step, i) => (
              <li key={step.en} className="mono-label flex items-center gap-3 text-foreground">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-[11px] text-muted-foreground">
                  {i + 1}
                </span>
                {p(step)}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="principles">
        <h2 id="principles" className="">{p(PRINCIPLES.h2)}</h2>
        <dl className="mt-7 grid gap-x-14 gap-y-6 lg:grid-cols-2">
          {PRINCIPLES.rows.map((row) => (
            <div key={row.term.en}>
              <dt className="font-semibold text-foreground">{p(row.term)}</dt>
              <dd className="mt-1.5 body-copy leading-relaxed text-muted-foreground">{p(row.body)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="">{p(HOW_IT_WORKS.h2)}</h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{p(HOW_IT_WORKS.lead)}</p>
        <ol className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <li key={step.title.en} className="rounded-2xl border border-border bg-card p-5">
              <span className="mono-label text-primary-ink">{`0${i + 1}`}</span>
              <p className="mt-2 font-semibold text-foreground">{p(step.title)}</p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">{p(step.body)}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6">
          <a
            href={localePath(locale, PATHS.cdt2)}
            className="inline-flex items-center gap-1.5 border-b border-primary/45 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
          >
            {p(HOW_IT_WORKS.link)}
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="sovereignty">
        <h2 id="sovereignty" className="">{p(SOVEREIGNTY.h2)}</h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{p(SOVEREIGNTY.body1)}</p>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{p(SOVEREIGNTY.body2)}</p>
        <p className="mt-6">
          <a
            href={localePath(locale, PATHS.resourcesAirGappedDeployments)}
            className="inline-flex items-center gap-1.5 border-b border-primary/45 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
          >
            {p(SOVEREIGNTY.link)}
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="industries">
        <h2 id="industries" className="">{p(INDUSTRIES.h2)}</h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{p(INDUSTRIES.body)}</p>
        <ul className="mt-8 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.cards.map((card, i) => (
            <li key={card.en}>
              <a
                href={`${localePath(locale, PATHS.industries)}/${INDUSTRY_SLUGS[i]}`}
                className="block rounded-xl border border-border bg-card px-5 py-4 font-semibold text-foreground no-underline transition-colors duration-150 ease-brand hover:border-primary/45"
              >
                {p(card)}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="final-cta">
        <h2 id="final-cta" className="">{p(FINAL_CTA.h2)}</h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{p(FINAL_CTA.body)}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={contactHref}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-colors duration-150 ease-brand hover:bg-primary/90"
          >
            {p(FINAL_CTA.ctaPrimary)}
          </a>
          <a
            href={techSpecHref}
            className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors duration-150 ease-brand hover:bg-muted"
          >
            {p(FINAL_CTA.ctaSecondary)}
          </a>
        </div>
      </section>

      <div className="mt-16">
        <ThreeDoors locale={locale} t={d.doors} />
      </div>
    </div>
  );
}
