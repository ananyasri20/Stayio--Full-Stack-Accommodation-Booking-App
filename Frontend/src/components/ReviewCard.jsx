import styles from './ReviewCard.module.css';

function StarRating({ rating }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${styles.star} ${star <= rating ? styles.filled : styles.empty}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewCard({ name, hotel, rating, date, text, avatar }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarWrap}>
          <span className={styles.avatar}>{avatar}</span>
        </div>
        <div className={styles.meta}>
          <p className={styles.name}>{name}</p>
          <p className={styles.hotel}>{hotel}</p>
        </div>
        <div className={styles.ratingBlock}>
          <StarRating rating={rating} />
          <p className={styles.date}>{date}</p>
        </div>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
