import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SOVEREIGNTY } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

/** Six sovereignty dimensions as one plain, sharp-edged table — a
 *  deliberately restrained data surface (no card grid, no rounded
 *  corners) distinguishing digital sovereignty from a data-residency
 *  claim. */
export function DefenseSovereignty({ locale }: { locale: Locale }) {
  const t = SOVEREIGNTY;
  return (
    <section aria-labelledby="sovereignty">
      <DefenseSectionHead id="sovereignty" kicker="Sovereignty" heading={pick(t.h2, locale)} intro={pick(t.intro, locale)} />

      <div className="mt-10 overflow-x-auto border border-border">
        <Table className="min-w-[52rem]">
          <TableCaption className="sr-only">The six dimensions of sovereignty this page uses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Dimension</TableHead>
              <TableHead>What it means in practice</TableHead>
              <TableHead>What the Twin models</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-semibold text-foreground">{pick(r.dimension, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(r.practice, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(r.models, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
