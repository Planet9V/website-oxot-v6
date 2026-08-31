import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { BlurFade } from "@/components/ui/blur-fade";
import { EVIDENCE } from "./content";

/**
 * Inputs on the left, outputs on the right, with the board sitting
 * implicitly between them — two lists rather than one, because the
 * distinction the section is making is precisely that OXOT supplies
 * neither side's raw material: the consequence ratings are the
 * operator's own studies and the reachability is their own network.
 *
 * The IEC 62443 link is safe in both locales — /assurance/iec-62443 is
 * one of the five bilingual framework pages, unlike the EN-only
 * /assurance index it sits under, so no `locale === "en"` guard is
 * needed here.
 */
export function EvidenceAndOutput({ locale }: { locale: Locale }) {
  const t = EVIDENCE;
  return (
    <section aria-labelledby="evidence" className="mt-20 border-t border-border pt-12">
      <h2 id="evidence" className="h-section">
        {pick(t.h2, locale)}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <BlurFade inView direction="up" duration={0.45}>
          <div className="h-full rounded-2xl border border-border bg-muted/40 p-6 sm:p-7">
            <p className="mono-label">{pick(t.inputsHeading, locale)}</p>
            <ul className="mt-5 flex list-none flex-col gap-5 p-0">
              {t.inputs.map((item, i) => (
                <li key={i} className="border-t border-border pt-5 first:border-t-0 first:pt-0">
                  <h3 className="h-micro text-foreground">{pick(item.name, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(item.body, locale)}</p>
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>

        <BlurFade inView direction="up" duration={0.45} delay={0.1}>
          <div className="h-full rounded-2xl border border-primary/40 bg-card p-6 sm:p-7">
            <p className="mono-label text-primary-ink">{pick(t.outputsHeading, locale)}</p>
            <ul className="mt-5 flex list-none flex-col gap-5 p-0">
              {t.outputs.map((item, i) => (
                <li key={i} className="border-t border-border pt-5 first:border-t-0 first:pt-0">
                  <h3 className="h-micro text-foreground">{pick(item.name, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(item.body, locale)}</p>
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-l-2 border-border pl-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
        <p className="prose-measure text-base leading-relaxed text-foreground">{pick(t.complianceNote, locale)}</p>
        <Link
          href={localePath(locale, PATHS.assuranceIec62443)}
          className="mono-label shrink-0 border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          {pick(t.complianceLink, locale)} <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
    </section>
  );
}
