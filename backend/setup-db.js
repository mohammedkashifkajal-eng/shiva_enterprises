#!/usr/bin/env node
/**
 * setup-db.js — Creates missing Supabase tables via the pg connection
 * Uses Supabase's built-in postgres REST endpoint (available on all plans).
 *
 * Run once from the backend/ folder:
 *   node setup-db.js
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ── Load .env ─────────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
function loadEnv(p) {
  try {
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const key = t.slice(0, eq).trim();
      let val = t.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1);
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch { /* no .env */ }
}
loadEnv(join(__dirname, ".env"));

const { createClient } = await import("@supabase/supabase-js");
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ── Check which tables exist ───────────────────────────────────────────────────
async function tableExists(name) {
  const { data, error } = await sb.from(name).select("*").limit(0);
  return !error || !error.message.includes("does not exist");
}

console.log("\n🔧  Checking Supabase tables...\n");

const proposalsExists  = await tableExists("proposals");
const contactsExists   = await tableExists("contacts");
const adminsExists     = await tableExists("admins");

console.log(`  proposals : ${proposalsExists  ? "✅ exists" : "❌ missing"}`);
console.log(`  contacts  : ${contactsExists   ? "✅ exists" : "❌ missing"}`);
console.log(`  admins    : ${adminsExists      ? "✅ exists" : "❌ missing"}`);

if (proposalsExists && contactsExists && adminsExists) {
  console.log("\n✅  All tables exist — nothing to do.\n");
  process.exit(0);
}

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Some tables are MISSING from your Supabase project.
  Please run the SQL below in the Supabase SQL Editor:
  
  1. Go to https://supabase.com/dashboard
  2. Open your project
  3. Click SQL Editor → New query
  4. Paste the SQL below and click Run
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

if (!proposalsExists) {
  console.log("-- ── PROPOSALS TABLE ──────────────────────────────────");
  console.log(`create table if not exists public.proposals (
  id            text        primary key,
  contact_name  text        not null,
  contact_email text        not null,
  school_name   text,
  bus_estimate  text        check (bus_estimate in ('1-3','4-10','11-20','20+')),
  message       text,
  status        text        not null default 'pending'
                  check (status in ('pending','reviewing','proposal_sent','in_progress','completed','rejected')),
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table public.proposals enable row level security;
create policy "Proposals: public insert" on public.proposals for insert with check (true);
create index if not exists idx_proposals_status     on public.proposals (status);
create index if not exists idx_proposals_created_at on public.proposals (created_at desc);
`);
}

if (!contactsExists) {
  console.log("-- ── CONTACTS TABLE ────────────────────────────────────");
  console.log(`create table if not exists public.contacts (
  id         text        primary key,
  name       text        not null,
  email      text        not null,
  phone      text,
  subject    text,
  message    text        not null,
  read       boolean     not null default false,
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.contacts enable row level security;
create policy "Contacts: public insert" on public.contacts for insert with check (true);
create index if not exists idx_contacts_read       on public.contacts (read);
create index if not exists idx_contacts_created_at on public.contacts (created_at desc);
`);
}

if (!adminsExists) {
  console.log("-- ── ADMINS TABLE ──────────────────────────────────────");
  console.log(`create table if not exists public.admins (
  id            text        primary key,
  name          text        not null,
  email         text        not null unique,
  password_hash text        not null,
  role          text        not null default 'admin' check (role in ('admin','superadmin')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table public.admins enable row level security;
create policy "Admins: service role only" on public.admins using (false);
`);
}

console.log(`-- ── updated_at trigger (run once for all tables) ──────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname='trg_proposals_updated_at') then
    create trigger trg_proposals_updated_at before update on public.proposals for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname='trg_contacts_updated_at') then
    create trigger trg_contacts_updated_at before update on public.contacts for each row execute function public.set_updated_at();
  end if;
end $$;
`);

process.exit(1);
