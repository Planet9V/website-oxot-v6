/**
 * /resources/product-sheet — the one-page product summary.
 *
 * READER INTENT. resources-purpose.md gives the Product Sheet one job:
 * "What is this product and what decisions does it support?" — OXOT's role is
 * product evaluator, and the right CTA is "Request a technical briefing".
 * That is a scanning read, done in two minutes, usually by someone forwarding
 * it to a colleague. It is NOT the deep read; /technical-specification already
 * is that, and the Platform and Decision pages are the long-form arguments.
 *
 * SO THIS FILE IS DELIBERATELY THIN. Every block here is a summary with a
 * destination attached. Nothing on this page is the only place a fact lives —
 * if a reader wants the reasoning behind a line, the line carries the link to
 * the page that makes the argument in full. Where this sheet and a fuller page
 * must state the same fact (consequence comes from the customer's own
 * engineering; nothing is installed on the process network; three deployment
 * modes, all passive-first), the fact is identical and the sentence is not.
 *
 * SOURCES READ FOR FACTS AND TONE, NOT IMPORTED FROM: components/cdt2/
 * content-1.ts (HERO, WHY_IT_EXISTS, DECISION_01) and content-2.ts
 * (ENGINE_WHAT_IT_IS, DEPLOYMENT), plus the four /decisions pages and
 * platform/how-it-works, platform/integrations and
 * platform/deployment-sovereignty. /cdt-2 and its content files are
 * read-only; nothing here reaches into them at runtime.
 *
 * `Bilingual` via `same()` — both locales render, `nl` is a same-as-English
 * placeholder pending translation, not a claim of correct Dutch. Same
 * convention as the industry, assurance and platform pages; grep `same(` for
 * the translation pass.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";
import { PATHS } from "@/components/shell/nav";

/** This page's locale-free path. Not in PATHS: nav.ts belongs to the
 *  integration owner and route registration is handled separately. */
export const SHEET_PATH = "/resources/product-sheet";

/** The Resources index this sheet sits under, for the breadcrumb trail. */
export const RESOURCES_PATH = "/resources";

export const META = {
  title: "OXOT Cyber Digital Twin — Product Sheet",
  description:
    "One page on what the OXOT Cyber Digital Twin is, the four decisions it makes answerable, how it is built, how it deploys, and what it produces for assurance. Two-minute read, with links to the full detail."
};

export const BREADCRUMB = {
  resources: same("Resources"),
  here: same("Product sheet")
};

export const MASTHEAD = {
  kicker: same("Resources / Product sheet"),
  h1: same("The Cyber Digital Twin, on one page."),
  strap: same("A computable replica of your plant, carrying its security state alongside its engineering state."),
  body: [
    same(
      "OXOT builds a working replica of your industrial environment from engineering records you already hold — drawings, control logic, safety and reliability studies, network topology — then runs attacks, patches, re-zonings and budget options against the replica instead of the plant."
    ),
    same(
      "What you buy is not the model. What you buy is the ability to decide, with evidence, what to fix, what to spend, and what to leave alone."
    )
  ],
  /* The scan target. A reader who reads nothing else on this page should be
     able to answer "is this even the right category of thing" from here. */
  glanceHeading: same("At a glance"),
  glance: [
    { k: same("Product"), v: same("OXOT Cyber Digital Twin, powered by the Seldon Engine") },
    { k: same("Category"), v: same("Physics-based OT cyber risk modelling and decision support") },
    { k: same("Built from"), v: same("Your own engineering record — P&IDs, control logic, HAZOP/LOPA, FMEA, topology") },
    { k: same("Touches the plant"), v: same("No. No agents on controllers, no active scanning of the process network") },
    { k: same("Output"), v: same("Loss distributions in euros, ranked remediation, tested change plans, risk-acceptance records") },
    { k: same("Deployment"), v: same("Island mode, one-way data diode, or single-tenant dedicated instance") },
    { k: same("Delivery"), v: same("Consulting-led: OXOT OT engineers build and deploy it, transient or sustained") },
    { k: same("Frameworks"), v: same("IEC 62443, NIS2, Cyber Resilience Act, EN 50701, IEC 62278") }
  ]
};

/* ------------------------------------------------------------------ 01 */

export const DEFINITION = {
  n: "01",
  kicker: same("Definition"),
  h2: same("What it is, and what it is not."),
  intro: same(
    "A digital twin is a replica accurate enough to run experiments on instead of the real thing. A Cyber Digital Twin is that replica carrying firmware, pathways, vulnerabilities and adversaries alongside the engineering — which is what makes the operational question answerable rather than the vulnerability question."
  ),
  isHeading: same("It is"),
  is: [
    same("A model that computes — you ask it questions and it answers"),
    same("Passive: built from your engineering record, not from probing the plant"),
    same("Living: change a component and the risk deltas regenerate"),
    same("A probability landscape in euros, with confidence intervals"),
    same("A standing capability your team can run and interrogate")
  ],
  isNotHeading: same("It is not"),
  isNot: [
    same("A dashboard over your existing tools"),
    same("A scanner, or an agent on your controllers"),
    same("A diagram that ages the day it is drawn"),
    same("A maturity score out of five"),
    same("A one-off assessment report")
  ]
};

/* ------------------------------------------------------------------ 02 */

export interface DecisionRow {
  n: string;
  question: Bilingual;
  answer: Bilingual;
  href: string;
  linkLabel: Bilingual;
}

export const DECISIONS = {
  n: "02",
  kicker: same("Decisions supported"),
  h2: same("Four decisions this makes answerable."),
  intro: same(
    "These are the questions the model exists to settle. Each has its own page, and each answer takes apart — back through the control option, the loss distribution, the reachable pathway, to a line on a drawing you already hold."
  ),
  rows: [
    {
      n: "01",
      question: same("What do we fix first?"),
      answer: same(
        "Findings ranked by what would physically happen if they were used against you, weighed against whether anyone can reach them. Consequence comes from your own safety studies; reachability from a model of your real network. Neither is our opinion."
      ),
      href: PATHS.decisionFixFirst,
      linkLabel: same("Prioritisation, in full")
    },
    {
      n: "02",
      question: same("What should we spend?"),
      answer: same(
        "Spend does not buy risk reduction in a straight line. The engine maps the response surface for your estate and finds the ridge — where each additional euro stops paying — so the ask is bounded rather than open-ended."
      ),
      href: PATHS.decisionInvestment,
      linkLabel: same("The investment curve")
    },
    {
      n: "03",
      question: same("Can we change this safely?"),
      answer: same(
        "Test the firewall rule, the patch, the re-zoning, the access change or the supplier option in the model, then read it back against the baseline. The model changes; the plant does not."
      ),
      href: PATHS.decisionChangeSafely,
      linkLabel: same("Change testing")
    },
    {
      n: "04",
      question: same("What can we accept?"),
      answer: same(
        "Deciding not to fix something is still a decision. It comes out as a time-bounded record with reachability, consequence, compensating controls, an accountable owner and a review trigger — not as a finding that quietly ages."
      ),
      href: PATHS.decisionRiskAcceptance,
      linkLabel: same("Risk acceptance")
    }
  ] satisfies readonly DecisionRow[]
};

/* ------------------------------------------------------------------ 03 */

export const MECHANISM = {
  n: "03",
  kicker: same("Mechanism"),
  h2: same("From a drawing you already hold to a decision that survives an audit."),
  intro: same(
    "Five steps, run once and then kept live. The long version — what each step consumes, what it emits, and why the order cannot be shuffled — is on the platform page."
  ),
  steps: [
    {
      n: "1",
      title: same("Engineering evidence"),
      body: same("Drawings, control logic, safety and reliability studies, asset and topology records.")
    },
    {
      n: "2",
      title: same("Physical consequence"),
      body: same("What stops, what is damaged, who is exposed — inherited from your own studies, not scored by us.")
    },
    {
      n: "3",
      title: same("Reachable pathway"),
      body: same("Whether an adversary can actually get from an entry point to that consequence.")
    },
    {
      n: "4",
      title: same("Threat and likelihood"),
      body: same("External intelligence moves likelihood. It never moves consequence.")
    },
    {
      n: "5",
      title: same("Exposure and options"),
      body: same("A loss distribution in euros, and the control options that shift it.")
    }
  ],
  linkLabel: same("How it works, step by step"),
  href: PATHS.howItWorks
};

/* ------------------------------------------------------------------ 04 */

export const DEPLOYMENT = {
  n: "04",
  kicker: same("Deployment & inputs"),
  h2: same("Three ways to run it, all passive-first."),
  intro: same(
    "No agents on your controllers and no active scanning of the process network, in any configuration. The question is never whether the model can reach your plant — only which data you have approved to reach the model."
  ),
  modes: [
    {
      n: "01",
      title: same("Island mode"),
      body: same("Isolated, on your own ground. No external dependencies and no access to control systems.")
    },
    {
      n: "02",
      title: same("One-way data diode"),
      body: same("Inbound only. Threat intelligence streams into the twin; nothing leaves.")
    },
    {
      n: "03",
      title: same("Dedicated instance"),
      body: same("Single-tenant, in the region your data sovereignty requirements name.")
    }
  ],
  modesLinkLabel: same("Deployment & data sovereignty"),
  modesHref: PATHS.deploymentSovereignty,
  inputsHeading: same("Reads from the systems you already run"),
  inputs: [
    same("Asset management"),
    same("Historians"),
    same("Network monitoring"),
    same("Service management"),
    same("Engineering document stores"),
    same("Vulnerability and CMDB records")
  ],
  inputsLinkLabel: same("Full input catalogue"),
  inputsHref: PATHS.integrations
};

/* ------------------------------------------------------------------ 05 */

export const ASSURANCE = {
  n: "05",
  kicker: same("Assurance"),
  h2: same("Evidence an assessor can follow, not a claim they have to trust."),
  intro: same(
    "The model's outputs are built to be handed over. A prioritisation, a change plan or an acceptance record carries the reasoning that produced it, so a certification body, a regulator or your own board can walk it backwards to the source document rather than take the number on faith."
  ),
  frameworks: [
    same("IEC 62443"),
    same("NIS2"),
    same("Cyber Resilience Act"),
    same("EN 50701"),
    same("IEC 62278-2"),
    same("Evidence & data provenance")
  ],
  linkLabel: same("Assurance & frameworks"),
  /* EN-only destination (see nav.ts): /assurance guards on locale !== "en".
     The Dutch fallback is /cdt-2, the same substitution the platform pages
     make. Reversible: once /assurance is bilingual, drop the ternary. */
  href: PATHS.assurance,
  hrefNl: PATHS.cdt2,
  linkLabelNl: same("Explore the Cyber Digital Twin")
};

/* ---------------------------------------------------------------- CTA */

export const CLOSING = {
  kicker: same("Next step"),
  h2: same("Request a technical briefing."),
  body: same(
    "A working session with an OXOT OT engineer, on your estate rather than on a slide deck: bring a plant, a backlog, a change you cannot rehearse, or a budget question, and we will show you what the model would do with it."
  ),
  ctaPrimary: same("Request a technical briefing"),
  /* EN-only, same guard as ASSURANCE above. */
  ctaSecondary: same("Read the technical specification"),
  ctaSecondaryNl: same("Explore the Cyber Digital Twin")
};
