---
title: "Digital Transformation: Connectivity Added Without Widening the Attack Surface"
slug: "digital-transformation"
locale: "en"
section: "case-studies"
excerpt: "A composite case, illustrating one of the seven engagements OXOT is regularly asked to run: new connectivity added without quietly widening the attack surface — the cheapest security in the estate is the security specified while the drawings are still drawings."
metaTitle: "Digital Transformation — a case study | OXOT"
metaDescription: "How OXOT specifies OT security during a digital transformation programme — new sensors, new connectivity, new remote monitoring — before it is built rather than after."
publishedAt: "2026-08-22T00:00:00+00:00"
updatedAt: "2026-08-22T00:00:00+00:00"
---
# Digital transformation: connectivity added without widening the attack surface

A composite case, illustrating one of the seven engagements OXOT is regularly asked to run — not a single identifiable programme. The pattern is real and recurs on every re-fit of this shape; the facility is not disclosed.

```keyfacts
Scope :: a re-fit or new-build digitalisation programme
Typical :: engaged at design stage, before procurement
Basis :: IEC 62443-4-1/4-2 by design, not by retrofit
How we work :: specify controls into the requirements, not audit after
Output :: security requirements in the same document as the rest
```

## The situation

A plant was adding the connectivity a modernisation programme always adds: condition-monitoring sensors reporting off-site, a remote-access path for the integrator commissioning the new equipment, a historian pushing data up to a cloud analytics platform nobody on the plant floor had asked for by name but everyone above them had. Each addition was justified on its own. Nobody had added up what they did together to the attack surface, because nobody owned that question — the automation vendor owned the sensors, IT owned the cloud link, and the integrator owned the commissioning access, and the three of them had never been in the same design review.

## What OXOT did

Engaged before procurement closed, while the requirements document was still a document rather than a fait accompli. Each new connection was traced to what it actually needed to reach and for how long, not what was easiest to grant during commissioning and never revisited. Remote access for the integrator was scoped to expire at handover rather than persist by default. The condition-monitoring path was assessed against what an attacker could reach through it, not just what it was designed to send. Where a vendor's default architecture assumed flat connectivity back to a cloud service, the requirement was rewritten before the purchase order, at the cost of a specification line rather than a re-engineering project eighteen months later.

## The output

Security requirements written into the same procurement document as the rest of the programme, not a parallel audit trailing behind it. A remote-access model that expires and is re-granted rather than persisting because revoking it was never anyone's job. A connectivity diagram the plant's own OT team could defend to an auditor, because it reflected what was actually specified rather than what accumulated during commissioning.

## The through-line

The cheapest security in the estate is the security specified while the drawings are still drawings. Every connection added during a modernisation programme is easy to justify on its own and easy to lose track of in aggregate — the fix is being in the design review before procurement closes, not auditing the result after the vendor has already shipped the default.
