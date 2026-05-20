const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "reviews.json"
    );

    const data = fs.readFileSync(filePath, "utf8");

    res.status(200).json(JSON.parse(data));

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};