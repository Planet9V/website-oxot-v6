/**
 * /resources/air-gapped-deployments — the Air-Gapped & Sovereign Deployment
 * Briefing. Copy and labels; the registers themselves are in
 * ./content-register.ts, so neither file approaches the 500-line limit.
 *
 * THIS IS NOT /deployment-sovereignty AND MUST NOT BECOME IT. That page is
 * the Platform section's long-form argument: ten numbered prose sections, a
 * contents rail, three drawn trust-boundary diagrams and a pull quote,
 * written for a reader being persuaded. resources_overview.md files
 * "Air-Gapped Deployments" separately, under Resources > Technical
 * Documents, beside the Product Sheet and the Technical Specification,
 * with the explicit instruction that those cards are "for higher-intent
 * technical evaluators" and must be "more document-like and less
 * editorial". The reader intent the same file assigns that group is
 * "Evaluate the platform" — someone checking whether a mode is approvable
 * before booking anyone's time.
 *
 * SO THIS IS A BRIEFING SHEET, NOT A SECOND ESSAY. Every block is a
 * register: a document-control table, numbered invariants, a mode matrix
 * read across three columns, a mandatory-elements register with an owner
 * per line, an accepted-inputs list with the form each export arrives in,
 * and a stated-limitations register. There is no hero image, no diagram, no
 * pull quote and no narrative section — the diagrams live on
 * /deployment-sovereignty and this page links to them rather than redrawing
 * them.
 *
 * FACTS AGREE WITH THAT PAGE; SENTENCES DO NOT REPEAT IT. The mode names,
 * the passive-first commitment, the mandatory technical elements and the
 * three intelligence-refresh options are the same because they are the same
 * product, sourced from new_material_source/1_website_layout_v4/
 * 6_resources/air-gapped_deployment.md. They are restated here in register
 * form — clipped, attributed, ID-numbered — rather than transcribed. The
 * Platform page's components are read-only reference and nothing here
 * imports from them.
 *
 * NOTIONAL AND SYNTHETIC. No real site, programme, classified system or
 * customer topology is named or described.
 *
 * `Bilingual` via `same()` — both locales render, `nl` is a same-as-English
 * placeholder pending translation, not a claim of correct Dutch. Grep
 * `same(` when the translation pass starts.
 */
import { same } from "@/components/industries/registry";

/** This page's locale-free path. Deliberately not in PATHS: nav.ts is the
 *  integration owner's file and route registration is handled separately —
 *  the same position /deployment-sovereignty and /resources/product-sheet
 *  are in. */
export const BRIEFING_PATH = "/resources/air-gapped-deployments";

/** The Resources index this briefing sits under, for the breadcrumb. */
export const RESOURCES_PATH = "/resources";

export const META = {
  title: "Air-Gapped & Sovereign Deployment Briefing | Technical document",
  description:
    "Reference briefing on the three OXOT Cyber Digital Twin deployment modes — Island Mode, Inbound Intelligence Mode and Dedicated Sovereign Instance — with the mandatory technical elements, accepted engineering inputs, intelligence-refresh options and stated limitations for each."
};

export const BREADCRUMB = {
  resources: same("Resources"),
  here: same("Air-gapped deployments")
};

export const MASTHEAD = {
  kicker: same("Technical document"),
  h1: same("Air-Gapped & Sovereign Deployment Briefing"),
  abstract: same(
    "A reference summary of how the OXOT Cyber Digital Twin deploys inside a controlled environment: three modes, what crosses each boundary, and the technical elements every mode requires. Written to be checked against, not read through."
  ),
  /** The document-control block. Key on the left, value on the right, in the
   *  order an evaluator reads them: what it is, what it covers, who it is
   *  for, what it is not. */
  control: [
    { k: same("Document"), v: same("Air-Gapped & Sovereign Deployment Briefing") },
    { k: same("Subject"), v: same("OXOT Cyber Digital Twin — deployment modes and boundary conditions") },
    { k: same("Audience"), v: same("Security authority, accreditor, OT engineering lead, technical evaluator") },
    { k: same("Applies to"), v: same("All three deployment modes. The passive-first posture applies without exception.") },
    {
      k: same("Status"),
      v: same("Reference summary. Not a contractual specification and not an accreditation submission.")
    },
    { k: same("Basis"), v: same("Notional and synthetic throughout. No customer site or classified system is described.") }
  ]
};

export const SCOPE = {
  id: "scope",
  n: "01",
  clause: same("Scope"),
  title: same("What this briefing covers, and where the full treatment lives."),
  rows: [
    {
      k: same("In scope"),
      v: same(
        "Deployment boundary per mode, permitted flows and their direction, mandatory technical elements, accepted engineering inputs, intelligence-refresh options, stated limitations."
      )
    },
    {
      k: same("Out of scope"),
      v: same(
        "Commercial terms, sizing and infrastructure specification, engagement model, the modelling method itself, and any assessment of a specific environment."
      )
    },
    {
      k: same("Read with"),
      v: same(
        "The deployment narrative, which carries the drawn trust-boundary diagram for each mode and the governance argument this register summarises. Linked in full at the foot of this document."
      )
    },
    {
      k: same("Determined by"),
      v: same(
        "Your security authority. The modes are three answers to one governance question, not a good/better/best ladder — the right one is whichever is approvable on your ground."
      )
    }
  ]
};

export const INVARIANTS = {
  id: "invariants",
  n: "02",
  clause: same("Invariants"),
  title: same("Conditions that hold in every mode, and are not configurable."),
  note: same(
    "These are properties of the product rather than of a deployment option, which is why they are stated once here instead of once per mode in the matrix below."
  )
};

export const MODES = {
  id: "modes",
  n: "03",
  clause: same("Mode register"),
  title: same("Three deployment modes, compared attribute by attribute."),
  note: same(
    "The modes differ in exactly one respect: what crosses the boundary, and in which direction. Every other row is either identical across all three or a consequence of that single difference."
  ),
  figureLink: same("See each boundary drawn, with a plain-language equivalent"),
  /* The table's caption, so it has an accessible name that says what it
     contains — and, second, the fact that it scrolls, which a reader on a
     phone needs told rather than left to discover. */
  caption: same("Three deployment modes compared across eleven attributes. Scrolls horizontally on narrow screens.")
};

export const ELEMENTS = {
  id: "elements",
  n: "04",
  clause: same("Mandatory technical elements"),
  title: same("Ten elements to agree with your security authority before anything is built."),
  note: same(
    "Each carries an owner. An element held by the customer is one OXOT cannot supply and will not claim to; an element held by OXOT is a product commitment, not a deployment setting."
  ),
  ownerLegend: same("Owner — C: customer-held · O: OXOT product commitment · J: agreed jointly before deployment")
};

export const INPUTS = {
  id: "inputs",
  n: "05",
  clause: same("Accepted inputs"),
  title: same("The model is built from engineering exports you already hold."),
  note: same(
    "Every mode imports the same classes of material through the same approval workflow. Nothing on this list is produced by a security scanner; each item is reviewable, can be malware-scanned and signed on the way in, and keeps its provenance so a conclusion can be traced back to it."
  ),
  gap: same(
    "Where a field has no source the model shows it empty rather than inventing a value. Reconciling the record against reality is part of the engagement, not a precondition for starting it."
  )
};

export const INTEL = {
  id: "intelligence",
  n: "06",
  clause: same("Intelligence refresh"),
  title: same("Three approved ways to keep external data current across the boundary."),
  note: same(
    "An isolated Twin cannot pull live threat, CVE or supplier feeds automatically. That is a governance decision about who carries the update, not a limit on what the model can reason over."
  ),
  close: same(
    "In all three, the package is signed, versioned and reversible, and each feed clears an approval gate before it lands. An update that cannot be reviewed before it applies is not one an accredited environment accepts."
  )
};

export const LIMITS = {
  id: "limits",
  n: "07",
  clause: same("Stated limitations"),
  title: same("Pathways an air gap does not close."),
  note: same(
    "Air-gapped is not a safety claim. Its effectiveness depends on the whole operational boundary, and that boundary is wider than the network diagram. OXOT models these pathways and their consequences; it does not treat the absence of an internet route as evidence that they are closed."
  ),
  notHead: same("What this document does not claim"),
  notItems: [
    same("That any listed mode is approvable in your environment. Only your security authority determines that."),
    same("That isolation is free of trade-offs. External data arrives on your import schedule, not continuously."),
    same("That the modes are exhaustive. A boundary outside this register is a design conversation, not a setting.")
  ]
};

export const RELATED = {
  id: "related",
  n: "08",
  clause: same("Related documents"),
  title: same("Where to go next, depending on what you are checking."),
  cta: same("Request a technical briefing"),
  ctaFine: same(
    "The productive first conversation is an hour with your security authority and your OT engineering lead: which mode is approvable, what the import workflow looks like, and which single facility the first model covers."
  )
};
