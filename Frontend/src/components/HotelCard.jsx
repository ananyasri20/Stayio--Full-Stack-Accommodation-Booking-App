// src/components/HotelCard.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './HotelCard.module.css'

export default function HotelCard({ hotel }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)

  const gradients = [
    'linear-gradient(135deg, #5C3520, #8B5E3C)',
    'linear-gradient(135deg, #EADBC8, #B8835F)',
    'linear-gradient(135deg, #3D6B47, #6B8E23)',
    'linear-gradient(135deg, #2C3E6B, #4A6FA5)',
    'linear-gradient(135deg, #8B6914, #C4902A)',
    'linear-gradient(135deg, #6B2D3E, #9E4A5F)',
  ]
  const gradient = gradients[hotel.id % gradients.length]

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/hotel/${hotel.id}`)}
    >
      {/* Image area */}
      <div className={styles.imgWrapper} style={{ background: gradient }}>
        <span className={styles.emoji}>{hotel.emoji}</span>
        <div className={styles.badge}>{hotel.badge}</div>
        <button
          className={styles.fav}
          onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
          aria-label="Toggle favourite"
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.location}>📍 {hotel.location}</div>
        <div className={styles.name}>{hotel.name}</div>

        <div className={styles.meta}>
          <div className={styles.rating}>
            ⭐ {hotel.rating}
            <span className={styles.ratingCount}>({hotel.reviews})</span>
          </div>
          <div className={styles.price}>
            ${hotel.price}<span>/night</span>
          </div>
        </div>

        <div className={styles.amenities}>
          {hotel.amenities.slice(0, 3).map((a) => (
            <span key={a} className={styles.amenityTag}>{a}</span>
          ))}
        </div>

        <button
          className={styles.bookBtn}
          onClick={(e) => { e.stopPropagation(); navigate(`/hotel/${hotel.id}`) }}
        >
          Book Now
        </button>
      </div>
    </motion.div>
  )
}
