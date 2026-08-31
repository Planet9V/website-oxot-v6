/**
 * IEC 62443 UNDERNEATH THE SERVICES — content slice for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, L437–L469. Every exported string carries the source line it was
 * transcribed from. Nothing is invented.
 *
 * A DERIVATION CHAIN, NOT A STACK. L443–L455 is a fenced block of six labels
 * joined by downward arrows. Each level is DERIVED FROM the one above it — you
 * cannot partition into zones and conduits until you know the assets, and you
 * cannot know the assets until the system under consideration is defined. It is
 * NOT a physical stack, not a network hierarchy, and emphatically not a Purdue
 * diagram. `derivedFrom` names the predecessor explicitly so the dependency is a
 * stated fact rather than something a reader has to infer from vertical order.
 *
 * RENDERING CONSTRAINT, BINDING: this chain must never be rendered as a layered
 * architecture stack, and never with sticky per-layer scroll. The page's
 * composition rules forbid a deep seven-layer architecture treatment, and a
 * stacked rendering would additionally assert a physical containment
 * relationship the source does not state.
 *
 * THIS SECTION STAYS SHORT AND HANDS OFF. It exists to show that all six
 * services rest on one model, then send the reader onward — L469's CTA is the
 * section's exit, and `ctaHref` points at `/assurance/iec-62443`. Nothing here
 * may grow into a second explanation of IEC 62443; that explanation lives on the
 * assurance page.
 *
 * ZERO NUMERIC CLAIMS. The only numerals in L437–L469 are the standard
 * designation "IEC 62443" and the source's own spelled-out count of the services
 * on this page ("all six services", L439). Neither is a performance, duration,
 * coverage or compliance claim, and nothing downstream may turn the chain's six
 * links into a progress bar, a score or a completion percentage.
 *
 * NOT CLAIMED: that OXOT is certified to IEC 62443, that following this model
 * produces compliance, or that any target security level is achieved. L457–L465
 * describe what the standard PROVIDES ("vocabulary and engineering structure")
 * and hedge deliberately — "where applicable" at L463 is load-bearing and ships
 * exactly as written.
 *
 * EXCLUDED CITATION: the source's citation at L433 — immediately above this
 * section, supporting the engagement-models table — is a presigned S3 URL
 * carrying an `Expires=` parameter and an embedded access key. It is a
 * short-lived credentialed link, not a publishable reference, so it is not
 * transcribed anywhere in this file and must not be shipped. Contrast L298's
 * webstore.iec.ch link, a stable publisher URL, which does ship (see
 * ./content.services.a).
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "./content";

/** One link in the source's derivation chain. */
export interface DerivationLink {
  /** DOM identity, not copy. Never derive it from array position. */
  id: string;
  /** Position in the source's chain. A fact about the chain's reading order,
   *  not a layer number, a Purdue level or a maturity stage. */
  index: string;
  /** The level's label, verbatim from the source's fenced block. */
  label: Bilingual;
  /** The id of the level this one is derived from — `null` for the first, which
   *  is derived from nothing. This is the relationship the source's arrows
   *  state, made explicit so no renderer has to infer it from order. */
  derivedFrom: string | null;
}

export const IEC = {
  /** Section anchor, matching ANCHORS in ./content. */
  sectionId: "iec-62443",
  /** Source L437 — the source's own section title. */
  datumLabel: same("IEC 62443 underneath the services"),
  /** Source L439. "Six" counts the service cards on this page; it is the
   *  source's own word, not a claim about delivery, coverage or scale. */
  h2: same("The architecture underneath all six services."),
  /** Source L441, the line that introduces the chain. */
  lead: same("Every consulting service rests on the same system model:"),

  /** Source L444–L454. Six levels, each derived from the one above. See the
   *  file header: this is a derivation chain and must not be rendered as a
   *  layered architecture stack or with sticky per-layer scroll. */
  chain: [
    {
      id: "system-under-consideration",
      index: "1",
      /** Source L444. */
      label: same("System under consideration"),
      derivedFrom: null
    },
    {
      id: "assets-and-functions",
      index: "2",
      /** Source L446. */
      label: same("Assets and operational functions"),
      derivedFrom: "system-under-consideration"
    },
    {
      id: "zones-and-conduits",
      index: "3",
      /** Source L448. */
      label: same("Zones and conduits"),
      derivedFrom: "assets-and-functions"
    },
    {
      id: "pathways-and-dependencies",
      index: "4",
      /** Source L450. */
      label: same("Cyber pathways and dependencies"),
      derivedFrom: "zones-and-conduits"
    },
    {
      id: "consequence-and-target-protection",
      index: "5",
      /** Source L452. */
      label: same("Consequence and target protection"),
      derivedFrom: "pathways-and-dependencies"
    },
    {
      id: "control-design-and-evidence",
      index: "6",
      /** Source L454. */
      label: same("Control design, implementation, and evidence"),
      derivedFrom: "consequence-and-target-protection"
    }
  ] satisfies readonly DerivationLink[],

  /** Source L457, the line introducing the points below. */
  structureLead: same(
    "IEC 62443 provides the vocabulary and engineering structure for this work:"
  ),

  /** Source L459–L465, in the source's order. These describe what the standard
   *  supplies; they are not a checklist of work completed and must not be
   *  rendered with completion or progress states. */
  structurePoints: [
    /** Source L459. */
    same("Define the system under consideration."),
    /** Source L460. */
    same(
      "Understand assets, functions, interfaces, and operational boundaries."
    ),
    /** Source L461. */
    same("Partition the environment into zones and conduits."),
    /** Source L462. */
    same("Assess risk according to realistic consequence and pathway."),
    /** Source L463. The hedge "where applicable" is the source's and is
     *  load-bearing — it ships intact. */
    same("Establish target security levels where applicable."),
    /** Source L464. */
    same("Define controls and security requirements."),
    /** Source L465. */
    same("Maintain evidence through operation and change.")
  ],

  /** Source L467, printed by the source as a bold blockquote. */
  pullQuote: same(
    "Get the boundary wrong, and every control after it protects the wrong thing."
  ),

  /** Source L469. This CTA is the section's exit; the deep IEC 62443 material
   *  lives on the assurance page, not here. */
  cta: same("Explore IEC 62443 assurance"),
  ctaHref: "/assurance/iec-62443"

  /* GAP, FLAGGED NOT FILLED: the source names target security levels (L463) but
     states no SL value, no zone example, no conduit example and no worked
     partition anywhere in L437–L469. None is invented. A fabricated SL rating or
     example zone map would read as this section's most concrete engineering
     claim while being its least grounded one. */
};
