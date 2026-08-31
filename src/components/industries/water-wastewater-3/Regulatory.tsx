import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { StaticTable } from "@/components/ui/static-table";
import { REGULATORY } from "./content";
import { REGULATORY_SECTION, type RegulatoryHref } from "./content.regulatory";

/**
 * S09 · REGULATORY AND STANDARDS CONTEXT. Nine obligations, three columns of
 * prose, as one real `<table>`.
 *
 * `ui/static-table.tsx` AND NOT `ui/data-table.tsx`. Every cell here is a
 * sentence and the rows read top to bottom; there is no column anyone would
 * sort by — no clause number, no criticality, no date. `data-table.tsx` is a
 * TanStack table with a sort and filter bar, so using it would put a control
 * over nine sentences that answers no question a reader has. `static-table`
 * also gives the first column `<th scope="row">`, which is what makes a screen
 * reader announce "US SDWA / AWIA Section 1433 — community water systems
 * serving more than 3,300 people must ..." instead of reading the sentence
 * detached from the obligation it belongs to.
 *
 * THE `kind` TAG IS INSIDE THE ROW HEADER, NOT A FOURTH COLUMN. "EU directive"
 * and "US guidance" are two very different things to be told, and a reader
 * scanning nine rows should not have to infer which from the tense of a
 * sentence. It sits above the name inside the same `<th>` so it is announced
 * with the row it qualifies rather than as a disembodied label, and so a fourth
 * column does not steal width from three columns of prose at 390px.
 *
 * TWO ROWS LINK OUT, SEVEN DO NOT, AND THAT IS LEFT UNEVEN. `/assurance` and
 * `/assurance/iec-62443` are the only destinations on this site that these nine
 * rows have; there is no `/assurance/nis2` page — verified against `PATHS` in
 * components/shell/nav.ts, whose assurance entries are the index plus
 * iec-62443, cyber-resilience-act, ts-50701, iec-62278-2 and
 * evidence-data-provenance. Adding seven links to somewhere-ish would be worse
 * than the asymmetry.
 *
 * AND IT IS ONE LINK IN DUTCH, NOT TWO. `app/[locale]/assurance/page.tsx`
 * still calls `notFound()` when `locale !== "en"`, so `/nl/assurance` 404s,
 * while `/assurance/iec-62443` renders both locales. The NIS2 row therefore
 * renders as plain text for a Dutch reader rather than as a link into a 404.
 * Sending them to the English URL instead would break the locale prefix the
 * whole routing layer exists to keep.
 *
 * THE LEAD IS THIS PAGE'S WORDING OF THE BRIEF'S CLAIM BOUNDARY, from
 * `content.regulatory.ts`, rather than `REGULATORY.intro` from `content.ts`.
 * That string is the brief's instruction to the builder — "Do not promise
 * automatic compliance." — and on a live page it reads as a note left in by
 * mistake. The boundary itself is not softened: it is stated first, before the
 * table, in the site's own voice. Flagged for the integration owner, since it
 * leaves `REGULATORY.intro` with no caller.
 */

const DESTINATIONS: Record<RegulatoryHref, string> = {
  assurance: PATHS.assurance,
  iec62443: PATHS.assuranceIec62443
};

export function Regulatory({ locale }: { locale: Locale }) {
  return (
    <section className="oxot-canvas pt-16 sm:pt-24" id="regulatory">
      {/* `.oxot-canvas` not `mx-auto w-full max-w-5xl px-6` (fixed 2026-08-25,
          systemic audit) — see TechnologyIndex.tsx's docblock. */}
      <p className="mono-label">09 · {pick(REGULATORY.datum, locale)}</p>
      <h2 className="mt-4 text-balance text-2xl font-semibold sm:text-3xl">
        {pick(REGULATORY.h2, locale)}
      </h2>
      {/* No `prose-measure` (removed 2026-08-25, systemic audit) — see
          TechnologyIndex.tsx's docblock for the reasoning. */}
      <p className="mt-4 text-pretty body-copy leading-relaxed text-muted-foreground">
        {pick(REGULATORY_SECTION.lead, locale)}
      </p>

      <div className="mt-10">
        <StaticTable
          minWidth="58rem"
          caption={pick(REGULATORY_SECTION.caption, locale)}
          head={[
            pick(REGULATORY_SECTION.headings.framework, locale),
            pick(REGULATORY_SECTION.headings.relevance, locale),
            pick(REGULATORY_SECTION.headings.support, locale)
          ]}
          rows={REGULATORY_SECTION.rows.map((row) => {
            const href = row.href;
            /* `/nl/assurance` does not exist; see the header. */
            const linked = href !== null && (href !== "assurance" || locale === "en");
            return [
              <span key={row.framework} className="block">
                <span className="mono-label block text-muted-foreground">
                  {pick(row.kind, locale)}
                </span>
                {href !== null && linked ? (
                  <Link
                    href={localePath(locale, DESTINATIONS[href])}
                    className="mt-1 block text-primary-ink underline-offset-4 hover:underline"
                  >
                    {row.framework}
                  </Link>
                ) : (
                  <span className="mt-1 block">{row.framework}</span>
                )}
              </span>,
              pick(row.relevance, locale),
              pick(row.support, locale)
            ];
          })}
        />
      </div>

      {/* The brief's three sourced closing paragraphs. They sit below the table
          because each one qualifies a specific row rather than the matrix — a
          reader who does not need the SDWA detail can stop at the table. */}
      <div className="mt-10 space-y-3 border-t border-border pt-6">
        {REGULATORY_SECTION.notes.map((note, i) => (
          <p
            key={i}
            className="body-copy leading-relaxed text-muted-foreground"
          >
            {pick(note, locale)}
          </p>
        ))}
      </div>
    </section>
  );
}
