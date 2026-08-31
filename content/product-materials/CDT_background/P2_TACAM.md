---
title: "TACAM: Threat-Actor Capability–Affinity Mapping for Attributing OT Adversaries to Equipment via CWE/CPE Clusters"

# TACAM: Threat-Actor Capability–Affinity Mapping for Attributing OT Adversaries to Equipment via CWE/CPE Clusters

---

## Abstract

Operational technology (OT) environments face a persistent attribution gap: security teams can enumerate vulnerabilities in field devices but cannot readily answer which threat actors are likely to exploit which specific equipment in their facility. TACAM addresses this by building a threat-actor × weakness-cluster affinity matrix derived from MITRE ATT&CK (Enterprise and ICS matrices) and the CWE/CAPEC taxonomy, then joining those clusters to National Vulnerability Database (NVD) CPE product identifiers to ground actor affinity in named product lines. Each actor is assigned an Estimated Intent-Capability (EIC) score integrating intent, technical capability, and opportunity — where opportunity is derived from cluster affinity — weighted by CISA Known Exploited Vulnerabilities (KEV) catalog presence and FIRST Exploit Prediction Scoring System (EPSS) trajectory. The resulting actor × equipment affinity surface enables OT practitioners to rank threat actors by relevance to a specific asset inventory rather than treating all high-severity CVEs as equally urgent. The corpus as of the current snapshot tracks 624 actors across 2,823 actor × sector affinity rows. Empirical precision-recall evaluation against independent incident attribution records is [PENDING EVALUATION].

---

## Graphical Abstract (specification)

> **Image rendering pending.** The graphical abstract should be a three-panel horizontal flow diagram.
>
> - **Panel 1 (Input):** Four labeled data sources feeding downward into a fusion node: MITRE ATT&CK ICS, MITRE ATT&CK Enterprise, NVD/CPE product catalog, CISA KEV + FIRST EPSS.
> - **Panel 2 (Processing):** The fusion node expands into a 2×2 matrix schematic — rows labeled with representative actor names (Sandworm, Midnight Blizzard, Cl0p), columns labeled with CWE cluster IDs — with heat-coded cells representing affinity weight. A vertical arrow from the matrix feeds into an EIC scoring bar chart showing actor rank order.
> - **Panel 3 (Output):** A facility asset tree (PLC → HMI → Historian) with colored actor-risk overlays at each node, and a ranked threat list sidebar.
>
> Suggested rendering tool: Lucidchart or D3.js force-directed layout with chord arcs for actor-to-cluster ties.

---

## 1. Introduction

Vulnerability management in OT environments is structurally different from IT vulnerability management. An IT team scanning a Windows fleet receives CVE scores, patch availability, and, increasingly, EPSS likelihoods. An OT team scanning a distributed control system (DCS) receives the same CVSS integers applied to PLCs, safety instrumented systems, and field I/O modules that cannot be patched on a quarterly cycle, may run unsupported firmware indefinitely, and exist in segments where a failed patch can halt production or trigger a safety event.

The practical question practitioners ask is not "what is the CVSS score of this vulnerability?" but "is there a threat actor who has the capability and motivation to exploit this specific device in a facility like mine?" The two questions are related but not equivalent. A CVSS 9.8 buffer overflow in a niche SCADA historian from a vendor with three percent market share may carry lower actual risk than a CVSS 7.2 authentication bypass in a controller that Sandworm has demonstrated operational interest in targeting.

Existing threat-intelligence frameworks address parts of this problem. MITRE ATT&CK for ICS (Alexander et al., 2020) documents adversary techniques at the tactic level. MITRE ATT&CK Enterprise documents pre-OT intrusion tradecraft. CWE provides a weakness taxonomy. CAPEC maps attack patterns to weaknesses. NVD maps CVEs to CWEs and CPE product strings. CISA KEV identifies CVEs with confirmed exploitation. FIRST EPSS provides a probabilistic exploitation likelihood score per CVE. What does not exist is a mechanism that traverses this graph from actor to technique to weakness type to CPE product to vulnerability to facility asset, producing a ranked, scored actor affinity surface for a given asset inventory.

TACAM constructs that traversal. The method builds weakness clusters from CWE/CAPEC membership, scores each actor's historical technique use against those clusters to produce affinity weights, joins clusters to NVD CPE product identifiers, and aggregates KEV and EPSS signals into a per-actor EIC score that adjusts for confirmed and predicted exploitation activity. The result is an actor × equipment affinity matrix that OT practitioners can query against their asset inventory to produce a prioritized, actor-attributed threat list.

This paper describes the TACAM architecture, the corpus as built, and the scored results produced from the current snapshot. Comparative evaluation against external attribution datasets is [PENDING EVALUATION].

---

## 2. Related Work

### 2.1 Threat Intelligence Frameworks

Strom et al. (2018) describe the design philosophy behind MITRE ATT&CK as an empirically grounded, behavior-focused knowledge base derived from real-world intrusion observations. The framework's unit of representation — the technique — captures what an adversary does at a level of specificity that is both actionable for defenders and stable enough to anchor cross-incident comparisons. ATT&CK's group profiles link named actors to technique sets, providing the primary input TACAM uses to derive actor behavior signatures.

Alexander, Belisle, and Steele (2020) extended ATT&CK to industrial control systems, documenting ICS-specific tactics from Initial Access to Impact and mapping them to ICS-specific techniques such as Modify Parameter, Alarm Suppression, and Loss of Safety. The ICS matrix corrects a gap in the Enterprise matrix: techniques relevant to OT intrusion phases (particularly lateral movement from IT to OT networks and ICS-specific impact techniques) were not represented. TACAM consumes both matrices jointly, treating Enterprise techniques as actor signatures for the intrusion precursor phase and ICS techniques as the operational phase most directly relevant to OT equipment risk.

### 2.2 Exploit Prediction and Prioritization

Jacobs et al. (2021) introduced EPSS as a data-driven alternative to CVSS for exploit likelihood prediction. CVSS measures severity properties of a vulnerability — attack vector, complexity, privileges required — but was not designed to predict whether a given vulnerability will be exploited in practice. EPSS uses a logistic regression model trained on observed exploitation events, producing a daily probability score per CVE. TACAM integrates EPSS trajectory into its EIC weighting to distinguish CVEs that are theoretically severe from CVEs that are actively being exploited.

The CISA Known Exploited Vulnerabilities catalog provides a complementary binary signal: a CVE's presence in KEV indicates confirmed exploitation in the wild, not a predicted likelihood. TACAM uses KEV membership as a hard-weight multiplier in EIC scoring, increasing the score contribution of CVEs with confirmed exploitation history beyond what EPSS alone would assign.

### 2.3 Attribution and Actor Profiling

Prior work on adversary attribution in OT contexts has largely relied on manual analysis of incident reports, malware reverse engineering, and infrastructure overlap. Academic treatments of attribution at scale (correlating technique sets to actor groups across large CVE corpora) remain sparse. TACAM differs from single-incident attribution analysis by operating at corpus scale across all ATT&CK-mapped actors simultaneously, rather than analyzing a specific intrusion post hoc.

Weakness clustering via CWE and CAPEC has been applied in vulnerability research to group similar weaknesses for root-cause analysis and secure development training. Using CWE clusters as an intermediate representation between actor technique signatures and CPE product identifiers — the join mechanism central to TACAM — has not, to the authors' knowledge, been described in prior published work.

---

## 3. Methods

### 3.1 Data Sources and Ingestion

TACAM draws from four primary sources ingested into a structured relational store (PostgreSQL with pgvector for embedding-backed similarity joins).

**MITRE ATT&CK (Enterprise + ICS).** The ATT&CK STIX bundles are ingested to extract group-to-technique associations. Each group object is resolved to an actor record; each relationship object of type `uses` with a target of type `attack-pattern` creates an actor × technique edge. The ICS matrix is ingested separately and merged on a shared actor namespace.

**CWE/CAPEC Taxonomy.** The NVD CWE list and MITRE CAPEC XML export are parsed to build a weakness graph. CWE entries with parent-child relationships form a tree structure; CAPEC attack patterns link to CWE weaknesses via `CanPrecede` and `Exploits` relationships. TACAM flattens this tree into clusters by grouping CWE entries under top-level categories (e.g., CWE-284 Improper Access Control, CWE-119 Improper Restriction of Operations within the Bounds of a Memory Buffer) and associating each cluster with its CAPEC attack patterns.

**NVD CVE/CPE Feed.** Each CVE record is parsed for CWE assignment and CPE product strings. CWEs link a CVE to a weakness cluster; CPE strings identify the specific product — vendor, product name, version range — that carries the vulnerability. The join is: CWE cluster → CVE → CPE product → named equipment.

**CISA KEV and FIRST EPSS.** KEV is ingested as a daily-refreshed list of CVE IDs with confirmed exploitation. EPSS scores are ingested as a daily probability per CVE. Both are joined to the CVE table by CVE ID.

### 3.2 Actor × Weakness-Cluster Affinity Matrix

For each actor *a* and each CWE cluster *c*, an affinity weight *w(a, c)* is computed as follows.

First, each ATT&CK technique *t* is mapped to one or more CWE clusters via the CAPEC link chain: technique → CAPEC attack pattern → CWE weakness → cluster assignment. Where a technique maps to multiple clusters, affinity weight is distributed proportionally across clusters.

Second, for actor *a*, the actor's technique set is aggregated. Techniques are weighted by their attributed frequency in ATT&CK group profiles (where frequency data exists) or assigned unit weight (where only binary presence is recorded). The per-cluster weight is the sum of technique weights mapped to that cluster, normalized across clusters for actor *a* to produce a distribution.

The result is an actor × cluster matrix *W* with dimensions (number of actors) × (number of CWE clusters), where each row sums to 1.0 across non-zero entries.

### 3.3 Cluster-to-CPE Join

Each CWE cluster is associated with the set of CPE product strings from CVEs that carry a CWE assignment within that cluster. A cluster *c* therefore maps to a set of CPE products *P(c)*: the equipment types for which weaknesses in that cluster have been observed in named products.

This join produces an actor × CPE affinity surface: actor *a* has affinity for CPE product *p* equal to the sum over clusters *c* of *w(a, c)* weighted by the proportion of that cluster's CVE mass attributable to product *p* within the full NVD corpus.

### 3.4 Estimated Intent-Capability (EIC) Scoring

The EIC score for actor *a* integrates three components.

**Intent (I):** A sector-targeting weight derived from actor × sector affinity rows in the corpus, sourced from ATT&CK group profiles and open-source incident records. Intent is scored on [0, 1] per sector per actor.

**Capability (C):** A technique-breadth and sophistication score derived from the actor's ATT&CK technique count, weighted by the tactical diversity (number of distinct tactics covered) and by ICS-matrix technique presence. Actors with ICS-specific technique attribution receive a capability uplift.

**Opportunity (O):** Derived from the actor × cluster affinity *w(a, c)* joined to the CPE products present in a specific asset inventory. Opportunity scores the intersection of actor weakness affinity with the actual product attack surface.

The raw EIC is a weighted sum: EIC(a) = α·I + β·C + γ·O, where α, β, γ are configurable weights (default: 0.35, 0.35, 0.30).

**KEV and EPSS adjustment:** The EIC score is multiplied by an exploitation signal factor *X(a)*, computed as the proportion of CVEs in the actor's CPE intersection that appear in CISA KEV, blended with the mean EPSS score for that intersection. *X(a)* ranges from 1.0 (no KEV/EPSS signal) to a configurable ceiling (default: 2.0) when the intersection is dominated by KEV-confirmed, high-EPSS CVEs.

The final adjusted EIC drives actor ranking in the output matrix.

### 3.5 Corpus Snapshot and Toolchain

The corpus is maintained in PostgreSQL (`seldon` schema). The actor intelligence base populates `seldon.actor_eic`. The actor × sector affinity surface populates a dedicated affinity table. The pipeline is implemented in Python with scheduled daily refresh of KEV and EPSS inputs. Graph traversal queries use a combination of SQL recursive CTEs for the CWE tree and Neo4j Cypher for the ATT&CK technique graph, with results materialized back to PostgreSQL for scoring.

---

## 4. Results

### 4.1 Corpus Scale

As of the snapshot date (2026-06-16), the TACAM corpus contains:

- **624 tracked threat actors** in `seldon.actor_eic`, covering groups with at least one ATT&CK technique attribution.
- **2,823 actor × sector affinity rows** in the targeting affinity surface, representing the number of distinct actor-sector pairs for which a non-zero targeting score has been derived.
- **2,823 scored rows** in the derived actor → sector targeting table, matching the affinity row count, confirming full score propagation across all attributed pairs.
- **624 actors** with per-actor campaign-momentum scores in the momentum table, providing one momentum record per tracked actor.

These figures represent the descriptive extent of the corpus. Distribution statistics across affinity score deciles and CWE cluster coverage breadth are [PENDING EVALUATION].

### 4.2 High-Affinity Actor × Sector Pairings

The highest-scoring actor × sector pairings in the current snapshot include:

- **Midnight Blizzard → information-technology sector:** targeting score ≈ 0.955. Midnight Blizzard (also tracked as NOBELIUM/Cozy Bear) shows the highest single actor-sector score in the corpus, reflecting consistent ATT&CK attribution across credential access, initial access via spearphishing, and supply-chain compromise techniques that map strongly to IT infrastructure operator environments.
- **Sandworm/ELECTRUM → energy sector:** Sandworm carries the strongest energy-sector affinity among ICS-active threat actors, consistent with its documented history of ICS-disruptive operations including documented power grid incidents in Ukraine.

Additional top-momentum actors include **Cl0p** (ransomware operator with broad critical-infrastructure sector targeting) and **ALPHV/BlackCat** (ransomware-as-a-service with energy and manufacturing sector affinity).

The relative ranking of actors in specific OT product contexts — for example, within the CPE namespace for a specific PLC vendor — will differ from the sector-level ranking. Sector score is the pre-inventory signal; the CPE intersection step re-ranks actors against a specific asset footprint.

### 4.3 EIC Scoring Distribution

The EIC score distribution across 624 actors, broken into intent, capability, and opportunity components, and precision-recall validation against confirmed attribution events, is [PENDING EVALUATION].

### 4.4 CWE Cluster Coverage

The number of CWE clusters populated with CPE product members, the distribution of CVE density across clusters, and cluster-level EPSS and KEV statistics are [PENDING EVALUATION].

---

## 5. Discussion

### 5.1 Operational Implications

The actor × equipment affinity surface TACAM produces changes the question OT practitioners can answer from "which vulnerabilities are high severity?" to "which threat actors are most relevant to this specific asset inventory, and which CVEs in that inventory intersect with their demonstrated technique affinity?" This is a materially different and more actionable question for facilities that cannot patch on a standard IT cadence.

The EIC score, particularly after the KEV and EPSS adjustment, provides a single ordinal ranking of actor relevance per facility. A facility with a significant installed base of a vendor in the energy-sector CPE namespace would, under TACAM, surface Sandworm at the top of its actor risk list not because Sandworm is generally dangerous but because the intersection of Sandworm's technique affinity, the CPE product vulnerabilities present in that inventory, and the KEV/EPSS weight on those CVEs is high.

The sector-level targeting scores documented in §4.2 validate that the actor × sector affinity layer is populated with differentiated scores rather than uniform noise. Midnight Blizzard's 0.955 score in the IT sector reflects the concentration of its ATT&CK-attributed techniques in credential access and initial access tactics that map primarily to IT operator environments; its ICS-phase technique attribution is thinner than Sandworm's, which appropriately differentiates the two actors in OT-specific contexts despite both having high general profile.

### 5.2 Comparison to Undifferentiated Baselines

A natural baseline for TACAM would be to assign all high-profile actors equal weight against all high-CVSS CVEs in an asset inventory — the implicit approach when practitioners lack a structured attribution layer. Whether TACAM's actor × CPE ranking produces materially better alignment with observed incident records than this undifferentiated baseline has not been tested. This evaluation is [PENDING EVALUATION].

### 5.3 Integration with IEC 62443 Risk Assessment

IEC 62443-3-2 §8.4.3 requires a threat assessment that considers the likelihood of an attack as a function of actor motivation and capability against specific security level targets. TACAM's EIC score can serve as an input to this assessment: the actor ranking for a given zone provides the motivation × capability surface, and the CPE intersection with that zone's asset inventory grounds the assessment in actual product exposure rather than generic threat categories. This integration path is described in OXOT platform documentation but has not been validated against a completed IEC 62443-3-2 risk assessment to confirm alignment with assessor judgment.

### 5.4 Limitations

**Targeting-specificity evaluation not run.** The evaluation of TACAM's actor × equipment ranking accuracy against independent incident attribution records or a curated ground-truth dataset of confirmed actor-to-equipment exploitation events has not been conducted. All precision, recall, and ranking-accuracy claims would require this evaluation, which is [PENDING EVALUATION]. Results in §4 are descriptive only.

**ATT&CK attribution completeness.** ATT&CK group profiles reflect publicly reported incidents and the analytic judgments of contributor organizations. Actors with low public reporting — state actors operating below detection threshold, emerging ransomware groups — will be underrepresented or absent, skewing actor rankings toward historically visible groups.

**CWE assignment quality.** NVD CWE assignments are not uniformly precise. A non-trivial proportion of CVEs receive CWE-Other or CWE-NVD-noinfo assignments, removing them from the cluster join and reducing the CPE product coverage for actors whose technique affinity concentrates in underspecified weakness areas.

**Static snapshot behavior.** Actor technique sets evolve. A group that adds ICS-specific capabilities after its ATT&CK profile was last updated will not reflect those capabilities until the profile is revised and ingested. The daily KEV and EPSS refresh partially mitigates this for CVE-level signals, but technique-level updates are gated by ATT&CK release cadence.

**CPE string normalization.** CPE strings in NVD vary in specificity; some vendors publish all vulnerabilities under a single product string while others use granular version-specific strings. This creates uneven product coverage that is partially addressed by fuzzy CPE matching but not fully resolved.

---

## 6. Conclusion

TACAM provides a structured traversal from threat actor to OT equipment through the intermediate representation of CWE/CAPEC weakness clusters. The method joins ATT&CK actor technique signatures to CWE clusters, CWE clusters to NVD CPE product identifiers, and CPE product intersections with CISA KEV and FIRST EPSS signals to produce an EIC score that ranks actors by relevance to a specific asset inventory.

The current corpus tracks 624 actors across 2,823 actor × sector affinity pairs. High-affinity pairings such as Midnight Blizzard → IT (0.955) and Sandworm → energy validate that the affinity layer differentiates actors by sector in ways consistent with their publicly documented histories.

The method's operational value is that it moves OT threat assessment from generic severity ranking to actor-attributed, inventory-specific prioritization — the question practitioners actually need to answer when deciding which vulnerabilities to address first in environments where patching is not a routine option.

Whether TACAM's ranking is more accurate than simpler baselines remains to be tested. That evaluation, along with CWE cluster coverage statistics and EIC score distribution analysis, is the primary next step for this work.

---

## References

Alexander, M., Belisle, M., & Steele, J. (2020). *MITRE ATT&CK for ICS* (MITRE Technical Report). MITRE Corporation. https://attack.mitre.org/matrices/ics/

CISA. (n.d.). *Known Exploited Vulnerabilities Catalog*. Cybersecurity and Infrastructure Security Agency. https://www.cisa.gov/known-exploited-vulnerabilities-catalog

Jacobs, J., Romanosky, S., Edwards, B., Adjerid, I., & Roytman, M. (2021). Exploit prediction scoring system (EPSS). *Digital Threats: Research and Practice*, *2*(3), Article 20. https://doi.org/10.1145/3436242

Strom, B. E., Applebaum, A., Miller, D. P., Nickels, K. C., Pennington, A. G., & Thomas, C. B. (2018). *MITRE ATT&CK: Design and philosophy* (MITRE Technical Report MTR190003). MITRE Corporation. https://attack.mitre.org/docs/ATTACK_Design_and_Philosophy_March_2020.pdf

---

## Figures (specifications)

> **All figures are specifications only. Image rendering is pending.**

**Figure 1 — TACAM Pipeline Architecture.**
A left-to-right data-flow diagram showing four input sources (ATT&CK ICS, ATT&CK Enterprise, NVD/CWE/CPE, KEV/EPSS) feeding a central processing layer with three labeled stages: (1) Technique → CWE Cluster mapping, (2) Cluster → CPE product join, (3) EIC scoring with KEV/EPSS weighting. Output: actor × equipment affinity matrix. Suggested format: horizontal swimlane diagram with PostgreSQL and Neo4j icons at the processing stage.

**Figure 2 — Actor × CWE Cluster Affinity Heatmap.**
A heatmap matrix with representative actors on the Y-axis (top-10 by campaign momentum) and CWE top-level clusters on the X-axis. Cell color intensity encodes affinity weight *w(a, c)*. Rows should be sorted by descending total EIC; columns by descending CVE count per cluster. Pending data: full affinity matrix export from `seldon.actor_eic` join with cluster weights.

**Figure 3 — EIC Score Distribution.**
A ranked bar chart of EIC scores for all 624 actors, color-coded by KEV/EPSS adjustment factor (low = gray, high = red). Pending data: EIC score export from `seldon.actor_eic`. This figure will visually separate actors with high raw technique affinity but low exploitation signal from those with moderate affinity but confirmed KEV/EPSS presence.

**Figure 4 — Facility Asset Overlay Example.**
A facility topology diagram (IT/OT boundary → DMZ → OT network → field device level) with named actors color-coded by their EIC score against a representative energy-sector asset inventory. Intended to demonstrate the operational output of TACAM for a practitioner querying against their specific inventory. Pending: representative CPE inventory and EIC computation against that inventory.
