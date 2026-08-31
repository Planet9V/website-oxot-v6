/**
 * The four reference tables on /assurance, split out of content.ts to keep
 * both files under the 500-line rule — the same split
 * `src/components/assurance/iec-62443/content-tables.ts` and
 * `src/components/assurance/ts-50701/content-tables.ts` already make.
 *
 * Head/row pairs, transcribed verbatim from
 * `new_material_source/1_website_layout_v4/4_assurance/assurance_overview_2.md`.
 * Rows stay `string[]` to match `DataTable`'s signature: four tables with
 * different column counts are better served by one honest primitive than by a
 * type parameter nobody reads.
 */

/** "The assurance problem" — failure mode against its consequence. */
export const FRAGMENTED_HEAD = ["Fragmented approach", "Assurance consequence"] as const;

export const FRAGMENTED_ROWS = [
  ["Asset register and engineering drawings disagree", "Scope and criticality are uncertain"],
  ["Zone diagrams do not reflect actual communication routes", "Segmentation claims cannot be validated"],
  [
    "Safety records are separate from cyber analysis",
    "Cybersecurity assumptions beneath safety barriers remain hidden"
  ],
  [
    "SBOMs are not linked to product interfaces or deployment context",
    "Vulnerability impact cannot be assessed efficiently"
  ],
  [
    "Supplier information sits outside the technical model",
    "Support, firmware, cloud, spare, and lifecycle dependencies are overlooked"
  ],
  [
    "Risk treatment is documented without a modeled control effect",
    "Teams cannot show what route was closed or what residual risk remains"
  ],
  [
    "Change control is document-based only",
    "Configuration drift, new suppliers, and new pathways silently invalidate old evidence"
  ],
  ["Reporting is manually assembled", "Evidence becomes stale between audits, projects, releases, or reviews"]
] as const;

/** "One model, many assurance views" — what changes. */
export const CHANGE_HEAD = ["Traditional approach", "OXOT assurance model"] as const;

export const CHANGE_ROWS = [
  ["Documents created separately for each framework", "One grounded model produces framework-specific views"],
  [
    "Asset inventory, risk register, network diagram, safety evidence, and supplier records managed independently",
    "Assets, requirements, hazards, pathways, dependencies, controls, and evidence are connected"
  ],
  [
    "Vulnerability severity used as a proxy for risk",
    "Reachability and operational, product, or safety consequence are modeled explicitly"
  ],
  [
    "Security controls recorded as implemented",
    "The model shows what pathway a control closes, what it preserves, and what residual route remains"
  ],
  [
    "Safety and cybersecurity managed in parallel",
    "Cyber pathways are linked to safety assumptions, functions, barriers, and degraded modes"
  ],
  [
    "Product documentation is rebuilt around each release",
    "Version, component, supplier, interface, and vulnerability changes produce documentation deltas"
  ],
  [
    "Risk acceptance becomes forgotten technical debt",
    "Deferrals have owner, rationale, compensating controls, review trigger, and expiry"
  ],
  ["Audit preparation is a project", "Evidence is maintained as the model evolves"]
] as const;

/** "Assurance frameworks" — the five areas and what each connects. */
export const FRAMEWORK_HEAD = ["Framework", "Primary focus", "What OXOT helps connect"] as const;

export const FRAMEWORK_ROWS = [
  [
    "IEC 62443",
    "Industrial automation and control system cybersecurity",
    "Systems under consideration, zones, conduits, target-security-level reasoning, asset and network context, risk treatment, and control evidence"
  ],
  [
    "Cyber Resilience Act",
    "Cybersecurity of covered products with digital elements placed on the EU market",
    "Product architecture, component and supplier dependencies, BOMs, vulnerabilities, secure lifecycle evidence, and technical-documentation workflows"
  ],
  [
    "TS 50701",
    "Railway cybersecurity across the application lifecycle",
    "Railway assets, operational and cyber pathways, safety/RAMS context, security engineering, supplier dependencies, and lifecycle evidence"
  ],
  [
    "IEC 62278-2:2025",
    "Railway systems approach to safety",
    "System definition, hazards, safety objectives, requirements, safety assumptions, allocation, validation, safety argument, and change impact"
  ],
  [
    "Evidence & Data Provenance",
    "Trustworthiness of every framework output",
    "Source grounding, citations, transparent assumptions, drillable calculation paths, evidence ownership, change history, and visible gaps"
  ]
] as const;

/** "Evidence and data provenance" — the principles every output is held to. */
export const PRINCIPLE_HEAD = ["Principle", "What it means"] as const;

export const PRINCIPLE_ROWS = [
  [
    "Grounding first",
    "Retrieve real engineering, asset, safety, RAMS, product, configuration, supplier, and operational evidence before synthesizing a result"
  ],
  [
    "No fabrication",
    "Do not invent asset relationships, risk values, supplier facts, safety assumptions, product controls, or operational consequences"
  ],
  [
    "Null over zero",
    "Unknown information remains visibly unknown; it is not silently treated as zero risk, no dependency, or not applicable"
  ],
  [
    "Citations retained",
    "External vulnerability, threat, supplier, financial, standards, and contextual inputs retain their source reference"
  ],
  [
    "Drillable reasoning",
    "Move from a board-level output to a system, zone, product version, asset, pathway, safety requirement, hazard, source artifact, and assumption"
  ],
  [
    "Change-aware evidence",
    "A changed component, firmware release, supplier, network route, configuration, hazard assumption, or control creates a visible delta"
  ],
  [
    "Fact, assumption, and calculation separated",
    "Customer evidence, external data, approved assumptions, and OXOT model outputs remain distinguishable"
  ],
  [
    "Accountable decision records",
    "Risk treatment, acceptance, compensating controls, verification, review date, expiry, owner, and approval can be attached to the model"
  ]
] as const;
