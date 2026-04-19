import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SimilarHotels.module.css";

export default function SimilarHotels({ listing }) {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/listings");

        const getScore = (hotel) => {
          let score = 0;

          // Location match
          if (hotel.location === listing.location) score += 5;

          // Price similarity
          const diff = Math.abs(hotel.price - listing.price);
          if (diff < 1000) score += 3;
          else if (diff < 3000) score += 1;

          // Category match (if exists)
          if (hotel.category && hotel.category === listing.category) {
            score += 3;
          }

          // Amenities match
          if (hotel.amenities && listing.amenities) {
            const common = hotel.amenities.filter(a =>
              listing.amenities.includes(a)
            );
            score += common.length;
          }

          return score;
        };

        const recommendations = res.data
          .filter(h => h._id !== listing._id) // remove current hotel
          .map(hotel => ({
            ...hotel,
            score: getScore(hotel),
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 4);

        setHotels(recommendations);
      } catch (err) {
        console.error("Error fetching similar hotels:", err);
      }
    };

    fetchHotels();
  }, [listing]);

  return (
    <div className={styles.grid}>
      {hotels.map((hotel, i) => (
        <motion.div
          key={hotel._id}
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
        >
          <div className={styles.imgWrap}>
            <img src={hotel.image} alt={hotel.title} className={styles.img} />
            <button className={styles.heart}>♡</button>
          </div>

          <div className={styles.info}>
            <div className={styles.row}>
              <span className={styles.name}>{hotel.title}</span>
              <span className={styles.rating}>⭐ {hotel.rating || 0}</span>
            </div>

            <div className={styles.location}>{hotel.location}</div>

            <div className={styles.price}>
              <strong>₹{hotel.price}</strong>
              <span> / night</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}