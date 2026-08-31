import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { hasLocale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { Band, Plain } from "@/components/shell/band";
import { ThreeDoors } from "@/components/shell/three-doors";
import { SectionHead } from "@/components/cra/section-head";
import { SpecRow } from "@/components/company/page-kit";
import { EngagementDiagram } from "@/components/fdd/engagement-diagram";
import { DELIVERABLES, QUESTIONS, STATES, WORKSTREAMS } from "@/components/fdd/fdd";

/**
 * /facility-due-diligence — the methodology page.
 *
 * FDD is the first engagement in an OT security programme and the clearest
 * proof that OXOT is engineering-led rather than IT security pointed at a
 * factory. It had no page; the Company page could only ever carry a paragraph
 * of it.
 *
 * `ledeQuestion` is the owner's, supplied 2026-08-08, and it already asks the
 * question the page exists to answer: how do you defend assets without
 * knowing what you have? `lede1`/`lede2` were rewritten 2026-08-21 — the
 * supplied text ("the high-stakes world of industrial operations... is
 * pivotal", "robust, future-proof", "total cyber hygiene") read as generic
 * marketing copy against the rest of the site's evidence-first voice, and
 * used a word (`robust`) this project's own `BANNED` list in claims.ts
 * prohibits. The replacement states the same stakes concretely instead.
 */

export async function generateMetadata(
  props: PageProps<"/[locale]/facility-due-diligence">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  const t = (await getDictionary(locale)).fdd;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates(locale, PATHS.fdd)
  };
}

export default async function FddPage(props: PageProps<"/[locale]/facility-due-diligence">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);
  const t = d.fdd;

  return (
    <div className="pb-16">
      <div className="oxot-canvas">
      <Breadcrumb
        here={t.breadcrumb}
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.consulting), label: d.nav.consulting }]}
      />

      {/* ── HERO. The owner's own framing, and it is the right one: the page
             opens on the reader's problem, not on our service. ───────────── */}
      <section className="grid gap-10 pt-10 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-14 lg:pt-14">
        <div>
          <p className="oxot-kicker">{t.kicker}</p>
          <h1 className="mt-4">{t.heading}</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{t.lede1}</p>
          <p className="prose-measure mt-4 text-lg leading-relaxed text-muted-foreground">{t.lede2}</p>
          <p className="prose-measure mt-5 border-l-2 border-primary pl-5 text-lg leading-relaxed text-foreground">
            {t.ledeQuestion}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="mono-label font-bold text-foreground">{t.answersLabel}</p>
          <ul className="mt-4 list-none space-y-3 p-0">
            {QUESTIONS.map((q) => (
              <li
                key={q.en}
                className="border-t border-dashed border-border pt-3 body-copy leading-snug text-muted-foreground first:border-t-0 first:pt-0"
              >
                {pick(q, locale)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 01 · THE ARC ─────────────────────────────────────────────────── */}
      </div>

      <Band labelledBy="states">
        <SectionHead n="01" id="states" title={t.statesTitle} dek={t.statesDek} />
        <ol className="mt-10 grid list-none gap-4 p-0 lg:grid-cols-3">
          {STATES.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <p className="mono-label text-primary-ink">{s.n}</p>
              <h3 className="h-card mt-2 text-foreground">{pick(s.term, locale)}</h3>
              <p className="mt-3 body-copy leading-relaxed text-muted-foreground">{pick(s.body, locale)}</p>
            </li>
          ))}
        </ol>
      </Band>

      {/* ── 02 · THE ENGAGEMENT, DRAWN ───────────────────────────────────── */}
      <Plain labelledBy="engagement">
        <SectionHead n="02" id="engagement" title={t.engagementTitle} dek={t.engagementDek} />
        <div className="mt-10">
          <EngagementDiagram locale={locale} />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div>
            <p className="mono-label mb-3 font-bold text-foreground">{t.stage1}</p>
            <p className="body-copy leading-relaxed text-muted-foreground">{t.stage1Body}</p>
          </div>
          <div>
            <p className="mono-label mb-3 font-bold text-foreground">{t.stage2}</p>
            <p className="body-copy leading-relaxed text-muted-foreground">{t.stage2Body}</p>
          </div>
          <div>
            <p className="mono-label mb-3 font-bold text-foreground">{t.stage3}</p>
            <p className="body-copy leading-relaxed text-muted-foreground">{t.stage3Body}</p>
          </div>
        </div>
      </Plain>

      {/* ── 03 · ON SITE ─────────────────────────────────────────────────── */}
      <Band labelledBy="workstreams">
        <SectionHead n="03" id="workstreams" title={t.workstreamsTitle} dek={t.workstreamsDek} />
        <ul className="mt-10 grid list-none gap-4 p-0 lg:grid-cols-2">
          {WORKSTREAMS.map((w) => (
            <li key={w.n} className="rounded-2xl border border-border bg-card p-6">
              <p className="mono-label text-primary-ink">{w.n}</p>
              <h3 className="h-card mt-2 text-foreground">{pick(w.term, locale)}</h3>
              <p className="mt-3 body-copy leading-relaxed text-muted-foreground">{pick(w.body, locale)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-border bg-muted p-6 sm:p-8">
          <h3 className="h-sub">{t.sectorTitle}</h3>
          <p className="prose-measure mt-3 leading-relaxed text-muted-foreground">{t.sectorBody}</p>
        </div>
      </Band>

      {/* ── 04 · WHAT COMES OUT ──────────────────────────────────────────── */}
      <Plain labelledBy="deliverables">
        <SectionHead n="04" id="deliverables" title={t.deliverablesTitle} dek={t.deliverablesDek} />
        <ul className="mt-10 grid list-none gap-3 p-0 lg:grid-cols-2">
          {DELIVERABLES.map((x) => (
            <li
              key={x.en}
              className="border-l-2 border-border pl-4 body-copy leading-relaxed text-muted-foreground"
            >
              {pick(x, locale)}
            </li>
          ))}
        </ul>
      </Plain>

      {/* ── 05 · TWO ENGAGEMENTS ─────────────────────────────────────────── */}
      <Band labelledBy="cases">
        <SectionHead n="05" id="cases" title={t.casesTitle} dek={t.casesDek} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[
            { term: t.caseAName, rows: [t.caseASituation, t.caseAProgramme, t.caseAOnSite, t.caseAChanged] },
            { term: t.caseBName, rows: [t.caseBSituation, t.caseBProgramme, t.caseBOnSite, t.caseBChanged] }
          ].map((c) => (
            <article key={c.term} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="h-sub">{c.term}</h3>
              <dl className="mt-5">
                <SpecRow k={t.caseSituation}>{c.rows[0]}</SpecRow>
                <SpecRow k={t.caseProgramme}>{c.rows[1]}</SpecRow>
                <SpecRow k={t.caseOnSite}>{c.rows[2]}</SpecRow>
                <SpecRow k={t.caseChanged}>{c.rows[3]}</SpecRow>
              </dl>
            </article>
          ))}
        </div>
        <p className="prose-measure mt-6 text-sm leading-relaxed text-muted-foreground">{t.casesNote}</p>
      </Band>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
