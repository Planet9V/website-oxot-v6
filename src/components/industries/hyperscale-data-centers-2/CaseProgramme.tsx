import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { SectionA } from "./Rule";
import {
  ANONYMIZATION,
  ARTIFACT_LABEL,
  CANDIDATES,
  CANDIDATES_HEADING,
  CASE_PROGRAMME_SECTION,
  TEMPLATE_HEADING,
  TEMPLATE_STEPS
} from "./content.caseProgramme";

/**
 * S10 · CASE-STUDY PROGRAMME — source L397–L430. Header recipe H-A.
 *
 * THIS SECTION'S ONE JOB IS NOT TO LIE. Ten case studies are named below and not
 * one of them exists: L401 calls them "Recommended case-study categories" — a
 * programme of work, not a shelf of published proof. Every layout decision in
 * this file is downstream of that, so they are stated here rather than left to
 * be inferred from the markup.
 *
 * NOT TEN CASE-FILE CARDS. The obvious build — ten boxed cards, each with a name
 * and a classification strip — is rejected outright, and for two independent
 * reasons either of which is sufficient. First, a card grid of ten named studies
 * IS the published-portfolio layout; a reader recognises it before reading a
 * word of it, and no amount of careful text inside the cards undoes what the
 * layout has already said. Second, this project's Visual Rules cap
 * visually-equal cards at three: ten would break that rule more than three times
 * over, while also asserting the ten are delivered peers, which they are not.
 *
 * METHOD FIRST, CANDIDATES SECOND — the source's own two blocks, order inverted.
 * See `TEMPLATE_HEADING` in content.caseProgramme.ts for why, and for the
 * confirmation that nothing inside either block is reordered.
 *
 * PART A IS A NUMBERED SPINE BECAUSE THE ORDER IS THE CONTENT. The nine template
 * steps run question → scope → systems → pathway → consequence → options →
 * decision → evidence → what changed. Step 7 is the decision and step 9 is what
 * happened afterwards; shuffle them and the method stops being a method. So it
 * is a real `<ol>` with visible ordinals — the one numbered list on this page,
 * earned rather than decorative. The rows run FULL WIDTH with hairlines between
 * them, the register/index look, rather than a narrow left-hugging column with
 * dead space beside it, which is the failure `Rule.tsx` names for capped
 * headings and which lands identically one element lower.
 *
 * THE ANONYMIZATION PAIR IS THE SOURCE'S OWN WORKED CONTRAST, not an
 * illustration written here. L430 supplies both halves — the acceptable form and
 * the unacceptable one — as quoted examples, and both render verbatim, side by
 * side, because a before/after with only the "after" shown is not a
 * before/after. The two panes are distinguished by their labels and by a
 * solid-versus-dashed border, so the contrast survives a greyscale read and
 * costs no colour token.
 *
 * PART B IS QUESTION-LED, AND THAT IS THE ANTI-FABRICATION MOVE. Each entry's
 * TITLE is its primary question — the thing the study would set out to answer,
 * which is true today. The case-study name is demoted to a mono-label kicker
 * above it, and the "strong visual artifact" is a sub-field under the label
 * `Would produce`, in the conditional, never as an artifact on hand. A register
 * of open questions cannot be misread as a register of finished answers.
 *
 * THE PROGRAMME STATUS IS STATED ONCE, IN THE LEAD SLOT. Full body size,
 * directly under the h2, above both parts — the placement technique
 * `energy-utilities-2/Regulatory.tsx` uses for its compliance guardrail, so a
 * reader who reads only the headline and the first paragraph still meets it. It
 * is NOT repeated as fine print on each of the ten entries: ten identical
 * disclaimers is the version a reader learns to skip.
 *
 * NO IMAGERY, and this is content-driven rather than a style preference. Every
 * "strong visual artifact" named here is something a FUTURE study would produce.
 * A mockup or placeholder image would fabricate the exact artifact the section
 * says does not yet exist — the one failure this section exists to avoid.
 *
 * NO `data-balance-group` ANYWHERE. Sibling balance exists to stop one pane of a
 * TWO-PANE SPLIT sitting nearly empty beside a full one, and
 * `scripts/measure.mjs` compares marked siblings within a group. This section is
 * a single full-width run: Part A stacked above Part B, with nothing to measure
 * for parity. Same reasoning `DependencyMap.tsx` on this page and
 * `rail-transportation-2/FreightScenarios.tsx` each record for the same shape.
 *
 * MOBILE (OXOT_Mobile_Rules.md): DOM order IS the stacking order throughout —
 * method, contrast pair, then the ten — with no order-swapping utilities. The
 * ten reflow to one column below `md`, the contrast pair to one column below
 * `sm`. Nothing is behind hover and nothing is clamped, so the `line-clamp`
 * specificity collision that broke an earlier register elsewhere cannot occur.
 *
 * TOKEN DISCIPLINE: `--border`, `--muted`, `--muted-foreground`, `--foreground`
 * and `--primary-ink` only. No `--signal-*` token appears — the six signals mean
 * model and decision state on this page, and an unwritten case study is neither.
 */

export function CaseProgramme({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <SectionA
      id={CASE_PROGRAMME_SECTION.id}
      index={CASE_PROGRAMME_SECTION.index}
      datumLabel={CASE_PROGRAMME_SECTION.datumLabel}
      heading={CASE_PROGRAMME_SECTION.heading}
      lead={CASE_PROGRAMME_SECTION.lead}
      locale={locale}
      className={className}
    >
      {/* ── Part A · the record ─────────────────────────────────────────── */}
      <h3 className="h-card text-foreground">{pick(TEMPLATE_HEADING, locale)}</h3>

      <ol className="mt-6 border-t border-border">
        {TEMPLATE_STEPS.map((step, i) => (
          <li key={step.en} className="border-b border-border">
            {/* data-narrow-ok on the row: these are short ordered STEP TITLES,
                not reading-width paragraphs, so their narrow rendered width is
                the natural width of a few words rather than a measure class
                capping prose. `scripts/measure.mjs`'s narrow-text walk starts at
                the text node's PARENT, so the exemption belongs on this row.
                Same exemption `rail-transportation-2/Engagement.tsx` records. */}
            <div data-narrow-ok className="flex items-baseline gap-4 py-3">
              {/* Not `aria-hidden`: with the list marker suppressed, this ordinal
                  is the only thing carrying the step's position, and on a
                  nine-step method the position is the content. */}
              <span className="mono-label w-5 shrink-0 tabular-nums text-primary-ink">{i + 1}</span>
              <span className="min-w-0 body-copy leading-relaxed text-foreground">
                {pick(step, locale)}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
        {pick(ANONYMIZATION.rule, locale)}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="rounded-xl border border-border bg-muted/40 p-5">
          <p className="mono-label text-primary-ink">{pick(ANONYMIZATION.acceptableLabel, locale)}</p>
          <p className="mt-3 body-lead leading-relaxed text-foreground">
            {pick(ANONYMIZATION.acceptable, locale)}
          </p>
        </div>
        {/* Dashed rather than tinted: the rejected form is distinguished by
            border treatment and by its own label, so the contrast reads in
            greyscale without spending a signal token on an editorial judgement. */}
        <div className="rounded-xl border border-dashed border-border p-5">
          <p className="mono-label">{pick(ANONYMIZATION.unacceptableLabel, locale)}</p>
          <p className="mt-3 body-lead leading-relaxed text-muted-foreground">
            {pick(ANONYMIZATION.unacceptable, locale)}
          </p>
        </div>
      </div>

      {/* ── Part B · the ten candidates ─────────────────────────────────── */}
      <h3 className="h-card mt-14 border-t border-border pt-10 text-foreground">
        {pick(CANDIDATES_HEADING, locale)}
      </h3>

      {/* A two-column REFLOW, not a grid of ten. CSS multi-column fills column
          one before column two, so reading order, DOM order and visual order are
          the same order — and because the entries share one continuous run with
          only a hairline between them, none of the ten is boxed into looking
          like a delivered peer of the other nine. `break-inside-avoid` keeps a
          single entry from splitting across the column boundary. */}
      {/* data-narrow-ok: `scripts/measure.mjs`'s narrow-text exemption only
          recognises `display:grid`/`display:flex` multi-track contexts, not
          CSS multi-column (`columns-2`) — so a legitimately reflowed two-column
          run like this one reads as false-positive orphaned narrow text.
          Marking the container once exempts every descendant `<p>` inside it. */}
      <ul data-narrow-ok className="mt-2 gap-x-12 md:columns-2">
        {CANDIDATES.map((candidate) => (
          <li key={candidate.id} className="break-inside-avoid border-t border-border py-6">
            <p className="mono-label text-primary-ink">{pick(candidate.name, locale)}</p>
            <h4 className="mt-2 body-lead font-medium leading-snug text-foreground">
              {pick(candidate.question, locale)}
            </h4>
            <p className="mono-label mt-4">{pick(ARTIFACT_LABEL, locale)}</p>
            <p className="mt-1.5 body-copy leading-relaxed text-muted-foreground">
              {pick(candidate.artifact, locale)}
            </p>
          </li>
        ))}
      </ul>
    </SectionA>
  );
}
