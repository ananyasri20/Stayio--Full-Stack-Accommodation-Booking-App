// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const companyLinks = ['About Us', 'Careers', 'Press', 'Blog']
const supportLinks = ['Help Center', 'Safety', 'Cancellation', 'Contact Us']
const hostLinks    = ['List Your Hotel', 'Host Dashboard', 'Guidelines', 'Resources']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Brand column */}
        <div>
          <div className={styles.brand}>Stay<span>io</span></div>
          <p className={styles.desc}>
            Your home away from home. Discover curated stays that match your style,
            budget, and adventure.
          </p>
          <div className={styles.social}>
            {['𝕏', 'f', 'in', '📷'].map((icon) => (
              <button key={icon} className={styles.socialBtn}>{icon}</button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.linkList}>
            {companyLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className={styles.colTitle}>Support</h4>
          <ul className={styles.linkList}>
            {supportLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className={styles.colTitle}>Hosts</h4>
          <ul className={styles.linkList}>
            {hostLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 Stayio. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  )
}
