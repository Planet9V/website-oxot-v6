"use client";

import { useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { ARCHITECTURE } from "./content";
import {
  OT_FRAME_NOTE,
  PURDUE_NOTE,
  SCHEMATIC_NOTE,
  SHARED_LAYERS,
  SYSTEMS,
  TWIN_NOTE,
  UNTRACED_IMPACT,
  VIEWS,
  type ArchStage,
  type SystemId,
  type ViewId
} from "./content.architecture";
import { ProcessCanvas } from "./ProcessCanvas";

/**
 * S02 · ARCHITECTURE. The page's largest original drawing, and the only place
 * on it that switches anything.
 *
 * TWO SELECTORS, BOTH HERE. The source asks for a drinking-water / wastewater
 * choice (L102) and a four-view switcher (L62). Both live in this section and
 * neither is on the hero, which shows one strict path. A reader meets prose,
 * then one instrument, rather than two competing ones.
 *
 * NATIVE RADIOS, NOT A CUSTOM WIDGET. Each selector is a real `<fieldset>` of
 * `<input type="radio">`: arrow-key movement, the selected state, the group
 * name and the position in the group all come from the platform and are
 * announced without a line of ARIA. Every control clears the Mobile Rules' 44px
 * minimum (`min-h-11`), carries a visible marker as well as a colour, and is
 * operable by tap or keyboard — never by drag, never by hover. The current
 * selection is also written out in words in a polite live region, so a change
 * is heard as a sentence and not only as a repaint.
 *
 * THE DRAWING IS `aria-hidden`; THIS COMPONENT IS ITS TEXT. Every label in the
 * SVG is restated below it — stage names, the equipment or overlay or
 * consequence for the selected view, both shared layers, and the numbered route
 * — which is the alternate summary the Mobile Rules require of any figure that
 * scrolls sideways, and the accessible equivalent 1.1.1 requires of any figure
 * at all. The scroll affordance is stated in visible text above the frame
 * rather than implied by a cut-off edge, and the frame itself is focusable so
 * the drawing can be scrolled from the keyboard.
 *
 * WHERE THE SOURCE TRACES NOTHING, THE SECTION SAYS SO. Two wastewater stages
 * have no consequence attached to them anywhere in the source. In the impact
 * view they are drawn with a dashed bar and the words "NOT TRACED", and the
 * list underneath says it in a sentence. Inventing a plausible consequence for
 * a headworks would have been the easy way to make the view look complete.
 *
 * NO `data-balance-group`, deliberately: this section is one drawing and one
 * list beneath it, not a pair of siblings, so there is no ratio to hold. The
 * harness reports how many marked groups a route has, and an unmarked section
 * should read as reasoned rather than missed.
 */

function Choice<T extends string>({
  legend,
  locale,
  name,
  onChange,
  options,
  value,
  columns
}: {
  legend: string;
  locale: Locale;
  name: string;
  onChange: (id: T) => void;
  options: { id: T; label: Bilingual }[];
  value: T;
  columns: string;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mono-label mb-2">{legend}</legend>
      <div className={cn("grid gap-2", columns)}>
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <label
              key={option.id}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors duration-200",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
                selected
                  ? "border-primary/60 bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              {/* The selected state is a filled bar as well as a colour. */}
              <span
                aria-hidden="true"
                className={cn(
                  "h-4 w-0.5 shrink-0 rounded-full transition-colors duration-200",
                  selected ? "bg-primary" : "bg-input"
                )}
              />
              <span className={cn("text-sm leading-snug", selected && "font-medium")}>
                {pick(option.label, locale)}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * THE OT VIEW IS RENDERED ON THE SERVER AND HANDED IN, and it has to be.
 *
 * `Diagram` is an async Server Component: it awaits ELK, so the layout runs once
 * in Node during `next build` and the page ships finished SVG. A `"use client"`
 * component cannot call one. It also must not try — `Diagram` reaches
 * `resolveSymbol`, which pulls the 462 KB `drawio-manifest.ts` in with it, and
 * importing that from anywhere on the client side would put a whole stencil
 * library into a marketing page's bundle.
 *
 * So `page.tsx` renders both variants as Server Components and passes them down
 * as ready-made elements. This component only chooses which one to mount. Two
 * elements arrive in the RSC payload and one is shown; the layout engine, the
 * glyph registry and the manifest all stay in Node.
 */
export function ProcessArchitecture({
  locale,
  otDiagrams
}: {
  locale: Locale;
  /** One server-rendered Purdue diagram per system. See the docblock above. */
  otDiagrams: Record<SystemId, ReactNode>;
}) {
  const [systemId, setSystemId] = useState<SystemId>("drinking");
  const [viewId, setViewId] = useState<ViewId>("process");

  const system = SYSTEMS.find((s) => s.id === systemId) ?? SYSTEMS[0];
  const view = VIEWS.find((v) => v.id === viewId) ?? VIEWS[0];

  /* What the stage list shows for the selected view. `cyber` is the exception:
     it is a route through the whole system rather than a fact about each stage,
     so it renders as its own ordered list instead. */
  const stageBody = (stage: ArchStage) => {
    if (viewId === "ot") return pick(stage.ot, locale);
    if (viewId === "impact") return pick(stage.impact ?? UNTRACED_IMPACT, locale);
    return pick(stage.equipment, locale);
  };

  return (
    <section className="oxot-canvas pt-16 sm:pt-24" id="architecture">
      {/* `.oxot-canvas` not the earlier `mx-auto w-full max-w-5xl px-6`
          (fixed 2026-08-25, systemic audit) — see TechnologyIndex.tsx's
          docblock for the full reasoning; this section had the identical
          wrong-container-class defect. */}
      <p className="mono-label">02 · {pick(ARCHITECTURE.datum, locale)}</p>
      <h2 className="mt-4 text-balance text-2xl font-semibold sm:text-3xl">
        {pick(ARCHITECTURE.h2, locale)}
      </h2>
      {/* No `prose-measure` (removed 2026-08-25, systemic audit) — see
          Capabilities.tsx's identical fix for the reasoning. */}
      <p className="mt-4 text-pretty body-copy leading-relaxed text-muted-foreground">
        {pick(ARCHITECTURE.intro, locale)}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <Choice
          columns="grid-cols-2 sm:grid-cols-1"
          legend={locale === "nl" ? "Systeem" : "System"}
          locale={locale}
          name="water-3-system"
          onChange={setSystemId}
          options={SYSTEMS.map((s) => ({ id: s.id, label: s.label }))}
          value={systemId}
        />
        <Choice
          columns="grid-cols-2 lg:grid-cols-4"
          legend={locale === "nl" ? "Weergave" : "View"}
          locale={locale}
          name="water-3-view"
          onChange={setViewId}
          options={VIEWS.map((v) => ({ id: v.id, label: v.label }))}
          value={viewId}
        />
      </div>

      {/* The selection, in words. Visible, and announced when it changes. */}
      <p aria-live="polite" className="mt-5 body-copy leading-relaxed text-foreground">
        <span className="font-semibold">
          {pick(system.label, locale)} · {pick(view.label, locale)}.
        </span>{" "}
        <span className="text-muted-foreground">{pick(view.summary, locale)}</span>
      </p>

      {viewId === "ot" ? (
        /* NOT WRAPPED IN A `<figure>`, deliberately. `Diagram` brings its own
           `<figure role="img">` plus a sibling block restating every element,
           level, zone and connection as real text — which is the accessible
           equivalent this section otherwise has to supply by hand. A second
           figure around it would nest one figure in another and leave the outer
           `figcaption` describing an ambiguous subject. It also brings its own
           horizontal scroll container, so there is no `overflow-x-auto` here
           either; two nested scrollers is one too many.

           The long-section's own caption is dropped for this view rather than
           reworded: `system.path` is the water's route and `SCHEMATIC_NOTE` is a
           caveat about hydraulic grade, and neither is a fact about a Purdue
           chart. */
        <div className="mt-6">
          <p className="mono-label mb-2">{pick(OT_FRAME_NOTE, locale)}</p>
          {/* NO HORIZONTAL PADDING, AND IT WAS MEASURED. `Diagram` pins the
              drawing at `MIN_RENDER_SCALE` (1.16) so its smallest lettering
              cannot fall under 11 px, which for this 1,038-unit sheet is a
              1,204 px minimum width. The long-section's frame carries
              `p-4 sm:p-6`, and 48 px of side padding left a 1,166 px column at
              1440 — 38 px short, so the figure's own scroller cut the last
              letter off "logic download" at the right edge. Vertical padding
              costs nothing here and stays; the sheet's own 24-unit canvas
              margin (28 px at this scale) is what keeps the drawing off the
              border. Narrower viewports still scroll, which is the documented
              behaviour and what the note above the frame describes. */}
          <div className="rounded-2xl border border-border bg-card py-4 sm:py-6">
            {otDiagrams[systemId]}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {pick(PURDUE_NOTE, locale)}
          </p>
        </div>
      ) : (
        <figure className="m-0 mt-6">
          {/* The scroll affordance, as a sentence rather than a cut edge. */}
          <p className="mono-label mb-2">
            {locale === "nl"
              ? "De tekening schuift zijwaarts op een smal scherm. Alles erin staat hieronder ook als tekst."
              : "The drawing scrolls sideways on a narrow screen. Everything in it is listed as text below."}
          </p>
          <div
            aria-label={
              locale === "nl"
                ? "Tekening; de inhoud staat als tekst onder de figuur."
                : "Drawing; its contents are listed as text under the figure."
            }
            className="overflow-x-auto rounded-2xl border border-border bg-card p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-6"
            role="group"
            tabIndex={0}
          >
            <ProcessCanvas locale={locale} system={system} view={viewId} />
          </div>

          <figcaption className="mt-4 space-y-2">
            <p className="body-copy leading-relaxed text-foreground">
              {pick(system.path, locale)}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pick(SCHEMATIC_NOTE, locale)}
            </p>
          </figcaption>
        </figure>
      )}

      {/* THE TEXT EQUIVALENT, for the selected view. */}
      {viewId === "cyber" ? (
        <div className="mt-8 border-t border-border pt-5">
          <h3 className="h-micro text-foreground">{pick(system.route.title, locale)}</h3>
          <p className="mono-label mt-1.5">{pick(system.route.provenance, locale)}</p>
          <ol className="mt-4 space-y-3">
            {system.route.steps.map((step, i) => (
              <li key={step.id} className="flex gap-3">
                <span className="mono-label shrink-0 pt-0.5 text-primary-ink">{i + 1}</span>
                <span className="body-copy leading-snug text-foreground">
                  {pick(step.label, locale)}
                </span>
              </li>
            ))}
          </ol>
          <p className="prose-measure mt-5 border-l-2 border-primary/40 pl-4 body-copy leading-relaxed text-muted-foreground">
            {pick(system.route.decision, locale)}
          </p>
        </div>
      ) : (
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {system.stages.map((stage) => (
            <li key={stage.id} className="border-t border-border pt-3">
              <p className="body-copy font-semibold leading-snug text-foreground">
                {pick(stage.name, locale)}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{stageBody(stage)}</p>
            </li>
          ))}
        </ol>
      )}

      {/* The two shared layers, in words, under every view — they are drawn
          under every view too. */}
      <dl className="mt-8 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
        {[SHARED_LAYERS.control, SHARED_LAYERS.comms].map((layer) => (
          <div key={layer.caption.en}>
            <dt className="body-copy font-semibold leading-snug text-foreground">
              {pick(layer.caption, locale)}
            </dt>
            <dd className="ml-0 mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {pick(layer.text, locale)}
              <span className="mt-1.5 block">{pick(layer.note, locale)}</span>
            </dd>
          </div>
        ))}
      </dl>

      {/* No `prose-measure` (removed 2026-08-25, systemic audit) — see
          Capabilities.tsx's identical fix for the reasoning. */}
      <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(TWIN_NOTE, locale)}
      </p>
    </section>
  );
}
