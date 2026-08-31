/**
 * The gate for the new site.
 *
 * Carried over from the previous application's harness, because each of these
 * checks was written the day a real defect got past everything else:
 *
 *   contrast   41 failures on one page, from a single hard-coded #e8700a, and
 *              the token rule exists precisely to prevent it
 *   ghosted    the homepage h1 and all four proof rows shipped at opacity 0,
 *              invisible until hydration, on the page whose whole job is the
 *              first four seconds
 *   overflow   11 of 11 Dutch pages scrolled sideways at 834px while 0 of 11
 *              English pages did — nobody had looked at the other locale
 *   h1         a page rendered ZERO h1s while a unit test of a helper stayed
 *              green
 *   links      ~80 retired links across the site, five of which 301'd back to
 *              the page the reader was already on
 *
 * Two things this harness knows that a naive one does not:
 *
 *   1. Contrast is composited. Walking up for the first ancestor with a
 *      background gives false readings when anything in between is
 *      semi-transparent. We composite alpha down the stack.
 *   2. It DOES see pseudo-elements, as of 2026-08-07. ::before, ::after and
 *      ::placeholder are invisible to getComputedStyle(el) and hid two real AA
 *      failures once; they are now collected and contrast-checked like any
 *      other text. What remains uncovered: focus-visible indicators, and
 *      anything a screen reader announces.
 *
 * Usage:  node scripts/measure.mjs [route ...]
 *         MEASURE_BASE=http://localhost:3100 node scripts/measure.mjs
 */
import { chromium } from "playwright";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.SITE_BASE ?? process.env.MEASURE_BASE ?? "http://localhost:3100";

/**
 * ROUTES ARE DISCOVERED FROM THE FILESYSTEM, NOT HAND-LISTED — a defect fix,
 * not a tidy-up.
 *
 * This file used to carry a hardcoded list of 12 locale-free routes naming no
 * /industries/* route at all. The seven pages built on the 8-pattern design
 * system — the entire body of work this harness exists to grade — were measured
 * only when a human remembered to pass them as argv. `npm run verify` never did.
 *
 * The cost is on the record below: the orphaned-narrow-text rule was made
 * executable precisely because a written rule had already failed twice, and it
 * then recurred a THIRD time on a page the default run never visited. A gate you
 * have to remember to aim is not a gate.
 *
 * Hand-maintained lists also rot silently — the spec repo's own `site-tree.md`
 * was 17 routes stale when this was written. Discovery cannot drift, because the
 * routes ARE the filesystem.
 *
 * Dynamic segments are excluded: a `[slug]` path has no renderable URL without a
 * real param, and this harness refuses to grade a page that did not render, so
 * including them would fail the run for a reason unrelated to page quality. Pass
 * concrete URLs as argv to grade those.
 */
function discoverRoutes(dir = "src/app/[locale]", prefix = "") {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === "page.tsx") found.push(prefix || "/");
    if (!entry.isDirectory()) continue;
    // Dynamic segments, route groups and private folders are not gradeable URLs.
    if (/^[[(_]/.test(entry.name)) continue;
    found.push(...discoverRoutes(join(dir, entry.name), `${prefix}/${entry.name}`));
  }
  return found;
}
/* BOTH LOCALES, ALWAYS. The old default list was locale-free, so every route
   redirected to /en and Dutch was never measured — even though this harness's
   own founding incident (see the overflow note above) was 11 of 11 Dutch pages
   scrolling sideways at 834px while 0 of 11 English pages did, because nobody
   had looked at the other locale. It had regressed into exactly the blind spot
   it was written to close. */
const LOCALES = ["en", "nl"];
const ROUTES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : LOCALES.flatMap((locale) =>
      discoverRoutes().sort().map((route) => (route === "/" ? `/${locale}` : `/${locale}${route}`))
    );
// The 4-width version of this list (390/834/1440/2560, kept as a device-size
// sanity check) left an unmonitored 606px gap between 834 and 1440 — real
// incident, 2026-08-25: site-header.tsx's own `lg:` (1024px) breakpoint
// overflowed the WHOLE DOCUMENT by 232px at 1024px and 104px at 1152px (the
// desktop nav switching on before it actually had room), invisible to this
// harness because neither width was ever tested, and only caught by the
// owner's own screenshot. 1024/1152/1280/1536 are Tailwind's own
// lg/(lg+128)/xl/2xl breakpoints — the exact widths a Tailwind-authored
// header or grid is most likely to break AT or just past, which arbitrary
// device-simulation widths do not reliably land on.
const VIEWPORTS = [
  [390, 844], [834, 1112], [1024, 900], [1152, 900], [1280, 900],
  [1440, 900], [1536, 900], [2560, 1440]
];

const srgb = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]) => 0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255);
const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);

// Scoring, factored out because the interactive pass below grades the same
// shapes on the same thresholds — one definition, so a state behind a tab can
// never be graded more leniently than the state in front of it.
const textFails = (nodes) => nodes
  .map((n) => {
    const fg = n.a >= 0.999 ? n.fg : n.fg.map((c, i) => c * n.a + n.bg[i] * (1 - n.a));
    const large = n.size >= 24 || (n.size >= 18.66 && n.weight >= 700);
    return { r: +ratio(fg, n.bg).toFixed(2), need: large ? 3 : 4.5, text: n.text };
  })
  .filter((x) => x.r < x.need)
  .sort((a, b) => a.r - b.r);
// 1.4.11: a shape passes if EITHER its fill or its stroke clears 3:1.
const gfxFails = (graphics) => graphics
  .map((g) => ({ r: +Math.max(...g.paints.map((p) => ratio(p.rgb, g.bg))).toFixed(2), what: g.what }))
  .filter((x) => x.r < 3)
  .sort((a, b) => a.r - b.r);

// Runs in the page. This is a REAL FUNCTION, not a template-literal string.
// It used to be a string, and inside a template literal  \d  collapses to  d :
// the number regex below silently became  /-?[d.]+/g , matched nothing in
// "rgb(244, 244, 246)", and parse() returned null for 54 of 58 text nodes.
// The harness reported "0 contrast failures" while measuring 4 nodes.
// Passing a function removes the whole escaping hazard. Do not re-stringify it.
const collect = (rootSels) => {
  // Resolve ANY CSS colour to sRGB by making the browser do it.
  //
  // Tailwind 4 emits oklab() for every opacity-modified colour: text-foreground/90
  // computes to "oklab(0.934228 -0.000711262 -0.00784212 / 0.9)". Scraping numbers
  // out of that and treating them as RGB is nonsense — and it is nonsense that
  // LOOKS like a contrast failure. This harness reported 1.33:1 on a perfectly
  // legible heading before this fix. A gate that invents failures gets ignored,
  // which is worse than having no gate at all.
  //
  // canvas fillStyle does NOT normalise every format. Chrome hands oklab() and
  // oklch() straight back verbatim — measured 2026-08-07:
  //     fillStyle = "oklch(0.7 0.1 30)"  ->  "oklch(0.7 0.1 30)"
  //     fillStyle = "hsl(28 90% 55%)"    ->  "#f48525"
  // Scraping numbers out of an oklab string and calling them RGB reads
  // "oklab(0.968 -0.0001 -0.0019 / 0.9)" as near-black on a light heading.
  // So anything not already rgb()/#hex gets PAINTED and read back: a 1x1
  // pixel is sRGB by definition, whatever colour space wrote it.
  const _cv = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const parse = (s) => {
    if (!s || s === "transparent" || s === "none") return null;
    if (s.slice(0, 3) === "rgb") {
      const m = s.match(/-?[\d.]+/g);
      if (!m) return null;
      const [r, g, b, a] = m.map(Number);
      return { rgb: [r, g, b], a: a === undefined ? 1 : a };
    }
    if (s[0] === "#") {
      const h = s.slice(1);
      const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
      return { rgb: [parseInt(f.slice(0,2),16), parseInt(f.slice(2,4),16), parseInt(f.slice(4,6),16)], a: 1 };
    }
    try {
      _cv.clearRect(0, 0, 1, 1);
      _cv.fillStyle = "#000";
      _cv.fillStyle = s;
      if (_cv.fillStyle === "#000" && s !== "#000" && s !== "black") return null; // engine rejected it
      _cv.fillRect(0, 0, 1, 1);
      const d = _cv.getImageData(0, 0, 1, 1).data;
      return { rgb: [d[0], d[1], d[2]], a: d[3] / 255 };
    } catch (e) { return null; }
  };
  // Composite the element's own background down through its ancestors, so a
  // translucent panel over a tinted section reads as what the eye actually sees.
  const backdrop = (el) => {
    let acc = null;
    for (let n = el; n; n = n.parentElement) {
      const bg = parse(getComputedStyle(n).backgroundColor);
      if (!bg || bg.a === 0) continue;
      acc = acc === null ? { rgb: bg.rgb, a: bg.a } : acc;
      if (bg.a >= 0.999) {
        return acc.a >= 0.999 ? acc.rgb : acc.rgb.map((c, i) => c * acc.a + bg.rgb[i] * (1 - acc.a));
      }
    }
    const body = parse(getComputedStyle(document.body).backgroundColor) || { rgb: [255,255,255], a: 1 };
    if (!acc) return body.rgb;
    return acc.rgb.map((c, i) => c * acc.a + body.rgb[i] * (1 - acc.a));
  };
  const out = { nodes: [], graphics: [], figures: 0, ghosted: [], h1: 0, links: [], asks: 0, pseudoCount: 0, exempt: 0 };

  // TWO SCOPES, AND THE DIFFERENCE IS DELIBERATE.
  //
  // `main` is the right unit for editorial questions: how many h1s does the
  // PAGE have, how many asks does the PAGE make, where does it link. Counting
  // the header CTA as a page ask would make every route look like it asks
  // twice as often as it does.
  //
  // `scope` — the whole body — is the right unit for anything a reader can
  // SEE. Until 2026-08-07 every query here ran against `main`, so the site
  // header, the header CTA, the theme and language toggles and the entire
  // footer were never contrast-checked, never ghost-checked and never
  // pseudo-checked on any of the 14 routes. That is ~40% of the rendered page.
  // A real AA failure was living there the whole time — the footer tagline's
  // orange X at 2.44:1 — and two independent reviewers found it on the same
  // day by measuring what this harness would not. Reporting
  // "0 contrast fails both themes" while looking at part of the page is the
  // same failure as the parser bug: a number that sounds like coverage.
  // TWO SCOPES BECAME THREE, and the third is opt-in.
  //
  // `rootSels` is null for every pass that existed before 2026-08-29, and when
  // it is null this function behaves EXACTLY as it did: `qsa` unions over the
  // single root `document.body`, which is `document.body.querySelectorAll`.
  // The whole-body decision below is not weakened by scoping — it is reused.
  //
  // A non-null `rootSels` is the INTERACTIVE pass: after a tab/radio/disclosure
  // has been operated, only the sections that control governs are re-measured.
  // Re-measuring the whole body per state would (a) re-report the same header
  // and footer nodes once per state, drowning a real finding in N copies of an
  // old one, and (b) ghost-flag reveal-animated content elsewhere on the page
  // that this state never scrolled past. Both are "a gate that invents
  // failures", which this file already learned is worse than no gate.
  //
  // A root that contains another root is dropped, so overlapping scopes cannot
  // count the same node twice. `matches` is checked as well as
  // `querySelectorAll` so a root that IS the sought element (a scope that is
  // itself the [data-gfx-meaning] figure) is not missed by a descendant-only
  // selector.
  const rawRoots = rootSels && rootSels.length
    ? rootSels.map((s) => document.querySelector(s)).filter(Boolean)
    : [document.body];
  const roots = rawRoots.filter((r, i) => !rawRoots.some((o, j) => j !== i && o.contains(r) && o !== r));
  const qsa = (sel) => roots.flatMap((r) => [
    ...(r.matches(sel) ? [r] : []),
    ...r.querySelectorAll(sel)
  ]);

  const main = document.querySelector("main") || document.body;

  out.h1 = main.querySelectorAll("h1").length;
  for (const a of main.querySelectorAll("a[href]")) out.links.push(a.getAttribute("href"));
  for (const el of main.querySelectorAll("a,button")) {
    const r = el.getBoundingClientRect();
    if (r.height >= 36 && r.width >= 90) out.asks++;
  }

  // Documented exemptions only, and they are COUNTED so they stay visible.
  // A silent skip list is how a gate quietly stops covering things.
  const exempt = (el) => {
    for (let n = el; n; n = n.parentElement) {
      if (n.hasAttribute && n.hasAttribute("data-contrast-exempt")) return true;
    }
    return false;
  };

  for (const el of qsa("*")) {
    const cs = getComputedStyle(el);
    const o = parseFloat(cs.opacity);
    const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
    const r = el.getBoundingClientRect();
    if (o < 0.9 && cs.visibility !== "hidden" && cs.display !== "none" &&
        txt.length > 12 && r.width > 40 && r.height > 20) {
      out.ghosted.push({ o, t: txt.slice(0, 46) });
    }
    const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!direct || r.width === 0) continue;
    // Skip visually-hidden text. .sr-only hides by CLIPPING to a 1px box, not
    // by display:none or visibility:hidden, so a naive checker sees a real text
    // node with a real rect and reports a contrast failure on content no eye
    // will ever meet. First run of this harness produced exactly two such false
    // positives — 1.33:1 and 1.76:1 — on correct components, and acting on them
    // would have damaged accessible markup to satisfy a measurement error.
    if (r.width <= 4 || r.height <= 4) continue;
    if (cs.clipPath && cs.clipPath.replace(/ /g, "").includes("inset(50%")) continue;
    if (cs.clip && cs.clip.replace(/ /g, "").startsWith("rect(0")) continue;
    if (exempt(el)) { out.exempt++; continue; }
    // SVG <text> PAINTS WITH `fill`, NOT `color`. getComputedStyle(el).color is
    // a real, separately-inherited CSS property on SVG text nodes, but it is
    // not what the browser renders — `fill` is, and `fill: currentColor`
    // already resolves to the actual paint colour by the time getComputedStyle
    // returns it, so preferring `fill` here is correct whether or not the
    // element uses currentColor. Without this, a <text fill="var(--primary)">
    // sitting under an ancestor that sets `color` for an unrelated stroke
    // (e.g. `text-border` on the enclosing <svg>, for connecting lines drawn
    // with `stroke="currentColor"`) gets checked against a colour nobody
    // painted — the same class of false positive documented above for
    // .sr-only, just one CSS property over. Found via three industry pages
    // this session reporting a "1.25:1" failure on visibly high-contrast
    // orange/foreground SVG text confirmed correct by direct screenshot.
    const isSvgText = el instanceof SVGElement && cs.fill && cs.fill !== "none";
    const fg = parse(isSvgText ? cs.fill : cs.color);
    if (!fg || fg.a === 0) continue;
    out.nodes.push({
      fg: fg.rgb, a: fg.a, bg: backdrop(el),
      size: parseFloat(cs.fontSize), weight: Number(cs.fontWeight) || 400,
      text: (el.textContent || "").trim().slice(0, 40)
    });
  }
  // ── PSEUDO-ELEMENTS ────────────────────────────────────────────────────
  // The documented blind spot. ::before/::after/::placeholder are invisible to
  // getComputedStyle(el) and to every check above, and two real AA failures hid
  // there once. They are not decorative: the ARIA guidance's own worked example
  // is  .error-message::before { content: "Error: " }  — a pseudo-element
  // carrying the word that makes an error an error.
  //
  // A generated box counts only when it actually paints text: 'content' must
  // resolve to a non-empty string, and the classic  content: ""  spacer or icon
  // has nothing to contrast.
  const paintsText = (c) => c && c !== "none" && c !== "normal" && c !== '""' && c !== "''";
  for (const el of qsa("*")) {
    const r = el.getBoundingClientRect();
    if (r.width <= 4 || r.height <= 4) continue;
    for (const sel of ["::before", "::after"]) {
      const ps = getComputedStyle(el, sel);
      if (!paintsText(ps.content)) continue;
      if (ps.visibility === "hidden" || ps.display === "none") continue;
      if (parseFloat(ps.opacity) === 0) continue;
      const fg = parse(ps.color);
      if (!fg || fg.a === 0) continue;
      // A pseudo-element's own background wins; otherwise it sits on its host's.
      const own = parse(ps.backgroundColor);
      const bg = own && own.a >= 0.999 ? own.rgb : backdrop(el);
      out.nodes.push({
        fg: fg.rgb, a: fg.a, bg,
        size: parseFloat(ps.fontSize), weight: Number(ps.fontWeight) || 400,
        text: sel + " " + ps.content.slice(0, 30),
        pseudo: true
      });
      out.pseudoCount++;
    }
  }
  for (const el of qsa("input, textarea")) {
    const r = el.getBoundingClientRect();
    if (r.width <= 4 || r.height <= 4) continue;
    const ps = getComputedStyle(el, "::placeholder");
    const fg = parse(ps.color);
    if (!fg || fg.a === 0) continue;
    out.nodes.push({
      fg: fg.rgb, a: fg.a, bg: backdrop(el),
      size: parseFloat(ps.fontSize) || parseFloat(getComputedStyle(el).fontSize),
      weight: Number(ps.fontWeight) || 400,
      text: "::placeholder " + (el.getAttribute("placeholder") || "").slice(0, 24),
      pseudo: true
    });
    out.pseudoCount++;
  }

  // ── NON-TEXT CONTRAST · WCAG 1.4.11 ─────────────────────────────────────
  //
  // Text was the only thing this harness ever measured, and the site's
  // arguments are increasingly carried by GRAPHICS: the five-date timeline
  // makes its point with bar lengths before a word is read. A reviewer
  // measured three of its bars below 3:1 in light theme — including the
  // Article 14 bar, the single most consequential mark in the figure — while
  // the gate reported the route clean, because a <rect> has no colour the
  // text pass can see.
  //
  // 1.4.11 asks for 3:1 against what is adjacent. We use the composited
  // backdrop, which is the honest approximation: these bars sit on a card,
  // not on each other. Both fill and stroke count — a shape can carry its
  // contrast in either — so a bar passes if EITHER clears 3:1.
  //
  // OPT-IN, BECAUSE THE CRITERION IS OPT-IN. 1.4.11 covers graphics "required
  // to understand the content" and explicitly exempts decoration. A checker
  // cannot tell the two apart: run over every <svg> on this site and it
  // returns 43 failures on /company alone, all of them faint dividers and
  // background rules that are meant to be faint. A gate that invents failures
  // gets ignored, which is worse than having no gate — this file already
  // learned that once, from an oklab parser that reported 1.33:1 on a legible
  // heading.
  //
  // So a figure declares itself: `data-gfx-meaning` on the <svg> means "this
  // shape carries the argument". The count of MARKED figures is reported, so
  // an unmarked meaning-bearing figure shows up as missing coverage rather
  // than as silent success.
  out.figures = qsa("[data-gfx-meaning]").length;
  for (const el of qsa("[data-gfx-meaning] rect, [data-gfx-meaning] circle, [data-gfx-meaning] ellipse, [data-gfx-meaning] line, [data-gfx-meaning] path, [data-gfx-meaning] polyline, [data-gfx-meaning] polygon")) {
    const r = el.getBoundingClientRect();
    if (r.width <= 2 || r.height <= 2) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    if (exempt(el)) { out.exempt++; continue; }

    // Element opacity multiplies whatever the paint's own alpha already is.
    const elOpacity = parseFloat(cs.opacity);
    if (!(elOpacity > 0)) continue;
    const bg = backdrop(el);

    const paints = [];
    const fill = parse(cs.fill);
    if (fill && fill.a > 0) {
      const a = fill.a * elOpacity * (parseFloat(cs.fillOpacity) || 1);
      if (a > 0.05) paints.push({ rgb: fill.rgb, a, kind: "fill" });
    }
    const stroke = parse(cs.stroke);
    const sw = parseFloat(cs.strokeWidth);
    if (stroke && stroke.a > 0 && sw > 0) {
      const a = stroke.a * elOpacity * (parseFloat(cs.strokeOpacity) || 1);
      if (a > 0.05) paints.push({ rgb: stroke.rgb, a, kind: "stroke" });
    }
    if (!paints.length) continue;

    out.graphics.push({
      paints: paints.map((p) => ({
        rgb: p.a >= 0.999 ? p.rgb : p.rgb.map((c, i) => c * p.a + bg[i] * (1 - p.a)),
        kind: p.kind
      })),
      bg,
      // Enough to find it again: the tag, and the nearest labelled ancestor.
      what: el.tagName + (el.getAttribute("class") ? "." + el.getAttribute("class").split(" ")[0] : "")
    });
  }

  return out;
};

// ── SIBLING BALANCE ─────────────────────────────────────────────────────
//
// The defect this exists for: a two-pane row whose short pane relates to
// nothing, and a bento hero cell that measured TALLEST in its group while
// rendering almost nothing — because in a CSS grid a cell's height comes from
// the rows it spans, not from what is inside it. Height alone would have
// passed that. So BOTH measures are taken and the WORSE one governs.
//
// Groups opt in with `data-balance-group="<name>"`, and the mark belongs on
// the INNER CONTENT WRAPPER, never on the stretched grid cell: a row that is
// `items-stretch` makes its children equal by construction, so measuring the
// cells would let a stretched empty box pass. Content elements inside a group
// opt in with `data-balance-item`; where a group marks none, the harness falls
// back to counting elements that directly contain text.
//
// THRESHOLDS ARE PER GROUP, taken from the rule that governs that group, never
// one flat number. A flat ~50% gate would pass a Consequence Cascade hero row
// at 55% that Pattern 1 explicitly fails.
const BALANCE_MIN = {
  "hero-panes": 0.67 // OXOT_Layout_Styles.md Pattern 1: shorter pane >= 67%
};
const BALANCE_DEFAULT = 0.5; // site-wide 2x floor
// Desktop only. Below `lg` the panes stop being siblings and the ratio does
// not apply.
const BALANCE_VIEWPORTS = [
  [1440, 900],
  [2560, 1440]
];

const collectBalance = () => {
  const groups = {};
  for (const el of document.querySelectorAll("[data-balance-group]")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    // Absolutely-positioned children are out of flow: their height says
    // nothing about the group's layout.
    if (cs.position === "absolute" || cs.position === "fixed") continue;
    const r = el.getBoundingClientRect();
    if (r.height <= 0 || r.width <= 0) continue;

    let n = el.querySelectorAll("[data-balance-item]").length;
    if (el.hasAttribute("data-balance-item")) n += 1;
    if (!n) {
      n = [...el.querySelectorAll("*")].filter((node) => {
        const nr = node.getBoundingClientRect();
        if (nr.width <= 0 || nr.height <= 0) return false;
        return [...node.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim().length > 0);
      }).length;
    }

    const name = el.getAttribute("data-balance-group");
    (groups[name] ||= []).push({ h: Math.round(r.height), n });
  }
  return groups;
};

// ── ORPHANED NARROW TEXT ─────────────────────────────────────────────────
//
// The defect this exists for: a real reading-width class (`.prose-measure`,
// or a hardcoded `max-w-*`) applied to a text block that sits ALONE in an
// otherwise full-width section, with nothing beside it to fill the remaining
// space. Found twice, independently, on two separately-built pages
// (water-wastewater-2 and -3) on 2026-08-25 — the SAME mistake, made by
// different builder agents in different builds, because the visual defect it
// produces (a narrow column of text with a wide dead strip beside it) does
// not trip any OTHER check here: it is not overflow (content is narrower
// than its container, not wider), and it is not a balance-group failure
// (there may be nothing else in the row to compare it to). A WRITTEN floor
// rule alone did not stop the same defect recurring once the rule was
// already on the books, so this is now measured, not just documented.
//
// THE REAL SIGNAL: a text block is legitimately narrow when something else
// occupies the rest of its row — a genuine multi-column grid sibling
// structure. It is NOT legitimately narrow just because the underlying text
// is short: a one-sentence closing note and a five-sentence narrative both
// produce the same dead-space defect if nothing sits beside them. So this
// checks real computed `grid-template-columns` track counts, not className
// pattern-matching (fragile against arbitrary Tailwind class ordering) and
// not text length (a long paragraph in a lone column is just as wrong as a
// short one).
//
// OPT-OUT, NOT OPT-IN, deliberately: unlike balance groups (which need a
// human to state what belongs in a group), whether a block sits in a real
// multi-column context is mechanically checkable from the DOM — so this runs
// over every text block by default, and a genuine editorial choice (e.g. a
// pull-quote/citation deliberately styled narrower) opts OUT with
// `data-narrow-ok`, the same convention as `data-contrast-exempt`.
const collectNarrowText = () => {
  const out = [];
  // DESCENDANT, not `main > div[id]` (fixed 2026-08-25): every route wraps
  // its sections in `<div className="oxot-canvas pb-20">` in page.tsx, so an
  // id'd section container sits at LEAST two levels under <main>, never one.
  // The child combinator silently skipped every id'd container that wasn't a
  // direct child — real incident: AssetClassBento's own `<section>` root has
  // no id of its own (its id lives on the HOST file's wrapping
  // `<div id="asset-classes">`, itself nested under main > .page-enter >
  // .oxot-canvas), so this whole section was invisible to the check and a
  // real max-w-xl/max-w-2xl narrow-heading bug in the SHARED
  // twin/AssetClassBento.tsx component shipped past it undetected. Filtering
  // to only the OUTERMOST match afterward avoids measuring the same text
  // twice against two nested width baselines (a section[id] can itself
  // contain a further-nested div[id], e.g. an anchor target).
  const candidates = [...document.querySelectorAll("main section[id], main div[id]")]
    .filter((c) => c.getBoundingClientRect().width >= 200);
  const outermost = candidates.filter((c) => !candidates.some((other) => other !== c && other.contains(c)));
  for (const section of outermost) {
    const sRect = section.getBoundingClientRect();
    for (const el of section.querySelectorAll("p, h2, h3")) {
      const r = el.getBoundingClientRect();
      if (r.width < 10 || r.height < 5) continue;
      // An inline-level element (a pill/badge/chip) never stretches to fill
      // its row by default — it sizes to its own content, so being narrower
      // than the section is structural, not a reading-width-cap defect. Found
      // live: water-wastewater-2's `<p class="mono-label inline-flex
      // rounded-full ...">` claim-boundary badge measured at 25% width and
      // has never had prose-measure or any width cap on it — a real false
      // positive the block-level assumption behind this whole check missed.
      const ownDisplay = getComputedStyle(el).display;
      if (ownDisplay.startsWith("inline")) continue;
      const text = (el.textContent || "").trim();
      if (text.length < 15) continue; // labels/data, not prose
      let n = el.parentElement, insideColumn = false, exempt = false, depth = 0;
      while (n && n !== section && depth < 6) {
        if (n.hasAttribute && n.hasAttribute("data-narrow-ok")) { exempt = true; break; }
        const cs = getComputedStyle(n);
        if (cs.display === "grid") {
          const cols = cs.gridTemplateColumns.split(" ").filter(Boolean);
          if (cols.length >= 2) { insideColumn = true; break; }
        }
        if (cs.display === "flex" && cs.flexDirection.startsWith("row")) {
          // `n` here IS the flex container (mirrors the grid branch above,
          // which also checks the container's own tracks) — so this checks
          // N'S OWN CHILDREN, not n's siblings. A real multi-column split
          // needs 2+ of those children each rendering with nontrivial width:
          // a rail-plus-content layout (e.g. a `max-w-[19rem]` rail beside a
          // `flex-1 min-w-0` content pane) legitimately narrows the content
          // side to whatever the rail leaves over, and that's still a real
          // column even though the content side's own `flex-basis` reads
          // "0%" (Tailwind's `flex-1`) rather than a literal width. An
          // earlier version of this check required a non-"0%" flex-basis on
          // the text's own branch specifically to rule that out — which
          // instead ruled out the single most common sidebar-plus-content
          // pattern on the site (Engagement's own vertical rail on both
          // water-wastewater-2 and -3), flagging an already-audited,
          // already-correct layout as a false positive. Found live via
          // getBoundingClientRect() on /industries/water-wastewater-3's
          // Engagement panel: flex-basis 0%, flex-grow 1, width 61% of its
          // section — narrower because a real ~300px rail sibling sits next
          // to it, not because of any reading-width cap.
          const kids = [...n.children].filter((c) => c.nodeType === 1 && getComputedStyle(c).display !== "none");
          const real = kids.filter((c) => c.getBoundingClientRect().width > 40);
          if (real.length >= 2) { insideColumn = true; break; }
        }
        n = n.parentElement; depth++;
      }
      if (insideColumn || exempt) continue;
      const ratio = r.width / sRect.width;
      if (ratio < 0.75) {
        out.push({ section: section.id || "(unnamed)", tag: el.tagName, ratio: +ratio.toFixed(2), text: text.slice(0, 50) });
      }
    }
  }
  return out;
};

// ── INTERACTIVE STATES ───────────────────────────────────────────────────
//
// THE HOLE THIS CLOSES. Everything above measures each route in its DEFAULT
// PRE-INTERACTION STATE. Anything behind a tab, a selector, an accordion or a
// disclosure is never in the DOM when `collect` runs, so it is never
// contrast-checked, never overflow-checked and never watched for console
// errors — and the run still prints "clears every gate".
//
// Found concretely on 2026-08-29: /industries/water-wastewater-3 S02 has a
// 4-view x 2-system selector, and a Purdue diagram was added to its OT view,
// which is not the default. This harness reported "2/2 routes clear every
// gate" having never rendered the diagram at all — it saw 10 marked figures
// where the page has 11 — and the agent that built it had to hand-run an
// overflow sweep at 8 widths x 2 locales x 2 systems to cover what the gate
// missed. A gate that reports "clear" on content it did not look at is worse
// than no gate, because it is trusted.
//
// DISCOVERY IS GENERIC, NEVER AN ALLOWLIST. A hand-maintained "also click
// this" list goes stale the first time someone adds a tab — which is the same
// failure class as the bug, and the same lesson `discoverRoutes` above already
// learned from a hardcoded 12-route list that named no /industries route at
// all. Controls are found by ROLE AND SEMANTICS, which is what makes them
// controls: [role=tablist]/[role=tab], [role=radiogroup]/[role=radio], native
// <input type="radio"> grouped by `name`, <select>, sibling [aria-pressed]
// toggles, <details>, and [aria-expanded] buttons. That set is the ARIA
// authoring-practices vocabulary plus the two native equivalents, so a
// shadcn/Radix Tabs, a hand-rolled <fieldset> of radios and a plain
// aria-expanded button are all found by the same rules, on a page written
// after this file was.
//
// BOUNDED, AND HERE IS THE REASONING. The full product is unaffordable:
// water-wastewater-3 alone is 4 views x 2 systems x 8 widths x 2 themes x 2
// locales = 256 renders for ONE section. So:
//
//   · Coverage target is EACH-CHOICE (1-wise), not all-combinations: every
//     option of every control is rendered at least once.
//   · The LOCKSTEP sweep delivers that in max(options) states, not sum(options):
//     state k puts every group on its k-th option, clamped to its last, so a
//     group of L options has been through all of them by the time k reaches
//     L-1. On water-wastewater-3 that is 7 states covering 27 options across 6
//     groups; one-at-a-time would be 21 and the product would be 640.
//   · A SOLO sweep then adds one state per group — that group moved, everything
//     else left at its default — because lockstep only ever pairs option k with
//     option k, and a panel reachable only as (default system, non-default
//     view) would otherwise never appear. It happens to complete all 8
//     view x system pairs on S02, but the GUARANTEE this file makes is the
//     1-wise one, and the pairs it does not reach are in STILL NOT COVERED.
//   · Independent disclosures (<details>, aria-expanded) are not exclusive, so
//     they cost ONE state between them: all of them open at once. Popup
//     triggers ([aria-haspopup]) are excluded — they portal their panel to
//     <body>, outside every scope measured here, and the modal ones lock scroll
//     and pointer events for every state that follows.
//   · Paint checks (contrast, 1.4.11, ghosting, console) run at 1440x900 in
//     BOTH THEMES. One theme would be the same blind spot as the locale-free
//     route list this file already had: contrast is theme-dependent, and a
//     diagram legible in dark can fail in light.
//   · Overflow runs at the NARROW widths only (390/834/1024) and in one theme,
//     because overflow is layout and not paint — the same reasoning
//     `collectNarrowText` is already measured on one pass for. Those are the
//     widths where the concrete incident lived.
//   · NO EXTRA PAGE LOADS. The states are driven inside the theme pass and the
//     viewport pass that already navigated, so the added cost is state changes
//     and settling, not navigation.
//
// DETERMINISM. Nothing here sleeps and hopes. After each change the harness
// waits for the DOM to stop mutating (MutationObserver quiescence, hard-capped),
// finishes every non-infinite running animation outright rather than waiting one
// out, keeps sampling the opacities the ghost check reads until two consecutive
// samples agree, and only then ASSERTS that the control reports the state it was
// asked for. A state that did not take is recorded as unexercised, never
// silently counted as covered — and that assertion has already earned its keep
// three times over: el.click() moves nothing on a Radix tab, an nth-child path
// recorded before a disclosure opens resolves to nothing after, and pressing an
// [aria-pressed] chip that is already on turns it off. All three would have been
// silent passes on content that never rendered.
const MAX_INTERACTIVE_STATES = 16;
const INTERACTIVE_OVERFLOW_WIDTHS = new Set([390, 834, 1024]);

/** Runs in the page. Returns the control groups on it, in document order. */
const discoverControls = () => {
  // A NAME ON THE NODE, NOT A PATH TO IT — and this was a real defect, not a
  // preference. The first version addressed controls by an nth-child path
  // recorded at discovery. Opening one disclosure inserts a panel, every later
  // sibling shifts by one, and all six of a route's disclosure paths resolved to
  // nothing by the time the harness read them back: the run reported
  // "0/6 reported active" on a widget that works. A path describes where an
  // element WAS; an attribute travels with the element.
  //
  // The attribute is inert — no CSS rule matches it, it changes no layout, and
  // React does not strip attributes it did not set on an element it is
  // re-rendering. If the node is genuinely unmounted the tag goes with it, which
  // is the honest answer: that control really is gone, and the state that needed
  // it is reported unexercised rather than passing on absence.
  let tagSeq = 0;
  const handle = (el) => {
    if (!el.hasAttribute("data-measure-ctl")) el.setAttribute("data-measure-ctl", `c${tagSeq++}`);
    return `[data-measure-ctl="${el.getAttribute("data-measure-ctl")}"]`;
  };
  // An sr-only radio is a 1px clipped box and still a real control — the label
  // beside it is what the reader sees. So "rendered at all" is the test here,
  // not "big enough to click".
  const shown = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const label = (el) => {
    const t = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim();
    if (t) return t.slice(0, 28);
    // An sr-only input carries no text of its own; its <label> wrapper does.
    const lab = el.closest("label");
    const lt = lab ? (lab.textContent || "").replace(/\s+/g, " ").trim() : "";
    return (lt || el.getAttribute("value") || el.id || el.tagName.toLowerCase()).slice(0, 28);
  };

  const claimed = new Set();
  const groups = [];
  const addGroup = (kind, name, els, activeIndex) => {
    const options = els.map((el) => ({ sel: handle(el), label: label(el) })).filter((o) => o.sel);
    if (options.length < 2 && kind !== "disclosure") return null;
    els.forEach((el) => claimed.add(el));
    const g = { kind, name: name.slice(0, 24), options, active: activeIndex };
    groups.push(g);
    return g;
  };

  // A) ARIA composite widgets. Nested composites are not stolen from: a tab's
  //    own panel may hold a second tablist, and that is its own group.
  for (const [container, optSel, activeAttr] of [
    ['[role="tablist"]', '[role="tab"]', "aria-selected"],
    ['[role="radiogroup"]', '[role="radio"]', "aria-checked"]
  ]) {
    for (const box of document.querySelectorAll(container)) {
      if (!shown(box)) continue;
      const opts = [...box.querySelectorAll(optSel)]
        .filter((o) => o.closest(container) === box && shown(o) && !claimed.has(o) && !o.hasAttribute("disabled"));
      const active = opts.findIndex((o) => o.getAttribute(activeAttr) === "true");
      addGroup(container.includes("tablist") ? "tabs" : "radiogroup", label(box.firstElementChild || box), opts, active < 0 ? 0 : active);
    }
  }

  // B) NATIVE RADIOS, grouped by `name` the way the browser groups them. This
  //    is the shape the concrete incident used: a <fieldset> of
  //    <input type="radio" class="sr-only"> inside <label>s, which carries no
  //    ARIA role at all and would be invisible to a role-only search.
  const byName = new Map();
  for (const input of document.querySelectorAll('input[type="radio"][name]')) {
    if (claimed.has(input) || input.disabled) continue;
    const owner = input.form ? `form:${[...document.forms].indexOf(input.form)}` : "doc";
    const key = `${owner}#${input.name}`;
    if (!byName.has(key)) byName.set(key, []);
    byName.get(key).push(input);
  }
  for (const [key, inputs] of byName) {
    // The INPUT may be clipped to 1px; its <label> is what renders. Require
    // the visible half to exist, not the invisible one.
    const live = inputs.filter((i) => shown(i.closest("label") || i));
    const active = live.findIndex((i) => i.checked);
    addGroup("radio", key.split("#")[1], live, active < 0 ? 0 : active);
  }

  // C) Native <select>.
  for (const sel of document.querySelectorAll("select")) {
    if (!shown(sel) || sel.disabled) continue;
    const opts = [...sel.options].filter((o) => !o.disabled);
    if (opts.length < 2) continue;
    addGroup("select", sel.name || label(sel), opts, Math.max(0, sel.selectedIndex));
  }

  // D) [aria-pressed] toggle sets. Two or more sharing a parent behave as a
  //    filter/segmented control; a lone one is a boolean and belongs in (E).
  const pressedByParent = new Map();
  for (const b of document.querySelectorAll("[aria-pressed]")) {
    if (claimed.has(b) || !shown(b) || b.hasAttribute("disabled")) continue;
    const p = b.parentElement;
    if (!p) continue;
    if (!pressedByParent.has(p)) pressedByParent.set(p, []);
    pressedByParent.get(p).push(b);
  }
  for (const [p, btns] of pressedByParent) {
    if (btns.length < 2) continue;
    const active = btns.findIndex((b) => b.getAttribute("aria-pressed") === "true");
    const g = addGroup("pressed", label(p), btns, active < 0 ? 0 : active);
    // Remember which chips started ON, because reset has to put each of them
    // back individually — see the toggle branch of controlOp's reset.
    if (g) g.options.forEach((o, i) => { o.on = btns[i].getAttribute("aria-pressed") === "true"; });
  }

  // E) INDEPENDENT DISCLOSURES. <details>, and buttons that own an
  //    aria-expanded. These do not exclude each other, so they are one group
  //    with one interesting state — all open — rather than N states.
  const disclosures = [];
  for (const d of document.querySelectorAll("details")) {
    if (claimed.has(d) || !shown(d) || d.open) continue;
    disclosures.push(d);
  }
  for (const b of document.querySelectorAll('[aria-expanded="false"]')) {
    if (claimed.has(b) || !shown(b) || b.hasAttribute("disabled")) continue;
    // A collapsed nav/menu trigger opens an overlay over the page rather than
    // revealing page content; it is the mobile header's job, measured by
    // chrome-guards.mjs, and opening it here would blanket every route.
    if (b.closest("header, nav, [role='dialog']")) continue;
    // NOR A POPUP TRIGGER, and this is a considered exclusion rather than an
    // oversight — it is in STILL NOT COVERED. A Radix Select/Dropdown/Popover
    // renders its panel through a PORTAL at <body> level, so the content it
    // reveals lands outside every section scope this pass measures and would be
    // graded as nothing at all. Worse, Radix's modal variants lock body scroll
    // and set pointer-events:none on the page while open, which would corrupt
    // the geometry of every state measured after one — a gate inventing
    // failures, which this file already knows is worse than no gate.
    if (b.hasAttribute("aria-haspopup")) continue;
    disclosures.push(b);
  }
  if (disclosures.length) addGroup("disclosure", `${disclosures.length} disclosure`, disclosures, -1);

  return groups;
};

/**
 * Runs in the page. THE ONE PLACE that knows how to operate a control, read one
 * back, and put one back — because a reset that used a different rule from the
 * apply would leave the page in a state neither the harness nor a reader has
 * ever seen, and the assertion would agree with itself about it.
 *
 * `mode` is "apply" (activate `sels`), "read" (report `sels`), or "reset"
 * (close `close`, then re-activate `sels`).
 */
const controlOp = ({ mode, sels = [], close = [], toggles = [] }) => {
  const isActive = (el) => {
    if (el.tagName === "DETAILS") return el.open;
    if (el.tagName === "OPTION") return el.selected;
    if (el.tagName === "INPUT") return el.checked;
    for (const a of ["aria-selected", "aria-checked", "aria-pressed", "aria-expanded"]) {
      if (el.hasAttribute(a)) return el.getAttribute(a) === "true";
    }
    return null; // nothing self-reports; activating is all there is to assert
  };
  // A FULL POINTER SEQUENCE, NOT el.click(), AND THIS WAS MEASURED.
  //
  // The first version of this called el.click() and reported 8 of a route's
  // tab states as "not exercised". Radix's TabsTrigger — every shadcn Tabs on
  // this site — activates on POINTERDOWN/MOUSEDOWN, not on click, so a bare
  // click() moved nothing while the harness happily assumed it had. Dispatching
  // the sequence a real pointer produces drives Radix, a plain React onClick
  // and a native radio alike.
  //
  // Still synthetic events rather than Playwright's own click, because an
  // sr-only radio (this project's <fieldset> selectors) is clipped to a 1px box
  // and a real click is refused as not visible — yet it is a genuine control a
  // keyboard reaches, and its default activation behaviour checks it and fires
  // `change`. So: dispatch, then call click() for that default behaviour.
  const press = (el) => {
    const o = { bubbles: true, cancelable: true, composed: true, view: window, button: 0, buttons: 1 };
    try { el.dispatchEvent(new PointerEvent("pointerdown", { ...o, pointerId: 1, isPrimary: true })); } catch (e) { /* older engine */ }
    el.dispatchEvent(new MouseEvent("mousedown", o));
    if (el.focus) el.focus({ preventScroll: true });
    try { el.dispatchEvent(new PointerEvent("pointerup", { ...o, buttons: 0, pointerId: 1, isPrimary: true })); } catch (e) { /* older engine */ }
    el.dispatchEvent(new MouseEvent("mouseup", { ...o, buttons: 0 }));
    el.click();
  };
  const activate = (el) => {
    // IDEMPOTENT, AND THIS WAS A REAL DEFECT. An [aria-pressed] chip is a
    // TOGGLE: pressing one that is already on turns it OFF. The first version
    // pressed unconditionally, so a chip left on by an earlier state was
    // switched off by the state that wanted it on, which then reported itself
    // "0/1 reported active" on a widget a real click drives correctly. Asking
    // for a state a control is already in must be a no-op, not a reversal.
    if (isActive(el) === true) return;
    if (el.tagName === "DETAILS") { el.open = true; return; }
    if (el.tagName === "OPTION") {
      const box = el.closest("select");
      if (!box) return;
      // React tracks the previous value on the node and swallows a change event
      // whose value it thinks it already has; the prototype setter is the
      // documented way past that.
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value").set.call(box, el.value);
      box.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }
    press(el);
  };

  if (mode === "read") {
    return sels.map((s) => {
      const el = document.querySelector(s);
      if (!el) return false;
      const a = isActive(el);
      return a === null ? true : a;
    });
  }

  if (mode === "reset") {
    for (const s of close) {
      const el = document.querySelector(s);
      if (!el) continue;
      if (el.tagName === "DETAILS") el.open = false;
      else if (el.getAttribute("aria-expanded") === "true") press(el);
    }
    for (const s of sels) {
      const el = document.querySelector(s);
      if (el && isActive(el) !== true) activate(el);
    }
    // Toggle groups need EVERY member put back, not just the default one:
    // activating one radio deselects its siblings for free, but pressing one
    // chip leaves the others exactly as the last state left them, and that
    // residue is what makes state N depend on state N-1.
    for (const t of toggles) {
      const el = document.querySelector(t.sel);
      if (el && isActive(el) !== t.on) press(el);
    }
    return null;
  }

  const els = sels.map((s) => document.querySelector(s));
  for (const el of els) if (el) activate(el);
  return {
    missing: sels.filter((s, i) => !els[i]),
    // Scope for the re-measure: the section each operated control governs.
    // Nearest <section>, else nearest id'd box, else <main>. This is what gets
    // scrolled and re-checked, so a state's findings sit in its own section
    // instead of re-reporting the header once per state.
    // Tagged on the node for the same reason the controls are: the state about
    // to be measured is the one that just reshuffled this section's children.
    scopes: [...new Set(els.filter(Boolean).map((el) => {
      const box = el.closest("section") || el.closest("[id]") || document.querySelector("main");
      if (!box) return null;
      if (!box.hasAttribute("data-measure-scope")) {
        box.setAttribute("data-measure-scope", `s${document.querySelectorAll("[data-measure-scope]").length}`);
      }
      return `[data-measure-scope="${box.getAttribute("data-measure-scope")}"]`;
    }).filter(Boolean))]
  };
};

const revealAndSettle = async (scopes) => {
  const quiet = () => new Promise((resolve) => {
    // Wait for the DOM to STOP CHANGING rather than for a guessed duration.
    // The 1500ms is a hard cap on a pathological page, not the normal path:
    // a React commit settles in one or two frames.
    let idle, obs;
    const done = () => { clearTimeout(idle); clearTimeout(cap); obs.disconnect(); resolve(); };
    obs = new MutationObserver(() => { clearTimeout(idle); idle = setTimeout(done, 60); });
    obs.observe(document.body, { subtree: true, childList: true, attributes: true });
    idle = setTimeout(done, 60);
    const cap = setTimeout(done, 1500);
  });
  const frames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const finishAnimations = () => {
    for (const a of document.getAnimations()) {
      try {
        const t = a.effect && a.effect.getComputedTiming();
        if (t && t.iterations !== Infinity) a.finish();
      } catch (e) { /* an animation that refuses to finish is not a page defect */ }
    }
  };

  await quiet();
  await frames();
  for (const s of scopes) {
    const el = document.querySelector(s);
    if (!el) continue;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = Math.max(0, top - 200); y <= top + el.scrollHeight; y += step) {
      window.scrollTo(0, y);
      // TWO FRAMES, NOT THE WHOLE-PAGE SWEEP'S 110ms. That sweep runs once per
      // page load and can afford to be generous; this one runs once per scope
      // per state per theme, and 110ms a step put this harness at 2.9x its old
      // runtime. Two frames is enough for an IntersectionObserver callback to
      // be delivered and its reveal to START, and the quiet() +
      // finishAnimations() below is what guarantees it has FINISHED — so the
      // settle is still an observation, not a guess.
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }
  }
  window.scrollTo(0, 0);
  await quiet();
  finishAnimations();
  await frames();

  // AND THEN ASSERT IT REALLY IS STILL, because quiet() alone was not enough
  // and the harness proved it: with the per-step wait cut to two frames, a
  // reveal that had not begun when the observer's idle window closed was caught
  // mid-fade and reported as `ghosted 0.052 "Buyer question..."` on a section
  // that is correct. That is the failure this file cares about most — a gate
  // that invents failures gets ignored, which is worse than having no gate.
  //
  // So: sample the opacities the ghost check actually looks at, twice, and keep
  // going until two consecutive samples agree. A page with nothing animating
  // exits on the second sample; a fade in flight keeps the signature moving and
  // holds the loop. Bounded at 24 rounds so a deliberately infinite pulse cannot
  // hang the run — and scoped, so the cost is a section's nodes, not the site's.
  const signature = () => {
    const seen = [];
    for (const s of (scopes.length ? scopes : ["body"])) {
      const el = document.querySelector(s);
      if (!el) continue;
      for (const n of el.querySelectorAll("*")) {
        const o = parseFloat(getComputedStyle(n).opacity);
        if (o < 0.995) seen.push(o.toFixed(3));
      }
    }
    return seen.join(",");
  };
  let prev = null;
  for (let i = 0; i < 24; i++) {
    finishAnimations();
    const now = signature();
    if (now === prev) break;
    prev = now;
    await frames();
  }
};

/**
 * EACH-CHOICE (1-wise) COVERAGE, IN max(options) STATES RATHER THAN sum(options).
 *
 * The LOCKSTEP sweep does the real work: state k puts EVERY group on its k-th
 * option (clamped to its last), for k = 1 .. longest-1. Because a group of L
 * options is clamped only once k passes L-1, every option of every group is
 * rendered by some k — option 0 being the default the page was already measured
 * in. That is the standard each-choice construction, and it is what makes this
 * affordable: water-wastewater-3 has 27 options across 6 exclusive groups, so a
 * one-at-a-time sweep costs 21 states and the full product costs 640, while
 * lockstep costs 7 and still renders all 27.
 *
 * The SOLO sweep then adds one state per group — that group on its first
 * non-default option with every other group left at ITS default. Lockstep alone
 * only ever pairs option k of one group with option k of another, so a panel
 * reachable only as (default system, non-default view) would never appear. One
 * state per group buys back exactly that.
 *
 * ORDERING IS DELIBERATE: lockstep, then solo, then disclosures. If the cap
 * bites, what survives is the sweep that moves every group at once, not the
 * first N options of whichever group sits highest in the document — which is
 * the failure the first version of this had, where one route's 8-tab technology
 * index ate the whole budget and the architecture selector three sections below
 * it, the one this work exists for, was never touched.
 *
 * Disclosures are not exclusive, so they cost ONE state between them: all open.
 * `any: true` marks that state satisfied if ANY of them opened, because a
 * single-open accordion legitimately closes its siblings as each is clicked,
 * and demanding all of them would report a correct widget as unexercised.
 */
function buildStates(groups) {
  const exclusive = groups.filter((g) => g.kind !== "disclosure");
  const disclosures = groups.filter((g) => g.kind === "disclosure");
  const states = [];
  const seen = new Set();
  const push = (label, opts, extra = {}) => {
    const sels = opts.map((o) => o.sel);
    const key = [...sels].sort().join("|");
    if (!sels.length || seen.has(key)) return;
    seen.add(key);
    states.push({ label, sels, ...extra });
  };
  const longest = Math.max(0, ...exclusive.map((g) => g.options.length));
  for (let k = 1; k < longest; k++) {
    const picks = exclusive.map((g) => g.options[Math.min(k, g.options.length - 1)]).filter(Boolean);
    push(`all@${k} [${picks.map((o) => o.label.slice(0, 14)).join(" | ")}]`, picks);
  }
  for (const g of exclusive) {
    const j = g.active === 0 ? 1 : 0;
    if (g.options[j]) push(`${g.name}=${g.options[j].label} (alone)`, [g.options[j]]);
  }
  for (const g of disclosures) push(g.name + "s open", g.options, { any: true });
  return states;
}

/**
 * Drives one ALREADY-LOADED, already-scrolled page through its states.
 *
 * Between states the controls are put back by activating their defaults, not by
 * reloading: a reload here would cost one navigation per state per theme per
 * width and roughly quadruple this harness's runtime, on a page the browser has
 * already settled once. The restore is then ASSERTED, and a page that refuses to
 * go back IS reloaded — so the cheap path can never silently become an
 * accumulating-state path, which would make every state after the first depend
 * on the order this file happened to try them in.
 *
 * `deep` is false for the overflow pass: overflow is read off
 * documentElement.scrollWidth, which does not care whether a reveal animation
 * below the fold has fired, so that pass skips the per-scope scroll walk and
 * pays a settle instead of a sweep.
 */
async function exerciseStates(page, url, states, defaults, deep, onState) {
  const out = { exercised: 0, notTaken: [] };
  for (const st of states) {
    const applied = await page.evaluate(controlOp, { mode: "apply", sels: st.sels });
    await page.evaluate(revealAndSettle, deep ? applied.scopes : []);
    // ASSERT, DO NOT ASSUME. A state whose control never reported the value it
    // was given is recorded as NOT exercised, so it can never be mistaken for
    // coverage — the exact failure mode this whole block exists to remove. It
    // has already caught one: el.click() moves nothing on a Radix tab, and
    // eight tab states on one route reported themselves unexercised rather than
    // passing silently on a panel that had never appeared.
    const confirmed = await page.evaluate(controlOp, { mode: "read", sels: st.sels });
    const took = st.any ? confirmed.some((c) => c) : confirmed.every((c) => c);
    if (applied.missing.length || !took) {
      // Say WHY, not just that. "not exercised" with no number is the kind of
      // line a reader scrolls past; "0 of 6 controls reported active" is the
      // line that gets the widget looked at.
      // Say WHAT refused, not just that something did. This runs only on the
      // failure path, so it costs nothing on a healthy route, and it is the
      // difference between a note a reader scrolls past and one that gets the
      // widget looked at.
      const why = await page.evaluate((sels) => sels.map((s) => {
        const el = document.querySelector(s);
        if (!el) return "gone";
        const id = el.tagName.toLowerCase() + (el.getAttribute("role") ? `[${el.getAttribute("role")}]` : "");
        if (el.tagName === "DETAILS") return `${id} open=${el.open}`;
        for (const a of ["aria-selected", "aria-checked", "aria-pressed", "aria-expanded"]) {
          if (el.hasAttribute(a)) return `${id} ${a}=${el.getAttribute(a)}`;
        }
        if (el.tagName === "INPUT") return `${id} checked=${el.checked}`;
        return `${id} (no state attribute)`;
      }), st.sels);
      out.notTaken.push(
        `${st.label} — ${confirmed.filter(Boolean).length}/${st.sels.length} reported active` +
        (applied.missing.length ? `, ${applied.missing.length} selector(s) no longer in the DOM` : "") +
        ` [${[...new Set(why)].slice(0, 4).join("; ")}]`
      );
    } else { out.exercised++; await onState(st, applied.scopes); }

    await page.evaluate(controlOp, { mode: "reset", sels: defaults.activate, close: defaults.close, toggles: defaults.toggles });
    await page.evaluate(revealAndSettle, []);
    const back = await page.evaluate(controlOp, { mode: "read", sels: defaults.activate });
    if (back.some((c) => !c)) {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      // A reload throws the node tags away with the document, so re-run
      // discovery to put them back. Discovery is deterministic in document
      // order, so the same nodes take the same names and every remaining state
      // still addresses what it was built against.
      await page.evaluate(discoverControls);
      await page.evaluate(revealAndSettle, []);
    }
  }
  return out;
}

/** The state every control is in before a reader touches anything. */
function defaultPlan(groups) {
  return {
    activate: groups
      .filter((g) => g.kind !== "disclosure" && g.kind !== "pressed" && g.options[g.active])
      .map((g) => g.options[g.active].sel),
    close: groups.filter((g) => g.kind === "disclosure").flatMap((g) => g.options.map((o) => o.sel)),
    // Toggle chips are restored one by one to the state the page loaded them
    // in, which for every such group seen so far is "none pressed" — not
    // "the first one pressed", which is what treating them as radios would do.
    toggles: groups.filter((g) => g.kind === "pressed")
      .flatMap((g) => g.options.map((o) => ({ sel: o.sel, on: !!o.on })))
  };
}

const browser = await chromium.launch();
let bad = 0;

for (const route of ROUTES) {
  const row = { route, contrast: {}, gfx: {}, figures: 0, ghosted: [], overflow: [], errors: [], h1: 0, asks: 0, links: [], pseudo: 0, exempt: 0, balance: [], narrowText: [],
    // Interactive coverage. `figures` above is the DEFAULT state's count;
    // `ixFigures` is the most any single interactive state showed, so
    // ixFigures > figures is the visible proof that content behind a control
    // is now being looked at.
    ixGroups: 0, ixStates: 0, ixDone: 0, ixSkipped: [], ixOver: [], ixFails: [], ixFigureSet: new Set(), figDefault: new Set() };

  for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    // DARK IS THE DEFAULT and the OS preference is deliberately ignored, so
    // Playwright's colorScheme alone does not select a theme. Without setting
    // it explicitly the "light" pass silently measures dark a second time and
    // reports two passes for one theme — a gate that agrees with itself.
    //
    // A COOKIE, since 2026-08-08. The theme used to be localStorage plus a
    // pre-paint script; it is now server-rendered from `oxot-theme` because
    // React remounts <html> on a cross-locale navigation and wiped anything it
    // had not rendered itself, dropping every reader into light mode when they
    // pressed EN or NL. Seeding localStorage here would now set nothing at all.
    await ctx.addCookies([{ name: "oxot-theme", value: theme, url: BASE }]);
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 120)));
    page.on("pageerror", (e) => errs.push("pageerror: " + String(e).slice(0, 120)));
    const resp = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
    // A GATE THAT PASSES ON A BROKEN PAGE IS NOT A GATE.
    //
    // Next's 500 page has exactly one <h1> ("This page couldn't load"), a
    // handful of text nodes and no overflow, so it clears every check below.
    // Measured on 2026-08-07, when a missing dictionary key 500'd the homepage
    // and both harnesses reported it clean. Status and a plausible amount of
    // rendered text are now preconditions, not findings.
    if (!resp || !resp.ok()) {
      throw new Error(`${route}: HTTP ${resp ? resp.status() : "no response"} — refusing to grade a page that did not render`);
    }
    // Assert the theme actually took, rather than trusting it. A harness that
    // measures the wrong theme is worse than no harness.
    const applied = await page.evaluate(() => document.documentElement.dataset.theme);
    if (applied !== theme) {
      throw new Error(`${route}: asked for ${theme} but html[data-theme]=${applied}`);
    }
    // Scroll the whole page so every reveal has had its chance; a below-fold
    // element sitting at opacity 0 is CORRECT until it is reached.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 110));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);

    const m = await page.evaluate(collect, null);
    row.contrast[theme] = textFails(m.nodes);
    row.gfx[theme] = gfxFails(m.graphics);
    row.ghosted.push(...m.ghosted.map((g) => `${theme}: ${g.o} "${g.t}"`));
    row.errors.push(...errs.filter((e) => !e.includes("chrome-extension")).map((e) => `${theme}: ${e}`));
    // The other half of the same precondition: a page that rendered its shell
    // but not its content is not gradeable either. 40 words is far below any
    // real route here (the shortest is ~330) and far above an error page (~10).
    if (m.nodes.length < 8) {
      throw new Error(`${route} (${theme}): only ${m.nodes.length} text nodes in <main> — the page did not render`);
    }
    if (theme === "light") {
      row.h1 = m.h1; row.asks = m.asks; row.links = m.links;
      // Layout, not paint, so one theme is enough — measured here because
      // this is the pass that has already scrolled-and-settled.
      row.narrowText = await page.evaluate(collectNarrowText);
    }
    row.pseudo = Math.max(row.pseudo, m.pseudoCount);
    row.exempt = Math.max(row.exempt, m.exempt);
    row.figures = Math.max(row.figures, m.figures);
    // Seed the union with what the DEFAULT state shows, so the delta below is
    // "figures reachable ONLY behind a control" and not an accident of which
    // default figures a given state happened to leave mounted.
    for (const f of await page.evaluate(() =>
      [...document.querySelectorAll("[data-gfx-meaning]")].map((e) => e.getAttribute("data-gfx-meaning"))
    )) { row.figDefault.add(f); row.ixFigureSet.add(f); }

    // ── THE INTERACTIVE PAINT PASS ────────────────────────────────────────
    // Same page, same context, already scrolled and settled — so this costs
    // state changes, not navigations. Both themes, because contrast is
    // theme-dependent and a panel legible in dark can fail in light.
    const groups = await page.evaluate(discoverControls);
    const allStates = buildStates(groups);
    const states = allStates.slice(0, MAX_INTERACTIVE_STATES);
    row.ixGroups = groups.length;
    row.ixStates = allStates.length;
    if (allStates.length > states.length) {
      // Named, never silently dropped. A truncated sweep that reported nothing
      // would be this file's original sin in a new costume.
      row.ixSkipped.push(...allStates.slice(states.length).map((s) => `${s.label} (over cap)`));
    }
    const ran = await exerciseStates(page, BASE + route, states, defaultPlan(groups), true, async (st, scopes) => {
      const im = await page.evaluate(collect, scopes);
      // WHOLE-DOCUMENT and UNIONED, deliberately neither `im.figures` nor a
      // max. `im` is scoped to the sections this state touched, so its count is
      // a fact about one section rather than the page. And a max would hide the
      // thing worth knowing: on water-wastewater-3 the drinking OT view shows
      // 14 marked figures and the wastewater OT view shows 12, so a max of 14
      // cannot tell you whether the second diagram was ever rendered. The union
      // of what every state showed can, and that union minus the default
      // state's IS the content this harness used to certify without looking at.
      for (const f of await page.evaluate(() =>
        [...document.querySelectorAll("[data-gfx-meaning]")].map((e) => e.getAttribute("data-gfx-meaning"))
      )) row.ixFigureSet.add(f);
      // MEASURE_TRACE=1 names every state as it is measured. "interactive=14/14"
      // is a claim about work that left no other trace; this is how a reader
      // checks that the states are the ones they expected rather than fourteen
      // of something else.
      if (process.env.MEASURE_TRACE) {
        console.log(`      trace ${theme} | ${st.label} | ${scopes.length} scope(s) | ${row.ixFigureSet.size} fig seen so far`);
      }
      for (const f of textFails(im.nodes)) row.ixFails.push(`${theme} · ${st.label} · text ${f.r}:1 (needs ${f.need}) "${f.text}"`);
      for (const f of gfxFails(im.graphics)) row.ixFails.push(`${theme} · ${st.label} · 1.4.11 ${f.r}:1 ${f.what}`);
      for (const g of im.ghosted) row.ixFails.push(`${theme} · ${st.label} · ghosted ${g.o} "${g.t}"`);
    });
    row.ixDone = Math.max(row.ixDone, ran.exercised);
    row.ixSkipped.push(...ran.notTaken.map((l) => `${theme}: ${l}`));
    // Console errors thrown by a state land in the same page listener as the
    // rest, and are folded in below — so "err=0" now means no errors in any
    // state that was exercised, not just in the one the reader lands on.
    row.errors = [...new Set([...row.errors, ...errs.filter((e) => !e.includes("chrome-extension")).map((e) => `${theme}: ${e}`)])];
    await ctx.close();
  }

  const overflows = (p) =>
    p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  for (const [w, h] of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(250);
    if (await overflows(page)) row.overflow.push(w);

    // ── THE INTERACTIVE OVERFLOW PASS ─────────────────────────────────────
    // NARROW WIDTHS ONLY, ONE THEME. Overflow is layout and not paint, so one
    // theme is enough — the same reasoning `collectNarrowText` is already
    // measured on a single pass for. And the widths that matter are the small
    // ones: a wide-content panel behind a tab (a Purdue chart, a table) breaks
    // at 390/834/1024 and has room everywhere above. Running all eight would
    // triple this loop's cost to re-confirm the widths that never fail.
    // Reusing the page this loop already loaded keeps the whole addition free
    // of navigation.
    if (INTERACTIVE_OVERFLOW_WIDTHS.has(w)) {
      const groups = await page.evaluate(discoverControls);
      const states = buildStates(groups).slice(0, MAX_INTERACTIVE_STATES);
      await exerciseStates(page, BASE + route, states, defaultPlan(groups), false, async (st) => {
        if (!(await overflows(page))) return;
        // NAME THE ELEMENT, not just the width. The default-state overflow check
        // above prints a bare width because a human then loads that width and
        // sees it; an interactive overflow is behind a control the reader has to
        // find first, so a bare width would send them hunting. Elements inside a
        // deliberate horizontal scroller are excluded — that is the documented
        // way this site shows a wide drawing on a narrow screen, and flagging it
        // would be inventing a failure.
        // FIND IT BY HIDING IT, because two cleverer methods both failed here.
        //
        // Scanning for a box whose right edge passes clientWidth named the
        // header's off-canvas language switcher — 477px wide on a 390px
        // viewport, inside an overflow-x:hidden drawer, incapable of widening
        // anything. Excluding clipped elements then named NOTHING on a page
        // measurably 22px too wide, because every box past the edge sat inside
        // a legitimate table scroller. Walking down the chain of
        // scrollWidth>clientWidth elements found nothing either, because a
        // stretched <body> is exactly as wide as its own content and so never
        // looks "overflowing" by that test.
        //
        // The question is not "what looks wide" but "what, if removed, makes
        // the page fit" — so ask the layout engine that directly: hide each
        // child, re-read documentElement.scrollWidth, put it back. Descend into
        // whichever child answers yes. The style is restored on every branch,
        // and this runs ONLY after the route has already failed, so the cost of
        // the forced reflows is paid on broken pages and never on healthy ones.
        const who = await page.evaluate(() => {
          const doc = document.documentElement;
          const fits = doc.clientWidth + 1;
          const name = (el) =>
            el.tagName.toLowerCase() + (el.getAttribute("class") ? "." + el.getAttribute("class").split(" ")[0] : "");
          let node = document.body, blame = null;
          for (let depth = 0; depth < 40; depth++) {
            let culprit = null;
            for (const c of node.children) {
              if (getComputedStyle(c).display === "none") continue;
              const was = c.style.display;
              c.style.display = "none";
              const fixed = doc.scrollWidth <= fits;
              c.style.display = was;
              if (fixed) { culprit = c; break; }
            }
            if (!culprit) break;
            blame = culprit;
            node = culprit;
          }
          if (!blame) return null;
          return {
            what: name(blame),
            where: (blame.closest("section[id]") || blame.closest("[id]") || {}).id || "?",
            w: Math.round(blame.getBoundingClientRect().width),
            over: doc.scrollWidth - doc.clientWidth,
            text: (blame.textContent || "").replace(/\s+/g, " ").trim().slice(0, 40)
          };
        });
        row.ixOver.push(
          `${w}px · ${st.label}` +
          (who
            ? ` — ${who.over}px over; hiding <${who.what}> in #${who.where} (${who.w}px, "${who.text}") makes it fit`
            : " — culprit not isolated by hiding any single element")
        );
      });
    }
    await ctx.close();
  }

  // Balance is captured on its own passes, because it needs the harness's
  // scroll-and-settle before it reads geometry: `BlurFade` starts at opacity 0
  // under a transform, and `getBoundingClientRect()` returns the TRANSFORMED
  // box — measuring at first paint would grade the animation, not the layout.
  // Default pre-interaction state throughout: nothing is clicked, expanded or
  // hovered, so what is measured is what a reader first meets.
  for (const [w, h] of BALANCE_VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 110));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    const groups = await page.evaluate(collectBalance);
    for (const [name, members] of Object.entries(groups)) {
      if (members.length < 2) continue; // nothing to relate
      const heights = members.map((m) => m.h);
      const counts = members.map((m) => m.n);
      const hRatio = Math.min(...heights) / Math.max(...heights);
      const nRatio = Math.max(...counts) ? Math.min(...counts) / Math.max(...counts) : 0;
      const need = BALANCE_MIN[name] ?? BALANCE_DEFAULT;
      row.balance.push({
        name, vp: w, need,
        h: +hRatio.toFixed(2), n: +nRatio.toFixed(2),
        worst: +Math.min(hRatio, nRatio).toFixed(2),
        heights, counts,
        pass: Math.min(hRatio, nRatio) >= need
      });
    }
    await ctx.close();
  }
  const balanceFails = row.balance.filter((b) => !b.pass);

  const dead = [];
  for (const href of [...new Set(row.links)].filter((h) => h?.startsWith("/"))) {
    const r = await fetch(BASE + href, { redirect: "manual" }).catch(() => null);
    if (!r || r.status !== 200) dead.push(`${href} -> ${r ? r.status : "ERR"}`);
  }

  // Interactive findings are DEDUPED across the two themes' identical sweeps
  // only where they are literally the same string; a light-only failure keeps
  // its own line, because that is the whole reason both themes are run.
  row.ixFails = [...new Set(row.ixFails)];
  row.ixSkipped = [...new Set(row.ixSkipped)];

  const fail =
    row.h1 !== 1 || row.contrast.light.length || row.contrast.dark.length ||
    row.gfx.light.length || row.gfx.dark.length ||
    row.overflow.length || row.errors.length || row.ghosted.length || dead.length ||
    balanceFails.length || row.narrowText.length ||
    row.ixFails.length || row.ixOver.length;
  if (fail) bad++;

  console.log(
    `${fail ? "✗" : "✓"} ${route.padEnd(13)} h1=${row.h1}  asks=${String(row.asks).padStart(2)}  ` +
    `contrast d/l=${row.contrast.dark.length}/${row.contrast.light.length}  ` +
    `overflow=${row.overflow.join(",") || "-"}  err=${row.errors.length}  ` +
    `ghosted=${row.ghosted.length}  dead-links=${dead.length}  pseudo=${row.pseudo}  gfx d/l=${row.gfx.dark.length}/${row.gfx.light.length} in ${row.figures} fig  exempt=${row.exempt}  ` +
    `balance=${row.balance.length - balanceFails.length}/${row.balance.length}  ` +
    `narrow-text=${row.narrowText.length}  ` +
    // `interactive=D/T` is exercised/discovered states over G control groups,
    // and `fig` is the most marked figures any ONE state showed. When that
    // number is higher than the default state's, the difference is exactly the
    // content this harness used to certify without rendering.
    `interactive=${row.ixDone}/${row.ixStates} in ${row.ixGroups} grp` +
    (row.ixFigureSet.size > row.figDefault.size
      ? ` (+${row.ixFigureSet.size - row.figDefault.size} fig reachable ONLY behind a control)` : "") +
    row.balance
      .map((b) => `\n      ${b.pass ? "ok " : "FAIL"} ${b.name} @${b.vp}: h=${b.h} n=${b.n} worst=${b.worst} need>=${b.need}  heights=[${b.heights}] counts=[${b.counts}]`)
      .join("") +
    row.narrowText
      .map((n) => `\n      FAIL narrow-text ${n.section} <${n.tag.toLowerCase()}> ${Math.round(n.ratio * 100)}% width "${n.text}"`)
      .join("") +
    row.ixOver.map((o) => `\n      FAIL interactive-overflow ${o}`).join("") +
    row.ixFails.map((f) => `\n      FAIL interactive ${f}`).join("") +
    row.ixSkipped.map((s) => `\n      note  interactive state NOT exercised: ${s}`).join("") +
    (row.contrast.light[0] ? `\n      worst light ${row.contrast.light[0].r}:1 "${row.contrast.light[0].text}"` : "") +
    (row.contrast.dark[0] ? `\n      worst dark  ${row.contrast.dark[0].r}:1 "${row.contrast.dark[0].text}"` : "") +
    (row.gfx.light[0] ? `\n      worst gfx light ${row.gfx.light[0].r}:1 ${row.gfx.light[0].what} (1.4.11 needs 3:1)` : "") +
    (row.gfx.dark[0] ? `\n      worst gfx dark  ${row.gfx.dark[0].r}:1 ${row.gfx.dark[0].what} (1.4.11 needs 3:1)` : "") +
    (row.ghosted[0] ? `\n      ghosted ${row.ghosted[0]}` : "") +
    (dead[0] ? `\n      dead ${dead.join(", ")}` : "") +
    (row.errors[0] ? `\n      ${row.errors[0]}` : "")
  );
}

await browser.close();
console.log(
  `\n${ROUTES.length - bad}/${ROUTES.length} routes clear every gate ` +
  `(1 h1 · 0 text-contrast fails both themes · 0 non-text (1.4.11) fails both themes · ` +
  `0 overflow at 390/834/1024/1152/1280/1440/1536/2560 · 0 console errors · nothing ghosted · ` +
  `every internal link 200 with no hop · 0 orphaned narrow text · 0 failures in any\n` +
  `interactive state that was exercised).\n` +
  `Contrast, ghosting and pseudo-elements are measured over the WHOLE BODY -- header,\n` +
  `footer and chrome included, not just <main>. h1 and ask counts stay scoped to <main>,\n` +
  `because those are questions about the page rather than about what a reader can see.\n` +
  `pseudo=N is how many ::before/::after/::placeholder paint text. exempt=N is how many\n` +
  `nodes carry data-contrast-exempt -- today that is the OXOT wordmark only (WCAG 1.4.3\n` +
  `logotype). If that number grows, something is being excused rather than fixed.\n` +
  `gfx=N is WCAG 1.4.11 -- SVG fills and strokes vs their composited backdrop at 3:1,\n` +
  `a shape passing on EITHER. It runs ONLY inside figures marked data-gfx-meaning,\n` +
  `because 1.4.11 exempts decoration and a checker cannot tell decoration from\n` +
  `argument: unfiltered it returned 43 "failures" on /company, all of them faint\n` +
  `rules meant to be faint. "in N fig" is how many marked figures the route has --\n` +
  `if a figure that carries meaning is unmarked it is NOT covered, and that number\n` +
  `is the only thing that will tell you.\n` +
  `balance=P/T is SIBLING BALANCE: every [data-balance-group] with 2+ visible members,\n` +
  `measured at 1440x900 and 2560x1440 in the default pre-interaction state, on BOTH\n` +
  `rendered height AND count of [data-balance-item] content elements, worse governing.\n` +
  `Thresholds are per group, from the rule that governs it -- hero-panes needs 0.67\n` +
  `(Pattern 1), everything else 0.50 (site-wide 2x). A flat 0.50 gate would pass a hero\n` +
  `row at 0.55 that Pattern 1 explicitly fails. Mark the INNER CONTENT WRAPPER, never\n` +
  `the stretched grid cell: items-stretch makes cells equal by construction, so marking\n` +
  `cells lets a stretched empty box pass. A section with no group is not covered here --\n` +
  `say why in the component, so an unmarked section reads as reasoned rather than missed.\n` +
  `narrow-text=N is ORPHANED NARROW TEXT: every <p>/<h2>/<h3> (15+ chars) in a\n` +
  `main section[id]/div[id] whose rendered width is <75% of its section's, UNLESS it\n` +
  `sits inside a real multi-column context (computed grid-template-columns with 2+\n` +
  `tracks, or a flex row with 2+ children each rendering >40px wide) or carries\n` +
  `data-narrow-ok. Added 2026-08-25 after the same defect -- a reading-width class on a\n` +
  `standalone paragraph, leaving dead space beside it -- was independently reintroduced\n` +
  `by different builders on two separately-built pages, on the same 2026-08-25, on the\n` +
  `same section types, after being manually fixed once already. A written floor rule did\n` +
  `not stop the recurrence; this is the automated version of the manual audit that found\n` +
  `it, so "flag it as must-be-fixed" (the owner's own words) is now mechanical, not honor-system.\n` +
  `interactive=D/T in G grp is INTERACTIVE STATE COVERAGE, added 2026-08-29. Every route\n` +
  `above used to be graded ONLY in its default pre-interaction state, so anything behind a\n` +
  `tab, selector, accordion or disclosure was never contrast-checked, never overflow-checked\n` +
  `and never watched for console errors -- and the run still said "clears every gate". It was\n` +
  `found concretely: water-wastewater-3's S02 has a 4-view x 2-system selector, a Purdue\n` +
  `diagram was added to its non-default OT view, and this harness certified the route having\n` +
  `seen 10 of its 11 marked figures. Controls are found by ROLE AND SEMANTICS, never from a\n` +
  `list: [role=tablist]/[role=tab], [role=radiogroup]/[role=radio], native input[type=radio]\n` +
  `grouped by name, <select>, sibling [aria-pressed] sets, <details>, and [aria-expanded].\n` +
  `A hand-kept "also click this" list would go stale the first time someone added a tab --\n` +
  `the same failure class as the bug, and the same lesson the route list above already learned.\n` +
  `COVERAGE IS EACH-CHOICE (1-wise), NOT ALL-COMBINATIONS, and that is a real limit, stated\n` +
  `rather than implied: every option of every control is rendered at least once, in max(options)\n` +
  `states rather than sum(options) or their product -- 7 states for water-wastewater-3's 27\n` +
  `options across 6 groups, where one-at-a-time is 21 and the product is 640. A lockstep sweep\n` +
  `(every group on its k-th option) does that; a solo sweep (one group moved, the rest at their\n` +
  `defaults) then adds one state per group, which buys many pairs but GUARANTEES only 1-wise.\n` +
  `Paint (contrast, 1.4.11, ghosting, console) is checked at 1440x900 in BOTH themes, since\n` +
  `contrast is theme-dependent; overflow is checked at 390/834/1024 in one theme, since overflow\n` +
  `is layout not paint and wide panels behind a tab break narrow, not wide. Each state is\n` +
  `re-measured over ONLY the sections its control governs, so one state's findings cannot be\n` +
  `N copies of the header's. Every state is ASSERTED after the click: a control that did not\n` +
  `report the value it was given prints as "NOT exercised" rather than counting as coverage,\n` +
  `and D<T is a real gap, never a rounding. Cap is ${MAX_INTERACTIVE_STATES} states per route; anything past it\n` +
  `is named too, and the lockstep sweep is ordered FIRST so a cap trims pair coverage rather\n` +
  `than dropping whole controls. "+N fig reachable ONLY behind a control" counts marked figures\n` +
  `no default-state pass has ever rendered: it was 6 on water-wastewater-3, 16 on\n` +
  `rail-transportation-2 and 18 on energy-utilities-2 the day this shipped.\n` +
  `STILL NOT COVERED: focus-visible indicators; anything a screen reader announces; hover and\n` +
  `focus states (nothing here hovers, so a hover-only colour is unmeasured); COMBINATIONS of\n` +
  `two controls beyond the two sweeps above -- 1-wise coverage can miss a defect that needs\n` +
  `tab A *and* filter B together; content behind a control that only exists at a width the\n` +
  `interactive pass does not use (states are exercised at 1440 for paint and 390/834/1024 for\n` +
  `overflow, so a control that only appears at 2560 is discovered but its states are graded\n` +
  `for paint at 1440 only); anything needing typed input, drag, or more than one click to\n` +
  `reach (a wizard's second step, a control whose options load on demand); route-level state\n` +
  `-- a ?tab= query param or a #hash deep link renders a different default and is only graded\n` +
  `if passed as an explicit argv URL; modal/menu overlays in header/nav, deliberately skipped\n` +
  `here and belonging to chrome-guards.mjs; and ANY PORTALLED PANEL -- a Radix\n` +
  `Select/Dropdown/Popover renders through <body>, outside every section scope this pass\n` +
  `measures, so its trigger is skipped rather than opened onto content that would be graded as\n` +
  `nothing. That last one is the biggest remaining hole and it is worth naming plainly: the\n` +
  `contents of every popover on this site are still unmeasured.`
);
process.exit(bad ? 1 : 0);
