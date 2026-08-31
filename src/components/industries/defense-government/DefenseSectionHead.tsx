import type { ReactNode } from "react";
import { DefenseEdge } from "./DefenseEdge";
import { DefenseStamp } from "./DefenseStamp";

/**
 * The shared section opener for every major section on this page: the
 * angular edge mark, the classification-stamp kicker, the heading, and an
 * optional intro paragraph — in one place so eleven section files don't
 * each hand-roll the same four elements with a chance of one drifting out
 * of step with the others (same reasoning as EnergyLine.tsx being shared
 * rather than copy-pasted per section).
 *
 * The <section> element and its `aria-labelledby` live in the caller, not
 * here — this only renders the header block sitting inside it, at the id
 * the caller's `aria-labelledby` already points to.
 */
export function DefenseSectionHead({
  id,
  kicker,
  heading,
  intro
}: {
  id: string;
  kicker: string;
  heading: string;
  intro?: ReactNode;
}) {
  return (
    <div className="mt-20 pt-2">
      <DefenseEdge />
      <div className="mt-6">
        <DefenseStamp>{kicker}</DefenseStamp>
        <h2 id={id} className="mt-4 h-sub text-balance">
          {heading}
        </h2>
        {intro ? (
          <div className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{intro}</div>
        ) : null}
      </div>
    </div>
  );
}
