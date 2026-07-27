/**
 * Franchise Routes — /api/franchise
 * ───────────────────────────────────
 * Public:
 *   POST /api/franchise/inquiry          — submit a franchise inquiry
 *
 * Admin (requireAuth):
 *   GET  /api/franchise/inquiries        — list all inquiries (paginated)
 *   GET  /api/franchise/inquiries/:id    — get a single inquiry
 *   PATCH /api/franchise/inquiries/:id   — update inquiry status
 *   DELETE /api/franchise/inquiries/:id  — delete an inquiry
 */

import { Router } from "express";
import { supabase } from "../supabaseClient.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ── Helpers ──────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

const VALID_STATUSES = ["pending", "contacted", "qualified", "signed", "rejected"];

function sanitize(v, maxLen = 500) {
  return typeof v === "string" ? v.replace(/<[^>]*>/g, "").trim().slice(0, maxLen) : "";
}

/** Generate a prefixed text ID matching the existing Supabase table format */
function generateId(prefix = "FRN") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function validateInquiry(body) {
  const errors = [];

  const name = sanitize(body.name);
  const email = sanitize(body.email).toLowerCase();
  const phone = sanitize(body.phone);
  const city = sanitize(body.city, 100);
  const state = sanitize(body.state, 100);
  const investment = sanitize(body.investment, 100);
  const message = sanitize(body.message, 1000);

  if (!name || name.length < 2) errors.push("Full name is required (min 2 characters).");
  if (!email || !EMAIL_RE.test(email)) errors.push("A valid email address is required.");
  if (!phone || !PHONE_RE.test(phone)) errors.push("A valid phone number is required.");
  if (!city || city.length < 2) errors.push("City is required.");
  if (!state || state.length < 2) errors.push("State is required.");
  if (!investment) errors.push("Preferred investment range is required.");

  return { errors, data: { name, email, phone, city, state, investment, message } };
}

// ── POST /api/franchise/inquiry ───────────────────────────────────────────────
router.post("/inquiry", async (req, res) => {
  const { errors, data } = validateInquiry(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const id = generateId("FRN");

  const { data: inquiry, error } = await supabase
    .from("franchise_inquiries")
    .insert({ id, ...data, status: "pending" })
    .select("id, name, email, status, submitted_at")
    .single();

  if (error) {
    console.error("[Franchise] Insert error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to save inquiry. Please try again." });
  }

  console.log(`[Franchise] New inquiry: ${inquiry.id} — ${data.name} (${data.email})`);

  return res.status(201).json({
    success: true,
    message: "Your franchise inquiry has been received! Our team will contact you within 24–48 hours.",
    id: inquiry.id,
  });
});

// ── GET /api/franchise/inquiries ──────────────────────────────────────────────
router.get("/inquiries", requireAuth, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const offset = (page - 1) * limit;
  const status = req.query.status;

  let query = supabase
    .from("franchise_inquiries")
    .select("*", { count: "exact" })
    .order("submitted_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status && VALID_STATUSES.includes(status)) {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("[Franchise] List error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to fetch inquiries." });
  }

  return res.status(200).json({ success: true, total: count, page, limit, data });
});

// ── GET /api/franchise/inquiries/:id ─────────────────────────────────────────
router.get("/inquiries/:id", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("franchise_inquiries")
    .select("*")
    .eq("id", req.params.id)
    .maybeSingle();

  if (error) {
    console.error("[Franchise] Get error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to fetch inquiry." });
  }
  if (!data) {
    return res.status(404).json({ success: false, error: "Inquiry not found." });
  }

  return res.status(200).json({ success: true, data });
});

// ── PATCH /api/franchise/inquiries/:id ───────────────────────────────────────
router.patch("/inquiries/:id", requireAuth, async (req, res) => {
  const { status, notes } = req.body;

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}.`,
    });
  }

  const updates = {};
  if (status) updates.status = status;
  if (notes !== undefined) updates.notes = sanitize(notes, 2000);

  const { data, error } = await supabase
    .from("franchise_inquiries")
    .update(updates)
    .eq("id", req.params.id)
    .select("id, name, email, status, submitted_at")
    .maybeSingle();

  if (error) {
    console.error("[Franchise] Update error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to update inquiry." });
  }
  if (!data) {
    return res.status(404).json({ success: false, error: "Inquiry not found." });
  }

  return res.status(200).json({ success: true, data });
});

// ── DELETE /api/franchise/inquiries/:id ──────────────────────────────────────
router.delete("/inquiries/:id", requireAuth, async (req, res) => {
  const { error, count } = await supabase
    .from("franchise_inquiries")
    .delete({ count: "exact" })
    .eq("id", req.params.id);

  if (error) {
    console.error("[Franchise] Delete error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to delete inquiry." });
  }
  if (count === 0) {
    return res.status(404).json({ success: false, error: "Inquiry not found." });
  }

  return res.status(200).json({ success: true, message: "Inquiry deleted successfully." });
});

export default router;
