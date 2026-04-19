const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ✅ GET all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET single listing by ID (🔥 THIS WAS MISSING)
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ONLY OWNER CAN CREATE LISTING
router.post("/", protect, authorizeRoles("owner"), async (req, res) => {
  try {
    const listing = new Listing({
      ...req.body,
      owner: req.user.id
    });

    await listing.save();
    res.json(listing);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE listing (only owner)
router.delete("/:id", protect, authorizeRoles("owner"), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await listing.deleteOne();

    res.json({ message: "Listing deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;