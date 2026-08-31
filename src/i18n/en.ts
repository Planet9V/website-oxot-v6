/**
 * English copy. THIS FILE DEFINES THE SHAPE; `nl.ts` must satisfy it exactly,
 * so a missing Dutch string is a type error at build time rather than an
 * English sentence discovered on a Dutch page by a customer.
 *
 * That check is the whole point. The previous site shipped English-only strings
 * into Dutch pages repeatedly, and every instance was found by a human reading
 * the page — never by the build.
 *
 * Facts do not live here. Anything checkable — dates, figures, the grant, the
 * CRA articles — comes from `src/content/claims.ts`, which carries each claim's
 * source and clearance. This file holds the sentences around them.
 */

export const en = {
  meta: {
    title: "OXOT — OT security engineering for the systems that cannot stop",
    titleTemplate: "%s | OXOT",
    description:
      "OXOT is a Dutch OT engineering firm. We turn what you already have — P&IDs, asset registers, SBOMs — into a technical file that clears first review and a risk number in euros."
  },

  nav: {
    /* Accessible landmark names. They are read aloud, so they name the region,
       not the design: "Primary" is what a screen-reader user needs to hear. */
    primary: "Primary",
    footer: "Footer",
    home: "OXOT — home",
    skipToContent: "Skip to content",
    breadcrumb: "Breadcrumb",
    /* Announced by screen readers on every outbound citation. Lived hardcoded
       in English inside Cite and shipped 8x on /nl/cra. */
    newTab: "opens in a new tab",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    fdd: "Facility Due Diligence",
    headerCta: "Talk to OX",
    contactNav: "Contact",
    reference: "Reference",
    consulting: "Consulting",
    company: "Company",
    aboutOxot: "About OXOT",
    /* Nav label renamed CDT-2 -> Platform, 2026-08-22 (owner) — URL stays
       /cdt-2 for now; see PATHS.cdt2 in shell/nav.ts. Now the only Cyber
       Digital Twin destination — /twin, /insights, /frameworks and
       /iec-62443 were retired the same day, along with their nav entries. */
    cdt2: "Platform"
  },

  theme: {
    toggle: "Toggle light or dark theme"
  },

  legal: {
    breadcrumb: "Legal",
    updated: "Last updated",
    privacyLink: "Privacy Policy",
    cookiesLink: "Cookie Policy",
    termsLink: "Terms of Use",
    /* Short forms for the footer bar. The pages keep their full titles. */
    privacyShort: "Privacy",
    cookiesShort: "Cookies",
    termsShort: "Terms",
  },
  cookieBanner: {
    title: "Cookies on this site",
    body: "We set one strictly necessary cookie to remember your appearance preference. Nothing else is stored without your say-so.",
    accept: "Accept analytics",
    decline: "Essential only",
    policyLink: "Read the cookie policy",
    settings: "Cookie settings"
  },
  language: {
    /* The switch is a real navigation between two canonical URLs, not a
       client-side string swap, so it is labelled as one. */
    label: "Language",
    switchTo: "Switch to English"
  },

  footer: {
    /* A brand lockup, deliberately NOT translated: the tagline mirrors the
       capital X of the wordmark, and "Operationele eXcellentie" does not.
       It is an asset, not a sentence. */
    tagline: "Operational eXcellence in Operational Technology",
    /* The descriptor the old footer carried and this one had dropped. It is
       what the reader needs after the tagline: the tagline is a brand lockup,
       this is the sentence that says what the firm does. "Security engineering
       firm", not the old "cybersecurity consultancy" — the cleared positioning
       is an engineering firm, and the footer must not contradict the homepage
       (owner, option B, 2026-08-08). */
    descriptor:
      "OXOT is an operational-technology (OT) security engineering firm. We help industrial operators, manufacturers and integrators secure their systems — from assessments and architecture to the Cyber Digital Twin and long-term security programmes.",
    entity: "OXOT B.V. · Netherlands",
    site: "Site",
    checkUs: "Check us",
    rvoLink: "RVO — CIF-NL granted projects",
    rvoNote: "Every project, every score, published by the administering body.",
    euLink: "Regulation (EU) 2024/2847",
    euNote: "The Cyber Resilience Act, in full, at EUR-Lex."
  },

  /* TRIMMED, 2026-08-22 (owner) — the retired original homepage (and /twin,
     which most of the removed keys here linked to) is gone. Only the
     positioning paragraph /company still shares with the old page's first
     section survives; the twin/consulting/onward keys are deleted, not
     just unused. */
  home: {
    aboutHook: "Most security reports tell an industrial operator how they score against a framework. That is not the same as knowing which failure would actually stop the line, or which of this year's fixes is worth doing first. We are engineers who have run plants — so the answer arrives as work your team can start on Monday, and a number your board can sign.",
    aboutPointsLabel: "What that means in practice",
    aboutPoint1Term: "OT engineers, not IT security",
    aboutPoint1Body: "The process, the machines and the constraints come first. Never office IT copied onto the plant floor.",
    aboutPoint2Term: "A number, not an adjective",
    aboutPoint2Body: "Risk priced in euros and ranked, so the next euro goes where it removes the most risk — not where a checklist happens to point.",
    aboutPoint3Term: "What is true, not what is good for us",
    aboutPoint3Body: "Including the part that does not flatter us. Every checkable claim on this site carries its source, one click away.",
    aboutPoint4Term: "Your data and your model stay yours",
    aboutPoint4Body: "Kept in the EU, and vendor-neutral always — we have nothing to sell you that we did not build.",
    aboutPoint5Term: "Engagements designed to end",
    aboutPoint5Body: "We would rather leave the capability inside your team than leave a dependency on ours.",
  },

  timeline: {
    caption: "Five dates · five obligations",
    measuredFrom: "Measured from {date}",
    badgeNext: "Next",
    badgeTarget: "Target",
    /* "In force {days} days" sat in the same right-hand slot as four FUTURE
       offsets (+35, +126, +491) with no temporal marker, so it read as "in
       force IN 57 days" — the exact opposite of the fact. It needs the marker
       the Dutch already had. */
    inForce: "In force {days} days ago",
    ahead: "+{days} days",
    window: "+{from} → +{to} days",
    today: "↑ Today",
    axisEnd: "Dec 2027",
    distances:
      "{reporting} days to the reporting clock. {ce} days to CE marking.",
    article69Link: "Article 69, at EUR-Lex"
  },

  grant: {
    heading: "Dutch Grant Awarded — \u201cA Truthful Copy\u201d",
    rowFund: "Fund",
    rowAward: "Award",
    rowField: "Selection",
    rowAnnounced: "Announced",
    rowRvoWords: "RVO's words",
    registerLink: "RVO — every CIF-NL project and every score"
  },
  /* The standing ask above the footer. See components/shell/contact-band.tsx
     for why it is one band rather than an ask inside each door card. */
  contactBand: {
    kicker: "Talk to OX",
    heading: "Tell us what you are trying to protect.",
    body: "A short conversation with the people who would do the work — not a sales call and not a discovery questionnaire. Describe the plant, the product or the deadline you are up against, and we will tell you plainly whether we are the right firm for it.",
    cta: "Converse with OX",
    orMail: "Prefer to write?"
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Send it in writing and an OXOT engineer answers in two working days — a plain assessment of your OT security question, no call required.",
    breadcrumb: "Contact",
    termCompany: "Company",
    termEmail: "Email",
    sendHeading: "Send it",
    sendBody:
      "A plant, a product, or a problem — a sentence is enough to start. The reply engages with what you actually wrote, not a template.",
    /* Owner-supplied rebuild, 2026-08-22, from new_material_source/1_website_
       layout_v4/7_company/contact.md — "What to bring" lede, decision
       selector, and company registration details. Cleaned up 2026-08-23:
       the old r1-review facts panel and founders block these keys once sat
       alongside (whoReplies, ladder, twinAsk, the four bullets) were removed
       from the live page — none of that traced to contact.md — so their
       dictionary keys were removed too. */
    whatToBringP1:
      "You do not need perfect data to begin. A useful first conversation can start with one system diagram, P&ID, asset list, network export, signaling architecture, product design, supplier question, or proposed change.",
    whatToBringP2:
      "OXOT will help determine whether a Cyber Digital Twin, Decision Sprint, or technical briefing is the right next step.",
    companyDetailsHeading: "Company details",
    termAddress: "Address",
    termKvk: "KVK",
    termVat: "VAT"
  },
  form: {
    /* Validation messages say what to do and why, not "This field is
       required" — the reader is being asked for something, so the ask is
       stated. */
    errName: "Enter your name, so the reply can be addressed to someone.",
    errEmail: "Enter a work email — it is where the written review is sent.",
    errEmailShape: "That email address does not look complete.",
    errMessage:
      "Tell us what needs answering, in one sentence if that is all it takes.",
    receivedKicker: "Received",
    receivedHeading: "We have it.",
    receivedNote:
      "An engineer replies to what you actually wrote — in two working days, in writing.",
    failedHeading: "That did not send.",
    invalidHeading: "There is something to fix first.",
    failedLead: "Something went wrong on our side. Try again, or write straight to",
    labelName: "Name",
    labelEmail: "Work email",
    labelOrganisation: "Organisation",
    labelRole: "Role",
    labelIndustry: "Industry / environment",
    labelCountry: "Country or region",
    decisionHeading: "What are you evaluating?",
    decisionOtRisk: "OT risk prioritization",
    decisionSegmentation: "Segmentation, firewall, or remote-access change",
    decisionPatch: "Patch, upgrade, replacement, or modernization",
    decisionProductSecurity: "Product security or CRA technical documentation",
    decisionRailway: "Railway cybersecurity, RAMS, or safety evidence",
    decisionAirGapped: "Air-gapped or sovereign deployment",
    decisionSupplier: "Supplier, procurement, or investment decision",
    decisionOther: "Other",
    labelMessage: "What needs answering?",
    helpEmail: "Where the written review is sent.",
    helpRole: "It changes which part of the answer goes first.",
    helpMessageEmpty:
      "One sentence is enough. Paste a product name or a spec if it helps.",
    sending: "Sending…",
    submit: "Send this for a written review",
    privacyNote:
      "What you send is stored in OXOT's own database in the EU and read by the two people below. Name, work email, organisation, role, industry, country, the decision you selected and your message — nothing else, no tracking, no third party. Ask us to delete it and we do, same day.",
    submitNote: "Free. No call.",
    optional: "optional",
    required: "required",
    requiredField: " field"
  },
  doors: {
    heading: "Where would you like to start?",
    twinTitle: "Cyber Digital Twin",
    /* DOES NOT OPEN BY RESTATING THE HOME PAGE H1, 2026-08-09. It used to:
       "You cannot test a security change on a running plant" is `OXOT.constraint`,
       and claims.ts rules on that line — "Nothing else repeats it — vision §5."
       These doors close about ten pages, so the h1 was being repeated on nearly
       every one of them, and on /cra it landed twice in one screen.

       twin-claims.ts had already solved this for the /twin page and wrote the
       rule down: state the CONSEQUENCE of the constraint, not the constraint.
       That is what this now does — it leads with what the twin is, and the
       thing you cannot otherwise do is implied by the offer to do it. */
    twinBody:
      "A working model of your operational estate, where a security change can be tested before it ever reaches the plant \u2014 and where the consequence is priced in euros.",
    twinCta: "See what the Dutch government funded",
    consultingTitle: "Consulting",
    consultingBody:
      "IEC 62443 zones, conduits and SL-T, decided by engineers who have run the plants. On live rail, energy and manufacturing programmes.",
    consultingCta: "See what OXOT Consultants do"
  },
  fdd: {
    metaTitle: "Facility Due Diligence \u2014 the as-is baseline of an operating site",
    metaDescription:
      "Before you secure a facility, someone has to walk it. An as-is baseline of what is installed, how it is connected, who can reach it, and what happens to production if any of that fails \u2014 run by engineers, on the floor.",
    breadcrumb: "Facility Due Diligence",
    kicker: "Facility Due Diligence",
    heading: "Before you secure a facility, someone has to walk it.",
    lede1:
      "Most industrial sites carry cyber risk nobody has actually measured \u2014 a network drawing that predates the last three retrofits, an asset list built from memory rather than a walk of the floor, and physical access nobody has audited since the fence went up. None of that shows up until an assessor, an insurer, or an incident asks for it.",
    lede2:
      "Facility Due Diligence is how OXOT establishes that baseline before anything else starts: architecture, asset inventory to device level, incident-response readiness, and physical security, assessed on site by engineers rather than inferred from a questionnaire.",
    ledeQuestion:
      "How can you begin to defend these assets without knowing what you have in your OT environment, and what it exposes your organisation to?",
    answersLabel: "Questions it answers",

    statesTitle: "Baseline, operationalise, optimise.",
    statesDek: "One assessment, three states \u2014 and only the first of them is a report.",

    engagementTitle: "The engagement, drawn.",
    engagementDek:
      "Three stages and a fixed daily rhythm on site. The part that surprises people is at the left: coordination starts three weeks before anyone arrives.",
    stage1: "Stage 1 \u00b7 Pre-engagement",
    stage1Short: "PRE-ENGAGEMENT",
    stage1Body:
      "Communications, project and logistics plans. Scope validated. Permits, inductions and safety training arranged. Passive collection agreed and installed ahead of the visit, and a method statement written per site. A team that arrives already holding an asset picture spends its days on judgement rather than discovery.",
    stage2: "Stage 2 \u00b7 On site",
    stage2Short: "ON SITE",
    stage2Body:
      "A multi-disciplinary team on the floor to a standard daily schedule: induction, safety briefing, the workstreams, exit meeting. A draft report before the team leaves \u2014 a report written six weeks later argues with people\u2019s memories.",
    stage3: "Stage 3 \u00b7 Closure",
    stage3Short: "CLOSURE",
    stage3Body:
      "Equipment removed, permits and access revoked. Drafts out for comment with a deadline, then final reports and an executive readout with per-facility analysis and peer comparison across the estate.",
    leadTime: "T\u201321 DAYS",
    leadTimeNote: "permits \u00b7 sensors in",
    closureNote: "drafts \u2192 finals",
    disciplinesLabel: "FOUR DISCIPLINES, EVERY DAY",
    laneOt: "OT engineering",
    laneGovernance: "Governance",
    lanePhysical: "Physical security",
    lanePm: "Project management",
    diagramFoot: "A filled square is a day that discipline is on site. Physical security completes in the first three.",
    diagramCaption: "The engagement \u00b7 three stages, five site days, four disciplines",
    diagramAlt:
      "A timeline of a Facility Due Diligence engagement. On the left, a twenty-one day pre-engagement period for coordination, permits and installing passive collection. In the middle, five consecutive days on site. On the right, closure: drafts, final reports and an executive readout. Below, four discipline lanes \u2014 OT engineering, governance, physical security and project management \u2014 with a marker on each day that discipline is present; physical security completes after the third day.",

    workstreamsTitle: "What happens on the floor.",
    workstreamsDek: "Six workstreams, run by people who have operated this kind of plant.",
    sectorTitle: "The work programme is fitted to your sector\u2019s own risk standard.",
    sectorBody:
      "A water utility, a hyperscale data centre and a food plant do not share a risk vocabulary, and pretending they do is how assessments get filed and forgotten. Water and wastewater aligns to J100 / RAMCAP; manufacturing, power generation and distribution, maritime, aviation, transportation, data centres and commercial facilities each have their own anchor. Findings arrive in a form the regulator, the insurer and the board already recognise.",

    deliverablesTitle: "What lands on the desk.",
    deliverablesDek: "Per facility, plus one executive view across the estate.",

    casesTitle: "Two engagements, in outline.",
    casesDek: "How the method lands in two very different estates.",
    caseSituation: "Situation",
    caseProgramme: "Programme",
    caseOnSite: "On site",
    caseChanged: "What changed",
    caseAName: "A multi-site water and wastewater utility",
    caseASituation:
      "Treatment plants, pumping stations and reclamation facilities across a service area. Each site had grown its own control system over twenty years, each had a different integrator, and no two agreed on what \u201cthe network\u201d meant. The utility had to answer to a risk standard and could not answer what was installed.",
    caseAProgramme:
      "Aligned to J100 / RAMCAP, so the output would sit inside the risk process the utility already ran rather than beside it. Passive collection in at each site thirty days ahead. Five days per major site; the small well-sites condensed and grouped, because a two-day programme at a site with nine assets is a way of spending money.",
    caseAOnSite:
      "Walk the plant with the operators. Compare the drawing to the cabinet. Trace what is genuinely reachable from the business network and from the integrator\u2019s laptop. Assess the control room as a physical space \u2014 who holds a key, what the door is made of, what is visible through the glass. Then put IT and OT in one room for a tabletop, which for most utilities is a first.",
    caseAChanged:
      "One asset inventory instead of fourteen, a per-site risk picture in J100\u2019s own terms, and a roadmap ordered by consequence to service delivery. The uncomfortable finding is usually the same one: the fastest route into the process is not the firewall.",
    caseBName: "A multi-plant manufacturer",
    caseBSituation:
      "Plants on three continents, an acquisition history, and a group CISO who had inherited responsibility for OT without inheriting visibility into it. Corporate IT security was mature. The plants were a different country.",
    caseBProgramme:
      "Architecture assessed IT and OT together, because the interesting risk lives at the seam. A MITRE-based threat model built for manufacturing rather than a generic adversary list. Passive inventory to device level. IR diagnostic and tabletop with both teams. Forensics readiness \u2014 the question nobody asks until the week they need it.",
    caseBOnSite:
      "Five days per plant to a fixed schedule: induction, safety briefing, workstreams, exit meeting, draft report before the team leaves the country. The draft-before-departure discipline matters more than it sounds.",
    caseBChanged:
      "Per-plant reporting the group could compare, an executive readout ranking plants against each other rather than against an abstract maturity scale, and quick wins that did not need a capital cycle. The roadmap separated what corporate could mandate from what each plant had to own \u2014 the distinction that decides whether a programme survives its second year.",
    casesNote:
      "Both outlines are composites. No client, site count or figure is published, and none will be without written consent \u2014 a name is the client\u2019s to give, not ours to spend."
  },
  longform: {
    onThisPage: "On this page",
    readingTime: "{minutes} min read",
    words: "{words} words",
    updated: "Updated {date}",
    backTo: "All {section}",
  },
  caseStudies: {
    metaTitle: "Case Studies \u2014 work we have actually done",
    metaDescription:
      "Ten composite case studies covering M&A due diligence, architecture convergence, remote access, IEC 62443 adoption, compliance and incident-response training. No client named.",
    breadcrumb: "Case Studies",
    kicker: "Case Studies",
    casesHeading: "{count} cases, in detail",
  },
  reference: {
    metaTitle: "Reference \u2014 the regulations, carried to the clause",
    metaDescription:
      "Five long-form documents on IEC 62443, TS 50701, NIS2, the AI Act and the Machinery Regulation \u2014 written to be checked, not skimmed.",
    breadcrumb: "Reference",
    kicker: "Reference",
    heading: "The regulations, carried to the clause.",
    lede:
      "Long-form working documents, written for the engineer who has to act on them. Nothing here is a summary of a summary \u2014 every claim carries the article or clause it rests on, so you can disagree with us in one lookup.",
    weight: "{count} documents \u00b7 {words} words",
    sections: "{count} sections",
  },
} as const;

/**
 * Widen the literal types away, recursively.
 *
 * `as const` makes every value above its own literal type — `nav.cra` is not
 * `string`, it is the type `"The CRA"`. Without this, `nl.ts` could only
 * satisfy `Dictionary` by containing the English sentences, and the type check
 * meant to guarantee translation would instead have forbidden it. The first
 * build failed exactly that way, on all 22 Dutch strings at once.
 *
 * What survives is the SHAPE: every key, nested exactly as here, with string
 * values. A missing or misspelled Dutch key is still a build error — which is
 * the property CLAUDE.md §3 actually needs.
 */
type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
