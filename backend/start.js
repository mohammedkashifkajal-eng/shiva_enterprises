#!/usr/bin/env node
/**
 * start.js — bootstrap entry point
 *
 * Loads .env synchronously via dotenv BEFORE any ES module import
 * resolves. This ensures SUPABASE_URL, JWT_SECRET etc. are available
 * when supabaseClient.js and other modules initialise at load time.
 *
 * Usage:
 *   node start.js          (production)
 *   node --watch start.js  (development — auto-restart on file change)
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// ── Parse and inject .env synchronously ──────────────────────────────────────
// We do this manually instead of calling dotenv.config() so we have
// zero reliance on dotenv's own file-resolution logic at module load time.
function loadEnv(envPath) {
  let raw;
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    console.warn(`[start] No .env file found at ${envPath}. Continuing with system environment.`);
    return;
  }

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;          // skip blanks + comments
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;                                  // skip malformed lines
    const key   = trimmed.slice(0, eqIdx).trim();
    let   value = trimmed.slice(eqIdx + 1).trim();
    // Strip surrounding quotes (single or double)
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {                                 // don't override system env
      process.env[key] = value;
    }
  }
}

loadEnv(join(__dirname, ".env"));

// ── Import the server (env vars are now set) ──────────────────────────────────
await import("./server.js");
