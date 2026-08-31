import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { AUTHORITY, CTA, ILLUSTRATIVE, PANELS, SCOPE, type PanelField } from "./content";

/**
 * Everything below the before/after comparison: the three information
 * panels §7 requires, the wider set of changes the same method covers, the
 * authority boundary, and the close.
 *
 * THE PANELS ARE A RECORD, AND THE THIRD ONE IS THE DELIVERABLE. Each
 * panel carries the semantic colour of what it describes — baseline red,
 * proposed control amber, decision output green — so the three columns
 * read as the same three states the two drawings above them used, rather
 * than as three neutral feature cards. Decision output is the one drawn on
 * a filled ground, because it is the artefact that actually leaves the
 * engagement.
 *
 * NO TICKS ANYWHERE. The authority points are set as a ruled list with a
 * leading rule, not a checkmark column — a page that argues against
 * treating a modelled closure as a guarantee should not decorate its own
 * limitations with approval marks.
 */

/** Panel accents, drawn from the same tokens the route drawings use. */
const ACCENT = {
  baseline: "hsl(var(--destructive))",
  control: "hsl(var(--primary))",
  output: "hsl(var(--reg-nis2))"
} as const;

function RecordPanel({
  tag,
  fields,
  accent,
  filled,
  locale
}: {
  tag: string;
  fields: readonly PanelField[];
  accent: string;
  filled?: boolean;
  locale: Locale;
}) {
  return (
    <div className={`rounded-2xl border border-border p-6 shadow-sm ${filled ? "bg-muted/60" : "bg-card"}`}>
      <h3 className="mono-label flex items-center gap-2.5 text-foreground">
        <span aria-hidden="true" className="h-1 w-6 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
        {tag}
      </h3>
      <dl className="mt-6 space-y-5">
        {fields.map((field) => (
          <div key={field.label.en}>
            <dt className="text-sm font-semibold text-foreground">{pick(field.label, locale)}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pick(field.body, locale)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ChangePanels({ locale }: { locale: Locale }) {
  const t = PANELS;
  return (
    <section aria-labelledby="panels" className="mt-20 border-t border-border pt-10">
      <p className="oxot-kicker">{pick(t.eyebrow, locale)}</p>
      <h2 id="panels" className="h-section mt-4 text-foreground">
        {pick(t.h2, locale)}
      </h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.intro, locale)}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <RecordPanel
          locale={locale}
          tag={pick(t.baseline.tag, locale)}
          fields={t.baseline.fields}
          accent={ACCENT.baseline}
        />
        <RecordPanel
          locale={locale}
          tag={pick(t.control.tag, locale)}
          fields={t.control.fields}
          accent={ACCENT.control}
        />
        <RecordPanel
          locale={locale}
          tag={pick(t.output.tag, locale)}
          fields={t.output.fields}
          accent={ACCENT.output}
          filled
        />
      </div>

      <p className="mono-label mt-6">
        <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-1 text-primary-ink">
          {pick(ILLUSTRATIVE, locale)}
        </span>
      </p>
    </section>
  );
}

export function ChangeScope({ locale }: { locale: Locale }) {
  const t = SCOPE;
  return (
    <section aria-labelledby="scope" className="mt-20 border-t border-border pt-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        <div>
          <p className="oxot-kicker">{pick(t.eyebrow, locale)}</p>
          <h2 id="scope" className="h-sub mt-4 text-foreground">
            {pick(t.h2, locale)}
          </h2>
          <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
            {pick(t.intro, locale)}
          </p>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {t.cards.map((card) => (
              <div key={card.title.en} className="bg-card p-6">
                <h3 className="h-micro text-foreground">{pick(card.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(card.body, locale)}</p>
              </div>
            ))}
          </div>
          <p className="prose-measure mt-6 font-display text-lg font-bold leading-snug text-foreground">
            {pick(t.closing, locale)}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ChangeAuthority({ locale }: { locale: Locale }) {
  const t = AUTHORITY;
  return (
    <section aria-labelledby="authority" className="mt-20 rounded-2xl border border-border bg-muted/50 p-6 sm:p-10">
      <p className="oxot-kicker">{pick(t.eyebrow, locale)}</p>
      <h2 id="authority" className="h-sub mt-4 text-foreground">
        {pick(t.h2, locale)}
      </h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.body, locale)}
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
        {t.points.map((point: Bilingual) => (
          <li key={point.en} className="flex gap-3 border-t border-border pt-4">
            <span aria-hidden="true" className="mt-2.5 h-px w-5 shrink-0 bg-primary" />
            <span className="text-sm font-semibold leading-relaxed text-foreground">{pick(point, locale)}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-[70ch] border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
        {pick(t.dataNote, locale)}
      </p>
    </section>
  );
}

export function ChangeCta({ locale }: { locale: Locale }) {
  /* /technical-specification is EN-only (see PATHS' own comment); Dutch
     readers get /cdt-2, which renders in both locales. */
  const detailHref = locale === "en" ? PATHS.technicalSpecification : PATHS.cdt2;
  return (
    <section aria-labelledby="cta" className="mt-20 border-t border-border pt-12">
      <h2 id="cta" className="h-section text-foreground">
        {pick(CTA.h2, locale)}
      </h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(CTA.body, locale)}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={localePath(locale, PATHS.contact)}>{pick(CTA.primary, locale)}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={localePath(locale, detailHref)}>{pick(CTA.secondary, locale)}</Link>
        </Button>
      </div>
    </section>
  );
}
