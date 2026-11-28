// ════════════════════════════════════════════════════════════════════════
// E Doctor — api/config.js
// Centralized API Configuration Module
// ────────────────────────────────────────────────────────────────────────
// SECURITY RULES:
//   • This file runs only on the Node.js backend.
//   • It is NEVER sent to the browser or bundled into client JS.
//   • Credentials are read from environment variables ONLY.
//   • No actual API calls are made here — config only.
// ════════════════════════════════════════════════════════════════════════

'use strict';

// Load .env into process.env (safe no-op if dotenv is not installed yet)
try {
  require('dotenv').config();
} catch (_) {
  // dotenv not yet installed — values must be set in the system environment
}

// ── Helper: safe credential reader ───────────────────────────────────────
/**
 * Reads an environment variable. Returns the value if set.
 * Returns null (never throws) so the app can start without all keys.
 * @param {string} name - Environment variable name
 * @returns {string|null}
 */
function readEnv(name) {
  const val = process.env[name];
  return (val && val.trim() !== '') ? val.trim() : null;
}

/**
 * Returns a masked preview of a key for safe console logging.
 * Example: "sk-AbcDef..." → "sk-Ab…[hidden]"
 * @param {string|null} key
 * @returns {string}
 */
function maskKey(key) {
  if (!key) return '[NOT SET]';
  if (key.length <= 8) return '[SET — length ≤ 8]';
  return `${key.slice(0, 6)}…[hidden]`;
}

// ════════════════════════════════════════════════════════════════════════
//  GOOGLE GEMINI API
//  Docs: https://ai.google.dev/gemini-api/docs
//  Key:  https://aistudio.google.com/app/apikey
//  Used for: Conversational AI symptom chat
// ════════════════════════════════════════════════════════════════════════
const gemini = {
  apiKey:   readEnv('GEMINI_API_KEY'),
  model:    'gemini-1.5-flash',          // default model; override when needed
  baseUrl:  'https://generativelanguage.googleapis.com/v1beta',
  isReady() {
    return this.apiKey !== null;
  },
  validate() {
    if (!this.isReady()) {
      console.warn('[E Doctor API] ⚠  GEMINI_API_KEY is not set. Gemini AI features will be disabled.');
      return false;
    }
    return true;
  },
};

// ════════════════════════════════════════════════════════════════════════
//  INFERMEDICA API
//  Docs: https://developer.infermedica.com/docs
//  Keys: https://developer.infermedica.com/ (App-Id + App-Key pair)
//  Used for: Structured symptom assessment and medical triage
// ════════════════════════════════════════════════════════════════════════
const infermedica = {
  appId:   readEnv('INFERMEDICA_APP_ID'),
  appKey:  readEnv('INFERMEDICA_APP_KEY'),
  baseUrl: 'https://api.infermedica.com/v3',
  isReady() {
    return this.appId !== null && this.appKey !== null;
  },
  validate() {
    if (!this.appId) {
      console.warn('[E Doctor API] ⚠  INFERMEDICA_APP_ID is not set. Symptom assessment will be disabled.');
    }
    if (!this.appKey) {
      console.warn('[E Doctor API] ⚠  INFERMEDICA_APP_KEY is not set. Symptom assessment will be disabled.');
    }
    return this.isReady();
  },
  /** Returns the authorization headers required by every Infermedica request */
  headers() {
    return {
      'App-Id':       this.appId  || '',
      'App-Key':      this.appKey || '',
      'Content-Type': 'application/json',
      'Interview-Id': '',           // set per-session when making requests
    };
  },
};

// ════════════════════════════════════════════════════════════════════════
//  OPENAI API
//  Docs: https://platform.openai.com/docs
//  Key:  https://platform.openai.com/api-keys
//  Used for: AI response explanation and fallback language model
// ════════════════════════════════════════════════════════════════════════
const openai = {
  apiKey:  readEnv('OPENAI_API_KEY'),
  model:   'gpt-4o-mini',               // default model; override when needed
  baseUrl: 'https://api.openai.com/v1',
  isReady() {
    return this.apiKey !== null;
  },
  validate() {
    if (!this.isReady()) {
      console.warn('[E Doctor API] ⚠  OPENAI_API_KEY is not set. OpenAI features will be disabled.');
      return false;
    }
    return true;
  },
};

// ════════════════════════════════════════════════════════════════════════
//  OPENFDA API  (already in use on the frontend — backend reference copy)
//  Docs: https://open.fda.gov/apis/
//  Key:  https://open.fda.gov/apis/authentication/  (optional rate boost)
// ════════════════════════════════════════════════════════════════════════
const openFda = {
  apiKey:  readEnv('OPENFDA_API_KEY'),
  baseUrl: 'https://api.fda.gov',
  isReady() { return true; },           // public API — no key required
  validate() { return true; },
};

// ════════════════════════════════════════════════════════════════════════
//  EXCHANGE RATE API  (optional — used for INR/USD conversion)
//  Free endpoint: https://open.er-api.com/v6/latest/USD  (no key needed)
//  Paid endpoint: https://v6.exchangerate-api.com/v6/{KEY}/latest/USD
// ════════════════════════════════════════════════════════════════════════
const exchangeRate = {
  apiKey:  readEnv('EXCHANGE_RATE_API_KEY'),
  baseUrl: 'https://open.er-api.com/v6',    // free tier (no key)
  isReady() { return true; },               // works without a key
  validate() { return true; },
};

// ════════════════════════════════════════════════════════════════════════
//  VALIDATION SUMMARY  (runs once at server startup)
// ════════════════════════════════════════════════════════════════════════
function validateAll() {
  console.log('\n[E Doctor API] ── API Configuration Status ─────────────────');
  console.log(`  Gemini      : ${gemini.isReady()       ? '✅ READY' : '⚠  NOT CONFIGURED'}  key=${maskKey(gemini.apiKey)}`);
  console.log(`  Infermedica : ${infermedica.isReady()  ? '✅ READY' : '⚠  NOT CONFIGURED'}  appId=${maskKey(infermedica.appId)}`);
  console.log(`  OpenAI      : ${openai.isReady()       ? '✅ READY' : '⚠  NOT CONFIGURED'}  key=${maskKey(openai.apiKey)}`);
  console.log(`  OpenFDA     : ✅ PUBLIC API (key boosts rate limit)`);
  console.log(`  ExchangeRate: ✅ PUBLIC FREE ENDPOINT`);
  console.log('[E Doctor API] ─────────────────────────────────────────────\n');

  gemini.validate();
  infermedica.validate();
  openai.validate();
}

// ════════════════════════════════════════════════════════════════════════
//  EXPORTS
// ════════════════════════════════════════════════════════════════════════
module.exports = {
  gemini,
  infermedica,
  openai,
  openFda,
  exchangeRate,
  validateAll,
};
