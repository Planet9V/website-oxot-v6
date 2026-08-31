import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO } from "./content";
import { HeroCanvas } from "./HeroCanvas";

/**
 * S00 · PATTERN 1 — CONSEQUENCE CASCADE HERO.
 *
 * Copy left, the product's own mechanic right. Everything in the copy pane is
 * server-rendered and present at first paint; neither the headline nor the lead
 * waits on the diagram, which is Pattern 1's own hard-won correction. The drawing
 * and the segment toggle that re-draws it are `HeroCanvas.tsx`; this file owns
 * only the two-pane contract and the copy.
 *
 * THIS FILE STAYS A SERVER COMPONENT, and that is why the canvas is a separate
 * file rather than a `"use client"` directive at the top of this one. The toggle
 * needs `useState`, and hoisting that here would pull the headline, the lead,
 * both CTAs and the secondary-conversion line into the client bundle for no
 * reason — none of them is interactive. The state lives at the one place that has
 * both the control and the thing it changes.
 *
 * NOT `SectionA`/`SectionB`/`SectionC`. Those three shells in `Rule.tsx` open a
 * BODY section with the signalling-block datum run above an h2. The hero
 * terminates nothing and opens nothing — it is the top of the page — so it takes
 * its own treatment and prints the section ordinal inline instead, the same way
 * `Rule.tsx`'s own H-D case sits outside the shells rather than inventing a
 * fourth wrapper for a single caller.
 *
 * THE PANE-BALANCE MECHANISM. Both panes are direct children of ONE
 * `grid lg:grid-cols-12` row at its DEFAULT `items-stretch`, so the two cells are
 * equal by construction and the copy pane's own wrapper takes `flex h-full
 * flex-col`.
 *   · `items-center` is deliberately absent. Centring a short pane inside a tall
 *     row relates nothing to anything — it is the defect, centred. Pattern 1
 *     permits it only as post-hoc alignment once the ratio is already met by
 *     content, and it is not needed here.
 *   · There is NO hardcoded `min-h-[…]`. Every string on this page renders through
 *     `pick(..., locale)`, and a height tuned to one locale's copy length is wrong
 *     in the other by construction.
 *   · THE CANVAS WAS SIZED TO THIS PANE, not the other way round. Four marked
 *     items is fewer than the sibling builds carry, because this hero's slice of
 *     `content.ts` holds four pieces of visitor copy and no more — the brief's
 *     hero block (source L34–41, plus the secondary conversion at L30) is exactly
 *     a headline, a lead, two CTAs and one ask. So `HeroCanvas` was drawn shorter
 *     instead: its band pitch is 82 units against the siblings' 84, its
 *     consequence chip 78 against 82–86, and the unbuilt-interaction placeholder
 *     paragraph both siblings print is absent here because this page's
 *     interaction IS built. That lands the figure near a 0.93 height-to-width
 *     ratio.
 *   · IF `measure.mjs` STILL READS THE PAIR UNDER PATTERN 1's 1.5x FLOOR, THE
 *     LEVER IS REAL CONTENT ON THIS SIDE — and the honest place to get it is the
 *     source, not this file. Stretching an empty box does not pass, and Pattern 1
 *     says so in as many words. A fifth paragraph written here to fill height
 *     would be invented copy on a page whose whole discipline is that nothing is.
 *
 * THE MARKS GO ON THE INNER CONTENT WRAPPERS, never on the stretched grid cells,
 * and that is the anti-gaming part: `items-stretch` makes the two CHILDREN equal
 * whatever is inside them, so a harness reading the cells would happily pass a
 * stretched empty box. `data-balance-group="hero-panes"` therefore sits on the
 * copy pane's content wrapper here and on `HeroCanvas`'s own `figure`, and
 * `measure.mjs` reads real content height plus a real `data-balance-item` count,
 * with the worse of the two governing. Four marked items here, five there.
 *
 * COLUMN SPLIT IS 6/6, and it is a consequence of what this diagram is rather
 * than a default. The drawing is a stack of signalling-block runs, and a block
 * run needs RUN LENGTH to read as one: the whole idiom is a rail DIVIDED at
 * joints, so the eye has to be able to see the divisions as divisions rather than
 * as a dashed line. Freight's busiest stratum puts three blocks on one rail;
 * squeezed into a 5-column pane each block falls under ~110px and its system name
 * wraps where it currently does not. Equal columns give the runs the width they
 * need without taking the headline below a comfortable measure.
 *
 * `HERO.segmentToggleNote` IS PRINTED NOWHERE ON THIS PAGE. It is the brief's
 * build instruction ("the model changes rather than merely swapping text", source
 * L65), not copy addressed to a visitor. `HeroCanvas` honours it by drawing the
 * selected segment's own systems as the rail's blocks; printing the instruction
 * beside the thing that satisfies it would put build direction on the page.
 *
 * MOBILE: DOM order is copy then visual, which is Mobile Rules' mandatory order
 * and needs no ordering utility to achieve. The cascade does not autoplay below
 * `lg` — `HeroCanvas` gates that on a media query and offers a real 44px button
 * instead — and the segment toggle rides at the top of the visual pane so it
 * still lands immediately above the model it re-draws. Below `lg` the panes stop
 * being siblings in a row and Pattern 1's ratio does not apply.
 */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <header className="oxot-canvas pt-10 lg:pt-14" id="hero">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        00 · {pick(HERO.eyebrow, locale)}
      </p>

      {/* No `items-*` class: the default IS `items-stretch`, and it is the
          mechanism. Writing it explicitly would suggest it were one option among
          several rather than the thing being relied on. */}
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="flex h-full flex-col">
            <div data-balance-group="hero-panes">
              {/* 1 — source L34, which the brief also makes `META.h1` verbatim. */}
              <h1 data-balance-item className="text-balance">
                {pick(HERO.h1, locale)}
              </h1>

              {/* 2 — source L36. */}
              <p
                data-balance-item
                className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground"
              >
                {pick(HERO.lead, locale)}
              </p>

              {/* 3 */}
              <div data-balance-item className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="cta-lift">
                  <Link href={localePath(locale, HERO.ctaPrimaryHref)}>
                    {pick(HERO.ctaPrimary, locale)}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={localePath(locale, HERO.ctaSecondaryHref)}>
                    {pick(HERO.ctaSecondary, locale)}
                  </Link>
                </Button>
              </div>

              {/* 4 — the brief's own secondary conversion (source L30). A
                  page-level ask, deliberately not dressed as a third button, and
                  set against the brand rule rather than as one more grey line:
                  it is the single thing this hero asks the visitor to DO offline,
                  and the artifact it names — an interlocking diagram, a signalling
                  architecture, a PTC map — is the same drawing the pane beside it
                  is built out of and the same one `Rule.tsx` takes its signature
                  from. */}
              <p
                data-balance-item
                className="prose-measure mt-7 border-l-2 border-primary pl-4 body-copy leading-relaxed text-foreground"
              >
                {pick(HERO.note, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <HeroCanvas locale={locale} />
        </div>
      </div>
    </header>
  );
}
