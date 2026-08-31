/**
 * HOME-2 CONTENT — transcribed verbatim from `OXOT Home.dc.html`
 * (claude.ai/design project 65e687bd-763e-4bf9-a99f-ca682458c385),
 * fetched in full via the DesignSync tool, 2026-08-21/22.
 *
 * ROUTE MAPPING. The design assumes routes that don't exist on the live
 * site (it was built as a standalone mockup). Mapped to what's actually
 * live, so content-guards' dead-link check stays honest:
 *   /cyber-digital-twin        -> /cdt-2 (the real top-level nav target,
 *                                  2026-08-22 — /twin is retired)
 *   /cyber-digital-twin#risk   -> /cdt-2#risk (only page with that id)
 *   /cyber-digital-twin#test   -> /cdt-2#test (only page with that id)
 *   /cif-nl                    -> /company (no dedicated grant page/anchor
 *                                  exists sitewide; the grant is fully
 *                                  detailed in-page here already)
 *   /founders                  -> /company#founders (src/components/
 *                                  company/founders.tsx)
 *   /contact                   -> unchanged
 *   #company, #sectors, #cases,
 *   #partners                  -> unchanged, in-page anchors on this page
 *   #talk                      -> #contact-band (the design's own closing
 *                                  CTA section was dropped for the site's
 *                                  global ContactBand; see the TALK removal
 *                                  note further down this file)
 *   /case-studies, /case-studies/<slug>, /collaboration
 *                               -> kept exactly as specified (owner
 *                                  instruction, 2026-08-22) even though
 *                                  none of these routes exist yet on the
 *                                  live site — npm run verify's dead-link
 *                                  gate will flag all 12 until they're
 *                                  built. Not silently rerouted to
 *                                  something that resolves, unlike the
 *                                  other mappings above, because this one
 *                                  was an explicit, deliberate choice
 *                                  rather than something I had to infer.
 *
 * FDD and CONSULTING removed 2026-08-22 (owner request) — the Facility Due
 * Diligence section is gone from this page, and the condensed "Work we are
 * regularly asked to run" services sidebar was replaced with the real
 * six-card services grid, reused directly from /cdt-2 rather than
 * duplicated here. See the doc comment in home-2/page.tsx.
 */

export const HERO = {
  eyebrow: "Dutch OT cybersecurity",
  h1Lines: ["See your OT environment.", "Understand the risk.", "Know what to do next."],
  subhead: "For the industries that cannot afford to stop.",
  body: "We build a working model of your plant from the engineering documents you already hold — then attack it, change it and price it, so the answer arrives as work your team can start on Monday and a number your board can sign.",
  /* #contact-band, not #talk — the design's own #talk section was dropped
     in favor of the site's global ContactBand (see the TALK removal note
     near the bottom of this file), so this now scrolls to that band's own
     heading id instead of a page-local section that no longer exists. */
  ctaPrimary: { label: "Talk to OX", href: "#contact-band" },
  ctaSecondary: { label: "See the Cyber Digital Twin", href: "/cdt-2" },
  image: "/images/home2/CDT_7_Box_Frame_Dark.png",
  strip: [
    { n: "01", tag: "SEE", title: "The plant as it actually is", body: "Assets, architecture, dependencies and the controls meant to stop an attacker — modelled from your own record, not a reference plant." },
    { n: "02", tag: "UNDERSTAND", title: "Consequence before severity", body: "What physically stops running, whether anyone can reach it, and what that would cost — in euros, with the reasoning attached." },
    { n: "03", tag: "DECIDE", title: "A queue, and a defensible decision to defer", body: "Work ranked by risk removed per euro — and a written, defensible decision about what cannot hurt you." }
  ]
};

export const FOUR_DECISIONS = {
  eyebrow: "Four decisions this makes answerable",
  decisions: [
    { title: "What do we fix first?", body: "Findings ranked by what they would actually cost you, not by severity score." },
    { title: "What should we spend?", body: "A figure with a ceiling on it, and the point past which more money buys little." },
    { title: "Can we change this safely?", body: "Test the firewall, the re-zoning or the patch in the replica before the plant." },
    { title: "What can we ignore?", body: "A written, defensible decision to leave alone what cannot reach anything that matters.", accent: true }
  ],
  image: "/images/home2/cdt_diminishing_returns_curve.png",
  imageCaption: "Risk removed against euros spent. The answer is the point where the curve stops paying."
};

export const COMPANY = {
  eyebrow: "Company",
  h2: "The full picture of your OT risk — and where your next euro reduces it most.",
  introLeadBold: "OXOT is a Dutch OT-cybersecurity company for the industries that cannot afford to stop.",
  introLeadRest: " Our mission: protect the critical infrastructure that sustains society and powers progress — reliable energy, clean water and healthy food, for the generations after us.",
  introSecond: "We give you the full picture. Not what's good for us — what's true for your situation.",
  introRight: "Most security reports tell an industrial operator how they score against a framework. That is not the same as knowing which failure would actually stop the line, or which of this year's fixes is worth doing first. We are engineers who have run plants — so the answer arrives as work your team can start on Monday, and a number your board can sign.",
  practiceHeading: "What that means in practice",
  points: [
    { bold: "OT engineers, not IT security.", rest: " The process, the machines and the constraints come first. Never office IT copied onto the plant floor." },
    { bold: "A number, not an adjective.", rest: " Risk priced in euros and ranked, so the next euro goes where it removes the most risk — not where a checklist happens to point." },
    { bold: "What is true, not what is good for us.", rest: " Including the part that does not flatter us. Every checkable claim on this site carries its source, one click away." },
    { bold: "Your data and your model stay yours.", rest: " Kept in the EU, and vendor-neutral always — we have nothing to sell you that we did not build." },
    { bold: "Engagements designed to end.", rest: " We would rather leave the capability inside your team than leave a dependency on ours." }
  ],
  grantNote: "The Dutch government and the European Cybersecurity Competence Centre co-invested in our Cyber Digital Twin under CIF-NL 2025 — the one credential here that somebody else adjudicated.",
  grantLinks: [
    { label: "What the Netherlands funded →", href: "/company" },
    { label: "Meet the founders →", href: "/company#founders" }
  ]
};

export const TWO_WAYS_IN = {
  eyebrow: "Two ways in",
  h2: "A model, and the engineers who use it.",
  panels: [
    { tag: "Product", title: "Cyber Digital Twin", body: "A working model of your operational estate, where a security change can be tested before it ever reaches the plant — and where the consequence is priced in euros.", link: { label: "See what the Dutch government funded →", href: "/cdt-2" } },
    { tag: "Practice", title: "Consulting", body: "IEC 62443 zones, conduits and security levels, decided by engineers who have run the plants. On live rail, energy and manufacturing programmes.", link: { label: "See what OXOT consultants do →", href: "/consulting" } }
  ]
};

export const TWIN = {
  eyebrow: "Cyber Digital Twin · Dutch OT cybersecurity",
  h2Lead: "You cannot defend what you have never ",
  h2Accent: "modelled",
  h2Trail: ".",
  intro: "The OXOT Cyber Digital Twin is a living, queryable model of your plant — every asset, every flow, every dependency — built from documents you already hold. Four engineering disciplines meet in it:",
  disciplines: [
    { n: "01", title: "Engineering-accurate facility model", body: "Equipment, wiring, piping, signals and Purdue L0–L5 zones, from your P&IDs and DEXPI standards." },
    { n: "02", title: "What-if scenario simulation", body: "Test a firmware update, a re-zoning or a failure mode before it touches live production." },
    { n: "03", title: "Safety, reliability and cyber convergence", body: "SIL (IEC 61508), FMECA (IEC 60812) and RAMS metrics joined to live CVE and KEV exploit data." },
    { n: "04", title: "Capital investment prioritisation", body: "Loss exposure in euros, so remediation is ranked by what the next euro actually buys." }
  ],
  callout: {
    title: "Consequence first. Then likelihood.",
    body: "We agree the minimum operating requirements with your plant engineers before modelling a single threat vector. A scenario only counts if it breaches one of your operational baselines — which is why the answer arrives in the vocabulary of the plant rather than of a SOC.",
    link: { label: "How consequence-driven analysis works →", href: "/cdt-2#risk" }
  },
  grantReceipt: {
    heading: "Dutch grant awarded — “a truthful copy”",
    rows: [
      { label: "Fund", value: "Netherlands Cybersecurity Innovation Fund — CIF-NL 2025, administered by RVO, coordinated by NCC-NL, commissioned by the Ministry of Economic Affairs, co-funded by the European Cybersecurity Competence Centre." },
      { label: "Award", value: "The maximum grant available under CIF-NL 2025, a round RVO published with a range of €60,000–€100,000." },
      { label: "Selection", value: "One of 13 projects selected from 95 applications · 17 of a possible 20 points." },
      { label: "Announced", value: "Announced 14 July 2026. Applicant of record: Oxot B.V." }
    ],
    quoteLabel: "RVO's words",
    quote: "“A truthful copy of reality.”",
    links: [
      { label: "RVO — every CIF-NL project and every score ↗", href: "https://www.rvo.nl", external: true },
      { label: "The grant, in full →", href: "/company" }
    ]
  },
  testControl: {
    eyebrow: "Test the control before you buy it",
    h3: "Change the model. Then change the plant.",
    body: "Add the firewall virtually, redraw the segmentation, apply the patch campaign — then re-run the attacks and compare the results. The difference between the two runs is the risk that control actually buys, quantified before the purchase order and without touching production.",
    link: { label: "How a what-if experiment runs →", href: "/cdt-2#test" },
    image: "/images/home2/CDT_Simulation_2_Layers_Dark.png"
  }
};

export const CASE_STUDIES = {
  eyebrow: "Case studies",
  h2: "Work we have actually done.",
  intro: "Each of these started as somebody's problem rather than as a service line — a deal on a clock, an architecture nobody could draw, a vendor route nobody could account for. Written up as what we found, what we changed, and what the client was left holding.",
  items: [
    { n: "01", slug: "ma-ot-due-diligence", title: "M&A OT Due Diligence", hook: "A whole estate valued on a deal clock, without walking every site." },
    { n: "02", slug: "digital-transformation", title: "Digital Transformation", hook: "New connectivity added without quietly widening the attack surface." },
    { n: "03", slug: "it-ot-architecture-convergence", title: "IT/OT Architecture Convergence", hook: "Two estates joined without the plant inheriting office assumptions." },
    { n: "04", slug: "plant-architecture-review", title: "Plant Architecture Review & Roadmap", hook: "The as-built picture, and a sequence of work that survived the plant manager." },
    { n: "05", slug: "plant-remote-access", title: "Plant Remote Access", hook: "The OEM kept its access; the operator gained an audit trail." },
    { n: "06", slug: "iec-62443-adoption", title: "IEC 62443 Adoption", hook: "Zones and conduits adopted as engineering practice, not paperwork." },
    { n: "07", slug: "compliance-preparation", title: "Compliance Preparation", hook: "Evidence generated from work already underway rather than a parallel project." },
    { n: "08", slug: "cyber-integration-lead", title: "Cyber Integration Lead", hook: "An embedded lead holding the line between the project and the plant." },
    { n: "09", slug: "threat-vulnerability-workshops", title: "Threat & Vulnerability Workshops", hook: "Operators and engineers reaching the same list, in the same room." },
    /* Item 10 spans 2 grid columns in the design, the same width as the
       "All case studies" tile beside it — the row this way reads 1 wide
       card + 1 wide card instead of 1 narrow + a lot of empty space. */
    { n: "10", slug: "cyber-first-responder-training", title: "Cyber First Responder Training", hook: "The people on shift, trained for the first hour — because that is who will be there.", wide: true }
  ],
  allLink: { label: "All case studies →", body: "Sorted by sector and by the problem that started them.", href: "/case-studies" }
};

export const PARTNERS = {
  eyebrow: "Partners & collaboration",
  h2: "Nobody secures a plant alone.",
  intro: "We work alongside integrators, OEMs, research institutes and the operators themselves. Vendor-neutral by design — we have nothing to sell you that we did not build.",
  columns: [
    { tag: "Manufacturing & energy", title: "Process and generation", body: "Joint programmes with integrators and OEMs on live plants, where the twin gives both sides the same picture to argue from." },
    { tag: "Transportation", title: "Rail, ports and logistics", body: "TS 50701 alongside IEC 62443, on estates where a single outage propagates down the chain to everyone else's schedule." },
    { tag: "Research", title: "Institutes and standards work", body: "The method is only as good as the scrutiny it survives, which is why we would rather be interrogated than believed." }
  ],
  closing: "If you build, integrate or operate in these sectors and the model would make your work easier to defend, we are interested in the conversation.",
  closingLink: { label: "How we collaborate →", href: "/collaboration" }
};

export const SECTORS = {
  eyebrow: "Where we work",
  h2: "The industries that cannot afford to stop.",
  /* Expanded 4 -> 6, 2026-08-22 (owner) — same six industries as
     Cdt2WhereWeWork's WHERE_WE_WORK.industries (content-2.ts), which this
     was always a duplicate of; kept in sync deliberately, not by accident. */
  intro: "Six sectors where a cyber event is not an IT incident but a physical one, and the consequence is measured in production, safety and public service.",
  industries: [
    { name: "Manufacturing & Process", body: "Discrete and process lines where an unplanned stop is measured in shifts, and a quality excursion in recalls." },
    { name: "Energy & Utilities", body: "Generation, grid and fuels, where minimum operating requirements are a licence condition rather than a preference." },
    { name: "Water & Wastewater", body: "Treatment and distribution, where the safety function protecting a dosing set point is the last line before the public." },
    { name: "Rail & Transportation", body: "Rail, ports and logistics, where TS 50701 sits alongside IEC 62443 and an outage propagates down the chain." },
    { name: "Hyperscale & Data Centers", body: "Cooling, power and physical-security systems where uptime is the product itself, and a control-plane compromise is a headline before it is a ticket." },
    { name: "Defense & Government", body: "Programmes where a supply-chain or product-security gap is a sovereignty question, not only an operational one, and evidence has to survive an adversarial audit." }
  ]
};

/* TALK — the design's own closing CTA is deliberately not implemented as a
   page section. The site's global ContactBand renders the identical ask
   (title, body, CTA, email) right before the footer on every route — see
   the no-page-local-CTA note in app/[locale]/home-2/page.tsx. */
