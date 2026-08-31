/**
 * CONSULTING SERVICES — content for /consulting.
 *
 * AUTHORITATIVE SOURCE: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, which is finished, ready-to-use copy specifying this exact
 * section order (Hero, How we work, The OXOT method, The Cyber Digital Twin
 * in consulting, Six services, Engagement models, IEC 62443 underneath the
 * services, Vendor neutral / evidence owned by you, Final CTA) and every
 * string used below, transcribed rather than paraphrased.
 *
 * This replaces the page's previous content, which was built from
 * `db/migrations/135_services_to_a.sql` and an internal `page-specs.md §7`
 * decision record — both predate `new_material_source` and are unrelated to
 * it. Per the owner's standing instruction (2026-08-23) to build exclusively
 * from `new_material_source`, none of that page's copy, its "route rail"
 * layout, or its five-chip posture claim is reused here.
 *
 * `Bilingual`-typed via `same()` — both locales render, `nl` is a
 * same-as-English placeholder pending translation, matching the convention
 * used for every other section built this session.
 */
import { same } from "@/components/industries/registry";

export const META = {
  title: "OT Cybersecurity Consulting Services | Cyber Digital Twin",
  description:
    "OXOT provides engineering-led OT cybersecurity consulting for critical systems. Use the Cyber Digital Twin to assess risk, design segmentation, secure vendor access, build programmes, establish baselines, and transfer capability."
};

export const HERO = {
  h1: same("OT cybersecurity consulting, built around the system you operate."),
  kicker: same("Engineering-led OT cybersecurity. Enabled by the Cyber Digital Twin."),
  lead: same(
    "OXOT helps operators and critical-infrastructure teams make cyber decisions that can survive contact with a live environment."
  ),
  body: same(
    "We begin with the process, the system, and the operational consequence — not a generic questionnaire. We work with your engineers to understand what the environment does, what cannot stop, what an attacker could reach, and which action changes the outcome."
  ),
  body2: same(
    "The Cyber Digital Twin is how we connect that evidence. It turns consulting from a static assessment into a working model for prioritization, change testing, investment decisions, and long-term resilience."
  ),
  ctaPrimary: same("Discuss a consulting engagement"),
  ctaSecondary: same("Explore the Cyber Digital Twin"),
  chain: [
    same("Engineering evidence"),
    same("Cyber Digital Twin"),
    same("Assessment, architecture, change, and investment decisions"),
    same("Evidence your team can use and retain")
  ]
};

export const HOW_WE_WORK = {
  h2: same("Engineers first. The standard is the vocabulary — not the point."),
  body1: same(
    "Plant engineers and operators are measured on reliability, safety, throughput, quality, and recovery. They are not measured on control coverage."
  ),
  body2: same("That is why OXOT starts with operational reality:"),
  chain: [
    same("What does this system do?"),
    same("Which functions cannot stop?"),
    same("What protects life, quality, production, service, or mission?"),
    same("What could an attacker actually reach?"),
    same("What can we safely change?")
  ],
  body3: same("IEC 62443 is how OXOT structures and records the answer. It is not the reason for the work."),
  body4: same(
    "A report that scores a facility against a framework but cannot tell the plant manager, controls engineer, or operations leader what to do on Monday has not completed the job."
  ),
  pullQuote: same("The goal is not a better score. The goal is a better decision.")
};

export const METHOD = {
  h2: same("Collaborative, controlled, and built for action."),
  principles: [
    {
      term: same("Client-centric"),
      body: same(
        "Plant engineers and operators are measured on reliability and safety, not control coverage. OXOT works collaboratively with the people who understand the system, its constraints, and its recovery requirements."
      )
    },
    {
      term: same("Controlled execution"),
      body: same(
        "Safety comes first. A named delivery lead sits between the customer, OXOT consultants, specialist teams, and any test activity. Scope, methods, evidence handling, stop conditions, and escalation routes are agreed before work begins."
      )
    },
    {
      term: same("Actionable outcomes"),
      body: same(
        "The outcome is a prioritized, evidence-backed action plan: quick wins, scheduled work, strategic architecture decisions, and documented risk acceptance where appropriate. Engineering should be able to begin on Monday."
      )
    }
  ],
  sequenceH3: same("The engagement sequence"),
  sequence: [
    {
      title: same("Define the decision"),
      body: same("What risk, change, investment, supplier, system, or assurance question needs an answer?")
    },
    {
      title: same("Establish the evidence"),
      body: same(
        "Gather approved engineering, operational, asset, topology, configuration, safety, reliability, supplier, and lifecycle records."
      )
    },
    {
      title: same("Build the working model"),
      body: same(
        "Connect the facility, assets, control systems, network pathways, dependencies, operational consequence, and existing controls."
      )
    },
    {
      title: same("Test options"),
      body: same(
        "Compare remediation, segmentation, access, patch, replacement, supplier, modernization, or acceptance options in the Twin."
      )
    },
    {
      title: same("Deliver a decision that holds"),
      body: same(
        "Provide the rationale, evidence, actions, accountable owners, sequencing, residual risk, and review triggers."
      )
    }
  ]
};

export const TWIN_IN_CONSULTING = {
  h2: same("The engagement delivers more than a report."),
  oldChain: [same("Assessment report"), same("Findings list"), same("Remediation backlog"), same("Manual follow-up")],
  newChain: [
    same("Consulting engagement"),
    same("Evidence-grounded Cyber Digital Twin"),
    same("Priority decisions, tested options, and traceable rationale"),
    same("A model that can be handed over, extended, or operated alongside your team")
  ],
  tableH3: same("What the Twin contributes"),
  rows: [
    {
      need: same("Establish scope"),
      contribution: same(
        "Models the site, facility, product, railway system, data center, operational service, or system under consideration"
      )
    },
    {
      need: same("Find what matters"),
      contribution: same(
        "Connects assets and vulnerabilities to actual pathways, safety/reliability context, dependencies, and operational consequence"
      )
    },
    {
      need: same("Design architecture"),
      contribution: same("Models zones, conduits, network state, remote access, required flows, and segmentation options")
    },
    {
      need: same("Test a change"),
      contribution: same(
        "Simulates firewall, routing, vendor-access, patch, replacement, or configuration changes before live deployment"
      )
    },
    {
      need: same("Compare investments"),
      contribution: same(
        "Compares controls, supplier options, modernization paths, and sequencing against the same modeled outcomes"
      )
    },
    {
      need: same("Support assurance"),
      contribution: same(
        "Links system, asset, risk, product, safety, supplier, and control evidence to applicable framework-oriented outputs"
      )
    },
    {
      need: same("Build customer capability"),
      contribution: same("Leaves the model, evidence, reasoning, and operating method with the customer rather than only a slide deck")
    }
  ],
  pullQuote: same("If the estate is the problem, the Twin is the place to reason about it."),
  inlineCta: same("See how the Cyber Digital Twin is built")
};

export const SERVICES = {
  h2: same("Six services. One operating model."),
  intro: same(
    "Each service can stand alone. Together, they form a long-term OT cybersecurity and resilience programme. Every engagement can feed the Cyber Digital Twin, increasing the quality, efficiency, and long-term value of the work."
  ),
  cards: [
    {
      number: "01",
      title: same("OT Security Assessments"),
      quote: same("Tell me where we actually stand."),
      lead: same(
        "A measured answer for one facility, process line, zone, railway system, product environment, or critical operational service — not a scored questionnaire."
      ),
      whatWeDo: [
        same("Define the system under consideration."),
        same("Review engineering, OT, asset, configuration, topology, and operational evidence."),
        same("Identify relevant assets, interfaces, dependencies, and cyber pathways."),
        same("Assess vulnerabilities, exposure, remote access, segmentation, supplier, and lifecycle conditions."),
        same("Connect findings to safety, reliability, availability, quality, service, environmental, or mission consequence."),
        same("Produce prioritized NOW / NEXT / ACCEPTED decisions.")
      ],
      whatYouReceive: [
        same("System and asset view"),
        same("Cyber pathway and consequence analysis"),
        same("Prioritized action queue"),
        same("Quick wins and strategic recommendations"),
        same("Risk-treatment rationale"),
        same("Evidence and decision record")
      ],
      bestFor: [
        same("A new facility or system scope."),
        same("Pre-acquisition or technical due diligence."),
        same("A high-priority plant, line, zone, route, data hall, or product environment."),
        same("An operator who needs an accurate baseline before funding a programme."),
        same("A team with a large vulnerability backlog and no defensible order.")
      ],
      cta: same("Discuss an OT security assessment")
    },
    {
      number: "02",
      title: same("OT Security Programmes"),
      quote: same("Give engineering a queue for Monday."),
      lead: same("A multi-year programme that turns a register of findings into scheduled, accountable engineering work."),
      whatWeDo: [
        same("Turn assessment findings into a risk-based roadmap."),
        same("Prioritize actions by consequence, reachability, cost, operational constraints, and lifecycle opportunity."),
        same("Align work with shutdowns, possessions, maintenance windows, capital programmes, modernization plans, and supplier lifecycles."),
        same("Define ownership across operations, controls, IT, security, safety, maintenance, procurement, and leadership."),
        same("Maintain risk, supplier, evidence, and change deltas through the Cyber Digital Twin."),
        same("Support governance reporting without separating it from engineering work.")
      ],
      whatYouReceive: [
        same("Multi-year OT cybersecurity roadmap"),
        same("NOW / NEXT / ACCEPTED backlog"),
        same("Programme governance and ownership model"),
        same("Investment and sequencing rationale"),
        same("Change and evidence review cycle"),
        same("Executive and engineering reporting views")
      ],
      bestFor: [
        same("Multi-site operators."),
        same("Organizations moving from assessment to implementation."),
        same("Operators with aging OT, deferred maintenance, inconsistent site practices, or major modernization programmes."),
        same("Teams that need to align security work with operational planning.")
      ],
      cta: same("Discuss an OT security programme")
    },
    {
      number: "03",
      title: same("Architecture & Segmentation"),
      quote: same("Design it so it survives production."),
      lead: same("Zones and conduits that operators can run, maintainers can work in, and security teams can explain."),
      whatWeDo: [
        same("Define the system boundary, zones, conduits, and required communication flows."),
        same("Model Purdue context, VLANs, subnets, firewall rules, routing, engineering paths, vendor access, historians, and data flows."),
        same("Identify uncontrolled pathways, shared services, weak boundaries, and common-mode dependencies."),
        same("Test segmentation, virtual firewalls, DMZ changes, access restrictions, and migration sequences in the Twin."),
        same("Preserve required operational, diagnostic, safety, maintenance, and recovery flows."),
        same("Create a design that can be implemented and validated in planned operational windows.")
      ],
      whatYouReceive: [
        same("Zones and conduits model"),
        same("Required-flow and prohibited-flow analysis"),
        same("Target security-level support material"),
        same("Segmentation architecture"),
        same("Candidate firewall and access-control strategy"),
        same("Implementation and validation sequence"),
        same("Residual-risk and exception record")
      ],
      bestFor: [
        same("An OT/IT convergence project."),
        same("A plant, utility, rail, data-center, or facility network redesign."),
        same("A new build, expansion, modernization, or control-system refresh."),
        same("A security programme where network segmentation has become a stalled “future state” diagram.")
      ],
      cta: same("Discuss architecture and segmentation")
    },
    {
      number: "04",
      title: same("Secure Remote Access"),
      quote: same("Stop the risk in vendor access."),
      lead: same(
        "The OEM, integrator, maintainer, or specialist still gets the access they need — through a route you can approve, observe, revoke, and defend."
      ),
      whatWeDo: [
        same("Map every remote-support route: vendor portals, VPNs, jump hosts, cellular gateways, maintenance laptops, cloud tools, OEM tunnels, and engineering paths."),
        same("Identify which routes can reach control systems, safety-related functions, critical equipment, configuration tools, or sensitive operational data."),
        same("Separate required support access from persistent or unnecessary exposure."),
        same("Design brokered, named-user, MFA-protected, approved, time-limited, recorded, asset-specific access."),
        same("Test controls against maintenance, diagnostic, update, emergency-recovery, and vendor-support workflows."),
        same("Define accountabilities, approvals, logging, access expiry, emergency paths, and evidence requirements.")
      ],
      whatYouReceive: [
        same("Remote-access inventory and pathway map"),
        same("Vendor and integrator access-risk assessment"),
        same("Future-state access architecture"),
        same("Required operational-support flow model"),
        same("Session approval and accountability design"),
        same("Implementation roadmap and evidence pack")
      ],
      bestFor: [
        same("Plants with legacy vendor VPNs or persistent support connections."),
        same("Rail signaling, CBTC, PTC, depot, or traction-power support environments."),
        same("Water and wastewater remote telemetry or integrator access."),
        same("Data-center BMS/EPMS, generator, cooling, or OEM support."),
        same("Defense/government facilities requiring sovereign or air-gapped access patterns.")
      ],
      cta: same("Discuss secure remote access")
    },
    {
      number: "05",
      title: same("OT Security Baseline"),
      quote: same("Set a floor every site can meet."),
      lead: same(
        "One minimum OT-security standard, written so that the smallest, oldest, or most constrained site can actually implement it."
      ),
      whatWeDo: [
        same("Establish the minimum technical, operational, governance, access, asset, backup, monitoring, and supplier controls expected across the estate."),
        same("Define what is mandatory, what is conditional, and what must be documented as an exception."),
        same("Create maturity steps that do not punish sites for genuine operational or lifecycle constraints."),
        same("Align the baseline to IEC 62443 concepts, relevant sector obligations, and customer risk appetite."),
        same("Translate policy language into checkable engineering and operating practices."),
        same("Build a repeatable evidence model so the baseline is not only self-attested.")
      ],
      whatYouReceive: [
        same("Estate-wide OT security baseline"),
        same("Minimum-control catalogue"),
        same("Site applicability and exception model"),
        same("Evidence requirements"),
        same("Assessment and review criteria"),
        same("Improvement maturity path"),
        same("Governance and ownership structure")
      ],
      bestFor: [
        same("Multi-site industrial, utility, water, transportation, or government estates."),
        same("Organizations that have policy but no practical OT baseline."),
        same("Acquirers integrating multiple sites or inherited control environments."),
        same("Operators preparing for NIS2, IEC 62443, customer, insurer, or board scrutiny.")
      ],
      cta: same("Discuss an OT security baseline")
    },
    {
      number: "06",
      title: same("Capability Transfer"),
      quote: same("Make us able to run it ourselves."),
      lead: same("An engagement designed to end, because scarce OT expertise should remain in your team."),
      whatWeDo: [
        same("Build the Twin collaboratively with customer engineering, operations, security, safety, product, procurement, and assurance teams."),
        same("Explain the reasoning behind prioritization, controls, pathways, and risk decisions."),
        same("Create practical working methods for reviewing changes, suppliers, vulnerabilities, access, and exceptions."),
        same("Develop decision templates, evidence standards, and repeatable governance routines."),
        same("Run scenario workshops and tabletop exercises using the customer's own modeled environment."),
        same("Hand over the model, evidence structure, and decision logic — not only a report.")
      ],
      whatYouReceive: [
        same("Customer-owned model and evidence structure"),
        same("Working procedures and decision templates"),
        same("Scenario and change-review workshops"),
        same("Training for engineering, security, operations, and governance teams"),
        same("Defined handover and operating model"),
        same("Optional ongoing support arrangement")
      ],
      bestFor: [
        same("Teams building internal OT-security ownership."),
        same("Organizations with a small central security team and distributed operational assets."),
        same("Customers who want an external assessment to become internal capability."),
        same("Sovereign, defense, and government environments where long-term operational control is essential.")
      ],
      cta: same("Discuss capability transfer")
    }
  ]
};

export const ENGAGEMENT_MODELS = {
  h2: same("Start small. Keep the model if it proves useful."),
  intro: same(
    "This section makes clear that OXOT can deliver short engagements and long-term support without making the buyer choose a large programme upfront."
  ),
  rows: [
    {
      model: same("Decision Sprint"),
      start: same("One difficult decision: remote access, segmentation, vulnerability backlog, patch, supplier, capex, acquisition, or high-priority system"),
      outcome: same("A focused model, scenario analysis, options comparison, and evidence-backed recommendation")
    },
    {
      model: same("Assessment or Design Engagement"),
      start: same("One facility, line, zone, railway application, product, data-center environment, or critical operational system"),
      outcome: same("System model, prioritized actions, architecture/treatment design, and implementation roadmap")
    },
    {
      model: same("Cyber Digital Twin Build"),
      start: same("A strategic facility, site portfolio, estate, product family, railway environment, or critical operational domain"),
      outcome: same("A validated model that supports recurring decisions, evidence, and change analysis")
    },
    {
      model: same("Continuous Twin Operations"),
      start: same("An evolving environment with recurring changes, suppliers, vulnerabilities, operational constraints, and assurance needs"),
      outcome: same("Ongoing model updates, risk deltas, scenario testing, governance views, and expert support")
    },
    {
      model: same("Capability Transfer Programme"),
      start: same("A customer that needs sustained internal expertise and ownership"),
      outcome: same("Training, joint modeling, decision templates, evidence governance, and planned handover")
    }
  ],
  pullQuote: same(
    "You do not need to commit to a multi-year programme to start. Begin with the system, change, or decision that matters now. If the model proves its value, it becomes the foundation for the next decision."
  )
};

export const IEC_UNDERNEATH = {
  h2: same("The architecture underneath all six services."),
  intro: same("Every consulting service rests on the same system model:"),
  chain: [
    same("System under consideration"),
    same("Assets and operational functions"),
    same("Zones and conduits"),
    same("Cyber pathways and dependencies"),
    same("Consequence and target protection"),
    same("Control design, implementation, and evidence")
  ],
  body: same("IEC 62443 provides the vocabulary and engineering structure for this work:"),
  bullets: [
    same("Define the system under consideration."),
    same("Understand assets, functions, interfaces, and operational boundaries."),
    same("Partition the environment into zones and conduits."),
    same("Assess risk according to realistic consequence and pathway."),
    same("Establish target security levels where applicable."),
    same("Define controls and security requirements."),
    same("Maintain evidence through operation and change.")
  ],
  pullQuote: same("Get the boundary wrong, and every control after it protects the wrong thing."),
  cta: same("Explore IEC 62443 assurance")
};

export const VENDOR_NEUTRAL = {
  h2: same("Engagements designed to end."),
  body1: same("The best consulting engagement leaves the customer stronger, not more dependent."),
  body2: same(
    "OXOT works with customer engineers rather than at them. The people responsible for safety, reliability, controls, operations, IT, procurement, security, and budget should be able to see the reasoning behind a decision."
  ),
  body3: same("Nobody is being audited for the sake of it. Findings are argued from evidence, not authority."),
  items: [
    { term: same("Vendor-neutral"), body: same("No product resale agenda.") },
    { term: same("Passive-first"), body: same("No agents on controllers and no active scanning of production networks.") },
    {
      term: same("Evidence you own"),
      body: same("Your system model, source material, decision rationale, and outputs remain available to your team.")
    },
    { term: same("Designed for handover"), body: same("The method, model, and reasoning stay when the engagement ends.") }
  ]
};

export const FINAL_CTA = {
  h2: same("Start with the decision that is hardest to make."),
  body: same(
    "Bring one P&ID, system diagram, asset list, topology export, vendor-access route, product architecture, supplier concern, hazard/RAMS question, or proposed change. OXOT will help you determine whether a focused consulting engagement, a Cyber Digital Twin build, or a longer-term operating model is the right next step."
  ),
  ctaPrimary: same("Discuss a consulting engagement"),
  ctaSecondary: same("Explore the Cyber Digital Twin")
};
