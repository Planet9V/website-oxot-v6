import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { localeAlternates } from "@/i18n/alternates";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import {
  ENGAGEMENT_MODELS,
  FINAL_CTA,
  HERO,
  HOW_WE_WORK,
  IEC_UNDERNEATH,
  META,
  METHOD,
  SERVICES,
  TWIN_IN_CONSULTING,
  VENDOR_NEUTRAL
} from "@/components/consulting/about/content";

/**
 * The route's own locale-free path. `/consulting-2` is deliberately NOT added to
 * `PATHS` in `shell/nav.ts`: that object is the single source for "what pages
 * exist" in the navigation, and this page is preserved legacy, not a navigable
 * destination. It is a literal here, in one place, used by `generateMetadata`
 * only.
 */
const CONSULTING_2_PATH = "/consulting-2";

/**
 * /consulting-2 — the legacy OT cybersecurity consulting services page.
 *
 * MOVED HERE FROM /consulting, 2026-08-31 (owner). The from-scratch rebuild that
 * was built at /consulting-2 was promoted to /consulting, and this page — the
 * one it replaces — keeps its content unchanged at the -2 suffix so the work is
 * not lost. It is NOT linked from the nav: no `PATHS` entry, no `primaryNav`
 * item. Nothing below this comment was edited in the move except the route path
 * this file states about itself (the `PageProps` route generic and the canonical
 * URL in `generateMetadata`).
 *
 * REBUILT 2026-08-23 from new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, which is finished, ready-to-use copy specifying this exact
 * section order — see content.ts's own doc comment.
 *
 * The page this replaces was built from `db/migrations/135_services_to_a.sql`
 * and an internal `page-specs.md §7` decision record, both of which predate
 * `new_material_source` and are unrelated to it — the same class of mistake
 * found and fixed on /company earlier this session (see that page's doc
 * comment). Found via a full sweep of every page.tsx under app/[locale] for
 * old-provenance markers (START-HERE, BUILD-LAW, BREAKOUT-STRATEGY,
 * page-specs.md, db/migrations), not requested by name but caught by the
 * same check.
 */

export async function generateMetadata(
  props: PageProps<"/[locale]/consulting-2">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, CONSULTING_2_PATH)
  };
}

export default async function ConsultingLegacyPage(
  props: PageProps<"/[locale]/consulting-2">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);
  const p = (v: { en: string; nl: string }) => pick(v, locale);
  const contactHref = localePath(locale, PATHS.contact);
  const cdt2Href = localePath(locale, PATHS.cdt2);
  const techSpecHref =
    locale === "en" ? localePath("en", PATHS.technicalSpecification) : localePath("nl", PATHS.cdt2);
  const iec62443Href = localePath(locale, PATHS.assuranceIec62443);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb here={p(HERO.h1)} homeHref={localePath(locale, PATHS.home)} label={d.nav.breadcrumb} />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">{p(HERO.kicker)}</p>
        <h1 className="mt-4 max-w-2xl">{p(HERO.h1)}</h1>
        <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{p(HERO.lead)}</p>
        <p className="prose-measure mt-4 text-lg leading-relaxed text-foreground">{p(HERO.body)}</p>
        <p className="prose-measure mt-4 text-lg leading-relaxed text-muted-foreground">{p(HERO.body2)}</p>
        <ol className="mt-6 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-sm">
          {HERO.chain.map((step, i) => (
            <li key={step.en} className="mono-label flex items-center gap-2 text-muted-foreground">
              {i > 0 && <span aria-hidden="true">→</span>}
              {p(step)}
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={contactHref}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-colors duration-150 ease-brand hover:bg-primary/90"
          >
            {p(HERO.ctaPrimary)}
          </a>
          <a
            href={cdt2Href}
            className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors duration-150 ease-brand hover:bg-muted"
          >
            {p(HERO.ctaSecondary)}
          </a>
        </div>
      </header>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="how-we-work">
        <h2 id="how-we-work" className="max-w-2xl">{p(HOW_WE_WORK.h2)}</h2>
        <p className="prose-measure mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(HOW_WE_WORK.body1)}</p>
        <p className="prose-measure mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(HOW_WE_WORK.body2)}</p>
        <ol className="mt-5 list-none space-y-2 p-0">
          {HOW_WE_WORK.chain.map((step, i) => (
            <li key={step.en} className="mono-label flex items-center gap-3 text-foreground">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-[11px] text-muted-foreground">
                {i + 1}
              </span>
              {p(step)}
            </li>
          ))}
        </ol>
        <p className="prose-measure mt-6 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(HOW_WE_WORK.body3)}</p>
        <p className="prose-measure mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(HOW_WE_WORK.body4)}</p>
        <p className="prose-measure mt-6 border-l-2 border-primary/45 pl-4 text-lg font-semibold text-foreground">
          {p(HOW_WE_WORK.pullQuote)}
        </p>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="method">
        <h2 id="method" className="max-w-2xl">{p(METHOD.h2)}</h2>
        <dl className="mt-7 grid gap-x-14 gap-y-6 lg:grid-cols-3">
          {METHOD.principles.map((row) => (
            <div key={row.term.en}>
              <dt className="font-semibold text-foreground">{p(row.term)}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{p(row.body)}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-10 text-base font-semibold text-foreground">{p(METHOD.sequenceH3)}</h3>
        <ol className="mt-6 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {METHOD.sequence.map((step, i) => (
            <li key={step.title.en} className="rounded-2xl border border-border bg-card p-5">
              <span className="mono-label text-primary-ink">{`0${i + 1}`}</span>
              <p className="mt-2 font-semibold text-foreground">{p(step.title)}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{p(step.body)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="twin-in-consulting">
        <h2 id="twin-in-consulting" className="max-w-2xl">{p(TWIN_IN_CONSULTING.h2)}</h2>
        <div className="mt-6 grid gap-x-14 gap-y-6 lg:grid-cols-2">
          <div>
            <p className="mono-label text-muted-foreground">Traditional consulting</p>
            <ol className="mt-3 list-none space-y-2 p-0">
              {TWIN_IN_CONSULTING.oldChain.map((step) => (
                <li key={step.en} className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {p(step)}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="mono-label text-primary-ink">OXOT's model</p>
            <ol className="mt-3 list-none space-y-2 p-0">
              {TWIN_IN_CONSULTING.newChain.map((step) => (
                <li key={step.en} className="text-[0.9375rem] leading-relaxed text-foreground">
                  {p(step)}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <h3 className="mt-10 text-base font-semibold text-foreground">{p(TWIN_IN_CONSULTING.tableH3)}</h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-semibold text-foreground">Consulting need</th>
                <th className="py-2 font-semibold text-foreground">Cyber Digital Twin contribution</th>
              </tr>
            </thead>
            <tbody>
              {TWIN_IN_CONSULTING.rows.map((row) => (
                <tr key={row.need.en} className="border-b border-border/60">
                  <td className="py-3 pr-4 align-top font-semibold text-foreground">{p(row.need)}</td>
                  <td className="py-3 align-top text-muted-foreground">{p(row.contribution)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="prose-measure mt-6 border-l-2 border-primary/45 pl-4 text-lg font-semibold text-foreground">
          {p(TWIN_IN_CONSULTING.pullQuote)}
        </p>
        <p className="mt-4">
          <a
            href={cdt2Href}
            className="inline-flex items-center gap-1.5 border-b border-primary/45 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
          >
            {p(TWIN_IN_CONSULTING.inlineCta)}
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="services">
        <h2 id="services" className="max-w-2xl">{p(SERVICES.h2)}</h2>
        <p className="prose-measure mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(SERVICES.intro)}</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {SERVICES.cards.map((card) => (
            <details key={card.title.en} className="group rounded-2xl border border-border bg-card p-6">
              <summary className="flex cursor-pointer list-none items-start gap-3 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="mono-label shrink-0 text-primary-ink">{card.number}</span>
                <span>
                  <span className="block font-display text-lg font-bold text-foreground">{p(card.title)}</span>
                  <span className="mt-1 block text-[0.9375rem] italic text-muted-foreground">“{p(card.quote)}”</span>
                </span>
              </summary>
              <div className="mt-4 space-y-4 border-t border-border pt-4">
                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{p(card.lead)}</p>
                <div>
                  <p className="mono-label text-foreground">What we do</p>
                  <ul className="mt-2 list-none space-y-1.5 p-0">
                    {card.whatWeDo.map((item) => (
                      <li key={item.en} className="flex gap-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                        <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-primary" />
                        {p(item)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mono-label text-foreground">What you receive</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {card.whatYouReceive.map((item) => (
                      <li
                        key={item.en}
                        className="rounded-full border border-border bg-muted px-2.5 py-1 text-[0.75rem] text-foreground"
                      >
                        {p(item)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mono-label text-foreground">Best for</p>
                  <ul className="mt-2 list-none space-y-1.5 p-0">
                    {card.bestFor.map((item) => (
                      <li key={item.en} className="flex gap-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                        <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-primary" />
                        {p(item)}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={contactHref}
                  className="inline-flex items-center gap-1.5 border-b border-primary/45 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
                >
                  {p(card.cta)}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="engagement-models">
        <h2 id="engagement-models" className="max-w-2xl">{p(ENGAGEMENT_MODELS.h2)}</h2>
        <p className="prose-measure mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(ENGAGEMENT_MODELS.intro)}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-semibold text-foreground">Engagement model</th>
                <th className="py-2 pr-4 font-semibold text-foreground">Best starting point</th>
                <th className="py-2 font-semibold text-foreground">Typical duration and outcome</th>
              </tr>
            </thead>
            <tbody>
              {ENGAGEMENT_MODELS.rows.map((row) => (
                <tr key={row.model.en} className="border-b border-border/60">
                  <td className="py-3 pr-4 align-top font-semibold text-foreground">{p(row.model)}</td>
                  <td className="py-3 pr-4 align-top text-muted-foreground">{p(row.start)}</td>
                  <td className="py-3 align-top text-muted-foreground">{p(row.outcome)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="prose-measure mt-6 border-l-2 border-primary/45 pl-4 text-[1.0625rem] leading-relaxed text-foreground">
          {p(ENGAGEMENT_MODELS.pullQuote)}
        </p>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="iec-underneath">
        <h2 id="iec-underneath" className="max-w-2xl">{p(IEC_UNDERNEATH.h2)}</h2>
        <p className="prose-measure mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(IEC_UNDERNEATH.intro)}</p>
        <ol className="mt-5 flex list-none flex-wrap items-center gap-x-2 gap-y-2 p-0 text-sm">
          {IEC_UNDERNEATH.chain.map((step, i) => (
            <li key={step.en} className="mono-label flex items-center gap-2 text-muted-foreground">
              {i > 0 && <span aria-hidden="true">→</span>}
              {p(step)}
            </li>
          ))}
        </ol>
        <p className="prose-measure mt-6 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(IEC_UNDERNEATH.body)}</p>
        <ul className="mt-4 list-none space-y-1.5 p-0">
          {IEC_UNDERNEATH.bullets.map((item) => (
            <li key={item.en} className="flex gap-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-primary" />
              {p(item)}
            </li>
          ))}
        </ul>
        <p className="prose-measure mt-6 border-l-2 border-primary/45 pl-4 text-lg font-semibold text-foreground">
          {p(IEC_UNDERNEATH.pullQuote)}
        </p>
        <p className="mt-4">
          <a
            href={iec62443Href}
            className="inline-flex items-center gap-1.5 border-b border-primary/45 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
          >
            {p(IEC_UNDERNEATH.cta)}
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="vendor-neutral">
        <h2 id="vendor-neutral" className="max-w-2xl">{p(VENDOR_NEUTRAL.h2)}</h2>
        <p className="prose-measure mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(VENDOR_NEUTRAL.body1)}</p>
        <p className="prose-measure mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(VENDOR_NEUTRAL.body2)}</p>
        <p className="prose-measure mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(VENDOR_NEUTRAL.body3)}</p>
        <dl className="mt-7 grid gap-x-14 gap-y-6 sm:grid-cols-2">
          {VENDOR_NEUTRAL.items.map((item) => (
            <div key={item.term.en}>
              <dt className="font-semibold text-foreground">{p(item.term)}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{p(item.body)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 border-t border-border pt-12" aria-labelledby="final-cta">
        <h2 id="final-cta" className="max-w-2xl">{p(FINAL_CTA.h2)}</h2>
        <p className="prose-measure mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{p(FINAL_CTA.body)}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={contactHref}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-colors duration-150 ease-brand hover:bg-primary/90"
          >
            {p(FINAL_CTA.ctaPrimary)}
          </a>
          <a
            href={cdt2Href}
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
