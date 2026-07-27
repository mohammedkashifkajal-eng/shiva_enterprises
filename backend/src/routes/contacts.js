/**
 * Contact Routes — /api/contacts
 * ────────────────────────────────
 * Public:
 *   POST /api/contacts                  — submit a contact message
 *
 * Admin (requireAuth):
 *   GET  /api/contacts                  — list all messages (paginated)
 *   GET  /api/contacts/:id              — get a single message
 *   PATCH /api/contacts/:id             — mark as read / add notes
 *   DELETE /api/contacts/:id            — delete a message
 */

import { Router } from "express";
import { supabase } from "../supabaseClient.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ── Helpers ──────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

function sanitize(v, maxLen = 500) {
  return typeof v === "string" ? v.replace(/<[^>]*>/g, "").trim().slice(0, maxLen) : "";
}

/** Generate a prefixed text ID */
function generateId(prefix = "CON") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function validateContact(body) {
  const errors = [];

  const name = sanitize(body.name);
  const email = sanitize(body.email).toLowerCase();
  const phone = sanitize(body.phone, 30);
  const subject = sanitize(body.subject, 200);
  const message = sanitize(body.message, 2000);

  if (!name || name.length < 2) errors.push("Name is required (min 2 characters).");
  if (!email || !EMAIL_RE.test(email)) errors.push("A valid email address is required.");
  if (phone && !PHONE_RE.test(phone)) errors.push("Phone number format is invalid.");
  if (!message || message.length < 10) errors.push("Message is required (min 10 characters).");

  return {
    errors,
    data: {
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    },
  };
}

// ── POST /api/contacts ────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { errors, data } = validateContact(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const id = generateId("CON");

  const { data: contact, error } = await supabase
    .from("contacts")
    .insert({ id, ...data, read: false })
    .select("id, name, email, created_at")
    .single();

  if (error) {
    console.error("[Contacts] Insert error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to send message. Please try again." });
  }

  console.log(`[Contacts] New message: ${contact.id} — ${data.name} (${data.email})`);

  return res.status(201).json({
    success: true,
    message: "Thank you for reaching out! We typically reply within 24 hours.",
    id: contact.id,
  });
});

// ── GET /api/contacts ─────────────────────────────────────────────────────────
router.get("/", requireAuth, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const offset = (page - 1) * limit;
  const unreadOnly = req.query.unread === "true";

  let query = supabase
    .from("contacts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (unreadOnly) {
    query = query.eq("read", false);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("[Contacts] List error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to fetch contacts." });
  }

  return res.status(200).json({ success: true, total: count, page, limit, data });
});

// ── GET /api/contacts/:id ─────────────────────────────────────────────────────
router.get("/:id", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", req.params.id)
    .maybeSingle();

  if (error) {
    console.error("[Contacts] Get error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to fetch contact message." });
  }
  if (!data) {
    return res.status(404).json({ success: false, error: "Contact message not found." });
  }

  // Auto-mark as read when fetched
  if (!data.read) {
    await supabase
      .from("contacts")
      .update({ read: true })
      .eq("id", req.params.id);
  }

  return res.status(200).json({ success: true, data: { ...data, read: true } });
});

// ── PATCH /api/contacts/:id ───────────────────────────────────────────────────
router.patch("/:id", requireAuth, async (req, res) => {
  const { read, notes } = req.body;

  const updates = {};
  if (typeof read === "boolean") updates.read = read;
  if (notes !== undefined) updates.notes = sanitize(notes, 2000);

  const { data, error } = await supabase
    .from("contacts")
    .update(updates)
    .eq("id", req.params.id)
    .select("id, name, email, read")
    .maybeSingle();

  if (error) {
    console.error("[Contacts] Update error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to update contact." });
  }
  if (!data) {
    return res.status(404).json({ success: false, error: "Contact message not found." });
  }

  return res.status(200).json({ success: true, data });
});

// ── DELETE /api/contacts/:id ──────────────────────────────────────────────────
router.delete("/:id", requireAuth, async (req, res) => {
  const { error, count } = await supabase
    .from("contacts")
    .delete({ count: "exact" })
    .eq("id", req.params.id);

  if (error) {
    console.error("[Contacts] Delete error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to delete contact message." });
  }
  if (count === 0) {
    return res.status(404).json({ success: false, error: "Contact message not found." });
  }

  return res.status(200).json({ success: true, message: "Contact message deleted successfully." });
});

export default router;
