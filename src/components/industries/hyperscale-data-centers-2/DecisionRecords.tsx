import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { DECISIONS, type HyperscaleDecision } from "./content.decisions";

/**
 * S08 · THE FOUR HYPERSCALE DECISIONS — source L309-L322, header recipe H-A.
 *
 * ALL FOUR DECISIONS ARE ON SCREEN AT ONCE. The approved treatment was
 * `OXOT_Visual_Foundation_Spec.md` §6's Four Decisions Switchboard — one throw
 * engaged against one shared readout, as `energy-utilities-2` and
 * `manufacturing-process-2` both ship it. The test it had to pass first is the
 * one `Engagement.tsx` records five sections below, applied to THIS table. It
 * passes that test and fails two others, so the control is dropped and the
 * spec's own panel chain is kept — rendered four times instead of once.
 *
 * THE COLUMN TEST DOES NOT DISQUALIFY A SWITCHBOARD HERE, and saying so plainly
 * matters because `rail-transportation-2/DecisionLedger.tsx` rejected one on
 * exactly that ground. Rail's table states every decision TWICE, in passenger
 * and in freight operating language, so a control showing one decision at a
 * time would hide half of that page's own dual-track thesis behind a click.
 * L315 here is three columns and ONE audience: `OXOT decision | Hyperscale
 * data-center language | What the Twin provides`. That is the energy brief's
 * shape, and energy legitimately runs a switchboard over it. Nothing about
 * hyperscale's table forbids the same.
 *
 * WHAT FORBIDS IT IS THIS PAGE, NOT THIS TABLE — three times over.
 *
 * First, saturation. Five sections already put their content behind a control:
 * S01's two-axis canvas (scenario x view), S03's layer radios drawn onto the
 * architecture itself, S04's eight-domain tab index, S07's twelve-scenario
 * radiogroup register, and S09's per-gate disclosure. A sixth selection
 * mechanism is the template sameness `OXOT_Composition_Rules.md` exists to
 * prevent, and `Engagement.tsx` (S13) already declined the Scope Rail on this
 * page for that reason. NOTE FOR WHOEVER READS S13 NEXT: its docblock counts
 * five controls above it, and that count stays correct — this section adds none.
 *
 * Second, adjacency, which is sharper here than it was at S13. A §6 switchboard
 * is a vertical list of selectable rows beside a detail pane. So is S07's
 * scenario register, IMMEDIATELY ABOVE THIS SECTION. Two consecutive
 * master/detail splits would read as one template applied twice, whatever the
 * two contain — and this section would be the weaker of the two copies, since
 * S07's pane carries a whole topology drawing and this one carries two
 * sentences.
 *
 * Third, load. S04 hides seventy-nine terms behind its tabs and S07
 * forty-eight cells behind its register. This section is EIGHT cells in total —
 * two per decision — running to roughly a hundred and sixty words all told.
 * Four decisions at forty words each are read in one pass; a control that
 * conceals three of them buys nothing and costs the reader three clicks to see
 * a table they could already have finished. It would also cost a client
 * boundary to install, so there is no `"use client"` here: no state, no
 * handler, no effect, and this renders on the server as markup.
 *
 * THE SPEC'S PANEL CHAIN IS KEPT IN FULL, and that is the point of the
 * deviation rather than a consolation for it. §6's panel runs the decision as
 * the buyer states it, then what the model returns, joined by a connector, with
 * amber on the ask and cyan on the return. Every decision here gets that exact
 * treatment. Only the switchboard's control is gone; its one readout is now
 * four readouts.
 *
 * SIGNAL TOKENS, per spec §6: amber is the proposed/asked side, cyan the
 * evidence/model side. `--signal-green` APPEARS NOWHERE IN THIS FILE and must
 * not be added — green is reserved for an actually-modelled closure, and
 * nothing here represents a closed or validated state. These are questions an
 * operator is still holding.
 *
 * THE COLOUR RIDES THE RULE, NEVER THE TEXT. Measured on this site's palette,
 * `--signal-amber` as body text reads 3.3:1 in light theme and `--signal-cyan`
 * 3.24:1, both under 1.4.3's 4.5:1 floor; the same colours as a border are
 * non-text (1.4.11) and pass. Each stop is still unmistakably its own colour.
 * Same treatment as `energy-utilities-2` and `water-wastewater-2`.
 *
 * NO CARD FRAMES, AND THE COUNT IS WHY. `OXOT_Visual_Rules.md` bars more than
 * three visually equal cards without a hierarchy break, and there are four
 * decisions. The available escape — promoting one and demoting the other three
 * — would assert a recommendation the source never makes: these four are the
 * questions a buyer arrives holding, and extra weight on any one of them reads
 * as OXOT ranking them. So the frames go, and the four records are drawn
 * identically, divided by the page's own hairline.
 *
 * NO ORDINALS. S10 prints 01-09 down a numbered spine, S11 prints 01-09 down an
 * index rail, and S13's docblock declines a third numbered run for that reason.
 * This would be the fourth. It would also be the wrong semantic: a number on
 * these four would rate what it only counts.
 *
 * NO STATUS BADGE ON ANY DECISION. `NOW / NEXT / NEVER` appears once, inside
 * decision one's `provides` sentence, where the source put it — as the triage
 * the model returns for a pathway. The source assigns no status to the
 * decisions themselves, so none is rendered. See `content.decisions.ts`.
 *
 * NO `data-narrow-ok` ANYWHERE. Every `<p>` and `<h3>` below sits inside a real
 * two-track grid at `lg`, which is exactly the structure `scripts/measure.mjs`
 * treats as legitimately narrow; below `lg` the same elements run full width.
 * Nothing here is capped by a reading-width class, so there is nothing to
 * exempt.
 */

/** The per-decision link label. Routing furniture, not sourced copy. */
const METHOD_LABEL = same("Read the decision method");

/**
 * One decision, read straight through: its name and its route on the left, the
 * operator's question and the model's return stacked on the right.
 *
 * THE NAME IS ASIDE, NOT ABOVE, and that is what separates this record from
 * `Engagement.tsx`'s ladder entry, which puts a full-width heading over two
 * side-by-side values. Here the heading holds a column of its own and the two
 * stops stack beneath one another in the wider column, so the connector between
 * them is vertical and the §6 chain reads top to bottom the way the spec draws
 * it. The link sits under the name because that is what it navigates to — the
 * method behind this decision — and because a lone four-word heading in a
 * four-track column would otherwise leave the column empty below it.
 */
function Record({ item, locale }: { item: HyperscaleDecision; locale: Locale }) {
  return (
    <li className="border-t border-border pt-10 first:border-t-0 first:pt-0 [&+li]:mt-10">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h3 className="h-card text-balance text-foreground">{pick(item.name, locale)}</h3>
          <p className="mt-4">
            <Link
              href={localePath(locale, item.href)}
              className="text-[0.875rem] font-medium text-primary-ink underline-offset-4 hover:underline"
            >
              {pick(METHOD_LABEL, locale)}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>

        <div className="lg:col-span-8">
          {/* Stop one: the decision as a hyperscale operator states it — the
              ask, so amber. */}
          <div className="border-l-2 border-signal-amber/70 pl-5">
            <p className="mono-label">{pick(DECISIONS.columns.language, locale)}</p>
            <p className="mt-2.5 body-lead leading-relaxed text-foreground">
              {pick(item.question, locale)}
            </p>
          </div>

          {/* The run between the two stops — the page's own line-work, one
              hairline dropping onto a node, not a decorative arrow glyph. */}
          <div aria-hidden="true" className="ml-[3px] flex h-8 flex-col items-center">
            <span className="w-px flex-1 bg-border" />
            <span className="h-[5px] w-[5px] rounded-full bg-signal-cyan" />
          </div>

          {/* Stop two: what the model returns — evidence/model side, so cyan. */}
          <div className="border-l-2 border-signal-cyan/70 pl-5">
            <p className="mono-label">{pick(DECISIONS.columns.provides, locale)}</p>
            <p className="mt-2.5 body-lead leading-relaxed text-foreground">
              {pick(item.provides, locale)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export function DecisionRecords({ locale, className }: { locale: Locale; className?: string }) {
  const { citation } = DECISIONS.close;

  /* The site's established gate for an English-only destination. Ungated, the
     nl build would link to `/nl/technical-specification`, which 404s. */
  const citationHref =
    citation.englishOnly && locale !== "en" ? citation.fallbackHref : citation.href;

  return (
    <SectionA
      id={DECISIONS.sectionId}
      index={DECISIONS.index}
      datumLabel={DECISIONS.datumLabel}
      heading={DECISIONS.h2}
      locale={locale}
      className={className}
    >
      {/* A `<ul>`, not an `<ol>`. An ordered list would announce "1 of 4" and
          put back in speech the ranking the visible design deliberately omits. */}
      <ul>
        {DECISIONS.items.map((item) => (
          <Record key={item.id} item={item} locale={locale} />
        ))}
      </ul>

      <p className="mt-12 border-t border-border pt-10 body-lead leading-relaxed text-muted-foreground">
        {pick(DECISIONS.close.text, locale)}{" "}
        <Link
          href={localePath(locale, citationHref)}
          className="text-primary-ink underline-offset-4 hover:underline"
        >
          {pick(citation.label, locale)}
        </Link>
      </p>
    </SectionA>
  );
}
