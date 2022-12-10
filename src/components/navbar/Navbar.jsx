import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const getStorageValue = (key, defaultValue) => {
    // getting stored value
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      const initial = saved !== null ? JSON.parse(saved) : defaultValue;
      return initial;
    }
  };
  const initialValue = getStorageValue("supervisor", "");
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="top">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <img src="https://i.imgur.com/niVMDiv.png" alt="logo" />
          </Link>
        </div>
        <div className="item">
          <p className="title">{initialValue.name}</p>
          <img src={initialValue.avatar} alt="" className="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
