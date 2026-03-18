// src/components/SearchBar.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn]   = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests]     = useState(2)

  const handleSearch = () => {
    navigate('/listings')
  }

  return (
    <div className={styles.box}>
      <div className={styles.field}>
        <span className={styles.fieldIcon}>🔍</span>
        <input
          className={styles.input}
          type="text"
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.field}>
        <span className={styles.fieldIcon}>📅</span>
        <input
          className={styles.input}
          type="date"
          placeholder="Check-in"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.field}>
        <span className={styles.fieldIcon}>📅</span>
        <input
          className={styles.input}
          type="date"
          placeholder="Check-out"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.field}>
        <span className={styles.fieldIcon}>👥</span>
        <input
          className={styles.input}
          type="number"
          placeholder="Guests"
          min={1}
          max={20}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          style={{ maxWidth: 90 }}
        />
      </div>

      <button className={styles.btn} onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}
