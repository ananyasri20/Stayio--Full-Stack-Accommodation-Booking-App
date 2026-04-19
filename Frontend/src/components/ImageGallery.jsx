import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ images, name }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (i) => {
    setActiveIndex(i);
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.grid}>
        {/* Main large image */}
        <motion.div
          className={`${styles.cell} ${styles.main}`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={() => openModal(0)}
        >
          <img src={images[0]} alt={`${name} main`} className={styles.img} />
          <div className={styles.overlay} />
        </motion.div>

        {/* Side images */}
        <div className={styles.sideGrid}>
          {images.slice(1, 5).map((src, i) => (
            <motion.div
              key={i}
              className={styles.cell}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => openModal(i + 1)}
            >
              <img src={src} alt={`${name} ${i + 2}`} className={styles.img} />
              <div className={styles.overlay} />
              {i === 3 && images.length > 5 && (
                <div className={styles.moreBadge}>+{images.length - 5} photos</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Show all photos button */}
        <button className={styles.showAllBtn} onClick={() => openModal(0)}>
          <GridIcon /> Show all photos
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>
                ✕
              </button>
              <img
                src={images[activeIndex]}
                alt={`${name} ${activeIndex + 1}`}
                className={styles.modalImg}
              />
              <div className={styles.modalNav}>
                <button
                  className={styles.navBtn}
                  onClick={() => setActiveIndex((p) => (p - 1 + images.length) % images.length)}
                >
                  ‹
                </button>
                <span className={styles.modalCounter}>
                  {activeIndex + 1} / {images.length}
                </span>
                <button
                  className={styles.navBtn}
                  onClick={() => setActiveIndex((p) => (p + 1) % images.length)}
                >
                  ›
                </button>
              </div>
              <div className={styles.modalThumbs}>
                {images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ""}`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
