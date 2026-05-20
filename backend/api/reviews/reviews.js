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
    // ✅ CORRECT WAY: Use absolute path with process.cwd()
    const filePath = path.join(process.cwd(), 'reviews.json');
    
    console.log('Looking for file at:', filePath); // Debug log
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return res.status(404).json({ 
        error: 'reviews.json not found',
        path: filePath 
      });
    }
    
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const reviews = JSON.parse(fileContents);
    
    res.status(200).json(reviews);
    
  } catch (error) {
    console.error('Error reading reviews:', error);
    res.status(500).json({ 
      error: 'Failed to read reviews',
      message: error.message 
    });
  }
};