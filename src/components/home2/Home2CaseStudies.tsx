import Link from "next/link";
import { Reveal } from "@/components/shell/reveal";
import { CASE_STUDIES } from "./content";
import { ACCENT, BG_SURFACE, Band, Eyebrow, H2, HAIRLINE } from "@/components/cdt2/primitives";
import { localePath } from "@/components/shell/nav";
import type { Locale } from "@/i18n/config";

/**
 * All eleven case studies as a linked 3-across grid, plus an "All case
 * studies" tile — the tile is the twelfth cell, so item 10 spans two
 * columns to fill the row evenly with it (same width, same row) rather
 * than leaving a lone narrow card. Routes are /case-studies/<slug> and
 * /case-studies, kept exactly as specified even though neither exists on
 * the live site yet — see content.ts's header comment.
 */
export function Home2CaseStudies({ locale }: { locale: Locale }) {
  const t = CASE_STUDIES;
  return (
    <Band id="cases" tone="base">
      <div className="mb-8 grid gap-10 lg:grid-cols-[.5fr_1fr] lg:items-start">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <H2>{t.h2}</H2>
        </div>
        <p className="font-sans text-[15px] leading-[1.72] text-white/68">{t.intro}</p>
      </div>
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-3" style={{ background: HAIRLINE, borderColor: HAIRLINE }}>
          {t.items.map((item) => (
            <Link
              key={item.slug}
              href={localePath(locale, `/case-studies/${item.slug}`)}
              className={`flex flex-col gap-2.5 p-6 transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_rgba(255,122,26,.35),0_8px_24px_-8px_rgba(255,122,26,.25)] motion-reduce:transition-none motion-reduce:hover:shadow-none ${item.wide ? "lg:col-span-2" : ""}`}
              style={{ background: BG_SURFACE }}
            >
              <span className="font-serif text-xs font-bold" style={{ color: ACCENT }}>
                {item.n}
              </span>
              <span className="h-micro text-white">{item.title}</span>
              <span className="font-sans text-xs leading-[1.55] text-white/52">{item.hook}</span>
            </Link>
          ))}
          <Link
            href={localePath(locale, t.allLink.href)}
            className="flex flex-col justify-center gap-2 p-6 transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_rgba(255,122,26,.35),0_8px_24px_-8px_rgba(255,122,26,.25)] motion-reduce:transition-none motion-reduce:hover:shadow-none"
            style={{ background: BG_SURFACE }}
          >
            <span className="h-micro" style={{ color: ACCENT }}>
              {t.allLink.label}
            </span>
            <span className="font-sans text-xs leading-[1.55] text-white/52">{t.allLink.body}</span>
          </Link>
        </div>
      </Reveal>
    </Band>
  );
}
