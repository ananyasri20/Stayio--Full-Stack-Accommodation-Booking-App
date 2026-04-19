import React from 'react'
import styles from './BookingCard.module.css'

export default function BookingCard({ listing }) {
  if (!listing) return null;

  return (
    <div className={styles.card}>
      {/* Image / Emoji */}
      <div className={styles.hotelImg}>
        {listing?.emoji || "🏨"}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.name}>
          {listing?.name || "Hotel"}
        </div>

        <div className={styles.dates}>
          📍 {listing?.location?.city}, {listing?.location?.country}
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <span className={`${styles.badge} ${styles.confirmed}`}>
          Available
        </span>

        <div className={styles.price}>
          ₹{listing?.price || 0} / night
        </div>
      </div>
    </div>
  )
}