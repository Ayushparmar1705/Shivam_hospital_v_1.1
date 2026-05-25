export function getAllowedOrigins() {
  const raw =
    process.env.CORS_ORIGIN ||
    "http://localhost:3000,http://127.0.0.1:3000,https://www.shivamchildrenhospital.in,https://shivamchildrenhospital.in"

  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function isOriginAllowed(origin) {
  if (!origin) return true;

  const allowed = getAllowedOrigins();

  return (
    allowed.includes(origin) ||
    allowed.includes("*") ||
    origin.includes("vercel.app")
  );
}

export function applyCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", getAllowedOrigins()[0]);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
