/**
 * ABOUT OXOT — content for /company.
 *
 * AUTHORITATIVE SOURCE: new_material_source/1_website_layout_v4/7_company/
 * company.md, which specifies this page's H1, section order and recommended
 * copy verbatim ("~1,200-1,800 words, evidence-led, not a long corporate
 * history"). Every string below is transcribed from that file, not
 * paraphrased or invented.
 *
 * This replaces the page's previous content, which was built from
 * `content/pages/en/company.md` and `content/pages/en/about.md` — two files
 * that predate this spec set entirely and are unrelated to it despite the
 * similar filename. Per the owner's standing instruction (2026-08-23) to
 * build exclusively from `new_material_source` and not reuse or reconcile
 * whatever already exists, the founders' bios, the RVO grant credential
 * panel, and the services/values sections that page carried are not
 * reproduced here — company.md does not call for them. See this page's
 * page.tsx doc comment for the full account of what changed and why.
 *
 * `Bilingual`-typed via `same()` — both locales render, `nl` is a
 * same-as-English placeholder pending translation, matching the convention
 * used for every other section built this session.
 */
import { same } from "@/components/industries/registry";

export const META = {
  title: "About OXOT | Built for the industries that cannot afford to stop",
  description:
    "OXOT is a Dutch OT cybersecurity company for the systems that sustain society. We use the Cyber Digital Twin to connect engineering evidence, operational consequence, cyber pathways, and decision-making."
};

export const HERO = {
  h1: same("Built for the industries that cannot afford to stop."),
  lead: same(
    "OXOT is a Dutch OT cybersecurity company for the systems that sustain society: reliable energy, clean water, healthy food, safe mobility, secure digital infrastructure, and sovereign public services."
  ),
  lead2: same(
    "We use the OXOT Cyber Digital Twin to connect engineering evidence, operational consequence, cyber pathways, and decision-making — so critical systems can be secured without losing sight of how they operate."
  ),
  ctaPrimary: same("Talk to an OT Engineer"),
  ctaSecondary: same("Explore the Cyber Digital Twin")
};

export const MISSION = {
  h2: same("Protect the infrastructure that sustains society."),
  body1: same(
    "Our mission is to protect the critical infrastructure that sustains society and powers progress — for the generations after us."
  ),
  body2: same(
    "Critical systems cannot simply be scanned, patched, restarted, or segmented because a generic security tool says so. Every change must account for process constraints, safety, reliability, maintenance, suppliers, recovery, and the physical consequence of getting it wrong."
  )
};

export const WHY_EXISTS = {
  h2: same("Cybersecurity should begin with consequence — not a score."),
  body1: same(
    "A vulnerability list cannot tell you what matters most in a live operational environment. A critical vulnerability on an unreachable asset is not the same as a reachable pathway to a safety-related controller, signaling engineering environment, water-treatment system, cooling plant, or critical power function."
  ),
  body2: same(
    "OXOT begins with the system itself: what it does, what it depends on, what can reach it, and what happens if it fails or is manipulated."
  ),
  chain: [
    same("Engineering reality"),
    same("Operational and safety consequence"),
    same("Cyber reachability"),
    same("Threat and supplier context"),
    same("Evidence-backed decision")
  ]
};

export const PRINCIPLES = {
  h2: same("Five principles, whichever system you operate."),
  rows: [
    {
      term: same("Founded by practitioners"),
      body: same(
        "OXOT was founded by former Fox-IT and NCC Group OT security leads. We understand that a good recommendation must survive engineering review, live operations, vendor constraints, maintenance windows, and executive scrutiny."
      )
    },
    {
      term: same("Operational Technology"),
      body: same(
        "OT is not office IT copied onto the plant floor. It includes control systems, physical processes, safety barriers, long-lived assets, human operators, suppliers, and consequences beyond data loss."
      )
    },
    {
      term: same("Risk-based method"),
      body: same(
        "OXOT uses a consequence-led, risk-based method engineered to IEC 62443 principles. We model systems, assets, zones, conduits, pathways, controls, and operational constraints before recommending action."
      )
    },
    {
      term: same("Sovereignty"),
      body: same(
        "Your data and your model stay yours. OXOT supports isolated, data-diode, and dedicated single-tenant deployment approaches for sensitive and sovereign environments."
      )
    },
    {
      term: same("Vendor-neutral"),
      body: same(
        "We do not begin with a preferred product or reseller agreement. We compare controls and options against the same modeled system, pathway, consequence, and operational constraint."
      )
    }
  ]
};

export const HOW_IT_WORKS = {
  h2: same("One system model. Better decisions."),
  lead: same(
    "OXOT combines OT cybersecurity consulting with the Cyber Digital Twin. We build the model with your teams from the engineering and operational evidence you already hold — then use it to test decisions before they affect the live environment."
  ),
  steps: [
    {
      title: same("Understand the environment"),
      body: same("Engineering evidence, assets, topology, configuration, dependencies.")
    },
    {
      title: same("Build the Twin"),
      body: same("Process/facility, controls, networks, suppliers, pathways, and consequences.")
    },
    {
      title: same("Test the decision"),
      body: same("Segmentation, vendor access, patching, replacement, supplier, or investment.")
    },
    {
      title: same("Produce evidence"),
      body: same(
        "A traceable rationale for engineering, operations, security, safety, procurement, assurance, and leadership."
      )
    }
  ],
  link: same("How the Cyber Digital Twin works")
};

export const SOVEREIGNTY = {
  h2: same("Your model stays under your control."),
  body1: same(
    "Critical-infrastructure evidence can include OT topology, control configurations, safety information, supplier dependencies, recovery procedures, and sensitive operational constraints. OXOT supports passive-first deployment models that do not require agents on PLCs, RTUs, or controllers, and do not actively scan production networks."
  ),
  body2: same(
    "The Cyber Digital Twin can run in a customer-controlled isolated environment, receive approved intelligence through a one-way data diode, or operate in a dedicated single-tenant instance aligned to data-sovereignty requirements."
  ),
  link: same("Explore Air-Gapped Deployments")
};

export const INDUSTRIES = {
  h2: same("Where the consequence is real."),
  body: same(
    "The industries differ, but the problem is consistent: cyber risk must be understood in the context of the physical system, operational dependencies, safety and recovery requirements, supplier ecosystem, and consequences of change."
  ),
  cards: [
    same("Manufacturing & Process"),
    same("Energy & Utilities"),
    same("Water & Wastewater"),
    same("Rail & Transportation"),
    same("Hyperscale & Data Centers"),
    same("Defense & Government")
  ]
};

export const FINAL_CTA = {
  h2: same("Start with one real decision."),
  body: same(
    "Bring one P&ID, system diagram, asset list, network topology, product architecture, hazard/RAMS question, supplier concern, or proposed change. OXOT will help determine whether a Cyber Digital Twin can support the decision."
  ),
  ctaPrimary: same("Talk to an OT Engineer"),
  ctaSecondary: same("Explore the Technical Specification")
};
