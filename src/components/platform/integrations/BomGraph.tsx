import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BOM_ASSET, BOM_TREE, type BomNode } from "./content-graph";
import { FigureNote } from "./primitives";

/**
 * THE DEPENDENCY GRAPH — one asset resolved through all five bills of
 * materials.
 *
 * OXOT_content-to-visual-mapping-table.md line 13: "Product dependencies →
 * BOM/dependency graph", with "generic feature list" named as the wrong
 * answer. So this is not five bullets with five labels. It is the actual
 * nesting: five branches under one controller, one of them four levels deep,
 * with the depth printed on every node.
 *
 * THE DEPTH BADGE IS THE ARGUMENT. content.ts claims a vulnerability five
 * libraries deep still surfaces against the asset carrying it. A reader
 * cannot check that claim against a paragraph, but they can count it on a
 * tree — the compression library is marked L4 and its ancestry back up to
 * PLC-4102 is visible on the same screen. The badge is computed from the
 * real nesting depth as the tree recurses, so it cannot disagree with the
 * indentation beside it.
 *
 * REAL NESTED MARKUP, NOT AN ASCII BLOCK IN A <pre>. Nested <ul>s reflow at
 * 390px, read correctly to a screen reader, and can be copied as text with
 * their structure intact; a preformatted tree drawing does none of that and
 * overflows on a phone.
 *
 * STATIC, AND SAYS SO. No state, no client boundary, no expand/collapse — if
 * this ever needs to fold, it should fold with native <details>, which
 * genuinely works without JavaScript, rather than with a claim in the copy.
 * Values are synthetic; the caption says that too.
 */

/** The elbow: a short horizontal tick joining a node to its parent's rule. */
function Elbow() {
  return <span aria-hidden="true" className="absolute left-0 top-[1.125rem] h-px w-4 bg-border" />;
}

function Node({ node, depth, locale }: { node: BomNode; depth: number; locale: Locale }) {
  const flagged = Boolean(node.finding);

  return (
    <li className="relative pl-6">
      <Elbow />

      <div
        className={
          flagged
            ? "rounded-lg border border-primary/50 bg-primary/10 px-3 py-2.5"
            : "rounded-lg border border-border bg-card px-3 py-2.5"
        }
      >
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          {node.view ? (
            <span className="mono-label rounded border border-primary/45 bg-background px-1.5 py-0.5 font-bold text-primary-ink">
              {node.view}
            </span>
          ) : null}
          <span className="font-mono text-[0.8125rem] font-medium leading-snug text-foreground">{node.label}</span>
          <span className="mono-label ml-auto shrink-0 tabular-nums">L{depth}</span>
        </div>

        {node.note ? (
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{pick(node.note, locale)}</p>
        ) : null}
        {node.finding ? (
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-foreground">{pick(node.finding, locale)}</p>
        ) : null}
      </div>

      {node.children?.length ? (
        <ul className="m-0 ml-2 list-none border-l border-border p-0 pt-2">
          {node.children.map((child) => (
            <Node key={child.label} node={child} depth={depth + 1} locale={locale} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function BomGraph({ label, note, locale }: { label: string; note: string; locale: Locale }) {
  return (
    <figure className="m-0 mt-8">
      <figcaption className="mono-label mb-4">{label}</figcaption>

      {/* The root. Set apart from its branches because it is the only node
          here that is a physical thing you can walk up to and touch. */}
      <div className="rounded-xl border border-primary/40 bg-muted px-4 py-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-sm font-bold text-primary-ink">{BOM_ASSET.label}</span>
          <p className="font-display body-lead font-bold leading-snug text-foreground">
            {pick(BOM_ASSET.name, locale)}
          </p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(BOM_ASSET.note, locale)}</p>
      </div>

      <ul className="m-0 ml-4 list-none space-y-3 border-l border-border p-0 pt-3">
        {BOM_TREE.map((branch) => (
          <Node key={branch.label} node={branch} depth={1} locale={locale} />
        ))}
      </ul>

      <FigureNote>{note}</FigureNote>
    </figure>
  );
}
