"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";

interface ScenarioItem {
  title: string;
  pathway: string;
  impact: string;
  decision: string;
}

/**
 * Replaces the old two-parallel-accordion layout (both tracks' scenario
 * libraries open side by side, everything collapsed by default) with a
 * single switcher: one real toggle control picks the track, the scenarios
 * render open as a card grid — no click-to-reveal needed to read them,
 * and only one track's worth of content is on screen at a time instead of
 * two duplicate column shells.
 */
export function RailScenarioSwitcher({
  passengerLabel,
  freightLabel,
  passengerItems,
  freightItems
}: {
  passengerLabel: string;
  freightLabel: string;
  passengerItems: ScenarioItem[];
  freightItems: ScenarioItem[];
}) {
  const [track, setTrack] = useState<"passenger" | "freight">("passenger");
  const items = track === "passenger" ? passengerItems : freightItems;

  return (
    <div className="mt-8">
      <ToggleGroup
        type="single"
        variant="outline"
        value={track}
        onValueChange={(v) => v && setTrack(v as "passenger" | "freight")}
        className="w-full sm:w-auto"
      >
        <ToggleGroupItem value="passenger" className="mono-label flex-1 sm:flex-none">
          {passengerLabel}
        </ToggleGroupItem>
        <ToggleGroupItem value="freight" className="mono-label flex-1 sm:flex-none">
          {freightLabel}
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <BlurFade key={`${track}-${i}`} inView direction="up" duration={0.3} delay={(i % 6) * 0.05}>
            <Card className="h-full">
              <CardContent>
                <h3 className="font-display text-sm font-semibold leading-snug text-foreground">{s.title}</h3>
                <dl className="mt-3 flex flex-col gap-2.5 text-xs leading-relaxed">
                  <div>
                    <dt className="mono-label text-primary-ink">Pathway</dt>
                    <dd className="mt-0.5 text-muted-foreground">{s.pathway}</dd>
                  </div>
                  <div>
                    <dt className="mono-label text-primary-ink">Impact</dt>
                    <dd className="mt-0.5 text-muted-foreground">{s.impact}</dd>
                  </div>
                  <div>
                    <dt className="mono-label text-primary-ink">Decision the Twin supports</dt>
                    <dd className="mt-0.5 text-foreground">{s.decision}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
