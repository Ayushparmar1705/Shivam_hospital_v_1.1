import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { getReviews } from "./lib/reviews.js";
import { getAllowedOrigins, isOriginAllowed } from "./lib/cors.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET"],
  })
);

app.get("/api/reviews", async (_req, res) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    console.error("Error in /api/reviews:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`Allowed CORS origins: ${getAllowedOrigins().join(", ")}`);
  });
}

export default app;
