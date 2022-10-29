import React, { useState } from "react";
import "../order.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import GoogleMapAPI from "../../../components/map/googleMapAPI";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ButtonAdd from "../../../components/button/buttonAdd";
import { useSelector } from "react-redux";
import ButtonBack from "../../../components/button/buttonBack";
import { Link } from "react-router-dom";
// import axios from "axios";

const InputAddress = () => {
  const orders = useSelector((state) => state && state.orders);
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [fee, setFee] = useState(0);

  const steps = ["Nhập thông tin đơn hàng", "Nhập địa chỉ giao hàng"];

  const handleSubmit = () => {
    const reqBody = { ...orders[0], address, fee, longitude, latitude };
    console.log(reqBody);
  };

  // useEffect(() => {
  //   // async function getUser() {
  //   //   try {
  //   //     const response = await axios.get(
  //   //       "http://127.0.0.1:8000/api/v1/orders/list"
  //   //     );
  //   //     console.log(response);
  //   //   } catch (error) {
  //   //     console.error(error);
  //   //   }
  //   // }
  //   // getUser();
  //   console.log(values);
  // }, [values]);
  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <Stepper activeStep={1} alternativeLabel sx={{ marginTop: "20px" }}>
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
              <GoogleMapAPI
                setAddress={setAddress}
                setFee={setFee}
                setLongitude={setLongitude}
                setLatitude={setLatitude}
              />
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
