import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SECTOR_REALITY } from "./content";
import { WaterStop, WaterWave } from "./WaterSpine";

export function WaterSectorReality({ locale }: { locale: Locale }) {
  const t = SECTOR_REALITY;
  return (
    <section aria-labelledby="sector-reality" className="relative mt-20">
      <WaterWave />
      <WaterStop />
      <h2 id="sector-reality" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 max-w-xl body-lead leading-relaxed text-muted-foreground">{pick(t.bodyOne, locale)}</p>
      <p className="prose-measure mt-4 max-w-xl body-lead leading-relaxed text-muted-foreground">{pick(t.bodyTwo, locale)}</p>
      <p className="prose-measure mt-4 max-w-xl border-l-2 border-primary/50 pl-4 text-sm leading-relaxed text-foreground">
        {pick(t.statNote, locale)}
      </p>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
        <Table className="min-w-[42rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Challenge</TableHead>
              <TableHead>Why it is different in water and wastewater</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.challenges.map((c, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-medium text-foreground">{pick(c.term, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(c.body, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
