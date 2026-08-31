import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Button } from "@/components/ui/button";
import { HERO, ILLUSTRATIVE, PROBLEM, SCENARIO } from "./content";

/**
 * The three sections above the before/after comparison: the hero, the
 * reason a model exists at all, and the scenario specification the rest of
 * the page then works through.
 *
 * TYPOGRAPHIC HERO, NO ILLUSTRATION. The industry pages open with a real
 * brand asset beside the headline; there is no honest image for "a change
 * tested in a model", and a fabricated product screenshot on the page that
 * argues for evidence would undo the argument. The hero instead gives the
 * spec's central claim its own bordered band with an accent rule, so the
 * one sentence this deliverable exists to prove is set as a claim rather
 * than buried in a lead paragraph.
 *
 * THE SCENARIO IS SET AS A RECORD, NOT A STORY — a four-row definition
 * list with mono field labels and ruled rows, because that is what it is:
 * OXOT_Visual_Foundation_Spec.md §7's "Scenario specification" block,
 * transcribed field for field. It carries the "Illustrative scenario — no
 * customer data" label at the top, which §7 requires of every scenario.
 */

export function ChangeHero({ locale }: { locale: Locale }) {
  return (
    <header className="pt-10 lg:pt-14">
      <p className="oxot-kicker">{HERO.kicker}</p>
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

      {/* The claim, given its own band. This is the sentence the deliverable
          exists to prove, so it is set as a claim and not as body copy. */}
      <div className="mt-14 border-l-2 border-primary py-1 pl-6 sm:pl-8">
        <p className="max-w-[46ch] font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-bold leading-snug tracking-tight text-foreground">
          {pick(HERO.claim, locale)}
        </p>
        <p className="mono-label mt-4 text-primary-ink">{pick(HERO.strap, locale)}</p>
      </div>
    </header>
  );
}

export function ChangeProblem({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="problem" className="mt-20 border-t border-border pt-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        <div>
          <p className="oxot-kicker">{pick(PROBLEM.eyebrow, locale)}</p>
          <h2 id="problem" className="h-sub mt-4 text-foreground">
            {pick(PROBLEM.h2, locale)}
          </h2>
        </div>
        <div className="space-y-5">
          {PROBLEM.paragraphs.map((paragraph) => (
            <p key={paragraph.en} className="prose-measure body-lead leading-relaxed text-muted-foreground">
              {pick(paragraph, locale)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ChangeScenario({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="scenario" className="mt-20 border-t border-border pt-10">
      <p className="oxot-kicker">{pick(SCENARIO.eyebrow, locale)}</p>
      <h2 id="scenario" className="h-section mt-4 text-foreground">
        {pick(SCENARIO.h2, locale)}
      </h2>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="mono-label">
          <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-1 text-primary-ink">
            {pick(ILLUSTRATIVE, locale)}
          </span>
        </p>
        <dl className="mt-7">
          {SCENARIO.fields.map((field, index) => (
            <div
              key={field.label.en}
              className={`grid grid-cols-1 gap-2 py-5 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-8 ${
                index === 0 ? "pt-0" : "border-t border-border"
              }`}
            >
              <dt className="mono-label pt-1">{pick(field.label, locale)}</dt>
              <dd className="body-lead leading-relaxed text-foreground">{pick(field.body, locale)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
