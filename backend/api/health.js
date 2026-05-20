import { applyCorsHeaders } from "../lib/cors.js";
import { applySecurityHeaders } from "../lib/securityHeaders.js";

export default function handler(req, res) {
  applySecurityHeaders(res);
  applyCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  return res.status(200).json({ ok: true });
}
