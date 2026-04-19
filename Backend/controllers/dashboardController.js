// controllers/dashboardController.js
const Listing = require("../models/Listing");
const Booking = require("../models/Booking");

exports.getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // 🏨 Owner listings
    const listings = await Listing.find({ ownerId });

    // 📦 Bookings for those listings
    const bookings = await Booking.find({
      hotelId: { $in: listings.map(l => l._id) }
    }).populate("hotelId");

    const pendingBookings = bookings.filter(b => b.status === "pending");

    res.json({
      success: true,
      listings,
      bookings,
      pendingBookings
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};