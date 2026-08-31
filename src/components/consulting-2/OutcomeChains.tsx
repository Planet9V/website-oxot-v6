import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { TWIN } from "./content.twin";

/**
 * The matched before/after comparison (spec L137–L159), drawn on ONE canvas.
 *
 * WHY THIS IS NOT TWO LISTS. The source prints two ```text blocks — traditional
 * consulting's four-node chain and OXOT's four-node chain — and the entire
 * rhetorical force is that they are isomorphic: same node count, same descent,
 * so a reader can lay one over the other and read ACROSS at each depth. Two
 * stacked lists destroy that, because nothing then holds depth 3 of one chain
 * beside depth 3 of the other. `content.twin.ts` models the pair as one array
 * of paired records for exactly this reason, and this component is what cashes
 * that in.
 *
 * HOW THE ALIGNMENT IS ACTUALLY GUARANTEED — it is structural, not eyeballed:
 *
 *   1. ONE grid template (`CHAIN_COLUMNS`) is used by the header row and by
 *      every node row. Both outer tracks are `minmax(0,1fr)`, so the two chains
 *      occupy mirror-image columns of identical width at every viewport.
 *   2. Each depth is ONE `<li>` that is itself a grid on that template, so the
 *      traditional cell, the depth marker and the OXOT cell are three items in
 *      a single grid row. CSS gives grid items in a row a shared height, so the
 *      two cells at a depth cannot drift out of register — there is no height
 *      to hand-tune, and a longer OXOT phrase grows its traditional counterpart
 *      with it rather than sliding the chains apart.
 *   3. The depth marker lives in the middle track and is shared by both cells.
 *      There is one spine down the middle of the figure, not one per chain, so
 *      "these are the same four depths" is drawn once.
 *
 * That is what makes the argument legible: both chains visibly run the same
 * length, and they diverge in CONTENT at the last node rather than in shape.
 *
 * TERMINAL EMPHASIS COMES FROM THE FLAG, NEVER FROM AN INDEX. `node.terminal`
 * decides which pair is emphasised — no `nodes.length - 1`, no `i === 3`. It
 * also decides where the spine stops, so the chain ends where the data says it
 * ends.
 *
 * NO STAGE NAMES ARE INVENTED. Neither chain names its own nodes in the source
 * and none is supplied here; the depth marker prints `node.index`, which
 * `content.twin.ts` defines as a real fact about the source blocks and
 * explicitly not a rating.
 *
 * PLAIN GEOMETRY. Hairlines, a circle and a rounded rectangle, all in DOM. No
 * `resolveSymbol`, no `DrawioGlyph` — this is an argument about outcomes, not a
 * drawing of equipment, and importing the glyph manifest would drag 462KB into
 * the bundle for four numerals.
 *
 * THE TRADITIONAL COLUMN IS DASHED AND MUTED, THE OXOT COLUMN SOLID. That is
 * emphasis, not a new claim: the source's own lead-ins ("Traditional consulting
 * commonly ends with:" against "OXOT's model is:") already make one side the
 * foil. The hedge "commonly" is transcribed intact and is not strengthened.
 *
 * SCREEN READERS GET THE PAIRING SPOKEN. Sighted readers get the two columns
 * under their headings; a screen reader walks the list linearly, so each cell
 * carries its own chain's label as `sr-only` text. Both are the source's own
 * lead-in sentences — no substitute wording is invented.
 *
 * Server-rendered; nothing here is interactive.
 */

/**
 * The one grid template the header row and every node row share. Identical on
 * both, which is what puts the two chains in the same two tracks. The middle
 * track is the depth gutter — fixed width, so neither chain's column is wider
 * than the other's at any viewport.
 */
const CHAIN_COLUMNS =
  "grid grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)]";

export function OutcomeChains({ locale }: { locale: Locale }) {
  const { traditionalLabel, oxotLabel, nodes } = TWIN.outcomeChain;
  const traditional = pick(traditionalLabel, locale);
  const oxot = pick(oxotLabel, locale);

  return (
    <div className="mt-10">
      {/* Column headings, on the same template as the rows below them. */}
      <div className={cn(CHAIN_COLUMNS, "items-end")}>
        <p className="text-sm font-semibold leading-snug text-muted-foreground">
          {traditional}
        </p>
        <span aria-hidden="true" />
        <p className="text-sm font-semibold leading-snug text-foreground">{oxot}</p>
      </div>

      <ol className="mt-5 list-none p-0">
        {nodes.map((node) => {
          const isTerminal = node.terminal === true;
          return (
            <li key={node.id} className={CHAIN_COLUMNS}>
              {/* Traditional chain, this depth. Dashed and quiet: the foil. */}
              <div
                className={cn(
                  "flex flex-col justify-center rounded-xl border border-dashed border-border p-4 sm:p-5",
                  isTerminal ? "bg-muted" : "mb-5 bg-card"
                )}
              >
                <span className="sr-only">{traditional} </span>
                <p className="text-sm leading-snug text-muted-foreground">
                  {pick(node.traditional, locale)}
                </p>
              </div>

              {/* The shared depth marker. One spine for both chains — drawn
                  once, because the depths are the same depths. It stops at the
                  terminal pair, which is where both chains end. */}
              <div className="relative flex justify-center">
                {isTerminal ? null : (
                  <span aria-hidden="true" className="absolute inset-y-0 w-px bg-border" />
                )}
                <span
                  className={cn(
                    "mono-label relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                    isTerminal
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-primary-ink"
                  )}
                >
                  {node.index}
                </span>
              </div>

              {/* OXOT chain, the same depth. Solid, and emphasised where the
                  comparison resolves. */}
              <div
                className={cn(
                  "flex flex-col justify-center rounded-xl border p-4 sm:p-5",
                  isTerminal
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "mb-5 border-border bg-card"
                )}
              >
                <span className="sr-only">{oxot} </span>
                <p
                  className={cn(
                    "text-sm leading-snug text-foreground",
                    isTerminal ? "font-semibold" : ""
                  )}
                >
                  {pick(node.oxot, locale)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
