import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { APPROACH, CHALLENGE, REQUIREMENTS } from "./content";
import { LABELS, REQUIREMENT_ROWS } from "./content-tables";
import { EvidencePipeline } from "./figures";
import { FigureNote, PullQuote, SectionHead, SourceNote, SubHead, Trace, TraceList } from "./primitives";

/**
 * Sections 01–03: why the evidence is fragmented, what the standard asks
 * for, and how OXOT answers it. The argument before the model.
 *
 * Split from IecModel and IecEvidence purely to keep every file under 500
 * lines — the three read as one continuous article, and the section
 * numbering runs straight through them.
 */
export function IecFoundations({ locale }: { locale: Locale }) {
  return (
    <>
      <section aria-labelledby="challenge">
        <SectionHead
          n={CHALLENGE.n}
          id="challenge"
          title={pick(CHALLENGE.title, locale)}
          dek={pick(CHALLENGE.dek, locale)}
        />
        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">{pick(CHALLENGE.intro, locale)}</p>
        <TraceList items={CHALLENGE.symptoms.map((s) => pick(s, locale))} />
        <PullQuote>{pick(CHALLENGE.pullQuote, locale)}</PullQuote>
        <p className="prose-measure body-lead leading-relaxed text-foreground">{pick(CHALLENGE.close, locale)}</p>
      </section>

      <section aria-labelledby="requirements" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={REQUIREMENTS.n}
          id="requirements"
          title={pick(REQUIREMENTS.title, locale)}
          dek={pick(REQUIREMENTS.dek, locale)}
        />
        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">
          {pick(REQUIREMENTS.intro, locale)}
        </p>

        <div className="mt-7">
          <Table>
            <TableCaption className="text-left">{pick(LABELS.requirements.caption, locale)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.requirements.step, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.requirements.focus, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.requirements.question, locale)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {REQUIREMENT_ROWS.map((r) => (
                <TableRow key={r.step.en}>
                  <TableCell className="min-w-[11rem] align-top font-medium text-foreground">
                    {pick(r.step, locale)}
                  </TableCell>
                  <TableCell className="min-w-[14rem] align-top text-muted-foreground">{pick(r.focus, locale)}</TableCell>
                  <TableCell className="min-w-[20rem] align-top text-muted-foreground">
                    {pick(r.question, locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <SourceNote href={REQUIREMENTS.closeHref} source={pick(REQUIREMENTS.closeSource, locale)}>
          {pick(REQUIREMENTS.close, locale)}
        </SourceNote>
      </section>

      <section aria-labelledby="approach" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={APPROACH.n}
          id="approach"
          title={pick(APPROACH.title, locale)}
          dek={pick(APPROACH.dek, locale)}
        />

        <EvidencePipeline locale={locale} />
        <FigureNote>{pick(APPROACH.pipelineNote, locale)}</FigureNote>

        <SubHead>{pick(APPROACH.principleHead, locale)}</SubHead>
        <PullQuote>{pick(APPROACH.principle, locale)}</PullQuote>
        <p className="prose-measure body-lead leading-relaxed text-foreground">
          {pick(APPROACH.principleBody, locale)}
        </p>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-foreground">
          {pick(APPROACH.principleIntro, locale)}
        </p>
        <Trace steps={APPROACH.principleTrace.map((s) => ({ title: pick(s.title, locale), body: pick(s.body, locale) }))} />

        <p className="prose-measure mt-8 border-t border-dashed border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          {pick(APPROACH.close, locale)}
        </p>
      </section>
    </>
  );
}
