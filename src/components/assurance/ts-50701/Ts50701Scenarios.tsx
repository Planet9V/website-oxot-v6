"use client";

/**
 * The scenario library. The source brief asks for an interactive scenario
 * library; what is actually built here is a real two-way switch between
 * the passenger and freight sets, using the project's own Radix tabs —
 * genuine interaction, and no more than that. There is no filtering, no
 * live data and no drill-down on this page, so nothing in the copy claims
 * any. The wider library the brief imagines is not built yet; this is the
 * honest first half of it, not a mock-up of the second.
 *
 * The five-stage trace above the tabs is the reason both tables carry the
 * same three columns: every scenario is the same walk from entry point to
 * railway consequence, whichever sector it belongs to.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SCENARIOS } from "./content";
import { SCENARIOS_FREIGHT, SCENARIOS_PASSENGER, type ScenarioRow } from "./content-tables";
import { SectionHead } from "./kit";
import { TraceRail } from "./trace";

function ScenarioTable({ rows, locale }: { rows: readonly ScenarioRow[]; locale: Locale }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <Table className="min-w-[48rem]">
        <TableHeader>
          <TableRow className="bg-muted/60">
            <TableHead className="w-[24%] align-top text-foreground">{pick(SCENARIOS.headScenario, locale)}</TableHead>
            <TableHead className="w-[38%] align-top text-foreground">{pick(SCENARIOS.headPathway, locale)}</TableHead>
            <TableHead className="align-top text-foreground">{pick(SCENARIOS.headConsequence, locale)}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              <TableCell className="align-top font-semibold text-foreground">{pick(r.scenario, locale)}</TableCell>
              <TableCell className="align-top leading-relaxed text-muted-foreground">{pick(r.pathway, locale)}</TableCell>
              <TableCell className="align-top leading-relaxed text-muted-foreground">{pick(r.consequence, locale)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function Ts50701Scenarios({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="scenarios" className="mt-16 border-t border-border pt-10">
      <SectionHead id="scenarios" heading={SCENARIOS.h2} lead={SCENARIOS.lead} locale={locale} />

      <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <TraceRail stages={SCENARIOS.chain} label="Scenario logic" locale={locale} />
      </div>

      <Tabs defaultValue="passenger" className="mt-8">
        <TabsList>
          <TabsTrigger value="passenger">{pick(SCENARIOS.passengerTab, locale)}</TabsTrigger>
          <TabsTrigger value="freight">{pick(SCENARIOS.freightTab, locale)}</TabsTrigger>
        </TabsList>
        {/* forceMount + an explicit hide. Radix unmounts an inactive tab,
            which would leave half the scenario library out of the rendered
            HTML — invisible to a crawler and absent from the page source.
            forceMount keeps both tables in the markup but deliberately
            leaves visibility to the caller, so the inactive one is hidden
            here with `display:none`, which also takes it out of the
            accessibility tree: assistive technology sees exactly the table
            a sighted reader does. */}
        <TabsContent value="passenger" forceMount className="data-[state=inactive]:hidden">
          <ScenarioTable rows={SCENARIOS_PASSENGER} locale={locale} />
        </TabsContent>
        <TabsContent value="freight" forceMount className="data-[state=inactive]:hidden">
          <ScenarioTable rows={SCENARIOS_FREIGHT} locale={locale} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
