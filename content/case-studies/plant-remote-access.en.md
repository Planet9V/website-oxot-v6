---
title: "Plant Remote Access: The OEM Kept Its Access, the Operator Gained an Audit Trail"
slug: "plant-remote-access"
locale: "en"
section: "case-studies"
excerpt: "A composite case, illustrating one of the seven engagements OXOT is regularly asked to run: the OEM kept its access; the operator gained an audit trail — vendor and OEM remote access brokered rather than removed, against IEC 62443 and the operator's own supply-chain security obligations."
metaTitle: "Plant Remote Access — a case study | OXOT"
metaDescription: "How OXOT secures OEM and vendor remote access to OT equipment — least privilege, brokered and monitored, against IEC 62443 and supply-chain security obligations — without removing the access the plant genuinely needs."
publishedAt: "2026-08-22T00:00:00+00:00"
updatedAt: "2026-08-22T00:00:00+00:00"
---
# Plant remote access: the OEM kept its access, the operator gained an audit trail

A composite case, illustrating one of the seven engagements OXOT is regularly asked to run — not a single identifiable facility. The pattern is real and recurs across sectors; the site and the vendors are not disclosed.

```keyfacts
Scope :: employees, vendors and OEMs
Basis :: IEC 62443, plus whatever supply-chain security obligations apply
How we work :: least privilege, brokered, monitored, time-bound
Output :: fully auditable remote access
Kept, not removed :: the access the plant genuinely needs
```

## The situation

Every OEM whose equipment ran the line had a way in — a modem left from commissioning, a VPN credential shared between three engineers at the vendor and never rotated, a support contract that assumed always-on access because that was easiest for the vendor. Nobody at the plant could say, on request, who had accessed what and when. An incident-response exercise the previous year had confirmed the fear directly: if one of those paths had been the way in, there would have been no record to prove it either way. The instinct after an exercise like that is usually to cut the access off. The plant could not afford to: the OEM's remote diagnostics were the fastest way to get the line running again after a fault, and removing that entirely would have cost more in downtime than the risk was worth.

## What OXOT did

Access was brokered rather than removed — every OEM and vendor session routed through a control that made it least-privilege, time-bound and attributable to a named person, rather than a standing credential nobody remembered granting. Multi-factor authentication and just-in-time grants replaced the always-on VPN. Sessions were recorded, so a support call left a record rather than a memory. The controls were designed against IEC 62443 and whatever supply-chain security obligations applied to the operator's own jurisdiction, which meant treating the vendor's own security posture as part of the scope, not assuming it away — a supplier that could not meet the plant's access standard was told so, in writing, before the next contract renewal rather than after the next incident.

## The output

The OEM kept exactly the access it needed to do its job, and got it faster in an emergency than the old shared VPN credential ever provided, because a just-in-time grant with a defined scope is quicker to approve than a phone call arguing about whether to reactivate a standing account. The operator gained something it had never had: a session log it could hand to an auditor, an insurer, or its own incident-response team without having to reconstruct it from memory or from a vendor's own records.

## The through-line

The plant needs the access — that was never the argument. What it did not have was a way to watch it, revoke it, and prove afterward what happened. Brokered, monitored access gives the vendor the same job they had before and gives the operator the one thing they were missing: an answer, the next time someone asks who was in and when.
