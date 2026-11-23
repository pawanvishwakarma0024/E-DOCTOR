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

  /* ── Search drugs by brand or generic name ──────────────────────────
     Returns array of up to `limit` drug label results.              */
  async search(query, limit = 6) {
    const q = encodeURIComponent(query);
    const data = await fdaFetch(
      `/drug/label.json?search=(openfda.brand_name:"${q}"+openfda.generic_name:"${q}")&limit=${limit}`
    );
    return data?.results ?? [];
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

  const doSearch = debounce(async (query) => {
    if (query.length < 2) { drop.innerHTML = ''; drop.classList.add('hidden'); return; }
    drop.innerHTML = `<div class="px-4 py-3 text-sm text-[#74767e]">Searching FDA database…</div>`;
    drop.classList.remove('hidden');
    try {
      const results = await FDA.search(query, 6);
      if (!results.length) {
        drop.innerHTML = `<div class="px-4 py-3 text-sm text-[#74767e]">No results found for "${query}"</div>`;
        return;
      }
      drop.innerHTML = results.map(r => {
        const { brand, generic, mfr } = FDA.names(r);
        return `
          <button class="w-full text-left px-4 py-3 hover:bg-surface-container border-b border-[#e8e7ef] last:border-0
                         flex items-center gap-3 transition-colors"
                  onclick="fdaDropSelect(${JSON.stringify(brand)}, ${JSON.stringify(generic)}, '${dropdownId}')">
            <span class="material-symbols-outlined text-primary text-[20px] flex-shrink-0">medication</span>
            <div class="min-w-0">
              <div class="font-semibold text-sm text-[#1b1c1f] truncate">${brand}</div>
              <div class="text-xs text-[#74767e] truncate">${generic} · ${mfr}</div>
            </div>
          </button>`;
      }).join('');
    } catch (e) {
      drop.innerHTML = `<div class="px-4 py-3 text-sm text-red-600">Search error — check connection</div>`;
    }
  }, 350);

  input.addEventListener('input', () => doSearch(input.value.trim()));
  input.addEventListener('blur', () => setTimeout(() => { drop.classList.add('hidden'); }, 200));

  // Store the onSelect callback
  window._fdaSearchCallbacks = window._fdaSearchCallbacks || {};
  window._fdaSearchCallbacks[dropdownId] = onSelect;
}

/* Called when user clicks a dropdown item */
window.fdaDropSelect = function(brand, generic, dropdownId) {
  const drop = document.getElementById(dropdownId);
  if (drop) drop.classList.add('hidden');
  const cb = window._fdaSearchCallbacks?.[dropdownId];
  if (cb) cb(brand, generic);
};
