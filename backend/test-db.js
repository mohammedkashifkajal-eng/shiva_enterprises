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
  } catch { /* no .env */ }
}
loadEnv(join(__dirname, ".env"));

const { createClient } = await import("@supabase/supabase-js");
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// Test proposals insert
const r1 = await sb.from("proposals")
  .insert({ id: "PRO-TEST-001", contact_name: "Test", contact_email: "t@t.com", status: "pending" })
  .select();
console.log("PROPOSALS insert error:", r1.error?.message ?? "none");
console.log("PROPOSALS insert data:", JSON.stringify(r1.data));

// Test contacts insert
const r2 = await sb.from("contacts")
  .insert({ id: "CON-TEST-001", name: "Test", email: "t@t.com", message: "Hello world test message" })
  .select();
console.log("CONTACTS insert error:", r2.error?.message ?? "none");
console.log("CONTACTS insert data:", JSON.stringify(r2.data));

// Clean up test rows
await sb.from("proposals").delete().eq("id", "PRO-TEST-001");
await sb.from("contacts").delete().eq("id", "CON-TEST-001");
console.log("Cleaned up test rows.");
