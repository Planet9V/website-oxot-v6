import Link from "next/link";
import { Reveal } from "@/components/shell/reveal";
import { PARTNERS } from "./content";
import { ACCENT, Band, Card, CardGrid, Eyebrow, H2 } from "@/components/cdt2/primitives";
import { localePath } from "@/components/shell/nav";
import type { Locale } from "@/i18n/config";

export function Home2Partners({ locale }: { locale: Locale }) {
  const t = PARTNERS;
  return (
    <Band id="partners" tone="surface">
      <div className="grid gap-10 lg:grid-cols-[.5fr_1fr] lg:items-start">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <H2>{t.h2}</H2>
          <p className="mt-3.5 font-sans text-[14px] leading-[1.7] text-white/62">{t.intro}</p>
        </div>
        <Reveal>
          <CardGrid className="sm:grid-cols-3">
            {t.columns.map((c) => (
              <Card key={c.tag}>
                <div className="oxot-kicker mb-3.5" style={{ color: ACCENT }}>
                  {c.tag}
                </div>
                <div className="h-micro mb-2.5 text-white">{c.title}</div>
                <p className="font-sans text-[12.5px] leading-[1.62] text-white/56">{c.body}</p>
              </Card>
            ))}
          </CardGrid>
        </Reveal>
      </div>
      <div className="mt-7 flex flex-col gap-4 border-t border-white/[0.09] pt-6 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="max-w-[60em] font-sans text-[13.5px] leading-[1.66] text-white/58">{t.closing}</p>
        <Link
          href={localePath(locale, t.closingLink.href)}
          className="flex-none border-b pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.1em]"
          style={{ borderColor: "rgba(255,122,26,.4)", color: ACCENT }}
        >
          {t.closingLink.label}
        </Link>
      </div>
    </Band>
  );
}
