import { useEffect, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import styles from "./MapSection.module.css";

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f5f2eb" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f2eb" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#7c6f5b" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#e8e0d0" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#9a8c77" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#b8d4e8" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#6a9bb5" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d4e8c8" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#ddd6c8" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f0ece4" }] },
];

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

/**
 * MapSection
 *
 * Props:
 *   lat    (Number | null)  — latitude from listing.location.lat
 *   lng    (Number | null)  — longitude from listing.location.lng
 *   name   (String)         — listing title, used for marker tooltip
 *
 * FIX SUMMARY:
 *   Root cause: Every listing was passing the same hardcoded {lat, lng} pair.
 *   Fix:
 *     1. Guard: render nothing if lat/lng are null/undefined/NaN.
 *     2. mapRef + panTo: when props change (user navigates listings),
 *        imperatively pan the map to the new coords so it doesn't stay frozen
 *        on the first-mounted center value.
 *     3. Stable `center` object via useMemo-equivalent ref — avoids Google Maps
 *        re-rendering the entire map on each parent render.
 */
export default function MapSection({ lat, lng, name }) {
  const mapRef = useRef(null);

  // ── Guard: only render if coordinates are real numbers ────────────────────
  const hasCoords =
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    // Only call the loader hook — never skip hooks conditionally
  });

  // ── Pan map when listing changes (fixes frozen map on navigation) ─────────
  useEffect(() => {
    if (mapRef.current && hasCoords) {
      mapRef.current.panTo({ lat, lng });
    }
  }, [lat, lng, hasCoords]);

  // ── No valid coordinates ──────────────────────────────────────────────────
  if (!hasCoords) {
    return (
      <div className={styles.mapWrap}>
        <div className={styles.mapNoCoords}>
          <span>📍 Location not available for this listing.</span>
        </div>
      </div>
    );
  }

  const center = { lat, lng };
  const gmapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

  // ── No API key → use OpenStreetMap iframe fallback ────────────────────────
  if (!GOOGLE_MAPS_API_KEY || loadError) {
    return <MapFallback lat={lat} lng={lng} name={name} />;
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (!isLoaded) {
    return (
      <div className={styles.mapWrap}>
        <div className={styles.mapPlaceholder}>
          <div className={styles.mapLoader} />
        </div>
      </div>
    );
  }

  // ── Full Google Maps render ───────────────────────────────────────────────
  return (
    <div className={styles.mapWrap}>
      <GoogleMap
        mapContainerClassName={styles.map}
        center={center}
        zoom={14}
        options={{
          styles: MAP_STYLES,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
        // Store map instance so we can call panTo on prop changes
        onLoad={(map) => { mapRef.current = map; }}
        onUnmount={() => { mapRef.current = null; }}
      >
        <Marker
          position={center}
          title={name}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#c9a96e",
            fillOpacity: 1,
            strokeColor: "#1a1a1a",
            strokeWeight: 1.5,
            scale: 1.8,
            anchor: new window.google.maps.Point(12, 24),
          }}
        />
      </GoogleMap>

      <a
        href={gmapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.viewOnMaps}
      >
        View on Google Maps ↗
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OpenStreetMap iframe fallback (no API key required)
// ─────────────────────────────────────────────────────────────────────────────
function MapFallback({ lat, lng, name }) {
  // Build a tight bbox around the coordinate so each listing shows a different area
  const delta = 0.015;
  const osmUrl = [
    "https://www.openstreetmap.org/export/embed.html",
    `?bbox=${lng - delta},${lat - delta},${lng + delta},${lat + delta}`,
    `&layer=mapnik`,
    `&marker=${lat},${lng}`,
  ].join("");

  const gmapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

  return (
    <div className={styles.mapWrap}>
      {/* key forces iframe to reload when coords change — critical for the bug fix */}
      <iframe
        key={`${lat},${lng}`}
        title={`Map of ${name}`}
        className={styles.map}
        src={osmUrl}
        frameBorder="0"
        scrolling="no"
        loading="lazy"
      />
      <a
        href={gmapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.viewOnMaps}
      >
        View on Google Maps ↗
      </a>
    </div>
  );
}
