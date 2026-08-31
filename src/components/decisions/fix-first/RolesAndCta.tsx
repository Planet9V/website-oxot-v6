import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { CTA, ROLES } from "./content";

/**
 * The last two beats of the Visual Foundation Spec's switchboard panel —
 * relevant roles, then the CTA — kept in one section because they are one
 * movement: three named readers, what changes for each, and then the ask
 * that follows from all three wanting the same board.
 *
 * The roles run as a ledger rather than three equal cards. They are not
 * interchangeable: the security team holds the backlog, engineering has
 * to act on it, and leadership signs what gets accepted. The order is the
 * order the decision travels in.
 */
export function RolesAndCta({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="roles" className="mt-20 border-t border-border pt-12">
      <h2 id="roles" className="h-section">
        {pick(ROLES.h2, locale)}
      </h2>

      <dl className="mt-10 flex flex-col gap-0 border-t border-primary/40">
        {ROLES.rows.map((row, i) => (
          <BlurFade key={i} inView direction="up" duration={0.4} delay={i * 0.07}>
            <div className="grid grid-cols-1 gap-2 border-b border-border py-6 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-8">
              <dt className="flex items-baseline gap-3">
                <span className="mono-label text-primary-ink">{`0${i + 1}`}</span>
                <span className="h-card text-lg text-foreground">{pick(row.role, locale)}</span>
              </dt>
              <dd className="text-base leading-relaxed text-muted-foreground">{pick(row.body, locale)}</dd>
            </div>
          </BlurFade>
        ))}
      </dl>

      <BlurFade inView direction="up" duration={0.45}>
        <div className="mt-14 rounded-2xl border border-primary/40 bg-card p-7 sm:p-10">
          <h2 className="h-sub">{pick(CTA.h2, locale)}</h2>
          <p className="prose-measure mt-4 text-base leading-relaxed text-muted-foreground">
            {pick(CTA.body, locale)}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="cta-lift">
              <Link href={localePath(locale, PATHS.contact)}>{pick(CTA.primary, locale)}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`${localePath(locale, PATHS.cdt2)}#decide`}>{pick(CTA.secondary, locale)}</Link>
            </Button>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
