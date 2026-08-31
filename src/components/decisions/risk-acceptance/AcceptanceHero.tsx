import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO } from "./content";

/**
 * The hero puts a fragment of the artefact on screen before it makes any
 * claim about it: four header fields of a risk-acceptance record, set as
 * a document rather than as a feature list. The page argues that a
 * defensible non-decision is a document with an owner and an expiry — so
 * the first thing visible is those fields, not a reassurance.
 */
export function AcceptanceHero({ locale }: { locale: Locale }) {
  const t = HERO;
  return (
    <header className="pt-10 lg:pt-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-16">
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
              <Link href={localePath(locale, `${PATHS.cdt2}#decide`)}>{pick(t.ctaSecondary, locale)}</Link>
            </Button>
          </div>

          <blockquote className="prose-measure mt-10 border-l-2 border-primary py-1 pl-5 font-display body-lead font-bold leading-relaxed text-foreground">
            {pick(t.pullQuote, locale)}
          </blockquote>
        </div>

        {/* The document corner: the record's header block, ruled like a form. */}
        <aside className="rounded-xl border border-border bg-card">
          <p className="mono-label border-b border-border px-5 py-3 text-primary-ink">Risk-acceptance record</p>
          <dl className="m-0 divide-y divide-border">
            {t.strip.map((row) => (
              <div key={row.label.en} className="px-5 py-4">
                <dt className="mono-label">{pick(row.label, locale)}</dt>
                <dd className="mt-1.5 ml-0 text-sm leading-relaxed text-foreground">{pick(row.value, locale)}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </header>
  );
}
