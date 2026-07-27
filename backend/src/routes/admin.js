/**
 * Admin Routes — /api/admin
 * ──────────────────────────
 * All routes require a valid JWT (requireAuth).
 *
 * GET /api/admin/stats          — aggregate dashboard stats
 * GET /api/admin/activity       — recent activity feed (latest items across all tables)
 */

import { Router } from "express";
import { supabase } from "../supabaseClient.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// All admin routes are protected
router.use(requireAuth);

// ── GET /api/admin/stats ──────────────────────────────────────────────────────
/**
 * Returns aggregate counts and breakdowns for the admin dashboard:
 * - Total franchise inquiries + breakdown by status
 * - Total proposal requests + breakdown by status
 * - Total contact messages + unread count
 * - Quick 7-day submission trend (franchise + proposals combined)
 */
router.get("/stats", async (req, res) => {
  // Run all count queries in parallel for speed
  const [
    franchiseAll,
    franchiseByStatus,
    proposalsAll,
    proposalsByStatus,
    contactsAll,
    contactsUnread,
    recentFranchise,
    recentProposals,
  ] = await Promise.all([
    supabase.from("franchise_inquiries").select("id", { count: "exact", head: true }),
    supabase.from("franchise_inquiries").select("status"),
    supabase.from("proposals").select("id", { count: "exact", head: true }),
    supabase.from("proposals").select("status"),
    supabase.from("contacts").select("id", { count: "exact", head: true }),
    supabase.from("contacts").select("id", { count: "exact", head: true }).eq("read", false),
    // Last 7 days of franchise inquiries
    supabase
      .from("franchise_inquiries")
      .select("submitted_at")
      .gte("submitted_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    // Last 7 days of proposals
    supabase
      .from("proposals")
      .select("created_at")
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  // Aggregate status breakdowns
  function countByStatus(rows) {
    if (!rows) return {};
    return rows.reduce((acc, row) => {
      acc[row.status] = (acc[row.status] || 0) + 1;
      return acc;
    }, {});
  }

  // Build a 7-day trend array: [{ date: "YYYY-MM-DD", count: n }, ...]
  function buildTrend(franchiseRows, proposalRows) {
    const trend = {};
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      trend[d.toISOString().slice(0, 10)] = 0;
    }

    // franchise uses submitted_at, proposals use created_at
    (franchiseRows || []).forEach(({ submitted_at }) => {
      const day = (submitted_at || "").slice(0, 10);
      if (day in trend) trend[day]++;
    });
    (proposalRows || []).forEach(({ created_at }) => {
      const day = (created_at || "").slice(0, 10);
      if (day in trend) trend[day]++;
    });

    return Object.entries(trend).map(([date, count]) => ({ date, count }));
  }

  return res.status(200).json({
    success: true,
    stats: {
      franchise: {
        total: franchiseAll.count ?? 0,
        byStatus: countByStatus(franchiseByStatus.data),
      },
      proposals: {
        total: proposalsAll.count ?? 0,
        byStatus: countByStatus(proposalsByStatus.data),
      },
      contacts: {
        total: contactsAll.count ?? 0,
        unread: contactsUnread.count ?? 0,
      },
      trend7d: buildTrend(recentFranchise.data, recentProposals.data),
    },
  });
});

// ── GET /api/admin/activity ───────────────────────────────────────────────────
/**
 * Returns the 15 most recent submissions across franchise inquiries,
 * proposals, and contact messages — merged into a single activity feed.
 */
router.get("/activity", async (req, res) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 15));

  const [franchiseRes, proposalsRes, contactsRes] = await Promise.all([
    supabase
      .from("franchise_inquiries")
      .select("id, name, email, status, submitted_at")
      .order("submitted_at", { ascending: false })
      .limit(limit),
    supabase
      .from("proposals")
      .select("id, contact_name, contact_email, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("contacts")
      .select("id, name, email, read, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  const franchise = (franchiseRes.data || []).map((r) => ({
    type: "franchise_inquiry",
    id: r.id,
    name: r.name,
    email: r.email,
    status: r.status,
    created_at: r.submitted_at,   // normalise to created_at for the feed
  }));

  const proposals = (proposalsRes.data || []).map((r) => ({
    type: "proposal_request",
    id: r.id,
    name: r.contact_name,
    email: r.contact_email,
    status: r.status,
    created_at: r.created_at,
  }));

  const contacts = (contactsRes.data || []).map((r) => ({
    type: "contact_message",
    id: r.id,
    name: r.name,
    email: r.email,
    status: r.read ? "read" : "unread",
    created_at: r.created_at,
  }));

  // Merge and sort by most recent first, then trim to limit
  const feed = [...franchise, ...proposals, ...contacts]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);

  return res.status(200).json({ success: true, total: feed.length, data: feed });
});

export default router;
