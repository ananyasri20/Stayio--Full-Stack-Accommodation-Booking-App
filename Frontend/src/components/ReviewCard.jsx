// src/components/ReviewCard.jsx
import React, { useState } from 'react'
import styles from './ReviewCard.module.css'

export default function ReviewCard({ review }) {
  const [helpful, setHelpful] = useState(null)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar} style={{ background: review.color }}>
          {review.initials}
        </div>
        <div className={styles.meta}>
          <div className={styles.name}>{review.name}</div>
          <div className={styles.location}>{review.location}</div>
        </div>
        <div className={styles.stars}>{'⭐'.repeat(review.rating)}</div>
      </div>

      <p className={styles.text}>{review.text}</p>

      <div className={styles.helpful}>
        <span className={styles.helpLabel}>Was this helpful?</span>
        <button
          className={`${styles.helpBtn} ${helpful === 'yes' ? styles.helpActive : ''}`}
          onClick={() => setHelpful('yes')}
        >
          👍 Yes
        </button>
        <button
          className={`${styles.helpBtn} ${helpful === 'no' ? styles.helpActive : ''}`}
          onClick={() => setHelpful('no')}
        >
          👎 No
        </button>
      </div>
    </div>
  )
}
