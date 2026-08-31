import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO } from "./content";
import { WORKED_EXAMPLE } from "./content.workedExample";
import { SovereignSystemCanvas } from "./SovereignSystemCanvas";

/**
 * S00 · PATTERN 1 — CONSEQUENCE CASCADE HERO.
 *
 * Copy left, the product's own mechanic right. Everything in the copy pane is
 * server-rendered and present at first paint; neither the headline nor the lead
 * waits on the diagram, which is Pattern 1's own hard-won correction. The
 * drawing and its selector are `SovereignSystemCanvas.tsx`; this file owns only
 * the two-pane contract and the copy.
 *
 * NOT `SectionA`/`SectionB`/`SectionC`. Those three shells in `Rule.tsx` open a
 * BODY section with the boundary-crossing datum above an h2. The hero
 * terminates nothing and opens nothing — it is the top of the page — so it
 * takes its own treatment and prints the section ordinal inline instead, the
 * same way `Rule.tsx`'s own H-D case sits outside the shells rather than
 * inventing a fourth wrapper for a single caller.
 *
 * ─── WHICH CHAIN GOES WHERE, AND WHY ─────────────────────────────────────────
 *
 * `content.ts` hands the hero builder an explicit open decision: two chains
 * describe the same territory, neither is a superset, and "the hero builder
 * picks one for the visual and should say in code which, and why". This is that
 * statement.
 *
 * THE DRAWING USES THE BRIEF'S SIX-LAYER `SOVEREIGN_CHAIN`. It is the brief's
 * own named main visual ("Sovereign System Model", BRIEF L57), it is the chain
 * the two selector axes are specified against, and it is the only one that
 * splits infrastructure into a RESOURCE layer and a CONTROL layer — which is
 * what puts the sovereignty boundary between two named layers instead of inside
 * one, and that boundary is this page's entire shape language.
 *
 * THE COPY PANE USES THE CORPUS'S FIVE-NODE `HERO.chain`, in a different
 * REGISTER rather than as a second diagram: prose lines in a numbered stack, no
 * nodes, no run, no boundary. That distinction is load-bearing, because two
 * drawings of the same territory with different node counts side by side would
 * read as one drawing contradicting itself. One is the page saying what it
 * models; the other is the model. They are kept apart for the reason
 * `content.ts` gives for keeping both: the CORPUS chain ends on a DECISION
 * ("Cyber pathway → disruption → recovery decision") and the BRIEF's ends on an
 * OUTCOME ("Cyber or hybrid-event consequence"). Merging them would invent a
 * seventh reading neither source states, and dropping either would discard
 * approved copy with no upstream left to recover it from.
 *
 * THE CLAIM BOUNDARY IS PRINTED HERE, NOT IN THE CANVAS, and it is this page's
 * own string rather than the generic pattern literal. `OXOT_Layout_Styles.md`
 * Pattern 1 binds illustrative Twin scenarios to "Illustrative scenario — no
 * customer data"; this page's corpus carries a STRICTLY STRONGER, already-
 * sourced variant in `WORKED_EXAMPLE.tag` — "Illustrative scenario — no
 * operational, customer, or classified data" — which is the site-wide rule plus
 * this page's own two extra exclusions. On a defense and government page the
 * generic literal would be a downgrade, so the sourced one ships. Printing it
 * here does not relieve S06 of printing it beside the worked example itself:
 * `content.workedExample.ts` calls that mandatory, and this is an additional
 * statement at the top of the page, not a replacement for it.
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
 *   · The copy pane earns its height BY INFORMATION — five marked items, all of
 *     them sourced copy, none of them padding. The canvas beside it is the
 *     taller pane because it carries the 6×7 selector the brief asks for; if
 *     `measure.mjs` later reads the pair under the 0.67 floor, the levers in
 *     order are the canvas's own viewBox aspect (currently ~0.53 — wide and
 *     short precisely to hold this ratio) and then real content on this side.
 *     Never a stretch container: stretching an empty box does not pass, and
 *     Pattern 1 says so in as many words.
 *
 * THE MARKS GO ON THE INNER CONTENT WRAPPERS, never on the stretched grid cells,
 * and that is the anti-gaming part: `items-stretch` makes the two CHILDREN equal
 * whatever is inside them, so a harness reading the cells would happily pass a
 * stretched empty box. `data-balance-group="hero-panes"` therefore sits on the
 * copy pane's content wrapper here and on `SovereignSystemCanvas`'s own
 * `figure`, and `measure.mjs` reads real content height plus a real
 * `data-balance-item` count, with the worse of the two governing. Five marked
 * items on each side, so the count half of the ratio reads 1.00 and only the
 * height half can ever govern.
 *
 * COLUMN SPLIT IS 6/6, and it is a consequence of what the right pane is rather
 * than a default. That pane is not only a drawing: it carries two radio groups
 * of six and seven options at 44px targets, plus a four-field result strip.
 * Squeezed into a 5, the mission chips reflow from two rows to three, the
 * pressure chips from three to four, and the result strip loses its four-column
 * form — each of which makes the taller pane taller and the ratio worse. Equal
 * columns also keep the headline at a comfortable measure.
 *
 * MOBILE: DOM order is copy then visual, which is Mobile Rules' mandatory order
 * and needs no ordering utility to achieve. The path does not autoplay below
 * `lg` — `SovereignSystemCanvas` gates that on a media query and offers a real
 * 44px button instead. Below `lg` the panes stop being siblings in a row and
 * Pattern 1's ratio does not apply.
 */
export function DefenseHero({ locale }: { locale: Locale }) {
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
              {/* 1 — CORPUS L43, which BRIEF L15 carries identically. */}
              <h1 data-balance-item className="text-balance">
                {pick(HERO.h1, locale)}
              </h1>

              {/* 2 — CORPUS L44–L46. */}
              <p
                data-balance-item
                className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground"
              >
                {pick(HERO.lead, locale)}
              </p>

              {/* 3 — the CORPUS's own five-node chain, as PROSE rather than as a
                  second diagram. See this file's docblock for why the two chains
                  are rendered in different registers instead of merged. A real
                  `<ol>`: the order IS the content, so it is carried by the markup
                  and never by position alone. The mono ordinal is the list's own
                  index — a fact about the list, not an invented engineering tag,
                  which this page bars everywhere. */}
              <ol data-balance-item className="mt-8 border-t border-border">
                {HERO.chain.map((step, i) => (
                  <li
                    key={pick(step, "en")}
                    className="flex items-baseline gap-4 border-b border-border py-3.5"
                  >
                    <span className="mono-label shrink-0 text-primary-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="body-copy leading-relaxed text-foreground">
                      {pick(step, locale)}
                    </span>
                  </li>
                ))}
              </ol>

              {/* 4 — CORPUS L47/L48 = BRIEF L21/L22, both to real live routes.
                  No page on this site ships a dead CTA. */}
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

              {/* 5 — the claim boundary, printed rather than implied, set against
                  the brand rule so it reads as a condition on everything above
                  and beside it rather than as one more grey line. Body size, not
                  fine print. */}
              <p
                data-balance-item
                className="prose-measure mt-7 border-l-2 border-primary pl-4 body-copy leading-relaxed text-foreground"
              >
                {pick(WORKED_EXAMPLE.tag, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <SovereignSystemCanvas locale={locale} />
        </div>
      </div>
    </header>
  );
}
