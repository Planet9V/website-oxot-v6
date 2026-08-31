/**
 * WORK WITH OXOT — content transcribed from new_material_source/
 * 1_website_layout_v4/2_platform/platform.md, sections "Consulting's correct
 * role" (the framing sentence and the four-row Engagements table, verbatim)
 * and "First CTA strategy" (the P&ID-and-asset-list offer, verbatim as the
 * page's single closing ask).
 *
 * SCOPE, DELIBERATELY NARROW. /consulting already carries the full service
 * catalogue — engagements with their scopes, inputs and outputs — and an
 * owner-reviewed critique of /cdt-2 concluded that level of service-menu
 * detail belongs there and nowhere else. This page answers one narrower
 * question: what shapes a working relationship takes for getting a Twin
 * running and keeping it true. It links out to /consulting rather than
 * restating it.
 *
 * `Bilingual`-typed via a local `same()`, same convention as
 * src/components/assurance/ts-50701/content.ts: both locales render, `nl`
 * holds the English string as an honest placeholder pending the translation
 * pass, not a claim that this is correct Dutch. Grep `same(` when that pass
 * starts.
 */
import type { Bilingual } from "@/i18n/bilingual";

/** Not yet translated — see this file's header. */
function same(en: string): Bilingual {
  return { en, nl: en };
}

/**
 * The locale-free path, local to this page.
 *
 * NOT in `PATHS` (src/components/shell/nav.ts) — that file is off-limits in
 * this batch, and this route is not in `primaryNav` yet either, the same
 * Phase-6 status /industries and the five /assurance framework pages carry.
 * When the platform section does land in the nav, this constant is what
 * moves into `PATHS`; nothing else here hardcodes the string.
 */
export const WORK_WITH_OXOT_PATH = "/work-with-oxot";

export const META = {
  title: "Work With OXOT | Cyber Digital Twin engagement model",
  description:
    "Four ways to work with OXOT on a Cyber Digital Twin: a Decision Sprint, a Twin Build, Continuous Twin Operations, and Assurance and regulatory evidence. The platform is the product; the engagement makes it reliable in your environment."
};

export const HERO = {
  kicker: same("Platform · Engagement model"),
  /* The framing sentence, split at its own full stop — the claim and its
     qualification, not a headline and a strapline written to fill a slot. */
  h1Lead: same("The platform is the product."),
  h1Rest: same("The engagement makes it reliable in your environment."),
  body: same(
    "The Cyber Digital Twin is a model of your facility, not a report about it. Standing one up means fusing the engineering evidence you already hold — P&IDs, asset inventories, control logic, network topology — into a model that holds together, then keeping it true as the plant and the external threat picture move underneath it. That is the work an OXOT engagement does."
  ),
  bodyTwo: same(
    "Consulting builds and operates the product with your engineers; it is not a detached slideware offering. Below are the four shapes that work takes, from a single bounded question to a long-term operating model."
  ),
  consultingNote: same("Looking for the full consulting catalogue — every service, what it involves, and what comes out of it?"),
  consultingCta: same("OXOT Consulting")
};

export interface Engagement {
  /** Stable, ASCII, used as a React key and an anchor fragment. */
  slug: string;
  name: Bilingual;
  /** The customer need, from the source table's middle column. */
  need: Bilingual;
  /** What OXOT delivers, from the source table's right column, split at its
   *  own commas so each deliverable reads as a discrete item. */
  delivers: readonly Bilingual[];
}

export interface EngagementGroup {
  id: string;
  label: Bilingual;
  /** Why these two belong together — the one piece of structure this page
   *  adds to the source table, and the reason it renders as a grouped ledger
   *  rather than a flat four-row grid. */
  note: Bilingual;
  items: readonly Engagement[];
}

export const ENGAGEMENTS = {
  h2: same("Four engagements, two jobs."),
  /* The source presents four rows with no ordering claim. Two of them stand
     a model up and two of them keep it standing — that split is the page's
     spine, and it is also the honest answer to "where do I start?". */
  lead: same(
    "The first two put a model in front of you. The second two keep it worth trusting. A first engagement is normally one of the first two; the second two follow once the model is load-bearing."
  ),
  groups: [
    {
      id: "establish",
      label: same("Establish the model"),
      note: same("Where a first engagement starts."),
      items: [
        {
          slug: "decision-sprint",
          name: same("Decision Sprint"),
          need: same("A defined investment, plant change, or risk question."),
          delivers: [
            same("Model scope"),
            same("Consequence analysis"),
            same("Simulations"),
            same("Recommendation and evidence pack")
          ]
        },
        {
          slug: "twin-build",
          name: same("Twin Build"),
          need: same("Establish a durable facility or estate model."),
          delivers: [
            same("Data fusion"),
            same("Model validation"),
            same("Engineering workshops"),
            same("Decision workspace")
          ]
        }
      ]
    },
    {
      id: "sustain",
      label: same("Keep the model true"),
      note: same("Where a model earns its place after the first answer."),
      items: [
        {
          slug: "continuous-twin-operations",
          name: same("Continuous Twin Operations"),
          need: same("Keep pace with plant change and external risk."),
          delivers: [
            same("Model maintenance"),
            same("Risk deltas"),
            same("Scenario analysis"),
            same("Refreshes and governance reporting")
          ]
        },
        {
          slug: "assurance-regulatory-evidence",
          name: same("Assurance / Regulatory Evidence"),
          need: same("Demonstrate a defensible risk and compliance position."),
          delivers: [
            same("Generated evidence views"),
            same("Control mapping"),
            same("Technical documentation"),
            same("Audit support")
          ]
        }
      ]
    }
  ] as readonly EngagementGroup[],
  needLabel: same("What you are deciding"),
  deliversLabel: same("What OXOT delivers")
};

export const FINAL_CTA = {
  /* THE PAGE'S ONE ASK, and the source's own strongest offer verbatim —
     deliberately not "book a demo", which the source rejects as too generic
     for a consulting-led OT product. It also describes the real onboarding
     model rather than standing in for it. */
  h2: same("Bring one P&ID and an asset list for one facility."),
  body: same(
    "We will show how the model turns them into a defensible decision. One facility, your own drawings and your own asset inventory — not a generic demo environment. That first pass is what tells you whether any of the four engagements above is worth starting."
  ),
  cta: same("Start that conversation")
};
