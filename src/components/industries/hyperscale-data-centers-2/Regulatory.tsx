import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { StaticTable } from "@/components/ui/static-table";
import { REGULATORY } from "./content.regulatory";
import { SectionC } from "./Rule";

/**
 * S12 · REGULATORY, ASSURANCE AND SUSTAINABILITY CONTEXT — header recipe H-C,
 * and the only section on this page that takes it.
 *
 * WHY H-C HERE AND NOWHERE ELSE. `Rule.tsx` binds H-C to the reference-matrix
 * shape: a table whose columns have to be named in words before a reader can use
 * them. Source L460–L469 is the only genuine reference matrix on this page, and
 * the only table here whose three columns are not self-describing — each row
 * carries one instrument, one statement about the reader's own exposure, and one
 * statement about OXOT, which are three different KINDS of claim sitting side by
 * side. Every other table on this page (the technology index, the asset classes)
 * sits under a heading that already says what its columns are. The binding is
 * falsifiable: any other section with this shape would get H-C too, and none
 * has it.
 *
 * THE LEAD IS THE COMPLIANCE GUARDRAIL, AND THAT PLACEMENT IS THE POINT. Source
 * L458 bars any promise of automatic regulatory compliance, certification or
 * assurance outcomes. A page can honour that by writing careful cell text — and
 * this one does, all twenty-four cells verbatim — but careful cell text is not a
 * disclaimer, and eight named instruments laid out in a matrix is precisely the
 * layout from which a reader infers "they get us these". So the guardrail is
 * stated, in words, in the section's lead slot: full body size, directly under
 * the h2, ABOVE the caption and the matrix. It is deliberately not a footnote
 * under the table and not small print — a reader who reads only the headline and
 * the first paragraph still meets it. Same technique as
 * `energy-utilities-2/Regulatory.tsx`, this page's own guardrail text.
 *
 * `static-table.tsx`, NOT `data-table.tsx`. Eight rows, prose in all three
 * cells, read top to bottom. There is no severity, no zone, no clause number and
 * no date — nothing anyone would sort or filter by — so the TanStack sort/filter
 * bar `data-table.tsx` brings would offer an interaction that answers no
 * question the visitor has. `StaticTable` also emits `<th scope="row">` on the
 * first cell unconditionally (verified at `src/components/ui/static-table.tsx:65`,
 * not assumed), which is what makes a screen reader announce "Commission
 * Delegated Regulation (EU) 2024/1364 — establishes harmonized reporting
 * elements…" rather than a disembodied clause.
 *
 * `minWidth` is `62rem`, above the energy page's `56rem` for the same three-
 * column shape, and the reason is column one rather than the prose. Energy's
 * first column holds short standard designations; two of this table's eight are
 * full instrument titles — "Commission Implementing Regulation (EU) 2024/2690"
 * runs to forty-eight characters with no break opportunity that reads well. At
 * `56rem` those two rows push column one wide and squeeze the two prose columns
 * unevenly against the six short rows around them. `62rem` seats the long titles
 * on two lines and leaves the prose columns even down the whole table. Narrower
 * viewports scroll INSIDE the primitive's `overflow-x-auto` wrapper, never the
 * page body — the project convention for a wide comparison table.
 *
 * TWO ROWS LINK OUT, SIX DO NOT, AND ONLY ONE OF THE TWO IS LOCALE-GATED. The
 * NIS2 row resolves to the `/assurance` index (gap resolution G5 — nav.ts has no
 * NIS2 route), and `src/app/[locale]/assurance/page.tsx` calls `notFound()` for
 * any locale but `en`, so that one href takes the established
 * `locale === "en" ? PATHS.assurance : PATHS.consulting` gate that every live
 * industry page applies to it. The IEC 62443 row points at a framework page
 * BENEATH `/assurance`, which renders in both locales; gating it too would send
 * Dutch readers away from a page that works for them. The distinction is carried
 * in the data as `englishOnly`, set on exactly one row, so this component cannot
 * silently widen it by matching on href strings.
 *
 * THE TWO CITED NOTES SIT BELOW THE TABLE, NOT INSIDE IT. Source L471 and L473
 * are external footing — one Commission, one ENISA. Folding them into the EED
 * and NIS2 rows would give two of eight rows a citation the other six lack,
 * implying the rest are unsourced, and would bury a paragraph of prose inside an
 * already-dense matrix cell. They are a paired closing block instead.
 *
 * NO INVENTED LEGAL FACT. Nothing here tells a reader whether they are in scope
 * of anything, dates an obligation, or glosses what an instrument requires of
 * them. Every string is transcribed from L456–L473; see content.regulatory.ts,
 * which carries the source line against each value and records the one
 * transposition made (L458's first sentence out of the imperative).
 */
export function Regulatory({ locale }: { locale: Locale }) {
  return (
    <SectionC
      id="regulatory-assurance"
      index="12"
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
          const href =
            row.englishOnly && locale !== "en"
              ? localePath(locale, PATHS.consulting)
              : row.href && localePath(locale, row.href);
          return [
            href ? (
              <Link
                href={href}
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-primary-ink focus-visible:decoration-primary-ink"
              >
                {framework}
              </Link>
            ) : (
              framework
            ),
            pick(row.relevance, locale),
            pick(row.support, locale)
          ];
        })}
        minWidth="62rem"
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
