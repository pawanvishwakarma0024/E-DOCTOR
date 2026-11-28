// ════════════════════════════════════════════════════════════════════════
// E Doctor — api/routes/openai.js
// OpenAI — Route Handler (STUB — not yet implemented)
// ────────────────────────────────────────────────────────────────────────
// This file will contain the backend route logic for OpenAI API calls.
// All requests to OpenAI are made server-side — the API key is NEVER
// sent to the browser.
//
// Environment variable required:
//   OPENAI_API_KEY   — from https://platform.openai.com/api-keys
//
// Future implementation will:
//   1. Receive explanation request from frontend via POST /api/ai/explain
//   2. Call OpenAI API server-side using OPENAI_API_KEY
//   3. Return explanation to frontend (key never leaves server)
// ════════════════════════════════════════════════════════════════════════

'use strict';

const { openai } = require('../config');

// Placeholder — implementation will go here
// Do NOT implement until the AI explanation feature task is started.

module.exports = { openai };
