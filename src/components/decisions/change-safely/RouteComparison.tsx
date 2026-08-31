import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { RouteDiagram } from "./RouteDiagram";
import { BASELINE_EDGES, COMPARISON, CONTROLLED_EDGES, ILLUSTRATIVE, type RouteState } from "./content";

/**
 * THE CENTREPIECE. OXOT_content-to-visual-mapping-table.md maps "Proposed
 * control" to a "Before/after route comparison" and names "Checkmark list"
 * as the thing to avoid, so this section is one route graph read twice —
 * Panel A above, Panel B directly below at identical coordinates — with a
 * route-state table underneath naming what moved. There is no tick beside
 * a benefit anywhere on this page.
 *
 * STACKED, NOT SIDE BY SIDE. Two 960-unit panels in a two-column grid
 * would each render at roughly half the canvas, dropping every label under
 * the styleguide's 11px floor. Stacking gives each panel the full canvas
 * width and puts both drawings on one vertical axis, so the reader's eye
 * travels straight down from a route to the same route in its other state
 * — which is the comparison the section exists to make.
 *
 * NOTHING HERE IS INTERACTIVE, AND THE PAGE SAYS SO. Both panels are
 * server-rendered static SVG: no toggle, no client boundary, no animation,
 * and COMPARISON.staticNote states that plainly beside them. A page whose
 * whole claim is "test the change in a model first" is the worst possible
 * place to imply a simulation that is not running.
 */

/** Token per semantic state — legend and table read from the same map. */
const SWATCH: Record<RouteState, string> = {
  selected: "hsl(var(--destructive))",
  proposed: "hsl(var(--primary))",
  closed: "hsl(var(--reg-nis2))",
  flow: "hsl(var(--secondary))",
  context: "hsl(var(--border))"
};

function Panel({
  tag,
  title,
  caption,
  children
}: {
  tag: string;
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <figcaption className="mb-6">
        <span className="mono-label rounded-full border border-border px-2.5 py-1 text-muted-foreground">{tag}</span>
        <h3 className="h-card mt-3 text-foreground">{title}</h3>
      </figcaption>
      {children}
      <p className="prose-measure mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
        {caption}
      </p>
    </figure>
  );
}

export function RouteComparison({ locale }: { locale: Locale }) {
  const t = COMPARISON;

  return (
    <section aria-labelledby="comparison" className="mt-20 border-t border-border pt-10">
      <p className="oxot-kicker">{pick(t.eyebrow, locale)}</p>
      <h2 id="comparison" className="h-section mt-4 text-foreground">
        {pick(t.h2, locale)}
      </h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.intro, locale)}
      </p>

      <p className="mono-label mt-7">
        <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-1 text-primary-ink">
          {pick(ILLUSTRATIVE, locale)}
        </span>
      </p>

      <div className="mt-8 space-y-8">
        <Panel
          tag={pick(t.panelA.tag, locale)}
          title={pick(t.panelA.title, locale)}
          caption={pick(t.panelA.caption, locale)}
        >
          <RouteDiagram
            locale={locale}
            variant="baseline"
            edges={BASELINE_EDGES}
            titleId="diagram-a-title"
            descId="diagram-a-desc"
            title={pick(t.panelA.title, locale)}
            description={pick(t.panelA.caption, locale)}
            boundaryLabel={pick(t.boundaryLabel, locale)}
          />
        </Panel>

        <Panel
          tag={pick(t.panelB.tag, locale)}
          title={pick(t.panelB.title, locale)}
          caption={pick(t.panelB.caption, locale)}
        >
          <RouteDiagram
            locale={locale}
            variant="controlled"
            edges={CONTROLLED_EDGES}
            titleId="diagram-b-title"
            descId="diagram-b-desc"
            title={pick(t.panelB.title, locale)}
            description={pick(t.panelB.caption, locale)}
            boundaryLabel={pick(t.boundaryLabel, locale)}
          />
        </Panel>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{pick(t.staticNote, locale)}</p>

      {/* Legend, and the cyan evidence key the two drawings share. */}
      <div className="mt-10 grid grid-cols-1 gap-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div>
          <h3 className="mono-label text-foreground">{pick(t.legendHeading, locale)}</h3>
          <dl className="mt-4 space-y-3">
            {t.legend.map((item) => (
              <div key={item.state} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-8 shrink-0 rounded-full"
                  style={{ backgroundColor: SWATCH[item.state] }}
                />
                <div>
                  <dt className="text-sm font-semibold text-foreground">{pick(item.label, locale)}</dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">{pick(item.note, locale)}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="mono-label flex items-center gap-2 text-foreground">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "hsl(var(--reg-iec))" }}
            />
            {pick(t.evidenceHeading, locale)}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pick(t.evidenceNote, locale)}</p>
        </div>
      </div>

      {/* The route-state table: the text equivalent of both drawings, and the
          thing a checkmark list would otherwise have been. Every row names a
          route, its baseline state and its modelled state — three facts, not
          a tick against a benefit. */}
      <div className="mt-12">
        <h3 className="h-sub text-foreground">{pick(t.deltaHeading, locale)}</h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="mono-label py-3 pr-4 align-bottom">
                  {pick(t.deltaColumns.route, locale)}
                </th>
                <th scope="col" className="mono-label w-[24%] py-3 pr-4 align-bottom">
                  {pick(t.deltaColumns.baseline, locale)}
                </th>
                <th scope="col" className="mono-label w-[30%] py-3 align-bottom">
                  {pick(t.deltaColumns.modelled, locale)}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.delta.map((row) => (
                <tr key={row.id} className="border-b border-border align-top">
                  <th scope="row" className="py-4 pr-4 font-normal">
                    <span className="mono-label block">{row.id}</span>
                    <span className="mt-1 block text-sm font-semibold leading-relaxed text-foreground">
                      {pick(row.route, locale)}
                    </span>
                  </th>
                  <td className="py-4 pr-4 text-sm leading-relaxed text-muted-foreground">
                    {pick(row.baseline, locale)}
                  </td>
                  <td className="py-4 text-sm leading-relaxed">
                    <span className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: SWATCH[row.state] }}
                      />
                      <span className="text-foreground">{pick(row.modelled, locale)}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
