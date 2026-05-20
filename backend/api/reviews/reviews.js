const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "reviews.json"
    );

    const jsonData = fs.readFileSync(filePath, "utf8");

    const reviews = JSON.parse(jsonData);

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      error: "Failed to load reviews",
      message: error.message
    });
  }
};