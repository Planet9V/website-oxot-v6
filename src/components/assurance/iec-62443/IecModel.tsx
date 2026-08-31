import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RISK, SLT, SYSTEM, ZONES } from "./content";
import { LABELS, RISK_EVIDENCE_ROWS, SLT_OBJECTIVE_ROWS, ZONE_MODEL_ROWS } from "./content-tables";
import { FrVector } from "./figures";
import { ZoneStack } from "./zone-stack";
import { FigureNote, PullQuote, SectionHead, SourceNote, SpecList, SubHead, Trace, TraceList } from "./primitives";

/**
 * Sections 04–07: the model itself, in the standard's own order — boundary,
 * partition, risk, target security level. This is the technical middle of
 * the document and it carries both diagrams.
 */
export function IecModel({ locale }: { locale: Locale }) {
  return (
    <>
      <section aria-labelledby="system-under-consideration" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={SYSTEM.n}
          id="system-under-consideration"
          title={pick(SYSTEM.title, locale)}
          dek={pick(SYSTEM.dek, locale)}
        />
        <SubHead>{pick(SYSTEM.examplesHead, locale)}</SubHead>
        <TraceList items={SYSTEM.examples.map((e) => pick(e, locale))} />
        <SubHead>{pick(SYSTEM.outputsHead, locale)}</SubHead>
        <SpecList rows={SYSTEM.outputs.map((o) => ({ k: pick(o.k, locale), v: pick(o.v, locale) }))} />
      </section>

      <section aria-labelledby="zones-conduits" className="mt-16 border-t border-border pt-12">
        <SectionHead n={ZONES.n} id="zones-conduits" title={pick(ZONES.title, locale)} dek={pick(ZONES.dek, locale)} />
        <SourceNote href={ZONES.citationHref} source={pick(ZONES.citationSource, locale)}>
          {pick(ZONES.intro, locale)}
        </SourceNote>

        <SubHead>{pick(ZONES.diagramHead, locale)}</SubHead>
        <ZoneStack locale={locale} />
        <FigureNote>{pick(ZONES.diagramNote, locale)}</FigureNote>

        <SubHead>{pick(ZONES.modelsHead, locale)}</SubHead>
        <div className="mt-5">
          <Table>
            <TableCaption className="text-left">{pick(LABELS.zoneModels.caption, locale)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.zoneModels.concept, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.zoneModels.capability, locale)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ZONE_MODEL_ROWS.map((r) => (
                <TableRow key={r.concept.en}>
                  <TableCell className="min-w-[10rem] align-top font-medium text-foreground">
                    {pick(r.concept, locale)}
                  </TableCell>
                  <TableCell className="min-w-[24rem] align-top text-muted-foreground">
                    {pick(r.capability, locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <PullQuote>{pick(ZONES.pullQuote, locale)}</PullQuote>
        <p className="prose-measure text-sm leading-relaxed text-muted-foreground">{pick(ZONES.close, locale)}</p>
      </section>

      <section aria-labelledby="risk-assessment" className="mt-16 border-t border-border pt-12">
        <SectionHead n={RISK.n} id="risk-assessment" title={pick(RISK.title, locale)} dek={pick(RISK.dek, locale)} />
        <SourceNote href={RISK.citationHref} source={pick(RISK.citationSource, locale)}>
          {pick(RISK.intro, locale)}
        </SourceNote>

        <SubHead>{pick(RISK.evidenceHead, locale)}</SubHead>
        <div className="mt-5">
          <Table>
            <TableCaption className="text-left">{pick(LABELS.riskEvidence.caption, locale)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.riskEvidence.source, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">
                  {pick(LABELS.riskEvidence.contribution, locale)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RISK_EVIDENCE_ROWS.map((r) => (
                <TableRow key={r.source.en}>
                  <TableCell className="min-w-[13rem] align-top font-medium text-foreground">
                    {pick(r.source, locale)}
                  </TableCell>
                  <TableCell className="min-w-[24rem] align-top text-muted-foreground">
                    {pick(r.contribution, locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <SubHead>{pick(RISK.chainHead, locale)}</SubHead>
        <Trace steps={RISK.chain.map((s) => ({ title: pick(s.title, locale), body: pick(s.body, locale) }))} />

        <p className="prose-measure mt-8 border-t border-dashed border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          {pick(RISK.close, locale)}
        </p>
      </section>

      <section aria-labelledby="target-security-levels" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={SLT.n}
          id="target-security-levels"
          title={pick(SLT.title, locale)}
          dek={pick(SLT.dek, locale)}
        />
        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">
          {pick(SLT.vectorIntro, locale)}
        </p>

        <FrVector locale={locale} />
        <SourceNote href={SLT.citationHref} source={pick(SLT.citationSource, locale)}>
          {pick(SLT.vectorNote, locale)}
        </SourceNote>

        <SubHead>{pick(SLT.supportHead, locale)}</SubHead>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-foreground">
          {pick(SLT.supportIntro, locale)}
        </p>
        <TraceList items={SLT.visible.map((v) => pick(v, locale))} />

        <div className="mt-8">
          <Table>
            <TableCaption className="text-left">{pick(LABELS.sltObjectives.caption, locale)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="mono-label text-primary-ink">
                  {pick(LABELS.sltObjectives.objective, locale)}
                </TableHead>
                <TableHead className="mono-label text-primary-ink">
                  {pick(LABELS.sltObjectives.evidence, locale)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SLT_OBJECTIVE_ROWS.map((r) => (
                <TableRow key={r.abbr}>
                  {/* The abbreviation repeats the vector element above, so a
                      reader can carry a position from the drawing into the
                      table without re-reading the full name. */}
                  <TableCell className="min-w-[15rem] align-top">
                    <span className="mono-label mr-2 font-bold text-primary-ink">{r.abbr}</span>
                    <span className="font-medium text-foreground">{pick(r.objective, locale)}</span>
                  </TableCell>
                  <TableCell className="min-w-[24rem] align-top text-muted-foreground">
                    {pick(r.evidence, locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
