"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/shell/reveal";
import { SERVICES_INTRO, SERVICES, type Service } from "./content-2";
import { ACCENT, Band, Eyebrow, H2 } from "./primitives";

/**
 * Section 12 — the six services as a 3-across bento grid, the page's only
 * interactive component. Redesigned 2026-08-21 (owner request) from a
 * full-width accordion list to bento cards: closed cards sit in a normal
 * 3-column grid; clicking one expands it to span the full row width in
 * place (CSS grid auto-flow handles the reflow — no manual reordering)
 * and reveals the same At-a-glance + body content the accordion used to
 * show. The height reveal is the CSS grid-template-rows 0fr -> 1fr trick,
 * so it animates smoothly without measuring pixel heights in JS.
 *
 * A native <button> per card still gives Enter/Space toggling and
 * aria-expanded/aria-controls for free (same pattern as
 * src/components/personas/persona-picker.tsx) — no custom key handling
 * needed. Only one card open at a time; default state is all closed.
 */
function ServiceCard({ service, isOpen, onToggle, panelId }: { service: Service; isOpen: boolean; onToggle: () => void; panelId: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-[transform,box-shadow,border-color] duration-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${isOpen ? "sm:col-span-2 lg:col-span-3" : "hover:-translate-y-1 hover:shadow-lg"}`}
      style={{ background: "#0a0c0e", borderColor: isOpen ? ACCENT : "rgba(255,255,255,.09)" }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full p-6 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="font-serif text-xs font-bold tracking-widest" style={{ color: ACCENT }}>
            {service.n}
          </span>
          <span
            className="flex h-6 w-6 flex-none items-center justify-center rounded-full border text-[13px] transition-transform duration-300"
            style={{
              borderColor: isOpen ? ACCENT : "rgba(255,255,255,.15)",
              color: isOpen ? ACCENT : "rgba(242,244,247,.62)",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
            }}
            aria-hidden="true"
          >
            +
          </span>
        </div>
        <h3 className="mt-3 h-card text-white">{service.name}</h3>
        <p className={`mt-2 font-sans text-[13.5px] leading-[1.6] text-white/62 ${isOpen ? "" : "line-clamp-3"}`}>{service.quote}</p>
        {!isOpen ? (
          <span className="mt-4 inline-block font-sans text-[12px] font-medium" style={{ color: ACCENT }}>
            What this involves
          </span>
        ) : null}
      </button>

      {/* grid-template-rows 0fr -> 1fr: the standard CSS-only smooth height
          reveal, no JS height measurement and no fixed max-height guess. */}
      <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div id={panelId} className="grid gap-8 border-t border-white/[0.09] p-6 pt-6 sm:grid-cols-[.62fr_1.38fr] sm:p-8">
            <div>
              <div className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                At a glance
              </div>
              <dl className="overflow-hidden rounded-lg border border-white/[0.09] bg-white/[0.09]">
                {(
                  [
                    ["Scope", service.atAGlance.scope],
                    ["Runs for", service.atAGlance.runsFor],
                    ["Basis", service.atAGlance.basis],
                    ["How we work", service.atAGlance.howWeWork],
                    ["What you get", service.atAGlance.whatYouGet]
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="flex gap-3 px-4 py-2.5" style={{ background: "#060708" }}>
                    <dt className="w-24 flex-none font-sans text-[11px] font-medium tracking-wide text-white/62">{label}</dt>
                    <dd className="font-sans text-[12.5px] text-white/75">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-4">
              {service.body.map((p, i) => (
                <p key={i} className="font-sans text-[14px] leading-[1.72] text-white/68">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Cdt2Services({ tone = "base" }: { tone?: "base" | "surface" } = {}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <Band id="services" tone={tone}>
      <Eyebrow>{SERVICES_INTRO.eyebrow}</Eyebrow>
      <H2>{SERVICES_INTRO.h2}</H2>
      <p className="mt-4 max-w-3xl font-sans text-[15px] leading-[1.72] text-white/70">{SERVICES_INTRO.intro}</p>

      <Reveal className="mt-9">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const isOpen = openId === service.n;
            const panelId = `${baseId}-service-${service.n}`;
            return (
              <ServiceCard
                key={service.n}
                service={service}
                isOpen={isOpen}
                panelId={panelId}
                onToggle={() => setOpenId(isOpen ? null : service.n)}
              />
            );
          })}
        </div>
      </Reveal>
    </Band>
  );
}
