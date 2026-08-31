import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { REGULATORY } from "./content";
import { WaterStop, WaterWave } from "./WaterSpine";

export function WaterRegulatory({ locale }: { locale: Locale }) {
  const t = REGULATORY;
  /* /assurance is EN-only (see its own doc comment) — this page is not, so
     an NL reader falls back to /consulting rather than a 404, same pattern
     energy-utilities' EnergyRegulatory.tsx uses. */
  const assuranceHref = locale === "en" ? localePath("en", PATHS.assurance) : localePath("nl", PATHS.consulting);
  return (
    <section aria-labelledby="regulatory" className="relative mt-20">
      <WaterWave />
      <WaterStop />
      <h2 id="regulatory" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 max-w-xl body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <Table className="min-w-[52rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Framework / obligation</TableHead>
              <TableHead>Sector relevance</TableHead>
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

      <div className="mt-6 flex max-w-xl flex-col gap-3">
        {t.notes.map((n, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">{pick(n, locale)}</p>
        ))}
      </div>
    </section>
  );
}
