import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { REGULATORY } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

export function DefenseRegulatory({ locale }: { locale: Locale }) {
  const t = REGULATORY;
  /* /assurance is EN-only — an NL reader falls back to /consulting rather
     than a 404, same pattern as EnergyRegulatory.tsx. */
  const assuranceHref = locale === "en" ? localePath("en", PATHS.assurance) : localePath("nl", PATHS.consulting);
  return (
    <section aria-labelledby="regulatory">
      <DefenseSectionHead id="regulatory" kicker="Assurance" heading={pick(t.h2, locale)} intro={pick(t.intro, locale)} />

      <div className="mt-10 overflow-x-auto border border-border">
        <Table className="min-w-[52rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Framework / context</TableHead>
              <TableHead>Relevance</TableHead>
              <TableHead>How OXOT supports the work</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-semibold text-foreground">
                  {r.href === "assurance" ? (
                    <Link href={assuranceHref} className="text-primary-ink underline underline-offset-4">
                      {pick(r.framework, locale)}
                    </Link>
                  ) : (
                    pick(r.framework, locale)
                  )}
                </TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(r.relevance, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(r.support, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
