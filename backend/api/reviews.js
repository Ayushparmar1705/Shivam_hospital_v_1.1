export default async function handler(req, res) {
    try {
        const url = `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=0x3958dc870a151ff9:0xef999dd84c53a16c&hl=en&sort_by=ratingHigh&api_key=${process.env.SERPAPI_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        const allReviews = data?.reviews || [];

        const positive = allReviews.filter(
            (review) => review.rating >= 4
        );

        const selected = positive.slice(0, 6);

        res.status(200).json(selected);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch reviews"
        });
    }
}