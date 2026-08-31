import type { ReactNode } from "react";
import type { Bilingual } from "@/i18n/bilingual";
import { pick } from "@/i18n/bilingual";
import type { Locale } from "@/i18n/config";
import { layoutDiagram, MIN_RENDER_SCALE } from "./layout";
import { assertSpecResolves, EDGE_KIND_LABEL, PURDUE_LEVEL_LABEL, zoneLabel } from "./types";
import type { DiagramSpec, DiagramType } from "./types";
import { BlockDiagram, type TypeRendererProps } from "./BlockDiagram";
import { PidDiagram } from "./PidDiagram";
import { PurdueDiagram } from "./PurdueDiagram";

/**
 * THE ONE ENTRY POINT. A page hands over a `DiagramSpec` and gets a figure.
 *
 * ASYNC SERVER COMPONENT, ON PURPOSE. `layoutDiagram` awaits ELK, and running
 * that here means the layout happens once in Node during `next build` and the
 * page ships finished SVG — no layout engine in the client bundle, no
 * post-hydration reflow, and, decisively, `assertSpecResolves` throwing on an
 * unresolvable symbol slug FAILS THE BUILD rather than rendering a placeholder
 * nobody notices until an engineer does.
 *
 * WHY THE RESTATEMENT SITS OUTSIDE THE FIGURE. `role="img"` makes an element a
 * leaf in the accessibility tree — its descendants stop being exposed. Putting
 * the visually-hidden text INSIDE a `role="img"` figure therefore hides the
 * very thing it exists to provide, and the drawing goes back to being
 * load-bearing for anyone who cannot see it. So the figure carries
 * `role="img"` + `aria-label` (its short name) and `aria-describedby` pointing
 * at a sibling block holding the full restatement: every node with its tag, its
 * Purdue level and its 62443 zone, and every connection with its ISA line kind.
 * That block is real, reachable text. The SVG itself is `aria-hidden`, so every
 * shape inside it — which is all of them — is decorative by construction.
 *
 * NO HORIZONTAL DOCUMENT OVERFLOW. The scroll container is the figure, never
 * the page. A wide drawing scrolls inside its own box at 390 and 834 and simply
 * fits at 1440 and 2560 — the failure being avoided is a 900-unit canvas
 * pushing the whole document sideways on a phone.
 */

const TYPE_LABEL: Record<DiagramType, Bilingual> = {
  pid: { en: "piping and instrumentation diagram", nl: "leiding- en instrumentatieschema" },
  purdue: { en: "Purdue model diagram", nl: "Purdue-modelschema" },
  network: { en: "network diagram", nl: "netwerkschema" },
  block: { en: "block diagram", nl: "blokschema" },
  process: { en: "process diagram", nl: "processchema" },
  c4: { en: "C4 architecture diagram", nl: "C4-architectuurschema" }
};

const UI: Record<string, Bilingual> = {
  elements: { en: "Elements", nl: "Elementen" },
  connections: { en: "Connections", nl: "Verbindingen" },
  tag: { en: "tag", nl: "tag" },
  zone: { en: "zone", nl: "zone" },
  to: { en: "to", nl: "naar" },
  none: { en: "No connections.", nl: "Geen verbindingen." }
};

const RENDERER: Record<DiagramType, (props: TypeRendererProps) => ReactNode> = {
  pid: PidDiagram,
  purdue: PurdueDiagram,
  network: BlockDiagram,
  block: BlockDiagram,
  process: BlockDiagram,
  c4: BlockDiagram
};

/** Stable, deterministic id stem, so marker ids do not change between renders. */
function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

export interface DiagramProps {
  spec: DiagramSpec;
  locale: Locale;
  /** Override the derived id stem when two diagrams on one page share a title. */
  id?: string;
  className?: string;
}

export async function Diagram({ spec, locale, id, className }: DiagramProps) {
  // Before anything is measured or drawn. A gap in the glyph library is a
  // malformed spec, and it is reported as the whole list of gaps at once.
  assertSpecResolves(spec);

  const layout = await layoutDiagram(spec);
  const stem = id ?? `dg-${spec.type}-${slug(spec.title.en)}`;
  const descId = `${stem}-desc`;
  const Renderer = RENDERER[spec.type];

  const title = pick(spec.title, locale);
  const typeName = pick(TYPE_LABEL[spec.type], locale);
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));

  return (
    <div className={className}>
      <figure
        aria-describedby={descId}
        aria-label={`${title} — ${typeName}`}
        className="m-0 w-full overflow-x-auto"
        data-diagram-sector={spec.sector}
        data-diagram-type={spec.type}
        role="img"
      >
        <svg
          aria-hidden="true"
          className="h-auto w-full"
          data-gfx-meaning={`${spec.type} diagram: ${spec.title.en}`}
          focusable="false"
          // THE TYPE FLOOR IS ENFORCED HERE, because this is the only place
          // that knows the ratio type size actually depends on. A viewBox
          // scales with its column, so the same components rendered 13 px
          // lettering in one plate on this site and 8.6 px in another — the
          // difference was the frame each page happened to give them, and the
          // independent audit read the second as "a smudge at 1x". Below
          // `MIN_RENDER_SCALE` the drawing widens past its column and scrolls
          // inside the figure, which is a thing this component is already built
          // to do and is strictly better than illegible.
          style={{ minWidth: `${Math.round(layout.width * MIN_RENDER_SCALE)}px` }}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
        >
          <Renderer idPrefix={stem} layout={layout} locale={locale} spec={spec} />
        </svg>
      </figure>

      <div className="sr-only" id={descId}>
        <p>
          {title} — {typeName}
          {spec.sector ? ` (${spec.sector})` : ""}.
        </p>
        <p>{pick(UI.elements, locale)}:</p>
        <ol>
          {spec.nodes.map((n) => (
            <li key={n.id}>
              {pick(n.label, locale)}
              {n.tag ? `, ${pick(UI.tag, locale)} ${n.tag}` : ""}
              {n.purdue !== undefined ? `, ${pick(PURDUE_LEVEL_LABEL[n.purdue], locale)}` : ""}
              {n.zone ? `, ${pick(UI.zone, locale)} ${pick(zoneLabel(n.zone), locale)}` : ""}.
            </li>
          ))}
        </ol>
        <p>{pick(UI.connections, locale)}:</p>
        {spec.edges.length === 0 ? (
          <p>{pick(UI.none, locale)}</p>
        ) : (
          <ol>
            {spec.edges.map((e, i) => {
              const from = byId.get(e.from);
              const to = byId.get(e.to);
              return (
                <li key={`${e.from}-${e.to}-${i}`}>
                  {from ? pick(from.label, locale) : e.from} {pick(UI.to, locale)}{" "}
                  {to ? pick(to.label, locale) : e.to} — {pick(EDGE_KIND_LABEL[e.kind], locale)}
                  {e.label ? `, ${pick(e.label, locale)}` : ""}.
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
