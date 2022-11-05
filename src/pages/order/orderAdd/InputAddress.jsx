import React, { useState } from "react";
import "../../../style/order.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import GoogleMapAPI from "../../../components/map/googleMapAPI";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ButtonAdd from "../../../components/button/buttonAdd";
import { useSelector } from "react-redux";
import ButtonBack from "../../../components/button/buttonBack";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const InputAddress = () => {
  const navigate = useNavigate();
  const orders = useSelector((state) => state && state.orders);
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [fee, setFee] = useState(0);
  const delivery_type = orders[orders.length - 1].delivery_type;
  const weight = orders[orders.length - 1].weight;

  const steps = ["Nhập thông tin đơn hàng", "Nhập địa chỉ giao hàng"];

  const order_address = {
    address: address,
    longitude: longitude,
    latitude: latitude,
  };

  const creatOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/orders", data);
      toast.success("Tạo đơn hàng thành công");
      navigate(`/orders/${res.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    const info = orders[orders.length - 1];
    const data = {
      sender_name: info.sender_name,
      sender_phone: info.sender_phone,
      receiver_name: info.receiver_name,
      receiver_phone: info.receiver_phone,
      note: info.note,
      delivery_type_id: info.delivery_type,
      shipping_fee: fee,
      cargo: {
        name: info.order_name,
        weight: info.weight,
        dimension: info.dimension,
      },
      order_address,
    };
    creatOrder(data);
  };

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
                delivery_type={delivery_type}
                weight={weight}
              />
              {/* <MapBox></MapBox> */}
            </div>
          </div>
          <div className="btn-submit">
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <ButtonBack label={"Hủy"} />
            </Link>
            <ButtonAdd label={"Lưu"} onClick={handleSubmit} />
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 1000,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputAddress;
