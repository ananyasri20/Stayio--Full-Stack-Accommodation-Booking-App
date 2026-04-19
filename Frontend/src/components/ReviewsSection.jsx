import { motion } from "framer-motion";
import styles from "./ReviewsSection.module.css";

export default function ReviewsSection({ reviews }) {
  return (
    <div className={styles.grid}>
      {reviews.map((review, i) => (
        <motion.div
          key={review.id}
          className={styles.card}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.45 }}
          viewport={{ once: true }}
        >
          <div className={styles.top}>
            <img src={review.avatar} alt={review.name} className={styles.avatar} />
            <div>
              <div className={styles.name}>{review.name}</div>
              <div className={styles.date}>{review.date}</div>
            </div>
            <div className={styles.stars}>
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </div>
          </div>
          <p className={styles.text}>{review.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
