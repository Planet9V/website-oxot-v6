import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ARCHITECTURE } from "./content";
import { DefenseSectionHead } from "./DefenseSectionHead";

/* Fixed, literal Tailwind classes (not built from a template string) so the
   JIT compiler keeps every one of them — a progressive left-indent per
   tier, reading as a descending staircase from mission down to external
   dependency. This is the page's own stand-in for energy-utilities'
   horizontal EnergyLine "riser" (EnergyArchitecture.tsx): a vertical,
   angular, mission-first descent rather than a schematic single-line
   diagram. */
const TIER_INDENT = ["ml-0", "ml-5", "ml-10", "ml-14", "ml-[4.5rem]", "ml-[5.5rem]"];

export function DefenseArchitecture({ locale }: { locale: Locale }) {
  const t = ARCHITECTURE;
  return (
    <section aria-labelledby="architecture">
      <DefenseSectionHead id="architecture" kicker="Architecture" heading={pick(t.h2, locale)} intro={pick(t.intro, locale)} />

      <ol className="mt-12 flex list-none flex-col p-0">
        {t.tiers.map((tier, i) => (
          <li
            key={i}
            className={`relative max-w-2xl border-l-2 border-primary/40 py-6 pl-7 ${TIER_INDENT[i] ?? ""}`}
          >
            <span aria-hidden="true" className="absolute -left-[7px] top-[1.65rem] size-[9px] rotate-45 bg-primary" />
            <span className="mono-label text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-1 h-card">{pick(tier.name, locale)}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pick(tier.body, locale)}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 overflow-x-auto border border-border">
        <Table className="min-w-[46rem]">
          <TableCaption className="sr-only">Core technology domains modeled at the OT and physical-support tier</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead>Defense and government examples</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.domains.map((d, i) => (
              <TableRow key={i}>
                <TableCell className="align-top font-semibold text-foreground">{pick(d.domain, locale)}</TableCell>
                <TableCell className="align-top text-muted-foreground">{pick(d.examples, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-10 border border-border p-6 sm:p-8">
        <p className="mono-label text-muted-foreground">Views the model supports</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {t.views.map((v, i) => (
            <Badge key={i} variant="outline" className="rounded-none">
              {pick(v, locale)}
            </Badge>
          ))}
        </div>
        <p className="prose-measure mt-4 text-sm leading-relaxed text-muted-foreground">{pick(t.viewsNote, locale)}</p>
      </div>
    </section>
  );
}
