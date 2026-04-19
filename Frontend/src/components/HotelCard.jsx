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

  const gradient =
    gradients[(hotel?._id?.length || 0) % gradients.length]

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/listing/${hotel._id}`)}
    >
      {/* Image */}
      <div className={styles.imgWrapper}>
        <img
          src={hotel.image}
          alt={hotel.title}
          className={styles.image}
          onError={(e) => {
            e.target.style.background = gradient
            e.target.style.display = 'none'
          }}
        />

        {/* Fallback gradient if image fails */}
        {!hotel.image && (
          <div
            style={{
              width: '100%',
              height: '200px',
              background: gradient,
              borderRadius: '12px 12px 0 0'
            }}
          />
        )}

        <button
          className={styles.fav}
          onClick={(e) => {
            e.stopPropagation()
            setLiked(!liked)
          }}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content */}
      <div className={styles.body}>
        <div className={styles.location}>📍 {hotel.location}</div>

        <div className={styles.name}>
          {hotel.title}
        </div>

        <div className={styles.meta}>
          <div className={styles.rating}>
            ⭐ {hotel.rating}
            <span className={styles.ratingCount}>
              ({hotel.reviews || 0})
            </span>
          </div>

          <div className={styles.price}>
            ${hotel.price}
            <span>/night</span>
          </div>
        </div>

        <div className={styles.amenities}>
          {hotel.amenities?.slice(0, 3).map((a) => (
            <span key={a} className={styles.amenityTag}>
              {a}
            </span>
          ))}
        </div>

        <button
          className={styles.bookBtn}
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/listing/${hotel._id}`)
          }}
        >
          Book Now
        </button>
      </div>
    </motion.div>
  )
}