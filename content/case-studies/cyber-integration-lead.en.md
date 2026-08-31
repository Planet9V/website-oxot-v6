---
title: "Cyber Integration Lead: The Rack Is a Safety Boundary Too"
slug: "cyber-integration-lead"
locale: "en"
section: "case-studies"
excerpt: "A composite case, illustrating one of the seven engagements OXOT is regularly asked to run: an embedded lead holding the line between the project and the plant — one engineer carrying IEC 62443 from an Initial Risk Assessment down to a rack-level line in a hyperscale ODM contract."
metaTitle: "Cyber Integration Lead — a case study | OXOT"
metaDescription: "How OXOT embeds a lead cyber engineer inside a hyperscale critical-facility design programme, carrying IEC 62443 from an IRA workshop through low-level design and into rack-level ODM procurement specifications."
publishedAt: "2026-08-22T00:00:00+00:00"
updatedAt: "2026-08-22T00:00:00+00:00"
---
# Cyber integration lead: the rack is a safety boundary too

A composite case, illustrating one of the seven engagements OXOT is regularly asked to run, carried into hyperscale critical-facility scope — not a single identifiable site, operator or ODM. The systems, the process and the disputes are the kind that recur on every programme of this shape.

```keyfacts
Scope :: one lead engineer, embedded, requirements through low-level design
Systems :: energy, cooling, BMS, DCS, fire and life safety, HV/LV lighting, CCTV, access control, HVAC
Process :: IEC 62443-3-2, IRA and DRA workshops, ALARP/SFAIRP
Negotiation :: SL-T to SL-C, per zone and per rack-level component
Alignment :: V-Model, requirements to commissioning, ODM procurement specs
```

## The situation

Talk to most people about data centre security and they mean the network. A hyperscale facility is also a power station, a chiller plant, a fire-suppression system, and a building full of doors that have to open for the right people and stay shut for everyone else — energy and cooling, building management, the distributed control system running the mechanical plant, fire and life safety, HV/LV lighting, CCTV, door access control, HVAC, every one of them an operational technology system, and every one of them in scope. The client had learned what happens when that scope is discovered late, on an earlier facility where security requirements arrived after the electrical single-line diagrams were frozen and cost three times what they would have cost specified from the start. This programme embedded a lead engineer from day one instead, carrying the security thread through requirements, high-level design and low-level design personally, rather than handing it across three teams who each read the previous stage's output cold.

## What OXOT did

Two workshops, not one. An Initial Risk Assessment covered every domain on the list — energy, cooling, BMS, DCS, fire and life safety, physical security, lighting and environmental control — as one interconnected estate rather than nine separate vendor scopes; most zones cleared at a manageable risk level from segmentation and existing controls alone. The zones that did not went to a Detailed Risk Assessment, run with the people who actually own the consequence rather than the people who own the network diagram — fire and life safety got its own DRA, because the client's safety engineers were not willing to accept a security control recommended by people who had never had to justify a fire-panel design to a regulator. Every resulting control was tested against ALARP and SFAIRP reasoning before it was specified, so the argument for a control's cost against the risk it removed happened in the workshop, with the safety engineer in the room, instead of later, informally, after the control had already been specified and someone had to explain why it did not actually work on the floor.

## The output

Target security levels came out of the DRAs; capability security levels, what a given system could actually deliver out of the box, came from the vendors and the ODM. Where the two did not match — and on a programme this size they frequently did not — the gap became a compensating control, a design change, or a renegotiated requirement, decided with operations, safety and finance in the room rather than assumed away in a spreadsheet. A Critical Items List tracked every gap that could not be closed before commissioning, so nothing slipped through as accepted risk without someone actually accepting it. The requirement that mattered most went all the way down to individual rack-level components, mapped against the facility's minimum operating requirements and against what a real failure or compromise of that component would cost in downtime, revenue and, in the fire and life-safety domains, in human safety — specification lines an ODM could build to and be tested against, traceable back through low-level design, high-level design and requirements to a specific workshop and a specific consequence someone in the room had agreed was real.

## The through-line

Security engineering that stops at the network diagram misses most of what can actually stop a hyperscale facility. The rack is a safety boundary. So is the chiller plant, and the fire panel, and the door. One engineer and one traceable chain of reasoning, carried from an IRA workshop down to a procurement spec line, is what keeps that from becoming nine disconnected arguments that never quite add up to a facility anyone can defend to a regulator, an insurer, or a board.
