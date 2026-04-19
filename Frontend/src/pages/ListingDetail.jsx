

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import ImageGallery from "../components/ImageGallery";
import BookingCard from "../components/BookingCard";
import MapSection from "../components/MapSection";
import AmenitiesGrid from "../components/AmenitiesGrid";
import ReviewsSection from "../components/ReviewsSection";
import SimilarHotels from "../components/SimilarHotels";

import styles from "./ListingDetail.module.css";

export default function ListingDetail() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // 🔥 Fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/listings/${id}`
        );

        const data = res.data;

        // ✅ UPDATED FORMAT
        const formattedListing = {
          ...data,
          name: data.title,
          images: data.image ? [data.image] : [],

          location: {
            lat: data.location?.lat ?? null,
            lng: data.location?.lng ?? null,
            address: data.location?.address || ""
          },

          // UI helpers
          city: data.location?.address?.split(",")[0] || "",
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

  // 🔥 Title
  useEffect(() => {
    if (listing) {
      document.title = `${listing.name} | Stayio`;
    }
  }, [listing]);

  // 💳 DUMMY PAYMENT FUNCTION
  const handlePayment = async () => {
    try {
      setProcessing(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: listing.price || 5000,
          hotelId: listing._id,
          userId: "dummyUser123",
        }
      );

      const { bookingId } = data;

      await new Promise((res) => setTimeout(res, 2000));

      await axios.post("http://localhost:5000/api/payment/verify", {
        bookingId,
      });

      alert("✅ Booking Confirmed!");

    } catch (error) {
      console.error(error);
      alert("❌ Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  // ⏳ Loading UI
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

  // ❌ Not found
  if (!listing) {
    return <p style={{ textAlign: "center" }}>Listing not found</p>;
  }

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{listing.name}</h1>

          <div className={styles.meta}>
            <span>⭐ {listing.rating}</span>
            <span className={styles.dot}>·</span>
            <span>
              📍 {listing.city}, {listing.country}
            </span>
          </div>
        </div>

        {/* Gallery */}
        <ImageGallery images={listing.images || []} name={listing.name} />

        <div className={styles.layout}>
          {/* LEFT */}
          <div className={styles.leftCol}>
            <section className={styles.section}>
              <h2>About this place</h2>
              <p>{listing.description}</p>
            </section>

            <section className={styles.section}>
              <h2>Amenities</h2>
              <AmenitiesGrid amenities={listing.amenities || []} />
            </section>

            {/* ✅ FIXED MAP */}
            {listing.location?.lat !== null &&
             listing.location?.lng !== null && (
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

          {/* RIGHT */}
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

        {/* Similar */}
        <section className={styles.section}>
          <h2>Similar stays</h2>
           {listing && listing._id && (
           <SimilarHotels listing={listing} />
  )}

        </section>

      </motion.div>
    </div>
  );
}