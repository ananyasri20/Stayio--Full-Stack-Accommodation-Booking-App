// FAKE PAYMENT CONTROLLER (NO RAZORPAY)

const Booking = require("../models/Booking.js");
const mongoose = require("mongoose");

// ✅ Create Order (dummy)
const createOrder = async (req, res) => {
  try {
    const { amount, hotelId } = req.body;

    // fallback dummy data (in case frontend missing)
    const finalAmount = amount || 5000;
    const finalHotelId =
      hotelId || new mongoose.Types.ObjectId();

    // create booking
    const booking = await Booking.create({
      user: new mongoose.Types.ObjectId(), // dummy user
      hotel: finalHotelId,
      amount: finalAmount,
      status: "pending",
    });

    // fake order object
    const order = {
      id: "order_" + Date.now(),
      amount: finalAmount * 100,
      currency: "INR",
    };

    booking.orderId = order.id;
    await booking.save();

    res.json({
      success: true,
      order,
      bookingId: booking._id,
    });

  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Verify Payment (always success)
const verifyPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "bookingId required",
      });
    }

    await Booking.findByIdAndUpdate(bookingId, {
      status: "confirmed",
      paymentId: "fake_payment_" + Date.now(),
    });

    res.json({
      success: true,
      message: "Dummy payment successful",
    });

  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};