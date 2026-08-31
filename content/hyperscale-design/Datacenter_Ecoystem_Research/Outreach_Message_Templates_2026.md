#  Outreach Message Templates — 2026
## CRA Sprint · IEC 62443 · OCP S.A.F.E.

> **Rules of engagement** (per Sales Playbook):
> - Manual LinkedIn outreach only until 50+ active prospects
> - No PDFs in first message — insight only
> - Connection request note: max 200 characters, no pitch
> - First DM after acceptance: one sharp insight + one question
> - Do not name the client reference (Venice anonymized)

---

## CONNECTION REQUEST NOTES (200 chars max)

### For Power & Cooling (Cohort 1)
> "Following your work on IEC 62443 for [Company] — the Sept 11 CRA deadline creates some interesting architectural questions. Worth a brief conversation."

### For ODM / Compute (Cohort 3)
> "Watching the OCP S.A.F.E. attestation requirements land on ODMs in real time — you're building the playbook. Interested in comparing notes."

### For Nuclear SMR (Cohort 4)
> "Working through 10 CFR 73.54 cyber plan requirements with a couple of advanced reactor teams — happy to share what's creating the most friction."

---

## FIRST MESSAGE AFTER ACCEPTANCE — BY COHORT

---

### COHORT 1-A: UPS / PDU (Schneider, Vertiv, Eaton, nVent, Legrand/Raritan)

**Trigger:** CRA component-level certification gap

---

Subject: Something specific on CRA Article 6 that's hitting [Product Line]

Hi [Name],

The Sept 11 CRA enforcement date is landing differently for UPS and PDU vendors than for most product categories — specifically because **Article 6 requires component-level documentation of all digital elements**, not just a system-level declaration.

The products that will need this first: anything with a network management card or embedded network interface. That's your [APC NMC / IntelliSlot / PXEM / Enlogic controller] architecture.

One specific question: has [Company] determined whether the embedded NMC counts as a "product with digital elements" independently of the UPS chassis, or is the entire assembly treated as a single PDI?

That classification decision drives the whole compliance scope. Happy to share how we've seen other vendors work through it if useful.

Jim McKenney | OXOT, BV

---

### COHORT 1-B: CRAC / Cooling (Stulz, Munters, Carrier/HVAC, Rittal)

**Trigger:** CRA + NIS2 cooling infrastructure gap

---

Subject: iCOM / cooling controller classification under CRA — class determination question

Hi [Name],

CRA Article 7 classification is creating real friction for cooling system vendors — specifically around whether an iCOM-type building controller falls under Class I or Class II (the latter requires third-party conformity assessment, not self-declaration).

For a German manufacturer, the BNetzA (Bundesnetzagentur) is the likely market surveillance authority, and early signals from ENISA suggest that networked building management controllers in critical infrastructure verticals will land in Class II.

If that's the case, the conformity assessment timeline starts now, not September.

Is [Company] tracking this at the product management level yet, or is it still sitting with legal/compliance?

Jim McKenney | Tetrel

---

### COHORT 1-C: DCIM & BMS (Johnson Controls, Honeywell/Tridium, Siemens, ABB)

**Trigger:** CVE-specific + IEC 62443 architecture gap

---

Subject: 13 CVEs in Niagara / [Metasys / Desigo] — what this means for 62443-4-2

Hi [Name],

The July 2025 Niagara Framework disclosures [or Dark Angels / CVE-2025-53187 for JCI/ABB] surfaced something that's relevant for the 62443 program you're building at [Company]:

Most SDLC programs (62443-4-1 process level) don't close the **component-level** gaps that show up in device CVEs. The 4-1 cert says your development process is sound. The 4-2 cert says each device passes a defined set of requirements at the SR level.

For a BMS platform with 1M+ installations, the gap between 4-1 and 4-2 is significant from a liability standpoint under CRA Article 13.

I'm curious what your current posture is on the 4-2 side for [Niagara / Metasys / Desigo CC]. Happy to share what a gap assessment looks like if useful.

Jim McKenney | Tetrel

---

### COHORT 2: ODM / Compute (Wiwynn, QCT, Supermicro, Celestica)

**Trigger:** OCP S.A.F.E. + SSPA + BMC CVEs

---

Subject: OCP S.A.F.E. attestation timeline — what hyperscalers are actually asking for

Hi [Name],

The OCP S.A.F.E. program is moving from voluntary to effectively mandatory as hyperscaler procurement teams start using it as a supplier qualification gate. The specific ask is getting more precise: it's no longer "tell us about your security program" — it's "show us your component-level attestation against the S.A.F.E. framework."

For server platforms, that lands on BMC firmware, NIC firmware, and PSU controller software — the same stack where 6 critical CVEs showed up in Supermicro platforms in the last 18 months.

The question hyperscalers are asking: what does the attestation package look like, and who did the independent review?

Where are you in building that package for [Platform / Server Line]? Happy to walk through what we've seen work.

Jim McKenney | Tetrel

---

### COHORT 3: Nuclear SMR (TerraPower, X-energy, Oklo, GE Vernova Hitachi)

**Trigger:** NRC 10 CFR 73.54 cyber plan requirement

---

Subject: 10 CFR 73.54 cyber plan — what's creating friction at the I&C layer

Hi [Name],

Working with a couple of advanced reactor teams on 10 CFR 73.54 cyber plan development right now. The consistent point of friction is the **digital I&C boundary definition** — specifically where the cyber plan's CDAs (Critical Digital Assets) end and the non-digital safety systems begin.

For light-water SMR designs, the NRC expects the 73.54 plan to cover every digital asset that can affect reactivity, decay heat removal, or confinement — and the evidentiary standard for that documentation is higher than most teams anticipate.

The intersection with IEC 62443-4-2 for the specific control system components is useful because it gives the NRC reviewers a recognized framework to evaluate against, rather than reviewing a bespoke design.

Is your team tracking the 73.54 cyber plan as a Construction Permit gate item yet, or is that still pre-scope?

Jim McKenney | Tetrel

---

### COHORT 4: Partner / Co-sell (TXOne, Moxa)

**Trigger:** Architecture assessment → certified product natural pairing

---

Subject: 62443-4-2 SL-2 certification gap → co-sell structure question

Hi [Name],

The market for IEC 62443 architecture assessments is coming online fast — CRA enforcement, NIS2 supply chain screening, and hyperscaler SSPA requirements are all converging on the same set of OT vendors.

The pattern we're seeing: an operator or a product vendor gets an architecture assessment done, and the gap report identifies specific security capabilities they need at the component level. That's exactly where [TXOne EdgeFire / Moxa certified router] sits.

We run the assessment; you provide the certified product. The customer gets both in one coordinated engagement rather than two separate conversations.

Worth a 30-minute conversation to see if there's a co-sell structure that works?

Jim McKenney | Tetrel

---

## FOLLOW-UP CADENCE

| Day | Action |
|:--|:--|
| 0 | Send connection request with 200-char note |
| 3 | If accepted: send First Message template above |
| 10 | If no reply: follow up with a relevant CVE/news item as a "thought you'd find this useful" |
| 21 | If no reply: final short note — "Closing the loop on this — happy to reconnect when timing is better." |
| 90 | Re-engage with a new trigger event (new CVE, ENISA guidance update, customer breach) |

## TRIGGER EVENTS TO WATCH (auto-alerts)

Set Google Alerts for:
- `IEC 62443-4-2 + [company name]` — if they self-certify, call immediately
- `NIS2 + [company name] + supply chain` — regulatory pressure signal
- `CVE + [company name] + firmware` — incident hook
- `CRA + enforcement + ENISA` — policy deadline reminder
- `OCP + SAFE + attestation` — S.A.F.E. program updates

---

*All templates anonymized — no named client references.*
*Adjust [Company], [Name], [Product Line] before sending.*
