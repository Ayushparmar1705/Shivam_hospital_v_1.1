// export default async function handler(req, res) {
//     try {

//         const url = `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=0x3958dc870a151ff9:0xef999dd84c53a16c&hl=en&sort_by=ratingHigh&api_key=${process.env.SERPAPI_KEY}`;

//         const response = await fetch(url);

//         const data = await response.json();

//         res.status(200).json(data);

//     } catch (error) {

//         res.status(500).json({
//             error: error.message
//         });

//     }
// }
export default function handler(req, res) {

    res.status(200).json([
        {
            name: "Ayush",
            rating: 5,
            comment: "Very good hospital"
        }
    ]);

}