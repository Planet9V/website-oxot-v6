import Image from "next/image";
import Link from "next/link";
import { GraphLoop } from "./GraphLoop";
import { HERO } from "./content";
import { ACCENT, BG_BASE } from "@/components/cdt2/primitives";
import { localePath } from "@/components/shell/nav";
import type { Locale } from "@/i18n/config";

export function Home2Hero({ locale }: { locale: Locale }) {
  const t = HERO;
  return (
    <section className="relative overflow-hidden border-b border-white/[0.07]" style={{ background: BG_BASE }}>
      <GraphLoop accent={ACCENT} loopSeconds={16} reach={200} className="opacity-[.62] pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(90deg,#060708 6%,rgba(6,7,8,.72) 46%,rgba(6,7,8,.1) 74%)" }}
      />
      <div className="oxot-canvas relative pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <div className="oxot-kicker mb-6" style={{ color: ACCENT }}>
              {t.eyebrow}
            </div>
            {/* No size class — bare <h1> gets the site's real 30/36px hero
                scale from globals.css's base layer, same as every other
                page's h1 (e.g. the homepage's own carries no font-size
                class at all). */}
            <h1 className="text-white">
              {t.h1Lines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <div className="h-micro mt-6" style={{ color: ACCENT }}>
              {t.subhead}
            </div>
            <p className="mt-6 max-w-[34em] font-sans text-[15px] leading-[1.72] text-white/74">{t.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={t.ctaPrimary.href}
                className="cta-lift rounded-md px-6 py-4 font-sans text-[13px] font-semibold"
                style={{ background: ACCENT, color: BG_BASE }}
              >
                {t.ctaPrimary.label}
              </a>
              <Link
                href={localePath(locale, t.ctaSecondary.href)}
                className="cta-lift rounded-md border border-white/[0.18] px-6 py-4 font-sans text-[13px] font-semibold text-white"
              >
                {t.ctaSecondary.label}
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src={t.image}
              alt="The OXOT Cyber Digital Twin: seven stacked layers of a plant model, from facility physics at the base to governance at the top"
              width={760}
              height={1018}
              className="block h-auto w-full max-w-[380px]"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </div>
        </div>
        <div className="mt-4 grid border-t border-white/10 sm:grid-cols-3">
          {t.strip.map((s, i) => (
            <div key={s.n} className={`py-7 pr-6 ${i > 0 ? "border-white/10 sm:border-l sm:pl-6" : ""}`}>
              <div className="oxot-kicker mb-2.5" style={{ color: ACCENT }}>
                {s.n} — {s.tag}
              </div>
              <div className="h-micro mb-2 text-white">{s.title}</div>
              <p className="font-sans text-[13px] leading-[1.62] text-white/62">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
