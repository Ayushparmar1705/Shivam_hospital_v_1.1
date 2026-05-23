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

const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "reviews.json"
    );

    console.log("FILE PATH:", filePath);

    const fileData = fs.readFileSync(filePath, "utf8");

    const jsonData = JSON.parse(fileData);

    return res.status(200).json(jsonData);
  } catch (error) {
    console.log("ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};