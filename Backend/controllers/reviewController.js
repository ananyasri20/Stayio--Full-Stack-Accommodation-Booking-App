const Review = require('../models/Review.js');

// GET /api/reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('getReviews error:', error.message);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

// POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { name, text, rating } = req.body;

    // Manual validation so you get a clean 400 — not a 500
    if (!name || !text || !rating) {
      return res.status(400).json({ message: 'Name, text, and rating are required' });
    }

    const review = await Review.create({ name, text, rating });
    res.status(201).json(review);
  } catch (error) {
    // Mongoose validation errors (e.g. rating out of range)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error('createReview error:', error.message);
    res.status(500).json({ message: 'Failed to create review' });
  }
};

module.exports = { getReviews, createReview };