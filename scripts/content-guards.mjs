/**
 * CONTENT GUARDS — the defects this site has already paid for, pinned.
 *
 * `measure.mjs` checks whether a page is BUILT correctly: one h1, contrast,
 * overflow, dead links. It cannot tell you whether the page is TRUE. These are
 * the assertions that a specific, already-shipped factual error has not come
 * back, and every one of them exists because a reviewer found it on a rendered
 * page rather than because someone imagined it might happen.
 *
 * Run against the RENDERED DOM, never against source or against HTML text.
 * CLAUDE.md §7c: Next's RSC payload contains the raw markdown source, so an
 * HTML grep produces false positives. `main.innerText` is what a reader sees.
 *
 *   node scripts/content-guards.mjs                  # default routes
 *   node scripts/content-guards.mjs /en /nl/company  # explicit
 *
 * Exit code is the gate: 0 clean, 1 if any guard fires.
 */

import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const BASE = process.env.SITE_BASE ?? process.env.BASE ?? "http://localhost:3100";

const ROUTES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      "/en", "/en/consulting", "/en/company", "/en/facility-due-diligence", "/en/case-studies", "/en/case-studies/ma-ot-due-diligence", "/en/cdt-2", "/en/reference", "/en/contact",
      "/en/privacy", "/en/cookies", "/en/terms",
      "/nl", "/nl/consulting", "/nl/company", "/nl/facility-due-diligence", "/nl/cdt-2", "/nl/reference", "/nl/contact",
      "/nl/privacy", "/nl/cookies", "/nl/terms"
    ];

const norm = (s) => s.replace(/\s+/g, " ").trim();

/**
 * GUARD 1 — Article 14 has FOUR notifications, IN EVERY SENTENCE THAT LISTS THEM.
 *
 * Every surface of the old site said "24 hours, 72 hours, 14 days" and dropped
 * the 30-day final report on a severe incident. This guard is dead weight
 * since the CRA product line was pulled 2026-08-21 (owner) — no surviving
 * page asserts the clocks — kept only as a regression fixture below.
 *
 * THIS GUARD WAS WRONG ONCE, AND THE WAY IT WAS WRONG MATTERS MORE THAN THE
 * DEFECT IT MISSED. The first version asked whether "30 days" appeared anywhere
 * in the page's text. On 2026-08-07 the five-date calendar moved onto /cra,
 * which already rendered `CRA.article14` with three clocks in its hero. The
 * moved figure supplied the token "30 days" further down the same page, the
 * page-level test went green, and /cra shipped stating the obligation two
 * different ways 900px apart — with the guard reporting clean. Both round-2
 * reviewers found it independently.
 *
 * A page-scoped token test cannot catch a per-sentence error, and it gets
 * WEAKER as more content lands on the page. So the unit is the sentence: any
 * sentence that names the first three clocks must also name the fourth.
 */
function guardArticle14({ text }) {
  // Sentence-ish. Splitting on terminal punctuation is enough here because the
  // clock lists are always inside one sentence, and an over-eager split can
  // only produce a FALSE ALARM, never a silent pass — which is the right way
  // for this particular check to fail.
  const sentences = text.split(/(?<=[.!?])\s+/);
  for (const s of sentences) {
    const en = s.includes("24 hours") && s.includes("72 hours") && s.includes("14 days");
    const nl = s.includes("24 uur") && s.includes("72 uur") && s.includes("14 dagen");
    // THE FOURTH NOTIFICATION, IN EITHER WORDING. This used to demand the
    // literal "30 days", which would have FALSE-FIRED on a correct sentence
    // written the way the Regulation writes it: Article 14(4)(c) says "within
    // one month after the submission of the incident notification". A guard
    // that fails accurate copy teaches people to weaken the guard, so it now
    // accepts either form and still insists the fourth notification is there.
    if (en && !/30 days|one month/i.test(s)) {
      return `a sentence names the 24h/72h/14-day clocks but not the final report on a severe incident (one month / 30 days) — Article 14 has four notifications, not three: "${s.trim().slice(0, 140)}"`;
    }
    if (nl && !/30 dagen|(?:één|een) maand/i.test(s)) {
      return `een zin noemt de klokken 24u/72u/14 dagen maar niet het eindrapport over een ernstig incident (één maand / 30 dagen) — artikel 14 kent vier meldingen, niet drie: "${s.trim().slice(0, 140)}"`;
    }
  }
  return null;
}

/**
 * GUARD 2 — a future obligation is never described as already in force.
 *
 * The cleared claim sheet itself contains this trap: it approves "What Article
 * 14 already requires ... as of 11 September 2026", written for a reader
 * arriving after September. On 7 August 2026 that obligation was 35 days away.
 * Eight surfaces of the old site went wrong this way and the live conformity
 * app still carries it. English and Dutch both.
 */
const NEVER_BEFORE_11_SEP = [
  /\balready requires\b/i,
  /\balready enforceable\b/i,
  /\balready in force\b/i,
  /\breeds van kracht\b/i,
  /\bal van kracht\b/i,
  /\bis al verplicht\b/i
];

function guardPrematureObligation({ text }) {
  for (const re of NEVER_BEFORE_11_SEP) {
    const m = text.match(re);
    if (m) return `describes an obligation as already in force: "${m[0]}"`;
  }
  return null;
}

/**
 * GUARD 3 — the signature paragraph keeps its subject in Dutch.
 *
 * "We would rather YOU read that from RVO than from us" was translated as "Wij
 * lezen dat liever bij RVO dan bij ons" — "we would rather read that at RVO",
 * subject OXOT. The sentence exists to send the READER to verify externally, so
 * a translation without the reader is not a softer version of the claim, it is
 * a different and pointless one. Two reviewers flagged it independently.
 *
 * DEAD SINCE 2026-08-21 — the paragraph this guards was removed, per direct
 * instruction (see src/content/claims.ts). The early-return on line 119 below
 * means it now always passes; left in place rather than deleted, same as
 * `guardArticle14`, since removing a guard is a bigger decision than letting
 * an inert one sit harmlessly.
 */
function guardCostlyTruthNl({ route, text }) {
  if (!route.startsWith("/nl")) return null;
  if (!text.includes("scoorden hoger dan het onze")) return null;
  if (text.includes("Wij lezen dat liever bij RVO")) {
    return "the costly-truth line lost its subject in Dutch — it must ask the READER to read it at RVO";
  }
  if (!/hebben liever dat u dat bij RVO leest/.test(text)) {
    return "the costly-truth line no longer addresses the reader in Dutch";
  }
  return null;
}

/**
 * GUARD 4 — no unsourced trend verb standing in for a fact.
 *
 * "The register is filling" / "Het register vult zich" shipped with no count,
 * no date and no link, on a site whose house rule is to quote the EU's urgency
 * and never assert its own. An adjective doing a fact's job is the failure mode
 * this reader punishes fastest.
 */
function guardUnsourcedTrend({ text }) {
  for (const re of [/register is filling/i, /register vult zich/i]) {
    const m = text.match(re);
    if (m) return `unsourced trend claim: "${m[0]}" — give a count and a link, or state what the date governs`;
  }
  return null;
}

/**
 * GUARD 5 — the homepage hands off to /cdt-2.
 *
 * The h1 states a constraint the Cyber Digital Twin exists to answer. Round 1
 * found the twin was never named or linked in <main>; round 2 added the link;
 * round 3 broke it again and nobody noticed, because the break was silent — a
 * case-sensitive indexOf missed "The" vs "the", and the render fell back to
 * plain text. tsc was clean, measure was 14/14, the guards were green, and the
 * link was gone. Found by opening the page in a browser.
 *
 * /twin retired 2026-08-22 (owner) — the original homepage is gone (replaced
 * by the former /home-2), and /cdt-2 is now the only Cyber Digital Twin
 * destination the homepage hands off to.
 *
 * So the handoff is asserted, not assumed. This wants the LINK LIST, not the
 * text, which is why it takes `links` rather than `text`.
 */
function guardHomeHandoffs({ route, links }) {
  const home = /^\/(en|nl)$/.test(route);
  if (!home) return null;
  const missing = ["/cdt-2"].filter(
    (dest) => !links.some((h) => h && h.includes(dest))
  );
  if (missing.length) {
    return `the homepage does not link to ${missing.join(" or ")} from <main>. The h1 states a constraint the twin answers; if the page never routes there, the h1 writes a cheque the page does not cash. Links found: ${JSON.stringify(links)}`;
  }
  return null;
}

const GUARDS = [
  ["home-hands-off", guardHomeHandoffs],
  ["article-14-four-clocks", guardArticle14],
  ["no-premature-obligation", guardPrematureObligation],
  ["costly-truth-nl-subject", guardCostlyTruthNl],
  ["no-unsourced-trend", guardUnsourcedTrend]
];

/**
 * GUARD 6 — the as-of date has not gone stale.
 *
 * Every day-count on the site is measured from `AS_OF`. The page states the
 * anchor honestly ("Measured from 7 August 2026"), so it does not become a lie
 * — it becomes stale, silently, and a reader who does the subtraction finds a
 * site that stopped counting. This makes staleness loud instead.
 */
const STALE_AFTER_DAYS = 30;

function guardAsOfFreshness() {
  const src = readFileSync(new URL("../src/content/claims.ts", import.meta.url), "utf8");
  const m = src.match(/export const AS_OF = "(\d{4}-\d{2}-\d{2})"/);
  if (!m) return 'AS_OF not found in src/content/claims.ts';
  const age = Math.floor((Date.now() - Date.parse(`${m[1]}T00:00:00Z`)) / 86_400_000);
  if (age > STALE_AFTER_DAYS) {
    return `AS_OF is ${m[1]}, ${age} days old (limit ${STALE_AFTER_DAYS}). Every day-count on the site is measured from it. Re-verify the dates against docs/reference/CRA-DATES.md and move it.`;
  }
  if (age < 0) return `AS_OF is ${m[1]}, which is in the future`;
  return null;
}

/**
 * SELF-TEST — every guard must prove it fires.
 *
 * A guard that has never been red is not evidence, it is decoration. This
 * project has already shipped one: `measure.mjs` reported "0 contrast
 * failures" for days while its colour parser silently rejected 54 of 58 nodes.
 * So each predicate is run against the exact string that actually shipped and
 * had to be caught, and the suite refuses to run if any of them passes.
 *
 *   node scripts/content-guards.mjs --self-test
 */
const RED_CASES = [
  {
    guard: "article-14-four-clocks",
    fn: guardArticle14,
    // The string that shipped on the homepage on 2026-08-07.
    input: { route: "/en", text: "Article 14 reporting 24 hours, 72 hours, 14 days — including products already on the market." }
  },
  {
    guard: "article-14-four-clocks",
    fn: guardArticle14,
    input: { route: "/nl", text: "Meldplicht artikel 14 24 uur, 72 uur, 14 dagen" }
  },
  {
    // THE REGRESSION CASE. This is /cra as it actually shipped on 2026-08-07:
    // a three-clock sentence in the hero and a correct four-clock sentence
    // further down the same page. The page-scoped version of this guard
    // returned null here and reported the route clean.
    guard: "article-14-four-clocks (mixed page — the case that shipped)",
    fn: guardArticle14,
    input: {
      route: "/en/cra",
      text: "From 11 September 2026, Article 14 reporting applies — 24 hours, 72 hours, 14 days — to products already on the market. Some other section entirely. Article 14 reporting 24 hours, 72 hours, 14 days, 30 days — including products already placed on the market."
    }
  },
  {
    guard: "article-14-four-clocks (mixed page, NL)",
    fn: guardArticle14,
    input: {
      route: "/nl/cra",
      text: "Vanaf 11 september 2026 geldt de meldplicht van artikel 14 — 24 uur, 72 uur, 14 dagen — ook voor producten die al op de markt zijn. Een andere sectie. Meldplicht artikel 14 24 uur, 72 uur, 14 dagen, 30 dagen — ook voor producten die al in de handel zijn gebracht."
    }
  },
  {
    // The case that actually shipped: the sentence renders, the link does not.
    guard: "home-hands-off (link silently dropped)",
    fn: guardHomeHandoffs,
    input: { route: "/en", links: ["/en/check", "https://english.rvo.nl/x", "/en/check"] }
  },
  {
    guard: "no-premature-obligation",
    fn: guardPrematureObligation,
    // The live conformity app's hero, and the trap inside our own claim sheet.
    input: { route: "/en", text: "reporting obligations are already enforceable" }
  },
  {
    guard: "costly-truth-nl-subject",
    fn: guardCostlyTruthNl,
    input: { route: "/nl", text: "Zes van die dertien scoorden hoger dan het onze. Wij lezen dat liever bij RVO dan bij ons." }
  },
  {
    guard: "no-unsourced-trend",
    fn: guardUnsourcedTrend,
    input: { route: "/en", text: "Conformity assessment bodies can be notified. The register is filling." }
  }
];

if (process.argv.includes("--self-test")) {
  let bad = 0;
  for (const { guard, fn, input } of RED_CASES) {
    const why = fn(input);
    console.log(`${why ? "✓ fires" : "✗ SILENT"}  ${guard.padEnd(26)} ${why ?? "guard did not catch a known-bad string"}`);
    if (!why) bad++;
  }
  // And the inverse: a corrected string must NOT fire. Both wordings of the
  // fourth notification count — "30 days" is how this repo phrases it, "one
  // month" is how Article 14(4)(c) does, and a guard that rejected the
  // Regulation's own words would be training people to weaken it.
  const GREEN = [
    ["article-14 (corrected)", "/en", "24 hours, 72 hours, 14 days, 30 days"],
    ["article-14 (one month)", "/en", "24 hours, 72 hours, 14 days, and one month for a severe incident"],
    ["article-14 (NL, één maand)", "/nl", "24 uur, 72 uur, 14 dagen, en één maand bij een ernstig incident"]
  ];
  for (const [label, route, text] of GREEN) {
    const clean = guardArticle14({ route, text });
    console.log(`${clean ? "✗ FALSE POSITIVE" : "✓ quiet"}  ${label.padEnd(26)} ${clean ?? "correct string passes"}`);
    if (clean) bad++;
  }
  process.exit(bad ? 1 : 0);
}

const failures = [];

const asOf = guardAsOfFreshness();
if (asOf) failures.push({ route: "(repo)", guard: "as-of-freshness", why: asOf });
else console.log("✓ (repo)        as-of-freshness");

const browser = await chromium.launch();
for (const route of ROUTES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const resp = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
  // innerText, not textContent: it is what is actually rendered to a reader,
  // and it excludes anything display:none that a source grep would find.
  const { text: rawText, links } = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    return {
      text: main.innerText,
      links: [...main.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"))
    };
  });
  const text = norm(rawText);
  await page.close();

  const hits = [];

  // A GUARD THAT PASSES ON A BROKEN PAGE IS NOT A GUARD.
  //
  // Learned the hard way on 2026-08-07: a missing dictionary key 500'd the
  // homepage, and every content guard reported ✓ — because Next's error page
  // contains none of the strings they look for. "0 violations" and "nothing
  // rendered" are indistinguishable unless the harness insists on a real page.
  if (!resp || !resp.ok()) {
    hits.push({ route, guard: "page-renders", why: `HTTP ${resp ? resp.status() : "no response"} — nothing was checked` });
  } else if (text.split(" ").length < 40) {
    hits.push({ route, guard: "page-renders", why: `only ${text.split(" ").length} words in <main> — the page did not render, so the guards below prove nothing` });
  } else {
    for (const [name, fn] of GUARDS) {
      const why = fn({ route, text, links });
      if (why) hits.push({ route, guard: name, why });
    }
  }
  failures.push(...hits);
  console.log(`${hits.length ? "✗" : "✓"} ${route.padEnd(14)} ${hits.length ? hits.map((h) => h.guard).join(", ") : GUARDS.length + " guards"}`);
}
await browser.close();

if (failures.length) {
  console.log(`\n${failures.length} guard failure${failures.length === 1 ? "" : "s"}:\n`);
  for (const f of failures) console.log(`  ${f.route}  [${f.guard}]\n    ${f.why}\n`);
  process.exit(1);
}
console.log(`\nAll ${GUARDS.length} content guards clear on ${ROUTES.length} routes, plus as-of freshness.`);
