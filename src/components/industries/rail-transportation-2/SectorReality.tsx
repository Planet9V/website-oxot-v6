import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { REALITY } from "./content.reality";
import { SectionB } from "./Rule";

/**
 * S01 · SECTOR REALITY — header recipe H-B, and the only section on this page
 * that takes it.
 *
 * WHY H-B HERE AND NOWHERE ELSE. H-B puts the section's prose in a 7-col beside
 * a cited-evidence panel in a 5-col, and it belongs here because this section's
 * load-bearing claim rests on genuine outside instruments rather than on OXOT's
 * own framing: NIS2 Annex I names rail infrastructure managers and railway
 * undertakings as high-criticality entities, and TSA's directives bind covered
 * US passenger and freight carriers — both stated together at source L9, both
 * restated in the brief's own regulatory matrix (L375, L379, L384). The test is
 * falsifiable rather than decorative: any other section standing on an outside
 * instrument that way would take H-B too, and none does.
 *
 * THE CITED CLAIM IS RENDERED ONCE, IN THE PANEL. L81's four sentences are
 * narrative and stay in the 7-col; L9's two instrument sentences are rendered
 * ONLY as the panel's two rows. Restating either in the narrative would print
 * this section's evidence twice and leave the panel summarising itself.
 *
 * THE SECTION'S ONE FOCAL ELEMENT (OXOT_Visual_Rules.md L3) IS THE EVIDENCE
 * PANEL: the only bordered, filled surface in the section, and the only place
 * brand orange appears — on the two source links, which is the one place a
 * reader is being invited to leave the page. The consequence register below is
 * the secondary layer and is deliberately quiet: rules and weight, no fill, no
 * accent. A second orange on the group labels would be the competing-accent
 * case OXOT_Visual_Rules.md L14 names.
 *
 * THE SEVEN OUTCOMES ARE A GROUPED CONSEQUENCE REGISTER — not seven cards, not
 * a bento, not a flat bullet list.
 *   · NOT CARDS. OXOT_Visual_Rules.md L13 bars more than three visually-equal
 *     cards in a section; seven would be four over, and seven equal tiles would
 *     also assert that the seven are peers, which is exactly what the grouping
 *     denies.
 *   · NOT FLAT. Rendered as one list the seven read as undifferentiated, and
 *     the reader has to work out unaided that four different subjects are in
 *     play. The grouping is the section's actual analytical content.
 *   · A `<dl>`, because that is what a subject with its consequences beneath it
 *     is: `dt` is the subject, `dd` holds the outcomes filed under it. The
 *     narrow-term-rail beside the clause is this site's established two-column
 *     `<dl>` convention (water-wastewater-2's TechnologyIndex.tsx, itself
 *     following resources/glossary) — structure borrowed, nothing else.
 *   · NOT A `<table>`. This page renders a genuine reference matrix in S02
 *     immediately below and another in S11; a third table here would make three
 *     consecutive sections look alike, and the register is not a matrix — the
 *     groups hold different numbers of rows.
 *
 * THE RULE GRAMMAR IS THE PAGE'S OWN BLOCK-JOINT GRAMMAR, reused as structure
 * rather than as ornament. A SOLID rule opens each group and a DASHED rule
 * separates outcomes inside a group — the same distinction Rule.tsx's signalling
 * run draws between a block boundary and the running rail. That is why the
 * register needs no bullets, no ordinals and no coloured chips to show its
 * shape: the two rule weights carry it. No `--signal-*` token is touched here,
 * for the reason Rule.tsx gives at length — a railway signal is not an OXOT
 * signal token.
 *
 * NO ORDINALS ON THE OUTCOMES, and no move/stop/restore tag. See
 * content.reality.ts: the source ranks nothing and assigns nothing, and a
 * printed 01–07 rail or a per-row MOVE/STOP/RESTORE chip would both be
 * fabricated rail-operations classifications wearing the look of rigour.
 *
 * SIBLING BALANCE, `data-balance-group="reality-head"`, floor 0.5 (the site-wide
 * 2x floor; `scripts/measure.mjs` takes the WORSE of height ratio and marked
 * element count). Both panes are fixed BY INFORMATION, not by filler:
 *   · NARRATIVE — 3 marked paragraphs, split at L81's own sentence boundaries.
 *   · EVIDENCE — 2 marked instrument blocks, each one whole row (jurisdiction,
 *     name, role, source link) so a single instrument cannot be counted twice.
 * Count ratio 2/3 = 0.67, clear of the floor, so rendered height governs.
 * Nothing was added to either pane to make a count pass. The marks sit on the
 * inner content, never on the stretched grid cell.
 */

/** The register's two tracks, defined once. The term rail is wider than the
 *  manufacturing page's because these labels are phrases, not single words —
 *  "Movement authority" is the longest of the four. */
const REGISTER_GRID = "lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-x-10";

export function SectorReality({ locale }: { locale: Locale }) {
  const { citation } = REALITY;

  return (
    <SectionB
      id="sector-reality"
      index="01"
      datumLabel={REALITY.datumLabel}
      heading={REALITY.h2}
      balanceGroup="reality-head"
      locale={locale}
      narrative={
        <div className="space-y-4">
          {REALITY.narrative.map((paragraph, i) => (
            <p
              key={i}
              data-balance-item
              className="prose-measure body-lead leading-relaxed text-muted-foreground"
            >
              {pick(paragraph, locale)}
            </p>
          ))}
        </div>
      }
      evidence={
        /* A `<div>` wrapping each dt/dd group is valid inside `<dl>` (HTML5
           grouping), and it is what carries the balance mark: marking the dt
           and the dd separately would count one instrument twice. */
        <dl>
          {citation.instruments.map((instrument, i) => (
            <div
              key={instrument.name.en}
              data-balance-item
              className={i > 0 ? "mt-5 border-t border-border pt-5" : undefined}
            >
              {/* The brief's own scoping phrase. Muted, not orange — it says
                  WHERE the instrument bites, which is context for the name
                  below it rather than the panel's accent. */}
              <p className="mono-label text-muted-foreground">
                {pick(instrument.jurisdiction, locale)}
              </p>
              <dt className="mt-2 body-copy font-semibold leading-snug text-foreground">
                {pick(instrument.name, locale)}
              </dt>
              {/* ml-0 kills the UA's 40px indent. */}
              <dd className="ml-0 mt-1.5 body-copy leading-relaxed text-muted-foreground">
                {pick(instrument.role, locale)}
                {/* The link rides INSIDE the definition rather than sitting
                    under the panel as a shared footer: two instruments, two
                    publishers, two URLs, and a shared footer link would attach
                    the TSA citation to the EU claim or the reverse. */}
                <a
                  href={instrument.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mono-label mt-3 block text-primary-ink underline-offset-4 hover:underline focus-visible:underline"
                >
                  {pick(instrument.sourceLabel, locale)}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      }
    >
      {/* L83, the source's own lead-in to the list. It sits with the register
          rather than in the narrative pane because it ends in a colon and its
          sentence is only finished by the rows beneath it. */}
      <p className="body-lead leading-relaxed text-muted-foreground">
        {pick(REALITY.registerLead, locale)}
      </p>

      {/* min-w-0 on the grid: without it the term track sizes to the longest
          unbreakable label and pushes the page sideways at 390px. */}
      <dl className="mt-8 min-w-0">
        {REALITY.registerGroups.map((group) => (
          <div
            key={group.id}
            className={`grid min-w-0 border-t border-border pt-4 ${REGISTER_GRID}`}
          >
            {/* The subject. Weight, not colour — the evidence panel above holds
                this section's only accent. Stacked, it reads as the heading of
                the outcomes beneath it; at `lg` it becomes the term rail. */}
            <dt className="mono-label pb-3 text-foreground lg:pb-4">
              {pick(group.label, locale)}
            </dt>
            {/* ml-0 kills the UA's 40px indent. */}
            <dd className="ml-0 min-w-0 pb-4">
              {/* Dashed = a row boundary INSIDE a group; the solid rule above
                  the group is the group boundary. The first outcome in a group
                  takes no rule, so it reads as belonging to the solid rule that
                  opened the group rather than starting a run of its own. */}
              {group.outcomes.map((outcome, i) => (
                <p
                  key={outcome.en}
                  className={
                    i > 0
                      ? "mt-3 border-t border-dashed border-border pt-3 body-copy leading-relaxed text-foreground"
                      : "body-copy leading-relaxed text-foreground"
                  }
                >
                  {pick(outcome, locale)}
                </p>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </SectionB>
  );
}
