import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MyBookings from './pages/MyBookings';
import Reviews from './pages/Reviews';
import './styles/global.css';
import styles from './App.module.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'bookings':  return <MyBookings />;
      case 'reviews':   return <Reviews />;
      default:          return <Dashboard />;
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className={styles.main}>
        {renderPage()}
      </main>
    </div>
  );
}
