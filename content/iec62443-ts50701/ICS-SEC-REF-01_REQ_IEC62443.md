---
tags: [iec62443, workpaper, requirements, iec62443]
type: reference
status: converted
---

# Reference: IEC 62443-3-3 Foundational Requirements and System Requirements

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-REF-01_REQ_IEC62443]] |
| Version | 1.0 FINAL |
| Date | 2026-03-02 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | COMPILED |
| Dossier Section | References |
| Dossier Position | Document 84 of 101 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

## 1. Purpose

This reference section documents the complete set of Foundational Requirements (FR1–FR7) and their constituent System Requirements (SRs) as defined in IEC 62443-3-3:2013. For each SR and Requirement Enhancement (RE), the table indicates applicability at Security Level (SL) 1, SL-2, SL-3, and SL-4 per Annex B, Table B.1 of IEC 62443-3-3:2013 (as corrected by COR1:2014). This section is a standalone reference document; it does not assign SRs to specific [Project Name] zones or systems. Zone-level SR allocation will be performed after all four domain analyses of Section A (Zone Definitions) are complete and the full zone model is assembled.

The IEC 62443-3-3 standard defines five Security Levels (SL-0 through SL-4). SL-0 indicates no specific security requirements. SL-1 through SL-4 represent progressively more rigorous security capabilities (IEC, 2013, IEC 62443-3-3:2013, §4.1). Each higher SL cumulatively includes all requirements of the lower levels and adds additional SRs and REs (IEC, 2013, IEC 62443-3-3:2013, Annex B, Table B.1).

**Security Level Definitions** (IEC, 2013, IEC 62443-3-3:2013, §4.1):

- **SL-1** — Protection against casual or coincidental violation (low motivation, general skills, no specific IACS knowledge)
- **SL-2** — Protection against intentional violation using simple means (moderate motivation, IACS-specific skills, low resources)
- **SL-3** — Protection against sophisticated attack using moderate resources (high motivation, IACS-specific and cybersecurity skills, moderate resources)
- **SL-4** — Protection against state-sponsored attack using extended resources (very high motivation, multidisciplinary expertise, extended resources)

## 2. FR1 — Identification and Authentication Control (IAC)

**Purpose:** Identify and authenticate all users (human, software, devices) before granting access to the control system (IEC, 2013, IEC 62443-3-3:2013, Clause 5).

| SR/RE | Requirement Name | SL-1 | SL-2 | SL-3 | SL-4 | Clause |
| --- | --- | --- | --- | --- | --- | --- |
| SR 1.1 | Human user identification and authentication | X | X | X | X | 5.3 |
| SR 1.1 RE 1 | Unique identification and authentication | — | X | X | X | 5.3 |
| SR 1.1 RE 2 | Multifactor authentication for untrusted networks | — | — | X | X | 5.3 |
| SR 1.1 RE 3 | Multifactor authentication for all networks | — | — | — | X | 5.3 |
| SR 1.2 | Software process and device identification and authentication | X | X | X | X | 5.4 |
| SR 1.2 RE 1 | Unique identification and authentication | — | X | X | X | 5.4 |
| SR 1.3 | Account management | X | X | X | X | 5.5 |
| SR 1.3 RE 1 | Unified account management | — | — | X | X | 5.5 |
| SR 1.4 | Identifier management | X | X | X | X | 5.6 |
| SR 1.5 | Authenticator management | X | X | X | X | 5.7 |
| SR 1.5 RE 1 | Hardware security for software process identity credentials | — | — | X | X | 5.7 |
| SR 1.6 | Wireless access management | X | X | X | X | 5.8 |
| SR 1.6 RE 1 | Unique identification and authentication | — | X | X | X | 5.8 |
| SR 1.7 | Strength of password-based authentication | X | X | X | X | 5.9 |
| SR 1.7 RE 1 | Password generation and lifetime restrictions for human users | — | X | X | X | 5.9 |
| SR 1.7 RE 2 | Password lifetime restrictions for all users | — | — | X | X | 5.9 |
| SR 1.8 | Public key infrastructure (PKI) certificates | X | X | X | X | 5.10 |
| SR 1.9 | Strength of public key authentication | X | X | X | X | 5.11 |
| SR 1.9 RE 1 | Hardware security for public key authentication | — | — | X | X | 5.11 |
| SR 1.10 | Authenticator feedback | X | X | X | X | 5.12 |
| SR 1.11 | Unsuccessful login attempts | X | X | X | X | 5.13 |
| SR 1.12 | System use notification | X | X | X | X | 5.14 |
| SR 1.13 | Access via untrusted networks | X | X | X | X | 5.15 |
| SR 1.13 RE 1 | Explicit access request approval | — | — | X | X | 5.15 |

**FR1 SL Summary:** SL-1 requires 13 base SRs (1.1–1.13). SL-2 adds 4 REs introducing unique identification, wireless authentication, and password lifecycle controls. SL-3 adds 5 further REs including multifactor authentication and hardware-secured credentials. SL-4 adds universal multifactor authentication (IEC, 2013, IEC 62443-3-3:2013, Annex B).

## 3. FR2 — Use Control (UC)

**Purpose:** Enforce authorization policies governing permitted use of the control system (IEC, 2013, IEC 62443-3-3:2013, Clause 6).

| SR/RE | Requirement Name | SL-1 | SL-2 | SL-3 | SL-4 | Clause |
| --- | --- | --- | --- | --- | --- | --- |
| SR 2.1 | Authorization enforcement | X | X | X | X | 6.3 |
| SR 2.1 RE 1 | Authorization enforcement for all users | — | X | X | X | 6.3 |
| SR 2.1 RE 2 | Permission mapping to roles | — | — | X | X | 6.3 |
| SR 2.1 RE 3 | Supervisor override | — | — | X | X | 6.3 |
| SR 2.1 RE 4 | Dual approval | — | — | — | X | 6.3 |
| SR 2.2 | Wireless use control | X | X | X | X | 6.4 |
| SR 2.2 RE 1 | Identify and report unauthorized wireless devices | — | X | X | X | 6.4 |
| SR 2.3 | Use control for portable and mobile devices | X | X | X | X | 6.5 |
| SR 2.3 RE 1 | Enforcement of security status of portable and mobile devices | — | — | X | X | 6.5 |
| SR 2.4 | Mobile code | X | X | X | X | 6.6 |
| SR 2.4 RE 1 | Mobile code integrity check | — | — | X | X | 6.6 |
| SR 2.5 | Session lock | X | X | X | X | 6.7 |
| SR 2.6 | Remote session termination | — | X | X | X | 6.8 |
| SR 2.7 | Concurrent session control | — | — | X | X | 6.9 |
| SR 2.8 | Auditable events | X | X | X | X | 6.10 |
| SR 2.8 RE 1 | Centrally managed, system-wide audit trail | — | — | X | X | 6.10 |
| SR 2.9 | Audit storage capacity | X | X | X | X | 6.11 |
| SR 2.9 RE 1 | Warn when audit record storage capacity threshold reached | — | — | X | X | 6.11 |
| SR 2.10 | Response to audit processing failures | X | X | X | X | 6.12 |
| SR 2.11 | Timestamps | — | X | X | X | 6.12.1 |
| SR 2.11 RE 1 | Time synchronization | — | X | X | X | 6.12.1 |
| SR 2.11 RE 2 | Protection of time source integrity | — | — | X | X | 6.12.1 |
| SR 2.12 | Non-repudiation | — | — | X | X | 6.13 |
| SR 2.12 RE 1 | Non-repudiation for all users | — | — | — | X | 6.14 |

**FR2 SL Summary:** SL-1 requires 9 base SRs. SL-2 adds remote session termination, timestamps, and audit enhancements. SL-3 adds role-based permissions, session control, mobile code integrity, and non-repudiation. SL-4 adds dual approval and comprehensive non-repudiation (IEC, 2013, IEC 62443-3-3:2013, Annex B).

## 4. FR3 — System Integrity (SI)

**Purpose:** Ensure the integrity of the control system to prevent unauthorized manipulation (IEC, 2013, IEC 62443-3-3:2013, Clause 7).

| SR/RE | Requirement Name | SL-1 | SL-2 | SL-3 | SL-4 | Clause |
| --- | --- | --- | --- | --- | --- | --- |
| SR 3.1 | Communication integrity | — | X | X | X | 7.3 |
| SR 3.1 RE 1 | Cryptographic integrity protection | — | — | X | X | 7.3 |
| SR 3.2 | Malicious code protection | X | X | X | X | 7.4 |
| SR 3.2 RE 1 | Malicious code protection on entry and exit points | — | X | X | X | 7.4 |
| SR 3.2 RE 2 | Central management and reporting for malicious code protection | — | — | X | X | 7.4 |
| SR 3.3 | Security functionality verification | X | X | X | X | 7.5 |
| SR 3.3 RE 1 | Automated mechanisms for security functionality verification | — | — | X | X | 7.5 |
| SR 3.3 RE 2 | Security functionality verification during normal operations | — | — | — | X | 7.5 |
| SR 3.4 | Software and information integrity | X | X | X | X | 7.6 |
| SR 3.4 RE 1 | Automated notification about integrity violations | — | X | X | X | 7.6 |
| SR 3.5 | Input validation | X | X | X | X | 7.7 |
| SR 3.5 RE 1 | Input validation for all inputs | — | — | X | X | 7.7 |
| SR 3.6 | Deterministic output | X | X | X | X | 7.8 |
| SR 3.7 | Error handling | X | X | X | X | 7.9 |
| SR 3.8 | Session integrity | — | X | X | X | 7.10 |
| SR 3.8 RE 1 | Invalidation of session IDs after session termination | — | — | X | X | 7.10 |
| SR 3.8 RE 2 | Unique session ID generation | — | — | X | X | 7.10 |
| SR 3.8 RE 3 | Randomness of session IDs | — | — | — | X | 7.10 |
| SR 3.9 | Protection of audit information | — | X | X | X | 7.11 |
| SR 3.9 RE 1 | Audit records on write-once media | — | — | — | X | 7.11 |

**Note:** COR1:2014 modifies the Annex B mapping for SR 3.4: the original SL-C(SI) 1 entry is replaced with "Not selected" at SL-1, and RE 1 (Automated notification about integrity violations) is added starting at SL-2 (IEC, 2014, IEC 62443-3-3:2013/COR1:2014).

**FR3 SL Summary:** SL-1 requires 6 base SRs (malicious code protection, verification, integrity, input validation, deterministic output, error handling). SL-2 adds communication integrity, malware scanning at entry/exit points, session management, and audit protection. SL-3 adds cryptographic integrity, centralized management, and automated verification. SL-4 adds continuous verification during operations and session ID randomness (IEC, 2013, IEC 62443-3-3:2013, Annex B; IEC, 2014, COR1:2014).

## 5. FR4 — Data Confidentiality (DC)

**Purpose:** Ensure the confidentiality of information on communication channels and in data repositories (IEC, 2013, IEC 62443-3-3:2013, Clause 8).

| SR/RE | Requirement Name | SL-1 | SL-2 | SL-3 | SL-4 | Clause |
| --- | --- | --- | --- | --- | --- | --- |
| SR 4.1 | Information confidentiality | — | X | X | X | 8.3 |
| SR 4.1 RE 1 | Protection of confidentiality at rest or in transit via untrusted networks | — | — | X | X | 8.3 |
| SR 4.1 RE 2 | Protection of confidentiality across all networks | — | — | — | X | 8.3 |
| SR 4.2 | Information persistence | — | X | X | X | 8.4 |
| SR 4.2 RE 1 | Purging of shared memory resources | — | — | X | X | 8.4 |
| SR 4.3 | Use of cryptography | — | X | X | X | 8.5 |

**FR4 SL Summary:** SL-1 has no data confidentiality requirements (appropriate for environments without sensitive data at rest). SL-2 introduces confidentiality protection, data persistence controls, and cryptography requirements. SL-3 extends to data at rest and shared memory. SL-4 requires protection across all networks (IEC, 2013, IEC 62443-3-3:2013, Annex B).

## 6. FR5 — Restricted Data Flow (RDF)

**Purpose:** Segment the control system network and restrict data flows to essential communications (IEC, 2013, IEC 62443-3-3:2013, Clause 9).

| SR/RE | Requirement Name | SL-1 | SL-2 | SL-3 | SL-4 | Clause |
| --- | --- | --- | --- | --- | --- | --- |
| SR 5.1 | Network segmentation | X | X | X | X | 9.3 |
| SR 5.1 RE 1 | Physical network segmentation | — | — | X | X | 9.3 |
| SR 5.1 RE 2 | Independence from non-control system networks | — | — | X | X | 9.3 |
| SR 5.1 RE 3 | Logical and physical isolation of critical networks | — | — | — | X | 9.3 |
| SR 5.2 | Zone boundary protection | X | X | X | X | 9.4 |
| SR 5.2 RE 1 | Deny all, permit by exception | — | X | X | X | 9.4 |
| SR 5.2 RE 2 | Island mode | — | — | X | X | 9.4 |
| SR 5.2 RE 3 | Fail close | — | — | X | X | 9.4 |
| SR 5.3 | General purpose person-to-person communication restrictions | — | X | X | X | 9.5 |
| SR 5.3 RE 1 | Prohibit all general purpose person-to-person communications | — | — | X | X | 9.5 |
| SR 5.4 | Application partitioning | X | X | X | X | 9.6 |

**FR5 SL Summary:** SL-1 requires network segmentation, zone boundary protection, and application partitioning. SL-2 adds deny-all policies and general communication restrictions. SL-3 mandates physical segmentation, network independence, island mode, and fail-close behaviour. SL-4 adds full logical and physical isolation (IEC, 2013, IEC 62443-3-3:2013, Annex B).

## 7. FR6 — Timely Response to Events (TRE)

**Purpose:** Respond to security violations by notifying appropriate authorities, taking corrective action, and reporting evidence (IEC, 2013, IEC 62443-3-3:2013, Clause 10).

| SR/RE | Requirement Name | SL-1 | SL-2 | SL-3 | SL-4 | Clause |
| --- | --- | --- | --- | --- | --- | --- |
| SR 6.1 | Audit log accessibility | X | X | X | X | 10.3 |
| SR 6.1 RE 1 | Programmatic access to audit logs | — | — | X | X | 10.3 |
| SR 6.2 | Continuous monitoring | X | X | X | X | 10.4 |

**FR6 SL Summary:** SL-1 requires basic audit logging and continuous monitoring. SL-3 adds programmatic access to audit logs for automated analysis. FR6 has fewer SRs than other FRs but its requirements are foundational to incident response (IEC, 2013, IEC 62443-3-3:2013, Annex B).

## 8. FR7 — Resource Availability (RA)

**Purpose:** Ensure the availability of the control system against denial-of-service events and under degraded conditions (IEC, 2013, IEC 62443-3-3:2013, Clause 11).

| SR/RE | Requirement Name | SL-1 | SL-2 | SL-3 | SL-4 | Clause |
| --- | --- | --- | --- | --- | --- | --- |
| SR 7.1 | Denial of service protection | X | X | X | X | 11.3 |
| SR 7.1 RE 1 | Manage communication loads | — | X | X | X | 11.3 |
| SR 7.1 RE 2 | Limit denial of service effects to other systems | — | — | X | X | 11.3 |
| SR 7.2 | Resource management | X | X | X | X | 11.4 |
| SR 7.3 | Control system backup | X | X | X | X | 11.5 |
| SR 7.3 RE 1 | Backup verification | — | X | X | X | 11.5 |
| SR 7.3 RE 2 | Backup automation | — | — | X | X | 11.5 |
| SR 7.4 | Control system recovery and reconstitution | X | X | X | X | 11.6 |
| SR 7.5 | Emergency power | X | X | X | X | 11.7 |
| SR 7.6 | Network and security configuration settings | X | X | X | X | 11.8 |
| SR 7.6 RE 1 | Machine-readable reporting of current security settings | — | — | X | X | 11.8 |
| SR 7.7 | Least functionality | X | X | X | X | 11.9 |
| SR 7.8 | Control system component inventory | X | X | X | X | 11.10 |

**FR7 SL Summary:** SL-1 requires 8 base SRs covering DoS protection, resource management, backup, recovery, emergency power, configuration management, least functionality, and component inventory. SL-2 adds communication load management and backup verification. SL-3 adds DoS isolation, backup automation, and machine-readable configuration reporting (IEC, 2013, IEC 62443-3-3:2013, Annex B).

## 9. Security Level Requirement Summary

The following table summarises the cumulative SR and RE count at each Security Level across all seven Foundational Requirements.

| Security Level | Description | Base SRs Required | REs Required | Total Requirements |
| --- | --- | --- | --- | --- |
| SL-1 | Casual/coincidental | ~33 | 0 | ~33 |
| SL-2 | Intentional, simple means | ~38 | ~13 | ~51 |
| SL-3 | Sophisticated, moderate resources | ~38 | ~30 | ~68 |
| SL-4 | State-sponsored, extended resources | ~38 | ~38 | ~76 |

**Note:** Exact counts are derived from IEC 62443-3-3:2013, Annex B, Table B.1 (as corrected by COR1:2014). Counts above are approximate because certain SRs that appear at SL-1 may have no RE at SL-1 but progressively add REs at higher levels. The authoritative source for definitive counts is Table B.1 in the official standard (IEC, 2013, IEC 62443-3-3:2013, Annex B).

## 10. Reference Bibliography

- IEC. (2013). *IEC 62443-3-3:2013 — Industrial communication networks — Network and system security — Part 3-3: System security requirements and security levels*. International Electrotechnical Commission.
- IEC. (2014). *IEC 62443-3-3:2013/COR1:2014 — Corrigendum 1*. International Electrotechnical Commission.
- IEC. (2020). *IEC 62443-3-2:2020 — Security for industrial automation and control systems — Part 3-2: Security risk assessment for system design*. International Electrotechnical Commission.
- ISA. (2013). *ISA-62443-3-3-2013 — Security for industrial automation and control systems — Part 3-3: System security requirements and security levels*. International Society of Automation.
- Cisco Systems. (2023). *ISA/IEC-62443-3-3: What is it and how to comply?* (White Paper). Cisco Systems, Inc.
- Claroty. (2023). *ISA/IEC 62443-3-3 Foundational Requirements and Claroty Solutions* (White Paper). Claroty Ltd.
