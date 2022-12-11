import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { PieChart } from "../../components/chart/PieChart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import "../../style/dashboard.scss";

const Dashboard = () => {
  const [value, setValue] = useState({})
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/dashboard/statistic"
        );
        if (result.data) {
          console.log(result.data)
          setValue(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDashboard();
  }, []);

  const stats = value && [value.totalOrderSuccess, value.totalOrderFailure, value.totalOrderDelivering];
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Navbar />
        <div className="statistic">
          <div className="header">
            <Widget type={"order"} number={value.totalOrder}/>
            <Widget type={"distance"} number={value.totalDistance}/>
            <Widget type={"dimension"} number={value.totalDimension}/>
            <Widget type={"fee"} number={value.totalFee}/>
          </div>
          <div className="content">
            <div className="left">
              <div className="label">Số đơn hàng theo trạng thái</div>
              <div className="pie">
                <PieChart stats={stats} />
              </div>
            </div>
            <div className="right">
              <TableContainer component={Paper} style={{ maxHeight: 400 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "14px" }}
                      >
                        Nhân viên giao hàng
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold", fontSize: "14px" }}
                      >
                        Thành công
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold", fontSize: "14px" }}
                      >
                        Thất bại
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold", fontSize: "14px" }}
                      >
                        Đang giao
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {value && value['shippers'] && value.shippers.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">
                          <span
                            style={{
                              padding: "4px",
                              borderRadius: "4px",
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: "blue",
                            }}
                          >
                            {row.success}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span
                            style={{
                              padding: "4px",
                              borderRadius: "4px",
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: "red",
                            }}
                          >
                            {row.failure}
                          </span>
                        </TableCell>
                        <TableCell align="center"><span
                            style={{
                              padding: "4px",
                              borderRadius: "4px",
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: "green",
                            }}
                          >
                            {row.delivering}
                          </span></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
