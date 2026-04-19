import styles from './StatCard.module.css';

export default function StatCard({ icon, label, value, accent }) {
  return (
    <div className={`${styles.card} ${accent ? styles[accent] : ''}`}>
      <div className={styles.iconWrap}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.info}>
        <p className={styles.value}>{value}</p>
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  );
}
