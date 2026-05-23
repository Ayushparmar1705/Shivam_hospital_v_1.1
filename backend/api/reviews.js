import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Correct absolute path
    const filePath = path.join(process.cwd(), "reviews.json");

    // Read file
    const jsonData = fs.readFileSync(filePath, "utf-8");

    // Convert to object
    const data = JSON.parse(jsonData);

    // Send response
    res.status(200).json(data.reviews || []);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
}