// src/components/Sidebar.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'

const menuItems = [
  { id: 'overview',  icon: '🏠', label: 'Dashboard'   },
  { id: 'bookings',  icon: '📋', label: 'My Bookings'  },
  { id: 'saved',     icon: '❤️', label: 'Saved Hotels' },
  { id: 'reviews',   icon: '⭐', label: 'Reviews'      },
  { id: 'profile',   icon: '👤', label: 'Profile'      },
]

export default function Sidebar({ activeSection, onSelect }) {
  const navigate = useNavigate()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Stay<span>io</span></div>

      <nav className={styles.menu}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.item} ${activeSection === item.id ? styles.active : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className={styles.logoutWrap}>
        <button className={`${styles.item} ${styles.logout}`} onClick={() => navigate('/')}>
          <span className={styles.icon}>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  )
}
