import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { ENGAGEMENT } from "./content";

/**
 * `OXOT_Layout_Styles.md` Pattern 6 — ZONE SEQUENCER, in its post-third-review
 * form, which matters because the pattern's earlier version was rejected twice.
 * What the current text actually requires:
 *
 *  · "a single ambient dashed zone-outline frame that wraps the whole sequence,
 *    not one per step" — one frame here, around all four, and it never opens or
 *    closes. Per-step zone geometry was the exact mechanism the third review
 *    struck out, because a step that visually "seals a zone" reads as
 *    compliance evidence to a security-literate buyer no matter how it is
 *    labelled.
 *  · "the numbered markers, not any zone geometry, carry actual per-step
 *    state" — conventional filled numbered circles.
 *  · "a semantic ordered list backs the visual; sequence is never conveyed by
 *    position/colour alone" — a real `<ol>`, with each entry's position also
 *    stated in words for assistive technology.
 *  · "this stays a simple linear sequence, never a system diagram."
 *
 * ONE HONEST DEVIATION, STATED: the pattern's markers can carry completion
 * state ("Phase 2 of 4: complete"). These four engagements are entry points a
 * utility chooses between, not phases anyone has completed, so no completion
 * state is claimed — asserting one would be fabricated. The markers carry
 * position only, and the section's own lead says so in words.
 */
export function Engagement({ locale }: { locale: Locale }) {
  return (
    <div className="rounded-3xl border border-dashed border-border p-6 sm:p-8">
      <ol>
        {ENGAGEMENT.items.map((item, i) => {
          const last = i === ENGAGEMENT.items.length - 1;
          return (
            <li key={i} className="flex gap-5 sm:gap-6">
              {/* Marker column: a conventional numbered progress marker with a
                  connector — the standard idiom, and no zone outline per step. */}
              <div className="flex shrink-0 flex-col items-center">
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                >
                  {i + 1}
                </span>
                {!last && <span aria-hidden="true" className="mt-2 w-px flex-1 bg-border" />}
              </div>

              <div className={cn("min-w-0 flex-1 pt-1", !last && "border-b border-border pb-8 mb-8")}>
                <p className="sr-only">
                  {i + 1} of {ENGAGEMENT.items.length}
                </p>
                <h3 className="h-card text-foreground">{pick(item.name, locale)}</h3>

                <dl className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <dt className="mono-label">{pick(ENGAGEMENT.startLabel, locale)}</dt>
                    <dd className="mt-1.5 body-copy leading-relaxed text-foreground">
                      {pick(item.start, locale)}
                    </dd>
                  </div>
                  <div>
                    <dt className="mono-label">{pick(ENGAGEMENT.outputLabel, locale)}</dt>
                    <dd className="mt-1.5 body-copy leading-relaxed text-muted-foreground">
                      {pick(item.output, locale)}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
