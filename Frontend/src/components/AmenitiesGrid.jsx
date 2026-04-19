import { motion } from "framer-motion";
import styles from "./AmenitiesGrid.module.css";

const ICONS = {
  wifi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  ),
  pool: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12h20M2 16h20M2 8h20" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v5" />
    </svg>
  ),
  ac: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="6" width="20" height="8" rx="3" />
      <path d="M7 14v4M12 14v4M17 14v4" />
    </svg>
  ),
  parking: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
  breakfast: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  spa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    </svg>
  ),
  gym: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 6.5h11" strokeLinecap="round" />
      <path d="M6.5 17.5h11" strokeLinecap="round" />
      <path d="M3 9.5v5M21 9.5v5M6.5 6.5v11M17.5 6.5v11" strokeLinecap="round" />
    </svg>
  ),
  service: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17h18M12 3v4M8 7a4 4 0 0 1 8 0H8z" />
      <rect x="2" y="17" width="20" height="2" rx="1" />
    </svg>
  ),
};

export default function AmenitiesGrid({ amenities = [] }) {
  return (
    <div className={styles.grid}>
      {amenities.map((amenity, i) => {
        // ✅ Handle both string & object formats
        const label =
          typeof amenity === "string" ? amenity : amenity?.label || "Amenity";

        const iconKey =
          typeof amenity === "string"
            ? amenity.toLowerCase().replace(/\s+/g, "")
            : amenity?.icon;

        return (
          <motion.div
            key={`${label}-${i}`} // ✅ FIXED unique key
            className={styles.item}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span className={styles.icon}>
              {ICONS[iconKey] || ICONS.wifi}
            </span>
            <span className={styles.label}>{label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}