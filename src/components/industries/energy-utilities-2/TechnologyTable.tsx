import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { StaticTable } from "@/components/ui/static-table";
import { TECH_TABLE } from "./content.architecture";

/**
 * S02's technology-and-data-sources matrix — source L118–L127.
 *
 * A THIN WRAPPER, AND DELIBERATELY THIN. All this adds over `StaticTable` is
 * resolving six `Bilingual` rows against the active locale; the markup,
 * `<th scope="row">` semantics and the horizontal-scroll container all live in
 * the shared primitive. Re-implementing a `<table>` here would fork behaviour
 * that four other pages already depend on.
 *
 * `static-table.tsx`, NOT `data-table.tsx`. The distinction is the interaction
 * the table earns. This is six rows, read top to bottom, with prose in every
 * cell and no column anyone would sort by — no severity, no zone, no clause
 * number. `data-table.tsx` is a TanStack table with a sort/filter bar, and
 * hanging a sort control over six sentences offers an interaction that answers
 * no question the visitor has.
 *
 * `minWidth` is set below the primitive's 42rem default because this table has
 * only two columns. The wrapper scrolls, never the page body — which is what
 * keeps a 390px viewport from scrolling sideways (OXOT_Mobile_Rules.md permits
 * horizontal scroll for a wide comparison table, and only inside its own
 * container).
 */
export function TechnologyTable({ locale }: { locale: Locale }) {
  return (
    <StaticTable
      head={TECH_TABLE.head.map((h) => pick(h, locale))}
      rows={TECH_TABLE.rows.map((row) => [pick(row.domain, locale), pick(row.examples, locale)])}
      minWidth="36rem"
    />
  );
}
