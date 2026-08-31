"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Layer {
  name: string;
  body: string;
}

/**
 * A real sticky-scroll reveal, not a decorative animation: the tier list
 * runs down the left column as plain flow content; the right column pins
 * in place and swaps to whichever tier's block is centered in the
 * viewport, tracked with IntersectionObserver against each tier's own
 * ref. Replaces the old horizontal snap-scroll strip, which read as a
 * carousel of boxes rather than an architecture a reader moves through.
 */
export function RailArchitectureScroller({ layers }: { layers: Layer[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    for (const el of refs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [layers.length]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      <div className="flex flex-col gap-1">
        {layers.map((l, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cn(
              "border-l-2 py-6 pl-6 transition-colors duration-300 ease-brand",
              active === i ? "border-primary" : "border-border"
            )}
          >
            <p className={cn("mono-label transition-colors duration-300", active === i ? "text-primary-ink" : "text-muted-foreground")}>
              0{i + 1}
            </p>
            <h4 className={cn("mt-1.5 h-card text-base transition-colors duration-300", active === i ? "text-foreground" : "lg:text-muted-foreground")}>
              {l.name}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground lg:hidden">{l.body}</p>
          </div>
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-8">
          <p className="mono-label text-primary-ink">0{active + 1} / 0{layers.length}</p>
          <h3 className="mt-3 h-sub text-2xl">{layers[active]?.name}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{layers[active]?.body}</p>
          <div className="mt-8 flex gap-1.5" aria-hidden="true">
            {layers.map((_, i) => (
              <span
                key={i}
                className={cn("h-1 flex-1 rounded-full transition-colors duration-300", i === active ? "bg-primary" : "bg-border")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
