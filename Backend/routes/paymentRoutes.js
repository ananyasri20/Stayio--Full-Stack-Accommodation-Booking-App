const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");

// POST /api/payment/create-order
// Creates a Razorpay order and saves a pending booking
router.post("/create-order", createOrder);

// POST /api/payment/verify
// Verifies the payment signature and confirms/rejects the booking
router.post("/verify", verifyPayment);

module.exports = router;
