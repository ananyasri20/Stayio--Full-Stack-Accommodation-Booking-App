// src/components/FilterPanel.jsx
import React from 'react'
import styles from './FilterPanel.module.css'

const locations  = ['All', 'Maldives', 'Santorini', 'Bali', 'Paris', 'Iceland', 'Morocco', 'Japan', 'Rajasthan']
const ratings    = [{ label: 'All', value: 0 }, { label: '4+ ⭐', value: 4 }, { label: '4.5+ ⭐', value: 4.5 }]
const amenityOpts = ['Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking', 'Breakfast']

export default function FilterPanel({ filters, onChange }) {
  const { maxPrice, rating, location, amenities } = filters

  const toggleAmenity = (a) => {
    const updated = amenities.includes(a)
      ? amenities.filter((x) => x !== a)
      : [...amenities, a]
    onChange({ ...filters, amenities: updated })
  }

  return (
    <aside className={styles.panel}>
      {/* Price */}
      <div className={styles.card}>
        <div className={styles.title}>Price Range</div>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>$50</span>
          <span className={styles.priceLabel}>${maxPrice}</span>
        </div>
        <input
          type="range"
          className={styles.slider}
          min={50}
          max={500}
          step={10}
          value={maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
        />
      </div>

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
          onChange({ maxPrice: 500, rating: 0, location: 'All', amenities: [] })
        }
      >
        Reset Filters
      </button>
    </aside>
  )
}
