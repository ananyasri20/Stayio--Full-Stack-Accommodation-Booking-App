// src/components/FilterPanel.jsx
import React from 'react'
import styles from './FilterPanel.module.css'

const locations  = ['All', 'Maldives', 'Santorini', 'Bali', 'Paris', 'Iceland', 'Morocco', 'Japan', 'Rajasthan']
const ratings    = [{ label: 'All', value: 0 }, { label: '4+ ⭐', value: 4 }, { label: '4.5+ ⭐', value: 4.5 }]
const amenityOpts = ['Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking', 'Breakfast']

export default function FilterPanel({ filters, onChange }) {
  // ❌ removed maxPrice
  const { rating, location, amenities } = filters

  const toggleAmenity = (a) => {
    const updated = amenities.includes(a)
      ? amenities.filter((x) => x !== a)
      : [...amenities, a]
    onChange({ ...filters, amenities: updated })
  }

  return (
    <aside className={styles.panel}>

      {/* Rating */}
      <div className={styles.card}>
        <div className={styles.title}>Rating</div>
        <div className={styles.chips}>
          {ratings.map((r) => (
            <button
              key={r.label}
              className={`${styles.chip} ${rating === r.value ? styles.chipActive : ''}`}
              onClick={() => onChange({ ...filters, rating: r.value })}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className={styles.card}>
        <div className={styles.title}>Location</div>
        <div className={styles.chips}>
          {locations.map((l) => (
            <button
              key={l}
              className={`${styles.chip} ${location === l ? styles.chipActive : ''}`}
              onClick={() => onChange({ ...filters, location: l })}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className={styles.card}>
        <div className={styles.title}>Amenities</div>
        {amenityOpts.map((a) => (
          <label key={a} className={styles.checkLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={amenities.includes(a)}
              onChange={() => toggleAmenity(a)}
            />
            {a}
          </label>
        ))}
      </div>

      {/* Reset */}
      <button
        className={styles.resetBtn}
        onClick={() =>
          onChange({ rating: 0, location: 'All', amenities: [] })
        }
      >
        Reset Filters
      </button>
    </aside>
  )
}