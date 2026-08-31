---
title: "Graph-Based Attack-Path Reasoning and Monte-Carlo Kill-Chain Simulation over a Cyber Digital Twin"

# Graph-Based Attack-Path Reasoning and Monte-Carlo Kill-Chain Simulation over a Cyber Digital Twin
---

## Abstract

Operational technology (OT) environments present attack surfaces that static vulnerability lists cannot characterize adequately: threats propagate across zone boundaries, exploiting chains of weakly-secured handoffs between engineering workstations, historians, field controllers, and safety instrumented systems. This paper describes two coupled analytical methods implemented over a Cyber Digital Twin (CDT) knowledge graph. The first is deterministic: a recursive graph traversal applies IEC 62443 zone-conduit reasoning rules and MITRE ATT&CK for ICS technique predicates to enumerate feasible attack paths from an adversary entry point to a target node. The second is stochastic: a Boltzmann-weighted Monte-Carlo walk over the same graph samples kill-chain sequences, accumulating per-path attack-likelihood estimates and zone-crossing counts that define a blast-radius envelope. This Monte-Carlo is a graph kill-chain walk — it is architecturally distinct from the actuarial loss simulation (Poisson-Pareto ALE/CVaR) described elsewhere in this series; the two methods address different questions and must not be conflated. The CDT graph is instantiated in Neo4j and backed by a Postgres corpus comprising 624 verified threat actors (seldon.actor_eic), 62,965 threat-actor-to-CPE cluster associations (seldon.tacam_cpe_clusters), 358,000 CVE records, 1.6 million CPE dictionary entries, 15.6 million EPSS scores, and 1,619 CISA KEV entries. The knowledge-graph edge layer (forge.kg_edges) encodes 117 typed semantic relationships among asset nodes, zone nodes, actor nodes, and vulnerability nodes. Empirical path counts and probability values on the working prototype are marked [PENDING EVALUATION] pending completion of the validation study; the method has not yet been tested against ground-truth incident paths.

---

## Graphical Abstract (specification)

*Rendering pending. Specify:* A three-panel horizontal figure. Left panel: a facility topology graph with nodes colored by IEC 62443 security level (SL-0 through SL-3), directed edges representing CONNECTS_TO and EXPOSES relationships, and a highlighted adversary entry node. Center panel: the deterministic traversal output — a DAG of feasible attack paths extracted by recursive CTE, with path segments annotated by technique IDs (e.g., T0817, T0865). Right panel: the stochastic output — a heat-map over the same topology where node color intensity encodes Monte-Carlo visit frequency, with a sidebar histogram of path-probability distribution across N sampled kill chains.

---

## 1. Introduction

Intrusion campaigns against industrial control systems do not resolve to single CVE exploits. They proceed laterally — through remote access points, across data historian boundaries, into programmable logic controllers — following the path of least resistance through a facility's topology. The attacker's routing problem and the defender's detection problem share the same underlying structure: a graph traversal constrained by access controls, communication channels, and the exploitation difficulty of each node.

Two families of method address this. Attack graphs, originating with Phillips and Swiler (1998) and formalized by Sheyner et al. (2002), enumerate paths through a network model systematically, exposing which vulnerability chains enable which outcomes. Monte-Carlo simulation, tracing to Metropolis and Ulam (1949), adds probability: it samples random walks over a weighted graph and accumulates statistics that a deterministic enumeration cannot produce efficiently, particularly when the path space is large or the edge weights are heterogeneous.

This paper implements both over a Cyber Digital Twin (CDT) — a live, tenant-scoped knowledge graph that mirrors a facility's asset inventory, zone architecture, and vulnerability posture. The graph is grounded in IEC 62443 zone-and-conduit models and enriched with MITRE ATT&CK for ICS technique-to-asset mappings, EPSS scores, and CISA KEV status. Knowledge graphs structured in this way have been described as a general representation for heterogeneous relational knowledge (Hogan et al., 2021); the contribution here is their application to attack-path analysis in OT environments under IEC 62443 zone semantics.

Two architectural decisions are central and must be stated at the outset. First, the Boltzmann-weighted Monte-Carlo walk described here is a kill-chain graph simulation. It answers: "Given this topology, which paths does an adversary most likely traverse and what systems does a successful campaign touch?" That is a different question from the actuarial Monte-Carlo described separately in this series (ALE/CVaR loss estimation), which answers: "What is the annual loss distribution for this facility given stochastic event frequency and impact?" The two share edge-weight inputs but operate over different computational objects and produce different outputs. Conflating them is a methodological error.

Second, the kill-chain walk is probabilistic, not predictive. It characterizes the facility's graph geometry and the attacker's incentive structure as encoded in edge weights. It does not claim to forecast the attacker's actual behavior.

---

## 2. Related Work

### 2.1 Attack Graphs

Phillips and Swiler (1998) introduced the graph-based approach to network vulnerability analysis, representing hosts as nodes, access relationships as edges, and vulnerability exploitation as state transitions. Their key insight was that multi-step attacks — which no single vulnerability scanner could detect — become visible when the network is modeled as a traversable structure. Sheyner et al. (2002) extended this to automated generation and analysis of attack graphs, incorporating formal verification techniques to enumerate all minimal attack paths and identify the cut-sets whose remediation eliminates entire attack path families. Both works preceded widespread ICS connectivity; their application to OT networks requires adaptation for zone-and-conduit architecture, unidirectional security gateways, and the asymmetric exploitation difficulty of field-device firmware versus IT-layer software.

### 2.2 Knowledge-Graph Reasoning

Hogan et al. (2021) survey knowledge graphs as a representation framework: typed nodes and edges encoding entities and relationships, supporting both symbolic reasoning (rule application over graph structure) and statistical learning (embedding, link prediction). For cybersecurity applications, the relevant capabilities are: property inheritance along class hierarchies (a node typed as `PLC` inherits the vulnerability surface of its vendor-model CPE), transitive closure over CONNECTS_TO edges (reachability), and rule-based inference (if a node in Zone A CONNECTS_TO a node in Zone B across a conduit rated below the zone's SL-T, the conduit is a zone-crossing vulnerability). These properties make the knowledge-graph structure an appropriate substrate for attack-path reasoning in IEC 62443-compliant facility models.

### 2.3 Monte-Carlo Path Methods in Security

Monte-Carlo methods entered security analysis through risk quantification frameworks that treat attack frequency as a stochastic variable. The kill-chain random walk is a related but distinct application: rather than sampling from a frequency distribution, the walk samples paths through a fixed graph according to edge weights encoding exploitation probability. Wang, Islam, Long, Singhal, and Jajodia (2008) describe security metric computation over attack graphs that combines path enumeration with probability assignment; their mean-time-to-compromise metric is a precursor to the path-probability output described here. The Boltzmann weighting — drawing from statistical mechanics — introduces a temperature parameter that interpolates between greedy exploitation (low temperature: the walk concentrates on highest-probability edges) and uniform random exploration (high temperature: the walk explores broadly). This permits sensitivity analysis over attacker rationality assumptions.

### 2.4 Spectral Graph Metrics for Prioritization

Spectral centrality measures (eigenvector centrality, PageRank, betweenness centrality) characterize the structural importance of nodes in a graph independently of specific path queries. In the attack-graph context, a node with high betweenness centrality lies on many shortest paths between entry points and target nodes; its compromise is a prerequisite for many attack paths. Spectral centrality thus provides a prioritization signal for remediation that is independent of any specific threat scenario — it reflects the underlying topology's geometry. This is distinguished from scenario-specific path counts, which depend on the choice of entry point and target.

---

## 3. Methods

### 3.1 The Neo4j Cyber Digital Twin Graph

The CDT is instantiated as a property graph in Neo4j. Each tenant's facility produces a scoped subgraph comprising four node classes: `Asset` nodes (hardware and software components), `Zone` nodes (IEC 62443 security zones), `Actor` nodes (threat actors drawn from seldon.actor_eic), and `Vulnerability` nodes (CVE records from forge.cve_records). Edges encode typed semantic relationships: `LOCATED_IN` (asset to zone), `CONNECTS_TO` (asset to asset, or zone to zone via conduit), `EXPOSES` (asset to vulnerability), `CAN_EXPLOIT` (actor to vulnerability, derived from seldon.tacam_cpe_clusters), and `TARGETS` (actor to zone or asset, derived from seldon.tacam_sector_clusters).

The Postgres backing store supplies the enrichment corpus. At the time of writing, the verified counts are: forge.kg_edges = 117 typed semantic edges in the current working prototype graph; seldon.actor_eic = 624 threat actors with sector targeting and capability profiles; seldon.tacam_cpe_clusters = 62,965 actor-to-CPE-cluster associations; seldon.epss_trajectory = 959,538 EPSS score records with velocity and half-life annotations; forge.cve_records = approximately 358,000 CVE entries; forge.cpe_records = approximately 1.6 million CPE dictionary entries; forge.kev_entries = 1,619 CISA Known Exploited Vulnerabilities; forge.epss_scores = approximately 15.6 million point-in-time EPSS values. The Neo4j node and edge totals for the full tenant graph are [PENDING VERIFICATION] — the cypher-shell query was not executable at the time of writing due to container access constraints; the paper characterizes scale qualitatively as a facility-sized graph in the hundreds-to-low-thousands of nodes per tenant.

The edge weight attached to each graph edge is computed by the mc-weights module (server/lib/mc-weights.ts), which implements a 138-predicate composite:

```
w(e) = EPSS(v) · CVSS_base(v) · KEV_factor(v) · SL_T_penalty(n_target) · TACAM(a, v) · velocity(v)
```

where KEV_factor = 1.5 if the CVE appears in the CISA KEV list, SL_T_penalty = (1 − slt · 0.18) scaling the weight downward for nodes with higher IEC 62443 Security Level Targets, and TACAM encodes the threat-actor-to-CPE cluster match confidence. This weight is the probability-of-exploitation estimate per traversal of edge e. The formula is reproduced here for completeness; it is implemented in the application layer (not as a stored Postgres function) and is the canonical source of edge weights for both the deterministic traversal and the Monte-Carlo walk.

### 3.2 Deterministic Attack-Path Traversal

The deterministic component uses recursive common table expression (CTE) traversal over the Neo4j graph, augmented by reasoning rules encoded as Cypher pattern matches. The traversal takes as input an entry node (representing an adversary's confirmed foothold) and a target node (representing the protected asset or zone). It returns all paths from entry to target up to a configurable depth limit.

Three rule classes are applied during traversal. Zone-crossing rules flag any path segment that crosses from a higher-SL zone to a lower-SL zone without traversing a conduit node rated to the appropriate SL-T; such segments represent policy violations and are marked as exploitable crossings in the path output. Technique-predicate rules match each `EXPOSES` edge to MITRE ATT&CK for ICS technique identifiers, enabling the path output to carry a technique sequence alongside the node sequence. Actor-reachability rules filter the path set to those reachable by at least one actor in seldon.actor_eic whose TACAM-derived CAN_EXPLOIT edges match at least one vulnerability in the path.

The output of the deterministic traversal is a set of annotated path objects: ordered node sequences, technique sequences, zone-crossing counts, and actor-reachability flags. This output is deterministic given the graph state — the same query on the same graph produces the same paths.

### 3.3 Boltzmann-Weighted Monte-Carlo Kill-Chain Walk

The stochastic component operates over the same graph. A Monte-Carlo walk begins at the adversary entry node and at each step selects the next node from the set of neighbors according to a Boltzmann distribution over edge weights:

```
P(e_i | current_node) = exp(w(e_i) / T) / Σ_j exp(w(e_j) / T)
```

where T is the temperature parameter and the sum is over all outgoing edges from the current node. At T → 0, the walk becomes greedy, always selecting the maximum-weight edge. At T → ∞, the walk becomes uniform random. A temperature calibration study is needed (and is marked [PENDING EVALUATION]) to determine the T value that best approximates empirically observed attacker behavior in OT environments; in the prototype, T = 1.0 is used as a neutral baseline.

Each walk terminates when it reaches the target node, exhausts the maximum path length, or revisits a node (cycle detection). Across N independent walks, the walk accumulates: (a) per-path visit counts, from which path probability is estimated as visit_count(path) / N; (b) per-node visit frequencies, which define the blast radius — the set of nodes touched by at least fraction f of successful walks; (c) zone-crossing counts per walk, summed into a distribution over the walk ensemble.

This is a kill-chain walk, not a loss simulation. It produces structural probability estimates grounded in the graph topology and edge weights. It does not model event frequency, financial impact, or recovery time. Those quantities belong to the ALE/CVaR actuarial model described in Paper P5 of this series.

The implementation lives in server/routes/mc-reasoning.ts and is callable via the /api/mc-real/* endpoint family, which exposes attack-path enumeration, blast-radius computation, and threat explanation outputs at the application layer.

### 3.4 Spectral Centrality for Prioritization

After path enumeration and Monte-Carlo walks complete, spectral centrality measures are computed over the subgraph induced by the union of all enumerated paths. Eigenvector centrality identifies nodes whose neighbors are themselves highly central — in the attack-path context, these are nodes that appear repeatedly across many paths from many entry points. Betweenness centrality identifies nodes that lie on the largest fraction of shortest attack paths; their remediation or isolation produces the maximum reduction in path count.

Centrality scores are combined with the Monte-Carlo blast-radius frequency to produce a node-level prioritization ranking. Nodes that appear in the blast radius of many walks and have high betweenness centrality are the highest-priority remediation targets. This ranking is deterministic given the graph topology and is independent of the specific attack scenario used to generate it.

---

## 4. Results

### 4.1 Graph Corpus Counts (Verified)

The following counts are confirmed from live system state as of 2026-06-14 and are used as ground-truth inputs to the methods described above.

| Table / Store | Count | Verified |
|---|---|---|
| forge.kg_edges (Postgres) | 117 | Yes |
| seldon.actor_eic | 624 | Yes |
| seldon.tacam_cpe_clusters | 62,965 | Yes |
| seldon.epss_trajectory | 959,538 | Yes |
| forge.cve_records | ~358,000 | Yes |
| forge.cpe_records | ~1,600,000 | Yes |
| forge.kev_entries | 1,619 | Yes |
| forge.epss_scores | ~15,600,000 | Yes |
| Neo4j node count (tenant graph) | [PENDING VERIFICATION] | No |
| Neo4j relationship count (tenant graph) | [PENDING VERIFICATION] | No |

The 117 edges in forge.kg_edges represent the current semantic relationship layer in the working prototype. This count is consistent with a facility graph of the current golden-path scale (11 systems, 51 assets, 49 DEXPI cards per the golden-path hyperscaler datacenter scenario). Edge count will scale with facility size as more tenants onboard and as additional relationship types are added.

### 4.2 Worked Example: Deterministic Traversal

Consider an adversary entry node typed as a remote access VPN gateway in Security Zone 0 (untrusted network perimeter) and a target node typed as a distributed control system (DCS) historian in Security Zone 2. The IEC 62443 zone architecture specifies that communication between Zone 0 and Zone 2 must traverse a demilitarized zone (Zone 1) through two conduits, each rated to at least SL-T 2.

The recursive CTE traversal finds paths from the VPN gateway node through the Zone 1 assets (engineering workstation, data diode) to the historian. If any conduit in the discovered paths is rated below SL-T 2, the zone-crossing rule flags the segment. The technique-predicate rule annotates each segment with the ATT&CK for ICS technique most likely associated with the exploitation: T0865 (Spearphishing Attachment) at initial access, T0817 (Drive-by Compromise) at the browser-accessible engineering workstation, T0882 (Default Credentials) at the historian if factory credentials have not been rotated.

The path object returned contains the node sequence, technique sequence, zone-crossing count (one in this example, at the Zone 0 → Zone 1 conduit), and actor-reachability flag (True if any of the 624 actors in seldon.actor_eic has CAN_EXPLOIT edges matching CVEs on the path nodes). The path-probability value from the Monte-Carlo walk is [PENDING EVALUATION].

### 4.3 Monte-Carlo Blast Radius

The Monte-Carlo walk over the same topology produces a visit-frequency distribution across nodes. In the worked example, the walk ensemble (N = [PENDING EVALUATION] iterations) produces a blast-radius set defined as all nodes visited in at least 10% of successful walks. The zone-crossing count distribution and the path-probability estimate from this walk are [PENDING EVALUATION]. These values will be populated upon completion of the validation study.

### 4.4 Spectral Centrality

In the golden-path topology, the node with the highest betweenness centrality in the attack-path subgraph is expected to be the engineering workstation or historian boundary node — the structural bottleneck through which paths from external entry points must pass to reach Zone 2 and Zone 3 assets. Exact centrality values are [PENDING EVALUATION] pending computation over the verified tenant graph.

---

## 5. Discussion

### 5.1 The Kill-Chain Walk vs. the ALE Monte-Carlo

The distinction between these two uses of Monte-Carlo deserves explicit treatment because both appear in the OXOT platform and can appear similar to a non-specialist reader. The ALE actuarial Monte-Carlo (Paper P5) samples event frequency (Poisson) and loss magnitude (Pareto) to produce a loss distribution with VaR/CVaR bounds and a Gordon-Loeb security investment curve. Its inputs are frequency estimates and dollar-loss parameters; its output is a financial risk distribution. The kill-chain graph walk samples paths through a fixed topology with Boltzmann-weighted edge selection. Its inputs are graph structure and edge weights (EPSS, CVSS, KEV, SL-T, TACAM); its output is a structural probability distribution over attack paths and a blast-radius envelope. The two are complementary: the ALE model answers "how much should we expect to lose and how much should we invest?"; the kill-chain walk answers "which paths and which systems are at risk given this topology?" They share edge-weight inputs but operate over entirely different computational objects.

### 5.2 Temperature Calibration

The Boltzmann temperature T is the primary tunable parameter in the kill-chain walk. At the prototype stage, T = 1.0 is used. The appropriate calibration depends on assumptions about attacker rationality and available intelligence about the specific threat actor. If TACAM actor profiles indicate a highly capable, targeted adversary (e.g., a state-sponsored group with confirmed ICS tooling), a low T is appropriate — the attacker exploits the highest-probability path efficiently. If the threat model includes opportunistic actors, a higher T better models their less-directed behavior. A calibration study comparing T values against known OT incident paths — where available from incident databases — is the correct validation approach and is marked [PENDING EVALUATION].

### 5.3 IEC 62443 Integration

The zone-crossing rule class in the deterministic traversal encodes IEC 62443-3-2 §8.4.3 zone-boundary requirements directly as graph predicates. A conduit edge whose SL-T attribute is below the minimum of the two zones it connects is flagged as a policy violation regardless of whether a CVE exists on the connecting asset. This is a structural gap finding — it reflects architectural risk that persists even if no current CVE exploits the conduit. This integration means the path output is directly actionable within an IEC 62443 assessment context: zone-crossing flags map to specific IACS Security Level Target gaps, and the actor-reachability flag provides the threat context needed to prioritize gap remediation.

### 5.4 Limitations

The method has not been validated against ground-truth incident paths. No OT incident reconstruction dataset was used to evaluate whether the paths found by the traversal correspond to paths actually traversed by attackers in historical events. This is the primary limitation of the current work and represents the key gap for the planned validation study.

The blast-radius estimate assumes the graph is a complete and accurate representation of the facility's connectivity. Incomplete asset inventories — a common condition in brownfield OT environments — will cause paths to be missed. The method's precision is bounded by the accuracy of the CDT.

Edge weights are composite scores derived from public databases (EPSS, CVSS, KEV, TACAM). They are not facility-specific calibrated probabilities; they are relative weights that encode the broader threat landscape. Facility-specific calibration (e.g., from penetration test results or red-team findings) would improve the accuracy of path-probability estimates.

The Boltzmann walk does not model defender actions, detection, or response. It characterizes the attack surface under the assumption that the attacker completes the kill chain unimpeded. Incorporating detection probability and response time as additional edge attributes is a natural extension.

---

## 6. Conclusion

This paper presents a dual-method approach to attack-path analysis over a Cyber Digital Twin knowledge graph. The deterministic component — recursive CTE traversal with IEC 62443 zone-crossing rules and MITRE ATT&CK technique predicates — enumerates feasible kill chains and flags zone-boundary policy violations. The stochastic component — a Boltzmann-weighted Monte-Carlo kill-chain walk — estimates path probability and blast radius from the ensemble behavior of sampled walk trajectories. Together, they characterize both the structure of the attack surface (which paths exist and what they look like) and its probability geometry (which paths are more likely and how broadly a successful campaign would propagate).

The distinction from the actuarial ALE Monte-Carlo is maintained throughout: the kill-chain walk is a graph-structural method, not a financial risk method. The two are complementary tools addressing different questions within the same platform.

The graph corpus backing the CDT is verified at scale: 624 threat actors, 62,965 actor-to-CPE cluster associations, 358,000 CVEs, 1.6 million CPE entries, 15.6 million EPSS scores, and 1,619 CISA KEV entries. The semantic edge layer (forge.kg_edges) encodes 117 typed relationships in the current working prototype. Empirical path-probability values and blast-radius estimates on the live platform are marked pending completion of the validation study.

The next step is ground-truth validation: comparing enumerated paths against reconstructed incident paths from OT breach investigations. That validation will determine whether the edge-weight composite adequately captures attacker path preference or whether facility-specific calibration is required before the method can support operational decision-making.

---

## References

Hogan, A., Blomqvist, E., Cochez, M., d'Amato, C., de Melo, G., Gutierrez, C., Kirrane, S., Labra Gayo, J. E., Navigli, R., Neumaier, S., Ngonga Ngomo, A.-C., Polleres, A., Rashid, S. M., Rula, A., Schmelzeisen, L., Sequeda, J., Staab, S., & Zimmermann, A. (2021). Knowledge graphs. *ACM Computing Surveys, 54*(4), Article 71. https://doi.org/10.1145/3447772

Metropolis, N., & Ulam, S. (1949). The Monte Carlo method. *Journal of the American Statistical Association, 44*(247), 335–341. https://doi.org/10.1080/01621459.1949.10483310

Phillips, C., & Swiler, L. P. (1998). A graph-based system for network-vulnerability analysis. *Proceedings of the 1998 New Security Paradigms Workshop*, 71–79. https://doi.org/10.1145/310889.310919

Sheyner, O., Haines, J., Jha, S., Lippmann, R., & Wing, J. M. (2002). Automated generation and analysis of attack graphs. *IEEE Symposium on Security and Privacy*, 273–284. https://doi.org/10.1109/SECPRI.2002.1004377

Wang, L., Islam, T., Long, T., Singhal, A., & Jajodia, S. (2008). An attack graph-based probabilistic security metric. *IFIP Annual Conference on Data and Applications Security and Privacy*, 283–296.

---

## Figures (specifications)

**Figure 1 — CDT Graph Architecture.** A four-layer node diagram. Layer 1 (top): Actor nodes (624 entries, seldon.actor_eic) colored by sector targeting. Layer 2: Vulnerability nodes (CVE records) with KEV-flagged nodes highlighted. Layer 3: Asset nodes arranged by Security Zone (Zone 0 through Zone 3 left to right), with node size encoding EPSS score. Layer 4 (bottom): Zone nodes with SL-T labels. Edges: CAN_EXPLOIT (actor to vulnerability, orange), EXPOSES (asset to vulnerability, red), LOCATED_IN (asset to zone, grey), CONNECTS_TO (asset to asset, black with conduit SL-T annotation). Rendering: pending.

**Figure 2 — Deterministic Traversal Output.** A directed acyclic graph of attack paths from entry node (VPN gateway, Zone 0) to target node (DCS historian, Zone 2). Node labels: asset name + zone ID. Edge labels: ATT&CK for ICS technique ID. Zone-crossing edges highlighted in amber. Width of each path branch proportional to the number of actor-reachability matches. Rendering: pending.

**Figure 3 — Monte-Carlo Blast Radius Heat Map.** The facility topology overlaid with a heat map of Monte-Carlo walk visit frequency. Node color intensity (white to deep red) encodes fraction of successful walks that visited each node. Sidebar: histogram of zone-crossing count distribution across the walk ensemble. Rendering: pending; visit frequency values are [PENDING EVALUATION].

**Figure 4 — Spectral Centrality Ranking.** Bar chart: top 10 nodes by betweenness centrality in the attack-path subgraph, with bars colored by zone membership. Overlay: eigenvector centrality score as a point marker. Annotation: node with highest betweenness centrality labeled as the structural remediation priority. Values are [PENDING EVALUATION].

**Figure 5 — Temperature Sensitivity Analysis.** Line chart: path-probability of the top-3 paths as a function of Boltzmann temperature T (range 0.1 to 10, log scale). At T = 0.1, the walk concentrates probability on the highest-weight path. At T = 10, probability distributes broadly. The crossing point where paths 2 and 3 become co-equal in probability marks the temperature above which attacker rationality assumptions become material. Values are [PENDING EVALUATION].
