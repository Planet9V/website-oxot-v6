import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";

/**
 * THE PAGE'S RECURRING SIGNATURE — a survey datum rule, and the three section
 * headers bound to it.
 *
 * The datum is kept from iteration 1 deliberately. It is the correct sector
 * idiom — a water treatment works is designed against a long section in which
 * grade falls through every treatment barrier and is put back by pumping, and
 * this is that drawing's reference rule — and it is NOT what scored `-1` a
 * 5/10. What did score badly was applying ONE section recipe (datum → h2 →
 * lead → `mt-10` content) to all nine body sections, then repeating a mono-index
 * + hanging-term motif in six different places, so the page read as one recipe
 * regardless of content.
 *
 * The fix is in the BODY treatments, not in multiplying header recipes.
 * Inventing a new heading style per section to look varied is the ungrounded
 * variation the QA Checklist's Consistency category names as the opposite
 * failure. So there are exactly three body-section header recipes, each bound
 * to a content SHAPE rather than to a section number — which is what makes them
 * falsifiable: any other section with the same shape would get the same header.
 *
 *   H-A  `SectionA`  datum + full-width h2 + lead
 *                    → S02, S03, S04, S05, S06, S09 — every section whose body
 *                      is a diagram or an interactive.
 *   H-B  `SectionB`  datum + h2 in a 7-col beside a cited-evidence panel in a
 *                    5-col
 *                    → S01 ONLY, because that section's load-bearing claim IS
 *                      an external cited finding. No other section on this page
 *                      has that shape.
 *   H-C  `SectionC`  datum + h2 + lead + table caption
 *                    → S08 ONLY, the reference-matrix shape.
 *
 * H-D — the closing datum above a framed block — lives in `IntakeCta.tsx`,
 * because it terminates the run rather than opening a section.
 *
 * TOKEN DISCIPLINE, DELIBERATE: the rule and its ticks use `--border`, and the
 * stage index uses `--primary-ink` (the colour `.oxot-kicker` already uses
 * site-wide). No `--signal-*` token appears here. The six signals mean model
 * state, and spending one on a page divider would repurpose a semantic token as
 * decoration. Signals appear on this page only inside diagrams.
 *
 * No elevation, chainage or station number is printed anywhere. The source
 * states none. The index is the section's ordinal on the page, which is a real
 * fact about the page rather than a survey measurement.
 */

export interface DatumProps {
  /** Section ordinal, e.g. "02". A real fact about the page, not survey data. */
  index: string;
  /** Short section name sitting on the rule. */
  label: Bilingual;
  locale: Locale;
  className?: string;
}

export function Datum({ index, label, locale, className }: DatumProps) {
  return (
    <div className={cn("relative select-none", className)} aria-hidden="true">
      {/* Ticks are a repeating gradient rather than 30 DOM nodes — same
          crispness, one element. */}
      <div className="flex items-end gap-3">
        <span className="mono-label shrink-0 text-primary-ink">{index}</span>
        <span className="mono-label shrink-0 text-muted-foreground">{pick(label, locale)}</span>
        <span
          className="h-2.5 min-w-0 flex-1 border-b border-border"
          style={{
            backgroundImage: "repeating-linear-gradient(to right, hsl(var(--border)) 0 1px, transparent 1px 32px)",
            backgroundPosition: "bottom",
            backgroundSize: "100% 5px",
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

/** Datum + full-width h2 + lead. For sections whose body is a diagram or an
 *  interactive: the header gets out of the way and the mechanism carries the
 *  section. */
export function SectionA({ id, index, datumLabel, heading, lead, locale, className, children }: SectionAProps) {
  return (
    <SectionShell id={id} index={index} datumLabel={datumLabel} locale={locale} className={className}>
      {/* FULL-WIDTH, as this recipe's own name says (H-A) — `max-w-3xl` was
          here until 2026-08-25, directly contradicting that. It capped every
          H-A heading (6 of this page's 9 body sections) at 768px regardless
          of viewport, while the diagram/interactive content right below it
          filled the section's real width — so the heading read as narrower
          and left-hugging next to its own body on any screen wider than
          ~768px. Caught by the site owner's own visual review, not by
          `measure.mjs` (which checks overflow — content wider than its
          container — never under-width, a heading narrower than expected).
          `text-balance` alone is still enough to keep long headings from
          stretching into a single ungainly line. */}
      <h2 id={`${id}-h`} className="h-section mt-10 text-balance">
        {pick(heading, locale)}
      </h2>
      {/* No `prose-measure` here either (found 2026-08-25 by measure.mjs's new
          automated check, right after the h2 fix above): the lead sits under
          a FULL-WIDTH heading in a full-width section, so a 68ch cap on it is
          the exact same "narrow island, dead space beside it" bug as the
          heading had — the h2 fix alone didn't catch it because it only
          checked the heading, not what's under it. */}
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
  /** Shared by both marked panes, so the QA harness reads real content height
   *  rather than the stretched grid cell. */
  balanceGroup: string;
}

/**
 * Datum + h2 in a 7-col beside a cited-evidence panel in a 5-col.
 *
 * BOTH PANES ARE MARKED FOR THE BALANCE HARNESS, and the mark goes on the inner
 * content wrapper, never on the grid cell. The row is `items-stretch` by
 * default, so the two grid CELLS are equal by construction — measuring those
 * would let a nearly-empty panel pass. The wrappers below size to their content.
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
      {/* Same 2026-08-25 fix as SectionA and SectionC — H-B was missed in that
          pass. The h2 was nested inside the 7-col narrative pane AND capped at
          `max-w-2xl`, so it wrapped into the left half of the page while the
          body it titles ran the full width. A section title names the whole
          section, so it spans the full width and aligns with the body text.

          It is no longer a `data-balance-item`: the balance group compares the
          two side-by-side panes, and a full-width heading above them is not a
          member of either.

          NO `text-balance` HERE, deliberately. Balancing evens the line lengths,
          which on this 1216px container capped the widest line at 674px — 55% of
          the measure — so the title still read as a left-hand column even after
          it was hoisted out of the 7-col. Measured at 1440w: balanced 674px vs
          unbalanced 1194px against a 1322px body right edge. Long section titles
          span; SectionA/SectionC keep `text-balance` because their headings are
          short enough that balancing costs them no width.

          It must be `[text-wrap:wrap]` and not merely the absence of
          `text-balance`: globals.css:352 sets `text-wrap: balance` on ALL of
          h1–h6, so dropping the utility class alone changes nothing. This
          overrides that global for this one heading. */}
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

/** Datum + h2 + lead + table caption. The reference-matrix shape: the caption
 *  names what the matrix below is, which a bare lead does not. */
export function SectionC({ id, index, datumLabel, heading, lead, caption, locale, className, children }: SectionCProps) {
  return (
    <SectionShell id={id} index={index} datumLabel={datumLabel} locale={locale} className={className}>
      {/* Same 2026-08-25 fix as SectionA's h2 — see that recipe's comment.
          `max-w-3xl` capped this heading well short of the table below it. */}
      <h2 id={`${id}-h`} className="h-section mt-10 text-balance">
        {pick(heading, locale)}
      </h2>
      {/* No `prose-measure` — same fix as SectionA's lead, same reason. */}
      <p className="mt-5 body-lead leading-relaxed text-muted-foreground">{pick(lead, locale)}</p>
      <p className="mono-label mt-10 text-primary-ink">{pick(caption, locale)}</p>
      <div className="mt-4">{children}</div>
    </SectionShell>
  );
}
