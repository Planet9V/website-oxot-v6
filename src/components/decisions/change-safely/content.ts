/**
 * DECISION 03 — "Can we change this safely?" — the detailed form, and the
 * "Baseline vs. Virtual Control" foundation deliverable.
 *
 * Source of truth: new_material_source/1_website_layout_v4/
 * OXOT_Visual_Foundation_Spec.md §7 (Deliverable 3), which specifies the
 * scenario, the three required information panels, the semantic state rules
 * and the claim boundaries field for field.
 *
 * Tone and facts are kept consistent with the abbreviated version already
 * shipped on /cdt-2 (src/components/cdt2/content-1.ts, DECISION_03_TEST) —
 * read for consistency, deliberately not imported from: that directory is
 * read-only, and a public detail page should not be able to break a
 * protected page by editing a shared export. PROBLEM and SCOPE restate its
 * approved copy rather than re-exporting it.
 *
 * CLAIM BOUNDARIES ARE LOAD-BEARING HERE, not decoration. §7 requires:
 *   - every scenario carries "Illustrative scenario — no customer data";
 *   - no percentage, monetary value, annual-loss figure or "verified"
 *     language anywhere;
 *   - the vocabulary is "modelled result", "selected pathway", "remaining
 *     route", "decision evidence" — never a claim that a simulation is
 *     running, and never a claim that a modelled closure is a real-world
 *     guarantee;
 *   - safety-sensitive framing states that OXOT supports but does not
 *     replace engineering approval, safety assessment, operational
 *     authority or return-to-service authority (see AUTHORITY).
 * Anything added to this file has to survive all four.
 *
 * THE COMPARISON IS THE POINT. OXOT_content-to-visual-mapping-table.md maps
 * "Proposed control" to a "Before/after route comparison" and names
 * "Checkmark list" as the thing to avoid. So the centrepiece is one route
 * graph described once (NODES) and given two edge-state readings
 * (BASELINE_EDGES, CONTROLLED_EDGES) drawn at identical coordinates, with a
 * route-state table (COMPARISON.delta) underneath. There is no tick-list
 * anywhere in this file.
 *
 * `Bilingual` throughout via the local `same()` — both locales render, `nl`
 * is a same-as-English placeholder pending translation, not a claim that
 * this is correct Dutch. Same convention as the sibling decision pages and
 * the industry pages (src/components/industries/registry.ts).
 */
import type { Bilingual } from "@/i18n/bilingual";

/** Marks a string as "not yet translated", not "translated to itself". */
function same(en: string): Bilingual {
  return { en, nl: en };
}

export const META = {
  title: "Can We Change This Safely? | Test the Change in the Model First",
  description:
    "Test a firewall rule, patch, re-zoning, access change or supplier option in OXOT's Cyber Digital Twin before it reaches the live environment. Baseline route, proposed control, decision output."
};

export const BREADCRUMB = {
  here: same("Can we change this safely?")
};

/** The spec's standing label. Rendered anywhere a scenario appears. */
export const ILLUSTRATIVE = same("Illustrative scenario — no customer data");

export const HERO = {
  kicker: "Decision 03 · Change",
  h1: same("Can we change this safely?"),
  lead: same(
    "Every worthwhile control is also a change to a running plant, and the plant is the one place you cannot rehearse it. The Cyber Digital Twin gives you somewhere else to make that change first — a model you can re-zone, patch, firewall and re-route, then read back against the baseline."
  ),
  claim: same(
    "Test the firewall, patch, re-zoning, access change, or supplier option in the model before changing the live environment."
  ),
  strap: same("The model changes; the plant does not."),
  ctaPrimary: same("Bring us a change you can't rehearse"),
  ctaSecondary: same("How the twin is built")
};

export const PROBLEM = {
  eyebrow: same("Why a model, and not a maintenance window"),
  h2: same("Buy the control after you have watched it work."),
  paragraphs: [
    same(
      "Because the twin is a model, you change it before you change the plant. Add the firewall virtually, redraw the segmentation, apply the patch campaign — then read the model again and compare it against the baseline. The difference between the two states is what that control actually buys."
    ),
    same(
      "The same method covers the changes nobody proposed: the accidental change nobody logged, the configuration drift accumulated over three quiet years, the equipment swap sitting in next year's budget."
    )
  ]
};

/** §7 "Scenario specification", transcribed field for field. */
export const SCENARIO = {
  eyebrow: same("The worked change"),
  h2: same("One change, specified end to end."),
  fields: [
    {
      label: same("Scenario"),
      body: same("Vendor remote access reaches an engineering workstation and a dosing-controller zone.")
    },
    {
      label: same("Candidate control"),
      body: same("Brokered vendor access plus a virtual segmentation boundary.")
    },
    {
      label: same("Constraint"),
      body: same("Required engineering and diagnostic flows must remain available.")
    },
    {
      label: same("Modelled result"),
      body: same(
        "The control closes the selected pathway, identifies a remaining route, and records the rationale. The model changes; the plant does not."
      )
    }
  ]
};

/* ── The before/after route comparison ─────────────────────────────────────
   One graph, two readings. NODES carries the assets and their positions in
   the reading order; the two edge arrays give the same seven routes their
   baseline and post-control states. RouteDiagram.tsx holds the geometry and
   nothing else, so the two panels cannot drift apart by construction.

   States follow §7's semantic rules exactly:
     red    — the explicitly selected consequential baseline route ONLY;
     amber  — a proposed control, or a route it leaves open;
     green  — a modelled closure, and never a real-world guarantee;
     blue   — network and information flow;
     cyan   — evidence-backed object state (NODES.evidence, not an edge).  */

export type RouteState =
  /** Red — the explicitly selected consequential baseline route only. */
  | "selected"
  /** Amber — a proposed control, or a route left open after it. */
  | "proposed"
  /** Green — a modelled closure. Never a real-world guarantee. */
  | "closed"
  /** Blue — network and information flow that has to keep working. */
  | "flow"
  /** Grey — present in the model, off the route under discussion. */
  | "context";

export type NodeId = "vendor" | "gateway" | "ews" | "zone" | "siteEng" | "diag" | "loop";

export interface RouteNode {
  id: NodeId;
  line1: Bilingual;
  line2: Bilingual;
  /** Cyan marker: this object's state in the model rests on evidence. */
  evidence?: Bilingual;
}

export interface RouteEdge {
  id: string;
  from: NodeId;
  to: NodeId;
  label: Bilingual;
  state: RouteState;
}

export const NODES: readonly RouteNode[] = [
  { id: "vendor", line1: same("Vendor"), line2: same("remote access") },
  { id: "gateway", line1: same("Remote-access"), line2: same("gateway"), evidence: same("Flow capture") },
  { id: "ews", line1: same("Engineering"), line2: same("workstation"), evidence: same("Asset inventory") },
  { id: "zone", line1: same("Dosing-controller"), line2: same("zone"), evidence: same("Zone drawing") },
  { id: "siteEng", line1: same("Site engineering"), line2: same("network") },
  { id: "diag", line1: same("Diagnostics"), line2: same("collector") },
  { id: "loop", line1: same("Disinfection"), line2: same("dosing loop"), evidence: same("FMECA entry") }
];

/** Panel A — the environment as modelled today. */
export const BASELINE_EDGES: readonly RouteEdge[] = [
  { id: "e1", from: "vendor", to: "gateway", label: same("Vendor access"), state: "selected" },
  { id: "e2", from: "gateway", to: "ews", label: same("Selected pathway"), state: "selected" },
  { id: "e3", from: "ews", to: "zone", label: same("Engineering edit"), state: "selected" },
  { id: "e4", from: "zone", to: "loop", label: same("Consequence chain"), state: "selected" },
  { id: "e5", from: "gateway", to: "siteEng", label: same("Management"), state: "flow" },
  { id: "e6", from: "siteEng", to: "ews", label: same("Second route"), state: "flow" },
  { id: "e7", from: "zone", to: "diag", label: same("Diagnostics"), state: "flow" }
];

/** Panel B — the same model with the candidate control inserted. */
export const CONTROLLED_EDGES: readonly RouteEdge[] = [
  { id: "e1", from: "vendor", to: "gateway", label: same("Brokered vendor access"), state: "proposed" },
  { id: "e2", from: "gateway", to: "ews", label: same("Closed in the model"), state: "closed" },
  { id: "e3", from: "ews", to: "zone", label: same("Preserved"), state: "flow" },
  { id: "e4", from: "zone", to: "loop", label: same("Off the closed path"), state: "context" },
  { id: "e5", from: "gateway", to: "siteEng", label: same("Remaining route"), state: "proposed" },
  { id: "e6", from: "siteEng", to: "ews", label: same("Remaining route"), state: "proposed" },
  { id: "e7", from: "zone", to: "diag", label: same("Preserved"), state: "flow" }
];

export const COMPARISON = {
  eyebrow: same("Baseline vs. virtual control"),
  h2: same("The same routes, read in two modelled states."),
  intro: same(
    "Panel A is the environment as modelled today. Panel B is the same model with the candidate control inserted — identical assets at identical positions, so the only thing that moves between the two is the state of a route. Read them one under the other and the change is the difference, not the drawing."
  ),
  /* The honesty note. A page about testing changes in a model is the worst
     possible place to imply an interaction that does not exist. */
  staticNote: same(
    "Both panels are static illustrations of two modelled states, drawn here for reading. Nothing on this page runs a simulation, and no state below updates."
  ),
  panelA: {
    tag: same("Panel A"),
    title: same("Baseline — as modelled today"),
    caption: same(
      "Vendor remote access reaches the gateway, the gateway reaches the engineering workstation, and the workstation edits the dosing zone. That is the selected pathway, and the dosing loop is what sits at the end of it."
    )
  },
  panelB: {
    tag: same("Panel B"),
    title: same("With the candidate control — modelled result"),
    caption: same(
      "Brokered access sits in front of the gateway and a virtual segmentation boundary sits at the zone edge. The selected pathway is closed in the model; the engineering and diagnostic flows still complete; a remaining route through the site engineering network is left open and named rather than counted as solved."
    )
  },
  boundaryLabel: same("Virtual segmentation boundary"),
  legendHeading: same("Semantic states"),
  legend: [
    {
      state: "selected" as RouteState,
      label: same("Selected pathway"),
      note: same("The baseline route under discussion, and its consequence chain")
    },
    {
      state: "proposed" as RouteState,
      label: same("Proposed / remaining"),
      note: same("A control before its result, or a route the control leaves open")
    },
    {
      state: "closed" as RouteState,
      label: same("Modelled closure"),
      note: same("Closed in the model — not a real-world guarantee")
    },
    {
      state: "flow" as RouteState,
      label: same("Required flow"),
      note: same("Traffic the constraint says must keep working")
    },
    {
      state: "context" as RouteState,
      label: same("Context"),
      note: same("In the model, off the route under discussion")
    }
  ],
  evidenceHeading: same("Evidence-backed state"),
  evidenceNote: same(
    "A marked object is one whose state in the model rests on evidence you supplied — a flow capture, an inventory record, a zone drawing, an FMECA entry. Unmarked objects are model context."
  ),
  deltaHeading: same("What moved between the two panels"),
  deltaColumns: {
    route: same("Route"),
    baseline: same("Baseline"),
    modelled: same("Modelled result")
  },
  delta: [
    {
      id: "R-01",
      route: same("Gateway → engineering workstation → dosing-controller zone"),
      baseline: same("Open — the selected pathway"),
      modelled: same("Closed in the model by the segmentation boundary"),
      state: "closed" as RouteState
    },
    {
      id: "R-02",
      route: same("Engineering edit into the zone, diagnostics out of it"),
      baseline: same("Open, and required by the constraint"),
      modelled: same("Preserved — both still complete"),
      state: "flow" as RouteState
    },
    {
      id: "R-03",
      route: same("Gateway → site engineering network → engineering workstation"),
      baseline: same("Open, unremarked"),
      modelled: same("Remaining route — not closed by this control"),
      state: "proposed" as RouteState
    },
    {
      id: "R-04",
      route: same("Vendor access into the gateway"),
      baseline: same("Direct"),
      modelled: same("Brokered — mediated, recorded, revocable"),
      state: "proposed" as RouteState
    }
  ]
};

/* ── The three required information panels ─────────────────────────────── */

export interface PanelField {
  label: Bilingual;
  body: Bilingual;
}

export const PANELS = {
  eyebrow: same("Decision record"),
  h2: same("Three panels, and the third one is the deliverable."),
  intro: same(
    "A route drawing on its own is a picture. What leaves the engagement is the record underneath it: what the baseline was, what the control does to it, and what a change authority needs in order to sign."
  ),
  baseline: {
    tag: same("Baseline"),
    fields: [
      { label: same("Entry point"), body: same("Vendor remote access, reached from outside the site.") },
      {
        label: same("Intermediate systems"),
        body: same("Remote-access gateway, site engineering network, engineering workstation.")
      },
      { label: same("Target asset"), body: same("The dosing-controller zone, and the dosing loop behind it.") },
      {
        label: same("Consequence chain"),
        body: same(
          "Controller reachable → dose driven outside its safe band → one protecting safety function left as the only barrier → a lost shift and a reportable quality event."
        )
      },
      {
        label: same("Known constraints"),
        body: same(
          "Vendor diagnostics are contractual. The engineering workstation is the only place the dosing logic is edited. There is no process outage before the next scheduled one."
        )
      }
    ] as readonly PanelField[]
  },
  control: {
    tag: same("Proposed control"),
    fields: [
      {
        label: same("Control inserted in the model"),
        body: same(
          "Brokered vendor access in front of the gateway, plus a virtual segmentation boundary at the edge of the dosing-controller zone."
        )
      },
      {
        label: same("Routes affected"),
        body: same("The selected pathway from the gateway to the engineering workstation is closed in the model.")
      },
      {
        label: same("Required flows preserved"),
        body: same("Engineering edit traffic into the dosing zone and diagnostic collection out of it both still complete.")
      },
      {
        label: same("Residual exposure"),
        body: same(
          "A remaining route reaches the engineering workstation through the site engineering network. This control does not close it, so it is carried into the decision output as its own item rather than counted as solved."
        )
      }
    ] as readonly PanelField[]
  },
  output: {
    tag: same("Decision output"),
    fields: [
      {
        label: same("Recommended sequence"),
        body: same(
          "Broker the vendor route first. Place the segmentation boundary in the same change. Treat the remaining route as a separate, scheduled item with its own evidence."
        )
      },
      {
        label: same("Evidence needed"),
        body: same(
          "Flow capture across the gateway, the current rule set, the zone and conduit drawing, and the FMECA entry for the dosing loop."
        )
      },
      {
        label: same("Implementation window"),
        body: same("Both items fit a normal change window. Neither requires the process to stop.")
      },
      {
        label: same("Validation condition"),
        body: same(
          "Validated when a repeat flow capture shows no gateway-to-workstation traffic and the engineering and diagnostic flows still complete."
        )
      },
      {
        label: same("Responsible role"),
        body: same(
          "OT engineering owns the boundary. The vendor manager owns brokered access. The plant's change authority approves both."
        )
      }
    ] as readonly PanelField[]
  }
};

/* ── What else the method covers ───────────────────────────────────────── */

export const SCOPE = {
  eyebrow: same("Not only controls"),
  h2: same("Anything you would rather not find out in production."),
  intro: same(
    "A firewall rule is the obvious case. The same before-and-after read applies to any change whose consequence you would otherwise discover after it has already happened."
  ),
  cards: [
    { title: same("Capital purchases"), body: same("Score competing products and vendors before the order is placed.") },
    {
      title: same("Configuration changes"),
      body: same("Segmentation, rules and patch campaigns rehearsed in the model.")
    },
    { title: same("Drift and accidents"), body: same("The change nobody logged, and three quiet years of it.") },
    {
      title: same("Supplier options"),
      body: same("A replacement component's dependencies traced before it enters the estate.")
    }
  ],
  closing: same(
    "Tested without touching production, and written down either way. That is the difference between a change proposal and a hope."
  )
};

/* ── The authority boundary. Required by §7's claim boundaries. ────────── */

export const AUTHORITY = {
  eyebrow: same("What this does not replace"),
  h2: same("A modelled closure is a modelled result."),
  body: same(
    "Closing a route in the model is evidence for a decision, not a guarantee about the plant. OXOT supports the people who hold authority over a change; it does not stand in for any of them, and nothing on this page should be read as a verified outcome."
  ),
  points: [
    same("Engineering approval stays with your engineers."),
    same("Safety assessment stays with the function that owns it."),
    same("Operational authority over the running plant stays with operations."),
    same("Return-to-service authority is unchanged.")
  ],
  dataNote: same(
    "The scenario on this page is illustrative and contains no customer data. No percentage, monetary value or loss figure appears anywhere on it, because none of them would be verified."
  )
};

export const CTA = {
  h2: same("Bring the change you cannot rehearse."),
  body: same(
    "The firewall nobody will approve without evidence. The patch campaign with no outage to run it in. The vendor route that has been temporary for four years. Describe one and we will show you what the model does with it."
  ),
  primary: same("Discuss a change"),
  secondary: same("Read the engine detail")
};
