import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { METHOD } from "./content.method";
import { EngagementSequence } from "./EngagementSequence";

/**
 * The OXOT method — three principles, then the five-step engagement sequence.
 *
 * TWO SHAPES, DELIBERATELY DRAWN DIFFERENTLY. `content.method.ts`'s header is
 * explicit that the principles (L99–L103) are simultaneous and unordered while
 * the steps (L107–L127) are sequential, and that merging them would assert a
 * claim the source does not make. So the principles are three peer columns with
 * no ordinal, no arrow and no connector between them — nothing that could be
 * read as an order — and the sequence keeps its own numbered rail inside
 * `EngagementSequence`, set apart by a rule and its own sub-heading.
 *
 * THREE COLUMNS BECAUSE THE SOURCE SAYS THREE COLUMNS. L97 reads "Use this as a
 * three-column principle section." That line is a directive to the builder, not
 * copy — `content.method.ts` records it as guidance and deliberately ships no
 * string for it, and it is honoured here as layout rather than printed.
 *
 * The columns are joined by a border grid rather than floating as three cards,
 * so they read as one table of peers — the shape the source actually has.
 *
 * ONLY ONE OF THE TWO COLUMN LABELS PRINTS. `principleColumns.meaning` ("What
 * it means") labels the second cell, which needs saying. `principleColumns
 * .principle` ("Principle") is not printed: the cell it would label is an <h3>
 * carrying the principle's own name, and a label reading "Principle" over
 * "Client-centric" adds nothing a reader does not already have.
 *
 * NO TIME AXIS ANYWHERE IN THIS SECTION, for the principles or the steps — see
 * `content.method.ts`, which states no duration, price, team size, effort split
 * or prerequisite for any of them.
 *
 * Server-rendered. Nothing here is interactive and nothing pretends to be.
 */
export function Method({ locale }: { locale: Locale }) {
  return (
    <section
      aria-labelledby={METHOD.sectionId}
      className="mt-20 border-t border-border pt-12"
    >
      <p className="oxot-kicker">{pick(METHOD.datumLabel, locale)}</p>
      <h2 id={METHOD.sectionId} className="h-section mt-3 text-foreground">
        {pick(METHOD.heading, locale)}
      </h2>

      {/* Three peers. No ordinal, no arrow, no connector: all three hold at
          once, and any mark implying sequence would be a fabricated claim. */}
      <ul className="mt-10 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border p-0 md:grid-cols-3">
        {METHOD.principles.map((principle) => (
          <li key={principle.id} className="bg-card p-6 sm:p-7">
            <h3 className="h-card text-foreground">{pick(principle.name, locale)}</h3>
            <p className="mono-label mt-5">
              {pick(METHOD.principleColumns.meaning, locale)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pick(principle.meaning, locale)}
            </p>
          </li>
        ))}
      </ul>

      {/* The sequence. Separated by a rule so it cannot be mistaken for a
          fourth principle, or the principles for its first three stages. */}
      <div className="mt-14 border-t border-border pt-10">
        <h3 className="h-sub text-foreground">
          {pick(METHOD.sequenceHeading, locale)}
        </h3>

        <div className="mt-10">
          <EngagementSequence locale={locale} />
        </div>

        {/* L129, its expiring presigned-S3 citation deliberately dropped by
            `content.method.ts`. The source's "can model" is a hedge and is set
            as supporting text, not as a headline promise. */}
        <p className="prose-measure mt-12 rounded-xl border border-border bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
          {pick(METHOD.footnote, locale)}
        </p>
      </div>
    </section>
  );
}
