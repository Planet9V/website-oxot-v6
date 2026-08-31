import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";

/**
 * THE PAGE'S RECURRING SIGNATURE — an A/B path pair joined by a cross-tie, and
 * the section headers bound to it.
 *
 * THE DATUM IDIOM IS THE SECTOR'S OWN DRAWING, AND THIS BRIEF'S OWN MOST-REPEATED
 * CONCEPT. `industry_hyperscale.md` names A/B redundancy and the common-mode
 * dependency that bridges it eight times:
 *   L116  what is redundant     — "A/B power paths, N+1 cooling"
 *   L125  the challenge itself  — "a hidden common-mode dependency across
 *                                  redundant paths"
 *   L225  energy dependency     — "Shared electrical-control platforms that may
 *                                  create common-mode failure across A/B paths"
 *   L290  scenarios headline    — "Test the common-mode failure before it
 *                                  consumes redundancy."
 *   L299  a scenario's outcome  — "A/B common-mode exposure"
 *   L317  fix-first language    — "A/B-path dependency"
 *   L347  worked-example inputs — "N+1 / 2N redundancy design"
 *   L408  case-study artifact   — "A/B power-path map with shared dependencies
 *                                  highlighted"
 *   L484  campus-twin output    — "A/B common-mode analysis"
 * So the rule is two thin parallel runs with one short cross-tie standing
 * between them: what a 2N / A-B distribution looks like drawn, and what this
 * entire page argues the risk is — two independent paths, one shared element
 * bridging them.
 *
 * IT IS DELIBERATELY NONE OF THE THREE SIBLINGS' IDIOMS, and the distinction is
 * structural rather than stylistic. Energy is a SINGLE conductor with tap-offs
 * (an electrical one-line). Manufacturing is a SINGLE heavy process line with an
 * instrument bubble (ISA-5.1 weight pair). Rail is a SINGLE discontinuous rail
 * with block joints and a signal head. Hyperscale is the only one of the four
 * that is TWO runs, and the tie is the only element in any of them that means
 * "shared".
 *
 * HEADER RECIPES ARE BOUND TO CONTENT SHAPE, NOT TO SECTION NUMBER. That
 * binding is what makes them falsifiable: any other section with the same shape
 * gets the same header, and a section that changes shape changes header.
 * Inventing a heading style per section so the page "looks varied" is the
 * ungrounded variation `OXOT_Layout_Styles.md` names as the opposite failure —
 * variation belongs in the BODY treatments.
 *
 *   H-A  `SectionA`  path pair + full-width h2 + optional lead
 *                    → the page's default, and every section whose body is a
 *                      diagram, matrix, register, bento or interactive: the
 *                      interactive model, facility architecture, the technology
 *                      index, the asset classes, the dependency map, the scenario
 *                      register, the four decisions, the worked example, the
 *                      case-study programme, product capabilities, and
 *                      engagement.
 *   H-B  `SectionB`  path pair + h2 + narrative pane beside a cited-evidence
 *                    panel
 *                    → Sector reality ONLY. Its load-bearing claim rests on a
 *                      genuine outside instrument rather than on OXOT's own
 *                      framing: the EU Energy Efficiency Directive's annual
 *                      energy-performance reporting duty for sites at or above
 *                      500 kW installed IT power demand (L119, carrying a live
 *                      energy.ec.europa source link). No other BODY section on
 *                      this page stands on an outside instrument that way.
 *   H-C  `SectionC`  path pair + h2 + lead + a mono-label table caption
 *                    → Regulatory, assurance and sustainability context ONLY,
 *                      the reference-matrix shape (L460–L469): an eight-framework
 *                      matrix whose three columns have to be named in words
 *                      before the matrix can be read. Its lead slot carries
 *                      L458's no-automatic-compliance guardrail at full body
 *                      size, above the caption — that guardrail is a condition on
 *                      how the whole matrix must be read, not a footnote.
 *   H-D  no wrapper  the closing pair above a framed block. It terminates the
 *                    run rather than opening a section, so it lives inside the
 *                    final CTA + intake file and consumes the exported `Datum`
 *                    directly. Exporting a fourth section shell for a single
 *                    non-section caller would be a wrapper with no shape of its
 *                    own.
 *
 * TOKEN DISCIPLINE, BINDING: the two runs and the cross-tie use `--border` and
 * `--primary-ink` only. No `--signal-*` token appears in this file. The six
 * signals mean model/decision state; this is page chrome, and spending a
 * semantic token on a divider would repurpose it as decoration. The tie takes
 * the one accent, as manufacturing accents its tap point and energy its junction
 * node — the shared element is the moment worth marking on this page.
 *
 * No annotation is printed anywhere: no bus ID, no voltage, no "A"/"B" letter,
 * no tier rating, no MW figure, no hall name. The source states none of these
 * for any specific facility, and an electrical-drawing annotation invented to
 * look authentic would be a fabricated engineering fact. The index is the
 * section's ordinal on the page, which is a real fact about the page.
 */

export interface DatumProps {
  /** Section ordinal, e.g. "02". A real fact about the page, not facility data. */
  index: string;
  /** Short section name sitting at the head of the pair. */
  label: Bilingual;
  locale: Locale;
  className?: string;
}

/** A 10px box carrying path A on its top edge and path B on its bottom edge.
 *  One gradient rather than two elements, so the two runs cannot drift apart. */
const A_B_RUNS = {
  backgroundImage:
    "linear-gradient(to bottom, hsl(var(--border)) 0 1px, transparent 1px 9px, hsl(var(--border)) 9px 10px)"
};

/**
 * Two parallel path runs with a cross-tie standing between them.
 *
 * The tie is an SVG so its junction with both runs lands on exact device pixels:
 * the viewBox is twice the rendered size, so a `2` stroke resolves to 1 device
 * px and meets the 1px CSS runs either side of it.
 */
export function Datum({ index, label, locale, className }: DatumProps) {
  return (
    <div className={cn("relative select-none", className)} aria-hidden="true">
      <div className="flex items-end gap-3">
        <span className="mono-label shrink-0 text-primary-ink">{index}</span>
        <span className="mono-label shrink-0 text-muted-foreground">{pick(label, locale)}</span>
        {/* Both paths begin. */}
        <span className="h-2.5 w-8 shrink-0" style={A_B_RUNS} />
        <svg viewBox="0 0 16 20" className="h-2.5 w-2 shrink-0" focusable="false">
          {/* The two runs continuing behind the tie, so the pair reads as
              unbroken rather than interrupted by its own shared element. */}
          <path d="M0,1 H16" stroke="hsl(var(--border))" strokeWidth={2} fill="none" />
          <path d="M0,19 H16" stroke="hsl(var(--border))" strokeWidth={2} fill="none" />
          {/* The cross-tie carries the one accent: on this page the shared
              element bridging two independent paths is the whole argument. */}
          <path d="M8,1 V19" stroke="hsl(var(--primary-ink))" strokeWidth={2} fill="none" />
        </svg>
        {/* Both paths run on. */}
        <span className="h-2.5 min-w-0 flex-1" style={A_B_RUNS} />
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
 * Path pair + full-width h2 + optional lead. For sections whose body is a
 * diagram, a matrix, a register, a bento or an interactive: the header gets out
 * of the way and the mechanism carries the section.
 *
 * FULL-WIDTH means no `max-w-*` on the h2 and no `prose-measure` on the lead. A
 * capped heading above a full-width body reads as a narrow left-hugging column
 * with dead space beside it, and the same cap on the lead is the same bug one
 * element lower. `text-balance` alone keeps a long heading from stretching into
 * one ungainly line. This page carries wide four-column registers and a
 * seven-tier stack under most H-A headers, so a measure cap would misalign the
 * header against its own body.
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
 * Path pair + h2 + a narrative pane beside a cited-evidence panel.
 *
 * The h2 is full-width ABOVE the split, not nested in the 7-col: a section title
 * names the whole section, so it spans the whole section and aligns with the
 * body's left edge.
 *
 * NO `text-balance` on this heading. Balancing evens line lengths, which on a
 * ~1216px container caps the widest line near half the measure — so a long title
 * still reads as a left-hand column even after it is hoisted out of the 7-col.
 * It must be `[text-wrap:wrap]` rather than merely omitting the utility:
 * globals.css sets `text-wrap: balance` on all of h1–h6, so dropping the class
 * changes nothing on its own. SectionA and SectionC keep `text-balance` because
 * their headings are short enough that balancing costs them no width. Sector
 * reality's is not — its headline is a two-clause sentence carrying an em-dash
 * correction (L108).
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

/** Path pair + h2 + lead + table caption. The reference-matrix shape: the
 *  caption names what the matrix below is and what its columns mean — here, that
 *  each row states a framework, why it reaches a hyperscale operator, and what
 *  the Twin contributes to the work — which a lead written as prose does not.
 *  The LEAD carries L458's guardrail that no compliance, certification or
 *  assurance outcome is promised; that is a condition on reading every row, so
 *  it sits above the caption at body size rather than under the matrix as a
 *  footnote. Same full-width rule as SectionA. */
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
