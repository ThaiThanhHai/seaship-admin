import { FormControl, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BasicBarChart from "../../components/chart/BarChart";
import { PieChart } from "../../components/chart/PieChart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/dashboard.scss";

const Dashboard = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const stats = [15, 4, 5];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Navbar />
        <div className="statistic">
          <div className="header">
            <div className="label">Thống kê theo trạng thái đơn hàng</div>
          </div>
          <div className="content">
            <div className="left">
              <div className="label">Số đơn hàng theo trạng thái</div>
              <div className="pie">
                <PieChart stats={stats} />
              </div>
            </div>
            <div className="right">
              <div className="top">
                <div className="nav">
                  <div className="label">Số đơn hàng thành công</div>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        displayEmpty
                        onChange={handleChange}
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{
                          height: 40,
                        }}
                      >
                        <MenuItem value="">
                          <em>Tháng</em>
                        </MenuItem>
                        {months.map((month) => {
                          return (
                            <MenuItem
                              value={month}
                            >{`Tháng ${month}`}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div
                  className="bar-chart"
                  style={{ width: "600px", height: "200px" }}
                >
                  <BasicBarChart status={"success"} />
                </div>
              </div>
              <div className="bottom">
                <div className="nav">
                  <div className="label">Số đơn hàng thất bại</div>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      {/* <InputLabel sx={{ mt: "-6px" }}>Tháng</InputLabel> */}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        displayEmpty
                        onChange={handleChange}
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{
                          height: 40,
                        }}
                      >
                        <MenuItem value="">
                          <em>Tháng</em>
                        </MenuItem>
                        {months.map((month) => {
                          return (
                            <MenuItem
                              value={month}
                            >{`Tháng ${month}`}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div
                  className="bar-chart"
                  style={{ width: "600px", height: "200px" }}
                >
                  <BasicBarChart status={"fail"} />
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
