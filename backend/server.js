import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import reviewsHandler from "./api/reviews.js";
import fredReviewsHandler from "./api/fred-reviews.js";
import healthHandler from "./api/health.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount the serverless handlers directly
app.get("/api/reviews", reviewsHandler);
app.get("/api/fred-reviews", fredReviewsHandler);
app.get("/api/health", healthHandler);

app.listen(PORT, () => {
  console.log(`Shivam Hospital Backend Dev Server running on port ${PORT}`);
});
