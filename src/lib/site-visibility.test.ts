import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * The rule this file defends: A DEPLOY IS NOT INDEXABLE UNLESS SOMEONE SAID SO.
 *
 * On 2026-08-08 the Railway review host was measured serving `/en/cra` with no
 * robots directive at all and no robots.txt — a crawlable staging copy of a
 * site whose real domain is oxot.nl. The fix is opt-in indexing, and the whole
 * value of opt-in is that it survives someone adding a new host and forgetting.
 * A test is the only thing that keeps the default from quietly flipping back.
 *
 * `resetModules` + dynamic import because both modules read the environment at
 * import time — deliberately, so the answer cannot differ between a static
 * render and a request.
 */
async function load(value: string | undefined) {
  vi.resetModules();
  if (value === undefined) delete process.env.OXOT_PUBLIC_SITE;
  else process.env.OXOT_PUBLIC_SITE = value;
  return {
    visibility: await import("./site-visibility"),
    robots: (await import("../app/robots")).default
  };
}

afterEach(() => {
  delete process.env.OXOT_PUBLIC_SITE;
});

describe("site visibility", () => {
  it("noindexes when nothing is set — the preview host, a branch deploy, a laptop", async () => {
    const { visibility, robots } = await load(undefined);
    expect(visibility.IS_PUBLIC_SITE).toBe(false);
    expect(visibility.ROBOTS_DIRECTIVE).toEqual({ index: false, follow: false, nocache: true });
    expect(robots().rules).toEqual([{ userAgent: "*", disallow: "/" }]);
  });

  it("indexes only on an explicit OXOT_PUBLIC_SITE=true", async () => {
    const { visibility, robots } = await load("true");
    expect(visibility.IS_PUBLIC_SITE).toBe(true);
    expect(visibility.ROBOTS_DIRECTIVE).toBeUndefined();
    expect(robots().rules).toEqual([{ userAgent: "*", allow: "/" }]);
  });

  it("treats anything other than the exact string 'true' as not the real site", async () => {
    for (const value of ["1", "yes", "TRUE", "", "false"]) {
      const { visibility } = await load(value);
      expect(visibility.IS_PUBLIC_SITE, `OXOT_PUBLIC_SITE=${JSON.stringify(value)}`).toBe(false);
    }
  });

  it("never points a crawler at a sitemap that does not exist yet", async () => {
    const { robots } = await load("true");
    expect(robots().sitemap).toBeUndefined();
  });
});
