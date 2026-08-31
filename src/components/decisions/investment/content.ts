import type { Bilingual } from "@/i18n/bilingual";

/**
 * DECISION 02 — "What should we spend?" — the detailed form of the Four
 * Decisions switchboard entry specified in new_material_source/
 * 1_website_layout_v4/OXOT_Visual_Foundation_Spec.md §6 (buyer question:
 * "Which option removes the most consequential risk for the investment?",
 * destination /decisions/investment).
 *
 * The argument, the tail paragraph, the "Survive first. Optimise second."
 * callout and the three outputs are the same claims /cdt-2's investment
 * section already makes — restated here rather than imported, because
 * src/components/cdt2/ is a protected, read-only comparison build and this
 * page is a separate, permanent destination that must not break when that
 * one changes. Everything else (the three curve zones, the decision
 * anatomy, the sibling decisions) is new material specific to the detailed
 * form.
 *
 * `Bilingual` throughout via the local `same()` — both locales render, `nl`
 * is a same-as-English placeholder pending translation, not a claim that
 * this text is correct Dutch. Same convention as the industry pages; grep
 * `same(` when the real translation pass starts.
 *
 * NO NUMBERS ANYWHERE, deliberately. The spec's claim boundaries forbid
 * showing money values, percentages or annual loss figures without approved
 * inputs, so both charts on this page are drawn with unnumbered axes: they
 * show the SHAPE of the argument and say so in their own captions.
 */
function same(en: string): Bilingual {
  return { en, nl: en };
}

export const META = {
  title: "What Should We Spend? | OT Cyber Investment Decisions",
  description:
    "Spend does not buy risk reduction in a straight line. OXOT's Cyber Digital Twin maps the response surface for your estate, finds the ridge where each additional euro stops paying, and prices the fat tail separately."
};

export const HERO = {
  eyebrow: same("Decision 02 · What should we spend?"),
  h1: same("Spend does not buy risk reduction in a straight line."),
  lead: same(
    "Early investment compounds; then the curve flattens, and past a point more money buys almost nothing. The engine maps that response surface for your estate and finds the ridge — where the return on each additional euro is highest, and where it stops paying. That is what turns a quantified risk into an actionable one: a bounded recommendation rather than an open-ended ask."
  ),
  buyerQuestionLabel: same("The question this decision answers"),
  buyerQuestion: same("Which option removes the most consequential risk for the investment?"),
  ctaPrimary: same("Bring us a budget question"),
  ctaSecondary: same("How the engine gets there")
};

/** Axis and annotation strings for RiskReductionCurve.tsx. They live here
 *  rather than inline in the SVG so the chart translates with the page. */
export const CURVE_CHART = {
  title: same("Risk reduction against cumulative investment"),
  desc: same(
    "Two stacked panels sharing one horizontal spend axis. Above, cumulative consequential risk removed rises slowly, then steeply, then flattens. Below, the risk removed by each additional tranche of spend rises to a peak — the ridge — and then falls away towards zero."
  ),
  cumulativeLabel: same("Consequential risk removed, cumulative"),
  marginalLabel: same("Risk removed per additional euro"),
  xLabel: same("Cumulative investment"),
  zoneOne: same("Compounding"),
  zoneTwo: same("The ridge"),
  zoneThree: same("Flat tail"),
  ridgeCallout: same("Return per euro peaks here"),
  stopsPayingCallout: same("Stops paying"),
  axisNote: same("Axes deliberately unnumbered")
};

export const CURVE = {
  eyebrow: same("The response surface"),
  h2: same("The curve, read in three parts."),
  intro: same(
    "Security budgets are usually argued as a single figure with no shape behind it: a number to be defended, negotiated down, and defended again next year. The shape is the part that makes the number decidable. Plot consequential risk removed against cumulative spend and the same three regions appear — they sit at different places in every estate, and finding where they sit in yours is the work."
  ),
  illustrativeNote: same(
    "Illustrative shape only. This is a generic response curve drawn to explain the argument — not a customer result, not a benchmark, and not the output of a model run against any real estate. Your curve is produced from your own asset, consequence and pathway data, and its ridge will not sit where this one does."
  ),
  zones: [
    {
      n: "01",
      label: same("Compounding"),
      title: same("The first tranche buys more than it costs."),
      body: same(
        "Early spend retires whole consequence chains rather than individual findings — the reachable pathway into the safety-critical system goes, and every scenario that depended on it goes with it. Each euro here is worth more than the euro before it, which is why a programme that starts anywhere other than the reachable-and-consequential set spends its best money badly."
      )
    },
    {
      n: "02",
      label: same("The ridge"),
      title: same("Where the return on the next euro peaks."),
      body: same(
        "Past the ridge, each additional euro removes less risk than the one before it. This is the number a board is actually asking for when it asks what the programme costs: how much, and no more, before the case for the next euro has to be made on grounds other than risk reduction."
      )
    },
    {
      n: "03",
      label: same("Flat tail"),
      title: same("The curve keeps rising and stops mattering."),
      body: same(
        "Spend beyond the ridge is not wasted in an accounting sense — residual risk does keep falling. It simply stops changing any decision the business makes, and it competes for capital with the parts of the estate whose own curves are still in their compounding region."
      )
    }
  ]
};

export const TAIL = {
  eyebrow: same("The tail is priced separately"),
  h2: same("An average is the one figure that hides the loss you cannot survive."),
  body: same(
    "Industrial cyber loss is fat-tailed: one adversary reaching one safety-critical system produces a loss far beyond the mean, and averaging never surfaces it. Monte Carlo simulation returns a full loss distribution with confidence intervals, and the conditional value at risk of the tail is stated apart from the central estimate."
  ),
  bodyTwo: same(
    "That separation is what stops a defensible-looking programme from being the wrong one. Two option sets can reduce expected loss by the same amount while one of them leaves the ruin scenario entirely intact — and only the tail figure tells them apart."
  ),
  calloutLead: same("Survive first. Optimise second."),
  calloutBody: same(
    "A programme that lowers average risk while leaving ruin risk intact has spent money and bought nothing."
  )
};

/** Axis and annotation strings for LossTailCurve.tsx. */
export const TAIL_CHART = {
  title: same("A fat-tailed loss distribution"),
  desc: same(
    "A right-skewed probability density over loss per event. Most of the mass sits under a narrow early peak; a long shaded tail extends far to the right, with the mean falling to the right of the most likely outcome."
  ),
  xLabel: same("Loss, per event"),
  yLabel: same("Likelihood"),
  modeLabel: same("Most likely outcome"),
  meanLabel: same("Mean"),
  tailLabel: same("The tail — priced apart from the mean"),
  axisNote: same("Illustrative distribution shape · axes deliberately unnumbered")
};

export const ANATOMY = {
  eyebrow: same("What the decision is made of"),
  h2: same("Evidence in, response surface out."),
  intro: same(
    "The recommendation is not a judgement call dressed as a model. Each stage below is inspectable, and the reasoning survives being challenged by the plant manager, the CFO, the auditor and the insurer — including what was deliberately not done, and why."
  ),
  steps: [
    {
      n: "01",
      label: same("Evidence required"),
      body: same(
        "The consequence work your engineers already produced — FMECA, the hazard log, safety- and reliability-critical items, minimum operating requirements — plus the network pathways, and the candidate controls, vendors and sequencing you are actually choosing between."
      )
    },
    {
      n: "02",
      label: same("Model action"),
      body: same(
        "The engine re-runs the loss distribution once per candidate option against the same estate and the same assumptions, then sweeps spend across the option set to map the response surface rather than scoring one proposal in isolation."
      )
    },
    {
      n: "03",
      label: same("Output"),
      body: same(
        "A bounded spend recommendation with a stated ceiling, the ridge it was derived from, the confidence intervals around the central estimate, and the conditional value at risk of the tail stated separately."
      )
    },
    {
      n: "04",
      label: same("Who uses it"),
      body: same(
        "The board and the CFO, who get one figure that moves rather than a maturity score. Procurement, who can compare two proposals on the same basis. Engineering, who inherit a sequence instead of arguing one."
      )
    }
  ]
};

export const OUTPUTS = {
  eyebrow: same("What you leave with"),
  h2: same("Three things a budget conversation has usually never had."),
  items: [
    {
      n: "01",
      title: same("A bounded number"),
      body: same(
        "A spend recommendation with a stated ceiling, and the point beyond which more money stops paying."
      )
    },
    {
      n: "02",
      title: same("Comparable options"),
      body: same("Competing controls, vendors and sequencing scored against the same distribution.")
    },
    {
      n: "03",
      title: same("A roadmap that orders itself"),
      body: same(
        "Every finding carries the risk it removes per euro, so the sequence falls out of the model."
      )
    }
  ]
};

/**
 * The four decisions, for orientation.
 *
 * `path` IS PRESENT ONLY WHERE THE PAGE ACTUALLY EXISTS. /decisions/
 * fix-first and /decisions/risk-acceptance are built and render both
 * locales, so those two rows link. "Can we change safely?" has no page yet
 * and therefore no path — a decorative link to a 404 looks finished and
 * behaves broken. Add the path when that page ships; the component needs no
 * change. Locale-free, applied through `localePath` at the call site, same
 * convention as PATHS.
 */
export const SIBLINGS = {
  eyebrow: same("The four decisions"),
  h2: same("This is the second one."),
  currentIndex: 1,
  items: [
    {
      n: "01",
      name: same("What do we fix first?"),
      question: same("Which reachable issue can affect what matters most?"),
      path: "/decisions/fix-first"
    },
    {
      n: "02",
      name: same("What should we spend?"),
      question: same("Which option removes the most consequential risk for the investment?"),
      path: "/decisions/investment"
    },
    {
      n: "03",
      name: same("Can we change safely?"),
      question: same(
        "Can we test a firewall, patch, route, vendor-access or replacement change before production?"
      ),
      path: undefined
    },
    {
      n: "04",
      name: same("What can we accept or defer?"),
      question: same("Which issue has a defensible, time-bounded exception with evidence?"),
      path: "/decisions/risk-acceptance"
    }
  ],
  note: same(
    "Each decision gets its own detailed page as it is built. The abbreviated form of all four already runs on the Cyber Digital Twin page."
  )
};

export const CTA = {
  h2: same("Bring us the budget line you cannot defend."),
  body: same(
    "The useful first conversation is not a demo. It is one estate, one consequence you already understand, and the two or three options you are choosing between — enough to show you where your own curve bends."
  ),
  primary: same("Talk to an OT engineer"),
  secondary: same("See the engine behind it")
};
