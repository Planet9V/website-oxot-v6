import { Reveal } from "@/components/shell/reveal";
import { DEPLOYMENT } from "./content-2";
import { ACCENT, Band, Card, CardGrid, Eyebrow, H2 } from "./primitives";

export function Cdt2Deployment() {
  const t = DEPLOYMENT;
  return (
    <Band tone="surface">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <H2>{t.h2}</H2>
      <p className="mt-4 max-w-3xl font-sans text-[15px] leading-[1.72] text-white/70">{t.intro}</p>
      <Reveal className="mt-8">
        <CardGrid className="sm:grid-cols-3">
          {t.options.map((o) => (
            <Card key={o.n}>
              <div className="font-serif text-xs font-bold tracking-widest" style={{ color: ACCENT }}>
                {o.n}
              </div>
              <h3 className="mt-1 h-micro text-white">{o.title}</h3>
              <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-white/62">{o.body}</p>
            </Card>
          ))}
        </CardGrid>
      </Reveal>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-sans text-[13px] font-medium uppercase tracking-wide text-white/62">{t.integrations.heading}</h3>
          <p className="mt-3 font-sans text-[14px] leading-[1.7] text-white/66">{t.integrations.intro}</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {t.integrations.items.map((item) => (
              <li key={item} className="rounded border border-white/10 px-3 py-2 font-sans text-[12.5px] text-white/75">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-[13px] font-medium uppercase tracking-wide text-white/62">{t.engagement.heading}</h3>
          <p className="mt-3 font-sans text-[14px] leading-[1.7] text-white/66">{t.engagement.intro}</p>
          <div className="mt-3 space-y-px overflow-hidden rounded-lg border border-white/[0.09] bg-white/[0.09]">
            {t.engagement.items.map((item) => (
              <div key={item.name} className="px-4 py-3" style={{ background: "#060708" }}>
                <span className="font-serif text-[13px] font-semibold text-white">{item.name}</span>
                <span className="font-sans text-[13px] text-white/62"> — {item.body}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
