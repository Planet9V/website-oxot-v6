There should be a **general Resources landing page**. The top-menu item “Resources” should link to it, and the dropdown/mega-menu should also link directly to the specific resource types.

A hub-and-spoke structure is best: the main page orients visitors and surfaces featured content, while Insights, Case Studies, Guides & Briefings, and the technical documents are the deeper destination pages. This is also the standard content-hub pattern: a pillar page routes visitors to related topic clusters and relevant next steps. [kliqinteractive](https://kliqinteractive.com/insights/b2b-content-hub-seo-ai-search-conversion/)

## Structure

```text
Resources                         ← General landing page / hub
├─ Insights                       ← Article library
├─ Case Studies                   ← Proof library
├─ Guides & Briefings             ← Downloadable / practical resources
├─ Product Sheet                  ← Existing PDF/page
├─ Technical Specification        ← Existing PDF/page
├─ Air-Gapped Deployments         ← Existing deployment page
└─ Glossary                       ← Technical reference
```

**Top menu link:** `/resources`

## Top menu behavior

### Desktop

```text
Resources ▼
├─ Explore Resources              → /resources
│
├─ Learn
│  ├─ Insights                    → /resources/insights
│  ├─ Guides & Briefings          → /resources/guides-briefings
│  └─ Glossary                    → /resources/glossary
│
├─ Proof
│  └─ Case Studies                → /resources/case-studies
│
├─ Technical Documents
│  ├─ Product Sheet               → /resources/product-sheet
│  ├─ Technical Specification     → /resources/technical-specification
│  └─ Air-Gapped Deployments      → /resources/air-gapped-deployments
│
└─ Featured
   └─ [Latest major Insight or Case Study]
```

The **Resources** text itself should be clickable and go to the hub page—not merely open the dropdown.

### Mobile

```text
Resources
├─ Explore Resources
├─ Insights
├─ Case Studies
├─ Guides & Briefings
├─ Product Sheet
├─ Technical Specification
├─ Air-Gapped Deployments
└─ Glossary
```

## Resources landing page

The general page should not repeat every article. It should help visitors choose the right kind of material quickly.

**URL:** `/resources`  
**H1:** `Research, evidence, and practical tools for cyber-physical decisions.`

**Supporting copy:**

> Explore technical research, decision guides, real-world case studies, product documentation, and reference material for OT cybersecurity, railway safety, product security, sovereign deployment, and cyber-physical resilience.

### Recommended layout

```text
Hero
├─ Featured resource
├─ Choose your path
│  ├─ Understand a topic
│  ├─ See a comparable decision
│  ├─ Use a practical method
│  └─ Evaluate the platform
├─ Latest Insights
├─ Featured Case Studies
├─ Guides & Briefings
├─ Technical Documents
├─ Browse by industry / framework / decision
└─ Final CTA
```

## Page sections

### 1. Hero

```text
H1:
Research, evidence, and practical tools for cyber-physical decisions.

Copy:
From IEC 62443 and CRA to railway safety, air-gapped deployment,
and OT change assurance—OXOT resources connect technical context
to real decisions.

CTA:
Browse Insights

Secondary CTA:
Explore the Technical Specification
```

### 2. Choose your path

Use four prominent cards:

| Card | Visitor question | Destination |
|---|---|---|
| **Understand a topic** | “Help me understand this standard, threat, architecture, or decision.” | Insights |
| **See a comparable decision** | “Has OXOT worked on a problem like mine?” | Case Studies |
| **Use a practical method** | “Give me a framework, checklist, or briefing I can use internally.” | Guides & Briefings |
| **Evaluate the platform** | “How does the Cyber Digital Twin work, deploy, and integrate?” | Product Sheet, Technical Specification, Air-Gapped Deployments |

### 3. Featured resource

This should be a large, visually distinct card just below the hero.

Example:

```text
Featured Insight
How does IEC 62278-2:2025 structure the systems approach to safety?

IEC 62278-2:2025 separates the railway safety method from the broader
RAMS lifecycle process. Learn how it connects system definition, hazards,
safety requirements, cyber assumptions, verification, validation, and
the safety argument.

[Read the Insight]
```

Rotate this only manually—do not use an auto-rotating carousel.

### 4. Latest Insights

Show three cards:

```text
Latest Insights
- How does IEC 62278-2:2025 structure the systems approach to safety?
- Why CVSS cannot prioritize OT risk by itself
- How does a Cyber Digital Twin support CRA technical documentation?

[Explore all Insights]
```

### 5. Featured Case Studies

Show two or three cards:

```text
Featured Case Studies
- Securing signaling-vendor access without impairing railway fault recovery
- Protecting chemical-dosing control while preserving treatment continuity
- Finding BMS common-mode dependencies in a hyperscale cooling environment

[Explore Case Studies]
```

Use real named studies only with approval. Otherwise, clearly label them as **Anonymized Case Study** or **Illustrative Decision Scenario**.

### 6. Guides & Briefings

Show practical assets:

```text
Guides & Briefings
- From P&ID to Cyber Digital Twin: a practical evidence workflow
- How to test an OT segmentation change before production
- The railway briefing: cyber pathways in the safety argument
- Air-gapped by design, sovereign by operation

[Explore Guides & Briefings]
```

### 7. Technical documents

Keep these visibly separate from thought leadership:

```text
Technical Documents
- OXOT Cyber Digital Twin Product Sheet
- OXOT Cyber Digital Twin Technical Specification
- Air-Gapped & Sovereign Deployment Briefing
```

These are for higher-intent technical evaluators. Use a different card style—more document-like and less editorial.

### 8. Browse by topic

This is particularly useful once the library grows.

```text
Browse by Industry
Manufacturing • Energy • Water • Rail • Hyperscale • Defense & Government

Browse by Framework
IEC 62443 • CRA • TS 50701 • IEC 62278-2:2025

Browse by Decision
What do we fix first? • What should we spend?
Can we change safely? • What can we leave alone?

Browse by Audience
Board • CISO • Engineer • Safety / RAMS • Product Team • Procurement
```

## Why not only specific pages?

Without the hub, a visitor who clicks “Resources” has no obvious way to decide:

- Whether they need an Insight, Guide, Case Study, or Technical Specification.
- Whether OXOT has content for their industry or framework.
- What the newest or most important resource is.
- How the content relates to the Cyber Digital Twin.
- Where to go after reading one article.

The Resources page solves that. It is the **routing and discovery layer**; the specific pages contain the detailed content.

## Final sitemap

```text
Home
├─ Platform
├─ Decisions
├─ Industries
├─ Assurance
├─ Resources
│  ├─ Resources Overview
│  ├─ Insights
│  │  └─ Individual Insight pages
│  ├─ Case Studies
│  │  └─ Individual Case Study pages
│  ├─ Guides & Briefings
│  │  └─ Individual Guide / Briefing pages
│  ├─ Product Sheet
│  ├─ Technical Specification
│  ├─ Air-Gapped Deployments
│  └─ Glossary
│     └─ Individual Glossary term pages, if useful later
├─ Company
└─ Talk to an OT Engineer
```

The general Resources page should be built at launch, even if Insights, Case Studies, and Guides initially contain only three to five items each.