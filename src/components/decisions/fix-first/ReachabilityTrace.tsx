import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BlurFade } from "@/components/ui/blur-fade";
import { TRACE } from "./content";

/**
 * How a finding earns a place on the board: the four stages of the route
 * trace, drawn as a single run with the connector between stages made
 * explicit rather than implied by a card grid. The stages are the
 * mechanism behind the "Reachability" field every finding on the board
 * prints, so this section deliberately sits AFTER the board — the reader
 * has already seen the output and is now being shown where it came from.
 *
 * The connector is a plain rule and a chevron drawn in CSS, not an
 * animated beam: a moving line would imply live traversal of a live
 * model, which is not what this is. The note beside the closing line
 * says so in as many words.
 */
export function ReachabilityTrace({ locale }: { locale: Locale }) {
  const t = TRACE;
  return (
    <section aria-labelledby="trace" className="mt-20 border-t border-border pt-12">
      <h2 id="trace" className="h-section">
        {pick(t.h2, locale)}
      </h2>
      <p className="prose-measure mt-5 text-base leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <BlurFade inView direction="up" duration={0.45}>
        <ol className="mt-10 flex list-none flex-col gap-4 p-0 lg:flex-row lg:items-stretch lg:gap-0">
          {t.steps.map((step, i) => (
            <li key={step.n} className="flex flex-1 items-stretch">
              <div className="flex-1 rounded-2xl border border-border bg-card p-5 sm:p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-bold leading-none text-primary-ink">{step.n}</span>
                  <h3 className="h-micro text-foreground">{pick(step.title, locale)}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(step.body, locale)}</p>
              </div>

              {i < t.steps.length - 1 ? (
                <div aria-hidden="true" className="hidden items-center justify-center gap-1 px-2 lg:flex">
                  <span className="h-px w-5 bg-primary/50" />
                  <span className="text-primary-ink">&#9656;</span>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </BlurFade>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <p className="prose-measure font-serif text-lg leading-relaxed text-foreground">{pick(t.closing, locale)}</p>
        <p className="mono-label shrink-0 sm:max-w-[20rem] sm:text-right">{pick(t.staticNote, locale)}</p>
      </div>
    </section>
  );
}
