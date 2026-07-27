/**
 * Auth Routes — /api/auth
 * ───────────────────────
 * POST /api/auth/register  — create the first admin (protected by ADMIN_REGISTER_SECRET)
 * POST /api/auth/login     — returns a signed JWT
 * GET  /api/auth/me        — returns current admin profile (requireAuth)
 */

import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ── Helpers ──────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(v) {
  return typeof v === "string" ? v.replace(/<[^>]*>/g, "").trim().slice(0, 300) : "";
}

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

// ── POST /api/auth/register ───────────────────────────────────────────────────
/**
 * Creates the first (or additional) admin account.
 * Requires the ADMIN_REGISTER_SECRET header to prevent open registration.
 *
 * Body: { name, email, password, registerSecret }
 */
router.post("/register", async (req, res) => {
  const { name, email, password, registerSecret } = req.body;

  // Guard: only allow if caller knows the registration secret
  if (
    !process.env.ADMIN_REGISTER_SECRET ||
    registerSecret !== process.env.ADMIN_REGISTER_SECRET
  ) {
    return res.status(403).json({ success: false, error: "Invalid registration secret." });
  }

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email).toLowerCase();

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ success: false, error: "Name must be at least 2 characters." });
  }
  if (!cleanEmail || !EMAIL_RE.test(cleanEmail)) {
    return res.status(400).json({ success: false, error: "A valid email address is required." });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ success: false, error: "Password must be at least 8 characters." });
  }

  // Check for duplicate email
  const { data: existing } = await supabase
    .from("admins")
    .select("id")
    .eq("email", cleanEmail)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ success: false, error: "An admin with this email already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const { data: admin, error } = await supabase
    .from("admins")
    .insert({ name: cleanName, email: cleanEmail, password_hash: passwordHash, role: "admin" })
    .select("id, name, email, role, created_at")
    .single();

  if (error) {
    console.error("[Auth] Register error:", error.message);
    return res.status(500).json({ success: false, error: "Could not create admin account." });
  }

  const token = signToken({ id: admin.id, email: admin.email, role: admin.role });

  return res.status(201).json({ success: true, token, admin });
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
/**
 * Body: { email, password }
 * Returns: { success, token, admin }
 */
router.post("/login", async (req, res) => {
  const email = sanitize(req.body.email).toLowerCase();
  const { password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password are required." });
  }

  const { data: admin, error } = await supabase
    .from("admins")
    .select("id, name, email, role, password_hash")
    .eq("email", email)
    .maybeSingle();

  if (error || !admin) {
    // Use a generic message to avoid user enumeration
    return res.status(401).json({ success: false, error: "Invalid email or password." });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password_hash);
  if (!passwordMatch) {
    return res.status(401).json({ success: false, error: "Invalid email or password." });
  }

  const token = signToken({ id: admin.id, email: admin.email, role: admin.role });

  // Never send the hash back to the client
  const { password_hash: _omit, ...safeAdmin } = admin;

  return res.status(200).json({ success: true, token, admin: safeAdmin });
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
/**
 * Returns the current admin's profile from the database.
 * Requires a valid Bearer token.
 */
router.get("/me", requireAuth, async (req, res) => {
  const { data: admin, error } = await supabase
    .from("admins")
    .select("id, name, email, role, created_at")
    .eq("id", req.admin.id)
    .maybeSingle();

  if (error || !admin) {
    return res.status(404).json({ success: false, error: "Admin account not found." });
  }

  return res.status(200).json({ success: true, admin });
});

export default router;
