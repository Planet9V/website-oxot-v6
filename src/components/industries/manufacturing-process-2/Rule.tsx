import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { InstrumentBubble } from "@/components/twin/pid-symbols";
import { cn } from "@/lib/utils";

/**
 * THE PAGE'S RECURRING SIGNATURE — a P&ID process line, and the section headers
 * bound to it.
 *
 * THE DATUM IDIOM IS THE SECTOR'S OWN DRAWING. `industry_manu-process.md` names
 * the P&ID six times, and every time it is the artifact the visitor is asked to
 * bring or the evidence the Twin is built from:
 *   L28   secondary conversion  — "Bring one P&ID and asset list"
 *   L46   hero visual           — "P&ID / process equipment"
 *   L136  engineering evidence  — "P&IDs, line lists, equipment data, FMECA…"
 *   L197  worked-example inputs — "P&ID / process diagram"
 *   L290  final CTA             — "Bring a P&ID, an asset list, and a change…"
 *   L311  intake form field     — "Do you have a P&ID and asset list available?"
 * So the rule is a process line with an instrument bubble tapping it: the way a
 * P&ID draws a measurement taken off a running line. It is NOT the bus-and-
 * tap-off single-line diagram that carries the energy page — an SLD is an
 * electrical one-line, and this source never asks for one.
 *
 * THE GLYPH IS SOURCED, NOT REDRAWN. The bubble is `InstrumentBubble` from
 * `components/twin/pid-symbols.tsx`, whose geometry came from draw.io's
 * Apache-2.0 `stencils/pid` set. Hand-drawing a second circle here would fork
 * the repo's P&ID vocabulary for no gain.
 *
 * ISA-5.1 LINE WEIGHTS ARE THE DISTINCTION, not decoration: the process line is
 * drawn heavier than the instrument connection running down to it, which is how
 * a P&ID separates what carries product from what carries a signal. That weight
 * pair is also what keeps this rule legible as a different drawing from the
 * energy page's uniformly thin conductor.
 *
 * HEADER RECIPES ARE BOUND TO CONTENT SHAPE, NOT TO SECTION NUMBER. That
 * binding is what makes them falsifiable: any other section with the same shape
 * gets the same header, and a section that changes shape changes header.
 *
 *   H-A  `SectionA`  line + full-width h2 + optional lead
 *                    → the page's ordinary case: Architecture, Risk scenarios,
 *                      Four decisions, Worked use case, Capabilities,
 *                      Engagement — every section whose body is a diagram, a
 *                      card matrix or an interactive.
 *   H-B  `SectionB`  line + h2 + narrative pane beside a cited-evidence panel
 *                    → Operational reality ONLY. Its load-bearing claim rests
 *                      on genuine external instruments — IEC 62443 for IACS
 *                      constraints and IEC 61511 for safety-instrumented
 *                      systems, cited at L87 — and no other section on this
 *                      page stands on an outside instrument that way.
 *   H-C  `SectionC`  line + h2 + lead + a mono-label table caption
 *                    → Regulatory ONLY, the reference-matrix shape (L271–L278).
 *   H-D  no wrapper  the closing line above a framed block. It terminates the
 *                    run rather than opening a section, so it lives in the
 *                    final-CTA file and consumes the exported `Datum` directly.
 *                    Exporting a fourth shell for a single non-section caller
 *                    would be a wrapper with no shape of its own.
 *
 * TOKEN DISCIPLINE, BINDING: the process line, the instrument lead, the bubble
 * and the tap point use `--border` and `--primary-ink` only. No `--signal-*`
 * token appears in this file. The signals mean model/decision state; this is
 * page chrome, and spending a semantic token on a divider would repurpose it as
 * decoration. `InstrumentBubble` hard-codes `--muted-foreground`, so the wrapping
 * `<g>` restates stroke colour and width in CSS rather than forking the shared
 * symbol — using DESCENDANT variants (`[&_ellipse]:…`), which is the only form
 * that works. A presentation attribute loses to a CSS rule matching the SAME
 * element but beats a value INHERITED from an ancestor, so the plain
 * `stroke-border stroke-2` this file shipped until 2026-08-26 was inert and the
 * token discipline stated above was violated in render. See the comment at the
 * `<g>` itself.
 *
 * No tag number, line number or stream label is printed anywhere. The source
 * states none, and a P&ID annotation invented to look authentic would be a
 * fabricated engineering fact. The index is the section's ordinal on the page,
 * which is a real fact about the page.
 */

export interface DatumProps {
  /** Section ordinal, e.g. "02". A real fact about the page, not process data. */
  index: string;
  /** Short section name sitting at the head of the line. */
  label: Bilingual;
  locale: Locale;
  className?: string;
}

/**
 * A P&ID process line: heavy line → instrument connection → bubble.
 *
 * The SVG carries its own span of process line at the bottom so the run reads
 * as continuous behind the instrument rather than broken by it. Its viewBox is
 * twice the rendered size, so a `2` stroke lands on exactly 1 device pixel and
 * the `4` process stroke on 2 — matching the CSS segments either side, which
 * are `h-0.5`.
 */
export function Datum({ index, label, locale, className }: DatumProps) {
  return (
    <div className={cn("relative select-none", className)} aria-hidden="true">
      <div className="flex items-end gap-3">
        <span className="mono-label shrink-0 text-primary-ink">{index}</span>
        <span className="mono-label shrink-0 text-muted-foreground">{pick(label, locale)}</span>
        {/* Process line begins. */}
        <span className="mb-2 h-0.5 w-8 shrink-0 bg-border" />
        {/* VIEWBOX IS 52 TALL, NOT 48, AND THAT IS LOAD-BEARING. The tap point is
            centred ON the process line at y=46, so it spans 42–50; at a viewBox
            height of 48 an SVG root (which clips at its viewBox by default) cut
            the bottom 2 units — 25% of the mark — so the tap rendered as a
            flat-bottomed dome rather than a circle, on all 9 section headers,
            silently, with no error and no layout overflow. Found by adversarial
            QA 2026-08-27, after an earlier visual check at low magnification
            passed it.

            THE THREE NUMBERS MOVE TOGETHER and must stay in step: 52 units at
            h-[26px] keeps the scale at exactly 0.5, uniform with w-4 over 32;
            and mb-[6px] rather than mb-2 keeps the process line's centre at the
            same absolute position as the flanking h-0.5 segments, which sit at
            mb-2 on a 2px box. Change one without the others and the rule visibly
            steps out of line with the segments either side of it. */}
        <svg viewBox="0 0 32 52" className="mb-[6px] h-[26px] w-4 shrink-0" focusable="false">
          {/* Process line, ISA-5.1 heavy weight — 2 device px. */}
          <path d="M0,46 H32" stroke="hsl(var(--border))" strokeWidth={4} fill="none" />
          {/* Instrument connection down to the line, light weight — 1 device px. */}
          <path d="M16,27 V46" stroke="hsl(var(--border))" strokeWidth={2} fill="none" />
          {/* The override has to REACH THE ELLIPSE. `InstrumentBubble` sets its
              own stroke and width as presentation attributes; those lose to a CSS
              rule matching the SAME element but BEAT a value inherited from an
              ancestor, so `stroke-border stroke-2` sitting on this `<g>` was
              silently inert — verified in-browser, the bubble was computing
              1.3/`--muted-foreground` instead of the 2/`--border` the docblock
              above declares binding. The descendant variants match the ellipse
              itself and therefore win, putting the bubble on `--border` at 1
              device px, the same light weight as the instrument connection it
              terminates. */}
          {/* COLOUR ONLY. The glyph strokes `currentColor`, so a plain text
              class on this wrapper paints it — no descendant variant, no stroke
              override. The old form was
              `[&_ellipse]:stroke-border [&_ellipse]:[stroke-width:2]`, which
              existed solely to defeat a hardcoded `stroke` presentation
              attribute on the child, and would have broken silently the day the
              symbol stopped being an `<ellipse>`.

              WEIGHT IS DELIBERATELY NOT SET HERE. The stencil sits inside a
              scaled `<g>`, so a width authored in this 32-unit cell is
              interpreted in the stencil's LOCAL space and thins by ~4x —
              measured: 1.00 device px became 0.23. The generator owns weight and
              pre-divides by each glyph's scale; move TARGET_STROKE in
              scripts/build-drawio-glyphs.mjs if the weight needs to change. */}
          <g className="text-border">
            <InstrumentBubble />
          </g>
          {/* The tap point carries the one accent. Energy's rule accents where
              its run originates; here the measurement meeting the process is
              the moment worth marking, so the placement differs and the token
              does not. */}
          <circle cx={16} cy={46} r={4} fill="hsl(var(--primary-ink))" />
        </svg>
        {/* Process line runs on. */}
        <span className="mb-2 h-0.5 min-w-0 flex-1 bg-border" />
      </div>
    </div>
  );
}

interface SectionShellProps {
  id: string;
  index: string;
  datumLabel: Bilingual;
  locale: Locale;
  className?: string;
  children: ReactNode;
}

function SectionShell({ id, index, datumLabel, locale, className, children }: SectionShellProps) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={cn("pt-16 sm:pt-24", className)}>
      <Datum index={index} label={datumLabel} locale={locale} />
      {children}
    </section>
  );
}

/* ── H-A ────────────────────────────────────────────────────────────────── */

export interface SectionAProps extends SectionShellProps {
  heading: Bilingual;
  lead?: Bilingual;
}

/**
 * Line + full-width h2 + optional lead. For sections whose body is a diagram, a
 * card matrix or an interactive: the header gets out of the way and the
 * mechanism carries the section.
 *
 * FULL-WIDTH means no `max-w-*` on the h2 and no `prose-measure` on the lead. A
 * capped heading above a full-width body reads as a narrow left-hugging column
 * with dead space beside it, and the same cap on the lead is the same bug one
 * element lower. `text-balance` alone keeps a long heading from stretching into
 * one ungainly line. This page has no narrower-column context anywhere that
 * would justify a measure cap here.
 */
export function SectionA({ id, index, datumLabel, heading, lead, locale, className, children }: SectionAProps) {
  return (
    <SectionShell id={id} index={index} datumLabel={datumLabel} locale={locale} className={className}>
      <h2 id={`${id}-h`} className="h-section mt-10 text-balance">
        {pick(heading, locale)}
      </h2>
      {lead && (
        <p className="mt-5 body-lead leading-relaxed text-muted-foreground">{pick(lead, locale)}</p>
      )}
      <div className="mt-10">{children}</div>
    </SectionShell>
  );
}

/* ── H-B ────────────────────────────────────────────────────────────────── */

export interface SectionBProps extends SectionShellProps {
  heading: Bilingual;
  /** The 7-col pane's prose, sitting under the h2. */
  narrative: ReactNode;
  /** The 5-col cited-evidence panel. */
  evidence: ReactNode;
  /** Shared by both marked panes, so `scripts/measure.mjs` reads real content
   *  height rather than the stretched grid cell. */
  balanceGroup: string;
}

/**
 * Line + h2 + a narrative pane beside a cited-evidence panel.
 *
 * The h2 is full-width ABOVE the split, not nested in the 7-col: a section
 * title names the whole section, so it spans the whole section and aligns with
 * the body's left edge.
 *
 * NO `text-balance` on this heading. Balancing evens line lengths, which on a
 * ~1216px container caps the widest line near half the measure — so a long
 * title still reads as a left-hand column even after it is hoisted out of the
 * 7-col. It must be `[text-wrap:wrap]` rather than merely omitting the utility:
 * globals.css sets `text-wrap: balance` on all of h1–h6, so dropping the class
 * changes nothing on its own. SectionA and SectionC keep `text-balance` because
 * their headings are short enough that balancing costs them no width.
 *
 * BOTH PANES CARRY THE BALANCE MARK, and it goes on the inner content wrapper,
 * never on the grid cell. The row is `items-stretch` by default, so the two
 * CELLS are equal by construction — measuring those would let a nearly-empty
 * panel pass. The wrappers below size to their content.
 */
export function SectionB({
  id,
  index,
  datumLabel,
  heading,
  narrative,
  evidence,
  balanceGroup,
  locale,
  className,
  children
}: SectionBProps) {
  return (
    <SectionShell id={id} index={index} datumLabel={datumLabel} locale={locale} className={className}>
      <h2 id={`${id}-h`} className="h-section mt-10 [text-wrap:wrap]">
        {pick(heading, locale)}
      </h2>
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div data-balance-group={balanceGroup}>{narrative}</div>
        </div>
        <div className="lg:col-span-5">
          <div className="h-full rounded-2xl border border-border bg-muted/40 p-6">
            <div data-balance-group={balanceGroup}>{evidence}</div>
          </div>
        </div>
      </div>
      <div className="mt-12">{children}</div>
    </SectionShell>
  );
}

/* ── H-C ────────────────────────────────────────────────────────────────── */

export interface SectionCProps extends SectionShellProps {
  heading: Bilingual;
  lead: Bilingual;
  caption: Bilingual;
}

/** Line + h2 + lead + table caption. The reference-matrix shape: the caption
 *  names what the matrix below is and what its columns mean, which a lead
 *  written as prose does not. Same full-width rule as SectionA. */
export function SectionC({ id, index, datumLabel, heading, lead, caption, locale, className, children }: SectionCProps) {
  return (
    <SectionShell id={id} index={index} datumLabel={datumLabel} locale={locale} className={className}>
      <h2 id={`${id}-h`} className="h-section mt-10 text-balance">
        {pick(heading, locale)}
      </h2>
      <p className="mt-5 body-lead leading-relaxed text-muted-foreground">{pick(lead, locale)}</p>
      <p className="mono-label mt-10 text-primary-ink">{pick(caption, locale)}</p>
      <div className="mt-4">{children}</div>
    </SectionShell>
  );
}
