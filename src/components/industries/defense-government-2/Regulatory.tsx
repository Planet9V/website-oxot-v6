import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { StaticTable } from "@/components/ui/static-table";
import { same } from "../registry";
import { SectionC } from "./Rule";
import { REGULATORY } from "./content.regulatory";

/**
 * S10 · REGULATORY AND ASSURANCE CONTEXT — header recipe H-C, and the only
 * section on this page that takes it.
 *
 * WHY H-C HERE AND NOWHERE ELSE. `Rule.tsx` binds H-C to the reference-matrix
 * shape: a table whose columns must be named in words before the matrix can be
 * read. This is the page's one such table — nine rows, each carrying one
 * framework, one hedged statement about whether it applies, and one statement
 * about what OXOT can supply, which are three different KINDS of claim standing
 * side by side. Every other multi-column section on this page sits under a
 * heading that already says what its columns are, or heads them once itself.
 * The binding is falsifiable: any other section with this shape would take H-C
 * too, and none has it.
 *
 * `intro` IS THE GUARDRAIL AND IT TAKES THE LEAD SLOT. It states plainly that
 * OXOT does NOT claim NIS2, IEC 62443, or any civilian framework automatically
 * applies to military systems, or substitutes for national-security controls.
 * `content.regulatory.ts` is explicit about the consequence of misplacing it: a
 * renderer that prints the nine rows above the fold and defers the intro — or
 * drops it as throat-clearing — "turns a carefully hedged reference table into
 * nine implied compliance claims about defense systems." So it renders at full
 * body size, directly under the h2, ABOVE the caption and the matrix. H-C makes
 * `lead` a required prop for exactly this reason.
 *
 * IT IS NOT A BOXED WARNING, deliberately. A bordered callout would make the
 * disclaimer the section's focal element when the matrix is what the reader
 * came for, and would style a statement of scope as a hazard. One paragraph in
 * the ordinary lead slot, at reading size, is the site's own treatment — the
 * same call `energy-utilities-2` and `hyperscale-data-centers-2` make for their
 * equivalent guardrails.
 *
 * `static-table.tsx`, NOT `ui/data-table.tsx`. Nine rows, prose in all three
 * cells, read top to bottom or scanned for one's own framework. There is no
 * security level, no clause number, no conformity route and no date — nothing
 * anyone would sort or filter by — so the TanStack sort/filter bar would offer
 * an interaction that answers no question. `StaticTable` also emits
 * `<th scope="row">` on the first cell unconditionally, which is what makes a
 * screen reader announce "NATO cyber defense and resilience — NATO emphasizes
 * cyber resilience…" rather than a disembodied sentence.
 *
 * `minWidth` IS `62rem`, ABOVE THE 56rem SIBLING PAGES USE FOR THE SAME THREE-
 * COLUMN SHAPE, and column one is the reason rather than the prose. Several of
 * these nine framework names run long — "Supply-chain and technology-
 * sovereignty policy", "NATO public-private resilience guidance", "CER
 * Directive and national resilience regimes" — with few break opportunities
 * that read well. At 56rem those rows push column one wide and squeeze the two
 * prose columns unevenly against the short rows around them. Narrower viewports
 * scroll INSIDE the primitive's `overflow-x-auto` wrapper, never the page body
 * — the project convention for a wide comparison table, and the one
 * horizontal-scroll case `OXOT_Mobile_Rules.md` permits.
 *
 * THREE ROWS OF NINE LINK OUT, SIX DO NOT, AND ONLY ONE OF THE THREE IS
 * LOCALE-GATED — all three facts carried in the data, none inferred here:
 *   · IEC 62443            → `/assurance/iec-62443`             (bilingual)
 *   · Cyber Resilience Act → `/assurance/cyber-resilience-act`  (bilingual)
 *   · NIS2                 → `/assurance`, `englishOnly: true`
 * `src/app/[locale]/assurance/page.tsx` renders EN only, so that one href takes
 * the established `locale === "en" ? PATHS.assurance : PATHS.consulting` gate
 * every live industry page applies to it — a real destination in both languages
 * rather than a known 404 or a silently dropped link. The two framework pages
 * BENEATH `/assurance` render both locales, so gating them too would send a
 * Dutch reader away from a page that works for them. The distinction is read
 * from `row.englishOnly`, never matched on href strings, so this component
 * cannot silently widen it.
 * The six unlinked rows stay unlinked: there is no NATO page, no CER page, no
 * NIST SP 800-82 page and no supply-chain-policy page on this site, and the
 * Foundation Spec's acceptance criteria forbid inventing a placeholder
 * destination to even the column out.
 *
 * NO INVENTED LEGAL FACT ANYWHERE. `content.regulatory.ts` records that no
 * source names a clause, a security level, a conformity route or an
 * applicability determination for any of the nine, and that a fabricated
 * applicability statement here would be a legal claim rather than a content
 * gap. Every cell is transcribed; the rows' hedging — "may apply", "typically
 * operate under", "scope determined by national implementation",
 * "exemptions/scopes must be assessed legally", "often relevant" — is preserved
 * exactly and must survive any future edit.
 *
 * SIBLING BALANCE: none, and that is stated rather than left as an unmarked
 * gap. The section's body is a single table with no sibling pane beside it, so
 * there are no two panes to relate; the table's columns are sized by table
 * layout, not by a grid whose cells could stretch around empty content.
 */

/* Section chrome, not copy. `content.regulatory.ts` carries no datum label and
   no caption, but it DOES carry the three column names — so the caption is
   composed from those three strings rather than written here. That keeps the
   NL pass with one place to translate and makes the caption incapable of
   drifting out of step with the table head directly below it. */
const DATUM_LABEL = same("Assurance");

const CAPTION_PARTS = [
  REGULATORY.frameworkLabel,
  REGULATORY.relevanceLabel,
  REGULATORY.supportLabel
] as const;

const CAPTION = {
  en: CAPTION_PARTS.map((label) => label.en).join(" · "),
  nl: CAPTION_PARTS.map((label) => label.nl).join(" · ")
};

export function Regulatory({ locale }: { locale: Locale }) {
  return (
    <SectionC
      id="regulatory"
      index="10"
      datumLabel={DATUM_LABEL}
      heading={REGULATORY.h2}
      lead={REGULATORY.intro}
      caption={CAPTION}
      locale={locale}
    >
      <StaticTable
        minWidth="62rem"
        head={CAPTION_PARTS.map((label) => pick(label, locale))}
        rows={REGULATORY.rows.map((row) => {
          const framework = pick(row.framework, locale);
          /* `englishOnly` is READ, never inferred from the href. Clearing the
             flag in content.regulatory.ts the day /assurance renders `nl`
             retires the gate without this file being touched. */
          const href = !row.href
            ? undefined
            : row.englishOnly && locale !== "en"
              ? localePath(locale, PATHS.consulting)
              : localePath(locale, row.href);

          return [
            href ? (
              <Link
                key={row.id}
                href={href}
                className="text-primary-ink underline-offset-4 hover:underline focus-visible:underline"
              >
                {framework}
              </Link>
            ) : (
              framework
            ),
            pick(row.relevance, locale),
            pick(row.support, locale)
          ];
        })}
      />
    </SectionC>
  );
}
