/**
 * Proposal Routes — /api/proposals
 * ──────────────────────────────────
 * Public:
 *   POST /api/proposals                 — submit a proposal request
 *
 * Admin (requireAuth):
 *   GET  /api/proposals                 — list all proposals (paginated, filterable)
 *   GET  /api/proposals/:id             — get a single proposal
 *   PATCH /api/proposals/:id            — update status / add admin notes
 *   DELETE /api/proposals/:id           — delete a proposal
 */

import { Router } from "express";
import { supabase } from "../supabaseClient.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ── Helpers ──────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_STATUSES = ["pending", "reviewing", "proposal_sent", "in_progress", "completed", "rejected"];
const BUS_ESTIMATES = ["1-3", "4-10", "11-20", "20+"];

function sanitize(v, maxLen = 500) {
  return typeof v === "string" ? v.replace(/<[^>]*>/g, "").trim().slice(0, maxLen) : "";
}

/** Generate a prefixed text ID */
function generateId(prefix = "PRO") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function validateProposal(body) {
  const errors = [];

  // Accept both camelCase (from frontend) and snake_case field names
  const contactName = sanitize(body.contactName || body.contact_name || body.name);
  const contactEmail = sanitize(body.contactEmail || body.contact_email || body.email).toLowerCase();
  const schoolName = sanitize(body.schoolName || body.school_name || body.organization);
  const busEstimate = sanitize(body.busEstimate || body.bus_estimate, 20);
  const message = sanitize(body.message, 2000);

  if (!contactName || contactName.length < 2) {
    errors.push("Contact name is required (min 2 characters).");
  }
  if (!contactEmail || !EMAIL_RE.test(contactEmail)) {
    errors.push("A valid email address is required.");
  }

  return {
    errors,
    data: {
      contact_name: contactName,
      contact_email: contactEmail,
      school_name: schoolName || null,
      bus_estimate: BUS_ESTIMATES.includes(busEstimate) ? busEstimate : null,
      message: message || null,
    },
  };
}

// ── POST /api/proposals ───────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { errors, data } = validateProposal(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const id = generateId("PRO");

  const { data: proposal, error } = await supabase
    .from("proposals")
    .insert({ id, ...data, status: "pending" })
    .select("id, contact_name, contact_email, status, created_at")
    .single();

  if (error) {
    console.error("[Proposals] Insert error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to save proposal request. Please try again." });
  }

  console.log(`[Proposals] New request: ${proposal.id} — ${data.contact_name} (${data.contact_email})`);

  return res.status(201).json({
    success: true,
    message: "Your proposal request has been received. We will be in touch within 24 hours.",
    id: proposal.id,
  });
});

// ── GET /api/proposals ────────────────────────────────────────────────────────
router.get("/", requireAuth, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const offset = (page - 1) * limit;
  const status = req.query.status;

  let query = supabase
    .from("proposals")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status && VALID_STATUSES.includes(status)) {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("[Proposals] List error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to fetch proposals." });
  }

  return res.status(200).json({ success: true, total: count, page, limit, data });
});

// ── GET /api/proposals/:id ────────────────────────────────────────────────────
router.get("/:id", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", req.params.id)
    .maybeSingle();

  if (error) {
    console.error("[Proposals] Get error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to fetch proposal." });
  }
  if (!data) {
    return res.status(404).json({ success: false, error: "Proposal not found." });
  }

  return res.status(200).json({ success: true, data });
});

// ── PATCH /api/proposals/:id ──────────────────────────────────────────────────
router.patch("/:id", requireAuth, async (req, res) => {
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
    .from("proposals")
    .update(updates)
    .eq("id", req.params.id)
    .select("id, contact_name, contact_email, status, created_at")
    .maybeSingle();

  if (error) {
    console.error("[Proposals] Update error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to update proposal." });
  }
  if (!data) {
    return res.status(404).json({ success: false, error: "Proposal not found." });
  }

  return res.status(200).json({ success: true, data });
});

// ── DELETE /api/proposals/:id ─────────────────────────────────────────────────
router.delete("/:id", requireAuth, async (req, res) => {
  const { error, count } = await supabase
    .from("proposals")
    .delete({ count: "exact" })
    .eq("id", req.params.id);

  if (error) {
    console.error("[Proposals] Delete error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to delete proposal." });
  }
  if (count === 0) {
    return res.status(404).json({ success: false, error: "Proposal not found." });
  }

  return res.status(200).json({ success: true, message: "Proposal deleted successfully." });
});

export default router;
