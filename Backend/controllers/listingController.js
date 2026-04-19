const axios = require("axios");
const Listing = require("../models/Listing");

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Geocode a city/address string → { lat, lng }
// Uses OpenCage (free tier: 2,500 req/day).
// Set OPENCAGE_API_KEY in .env — if missing, coords stay null.
// ─────────────────────────────────────────────────────────────────────────────
async function geocodeAddress(address) {
  const apiKey = process.env.OPENCAGE_API_KEY;
  if (!apiKey || !address) return { lat: null, lng: null };

  try {
    const { data } = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: address,
          key: apiKey,
          limit: 1,
          no_annotations: 1,
        },
        timeout: 5000,
      }
    );

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { lat, lng };
    }
  } catch (err) {
    console.error("Geocoding failed:", err.message);
  }

  return { lat: null, lng: null };
}

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/listings
// @desc    Create a new listing
//          Priority for coords: explicit lat/lng → geocoded city → null
// ─────────────────────────────────────────────────────────────────────────────
const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      pricePerNight,
      images,
      amenities,
      location, // { address, city, country, lat?, lng? }
    } = req.body;

    let lat = location?.lat ?? null;
    let lng = location?.lng ?? null;

    // If coordinates weren't provided explicitly, try geocoding
    if ((lat === null || lng === null) && (location?.city || location?.address)) {
      const query = location.address || location.city;
      const coords = await geocodeAddress(query);
      lat = coords.lat;
      lng = coords.lng;
    }

    const listing = await Listing.create({
      title,
      description,
      pricePerNight,
      images,
      amenities,
      owner: req.user?._id, // assumes auth middleware sets req.user
      location: {
        address: location?.address || "",
        city:    location?.city    || "",
        country: location?.country || "",
        lat,
        lng,
      },
    });

    return res.status(201).json({ success: true, listing });
  } catch (err) {
    console.error("createListing error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/listings/:id
// @desc    Fetch a single listing by ID
//          Returns the full location object including lat & lng
// ─────────────────────────────────────────────────────────────────────────────
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).lean();

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found." });
    }

    return res.status(200).json({ success: true, listing });
  } catch (err) {
    console.error("getListingById error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/listings
// @desc    Fetch all listings (includes lat/lng — useful for map overview)
// ─────────────────────────────────────────────────────────────────────────────
const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().lean();
    return res.status(200).json({ success: true, listings });
  } catch (err) {
    console.error("getAllListings error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   PATCH /api/listings/:id/geocode
// @desc    Admin utility — re-geocode an existing listing that has no coords
// ─────────────────────────────────────────────────────────────────────────────
const geocodeListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found." });
    }

    const query = listing.location.address || listing.location.city;
    const { lat, lng } = await geocodeAddress(query);

    listing.location.lat = lat;
    listing.location.lng = lng;
    await listing.save();

    return res.status(200).json({
      success: true,
      message: `Geocoded to lat=${lat}, lng=${lng}`,
      listing,
    });
  } catch (err) {
    console.error("geocodeListing error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createListing, getListingById, getAllListings, geocodeListing };
