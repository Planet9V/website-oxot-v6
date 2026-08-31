import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WORKED_EXAMPLE } from "./content";
import { WaterStop, WaterWave } from "./WaterSpine";
import { WaterScenarioDiagram } from "./WaterScenarioDiagram";

export function WaterWorkedExample({ locale }: { locale: Locale }) {
  const t = WORKED_EXAMPLE;
  return (
    <section aria-labelledby="worked-example" className="relative mt-20">
      <WaterWave />
      <WaterStop />
      <div className="flex flex-wrap items-start justify-between gap-3 max-w-xl">
        <h2 id="worked-example" className="h-sub">{pick(t.h2, locale)}</h2>
        <Badge variant="secondary">{pick(t.tag, locale)}</Badge>
      </div>
      <p className="prose-measure mt-5 max-w-xl body-lead leading-relaxed text-muted-foreground">{pick(t.scenario, locale)}</p>
      <p className="prose-measure mt-4 max-w-xl body-lead leading-relaxed text-muted-foreground">{pick(t.scenarioTwo, locale)}</p>

      <div className="mt-8 flex max-w-2xl flex-col gap-4">
        {t.inputs.map((inp, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="mono-label text-primary-ink">{pick(inp.category, locale)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(inp.items, locale)}</p>
          </div>
        ))}
      </div>

      <WaterScenarioDiagram locale={locale} />

      <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
        <Table className="min-w-[42rem]">
          <TableCaption className="sr-only">Candidate controls evaluated for this scenario</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate control</TableHead>
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

      <p className="prose-measure mt-6 max-w-xl border-l-2 border-primary pl-4 body-copy leading-relaxed text-foreground">
        {pick(t.result, locale)}
      </p>
      <p className="prose-measure mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{pick(t.citation, locale)}</p>
    </section>
  );
}
