import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { SIBLINGS, CTA } from "./content";

/**
 * Orientation, then the ask.
 *
 * A SIBLING ROW LINKS ONLY IF ITS PAGE EXISTS — see content.ts's SIBLINGS
 * comment. Three of the four are built; "Can we change safely?" is not, so
 * it renders as plain text rather than a link to a 404. The row for this
 * page is marked with `aria-current` and is not a link to itself.
 *
 * Every link on this page (/contact, /cdt-2, the two sibling decisions)
 * renders in both locales, so none needs a `locale === "en"` guard — unlike
 * /assurance and /technical-specification, which are EN-only and are
 * deliberately not linked from here.
 */
export function InvestmentClose({ locale }: { locale: Locale }) {
  return (
    <>
      <section aria-labelledby="siblings" className="mt-16 border-t border-border pt-10">
        <p className="oxot-kicker">{pick(SIBLINGS.eyebrow, locale)}</p>
        <h2 id="siblings" className="mt-4 h-sub">
          {pick(SIBLINGS.h2, locale)}
        </h2>

        <ol className="mt-8 list-none p-0">
          {SIBLINGS.items.map((item, i) => {
            const current = i === SIBLINGS.currentIndex;
            return (
              <li
                key={item.n}
                aria-current={current ? "page" : undefined}
                className={`grid grid-cols-1 gap-2 border-l-2 py-4 pl-5 sm:grid-cols-[3rem_minmax(0,22rem)_1fr] sm:items-baseline sm:gap-6 ${
                  current ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <span
                  className={`font-display text-lg font-bold leading-none ${
                    current ? "text-primary-ink" : "text-muted-foreground"
                  }`}
                >
                  {item.n}
                </span>
                {item.path && !current ? (
                  <Link
                    href={localePath(locale, item.path)}
                    className="font-display text-lg font-bold tracking-tight text-foreground underline-offset-4 transition-colors duration-150 ease-brand hover:text-primary-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {pick(item.name, locale)}
                  </Link>
                ) : (
                  <span
                    className={`font-display text-lg font-bold tracking-tight ${
                      current ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {pick(item.name, locale)}
                  </span>
                )}
                <span className="text-sm leading-relaxed text-muted-foreground">{pick(item.question, locale)}</span>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{pick(SIBLINGS.note, locale)}</p>
      </section>

      <BlurFade inView direction="up" duration={0.5}>
        <section
          aria-labelledby="investment-cta"
          className="mt-16 rounded-2xl border border-border bg-muted/50 p-8 sm:p-12"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14">
            <div>
              <h2 id="investment-cta" className="h-section">
                {pick(CTA.h2, locale)}
              </h2>
              <p className="prose-measure mt-5 text-base leading-relaxed text-muted-foreground">
                {pick(CTA.body, locale)}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg">
                <Link href={localePath(locale, PATHS.contact)}>{pick(CTA.primary, locale)}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`${localePath(locale, PATHS.cdt2)}#engine`}>{pick(CTA.secondary, locale)}</Link>
              </Button>
            </div>
          </div>
        </section>
      </BlurFade>
    </>
  );
}
