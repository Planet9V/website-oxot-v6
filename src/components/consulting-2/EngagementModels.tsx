import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ENGAGEMENT_MODELS } from "./content.engagementModels";

/**
 * The five engagement models (spec L415–L433), as an ascending-commitment
 * ladder.
 *
 * ⛔ NO TIME AXIS. This component draws no timeline, Gantt bar, swimlane, week
 * or month scale, calendar, progress track or duration chip, because there is
 * nothing in the data to draw one from. `content.engagementModels.ts` is blunt
 * about why: the source table's third column is headed "Typical duration and
 * outcome" (L421) and NOT ONE of its five rows states a duration. That heading
 * is exported as `SOURCE_COLUMN_HEADING_NOT_FOR_RENDER` and is deliberately not
 * imported here; the label that prints is `columns.outcome`, the trailing half
 * of it. Printing "Typical duration…" over a column with no duration in it
 * would promise a fact the business has not stated.
 *
 * WHAT THE LADDER ENCODES, AND WHAT IT REFUSES TO. The five rows are a real
 * ascending commitment order in the source — L417 heads the section "Start
 * small. Keep the model if it proves useful." and L431 closes it "You do not
 * need to commit to a multi-year programme to start… If the model proves its
 * value, it becomes the foundation for the next decision." That ORDER is the
 * section's whole argument, so it is what the ladder draws: one rail, rungs
 * descending 01 → 05, ordinal printed as text.
 *
 * ORDER IS THE ONLY QUANTITY ON SCREEN. Every rung is the same width, the same
 * card, the same treatment, and carries the same two labelled fields. Nothing
 * varies in extent, weight or colour with `index`. That is deliberate: `index`
 * is position in the source table and NOT a size, price, scope, effort,
 * seniority or value rating, so a bar length, a score, a tier badge, a price
 * ladder or a "recommended" marker would each be an invented commercial claim.
 * The source ranks nothing and recommends nothing.
 *
 * A LADDER RATHER THAN A TABLE, because a table of five rows presents them as
 * peers to be compared cell-by-cell, and these are not peers — row 1 is one
 * decision, row 5 is a sustained internal-capability programme. The rail is
 * what says "these ascend"; the equal rungs are what stop it saying anything
 * more than that.
 *
 * `columns.engagementModel` IS NOT PRINTED. The cell it would label is an <h3>
 * carrying the model's own name; a mono label reading "Engagement model" over
 * "Decision Sprint" adds nothing. The other two column labels do print, because
 * without them a reader cannot tell the starting point from the outcome.
 *
 * L419 IS NOT COPY. "This section makes clear that OXOT can deliver short
 * engagements and long-term support…" is direction addressed to the builder in
 * the third person. `content.engagementModels.ts` records it as a comment and
 * ships no string for it; it does not appear on screen.
 *
 * Server-rendered. Nothing here is interactive.
 */
export function EngagementModels({ locale }: { locale: Locale }) {
  const models = ENGAGEMENT_MODELS.items;
  const lastIndex = models.length - 1;

  return (
    <section
      aria-labelledby={ENGAGEMENT_MODELS.sectionId}
      className="mt-20 border-t border-border pt-12"
    >
      <p className="oxot-kicker">{pick(ENGAGEMENT_MODELS.datumLabel, locale)}</p>
      <h2 id={ENGAGEMENT_MODELS.sectionId} className="h-section mt-3 text-foreground">
        {pick(ENGAGEMENT_MODELS.h2, locale)}
      </h2>

      {/* The ladder. The rail carries the order; the rungs carry nothing but
          their own content, at identical size, for the reasons above. */}
      <ol className="mt-10 list-none p-0">
        {models.map((model, i) => {
          const isLast = i === lastIndex;
          return (
            <li
              key={model.id}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-x-6"
            >
              {/* The rail: one hairline, one numbered rung marker. The marker
                  is the ordinal as text — it is not a score and is not scaled
                  by position. */}
              <div className="relative flex justify-center">
                {isLast ? null : (
                  <span aria-hidden="true" className="absolute inset-y-0 w-px bg-border" />
                )}
                <span className="mono-label relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary-ink">
                  {model.index}
                </span>
              </div>

              <div className={isLast ? "" : "pb-10"}>
                <h3 className="h-card text-foreground">{pick(model.name, locale)}</h3>

                <div className="mt-4 grid gap-6 rounded-2xl border border-border bg-card p-5 shadow-xs sm:grid-cols-2 sm:gap-8 sm:p-6">
                  <div>
                    <p className="mono-label">
                      {pick(ENGAGEMENT_MODELS.columns.bestStartingPoint, locale)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {pick(model.startingPoint, locale)}
                    </p>
                  </div>
                  <div>
                    <p className="mono-label">
                      {pick(ENGAGEMENT_MODELS.columns.outcome, locale)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {pick(model.outcome, locale)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 border-t border-border pt-10">
        <h3 className="h-sub text-foreground">
          {pick(ENGAGEMENT_MODELS.keyMessageHeading, locale)}
        </h3>

        {/* "multi-year programme" is the source NEGATING a commitment
            requirement, not a claim about how long anything takes. It ships
            verbatim as prose and licenses no scale. */}
        <blockquote className="mt-5 border-l-2 border-primary pl-5">
          <p className="prose-measure font-display text-lg font-semibold leading-relaxed text-foreground">
            {pick(ENGAGEMENT_MODELS.keyMessage, locale)}
          </p>
        </blockquote>

        {/* L433's own trailing citation is an expiring presigned S3 URL and is
            deliberately not shipped, so this renders as plain supporting text
            with no source link attached. */}
        <p className="prose-measure mt-8 text-sm leading-relaxed text-muted-foreground">
          {pick(ENGAGEMENT_MODELS.supportingNote, locale)}
        </p>
      </div>
    </section>
  );
}
