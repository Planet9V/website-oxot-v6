"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { CASE_STUDIES } from "./content.airgap";

/**
 * PATTERN 8 — THE CASE FILE INDEX, defense and government application.
 * `OXOT_Layout_Styles.md` §8. FIRST IMPLEMENTATION OF THIS PATTERN IN THE REPO,
 * so it is built from the spec text rather than from a sibling.
 *
 * CLASSIFICATION IS CONDITIONAL, AND HERE THE CONDITION IS NOT MET. §8 records
 * this as "the single most serious finding across all 8 patterns": the original
 * pattern printed a claim-boundary string as a permanent template element on
 * every card, which becomes a false disclaimer the moment a real published study
 * enters the same index. The corrected model is that the record types never
 * collide — a real study is a `CaseStudyCard` carrying its own
 * `PublicationStatus`, an illustrative Twin scenario is a `TwinScenario`
 * carrying its own label.
 *
 * NEITHER TYPE IS ON THIS PAGE. `content.airgap.ts` is explicit about what
 * `CASE_STUDIES` is and is not: "It is not a case-study index and it contains no
 * case studies. It is the publication RULES this vertical operates under, plus
 * ten candidate QUESTIONS a future study could answer… These ten are not studies
 * and must never be given a publication status, a customer, a date, or a
 * result." So:
 *   · THE SIX RULES RENDER ONCE, as the governing publication policy at the head
 *     of the section — the real, sourced content a per-card disclaimer was a poor
 *     substitute for. It states in one place that publication requires customer
 *     approval and classification review, that the default is anonymized, and
 *     what is never published.
 *   · NO CARD CARRIES A PUBLICATION STATUS, a customer, a date or a result,
 *     because none of the ten has one.
 *   · NO CARD CARRIES A BLANKET DISCLAIMER STRIP. The header strip is the
 *     folder-tab file reference, which differs per card and is a real fact about
 *     the index, not a string repeated ten times.
 *
 * NO CLASSIFICATION MARKING IS PRINTED ANYWHERE, and none may be added — no
 * "SECRET", no "NOFORN", no "OFFICIAL-SENSITIVE", no banner strip, no
 * colour-coded classification bar. `Rule.tsx`'s docblock bars this for the whole
 * page on the ground that inventing a real-looking marking on a public marketing
 * page fabricates a legal status. §8's "classification-style header strip" is
 * satisfied by the document-control idiom — a folder tab carrying a file
 * reference — which is the convention's SHAPE without its claim.
 *
 * FILTER CHIPS ARE `<button aria-pressed>`, COMMITTED. §8 picks this over
 * `role="tablist"` (tabs imply single-select navigation; this is multi-select
 * filtering) and over a checkbox group (`aria-pressed` must never appear on a
 * checkbox role). Selection is OR across chips, and no chip selected shows all
 * ten. Every chip clears 44px and takes the global `:focus-visible` ring —
 * `globals.css` sets a working one, and Tailwind's `ring-*` utilities would
 * overwrite it with a transparent scaffold.
 *
 * THE FACETS ARE DERIVED FROM THE SOURCE TEXT, NOT INVENTED AS A TAXONOMY. Each
 * facet is a set of terms the source itself prints, matched case-insensitively
 * against a category's own `name` and `question`; `FACETS` below lists the terms
 * so the grouping is checkable rather than asserted. A category carrying none of
 * a facet's terms is not in it. That is also why the chips carry live counts —
 * the count is computed from the same match, so it cannot drift from what
 * renders.
 *
 * ITS OWN VISUAL IDENTITY, NOT ASSET-CLASS BENTO REUSED — the Composition Rule
 * §8 cites. Bento is uniform cards in criticality bands; this is a policy panel
 * above a drawer of folder tabs, and nothing here is banded, sized by tier, or
 * given an engineering glyph.
 *
 * NO SIGNAL TOKEN APPEARS IN THIS FILE. The six signals mean model and decision
 * state; a filter chip and a folder tab are chrome, and spending a semantic
 * token on either would repurpose it as decoration.
 */

/* Section chrome, not sourced copy: `content.airgap.ts` carries no `datumLabel`
   and is read-only here. It names the section, a real fact about the page. */
const DATUM_LABEL = same("Publication model");

const POLICY_LABEL = same("Publication policy — six rules, all six binding");
const CATEGORIES_LABEL = same("Candidate case-file categories");
const CATEGORIES_NOTE = same(
  "Ten questions a future study could answer under the policy above. None is a published customer case study: none carries a customer, a date, a result, or a publication status, because none has one yet."
);
const FILTER_LABEL = same("Filter by dependency named in the question");

/* The live-region sentence, in parts, so the frame localises with the facet
   labels it wraps. Kept as separate fragments rather than one interpolated
   string because word order differs between languages and a single frame with
   embedded counts cannot be reordered by a translator. */
const ANNOUNCE = {
  showingAll: same("Showing all"),
  showing: same("Showing"),
  of: same("of"),
  categories: same("case-file categories"),
  noFilter: same("No filter applied."),
  filteredBy: same("Filtered by:")
};
const FILTER_HINT = same("Select any number. With none selected, all ten show.");
const CLEAR_LABEL = same("Clear filters");
const FILE_PREFIX = "CF";

/**
 * THE FACETS, WITH THE SOURCE TERMS THAT DEFINE THEM. Every term below is a word
 * `CASE_STUDIES.categories` itself prints; the match is a case-insensitive
 * substring test against a category's `name` + `question`, so a reviewer can
 * check any chip's membership by reading the ten questions. No category is
 * hand-assigned to a facet.
 */
const FACETS: Array<{ id: string; label: Bilingual; terms: string[] }> = [
  { id: "vendor", label: same("Vendor & OEM support"), terms: ["vendor", "oem"] },
  { id: "power", label: same("Power & generation"), terms: ["power", "generator", "energy"] },
  { id: "fuel", label: same("Fuel & logistics"), terms: ["fuel", "logistic"] },
  {
    id: "comms",
    label: same("Communications & identity"),
    terms: ["communications", "telecom", "identity"]
  },
  {
    id: "facility",
    label: same("Facilities & cooling"),
    terms: ["facility", "facilities", "cooling", "bms", "epms"]
  },
  { id: "supply", label: same("Supply chain & spares"), terms: ["supply", "supplier", "spares"] },
  { id: "cyber", label: same("Cyber pathway"), terms: ["cyber"] }
];

const FACET_BY_ID = new Map(FACETS.map((facet) => [facet.id, facet]));

type Category = (typeof CASE_STUDIES.categories)[number];

/** The one match rule, used by both the chip counts and the grid, so the two
 *  cannot disagree. Matched against the EN text: the `nl` values are same-as-
 *  English placeholders pending translation (see `registry.ts`), and matching a
 *  placeholder would silently change which cards a Dutch reader sees the day a
 *  real translation lands. */
function matchesFacet(category: Category, facetId: string): boolean {
  const facet = FACET_BY_ID.get(facetId);
  if (!facet) return false;
  const haystack = `${category.name.en} ${category.question.en}`.toLowerCase();
  return facet.terms.some((term) => haystack.includes(term));
}

function facetsOf(category: Category): string[] {
  return FACETS.filter((facet) => matchesFacet(category, facet.id)).map((facet) => facet.id);
}

export function CaseFileIndex({
  locale,
  /* The section's ordinal on the page. A prop with a documented default rather
     than a hardcoded constant, because the page's final section order is
     assembled in the route file, not here. */
  index = "09",
  className
}: {
  locale: Locale;
  index?: string;
  className?: string;
}) {
  const [activeFacets, setActiveFacets] = useState<string[]>([]);

  const categories = CASE_STUDIES.categories;
  const shown =
    activeFacets.length === 0
      ? categories
      : categories.filter((category) => activeFacets.some((id) => matchesFacet(category, id)));

  function toggleFacet(id: string) {
    setActiveFacets((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );
  }

  /* The announcement. One whole sentence rather than a bare number, because a
     screen-reader user hearing "4" has been told nothing. */
  const activeLabels = FACETS.filter((facet) => activeFacets.includes(facet.id))
    .map((facet) => pick(facet.label, locale))
    .join(", ");
  /* THE SENTENCE FRAME IS BILINGUAL, NOT A TEMPLATE LITERAL. It was previously a
     hardcoded English string — the only one in all 24 files to bypass
     `Bilingual` — feeding a `role="status"` region, so on /nl a Dutch screen
     reader announced English while the facet labels beside it were correctly
     localised. `tsc` cannot catch this: a template literal is just `string`.
     Found by adversarial QA, 2026-08-27. */
  const announcement =
    activeFacets.length === 0
      ? `${pick(ANNOUNCE.showingAll, locale)} ${categories.length} ${pick(ANNOUNCE.categories, locale)}. ${pick(ANNOUNCE.noFilter, locale)}`
      : `${pick(ANNOUNCE.showing, locale)} ${shown.length} ${pick(ANNOUNCE.of, locale)} ${categories.length} ${pick(ANNOUNCE.categories, locale)}. ${pick(ANNOUNCE.filteredBy, locale)} ${activeLabels}.`;

  return (
    <SectionA
      id="case-file-index"
      index={index}
      datumLabel={DATUM_LABEL}
      heading={CASE_STUDIES.h2}
      lead={CASE_STUDIES.intro}
      locale={locale}
      className={className}
    >
      {/* ── The governing publication policy, rendered ONCE ───────────────── */}
      {/* Marked with the datum's own dashed perimeter turned vertical — the same
          idiom `Rule.tsx`'s claim-boundary strip uses, because this panel does
          the same job for a whole section that the strip does for one sentence.
          `--border` only; a policy is not a hazard. */}
      <section
        aria-labelledby="publication-policy-h"
        className="border-l-2 border-dashed border-border pl-5"
      >
        <h3 id="publication-policy-h" className="mono-label text-primary-ink">
          {pick(POLICY_LABEL, locale)}
        </h3>
        <ol className="mt-4 space-y-3">
          {CASE_STUDIES.rules.map((rule, i) => (
            <li key={i} className="flex gap-4">
              <span className="mono-label mt-1 shrink-0 text-muted-foreground">
                R{String(i + 1).padStart(2, "0")}
              </span>
              <span className="body-lead leading-relaxed text-foreground">
                {pick(rule, locale)}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── The drawer ────────────────────────────────────────────────────── */}
      <div className="mt-14">
        <h3 className="mono-label text-primary-ink">{pick(CATEGORIES_LABEL, locale)}</h3>
        {/* NO measure cap here. A reading-width class on a STANDALONE paragraph —
            one with no sibling pane beside it — leaves dead space to its right,
            and `scripts/measure.mjs` fails it as orphaned narrow text. It read
            63% of the section width with `max-w-[68ch]`. The harness note records
            this exact defect being reintroduced independently by different
            builders on two separately-built pages; this is the third. */}
        <p className="mt-3 body-lead leading-relaxed text-muted-foreground">
          {pick(CATEGORIES_NOTE, locale)}
        </p>

        {/* Filter chips. `<button aria-pressed>`, never a tablist and never a
            checkbox role — see this file's docblock. The group is labelled by a
            real visible heading rather than an invented `aria-label`. */}
        <div className="mt-8" role="group" aria-labelledby="case-filter-h">
          <p id="case-filter-h" className="mono-label">
            {pick(FILTER_LABEL, locale)}
          </p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
            {pick(FILTER_HINT, locale)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {FACETS.map((facet) => {
              const count = categories.filter((c) => matchesFacet(c, facet.id)).length;
              const pressed = activeFacets.includes(facet.id);
              return (
                <button
                  key={facet.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => toggleFacet(facet.id)}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-t-md border border-b-0 px-3.5 py-2",
                    "text-[0.875rem] leading-snug transition-colors duration-200 motion-reduce:transition-none",
                    pressed
                      ? "border-primary-ink/50 bg-primary-ink/10 font-medium text-foreground"
                      : "border-border bg-muted/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pick(facet.label, locale)}
                  <span className="mono-label text-muted-foreground">{count}</span>
                </button>
              );
            })}
            {activeFacets.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveFacets([])}
                className="inline-flex min-h-11 items-center px-3 text-[0.875rem] font-medium text-primary-ink underline-offset-4 hover:underline"
              >
                {pick(CLEAR_LABEL, locale)}
              </button>
            )}
          </div>
          {/* The chips sit on this rule like tabs on a drawer front. */}
          <div aria-hidden="true" className="h-px w-full bg-border" />
        </div>

        {/* THE ARIA LIVE REGION. `role="status"` is implicitly polite, and the
            text is a whole sentence so the announcement stands alone. Visible
            too — a sighted user filtering a ten-card grid needs the same count,
            and a visually-hidden-only region would be an accessibility feature
            the page hides from most of its readers. */}
        <p role="status" className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
          {announcement}
        </p>

        <ul className="mt-6 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((category) => {
            /* The file reference is the category's ORDINAL IN THE FULL INDEX,
               not its position in the filtered view: CF-07 is CF-07 whichever
               chips are pressed, which is what makes it a reference rather than
               a row number. */
            const ordinal = categories.findIndex((c) => c.id === category.id) + 1;
            const tags = facetsOf(category);
            return (
              <li key={category.id} className="flex flex-col">
                {/* THE FOLDER TAB — document-control chrome carrying one real,
                    per-card fact. No status, no disclaimer, no marking. */}
                <span className="mono-label self-start rounded-t-md border border-b-0 border-border bg-muted/50 px-3 py-1.5 text-muted-foreground">
                  {FILE_PREFIX}-{String(ordinal).padStart(2, "0")}
                </span>
                <div
                  data-balance-group="case-file-cards"
                  className="flex flex-1 flex-col rounded-b-xl rounded-tr-xl border border-border bg-card p-5"
                >
                  <h4
                    data-balance-item
                    className="body-lead font-semibold leading-snug text-foreground"
                  >
                    {pick(category.name, locale)}
                  </h4>
                  <p
                    data-balance-item
                    className="mt-3 body-copy leading-relaxed text-muted-foreground"
                  >
                    {pick(category.question, locale)}
                  </p>
                  {tags.length > 0 && (
                    <p
                      data-balance-item
                      className="mono-label mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-5 text-muted-foreground"
                    >
                      {tags.map((tagId) => (
                        <span key={tagId}>{pick(FACET_BY_ID.get(tagId)!.label, locale)}</span>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionA>
  );
}
