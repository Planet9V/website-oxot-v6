/**
 * Hero. Editorial rather than promotional: the headline and standfirst on
 * the left, and — instead of a product image — the specification's own
 * standing facts as a spec panel on the right, including the ERA's caveat
 * that TS 50701 is not, as such, a mandatory EU standard. A reader who
 * arrives believing this is a legal obligation should learn otherwise
 * above the fold, not in a footnote.
 *
 * The system-to-evidence chain runs full width beneath, as the first
 * instance of the trace this whole page is built from.
 */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { FACTS, HERO } from "./content";
import { SpecPanel, SpecRow } from "./kit";
import { TraceRail } from "./trace";

export function Ts50701Hero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div>
          <p className="oxot-kicker">{pick(HERO.kicker, locale)}</p>
          <h1 className="h-page mt-5 text-foreground">
            {pick(HERO.h1, locale)}
          </h1>
          <p className="prose-measure mt-7 text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
          <p className="prose-measure mt-4 body-lead leading-relaxed text-foreground">{pick(HERO.body, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Link>
            </Button>
          </div>
        </div>

        <SpecPanel label="The specification, in brief">
          {FACTS.map((f) => (
            <SpecRow key={f.k} k={f.k}>
              {pick(f.v, locale)}
            </SpecRow>
          ))}
        </SpecPanel>
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <TraceRail stages={HERO.chain} label={pick(HERO.chainLabel, locale)} locale={locale} />
      </div>
    </header>
  );
}
