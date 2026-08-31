/**
 * The document front matter: masthead, §01 Scope, §02 Invariants.
 *
 * THE MASTHEAD IS A DOCUMENT-CONTROL BLOCK, NOT A HERO. No image, no metric
 * tile, no primary CTA above the fold — the single ask sits at the foot of
 * the document where a technical evaluator expects it, in §08. What sits
 * here instead is the block that tells a reader in ten seconds whether this
 * document is the one they want: what it is, what it covers, who it is
 * addressed to, and — stated plainly — what it is not. The `Status` and
 * `Basis` rows exist because "reference summary, not a contractual
 * specification" and "notional and synthetic" are claims worth making
 * before the reader starts quoting rows at their security authority.
 *
 * §02 is on the front page rather than buried mid-document for the same
 * reason: the five invariants are the answer to the question an evaluator
 * actually arrives with, and the mode matrix in §03 is only readable once
 * you know what does NOT vary between the columns.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { MASTHEAD, SCOPE, INVARIANTS } from "./content";
import { INVARIANT_ROWS } from "./content-register";
import { ClauseBody, ClauseHead, DocRow, Note, Panel, Register } from "./doc-kit";

export function DocMasthead({ locale }: { locale: Locale }) {
  return (
    <>
      <header className="pt-10 lg:pt-12">
        <p className="oxot-kicker">{pick(MASTHEAD.kicker, locale)}</p>
        <h1 className="h-page mt-4">{pick(MASTHEAD.h1, locale)}</h1>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(MASTHEAD.abstract, locale)}
        </p>

        <div className="mt-8 max-w-3xl">
          <Panel>
            <dl className="m-0">
              {MASTHEAD.control.map((row) => (
                <DocRow key={row.k.en} k={pick(row.k, locale)}>
                  {pick(row.v, locale)}
                </DocRow>
              ))}
            </dl>
          </Panel>
        </div>
      </header>

      <section aria-labelledby={SCOPE.id} className="mt-14 border-t border-border pt-12">
        <ClauseHead id={SCOPE.id} n={SCOPE.n} clause={pick(SCOPE.clause, locale)} title={pick(SCOPE.title, locale)} />
        <ClauseBody>
          <div className="max-w-3xl">
            <dl className="m-0">
              {SCOPE.rows.map((row) => (
                <DocRow key={row.k.en} k={pick(row.k, locale)}>
                  {pick(row.v, locale)}
                </DocRow>
              ))}
            </dl>
          </div>
        </ClauseBody>
      </section>

      <section aria-labelledby={INVARIANTS.id} className="mt-14 border-t border-border pt-12">
        <ClauseHead
          id={INVARIANTS.id}
          n={INVARIANTS.n}
          clause={pick(INVARIANTS.clause, locale)}
          title={pick(INVARIANTS.title, locale)}
        />
        <ClauseBody>
          <Note>{pick(INVARIANTS.note, locale)}</Note>
          <div className="mt-6">
            <Panel tone="muted">
              <Register
                rows={INVARIANT_ROWS.map((row) => ({
                  id: row.id,
                  term: pick(row.term, locale),
                  body: pick(row.body, locale)
                }))}
              />
            </Panel>
          </div>
        </ClauseBody>
      </section>
    </>
  );
}
