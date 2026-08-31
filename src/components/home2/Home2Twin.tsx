import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/shell/reveal";
import { TWIN } from "./content";
import { ACCENT, BG_BASE, Band, Eyebrow, H2, HAIRLINE } from "@/components/cdt2/primitives";
import { localePath } from "@/components/shell/nav";
import type { Locale } from "@/i18n/config";

export function Home2Twin({ locale }: { locale: Locale }) {
  const t = TWIN;
  return (
    <Band id="twin" tone="surface">
      <div className="grid gap-11 lg:grid-cols-[1.42fr_.58fr] lg:items-start">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <H2>
            {t.h2Lead}
            <span style={{ color: ACCENT }}>{t.h2Accent}</span>
            {t.h2Trail}
          </H2>
          <p className="mt-4 max-w-[38em] font-sans text-[15px] leading-[1.72] text-white/70">{t.intro}</p>

          <Reveal className="mt-7">
            <div className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2" style={{ background: HAIRLINE, borderColor: HAIRLINE }}>
              {t.disciplines.map((d) => (
                <div key={d.n} className="p-6" style={{ background: BG_BASE }}>
                  <div className="mb-3 font-serif text-xs font-bold" style={{ color: ACCENT }}>
                    {d.n}
                  </div>
                  <div className="h-micro mb-2 text-white">{d.title}</div>
                  <p className="font-sans text-[12.5px] leading-[1.62] text-white/62">{d.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-7 border-l-2 py-1.5 pl-5" style={{ borderColor: ACCENT }}>
            <div className="h-card mb-2 text-white">{t.callout.title}</div>
            <p className="mb-4 font-sans text-[13.5px] leading-[1.68] text-white/62">{t.callout.body}</p>
            <Link
              href={localePath(locale, t.callout.link.href)}
              className="border-b pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.1em]"
              style={{ borderColor: "rgba(255,122,26,.4)", color: ACCENT }}
            >
              {t.callout.link.label}
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 p-6" style={{ background: BG_BASE }}>
          <div className="oxot-kicker mb-1 border-b border-white/[0.09] pb-4" style={{ color: "rgba(242,244,247,.62)" }}>
            {t.grantReceipt.heading}
          </div>
          {t.grantReceipt.rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[88px_1fr] gap-3.5 border-b border-dotted border-white/[0.12] py-4">
              <span className="font-sans text-[9.5px] font-medium uppercase leading-[1.6] tracking-[0.1em] text-white/62">{r.label}</span>
              <span className="font-sans text-[12.5px] leading-[1.6] text-white/75">{r.value}</span>
            </div>
          ))}
          <div className="grid grid-cols-[88px_1fr] gap-3.5 py-4">
            <span className="font-sans text-[9.5px] font-medium uppercase leading-[1.6] tracking-[0.1em] text-white/62">{t.grantReceipt.quoteLabel}</span>
            <span className="h-card text-white">{t.grantReceipt.quote}</span>
          </div>
          <div className="flex flex-col gap-2.5 border-t border-white/[0.09] pt-4">
            {t.grantReceipt.links.map((l) =>
              l.external ? (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="font-sans text-[11.5px] leading-[1.5] text-white/85">
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={localePath(locale, l.href)}
                  className="self-start border-b pb-1 font-sans text-[10.5px] font-medium uppercase tracking-[0.1em]"
                  style={{ borderColor: "rgba(255,122,26,.4)", color: ACCENT }}
                >
                  {l.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-9 grid gap-10 border-t border-white/[0.09] pt-8 lg:grid-cols-[1.06fr_.94fr] lg:items-center">
        <div>
          <div className="oxot-kicker mb-3.5" style={{ color: ACCENT }}>
            {t.testControl.eyebrow}
          </div>
          <h3 className="h-sub mb-3.5 text-white">{t.testControl.h3}</h3>
          <p className="mb-4 font-sans text-[14px] leading-[1.7] text-white/66">{t.testControl.body}</p>
          <Link
            href={localePath(locale, t.testControl.link.href)}
            className="border-b pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.1em]"
            style={{ borderColor: "rgba(255,122,26,.4)", color: ACCENT }}
          >
            {t.testControl.link.label}
          </Link>
        </div>
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-white/10" style={{ background: "#000" }}>
            <Image
              src={t.testControl.image}
              alt="A what-if control experiment: the baseline network state above, and below it a simulated control layer where a virtual firewall neutralises the attack paths"
              width={1200}
              height={670}
              className="block h-auto w-full"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
