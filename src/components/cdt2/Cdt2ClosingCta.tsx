import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { ACCENT, Band, Eyebrow } from "./primitives";

/**
 * The page's own closing CTA, added 2026-08-22 (owner request, via
 * platform_critique_review.md) to replace the generic global ContactBand —
 * see PATHS.cdt2 in SUPPRESS_CONTACT_BAND, shell/nav.ts, which stops the
 * global band from also rendering underneath this one. Same anchor-id
 * convention the real ContactBand uses (id="contact-band" on the heading),
 * so the hero's primary CTA (#contact-band) lands here whether the global
 * band or this page-local one is what's actually rendering that id.
 *
 * Copy is the specific ask this page's own content already earns — bring
 * the documents, not "get in touch" — adapted from the critique's proposed
 * closing CTA rather than invented fresh.
 */
export function Cdt2ClosingCta({ locale }: { locale: Locale }) {
  return (
    <Band tone="surface">
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <Eyebrow>Start with one real decision</Eyebrow>
          <h2 id="contact-band" className="h-section text-white">
            Bring one P&ID and an asset list.
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-[15px] leading-[1.72] text-white/70">
            One document, one asset register, one proposed change — whatever you have. We will show you how the Cyber Digital Twin connects the pathway, the consequence and the decision, using your own record rather than a reference plant.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href={localePath(locale, PATHS.contact)}
            className="cta-lift inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-sans text-[0.9375rem] font-semibold text-black"
            style={{ background: ACCENT }}
          >
            Talk to OX <span aria-hidden="true">&#8594;</span>
          </Link>
          <p className="font-sans text-[13px] text-white/62">
            Prefer to write?{" "}
            <a href="mailto:info@oxot.nl" className="border-b pb-0.5 font-medium" style={{ borderColor: "rgba(255,122,26,.4)", color: ACCENT }}>
              info@oxot.nl
            </a>
          </p>
        </div>
      </div>
    </Band>
  );
}
