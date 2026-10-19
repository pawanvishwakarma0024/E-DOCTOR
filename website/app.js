/* ════════════════════════════════════════════════════════════════════════
   E Doctor — app.js
   SPA Router + all 16 screen templates + shared components
   Demo data only — no real backend
   ════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ── Helpers ──────────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const icon = (name, cls='', fill=false) =>
  `<span class="material-symbols-outlined ${cls}" ${fill?"style=\"font-variation-settings:'FILL' 1\"":""}>${name}</span>`;
const demoNote = txt =>
  `<div class="demo-note">${icon('info','text-yellow-600')} <span>${txt}</span></div>`;

/* ════════════════════════════════════════════════════════════════════════
   ROUTER
   ════════════════════════════════════════════════════════════════════════ */
const ED = {
  current: 'welcome',
  history: [],

  navigate(route, pushHistory=true) {
    if (pushHistory && this.current !== route) this.history.push(this.current);
    this.current = route;
    window.location.hash = route;
    this._render(route);
  },

  back() {
    if (this.history.length) {
      const prev = this.history.pop();
      this.navigate(prev, false);
    }
  },

  _render(route) {
    const fn = SCREENS[route] || SCREENS['welcome'];
    $('main-content').innerHTML = fn();
    this._updateNav(route);
    this._updateTopbar(route);
    $('main-content').scrollTop = 0;
    // Bind screen events after render
    if (EVENTS[route]) EVENTS[route]();
  },

  _updateNav(route) {
    const groups = { main: [], health: [], support: [] };
    DEMO.navItems.forEach(n => groups[n.group].push(n));

    const sidebarHTML = `
      <div class="nav-section-label">Main</div>
      ${groups.main.map(n => this._navItem(n, route)).join('')}
      <div class="nav-section-label">Health</div>
      ${groups.health.map(n => this._navItem(n, route)).join('')}
      <div class="nav-section-label">Support</div>
      ${groups.support.map(n => this._navItem(n, route)).join('')}
    `;
    const userHTML = `
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          ${DEMO.user.initials}
        </div>
        <div class="min-w-0">
          <div class="font-semibold text-sm text-[#1b1c1f] truncate">${DEMO.user.name}</div>
          <div class="text-xs text-[#74767e] truncate">${DEMO.user.plan}</div>
        </div>
      </div>`;

    $('sidebar-nav').innerHTML = sidebarHTML;
    $('sidebar-user').innerHTML = userHTML;
    $('mobile-sidebar-nav').innerHTML = sidebarHTML;
    $('mobile-sidebar-user').innerHTML = userHTML;

    // Bottom nav
    $('bottom-nav').innerHTML = DEMO.bottomNavItems.map(n => `
      <button class="bottom-tab ${route===n.id?'active':''}"
              onclick="ED.navigate('${n.id}');ED.closeMobileSidebar()">
        ${icon(n.icon,'text-[22px]')}
        <span>${n.label}</span>
        <div class="bottom-tab-indicator"></div>
      </button>`).join('');
  },

  _navItem(n, route) {
    return `<button class="nav-item ${route===n.id?'active':''}"
              onclick="ED.navigate('${n.id}');ED.closeMobileSidebar()">
              ${icon(n.icon,'text-[22px]')}
              <span>${n.label}</span>
            </button>`;
  },

  _updateTopbar(route) {
    const titles = {
      welcome:'Welcome', login:'Log In', signup:'Sign Up',
      dashboard:'Home Dashboard', scanner:'Medicine Scan',
      'scan-confirm':'Scan Confirmation', 'auth-result':'Authenticity Result',
      'price-search':'Price Search', 'price-compare':'Price Comparison',
      'rx-reader':'Prescription Reader', 'rx-review':'Prescription Review',
      'symptom-ai':'AI Symptom Chat', profile:'Profile & Alerts',
      schedule:'Medication Schedule', 'med-info':'Medicine Information',
      alternatives:'Alternatives', help:'Help & Support',
    };
    const label = titles[route] || route;
    $('topbar-screen-title').textContent = '/ ' + label;
    $('desktop-breadcrumb').innerHTML =
      `E Doctor <span class="text-[#1a6fdb] font-semibold ml-1">/ ${label}</span>`;
  },

  toast(msg, ms=2800) {
    const el = $('toast');
    el.textContent = msg;
    el.style.opacity = '1';
    el.style.pointerEvents = 'auto';
    el.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(8px)';
    }, ms);
  },

  toggleMobileSidebar() {
    const sb = $('mobile-sidebar');
    const ov = $('mobile-overlay');
    const open = sb.style.transform !== 'translateX(0px)';
    sb.style.transform = open ? 'translateX(0)' : 'translateX(-100%)';
    ov.classList.toggle('hidden', !open);
  },

  closeMobileSidebar() {
    $('mobile-sidebar').style.transform = 'translateX(-100%)';
    $('mobile-overlay').classList.add('hidden');
  },
};

/* ════════════════════════════════════════════════════════════════════════
   SCREEN TEMPLATES
   ════════════════════════════════════════════════════════════════════════ */
const SCREENS = {};

/* ─────────────────────────────────────────────────────────────────────────
   1. WELCOME
   ─────────────────────────────────────────────────────────────────────── */
SCREENS.welcome = () => `
<div class="hero-gradient min-h-[60vh] px-6 py-16 lg:py-24">
  <div class="max-w-6xl mx-auto">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Left: Text -->
      <div>
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20
                    px-4 py-2 rounded-full text-sm font-semibold text-blue-200 mb-6">
          ${icon('verified_user','text-[18px] text-blue-300',true)}
          Your Health, Smarter &amp; Safer
        </div>
        <h1 class="text-4xl lg:text-6xl font-extrabold leading-tight text-white mb-6">
          Verify Medicines.<br>
          Understand Prescriptions.<br>
          <span class="text-blue-300">Compare Prices.</span>
        </h1>
        <p class="text-lg text-blue-100 leading-relaxed mb-10 max-w-lg">
          Empowering patients and families with transparent packaging authenticity checks,
          clear drug insights, and instant OCR prescription translation.
        </p>
        <div class="flex flex-wrap gap-4">
          <button class="btn-primary text-base px-8 py-4" onclick="ED.navigate('signup')">
            ${icon('person_add','text-[20px]')} Get Started Free
          </button>
          <button class="btn-secondary text-base px-8 py-4 border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
                  onclick="ED.navigate('login')">
            Log In
          </button>
        </div>
        <div class="mt-6 text-sm text-blue-300">
          ${icon('lock','text-[16px] mr-1')} No account needed to explore demo
          <button class="underline text-blue-200 ml-2 hover:text-white" onclick="ED.navigate('dashboard')">
            Explore as guest →
          </button>
        </div>
      </div>
      <!-- Right: Stats -->
      <div class="grid grid-cols-2 gap-4">
        <div class="hero-stat-card">
          <div class="text-3xl font-extrabold text-white mb-1">99.4%</div>
          <div class="text-sm text-blue-200">Optical Accuracy</div>
        </div>
        <div class="hero-stat-card">
          <div class="text-3xl font-extrabold text-white mb-1">50K+</div>
          <div class="text-sm text-blue-200">Medicines in DB</div>
        </div>
        <div class="hero-stat-card col-span-2">
          <div class="flex items-center gap-3 mb-3">
            ${icon('verified_user','text-[32px] text-green-300',true)}
            <div>
              <div class="font-bold text-white">Live Demo Scan</div>
              <div class="text-sm text-blue-200">Augmentin 625mg — GSK</div>
            </div>
          </div>
          <div class="progress-bar"><div class="progress-fill success" style="width:99.4%"></div></div>
          <div class="flex justify-between text-xs text-blue-200 mt-2">
            <span>Batch verified</span><span class="text-green-300 font-bold">99.4% match</span>
          </div>
        </div>
        <div class="hero-stat-card">
          <div class="text-3xl font-extrabold text-white mb-1">76%</div>
          <div class="text-sm text-blue-200">Avg savings (generic)</div>
        </div>
        <div class="hero-stat-card">
          <div class="text-3xl font-extrabold text-white mb-1">HIPAA</div>
          <div class="text-sm text-blue-200">Local-first privacy</div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Features grid -->
<div class="max-w-6xl mx-auto px-6 py-14">
  <h2 class="text-2xl font-bold text-center text-[#1b1c1f] mb-10">Everything you need for medicine safety</h2>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    ${[
      { icon:'barcode_scanner', title:'Medicine Scan',       desc:'Verify packaging authenticity with AI-powered optical scan.', route:'scanner',      color:'feature-card' },
      { icon:'price_check',     title:'Price Comparison',    desc:'Find the lowest price for your medicine at nearby pharmacies.', route:'price-search', color:'feature-card feature-card-success' },
      { icon:'document_scanner',title:'Prescription OCR',    desc:'Instantly read and extract text from prescription photos.', route:'rx-reader',    color:'feature-card feature-card-secondary' },
      { icon:'psychology',      title:'AI Symptom Chat',     desc:'Describe symptoms, get structured guidance (not medical advice).', route:'symptom-ai',  color:'feature-card feature-card-purple' },
      { icon:'calendar_month',  title:'Medication Schedule', desc:'Track daily medications, set reminders, log adherence.', route:'schedule',     color:'feature-card feature-card-warning' },
      { icon:'campaign',        title:'Safety Alerts',       desc:'Get real-time FDA recall and drug interaction alerts.', route:'profile',      color:'feature-card feature-card-secondary' },
    ].map(f => `
      <div class="${f.color} p-6 cursor-pointer" onclick="ED.navigate('${f.route}')">
        ${icon(f.icon,'text-[36px] opacity-80 mb-3')}
        <div class="font-bold text-lg mb-2">${f.title}</div>
        <div class="text-sm opacity-85 leading-relaxed">${f.desc}</div>
        <div class="mt-4 flex items-center gap-1 text-sm font-semibold opacity-90">
          Try it ${icon('arrow_forward','text-[18px]')}
        </div>
      </div>`).join('')}
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   2. LOGIN
   ─────────────────────────────────────────────────────────────────────── */
SCREENS.login = () => `
<div class="min-h-full flex items-start justify-center px-4 py-12 lg:py-20">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-md">
        ${icon('health_and_safety','text-white text-[28px]')}
      </div>
      <h1 class="text-2xl font-extrabold text-[#1b1c1f]">Welcome back</h1>
      <p class="text-[#44464e] mt-1">Sign in to your E Doctor account</p>
    </div>
    ${demoNote('Demo mode: enter any email and password to continue.')}
    <div class="card p-8 mt-6">
      <div class="input-group">
        <label class="input-label">Email address</label>
        <input class="input" type="email" placeholder="you@example.com" id="login-email" value="sarah.j@demo.example">
      </div>
      <div class="input-group">
        <label class="input-label">Password</label>
        <input class="input" type="password" placeholder="••••••••" id="login-pass" value="demo1234">
      </div>
      <div class="flex justify-end mb-6">
        <button class="text-sm text-primary font-semibold hover:underline">Forgot password?</button>
      </div>
      <button class="btn-primary w-full" onclick="ED.navigate('dashboard');ED.toast('Signed in as ${DEMO.user.name}')">
        ${icon('login','text-[20px]')} Log In
      </button>
      <div class="flex items-center gap-4 my-6">
        <div class="flex-1 border-t border-[#e8e7ef]"></div>
        <span class="text-sm text-[#74767e]">or</span>
        <div class="flex-1 border-t border-[#e8e7ef]"></div>
      </div>
      <button class="btn-secondary w-full" onclick="ED.navigate('dashboard');ED.toast('Signed in with Google (demo)')">
        ${icon('account_circle','text-[20px]')} Continue with Google
      </button>
    </div>
    <p class="text-center text-sm text-[#44464e] mt-6">
      Don't have an account?
      <button class="text-primary font-semibold hover:underline ml-1" onclick="ED.navigate('signup')">Sign Up</button>
    </p>
    <p class="text-center text-xs text-[#74767e] mt-4">
      ${icon('lock','text-[14px] mr-1')} Local-first, HIPAA-aligned. Your data stays on your device.
    </p>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   3. SIGN UP
   ─────────────────────────────────────────────────────────────────────── */
SCREENS.signup = () => `
<div class="min-h-full flex items-start justify-center px-4 py-12 lg:py-20">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-md">
        ${icon('person_add','text-white text-[28px]')}
      </div>
      <h1 class="text-2xl font-extrabold text-[#1b1c1f]">Create your account</h1>
      <p class="text-[#44464e] mt-1">Free forever • No credit card required</p>
    </div>
    ${demoNote('Demo mode: form is for display only. Click "Create Account" to continue.')}
    <div class="card p-8 mt-6">
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="input-group !mb-0">
          <label class="input-label">First name</label>
          <input class="input" type="text" placeholder="Sarah" value="Sarah">
        </div>
        <div class="input-group !mb-0">
          <label class="input-label">Last name</label>
          <input class="input" type="text" placeholder="Johnson" value="Johnson">
        </div>
      </div>
      <div class="input-group mt-4">
        <label class="input-label">Email address</label>
        <input class="input" type="email" placeholder="you@example.com">
      </div>
      <div class="input-group">
        <label class="input-label">Password</label>
        <input class="input" type="password" placeholder="At least 8 characters">
      </div>
      <div class="input-group">
        <label class="input-label">Confirm password</label>
        <input class="input" type="password" placeholder="Repeat password">
      </div>
      <label class="flex items-start gap-3 mb-6 cursor-pointer">
        <input type="checkbox" class="mt-1 accent-primary" checked>
        <span class="text-sm text-[#44464e]">I agree to the <a class="text-primary underline" href="#">Terms of Service</a> and <a class="text-primary underline" href="#">Privacy Policy</a>.</span>
      </label>
      <button class="btn-primary w-full" onclick="ED.navigate('dashboard');ED.toast('Account created! Welcome, Sarah')">
        ${icon('arrow_forward','text-[20px]')} Create Account
      </button>
    </div>
    <p class="text-center text-sm text-[#44464e] mt-6">
      Already have an account?
      <button class="text-primary font-semibold hover:underline ml-1" onclick="ED.navigate('login')">Log In</button>
    </p>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   4. DASHBOARD
   ─────────────────────────────────────────────────────────────────────── */
SCREENS.dashboard = () => `
<div class="max-w-6xl mx-auto">
  <!-- Header strip -->
  <div class="page-header">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <span class="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
        <h1 class="page-title">Good morning, ${DEMO.user.name}</h1>
      </div>
      <p class="page-subtitle">Your Health, Smarter &amp; Safer</p>
    </div>
    <a href="tel:911" class="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full
       font-bold text-sm border border-red-200 hover:bg-red-100 transition-colors flex-shrink-0">
      ${icon('emergency','text-[18px]',true)} Emergency SOS
    </a>
  </div>

  <!-- Search -->
  <div class="section pt-4">
    <div class="flex items-center gap-3 bg-surface-container rounded-xl px-4 h-12 max-w-2xl">
      ${icon('search','text-[22px] text-[#74767e]')}
      <input placeholder="Search medicine name, salt, or symptom…"
             class="bg-transparent flex-1 text-[15px] focus:outline-none text-[#1b1c1f] placeholder:text-[#74767e]">
      ${icon('mic','text-[20px] text-[#74767e] cursor-pointer')}
    </div>
  </div>

  <!-- Today summary strip -->
  <div class="section pt-0">
    <div class="grid grid-cols-3 lg:grid-cols-5 gap-3">
      ${[
        { label:'Doses today',  val:'3/5',   icon:'medication',      color:'text-blue-600 bg-blue-50'   },
        { label:'Active alerts',val:'2',     icon:'campaign',        color:'text-red-600 bg-red-50'     },
        { label:'Scans done',   val:'3',     icon:'barcode_scanner', color:'text-green-600 bg-green-50' },
        { label:'Rx pending',   val:'1',     icon:'document_scanner',color:'text-purple-600 bg-purple-50'},
        { label:'Price saved',  val:'$37',   icon:'savings',         color:'text-orange-600 bg-orange-50'},
      ].map(s => `
        <div class="card p-4 flex flex-col items-center text-center gap-2">
          <div class="w-10 h-10 rounded-full flex items-center justify-center ${s.color}">
            ${icon(s.icon,'text-[20px]')}
          </div>
          <div class="font-extrabold text-xl text-[#1b1c1f]">${s.val}</div>
          <div class="text-xs text-[#44464e] leading-tight">${s.label}</div>
        </div>`).join('')}
    </div>
  </div>

  <!-- Main feature cards -->
  <div class="section pt-0">
    <h2 class="section-title">Quick Actions</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="feature-card p-6" onclick="ED.navigate('scanner')">
        <div class="flex items-start justify-between mb-4">
          ${icon('verified_user','text-[36px] opacity-80')}
          <span class="badge badge-info !bg-white/20 !text-white text-xs">AI</span>
        </div>
        <h3 class="font-bold text-lg mb-1">AI Packaging Validator</h3>
        <p class="text-sm opacity-80 leading-relaxed mb-4">Snap packaging to verify authenticity, batch serials &amp; recall notices in real-time.</p>
        <button class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          ${icon('camera_alt','text-[18px]')} Scan Now
        </button>
      </div>
      <div class="feature-card feature-card-success p-6" onclick="ED.navigate('price-search')">
        <div class="flex items-start justify-between mb-4">
          ${icon('price_check','text-[36px] opacity-80')}
          <span class="badge !bg-white/20 !text-white text-xs">Save 76%</span>
        </div>
        <h3 class="font-bold text-lg mb-1">Price Checker</h3>
        <p class="text-sm opacity-80 leading-relaxed mb-4">Find best price for any medicine at pharmacies near you. Generics included.</p>
        <button class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          ${icon('search','text-[18px]')} Check Prices
        </button>
      </div>
      <div class="feature-card feature-card-secondary p-6" onclick="ED.navigate('rx-reader')">
        <div class="flex items-start justify-between mb-4">
          ${icon('document_scanner','text-[36px] opacity-80')}
          <span class="badge !bg-white/20 !text-white text-xs">OCR</span>
        </div>
        <h3 class="font-bold text-lg mb-1">Prescription Reader</h3>
        <p class="text-sm opacity-80 leading-relaxed mb-4">Upload a prescription photo. AI extracts drug names, doses, and instructions.</p>
        <button class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          ${icon('upload','text-[18px]')} Upload Rx
        </button>
      </div>
      <div class="feature-card feature-card-purple p-6" onclick="ED.navigate('symptom-ai')">
        ${icon('psychology','text-[36px] opacity-80 mb-4')}
        <h3 class="font-bold text-lg mb-1">AI Symptom Chat</h3>
        <p class="text-sm opacity-80 leading-relaxed mb-4">Describe symptoms, receive structured guidance. Not a substitute for a doctor.</p>
        <button class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          ${icon('chat','text-[18px]')} Start Chat
        </button>
      </div>
      <div class="feature-card feature-card-warning p-6" onclick="ED.navigate('schedule')">
        ${icon('calendar_month','text-[36px] opacity-80 mb-4')}
        <h3 class="font-bold text-lg mb-1">Medication Schedule</h3>
        <p class="text-sm opacity-80 leading-relaxed mb-4">Track daily medications. ${DEMO.schedule.filter(s=>!s.taken).length} doses remaining today.</p>
        <button class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          ${icon('checklist','text-[18px]')} View Schedule
        </button>
      </div>
      <div class="card card-hover p-6 border-2 border-dashed border-[#c4c6d0]" onclick="ED.navigate('profile')">
        <div class="flex items-start justify-between mb-4">
          ${icon('campaign','text-[36px] text-red-500')}
          <span class="badge badge-error">${DEMO.alerts.length} New</span>
        </div>
        <h3 class="font-bold text-lg mb-1 text-[#1b1c1f]">Safety Alerts</h3>
        <p class="text-sm text-[#44464e] leading-relaxed mb-3">${DEMO.alerts[0].title}</p>
        <span class="text-primary text-sm font-semibold">View all alerts →</span>
      </div>
    </div>
  </div>

  <!-- Recent scan + today meds -->
  <div class="section pt-0 grid lg:grid-cols-2 gap-6">
    <!-- Recent scans -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="section-title !mb-0">Recent Scans</h3>
        <button class="text-primary text-sm font-semibold" onclick="ED.navigate('profile')">View all</button>
      </div>
      ${DEMO.scanHistory.map(s => `
        <div class="flex items-center gap-3 py-3 border-b border-[#e8e7ef] last:border-0">
          ${icon('barcode_scanner','text-[24px] text-[#74767e]')}
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-sm truncate">${s.medicine}</div>
            <div class="text-xs text-[#74767e]">${s.date}</div>
          </div>
          <span class="badge ${s.result==='VERIFIED'?'badge-success':'badge-warning'} text-xs">
            ${s.result}
          </span>
        </div>`).join('')}
    </div>
    <!-- Today's medications -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="section-title !mb-0">Today's Medications</h3>
        <button class="text-primary text-sm font-semibold" onclick="ED.navigate('schedule')">Full schedule</button>
      </div>
      ${DEMO.schedule.slice(0,4).map(m => `
        <div class="flex items-center gap-3 py-3 border-b border-[#e8e7ef] last:border-0">
          <div class="w-8 h-8 rounded-full flex items-center justify-center ${m.color} flex-shrink-0">
            ${icon(m.icon,'text-[18px]')}
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-sm truncate">${m.name}</div>
            <div class="text-xs text-[#74767e]">${m.time}</div>
          </div>
          <span class="badge ${m.taken?'badge-success':'badge-neutral'} text-xs">
            ${m.taken?'Taken':'Pending'}
          </span>
        </div>`).join('')}
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   5. MEDICINE SCANNER
   ─────────────────────────────────────────────────────────────────────── */
SCREENS.scanner = () => `
<div class="max-w-5xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Medicine Scan</h1>
      <p class="page-subtitle">AI Optical Packaging Verification — Demo Mode</p>
    </div>
  </div>
  <div class="section">
    ${demoNote('Demo scan: clicking "Verify Medicine" below uses simulated data. No real scanning occurs.')}
    <div class="grid lg:grid-cols-2 gap-6 mt-4">
      <!-- Camera area -->
      <div>
        <div class="scanner-frame mb-4">
          <div class="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#0d2d4a]
                      flex items-center justify-center">
            <div class="text-center text-white/50">
              ${icon('camera_alt','text-[64px] mb-2')}
              <div class="text-sm">Camera preview (demo)</div>
            </div>
          </div>
          <div class="scanner-overlay">
            <div class="scanner-reticle">
              <div class="scan-line"></div>
            </div>
          </div>
          <!-- HUD overlay -->
          <div class="absolute top-3 left-3 right-3 flex justify-between">
            <span class="badge badge-info bg-blue-900/80 !text-blue-200 backdrop-blur-sm">
              ${icon('verified','text-[14px]')} Live Viewfinder
            </span>
            <span class="badge bg-black/50 !text-white backdrop-blur-sm text-xs">
              ${icon('photo_camera','text-[14px]')} Analyzing…
            </span>
          </div>
          <div class="absolute bottom-3 left-3 right-3">
            <div class="flex justify-between text-xs text-white/70 mb-1">
              <span>Optical Sharpness</span><span class="text-blue-300">94% – Optimal</span>
            </div>
            <div class="progress-bar !bg-white/20">
              <div class="progress-fill" style="width:94%;background:#4db8ff"></div>
            </div>
          </div>
        </div>
        <!-- Tips -->
        <div class="grid grid-cols-3 gap-3 text-center">
          ${[
            { icon:'wb_sunny',    label:'Good lighting', ok:true  },
            { icon:'center_focus_strong', label:'Batch aligned', ok:true },
            { icon:'flash_off',   label:'No flash glare', ok:true },
          ].map(t=>`
            <div class="card p-3">
              ${icon(t.icon,`text-[24px] ${t.ok?'text-green-600':'text-red-500'}`)}
              <div class="text-xs font-semibold mt-1 ${t.ok?'text-green-700':'text-red-600'}">${t.label}</div>
            </div>`).join('')}
        </div>
      </div>
      <!-- Instructions + actions -->
      <div class="flex flex-col gap-4">
        <div class="card p-5">
          <h3 class="font-bold text-[#1b1c1f] mb-3">How to scan</h3>
          ${[
            { step:'1', text:'Align the medicine box label in the reticle frame.' },
            { step:'2', text:'Ensure the batch number and expiry date are visible.' },
            { step:'3', text:'Hold steady — AI will auto-capture the best frame.' },
            { step:'4', text:'Review the verification result on the next screen.' },
          ].map(s=>`
            <div class="flex gap-3 mb-3 last:mb-0">
              <div class="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold
                          flex items-center justify-center flex-shrink-0 mt-0.5">${s.step}</div>
              <p class="text-sm text-[#44464e]">${s.text}</p>
            </div>`).join('')}
        </div>
        <div class="card p-5">
          <h3 class="font-bold text-[#1b1c1f] mb-3">Currently detecting</h3>
          <div class="flex items-center gap-3 mb-3">
            ${icon('barcode_scanner','text-[28px] text-primary')}
            <div>
              <div class="font-semibold text-sm">${DEMO.medicine.lot}</div>
              <div class="text-xs text-[#74767e]">${DEMO.medicine.barcode}</div>
            </div>
          </div>
          <div class="badge badge-info mb-1">${DEMO.medicine.name}</div>
          <div class="text-xs text-[#44464e] mt-2">Expiry: ${DEMO.medicine.expiry} &nbsp;·&nbsp; NDC: ${DEMO.medicine.ndc}</div>
        </div>
        <button class="btn-primary w-full text-base" onclick="ED.navigate('scan-confirm')">
          ${icon('verified_user','text-[20px]')} Verify Medicine Safety
        </button>
        <button class="btn-secondary w-full" onclick="ED.navigate('rx-reader')">
          ${icon('document_scanner','text-[20px]')} Scan Prescription Instead
        </button>
        <button class="btn-outline w-full btn-sm" onclick="ED.navigate('help')">
          ${icon('help','text-[18px]')} Photo guide &amp; tips
        </button>
      </div>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   6. SCAN CONFIRMATION
   ─────────────────────────────────────────────────────────────────────── */
SCREENS['scan-confirm'] = () => `
<div class="max-w-3xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Scan Confirmation</h1>
      <p class="page-subtitle">Review detected medicine details before verification</p>
    </div>
    <button class="btn-secondary btn-sm" onclick="ED.navigate('scanner')">
      ${icon('arrow_back','text-[18px]')} Rescan
    </button>
  </div>
  <div class="section">
    ${demoNote('Simulated scan result — not a real pharmaceutical verification.')}
    <div class="card p-6 mt-4">
      <div class="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 class="text-xl font-extrabold text-[#1b1c1f]">${DEMO.medicine.name}</h2>
          <p class="text-[#44464e] text-sm mt-1">${DEMO.medicine.generic}</p>
        </div>
        <span class="badge badge-info">${icon('verified','text-[16px]')} Detected</span>
      </div>
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        ${[
          { label:'Manufacturer', val: DEMO.medicine.manufacturer },
          { label:'Batch Number',  val: DEMO.medicine.batch       },
          { label:'NDC Code',      val: DEMO.medicine.ndc         },
          { label:'Expiry Date',   val: DEMO.medicine.expiry      },
          { label:'ATC Code',      val: DEMO.medicine.atcCode     },
          { label:'Barcode',       val: DEMO.medicine.barcode     },
        ].map(f=>`
          <div class="bg-surface-container rounded-xl p-4">
            <div class="text-xs font-bold text-[#74767e] uppercase tracking-wide mb-1">${f.label}</div>
            <div class="font-semibold text-[#1b1c1f]">${f.val}</div>
          </div>`).join('')}
      </div>
      <div class="flex flex-wrap gap-3">
        <button class="btn-primary flex-1" onclick="ED.navigate('auth-result')">
          ${icon('arrow_forward','text-[20px]')} Confirm &amp; Check Drug Information
        </button>
        <button class="btn-secondary" onclick="ED.navigate('scanner')">
          ${icon('camera_alt','text-[18px]')} Rescan
        </button>
        <button class="btn-outline" onclick="ED.toast('Manual entry (demo only)')">
          ${icon('keyboard','text-[18px]')} Enter Manually
        </button>
      </div>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   7. AUTHENTICITY RESULT
   ─────────────────────────────────────────────────────────────────────── */
SCREENS['auth-result'] = () => `
<div class="max-w-5xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Authenticity Result</h1>
      <p class="page-subtitle">AI verification report — ${DEMO.medicine.name}</p>
    </div>
    <button class="btn-secondary btn-sm" onclick="ED.navigate('scan-confirm')">
      ${icon('arrow_back','text-[18px]')} Back
    </button>
  </div>
  <div class="section">
    ${demoNote('Simulated result — 99.4% match is demo data, not a real pharmaceutical verification.')}
    <div class="grid lg:grid-cols-3 gap-6 mt-4">
      <!-- Verification ring + score -->
      <div class="card p-6 text-center">
        <div class="verify-ring mb-4">
          <div class="verify-inner">
            ${icon('verified_user','text-[32px] text-green-600 icon-fill')}
            <div class="text-lg font-extrabold text-green-700 mt-1">${DEMO.medicine.authenticityScore}%</div>
          </div>
        </div>
        <div class="badge badge-success text-base mb-3">${icon('check_circle','text-[18px]')} ${DEMO.medicine.status}</div>
        <p class="text-sm text-[#44464e] leading-relaxed">
          Batch serial, hologram fidelity, and manufacturer codes matched the national formulary.
        </p>
        <div class="progress-bar mt-4">
          <div class="progress-fill success" style="width:${DEMO.medicine.authenticityScore}%"></div>
        </div>
        <div class="text-xs text-[#74767e] mt-2">National Formulary Match</div>
      </div>

      <!-- Detail panel -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <div class="card p-5">
          <h3 class="section-title">Verification Breakdown</h3>
          ${[
            { label:'Batch Serial Match',   score:100, status:'Matched' },
            { label:'Hologram Integrity',   score:99,  status:'Matched' },
            { label:'NDC / NFC Chip',       score:100, status:'Matched' },
            { label:'Expiry Validation',    score:100, status:'Valid — Mar 2026' },
            { label:'Recall Check (FDA)',   score:100, status:'No active recall' },
            { label:'Manufacturer Cert.',   score:97,  status:'Matched — GSK' },
          ].map(r=>`
            <div class="flex items-center gap-3 mb-3 last:mb-0">
              <span class="badge badge-success text-xs w-20 justify-center flex-shrink-0">${r.score}%</span>
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-semibold text-[#1b1c1f]">${r.label}</span>
                  <span class="text-xs text-green-700">${r.status}</span>
                </div>
                <div class="progress-bar !h-1.5">
                  <div class="progress-fill success" style="width:${r.score}%"></div>
                </div>
              </div>
            </div>`).join('')}
        </div>
        <!-- Actions -->
        <div class="grid sm:grid-cols-3 gap-3">
          <button class="btn-primary btn-sm" onclick="ED.navigate('price-search')">
            ${icon('payments','text-[18px]')} Compare Prices
          </button>
          <button class="btn-secondary btn-sm" onclick="ED.navigate('med-info')">
            ${icon('info','text-[18px]')} Full Drug Info
          </button>
          <button class="btn-outline btn-sm" onclick="ED.toast('Share feature (demo only)')">
            ${icon('share','text-[18px]')} Share Report
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   8. PRICE SEARCH
   ─────────────────────────────────────────────────────────────────────── */
SCREENS['price-search'] = () => `
<div class="max-w-4xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Price Search</h1>
      <p class="page-subtitle">Find the best price for any medicine — demo benchmark data</p>
    </div>
  </div>
  <div class="section">
    ${demoNote('All prices shown are simulated demo data. Contact your pharmacy for real pricing.')}
    <div class="card p-6 mt-4">
      <div class="flex gap-3 mb-4">
        <input class="input flex-1" value="${DEMO.medicine.name}" placeholder="Medicine name or molecule…">
        <button class="btn-primary px-6" onclick="ED.navigate('price-compare')">
          ${icon('search','text-[20px]')} Search
        </button>
      </div>
      <div class="flex flex-wrap gap-3 mb-2">
        <span class="text-sm font-semibold text-[#44464e] self-center">Strength:</span>
        ${['250mg','500mg','625mg','1g'].map((d,i)=>`
          <button class="chip ${d==='625mg'?'selected':''}" onclick="this.closest('.card').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));this.classList.add('selected')">${d}</button>`).join('')}
      </div>
      <div class="flex flex-wrap gap-3">
        <span class="text-sm font-semibold text-[#44464e] self-center">Form:</span>
        ${['Tablets','Capsules','Syrup'].map(f=>`
          <button class="chip ${f==='Tablets'?'selected':''}">${f}</button>`).join('')}
      </div>
    </div>
    <!-- Results preview -->
    <div class="card mt-5 overflow-hidden">
      <div class="px-5 py-4 border-b border-[#e8e7ef] flex items-center justify-between">
        <h3 class="font-bold text-[#1b1c1f]">Results for "${DEMO.medicine.name}" (625mg Tablets)</h3>
        <span class="badge badge-info">${1 + DEMO.prices.generics.length} options</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Medicine</th><th>Manufacturer</th><th class="text-right">Price / 10 tabs</th><th>Savings</th>
          </tr>
        </thead>
        <tbody>
          <tr class="cursor-pointer hover:bg-blue-50" onclick="ED.navigate('price-compare')">
            <td><div class="font-semibold">${DEMO.prices.brand.name}</div><div class="text-xs text-[#74767e]">Brand Name</div></td>
            <td>GSK</td>
            <td class="text-right font-bold">\$${DEMO.prices.brand.price.toFixed(2)}</td>
            <td><span class="badge badge-neutral text-xs">Reference</span></td>
          </tr>
          ${DEMO.prices.generics.map(g=>`
            <tr class="cursor-pointer hover:bg-blue-50" onclick="ED.navigate('price-compare')">
              <td>
                <div class="font-semibold">${g.name.split('—')[0].trim()}</div>
                <div class="text-xs text-[#74767e]">Generic ${g.approved?'✓ Approved':''}</div>
              </td>
              <td>${g.name.split('—')[1]?.trim()||'—'}</td>
              <td class="text-right font-bold text-green-700">\$${g.price.toFixed(2)}</td>
              <td><span class="badge badge-success text-xs">Save ${g.savings}%</span></td>
            </tr>`).join('')}
        </tbody>
      </table>
      <div class="px-5 py-3 bg-surface-container text-center">
        <button class="btn-primary btn-sm" onclick="ED.navigate('price-compare')">
          ${icon('compare_arrows','text-[18px]')} View Full Price Comparison →
        </button>
      </div>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   9. PRICE COMPARISON
   ─────────────────────────────────────────────────────────────────────── */
SCREENS['price-compare'] = () => `
<div class="max-w-5xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Price Comparison</h1>
      <p class="page-subtitle">${DEMO.medicine.name} — Brand vs Generics</p>
    </div>
    <button class="btn-secondary btn-sm" onclick="ED.navigate('price-search')">
      ${icon('arrow_back','text-[18px]')} New Search
    </button>
  </div>
  <div class="section">
    ${demoNote('Simulated prices for demo. These are not real pharmacy prices.')}
    <!-- Brand vs Best Generic highlight -->
    <div class="grid sm:grid-cols-2 gap-4 mt-4">
      <div class="card p-5 border-2 border-[#e8e7ef]">
        <div class="badge badge-neutral mb-3">Brand Name</div>
        <div class="text-2xl font-extrabold text-[#1b1c1f] mb-1">\$${DEMO.prices.brand.price.toFixed(2)}</div>
        <div class="text-sm text-[#44464e]">${DEMO.prices.brand.name}</div>
        <div class="text-xs text-[#74767e] mt-1">${DEMO.prices.brand.per}</div>
      </div>
      <div class="card p-5 border-2 border-green-400 bg-green-50">
        <div class="badge badge-success mb-3">${icon('star','text-[14px]')} Best Generic — Save ${DEMO.prices.generics[2].savings}%</div>
        <div class="text-2xl font-extrabold text-green-700 mb-1">\$${DEMO.prices.generics[2].price.toFixed(2)}</div>
        <div class="text-sm text-[#44464e]">${DEMO.prices.generics[2].name}</div>
        <div class="text-xs text-green-700 font-semibold mt-1">
          Save \$${(DEMO.prices.brand.price - DEMO.prices.generics[2].price).toFixed(2)} per pack
        </div>
      </div>
    </div>

    <!-- Full comparison table -->
    <div class="card mt-5 overflow-hidden">
      <div class="px-5 py-4 border-b border-[#e8e7ef]">
        <h3 class="font-bold text-[#1b1c1f]">All Options — Bioequivalent Generics (Demo)</h3>
      </div>
      <table class="data-table">
        <thead><tr>
          <th>Medicine</th><th>Brand</th><th>Equiv.</th>
          <th class="text-right">Price</th><th>Savings</th><th>Action</th>
        </tr></thead>
        <tbody>
          ${DEMO.prices.generics.map(g=>`
            <tr>
              <td><div class="font-semibold">${g.name.split('—')[0].trim()}</div></td>
              <td class="text-sm">${g.name.split('—')[1]?.trim()||'—'}</td>
              <td><span class="badge ${g.approved?'badge-success':'badge-neutral'} text-xs">${g.approved?'A-rated':'B'}</span></td>
              <td class="text-right font-bold text-green-700">\$${g.price.toFixed(2)}</td>
              <td><span class="badge badge-success text-xs">-${g.savings}%</span></td>
              <td>
                <button class="btn-outline btn-sm !px-3 !py-1.5 text-xs"
                        onclick="ED.toast('${g.name.split('—')[0].trim()} selected (demo)')">
                  Select
                </button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <!-- Nearby pharmacies -->
    <div class="card mt-5 p-5">
      <h3 class="section-title">Nearby Pharmacies (Demo)</h3>
      <div class="grid sm:grid-cols-2 gap-3">
        ${DEMO.prices.pharmacies.map(p=>`
          <div class="flex items-center gap-3 p-3 rounded-xl border border-[#e8e7ef] ${!p.stock?'opacity-60':''}">
            ${icon('local_pharmacy',`text-[28px] ${p.stock?'text-primary':'text-[#74767e]'}`)}
            <div class="flex-1">
              <div class="font-semibold text-sm">${p.name}</div>
              <div class="text-xs text-[#74767e]">${p.distance}</div>
            </div>
            <div class="text-right">
              <div class="font-bold ${p.stock?'text-green-700':'text-[#74767e]'}">\$${p.price.toFixed(2)}</div>
              <div class="text-xs ${p.stock?'text-green-600':'text-red-500'}">${p.stock?'In stock':'Out of stock'}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>
    <div class="flex gap-3 mt-4">
      <button class="btn-primary flex-1" onclick="ED.toast('Price alert set (demo)');ED.navigate('dashboard')">
        ${icon('notifications_active','text-[20px]')} Set Price Alert
      </button>
      <button class="btn-secondary" onclick="ED.navigate('alternatives')">
        ${icon('compare','text-[20px]')} More Alternatives
      </button>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   10. PRESCRIPTION READER
   ─────────────────────────────────────────────────────────────────────── */
SCREENS['rx-reader'] = () => `
<div class="max-w-4xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Prescription Reader</h1>
      <p class="page-subtitle">Upload a prescription image — AI extracts drug details via OCR</p>
    </div>
  </div>
  <div class="section">
    ${demoNote('Demo OCR output — verify all extracted details with your pharmacist before use.')}
    <div class="grid lg:grid-cols-2 gap-6 mt-4">
      <!-- Upload zone -->
      <div>
        <div class="border-2 border-dashed border-[#c4c6d0] rounded-2xl p-8 text-center
                    bg-surface-container hover:border-primary hover:bg-primary-50 transition-colors cursor-pointer mb-4">
          ${icon('upload_file','text-[52px] text-primary mb-3')}
          <h3 class="font-bold text-[#1b1c1f] mb-2">Upload Prescription</h3>
          <p class="text-sm text-[#44464e] mb-4">Drag &amp; drop or click to select. JPG, PNG, PDF supported.</p>
          <button class="btn-primary btn-sm" onclick="ED.navigate('rx-review')">
            ${icon('folder_open','text-[18px]')} Choose File (demo)
          </button>
        </div>
        <div class="card p-4">
          <h4 class="font-semibold text-sm mb-3">For best OCR results:</h4>
          ${['Use bright, even lighting — avoid shadows.',
             'Ensure all text is clearly legible.',
             'Avoid glare from phone screens or glossy paper.',
             'Include doctor name, date, and all medication lines.']
            .map(t=>`<div class="flex gap-2 text-sm text-[#44464e] mb-2">
              ${icon('check_circle','text-[16px] text-green-600 flex-shrink-0 mt-0.5')} ${t}</div>`).join('')}
        </div>
      </div>
      <!-- Demo preview -->
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-[#1b1c1f]">Demo Prescription Preview</h3>
          <span class="badge badge-info text-xs">Sample</span>
        </div>
        <div class="bg-surface-container rounded-xl p-5 mb-4 font-mono text-sm">
          <div class="font-bold text-base mb-1">${DEMO.prescription.doctorName}</div>
          <div class="text-xs text-[#74767e] mb-4">${DEMO.prescription.hospital} · ${DEMO.prescription.date}</div>
          <div class="font-bold mb-1">Patient: ${DEMO.prescription.patientName}</div>
          <div class="mt-3 space-y-2">
            ${DEMO.prescription.medications.map((m,i)=>`
              <div class="border-t border-[#e8e7ef] pt-2">
                <span class="font-bold">${i+1}. ${m.name} ${m.dose}</span><br>
                <span class="text-xs text-[#44464e]">${m.freq} × ${m.duration} (Qty: ${m.qty})</span>
              </div>`).join('')}
          </div>
          <div class="mt-4 text-xs text-[#74767e]">Refills: ${DEMO.prescription.refills} · Signature on file</div>
        </div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-semibold text-[#44464e]">OCR Confidence</span>
          <span class="font-bold text-green-700">${DEMO.prescription.ocrConfidence}%</span>
        </div>
        <div class="progress-bar mb-4">
          <div class="progress-fill success" style="width:${DEMO.prescription.ocrConfidence}%"></div>
        </div>
        <button class="btn-primary w-full" onclick="ED.navigate('rx-review')">
          ${icon('edit_note','text-[20px]')} Review &amp; Correct Extracted Text
        </button>
      </div>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   11. PRESCRIPTION REVIEW
   ─────────────────────────────────────────────────────────────────────── */
SCREENS['rx-review'] = () => `
<div class="max-w-5xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Prescription Review</h1>
      <p class="page-subtitle">Verify and correct OCR-extracted medication details</p>
    </div>
    <button class="btn-secondary btn-sm" onclick="ED.navigate('rx-reader')">
      ${icon('arrow_back','text-[18px]')} Back
    </button>
  </div>
  <div class="section">
    ${demoNote('OCR demo output — always verify with your pharmacist before acting on this data.')}
    ${DEMO.prescription.flags.map(f=>`
      <div class="alert-row caution mt-4">
        ${icon('warning','text-[22px] text-red-600 flex-shrink-0')}
        <div><div class="font-bold text-sm text-red-700">${f.field} — Review Required</div>
        <div class="text-sm text-[#44464e]">${f.note}</div></div>
      </div>`).join('')}
    <div class="grid lg:grid-cols-2 gap-6 mt-4">
      <!-- Extracted data table -->
      <div class="card overflow-hidden">
        <div class="px-5 py-4 border-b border-[#e8e7ef] flex items-center justify-between">
          <h3 class="font-bold text-[#1b1c1f]">Extracted Medications</h3>
          <span class="badge badge-success text-xs">${DEMO.prescription.ocrConfidence}% confidence</span>
        </div>
        ${DEMO.prescription.medications.map(m=>`
          <div class="p-4 border-b border-[#e8e7ef] last:border-0">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1">
                <div class="font-bold text-[#1b1c1f]">${m.name}</div>
                <div class="text-sm text-primary font-semibold">${m.dose}</div>
                <div class="text-xs text-[#44464e] mt-1">${m.freq}</div>
                <div class="text-xs text-[#74767e]">${m.duration} · Qty ${m.qty}</div>
              </div>
              <button class="btn-outline btn-sm !px-2 !py-1 text-xs"
                      onclick="ED.toast('Editing ${m.name} (demo)')">
                ${icon('edit','text-[14px]')} Edit
              </button>
            </div>
          </div>`).join('')}
      </div>
      <!-- Header info + actions -->
      <div class="flex flex-col gap-4">
        <div class="card p-5">
          <h3 class="font-bold text-[#1b1c1f] mb-4">Prescription Details</h3>
          ${[
            { label:'Doctor',   val: DEMO.prescription.doctorName },
            { label:'Hospital', val: DEMO.prescription.hospital   },
            { label:'Date',     val: DEMO.prescription.date       },
            { label:'Patient',  val: DEMO.prescription.patientName},
            { label:'Refills',  val: `${DEMO.prescription.refills} remaining` },
          ].map(f=>`
            <div class="flex justify-between py-2 border-b border-[#e8e7ef] last:border-0">
              <span class="text-sm text-[#74767e]">${f.label}</span>
              <span class="text-sm font-semibold text-[#1b1c1f] text-right">${f.val}</span>
            </div>`).join('')}
        </div>
        <button class="btn-primary w-full"
                onclick="ED.navigate('schedule');ED.toast('Prescription saved to schedule!')">
          ${icon('playlist_add_check','text-[20px]')} Save to Medication Schedule
        </button>
        <button class="btn-secondary w-full" onclick="ED.navigate('rx-reader')">
          ${icon('flag','text-[20px]')} Flag Discrepancy / Rescan
        </button>
      </div>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   12. SYMPTOM AI CHAT
   ─────────────────────────────────────────────────────────────────────── */
SCREENS['symptom-ai'] = () => `
<div class="max-w-4xl mx-auto h-full flex flex-col">
  <div class="page-header pb-3">
    <div>
      <h1 class="page-title">AI Symptom Chat</h1>
      <p class="page-subtitle">Describe symptoms for structured guidance — not medical diagnosis</p>
    </div>
    <span class="badge badge-warning text-xs">${icon('info','text-[14px]')} Not Medical Advice</span>
  </div>
  ${demoNote('This is NOT a substitute for professional medical advice. Responses are simulated demo outputs.')}

  <div class="grid lg:grid-cols-3 gap-6 mt-4 section pt-3">
    <!-- Chat window -->
    <div class="lg:col-span-2 card flex flex-col" style="height:480px">
      <div class="px-4 py-3 border-b border-[#e8e7ef] flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          ${icon('psychology','text-white text-[20px]')}
        </div>
        <div>
          <div class="font-bold text-sm">E Doctor AI</div>
          <div class="flex items-center gap-1 text-xs text-green-600">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> Active · Triage Mode
          </div>
        </div>
        <div class="ml-auto">
          <span class="badge badge-error text-xs">Non-Emergency Mode</span>
        </div>
      </div>
      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3" id="chat-messages">
        ${DEMO.symptoms.chat.map(m=>`
          <div>
            <div class="${m.role==='user'?'chat-bubble-user':'chat-bubble-ai'}">${m.text}</div>
            <div class="chat-timestamp ${m.role==='user'?'text-right':''}">${m.time}</div>
          </div>`).join('')}
        <!-- Clarifiers -->
        <div class="chat-bubble-ai">
          Please clarify if any of these apply:
          <div class="flex flex-wrap gap-2 mt-3">
            ${DEMO.symptoms.clarifiers.map(c=>`
              <button class="chip text-xs" onclick="this.classList.toggle('selected');ED.toast('${c} noted (demo)')">${c}</button>`).join('')}
          </div>
        </div>
      </div>
      <!-- Input bar -->
      <div class="p-3 border-t border-[#e8e7ef] flex gap-2">
        <input class="input flex-1 h-10 text-sm" placeholder="Describe your symptoms…" id="chat-input">
        <button class="btn-primary !px-4 !py-2" onclick="ED.addChatMessage()">
          ${icon('send','text-[20px]')}
        </button>
      </div>
    </div>

    <!-- Assessment panel -->
    <div class="flex flex-col gap-4">
      <div class="card p-5">
        <div class="flex items-center gap-2 mb-4">
          ${icon('assignment','text-[22px] text-primary')}
          <h3 class="font-bold text-[#1b1c1f]">Preliminary Assessment</h3>
        </div>
        <div class="badge ${DEMO.symptoms.assessment.redFlag?'badge-error':'badge-success'} mb-4">
          ${icon(DEMO.symptoms.assessment.redFlag?'warning':'security','text-[16px]')}
          ${DEMO.symptoms.assessment.redFlag?'Red Flag Detected':'No Emergency Indicators'}
        </div>
        ${DEMO.symptoms.assessment.possibleCauses.map(c=>`
          <div class="mb-3 p-3 rounded-xl bg-surface-container">
            <div class="flex justify-between mb-1">
              <span class="font-semibold text-sm">${c.label}</span>
              <span class="badge badge-info text-xs">${c.confidence}</span>
            </div>
            <p class="text-xs text-[#44464e]">${c.desc}</p>
          </div>`).join('')}
      </div>
      <div class="card p-5">
        <h4 class="font-bold text-sm mb-3 text-[#1b1c1f]">Guidance</h4>
        <p class="text-sm text-[#44464e] leading-relaxed">${DEMO.symptoms.assessment.advice}</p>
        <button class="btn-primary w-full btn-sm mt-4"
                onclick="ED.toast('Consult booking (demo only)')">
          ${icon('calendar_month','text-[18px]')} Book Clinical Consult
        </button>
      </div>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   13. PROFILE / ALERTS
   ─────────────────────────────────────────────────────────────────────── */
SCREENS.profile = () => `
<div class="max-w-5xl mx-auto">
  <div class="page-header">
    <h1 class="page-title">Profile &amp; Safety Alerts</h1>
  </div>
  <div class="section">
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Profile card -->
      <div class="flex flex-col gap-4">
        <div class="card p-6 text-center">
          <div class="w-20 h-20 rounded-full bg-primary flex items-center justify-center
                      text-white text-2xl font-extrabold mx-auto mb-4 shadow-md">
            ${DEMO.user.initials}
          </div>
          <h2 class="font-extrabold text-xl text-[#1b1c1f]">${DEMO.user.fullName}</h2>
          <p class="text-sm text-[#74767e] mt-1">ID: ${DEMO.user.id}</p>
          <p class="text-xs text-[#74767e] mt-1">Member since ${DEMO.user.joined}</p>
          <div class="flex gap-2 justify-center mt-4">
            <span class="badge badge-success">${icon('enhanced_encryption','text-[14px]')} HIPAA AES-256</span>
            <span class="badge badge-info">${icon('cloud_off','text-[14px]')} Local Only</span>
          </div>
        </div>
        <div class="card p-5">
          <h3 class="section-title">Privacy Settings</h3>
          ${[
            { label:'Cloud Sync',              on:false },
            { label:'Anonymous Price Alerts',  on:true  },
            { label:'Recall Notifications',    on:true  },
            { label:'Usage Analytics',         on:false },
          ].map(s=>`
            <div class="flex items-center justify-between py-2 border-b border-[#e8e7ef] last:border-0">
              <span class="text-sm text-[#44464e]">${s.label}</span>
              <div class="w-10 h-6 rounded-full ${s.on?'bg-primary':'bg-[#c4c6d0]'} relative cursor-pointer transition-colors"
                   onclick="this.classList.toggle('bg-primary');this.classList.toggle('bg-[#c4c6d0]')">
                <div class="w-4 h-4 bg-white rounded-full absolute top-1 transition-all
                            ${s.on?'right-1':'left-1'}"></div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Alerts + history -->
      <div class="lg:col-span-2 flex flex-col gap-5">
        <div class="card overflow-hidden">
          <div class="px-5 py-4 border-b border-[#e8e7ef] flex items-center justify-between">
            <h3 class="font-bold text-[#1b1c1f]">Safety &amp; Recall Alerts</h3>
            <span class="badge badge-error">${DEMO.alerts.length} Active</span>
          </div>
          <div class="p-4 flex flex-col gap-3">
            ${DEMO.alerts.map(a=>`
              <div class="alert-row ${a.level}">
                ${icon(a.icon,`text-[22px] flex-shrink-0 ${a.level==='warning'?'text-yellow-700':a.level==='caution'?'text-red-600':'text-blue-600'}`)}
                <div class="flex-1">
                  <div class="font-bold text-sm">${a.title}</div>
                  <div class="text-sm text-[#44464e] mt-0.5">${a.desc}</div>
                  <div class="text-xs text-[#74767e] mt-1">${a.date}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Scan history -->
        <div class="card overflow-hidden">
          <div class="px-5 py-4 border-b border-[#e8e7ef] flex items-center justify-between">
            <h3 class="font-bold text-[#1b1c1f]">Past Activity</h3>
            <div class="flex gap-2">
              ${['All','Scans','Price Checks','Prescriptions'].map((t,i)=>`
                <button class="chip text-xs btn-sm ${i===0?'selected':''}"
                        onclick="this.closest('.card').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));this.classList.add('selected')">${t}</button>`).join('')}
            </div>
          </div>
          ${DEMO.scanHistory.map(s=>`
            <div class="flex items-center gap-3 px-5 py-4 border-b border-[#e8e7ef] last:border-0">
              ${icon('barcode_scanner','text-[24px] text-primary')}
              <div class="flex-1">
                <div class="font-semibold text-sm">${s.medicine}</div>
                <div class="text-xs text-[#74767e]">${s.date}</div>
              </div>
              <span class="badge ${s.result==='VERIFIED'?'badge-success':'badge-warning'} text-xs">
                ${s.score}% — ${s.result}
              </span>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   14. MEDICATION SCHEDULE
   ─────────────────────────────────────────────────────────────────────── */
SCREENS.schedule = () => `
<div class="max-w-5xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Medication Schedule</h1>
      <p class="page-subtitle">Daily adherence tracker — demo simulated data</p>
    </div>
    <button class="btn-primary btn-sm" onclick="ED.toast('Add medication (demo)')">
      ${icon('add','text-[18px]')} Add Medication
    </button>
  </div>
  <div class="section">
    ${demoNote('Simulated schedule — not a real prescription or dosing recommendation.')}
    <div class="grid lg:grid-cols-3 gap-6 mt-4">
      <!-- Calendar + adherence -->
      <div class="flex flex-col gap-4">
        <div class="card p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-[#1b1c1f]">October 2026</h3>
            <div class="flex gap-2">
              <button class="btn-outline !p-2 !px-2">${icon('chevron_left','text-[20px]')}</button>
              <button class="btn-outline !p-2 !px-2">${icon('chevron_right','text-[20px]')}</button>
            </div>
          </div>
          <div class="flex gap-2 justify-between mb-2">
            ${[{n:'Mon',d:21},{n:'Tue',d:22},{n:'Wed',d:23},{n:'Thu',d:24,today:true},{n:'Fri',d:25},{n:'Sat',d:26},{n:'Sun',d:27}].map(day=>`
              <div class="cal-day ${day.today?'today':''}">
                <span class="day-name">${day.n}</span>
                <span class="day-num">${day.d}</span>
                <div class="day-dot"></div>
              </div>`).join('')}
          </div>
        </div>
        <div class="card p-5">
          <h3 class="font-bold text-[#1b1c1f] mb-3">Today's Adherence</h3>
          <div class="text-center mb-3">
            <div class="text-3xl font-extrabold text-primary">
              ${DEMO.schedule.filter(s=>s.taken).length}/${DEMO.schedule.length}
            </div>
            <div class="text-sm text-[#44464e]">doses logged today</div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${Math.round(DEMO.schedule.filter(s=>s.taken).length/DEMO.schedule.length*100)}%"></div>
          </div>
          <div class="text-xs text-[#74767e] mt-2 text-center">
            ${Math.round(DEMO.schedule.filter(s=>s.taken).length/DEMO.schedule.length*100)}% adherence rate
          </div>
        </div>
        <!-- Refill alert -->
        <div class="alert-row warning rounded-xl">
          ${icon('inventory_2','text-[22px] text-yellow-700 flex-shrink-0')}
          <div>
            <div class="font-bold text-sm text-yellow-800">Refill Alert</div>
            <div class="text-sm text-[#44464e]">Lipitor — 5 doses left</div>
            <button class="text-primary text-xs font-semibold mt-1 hover:underline"
                    onclick="ED.navigate('price-search')">Order refill →</button>
          </div>
        </div>
      </div>

      <!-- Medication list -->
      <div class="lg:col-span-2">
        <div class="flex flex-col gap-3">
          ${DEMO.schedule.map(m=>`
            <div class="med-row">
              <div class="med-dot ${m.color}">
                ${icon(m.icon,'text-[20px]')}
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-bold text-sm truncate">${m.name}</div>
                <div class="text-xs text-[#74767e]">${m.time}</div>
              </div>
              <div class="text-xs text-[#74767e] hidden sm:block">Refill in ${m.refillDays}d</div>
              <span class="badge ${m.taken?'badge-success':'badge-neutral'} text-xs">
                ${m.taken?icon('check_circle','text-[14px]'):'Pending'} ${m.taken?'Taken':''}
              </span>
              ${!m.taken?`
                <button class="btn-primary btn-sm !px-3 !py-1.5 text-xs"
                        onclick="ED.toast('${m.name} logged! (demo)');this.parentElement.querySelector('.badge').className='badge badge-success text-xs';this.parentElement.querySelector('.badge').innerHTML='✓ Taken';this.remove()">
                  Log
                </button>` : ''}
            </div>`).join('')}
        </div>
        <div class="flex gap-3 mt-5">
          <button class="btn-primary flex-1" onclick="ED.navigate('rx-reader')">
            ${icon('add','text-[18px]')} Add from Prescription
          </button>
          <button class="btn-secondary" onclick="ED.toast('Schedule exported (demo)')">
            ${icon('download','text-[18px]')} Export
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   BONUS B1: MEDICINE INFO
   ─────────────────────────────────────────────────────────────────────── */
SCREENS['med-info'] = () => `
<div class="max-w-4xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">${DEMO.medicine.name}</h1>
      <p class="page-subtitle">${DEMO.medicine.generic} · ${DEMO.medicine.category}</p>
    </div>
    <button class="btn-secondary btn-sm" onclick="ED.back()">
      ${icon('arrow_back','text-[18px]')} Back
    </button>
  </div>
  <div class="section">
    ${demoNote('Demo drug information — not a substitute for official prescribing information or pharmacist advice.')}
    <!-- Tab bar -->
    <div class="flex gap-1 bg-surface-container rounded-xl p-1 max-w-lg mt-4 mb-5" id="med-tabs">
      ${['Indications','Warnings','Interactions','Storage'].map((t,i)=>`
        <button class="flex-1 py-2 text-sm font-semibold rounded-lg transition-all
                       ${i===0?'bg-white text-primary shadow-sm':'text-[#44464e] hover:bg-white/60'}"
                onclick="ED.switchMedTab(this,'${t.toLowerCase()}')">
          ${t}
        </button>`).join('')}
    </div>
    <!-- Indications panel -->
    <div id="panel-indications" class="card p-6">
      <h3 class="section-title">Indications &amp; Usage</h3>
      <p class="text-sm text-[#44464e] leading-relaxed mb-4">
        Augmentin 625mg (Amoxicillin + Clavulanic Acid) is a broad-spectrum antibiotic indicated for:
      </p>
      ${['Respiratory tract infections (sinusitis, pneumonia, bronchitis)',
         'Urinary tract infections (UTI)',
         'Skin and soft tissue infections',
         'Dental infections and oral abscesses',
         'Otitis media (ear infections)'].map(i=>`
        <div class="flex gap-2 text-sm text-[#44464e] mb-2">
          ${icon('check_circle','text-[16px] text-green-600 flex-shrink-0 mt-0.5')} ${i}
        </div>`).join('')}
    </div>
    <div id="panel-warnings" class="card p-6 hidden">
      <h3 class="section-title">Warnings &amp; Precautions</h3>
      ${DEMO.medicine.warnings.map(w=>`
        <div class="flex gap-2 mb-3 p-3 bg-red-50 rounded-xl">
          ${icon('warning','text-[18px] text-red-600 flex-shrink-0')}
          <p class="text-sm text-[#1b1c1f]">${w}</p>
        </div>`).join('')}
    </div>
    <div id="panel-interactions" class="card p-6 hidden">
      <h3 class="section-title">Drug Interactions</h3>
      <table class="data-table">
        <thead><tr><th>Drug</th><th>Severity</th><th>Note</th></tr></thead>
        <tbody>
          ${DEMO.medicine.interactions.map(i=>`
            <tr>
              <td class="font-semibold">${i.drug}</td>
              <td><span class="badge ${i.severity==='high'?'badge-error':i.severity==='moderate'?'badge-warning':'badge-neutral'} text-xs">${i.severity}</span></td>
              <td class="text-sm text-[#44464e]">${i.note}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div id="panel-storage" class="card p-6 hidden">
      <h3 class="section-title">Storage &amp; Disposal</h3>
      <div class="grid sm:grid-cols-2 gap-4">
        ${[
          { icon:'thermostat',   label:'Temperature', val:'Store below 25°C (77°F)' },
          { icon:'water_drop',   label:'Humidity',    val:'Keep dry. Avoid damp conditions.' },
          { icon:'light_mode',   label:'Light',       val:'Protect from direct sunlight.' },
          { icon:'delete_forever', label:'Disposal',  val:'Return unused medicine to pharmacy.' },
        ].map(s=>`
          <div class="flex gap-3 p-4 bg-surface-container rounded-xl">
            ${icon(s.icon,'text-[28px] text-primary flex-shrink-0')}
            <div><div class="font-bold text-sm">${s.label}</div>
            <div class="text-sm text-[#44464e]">${s.val}</div></div>
          </div>`).join('')}
      </div>
    </div>
    <div class="flex gap-3 mt-5">
      <button class="btn-primary flex-1" onclick="ED.navigate('price-search')">
        ${icon('price_check','text-[18px]')} Check Price
      </button>
      <button class="btn-secondary" onclick="ED.navigate('alternatives')">
        ${icon('compare','text-[18px]')} Alternatives
      </button>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   BONUS B2: ALTERNATIVES
   ─────────────────────────────────────────────────────────────────────── */
SCREENS.alternatives = () => `
<div class="max-w-4xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Bioequivalent Alternatives</h1>
      <p class="page-subtitle">${DEMO.medicine.name} — ${DEMO.medicine.generic}</p>
    </div>
    <button class="btn-secondary btn-sm" onclick="ED.back()">
      ${icon('arrow_back','text-[18px]')} Back
    </button>
  </div>
  <div class="section">
    ${demoNote('Simulated formulary data — bioequivalence ratings are illustrative demo values.')}
    <div class="card mt-4 overflow-hidden">
      <div class="px-5 py-4 border-b border-[#e8e7ef]">
        <h3 class="font-bold text-[#1b1c1f]">Bioequivalent Generics</h3>
        <p class="text-sm text-[#44464e] mt-1">ATC: ${DEMO.medicine.atcCode} — Therapeutically equivalent options</p>
      </div>
      <table class="data-table">
        <thead><tr>
          <th>Medicine</th><th>Manufacturer</th><th>ATC</th><th>Equiv.</th>
          <th>Form</th><th class="text-right">Price/10</th><th>Action</th>
        </tr></thead>
        <tbody>
          ${DEMO.alternatives.map(a=>`
            <tr>
              <td class="font-semibold">${a.name}</td>
              <td>${a.brand}</td>
              <td class="text-xs font-mono">${a.atc}</td>
              <td><span class="badge ${a.equiv==='A'?'badge-success':'badge-warning'} text-xs">${a.equiv}-rated</span></td>
              <td>${a.form}</td>
              <td class="text-right font-bold text-green-700">\$${a.price.toFixed(2)}</td>
              <td>
                <button class="btn-outline btn-sm !px-3 !py-1.5 text-xs"
                        onclick="ED.navigate('price-compare')">
                  Compare
                </button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="flex gap-3 mt-5">
      <button class="btn-primary flex-1" onclick="ED.navigate('price-compare')">
        ${icon('compare_arrows','text-[18px]')} View Price Comparison
      </button>
      <button class="btn-secondary" onclick="ED.navigate('med-info')">
        ${icon('info','text-[18px]')} Drug Info
      </button>
    </div>
  </div>
</div>`;

/* ─────────────────────────────────────────────────────────────────────────
   BONUS B3: HELP & SUPPORT
   ─────────────────────────────────────────────────────────────────────── */
SCREENS.help = () => `
<div class="max-w-3xl mx-auto">
  <div class="page-header">
    <div>
      <h1 class="page-title">Help &amp; Support</h1>
      <p class="page-subtitle">Photo guide, camera tips, and contact support</p>
    </div>
  </div>
  <div class="section">
    ${demoNote('Demo support page — no real support tickets are submitted.')}
    <div class="grid sm:grid-cols-2 gap-4 mt-4">
      ${[
        { icon:'wb_sunny',          label:'Ideal Focus',     desc:'Bright, even lighting. No shadows across the label.',             ok:true  },
        { icon:'zoom_in',           label:'Correct Distance', desc:'Hold 10–20 cm from the package. Fill the frame.',               ok:true  },
        { icon:'close',             label:'Too Close (<5cm)', desc:'Blurry — move further away so batch text is clear.',            ok:false },
        { icon:'flash_on',          label:'Flash Glare',     desc:'Turn off flash. Use natural or diffused lighting instead.',       ok:false },
        { icon:'crop_rotate',       label:'Rotate Package',   desc:'If barcode is vertical, rotate phone to landscape mode.',        ok:true  },
        { icon:'center_focus_strong', label:'Align Reticle', desc:'Keep batch number &amp; expiry date inside the scanner frame.',  ok:true  },
      ].map(t=>`
        <div class="card p-5 flex gap-4 items-start">
          <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${t.ok?'bg-green-100 text-green-700':'bg-red-100 text-red-600'}">
            ${icon(t.icon,'text-[22px]')}
          </div>
          <div>
            <div class="font-bold text-sm mb-1 ${t.ok?'text-green-700':'text-red-600'}">${t.label}</div>
            <p class="text-sm text-[#44464e]">${t.desc}</p>
          </div>
        </div>`).join('')}
    </div>
    <div class="card p-6 mt-6">
      <h3 class="section-title">Contact Support</h3>
      <div class="grid sm:grid-cols-2 gap-4">
        <button class="btn-secondary w-full" onclick="ED.toast('Support chat (demo only)')">
          ${icon('chat','text-[20px]')} App Support Chat
        </button>
        <button class="btn-outline w-full" onclick="ED.toast('Bug report (demo only)')">
          ${icon('bug_report','text-[20px]')} Report a Bug
        </button>
      </div>
    </div>
    <button class="btn-secondary mt-4" onclick="ED.navigate('scanner')">
      ${icon('arrow_back','text-[18px]')} Back to Scanner
    </button>
  </div>
</div>`;

/* ════════════════════════════════════════════════════════════════════════
   POST-RENDER EVENT HANDLERS
   ════════════════════════════════════════════════════════════════════════ */
const EVENTS = {};

EVENTS['symptom-ai'] = () => {
  // Allow pressing Enter to "send" chat message
  const inp = $('chat-input');
  if (inp) {
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') ED.addChatMessage();
    });
  }
};

/* ── Chat add message ─────────────────────────────────────────────────── */
ED.addChatMessage = function() {
  const inp = $('chat-input');
  const box = $('chat-messages');
  if (!inp || !box || !inp.value.trim()) return;
  const text = inp.value.trim();
  inp.value = '';
  const now = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  box.innerHTML += `<div>
    <div class="chat-bubble-user">${text}</div>
    <div class="chat-timestamp text-right">${now}</div>
  </div>`;
  box.scrollTop = box.scrollHeight;
  // Auto AI reply after 800ms
  setTimeout(() => {
    box.innerHTML += `<div>
      <div class="chat-bubble-ai">
        Thank you for that information. Based on your symptoms, I recommend resting and staying hydrated.
        If symptoms persist beyond 72 hours or worsen, please consult a licensed physician.
        <span class="block mt-2 text-xs text-[#74767e]">⚠ This is not medical advice — demo response only.</span>
      </div>
      <div class="chat-timestamp">${now}</div>
    </div>`;
    box.scrollTop = box.scrollHeight;
  }, 800);
};

/* ── Medicine info tab switcher ───────────────────────────────────────── */
ED.switchMedTab = function(btn, panelId) {
  const tabs = $('med-tabs')?.querySelectorAll('button');
  if (!tabs) return;
  tabs.forEach(t => {
    t.className = 'flex-1 py-2 text-sm font-semibold rounded-lg transition-all text-[#44464e] hover:bg-white/60';
  });
  btn.className = 'flex-1 py-2 text-sm font-semibold rounded-lg transition-all bg-white text-primary shadow-sm';
  ['indications','warnings','interactions','storage'].forEach(p => {
    const el = $('panel-' + p);
    if (el) el.classList.toggle('hidden', p !== panelId);
  });
};

/* ════════════════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════════════════ */
window.addEventListener('hashchange', () => {
  const route = window.location.hash.slice(1) || 'welcome';
  ED._render(route);
  ED._updateNav(route);
  ED._updateTopbar(route);
  ED.current = route;
  ED.closeMobileSidebar();
});

document.addEventListener('DOMContentLoaded', () => {
  const route = window.location.hash.slice(1) || 'welcome';
  ED.navigate(route, false);
});
