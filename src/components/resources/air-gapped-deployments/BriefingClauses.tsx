/**
 * Clauses §03 to §08: the mode matrix, the mandatory technical elements,
 * accepted inputs, intelligence refresh, stated limitations, and the onward
 * documents with the page's single ask.
 *
 * ALL SIX ARE REGISTERS, WHICH IS THE POINT. This document exists to be
 * checked against, so every clause resolves to something a reader can scan
 * a column of, cite by reference, or hand to their security authority
 * without re-typing it. That is the split from /deployment-sovereignty:
 * same three modes, same facts, but that page draws each boundary and
 * argues the case in prose, and this one tabulates it.
 *
 * Locale handling is not cosmetic here. The Dutch render drops the
 * /technical-specification entry via the `enOnly` flag on RELATED_LINKS,
 * because that page calls `notFound()` on any locale but "en" and a link to
 * a 404 is worse than an absent link.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { ELEMENTS, INPUTS, INTEL, LIMITS, MODES, RELATED } from "./content";
import {
  ELEMENT_ROWS,
  INPUT_ROWS,
  INTEL_ROWS,
  MODE_HEADS,
  MODE_MATRIX,
  OWNER_NAMES,
  PATHWAY_ROWS,
  RELATED_LINKS
} from "./content-register";
import { Ask, ClauseBody, ClauseHead, DataTable, Matrix, Note, Onward, Panel, Register } from "./doc-kit";

/** Column headings that label a table rather than state a fact. Kept beside
 *  the only component that renders them. Bilingual with `nl` a
 *  same-as-English placeholder, same convention as the content files. */
const HEADS = {
  attribute: { en: "Attribute", nl: "Attribute" },
  input: { en: "Input class", nl: "Input class" },
  covers: { en: "What it covers", nl: "What it covers" },
  form: { en: "Typical form", nl: "Typical form" },
  option: { en: "Option", nl: "Option" },
  mechanism: { en: "Transfer mechanism", nl: "Transfer mechanism" },
  cadence: { en: "Refresh cadence", nl: "Refresh cadence" },
  record: { en: "Approval record", nl: "Approval record" }
} as const;

export function BriefingClauses({ locale }: { locale: Locale }) {
  const related = RELATED_LINKS.filter((link) => !link.enOnly || locale === "en");

  return (
    <>
      {/* §03 — the mode register, read across rather than down. */}
      <section aria-labelledby={MODES.id} className="mt-14 border-t border-border pt-12">
        <ClauseHead id={MODES.id} n={MODES.n} clause={pick(MODES.clause, locale)} title={pick(MODES.title, locale)} />
        <ClauseBody>
          <Note>{pick(MODES.note, locale)}</Note>
          <div className="mt-7">
            <Matrix
              attributeLabel={pick(HEADS.attribute, locale)}
              caption={pick(MODES.caption, locale)}
              head={MODE_HEADS.map((h) => ({ ref: h.ref, name: pick(h.name, locale) }))}
              rows={MODE_MATRIX.map((row) => ({
                attribute: pick(row.attribute, locale),
                cells: row.cells.map((cell) => pick(cell, locale))
              }))}
            />
          </div>
          <p className="mt-7">
            <Onward href={localePath(locale, PATHS.deploymentSovereignty)}>{pick(MODES.figureLink, locale)}</Onward>
          </p>
        </ClauseBody>
      </section>

      {/* §04 — the elements register, with an owner on every line. */}
      <section aria-labelledby={ELEMENTS.id} className="mt-14 border-t border-border pt-12">
        <ClauseHead
          id={ELEMENTS.id}
          n={ELEMENTS.n}
          clause={pick(ELEMENTS.clause, locale)}
          title={pick(ELEMENTS.title, locale)}
        />
        <ClauseBody>
          <Note>{pick(ELEMENTS.note, locale)}</Note>
          <p className="mono-label mt-4">{pick(ELEMENTS.ownerLegend, locale)}</p>
          <div className="mt-6">
            <Panel>
              <Register
                rows={ELEMENT_ROWS.map((row) => ({
                  id: row.id,
                  owner: row.owner,
                  ownerTitle: pick(OWNER_NAMES[row.owner], locale),
                  term: pick(row.term, locale),
                  body: pick(row.body, locale)
                }))}
              />
            </Panel>
          </div>
        </ClauseBody>
      </section>

      {/* §05 — what the model is built from, with the form each export
          arrives in. The `form` column is what turns a content list into
          something an engineering lead can actually go and collect. */}
      <section aria-labelledby={INPUTS.id} className="mt-14 border-t border-border pt-12">
        <ClauseHead id={INPUTS.id} n={INPUTS.n} clause={pick(INPUTS.clause, locale)} title={pick(INPUTS.title, locale)} />
        <ClauseBody>
          <Note>{pick(INPUTS.note, locale)}</Note>
          <div className="mt-7">
            <DataTable
              head={[pick(HEADS.input, locale), pick(HEADS.covers, locale), pick(HEADS.form, locale)]}
              rows={INPUT_ROWS.map((row) => [pick(row.term, locale), pick(row.body, locale), pick(row.form, locale)])}
            />
          </div>
          <p className="mt-7 max-w-[68ch] body-copy leading-relaxed text-muted-foreground">
            {pick(INPUTS.gap, locale)}
          </p>
        </ClauseBody>
      </section>

      {/* §06 — the three refresh options. */}
      <section aria-labelledby={INTEL.id} className="mt-14 border-t border-border pt-12">
        <ClauseHead id={INTEL.id} n={INTEL.n} clause={pick(INTEL.clause, locale)} title={pick(INTEL.title, locale)} />
        <ClauseBody>
          <Note>{pick(INTEL.note, locale)}</Note>
          <div className="mt-7">
            <DataTable
              minWidth="48rem"
              head={[
                pick(HEADS.option, locale),
                pick(HEADS.mechanism, locale),
                pick(HEADS.cadence, locale),
                pick(HEADS.record, locale)
              ]}
              rows={INTEL_ROWS.map((row) => [
                pick(row.option, locale),
                pick(row.mechanism, locale),
                pick(row.cadence, locale),
                pick(row.record, locale)
              ])}
            />
          </div>
          <p className="mt-7 max-w-[68ch] body-copy leading-relaxed text-muted-foreground">
            {pick(INTEL.close, locale)}
          </p>
        </ClauseBody>
      </section>

      {/* §07 — the caution list, and the three claims this document
          declines to make. Both are short on purpose. */}
      <section aria-labelledby={LIMITS.id} className="mt-14 border-t border-border pt-12">
        <ClauseHead id={LIMITS.id} n={LIMITS.n} clause={pick(LIMITS.clause, locale)} title={pick(LIMITS.title, locale)} />
        <ClauseBody>
          <Note>{pick(LIMITS.note, locale)}</Note>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Panel tone="muted">
              <ul className="m-0 list-none space-y-3 p-0">
                {PATHWAY_ROWS.map((row) => (
                  <li key={row.en} className="grid grid-cols-[0.5rem_1fr] items-start gap-x-3.5">
                    <span aria-hidden="true" className="mt-[0.5625rem] block size-2 rounded-full border border-primary" />
                    <span className="body-copy leading-relaxed text-foreground">{pick(row, locale)}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <p className="mono-label text-muted-foreground">{pick(LIMITS.notHead, locale)}</p>
              <ul className="m-0 mt-4 list-none space-y-3.5 p-0">
                {LIMITS.notItems.map((item) => (
                  <li
                    key={item.en}
                    className="border-l-2 border-border pl-4 body-copy leading-relaxed text-muted-foreground"
                  >
                    {pick(item, locale)}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </ClauseBody>
      </section>

      {/* §08 — onward documents, then the one ask. A technical evaluator
          expects the contact line at the foot of the document, not on
          arrival, which is why nothing above this point asks for anything. */}
      <section aria-labelledby={RELATED.id} className="mt-14 border-t border-border pt-12">
        <ClauseHead
          id={RELATED.id}
          n={RELATED.n}
          clause={pick(RELATED.clause, locale)}
          title={pick(RELATED.title, locale)}
        />
        <ClauseBody>
          <ul className="m-0 list-none p-0">
            {related.map((link) => (
              <li
                key={link.path}
                className="grid gap-x-8 gap-y-2 border-b border-dashed border-border py-4 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[minmax(0,16rem)_1fr]"
              >
                <Onward href={localePath(locale, link.path)}>{pick(link.label, locale)}</Onward>
                <p className="max-w-[62ch] body-copy leading-relaxed text-muted-foreground">
                  {pick(link.body, locale)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Ask href={localePath(locale, PATHS.contact)} fine={pick(RELATED.ctaFine, locale)}>
              {pick(RELATED.cta, locale)}
            </Ask>
          </div>
        </ClauseBody>
      </section>
    </>
  );
}
