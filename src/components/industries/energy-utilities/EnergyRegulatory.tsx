import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { REGULATORY } from "./content";

export function EnergyRegulatory({ locale }: { locale: Locale }) {
  const t = REGULATORY;
  /* /assurance is EN-only (see its own doc comment) — this page is not, so
     an NL reader falls back to /consulting rather than a 404, same pattern
     already established for the /nl/iec-62443 redirect and the
     check/conformity persona-picker fix. */
  const assuranceHref = locale === "en" ? localePath("en", PATHS.assurance) : localePath("nl", PATHS.consulting);
  return (
    <section aria-labelledby="regulatory" className="mt-16 border-t border-border pt-10">
      <h2 id="regulatory" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <Table className="min-w-[52rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Framework / requirement</TableHead>
              <TableHead>Relevance to energy and utilities</TableHead>
              <TableHead>How OXOT supports the work</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-semibold text-foreground">
                  {r.href === "assurance" ? (
                    <Link href={assuranceHref} className="text-primary-ink underline underline-offset-4">
                      {r.framework}
                    </Link>
                  ) : (
                    r.framework
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
