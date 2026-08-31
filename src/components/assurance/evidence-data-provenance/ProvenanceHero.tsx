import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { EvidenceChain } from "./EvidenceChain";
import { HERO } from "./content";

/**
 * The hero states the claim and then immediately draws it: the chain sits
 * beside the copy rather than below it, so the first thing on screen is
 * the structure the page is arguing for, not an assertion that OXOT can
 * be trusted. That ordering is the whole reason the content-to-visual
 * mapping table forbids a "Trusted" badge for this content type.
 */
export function ProvenanceHero({ locale }: { locale: Locale }) {
  const t = HERO;
  return (
    <header className="pt-10 lg:pt-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-16">
        <div>
          <p className="oxot-kicker">{pick(t.kicker, locale)}</p>
          <h1 className="mt-4">{pick(t.h1, locale)}</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground">{pick(t.lead, locale)}</p>
          <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">
            {pick(t.body, locale)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={localePath(locale, PATHS.contact)}>{pick(t.ctaPrimary, locale)}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localePath(locale, PATHS.cdt2)}>{pick(t.ctaSecondary, locale)}</Link>
            </Button>
          </div>

          <blockquote className="prose-measure mt-10 border-l-2 border-primary py-1 pl-5 font-display body-lead font-bold leading-relaxed text-foreground">
            {pick(t.pullQuote, locale)}
          </blockquote>
        </div>

        <EvidenceChain
          label="Source to accountability"
          rungs={t.chain.map((c) => ({ title: pick(c, locale) }))}
        />
      </div>
    </header>
  );
}
