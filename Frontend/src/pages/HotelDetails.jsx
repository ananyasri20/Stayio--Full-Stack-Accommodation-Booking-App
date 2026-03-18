// src/pages/HotelDetails.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReviewCard from '../components/ReviewCard'
import Footer from '../components/Footer'
import { hotels, testimonials } from '../data/hotels'
import styles from './HotelDetails.module.css'

export default function HotelDetails() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const hotel      = hotels.find((h) => h.id === Number(id))

  const [checkIn,  setCheckIn]  = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests,   setGuests]   = useState(2)
  const [booked,   setBooked]   = useState(false)

  if (!hotel) {
    return (
      <div className={styles.notFound}>
        <h2>Hotel not found</h2>
        <button onClick={() => navigate('/listings')}>← Back to listings</button>
      </div>
    )
  }

  const nights  = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : 3
  const subtotal = hotel.price * nights
  const fee      = Math.round(subtotal * 0.1)
  const total    = subtotal + fee

  const gradients = [
    'linear-gradient(135deg,#5C3520,#8B5E3C)',
    'linear-gradient(135deg,#3D6B47,#6B8E23)',
    'linear-gradient(135deg,#8B6914,#C4902A)',
    'linear-gradient(135deg,#2C3E6B,#4A6FA5)',
    'linear-gradient(135deg,#6B2D3E,#9E4A5F)',
    'linear-gradient(135deg,#1A2D5A,#2E4A8A)',
    'linear-gradient(135deg,#2D5A27,#4A8C42)',
    'linear-gradient(135deg,#5C3520,#B8835F)',
  ]
  const grad = gradients[hotel.id % gradients.length]

  return (
    <div>
      <div className={styles.page}>
        <button className={styles.backBtn} onClick={() => navigate('/listings')}>
          ← Back to listings
        </button>

        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.galleryMain} style={{ background: grad }}>
            <span className={styles.galleryEmoji}>{hotel.emoji}</span>
          </div>
          <div className={styles.galleryThumbs}>
            <div className={styles.thumb} style={{ background: 'linear-gradient(135deg,var(--sand),var(--brown-light))' }}>🌅</div>
            <div className={styles.thumb} style={{ background: 'linear-gradient(135deg,var(--sand-light),var(--sand))' }}>🛁</div>
          </div>
        </div>

        {/* Layout */}
        <div className={styles.layout}>
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.title}>{hotel.name}</h1>
            <div className={styles.location}>📍 {hotel.location}</div>

            <div className={styles.ratingRow}>
              <div className={styles.ratingBadge}>{hotel.rating}</div>
              <span>{'⭐'.repeat(Math.round(hotel.rating))}</span>
              <span className={styles.ratingCount}>{hotel.reviews} reviews</span>
            </div>

            <div className={styles.subTitle}>About this property</div>
            <p className={styles.desc}>{hotel.desc}</p>

            <div className={styles.subTitle}>Amenities</div>
            <div className={styles.amenitiesGrid}>
              {hotel.amenities.map((a) => (
                <div key={a} className={styles.amenityItem}>
                  <span>{a.split(' ')[0]}</span>
                  <span>{a.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>

            <div className={styles.subTitle}>Location</div>
            <div className={styles.mapPlaceholder}>
              <span style={{ fontSize: '1.5rem' }}>🗺️</span>
              <span>Interactive map coming soon</span>
              <span className={styles.mapSub}>{hotel.location}</span>
            </div>

            <div className={styles.subTitle} style={{ marginTop: '2rem' }}>
              Guest Reviews
            </div>
            {testimonials.slice(0, 3).map((t) => (
              <ReviewCard key={t.name} review={t} />
            ))}
          </motion.div>

          {/* Right: Booking card */}
          <div>
            <div className={styles.bookingCard}>
              <div className={styles.bookingPrice}>
                ${hotel.price} <span>/ night</span>
              </div>
              <div className={styles.ratingRow} style={{ marginBottom: '1.25rem' }}>
                <span>{'⭐'.repeat(Math.round(hotel.rating))}</span>
                <span className={styles.ratingCount}>{hotel.reviews} reviews</span>
              </div>

              {/* Dates */}
              <div className={styles.dateGrid}>
                <div className={styles.dateField}>
                  <div className={styles.dateLabel}>Check-in</div>
                  <input
                    type="date"
                    className={styles.dateInput}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className={styles.dateField} style={{ borderRight: 'none' }}>
                  <div className={styles.dateLabel}>Check-out</div>
                  <input
                    type="date"
                    className={styles.dateInput}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              {/* Guests */}
              <div className={styles.guestsRow}>
                <span>Guests</span>
                <div className={styles.guestControls}>
                  <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
                  <span>{guests}</span>
                  <button onClick={() => setGuests(Math.min(20, guests + 1))}>+</button>
                </div>
              </div>

              {/* Summary */}
              <div className={styles.summary}>
                <div className={styles.summaryLine}>
                  <span>${hotel.price} × {nights} night{nights !== 1 ? 's' : ''}</span>
                  <span>${subtotal}</span>
                </div>
                <div className={styles.summaryLine}>
                  <span>Service fee</span>
                  <span>${fee}</span>
                </div>
                <div className={`${styles.summaryLine} ${styles.summaryTotal}`}>
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <motion.button
                className={styles.reserveBtn}
                onClick={() => setBooked(true)}
                whileTap={{ scale: 0.98 }}
              >
                {booked ? '🎉 Booking Confirmed!' : 'Reserve Now'}
              </motion.button>
              <p className={styles.noCharge}>You won't be charged yet</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
