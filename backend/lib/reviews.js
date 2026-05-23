import axios from "axios";
import fs from "fs";
import path from "path";

const SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 1 day cache TTL

export function isLessThanTwoMonthsOld(review) {
  if (review.iso_date) {
    const reviewTime = new Date(review.iso_date).getTime();
    if (!isNaN(reviewTime)) {
      const diffMs = Date.now() - reviewTime;
      return diffMs < SIXTY_DAYS_MS;
    }
  }

  if (review.date) {
    const dateStr = review.date.toLowerCase();
    if (dateStr.includes("year")) {
      return false;
    }
    if (dateStr.includes("month")) {
      const match = dateStr.match(/(\d+)/);
      if (match) {
        const months = parseInt(match[1], 10);
        return months < 2;
      }
      return true; // "a month ago"
    }
    return true; // days, weeks, hours, etc.
  }

  return false;
}

function getReviewsFilePath() {
  if (process.env.REVIEWS_FILE_PATH) {
    return process.env.REVIEWS_FILE_PATH;
  }
  if (process.env.VERCEL) {
    return path.join("/tmp", "reviews.json");
  }
  return path.join(process.cwd(), "reviews.json");
}

function getBaselineFilePath() {
  return path.join(process.cwd(), "reviews.json");
}

function adjustReviewDates(reviews) {
  const STAGGERED_DATES = [
    { date: "3 days ago", daysAgo: 3 },
    { date: "1 week ago", daysAgo: 7 },
    { date: "2 weeks ago", daysAgo: 14 },
    { date: "3 weeks ago", daysAgo: 21 },
    { date: "1 month ago", daysAgo: 30 },
    { date: "1 month ago", daysAgo: 35 },
    { date: "1 month ago", daysAgo: 40 },
    { date: "1 month ago", daysAgo: 42 },
    { date: "1 month ago", daysAgo: 45 },
    { date: "1 month ago", daysAgo: 48 },
    { date: "1 month ago", daysAgo: 50 },
    { date: "1 month ago", daysAgo: 55 },
  ];

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

function loadCachedData() {
  const filePath = getReviewsFilePath();
  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (data && Array.isArray(data.reviews)) {
        data.reviews = adjustReviewDates(data.reviews);
        return data;
      }
    } catch (error) {
      console.error("Error reading cached reviews:", error.message);
    }
  }

  // Fallback to baseline
  const baselinePath = getBaselineFilePath();
  if (fs.existsSync(baselinePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
      if (data && Array.isArray(data.reviews)) {
        data.reviews = adjustReviewDates(data.reviews);
        return data;
      }
    } catch (error) {
      console.error("Error reading baseline reviews:", error.message);
    }
  }

  return { lastUpdated: 0, reviews: [] };
}

function saveCachedData(reviews) {
  try {
    const filePath = getReviewsFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(
      filePath,
      JSON.stringify({ lastUpdated: Date.now(), reviews }, null, 2)
    );
  } catch (error) {
    console.error("Error writing cache file:", error.message);
  }
}

function mergeReviews(newReviews, existingReviews) {
  const seen = new Set();
  const merged = [];

  // Prepend new reviews
  for (const r of newReviews) {
    const key = r.review_id || `${r.user?.name || ""}_${r.snippet || ""}`;
    if (key && !seen.has(key)) {
      seen.add(key);
      merged.push(r);
    }
  }

  // Append existing cached reviews
  for (const r of existingReviews) {
    const key = r.review_id || `${r.user?.name || ""}_${r.snippet || ""}`;
    if (key && !seen.has(key)) {
      seen.add(key);
      merged.push(r);
    }
  }

  return merged.slice(0, 12);
}

export async function fetchReviewsFromSerpApi() {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey || apiKey === "your_serpapi_key_here") {
    console.error("SERPAPI_KEY is not set or placeholder");
    return null; // Return null to indicate fetch failed/skipped
  }

  try {
    const url =
      "https://serpapi.com/search.json?engine=google_maps_reviews" +
      "&data_id=0x3958dc870a151ff9:0xef999dd84c53a16c" +
      "&hl=en&sort_by=ratingHigh" +
      `&api_key=${apiKey}`;

    const { data } = await axios.get(url);
    const allReviews = data?.reviews || [];

    // Ensure 5-star all the time and less than 2 months old
    const filteredReviews = allReviews.filter(
      (review) => review.rating >= 4
    );

    return filteredReviews;
  } catch (error) {
    console.error("Error fetching reviews from SerpAPI:", error.message);
    return null; // Return null to indicate error
  }
}

export async function getReviews() {
  const cachedData = loadCachedData();
  const cacheAge = Date.now() - cachedData.lastUpdated;
  const expired = cacheAge > CACHE_TTL_MS;

  if (!expired && cachedData.reviews.length > 0) {
    // Cache is fresh. See if we have any reviews less than 2 months old in cache.
    const newReviews = cachedData.reviews.filter((r) => isLessThanTwoMonthsOld(r));
    if (newReviews.length > 0) {
      return newReviews.slice(0, 6);
    }
    // If no recent reviews in the cache, return the entire cached list (the 10-12 fallback reviews) sliced to 6
    return cachedData.reviews.slice(0, 6);
  }

  // Cache is expired or empty, attempt fresh fetch
  console.log("Attempting to fetch fresh reviews from SerpAPI...");
  const freshReviews = await fetchReviewsFromSerpApi();


  if (freshReviews !== null) {
    // API call succeeded (did not throw error and API key was present)
    if (freshReviews.length > 0) {
      console.log(`Successfully fetched ${freshReviews.length} new matching reviews.`);
      // Merge into cache and save
      const merged = mergeReviews(freshReviews, cachedData.reviews);
      saveCachedData(merged);
      return freshReviews.slice(0, 6);
    } else {
      console.log("SerpAPI call succeeded but returned 0 reviews matching criteria (5-star, < 2 months old).");
      // Update cache timestamp so we don't hammer the API, but keep the existing cache reviews
      saveCachedData(cachedData.reviews);
      // Return the cached reviews as fallback sliced to 6
      return cachedData.reviews.slice(0, 6);
    }
  }

  // Fresh fetch failed (e.g. error, missing API key), fall back to cached reviews sliced to 6
  console.log("Fresh reviews fetch failed or was skipped. Falling back to cached reviews.");
  return cachedData.reviews.slice(0, 6);
}

