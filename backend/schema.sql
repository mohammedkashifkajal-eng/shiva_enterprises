-- ─────────────────────────────────────────────────────────────────────────────
-- Shiva Enterprises — Supabase Database Schema
-- Run once in: Supabase Dashboard → SQL Editor → New query → Run
--
-- SAFE TO RE-RUN:  Every statement uses IF NOT EXISTS / IF EXISTS guards.
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 1. admins ─────────────────────────────────────────────────────────────────
-- Backend-only table (JWT auth).  Passwords stored as bcrypt hashes.
create table if not exists public.admins (
  id            text        primary key default 'ADM-' || extract(epoch from now())::bigint || '-' || substr(md5(random()::text), 1, 6),
  name          text        not null check (char_length(name) >= 2),
  email         text        not null unique,
  password_hash text        not null,
  role          text        not null default 'admin' check (role in ('admin', 'superadmin')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Only the service-role key (server-side) can access this table.
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'admins' and policyname = 'Admins: service role only'
  ) then
    execute $p$
      create policy "Admins: service role only"
        on public.admins
        using (false)
    $p$;
  end if;
end $$;


-- ── 2. franchise_inquiries ────────────────────────────────────────────────────
-- Submitted via POST /api/franchise/inquiry
-- NOTE: existing Supabase table uses text id + submitted_at (not created_at).
create table if not exists public.franchise_inquiries (
  id           text        primary key,          -- set by backend: FRN-{ts}-{rand}
  name         text        not null,
  email        text        not null,
  phone        text        not null,
  city         text        not null,
  state        text        not null,
  investment   text        not null,
  message      text,
  status       text        not null default 'pending'
                 check (status in ('pending', 'contacted', 'qualified', 'signed', 'rejected')),
  notes        text,
  submitted_at timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Backfill columns that may be missing in an older version of the table
alter table public.franchise_inquiries
  add column if not exists notes       text,
  add column if not exists updated_at  timestamptz default now();

alter table public.franchise_inquiries enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'franchise_inquiries' and policyname = 'Franchise: public insert'
  ) then
    execute $p$
      create policy "Franchise: public insert"
        on public.franchise_inquiries
        for insert with check (true)
    $p$;
  end if;
end $$;

create index if not exists idx_franchise_status       on public.franchise_inquiries (status);
create index if not exists idx_franchise_submitted_at on public.franchise_inquiries (submitted_at desc);
create index if not exists idx_franchise_email        on public.franchise_inquiries (email);


-- ── 3. proposals ─────────────────────────────────────────────────────────────
-- Submitted via POST /api/proposals
create table if not exists public.proposals (
  id            text        primary key,          -- set by backend: PRO-{ts}-{rand}
  contact_name  text        not null,
  contact_email text        not null,
  school_name   text,
  bus_estimate  text        check (bus_estimate in ('1-3', '4-10', '11-20', '20+')),
  message       text,
  status        text        not null default 'pending'
                  check (status in ('pending', 'reviewing', 'proposal_sent', 'in_progress', 'completed', 'rejected')),
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.proposals enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'proposals' and policyname = 'Proposals: public insert'
  ) then
    execute $p$
      create policy "Proposals: public insert"
        on public.proposals
        for insert with check (true)
    $p$;
  end if;
end $$;

create index if not exists idx_proposals_status     on public.proposals (status);
create index if not exists idx_proposals_created_at on public.proposals (created_at desc);
create index if not exists idx_proposals_email      on public.proposals (contact_email);


-- ── 4. contacts ──────────────────────────────────────────────────────────────
-- Submitted via POST /api/contacts
create table if not exists public.contacts (
  id         text        primary key,             -- set by backend: CON-{ts}-{rand}
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

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'contacts' and policyname = 'Contacts: public insert'
  ) then
    execute $p$
      create policy "Contacts: public insert"
        on public.contacts
        for insert with check (true)
    $p$;
  end if;
end $$;

create index if not exists idx_contacts_read       on public.contacts (read);
create index if not exists idx_contacts_created_at on public.contacts (created_at desc);


-- ── auto-update updated_at trigger ───────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'trg_admins_updated_at') then
    create trigger trg_admins_updated_at
      before update on public.admins
      for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_franchise_updated_at') then
    create trigger trg_franchise_updated_at
      before update on public.franchise_inquiries
      for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_proposals_updated_at') then
    create trigger trg_proposals_updated_at
      before update on public.proposals
      for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_contacts_updated_at') then
    create trigger trg_contacts_updated_at
      before update on public.contacts
      for each row execute function public.set_updated_at();
  end if;
end $$;
