# Consulting v2 — Build Plan

**Created** 2026-08-30 · **Status** awaiting owner approval, nothing built
**Spec** `new_material_source/1_website_layout_v4/6_consulting/consulting.md` — 536 lines, read in full, the only file in that folder
**Legacy page** `/consulting` — 363-line `page.tsx` + 462-line `content.ts`. **Not to be touched.**

---

## The decision this page has to win

The spec's own positioning line (L9) is the whole brief:

> Do not position consulting as a separate catalogue of generic OT services. Position it as **decision-led engineering engagements enabled by the Twin**.

That matters more than usual here, because **`/cdt-2` already sells the same six services, with the same numbering and near-verbatim the same buyer quotes.** Its `content-2.ts` carries `03` Architecture & Segmentation, `04` Secure Remote Access, `06` Capability Transfer, including *"Stop the risk in vendor access."* and *"Make us able to run it ourselves."* — matching spec L304 and L380.

`/cdt-2` is a protected page. So **this page differentiates or it duplicates.** The split this plan takes:

| Page | Owns |
|---|---|
| `/cdt-2` | The **capability** — what the Twin can do |
| `/consulting-2` | The **engagement** — how the work is sequenced, controlled, evidenced and handed over |

Every section below is judged against that. A section that only restates capability gets shortened or dropped.

---

## Route, menu and closing — DECIDED by owner 2026-08-30

**Routes.** The **new page takes `/consulting`** — the clean URL. The **legacy page moves to `/consulting-2`** and is **removed from the menu**. This inverts the industries convention (where legacy keeps the plain name); it is the owner's explicit call.

Consequence to be honest about: this *does* touch the legacy page, unlike the industries work. The touch is a route move only — its components and content are not edited, and it keeps rendering at the new address, so nothing is lost.

- `src/app/[locale]/consulting/` → `src/app/[locale]/consulting-2/` (legacy)
- new page built at `src/app/[locale]/consulting/`
- `nav.ts` already points `PATHS.consulting` at `/consulting`, which will now resolve to the new page — so the menu may need **no change at all**. Verify rather than assume.
- `/consulting-2` gets **no** nav entry.

**Closing CTA.** Use the site's standard closing — the global `ContactBand` + `ThreeDoors` already appended from `[locale]/layout.tsx`. **Do not build a page-local Final CTA.** The spec's S9 (L502-511) simply repeats the hero's two buttons; it is dropped as a rendered section, and its CTA labels stay available to the hero.

This resolves **D3** outright: one closing, not three. `/consulting` therefore stays **off** `SUPPRESS_CONTACT_BAND` — that list is for pages carrying their own genuinely more specific ask, which this one now deliberately does not.

**Engagement-model overlap — default agreed, revisit only if it bites.** Three of S6's five models already exist on `/platform/work-with-oxot` with their own definitions: Decision Sprint, Twin Build (spec: *Cyber Digital Twin Build*), Continuous Twin Operations. Build S6 **as the spec writes it**, since the spec is the source. If the two pages' wording turns out to *contradict* rather than merely overlap, surface both versions side by side for an owner decision at that point — do not silently reconcile, and do not silently ship a contradiction.

---

## Patterns — all 8 evaluated, 1 qualifies

**Superseded 2026-08-30.** An earlier draft proposed Patterns 1, 6 and 8 without evaluating the full set. Four independent Opus agents then scored all eight against the spec on five axes. **Two of those three were struck.**

| # | Pattern | Verdict | The sentence that decided it |
|---|---|---|---|
| 6 | **Zone Sequencer** | **STRONG FIT** | S3's five steps are genuinely ordinal and causal; the composition rule asks for a timeline; `OXOT_Master_Record.md` L80 already assigns this pattern to this page |
| 1 | Consequence Cascade Hero | POOR FIT | Its mechanic is one real `TwinScenario.attackPathIds` record; the spec has no attack path, no named asset, no consequence — only a commercial value chain |
| 2 | Three-Gate Ledger | POOR FIT | Renders one concrete decision about one concrete system; this spec describes the *method* without ever instancing one |
| 3 | Asset-Class Bento | POOR FIT | No `SystemAsset` data exists; would invent a criticality ranking of OXOT's own services, contradicting L183 *"Each service can stand alone"* |
| 4 | Facility Cross-Section Scroll | **PROHIBITED** | Its stated identity is *"Serves: Seven-Layer Architecture Canvas"*; Consulting's rule bans deep seven-layer architecture in those words |
| 5 | Evidence Dossier Panel | **PROHIBITED** | *"This pattern is Assurance's alone"* — a restriction already enforced once inside the same document to strike it off Platform |
| 7 | Decision Ledger | **PROHIBITED** | S6 is a packaging ladder under the words *"you do not need to commit to a multi-year programme to start"*; a register there is the banned pricing repurposing |
| 8 | Case File Index | POOR FIT | No classification status, no facets, no detail pages to link to; its signature strip could only be invented as a false disclaimer on non-customer content |

### The diagnosis three agents reached independently

**`consulting.md` is a METHOD-level document. Most patterns are INSTANCE-level.** The spec describes the *shape* of OXOT's outputs — *"Provide the rationale, evidence, actions, accountable owners, sequencing, residual risk, and review triggers"* (L124-126) describes the fields a decision has; it is not a decision. Patterns 1, 2, 3 and 8 each need one real instance to render, and 536 lines contain none. That is a property of the page, not a gap to fill by inventing data.

### Pattern 6 is scoped to S3 and explicitly barred from S6

S3 (L107-127) is causal — step 3 cannot precede step 2. S6 is a **menu**, and the spec says so: *"Start small"* (L417), *"You do not need to commit to a multi-year programme to start"* (L431). A stepper there asserts a progression the source denies. Compounding it, the `Typical duration and outcome` column (L421) has **zero durations across its five rows** — and the only durations on the site sit in `cdt2/content-2.ts:250` (`runsFor: "typically 2–6 weeks"`), so filling that column means copying from the page we are differentiating from.

Both precedents are live: `energy-utilities-2/Engagement.tsx` implements Pattern 6 and documents why it marks CURRENT rather than complete; `rail-transportation-2/Engagement.tsx` documents a decision to *decline* it.

### What the other sections get instead

`OXOT_Layout_Styles.md` says a page composes 2-4 patterns. **Only one qualifies**, so the rest are purpose-built — the honest outcome, not a shortfall:

- **S1 hero** — a plain server-rendered SVG chain of the L57-65 four-node flow in a two-column hero. No animation contract, no `TwinScenario` dependency, no claim-boundary disclaimer. **Must not be labelled Pattern 1** — borrowing the name for a generic split hero is how a shape language dilutes into a block library.
- **S4 before/after** — custom. The page's central thesis, both chains fully specified (L139-159), currently two columns of grey text with no contrast device. The highest-value drawing on the page.
- **S5 six services** — the master-detail disclosure L185 already specifies, from the plain `ui/accordion.tsx` primitive. The pattern doc itself names a plain accordion as a legitimate non-pattern option.
- **S6 engagement models** — a comparison/scope ladder preserving "start anywhere". Not a stepper, not a register.

---

## Composition rules in force

From `OXOT_Composition_Rules.md` §Consulting:
- Engagement model and service detail ✓
- Service cards may expand ✓ (accordions permitted — but see Phase 3)
- Use timeline or engagement journey ✓ (Pattern 6)
- **No deep seven-layer architecture** ⚠️ — governs S7

S7's six-layer IEC 62443 stack (L443-455) therefore stays a **short, pointed block that hands off**, not a second `/assurance/iec-62443`. The spec's own CTA at L469 (*"Explore IEC 62443 assurance"*) already concedes the handoff, and that page covers all six layers in depth.

---

## Phases

### Phase 0 — Confirm scope *(owner, COMPLETE 2026-08-30)*
- [x] Route: new page takes `/consulting`; legacy moves to `/consulting-2`, unlinked
- [x] Closing: standard global ContactBand + ThreeDoors; no page-local Final CTA
- [x] Engagement-ladder overlap: build per spec; escalate only on contradiction

**GATE 0 — PASSED.** All three answered. Nothing was started on a guess.

### Phase 1 — Content, transcribed from the spec ONLY

**OWNER DIRECTION 2026-08-30, overriding an earlier draft of this plan: BUILD FROM SCRATCH. No reference to the legacy page.**

An earlier draft proposed copying the legacy `content.ts` because its transcription is accurate. **That is withdrawn.** The legacy files are not to be opened, read, diffed against, or cited during this build. Every string comes from `consulting.md` and nothing else.

- [ ] 1.1 Transcribe each section from the spec, every string carrying its source line
- [ ] 1.2 Split into `content.<section>.ts` files along section boundaries
- [ ] 1.3 Resolve every CTA to a real route (the spec gives labels, not hrefs)
- [ ] 1.4 Record each gap and its resolution in a comment where the gap sits

**Why scratch is right even though it costs more.** The legacy build carries defects D1, D2, D6 and D7. Copying its content is how a defect travels — the builder instruction it ships as customer copy (D1) lives *inside* that transcription, and a copy-then-fix pass is precisely how it survived the last rebuild. Transcribing from source means the only way a defect arrives is if the spec contains it.

**GATE 1:** every string traceable to a `consulting.md` line; zero numeric claims; no legacy file read; `tsc` clean.

### Phase 2 — Hero and the comparison
- [ ] 2.1 S1 hero, Pattern 1, from the L57-65 flow
- [ ] 2.2 S4 before/after — a real visual contrast
- [ ] 2.3 S2's five-node question chain (L75-85)

**GATE 2:** hero copy paints immediately; `prefers-reduced-motion` jumps to end-state; pane ratio ≤1.5×; both S4 chains legible at true size in both themes.

### Phase 3 — Services (~1,450 words, six cards)
- [ ] 3.1 Six cards, Pattern 8 variant
- [ ] 3.2 Six anchor IDs (spec names none — invent and record)
- [ ] 3.3 Accordion vs anchor decision

**The legacy page hides ~1,450 words behind collapsed `<details>` on load** — six titles and six quotes where the spec supplies six full descriptions. The spec permits either (L185: *"accordion **or** on-page anchor"*). Recommendation: anchored sections open by default, so the page's substance is visible without interaction.

**GATE 3:** no content hidden on first paint that the spec supplies in full; every card CTA resolves to a real route.

### Phase 4 — Engagement models, IEC handoff, closing
- [ ] 4.1 S6 engagement ladder
- [ ] 4.2 S7 — short, hands off to `/assurance/iec-62443`
- [ ] 4.3 S8 vendor-neutral — **shortest section on the page**
- [ ] 4.4 S9 closing — resolve D3

**GATE 4:** exactly one closing; S7 does not restate `/assurance/iec-62443`.

### Phase 5 — Reconcile, verify, repoint
- [ ] 5.1 Engagement-ladder overlap with `/work-with-oxot`
- [ ] 5.2 Repoint `nav.ts`
- [ ] 5.3 Full verification

**GATE 5:** `tsc` + `eslint` clean · `/en` and `/nl` 200 · `measure.mjs` clears every gate with `exempt=0`, **including interactive states** (the harness only started exercising those on 2026-08-29) · legacy `/consulting` byte-identical.

---

## Known defects to fix, carried from the legacy build

| # | Defect | Source |
|---|---|---|
| D1 | **Builder instruction shipped as customer copy.** Spec L419 is an instruction *to the builder*; legacy `content.ts` L376-378 renders it as body text | L419 |
| D2 | **Engagement table promises durations it does not have.** Header reads `Typical duration and outcome`; not one of the five rows states a duration | L421 |
| D3 | **Three closings stacked** — page-local Final CTA, then ThreeDoors, then the global ContactBand | nav.ts L337-353 |
| D4 | **6 of 10 suggested internal links use a URL scheme that does not exist:** `/platform/cyber-digital-twin`→`/cdt-2`; `/platform/decisions`→ none; `/platform/decisions/fix-first`→`/decisions/fix-first`; `/platform/decisions/change-safely`→`/decisions/change-safely`; `/resources/technical-specification`→`/technical-specification` | L528-537 |
| D5 | **Citations are expiring presigned S3 URLs** (`Expires=1787432827`) and cannot be published. The `webstore.iec.ch` links (L38, L298) are legitimate | L129, L433, L498 |
| D6 | **Zero diagrams.** Drawable assets became typography | Fixed by the Drawable Asset Inventory below. Root cause was not laziness: no rule required the inventory. `CLAUDE.md` §7g + Definition of Done now do |
| D7 | **One layout, nine times** — nine sections each opening `border-t border-border pt-12` + `<h2>` + prose | — |

---

## Drawable Asset Inventory (required by `CLAUDE.md` §7g)

Produced 2026-08-30 by four independent Opus agents run in parallel against the
spec, the 1,007-entry glyph index, the three imagery pipelines, and the rules
files. Every row is evidence-backed. **Prose is an allowed outcome here; an
unrecorded one is not.**

### Build these

| # | Source | Structure | Route | Marks |
|---|---|---|---|---|
| **A1** | L107-127 engagement sequence | Sequence, 5 steps with real bodies | **Pattern 6 Zone Sequencer.** Rule-mandated — `OXOT_Composition_Rules.md` Consulting rule 3, "Use timeline or engagement journey." Its absence *is* D6 | Plain geometry |
| **A2** | L139-147 vs L151-159 | Before/after, two isomorphic 4-node chains diverging only at node 4 | **One shared canvas, node-for-node aligned.** Two stacked diagrams throw away the entire point | Plain geometry |
| **A3** | L310-316 remote access | 8 route types → boundary → 5 target classes, collapsing to 1 brokered conduit | Bespoke canvas + glyphs. The only fully-enumerated two-sided relationship in the spec | `ot/zone-perimeter` (`types.ts:451`), `ot/conduit` (`types.ts:452`) — an IEC 62443 conduit *is* a brokered vendor route, so the marks are earned, not decorative |
| **A4** | L421-427 engagement models | Ordinal set of 5, ascending commitment (L417/L419/L431) | Unscaled ladder, not a plain table | Plain geometry |

### Hard constraints on the above

- **A3: do not draw route→target edges.** The spec never says which route reaches
  which target. Drawing specific edges fabricates a reachability claim. Draw the
  fan, the boundary, and the collapse — nothing more.
- **A4: no time axis, no Gantt, no week/month scale.** The column is headed
  "Typical duration and outcome" and contains zero durations (this is D2).
- **A2 and A3 must be server-rendered.** `<Diagram>` is `async`; `DrawioGlyph`
  pulls the 462 KB manifest. Spec L185 offers "accordion **or** on-page anchor" —
  **take the anchors.**

### Rejected, with reasons

| Candidate | Verdict |
|---|---|
| **L294 "stalled future state diagram"** | **Fabrication.** It is a *Best for* buyer-recognition bullet, not a deliverable. Drawing it requires inventing both states, and the engine cannot express proposed-vs-implemented edge state anyway |
| **L506 intake artifact list** | **No honest marks exist.** Verified zero hits across all 1,007 manifest slugs and the registry for document/report/list/drawing/sheet/folder/file/paper/checklist/clipboard/note/book. Three of nine items are questions, not objects. Substituting a vessel glyph for "P&ID" is the borrowed-neighbour error that scored the water P&ID 17/30. Ship as a typographic list |
| **L443-455 IEC 62443 six levels** | Honest as a linear derivation **chain**; forbidden as a layered **stack**. No Pattern 4, no sticky per-layer scroll — Consulting rule 4, "No deep seven-layer architecture" |
| **L270-287 segmentation capability lists** | Names capabilities, not an architecture. `PurdueDiagram.tsx` renders seven bands — a direct rule-4 hit with the component sitting right there. **No Purdue stack on this page** |
| **The six "What you receive" fences** (L204/242/279/319/357/395) | Deliverable lists wearing a monospace costume. No arrows, no relations, no order. Six fake diagrams waiting to happen |
| L57-65, L75-85, L99-103, L163-171, L235, L236, L479, L200/245, L348-365, L386-402, L483-496, L22-31 | Prose, tables or cards. Recorded as evaluated, not overlooked |

### Imagery pipelines — all three NOT NEEDED

| Pipeline | Verdict |
|---|---|
| **Blender** | No spec line calls for a 3D object. All four `public/models/*.glb` are hyperscale-DC or PLC hardware; the page is deliberately sector-neutral (L165 lists site/facility/product/railway/data-center as equally in scope), so rendering the DC rack would mis-anchor it |
| **GIMP** | Nothing to process. And the reusable CDT PNGs are **shared** — already live on `energy-utilities-2/Capabilities.tsx:124` and `hyperscale-data-centers-2/Capabilities.tsx:178`. Re-encoding in place would mutate those pages |
| **OpenRouter** | Generating here would be fabricating a need. Generic AI "consultants collaborating" art contradicts the page's own thesis at L91 and L481 |

**The one honest imagery move is reuse, not production:** optionally place the
already-shipped `/images/cdt-architecture-dark.png` + `-light.png` pair in the
Twin-contributes section, exactly as `hyperscale-data-centers-2/Capabilities.tsx:35-36`
documents doing ("SHIPPED ASSET, NOT A GENERATED ONE").

### Owner decisions — 2026-08-30

- **§03 Architecture: `type: "network"`.** Drawn flat. No Purdue bands, no
  `zoneOutline` (it renders for `type: "purdue"` only). Clears Consulting rule 4.
- **On-page anchors, not accordions.** Spec L185 offers both; anchors keep every
  section server-rendered, which is the only way `<Diagram>` (async) can mount.

### Superseded — the question those answered

§03 Architecture drew a genuine split between two agents. The glyph evaluation
calls it the engine's single best case on this page (zones-and-conduits, Q5 YES).
The inventory evaluation calls it the page's biggest rule-4 trap. **They reconcile
only if §03 is drawn flat** — `type: "network"`, no Purdue bands — which loses the
drawn zone outlines, since `zoneOutline` renders for `type: "purdue"` only.
Alternative: cut §03's drawing entirely and let A1-A4 carry the page.

### Named library gap (tracked, not blocking)

No artifact/document glyph family exists. Closing it honestly means drawing an
`oxot/artifact/*` set — roughly `p_and_id_sheet`, `asset_register`,
`topology_export`, `change_request`, `hazard_log`. Four of L506's nine items
would still have no referent.

---

## Overlap — three sections must shrink or defer

| With | What | Resolution |
|---|---|---|
| **`/cdt-2`** | Same six services, same numbering, near-verbatim buyer quotes | This page owns *engagement*; CDT-2 keeps *capability*. Protected page — this one moves |
| **`/work-with-oxot`** | Already defines Decision Sprint, Twin Build, Continuous Twin Operations. Three of the spec's five ladder rows exist there, defined differently | **Owner decision:** defer with a link, or reconcile. Two competing definitions of "Decision Sprint" is the current state |
| **`/assurance/iec-62443`** | Covers S7's entire six-layer stack in depth | Keep S7 short; the spec's own CTA concedes it |
| **`/company`, home** | Vendor-neutral / passive-first repeated across 13+ content files | S8 is the shortest section |

---

## Hard constraints

- **Zero numeric claims.** The spec contains no percentages, currency, durations, counts, customer names or certifications; the only numerals are service indices and standard designations. That absence is itself the constraint — do not add one.
- **Hedge language survives transcription intact:** `applicable framework-oriented outputs` (L170), `Target security-level support material` (L283), `IEC 62443 **concepts**` (L351), `**preparing for** NIS2` (L372), `**where applicable**` (L463). Do not tighten any into a guarantee.
- **No classification or clearance language.** L334 and L409 describe the *customer's* requirement, never an OXOT accreditation.
- Bilingual `{ en, nl }` throughout.
- 500 lines is a target, not a cap.
- Every string carries its source line number, per the codebase convention.

---

## Errors encountered

| # | Error | Attempt | Resolution |
|---|---|---|---|
| — | none yet | — | — |
