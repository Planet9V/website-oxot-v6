import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { REGULATORY } from "./content";

/**
 * CUSTOM TREATMENT, DELIBERATE — and the shortest justification on the page:
 * the source is a nine-row table of frameworks, and a table should be a table.
 * `OXOT_content-to-visual-mapping-table.md` has no entry that turns regulatory
 * scope into a diagram, and Evidence Dossier (Pattern 5) — the one pattern that
 * handles standards traces — is restricted by its own text to Assurance pages,
 * which this is not.
 *
 * It also earns its place in the page's rhythm: a dense, quiet, tabular section
 * directly after seven airy full-width strata and directly before a four-marker
 * sequence. Density is the variation here, not another accent.
 *
 * TWO ROWS LINK OUT, seven do not, and that asymmetry is honest: NIS2 and
 * IEC 62443 have real destinations on this site today. No row is given a
 * placeholder href, which the Foundation Spec's acceptance criteria forbid
 * outright.
 */

const DESTINATIONS = {
  assurance: PATHS.assurance,
  iec62443: PATHS.assuranceIec62443
} as const;

export function Regulatory({ locale }: { locale: Locale }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[48rem] border-collapse text-left">
          <caption className="sr-only">{pick(REGULATORY.h2, locale)}</caption>
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th scope="col" className="mono-label px-5 py-3 font-medium">
                {pick(REGULATORY.headings.framework, locale)}
              </th>
              <th scope="col" className="mono-label px-5 py-3 font-medium">
                {pick(REGULATORY.headings.relevance, locale)}
              </th>
              <th scope="col" className="mono-label px-5 py-3 font-medium">
                {pick(REGULATORY.headings.support, locale)}
              </th>
            </tr>
          </thead>
          <tbody>
            {REGULATORY.rows.map((row) => (
              <tr key={row.framework} className="border-b border-border align-top last:border-b-0">
                <th scope="row" className="w-1/5 px-5 py-5 body-copy font-medium text-foreground">
                  {row.href ? (
                    <Link
                      href={localePath(locale, DESTINATIONS[row.href])}
                      className="text-primary-ink underline-offset-4 hover:underline"
                    >
                      {row.framework}
                    </Link>
                  ) : (
                    row.framework
                  )}
                </th>
                <td className="w-2/5 px-5 py-5 body-copy leading-relaxed text-foreground">
                  {pick(row.relevance, locale)}
                </td>
                <td className="w-2/5 px-5 py-5 body-copy leading-relaxed text-muted-foreground">
                  {pick(row.support, locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-4">
        {REGULATORY.notes.map((note, i) => (
          <p key={i} className="prose-measure body-copy leading-relaxed text-muted-foreground">
            {pick(note, locale)}
          </p>
        ))}
      </div>
    </div>
  );
}
