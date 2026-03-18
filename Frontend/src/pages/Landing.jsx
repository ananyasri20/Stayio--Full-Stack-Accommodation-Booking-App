// src/pages/Landing.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import HotelCard from '../components/HotelCard'
import Footer from '../components/Footer'
import { hotels, testimonials } from '../data/hotels'
import styles from './Landing.module.css'

const features = [
  { icon: '✅', color: 'rgba(107,142,35,0.12)',  title: 'Verified Listings',    desc: 'Every property is verified by our team ensuring quality and accuracy before it goes live.' },
  { icon: '💰', color: 'rgba(139,94,60,0.12)',   title: 'Transparent Pricing',  desc: 'No hidden fees, no nasty surprises. The price you see is the price you pay — always.' },
  { icon: '🧭', color: 'rgba(59,130,246,0.12)',  title: 'Smart Discovery',      desc: 'Our intelligent engine learns your preferences and surfaces the perfect stays for you.' },
  { icon: '🛡️', color: 'rgba(245,158,11,0.12)', title: 'Secure Booking',       desc: 'Industry-standard encryption and a 100% booking guarantee ensure your peace of mind.' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Landing() {
  const navigate = useNavigate()
  const featured = hotels.slice(0, 3)

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBgPattern} />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.heroBadge}>✦ Trusted by 2M+ travelers worldwide</div>
          <h1 className={styles.heroTitle}>
            Find Your <em>Perfect Stay</em><br />Anywhere
          </h1>
          <p className={styles.heroSubtitle}>
            Discover curated hotels, cozy retreats, and unique stays<br />
            tailored to every journey and budget.
          </p>
          <SearchBar />
        </motion.div>
      </section>

      {/* ── Featured Hotels ─────────────────────────────────── */}
      <div className="section">
        <div className="section-header">
          <div className="section-tag">✦ Handpicked for you</div>
          <h2>Featured Hotels</h2>
          <p>Explore our most loved stays with glowing reviews</p>
        </div>
        <motion.div
          className="grid-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featured.map((h) => (
            <motion.div key={h.id} variants={fadeUp}>
              <HotelCard hotel={h} />
            </motion.div>
          ))}
        </motion.div>
        <div className={styles.viewAllWrap}>
          <button className={styles.viewAllBtn} onClick={() => navigate('/listings')}>
            View All Hotels →
          </button>
        </div>
      </div>

      {/* ── Why Stayio ──────────────────────────────────────── */}
      <div className={styles.whySection}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="section-header">
            <div className="section-tag">✦ Why us</div>
            <h2>Why Choose Stayio?</h2>
            <p>We make finding your next stay simple, safe, and delightful</p>
          </div>
          <motion.div
            className={styles.featuresGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className={styles.featureCard}>
                <div className={styles.featureIcon} style={{ background: f.color }}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Testimonials ────────────────────────────────────── */}
      <div className="section">
        <div className="section-header">
          <div className="section-tag">✦ What guests say</div>
          <h2>Loved by Travelers</h2>
          <p>Real stories from real guests around the world</p>
        </div>
        <motion.div
          className={styles.testimonialsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp} className={styles.testimonialCard}>
              <div className={styles.testimonialQuote}>"</div>
              <p className={styles.testimonialText}>{t.text}</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar} style={{ background: t.color }}>{t.initials}</div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorStars}>{'⭐'.repeat(t.rating)}</div>
                </div>
                <div className={styles.authorLoc}>{t.location}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
