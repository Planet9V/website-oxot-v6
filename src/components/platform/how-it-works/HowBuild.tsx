import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BUILD } from "./content";
import { SectionOpener } from "./page-kit";

/**
 * HOW THE TWIN IS BUILT — the four-step sequence, as a build ledger.
 *
 * The chain above answers "how does it reach an answer". This answers "how
 * does it come to exist", which is a different question from a different
 * person — usually the one who has to resource it. So it is drawn
 * differently: where the chain is a single running column with a large
 * numeral in the margin, this is a two-by-two of bordered panels, each
 * stating what the step CONSUMES and what it PRODUCES.
 *
 * The takes/makes pair is the point of the whole section. A four-step
 * methodology diagram with four verbs on it says nothing a reader can plan
 * against; naming the inputs each step needs from the customer, and the
 * artefact it hands back, turns the same four steps into something a project
 * manager can scope. It is also the honest version — step one cannot start
 * without drawings, and saying so here is better than discovering it later.
 *
 * Static. No numbered stepper, no progress state, and nothing implying the
 * reader is moving through a process while they read about one.
 */
export function HowBuild({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="build" className="mt-24 border-t border-border pt-14">
      <SectionOpener
        id="build"
        kicker={pick(BUILD.kicker, locale)}
        title={pick(BUILD.h2, locale)}
        intro={pick(BUILD.intro, locale)}
      />

      <ol className="mt-10 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2">
        {BUILD.steps.map((step) => (
          <li key={step.n} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-bold leading-none tracking-tight text-primary-ink">
                {step.n}
              </span>
              <h3 className="h-card text-foreground">{pick(step.title, locale)}</h3>
            </div>
            <p className="mt-3.5 body-copy leading-relaxed text-muted-foreground">{pick(step.body, locale)}</p>

            <dl className="mt-5 border-t border-border pt-4">
              <div className="grid grid-cols-[minmax(0,3.5rem)_1fr] gap-3">
                <dt className="mono-label font-bold text-primary-ink">{pick(BUILD.labelTakes, locale)}</dt>
                <dd className="text-sm leading-relaxed text-foreground">{pick(step.takes, locale)}</dd>
              </div>
              <div className="mt-3 grid grid-cols-[minmax(0,3.5rem)_1fr] gap-3">
                <dt className="mono-label font-bold text-primary-ink">{pick(BUILD.labelMakes, locale)}</dt>
                <dd className="text-sm leading-relaxed text-foreground">{pick(step.makes, locale)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
