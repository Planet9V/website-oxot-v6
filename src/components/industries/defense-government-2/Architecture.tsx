import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { same } from "../registry";
import { SectionB } from "./Rule";
import { ARCHITECTURE } from "./content.architecture";

/**
 * S03 · MISSION-TO-INFRASTRUCTURE ARCHITECTURE — header recipe H-B.
 *
 * H-B BECAUSE OF `viewsNote`, NOT BECAUSE THE SECTION IS IMPORTANT. That string
 * states that everything shown here is a synthetic, notional environment and
 * never actual national infrastructure, sensitive sites, force posture, or
 * classified dependencies. Visual Foundation Spec L531 requires exactly that of
 * defense material, and it is a condition on how the whole section must be read
 * — so it takes SectionB's claim-boundary strip, above the drawing, at reading
 * size, rather than a caption under it.
 *
 * THREE DATA SHAPES, THREE TREATMENTS, DELIBERATELY UNEQUAL. `content.
 * architecture.ts` warns that a renderer flattening `tiers`, `domains` and
 * `views` into one card grid loses the only thing `tiers` is saying. So:
 *   · `tiers`   — an ORDERED six-level dependency stack. It is the section's
 *                 subject and it gets the drawing.
 *   · `views`   — seven modelling perspectives over the same model. A legend.
 *   · `domains` — a flat nine-entry evidence index whose order carries no
 *                 dependency claim. A reference index, set smallest and last.
 * Reading order follows that ranking, and so does visual weight.
 *
 * ─── THE STACK ──────────────────────────────────────────────────────────────
 *
 * DRAWN AS ONE RUN THROUGH SIX BANDS, NOT AS SIX CARDS. The rail carries a
 * single continuous run down the left gutter with a filled square where each
 * tier taps it — `Rule.tsx`'s crossing mark, at tier scale. Six separate
 * bordered boxes joined by connector strokes is what sibling industry pages
 * already draw; repeating it here would make two sectors' architectures look
 * like one component with the words changed.
 *
 * THE RUN CHANGES STATE AT THE SIXTH TIER, AND THAT IS THE PAGE'S ARGUMENT
 * DRAWN RATHER THAN ASSERTED. Tiers one to five are inside what the
 * organization controls, so the run is solid through them. The sixth tier IS
 * "External dependencies" — utilities, telecoms, cloud providers, OEMs,
 * logistics, allied partners — so the run beside it is dashed, and a dashed
 * perimeter stands across the stack immediately above it. That is the same
 * two-state run `Rule.tsx` draws at the head of every section on this page,
 * here at section scale, and it is grounded in the content rather than in
 * decoration: the state changes at the one tier the source itself names as
 * external. Nothing else on the stack is dashed.
 *
 * WHY THE PERIMETER IS NOT LABELLED. Printing a word on it — "boundary",
 * "sovereign perimeter", anything — would be this file writing copy no source
 * carries, on the page where an invented security label is most costly.
 * `Rule.tsx` reaches the same conclusion for the same reason and prints no
 * words of its own at all. The perimeter is `aria-hidden`; the fact it draws is
 * already stated in words by tier six's own name and body.
 *
 * TOKEN DISCIPLINE, BINDING: `--border`, `--muted-foreground`, `--primary-ink`
 * and `--foreground` only. No `--signal-*` token appears in this file. A
 * security boundary "wants" to be red, and `--signal-red` means a critical
 * consequence or an unresolved consequential route — an architecture tier is
 * neither, and spending a semantic token on a divider would repurpose it as
 * decoration.
 *
 * THE RUN IS CSS, NOT SVG. Every segment's length is set by its tier's own text
 * height, which rewraps at every breakpoint and in both locales; six SVGs with
 * hard-coded heights would have to be re-measured each time. The dashed segment
 * uses a repeating gradient in an inline `style` object rather than an
 * arbitrary Tailwind class — the repo's own proven form for exactly this, and
 * the form `Rule.tsx`'s docblock records as the safe one, since a class
 * carrying nested parens and commas is one JIT-extraction quirk away from
 * generating nothing at all.
 *
 * ─── THE SEVEN VIEWS ────────────────────────────────────────────────────────
 *
 * THEY APPEAR HERE AND NOWHERE ELSE ON THE PAGE. `content.architecture.ts`
 * records that the CORPUS folded a separate "interactive sovereign-system
 * model" section into this export, notes that this build DOES have a model
 * section, and requires only that the seven appear ONCE. They stay here,
 * because `viewsNote` — the claim boundary that governs them — is also this
 * section's H-B strip, and separating a guard from the thing it guards is the
 * failure that strip exists to prevent. The hero's canvas consumes
 * `content.sovereignModel.ts`, a different export carrying different content.
 *
 * They are a LEGEND, not a control: seven dashed-outline chips, nothing
 * selectable, nothing behind a hover. Nothing on this page changes when a
 * reader looks at them, and a chip that looked clickable and did nothing would
 * be a fabricated affordance.
 *
 * ─── THE NINE DOMAINS ───────────────────────────────────────────────────────
 *
 * A `<dl>`, TWO COLUMNS, DENSE AND SMALL. Each entry is a domain name plus a
 * long comma-run of real examples, which is a term-and-definition shape, not a
 * card. `OXOT_Component_Inventory.md` records the same call being made for
 * dense enumerated technical vocabulary elsewhere on the site, and records why
 * the alternative loses: a chip cloud of bare terms carries no more meaning
 * than its labels. The last two entries are evidence CLASSES rather than
 * technology domains; the source lists them in the same array and they stay in
 * it, in place, rather than being split into a group no source has.
 *
 * SIBLING BALANCE. `data-balance-group="architecture-domains"` on the two index
 * COLUMN wrappers, with `data-balance-item` on each of the nine entries — inner
 * wrappers, never the grid cells. The stack itself carries NO balance group,
 * deliberately: each band is a short label rail beside a long element list,
 * which is a rail-plus-content layout rather than two sibling panes, and
 * measuring a two-word tier name against a fourteen-term list would produce a
 * ratio that describes nothing about the layout. The views legend carries none
 * either — seven chips in one wrapped row have no siblings to compare.
 *
 * MOBILE (OXOT_Mobile_Rules.md): the stack keeps its rail and stacks name above
 * elements within each band; the index collapses to one column; the legend
 * wraps. No horizontal scroll anywhere, `min-w-0` on every grid child.
 */

/* Section chrome, not copy: `content.architecture.ts` carries no datum label
   and no captions. These name what is already in the data — six tiers, seven
   perspectives, nine domains — rather than adding a claim about it, and the
   wording is the content module's own ("dependency stack", "modelling
   perspectives", "evidence index"). */
const DATUM_LABEL = same("Architecture");
const VIEWS_CAPTION = same("Seven modelling perspectives over the same model");
const DOMAINS_CAPTION = same("Nine domains — the evidence index the Twin is built from");

/** Dashed run, drawn vertically. See the docblock on why this is inline. */
const DASHED_RUN = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, hsl(var(--border)) 0 4px, transparent 4px 8px)"
} as const;

const DOMAIN_COLUMNS = [ARCHITECTURE.domains.slice(0, 5), ARCHITECTURE.domains.slice(5)] as const;

export function Architecture({ locale }: { locale: Locale }) {
  const lastIndex = ARCHITECTURE.tiers.length - 1;

  return (
    <SectionB
      id="architecture"
      index="03"
      datumLabel={DATUM_LABEL}
      heading={ARCHITECTURE.h2}
      lead={ARCHITECTURE.intro}
      guard={ARCHITECTURE.viewsNote}
      locale={locale}
    >
      <ol className="list-none p-0">
        {ARCHITECTURE.tiers.map((tier, index) => {
          const external = index === lastIndex;
          return (
            <li
              key={tier.id}
              className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-5 sm:grid-cols-[1.5rem_minmax(0,1fr)] sm:gap-x-7"
            >
              {/* The run, and the tap. The run is clipped at the first tier so
                  it starts at a tap rather than trailing out of the section. */}
              <div className="relative flex justify-center" aria-hidden="true">
                <span
                  style={external ? DASHED_RUN : undefined}
                  className={cn(
                    "absolute w-0.5",
                    !external && "bg-border",
                    index === 0 ? "bottom-0 top-3" : "inset-y-0"
                  )}
                />
                {/* mt-2 centres an 8px square on the first line of an 11px mono
                    tier ordinal. */}
                <span className="relative mt-2 block size-2 bg-primary-ink" />
              </div>

              <div className={cn("min-w-0", external ? "pb-2" : "pb-10")}>
                {/* The perimeter: a dashed rule standing across the stack at
                    the one place the source itself says the organization's
                    control ends. Unlabelled, by design — see the docblock. */}
                {external && <div aria-hidden="true" className="mb-8 border-t border-dashed border-border" />}
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
                  <div className="min-w-0 lg:col-span-4">
                    <p className="mono-label text-muted-foreground">{`T${index + 1}`}</p>
                    <h3 className="mt-1.5 font-display body-lead font-bold leading-snug text-foreground">
                      {pick(tier.name, locale)}
                    </h3>
                  </div>
                  <p className="mt-3 min-w-0 body-copy leading-relaxed text-muted-foreground lg:col-span-8 lg:mt-0">
                    {pick(tier.body, locale)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-14 border-t border-border pt-8">
        <p className="mono-label text-primary-ink">{pick(VIEWS_CAPTION, locale)}</p>
        <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
          {ARCHITECTURE.views.map((view) => (
            <li
              key={view.en}
              className="mono-label border border-dashed border-border px-3 py-2 text-foreground"
            >
              {pick(view, locale)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14 border-t border-border pt-8">
        <p className="mono-label text-primary-ink">{pick(DOMAINS_CAPTION, locale)}</p>
        <div className="mt-6 grid gap-x-14 lg:grid-cols-2">
          {DOMAIN_COLUMNS.map((column, columnIndex) => (
            <dl key={columnIndex} data-balance-group="architecture-domains" className="m-0 min-w-0">
              {column.map((domain) => (
                <div key={domain.id} data-balance-item className="border-t border-border py-5">
                  <dt className="mono-label text-foreground">{pick(domain.domain, locale)}</dt>
                  <dd className="ml-0 mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                    {pick(domain.examples, locale)}
                  </dd>
                </div>
              ))}
            </dl>
          ))}
        </div>
      </div>
    </SectionB>
  );
}
