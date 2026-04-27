// FakeCallModal.jsx
// Drop this file alongside ListingDetail.jsx (e.g. src/components/FakeCallModal.jsx)
// It is fully self-contained — import it wherever needed.

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FakeCallModal.module.css";

// ─── Caller catalogue ────────────────────────────────────────────────────────
// Replace video paths with real assets when available.
// The component falls back to a canvas-generated placeholder if the video fails.
const FAKE_CALLERS = [
  { id: 1, name: "Mom",       relation: "Family",        avatar: "👩‍🦳", video: "/videos/mom.mp4",    color: "#d97706" },
  { id: 2, name: "Priya",     relation: "Best Friend",   avatar: "👩",   video: "/videos/friend.mp4", color: "#7c3aed" },
  { id: 3, name: "Rahul",     relation: "Colleague",     avatar: "👨",   video: "/videos/rahul.mp4",  color: "#0891b2" },
  { id: 4, name: "Emergency", relation: "Contact",       avatar: "🆘",   video: "/videos/emrg.mp4",   color: "#dc2626" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function SignalBars({ strength = 4 }) {
  return (
    <span className={styles.signal} aria-label={`Signal: ${strength} bars`}>
      {[1, 2, 3, 4].map((b) => (
        <span
          key={b}
          className={styles.signalBar}
          style={{ opacity: b <= strength ? 1 : 0.2, height: `${5 + b * 3}px` }}
        />
      ))}
    </span>
  );
}

// ─── CallerSelector ──────────────────────────────────────────────────────────
function CallerSelector({ onSelect }) {
  return (
    <motion.div
      className={styles.selectorOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.selectorCard}
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <h3 className={styles.selectorTitle}>Who should call you?</h3>
        <p className={styles.selectorSub}>Pick a contact for your fake video call</p>

        <div className={styles.callerGrid}>
          {FAKE_CALLERS.map((c) => (
            <button
              key={c.id}
              className={styles.callerBtn}
              onClick={() => onSelect(c)}
              style={{ "--accent": c.color }}
            >
              <span className={styles.callerAvatar}>{c.avatar}</span>
              <span className={styles.callerName}>{c.name}</span>
              <span className={styles.callerRelation}>{c.relation}</span>
            </button>
          ))}

          {/* Random pick */}
          <button
            className={`${styles.callerBtn} ${styles.callerBtnRandom}`}
            onClick={() => onSelect(FAKE_CALLERS[Math.floor(Math.random() * FAKE_CALLERS.length)])}
            style={{ "--accent": "#6b7280" }}
          >
            <span className={styles.callerAvatar}>🎲</span>
            <span className={styles.callerName}>Random</span>
            <span className={styles.callerRelation}>Surprise me</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── IncomingCall ─────────────────────────────────────────────────────────────
function IncomingCall({ caller, onAccept, onDecline }) {
  return (
    <motion.div
      className={styles.incomingOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Ripple rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={styles.ripple}
          animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
          transition={{ duration: 2, delay: i * 0.65, repeat: Infinity, ease: "easeOut" }}
          style={{ "--accent": caller.color }}
        />
      ))}

      <motion.div
        className={styles.incomingCard}
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
      >
        <p className={styles.incomingLabel}>Incoming video call…</p>

        <motion.div
          className={styles.incomingAvatar}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ "--accent": caller.color }}
        >
          {caller.avatar}
        </motion.div>

        <h2 className={styles.incomingName}>{caller.name}</h2>
        <p className={styles.incomingRelation}>{caller.relation}</p>

        <div className={styles.incomingActions}>
          <button className={styles.declineBtn} onClick={onDecline} aria-label="Decline">
            📵
          </button>
          <motion.button
            className={styles.acceptBtn}
            onClick={onAccept}
            whileTap={{ scale: 0.93 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            aria-label="Accept"
          >
            📹
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ActiveCall ───────────────────────────────────────────────────────────────
function ActiveCall({ caller, onEnd }) {
  const videoRef  = useRef(null);
  const [duration, setDuration]   = useState(0);
  const [muted,    setMuted]      = useState(false);
  const [camOff,   setCamOff]     = useState(false);
  const [signal,   setSignal]     = useState(4);
  const [videoOk,  setVideoOk]    = useState(true);

  // Timer
  useEffect(() => {
    const t = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Fluctuate signal bars for realism
  useEffect(() => {
    const t = setInterval(() => {
      setSignal(Math.random() > 0.15 ? 4 : Math.random() > 0.5 ? 3 : 2);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  // Attempt video autoplay; fall back gracefully
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => setVideoOk(false));
  }, []);

  return (
    <motion.div
      className={styles.callScreen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Remote video / placeholder */}
      <div className={styles.remoteVideo}>
        {videoOk ? (
          <video
            ref={videoRef}
            src={caller.video}
            className={styles.videoEl}
            loop
            muted
            playsInline
            onError={() => setVideoOk(false)}
          />
        ) : (
          /* Gradient placeholder when no video file exists */
          <div
            className={styles.videoPlaceholder}
            style={{ background: `radial-gradient(circle at 40% 40%, ${caller.color}44 0%, #111 70%)` }}
          >
            <span className={styles.placeholderAvatar}>{caller.avatar}</span>
          </div>
        )}

        {/* Dark overlay so UI remains readable */}
        <div className={styles.videoOverlay} />
      </div>

      {/* ── Top HUD ────────────────────────────────────────────────────── */}
      <div className={styles.callHUD}>
        <div className={styles.callHUDLeft}>
          <motion.span
            className={styles.liveDot}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className={styles.liveLabel}>LIVE</span>
        </div>

        <div className={styles.callHUDCenter}>
          <p className={styles.callerNameActive}>{caller.name}</p>
          <p className={styles.callStatus}>
            <SignalBars strength={signal} />
            <span className={styles.connectedLabel}>Connected · {formatTime(duration)}</span>
          </p>
        </div>

        <div className={styles.callHUDRight}>
          <span className={styles.clockLabel}>
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      {/* ── Self-cam thumbnail ─────────────────────────────────────────── */}
      <motion.div
        className={styles.selfCam}
        drag
        dragConstraints={{ top: -200, bottom: 200, left: -120, right: 120 }}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        style={{ cursor: "grab" }}
      >
        {camOff ? (
          <div className={styles.selfCamOff}>📷</div>
        ) : (
          <div className={styles.selfCamPlaceholder}>
            <span>You</span>
          </div>
        )}
      </motion.div>

      {/* ── Bottom Controls ────────────────────────────────────────────── */}
      <div className={styles.callControls}>
        <button
          className={`${styles.ctrlBtn} ${muted ? styles.ctrlActive : ""}`}
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : "🎙️"}
        </button>

        <button
          className={`${styles.ctrlBtn} ${camOff ? styles.ctrlActive : ""}`}
          onClick={() => setCamOff((c) => !c)}
          aria-label={camOff ? "Camera on" : "Camera off"}
        >
          {camOff ? "📷" : "📸"}
        </button>

        {/* End call */}
        <motion.button
          className={styles.endCallBtn}
          onClick={onEnd}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          aria-label="End call"
        >
          <span className={styles.endCallIcon}>📵</span>
        </motion.button>

        <button className={styles.ctrlBtn} aria-label="Flip camera">🔄</button>
        <button className={styles.ctrlBtn} aria-label="Chat">💬</button>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
/**
 * FakeCallModal
 *
 * Props:
 *   isOpen  {boolean}  — controls visibility
 *   onClose {function} — called when modal fully closes
 */
export default function FakeCallModal({ isOpen, onClose }) {
  const PHASE = { SELECT: "select", INCOMING: "incoming", ACTIVE: "active" };

  const [phase,  setPhase]  = useState(PHASE.SELECT);
  const [caller, setCaller] = useState(null);

  // Reset state each time the modal opens
  useEffect(() => {
    if (isOpen) setPhase(PHASE.SELECT);
  }, [isOpen]);

  // Keyboard close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  function handleSelect(c) {
    setCaller(c);
    setPhase(PHASE.INCOMING);
  }

  function handleAccept() { setPhase(PHASE.ACTIVE); }

  function handleClose() {
    setPhase(PHASE.SELECT);
    setCaller(null);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalRoot}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Only close on backdrop click during SELECT phase (other phases have their own close)
          onClick={(e) => { if (e.target === e.currentTarget && phase === PHASE.SELECT) handleClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Fake Video Call"
        >
          <AnimatePresence mode="wait">
            {phase === PHASE.SELECT && (
              <CallerSelector key="select" onSelect={handleSelect} />
            )}
            {phase === PHASE.INCOMING && caller && (
              <IncomingCall
                key="incoming"
                caller={caller}
                onAccept={handleAccept}
                onDecline={handleClose}
              />
            )}
            {phase === PHASE.ACTIVE && caller && (
              <ActiveCall key="active" caller={caller} onEnd={handleClose} />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
