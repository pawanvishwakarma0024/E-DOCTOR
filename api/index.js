// ════════════════════════════════════════════════════════════════════════
// E Doctor — api/index.js
// Backend API Router — Express sub-router
// ────────────────────────────────────────────────────────────────────────
// FUTURE ROUTES (not implemented yet — stubs only):
//   POST /api/ai/chat          → Gemini conversational symptom chat
//   POST /api/ai/symptoms      → Infermedica symptom assessment
//   POST /api/ai/explain       → OpenAI response explanation
//   GET  /api/ai/health        → API health/config status check
// ════════════════════════════════════════════════════════════════════════

'use strict';

const express = require('express');
const router  = express.Router();

// Import centralized API config (credentials, validation)
const apiConfig = require('./config');

// ── Health check — returns which AI services are configured ──────────────
// GET /api/ai/health
// SAFE: returns only boolean ready-state — no keys or credentials exposed
router.get('/ai/health', (req, res) => {
  res.json({
    status: 'ok',
    services: {
      gemini:       apiConfig.gemini.isReady(),
      infermedica:  apiConfig.infermedica.isReady(),
      openai:       apiConfig.openai.isReady(),
      openFda:      apiConfig.openFda.isReady(),
      exchangeRate: apiConfig.exchangeRate.isReady(),
    },
    message: 'E Doctor API — configuration layer active. AI routes coming soon.',
  });
});

// ── Gemini Chat ───────────────────────────────────────────────────────────
// POST /api/ai/chat
// Body: { messages: [{role, text}] }
const { handleChat } = require('./routes/gemini');
router.post('/ai/chat', handleChat);

// ── Infermedica Symptom Assessment (stub — not implemented) ───────────────
// POST /api/ai/symptoms
router.post('/ai/symptoms', (req, res) => {
  if (!apiConfig.infermedica.isReady()) {
    return res.status(503).json({
      error: 'Infermedica API is not configured. Please set INFERMEDICA_APP_ID and INFERMEDICA_APP_KEY in .env',
    });
  }
  // TODO: Implement Infermedica symptom assessment
  res.status(501).json({ error: 'Infermedica symptom route not yet implemented.' });
});

// ── OpenAI Explanation (stub — not implemented) ───────────────────────────
// POST /api/ai/explain
router.post('/ai/explain', (req, res) => {
  if (!apiConfig.openai.isReady()) {
    return res.status(503).json({
      error: 'OpenAI API is not configured. Please set OPENAI_API_KEY in .env',
    });
  }
  // TODO: Implement OpenAI response explanation
  res.status(501).json({ error: 'OpenAI explain route not yet implemented.' });
});

module.exports = router;
