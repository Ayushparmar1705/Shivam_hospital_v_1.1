const reviews = require("../data/reviews.json");

module.exports = (req, res) => {
  res.status(200).json(reviews);
};