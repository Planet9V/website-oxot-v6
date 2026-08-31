import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Badge } from "@/components/ui/badge";
import { WORKED_EXAMPLES } from "./content";
import { RailTrackHeader } from "./RailTrackHeader";
import { RailScenarioDiagram } from "./RailScenarioDiagram";

/** Passenger track: the source gives a full inputs breakdown and a
 *  three-column controls table, so that structure carries through here. */
function PassengerTrack({ locale }: { locale: Locale }) {
  const t = WORKED_EXAMPLES.passenger;
  return (
    <div>
      <RailTrackHeader label={pick(t.label, locale)} variant="passenger" />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="h-card">{pick(t.h2, locale)}</h3>
        <Badge variant="secondary">{pick(t.tag, locale)}</Badge>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pick(t.scenario, locale)}</p>

      <div className="mt-6 flex flex-col gap-4">
        {t.inputs.map((inp, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="mono-label text-primary-ink">{pick(inp.category, locale)}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(inp.items, locale)}</p>
          </div>
        ))}
      </div>

      <RailScenarioDiagram locale={locale} />

      <p className="mono-label mt-8 mb-3 text-muted-foreground">Candidate controls</p>
      <div className="flex flex-col gap-3">
        {t.controls.map((c, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">{pick(c.option, locale)}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              <span className="mono-label text-primary-ink">Evaluates </span>
              {pick(c.evaluates, locale)}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              <span className="mono-label text-primary-ink">Outcome </span>
              {pick(c.outcome, locale)}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 border-l-2 border-primary pl-4 text-sm leading-relaxed text-foreground">{pick(t.result, locale)}</p>
    </div>
  );
}

/** Freight track: the source gives a leaner narrative and a plain
 *  candidate-controls list rather than a structured inputs table — kept
 *  that way rather than padded out to match the passenger column, which
 *  would mean inventing detail the source doesn't provide. */
function FreightTrack({ locale }: { locale: Locale }) {
  const t = WORKED_EXAMPLES.freight;
  return (
    <div>
      <RailTrackHeader label={pick(t.label, locale)} variant="freight" />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="h-card">{pick(t.h2, locale)}</h3>
        <Badge variant="secondary">{pick(t.tag, locale)}</Badge>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pick(t.scenario, locale)}</p>

      <RailScenarioDiagram locale={locale} variant="freight" />

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h4 className="mono-label text-primary-ink">Candidate controls</h4>
        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {t.controls.map((c, i) => (
            <li key={i}>{pick(c, locale)}</li>
          ))}
        </ul>
      </div>

      <p className="mt-6 border-l-2 border-primary pl-4 text-sm leading-relaxed text-foreground">{pick(t.result, locale)}</p>
    </div>
  );
}

export function RailWorkedExamples({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="worked-examples" className="mt-16 border-t border-border pt-10">
      <h2 id="worked-examples" className="h-sub">{pick(WORKED_EXAMPLES.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(WORKED_EXAMPLES.intro, locale)}</p>

      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-2">
        <div className="lg:pr-10">
          <PassengerTrack locale={locale} />
        </div>
        <div className="lg:border-l lg:border-border lg:pl-10">
          <FreightTrack locale={locale} />
        </div>
      </div>
    </section>
  );
}
