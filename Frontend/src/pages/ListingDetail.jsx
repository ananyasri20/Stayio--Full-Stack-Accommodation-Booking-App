// ListingDetail.jsx  — with Fake Video Call integration
// ─── Changes from original are marked with  // [FAKE CALL] ─────────────────

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import ImageGallery    from "../components/ImageGallery";
import BookingCard     from "../components/BookingCard";
import MapSection      from "../components/MapSection";
import AmenitiesGrid   from "../components/AmenitiesGrid";
import ReviewsSection  from "../components/ReviewsSection";
import SimilarHotels   from "../components/SimilarHotels";
import FakeCallModal   from "../components/FakeCallModal"; // [FAKE CALL]

import styles from "./ListingDetail.module.css";

// Safety features config — maps DB field names to display labels
const SAFETY_FEATURES = [
  { field: "cctv",                      label: "CCTV Available",    icon: "📹" },
  { field: "reception24x7",             label: "24×7 Reception",    icon: "🕐" },
  { field: "womenFriendly",             label: "Women Friendly",    icon: "👩" },
  { field: "femaleStaffAvailable",      label: "Female Staff",      icon: "💼" },
  { field: "wellLitArea",               label: "Well-Lit Area",     icon: "💡" },
  { field: "safeTransportAccess",       label: "Safe Transport",    icon: "🚖" },
  { field: "emergencySupportAvailable", label: "Emergency Support", icon: "🆘" },
  { field: "guardianNearby",            label: "Guardian Nearby",   icon: "🛡️" },
];

export default function ListingDetail() {
  const { id } = useParams();

  const [listing,    setListing]    = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [processing, setProcessing] = useState(false);

  // [FAKE CALL] — single boolean controls the modal
  const [isFakeCallOpen, setIsFakeCallOpen] = useState(false);

  // Fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res  = await axios.get(`http://localhost:5000/api/listings/${id}`);
        const data = res.data;

        const formattedListing = {
          ...data,
          name:   data.title,
          images: data.image ? [data.image] : [],
          location: {
            lat:     data.location?.lat     ?? null,
            lng:     data.location?.lng     ?? null,
            address: data.location?.address || "",
          },
          city:    data.location?.address?.split(",")[0] || "",
          country: data.location?.address?.split(",")[1] || "",
          reviews: [],
        };

        setListing(formattedListing);
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Page title
  useEffect(() => {
    if (listing) document.title = `${listing.name} | Stayio`;
  }, [listing]);

  // Dummy payment
  const handlePayment = async () => {
    try {
      setProcessing(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: listing.price || 5000, hotelId: listing._id, userId: "dummyUser123" }
      );

      await new Promise((res) => setTimeout(res, 2000));
      await axios.post("http://localhost:5000/api/payment/verify", { bookingId: data.bookingId });

      alert("✅ Booking Confirmed!");
    } catch (error) {
      console.error(error);
      alert("❌ Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <motion.div
          className={styles.loadingLogo}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          stayio
        </motion.div>
      </div>
    );
  }

  if (!listing) return <p style={{ textAlign: "center" }}>Listing not found</p>;

  const safetyAvailableCount = SAFETY_FEATURES.filter(({ field }) => !!listing[field]).length;

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{listing.name}</h1>

            {listing.verified && (
              <span className={styles.verifiedBadge}>✔ Verified Safe Stay</span>
            )}
          </div>

          <div className={styles.meta}>
            <span>⭐ {listing.rating}</span>
            <span className={styles.dot}>·</span>
            <span>📍 {listing.city}, {listing.country}</span>

            {listing.safetyScore && (
              <>
                <span className={styles.dot}>·</span>
                <span className={styles.safetyScoreBadge}>
                  🛡️ Safety {listing.safetyScore}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Gallery */}
        <ImageGallery images={listing.images || []} name={listing.name} />

        <div className={styles.layout}>

          {/* ── LEFT column ──────────────────────────────────────────────── */}
          <div className={styles.leftCol}>

            <section className={styles.section}>
              <h2>About this place</h2>
              <p>{listing.description}</p>
            </section>

            <section className={styles.section}>
              <h2>Amenities</h2>
              <AmenitiesGrid amenities={listing.amenities || []} />
            </section>

            {/* ── Safety Features ────────────────────────────────────────── */}
            <section className={styles.section}>
              <h2>🛡️ Safety Features</h2>

              <div className={styles.safetySection}>

                {/* 8-feature grid */}
                <div className={styles.safetyGrid}>
                  {SAFETY_FEATURES.map(({ field, label, icon }) => {
                    const available = !!listing[field];
                    return (
                      <div
                        key={field}
                        className={`${styles.safetyItem} ${
                          available ? styles.safetyAvail : styles.safetyNA
                        }`}
                      >
                        <span className={styles.safetyIcon}>{icon}</span>
                        <span className={styles.safetyLabel}>{label}</span>
                        <span className={styles.safetyCheck}>
                          {available ? "✔" : "✗"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Nearby hospital & police chips */}
                {(listing.nearestHospital || listing.nearestPolice) && (
                  <div className={styles.nearbyRow}>
                    {listing.nearestHospital && (
                      <div className={styles.nearbyChip}>
                        🏥 Hospital: {listing.nearestHospital}
                      </div>
                    )}
                    {listing.nearestPolice && (
                      <div className={styles.nearbyChip}>
                        🚔 Police: {listing.nearestPolice}
                      </div>
                    )}
                  </div>
                )}

                {/* Summary line */}
                <p className={styles.safetySummary}>
                  {safetyAvailableCount} of {SAFETY_FEATURES.length} safety
                  features available at this property.
                </p>

                {/* ── [FAKE CALL] CTA button ───────────────────────────── */}
                <div className={styles.safetyDivider} />

                <motion.button
                  className={styles.fakeCallCTA}
                  onClick={() => setIsFakeCallOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Start a fake video call for safety"
                >
                  <span className={styles.fakeCallCTAIcon}>📞</span>
                  Start Fake Video Call
                  <span className={styles.fakeCallCTABadge}>Safety Tool</span>
                </motion.button>
                {/* ── end [FAKE CALL] ─────────────────────────────────── */}

              </div>
            </section>

            {/* Map */}
            {listing.location?.lat !== null && listing.location?.lng !== null && (
              <section className={styles.section}>
                <h2>Location</h2>
                <MapSection
                  lat={listing.location.lat}
                  lng={listing.location.lng}
                  name={listing.name}
                />
              </section>
            )}

            <section className={styles.section}>
              <h2>Reviews</h2>
              <ReviewsSection
                listingId={listing._id}
                reviews={listing.reviews || []}
              />
            </section>
          </div>

          {/* ── RIGHT column ─────────────────────────────────────────────── */}
          <div className={styles.rightCol}>
            <BookingCard listing={listing} />

            <button
              className={styles.bookBtn}
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? "Processing..." : "Book Now"}
            </button>
          </div>
        </div>

        {/* Similar stays */}
        <section className={styles.section}>
          <h2>Similar stays</h2>
          {listing && listing._id && <SimilarHotels listing={listing} />}
        </section>

      </motion.div>

      {/* ── [FAKE CALL] Modal — rendered outside layout flow ─────────────── */}
      <FakeCallModal
        isOpen={isFakeCallOpen}
        onClose={() => setIsFakeCallOpen(false)}
      />
      {/* ── end [FAKE CALL] ────────────────────────────────────────────── */}

    </div>
  );
}
