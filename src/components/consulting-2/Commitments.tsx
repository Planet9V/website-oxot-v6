/**
 * "Vendor neutral. Evidence owned by you." — the commitments, for
 * `/consulting`.
 *
 * AN UNORDERED SET. The four commitments are each true on their own and none
 * follows from another; the array order is the source's print order and
 * carries no meaning. So they render as a plain grid of cards with NO number,
 * NO connector, NO arrow and NO stage marker between them. A sequence,
 * funnel, timeline or maturity ladder here would assert a progression the
 * source explicitly does not have — and a grid is what makes that impossible
 * rather than merely unlikely.
 *
 * `label` and `body` stay visually distinct because the split is the source's
 * own: a short promise, then the sentence that qualifies it. Neither is
 * reworded to fit the card.
 *
 * The three lead paragraphs stay separate paragraphs. The last is a posture
 * statement ("Findings are argued from evidence, not authority") and must not
 * be absorbed into the one above it.
 *
 * NOT CLAIMED: nothing in this section is a certification, an audit result or
 * a security guarantee. The passive-first commitment is a statement of method,
 * so it gets the same card as the other three — no badge, no seal, no shield.
 */
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { COMMITMENTS } from "./content.commitments";

export function Commitments({ locale }: { locale: Locale }) {
  return (
    <section
      aria-labelledby={COMMITMENTS.sectionId}
      className="mt-20 border-t border-border pt-12"
    >
      <p className="oxot-kicker">{pick(COMMITMENTS.datumLabel, locale)}</p>
      <h2 id={COMMITMENTS.sectionId} className="h-section mt-3 text-foreground">
        {pick(COMMITMENTS.h2, locale)}
      </h2>

      <div className="prose-measure mt-5 space-y-4">
        {COMMITMENTS.paragraphs.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-muted-foreground">
            {pick(paragraph, locale)}
          </p>
        ))}
      </div>

      {/* Four cards, no order. Nothing numbers, connects or sequences them. */}
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {COMMITMENTS.items.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-border bg-card p-6 shadow-xs"
          >
            <h3 className="h-card text-foreground">{pick(item.label, locale)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pick(item.body, locale)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
