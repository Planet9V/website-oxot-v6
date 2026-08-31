import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { StaticTable } from "@/components/ui/static-table";
import { REGULATORY } from "./content.regulatory";
import { SectionC } from "./Rule";

/**
 * S08 · REGULATORY AND STANDARDS CONTEXT — header recipe H-C, and the only
 * section on this page that takes it.
 *
 * WHY H-C HERE AND NOWHERE ELSE. H-C is line + h2 + lead + a mono-label table
 * caption. It belongs here because this is the page's one reference matrix: six
 * rows a reader scans for their own framework rather than reads top to bottom,
 * which is exactly the case where a caption naming the table earns its line and
 * a prose lead alone does not. The test is falsifiable — any other section of
 * `industry_manu-process.md` with that shape would take H-C too, and none has
 * it.
 *
 * THE GUARDRAIL IS THE LEAD, NOT A FOOTNOTE. Source L269 instructs that this
 * section must not be framed as a claim of automatic compliance. That is
 * rendered as the section's lead — under the h2, above the caption and the
 * table — because a compliance disclaimer printed below a regulatory matrix
 * arrives after the matrix has already been read as a compliance claim. It is
 * one paragraph in the ordinary lead slot rather than a boxed warning: a
 * bordered callout would make the disclaimer the section's focal element, and
 * the matrix is what the reader came for.
 *
 * `StaticTable`, NOT `ui/data-table.tsx`. Every cell here is a sentence and no
 * column carries a value anyone would sort by — no security level, no clause
 * number, no date. `OXOT_Component_Inventory.md` names `static-table.tsx` for
 * this shape, and a sort control above six prose rows would offer an
 * interaction that answers no question. Six rows is also well under the point
 * where a filter starts paying for itself.
 *
 * TWO ROWS OF SIX LINK OUT, AND FOUR DO NOT, because only two destinations
 * exist: `/assurance/iec-62443` and `/assurance/cyber-resilience-act`. There is
 * no NIS2 page, no NIST SP 800-82 page, no IEC 61511 page and no ISO 27001 page
 * on this site. That asymmetry is honest and is deliberately NOT evened out
 * with placeholder links, which the Foundation Spec's acceptance criteria
 * forbid outright.
 *   · BOTH DESTINATIONS ARE SAFE IN BOTH LOCALES, so neither carries a locale
 *     gate. The five standalone `/assurance/*` framework pages render `nl` as
 *     well as `en` (nav.ts, L94); it is the `/assurance` INDEX that is still
 *     gated `locale !== "en"`, and nothing here links to it.
 *     `/industries/water-wastewater-2`'s regulatory table needs that gate
 *     because its NIS2 row points at the index; this one has no such row.
 *
 * THE TWO CITED NOTES SIT BELOW THE TABLE, WHICH DOES NOT CONTRADICT THE LEAD
 * RULE ABOVE. They are not disclaimers — they are scope detail behind two
 * specific rows (NIS2's Annex II categories, the CRA's application dates), and
 * each is only meaningful once the reader has met the row it qualifies. Each
 * carries its own eur-lex link: two different URLs under the same
 * author-chosen label, so they render per note rather than pooled into one
 * source line that would leave a reader guessing which regulation each URL
 * belongs to.
 */

const DESTINATIONS = {
  iec62443: PATHS.assuranceIec62443,
  cra: PATHS.assuranceCra
} as const;

export function Regulatory({ locale }: { locale: Locale }) {
  return (
    <SectionC
      id="regulatory"
      index="08"
      datumLabel={REGULATORY.datumLabel}
      heading={REGULATORY.h2}
      lead={REGULATORY.lead}
      caption={REGULATORY.tableCaption}
      locale={locale}
    >
      {/* 56rem: three prose columns, the widest of which runs to two full
          sentences. Below that the middle column collapses to two or three
          words a line and the matrix stops being scannable. The wrapper
          scrolls, never the page body. */}
      <StaticTable
        minWidth="56rem"
        head={[
          pick(REGULATORY.headings.framework, locale),
          pick(REGULATORY.headings.relevance, locale),
          pick(REGULATORY.headings.support, locale)
        ]}
        rows={REGULATORY.rows.map((row) => [
          row.href ? (
            <Link
              key={row.framework}
              href={localePath(locale, DESTINATIONS[row.href])}
              className="text-primary-ink underline-offset-4 hover:underline"
            >
              {row.framework}
            </Link>
          ) : (
            row.framework
          ),
          pick(row.relevance, locale),
          pick(row.support, locale)
        ])}
      />

      <div className="mt-8 space-y-4 border-t border-border pt-6">
        {REGULATORY.notes.map((note) => (
          /* No `prose-measure`. These are two standalone qualifying notes under
             a full-width table, not long-form body copy, and capping them to a
             reading measure would leave a narrow column hanging under a 56rem
             matrix. */
          <p key={note.href} className="body-copy leading-relaxed text-muted-foreground">
            {pick(note.text, locale)}{" "}
            {/* Inline at the end of the sentence it cites, rather than on its
                own mono-label line: a note and its source read as one unit, and
                two separate source lines under two short paragraphs would
                outweigh the notes themselves. */}
            <a
              href={note.href}
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap text-primary-ink underline-offset-4 hover:underline focus-visible:underline"
            >
              {pick(note.sourceLabel, locale)}
            </a>
          </p>
        ))}
      </div>
    </SectionC>
  );
}
