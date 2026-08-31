import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";

/**
 * THE PAGE'S RECURRING SIGNATURE — a single-line-diagram route, and the section
 * headers bound to it.
 *
 * THE DATUM IDIOM IS THE SECTOR'S OWN DRAWING. `industry_energy.md` names the
 * single-line diagram four times, and every time it is the artifact the visitor
 * is asked to bring or the evidence the Twin is built from:
 *   L26   secondary conversion — "Bring one single-line diagram, P&ID, or asset list"
 *   L122  engineering evidence — "Single-line diagrams, P&IDs, protection studies…"
 *   L193  worked-example inputs — "P&IDs / single-line diagrams"
 *   L297  final CTA — "Bring a single-line diagram, P&ID, asset list…"
 * So the rule is a conductor run with tap-offs dropping from it, opening at a
 * junction node: the way an SLD draws a bus feeding devices. It is NOT a survey
 * long-section rule — that idiom belongs to a treatment works designed against
 * falling grade, and there is no such artifact anywhere in this source.
 *
 * HEADER RECIPES ARE BOUND TO CONTENT SHAPE, NOT TO SECTION NUMBER. That
 * binding is what makes them falsifiable: any other section with the same shape
 * gets the same header. Inventing a heading style per section so the page
 * "looks varied" is the ungrounded variation `OXOT_Layout_Styles.md` names as
 * the opposite failure — variation belongs in the BODY treatments.
 *
 *   H-A  `SectionA`  route + full-width h2 + optional lead
 *                    → S02, S04, S05, S06, S07, S09 — every section whose body
 *                      is a diagram, a card matrix or an interactive — plus
 *                      S03, which uses the bare `Datum` only.
 *   H-B  `SectionB`  route + h2 + narrative pane beside a cited-evidence panel
 *                    → S01 ONLY. Its load-bearing claim is a genuine external
 *                      citation — the EU Electricity Cybersecurity Network Code,
 *                      Commission Delegated Regulation (EU) 2024/1366, cited at
 *                      L74 and L277 — and no other section on this page has a
 *                      claim standing on an outside instrument that way.
 *   H-C  `SectionC`  route + h2 + lead + a mono-label table caption
 *                    → S08 ONLY, the reference-matrix shape (L267–L275).
 *   H-D  no wrapper  the closing route above a framed block. It terminates the
 *                    run rather than opening a section, so it lives inside
 *                    `IntakeCta.tsx` and consumes the exported `Datum` directly.
 *                    Exporting a fourth section shell for a single non-section
 *                    caller would be a wrapper with no shape of its own.
 *
 * TOKEN DISCIPLINE, BINDING: the conductor, its tap-offs and the junction node
 * use `--border` and `--primary-ink` only. No `--signal-*` token appears in this
 * file. The six signals mean model/decision state; this is page chrome, and
 * spending a semantic token on a divider would repurpose it as decoration.
 *
 * No voltage, bus number, feeder ID or breaker state is printed anywhere. The
 * source states none, and an SLD annotation invented to look authentic would be
 * a fabricated engineering fact. The index is the section's ordinal on the page,
 * which is a real fact about the page.
 */

export interface DatumProps {
  /** Section ordinal, e.g. "02". A real fact about the page, not grid data. */
  index: string;
  /** Short section name sitting at the head of the route. */
  label: Bilingual;
  locale: Locale;
  className?: string;
}

/**
 * A single-line-diagram route: junction node → conductor run → tap-offs.
 *
 * The tap-offs are a repeating gradient rather than ~30 DOM nodes — same
 * crispness at one element, and they re-space themselves with the container
 * instead of needing a hard-coded count.
 */
export function Datum({ index, label, locale, className }: DatumProps) {
  return (
    <div className={cn("relative select-none", className)} aria-hidden="true">
      <div className="flex items-end gap-3">
        <span className="mono-label shrink-0 text-primary-ink">{index}</span>
        <span className="mono-label shrink-0 text-muted-foreground">{pick(label, locale)}</span>
        {/* Junction node — where the run originates. */}
        <span className="mb-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-primary-ink" />
        <span
          className="h-2.5 min-w-0 flex-1 border-t border-border"
          style={{
            backgroundImage: "repeating-linear-gradient(to right, hsl(var(--border)) 0 1px, transparent 1px 32px)",
            backgroundPosition: "top",
            backgroundSize: "100% 6px",
            backgroundRepeat: "repeat-x"
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
 * Route + full-width h2 + optional lead. For sections whose body is a diagram,
 * a card matrix or an interactive: the header gets out of the way and the
 * mechanism carries the section.
 *
 * FULL-WIDTH means no `max-w-*` on the h2 and no `prose-measure` on the lead.
 * A capped heading above a full-width body reads as a narrow left-hugging
 * column with dead space beside it, and the same cap on the lead is the same
 * bug one element lower. `text-balance` alone keeps a long heading from
 * stretching into one ungainly line. This page has no narrower-column context
 * anywhere that would justify a measure cap here.
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
 * Route + h2 + a narrative pane beside a cited-evidence panel.
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

/** Route + h2 + lead + table caption. The reference-matrix shape: the caption
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
