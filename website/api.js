/* ════════════════════════════════════════════════════════════════════════
   E Doctor — api.js
   Real OpenFDA integration layer
   ──────────────────────────────────────────────────────────────────────
   API KEY NOTICE:
   This key only raises the rate-limit from 240 → 1000 req/min.
   OpenFDA is a public government database — no private data is exposed.
   Still, do not share this key publicly. Revoke/regenerate at:
   https://open.fda.gov/apis/authentication/
   ════════════════════════════════════════════════════════════════════════ */

'use strict';

const FDA_KEY  = 'ggnPhb96B6Hz8DqGjpprfTnLLRwKpJrMdH8JqMWq';
const FDA_BASE = 'https://api.fda.gov';

/* ── Shared fetch helper ─────────────────────────────────────────────── */
async function fdaFetch(path) {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${FDA_BASE}${path}${sep}api_key=${FDA_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) return null;   // no results — not an error
    throw new Error(`OpenFDA ${res.status}: ${path}`);
  }
  return res.json();
}

/* ════════════════════════════════════════════════════════════════════════
   FDA NAMESPACE
   ════════════════════════════════════════════════════════════════════════ */
const FDA = {

  /* ── Search drugs by brand, generic, active ingredient (salt) or symptom ──
     Returns array of up to `limit` drug label and symptom results. */
  async search(query, limit = 6) {
    const clean = (query || '').trim();
    if (!clean) return [];
    const q = encodeURIComponent(clean);
    let fdaResults = [];

    // Query OpenFDA: brand name, generic name, substance/salt name, purpose, and indications
    try {
      const path = `/drug/label.json?search=(openfda.brand_name:"${q}"+openfda.generic_name:"${q}"+openfda.substance_name:"${q}"+purpose:"${q}"+indications_and_usage:"${q}")&limit=${limit}`;
      const data = await fdaFetch(path);
      fdaResults = data?.results ?? [];
    } catch (e) {
      // OpenFDA network error or 404
      fdaResults = [];
    }

    // Always merge with local reference database for salts, local medicines, and symptoms
    const localMatches = FDA.searchLocal(clean, limit);

    // Merge without duplicates
    const combined = [...fdaResults];
    const seenNames = new Set(
      fdaResults.map(r => (r?.openfda?.brand_name?.[0] || '').toLowerCase())
    );

    for (const item of localMatches) {
      const key = (item.isSymptom ? item.name : item?.openfda?.brand_name?.[0] || '').toLowerCase();
      if (!seenNames.has(key)) {
        seenNames.add(key);
        combined.push(item);
      }
      if (combined.length >= limit) break;
    }

    return combined.slice(0, limit);
  },

  /* ── Search local medicines, active salts, and symptoms ─────────── */
  searchLocal(query, limit = 6) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    const matches = [];

    // 1. Check local symptoms
    const symptomList = [
      { name: 'Headache', desc: 'Frontal or tension headache, pain, pressure' },
      { name: 'Early Migraine', desc: 'Throbbing headache, photophobia, mild nausea' },
      { name: 'Nausea', desc: 'Stomach upset, vomiting reflex, dizziness' },
      { name: 'Fever', desc: 'High body temperature (>100.4°F), chills, fatigue' },
      { name: 'Neck stiffness', desc: 'Cervical tension or pain with movement' },
      { name: 'Dehydration', desc: 'Dry mouth, fatigue, headache, electrolyte loss' },
      { name: 'Cough', desc: 'Dry or productive chest cough, throat irritation' },
      { name: 'Body Pain', desc: 'Muscle ache, joint stiffness, inflammation' },
    ];

    for (const s of symptomList) {
      if (s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)) {
        matches.push({
          isSymptom: true,
          name: s.name,
          desc: s.desc,
          generic: 'Symptom Guidance',
          mfr: 'AI Health Assessment'
        });
      }
    }

    // 2. Check local medicines & active pharmaceutical ingredients (salts)
    const localMeds = [
      { brand: 'Augmentin 625mg', generic: 'Amoxicillin + Clavulanic Acid (Salt/API)', mfr: 'GlaxoSmithKline (GSK)' },
      { brand: 'Amoxyclav 625mg', generic: 'Amoxicillin + Clavulanate Potassium', mfr: 'Sun Pharma' },
      { brand: 'Clavam 625mg', generic: 'Amoxicillin + Clavulanic Acid', mfr: 'Cipla' },
      { brand: 'Moxikind-CV 625mg', generic: 'Amoxicillin + Potassium Clavulanate', mfr: 'Mankind' },
      { brand: 'Metformin HCl 500mg', generic: 'Metformin Hydrochloride (Antidiabetic Salt)', mfr: 'Sun Pharma' },
      { brand: 'Lisinopril 10mg', generic: 'Lisinopril Dihydrate (ACE Inhibitor Salt)', mfr: 'Lupin' },
      { brand: 'Atorvastatin 20mg', generic: 'Atorvastatin Calcium (Statin/Lipid Regulator)', mfr: 'Cipla' },
      { brand: 'Aspirin 75mg', generic: 'Acetylsalicylic Acid (Analgesic Salt)', mfr: 'Bayer' },
      { brand: 'Paracetamol 650mg', generic: 'Acetaminophen (Antipyretic Salt)', mfr: 'Crocin / Calpol' },
      { brand: 'Vitamin D3 1000 IU', generic: 'Cholecalciferol (Vitamin Supplement)', mfr: 'Cadila' },
    ];

    for (const m of localMeds) {
      if (
        m.brand.toLowerCase().includes(q) ||
        m.generic.toLowerCase().includes(q) ||
        m.mfr.toLowerCase().includes(q)
      ) {
        matches.push({
          openfda: {
            brand_name: [m.brand],
            generic_name: [m.generic],
            manufacturer_name: [m.mfr],
          }
        });
      }
    }

    return matches.slice(0, limit);
  },

  /* ── Get full drug label for one medicine ───────────────────────── */
  async getDrugLabel(name) {
    const q = encodeURIComponent(name);
    // Try brand name first, fall back to generic name
    let data = await fdaFetch(`/drug/label.json?search=openfda.brand_name:"${q}"&limit=1`);
    if (!data?.results?.length) {
      data = await fdaFetch(`/drug/label.json?search=openfda.generic_name:"${q}"&limit=1`);
    }
    return data?.results?.[0] ?? null;
  },

  /* ── Get adverse event count for a drug ─────────────────────────── */
  async getAdverseEventCount(name) {
    const q = encodeURIComponent(name);
    const data = await fdaFetch(
      `/drug/event.json?search=patient.drug.openfda.brand_name:"${q}"&limit=1`
    );
    return data?.meta?.results?.total ?? 0;
  },

  /* ── Recall search for a drug ───────────────────────────────────── */
  async getRecalls(name) {
    const q = encodeURIComponent(name);
    const data = await fdaFetch(
      `/drug/enforcement.json?search=product_description:"${q}"&limit=3`
    );
    return data?.results ?? [];
  },

  /* ── Helper: extract first item from FDA array field ───────────── */
  field(label, fallback = '') {
    if (!label) return fallback;
    const text = Array.isArray(label) ? label[0] : label;
    // Strip HTML tags and trim
    return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  },

  /* ── Helper: extract brand & generic names from a label result ── */
  names(result) {
    const brand   = result?.openfda?.brand_name?.[0]   ?? 'Unknown';
    const generic = result?.openfda?.generic_name?.[0] ?? 'Unknown';
    const mfr     = result?.openfda?.manufacturer_name?.[0] ?? '—';
    return { brand, generic, mfr };
  },
};

/* ════════════════════════════════════════════════════════════════════════
   SEARCH AUTOCOMPLETE (used by dashboard + price-search)
   ════════════════════════════════════════════════════════════════════════ */

/* Debounce helper */
function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

/* Attach live search to an <input> and render results into a dropdown div */
function attachFdaSearch(inputId, dropdownId, onSelect) {
  const input = document.getElementById(inputId);
  const drop  = document.getElementById(dropdownId);
  if (!input || !drop) return;

  // Prevent duplicate event attachments
  if (input._hasFdaSearchAttached) {
    window._fdaSearchCallbacks = window._fdaSearchCallbacks || {};
    window._fdaSearchCallbacks[dropdownId] = onSelect;
    return;
  }
  input._hasFdaSearchAttached = true;

  const executeSearch = async (query) => {
    if (!query || query.length < 2) {
      drop.innerHTML = '';
      drop.classList.add('hidden');
      return;
    }

    drop.innerHTML = `
      <div class="px-4 py-3 text-sm text-[#74767e] flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-[18px] animate-spin" style="animation-duration:1s">progress_activity</span>
        <span>Searching medicines, active salts &amp; symptoms…</span>
      </div>`;
    drop.classList.remove('hidden');

    try {
      const results = await FDA.search(query, 7);
      if (!results.length) {
        drop.innerHTML = `
          <div class="px-4 py-3 text-sm text-[#74767e] flex items-center gap-2">
            <span class="material-symbols-outlined text-[#74767e] text-[18px]">search_off</span>
            <span>No results found for "<b>${query}</b>"</span>
          </div>`;
        return;
      }

      drop.innerHTML = results.map(r => {
        if (r.isSymptom) {
          return `
            <button class="w-full text-left px-4 py-3 hover:bg-surface-container border-b border-[#e8e7ef] last:border-0
                           flex items-center gap-3 transition-colors cursor-pointer"
                    type="button"
                    onclick="fdaDropSelect(${JSON.stringify(r.name)}, ${JSON.stringify(r.desc)}, '${dropdownId}', true)">
              <span class="material-symbols-outlined text-purple-600 text-[20px] flex-shrink-0">psychology</span>
              <div class="min-w-0 flex-1">
                <div class="font-semibold text-sm text-[#1b1c1f] truncate">${r.name}</div>
                <div class="text-xs text-[#74767e] truncate">${r.desc}</div>
              </div>
              <span class="badge badge-neutral !bg-purple-100 !text-purple-700 text-[10px]">Symptom</span>
            </button>`;
        }

        const { brand, generic, mfr } = FDA.names(r);
        return `
          <button class="w-full text-left px-4 py-3 hover:bg-surface-container border-b border-[#e8e7ef] last:border-0
                         flex items-center gap-3 transition-colors cursor-pointer"
                  type="button"
                  onclick="fdaDropSelect(${JSON.stringify(brand)}, ${JSON.stringify(generic)}, '${dropdownId}', false)">
            <span class="material-symbols-outlined text-primary text-[20px] flex-shrink-0">medication</span>
            <div class="min-w-0 flex-1">
              <div class="font-semibold text-sm text-[#1b1c1f] truncate">${brand}</div>
              <div class="text-xs text-[#74767e] truncate">${generic} · ${mfr}</div>
            </div>
            <span class="badge badge-info text-[10px]">Medicine</span>
          </button>`;
      }).join('');
    } catch (e) {
      drop.innerHTML = `
        <div class="px-4 py-3 text-sm text-red-600 flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">error</span>
          <span>Search connection error — please check network</span>
        </div>`;
    }
  };

  const doSearch = debounce(executeSearch, 280);

  input.addEventListener('input', () => doSearch(input.value.trim()));
  input.addEventListener('focus', () => {
    const val = input.value.trim();
    if (val.length >= 2) executeSearch(val);
  });
  input.addEventListener('blur', () => setTimeout(() => { drop.classList.add('hidden'); }, 250));

  // Enter key support
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;

      const firstBtn = drop.querySelector('button');
      if (firstBtn && !drop.classList.contains('hidden')) {
        firstBtn.click();
      } else {
        drop.classList.add('hidden');
        if (onSelect) onSelect(val, '', false);
      }
    }
  });

  // Wire search icon button if nearby
  const searchBtnId = inputId === 'desktop-search' ? 'desktop-search-btn' : (inputId + '-btn');
  const searchBtn = document.getElementById(searchBtnId);
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (!val) return;
      const firstBtn = drop.querySelector('button');
      if (firstBtn && !drop.classList.contains('hidden')) {
        firstBtn.click();
      } else {
        drop.classList.add('hidden');
        if (onSelect) onSelect(val, '', false);
      }
    });
  }

  // Store the onSelect callback
  window._fdaSearchCallbacks = window._fdaSearchCallbacks || {};
  window._fdaSearchCallbacks[dropdownId] = onSelect;
}

/* Called when user clicks a dropdown item */
window.fdaDropSelect = function(brand, generic, dropdownId, isSymptom = false) {
  const drop = document.getElementById(dropdownId);
  if (drop) drop.classList.add('hidden');
  const cb = window._fdaSearchCallbacks?.[dropdownId];
  if (cb) cb(brand, generic, isSymptom);
};
