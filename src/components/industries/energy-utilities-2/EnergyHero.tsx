import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO } from "./content";
import { CascadeCanvas } from "./CascadeCanvas";

/**
 * S00 · PATTERN 1 — CONSEQUENCE CASCADE HERO.
 *
 * Copy left, the product's own mechanic right. Everything in the copy pane is
 * server-rendered and present at first paint; neither the headline nor the lead
 * waits on the diagram, which is Pattern 1's own hard-won correction. The
 * drawing is `CascadeCanvas.tsx`; this file owns only the two-pane contract.
 *
 * NOT `SectionA`/`SectionB`/`SectionC`. Those three shells in `Rule.tsx` open a
 * BODY section with the single-line-diagram datum rule above an h2. The hero
 * terminates nothing and opens nothing — it is the top of the page — so it takes
 * its own treatment and prints the section ordinal inline instead, the same way
 * `Rule.tsx`'s own H-D case sits outside the shells rather than inventing a
 * fourth wrapper for one caller.
 *
 * THE PANE-BALANCE MECHANISM. Both panes are direct children of ONE
 * `grid lg:grid-cols-12` row at its DEFAULT `items-stretch`, so the two cells
 * are equal by construction and the copy pane's own wrapper takes
 * `flex h-full flex-col`.
 *   · `items-center` is deliberately absent. Centring a short pane inside a tall
 *     row relates nothing to anything — it is the defect, centred. Pattern 1
 *     permits it only as post-hoc alignment once the ratio is already met by
 *     content, and it is not needed here.
 *   · There is NO hardcoded `min-h-[…]`. Every string on this page renders
 *     through `pick(..., locale)`, and a height tuned to one locale's copy
 *     length is wrong in the other by construction.
 *   · The copy pane earns its height BY INFORMATION, and the first version of
 *     this file ASSERTED that without measuring it. It was wrong: on 2026-08-26
 *     `measure.mjs` read 415px of copy against a 700px canvas, h=0.59 against
 *     the 0.67 floor, at both 1440 and 2560.
 *
 * HOW THAT WAS SETTLED, because the obvious repair is the wrong one. Shrinking
 * the canvas to 619px needs `VB_H` down 356→289, and there is no honest 19% in
 * it: a band's own content already fills 72.5 of its 84-unit pitch, and the
 * 22-unit asset glyph — not the text — is what sets the floor. The other lever,
 * widening `VB_W` so the width-locked SVG renders shorter, shrinks every glyph
 * and label with it: stratum labels fall from 13.1px to 11.8px at 1440 and from
 * 9.9px to 8.9px at 1024, under `CascadeCanvas`'s own 11px technical-label
 * floor. Trading legibility for a ratio is the defect wearing the fix's clothes.
 * So the copy pane grew instead, by real sourced content and not by padding:
 * source L59's second sentence came back from under the cascade card to sit with
 * its own first sentence here — see `CascadeCanvas`'s docblock for why that
 * sentence was mis-placed as a caption independent of any of this. The move
 * corrects both panes at once, and h now measures 0.83.
 *
 * THE MARKS GO ON THE INNER CONTENT WRAPPERS, never on the stretched grid cells,
 * and that is the anti-gaming part: `items-stretch` makes the two CHILDREN equal
 * whatever is inside them, so a harness reading the cells would happily pass a
 * stretched empty box. `data-balance-group="hero-panes"` therefore sits on the
 * copy pane's content wrapper here and on `CascadeCanvas`'s own `figure`, and
 * `measure.mjs` reads real content height plus a real `data-balance-item` count,
 * with the worse of the two governing. Six marked items here, five there.
 *
 * COLUMN SPLIT IS 6/6, and it is a consequence of what this diagram is rather
 * than a default. `water-wastewater-3` gives its copy the wider 7 because its
 * cascade is a narrow portrait station rail. This one is a stratum stack whose
 * every row is a full-width comma list of real equipment ("Protection relays,
 * RTUs, PLCs, DCS, SCADA, HMIs"); squeezed into a 5 those wrap to three lines
 * each and the busbars lose the run they need to read as busbars. Equal columns
 * give the drawing the width its rows actually need without taking the headline
 * below a comfortable measure.
 *
 * MOBILE: DOM order is copy then visual, which is Mobile Rules' mandatory order
 * and needs no ordering utility to achieve. The cascade does not autoplay below
 * `lg` — `CascadeCanvas` gates that on a media query and offers a real 44px
 * button instead. Below `lg` the panes stop being siblings in a row and Pattern
 * 1's ratio does not apply.
 */
export function EnergyHero({ locale }: { locale: Locale }) {
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

              {/* 3 — source L59's first sentence, and the reason the pane beside
                  it is a cascade rather than a topology picture. Set against the
                  brand rule rather than as another grey paragraph, because it is
                  the page's thesis, not supporting prose. */}
              <p
                data-balance-item
                className="prose-measure mt-7 border-l-2 border-primary pl-4 body-copy leading-relaxed text-foreground"
              >
                {pick(HERO.purpose, locale)}
              </p>

              {/* 4 — source L59's SECOND sentence, the other half of the same
                  paragraph. It moved here from under the cascade card, where it
                  read as that drawing's caption: it describes the product's
                  seven-layer model, and the drawing beside it has four strata
                  (L41–56), so a reader was left reconciling two numbers about
                  two different things. Supporting prose, so muted — the brand
                  rule above stays reserved for the thesis. */}
              <p
                data-balance-item
                className="prose-measure mt-5 body-copy leading-relaxed text-muted-foreground"
              >
                {pick(HERO.purposeTwo, locale)}
              </p>

              {/* 5 */}
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

              {/* 6 — the brief's own secondary conversion (source L26). A
                  page-level ask, deliberately not dressed as a third button. */}
              <p data-balance-item className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {pick(HERO.note, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <CascadeCanvas locale={locale} />
        </div>
      </div>
    </header>
  );
}
