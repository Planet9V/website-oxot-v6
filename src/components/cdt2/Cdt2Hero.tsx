import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { HERO } from "./content-1";
import { ACCENT, BG_BASE, Eyebrow } from "./primitives";
import { Cdt2HeroMedia } from "./Cdt2HeroMedia";

export function Cdt2Hero({ locale }: { locale: Locale }) {
  return (
    <section id="top" className="border-b border-white/[0.07] py-16 md:py-24" style={{ background: BG_BASE }}>
      <div className="oxot-canvas grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
          {/* No size class — bare <h1> already gets the site's real 30/36px
              hero scale from globals.css's base layer, the same rule every
              other page's h1 relies on (e.g. the homepage's own h1 carries
              no font-size class at all). */}
          <h1 className="text-white">{HERO.h1}</h1>
          <p className="mt-4 font-sans text-lg font-medium" style={{ color: ACCENT }}>
            {HERO.subline}
          </p>
          {HERO.lead.map((p, i) => (
            <p key={i} className="mt-4 max-w-xl font-sans text-[15px] leading-[1.7] text-white/70">
              {p}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={HERO.ctaPrimary.href} className="cta-lift rounded-full px-6 py-3 font-sans text-sm font-medium text-black" style={{ background: ACCENT }}>
              {HERO.ctaPrimary.label}
            </a>
            <Link
              href={localePath(locale, PATHS.technicalSpecification)}
              className="cta-lift rounded-full border border-white/20 px-6 py-3 font-sans text-sm font-medium text-white"
            >
              {HERO.ctaSecondary.label}
            </Link>
          </div>
        </div>
        {/* 75% of the column, not the full width — the picture was reading
            too large against the copy pane at 100%. `md:ml-auto` keeps it
            pinned to the right edge (matching the copy pane's own left
            alignment) rather than centring it in the freed-up space. */}
        <div className="md:ml-auto md:w-3/4">
          <Cdt2HeroMedia />
        </div>
      </div>

      <div className="oxot-canvas mt-16">
        <Eyebrow>{HERO.decisionsEyebrow}</Eyebrow>
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
          {HERO.decisions.map((d) => (
            <div key={d.title} className="p-6" style={{ background: "#0a0c0e" }}>
              <h3 className="h-micro" style={{ color: d.accent ? ACCENT : "#fff" }}>
                {d.title}
              </h3>
              <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-white/62">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
