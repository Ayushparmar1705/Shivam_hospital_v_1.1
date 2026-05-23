import axios from "axios";
import fs from "fs";
import path from "path";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 1 day

// Staggered display dates so reviews always look recent
const STAGGERED_DATES = [
  { date: "3 days ago",   daysAgo: 3  },
  { date: "1 week ago",   daysAgo: 7  },
  { date: "2 weeks ago",  daysAgo: 14 },
  { date: "3 weeks ago",  daysAgo: 21 },
  { date: "1 month ago",  daysAgo: 30 },
  { date: "1 month ago",  daysAgo: 35 },
];

// Make reviews appear recent regardless of their real date
function adjustReviewDates(reviews) {
  return reviews.map((review, index) => {
    const stagger = STAGGERED_DATES[index % STAGGERED_DATES.length];
    const newDate = new Date(Date.now() - stagger.daysAgo * 24 * 60 * 60 * 1000);
    return {
      ...review,
      date: stagger.date,
      iso_date: newDate.toISOString(),
    };
  });
}

// Path to the static reviews file
function getReviewsFilePath() {
  return path.join(process.cwd(), "data", "reviews.json");
}

// Load reviews from data/reviews.json
function loadCachedData() {
  const filePath = getReviewsFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (data && Array.isArray(data.reviews)) {
        return data;
      }
    }
  } catch (error) {
    console.error("Error reading reviews file:", error.message);
  }
  return { lastUpdated: 0, reviews: [] };
}

// Save reviews back to data/reviews.json
function saveCachedData(reviews) {
  try {
    const filePath = getReviewsFilePath();
    fs.writeFileSync(
      filePath,
      JSON.stringify({ lastUpdated: Date.now(), reviews }, null, 2)
    );
  } catch (error) {
    console.error("Error writing reviews file:", error.message);
  }
}

// Merge new reviews with existing, avoiding duplicates, max 12
function mergeReviews(newReviews, existingReviews) {
  const seen = new Set();
  const merged = [];

  for (const r of [...newReviews, ...existingReviews]) {
    const key = r.review_id || `${r.user?.name || ""}_${r.snippet || ""}`;
    if (key && !seen.has(key)) {
      seen.add(key);
      merged.push(r);
    }
  }

  return merged.slice(0, 12);
}

// Fetch fresh reviews from SerpAPI (5-star only)
export async function fetchReviewsFromSerpApi() {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    console.error("SERPAPI_KEY is not set");
    return null;
  }

  try {
    console.log("Fetching reviews from SerpAPI...");

    const url =
      "https://serpapi.com/search.json?engine=google_maps_reviews" +
      "&data_id=0x3958dc870a151ff9:0xef999dd84c53a16c" +
      "&hl=en&sort_by=ratingHigh" +
      `&api_key=${apiKey}`;

    const { data } = await axios.get(url);
    const allReviews = data?.reviews || [];

    console.log(`SerpAPI returned ${allReviews.length} total reviews`);

    // Keep only 5-star reviews
    const filtered = allReviews.filter((r) => r.rating === 5);

    console.log(`${filtered.length} five-star reviews found`);

    return filtered;
  } catch (error) {
    console.error("Error fetching from SerpAPI:", error.message);
    return null;
  }
}

// Main: return 6 reviews with adjusted (recent-looking) dates
export async function getReviews() {
  const cachedData = loadCachedData();
  const cacheAge = Date.now() - cachedData.lastUpdated;
  const expired = cacheAge > CACHE_TTL_MS;

  // Serve from cache if still fresh
  if (!expired && cachedData.reviews.length > 0) {
    console.log("Serving from cache");
    return adjustReviewDates(cachedData.reviews.slice(0, 6));
  }

  // Try to fetch fresh reviews from SerpAPI
  const freshReviews = await fetchReviewsFromSerpApi();

  if (freshReviews && freshReviews.length > 0) {
    console.log(`Caching ${freshReviews.length} fresh reviews`);
    const merged = mergeReviews(freshReviews, cachedData.reviews);
    saveCachedData(merged);
    return adjustReviewDates(merged.slice(0, 6));
  }

  // Fallback to static data/reviews.json
  console.log("Falling back to static reviews from data/reviews.json");
  return adjustReviewDates(cachedData.reviews.slice(0, 6));
}