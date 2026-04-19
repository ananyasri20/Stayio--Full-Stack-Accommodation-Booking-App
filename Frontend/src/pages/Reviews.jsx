import { useState } from 'react';
import ReviewCard from '../components/ReviewCard';
import { reviews as initialReviews } from '../data/dummyData';
import styles from './Reviews.module.css';

function StarPicker({ rating, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className={styles.starPicker}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${styles.starBtn} ${star <= (hovered || rating) ? styles.starActive : ''}`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
      <span className={styles.ratingLabel}>
        {rating > 0 ? ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating] : 'Select rating'}
      </span>
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [form, setForm] = useState({ hotel: '', rating: 0, text: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!form.hotel.trim()) { setError('Please enter a hotel name.'); return; }
    if (form.rating === 0)  { setError('Please select a star rating.'); return; }
    if (!form.text.trim())  { setError('Please write your review.'); return; }

    const newReview = {
      id: Date.now(),
      name: 'Ananya',
      avatar: 'AN',
      hotel: form.hotel.trim(),
      rating: form.rating,
      date: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      text: form.text.trim(),
    };

    setReviews([newReview, ...reviews]);
    setForm({ hotel: '', rating: 0, text: '' });
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reviews</h1>
        <p className={styles.sub}>Share your experience with fellow travellers.</p>
      </div>

      {/* Write Review Form */}
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Write a Review</h2>

        <div className={styles.field}>
          <label className={styles.label}>Hotel Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. The Grand Meridian, Paris"
            value={form.hotel}
            onChange={(e) => setForm({ ...form, hotel: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Your Rating</label>
          <StarPicker rating={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Your Review</label>
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="Tell us what made your stay memorable…"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {submitted && (
          <div className={styles.successBanner}>
            ✓ Review submitted successfully!
          </div>
        )}

        <button className={styles.submitBtn} onClick={handleSubmit}>
          Publish Review →
        </button>
      </div>

      {/* Reviews list */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          All Reviews <span className={styles.count}>{reviews.length}</span>
        </h2>
        <div className={styles.reviewsList}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
}
