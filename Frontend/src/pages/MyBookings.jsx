import { bookings } from '../data/dummyData';
import styles from './MyBookings.module.css';

function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${status === 'confirmed' ? styles.confirmed : styles.pending}`}>
      {status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
    </span>
  );
}

function BookingCard({ hotel, location, status, price, date, nights, image }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.hotelIcon}>{image}</div>
        <StatusBadge status={status} />
      </div>
      <h3 className={styles.hotelName}>{hotel}</h3>
      <p className={styles.location}>📍 {location}</p>
      <div className={styles.divider} />
      <div className={styles.cardMeta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Date</span>
          <span className={styles.metaValue}>{date}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Duration</span>
          <span className={styles.metaValue}>{nights} nights</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Total</span>
          <span className={`${styles.metaValue} ${styles.price}`}>{price}</span>
        </div>
      </div>
      <button className={styles.detailsBtn}>View Details →</button>
    </div>
  );
}

export default function MyBookings() {
  const hasBookings = bookings.length > 0;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Bookings</h1>
          <p className={styles.sub}>All your hotel stays in one place.</p>
        </div>
        {hasBookings && (
          <div className={styles.summaryPill}>
            <span className={styles.pillDot} />
            {bookings.length} bookings total
          </div>
        )}
      </div>

      {!hasBookings ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🏨</span>
          <h2 className={styles.emptyTitle}>No bookings yet</h2>
          <p className={styles.emptyText}>Your confirmed and upcoming stays will appear here.</p>
          <button className={styles.exploreBtn}>Explore Hotels</button>
        </div>
      ) : (
        <div className={styles.grid}>
          {bookings.map((booking) => (
            <BookingCard key={booking.id} {...booking} />
          ))}
        </div>
      )}
    </div>
  );
}
