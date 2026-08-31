import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { HERO } from "./content";
import { RailTrack } from "./RailTrack";
import { RailForkDiagram } from "./RailForkDiagram";

/**
 * Asymmetric hero, mimicking the Vercel/Wiz school of B2B hero: one huge
 * headline dominating ~60% of the width, a real illustration bleeding to
 * the edge on the remaining ~40% — not a boxed diagram competing for
 * attention, and not a flat text stack with a faint background texture.
 * The headline runs at roughly 2.3x the site's default h1 scale
 * (30/36px base -> ~88px here) specifically because that gap was the
 * single biggest, most concretely measured difference between this page
 * and the reference sites audited this session.
 *
 * The illustration (model-architecture.png) is a real, already-shipped
 * brand asset used elsewhere on /cdt-2 — a generic "engine" rendering,
 * not a claim that this is rail-specific UI. It's honest: an illustrative
 * concept image, the same category of asset Wiz's hand-drawn cloud
 * illustration is, not a fabricated product screenshot.
 *
 * The former hero content (shared operating model line + fork diagram)
 * moves to a secondary "how it works" band below the fold rather than
 * being the first thing on the page — it's still real and still animated,
 * it's just no longer competing with the headline for the reader's first
 * three seconds.
 */
export function RailHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <BlurFade inView direction="up" duration={0.5}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
          <div>
            <p className="oxot-kicker">Rail & Transportation</p>
            <h1 className="h-page mt-5 text-foreground">
              {pick(HERO.h1, locale)}
            </h1>
            <p className="prose-measure mt-7 text-lg leading-relaxed text-muted-foreground">{pick(HERO.lead, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Link>
              </Button>
            </div>
          </div>

          <div className="relative -mx-4 sm:mx-0">
            <Image
              src="/images/cdt2/model-architecture.png"
              alt="The Cyber Digital Twin's layered engine: facility physics and assets synchronized up through networks, data, and governance"
              width={1600}
              height={1600}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full [mask-image:radial-gradient(80%_80%_at_60%_45%,white,transparent)]"
            />
          </div>
        </div>
      </BlurFade>

      <BlurFade inView direction="up" duration={0.5} delay={0.1}>
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
          <BorderBeam size={140} duration={9} colorFrom="hsl(var(--primary))" colorTo="hsl(var(--primary) / 0)" />
          <p className="mono-label mb-6 text-muted-foreground">Shared operating model, before the pathway forks</p>
          <RailTrack nodes={HERO.chain} locale={locale} />
        </div>
      </BlurFade>

      <BlurFade inView direction="up" duration={0.5} delay={0.2}>
        <RailForkDiagram
          passengerLabel="Passenger Transit"
          passengerStack={pick(HERO.passengerStack, locale)}
          freightLabel="US Freight Rail"
          freightStack={pick(HERO.freightStack, locale)}
          forkNote={pick(HERO.forkNote, locale)}
        />
      </BlurFade>
    </header>
  );
}
