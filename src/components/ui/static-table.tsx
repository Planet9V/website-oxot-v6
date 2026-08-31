import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A STATIC REFERENCE TABLE — real `<table>` markup for content that is
 * genuinely a matrix, with no sort, no filter and no client JavaScript.
 *
 * PROMOTED, NOT INVENTED. This exact shape — `head` / `rows` / optional
 * `caption` / optional `minWidth` — already existed four times over as a
 * private helper: `assurance/iec-62278-2/page-kit.tsx`,
 * `assurance/cyber-resilience-act/kit.tsx`, `assurance/overview/page-kit.tsx`
 * and `resources/air-gapped-deployments/doc-kit.tsx` all converged on it
 * independently. `/industries/water-wastewater-2` is its first caller here
 * rather than the fifth private copy; the four existing callers are untouched
 * and can migrate when someone is already editing them.
 *
 * WHY NOT `ui/data-table.tsx`. That component is a TanStack table with a
 * sort/filter bar. Both tables on the water page are prose in every cell, with
 * no column anyone would sort by — no criticality, no layer, no clause number —
 * and both read top to bottom. Rendering a sort control over ten sentences
 * offers an interaction that answers no question.
 *
 * `<th scope="row">` on the first cell, because the first column is the row's
 * name rather than a value: that is what lets a screen reader announce "Small
 * OT teams — many utilities have limited in-house cyber capacity" instead of
 * reading a disembodied sentence.
 *
 * The wrapper's `min-w-0` is load-bearing rather than tidiness. A grid or flex
 * child defaults to `min-width: auto`, so without it the table's `minWidth`
 * propagates out through the scroll container and sizes the whole track — which
 * is how a page ends up scrolling sideways at 390px. The wrapper scrolls, never
 * the page body.
 */
export interface StaticTableProps {
  head: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  /** Rendered as a real `<caption>`, visually placed under the table. */
  caption?: string;
  /** Keeps columns from collapsing to single characters on a phone. */
  minWidth?: string;
  className?: string;
}

export function StaticTable({ head, rows, caption, minWidth = "42rem", className }: StaticTableProps) {
  return (
    <div className={cn("w-full min-w-0 overflow-x-auto", className)}>
      <table className="w-full caption-bottom border-collapse text-left text-sm" style={{ minWidth }}>
        {caption && <caption className="pt-4 text-left text-sm text-muted-foreground">{caption}</caption>}
        <thead>
          <tr className="border-b border-border">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="mono-label py-2.5 pr-5 align-bottom font-bold uppercase leading-normal tracking-[0.1em] text-primary-ink last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-dashed border-border last:border-b-0">
              <th
                scope="row"
                className="py-3.5 pr-5 align-top body-copy font-semibold leading-relaxed text-foreground"
              >
                {row[0]}
              </th>
              {row.slice(1).map((cell, j) => (
                <td
                  key={j}
                  className="py-3.5 pr-5 align-top body-copy leading-relaxed text-muted-foreground last:pr-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
