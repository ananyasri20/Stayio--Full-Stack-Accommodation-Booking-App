const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  image: String,
  rating: Number,
  amenities: [String]
}, { timestamps: true });

module.exports = mongoose.model("Listing", listingSchema);