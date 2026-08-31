---
title: "Consulting — OT security engineering"
slug: "services"
locale: "en"
section: "services"
excerpt: "Zones, conduits and SL-T, decided by engineers who have run the plants — applied on live rail, energy and manufacturing programmes."
metaTitle: "OT security engineering — zones, conduits and SL-T"
metaDescription: "IEC 62443 consulting from engineers who have run the plants: zones and conduits, SL-T, assessments, architecture and programmes — applied on live rail, energy and manufacturing work."
publishedAt: ""
updatedAt: "2026-08-07T17:22:25.369175+00:00"
sourceWasPublished: true
extractedFrom: "page_blocks (the live source; pages.body is a dead mirror)"
extractedOn: "2026-08-09"
---
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OXOT Services — one living model of your OT risk</title>
<style>
  :root{
    --ink:#161d2b; --ink-2:#12192a; --paper:#f6f4ef; --white:#ffffff;
    --navy:#0d1420; --navy-2:#111a2b; --navy-line:rgba(255,255,255,.10);
    --orange:#e8700a; --orange-press:#d5650a;
    --green:#2f9e63; --amber:#c9891a; --red:#d8452f;
    --line:rgba(22,29,43,.1); --line-soft:rgba(22,29,43,.08); --muted:rgba(22,29,43,.6);
    --serif:Georgia,'Iowan Old Style','Times New Roman',serif;
    --sans:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    --mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace;
  }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:hidden}
  a{color:inherit;text-decoration:none}
  .wrap{max-width:1180px;margin:0 auto;padding:0 40px}
  .eyebrow{font:600 12px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--orange)}
  h1,h2,h3{color:var(--ink-2);margin:0}
  .btn-primary{display:inline-flex;align-items:center;gap:9px;background:var(--ink);color:var(--paper);font:600 15px/1 var(--sans);padding:16px 26px;border-radius:10px;transition:transform .18s ease,background .18s ease}
  .btn-primary:hover{background:#000;transform:translateY(-2px)}
  .btn-link{display:inline-flex;align-items:center;gap:7px;color:var(--ink);font:600 15px/1 var(--sans);border-bottom:1.5px solid var(--orange);padding-bottom:3px;transition:gap .2s ease}
  .btn-link:hover{gap:12px}
  .btn-ghost-d{display:inline-flex;align-items:center;gap:9px;color:var(--paper);font:600 15px/1 var(--sans);border:1px solid rgba(255,255,255,.28);padding:15px 24px;border-radius:10px;transition:background .18s ease}
  .btn-ghost-d:hover{background:rgba(255,255,255,.08)}
  .btn-orange{display:inline-flex;align-items:center;gap:9px;background:var(--orange);color:var(--ink-2);font:600 15px/1 var(--sans);padding:16px 26px;border-radius:10px;transition:transform .18s ease,background .18s ease}
  .btn-orange:hover{background:var(--orange-press);color:#fff;transform:translateY(-2px)}

  .reveal{opacity:0;transform:translateY(20px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
  .reveal.in{opacity:1;transform:none}
  @media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}}

  /* ---------- HERO ---------- */
  .hero{position:relative;padding:78px 0 68px;overflow:hidden}
  .hero-grid{position:absolute;inset:0;background-image:linear-gradient(var(--line-soft) 1px,transparent 1px),linear-gradient(90deg,var(--line-soft) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(120% 90% at 78% 0%,#000,transparent 70%);mask-image:radial-gradient(120% 90% at 78% 0%,#000,transparent 70%);opacity:.7;z-index:0}
  .hero .wrap{position:relative;z-index:1}
  .hero h1{font:400 66px/1.03 var(--serif);letter-spacing:-.015em;margin:20px 0 22px;max-width:15ch}
  .hero h1 em{font-style:normal;color:var(--orange)}
  .hero .lede{font:400 20px/1.6 var(--sans);color:var(--muted);max-width:620px;margin:0 0 34px}
  .actions{display:flex;gap:18px;align-items:center;flex-wrap:wrap}

  /* ---------- THESIS ---------- */
  .thesis{padding:26px 0 70px}
  .thesis .big{font:400 40px/1.28 var(--serif);color:var(--ink-2);max-width:20ch;letter-spacing:-.01em}
  .thesis .big b{color:var(--orange);font-weight:400}
  .thesis .cols{display:grid;grid-template-columns:1fr 1fr;gap:44px;margin-top:34px;max-width:900px}
  .thesis .cols p{font:400 17px/1.7 var(--sans);color:var(--muted);margin:0}
  .thesis .cols p b{color:var(--ink-2);font-weight:600}
  .spine-note{display:inline-flex;align-items:center;gap:12px;margin-top:40px;font:600 13px/1 var(--sans);letter-spacing:.02em;color:var(--ink-2);background:#fff;border:1px solid var(--line);border-radius:999px;padding:12px 20px}
  .spine-note .dot{width:9px;height:9px;border-radius:50%;background:var(--orange)}

  /* ---------- CDT (dark cockpit) ---------- */
  .cdt{background:var(--navy);color:#eaf0f7;padding:88px 0}
  .cdt .eyebrow{color:var(--orange)}
  .cdt h2{color:#fff;font:400 46px/1.08 var(--serif);letter-spacing:-.01em;margin:18px 0 0;max-width:16ch}
  .cdt .sub{font:400 18px/1.66 var(--sans);color:rgba(234,240,247,.66);max-width:620px;margin:20px 0 0}
  .cdt .kicker{font:600 12px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:rgba(234,240,247,.5)}

  /* BOM interactive */
  .bomwrap{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:56px;align-items:start}
  @media(max-width:900px){.bomwrap{grid-template-columns:1fr}}
  .bomchips{display:flex;flex-wrap:wrap;gap:10px}
  .chip{font:600 14px/1 var(--sans);letter-spacing:.02em;color:#eaf0f7;background:rgba(255,255,255,.05);border:1px solid var(--navy-line);border-radius:10px;padding:13px 16px;cursor:pointer;transition:border-color .2s ease,background .2s ease,transform .12s ease}
  .chip:hover{background:rgba(255,255,255,.09)}
  .chip.on{background:var(--orange);color:var(--ink-2);border-color:var(--orange);transform:translateY(-1px)}
  .chip small{display:block;font:500 11px/1.3 var(--sans);opacity:.62;margin-top:5px;text-transform:none;letter-spacing:0}
  .chip.on small{opacity:.8}
  .bomdetail{background:var(--navy-2);border:1px solid var(--navy-line);border-radius:16px;padding:26px;min-height:210px}
  .bomdetail .name{font:400 24px/1.1 var(--serif);color:#fff}
  .bomdetail .role{font:400 15px/1.62 var(--sans);color:rgba(234,240,247,.72);margin:12px 0 20px}
  .bomdetail .fwk-label{font:600 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:rgba(234,240,247,.44);margin-bottom:10px}
  .fwks{display:flex;flex-wrap:wrap;gap:8px}
  .fwk{font:600 12px/1 var(--sans);color:rgba(234,240,247,.6);background:rgba(255,255,255,.04);border:1px solid var(--navy-line);border-radius:999px;padding:8px 13px;transition:all .25s ease}
  .fwk.hot{color:var(--ink-2);background:var(--orange);border-color:var(--orange)}

  /* BOM tier ladder */
  .ladder{margin-top:56px}
  .ladder .kicker{margin-bottom:16px}
  .tiers{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
  .tier{font:600 13px/1 var(--mono);color:#eaf0f7;background:rgba(255,255,255,.05);border:1px solid var(--navy-line);border-radius:8px;padding:11px 13px;opacity:0;transform:translateY(8px);transition:opacity .5s ease,transform .5s ease,background .2s ease}
  .tier.in{opacity:1;transform:none}
  .tier:hover{background:rgba(232,112,10,.2);border-color:var(--orange)}
  .tarrow{color:rgba(234,240,247,.32);font-size:14px}
  @media (prefers-reduced-motion:reduce){.tier{opacity:1;transform:none}}

  /* capability cards */
  .caps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:56px}
  @media(max-width:900px){.caps{grid-template-columns:1fr}}
  .cap{background:var(--navy-2);border:1px solid var(--navy-line);border-radius:16px;padding:24px;transition:transform .2s ease,border-color .2s ease}
  .cap:hover{transform:translateY(-4px);border-color:rgba(232,112,10,.5)}
  .cap .ico{width:30px;height:30px;color:var(--orange);margin-bottom:16px}
  .cap h4{font:600 16px/1.3 var(--sans);color:#fff;margin:0 0 8px}
  .cap p{font:400 14px/1.6 var(--sans);color:rgba(234,240,247,.66);margin:0}
  .cap p b{color:#eaf0f7;font-weight:600}
  .cdt-cta{margin-top:48px;display:flex;gap:18px;flex-wrap:wrap;align-items:center}

  /* ---------- SERVICES ---------- */
  .services{padding:88px 0}
  .services h2{font:400 44px/1.08 var(--serif);letter-spacing:-.01em;max-width:16ch;margin:16px 0 0}
  .svc-list{margin-top:52px;border-top:1px solid var(--line)}
  .svc{display:grid;grid-template-columns:64px 1fr 1.05fr;gap:32px;padding:34px 0;border-bottom:1px solid var(--line);align-items:start;transition:background .25s ease}
  .svc:hover{background:rgba(232,112,10,.035)}
  @media(max-width:860px){.svc{grid-template-columns:1fr;gap:14px}}
  .svc .num{font:400 30px/1 var(--serif);color:var(--orange)}
  .svc h3{font:400 27px/1.16 var(--serif);color:var(--ink-2);margin:0 0 10px}
  .svc .sum{font:600 15px/1.5 var(--sans);color:var(--ink-2);margin:0 0 12px}
  .svc .body{font:400 15.5px/1.72 var(--sans);color:var(--muted);margin:0}
  .svc .facts{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:9px}
  .svc .facts li{display:grid;grid-template-columns:120px 1fr;gap:14px;font:400 13.5px/1.5 var(--sans);color:var(--muted);padding-bottom:9px;border-bottom:1px dashed var(--line-soft)}
  .svc .facts li b{font:600 12px/1.5 var(--mono);letter-spacing:.02em;text-transform:uppercase;color:var(--ink-2)}
  .svc .out{grid-column:1/-1;justify-self:start}
  .svc-flag{display:inline-flex;align-items:center;gap:8px;font:600 12px/1 var(--sans);color:var(--orange);background:rgba(232,112,10,.09);border-radius:999px;padding:8px 14px;margin-top:12px}

  /* ---------- ETHOS ---------- */
  .ethos{background:var(--ink-2);color:#eaf0f7;padding:78px 0}
  .ethos .grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
  @media(max-width:860px){.ethos .grid{grid-template-columns:1fr;gap:28px}}
  .ethos h2{color:#fff;font:400 38px/1.18 var(--serif);letter-spacing:-.01em;max-width:14ch}
  .ethos p{font:400 17px/1.72 var(--sans);color:rgba(234,240,247,.72);margin:0 0 18px}
  .ethos .pills{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
  .ethos .pill{font:600 13px/1 var(--sans);color:#eaf0f7;background:rgba(255,255,255,.06);border:1px solid var(--navy-line);border-radius:999px;padding:11px 16px}

  /* ---------- CTA ---------- */
  .final{padding:84px 0;text-align:center}
  .final h2{font:400 44px/1.1 var(--serif);letter-spacing:-.01em;max-width:18ch;margin:0 auto 18px}
  .final p{font:400 18px/1.66 var(--sans);color:var(--muted);max-width:560px;margin:0 auto 30px}
  .final .actions{justify-content:center}

  @media(max-width:640px){
    .hero{padding:52px 0 44px}.hero h1{font-size:44px}.hero .lede{font-size:18px}
    .thesis .big,.cdt h2,.services h2,.final h2,.ethos h2{font-size:31px}
    .cdt,.services,.ethos,.final{padding:60px 0}.wrap{padding:0 22px}
    .thesis .cols{grid-template-columns:1fr;gap:20px}
  }
</style>
</head>
<body>

<!-- HERO -->
<section class="hero">
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="wrap">
    <div class="reveal">
      <div class="eyebrow">OXOT · Services</div>
      <h1>Seven services. One <em>living model</em>. Your team owns it.</h1>
      <p class="lede">Most OT security work ends in a binder. Ours ends in a model you keep using — a physics-based Cyber Digital Twin that every assessment, design and programme feeds, and that prices your risk in euros of exposure.</p>
      <div class="actions">
        <a class="btn-primary" href="/en/contact" target="_top">Book a free intake <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        <a class="btn-link" href="/en/cyber-digital-twin" target="_top">Explore the Cyber Digital Twin →</a>
      </div>
    </div>
  </div>
</section>

<!-- THESIS -->
<section class="thesis">
  <div class="wrap">
    <div class="big reveal">Most OT security engagements end with a document. Ours end with a <b>model you own.</b></div>
    <div class="cols reveal">
      <p>Every service on this page feeds one thing: your <b>Cyber Digital Twin</b> — assets, risks and controls held as data, not slideware. That model is what lets leadership see risk as euros of exposure, defend a decision to a board or a regulator, and keep the picture current long after an engagement ends.</p>
      <p>And we build it <b>with you, not around you.</b> OXOT is vendor-neutral, works passive-first on the plant floor, and embeds alongside your engineers — because the measure of good OT consulting isn't how indispensable we become. It's how quickly you stop needing us.</p>
    </div>
    <div class="spine-note reveal"><span class="dot"></span>Seven services, one spine: the Cyber Digital Twin</div>
  </div>
</section>

<!-- CDT — THE SPINE (interactive) -->
<section class="cdt">
  <div class="wrap">
    <div class="reveal">
      <div class="eyebrow">The spine · Cyber Digital Twin</div>
      <h2>Model your environment in physics.</h2>
      <p class="sub">Most digital-twin and asset tools take an IT approach: enumerate the boxes, list what's on them, call it an inventory. OXOT models your plant in physics — built on the <b style="color:#fff;font-weight:600">DEXPI&nbsp;2.0</b> process-engineering standard, so the twin reasons in P&amp;IDs, process functions and real plant behaviour. Exposure is judged by consequence to the process, not a CVSS number copied over from IT.</p>
    </div>

    <!-- BOM family interactive -->
    <div class="bomwrap">
      <div class="reveal">
        <div class="kicker" style="margin-bottom:16px">One model · an entire family of bills of materials</div>
        <div class="bomchips" id="bomchips" role="tablist" aria-label="Bill of materials types"></div>
        <p style="font:400 13.5px/1.65 var(--sans);color:rgba(234,240,247,.5);margin:18px 0 0">Extensibility isn't a feature — it's the design, and the reason one model answers many regulations. Each BOM is a real section of the twin; each extends as new obligations land.</p>
      </div>
      <div class="bomdetail reveal" id="bomdetail" aria-live="polite">
        <div class="name" id="bomName">—</div>
        <div class="role" id="bomRole">—</div>
        <div class="fwk-label">Feeds the digital file for</div>
        <div class="fwks" id="fwks"></div>
      </div>
    </div>

    <!-- BOM tier ladder -->
    <div class="ladder reveal">
      <div class="kicker">Nested &amp; versioned — from a single interface to a whole facility</div>
      <div class="tiers" id="tiers"></div>
    </div>

    <!-- capabilities -->
    <div class="caps">
      <div class="cap reveal">
        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>
        <h4>Model in physics</h4>
        <p>An engineering-true twin rendered as <b>P&amp;IDs</b> and process behaviour — not an asset spreadsheet.</p>
      </div>
      <div class="cap reveal">
        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
        <h4>One single source of truth</h4>
        <p>Organisation-wide documentation and the full BOM family — versioned, and exportable to every framework.</p>
      </div>
      <div class="cap reveal">
        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3v18h18"/><path d="M7 15l4-6 3 4 4-8"/></svg>
        <h4>Simulate &amp; ask "what if"</h4>
        <p>Run scenarios and <b>Monte Carlo</b> across the model — see how a change, failure or attack propagates before it happens, priced in euros.</p>
      </div>
      <div class="cap reveal">
        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <h4>Track what's exploitable</h4>
        <p>Vulnerabilities, attack surface and threat models cross-referenced against the model, weighted by real-world exploit likelihood (<b>EPSS</b>).</p>
      </div>
      <div class="cap reveal">
        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/></svg>
        <h4>Prioritise by consequence</h4>
        <p><b>TACAM</b> fingerprints threat actors across seven dimensions into an auditable <b>Actor Threat Quotient (ATQ, 0–100)</b>; work is ranked by consequence — safety, reliability, minimum operating requirements — times probability.</p>
      </div>
      <div class="cap reveal">
        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 4l16 16" stroke-width="1.4"/></svg>
        <h4>Passive by default</h4>
        <p>All of it from the information the twin already holds. <b>No active scanners on production, no agents on controllers.</b></p>
      </div>
    </div>

    <div class="cdt-cta reveal">
      <a class="btn-orange" href="/en/cyber-digital-twin" target="_top">See the Cyber Digital Twin <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      <a class="btn-ghost-d" href="/en/seldon-live" target="_top">Watch it run in Seldon Live</a>
    </div>
  </div>
</section>

<!-- SEVEN SERVICES -->
<section class="services">
  <div class="wrap">
    <div class="reveal">
      <div class="eyebrow">What we do</div>
      <h2>Seven ways we build and use the model with you.</h2>
    </div>
    <div class="svc-list" id="svcList"></div>
  </div>
</section>

<!-- ETHOS -->
<section class="ethos">
  <div class="wrap">
    <div class="grid">
      <div class="reveal">
        <h2>Engagements designed to end.</h2>
      </div>
      <div class="reveal">
        <p>The best OT security engagement ends with you not needing us. We work vendor-neutral, passive-first, and side by side with your engineers — building the operating model, the runbooks and the confidence for your team to run OT security themselves, with the twin as their system of record.</p>
        <div class="pills">
          <span class="pill">Vendor-neutral</span>
          <span class="pill">Passive-first</span>
          <span class="pill">Evidence you own</span>
          <span class="pill">Board- &amp; regulator-legible</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final">
  <div class="wrap">
    <div class="reveal">
      <h2>Not sure where to start?</h2>
      <p>A free intake gives you an honest read on your priorities and the fastest path to reducing OT risk — and, if it helps, the first sketch of your Cyber Digital Twin.</p>
      <div class="actions">
        <a class="btn-primary" href="/en/contact" target="_top">Book your intake <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        <a class="btn-link" href="/en/cra-readiness-check" target="_top">Try the CRA self-check →</a>
      </div>
    </div>
  </div>
</section>

<script>
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- data ---- */
  var BOMS = [
    {k:'SBOM',  n:'Software Bill of Materials',      d:'Every library, version and dependency inside your firmware and applications — the layer the CRA now expects in a product technical file.', f:['CRA','EU AI Act']},
    {k:'HBOM',  n:'Hardware Bill of Materials',      d:'Physical components and their provenance, tied to the devices and skids they sit in.', f:['CRA','Machinery','SoCI']},
    {k:'CBOM',  n:'Cryptography Bill of Materials',  d:'Every algorithm, key and certificate in the estate — the basis for a defensible post-quantum migration plan.', f:['CRA','IEC 62443','EU AI Act']},
    {k:'SaaSBOM',n:'SaaS & Service Bill of Materials',d:'The cloud and third-party services your systems depend on — the supply chain most inventories miss.', f:['NIS2','SoCI']},
    {k:'OBOM',  n:'Operations Bill of Materials',    d:'The operational configuration and runtime dependencies of a plant as it actually runs.', f:['IEC 62443','CLC/TS 50701']},
    {k:'ML-BOM',n:'AI / ML Bill of Materials',       d:'The models, training-data lineage and inference dependencies you increasingly run in OT — the evidence the AI Act asks for.', f:['EU AI Act','CRA']}
  ];
  var ALL_FWK = ['CRA','EU AI Act','Machinery','IEC 62443','CLC/TS 50701','SoCI','NIS2'];
  var TIERS = ['sub-interface','component','device','module / skid','system','network','site','facility'];
  var SERVICES = [
    {n:'01', t:'OT Security Assessments', s:'Understand where you actually stand — scoped to your operational reality, not an IT checklist.',
     b:'An assessment from OXOT starts where the risk lives: in process, safety and continuity on the plant floor. You don’t get a binder — you get a prioritised, evidence-backed read that becomes the first layer of your Cyber Digital Twin. We work passive-first: discovery runs without touching production, and every finding traces to something observable.',
     f:[['Scope','a site, a line or a defined zone'],['Duration','typically 2–6 weeks'],['Basis','IEC 62443-3-2 + your operational risk'],['Approach','passive-first, no production impact'],['Output','a prioritised risk register + roadmap']]},
    {n:'02', t:'Cyber Digital Twin', s:'The living model everything else feeds — evidence as data, not documents.',
     b:'The spine of every engagement: a physics-based model that turns your OT reality into portable evidence, priced in euros and defensible to a regulator. Assessments seed it; programmes keep it current; architecture is designed in it.',
     link:'/en/cyber-digital-twin', linkText:'Explore the Cyber Digital Twin →', f:[]},
    {n:'03', t:'OT Security Programmes', s:'Turn a backlog of findings into governed, multi-site risk reduction — not activity.',
     b:'Most organisations don’t lack findings — they lack a way to deliver them. An OXOT programme sequences recommendations into a governed, multi-site effort measured in risk reduction. Because the twin keeps the priority list honest as the estate changes, wave three still targets your biggest exposure — not last year’s.',
     f:[['Horizon','typically 12–36 months, in waves'],['Scope','sites, business units or regions'],['Governance','a steering model with clear KPIs'],['Basis','risk-based, IEC 62443 lifecycle'],['Outcome','measurable, reportable risk reduction']]},
    {n:'04', t:'Architecture & Segmentation', s:'Zones, conduits and segmentation that hold up in production — not just on a diagram.',
     b:'Segmentation is where OT security holds or fails. OXOT designs zone-and-conduit architectures on IEC 62443-3-2 lines — assets grouped by function and risk, conduits defined, safety systems isolated, remote paths brokered. We design it in the twin and for the plant floor: a model your engineers can operate and an auditor can follow.',
     f:[['Basis','IEC 62443-3-2 zones & conduits'],['Focus','safety isolation, OT/IT boundary, DMZ'],['Output','target architecture + staged plan'],['Fit','survives production and maintenance']]},
    {n:'05', t:'Secure Remote Access', s:'Cut the risk in vendor and remote access — without stopping maintenance.',
     b:'Remote access is where most OT incidents begin: OEM tunnels, forgotten vendor accounts, connectivity that grew organically and was never inventoried. OXOT replaces the sprawl with least-privilege, brokered, monitored access — designed so maintenance still gets done. Every path is inventoried in the twin, every session authenticated and recorded.',
     f:[['Principle','least privilege, brokered, monitored'],['Coverage','employees, vendors and OEMs'],['Controls','MFA, just-in-time, session recording'],['Standard','IEC 62443, NIS2 supply-chain'],['Outcome','fully auditable remote access']]},
    {n:'06', t:'OT Security Baseline', s:'The floor every site must meet — realistic, repeatable, provable.',
     b:'A baseline is the floor: the controls that must be true everywhere before anyone debates the advanced stuff. OXOT sets one that’s realistic for your plants, repeatable across sites, and mapped to IEC 62443 security levels — so “secure enough” means the same thing everywhere. It rolls out site by site, and you can hand it to an auditor without a scramble, because the evidence already lives in the twin.',
     f:[['Purpose','a minimum every site can meet'],['Basis','IEC 62443 SL-1 / SL-2'],['Scope','per zone and asset class'],['Format','control checklist + evidence'],['Outcome','consistent, auditable OT security']]},
    {n:'07', t:'Capability Transfer', s:'Engagements designed to end — with your team owning OT security.',
     b:'The best engagement ends with you not needing us. We build the operating model, the roles, the runbooks and the confidence for your team to run OT security themselves — embedding alongside your people rather than handing over a document. Your team learns by doing the work with us and keeps the twin as its system of record.',
     f:[['Goal','self-sufficiency — your team owns it'],['Format','coaching + working side by side'],['Audience','OT eng, IT security, operations'],['Artefacts','operating model, RACI, runbooks']]}
  ];

  /* ---- BOM interactive ---- */
  var chips = document.getElementById('bomchips');
  var fwksEl = document.getElementById('fwks');
  var nameEl = document.getElementById('bomName');
  var roleEl = document.getElementById('bomRole');
  fwksEl.innerHTML = ALL_FWK.map(function(f){return '<span class="fwk" data-f="'+f+'">'+f+'</span>';}).join('');
  function selectBom(i){
    var b = BOMS[i];
    [].forEach.call(chips.children, function(c,ix){ c.classList.toggle('on', ix===i); c.setAttribute('aria-selected', ix===i?'true':'false'); });
    nameEl.textContent = b.n;
    roleEl.textContent = b.d;
    [].forEach.call(fwksEl.children, function(el){ el.classList.toggle('hot', b.f.indexOf(el.getAttribute('data-f'))>-1); });
  }
  chips.innerHTML = BOMS.map(function(b,i){return '<button class="chip" role="tab" aria-selected="false"><span>'+b.k+'</span><small>'+b.n.replace(/ Bill of Materials/,'').replace('AI / ML','AI / ML')+'</small></button>';}).join('');
  [].forEach.call(chips.children, function(c,i){ c.addEventListener('click', function(){ selectBom(i); }); });
  selectBom(0);

  /* ---- tiers ladder ---- */
  var tiersEl = document.getElementById('tiers');
  tiersEl.innerHTML = TIERS.map(function(t,i){
    return '<span class="tier" data-i="'+i+'">'+t+'</span>' + (i<TIERS.length-1 ? '<span class="tarrow">→</span>' : '');
  }).join('');
  var tierNodes = [].slice.call(tiersEl.querySelectorAll('.tier'));

  /* ---- services render ---- */
  var svcEl = document.getElementById('svcList');
  svcEl.innerHTML = SERVICES.map(function(s){
    var facts = s.f && s.f.length ? '<ul class="facts">'+s.f.map(function(f){return '<li><b>'+f[0]+'</b><span>'+f[1]+'</span></li>';}).join('')+'</ul>' : '';
    var right = s.link
      ? '<div><a class="btn-link" href="'+s.link+'" target="_top">'+s.linkText+'</a></div>'
      : facts;
    var flag = s.n==='04' ? '' : '';
    return '<div class="svc reveal"><div class="num">'+s.n+'</div>'+
      '<div><h3>'+s.t+'</h3><p class="sum">'+s.s+'</p><p class="body">'+s.b+'</p></div>'+
      '<div>'+right+'</div></div>';
  }).join('');

  /* ---- reveal + tier stagger via IntersectionObserver ---- */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)){
    reveals.forEach(function(r){ r.classList.add('in'); });
    tierNodes.forEach(function(t){ t.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in');
          if(e.target.id==='tiers' || e.target.classList.contains('ladder')){}
          io.unobserve(e.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
    reveals.forEach(function(r){ io.observe(r); });
    // stagger the tiers when the ladder scrolls in
    var ladder = document.querySelector('.ladder');
    var lio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          tierNodes.forEach(function(t,i){ setTimeout(function(){ t.classList.add('in'); }, i*90); });
          lio.unobserve(e.target);
        }
      });
    }, {threshold:.3});
    if(ladder) lio.observe(ladder);
  }
})();
</script>
</body>
</html>
