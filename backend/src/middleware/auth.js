import jwt from "jsonwebtoken";

/**
 * requireAuth
 * -----------
 * Protects routes by verifying a Bearer JWT in the Authorization header.
 * On success, attaches the decoded payload to `req.admin`.
 *
 * Usage:
 *   router.get("/protected", requireAuth, handler);
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Missing or malformed Authorization header. Expected: Bearer <token>",
    });
  }

  const token = authHeader.slice(7); // strip "Bearer "

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload; // { id, email, role, iat, exp }
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Token has expired. Please log in again."
        : "Invalid token. Authentication failed.";

    return res.status(401).json({ success: false, error: message });
  }
}

/**
 * requireRole
 * -----------
 * Role-based guard — use after requireAuth.
 *
 * Usage:
 *   router.delete("/resource/:id", requireAuth, requireRole("superadmin"), handler);
 *
 * @param {...string} roles - Allowed roles (e.g. "admin", "superadmin")
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, error: "Not authenticated." });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${roles.join(" or ")}.`,
      });
    }

    next();
  };
}
