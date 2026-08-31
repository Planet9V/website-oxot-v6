import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { INTELLIGENCE, MODES } from "./content";
import { INTEL_ROWS, LABELS, MODE_SPECS } from "./content-modes";
import { ModeDiagram } from "./mode-diagram";
import { ModeHead, SectionHead } from "./primitives";

/**
 * Sections 04–05: the three deployment modes, each with its own drawn
 * trust-boundary diagram, then the question every isolated deployment
 * raises next — how intelligence stays current across the boundary.
 *
 * THE THREE MODES ARE NOT A CARD GRID. They run down the page at full
 * measure, each one a heading, a paragraph, a full-width diagram and a
 * line saying where it is approvable — because a reader choosing between
 * them is comparing boundaries, and three boundaries squeezed side by side
 * into narrow columns is precisely the "cloud icon cards" shape
 * OXOT_content-to-visual-mapping-table.md names as the thing to avoid for
 * this exact content type.
 *
 * The modes are ALSO not ranked. They appear in the source document's
 * order, they carry no price, tier or "recommended" marker, and the
 * approvable-where line under each is deliberately about the customer's
 * security policy rather than about their budget.
 *
 * The intelligence table follows the modes rather than preceding them,
 * because it only makes sense once a reader has seen the diode: it is the
 * governance menu behind the single arrow in section 4.2.
 */
export function DeployModes({ locale }: { locale: Locale }) {
  return (
    <>
      <section aria-labelledby="modes" className="mt-16 border-t border-border pt-12">
        <SectionHead n={MODES.n} id="modes" title={pick(MODES.title, locale)} dek={pick(MODES.dek, locale)} />
        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">
          {pick(MODES.intro, locale)}
        </p>

        {MODE_SPECS.map((mode) => (
          <div key={mode.id} className="mt-14">
            <ModeHead
              n={mode.n}
              id={mode.id}
              name={pick(mode.name, locale)}
              statement={pick(mode.statement, locale)}
            />
            <p className="prose-measure mt-5 body-lead leading-relaxed text-foreground">
              {pick(mode.body, locale)}
            </p>

            <ModeDiagram mode={mode} locale={locale} figureNote={pick(MODES.figureNote, locale)} />

            <p className="prose-measure mt-6 border-t border-dashed border-border pt-4 text-sm leading-relaxed text-muted-foreground">
              <span className="mono-label font-bold text-primary-ink">{pick(LABELS.modes.approvable, locale)}</span>{" "}
              {pick(mode.approvable, locale)}
            </p>
          </div>
        ))}
      </section>

      <section aria-labelledby="intelligence" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={INTELLIGENCE.n}
          id="intelligence"
          title={pick(INTELLIGENCE.title, locale)}
          dek={pick(INTELLIGENCE.dek, locale)}
        />

        <div className="mt-7">
          <Table>
            <TableCaption className="text-left">{pick(LABELS.intel.caption, locale)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.intel.option, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.intel.how, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.intel.best, locale)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INTEL_ROWS.map((row) => (
                <TableRow key={row.option.en}>
                  <TableCell className="min-w-[11rem] align-top font-medium text-foreground">
                    {pick(row.option, locale)}
                  </TableCell>
                  <TableCell className="min-w-[20rem] align-top text-muted-foreground">
                    {pick(row.how, locale)}
                  </TableCell>
                  <TableCell className="min-w-[16rem] align-top text-muted-foreground">
                    {pick(row.best, locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">
          {pick(INTELLIGENCE.close, locale)}
        </p>
      </section>
    </>
  );
}
