import React, { useState } from "react";
import "../order.scss";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ButtonAdd from "../../../components/button/buttonAdd";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { addorderInfo } from "../../../context/orders/orderSlice";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Link } from "react-router-dom";

const InputInfo = (props) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    nameSender: "",
    phoneSender: "",
    nameReceiver: "",
    phoneReceiver: "",
    weight: "",
    dimension: "",
    receivedDate: "",
  });
  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const steps = ["Nhập thông tin đơn hàng", "Nhập địa chỉ giao hàng"];

  const handleSubmit = () => {
    dispatch(addorderInfo(values));
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
          <span> Nhập thông tin giao hàng</span>
        </div>
        <Stepper alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="form-layout">
          <div className="label-page">Nhập thông tin đơn hàng</div>
          <div className="form-content">
            <div className="form-input">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Tên người gửi"
                  variant="standard"
                  value={values.nameSender}
                  onChange={handleChangeForm("nameSender")}
                />
                <TextField
                  id="standard-basic"
                  label="Số điện thoại người gửi"
                  variant="standard"
                  value={values.phoneSender}
                  onChange={handleChangeForm("phoneSender")}
                />

                <TextField
                  id="standard-basic"
                  label="Tên người nhận"
                  variant="standard"
                  value={values.nameReceiver}
                  onChange={handleChangeForm("nameReceiver")}
                />
                <TextField
                  id="standard-basic"
                  label="Số điện thoại người nhận"
                  variant="standard"
                  value={values.phoneReceiver}
                  onChange={handleChangeForm("phoneReceiver")}
                />
                <TextField
                  id="standard-basic"
                  label="Trọng lượng đơn hàng"
                  variant="standard"
                  value={values.weight}
                  onChange={handleChangeForm("weight")}
                />
                <TextField
                  id="standard-basic"
                  label="Kích thước đơn hàng"
                  variant="standard"
                  value={values.dimension}
                  onChange={handleChangeForm("dimension")}
                />
                <TextField
                  id="standard-basic"
                  label="Ngày nhận hàng"
                  variant="standard"
                  value={values.receivedDate}
                  onChange={handleChangeForm("receivedDate")}
                />
                <TextField
                  id="standard-basic"
                  label="Ghi chú"
                  variant="standard"
                  // value={values.receivedDate}
                  // onChange={handleChangeForm("receivedDate")}
                />
              </Box>
            </div>
            {/* <div className="google-map">
              <GoogleMapAPI setAddress={setAddress} />
            </div> */}
          </div>
          <div className="btn-submit">
            <Link to="/orders/add/step2" style={{ textDecoration: "none" }}>
              <ButtonAdd label={"Tiếp theo"} onClick={handleSubmit} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputInfo;
