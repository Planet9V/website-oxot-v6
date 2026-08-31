import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";

/**
 * THE PAGE'S RECURRING SIGNATURE — a signalled block run, and the section
 * headers bound to it.
 *
 * THE DATUM IDIOM IS THE SECTOR'S OWN DRAWING. `industry_rail-transportation.md`
 * names the interlocking / signalling-block diagram four times, and every time
 * it is the artifact the visitor is asked to bring, the evidence the Twin is
 * built from, or the system the visitor is asked to name:
 *   L30   secondary conversion — "Bring one interlocking diagram, signaling
 *         architecture, PTC map, or asset list"
 *   L259  worked-example inputs — "Signaling block / interlocking diagrams"
 *   L402  final CTA — "Bring a signaling architecture, interlocking diagram,
 *         PTC map, SCADA topology, or asset list"
 *   L423  intake systems-of-interest field — "Interlocking / wayside signaling"
 * So the rule is a running rail broken into fixed blocks at block joints, with
 * a signal standing at the head of the run: the way a signalling block diagram
 * draws track occupancy and movement authority. The spec's own architecture
 * stack names the same vocabulary directly — "axle counters • track circuits"
 * (L127) and "track occupancy detection" (L143).
 *
 * It is NOT the energy page's single-line-diagram route — a continuous
 * conductor with tap-offs dropping off it opens at a junction node, and neither
 * a bus nor a tap-off appears anywhere in this source. The rail line is
 * DISCONTINUOUS by design: the block is the safety unit, and the drawing has to
 * show the boundary, not a feed.
 *
 * HEADER RECIPES ARE BOUND TO CONTENT SHAPE, NOT TO SECTION NUMBER. That
 * binding is what makes them falsifiable: any other section with the same shape
 * gets the same header. Inventing a heading style per section so the page
 * "looks varied" is the ungrounded variation `OXOT_Layout_Styles.md` names as
 * the opposite failure — variation belongs in the BODY treatments.
 *
 *   H-A  `SectionA`  block run + full-width h2 + optional lead
 *                    → the page's default, and every section whose body is a
 *                      diagram, a card matrix, a table or an interactive:
 *                      Architecture, both segment-scenario sections, the
 *                      Decision Ledger, both worked examples (passenger
 *                      signalling-vendor access and freight PTC/dispatch),
 *                      Product capabilities, and Engagement approach.
 *   H-B  `SectionB`  block run + h2 + narrative pane beside a cited-evidence
 *                    panel
 *                    → S01, Sector reality, ONLY. Its load-bearing claim rests
 *                      on genuine outside instruments rather than on OXOT's own
 *                      framing: NIS2 Annex I names rail infrastructure managers
 *                      and railway undertakings as high-criticality entities
 *                      (L9, restated L375), and TSA's rail cybersecurity
 *                      directives bind covered US passenger and freight
 *                      carriers (L9, L345, L384 — the last two carrying a live
 *                      tsa.gov source link). No other section on this page has
 *                      a claim standing on an outside instrument that way.
 *   H-C  `SectionC`  block run + h2 + lead + a mono-label table caption
 *                    → S11, Regulatory and standards context, ONLY. The
 *                      reference-matrix shape (L371–L380): an eight-framework
 *                      matrix split passenger/EU vs US freight, where the
 *                      caption has to name what the columns mean before the
 *                      matrix can be read.
 *   H-D  no wrapper  the closing run above a framed block. It terminates the
 *                    run rather than opening a section, so it lives inside the
 *                    final CTA + intake file and consumes the exported `Datum`
 *                    directly. Exporting a fourth section shell for a single
 *                    non-section caller would be a wrapper with no shape of its
 *                    own.
 *
 * TOKEN DISCIPLINE, BINDING: the rail, its block joints and the signal use
 * `--border` and `--primary-ink` only. No `--signal-*` token appears in this
 * file. The six signals mean model/decision state; this is page chrome, and
 * spending a semantic token on a divider would repurpose it as decoration. The
 * collision of names is a trap here specifically — a railway signal is not an
 * OXOT signal token, and `--signal-*` must not be reached for just because the
 * idiom happens to be a signal.
 *
 * The signal head is drawn unlit. No aspect, no train number, no headway
 * figure, no subdivision name, no territory ID is printed anywhere. The source
 * states none, and a rail-operations annotation invented to look authentic
 * would be a fabricated engineering fact — a displayed aspect in particular
 * would assert a movement authority that does not exist. The index is the
 * section's ordinal on the page, which is a real fact about the page.
 */

export interface DatumProps {
  /** Section ordinal, e.g. "02". A real fact about the page, not track data. */
  index: string;
  /** Short section name sitting at the head of the run. */
  label: Bilingual;
  locale: Locale;
  className?: string;
}

/** One block cycle, in px: rail segment, then the gap holding the block joint. */
const BLOCK = 120;

/**
 * A signalling block run: signal at the head → rail divided into fixed blocks
 * by block joints.
 *
 * The blocks are two stacked repeating gradients rather than ~20 DOM nodes —
 * same crispness at one element, and they re-space themselves with the
 * container instead of needing a hard-coded block count. Layer 1 is the running
 * rail, broken at each block boundary; layer 2 is the joint mark standing
 * across the break.
 */
export function Datum({ index, label, locale, className }: DatumProps) {
  return (
    <div className={cn("relative select-none", className)} aria-hidden="true">
      <div className="flex items-end gap-3">
        <span className="mono-label shrink-0 text-primary-ink">{index}</span>
        <span className="mono-label shrink-0 text-muted-foreground">{pick(label, locale)}</span>
        {/* Signal at the head of the run — head unlit, mast planted on the rail.
            `mb-[5px]` drops the mast base onto the rail's centreline, which sits
            5px above the run's baseline. */}
        <span className="mb-[5px] flex shrink-0 flex-col items-center">
          <span className="h-[5px] w-[5px] rounded-full border border-primary-ink" />
          <span className="h-[7px] w-px bg-border" />
        </span>
        <span
          className="h-2.5 min-w-0 flex-1"
          style={{
            backgroundImage: [
              // Rail — runs, then breaks at the block boundary.
              `repeating-linear-gradient(to right, hsl(var(--border)) 0 ${BLOCK - 10}px, transparent ${BLOCK - 10}px ${BLOCK}px)`,
              // Block joint — a stroke standing across the break.
              `repeating-linear-gradient(to right, transparent 0 ${BLOCK - 6}px, hsl(var(--border)) ${BLOCK - 6}px ${BLOCK - 5}px, transparent ${BLOCK - 5}px ${BLOCK}px)`
            ].join(", "),
            backgroundSize: "100% 1px, 100% 9px",
            backgroundPosition: "center, center",
            backgroundRepeat: "repeat-x, repeat-x"
          }}
        />
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
 * Block run + full-width h2 + optional lead. For sections whose body is a
 * diagram, a card matrix, a comparison table or an interactive: the header gets
 * out of the way and the mechanism carries the section.
 *
 * FULL-WIDTH means no `max-w-*` on the h2 and no `prose-measure` on the lead.
 * A capped heading above a full-width body reads as a narrow left-hugging
 * column with dead space beside it, and the same cap on the lead is the same
 * bug one element lower. `text-balance` alone keeps a long heading from
 * stretching into one ungainly line. This page carries wide passenger-vs-freight
 * comparison tables under most H-A headers, so a measure cap would misalign the
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
 * Block run + h2 + a narrative pane beside a cited-evidence panel.
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
 * their headings are short enough that balancing costs them no width. S01's is
 * not — its headline is a three-clause sentence (L79).
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

/** Block run + h2 + lead + table caption. The reference-matrix shape: the
 *  caption names what the matrix below is and what its columns mean — here, that
 *  each row is read twice, once for passenger/European rail and once for US
 *  freight — which a lead written as prose does not. Same full-width rule as
 *  SectionA. */
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
