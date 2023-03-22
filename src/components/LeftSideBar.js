import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="left-side-bar">
      <div className="left-side-bar-categories">
        <p>Our Categories:</p>
        <p>
          <Link to={"http://localhost:3000/Medications"}>Medications</Link>
        </p>
        <p>
          <Link to={"http://localhost:3000/skinCare"}>Skin Care</Link>
        </p>
        <p>
          <Link to={"http://localhost:3000/dailyEssentials"}>
            Daily Essentials
          </Link>
        </p>
        <p>
          <Link to={"http://localhost:3000/vitaminsAndSupplements"}>
            Supplements
          </Link>
        </p>
      </div>
      <div className="left-side-bar-branches">
        <div>Check Item availability in Branch:</div>
        <p>Branche one</p>
        <p>Branche two</p>
        <p>Branche three</p>
        <p>Branche four</p>
        <p>Branche five</p>
        <p>Branche six</p>
        <p>Branche seven</p>
        <p>Branche eight</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
