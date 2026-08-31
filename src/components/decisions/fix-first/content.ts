/**
 * DECISION 01 — "What do we fix first?" — the detailed form.
 *
 * Source of truth for the decision itself: new_material_source/
 * 1_website_layout_v4/OXOT_Visual_Foundation_Spec.md §6 (Four Decisions
 * Switchboard). The spec's panel shape — decision question → evidence
 * required → model action → output → relevant roles → CTA — is the
 * skeleton this page's copy hangs on, and its instruction to use the
 * component "in abbreviated form on Home and detailed form on the
 * Decisions overview page" is why this page exists at all: /cdt-2 carries
 * the abbreviated version, this is the full one.
 *
 * Tone, facts and the three band names are kept consistent with the
 * abbreviated version already shipped on /cdt-2 (src/components/cdt2/
 * content-1.ts, DECISION_01) — read for consistency, deliberately not
 * imported from: that directory is read-only, and a public detail page
 * should not be able to break a protected page by editing a shared
 * export. The third band's public label follows the owner-reviewed
 * critique recorded in that file: "ACCEPTED / deferred under controlled
 * conditions", never the internal shorthand.
 *
 * THE BOARD IS THE POINT. OXOT_content-to-visual-mapping-table.md maps
 * "Risk prioritization" to a "NOW / NEXT / deferred board" and names
 * "Traffic-light score alone" as the thing to avoid, so the findings
 * below are written as real worked examples with a traced route and a
 * named consequence each — the two things a severity score does not
 * carry. They are illustrative and labelled as such on the page, per the
 * Visual Foundation Spec's claim boundaries ("Every scenario must state:
 * Illustrative scenario — no customer data"). No counts, currency values
 * or percentages appear anywhere in this file: a fabricated number reads
 * as product output, and none of it would be real.
 *
 * `Bilingual` throughout via the local `same()` — both locales render,
 * `nl` is a same-as-English placeholder pending translation, not a claim
 * that this is correct Dutch. Same convention as the industry pages
 * (src/components/industries/registry.ts).
 */
import type { Bilingual } from "@/i18n/bilingual";

/** Marks a string as "not yet translated", not "translated to itself". */
function same(en: string): Bilingual {
  return { en, nl: en };
}

export const META = {
  title: "What Do We Fix First? | Risk Prioritization by Reachability and Consequence",
  description:
    "OXOT ranks findings by what they would actually cost and whether anyone can reach them — producing a NOW / NEXT / accepted-or-deferred board instead of a severity score."
};

export const BREADCRUMB = {
  here: same("What do we fix first?")
};

export const HERO = {
  eyebrow: same("Decision 01 · Four Decisions"),
  h1: same("What do we fix first?"),
  question: same("Which reachable issue can affect what matters most?"),
  lead: same(
    "Every operator has a backlog too long to finish and no defensible way to order it. We sort findings by what would physically happen if they were used against you, weighed against whether anyone could actually reach them — not by a severity band published for every deployment of the product."
  ),
  ctaPrimary: same("Bring us your backlog"),
  ctaSecondary: same("How the four decisions work")
};

/**
 * The spec's switchboard panel, written out. The live switchboard control
 * is a larger component that does not exist yet; this is its content in
 * static form, and the note below says so rather than implying a tab
 * strip is coming.
 */
export const PANEL = {
  heading: same("The decision, in full"),
  note: same(
    "The Four Decisions switchboard is a single interactive control that will carry all four decisions. It is not built yet — this page is the same decision written out in full, not a preview of a working switch."
  ),
  rows: [
    {
      term: same("Decision question"),
      body: same("Which reachable issue can affect what matters most?")
    },
    {
      term: same("Evidence required"),
      body: same(
        "Reachability and consequence. The traced route from an entry point to the asset, and what that asset failing does to the process. CVE severity is an input to the model, never the ranking that comes out of it."
      )
    },
    {
      term: same("OXOT model action"),
      body: same(
        "Trace routes from every entry point through a model of the network you actually run to the assets your own safety and reliability studies already rate as critical — then keep only what is genuinely reachable."
      )
    },
    {
      term: same("Output"),
      body: same(
        "A NOW / NEXT / accepted-or-deferred board, ordered by the consequence each finding carries, with the reasoning recorded beside every placement."
      )
    },
    {
      term: same("Relevant roles"),
      body: same("Security team · OT engineering · plant leadership")
    }
  ]
};

export const RANKING = {
  h2: same("A severity score ranks the vulnerability. It does not rank your plant."),
  paragraphs: [
    same(
      "A published severity band describes a product in the abstract: every deployment of it, everywhere, under every architecture. It cannot know that one instance sits behind two conduits on a test cell that never touches product, and another sits one hop from the safety function protecting your overpressure case. Sorted by that band, both arrive at the top of the queue together."
    ),
    same(
      "The consequence comes from your own safety and reliability studies, and the reachability from a model of your real network. Neither is our opinion — which is what makes the answer survive a challenge from the plant manager, and an auditor after that."
    )
  ],
  compare: {
    scoreHeading: same("Score-led triage"),
    modelHeading: same("Consequence-and-reachability triage"),
    rows: [
      {
        dimension: same("Ordering"),
        score: same("Highest severity band first, wherever the asset sits."),
        model: same("Highest consequence first, among the findings someone can actually reach.")
      },
      {
        dimension: same("Where impact comes from"),
        score: same("A generic rating published for every deployment of the product."),
        model: same("Your own HAZOP, LOPA, FMEA and criticality studies, applied to your own equipment.")
      },
      {
        dimension: same("Where likelihood comes from"),
        score: same("An assumption about the network — usually that it is flatter, or safer, than it is."),
        model: same("Routes traced through zones, conduits and trust relationships as they actually are.")
      },
      {
        dimension: same("What happens to the rest"),
        score: same("It stays on the list, unranked, indefinitely."),
        model: same("It is accepted or deferred in writing, with the condition that would reopen it.")
      },
      {
        dimension: same("What an assessor sees"),
        score: same("A score, and a backlog that never shrinks."),
        model: same("The reasoning — including what was deliberately not done, and why.")
      }
    ]
  }
};

export interface BoardFinding {
  title: Bilingual;
  reachability: Bilingual;
  consequence: Bilingual;
  decision: Bilingual;
}

export interface BoardColumn {
  /** The band as the board prints it. */
  label: Bilingual;
  sub: Bilingual;
  body: Bilingual;
  /** What placement in this band commits someone to. */
  commitment: Bilingual;
  findings: readonly BoardFinding[];
}

export const BOARD = {
  h2: same("Three answers, and the discipline to use the third."),
  intro: same(
    "The board below is the output shape: three bands, each finding carrying the route that puts it there and the consequence that ranks it. Read left to right, it is a sequence of work. Read as a record, it is a set of decisions somebody signed."
  ),
  /* Required verbatim by OXOT_Visual_Foundation_Spec.md's claim boundaries
     section. Rendered adjacent to the board itself, not buried in a footnote. */
  claimBoundary: same("Illustrative scenario — no customer data."),
  claimNote: same(
    "The findings below are worked examples written to show the shape of the board. They are not output from a customer engagement, and no counts, scores, currency values or percentages are shown — none of them would be real."
  ),
  columnHeadings: {
    reachability: same("Reachability"),
    consequence: same("Consequence"),
    decision: same("Decision")
  },
  columns: [
    {
      label: same("NOW"),
      sub: same("Tail exposure"),
      body: same(
        "Reachable pathways to safety-critical systems and crown jewels. These are the ruin scenarios, and they are not a budget question."
      ),
      commitment: same("Fixed, isolated or compensated before the next change window."),
      findings: [
        {
          title: same("Vendor remote access reaches a safety-instrumented zone"),
          reachability: same(
            "Route traced: internet-facing vendor gateway → jump host → engineering workstation → the engineering port on the safety controller."
          ),
          consequence: same(
            "The safety function protecting the overpressure case is reachable from outside the plant. The barrier and the thing it guards sit on the same path."
          ),
          decision: same("Broker the vendor access and re-zone before the next maintenance window.")
        },
        {
          title: same("Flat conduit between the historian and the dosing controllers"),
          reachability: same(
            "Route traced: enterprise historian replica → OT historian → shared switch fabric → dosing controller."
          ),
          consequence: same(
            "A dosing set point can move without the operator's knowledge. The only barrier that catches it is procedural."
          ),
          decision: same("Segment the conduit, then re-run the model to confirm the route is gone.")
        }
      ]
    },
    {
      label: same("NEXT"),
      sub: same("Return on spend"),
      body: same(
        "Real exposure, survivable, worth fixing on merit — sequenced by how much of the loss distribution each unit of spend removes."
      ),
      commitment: same("Scheduled into the programme, ordered by risk removed per unit of spend."),
      findings: [
        {
          title: same("Shared engineering credentials across three production cells"),
          reachability: same(
            "Reachable from the plant network, but only after obtaining a credential the model treats as obtainable rather than given."
          ),
          consequence: same(
            "An unplanned stop measured in shifts. No safety function is on the path, and the process fails to a safe state."
          ),
          decision: same("Sequence with the identity workstream that is already funded.")
        },
        {
          title: same("Unpatched operator station on the packaging line"),
          reachability: same(
            "Reachable from the same segment as the line's engineering laptop; no route continues past the line."
          ),
          consequence: same("Loss of view on one line. The process continues under local control."),
          decision: same("Batch into the next validated patch campaign.")
        }
      ]
    },
    {
      /* Public-facing label. The internal shorthand for this band is
         deliberately not used on a public page — see this file's header. */
      label: same("ACCEPTED"),
      sub: same("Deferred, under controlled conditions"),
      body: same(
        "Unreachable, or reachable with no consequence — written down with the reasoning, so the decision survives an auditor and a staff change."
      ),
      commitment: same("A dated decision with a named owner and the condition that reopens it."),
      findings: [
        {
          title: same("Legacy protocol on an isolated test cell"),
          reachability: same(
            "No route from any modelled entry point. The cell has no path to the plant network in either direction."
          ),
          consequence: same("Confined to a cell that never touches product or people."),
          decision: same("Deferred. Reopens the day the cell is connected to anything.")
        },
        {
          title: same("High-severity advisory against a service this deployment does not run"),
          reachability: same(
            "The affected service is not enabled here, and no route reaches the port it would listen on."
          ),
          consequence: same("None modelled, on the current configuration."),
          decision: same("Accepted, with review at the next firmware change.")
        }
      ]
    }
  ] as readonly BoardColumn[],
  closing: same(
    "The third band is the one that changes an assessment. A backlog with nothing accepted is not a disciplined backlog — it is a list nobody has made a decision about."
  )
};

export const TRACE = {
  h2: same("Reachability is traced, not assumed."),
  intro: same(
    "A finding earns its place on the board by having a route. The model walks every entry point through the network as modelled, and a finding that cannot be reached does not get ranked as though it could be."
  ),
  steps: [
    {
      n: "01",
      title: same("Entry point"),
      body: same(
        "Where someone can begin: an internet-facing service, vendor access, removable media, wireless, a shared corporate identity, a contractor laptop."
      )
    },
    {
      n: "02",
      title: same("Intermediate systems"),
      body: same(
        "Every hop the model can actually make: jump hosts, historians, engineering workstations, dual-homed servers, shared switch fabric, forgotten management interfaces."
      )
    },
    {
      n: "03",
      title: same("Target asset"),
      body: same(
        "The equipment your safety and reliability studies already rate. The rating is yours; the model applies it rather than replacing it."
      )
    },
    {
      n: "04",
      title: same("Consequence chain"),
      body: same(
        "What physically happens when that asset misbehaves, which safety function is supposed to catch it, and what it costs when the function is on the same path as the threat."
      )
    }
  ],
  closing: same(
    "A finding with no route is not a NOW item, whatever its score says. A finding one hop from a safety function is, whatever its score says."
  ),
  staticNote: same(
    "Static diagram — a fixed illustration of the trace, not a live view of a model."
  )
};

export const EVIDENCE = {
  h2: same("What the board is built from, and what it leaves behind."),
  inputsHeading: same("What goes in"),
  inputs: [
    {
      name: same("Consequence, from your own studies"),
      body: same(
        "HAZOP, LOPA, FMEA, criticality and reliability work you already own and already defend. OXOT reads them; it does not re-rate your plant by opinion."
      )
    },
    {
      name: same("Reachability, from a model of your network"),
      body: same(
        "Zones, conduits, routes and trust relationships as they actually are — not as the diagram on the control-room wall says they are."
      )
    }
  ],
  outputsHeading: same("What comes out"),
  outputs: [
    {
      name: same("An ordered queue"),
      body: same(
        "A sequence engineering can start on Monday that survives a challenge from the plant manager, because the ordering came from the plant's own engineering."
      )
    },
    {
      name: same("A written acceptance record"),
      body: same(
        "Every deferred finding carries its reasoning, its owner and the condition that reopens it. Nothing is silently dropped."
      )
    },
    {
      name: same("Glass box"),
      body: same(
        "Every placement drills back to the route and the study that produced it. Never underwrite a decision you cannot take apart."
      )
    }
  ],
  complianceNote: same(
    "Because IEC 62443 zones and conduits are the model's own structure rather than an appendix to it, the same work produces the zone-and-conduit evidence an assessor asks for."
  ),
  complianceLink: same("How the IEC 62443 evidence is produced")
};

export const ROLES = {
  h2: same("Who uses this, and what changes for them."),
  rows: [
    {
      role: same("Security team"),
      body: same(
        "Stops defending a ranking it cannot explain. The argument moves from “why this finding” to “which change window”, because the order came from engineering rather than from a scanner."
      )
    },
    {
      role: same("OT engineering"),
      body: same(
        "Gets a queue that respects change windows and the safety case, and a documented reason for everything that is not on it."
      )
    },
    {
      role: same("Plant leadership"),
      body: same(
        "Sees which findings are ruin scenarios and which are budget questions — and signs the acceptances knowingly, rather than by default and in silence."
      )
    }
  ]
};

export const CTA = {
  h2: same("Bring your backlog. We will show you the board it produces."),
  body: same(
    "A working session on your own findings: what has a route, what has consequence, and what can be accepted in writing with the conditions stated."
  ),
  primary: same("Talk to us about your backlog"),
  secondary: same("See the engine behind the ranking")
};
