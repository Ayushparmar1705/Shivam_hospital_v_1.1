import axios from "axios";
import fs from "fs";
import path from "path";

const SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000;

function getReviewsFilePath() {
  if (process.env.REVIEWS_FILE_PATH) {
    return process.env.REVIEWS_FILE_PATH;
  }
  if (process.env.VERCEL) {
    return path.join("/tmp", "reviews.json");
  }
  return path.join(process.cwd(), "reviews.json");
}

export async function fetchReviewsFromSerpApi() {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    console.error("SERPAPI_KEY is not set");
    return [];
  }

  try {
    const url =
      "https://serpapi.com/search.json?engine=google_maps_reviews" +
      "&data_id=0x3958dc870a151ff9:0xef999dd84c53a16c" +
      "&hl=en&sort_by=ratingHigh" +
      `&api_key=${apiKey}`;

    const { data } = await axios.get(url);
    const allReviews = data?.reviews || [];
    const positive = allReviews.filter((r) => r.rating >= 4);
    const selected = positive.slice(0, 6);

    const filePath = getReviewsFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(
      filePath,
      JSON.stringify({ lastUpdated: Date.now(), reviews: selected }, null, 2)
    );

    return selected;
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    return [];
  }
}

export async function getReviews() {
  const filePath = getReviewsFilePath();
  let cachedData = null;

  if (fs.existsSync(filePath)) {
    try {
      cachedData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
      console.error("Error reading cached reviews:", error.message);
    }
  }

  if (cachedData) {
    const expired = Date.now() - cachedData.lastUpdated > SIXTY_DAYS_MS;
    if (!expired) {
      return cachedData.reviews || [];
    }

    // Cached reviews are expired, try fetching fresh ones
    console.log("Cached reviews expired. Attempting to fetch fresh reviews from SerpAPI...");
    const fresh = await fetchReviewsFromSerpApi();
    if (fresh && fresh.length > 0) {
      return fresh;
    }

    // Fresh fetch failed (e.g., no API key, network error, empty results), fall back to expired cache
    console.log("Fresh reviews fetch failed or returned empty. Falling back to expired cached reviews.");
    return cachedData.reviews || [];
  }

  // No cache available, fetch fresh reviews
  return fetchReviewsFromSerpApi();
}
