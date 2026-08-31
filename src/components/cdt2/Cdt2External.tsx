import Image from "next/image";
import { Reveal } from "@/components/shell/reveal";
import { EXTERNAL_PRESSURE } from "./content-2";
import { Band, Eyebrow, H2 } from "./primitives";

export function Cdt2External() {
  const t = EXTERNAL_PRESSURE;
  return (
    <Band tone="surface">
      <Reveal>
        <div className="grid gap-14 md:grid-cols-[.62fr_1fr] md:items-center">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <H2>{t.h2}</H2>
            <p className="mt-4 font-sans text-[15px] font-medium leading-[1.72] text-white/85">{t.reframe}</p>
            {t.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 font-sans text-[15px] leading-[1.72] text-white/70">
                {p}
              </p>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={t.image}
              alt="World map with glowing event nodes and industrial site pins tracing intelligence data streams"
              width={2560}
              height={1440}
              className="h-auto w-full"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </div>
        </div>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {t.domains.map((d) => (
          <div key={d} className="rounded border border-white/10 px-3 py-2 font-sans text-[12.5px] text-white/70">
            {d}
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {t.panels.map((p) => (
          <div key={p.heading} className="rounded-xl border border-white/10 p-6" style={{ background: "#060708" }}>
            <h3 className="h-micro text-white">{p.heading}</h3>
            <div className="mt-3 space-y-2.5">
              {p.items.map((item) => (
                <div key={item.name}>
                  <div className="font-serif text-[13px] font-semibold text-white">{item.name}</div>
                  <p className="mt-0.5 font-sans text-[12.5px] leading-[1.5] text-white/62">{item.body}</p>
                </div>
              ))}
            </div>
            {"dimensions" in p ? (
              <p className="mt-3 border-t border-white/[0.08] pt-3 font-sans text-[12.5px] leading-[1.5] text-white/62">{p.dimensions}</p>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-3xl font-sans text-[14px] italic leading-[1.6] text-white/62">{t.closing}</p>
    </Band>
  );
}
