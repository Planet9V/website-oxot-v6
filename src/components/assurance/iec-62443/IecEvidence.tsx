import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OUTPUTS, PROVENANCE, ROLES, SCOPE, TREATMENT } from "./content";
import { LABELS, OUTPUT_ROWS, ROLE_ROWS, TREATMENT_ROWS } from "./content-tables";
import { SectionHead, SourceNote, SubHead, Trace, TraceList } from "./primitives";

/**
 * Sections 08–12: what you do with the model, what it produces, who reads
 * it, how a claim stays traceable, and — last, deliberately — what OXOT
 * does not do.
 *
 * THE SCOPE STATEMENT CLOSES THE DOCUMENT and is the plainest thing on the
 * page: no accent, no figure, no pull quote. A page arguing that evidence
 * should be traceable cannot end on a flourish about the limits of its own
 * claims. It is set on the muted ground so it reads as an aside from the
 * argument rather than a continuation of the sales case.
 */
export function IecEvidence({ locale }: { locale: Locale }) {
  /* The sibling assurance page, which the source document links to by name.
     Composed as a child of /assurance rather than read from nav.ts — route
     registration belongs to the integration owner, and this page does not
     edit nav.ts to add a constant for one link. */
  const provenanceHref = localePath(locale, `${PATHS.assurance}/evidence-data-provenance`);

  return (
    <>
      <section aria-labelledby="risk-treatment" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={TREATMENT.n}
          id="risk-treatment"
          title={pick(TREATMENT.title, locale)}
          dek={pick(TREATMENT.dek, locale)}
        />

        <SubHead>{pick(TREATMENT.flowHead, locale)}</SubHead>
        <Trace steps={TREATMENT.flow.map((s) => ({ title: pick(s.title, locale), body: pick(s.body, locale) }))} />

        <SubHead>{pick(TREATMENT.tableHead, locale)}</SubHead>
        <div className="mt-5">
          <Table>
            <TableCaption className="text-left">{pick(LABELS.treatment.caption, locale)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.treatment.decision, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.treatment.questions, locale)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TREATMENT_ROWS.map((r) => (
                <TableRow key={r.decision.en}>
                  <TableCell className="min-w-[13rem] align-top font-medium text-foreground">
                    {pick(r.decision, locale)}
                  </TableCell>
                  <TableCell className="min-w-[26rem] align-top text-muted-foreground">
                    {pick(r.questions, locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="prose-measure mt-8 border-t border-dashed border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          {pick(TREATMENT.close, locale)}
        </p>
      </section>

      <section aria-labelledby="evidence-outputs" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={OUTPUTS.n}
          id="evidence-outputs"
          title={pick(OUTPUTS.title, locale)}
          dek={pick(OUTPUTS.dek, locale)}
        />
        <div className="mt-7">
          <Table>
            <TableCaption className="text-left">{pick(LABELS.outputs.caption, locale)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.outputs.output, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.outputs.use, locale)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {OUTPUT_ROWS.map((r) => (
                <TableRow key={r.output.en}>
                  <TableCell className="min-w-[16rem] align-top font-medium text-foreground">
                    {pick(r.output, locale)}
                  </TableCell>
                  <TableCell className="min-w-[24rem] align-top text-muted-foreground">{pick(r.use, locale)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="prose-measure mt-8 border-t border-dashed border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          {pick(OUTPUTS.close, locale)}
        </p>
      </section>

      <section aria-labelledby="roles" className="mt-16 border-t border-border pt-12">
        <SectionHead n={ROLES.n} id="roles" title={pick(ROLES.title, locale)} />
        <div className="mt-7">
          <Table>
            <TableCaption className="text-left">{pick(LABELS.roles.caption, locale)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.roles.role, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.roles.needs, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.roles.provides, locale)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROLE_ROWS.map((r) => (
                <TableRow key={r.role.en}>
                  <TableCell className="min-w-[12rem] align-top font-medium text-foreground">
                    {pick(r.role, locale)}
                  </TableCell>
                  <TableCell className="min-w-[19rem] align-top text-muted-foreground">{pick(r.needs, locale)}</TableCell>
                  <TableCell className="min-w-[19rem] align-top text-muted-foreground">
                    {pick(r.provides, locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <SourceNote href={ROLES.citationHref} source={pick(ROLES.citationSource, locale)}>
          {pick(ROLES.dek, locale)}
        </SourceNote>
      </section>

      <section aria-labelledby="provenance" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={PROVENANCE.n}
          id="provenance"
          title={pick(PROVENANCE.title, locale)}
          dek={pick(PROVENANCE.dek, locale)}
        />

        <SubHead>{pick(PROVENANCE.traceHead, locale)}</SubHead>
        <Trace steps={PROVENANCE.trace.map((s) => ({ title: pick(s.title, locale), body: pick(s.body, locale) }))} />

        <SubHead>{pick(PROVENANCE.principlesHead, locale)}</SubHead>
        <TraceList items={PROVENANCE.principles.map((p) => pick(p, locale))} />

        <p className="prose-measure mt-8 text-sm leading-relaxed text-muted-foreground">{pick(PROVENANCE.close, locale)}</p>

        <p className="mt-6">
          <Link
            href={provenanceHref}
            className="mono-label inline-flex items-center gap-1.5 border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
          >
            {pick(PROVENANCE.linkCta, locale)}
            <span aria-hidden="true">&#8594;</span>
          </Link>
        </p>
      </section>

      <section aria-labelledby="scope" className="mt-16 border-t border-border pt-12">
        <SectionHead n={SCOPE.n} id="scope" title={pick(SCOPE.title, locale)} />
        <div className="mt-7 rounded-lg border border-border bg-muted px-6 py-6 sm:px-8 sm:py-7">
          <p className="prose-measure body-lead leading-relaxed text-foreground">{pick(SCOPE.dek, locale)}</p>
          <TraceList items={SCOPE.limits.map((l) => pick(l, locale))} />
          <p className="prose-measure mt-7 border-t border-border pt-5 body-lead leading-relaxed text-foreground">
            {pick(SCOPE.close, locale)}
          </p>
        </div>
      </section>
    </>
  );
}
