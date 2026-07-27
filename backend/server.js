/**
 * Shiva Enterprises — Express API Server
 * ────────────────────────────────────────
 * Mounts all route modules and applies global middleware.
 *
 * Start (production):  node server.js
 * Start (development): node --watch server.js
 */

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRoutes from "./src/routes/auth.js";
import franchiseRoutes from "./src/routes/franchise.js";
import proposalRoutes from "./src/routes/proposals.js";
import contactRoutes from "./src/routes/contacts.js";
import serviceRoutes from "./src/routes/services.js";
import adminRoutes from "./src/routes/admin.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://192.168.43.71:3000",   // local network (phone/tablet access)
  process.env.APP_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server requests (no origin) and listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' is not allowed.`));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// ── Global rate limiter ───────────────────────────────────────────────────────
// Applies to every request; tighter limits can be added per-route.
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please try again later." },
});
app.use(globalLimiter);

// Stricter limiter for public form submissions (franchise, proposals, contacts)
const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many submissions from this IP. Please try again later." },
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// ── Route mounting ────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/franchise", submissionLimiter, franchiseRoutes);
app.use("/api/proposals", submissionLimiter, proposalRoutes);
app.use("/api/contacts", submissionLimiter, contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found." });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("[Server Error]", err.message);

  // Mask internal details from clients in production
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred."
      : err.message;

  res.status(err.status || 500).json({ success: false, error: message });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  Shiva Enterprises API running on http://localhost:${PORT}`);
  console.log(`   Environment : ${process.env.NODE_ENV || "development"}`);
  console.log(`   Allowed origins: ${allowedOrigins.join(", ")}\n`);
  console.log("   Endpoints:");
  console.log("     GET  /api/health");
  console.log("     POST /api/auth/register");
  console.log("     POST /api/auth/login");
  console.log("     GET  /api/auth/me");
  console.log("     POST /api/franchise/inquiry");
  console.log("     GET  /api/franchise/inquiries          (auth)");
  console.log("     GET  /api/franchise/inquiries/:id      (auth)");
  console.log("     PATCH /api/franchise/inquiries/:id     (auth)");
  console.log("     DELETE /api/franchise/inquiries/:id    (auth)");
  console.log("     POST /api/proposals");
  console.log("     GET  /api/proposals                    (auth)");
  console.log("     GET  /api/proposals/:id                (auth)");
  console.log("     PATCH /api/proposals/:id               (auth)");
  console.log("     DELETE /api/proposals/:id              (auth)");
  console.log("     POST /api/contacts");
  console.log("     GET  /api/contacts                     (auth)");
  console.log("     GET  /api/contacts/:id                 (auth)");
  console.log("     PATCH /api/contacts/:id                (auth)");
  console.log("     DELETE /api/contacts/:id               (auth)");
  console.log("     GET  /api/services");
  console.log("     GET  /api/services/:slug");
  console.log("     GET  /api/admin/stats                  (auth)");
  console.log("     GET  /api/admin/activity               (auth)\n");
});
