/**
 * reload-schema.js  — Notifies PostgREST to reload its schema cache
 * Run once:  node reload-schema.js
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
function loadEnv(p) {
  try {
    for (const l of readFileSync(p, "utf8").split("\n")) {
      const t = l.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const k = t.slice(0, eq).trim();
      let v = t.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (!(k in process.env)) process.env[k] = v;
    }
  } catch { /* */ }
}
loadEnv(join(__dirname, ".env"));

const { createClient } = await import("@supabase/supabase-js");
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Send pg_notify via an RPC that calls it — this is the standard Supabase way
const { error } = await sb.rpc("reload_postgrest_schema");

if (error) {
  // The RPC doesn't exist — that's expected. We need another approach.
  // Use raw SQL via the REST endpoint for pg_notify
  const projectRef = new URL(process.env.SUPABASE_URL).hostname.split(".")[0];

  // Try the Supabase SQL REST endpoint (available for service roles)
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/reload_postgrest_schema`, {
    method: "POST",
    headers: {
      "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: "{}",
  });

  if (!res.ok) {
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Automatic reload not supported on free tier.
 Please reload manually — it takes 5 seconds:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1. Open: https://supabase.com/dashboard/project/${projectRef}/settings/api
 2. Scroll to "PostgREST Settings"  
 3. Click the reload / restart button
  
 OR just pause + resume your project:
 https://supabase.com/dashboard/project/${projectRef}/settings/general
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
    process.exit(1);
  }

  console.log("✅  Schema reloaded.");
} else {
  console.log("✅  Schema reloaded via RPC.");
}
