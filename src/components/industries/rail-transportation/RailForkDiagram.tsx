"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

/**
 * Replaces the old static aria-hidden SVG fork illustration with a literal
 * animated signal: two beams pulse outward from the shared operating model
 * into the passenger and freight nodes, live DOM elements rather than a
 * decorative line drawing. Colors run through CSS custom properties
 * (`hsl(var(--...))`), not fixed hex, so the beam still follows the
 * light/dark toggle like every other themed element on the page.
 */
export function RailForkDiagram({
  passengerLabel,
  passengerStack,
  freightLabel,
  freightStack,
  forkNote
}: {
  passengerLabel: string;
  passengerStack: string;
  freightLabel: string;
  freightStack: string;
  forkNote: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);
  const freightRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="mono-label mb-8 text-muted-foreground">Where the model forks</p>
      <div ref={containerRef} className="relative flex flex-col items-center gap-10">
        <div
          ref={sourceRef}
          className="rounded-full border border-primary/50 bg-background px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-wide text-primary-ink"
        >
          Shared operating model
        </div>
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div ref={passengerRef} className="rounded-xl border border-border bg-background p-4">
            <p className="mono-label text-primary-ink">{passengerLabel}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{passengerStack}</p>
          </div>
          <div ref={freightRef} className="rounded-xl border border-border bg-background p-4">
            <p className="mono-label text-foreground">{freightLabel}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{freightStack}</p>
          </div>
        </div>
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={sourceRef}
          toRef={passengerRef}
          curvature={-50}
          pathColor="hsl(var(--border))"
          pathWidth={1.5}
          pathOpacity={0.4}
          gradientStartColor="hsl(var(--primary))"
          gradientStopColor="hsl(var(--primary))"
          duration={4.5}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={sourceRef}
          toRef={freightRef}
          curvature={50}
          pathColor="hsl(var(--border))"
          pathWidth={1.5}
          pathOpacity={0.4}
          gradientStartColor="hsl(var(--primary))"
          gradientStopColor="hsl(var(--primary))"
          reverse
          duration={4.5}
        />
      </div>
      <p className="mt-8 text-sm text-muted-foreground">{forkNote}</p>
    </div>
  );
}
