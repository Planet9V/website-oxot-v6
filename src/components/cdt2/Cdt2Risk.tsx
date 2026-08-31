import { Reveal } from "@/components/shell/reveal";
import { WHY_ANSWERS_HOLD, WORKED_EXAMPLE } from "./content-1";
import { ACCENT, Band, Card, CardGrid, Eyebrow, H2 } from "./primitives";

export function Cdt2Risk() {
  const t = WHY_ANSWERS_HOLD;
  return (
    <Band id="risk" tone="surface">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <H2>{t.h2}</H2>
      <p className="mt-4 max-w-3xl font-sans text-[15px] leading-[1.72] text-white/70">{t.intro}</p>
      <Reveal className="mt-8">
        <CardGrid className="sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s) => (
            <Card key={s.n}>
              <div className="font-serif text-xs font-bold tracking-widest" style={{ color: ACCENT }}>
                STEP {s.n}
              </div>
              <h3 className="mt-1 h-micro text-white">{s.title}</h3>
              <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-white/62">{s.body}</p>
            </Card>
          ))}
        </CardGrid>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <Eyebrow>{t.engineered.eyebrow}</Eyebrow>
          <h3 className="h-card text-white">{t.engineered.h3}</h3>
          <p className="mt-3 font-sans text-[14px] leading-[1.7] text-white/68">{t.engineered.intro}</p>
          <div className="mt-4 space-y-px overflow-hidden rounded-lg border border-white/[0.09] bg-white/[0.09]">
            {t.engineered.rows.map((r) => (
              <div key={r.acronym} className="px-4 py-2.5" style={{ background: "#060708" }}>
                <span className="font-serif text-xs font-bold" style={{ color: ACCENT }}>
                  {r.acronym}
                </span>
                <span className="ml-2 font-sans text-[13px] text-white/62"> — {r.body}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Eyebrow>{t.exploitability.eyebrow}</Eyebrow>
          <h3 className="h-card text-white">{t.exploitability.h3}</h3>
          <p className="mt-3 font-sans text-[14px] leading-[1.7] text-white/68">{t.exploitability.intro}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {t.exploitability.cards.map((c) => (
              <div key={c.acronym} className="rounded border border-white/10 p-3">
                <div className="font-sans text-[12.5px] font-semibold text-white/85">{c.name}</div>
                <p className="mt-1 font-sans text-[11.5px] leading-[1.5] text-white/62">{c.body}</p>
                <div className="mt-1 font-sans text-[10.5px] uppercase tracking-wide text-white/62">{c.acronym}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/[0.07] pt-8">
        <h3 className="font-sans text-[13px] font-medium uppercase tracking-wide text-white/62">{t.bomsHeading}</h3>
        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.09] bg-white/[0.09] sm:grid-cols-5">
          {t.boms.map((b) => (
            <div key={b.name} className="px-4 py-3" style={{ background: "#060708" }}>
              <div className="font-serif text-[13px] font-semibold text-white">{b.name}</div>
              <p className="mt-1 font-sans text-[11.5px] leading-[1.5] text-white/62">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl font-sans text-[13px] leading-[1.7] text-white/62">{t.bomsClosing}</p>
      </div>
    </Band>
  );
}

export function Cdt2WorkedExample() {
  const t = WORKED_EXAMPLE;
  return (
    <Band tone="base">
      <div className="flex items-start justify-between gap-4">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <span className="rounded-full border border-white/20 px-3 py-1 font-sans text-[10px] uppercase tracking-wide text-white/60">
          {t.tag}
        </span>
      </div>
      <H2>{t.h2}</H2>
      <p className="mt-4 max-w-3xl font-sans text-[15px] leading-[1.72] text-white/70">{t.intro}</p>
      <Reveal className="mt-8">
        <CardGrid className="sm:grid-cols-2 lg:grid-cols-4">
          {t.stages.map((s) => (
            <Card key={s.stage} accent={s.accent}>
              <div className="font-serif text-xs font-bold tracking-widest" style={{ color: ACCENT }}>
                {s.stage}
              </div>
              <p className="mt-2 font-sans text-[13.5px] leading-[1.6]" style={{ color: s.accent ? undefined : "rgba(242,244,247,.68)" }}>
                {s.body}
              </p>
            </Card>
          ))}
        </CardGrid>
      </Reveal>
    </Band>
  );
}
