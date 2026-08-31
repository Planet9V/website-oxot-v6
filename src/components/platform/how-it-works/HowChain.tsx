import type { ReactNode } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CHAIN, CHAIN_FIGURE_ALT, CONSEQUENCE_LADDER, DRILL, EXPOSURE_OUTPUTS, INPUTS, LIKELIHOOD_AXES, REACH } from "./content";
import { ChainBody, ChainFigure, ChainHead, ChipGroups, SpecRail } from "./page-kit";
import { ReachabilityFigure } from "./reachability-figure";

/**
 * THE SIX LINKS — the body of the page, in order, one section each — now run
 * beside a sticky CDT architecture figure rather than filling the full canvas
 * width (owner instruction, 2026-08-31: "add the digital twin image to the
 * right side … redo 'The Chain' to fit better"). The chain is still read top
 * to bottom once, still has no card grid, and still runs one figure per link
 * in the left column — the sticky figure on the right is a constant
 * companion, not a per-link seventh figure, so it does not compete with the
 * rule below. It also reuses the exact image pair, alt text convention and
 * `lg:sticky lg:top-24` technique already established for this same asset on
 * `water-wastewater-3/Capabilities.tsx` (and three other industry pages).
 *
 * FOUR OF THE SIX SHARE ONE FIGURE SHAPE, deliberately. The input inventory,
 * the consequence ladder, the likelihood axes and the exposure outputs all
 * have the same underlying form — a short label and a sentence — so they are
 * drawn alike and a reader who has parsed one parses the rest for free. Link
 * 03 gets the page's only real drawing, because its claim is spatial and
 * prose cannot carry it. Link 06 gets the drill path, because a traversal
 * with two directions has to be shown having two directions.
 *
 * NOTHING SCROLL-DRIVEN. platform.md calls this a "scrollytelling chain", and
 * the part of that worth keeping is the ORDER, not the machinery. Pinned
 * sections and progress-driven animation would fight the reduced-motion guard
 * and the sticky header, and would leave the argument unreadable to anyone
 * scrolling fast. The order does the work; the reader supplies the scroll.
 * `lg:` AND UP ONLY on the sticky column, same reasoning as the Capabilities
 * precedent: below `lg` the two columns stack and a sticky figure would pin
 * itself to the viewport past content it no longer illustrates.
 */

function ChainSection({ id, children }: { id: string; children: ReactNode }) {
  /* Anchor offset is already handled globally by `main [id]` in globals.css,
     so the chain map's links clear the sticky header without help here. */
  return (
    <section aria-labelledby={id} className="mt-20 border-t border-border pt-12">
      {children}
    </section>
  );
}

/**
 * The drill path: five levels with the traversal marked in both directions,
 * because "drills down" is only half the claim — rolling a component-level
 * change back up into a group figure is the half that survives an audit.
 */
function DrillPath({ locale }: { locale: Locale }) {
  return (
    <ol className="mt-5 flex list-none flex-wrap items-center gap-x-2 gap-y-2 p-0">
      {DRILL.levels.map((level, i) => (
        <li key={i} className="flex items-center gap-2">
          {i > 0 ? (
            <span aria-hidden="true" className="font-mono text-sm leading-none text-primary">
              &#8646;
            </span>
          ) : null}
          <span className="mono-label rounded border border-border bg-card px-2.5 py-1.5 text-foreground">
            {pick(level, locale)}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function HowChain({ locale }: { locale: Locale }) {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
      <div className="lg:col-span-7">
        {CHAIN.map((link) => (
          <ChainSection key={link.id} id={link.id}>
            <ChainHead n={link.n} id={link.id} title={pick(link.title, locale)} dek={pick(link.dek, locale)} />
            <ChainBody paragraphs={link.body.map((p) => pick(p, locale))} />

            {link.id === "evidence" ? (
              <ChainFigure heading={pick(INPUTS.heading, locale)} note={pick(INPUTS.note, locale)}>
                <ChipGroups
                  groups={INPUTS.groups.map((g) => ({
                    label: pick(g.label, locale),
                    items: g.items.map((item) => pick(item, locale))
                  }))}
                />
              </ChainFigure>
            ) : null}

            {link.id === "consequence" ? (
              <ChainFigure heading={pick(CONSEQUENCE_LADDER.heading, locale)}>
                <SpecRail rows={CONSEQUENCE_LADDER.rungs.map((r) => ({ k: pick(r.k, locale), v: pick(r.v, locale) }))} />
              </ChainFigure>
            ) : null}

            {link.id === "pathway" ? (
              <ChainFigure
                heading={pick(REACH.heading, locale)}
                /* Said beside the drawing rather than trusted to the reader:
                   this is an illustrative topology, not their environment. */
                note={pick(REACH.note, locale)}
              >
                <ReachabilityFigure locale={locale} />
              </ChainFigure>
            ) : null}

            {link.id === "likelihood" ? (
              <ChainFigure heading={pick(LIKELIHOOD_AXES.heading, locale)}>
                <SpecRail rows={LIKELIHOOD_AXES.rows.map((r) => ({ k: pick(r.k, locale), v: pick(r.v, locale) }))} />
              </ChainFigure>
            ) : null}

            {link.id === "exposure" ? (
              <ChainFigure heading={pick(EXPOSURE_OUTPUTS.heading, locale)}>
                <SpecRail rows={EXPOSURE_OUTPUTS.rows.map((r) => ({ k: pick(r.k, locale), v: pick(r.v, locale) }))} />
              </ChainFigure>
            ) : null}

            {link.id === "decision" ? (
              <ChainFigure heading={pick(DRILL.heading, locale)} note={pick(DRILL.note, locale)}>
                <DrillPath locale={locale} />
              </ChainFigure>
            ) : null}
          </ChainSection>
        ))}
      </div>

      {/* THE FIGURE, same `lg:sticky lg:top-24 lg:col-span-5` technique as
          `water-wastewater-3/Capabilities.tsx` (top-24 clears the 64px sticky
          header with room to spare). `bg-white dark:bg-black` on the card
          itself, not the whole two-column area — this page's six chain
          sections keep the page's own `--background` token, and only the
          image needs a literal white/black ground to match the PNG's own
          baked-in flat background (see that file's docblock for why a
          `--card`-toned ground would leave a seam). */}
      <div className="mt-20 lg:sticky lg:top-24 lg:col-span-5 lg:mt-20">
        <div className="rounded-2xl bg-white p-3 dark:bg-black">
          <Image
            src="/images/cdt-architecture-dark.png"
            alt={pick(CHAIN_FIGURE_ALT, locale)}
            width={1400}
            height={1400}
            className="hidden w-full rounded-xl dark:block"
            sizes="(min-width: 1024px) 38vw, 90vw"
          />
          <Image
            src="/images/cdt-architecture-light.png"
            alt={pick(CHAIN_FIGURE_ALT, locale)}
            width={1400}
            height={1400}
            className="w-full rounded-xl dark:hidden"
            sizes="(min-width: 1024px) 38vw, 90vw"
          />
        </div>
      </div>
    </div>
  );
}
