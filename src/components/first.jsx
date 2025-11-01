import "../styles/first.css";
import she from "../assets/1759146320490-removebg-preview.png";
// import year from "../assets/1759146582213.jpg";
import invited from "../assets/invited.png";

const First = () => {
  return (
    <>
      <div className="first-page">
        <div className="page">
          <div className="text">
            <img src={she} alt="" />
            <p className="did-it"> DID IT</p>
            <div className="grad">
              <p className="right-text" style={{ fontStyle: "italic" }}>
                PROMISE IS GRADUATING FROM
              </p>
              <p className="left-text" style={{ fontStyle: "italic" }}>
                UNIVERSITY OF ROEHAMPTON
              </p>
            </div>
            <div className="class">
              {/* CLASS OF 2025 <img src={year} alt="" /> */}
            </div>
            <div className="invited">
              <img src={invited} alt="" />
            </div>
            <div className="grad">
              <p>
                LET’S CELEBRATE THIS EXCITING <br />
                MILESTONE TOGETHER!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default First;
