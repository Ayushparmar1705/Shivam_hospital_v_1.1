// import express from "express";
// import axios from "axios";
// import cors from "cors";
// import dotenv from "dotenv";
// import fs from "fs";

// dotenv.config();

// const app = express();
// const PORT = 5000;

// app.use(cors());

// const REVIEWS_FILE = "./reviews.json";

// /**
//  * Fetch reviews from SerpAPI (Google Maps engine)
//  */
// async function fetchReviews() {
//     try {
//         const url = `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=0x3958dc870a151ff9:0xef999dd84c53a16c&hl=en&sort_by=ratingHigh&api_key=${process.env.SERPAPI_KEY}`;

//         const { data } = await axios.get(url);

//         const allReviews = data?.reviews || [];

//         const positive = allReviews.filter(r => r.rating >= 4);

//         const selected = positive.slice(0, 6);

//         fs.writeFileSync(
//             REVIEWS_FILE,
//             JSON.stringify(
//                 {
//                     lastUpdated: Date.now(),
//                     reviews: selected
//                 },
//                 null,
//                 2
//             )
//         );

//         return selected;
//     } catch (error) {
//         console.error("Error fetching reviews:", error.message);
//         return [];
//     }
// }
// /**
//  * API endpoint for frontend
//  */
// app.get("/api/reviews", async (req, res) => {
//     try {
//         // If file doesn't exist, fetch new reviews
//         if (!fs.existsSync(REVIEWS_FILE)) {
//             const reviews = await fetchReviews();
//             return res.json(reviews);
//         }

//         // Read saved reviews
//         const saved = JSON.parse(fs.readFileSync(REVIEWS_FILE));

//         // Check if 60 days passed
//         const SIXTY_DAYS = 60 * 24 * 60 * 60 * 1000;
//         const expired = Date.now() - saved.lastUpdated > SIXTY_DAYS;

//         if (expired) {
//             const reviews = await fetchReviews();
//             return res.json(reviews);
//         }

//         res.json(saved.reviews);
//     } catch (error) {
//         console.error("Error in /api/reviews:", error.message);
//         res.status(500).json({ error: "Server error" });
//     }
// });

// /**
//  * Start server
//  */
// app.listen(PORT, () => {
//     console.log(`Backend server running on port ${PORT}`);
// });
