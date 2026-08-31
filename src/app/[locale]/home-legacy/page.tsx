import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { Home2Hero } from "@/components/home2/Home2Hero";
import { Home2FourDecisions } from "@/components/home2/Home2FourDecisions";
import { Home2Company } from "@/components/home2/Home2Company";
import { Home2TwoWaysIn } from "@/components/home2/Home2TwoWaysIn";
import { Home2Twin } from "@/components/home2/Home2Twin";
import { Cdt2Services } from "@/components/cdt2/Cdt2Services";
import { Home2CaseStudies } from "@/components/home2/Home2CaseStudies";
import { Home2Partners } from "@/components/home2/Home2Partners";
import { Home2Sectors } from "@/components/home2/Home2Sectors";
import { Cdt2ClosingCta } from "@/components/cdt2/Cdt2ClosingCta";

export const metadata: Metadata = {
  title: "OXOT — Dutch OT cybersecurity | See your OT environment, understand the risk, know what to do next",
  description:
    "OXOT builds a working model of your plant from the engineering documents you already hold, then attacks it, changes it and prices it — so the answer arrives as work your team can start on Monday and a number your board can sign.",
  /* Archived, not canonical — see this file's own docblock. Keeping it out
     of search results avoids a duplicate-content signal against the real
     homepage without deleting the page itself. */
  robots: { index: false, follow: false }
};

/**
 * /home-legacy — the retired homepage, archived 2026-08-31 (owner request:
 * "make the CDT-2 into the home page, archive the current home page, keep
 * the rest the same").
 *
 * This is the SAME page that lived at `/` from 2026-08-22 until this change
 * — content, components and copy are untouched, moved verbatim to this new
 * route rather than deleted, so the prior build stays reachable by direct
 * URL for reference or rollback. It is not linked from primaryNav or from
 * any other page; `robots: noindex` above keeps it out of search results.
 * The real homepage is now built from /cdt-2's content
 * (src/app/[locale]/page.tsx) — see that file's own docblock for the
 * promotion.
 *
 * `Cdt2ClosingCta` here now takes a required `locale` prop (added
 * 2026-08-31 alongside the CDT-2 homepage promotion, to fix that
 * component's own hardcoded /en/contact link) — threaded through here too
 * since this archived page still renders the same shared component.
 *
 * See the original 2026-08-22 docblock this page carried, preserved below
 * for its own history:
 *
 * / IS THE FORMER /home-2, 2026-08-22 (owner) — a from-scratch rebuild
 * implementing `OXOT Home.dc.html` from the Claude Design project that also
 * sourced /cdt-2 (claude.ai/design project 65e687bd-763e-4bf9-a99f-
 * ca682458c385), imported via the DesignSync tool. It stood beside the
 * original root page.tsx for comparison; the owner promoted it and the
 * original homepage was retired (see git history for its content, and
 * content.company/home i18n keys still in use by /company).
 *
 * Uses the site's REAL header/footer (rendered globally by
 * [locale]/layout.tsx). Same fixed dark palette as /cdt-2
 * (src/components/cdt2/primitives.tsx, reused directly) and the site's real
 * fonts (font-sans/font-serif).
 *
 * EN ONLY, page-local content in src/components/home2/content.ts, not
 * routed through the i18n dictionary — renders identically for both
 * locales rather than gating on `locale`.
 *
 * PAGE-LOCAL CLOSING CTA via <Cdt2ClosingCta />, same `id="contact-band"`
 * anchor convention so HERO.ctaPrimary's `#contact-band` href resolves.
 *
 * LOCALE-AWARE INTERNAL LINKS — `locale` threaded to every section that
 * renders one, each Link wrapped in `localePath()`.
 */
export default async function HomeLegacyPage(props: PageProps<"/[locale]/home-legacy">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();

  return (
    <main className="bg-[#060708] text-[#f2f4f7] selection:bg-[#ff7a1a] selection:text-black">
      <Home2Hero locale={locale} />
      <Home2FourDecisions />
      <Home2Company locale={locale} />
      <Home2TwoWaysIn locale={locale} />
      <Home2Twin locale={locale} />
      <Cdt2Services tone="surface" />
      <Home2CaseStudies locale={locale} />
      <Home2Partners locale={locale} />
      <Home2Sectors />
      <Cdt2ClosingCta locale={locale} />
    </main>
  );
}
