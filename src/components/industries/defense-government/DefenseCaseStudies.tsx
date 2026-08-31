import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CASE_STUDIES } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

export function DefenseCaseStudies({ locale }: { locale: Locale }) {
  const t = CASE_STUDIES;
  return (
    <section aria-labelledby="case-studies">
      <DefenseSectionHead id="case-studies" kicker="Case-study programme" heading={pick(t.h2, locale)} intro={pick(t.intro, locale)} />

      <ul className="prose-measure mt-10 flex list-none flex-col gap-3 border-l-2 border-primary/40 p-0 pl-6 text-sm leading-relaxed text-foreground">
        {t.rules.map((r, i) => (
          <li key={i}>{pick(r, locale)}</li>
        ))}
      </ul>

      <div className="mt-12 overflow-x-auto border border-border">
        <Table className="min-w-[40rem]">
          <TableCaption className="sr-only">Case-study categories and the real question each one answers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Case study</TableHead>
              <TableHead>The real question</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.categories.map((c, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-semibold text-foreground">{pick(c.name, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(c.question, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
