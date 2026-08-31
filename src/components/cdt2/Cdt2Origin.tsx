import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { Reveal } from "@/components/shell/reveal";
import { ORIGIN, WHERE_WE_WORK } from "./content-2";
import { ACCENT, Band, Eyebrow, H2 } from "./primitives";

/**
 * Trimmed from a two-column section (origin story + who-builds-it, each
 * with its own h3) to a single credibility strip, 2026-08-22 (owner
 * request), per platform_critique_review.md item 6 — the fuller story
 * (M&A origin, CIF-NL grant detail) already lives on /company, which this
 * now links to rather than duplicates.
 */
export function Cdt2Origin({ locale }: { locale: Locale }) {
  const t = ORIGIN;
  return (
    <Band tone="surface">
      <Reveal>
        <div className="flex flex-col gap-4 border-l-2 py-1.5 pl-6 md:flex-row md:items-center md:justify-between md:gap-8" style={{ borderColor: ACCENT }}>
          <p className="max-w-2xl font-sans text-[14.5px] leading-[1.72] text-white/70">
            Built from high-consequence OT due diligence — whole estates assessed under deal-clock pressure. {t.who.grant.body}
          </p>
          <Link
            href={localePath(locale, PATHS.company)}
            className="flex-none border-b pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.1em]"
            style={{ borderColor: "rgba(255,122,26,.4)", color: ACCENT }}
          >
            About OXOT →
          </Link>
        </div>
      </Reveal>
    </Band>
  );
}

export function Cdt2WhereWeWork() {
  const t = WHERE_WE_WORK;
  return (
    <Band tone="base">
      <div className="grid gap-8 md:grid-cols-[.66fr_1.34fr] md:items-start">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <H2>{t.h2}</H2>
        </div>
        <p className="font-sans text-[14px] leading-[1.7] text-white/62">{t.intro}</p>
      </div>
      <Reveal className="mt-8">
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-3">
          {t.industries.map((ind) => (
            <div key={ind.name} className="p-6" style={{ background: "#0a0c0e" }}>
              <h3 className="h-micro text-white">{ind.name}</h3>
              <p className="mt-2 font-sans text-[12.5px] leading-[1.6] text-white/62">{ind.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}
