import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for dev (Vite on port 3000 calls the API on port 5000)
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    process.env.APP_URL,
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// ─── Helpers ───────────────────────────────────────────────────────────────────
const DB_PATH = path.join(__dirname, "data", "franchise_inquiries.json");

/** Ensure the data directory and file exist */
function ensureDB() {
  const dir = path.join(__dirname, "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, "[]", "utf8");
}

function readInquiries() {
  ensureDB();
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  } catch {
    return [];
  }
}

function writeInquiries(data) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

/** Simple input sanitiser — strips HTML-like tags */
function sanitize(value) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim().slice(0, 500);
}

// ─── Validation ────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

function validateInquiry(body) {
  const errors = [];

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  const city = sanitize(body.city);
  const state = sanitize(body.state);
  const investment = sanitize(body.investment);
  const message = sanitize(body.message);

  if (!name || name.length < 2) errors.push("Full name is required (min 2 characters).");
  if (!email || !EMAIL_RE.test(email)) errors.push("A valid email address is required.");
  if (!phone || !PHONE_RE.test(phone)) errors.push("A valid phone number is required.");
  if (!city || city.length < 2) errors.push("City is required.");
  if (!state || state.length < 2) errors.push("State is required.");
  if (!investment) errors.push("Preferred investment range is required.");

  return {
    errors,
    data: { name, email, phone, city, state, investment, message },
  };
}

// ─── API Routes ───────────────────────────────────────────────────────────────

/**
 * POST /api/franchise/inquiry
 * Submit a new franchise inquiry.
 */
app.post("/api/franchise/inquiry", (req, res) => {
  const { errors, data } = validateInquiry(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const inquiry = {
    id: `FRN-${Date.now()}`,
    ...data,
    status: "pending",
    submittedAt: new Date().toISOString(),
  };

  const inquiries = readInquiries();
  inquiries.push(inquiry);
  writeInquiries(inquiries);

  console.log(`[Franchise Inquiry] New inquiry received: ${inquiry.id} from ${data.name} (${data.email})`);

  return res.status(201).json({
    success: true,
    message: "Your franchise inquiry has been received! Our team will contact you within 24–48 hours.",
    id: inquiry.id,
  });
});

/**
 * GET /api/franchise/inquiries
 * List all franchise inquiries (admin use).
 * In production, protect this with auth middleware.
 */
app.get("/api/franchise/inquiries", (req, res) => {
  const inquiries = readInquiries();
  return res.json({ success: true, count: inquiries.length, data: inquiries });
});

/**
 * GET /api/franchise/stats
 * Returns aggregate stats for the admin dashboard.
 */
app.get("/api/franchise/stats", (req, res) => {
  const inquiries = readInquiries();

  const byStatus = inquiries.reduce((acc, i) => {
    acc[i.status] = (acc[i.status] || 0) + 1;
    return acc;
  }, {});

  const byState = inquiries.reduce((acc, i) => {
    if (i.state) acc[i.state] = (acc[i.state] || 0) + 1;
    return acc;
  }, {});

  return res.json({
    success: true,
    total: inquiries.length,
    byStatus,
    byState,
  });
});

// ─── Serve Vite build in production ───────────────────────────────────────────
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Shiva Enterprises API running on http://localhost:${PORT}`);
  console.log(`   Franchise inquiry endpoint: POST /api/franchise/inquiry`);
});
