import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import Dashboard from './pages/Dashboard';
import Reviews from './pages/Reviews';
import MyBookings from "./pages/MyBookings";

import './styles/global.css'; // optional

function DashboardLayout({ children }) {
  const location = useLocation();

  const getActivePage = () => {
    if (location.pathname.includes('bookings')) return 'bookings';
    if (location.pathname.includes('reviews')) return 'reviews';
    return 'dashboard';
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activePage={getActivePage()} />
      <main style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Main */}
        <Route path="/" element={<Landing />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing/:id" element={<ListingDetail />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />

        <Route path="/bookings" element={
          <DashboardLayout>
            <MyBookings />
          </DashboardLayout>
        } />

        <Route path="/reviews/:listingId" element={
          <DashboardLayout>
            <Reviews />
          </DashboardLayout>
        } />

        {/* Fallback */}
        <Route path="*" element={<div style={{padding:"2rem"}}>404 Page Not Found</div>} />
      </Routes>
    </>
  );
}