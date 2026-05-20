// const fs = require("fs");
// const path = require("path");

// module.exports = (req, res) => {
//   try {
//     const filePath = path.join(
//       process.cwd(),
//       "data",
//       "reviews.json"
//     );

//     const data = fs.readFileSync(filePath, "utf8");

//     res.status(200).json(JSON.parse(data));

//   } catch (error) {
//     res.status(500).json({
//       error: error.message
//     });
//   }
// };
// api/reviews.js (or routes/reviews.js)
const { put, head, del, list } = require('@vercel/blob');

// Your Vercel Blob storage credentials (automatically available in Vercel)
// Add BLOB_READ_WRITE_TOKEN to your Vercel environment variables

const BLOB_PATH = 'reviews.json';

// GET handler - Fetch all reviews
async function getReviews(req, res) {
  try {
    // Check if reviews file exists in blob storage
    let reviews = [];
    
    try {
      const { blobs } = await list();
      const reviewsBlob = blobs.find(b => b.pathname === BLOB_PATH);
      
      if (reviewsBlob) {
        const response = await fetch(reviewsBlob.url);
        reviews = await response.json();
      }
    } catch (error) {
      // File doesn't exist yet, return empty array
      console.log('No existing reviews file, starting fresh');
    }
    
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
}

// POST handler - Add a new review
async function addReview(req, res) {
  try {
    const newReview = req.body;
    
    // Validate review data
    if (!newReview.name || !newReview.rating || !newReview.comment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Add timestamp
    newReview.id = Date.now().toString();
    newReview.createdAt = new Date().toISOString();
    
    // Get existing reviews
    let reviews = [];
    try {
      const { blobs } = await list();
      const reviewsBlob = blobs.find(b => b.pathname === BLOB_PATH);
      
      if (reviewsBlob) {
        const response = await fetch(reviewsBlob.url);
        reviews = await response.json();
      }
    } catch (error) {
      // No existing file, start with empty array
      console.log('Creating new reviews file');
    }
    
    // Add new review
    reviews.unshift(newReview); // Add to beginning
    
    // Save to Vercel Blob
    await put(BLOB_PATH, JSON.stringify(reviews, null, 2), {
      access: 'public',
      addRandomSuffix: false, // Keep the same filename
    });
    
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Failed to save review', details: error.message });
  }
}

// DELETE handler - Delete a review (optional)
async function deleteReview(req, res) {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Review ID required' });
    }
    
    // Get existing reviews
    let reviews = [];
    const { blobs } = await list();
    const reviewsBlob = blobs.find(b => b.pathname === BLOB_PATH);
    
    if (reviewsBlob) {
      const response = await fetch(reviewsBlob.url);
      reviews = await response.json();
    }
    
    // Filter out the review to delete
    const updatedReviews = reviews.filter(review => review.id !== id);
    
    if (reviews.length === updatedReviews.length) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    // Save updated list
    await put(BLOB_PATH, JSON.stringify(updatedReviews, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
}

// Main handler for different HTTP methods
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  switch (req.method) {
    case 'GET':
      await getReviews(req, res);
      break;
    case 'POST':
      await addReview(req, res);
      break;
    case 'DELETE':
      await deleteReview(req, res);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
};