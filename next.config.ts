import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The floating "N" dev-tools badge sat on the footer while the owner was
     reviewing it. It is injected only by `next dev` — Railway runs
     `next start`, and the production HTML has never contained it — but it is
     noise during review, so it is off. */
  devIndicators: false,

  /**
   * Pin the workspace root to THIS directory.
   *
   * `web/` sits inside a repository whose parent still holds the previous
   * application, and Next 16 infers a workspace root by walking up for a
   * package.json. Left alone it resolved the parent, then tried to compile the
   * old app's `src/middleware.ts` — which imports `@/i18n/config` that does not
   * exist here — and every route 500'd before rendering a line of our own code.
   */
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
  allowedDevOrigins: ["127.0.0.1", "localhost", "127.0.0.1:3000", "localhost:3000"],
  reactStrictMode: true,

  /**
   * /use-cases retired 2026-08-22 (owner): consolidated into /case-studies,
   * the one canonical "Use Cases" area. Permanent (308) because this is a
   * structural IA decision, not the per-visitor locale negotiation proxy.ts
   * does with a 307 — there is exactly one correct destination for every one
   * of these paths regardless of who is asking.
   *
   * NL is routed to the NL homepage rather than to /nl/case-studies:
   * /case-studies is EN-only by design (see the doc comment in
   * case-studies/page.tsx), so an /nl/use-cases visitor would otherwise land
   * on an intentional 404. Sending them to /nl instead is an honest "this
   * content isn't in your language yet," not a dead link.
   */
  async redirects() {
    return [
      { source: "/en/use-cases/use-case-ma-due-diligence", destination: "/en/case-studies/ma-ot-due-diligence", permanent: true },
      { source: "/en/use-cases/use-case-architecture-convergence", destination: "/en/case-studies/it-ot-architecture-convergence", permanent: true },
      { source: "/en/use-cases/use-case-hyperscale-lead-engineer", destination: "/en/case-studies/cyber-integration-lead", permanent: true },
      { source: "/en/use-cases/:slug*", destination: "/en/case-studies", permanent: true },
      { source: "/nl/use-cases/:slug*", destination: "/nl", permanent: true },
      { source: "/use-cases/:slug*", destination: "/case-studies", permanent: true },

      /* /twin, /insights, /frameworks, /iec-62443 and /home-2 retired,
       * 2026-08-22 (owner) — same permanent (308) reasoning as /use-cases
       * above: one correct destination per path, not a locale negotiation.
       * /assurance is EN-only (see its own doc comment), so /nl/iec-62443
       * goes to /nl/consulting instead of a page that doesn't exist in
       * Dutch.
       *
       * /twin's OWN DESTINATION UPDATED 2026-08-31, alongside /cdt-2's own
       * retirement below — it pointed at /cdt-2, which is no longer live
       * content, and Next does not chase chained redirects within one
       * `redirects()` array (a matched request returns its 308 immediately;
       * the browser would then re-request /cdt-2 and hit that rule too,
       * a needless double hop). Sent straight to / instead.
       */
      { source: "/en/twin", destination: "/en", permanent: true },
      { source: "/nl/twin", destination: "/nl", permanent: true },
      { source: "/twin", destination: "/", permanent: true },
      { source: "/en/home-2", destination: "/en", permanent: true },
      { source: "/nl/home-2", destination: "/nl", permanent: true },
      { source: "/home-2", destination: "/", permanent: true },

      /* /cdt-2 retired 2026-08-31 (owner: "make the CDT-2 into the home
       * page") — its content is now the homepage itself (src/app/[locale]/
       * page.tsx). Same permanent (308) reasoning as /twin and /home-2
       * above: one correct destination per path. Fragment anchors survive
       * this redirect unmodified (the browser preserves a request's own
       * hash when the Location header carries none), so existing
       * /cdt-2#decide-style links still land on the matching section id,
       * which is unchanged on the promoted page.
       */
      { source: "/en/cdt-2", destination: "/en", permanent: true },
      { source: "/nl/cdt-2", destination: "/nl", permanent: true },
      { source: "/cdt-2", destination: "/", permanent: true },
      { source: "/en/iec-62443", destination: "/en/assurance", permanent: true },
      { source: "/nl/iec-62443", destination: "/nl/consulting", permanent: true },
      { source: "/iec-62443", destination: "/assurance", permanent: true },
      { source: "/en/frameworks", destination: "/en/consulting", permanent: true },
      { source: "/nl/frameworks", destination: "/nl/consulting", permanent: true },
      { source: "/frameworks", destination: "/consulting", permanent: true },
      { source: "/en/insights/:slug*", destination: "/en", permanent: true },
      { source: "/nl/insights/:slug*", destination: "/nl", permanent: true },
      { source: "/insights/:slug*", destination: "/", permanent: true }
    ];
  }
};

export default nextConfig;
