// api/reviews.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    // IMPORTANT: Use absolute path with process.cwd()
    const filePath = path.join(process.cwd(), 'reviews.json');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Reviews file not found' });
    }
    
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const reviews = JSON.parse(fileContents);
    
    // Send response
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error reading reviews:', error);
    res.status(500).json({ error: 'Failed to read reviews', details: error.message });
  }
};