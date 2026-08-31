import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO } from "./content";
import { StatusDot } from "./StatusDot";

/**
 * A dashboard "status strip" replaces energy-utilities' single-line-diagram
 * hero panel — a row of monospace stat-readout tiles (tabular-nums, a
 * status dot per tile) instead of a horizontal accent line. Purely
 * descriptive counts of the page's own content, not live telemetry.
 */
export function HyperscaleHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <p className="oxot-kicker">Hyperscale &amp; Data Centers</p>
      <h1 className="mt-4">{pick(HERO.h1, locale)}</h1>
      <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="#model">{pick(HERO.ctaSecondary, locale)}</Link>
        </Button>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        {HERO.stats.map((s, i) => (
          <div key={i} className="flex flex-col gap-2 bg-card p-5">
            <div className="flex items-center gap-2">
              <StatusDot />
              <dt className="mono-label text-muted-foreground">{pick(s.label, locale)}</dt>
            </div>
            <dd className="font-mono text-3xl font-semibold tabular-nums text-foreground">{s.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
