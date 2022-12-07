import React from "react";
import BasicBarChart from "../../components/chart/BarChart";
import { PieChart } from "../../components/chart/PieChart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/dashboard.scss";

const Dashboard = () => {
  const stats = [15, 4, 5];
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Navbar />
        <div className="statistic">
          <div className="header">
            <div className="label">Thống kê theo trạng thái đơn hàng</div>
            <div className="type-stats">Ngày tháng năm</div>
          </div>
          <div className="content">
            <div className="left">
              <div className="label">Số đơn hàng theo trạng thái</div>
              <div className="pie" style={{ width: "350px", height: "350px" }}>
                <PieChart stats={stats} />
              </div>
            </div>
            <div className="right">
              <div className="top">
                <div className="nav">
                  <div className="label">Số đơn hàng thành công</div>
                  <div className="type-stats">Ngày tháng năm</div>
                </div>
                <div
                  className="bar-chart"
                  style={{ width: "500px", height: "200px" }}
                >
                  <BasicBarChart />
                </div>
              </div>
              <div className="bottom">
                <div className="nav">
                  <div className="label">Số đơn hàng thất bại</div>
                  <div className="type-stats">Ngày tháng năm</div>
                </div>
                <div
                  className="bar-chart"
                  style={{ width: "500px", height: "200px" }}
                >
                  <BasicBarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
