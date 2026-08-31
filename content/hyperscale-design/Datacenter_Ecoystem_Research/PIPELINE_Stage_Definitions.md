# Pipeline Stage Definitions and CRM Field Reference

**Version:** June 2026
**Purpose:** Defines the meaning of every pipeline stage, the entry and exit criteria for each, and the exact field values to use when updating  (any CRM). This document ensures the pipeline is clean, consistent, and importable.

---

## Pipeline Stages

### Stage 1: PROSPECT

**Definition:** Contact is in the database; identity verified; no outreach has begun.

**Entry criteria:**
- Name, title, company, LinkedIn URL confirmed as accurate
- Company and role match the intended cohort and campaign
- Sow_stage field = "Prospect"

**Exit criteria (to move to CONTACTED):**
- LinkedIn connection request has been sent
- Date logged in CRM

**Do not leave contacts in Prospect stage for more than 2 weeks.** If contact has been verified and is in the database, either send the connection request or move to a lower priority tier and explain why.

---

### Stage 2: CONTACTED

**Definition:** Connection request sent; awaiting acceptance or non-response.

**Entry criteria:**
- Connection request sent (with or without a note)
- Date sent recorded

**Exit criteria:**
- **Accepted → move to CONNECTED**
- **No response after 14 days → stay in CONTACTED, note the date for a 90-day re-approach window**
- **Rejected (explicit) → mark LOST with reason "Connection declined"**

**Key metric:** Track acceptance rate weekly. If below 25%, review the connection note text.

---

### Stage 3: CONNECTED

**Definition:** LinkedIn connection accepted; first DM sent.

**Entry criteria:**
- Acceptance confirmed
- First DM sent within 48 hours of acceptance
- Date of first DM recorded

**Exit criteria:**
- **Reply received → move to ENGAGED**
- **No response after 10 days → send Day 10 follow-up. Stay in CONNECTED.**
- **No response after 21 days → send Day 21 closing note. Stay in CONNECTED.**
- **No response after 90 days → move to LOST (re-engage later with new trigger)**

---

### Stage 4: ENGAGED

**Definition:** Active exchange underway; at least 2 messages traded and/or discovery call scheduled or completed.

**Entry criteria:**
- Prospect has responded substantively to at least one message
- OR discovery call is booked

**Exit criteria:**
- **Discovery call completed and prospect interested → move to PROPOSAL**
- **CRA Snapshot or Executive Companion sent and under internal review → move to PROPOSAL**
- **Prospect says explicitly "not now" or "not relevant" → move to LOST with reason and re-engage date**

**Note during this stage:** Every communication from Tetrel should advance the conversation. Do not send check-ins without a specific new insight attached.

---

### Stage 5: PROPOSAL

**Definition:** A formal proposal, CRA Snapshot, or clinic quote has been sent.

**Entry criteria:**
- Proposal document or CRA Snapshot sent to prospect
- Date sent recorded
- Indicative value recorded (CAD estimate from PRICING_Master_Sheet.md)

**Exit criteria:**
- **Prospect requests SOW or asks to move forward → move to NEGOTIATION**
- **No response after 5 days → send scope confirmation call invite**
- **No response after 14 days → send one final note, then move to LOST with note**
- **Explicit rejection → move to LOST with reason**

---

### Stage 6: NEGOTIATION

**Definition:** SOW draft under discussion. Prospect has expressed intent to proceed.

**Entry criteria:**
- SOW draft sent or verbal agreement to proceed on agreed scope and price
- Deposit amount confirmed

**Exit criteria:**
- **Signed SOW and deposit received → move to SIGNED**
- **Negotiation fails (price, scope, timing) → move to LOST with reason and re-engage date**
- **Client goes silent → treat as Proposal re-engagement; send one more note, then LOST**

---

### Stage 7: SIGNED

**Definition:** SOW executed, deposit received, engagement active.

**Entry criteria:**
- Countersigned SOW on file
- Deposit invoice sent and received
- Kickoff date confirmed

**Exit criteria:**
- Engagement completes and final deliverable sent → create a new record for "re-engagement / retainer" if applicable
- Engagement cancelled mid-project → document reason and move to LOST

---

### Stage 8: LOST

**Definition:** Opportunity not progressed due to rejection, non-response, or explicit deferral.

**Entry criteria:**
- Prospect explicitly declined OR
- 90 days of no response after the Day 21 note

**Sub-reasons (always record):**

| Reason Code | Description |
|:--|:--|
| `declined_not_relevant` | Prospect confirmed the service is not relevant to them |
| `declined_budget` | Budget not available in this cycle |
| `declined_timing` | Not ready yet; re-engage in 90 days |
| `declined_competitor` | Going with another provider (record who) |
| `declined_internal` | Handling internally |
| `no_response_90d` | No response after full cadence (Day 0/3/10/21/90) |
| `connection_declined` | LinkedIn connection rejected |

**Re-engage date:** Set a 90-day reminder for all LOST records with `timing` or `no_response` reasons. A new trigger event (CVE, regulatory update, peer breach) can restart the sequence.

---

## CRM Field Reference (Productive Import)

### Standard Field Mapping

| Field Name | Type | Values / Notes |
|:--|:--|:--|
| `contact_name` | Text | Full name — "First Last" |
| `company` | Text | Legal company name |
| `title` | Text | Current job title |
| `cohort` | Tag | Cohort 1A / 1B / 1C / 2A / 2B / 3 (see Contact_Database_2026.csv) |
| `campaign` | Tag | CRA Sprint / Scoping Clinic / Venice Whitepaper / Multiple |
| `service_flag` | Multi-tag | service_cra_readiness, service_iec62443_supplier_gap, service_ocp_safe_review, service_iec62443_dc_brownfield, service_iec62443_mf_brownfield, service_iec62443_en_brownfield, service_smr_nuclear_ics, service_scoping_clinic, service_nis2_supply_chain, service_ma_due_diligence |
| `tier` | Select | T1 / T2 / T3 |
| `linkedin_url` | URL | Full LinkedIn profile URL |
| `email` | Email | Work email if verified; blank if not |
| `phone` | Phone | Direct line if known; leave blank otherwise |
| `company_hq` | Text | City, Country |
| `est_cad_low` | Currency | Low end of SOW estimate |
| `est_cad_high` | Currency | High end of SOW estimate |
| `est_cad_value` | Currency | Midpoint for pipeline value reporting |
| `sow_stage` | Select | Prospect / Contacted / Connected / Engaged / Proposal / Negotiation / Signed / Lost |
| `lost_reason` | Select | See reason codes above — blank if not Lost |
| `reengage_date` | Date | 90-day re-engage trigger — set for all Lost with timing/no-response reason |
| `next_action` | Text | Specific next action — not "follow up" but "Send Day 10 follow-up with CVE-2025-67450 context" |
| `next_action_date` | Date | When the next action must happen |
| `identity_verified` | Boolean | True / False — must be True before outreach begins |
| `notes` | Long text | Chronological notes in format: [DATE] | [Stage] | [Action] | [Next] |

---

## Weekly Pipeline Review Protocol

Run every Friday, 15 minutes max:

1. Open CRM. Filter by stage.
2. For every CONNECTED contact where first DM was sent 9+ days ago: is a Day 10 follow-up needed? Schedule it.
3. For every CONNECTED contact where first DM was sent 20+ days ago: is a Day 21 note needed? Schedule it.
4. For every PROPOSAL where the proposal was sent 5+ days ago with no response: has a scope confirmation call been offered?
5. Update `next_action` and `next_action_date` for every record.
6. Count: total contacted / total connected / total engaged / total proposals / total SOWs. Record in the weekly tracker.
7. Check acceptance rate for connection requests sent that week. If below 25%, review the connection note text.

**Weekly pipeline report (internal — send to yourself):**

```
Week ending: [DATE]

CONNECTIONS SENT:        [X] this week / [X] total
ACCEPTED:                [X] this week (acceptance rate: [X]%)
FIRST DMs SENT:          [X] this week
REPLIES RECEIVED:        [X] this week (response rate: [X]%)
DISCOVERY CALLS:         [X] completed this week
CRA SNAPSHOTS SENT:      [X] this week
PROPOSALS OUT:           [X] active
SOWs SIGNED:             [X] YTD
ACTIVE ENGAGEMENTS:      [X]
PIPELINE VALUE (mid):    CAD [X]

OPEN ACTIONS DUE THIS WEEK:
- [Contact name] — [action needed]
- [Contact name] — [action needed]
```

---

## Service Flag Reference (All Tags)

| Tag | Service | Campaign |
|:--|:--|:--|
| `service_cra_readiness` | CRA Readiness Assessment | CRA Sprint |
| `service_iec62443_supplier_gap` | IEC 62443-4-2 Supplier Gap | CRA Sprint / Whitepaper inbound |
| `service_ocp_safe_review` | OCP S.A.F.E. Firmware Review | Whitepaper inbound / ODM direct |
| `service_iec62443_dc_brownfield` | DC Brownfield Assessment | Scoping Clinic |
| `service_iec62443_mf_brownfield` | Manufacturing Brownfield Assessment | Scoping Clinic |
| `service_iec62443_en_brownfield` | Energy Brownfield Assessment | Scoping Clinic |
| `service_smr_nuclear_ics` | SMR / Nuclear Digital I&C | CRA Sprint (nuclear cohort) |
| `service_scoping_clinic` | Scoping Clinic | Scoping Clinic campaign |
| `service_nis2_supply_chain` | NIS2 Supply-Chain Screening | Operator-side outreach |
| `service_ma_due_diligence` | OT M&A Due Diligence | PE operating partner channel |

---

*Pipeline Stage Definitions | Tetrel Security | June 2026*
*Cross-reference: [WEEKLY_Execution_Tracker.md](file:///Users/jimmcknney/jim_private/9_prospects/WEEKLY_Execution_Tracker.md) | [Contact_Database_2026.csv](file:///Users/jimmcknney/jim_private/9_prospects/Contact_Database_2026.csv)*
