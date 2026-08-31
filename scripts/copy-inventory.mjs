/**
 * COPY INVENTORY — every user-facing string on every route, in both languages,
 * read off the rendered page and written to `docs/PAGE-COPY.md`.
 *
 * WHY THIS IS GENERATED AND NOT WRITTEN BY HAND. A hand-transcribed copy deck
 * is wrong the first time someone edits a dictionary and does not think to
 * update it, and a copy deck that is quietly wrong is worse than none: people
 * quote it in meetings. Everything in the output is what the browser actually
 * painted at the moment the script ran, so the fix for a stale deck is to run
 * the script rather than to proof-read it.
 *
 * WHY THE RENDERED DOM AND NOT THE DICTIONARIES. Three reasons, each of which
 * has already caused a defect in this repo:
 *   1. Copy comes from four places — `i18n/{en,nl}.ts`, the `claims.*.ts`
 *      files, `content/*.ts`, and literals in components. Reading only the
 *      dictionaries misses most of a page.
 *   2. A dictionary key that no component renders is invisible in the file and
 *      absent from the page. `FOSS_EXCEPTION` sat unused for weeks that way.
 *   3. CLAUDE.md §7c: verify against the rendered DOM, never grep the HTML.
 *
 * `textContent`, deliberately, NOT `innerText`. innerText applies CSS
 * `text-transform`, and `.mono-label` uppercases — an innerText deck would
 * record "ARTIKEL 14" as the copy when the copy is "Artikel 14". That same
 * case-sensitivity trap has already made a link silently vanish once.
 *
 *   node scripts/copy-inventory.mjs            # against localhost:3100
 *   BASE=http://localhost:3000 node scripts/...
 */

import { writeFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3100";
const OUT = new URL("../docs/PAGE-COPY.md", import.meta.url).pathname;
const LOCALES = ["en", "nl"];

/** Locale-free paths, mirroring `src/components/shell/nav.ts`. */
const ROUTES = [
  ["", "Home", "The argument in one screen, and the one ask."],
  ["/cra", "The CRA", "What the Regulation requires, and by when."],
  ["/conformity", "OXOT Conformity", "The product: modules, statutory clocks, what it reads."],
  ["/twin", "The Cyber Digital Twin", "Seven layers held as one graph, and what it is built from."],
  ["/consulting", "Consulting", "The engagements, the derivation, the bench."],
  ["/retainer", "CRA Readiness Retainer", "The annuity, the firewall, and what it costs."],
  ["/company", "Company", "Who OXOT is, and the one externally adjudicated credential."],
  ["/check", "The 2-minute check", "The wizard. Initial state only — see the note under it."],
  ["/contact", "Contact", "The written review, and the walkthrough."],
  ["/privacy", "Privacy Policy", "Legal. Accurate to what this app actually processes."],
  ["/cookies", "Cookie Policy", "Legal. One strictly-necessary cookie, no analytics."],
  ["/terms", "Terms of Use", "Legal. The check is indicative, not a determination."]
];

/**
 * Pull text-bearing nodes in document order, skipping any node whose ancestor
 * was already collected — otherwise a <p> inside a <li> is recorded twice and
 * the deck reads as if the copy were duplicated on the page.
 */
function collect() {
  const SEL = "h1,h2,h3,h4,p,li,dt,dd,blockquote,figcaption,button,summary";
  const main = document.querySelector("main") ?? document.body;

  // Disclosure panels (the persona cards' "You're asking / We deliver" halves)
  // ship `hidden` until opened. That copy is real copy — a deck that omits it
  // is missing the most persuasive writing on the homepage. Unhiding mutates
  // this page load only; nothing is saved back.
  for (const el of main.querySelectorAll("[hidden]")) el.removeAttribute("hidden");

  // A span that is laid out as a block IS structure, not inline emphasis. The
  // persona cards are one <button> wrapping five block spans; without this the
  // whole card records as a single unreadable run-on line.
  const isBlockSpan = (el) =>
    el.tagName === "SPAN" && !getComputedStyle(el).display.startsWith("inline");

  const matches = (el) => el.matches(SEL) || isBlockSpan(el);

  const all = [...main.querySelectorAll(`${SEL},span`)].filter(matches);
  const out = [];
  for (const el of all) {
    // Leaf-most only: if this element contains another collectible, that child
    // carries the copy and this one is just its box.
    if ([...el.querySelectorAll(`${SEL},span`)].some(matches)) continue;
    if (el.getAttribute("aria-hidden") === "true") continue;
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    if (!text) continue;
    out.push({
      tag: el.matches("h1,h2,h3,h4") ? el.tagName.toLowerCase()
         : el.tagName === "BUTTON" ? "button"
         : el.tagName === "DT" ? "dt"
         : "text",
      text
    });
  }
  return out;
}

const esc = (s) => s.replace(/\|/g, "\\|");

const browser = await chromium.launch();
const page = await browser.newPage();

const stamp = process.env.STAMP ?? new Date().toISOString().slice(0, 10);
const lines = [];
lines.push("# Page copy — every route, both languages");
lines.push("");
lines.push("> **Generated. Do not hand-edit.** `node scripts/copy-inventory.mjs`");
lines.push("> reads the running site and rewrites this file. To change any string");
lines.push("> below, edit its source (see [`CONTENT-SOURCES.md`](./CONTENT-SOURCES.md))");
lines.push("> and re-run the script.");
lines.push("");
lines.push(`Captured \`${stamp}\` from \`${BASE}\`.`);
lines.push("");
lines.push("Text is `textContent`, so it is the copy as authored. Several labels");
lines.push("are uppercased by CSS (`.mono-label`) and will look different on screen —");
lines.push("that is presentation, not copy.");
lines.push("");
lines.push("---");
lines.push("");

for (const [path, title, job] of ROUTES) {
  lines.push(`## ${title} — \`${path || "/"}\``);
  lines.push("");
  lines.push(`*${job}*`);
  lines.push("");

  for (const locale of LOCALES) {
    const url = `${BASE}/${locale}${path}`;
    const res = await page.goto(url, { waitUntil: "networkidle" });
    if (!res || res.status() !== 200) {
      throw new Error(`${url} returned ${res ? res.status() : "no response"} — refusing to write a deck from a page that did not render`);
    }
    const meta = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? ""
    }));
    const items = await page.evaluate(collect);
    if (items.length < 5) {
      throw new Error(`${url} yielded ${items.length} text nodes — that is a broken page, not a short one`);
    }

    lines.push(`### ${locale.toUpperCase()} — \`/${locale}${path}\``);
    lines.push("");
    lines.push(`| | |`);
    lines.push(`|---|---|`);
    lines.push(`| **Title** | ${esc(meta.title)} |`);
    lines.push(`| **Meta description** | ${esc(meta.description)} |`);
    lines.push("");
    for (let i = 0; i < items.length; i++) {
      const { tag, text } = items[i];
      if (/^h[1-4]$/.test(tag)) {
        lines.push("");
        lines.push(`**${tag.toUpperCase()} · ${text}**`);
        lines.push("");
      } else if (tag === "button") {
        lines.push(`- \`[button]\` ${text}`);
      } else if (tag === "dt" && items[i + 1] && items[i + 1].tag === "text") {
        // A term and its value are one fact; splitting them across two bullets
        // makes the deck read as if the label were copy in its own right.
        lines.push(`- **${text}** — ${items[i + 1].text}`);
        i++;
      } else {
        lines.push(`- ${text}`);
      }
    }
    lines.push("");
  }

  if (path === "/check") {
    lines.push("> **The wizard is stateful and only its first screen is captured above.**");
    lines.push("> The six questions, their options and hints, and all five verdicts with");
    lines.push("> their routes, carve-outs and Article 69 readings live in");
    lines.push("> [`src/components/check/classify.ts`](../src/components/check/classify.ts)");
    lines.push("> as bilingual objects, and are covered by `classify.test.ts`. The PDF");
    lines.push("> wording is in [`src/lib/report-pdf.tsx`](../src/lib/report-pdf.tsx).");
    lines.push("");
  }

  lines.push("---");
  lines.push("");
}

// Chrome is identical on every route, so it is recorded once rather than eight times.
lines.push("## Site chrome (header, footer, skip link)");
lines.push("");
for (const locale of LOCALES) {
  await page.goto(`${BASE}/${locale}`, { waitUntil: "networkidle" });
  const chrome = await page.evaluate(() => {
    // Same leaf-most rule as collect(): a footer link wrapping a <p> would
    // otherwise be recorded twice, once joined and once split.
    const grab = (root) => {
      if (!root) return [];
      const SEL = "a,button,p,li,h2,h3";
      const all = [...root.querySelectorAll(SEL)];
      return all
        .filter((e) => ![...e.querySelectorAll(SEL)].length)
        .map((e) => (e.textContent ?? "").replace(/\s+/g, " ").trim())
        .filter(Boolean);
    };
    return {
      header: grab(document.querySelector("header")),
      footer: grab(document.querySelector("footer"))
    };
  });
  lines.push(`### ${locale.toUpperCase()}`);
  lines.push("");
  lines.push("**Header**");
  lines.push("");
  for (const t of [...new Set(chrome.header)]) lines.push(`- ${t}`);
  lines.push("");
  lines.push("**Footer**");
  lines.push("");
  for (const t of [...new Set(chrome.footer)]) lines.push(`- ${t}`);
  lines.push("");
}

await browser.close();
writeFileSync(OUT, lines.join("\n"));
console.log(`Wrote ${OUT} — ${ROUTES.length} routes x ${LOCALES.length} locales, ${lines.length} lines.`);
