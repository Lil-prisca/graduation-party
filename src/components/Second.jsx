import "../styles/second.css";
import Location from "./Location";
import graduationcap from "../assets/f2dad4538338891d1595bf4caea1b361.png";

const Second = () => {
  const handleOpenMap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Replace these with your venue’s coordinates
        const venueLat = 51.4398439134538;
        const venueLng = -0.12563091237777593;

        // Create Google Maps directions URL
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${venueLat},${venueLng}&travelmode=driving`;

        window.open(url, "_blank");
      },
      (error) => {
        console.error(error);
        alert(
          "Unable to retrieve your location. Please enable location services."
        );
      },
      { enableHighAccuracy: true }
    );
  };
  return (
    <div className="first-pagee">
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
              <div>67 Streatham Hill,London SW2 4TX,United Kingdom</div>
              <button className="mapbutt" onClick={handleOpenMap}>
                GOOGLE MAPS
              </button>
            </div>
            <Location
              pretext="Why"
              reason="and a proud Gradute"
              space="Music,Food, Good Times..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Second;
