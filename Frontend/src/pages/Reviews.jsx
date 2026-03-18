// src/pages/Reviews.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReviewCard from '../components/ReviewCard'
import Footer from '../components/Footer'
import { testimonials } from '../data/hotels'
import styles from './Reviews.module.css'

export default function Reviews() {
  const [reviews, setReviews]     = useState(testimonials)
  const [starRating, setStarRating] = useState(0)
  const [hovered, setHovered]     = useState(0)
  const [text, setText]           = useState('')
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState(false)

  const submit = () => {
    if (!starRating)      { setError('Please select a star rating'); return }
    if (!text.trim())     { setError('Please write your review'); return }
    setError('')

    const newReview = {
      name: 'You',
      location: 'Just now',
      text,
      rating: starRating,
      initials: 'ME',
      color: '#8B5E3C',
      isNew: true,
    }

    setReviews([newReview, ...reviews])
    setText('')
    setStarRating(0)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div>
      <div className="page-hero">
        <h1>Guest Reviews</h1>
        <p>Share your experience and read what others say</p>
      </div>

      <div className={styles.page}>
        {/* Write review */}
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>Write a Review</h3>

          <div className={styles.group}>
            <label className={styles.label}>Your Rating</label>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`${styles.star} ${n <= (hovered || starRating) ? styles.starActive : ''}`}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setStarRating(n)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Your Experience</label>
            <textarea
              className={styles.textarea}
              placeholder="Share what you loved about your stay..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
          </div>

          {error   && <p className={styles.errorMsg}>{error}</p>}
          {success && <p className={styles.successMsg}>✅ Review posted! Thank you!</p>}

          <motion.button
            className={styles.submitBtn}
            onClick={submit}
            whileTap={{ scale: 0.98 }}
          >
            Post Review →
          </motion.button>
        </div>

        {/* Reviews list */}
        <div className={styles.listSection}>
          <h3 className={styles.listTitle}>{reviews.length} Reviews</h3>
          <AnimatePresence>
            {reviews.map((r, i) => (
              <motion.div
                key={r.name + i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i < 2 ? i * 0.1 : 0 }}
              >
                <ReviewCard review={r} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  )
}
