import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/** Only the nav slice, so callers never have to hand over the whole
 *  dictionary — which for a client component would mean serializing every
 *  page's body copy into the payload to render four labels. */
type NavCopy = Dictionary["nav"];

/**
 * The five destinations, in one place, so the header and the footer can never
 * disagree about what this site contains.
 *
 * THE RULE THIS FILE ENFORCES: every top-level item navigates. The previous
 * site's navigation had two top-level entries — "Cyber Digital Twin" and "CRA
 * Readiness" — that were dropdown triggers with children and no destination of
 * their own. A reader who clicked the thing they came for got a panel, not a
 * page.
 *
 * CRA GAINED CHILDREN ON 2026-08-08, AND THE RULE STILL HOLDS. "CRA" is a link
 * to /cra exactly as before; the chevron beside it is a separate control that
 * discloses two pages which had no route into them from the bar at all.
 * /retainer is the highest-value offer on the site and was reachable only from
 * inside three pages. That is the failure the old dropdowns caused, arriving
 * from the other direction — so: a link AND a disclosure, never a trigger.
 *
 * CRA LOST ITS CHILDREN AND ITS TOP-LEVEL SLOT ON 2026-08-21 (owner). Your CRA
 * Class and the Conformity Application dropped out of the bar — both pages
 * are still live, just reached from inside /cra itself now, not the nav.
 * /retainer lost its nav entry the same day, for the same reason: this
 * component has no dropdown nested inside a dropdown, and "CRA" itself moved
 * from a top-level link to a flat entry inside Consulting's own dropdown,
 * right after IEC 62443 — the method, then the regulation it satisfies.
 * Insights (under Company) and Facility Due Diligence (under Consulting) lost
 * their nav entries the same day, for unrelated reasons; both pages are still
 * live and still linked from elsewhere on the site.
 *
 * CRA WAS PULLED ENTIRELY ON 2026-08-21 (owner, later same day). Not a nav
 * trim this time — the business decision was to stop selling it for now, so
 * /cra, /check, /retainer and /conformity are gone (404, no redirect), not
 * just unlinked. Consulting's dropdown carries only IEC 62443 now. `theAsk()`
 * is gone with it — its only destination was /check.
 *
 * Paths are stored WITHOUT the locale and prefixed at build time. That is the
 * seam CLAUDE.md §3 requires: the language of a URL is a routing concern, and
 * a hard-coded `/en/cra` anywhere in a component is a Dutch bug waiting to
 * happen. It is also what lets the language switch send a reader to the same
 * page in the other language rather than dumping them on the homepage.
 */

export interface Destination {
  href: string;
  label: string;
  /** Sub-destinations. The parent still navigates; these hang under it. */
  children?: Destination[];
}

/** Locale-free paths. The single source for "what pages exist". */
export const PATHS = {
  /* / IS THE FORMER /home-2, 2026-08-22 (owner) — the from-scratch homepage
     rebuild (docs/home-2-plan/) is no longer a comparison build standing
     beside the original; its content became the real homepage and the
     original root page.tsx is retired. PATHS.home2 no longer exists — do
     not re-add it; there is only one homepage again.

     / IS NOW /cdt-2's FORMER CONTENT, 2026-08-31 (owner: "make the CDT-2
     into the home page, archive the current home page, keep the rest the
     same") — the Home-2 build described above is itself now retired to
     PATHS.homeLegacy below, verbatim, not deleted. See
     src/app/[locale]/page.tsx's own docblock for the full account,
     including the CDT-2 CTA locale fixes this promotion required. */
  home: "",
  /* The retired Home-2 homepage, archived 2026-08-31 rather than deleted —
     not in primaryNav, not linked from any page, `robots: noindex`'d in
     its own metadata. Kept for reference/rollback only. */
  homeLegacy: "/home-legacy",
  consulting: "/consulting",
  company: "/company",
  contact: "/contact",
  /* Facility Due Diligence. Lost its nav entry on 2026-08-21 (owner); still
     live at /facility-due-diligence and still linked from the homepage
     section that describes it. */
  fdd: "/facility-due-diligence",
  /* Track Record was unified into Use Cases 2026-08-21 (owner), then Use
     Cases itself was retired into Case Studies 2026-08-22 (owner) — the
     prose-index layout at /use-cases is gone, and /case-studies (added the
     same day for Home-2's card grid) is now the one canonical "Use Cases"
     area. Old /use-cases URLs 308-redirect to their /case-studies
     equivalent; see next.config.ts. PATHS.useCases intentionally no longer
     exists — do not re-add it without also reviving the page it pointed to. */
  caseStudies: "/case-studies",
  reference: "/reference",
  /* Assurance and Technical Specification, added 2026-08-22 (owner request)
     — the two destinations platform_critique_review.md's ICE review flagged
     as blocking a /cdt-2 restructure: the detailed IEC 62443/compliance
     material and the detailed engine/seven-layer/lenses material each get a
     real home instead of living inline on /cdt-2. Real, live, theme-reactive
     pages (not /cdt-2's fixed dark palette — these aren't comparison builds).
     Reachable via links from /cdt-2 and /consulting; not in primaryNav, same
     precedent as /case-studies. EN-only for now, matching every other page
     this session shipped EN-only pending translation. */
  assurance: "/assurance",
  /* Assurance framework split, 2026-08-23 (owner request, site-tree.md) — the
     single /assurance overview page now links out to five standalone
     framework pages built from new_material_source/1_website_layout_v4/
     4_assurance/*.md. Unlike /assurance itself, these five render both
     locales (Bilingual, nl = same-as-English placeholder) — the EN-only
     precedent above was specific to /assurance and /technical-specification,
     not extended here. Not in primaryNav yet, reachable via the /assurance
     index. */
  assuranceIec62443: "/assurance/iec-62443",
  assuranceCra: "/assurance/cyber-resilience-act",
  assuranceTs50701: "/assurance/ts-50701",
  /* Corrected 2026-08-23: was "/assurance/iec-62278-1" — the page is
     genuinely about Part 2 (systems approach to safety), matching
     site-tree.md's own "IEC 62278-2:2025" entry. See iec-62278-2/page.tsx's
     doc comment for the full account. */
  assuranceIec62278: "/assurance/iec-62278-2",
  assuranceEvidenceProvenance: "/assurance/evidence-data-provenance",
  technicalSpecification: "/technical-specification",
  /* CDT-2 IS NOW THE ONLY CYBER DIGITAL TWIN DESTINATION, 2026-08-22 (owner)
     — /twin (the original pillar page this stood beside for comparison) is
     retired; /twin now 308-redirects here (next.config.ts). Every internal
     link that used to point at PATHS.twin (ThreeDoors, Onward links across
     a dozen pages) now points at PATHS.cdt2 directly instead of relying on
     the redirect, per the no-extra-hop rule this file's own header
     explains. PATHS.twin no longer exists — do not re-add it.

     /cdt-2 ITSELF RETIRED 2026-08-31 (owner: "make the CDT-2 into the home
     page") — its content is now PATHS.home, and /cdt-2 permanently
     redirects there (next.config.ts). PATHS.cdt2 IS DELIBERATELY KEPT,
     UNCHANGED, rather than deleted like PATHS.twin was: ~100 other files
     across the site still reference it via `localePath(locale, PATHS.cdt2)`
     for outbound "learn more about the Cyber Digital Twin"-style links, and
     rewriting all of them was explicitly out of scope for this promotion
     (owner: "keep the rest the same") — each one now takes a single,
     standard redirect hop rather than a broken link, which does not
     warrant a site-wide rewrite. The one exception is primaryNav's own
     "CDT-2" entry immediately below, repointed directly at PATHS.home —
     see its comment for why a permanent, always-clicked nav control gets
     the no-extra-hop treatment that a one-off prose link does not. */
  cdt2: "/cdt-2",
  /* Platform sub-pages + Decisions, added 2026-08-23 (owner request,
     site-tree.md) — built from new_material_source/1_website_layout_v4/
     2_platform/*.md and OXOT_Visual_Foundation_Spec.md's Four Decisions /
     Baseline-vs-Virtual-Control deliverables. All four render both locales
     (Bilingual, nl = same-as-English placeholder). Not in primaryNav yet,
     same "Phase 6" status as Industries below. CDT-2 itself is untouched —
     these pages reuse its proven narrative content for consistency but do
     not import from or modify it. */
  howItWorks: "/how-it-works",
  deploymentSovereignty: "/deployment-sovereignty",
  integrations: "/integrations",
  workWithOxot: "/work-with-oxot",
  decisions: "/decisions",
  decisionFixFirst: "/decisions/fix-first",
  decisionInvestment: "/decisions/investment",
  decisionChangeSafely: "/decisions/change-safely",
  decisionRiskAcceptance: "/decisions/risk-acceptance",
  /* Resources, added 2026-08-23 (owner request, site-tree.md +
     6_resources/resources_overview.md). /resources is the hub; the rest
     are its Learn/Proof/Technical Documents destinations. */
  resources: "/resources",
  resourcesInsights: "/resources/insights",
  resourcesGuidesBriefings: "/resources/guides-briefings",
  resourcesGlossary: "/resources/glossary",
  resourcesProductSheet: "/resources/product-sheet",
  resourcesAirGappedDeployments: "/resources/air-gapped-deployments",
  /* Industries, added 2026-08-22 (owner request) — Phase 1 of the
     new_material_source/1_website_layout_v4 implementation. 6 verticals,
     each at /industries/<slug>; Critical Infrastructure excluded (its spec
     file is empty and it's absent from every nav list and cross-reference
     in the source material — confirmed intentionally dropped, not a gap).
     Not in primaryNav yet — that's Phase 6 of the same plan, once the
     other sections (Assurance split, Platform sub-pages, Resources,
     Company rebuild) also exist; a nav overhaul before then would mean a
     dropdown mostly pointing at unbuilt pages.

     BOTH LOCALES RENDER (owner correction, same day) — no locale !== "en"
     guard, unlike /assurance and /technical-specification. Page content is
     `Bilingual`-typed ({en, nl} per string, src/i18n/bilingual.ts) with
     `nl` currently holding the same text as `en` as an honest placeholder,
     not a translation — the owner's instruction is to finish English across
     every page first, then translate, not to block Dutch visitors from the
     page entirely in the meantime. */
  industries: "/industries",
  /* Legal. Not in primaryNav — they belong in the footer, and a legal page is
     the one page class on this site with no ask. */
  privacy: "/privacy",
  cookies: "/cookies",
  terms: "/terms"
} as const;

/** Prefix a locale-free path. `localePath("nl", "")` is `/nl`, not `/nl/`. */
export function localePath(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}

/** The three doors. Order is the argument's order: the destination, the
 *  revenue that bills today, then who we are (vision §5). */
export function primaryNav(locale: Locale, nav: NavCopy): Destination[] {
  return [
    /* THE TOP-LEVEL "CDT-2" ENTRY WAS REMOVED HERE, 2026-08-31 (owner,
       fresh explicit instruction superseding the entry's own prior
       "do not delete" note). It carried a 2026-08-22 disclosure of seven
       in-page anchors (id="decide" etc. in src/components/cdt2/*.tsx) that
       existed because /cdt-2 needed a way to jump to its own sections.
       When /cdt-2's content was promoted to PATHS.home the same day (see
       that PATHS.home comment above), this entry got repointed rather than
       removed — but a persistent nav item labelled "CDT-2" pointing at the
       exact same URL as the OXOT logo was a redundant control, and the
       owner asked how to preserve the seven direct section links without
       it. Answer: they now render as an in-page jump list on the homepage
       itself (`Cdt2SectionNav`, rendered inside `Cdt2Hero.tsx`) — same
       seven anchors, same targets, moved rather than dropped. Global nav is
       for moving BETWEEN pages; an in-page list is for moving around
       WITHIN one, which is the more idiomatic home for links that only
       ever pointed at sections of a single page. */
    {
      href: localePath(locale, PATHS.howItWorks),
      label: "Platform",
      /* Added 2026-08-23 (owner request, site-tree.md). Reuses CDT-2's proven
         narrative content for consistency but does not import from or
         modify it. */
      children: [
        { href: localePath(locale, PATHS.howItWorks), label: "How It Works" },
        { href: localePath(locale, PATHS.decisionFixFirst), label: "What Do We Fix First?" },
        { href: localePath(locale, PATHS.decisionInvestment), label: "What Should We Spend?" },
        { href: localePath(locale, PATHS.decisionChangeSafely), label: "Can We Change Safely?" },
        { href: localePath(locale, PATHS.decisionRiskAcceptance), label: "What Can We Leave Alone?" },
        { href: localePath(locale, PATHS.deploymentSovereignty), label: "Deployment & Data Sovereignty" },
        { href: localePath(locale, PATHS.integrations), label: "Integrations & Data Inputs" },
        { href: localePath(locale, PATHS.workWithOxot), label: "Work With OXOT" }
      ]
    },
    {
      href: localePath(locale, PATHS.industries),
      label: "Industries",
      /* Six verticals, added 2026-08-22, wired into primaryNav 2026-08-23
         (owner request) — previously built and verified but deliberately
         left out of nav pending the other sections; that "Phase 6" gate is
         now cleared.
         REPOINTED TO THE LATEST ITERATION OF EACH, 2026-08-31 (owner
         request) — every vertical below now links to its newest `-N` build
         (all six verified 200 before this change), not the original v1
         page. The v1 routes are untouched and still live, just no longer
         reachable from this menu. Water's latest is `-3` (dated 2026-08-29,
         newest of its three iterations); every other vertical's latest is
         `-2`. */
      children: [
        { href: localePath(locale, `${PATHS.industries}/rail-transportation-2`), label: "Rail & Transportation" },
        { href: localePath(locale, `${PATHS.industries}/energy-utilities-2`), label: "Energy & Utilities" },
        { href: localePath(locale, `${PATHS.industries}/water-wastewater-3`), label: "Water & Wastewater" },
        { href: localePath(locale, `${PATHS.industries}/manufacturing-process-2`), label: "Manufacturing & Process" },
        { href: localePath(locale, `${PATHS.industries}/hyperscale-data-centers-2`), label: "Hyperscale & Data Centers" },
        { href: localePath(locale, `${PATHS.industries}/defense-government-2`), label: "Defense & Government" }
      ]
    },
    {
      href: localePath(locale, PATHS.assurance),
      label: "Assurance",
      children: [
        { href: localePath(locale, PATHS.assuranceIec62443), label: "IEC 62443" },
        { href: localePath(locale, PATHS.assuranceCra), label: "Cyber Resilience Act" },
        { href: localePath(locale, PATHS.assuranceTs50701), label: "TS 50701" },
        { href: localePath(locale, PATHS.assuranceIec62278), label: "IEC 62278-2:2025" },
        { href: localePath(locale, PATHS.assuranceEvidenceProvenance), label: "Evidence & Data Provenance" }
      ]
    },
    {
      href: localePath(locale, PATHS.consulting),
      label: nav.consulting
      /* IEC 62443 CHILD REMOVED, 2026-08-22 (owner) — /iec-62443 is deleted
         and 308-redirects to /assurance. Consulting is a flat link again,
         same as before CRA/IEC 62443 ever had children. Facility Due
         Diligence still has no nav entry, unrelated — still live at
         /facility-due-diligence. */
    },
    {
      href: localePath(locale, PATHS.resources),
      label: "Resources",
      children: [
        { href: localePath(locale, PATHS.resourcesInsights), label: "Insights" },
        { href: localePath(locale, PATHS.resourcesGuidesBriefings), label: "Guides & Briefings" },
        { href: localePath(locale, PATHS.caseStudies), label: "Case Studies" },
        { href: localePath(locale, PATHS.resourcesProductSheet), label: "Product Sheet" },
        { href: localePath(locale, PATHS.technicalSpecification), label: "Technical Specification" },
        { href: localePath(locale, PATHS.resourcesAirGappedDeployments), label: "Air-Gapped Deployments" },
        { href: localePath(locale, PATHS.resourcesGlossary), label: "Glossary" }
      ]
    },
    {
      href: localePath(locale, PATHS.company),
      label: nav.company,
      /* CONTACT WAS ORPHANED, 2026-08-09. `/contact` existed, with a working
         form, and was in neither the nav nor the footer — the only route to it
         was a bare mailto in the footer. A lead-capture page nobody can reach
         captures nothing.

         TRACK RECORD WAS UNIFIED INTO USE CASES, 2026-08-21 (owner), then
         retired into CASE STUDIES, 2026-08-22 (owner). There is now one
         canonical /case-studies page instead of several same-purpose things,
         linked from Company's own services section rather than duplicated
         here.

         REFERENCE LEFT THIS DROPDOWN, 2026-08-22 (owner) — replaced by an
         explicit "About OXOT" child pointing at this item's own /company
         destination. `/reference` stays live, deliberately unlinked from
         nav or footer for now (owner's explicit choice, not an oversight —
         if it needs to come back, the previous entry was
         `{ href: localePath(locale, PATHS.reference), label: nav.reference }`). */
      /* Collaboration and Partners removed 2026-08-23 (owner instruction) —
         both the nav entries and the routes themselves. Neither had real
         spec content behind it (confirmed by reading the entire 7_company/
         folder in full), and the owner does not want speculative
         placeholder pages on the site at all. */
      children: [
        { href: localePath(locale, PATHS.company), label: nav.aboutOxot },
        { href: localePath(locale, PATHS.contact), label: nav.contactNav }
      ]
    }
  ];
}

/**
 * Routes that render their own page-local closing CTA instead of the site's
 * global ContactBand, added 2026-08-22 (owner request). ContactBand renders
 * unconditionally in [locale]/layout.tsx for every route by design — that is
 * correct for every page except a handful with a genuinely more specific ask
 * of their own. This is a suppression list, not an opt-in registry: a route
 * added here is trusted to render its own equivalent CTA; nothing here
 * renders one for it. Locale-free, same convention as PATHS.
 */
export const SUPPRESS_CONTACT_BAND = new Set<string>([
  /* PATHS.cdt2 kept even though /cdt-2 now only exists as a 308 redirect
     (next.config.ts, 2026-08-31) — it never renders this layout any more,
     so the entry is vestigial rather than load-bearing. Left rather than
     removed: harmless, and removing it buys nothing. */
  PATHS.cdt2,
  PATHS.home,
  /* The archived former homepage, 2026-08-31 — still renders its own
     Cdt2ClosingCta, same as PATHS.home did before the promotion. */
  PATHS.homeLegacy,
  `${PATHS.industries}/water-wastewater-2`,
  `${PATHS.industries}/water-wastewater-3`,
  `${PATHS.industries}/energy-utilities-2`,
  `${PATHS.industries}/manufacturing-process-2`,
  `${PATHS.industries}/rail-transportation-2`,
  `${PATHS.industries}/hyperscale-data-centers-2`,
  `${PATHS.industries}/defense-government-2`,
  PATHS.consulting
]);
/* `energy-utilities-2` added 2026-08-26, same condition as water-wastewater-2/
   -3 above: a review-only iteration of the live `energy-utilities` page,
   built via `OXOT_Agent_Build_Pipeline.md`, with its own real page-local
   closing CTA (`IntakeCta.tsx`, S10's full intake form) — suppressing the
   global band avoids duplicating it. `manufacturing-process-2` added the same
   day, same condition, same pipeline — see its own `IntakeCta.tsx`.
   `rail-transportation-2` added the same day, same condition, same pipeline —
   its own `IntakeCta.tsx` (S13) is the page's real closing CTA. */
/* The 6 LIVE industry verticals (e.g. /industries/water-wastewater, the one
   in primaryNav) do NOT suppress the band, 2026-08-22 (owner correction, same
   day PATHS.industries was added) — industries were originally planned as
   fixed-dark comparison pages like /cdt-2, then redirected to be real,
   theme-reactive shadcn-native pages instead (owner decision). Real pages get
   the global ContactBand + ThreeDoors, same precedent as /assurance and
   /consulting — no page-local closing CTA. water-wastewater-2 and -3 ARE
   suppressed, added 2026-08-25 (owner correction to the correction): both are
   review-only iterations of the SAME page built after this 2026-08-22 rule,
   and unlike the live page, both carry a real page-local closing CTA of their
   own (`IntakeCta`, the brief's seven-control qualification intake) — the
   original rule's own stated condition for suppression ("a genuinely more
   specific ask of their own"), just never checked against these two routes
   when they were built. Left unsuppressed, every route with a real custom CTA
   duplicated it under the site's generic "Talk to OXOT" band, which is
   exactly the failure mode this list exists to prevent. water-wastewater-1
   has no IntakeCta of its own, so it correctly stays OFF this list. */
