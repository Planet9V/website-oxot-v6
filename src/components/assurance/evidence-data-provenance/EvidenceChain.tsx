/**
 * THE DRILL-DOWN EVIDENCE CHAIN — this page's signature visual, and the
 * one the content-to-visual mapping table names for this exact content
 * type: "Evidence provenance → Drill-down evidence chain", avoid
 * "'Trusted' badge". There is deliberately no badge, checkmark or seal
 * anywhere on this page; a chain that shows the links IS the argument.
 *
 * Six of the source file's blocks are the same shape — an ordered chain of
 * rungs with a direction — so they share one component rather than six
 * hand-drawn variants: the hero chain, the seven-stage evidence model, the
 * reverse navigation, the evidence-gap ladder, the drillable-calculation
 * trace, and the change pipeline.
 *
 * The connector is real inline SVG (line plus arrowhead), not a text arrow
 * or a border trick, so the direction survives at any zoom and reads as a
 * drawn diagram. Every stroke is `currentColor` inheriting a token class —
 * no hardcoded color anywhere in this file.
 *
 * NOTHING HERE IS INTERACTIVE and nothing claims to be. It is a server
 * component with no state, no client boundary, and no copy implying a
 * live drill-down: the chain renders the structure the source describes,
 * and the two worked traces in DrillableCalculations.tsx use native
 * <details> for genuine, JS-free expansion.
 */
import { cn } from "@/lib/utils";

export interface ChainRung {
  title: string;
  /** A full sentence belonging to this rung, where the rung is a step in a
   *  worked trace rather than a stage name. */
  body?: string;
  /** Vocabulary belonging to this rung, rendered as inline terms. */
  terms?: readonly string[];
  /**
   * Renders the rung as a visibly empty slot rather than a filled one —
   * "null over zero" made literal. Used for the bottom of the evidence-gap
   * ladder, where the honest rendering of missing evidence is a gap, not a
   * populated box.
   */
  empty?: boolean;
}

/** The connector between two rungs. Points the way the chain is read. */
function ChainArrow({ direction }: { direction: "down" | "up" }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 12 30"
      width="12"
      height="30"
      className="ml-5 block shrink-0 text-primary sm:ml-7"
    >
      {direction === "down" ? (
        <>
          <line x1="6" y1="0" x2="6" y2="22" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="6,29 1.75,20.5 10.25,20.5" fill="currentColor" />
        </>
      ) : (
        <>
          <line x1="6" y1="8" x2="6" y2="30" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="6,1 1.75,9.5 10.25,9.5" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export function EvidenceChain({
  rungs,
  direction = "down",
  numbered = false,
  label,
  className
}: {
  rungs: readonly ChainRung[];
  /** Which way the reader travels: source to decision, or output back to source. */
  direction?: "down" | "up";
  numbered?: boolean;
  /** Caption above the chain, set as a mono data label. */
  label?: string;
  className?: string;
}) {
  return (
    <figure className={cn("m-0", className)}>
      {label ? <figcaption className="mono-label mb-4">{label}</figcaption> : null}
      <ol className="m-0 flex list-none flex-col p-0">
        {rungs.map((rung, i) => (
          <li key={rung.title} className="flex flex-col">
            {i > 0 ? <ChainArrow direction={direction} /> : null}
            <div
              className={cn(
                "rounded-xl px-4 py-3 sm:px-5 sm:py-4",
                rung.empty
                  ? "border border-dashed border-border bg-transparent"
                  : "border border-border bg-card"
              )}
            >
              <div className="flex items-baseline gap-3">
                {numbered ? (
                  <span className="mono-label shrink-0 tabular-nums text-primary-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "font-display body-lead font-bold leading-snug",
                    rung.empty ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {rung.title}
                </span>
                {rung.empty ? (
                  <span className="mono-label ml-auto shrink-0 rounded border border-dashed border-border px-1.5 py-0.5">
                    null
                  </span>
                ) : null}
              </div>
              {rung.body ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{rung.body}</p>
              ) : null}
              {rung.terms && rung.terms.length > 0 ? (
                <ul className="mt-3 flex list-none flex-wrap gap-x-2 gap-y-1.5 p-0">
                  {rung.terms.map((term) => (
                    <li
                      key={term}
                      className="mono-label rounded border border-border bg-muted px-2 py-1 normal-case tracking-normal"
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
