import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { Reveal } from "@/components/shell/reveal";
import { ENGINE_INTRO, ENGINE_WHAT_IT_IS, ENGINE_DIFFERENT } from "./content-2";
import { ACCENT, Band, Card, CardGrid, Eyebrow, H2 } from "./primitives";

/**
 * Replaces six separate sections (Cdt2EngineIntro, Cdt2EngineIecNative,
 * Cdt2EngineWhatItIs, Cdt2EngineDifferent, Cdt2Model, Cdt2Lenses) as one,
 * 2026-08-22 (owner request), per platform_critique_review.md's ICE review
 * item 4: those six were individually good but together the longest
 * unbroken run of platform explanation on the page. IEC-native/compliance
 * depth now lives at /assurance; seven-layer/lenses depth now lives at
 * /technical-specification — both link-outs at the end of this section
 * rather than reproduced here. Keeps id="engine" so the CDT-2 nav
 * dropdown's "The engine" anchor still lands correctly.
 *
 * What stayed inline, and why: the four disciplines (still the shortest,
 * clearest statement of how the engine works) and the traditional-twin-
 * vs-OXOT compare block (the single highest-value differentiator on the
 * old six-section run, and compact enough to keep). What moved out
 * entirely: the two ENGINE_DIFFERENT panels (redundant with the compare
 * block once it's this close to the link-outs) and two of ENGINE_WHAT_IT_
 * IS's three paragraphs (kept only the one that states the actual
 * question the twin answers — the other two were restating "what a
 * digital twin is" at a level of generality this page's reader, four
 * decision-sections deep already, does not need re-explained).
 */
export function Cdt2EngineConsolidated({ locale }: { locale: Locale }) {
  return (
    <Band id="engine" tone="base">
      <Eyebrow>{ENGINE_INTRO.eyebrow}</Eyebrow>
      <H2>{ENGINE_INTRO.h2}</H2>
      <p className="mt-4 max-w-3xl font-sans text-[16px] leading-[1.7] text-white/74">{ENGINE_INTRO.lead}</p>

      <Reveal className="mt-8">
        <CardGrid className="sm:grid-cols-2 lg:grid-cols-4">
          {ENGINE_INTRO.disciplines.map((d) => (
            <Card key={d.n}>
              <div className="font-serif text-xs font-bold tracking-widest" style={{ color: ACCENT }}>
                {d.n}
              </div>
              <h3 className="mt-1 h-micro text-white">{d.title}</h3>
              <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-white/62">{d.body}</p>
            </Card>
          ))}
        </CardGrid>
      </Reveal>

      <p className="mt-8 max-w-3xl font-sans text-[15px] leading-[1.72] text-white/70">{ENGINE_WHAT_IT_IS.paragraphs[2]}</p>

      <Reveal className="mt-8">
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.09] md:grid-cols-2">
          {ENGINE_DIFFERENT.compare.map((c) => (
            <div key={c.label} className="p-8" style={{ background: "#060708" }}>
              <div
                className="font-sans text-[10px] font-medium uppercase tracking-[0.12em]"
                style={{ color: c.accent ? ACCENT : "rgba(242,244,247,.62)" }}
              >
                {c.label}
              </div>
              <h3 className="mt-3.5 font-serif text-xl font-semibold" style={{ color: c.accent ? "#fff" : "rgba(242,244,247,.82)" }}>
                {c.title}
              </h3>
              <p className="mt-3.5 font-sans text-[14px] leading-[1.68] text-white/62">{c.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 border-t border-white/[0.09] pt-8 sm:grid-cols-2">
        <Link href={localePath(locale, PATHS.assurance)} className="rounded-xl border border-white/10 p-6 transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_rgba(255,122,26,.35),0_8px_24px_-8px_rgba(255,122,26,.25)] motion-reduce:transition-none motion-reduce:hover:shadow-none">
          <span className="h-micro text-white">Engineered around the system, not a framework checklist →</span>
          <p className="mt-2 font-sans text-[13px] leading-[1.6] text-white/62">
            IEC 62443, TS 50701, NIS2, the Cyber Resilience Act, AI Act and Machine Act — how compliance falls out of the same engineering work, on Assurance.
          </p>
        </Link>
        <Link href={localePath(locale, PATHS.technicalSpecification)} className="rounded-xl border border-white/10 p-6 transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_rgba(255,122,26,.35),0_8px_24px_-8px_rgba(255,122,26,.25)] motion-reduce:transition-none motion-reduce:hover:shadow-none">
          <span className="h-micro text-white">The full seven-layer model, and every lens it reads through →</span>
          <p className="mt-2 font-sans text-[13px] leading-[1.6] text-white/62">
            P&ID, Purdue, network, graph, 3D — one model, five projections, on the Technical Specification.
          </p>
        </Link>
      </div>
    </Band>
  );
}
