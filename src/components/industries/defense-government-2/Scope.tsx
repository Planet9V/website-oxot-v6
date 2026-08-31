import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "../registry";
import { SectionB } from "./Rule";
import { SCOPE } from "./content.scope";

/**
 * S02 · WHAT OXOT MODELS — header recipe H-B, and the first of the page's five
 * claim-boundary sections.
 *
 * `SCOPE.boundary` IS THE REASON THIS SECTION TAKES H-B, and it is the single
 * most consequential string on the page. It states that OXOT does NOT model
 * weapons systems, classified battle-management systems, or intelligence
 * operations. `content.scope.ts` marks it load-bearing, carries that marking
 * forward from the CORPUS, and instructs a renderer to give it visible standing
 * — "its own line above or beside the environment list, at body size. It is not
 * a footnote, not a tooltip, not `sr-only`, and not something to fold into an
 * accordion to shorten the page."
 *
 * H-B IS EXACTLY THAT INSTRUCTION, ALREADY BUILT. `Rule.tsx`'s SectionB renders
 * the string it is handed at `text-[1.0625rem]` — the same size as a section
 * lead, larger than the body copy below it — in `text-foreground` rather than
 * muted, on its own line, ABOVE the body it conditions, marked with a dashed
 * left rule that is the page's own perimeter turned vertical. Nothing here
 * shrinks it, boxes it as an alert, or moves it below the eight environments.
 * It is passed as the real string from the content module, never a paraphrase
 * written at this call site — the one thing SectionB's prop docblock forbids.
 *
 * WHY IT IS NOT STYLED AS A WARNING. A red-bordered callout would misread a
 * statement of scope as a hazard, and would also make the disclaimer the
 * section's focal element rather than the eight environments the reader came
 * for. `--border` only, dashed, at reading size — the site-wide treatment for a
 * claim boundary, applied at full strength.
 *
 * THE EIGHT ENVIRONMENTS ARE A SCHEDULE OF PLACES, NOT A BENTO AND NOT A CARD
 * GRID. Pattern 3 (Asset-Class Bento) is not available here — its cells ARE
 * real `SystemAsset` records with a criticality tier, and these eight are
 * estate types with neither. Keeping a pattern's shape while substituting a
 * different taxonomy is the failure `OXOT_Component_Inventory.md` names by
 * name. Eight bordered cards would also be the "flat catalogue of equal cards"
 * the Foundation Spec's brand posture rules out in its opening paragraph.
 *
 * SO: TWO COLUMNS OF FOUR, HAIRLINE-RULED, EACH ENTRY LED BY A FILLED SQUARE.
 * The square is `Rule.tsx`'s crossing mark at entry scale — the one place the
 * run is permitted through the perimeter — reused here because each of these
 * eight IS a place inside the boundary the section has just drawn. It is the
 * only element in this file carrying `--primary-ink`, and it is 8px of it. No
 * `--signal-*` token appears anywhere in this file: the six signals mean model
 * and decision state, and an estate type is neither.
 *
 * WHY TWO COLUMNS AND NOT ONE. Eight entries of a name plus a full sentence run
 * to roughly two screens as a single stack, which turns a scoping list into the
 * page's longest scroll and pushes the air-gap and capability material far from
 * the boundary statement that governs them. Two columns is also what keeps
 * every entry's prose inside a real multi-column context rather than a lone
 * narrow measure with dead space beside it.
 *
 * SIBLING BALANCE: `data-balance-group="scope-environments"` on the two COLUMN
 * wrappers — the inner content wrappers, not the grid cells, which stretch to
 * the row and would let an empty box pass. Each of the eight entries carries
 * `data-balance-item`, so the count measure reads four against four rather than
 * a single mark per column. The split is the content module's own order — the
 * first four entries in column one, the last four in column two — not a
 * length-balanced reshuffle: the source lists defense estate before government
 * and dual-use estate, and re-sorting to even the columns would lose that.
 *
 * MOBILE (OXOT_Mobile_Rules.md): one column, source order preserved, `min-w-0`
 * throughout. Nothing is behind a disclosure — the Foundation Spec bars hiding
 * technical content in an accordion purely to shorten a page, and eight
 * environments is exactly the content that invites it.
 */

/* Section chrome, not copy: `content.scope.ts` carries no datum labels. */
const DATUM_LABEL = same("Scope");

/** The content module's own order, split in half. See the docblock. */
const COLUMNS = [SCOPE.environments.slice(0, 4), SCOPE.environments.slice(4)] as const;

export function Scope({ locale }: { locale: Locale }) {
  return (
    <SectionB
      id="scope"
      index="02"
      datumLabel={DATUM_LABEL}
      heading={SCOPE.h2}
      guard={SCOPE.boundary}
      locale={locale}
    >
      <div className="grid gap-x-14 lg:grid-cols-2">
        {COLUMNS.map((column, columnIndex) => (
          <div key={columnIndex} data-balance-group="scope-environments" className="min-w-0">
            {column.map((environment) => (
              <div
                key={environment.id}
                data-balance-item
                className="flex items-start gap-4 border-t border-border py-6"
              >
                {/* `Rule.tsx`'s crossing mark at entry scale. Square, filled,
                    `--primary-ink` — the same mark, the same token, the same
                    meaning: a place inside the boundary. `mt-[0.4375rem]`
                    centres an 8px square on the first line of an 18px name. */}
                <span
                  aria-hidden="true"
                  className="mt-[0.4375rem] block size-2 shrink-0 bg-primary-ink"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.125rem] font-bold leading-snug text-foreground">
                    {pick(environment.name, locale)}
                  </h3>
                  <p className="mt-2 body-copy leading-relaxed text-muted-foreground">
                    {pick(environment.body, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionB>
  );
}
