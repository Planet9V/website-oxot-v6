import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO } from "./content";
import { ENISA_FINDING, ENISA_NIS360_URL } from "./content.reality";
import { HeroPath } from "./HeroPath";

/**
 * S00 · PATTERN 1 — CONSEQUENCE CASCADE HERO.
 *
 * Copy left, the product's own mechanic right. Everything in the copy pane is
 * server-rendered and present at first paint; neither the headline nor the lead
 * waits on the diagram, which is Pattern 1's own hard-won correction. The
 * drawing is `HeroPath.tsx`; this file owns only the two-pane contract.
 *
 * THE PANE-BALANCE MECHANISM. Both panes are direct children of ONE
 * `grid lg:grid-cols-12` row at its DEFAULT `items-stretch`, so the two cells
 * are equal by construction and the copy pane's own wrapper takes
 * `flex h-full flex-col justify-between`.
 *   · `items-center` is deliberately absent. Centring a short pane inside a
 *     tall row relates nothing to anything — it is the defect, centred. Pattern
 *     1 permits it only as post-hoc alignment once the ratio is already met by
 *     content, and it is not needed here.
 *   · There is NO hardcoded `min-h-[…]`. Every string on this page renders
 *     through `pick(..., locale)`, and a height tuned to one locale's copy
 *     length is wrong in the other by construction.
 *   · The copy pane earns its height BY INFORMATION, the remedy the rule names
 *     in preference to stretching: the ENISA NIS360 2026 finding is a real
 *     external source with a real URL, not filler sized to a ratio. See
 *     `content.reality.ts` for why that citation is the hero's while the CISA
 *     advisory is S01's.
 *
 * THE MARKS GO ON THE INNER CONTENT WRAPPERS, never on the stretched grid
 * cells — that is the anti-gaming part. `items-stretch` makes the two CHILDREN
 * equal whatever is inside them, so a harness reading the cells would pass a
 * stretched empty box. `data-balance-group="hero-panes"` therefore sits on the
 * copy pane's content wrapper here and on `HeroPath`'s own `figure`, and
 * `measure.mjs` reads real content height plus a real content-element count,
 * with the worse of the two governing.
 *
 * COLUMN SPLIT IS 7/5, COPY WIDER — the reverse of iteration 2's 5/7, and a
 * consequence of this diagram being portrait rather than landscape. A
 * six-station vertical cascade is tall and narrow; giving it the wider column
 * would add empty side margin inside its own panel while squeezing the headline
 * into more lines, pushing the ratio the wrong way on both measures at once.
 *
 * MOBILE: DOM order is copy then visual, which is Mobile Rules' mandatory order
 * and needs no ordering utility to achieve. The path does not autoplay below
 * `lg` — `HeroPath` gates that on a media query and offers a real 44px button
 * instead. Below `lg` the panes stop being siblings in a row and the ratio does
 * not apply.
 */
export function WaterHero({ locale }: { locale: Locale }) {
  return (
    <header className="oxot-canvas pt-10 lg:pt-14" id="hero">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        00 · {pick(HERO.eyebrow, locale)}
      </p>

      {/* No `items-*` class: the default IS `items-stretch`, and it is the
          mechanism. Writing it explicitly would suggest it were one option
          among several rather than the thing being relied on. */}
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex h-full flex-col justify-between">
            <div data-balance-group="hero-panes">
              {/* 1 */}
              <h1 data-balance-item className="text-balance">
                {pick(HERO.h1, locale)}
              </h1>

              {/* 2 */}
              <p
                data-balance-item
                className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground"
              >
                {pick(HERO.lead, locale)}
              </p>

              {/* 3 — the cited finding, as ONE content element rather than two.
                  The label and the sentence are a single claim with a single
                  citation; counting them separately would inflate this pane's
                  element count against the diagram's without adding a fact. */}
              <div data-balance-item className="mt-7 border-l-2 border-primary pl-4">
                <p className="mono-label text-primary-ink">
                  <a
                    href={ENISA_NIS360_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline focus-visible:underline"
                  >
                    {pick(ENISA_FINDING.sourceLabel, locale)}
                  </a>
                </p>
                <p className="prose-measure mt-2 body-copy leading-relaxed text-foreground">
                  {pick(ENISA_FINDING.finding, locale)}
                </p>
              </div>

              {/* 4 */}
              <div data-balance-item className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="cta-lift">
                  <Link href={localePath(locale, PATHS.contact)}>
                    {pick(HERO.ctaPrimary, locale)}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={localePath(locale, PATHS.cdt2)}>
                    {pick(HERO.ctaSecondary, locale)}
                  </Link>
                </Button>
              </div>

              {/* 5 — the brief's own secondary conversion (source L26). */}
              <p data-balance-item className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {pick(HERO.note, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroPath locale={locale} />
        </div>
      </div>
    </header>
  );
}
