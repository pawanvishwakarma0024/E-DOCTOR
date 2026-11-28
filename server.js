// ════════════════════════════════════════════════════════════════════════
// E Doctor — server.js
// Express HTTP Server
// ────────────────────────────────────────────────────────────────────────
// Serves the static frontend from /website  AND
// exposes a secure /api backend for AI integrations.
//
// API credentials are read from .env — NEVER from client-side code.
// ════════════════════════════════════════════════════════════════════════

'use strict';

// Load environment variables from .env FIRST (before any other require)
require('dotenv').config();

const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────
app.use(express.json());                          // parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // parse form bodies

// ── CORS headers (development only) ─────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ── Backend API routes (/api/*) ───────────────────────────────────────────
// All AI API calls are handled here — credentials stay server-side only.
const apiRouter = require('./api/index');
app.use('/api', apiRouter);

// ── Serve the static frontend from /website ───────────────────────────────
// Preserves the exact same behaviour as the original server.js.
const WEBSITE_ROOT = path.join(__dirname, 'website');
app.use(express.static(WEBSITE_ROOT));

// SPA fallback — serve index.html for any unknown path so deep links work
app.get('*', (req, res) => {
  res.sendFile(path.join(WEBSITE_ROOT, 'index.html'));
});

// ── Start server ──────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n[E Doctor] Server listening on http://localhost:${PORT}`);

  // Print API configuration status at startup (safe — keys are masked)
  try {
    const { validateAll } = require('./api/config');
    validateAll();
  } catch (e) {
    console.warn('[E Doctor] Could not load API config:', e.message);
  }
});
