/**
 * CHROME GUARDS — the header and footer behaviours that neither other harness
 * can see.
 *
 * `measure.mjs` asks whether a page is BUILT right and `content-guards.mjs`
 * asks whether it is TRUE. Both load one page at a time and look at it. Two
 * real defects lived in the gap between them, because both are about what
 * happens BETWEEN pages:
 *
 *   1. THE LANGUAGE SWITCH WAS IN THE FOOTER ONLY. On a site whose first rule
 *      is that no string ships in one language, a Dutch reader landing on an
 *      English page had to scroll the whole page to discover Dutch existed.
 *      Every page rendered perfectly; the site was still wrong.
 *
 *   2. PRESSING EN OR NL DROPPED THE READER INTO LIGHT MODE, and logged
 *      "Encountered a script tag while rendering React component". `[locale]`
 *      is the ROOT segment, so /en/x -> /nl/x changes the root layout's
 *      identity and React REMOUNTS <html>, wiping every attribute it did not
 *      render itself — which was the theme, set imperatively by a pre-paint
 *      script. Measured at the time: a class, `data-theme` and an unrelated
 *      `data-foo` were all wiped by a cross-locale nav, while a same-locale nav
 *      kept all three. The fix was to make the theme a cookie the server
 *      renders, so React owns it.
 *
 * Both are regressions a future refactor could reintroduce without failing
 * anything else, which is the only reason this third script exists.
 *
 *   node scripts/chrome-guards.mjs
 *   CHROME_BASE=http://localhost:3100 node scripts/chrome-guards.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.SITE_BASE ?? process.env.CHROME_BASE ?? "http://localhost:3100";
/* /case-studies deliberately excluded — EN-only route, and this suite's
   language-switch tests assume every route here has a working NL twin. */
const ROUTES = ["", "/consulting", "/company", "/facility-due-diligence", "/cdt-2", "/reference", "/contact"];

const results = [];
const check = (name, pass, detail = "") => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "✓" : "✗"} ${name}${detail ? `  ${detail}` : ""}`);
};

const browser = await chromium.launch();

/** The two locale links inside <header>, as the reader can actually see them. */
const headerLangLinks = (page) =>
  page.evaluate(() => {
    const header = document.querySelector("header");
    if (!header) return [];
    return [...header.querySelectorAll("a")]
      .filter((a) => /^(EN|NL)$/i.test((a.textContent ?? "").trim()))
      // checkVisibility, not getBoundingClientRect: a closed <details> keeps
      // layout boxes for its children (content-visibility, not display:none),
      // so a width test reports the collapsed mobile menu as visible.
      .filter((a) => a.checkVisibility({ checkVisibilityCSS: true, contentVisibilityAuto: true }))
      .map((a) => ({
        text: (a.textContent ?? "").trim().toUpperCase(),
        href: a.getAttribute("href"),
        current: a.getAttribute("aria-current"),
        name: a.getAttribute("aria-label")
      }));
  });

/* ── 1. The switch is in the header, on every route, in both languages ───── */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  for (const locale of ["en", "nl"]) {
    const other = locale === "en" ? "nl" : "en";
    for (const route of ROUTES) {
      const url = `${BASE}/${locale}${route}`;
      const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      if (!resp || !resp.ok()) {
        check(`${locale}${route || "/"} renders`, false, `HTTP ${resp ? resp.status() : "none"}`);
        continue;
      }
      const links = await headerLangLinks(page);
      const self = links.find((l) => l.text === locale.toUpperCase());
      const away = links.find((l) => l.text === other.toUpperCase());

      const ok =
        links.length === 2 &&
        self?.current === "true" &&
        away?.href === `/${other}${route}` &&
        links.every((l) => (l.name ?? "").length > 2);

      check(
        `header language switch · /${locale}${route || ""}`,
        ok,
        ok ? "" : JSON.stringify(links)
      );
    }
  }
  await ctx.close();
}

/* ── 2. The theme survives a language switch, both directions, both themes ─ */
for (const theme of ["dark", "light"]) {
  for (const [from, to] of [["en", "nl"], ["nl", "en"]]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    // The theme is a cookie the SERVER reads. Seeding localStorage would set
    // nothing — that was the old mechanism and the reason for this whole file.
    await ctx.addCookies([{ name: "oxot-theme", value: theme, url: BASE }]);
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 140)));
    page.on("pageerror", (e) => errors.push("pageerror: " + String(e).slice(0, 140)));

    await page.goto(`${BASE}/${from}/cdt-2`, { waitUntil: "networkidle", timeout: 45000 });
    const before = await page.evaluate(() => ({
      theme: document.documentElement.dataset.theme,
      bg: getComputedStyle(document.body).backgroundColor
    }));
    if (before.theme !== theme) {
      check(`${theme}: seeded correctly on /${from}/cdt-2`, false, `got ${before.theme}`);
      await ctx.close();
      continue;
    }

    errors.length = 0;
    await page.click(`header a[href="/${to}/cdt-2"]`);
    await page.waitForTimeout(1800);
    const after = await page.evaluate(() => ({
      theme: document.documentElement.dataset.theme,
      bg: getComputedStyle(document.body).backgroundColor,
      url: location.pathname
    }));

    check(
      `${theme} survives /${from}/cdt-2 → /${to}/cdt-2`,
      after.theme === theme && after.bg === before.bg,
      after.theme === theme && after.bg === before.bg ? "" : `${before.theme}/${before.bg} → ${after.theme}/${after.bg}`
    );
    check(`${theme}: the switch keeps your place (/${to}/cdt-2)`, after.url === `/${to}/cdt-2`, after.url);
    check(`${theme}: no console errors across the switch`, errors.length === 0, errors.slice(0, 2).join(" | "));
    await ctx.close();
  }
}

/* ── 2b. The switch keeps your PLACE on the page, not just the page ──────── */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const y = () => page.evaluate(() => Math.round(window.scrollY));

  for (const route of ["/consulting", "/cdt-2"]) {
    await page.goto(`${BASE}/en${route}`, { waitUntil: "networkidle", timeout: 45000 });
    await page.evaluate(() => window.scrollTo(0, Math.round(document.body.scrollHeight * 0.45)));
    await page.waitForTimeout(500);
    const before = await y();
    await page.click(`header a[href="/nl${route}"]`);
    await page.waitForTimeout(1900);
    const after = await y();
    // `scroll={false}` on the language links. Without it Next resets to the
    // top, which is correct for changing page and wrong for changing language:
    // the reader has not gone anywhere, they asked for the same words in their
    // own language.
    check(
      `language switch keeps your place on /en${route}`,
      before > 200 && Math.abs(after - before) < 60,
      `${before} → ${after}`
    );
  }

  // The counterpart, and the reason this is not just `scroll={false}` everywhere:
  // moving between PAGES must still start at the top.
  await page.goto(`${BASE}/en/consulting`, { waitUntil: "networkidle", timeout: 45000 });
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(400);
  await page.click('header a[href="/en/cdt-2"]');
  await page.waitForTimeout(1800);
  const top = await y();
  check("changing page still starts at the top", top === 0, `scrollY ${top}`);
  await ctx.close();
}

/* ── 3. The toggle persists, and dark is the default ─────────────────────── */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle", timeout: 45000 });
  const fresh = await page.evaluate(() => document.documentElement.dataset.theme);
  check("a first-time visitor gets dark (design system §0.2)", fresh === "dark", `got ${fresh}`);

  /* `header button[aria-label]` used to be unambiguous. It stopped being so
     when the CRA submenu added a labelled chevron earlier in the DOM, and this
     guard quietly started opening a menu instead of toggling the theme. */
  await page.click("header button[data-theme-toggle]");
  await page.waitForTimeout(900);
  await page.reload({ waitUntil: "networkidle" });
  const afterToggle = await page.evaluate(() => document.documentElement.dataset.theme);
  check("the choice survives a full reload", afterToggle === "light", `got ${afterToggle}`);

  const cookie = (await ctx.cookies()).find((c) => c.name === "oxot-theme");
  check("the choice is a cookie the server can read", cookie?.value === "light", JSON.stringify(cookie?.value));
  await ctx.close();
}

/* ── 4. Mobile: reachable in the menu, and the bar does not overflow ─────── */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle", timeout: 45000 });

  const closed = (await headerLangLinks(page)).length;
  check("390px: the switch is not in the collapsed bar", closed === 0, `${closed} visible`);
  const overflowClosed = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  check("390px: no horizontal overflow", !overflowClosed);

  await page.click("header summary");
  await page.waitForTimeout(500);
  const open = await headerLangLinks(page);
  check("390px: the switch is in the menu", open.length === 2, `${open.length} visible`);
  const overflowOpen = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  check("390px: menu open, still no overflow", !overflowOpen);
  await ctx.close();
}

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(
  failed.length
    ? `\n${failed.length} of ${results.length} chrome guards FAILED.`
    : `\nAll ${results.length} chrome guards clear — the language switch is in the header on every route in both languages, and the theme survives a language switch in both directions and both themes.`
);
process.exit(failed.length ? 1 : 0);
