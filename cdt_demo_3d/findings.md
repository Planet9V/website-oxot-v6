# Findings & Decisions — Babylon Explorer Phase 3 (feature-gap closure)

Phase 2's log is archived at `findings-phase2.md` (still relevant background, not duplicated
here).

## Requirements
<!-- Captured from user request -->
- Close the gap between the Babylon port and the three.js reference's full left-panel menu
  system: phase-stack tabs, marker-colour mode, conduits control, and the entire ANALYSE
  section (Threat Path, Cascading Failure, Risk Portfolio, Assumptions & Provenance)
- Every missing feature is real, working logic in the reference — not a stub — and must be
  ported with matching algorithmic fidelity, not just visual similarity
- "be very careful" carries over from Phase 2, now with higher stakes: several features
  produce safety/security-relevant findings (SIS/Z4 reachability, dollar-figure consequence
  modeling) where a silent logic error would be a wrong finding, not just a visual glitch
- Reuse existing Phase 2 infrastructure wherever it's already equivalent to what the reference
  needs (confirmed: it mostly is — see Research Findings)

## Research Findings
<!-- Key discoveries during exploration -->
- Four parallel Opus Explore agents independently reverse-engineered the reference's missing
  subsystems (phase-stack+marker-colour+conduits; threat path; cascading failure; risk
  portfolio+assumptions), each producing exact code, exact algorithms, and real sample data
  with line numbers. All four confirmed their subsystem is genuinely implemented, not a stub.
- A fifth Opus Plan agent then read the CURRENT Babylon file directly and verified the above
  research against real live data (not just the reference's own claims), finding 3 material
  corrections — see Decisions Made below and the approved plan's "Ground truth" section for
  full detail. Do not re-derive these; they're already verified.
- Reference features NOT ported (deliberately, per the approved plan): the reference's
  draggable-panel + `claimLane` lane-arbitration system — orthogonal, and part of a
  timer-leak bug this phase deliberately avoids reintroducing.

## Technical Decisions
<!-- Decisions made with rationale — mirrors task_plan.md's Decisions Made table, kept in sync -->
See `task_plan.md`'s "Decisions Made" table — kept as the single copy to avoid drift between
the two files during a long multi-step phase.

## Issues Encountered
<!-- Errors and how they were resolved -->
| Issue | Resolution |
|-------|------------|
| CRIT_BY_ASSET silently empty (size 0) — assumed `critical_items[].asset` (singular) | Real field is `assets` (array), same shape as `hazards[].assets`. Fixed to iterate the array like HAZ_BY_ASSET does. Caught immediately via live verification, not left latent. |
| `cascade()` (Step 10) threw `TypeError: cascade is not a function` on first live test | Step 3's own log entry ("Supply model (SUPPLY/rule())") was misread as covering the whole wave-propagation function — it only covered `supplyMap()`/`rule()`. Fixed by porting `cascade(seedIds)` itself, verbatim from the reference, adapted to the `assets` Map/`edges` array. |
| Search box appeared to return 0 results, cascade panel appeared entirely missing from the DOM | Both were the same root cause: the plain `python3 -m http.server` was serving a stale cached copy of the HTML after edits. Not a real bug in either feature — a cache-busting query string (`?cachebust=N`) resolved both; re-tested clean afterward. |
| Standards backfill (WS3) — 7 of 24 citations were questionable on independent Opus audit | See task_plan.md WS3 entry. Two real gaps: the r0-r6 fallback (TIA-942 → more-precise OCP Open Rack v3), and r21's null was wrong — `graph/icd-graph.json` (checked directly, not just via the audit agent's quote) has a genuine on-point leak-detection interface (ICD-10.16) the first pass missed. |

## Resources
<!-- URLs, file paths, API references -->
- Approved plan: `/Users/jimmcknney/.claude/plans/starry-juggling-catmull.md`
- Babylon file being extended: `3d_dev/CDT_Hyperscale_TM/babylon/hyperscale-campus-explorer.html`
- Three.js reference (read-only): `3d_dev/CDT_Hyperscale_TM/hyperscale-campus-explorer.html`
- `3d_dev/CDT_Hyperscale_TM/graph/hazard-log.json` — new fetch this phase (redundancy, ale,
  controls, hazards, assumptions, architecture_review, revenue_basis)
- `3d_dev/CDT_Hyperscale_TM/graph/hall-graph.json` — already fetched; Ground Truth #1 rests on
  its id/mesh disjointness from facility-graph.json
- Phase 2 archive: `findings-phase2.md`, `progress-phase2.md`
- Dev server: `http://localhost:8124/babylon/hyperscale-campus-explorer.html`

## Visual/Browser Findings
<!-- CRITICAL: Update after every 2 view/browser operations -->
-

---
*Update this file after every 2 view/browser/search operations*
*This prevents visual information from being lost*
