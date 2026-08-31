import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WORKED_EXAMPLE } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";
import { DefenseScenarioDiagram } from "./DefenseScenarioDiagram";

export function DefenseWorkedExample({ locale }: { locale: Locale }) {
  const t = WORKED_EXAMPLE;
  return (
    <section aria-labelledby="worked-example">
      <DefenseSectionHead id="worked-example" kicker="Worked example" heading={pick(t.h2, locale)} />
      <Badge variant="secondary" className="mt-4 h-auto max-w-full whitespace-normal rounded-none text-left">
        {pick(t.tag, locale)}
      </Badge>
      <p className="prose-measure mt-6 body-lead leading-relaxed text-muted-foreground">{pick(t.scenario, locale)}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {t.inputs.map((inp, i) => (
          <div key={i} className="border border-border p-5">
            <h3 className="mono-label text-primary-ink">{pick(inp.category, locale)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(inp.items, locale)}</p>
          </div>
        ))}
      </div>

      <DefenseScenarioDiagram locale={locale} />

      <div className="mt-10 overflow-x-auto border border-border">
        <Table className="min-w-[46rem]">
          <TableCaption className="sr-only">Candidate controls evaluated for this scenario</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate decision</TableHead>
              <TableHead>What the Twin tests</TableHead>
              <TableHead>Decision insight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.controls.map((c, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-medium text-foreground">{pick(c.option, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(c.evaluates, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(c.outcome, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="prose-measure mt-8 border-l-4 border-primary pl-6 text-lg leading-relaxed text-foreground">
        {pick(t.result, locale)}
      </p>
    </section>
  );
}
