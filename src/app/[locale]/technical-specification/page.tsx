import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { ENGINE_INTRO, ENGINE_WHAT_IT_IS, ENGINE_DIFFERENT, ENGINE_MODEL, ENGINE_LENSES } from "@/components/cdt2/content-2";

export async function generateMetadata(props: PageProps<"/[locale]/technical-specification">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale) || locale !== "en") return {};
  return {
    title: "Technical Specification — the Cyber Digital Twin engine | OXOT",
    description:
      "How the OXOT Cyber Digital Twin is built: four engineering disciplines, the seven-layer facility model, and the same model read through five different lenses — P&ID, Purdue, network, graph and 3D.",
    alternates: localeAlternates(locale, PATHS.technicalSpecification)
  };
}

/**
 * /technical-specification — added 2026-08-22 (owner request), per
 * platform_critique_review.md's ICE review: the deep engine/seven-layer/
 * lenses material that used to run six sections deep on /cdt-2 (Engine
 * Intro, What It Is, What Makes It Different, Model, Lenses — IEC Native
 * moved to /assurance instead, kept separate per the review's own section
 * mapping) gets a real home instead of being the longest unbroken run of
 * platform explanation on the Platform page. Content reused directly from
 * cdt2/content-2.ts, not duplicated or rewritten.
 *
 * Real theme-reactive page, EN-only for now, not in primaryNav — same
 * conventions as /assurance (see that page's doc comment for the full
 * rationale, not repeated here).
 *
 * THE SEVEN-LAYER "MOVEMENTS" STRUCTURE is rendered as a simple grouped
 * list here rather than /cdt-2's bespoke spine visual (Cdt2Model.tsx) —
 * faithful to the same content and grouping, but built from this site's
 * real theme primitives rather than porting a fixed-dark-palette-specific
 * layout that assumes colors this page doesn't use.
 */
export default async function TechnicalSpecificationPage(props: PageProps<"/[locale]/technical-specification">) {
  const { locale } = await props.params;
  if (!hasLocale(locale) || locale !== "en") notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Technical Specification"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.company), label: d.nav.company }]}
      />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">Technical Specification</p>
        <h1 className="mt-4">{ENGINE_INTRO.h2}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{ENGINE_INTRO.lead}</p>
        <p className="mt-3 max-w-3xl body-copy leading-relaxed text-muted-foreground">{ENGINE_INTRO.sub}</p>
      </header>

      <section aria-labelledby="disciplines" className="mt-12 border-t border-border pt-10">
        <h2 id="disciplines" className="h-sub">Four engineering disciplines</h2>
        <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {ENGINE_INTRO.disciplines.map((disc) => (
            <li key={disc.n} className="rounded-2xl border border-border bg-card p-6">
              <span className="mono-label text-primary-ink">{disc.n}</span>
              <span className="mt-2 block font-display body-lead font-bold leading-snug text-foreground">{disc.title}</span>
              <span className="mt-2 block body-copy leading-relaxed text-muted-foreground">{disc.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="whatitis" className="mt-14 border-t border-border pt-10">
        <h2 id="whatitis" className="h-sub">{ENGINE_WHAT_IT_IS.h2}</h2>
        {ENGINE_WHAT_IT_IS.paragraphs.map((p, i) => (
          <p key={i} className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{p}</p>
        ))}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="mono-label mb-3 text-muted-foreground">{ENGINE_WHAT_IT_IS.isNot.heading}</p>
            <ul className="flex flex-col gap-2">
              {ENGINE_WHAT_IT_IS.isNot.items.map((item) => (
                <li key={item} className="body-copy leading-relaxed text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/40 bg-card p-6">
            <p className="mono-label mb-3 text-primary-ink">{ENGINE_WHAT_IT_IS.is.heading}</p>
            <ul className="flex flex-col gap-2">
              {ENGINE_WHAT_IT_IS.is.items.map((item) => (
                <li key={item} className="body-copy font-semibold leading-relaxed text-foreground">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="different" className="mt-14 border-t border-border pt-10">
        <h2 id="different" className="h-sub">{ENGINE_DIFFERENT.h2}</h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {ENGINE_DIFFERENT.compare.map((c) => (
            <div key={c.label} className={`p-8 ${c.accent ? "bg-primary/[0.06]" : "bg-card"}`}>
              <p className={`mono-label ${c.accent ? "font-bold text-foreground" : "text-muted-foreground"}`}>{c.label}</p>
              <p className="mt-3.5 font-display text-[1.25rem] font-bold text-foreground">{c.title}</p>
              <p className="mt-3.5 body-copy leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 border-t border-border pt-8 md:grid-cols-2">
          {ENGINE_DIFFERENT.panels.map((p) => (
            <div key={p.heading}>
              <p className="font-display body-lead font-bold text-foreground">{p.heading}</p>
              <p className="mt-2 body-copy leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="model" className="mt-14 border-t border-border pt-10">
        <h2 id="model" className="h-sub">{ENGINE_MODEL.h2}</h2>
        {ENGINE_MODEL.paragraphs.map((p, i) => (
          <p key={i} className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{p}</p>
        ))}
        <div className="mt-8 flex flex-col gap-6">
          {ENGINE_MODEL.movements.map((m) => (
            <div key={m.movement} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex items-baseline gap-3">
                <span className="mono-label text-primary-ink">{m.movement}</span>
                <span className="text-[0.8125rem] text-muted-foreground">{m.movementSub}</span>
              </div>
              <div className="flex flex-col gap-3 border-l-2 border-primary/40 pl-5">
                {m.layers.map((l) => (
                  <div key={l.code}>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="mono-label text-primary-ink">{l.code}</span>
                      <span className="font-display body-lead font-bold text-foreground">{l.name}</span>
                      <span className="text-[0.8125rem] text-muted-foreground">{l.sub}</span>
                    </div>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-muted-foreground">{l.contents}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="prose-measure mt-6 body-copy leading-relaxed text-muted-foreground">{ENGINE_MODEL.closing}</p>
      </section>

      <section aria-labelledby="lenses" className="mt-14 border-t border-border pt-10">
        <h2 id="lenses" className="h-sub">{ENGINE_LENSES.h2}</h2>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{ENGINE_LENSES.intro}</p>
        <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-3 lg:grid-cols-5">
          {ENGINE_LENSES.lenses.map((lens) => (
            <li key={lens.name} className="rounded-2xl border border-border bg-card p-5">
              <span className="block font-display text-[1rem] font-bold text-foreground">{lens.name}</span>
              <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-muted-foreground">{lens.body}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-2xl border border-border bg-muted p-6">
          <p className="font-display body-lead font-bold text-foreground">{ENGINE_LENSES.drillHeading}</p>
          <p className="mt-3 flex flex-wrap items-center gap-2 text-[0.875rem] font-medium text-foreground">
            {ENGINE_LENSES.drillPath.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {step}
                {i < ENGINE_LENSES.drillPath.length - 1 ? <span className="text-primary-ink" aria-hidden="true">&#8594;</span> : null}
              </span>
            ))}
          </p>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">{ENGINE_LENSES.drillBody}</p>
        </div>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
