import type { Dictionary } from "./en";

/**
 * Dutch copy.
 *
 * `satisfies Dictionary` is load-bearing: it makes a missing or misspelled key
 * a build failure. CLAUDE.md §3 says no user-facing string ships in one
 * language, and this is the mechanism that enforces it rather than hoping.
 *
 * TRANSLATED, NOT TRANSPOSED. Two things are deliberately not literal:
 *
 *   The tagline stays English. It is a wordmark lockup built around the
 *   capital X of OXOT; "Operationele eXcellentie in Operationele Technologie"
 *   keeps the X but loses the rhythm, and it is a brand asset rather than a
 *   claim the reader needs to understand.
 *
 *   "Consultancy", not "Advies". Dutch industrial buyers use the English term
 *   for this service; "Advies" reads like a municipal helpdesk.
 *
 * Dutch runs roughly 15-20% longer than English. Every string here was chosen
 * with that in mind — particularly the nav labels and the CTA, which have to
 * survive a 390px header without wrapping.
 */
export const nl = {
  meta: {
    title: "OXOT — OT-securityengineering voor systemen die niet stil mogen vallen",
    titleTemplate: "%s | OXOT",
    description:
      "OXOT is een Nederlands OT-engineeringbureau. Wij maken van wat u al heeft — P&ID's, assetregisters, SBOM's — een technisch dossier dat de eerste beoordeling doorstaat, en een risicobedrag in euro's."
  },

  nav: {
    primary: "Hoofdnavigatie",
    footer: "Voettekst",
    home: "OXOT — home",
    skipToContent: "Naar de inhoud",
    breadcrumb: "Kruimelpad",
    newTab: "opent in een nieuw tabblad",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    fdd: "Facility Due Diligence",
    headerCta: "Praat met OX",
    contactNav: "Contact",
    reference: "Naslag",
    consulting: "Consultancy",
    company: "Bedrijf",
    aboutOxot: "Over OXOT",
    /* Nav label renamed CDT-2 -> Platform, 2026-08-22 (owner) — URL stays
       /cdt-2 for now; the label itself doesn't need translation. Now the
       only Cyber Digital Twin destination — /twin, /insights, /frameworks
       and /iec-62443 were retired the same day, along with their nav
       entries. */
    cdt2: "Platform"
  },

  theme: {
    toggle: "Wisselen tussen licht en donker thema"
  },

  legal: {
    breadcrumb: "Juridisch",
    updated: "Laatst bijgewerkt",
    privacyLink: "Privacyverklaring",
    cookiesLink: "Cookiebeleid",
    termsLink: "Gebruiksvoorwaarden",
    /* Short forms for the footer bar. The pages keep their full titles. */
    privacyShort: "Privacy",
    cookiesShort: "Cookies",
    termsShort: "Voorwaarden",
  },
  cookieBanner: {
    title: "Cookies op deze site",
    body: "Wij plaatsen één strikt noodzakelijke cookie om uw weergavevoorkeur te onthouden. Verder wordt er niets opgeslagen zonder uw toestemming.",
    accept: "Analytics accepteren",
    decline: "Alleen essentieel",
    policyLink: "Lees het cookiebeleid",
    settings: "Cookievoorkeuren"
  },
  language: {
    label: "Taal",
    switchTo: "Overschakelen naar Nederlands"
  },

  footer: {
    tagline: "Operational eXcellence in Operational Technology",
    descriptor:
      "OXOT is een engineeringbureau voor OT-security. Wij helpen industriële operators, fabrikanten en integrators hun systemen te beveiligen — van beoordelingen en architectuur tot de Cyber Digital Twin en langlopende securityprogramma's.",
    entity: "OXOT B.V. · Nederland",
    site: "Site",
    checkUs: "Controleer ons",
    rvoLink: "RVO — toegekende CIF-NL-projecten",
    rvoNote:
      "Elk project, elke score, gepubliceerd door de uitvoerende instantie.",
    euLink: "Verordening (EU) 2024/2847",
    euNote: "De Cyber Resilience Act, volledig, op EUR-Lex."
  },

  home: {
    aboutHook: "De meeste securityrapporten vertellen een industriële operator hoe hij scoort op een raamwerk. Dat is iets anders dan weten welke storing de lijn daadwerkelijk stillegt, of welke van dit jaar de eerste is om op te lossen. Wij zijn engineers die zelf installaties hebben gedraaid — dus het antwoord komt als werk waar uw team maandag mee begint, en een getal dat uw directie kan tekenen.",
    aboutPointsLabel: "Wat dat in de praktijk betekent",
    aboutPoint1Term: "OT-engineers, geen IT-security",
    aboutPoint1Body: "Het proces, de machines en de beperkingen komen eerst. Nooit kantoor-IT die op de fabrieksvloer wordt gekopieerd.",
    aboutPoint2Term: "Een getal, geen bijvoeglijk naamwoord",
    aboutPoint2Body: "Risico in euro's geprijsd en gerangschikt, zodat de volgende euro gaat waar hij het meeste risico wegneemt — niet waar een checklist toevallig naar wijst.",
    aboutPoint3Term: "Wat waar is, niet wat ons uitkomt",
    aboutPoint3Body: "Inclusief het deel dat ons niet vleit. Elke controleerbare bewering op deze site draagt zijn bron, één klik verderop.",
    aboutPoint4Term: "Uw data en uw model blijven van u",
    aboutPoint4Body: "Bewaard in de EU, en altijd leveranciersneutraal — wij hebben u niets te verkopen dat we niet zelf hebben gebouwd.",
    aboutPoint5Term: "Opdrachten die zijn ontworpen om te eindigen",
    aboutPoint5Body: "Wij laten de capaciteit liever achter in uw team dan een afhankelijkheid van het onze.",
  },

  timeline: {
    caption: "Vijf data · vijf verplichtingen",
    measuredFrom: "Gemeten vanaf {date}",
    badgeNext: "Eerstvolgend",
    /* "Streefdatum", never "deadline". Promoting a target to a deadline is the
       imprecision this reader catches fastest — see CRA.harmonisedStandards. */
    badgeTarget: "Streefdatum",
    /* Symmetrical with the English marker, and without the bare "al" that the
       banned list watches for. Chapter IV genuinely is in force, so a past
       marker is correct here — it is simply not the token the guard reads. */
    inForce: "{days} dagen geleden van kracht geworden",
    ahead: "Nog {days} dagen",
    window: "Over {from} → {to} dagen",
    today: "↑ Vandaag",
    axisEnd: "dec 2027",
    distances:
      "Nog {reporting} dagen tot de meldplicht. Nog {ce} dagen tot CE-markering.",
    article69Link: "Artikel 69, op EUR-Lex"
  },

  grant: {
    heading: "Nederlandse subsidie toegekend \u2014 \u201cEen waarheidsgetrouwe kopie\u201d",
    rowFund: "Fonds",
    rowAward: "Toekenning",
    rowField: "Selectie",
    rowAnnounced: "Bekendgemaakt",
    rowRvoWords: "RVO's woorden",
    registerLink: "RVO — elk CIF-NL-project en elke score"
  },
  contactBand: {
    kicker: "Praat met OX",
    heading: "Vertel ons wat u wilt beschermen.",
    body: "Een kort gesprek met de mensen die het werk zouden doen — geen verkoopgesprek en geen vragenlijst vooraf. Beschrijf de installatie, het product of de deadline waar u tegenaan loopt, en wij zeggen eerlijk of wij daar het juiste bureau voor zijn.",
    cta: "Ga in gesprek met OX",
    orMail: "Liever zelf schrijven?"
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Stuur het schriftelijk en een OXOT-engineer antwoordt binnen twee werkdagen — een heldere beoordeling van uw OT-beveiligingsvraag, zonder gesprek.",
    breadcrumb: "Contact",
    termCompany: "Bedrijf",
    termEmail: "E-mail",
    sendHeading: "Stuur het",
    sendBody:
      "Een installatie, een product, of een probleem — één zin is genoeg om te beginnen. Het antwoord gaat in op wat u werkelijk schreef, geen sjabloon.",
    whatToBringP1:
      "U heeft geen perfecte data nodig om te beginnen. Een nuttig eerste gesprek kan starten met één systeemschema, P&ID, assetlijst, netwerkexport, signaleringsarchitectuur, productontwerp, leveranciersvraag of voorgestelde wijziging.",
    whatToBringP2:
      "OXOT helpt bepalen of een Cyber Digital Twin, Decision Sprint of technische briefing de juiste volgende stap is.",
    companyDetailsHeading: "Bedrijfsgegevens",
    termAddress: "Adres",
    termKvk: "KVK",
    termVat: "BTW"
  },
  form: {
    errName: "Vul uw naam in, zodat het antwoord aan iemand gericht kan worden.",
    errEmail: "Vul een zakelijk e-mailadres in — daar gaat de schriftelijke beoordeling naartoe.",
    errEmailShape: "Dat e-mailadres lijkt niet compleet.",
    errMessage:
      "Vertel ons wat er beantwoord moet worden, in één zin als dat genoeg is.",
    receivedKicker: "Ontvangen",
    receivedHeading: "Wij hebben het.",
    receivedNote:
      "Een engineer antwoordt op wat u werkelijk schreef — binnen twee werkdagen, op schrift.",
    failedHeading: "Dat is niet verzonden.",
    invalidHeading: "Er moet eerst iets worden aangepast.",
    failedLead: "Er ging iets mis aan onze kant. Probeer het opnieuw, of schrijf rechtstreeks naar",
    labelName: "Naam",
    labelEmail: "Zakelijk e-mailadres",
    labelOrganisation: "Organisatie",
    labelRole: "Functie",
    labelIndustry: "Sector / omgeving",
    labelCountry: "Land of regio",
    decisionHeading: "Wat evalueert u?",
    decisionOtRisk: "OT-risicoprioritering",
    decisionSegmentation: "Segmentatie, firewall, of wijziging in externe toegang",
    decisionPatch: "Patch, upgrade, vervanging, of modernisering",
    decisionProductSecurity: "Productbeveiliging of technische CRA-documentatie",
    decisionRailway: "Railway cybersecurity, RAMS, of veiligheidsbewijs",
    decisionAirGapped: "Air-gapped of soevereine implementatie",
    decisionSupplier: "Leveranciers-, inkoop-, of investeringsbeslissing",
    decisionOther: "Anders",
    labelMessage: "Wat moet er beantwoord worden?",
    helpEmail: "Hierheen gaat de schriftelijke beoordeling.",
    helpRole: "Dit bepaalt welk deel van het antwoord vooropgaat.",
    helpMessageEmpty:
      "Eén zin is genoeg. Plak er een productnaam of specificatie bij als dat helpt.",
    sending: "Bezig met verzenden…",
    submit: "Verstuur dit voor een schriftelijke beoordeling",
    privacyNote:
      "Wat u stuurt komt in de eigen database van OXOT in de EU en wordt gelezen door de twee mensen hieronder. Naam, zakelijk e-mailadres, organisatie, functie, sector, land, de gekozen beslissing en uw bericht — verder niets, geen tracking, geen derde partij. Vraagt u ons het te verwijderen, dan doen wij dat dezelfde dag.",
    submitNote: "Gratis. Geen gesprek.",
    optional: "optioneel",
    required: "verplicht",
    requiredField: " veld"
  },
  doors: {
    heading: "Waar wilt u beginnen?",
    twinTitle: "Cyber Digital Twin",
    twinBody:
      "Een werkend model van uw operationele omgeving, waar een securitywijziging getest kan worden voordat die de installatie raakt \u2014 en waar het gevolg in euro\u2019s wordt geprijsd.",
    twinCta: "Bekijk wat de Nederlandse overheid financierde",
    consultingTitle: "Consultancy",
    consultingBody:
      "IEC 62443-zones, conduits en SL-T, bepaald door engineers die de installaties zelf hebben gedraaid. Op lopende programma\u2019s in spoor, energie en maakindustrie.",
    consultingCta: "Bekijk wat OXOT-consultants doen"
  },
  fdd: {
    metaTitle: "Facility Due Diligence \u2014 de as-is-nulmeting van een draaiende locatie",
    metaDescription:
      "Voordat u een locatie beveiligt, moet iemand er doorheen lopen. Een as-is-nulmeting van wat er staat, hoe het verbonden is, wie erbij kan, en wat er met de productie gebeurt als dat faalt \u2014 uitgevoerd door engineers, op de vloer.",
    breadcrumb: "Facility Due Diligence",
    kicker: "Facility Due Diligence",
    heading: "Voordat u een locatie beveiligt, moet iemand er doorheen lopen.",
    lede1:
      "De meeste industri\u00eble locaties dragen cyberrisico dat nooit werkelijk is gemeten \u2014 een netwerktekening die dateert van v\u00f3\u00f3r de laatste drie aanpassingen, een assetlijst opgebouwd uit het geheugen in plaats van een rondgang over de vloer, en fysieke toegang die niemand heeft gecontroleerd sinds het hek werd geplaatst. Dat komt pas aan het licht wanneer een beoordelaar, een verzekeraar of een incident ernaar vraagt.",
    lede2:
      "Facility Due Diligence is hoe OXOT die nulmeting vaststelt voordat er iets anders begint: architectuur, assetinventarisatie tot op apparaatniveau, IR-gereedheid en fysieke beveiliging, beoordeeld op locatie door engineers in plaats van afgeleid uit een vragenlijst.",
    ledeQuestion:
      "Hoe kunt u deze assets verdedigen zonder te weten wat er in uw OT-omgeving staat, en waaraan uw organisatie daardoor blootstaat?",
    answersLabel: "Vragen die het beantwoordt",

    statesTitle: "Nulmeting, operationaliseren, optimaliseren.",
    statesDek: "\u00c9\u00e9n beoordeling, drie toestanden \u2014 en alleen de eerste is een rapport.",

    engagementTitle: "De opdracht, getekend.",
    engagementDek:
      "Drie fasen en een vast dagritme op locatie. Wat mensen verrast staat links: de co\u00f6rdinatie begint drie weken voordat er iemand aankomt.",
    stage1: "Fase 1 \u00b7 Voorbereiding",
    stage1Short: "VOORBEREIDING",
    stage1Body:
      "Communicatie-, project- en logistiekplan. Scope gevalideerd. Vergunningen, toegangsprocedures en veiligheidsinstructies geregeld. Passieve verzameling afgesproken en ge\u00efnstalleerd v\u00f3\u00f3r het bezoek, en een method statement per locatie. Een team dat aankomt met het assetbeeld al in handen, besteedt zijn dagen aan oordeelsvorming in plaats van aan ontdekken.",
    stage2: "Fase 2 \u00b7 Op locatie",
    stage2Short: "OP LOCATIE",
    stage2Body:
      "Een multidisciplinair team op de vloer met een vast dagschema: toegangsprocedure, veiligheidsinstructie, de werkstromen, exitgesprek. Een conceptrapport v\u00f3\u00f3r het team vertrekt \u2014 een rapport dat zes weken later komt, discussieert met andermans geheugen.",
    stage3: "Fase 3 \u00b7 Afronding",
    stage3Short: "AFRONDING",
    stage3Body:
      "Apparatuur verwijderd, vergunningen en toegang ingetrokken. Concepten ter commentaar met een deadline, daarna eindrapporten en een directieoverdracht met analyse per locatie en vergelijking tussen locaties.",
    leadTime: "T\u201321 DAGEN",
    leadTimeNote: "vergunningen \u00b7 sensoren erin",
    closureNote: "concepten \u2192 eindrapport",
    disciplinesLabel: "VIER DISCIPLINES, ELKE DAG",
    laneOt: "OT-engineering",
    laneGovernance: "Governance",
    lanePhysical: "Fysieke beveiliging",
    lanePm: "Projectmanagement",
    diagramFoot: "Een gevuld vierkant is een dag dat die discipline op locatie is. Fysieke beveiliging rondt in de eerste drie af.",
    diagramCaption: "De opdracht \u00b7 drie fasen, vijf dagen op locatie, vier disciplines",
    diagramAlt:
      "Een tijdlijn van een Facility Due Diligence-opdracht. Links een voorbereidingsperiode van eenentwintig dagen voor co\u00f6rdinatie, vergunningen en het installeren van passieve verzameling. In het midden vijf aaneengesloten dagen op locatie. Rechts de afronding: concepten, eindrapporten en een directieoverdracht. Daaronder vier disciplinebanen \u2014 OT-engineering, governance, fysieke beveiliging en projectmanagement \u2014 met een markering op elke dag dat die discipline aanwezig is; fysieke beveiliging rondt na de derde dag af.",

    workstreamsTitle: "Wat er op de vloer gebeurt.",
    workstreamsDek: "Zes werkstromen, uitgevoerd door mensen die dit soort installaties hebben gedraaid.",
    sectorTitle: "Het werkprogramma sluit aan op de risiconorm van uw eigen sector.",
    sectorBody:
      "Een waterbedrijf, een hyperscale datacenter en een voedingsfabriek delen geen risicotaal, en doen alsof dat wel zo is, is precies hoe beoordelingen worden opgeborgen en vergeten. Water en afvalwater sluit aan op J100 / RAMCAP; maakindustrie, opwekking en distributie, maritiem, luchtvaart, transport, datacenters en commercieel vastgoed hebben elk hun eigen ankerpunt. Bevindingen komen aan in een vorm die de toezichthouder, de verzekeraar en de directie al herkennen.",

    deliverablesTitle: "Wat er op tafel komt.",
    deliverablesDek: "Per locatie, plus \u00e9\u00e9n directiebeeld over het geheel.",

    casesTitle: "Twee opdrachten, in hoofdlijnen.",
    casesDek: "Hoe de methode landt in twee heel verschillende omgevingen.",
    caseSituation: "Situatie",
    caseProgramme: "Programma",
    caseOnSite: "Op locatie",
    caseChanged: "Wat er veranderde",
    caseAName: "Een waterbedrijf met meerdere locaties",
    caseASituation:
      "Zuiveringen, gemalen en terugwinningsinstallaties over een verzorgingsgebied. Elke locatie had in twintig jaar een eigen besturingssysteem opgebouwd, elk met een andere integrator, en geen twee waren het eens over wat \u201chet netwerk\u201d betekende. Het bedrijf moest verantwoording afleggen aan een risiconorm en kon niet zeggen wat er stond.",
    caseAProgramme:
      "Afgestemd op J100 / RAMCAP, zodat de uitkomst binnen het risicoproces viel dat het bedrijf al draaide in plaats van ernaast. Passieve verzameling dertig dagen vooraf op elke locatie. Vijf dagen per grote locatie; de kleine putlocaties gecomprimeerd en gegroepeerd, want een tweedaags programma op een locatie met negen assets is een manier om geld uit te geven.",
    caseAOnSite:
      "Met de operators door de installatie lopen. De tekening naast de kast leggen. Nagaan wat er werkelijk bereikbaar is vanaf het kantoornetwerk en vanaf de laptop van de integrator. De regelkamer beoordelen als fysieke ruimte \u2014 wie heeft een sleutel, waarvan is de deur gemaakt, wat is er door het glas te zien. En dan IT en OT in \u00e9\u00e9n ruimte voor een tabletop, voor de meeste waterbedrijven een primeur.",
    caseAChanged:
      "\u00c9\u00e9n assetinventaris in plaats van veertien, een risicobeeld per locatie in de taal van J100 zelf, en een routekaart geordend naar gevolg voor de dienstverlening. De ongemakkelijke bevinding is meestal dezelfde: de snelste route het proces in is niet de firewall.",
    caseBName: "Een fabrikant met meerdere fabrieken",
    caseBSituation:
      "Fabrieken op drie continenten, een overnamegeschiedenis, en een groeps-CISO die verantwoordelijkheid voor OT had ge\u00ebrfd zonder er zicht op te erven. De IT-security van het concern was volwassen. De fabrieken waren een ander land.",
    caseBProgramme:
      "Architectuur beoordeeld voor IT en OT samen, want het interessante risico zit op de naad. Een MITRE-dreigingsmodel gebouwd voor de maakindustrie in plaats van een generieke lijst met aanvallers. Passieve inventarisatie tot op apparaatniveau. IR-diagnose en tabletop met beide teams. Forensische gereedheid \u2014 de vraag die niemand stelt tot de week waarin die nodig is.",
    caseBOnSite:
      "Vijf dagen per fabriek met een vast schema: toegangsprocedure, veiligheidsinstructie, werkstromen, exitgesprek, conceptrapport voordat het team het land verlaat. Die discipline telt zwaarder dan ze klinkt.",
    caseBChanged:
      "Rapportage per fabriek die het concern kon vergelijken, een directieoverdracht die fabrieken tegen elk\u00e1\u00e1r afzette in plaats van tegen een abstracte volwassenheidsschaal, en quick wins die geen investeringscyclus nodig hadden. De routekaart scheidde wat het concern kon opleggen van wat elke fabriek zelf moest dragen \u2014 het onderscheid dat bepaalt of een programma zijn tweede jaar overleeft.",
    casesNote:
      "Beide hoofdlijnen zijn samengesteld. Geen klant, aantal locaties of cijfer wordt gepubliceerd, en dat gebeurt ook niet zonder schriftelijke toestemming \u2014 een naam is van de klant om te geven, niet van ons om uit te geven."
  },
  longform: {
    onThisPage: "Op deze pagina",
    readingTime: "{minutes} min lezen",
    words: "{words} woorden",
    updated: "Bijgewerkt {date}",
    backTo: "Alle {section}",
  },
  caseStudies: {
    metaTitle: "Praktijkvoorbeelden \u2014 werk dat we daadwerkelijk hebben gedaan",
    metaDescription:
      "Tien samengestelde praktijkvoorbeelden over M&A due diligence, architectuurconvergentie, remote access, IEC 62443-adoptie, compliance en incident-response training. Geen klant genoemd.",
    breadcrumb: "Praktijkvoorbeelden",
    kicker: "Praktijkvoorbeelden",
    casesHeading: "{count} praktijkgevallen, in detail",
  },
  reference: {
    metaTitle: "Naslag \u2014 de regelgeving, tot op de clausule",
    metaDescription:
      "Vijf longread-documenten over IEC 62443, TS 50701, NIS2, de AI-verordening en de machineverordening \u2014 geschreven om te controleren, niet om te scannen.",
    breadcrumb: "Naslag",
    kicker: "Naslag",
    heading: "De regelgeving, tot op de clausule.",
    lede:
      "Longread-werkdocumenten, geschreven voor de engineer die ernaar moet handelen. Niets hier is een samenvatting van een samenvatting \u2014 elke bewering draagt het artikel of de clausule waarop die rust, zodat u het in \u00e9\u00e9n opzoekactie met ons oneens kunt zijn.",
    weight: "{count} documenten \u00b7 {words} woorden",
    sections: "{count} secties",
  },
} as const satisfies Dictionary;
