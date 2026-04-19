// src/pages/Landing.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import SearchBar from '../components/SearchBar'
import HotelCard from '../components/HotelCard'
import Footer from '../components/Footer'
import styles from './Landing.module.css'

// ❌ removed hotels import
// import { hotels, testimonials } from '../data/hotels'

// ✅ keep testimonials if you want
import { testimonials } from '../data/hotels'

const features = [
  { icon: '✅', color: 'rgba(107,142,35,0.12)',  title: 'Verified Listings', desc: 'Every property is verified by our team ensuring quality and accuracy before it goes live.' },
  { icon: '💰', color: 'rgba(139,94,60,0.12)',  title: 'Transparent Pricing', desc: 'No hidden fees, no nasty surprises.' },
  { icon: '🧭', color: 'rgba(59,130,246,0.12)', title: 'Smart Discovery', desc: 'We recommend stays based on your preferences.' },
  { icon: '🛡️', color: 'rgba(245,158,11,0.12)', title: 'Secure Booking', desc: 'Safe and encrypted booking experience.' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Landing() {
  const navigate = useNavigate()

  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)

  // ✅ FETCH FROM BACKEND
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

  // ✅ take first 3 as featured
  const featured = hotels.slice(0, 3)

  return (
    <div>
      {/* HERO */}
      {/* HERO */}
<section className={styles.hero}>
  <div className={styles.heroOrb1} />
  <div className={styles.heroOrb2} />
  <div className={styles.heroOrb3} />
  <div className={styles.heroGrid} />

  <div className={styles.heroInner}>
    {/* LEFT */}
    <motion.div
      className={styles.heroLeft}
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
    >
      <motion.div
        className={styles.heroBadge}
        variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      >
        <span className={styles.badgeDot} />
        ✦ Trusted by travelers
      </motion.div>

      <motion.h1
        className={styles.heroTitle}
        variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
      >
        Find Your <br />
        <em className={styles.heroHighlight}>Perfect Stay</em>
        <br />Anywhere
      </motion.h1>

      <motion.p
        className={styles.heroSubtitle}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      >
        Discover curated hotels and unique stays for your next adventure.
      </motion.p>

      <motion.div
        className={styles.heroSearch}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      >
        <SearchBar />
      </motion.div>

      
    </motion.div>

    {/* RIGHT — 3D Carousel */}
    <motion.div
      className={styles.heroRight}
      initial={{ opacity: 0, scale: 0.88, rotateY: -12 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.carouselScene}>
        <div className={styles.carouselTrack}>
          {[
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80',
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80',
            'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&q=80',
          ].map((src, i) => (
            <div
              key={i}
              className={styles.carouselCard}
              style={{ '--i': i }}
            >
              <img src={src} alt={`Luxury stay ${i + 1}`} className={styles.carouselImg} />
              <div className={styles.carouselGlass} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* TESTIMONIALS */}
      <div className="section">
        <div className="section-header">
          <h2>Loved by Travelers</h2>
        </div>

        <motion.div className={styles.testimonialsGrid}>
          {testimonials.map((t) => (
            <div key={t.name} className={styles.testimonialCard}>
              <p>{t.text}</p>
              <strong>{t.name}</strong>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
