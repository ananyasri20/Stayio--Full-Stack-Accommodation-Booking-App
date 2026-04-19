import React, { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import FilterPanel from '../components/FilterPanel'
import HotelCard from '../components/HotelCard'
import Footer from '../components/Footer'
import styles from './Listings.module.css'
import axios from "axios"

// ❌ removed maxPrice
const defaultFilters = { rating: 0, location: 'All', amenities: [] }

export default function Listings() {
  const [filters, setFilters] = useState(defaultFilters)
  const [sort, setSort] = useState('featured')
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:5000/api/listings")
      .then(res => {
        setHotels(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() => {
    let list = hotels.filter((h) => {
      // ❌ removed price condition
      if (filters.rating && h.rating < filters.rating) return false
      if (filters.location !== 'All' && h.location !== filters.location) return false
      return true
    })

    // ✅ sorting still works
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating)

    return list
  }, [filters, sort, hotels])

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>

  return (
    <div>
      <div className="page-hero">
        <h1>Explore Hotels</h1>
        <p>Discover hand-picked stays for every kind of traveler</p>
      </div>

      <div className={styles.layout}>
        <FilterPanel filters={filters} onChange={setFilters} />

        <div className={styles.content}>
          <div className={styles.topBar}>
            <div className={styles.count}>
              <strong>{filtered.length}</strong> properties found
            </div>

            <select
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🏝️</div>
              <p>No hotels match your filters.</p>
              <button
                className={styles.resetBtn}
                onClick={() => setFilters(defaultFilters)}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div className="grid-3" layout>
              {filtered.map((h) => (
                <motion.div
                  key={h._id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <HotelCard hotel={h} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}