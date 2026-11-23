/**
 * E Doctor Prototype — Navigation Layer
 * Connects all 16 screens + 3 bonus screens
 * Demo data only — no real backend
 */

const SCREENS = {
  '01-welcome.html':       { title: 'Welcome',                  num: 1  },
  '02-login.html':         { title: 'Log In',                   num: 2  },
  '03-signup.html':        { title: 'Sign Up',                  num: 3  },
  '04-dashboard.html':     { title: 'Home Dashboard',           num: 4  },
  '05-scanner.html':       { title: 'Medicine Scan',            num: 5  },
  '06-scan-confirm.html':  { title: 'Scan Confirmation',        num: 6  },
  '07-auth-result.html':   { title: 'Authenticity Result',      num: 7  },
  '08-price-search.html':  { title: 'Price Search',             num: 8  },
  '09-price-compare.html': { title: 'Price Comparison',         num: 9  },
  '10-rx-reader.html':     { title: 'Prescription Reader',      num: 10 },
  '11-rx-review.html':     { title: 'Prescription Review',      num: 11 },
  '12-symptom-ai.html':    { title: 'Symptom AI Chat',          num: 12 },
  '13-profile.html':       { title: 'Alerts / Profile',         num: 13 },
  '14-schedule.html':      { title: 'Medication Schedule',      num: 14 },
  'B1-med-info.html':      { title: 'Medicine Info (Bonus)',    num: 'B1'},
  'B2-alternatives.html':  { title: 'Med Alternatives (Bonus)', num: 'B2'},
  'B3-help.html':          { title: 'Help & Support (Bonus)',   num: 'B3'},
};

// Navigation routing: button text keywords → target page
const ROUTE_MAP = {
  '01-welcome.html': [
    { match: /get started|create free|sign up|register/i,  target: '03-signup.html'        },
    { match: /log.?in|explore as guest/i,                  target: '02-login.html'          },
  ],
  '02-login.html': [
    { match: /log.?in|sign.?in|continue with google|passkey|healthpass/i, target: '04-dashboard.html' },
    { match: /sign.?up|create.?account|register/i,         target: '03-signup.html'         },
    { match: /arrow_back|back/i,                           target: '01-welcome.html'        },
    { match: /forgot.?password/i,                          target: '02-login.html'          },
  ],
  '03-signup.html': [
    { match: /create.?account|sign.?up|register|arrow_forward/i, target: '04-dashboard.html' },
    { match: /arrow_back|back|log.?in/i,                   target: '02-login.html'          },
  ],
  '04-dashboard.html': [
    { match: /scan.?now|camera.?scan|barcode|medicine.?scan/i, target: '05-scanner.html'   },
    { match: /prescription|ocr|reader/i,                   target: '10-rx-reader.html'      },
    { match: /price|cost/i,                                target: '08-price-search.html'   },
    { match: /symptom|ai.?chat|guidance/i,                 target: '12-symptom-ai.html'     },
    { match: /schedule|medication|reminder/i,              target: '14-schedule.html'       },
    { match: /profile|history|safety|person/i,             target: '13-profile.html'        },
    { match: /view.?history/i,                             target: '13-profile.html'        },
    { match: /help|support/i,                              target: 'B3-help.html'           },
  ],
  '05-scanner.html': [
    { match: /check.?medicine|confirm|verify|lookup|view|scan.?now/i, target: '06-scan-confirm.html' },
    { match: /arrow_back|back/i,                           target: '04-dashboard.html'      },
    { match: /help|photo.?guide/i,                         target: 'B3-help.html'           },
    { match: /type.?manually|enter.?manually|keyboard/i,   target: '06-scan-confirm.html'  },
  ],
  '06-scan-confirm.html': [
    { match: /confirm|check.?drug|arrow_forward/i,         target: '07-auth-result.html'   },
    { match: /rescan|arrow_back|back/i,                    target: '05-scanner.html'        },
    { match: /enter.?manually|keyboard/i,                  target: '06-scan-confirm.html'  },
    { match: /help/i,                                      target: 'B3-help.html'           },
  ],
  '07-auth-result.html': [
    { match: /compare.?price|payment|price/i,              target: '08-price-search.html'  },
    { match: /drug.?info|full.?drug|side.?effect/i,        target: 'B1-med-info.html'      },
    { match: /arrow_back|back/i,                           target: '06-scan-confirm.html'   },
    { match: /pharmacist|consult/i,                        target: '12-symptom-ai.html'     },
  ],
  '08-price-search.html': [
    { match: /select.?offer|reserve|switch.?to.?generic|find.?price|bio.?equivalen/i, target: '09-price-compare.html' },
    { match: /prescription.?scanner|launch.?prescription/i, target: '10-rx-reader.html'   },
    { match: /arrow_back|back/i,                           target: '07-auth-result.html'   },
  ],
  '09-price-compare.html': [
    { match: /select.?offer|reserve|select.?sun|select.?teva|select.?pharma/i, target: '04-dashboard.html' },
    { match: /prescription.?scanner|launch.?prescription/i, target: '10-rx-reader.html'   },
    { match: /alternative|alternatives/i,                  target: 'B2-alternatives.html'  },
    { match: /arrow_back|back/i,                           target: '08-price-search.html'  },
  ],
  '10-rx-reader.html': [
    { match: /edit.*correct|tune|review|save.*prescri/i,   target: '11-rx-review.html'     },
    { match: /arrow_back|back/i,                           target: '04-dashboard.html'      },
    { match: /pharmacist|callback/i,                       target: '12-symptom-ai.html'     },
  ],
  '11-rx-review.html': [
    { match: /save.*schedule|playlist|add.*schedule/i,     target: '14-schedule.html'      },
    { match: /flag|rescan/i,                               target: '10-rx-reader.html'      },
    { match: /arrow_back|back/i,                           target: '10-rx-reader.html'      },
  ],
  '12-symptom-ai.html': [
    { match: /book.*consult|clinical.?consult/i,           target: '13-profile.html'        },
    { match: /arrow_back|back/i,                           target: '04-dashboard.html'      },
    { match: /send/i,                                      target: '12-symptom-ai.html'     },
  ],
  '13-profile.html': [
    { match: /arrow_back|back/i,                           target: '04-dashboard.html'      },
    { match: /schedule/i,                                  target: '14-schedule.html'       },
  ],
  '14-schedule.html': [
    { match: /add.?medication/i,                           target: '10-rx-reader.html'      },
    { match: /refill|dispatch/i,                           target: '08-price-search.html'  },
    { match: /arrow_back|back/i,                           target: '04-dashboard.html'      },
  ],
  'B1-med-info.html': [
    { match: /arrow_back|back/i,                           target: '07-auth-result.html'   },
    { match: /price|compare/i,                             target: '08-price-search.html'  },
    { match: /alternative/i,                               target: 'B2-alternatives.html'  },
  ],
  'B2-alternatives.html': [
    { match: /compare.?pharmacies|pharmacy/i,              target: '09-price-compare.html' },
    { match: /arrow_back|back|acknowledge.*return/i,       target: '09-price-compare.html' },
  ],
  'B3-help.html': [
    { match: /arrow_back|back/i,                           target: '04-dashboard.html'      },
    { match: /support|chat|report/i,                       target: 'B3-help.html'           },
  ],
};

// ─── Inject HUD ───────────────────────────────────────────────────────────────
(function buildHUD() {
  const currentFile = location.pathname.split('/').pop() || '01-welcome.html';
  const screenInfo  = SCREENS[currentFile] || { title: currentFile, num: '?' };
  const routes      = ROUTE_MAP[currentFile] || [];

  // All screens list for the menu
  const mainScreens = [
    ['01-welcome.html',       '1. Welcome'],
    ['02-login.html',         '2. Log In'],
    ['03-signup.html',        '3. Sign Up'],
    ['04-dashboard.html',     '4. Dashboard'],
    ['05-scanner.html',       '5. Medicine Scan'],
    ['06-scan-confirm.html',  '6. Scan Confirm'],
    ['07-auth-result.html',   '7. Auth Result'],
    ['08-price-search.html',  '8. Price Search'],
    ['09-price-compare.html', '9. Price Compare'],
    ['10-rx-reader.html',     '10. Rx Reader'],
    ['11-rx-review.html',     '11. Rx Review'],
    ['12-symptom-ai.html',    '12. Symptom AI'],
    ['13-profile.html',       '13. Profile / Alerts'],
    ['14-schedule.html',      '14. Schedule'],
  ];
  const bonusScreens = [
    ['B1-med-info.html',    'B1. Medicine Info'],
    ['B2-alternatives.html','B2. Alternatives'],
    ['B3-help.html',        'B3. Help & Support'],
  ];

  const menuItems = [...mainScreens, ...bonusScreens]
    .map(([file, label]) => {
      const active = file === currentFile ? 'background:#1a3a5c;font-weight:700;' : '';
      return `<a href="${file}" style="display:block;padding:6px 10px;color:#e0f0ff;text-decoration:none;font-size:12px;${active}" onclick="edNav('${file}');return false;">${label}</a>`;
    }).join('');

  const hud = document.createElement('div');
  hud.id = 'ed-hud';
  hud.innerHTML = `
    <style>
      #ed-hud {
        position: fixed; top: 0; left: 0; right: 0; z-index: 99999;
        background: linear-gradient(90deg,#0a2240,#1a4a7a);
        color: #fff; font-family: 'Google Sans',Arial,sans-serif;
        display: flex; align-items: center; gap: 8px;
        padding: 6px 12px; box-shadow: 0 2px 8px rgba(0,0,0,.4);
        font-size: 13px; height: 44px; box-sizing: border-box;
      }
      #ed-hud .ed-logo { font-weight: 800; color: #4db8ff; font-size: 15px; letter-spacing:.5px; }
      #ed-hud .ed-screen { color: #a8d4ff; flex: 1; }
      #ed-hud button { background:#1a4a7a; color:#fff; border:1px solid #4db8ff40;
        border-radius:6px; padding:4px 10px; cursor:pointer; font-size:12px; }
      #ed-hud button:hover { background:#1e5fa0; }
      #ed-hud .ed-demo-badge { background:#ff6b35; color:#fff; font-size:10px;
        padding:2px 6px; border-radius:10px; font-weight:700; }
      #ed-nav-menu {
        display: none; position: fixed; top: 44px; right: 0; width: 220px;
        background: #0d2d4a; border-left: 2px solid #1a4a7a;
        max-height: calc(100vh - 44px); overflow-y: auto;
        z-index: 99998; box-shadow: -4px 4px 16px rgba(0,0,0,.5);
        padding: 6px 0;
      }
      #ed-nav-menu .menu-section {
        font-size: 10px; color: #4db8ff; padding: 8px 10px 2px;
        font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
      }
      body { padding-top: 44px !important; }
    </style>
    <span class="ed-logo">⚕ E Doctor</span>
    <span class="ed-demo-badge">DEMO</span>
    <span class="ed-screen">Screen ${screenInfo.num}: ${screenInfo.title}</span>
    <button onclick="edGoHome()">🏠 Home</button>
    <button onclick="history.back()">← Back</button>
    <button onclick="edToggleMenu()" id="ed-menu-btn">☰ All Screens</button>
    <div id="ed-nav-menu">
      <div class="menu-section">Main Flow (16 screens)</div>
      ${mainScreens.map(([file, label]) => {
        const active = file === currentFile ? 'background:#1a3a5c;font-weight:700;' : '';
        return `<a href="${file}" style="display:block;padding:6px 10px;color:#e0f0ff;text-decoration:none;font-size:12px;${active}">${label}</a>`;
      }).join('')}
      <div class="menu-section">Bonus Screens</div>
      ${bonusScreens.map(([file, label]) => {
        const active = file === currentFile ? 'background:#1a3a5c;font-weight:700;' : '';
        return `<a href="${file}" style="display:block;padding:6px 10px;color:#e0f0ff;text-decoration:none;font-size:12px;${active}">${label}</a>`;
      }).join('')}
    </div>
  `;
  document.body.insertBefore(hud, document.body.firstChild);

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (!e.target.closest('#ed-hud')) {
      document.getElementById('ed-nav-menu').style.display = 'none';
    }
  });
})();

function edNav(target) { location.href = target; }
function edGoHome()    { location.href = '04-dashboard.html'; }
function edToggleMenu() {
  const m = document.getElementById('ed-nav-menu');
  m.style.display = m.style.display === 'block' ? 'none' : 'block';
}

// ─── Button Routing Engine ────────────────────────────────────────────────────
(function attachRoutes() {
  const currentFile = location.pathname.split('/').pop() || '01-welcome.html';
  const routes = ROUTE_MAP[currentFile] || [];
  if (!routes.length) return;

  function routeClick(el) {
    const text = el.textContent.trim();
    for (const r of routes) {
      if (r.match.test(text)) {
        location.href = r.target;
        return true;
      }
    }
    return false;
  }

  // Intercept all button clicks
  document.addEventListener('click', e => {
    const btn = e.target.closest('button, [role="button"], .btn, .button, a[href="#"], a[href="javascript:void(0)"], a:not([href])');
    if (!btn) return;
    if (btn.closest('#ed-hud')) return; // Don't intercept HUD buttons
    if (routeClick(btn)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Also handle clickable divs with cursor:pointer that look like buttons
  document.addEventListener('click', e => {
    const el = e.target.closest('[onclick], .clickable, .card, .feature-card, .action-card, .nav-item, .tab-item');
    if (!el || el.closest('#ed-hud')) return;
    routeClick(el);
  });
})();
