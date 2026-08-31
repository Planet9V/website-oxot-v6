"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { ARCHITECTURE } from "./content";
import { SegmentedControl } from "./SegmentedControl";

/**
 * CUSTOM TREATMENT, DELIBERATE — a process-chain long-section.
 *
 * The source is explicit here: "The industry page should provide two selectable
 * visual diagrams: Drinking Water and Wastewater." Two facts settle the
 * treatment. First, `OXOT_content-to-visual-mapping-table.md` maps this content
 * type — operational consequence, industry relevance — onto a *process-chain
 * diagram* and a *simplified sector system model*, and explicitly bars a
 * generic warning card or a stock-photo-and-paragraph. Second,
 * `OXOT_Component_Inventory.md` records that process diagrams stay custom-built
 * SVG/HTML because no library serves them, which is also the Foundation Spec's
 * own instruction. So this is custom by the system's own decision, not by
 * preference.
 *
 * Pattern 4 (Facility Cross-Section Scroll) is the near miss and is *not* used:
 * its pinned cross-section is specced for the Seldon Engine's seven layers as
 * physical floors, serving Foundation Deliverable 4. These are process stages,
 * not engine layers, and borrowing a pattern's name for unrelated content is
 * precisely the substitution this build exists to avoid.
 *
 * The execution carries the page's hydraulic-profile language into detail: each
 * stage steps further down and further in, so the descent through the works is
 * the layout rather than a decoration laid over it. No stage hides behind a
 * disclosure — the Foundation Spec bars putting complex technical content in an
 * accordion merely to shorten a page — so every stage and its equipment list
 * renders in full.
 */
export function ProcessArchitecture({ locale }: { locale: Locale }) {
  const [systemId, setSystemId] = useState<"drinking" | "wastewater">("drinking");
  const system = systemId === "drinking" ? ARCHITECTURE.drinking : ARCHITECTURE.wastewater;

  return (
    <div>
      <SegmentedControl
        variant="gate"
        className="max-w-md"
        ariaLabel={pick(ARCHITECTURE.h2, locale)}
        value={systemId}
        onValueChange={(v) => setSystemId(v as "drinking" | "wastewater")}
        items={[
          { value: "drinking", label: pick(ARCHITECTURE.drinking.label, locale) },
          { value: "wastewater", label: pick(ARCHITECTURE.wastewater.label, locale) }
        ]}
      />

      <AnimatePresence mode="wait">
        <motion.ol
          key={systemId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
          aria-label={pick(system.label, locale)}
        >
          {system.stages.map((stage, i) => {
            const last = i === system.stages.length - 1;
            return (
              <li
                key={i}
                className="relative"
                /* One step further in per stage, echoing the fall of grade
                   through the works. Capped so the deepest stage never pushes
                   its text off a small screen. */
                style={{ paddingLeft: `${Math.min(i, 5) * 14}px` }}
              >
                <div className={cn("flex gap-4 sm:gap-6")}>
                  {/* The grade line: a vertical rule with a stage marker — the
                      long-section, read downwards. */}
                  <div className="flex shrink-0 flex-col items-center">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-2.5 rounded-[2px] border border-signal-cyan bg-signal-cyan/25"
                    />
                    {!last && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-border" />}
                  </div>

                  <div className={cn("min-w-0 flex-1 border-b border-border pb-6", !last && "mb-6")}>
                    <div className="flex items-baseline gap-3">
                      <span className="mono-label shrink-0 text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="h-card text-foreground">{pick(stage.name, locale)}</h3>
                    </div>
                    <p className="prose-measure mt-2 body-copy leading-relaxed text-muted-foreground">
                      {pick(stage.detail, locale)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </motion.ol>
      </AnimatePresence>

      {/* The technology schedule. Tabular source, tabular rendering — inside its
          own horizontal scroll container so a wide row can never scroll the page
          body sideways. */}
      <div className="mt-16">
        <h3 className="h-sub">{pick(ARCHITECTURE.techLabel, locale)}</h3>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">{pick(ARCHITECTURE.techLabel, locale)}</caption>
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th scope="col" className="mono-label px-5 py-3 font-medium">
                  {pick(ARCHITECTURE.techHeadings.area, locale)}
                </th>
                <th scope="col" className="mono-label px-5 py-3 font-medium">
                  {pick(ARCHITECTURE.techHeadings.examples, locale)}
                </th>
              </tr>
            </thead>
            <tbody>
              {ARCHITECTURE.tech.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-b-0">
                  <th scope="row" className="w-1/3 px-5 py-4 align-top body-copy font-medium text-foreground">
                    {pick(row.area, locale)}
                  </th>
                  <td className="px-5 py-4 align-top body-copy leading-relaxed text-muted-foreground">
                    {pick(row.examples, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="prose-measure mt-6 body-copy leading-relaxed text-muted-foreground">
          {pick(ARCHITECTURE.twinNote, locale)}
        </p>
      </div>
    </div>
  );
}
