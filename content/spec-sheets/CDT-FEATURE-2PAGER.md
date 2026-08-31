# OXOT Cyber Digital Twin — Feature Summary

*A living, engineering-grade model of your OT estate that simulates attacks, prioritizes by real-world consequence, and produces your compliance evidence.*

---

## 1. The Digital Twin (the model)

- Seven-layer graph of everything you operate: equipment, software, dependencies, threats, human/organization, information environment, and controls
- "Territory, not map" — real firmware, patch state and connectivity, not the reference architecture
- Living model — change one component and the BOMs, risk deltas and file sections regenerate as differences
- Drill down five levels: component → equipment → line → facility → organization
- Views: P&ID, 3D, network, Purdue and graph — one model, many lenses
- Ingests your existing data (asset inventories, network diagrams, configs, security-tool output); it adds context, it doesn't replace your tools

## 2. Bills of Materials

- Five machine-readable BOMs: **SBOM** (software), **HBOM** (hardware), **CBOM** (cryptography, incl. post-quantum), **SaaS-BOM**, **Ops-BOM**
- Built on an extended **DEXPI 2.0** engineering schema — versioned, diffable, vendor-neutral
- Expressed in **CycloneDX**; flows straight into the CRA Annex VII technical file
- Transitive-dependency tracing — a vulnerability five libraries deep still surfaces

## 3. Vulnerability Intelligence

- Every asset enriched with **KEV** (known-exploited), **EPSS** (exploit probability), **CVSS**, and **MITRE ATT&CK**
- Continuous CVE / KEV watch across the software estate
- Exploitability scored as a reachable pathway, not an isolated severity number

## 4. Consequence Engineering

- **FMECA** — failure mode, effects & criticality analysis per component
- **RCIL** — reliability-critical items list
- **SCIL** — safety-critical items list, mapped to the safety functions that protect against them
- Binds every finding to what it physically does to the process

## 5. Simulation & Prediction

- **OXOT Seldon Engine** — the physics-based risk engine (seven mathematical axioms)
- **Monte Carlo** pipeline — 10,000 MITRE-aligned attack campaigns per pass
- Output: probability an adversary reaches a safety-critical system, with a **95% confidence interval**
- **What-if** scenarios — test segmentation, patching or "organization under stress" and see the risk curve shift
- **ATQ** — 12-factor threat-actor profiling (who actually targets a plant like yours)

## 6. Prioritization & Scoring

- **NOW / NEXT / NEVER** — triage by consequence × exploitability, with written permission to ignore the noise
- **Consequence Index** — one board-level number, priced in euros (ALE) with CVaR tails, on a 90-day trend
- Glass-box — every score drills to the evidence it came from
- **Supplier / Product Track-Record Rating** — rate vendors by history (CVE / CWE / EPSS / CAPEC / MITRE trend), not just today's open CVE

## 7. Compliance & Reporting Outputs

- **CRA readiness** at portfolio scale — the Annex VII technical file, from the same model
- **IEC 62443** — zones & conduits, target/achieved security levels, ALARP rationale
- **NIS2** — consequence-driven risk picture and supplier-dependency view
- **Board reporting** — a probability landscape with confidence intervals, not a maturity score

## 8. Deployment & Delivery

- **Single-tenant** — your own instance, never pooled with anyone else's
- **AWS European Sovereign Cloud** (EU data residency) or on your own premises
- **Passive-first** — no agents on your controllers
- **CRA Transit** — a 60-day assisted engagement for one self-assessed product: file built, exported, platform torn down
- **Long-term license** — keep and run the twin; capability transferred to your team

---

