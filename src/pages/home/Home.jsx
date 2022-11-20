import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/home.scss";

const Home = () => {
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
