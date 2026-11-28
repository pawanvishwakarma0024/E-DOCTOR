// ════════════════════════════════════════════════════════════════════════
// E Doctor — api/routes/gemini.js
// Google Gemini AI — Symptom Chat Route Handler
// ────────────────────────────────────────────────────────────────────────
// SECURITY:
//   • GEMINI_API_KEY is read from .env server-side only.
//   • The key is NEVER sent to the browser or included in any response.
//   • All Gemini API calls are made from this Node.js backend.
// ════════════════════════════════════════════════════════════════════════

'use strict';

const https = require('https');
const { gemini } = require('../config');

// ── System prompt — defines E Doctor AI's safe, medically-aware persona ──
const SYSTEM_PROMPT = `You are E Doctor AI, a compassionate and careful health information assistant designed for Indian users.

Your role:
- Help users understand their symptoms in plain, simple language (English or Hinglish if needed).
- Provide general health information and preliminary guidance.
- Suggest when to seek medical attention.
- Always recommend consulting a licensed doctor for diagnosis and treatment.

India-specific context:
- Reference India's emergency number 112 when symptoms are severe.
- Mention AYUSH / Ayurveda context where relevant, but do not replace allopathic advice.
- Be aware of common Indian health conditions: dengue, typhoid, malaria, TB, etc.

Strict rules you MUST follow:
1. NEVER diagnose a condition definitively.
2. NEVER prescribe medications or specific dosages.
3. NEVER claim to replace a doctor.
4. ALWAYS include a disclaimer when giving health information.
5. If symptoms sound like a medical emergency (chest pain, difficulty breathing, stroke symptoms, severe bleeding, unconsciousness), immediately tell the user to call 112 or go to the nearest hospital.
6. Keep responses concise, warm, and easy to understand.
7. Format responses in short paragraphs — avoid very long walls of text.
8. End every response with a brief reminder that this is not a substitute for professional medical advice.`;

// ── Make a raw HTTPS POST request to Gemini (no extra dependencies) ──────
function callGeminiAPI(messages) {
  return new Promise((resolve, reject) => {
    const apiKey = gemini.apiKey;
    const model  = gemini.model; // 'gemini-1.5-flash'

    // Build Gemini request body
    // Convert chat history: [{role, text}] → Gemini contents format
    const contents = messages.map(m => ({
      role:  m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const body = JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature:     0.7,
        maxOutputTokens: 500,
        topP:            0.9,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
      ],
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path:     `/v1beta/models/${model}:generateContent?key=${apiKey}`,
      method:   'POST',
      headers: {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode !== 200) {
            return reject(new Error(json?.error?.message || `Gemini HTTP ${res.statusCode}`));
          }
          // Extract text from first candidate
          const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!text) return reject(new Error('Empty response from Gemini'));
          resolve(text.trim());
        } catch (e) {
          reject(new Error('Failed to parse Gemini response'));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error('Gemini request timed out after 15s'));
    });
    req.write(body);
    req.end();
  });
}

// ── Express route handler — exported for use in api/index.js ─────────────
// POST /api/ai/chat
// Body: { messages: [{role: 'user'|'assistant', text: string}] }
// Returns: { reply: string }
async function handleChat(req, res) {
  try {
    if (!gemini.isReady()) {
      return res.status(503).json({
        error: 'Gemini API is not configured. Please add GEMINI_API_KEY to your .env file.',
      });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Request body must include a non-empty messages array.' });
    }

    // Validate message structure
    for (const m of messages) {
      if (!m.role || !m.text || typeof m.text !== 'string') {
        return res.status(400).json({ error: 'Each message must have a role and text string.' });
      }
    }

    // Limit history to last 20 messages to avoid token overflow
    const trimmed = messages.slice(-20);

    const reply = await callGeminiAPI(trimmed);
    return res.json({ reply });

  } catch (err) {
    console.error('[Gemini] Error:', err.message);

    // Surface friendly error without leaking internals
    if (err.message.includes('API key')) {
      return res.status(401).json({ error: 'Invalid Gemini API key. Check your GEMINI_API_KEY in .env.' });
    }
    if (err.message.includes('timed out')) {
      return res.status(504).json({ error: 'Gemini API timed out. Please try again.' });
    }
    return res.status(500).json({ error: 'AI service temporarily unavailable. Please try again shortly.' });
  }
}

module.exports = { handleChat };
