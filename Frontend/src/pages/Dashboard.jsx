import StatCard from '../components/StatCard';
import { recentActivity } from '../data/dummyData';
import styles from './Dashboard.module.css';

const stats = [
  { icon: '🗓', label: 'Total Bookings',  value: '12', accent: ''      },
  { icon: '✦',  label: 'Total Reviews',   value: '8',  accent: 'green' },
  { icon: '🏨', label: 'Upcoming Stays',  value: '3',  accent: 'amber' },
  { icon: '🔖', label: 'Saved Hotels',    value: '21', accent: ''      },
];

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className={styles.page}>
      {/* Hero welcome */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.greeting}>{greeting} ✦</p>
          <h1 className={styles.welcome}>Welcome back, <span>Ananya</span></h1>
          <p className={styles.sub}>Here's a snapshot of your travel journey.</p>
        </div>
        <div className={styles.heroBadge}>
          <span className={styles.badgeIcon}>👑</span>
          <div>
            <p className={styles.badgeLabel}>Premium Member</p>
            <p className={styles.badgeSub}>Since January 2024</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          {recentActivity.map((item) => (
            <div key={item.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>{item.icon}</div>
              <div className={styles.activityBody}>
                <p className={styles.activityText}>{item.text}</p>
                <p className={styles.activityTime}>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
