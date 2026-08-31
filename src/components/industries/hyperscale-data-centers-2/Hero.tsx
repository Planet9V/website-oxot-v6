import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO, MODEL } from "./content";
import { HeroCascade } from "./HeroCascade";

/**
 * S00 · PATTERN 1 — CONSEQUENCE CASCADE HERO.
 *
 * Copy left, the product's own mechanic right. Everything in the copy pane is
 * server-rendered and present at first paint; neither the headline nor the lead
 * waits on the diagram, which is Pattern 1's own hard-won correction. The
 * drawing is `HeroCascade.tsx`; this file owns only the two-pane contract and
 * the copy.
 *
 * THIS FILE STAYS A SERVER COMPONENT, and that is why the canvas is a separate
 * file rather than a `"use client"` directive at the top of this one. The
 * play/replay control needs `useState`, and hoisting that here would pull the
 * headline, the lead and both CTAs into the client bundle for no reason — none
 * of them is interactive.
 *
 * NOT `SectionA`/`SectionB`/`SectionC`. Those three shells in `Rule.tsx` open a
 * BODY section with the A/B datum pair above an h2. The hero terminates nothing
 * and opens nothing — it is the top of the page — so it takes its own treatment
 * and prints the section ordinal inline instead, the same way `Rule.tsx`'s own
 * H-D case sits outside the shells rather than inventing a fourth wrapper for a
 * single caller.
 *
 * THE SECONDARY CTA'S HREF IS BUILT HERE, AND ON PURPOSE. `content.ts` ships
 * `HERO.ctaSecondary` with no `ctaSecondaryHref` beside it, unlike every sibling
 * -2 page, because this page's secondary conversion is not an off-page route:
 * source L31 states it as "Explore the interactive hyperscale model" and L538
 * lists that model as a section OF THIS PAGE. So the href is the in-page anchor
 * `#${MODEL.id}`, composed from the same constant S01 renders as its section id
 * rather than from a hand-typed string — which is what makes the two sides of
 * the anchor contract impossible to drift apart. `localePath` is deliberately
 * NOT applied: a fragment is not a route, and prefixing it with a locale would
 * turn a same-page jump into a navigation.
 *
 * NO THIRD LINE UNDER THE CTAs. Rail's and Manufacturing's heroes each print a
 * `HERO.note` beneath their buttons because on those pages the stated secondary
 * conversion is a distinct "bring one artifact" ask. `content.ts` records why
 * this page has no such field: here the secondary conversion IS the secondary
 * CTA, so restating it beneath itself would print the same sentence twice, and
 * this page's only artifact ask (source L492) belongs to the final CTA section.
 * The absence is the source's, not an omission.
 *
 * THE PANE-BALANCE MECHANISM. Both panes are direct children of ONE
 * `grid lg:grid-cols-12` row at its DEFAULT `items-stretch`, so the two cells are
 * equal by construction and the copy pane's own wrapper takes `flex h-full
 * flex-col`.
 *   · `items-center` is deliberately absent. Centring a short pane inside a tall
 *     row relates nothing to anything — it is the defect, centred. Pattern 1
 *     permits it only as post-hoc alignment once the ratio is already met by
 *     content, and it is not needed here.
 *   · There is NO hardcoded `min-h-[…]`. Every string on this page renders
 *     through `pick(..., locale)`, and a height tuned to one locale's copy length
 *     is wrong in the other by construction.
 *   · THIS COPY PANE CARRIES THREE MARKED ITEMS — one fewer than rail's four and
 *     three fewer than manufacturing's six — because this hero's slice of
 *     `content.ts` holds exactly three pieces of visitor copy: a headline, a lead
 *     and two CTAs. THE CANVAS WAS SIZED TO THAT, not the other way round:
 *     `HeroCascade`'s viewBox is 660 units wide against a ~360-unit height, a
 *     ratio well under both siblings', so the figure renders shorter beside a
 *     shorter pane. Width is the lever Pattern 1 actually permits, since it
 *     spreads the same real content rather than stretching an empty box.
 *   · IF `measure.mjs` LATER READS THE PAIR UNDER PATTERN 1's 0.67 FLOOR, THE
 *     LEVER IS REAL CONTENT ON THIS SIDE OR LESS HEIGHT ON THE OTHER — never a
 *     stretch container, and never a paragraph written here to fill space. The
 *     honest sources of more copy are `MODEL.purpose` and `MODEL.purposeTwo`
 *     (source L102), and they are deliberately NOT used here: they are S01's own
 *     stated purpose for the interactive model, and printing them in the hero
 *     would duplicate that section's lead one screen above it. NO MEASUREMENT
 *     HAS BEEN TAKEN — the route for this page does not exist yet, so this ratio
 *     is arithmetic from the two panes' constituent parts, not an observation.
 *
 * THE MARKS GO ON THE INNER CONTENT WRAPPERS, never on the stretched grid cells,
 * and that is the anti-gaming part: `items-stretch` makes the two CHILDREN equal
 * whatever is inside them, so a harness reading the cells would happily pass a
 * stretched empty box. `data-balance-group="hero-panes"` therefore sits on the
 * copy pane's content wrapper here and on `HeroCascade`'s own `figure`, and
 * `measure.mjs` reads real content height plus a real `data-balance-item` count,
 * with the worse of the two governing. Three marked items here, four there.
 *
 * COLUMN SPLIT IS 6/6, and it is a consequence of what this diagram is rather
 * than a default. The drawing is a stack of A/B path pairs, and a pair needs RUN
 * LENGTH to read as two parallel paths rather than as a thick line: the level's
 * own name sits INSIDE the channel the two runs enclose, so the run has to be
 * long enough to carry a string like "Data hall / availability-zone view" on one
 * line past the cross-tie. Squeezed into a 5-column pane those names wrap and the
 * pair stops reading as a pair. Equal columns give the runs the width they need
 * without taking the headline below a comfortable measure.
 *
 * MOBILE: DOM order is copy then visual, which is Mobile Rules' mandatory order
 * and needs no ordering utility to achieve. The cascade does not autoplay below
 * `lg` — `HeroCascade` gates that on a media query and offers a real 44px button
 * instead. Below `lg` the panes stop being siblings in a row and Pattern 1's
 * ratio does not apply.
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
              {/* 1 — source L35, which the brief also makes `META.h1` verbatim
                  at L561. */}
              <h1 data-balance-item className="text-balance">
                {pick(HERO.h1, locale)}
              </h1>

              {/* 2 — source L37. */}
              <p
                data-balance-item
                className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground"
              >
                {pick(HERO.lead, locale)}
              </p>

              {/* 3 — source L42 then L41, in the conversion hierarchy L25–L31
                  states rather than the order L41–L42 lists them in;
                  `content.ts` records that call and why. */}
              <div data-balance-item className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="cta-lift">
                  <Link href={localePath(locale, HERO.ctaPrimaryHref)}>
                    {pick(HERO.ctaPrimary, locale)}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`#${MODEL.id}`}>{pick(HERO.ctaSecondary, locale)}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <HeroCascade locale={locale} />
        </div>
      </div>
    </header>
  );
}
