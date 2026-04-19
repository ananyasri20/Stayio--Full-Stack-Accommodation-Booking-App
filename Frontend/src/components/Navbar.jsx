// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        Stay<span>io</span>
      </Link>

      {/* Desktop links */}
      <div className={styles.links}>
        <Link to="/"          className={`${styles.link} ${isActive('/')         ? styles.active : ''}`}>Home</Link>
        <Link to="/listings"  className={`${styles.link} ${isActive('/listings') ? styles.active : ''}`}>Listings</Link>
        <Link to="/reviews"   className={`${styles.link} ${isActive('/reviews')  ? styles.active : ''}`}>Reviews</Link>
        <Link to="/dashboard" className={`${styles.link} ${isActive('/dashboard')? styles.active : ''}`}>Dashboard</Link>
        <Link to="/bookings"  className={`${styles.link} ${isActive('/bookings') ? styles.active : ''}`}>My Bookings</Link>
      </div>

      {/* Auth buttons */}
      <div className={styles.actions}>
        <Link to="/login"  className={styles.btnOutline}>Login</Link>
        <Link to="/signup" className={styles.btn}>Sign up</Link>
      </div>

      {/* Hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/"          onClick={() => setMenuOpen(false)} className={styles.mobileLink}>Home</Link>
          <Link to="/listings"  onClick={() => setMenuOpen(false)} className={styles.mobileLink}>Listings</Link>
          <Link to="/reviews"   onClick={() => setMenuOpen(false)} className={styles.mobileLink}>Reviews</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className={styles.mobileLink}>Dashboard</Link>
          <div className={styles.mobileBtns}>
            <Link to="/login"  onClick={() => setMenuOpen(false)} className={styles.btnOutline}>Login</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)} className={styles.btn}>Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

