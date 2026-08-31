import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";

/**
 * THE PAGE'S RECURRING SIGNATURE — a controlled boundary crossing, and the
 * section headers bound to it.
 *
 * THE DATUM IDIOM IS THE SECTOR'S OWN DRAWING. Defense and government does not
 * hand you a P&ID or a single-line diagram as ITS characteristic artifact — it
 * hands you a BOUNDARY: the line around what you control, and the small number
 * of places something is allowed to cross it. Both sources are saturated with
 * it, and every instance is a boundary or a crossing of one:
 *   CORPUS L96   sovereignty      — "information-sharing boundaries, federation
 *                                    points … controlled cross-domain
 *                                    dependencies"
 *   CORPUS L103  scope            — the page's load-bearing scope boundary
 *   CORPUS L126  architecture     — "IT/OT segmentation … privileged access"
 *   CORPUS L127  architecture     — "External dependencies" as its own tier
 *   CORPUS L173  scenarios        — "Cross-domain access failure": access
 *                                    "crosses a boundary between general
 *                                    administration and restricted/sovereign
 *                                    services", and the consequence is "loss of
 *                                    trust in the isolation boundary"
 *   CORPUS L225  air gap          — Island Mode, "fully isolated"
 *   CORPUS L226  air gap          — a one-way diode: "intelligence flows in;
 *                                    nothing customer-related flows out"
 *   CORPUS L237  air gap caveat   — the boundary is only as good as everything
 *                                    that legitimately crosses it
 *   CORPUS L264  case studies     — "sovereign cloud isolation boundary"
 *   BRIEF  L68   the model chain  — "Supplier / civil infrastructure / external
 *                                    dependency" below the controls layer
 * So the rule is: a solid run leaving the section label, a dashed perimeter
 * standing across it, one marked crossing point where the run meets the
 * perimeter, and the run continuing beyond it AS A DASHED RUN — because what
 * the organization controls ends at the boundary and the dependency does not.
 * That last half is the page's actual argument, drawn: sovereignty is "the
 * ability to decide, operate, recover, and sustain — without an unexamined
 * dependency" (CORPUS L63), and the unexamined part is always on the far side.
 *
 * THE DASHED PERIMETER IS THE SITE'S EXISTING SHAPE LANGUAGE, NOT A NEW ONE.
 * `OXOT_Layout_Styles.md`'s Air-Gapped Deployment Visual is specified as "a
 * literal dashed security-zone perimeter," and Zone Sequencer carries the same
 * dashed zone-outline as its family nod. This rule uses that vocabulary at
 * datum scale on the one page the deployment visual belongs to (Visual
 * Foundation Spec L24 and L213 both route it here).
 *
 * IT IS DELIBERATELY NONE OF THE FOUR SIBLINGS' IDIOMS, and the distinctions
 * are structural rather than stylistic:
 *   · Energy is a single SOLID conductor with tap-offs dropping from it,
 *     opening at a round junction node — an electrical one-line.
 *   · Manufacturing is a single HEAVY process line with an instrument bubble on
 *     a stem — an ISA-5.1 weight pair.
 *   · Rail is a single discontinuous rail broken at equal block joints with a
 *     signal head at the origin.
 *   · Hyperscale is TWO parallel runs bridged by one cross-tie.
 * Defense is the only one whose run CHANGES STATE along its length — solid on
 * one side of a mark, dashed on the other — and the only one carrying a
 * VERTICAL element that crosses the run rather than hanging off it or joining
 * two. No sibling has a perimeter, and none is asymmetric left-to-right.
 *
 * NO CLASSIFICATION MARKING, CAVEAT, OR HANDLING LABEL IS PRINTED ANYWHERE, and
 * none may be added. No "SECRET", no "NOFORN", no "OFFICIAL-SENSITIVE", no
 * banner strip, no colour-coded classification bar. Inventing a real-looking
 * classification marking on a public marketing page would be a fabricated
 * security fact — worse than a fabricated engineering annotation, because the
 * marking system it imitates is a legal one. The live sibling page reached the
 * same conclusion for its own kicker treatment (DefenseStamp.tsx: the visual
 * may echo the convention, the page must never claim the status). This rule
 * goes further and prints no words of its own at all: the index is the
 * section's ordinal on the page, which is a real fact about the page, and the
 * label is the section's own name passed in by its caller.
 *
 * HEADER RECIPES ARE BOUND TO CONTENT SHAPE, NOT TO SECTION NUMBER. That
 * binding is what makes them falsifiable: any other section with the same shape
 * gets the same header, and a section that changes shape changes header.
 * Inventing a heading style per section so the page "looks varied" is the
 * ungrounded variation `OXOT_Layout_Styles.md` names as the opposite failure —
 * variation belongs in the BODY treatments.
 *
 *   H-A  `SectionA`  crossing + full-width h2 + optional lead
 *                    → the page's default, and every section whose body is a
 *                      diagram, a card matrix, a register or an interactive:
 *                      the sovereignty dimensions, the mission-to-infrastructure
 *                      architecture, the scenario register, the four decisions,
 *                      the case-study publication model, product capabilities,
 *                      and the engagement tiers.
 *   H-B  `SectionB`  crossing + h2 + optional lead + A CLAIM-BOUNDARY STRIP
 *                      above the body
 *                    → any section whose content module carries a load-bearing
 *                      claim boundary — a statement the section CANNOT be read
 *                      correctly without. That is a property of the content, so
 *                      it is checkable: the section owns such a string, or it
 *                      does not. On this page five do, and no other page in the
 *                      set has enough of them to need a shell:
 *                        SCOPE.boundary            (what OXOT does NOT model)
 *                        ARCHITECTURE.viewsNote    (synthetic, notional only)
 *                        WORKED_EXAMPLE.tag        (illustrative, no classified
 *                                                   or operational data)
 *                        AIR_GAP.caveat            (air-gapped ≠ risk-free)
 *                        OUTCOME_FALLBACK          (why the 42 combinations
 *                                                   render empty)
 *                      This is why H-B here is NOT the siblings' H-B. On the
 *                      other four pages H-B is a narrative pane beside a cited-
 *                      evidence panel, for the one section standing on an
 *                      outside instrument. This page has no such section: its
 *                      external instruments (NATO guidance, NIS2, CER, IEC
 *                      62443, NIST SP 800-82) all sit inside the regulatory
 *                      matrix, which is H-C. Copying a shell with no tenant and
 *                      leaving the page's five real guardrails to render as
 *                      ordinary paragraphs would be borrowing a shape instead
 *                      of reading this page's content.
 *   H-C  `SectionC`  crossing + h2 + lead + a mono-label table caption
 *                    → the regulatory and assurance matrix ONLY (CORPUS
 *                      L283–L299): a nine-framework table whose three columns
 *                      have to be named in words before the matrix can be read.
 *                      Its lead slot carries the no-automatic-compliance
 *                      guardrail at full body size — that guardrail is a
 *                      condition on how the whole matrix must be read, so it
 *                      sits above the caption rather than inside the strip H-B
 *                      uses.
 *   H-D  no wrapper  the closing crossing above a framed block. It terminates
 *                    the run rather than opening a section, so it lives in the
 *                    final-CTA file and consumes the exported `Datum` directly.
 *                    Exporting a fourth shell for a single non-section caller
 *                    would be a wrapper with no shape of its own.
 *
 * TOKEN DISCIPLINE, BINDING: the run, the perimeter and the crossing mark use
 * `--border` and `--primary-ink` only. No `--signal-*` token appears in this
 * file. The six signals mean model/decision state; this is page chrome, and
 * spending a semantic token on a divider would repurpose it as decoration. The
 * temptation is sharper here than on the sibling pages — a security boundary
 * "wants" to be red, and `--signal-red` means a critical consequence or an
 * unresolved consequential route, which a section divider emphatically is not.
 *
 * NOTHING IN THIS FILE WRAPS A SHARED SVG SYMBOL, and that is deliberate. Every
 * path below is authored here, so no presentation attribute from another
 * component is in play. IF A LATER EDIT REACHES FOR ONE — anything from
 * `components/twin/pid-symbols.tsx`, or any component setting `stroke` /
 * `stroke-width` as PRESENTATION ATTRIBUTES — a `stroke-*` utility on a
 * wrapping `<g>` is SILENTLY INERT: a presentation attribute loses to a CSS
 * rule matching the SAME element but BEATS a value inherited from an ancestor.
 * Use a descendant variant instead (`[&_ellipse]:stroke-border
 * [&_ellipse]:[stroke-width:2]`). That exact bug shipped in
 * `manufacturing-process-2/Rule.tsx` and was fixed on 2026-08-26; it is
 * recorded here so this file never reintroduces it.
 */

export interface DatumProps {
  /** Section ordinal, e.g. "02". A real fact about the page, not zone data. */
  index: string;
  /** Short section name sitting at the head of the run. */
  label: Bilingual;
  locale: Locale;
  className?: string;
}

/**
 * A controlled boundary crossing: solid interior run → dashed perimeter → one
 * marked crossing point → the run continuing dashed, outside.
 *
 * The SVG carries its own span of run at the bottom so the line reads as
 * continuous THROUGH the boundary rather than stopping at it — the boundary is
 * crossed, not a dead end. Its viewBox is twice the rendered size, so a `4`
 * stroke lands on exactly 2 device pixels (matching the CSS segments either
 * side, which are `h-0.5`) and the `2` perimeter stroke on 1.
 *
 * WEIGHTS ARE THE DISTINCTION, not decoration: the run is drawn heavier than
 * the perimeter standing across it, because the run is a real dependency and
 * the perimeter is a policy line drawn around it. Same reason the perimeter is
 * dashed at a finer rhythm (2px on / 2px off) than the exterior run (4px on /
 * 4px off) — two dashed elements that mean different things must not share a
 * cadence, or they read as one broken drawing.
 */
export function Datum({ index, label, locale, className }: DatumProps) {
  return (
    <div className={cn("relative select-none", className)} aria-hidden="true">
      <div className="flex items-end gap-3">
        <span className="mono-label shrink-0 text-primary-ink">{index}</span>
        <span className="mono-label shrink-0 text-muted-foreground">{pick(label, locale)}</span>
        {/* Interior run — solid, inside the boundary, what the organization
            controls. Fixed width: the controlled side is the short side. */}
        <span className="mb-2 h-0.5 w-8 shrink-0 bg-border" />
        {/* VIEWBOX IS 52 TALL, NOT 48, AND THAT IS LOAD-BEARING. The crossing
            mark is centred ON the run at y=46, so it spans 42–50; at a viewBox
            height of 48 an SVG root (which clips at its viewBox by default) cut
            the bottom 2 units — 25% of the mark — on every section header,
            silently, with no error and no layout overflow. The one property this
            rule asserts as its signature is the mark's SHAPE, so a clipped
            square was the page contradicting its own docblock. Found by
            adversarial QA, 2026-08-27.

            THE THREE NUMBERS MOVE TOGETHER and must stay in step: 52 units at
            h-[26px] keeps the scale at exactly 0.5, uniform with w-4 over 32;
            and mb-[6px] rather than mb-2 keeps the run's centre at the same
            absolute position as the flanking h-0.5 segments, which sit at mb-2
            on a 2px box. Change one without the others and the rule visibly
            steps out of line with the segments either side of it. */}
        <svg viewBox="0 0 32 52" className="mb-[6px] h-[26px] w-4 shrink-0" focusable="false">
          {/* The run, carried through the boundary. Solid up to the crossing… */}
          <path d="M0,46 H16" stroke="hsl(var(--border))" strokeWidth={4} fill="none" />
          {/* …dashed beyond it. */}
          <path
            d="M16,46 H32"
            stroke="hsl(var(--border))"
            strokeWidth={4}
            strokeDasharray="8 8"
            fill="none"
          />
          {/* The perimeter: a dashed zone boundary standing across the run,
              lighter than it, at its own dash rhythm. Drawn full height so it
              reads as a line the run passes THROUGH rather than a tick hanging
              off the run. */}
          <path
            d="M16,0 V52"
            stroke="hsl(var(--border))"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="none"
          />
          {/* THE CROSSING POINT CARRIES THE ONE ACCENT — the single place the
              run is permitted through the perimeter, and the only element in
              this rule that is filled rather than stroked. Square, not round:
              energy accents a round junction where its run originates and
              manufacturing a round tap where a measurement meets the process,
              so the placement differs, the shape differs, and the token does
              not. */}
          <rect x={12} y={42} width={8} height={8} fill="hsl(var(--primary-ink))" />
        </svg>
        {/* The run continues outside the boundary, dashed to the page edge —
            the dependency the organization does not control. A repeating
            gradient rather than N DOM nodes: same crispness at one element, and
            it re-spaces itself with the container instead of needing a
            hard-coded dash count. 4px on / 4px off, matching the SVG's own
            `8 8` at half scale.

            AN INLINE `style` OBJECT, NOT AN ARBITRARY TAILWIND CLASS, and that
            is the repo's own proven form for exactly this — energy-utilities-2,
            rail-transportation-2 and water-wastewater-2 all write their rule
            gradients this way. A `[background-image:repeating-linear-gradient(…)]`
            class carrying nested parens and commas is one JIT-extraction quirk
            away from generating nothing at all, and a rule that silently loses
            half its length is the same class of failure as the inert
            `stroke-border` this file's docblock records. */}
        <span
          className="mb-2 h-0.5 min-w-0 flex-1"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, hsl(var(--border)) 0 4px, transparent 4px 8px)"
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
 * Crossing + full-width h2 + optional lead. For sections whose body is a
 * diagram, a card matrix, a register or an interactive: the header gets out of
 * the way and the mechanism carries the section.
 *
 * FULL-WIDTH means no `max-w-*` on the h2 and no `prose-measure` on the lead. A
 * capped heading above a full-width body reads as a narrow left-hugging column
 * with dead space beside it, and the same cap on the lead is the same bug one
 * element lower — the defect `OXOT_Composition_Rules.md`'s heading-width floor
 * rule was written for, after it shipped live on
 * `/industries/water-wastewater-2`. `text-balance` alone keeps a long heading
 * from stretching into one ungainly line. This page has no narrower-column
 * context anywhere that would justify a measure cap here.
 */
export function SectionA({
  id,
  index,
  datumLabel,
  heading,
  lead,
  locale,
  className,
  children
}: SectionAProps) {
  return (
    <SectionShell id={id} index={index} datumLabel={datumLabel} locale={locale} className={className}>
      <h2 id={`${id}-h`} className="h-section mt-10 text-balance">
        {pick(heading, locale)}
      </h2>
      {lead && (
        <p className="mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(lead, locale)}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </SectionShell>
  );
}

/* ── H-B ────────────────────────────────────────────────────────────────── */

export interface SectionBProps extends SectionShellProps {
  heading: Bilingual;
  lead?: Bilingual;
  /**
   * THE SECTION'S LOAD-BEARING CLAIM BOUNDARY — the statement the section
   * cannot be read correctly without. Pass the real string from the content
   * module (`SCOPE.boundary`, `ARCHITECTURE.viewsNote`, `WORKED_EXAMPLE.tag`,
   * `AIR_GAP.caveat`, `OUTCOME_FALLBACK`), never a paraphrase written at the
   * call site. If a section has no such string, it is an H-A section.
   */
  guard: Bilingual;
}

/**
 * Crossing + h2 + optional lead + a claim-boundary strip, then the body.
 *
 * THE STRIP IS ABOVE THE BODY, NOT BELOW IT, AND THAT IS THE WHOLE POINT. Every
 * string this shell carries is a condition on how the body must be read — what
 * OXOT does not model, that the environment shown is notional, that the example
 * is illustrative, that an air gap is not automatically risk-free, that a
 * result is unpublished. A condition printed after the thing it conditions has
 * already been read is a footnote, and the site-wide rule is that a claim
 * boundary is visible, never buried (Visual Foundation Spec L402; Layout Styles
 * Patterns 1, 2 and 8 all restate it).
 *
 * IT IS MARKED WITH A DASHED LEFT RULE, which is the datum's own perimeter
 * turned vertical — the same two facts said twice, once in the rule at the top
 * of the section and once beside the sentence that draws the boundary in words.
 * `--border` only; a claim boundary is not a `--signal-red` warning, and
 * styling it as an alert would misread a statement of scope as a hazard.
 *
 * The strip is real body-size text, not fine print: `text-[1.0625rem]` matches
 * the lead. Shrinking it is the failure this shell exists to prevent.
 */
export function SectionB({
  id,
  index,
  datumLabel,
  heading,
  lead,
  guard,
  locale,
  className,
  children
}: SectionBProps) {
  return (
    <SectionShell id={id} index={index} datumLabel={datumLabel} locale={locale} className={className}>
      <h2 id={`${id}-h`} className="h-section mt-10 text-balance">
        {pick(heading, locale)}
      </h2>
      {lead && (
        <p className="mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(lead, locale)}
        </p>
      )}
      <p className="mt-8 border-l-2 border-dashed border-border pl-5 body-lead leading-relaxed text-foreground">
        {pick(guard, locale)}
      </p>
      <div className="mt-10">{children}</div>
    </SectionShell>
  );
}

/* ── H-C ────────────────────────────────────────────────────────────────── */

export interface SectionCProps extends SectionShellProps {
  heading: Bilingual;
  lead: Bilingual;
  caption: Bilingual;
}

/**
 * Crossing + h2 + lead + table caption. The reference-matrix shape: the caption
 * names what the matrix below is and what its columns mean, which a lead
 * written as prose does not. Same full-width rule as SectionA.
 *
 * `lead` is REQUIRED here, unlike H-A's: the one section using this shell
 * carries the no-automatic-compliance guardrail in that slot, and a regulatory
 * matrix rendered without it reads as a compliance claim (see
 * `content.regulatory.ts`).
 */
export function SectionC({
  id,
  index,
  datumLabel,
  heading,
  lead,
  caption,
  locale,
  className,
  children
}: SectionCProps) {
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
