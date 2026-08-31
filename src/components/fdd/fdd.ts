import type { Bilingual } from "@/i18n/bilingual";

/**
 * FACILITY DUE DILIGENCE — the methodology, as data.
 *
 * PROVENANCE. FDD is the owner's own methodology, built while leading the OT
 * practice at NCC Group and brought to OXOT. The source documents are the FDD
 * brochure, the preparation-and-planning work programme, the J100-aligned
 * work programme and the M&A Tier 1 statement of work, all supplied
 * 2026-08-08 and read in full.
 *
 * WHAT IS DELIBERATELY ABSENT: the previous firm's name, its corporate
 * boilerplate, and the single monitoring platform those documents specify.
 * The METHOD travels; a brochure does not. Everything here is rewritten and
 * vendor-neutral.
 *
 * NO OUTCOME FIGURES. None of the sources record a result that is safely
 * publishable, so none is claimed. The use cases are methodology walk-throughs
 * and say so.
 */

/** The arc, in the owner's three words. */
export const STATES: readonly { n: string; term: Bilingual; body: Bilingual }[] = [
  {
    n: "01",
    term: { en: "Baseline", nl: "Nulmeting" },
    body: {
      en: "A clear picture of what is in your OT environment — assets found, organised and understood. Defend against the immediate threats while preparing the ground for enduring security and operational resilience.",
      nl: "Een helder beeld van wat er in uw OT-omgeving staat — assets gevonden, geordend en begrepen. Weer de directe dreigingen af en leg tegelijk de basis voor blijvende security en operationele weerbaarheid."
    }
  },
  {
    n: "02",
    term: { en: "Operationalise", nl: "Operationaliseren" },
    body: {
      en: "You have a clear picture of the environment and its security maturity. Now the IT and OT risk controls get implemented — tailored to how your operations actually run, not to a reference architecture.",
      nl: "U hebt een helder beeld van de omgeving en de securityvolwassenheid. Nu worden de IT- en OT-risicomaatregelen ingevoerd — afgestemd op hoe uw operatie werkelijk draait, niet op een referentiearchitectuur."
    }
  },
  {
    n: "03",
    term: { en: "Optimise", nl: "Optimaliseren" },
    body: {
      en: "Fine-tune and secure operational continuity, so security stays current and sits inside daily operations rather than beside them in a report nobody opens.",
      nl: "Verfijn en borg de operationele continuïteit, zodat security actueel blijft en ín de dagelijkse operatie zit — niet ernaast, in een rapport dat niemand opent."
    }
  }
];

/** What happens on site. Six workstreams, from the brochure's own sequence. */
export const WORKSTREAMS: readonly { n: string; term: Bilingual; body: Bilingual }[] = [
  {
    n: "01",
    term: { en: "Architecture assessment", nl: "Architectuurbeoordeling" },
    body: {
      en: "IT and OT together, because the interesting risk lives at the seam. Paired with a sector-specific threat model built on MITRE ATT&CK for ICS rather than a generic adversary list.",
      nl: "IT en OT samen, want het interessante risico zit op de naad. Gecombineerd met een sectorspecifiek dreigingsmodel op basis van MITRE ATT&CK for ICS in plaats van een generieke lijst met aanvallers."
    }
  },
  {
    n: "02",
    term: { en: "Facility walk-through", nl: "Rondgang door de locatie" },
    body: {
      en: "The “as-is”, walked with the people who run the plant. Compare the drawing to the cabinet. What is documented and what is installed are two different facilities, and only one of them can be attacked.",
      nl: "De “as-is”, gelopen met de mensen die de installatie draaien. Vergelijk de tekening met de kast. Wat gedocumenteerd is en wat geïnstalleerd is, zijn twee verschillende locaties — en maar één ervan kan aangevallen worden."
    }
  },
  {
    n: "03",
    term: { en: "Asset inventory, to device level", nl: "Assetinventarisatie tot apparaatniveau" },
    body: {
      en: "One hundred per cent operations-safe passive collection: assets, vulnerabilities and threats, with nothing injected into the process. A comprehensive inventory is the precondition for any monitoring, threat correlation or vulnerability management that follows.",
      nl: "Honderd procent operations-safe passieve verzameling: assets, kwetsbaarheden en dreigingen, zonder iets in het proces te injecteren. Een volledige inventaris is de voorwaarde voor elke monitoring, dreigingscorrelatie of kwetsbaarhedenbeheer die daarna komt."
    }
  },
  {
    n: "04",
    term: { en: "Incident response diagnostic and tabletop", nl: "IR-diagnose en tabletop" },
    body: {
      en: "IT and OT in the same room — for many operators, the first time that has happened. A collaborative exercise rather than an audit, plus a diagnostic of ransomware readiness.",
      nl: "IT en OT in dezelfde ruimte — voor veel operators de eerste keer. Een gezamenlijke oefening in plaats van een audit, plus een diagnose van de ransomwaregereedheid."
    }
  },
  {
    n: "05",
    term: { en: "OT forensics readiness", nl: "Forensische gereedheid in OT" },
    body: {
      en: "The question nobody asks until the week they need it: if this line stopped and you did not know why, could you prove what happened? The data an investigation needs has to have been collected before the incident.",
      nl: "De vraag die niemand stelt tot de week waarin die nodig is: als deze lijn stilvalt en u weet niet waarom, kunt u dan aantonen wat er gebeurde? De data die een onderzoek nodig heeft, moet vóór het incident zijn verzameld."
    }
  },
  {
    n: "06",
    term: { en: "Physical security, as its own discipline", nl: "Fysieke beveiliging, als eigen vakgebied" },
    body: {
      en: "Access control and matrices, door integrity, patrols, perimeter detection, camera coverage, control-room separation, visitor and contractor protocols. A control room you can walk into is not a network problem.",
      nl: "Toegangsbeheer en toegangsmatrices, deurintegriteit, rondes, perimeterdetectie, cameradekking, scheiding van de regelkamer, protocollen voor bezoekers en aannemers. Een regelkamer waar u zo binnenloopt, is geen netwerkprobleem."
    }
  }
];

/** What lands on the desk afterwards. */
export const DELIVERABLES: readonly Bilingual[] = [
  { en: "Walk-through “as-is” report, with a large-format notional diagram of key assets and protective services", nl: "“As-is”-rapport van de rondgang, met een grootformaat schematische tekening van de belangrijkste assets en beschermende voorzieningen" },
  { en: "Architecture review report, and an architecture SWOT", nl: "Architectuurrapport en een architectuur-SWOT" },
  { en: "Sector-specific MITRE threat model", nl: "Sectorspecifiek MITRE-dreigingsmodel" },
  { en: "Asset inventory, vulnerabilities and OT threats, at a technical level with remediation instructions", nl: "Assetinventaris, kwetsbaarheden en OT-dreigingen, op technisch niveau met herstelinstructies" },
  { en: "OT forensics readiness report", nl: "Rapport over forensische gereedheid in OT" },
  { en: "Incident response tabletop outcome and ransomware-readiness diagnostic", nl: "Uitkomst van de IR-tabletop en diagnose van de ransomwaregereedheid" },
  { en: "Quick wins, priority action items and strategic recommendations", nl: "Quick wins, prioritaire acties en strategische aanbevelingen" },
  { en: "Per-facility reporting, plus an executive readout with peer comparison across the estate", nl: "Rapportage per locatie, plus een directieoverdracht met vergelijking tussen locaties" }
];

/** The questions the assessment exists to answer, from the brochure. */
export const QUESTIONS: readonly Bilingual[] = [
  { en: "What is the current state of my site or facility?", nl: "Wat is de huidige staat van mijn locatie?" },
  { en: "What are the potential threats I need to consider?", nl: "Welke dreigingen moet ik meewegen?" },
  { en: "What are the reliability and safety risks to operations from cyber threats?", nl: "Welke betrouwbaarheids- en veiligheidsrisico's lopen de operaties door cyberdreigingen?" },
  { en: "How do my sites compare to those of my peers?", nl: "Hoe verhouden mijn locaties zich tot die van vergelijkbare bedrijven?" },
  { en: "What is the impact of new technology on a facility, in cyber and operational risk?", nl: "Wat is de impact van nieuwe technologie op een locatie, in cyber- en operationeel risico?" }
];
