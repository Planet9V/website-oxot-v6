import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { HERO, SLT } from "./content";
import { FR_VECTOR, PIPELINE_BANDS } from "./content-figures";

/**
 * The three smaller drawn figures. The big one — the zone and conduit stack
 * — has its own file.
 *
 * All three are static, all three are built from the content module's own
 * data, and none of them claims to be anything else. Same discipline as
 * zone-stack.tsx: the structure is real DOM with real text, so it reflows,
 * reads and copies; what it does not do is pretend to be live.
 */

/**
 * THE SPINE — the source document's opening chain, in the header.
 *
 * A flat row of steps separated by arrows rather than a vertical ladder,
 * because the body of the page already uses the ladder four times for the
 * reasoning traces and the header should not pre-empt it. This is the
 * table of contents of the standard's logic, read left to right, one line.
 */
export function Spine({ locale }: { locale: Locale }) {
  return (
    <ol className="mt-10 flex list-none flex-wrap items-center gap-x-2.5 gap-y-2 p-0">
      {HERO.spine.map((step, i) => (
        <li key={i} className="flex items-center gap-2.5">
          {i > 0 ? (
            <span aria-hidden="true" className="font-mono text-sm text-primary">
              &#8594;
            </span>
          ) : null}
          <span className="mono-label rounded border border-border bg-card px-2.5 py-1.5 text-foreground">
            {pick(step, locale)}
          </span>
        </li>
      ))}
    </ol>
  );
}

/**
 * THE EVIDENCE PIPELINE — what goes in, what it becomes, what comes out.
 *
 * Three bands, each listing its real contents as mono chips, joined by a
 * marked transition. The middle band is set apart with a --primary border
 * and the muted ground because it is the one thing on this page that is
 * OXOT's rather than the standard's; the outer two are the customer's
 * evidence going in and the customer's evidence coming back out.
 */
export function EvidencePipeline({ locale }: { locale: Locale }) {
  return (
    <figure className="mt-8">
      {PIPELINE_BANDS.map((band, i) => {
        const isModel = i === 1;
        return (
          <div key={i}>
            <div
              className={
                isModel
                  ? "rounded-lg border border-primary/40 bg-muted px-5 py-4"
                  : "rounded-lg border border-border bg-card px-5 py-4"
              }
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="mono-label font-bold text-primary-ink">{pick(band.role, locale)}</span>
                <p className="font-display body-lead font-bold leading-snug text-foreground">
                  {pick(band.label, locale)}
                </p>
              </div>
              <ul className="mt-3.5 flex list-none flex-wrap gap-1.5 p-0">
                {band.items.map((item, j) => (
                  <li
                    key={j}
                    className="mono-label rounded border border-border bg-background px-2 py-1 text-muted-foreground"
                  >
                    {pick(item, locale)}
                  </li>
                ))}
              </ul>
            </div>

            {i < PIPELINE_BANDS.length - 1 ? (
              <div aria-hidden="true" className="relative flex justify-center py-2.5">
                <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
                <span className="relative bg-background px-2 font-mono text-sm leading-none text-primary">&#8595;</span>
              </div>
            ) : null}
          </div>
        );
      })}
    </figure>
  );
}

/**
 * THE SL-T VECTOR — seven foundational requirements, seven empty elements.
 *
 * Drawn as the notation actually is: a bracketed vector with one position
 * per foundational requirement. EVERY POSITION IS EMPTY, and that is the
 * argument the figure exists to make — the section's copy says OXOT does
 * not assign an authoritative target security level, so a diagram showing
 * filled-in levels would contradict the sentence above it. The dash in each
 * slot carries an sr-only "not set" so the emptiness is legible to a screen
 * reader rather than reading as a blank cell.
 */
export function FrVector({ locale }: { locale: Locale }) {
  return (
    <figure className="mt-8">
      {/* Sentence case for the same reason as the zone stack's caption. */}
      <figcaption className="mb-5 font-mono text-[0.8125rem] leading-relaxed text-muted-foreground">
        {pick(SLT.vectorLabel, locale)}
      </figcaption>

      <div className="flex items-stretch gap-3">
        <span aria-hidden="true" className="w-2 shrink-0 rounded-l border-y-2 border-l-2 border-primary/50" />

        <ol className="grid flex-1 list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4 lg:grid-cols-7">
          {FR_VECTOR.map((fr) => (
            <li key={fr.abbr} className="rounded border border-border bg-card px-2.5 py-3 text-center">
              <p className="mono-label font-bold text-primary-ink">{fr.abbr}</p>
              <p className="mt-2 rounded border border-dashed border-border py-1.5 font-mono text-sm text-muted-foreground">
                <span aria-hidden="true">&#8212;</span>
                <span className="sr-only">not set</span>
              </p>
              <p className="mt-2 text-[11px] leading-tight text-muted-foreground">{pick(fr.name, locale)}</p>
            </li>
          ))}
        </ol>

        <span aria-hidden="true" className="w-2 shrink-0 rounded-r border-y-2 border-r-2 border-primary/50" />
      </div>
    </figure>
  );
}
