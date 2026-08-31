/**
 * ACCEPT OR DEFER — the fourth of the Four Decisions, at
 * /decisions/risk-acceptance.
 *
 * SOURCE: new_material_source/1_website_layout_v4/site-layout-detailed.md
 * ("What Can We Leave Alone?" — goal, core message and the six required
 * record fields). OXOT_Visual_Foundation_Spec.md §Deliverable 2 Rules
 * previously prohibited calling the fourth category "NEVER" publicly,
 * requiring "Accept or defer" instead — that rule was REVERSED by owner
 * decision 2026-08-24 ("NEVER" is now permitted publicly; see the spec
 * file's own note). This page's content and route (`/decisions/
 * risk-acceptance`, "ACCEPT OR DEFER") were already built around the old
 * vocabulary as a real, shipped page identity, not left blank — the
 * reversal makes "NEVER" *permitted* elsewhere, it doesn't obligate
 * renaming an already-live page just because the restriction that once
 * justified its naming is gone. Left as-is. The internal triage shorthand
 * on /cdt-2 is the same decision under a blunter name; the public framing
 * here is "accepted or deferred under controlled conditions", and the
 * facts (unreachable, or reachable with no consequence, written down so
 * the decision survives an auditor and a staff change) are carried across
 * unchanged from that page's own triage copy so the two never disagree.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — both locales render, `nl` is a same-as-English
 * placeholder pending translation, not a claim that it is correct Dutch.
 *
 * THE RECORD BELOW IS SYNTHETIC. Asset tags, findings, dates and owner
 * roles are invented to demonstrate the shape of the document. Every
 * component rendering it states that on the page, not only here.
 */
import { same } from "@/components/industries/registry";

export const META = {
  title: "Defensible Risk Acceptance for OT | Accept or Defer with Evidence",
  description:
    "Record what does not create material exposure — and preserve the reasoning. OXOT produces time-bounded risk-acceptance records with reachability, consequence, compensating controls, an accountable owner and review triggers."
};

export const HERO = {
  kicker: same("Decision 04 · Accept or defer"),
  h1: same("Deciding not to fix something is still a decision. Record it like one."),
  lead: same(
    "Which issue has a defensible, time-bounded exception with evidence — and which one is just quietly not being worked on?"
  ),
  body: same(
    "Every OT estate carries findings that will not be remediated this year, or at all. Most organisations have no way to say so out loud: the finding stays open, ages, and becomes an audit question nobody can answer. A risk-acceptance record turns that silence into a document with reasoning, an owner, and an expiry date."
  ),
  pullQuote: same("Record what does not create material exposure — and preserve the reasoning."),
  ctaPrimary: same("Create defensible risk decisions"),
  ctaSecondary: same("See how the triage works"),
  /* The record header strip, shown in the hero as the first thing on
     screen — the document, not a claim about trustworthiness. */
  strip: [
    { label: same("Status"), value: same("Accepted — conditions attached") },
    { label: same("Accountable"), value: same("A named role, not a team") },
    { label: same("Expires"), value: same("A fixed date, not 'ongoing'") },
    { label: same("Evidence"), value: same("Attached and traceable") }
  ]
};

export const TRIAGE_ORIGIN = {
  kicker: same("Where this sits"),
  h2: same("The third answer, and the one that needs the most paperwork."),
  intro: same(
    "Findings sort into three lanes by what would physically happen if they were used against you, weighed against whether anyone could actually reach them. The first two lanes are work. The third is a decision — and a decision has to be written down to exist."
  ),
  lanes: [
    {
      label: same("Now"),
      sub: same("Tail exposure"),
      body: same("Reachable pathways to safety-critical systems and crown jewels. Not a budget question."),
      focus: false
    },
    {
      label: same("Next"),
      sub: same("Return on spend"),
      body: same(
        "Real exposure, survivable, worth fixing on merit — sequenced by how much of the loss distribution each euro removes."
      ),
      focus: false
    },
    {
      label: same("Accepted or deferred"),
      sub: same("Under controlled conditions"),
      body: same(
        "Unreachable, or reachable with no material consequence — written down with the reasoning, the compensating controls, an accountable owner and a review date."
      ),
      focus: true
    }
  ],
  note: same(
    "This page is the long form of the third lane. The reasoning behind the first two is set out with the rest of the triage."
  )
};

export const SEVERITY_VS_RISK = {
  kicker: same("The distinction the record has to make"),
  h2: same("A severity score is not a risk decision."),
  intro: same(
    "A severity score describes a defect in a piece of software. It knows nothing about which zone the device sits in, whether anything can route to it, what the safety function behind it does, or what stops running if it fails. Accepting a high-severity finding is entirely legitimate — but only if the record establishes the things the score never addressed."
  ),
  columns: {
    score: same("What the severity score states"),
    record: same("What the acceptance record must establish")
  },
  rows: [
    {
      aspect: same("Scope"),
      score: same("A defect in a software component, in the abstract."),
      record: same("A specific asset, in a specific zone, in your plant.")
    },
    {
      aspect: same("Reachability"),
      score: same("Assumes an attacker is already adjacent."),
      record: same("Whether a path exists in the modelled network, and from where.")
    },
    {
      aspect: same("Consequence"),
      score: same("Confidentiality, integrity and availability of the software."),
      record: same("What physically happens, drawn from your own safety and reliability studies.")
    },
    {
      aspect: same("Compensation"),
      score: same("Silent on controls already in place."),
      record: same("The controls that make the path non-viable, named and evidenced.")
    },
    {
      aspect: same("Time"),
      score: same("Static until the score is revised."),
      record: same("Valid until a stated date, or until a stated condition changes.")
    },
    {
      aspect: same("Ownership"),
      score: same("Nobody."),
      record: same("A named accountable role that survives the person leaving.")
    }
  ],
  closing: same(
    "Severity tells you a component is defective. The record tells an auditor why that defect did not warrant a change to a running plant."
  )
};

export const RECORD = {
  kicker: same("The artefact"),
  h2: same("A risk-acceptance record, field by field."),
  intro: same(
    "This is the document the decision produces. It is not a summary of a decision taken elsewhere — the fields are the decision, and an empty field is a decision nobody has made yet."
  ),
  illustrative: same(
    "Illustrative record — synthetic asset, synthetic finding, invented dates. No customer data, and not a description of any real accepted risk."
  ),
  header: [
    { label: same("Record"), value: same("RA-2026-0184") },
    { label: same("Raised"), value: same("2026-04-02") },
    { label: same("Decided"), value: same("2026-04-19") },
    { label: same("Status"), value: same("Accepted — conditions attached") }
  ],
  evidenceLabel: same("Evidence"),
  fields: [
    {
      label: same("Affected asset"),
      value: same("Vibration monitoring gateway, VMG-04, Zone 2 (process monitoring)."),
      note: same(
        "Asset identity and zone assignment come from the model, not from a spreadsheet maintained alongside it."
      ),
      evidence: [same("Asset register"), same("Zone and conduit model")]
    },
    {
      label: same("Finding"),
      value: same(
        "Unauthenticated firmware read on the vendor diagnostic service. No vendor fix published; the platform is at end of engineering support."
      ),
      note: same(
        "Stated as the defect actually is, including the absence of a remedy — which is usually the reason the record exists at all."
      ),
      evidence: [same("Vendor advisory"), same("Firmware inventory")]
    },
    {
      label: same("Reachability (modelled)"),
      value: same(
        "No path from any external or enterprise origin. The diagnostic service is reachable only from the Zone 2 engineering segment, which is itself reachable only from the site engineering workstation under brokered access."
      ),
      note: same(
        "A statement about a modelled network on a given date. It is re-evaluated whenever the model changes."
      ),
      evidence: [same("Modelled pathway set"), same("Conduit rules"), same("Access broker configuration")]
    },
    {
      label: same("Consequence if reached"),
      value: same(
        "Loss of condition-monitoring data. No control function, no protection function, no interlock. The associated safety function does not depend on this device and is not degraded by its loss."
      ),
      note: same("Taken from the site's own safety and reliability studies rather than assigned by us."),
      evidence: [same("HAZOP node reference"), same("Safety function allocation"), same("Reliability study")]
    },
    {
      label: same("Rationale for acceptance"),
      value: same(
        "The defect is real and unfixable. The pathway to it is not viable from any origin an adversary can plausibly occupy, and the consequence of exploiting it is the loss of a diagnostic feed. Remediation would mean replacing a device, and the outage that costs is not justified by the exposure it removes."
      ),
      note: same("The rationale states the trade actually made, including what remediation would have cost operationally."),
      evidence: [same("Modelled consequence"), same("Outage window assessment")]
    },
    {
      label: same("Compensating controls"),
      value: same(
        "Brokered, logged and time-boxed engineering access. Conduit rules denying enterprise-origin traffic to Zone 2. Monitoring on the engineering segment for unexpected sessions to the diagnostic port."
      ),
      note: same(
        "The acceptance depends on each of these. Removing one invalidates the record, which is why removal is itself a review trigger."
      ),
      evidence: [same("Conduit rule set"), same("Access broker policy"), same("Detection coverage map")]
    },
    {
      label: same("Conditions of acceptance"),
      value: same(
        "Valid while VMG-04 remains in Zone 2, while the diagnostic service remains unreachable from outside that zone, and while the device carries no control or protection function."
      ),
      note: same("Written as conditions rather than as a permanent verdict. The conditions are what the review re-tests."),
      evidence: []
    },
    {
      label: same("Accountable owner"),
      value: same(
        "Site OT Engineering Manager — a role, not an individual. Endorsed by the Plant Safety Authority and the CISO."
      ),
      note: same("A role survives a resignation. A name in a spreadsheet does not."),
      evidence: [same("Endorsement record")]
    },
    {
      label: same("Review trigger — scheduled"),
      value: same("2027-04-19, or at the next zone and conduit reassessment, whichever comes first."),
      note: same(
        "An acceptance without an expiry date is not an acceptance. It is a finding somebody stopped looking at."
      ),
      evidence: []
    },
    {
      label: same("Review trigger — conditional"),
      value: same(
        "Any modelled path change into Zone 2; any change to the access broker; any allocation of a control or protection function to VMG-04; publication of a vendor fix; a change to the consequence assessment behind the associated safety function."
      ),
      note: same(
        "Conditional triggers are what keep the record honest between scheduled reviews rather than letting it decay quietly."
      ),
      evidence: []
    }
  ],
  footer: {
    heading: same("What makes this defensible"),
    items: [
      same(
        "The reachability claim and the consequence claim each come from something outside the decision — a network model and a safety study — rather than from the judgement of whoever wanted the finding closed."
      ),
      same("The conditions are written as tests, so a reviewer can re-run them instead of re-arguing them."),
      same("The record has an owner, an endorsement, and a date on which it stops being valid.")
    ]
  }
};

export const EVIDENCE_TRACE = {
  kicker: same("Provenance"),
  h2: same("Every field points somewhere, or shows a gap."),
  intro: same(
    "The record is worth exactly as much as what stands behind each field. One claim — no viable external path to the affected asset — traces back like this."
  ),
  claim: same("Reachability: no viable external path to VMG-04"),
  rungs: [
    {
      title: same("The claim, as written in the record"),
      body: same("A statement about a specific asset, on a specific date, under stated conditions.")
    },
    {
      title: same("The modelled pathway set that produced it"),
      body: same("Every route the model can construct to that asset, with the rule or boundary that terminates each one.")
    },
    {
      title: same("The configuration the model was built from"),
      body: same("Conduit rules, segmentation and the remote-access broker policy — the artefacts those routes were derived from.")
    },
    {
      title: same("The engineering source for each artefact"),
      body: same("Where the configuration came from, when it was captured, and by what method.")
    },
    {
      title: same("The named owner of that source"),
      body: same("The role accountable for the artefact being current, and the date it was last confirmed.")
    }
  ],
  gapNote: same(
    "Where a link in that chain does not exist, it is rendered as a gap rather than filled with an assumption. A record resting on an absent source should look like one."
  ),
  noBadge: same(
    "There is deliberately no trust mark, seal or 'verified' badge anywhere on this page. A badge asserts a conclusion; a chain lets a reviewer test it."
  )
};

export const SURVIVES = {
  kicker: same("Three things it has to survive"),
  h2: same("The record is written for the moment somebody challenges it."),
  tests: [
    {
      challenge: same("An audit, two years later."),
      answer: same(
        "The auditor is not asking why the finding is open. They are asking who decided, on what basis, and whether the basis still holds. The record answers all three without anyone reconstructing a conversation from memory."
      )
    },
    {
      challenge: same("The people who made the decision have left."),
      answer: same(
        "Accountability sits on a role, the reasoning is written out rather than assumed, and the conditions are stated as tests. The successor inherits a decision they can re-run, not a verdict they have to take on faith."
      )
    },
    {
      challenge: same("The threat conditions change."),
      answer: same(
        "A conditional trigger fires on the thing that actually invalidates the record — a new modelled path, a control removed, a function reallocated — rather than on a scheduled date that happens to be eleven months away."
      )
    }
  ]
};

export const BOUNDARIES = {
  kicker: same("Claim boundaries"),
  h2: same("What a risk-acceptance record is not."),
  items: [
    {
      label: same("Not a waiver"),
      body: same(
        "It does not remove the finding, and it does not assert the finding is wrong. It states why the finding did not warrant a change, under conditions that are written down."
      )
    },
    {
      label: same("Not a safety case"),
      body: same(
        "It draws on safety evidence; it does not produce it. OXOT supports, but does not replace, engineering approval, safety assessment, operational authority, or return-to-service authority."
      )
    },
    {
      label: same("Not a permanent state"),
      body: same(
        "Every record expires. An acceptance that never comes back for review has stopped being a decision and become a habit."
      )
    },
    {
      label: same("Not a guarantee"),
      body: same(
        "A modelled result is a statement about the model and the evidence behind it on a given date, not a promise about the plant."
      )
    }
  ],
  staticNote: same(
    "The record above is a static illustration, not a live document view. Nothing on this page is interactive, and nothing on it claims to be."
  )
};

export const CTA = {
  h2: same("Show what you decided not to do, and why."),
  body: same(
    "Most OT security programmes can show a backlog. Very few can show a defensible account of the work they deliberately did not do — which is usually the harder question in the room."
  ),
  ctaPrimary: same("Create defensible risk decisions"),
  ctaSecondary: same("How evidence is traced"),
  onward: {
    heading: same("Related"),
    items: [
      {
        label: same("Evidence and data provenance"),
        note: same("How every field traces to a source, an owner and a review state.")
      },
      {
        label: same("IEC 62443 assurance"),
        note: same("Where the zone, conduit and security-level evidence in the record comes from.")
      },
      {
        label: same("The decision triage"),
        note: same("How findings sort into the three lanes in the first place.")
      }
    ]
  }
};
