/**
 * The worked example, set inside a single bounded panel so it reads as a
 * case set apart from the page's argument rather than another claim in it.
 * Order follows the way the disagreement actually happens: the situation,
 * what the security review finds, what operations says back, the modelled
 * pathway, the candidate controls, and only then the outcome.
 *
 * "Illustrative scenario — no customer data" is stated at the top, not the
 * bottom.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WORKED } from "./content";
import { WORKED_CONTROLS } from "./content-tables";
import { Callout, SectionHead } from "./kit";
import { TracePath } from "./trace";

export function Ts50701Worked({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="worked" className="mt-16 border-t border-border pt-10">
      <div className="rounded-2xl border border-border bg-muted/40 p-6 sm:p-9">
        <p className="mono-label text-primary-ink">Worked example</p>
        <div className="mt-4">
          <SectionHead id="worked" heading={WORKED.h2} locale={locale} />
        </div>
        <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">{pick(WORKED.disclaimer, locale)}</p>
        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">{pick(WORKED.situation, locale)}</p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <p className="mono-label text-muted-foreground">{pick(WORKED.findingsLabel, locale)}</p>
            <ul className="mt-3 flex list-none flex-col p-0">
              {WORKED.findings.map((f, i) => (
                <li
                  key={i}
                  className="border-b border-dashed border-border py-2.5 text-sm leading-relaxed text-foreground last:border-b-0"
                >
                  {pick(f, locale)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="mono-label text-muted-foreground">The disagreement</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(WORKED.conflict, locale)}</p>
          </div>
        </div>

        <div className="mt-9">
          <TracePath steps={WORKED.pathway} label={pick(WORKED.pathwayLabel, locale)} locale={locale} />
        </div>

        <figure className="mt-9">
          <figcaption className="mono-label mb-3 text-muted-foreground">{pick(WORKED.controlsLabel, locale)}</figcaption>
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <Table className="min-w-[44rem]">
              <TableHeader>
                <TableRow className="bg-muted/60">
                  <TableHead className="w-[26%] align-top text-foreground">{pick(WORKED.headTreatment, locale)}</TableHead>
                  <TableHead className="w-[40%] align-top text-foreground">{pick(WORKED.headTests, locale)}</TableHead>
                  <TableHead className="align-top text-foreground">{pick(WORKED.headInsight, locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WORKED_CONTROLS.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell className="align-top font-semibold text-foreground">{pick(c.treatment, locale)}</TableCell>
                    <TableCell className="align-top leading-relaxed text-muted-foreground">{pick(c.tests, locale)}</TableCell>
                    <TableCell className="align-top leading-relaxed text-muted-foreground">{pick(c.insight, locale)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </figure>

        <Callout>{pick(WORKED.result, locale)}</Callout>
      </div>
    </section>
  );
}
