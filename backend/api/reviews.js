// import { getReviews } from "../lib/reviews.js";
// import { applyCorsHeaders, isOriginAllowed } from "../lib/cors.js";
// import { applySecurityHeaders } from "../lib/securityHeaders.js";

// export default async function handler(req, res) {
//   applySecurityHeaders(res);
//   applyCorsHeaders(req, res);

//   if (req.method === "OPTIONS") {
//     return res.status(204).end();
//   }

//   if (req.method !== "GET") {
//     res.setHeader("Allow", "GET, OPTIONS");
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const origin = req.headers.origin;
//   if (origin && !isOriginAllowed(origin)) {
//     return res.status(403).json({ error: "Origin not allowed" });
//   }

//   try {
//     const reviews = await getReviews();
//     return res.status(200).json(reviews);
//   } catch (error) {
//     console.error("Error in /api/reviews:", error.message);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Correct absolute path
    const filePath = path.join(process.cwd(), "reviews.json");

    // Read file
    const jsonData = fs.readFileSync(filePath, "utf-8");

    // Convert to object
    const data = JSON.parse(jsonData);

    // Send response
    res.status(200).json(data.reviews || []);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
}