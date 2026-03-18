// src/pages/Signup.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Auth.module.css'

export default function Signup() {
  const navigate = useNavigate()
  const [role, setRole]       = useState('traveler')
  const [form, setForm]       = useState({ name: '', email: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim())           errs.name     = 'Full name is required'
    if (!form.email.includes('@'))   errs.email    = 'Enter a valid email'
    if (form.password.length < 6)    errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
    className: `${styles.input} ${errors[key] ? styles.inputError : ''}`,
  })

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.logo}>Stay<span>io</span></div>
        <div className={styles.logoSub}>Your home away from home</div>

        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.desc}>Join millions of travelers finding their perfect stay.</p>

        {/* Name */}
        <div className={styles.group}>
          <label className={styles.label}>Full Name</label>
          <input type="text" placeholder="John Doe" {...field('name')} />
          {errors.name && <span className={styles.err}>{errors.name}</span>}
        </div>

        {/* Email */}
        <div className={styles.group}>
          <label className={styles.label}>Email Address</label>
          <input type="email" placeholder="john@example.com" {...field('email')} />
          {errors.email && <span className={styles.err}>{errors.email}</span>}
        </div>

        {/* Password */}
        <div className={styles.group}>
          <label className={styles.label}>Password</label>
          <input type="password" placeholder="Create a strong password" {...field('password')} />
          {errors.password && <span className={styles.err}>{errors.password}</span>}
        </div>

        {/* Role */}
        <div className={styles.group}>
          <label className={styles.label}>I am a...</label>
          <div className={styles.roleGrid}>
            {[
              { value: 'traveler', icon: '🧳', label: 'Traveler'    },
              { value: 'owner',   icon: '🏨', label: 'Hotel Owner' },
            ].map((r) => (
              <div
                key={r.value}
                className={`${styles.roleOption} ${role === r.value ? styles.roleActive : ''}`}
                onClick={() => setRole(r.value)}
              >
                <div className={styles.roleIcon}>{r.icon}</div>
                <div className={styles.roleLabel}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.button
          className={styles.submitBtn}
          onClick={handleSubmit}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          {loading ? 'Creating account…' : 'Create Account →'}
        </motion.button>

        <p className={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}
