import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Listings from './pages/Listings'
import HotelDetails from './pages/HotelDetails'
import Reviews from './pages/Reviews'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Landing />} />
        <Route path="/signup"       element={<Signup />} />
        <Route path="/login"        element={<Login />} />
        <Route path="/dashboard"    element={<Dashboard />} />
        <Route path="/listings"     element={<Listings />} />
        <Route path="/hotel/:id"    element={<HotelDetails />} />
        <Route path="/reviews"      element={<Reviews />} />
      </Routes>
    </>
  )
}
