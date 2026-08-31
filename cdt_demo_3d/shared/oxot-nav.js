/**
 * OXOT Cyber Digital Twin - Unified Global Navigation & Mobile Drawer (Sheet)
 * Features:
 *  - Official OXOT Dutch Orange Navigation Bar
 *  - shadcn-style Mobile Drawer (Sheet) with fast scene & page switching
 *  - Service Worker Auto-Registration for Instant Offline/Cache Loading (<25ms)
 */

(function() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const NAV_ITEMS = [
    { 
      label: 'Platform', 
      href: 'index.html', 
      isDropdown: false 
    },
    { 
      label: 'Decision Sprint & Services', 
      href: 'services.html', 
      isDropdown: true,
      badge: '21-DAY',
      dropdownItems: [
        { label: 'Customer Briefing Suite', href: 'services.html#briefing-suite', desc: '7-stage executive walkthrough & decision justification' },
        { label: '21-Day Sprint Lifecycle', href: 'services.html#sprint-lifecycle', desc: '3-week rapid timeline & $4.2M hyperscale case study' },
        { label: 'The 2-Workshop Process', href: 'services.html#workshop-process', desc: '4-phase delivery: Threat walk → ALARP spend calculation' },
        { label: 'Facility M&A Due Diligence', href: 'services.html#due-diligence', desc: '21-day rapid asset acquisition & OT liability audit' },
        { label: 'Artifacts & Evidence Trail', href: 'services.html#evidence-trail', desc: 'Audit deliverables: CRA Annex VII, IEC 62443 ZCR, 5-BOMs' },
        { label: 'Continuous Living Twin Retainers', href: 'services.html#engagement-models', desc: 'Ongoing managed retainer & live compliance drift monitoring' }
      ]
    }
  ];

  const SCENES = [
    { label: 'Hyperscale Facility (3D)', href: 'master-explorer.html' }
  ];

  function renderHeader() {
    if (window.self !== window.top) return; // Do not render inside iframes
    if (document.querySelector('.oxot-header')) return;

    const header = document.createElement('header');
    header.className = 'oxot-header';

    const linksHtml = NAV_ITEMS.map(item => {
      const isActive = currentPath === item.href || (currentPath === '' && item.href === 'index.html');
      const activeClass = isActive ? 'active' : '';
      const chevron = item.isDropdown ? '<span style="font-size: 0.65rem; opacity: 0.7; margin-left: 2px;">▾</span>' : '';
      const badgeHtml = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
      
      let dropdownHtml = '';
      if (item.isDropdown && item.dropdownItems) {
        const ddItemsHtml = item.dropdownItems.map(dd => `
          <a href="${dd.href}" class="nav-dropdown-item">
            <span class="dd-title">${dd.label}</span>
            <span class="dd-desc">${dd.desc}</span>
          </a>
        `).join('');
        dropdownHtml = `<div class="nav-dropdown-menu">${ddItemsHtml}</div>`;
      }

      return `
        <li class="${item.isDropdown ? 'nav-item-dropdown' : ''}">
          <a href="${item.href}" class="oxot-nav-link ${activeClass}">
            <span>${item.label}</span>
            ${badgeHtml}
            ${chevron}
          </a>
          ${dropdownHtml}
        </li>
      `;
    }).join('');

    header.innerHTML = `
      <div class="container oxot-nav-wrap">
        <div class="oxot-nav-left">
          <a href="index.html" class="brand-logo" title="OXOT Cyber Digital Twin">
            O<span class="brand-x">X</span>OT
          </a>
          <ul class="oxot-nav-links">
            ${linksHtml}
          </ul>
        </div>
        <div class="oxot-nav-right">
          <button class="theme-toggle-btn" title="Toggle Theme" aria-label="Toggle theme">
            <span>☼</span>
          </button>
          <a href="master-explorer.html" class="btn btn-dutch-orange">
            Launch 3D Twin ↗
          </a>
          <div class="lang-pill">
            <span class="active">EN</span>
            <span style="opacity:0.3; margin: 0 3px;">|</span>
            <span>NL</span>
          </div>
          <button class="hamburger-btn" id="oxot-mobile-menu-btn" title="Open Menu" aria-label="Open mobile navigation menu">
            <span>☰</span>
          </button>
        </div>
      </div>
    `;

    document.body.prepend(header);
    renderMobileSheet();
  }

  function renderMobileSheet() {
    if (window.self !== window.top) return; // Do not render inside iframes
    if (document.getElementById('oxot-sheet-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'sheet-overlay';
    overlay.id = 'oxot-sheet-overlay';

    const sheetSectionsHtml = NAV_ITEMS.map(item => {
      if (!item.isDropdown) {
        return `
          <div style="margin-bottom: 1.1rem;">
            <a href="${item.href}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.45rem 0.6rem; text-decoration: none; color: var(--foreground); font-size: 0.95rem; font-weight: 700; border-radius: 4px;">
              <span>${item.label} ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}</span>
              <span style="opacity: 0.5;">→</span>
            </a>
          </div>
        `;
      }

      const ddItemsHtml = (item.dropdownItems || []).map(dd => `
        <a href="${dd.href}" style="display: block; padding: 0.45rem 0.6rem; text-decoration: none; color: var(--foreground); font-size: 0.85rem; border-radius: 4px; margin-bottom: 2px;">
          <div style="font-weight: 600; color: var(--foreground);">${dd.label}</div>
          <div style="font-size: 0.72rem; color: var(--muted-foreground);">${dd.desc}</div>
        </a>
      `).join('');

      return `
        <div style="margin-bottom: 1.1rem;">
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--dutch-orange); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; margin-bottom: 0.35rem; padding-left: 0.6rem;">
            ${item.label} ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
          </div>
          <div>${ddItemsHtml}</div>
        </div>
      `;
    }).join('');

    const scenePillsHtml = SCENES.map(sc => `
      <a href="${sc.href}" class="badge badge-outline" style="padding: 0.4rem 0.75rem; font-size: 0.75rem; text-decoration: none; margin-bottom: 0.4rem; display: block;">
        ${sc.label}
      </a>
    `).join('');

    overlay.innerHTML = `
      <div class="sheet-panel" id="oxot-sheet-panel" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div class="sheet-header">
          <div class="brand-logo">
            O<span class="brand-x">X</span>OT
          </div>
          <button class="sheet-close-btn" id="oxot-sheet-close-btn" aria-label="Close navigation menu">
            ✕
          </button>
        </div>

        <div class="sheet-nav-list" style="overflow-y: auto; max-height: calc(100vh - 200px);">
          ${sheetSectionsHtml}
        </div>

        <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border);">
          <a href="master-explorer.html" class="btn btn-dutch-orange" style="width: 100%; margin-bottom: 0.75rem;">
            Launch 3D Twin ↗
          </a>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--muted-foreground);">
            <span>Language: <strong style="color: var(--dutch-orange);">EN</strong> | NL</span>
            <span>v2.4.0</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Event listeners
    const openBtn = document.getElementById('oxot-mobile-menu-btn');
    const closeBtn = document.getElementById('oxot-sheet-close-btn');
    const panel = document.getElementById('oxot-sheet-panel');

    function openSheet() {
      overlay.classList.add('open');
      panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeSheet() {
      overlay.classList.remove('open');
      panel.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openSheet);
    if (closeBtn) closeBtn.addEventListener('click', closeSheet);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSheet();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeSheet();
      }
    });
  }

  function renderFooter() {
    if (window.self !== window.top) return; // Do not render inside iframes
    if (document.querySelector('.oxot-footer')) return;

    const footer = document.createElement('footer');
    footer.className = 'oxot-footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="brand-logo">
              O<span class="brand-x">X</span>OT
            </a>
            <p>
              A living, engineering-grade Cyber Digital Twin of industrial & hyperscale facilities. 
              Simulates attacks, quantifies financial loss (ALE), and generates CRA & IEC 62443 compliance evidence.
            </p>
          </div>
          <div class="footer-col">
            <h5>Industry Verticals</h5>
            <ul class="footer-links">
              <li><a href="pages/industries/hyperscale.html">Hyperscale Datacenters</a></li>
              <li><a href="pages/industries/energy.html">Energy & Utilities (BESS)</a></li>
              <li><a href="pages/industries/water.html">Water & Wastewater</a></li>
              <li><a href="pages/industries/rail.html">Rail (TS 50701)</a></li>
              <li><a href="pages/industries/manufacturing.html">Manufacturing & Process</a></li>
              <li><a href="pages/industries/defense.html">Defense & Sovereign Air-Gap</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Process & Delivery</h5>
            <ul class="footer-links">
              <li><a href="process-workshops.html">3-Phase, 2-Workshop Process</a></li>
              <li><a href="demo-hub.html">Guided Demo Walkthrough</a></li>
              <li><a href="due-diligence.html">Decision Sprint</a></li>
              <li><a href="master-explorer.html">Live 3D Twin (CDT-2)</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Evidence & Assurance</h5>
            <ul class="footer-links">
              <li><a href="artifacts-evidence.html#cra">EU CRA Annex VII File</a></li>
              <li><a href="artifacts-evidence.html#iec">IEC 62443 Zones & Conduits</a></li>
              <li><a href="artifacts-evidence.html#boms">5 Machine-Readable BOMs</a></li>
              <li><a href="artifacts-evidence.html#fmeca">FMECA Hazard Register</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div>© ${new Date().getFullYear()} OXOT Seldon Engine. All rights reserved. Dutch Industrial Intelligence.</div>
          <div>Physics-Based Level 1 Model · Purdue 7-Layer · TACAM 7D Matrix</div>
        </div>
      </div>
    `;
    document.body.appendChild(footer);
  }

  // Service Worker Registration for Instant Offline / Cache Loading (<25ms)
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('[OXOT] Service Worker active, offline caching enabled:', reg.scope);
          })
          .catch((err) => {
            console.debug('[OXOT] Service Worker registration skipped:', err);
          });
      });
    }
  }

  // Theme Toggle Support (Absolute Black / Dark Gray vs Pure White / Light Gray)
  function initTheme() {
    const savedTheme = localStorage.getItem('oxot-theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.add('light-mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('light-mode');
    }
    updateThemeIcon();
  }

  function toggleTheme() {
    const isLight = document.body.classList.contains('light-mode') || document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('light-mode');
      localStorage.setItem('oxot-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.add('light-mode');
      localStorage.setItem('oxot-theme', 'light');
    }
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const isLight = document.body.classList.contains('light-mode') || document.documentElement.getAttribute('data-theme') === 'light';
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.innerHTML = isLight ? '<span>☾</span>' : '<span>☼</span>';
      btn.title = isLight ? 'Switch to Dark Mode (Absolute Black)' : 'Switch to Light Mode';
    });
  }

  function wireThemeToggle() {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderHeader();
      renderFooter();
      initTheme();
      wireThemeToggle();
      registerServiceWorker();
    });
  } else {
    renderHeader();
    renderFooter();
    initTheme();
    wireThemeToggle();
    registerServiceWorker();
  }
})();
