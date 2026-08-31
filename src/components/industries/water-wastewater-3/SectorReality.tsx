import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { StaticTable } from "@/components/ui/static-table";
import { SECTOR_REALITY } from "./content";
import {
  CHALLENGE_CAPTION,
  CHALLENGE_HEAD,
  CHALLENGE_ROWS,
  CISA_FINDING,
  CISA_PLC_ADVISORY_URL,
  REALITY_BODY
} from "./content.reality";

/**
 * S01 · SECTOR REALITY — the page's problem statement.
 *
 * NOT A NAMED PATTERN, deliberately. `OXOT_Composition_Rules.md`'s first
 * Industries requirement is "start with the industry-specific operational
 * problem", and none of the eight patterns in `OXOT_Layout_Styles.md` is a
 * problem statement: Patterns 1, 2, 3, 4 and 7 all render OXOT's own model, and
 * borrowing one here would dress the reader's operating conditions in product
 * chrome — which is exactly how a sector page stops sounding like it has been
 * inside a plant. Editorial prose plus a real table is the right shape.
 *
 * `static-table.tsx`, NOT `data-table.tsx`. Both columns are prose in every one
 * of the ten rows and the table reads top to bottom; there is no criticality,
 * no layer and no clause number anyone would sort by, so a TanStack sort/filter
 * bar would offer an interaction that answers no question. `StaticTable` also
 * emits `<th scope="row">` on the first cell unconditionally — verified at
 * `src/components/ui/static-table.tsx:66`, not assumed — which is what makes a
 * screen reader announce "Small OT teams — many utilities have limited in-house
 * cyber capacity" instead of a disembodied sentence.
 *
 * HEADING TREATMENT: SAME AS THE REST OF THE PAGE. Stated rather than defaulted
 * to, because this section had a real case for varying and it does not survive
 * inspection. The tempting reason — "this is the only section whose central
 * claim rests on an external citation" — is FALSE on this page: S00 cites ENISA
 * NIS360 and S09 cites eight frameworks. Varying a heading on a reason that
 * fails its own test is variation for variety's sake, which the rule bars, so
 * the heading keeps the page's index-datum-plus-h2 treatment.
 *
 * WHAT DOES DIFFER, AND WHY, is BELOW the heading. The CISA advisory carries the
 * same visual weight as the body prose instead of running in as a trailing
 * footnote, on a distinction that does survive the test: S09 cites external
 * bodies as OBLIGATIONS the Twin produces evidence for, and S00 cites ENISA as
 * context for a positioning claim, but this section's principal assertion —
 * that a cyber incident reaches water quality, the environment and the
 * community at once — is a claim about the world that OXOT's model cannot
 * itself support. Somebody else has to have observed it. At footnote weight,
 * the section's own headline would be resting on OXOT's say-so.
 *
 * ORDER: prose, then evidence, then the matrix. The two paragraphs establish
 * what a water utility actually operates; the advisory says what is happening to
 * it; the ten rows say why each condition is different here than in a factory.
 * Reversing any pair puts a claim ahead of the fact it depends on.
 */
export function SectorReality({ locale }: { locale: Locale }) {
  return (
    <section className="oxot-canvas pt-16 sm:pt-24" id="sector-reality">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        01 · {pick(SECTOR_REALITY.datum, locale)}
      </p>
      <h2 className="mt-4 text-balance">{pick(SECTOR_REALITY.h2, locale)}</h2>

      <div className="mt-8 space-y-5">
        {REALITY_BODY.map((paragraph, i) => (
          <p
            key={i}
            className="body-lead leading-relaxed text-muted-foreground"
          >
            {pick(paragraph, locale)}
          </p>
        ))}
      </div>

      {/* The section's one external claim, at body weight — see the docblock. */}
      <figure className="prose-measure m-0 mt-8 border-l-2 border-primary pl-4">
        <blockquote className="m-0 body-lead leading-relaxed text-foreground">
          {pick(CISA_FINDING.finding, locale)}
        </blockquote>
        <figcaption className="mono-label mt-3 text-primary-ink">
          <a
            href={CISA_PLC_ADVISORY_URL}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline focus-visible:underline"
          >
            {pick(CISA_FINDING.sourceLabel, locale)}
          </a>
        </figcaption>
      </figure>

      {/* Bordered panel, matching DecisionSwitchboard's and TechnologyIndex's
          — added 2026-08-25 (owner request, same instruction, same
          `border-signal-amber/60`, applied to a second table on the same
          page). `StaticTable`'s own `className` prop already merges onto its
          outer wrapper div (`static-table.tsx`), so this needs no change to
          the shared component. */}
      <div className="mt-12">
        <StaticTable
          head={CHALLENGE_HEAD.map((h) => pick(h, locale))}
          rows={CHALLENGE_ROWS.map((r) => r.map((cell) => pick(cell, locale)))}
          caption={pick(CHALLENGE_CAPTION, locale)}
          minWidth="38rem"
          className="rounded-2xl border border-signal-amber/60 bg-card p-5 sm:p-7"
        />
      </div>
    </section>
  );
}
