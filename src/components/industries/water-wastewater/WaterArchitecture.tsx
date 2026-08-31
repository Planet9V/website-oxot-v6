import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ARCHITECTURE } from "./content";
import { WaterStop, WaterWave } from "./WaterSpine";

/** Where "Drinking Water" and "Wastewater" become two literal stops along
 *  the vertical spine, rather than a side-by-side comparison split. Each
 *  stop gets its own larger station marker and a short local rail of
 *  process stages read top to bottom. */
function ArchitectureStop({
  label,
  stages,
  locale
}: {
  label: string;
  stages: readonly { name: Bilingual; body: Bilingual }[];
  locale: Locale;
}) {
  return (
    <div className="relative border-l-2 border-primary/30 pl-6">
      <span className="absolute -left-[7px] -top-1 size-3 rounded-full bg-primary ring-4 ring-background" aria-hidden="true" />
      <h3 className="mono-label text-primary-ink">{label}</h3>
      <div className="mt-4 flex flex-col gap-5">
        {stages.map((s, i) => (
          <div key={i} className="relative pl-5">
            <span className="absolute left-0 top-1.5 size-[6px] rounded-full bg-primary/60" aria-hidden="true" />
            <h4 className="h-card text-base">{pick(s.name, locale)}</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pick(s.body, locale)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WaterArchitecture({ locale }: { locale: Locale }) {
  const t = ARCHITECTURE;
  return (
    <section aria-labelledby="architecture" className="relative mt-20">
      <WaterWave />
      <WaterStop size="lg" />
      <h2 id="architecture" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 max-w-xl body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <ArchitectureStop label={pick(t.drinking.label, locale)} stages={t.drinking.stages} locale={locale} />
        <ArchitectureStop label={pick(t.wastewater.label, locale)} stages={t.wastewater.stages} locale={locale} />
      </div>

      <p className="prose-measure mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">{pick(t.twinNote, locale)}</p>

      <h3 className="mono-label mt-10 text-muted-foreground">Common OT, telemetry, and process technologies</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
        <Table className="min-w-[42rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Technology area</TableHead>
              <TableHead>Water and wastewater examples</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.techTable.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-medium text-foreground">{pick(row.area, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(row.examples, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
