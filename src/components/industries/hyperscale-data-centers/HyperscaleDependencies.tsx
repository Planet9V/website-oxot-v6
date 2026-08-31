import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEPENDENCIES } from "./content";
import { StatusDot } from "./StatusDot";

/**
 * THE DIFFERENTIATOR — the six external dependency domains (energy, water,
 * communications, commercial, defense/sovereign, manufacturing/supply
 * chain) as a dashboard wall of domain panels, each carrying its own
 * mono-numbered readout list. The cooling-architecture table follows,
 * since water dependency is architecture-specific rather than a flat list.
 */
export function HyperscaleDependencies({ locale }: { locale: Locale }) {
  const t = DEPENDENCIES;
  return (
    <section aria-labelledby="dependencies" className="mt-16 border-t border-border pt-10">
      <h2 id="dependencies" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {t.domains.map((d, i) => (
          <li key={i} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold tabular-nums text-primary-ink">D{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-card text-base">{pick(d.name, locale)}</h3>
            </div>
            <ul className="mt-3 flex list-none flex-col gap-2 p-0">
              {d.body.map((b, j) => (
                <li key={j} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <StatusDot className="mt-1" />
                  <span>{pick(b, locale)}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p className="mono-label mb-4 mt-10 text-muted-foreground">{pick(t.coolingLabel, locale)}</p>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <Table className="min-w-[42rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Cooling model</TableHead>
              <TableHead>Key dependency / cyber concern</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.cooling.map((c, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-medium text-foreground">{pick(c.model, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(c.concern, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
