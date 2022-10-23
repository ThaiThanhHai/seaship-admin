import React, { useState } from "react";
import "../order.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import GoogleMapAPI from "../../../components/map/googleMapAPI";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ButtonAdd from "../../../components/button/buttonAdd";
import { useDispatch } from "react-redux";
import { addOrderAddress } from "../../../context/orders/orderSlice";
import ButtonBack from "../../../components/button/buttonBack";
import { Link } from "react-router-dom";

const InputAddress = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
    address: "",
    longitude: "",
    latitude: "",
  });

  const steps = ["Nhập thông tin đơn hàng", "Nhập địa chỉ giao hàng"];

  const handleSubmit = () => {
    dispatch(addOrderAddress(address));
  };
  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="progress-tooltip">
          <span>Quản lí đơn hàng</span>
          <span> -> </span>
          <span> Thêm đơn hàng</span>
          <span> -> </span>
          <span> Nhập địa chỉ giao hàng</span>
        </div>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="form-layout">
          <div className="label-page">Nhập địa chỉ giao hàng</div>
          <div className="form-content">
            <div className="google-map">
              <GoogleMapAPI address={address} setAddress={setAddress} />
            </div>
          </div>
          <div className="btn-submit">
            <Link to="/orders/add/step1" style={{ textDecoration: "none" }}>
              <ButtonBack label={"Quay lại"} />
            </Link>
            <ButtonAdd label={"Lưu thông tin"} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputAddress;
