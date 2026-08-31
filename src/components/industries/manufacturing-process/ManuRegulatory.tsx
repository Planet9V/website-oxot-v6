import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { REGULATORY } from "./content";
import { ManuCornerFrame } from "./ManuCornerFrame";

export function ManuRegulatory({ locale }: { locale: Locale }) {
  const t = REGULATORY;
  /* /assurance is EN-only — an NL reader falls back to /consulting rather
     than a 404, same pattern as EnergyRegulatory.tsx. */
  const assuranceHref = locale === "en" ? localePath("en", PATHS.assurance) : localePath("nl", PATHS.consulting);
  return (
    <section aria-labelledby="regulatory" className="mt-16 border-t border-border pt-10">
      <h2 id="regulatory" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="relative mt-8">
        <ManuCornerFrame />
        <div className="overflow-x-auto rounded-2xl border-2 border-border">
          <Table className="min-w-[52rem]">
            <TableHeader>
              <TableRow>
                <TableHead>Framework / requirement</TableHead>
                <TableHead>Relevance to manufacturing and process</TableHead>
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
      </div>
    </section>
  );
}
