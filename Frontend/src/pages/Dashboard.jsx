// src/pages/Dashboard.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import BookingCard from '../components/BookingCard'
import HotelCard from '../components/HotelCard'
import ReviewCard from '../components/ReviewCard'
import { bookings, hotels, testimonials } from '../data/hotels'
import styles from './Dashboard.module.css'

const stats = [
  { icon: '🏨', value: '12', label: 'Total Bookings',  change: '↑ 3 this month', up: true  },
  { icon: '❤️', value: '8',  label: 'Saved Hotels',    change: null               },
  { icon: '⭐', value: '6',  label: 'Reviews Written', change: null               },
  { icon: '💰', value: '$2.4k', label: 'Total Spent',  change: '↓ 12% vs last year', up: false },
]

const savedHotels = [hotels[1], hotels[4], hotels[6]]

const fadeUp = {
  initial:   { opacity: 0, y: 20 },
  animate:   { opacity: 1, y: 0 },
  exit:      { opacity: 0, y: -12 },
  transition:{ duration: 0.35 },
}

export default function Dashboard() {
  const [section, setSection] = useState('overview')
  const [profileForm, setProfileForm] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 234-5678',
  })
  const [saved, setSaved] = useState(false)

  return (
    <div className={styles.layout}>
      <Sidebar activeSection={section} onSelect={setSection} />

      <main className={styles.main}>
        <AnimatePresence mode="wait">

          {/* ── Overview ── */}
          {section === 'overview' && (
            <motion.div key="overview" {...fadeUp}>
              <div className={styles.header}>
                <h2>Welcome back, Alex! 👋</h2>
                <p>Here's a summary of your travel activity</p>
              </div>

              <div className={styles.statsGrid}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.statCard}>
                    <div className={styles.statIcon}>{s.icon}</div>
                    <div className={styles.statValue}>{s.value}</div>
                    <div className={styles.statLabel}>{s.label}</div>
                    {s.change && (
                      <div className={`${styles.statChange} ${s.up ? styles.up : styles.down}`}>
                        {s.change}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.sectionTitle}>Recent Bookings</div>
              <div className={styles.list}>
                {bookings.slice(0, 3).map((b) => <BookingCard key={b.id} booking={b} />)}
              </div>
            </motion.div>
          )}

          {/* ── My Bookings ── */}
          {section === 'bookings' && (
            <motion.div key="bookings" {...fadeUp}>
              <div className={styles.header}>
                <h2>My Bookings</h2>
                <p>All your upcoming and past stays</p>
              </div>
              <div className={styles.list}>
                {bookings.map((b) => <BookingCard key={b.id} booking={b} />)}
              </div>
            </motion.div>
          )}

          {/* ── Saved Hotels ── */}
          {section === 'saved' && (
            <motion.div key="saved" {...fadeUp}>
              <div className={styles.header}>
                <h2>Saved Hotels</h2>
                <p>Hotels you've added to your wishlist</p>
              </div>
              <div className="grid-3">
                {savedHotels.map((h) => <HotelCard key={h.id} hotel={h} />)}
              </div>
            </motion.div>
          )}

          {/* ── Reviews ── */}
          {section === 'reviews' && (
            <motion.div key="reviews" {...fadeUp}>
              <div className={styles.header}>
                <h2>My Reviews</h2>
                <p>Reviews you've written for past stays</p>
              </div>
              {testimonials.slice(0, 3).map((t) => (
                <ReviewCard key={t.name} review={t} />
              ))}
            </motion.div>
          )}

          {/* ── Profile ── */}
          {section === 'profile' && (
            <motion.div key="profile" {...fadeUp}>
              <div className={styles.header}>
                <h2>Profile Settings</h2>
                <p>Manage your account information</p>
              </div>
              <div className={styles.profileCard}>
                <div className={styles.profileTop}>
                  <div className={styles.profileAvatar}>AJ</div>
                  <div>
                    <div className={styles.profileName}>{profileForm.name}</div>
                    <div className={styles.profileEmail}>{profileForm.email}</div>
                  </div>
                </div>
                {['name', 'email', 'phone'].map((key) => (
                  <div className="form-group" key={key}>
                    <label className="form-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      className="form-input"
                      value={profileForm[key]}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
                <button
                  className={styles.saveBtn}
                  onClick={() => setSaved(true)}
                >
                  {saved ? '✅ Saved!' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  )
}
