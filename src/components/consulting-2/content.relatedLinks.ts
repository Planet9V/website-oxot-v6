/**
 * RELATED LINKS — the page's outbound set, for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, L528–L537, "Suggested internal links". Ten entries, in the
 * source's own order.
 *
 * THE LABELS ARE WRITTEN HERE; THE DESTINATIONS ARE RESOLVED HERE. This file is
 * unlike every other content slice on this page, and the difference is worth
 * stating plainly rather than leaving a reader to infer it. Elsewhere in
 * `consulting-2/` a doc comment cites the line a string was transcribed from,
 * and the honest note is "nothing is invented". Here the source supplies only a
 * list of PATHS — no link text at all — and six of those ten paths do not
 * resolve in this application. So:
 *
 *   - Every `href` below is a ROUTING DECISION checked against the real route
 *     table (`PATHS`, src/components/shell/nav.ts). Four match what the brief
 *     proposed; six had to be re-pointed. The comment on each row records which
 *     it is, so no future reader has to re-derive it.
 *   - Every `label` below is WRITTEN COPY, not a transcription. The brief names
 *     no link text. Raw URL paths are not used as labels — "/assurance/
 *     evidence-data-provenance" is a route, not something a person reads — so
 *     each label is the plainest description of the destination that a visitor
 *     scanning a link list can act on.
 *
 * WHY THE BRIEF'S PATHS DO NOT WORK. L528–L531 use a `/platform/*` scheme:
 * `/platform/cyber-digital-twin`, `/platform/decisions`,
 * `/platform/decisions/fix-first`, `/platform/decisions/change-safely`. There
 * is no `/platform` segment in this application — the nav's "Platform" item
 * points at `/how-it-works`, and the pages the brief is reaching for live at
 * `/cdt-2` and `/decisions/*`. L535's `/resources/technical-specification` is
 * wrong the same way: the page exists, at `/technical-specification`, one level
 * up from where the brief looked. Shipping any of the six as written would put
 * six 404s in a link list whose entire job is to send readers somewhere.
 *
 * NO NEW COPY BEYOND THE LABELS. This file adds no headline, no lead sentence,
 * no per-link description and no section prose — the brief's L528–L537 is a
 * bare list under a builder-facing heading ("Suggested internal links"), which
 * is production vocabulary and is not printed at a visitor. A component that
 * renders these supplies its own heading; it does not get one from here.
 *
 * ZERO NUMERIC CLAIMS. No percentage, currency, duration, count, customer name
 * or certification appears in L528–L537 or below. "IEC 62443" in one label is a
 * standard designation the brief itself uses throughout, not a measurement.
 *
 * ORDER IS THE SOURCE'S. L528 → L537, unchanged. It is not a ranking and not a
 * recommended reading sequence; nothing downstream may number these, rank them,
 * or draw them as a path.
 *
 * PATHS, NOT STRINGS, AND NEVER A LOCALE. Every href is built from `PATHS` so a
 * route rename moves this list with it instead of stranding it. Paths are
 * stored locale-free and prefixed at render — never write `/en/...` here. The
 * one `#` anchor is appended to a `PATHS` value, not hard-coded alongside it.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { PATHS } from "@/components/shell/nav";
import { same } from "./content";

/**
 * One outbound link.
 *
 * Deliberately just a label and an href. There is no `description` field and no
 * `icon` field, because the source supplies neither and a slot invites an
 * invention: a one-line summary written to fill a card would be this page's
 * least grounded copy sitting in its most clickable position.
 */
export interface RelatedLink {
  /** DOM identity, not copy. Never derive from array position, never
   *  translate. */
  id: string;
  /** Written here, not transcribed — the brief gives no link text. */
  label: Bilingual;
  /** Resolved against the real route table. Locale-free. */
  href: string;
}

export const RELATED_LINKS = [
  {
    id: "cyber-digital-twin",
    /* L528 proposed `/platform/cyber-digital-twin`. RE-POINTED: `/platform`
       does not exist. `/cdt-2` is the Twin's one destination (`/twin` is
       retired and 308-redirects there — see shell/nav.ts), deep-linked to
       `#engine`, the section that answers what this link promises. */
    label: same("The Cyber Digital Twin"),
    href: `${PATHS.cdt2}#engine`
  },
  {
    id: "decisions",
    /* L529 proposed `/platform/decisions`. RE-POINTED: `/platform` does not
       exist. `/decisions` is the real Four Decisions index (built 2026-08-30).
       `/cdt-2#decide` carries the same material inside the CDT page and is a
       live alternative, but the standalone index is the better destination for
       a link list — it is the page whose whole subject is this. */
    label: same("The four decisions we help you make"),
    href: PATHS.decisions
  },
  {
    id: "fix-first",
    /* L530 proposed `/platform/decisions/fix-first`. Correct below the
       `/platform` prefix: `/decisions/fix-first` is real. */
    label: same("What do we fix first?"),
    href: PATHS.decisionFixFirst
  },
  {
    id: "change-safely",
    /* L531 proposed `/platform/decisions/change-safely`. Correct below the
       `/platform` prefix: `/decisions/change-safely` is real. */
    label: same("Can we change it safely?"),
    href: PATHS.decisionChangeSafely
  },
  {
    id: "industries",
    /* L532. Correct as written — no change. */
    label: same("Industries we work in"),
    href: PATHS.industries
  },
  {
    id: "iec-62443",
    /* L533. Correct as written — no change. IEC 62443 is the brief's own
       standard designation, used throughout the consulting page. */
    label: same("IEC 62443 assurance"),
    href: PATHS.assuranceIec62443
  },
  {
    id: "evidence-data-provenance",
    /* L534. Correct as written — no change. */
    label: same("Evidence and data provenance"),
    href: PATHS.assuranceEvidenceProvenance
  },
  {
    id: "technical-specification",
    /* L535 proposed `/resources/technical-specification`. RE-POINTED: that
       path does not exist. The page is real and sits one level up, at
       `/technical-specification` — it is reached from the Resources menu,
       which is likely what put the brief one segment too deep. */
    label: same("Technical specification"),
    href: PATHS.technicalSpecification
  },
  {
    id: "air-gapped-deployments",
    /* L536. Correct as written — no change. This one genuinely is under
       `/resources`, unlike the entry above it. */
    label: same("Air-gapped deployments"),
    href: PATHS.resourcesAirGappedDeployments
  },
  {
    id: "contact",
    /* L537. Correct as written — no change. */
    label: same("Talk to OXOT"),
    href: PATHS.contact
  }
] satisfies readonly RelatedLink[];

/* GAP, FLAGGED NOT FILLED: the brief groups these ten under no headings, gives
   no link text, no per-link description, and no statement of why a reader
   should follow any one of them. Labels are written here because a link list
   cannot render without them; nothing further is invented to dress them. */
