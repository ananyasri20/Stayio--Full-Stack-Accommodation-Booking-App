// src/components/BookingCard.jsx
import React from 'react'
import styles from './BookingCard.module.css'

const statusClass = {
  confirmed: styles.confirmed,
  pending:   styles.pending,
  completed: styles.completed,
}

export default function BookingCard({ booking }) {
  return (
    <div className={styles.card}>
      <div className={styles.hotelImg}>{booking.emoji}</div>

      <div className={styles.info}>
        <div className={styles.name}>{booking.hotel}</div>
        <div className={styles.dates}>
          📅 {booking.dates} &nbsp;·&nbsp; 📍 {booking.location}
        </div>
      </div>

      <div className={styles.right}>
        <span className={`${styles.badge} ${statusClass[booking.status]}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
        <div className={styles.price}>{booking.price}</div>
      </div>
    </div>
  )
}
