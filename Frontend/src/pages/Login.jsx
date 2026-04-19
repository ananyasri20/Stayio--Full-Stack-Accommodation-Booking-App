// src/pages/Login.jsx

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Auth.module.css'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.email.includes('@'))  errs.email    = 'Enter a valid email'
    if (!form.password)             errs.password = 'Password is required'
    return errs
  }

  const handleLogin = async () => {
  const errs = validate()
  if (Object.keys(errs).length) {
    setErrors(errs)
    return
  }

  try {
    setLoading(true)

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()

    if (!res.ok) {
      setErrors({ general: data.message || "Login failed" })
      setLoading(false)
      return
    }

    // ✅ STORE TOKEN + USER
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))

    // ✅ REDIRECT
    navigate("/listings")

  } catch (error) {
    setErrors({ general: "Server error. Try again." })
  } finally {
    setLoading(false)
  }
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
        <div className={styles.logoSub}>Welcome back!</div>

        <h1 className={styles.title}>Sign in to Stayio</h1>
        <p className={styles.desc}>Access your bookings, saved hotels, and more.</p>

        <div className={styles.group}>
          <label className={styles.label}>Email Address</label>
          <input type="email" placeholder="john@example.com" {...field('email')} />
          {errors.email && <span className={styles.err}>{errors.email}</span>}
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Password</label>
          <input type="password" placeholder="Your password" {...field('password')} />
          {errors.password && <span className={styles.err}>{errors.password}</span>}
          <span className={styles.forgot}>Forgot password?</span>
        </div>

        <motion.button
          className={styles.submitBtn}
          onClick={handleLogin}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign In →'}
        </motion.button>

        <div className={styles.divider}>or continue with</div>

        <button className={styles.googleBtn}>🌐 Continue with Google</button>

        <p className={styles.footer}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.link}>Sign up</Link>
        </p>
      </motion.div>
    </div>
  )

}
