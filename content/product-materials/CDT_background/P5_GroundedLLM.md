---
title: "Hallucination-Resistant Risk Intelligence: A Search-Grounded LLM Pipeline for Self-Sufficient OT Threat-Data Synthesis"
tags: [oxot, llm, rag, hallucination, ot-security, threat-intelligence, pipeline, grounding]
paper_id: P5
status: draft
date: 2026-06-16
---

# Hallucination-Resistant Risk Intelligence: A Search-Grounded LLM Pipeline for Self-Sufficient OT Threat-Data Synthesis

---

## Abstract

Operational technology (OT) risk quantification requires structured numerical inputs — sector breach rates, geopolitical exposure indices, insurance benchmarks — that no single database supplies completely. Large language models (LLMs) can fill these gaps through synthesis, but ungrounded generation produces hallucinated values that corrupt downstream risk calculations silently. This paper describes a retrieve-then-synthesize pipeline that grounds every synthesized risk datum in retrieved source documents, records per-field provenance, falls back through multiple models ending in a search-grounded model so empty generations are filled with cited fact (and unverifiable fields recorded as null), and runs air-gapped via idempotent self-healing refresh. Applied to four evidence streams — SEC cyber-disclosure filings, World Governance Indicators, Verizon DBIR sector statistics, and insurance-claim benchmarks — the pipeline has produced a corpus of 5,132 structured rows, each carrying a citation trace to its source document. A formal hallucination-rate evaluation against ungrounded baselines is [PENDING EVALUATION].

---

## Graphical Abstract (specification)

*Rendering pending. The graphical abstract should be a left-to-right swimlane diagram with four lanes: (1) Source Corpus — icons for SEC EDGAR, WGI bulk download, DBIR PDF, and insurance-report PDFs; (2) Retrieval Layer — a document-chunk store, query router, and top-k retrieval arrow; (3) Synthesis Layer — three stacked model boxes (primary local LLM → secondary local LLM → search-grounded fallback) with a null-over-default gate on the right; (4) Output Store — a structured table icon with a provenance-column callout. Arrows run left to right through lanes 2 and 3; a self-healing loop arrow returns from the null-gate back to lane 2.*

---

## 1. Introduction

Risk quantification models for OT environments demand numerical inputs that span multiple dimensions: the historical breach rate for a given industry vertical, the cyber-governance maturity of a supplier nation, the actuarial loss distribution for an OT incident in a specific asset class. These figures exist in heterogeneous sources — regulatory filings, academic reports, insurance industry publications, governance databases — and no API delivers them in a unified, machine-readable form for all asset classes, sectors, and geographies simultaneously.

Practitioners have long addressed this gap through manual extraction: analysts read source documents and transcribe numbers into spreadsheets. This is accurate but slow, does not scale to continuous monitoring, and introduces transcription error. LLMs offer an alternative: given a retrieved passage, a model can identify and extract the relevant numerical field with acceptable accuracy. The failure mode is well-documented. When a model receives an ambiguous or absent passage — or no passage at all — it will often produce a plausible-looking number rather than returning a null. In a risk model, a hallucinated breach rate of 14% substituted silently for a missing value is worse than no value at all because it provides false confidence to downstream calculations (Ji et al., 2023).

The retrieve-then-synthesize architecture introduced by Lewis et al. (2020) conditions generation on retrieved documents, substantially reducing the space of possible outputs and anchoring the model to source text. Subsequent work has formalized the design space of retrieval-augmented generation (RAG) pipelines and their failure modes (Gao et al., 2023). These architectures have not been extensively applied to structured risk-data extraction for OT security contexts, where the output must be a constrained field value — a number, a category, a date — rather than natural-language prose, and where the cost of a hallucinated value is a corrupted risk calculation rather than an inaccurate paragraph.

This paper makes three contributions. First, it describes a retrieve-then-synthesize pipeline adapted specifically to structured OT risk-data extraction, with null-over-default discipline enforced at the field level. Second, it presents a multi-model fallback chain that terminates in a search-grounded model, ensuring that fields unresolvable by offline models are filled by a model with live retrieval access rather than by confabulation or arbitrary default. Third, it reports descriptive statistics for a production corpus built with this pipeline and gives a worked grounding example tracing a single row from SEC filing retrieval through field extraction to provenance storage. Formal comparative evaluation against ungrounded baselines is [PENDING EVALUATION].

---

## 2. Related Work

### 2.1 Retrieval-Augmented Generation

Lewis et al. (2020) introduced RAG as a general architecture for knowledge-intensive NLP tasks, combining a retrieval component — a dense passage index queried by the input — with a generation component that conditions on the top-k retrieved passages. The original formulation used DPR retrieval over Wikipedia passages with a seq2seq generator. The key insight relevant here is that conditioning on retrieved documents allows the model to produce outputs that are verifiable against an external corpus rather than relying solely on parametric knowledge encoded during pretraining. Gao et al. (2023) survey the subsequent design space: naive RAG, advanced RAG with query reformulation and re-ranking, and modular RAG with specialized components for particular task types. For structured data extraction, the relevant variant is what Gao et al. term "speculative RAG," where the retrieval result constrains the output to a typed schema rather than generating open-ended text.

### 2.2 Hallucination in LLM Outputs

Ji et al. (2023) provide the most thorough taxonomy of hallucination in natural language generation. They distinguish intrinsic hallucination — outputs that contradict the source document — from extrinsic hallucination — outputs that cannot be verified against any source. For risk-data pipelines, both failure modes matter: a model that extracts 12% from a passage that reads "approximately 8–10%" commits intrinsic hallucination, while a model that generates a sector breach rate without any retrieved passage commits extrinsic hallucination. Ji et al. note that hallucination rates increase when source passages are absent, ambiguous, or contradictory, and that chain-of-thought prompting and self-consistency decoding reduce but do not eliminate the problem.

### 2.3 Grounding and Provenance

A recurring recommendation across the hallucination literature is to maintain an explicit trace from each generated field to the source document that supported it. This serves two purposes. First, it enables downstream consumers to audit high-stakes outputs without re-running the pipeline. Second, it provides a signal for self-healing: rows that lack a provenance citation can be flagged for re-retrieval rather than accepted as ground truth. Gao et al. (2023) discuss attribution methods for RAG outputs; the present pipeline implements provenance at the row-field level rather than the document level, so that a single structured row can carry field-level citations pointing to different source passages.

### 2.4 Structured Extraction in High-Stakes Domains

Structured extraction from regulatory filings and technical documents has been studied in biomedical and financial NLP. The distinctive challenge in OT risk data is the combination of low document volume per cell (many sector-year combinations are covered by a single annual report), high numerical precision requirements (actuarial models are sensitive to small differences in loss ratios), and strict null semantics: a missing cell is not equivalent to a zero. These constraints motivate the null-over-default discipline described in Section 3.

---

## 3. System Architecture / Methods

### 3.1 Overall Design

The pipeline follows a retrieve-then-synthesize pattern applied to four evidence streams in parallel: (1) SEC Form 8-K and 10-K cyber-incident disclosures, (2) World Bank World Governance Indicator (WGI) country-year panels, (3) Verizon Data Breach Investigations Report (DBIR) sector-year cells, and (4) insurance-industry benchmark publications for OT/ICS incident costs. Each stream has a corresponding schema defining the typed output fields, their allowable ranges or categorical vocabularies, and the provenance fields that must accompany every extracted value.

Document ingestion produces a chunk store indexed by source identifier, document type, and retrieval embedding. Queries are generated programmatically from the target schema for each row: to fill a DBIR sector-year cell, the query encodes the sector name, the report year, and the target field. The retriever returns the top-k passages ranked by dense similarity. These passages, together with the schema definition and extraction prompt, are submitted to the primary synthesis model.

### 3.2 Multi-Model Fallback Chain

The synthesis layer implements a three-tier fallback chain. The primary model is a locally hosted LLM selected for low latency and offline operation. If the primary model returns a null for a required field — either by producing a structured null token or by failing the schema validator — the same retrieved passages are submitted to a secondary local model with a different decoding configuration. If the secondary model also fails to produce a non-null value, the pipeline submits the query to a search-grounded model: an LLM with live web-retrieval access that can locate the source document directly rather than relying on the pre-indexed chunk store.

The search-grounded fallback is the critical property that distinguishes this pipeline from a standard offline RAG system. It guarantees that the null-over-default discipline does not systematically produce sparse output: if a value exists in any publicly accessible source, the fallback model can retrieve and cite it. The fallback is invoked only when offline retrieval fails, preserving air-gapped operation for rows where the chunk store is sufficient.

### 3.3 Null-Over-Default Discipline

Every field in every output schema carries a `nullable` attribute. Fields marked non-nullable must receive a value from a retrieved source to be written to the store; the pipeline will not substitute a schema default, a prior-year carry-forward, or an interpolated estimate without explicit human override. Fields marked nullable are written as SQL NULL if no source supports them. This design choice reflects the downstream semantics: the ALE engine that consumes these rows treats NULL as "not measured" and applies appropriate uncertainty expansion, whereas a fabricated numeric default would be treated as measured fact.

### 3.4 Per-Row Provenance

Each output row carries a provenance block containing: the source document identifier (filing accession number, WGI vintage, DBIR year, publication title), the chunk identifier(s) from which the value was extracted, the model tier that produced the value (primary, secondary, or search-grounded fallback), and the extraction timestamp. For search-grounded rows, the provenance block also includes the URL and the retrieved snippet. This per-row provenance enables a data-quality audit by inspection: any row can be traced to its source without re-running the pipeline.

### 3.5 Idempotent Self-Healing Refresh

The pipeline stores a state manifest tracking, for each target row, whether the last extraction attempt succeeded, which model tier produced the value, and when the attempt was made. On each scheduled refresh, the pipeline re-attempts only rows that are null, rows whose source documents have been updated since the last extraction, and rows that carry a search-grounded provenance older than a configurable staleness threshold. This idempotency property means the pipeline can be interrupted and restarted without re-processing the entire corpus, and means that a temporary offline condition (loss of search-grounded fallback access) does not corrupt existing rows — it simply leaves newly targeted rows null until the fallback is available again.

The self-healing property also handles source document updates: when a new DBIR edition is released, only the rows targeting that edition are re-queued for extraction. Rows from prior editions are left unchanged unless manually flagged.

---

## 4. Results

### 4.1 Corpus Descriptive Statistics

As of the snapshot used in this paper, the pipeline has produced the following corpus across the four evidence streams.

**SEC cyber-disclosure rows.** The pipeline has extracted 504 structured rows from SEC Form 8-K and 10-K filings describing cyber incidents. Of these, 243 rows are richly attributed to named companies with disclosed incident dates, affected systems, and estimated financial impact where disclosed. The remaining 261 rows are partially attributed: the filing is identified but one or more numerical fields are null because the filing did not disclose quantitative impact. Every row carries the accession number of the source filing as provenance.

**Country-year governance rows.** The WGI stream has produced 443 country-year rows covering 30 countries across the full set of WGI composite indicators (political stability, rule of law, regulatory quality, control of corruption, government effectiveness, and voice and accountability). Coverage spans 2015–2024. All 443 rows are fully attributed to the World Bank WGI bulk download vintage.

**DBIR sector-year cells.** The pipeline has extracted 98 sector-year cells from Verizon DBIR publications, covering incident frequency, data-breach proportion, and top attack-action triplets by sector. Sector categories follow the DBIR's own classification scheme, which does not map one-to-one to NAICS codes; the provenance block records the DBIR sector label alongside the extraction to avoid false precision in downstream sector-matching.

**Insurance-claim benchmark cells.** Approximately 300 cells of OT/ICS incident cost data have been extracted from insurance-industry publications, representing median and mean claim values by asset class and geographic region. This stream is expanding as additional publications are processed; the count should be treated as a lower bound on the eventual corpus size.

**Geopolitical signal rows.** The pipeline ingests quarterly geopolitical risk signals from structured sources and has produced 3,787 rows covering country-quarter combinations across the geopolitical risk index, energy-market disruption indicators, and critical-infrastructure incident counts.

Across all streams, every grounded row stores at least one retrieval citation in its provenance block. Rows lacking a retrievable source are stored as null rather than estimated.

### 4.2 Worked Grounding Example

To illustrate the extraction mechanism, consider a single SEC-derived row produced from a Form 8-K filed by a publicly traded manufacturing company following a cyber incident disclosed in 2024.

The pipeline's query for this row encodes the target fields: incident date, affected system category, disclosed financial impact, and incident type. The retriever returns the top-5 chunks from the filing, ranked by dense similarity to the query. The highest-ranked chunk contains the following language (paraphrased to avoid reproducing the filing verbatim): the company reported unauthorized access to its industrial control network on a specified date, resulting in a production outage of approximately N days, with estimated remediation costs disclosed in a specific dollar range.

The primary model extracts: incident date from the explicit date string in the filing; affected system category mapped to "ICS/SCADA" from the "industrial control network" language; financial impact from the disclosed dollar range (stored as a range pair, not a point estimate); and incident type mapped to "unauthorized access" from the categorical vocabulary. The provenance block records the accession number, the chunk identifiers, the model tier (primary), and the extraction timestamp.

An ungrounded baseline — a model queried with only the schema and no retrieved passage — would face one of two failure modes. Either it generates plausible-looking values that do not correspond to any actual filing (extrinsic hallucination), or it extracts values from a confabulated filing consistent with general knowledge of manufacturing-sector incidents (also extrinsic). Either failure mode is undetectable without the provenance trace. The grounded pipeline makes the failure detectable: if no relevant chunk is retrieved, the null-over-default discipline produces null fields with a provenance block indicating retrieval failure, and the row is queued for the fallback chain.

### 4.3 Evaluation Design

A formal evaluation comparing grounded-pipeline output to ungrounded-baseline output on held-out rows is [PENDING EVALUATION]. The planned protocol samples rows from each evidence stream, generates parallel outputs from the grounded pipeline and from a model receiving no retrieved context, and compares both against human-adjudicated ground truth extracted directly from source documents. Metrics will include field-level extraction accuracy, hallucination rate (fields present in model output but absent or contradicted in source), and citation-coverage rate. This evaluation is not yet complete and no quantitative results are reported here.

---

## 5. Discussion

### 5.1 Design Trade-offs

The null-over-default discipline trades corpus density for corpus reliability. A pipeline willing to substitute schema defaults or interpolated estimates would produce a denser output corpus, but downstream risk calculations would treat estimated values identically to measured values. For ALE-based risk quantification, where the output is a probability distribution over annual loss rather than a point estimate, this conflation is particularly damaging: an inflated loss-rate cell can shift the distribution tail by orders of magnitude.

The multi-model fallback chain adds latency and cost to extraction. In practice, the search-grounded fallback is invoked for a minority of rows — those where the chunk store returns low-similarity passages or no passage at all. The majority of rows are resolved by the primary offline model with adequate source coverage. The fallback is essential for newly published documents that have not yet been indexed and for source types with low representation in the chunk store.

The idempotent self-healing design enables continuous operation without manual intervention. Because the state manifest tracks provenance vintage, newly published annual reports trigger targeted re-extraction of the rows they cover without requiring a full corpus rebuild.

### 5.2 Applicability to OT Risk Contexts

OT environments present retrieval challenges not common in general-domain RAG applications. Technical standards documentation (IEC 62443, NERC CIP, NIS2) uses highly specialized terminology with precise definitions that general-purpose embedding models may conflate. Vendor advisories for OT components use component-model identifiers (CPE strings) that require exact matching, not semantic similarity. The pipeline addresses these challenges through a hybrid retrieval design: dense semantic retrieval for narrative passages (SEC filings, insurance reports) and exact-match retrieval for structured identifier fields (CPE matching in vulnerability records). This hybrid design is a practical adaptation rather than a theoretically motivated departure from standard RAG; it reflects the reality that OT risk data combines narrative and structured source types.

### 5.3 Limitations

The primary limitation of this work is that the formal hallucination-rate evaluation against ungrounded baselines has not been completed. The corpus descriptive statistics reported in Section 4.1 establish the scale and structure of the output but do not quantify the error rate of the extraction process. It is possible that the primary model makes extraction errors on passages it does retrieve — mis-mapping a disclosed cost figure to the wrong field, for example, or extracting a projected cost as a realized cost. The per-row provenance enables manual audit of any individual row but does not scale to corpus-wide accuracy estimation without the planned evaluation protocol.

A second limitation is geographic coverage. The 30 countries covered by the WGI stream were selected for data availability and relevance to the initial customer deployments. Countries with sparse SEC-filing presence or limited WGI coverage remain underrepresented in the corpus.

Third, the search-grounded fallback depends on the availability of the fallback model's retrieval index. For documents behind paywalls or in restricted-access databases, the fallback produces null rather than a value. This is the correct behavior under the null-over-default discipline, but it means some evidence streams remain permanently sparse until licensed access is established.

---

## 6. Conclusion

This paper describes a retrieve-then-synthesize pipeline for structured OT risk-data extraction that enforces null-over-default discipline at the field level, carries per-row provenance to every output row, and maintains corpus reliability through a multi-model fallback chain terminating in a search-grounded model. The pipeline has produced a corpus of 5,132 structured rows across four evidence streams — SEC cyber disclosures, country-year governance indicators, DBIR sector statistics, and insurance-claim benchmarks — each grounded in a retrievable source document. The worked grounding example illustrates the qualitative difference between grounded and ungrounded extraction: grounded extraction produces a traceable, auditable result or an explicit null; ungrounded extraction produces a plausible-looking value with no verifiable connection to any source. Quantitative evaluation of the pipeline's hallucination rate relative to ungrounded baselines is [PENDING EVALUATION] and represents the primary direction for future work.

---

## References

Gao, Y., Xiong, Y., Gao, X., Jia, K., Pan, J., Bi, Y., Dai, Y., Sun, J., & Wang, H. (2023). *Retrieval-augmented generation for large language models: A survey*. arXiv:2312.10997. https://arxiv.org/abs/2312.10997

Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Bang, Y. J., Madotto, A., & Fung, P. (2023). Survey of hallucination in natural language generation. *ACM Computing Surveys*, *55*(12), Article 248. https://doi.org/10.1145/3571730

Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W., Rocktäschel, T., Riedel, S., & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *Advances in Neural Information Processing Systems*, *33*, 9459–9474. https://proceedings.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html

---

## Figures (specifications)

**Figure 1 — Pipeline architecture diagram.**
*Rendering pending.* A four-layer horizontal flow: (1) source corpus icons (SEC EDGAR, World Bank API, DBIR PDF, insurance publications); (2) chunk store with dense-index and exact-match retrieval paths; (3) synthesis layer with three stacked model boxes (primary local LLM, secondary local LLM, search-grounded fallback) and a null-over-default gate; (4) output store table with provenance-column callout. A self-healing loop arrow returns from the null gate to the retrieval layer. Color coding: retrieved passages in blue, extracted fields in green, null fields in amber, provenance records in gray.

**Figure 2 — Worked grounding example trace.**
*Rendering pending.* A vertical trace for a single SEC-derived row: (top) the source filing chunk with the relevant passage highlighted; (middle) the extraction prompt and model output showing each field and its extraction evidence; (bottom) the output row with field values and the provenance block showing accession number, chunk IDs, model tier, and timestamp. A parallel column shows what an ungrounded model would generate for the same fields, with fabricated values marked in red.

**Figure 3 — Corpus structure summary.**
*Rendering pending.* A segmented bar chart with one bar per evidence stream (SEC, WGI, DBIR, Insurance, Geopolitical), showing the number of rows by provenance tier (primary extraction, secondary extraction, search-grounded fallback, null). Intended to communicate the proportion of rows at each fallback tier and the fraction of null fields per stream.
