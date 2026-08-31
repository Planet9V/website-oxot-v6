import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { StaticTable } from "@/components/ui/static-table";
import { REGULATORY } from "./content.regulatory";
import { SectionC } from "./Rule";

/**
 * S08 · REGULATORY AND STANDARDS CONTEXT — header recipe H-C, and the only
 * section on this page that takes it.
 *
 * WHY H-C HERE AND NOWHERE ELSE. H-C is route + h2 + lead + a mono-label table
 * caption, and it exists for the reference-matrix shape: a table whose columns
 * need naming in words before a reader can use it. Source L267–L275 is the only
 * genuine reference matrix on this page — seven regulatory instruments against
 * what each covers and what the Twin contributes. S02's technology table is a
 * two-column list of examples and takes H-A; nothing else here is a matrix at
 * all. The test is falsifiable: another section with this shape would get H-C
 * too, and none has it.
 *
 * THE LEAD IS THE COMPLIANCE GUARDRAIL, AND THAT PLACEMENT IS THE POINT. Source
 * L265 bars any claim of automatic compliance, certification or audit approval.
 * A page can honour that by writing careful cell text — and this one does, every
 * cell verbatim — but careful cell text is not a disclaimer, and seven named
 * standards laid out in a matrix is precisely the layout from which a reader
 * infers "they do these". So the guardrail is stated, in words, in the section's
 * lead slot: full body size, directly under the h2, ABOVE the caption and the
 * matrix. It is deliberately not a footnote under the table and not small print
 * — a reader who reads only the headline and the first paragraph still meets it.
 *
 * `static-table.tsx`, NOT `data-table.tsx`. Seven rows, prose in all three
 * cells, read top to bottom. There is no severity, no zone, no clause number and
 * no date — nothing anyone would sort or filter by — so the TanStack sort/filter
 * bar `data-table.tsx` brings would offer an interaction that answers no
 * question the visitor has. `StaticTable` also emits `<th scope="row">` on the
 * first cell unconditionally (verified at `src/components/ui/static-table.tsx:65`,
 * not assumed), which is what makes a screen reader announce "IEC 62443 — core
 * cybersecurity framework for industrial automation and control systems" rather
 * than a disembodied clause. This wrapper is therefore thin on purpose: all it
 * adds is resolving `Bilingual` values against the active locale and hanging the
 * two cited notes below.
 *
 * `minWidth` is raised above the primitive's 42rem default because this table
 * has three prose columns where the shared default assumes two; at 42rem the
 * third column collapses to a few characters per line. The wrapper scrolls,
 * never the page body — OXOT_Mobile_Rules.md permits horizontal scroll for a
 * wide comparison table, and only inside its own container.
 *
 * THE TWO CITED NOTES SIT BELOW THE TABLE, NOT INSIDE IT. Source L277 and L279
 * are jurisdictional footing — one EU, one North American — and neither applies
 * to every reader. Folding them into the EU Electricity Cybersecurity Network
 * Code and NERC CIP rows would make them read as extra support claims for those
 * two frameworks, and would give two of seven rows a citation the other five
 * lack, implying the rest are unsourced. They are a paired closing block
 * instead, each label naming whose jurisdiction is speaking.
 *
 * NO INVENTED LEGAL FACT. Nothing here tells a reader whether they are in scope
 * of anything, dates an obligation, or glosses what a standard requires of them.
 * Every string is transcribed from L259–L279; see content.regulatory.ts, which
 * carries the source line against each value and records the one transposition
 * made (L265 out of the second person).
 */
export function Regulatory({ locale }: { locale: Locale }) {
  return (
    <SectionC
      id="regulatory-standards"
      index="08"
      datumLabel={REGULATORY.datumLabel}
      heading={REGULATORY.h2}
      lead={REGULATORY.guardrail}
      caption={REGULATORY.caption}
      locale={locale}
    >
      <StaticTable
        head={REGULATORY.head.map((h) => pick(h, locale))}
        rows={REGULATORY.rows.map((row) => [
          pick(row.framework, locale),
          pick(row.relevance, locale),
          pick(row.support, locale)
        ])}
        minWidth="56rem"
      />

      <div className="mt-12 grid gap-8 border-t border-border pt-8 lg:grid-cols-2 lg:gap-12">
        {REGULATORY.notes.map((note) => (
          <div key={note.href} className="min-w-0">
            <p className="mono-label text-primary-ink">{pick(note.jurisdiction, locale)}</p>
            <p className="mt-3 body-copy leading-relaxed text-muted-foreground">
              {pick(note.body, locale)}
            </p>
            {/* The brief's own visible link text, kept as the label. */}
            <p className="mono-label mt-3">
              <a
                href={note.href}
                target="_blank"
                rel="noreferrer"
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
