import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { applySecurityHeaders } from "./lib/securityHeaders.js";
import { applyCorsHeaders } from "./lib/cors.js";
import fredReviewsHandler from "./api/fred-reviews.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(cors());
app.use(express.json());

// Apply security and CORS headers for every request
app.use((req, res, next) => {
  applySecurityHeaders(res);
  applyCorsHeaders(req, res);
  next();
});

// Only expose the FRED reviews endpoint
app.get("/api/fred-reviews", fredReviewsHandler);

// Health check (optional but harmless)
app.get("/api/health", (req, res) => {
  return res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Shivam Hospital Backend Dev Server running on port ${PORT}`);
});
