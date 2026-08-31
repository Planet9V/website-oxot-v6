# Visual QA Checklist

## Hierarchy
- Can a visitor identify the single primary idea of each section in 3 seconds?
- Is there one main focal point per viewport?
- Are headings meaningfully distinct from body text and labels?

## Brand
- Does the page feel engineered, calm, and high-consequence?
- Could the page be mistaken for a generic SaaS or cybersecurity template?
- Is color used for semantic state rather than decoration?

## Density
- Are diagrams detailed enough to be credible but readable at normal zoom?
- Are paragraphs limited to one idea each?
- Does technical depth appear progressively rather than all at once?
- **Does any element render less content than its box promises** — an oversized cell, pane or column carrying label-only content while a populated field in its own data goes unrendered? (The 5/10 Industries review's first finding: a 2×2 bento hero showing `type` + `label` while `SystemAsset.description` sat populated in the data. Emptiness is a density defect, and this is the category that catches it — Hierarchy and Consistency both pass a beautifully empty box. On Industries pages it is measured numerically at step 6 of `OXOT_Page_Development_Process.md`; here it is the eyes-on version of the same question.)

## Interaction
- Does every animated change explain a system, pathway, control, or evidence state?
- Does every interaction have a static and keyboard-accessible equivalent?
- Does reduced motion preserve all meaning?

## Consistency
- Are type, surface, border, spacing, and CTA patterns drawn from approved tokens?
- **Uniformity is a defect too, not a safe default.** List the page's heading, card and accent treatments *in aggregate* and ask: does every section run one identical recipe — same alignment, same max-width, same scale — regardless of what the section contains? On an Industries page that fails this question even though nothing was invented: the Phase-7 mandate requires pages "designed around evidence... not around a template library." This is the direction the `/industries/water-wastewater-1` 5/10 review actually flagged, and neither this defect nor its over-correction is visible one section at a time.
- **Ungrounded variation is the opposite defect.** Did a section use a card style, heading style, or accent treatment invented ad hoc, with no stated reason tied to that section's content? Variation is not the defect; arbitrariness is. Three tests keep this checkable instead of a matter of taste:
  - **Stated where?** In the component's own docblock, or in the step-7 `memory_store` payload — somewhere a reviewer months later can retrieve it. `src/components/twin/AssetClassBento.tsx` citing its floor rule in its docblock is the working precedent. A reason given only in conversation is not stated.
  - **Falsifiable?** The reason must name the content property that drove the treatment, so it would be *wrong* if the content were different. "This section deserved its own treatment" fails; "this section is a chronological chain, so its headings are numbered and rule-separated" passes. Swap test: if the same sentence would equally justify the treatment on any other section of this page, it is not a reason.
  - **Repeatable?** Consistency here is per *content shape*, not per page. The same content shape gets the same treatment wherever it recurs; different shapes may differ. Two structurally identical sections wearing different heading recipes is a defect in exactly the way one recipe worn by everything is.
- Are there duplicate components that should use the shared library?