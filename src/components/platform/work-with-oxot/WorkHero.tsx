import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { BlurFade } from "@/components/ui/blur-fade";
import { HERO } from "./content";

/**
 * A TEXT-ONLY HERO WITH NO BUTTON, deliberately.
 *
 * The Platform composition rules call for one strong final CTA on this page,
 * and this page's ask is the P&ID-and-asset-list offer at the bottom. A
 * primary button up here would be a second, weaker ask standing in front of
 * it — the failure /consulting's own header comment records having removed.
 * The only outbound link in the hero is the quiet route to /consulting, for
 * the reader who came looking for the service catalogue and is on the wrong
 * page; it is styled as a note, not as a call to action.
 *
 * The headline is the source's framing sentence broken at its own full stop:
 * the claim in foreground ink, its qualification in muted ink beneath. That
 * is a real semantic split, not a headline/strapline pair invented to fill
 * two slots.
 */
export function WorkHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <BlurFade inView direction="up" duration={0.5}>
        <p className="oxot-kicker">{pick(HERO.kicker, locale)}</p>
        <h1 className="h-page mt-5 text-foreground">
          {pick(HERO.h1Lead, locale)}{" "}
          <span className="block text-muted-foreground">{pick(HERO.h1Rest, locale)}</span>
        </h1>
      </BlurFade>

      <BlurFade inView direction="up" duration={0.5} delay={0.1}>
        <div className="mt-9 grid gap-6 border-t border-border pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <p className="body-lead leading-relaxed text-muted-foreground">{pick(HERO.body, locale)}</p>
          <div>
            <p className="body-lead leading-relaxed text-foreground">{pick(HERO.bodyTwo, locale)}</p>
            {/* /consulting renders both locales — no EN-only guard needed. */}
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {pick(HERO.consultingNote, locale)}{" "}
              <Link
                href={localePath(locale, PATHS.consulting)}
                className="mono-label border-b border-primary/45 font-bold text-primary-ink transition-colors duration-150 ease-brand hover:border-primary"
              >
                {pick(HERO.consultingCta, locale)} <span aria-hidden="true">&#8594;</span>
              </Link>
            </p>
          </div>
        </div>
      </BlurFade>
    </header>
  );
}
