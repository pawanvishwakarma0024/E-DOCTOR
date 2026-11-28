// ════════════════════════════════════════════════════════════════════════
// E Doctor — api/routes/infermedica.js
// Infermedica Symptom Assessment — Route Handler (STUB — not yet implemented)
// ────────────────────────────────────────────────────────────────────────
// This file will contain the backend route logic for Infermedica API calls.
// All requests to Infermedica are made server-side — credentials are NEVER
// sent to the browser.
//
// Environment variables required:
//   INFERMEDICA_APP_ID   — from https://developer.infermedica.com/
//   INFERMEDICA_APP_KEY  — from https://developer.infermedica.com/
//
// Future implementation will:
//   1. Receive symptom data from frontend via POST /api/ai/symptoms
//   2. Call Infermedica API server-side with App-Id and App-Key headers
//   3. Return triage/assessment results to frontend (keys never leave server)
// ════════════════════════════════════════════════════════════════════════

'use strict';

const { infermedica } = require('../config');

// Placeholder — implementation will go here
// Do NOT implement until the AI symptom checker feature task is started.

module.exports = { infermedica };
