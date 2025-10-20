import "../styles/location.css";

const location = (props) => {
  return (
    <div className="loca">
      <div className="prefix">{props.pretext}</div>
      <div> {props.space} </div>
      <div className="reason">{props.reason}</div>
      <button>{props.button}</button>
    </div>
  );
};

export default location;
