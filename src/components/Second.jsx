import React, { useState } from "react";
import "../styles/second.css";
import Location from "./Location";
import graduationcap from "../assets/f2dad4538338891d1595bf4caea1b361.png";

const Second = () => {
  const [loading, setLoading] = useState(false);

  function openMap() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this device.");
      return;
    }

    setLoading(true); // show loading overlay

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false); // hide loading
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const venueLat = 51.4398439134538;
        const venueLng = -0.12563091237777593;

        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${venueLat},${venueLng}&travelmode=driving`;

        // window.location.href = url;

        // 🔥 Better mobile redirect
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.click();
      },
      (error) => {
        setLoading(false); // hide loading even if error
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
            alert("Unable to get your location. Please try again later.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
    // ⏳ Safety timeout
    setTimeout(() => {
      setLoading(false);
    }, 16000);
  }

  return (
    <div className="first-pagee">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Locating you...</p>
        </div>
      )}

      <div className="pagee">
        <div>
          <div className="gradcap">
            <img src={graduationcap} alt="" />
          </div>
          <div className="grad-Text">GRADUATION</div>
          <div className="grad-Textp">Party Details</div>
          <div className="dets">
            <Location
              pretext="When"
              reason="until the music stops"
              space="OCTOBER | 10 | 10PM"
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
              reason="and a proud Graduate"
              space="Music, Food, Good Times..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Second;
