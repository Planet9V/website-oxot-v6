import type { Bilingual } from "@/i18n/bilingual";

/**
 * THE LEGAL PAGES — privacy, cookies, terms.
 *
 * Adapted from the previous site's pages, which were good, and then CORRECTED
 * AGAINST WHAT THIS SITE ACTUALLY DOES. That correction is the whole point: the
 * old policy described a newsletter and an on-site AI assistant, and this app
 * has neither. A privacy policy that misdescribes its own processing is not a
 * formality that happens to be out of date — it is the failure it exists to
 * prevent, on the site of a firm that sells conformity.
 *
 * What this app actually processes, verified in the code rather than assumed:
 *   - `/api/contact` → name, email, company, role, message, locale
 *   - writes one row to `cra_readiness_leads`, whose only writer is
 *     `lib/leads.ts`
 *   - the caller's IP is used transiently for rate limiting and stored ONLY as
 *     a salted SHA-256 hash (`hashIp`) — never in the clear
 *   - `CONTACT_WEBHOOK_URL`, when configured, forwards a notification
 *   - exactly ONE cookie is set: `oxot-theme`. No analytics. No third-party
 *     tracking. No advertising. No cross-site anything.
 *
 * KEEP THE TEMPLATE DISCLAIMER. It was on the old pages and it is honest: this
 * is not legal advice and has not been through counsel.
 *
 * THE "2-MINUTE CHECK" NO LONGER EXISTS. It and `/api/intake` were removed
 * 2026-08-21 ("CRA WAS PULLED ENTIRELY" — see shell/nav.ts) along with /cra,
 * /check, /retainer and /conformity. These three legal pages still described
 * it in the present tense as of that date — a live content bug, corrected
 * here rather than left to describe a feature that no longer exists.
 *
 * ⚠ ONE THING IS MISSING AND ONLY THE OWNER CAN SUPPLY IT: a controller
 * identity normally carries a registered address and a KvK number. Neither
 * exists anywhere in this project and neither may be invented (standing
 * constraint — a fabricated company registration on a compliance firm's own
 * footer is falsifiable in one lookup, on the exact axis we sell). The pages
 * name Oxot B.V. and a real mailbox and stop there.
 */

export interface LegalSection {
  heading: Bilingual;
  /** Paragraphs. */
  body?: Bilingual[];
  /** Bullet list, rendered after the paragraphs. */
  list?: Bilingual[];
}

export interface LegalDoc {
  title: Bilingual;
  lede: Bilingual;
  sections: readonly LegalSection[];
}

/** Shown at the head of all three. The old pages carried it and it is true. */
export const LEGAL_DISCLAIMER: Bilingual = {
  en: "This is a general template. It has not been reviewed by legal counsel — have it reviewed before relying on it.",
  nl: "Dit is een algemeen sjabloon. Het is niet getoetst door een jurist — laat het toetsen voordat u erop vertrouwt."
};

/** The mailbox on every legal page. The one real address this project has. */
export const LEGAL_EMAIL = "info@oxot.nl";

/* ── PRIVACY ─────────────────────────────────────────────────────────────── */

export const PRIVACY: LegalDoc = {
  title: { en: "Privacy Policy", nl: "Privacyverklaring" },
  lede: {
    en: "OXOT respects your privacy and processes personal data in line with the EU General Data Protection Regulation (GDPR) and applicable Dutch law. This policy explains what we process when you use this website, why, and what rights you have.",
    nl: "OXOT respecteert uw privacy en verwerkt persoonsgegevens in overeenstemming met de Algemene verordening gegevensbescherming (AVG) en het toepasselijke Nederlandse recht. Deze verklaring legt uit wat wij verwerken wanneer u deze website gebruikt, waarom, en welke rechten u heeft."
  },
  sections: [
    {
      heading: { en: "Who is responsible", nl: "Wie verantwoordelijk is" },
      body: [
        {
          en: `The data controller is Oxot B.V. For any question about this policy or how we handle your personal data, write to ${LEGAL_EMAIL}.`,
          nl: `De verwerkingsverantwoordelijke is Oxot B.V. Heeft u een vraag over deze verklaring of over hoe wij met uw persoonsgegevens omgaan, schrijf dan naar ${LEGAL_EMAIL}.`
        }
      ]
    },
    {
      heading: { en: "What we collect", nl: "Wat wij verzamelen" },
      body: [
        {
          en: "We keep collection to what we genuinely need. This site has no newsletter, no advertising, and no third-party tracking.",
          nl: "Wij verzamelen alleen wat wij werkelijk nodig hebben. Deze site heeft geen nieuwsbrief, geen advertenties en geen tracking door derden."
        }
      ],
      list: [
        {
          en: "The written review and contact. When you write to us we process the name, email address, organisation, role and message you provide, so we can answer.",
          nl: "De schriftelijke beoordeling en contact. Wanneer u ons schrijft, verwerken wij de naam, het e-mailadres, de organisatie, de functie en het bericht die u opgeeft, zodat wij kunnen antwoorden."
        },
        {
          en: "Abuse prevention. Your IP address is used momentarily to rate-limit submissions. It is stored only as a salted, irreversible hash — never in readable form.",
          nl: "Misbruikpreventie. Uw IP-adres wordt kortstondig gebruikt om het aantal inzendingen te beperken. Het wordt uitsluitend opgeslagen als een onomkeerbare hash met salt — nooit leesbaar."
        },
        {
          en: "Server logs. Like most websites, our infrastructure records technical data needed for security and reliability.",
          nl: "Serverlogs. Zoals de meeste websites legt onze infrastructuur technische gegevens vast die nodig zijn voor beveiliging en betrouwbaarheid."
        }
      ]
    },
    {
      heading: { en: "Why, and on what legal basis", nl: "Waarom, en op welke grondslag" },
      list: [
        {
          en: "To answer your enquiry and prepare what you asked for — legal basis: steps taken at your request prior to a contract, or our legitimate interest.",
          nl: "Om uw vraag te beantwoorden en te leveren wat u vroeg — grondslag: maatregelen op uw verzoek vóór een overeenkomst, of ons gerechtvaardigd belang."
        },
        {
          en: "To keep the site secure and available, including rate limiting — legal basis: our legitimate interest.",
          nl: "Om de site veilig en beschikbaar te houden, inclusief het beperken van inzendingen — grondslag: ons gerechtvaardigd belang."
        },
        {
          en: "To remember your language and theme — legal basis: strictly necessary for a service you requested.",
          nl: "Om uw taal en thema te onthouden — grondslag: strikt noodzakelijk voor een door u gevraagde dienst."
        }
      ]
    },
    {
      heading: { en: "How long we keep it", nl: "Hoe lang wij het bewaren" },
      body: [
        {
          en: "Only as long as necessary for the purpose it was collected for, or as required by law. Enquiries are kept for the duration of our contact and a reasonable follow-up period.",
          nl: "Niet langer dan nodig voor het doel waarvoor het is verzameld, of dan wettelijk vereist. Aanvragen bewaren wij voor de duur van ons contact en een redelijke opvolgperiode."
        }
      ]
    },
    {
      heading: { en: "Who we share it with", nl: "Met wie wij het delen" },
      body: [
        {
          en: "We do not sell your personal data. We share it only with providers who process it on our behalf — hosting and infrastructure — under a processing agreement, and where we have configured a notification service, to alert us that you wrote.",
          nl: "Wij verkopen uw persoonsgegevens niet. Wij delen ze alleen met partijen die ze namens ons verwerken — hosting en infrastructuur — onder een verwerkersovereenkomst, en waar wij een notificatiedienst hebben ingesteld, om ons te melden dat u schreef."
        }
      ]
    },
    {
      heading: { en: "Your rights", nl: "Uw rechten" },
      body: [
        {
          en: `You have the right to access, rectification, erasure, restriction, objection and data portability, and to withdraw consent at any time without affecting processing already carried out. Write to ${LEGAL_EMAIL} and we will respond within one month. You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).`,
          nl: `U heeft recht op inzage, rectificatie, verwijdering, beperking, bezwaar en overdraagbaarheid van gegevens, en u kunt uw toestemming te allen tijde intrekken zonder dat dit afdoet aan de reeds uitgevoerde verwerking. Schrijf naar ${LEGAL_EMAIL}; wij reageren binnen één maand. U heeft ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.`
        }
      ]
    },
    {
      heading: { en: "Transfers outside the EEA", nl: "Doorgifte buiten de EER" },
      body: [
        {
          en: "We prefer providers in the European Economic Area. Where data is processed outside it, we rely on an adequacy decision or on Standard Contractual Clauses.",
          nl: "Wij geven de voorkeur aan aanbieders in de Europese Economische Ruimte. Waar gegevens daarbuiten worden verwerkt, baseren wij ons op een adequaatheidsbesluit of op modelcontractbepalingen."
        }
      ]
    }
  ]
};

/* ── COOKIES ─────────────────────────────────────────────────────────────── */

export const COOKIES: LegalDoc = {
  title: { en: "Cookie Policy", nl: "Cookiebeleid" },
  lede: {
    en: "This policy explains what this site stores on your device and how you control it. Read it with the Privacy Policy.",
    nl: "Dit beleid legt uit wat deze site op uw apparaat opslaat en hoe u dat beheert. Lees het samen met de Privacyverklaring."
  },
  sections: [
    {
      heading: { en: "The short version", nl: "De korte versie" },
      body: [
        {
          en: "This site sets one cookie, and it is strictly necessary. There are no analytics cookies, no advertising cookies and no third-party or cross-site tracking of any kind. You can verify that in your browser's developer tools in about ten seconds, and we would rather you did.",
          nl: "Deze site plaatst één cookie, en die is strikt noodzakelijk. Er zijn geen analytische cookies, geen advertentiecookies en geen tracking door derden of over sites heen, in welke vorm dan ook. U kunt dat in ongeveer tien seconden controleren in de ontwikkelaarstools van uw browser, en dat zien wij liever dan dat u ons op ons woord gelooft."
        }
      ]
    },
    {
      heading: { en: "What is actually stored", nl: "Wat er werkelijk wordt opgeslagen" },
      list: [
        {
          en: "oxot-theme — remembers whether you chose the light or dark appearance. Strictly necessary for a preference you set yourself, so it needs no consent. It contains the word “light” or “dark” and nothing else.",
          nl: "oxot-theme — onthoudt of u de lichte of donkere weergave koos. Strikt noodzakelijk voor een voorkeur die u zelf instelt, dus daarvoor is geen toestemming nodig. De cookie bevat het woord “light” of “dark” en verder niets."
        },
        {
          en: "oxot-consent — recorded only if and when this site ever introduces a non-essential cookie, so that your choice can be remembered rather than asked again.",
          nl: "oxot-consent — wordt alleen vastgelegd als en wanneer deze site ooit een niet-essentiële cookie invoert, zodat uw keuze wordt onthouden in plaats van opnieuw gevraagd."
        }
      ]
    },
    {
      heading: { en: "Why you may not have seen a banner", nl: "Waarom u misschien geen banner heeft gezien" },
      body: [
        {
          en: "Under the GDPR and the ePrivacy rules, consent is required for cookies that are not strictly necessary. Today this site sets none, so there is nothing to ask you about, and a banner demanding consent for cookies that do not exist would be theatre.",
          nl: "Onder de AVG en de ePrivacy-regels is toestemming vereist voor cookies die niet strikt noodzakelijk zijn. Vandaag plaatst deze site die niet, dus valt er niets te vragen, en een banner die toestemming eist voor cookies die niet bestaan zou theater zijn."
        },
        {
          en: "If we later add analytics, the banner appears before anything non-essential is set, refusing is exactly as easy as accepting, and nothing is loaded until you choose.",
          nl: "Voegen wij later analytics toe, dan verschijnt de banner voordat er iets niet-essentieels wordt geplaatst, is weigeren precies zo eenvoudig als accepteren, en wordt er niets geladen tot u kiest."
        }
      ]
    },
    {
      heading: { en: "Changing your choice", nl: "Uw keuze wijzigen" },
      body: [
        {
          en: "Use Cookie settings in the footer at any time. You can also delete cookies in your browser; most browsers let you block them entirely, though that may affect how the site remembers your preferences.",
          nl: "Gebruik op elk moment Cookievoorkeuren in de voettekst. U kunt cookies ook via uw browser verwijderen; de meeste browsers laten u ze volledig blokkeren, al kan dat invloed hebben op hoe de site uw voorkeuren onthoudt."
        }
      ]
    }
  ]
};

/* ── TERMS ───────────────────────────────────────────────────────────────── */

export const TERMS: LegalDoc = {
  title: { en: "Terms of Use", nl: "Gebruiksvoorwaarden" },
  lede: {
    en: "These terms govern your use of this website. By using it, you accept them.",
    nl: "Deze voorwaarden gelden voor uw gebruik van deze website. Door de site te gebruiken, aanvaardt u ze."
  },
  sections: [
    {
      heading: { en: "General information, not a determination", nl: "Algemene informatie, geen besluit" },
      body: [
        {
          en: "Everything written on this site is provided for general information. It is an indicative read of the regulations it discusses — including Regulation (EU) 2024/2847 — not legal advice and not a conformity assessment.",
          nl: "Alles op deze site wordt verstrekt ter algemene informatie. Het is een indicatieve lezing van de regelgeving die wordt besproken — waaronder Verordening (EU) 2024/2847 — geen juridisch advies en geen conformiteitsbeoordeling."
        },
        {
          en: "Classification and conformity remain a per-product determination, and the responsibility of the manufacturer.",
          nl: "Classificatie en conformiteit blijven een beoordeling per product, en de verantwoordelijkheid van de fabrikant."
        }
      ]
    },
    {
      heading: { en: "Accuracy and dates", nl: "Juistheid en data" },
      body: [
        {
          en: "We cite the Regulation and name the date each obligation carries, and we link the source so you can check it. Regulatory positions change — notably the harmonised standards and the register of notified bodies. Where a date matters to a decision, verify it against the primary source we link.",
          nl: "Wij citeren de verordening, noemen bij elke verplichting de bijbehorende datum en linken de bron zodat u het kunt controleren. Regelgeving verandert — met name de geharmoniseerde normen en het register van aangemelde instanties. Is een datum bepalend voor een besluit, controleer die dan bij de primaire bron waarnaar wij verwijzen."
        }
      ]
    },
    {
      heading: { en: "Intellectual property", nl: "Intellectueel eigendom" },
      body: [
        {
          en: "The content, design and code of this site belong to Oxot B.V., except material quoted from official sources, which remains theirs. You may read, print and share pages for your own professional use, with attribution.",
          nl: "De inhoud, het ontwerp en de code van deze site behoren toe aan Oxot B.V., met uitzondering van materiaal dat uit officiële bronnen is geciteerd; dat blijft van hen. U mag pagina's lezen, afdrukken en delen voor eigen professioneel gebruik, met bronvermelding."
        }
      ]
    },
    {
      heading: { en: "Liability", nl: "Aansprakelijkheid" },
      body: [
        {
          en: "We take care that this site is accurate and available, but we do not warrant that it is free of error or uninterrupted. To the extent permitted by law, we are not liable for loss arising from reliance on this site alone. Nothing here limits liability that cannot lawfully be limited.",
          nl: "Wij zorgen ervoor dat deze site juist en beschikbaar is, maar garanderen niet dat hij foutloos of ononderbroken is. Voor zover de wet dat toestaat, zijn wij niet aansprakelijk voor schade die voortvloeit uit het uitsluitend afgaan op deze site. Niets hierin beperkt aansprakelijkheid die niet rechtsgeldig kan worden beperkt."
        }
      ]
    },
    {
      heading: { en: "Governing law", nl: "Toepasselijk recht" },
      body: [
        {
          en: "Dutch law applies. Disputes go to the competent court in the Netherlands.",
          nl: "Nederlands recht is van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland."
        }
      ]
    },
    {
      heading: { en: "Contact", nl: "Contact" },
      body: [
        {
          en: `Questions about these terms: ${LEGAL_EMAIL}.`,
          nl: `Vragen over deze voorwaarden: ${LEGAL_EMAIL}.`
        }
      ]
    }
  ]
};
