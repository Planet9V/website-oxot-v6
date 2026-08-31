"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { MODEL } from "./content";
import {
  LAYERS,
  ScenarioModelCanvas,
  ScenarioModelLegend,
  namedMembers,
  focusedBands
} from "./ScenarioModelCanvas";

/**
 * S01 · INTERACTIVE HYPERSCALE MODEL — source `industry_hyperscale.md` L44–L102,
 * and the page's load-bearing interactive: `HERO.ctaSecondary` anchors straight
 * at `MODEL.id`, so this section's root MUST render that id.
 *
 * L46's BUILD INSTRUCTION IS HONOURED STRUCTURALLY, NOT QUOTED. `MODEL.buildNote`
 * carries "Do not make it a rotating 3D building. Make it a navigable dependency
 * model that uses the same logical structure as your live Cyber Digital Twin" —
 * direction addressed to whoever builds this, never copy addressed to a visitor,
 * and it is not printed anywhere below. What discharges it is the drawing itself:
 * a dependency stack whose bands are read by two live controls, with no rotation,
 * no perspective and no building.
 *
 * TWO CONTROLS, ONE DRAWING — the shape of this section, and the resolution of
 * the largest gap in the source. The brief asks for nine scenarios (L65–L73) and
 * five synchronized views (L79–L83) over one example stack (L88–L100), and
 * supplies no per-scenario drawing and no per-view drawing. There are no 45
 * bespoke cells to transcribe, so none are written. Instead the scenario and the
 * view are INDEPENDENT lenses on the single canvas: the scenario marks the
 * members its own words name and draws the dependency run down to the
 * consequence band; the view fills the ground of the bands its own words name.
 * `ScenarioModelCanvas.tsx` records the derivation of both, member by member and
 * band by band, against the source lines they came from.
 *
 * DEFAULTS ARE THE FIRST REAL ITEM ON BOTH AXES, never an empty state. The source
 * states no default for either control. Every other interactive on this build
 * opens on its first real item rather than on a "choose something" placeholder,
 * and an interactive whose first paint shows an inert diagram teaches a visitor
 * nothing about what its controls do. So the section paints `MODEL.scenarios[0]`
 * and `MODEL.views[0]` already selected, with the model already read by both.
 *
 * THE TWO GROUP NAMES ARE AUTHORED HERE, AND THE SOURCE IS SILENT ON BOTH. L62
 * says only that visitors "choose a scenario in the left panel"; L76 says only
 * that the visual "changes across five synchronized views". Neither states an
 * accessible name for a control. Both names below name the control's FUNCTION
 * rather than borrowing prose that means something else — the same resolution
 * `rail-transportation-2/content.architecture.ts` records for its own segment
 * selector. Specifically, neither reuses `HERO.ctaSecondary` ("Explore the
 * hyperscale model") nor `MODEL.heading` ("Interactive hyperscale model"): those
 * name the whole section, and a screen reader announcing the section's title as
 * the name of a control inside it would tell the listener the wrong thing about
 * what they are operating.
 *
 * THE PER-SCENARIO TEXT IS THE SCENARIO'S OWN NAME AND THE MEMBERS IT NAMES —
 * NOTHING ELSE. The consequence line is `MODEL.purposeTwo`, verbatim, unchanged
 * across all nine: it is the source's own statement (L102) of what may follow,
 * and it is deliberately constant because the source gives nine scenarios and one
 * consequence sentence. Writing nine bespoke consequence sentences would be nine
 * fabricated engineering claims about a customer facility. The differentiation a
 * visitor actually gets is the model — which members light, and how far the
 * dependency run descends — which is what L102 asks the visitor to be able to
 * see.
 *
 * MOBILE (OXOT_Mobile_Rules.md), binding: every control is a single tap on a
 * 44px-minimum target, nothing is behind hover or drag, and the panes stack with
 * the scenario list first — which is where L62 puts it in reading order anyway.
 * Nothing autoplays, so there is no motion to gate beyond the colour transitions
 * the canvas already drops under `prefers-reduced-motion`.
 */

/* ── Copy belonging to this section's chrome ─────────────────────────────── */

const T = {
  /** The section's short name at the head of the datum rule. `content.ts` states
   *  none, and the h2's own title is too long for an 11px mono label at 390px. */
  datumLabel: same("Interactive model"),
  /** Source L48, the brief's own heading for the five-level descent below it. */
  depthCaption: same("Core interaction"),
  /** Functional names for the two controls — see the docblock. */
  scenarioGroup: same("Hyperscale scenario"),
  viewGroup: same("Synchronized view"),
  /* The site-wide claim boundary for an illustrative Twin scenario, printed
     rather than implied. This is `OXOT_Layout_Styles.md`'s fixed literal —
     spaced em-dash, no period — not a local rewording of it. */
  claim: same("Illustrative scenario — no customer data"),
  readoutScenario: same("Selected scenario"),
  readoutNamed: same("Named in this scenario"),
  readoutConsequence: same("Consequence"),
  summaryLabel: same("This model, in words"),
  viewInFocus: same("View in focus")
};

/* ── The two selectors ───────────────────────────────────────────────────── */

/**
 * A radiogroup with a real roving tabindex, built directly rather than bent out
 * of a component that means something else: `Tabs` implies one content panel per
 * item and both groups here drive the SAME canvas, and `ToggleGroup` implies
 * independent on/off state per item where exactly one item is in force at all
 * times. Only the checked radio is in the tab sequence, so Tab enters and leaves
 * each group in one stop while Arrow / Home / End move the selection and DOM
 * focus together.
 */
interface SelectorProps {
  options: readonly Bilingual[];
  value: number;
  onValueChange: (value: number) => void;
  ariaLabel: string;
  locale: Locale;
  className?: string;
  itemClassName?: string;
}

function Selector({ options, value, onValueChange, ariaLabel, locale, className, itemClassName }: SelectorProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % options.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + options.length) % options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    else return;
    event.preventDefault();
    onValueChange(next);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn("flex gap-1 rounded-xl border border-border p-1", className)}
    >
      {options.map((option, i) => {
        const selected = i === value;
        return (
          <button
            key={pick(option, "en")}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn(
              "flex min-h-11 items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              selected
                ? "border-primary/60 bg-primary/10 text-primary-ink"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              itemClassName
            )}
          >
            {/* Not colour alone: a filled disc on the selected item, a hollow
                ring on every other. Readable in greyscale. */}
            <span
              aria-hidden="true"
              className={cn(
                "size-2 shrink-0 rounded-full border transition-colors duration-200",
                selected ? "border-primary bg-primary" : "border-current bg-transparent"
              )}
            />
            <span className={cn("text-sm leading-snug", selected ? "font-semibold" : "font-normal")}>
              {pick(option, locale)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── The section ─────────────────────────────────────────────────────────── */

export function ScenarioModel({ locale }: { locale: Locale }) {
  const [scenario, setScenario] = useState(0);
  const [view, setView] = useState(0);

  /* The members the selected scenario's own words name, printed with the ordinal
     of the band they sit on. Both halves are sourced: the member string is
     verbatim L89–L99, the ordinal is a fact about the drawing. Nothing here is a
     sentence written about the scenario. */
  const named = namedMembers(scenario).map(([band, member]) => ({
    band: String(band + 1).padStart(2, "0"),
    label: pick(LAYERS[band].members[member], locale)
  }));
  const focus = focusedBands(view)
    .map((band) => String(band + 1).padStart(2, "0"))
    .join(", ");

  return (
    <SectionA
      id={MODEL.id}
      index={MODEL.index}
      datumLabel={T.datumLabel}
      heading={MODEL.heading}
      lead={MODEL.purpose}
      locale={locale}
    >
      {/* L48–L59's five-level descent, printed as the ordered chain the source
          prints it as. It is NOT zipped onto the six drawn bands: the source
          gives five levels and six layers in separate blocks and states no
          mapping between them, so aligning them here would invent one. */}
      <p className="mono-label text-primary-ink">{pick(T.depthCaption, locale)}</p>
      <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
        {MODEL.depthChain.map((level, i) => (
          <li key={pick(level, "en")} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-muted-foreground">
                →
              </span>
            )}
            <span className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
              {pick(level, locale)}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* THE SCENARIO PANEL, LEFT — source L62's own placement, and the first
            pane in reading order when the grid stacks at mobile. */}
        <div className="lg:col-span-4">
          <Selector
            options={MODEL.scenarios}
            value={scenario}
            onValueChange={setScenario}
            ariaLabel={pick(T.scenarioGroup, locale)}
            locale={locale}
            className="w-full flex-col"
            itemClassName="w-full"
          />
        </div>

        {/* min-w-0: a grid item defaults to min-width:auto, so without this the
            canvas's min-w-[640px] child propagates out through its own
            overflow-x-auto wrapper and sizes this whole grid track instead of
            scrolling inside it — the exact failure `ui/static-table.tsx`'s own
            docblock documents for the identical shape. */}
        <div className="min-w-0 lg:col-span-8">
          <figure data-gfx-meaning className="m-0">
            {/* The view control sits with the drawing it re-reads, not with the
                scenario list: the two axes are independent, and stacking them in
                one column would read as one control nested inside the other. */}
            <Selector
              options={MODEL.views}
              value={view}
              onValueChange={setView}
              ariaLabel={pick(T.viewGroup, locale)}
              locale={locale}
              className="w-full flex-wrap"
              /* NOT `flex-1`: paired with the parent's `flex-wrap`, `flex-1`
                 (flex-basis 0%) plus `min-w-0` makes every button infinitely
                 shrinkable, so the row never actually wraps — all five get
                 squeezed to an equal fraction of the row instead, clipping the
                 longer labels below their own text width (caught by
                 `measure.mjs`'s overflow check at 390px). Dropping `flex-1`
                 restores the default `flex: 0 1 auto`, so each button keeps
                 its content width and the ones that do not fit move to the
                 next line, which is what `flex-wrap` is for. */
              itemClassName="min-w-0"
            />

            <p className="mono-label mt-3 inline-block rounded-full border border-border px-2.5 py-1">
              {pick(T.claim, locale)}
            </p>

            {/* At 390px six bands of up to eight members cannot compress to a
                legible 11px floor, so the figure scrolls sideways inside its own
                frame rather than dropping its labels below it. The page body
                never scrolls horizontally. */}
            <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="min-w-[640px]">
                <ScenarioModelCanvas scenario={scenario} view={view} locale={locale} />
              </div>
            </div>

            <ScenarioModelLegend locale={locale} />

            {/* Keyed to the LIVE selection, so a screen-reader user moving either
                control hears the model change rather than being told a caption
                did. */}
            <figcaption className="sr-only" aria-live="polite">
              {pick(T.summaryLabel, locale)}. {pick(T.readoutScenario, locale)}:{" "}
              {pick(MODEL.scenarios[scenario], locale)}. {pick(T.viewInFocus, locale)}:{" "}
              {pick(MODEL.views[view], locale)}. {pick(T.readoutNamed, locale)}:{" "}
              {named.map((n) => `${n.band} ${n.label}`).join(", ")}. {pick(MODEL.purposeTwo, locale)}
            </figcaption>
          </figure>
        </div>
      </div>

      {/* THE CONSEQUENCE READOUT. Two of its three columns change with the
          selection and both are sourced strings; the third is L102's second
          sentence, constant across all nine scenarios because the source states
          one consequence sentence and nine scenarios, not nine of each. */}
      <div className="mt-8 grid gap-6 rounded-2xl border border-border bg-muted/40 p-6 sm:grid-cols-3">
        <div>
          <p className="mono-label text-primary-ink">{pick(T.readoutScenario, locale)}</p>
          <p className="mt-2 body-copy font-semibold leading-snug">
            {pick(MODEL.scenarios[scenario], locale)}
          </p>
        </div>
        <div>
          <p className="mono-label text-primary-ink">{pick(T.readoutNamed, locale)}</p>
          <ul className="mt-2 space-y-1.5">
            {named.map((n) => (
              <li key={n.band + n.label} className="flex items-baseline gap-2 body-copy leading-snug">
                <span className="mono-label shrink-0">{n.band}</span>
                <span>{n.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono-label text-primary-ink">{pick(T.readoutConsequence, locale)}</p>
          <p className="mt-2 body-copy leading-relaxed text-muted-foreground">
            {pick(MODEL.purposeTwo, locale)}
          </p>
        </div>
      </div>

      {/* The view channel's own readout: which band ordinals the selected view
          fills. It sits under the figure rather than inside the panel above,
          because it describes the drawing's second axis rather than the
          scenario's consequence. */}
      <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="mono-label">{pick(T.viewInFocus, locale)}</span>
        <span className="text-sm text-muted-foreground">
          {pick(MODEL.views[view], locale)} — {focus}
        </span>
      </p>
    </SectionA>
  );
}
