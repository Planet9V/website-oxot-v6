import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { StaticTable } from "@/components/ui/static-table";
import { REGULATORY } from "./content.regulatory";
import { SectionC } from "./Rule";

/**
 * S11 · REGULATORY AND STANDARDS CONTEXT — header recipe H-C, and the only
 * section on this page that takes it.
 *
 * WHY H-C HERE AND NOWHERE ELSE. `Rule.tsx` binds H-C to the reference-matrix
 * shape: a table whose columns need naming in words before a reader can use
 * them. Source L371–L380 is the only genuine reference matrix on this page, and
 * the only table here whose columns are not self-describing — every other
 * passenger/freight table on the page sits under a heading that already says
 * what the two tracks are, whereas this one puts eight regulatory instruments
 * against two operating contexts at once. The binding is falsifiable: any other
 * section with this shape would get H-C too, and none has it.
 *
 * THE LEAD IS THE COMPLIANCE GUARDRAIL, AND THAT PLACEMENT IS THE POINT. Source
 * L369 bars any claim that the Twin certifies a railway or guarantees regulatory
 * compliance. A page can honour that by writing careful cell text — and this one
 * does, all thirty-two cells verbatim — but careful cell text is not a
 * disclaimer, and eight named frameworks laid out in a matrix is precisely the
 * layout from which a reader infers "they do these for us". So the guardrail is
 * stated, in words, in the section's lead slot: full body size, directly under
 * the h2, ABOVE the caption and the matrix. It is deliberately not a footnote
 * under the table and not small print.
 *
 * `static-table.tsx`, NOT `data-table.tsx`. Eight rows, prose in all four cells,
 * read top to bottom. There is no severity, no zone, no clause number and no
 * date — nothing anyone would sort or filter by — so the TanStack sort/filter
 * bar `data-table.tsx` brings would offer an interaction that answers no
 * question the visitor has. `StaticTable` also emits `<th scope="row">` on the
 * first cell unconditionally (verified at `src/components/ui/static-table.tsx:65`,
 * not assumed), which is what makes a screen reader announce "TSA rail
 * cybersecurity directives — not applicable outside covered US operations"
 * rather than a disembodied clause. That row-header behaviour matters more here
 * than on a three-column table: a four-column row is long enough that a reader
 * moving across it loses the framework name without it.
 *
 * `minWidth` is `76rem`, well above the primitive's `42rem` default and above
 * the energy page's `56rem`. This matrix is one column wider AND one row longer
 * than energy's, and its cells are longer still — L377's freight cell alone runs
 * to eleven comma-separated obligations. At `56rem` the two middle columns
 * collapse to two or three words per line and the row loses its side-by-side
 * reading entirely, which is the one thing this table exists to give. `76rem`
 * lands at the page container's own width, so desktop shows the full matrix with
 * no scrollbar and narrower viewports scroll INSIDE the primitive's
 * `overflow-x-auto` wrapper, never the page body — the project convention for
 * wide comparison tables.
 *
 * TWO ROWS LINK OUT, SIX DO NOT, AND THAT ASYMMETRY IS DELIBERATE. `content.ts`'s
 * LINKS map is the page's only sanctioned source of internal hrefs, and it
 * resolves exactly two of these eight frameworks to real routes: TS 50701 and
 * IEC 62443. NIS2 renders unlinked on that same map's explicit written
 * instruction — the brief suggests `/assurance/nis2` but nav.ts has no such
 * route. The remaining five (CER, TSA, FRA PTC, NIST, Safety and RAMS) have no
 * page on this site at all. Giving the unlinked rows a plausible-looking
 * destination, or dropping the two real links so all eight look uniform, would
 * both trade a true page for a tidy one.
 *
 * THE TWO CITED NOTES SIT BELOW THE TABLE, NOT INSIDE IT. Source L382 and L384
 * are external footing — one on what CLC/TS 50701 actually is, one on what TSA's
 * 2022 measures actually require. Folding them into the TS 50701 and TSA rows
 * would give two of eight rows a citation the other six lack, implying the rest
 * are unsourced, and would bury a paragraph of prose inside an already-dense
 * matrix cell. They are a paired closing block instead.
 *
 * NO INVENTED LEGAL FACT. Nothing here tells a reader whether they are in scope
 * of anything, dates an obligation, or glosses what a standard requires of them.
 * Every string is transcribed from L363–L384; see content.regulatory.ts, which
 * carries the source line against each value and records the one transposition
 * made (L369's first sentence out of the imperative).
 */
export function Regulatory({ locale }: { locale: Locale }) {
  return (
    <SectionC
      id="regulatory-context"
      index="11"
      datumLabel={REGULATORY.datumLabel}
      heading={REGULATORY.h2}
      lead={REGULATORY.guardrail}
      caption={REGULATORY.caption}
      locale={locale}
    >
      <StaticTable
        head={REGULATORY.head.map((h) => pick(h, locale))}
        rows={REGULATORY.rows.map((row) => {
          const framework = pick(row.framework, locale);
          return [
            row.href ? (
              <Link
                href={localePath(locale, row.href)}
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-primary-ink focus-visible:decoration-primary-ink"
              >
                {framework}
              </Link>
            ) : (
              framework
            ),
            pick(row.passenger, locale),
            pick(row.freight, locale),
            pick(row.support, locale)
          ];
        })}
        minWidth="76rem"
      />

      <div className="mt-12 grid gap-8 border-t border-border pt-8 lg:grid-cols-2 lg:gap-12">
        {REGULATORY.notes.map((note) => (
          <div key={note.href} className="min-w-0">
            <p className="mono-label text-primary-ink">{pick(note.subject, locale)}</p>
            <p className="mt-3 body-copy leading-relaxed text-muted-foreground">
              {pick(note.body, locale)}
            </p>
            {/* The brief's own visible link text, kept as the label. */}
            <p className="mono-label mt-3">
              <a
                href={note.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline-offset-4 hover:underline focus-visible:underline"
              >
                {pick(note.sourceLabel, locale)}
              </a>
            </p>
          </div>
        ))}
      </div>
    </SectionC>
  );
}
