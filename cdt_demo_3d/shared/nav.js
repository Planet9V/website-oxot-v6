/**
 * OXOT Cyber Digital Twin - Unified Navigation Header & Footer Component
 * Automatically injects the official header and footer across all root and sub-directory pages.
 */

(function () {
  function getRootPrefix() {
    const path = window.location.pathname;
    if (path.includes('/pages/industries/') || path.includes('/pages/assurance/') || path.includes('/pages/consulting/') || path.includes('/pages/resources/') || path.includes('/pages/company/')) {
      return '../../';
    } else if (path.includes('/pages/')) {
      return '../';
    }
    return './';
  }

  const root = getRootPrefix();
  const currentPath = window.location.pathname;

  function renderNav() {
    const headerEl = document.getElementById('oxot-global-header');
    if (!headerEl) return;

    headerEl.innerHTML = `
      <header class="oxot-nav">
        <div class="container oxot-nav-container">
          <div class="oxot-nav-left">
            <a href="${root}index.html" class="oxot-logo">
              <div class="oxot-logo-box">OX</div>
              <div class="oxot-logo-text">
                <span class="oxot-logo-primary">OXOT</span>
                <span class="oxot-logo-secondary">Cyber Digital Twin</span>
              </div>
            </a>

            <nav class="desktop-nav" aria-label="Main Navigation">
              <ul class="oxot-nav-links">
                <li>
                  <a href="${root}index.html" class="oxot-nav-link ${currentPath.endsWith('index.html') && !currentPath.includes('/pages/') ? 'active' : ''}">
                    Platform
                  </a>
                </li>

                <li class="nav-item-dropdown">
                  <a href="${root}services.html" class="oxot-nav-link ${currentPath.includes('services') || currentPath.includes('demo-hub') || currentPath.includes('due-diligence') || currentPath.includes('process-workshops') ? 'active' : ''}">
                    <span>Decision Sprint &amp; Services</span>
                    <span class="nav-badge" style="font-family: monospace; font-size: 0.62rem; font-weight: 800; padding: 1px 6px; border-radius: 4px; background: rgba(238,118,35,0.16); color: #EE7623; border: 1px solid rgba(238,118,35,0.45); margin-left: 6px; letter-spacing: 0.05em;">21-DAY</span>
                    <span style="font-size: 0.65rem; opacity: 0.7; margin-left: 2px;">▼</span>
                  </a>
                  <div class="nav-dropdown-menu">
                    <a href="${root}services.html#briefing-suite" class="nav-dropdown-item">
                      <span class="dd-title">Customer Briefing Suite</span>
                      <span class="dd-desc">7-stage executive walkthrough &amp; decision justification</span>
                    </a>
                    <a href="${root}services.html#sprint-lifecycle" class="nav-dropdown-item">
                      <span class="dd-title">21-Day Sprint Lifecycle</span>
                      <span class="dd-desc">3-week rapid timeline &amp; $4.2M hyperscale case study</span>
                    </a>
                    <a href="${root}services.html#workshop-process" class="nav-dropdown-item">
                      <span class="dd-title">The 2-Workshop Process</span>
                      <span class="dd-desc">4-phase delivery: Threat walk → ALARP spend calculation</span>
                    </a>
                    <a href="${root}services.html#due-diligence" class="nav-dropdown-item">
                      <span class="dd-title">Facility M&amp;A Due Diligence</span>
                      <span class="dd-desc">21-day rapid asset acquisition &amp; OT liability audit</span>
                    </a>
                    <a href="${root}services.html#evidence-trail" class="nav-dropdown-item">
                      <span class="dd-title">Artifacts &amp; Evidence Trail</span>
                      <span class="dd-desc">Audit deliverables: CRA Annex VII, IEC 62443 ZCR, 5-BOMs</span>
                    </a>
                    <a href="${root}services.html#engagement-models" class="nav-dropdown-item">
                      <span class="dd-title">Continuous Living Twin Retainers</span>
                      <span class="dd-desc">Ongoing managed retainer &amp; live compliance drift monitoring</span>
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          
          <div class="oxot-nav-right">
            <a href="${root}master-explorer.html" class="btn btn-dutch-orange btn-sm">
              <span>Launch 3D Twin</span>
              <span>↗</span>
            </a>
            <button class="oxot-hamburger" id="oxot-mobile-menu-toggle" aria-label="Toggle navigation">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Slide-over Mobile Drawer -->
      <div class="sheet-overlay" id="oxot-sheet-overlay"></div>
      <div class="sheet-panel" id="oxot-sheet-panel">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">
          <div style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 700; color: #fff; letter-spacing: 0.15em;">
            O X O T
          </div>
          <button id="oxot-sheet-close" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--dutch-orange); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;">Platform</div>
          <a href="${root}index.html" class="mobile-drawer-link">Platform Overview &amp; Architecture</a>
          
          <div class="dropdown-divider"></div>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--dutch-orange); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;">Decision Sprint &amp; Services (21-Day)</div>
          <a href="${root}services.html#briefing-suite" class="mobile-drawer-link">Customer Briefing Suite</a>
          <a href="${root}services.html#sprint-lifecycle" class="mobile-drawer-link">21-Day Sprint Lifecycle</a>
          <a href="${root}services.html#workshop-process" class="mobile-drawer-link">The 2-Workshop Process</a>
          <a href="${root}services.html#due-diligence" class="mobile-drawer-link">Facility M&amp;A Due Diligence</a>
          <a href="${root}services.html#evidence-trail" class="mobile-drawer-link">Artifacts &amp; Evidence Trail</a>
          <a href="${root}services.html#engagement-models" class="mobile-drawer-link">Continuous Twin Retainers</a>
        </div>
      </div>
    `;

    // Bind Mobile Drawer
    const toggleBtn = document.getElementById('oxot-mobile-menu-toggle');
    const closeBtn = document.getElementById('oxot-sheet-close');
    const overlay = document.getElementById('oxot-sheet-overlay');
    const panel = document.getElementById('oxot-sheet-panel');

    function openMenu() {
      overlay.classList.add('open');
      panel.classList.add('open');
    }
    function closeMenu() {
      overlay.classList.remove('open');
      panel.classList.remove('open');
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
  }

  function renderFooter() {
    const footerEl = document.getElementById('oxot-global-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
      <footer class="oxot-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col" style="grid-column: span 1.5;">
              <div class="oxot-logo" style="margin-bottom: 1.25rem;">
                <div class="oxot-logo-box">OX</div>
                <div class="oxot-logo-text">
                  <span class="oxot-logo-primary">OXOT</span>
                  <span class="oxot-logo-secondary">Cyber Digital Twin</span>
                </div>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem; max-width: 320px;">
                Before you change and spend, replicate your facility. High-fidelity OT simulation, risk quantification, and architectural assurance for critical infrastructure.
              </p>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                100% Passive-First Ingestion • Zero Operational Interruption
              </div>
            </div>

            <div class="footer-col">
              <h5 class="footer-heading">Industry Verticals</h5>
              <ul class="footer-links">
                <li><a href="${root}pages/industries/hyperscale.html">Hyperscale Datacenters</a></li>
                <li><a href="${root}pages/industries/energy.html">Energy & Grid Utilities</a></li>
                <li><a href="${root}pages/industries/water.html">Water & Wastewater</a></li>
                <li><a href="${root}pages/industries/rail.html">Rail & Transit (TS 50701)</a></li>
                <li><a href="${root}pages/industries/manufacturing.html">Manufacturing & Process</a></li>
                <li><a href="${root}pages/industries/defense.html">Defense & Sovereign Air-Gap</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h5 class="footer-heading">Digital Twin Tools</h5>
              <ul class="footer-links">
                <li><a href="${root}demo-hub.html">Executive Demo Hub</a></li>
                <li><a href="${root}master-explorer.html">3D Campus Explorer</a></li>
                <li><a href="${root}due-diligence.html">Due Diligence Sprints</a></li>
                <li><a href="${root}artifacts-evidence.html">Evidence Ingestion Trail</a></li>
                <li><a href="${root}process-workshops.html">Engineering Workshops</a></li>
                <li><a href="${root}executive-brochure.html">Technical Specification</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h5 class="footer-heading">The Four Decisions</h5>
              <ul class="footer-links">
                <li><a href="${root}index.html#decisions">What do we fix first?</a></li>
                <li><a href="${root}index.html#decisions">What should we spend?</a></li>
                <li><a href="${root}index.html#decisions">Can we change safely?</a></li>
                <li><a href="${root}index.html#decisions">What can we leave alone?</a></li>
                <li style="margin-top: 1rem;">
                  <a href="${root}demo-hub.html" class="btn btn-dutch-orange btn-sm" style="width: 100%; justify-content: center;">
                    Book Technical Briefing
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <div>© ${new Date().getFullYear()} OXOT B.V. All rights reserved. Sovereign OT Security & Cyber Digital Twin Architecture.</div>
            <div style="display: flex; gap: 1.5rem;">
              <span>IEC 62443 Certified Models</span>
              <span>EU NIS2 & CRA Ready</span>
              <span>TS 50701 Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderNav();
      renderFooter();
    });
  } else {
    renderNav();
    renderFooter();
  }
})();
