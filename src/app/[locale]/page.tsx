import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { Cdt2Hero } from "@/components/cdt2/Cdt2Hero";
import { Cdt2SectionNav } from "@/components/cdt2/Cdt2SectionNav";
import { Cdt2WhyItExists, Cdt2Decision01, Cdt2WhatChanges } from "@/components/cdt2/Cdt2Decisions";
import { Cdt2Investment } from "@/components/cdt2/Cdt2Investment";
import { Cdt2Test } from "@/components/cdt2/Cdt2Test";
import { Cdt2Risk, Cdt2WorkedExample } from "@/components/cdt2/Cdt2Risk";
import { Cdt2External } from "@/components/cdt2/Cdt2External";
import { Cdt2EngineConsolidated } from "@/components/cdt2/Cdt2EngineConsolidated";
import { Cdt2ConsultingCondensed } from "@/components/cdt2/Cdt2ConsultingCondensed";
import { Cdt2Deployment } from "@/components/cdt2/Cdt2Deployment";
import { Cdt2Faq } from "@/components/cdt2/Cdt2Faq";
import { Cdt2Origin, Cdt2WhereWeWork } from "@/components/cdt2/Cdt2Origin";
import { Cdt2ClosingCta } from "@/components/cdt2/Cdt2ClosingCta";

export const metadata: Metadata = {
  title: "OXOT — Before you change and spend, replicate your plant | Dutch OT cybersecurity",
  description:
    "OXOT builds a working replica of your plant from the engineering documents you already hold, then tests attacks and changes against the replica instead of the real thing — so the answer arrives as what to fix, what to spend, what to test and what to leave alone, with evidence behind it."
};

/**
 * / — the site's real homepage, 2026-08-31 (owner request: "make the CDT-2
 * into the home page, archive the current home page, keep the rest the
 * same"). This is /cdt-2's own content, moved here unmodified in structure
 * — same fifteen sections, same order, same components — with the prior
 * homepage (the Home2* "four decisions" build) archived verbatim at
 * /home-legacy (see that file's own docblock) rather than deleted.
 *
 * WHY, per the owner's own framing at the time /cdt-2 was built: it is the
 * decisions-first reorganization of the Cyber Digital Twin pillar page
 * (decisions → what changes → investment → testing → why the answers hold →
 * external pressure → only then the engine) that the prior homepage's own
 * "four decisions" section was already pointing readers toward as a deeper
 * read. Promoting it removes a hop rather than adding one.
 *
 * /cdt-2 ITSELF NOW 308-REDIRECTS HERE (next.config.ts, en/nl/root), same
 * permanent-redirect convention already used for /twin → /cdt-2 and
 * /home-2 → /. `PATHS.cdt2` ("/cdt-2") is UNCHANGED and still resolves —
 * the ~100 other pages across the site that link to it via
 * `localePath(locale, PATHS.cdt2)` are deliberately left untouched (owner:
 * "keep the rest the same"); they redirect once, which is standard and
 * does not warrant a site-wide link rewrite for this change. The
 * primaryNav "CDT-2" entry (shell/nav.ts) is the one exception — see that
 * file's own docblock for why its href was repointed directly at
 * PATHS.home instead of relying on the redirect.
 *
 * BROKEN CTAs FIXED AS PART OF THIS PROMOTION (owner instruction). /cdt-2
 * was built EN-only (owner decision, 2026-08-21) and every one of its five
 * internal CTAs — Cdt2Hero's secondary button, Cdt2EngineConsolidated's two
 * link-outs, Cdt2ConsultingCondensed, Cdt2Origin, Cdt2ClosingCta — was
 * hardcoded to a literal `/en/...` path rather than `localePath()`'d. That
 * was a deliberate, scoped exception while this was a comparison build; as
 * the homepage it would have silently sent every /nl visitor's CTA clicks
 * to the English page. All five components above now take a `locale` prop
 * and build their hrefs with `localePath()`, matching this file's own
 * convention below.
 *
 * BOTH LOCALES RENDER — /cdt-2's own "EN ONLY FOR NOW" scoping is retired
 * along with the CTA fix above: this page threads `locale` to every child
 * that needs it, same as the archived homepage did. Section body copy
 * itself (src/components/cdt2/content-1.ts, content-2.ts) is still
 * English-only prose — that is a translation-pass gap, not a routing bug,
 * and out of scope for this promotion (owner: "keep the rest the same").
 *
 * PAGE-LOCAL CLOSING CTA. The global ContactBand is suppressed on this
 * route (PATHS.home in SUPPRESS_CONTACT_BAND, shell/nav.ts) in favor of
 * <Cdt2ClosingCta locale={locale} />, same `id="contact-band"` anchor
 * convention so Cdt2Hero's primary CTA (`#contact-band`) resolves.
 *
 * Uses the site's REAL header/footer (rendered globally by
 * [locale]/layout.tsx — nothing to add here), unchanged from both /cdt-2's
 * and the archived homepage's own convention. Same fixed dark palette
 * (src/components/cdt2/primitives.tsx) as before.
 */
export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();

  return (
    <main className="bg-[#060708] text-[#f2f4f7] selection:bg-[#ff7a1a] selection:text-black">
      <Cdt2Hero locale={locale} />
      <Cdt2SectionNav />
      <Cdt2WhyItExists />
      <Cdt2Decision01 />
      <Cdt2WhatChanges />
      <Cdt2Investment />
      <Cdt2Test />
      <Cdt2Risk />
      <Cdt2WorkedExample />
      <Cdt2External />
      <Cdt2EngineConsolidated locale={locale} />
      <Cdt2ConsultingCondensed locale={locale} />
      <Cdt2Deployment />
      <Cdt2Faq />
      <Cdt2Origin locale={locale} />
      <Cdt2WhereWeWork />
      <Cdt2ClosingCta locale={locale} />
    </main>
  );
}
