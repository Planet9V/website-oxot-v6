import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { ENISA_URL, HERO } from "./content";
import { Datum } from "./Rule";
import { ProfilePanel } from "./ProfilePanel";

/**
 * S00 · PATTERN 1 — CONSEQUENCE CASCADE HERO. Two panes: strategic copy left,
 * the product's own mechanic right. Everything in the copy pane is
 * server-rendered and present at first paint; neither the headline nor the lead
 * waits on the diagram, which is that pattern's own hard-won correction.
 *
 * THE PANE-BALANCE MECHANISM, WHICH `-1` SIMPLY DID NOT HAVE. Iteration 1 put
 * `copy lg:col-span-5` beside `diagram lg:col-span-7` in a bare
 * `grid gap-12 lg:grid-cols-12` — no `items-*`, no min-height, no height
 * coupling of any kind. Here:
 *
 *   · both panes are direct children of ONE `grid lg:grid-cols-12` row with
 *     DEFAULT `items-stretch`, so the two cells are equal by construction and
 *     the copy pane's own wrapper takes `flex h-full flex-col justify-between`;
 *   · `items-center` is deliberately NOT used. Centring a short pane relates
 *     nothing to anything — it is the defect, centred. It is permitted only as
 *     post-hoc alignment once the ratio is already met by content, and it is
 *     not needed here;
 *   · there is NO hardcoded `min-h-[…]`. `pick(..., locale)` renders bilingual
 *     copy, and a height tuned to one locale breaks the other;
 *   · the copy pane earns its height BY INFORMATION — the ENISA NIS360 2026
 *     finding, a real cited source fact that `-1` omitted from its content
 *     entirely. That is Pattern 1's own named remedy, in preference to
 *     stretching.
 *
 * THE MEASURED RATIO, off `scripts/measure.mjs`, not off a docblock estimate:
 *
 *   copy 572px · diagram 830px · h = 0.69  (Pattern 1 needs ≥ 0.67)
 *   identical at 1440×900 and 2560×1440 — the container maxes out, so the
 *   ratio does not move between the two desktop breakpoints.
 *
 * IT DID NOT PASS ON THE FIRST RUN, and that is worth recording rather than
 * quietly fixing. At 16:10 the harness read 572 / 964 = 0.59 — a real fail. The
 * remedy the rule names is to REDUCE THE DIAGRAM PANE, never to pad the copy,
 * so the canvas went to 16:9 and the panel shed its spacing and its separate
 * legend block. 830px is what came back. Estimated arithmetic is not a
 * measurement, and the estimate here was out by 280px.
 *
 * SECOND MEASURE — CONTENT-ELEMENT COUNT, worse governs. Copy carries eight
 * marked elements (eyebrow, h1, lead, source label, finding, primary CTA,
 * secondary CTA, note); the diagram pane carries six. 6/8 = 0.75 ≥ 0.67, so
 * height is the governing measure here at 0.69.
 *
 * DUTCH, STATED HONESTLY. The registry ships `nl` as a same-as-English
 * placeholder, so the `nl` harness run returns the identical 572/830 and is NOT
 * an independent test of the copy-length hazard this rule exists for. Computed
 * headroom on an assumed +25% Dutch expansion: copy ≈ 715px against a canvas
 * that does not move, so the ratio becomes 715/830 = 0.86 and stays inside the
 * floor; past +45% the COPY becomes the taller pane and the ratio caps the
 * other way. Either direction clears 0.67 — which is exactly why a
 * fixed-aspect canvas is the right coupling for a bilingual page.
 *
 * ANTI-GAMING, AND THIS IS THE LOAD-BEARING PART. Because `items-stretch` makes
 * the two grid CHILDREN equal by construction, the `data-balance-group` mark
 * goes on the INNER CONTENT WRAPPERS, not on the stretched cells. The harness
 * then reads real content height and a stretched empty box cannot pass.
 *
 * DESKTOP ONLY. Below `lg` the panes stop being siblings and the ratio does not
 * apply; the stack is copy-first, per the same pattern's mobile fix.
 */
export function WaterHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <Datum index="00" label={HERO.eyebrow} locale={locale} />

      {/* No `items-*` class: the default IS `items-stretch`, and it is the
          mechanism. Writing `items-stretch` explicitly would suggest it were
          one option among several rather than the thing being relied on. */}
      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between">
            <div data-balance-group="hero-panes">
              {/* 1 */}
              <p data-balance-item className="oxot-kicker">
                {pick(HERO.eyebrow, locale)}
              </p>
              {/* 2 */}
              <h1 data-balance-item className="mt-4 text-balance">
                {pick(HERO.h1, locale)}
              </h1>
              {/* 3 */}
              <p data-balance-item className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">
                {pick(HERO.lead, locale)}
              </p>

              {/* 4 and 5 — the cited finding. This is what gives the copy pane
                  its height, and it is a real external source with a real URL,
                  not filler sized to fit a ratio. */}
              <div className="mt-7 border-l-2 border-primary pl-4">
                <p data-balance-item className="mono-label text-primary-ink">
                  <a
                    href={ENISA_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline focus-visible:underline"
                  >
                    {pick(HERO.sourceLabel, locale)}
                  </a>
                </p>
                <p data-balance-item className="prose-measure mt-2 body-copy leading-relaxed text-foreground">
                  {pick(HERO.finding, locale)}
                </p>
              </div>

              {/* 6 and 7 */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div data-balance-item>
                  <Button asChild size="lg" className="cta-lift">
                    <Link href={localePath(locale, PATHS.contact)}>{pick(HERO.ctaPrimary, locale)}</Link>
                  </Button>
                </div>
                <div data-balance-item>
                  <Button asChild variant="outline" size="lg">
                    <Link href={localePath(locale, PATHS.cdt2)}>{pick(HERO.ctaSecondary, locale)}</Link>
                  </Button>
                </div>
              </div>

              {/* 8 — the brief's own secondary conversion. */}
              <p data-balance-item className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {pick(HERO.note, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ProfilePanel locale={locale} />
        </div>
      </div>
    </header>
  );
}
