import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { INTAKE } from "./content";
import { Chip, FigureNote, SectionHead } from "./primitives";

/**
 * THE PAGE'S SIGNATURE FIGURE — four lanes of evidence converging on one
 * reconciliation stage, then one model.
 *
 * WHY A CONVERGENCE AND NOT A STACK. The sibling assurance page already
 * draws a three-band pipeline read top to bottom, and the shape of this
 * page's argument is different: the interesting fact is that four separate
 * bodies of evidence, held by four different teams, in four different file
 * formats, become one object. A stack cannot show many-to-one. A drawn
 * convergence can, so the fan-in is real geometry rather than an arrow
 * pointing at a paragraph.
 *
 * THE GEOMETRY IS ONLY DRAWN WHERE IT IS TRUE. The four converging lines
 * land on the centres of a four-column grid, which only exists at lg and up.
 * Below that the grid is two columns or one, the lines would point at
 * nothing, and a diagram that lies about its own layout is worse than no
 * diagram — so under lg it degrades to a single vertical arrow, which is
 * accurate at every width. `vector-effect="non-scaling-stroke"` keeps the
 * hairline a hairline under `preserveAspectRatio="none"`, which is what lets
 * the x positions stay locked to the column centres as the container grows.
 *
 * NOTHING HERE IS INTERACTIVE AND NOTHING CLAIMS TO BE. No state, no client
 * boundary, no hover reveal, no "live" or "connected" language. The figure
 * note says what the drawing is, in the drawing's own caption.
 *
 * Every colour is a token: --border, --primary, --muted, --card.
 */

/** The fan-in. Four lines from the lane centres to one point. */
function Convergence() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 44"
      preserveAspectRatio="none"
      /* NOT `text-border`. These lines carry the figure's argument, so WCAG
         1.4.11 applies and a border-token hairline measured 1.24:1 in dark —
         the harness caught it the moment the figure was marked. Neutral
         rather than orange: at full strength four orange lines would shout
         over the lanes they join, and --muted-foreground is a token already
         built to clear contrast in both themes. */
      className="hidden h-11 w-full text-muted-foreground lg:block"
    >
      {[50, 150, 250, 350].map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2="200"
          y2="44"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/** A single arrow. Used under lg, and between the reconciliation stage and
 *  the model at every width. */
function DownArrow() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 12 30"
      width="12"
      height="30"
      /* `text-primary-ink`, not `text-primary`: the arrowhead is a filled
         shape and --primary measured 2.44:1 against the canvas, under the
         3:1 that WCAG 1.4.11 requires of a meaningful graphic. --primary-ink
         is the token that exists for exactly this — the same reason a 12px
         orange label never uses --primary either. */
      className="mx-auto block text-primary-ink"
    >
      <line x1="6" y1="0" x2="6" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="6,29 1.75,20.5 10.25,20.5" fill="currentColor" />
    </svg>
  );
}

export function IntakeMap({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby={INTAKE.id} className="mt-16 border-t border-border pt-12">
      <SectionHead n={INTAKE.n} id={INTAKE.id} title={INTAKE.title} dek={INTAKE.dek} locale={locale} />

      {/* `data-gfx-meaning` opts this figure into the harness's WCAG 1.4.11
          check. The converging lines ARE the argument — they carry the
          many-to-one relationship the prose only asserts — so they are not
          decoration and must clear 3:1 like any other meaningful graphic.
          measure.mjs covers nothing inside an unmarked figure. */}
      <figure data-gfx-meaning className="m-0 mt-10">
        {/* The four lanes. Everything in this row is already yours. */}
        <ol className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {INTAKE.lanes.map((lane) => (
            <li key={lane.n} className="flex flex-col rounded-xl border border-border bg-card px-4 py-4">
              <div className="flex items-baseline gap-2.5">
                <span className="mono-label font-bold text-primary-ink">{lane.n}</span>
                <p className="font-display body-lead font-bold leading-snug text-foreground">
                  {pick(lane.label, locale)}
                </p>
              </div>
              <ul className="mt-3.5 flex list-none flex-wrap gap-1.5 p-0">
                {lane.items.map((item, i) => (
                  <li key={i}>
                    <Chip>{pick(item, locale)}</Chip>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <Convergence />
        <div className="py-1 lg:hidden">
          <DownArrow />
        </div>

        {/* Reconciliation, then the one input that is ours, inset beneath it.
            THE EXTERNAL FEED WAS A RIGHT-HAND SIDECAR AND THAT BROKE THE
            DRAWING. With a 20rem column beside it the reconciliation band no
            longer spanned the figure, so the fan-in vertex — fixed at 50% of
            the figure's width — pointed at a spot to the right of the band's
            centre. The two live in different grids and the offset changes
            with viewport width, so no fixed viewBox x can track it. Stacking
            the external feed underneath makes the band full width again and
            the vertex exact at every size. It loses nothing: "joins from the
            side" was never the claim, and dashed border plus "ours, not
            yours" carries the distinction that mattered. */}
        <div className="grid gap-3">
          <div className="rounded-xl border border-primary/40 bg-muted px-5 py-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="mono-label font-bold text-primary-ink">{pick(INTAKE.ingest.role, locale)}</span>
              <p className="font-display body-lead font-bold leading-snug text-foreground">
                {pick(INTAKE.ingest.label, locale)}
              </p>
            </div>
            <ul className="mt-3.5 flex list-none flex-wrap gap-1.5 p-0">
              {INTAKE.ingest.items.map((item, i) => (
                <li key={i}>
                  <Chip>{pick(item, locale)}</Chip>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashed and inset, because it is the one thing on this drawing the
              customer does not supply. Marked in words as well as in stroke. */}
          <div className="rounded-xl border border-dashed border-border bg-card px-5 py-4 sm:ml-8 lg:ml-16">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="mono-label font-bold text-primary-ink">{pick(INTAKE.external.role, locale)}</span>
              <p className="font-display body-lead font-bold leading-snug text-foreground">
                {pick(INTAKE.external.label, locale)}
              </p>
            </div>
            <ul className="mt-3.5 flex list-none flex-wrap gap-1.5 p-0">
              {INTAKE.external.items.map((item, i) => (
                <li key={i}>
                  <Chip tone="quiet">{pick(item, locale)}</Chip>
                </li>
              ))}
            </ul>
            <p className="prose-measure mt-3.5 text-sm leading-relaxed text-muted-foreground">
              {pick(INTAKE.external.note, locale)}
            </p>
          </div>
        </div>

        <div className="py-1">
          <DownArrow />
        </div>

        {/* What comes out. One object, not four. */}
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="mono-label font-bold text-primary-ink">{pick(INTAKE.model.role, locale)}</span>
            <p className="font-display body-lead font-bold leading-snug text-foreground">
              {pick(INTAKE.model.label, locale)}
            </p>
          </div>
          <ul className="mt-3.5 flex list-none flex-wrap gap-1.5 p-0">
            {INTAKE.model.items.map((item, i) => (
              <li key={i}>
                <Chip tone="accent">{pick(item, locale)}</Chip>
              </li>
            ))}
          </ul>
        </div>

        <figcaption>
          <FigureNote>{pick(INTAKE.figureNote, locale)}</FigureNote>
        </figcaption>
      </figure>
    </section>
  );
}
