/**
 * Services Routes — /api/services
 * ─────────────────────────────────
 * Public:
 *   GET  /api/services            — list all available services
 *   GET  /api/services/:slug      — get a single service by slug
 *
 * These are served from a static in-memory registry that mirrors
 * the frontend's src/data/services.ts — no database needed.
 * If you later want CMS-editable services, swap the registry for
 * a Supabase query in the handlers below.
 */

import { Router } from "express";

const router = Router();

// ── Service registry ──────────────────────────────────────────────────────────
// Mirrors the slugs, titles, and metadata from the frontend services.ts
const SERVICE_REGISTRY = [
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Digital Experiences That Convert",
    subtitle: "Custom, blazing-fast, and beautifully designed web platforms.",
    category: "digital",
    features: [
      "Custom Design Systems",
      "Lightning Fast Performance",
      "Mobile First Layouts",
      "Modern Stack (React + Vite)",
      "Security Built-In",
      "SEO & Performance Optimisation",
    ],
    ctaLink: "/request-proposal",
    metaTitle: "Web Development — Shiva Enterprises",
    metaDescription: "Custom web development services for schools and transport businesses.",
  },
  {
    slug: "e-commerce-development",
    title: "E-Commerce Development",
    tagline: "Online Stores That Grow With You",
    subtitle: "Scalable online stores with secure payments and inventory management.",
    category: "digital",
    features: [
      "Custom Storefronts",
      "Secure Payments (Razorpay / Stripe)",
      "Inventory Management",
      "Order Fulfillment Automation",
      "Sales Analytics Dashboard",
      "Role-Based Admin Security",
    ],
    ctaLink: "/request-proposal",
    metaTitle: "E-Commerce Development — Shiva Enterprises",
    metaDescription: "E-commerce solutions including storefronts, payments, and inventory.",
  },
  {
    slug: "school-management-system",
    title: "School Management System",
    tagline: "Paperless School Operations",
    subtitle: "All-in-one school administration platform for admissions, fees, grades, and parent communication.",
    category: "education",
    features: [
      "Online Admissions Portal",
      "Digital Gradebook & Report Cards",
      "Fee Management & Receipts",
      "Attendance Tracking",
      "Parent Communication",
      "Analytics Dashboard",
    ],
    ctaLink: "/request-proposal",
    metaTitle: "School Management System — Shiva Enterprises",
    metaDescription: "Comprehensive school management systems for attendance, grades, fees, and administration.",
  },
  {
    slug: "school-bus-tracking-system",
    title: "School Bus Tracking System",
    tagline: "Safety On Every Route",
    subtitle: "Real-time GPS tracking, parent mobile alerts, and live CCTV streaming.",
    category: "transport",
    features: [
      "Real-Time GPS Tracking",
      "Parent Mobile App Alerts",
      "CCTV Live Streaming",
      "Driver Verification",
      "Route Optimisation",
      "Fleet Analytics Dashboard",
    ],
    ctaLink: "/request-proposal",
    metaTitle: "School Bus Tracking System — Shiva Enterprises",
    metaDescription: "Real-time school bus tracking with parent notifications, CCTV, and driver safety.",
  },
  {
    slug: "college-management-system",
    title: "College Management System",
    tagline: "Campus-Wide Digital Control",
    subtitle: "Comprehensive higher-education platform for admissions, exams, placements, and campus operations.",
    category: "education",
    features: [
      "Modular Admissions Portal",
      "Exam Management & Timetables",
      "Academic Calendar",
      "Hostel & Campus Management",
      "Library System",
      "Faculty Portal",
    ],
    ctaLink: "/request-proposal",
    metaTitle: "College Management System — Shiva Enterprises",
    metaDescription: "Management systems for colleges: admissions, exams, and campus operations.",
  },
];

// ── GET /api/services ─────────────────────────────────────────────────────────
router.get("/", (req, res) => {
  const { category } = req.query;

  const list = category
    ? SERVICE_REGISTRY.filter((s) => s.category === category)
    : SERVICE_REGISTRY;

  return res.status(200).json({
    success: true,
    total: list.length,
    data: list,
  });
});

// ── GET /api/services/:slug ───────────────────────────────────────────────────
router.get("/:slug", (req, res) => {
  const service = SERVICE_REGISTRY.find((s) => s.slug === req.params.slug);

  if (!service) {
    return res.status(404).json({ success: false, error: "Service not found." });
  }

  return res.status(200).json({ success: true, data: service });
});

export default router;
