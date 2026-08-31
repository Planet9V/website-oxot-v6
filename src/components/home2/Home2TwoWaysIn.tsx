import Link from "next/link";
import { Reveal } from "@/components/shell/reveal";
import { TWO_WAYS_IN } from "./content";
import { ACCENT, BG_SURFACE, Band, Eyebrow, H2, HAIRLINE } from "@/components/cdt2/primitives";
import { localePath } from "@/components/shell/nav";
import type { Locale } from "@/i18n/config";

export function Home2TwoWaysIn({ locale }: { locale: Locale }) {
  const t = TWO_WAYS_IN;
  return (
    <Band tone="base">
      <div className="grid gap-10 lg:grid-cols-[.5fr_1fr] lg:items-start">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <H2>{t.h2}</H2>
        </div>
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2" style={{ background: HAIRLINE, borderColor: HAIRLINE }}>
            {t.panels.map((p) => (
              <div
                key={p.tag}
                className="flex flex-col p-8 transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_rgba(255,122,26,.35),0_8px_24px_-8px_rgba(255,122,26,.25)] motion-reduce:transition-none motion-reduce:hover:shadow-none"
                style={{ background: BG_SURFACE }}
              >
                <div className="oxot-kicker mb-3.5" style={{ color: ACCENT }}>
                  {p.tag}
                </div>
                <div className="h-card mb-3 text-white">{p.title}</div>
                <p className="mb-5 font-sans text-[13.5px] leading-[1.68] text-white/62">{p.body}</p>
                <Link href={localePath(locale, p.link.href)} className="mt-auto font-sans text-[12.5px] font-medium" style={{ color: ACCENT }}>
                  {p.link.label}
                </Link>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
