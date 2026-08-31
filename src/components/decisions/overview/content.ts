/**
 * /decisions — the Four Decisions index copy.
 *
 * WHY THIS FILE EXISTS. The four decision pages shipped with no hub tying
 * them together: /decisions/fix-first, /decisions/investment,
 * /decisions/change-safely and /decisions/risk-acceptance were each reachable
 * only from the Platform dropdown and from each other, and `/decisions`
 * itself 404'd. A reader arriving from `/cdt-2#decide` — where the
 * abbreviated switchboard runs — had nowhere to land that explained the frame
 * before asking them to pick a door.
 *
 * NOTHING HERE IS NEW MATERIAL. Every claim below is a restatement of a claim
 * one of the four pages already makes, and each door's fields are sourced
 * field-for-field from that decision's own `content.ts`:
 *
 *   01  name      decisions/fix-first        HERO.h1
 *       question  decisions/fix-first        HERO.question
 *       outcome   decisions/fix-first        PANEL.rows "Output" + BOARD.intro
 *   02  name      decisions/investment       HERO.eyebrow ("What should we spend?")
 *       question  decisions/investment       HERO.buyerQuestion
 *       outcome   decisions/investment       ANATOMY.steps[2] + OUTPUTS + TAIL
 *   03  name      decisions/change-safely    HERO.h1
 *       question  decisions/change-safely    HERO.claim, put back into the
 *                 interrogative — see the note on DOORS below
 *       outcome   decisions/change-safely    COMPARISON.intro + PANELS.intro
 *   04  name      decisions/risk-acceptance  HERO.kicker ("Accept or defer")
 *       question  decisions/risk-acceptance  HERO.lead, first clause
 *       outcome   decisions/risk-acceptance  META.description + RECORD.fields
 *
 * An index that promises something a sub-page does not deliver is worse than
 * no index, so the rule for editing this file is the rule that built it: if a
 * sentence here cannot be pointed back at one of those four files, it does
 * not belong on this page.
 *
 * NO NUMBERS, the same rule all four sub-pages hold themselves to. The only
 * numerals on the page are the decision ordinals 01–04. No percentages,
 * currency, durations, counts, customer names or certifications appear
 * anywhere, because none of them would be verified.
 *
 * `Bilingual` throughout via the local `same()` — both locales render, `nl` is
 * a same-as-English placeholder pending translation, not a claim that this is
 * correct Dutch. Defined locally rather than imported across domains, the same
 * convention the sibling decision content modules follow.
 */
import type { Bilingual } from "@/i18n/bilingual";

/** Marks a string as "not yet translated", not "translated to itself". */
function same(en: string): Bilingual {
  return { en, nl: en };
}

export const META = {
  title: "The Four Decisions | Fix, Spend, Change, Accept — With the Evidence",
  description:
    "OXOT frames OT security work as four decisions: what to fix first, what to spend, whether a change is safe, and what can be accepted or deferred. Each has its own question, its own evidence and its own written output."
};

export const BREADCRUMB = {
  here: same("Decisions")
};

export const HERO = {
  kicker: same("The four decisions"),
  h1: same("Four decisions, and the evidence to defend each one."),
  lede: same(
    "Security work in a running plant comes down to four questions. Almost everything else is detail underneath one of them."
  ),
  /* The four asks below are the four pages' own closing asks, in order — see
     fix-first CTA.h2 ("Bring your backlog"), investment CTA.h2 ("the budget
     line you cannot defend"), change-safely CTA.h2 ("the change you cannot
     rehearse") and risk-acceptance CTA.h2 / HERO.body. They are the fastest
     way for a reader to recognise which decision they are actually being
     asked to make. */
  body: same(
    "The backlog nobody can order. The budget line nobody can defend. The change nobody will approve without evidence. The finding that is not being worked on and has never been decided. Each is a different decision with a different question behind it, so each one gets its own page, its own evidence and its own written output."
  ),
  /* Both buyers, named plainly. Traceable to fix-first ROLES and EVIDENCE
     (consequence from your own studies, reachability from a model of your
     network) and to investment ANATOMY.steps[3]. */
  body2: same(
    "Two people are usually in the room. One has to defend a spend to a board and an exception to an auditor. The other has to not break a running plant. All four decisions serve both, because all four are built from the same two things: the safety and reliability studies your engineers already own, and a model of the network you actually run."
  ),
  ctaPrimary: same("Talk to an OT engineer"),
  ctaSecondary: same("See all four on the Cyber Digital Twin page")
};

export interface Door {
  /** The decision ordinal. The only numerals this page carries. */
  n: string;
  /** Locale-free, applied through `localePath` at the call site. */
  path: string;
  name: Bilingual;
  /** The question that decision answers, in the sub-page's own words. */
  question: Bilingual;
  /** What the reader leaves with. The sub-page's own stated output. */
  outcome: Bilingual;
  cta: Bilingual;
}

/**
 * The four doors.
 *
 * DECISION 03'S QUESTION IS THE ONE THAT NEEDED WORK. Decisions 01, 02 and 04
 * each store their buyer question in a named field, so those three are quoted
 * directly. `decisions/change-safely/content.ts` has no `question` field at
 * all — its framing lives in `HERO.claim`, written as an instruction: "Test
 * the firewall, patch, re-zoning, access change, or supplier option in the
 * model before changing the live environment." What appears below is that
 * sentence put back into the interrogative with every noun kept. Nothing was
 * invented, and that page's own h1 ("Can we change this safely?") is used as
 * the door's name rather than doubling as its question.
 */
export const DOORS: readonly Door[] = [
  {
    n: "01",
    path: "/decisions/fix-first",
    name: same("What do we fix first?"),
    question: same("Which reachable issue can affect what matters most?"),
    outcome: same(
      "A NOW / NEXT / accepted-or-deferred board, ordered by the consequence each finding carries, with the traced route that put it there recorded beside every placement."
    ),
    cta: same("Read the triage")
  },
  {
    n: "02",
    path: "/decisions/investment",
    name: same("What should we spend?"),
    question: same("Which option removes the most consequential risk for the investment?"),
    outcome: same(
      "A bounded spend recommendation with a stated ceiling, the point beyond which more money stops paying, and the loss tail priced apart from the average."
    ),
    cta: same("Read the investment case")
  },
  {
    n: "03",
    path: "/decisions/change-safely",
    name: same("Can we change this safely?"),
    question: same(
      "Can we test the firewall, patch, re-zoning, access change or supplier option in the model before changing the live environment?"
    ),
    outcome: same(
      "The baseline and the modelled result read side by side: what the control closes, what it leaves open and names rather than counts as solved, and the record a change authority needs in order to sign."
    ),
    cta: same("Read the change method")
  },
  {
    n: "04",
    path: "/decisions/risk-acceptance",
    name: same("What can we accept or defer?"),
    question: same("Which issue has a defensible, time-bounded exception with evidence?"),
    outcome: same(
      "A risk-acceptance record: reachability, consequence, the compensating controls the decision rests on, an accountable role rather than a name, and the conditions that reopen it."
    ),
    cta: same("Read the acceptance record")
  }
];

export const DOORS_SECTION = {
  label: same("Pick the one you are facing"),
  /* "Decision", not "door" — `DOORS` is this file's internal name for the
     four cards, and the reader has no reason to inherit our metaphor. */
  heading: same("Each decision is a question, the evidence behind it, and something written down."),
  questionLabel: same("The question it answers"),
  outcomeLabel: same("What you leave with")
};
