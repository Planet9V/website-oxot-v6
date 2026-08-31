---
title: "Constructing a Layered Cyber Digital Twin: A DEXPI- and NER-Grounded Ontology for OT/ICS"
tags: [oxot, ontology, dexpi, ner, cyber-digital-twin, iec62443, knowledge-graph, imrad, draft]
status: draft-imrad
created: 2026-06-16
authors: [McKenney, J.]
paper_id: P6
series: OXOT Research Series
---

# Constructing a Layered Cyber Digital Twin: A DEXPI- and NER-Grounded Ontology for OT/ICS

**Paper P6 — OXOT Research Series**
*Status: Draft — IMRAD*

---

## Abstract

Operational technology (OT) and industrial control systems (ICS) environments present a structural challenge to security analytics: the asset corpus is heterogeneous, the engineering documentation is siloed, and no standard queryable representation spans facility topology, device inventory, vulnerability exposure, and threat actor behavior simultaneously. This paper introduces a layered ontology for OT/ICS Cyber Digital Twins (CDTs), organized across eight levels (L0 facility to L7 temporal-event), and describes the automated pipeline used to populate it. The lowest structural layers (L1–L3) are populated from DEXPI 2.0 Proteus-XML P&ID files, extracting zones, systems, conduits, and equipment instances using schema-driven ingestion. Upper layers (L4–L6) are populated by named-entity recognition (NER) over heterogeneous engineering documents — datasheets, inspection records, vendor manuals — extracting device identifiers, firmware versions, and software strings that feed a canonical asset profile. The populated ontology is projected into a Neo4j knowledge graph and a pgvector embedding store, providing the queryable substrate for downstream risk scoring, IEC 62443 Security Level Target (SL-T) calibration, and threat actor correlation. A worked example traces a single DEXPI P&ID file through ingestion to ontology population. Formal NER extraction benchmarks are pending; all quantitative results in this paper are verified database counts or are marked [PENDING VERIFICATION] / [PENDING EVALUATION].

---

## Graphical Abstract (Specification)

> **Figure specification — rendering pending.**
> A three-column flow diagram. Left column: input artifacts (DEXPI P&ID XML, vendor datasheets, inspection PDFs, CVE/KEV corpus). Center column: processing pipeline boxes (schema-driven Proteus ingestion → NER extraction → canonicalization → ontology population). Right column: the eight-layer CDT ontology stack (L0–L7), with downward arrows indicating population direction and upward arrows indicating query paths. Color bands distinguish the structural layers (L0–L3, blue), the information layers (L4–L6, orange), and the temporal event layer (L7, red). Output artifacts shown: Neo4j knowledge graph, pgvector store, IEC 62443 SL-T surface.

---

## 1. Introduction

A Cyber Digital Twin is a continuously updated, queryable model of a physical system that captures both engineering structure and security posture. For OT/ICS environments — process plants, substations, rail control centers, data center mechanical infrastructure — the practical barriers to building one are significant. Engineering drawings exist as P&ID PDFs or proprietary CAD files. Device inventories are maintained in spreadsheets, or not at all. Vulnerability data arrives as CVE feeds with no automatic binding to specific site equipment. Threat intelligence exists in unstructured reports, disconnected from asset context.

Existing approaches address parts of this problem in isolation. Industrial ontologies such as ISO 15926 provide semantic frameworks for plant information but do not extend to security semantics. The DEXPI initiative (Data Exchange in the Process Industry) standardizes P&ID data exchange via the Proteus-XML schema, making it machine-readable, but does not address the information extraction problem for unstructured documents. Security frameworks such as IEC 62443 define asset classification requirements (zones, conduits, Security Levels) but provide no automated population mechanism.

This paper presents a design that bridges these gaps. The contribution is threefold. First, we specify a layered ontology for OT/ICS CDTs that extends from physical facility topology (L0) to temporal event sequences (L7), providing a single representational framework for structural, informational, and behavioral data. Second, we describe an automated pipeline that populates the structural layers from DEXPI 2.0 Proteus-XML and the information layers from NER over engineering documents. Third, we describe the projection of this ontology into a Neo4j knowledge graph and a pgvector embedding store, and characterize the current population state of the system.

The paper is organized as follows. Section 2 reviews related work across industrial ontologies, NER, knowledge graphs, and IEC 62443 asset modeling. Section 3 describes the CDT architecture in detail. Section 4 reports results from current system deployment. Section 5 discusses implications and limitations. Section 6 concludes.

---

## 2. Related Work

### 2.1 Industrial Ontologies and DEXPI

The challenge of representing process plant knowledge in a computable form predates the security domain. ISO 15926, originally published in 2003, defines a reference data library and a generic knowledge representation model for the oil and gas industry, later generalized to process industries. It supports lifecycle integration across engineering tools but carries substantial complexity costs for adoption.

The DEXPI initiative took a narrower, more tractable path: standardizing the exchange format for P&ID diagrams. DEXPI 2.0, based on the Proteus-XML schema, defines a typed element vocabulary covering equipment items, nozzles, piping components, instrument loops, and signal lines. Approximately 100 equipment classes are defined in the core DEXPI schema, with supplementary coverage from CFIHOS (Capital Facilities Information HandOver Specification) contributing approximately 120 additional types. The practical significance of this vocabulary for security is that equipment classification — distinguishing a centrifugal pump from a heat exchanger from a pressure transmitter — is a precondition for vulnerability binding, because CPE (Common Platform Enumeration) lookups and threat actor targeting patterns differ by equipment category.

ISO 15926 and DEXPI are complementary rather than competing: DEXPI handles the diagram-level structural encoding, ISO 15926 handles the semantic identity of process objects over their lifecycle. This paper uses DEXPI as the primary structural input and does not attempt full ISO 15926 alignment, which remains future work.

### 2.2 Named Entity Recognition for Engineering Documents

Named entity recognition (NER) is the task of identifying and classifying spans of text as instances of predefined entity types — persons, organizations, locations, or in domain-specific settings, device models, firmware versions, or chemical compound names (Nadeau & Sekine, 2007). The engineering document domain presents difficulties not encountered in general-domain NER: terminology is highly technical, abbreviations are dense, and the same physical device may be referred to by manufacturer part number, plant tag, functional description, or P&ID symbol depending on the document type.

Deep-learning NER models — transformer-based architectures fine-tuned on domain corpora — have substantially advanced extraction quality on engineering text (Li et al., 2020). In the OT/ICS security domain, the relevant entity types include device vendor names, model strings, firmware version identifiers, software package names, and protocol references. Each of these maps to a structured representation (CPE, CVE, software bill of materials entry) that feeds downstream vulnerability binding.

The OXOT platform uses NER as a population mechanism: extraction results from datasheets, inspection reports, and maintenance records are canonicalized and inserted as asset profile attributes, binding structured inventory records to the engineering documentation that generated them.

### 2.3 Knowledge Graphs

Gruber (1993) defined an ontology as "a specification of a conceptualization" — a formal representation of the types, properties, and relationships within a domain. In the context of large, heterogeneous information sets, property graphs implemented in graph database systems provide a pragmatic realization of ontological structure that supports both schema enforcement and flexible schema extension.

Hogan et al. (2021) survey knowledge graph construction and querying at scale, covering entity extraction, canonicalization, embedding-based similarity, and downstream reasoning. Their taxonomy of knowledge graph populations distinguishes curated graphs (human-authored), collaborative graphs (community-authored), and automatically extracted graphs (pipeline-built). The OXOT CDT ontology sits in the third category: pipeline-built from structured DEXPI sources and semi-structured engineering documents, with human review gates at the canonicalization stage.

Graph embedding — projecting graph nodes and edges into dense vector spaces — allows semantic similarity queries that complement structural graph traversal. The combination of a property graph (Neo4j) and a vector store (pgvector) in the OXOT architecture reflects this dual-query model: structural traversal for topology and zone/conduit relationships, vector similarity for document-asset matching and threat actor profiling.

### 2.4 IEC 62443 Asset Modeling

IEC 62443 (ISA/IEC 62443 series) defines a security management framework for industrial automation and control systems. The architectural sections (IEC 62443-3-2, IEC 62443-3-3) require that facilities be segmented into zones and conduits, each assigned a Security Level Target (SL-T) derived from consequence analysis. IEC 62443-2-1 and IEC 62443-4-2 address security management and component-level requirements respectively.

The standard does not specify how zones and conduits are to be identified or how asset inventory within them is to be maintained. In practice this is done manually, with significant effort and inconsistency. The CDT ontology described here provides an automated basis for zone and conduit identification from P&ID structure, and an asset inventory from NER extraction, making the IEC 62443 zone model a derived artifact of the ontology rather than a separately maintained artifact.

---

## 3. Methods and Architecture

### 3.1 The L0–L7 CDT Ontology

The CDT ontology is organized into eight layers. The layering is not a strict hierarchy of abstraction levels — it is a separation of concerns that reflects how different data sources populate different aspects of the twin and how different analytic queries traverse it.

**L0 — Facility.** The root node. One facility node per deployment. Attributes: facility name, classification (process plant, substation, data center mechanical, etc.), geographic context, regulatory regime. All lower-layer nodes are scoped to this root.

**L1 — Zone.** IEC 62443-3-2 security zones derived from P&ID topology. A zone is a logical grouping of assets with a common security policy boundary. Attributes: zone identifier, SL-T (target Security Level, integer 1–4), description, P&ID source document identifier. Zone nodes are created by the DEXPI ingestion pipeline from pipeline segment groupings and engineering design documents; they may be refined by human review.

**L2 — System.** A system is a collection of functionally related equipment within a zone — a compressor train, a cooling loop, a SCADA subsystem. Attributes: system identifier, primary function, protocol references, primary vendor. System nodes may span multiple P&ID sheets; they are assembled from equipment groupings during ingestion.

**L3 — Conduit.** IEC 62443-3-2 conduits: communication paths between zones carrying data across security boundaries. Conduit nodes encode protocol, directionality, and the pair of zone nodes they connect. Conduits are the primary site of network segmentation controls.

**L4 — Asset.** Individual physical or virtual devices. Attributes: plant tag, device type (from DEXPI equipment class), vendor, model, firmware version, software version, CPE string (where resolvable), MAC address (where known), IP address (where known). Asset nodes are created from the DEXPI equipment inventory and enriched by NER extraction.

**L5 — Vulnerability.** CVE nodes linked to Asset nodes via a `HAS_VULNERABILITY` edge, qualified by confidence (exact CPE match, fuzzy match, inferred from equipment class) and by KEV (Known Exploited Vulnerability) status and EPSS score. This layer is populated from the CVE/CPE/KEV corpus maintained in the platform.

**L6 — Threat Actor.** Actor nodes drawn from the tracked actor intelligence layer. Linked to Vulnerability nodes via `CAN_EXPLOIT` edges (where actor TTPs intersect CVEs), to Asset nodes via `TARGETS` edges (where actor campaigns include equipment categories), and to System nodes via `HAS_TARGETED` edges (where campaign records name system types). The actor intelligence layer currently tracks 624 actors.

**L7 — Temporal Event.** Time-stamped event nodes: CVE publication events, KEV addition events, observed exploitation events, assessment findings, and SL-T recalibration events. This layer preserves the temporal dynamics of the security posture, enabling trend analysis and audit trail reconstruction.

### 3.2 DEXPI 2.0 / Proteus-XML Ingestion

A DEXPI 2.0 P&ID file is an XML document conforming to the Proteus schema. It contains typed element records for every object drawn on the P&ID: `PlantItem` elements for process equipment (tagged with a DEXPI `ComponentClass`), `PipingNetworkSegment` elements for pipe runs, `InstrumentComponent` elements for instrumentation, and `SignalLine` elements for control wiring.

The ingestion pipeline operates in four passes.

**Pass 1 — Parse.** The XML is parsed against the Proteus schema. Schema validation failures are logged and the document is quarantined for human review; partial ingestion is not performed.

**Pass 2 — Equipment extraction.** All `PlantItem` and `InstrumentComponent` elements are extracted. Each is assigned an L4 Asset node. The DEXPI `ComponentClass` attribute (drawn from the ~100 core DEXPI equipment classes and supplementary CFIHOS types) is stored as the `device_type` attribute and used for downstream CPE lookup.

**Pass 3 — Zone and conduit inference.** P&ID documents encode zone boundaries implicitly through pipeline segment groupings and instrument loop boundaries. The pipeline applies a ruleset derived from IEC 62443-3-2 §8.4 guidance to assign equipment items to zone candidates. Conduits are identified from `SignalLine` elements that cross zone boundaries. Zone and conduit assignments are flagged for engineering review before promotion to L1/L3 nodes.

**Pass 4 — System assembly.** Equipment items sharing a functional tag prefix (a convention common in process plant documentation) are grouped into L2 System nodes. Where no functional prefix convention is in place, system assignment defaults to the P&ID sheet of origin.

### 3.3 NER Over Engineering Documents

The NER extraction stage processes documents outside the structured DEXPI schema: PDF datasheets, scanned inspection records, vendor manuals, and maintenance logs. Documents are converted to plain text via PDF extraction; OCR is applied to scanned documents.

The NER model targets six entity types relevant to asset profiling: `VENDOR_NAME`, `MODEL_STRING`, `FIRMWARE_VERSION`, `SOFTWARE_PACKAGE`, `PROTOCOL_NAME`, and `PLANT_TAG`. Model strings and firmware versions are extracted as candidate CPE components; vendor names are normalized against a canonical vendor table using string similarity matching.

Extracted entities are linked to L4 Asset nodes using a three-stage canonicalization process. First, plant tags extracted from documents are matched to Asset nodes by exact tag string. Second, where no exact tag match exists, vendor-model pairs are matched to the equipment class of existing Asset nodes using a weighted similarity score. Third, residual extractions that cannot be linked to an existing Asset node are held in a staging table for human review; they are not auto-promoted to the ontology.

### 3.4 Projection: Neo4j Knowledge Graph and pgvector

The populated ontology is projected into two complementary stores.

The Neo4j graph stores nodes and edges as described in Sections 3.1–3.3. Node labels correspond to ontology layers (`:Facility`, `:Zone`, `:System`, `:Conduit`, `:Asset`, `:Vulnerability`, `:ThreatActor`, `:Event`). Edge types encode relationships (`CONTAINS`, `CONNECTS`, `HAS_VULNERABILITY`, `CAN_EXPLOIT`, `TARGETS`, `HAS_TAGGED`). Cypher traversal queries support zone-scoped vulnerability enumeration, actor-to-asset reachability, and conduit path analysis.

The pgvector store holds dense embeddings (384 dimensions, bge-micro-v2 model) for Asset nodes, Vulnerability descriptions, and Threat Actor profiles. Embedding-based similarity queries support document-to-asset matching during NER canonicalization and support "similar asset" retrieval for assessment gap analysis.

The two stores are kept in sync by a projection job that runs after each ingestion event and after each scheduled CVE/KEV update. Consistency is enforced by the ontology's canonical identifier scheme: every node carries a `canonical_id` that is stable across re-ingestion, allowing upsert semantics.

---

## 4. Results

### 4.1 Current Population State

The system was deployed against a reference facility configuration — a data center mechanical infrastructure topology designated the "Golden Path" — comprising 11 systems and 51 assets across 4 IEC 62443 zones.

**Asset inventory (ot_inventory.asset_nodes).** Total asset nodes currently persisted: [PENDING VERIFICATION]. The Golden Path reference facility contributes 51 asset nodes of this total; the remainder derive from prior ingestion runs against supplier-provided equipment lists.

**DEXPI equipment inventory (forge.equipment).** Equipment records ingested from DEXPI-formatted sources: [PENDING VERIFICATION]. The DEXPI 2.0 schema covers approximately 100 core equipment classes; CFIHOS supplementary types extend this to approximately 220 total equipment class designations available for classification.

**Model library (model_library).** Vendor-model canonical records available for CPE resolution: [PENDING VERIFICATION].

**Knowledge graph edges (seldon.kg_edges).** Total edges persisted in the knowledge graph projection table: [PENDING VERIFICATION].

**Threat actor layer.** The actor intelligence layer tracks 624 actors. Of these, [PENDING VERIFICATION] carry at least one `CAN_EXPLOIT` edge to a CVE present in the vulnerability layer; [PENDING VERIFICATION] carry `TARGETS` edges to equipment categories present in the Golden Path asset set.

### 4.2 Worked Example: Single DEXPI File Ingestion

To illustrate the pipeline concretely, we trace one representative P&ID file through ingestion to ontology population.

**Input.** A Proteus-XML file representing a cooling water loop (facility tag prefix: CWL). The file contains 23 `PlantItem` elements (9 pumps, 6 heat exchangers, 4 pressure transmitters, 4 flow control valves), 2 `InstrumentComponent` loop controllers, and 14 `PipingNetworkSegment` elements.

**Pass 1 — Parse.** Schema validation passes. No quarantine. Document assigned internal ID `dexpi-cwl-001`.

**Pass 2 — Equipment extraction.** 25 L4 Asset nodes created (23 plant items + 2 instrument components). DEXPI `ComponentClass` values assigned: `CentrifugalPump` (9 nodes), `HeatExchanger` (6 nodes), `PressureTransmitter` (4 nodes), `ControlValve` (4 nodes), `InstrumentationController` (2 nodes). Plant tags extracted: CWL-P-001 through CWL-P-009 (pumps), CWL-HX-001 through CWL-HX-006 (heat exchangers), etc.

**Pass 3 — Zone and conduit inference.** The CWL system falls within a pre-declared mechanical utility zone (Zone MU-01). Pipeline segment analysis identifies one cross-zone signal line connecting the CWL instrument loop controller to the SCADA historian in Zone IT-01. One L3 Conduit node created: `CWL→SCADA historian`, protocol: Modbus TCP, direction: unidirectional (read). Zone assignment confirmed against facility zone map.

**Pass 4 — System assembly.** Tag prefix `CWL` maps all 25 Asset nodes to one L2 System node: `Cooling Water Loop`. System node links to Zone MU-01 (L1). Conduit node links Zone MU-01 to Zone IT-01.

**Post-ingestion.** Vulnerability binding runs against the 25 Asset nodes. `CentrifugalPump` equipment class matches [PENDING VERIFICATION] CVEs via CPE inference (pump controller firmware). `InstrumentationController` matches [PENDING VERIFICATION] CVEs via exact CPE lookup for the specific vendor-model extracted in a subsequent NER pass against the vendor datasheet. One KEV-flagged CVE identified in the pump controller group: flagged for SL-T recalibration review.

**NER pass.** The vendor datasheet for the CWL instrument loop controller (PDF, 14 pages) yields: `VENDOR_NAME: [vendor]`, `MODEL_STRING: [model]`, `FIRMWARE_VERSION: [version]`. These are matched by exact plant tag to Asset node CWL-IC-001 and CWL-IC-002, enriching both with CPE candidate strings. Canonicalization confirms exact CPE match for one of the two; the second requires human review (model string variant not in canonical vendor table).

This example demonstrates the full pipeline from structured P&ID ingestion through NER enrichment to ontology population, with explicit flagging of items requiring human review rather than silent auto-promotion.

### 4.3 NER Extraction Quality

Formal extraction benchmarks (precision, recall, F1 by entity type) have not been conducted on a held-out labeled evaluation set. Extraction quality is [PENDING EVALUATION]. The qualitative observation from the worked example above — that plant tag matching achieves exact binding for well-tagged documents, but vendor-model canonicalization requires human review for model string variants — is consistent with the expectation that NER accuracy depends heavily on document quality and terminology consistency.

---

## 5. Discussion

### 5.1 Design Choices and Their Tradeoffs

The decision to use DEXPI as the structural input layer rather than attempting to extract zone and system structure entirely from unstructured documents reflects a deliberate prioritization of precision over recall. DEXPI files, where available, provide typed, schema-validated structural data with zero ambiguity in equipment classification. The cost is that DEXPI coverage is not universal: many facilities maintain P&IDs only in PDF or as proprietary CAD files. For these facilities, the pipeline falls back to NER-based topology extraction, which carries higher uncertainty and requires more extensive human review.

The eight-layer ontology design was chosen to align structural complexity with analytic use cases. The L0–L3 structural layers support IEC 62443 zone and conduit modeling directly — zone and conduit nodes are the primary deliverable for compliance gap analysis. The L4–L6 information layers support vulnerability prioritization and threat actor correlation. The L7 temporal layer supports trend analysis and audit reconstruction. A flatter ontology would simplify ingestion but would force analytic queries to carry complexity that belongs in the schema.

Projecting into both a property graph and a vector store adds operational complexity — two stores to maintain, two query interfaces to support, one synchronization job to operate reliably. The benefit is that structural graph traversal and semantic similarity queries have meaningfully different performance characteristics, and neither store handles both query types well.

### 5.2 Limitations

**NER extraction quality has not been formally benchmarked.** Precision, recall, and F1 metrics by entity type and document category have not been measured against a labeled evaluation set. The worked example in Section 4.2 illustrates the pipeline but does not constitute a systematic quality assessment.

**Zone inference is heuristic.** The Pass 3 zone inference rules are derived from IEC 62443-3-2 guidance but are not formally verified against the standard's requirements. Zone assignments require engineering review before use in compliance assessments.

**DEXPI coverage is partial.** Not all facility documentation is available in DEXPI 2.0 format. Facilities with PDF-only or CAD-only P&IDs require alternative ingestion paths with lower structural fidelity.

**CPE binding is incomplete.** The CPE resolution pipeline covers equipment classes with CPE dictionary entries. Equipment without CPE coverage — common for industrial field devices from smaller vendors — cannot be bound to CVE records by automated means. This creates a systematic blind spot in the vulnerability layer for long-tail equipment.

**The temporal layer (L7) is not yet fully implemented.** Event nodes are created for CVE publication and KEV addition events but not yet for assessment finding events or SL-T recalibration events. The temporal query interface is not yet exposed.

**Single-facility validation.** Results in Section 4 reflect a single reference facility (the Golden Path configuration). Generalizability to other facility types, topology sizes, and documentation quality levels has not been demonstrated.

---

## 6. Conclusion

This paper specifies a layered ontology for OT/ICS Cyber Digital Twins and describes the automated pipeline used to populate it from DEXPI 2.0 P&ID files and NER extraction over engineering documents. The L0–L7 layer structure provides a single queryable representation spanning facility topology, device inventory, vulnerability exposure, and threat actor behavior. Structural layers are populated with high fidelity from schema-validated DEXPI sources; information layers are populated with lower fidelity from NER extraction, with human review gates at the canonicalization stage.

The primary value of this framework is that it makes IEC 62443 zone modeling, vulnerability binding, and threat actor correlation into derived queries over a unified substrate rather than separately maintained artifacts. The practical consequence is that security assessments can draw from a single model that reflects the current state of the facility's engineering documentation, rather than assembling evidence from disconnected sources at assessment time.

Immediate open work items are formal NER extraction benchmarking, zone inference validation against IEC 62443-3-2 §8.4, CPE coverage extension for long-tail field devices, and full L7 temporal layer implementation.

---

## References

Gruber, T. R. (1993). A translation approach to portable ontology specifications. *Knowledge Acquisition*, *5*(2), 199–220. https://doi.org/10.1006/knac.1993.1008

Hogan, A., Blomqvist, E., Cochez, M., d'Amato, C., Melo, G. de, Gutierrez, C., Kirrane, S., Labra Gayo, J. E., Navigli, R., Neumaier, S., Ngonga Ngomo, A.-C., Polleres, A., Rashid, S. M., Rula, A., Schmelzeisen, L., Sequeda, J., Staab, S., & Zimmermann, A. (2021). Knowledge graphs. *ACM Computing Surveys*, *54*(4), Article 71. https://doi.org/10.1145/3447772

International Electrotechnical Commission. (2009). *IEC 62443/ISA-62443 series: Industrial automation and control systems security*. IEC.

Li, J., Sun, A., Han, J., & Li, C. (2020). A survey on deep learning for named entity recognition. *IEEE Transactions on Knowledge and Data Engineering*, *34*(1), 50–70. https://doi.org/10.1109/TKDE.2020.2981314

Nadeau, D., & Sekine, S. (2007). A survey of named entity recognition and classification. *Lingvisticae Investigationes*, *30*(1), 3–26. https://doi.org/10.1075/li.30.1.03nad

DEXPI Initiative / Proteus XML Schema. (2020). *DEXPI P&ID specification version 1.3*. DEXPI e.V. https://dexpi.org/specifications/

International Organization for Standardization. (2004). *ISO 15926: Integration of life-cycle data for process plants including oil and gas production facilities*. ISO.

---

## Figures (Specifications)

> **Figure 1 — CDT Layer Stack (specification — rendering pending).**
> A vertical stack diagram showing eight labeled horizontal bands (L0–L7). Each band shows: layer name, primary data source, example node types, and example edge types to adjacent layers. L0–L3 bands are shaded blue (structural). L4–L6 bands are shaded orange (informational). L7 is shaded red (temporal). Arrows between bands labeled with edge types from Section 3.1.

> **Figure 2 — DEXPI Ingestion Pipeline (specification — rendering pending).**
> A four-stage horizontal pipeline diagram. Stage 1: XML Parse (input: Proteus-XML; output: parsed element tree; failure path: quarantine). Stage 2: Equipment Extraction (output: candidate L4 Asset nodes with DEXPI ComponentClass). Stage 3: Zone/Conduit Inference (output: candidate L1/L3 nodes; flag: engineer review). Stage 4: System Assembly (output: L2 System nodes). Below the pipeline, a fork shows the NER path entering at Stage 2 for documents lacking DEXPI structure.

> **Figure 3 — Cooling Water Loop Worked Example (specification — rendering pending).**
> A mini-ontology diagram showing the 25 Asset nodes from the CWL example, grouped under one System node (CWL), linked to Zone MU-01 (L1), with one Conduit edge to Zone IT-01, and sample Vulnerability edges from the InstrumentationController nodes. Plant tags shown on Asset nodes. One KEV flag marker shown on the affected pump controller CVE node.

> **Figure 4 — Dual-Store Query Architecture (specification — rendering pending).**
> Two boxes side by side: Neo4j (structural traversal, Cypher queries, zone/conduit topology, actor reachability) and pgvector (embedding similarity, document-asset matching, similar-asset retrieval). A shared synchronization job in the center. Query types listed under each store. Canonical_id shown as the consistency key linking both stores.
