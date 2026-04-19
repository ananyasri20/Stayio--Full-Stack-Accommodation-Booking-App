const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "hotel",
        select: "title location price",  // only fetch what you need
      })
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("GET /api/bookings error:", err.message); // ← shows real cause
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;