import Link from "next/link";
import { Reveal } from "@/components/shell/reveal";
import { COMPANY } from "./content";
import { ACCENT, Band, Eyebrow, H2 } from "@/components/cdt2/primitives";
import { localePath } from "@/components/shell/nav";
import type { Locale } from "@/i18n/config";

export function Home2Company({ locale }: { locale: Locale }) {
  const t = COMPANY;
  return (
    <Band id="company" tone="surface">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <H2>{t.h2}</H2>
      <Reveal className="mt-8">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <p className="font-sans text-[15px] leading-[1.72] text-white/72">
              <b className="font-semibold text-white">{t.introLeadBold}</b>
              {t.introLeadRest}
            </p>
            <p className="mt-4 font-sans text-[15px] leading-[1.72] text-white/72">{t.introSecond}</p>
          </div>
          <p className="font-sans text-[15px] leading-[1.72] text-white/72">{t.introRight}</p>
        </div>
      </Reveal>

      <div className="oxot-kicker mt-9" style={{ color: "rgba(242,244,247,.62)" }}>
        {t.practiceHeading}
      </div>
      <Reveal className="mt-5">
        <div className="grid gap-x-14 gap-y-5 md:grid-cols-2">
          {t.points.map((p) => (
            <div key={p.bold} className="flex items-start gap-3">
              <span className="mt-2 h-[5px] w-[5px] flex-none rounded-full" style={{ background: ACCENT }} />
              <p className="font-sans text-[14px] leading-[1.68] text-white/62">
                <b className="font-semibold text-white">{p.bold}</b>
                {p.rest}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-9 flex flex-col gap-6 border-t border-white/[0.09] pt-7 sm:flex-row sm:items-center">
        <div className="flex-1 border-l-2 pl-5" style={{ borderColor: ACCENT }}>
          <p className="font-sans text-[14.5px] leading-[1.68] text-white/66">{t.grantNote}</p>
        </div>
        <div className="flex flex-none flex-col gap-2.5">
          {t.grantLinks.map((l) => (
            <Link
              key={l.label}
              href={localePath(locale, l.href)}
              className="border-b pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.1em]"
              style={{ borderColor: "rgba(255,122,26,.4)", color: ACCENT }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </Band>
  );
}
