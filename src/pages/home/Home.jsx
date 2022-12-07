import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/home.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("supervisor"));
    if (isAuth && isAuth !== null) {
      navigate("/home");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Navbar />
        <div className="image">
          <img src="https://i.imgur.com/BrTQlbU.png" alt="seaship" />
        </div>
      </div>
    </div>
  );
};

export default Home;
