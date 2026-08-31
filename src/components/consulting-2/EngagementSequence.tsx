import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { METHOD } from "./content.method";

/**
 * The engagement sequence — the page's one sequence graphic.
 *
 * WHAT IT DRAWS AND WHAT IT REFUSES TO DRAW. Five stops on one rail, each
 * carrying its ordinal, its title and its body. The ordinal is a fact about
 * the source's numbered block (L107–L127); it is the ONLY quantity on screen.
 * There is no time axis, no week marker, no duration, no percentage complete,
 * no price, no team size and no stage drawn longer than another — the source
 * states none of those, and a bar length would fabricate an engineering fact.
 * The five columns are an equal-width grid for exactly that reason: equal,
 * unlabelled stages are the only honest drawing.
 *
 * TITLE AND BODY BOTH PRINT. "Establish the evidence" alone says almost
 * nothing; the body carries the substance. `content.method.ts` marks both
 * required and a tight layout may not drop the body.
 *
 * PLAIN GEOMETRY, SERVER-RENDERED. Circles and hairlines in DOM — no
 * engineering glyph, because this is a process and not equipment, and no
 * `resolveSymbol`/`DrawioGlyph` import, which would drag a 462KB manifest into
 * the client bundle for five numerals. No `"use client"`: nothing here is
 * interactive.
 *
 * The connectors are decoration over an ordered list, so they are
 * `aria-hidden`; the `<ol>` and the printed ordinals carry the order to a
 * screen reader.
 */
export function EngagementSequence({ locale }: { locale: Locale }) {
  const steps = METHOD.steps;
  const lastIndex = steps.length - 1;

  return (
    <ol className="m-0 grid list-none grid-cols-1 p-0 lg:grid-cols-5">
      {steps.map((step, i) => {
        const isLast = i === lastIndex;
        return (
          <li key={step.id} className="flex gap-4 lg:block lg:gap-0">
            {/* The rail: marker, then the connector on to the next stop.
                Vertical while the list stacks, horizontal once it is five
                equal columns. */}
            <div className="flex shrink-0 flex-col items-center lg:relative lg:block">
              <span className="mono-label flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary-ink">
                {step.index}
              </span>
              {isLast ? null : (
                <>
                  <span aria-hidden className="w-px flex-1 bg-border lg:hidden" />
                  <span
                    aria-hidden
                    className="absolute left-8 right-0 top-4 hidden h-px bg-border lg:block"
                  />
                </>
              )}
            </div>

            <div className={isLast ? "lg:mt-4 lg:pr-6" : "pb-8 lg:mt-4 lg:pb-0 lg:pr-6"}>
              <h4 className="h-micro text-foreground">{pick(step.title, locale)}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pick(step.body, locale)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
