import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { StaticTable } from "@/components/ui/static-table";
import { TWIN } from "./content.twin";
import { OutcomeChains } from "./OutcomeChains";

/**
 * The Cyber Digital Twin in consulting (spec L133–L175).
 *
 * ONE SECTION, TWO SHAPES, AND THE SHAPES ARE NOT INTERCHANGEABLE — this is
 * `content.twin.ts`'s own distinction, drawn rather than restated:
 *
 *   - The outcome chains are a COMPARISON DIAGRAM. Two isomorphic four-node
 *     chains whose point is read ACROSS at each depth, so they go to
 *     `OutcomeChains`, which puts both on one grid and keeps them in register.
 *   - The contributions are a SEVEN-ROW MAPPING. The rows have no order
 *     dependency, no flow between them and no arrows; they are not stages. A
 *     mapping is what a table is for, so it renders as a real `<table>` — with
 *     `<th scope="row">` on the need, so a screen reader announces "Test a
 *     change — simulates firewall, routing, vendor-access…" rather than reading
 *     a disembodied sentence.
 *
 * Drawing the mapping as a flow, or the chains as a table, would each assert a
 * structure the source does not have.
 *
 * `StaticTable` RATHER THAN A SIXTH PRIVATE TABLE. Its own header records that
 * this exact shape converged independently four times before it was promoted to
 * `ui/`; a fifth copy here would be the mistake it was promoted to stop. It is
 * a static reference table with no sort and no filter, which is right: every
 * cell is prose and there is no column anyone would sort by.
 *
 * THE CTA'S HREF IS A ROUTING DECISION, NOT A TRANSCRIPTION. L175 names a label
 * and no destination. `content.twin.ts` resolves it to `/cdt-2#engine` and says
 * so out loud in its own comment; this component just renders what that file
 * decided, so there is exactly one place the decision lives.
 *
 * Server-rendered, with no client directive; nothing here is interactive.
 */
export function TwinInConsulting({ locale }: { locale: Locale }) {
  return (
    <section
      aria-labelledby={TWIN.sectionId}
      className="mt-20 border-t border-border pt-12"
    >
      <p className="oxot-kicker">{pick(TWIN.datumLabel, locale)}</p>
      <h2 id={TWIN.sectionId} className="h-section mt-3 text-foreground">
        {pick(TWIN.h2, locale)}
      </h2>

      <OutcomeChains locale={locale} />

      <div className="mt-16 border-t border-border pt-10">
        <h3 className="h-sub text-foreground">
          {pick(TWIN.contributionsHeading, locale)}
        </h3>

        <div className="mt-8">
          <StaticTable
            head={[
              pick(TWIN.contributionColumns.need, locale),
              pick(TWIN.contributionColumns.contribution, locale)
            ]}
            rows={TWIN.contributions.map((row) => [
              pick(row.need, locale),
              pick(row.contribution, locale)
            ])}
          />
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12">
        <blockquote className="rounded-2xl border border-border bg-muted/50 p-6">
          <p className="font-display text-lg font-semibold leading-relaxed text-foreground">
            {pick(TWIN.pullQuote, locale)}
          </p>
        </blockquote>

        <p className="lg:self-center">
          <Link
            href={localePath(locale, TWIN.ctaHref)}
            className="inline-flex items-center gap-1.5 border-b border-primary/45 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
          >
            {pick(TWIN.ctaLabel, locale)}
            <span aria-hidden="true">&#8594;</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
