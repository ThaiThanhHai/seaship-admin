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
        <div className="item">
          <p className="title">{initialValue.name}</p>
          <img src={initialValue.avatar} alt="" className="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
