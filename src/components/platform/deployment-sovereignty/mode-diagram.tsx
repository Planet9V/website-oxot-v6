import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ENCLAVE, type ModeSpec } from "./content-modes";
import { ChipRow, FigureNote } from "./primitives";

/**
 * THE PAGE'S SIGNATURE MOTIF: three trust-boundary and data-flow diagrams,
 * one per deployment mode.
 *
 * OXOT_content-to-visual-mapping-table.md maps "Deployment boundary" to a
 * "Data-flow and trust-boundary diagram" and names the thing to avoid by
 * name: "Cloud icon cards". So there are no cloud icons and no three-up
 * icon-card grid here. Each figure draws a real boundary with real flows
 * crossing it, and the three differ in the one respect the visual spec
 * says they must differ in — the crossing.
 *
 *   Island Mode      an air gap: two parallel rules with a void between
 *                    them, the notation an OT engineer already reads as
 *                    "no path", and NO arrow anywhere on the figure.
 *   Inbound Intel.   exactly one arrow, pointing in, through a diode. The
 *                    return direction is drawn AND barred, because "there
 *                    is no arrow" and "the arrow is blocked" are different
 *                    claims and this mode makes the second one.
 *   Dedicated        no air gap to draw, so the subject becomes tenancy:
 *                    an approved-region band, a single-tenant boundary,
 *                    neighbouring tenants outside it with a severed path,
 *                    and four named conduits that read inward only.
 *
 * WHAT IS THE SAME IN ALL THREE, because the spec lists them as mandatory
 * common elements: the approved-export list feeding the model, and a
 * process-network band the Twin has no connector to. That connector is
 * drawn and cut rather than simply left out — an absent line proves
 * nothing, a severed one is a claim the reader can check.
 *
 * NOTHING HERE IS INTERACTIVE AND NOTHING PRETENDS TO BE. No state, no
 * hover reveal, no toggle, no "select a mode" affordance. All three
 * diagrams render at once, in the document, as static drawings — which is
 * also why they are HTML boxes with inline SVG connectors rather than one
 * monolithic SVG: real DOM text reflows, wraps, zooms, is selectable and
 * is read in document order by a screen reader, and a canvas of SVG <text>
 * nodes is none of those things.
 *
 * Colour carries meaning and is token-only: --primary marks a permitted
 * flow and the customer's own boundary; --muted-foreground with a dashed
 * stroke and a slash marks a path that exists in the topology and carries
 * nothing. No hex and no literal hsl() anywhere in this file.
 */

/* ---------------------------------------------------------------- parts */

/** A permitted flow. Solid, --primary, arrowhead at the receiving end. */
function FlowIn({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <svg aria-hidden="true" viewBox="0 0 14 40" className="h-10 w-3.5 shrink-0 text-primary">
        <line x1="7" y1="0" x2="7" y2="30" stroke="currentColor" strokeWidth="1.75" />
        <polygon points="7,39 2,29 12,29" fill="currentColor" />
      </svg>
      <p className="mono-label text-primary-ink">{label}</p>
    </div>
  );
}

/**
 * A path that exists and does not carry traffic: dashed, muted, open
 * arrowhead, struck through. The sr-only word "Blocked" is not decoration
 * — a slash drawn across a line is not information a screen reader can
 * recover from the SVG, and the whole point of the figure is direction.
 */
function FlowBlocked({ label, direction }: { label: string; direction: "up" | "down" }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <svg aria-hidden="true" viewBox="0 0 20 40" className="h-10 w-5 shrink-0 text-muted-foreground">
        <g transform={direction === "up" ? undefined : "rotate(180 10 20)"}>
          <line x1="10" y1="40" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="10,4 5,14 15,14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <line x1="1" y1="29" x2="19" y2="13" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p className="mono-label text-muted-foreground">
        <span className="sr-only">Blocked: </span>
        {label}
      </p>
    </div>
  );
}

/** A named box on the diagram. */
function Box({
  label,
  items,
  emphasis = "plain",
  note
}: {
  label: string;
  items?: readonly string[];
  emphasis?: "plain" | "twin" | "excluded";
  note?: string;
}) {
  const shell =
    emphasis === "twin"
      ? "rounded-lg border border-primary/50 bg-muted px-5 py-4"
      : emphasis === "excluded"
        ? "rounded-lg border border-dashed border-border bg-background px-5 py-4"
        : "rounded-lg border border-border bg-card px-5 py-4";
  return (
    <div className={shell}>
      <p
        className={
          emphasis === "twin"
            ? "font-display body-lead font-bold leading-snug text-foreground"
            : "mono-label font-bold text-foreground"
        }
      >
        {label}
      </p>
      {items ? <ChipRow items={items} muted={emphasis === "excluded"} /> : null}
      {note ? <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">{note}</p> : null}
    </div>
  );
}

/**
 * THE AIR GAP. Two parallel rules with nothing between them, drawn full
 * width so the figure is cut into two halves that do not meet. This is the
 * whole of Island Mode's argument, and it is made by an absence.
 */
function AirGap({ label, body }: { label: string; body: string }) {
  return (
    <div className="py-5">
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 400 26"
          preserveAspectRatio="none"
          className="h-6 w-full text-muted-foreground"
        >
          <line x1="0" y1="2" x2="400" y2="2" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="24" x2="400" y2="24" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
          <span className="mono-label bg-background px-3 font-bold text-foreground">{label}</span>
        </p>
      </div>
      <p className="mt-4 max-w-[62ch] text-[0.8125rem] leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

/** The customer's own boundary. Dashed --primary, labelled on the edge. */
function Boundary({ label, note, children }: { label: string; note?: string; children: ReactNode }) {
  return (
    <div className="relative rounded-xl border border-dashed border-primary/60 bg-background px-4 pb-5 pt-7 sm:px-6">
      <p className="absolute -top-2.5 left-4 sm:left-6">
        <span className="mono-label bg-background px-2 font-bold text-primary-ink">{label}</span>
      </p>
      {note ? <p className="mb-5 text-[0.8125rem] leading-relaxed text-muted-foreground">{note}</p> : null}
      {children}
    </div>
  );
}

/**
 * The band every diagram ends on: the live process network, sitting inside
 * the customer's own environment, with the connector to the Twin cut.
 * Identical in all three modes because the commitment is identical in all
 * three, and repeating it is the point rather than a redundancy.
 */
function ProcessNetwork({ locale }: { locale: Locale }) {
  return (
    <>
      <FlowBlocked direction="down" label={pick(ENCLAVE.untouchedNote, locale)} />
      <Box
        emphasis="excluded"
        label={pick(ENCLAVE.untouchedLabel, locale)}
        items={ENCLAVE.untouched.map((u) => pick(u, locale))}
      />
    </>
  );
}

/** Imports, arrow, Twin — the interior every mode shares. */
function ModelBuild({ mode, locale }: { mode: ModeSpec; locale: Locale }) {
  return (
    <>
      <Box label={pick(ENCLAVE.importsLabel, locale)} items={ENCLAVE.imports.map((i) => pick(i, locale))} />
      <FlowIn label={pick(ENCLAVE.importsLabel, locale)} />
      <Box emphasis="twin" label={pick(mode.twinLabel, locale)} items={mode.twinItems.map((t) => pick(t, locale))} />
    </>
  );
}

/* ------------------------------------------------------------- diagrams */

/**
 * One figure per mode. The `crossing` union decides which of the three
 * shapes is drawn, so a diagram cannot drift out of step with the prose
 * beside it — both read the same record in ./content-modes.ts.
 */
export function ModeDiagram({ mode, locale, figureNote }: { mode: ModeSpec; locale: Locale; figureNote: string }) {
  const c = mode.crossing;

  return (
    <figure className="mt-8">
      {c.kind === "sealed" ? (
        <>
          <Box
            emphasis="excluded"
            label={pick(c.outsideLabel, locale)}
            items={c.outsideItems.map((o) => pick(o, locale))}
          />
          <AirGap label={pick(c.barLabel, locale)} body={pick(c.barBody, locale)} />
          <Boundary label={pick(ENCLAVE.label, locale)} note={pick(ENCLAVE.note, locale)}>
            <ModelBuild mode={mode} locale={locale} />
            <ProcessNetwork locale={locale} />
          </Boundary>
        </>
      ) : null}

      {c.kind === "diode" ? (
        <>
          <Box
            emphasis="excluded"
            label={pick(c.outsideLabel, locale)}
            items={c.outsideItems.map((o) => pick(o, locale))}
          />

          {/* THE DIODE. Two lanes side by side so the asymmetry IS the
              picture: one permitted inbound flow on the left, the return
              direction drawn and barred on the right. A reader counting
              arrows across this boundary counts exactly one. */}
          <div className="my-5 grid gap-4 rounded-lg border border-border bg-card px-5 py-4 sm:grid-cols-2 sm:gap-8">
            <div>
              <p className="mono-label font-bold text-primary-ink">{pick(c.inLabel, locale)}</p>
              <FlowIn label={pick(c.outsideLabel, locale)} />
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">{pick(c.inBody, locale)}</p>
            </div>
            <div className="border-t border-border pt-4 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
              <p className="mono-label font-bold text-muted-foreground">{pick(c.outLabel, locale)}</p>
              <FlowBlocked direction="up" label={pick(c.outLabel, locale)} />
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">{pick(c.outBody, locale)}</p>
            </div>
          </div>

          <Boundary label={pick(ENCLAVE.label, locale)} note={pick(ENCLAVE.note, locale)}>
            <ModelBuild mode={mode} locale={locale} />
            <ProcessNetwork locale={locale} />
          </Boundary>
        </>
      ) : null}

      {c.kind === "tenant" ? (
        /* THE REGION BAND wraps everything, because in this mode the outer
           claim is jurisdictional rather than physical: the whole
           deployment sits where the customer said it may sit. */
        <div className="rounded-xl border border-border bg-card px-4 pb-5 pt-6 sm:px-6">
          <p className="mono-label font-bold text-foreground">{pick(c.regionLabel, locale)}</p>
          <p className="mb-5 mt-3 max-w-[62ch] text-[0.8125rem] leading-relaxed text-muted-foreground">
            {pick(c.regionBody, locale)}
          </p>

          {/* Neighbouring tenants: inside the same region, outside the
              tenant boundary, with the path between them cut. */}
          <Box emphasis="excluded" label={pick(c.neighbours, locale)} />
          <FlowBlocked direction="down" label={pick(c.neighbours, locale)} />

          {/* THE DEFINED CONDUITS. One column per integration, each with
              its own inbound arrow, so "four named one-directional reads"
              is what the picture actually shows — rather than one generic
              arrow labelled "integrations". */}
          <div className="mt-5 rounded-lg border border-border bg-background px-5 py-4">
            <p className="mono-label font-bold text-primary-ink">{pick(c.conduitsLabel, locale)}</p>
            <ul className="mt-4 grid list-none grid-cols-2 gap-x-4 gap-y-3 p-0 lg:grid-cols-4">
              {c.conduits.map((conduit) => (
                <li key={conduit.en} className="flex flex-col items-center gap-1 text-center">
                  <span className="mono-label rounded border border-border bg-card px-2 py-1 text-foreground">
                    {pick(conduit, locale)}
                  </span>
                  <svg aria-hidden="true" viewBox="0 0 14 28" className="h-7 w-3.5 text-primary">
                    <line x1="7" y1="0" x2="7" y2="19" stroke="currentColor" strokeWidth="1.75" />
                    <polygon points="7,27 2,18 12,18" fill="currentColor" />
                  </svg>
                </li>
              ))}
            </ul>
            <p className="mt-3 max-w-[62ch] text-[0.8125rem] leading-relaxed text-muted-foreground">
              {pick(c.conduitNote, locale)}
            </p>
          </div>

          <div className="mt-5">
            <Boundary label={pick(ENCLAVE.label, locale)} note={pick(ENCLAVE.note, locale)}>
              <ModelBuild mode={mode} locale={locale} />
              <ProcessNetwork locale={locale} />
            </Boundary>
          </div>
        </div>
      ) : null}

      <FigureNote>
        {pick(mode.textEquivalent, locale)} {figureNote}
      </FigureNote>
    </figure>
  );
}
