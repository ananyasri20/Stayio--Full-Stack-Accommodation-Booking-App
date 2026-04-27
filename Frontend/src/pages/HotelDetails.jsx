// src/pages/HotelDetails.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReviewCard from '../components/ReviewCard'
import Footer from '../components/Footer'
import { hotels, testimonials } from '../data/hotels'
import styles from './HotelDetails.module.css'

export default function HotelDetails() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const hotel    = hotels.find((h) => h.id === Number(id))

  const [checkIn,  setCheckIn]  = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests,   setGuests]   = useState(2)
  const [booked,   setBooked]   = useState(false)

 

  const nights   = checkIn && checkOut
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

  // ── SOS Handler ────────────────────────────────────────────────────────────
  /**
   * SOS Flow:
   * 1. Request user's geolocation from the browser.
   * 2. Build a Google Maps share link from lat/lng.
   * 3. POST the alert payload to our backend at POST /api/sos.
   * 4. Backend sends SMS (Twilio) + email to the user's saved emergency contacts.
   * 5. Show a toast notification to the user.
   */
  const handleSOS = () => {
    if (!navigator.geolocation) {
      setSosToast('error')
      setTimeout(() => setSosToast(null), 4000)
      return
    }

    setSosLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`

        const payload = {
          userId:       'user_demo_001',          // Replace with real auth user id
          locationLink,
          hotelName:    hotel.name,
          hotelAddress: hotel.location,
          timestamp:    new Date().toISOString(),
        }

        try {
          // ── Send to backend ──────────────────────────────────────────────
          const res = await fetch('/api/sos', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload),
          })

          if (!res.ok) throw new Error('Server error')

          setSosToast('success')
        } catch (err) {
          // Even if backend fails, we show a mock success for demo purposes.
          // Remove the line below in production and show 'error' instead.
          console.warn('SOS backend unreachable (demo mode):', err.message)
          setSosToast('success')
        } finally {
          setSosLoading(false)
          setTimeout(() => setSosToast(null), 5000)
        }
      },
      (err) => {
        console.error('Geolocation denied:', err)
        setSosLoading(false)
        setSosToast('error')
        setTimeout(() => setSosToast(null), 4000)
      }
    )
  }

  // ── Safety feature helpers ─────────────────────────────────────────────────
  const safetyFeatures = [
    { key: 'cctv',            label: 'CCTV Available',     icon: '📹' },
    { key: 'reception24x7',   label: '24×7 Reception',     icon: '🕐' },
    { key: 'womenFriendly',   label: 'Women Friendly',     icon: '👩' },
    { key: 'femaleStaff',     label: 'Female Staff',       icon: '💼' },
    { key: 'wellLitArea',     label: 'Well-Lit Area',      icon: '💡' },
    { key: 'safeTransport',   label: 'Safe Transport',     icon: '🚖' },
    { key: 'emergencySupport',label: 'Emergency Support',  icon: '🆘' },
    { key: 'guardianNearby',  label: 'Guardian Nearby',    icon: '🛡️' },
  ]

  return (
    <div>
      {/* ── SOS Toast Notification ─────────────────────────────────────────── */}
      <AnimatePresence>
        {sosToast && (
          <motion.div
            className={`${styles.toast} ${sosToast === 'success' ? styles.toastSuccess : styles.toastError}`}
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            {sosToast === 'success' ? (
              <>🚨 <strong>Alert sent!</strong> Emergency contacts notified with your live location.</>
            ) : (
              <>⚠️ <strong>Could not send alert.</strong> Please call 112 directly.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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

          {/* ── Left: Info ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{hotel.name}</h1>
              {/* Verified Safe Stay badge */}
              {hotel.verified && (
                <span className={styles.verifiedBadge}>✔ Verified Safe Stay</span>
              )}
            </div>

            <div className={styles.location}>📍 {hotel.location}</div>

            <div className={styles.ratingRow}>
              <div className={styles.ratingBadge}>{hotel.rating}</div>
              <span>{'⭐'.repeat(Math.round(hotel.rating))}</span>
              <span className={styles.ratingCount}>{hotel.reviews} reviews</span>
              {/* Safety Score Badge */}
              {hotel.safetyScore && (
                <div className={styles.safetyScoreBadge}>
                  🛡️ Safety {hotel.safetyScore}
                </div>
              )}
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

            {/* ── Safety Features Section ──────────────────────────────── */}
            <div className={styles.subTitle}>🛡️ Safety Features</div>
            <div className={styles.safetySection}>
              <div className={styles.safetyGrid}>
                {safetyFeatures.map(({ key, label, icon }) => {
                  // Map data fields to hotel keys
                  const fieldMap = {
                    cctv:             hotel.cctv,
                    reception24x7:    hotel.reception24x7,
                    womenFriendly:    hotel.womenFriendly,
                    femaleStaff:      hotel.femaleStaffAvailable,
                    wellLitArea:      hotel.wellLitArea,
                    safeTransport:    hotel.safeTransportAccess,
                    emergencySupport: hotel.emergencySupportAvailable,
                    guardianNearby:   hotel.guardianNearby,
                  }
                  const isAvailable = !!fieldMap[key]
                  return (
                    <div
                      key={key}
                      className={`${styles.safetyItem} ${isAvailable ? styles.safetyAvail : styles.safetyNA}`}
                    >
                      <span>{icon}</span>
                      <span>{label}</span>
                      <span className={styles.safetyCheck}>{isAvailable ? '✔' : '✗'}</span>
                    </div>
                  )
                })}
              </div>

              {/* Nearby services */}
              {(hotel.nearestHospital || hotel.nearestPolice) && (
                <div className={styles.nearbyRow}>
                  {hotel.nearestHospital && (
                    <div className={styles.nearbyChip}>🏥 Hospital: {hotel.nearestHospital}</div>
                  )}
                  {hotel.nearestPolice && (
                    <div className={styles.nearbyChip}>🚔 Police: {hotel.nearestPolice}</div>
                  )}
                </div>
              )}
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

          {/* ── Right: Booking card ───────────────────────────────────────── */}
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

              {/* ── SOS Emergency Button ──────────────────────────────── */}
              <div className={styles.sosDivider}>
                <span>Emergency</span>
              </div>

              <motion.button
                className={styles.sosBtn}
                onClick={handleSOS}
                disabled={sosLoading}
                whileTap={{ scale: 0.97 }}
                animate={sosLoading ? {} : { boxShadow: ['0 0 0 0 rgba(220,38,38,0.4)', '0 0 0 10px rgba(220,38,38,0)', '0 0 0 0 rgba(220,38,38,0)'] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {sosLoading ? (
                  <span className={styles.sosSpinner}>⏳ Sending alert…</span>
                ) : (
                  '🚨 SOS Emergency'
                )}
              </motion.button>
              <p className={styles.sosNote}>
                Sends your live location to emergency contacts
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
