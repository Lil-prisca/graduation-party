import React, { useState, useRef } from "react";
import "../styles/second.css";
import Location from "./Location";
import graduationcap from "../assets/f2dad4538338891d1595bf4caea1b361.png";

const Second = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Locating you...");
  const locationWatchRef = useRef(null);

  const venueLat = 51.4398439134538;
  const venueLng = -0.12563091237777593;

  const openInMaps = (userLat, userLng) => {
    const url = userLat
      ? `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${venueLat},${venueLng}&travelmode=driving`
      : `https://www.google.com/maps/place/${venueLat},${venueLng}`;

    // ✅ Use simulated link click (more mobile-safe than window.open)
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  const openMap = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported. Opening venue...");
      openInMaps();
      return;
    }

    setLoading(true);
    setMessage("Getting your location...");

    let gotLocation = false;

    // ⏱ Safety timeout (15s): fallback to venue
    const fallbackTimer = setTimeout(() => {
      if (!gotLocation) {
        setLoading(false);
        alert("Taking too long — opening venue location instead.");
        openInMaps();
      }
    }, 15000);

    // 🎯 Fast first attempt (low accuracy, quick)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        gotLocation = true;
        clearTimeout(fallbackTimer);
        setLoading(false);
        openInMaps(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.warn("Fast location failed:", error);
        // fallback to high-accuracy watch
        setMessage("Trying more accurate location...");
      },
      { enableHighAccuracy: false, timeout: 3000, maximumAge: 60000 }
    );

    // 🎯 Backup: high-accuracy watch (more precise but slower)
    locationWatchRef.current = navigator.geolocation.watchPosition(
      (position) => {
        if (gotLocation) return; // already handled
        gotLocation = true;
        clearTimeout(fallbackTimer);
        setLoading(false);
        navigator.geolocation.clearWatch(locationWatchRef.current);
        openInMaps(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("High accuracy failed:", error);
        clearTimeout(fallbackTimer);
        setLoading(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Please allow location access to open directions.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location unavailable. Try again or check GPS settings.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out. Try again.");
            break;
          default:
            alert("Unable to get your location. Opening venue instead.");
        }

        openInMaps();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="first-pagee">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>{message}</p>
        </div>
      )}

      <div className="pagee">
        <div>
          <div className="gradcap">
            <img src={graduationcap} alt="Graduation cap" />
          </div>
          <div className="grad-Text">GRADUATION</div>
          <div className="grad-Textp">Party Details</div>

          <div className="dets">
            <Location
              pretext="When"
              reason="until the music stops"
              space="JANUARY | 28 |3:30PM"
            />
            <div className="loca">
              <div className="prefix">Where</div>
              <div>67 Streatham Hill, London SW2 4TX, United Kingdom</div>
              <button className="mapbutt" onClick={openMap}>
                GOOGLE MAPS
              </button>
            </div>
            <Location
              pretext="Why"
              reason="and a Proud Graduate"
              space="Music, Food, Good Times..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Second;
