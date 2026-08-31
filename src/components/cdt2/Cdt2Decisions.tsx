import { Reveal } from "@/components/shell/reveal";
import { WHY_IT_EXISTS, DECISION_01, WHAT_CHANGES } from "./content-1";
import { ACCENT, Band, CardGrid, Card, Eyebrow, H2 } from "./primitives";

export function Cdt2WhyItExists() {
  const t = WHY_IT_EXISTS;
  return (
    <Band tone="base">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <Reveal>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <H2>{t.h2}</H2>
            {t.body.map((p, i) => (
              <p key={i} className="mt-4 font-sans text-[15px] leading-[1.72] text-white/70">
                {p}
              </p>
            ))}
            <div className="mt-6 border-l-2 pl-5" style={{ borderColor: ACCENT }}>
              <p className="h-micro text-white">{t.callout.lead}</p>
              <p className="mt-1 font-sans text-[14px] text-white/70">{t.callout.body}</p>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 p-6" style={{ background: "#0a0c0e" }}>
            <p className="font-sans text-[14px] leading-[1.7] text-white/70">{t.cardIntro}</p>
            <ul className="mt-4 space-y-2">
              {t.cardItems.map((item) => (
                <li key={item} className="flex gap-2 font-sans text-[13.5px] leading-[1.6] text-white/70">
                  <span style={{ color: ACCENT }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-[13.5px] italic leading-[1.6] text-white/62">{t.closing}</p>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function Cdt2Decision01() {
  const t = DECISION_01;
  return (
    <Band id="decide" tone="surface">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <H2>{t.h2}</H2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {t.paragraphs.map((p, i) => (
          <p key={i} className="font-sans text-[15px] leading-[1.72] text-white/70">
            {p}
          </p>
        ))}
      </div>
      <Reveal className="mt-8">
        <CardGrid className="sm:grid-cols-3">
          {t.cards.map((c) => (
            <Card key={c.label}>
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-xl font-bold" style={{ color: c.label === "NOW" ? "#fff" : undefined }}>
                  {c.label}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-wide" style={{ color: c.label === "NOW" ? ACCENT : "rgba(242,244,247,.5)" }}>
                  {c.sub}
                </span>
              </div>
              <p className="mt-2.5 font-sans text-[13px] leading-[1.6] text-white/62">{c.body}</p>
            </Card>
          ))}
        </CardGrid>
      </Reveal>
      <div className="mt-8 grid gap-8 md:grid-cols-2 border-t border-white/[0.09] pt-8">
        <div>
          <h3 className="font-sans text-[13px] font-medium uppercase tracking-wide text-white/62">{t.produces.heading}</h3>
          <div className="mt-3 space-y-px overflow-hidden rounded-lg border border-white/[0.09] bg-white/[0.09]">
            {t.produces.items.map((item) => (
              <div key={item.name} className="px-4 py-3" style={{ background: "#060708" }}>
                <div className="font-serif text-sm font-semibold text-white">{item.name}</div>
                <p className="mt-1 font-sans text-[12.5px] leading-[1.5] text-white/62">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-sans text-[13px] font-medium uppercase tracking-wide text-white/62">{t.compliance.heading}</h3>
          <p className="mt-3 font-sans text-[13.5px] leading-[1.65] text-white/62">{t.compliance.intro}</p>
          <div className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2">
            {t.compliance.items.map((item) => (
              <div key={item.name} className="px-4 py-3" style={{ background: "#060708" }}>
                <div className="font-serif text-[13px] font-semibold text-white">{item.name}</div>
                <p className="mt-0.5 font-sans text-[11.5px] leading-[1.5] text-white/62">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}

export function Cdt2WhatChanges() {
  const t = WHAT_CHANGES;
  return (
    <Band tone="base">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[.55fr_1fr] lg:items-start">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <H2>{t.h2}</H2>
          </div>
          <CardGrid className="sm:grid-cols-2 lg:grid-cols-4">
            {t.rows.map((r) => (
              <Card key={r.role}>
                <h3 className="font-serif text-base font-semibold" style={{ color: r.accent ? ACCENT : "#fff" }}>
                  {r.role}
                </h3>
                <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-white/62">{r.body}</p>
              </Card>
            ))}
          </CardGrid>
        </div>
      </Reveal>
    </Band>
  );
}
