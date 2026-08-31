import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { HERO, PANEL } from "./content";

/**
 * A SPEC SHEET, NOT A PICTURE. The industry pages open with a headline
 * beside a brand illustration; this page opens with the headline beside
 * the Visual Foundation Spec's switchboard panel rendered as a literal
 * specification — question, evidence, action, output, roles — because
 * that panel IS the content of this decision, and standing it up as the
 * hero's second column means the reader has the whole decision before
 * scrolling, then spends the rest of the page on the board it produces.
 *
 * No image is used. There is no honest asset for "a prioritized backlog",
 * and a fabricated dashboard screenshot is exactly what this project has
 * been told not to produce.
 */
export function FixFirstHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <BlurFade inView direction="up" duration={0.5}>
          <div>
            <p className="oxot-kicker">{pick(HERO.eyebrow, locale)}</p>
            <h1 className="h-page mt-5 text-foreground">
              {pick(HERO.h1, locale)}
            </h1>
            <p className="mt-6 max-w-[30ch] font-serif text-2xl leading-snug text-primary-ink sm:text-[1.75rem]">
              {pick(HERO.question, locale)}
            </p>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {pick(HERO.lead, locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`${localePath(locale, PATHS.cdt2)}#decide`}>{pick(HERO.ctaSecondary, locale)}</Link>
              </Button>
            </div>
          </div>
        </BlurFade>

        <BlurFade inView direction="up" duration={0.5} delay={0.12}>
          <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
              <h2 className="h-micro text-foreground">{pick(PANEL.heading, locale)}</h2>
              <span className="mono-label">01 / 04</span>
            </div>
            <dl className="divide-y divide-border">
              {PANEL.rows.map((row, i) => (
                <div key={i} className="px-5 py-4 sm:px-6">
                  <dt className="mono-label text-primary-ink">{pick(row.term, locale)}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground">{pick(row.body, locale)}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-border bg-muted/50 px-5 py-4 text-xs leading-relaxed text-muted-foreground sm:px-6">
              {pick(PANEL.note, locale)}
            </p>
          </div>
        </BlurFade>
      </div>
    </header>
  );
}
